/** 判断 path 是否为外链 */
export const isExternal = path => {
	const reg = /^(https?:|mailto:|tel:)/;
	return reg.test(path);
};

/** 判断 url 是否是 http 或 https */
export const isHttp = url => {
	return url.includes('http://') || url.includes('https://');
};
