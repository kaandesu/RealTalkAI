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
				Sign in
			</NuxtLink>
		</div>

		<section v-if="structure.authentication.custom">
			<AutoForm
				class="space-y-4"
				:schema="schema"
				:field-config="signUpFormFileds"
				@submit="onSubmit"
			>
				<template #acceptTerms="slotProps">
					<AutoFormField v-bind="slotProps" />
				</template>

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
		<section class="grid grid-cols-2 gap-4">
			<Button
				v-for="(provider, i) in structure.authentication.providers"
				:key="provider"
				variant="outline"
				type="button"
				:tabindex="`${13 + i}`"
				class="box-border flex items-center justify-center p-2"
				:disabled="isLoading"
				@click="handleClick()"
			>
				<Icon :name="`mdi:${provider}`" class="mr-2 h-4 w-4" />
				<label class="pointer-events-none capitalize">
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
import { AutoForm, AutoFormField } from '@/components/ui/auto-form'
import { useConfigStore } from '../stores/config'
const config = useConfigStore()
const { structure } = storeToRefs(config)

const isLoading = ref(false)
const Title = inject('TitleComp')

const handleClick = async () => {
	isLoading.value = true
	setTimeout(async () => {
		isLoading.value = false
		await navigateTo('/dashboard')
	}, 1000)
}

definePageMeta({
	layout: 'auth',
})

const signUpFormFileds = {
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
	acceptTerms: {
		label: 'Accept terms and conditions.',
		inputProps: {
			required: true,
		},
	},
}

const schema = z.object({
	email: z
		.string({
			required_error: 'Username is required.',
		})
		.min(2, {
			message: 'Username must be at least 2 characters.',
		}),

	password: z
		.string({
			required_error: 'Password is required.',
		})
		.min(8, {
			message: 'Password must be at least 8 characters.',
		}),

	acceptTerms: z.boolean().refine((value) => value, {
		message: 'You must accept the terms and conditions.',
		path: ['acceptTerms'],
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
