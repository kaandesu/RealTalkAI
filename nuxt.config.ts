import { image, tailwindcss, viewport, i18n } from './config/'
export default defineNuxtConfig({
	ssr: false,
	pages: true,
	// TODO: add 'lang' to the header and update title on change
	modules: [
		// 'nuxt-capo',
		'nuxt-typed-router',
		'@formkit/auto-animate/nuxt',
		'nuxt-icon',
		'@nuxtjs/tailwindcss',
		[
			'@nuxtjs/color-mode',
			{
				classSuffix: '',
				preference: 'system',
			},
		],
		['@nuxt/image', image],
		'shadcn-nuxt',
		'nuxt-viewport',
		'@pinia/nuxt',
		[
			'pinia-plugin-persistedstate/nuxt',
			{
				storage: 'localStorage',
			},
		],
		'@nuxtjs/i18n',
		'@vee-validate/nuxt',
	],
	i18n,
	viewport,
	colorMode: {
		classSuffix: '',
	},
	vite: {
		base: '',
		optimizeDeps: {
			exclude: ['vee-validate'],
		},
	},
	app: {
		baseURL: '/dashboard/',
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	tailwindcss,
	css: ['shepherd.js/dist/css/shepherd.css'],
	devtools: { enabled: false },
	compatibilityDate: '2024-04-03',
})
