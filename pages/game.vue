<template>
	<main class="box-border h-full w-full p-6">
		<section v-if="state.aciveGameIndex != -1" class="flex justify-between">
			<div class="text-bold hidden text-xl lg:block">
				Level - {{ levels[state.aciveGameIndex].name }}
			</div>
			<div
				class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
			>
				<Button
					class="flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"
				>
					<Icon
						name="material-symbols:play-arrow-rounded"
						class="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
					/>
					<Label class="hidden pr-3 sm:block md:pr-4 lg:pr-5">
						Start Conversation
					</Label>
				</Button>

				<Button
					variant="outline"
					disabled
					class="flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"
				>
					<Icon
						name="material-symbols:play-arrow-rounded"
						class="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
					/>
					<Label class="hidden pr-3 sm:block md:pr-4 lg:pr-5">
						Stop Conversation
					</Label>
				</Button>

				<!-- VR Button -->
				<Button
					@click="enterVRMode"
					variant="secondary"
					class="flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"
				>
					<Icon
						name="streamline:vr-headset-1"
						class="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
					/>
					<Label class="hidden pr-3 sm:block md:pr-4 lg:pr-5"
						>Fullscreen / VR</Label
					>
				</Button>
			</div>
		</section>

		<section v-else>
			There is no game here, go "levels" to select one.
		</section>

		<br />

		<div id="myEmbeddedScene" v-if="pageLoaded">
			<a-scene
				id="ascene"
				light="defaultLightsEnabled: true"
				renderer="colorManagement: true;"
				embedded
			>
				<a-sky src="sky2.jpg"></a-sky>

				<a-entity
					id="myModel"
					position="3.443 0.42 6.557"
					shadow="cast: false"
					gltf-model="people-at-restaurant-street/source/XYZ Game Ready - People at Restaurant Street Mod.glb"
					animation-mixer="clip: Take 001; loop: true"
				/>

				<a-entity
					id="myModel2"
					position="1.184 0.45 -1.107"
					scale="0.5 0.5 0.5"
					rotation="0 -30 0"
					shadow="cast: false"
					gltf-model="indian_office_woman.glb"
					animation-mixer="clip: mixamo.com; loop: true"
				/>
			</a-scene>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'

const account = useAccountStore()
const pageLoaded = ref<boolean>(false)

onMounted(() => (pageLoaded.value = true))

const { levels, state } = storeToRefs(account)

const enterVRMode = () => {
	const scene: any = document.querySelector('a-scene')
	if (scene && scene.enterVR) {
		scene.enterVR()
	} else {
		console.warn('VR mode is not supported or A-Frame not found.')
	}
}

definePageMeta({
	layout: 'dashboard',
})
</script>

<style scoped>
#myEmbeddedScene {
	height: min(calc(100% - 190px), 415px);
	width: 415px;
}
#ascene {
	height: min(calc(100% - 190px), 415px);
	width: 415px;
	display: block !important;
}
</style>
