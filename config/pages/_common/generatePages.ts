import fs from 'fs'
import path from 'path'

const CONFIG_DIR = path.resolve('./config/pages')
const PAGES_DIR = path.resolve('./pages')

const ensureDirExists = (dir: string) => {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const configFiles = fs
	.readdirSync(CONFIG_DIR)
	.filter(
		(file) =>
			file.endsWith('.ts') &&
			file !== 'index.ts' &&
			!file.startsWith('_common'),
	)

configFiles.forEach((file) => {
	const filePath = path.join(CONFIG_DIR, file)
	const content = fs.readFileSync(filePath, 'utf-8')

	const hrefMatch = content.match(/href:\s*['"]([^'"]+)['"]/)
	const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/)
	const descMatch = content.match(/desc:\s*['"]([^'"]+)['"]/)
	const tourDesc = content.match(/tourDesc:\s*['"]([^'"]+)['"]/)
	const layoutMatch = content.match(/layout:\s*['"]([^'"]+)['"]/)

	if (!hrefMatch) return

	const href = hrefMatch[1]
	const title = titleMatch ? titleMatch[1] : 'Untitled'
	const description = descMatch ? descMatch[1] : tourDesc ? tourDesc[1] : ''
	const layout = layoutMatch ? layoutMatch[1] : 'default'

	const pagePath = path.join(PAGES_DIR, href.replace(/^\//, '')) + '.vue'
	ensureDirExists(path.dirname(pagePath))

	if (fs.existsSync(pagePath)) {
		console.log(`Skipping: ${pagePath} (already exists)`)
		return
	}

	const vueTemplate = `<template>
	<main class="box-border h-full w-full p-6">
		<div class="">🚧 ${title} 🚧</div>
		${description}
		<br />
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: '${layout}',
})
</script>
`

	fs.writeFileSync(pagePath, vueTemplate, 'utf-8')
	console.log(`Generated: ${pagePath}`)
})

console.log('Page generation complete.')
