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
								:disabled="index != 0"
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
							<section class="text-xs italic text-gray-600">
								Feedback: {{ level.result?.feedback ?? 'N/A' }}
							</section>
							<section
								class="flex items-center justify-center gap-x-3"
							>
								<ConvoDialog
									:disabled="index != 0"
									:gameId="index"
									:gameTitle="level.name"
									:transcript="
										level.transcript ?? ['N/A', 'N/A']
									"
								/>
								<Button
									:disabled="index != 0"
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
							<p class="ml-12 flex justify-center">
								Tip:
								{{
									level.suggestions?.tip ??
									'No suggestion available'
								}}
							</p>
							<p
								v-if="level.suggestions?.example"
								class="ml-12 mt-1 text-xs italic text-gray-600"
							>
								Example: {{ level.suggestions.example }}
							</p>
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
		console.log('transcript was empty sending fake transcript')
		result = [
			'Good evening! Welcome to our restaurant. How can I help you today?',
			'Um, yes. I want... food. What you have?',
			'We have many options. We have a Caesar Salad for eight euros, Beef Burger for twelve euros, Chicken Curry for fourteen euros, and much more. What would you like?',
			'Ah, I take... burger, please.',
			'Okay, one Beef Burger. Would you like fries or salad with that?',
			'Uh... fries. Yes, fries.',
			'Perfect! Anything to drink? We have water, soda, coffee...',
			'Water... and maybe... coffee? Small one?',
			'Got it. One water and a small coffee. Anything else?',
			'No, no more. Just that, please.',
			'Alright! Your order is one Beef Burger with fries, water, and a small coffee. It will be ready soon. Thank you!',
			'Thank you! Good, good.',
		]
	}

	console.log('sending to openai')
	const evaluation = await apiManager.evaluateConversation(result)
	levels.value[gameId].result = evaluation.result
	levels.value[gameId].suggestions = evaluation.suggestions
}

definePageMeta({
	layout: 'dashboard',
})
</script>
