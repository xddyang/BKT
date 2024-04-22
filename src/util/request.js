import axios from 'axios';
import { Toast } from 'antd-mobile';

const http = axios.create({
	baseURL: '',
	timeout: 5000
});

const token = localStorage.getItem('token');
const whiteList = ['login', 'register'];		// 无需token白名单请求接口
const errCode = [26001, 26002, 26003, 26004];

http.interceptors.request.use(
	config => {
		Toast.show({icon: 'loading'});
		const handleUrl = config.url.split('/').pop();
		if (!whiteList.includes(handleUrl) && !token) {
			Toast.show({
				icon: 'fail',
				content: '登录状态失效，请重新登录！',
			});
			localStorage.removeItem('token');
			window.location.href = '/login';
		} else if (token) {
			config.headers['X-Token'] = token;
		}
		return config;
	}, error => {
		console.log(error);
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	response => {
		Toast.clear();
		const data = response.data || {};
		if (response.status === 200) {
			data.token && localStorage.setItem('token', data.token);
			if (errCode.includes(data.code)) {
				Toast.show({icon: 'fail', content: data.msg});
				return Promise.reject(`自定义错误: ` + data?.msg);
			}
			return data;
		} else {
			return Promise.reject(new Error('服务异常，请稍后重试！'));
		}
	},
	error => {
		Toast.show({
			icon: 'fail',
			content: '服务不可用',
		});
		console.error(error);
		return Promise.reject(error);
	}
);

export default http;