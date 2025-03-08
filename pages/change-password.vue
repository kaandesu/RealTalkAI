<template>
	<main class="p-5">
		<Title />
		<div
			class="absolute right-4 top-4 flex h-6 items-center justify-center gap-x-4 transition-all md:right-8 md:top-8"
		>
			<dark-button />
			<theme-select />
			<NuxtLink
				to="/forgot-password"
				:class="cn(buttonVariants({ variant: 'ghost' }))"
			>
				Forgot Password?
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
					password: {
						label: 'Password',
						inputProps: {
							type: 'password',
							placeholder: '••••••••',
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
					Sign in with email
				</Button>
			</AutoForm>

			<Separator
				v-if="structure.authentication.providers?.length != 0"
				label="Or continue with"
				class="mb-6 mt-6"
			/>
		</section>

		<!-- NOTE: federated login buttons -->
		<section
			v-if="structure.authentication.providers?.length != 0"
			class="grid grid-cols-2 gap-4"
		>
			<Button
				v-for="(provider, i) in structure.authentication.providers"
				:key="provider"
				variant="outline"
				type="button"
				:tabindex="`${13 + i}`"
				class="box-border flex items-center justify-center p-2"
				:disabled="isLoading"
			>
				<Icon :name="`mdi:${provider}`" class="mr-2 h-4 w-4" />
				<label class="capitalize">
					{{ provider }}
				</label>
			</Button>
		</section>
	</main>
</template>

<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button, buttonVariants } from '@/components/ui/button'
import { AutoForm } from '@/components/ui/auto-form'
import { useConfigStore } from '../stores/config'
const config = useConfigStore()
const { structure } = storeToRefs(config)

const isLoading = ref(false)
const Title = inject('TitleComp')
definePageMeta({
	layout: 'auth',
})

// TODO: add password rules
const schema = z.object({
	email: z.string().email('Email is required'),
	password: z
		.string({
			required_error: 'Password is required.',
		})
		.min(8, {
			message: 'Password must be at least 8 characters.',
		}),
})

function onSubmit(values: Record<string, any>) {
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
}
</script>
