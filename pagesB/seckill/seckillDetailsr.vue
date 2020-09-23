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
			<!-- 显示地址 -->
			<div class='address_one' @tap="_uni_navigateTo('../../pages/address/receivingAddress?state_manage=1&addre_id='+address.id)"
			 v-if='adds_f'>
				<div class='address_one_data'>
					<span class='address_name'>{{address.name}}</span>
					<span class='address_tel'>{{address.tel}}</span>
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
			<div class='hr'></div>
			<!--商品列表-->
			<div>
				<ul v-for='(items,indexs) in pro' :key='indexs'>
					<li v-if='items.shop_id' class='storeLi'>
						<img :src="storeImg" class='store_img'>{{items.shop_name}}
						<img :src="jiantou" class='store_jian'>
					</li>
					<li class='goods' v-for="(item,index) in items.list" :key='index'>
						<img :src="item.img" />
						<div class='goods_right'>
							<p>{{item.product_title}}</p>
							<div class='goods_bottom'>
								<p><span class='goods_bottom_price'>￥</span>{{item.price}}</p>
								<div class='format'>
									<p class='format_name'>规格：{{item.color?item.color:''}}{{item.name?item.name:''}}{{item.size?item.size:''}}</p>
									<p class='format_num'>x{{item.num}}</p>
								</div>
							</div>
						</div>
					</li>
					<div class='hr'></div>	
				</ul>
			</div>
			<!--运费、优惠券、合计信息-->
			<ul>
				<li class='order_coupon' v-if="grade_rate != 1">
					<span>会员等级折扣</span>
					<span>{{grade_rate*10}}折</span>
				</li>
				<li class='order_coupon'>
					<span>运费</span>
					<span v-if="freightt==0">包邮</span>
					<span v-else>￥{{freightt}}</span>
				</li>
				<li class='order_coupon' >
					<span>订单备注</span>
					<span class='order_coupon_disc'><input type="text" v-model="remarks" placeholder="选填，请先和商家协商一致" placeholder-style="color:#b8b8b8;font-size:28upx"></span>
				</li>
				<li class='order_coupon'>
					<span></span>
					<span class='order_coupon_heji'>
						合计：<font class='order_coupon_price2'>￥{{price2}}</font>
					</span>
				
				</li>
			</ul>
			
			<!--灰色间隔-->
			<div class='hr'></div>
			<!--支付方式-->
			<ul style=''>
				<li class='pay'>
					<div class='w_100'>
						<!-- 余额支付开始 -->
						<div class="pay_yue">
							<div class='pay_yue_data'>
								<div>
									<p class='width_400'>
										<font class='yue_money'>余额支付</font><span :class="user_money>0?'btn1':'btn2'">(余额￥{{user_money}})</span>
									</p>
								</div>
							</div>
							<switch id="isyue" v-if="user_money>0" @change="switchChange" color='#4CD864' />

						</div>
						<div v-if="useWallte" class='deco'>
							<div class='use_yue'>使用余额</div>
							<div class='digit_box'>
								<input class='digit_ipt' :value="value" type='digit' @focus="_hide()" @blur="_show()" @input="replaceInput" placeholder="请输入抵扣金额">
							</div>
						</div>
						<!-- 余额支付结束 -->
					</div>
				</li>
				<li class='hr'></li>
				<div v-if="needpay > 0" >
					<li class='order_coupon'>
						<span class='yue_money'>还需支付</span>
						<span>￥{{needpay}}</span>
					</li>
				
					<!-- #ifdef MP-BAIDU -->
					<li class='pay' @tap='chooseWay("baidu")'>
						<div style="width: 100%;">
							<div class="pay_yue" style="position: relative;width: 100%;justify-content: space-between;">
								<div style='display: flex;align-items: center;'>
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
					<!-- 微信支付 -->
					<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
					<li class='pay' @tap='chooseWay("wxPay")'>
						<div class='w_100'>
							<div class="pay_yue">
								<div class='pay_yue_data'>
									<img class='pay_img' :src="pay_w" alt="">
									<div class='ml_30'>
										<p class='width_400'>
											微信支付
										</p>
									</div>
								</div>
								<img class='quan_img' :src="wxPayStatue?quan_hei:quan_hui" />
							</div>
						</div>
					</li>
					<!-- #endif -->
					
					<!-- 支付宝支付 -->
					<!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
					<li class='pay' @tap='chooseWay("aliPay")'>
						<div class='w_100'>
							<div class="pay_yue">
								<div class='pay_yue_data'>
									<img class='pay_img' :src="pay_z" alt="">
									<div class='ml_30'>
										<p class='width_400'>
											支付宝支付
										</p>
									</div>
								</div>
								<img class='quan_img' :src="aliPayStatue?quan_hei:quan_hui" />
							</div>
						</div>
					</li>
					<!-- #endif -->
				</div>
			</ul>
			<div class='foot' id='foot' :class='ishide==1?"hide":""'>
				<div>
					<p class='foot_price2'>付款金额：￥{{price2}}</p>
				</div>
				<p @tap="_pay_style()">立即支付</p>
			</div>
		</div>
		<!-- 高度屏幕小的时候解决选择不到微信支付的问题 -->
		<div class='xp_hr'></div>
		<!--余额支付密码框-->

		<paymodel v-model="pay_display" @success="_confirm" @cancel="_cancel"/>
		<!--没有设置支付密码提示框-->
		<div class='payment_pass' v-if="password_display">
			<div class='payment_c'>
				<div class='payment_ww'>无支付密码，前往设置！</div>
				<div class="payment_tt payment_boo" @tap="_password_status">
					去设置
				</div>
			</div>
		</div>
		<!--  优惠券    -->
		<div class='copon_div' v-if="use_coupon">
			<ul class='coupon_ul'>
				<li class='coupon_sue' v-for="(item,index) in coupon_list" @tap="_coupon_use(index,item.id,item.coupon_status)"
				 :key='item.id'>
					<span v-if="item.activity_type == 1" v-text="item.name+':免邮'"></span>
					<span v-else v-text="item.name=='不使用优惠券'?'不使用优惠券':item.name+':优惠'+item.money+'元'+item.coupon_name"></span>
					<img class='coupon_img' :src="item.id==coupon_id?quan_hei:quan_hui" />
				</li>
			</ul>
			<div class="copou_close" @tap="_closeCoupon">关闭</div>
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
	
	import {laikeUseyue,laikePayThree,
	laikeChooseWay,laikeSwitchChange,laikeChangeValue,
	laikeGetPayType,laikePayAtOnce,laikeShowCoupon,laikeCloseCoupon,laikeChooseCoupon 
	} from '../../static/js/pay/orderDetailsr.js'
	import paymodel from '@/components/paymodel.vue'

	export default {
		data() {
			return {
				order_no: '',
				bargain_id: '',
				order_list: '',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/store.png',
				showPayWay1: false,
				showPayWay: false,
				makeOrd: false,
				load: true,
				ycoupon_name: '',
				notWallte: false,
				useWallte: false,
				returnR:'',
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
				products_total: '',
				reduce_money: "",
				is_subtraction: 1,
				reduce_name: "",
				pro: '', //购买商品列表
				user_money: '', //账户余额
				needpay: '', //还需支付
				guanbiImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/close2x.png',
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/yuezhifu2x.png",
				pay_z: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
				pay_w: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/weixinzhifu2x.png',
				pay_b: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/lALPBb.png",
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehui2x.png",
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehei2x.png",
				zfb: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
				wx: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/weixinzhifu2x.png',
				yezf: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yuezhifu2x.png',
				pay_bd: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/baiduzhifu2x.png',
				ishide:0,//是否隐藏底部支付栏 1隐藏 0不隐藏
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
				otype:"MS",//定义为秒杀类型
				pay_display: false, //支付密码框显示
				password_status: '', //判定是否已经设置支付密码
				password_display: false, //前往设置支付密码提示框
				use_coupon: false,
				coupon_money: '', //优惠券金额
				coupon_list: '', //可使用优惠券
				coupon_id: [],
				coupon_name: '',
				coupon_name1: '',
				coupon_status:false,
				freight: '',
				freightt: '',
				name: '',
				channel: '',
				erroTime: 0,
				enterless: true,
				is_distribution:0,
				discount:1,//分销折扣
				grade_rate:1,//会员等级折扣
				cart_id: "",
				address_id: "",
				focus: true,
				providerList: '',
				address: '',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				aliPayStatue: false,
				wxPayStatue: false,
				baidupayStatue:false,
				fastTap: true,
				bind_id: "", //竞拍商品id
				total: '',
				bargain: false,
				seckill:true,
				h5_content: '',
				code: '',
				myappid: '',
				firstFlag: true,
				head: true, //头部切换
				back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				can_pay:true,
				oldheight:'',
				buy_again:'',//是否为再次购买 true 是  false 否
				activity_id:"",//秒杀活动id
				time_id:"",//时段id
				shop_address_id:'',
				payTitle:'',//支付商品标题
				platform_activities_id: ''
			}
		},
		beforeDestroy() {
			var me = this
			this.$store.state.order_id = ''
				uni.request({
				url:  uni.getStorageSync("url"),
				data: {
					module: 'app',
					app: "miaosha_ok",
					action: 'order',
					access_id: me.access_id,
					sNo: me.sNo,
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					console.log(res)
				}
			})
		},
		onLoad(option) {
			let me = this;
			me.access_id = uni.getStorageSync('access_id') || this.$store.state.access_id
			
			console.log("默认："+me.$store.state.address_id_def);
			console.log("缓存："+me.$store.state.address_id);
			
			me.$store.state.address_id = me.$store.state.address_id_def
			me.cpId = option.product
			me.activity_id = me.$store.state.seckilldata.activity_id
			me.platform_activities_id = me.$store.state.seckilldata.platform_activities_id
			
			console.log("============================================OPTION:"+me.cpId );
			console.log(option);
			me.returnR = option.returnR;
			console.log(me.returnR);

			if(option.buy_again == true || option.buy_again == 'true'){
				me.buy_again = true
			}
			
			// #ifndef MP-ALIPAY
			uni.onWindowResize((res) => {
				if(me.oldheight==''){
					me.oldheight = res.size.windowHeight
					me._hide()
				}else{
					if(Number(me.oldheight)<Number(res.size.windowHeight)) {
						me.oldheight = res.size.windowHeight
						me._show()
					} else if (Number(me.oldheight)==Number(res.size.windowHeight)) {
						me._show()
					} else {
						me._hide()
					}
				}
			})
			// #endif
			console.log(me.cpId);
			if(me.cpId){
				uni.setStorageSync("goodsInfo",me.cpId);
			}
			
			if(option.canshu){
				uni.setStorageSync("canshu",option.canshu)
			}
			me.order_no = option.order_no
			// #ifdef H5 
			//解决获取code后价格变为普通商品价格的问题
			if(option.product){
				var kanjia = JSON.parse(option.product)
				if (kanjia[5]) {
					console.log('========.bargain=========');
					console.log(kanjia);
					console.log(kanjia[5])
					me.order_no = kanjia[5].order_no?kanjia[5].order_no:me.order_no
				}
			}
			
			// #endif	
			me.orde_id = me.$store.state.order_id
			me.cart_id = me.$store.state.cart_id
			
			if( option.cart_id){
				me.cart_id = option.cart_id
				me.$store.state.cart_id = me.cart_id ;
			}
				
			// #ifdef H5 
			var storage=window.localStorage;
			if(storage['cart_id'] != null && storage['cart_id'] != ''){
				me.cart_id = storage['cart_id']
				storage['cart_id'] = ''
			}
			// #endif
			me.bind_id = me.$store.state.bindding_num
			
			uni.getProvider({
				service: "payment",
				success: (e) => {
					me.providerList = e.provider.map((value) => {
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
					});
				},
				fail: (e) => {
					console.log("获取支付通道失败：", e);
				}
			});
			
			me.$nextTick(function(){
				// #ifndef MP-ALIPAY
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
				// #endif
					// #ifndef H5
					me._axios();
					// #endif
				// #ifndef MP-ALIPAY
				});
				// #endif
			});
			
			// let me = this;
			me.$nextTick(function(){
				// #ifndef MP-ALIPAY
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
				// #endif
					me.orde_id = me.$store.state.order_id
					me.cart_id = me.$store.state.cart_id
					// #ifdef H5 
					var storage=window.localStorage;
					if(storage['cart_id'] != null && storage['cart_id'] != ''){
						me.cart_id = storage['cart_id']
						storage['cart_id'] = ''
					}
					// #endif
					me.address_id = me.$store.state.address_id
					me.$store.state.address_id = me.$store.state.address_id_def
					me.shop_address_id = uni.getStorageSync('shop_address_id')
					me.bind_id = me.$store.state.bindding_num
					me.firstFlag = true
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					var lkt_address_id_def = uni.getStorageSync("lkt_address_id_def");
					if(lkt_address_id_def){
						me.adds_f= true;
					}else if( me.$store.state.address_id_def == '' || me.$store.state.address_id_def == undefined ){
						me.adds_f = false;
					} else {
						me.adds_f= true;
					}
					
					// #ifdef H5 
					// H5打开微信支付
					var a = window.location.href;
					if (a.split('?').length > 1) {
						var str = a.split('?')[1]
						var arr = str.split('&')
						for(var i in arr){
							if( typeof arr[i] == "String" || typeof arr[i] == "string" ){
								if(arr[i].substring(0, 4)=='code'){
									str = arr[i].substring(5)
									me.code = str
								}
							}
						}
					}
					if (me.code == '') {
						me.toUrl();
					}
					// #endif
					me._axios();
				// #ifndef MP-ALIPAY
				});
				// #endif
			});
		},
		onUnload(){
			
		},
		onShow() {
			var me = this
			me._axios('onshow');
		},
		methods: {
			_yueInput(e){
				this.msg = e.detail.value
				if(e.detail.value.length==6){
					// 100毫秒延迟，保证msg的值已经变了
					setTimeout(()=>{
						debugger
						this.laikepay.laike_walletpay_ok(this)
					},100)
				}
			},
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios("==");
			},
			_hide(){
				console.log('hide1');
				this.ishide = 1
			},
			_show(){
				console.log('show2');
				this.ishide = 0
				if(this.value.length == 0){
					this.value = 0
				}
			},
			_back(){
				switch(this.returnR){
					case '1':
					uni.switchTab({
						url:'../tabBar/shoppingCart'
					});break;
					case '2':
					uni.navigateBack({
						delta:1
					});break;
					default:
					uni.switchTab({
						url:'../tabBar/home'
					})
				}
			},
			toUrl() {
				this.laikepay.toUrl(this);
			},
			replaceInput(event) {
				this.value = Math.abs(event.detail.value)
				this._usyue()
			},
			_usyue: function() {
				laikeUseyue(this);
			},
			payThree() {
				laikePayThree(this);
			},
			_showPayWay() {
				var me = this
				this.showPayWay1 = true
				setTimeout(function() {
					me.showPayWay = false
					me.showPayWay1 = false
				}, 500);
			},
			forgetPW() {
				uni.navigateTo({
					url: '../../pagesB/setUp/paymentPassword'
				})
			},
			chooseWay(way) {
				//选择支付方式
				laikeChooseWay(this,way);
			},
			switchChange(e) {
				laikeSwitchChange(e,this);
			},
			_uni_navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			getOrderInfo(type) {
				return this.laikepay.getOrderInfo(this,type);
			},
			weixinPay() {
				this.laikepay.weixin_minipay(this);
			},
			pay_wx(type) {
				this.laikepay.laikePayMain(this,type)
			},
			_coupon() {
				//弹出优惠券选择层
				laikeShowCoupon(this);
			},
			_closeCoupon() {
				//关闭优惠券选择层
				laikeCloseCoupon(this);
			},
			in_array(stringToSearch, arrayToSearch) {
				for (let s = 0; s < arrayToSearch.length; s++) {
					let thisEntry = arrayToSearch[s].toString();
					if (thisEntry == stringToSearch) {
						return true;
					}
				}
				return false;
			},
			_coupon_use(index, id, coupon_status) {
				laikeChooseCoupon(this,index, id, coupon_status);
			},
			focust() {
				this.focus = true
			},

			...mapMutations({
				order_id: 'SET_ORDER_ID',
				status: 'SET_STATUS',
				h_content: 'SET_H_CONTENT',
			}),
			
			//是否已经选择支付方式
			_gotPayType(){
				laikeGetPayType(this);
			},
			
			//立即支付
			_pay_style() {
				laikePayAtOnce(this);
			},

			//支付密码框确认
			_confirm(payNum) {
				this.msg = payNum
				this.laikepay.laike_walletpay_ok(this);
			},
			//支付密码框取消
			_cancel() {
				this.laikepay.laike_walletpay_cancel(this);
			},
			//余额支付请求
			_payAxios(type) {
				this.laikepay.laike_walletpay(this,type);
			},
			//跳设置支付密码页面
			_password_status() {
				uni.navigateTo({
					url: '../../pagesB/setUp/payment'
				});
				this.password_display = false
			},
			//节奏遮罩层传值
			_mask_value(mask_value) {
				this.mask_value = mask_value;
				if (mask_value == '确认') {
					if (this.pay_style == 3) {
						//第三方接口，传的金额为余额抵扣后的金额，扣款成功调用余额抵扣接口
						this._deduction()
					}
				}
			},
			_axios(type='') {
				console.log("_axios");
				var me = this;
				
				let cruitem = JSON.parse(this.cpId)[3]
				if(cruitem){}
				
				let product = uni.getStorageSync("goodsInfo");
					var data = {
						module: 'app',
						action: 'order',
						app: 'Settlement',
						product_type: 'MS',
						cart_id: this.cart_id,
						access_id: this.access_id,
						address_id: this.address_id,
						canshu:uni.getStorageSync("canshu"),
						sec_id: cruitem.sec_id
					}
					if (product) {
						data.product = product;
						data.cart_id='';
					}
				uni.request({
					data,
					url:  uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						if(res.data.status === 0 ){
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
								coupon_id,
								activity_id,
								time_id,
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
						// 砍价商品请求的数据
						let coupon_money = res.data.coupon_money || 0;
						let reduce_money = res.data.reduce_money || 0;
						me.address = address
						me.price = total
						me.total = total
						// me.activity_id = activity_id
						me.time_id = time_id
						console.log("me.activity_id:"+me.activity_id);
						console.log("me.time_id:"+me.time_id);
						me.pro = products
						me.payTitle = me.pro.product_title
						console.log("me.payTitle");
						console.log(me.payTitle);
						me.user_money = user_money
						if(address){
							me.addre_id = address.id;
						}
						
						if(!me.$store.state.address_id_def){
							me.$store.state.address_id_def = address.id
						}
						me.password_status = password_status
						if(type != 'onshow'){
							me.coupon_name = coupon_money
							me.coupon_id = coupon_id
							me.coupon_name1 = res.data.coupon_name
						}else{
							if(uni.getStorageSync('chooseAddress')){
								me.address = uni.getStorageSync('chooseAddress')
								me.addre_id=uni.getStorageSync('chooseAddress').id
							}
						}
						me.coupon_status = res.data.coupon_status

						me.name = name
						me.enterless = enterless
						me.is_distribution = is_distribution
						me.discount = discount?discount:1
						me.grade_rate = grade_rate?grade_rate:1
						me.reduce_money = reduce_money
						me.reduce_name = res.data.reduce_name
						me.is_subtraction = res.data.is_subtraction
						me.products_total = products_total
						if (me.user_money > me.total) {
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
						
						me.freightt = parseFloat(freight).toFixed(2);
						me.freight = freight;
						me.load = false
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			changeValue(newValue, oldValue) {
				var me = this
				laikeChangeValue(me,newValue,oldValue);

			},
		},
		onUnload() {
			if(uni.getStorageSync('chooseAddress')){
				uni.removeStorageSync('chooseAddress')
			}
		},
		components: {
			heads,
			Maskm,
			wxParse,
			paymodel
		},
		watch: {
			address_id(n,o) {
				if(o){
					this._axios("address");
				}
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
					should_pay = 0.01;
					// uni.showToast({
					// 	title: '异常交易',
					// 	icon: 'none',
					// 	duration: 1500
					// });
					// uni.navigateBack({
					// 	delta:1
					// })
				}
				me.needpay = me.price2 - me.value;
			},
			coupon_name: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
			value: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
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
	@import url("../../static/css/seckill/seckillDetailsr.css");
</style>