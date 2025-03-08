<template>
	<main class="box-border h-full w-full p-6">
		<div class="text-3xl font-bold">Settings</div>
		Manage your account settings and preferences.
		<br />
		<Separator class="my-5"></Separator>
		<div class="grid w-full max-w-sm items-center gap-1.5">
			<Label for="api">Eleven Labs API KEY</Label>
			<Input id="api" placeholder="ENTER API KEY" v-model="temp" />
			<Button class="mt-5" @click="updateSettings()">
				Update Settings
			</Button>
			<Button class="mt-10" variant="secondary"> Logout </Button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'
const account = useAccountStore()

const temp = ref<string>('')

onMounted(() => {
	if (account.account.apiKey != '') {
		temp.value = account.account.apiKey
	}
})

const updateSettings = () => {
	if (temp.value == '') {
		createToast({
			message: 'Oh no! Update failed.',
			toastOps: {
				description: 'Please enter a valid API key!',
			},
			type: 'error',
		})()

		return
	}

	account.account.apiKey = temp.value

	createToast({
		message: 'Success',
		toastOps: {
			description: 'Updated the user settings!',
		},
		type: 'success',
	})()
}

definePageMeta({
	layout: 'dashboard',
})
</script>
