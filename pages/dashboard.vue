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
					class="flex w-full flex-wrap justify-between gap-5 overscroll-y-auto overscroll-x-none"
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
								variant="outline"
								class="flex items-center justify-center gap-x-3 rounded-sm"
							>
								<Icon
									name="material-symbols:play-arrow-rounded"
									class="h-8 w-8"
								/>

								<Label class="pr-5">Play</Label>
							</Button>
						</CardFooter>
					</Card>
				</section>
			</TabsContent>
			<TabsContent value="results">
				<section
					class="flex w-full flex-wrap justify-between gap-5 overscroll-y-auto overscroll-x-none"
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
										level.result?.grammerScore ?? 'N/A'
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
							<Button
								@click="account.startGame(index)"
								variant="outline"
								class="flex items-center justify-center gap-x-3 rounded-sm"
							>
								<Icon
									name="material-symbols:replay-rounded"
									class="h-6 w-6"
								/>
								<Label class="pr-5">Retry</Label>
							</Button>
						</CardFooter>
					</Card>
				</section>
			</TabsContent>
			<TabsContent value="suggestions">
				<section
					class="flex w-full flex-wrap justify-between gap-5 overscroll-y-auto overscroll-x-none"
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
						<CardFooter class="mt-5 flex flex-col gap-y-5">
							<Button
								variant="outline"
								class="flex items-center justify-center gap-x-3 rounded-sm"
							>
								<Icon
									name="material-symbols:play-arrow-rounded"
									class="h-6 w-6"
								/>
								<Label class="pr-5">Try Again</Label>
							</Button>
						</CardFooter>
					</Card>
				</section>
			</TabsContent>
		</Tabs>
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'
const account = useAccountStore()

const { levels } = storeToRefs(account)

definePageMeta({
	layout: 'dashboard',
})
</script>
