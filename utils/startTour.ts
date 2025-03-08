import { useTourStore, tourList } from '~/stores/tour-manager'
import type { Tour, Step, TourObject } from '~/stores/tour-manager'
export default function (
	tour: Tour,
	steps: Step[] = [],
	once: boolean = false,
	msAfter: number = 1000,
): TourObject['actions']['start'] {
	const tourActions: TourObject['actions'] =
		storeToRefs(useTourStore()).tours.value[tour].actions
	if (steps.length !== 0) {
		tourActions.flushSteps()
		tourActions.addSteps(steps)
	}
	if (useCookie<boolean>(tourList[tour].key).value !== true && once) {
		setTimeout(() => {
			tourActions.start()
		}, msAfter)
	}
	return tourActions.start
}
