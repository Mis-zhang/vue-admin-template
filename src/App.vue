<script setup>
import { useAppStore, useDictStore } from '@/stores';
// 语言包
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';

defineOptions({ name: 'App' });

// 语言包
const locales = { 'zh-cn': zhCN };
const localeType = ref('zh-cn');
const locale = computed(() => locales[localeType.value] || zhCN);

// 主题设置
const appStore = useAppStore();
appStore.initTheme();

// 字典数据
const dictStore = useDictStore();
dictStore.getDictData();
</script>

<template>
	<a-config-provider :locale="locale" update-at-scroll>
		<router-view />
		<template #loading>
			<img class="loading-icon" src="/static/images/loading.gif" alt="loading" />
		</template>
	</a-config-provider>
</template>

<style lang="scss" scoped>
.loading-icon {
	width: 30px;
}
</style>
