import { sidebarTourSetup } from './sidebar'
import type { Step } from '~/stores/tour-manager'
type TourSetup = () => Step[]
export const tours: Record<string, TourSetup> = {
	sidebarTourSetup,
}
