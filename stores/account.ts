import { defineStore } from 'pinia'
import * as cmd from '~/config/commands'
import type { CommandGroup } from '~/types/config'
import createToast from '~/utils/create-toast'
export type Account = {
	displayName?: string
	avatar?: string
	avatarFallback?: string
	apiKey: string
	apiKeyOpenAi: string
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

export type LevelResult = {
	gameIndex: number
	overallScore: number
	flowScore: number
	grammarScore: number
	vocabScore: number
	feedback?: string
}

export type LevelSuggestion = {
	gameIndex: number
	tip: string
	example?: string
}

export type Level = {
	name: string
	desc: string
	objective: string
	pageHref?: string
	difficulty?: Number
	result?: LevelResult
	suggestions?: LevelSuggestion
	transcript?: string[]
	agentId?: string
	agentTitle?: string
}

export type CurrentState = {
	aciveGameIndex: number
	activeAiAgent: string
}

export const useAccountStore = defineStore(
	'AccountStore',
	() => {
		const account = ref<Account>({
			displayName: '@kaandesu',
			avatar: 'https://avatars.githubusercontent.com/u/74111241?v=4',
			avatarFallback: 'KD',
			apiKey: '',
			apiKeyOpenAi: '',
		})

		const state = ref<CurrentState>({
			aciveGameIndex: -1,
			activeAiAgent: '',
		})

		const startGame = async (gameIndex: number) => {
			createToast({
				message: 'Starting the Game!',
				toastOps: {
					description:
						'Starting the simulation for the ' +
						levels.value[gameIndex].name,
				},
				type: 'success',
			})()
			state.value.aciveGameIndex = gameIndex
			state.value.activeAiAgent = levels.value[gameIndex].agentId ?? ''
			await navigateTo('/game')
		}

		const levels = ref<Level[]>([
			{
				name: 'Restaurant',
				desc: 'Practice ordering food, asking for recommendations, and handling common dining interactions in a restaurant setting.',
				objective:
					'Successfully complete your order while keeping the conversation natural and polite.',
				agentId: '3VjJuSeZFAZLux3QD7H1',
				agentTitle: 'Waitress',
			},
			{
				name: 'Hotel Reception',
				desc: 'Practice booking a room, requesting amenities, and handling common hotel interactions.',
				objective:
					'Successfully check into a hotel and communicate your needs to the receptionist.',
				agentId: 'REqzQx621q1iJ5HMV720',
				agentTitle: 'Receptionist',
			},
			{
				name: 'Airport Check-in',
				desc: 'Learn how to check in for a flight, ask about baggage policies, and navigate security procedures.',
				objective:
					'Check in smoothly and get through airport procedures without confusion.',
				agentId: '',
			},
			{
				name: 'Shopping',
				desc: 'Learn how to ask for prices, find items, and interact with store employees while shopping.',
				objective:
					'Confidently navigate a shopping experience and purchase items.',
				agentId: '',
			},
			{
				name: 'Emergency Call',
				desc: 'Practice making an emergency call to request help and describe a situation.',
				objective:
					'Clearly communicate an emergency and provide essential details to get assistance.',
				agentId: '',
			},
			{
				name: 'Job Interview',
				desc: 'Prepare for a job interview by practicing common questions and answers in a professional setting.',
				objective:
					'Confidently introduce yourself and respond to interview questions.',
				agentId: '',
			},
			{
				name: 'Directions',
				desc: 'Learn how to ask for and give directions in an unfamiliar place.',
				objective:
					'Successfully navigate a location by understanding and giving clear directions.',
				agentId: '',
			},
			{
				name: 'Casual Conversation',
				desc: 'Engage in small talk and informal conversations to build confidence in everyday interactions.',
				objective:
					'Comfortably hold a natural conversation with a stranger or acquaintance.',
				agentId: '',
			},
			{
				name: 'Doctor’s Appointment',
				desc: 'Practice describing symptoms and communicating with medical professionals.',
				objective:
					'Effectively explain health concerns and understand doctor’s advice.',
				agentId: '',
			},
			{
				name: 'Public Transport',
				desc: 'Learn how to ask for tickets, directions, and travel schedules in a public transportation setting.',
				objective:
					'Navigate buses, trains, and subways with confidence.',
				agentId: '',
			},
		])

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

		return { account, contextOptions, levels, state, startGame }
	},
	{
		persist: {
			paths: ['levels', 'state', 'account'],
		},
	},
)
