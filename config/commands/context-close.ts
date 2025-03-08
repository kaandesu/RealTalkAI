import { useAppStateStore } from '~/stores/app-state'
import type { ActionCommand } from '~/types/config'
export const contextClose: ActionCommand = {
	label: 'Close',
	disabled: computed<boolean>(
		() => storeToRefs(useAppStateStore()).currentContext.value === null,
	),
	searchId: 'close',
	icon: 'line-md:close-small',
	action: () => {
		storeToRefs(useAppStateStore()).currentContext.value = null
	},
}
