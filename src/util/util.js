
const toast = () => {

};

// 获取地址栏的参数
const getUrlParams = (e) => {
	const searchParams = new URLSearchParams(e);
	const params = {};
	for (const [key, value] of searchParams) {
		params[key] = value;
	}
	return params;
};


export default {
	toast,
	getUrlParams
};