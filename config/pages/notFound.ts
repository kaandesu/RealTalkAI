import type { Page } from '~/types/config'
export const NotFound = ref<Page>({
	title: 'Not Found',
	uid: '400',
	label: '',
	href: '/404',
	icon: 'tabler:error-404',
	layout: 'dashboard',
})
