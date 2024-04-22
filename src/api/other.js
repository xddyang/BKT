// 外部API市场接口
import request from '../util/request';

// 每日英语
function enDay() {
	return request({ url: 'https://api.oioweb.cn/api/common/OneDayEnglish', method: 'get' });
};

export default {
	enDay,
}