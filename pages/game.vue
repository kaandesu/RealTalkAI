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
					@click="handleStartConvo(state.aciveGameIndex ?? 0)"
					:disabled="apiState.connected"
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
					@click="apiManager.stopConversation()"
					:disabled="!apiState.connected"
					class="flex items-center justify-center gap-x-2 rounded-sm px-3 sm:px-4 md:px-5 lg:px-6"
				>
					<Icon
						name="material-symbols:stop-circle-outline"
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

		<div
			v-if="state.aciveGameIndex == 0 && pageLoaded"
			id="myEmbeddedScene"
			class="h-full w-full"
		>
			<a-scene
				id="ascene"
				light="defaultLightsEnabled: true"
				renderer="colorManagement: true;"
				cursor="rayOrigin: mouse"
				embedded
			>
				<a-sky src="sky2.jpg"></a-sky>

				<a-camera
					position="0 1.6 0"
					look-controls
					fov="80"
					wasd-controls
				></a-camera>

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

		<div
			v-if="state.aciveGameIndex == 1 && pageLoaded"
			id="myEmbeddedScene"
			class="w-full"
		>
			<a-scene
				id="ascene"
				light="defaultLightsEnabled: true"
				renderer="colorManagement: true;"
				embedded
			>
				<a-sky src="hotelsky.jpg"></a-sky>
				<a-entity
					id="myModel"
					position="-17.031 0 -25.878"
					scale="1.1 1.1 1.1"
					rotation="0 180 0"
					shadow="cast: false"
					gltf-model="hospital_reception_environment.glb"
				/>

				<a-camera
					position="0 1.6 0"
					look-controls
					fov="80"
					wasd-controls
				></a-camera>

				<a-entity
					id="myModel2"
					position="-0.213 0 -1.594"
					scale="1.2 1.2 1.2"
					shadow="cast: false"
					gltf-model="business_man_-_low_polygon_game_character.glb"
					animation-mixer="clip: Rig|idle; loop: true"
				/>
			</a-scene>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'
import { useApiStore } from '../stores/api-manager'

const account = useAccountStore()
const apiManager = useApiStore()

const { apiState } = storeToRefs(apiManager)

const pageLoaded = ref<boolean>(false)

onMounted(() => (pageLoaded.value = true))

const { levels, state } = storeToRefs(account)

const handleStartConvo = async (gameId: number) => {
	if (account.state.activeAiAgent == '') {
		createToast({
			message: 'Could not start the conversation :(',
			toastOps: {
				description: 'AI agent does not exist.',
			},
			type: 'error',
		})()
	}
	await apiManager.startConversation(gameId, account.state.activeAiAgent)
	enterVRMode()
}

const enterVRMode = () => {
	const scene: any = document.querySelector('a-scene')
	if (!scene) {
		console.warn('A-Frame scene not found.')
		return
	}
	// Ensure WebXR is supported
	if (scene.enterVR) {
		scene.enterVR()
	} else {
		console.warn('VR mode is not supported on this device or browser.')
	}
}

definePageMeta({
	layout: 'dashboard',
})
</script>

<style scoped>
#myEmbeddedScene {
	height: calc(100% - 180px);
}
#ascene {
	height: 100%;
	width: 100%;
	display: block !important;
}
</style>
