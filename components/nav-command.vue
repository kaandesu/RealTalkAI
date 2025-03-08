<template>
	<div class="flex items-center space-x-4">
		<UseTemplate>
			<Command>
				<CommandInput class="h-4" placeholder="Search...">
				</CommandInput>
				<div v-for="group in commandGroups" :key="group.name">
					<CommandGroup :heading="group.name">
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandItem
								v-for="command in group.commands"
								:key="command.searchId"
								:value="command.label"
								@select="handleAction(command)"
							>
								<Icon
									v-if="command.icon"
									:name="command.icon"
									class="mr-2"
								/>
								<span>{{ command.label }}</span>
							</CommandItem>
						</CommandList>
					</CommandGroup>
					<CommandSeparator />
				</div>
			</Command>
		</UseTemplate>

		<!-- NOTE: Popover Selection (Desktop) -->
		<Popover v-if="viewport.isGreaterOrEquals('md')" v-model:open="isOpen">
			<PopoverTrigger as-child>
				<Button
					variant="outline"
					class="relative flex h-4 justify-between gap-3 text-xs text-muted-foreground"
				>
					Search
					<kbd
						class="pointer-events-none rounded border bg-muted px-1 text-muted-foreground"
					>
						<span class="text-xs">⌘</span>K
					</kbd>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-[200px] p-0" align="start">
				<StatusList />
			</PopoverContent>
		</Popover>

		<!-- NOTE: Drawer Selection (< Desktop) -->
		<Drawer v-else v-model:open="isOpen">
			<DrawerTrigger as-child>
				<Button
					variant="outline"
					class="relative flex h-4 justify-between gap-3 text-xs text-muted-foreground"
				>
					Search
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
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
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
import { useMagicKeys } from '@vueuse/core'
import { commandGroups } from '@/config/commands'
import type { ActionCommand } from '../types/config'

const [UseTemplate, StatusList] = createReusableTemplate()

const viewport = useViewport()

const isOpen = ref(false)
const handleAction = async (action: ActionCommand) => {
	await action.action()
	isOpen.value = false
}

const keys = useMagicKeys()
const CmdK = keys['Cmd+K']

watch(CmdK, (v) => {
	isOpen.value = !v ? true : isOpen.value
})
</script>
