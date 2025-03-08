/* AUTO-GENERATED FILE, DO NOT EDIT MANUALLY */
import type { CommandGroup } from '@/types/config'

import { command1 } from './command1'
import { command2 } from './command2'
import { command3 } from './command3'
import { command4 } from './command4'
import { contextClose } from './context-close'
import { contextNew } from './context-new'

export { command1, command2, command3, command4, contextClose, contextNew }

export const commandGroups = ref<CommandGroup[]>([
	{
		name: 'Command Group 1',
		commands: [command1, command2],
	},
	{
		name: 'Command Group 2',
		commands: [command3, command4],
	},
	{
		name: '',
		commands: [contextClose, contextNew],
	},
])
