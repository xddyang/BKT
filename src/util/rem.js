/***
 * REM实现函数
 * @params designWidth 设计稿宽度(一般为750)
 * @params rem2px 1rem的像素值
 */
function adapt(designWidth, rem2px) {
	console.log(new Date());
	// 获取当前设备屏幕宽度
	let rectwidth = document.documentElement.getBoundingClientRect().width;
	if (rectwidth > designWidth) {
		rectwidth = designWidth;
	}
	const defaultFontSize = rem2px / (designWidth / rectwidth);
	document.documentElement.style.fontSize = `${defaultFontSize}px`;
	console.log(new Date());
	return defaultFontSize;
}

// 监听窗口改变事件来更新rem
const resize = 'orientationchange' in window ? 'orientationchange' : 'resize';
if (window.addEventListener) {
	window.addEventListener(resize,
		() => {
			adapt(750, 100);
		},
		false);
} else if (window.attachEvent) {
	window.attachEvent(resize, () => {
		adapt(750, 100);
	});
} else {
	window[resize] = function () {
		adapt(750, 100);
	};
}
export default adapt;