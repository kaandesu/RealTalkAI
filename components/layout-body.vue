<template>
	<div
		:class="[
			'flex-1 overflow-hidden px-4 py-6 md:px-8',
			fixedHeight && 'h-[calc(100%-var(--header-height))]',
			$attrs.class,
		]"
		v-bind="$attrs"
	>
		<slot></slot>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	fixedHeight: {
		type: Boolean,
		default: false,
	},
})
</script>
