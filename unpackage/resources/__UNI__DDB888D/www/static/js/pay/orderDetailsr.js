/**
 * @param {Object} fromPage
 * 使用余额
 */
export function laikeUseyue(fromPage) {
	var me = fromPage;
	if (me.pay_name == 'jp') {
		let needpay = parseFloat(me.jp_zong - me.value).toFixed(2)
		console.log("me.needpay=================5");
		console.log(me.needpay);
		if (needpay > 0) {
			me.needpay = needpay
			console.log("me.needpay=================6");
			console.log(me.needpay);
		} else {
			me.needpay = 0
			console.log("me.needpay=================7");
			console.log(me.needpay);
		}
	} else if (me.bargain) {
		let needpay = parseFloat(me.products_total + me.freight - me.value).toFixed(2)
		if (needpay > 0) {
			me.needpay = needpay
			console.log("me.needpay=================8");
			console.log(me.needpay);
		} else {
			me.needpay = 0
			console.log("me.needpay=================9");
			console.log(me.needpay);
		}
	} else {
		console.log(me.coupon_name);
		// let needpay = parseFloat(me.products_total * me.discount*me.grade_rate + me.freight - me.coupon_name - me.reduce_money - me.value).toFixed(2)
		let needpay = parseFloat((me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate + me.freight -
			me.value).toFixed(2)
		if (needpay > 0) {
			me.needpay = needpay
			console.log("me.needpay=================10");
			console.log(me.needpay);
		} else {
			me.needpay = 0
			console.log("me.needpay=================11");
			console.log(me.needpay);
		}
	}
}

/**
 * 支付
 * @param {Object} fromPage
 */
export function laikePayThree(fromPage) {
	var me = fromPage;
	if (me.useWallte) {
		if (me.wxPayStatue) {
			me.pay_wx()
		} else {
			uni.showToast({
				title: "请选择支付方式！",
				duration: 1000,
				icon: 'none'
			})
			me.firstFlag = true;
		}
	} else {
		if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {
			console.log("jcex3===============");
			if (me.pay_name == "jp") {
				var data = {
					module: 'app',
					action: 'order',
					app: 'payment',
					access_id: me.access_id,
					address_id: me.address_id,
					type: "JP",
					auction_id: me.bind_id,
					coupon_id: me.coupon_id
				}
				if (me.cpId) {
					data.product = me.cpId
					data.cart_id = "";
				}
			} else if (me.otype == "MS") {
				let cruitem = JSON.parse(me.cpId)[3]
				var data = {
					module: 'app',
					action: 'order',
					app: 'payment',
					type: "MS",
					cart_id: me.cart_id,
					access_id: me.access_id,
					address_id: me.address_id,
					coupon_id: me.coupon_id,
					activity_id: me.activity_id, //秒杀活动id
					time_id: me.time_id, //时段id
					sec_id: cruitem.sec_id
				}
				if (me.cpId) {
					data.product = me.cpId
					data.cart_id = "";
				}
			} else if (me.bargain) {
				var data = {
					module: 'app',
					action: 'order',
					app: 'payment',
					type: "KJ",
					cart_id: me.cart_id,
					access_id: me.access_id,
					address_id: me.address_id,
					bargain_id: me.bargain_id,
					bargain_order_no: me.order_no
				}
				if (me.cpId) {
					data.product = me.cpId
					data.cart_id = "";
				}
			} else {
				var data = {
					module: 'app',
					action: 'order',
					app: 'payment',
					cart_id: me.cart_id,
					access_id: me.access_id,
					address_id: me.address_id,
					coupon_id: me.coupon_id,
				}
				if (me.cpId) {
					data.product = me.cpId
					data.cart_id = "";
				}
			}
			if (me.wxPayStatue) {
				// #ifdef MP-WEIXIN
				data.pay_type = 'mini_wechat'
				data.store_type = 1
				// #endif
				//#ifdef APP-PLUS
				data.pay_type = 'app_wechat'
				data.store_type = 2
				// #endif
				//#ifdef H5
				data.pay_type = 'jsapi_wechat'
				data.store_type = 2
				// #endif
			} else if (me.aliPayStatue) {
				// #ifdef MP-ALIPAY
				data.pay_type = 'alipay_minipay'
				data.store_type = 1
				// #endif
				//#ifdef APP-PLUS
				data.pay_type = 'aliPay'
				data.store_type = 2
				// #endif
				//#ifdef MP-TOUTIAO
				data.pay_type = 'tt_alipay';
				data.store_type = 1;
				me.tt_alipay_app = true;
				// #endif
			} else if (me.baidupayStatue) {
				// #ifdef MP-BAIDU
				data.pay_type = 'baidu_pay';
				data.store_type = 1;
				// #endif
			}
			if (me.afhalen_translateX > 5) {
				if (me.shop_address_id == '') {
					uni.showToast({
						title: "请选择门店！",
						duration: 1000,
						icon: 'none'
					})
					me.firstFlag = true;
				} else {
					data.shop_address_id = me.shop_address_id
				}
			}
			uni.request({ //创建订单
				data,
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res1) => { //支付
					console.log(res1);
					let {
						data: {
							status,
							data
						}
					} = res1;
					me.order_list = JSON.stringify(data)
					if (status == 0) {
						uni.showToast({
							title: res1.data.err,
							duration: 1500,
							icon: 'none'
						});
						return;
					}

					if (status == 1) {
						me.sNo = res1.data.data.sNo
						me.price1 = res1.data.data.total
						me.order_id = res1.data.data.order_id
						if (me.wxPayStatue) {
							me.pay_wx('wx')
						} else if (me.aliPayStatue) {
							me.pay_wx('ali')
						} else if (me.baidupayStatue) {
							me.pay_wx('baidu_pay')
						}
					}
				},
				error: function(err) {
					uni.hideLoading()
					me.firstFlag = true
					uni.showToast({
						title: "创建订单失败,请稍后再试!",
						duration: 1500,
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}
			})
		} else {
			uni.showToast({
				title: "请选择支付方式！",
				duration: 1000,
				icon: 'none'
			})
			me.firstFlag = true;
		}
	}
}


/**
 * 选择支付方式
 * @param {Object} fromPage
 * @param {Object} way
 */
export function laikeChooseWay(fromPage, way) {
	console.log("======laikeChooseWay======");
	uni.getProvider({
		service: 'payment',
		success: (res) => {
			console.log(res);
		}
	})
	var me = fromPage;
	
	if (way == 'wxPay') { //微信支付
		if (!me.wxPayStatue) {
			me.useWallte = false
			me.wxPayStatue = true
			me.aliPayStatue = false
			me.baidupayStatue = false
			me.value2 = me.value
			me.value = ''
			// me.needpay = ''
		} else {
			me.wxPayStatue = false
		}
	} else if (way == 'aliPay') { //支付宝支付
		if (!me.aliPayStatue) {
			me.useWallte = false
			me.wxPayStatue = false
			me.aliPayStatue = true
			me.baidupayStatue = false
			me.value2 = me.value
			me.value = ''
			// me.needpay = ''
		} else {
			me.aliPayStatue = false
		}
	} else if (way == 'baidu') { //百度支付
		if (!me.baidupayStatue) {
			me.useWallte = false
			me.wxPayStatue = false
			me.aliPayStatue = false
			me.baidupayStatue = true
			me.value2 = me.value
			me.value = ''
			// me.needpay = ''
		} else {
			me.baidupayStatue = false
		}
	} else if(way == 'balance'){
		if (!me.useWallte) {
			me.useWallte = true
			me.wxPayStatue = false
			me.aliPayStatue = false
			me.baidupayStatue = false
			
			if (me.total >= Number(me.user_money)) {
				me.value = me.user_money
				console.log("me.value=================1");
				console.log(me.value);
				me.needpay = parseFloat(me.total - Number(me.user_money)).toFixed(2)
				console.log("me.needpay=================12");
				console.log(me.needpay);
			} else if (me.bargain) {
				me.value = Number(me.products_total) + Number(me.freight)
				console.log("me.value=================2");
				console.log(me.value);
				me.needpay = 0
				console.log("me.needpay=================13");
				console.log(me.needpay);
			} else {
				me.value = parseFloat((me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate + me.freight)
					.toFixed(2)
				console.log("me.value=================3");
				console.log(me.value);
				let heji = (me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate + me.freight
				me.total = heji
				me.needpay = 0
				console.log("me.needpay=================14");
				console.log(me.needpay);
				if (me.value === '') {
					me.value = me.value2
				}
				if (heji - me.value > 0) {
					me.needpay = heji - me.value
					console.log("me.needpay=================15");
					console.log(me.needpay);
				}
			}
			
		} else {
			me.useWallte = false
		}
	}
	
}

/**
 * 订单详情页面余额支付开关按钮
 * 
 * @param {Object} fromPage
 */
export function laikeSwitchChange(e, fromPage) {

	var me = fromPage;

	if (Number(me.user_money) <= 0) {
		return
	}
	
	me.useWallte = !me.useWallte

	if (!me.useWallte) {
			me.wxPayStatue = false
			me.aliPayStatue = false
			me.baidupayStatue = false
		
		me.value2 = me.value
		me.value = ''
		me.needpay = ''
	} else {
			me.wxPayStatue = false
			me.aliPayStatue = false
			me.baidupayStatue = false
		
		if (me.total >= Number(me.user_money)) {
			me.value = me.user_money
			console.log("me.value=================1");
			console.log(me.value);
			me.needpay = parseFloat(me.total - Number(me.user_money)).toFixed(2)
			console.log("me.needpay=================12");
			console.log(me.needpay);
		} else if (me.bargain) {
			me.value = Number(me.products_total) + Number(me.freight)
			console.log("me.value=================2");
			console.log(me.value);
			me.needpay = 0
			console.log("me.needpay=================13");
			console.log(me.needpay);
		} else {
			me.value = parseFloat((me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate + me.freight)
				.toFixed(2)
			console.log("me.value=================3");
			console.log(me.value);
			let heji = (me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate + me.freight
			me.total = heji
			me.needpay = 0
			console.log("me.needpay=================14");
			console.log(me.needpay);
			if (me.value === '') {
				me.value = me.value2
			}
			if (heji - me.value > 0) {
				me.needpay = heji - me.value
				console.log("me.needpay=================15");
				console.log(me.needpay);
			}
		}
	}
}


/**
 * 
 * @param {Object} fromPage
 * @param {Object} newValue
 * @param {Object} oldValue
 */
export function laikeChangeValue(fromPage, newValue, oldValue) {
	let me = fromPage;
	me.$nextTick(function() {
		me.price1 = (me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate

		console.log('计算price1' + me.products_total + '====' + me.discount + '====' + me.freight + '====' + me.coupon_name +
			'====' + me.reduce_money)
		me.price2 = me.price1.toFixed(2)
		console.log(me.price2);
		if (me.price2 < 0) {
			me.price2 = 0.01 + me.freight
			me.price2 = me.price2.toFixed(2)
			me.price2 = Number(me.price2).toFixed(2)


		} else {
			me.price2 = me.price2 + 0 + me.freight
			me.price2 = Number(me.price2).toFixed(2)

		}
		let should_pay = (me.products_total - me.coupon_name - me.reduce_money) * me.discount * me.grade_rate
		if (should_pay <= 0) {
			should_pay = 0.01 + me.freight
			me.price2 = 0.01 + me.freight
			me.price2 = Number(me.price2).toFixed(2)
			me.value = 0.01 + me.freight
			me.isdx = true
		} else {
			should_pay = should_pay + 0 + me.freight

		}

		console.log(should_pay >= 0);
		console.log('计算should_pay' + me.products_total + '====' + me.discount + '====' + me.freight + '====' + me.coupon_name +
			'====' + me.reduce_money)
		console.log("Number(me.value)");
		console.log(Number(me.value));
		console.log('should_pay------' + should_pay.toFixed(2) + '---Number(me.value)----' + Number(me.value));
		me.price2 = should_pay.toFixed(2)
		if (Number(me.value) > me.user_money) {
			me.value = me.user_money
		}
		if (Number(me.value) > should_pay.toFixed(2)) { //输入金额大于商品金额
			console.log("me.value=================999");
			if (should_pay <= me.user_money) {

				me.value = should_pay.toFixed(2)
				console.log(should_pay);
				console.log("me.value=================4");
				console.log(me.value);

			} else {
				me.value = me.user_money
				console.log("me.value=================6");
				console.log(me.value);
			}
			if (Number(me.value).toFixed(2) > should_pay.toFixed(2) && should_pay.toFixed(2) > 0) {
				console.log('===========是否超过最大金额');
				console.log(Number(me.value));
				console.log(should_pay);
				uni.showToast({
					title: '已超过最大金额',
					icon: 'none',
					duration: 1500
				})
			}
			// 补充：当使用余额大于合计金额时，将还需支付置为0 Number(0).toFixed(2)
		} else if (Number(me.value) < should_pay) { //输入金额小于商品金额
			if (Number(me.value) > me.user_money) { // 当输入金额大于余额的时候
				me.value = me.user_money
				console.log("me.value=================7");
				console.log(me.value);
				uni.showToast({
					title: '已超过最大金额',
					icon: 'none',
					duration: 1500
				})
			}
			// else{
			// 	me.value = should_pay.toFixed(2)
			// }
		}

		// if(Number(me.value) > me.money){
		// 	console.log("me.money===");
		// 	console.log(me.money);
		// }

		if (me.price2 < 0.0099999999) {
			console.log("me.value=================888");
			// me.value=Number(me.value).toFixed(2)
		}
		if (Math.abs(newValue - oldValue) == 0) {
			console.log("me.value=================777");
			var x = String(newValue).indexOf('.') + 1;
			var y = String(newValue).length - x;
			if (y > 2 && x != 0) {
				me.value = Number(newValue).toFixed(2)
				console.log("me.value=================8");
				console.log(me.value);
			}
		} else if (Math.abs(newValue - oldValue) < 0.009999999999) {
			me.value = Number(me.value).toFixed(2)
			console.log("me.value=================9");
			console.log(me.value);
		}
	})
}


/**
 * 立即支付
 * @param {Object} fromPage
 */
export function laikePayAtOnce(fromPage) {
	var me = fromPage
	// if (me.value == 0 && me.useWallte) {
	// 	me.useWallte = false
	// }
	if (me.can_pay) {
		console.log('click')
		me.can_pay = false
		setTimeout(function() {
			me.can_pay = true
		}, 1500)
	} else {
		return false
	}
	
	me._gotPayType();
	
	if (me.firstFlag) {
		me.firstFlag = false
		if (!me.value) {
			me.value = 0
		}
		if (me.bargain || me.seckill) {
			me.price1 = me.products_total + me.freight - Number(me.value)
		} else {
			me.price1 = me.products_total + me.freight - me.coupon_name - Number(me.reduce_money) - Number(me.value)
		}
		me.price1 = me.price1.toFixed(2)
		
		// 提交订单
		if (me.afhalen_translateX > 5) {
			if (me.shop_address_id) {
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
					} else {

						let heji = (Number(me.products_total) - Number(me.coupon_name) - Number(me.reduce_money)) * Number(me.discount) *
							Number(me.grade_rate) + Number(me.freight)
						if (Number(me.needpay) != 0 || Number(heji).toFixed(2) > Number(me.value).toFixed(2)) {
							if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {

							} else {
								uni.showToast({
									title: '金额不足以支付商品价格!',
									icon: 'none',
									duration: 1500
								});
								return false
							}
						}
						if (me.pay_name == "jp") {
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								access_id: me.access_id,
								address_id: me.address_id,
								type: "JP",
								auction_id: me.bind_id,
								coupon_id: me.coupon_id,
								remarks: me.remarks,
							}
						} else if (me.bargain) {
							console.log("me.bargain");
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								cart_id: me.cart_id,
								access_id: me.access_id,
								address_id: me.address_id,
								type: "KJ",
								coupon_id: me.coupon_id,
								bargain_id: me.bargain_id,
								bargain_order_no: me.order_no,
								remarks: me.remarks,
							}
						} else if (me.seckill) {
							console.log("me.seckill");
							let cruitem = JSON.parse(me.cpId)[3]
							if(cruitem){}
							
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								cart_id: me.cart_id,
								access_id: me.access_id,
								address_id: me.address_id,
								type: "MS",
								coupon_id: me.coupon_id,
								bargain_id: "",
								bargain_order_no: "",
								remarks: me.remarks,
								activity_id: me.activity_id, //秒杀活动id
								time_id: me.time_id, //时段id
								platform_activities_id: me.platform_activities_id,
								sec_id: cruitem.sec_id
							}
							
							console.log("1me.activity_id:" + me.activity_id);
							console.log("1me.time_id:" + me.time_id);
						} else {
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								cart_id: me.cart_id,
								access_id: me.access_id,
								address_id: me.address_id,
								coupon_id: me.coupon_id,
								bargain_id: me.bargain_id,
								bargain_order_no: me.order_no,
								remarks: me.remarks,
								shop_address_id: me.shop_address_id
							}
						}

						if (me.cpId) {
							data.product = me.cpId;
							data.cart_id = "";
						}

						if (me.wxPayStatue) {
							// #ifdef MP-WEIXIN
							data.pay_type = 'mini_wechat'
							data.store_type = 1
							// #endif
							//#ifdef APP-PLUS
							data.pay_type = 'app_wechat'
							data.store_type = 2
							// #endif
							//#ifdef H5
							data.pay_type = 'jsapi_wechat'
							data.store_type = 2
							// #endif
						} else if (me.aliPayStatue) {
							data.pay_type = 'aliPay'
						} else if (me.baidupayStatue) {
							data.pay_type = 'baidu_pay'
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
									uni.hideLoading();
									return
								}
								let {
									data: {
										status,
										data
									}
								} = res1
								if (status == 1) { //创建成功
									me.makeOrd = true
									me.sNo = res1.data.data.sNo
									me.order_list = JSON.stringify(data)
								} else {
									me.firstFlag = true
									uni.hideLoading();
									uni.showToast({
										title: "创建订单失败,请稍后再试!",
										duration: 1500,
										icon: 'none'
									})
									setTimeout(function() {
										uni.navigateBack({
											url: '../good/goodsDetailed'
										})
									}, 1500)
								}
							},
						})
						if (me.price1 > 0) { //其他方式抵扣
							console.log('立即支付6');

							let heji = (Number(me.products_total) - Number(me.coupon_name) - Number(me.reduce_money)) * Number(me.discount) *
								Number(me.grade_rate) + Number(me.freight)
							heji = heji.toFixed(2)
							if (Number(me.needpay) != 0 || heji > me.value) {
								if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {
									me.pay_display = true
								} else {
									me.firstFlag = true
									uni.showToast({
										title: '金额不足以支付商品价格!2',
										icon: 'none',
										duration: 1500
									});
									return false
								}
								console.log('立即支付7');
								// #ifdef MP-WEIXIN
								console.log('立即支付9');
								me.pay_display = true
								// #endif
							} else {
								console.log('立即支付8');
								me.pay_display = true
							}
						} else { //余额支付
							me.pay_display = true
						}
					}
				} else {
					//支付宝或微信支付--创建订单
					uni.showLoading({
						title: '正在请求支付...',
						mask: true,
					})
					// #ifdef MP-WEIXIN
					if (me.pay_name == "jp") {
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							access_id: me.access_id,
							address_id: me.address_id,
							type: "JP",
							auction_id: me.bind_id,
							coupon_id: me.coupon_id,
							bargain_order_no: me.order_no
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					} else if (me.bargain) {
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							type: "KJ",
							cart_id: me.cart_id,
							access_id: me.access_id,
							address_id: me.address_id,
							bargain_id: me.bargain_id,
							bargain_order_no: me.order_no
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					} else {
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							cart_id: me.cart_id,
							access_id: me.access_id,
							address_id: me.address_id,
							coupon_id: me.coupon_id,
							bargain_order_no: me.order_no,
							shop_address_id: me.shop_address_id
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					}
					console.log('立即支付3');

					uni.request({ //创建订单
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res1) => { //支付
							let {
								data: {
									status,
									data
								}
							} = res1
							me.order_list = JSON.stringify(data)
							console.log('立即支付22');

							if (status == 1) {
								me.weixinPay()
							} else {
								me.firstFlag = true
								uni.showToast({
									title: "创建订单失败,请稍后再试!",
									duration: 1500,
									icon: 'none'
								})
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
						},
						error: function(err) {
							me.firstFlag = true
							uni.showToast({
								title: "创建订单失败,请稍后再试!",
								duration: 1500,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
					// #endif
					// #ifndef MP-WEIXIN
					// me.showPayWay=true//弹窗
					me.payThree();
					// #endif
				}
			} else {
				uni.showToast({
					title: "请选择门店！",
					duration: 1000,
					icon: 'none'
				})
			}
		} else {
			if (me.adds_f) {
				if (me.useWallte) { //钱包支付
					console.log('立即支付5');
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
					} else {

						let heji = (Number(me.products_total) - Number(me.coupon_name) - Number(me.reduce_money)) * Number(me.discount) *
							Number(me.grade_rate) + Number(me.freight)
						console.log("isdx:" + me.isdx);
						if (me.isdx && me.user_money > 0.01) {
							me.needpay = 0
						}
						console.log(heji);
						console.log(me.needpay);
						console.log(Number(heji).toFixed(2) > Number(me.value).toFixed(2));
						if (Number(me.needpay) != 0 || Number(heji).toFixed(2) > Number(me.value).toFixed(2)) {

							if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {

							} else {
								uni.showToast({
									title: '金额不足以支付商品价格!3',
									icon: 'none',
									duration: 1500
								});
								return false
							}
						}
						console.log("jcex2============");
						if (me.pay_name == "jp") {
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								access_id: me.access_id,
								address_id: me.address_id,
								type: "JP",
								auction_id: me.bind_id,
								coupon_id: me.coupon_id,
								remarks: me.remarks,
							}
						} else if (me.bargain) {
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								cart_id: me.cart_id,
								access_id: me.access_id,
								address_id: me.address_id,
								type: "KJ",
								coupon_id: me.coupon_id,
								bargain_id: me.bargain_id,
								bargain_order_no: me.order_no,
								remarks: me.remarks,
							}
						} else if (me.seckill) {
							console.log("me.seckill");
							let cruitem = JSON.parse(me.cpId)[3]
							if(cruitem){}
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								cart_id: me.cart_id,
								access_id: me.access_id,
								address_id: me.address_id,
								type: "MS",
								coupon_id: me.coupon_id,
								bargain_id: "",
								bargain_order_no: "",
								remarks: me.remarks,
								activity_id: me.activity_id, //秒杀活动id
								time_id: me.time_id, //时段id
								platform_activities_id: me.platform_activities_id,
								sec_id: cruitem.sec_id
							}
						} else {
							var data = {
								module: 'app',
								action: 'order',
								app: 'payment',
								cart_id: me.cart_id,
								access_id: me.access_id,
								address_id: me.address_id,
								coupon_id: me.coupon_id,
								bargain_id: me.bargain_id,
								bargain_order_no: me.order_no,
								remarks: me.remarks,
								shop_address_id: me.shop_address_id
							}
						}

						if (me.cpId) {
							data.product = me.cpId;
							data.cart_id = "";
						}

						if (me.wxPayStatue) {
							// #ifdef MP-WEIXIN
							data.pay_type = 'mini_wechat'
							data.store_type = 1
							// #endif
							//#ifdef APP-PLUS
							data.pay_type = 'app_wechat'
							data.store_type = 2
							// #endif
							//#ifdef H5
							data.pay_type = 'jsapi_wechat'
							data.store_type = 2
							// #endif
						} else if (me.aliPayStatue) {
							data.pay_type = 'aliPay'
						} else if (me.baidupayStatue) {
							data.pay_type = 'baidu_pay'
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
									uni.hideLoading();
									return
								}
								let {
									data: {
										status,
										data
									}
								} = res1
								if (status == 1) { //创建成功
									me.makeOrd = true
									me.sNo = res1.data.data.sNo
									me.order_list = JSON.stringify(data)
								} else {
									if (res1.data.redis_name != "" && me.seckill) {
										uni.showToast({
											title: "手速慢了哦，已经就被抢完了!",
											duration: 1500,
											icon: 'none'
										})
										setTimeout(function() {
											uni.navigateBack({
												delta: 2
											})
										}, 1500)
										return false
									}
									me.firstFlag = true
									uni.hideLoading();
									uni.showToast({
										title: "创建订单失败,请稍后再试!",
										duration: 1500,
										icon: 'none'
									})
									setTimeout(function() {
										uni.navigateBack({
											url: '../good/goodsDetailed'
										})
									}, 1500)
								}
							},
						})
						if (me.price1 > 0) { //其他方式抵扣
							console.log('立即支付6');
							let heji = (Number(me.products_total) - Number(me.coupon_name) - Number(me.reduce_money)) * Number(me.discount) *
								Number(me.grade_rate) + Number(me.freight)
							heji = heji.toFixed(2)
							if (Number(me.needpay) != 0 || heji > me.value) {
								if (me.wxPayStatue || me.aliPayStatue || me.baidupayStatue) {
									me.pay_display = true
								} else {
									me.firstFlag = true
									uni.showToast({
										title: '金额不足以支付商品价格!4',
										icon: 'none',
										duration: 1500
									});
									return false
								}
								console.log('立即支付7');
								// #ifdef MP-WEIXIN
								console.log('立即支付9');
								me.pay_display = true
								// #endif
							} else {
								console.log('立即支付8');
								me.pay_display = true
							}
						} else { //余额支付
							me.pay_display = true
						}
					}
				} else {
					//支付宝或微信支付--创建订单
					uni.showLoading({
						title: '正在请求支付...',
						mask: true,
					})
					console.log("me.otype");
					console.log(me.otype);
					// #ifdef MP-WEIXIN
					if (me.pay_name == "jp") {
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							access_id: me.access_id,
							address_id: me.address_id,
							type: "JP",
							auction_id: me.bind_id,
							coupon_id: me.coupon_id,
							bargain_order_no: me.order_no
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					} else if (me.bargain) {
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							type: "KJ",
							cart_id: me.cart_id,
							access_id: me.access_id,
							address_id: me.address_id,
							bargain_id: me.bargain_id,
							bargain_order_no: me.order_no
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					} else if (me.otype == "MS") {
						let cruitem = JSON.parse(me.cpId)[3];
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							type: "MS",
							cart_id: me.cart_id,
							access_id: me.access_id,
							address_id: me.address_id,
							coupon_id: me.coupon_id,
							bargain_order_no: me.order_no,
							shop_address_id: me.shop_address_id,
							activity_id: me.activity_id, //秒杀活动id
							time_id: me.time_id, //时段id
							sec_id: cruitem.sec_id
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					} else {
						var data = {
							module: 'app',
							action: 'order',
							app: 'payment',
							cart_id: me.cart_id,
							access_id: me.access_id,
							address_id: me.address_id,
							coupon_id: me.coupon_id,
							bargain_order_no: me.order_no,
							shop_address_id: me.shop_address_id
						}
						if (me.cpId) {
							data.product = me.cpId
							data.cart_id = ''
						}
						data.pay_type = 'mini_wechat'
						data.store_type = 1
					}
					console.log('立即支付3');

					uni.request({ //创建订单
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res1) => { //支付
							let {
								data: {
									status,
									data
								}
							} = res1
							me.order_list = JSON.stringify(data)
							console.log('立即支付21');

							if (status == 1) {
								me.weixinPay()
							} else {
								me.firstFlag = true
								uni.showToast({
									title: "创建订单失败,请稍后再试!",
									duration: 1500,
									icon: 'none'
								})
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
						},
						error: function(err) {
							me.firstFlag = true
							uni.showToast({
								title: "创建订单失败,请稍后再试!",
								duration: 1500,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
					// #endif
					// #ifndef MP-WEIXIN
					// me.showPayWay=true//弹窗
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
	}
}


/**
 * 获取支付类型
 * @param {Object} fromPage
 */
export function laikeGetPayType(fromPage) {
	var me = fromPage;
	console.log(me.useWallte)
	console.log(me.wxPayStatue)
	console.log(me.aliPayStatue)
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


/**
 * 弹出优惠券窗口
 * @param {Object} fromPage
 */
export function laikeShowCoupon(fromPage) {
	var me = fromPage;
	me.use_coupon = true
	var data = {
		module: 'app',
		action: 'Coupon',
		app: 'my_coupon',
		access_id: me.access_id,
		cart_id: me.cart_id,
		product: me.cpId
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
				let {
					data: {
						list
					}
				} = res
				me.coupon_list = list
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

/**
 *  关闭优惠券弹出层的计算
 */
export function laikeCloseCoupon(fromPage) {
	var me = fromPage;
	me.use_coupon = false
	var data = {
		module: 'app',
		action: 'Coupon',
		app: 'getvou',
		access_id: me.access_id,
		cart_id: me.cart_id,
		address_id: me.address_id,
		coupon_id: me.coupon_id,
		product: me.cpId
	}

	if (me.coupon_id.length > 0) {
		uni.request({
			data,
			url: uni.getStorageSync("url"),
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: function(res) {
				if (res.data.code == 200) {
					var money = res.data.money

					me.freightt = parseFloat(res.data.freight).toFixed(2);
					me.freight = res.data.freight;

					me.coupon_name1 = res.data.coupon_name
					let heji = Number(me.products_total) + Number(me.freight) - Number(me.coupon_name) - Number(me.reduce_money)
					me.total = heji;
				} else {
					uni.showToast({
						title: res.data.message,
						duration: 1500,
						icon: 'none'
					})
				}
				if (res.statusCode == 200) {
					me.coupon_name = res.data.money;
					me.total = me.products_total + me.freight - me.coupon_name - me.reduce_money
					var price_total = me.products_total - me.coupon_name - me.reduce_money
					console.log(me.products_total);
					console.log(me.freight);
					console.log(me.coupon_name);
					console.log(me.reduce_money);
					if (me.useWallte) {
						if (me.total >= Number(me.user_money)) {
							me.value = me.user_money
							console.log("me.value=================10");
							console.log(me.value);
							me.needpay = parseFloat(me.products_total - Number(me.user_money)).toFixed(2)
							console.log("me.needpay=================1");
							console.log(me.needpay);
						} else {
							me.value = me.total
							console.log("me.value=================11");
							console.log(me.value);
							me.needpay = 0
							console.log("me.needpay=================2");
							console.log(me.needpay);
						}
					} else {
						if (price_total > 0) {
							me.needpay = parseFloat(me.total).toFixed(2)
							console.log("me.needpay=================3");
							console.log(me.needpay);
						} else if (price_total <= 0 && me.total > 0) {
							me.needpay = parseFloat(me.total).toFixed(2) + 0.01
							console.log("me.needpay=================33");
							console.log(me.needpay);
						} else {
							me.needpay = 0.01
							console.log("me.needpay=================4");
							console.log(me.needpay);
						}
					}
				}
			}
		})
	}
}


/**
 * 选择优惠券
 * 
 * @param {Object} fromPage
 * @param {Object} index
 * @param {Object} id
 * @param {Object} coupon_status
 */
export function laikeChooseCoupon(fromPage, index, id, coupon_status) {
	var me = fromPage;
	if (coupon_status == 1) {
		var length = me.coupon_list.length
		if (me.coupon_id.length > 0) {
			if (id == 0) {
				me.coupon_id = [0]
			} else {
				me.coupon_id = id
			}
		} else {
			me.coupon_id = id
		}
	} else {
		uni.showToast({
			title: '不能使用该优惠券',
			icon: 'none',
			duration: 1500
		})
	}
}
