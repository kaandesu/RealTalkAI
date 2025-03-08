import { defineStore } from 'pinia'
// @ts-ignore
import { useShepherd } from 'vue-shepherd'
import { defu } from 'defu'
import type { PageId } from '../config/pages'

export type Step = {
	attachTo: {
		element: HTMLElement | null
		on: 'right' | 'bottom' | 'left' | 'top'
	}
	text: string
	title?: string
	buttons?: Record<any, any>[]
}

export const tourList = {
	sidebar: { key: 'sidebarTourPlayed' },
} as const

export const buttonTexts = {
	next: 'Next',
	skip: 'Skip',
	back: 'Back',
	exit: 'Exit',
}

export type Tour = keyof typeof tourList

type ShowType =
	| {
			type: 'once'
			id: string
	  }
	| {
			type: 'always'
	  }

type TourOptions = {
	useModalOverlay?: boolean
	scrollTo?: Record<'behavior' | 'block', string> | boolean
	showMode: ShowType
}

const defaultTourOptions: TourOptions = {
	useModalOverlay: false,
	scrollTo: {
		behavior: 'smooth',
		block: 'center',
	},
	showMode: { type: 'always' },
}

const flushSteps = (tourInstance: any) => {
	tourInstance.steps = []
}
const getDefaultTourActions = (tourInstance: typeof useShepherd) => {
	return {
		next: () => tourInstance.next(),
		back: () => tourInstance.back(),
		complete: () => tourInstance.complete(),
		cancel: () => tourInstance.cancel(),
		flushSteps: () => flushSteps(tourInstance),
		hide: () => tourInstance.hide(),
		addStep: (step: Step) => tourInstance.addStep(step),
		addSteps: (steps: Step[]) => tourInstance.addSteps(steps),
		removeStep: (id: string) => tourInstance.removeStep(id),
		start: () => tourInstance.start(),
		show: (
			{ key, forward }: { key: number; forward: boolean } = {
				key: 0,
				forward: true,
			},
		) => tourInstance.show(key, forward),
	} as const
}

export type TourObject = {
	tour: any
	actions: ReturnType<typeof getDefaultTourActions>
	ids: PageId[]
}
export const useTourStore = defineStore('tourStore', () => {
	const dashboardTour = useShepherd(
		defu({ useModalOverlay: true }, defaultTourOptions),
	)

	// TODO: this sidebar thing is hard coded, but actually needs to be generated
	const tours = ref<Record<Tour, TourObject>>({
		sidebar: {
			tour: dashboardTour,
			ids: [
				'dashboard',
				'tasks',
				'chats',
				'apps',
				'auth',
				'users',
				'request',
				'analysis',
				'extra-components',
				'error-pages',
				'settings',
			],
			actions: defu(
				{
					complete: () => {
						useCookie<boolean>(tourList.sidebar.key).value = true
						dashboardTour.complete()
					},
				},

				{ ...getDefaultTourActions(dashboardTour) },
			),
		},
	})

	const singleUseTour = <T extends TourOptions['showMode']>(
		steps: Step[],
		options: Extract<TourOptions, { showMode: T }> extends {
			id: infer TPayload
		}
			? [TourOptions, id: TPayload]
			: TourOptions,
	) => {
		const tourOptions = defu(options, defaultTourOptions)

		const _tour = useShepherd(tourOptions)

		const _start = (force: boolean = false) => {
			if (
				tourOptions.showMode.type === 'once' &&
				useCookie(tourOptions.showMode.id).value &&
				!force
			) {
				return
			}
			_tour.start()
		}

		const basicOps = defu(
			{
				start: _start,
			},
			{ ...getDefaultTourActions(_tour) },
		)

		if (tourOptions.showMode.type === 'once') {
			const showedOnce = useCookie<boolean>(tourOptions.showMode.id)
			showedOnce.value = true
		}

		_tour.addSteps(steps)

		return { tour: _tour, ...basicOps }
	}

	return {
		tours,
		singleUseTour,
	}
})
