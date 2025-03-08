import { SignIn } from './_common/signIn'
import { SignUp } from './_common/signUp'
import { ForgotPassword } from './_common/forgotPassword'
import { ChangePassword } from './_common/changePassword'
import type { Page } from '~/types/config'
export const Authentication = ref<Page>({
	title: 'Authentication',
	label: '',
	uid: 'auth',
	icon: 'material-symbols:person-check-outline',
	tourDesc: 'Secure your account with various authentication methods.',
	isCollapsed: true,
	sub: [
		SignIn.value,
		SignUp.value,
		ForgotPassword.value,
		ChangePassword.value,
	],
	layout: 'dashboard',
})
