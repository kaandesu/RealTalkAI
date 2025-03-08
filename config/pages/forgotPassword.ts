import type { Page } from '~/types/config'
export const ForgotPassword = ref<Page>({
	title: 'Forgot Password',
	uid: 'forgot-password',
	label: '',
	href: '/forgot-password',
	icon: 'tabler:hexagon-number-3',
	auth: {
		title: 'Forgot Password',
		desc: 'Enter your email so that we can send you password reset link.',
	},
	layout: 'auth',
})
