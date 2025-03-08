import type { Page } from '~/types/config'
export const Game = ref<Page>({
	title: 'Currnet Game',
	uid: 'game',
	label: 'Welcome to the game',
	desc: 'Simulation of an immersive conversation for active language learning.',
	href: '/game',
	tourDesc: 'Game arena, where the magic happens.',
	icon: 'material-symbols:play-shapes',
	isCollapsed: true,
	layout: 'dashboard',
})
