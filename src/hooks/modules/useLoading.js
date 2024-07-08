export const useLoading = (initValue = false) => {
	const loading = ref(initValue);
	const setLoading = value => {
		loading.value = value;
	};
	const toggle = () => {
		loading.value = !loading.value;
	};

	return {
		loading,
		setLoading,
		toggle,
	};
};
