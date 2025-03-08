import { defineStore } from 'pinia'
import type { DashboardConfig } from '../types/config'
import type { AuthenticationStructure } from '../types/config'
import { pagesDict as p } from '../config/pages'

export type FederatedAuthProviderOptions = 'google' | 'github'

export const useConfigStore = defineStore(
	'ConfigStore',
	() => {
		const structureRef = ref<{ authentication: AuthenticationStructure }>({
			authentication: {
				custom: false,
				providers: ['google', 'github'],
				tosAndPrivacy: {
					required: true,
					tos: 'https://github.com/kaandesu/',
					privacy: 'https://github.com/kaandesu/',
				},
				mfa: false,
			},
		})

		const sidebar = ref<DashboardConfig>({
			title: 'RealTalkAI Dashboard',
			desc: 'Active Language Learning',
			logo: 'https://avatar.vercel.sh/0.svg',
			logoFallback: 'RT',
			pages: [
				p.Dashboard.value,
				p.Game.value,
				p.Authentication.value,
				p.Settings.value,
			],
		})

		const structure = readonly(structureRef)

		return {
			sidebar,
			structure,
		}
	},
	{
		persist: [
			{
				pick: ['dashboard'],
				storage: sessionStorage,
			},
		],
	},
)
