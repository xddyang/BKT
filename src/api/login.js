import request from '../util/request';

const basePath = 'http://localhost:3000/api/user/';

function login(data) {
	return request({ url: basePath + 'login', method: 'post', data });
};

function register(data) {
	return request({ url: basePath + 'register', method: 'post', data });
};

export default {
	login,
	register,
}