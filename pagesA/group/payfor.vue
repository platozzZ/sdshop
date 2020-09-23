<template>
	<div ref='cart' class="cart_f">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<headapp :title='title' :returnR='returnR'></headapp>
		
		<paymodel v-model="pay_display" @success="_confirm" @cancel="_cancel"/>
		
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中</p>
			</div>
		</div>
		<div v-else class="marginb">

			<div class='address_one' :class='iswxmp?"unset-top":""' @tap="_uni_navigateTo('../../pages/address/receivingAddress?state_manage=1&addre_id='+address.id)"
			 v-if='adds_f==1'>

				<div class="yh-address">
					<span class="yh-address-name">{{ address.name }}</span>
					<span class="yh-address-tel">{{ address.tel }}</span>
					<p>{{address.address_xq}}</p>
				</div>

				<img class='arrow' :src="jiantou" />
			</div>
			<!--没有地址-->
			<div class='address_two' @tap="_uni_navigateTo('../../pages/address/addAddress?state_addre=1&addNum=0')" v-else>
				<span>+</span>
				<span>点击添加地址</span>
			</div>


			<!--灰色间隔-->
			<div class="yh-line"></div>
			<!--商品列表-->
			<ul>
				<li class='goods yh-goods-start' @tap='_goStore(mch_id)'>
					<img :src="storeimg" class="yh-storeimg" />
					<span class="yh-mch-name">{{ mch_name }}</span>
					<img :src="jiantou" class="yh-jiantou" />
				</li>
				<li class='goods'>

					<img :src="pro.image" />
					<div class='goods_right'>
						<p>{{pro.pro_name}}</p>
						<div class='goods_bottom'>
							<p><span style="font-size: 22upx;">￥{{price}}</span>元</p>
							<div class='format' style="clear: both;">
								<p>规格：{{pro.size}}</p>
								<p>x{{num}}</p>
								<p class="grouppeo">{{groupman}}人团</p>
							</div>
						</div>
					</div>
				</li>
			</ul>

			<!--灰色间隔-->
			<div class="yh-line"></div>

			<ul>
				<li class='order_coupon' v-if="grade_rate != 1">
					<span>会员等级折扣</span>
					<span>{{grade_rate*10}}折</span>
				</li>
				<li class='order_coupon'>
					<span>运费</span>
					<span v-if="yunfei==0">包邮</span>
					<span v-else>￥{{yunfei}}</span>
				</li>
				<li class="order_coupon">
					<span class="yh-order-coupon">
						合计：
						<span class="yh-order-coupon-span">
							￥{{ total }}
						</span>
					</span>
				</li>
			</ul>
			<div class="yh-line"></div>

			<!--支付方式-->
			<!--支付方式-->
			<div>

				<li class='order_coupon'>
					<span class="yh-order_coupon-spanc">请选择支付方式</span>
				</li>

				<li class='pay' @tap='chooseWay("balance")' v-if="open_wallet">
					<div class="yh-pay">
						<div class="pay_yue yh-pay-wx-d">
							<div class="yh-pay-s">
								<img class='pay_img' :src="pay_y" alt="">
								<div class="yh-pay_div">
									<p class="yh-pay_div-p">
										余额支付
										<text style="color: #999999;">（余额￥{{ user_money }}）</text>
									</p>
								</div>
							</div>
							<img class='quan_img' :src="useWallte?quan_hei:quan_hui"/>
						</div>
					</div>
				</li>

				<!-- #ifdef MP-BAIDU -->
				<li class='pay' @tap='chooseWay("baidu")' v-if="payment.baidu_pay == 1">
					<div class="yh-pay">
						<div class="pay_yue yh-pay-wx-d">
							<div class="yh-pay-s">
								<img class='pay_img' :src="pay_bd" alt="">
								<div class="yh-pay_div">
									<p class="yh-pay_div-p">
										百度支付
									</p>
								</div>
							</div>
							<img class='quan_img' :src="baidupayStatue?quan_hei:quan_hui"/>
						</div>
					</div>
				</li>
				<!-- #endif -->

				<!-- 微信支付 -->
				<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
				<li class='pay' @tap='chooseWay("wxPay")' v-if="open_wxpay == true">
					<div class="yh-pay">
						<div class="pay_yue yh-pay-wx-d">
							<div class="yh-pay-s">
								<img class='pay_img' :src="pay_w" alt="">
								<div class="yh-pay_div">
									<p class="yh-pay_div-p">
										微信支付
									</p>
								</div>
							</div>
							<img class='quan_img' :src="wxPayStatue?quan_hei:quan_hui"/>
						</div>
					</div>
				</li>
				<!-- #endif -->

				<!-- 支付宝支付 -->
				<!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO-->
				<li class='pay' @tap='chooseWay("aliPay")' v-if="open_alipay == true">
					<div class="yh-pay">
						<div class="pay_yue yh-pay-wx-d">
							<div class="yh-pay-s">
								<img class='pay_img' :src="pay_z" alt="">
								<div class="yh-pay_div">
									<p class="yh-pay_div-p">
										支付宝支付
									</p>
								</div>
							</div>
							<img class='quan_img' :src="aliPayStatue?quan_hei:quan_hui"/>
						</div>
					</div>
				</li>
				<!-- #endif -->

			</div>
			<div class='foot' id='foot' :class='ishide==1?"hide":""'>
				<div>
					<p class="yh-pay-ye">付款金额：<span>￥{{total}}</span></p>
				</div>
				<p @tap="_pay_style()">立即支付</p>
			</div>
		</div>
		<!-- 高度屏幕小的时候解决选择不到微信支付的问题 -->
		<div class="yh-wx-pay">
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
</template>

<script>
	import headapp from '../../components/header.vue'
	import heads from "../../components/header-h5.vue"
	
	import paymodel from '@/components/paymodel.vue'
	
	import {
		_axios,
		toUrl,
		payThree,
		chooseWay,
		switchChange,
		weixinPay,
		_payFail,
		_gotPayType,
		_pay_style,
		_confirm,
		_createNotPay,
		_payAxios,
		changeValue,
		// getOrderInfo,
	} from '../../static/js/group/payfor.js'

	import {
		mapMutations
	} from 'vuex'
	import Maskm from '../../components/maskM.vue'
	import {
		getStorage
	} from '../../common/storage.js'

	export default {
		data() {
			return {
				open_wxpay: false,
				open_alipay: false,
				open_wallet: false,
				ispass:false,
				payment:"",
				makeOrd: false,
				load: true,
				notWallte: false,
				useWallte: false,
				value: '',
				cpId: '',
				ishide: 0, //foot是否隐藏 1隐藏 0否
				oldheight: '',
				returnR: '', //回退类型
				title: '确认订单信息',
				adds: '', //地址
				can_pay_: '',
				iswxmp: '', //是否为微信小程序
				adds_f: '', //地址状态
				price: '', //商品单价
				pro: '', //购买商品
				user_money: '', //账户余额
				no_change: true, //未选择过余额支付
				guanbiImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/close2x.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jiantou2x.png',
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/yuezhifu2x.png',
				pay_z: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/zhifubaozhifu2x.png',
				pay_w: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/weixinzhifu2x.png',
				pay_b: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/lALPBb.png',
				pay_bd: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/baiduzhifu2x.png',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanzehei2x.png',
				zfb: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/zhifubaozhifu2x.png',
				wx: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/weixinzhifu2x.png',
				yezf: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/yuezhifu2x.png',
				storeimg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/store.png',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				pay: [{
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/yuezhifu2x.png',
						name: '钱包余额'
					},
					{
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/weixinzhifu2x.png',
						name: '微信支付'
					},
					{
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/zhifubaozhifu2x.png',
						name: '支付宝'
					}
				], //支付方式 
				pay_index: -1,
				pay_style: '', //支付方式
				content: '是否抵扣余额？',
				mask_value: '',
				num: '',
				msg: '',
				msgLength: 0,
				access_id: '',
				digits: ['', '', '', '', '', ''], //input框位数控制,这里可以配置多少个“输入框”
				page: 0,
				enterless: true,
				pay_display: false, //支付密码框显示
				password_status: '', //判定是否已经设置支付密码
				password_display: false, //前往设置支付密码提示框			
				yunfei: '',
				name: '',
				channel: '',
				erroTime: 0,
				focus: true,
				providerList: '',
				address: '',
				aliPayStatue: false,
				wxPayStatue: false,
				baidupayStatue: false,
				fastTap: true,
				groupres: '',
				product: {},
				showPayWay1: false,
				showPayWay: false,
				address_id: '',
				needpay: '', //还需支付
				groupman: '', //拼团人数
				total: '', //支付总价
				code: '',
				myappid: '',
				mch_data: '',
				mch_name: "",
				mch_id: "",
				firstFlag: true,
				can_pay: true,
				price1: 0, //组合支付时的剩余价格
				grade_rate: 1, //会员折扣
				activity_no: "", //拼团活动号
				payTitle: '', //支付商品标题
			}
		},
		beforeDestroy() {
			this.$store.state.order_id = ''
		},
		onLoad(option) {
			
			this.cpId = option.product
			if (!this.cpId) {
				this.cpId = ''
			}

			this.returnR = option.returnR

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

			this.product = JSON.parse(this.cpId);
			this.$store.state.address_id = this.$store.state.address_id_def

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios()

			uni.getProvider({
				service: "payment",
				success: (e) => {

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
			this.orde_id = this.$store.state.order_id
			this.cart_id = this.$store.state.cart_id
			this.address_id = this.$store.state.address_id
			this.pay_name = this.$store.state.pay_lx
			this.bind_id = this.$store.state.bindding_num

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios();
			// #ifdef H5
			var a = window.location.href
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
				this.toUrl()
			}
			// #endif

			// #ifdef MP-WEIXIN
			this.iswxmp = true
			// #endif

			// #ifndef MP-WEIXIN
			this.iswxmp = false
			// #endif
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
			_toal() {
				console.log(this.numb)
			}
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

        if (me.payment.wallet_pay == 1) {
          this.chooseWay("balance")
          me.open_wallet = true
          me.useWallte = true

        }
			},
			...mapMutations({
				order_id: 'SET_ORDER_ID',
				status: 'SET_STATUS',
			}),
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				me.orde_id = me.$store.state.order_id
				me.cart_id = me.$store.state.cart_id
				me.address_id = me.$store.state.address_id_def
				me.pay_name = me.$store.state.pay_lx
				me.bind_id = me.$store.state.bindding_num
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			/**
			 * 
			 * */
			_hide() {
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
			replaceInput(event) {
				this.value = event.detail.value
				this._usyue()
			},
			/**
			 * 
			 * */
			toUrl() {
				var me = this
				toUrl(me)
			},
			/**
			 * 
			 * */
			_usyue: function() {
				this.needpay = (this.total - this.value).toFixed(2)
				if (this.needpay <= 0) {
					this.needpay = 0
				}
			},
			/**
			 * 获取数据
			 * */
			_axios() {
				var me = this
				_axios(me)
				me.payTitle = me.pro.pro_name
			},
			/**
			 * 
			 * */
			payThree() {
				var me = this
				payThree(me)
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
			 * 选择支付的方式(微信支付,支付宝支付)
			 * */
			chooseWay(way) {
				var me = this
				chooseWay(way, me)
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
			 * 选择用余额支付
			 * */
			switchChange(e) {
				var me = this
				switchChange(e, me)
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
			run_weixinPay() {
				var me = this
				// #ifdef MP-WEIXIN
				me.weixinPay();
				console.log('wx11123334441111');
				// #endif

				// #ifndef MP-WEIXIN
				// #ifndef MP-ALIPAY
				me.pay_wx();
				console.log("============me.pay_wx()1");
				// #endif
				// #endif

				if (me.wxPayStatue) {
					me.pay_wx('wx')
				} else if (me.aliPayStatue) {
					me.pay_wx('ali')
				} else if (me.baidupayStatue) {
					me.pay_wx('baidu_pay')
				}
			},
			/**
			 * 
			 * */
			getOrderInfo(type) {
				var me = this;
				console.log('=====getOrderInfo');
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
				let p = me.LaiKeTuiCommon.getMPAliAuthCode();
				return p.then((authcode) => {
					console.log(authcode)
					if (authcode) {
						data.alimp_authcode = authcode;
					}
					return new Promise((res) => {
						uni.request({
							url: uni.getStorageSync("url"),
							data,
							success: (result) => {
								console.log("======================result");
								console.log(JSON.stringify(result));
								console.log('res(result)------success');
								// console.log(JSON.stringify(res(result)));
								// #ifndef MP-ALIPAY
								res(result);
								// #endif

								// #ifdef MP-ALIPAY
								let tno = result.data;
								res(tno.substr(1, tno.length));
								// #endif
							},
							fail: (e) => {
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
				weixinPay(me)
			},
			/**
			 * 支付失败
			 * */
			_payFail() {
				let me = this;
				_payFail(me)
			},
			/**
			 * 
			 * */
			pay_wx(type) {
				var me = this;
				me.laikepay.laikePayMain(me, type);
			},
			/**
			 * 
			 * */
			in_array(stringToSearch, arrayToSearch) {
				for (let s = 0; s < arrayToSearch.length; s++) {
					let thisEntry = arrayToSearch[s].toString();
					if (thisEntry == stringToSearch) {
						return true;
					}
				}
				return false;
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
				_gotPayType(me)
			},
			/**
			 * 点击  立即支付
			 * */
			_pay_style() {
				var me = this
				// this.ispass = !this.ispass
				_pay_style(me)
			},
			/**
			 * 支付密码框确认
			 * */
			_confirm(payNum) {
				var me = this
				me.msg = payNum
				_confirm(payNum, me)
			},
			/**
			 * 支付密码框取消 创建未付款订单
			 * */
			_createNotPay(pay_type, iswallet, threepay = false) {
				var me = this
				_createNotPay(pay_type, iswallet, threepay, me)
			},
			/**
			 * 
			 * */
			_cancel() {
				var me = this
				me.pay_display = false
				// me.msg = ""
				me._createNotPay('', false, 'cancel');
			},
			/**
			 * 余额支付请求
			 * */
			_payAxios(type) {
				var me = this
				_payAxios(type, me)
			},
			/**
			 * 跳设置支付密码页面
			 * */
			_password_status() {
				uni.navigateTo({
					url: '../../pagesB/setUp/payment'
				});
				this.password_display = false
			},
			/**
			 * 
			 * */
			_goStore(shop_id) {
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id=' + shop_id
				})
			},
			/**
			 * 节奏遮罩层传值
			 * */
			_mask_value(mask_value) {
				this.mask_value = mask_value
				if (mask_value == '取消') {
					//直接调用第三方接口
				} else if (mask_value == '确认') {
					if (this.pay_style == 3) {
						//第三方接口，传的金额为余额抵扣后的金额，扣款成功调用余额抵扣接口
						this._deduction()
					}
				}
			},
			/**
			 * 
			 * */
			changeValue(newValue, oldValue) {
				var me = this
				changeValue(newValue, oldValue, me)
			}
		},
		components: {
			heads,
			Maskm,
			headapp,
			paymodel
		},
		watch: {
			address_id() {
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
			value: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
			yunfei: function() {
				var me = this;
				me.total = me.product.price * me.product.num + parseFloat(me.yunfei)
				me.total = me.total.toFixed(2)

				if (me.useWallte) {
					if (Number(me.user_money) > Number(me.total)) {
						me.value = me.total
					} else {
						me.value = me.user_money
					}
					me.needpay = (this.total - this.value).toFixed(2)
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../static/css/group/payfor.css");
</style>
