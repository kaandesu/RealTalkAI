<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

const props = defineProps<{
	disabled: boolean
	gameId?: number
	gameTitle?: string
	desc?: string
	transcript: string[]
}>()
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button
				:disabled="props.disabled"
				variant="outline"
				class="flex items-center justify-center gap-x-3 rounded-sm"
			>
				<Icon name="ph:chats-duotone" class="h-6 w-6" />
			</Button>
		</DialogTrigger>
		<DialogContent
			class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[425px]"
		>
			<DialogHeader class="p-6 pb-0">
				<DialogTitle
					>Conversation {{ props.gameTitle ?? '' }}</DialogTitle
				>
				<DialogDescription>
					{{ props.desc ?? 'Transcript of the call.' }}
				</DialogDescription>
			</DialogHeader>
			<div class="grid gap-4 overflow-y-auto px-6 py-4">
				<div class="flex h-[300dvh] flex-col gap-y-5">
					<p v-for="(chat, index) in props.transcript">
						<span v-if="index % 2 == 0"> Waitress: </span>
						<span v-else> You: </span>
						{{ chat }}
					</p>
				</div>
			</div>
		</DialogContent>
	</Dialog>
</template>
