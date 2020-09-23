

//用户名验证
export function onblur(value,display) {
	var re = /^\w{6,20}$/g;
	var rez = re.test(value);
	if(rez == true) {
		uni.showToast({
				title: '格式正确！',
				duration: 1000,
				icon:'none'
			})
	} else if(value == '') {
		display.style.display = 'block';
		display.innerHTML = '用户名不能为空';
		uni.showToast({
				title: '用户名不能为空',
				duration: 1000,
				icon:'none'
			})
	} else {
		display.style.display = 'block';
		value = '';
	}
}

//密码验证
export function pass(value,display,a) {
	var re =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/; 
	var rez = re.test(value);
	if(rez == true) {
	} else if(value == '') {
		uni.showToast({
				title: '密码不能为空！',
				duration: 1000,
				icon:'none'
			})
	} else {
		uni.showToast({
				title: '请输入6-16位数密码（数字和字母组合）！',
				duration: 1000,
				icon:'none'
			})
	}
}

//确认密码验证
export function confirmpass(value1,value2) {
	if(value1 == value2 && value2 != '') {
		return 1
	} else if(value2 == '') {
			uni.showToast({
	  				title: '请输入确认密码！',
	  				duration: 1000,
					icon:'none'
				})
	} else {
			uni.showToast({
	  				title: '两次输入不一致！',
	  				duration: 1000,
					icon:'none'
				})
	}
}

//验证手机号码
export function telephone(value) {
	var re = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
	var wrResult = re.test(value);
	if(wrResult == true && value.length == 11) {
		return 1
	} else if(value == '') {
		return 2
	} else {
		console.log(111111)
		uni.showToast({
	  			title: '请输入正确的手机号！',
	  			duration: 1000,
				icon:'none'
			})
		return 3
	}
}

//一分钟倒计时
export function time(timer,count) {
				const TIME_COUNT = 60;
				if(!timer) {
					count = TIME_COUNT;
					timer = setInterval(() => {
						if(count > 0 && count <= TIME_COUNT) {
							count--;
						} else {
							clearInterval(timer);
							timer = null;
						}
					}, 1000)
				}
			}

//清空内容
export function empty(value){
	value = '';
	console.log(value)
}
