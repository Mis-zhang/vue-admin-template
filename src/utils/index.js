import { browse, mapTree } from 'xe-utils';
import { camelCase, upperFirst } from 'lodash-es';
import { isExternal } from '@/utils/validate';

/** 获取对象属性值 */
export const getProperty = (obj, key) => {
	return obj[key];
};

/**
 * @desc 去除空格
 * @param {string} str - 字符串
 * @param {string} pos - 去除空格的位置
 * pos="both": 去除两边空格
 * pos="left": 去除左边空格
 * pos="right": 去除右边空格
 * pos="all": 去除所有空格
 */
export function trim(str, pos = 'both') {
	if (pos === 'both') {
		return str.replace(/^\s+|\s+$/g, '');
	} else if (pos === 'left') {
		return str.replace(/^\s*/, '');
	} else if (pos === 'right') {
		return str.replace(/(\s*$)/g, '');
	} else if (pos === 'all') {
		return str.replace(/\s+/g, '');
	} else {
		return str;
	}
}

/**
 * 根据数字获取对应的汉字
 * @param {number} num - 数字(0-10)
 */
export function getHanByNumber(num) {
	const str = '零一二三四五六七八九十';
	return str.charAt(num);
}

/**
 * 获取指定整数范围内的随机整数
 * @param {number} start - 开始范围
 * @param {number} end - 结束范围
 */
export function getRandomInterger(start = 0, end) {
	const range = end - start;
	return Math.floor(Math.random() * range + start);
}

/** @desc 千分位格式化 */
export function formatMoney(money) {
	return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',');
}

/** @desc 数据类型检测方法 */
export function getTypeOf(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * @desc 格式化电话号码
 * @demo 183-7983-6654
 */
export function formatPhone(mobile, formatStr = '-') {
	return mobile.replace(/(?=(\d{4})+$)/g, formatStr);
}

/**
 * @desc 手机号脱敏
 * @demo 155****8810
 */
export function hidePhone(phone) {
	return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}

/** @desc 检测数据是否为空数据 */
export function isEmpty(data) {
	if (data === '' || data === 'undefined' || data === undefined || data === null || data === 'null') {
		return true;
	}
	if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]' || JSON.stringify(data) === '[{}]') {
		return true;
	}
	return false;
}

/**
 * @desc 大小写转换
 * @param {string} str 待转换的字符串
 * @param {number} type 1:全大写 2:全小写 3:首字母大写
 */
export function toCase(str, type) {
	switch (type) {
		case 1:
			return str.toUpperCase();
		case 2:
			return str.toLowerCase();
		case 3:
			return str[0].toUpperCase() + str.substring(1).toLowerCase();
		default:
			return str;
	}
}

/**
 * @desc 获取随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export const randomNum = (min, max) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

/** @desc 获取最大值 */
export const max = arr => {
	return Math.max.apply(null, arr);
};

/** @desc 获取最小值 */
export const min = arr => {
	return Math.min.apply(null, arr);
};

/** @desc 求和 */
export const sum = arr => {
	return arr.reduce((pre, cur) => pre + cur);
};

/** @desc 获取平均值 */
export const average = arr => {
	return sum(arr) / arr.length;
};

/** @desc 文件大小格式化 */
export const formatFileSize = size => {
	const units = ['B', 'KB', 'MB', 'GB'];
	let index = 0;
	while (size > 1024 && index < units.length) {
		size /= 1024;
		index++;
	}
	return Math.round(size * 100) / 100 + units[index];
};

/** @desc 深拷贝 */
export const deepClone = data => {
	if (typeof data !== 'object' || data === null) return '不是对象';
	const newData = Array.isArray(data) ? [] : {};
	for (const key in data) {
		newData[key] = typeof data[key] === 'object' ? deepClone(data[key]) : data[key];
	}
	return newData;
};

/**
 * @desc 判断是否是闰年
 * @param {number} year 年份
 */
export const isLeapYear = year => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * @desc 判断是否是奇数
 * @param {number} num 数字
 */
export const isOdd = num => {
	return num % 2 !== 0;
};

/**
 * @desc 判断是否是偶数
 * @param {number} num 数字
 */
export const isEven = num => {
	return !isOdd(num);
};

/** @desc 将RGB转化为十六机制 */
export const rgbToHex = (r, g, b) => {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/** @desc 获取随机十六进制颜色 */
export const randomHex = () => {
	return `#${Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padEnd(6, '0')}`;
};

/**
 * @description 动态路由 path 转 name
 * @demo /system => System
 * @demo /system/menu => SystemMenu
 * @demo /data-manage/detail => DataManageDetail
 */
export const transformPathToName = path => {
	if (!path) return '';
	if (isExternal(path)) return '';
	return upperFirst(camelCase(path));
};

/**
 * @desc 过滤树
 * @param values 数组
 * @param fn
 */
export const filterTree = (values, fn) => {
	const arr = values.filter(fn);
	return mapTree(arr, item => {
		if (item.children && item.children.length) {
			item.children = item.children.filter(fn);
		}
		return item;
	});
};

/**
 * @desc 排序树
 */
export const sortTree = values => {
	values?.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)); // 排序
	return mapTree(values, item => {
		item.children?.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)); // 排序
		return item;
	});
};

/** @desc 是否是h5环境 */
export const isMobile = () => {
	return browse().isMobile;
};

/** @desc 问候 */
export function goodTimeText() {
	const time = new Date();
	const hour = time.getHours();
	return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}
