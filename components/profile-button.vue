<template>
	<HoverCard>
		<HoverCardTrigger as-child>
			<Button size="icon" class="rounded-full" variant="ghost">
				<Avatar>
					<AvatarImage :src="account.avatar!" />
					<AvatarFallback v-if="account.avatarFallback">
						{{ account.avatarFallback }}
					</AvatarFallback>
				</Avatar>
			</Button>
		</HoverCardTrigger>
		<HoverCardContent>
			<div class="flex justify-between space-x-4">
				<Avatar>
					<AvatarImage :src="account.avatar!" />
					<AvatarFallback v-if="account.avatarFallback">
						{{ account.avatarFallback }}
					</AvatarFallback>
				</Avatar>
				<div class="space-y-1">
					<h4 class="text-sm font-semibold">
						{{ account.displayName }}
					</h4>
					<p class="text-sm">
						Lorem ipsum dolor sit, amet consectetur adipisicing non.
					</p>
					<div class="flex items-center pt-2">
						<!-- <CalendarIcon class="mr-2 h-4 w-4 opacity-70" /> -->
						<span class="text-xs text-muted-foreground">
							Joined June 2024
						</span>
					</div>
				</div>
			</div>
		</HoverCardContent>
	</HoverCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useAccountStore } from '../stores/account'
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
</script>
