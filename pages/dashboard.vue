<template>
	<main class="box-border h-full w-full p-6 pt-2">
		<section>
			<div class="text-3xl font-bold">Dashboard</div>
			Access your main levels and key metrics.
		</section>
		<br />

		<Tabs default-value="levels" class="space-y-4">
			<section class="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="levels"> Levels </TabsTrigger>
					<TabsTrigger value="results"> Results </TabsTrigger>
					<TabsTrigger value="suggestions"> Suggestions </TabsTrigger>
				</TabsList>
			</section>
			<TabsContent value="levels">
				<section
					class="flex w-full flex-wrap justify-around gap-5 overscroll-y-auto overscroll-x-none"
				>
					<Card
						class="w-64 shadow-md transition-all hover:scale-[1.02] hover:shadow-xl"
						v-for="(level, index) in levels"
					>
						<CardHeader>
							<CardTitle
								>Level {{ index + 1 }} - {{ level.name }}
							</CardTitle>
							<CardDescription>
								{{ level.desc }}
							</CardDescription>
						</CardHeader>
						<CardFooter class="flex flex-col gap-y-5">
							<section>Objective: {{ level.objective }}</section>
							<Button
								@click="account.startGame(index)"
								:disabled="level.agentId == ''"
								variant="outline"
								class="flex items-center justify-center gap-x-3 rounded-sm"
							>
								<Icon
									name="material-symbols:play-arrow-rounded"
									class="h-8 w-8"
								/>

								<Label class="pointer-events-none pr-5"
									>Play</Label
								>
							</Button>
						</CardFooter>
					</Card>
				</section>
			</TabsContent>
			<TabsContent value="results">
				<section
					class="flex w-full flex-wrap justify-around gap-5 overscroll-y-auto overscroll-x-none"
				>
					<Card
						class="w-64 shadow-md transition-all hover:scale-[1.02] hover:shadow-xl"
						v-for="(level, index) in levels"
						:key="level.name"
					>
						<CardHeader>
							<CardTitle
								>Level {{ index + 1 }} -
								{{ level.name }} Result</CardTitle
							>
						</CardHeader>
						<CardDescription>
							<p class="ml-12 font-semibold">
								Overall Score:
								{{ level.result?.overallScore ?? 'N/A' }}/100
							</p>
							<ul class="ml-12 list-disc pl-5 text-sm">
								<li>
									Flow:
									{{ level.result?.flowScore ?? 'N/A' }}/100
								</li>
								<li>
									Grammar:
									{{
										level.result?.grammarScore ?? 'N/A'
									}}/100
								</li>
								<li>
									Vocabulary:
									{{ level.result?.vocabScore ?? 'N/A' }}/100
								</li>
							</ul>
						</CardDescription>
						<CardFooter class="mt-5 flex flex-col gap-y-5">
							<section class="text-xs text-gray-600">
								<i>Feedback</i>:
								{{ level.result?.feedback ?? 'N/A' }}
							</section>
							<section
								class="flex items-center justify-center gap-x-3"
							>
								<ConvoDialog
									:disabled="level.agentId == ''"
									:gameId="index"
									:gameTitle="level.name"
									:transcript="
										level.transcript ?? ['N/A', 'N/A']
									"
								/>
								<Button
									:disabled="level.agentId == ''"
									variant="outline"
									class="flex items-center justify-center gap-x-3 rounded-sm"
									@click="handleGetResult(index)"
								>
									<Icon
										name="stash:search-results-duotone"
										class="h-6 w-6"
									/>
									<Label
										class="pointer-events-none w-5 text-wrap pr-5 text-center text-xs"
									>
										Get Results!
									</Label>
								</Button>
							</section>
						</CardFooter>
					</Card>
				</section>
			</TabsContent>
			<TabsContent value="suggestions">
				<section
					class="flex w-full flex-wrap justify-around gap-5 overscroll-y-auto overscroll-x-none"
				>
					<Card
						class="w-64 shadow-md transition-all hover:scale-[1.02] hover:shadow-xl"
						v-for="(level, index) in levels"
						:key="level.name"
					>
						<CardHeader>
							<CardTitle
								>Level {{ index + 1 }} -
								{{ level.name }} Suggestion</CardTitle
							>
						</CardHeader>
						<CardContent>
							<div
								class="flex flex-col items-center justify-center space-x-2"
							>
								<p class="text-xs">
									Tip:
									{{
										level.suggestions?.tip ??
										'No suggestion available'
									}}
								</p>

								<Separator
									v-if="level.suggestions?.example"
									label="Example"
									class="mb-3 mt-3"
								/>

								<p
									v-if="level.suggestions?.example"
									class="text-xs"
								>
									{{ level.suggestions.example }}
								</p>
							</div>
						</CardContent>
					</Card>
				</section>
			</TabsContent>
		</Tabs>
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'
import { useApiStore } from '../stores/api-manager'
const account = useAccountStore()
const apiManager = useApiStore()

const { levels } = storeToRefs(account)

const handleGetResult = async (gameId: number) => {
	let result: string[] | undefined = await apiManager.getResults(gameId)
	console.log('Result of level #', gameId + 1, ' is:', result)
	if (result == undefined) return

	levels.value[gameId].transcript = result

	if (result.length <= 1) {
		console.log('transcript was empty sending FAKE very FAKE transcript')

		result = [
			'Welcome to the Real Talk Restaurant! I’m here to assist you with your dining experience…',
			'I just want one coffee, quick.',
			'Sure thing! We have Espresso for three Euro…',
			'That was it. Thank you. Thank you. Bye-bye.',
		]
		levels.value[gameId].transcript = result
	}

	const evaluation = await apiManager.evaluateConversation(result)
	if (evaluation != undefined) {
		levels.value[gameId].result = evaluation.result
		levels.value[gameId].suggestions = evaluation.suggestions
		account.state.aciveGameIndex = -1
		account.state.activeAiAgent = ''
	}
}

definePageMeta({
	layout: 'dashboard',
})
</script>
