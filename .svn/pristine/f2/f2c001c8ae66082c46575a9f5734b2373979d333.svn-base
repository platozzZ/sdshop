/**
 * 获取是否开启免密码登录开关
 * @param {Object} store_type	店铺类型
 */
export function getLaiketuiNoRegisterLoginInfo(store_type) {
	uni.request({
		data:{
			module:'app',
			action:'login',
			app:'is_register',
			store_type:store_type
		},
		url:uni.getStorageSync("url"),
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST', 
		success: function (res) {
			let register = res.data.is_register ;
			console.log("免密码登录:" + register);
			register = register || 1;
			//免密码登陆配置
			uni.setStorageSync("needRegister",register);
		}
	})
}