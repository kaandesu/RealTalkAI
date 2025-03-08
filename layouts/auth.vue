<template>
	<main class="fixed left-0 top-0 flex h-full w-full">
		<section
			v-if="currentPageInfo"
			class="relative hidden flex-1 bg-cover bg-no-repeat text-lg text-white lg:block"
			:class="`${currentPageInfo?.auth?.background ? currentPageInfo.auth.background : 'bg-primary dark:bg-secondary'}`"
			:style="`background-image: url('${currentPageInfo?.auth?.backgroundImage ?? ''}')`"
		>
			<NuxtLink
				to="/"
				class="ml-8 mt-10 flex items-center justify-start gap-x-3"
			>
				<Avatar v-if="sidebar.logo" class="h-6 w-6 rounded">
					<AvatarImage :src="sidebar.logo"></AvatarImage>
				</Avatar>
				{{ sidebar.title }}
			</NuxtLink>
		</section>
		<section class="flex flex-1 items-center justify-center bg-background">
			<div
				class="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]"
			>
				<!-- Auth Page Slot -->
				<slot />

				<!-- TOS_Privacy_links -->
				<section
					class="flex items-center justify-center text-sm font-light"
				>
					<a
						target="_blank"
						:href="structure.authentication.tosAndPrivacy?.tos"
						class="text-primary underline"
					>
						Terms of Service
					</a>
					<div
						v-if="
							structure.authentication.tosAndPrivacy?.privacy !=
							''
						"
					>
						<span class="mx-2 text-primary">|</span>
						<a
							target="_blank"
							:href="
								structure.authentication.tosAndPrivacy?.privacy
							"
							class="text-primary underline"
						>
							Privacy Policy
						</a>
					</div>
				</section>
				<!-- /TOS_Privacy_links -->
			</div>
		</section>
	</main>
</template>
<script setup lang="ts">
import { useConfigStore } from '../stores/config'
import { useAppStateStore } from '../stores/app-state'

const { currentPageInfo } = storeToRefs(useAppStateStore())
const { sidebar, structure } = storeToRefs(useConfigStore())

const Title = () =>
	h('div', { class: 'flex flex-col space-y-2 text-center mb-6' }, [
		h(
			'h1',
			{ class: 'text-2xl font-semibold tracking-tight' },
			currentPageInfo.value?.auth?.title ?? '',
		),
		h(
			'p',
			{ class: 'text-sm text-muted-foreground' },
			currentPageInfo.value?.auth?.desc ?? '',
		),
	])
provide('TitleComp', Title)
provide(
	'authStucture',
	computed(() => currentPageInfo),
)
</script>
