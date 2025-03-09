<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface HowItWorksProps {
	badgeTitle: string
	title: string
	description: string
	image: string
}

const HowItWorksList: HowItWorksProps[] = [
	{
		badgeTitle: 'Immerse',
		title: 'Step Into Real Conversations',
		description:
			'Enter a VR-powered environment and engage in realistic conversations designed to challenge and improve your speaking skills.',
		image: 'vr-headset.png',
	},
	{
		badgeTitle: 'Speak',
		title: 'Practice with AI-Powered Characters',
		description:
			'Interact naturally with AI-driven voices that respond in real-time, providing an authentic and dynamic language learning experience.',
		image: 'conversation.png',
	},
	{
		badgeTitle: 'Evaluate',
		title: 'Get Instant Feedback',
		description:
			'Receive AI-generated insights on fluency, grammar, and vocabulary, helping you track progress and refine your skills.',
		image: 'feedback.png',
	},
	{
		badgeTitle: 'Improve',
		title: 'Apply Personalized Suggestions',
		description:
			'Use tailored tips and real-world examples to strengthen your language abilities and gain confidence in any scenario.',
		image: 'growth.png',
	},
]
</script>

<template>
	<section id="features" class="container py-24 sm:py-32">
		<div class="mb-8 text-center">
			<h2 class="mb-2 text-center text-lg tracking-wider text-primary">
				How It Works
			</h2>

			<h2 class="text-center text-3xl font-bold md:text-4xl">
				Step-by-Step Process
			</h2>
		</div>

		<div class="relative mx-auto lg:w-[80%]">
			<div
				v-for="(
					{ badgeTitle, title, description, image }, index
				) in HowItWorksList"
				:key="title"
				:class="[
					'mb-8 flex items-center',
					{ 'flex-row-reverse': index % 2 !== 0 },
				]"
			>
				<Card class="h-full border-0 bg-transparent shadow-none">
					<CardHeader>
						<CardTitle>
							{{ title }}
						</CardTitle>
					</CardHeader>

					<CardContent class="w-[80%] text-muted-foreground">
						{{ description }}
					</CardContent>
				</Card>

				<img
					:src="image"
					:alt="`Image describing ${title} `"
					className="w-[150px]  md:w-[250px] lg:w-[300px] mx-auto -scale-x-100 "
				/>
				<div
					:class="[
						'absolute right-0 -z-10 h-72 w-44 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10 lg:h-80 lg:w-64',
						{
							'left-0': index % 2 !== 0,
						},
					]"
				></div>
			</div>
		</div>
	</section>
</template>
