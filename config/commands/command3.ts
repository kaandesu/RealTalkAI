import type { ActionCommand } from '~/types/config'
export const command3: ActionCommand = {
	label: 'Command 3',
	searchId: 'cmd3',
	icon: 'line-md:plus',
	group: 'Command Group 2',
	action: () => {
		console.log('Command 3')
	},
}
