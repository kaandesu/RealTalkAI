<template>
	<main class="p-5">
		<Title />
		<div
			class="absolute right-4 top-4 flex h-6 items-center justify-center gap-x-4 transition-all md:right-8 md:top-8"
		>
			<dark-button />
			<theme-select />
			<NuxtLink
				to="/sign-in"
				:class="cn(buttonVariants({ variant: 'ghost' }))"
			>
				Sign In
			</NuxtLink>

			<NuxtLink
				to="/sign-up"
				:class="cn(buttonVariants({ variant: 'ghost' }))"
			>
				Sign Up
			</NuxtLink>
		</div>

		<section v-if="structure.authentication.custom">
			<AutoForm
				class="space-y-6"
				:schema="schema"
				:field-config="{
					email: {
						inputProps: {
							type: 'email',
							placeholder: 'email',
						},
					},
				}"
				@submit="onSubmit"
			>
				<Button
					variant="default"
					tabindex="13"
					type="submit"
					class="box-border w-full"
					:disabled="isLoading"
				>
					Reset Password
				</Button>
			</AutoForm>
		</section>
	</main>
</template>

<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button, buttonVariants } from '@/components/ui/button'
import { AutoForm } from '@/components/ui/auto-form'
import { useConfigStore } from '../stores/config'
import { pagesDict } from '@/config/pages'
import { useAppStateStore } from '~/stores/app-state'

const appState = useAppStateStore()

const config = useConfigStore()
const { structure } = storeToRefs(config)

const isLoading = ref(false)
const Title = inject('TitleComp')
definePageMeta({
	layout: 'auth',
})

const schema = z.object({
	email: z.string().email('Email is required'),
})

async function onSubmit(values: Record<string, any>) {
	createToast({
		message: 'You submitted the following values:',
		toastOps: {
			description: h(
				'pre',
				{ class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
				h(
					'code',
					{ class: 'text-white' },
					JSON.stringify(values, null, 2),
				),
			),
		},
	})()

	await appState.navigatePage(pagesDict.ChangePassword.value)
}
</script>
