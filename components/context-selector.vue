<template>
	<div class="flex items-center space-x-4">
		<UseTemplate>
			<Command>
				<CommandInput class="h-4" placeholder="Search...">
				</CommandInput>
				<!-- NOTE: COMMANDS -->
				<CommandGroup
					v-for="commandGroup in contextOptions?.commandGroups"
					:heading="commandGroup.name"
				>
					<CommandItem
						v-for="command in commandGroup.commands"
						:value="command.searchId"
						:disabled="command.disabled"
						@click="handleClick(command.action)"
					>
						<Icon
							v-if="command.icon"
							:name="command.icon"
							class="mr-2"
						/>
						<span>{{ command.label }}</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />

				<!-- NOTE: CONTEXT OPTIONS -->
				<CommandGroup
					v-for="contextGroup in contextOptions?.contextOptionGroups"
					:heading="contextGroup.name"
				>
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							<CommandItem
								v-for="status of contextGroup.options"
								:class="
									currentContext?.searchId == status.searchId
										? 'bg-accent'
										: ''
								"
								:key="status.searchId"
								:value="status.searchId"
								@select="handleContextSelect(status)"
							>
								{{ status.label }}
								<Icon
									name="line-md:confirm"
									:class="
										cn(
											'ml-auto h-4 w-4',
											currentContext?.searchId ===
												status.searchId
												? 'opacity-100'
												: 'opacity-0',
										)
									"
								/>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</CommandGroup>
			</Command>
		</UseTemplate>

		<!-- NOTE: Popover Selection (Desktop) -->
		<Popover v-if="viewport.isGreaterOrEquals('md')" v-model:open="isOpen">
			<PopoverTrigger as-child>
				<Button
					variant="outline"
					class="relative h-4 justify-start pr-10"
					:class="
						currentContext
							? 'text-foreground'
							: 'text-muted-foreground'
					"
				>
					<Icon class="mr-2" name="solar:buildings-2-line-duotone" />
					{{
						currentContext ? currentContext.label : 'Select context'
					}}
					<Icon
						name="ph:caret-up-down"
						class="absolute right-2 h-4 w-4 shrink-0"
					/>
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
					class="relative h-4 justify-start pr-7"
					:class="
						currentContext
							? 'text-foreground'
							: 'text-muted-foreground'
					"
				>
					<div class="text-xs">
						{{
							currentContext
								? currentContext.label
								: 'Select context'
						}}
					</div>
					<Icon
						name="ph:caret-up-down"
						class="absolute right-2 h-4 w-4 shrink-0"
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
const appState = useAppStateStore()
const accountState = useAccountStore()
const { contextOptions } = storeToRefs(accountState)
const { selectContext } = appState
const { currentContext } = storeToRefs(appState)

const [UseTemplate, StatusList] = createReusableTemplate()
const viewport = useViewport()
const isOpen = ref(false)

const handleContextSelect = (ctx: any) => {
	selectContext(ctx)
	isOpen.value = false
}

const handleClick = async (action: Function) => {
	await action()
	isOpen.value = false
}
</script>
