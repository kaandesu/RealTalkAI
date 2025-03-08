import { readdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, parse } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PAGES_DIR = join(__dirname, '..')
const COMMON_DIR = join(PAGES_DIR, '_common')
const INDEX_FILE = join(PAGES_DIR, 'index.ts')

const toCamelCase = (str: string) =>
	str
		.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
		.replace(/^([a-z])/, (_, char) => char.toUpperCase())

// copy _common pages to the main PAGES_DIR
readdirSync(COMMON_DIR).forEach((file) => {
	if (
		file.endsWith('.ts') &&
		file !== 'generate.ts' &&
		file !== 'generatePages.ts'
	) {
		const sourcePath = join(COMMON_DIR, file)
		const destPath = join(PAGES_DIR, file)
		copyFileSync(sourcePath, destPath)
	}
})

const pageFiles = [
	...readdirSync(PAGES_DIR)
		.filter(
			(file) =>
				file.endsWith('.ts') &&
				!['index.ts', 'generate.ts', 'generatePages.ts'].includes(file),
		)
		.map((file) => parse(file).name),
]

const pageImports = pageFiles
	.map((file) => {
		const fileName = file.split('/')[file.split('/').length - 1]
		const pathPrefix = `./${fileName}`
		return `import { ${toCamelCase(fileName)} } from '${pathPrefix}';`
	})
	.join('\n')

const pageIds = pageFiles
	.map((file) => file.split('/')[file.split('/').length - 1])
	.map(
		(file) =>
			`'${file.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`).replace(/^-/, '')}'`,
	)
	.join(' | ')

const pagesArray = pageFiles
	.map((file) => file.split('/')[file.split('/').length - 1])
	.map((file) => `${toCamelCase(file)}.value,`)
	.join('\n\t')

const pagesDict = pageFiles
	.map((file) => file.split('/')[file.split('/').length - 1])
	.map((file) => `${toCamelCase(file)},`)
	.join('\n\t')

const indexContent = `/* AUTO-GENERATED FILE - DO NOT EDIT */
import type { Page } from '~/types/config';

${pageImports}

export type PageId = ${pageIds};

export const pages: Page[] = [
	${pagesArray}
];

export const pagesDict: Record<string, Ref<Page>> = {
	${pagesDict}
};
`

writeFileSync(INDEX_FILE, indexContent, 'utf-8')

console.log('✅ Generated index.ts for config/pages successfully!')
