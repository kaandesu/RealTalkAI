import type { ActionCommand } from '~/types/config'
export const command4: ActionCommand = {
	label: 'Command 4',
	searchId: 'cmd4',
	icon: 'line-md:close-small',
	group: 'Command Group 2',
	action: () => {
		console.log('Command 4')
	},
}
