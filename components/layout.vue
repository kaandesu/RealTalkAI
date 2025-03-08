<template>
	<div
		:class="[
			'relative flex h-full w-full flex-col',
			fadedBelow &&
				'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:hidden after:h-32 after:w-full after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block',
			fixedHeight && 'md:h-svh',
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
	fadedBelow: {
		type: Boolean,
		default: false,
	},
	fixedHeight: {
		type: Boolean,
		default: false,
	},
})
</script>
