<script>
	/**
	 * 检查是否已经授权
	 * @param {Object} authpage
	 * @param {Object} callback
	 * @param {Object} args
	 */
	function laiketui_mp_baidu_check(authpage, me, callback, args) {
		//获取code
		let bd_auth_code = null;
		uni.login({
			success: function(res) {
				bd_auth_code = res.code;
				let data = {
					bd_auth_code: bd_auth_code,
					module: 'app',
					action: 'login',
					app: 'bdUserLogin',
					access_id: me.access_id,
				};
				me.$req.post({
					data
				}).then(res => {
					let code = res.code;
					if (code == 200) {
						let userinfo = res.userInfo;
						
						if(authpage!=null ){
							authpage.showWin = false;
						}
						let access_id = userinfo.access_id;
						uni.setStorageSync("bd_id", userinfo['bd_id']);
						me.access_id = access_id;
						me.$store.state.access_id = access_id;
						uni.setStorageSync("userinfo", userinfo);
						// me.access_id1 = true ;
						// //调用父类的改变登录状态方法
						// //手动登陆标志为false
						uni.setStorageSync('LoingByHand', false);
						uni.setStorageSync('access_id', access_id);
						uni.setStorageSync('laiketuiAccessId', me.access_id);
						uni.setStorageSync("online", true);
						if(me.changeLoginStatus){
							me.changeLoginStatus();
						}
						if (callback && args) {
							callback(args);
						} else if (callback) {
							callback();
						}
					} else if (code == 203) {
						//没有查询到用户信息，弹窗授权
						
						if(authpage != null){
							authpage.showWin = true;
						}
						let bd_id = res.bd_id;
						if (bd_id) {
							uni.setStorageSync("bd_id", bd_id);
						}
					} else {
						uni.showToast({
							title: res.msg,
							duration: 1000
						});
						if(authpage!=null ){
							authpage.showWin = false;
						}
					}
				});
			},
		})
	}

	/**
	 * 授权并获取用户信息
	 * @param {Object} me
	 */
	function laiketui_mp_baidu_userInfo(me) {
		uni.getUserInfo({
			success(res1) {
				let userInfo = [];
				
				if(res1.userInfo){
					userInfo = res1.userInfo;
					let nickName = res1.userInfo.nickName;
					//
					if("百度网友" == nickName){
						me.showWin = false;
						uni.showToast({
							title: '授权拒绝',
							duration: 1000
						});
						return;
					}
				}
				
				uni.login({
					success: function(res){
						if (res.code) {
							let bd_id = uni.getStorageSync("bd_id");
							let data = {
								bd_auth_code: res.code,
								module: 'app',
								action: 'login',
								app: 'updateBDUser',
								access_id: me.access_id,
								nickName: userInfo.nickName,
								headimgurl: userInfo.avatarUrl,
								sex: userInfo.gender,
								bd_id: bd_id
							};
							me.$req.post({
								data
							}).then(res => {
								var code = res.code;
								var msg = res.msg;
								if (code === 200) {
									//查询到了用户信息
									let userinfo = res.userInfo;
									me.showWin = false;
									let access_id = userinfo.access_id;
									uni.setStorageSync("bd_id", userinfo['bd_id']);
									me.access_id = access_id;
									me.$store.state.access_id = access_id;
									uni.setStorageSync("userinfo", userinfo);
									// me.access_id1 = true ;
									// //调用父类的改变登录状态方法
									// //手动登陆标志为false
									uni.setStorageSync('LoingByHand', false);
									uni.setStorageSync('access_id', access_id);
									uni.setStorageSync('laiketuiAccessId', me.access_id);
									uni.setStorageSync("online", true);
									me.$emit("pChangeLoginStatus");
									uni.showToast({
										title: '授权成功',
										duration: 1000
									});
								}else {
									uni.showToast({
										title: '授权失败',
										duration: 1000
									});
									me.showWin = false;
								}
							}).catch(res1 => {
								me.showWin = false;
							});
						} else {
							me.showWin = false;
						}
					},
				});
			},
			fail(res2) {
				me.showWin = false;
				let bd_first = uni.getStorageSync("bd_first");
				if (bd_first) {
					let ret = uni.openSetting();
					return;
				}
				uni.setStorageSync("bd_first", true);
			}
		});
	}

	export default {
		laiketui_mp_baidu_check,
		laiketui_mp_baidu_userInfo,
	}
</script>
