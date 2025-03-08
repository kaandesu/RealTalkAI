import type { Step, TourObject } from '~/stores/tour-manager'
import { buttonTexts } from '~/stores/tour-manager'

export default function (
	selectedTour: TourObject,
	on: Step['attachTo']['on'] = 'left',
): Step[] {
	const actions = selectedTour.actions
	const elements = selectedTour.ids.map((id) =>
		document.getElementById(`tour-${id}`),
	)

	const firstStep: Step = {
		attachTo: { element: elements[0], on },
		title: findPageById(selectedTour.ids[0]).title,
		text: findPageById(selectedTour.ids[0]).tourDesc ?? '',
		buttons: [
			{
				action() {
					return actions.complete()
				},
				secondary: true,
				text: buttonTexts.skip,
			},
			{
				action() {
					return actions.next()
				},
				text: buttonTexts.next,
			},
		],
	}

	const middleSteps: Step[] = elements.slice(1, -1).map((element, i) => ({
		attachTo: { element, on },
		title: findPageById(selectedTour.ids[i + 1]).title,
		text: findPageById(selectedTour.ids[i + 1]).tourDesc ?? '',
		buttons: [
			{
				action() {
					return actions.complete()
				},
				secondary: true,
				text: buttonTexts.skip,
			},
			{
				action() {
					return actions.back()
				},
				secondary: true,
				text: buttonTexts.back,
			},
			{
				action() {
					return actions.next()
				},
				text: buttonTexts.next,
			},
		],
	}))

	const lastStep: Step = {
		attachTo: { element: elements[elements.length - 1], on },
		title: findPageById(selectedTour.ids[elements.length - 1]).title,
		text:
			findPageById(selectedTour.ids[elements.length - 1]).tourDesc ?? '',
		buttons: [
			{
				action() {
					return actions.back()
				},
				secondary: true,
				text: buttonTexts.back,
			},
			{
				action() {
					return actions.complete()
				},
				text: buttonTexts.exit,
			},
		],
	}

	return [firstStep, ...middleSteps, lastStep]
}
