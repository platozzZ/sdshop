<script>
	
	/**
	 *  微信授权
	 * @param {Object} res
	 * @param {Object} authPage
	 */
	function laiketui_mp_weixin_auth(res,authPage){
		var me = authPage;
		let userInfo = res.detail.userInfo;
		me.access_id = uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):me.$store.state.access_id;
		if (userInfo) {
			uni.login({
				success: function (res) {
					if (res.code) {
						let data = {
							nickName: userInfo.nickName,
							headimgurl: userInfo.avatarUrl,
							sex: userInfo.gender,
							code:res.code,
							module:'app',
							action:'login',
							app:'user',
							access_id:me.access_id,
							store_type:1,
						};
						me.$req.post({
							data
						}).then(res => {
							me.showWin = false;
							let access_id = res.access_id;
							let userinfo = {};
							userinfo['openid']=res.openid;
							userinfo['session_key'] = res.session_key;
							userinfo['user'] = res.user;
							me.access_id = res.access_id;
							me.$store.state.access_id = res.access_id;
							uni.setStorageSync("userinfo",userinfo);
							me.access_id1 = true;
							//调用父类的改变登录状态方法
							//手动登陆标志为false
							uni.setStorageSync('LoingByHand',false);
							uni.setStorageSync('laiketuiAccessId',me.access_id);
							uni.setStorageSync("online",true);
							me.$emit("pChangeLoginStatus");
							uni.showToast({
								title: "授权成功",
								duration: 1000,
								icon: 'none'
							});
						})
					} else {
						console.log("授权失败");
						me.showWin = false;
						uni.showToast({
							title: "授权失败",
							duration: 1000,
							icon: 'none'
						});
					}
				},
			})
		} else {
			console.log("点击了拒绝授权");
			me.showWin = false;
		}
	}
	
	/**
	 * 关闭微信后重新登陆来客系统获取相关操作钥匙
	 * @param {Object} me
	 */
	function reloadToLaikeOS(me,callback,args){
		return new Promise(function(laikeok,error){
			uni.login({
				success: function (res) {
					if (res.code) {
						let data = {
							code:res.code,
							module:'app',
							action:'login',
							app:'user',
							access_id:me.access_id,
							store_type:1,
						};
						me.$req.post({
							data
						}).then(res => {
							me.showWin = false;
							let access_id = res.access_id;
							let userinfo = {};
							userinfo['openid']=res.openid;
							userinfo['session_key'] = res.session_key;
							userinfo['user'] = res.user;
							me.access_id = res.access_id;
							me.$store.state.access_id = res.access_id;
							console.log(me.access_id);
							uni.setStorageSync("userinfo",userinfo);
							me.access_id1 = true;
							uni.setStorageSync('LoingByHand',false);
							uni.setStorageSync('laiketuiAccessId',me.access_id);
							uni.setStorageSync("online",true);
							me.$emit("pChangeLoginStatus");
							
							if(callback && args){
								callback(args);
							} else if(callback){
								callback();
							}
						})
					} else {
						me.showWin = false;
						uni.showToast({
							title: "重新登陆失败",
							duration: 1000,
							icon: 'none'
						});
					}
				},
			});
		});
	}
	
	/**
	 * 授权过后，没有失效时
	 * @param {Object} obj
	 */
	function laiketui_mp_weixin_load(fromPage,callback,args){
		var me = fromPage;
		var access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
		let p = new Promise((resolve, reject)=>{
			var userinfo = uni.getStorageSync("userinfo") || [];
			if(userinfo['openid']){
				laikeGetRightToken( me , userinfo['openid'] ).then(function(token){
					resolve(token);	
				});
			} else {
				reloadToLaikeOS(me,callback,args);
			}
		});
		p.then(function(token){
			var userinfo = uni.getStorageSync("userinfo") || [];
			var headimgurl = userinfo.user.headimgurl || "";
			me.$store.state.access_id = token;
			uni.setStorageSync('access_id',token);
			me.access_id = me.$store.state.access_id;
			me.login_status = 1;
			if(callback && args){
				callback(args);
			}else if(callback &&　!args){
				callback();
			}
		});
	}
	
	/**
	 * 检测accessID 是否过期，若过期则生成新accessid
	 * @param {Object} access_id
	 */
	function laikeGetRightToken(me,openid){
		var data = {
			module: 'app',
			action: 'login',
			app: 'login_access',
			openid:openid,
			store_type:1
		}
		return new Promise((resolve, reject)=>{
			uni.request({
				url: me.$store.state.url,
				data,
				success: function(res) {
					var code = res.data.code;
					let token = res.data.access_id;
					console.log("laikeLoginTimeout：");
					console.log(JSON.stringify(res));
					if ( code == 200 && token ) {
						resolve(token);
					}else{
						let message = res.data.message || '登陆异常，请联系管理员！';
						uni.showToast({
							title:message,
							icon:'none',
							duration:1500
						});
					}
				}
			});
		});
	}
	
	/**
	 * 检测微信的session是否失效
	 * @param {Object} authPage
	 * @param {Object} fromPage
	 */
	function laiketui_mp_weixin_checksession(authPage,fromPage,callback,args){
		var _this = authPage;
		var me = fromPage;
		uni.checkSession({
			success: function (res) {
				console.log(res,'登录未过期');
				_this.showWin = false;
				laiketui_mp_weixin_load(me,callback,args);
			},
			fail: function (res) {
				console.log(res,'登录过期了')
				_this.showWin = true;
			}
		})
	}
	
	/**
	 * 游客类型界面需要检测授权是否过期调用
	 * @param {Object} fromPage
	 * @param {Object} callback
	 * @param {Object} args
	 */
	function laiketui_mp_weixin_checkauth(fromPage,callback,args){
		var me = fromPage;
		let LoingByHand = uni.getStorageSync("LoingByHand");
		let needRegister = uni.getStorageSync("needRegister");
		if( needRegister == me.LaiKeTuiCommon.LKT_NRL_TYPE.NRL && !LoingByHand ){
			uni.checkSession({
				success: function (res) {
					console.log(res,'登录未过期');
					laiketui_mp_weixin_load(me,callback,args);
				},
				fail: function (res) {
					console.log(res,'登录过期了')
				}
			})
		}
	}
	
	export default {
		laiketui_mp_weixin_auth,
		laiketui_mp_weixin_load,
		laiketui_mp_weixin_checksession,
		laiketui_mp_weixin_checkauth,		
	}
	
</script>