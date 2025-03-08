import type { ActionCommand } from '~/types/config'
export const command2: ActionCommand = {
	label: 'Dark/Light Theme',
	searchId: 'dark/light theme',
	icon: 'mdi:theme-light-dark',
	group: 'Command Group 1',
	action: () =>
		(useColorMode().preference =
			useColorMode().value === 'light' ? 'dark' : 'light'),
}
