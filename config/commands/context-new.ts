import type { ActionCommand } from '~/types/config'
export const contextNew: ActionCommand = {
	label: 'New',
	searchId: 'new',
	icon: 'line-md:plus',
	action: () => console.log('new!'),
}
