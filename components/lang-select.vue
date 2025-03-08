<template>
	<div class="flex items-center space-x-4">
		<UseTemplate>
			<Command>
				<CommandInput class="h-4" placeholder="Search...">
				</CommandInput>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandItem
						v-for="local of locales"
						:class="locale == local.code ? 'bg-accent' : ''"
						:key="local.code"
						:value="local.name as string"
						@select="onLocalSelect(local.code)"
					>
						<Icon
							class="mr-2"
							:name="`circle-flags:${local.code}`"
						/>

						{{ local.name }}
						<Icon
							name="line-md:confirm"
							:class="
								cn(
									'ml-auto h-4 w-4',
									locale == local.code
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
					<Icon size="1.2rem" :name="`circle-flags:${locale}`" />
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
					<Icon size="1.2rem" :name="`circle-flags:${locale}`" />
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
const { locale, locales, setLocale } = useI18n()

const [UseTemplate, StatusList] = createReusableTemplate()

const viewport = useViewport()

const isOpen = ref(false)

function onLocalSelect(loc: string) {
	setLocale(loc)
	isOpen.value = false
}
</script>
