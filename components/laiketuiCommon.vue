<script>
	
	import {getLaiketuiNoRegisterLoginInfo} from '../common/laiketuiNoRegisterLogin.js' 
	/**
	 * 店铺ID 
	 */
	const LKT_STORE_ID = 50;

	/**
	 * 根路径
	 */
	const LKT_ROOT_URL = "https://shoplk.fblife.com";

	/**
	 * 版本号
	 */
	const VERSION = 'V3';

	/**
	 * 带版本号的路径
	 */
	const LKT_ROOT_VERSION_URL = LKT_ROOT_URL + "/";

	/**
	 * 	来客电商路径
	 */
	const LKT_API_URL = LKT_ROOT_URL + "/index.php?store_id=" + LKT_STORE_ID + "&";
	/**
	 * 来客电商H5默认路径
	 */
	const LKT_H5_DEFURL = LKT_ROOT_URL + "/h5/#/";

	/**
	 *
	 */
	const LKT_ENDURL = LKT_ROOT_URL + "/";
	
	/**
	 *  移动端类型  1 微信小程序 2 app、H5  3 支付宝小程序 4 字节跳动小程序 5 百度小程序 
	 */
	const DEFAULT_LKT_STORE_TYPE = 2 ; 
	
	/**
	 * 店铺类型 1 微信小程序 2 app、H5  3 支付宝小程序 4 字节跳动小程序 5 百度小程序 
	 */
	function getStoreType(){
		let store_type = DEFAULT_LKT_STORE_TYPE ;
		// #ifdef APP-PLUS || H5
		store_type = 2;
		// #endif
		// #ifdef MP-ALIPAY
		store_typ = 3;
		// #endif
		// #ifdef MP-BAIDU
		store_type = 5;
		// #endif
		// #ifdef MP-TOUTIAO
		store_type = 4;
		// #endif
		// #ifdef MP-WEIXIN
		store_type = 1;
		// #endif
	}

	/**
	 * 跳转到登录界面
	 * 
	 * @param {Object} page
	 * @param {Object} forwardUrl
	 */
	function toLogin(page, forwardUrl) {
		var me = page;
		me.$store.state.access_id = uni.getStorageSync('laiketuiAccessId') ? uni.getStorageSync('laiketuiAccessId') : uni.getStorageSync(
			'access_id');
		var access_id = me.$store.state.access_id;
		if (access_id == undefined) {
			access_id = "";
		}
		var data = {
			module: 'app',
			action: 'login',
			app: 'token',
			access_id,
		}
		uni.request({
			url: LKT_API_URL,
			data,
			success: function(res) {
				if (res.data.code == 404) {
					uni.showToast({
						title: "未登录，请先登陆",
						duration: 1000,
						icon: 'none'
					});
					if(me.$store.state.channel == 'zyjd'){
						me.$loginFrom.login(me);
						return
					}
					var url = forwardUrl;
					setTimeout(function() {
						uni.navigateTo({
							url: url
						})
					}, 1000);
				} else {
					me.changeLoginStatus();
				}
			}
		});
	}
	
	/**
	 * 这个只有微信小程序用
	 * @param {Object} me
	 */
	function getWXTmplIds(me){
		
		let data = {
			module:'app',
			action:'message',
			app:'getWXTemplates',
			access_id:me.access_id,
			store_type:1,
		};
		
		me.$req.post({
			data
		}).then(res => {
			let data = res.data;
			let code = res.code;
			console.log("模板结果。。");
			console.log(res);
			if(code == 200){
				me.tmplIds = data;
			}else{
				console.log("获取微信小程序订阅模板失败");
			}
			
		}).catch(function(res1){
			console.log("================>>");
			console.log(res);
			uni.showToast({
				title: "获取失败",
				duration: 1000,
				icon: 'none'
			});
		});
	}

	/**
	 * 获取用户的Token
	 */
	function getLKTAccessToken(obj) {
		var me = obj;
		return new Promise((resolve, reject) => {

			var token = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : obj.$store.state.access_id
			me.$store.state.access_id = token;

			var access_id = me.$store.state.access_id;
			var data = {
				module: 'app',
				action: 'login',
				app: 'token',
				access_id,
			}
			uni.request({
				url: me.$store.state.url,
				data,
				success: function(res) {
					var code = res.data.code;
					console.log("获取登录的token：");
					console.log(JSON.stringify(res));
					if (code == 200) {
						me.$store.state.access_id = access_id;
						me.access_id = me.$store.state.access_id;
						uni.setStorageSync("laiketuiAccessId", me.access_id);
						uni.setStorageSync("online", true);
					} else {
						me.$store.state.access_id = "";
						me.access_id = "";
						uni.setStorageSync("laiketuiAccessId", "");
						uni.setStorageSync("online", false);
					}
					resolve(me);
				},
				fail(res) {
					reject(res);
				}
			});
		});
	}
	
	
	/**
	 * 获取界面url请求地址
	 */
	function getLKTApiUrl(){
		var me = this;
		return new Promise((resolve, reject)=>{
			// #ifdef MP-WEIXIN
			laikeMPWeixinExtUrl().then(function(request_url){
				return getApiUrl(request_url);
			}).then(function(){
				resolve("");
			});
			// #endif
			
			// #ifndef MP-WEIXIN 
			var request_url = LKT_API_URL;
			getApiUrl(request_url).then(function(){
				resolve("");
			});
			// #endif
			
			// #ifndef APP-PLUS || H5
			getLaiketuiNoRegisterLoginInfo(1);
			// #endif
			
			
		});
	}
	
	/**
	 * 关闭小程序授权弹出窗
	 */
	function closeMPAuthWin(me){
		// #ifdef MP
		var userinfo = uni.getStorageSync("userinfo") || [];
		if(userinfo['openid']){
			//关闭
			me.$refs.lktAuthorizeComp.closeWin();	
		}
		// #endif
	}

	/**
	 * 获取路径（url ）
	 */
	function getApiUrl(request_url) {
		let api_url = LKT_API_URL;
		let h5_url = LKT_H5_DEFURL;
		let endurl = LKT_ENDURL;
		return new Promise((resolve, reject)=>{
			var data = {
				module: 'app',
				action: 'url',
				app: 'geturl',
				get: 'mini_url,H5,endurl'
			}
			uni.request({
				data,
				url: request_url,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					if (res.data.code == 200) {
						api_url = res.data.url.mini_url
						h5_url = res.data.url.H5
						endurl = res.data.url.endurl
					}
					//#ifndef MP
					api_url = api_url + '&store_type=2'
					//#endif
					//#ifdef MP-WEIXIN
					api_url = api_url + '&store_type=1'
					//#endif
					//#ifdef MP-ALIPAY
					api_url = api_url + '&store_type=1'
					//#endif
					//#ifdef MP-TOUTIAO
					api_url = api_url + '&store_type=1'
					//#endif
					//#ifdef MP-BAIDU
					api_url = api_url + '&store_type=1'
					//#endif
					uni.setStorageSync("url", api_url);
					uni.setStorageSync("h5_url", h5_url);
					uni.setStorageSync("endurl", endurl);

					resolve("");
				},
			})
		})
	}
	
	/**
	 * 获取微信小程序配置的路径
	 */
	function laikeMPWeixinExtUrl(){
		var me = this;
		return  new Promise((resolve, reject)=>{
			uni.getExtConfig({
				success:function(res){
					let mpextURL = "";
					if(res.extConfig.url){
						mpextURL  = res.extConfig.url;
					}else{
						mpextURL = LKT_API_URL;
					}
					mpextURL = mpextURL + 'store_type=1'
					uni.setStorageSync("url", mpextURL);
					//获取是否免密码登录开关
					getLaiketuiNoRegisterLoginInfo(1);
					resolve(mpextURL);
				},
				error:function(err){
					console.log(err,2)
					reject(err);
				},
			});
		}); 
	}

	/**
	 * 获取推送消息的客户端ID
	 */
	function getClientid() {
		let CID = plus.push.getClientInfo();
		return CID.clientid;
	}

	/**
	 * div按钮无重复点击
	 * @param {Object} frompage 	
	 * @param {Object} callback
	 * @param {Object} opts
	 */
	function laiketuiNoDoublePress(frompage, callback, opts) {
		let me = frompage;
		var len = me.clicktimes.length;
		var now = new Date().getTime();
		let lastclickBuyBtn = len > 0 ? me.clicktimes[len - 1] : now;
		me.clicktimes.push(now);
		len = me.clicktimes.length;
		//第一次进的时候时间数组长度为一、或者两次点击时间间隔大于等于一秒
		if (len == 1 || (now - lastclickBuyBtn) >= 1000) {
			if(opts){
				callback(opts);
			}else{
				callback();
			}
		}
		if (len >= 3) {
			me.clicktimes.shift();
		}
	}
	
	/**
	 * 延迟2秒赋值，防止重复点击
	 */
	function lktDelaySetVal(me){
		setTimeout(function(){
			if(!me.fastTap){
				me.fastTap = true;
			}
			if(me.isClick){
				me.isClick = false;
			}
			if(!me.signFinish){
				me.signFinish = true;
			}
		},1500);
	}
	
	/**
	 * 	登录超时处理:自己在调用的页面定义timeout()函数，逻辑自定义。
	 * 	1：这个超时的处理针对 H5 app 小程序的人工登陆操作
	 * 	2：不针对小程序授权操作
	 * 	@param {Object} frompage
	 */
	function laikeCheckTimeout(frompage) {
		let me = frompage;
		var access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
		var data = {
			module: 'app',
			action: 'login',
			app: 'token',
			access_id,
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: me.$store.state.url,
				data,
				success: function(res) {
					var code = res.data.code;
					console.log("laikeLoginTimeout：");
					console.log(JSON.stringify(res));
					if (code == 200 && res.data.login_status == 1) { //登录未失效的用户
						me.$store.state.access_id = access_id;
						me.access_id = me.$store.state.access_id;
						uni.setStorageSync("laiketuiAccessId", me.access_id);
						uni.setStorageSync("online", true);
						resolve(me);
					} else if (code == 200 && res.data.login_status == 0) {
						//游客
						console.log(me.$store.state.channel)
						resolve({
							visitor: true
						});
					} else if(code == 404 ){
						if (me._back1 && typeof(me._back1)) {
							if (typeof(me._back1) == 'function' || typeof(me._back1) == "FUNCTION") {
								me._back1();
							}
						} else {
							uni.showToast({
								title: '未登录，请先登录',
								icon: 'none',
								duration: 1500
							});
							console.log(me.$store.state.channel)
							  
							if(me.$store.state.channel == 'zyjd'){
							  	me.$loginFrom.login(me);
							  	return
							}
							setTimeout(function() {
								uni.navigateTo({
								  url: '../../pages/login/login?toHome=true'
								})
							}, 1000);
						}
					} else {
						//登录超时
						me.$store.state.access_id = "";
						me.access_id = "";
						uni.setStorageSync("laiketuiAccessId", "");
						uni.setStorageSync("online", false);
						uni.removeStorage({
							key: 'history'
						})
						uni.removeStorage({
							key: 'user_phone'
						})
						uni.removeStorage({
							key: 'hotStatu'
						})
						uni.removeStorage({
							key: 'access_id'
						})
						me.$store.state.cart = []
						me.$store.state.cart_id = []
						me.$store.state.nCart = []
						/**
						 * @param {Object} res
						 */
						//每个页面自己去实现timeout函数
						if (me.timeout && typeof(me.timeout)) {
							if (typeof(me.timeout) == 'function' || typeof(me.timeout) == "FUNCTION") {
								me.timeout();
							}
						} else {
							//若是没有自定义timeout函数则进入下面跳转
							uni.showToast({
								title: '未登录，请先登录',
								icon: 'none',
								duration: 1500
							});
								console.log(this.$store.state.channel)
							if(me.$store.state.channel == 'zyjd'){
								me.$loginFrom.login(me);
								return
							}
							setTimeout(function() {
								uni.navigateTo({
									url: '../../pages/login/login?toHome=true'
								});
							}, 1000);
						}
					}
				},
				fail(res) {
					reject(res);
				}
			});
		});
	}

	/**
	 * 
	 */
	function laikeVisitorToLogin(){
		//游客
		uni.showToast({
			title:'未登录，请先登录!',
			icon:'none',
			duration:1500
		})
		if(this.$store.state.channel == 'zyjd'){
			console.log(this.$store.state)
			this.$loginFrom.login(this);
			return
		}
		setTimeout(function(){
			uni.navigateTo({
				url:'../../pages/login/login'
			});
		},1000);
	}
	
	/**
	* 获取授权码
	*/
	function getMPAliAuthCode(){
		return new Promise((laikeRes)=>{
			// #ifdef MP-ALIPAY
			my.getAuthCode({
				success: (res) => {
					laikeRes(res.authCode);
				},
			});
			// #endif
			
			// #ifdef MP-TOUTIAO
			tt.login({
			    success (res) {
			        console.log(`login调用成功${res.code} ${res.anonymousCode}`);
					console.log("res: " + JSON.stringify(res));
					laikeRes(res.code);
			    },
			    fail(res){
					console.log(`login调用失败`);
			    }
			});
			// #endif
			
			// #ifndef MP-ALIPAY || MP-TOUTIAO
			laikeRes("");
			// #endif
			
		});
	}
	
	/**
	 * 先获取url 再做其他
	 * @param {Object} cb
	 */
	function getUrlFirst(cb){
		let p = getLKTApiUrl();
		if(cb &&  (typeof (cb) == 'function' || typeof(cb) == 'FUNCTION')){
			p.then(function(){
				cb();
			})
		}
		return p;
	}
	
	/**
	 * 头条小程序IOS不支持虚拟支付
	 */
	function ttIOSCantVisualpay(){
		// #ifdef MP-TOUTIAO
			const info = uni.getSystemInfoSync()
			if(info.platform == 'ios'){
				uni.showToast({
					icon: 'none',
					title: 'ios暂不支持虚拟支付'
				})
				return false
			}
		// #endif
		return true;
	}
	
	
	/**
	 * 来客电商免密码登录状态
	 */
	const LKT_NRL_TYPE = {
		RL: 1, //注册登录
		NRL: 2 //免密码登录
	}

	export default {
		LKT_STORE_ID,
		LKT_ROOT_VERSION_URL,
		LKT_ROOT_URL,
		LKT_API_URL,
		LKT_H5_DEFURL,
		LKT_ENDURL,
		LKT_NRL_TYPE,
		toLogin,
		getLKTAccessToken,
		getClientid,
		laiketuiNoDoublePress,
		laikeCheckTimeout,
		laikeVisitorToLogin,
		lktDelaySetVal,
		getLKTApiUrl,
		getMPAliAuthCode,
		getUrlFirst,
		getStoreType,
		ttIOSCantVisualpay,
		closeMPAuthWin,
		getWXTmplIds,
	}
</script>
