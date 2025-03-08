<template>
	<main class="box-border h-full w-full p-6">
		<section v-if="state.aciveGameIndex != -1">
			<div class="text-bold text-xl">
				Level - {{ levels[state.aciveGameIndex].name }}
			</div>
			<br />
			Starting the game...
		</section>
		<section v-else>
			There is no game here, go "levels" to select one.
		</section>
		<br />
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'
const account = useAccountStore()

const { levels, state } = storeToRefs(account)

definePageMeta({
	layout: 'dashboard',
})
</script>
