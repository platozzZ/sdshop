<script>
	/**
	 * 支付宝小程序支付
	 * @param {Object} me
	 * @param {Object} orderInfo
	 */
	function alipay_minipay(me, trade_no) {
		
		// #ifdef MP-ALIPAY
		my.tradePay({
			tradeNO: trade_no,
			success: function(res) {
				if (res.resultCode == 9000) {
					uni.showToast({
						title: "支付成功",
						icon: 'none'
					})
					setTimeout(function() {
						uni.setStorageSync("payRes", me.order_list);
						uni.redirectTo({
							url: "payResult"
						})
						me.pay_display = false
					}, 1000);
				}else if (res.resultCode == 6001){
					setTimeout(function() {
						laikePayFail(me);
					}, 1000);
				}
			},
			fail: function(res) {
				console.log('-----file----')
				uni.showToast({
					title: res.memo,
					icon: 'none'
				})
				setTimeout(function() {
					laikePayFail(me);
				}, 1000);
			},
		});
		// #endif
	}

	/**
	 * 微信JSAPI支付
	 * @param {Object} me
	 * @param {Object} type
	 * @param {Object} orderInfo
	 */
	function weixin_jsapipay(me, type, orderInfo) {
		// #ifdef H5
		let isapp=me.$loginFrom.isCMMC();
	
		if(isapp){
			me.$bridge.call("cmmc.pushWXPay", orderInfo.data, (data) => {
					var newdata = JSON.parse(data);
					me.firstFlag = true;
					me.code == '';
					var url = window.location.href;
					var preUrl = url.split("#")[0];
					var succUrl = preUrl.concat("#/pages/pay/payResult");
					if(newdata.resultStatus=='9000'){
						// this.godetail(0)
						//支付成功
						uni.setStorageSync("payRes", me.order_list);
						var price = me.price1;
						var price = Number(me.price1) + Number(me.value);
						var sno = me.sNo;
						
						if(me.pay_name!='DJ'){
							window.location.href = uni.getStorageSync("h5_url") + "pages/pay/payResult?payment_money=" + price + "&sNo=" +sno;
						}else{
							uni.removeStorage('tui_id')
							window.location.href = uni.getStorageSync("h5_url") + "pagesA/vipClub/vipClub";
						}
					}else{
						// this.godetail(1)
						if(me.pay_name == "DJ"){
								me._payFail()
						}else{
								laikePayFail(me);
						}
					}
			});
		}
		return;
		// #endif
		// #ifdef H5
		if (type == 'ali') {
			var url = uni.getStorageSync("endurl") + 'order/' + me.sNo + '_alipay.html'
			window.location.href = url
		} else if (type == 'wx') {
			var paymentData = orderInfo.data;
			function onBridgeReady() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": paymentData.appid, //公众号名称，由商户传入     
						"timeStamp": paymentData.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": paymentData.nonceStr, //随机串     
						"package": paymentData.package,
						"signType": paymentData.signType, //微信签名方式：     
						"paySign": paymentData.paySign //微信签名 
					},
					function(res) {
						me.firstFlag = true;
						me.code == '';
						var url = window.location.href;
						var preUrl = url.split("#")[0];
						var succUrl = preUrl.concat("#/pages/pay/payResult");
						//支付成功
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							uni.setStorageSync("payRes", me.order_list);
							var price = me.price1;
							var price = Number(me.price1) + Number(me.value);
							var sno = me.sNo;
							if(me.pay_name!='DJ'){
								window.location.href = uni.getStorageSync("h5_url") + "pages/pay/payResult?payment_money=" + price + "&sNo=" +sno;
							}else{
								uni.removeStorage('tui_id')
								window.location.href = uni.getStorageSync("h5_url") + "pagesA/vipClub/vipClub";
							}
						} else {
							//支付失败
							if(me.pay_name == "DJ"){
								me._payFail()
							}else{
								laikePayFail(me);
							}
							
						}
					});
			}

			if (typeof WeixinJSBridge != "undefined") {
				onBridgeReady(paymentData);
			} else {
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					}
				}
			}
			
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: paymentData.timeStamp,
				nonceStr: paymentData.nonceStr,
				package: paymentData.package,
				signType: 'MD5',
				paySign: paymentData.paySign,
				success: (res) => {
					uni.showToast({
						title: '支付成功！',
						duration: 1000,
						icon: 'none'
					})
					setTimeout(function() {
						uni.setStorageSync("payRes", me.order_list);
						uni.redirectTo({
							url: "payResult"
						})
						me.pay_display = false
					}, 1000)
				},
				fail: (res) => {
					if(me.pay_name == "DJ"){
						me._payFail()
					}else{
						laikePayFail(me);
					}
				},
				complete: () => {
					me.loading = false;
					uni.hideLoading();
				}
			})
		}
		// #endif
	}

	/**
	 * 头条小程序支付
	 */
	function tt_pay(me, orderInfo){
		// #ifdef MP-TOUTIAO
		tt.requestPayment({
		    data: orderInfo.data.data,
		    success (res) {
		        console.log(res.errMsg);
				console.log("chengg" + JSON.stringify(res.errMsg));
				uni.showToast({
					title: '支付成功！',
					duration: 1000,
					icon: 'none',  
				});
				
				//充值回调
				if(me.rechargeSuccess && typeof me.rechargeSuccess  ){
					me.rechargeSuccess('alipay');
				} else if(me.pay_name == "DJ"){
					uni.removeStorage('tui_id')
					setTimeout(function() {
						uni.redirectTo({
							url: '../../pagesA/vipClub/vipClub'
						})
						me.pay_display = false
					}, 1000)
				}else {
					//默认回调
					setTimeout( function() {
						uni.setStorageSync("payRes", me.order_list);
						uni.redirectTo({
							url: "payResult"
						});
						me.pay_display = false
					}, 1000 );
				}
		    },
		    fail (res) {
				//充值回调
				if(me._payFail){
					me._payFail();
				}else if(me.pay_name == "DJ"){
					me._payFail()
				}else{
					//默认回调
					laikePayFail(me);
				}
		    }
		});
		// #endif
	}

	/**
	 * 百度小程序支付
	 */
	function baidu_pay(me, orderInfo){
		console.log('----------------------------orderinfo   '+orderInfo.data.data.appKey)
		console.log(orderInfo.data.data)
		// #ifdef MP-BAIDU
		swan.requestPolymerPayment({
		    orderInfo: {
		        "dealId": orderInfo.data.data.dealId,					// 后台配置
		        "appKey": orderInfo.data.data.appKey,					// 后台配置
		        "totalAmount": orderInfo.data.data.totalAmount,			// 订单金额
		        "tpOrderId": orderInfo.data.data.tpOrderId,				// 商户平台自己记录的订单ID
		        "dealTitle": orderInfo.data.data.dealTitle,				// 订单的名称
		        "signFieldsRange": orderInfo.data.data.signFieldsRange,	// 固定值1
		        "rsaSign": orderInfo.data.data.rsaSign,					// 对appKey+dealId+tpOrderId+totalAmount进行RSA加密后的签名，防止订单被伪造
		        "bizInfo": orderInfo.data.data.bizInfo					// 订单详细信息
		    },
		    success (res) {
		        console.log(res.errMsg);
				console.log("chengg" + JSON.stringify(res.errMsg));
				uni.showToast({
					title: '支付成功！',
					duration: 1000,
					icon: 'none',  
				});
				
				var url = "payResult"
				if(me.is_order){
					url = "../pay/payResult"
					var order_list = {sNo:me.sNo,total:me.z_price_,order_id:me.orde_id}
					me.order_list = JSON.stringify(order_list)
				}
				//充值回调
				if(me.rechargeSuccess && typeof me.rechargeSuccess){
					me.rechargeSuccess('alipay');
				} else if(me.pay_name == "DJ"){
					uni.removeStorage('tui_id')
					setTimeout(function() {
						uni.redirectTo({
							url: '../../pagesA/vipClub/vipClub'
						})
						me.pay_display = false
					}, 1000)
				}else {
					//默认回调
					setTimeout( function() {
						uni.setStorageSync("payRes", me.order_list);
						uni.redirectTo({
							url: url
						});
						me.pay_display = false
					}, 1000 );
				}
		    },
		    fail (res) {
				//充值回调
				if(me._payFail){
					me._payFail();
				}else if(me.pay_name == "DJ"){
					me._payFail()
				}else{
					//默认回调
					laikePayFail(me);
				}
		    }
		});
		// #endif
	}

	/**
	 * app 支付
	 * @param {Object} me
	 * @param {Object} providerStr
	 * @param {Object} orderInfo
	 */
	function app_pay(me, providerStr, orderInfo) {
		// #ifdef APP-PLUS 	
		uni.requestPayment({
			provider: providerStr,
			orderInfo: orderInfo.data, //订单数据
			success: function(res) {
				uni.showToast({
					title: '支付成功！',
					duration: 1000,
					icon: 'none',
				})
				if(me.pay_name == "DJ"){//订单类型会员等级DJ
					uni.removeStorage('tui_id')
					setTimeout(function() {
						uni.redirectTo({
							url: '../../pagesA/vipClub/vipClub'
						})
						me.pay_display = false
					}, 1000)
				}else if(me.pay_name == "MYORDER"){//我的订单
					if(me.appPaySuccess){
						me.appPaySuccess();
					}
				} else {
					setTimeout(function() {
						uni.setStorageSync("payRes", me.order_list);
						uni.redirectTo({
							url: "payResult"
						})
						me.pay_display = false
					}, 1000)
				}
			},
			fail: function(err) {
				var str = JSON.stringify(err);
				if(me.pay_name == "DJ"){
					me._payFail()
				}else{
					laikePayFail(me);
				}
			}
		});
		// #endif
		
		// #ifdef H5	
		// uni.requestPayment({
		//    provider: providerStr,
		//    orderInfo: orderInfo.data, //订单数据
		//    success: function(res) {
		//     uni.showToast({
		//      title: '支付成功！',
		//      duration: 1000,
		//      icon: 'none',
		//     })
		//     if(me.pay_name == "DJ"){//订单类型会员等级DJ
		//      uni.removeStorage('tui_id')
		//      setTimeout(function() {
		//       uni.redirectTo({
		//        url: '../../pagesA/vipClub/vipClub'
		//       })
		//       me.pay_display = false
		//      }, 1000)
		//     }else if(me.pay_name == "MYORDER"){//我的订单
		//      if(me.appPaySuccess){
		//       me.appPaySuccess();
		//      }
		//     } else {
		//      setTimeout(function() {
		//       uni.setStorageSync("payRes", me.order_list);
		//       uni.redirectTo({
		//        url: "payResult"
		//       })
		//       me.pay_display = false
		//      }, 1000)
		//     }
		//    },
		//    fail: function(err) {
		//     var str = JSON.stringify(err);
		//     if(me.pay_name == "DJ"){
		//      me._payFail()
		//     }else{
		//      laikePayFail(me);
		//     }
		//    }
		//   });
		// alert("阿里支付");
		 // #endif
		// #ifdef H5
		let isapp=me.$loginFrom.isCMMC()
		if(isapp){
			me.$bridge.call("cmmc.pushPay",orderInfo.data, (data) => {
						var newdata = JSON.parse(data);
						if(newdata.resultStatus=='9000'){
								uni.showToast({
							title: '支付成功！',
							duration: 1000,
							icon: 'none',
						})
						if(me.pay_name == "DJ"){//订单类型会员等级DJ
							uni.removeStorage('tui_id')
							setTimeout(function() {
								uni.redirectTo({
									url: '../../pagesA/vipClub/vipClub'
								})
								me.pay_display = false
							}, 1000)
						}else if(me.pay_name == "MYORDER"){//我的订单
							if(me.appPaySuccess){
								me.appPaySuccess();
							}
						} else {
							setTimeout(function() {
								uni.setStorageSync("payRes", me.order_list);
								uni.redirectTo({
									url: "payResult"
								})
								me.pay_display = false
							}, 1000)
						}
						//支付成功
					}else{
						var str = JSON.stringify(err);
						if(me.pay_name == "DJ"){
							me._payFail()
						}else{
							laikePayFail(me);
						}
					}
			});
		}
		
		  // #endif
		
	}

	/**
	 * 支付入口
	 * @param {Object} me
	 * @param {Object} type
	 * @param {Object} orderInfo
	 * @param {Object} providerStr
	 */
	function laikePayMain(me, type) {
		
		if (!type) {
			return;
		}
		
		getOrderInfo(me,type).then(function(orderInfo) {
			console.log("==laikePayMain=23=");
			var providerStr = "";
			if (type == 'wx') {
				providerStr = 'wxpay'
			} else if (type == 'ali') {
				providerStr = 'alipay'
			}
			uni.hideLoading();		
			// #ifdef H5
			//weixin_jsapipay(me, type, orderInfo);
			type == 'wx'?weixin_jsapipay(me, type, orderInfo) : app_pay(me, providerStr, orderInfo)
			// #endif
			// #ifdef APP-PLUS 
			app_pay(me, providerStr, orderInfo);
			// #endif
			// #ifdef MP-ALIPAY
			alipay_minipay(me, orderInfo);
			// #endif
			// #ifdef MP-TOUTIAO
			tt_pay(me, orderInfo);
			// #endif
			// #ifdef MP-BAIDU
			baidu_pay(me, orderInfo);
			// #endif
		});
	}
	
	/**
	 * 获取订单信息
	 * @param {Object} me
	 * @param {Object} type
	 */
	function getOrderInfo(me,type){
		let data = {
			access_id: me.access_id,
			title: '',
			module: 'app',
			action: 'pay',
			type: 'app_wechat',
			type_: 'KJ',
			total: me.price1,
			bargain_order_no: me.order_no,
			remarks: me.remarks,
		}
		
		if(!me.sNo && !me.order_list){
			console.log("没有订单编号.");
			return ;
		}

		console.log("sNo."+me.sNo);
		console.log("order_list."+me.order_list);
		if(me.sNo){
			data.sNo = me.sNo;
		}else if(me.order_list){
			data.order_list =  me.order_list
		}
		
		//不允许出现低于一分钱的支付
		if(data.total < 0.01 ){
			data.total = 0.01
		}
		if (me.pay_name == 'jp') {
			data.title = me.jp_name
		} else {
			// data.title = me.pro[0].list[0].product_title;
			data.title = me.payTitle?me.payTitle:'支付信息';
		}
		let isCMMC=me.$loginFrom.isCMMC();
		
		// #ifdef H5
		if (type == 'wx') {
			// data.type = 'jsapi_wechat'yinli
			if(isCMMC){
				data.type = 'app_wechat'
			}else{
				data.type = 'jsapi_wechat'
			}
			data.code = me.code
		} else if (type == 'ali') {
			
				data.type = 'alipay'
		}
		// #endif
		
		// #ifndef H5
		if (type == 'wx') {
			data.type = 'app_wechat'
		} else if (type == 'ali') {
			data.type = 'alipay'
			// #ifdef MP-ALIPAY
			data.type = 'alipay_minipay';
			data.store_type = 1;
			// #endif
			// #ifdef MP-TOUTIAO
			data.type = 'tt_alipay';
			data.store_type = 1;
			// #endif
		} else if (type == 'baidu_pay') {
			// #ifdef MP-BAIDU
			data.type = 'baidu_pay';
			data.store_type = 1;
			// #endif
		}
		// #endif 
		
		let p = me.LaiKeTuiCommon.getMPAliAuthCode();
		return p.then((authcode)=>{
			if(authcode){
				// #ifdef MP-ALIPAY
				data.alimp_authcode = authcode;
				// #endif
				// #ifdef MP-TOUTIAO
				data.tt_authcode = authcode;
				// #endif
			}
			return new Promise((laikeOK,fail) => {
				uni.request({
					url: uni.getStorageSync("url"),
					data,
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					success:function(res){
						if (res.statusCode == 200) {
							// #ifndef MP-ALIPAY
							laikeOK(res);
							// #endif
							
							// #ifdef MP-ALIPAY
							let tno = res.data;
							laikeOK(tno.substr(1,tno.length));
							// #endif
						} 
					},
					error:function(err){
						console.log(err)
					},
					fail:function(e){
						// #ifdef MP-ALIPAY
						let tno = e.data;
						if(tno.length > 28){
							laikeOK(tno.substr((tno.indexOf("s")+1),(tno.length-4)));
						}else{
							laikePayFail(me);
						}
						// #endif
						console.log(e);
					}
				})
			})
		})
	}


	/**
	 *  支付宝小程序会员充值失败
	 * @param {Object} me
	 */
	function vipAliMiniPayFail(me){
		uni.showToast({
			title: '充值失败！',
			duration: 1000,
			icon:'none'
		})
		setTimeout(()=>{
			//关闭弹窗
			me.modalName = null,
			me.autoplay = me.swiper_dots = true;
		},1000);
	}
	
	/**
	 * 支付失败
	 * @param {Object} me
	 */
	function laikePayFail(me) {
		if(me.fromVip == 1){
			vipAliMiniPayFail(me);
		}else{
			console.log('-------laikePayFail------')
			uni.showModal({
				title: '提示',
				content: '支付失败,查看订单详情',
				success: function(res) {
					me.firstFlag = true
					// #ifdef H5
					if (res.confirm) {
						window.location.href = uni.getStorageSync("h5_url") + "pages/order/myOrder?status=1";
					} else if (res.cancel) {
						window.location.href = uni.getStorageSync("h5_url") + "pages/tabBar/home";
					}
					// #endif
					// #ifndef H5
					me.$store.state.payRes = me.order_list
					if (res.confirm) {
						uni.redirectTo({
							url: '../../pages/order/myOrder'
						})
					} else if (res.cancel) {
						uni.switchTab({
							url: '../tabBar/home'
						})
					}
					// #endif
				}
			})
		}
	}

	/**
	 * 微信JSAPI支付获取code值
	 * @param {Object} me
	 */
	function toUrl(me) {
		var locationUrl = window.location.href
		let access_id = uni.getStorageSync("access_id");
		//判断是否为空
		var data = {
			type: 'jsapi_wechat',
			access_id: access_id,
			app: 'get_config',
			module: "app",
			action: "commcenter",
			url: locationUrl
		}
		uni.request({
			data,
			url: uni.getStorageSync("url"),
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: (res) => {
				if (res.data.code == 200) {
					var myappid = res.data.data.config.appid
					me.myappid = myappid
					var myUrl = res.data.data.url
					var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myappid +
						"&redirect_uri=" + myUrl +
						"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
					window.location.href = url
				} else {
					uni.showToast({
						title: res.data.message,
						duration: 1500,
						icon: 'none'
					})
				}
			},
			error: function(err) {
				console.log(err);
			}
		})
	}

	/**
	 * 微信小程序
	 * @param {Object} me
	 */
	function weixin_minipay(me) {
		me.loading = true;
		uni.login({
			provider: 'weixin',
			success: (e) => {
				var data;
				if (me.pay_name == "jp") {
					data = {
						code: e.code,
						order_list: me.order_list,
						title: me.jp_name,
						type: 'mini_wechat',
						access_id: me.access_id,
						total: me.jp_zong,
						module: 'app',
						action: 'pay',
						remarks: me.remarks,
					}
				} else if (me.pay_name == 'DJ') {
					data = {
						code: e.code,
						sNo: me.sNo,
						title: me.title,
						type: 'mini_wechat',
						access_id: me.access_id,
						total: me.total,
						module: 'app',
						action: 'pay',
						remarks: me.remarks
					}
				}else if (me.bargain) {
					data = {
						code: e.code,
						order_list: me.order_list,
						title: me.pro[0].list[0].product_title,
						type: 'mini_wechat',
						type_: 'KJ',
						access_id: me.access_id,
						total: me.price1,
						module: 'app',
						action: 'pay',
						remarks: me.remarks,
					}
				} else {
					data = {
						code: e.code,
						order_list: me.order_list,
						title: me.pro[0].list[0].product_title,
						type: 'mini_wechat',
						access_id: me.access_id,
						total: me.price1,
						module: 'app',
						action: 'pay',
						remarks: me.remarks,
					}
				}
				uni.request({
					url: uni.getStorageSync("url"),
					data,
					success: (res) => {
						uni.hideLoading();
						if (res.statusCode !== 200) {
							// laikePayFail(me);
							return;
						} else if (res.statusCode == 200) {
							let paymentData = res.data;
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: paymentData.timeStamp,
								nonceStr: paymentData.nonceStr,
								package: paymentData.package,
								signType: 'MD5',
								paySign: paymentData.paySign,
								success: (res) => {
									uni.showToast({
										title: '支付成功！',
										duration: 1000,
										icon: 'none'
									})
									if(me.pay_name == "DJ"){
										uni.removeStorage('tui_id')
										setTimeout(function() {
											uni.redirectTo({
												url: '../../pagesA/vipClub/vipClub'
											})
											me.pay_display = false
										}, 1000)
									} else {
										setTimeout(function() {
											uni.setStorageSync("payRes", me.order_list);
											uni.redirectTo({
												url: "payResult"
											})
											me.pay_display = false
										}, 1000)
									}
								},
								fail: (res) => {
									if(me.pay_name == "DJ"){
										me._payFail()
									}else{
										laikePayFail(me);
									}
								},
								complete: () => {
									me.loading = false;
								}
							})
						} else {
							// laikePayFail(me);
						}
					},
					fail: (e) => {
						me.loading = false;
						uni.hideLoading();
						// laikePayFail(me);
					}
				})
			},
			fail: (e) => {
				me.loading = false;
				uni.hideLoading();
				// laikePayFail(me);
			}
		})
	}

	/**
	 * 确认钱包支付
	 * @param {Object} me
	 */
	function laike_walletpay_ok(me) {
		if (!me.fastTap) {
			console.log('exit');
			return;
		}
		me.fastTap = false
		if (me.enterless) {
			uni.showLoading({
				title: '支付中...',
				mask: true,
			})
			if (me.msg.length == 6) {
				var data = {
					module: 'app',
					action: 'user',
					app: 'payment_password',
					access_id: me.access_id,
					password: me.msg,
					endTime: '',
				}
			
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						let {
							data: {
								code,
								message,
								enterless
							}
						} = res
						if (code == 200) {
							me.pay_display = false
							me.fastTap = true
							me._payAxios()

						} else if (enterless) {
							uni.hideLoading();
							me.msg = '';
							uni.showToast({
								title: '您输入密码错误,请重新输入',
								duration: 1000,
								icon: 'none'
							})
							me.enterless = enterless
							me.fastTap = true
						} else if (!enterless) {
							uni.hideLoading();
							uni.showToast({
								title: '你输入的错误次数已达当日上限，请使用其它支付方式进行付款',
								duration: 1000,
								icon: 'none'
							})
							me.pay_display = false;
							me.enterless = false;
							me.fastTap = true
						}
					},
					error: function(err) {
						uni.hideLoading();
						uni.showToast({
							title: '网络错误，请稍后再试',
							duration: 1000,
							icon: 'none'
						})
						me.pay_display = false;
						me.fastTap = true
					},
					// ,
					// fail:function(e){
					// 	// #ifdef MP-ALIPAY
					// 	if(e.indexOf(":200")){
					// 		
					// 	}
					// 	// #endif
					// 	
					// }
				})
			} else {
				uni.hideLoading();
				me.fastTap = true
				uni.showToast({
					title: '请输入完整密码！',
					duration: 1000,
					icon: 'none'
				})
			}
		} else {
			me.fastTap = true
			uni.showToast({
				title: '你输入的错误次数已达当日上限，请使用其它支付方式进行付款',
				duration: 1000,
				icon: 'none'
			})
			me.pay_display = false;
		}
	}
	
	/**
	 * 取消钱包支付
	 * @param {Object} me
	 */
	function laike_walletpay_cancel(me){
		me.pay_display = false
		me.msg = ""
		me.firstFlag = true
		laikePayFail(me);
	}
	
	/**
	 * 余额支付 || 组合支付
	 * @param {Object} me
	 * @param {Object} type
	 */
	function laike_walletpay(me,type){
		if (!me.fastTap) {
			return
		}
		me.fastTap = false
		var data = {
			module: 'app',
			action: 'pay',
			app: 'wallet_pay',
			m: 'wallet_pay',
			type: 'wallet_pay',
			access_id: me.access_id,
			address_id: me.address_id ? me.address_id : me.addre_id,
			order_list: me.order_list,
			remarks: me.remarks,
		}
		if (me.bargain) {
			data.order_no = me.order_no
			data.type_ = 'KJ'
		}
		if (me.pay_name == "jp") {
			data.payment_money = me.jp_zong
		}else if(me.otype == "MS"){
			data.activity_id = me.activity_id
			data.time_id = me.time_id
			data.payment_money = me.value
		} else {
			data.payment_money = me.value
		}
		uni.request({
			data,
			url: uni.getStorageSync("url"),
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: (res) => {
				me.fastTap = true
				let {
					data: {
						code,
						message
					}
				} = res
				console.log(message+"------------wallet_pay--------"+code)
				console.log(res)
				if (code == 200) {
					if (Number(me.price1) > 0) {
						console.log("-me.price1-------------"+me.price1)
						// #ifdef MP-WEIXIN
						weixin_minipay(me);
						// #endif
						//#ifndef MP-WEIXIN
						if (me.wxPayStatue) {
							me.pay_wx('wx')
							laikePayMain();
						} else if (me.aliPayStatue) {
							me.pay_wx('ali')
						} else if (me.baidupayStatue) {
							me.pay_wx('baidu_pay')
						}
						// #endif
					} else {
						uni.hideLoading();
						var dat_id = me.order_id ? me.order_id : me.or_id
						uni.showToast({
							title: '支付成功！',
							duration: 1000,
							icon: 'none'
						})
						setTimeout(function() {
							if (me.pay_name == "jp") {
								uni.redirectTo({
									url: "payResult?payment_money=" + me.jp_zong + "&sNo=" + me.sNo + "&order_id=" + dat_id
								})
							} else {
								uni.setStorageSync("payRes",me.order_list);
								uni.redirectTo({
									url: "payResult"
								})
							}
							me.pay_display = false
						}, 1000)
					}
				} else if (code == 112) {
					uni.hideLoading();
					me.pay_display = false
					me.msg = ""
					me.firstFlag = true
					uni.showModal({
						title: '提示',
						content: '支付失败,订单已生成，可以在订单列表中查看',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '../order/myOrder'
								})
							}
						}
					})
				} else {
					uni.hideLoading();
					me.pay_display = false
					me.msg = ""
					uni.showModal({
						title: '提示',
						content: '网络繁忙，支付失败  订单已生成，可以在订单列表中查看',
						showCancel: false,
						success: function(res) {
							me.firstFlag = true
							if (res.confirm) {
								uni.switchTab({
									url: '../tabBar/home'
								})
							}
						}
					})
				}
			},
			error: function(err) {
				me.fastTap = true
			},
			fail:function(data){
				// #ifdef MP-ALIPAY
				if(data.data.indexOf(":200") != -1){
					if (Number(me.price1) > 0) {
						// #ifdef MP-WEIXIN
						weixin_minipay(me);
						// #endif
						//#ifndef MP-WEIXIN
						if (me.wxPayStatue) {
							me.pay_wx('wx')
							laikePayMain();
						} else if (me.aliPayStatue) {
							me.pay_wx('ali')
						} else if (me.baidupayStatue) {
							me.pay_wx('baidu_pay')
						}
						// #endif
					} else {
						uni.hideLoading();
						var dat_id = me.order_id ? me.order_id : me.or_id
						uni.showToast({
							title: '支付成功！',
							duration: 1000,
							icon: 'none'
						})
						setTimeout(function() {
							if (me.pay_name == "jp") {
								uni.redirectTo({
									url: "payResult?payment_money=" + me.jp_zong + "&sNo=" + me.sNo + "&order_id=" + dat_id
								})
							} else {
								uni.setStorageSync("payRes",me.order_list);
								uni.redirectTo({
									url: "payResult"
								})
							}
							me.pay_display = false
						}, 1000)
					}
				}else if (code == 112) {
					uni.hideLoading();
					me.pay_display = false
					me.msg = ""
					me.firstFlag = true
					uni.showModal({
						title: '提示',
						content: '支付失败,订单已生成，可以在订单列表中查看',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '../order/myOrder'
								})
							}
						}
					})
				} else {
					uni.hideLoading();
					me.pay_display = false
					me.msg = ""
					uni.showModal({
						title: '提示',
						content: '网络繁忙，支付失败  订单已生成，可以在订单列表中查看',
						showCancel: false,
						success: function(res) {
							me.firstFlag = true
							if (res.confirm) {
								uni.switchTab({
									url: '../tabBar/home'
								})
							}
						}
					})
				}
				// #endif
			}
		})
	}

	export default {
		alipay_minipay,
		weixin_jsapipay,
		app_pay,
		laikePayMain,
		laikePayFail,
		toUrl,
		weixin_minipay,
		laike_walletpay_cancel,
		laike_walletpay_ok,
		laike_walletpay,	
		getOrderInfo,
		tt_pay,
		baidu_pay
	}
</script>
