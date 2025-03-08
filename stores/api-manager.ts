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

		const accountStore = useAccountStore()

		const getResults = async (
			gameId: number,
		): Promise<string[] | undefined> => {
			const convoId = conversationHistory.value.find(
				(c) => c.gameIndex == gameId,
			)?.convoId

			if (!convoId) {
				createToast({
					message: 'Conversation does not exist... Aborted.',
					toastOps: {
						description:
							'Play the game before checking the results.',
					},
					type: 'error',
				})()
				return []
			}

			try {
				const response = await fetch(
					`https://api.elevenlabs.io/v1/convai/conversations/${convoId}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'xi-api-key': accountStore.account.apiKey,
						},
					},
				)

				if (!response.ok) {
					throw new Error('Failed to fetch conversation data')
				}

				const data = await response.json()
				const transcript = data.transcript
					.map((entry: any) => entry.message)
					.filter(Boolean)

				console.log('Transcript:', transcript)

				conversationHistory.value = conversationHistory.value.filter(
					(c) => c.gameIndex !== gameId,
				)
				createToast({
					message: 'Results are out!!',
					toastOps: {
						description:
							'Click the chat icon to see the transcript of your talk!',
					},
					type: 'success',
				})()
				return transcript
			} catch (error) {
				console.error('Error fetching conversation data:', error)
				createToast({
					message: 'Error fetching results',
					toastOps: {
						description:
							'Could not retrieve the conversation data.',
					},
					type: 'error',
				})()
			}
		}

		const conversation = ref<Conversation | null>(null)

		const conversationHistory = ref<ConvoHistory[]>([])

		const startConversation = async (
			gameIndex: number,
			agentId: string,
		) => {
			createToast({
				message: 'Starting the conversation!',
				toastOps: {
					description: 'Enable your microphone and start speaking!',
				},
				type: 'info',
			})()

			let timeout: any

			try {
				await navigator.mediaDevices.getUserMedia({ audio: true })

				conversation.value = await Conversation.startSession({
					agentId,
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
					message: 'Conversation Error',
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
			getResults,
		}
	},
	{
		persist: {
			paths: ['conversationHistory'],
		},
	},
)
