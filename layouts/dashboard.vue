<template>
	<main class="flex">
		<sidebar
			v-model:collapsed="navState.collapsed"
			v-model:open="navState.open"
		/>
		<main
			class="mt-16 flex h-screen w-full transition-[margin] md:mt-0"
			:class="navState.collapsed ? 'md:ml-[3.7rem]' : 'md:ml-[15.15rem]'"
		>
			<div class="flex h-full w-full flex-col">
				<!-- Nav Bar -->
				<section
					class="box-border flex h-16 w-full items-center justify-between px-6 py-4"
				>
					<div></div>
					<div class="flex items-center justify-center gap-x-4">
						<!-- <nav-command /> -->
						<!-- <theme-select /> -->
						<lang-select />
						<dark-button />
						<profile-button />
					</div>
				</section>
				<!-- Page  -->
				<section class="h-[calc(100%-4rem)] w-full">
					<slot />
				</section>
			</div>
		</main>
	</main>
</template>

<script setup lang="ts">
import { useAppStateStore } from '../stores/app-state'
// @ts-ignore
import * as aframe from 'aframe'
// @ts-ignore
import * as aframeExtras from 'aframe-extras/loaders/animation-mixer'
onMounted(() => {
	console.log(aframe)
	console.log(aframeExtras)
})
const appState = useAppStateStore()
const { navState } = storeToRefs(appState)
</script>
