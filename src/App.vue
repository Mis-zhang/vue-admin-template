<script setup>
import { ref } from 'vue';
const count = ref(0);
const add = () => {
	count.value++;
};
</script>

<template>
	<div class="a" @click="add">app{{ count }}</div>
</template>

<style lang="scss" scoped>
.a {
	color: $color-theme;
	font-size: 12px;
	width: 100%;
	height: 100%;
}
</style>
