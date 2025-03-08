import { defineStore } from 'pinia'
import type { Page } from '../types/config'
import type { ContextOption } from './account'
import type { Tour } from '../stores/tour-manager'
import { pagesDict as pages } from '../config/pages'
import { useTourStore } from '../stores/tour-manager'

export const themes = [
	'zinc',
	'rose',
	'green',
	'blue',
	'orange',
	'yellow',
	'violet',
] as const
export type Theme = (typeof themes)[number]
export const themeTwStyleDict: Record<(typeof themes)[number], string> = {
	zinc: 'background-color:rgb(113 113 122)',
	blue: 'background-color:rgb(59 130 246)',
	rose: 'background-color:rgb(244 63 94)',
	green: 'background-color:rgb(34 197 94)',
	violet: 'background-color: rgb(139 92 246) ',
	yellow: 'background-color: rgb(234 179 8)',
	orange: 'background-color: rgb(249 115 22)',
} as const

export const useAppStateStore = defineStore(
	'AppStateStore',
	() => {
		const tourStore = useTourStore()
		const navState = ref<Record<'open' | 'collapsed', boolean>>({
			open: false,
			collapsed: false,
		})

		const theme = ref<Theme>('blue')
		const changeTheme = (t: Theme) => {
			theme.value = t
		}

		const currentPageInfo = ref<Page>({ uid: '', layout: 'dashboard' })

		const findPage = (id: string): Page | false => {
			const keys = Object.keys(pages)
			const pgs: Record<string, Ref<Page>> = pages
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i]
				if (pgs[key].value.uid == id) {
					return pgs[key].value
				}
			}
			return false
		}
		const currentContext = ref<ContextOption | null>(null)

		const selectContext = (ctx: ContextOption) => {
			currentContext.value = ctx
		}

		const { tours } = storeToRefs(tourStore)
		let tourKeys = Object.keys(tours.value) as Tour[]

		const completeTours = () => {
			tourKeys.forEach((key: Tour) => {
				tours.value[key].actions.complete()
			})
		}

		const updateActivePage = (id: string) => {
			let page: any = findPage(id)
			currentPageInfo.value = page ? page : { uid: id }
			completeTours()
		}

		const navigatePage = async (page: Page) => {
			updateActivePage(page.uid!)
			await navigateTo(page.href!)
		}

		return {
			currentPageInfo,
			updateActivePage,
			currentContext,
			selectContext,
			navigatePage,
			navState,
			theme,
			completeTours,
			changeTheme,
		}
	},
	{
		persist: {
			paths: ['themeRef', 'theme', 'navState'],
		},
	},
)
