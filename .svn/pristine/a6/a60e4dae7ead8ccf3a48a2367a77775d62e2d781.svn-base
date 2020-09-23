<template>
	<div ref='cart' class="cart_f">
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
		<div v-else class="order_detail">
			
			<!-- 选择快递后,显示地址 -->
			<div class='address_one' @tap="_uni_navigateTo('../../pages/address/receivingAddress?state_manage=1&addre_id=' + address.id)" v-if='afhalen_translateX <= 5 && adds_f'>
				
				<div class="yh-address">
					<span class="yh-address-name">{{ address.name }}</span>
					<span class="yh-address-tel">{{ address.tel }}</span>
					<p>{{ address.address_xq }}</p>
				</div>
				
				<img class='arrow' :src="jiantou" />
			</div>
			
			<!--没有地址-->
			<div class='address_two' @tap="_uni_navigateTo('../../pages/address/addAddress?state_addre=1&addNum=0')" v-if='afhalen_translateX <= 5 && !adds_f'>
				<span>+</span>
				<span>点击添加地址</span>
			</div>
			
			<!--灰色间隔-->
			<div class="yh-line"></div>
			<!--商品列表-->
			
			<div>
				<ul>
					
					<li v-if='pro.mch_id > 0' class='storeLi yh-storeLi'>
					
						<img :src="storeImg" class="yh-storeImg">
						{{ pro.shop_name }}
						<img :src="jiantou" class="yh-jiantou">
					</li>
					
					<li class='goods'>
						
						<img :src="pro.imgurl" />
						
						<div class='goods_right'>
							
							<p>{{ pro.product_title }}</p>
							
							<div class='goods_bottom'>
								
								<p v-if='pro.money>0' class="yh-money">
									<span class="yh-money-span">￥</span>
									
									{{ pro.money }}+
									
									<img :src="integral_hei" class="yh-integral">
									
									{{pro.integral}}
								</p>
								
								<p v-else><img :src="integral_hei" class="yh-integral">{{ pro.integral }}</p>

								<div class='format yh-format'>
									<p class="yh-format-p1">规格：{{ pro.attribute }}</p>
									<p class="yh-format-p2">x1</p>
								</div>
								
							</div>
						</div>
					</li>
					<div class="yh-line"></div>	
				</ul>
			</div>
			<!--运费、优惠券、合计信息-->
			<ul>
				
				<!-- <li class='order_coupon' v-if='pro.money > 0'> -->
				<li class='order_coupon'> 
					<span>商品金额<text class="yh-integral-color">（余额￥{{user_money}}）</text></span>
					<span>￥{{pro.money}}</span>
				</li>
				
				<li class='order_coupon'>
					<view class="yh-integral_hui">
						积分总额
						<view class="yh-integral_hui yh-integral-color">
							（积分
							<img :src="integral_hui" class="yh-user_score">
							{{user_score}}）
						</view>
					</view>
					
					<view class="yh-integral_hui">
						<img :src="integral_hei" class="yh-user_score">
						{{pro.integral}}
					</view>
					
				</li>
				
				<li class='order_coupon'>
					<span>运费</span>
					<span v-if="freightt == 0">包邮</span>
					<span v-else>￥{{ freightt }}</span>
				</li>
				
				<li class='order_coupon'>
					
					<span class="yh-heji">合计：</span>
					
					<span>
						
						<view v-if="pro.money > 0 || freightt > 0" class="yh-integral_hui yh-freightt">
							￥{{ pro.money + freightt }}+
							<img :src="integral_hong" class="yh-integral_hong">
							{{ pro.integral }}
						</view>
						
						<text v-else class="yh-font">
							<img :src="integral_hong" class="yh-integral_hongs">
							{{ pro.integral }}
						</text>
					</span>
					
				</li>
			</ul>
			<div class='foot' id='foot'>
				<span class='gopay' @tap="_pay_style()">确认兑换</span>
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
		
		<paymodel v-model="pay_display" @success="confirm" @cancel="_cancel"/>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import Maskm from '../../components/maskM.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import paymodel from '@/components/paymodel.vue'
	
	import {
		laikeUseyue,
		laikePayThree,
		laikeChooseWay,
		laikeSwitchChange,
		laikeChangeValue,
		laikeGetPayType,
		laikePayAtOnce,
		laikeShowCoupon,
		laikeCloseCoupon,
		laikeChooseCoupon 
	} from '../../static/js/pay/orderDetailsr.js'
	
	import {
		getStorage
	} from '../../common/storage.js'
	
	import {
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				afhalen: false,  //判断商家是否支持自提
				afhalen_translateX:'0',
				order_no: '',
				bargain_id: '',
				isDistribution: false, //是否是分销商品？true是，false不是
				order_list: '',
				integral_hui:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hui.png",
				integral_hei:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
				integral_hong:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/jiantou2x.png",
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/store.png",
				guanbiImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/close2x.png",
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/yuezhifu2x.png",
				pay_z: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/zhifubaozhifu2x.png",
				pay_w: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/weixinzhifu2x.png",
				pay_b: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/lALPBb.png",
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/xuanzehui2x.png",
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/xuanzehei2x.png",
				zfb: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/zhifubaozhifu2x.png",
				wx: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/weixinzhifu2x.png",
				yezf: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/yuezhifu2x.png",
				back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/back2x.png",
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/5-121204193R7.gif",
				showPayWay1: false,
				showPayWay: false,
				makeOrd: false,
				load: true,
				ycoupon_name: '',
				notWallte: false,
				useWallte: false,
				value: '',
				value2: '',
				cpId: '',
				title: '确认订单信息',
				adds: '', //地址
				adds_f: '', //地址状态
				price: '', //商品总价
				price1: this.products_total + this.freight - this.coupon_name - Number(this.reduce_money), //计算后的价格
				price2:'',
				remarks:'',
				_isopen:true,
				products_total: '',
				reduce_money: "",
				is_subtraction: 1,
				reduce_name: "",
				pro: '', //购买商品列表
				user_money: '', //账户余额
				user_score:'', //账户积分
				needpay: '', //还需支付
				ishide:0,//是否隐藏底部支付栏 1隐藏 0不隐藏
				canpay: false,
				mask_value: '',
				orde_id: '',
				addre_id: '',
				or_id: '',
				sNo: '',
				num: '',
				access_id: '',
				digits: ['', '', '', '', '', ''], //input框位数控制,这里可以配置多少个“输入框”
				msg: '',
				msgLength: 0,
				page: 0,
				pay_display: false, //支付密码框显示
				password_status: '', //判定是否已经设置支付密码
				password_display: false, //前往设置支付密码提示框
				use_coupon: false,
				freight: '',
				freightt: '',
				name: '',
				channel: '',
				erroTime: 0,
				enterless: true,
				cart_id: "",
				address_id: "",
				focus: true,
				providerList: '',
				address: '',
				aliPayStatue: false,
				wxPayStatue: false,
				fastTap: true,
				total: '',
				h5_content: '',
				code: '',
				myappid: '',
				firstFlag: true,
				head: true, //头部切换
				can_pay:true,
				oldheight:'',
				buy_again:'',//是否为再次购买 true 是  false 否
				shop_status:'',
				shop_address_id:'',
				shop_list:[],
				jifen_id:'',
				
				payTop:'', //兑换按钮的定位
			}
		},
		onLoad(option) {
			this.afhalen_translateX = uni.upx2px(2)
			let me = this;
			
			uni.getSystemInfo({
			    success: function (res) {
			        me.payTop=res.windowHeight-uni.upx2px(100)
			    }
			});
			
			me.jifen_id = option.id
			me.$store.state.address_id = me.$store.state.address_id_def
			
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me._axios();
				});
			});
		},
		onShow() {
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me._axios('onshow>>');
				});
			});
			me.address_id = me.$store.state.address_id
		},
		methods: {
			iptFoucs(){
				this.payPosition = 'initial'
			},
			iptBlur(){
				this.payPosition = 'fixed'
			},
			/**
			 * 
			 * */
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios("==");
			},
			/**
			 * 
			 * */
			_hide(){
				this.ishide = 1
			},
			/**
			 * 
			 * */
			_show(){
				this.ishide = 0
				
				if(this.value.length == 0){
					this.value = 0
				}
			},
			/**
			 * 
			 * */
			_back(){
				uni.navigateBack({
					delta:1
				})
			},
			/**
			 * 
			 * */
			toUrl() {
				this.laikepay.toUrl(this)
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
				laikeUseyue(this);
			},
			/**
			 * 
			 * */
			payThree() {
				laikePayThree(this);
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
				}, 500);
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
				//选择支付方式
				laikeChooseWay(this,way);
			},
			/**
			 * 
			 * */
			switchChange(e) {
				laikeSwitchChange(e,this);
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
				return this.laikepay.getOrderInfo(this,type);
			},
			/**
			 * 
			 * */
			weixinPay() {
				this.laikepay.weixin_minipay(this);
			},
			/**
			 * 
			 * */
			pay_wx(type) {
				this.laikepay.laikePayMain(this,type)
			},
			/**
			 * 弹出优惠券选择层
			 * */
			_coupon() {
				laikeShowCoupon(this);
			},
			/**
			 * 
			 * */
			_closeCoupon() {
				//关闭优惠券选择层
				laikeCloseCoupon(this);
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
			_coupon_use(index, id, coupon_status) {
				laikeChooseCoupon(this,index, id, coupon_status);
			},
			/**
			 * 
			 * */
			focust() {
				this.focus = true
			},
			/**
			 * 导出状态方法
			 * */
			...mapMutations({
				order_id: 'SET_ORDER_ID',
				status: 'SET_STATUS',
				h_content: 'SET_H_CONTENT',
			}),
			/**
			 * 立即支付
			 * */
			_pay_style() {
				
				var me = this
				if(!me.adds_f){
					uni.showToast({
						title: '请完善收货地址！',
						icon: 'none'
					});
					return;
				}
				
				if(parseFloat(me.user_money) < parseFloat(me.pro.money)){
					uni.showToast({
						title: '余额不足，无法兑换！',
						icon: 'none'
					});
					return;
				}
				
				if(parseFloat(me.user_score) < parseFloat(me.pro.integral)){
					uni.showToast({
						title: '积分不足，无法兑换！',
						icon: 'none'
					});
					return;
				}
				
				if(me.password_status == '1'){
					me.pay_display = true
				}else{
					me.password_display = true
				}
			},
			/**
			 * 支付密码框确认
			 * */
			_confirm() {
				
				var me = this
				if (!me.fastTap) {
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
						title: '您的密码输入错误次数已达当日上限！',
						duration: 1000,
						icon: 'none'
					})
					me.pay_display = false;
				}
			},
			
			confirm(payNum){
				this.msg = payNum
				this._confirm()
			},
			/**
			 * 支付密码框取消
			 * */
			_cancel() {
				this.pay_display = false
			},
			/**
			 *
			 * */
			_payAxios(){
				var me = this
				if (!me.fastTap) {
					return
				}
				me.fastTap = false
				var data = {
					module: 'app',
					action: 'integral',
					app: 'payment',
					access_id: me.access_id,
					address_id: me.address_id ? me.address_id : me.addre_id,
					jifen_id: me.jifen_id,
					store_type:2
				}
				// #ifdef MP
				data.store_type = 1
				// #endif
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log('--------------------paysuccess')
						console.log(res)
						me.fastTap = true
						uni.hideLoading()
						if(res.data.code == 200){
							uni.showToast({
								title: "支付成功",
								icon: 'none'
							})
							me.order_list = res.data
							setTimeout(function() {
								uni.setStorageSync("payRes", me.order_list);
								uni.redirectTo({
									url: "../../pages/pay/payResult?is_jifen=true"
								})
							}, 1000);
						}else if(res.data.code == 110){
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}else{
							uni.showToast({
								title: '兑换失败，请重试！',
								duration: 1500,
								icon: 'none'
							})
						}
					},
					error: function(err) {
						console.log('--------------------payerr')
						console.log(err)
						me.fastTap = true
						uni.hideLoading()
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
			},
			/**
			 * 节奏遮罩层传值
			 * */
			_mask_value(mask_value) {
				this.mask_value = mask_value;
				if (mask_value == '确认') {
					if (this.pay_style == 3) {
						//第三方接口，传的金额为余额抵扣后的金额，扣款成功调用余额抵扣接口
						this._deduction()
					}
				}
			},
			/**
			 * 节奏遮罩层传值
			 * */
			_axios(type='') {
				var me = this;
				var data = {
					module: "app",
					action: "integral",
					app: "integral_axios",
					access_id: this.access_id,
					id: me.jifen_id,
					address_id:me.address_id,
				}
				uni.request({
					data,
					url:  uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						if(res.data.code != 200){
							me.load = false;
							uni.showToast({
								title: '交易异常',
								icon: 'none'
							});
							return;
						}
						let {
							data: {
								addemt,
								address,
								freight,
								password_status,
								products,
								total,
								user_money,
								user_score,
								enterless,
							}
						} = res
						console.log('==============load============')
						me.address = address
						me.price = total
						me.total = total
						me.pro = products
						me.pro.money = parseFloat(me.pro.money);
						me.user_money = user_money
						me.user_score = user_score
						me.addre_id = address.id
						if(!me.$store.state.address_id_def){
							me.$store.state.address_id_def = address.id
						}
						me.password_status = password_status
						me.enterless = enterless
						if (me.user_money > me.total) {
							me.canpay = true
						}
						if (me.address) {
							if (me.address.length != 0) {
								me.adds_f = true
							} else {
								me.adds_f = false
							}
						}
						if(res.data.shop_status && res.data.shop_list){
							me.shop_status = res.data.shop_status
							me.shop_list = res.data.shop_list
							if(res.data.shop_list.length == 0){
								me.shop_address_id = ''
								uni.setStorageSync("shop_address_id",'')
							}else{
								me.shop_address_id = res.data.shop_list.id
								uni.setStorageSync("shop_address_id",res.data.shop_list.id)
							}
						}
						
						me.freightt = parseFloat(freight);
						me.freight = freight;
						me.load = false
						console.log('==============load over============')
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			/**
			 * 节奏遮罩层传值
			 * */
			changeValue(newValue, oldValue) {
				var me = this
				laikeChangeValue(me,newValue,oldValue);
			},
		},
		components: {
			heads,
			Maskm,
			wxParse,
			paymodel
		},
		watch: {
			/**
			 *
			 * */
			address_id(n,o) {
				if(o){
					this._axios("address");
				}
			},
			/**
			 *
			 * */
			msg(curVal) {
				this.msgLength = curVal.length;
			},
			/**
			 *
			 * */
			'page': {
				handler: function(newValue, oldValue) {
					if (oldValue == 0 && newValue == 1) {
						//第一次进入页面，自动获得焦点，这里可优化。
						this.timer = setTimeout(() => {}, 500);
					}
				},
				deep: true
			},
			/**
			 *
			 * */
			freight:function(){
				var me = this;
				me.price1 = me.products_total * me.discount*me.grade_rate + me.freight - me.coupon_name - me.reduce_money
				me.price2 = me.price1.toFixed(2)
				console.log("当前运费为："+me.freight);
				console.log("当前user_money为："+me.user_money);
				console.log("当前所有计算金额为："+me.products_total+"==="+me.discount+"==="+me.freight+"==="+me.coupon_name+"==="+me.reduce_money);
				console.log("当前price2为："+me.price2);
				if(me.useWallte){
					if(Number(me.user_money) > Number(me.price2)){
						console.log('me.value11111111111111111');
						console.log(me.value);
						me.value = me.price2
						console.log(me.value);

					}else{
						me.needpay = me.price2 - me.value;
					}
				}
				if(me.price2 < 0 ){
					me.price2 = 0.01
				}
				let should_pay = this.products_total*this.grade_rate + this.freight - this.coupon_name - this.reduce_money
				console.log(should_pay);
				//当交易金额小于等于0时,终止交易
				if( should_pay < 0 ){
					uni.showToast({
						title: '异常交易',
						icon: 'none',
						duration: 1500
					});
					uni.navigateBack({
						delta:1
					})
				}
				me.needpay = me.price2 - me.value;
			},
			/**
			 *
			 * */
			coupon_name: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
			/**
			 *
			 * */
			value: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
			/**
			 *
			 * */
			price1: function(newValue, oldValue) {
				var me = this
				this.$nextTick(function() {
					me.price1 = me.products_total * me.discount*me.grade_rate + me.freight - me.coupon_name - me.reduce_money - me.value
					me.price1 = Number(me.price1).toFixed(2)
					me.needpay = me.price1
				})
			},
		},
	}
</script>


<style scoped>
	@import url("../../static/css/pay/orderDetailsr.css");
	/* 上面用的是公共的CSS */
	#foot{
		bottom: 0;
		border: 0;
		height: auto;
		padding-left: 0;
	}
	.gopay{
		border: 0;
		height: 100upx;
	}
</style>
