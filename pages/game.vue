<template>
	<main class="box-border h-full w-full p-6">
		<section v-if="state.aciveGameIndex != -1" class="flex justify-between">
			<div class="text-bold text-xl">
				Level - {{ levels[state.aciveGameIndex].name }}
			</div>
			<div class="flex items-center justify-center gap-x-5">
				<Button
					class="flex items-center justify-center gap-x-3 rounded-sm"
				>
					<Icon
						name="material-symbols:play-arrow-rounded"
						class="h-8 w-8"
					/>

					<Label class="pr-5">Start Conversation</Label>
				</Button>

				<Button
					variant="outline"
					disabled
					class="flex items-center justify-center gap-x-3 rounded-sm"
				>
					<Icon
						name="material-symbols:play-arrow-rounded"
						class="h-8 w-8"
					/>

					<Label class="pr-5">Stop Conversation</Label>
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
				style="height: 300px; width: 500px"
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
					id="myModel"
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
import * as THREE from 'three'
const account = useAccountStore()

const pageLoaded = ref<boolean>(false)

onMounted(() => (pageLoaded.value = true))

const { levels, state } = storeToRefs(account)

definePageMeta({
	layout: 'dashboard',
})
</script>

<style scoped>
#myEmbeddedScene {
	height: 200px;
	width: 300px;
}
#ascene {
	height: 200px;
	width: 300px;
	display: block !important;
}
</style>
