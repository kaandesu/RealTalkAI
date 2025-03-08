import type { Page } from '~/types/config'
export const DashboardSettings = ref<Page>({
	title: 'Settings',
	uid: 'dashboard-settings',
	href: '/dashboard/settings',
	tourDesc: 'Customize your dashboard layout and preferences.',
	layout: 'dashboard',
})
