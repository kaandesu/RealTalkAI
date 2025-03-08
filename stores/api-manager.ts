import { defineStore } from 'pinia'
import { Conversation } from '@11labs/client'
import createToast from '~/utils/create-toast'

export type ApiState = {
	agentStatus: 'disconnected' | 'speaking' | 'listening'
	connected: boolean
}

export type ConvoHistory = {
	convoId: string
	gameIndex: number
}

export const useApiStore = defineStore(
	'ApiStore',
	() => {
		const apiState = ref<ApiState>({
			agentStatus: 'disconnected',
			connected: false,
		})

		const conversation = ref<Conversation | null>(null)

		const conversationHistory = ref<ConvoHistory[]>([])

		const startConversation = async (gameIndex: number) => {
			createToast({
				message: 'Starting the conversation!',
				toastOps: {
					description: 'Enable your microphone and start speaking!',
				},
				type: 'success',
			})()

			let timeout: any

			try {
				// Request microphone permission
				await navigator.mediaDevices.getUserMedia({ audio: true })
				// Start the conversation
				conversation.value = await Conversation.startSession({
					agentId: '3VjJuSeZFAZLux3QD7H1',
					onConnect: () => {
						timeout = setTimeout(() => {
							conversationHistory.value.push({
								gameIndex,
								convoId: conversation.value?.getId() ?? '',
							})
							console.log(
								'conversation history id:',
								conversationHistory.value,
							)
						}, 2000)
						apiState.value.connected = true
					},
					onDisconnect: () => {
						apiState.value.connected = false
					},
					onError: (error) => {
						console.error('Error:', error)
						clearTimeout(timeout)
					},
					onModeChange: (mode) => {
						apiState.value.agentStatus =
							mode.mode === 'speaking' ? 'speaking' : 'listening'
					},
				})
			} catch (error) {
				console.error('Failed to start conversation:', error)

				clearTimeout(timeout)
				createToast({
					message: 'Converstaion Error',
					toastOps: {
						description: 'Failed to start conversation:',
					},
					type: 'error',
				})()
			}
		}

		const stopConversation = async () => {
			if (conversation != null && conversation) {
				await conversation.value?.endSession()
				conversation.value = null
				createToast({
					message: 'Check your results!',
					toastOps: {
						description:
							'Navigate to the "Results" tab on the dashboard to see how well you did! ',
					},
					type: 'success',
				})()
			}
		}

		return {
			conversation,
			apiState,
			stopConversation,
			startConversation,
			conversationHistory,
		}
	},
	{
		persist: {
			paths: ['conversationHistory'],
		},
	},
)
