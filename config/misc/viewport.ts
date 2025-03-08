import type { ModuleOptions } from 'nuxt-viewport'
import type { Prettify } from '~/types'
export const viewport: Partial<Prettify<ModuleOptions>> = {
	breakpoints: {
		xs: 320,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		'2xl': 1536,
	},

	defaultBreakpoints: {
		desktop: 'lg',
		mobile: 'xs',
		tablet: 'md',
	},

	fallbackBreakpoint: 'lg',
}
