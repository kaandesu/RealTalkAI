<template>
	<main class="box-border h-full w-full p-6 pt-2">
		<section>
			<div class="text-3xl font-bold">Dashboard</div>
			Access your main levels and key metrics.
		</section>
		<br />

		<Tabs default-value="levels" class="space-y-4">
			<section class="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="levels"> Levels </TabsTrigger>
					<TabsTrigger value="results"> Results </TabsTrigger>
					<TabsTrigger value="suggestions"> Suggestions </TabsTrigger>
				</TabsList>
			</section>
			<TabsContent value="levels"> levels here </TabsContent>
			<TabsContent value="results"> results here </TabsContent>
			<TabsContent value="suggestions"> suggestions here </TabsContent>
		</Tabs>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
})
</script>
