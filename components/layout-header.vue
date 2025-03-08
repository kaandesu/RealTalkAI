<template>
	<div
		:class="[
			'flex flex-none items-center justify-center bg-background p-4',
			$attrs.class,
		]"
		v-bind="$attrs"
	>
		<slot></slot>
	</div>
</template>

<script setup></script>
