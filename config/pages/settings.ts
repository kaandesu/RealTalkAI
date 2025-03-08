import type { Page } from '~/types/config'
export const Settings = ref<Page>({
	title: 'Settings',
	uid: 'settings',
	label: '',
	desc: 'Manage your account settings and  preferences.',
	href: '/settings',
	tourDesc: 'Customize your preferences and account settings.',
	icon: 'mdi:cog-outline',
	isCollapsed: true,
	layout: 'dashboard',
})
