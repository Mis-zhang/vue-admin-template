import { defineStore } from 'pinia';

const storeSetup = () => {
	const dictData = ref({});

	const getDictData = async () => {
		dictData.value = {};
	};

	return {
		dictData,
		getDictData,
	};
};

export const useDictStore = defineStore('dict', storeSetup, { persist: false });
