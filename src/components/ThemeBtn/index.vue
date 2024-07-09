<script setup>
import { useDark, useToggle } from '@vueuse/core';
import { useAppStore } from '@/stores';

defineOptions({ name: 'ThemeBtn' });

const appStore = useAppStore();

const isDark = useDark({
	selector: 'body',
	attribute: 'arco-theme',
	valueDark: 'dark',
	valueLight: 'light',
	storageKey: 'arco-theme',
	onChanged(dark) {
		appStore.toggleTheme(dark);
	},
});

const toggleTheme = useToggle(isDark);

const handleToggleTheme = () => {
	toggleTheme();
};
</script>

<template>
	<a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
		<template #icon>
			<icon-sun-fill v-if="appStore.theme === 'light'" :size="25"></icon-sun-fill>
			<icon-moon-fill v-else :size="25"></icon-moon-fill>
		</template>
	</a-button>
</template>
