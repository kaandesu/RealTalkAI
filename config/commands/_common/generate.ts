import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COMMANDS_PATH = join(__dirname, '..')
const INDEX_PATH = join(COMMANDS_PATH, 'index.ts')

const toCamelCase = (str: string) =>
	str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

const commandFiles = readdirSync(COMMANDS_PATH).filter(
	(file) => file.endsWith('.ts') && !['index.ts'].includes(file),
)

const importStatements: string[] = []
const exportNames: string[] = []
const groups: Record<string, string[]> = {}

for (const file of commandFiles) {
	const originalName = file.replace('.ts', '')
	const camelCaseName = toCamelCase(originalName)
	const filePath = join(COMMANDS_PATH, file)
	const content = readFileSync(filePath, 'utf-8')

	if (/removed:\s*true/.test(content)) {
		console.log(`⚠️ Skipping removed command: ${originalName}`)
		continue
	}

	importStatements.push(
		`import { ${camelCaseName} } from './${originalName}';`,
	)
	exportNames.push(camelCaseName)

	const match = content.match(/group:\s*['"](.+?)['"]/)
	const groupName = match ? match[1] : ''

	if (!groups[groupName]) groups[groupName] = []
	groups[groupName].push(camelCaseName)
}

const indexContent = `/* AUTO-GENERATED FILE, DO NOT EDIT MANUALLY */
import type { CommandGroup } from '@/types/config';

${importStatements.join('\n')}

export { ${exportNames.join(', ')} };

export const commandGroups = ref<CommandGroup[]>([
  ${Object.entries(groups)
		.map(
			([group, commands]) => `{
    name: '${group}',
    commands: [${commands.join(', ')}],
  }`,
		)
		.join(',\n  ')}
]);`

writeFileSync(INDEX_PATH, indexContent, 'utf-8')

console.log(
	'✅ index.ts has been regenerated for config/commands, removed commands skipped.',
)
