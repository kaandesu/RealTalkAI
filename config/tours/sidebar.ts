import type { Step } from '~/stores/tour-manager'
import { useTourStore } from '~/stores/tour-manager'
import createTourDef from '~/utils/create-tour-def'
export const sidebarTourSetup = (): Step[] => {
	return createTourDef(storeToRefs(useTourStore()).tours.value.sidebar)
}
