import { defineStore } from 'pinia'
import * as cmd from '~/config/commands'
import type { CommandGroup } from '~/types/config'
export type Account = {
	displayName?: string
	avatar?: string
	avatarFallback?: string
}

export type ContextOption = {
	label: string
	searchId: string
	data?: any
}

export type ContextOptionGroup = {
	name?: string
	options: ContextOption[]
}

// NOTE: fields that change depending on the user rather than the webapp
export const useAccountStore = defineStore(
	'AccountStore',
	() => {
		// TODO: update account related stuff in a middleware
		const account = ref<Account>({
			displayName: '@kaandesu',
			avatar: 'https://avatars.githubusercontent.com/u/74111241?v=4',
			avatarFallback: 'KD',
		})

		const contextOptions = ref<{
			commandGroups?: CommandGroup[]
			contextOptionGroups: ContextOptionGroup[]
		} | null>({
			contextOptionGroups: [
				{
					name: 'Options',
					options: [
						{
							label: 'Context-1',
							searchId: 'Context 1',
						},
						{
							label: 'Context-2',
							searchId: 'Context 2',
						},
						{
							label: 'Context-3',
							searchId: 'Context 3',
						},
						{
							label: 'Context-4',
							searchId: 'Context 4',
						},
						{
							label: 'Context-5',
							searchId: 'Context 5',
						},
					],
				},
			],
			commandGroups: [
				{
					name: 'Context Actions',
					commands: [cmd.contextNew, cmd.contextClose],
				},
			],
		})

		return { account, contextOptions }
	},
	{
		persist: {
			paths: [''],
		},
	},
)
