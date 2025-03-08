<template>
	<div class="flex items-center space-x-4" v-if="false">
		<UseTemplate>
			<Command>
				<CommandInput class="h-4" placeholder="Search...">
				</CommandInput>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandItem
						v-for="themeOpt of themes"
						:class="theme == themeOpt ? 'bg-accent' : ''"
						:key="themeOpt"
						:value="themeOpt"
						@select="onThemeSelect(themeOpt)"
					>
						<span
							class="mr-2 h-3 w-3 rounded-full"
							:style="themeTwStyleDict[themeOpt]"
						/>

						{{ themeOpt }}
						<Icon
							name="line-md:confirm"
							:class="
								cn(
									'ml-auto h-4 w-4',
									theme == themeOpt
										? 'opacity-100'
										: 'opacity-0',
								)
							"
						/>
					</CommandItem>
				</CommandList>
			</Command>
		</UseTemplate>

		<Popover v-if="viewport.isGreaterOrEquals('md')" v-model:open="isOpen">
			<!-- NOTE: Popover Selection (Desktop) -->
			<PopoverTrigger as-child>
				<Button
					variant="ghost"
					class="relative rounded-full"
					size="icon"
				>
					<span
						class="h-5 w-5 rounded-full"
						:style="themeTwStyleDict[theme]"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-32 p-0" align="start">
				<StatusList />
			</PopoverContent>
		</Popover>

		<!-- NOTE: Drawer Selection (< Desktop) -->
		<Drawer v-else v-model:open="isOpen">
			<DrawerTrigger as-child>
				<Button
					variant="outline"
					class="relative rounded-full"
					size="icon"
				>
					<span
						class="h-5 w-5 rounded-full"
						:style="themeTwStyleDict[theme]"
					/>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div class="mt-4 border-t">
					<StatusList />
				</div>
			</DrawerContent>
		</Drawer>
	</div>
</template>

<script lang="ts" setup>
import { createReusableTemplate } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useAppStateStore, themes, themeTwStyleDict } from '../stores/app-state'
const appState = useAppStateStore()
const { changeTheme } = appState
const { theme } = storeToRefs(appState)

const [UseTemplate, StatusList] = createReusableTemplate()

const viewport = useViewport()

const isOpen = ref(false)

function onThemeSelect(themeSelection: (typeof themes)[number]) {
	changeTheme(themeSelection)
	isOpen.value = false
}
</script>
