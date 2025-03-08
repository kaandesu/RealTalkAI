<template>
	<Button
		class="rounded-full"
		size="icon"
		variant="ghost"
		@click="handleClick()"
	>
		<Icon
			v-if="colorMode.value === 'dark'"
			name="line-md:moon-to-sunny-outline-transition"
			size="1.5rem"
		/>
		<Icon
			v-else
			name="line-md:sunny-outline-to-moon-transition"
			size="1.5rem"
		/>
	</Button>
</template>
<script setup lang="ts">
const colorMode = useColorMode()
const handleClick = () => {
	colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>
