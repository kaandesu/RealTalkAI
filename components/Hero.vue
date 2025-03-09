<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { buttonVariants } from '@/components/ui/button'
const mode = useColorMode()

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
	<section class="container">
		<div
			class="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl"
		>
			<div class="space-y-8 text-center">
				<div
					class="mx-auto max-w-screen-md text-center text-5xl font-bold md:text-6xl"
				>
					<h1>
						Immersive conversations for
						<span
							class="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text text-transparent"
							>active
						</span>
						language learning
					</h1>
				</div>

				<p
					class="mx-auto max-w-screen-sm text-xl text-muted-foreground"
				>
					Practice real-world conversations in a dynamic, AI-powered
					environment. Enhance your language skills with interactive
					scenarios, instant feedback, and personalized learning
					insights.
				</p>

				<div class="space-y-4 md:space-x-4 md:space-y-0">
					<NuxtLink to="/dashboard" :class="cn(buttonVariants({}))">
						Get Started

						<ArrowRight
							class="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1"
						/>
					</NuxtLink>

					<theme-select class="" />
					<Button
						as-child
						variant="secondary"
						class="w-5/6 font-bold md:w-1/4"
					>
						<a
							href="https://github.com/kaandesu/RealTalkAI.git"
							target="_blank"
							>Github respository</a
						>
					</Button>
				</div>
			</div>

			<div class="group relative mt-14">
				<!-- gradient shadow -->
				<div
					class="img-shadow-animation absolute -top-6 right-12 h-12 w-[90%] rounded-full bg-primary/50 blur-3xl lg:h-[80%]"
				></div>

				<img
					class="rouded-lg img-border-animation relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-t-primary/30 leading-none md:w-[1200px]"
					:src="mode == 'light' ? 'ss.png' : 'ss-dark.png'"
					alt="dashboard using shadcn-vue"
				/>

				<!-- gradient effect img -->
				<div
					class="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"
				></div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.img-shadow-animation {
	animation-name: img-shadow-animation;
	animation-iteration-count: infinite;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-direction: alternate;
}

.img-border-animation {
	animation-name: img-border-animation;
	animation-iteration-count: infinite;
	animation-duration: 2s;
	animation-timing-function: linear;
	animation-direction: alternate;
}

@keyframes img-shadow-animation {
	from {
		opacity: 0.5;
		transform: translateY(30px);
	}

	to {
		opacity: 1;
		transform: translateY(0px);
	}
}
@keyframes img-border-animation {
	from {
		@apply border-t-primary/10;
	}

	to {
		@apply border-t-primary/60;
	}
}
</style>
