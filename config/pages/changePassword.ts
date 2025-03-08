import type { Page } from '~/types/config'
export const ChangePassword = ref<Page>({
	title: 'Change Password',
	uid: 'change-password',
	label: '',
	href: '/change-password',
	icon: 'tabler:hexagon-number-4',
	auth: {
		title: 'Check your email',
		desc: 'Please enter the code sent to your email. Then create and confirm your new password.',
		numOfChars: 5,
	},
	layout: 'auth',
})
