<template>
	<NuxtLayout :class="theme">
		<NuxtPage />
		<Toaster />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { useAppStateStore } from './stores/app-state'
const app = useAppStateStore()
const { updateActivePage } = app
const { theme } = storeToRefs(app)
const route = useRoute()

onMounted(() => {
	updateActivePage(route.name)
})
watch(
	() => route.name,
	() => updateActivePage(route.name),
)
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap');

body {
	font-family: 'Ubuntu', sans-serif;
}

.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
}

*,
*::before,
*::after {
	box-sizing: content-box;
}
</style>
