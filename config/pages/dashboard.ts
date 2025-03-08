import { Levels } from './levels'

import { Results } from './results'

import { Suggestions } from './suggestions'

import type { Page } from '~/types/config'

export const Dashboard = ref<Page>({
	title: 'Dashboard',
	icon: 'material-symbols:dashboard-outline-rounded',
	uid: '',
	desc: '',
	tourDesc: 'Access your main overview page.',
	tabs: [Levels.value, Results.value, Suggestions.value],
	sub: [Levels.value, Results.value, Suggestions.value],
})
