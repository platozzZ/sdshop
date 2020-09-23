//竞拍押金页

//分享处理函数
export function lkt_showShareMask(me) {

	//#ifdef H5
	var Clipboard = require('../../../common/clipboard.js')
	var clipboard = new Clipboard('#copyy')
	clipboard.on('success', function(e) {
		uni.showToast({
			title: '复制分享链接成功！',
			duration: 1000,
			icon: 'none'
		})
	});
	clipboard.on('error', function(e) {
		uni.showToast({
			title: '复制分享链接失败！',
			duration: 1000,
			icon: 'none'
		})
		document.querySelector('.copy');
	});
	// #endif
	// #ifndef H5
	me.shareMask = true
	// #endif
	console.log('title是', me.order.title)
	var data = {
		module: 'app',
		action: 'getcode',
		m: 'share',
		proId: me.order.product_id,
		access_id: me.access_id,
		type: 'JP',
		bindding_id: me.bindding_id
	}
	uni.request({
		data,
		url: uni.getStorageSync("url"),
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: function(res) {
			console.log(res)
			if (res.data.code == 200) {
				// me.ewmImg=res.data.img+""
				me.ewmImg = uni.getStorageSync("endurl") + res.data.imgUrl
			} else if (res.data.code == 404) {
				uni.showToast({
					title: "未登录，请先登录！3",
					duration: 1000,
					icon: 'none'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1'
					});
				}, 1000)
			} else {
				uni.showToast({
					title: res.data.message,
					duration: 1500,
					icon: 'none'
				})
			}
		},
	})


}
//分享处理函数
export function lkt_showSaveEWM(string, me) {

	var data = {
		module: 'app',
		action: 'getcode',
		m: 'share',
		proId: me.order.product_id,
		access_id: me.access_id,
		type: 'JP',
		bindding_id: me.bindding_id
	}
	if (string == 'wx') {
		data.store_type = 1
	} else {
		data.store_type = 2
	}
	uni.request({
		data,
		url: uni.getStorageSync("url"),
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: function(res) {

			if (res.data.code == 200) {
				me.ewmImg = uni.getStorageSync("endurl") + res.data.imgUrl
				me.saveEWM = true
				console.log('图片路径' + me.ewmImg)
			} else if (res.data.code == 404) {
				uni.showToast({
					title: "未登录，请先登录！1",
					duration: 1000,
					icon: 'none'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1'
					});
				}, 1000)
			} else {
				uni.showToast({
					title: res.data.message,
					duration: 1500,
					icon: 'none'
				})
			}

		},
	})
}

//微信支付（单独处理小程序微信支付）
export function lkt_weixinPay(me) {
	me.loading = true;
	uni.login({
		provider: 'weixin',
		success: (e) => {
			let data = {
				code: e.code,
				sNo: me.sNos,
				title: me.titles,
				type: 'mini_wechat',
				access_id: me.access_id,
				total: me.totals,
				module: 'app',
				action: 'pay',
			}
			console.log(data)
			uni.request({
				url: uni.getStorageSync("url"),
				data,
				success: (res) => {
					console.log(res)
					if (res.statusCode !== 200) {
						me.qd_flag=true
						uni.showModal({
							title: '提示',
							content: '支付失败',
							success: function(res) {
								if (res.confirm) {
									console.log(1)
								} else if (res.cancel) {
									console.log(2)
								}
							}
						})
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
								var dat_id = me.order_id ? me.order_id : me.or_id
								uni.showToast({
									title: '支付成功！',
									duration: 1000,
									icon: 'none'
								})
								setTimeout(function() {

									uni.redirectTo({
										url: './bidding_detailed_Two?mark=1&detail_one=1',
									})
									me.pay_display = false
									me.bind_promise(1)
									console.log(3)
								}, 1000)
							},
							fail: (res) => {
								me.qd_flag=true
								uni.showModal({
									title: '提示',
									content: '支付失败',
									success: function(res) {
										if (res.confirm) {
											console.log(3)
										} else if (res.cancel) {
											console.log(4)
										}
									}
								})
							},
							complete: () => {
								me.loading = false;
							}
						})
					} else {
						me.qd_flag=true
						uni.showModal({
							title: '提示',
							content: '支付失败',
							success: function(res) {
								if (res.confirm) {
									console.log(5)
								} else if (res.cancel) {
									console.log(6)
								}
							}
						})
					}
				},
				fail: (e) => {
					console.log("fail", e);
					me.loading = false;
					me.qd_flag=true
					uni.showModal({
						title: '提示',
						content: '支付失败',
						success: function(res) {
							if (res.confirm) {
								console.log(7)
							} else if (res.cancel) {
								console.log(8)
							}
						}
					})
				}
			})
		},
		fail: (e) => {
			console.log("fail", e);
			me.loading = false;
			me.qd_flag=true
			uni.showModal({
				title: '提示',
				content: '支付失败',
				success: function(res) {
					if (res.confirm) {
						console.log(9)
					} else if (res.cancel) {
						console.log(10)
					}
				}
			})
		}
	})
}

export async function lkt_pay_wx(type, me) {
	if (!type) {
		return;
	}
	let orderInfo = await me.getOrderInfo(type)
	var providerStr = "";
	if (type == 'wx') {
		providerStr = 'wxpay'
	} else if (type == 'ali') {
		providerStr = 'alipay'
	} else if (type == 'baidu') {
		providerStr = 'baidu_pay'
	}

	if (orderInfo.statusCode !== 200) {
		me._payFail();
	}
	var str = JSON.stringify(orderInfo.data)
	uni.hideLoading()
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
						me.$store.state.payRes = me.order_list;
						var price = me.price1;
						// #ifdef H5
						var price = Number(me.price1) + Number(me.value);
						// #endif
						var sno = me.sNo;
						me._axios()
					} else {
						//支付失败
						me._payFail();
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
				me.$store.state.payRes = me.order_list
				me.pay_display = false
				me._axios()

			},
			fail: (res) => {
				me._payFail();
			},
			complete: () => {
				me.loading = false;
				uni.hideLoading();
			}
		})
	}
	// #endif
	// #ifdef MP-ALIPAY
	my.tradePay({
		tradeNO: orderInfo,
		success: function(res) {
			console.log('--------------payok------------')
			console.log(res)
			// #ifdef MP-ALIPAY
			if(res.resultCode == 6001){
				me._payFail();
				return;
			}
			// #endif
			
			uni.showToast({
				title: '支付成功！',
				duration: 1000,
				icon: 'none'
			})
			me.$store.state.payRes = me.order_list
			me.pay_display = false
			uni.showToast({
				title: '上交押金成功！',
				duration: 1000,
				icon: 'none'
			})
			uni.redirectTo({
				url: './bidding_detailed_Two?mark=1&detail_one=1',
				
			})
			return false
		},
		fail: function(err) {
			var str = JSON.stringify(err)
			me._payFail();
		}
	});
	return;
	// #endif
	// #ifdef MP-TOUTIAO
	me.laikepay.tt_pay(me,orderInfo)
	// #endif
	// #ifndef H5 || MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
	uni.requestPayment({
		provider: providerStr,
		orderInfo: orderInfo.data, //订单数据
		success: function(res) {
			console.log('--------------payok------------')
			console.log(res)
			// #ifdef MP-ALIPAY
			if(res.resultCode == 6001){
				var str = JSON.stringify(err)
				me._payFail();
				return;
			}
			// #endif
			
			uni.showToast({
				title: '支付成功！',
				duration: 1000,
				icon: 'none'
			})
			me.$store.state.payRes = me.order_list
			me.pay_display = false
			uni.showToast({
				title: '上交押金成功！',
				duration: 1000,
				icon: 'none'
			})
			uni.redirectTo({
				url: './bidding_detailed_Two?mark=1&detail_one=1',
				
			})
			return false
		},
		fail: function(err) {
			console.log('--------------payfail------------')
			console.log(err)
			var str = JSON.stringify(err)
			me._payFail();
		}
	});
	// #endif
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
	    success: function(res) {
	    	console.log('--------------payok------------')
	    	console.log(res)
	    	// #ifdef MP-ALIPAY
	    	if(res.resultCode == 6001){
	    		var str = JSON.stringify(err)
	    		me._payFail();
	    		return;
	    	}
	    	// #endif
	    	
	    	uni.showToast({
	    		title: '支付成功！',
	    		duration: 1000,
	    		icon: 'none'
	    	})
	    	me.$store.state.payRes = me.order_list
	    	me.pay_display = false
	    	uni.showToast({
	    		title: '上交押金成功！',
	    		duration: 1000,
	    		icon: 'none'
	    	})
	    	uni.redirectTo({
	    		url: './bidding_detailed_Two?mark=1&detail_one=1',
	    		
	    	})
	    	return false
	    },
	    fail: function(err) {
	    	console.log('--------------payfail------------')
	    	console.log(err)
	    	var str = JSON.stringify(err)
	    	me._payFail();
	    }
	});
	// #endif
}

///支付失败提示处理
export function lkt_payFail(me) {
	console.log('防止重复点击')
	console.log(me.qd_flag)
	me.qd_flag=true
	uni.showModal({
		title: '提示',
		content: '支付失败',
		success: function(res) {
			me.firstFlag = true
			// #ifdef H5
			var url = uni.getStorageSync("h5_url") + "pages/order/myOrder?status=1";
			if (res.cancel) {
				url = uni.getStorageSync("h5_url") + "pages/tabBar/home";
			}

			if (res.confirm) {

				console.log(1)
			} else if (res.cancel) {

				console.log(2)
			}
			// #endif
			// #ifndef H5

			me.$store.state.payRes = me.order_list
			if (res.confirm) {

				console.log(3)
			} else if (res.cancel) {

				console.log(4)
			}
			// #endif
		}
	})
}

//支付方式选择确定
export function lkt_click(me) {
	//去支付保证金
	if (me.form_type == 1) {
		// if (me.bind_st == 1 && me.state == 1) {
		if (me.wx_flag == true && me.ye_flag == false) {
			if (me.passwd_status == 1) {
				// 							setTimeout(function(){
				// 								me.pay_display = true
				// 							},1000)
				me.pay_display = true
			} else {
				me.password_display = true
			}

		} else {
			// var type = "wx";
			// if(!me.zfb_flag){
			// 	type = "aliPay";
			// }
			var type = "";
			if (!me.zfb_flag) {
				type = "aliPay";
				//#ifdef MP-TOUTIAO
				type = 'tt_alipay' ;
				// #endif
				// #ifdef MP-ALIPAY
				type = 'alipay_minipay';
				// #endif
			} else {
				//#ifdef MP-WEIXIN
				type = "mini_wechat";
				//#endif

				//#ifdef APP-PLUS
				type = "app_wechat";
				//#endif

				//#ifdef H5
				type = "jsapi_wechat";
				//#endif
				
				// #ifdef MP-BAIDU
				type = 'baidu_pay';
				// #endif
			}
			var data = {
				module: "app",
				action: "auction",
				m: "go_pay",
				password: me.msg,
				id: me.bindding_id,
				access_id: me.access_id,
				type: type
			}
			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {

					me.sNos = res.data.sNo
					me.titles = res.data.title
					me.totals = res.data.total
					// #ifdef MP-WEIXIN
					me.weixinPay()
					// #endif
					//#ifndef MP-WEIXIN
					if (!me.zfb_flag) {
						me.pay_wx('ali')
					} else if (!me.wx_flag) {
						me.pay_wx('wx')
					} else if (!me.daidu_flag) {
						me.pay_wx('baidu')
					}
					// #endif
				},
				error: function(err) {
					console.log(err)
				}
			})
			// }
		}
		me.bid_pup = false
	}
	//去出价
	else {
		var bid_value = parseFloat(me.bid_value)
		var money_s = parseFloat(me.money_s)
		if (bid_value == "" || bid_value < money_s) {
			uni.showToast({
				title: "请输入正确的金额",
				duration: 1000,
				icon: 'none'
			})
		} else {
			var data = {
				module: "app",
				action: "auction",
				m: "bid",
				price: bid_value,
				id: me.bindding_id,
				access_id: me.access_id
			}

			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: function(res) {
					if (res.data.info == "更新加价成功！") {
						//me._axios()
						me.bid_pup = false
						me.bind_promise(1)
					} else {
						uni.showToast({
							title: "出价失败",
							duration: 1000,
							icon: 'none'
						})
					}
				},
				error: function(err) {
					console.log(err)
				}
			})
		}
	}
}

//转换开始,结束时间的格式
export function lkt_changeTimeStyle(me) {

	console.log('order--------------')
	console.log(me.order)
	var start = new Date(me.order.starttime);
	var end = new Date(me.order.endtime);
	console.log(start, end)
	var startM = parseInt(start.getMonth()) + 1;
	var startD = parseInt(start.getDate())
	var startH = parseInt(start.getHours())
	var startF = parseInt(start.getMinutes())

	var endM = parseInt(end.getMonth()) + 1
	var endD = parseInt(end.getDate())
	var endH = parseInt(end.getHours())
	if (endH < 10) endH = '0' + endH
	var endF = parseInt(end.getMinutes())





	if (startH == 0) {
		startH = "00"
	}
	if (startF == 0) {
		startF = "00"
	}
	if (endH == 0) {
		endH = "00"
	}
	if (endF == 0) {
		endF = "00"
	}

	me.startTime = startM + "月" + startD + "日" + " " + startH + ":" + startF
	me.endTime = endM + "月" + endD + "日" + " " + endH + ":" + endF
}

//时间格式化输出
export function lkt_dateformat(micro_second, that) {
	// 总秒数
	var second = micro_second;
	// 天数
	var day = Math.floor(second / 3600 / 24);
	var dayStr = day.toString();
	if(dayStr.length == 1) dayStr = '0' + dayStr;
	// 小时
	var hr = Math.floor(second / 3600 % 24);
	var hrStr = hr.toString();
	if (hrStr.length == 1) hrStr = '0' + hrStr;

	// 分钟
	var min = Math.floor(second / 60 % 60);
	var minStr = min.toString();
	if (minStr.length == 1) minStr = '0' + minStr;

	// 秒
	var sec = Math.floor(second % 60);
	var secStr = sec.toString();
	if (secStr.length == 1) secStr = '0' + secStr;
	return {day: dayStr,hour: hrStr,minute: minStr,second: secStr}
}
