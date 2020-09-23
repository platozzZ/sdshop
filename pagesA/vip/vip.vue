<template>
	<view class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title' returnR='7'></heads>
		<swiper class="screen-swiper wx-height" :indicator-dots="swiper_dots" :circular="true" :autoplay="autoplay" interval="5000"
		 duration="500" @change="swipeChange" :style="'height:'+swiHeight">
			<template v-for="(item,index) in swiperList">
				<swiper-item v-if="flag!=2||(flag==2&&item.name==grade)" :key='index'>
					<div class='vip-card'>
						<!-- 开通会员卡面 -->
						<div class='relative'>
							<image :src="item.imgurl" mode="widthFix" class='vip-card-img'></image>
							<div class='vip-card-top'>
								<div class='vip-card-name align-center'>
									<img class='img' :src="item.imgurl_s">
									<span class='vip-level' :style="'color:'+item.font_color">{{item.name}}</span>
								</div>
								<div class='vip-card-bottom'>
									<span class='price' :style="'color:'+item.font_color">{{item.money_n ? item.money_n : item.money_j ? item.money_j : item.money ? item.money : 0}}</span>
									<span class='msg' :style="'color:'+item.font_color">开通{{item.name}}，预计最高可省{{item.level==1?'980':item.level==2?'1980':'2980'}}元/年</span>
								</div>
							</div>
						</div>
						<!-- 权益说明 -->
						<div class='vip-desc'>
							<div class='head'>
								<span class='tag head-tag'>专属</span>
								<span class='head-msg'>开通即享全场商品{{item.rate}}折优惠</span>
							</div>
							<div class='vip-profit'>
								<div v-for='(item, key) in vipRights[index]' :key='key' class='vip-profit-item'>
									<div class='align-center'>
										<div class='ball'>
											<img class='img' :src="item.image">
										</div>
										<span class='profit-item'>{{item.name}}</span>
									</div>
								</div>
								<!-- <div class='vip-profit-item' @tap="showModal" data-target="Modal">
									<div class='align-center'>
										<div class='ball'></div>
										<span class='profit-item'>更多权益</span>
									</div>
								</div> -->
							</div>
						</div>
				
						<!-- 开通按钮 -->
						<button class="btn" data-target="bottomModal" @tap="showModal">{{isfx==1?'开通':(flag==1?'开通':flag==2?'续费':'升级')}}</button>
				
						<!-- 底部弹窗 -->
						<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
							<view class="cu-dialog bottom-modal-data">
								<view class="cu-bar">
									<view class="content open-title">{{flag==1?'开通':flag==2?'续费':'升级'}}{{item.name}}</view>
									<view class="action" @tap="hideModal">
										<image class='img' :src="close2ximg"></image>
									</view>
								</view>
								<view>
									<radio-group class="block" @change="RadioChange">
										<view v-if='item.money' class="cu-form-group">
											<div class='align-center'>
												<radio class="vipTime-radio" color='#000' :checked="radio=='month'?true:false" value="month" @tap="selectPayAble"
												 :data-target="item.money"></radio>
												<view class="title">
													<span class='top'>{{flag==3?'':'月卡'}}{{item.name}}</span>
													<span>{{flag==3?'':'享一月'}}会员特权</span>
												</view>
											</div>
											<span class='open-price'>{{item.money}}元</span>
										</view>
										<view v-if='(!item.money_up)&&item.money_j' class="cu-form-group">
											<div class='align-center'>
												<radio class="vipTime-radio" color='#000' :checked="radio=='season'?true:false" value="season" @tap="selectPayAble"
												 :data-target="item.money_j"></radio>
												<view class="title">
													<span class='top'>季卡{{item.name}}</span>
													<span>享一季会员特权</span>
												</view>
											</div>
											<span class='open-price'>{{item.money_j}}元</span>
										</view>
										<view v-if='(!item.money_up)&&item.money_n' class="cu-form-group">
											<div class='align-center'>
												<radio class="vipTime-radio" color='#000' :checked="radio=='year'?true:false" value="year" @tap="selectPayAble"
												 :data-target="item.money_n"></radio>
												<view class="title">
													<span class='top'>年卡{{item.name}}</span>
													<span>享一年会员特权</span>
												</view>
											</div>
											<span class='open-price'>{{item.money_n}}元</span>
										</view>
									</radio-group>
									<span class='open-pact'>
										点击{{flag==1?'立即开通':flag==2?'立即续费':'立即升级'}}按钮即代表已同意
									<span  @tap="_toGradeUse">《来客会员服务协议》</span>	
									</span>
									<div class='btn-bottom' data-target="showPay" @tap="showModal">{{flag==1?'立即开通':flag==2?'立即续费':'立即升级'}}</div>
								</view>
							</view>
						</view>
					</div>
				</swiper-item>
			</template>
		</swiper>
		<!-- 会员权益弹窗 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar cu-bar-end">
					<view class="content">会员权益</view>
					<view class="action" @tap="hideModal">
						<text class="">关闭</text>
					</view>
				</view>
				<div class='vip-profit vip-profit1'>
					<div v-for='(item, key) in 12' :key='key' class='vip-profit-item'>

					</div>
				</div>
			</view>
		</view>
		<!-- 开通协议弹窗 -->
		<ruleModal v-model="isShow" @click="_toGradeUse" title="使用规则" :details="rule" />
		
		<!-- 支付方式弹窗 -->
		<view class="cu-modal" :class="modalName=='showPay'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar cu-bar-end">
					<view class="content">支付方式</view>
					<view class="action" @tap="hideModal">
						<text class="">关闭</text>
					</view>
				</view>
				<div class='vip-profit1'>
					<radio-group class="block" @change="PayRadioChange">
						<!-- #ifdef MP-WEIXIN || H5 || APP-PLUS -->
						<view class="cu-form-group" v-if="isshow(1)">
							<view class="pay-title">
								<image :src="wxpay_icon" mode="widthFix"></image>
								<span>微信支付</span>
							</view>
							<radio color='#000' :checked="pay=='wechat'?true:false" value="wechat"></radio>
						</view>
						<!-- #endif -->
						<!-- #ifdef  APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
						<view class="cu-form-group" v-if="isshow(2)">
							<view class="pay-title">
								<image :src="alipay_icon" mode="widthFix"></image>
								<span>支付宝支付</span>
							</view>
							<radio color='#000' :checked="pay=='alipay'?true:false" value="alipay"></radio>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-BAIDU -->
						<view class="cu-form-group" v-if="payment.baidu_pay==1">
							<view class="pay-title">
								<image :src="bdpay_icon" mode="widthFix"></image>
								<span>百度支付</span>
							</view>
							<radio color='#000' :checked="pay=='baidu'?true:false" value="baidu"></radio>
						</view>
						<!-- #endif -->
						<view v-if='isWallet==1' class="cu-form-group">
							<view class="pay-title">
								<image :src="yue_icon" mode="widthFix"></image>
								<span>余额支付</span>
							</view>
							<radio color='#000' :checked="pay=='yue'?true:false" value="yue"></radio>
						</view>
					</radio-group>
				</div>
				<view class="cu-bar bg_white">
					<view class="action flex1 m_0" @tap="hideModal">取消</view>
					<view class="action solid-left flex1 m_0" @tap="getOrder">确定</view>
				</view>
			</view>
		</view>

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
	</view>
</template>

<script>
	import Heads from '../../components/header.vue'
	import ruleModal from '@/components/ruleModal.vue'
	import {
		getStorage
	} from '../../common/storage.js'
	import {
		mapMutations
	} from 'vuex'
	import lktauthorize from '../../components/lktauthorize.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import paymodel from '@/components/paymodel.vue'
	export default {
		data() {
			return {
				fromVip:1,
				payment: '',
				access_id: '',
				flag: 1, //控制是开通还是续费1开通，2续费，3升级
				swiperList: [],
				dotStyle: false, //swipe组件下方圆点
				modalName: null, //弹窗名称
				autoplay: true, //swipe自动切换
				radio: 'month', //会员天数
				pay: 'yue', //支付方式
				swiper_dots: true, //swipe组件圆点的显示
				title: '来客会员', //页面标题
				payable: 0, //需支付金额
				code: '', //H5刷新页面
				level_id: 0, //等级id
				pay_display: false, //支付密码框显示
				password_status: '', //判定是否已经设置支付密码
				password_display: false, //前往设置支付密码提示框
				rule: '', //规则
				focus: false,
				isfocus: true,
				digits: ['', '', '', '', '', ''], //input框位数控制,这里可以配置多少个“输入框”
				msg: '', //消息提示
				msgLength: 0,
				isPassWord: 0, //是否有密码
				isWallet: 0, //是否支持余额支付
				wxpay_icon: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/vip/wechat.png',
				alipay_icon: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/vip/alipay.png',
				bdpay_icon: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/baiduzhifu2x.png',
				yue_icon: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/vip/yue.png',
				close2ximg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/close2x.png",
				code: '',
				isfx: 0,
				is_open: '',
				grade: '',
				_confirmFlag: false, //控制余额支付确认按钮只能按一次
				isShow:false,//会员制规则框是否显示

				// 以下为各会员权益，测试版
				vipRights: [
					[{
						name: '全场9.0折', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '专属活动', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '专属活动', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, ],
					[{
						name: '全场8.0折', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '专属活动', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '专属活动', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, ],
					[{
						name: '全场7.0折', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '专属活动', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '专属活动', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, ],
					
				]
			}
		},
		components: {
			Heads,
			wxParse,
			ruleModal,
			paymodel
		},
		computed:{
			swiHeight(){ //百度小程序中轮播图的高度
				let height = ''
				//#ifdef MP-BAIDU
				const info=uni.getSystemInfoSync()
				height = (info.screenHeight - info.statusBarHeight - uni.upx2px(88)) + 'px'
				// #endif
				return height
			},
		},
		onLoad(option) {
			if (option.data) {
				let data = JSON.parse(option.data)
				uni.setStorageSync('isfx', data.isfx)
				uni.setStorageSync('tui_id', data.tui_id)
			}
		},
		onShow() {
			var me = this
			if (uni.getStorageSync('edit_flag')) {
				this.flag = uni.getStorageSync('edit_flag')
				this.grade = uni.getStorageSync('edit_grade')
			}
			if (uni.getStorageSync('isfx')) {
				this.isfx = uni.getStorageSync('isfx')
			}
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			
			me.LaiKeTuiCommon.getUrlFirst().then(res=>{
				me._axios();
			})
			
			// #ifdef H5 
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
				this.toUrl();
			}
			// #endif
			this.pay_display = false;
		},
		onUnload() {
			uni.removeStorageSync('isfx')
			uni.removeStorage('tui_id')
			console.log(1521521)
		},
		watch: {
			msg(curVal) {
				this.msgLength = curVal.length;
				console.log(this.msg)
			},
		},
		methods: {
			/**
			 * 失焦关闭
			 * */ 
			onblur(){
				setTimeout(() => {
					this._cancel()
				},500)
			},
			/**
			 * 判断支付是否显示
			 * type 1.微信 2.支付宝
			 * */
			isshow(type){
				var me = this
				if(type == 1){
					// #ifdef APP-PLUS
					if(me.payment.app_wechat == 1){
						return true;
					}
					// #endif
					// #ifdef H5
					if(me.payment.jsapi_wechat == 1){
						return true;
					}
					// #endif
					// #ifdef MP-WEIXIN
					if(me.payment.mini_wechat == 1){
						return true;
					}
					// #endif
					me.pay= 'wechat';
					return false;
				}else{
					console.log('====>');
					console.log(me.payment);
					// #ifdef APP-PLUS
					if(me.payment.alipay == 1){
						return true;
					}
					// #endif
					// #ifdef MP-ALIPAY
					if(me.payment.alipay_minipay == 1){
						return true;
					}
					// #endif
					// #ifdef MP-TOUTIAO
					if(me.payment.tt_alipay == 1){
						return true;
					}
					// #endif
					return false;
				}
			},
			showModal(e) {
				let me = this;
				//ios不支持虚拟支付
				let flag = me.LaiKeTuiCommon.ttIOSCantVisualpay();
				if(!flag){
					return;
				}
				
				if (this.is_open == 1 && this.isfx == 1) {
					uni.showToast({
						icon: 'none',
						title: '您已经是会员了'
					})
					return
				}
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					// 如果后台关闭余额支付，则默认微信支付
					if (me.isWallet != '1') {
						me.pay = 'wechat'
					}
					me.modalName = e.currentTarget.dataset.target
					me.autoplay = false
					me.swiper_dots = false
				})
			},
			_back1() { //登录后返回页面处理
				uni.showToast({
					title: '未登录，请先登录',
					icon: 'none',
					duration: 1500
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1'
					})
				}, 1000);
			},
			hideModal(e) {
				this.modalName = null,
				this.autoplay = this.swiper_dots = true
			},
			RadioChange(e) {
				this.radio = e.detail.value,
					this.payable = e.currentTarget.dataset.target,
					console.log(e)
			},
			selectPayAble(e) {
				this.payable = e.currentTarget.dataset.target,
					console.log('需支付' + this.payable)
			},
			swipeChange(e) {
				let i = e.detail.current,
					type = this.radio,
					that = this;
				switch (type) {
					case 'month':
						that.payable = that.swiperList[i].money,
							that.level_id = that.swiperList[i].id
						break;
					case 'season':
						that.payable = that.swiperList[i].money_j,
							that.level_id = that.swiperList[i].id
						break;
					case 'year':
						that.payable = that.swiperList[i].money_n,
							that.level_id = that.swiperList[i].id
						break;
					default:
						that.payable = ''
						break;
				}

			},
			PayRadioChange(e) {
				this.pay = e.detail.value,
					console.log(this.pay)
			},
			_payFail(){
				var me = this
				uni.showToast({
					title: '支付失败！',
					duration: 1000,
					icon: 'none',  
				});
				me.pay_display = false
				me.modalName = null
				return false
			},
			toUrl() {
				var me = this
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
			_axios() {
				var me = this
				var data = {
					access_id: me.access_id,
					module: 'app',
					action: 'recharge',
					app: 'upgrade',
					// #ifdef APP-PLUS || H5
					store_type: 2,
					// #endif
					// #ifdef MP
					store_type: 1,
					// #endif
				};
				// 如果是分享
				if (this.isfx) {
					this.flag = 1
				}
				if (this.flag == 3) {
					data.app = 'upgrade'
				} else {
					data.app = 'grade'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log('>>>>>>res<<<<<');
						console.log(res);
						if (res.data.code == 404) {
							me.access_id1 = false
						} else if (res.data.code == 200) {
							me.swiperList = res.data.data;
							if(me.swiperList ){
								for(var pos in me.swiperList){
									if(pos <= me.swiperList.length-1 ){
										if(me.vipRights[pos]){
											me.swiperList[pos].rate = Number(me.swiperList[pos].rate).toFixed(1)
											me.vipRights[pos][0]['name'] = '全场'+me.swiperList[pos].rate+'折';
											me.vipRights[pos][1]['name'] = '快速退货';
											me.vipRights[pos][2]['name'] = '活动专属';
											me.vipRights[pos][3]['name'] = '快速发货';
											me.vipRights[pos][4]['name'] = '其他优惠';
										}
									}
								}
							}
							
							me.isPassWord = res.data.is_password;
							me.isWallet = res.data.is_wallet;
							me.rule = res.data.rule;
							me.is_open = res.data.is_open
							me.payment = res.data.payment
							if (me.level_id == 0) {
								if (me.flag != 2) {
									me.level_id = me.swiperList[0].id
									me.payable = me.swiperList[0].money
									return
								}
								me.level_id = res.data.grade_id
								for (let i = 0; i < me.swiperList.length; i++) {
									if (me.level_id == me.swiperList[i].id) {
										me.payable = me.swiperList[i].money
									}
								}
							}
						}
					},
					error: function(err)
					{
						console.log('==err===>');
						console.log(err)
					}
				})
			},
			getOrder() {
				console.log("--------getOrder----------------------")
				let me = this,
					method = 0;
				var type = "";
				if (me.pay == 'yue') {
					if (me.isPassWord == 1) {
						me.pay_display = true,
							me.modalName = null,
							type = 'wallet_pay'
					} else {
						me.modalName = null,
							me.password_display = true
					}
				} else if (me.pay == 'alipay') {
					type = "aliPay";
					//#ifdef MP-TOUTIAO
					type = 'tt_alipay'
					// #endif
					// #ifdef MP-ALIPAY
					type = 'alipay_minipay'
					// #endif

				} else if (me.pay == 'wechat') {
					//#ifdef MP-WEIXIN
					type = "mini_wechat"
					//#endif

					//#ifdef APP-PLUS
					type = "app_wechat"
					//#endif

					//#ifdef H5
					type = "jsapi_wechat"
					//#endif
				} else if (me.pay == 'baidu') {
					//#ifdef MP-BAIDU
					type = "baidu_pay"
					//#endif
				}
				if (me.radio == 'month') {
					method = 1
				} else if (me.radio == 'season') {
					method = 2
				} else if (me.radio == 'year') {
					method = 3
				};
				//后台订单
				let data = {
					access_id: me.access_id,
					module: 'app',
					action: 'recharge',
					app: 'grade_order',
					id: me.level_id,
					type: type,
					method: method,
					total: me.payable,
					flag: me.flag,
				}
				if (me.flag == 1 && uni.getStorageSync('tui_id')) {
					data.tui_id = uni.getStorageSync('tui_id')
				}
				if (type != 'wallet_pay') {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							me.sNo = res.data.sNo
							me.title = res.data.title
							me.total = res.data.total
							me.order_list = JSON.stringify(res.data.order_list)
							if (type == 'mini_wechat') {
								me.pay_name = res.data.pay_type
								me.laikepay.weixin_minipay(me)
							} else if(type  == 'alipay_minipay'){
								//
								let data = {
									access_id: me.access_id,
									sNo: me.sNo,
									title: me.title,
									module: 'app',
									action: 'pay',
									type: 'alipay_minipay',
									total: me.total,
									store_type : 1
								}
								
								let p = me.LaiKeTuiCommon.getMPAliAuthCode();
								return p.then((authcode)=>{
									if(authcode){										
										data.alimp_authcode = authcode;
									}
									
									return new Promise((res) => {
										uni.request({
											url:  uni.getStorageSync("url"),
											data,
											success: (result) => {
												if (result.statusCode == 200) {
													// #ifdef MP-ALIPAY
													let tno = result.data;													
													me.laikepay.alipay_minipay(me, tno.substr(1,tno.length));
													// #endif
												} else {
													uni.showToast({
														title: result.data.message,
														duration: 1500,
														icon: 'none'
													});
												}
											},
											fail: (e) => {
												let tno = e.data;												
												me.laikepay.alipay_minipay(me, tno.substr((tno.indexOf("s")+1),(tno.length-4)));
											}
										})
									})
								})
							} else if (type == 'app_wechat') {
								me.pay_name = res.data.pay_type;
								data = {
									access_id: me.access_id,
									title: me.title,
									module: 'app',
									action: 'pay',
									type: 'app_wechat',
									total: me.total,
									sNo: me.sNo,
									order_list: me.order_list
								}
								//请求代码
								uni.request({
									data,
									url: uni.getStorageSync("url"),
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									method: 'POST',
									success: (res) => {
										me.sNo = res.data.sNo
										me.title = res.data.title
										me.laikepay.app_pay(me, 'wxpay', res)
									},
									error: function(err) {
										console.log(err)
									}
								})
							} else if (type == "jsapi_wechat") {
								me.pay_name = res.data.pay_type;
								// H5微信支付
								let data = {
									access_id: me.access_id,
									title: me.title,
									module: 'app',
									action: 'pay',
									type: 'jsapi_wechat',
									total: me.total,
									sNo: me.sNo,
									code: me.code
								}
								uni.request({
									data,
									url: uni.getStorageSync("url"),
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									method: 'POST',
									success: (res) => {
										me.sNo = res.data.sNo
										me.title = res.data.title
										me.laikepay.weixin_jsapipay(me, 'wx', res)
									},
									error: function(err) {
										console.log(err)
									}
								})
							} else if (type == "aliPay") {
								me.pay_name = res.data.pay_type;
								let data = {
									access_id: me.access_id,
									title: me.title,
									module: 'app',
									action: 'pay',
									type: 'aliPay',
									total: me.total,
									sNo: me.sNo,
									order_list: me.order_list
								}
								uni.request({
									data,
									url: uni.getStorageSync("url"),
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									method: 'POST',
									success: (res) => {
										me.sNo = res.data.sNo
										me.title = res.data.title
										me.laikepay.app_pay(me, 'alipay', res)
									},
									error: function(err) {
										console.log(err)
									}
								})
							} else if (type == "tt_alipay") {

								let data = {
									access_id: me.access_id,
									title: me.title,
									module: 'app',
									action: 'pay',
									type: 'tt_alipay',
									total: me.total,
									sNo: me.sNo,
									order_list: me.order_list
								}

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
									return new Promise((laikeOK, fail) => {
										uni.request({
											url: uni.getStorageSync("url"),
											data,
											header: {
												'content-type': 'application/x-www-form-urlencoded'
											},
											success: function(res) {
												me.laikepay.tt_pay(me,res)
											},
											error: function(err) {
												console.log(err)
											},
											fail: function(e) {

												console.log(e);
											}
										})
									})
								})
							} else if (type == "baidu_pay") {
								me.pay_name = res.data.pay_type;
								let data = {
									access_id: me.access_id,
									title: me.title,
									module: 'app',
									action: 'pay',
									type: 'baidu_pay',
									total: me.total,
									sNo: me.sNo,
									order_list: me.order_list
								}
								uni.request({
									data,
									url: uni.getStorageSync("url"),
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									method: 'POST',
									success: (res) => {
										console.log("--------baidu_pay-------------------")
										me.sNo = res.data.sNo
										me.title = res.data.title
										me.hideModal()
										me.laikepay.baidu_pay(me, res)
									},
									error: function(err) {
										console.log(err)
									}
								})
							}
						},
						error: function(err) {
							console.log(err)
						}
					})

				}
			},

			// 设置密码跳转
			_password_status() {
				uni.navigateTo({
					url: '../../pagesB/setUp/payment'
				});
				this.password_display = false
			},
			focust() {
				this.focus = true
			},

			//支付密码框取消
			_cancel() {
				var me = this
				me.pay_display = false
				me.msg = ""
				me._confirmFlag = false
			},
			//余额支付密码框确认
			_confirm() {
				if (this._confirmFlag) {
					return
				}
				this._confirmFlag = true
				let me = this,
					method = 0,
					type = "wallet_pay";
				if (me.radio == 'month') {
					method = 1
				} else if (me.radio == 'season') {
					method = 2
				} else if (me.radio == 'year') {
					method = 3
				};
				if (this.msg.length == 6) {
					let data = {
						access_id: me.access_id,
						module: 'app',
						action: 'recharge',
						app: 'grade_order',
						id: me.level_id,
						type: type,
						method: method,
						total: me.payable,
						password: me.msg,
						flag: me.flag
					}
					if (me.flag == 1 && uni.getStorageSync('tui_id')) {
						data.tui_id = uni.getStorageSync('tui_id')
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							if (res.data.code == 109) {
								uni.showToast({
									title: res.data.msg,
									duration: 1000,
									icon: 'none'
								})
								me._confirmFlag = false
							} else if (res.data.code == 200) {
								uni.removeStorage('tui_id')
								uni.showToast({
										title: '支付成功',
										duration: 2000,
										icon: 'none'
									}),
									setTimeout(function() {
										uni.navigateTo({
											url: '../../pagesA/vipClub/vipClub'
										});
									}, 2000);
							}
						},
						error: function(err) {
							me._confirmFlag = false
							console.log(err)
						}
					})
				} else {
					me._confirmFlag = false
					uni.showToast({
						title: '请输入完整密码！',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			confirm(payNum){
				this.msg = payNum
				this._confirm()
			},
			//规则框弹出
			_toGradeUse(){
				this.isShow = !this.isShow
			},
		},
	}
</script>

<style scoped>
	@import url("../../static/css/vip/vip.css");
</style>
