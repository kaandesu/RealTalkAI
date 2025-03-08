import type { Page } from '~/types/config'
export const SignUp = ref<Page>({
	title: 'Sign Up',
	uid: 'sign-up',
	label: '',
	href: '/sign-up',
	icon: 'tabler:hexagon-number-2',
	auth: {
		title: 'Create an account',
		desc: 'Sign up with your preferred method.',
		backgroundImage:
			'https://images.unsplash.com/photo-1637516408720-c7d7fd09a16e?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
	layout: 'auth',
})
