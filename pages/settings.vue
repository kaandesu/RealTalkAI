<template>
	<main class="box-border h-full w-full p-6">
		<div class="text-3xl font-bold">Settings</div>
		Manage your account settings and preferences.
		<br />
		<Separator class="my-5"></Separator>
		<div class="grid w-full max-w-sm items-center gap-1.5">
			<Label for="api">Eleven Labs API KEY</Label>
			<Input
				id="api"
				placeholder="Enter ElevenLabs API key"
				v-model="temp"
			/>
			<Label class="mt-5" for="openaiapi">OpenAI API KEY</Label>
			<Input
				id="openaiapi"
				placeholder="Enter OpenAi API key"
				v-model="temp2"
			/>
			<Button class="relative mt-5" @click="updateSettings()">
				<div
					class="absolute right-0 top-0 h-5 w-5 translate-x-[50%] translate-y-[-50%] rounded-full bg-red-500"
					v-if="
						temp != account.account.apiKey ||
						temp2 != account.account.apiKeyOpenAi
					"
				/>
				Update Settings
			</Button>
			<Button class="mt-5" variant="secondary"> Logout </Button>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'
const account = useAccountStore()

const temp = ref<string>('')
const temp2 = ref<string>('')

onMounted(() => {
	if (account.account.apiKey != '') {
		temp.value = account.account.apiKey
	}

	if (account.account.apiKeyOpenAi != '') {
		temp2.value = account.account.apiKeyOpenAi
	}
})

const updateSettings = () => {
	account.account.apiKey = temp.value
	account.account.apiKeyOpenAi = temp2.value

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
