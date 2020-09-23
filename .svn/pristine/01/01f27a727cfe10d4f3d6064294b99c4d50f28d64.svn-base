// #ifdef H5
var jweixin = require('jweixin-module')
import laiketuiComm from '@/components/laiketuiCommon.vue'
// #endif
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

/**
 * H5 复制
 * */
const copyText = (domname, text) => {
	// 数字没有 .length 不能执行selectText 需要转化成字符串
	const textString = text.toString();
	let input = ""

	if (domname) {
		input = document.querySelector(domname);
	}


	if (!input) {
		input = document.createElement('input');
		input.id = "copy-input";
		input.readOnly = "readOnly"; // 防止ios聚焦触发键盘事件
		input.style.position = "relative";
		input.style.left = "-1000px";
		input.style.top = "-1000px";
		input.style.zIndex = "-1000";
		input.style.border = "1px #fff solid";
		document.body.appendChild(input)
	} else {
		input.readOnly = "readOnly";
	}


	input.value = textString;
	// ios必须先选中文字且不支持 input.select();
	selectText(input, 0, textString.length);

	if (document.execCommand('copy')) {
		document.execCommand('copy');
		uni.showToast({
			title: '复制成功',
			duration: 1500,
			icon: 'none'
		})

	} else {
		// 不兼容处理
	}

	// 阻止键盘弹出
	input.blur();

	function selectText(textbox, startIndex, stopIndex) {
		if (textbox.createTextRange) { //ie
			const range = textbox.createTextRange();
			range.collapse(true);
			range.moveStart('character', startIndex); // 起始光标
			range.moveEnd('character', stopIndex - startIndex); // 结束光标
			range.select(); // 不兼容苹果
		} else { //firefox/chrome
			textbox.setSelectionRange(startIndex, stopIndex);
			textbox.focus();
		}
	}
};

function share(me) {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady(me), false);
	}
}

function onBridgeReady(me) {
	console.log("aaaaa");
	var shareHref = '';
	if (me.shareHref == '') {
		shareHref = window.location.href;
	} else {
		shareHref = me.shareHref
	}
	var wdesc = "我分享了一个店铺，快来看一看吧！"
	var wtit = "商城首页"
	var wappid = ""
	var wimg = me.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/kfef2x.png'
	console.log("shareHref");
	console.log(shareHref);
	console.log("wdesc");
	console.log(wdesc);
	console.log("wtit");
	console.log(wtit);
	console.log("wimg");
	console.log(wimg);
	console.log("wdesc");
	console.log(wdesc);
	// 发送给好友
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		WeixinJSBridge.invoke('sendAppMessage', {
			"appid": wappid,
			"img_url": wimg,
			"img_width": "200",
			"img_height": "200",
			"link": shareHref,
			"desc": wdesc,
			"title": wtit,
		})
	});
	// 分享到朋友圈
	WeixinJSBridge.on('menu:share:timeline', function(argv) {
		WeixinJSBridge.invoke('shareTimeline', {
			"img_url": wimg,
			"img_width": "200",
			"img_height": "200",
			"link": shareHref,
			"desc": wdesc,
			"title": wtit
		});
	});
	// 分享到微博
	WeixinJSBridge.on('menu:share:weibo', function(argv) {
		WeixinJSBridge.invoke('shareWeibo', {
			"content": "",
			"url": shareHref,
		});
	});
}

const jssdk_share = function(me, option) {
	console.log("jssdk_share");

	console.log(option)

	var me = this

	var now_url = window.location.href;
	var can_share = false;

	console.log("now_url");
	console.log(now_url);

	var data = {
		module: 'app',
		action: 'jssdk',
		m: 'getData',
		url: now_url
	}

	uni.request({
		data,
		url: uni.getStorageSync("url"),
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: (res) => {
			var jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData'];
			console.log(jsApiList);

			console.log(uni.getStorageSync("url"));

			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.appId, // 必填，公众号的唯一标识
				timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				signature: res.data.signature, // 必填，签名
				jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
			})
		},
	})

	jweixin.ready(() => {
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

		jweixin.updateAppMessageShareData({
			title: '商城首页', // 分享标题
			desc: '你的电商之选！', // 分享描述
			link: now_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: laiketuiComm.LKT_ROOT_VERSION_URL + 'images/share_img.png', // 分享图标
			success: function() {}
		})
	});

	jweixin.error(function(res) {
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		console.log("jssdk验证失败2");
	});

}

/**
 * @description 时差
 * @param { time }  
 * */
const getTimeDiff = (time) => {

	time = new Date(time.replace(/-/g,'/'))
	// 当前时间戳
	let currentTime = new Date()

	let reslut = time.getTime() - currentTime.getTime()
	
	//计算出相差天数
	let days = Math.floor(reslut / (24 * 3600 * 1000));
	
	//计算出小时数
	let leave1 = reslut % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
	let hours = Math.floor(leave1 / (3600 * 1000));
	
	//计算相差分钟数
	let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
	let minutes = Math.floor(leave2 / (60 * 1000));

	//计算相差秒数
	let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
	let seconds = Math.round(leave3 / 1000);
	
	if(hours.toString().length == 1){
		hours = '0' + hours
	}
	
	if(minutes.toString().length == 1){
		minutes = '0' + minutes
	}
	
	if(seconds.toString().length == 1){
		seconds = '0' + seconds
	}
	
	return { days, hours, minutes, seconds }
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	copyText: copyText,
	share: share,
	jssdk_share: jssdk_share,
	getTimeDiff: getTimeDiff
}
