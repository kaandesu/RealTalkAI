import { defineStore } from 'pinia'
import { Conversation } from '@11labs/client'
import createToast from '~/utils/create-toast'
import {
	useAccountStore,
	type LevelResult,
	type LevelSuggestion,
} from './account'
import OpenAI from 'openai'

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

		const evaluateConversation = async (
			transcript: string[],
		): Promise<{
			result?: LevelResult
			suggestions?: LevelSuggestion
		}> => {
			try {
				const prompt = `
        You are an expert language tutor. Evaluate the following conversation transcript.
        Provide a JSON response with:
        - An evaluation of the user's conversation skills.
        - Scores (flowScore, grammarScore, vocabScore) from 1 to 100.
        - Constructive feedback.
        - A helpful language learning tip with an example.

         Be little strict with the scoring. If the user’s response is incomplete, unnatural, 
        it should be reflected in a lower score. Fluency and natural conversation flow are critical factors. While vocabulary is important, 
        the primary focus is on how well the user responds in a conversation, with emphasis on proper sentence construction and context.

        Example JSON response:
        {
          "result": {
            "flowScore": 63,
            "grammarScore": 67,
            "vocabScore": 47,
            "feedback": "Great effort! Your fluency is okay, but you need to work on using more varied vocabulary."
          },
          "suggestions": {
            "tip": "Focus on structuring your sentences with clear subject-verb-object order and avoid using overly short phrases.",
            "example": "Instead of saying 'very good', try 'excellent' or 'outstanding'."
          }
        }

        Here is the transcript:
        "${transcript.join('\n')}"
        `

				const openai = new OpenAI({
					apiKey: accountStore.account.apiKeyOpenAi,
					dangerouslyAllowBrowser: true,
				})

				const response = await openai.chat.completions.create({
					model: 'gpt-3.5-turbo',
					messages: [{ role: 'system', content: prompt }],
					temperature: 0.7,
					max_tokens: 500,
				})

				const parsedData: {
					result?: LevelResult
					suggestions?: LevelSuggestion
				} = JSON.parse(response.choices[0].message.content ?? '{}')

				if (parsedData.result != undefined) {
					parsedData.result.overallScore = Math.round(
						(parsedData.result.grammarScore +
							parsedData.result.vocabScore +
							parsedData.result.flowScore) /
							3,
					)
				}

				console.log('OpenAI responded with', parsedData)

				return parsedData
			} catch (error) {
				console.error('Error evaluating conversation:', error)
				createToast({
					message: 'Error evaluating conversation',
					toastOps: {
						description: 'Could not retrieve evaluation data.',
					},
					type: 'error',
				})()
				return {}
			}
		}

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
						conversationHistory.value =
							conversationHistory.value.filter(
								(c) => c.gameIndex !== gameIndex,
							)
						timeout = setTimeout(() => {
							const convoId = conversation.value?.getId()
							if (convoId != '' && convoId != undefined) {
								conversationHistory.value.push({
									gameIndex,
									convoId,
								})
							}
							console.log(
								'conversation history id:',
								conversationHistory.value,
							)
						}, 2000)
						apiState.value.connected = true
					},
					onDisconnect: () => {
						apiState.value.connected = false
						clearTimeout(timeout)

						const convoId = conversation.value?.getId()
						if (convoId != '' && convoId != undefined) {
							conversationHistory.value.push({
								gameIndex,
								convoId,
							})
						}
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
			evaluateConversation,
		}
	},
	{
		persist: {
			paths: ['conversationHistory'],
		},
	},
)
