import type { ActionCommand } from '~/types/config'
import createToast from '~/utils/create-toast'
export const command1: ActionCommand = {
	label: 'Show toast message',
	searchId: 'show toast message',
	icon: 'material-symbols-light:toast-outline-rounded',
	group: 'Command Group 1',
	action: () =>
		createToast({
			message: 'Hey there!',
			toastOps: {
				description: 'This is a toast message!',
			},
			type: 'success',
		})(),
}
