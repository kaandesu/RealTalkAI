<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
	Paintbrush,
	MessageCircle,
	TabletSmartphone,
	BadgeCheck,
	Goal,
	PictureInPicture,
	MousePointerClick,
	Newspaper,
} from 'lucide-vue-next'

interface FeaturesProps {
	icon: string
	title: string
	description: string
}

const featureList: FeaturesProps[] = [
	{
		icon: 'chatBubble',
		title: 'Real Conversations',
		description:
			'Practice with AI-driven characters in realistic scenarios, improving fluency naturally.',
	},
	{
		icon: 'brain',
		title: 'AI-Powered Feedback',
		description:
			'Get instant analysis on grammar, vocabulary, and fluency to refine your skills faster.',
	},
	{
		icon: 'headset',
		title: 'Lifelike AI Voices',
		description:
			'Experience natural speech interactions with advanced voice synthesis for a more immersive learning experience.',
	},
	{
		icon: 'globe',
		title: 'Practical Language Skills',
		description:
			'Learn how to navigate real-world situations, from ordering food to job interviews.',
	},
	{
		icon: 'barChart',
		title: 'Personalized Progress',
		description:
			'Track performance and receive tailored suggestions to improve your language skills.',
	},
	{
		icon: 'vr',
		title: 'Immersive VR Learning',
		description:
			'Step into virtual environments and interact just like you would in real life.',
	},
]

const iconMap: Record<
	string,
	| typeof TabletSmartphone
	| typeof BadgeCheck
	| typeof Goal
	| typeof PictureInPicture
	| typeof Paintbrush
	| typeof MousePointerClick
	| typeof MessageCircle
	| typeof Newspaper
> = {
	tabletSmartphone: TabletSmartphone,
	badgeCheck: BadgeCheck,
	goal: Goal,
	pictureInPicture: PictureInPicture,
	paintbrush: Paintbrush,
	mousePointerClick: MousePointerClick,
	messageCircle: MessageCircle,
	newspaper: Newspaper,
}
</script>

<template>
	<section id="features" class="container py-24 sm:py-32">
		<h2 class="mb-2 text-center text-lg tracking-wider text-primary">
			Features
		</h2>

		<h2 class="mb-4 text-center text-3xl font-bold md:text-4xl">
			What Makes Us Different
		</h2>

		<h3
			class="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2"
		>
			RealTalkAI goes beyond traditional language learning by immersing
			you in real-world conversations. With AI-driven feedback, lifelike
			voices, and interactive VR scenarios, you gain practical speaking
			skills in a natural and engaging way.
		</h3>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<div
				v-for="{ icon, title, description } in featureList"
				:key="title"
			>
				<Card class="h-full border-0 bg-background shadow-none">
					<CardHeader class="flex items-center justify-center">
						<div
							class="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10"
						>
							<component
								:is="iconMap[icon]"
								class="size-6 text-primary"
							/>
						</div>

						<CardTitle>
							{{ title }}
						</CardTitle>
					</CardHeader>

					<CardContent class="text-center text-muted-foreground">
						{{ description }}
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</template>

<style lang="less" scoped></style>
