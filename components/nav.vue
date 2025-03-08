<template>
	<nav class="overflow-y-auto overflow-x-hidden dark:[color-scheme:dark]">
		<div v-for="page in pages" :id="`tour-${page.uid}`">
			<TooltipProvider
				:disabled="!collapsed"
				:delay-duration="150"
				v-if="
					!(
						page.hideMobile === true &&
						!$viewport.isGreaterOrEquals('md')
					)
				"
			>
				<Tooltip>
					<TooltipTrigger as-child>
						<Collapsible :open="!page.isCollapsed" class="w-full">
							<Button
								variant="ghost"
								class="flex h-6 w-[90%] items-center justify-between space-x-4 px-4 font-normal"
								:class="
									currentPageInfo?.uid === page.uid
										? 'bg-accent'
										: ''
								"
								@click="handleNavPageClick(page)"
							>
								<CollapsibleTrigger as-child>
									<div
										class="flex items-center justify-start gap-2"
									>
										<Icon
											class="text-[1.125rem]"
											v-if="page.icon"
											:name="page.icon"
										/>
										<div v-if="!collapsed" class="text-xs">
											{{ $t(page.title ?? '') }}
										</div>
									</div>

									<Button
										v-if="page.sub && !collapsed"
										variant="ghost"
										size="sm"
										class="w-9 p-0"
									>
										<Icon
											name="line-md:chevron-right"
											class="h-4 w-4 rotate-90 transition-transform"
											:class="
												page.isCollapsed
													? 'rotate-90'
													: 'rotate-[-90deg]'
											"
										/>
										<span class="sr-only">Toggle</span>
									</Button>
								</CollapsibleTrigger>
							</Button>
							<CollapsibleContent
								v-if="!collapsed"
								class="flex flex-col items-baseline space-y-1"
							>
								<Button
									@click="handleNavPageClick(s)"
									v-for="s in page.sub"
									variant="ghost"
									:key="s.title"
									class="ml-4 flex h-5 w-full items-center justify-start gap-2 border-l-2 border-current"
									:class="
										currentPageInfo?.uid === s.uid
											? 'bg-accent'
											: ''
									"
								>
									<Icon
										class="text-[1.125rem]"
										v-if="s.icon"
										:name="s.icon"
									/>
									<div
										v-if="!collapsed"
										class="text-xs font-light"
									>
										{{ s.title }}
									</div>
								</Button>
							</CollapsibleContent>
						</Collapsible>

						<Separator
							v-if="page.sidebarSeperator == true"
							label=""
							class="pointer-events-none mb-2 mt-2"
						/>
					</TooltipTrigger>
					<TooltipContent side="right" class="pointer-events-none">
						{{ page.title }}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from '@/components/ui/collapsible'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Page } from '../types/config'
import { storeToRefs } from 'pinia'
import { useAppStateStore } from '~/stores/app-state'
const appState = useAppStateStore()
const { currentPageInfo, navState } = storeToRefs(appState)

const pages = defineModel<Page[]>('pages')
const collapsed = defineModel<boolean>('collapsed')
const handleNavPageClick = async (page: Page) => {
	if (page.action) {
		await page.action()
		navState.value.open = false
		return
	}
	if (!page.sub) {
		await appState.navigatePage(page)
		navState.value.open = false
		return
	} else {
		collapsed.value = false
	}
	page.isCollapsed = collapsed.value ? false : !page.isCollapsed
}
</script>
