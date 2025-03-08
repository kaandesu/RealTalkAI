<template>
	<aside
		:class="[
			'md:h-]svh fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto',
			,
			isCollapsed ? 'md:w-14' : 'md:w-60',
		]"
	>
		<layout>
			<section
				class="sticky top-0 flex flex-none items-center justify-between bg-background p-4 px-4 py-3 shadow"
			>
				<div
					:class="['flex items-center', !isCollapsed ? 'gap-2' : '']"
				>
					<Avatar
						class="transition-all"
						:class="isCollapsed ? 'h-6 w-6' : 'h-8 w-8'"
					>
						<AvatarImage
							v-if="config.sidebar.logo"
							:src="config.sidebar.logo"
							alt="logo"
						/>
						<AvatarFallback v-if="config.sidebar.logoFallback">{{
							config.sidebar.logoFallback
						}}</AvatarFallback>
					</Avatar>
					<div
						:class="[
							'ml-3 flex flex-col justify-end truncate',
							isCollapsed ? 'invisible w-0' : 'visible w-auto',
						]"
					>
						<span class="font-medium">{{
							$t(config.sidebar.title ?? '')
						}}</span>
						<span class="text-xs">{{ config.sidebar.desc }}</span>
					</div>
				</div>

				<!-- Toggle Button in mobile -->
				<Button
					variant="ghost"
					size="icon"
					class="md:hidden"
					aria-label="Toggle Navigation"
					aria-controls="dashboard-menu"
					:aria-expanded="navOpened!.toString()"
					@click="navOpened = !navOpened"
				>
					<Icon
						v-if="!navOpened"
						size="1.5rem"
						name="line-md:close-to-menu-alt-transition"
					/>
					<Icon v-else size="1.5rem" name="line-md:close" />
				</Button>
			</section>

			<Nav
				id="dashboard-menu"
				:class="
					cn(
						'h-full flex-1 overflow-y-auto overflow-x-hidden bg-white transition-[max-height] dark:bg-[#0A0A0A]',
						navOpened
							? 'max-h-screen'
							: 'max-h-1 overflow-hidden py-0 md:max-h-screen md:py-2',
					)
				"
				v-model:collapsed="isCollapsed"
				v-model:pages="config.sidebar.pages"
			/>

			<Button
				@click="isCollapsed = !isCollapsed"
				size="icon"
				variant="outline"
				class="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
			>
				<Icon
					size="1.25rem"
					:key="`${isCollapsed}`"
					:name="
						!isCollapsed
							? 'line-md:chevron-small-double-left'
							: 'line-md:chevron-small-double-right'
					"
				/>
			</Button>
		</layout>
	</aside>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useConfigStore } from '../stores/config'
import { tours } from '~/config/tours'

const config = useConfigStore()
const navOpened = defineModel<boolean>('open')
const isCollapsed = defineModel<boolean>('collapsed')

const viewport = useViewport()
watch(viewport.breakpoint, (to, from) => {
	if (to == 'sm' && from == 'md') isCollapsed.value = false
})

onMounted(() => {
	if (viewport.isGreaterOrEquals('tablet'))
		startTour('sidebar', tours.sidebarTourSetup(), true)
})
</script>
