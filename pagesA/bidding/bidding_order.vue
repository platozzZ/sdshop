<template>
	<div ref="cart" class="cart_f">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>

		<!-- 请求加载数据 -->
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中</p>
			</div>
		</div>

		<!-- 渲染数据 -->
		<div class="order_detail" v-else>
			<!-- 显示地址 -->
			<div class='address_one' @tap="_uni_navigateTo('../../pages/address/receivingAddress?state_manage=1&addre_id='+address.id)"
			 v-if='adds_f'>
			 
				<div class="yh-address">
					<span class="yh-address-name">{{address.name}}</span>
					<span class="yh-address-tel">{{address.tel}}</span>
					<p>{{address.address_xq}}</p>
				</div>
				
				<img class='arrow' :src="jiantou" />
			</div>
			<!--没有地址-->
			<div class='address_two' @tap="_uni_navigateTo('../../pages/address/addAddress?state_addre=1&addNum=0')" v-if='!adds_f'>
				<span>+</span>
				<span>点击添加地址</span>
			</div>
			<!--灰色间隔-->
			<div class="yh-noun"></div>
			<!-- 商品列表 -->
			<ul>
				<li class='goods'>
					<img :src="jp_imgurl" />
					<div class='goods_right'>
						<p>{{jp_name}}</p>
						<div class='goods_bottom'>
							<p><span style="font-size: 22upx;">￥</span>{{jp_total}}元</p>
							<div class='format' style="clear: both;">
								<p>规格：{{pro.size}}</p>
								<p>x{{pro.num}}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<!-- 会员等级折扣，运费，合计信息 -->
			<li class='order_coupon' v-if="grade_rate!=1">
				<span>会员等级折扣</span>
				<span>{{grade_rate*10}}折</span>
			</li>
			<li class='order_coupon'>
				<span>运费</span>
				<span v-if="freightt==0">包邮</span>
				<span v-else>￥{{freightt}}</span>
			</li>
			<li class='order_coupon'>
				<span></span>
				
				<span class="yh-hj">
					合计：<font class="yh-price2">￥{{price2}}</font>
				</span>
				
			</li>
			<!--支付方式-->
			<ul>
				<li class='pay'>
					<div style="width: 100%;">
						<!-- 余额支付开始 -->
						<div class="pay_yue yh-pay-yue">
							
							<div class="yh-display">
								<div>
									<p style="width: 400upx;">
										<font class="yh-yezf">余额支付</font><span :class="user_money>0?'btn1':'btn2'">(余额￥{{user_money}})</span>
									</p>
								</div>
							</div>
							
							<switch id="isyue" v-if="user_money>0" @change="switchChange" color='#4CD864' />

						</div>
						<div v-if="useWallte" class='deco'>
							
							<div class="yh-deco-syye">使用余额</div>
							
							<div class="yh-deco-div">
								<input :value="value" type='digit' @focus="_hide()" @blur="_show()" @input="replaceInput" placeholder="请输入抵扣金额" class="yh-deco-input">
							</div>
							
						</div>
						<!-- 余额支付结束 -->
					</div>
				</li>
				<li class="yh-noun"></li>
				<div v-if="needpay > 0">
					<li class='order_coupon'>
						<span class="yh-order-coupon-span">还需支付</span>
						<span>￥{{needpay}}</span>
					</li>

					<!-- 微信支付 -->
					<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
					<li class='pay' @tap='chooseWay("wxPay")' v-if="open_wxpay==true">
						<div style="width: 100%;">
							
							<div class="pay_yue yh-pay-yue">
								
								<div class="yh-pay-div">
									
									<img class='pay_img' :src="pay_w" alt="">
									
									<div style="margin-left: 30upx;">
										<p style="width: 400upx;">
											微信支付
										</p>
									</div>
									
								</div>
								
								<img class='quan_img' :src="wxPayStatue?quan_hei:quan_hui" />
							</div>
						</div>
					</li>
					<!-- #endif -->
					
					<!-- #ifdef  APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
					<!-- 支付宝支付 -->
					<li class='pay' @tap='chooseWay("aliPay")' v-if="open_alipay==true">
						<div style="width: 100%;">
							
							<div class="pay_yue yh-pay-yue">
								
								<div class="yh-pay-div">
									<img class='pay_img' :src="pay_z" alt="">
									<div style="margin-left: 30upx;">
										<p style="width: 400upx;">
											支付宝支付
										</p>
									</div>
								</div>
								<img class='quan_img' :src="aliPayStatue?quan_hei:quan_hui" />
							</div>
						</div>
					</li>
					<!-- #endif -->
					
					<!-- #ifdef MP-BAIDU -->
					<!-- 百度支付 -->
					<li class='pay' @tap='chooseWay("aliPay")' v-if="payment.baidu_pay==1">
						<div style="width: 100%;">
							
							<div class="pay_yue yh-pay-yue">
								
								<div class="yh-pay-div">
									
									<img class='pay_img' :src="pay_bd" alt="">
									<div style="margin-left: 30upx;">
										<p style="width: 400upx;">
											百度支付
										</p>
									</div>
								</div>
								<img class='quan_img' :src="baidupayStatue?quan_hei:quan_hui" />
							</div>
						</div>
					</li>
					<!-- #endif -->
				</div>
			</ul>
			<div class='foot' id='foot' :class='ishide==1?"hide":""'>
				<div>
					<p class="yh-foot-fkje">付款金额：￥{{price2}}</p>
				</div>
				<p @tap="_pay_style()">立即支付</p>
			</div>
			<!-- 高度屏幕小的时候解决选择不到微信支付的问题 -->
			<div style="height: 106upx;width: 100%;">
			</div>
			<!--余额支付密码框-->
			<div class='payment_pass' v-if="pay_display">
				<div class='payment_c'>
					<p>请输入支付密码</p>
					<div class="xian_d">
						<!-- #ifdef MP-WEIXIN -->
						<input type='number' password="true" :maxlength="digits.length" v-model="msg" class="yh-msg1" />
						<!-- #endif -->
						
						<!-- #ifndef MP-WEIXIN -->
						<input type='number' password="true" :maxlength="digits.length" v-model="msg" class="yh-msg2" />
						<!-- #endif -->
						
						<ul class="pwd-wrap" @tap="focust">
							<li v-for="(item,key) in digits" :key='key'>
								<span v-if="msgLength > key" class="spanm"><input class="masd" type="number" v-model="key" pattern="\d*" /></span>
							</li>
						</ul>
						
						<div @tap='forgetPW()' class="yh-forgetPW">忘记密码？</div>
						
					</div>
					<div class="payment_tt">
						<div class='cancel' @tap="_cancel">取消</div>
						<div class='confirm' @tap="_confirm">确认</div>
					</div>
				</div>
			</div>

			<!--没有设置支付密码提示框-->
			<div class='payment_pass' v-if="password_display">
				<div class='payment_c'>
					<div class='payment_ww'>无支付密码，前往设置！</div>
					<div class="payment_tt payment_boo" @tap="_password_status">
						去设置
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import heads from '../../components/header.vue'
	import {
		mapMutations
	} from 'vuex'
	import Maskm from '../../components/maskM.vue'
	import {
		getStorage
	} from '../../common/storage.js'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'

	export default {
		data() {
			return {
				open_wxpay:false,
				open_alipay:false,
				payment:"",
				title: '确认订单信息',
				access_id: '', //用户访问id
				returnR: 2, //放回页面标识
				load: true, //true：正在加载  false：已经加载完成
				head: true, //头部切换
				address: '', //地址
				address_id: "", //地址id
				adds_f: '', //地址状态
				bind_id: '', //竞拍商品id
				coupon_id: '', //优惠券id
				firstFlag: true, //
				pro: '', //竞拍商品数据
				jp_name: '', //竞拍标题
				jp_imgurl: '', //竞拍图
				jp_total: '', //竞拍商品价格
				jp_zong: '', //竞拍总价
				price1: this.jp_total - 0 + this.freight, //订单付款总价--计算后的价格
				price2: '', //订单付款总价--计算后并格式化的价格
				totla: '',
				freightt: '', //运费
				freight: '',
				name: '',
				channel: '',
				erroTime: 0,
				enterless: true,
				user_money: '', //用户余额
				useWallte: false, //使用钱包
				value: '', //输入框中使用的余额
				value2: '',
				cpId: '',
				needpay: '', //还需支付钱
				ishide: 0, //是否隐藏底部支付栏 1隐藏 0不隐藏
				pay_display: false, //支付密码框显示
				digits: ['', '', '', '', '', ''], //input框位数控制,这里可以配置多少个“输入框”
				msg: '',
				msgLength: 0, //余额支付，密码输入框长度
				password_display: false, //前往设置支付密码提示框
				guanbiImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/close2x.png',
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/yuezhifu2x.png",
				pay_z: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
				pay_bd: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/baiduzhifu2x.png',
				pay_w: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/weixinzhifu2x.png',
				pay_b: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/lALPBb.png",
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehui2x.png",
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehei2x.png",
				zfb: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
				wx: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/weixinzhifu2x.png',
				yezf: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/yuezhifu2x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/store.png',
				code: '',
				pay: [{
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/yuezhifu2x.png",
						name: '钱包余额'
					},
					{
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/weixinzhifu2x.png",
						name: '微信支付'
					},
					{
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
						name: '支付宝'
					}
				], //支付方式 
				pay_index: -1,
				pay_style: '', //支付方式
				content: '是否抵扣余额？',
				mask_value: '',
				showPayWay1: false,
				showPayWay: false,
				focus: true,
				aliPayStatue: false,
				baidupayStatue: false,
				wxPayStatue: false,
				fastTap: true,
				can_pay: true,
				oldheight: '',
				makeOrd: false, //是否成功创建订单
				sNo: '',
				order_list: '',
				or_id: '',
				order_id: '',
				cart_id: '',
				h5_content: '',
				grade_rate: 1, //会员等级折扣

			}
		},
		onLoad(option) {

			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1')
			});

			//回调一步
			this.returnR = 2
			this.cpId = option.product
			this.$store.state.address_id = this.$store.state.address_id_def

			// #ifndef MP-ALIPAY
			uni.onWindowResize((res) => {
				if (this.oldheight == '') {
					this.oldheight = res.size.windowHeight
					this._hide()
				} else {
					if (Number(this.oldheight) < Number(res.size.windowHeight)) {
						this.oldheight = res.size.windowHeight
						console.log('111')
						this._show()
					} else if (Number(this.oldheight) == Number(res.size.windowHeight)) {
						console.log('222')
						this._show()
					} else {
						console.log('333')
						this._hide()
					}
				}
			})
			// #endif

			if (!this.cpId) {
				this.cpId = ''
			}

			if (option.canshu) {
				uni.setStorageSync("canshu", option.canshu)
			}

			this.order_no = option.order_no
			this.orde_id = this.$store.state.order_id
			this.cart_id = this.$store.state.cart_id

			if (option.cart_id) {
				this.cart_id = option.cart_id
				this.$store.state.cart_id = this.cart_id;
			}

			// #ifdef H5 
			var storage = window.localStorage;
			if (storage['cart_id'] != null && storage['cart_id'] != '') {
				this.cart_id = storage['cart_id']
			}
			// #endif
			this.$store.state.address_id = this.$store.state.address_id_def
			this.bind_id = this.$store.state.bindding_num

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

			// #ifndef H5
			this._axios();
			// #endif

			uni.getProvider({
				service: "payment",
				success: (e) => {
					console.log("payment success", e);
					this.providerList = e.provider.map((value) => {
						switch (value) {
							case 'alipay':
								return {
									name: '支付宝',
									id: value,
									loading: false
								}
							case 'wxpay':
								return {
									name: '微信',
									id: value,
									loading: false
								}
						}
					})
				},
				fail: (e) => {
					console.log("获取登录通道失败：", e);
				}
			})

		},
		onShow() {
			var me = this;
			this.orde_id = this.$store.state.order_id
			this.cart_id = this.$store.state.cart_id
			
			// #ifdef H5 
			var storage = window.localStorage;
			// #endif

			this.address_id = this.$store.state.address_id
			this.bind_id = this.$store.state.bindding_num
			this.firstFlag = true //不允许反复支付

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			var lkt_address_id_def = uni.getStorageSync("lkt_address_id_def");

			// #ifdef H5 
			var storage = window.localStorage;

			if (!this.address_id) {
				this.address_id = storage['address_id']
			}
			if (!this.bind_id) {
				this.bind_id = storage['bindding_num']
			}

			var a = window.location.href;
			if (a.split('?').length > 1) {
				var str = a.split('?')[1]
				var arr = str.split('&')
				for (var i in arr) {
					if (typeof(arr[i]) == "String" || typeof(arr[i]) == "string") {
						if (arr[i].substring(0, 4) == 'code') {
							str = arr[i].substring(5)
							this.code = str
						}
					}
				}
			}
			
			if (this.code == '') {
				storage.removeItem("bargain")
				storage.removeItem("bargain_id")
				storage.removeItem("order_no");
				storage.removeItem("product")
				this.toUrl();
			}
			
			this._axios();
			// #endif

			if (lkt_address_id_def) {
				this.adds_f = true;
			} else if (this.$store.state.address_id_def == '' || this.$store.state.address_id_def == undefined) {
				this.adds_f = false;
			} else {
				this.adds_f = true;
			}


			this._axios()

			// #ifndef H5
			me.$nextTick(function() {
				me._axios();
			});
			//#endif

		},
		methods: {
			/**
			 * 判断支付是否显示
			 * type 1.微信 2.支付宝
			 * */
			isshow:function(){
				var me = this
				// #ifdef H5
				if(me.payment.jsapi_wechat == 1){
					me.open_wxpay = true;
				}
				// #endif
				// #ifdef MP-WEIXIN
				if(me.payment.mini_wechat == 1){
					me.open_wxpay = true;
				}
				// #endif
				// #ifdef APP-PLUS
				if(me.payment.app_wechat == 1){
					me.open_wxpay = true;
				}
				if(me.payment.alipay == 1){
					me.open_alipay = true;
				}
				// #endif
				// #ifdef MP-ALIPAY
				if(me.payment.alipay_minipay == 1){
					me.open_alipay = true;
				}
				// #endif
				// #ifdef MP-TOUTIAO
				if(me.payment.tt_alipay == 1){
					me.open_alipay = true;
				}
				// #endif
			},
			...mapMutations({
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				bindding_num: "SET_BINDDING_NUM",
				bind_status: 'SET_BIND_STATUS',
				bind_promise: "SET_BIND_PPOMISE",
				head_id: "SET_HEAD_ID",
				order_id: 'SET_ORDER_ID',
				status: 'SET_STATUS',
				h_content: 'SET_H_CONTENT'
			}),
			/**
			 * 
			 * */ 
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			/**
			 * 
			 * */ 
			_hide() {
				console.log('hide1');
				this.ishide = 1
			},
			/**
			 * 
			 * */ 
			_show() {
				console.log('show2');
				this.ishide = 0
				if (this.value.length == 0) {
					this.value = 0
				}
			},
			/**
			 * 
			 * */ 
			_back() {
				console.log('这是return')
				console.log(this.returnR)
				uni.switchTab({
					url: '../../pages/tabBar/home'
				})
			},
			/**
			 * 
			 * */ 
			replaceInput(event) {
				this.value = Math.abs(event.detail.value)
				this._usyue()
			},
			/**
			 * 
			 * */ 
			_usyue() {

				let needpay = parseFloat(this.jp_total * this.grade_rate + this.freight - this.value).toFixed(2)
				if (needpay > 0) {
					this.needpay = needpay
				} else {
					this.needpay = 0
				}

			},
			/**
			 * 
			 * */ 
			payThree() {
				var me = this
				if (this.useWallte) {
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
						if (this.cpId) {
							data.product = this.cpId
							cart_id: ''
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
							//#ifdef MP-TOUTIAO
							data.pay_type = 'tt_alipay';
							// #endif
						} else {
							// #ifdef MP-BAIDU
							data.pay_type = 'baidu_pay'
							// #endif
						}

						uni.request({ //创建订单
							data,
							url: uni.getStorageSync("url"),
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: (res1) => { //支付
								uni.hideLoading()
								let {
									data: {
										status,
										data
									}
								} = res1
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
									} else {
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
			},
			/**
			 * 
			 * */ 
			_showPayWay() {
				var me = this
				this.showPayWay1 = true
				setTimeout(function() {
					me.showPayWay = false
					me.showPayWay1 = false
				}, 500)
			},
			/**
			 * 
			 * */ 
			forgetPW() {
				uni.navigateTo({
					url: '../../pagesB/setUp/paymentPassword'
				})
			},
			/**
			 * 
			 * */ 
			chooseWay(way) {
				//微信支付
				if (way == 'wxPay') {
					if (!this.wxPayStatue) {
						this.wxPayStatue = true
						this.aliPayStatue = false
						this.baidupayStatue = false
					} else {
						this.wxPayStatue = false
					}
				}
				//支付宝支付
				else if (way == 'aliPay') {
					if (!this.aliPayStatue) {
						this.wxPayStatue = false
						this.aliPayStatue = true
						this.baidupayStatue = false
					} else {
						this.aliPayStatue = false
					}
				}
				//百度支付
				else if (way == 'baidu_pay') {
					if (!this.aliPayStatue) {
						this.wxPayStatue = false
						this.aliPayStatue = false
						this.baidupayStatue = true
					} else {
						this.baidupayStatue = false
					}
				}
			},
			/**
			 * 
			 * */ 
			switchChange(e) {
				if (Number(this.user_money) <= 0) {
					return
				}

				// #ifdef MP-BAIDU
				this.useWallte = e.detail.checked
				// #endif

				// #ifndef MP-BAIDU
				this.useWallte = e.detail.value
				// #endif

				if (!this.useWallte) {
					this.value2 = this.value
					this.value = ''
					this.needpay = ''
				} else {
					if (this.price2 >= Number(this.user_money)) {
						this.value = this.user_money
						this.needpay = parseFloat(this.price2 - Number(this.user_money)).toFixed(2)
						console.log('支付总价大于用户余额')
					} else {
						this.value = (this.jp_total * this.grade_rate - 0 + this.freight).toFixed(2)
						let heji = this.jp_total * this.grade_rate - 0 + this.freight

						this.price2 = heji
						this.needpay = 0
						if (this.value === '') {
							this.value = this.value2.toFixed(2)
						}
						if (heji - this.value > 0) {
							this.needpay = heji - this.value
						}
					}
				}
				// console.log('这里是使用余额')
				// console.log(this.needpay,this.value)
			},
			/**
			 * 
			 * */ 
			_uni_navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			/**
			 * 
			 * */ 
			getOrderInfo(type) {
				var me = this
				const appid = "wxf6e29bcc719cf499"
				let data = {
					access_id: this.access_id,
					order_list: me.order_list,
					title: '',
					module: 'app',
					action: 'pay',
					type: 'app_wechat',
					type_: 'JP',
					total: me.price1,
					bargain_order_no: me.order_no
				}

				data.title = me.jp_name

				// #ifdef H5
				if (type == 'wx') {
					data.type = 'jsapi_wechat'
					data.code = this.code
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
					//#ifdef MP-TOUTIAO
					data.type = 'tt_alipay'
					data.store_type = 1
					// #endif
				}
				// #endif
				let p = me.LaiKeTuiCommon.getMPAliAuthCode();
				return p.then((authcode) => {
					if (authcode) {
						// #ifdef MP-ALIPAY
						data.alimp_authcode = authcode;
						// #endif
						// #ifdef MP-TOUTIAO
						data.tt_authcode = authcode;
						// #endif
					}
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
									if (type == 'wx') {
										//微信支付
									} else if (type == 'ali') {
										//支付宝支付
										this.h5_content = result.data;
									}
								} else if (result.data.code != undefined && result.data.code != 200) {
									uni.showToast({
										title: result.data.message,
										duration: 1500,
										icon: 'none'
									});
								}
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
				})
			},
			/**
			 * 
			 * */ 
			weixinPay() {
				var me = this
				this.loading = true;
				uni.login({
					provider: 'weixin',
					success: (e) => {
						var data;
						data = {
							code: e.code,
							order_list: me.order_list,
							title: me.jp_name,
							type: 'mini_wechat',
							access_id: this.access_id,
							total: me.price1,
							module: 'app',
							action: 'pay',
						}
						uni.request({
							url: uni.getStorageSync("url"),
							data,
							success: (res) => {
								uni.hideLoading();
								if (res.statusCode !== 200) {
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
											setTimeout(function() {
												console.log('44444444444444444')
												me.$store.state.payRes = me.order_list
												uni.redirectTo({
													url: "../../pages/pay/payResult"
												})
												me.pay_display = false
											}, 1000)
										},
										fail: (res) => {
											uni.showModal({
												title: '提示',
												content: '支付失败,可在订单列表中查看',
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
											})
										},
										complete: () => {
											this.loading = false;
										}
									})
								} else {
									uni.showModal({
										title: '提示',
										content: '支付失败,可在订单列表中查看',
										success: function(res) {
											me.firstFlag = true
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
									})
								}
							},
							fail: (e) => {
								this.loading = false;
								uni.hideLoading();
								uni.showModal({
									title: '提示',
									content: '支付失败,查看订单详情',
									success: function(res) {
										me.firstFlag = true
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
								})
							}
						})
					},
					fail: (e) => {
						this.loading = false;
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '支付失败,查看订单详情',
							success: function(res) {
								me.firstFlag = true
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
						})
					}
				})
			},
			/**
			 * 支付失败
			 * */ 
			_payFail() {
				let me = this;
				uni.showModal({
					title: '提示',
					content: '支付失败,查看订单详情',
					success: function(res) {
						me.firstFlag = true
						// #ifdef H5
						var url = uni.getStorageSync("h5_url") + "pages/order/myOrder?status=1";
						if (res.cancel) {
							url = uni.getStorageSync("h5_url") + "pages/tabBar/home";
						}
						location.href = url
						if (res.confirm) {
							uni.redirectTo({
								url: '../../pages/order/myOrder'
							})
						} else if (res.cancel) {
							uni.switchTab({
								url: '../../pages/tabBar/home'
							})
						}
						// #endif
						// #ifndef H5
						// me.pay_display = false
						me.$store.state.payRes = me.order_list
						if (res.confirm) {
							uni.redirectTo({
								url: '../../pages/order/myOrder'
							})
						} else if (res.cancel) {
							uni.switchTab({
								url: '../../pages/tabBar/home'
							})
						}
						// #endif
					}
				})
			},
			/**
			 * 
			 * */
			async pay_wx(type) {
				if (!type) {
					return;
				}
				let orderInfo = await this.getOrderInfo(type)
				var providerStr = "";
				if (type == 'wx') {
					providerStr = 'wxpay'
				} else if (type == 'ali') {
					providerStr = 'alipay'
				}
				let me = this
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
									console.log('++++++++++++++')
									console.log(sno)
									return false
									window.location.href = uni.getStorageSync("h5_url") + "pages/pay/payResult?payment_money=" + price + "&sNo=" +
										sno;
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
							setTimeout(function() {
								me.$store.state.payRes = me.order_list
								console.log('1111111111')
								uni.redirectTo({
									url: "../../pages/pay/payResult"
								})
								me.pay_display = false
							}, 1000)
						},
						fail: (res) => {
							me._payFail();
						},
						complete: () => {
							this.loading = false;
							uni.hideLoading();
						}
					})
				}
				// #endif
				// #ifdef MP-TOUTIAO
				me.laikepay.tt_pay(me, orderInfo)
				// #endif
				// #ifdef MP-BAIDU
				me.laikepay.baidu_pay(me, orderInfo)
				// #endif
				// #ifndef H5 || MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
				uni.requestPayment({
					provider: providerStr,
					orderInfo: orderInfo.data, //订单数据
					success: function(res) {
						uni.showToast({
							title: '支付成功！',
							duration: 1000,
							icon: 'none'
						})
						setTimeout(function() {
							me.$store.state.payRes = me.order_list
							console.log('22222222222222')
							uni.redirectTo({
								url: "../../pages/pay/payResult"
							})
							me.pay_display = true

						}, 1000)
					},
					fail: function(err) {
						var str = JSON.stringify(err)
						me._payFail();
					}
				});
				// #endif
			},
			/**
			 * 
			 * */
			focust() {
				this.focus = true
			},
			/**
			 * 是否已经选择支付方式
			 * */
			_gotPayType() {
				var me = this;
				if (!this.useWallte && !this.wxPayStatue && !this.aliPayStatue && !this.baidupayStatue) {
					uni.showToast({
						title: "请选择支付方式！",
						duration: 1000,
						icon: 'none'
					})
					me.firstFlag = false;
				} else {
					me.firstFlag = true;
					console.log('立即支付11==================================')
				}
			},
			/**
			 * 立即支付
			 * */
			_pay_style() {
				var me = this

				if (me.value == 0 && me.useWallte) {


					me.useWallte = false
				}
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

					this.price1 = this.jp_total * this.grade_rate - 0 + this.freight

					this.price1 = this.price1.toFixed(2)
					// 提交订单
					if (this.adds_f) {
						if (this.useWallte) { //钱包支付
							console.log('立即支付5');

							if (this.password_status == 0) {
								uni.showModal({
									title: '提示',
									content: '请先设置支付密码',
									showCancel: true,
									success: function(resM) {
										me.firstFlag = true;
										if (resM.confirm) {
											uni.navigateTo({
												url: '../../pages/setUp/payment'
											});
										}
									}
								})
							} else {
								let heji = Number(this.jp_total) * Number(this.grade_rate) - 0 + Number(this.freight)
								if (Number(this.needpay) != 0 || heji > this.value) {
									if (this.wxPayStatue || this.aliPayStatue || this.baidupayStatue) {} else {
										uni.showToast({
											title: '金额不足以支付商品价格!',
											icon: 'none',
											duration: 1500
										});
										return false
									}
								}

								console.log('pay_name');
								var data = {
									module: 'app',
									action: 'order',
									app: 'payment',
									access_id: me.access_id,
									address_id: me.address_id,
									type: "JP",
									auction_id: me.bind_id,
									product: me.cpId,
									coupon_id: me.coupon_id
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
												title: "您已生成待付款订单，请前去支付",
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
								if (this.price1 > 0) { //其他方式抵扣

									let heji = Number(this.jp_total) * Number(this.grade_rate) - 0 + Number(this.freight)
									if (Number(this.needpay) != 0 || heji > this.value) {
										if (this.wxPayStatue || this.aliPayStatue || this.baidupayStatue) {
											me.pay_display = true
											console.log("立即支付12===========================")
										} else {
											console.log("立即支付13===========================")
											me.firstFlag = true
											uni.showToast({
												title: '金额不足以支付商品价格!',
												icon: 'none',
												duration: 1500
											});
											return false
										}
										console.log('立即支付7=========================================');
										// #ifdef MP-WEIXIN
										console.log('立即支付9================================================');
										me.pay_display = true
										// #endif
									} else {
										console.log('立即支付8=================================================');
										me.pay_display = true
									}
								} else { //余额支付

									me.pay_display = true
									console.log('立即支付10==================================================');


								}
							}
						} else { //支付宝或微信支付--创建订单
							uni.showLoading({
								title: '正在请求支付...',
								mask: true,
							})
							// #ifdef MP-WEIXIN

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
							if (this.cpId) {
								data.product = this.cpId
								cart_id: ''
							}
							data.pay_type = 'mini_wechat'

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
									console.log('立即支付2');

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
							// this.showPayWay=true//弹窗
							this.payThree();
							// #endif

						}
					} else {
						uni.showToast({
							title: "请完善收货地址！",
							duration: 1000,
							icon: 'none'
						})
					}
				} else {
					console.log('立即支付');
				}
			},
			/**
			 * 
			 * */
			toUrl() {
				var me = this
				//将改页面的数据存入缓存
				// #ifdef H5
				var storage = window.localStorage;
				storage['bindding_num'] = me.bind_id
				storage['address_id'] = me.address_id
				// #endif
				var locationUrl = window.location.href
				var data = {
					type: 'jsapi_wechat',
					access_id: this.access_id,
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
							this.myappid = myappid
							var myUrl = res.data.data.url
							var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myappid +
								"&redirect_uri=" + myUrl +
								"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
							window.location.href = url
						} else {
							// uni.showToast({
							// 	title: res.data.message,
							// 	duration: 1500,
							// 	icon: 'none'
							// })
						}
					},
					error: function(err) {
						console.log(err)
					},
				})
			},
			/**
			 * 支付密码框确认
			 * */
			_confirm(payNum) {
				var me = this
				if (!this.fastTap) {
					console.log('exit');
					return
				}

				this.fastTap = false

				if (me.enterless) {
					uni.showLoading({
						title: '支付中...',
						mask: true,
					})
					if (this.msg.length == 6) {
						var data = {
							module: 'app',
							action: 'user',
							app: 'payment_password',
							access_id: this.access_id,
							password: this.msg,
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
							}
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
			},
			/**
			 * 支付密码框取消
			 * */
			_cancel() {
				var me = this
				me.pay_display = false
				me.msg = ""
				me.firstFlag = true
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
			},
			/**
			 * 余额支付请求
			 * */
			_payAxios(type) {
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				var me = this
				var data = {
					module: 'app',
					action: 'pay',
					app: 'wallet_pay',
					m: 'wallet_pay',
					type: 'wallet_pay',
					access_id: this.access_id,
					address_id: this.address_id ? this.address_id : this.addre_id,
					order_list: me.order_list,
				}
				data.payment_money = this.value
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						this.fastTap = true
						let {
							data: {
								code,
								message
							}
						} = res
						if (code == 200) {
							if (Number(me.price1) > 0) {
								// #ifdef MP-WEIXIN
								me.weixinPay()
								// #endif
								//#ifndef MP-WEIXIN
								if (me.wxPayStatue) {
									me.pay_wx('wx')
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
								var price = me.price1;

								var price = Number(me.price1) + Number(me.value);

								var sno = me.sNo;

								setTimeout(function() {
									console.log('33333333333333')
									me.$store.state.payRes = me.order_list
									uni.redirectTo({
										url: "../../pages/pay/payResult?payment_money=" + price + "&sNo=" + sno
									})

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
											url: '../../pages/order/myOrder'
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
											url: '../../pages/tabBar/home'
										})
									}
								}
							})
						}
					},
					error: function(err) {
						me.fastTap = true
					},
					fail: function(res) {
						// #ifdef MP-ALIPAY
						if (res.data.indexOf("200") != -1) {
							if (Number(me.price1) > 0) {
								// #ifdef MP-WEIXIN
								me.weixinPay()
								// #endif
								//#ifndef MP-WEIXIN
								if (me.wxPayStatue) {
									me.pay_wx('wx')
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
								var price = me.price1;

								var price = Number(me.price1) + Number(me.value);

								var sno = me.sNo;

								setTimeout(function() {
									console.log('33333333333333')
									me.$store.state.payRes = me.order_list
									uni.redirectTo({
										url: "../../pages/pay/payResult?payment_money=" + price + "&sNo=" + sno
									})

									me.pay_display = false
								}, 1000)
							}
						} else if (res.data.indexOf("112") != -1) {
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
											url: '../../pages/order/myOrder'
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
								content: '支付失败，订单已生成，可以在订单列表中查看',
								showCancel: false,
								success: function(res) {
									me.firstFlag = true
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
			},
			/**
			 * 跳设置支付密码页面
			 * */
			_password_status() {
				uni.navigateTo({
					url: '../../pagesB/setUp/payment'
				});
				this.password_display = false
				// 				this.$refs.cart.style.overflow = 'auto'
				// 				this.$refs.cart.style.height = '100%'
			},
			/**
			 * 节奏遮罩层传值
			 * */
			_mask_value(mask_value) {
				this.mask_value = mask_value
				if (mask_value == '取消') {
					/*					this.display = false
										this.$refs.cart.style.height = '100%'
										this.$refs.cart.style.overflow = ''*/
					//直接调用第三方接口
				} else if (mask_value == '确认') {
					if (this.pay_style == 3) {
						//第三方接口，传的金额为余额抵扣后的金额，扣款成功调用余额抵扣接口
						this._deduction()
					}
				}
			},
			/**
			 * 获取数据
			 * */
			_axios() {
				var me = this
				console.log('加载初始数据=-=-=-=-=')
				console.log(me.bind_id, this.address_id)
				var data = {
					module: "app",
					action: "order",
					auction_id: me.bind_id,
					product_type: 'JP',
					access_id: this.access_id,
					address_id: this.address_id,
					app: "Settlement"
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						me.load = false
						let {
							data: {
								payment,
								addemt,
								address,
								coupon_id,
								freight,
								name,
								password_status,
								products,
								products_total,
								total,
								user_money,
								enterless,
								is_distribution,
								discount,
								grade_rate,
							}
						} = res
						me.address = address

						me.freightt = parseFloat(freight).toFixed(2);
						me.freight = freight
						me.payment = payment
						me.jp_imgurl = res.data.imgurl
						me.jp_name = res.data.a_title
						me.jp_total = res.data.products_total
						me.price1 = me.totla - 0 + me.freight
						me.grade_rate = grade_rate
						console.log('这是address')
						console.log(address)
						console.log(address.id)

						me.user_money = user_money
						me.addre_id = address.id
						me.$store.state.address_id_def = address.id
						me.password_status = password_status
						me.pro = products[0]

						if (me.user_money > me.price1) {
							me.pay_index = 0
							me.pay_style = 1
						} else {
							me.pay_index = 1
							me.pay_style = 2
						}
						if (me.address) {
							if (me.address.length != 0) {
								me.adds_f = true
							} else {
								me.adds_f = false
							}
						}
						console.log('这是初始加载')
						console.log(me.price2)
						me.isshow();
					},
					error: function(err) {
						console.log(err)
					}

				})
			},
			/**
			 * 
			 * */
			changeValue(newValue, oldValue) {
				var me = this
				this.$nextTick(function() {
					me.price1 = me.jp_total * me.grade_rate - 0 + me.freight
					me.price2 = me.price1.toFixed(2)
					if (me.price2 < 0) {
						me.price2 = 0.01
					}
					
					
					let should_pay = (me.jp_total * me.grade_rate - 0 + me.freight).toFixed(2)
					if (Number(this.value) >= should_pay) { //输入金额大于商品金额
						if (Number(should_pay) <= Number(this.user_money)) {
							
							if (should_pay > 0) {
								me.value = should_pay
							} else {
								//出现价格为负数的情况
								me.value = 0.01
								if (this.useWallte) {
									me.needpay = 0
								} else {
									me.needpay = 0.01
								}
								me.price2 = 0.01
							}
						} else {
							
							me.value = me.user_money
						}
						if (Number(this.value) > should_pay && should_pay > 0) {
							uni.showToast({
								title: '已超过最大金额1',
								icon: 'none',
								duration: 1500
							})
						}
						// 补充：当使用余额大于合计金额时，将还需支付置为0 Number(0).toFixed(2)
					} else if (Number(this.value) < should_pay) { //输入金额小于商品金额
						if (Number(this.value) > this.user_money) {
							me.value = me.user_money
							uni.showToast({
								title: '已超过最大金额2',
								icon: 'none',
								duration: 1500
							})
						}
					}
					if (me.jp_total * me.grade_rate - 0 + me.freight <
						0.0099999999) {
						// me.value=Number(me.value).toFixed(2)
					}
					if (Math.abs(newValue - oldValue) == 0) {
						var x = String(newValue).indexOf('.') + 1;
						var y = String(newValue).length - x;
						if (y > 2 && x != 0) {
							me.value = Number(newValue).toFixed(2)
						}
					} else if (Math.abs(newValue - oldValue) < 0.009999999999) {
						me.value = Number(me.value).toFixed(2)
					}
				})
			},

		},
		components: {
			heads,
			Maskm,
			wxParse
		},
		watch: {
			address_id() {
				console.log('地址更换')
				this._axios()
			},
			msg(curVal) {
				this.msgLength = curVal.length;
			},
			'page': {
				handler: function(newValue, oldValue) {
					if (oldValue == 0 && newValue == 1) {
						//第一次进入页面，自动获得焦点，这里可优化。
						this.timer = setTimeout(() => {}, 500);
					}
				},
				deep: true
			},
			freight: function() {
				var me = this;
				console.log('freight---------------------------------');
				me.price1 = me.jp_total * me.grade_rate - 0 + me.freight
				me.price2 = me.price1.toFixed(2)

				if (me.useWallte) {
					if (parseFloat(me.user_money) > parseFloat(me.price2)) {
						me.value = me.price2
					}
				}
				console.log('这是value')
				console.log(me.value)
				if (me.price2 < 0) {
					me.price2 = 0.01
				}
				let should_pay = me.jp_total * me.grade_rate - 0 + me.freight
				//当交易金额小于等于0时,终止交易
				if (should_pay <= 0) {
					uni.showToast({
						title: '异常交易',
						icon: 'none',
						duration: 1500
					});
					uni.navigateBack({
						delta: 1
					})
				}
				me.needpay = me.price2 - 0 - me.value;
			},
			coupon_name: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
			value: function(newValue, oldValue) {
				console.log('改变了value')
				this.changeValue(newValue, oldValue)
				console.log(newValue, oldValue)

			},
			price1: function(newValue, oldValue) {
				var me = this
				this.$nextTick(function() {
					console.log('me.price0');
					console.log(me.price1);
					console.log('value')
					console.log(me.value)
					me.price1 = me.jp_total * me.grade_rate - 0 + me.freight - me.value
					me.price1 = Number(me.price1).toFixed(2)
					console.log('me.price1');
					console.log(me.price1);
					console.log('这是price2')
					console.log(me.price2)
					me.needpay = me.price1
				})
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/bidding/bidding_order.css");
</style>
