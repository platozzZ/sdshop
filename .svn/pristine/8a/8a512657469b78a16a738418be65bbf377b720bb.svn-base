//加载数据
export function _axios(that) {
	var me = that
	var data = {
		module: 'app',
		action: 'groupbuy',
		m: 'payfor',
		access_id: me.access_id,
		address_id: me.address_id,
		price: me.price
	}

	var product = JSON.parse(me.cpId);
	data = Object.assign(data, product); //合并
	
	uni.request({
		data,
		url: uni.getStorageSync("url"),
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: (res) => {
			if (res.data.code == 404) {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
				return
			}
			me.load = false

			res = res.data
			console.log(res);
			me.adds_f = res.is_add
			me.address = res.buymsg
			me.groupres = res.groupres
			me.can_pay_ = res.can_pay
			me.mch_data = res.mch_data
			me.mch_name = res.mch_data.name
			me.mch_id = res.mch_data.id
			me.payment = res.payment
			me.pro = res.proattr
			console.log('me.pro');
			console.log(me.pro);
			if (me.$store.state.address_id_def == "") {
				console.log("默认赋值");
				me.$store.state.address_id_def = res.buymsg.id
			}
			
			me.grade_rate = res.grade_rate
			console.log("grade_rate:" + me.grade_rate);
			console.log("price:" + me.price);
			me.price = me.price * me.grade_rate
			me.user_money = res.money
			me.user_name = res.user_name
			me.product = product
			me.yunfei = res.yunfei
			me.total = product.price * product.num * me.grade_rate + parseFloat(me.yunfei);
			me.total = me.total.toFixed(2)
			me.num = product.num
			me.price = product.price
			me.groupman = product.groupnum
			me.password_status = res.password_status

			if (me.user_money > me.total) {
				me.pay_index = 0
				me.pay_style = 1
			} else {
				me.pay_index = 1
				me.pay_style = 2
			}
			me.isshow();
		},
		error: function(err) {
			console.log(err)
		}
	})
}

//获取h5支付code
export function toUrl(that) {
	var me = that
	var locationUrl = window.location.href
	var data = {
		type: 'jsapi_wechat',
		access_id: me.access_id,
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
			console.log("====")
			console.log(res)
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
			console.log(err)
		},
	})
}

export function payThree(that) {
	var me = that
	if (me.useWallte) {
		
		if (me.wxPayStatue) {
			console.log('me.pay_wx()-------------');
			me.pay_wx()

		} else {
			uni.showToast({
				title: "请选择支付方式！",
				duration: 1000,
				icon: 'none'
			});
			me.firstFlag = true;
		}
	} else {
		
		if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {
			var pay_type;
			if (me.wxPayStatue) {
				pay_type = 'app_wechat'
			} else if (me.aliPayStatue) {
				pay_type = 'aliPay'
			} else if (me.baidupayStatue) {
				pay_type = 'baidu_pay'
			}
			me._createNotPay(pay_type, false, true)
		} else {
			me.firstFlag = true;
			uni.showToast({
				title: "请选择支付方式！",
				duration: 1000,
				icon: 'none'
			})
		}
	}
}

// 选择支付的方式(微信支付,支付宝支付)
export function chooseWay(way, that) {
  var me = that
  if (way == 'wxPay') {
    if (!me.wxPayStatue) {
      me.wxPayStatue = true
      me.aliPayStatue = false
      me.baidupayStatue = false
      me.useWallte = false
    } else {
      me.wxPayStatue = false
    }
  } else if (way == 'aliPay') {
    if (!me.aliPayStatue) {
      me.aliPayStatue = true
      me.wxPayStatue = false
      me.baidupayStatue = false
      me.useWallte = false
    } else {
      me.aliPayStatue = false
    }
  } else if (way == 'baidu') {
    if (!me.baidupayStatue) {
      me.baidupayStatue = true
      me.wxPayStatue = false
      me.aliPayStatue = false
      me.useWallte = false
    } else {
      me.baidupayStatue = false
    }
  } else if (way == 'balance') {
    if (!me.useWallte) {
      me.useWallte = true
      me.wxPayStatue = false
      me.aliPayStatue = false
    } else {
      me.useWallte = false
    }
  }
}

// 选择用余额支付
export function switchChange(e, that) {
	
	var me = that
	me.no_change = false
	
	// #ifdef MP-BAIDU
	me.useWallte = e.detail.checked
	// #endif
	
	// #ifndef MP-BAIDU
	me.useWallte = e.detail.value
	// #endif
	
	
	if (!me.useWallte) {
		me.value = ''
		me.needpay = ''
		
	} else {
		
		if (Number(me.total) >= Number(me.user_money)) {
			me.value = me.user_money
			let ndp = (me.total - me.user_money).toFixed(2)
			me.needpay = ndp

		} else {
			me.value = me.total
			me.needpay = 0
		}
		
	}
}

export function getOrderInfo(type, that) {

	console.log('=====getOrderInfo' + type);
	var me = that
	// const appid = plus.runtime.appid;
	const appid = "wxf6e29bcc719cf499"
	let data = {
		access_id: me.access_id,
		sNo: me.sNo,
		title: me.pro.pro_name,
		module: 'app',
		action: 'pay',
		type: 'app_wechat',
		total: me.price1,
	}
	console.log("getOrderInfo==type=" + type)

	// #ifdef H5
	if (type == 'wx') {
		data.type = 'jsapi_wechat'
		data.code = me.code
	} else if (type == 'ali') {
		data.type = 'alipay_mobile'
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
	}
	// #endif

	console.log('getorderinfo---------------------data');
	console.log(JSON.stringify(data));
	return new Promise((res) => {
		uni.request({
			url: uni.getStorageSync("url"),
			data,
			success: (result) => {
				if (result.statusCode == 200) {
					// #ifndef MP-ALIPAY
					res(result);
					// #endif

					// #ifdef MP-ALIPAY
					let tno = result.data;
					res(tno.substr(1, tno.length));
					// #endif
				} else {
					uni.showToast({
						title: result.data.message,
						duration: 1500,
						icon: 'none'
					});
				}
				// console.log("======================result");
				// console.log(JSON.stringify(result));
				// console.log('res(result)------success');
				// console.log(JSON.stringify(res(result)));
				// res(result);
			},
			fail: (e) => {
				// #ifndef MP-ALIPAY
				res(e);
				// #endif

				// #ifdef MP-ALIPAY
				let tno = e.data;
				res(tno.substr((tno.indexOf("s") + 1), (tno.length - 4)));
				// #endif
			}
		})
	})
}

export function weixinPay(that) {
	console.log("--------------weixinPay");
	var me = that
	me.loading = true;
	uni.login({
		provider: 'weixin',
		success: (e) => {
			var data = {
				code: e.code,
				sNo: me.sNo,
				title: me.pro.pro_name,
				type: 'mini_wechat',
				access_id: me.access_id,
				total: me.price1,
				module: 'app',
				action: 'pay',
			}
			uni.request({
				url: uni.getStorageSync("url"),
				data,
				success: (res) => {
					if (res.data.code == 404) {
						me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
						return
					}
					if (res.statusCode == 200) {
						let paymentData = res.data;
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: paymentData.timeStamp,
							nonceStr: paymentData.nonceStr,
							package: paymentData.package,
							signType: 'MD5',
							paySign: paymentData.paySign,
							success: (res) => {
								uni.hideLoading();
								var dat_id = me.order_id ? me.order_id : me.or_id
								console.log(me.total, me.sNo, dat_id)
								uni.showToast({
									title: '支付成功！',
									duration: 1000,
									icon: 'none'
								})
								setTimeout(function() {
									console.log('jump1');
									uni.redirectTo({
										url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=1&cc=1'
									})
									me.pay_display = false
								}, 1000)
							},
							fail: (res) => {
								uni.hideLoading();
								uni.showModal({
									title: '提示',
									content: '支付失败,可在订单列表中查看',
									success: function(res) {
										if (res.confirm) {
											uni.redirectTo({
												url: './groupOrder?isPay=1'
											})
										} else if (res.cancel) {
											uni.switchTab({
												url: '../../pages/tabBar/home'
											})
										}
									}
								})
							},
							complete: () => {
								me.loading = false;
								uni.hideLoading();
							}
						})
					} else {
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '支付失败,可在订单列表中查看',
							success: function(res) {
								if (res.confirm) {
									uni.redirectTo({
										url: './groupOrder?isPay=1'
									})
								} else if (res.cancel) {
									uni.switchTab({
										url: '../../pages/tabBar/home'
									})
								}
							}
						});
					}
				},
				fail: (e) => {
					console.log("fail", e);
					me.loading = false;
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: '支付失败,查看订单详情11',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: './groupOrder?isPay=1'
								})
							} else if (res.cancel) {
								uni.switchTab({
									url: '../../pages/tabBar/home'
								})
							}
						}
					})
				}
			})
		},
		fail: (e) => {
			uni.hideLoading();
			console.log("fail", e);
			me.loading = false;
			uni.showModal({
				title: '提示',
				content: '支付失败,查看订单详情',
				success: function(res) {
					if (res.confirm) {
						uni.redirectTo({
							url: './groupOrder?isPay=1'
						})
					} else if (res.cancel) {
						uni.switchTab({
							url: '../../pages/tabBar/home'
						})
					}
				}
			})
		}
	})
}

///支付失败
export function _payFail(that) {
	let me = that;
	uni.hideLoading();
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
			// me.pay_display = false
			me.$store.state.payRes = me.order_list
			if (res.confirm) {
				uni.redirectTo({
					url: '../../pages/order/myOrder'
				});
			} else if (res.cancel) {
				uni.switchTab({
					url: '../../pages/tabBar/home'
				});
			}
			// #endif
		}
	})
}

//是否已经选择支付方式
export function _gotPayType(that) {
	var me = that;
	
	console.log("me.useWallte:" + me.useWallte);
	console.log("me.wxPayStatue:" + me.wxPayStatue);
	console.log("me.aliPayStatue:" + me.aliPayStatue);
	if (!me.useWallte && !me.wxPayStatue && !me.aliPayStatue && !me.baidupayStatue) {
		uni.showToast({
			title: "请选择支付方式！",
			duration: 1000,
			icon: 'none'
		})
		
		me.firstFlag = false;
		
	} else {
		me.firstFlag = true;
	}
}

//点击  立即支付
export function _pay_style(that) {
	
	var me = that
	
	if (me.can_pay) {
		console.log('click')
		me.can_pay = false
		setTimeout(function() {
			me.can_pay = true
		}, 1500)
	} else {
		return false
	}
	
	if (!me.can_pay_) {
		uni.showToast({
			title: '你已经参加过这个团',
			duration: 1000,
			icon: 'none'
		})
		return false
	}
	
	
	me._gotPayType();

	if (!me.firstFlag) {
		return;
	}

	if (!me.value) {
		me.value = 0
	}
	
	me.price1 = me.total - Number(me.value)
	me.price1 = me.price1.toFixed(2)
	
	console.log(me.pro.have)
	
	if (Number(me.pro.have) >= Number(me.groupres.groupnum)) {
		uni.showToast({
			title: '最多只能同时拼' + me.groupres.groupnum + '个团',
			duration: 1000,
			icon: 'none'
		})
		return false;
	}
	console.log("提交订单");

	// 提交订单
	if (me.adds_f == 1) {
		if (me.useWallte) { //钱包支付
			if (me.password_status == 0) {
				uni.showModal({
					title: '提示',
					content: '请先设置支付密码',
					showCancel: true,
					success: function(resM) {
						me.firstFlag = true;
						if (resM.confirm) {
							uni.navigateTo({
								url: '../../pagesB/setUp/payment'
							});
						}
					}
				})
			}else if (Number(me.user_money) < Number(me.total)) {
				uni.showToast({
					title: '余额不足，请选择其它支付方式',
					icon: 'none',
					duration: 1500
				})
			} else {
				if (me.price1 > 0) { //其他方式抵扣
					if (Number(me.value) == 0) {

						// #ifdef MP-WEIXIN
						me.weixinPay()
						console.log('wx33333');
						// #endif
						// #ifndef MP-WEIXIN
						me.showPayWay = true
						// #endif
					} else {
						if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {
							
							me.pay_display = true
							
						} else {
							me.firstFlag = true
							uni.showToast({
								title: '余额不足，请选择其它支付方式',
								icon: 'none',
								duration: 1500
							})
						}
					}
				} else { //余额支付
					me.pay_display = true
				}
			}
		} else {
			uni.showLoading({
				title: '正在请求支付...'
			})
			//支付宝或微信支付--创建订单
			// #ifdef MP-WEIXIN				
			me._createNotPay('mini_wechat')
			// #endif
			
			// #ifdef MP-ALIPAY				
			me._createNotPay('alipay_minipay')
			// #endif
			
			// #ifndef MP-WEIXIN || MP-ALIPAY	
			//me.showPayWay=true
			me.payThree();
			// #endif
			
		}
	} else {
		uni.showToast({
			title: "请完善收货地址！",
			duration: 1000,
			icon: 'none'
		})
	}
}
//支付密码框确认
export function _confirm(payNum, that) {
	
	var me = that
	//console.log(me.fastTap,11,me.address_id)
	if (!me.fastTap) {
		return
	}
	
	me.fastTap = false

	if (me.enterless) {
		
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
					if (res.data.code == 404) {
						me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
						return
					}
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
						var pay_type = '';
						if (me.wxPayStatue) {
							// #ifdef MP-WEIXIN
							pay_type = 'mini_wechat'
							// #endif
							//#ifndef MP-WEIXIN
							pay_type = 'app_wechat'
							// #endif
						} else if (me.aliPayStatue) {
							pay_type = 'aliPay'
						} else if (me.baidupayStatue) {
							// #ifdef MP-BAIDU
							pay_type = 'baidu_pay'
							// #endif
						}
						me._createNotPay(pay_type, true)
					} else if (enterless) {
						
						me.msg = '';
						
						uni.showToast({
							title: '您输入密码错误,请重新输入',
							duration: 1000,
							icon: 'none'
						})
						me.enterless = enterless
						me.fastTap = true
					} else if (!enterless) {
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
					console.log(err)
					uni.showToast({
						title: '网络错误，请稍后再试',
						duration: 1000,
						icon: 'none'
					})
					me.pay_display = false;
					me.fastTap = true
				}
			})
		} else {
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

//支付创建订单
export function _createNotPay(pay_type, iswallet, threepay = false, that) {
	//创建未付款订单
	var me = that
	if(me.address_id == ''){
		console.log(me.address_id);
		console.log("123123");
		me.address_id = me.$store.state.address_id_def
		console.log(me.address_id);
	}
	console.log('_createNotPay');
	console.log(me.activity_no);
	var data = {
		module: 'app',
		action: 'groupbuy',
		m: 'createOrder',
		access_id: me.access_id,
		pro_id: me.product.pid,
		num: me.product.num, //购买数量
		man_num: me.product.groupnum, //拼团人数
		activity_no: me.product.activity_no, //活动编号
		platform_activities_id: me.product.platform_activities_id,
		frompage: me.product.frompage, //开团还是参团
		sizeid: me.product.cid, //商品规格id
		address_id:me.address_id,//地址id 

		// price: me.total, //付款金额1
		// ptgoods_name: me.pro.pro_name, //商品名称1
		// d_price: me.product.price, //单价1
		// name: me.address.name, //收件人姓名1
		// sheng: me.address.sheng, //省1
		// shi: me.address.city, //市1
		// quyu: me.address.quyu, //县1
		// address: me.address.address_xq, //收货人地址1
		// tel: me.address.tel, //收货人电话1
		// yunfei: me.yunfei, //运费1
		// grade_rate: me.grade_rate, //会员优惠1
	}
	data.pay_type = pay_type
	data.store_type = pay_type == 'mini_wechat' ? 1 : 2;

	if (me.product.frompage == 'cantuan') {
		data.ptcode = me.product.ptcode
	} else {
		data.ptcode = ''
	}
	uni.request({ //创建订单
		data,
		url: uni.getStorageSync("url"),
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: (res1) => {
			if (res1.data.code == 404) {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
				return
			}
			var res1 = res1.data;
			if (res1.status == 1) {
				me.sNo = res1.order
				me.order_id = res1.order_id
				if (iswallet) { //如果是余额支付创建的订单
					me._payAxios()
				} else if (threepay == 'cancel') {
					uni.showModal({
						title: '提示',
						content: '支付失败,查看订单详情',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '../../pages/order/myOrder'
								})
							} else if (res.cancel) {
								uni.switchTab({
									url: '../../pages/tabBar/home'
								})
							}
						}
					});
				}
				// me.pay_display=true
				else {
					me.run_weixinPay()
				}

			} else if (res1.status == 118) {
				uni.showModal({
					title: '提示',
					content: res1.msg,
					success: function(res) {
						if (res.confirm) {
							var path = '../../pages/order/order?order_id=' + res1.order_id + '&showPay=true'
							// #ifdef H5
							console.log('h5');
							path = '../../pages/order/order?order_id=' + res1.order_id + '&showPay=true&_store=h5';
							// #endif
							uni.redirectTo({
								url: path
							})
						} else if (res.cancel) {
							uni.switchTab({
								url: '../../pages/tabBar/home'
							})
						}
					}
				});
			} else {
				uni.showToast({
					title: res1.msg,
					duration: 1000,
					icon: 'none'
				})
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
		},
		error: function(err) {
			uni.showToast({
				title: "创建订单失败,请稍后再试!",
				duration: 1000,
				icon: 'none'
			})
			setTimeout(function() {
				uni.navigateBack({
					delta: 1
				})
			}, 1000)
		}
	})
}

//余额支付请求
export function _payAxios(type, that) {
	var me = that
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
		orde_id: me.order_id ? me.order_id : me.or_id,
		//address_id: me.address_id ? me.address_id : me.addre_id,
		sNo: me.sNo,
		pro_id: me.product.pid,
		man_num: me.product.groupnum, //拼团人数
		grade_rate: me.grade_rate, //会员折扣
		page: me.product.frompage //开团还是参团
	}
	data.payment_money = me.value
	if (me.product.frompage == 'cantuan') {
		data.ptcode = me.product.ptcode
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
			uni.hideLoading();
			if (res.data.code == 404) {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
				return
			}
			let {
				data: {
					code,
					message,
					ptcode
				}
			} = res
			if (code == 200) {
				if (Number(me.price1) > 0) {
					// #ifdef MP-WEIXIN
					me.weixinPay()
					console.log('wx222222');
					// #endif
					//#ifndef MP-WEIXIN				
					me.showPayWay = true
					if (me.wxPayStatue) {
						me.pay_wx('wx')
					} else if (me.aliPayStatue) {
						me.pay_wx('ali')
					} else if (me.baidupayStatue) {
						me.pay_wx('baidu_pay')
					}
					// #endif
				} else {
					var dat_id = me.order_id ? me.order_id : me.or_id
					
					uni.showToast({
						title: '支付成功！',
						duration: 1000,
						icon: 'none'
					})
					setTimeout(function() {

						if (me.product.frompage == 'cantuan') {
							console.log('this\' cantuan');
							// #ifndef MP-WEIXIN
							uni.redirectTo({
								url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=2&otype=cantuan&cc=2'
							})
							// #endif
							// #ifdef MP-WEIXIN
							uni.navigateBack({
								url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=2&otype=cantuan&cc=3'
							})
							// #endif

						} else {
							uni.redirectTo({
								url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=1&cc=4'
							})
						}

						me.pay_display = false
					}, 1000)
				}
			} else if (code == 112) {
				me.pay_display = false
				me.msg = ""
				uni.showModal({
					title: '提示',
					content: '支付失败,订单已生成，可以在订单列表中查看',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../../pages/order/myOrder'
							})
						}
					}
				})
			} else {
				me.pay_display = false
				me.msg = ""
				uni.showModal({
					title: '提示',
					content: '网络繁忙，支付失败  订单已生成，可以在订单列表中查看',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../../pages/tabBar/home'
							})
						}
					}
				})
			}
		},
		error: function(err) {
			uni.hideLoading();
			console.log(err)
			me.fastTap = true
		},
		fail:function(res){
			// #ifdef MP-ALIPAY
			if (res.data.indexOf("200") != -1) {
				if (Number(me.price1) > 0) {
					// #ifdef MP-WEIXIN
					me.weixinPay()
					console.log('wx222222');
					// #endif
					//#ifndef MP-WEIXIN				
					me.showPayWay = true
					if (me.wxPayStatue) {
						me.pay_wx('wx')
					} else if (me.aliPayStatue) {
						me.pay_wx('ali')
					} else if (me.baidupayStatue) {
						me.pay_wx('baidu_pay')
					}
					// #endif
				} else {
					var dat_id = me.order_id ? me.order_id : me.or_id
					uni.showToast({
						title: '支付成功！',
						duration: 1000,
						icon: 'none'
					})
					setTimeout(function() {
						if (me.product.frompage == 'cantuan') {
							// #ifndef MP-WEIXIN
							uni.redirectTo({
								url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=2&otype=cantuan&cc=5'
							})
							// #endif
							// #ifdef MP-WEIXIN
							uni.navigateBack({
								url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=2&otype=cantuan&cc=6'
							})
							// #endif
			
						} else {
							uni.redirectTo({
								url: '../group/group_end?sNo=' + me.sNo + '&activity_no='+me.product.activity_no+'&returnR=1&cc=7'
							})
						}
			
						me.pay_display = false
					}, 1000)
				}
			} else if (res.data.indexOf("112") != -1) {
				me.pay_display = false
				me.msg = ""
				uni.showModal({
					title: '提示',
					content: '支付失败,订单已生成，可以在订单列表中查看',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../../pages/order/myOrder'
							})
						}
					}
				})
			} else {
				me.pay_display = false
				me.msg = ""
				uni.showModal({
					title: '提示',
					content: '网络繁忙，支付失败  订单已生成，可以在订单列表中查看',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '../../pages/tabBar/home'
							})
						}
					}
				})
			}
			// #endif
		}
	})
}

export function changeValue(newValue, oldValue, that) {
	var me = that
	me.$nextTick(function() {
		me.price1 = me.total - me.value
		me.price1 = Number(me.price1).toFixed(2)
		if (Number(me.value) > me.total) { //输入金额大于商品金额
			console.log(Number(me.total));
			console.log(Number(me.user_money));
			if (Number(me.total) <= Number(me.user_money)) {
				me.value = me.total
				console.log('val5');

			} else {
				me.value = me.user_money
				me.needpay = me.total - me.user_money
				console.log('val3');
				console.log(me.needpay);
			}
			uni.showToast({
				title: '已超过最大金额',
				icon: 'none',
				duration: 1500
			})
		} else if (Number(me.value) < me.total) { //输入金额小于商品金额
			if (Number(me.value) > me.user_money) {
				me.value = me.user_money
				uni.showToast({
					title: '已超过最大金额',
					icon: 'none',
					duration: 1500
				})
			}
		}

		if (Math.abs(newValue - oldValue) == 0) {
			var x = String(newValue).indexOf('.') + 1;
			var y = String(newValue).length - x;
			if (y > 2 && x != 0) {
				me.value = Number(newValue).toFixed(2)
				console.log('val1');
			}
		} else if (Math.abs(newValue - oldValue) < 0.009999999999) {
			me.value = Number(me.value).toFixed(2)
			console.log('val2');

		}
	})
}
