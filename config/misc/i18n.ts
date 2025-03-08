import type { ModuleOptions } from '@nuxtjs/i18n'
import type { Prettify } from '~/types'
export const i18n: Partial<Prettify<ModuleOptions>> = {
	lazy: true,
	langDir: 'locales',
	strategy: 'no_prefix',
	locales: [
		{
			code: 'us',
			name: 'English',
			file: 'en-US.json',
		},
		{
			code: 'it',
			name: 'Italiano',
			file: 'it-IT.json',
		},
		{
			code: 'tr',
			name: 'Turkce',
			file: 'tr-TR.json',
		},
	],
	defaultLocale: 'us',
	detectBrowserLanguage: {
		fallbackLocale: 'us',
	},
}
