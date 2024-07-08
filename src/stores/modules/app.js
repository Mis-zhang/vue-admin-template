import { defineStore } from 'pinia';
import { generate, getRgbStr } from '@arco-design/color';
import defaultSettings from '@/config/setting.json';

const storeSetup = () => {
	// App配置
	const settingConfig = reactive({ ...defaultSettings });

	// 页面切换动画类名
	const transitionName = computed(() => (settingConfig.animate ? settingConfig.animateMode : ''));

	// 深色菜单主题色变量
	const themeCSSVar = computed(() => {
		const obj = {};
		const list = generate(settingConfig.themeColor, { list: true, dark: true });
		list.forEach((color, index) => {
			obj[`--primary-${index + 1}`] = getRgbStr(color);
		});
		return obj;
	});

	// 切换主题 暗黑模式|简白模式
	const toggleTheme = dark => {
		if (dark) {
			settingConfig.theme = 'dark';
			document.body.setAttribute('arco-theme', 'dark');
		} else {
			settingConfig.theme = 'light';
			document.body.removeAttribute('arco-theme');
		}
		setThemeColor(settingConfig.themeColor);
	};

	// 设置主题色
	const setThemeColor = color => {
		if (!color) return;
		settingConfig.themeColor = color;
		const list = generate(settingConfig.themeColor, { list: true, dark: settingConfig.theme === 'dark' });
		list.forEach((color, index) => {
			const rgbStr = getRgbStr(color);
			document.body.style.setProperty(`--primary-${index + 1}`, rgbStr);
		});
	};

	// 初始化主题
	const initTheme = () => {
		if (!settingConfig.themeColor) return;
		setThemeColor(settingConfig.themeColor);
	};

	// 设置左侧菜单折叠状态
	const setMenuCollapse = collapsed => {
		settingConfig.menuCollapse = collapsed;
	};

	// 页面重新加载
	const reloadFlag = ref(true);
	const reloadPage = () => {
		reloadFlag.value = false;
		nextTick(() => {
			reloadFlag.value = true;
		});
	};

	return {
		...toRefs(settingConfig),
		transitionName,
		themeCSSVar,
		toggleTheme,
		setThemeColor,
		initTheme,
		setMenuCollapse,
		reloadFlag,
		reloadPage,
	};
};

export const useAppStore = defineStore('app', storeSetup, { persist: { key: 'app', storage: localStorage } });
