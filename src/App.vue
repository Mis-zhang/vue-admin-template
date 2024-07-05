<script setup>
const count = ref(0);
const add = () => {
	count.value++;
};
</script>

<template>
	<div class="a" @click="add">app{{ count }}</div>
	<HellowWorld></HellowWorld>
	<a-space>
		<a-button type="primary">Primary</a-button>
		<a-button>Secondary</a-button>
		<a-button type="text">Text</a-button>
	</a-space>
	<a-space>
		<a-button type="primary">
			<template #icon>
				<icon-plus />
			</template>
		</a-button>
	</a-space>
	<icon-arrow-down />
	<SvgIcon name="alipay" size="24" color="red"></SvgIcon>
	<span>测试git ssh 链接</span>
	<span>测试不需要密码</span>
	<span>测试window提交</span>
</template>

<style lang="scss" scoped>
.a {
	font-size: 12px;
	user-select: none;
}
</style>
