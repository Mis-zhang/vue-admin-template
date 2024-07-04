<template>
	<svg
		aria-hidden="true"
		:class="svgClass"
		v-bind="$attrs"
		:style="{ color, fill: color, width: iconSize, height: iconSize }"
	>
		<use :href="iconName"></use>
	</svg>
</template>

<script setup>
defineOptions({ name: 'SvgIcon' });

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: String,
	size: [String, Number],
});

// 判断传入的值，是否带有单位，如果没有，就默认用px单位
const getUnitValue = value => {
	return /(px|em|rem|%)$/.test(String(value)) ? value : `${value}px`;
};

const iconSize = computed(() => {
	return getUnitValue(props.size);
});

const iconName = computed(() => `#icon-${props.name}`);

const svgClass = computed(() => {
	if (props.name) return `svg-icon icon-${props.name}`;
	return 'svg-icon';
});
</script>

<style lang="scss" scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	//vertical-align: middle;
	flex-shrink: 0;
	vertical-align: -0.1em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
	//fill: currentColor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
	overflow: hidden;
}
</style>
