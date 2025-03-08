import type { Page } from '~/types/config'
export const SignIn = ref<Page>({
	title: 'Sign In',
	uid: 'sign-in',
	label: '',
	href: '/sign-in',
	icon: 'tabler:hexagon-number-1',
	auth: {
		title: 'Login',
		desc: 'Sign in with your preferred method.',
	},
	layout: 'auth',
})
