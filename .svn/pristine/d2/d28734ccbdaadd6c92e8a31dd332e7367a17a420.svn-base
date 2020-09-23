<script>
	/**
	 * 检查是否已经授权
	 * @param {Object} authpage
	 * @param {Object} callback
	 * @param {Object} args
	 */
	function laiketui_mp_tt_check(authpage, me, callback, args) {
		//获取code
		let tt_auth_code = null;
		uni.login({
			success: function(res) {
				tt_auth_code = res.code;
				let data = {
					tt_auth_code: tt_auth_code,
					module: 'app',
					action: 'login',
					app: 'ttUserLogin',
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
						uni.setStorageSync("tt_id", userinfo['tt_id']);
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
						
						if(authpage!=null ){
							authpage.showWin = true;
						}
					
						let tt_id = res.tt_id;
						if (tt_id) {
							uni.setStorageSync("tt_id", tt_id);
						}
					} else {
						tt.showToast({
							title: '授权出错',
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
	function laiketui_mp_tt_userInfo(me) {
		// #ifdef MP-TOUTIAO
		tt.getUserInfo({
			success(res1) {
				uni.login({
					success: function(res) {
						if (res.code) {
							let tt_id = uni.getStorageSync("tt_id");
							let userInfo = res1.userInfo;
							let data = {
								tt_auth_code: res.code,
								module: 'app',
								action: 'login',
								app: 'updateTTUser',
								access_id: me.access_id,
								nickName: userInfo.nickName,
								headimgurl: userInfo.avatarUrl,
								sex: userInfo.gender,
								tt_id: tt_id
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
									uni.setStorageSync("tt_id", userinfo['tt_id']);
									me.access_id = access_id;
									me.$store.state.access_id = access_id;
									uni.setStorageSync("userinfo", userinfo);
									uni.setStorageSync('LoingByHand', false);
									uni.setStorageSync('access_id', access_id);
									uni.setStorageSync('laiketuiAccessId', me.access_id);
									uni.setStorageSync("online", true);
									me.$emit("pChangeLoginStatus");
									tt.showToast({
										title: '授权成功',
										duration: 1000
									});
								}else {
									tt.showToast({
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
				let tt_first = uni.getStorageSync("tt_first");
				if (tt_first) {
					let ret = tt.openSetting();
					return;
				}
				uni.setStorageSync("tt_first", true);
			}
		});
		// #endif

	}

	export default {
		laiketui_mp_tt_check,
		laiketui_mp_tt_userInfo,
	}
</script>
