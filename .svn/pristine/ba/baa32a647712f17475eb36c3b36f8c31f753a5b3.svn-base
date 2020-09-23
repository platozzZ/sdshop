<template>
	<div class="box">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div class='recharge_ts'>充值以后可以使用余额进行交易支付</div>
		<div class='recharge_money'>
			<span class='span'>充值金额</span>
			<input placeholder-style="color: #b8b8b8;" type="digit" min="0.01" maxlength="9" :value="price" :placeholder="rechargeTitle"  @blur="_money" @input="_checkValue"/>
		</div>
		<ul class='choose_ul'>
			<li class='pay'>请选择支付方式</li>
			
			<!-- #ifdef APP-PLUS -->
			<li class='pay' @tap="_pay(0)" v-if="open_alipay">
				<div class='pay_div'>
					<img class='pay_img' :src="pay_zhifub"/>
					<p>支付宝</p>
				</div>
				<img class='quan_img'  :src="pay_index == 0? quan_hei: quan_hui"/>
			</li>
			
			<li class='pay' @tap="_pay(1)" v-if="open_wxpay">
				<div class='pay_div'>
					<img class='pay_img' :src="pay_weix"/>
					<p>微信支付</p>
				</div>
				<img class='quan_img'  :src="pay_index == 1? quan_hei: quan_hui"/>
			</li>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN || H5-->
			<li class='pay' @tap="_pay(1)" v-if="open_wxpay == true">
				<div class='pay_div'>
					<img class='pay_img' :src="pay[1].img"/>
					<p>微信支付</p>
				</div>
				<img class='quan_img'  :src="quan_hei"/>
			</li>
			<!-- #endif -->
			
			<!-- #ifdef MP-ALIPAY || MP-TOUTIAO -->
			<li class='pay' @tap="_pay(0)" v-if="open_alipay">
				<div class='pay_div'>
					<img class='pay_img' :src="pay[0].img"/>
					<p>支付宝</p>
				</div>
				<img class='quan_img' :src="quan_hei"/>
			</li>
			<!-- #endif -->
			
			<!-- #ifdef MP-BAIDU -->
			<li class='pay' @tap="_pay(2)" v-if="payment.baidu_pay == 1">
				<div class='pay_div'>
					<img class='pay_img' :src="pay_bd"/>
					<p>百度</p>
				</div>
				<img class='quan_img' :src="quan_hei"/>
			</li>
			<!-- #endif -->
		</ul>
		<div class='setup-buttom' @tap="pay1()">立即充值</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	export default{
		data(){
			return{
				open_alipay:false,
				open_wxpay:false,
				title:'充值',
				pay_y:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yuezhifu2x.png',
				pay_b:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/lALPBb.png',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehei2x.png',
				pay_bd: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/baiduzhifu2x.png',
				pay_zhifub: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/zhifubaozhifu2x.png',
				pay_weix: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/weixinzhifu2x.png',
				pay:[
					{img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/zhifubaozhifu2x.png',name:'支付宝'},
					{img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/weixinzhifu2x.png',name:'微信支付'},
				],//支付方式
				pay_index:-1,
				pay_style:'',//支付方式
				price:'',
				enterPay:false,
				access_id:'',
				fastTap:true,
				pay_provider:'',
				aliPayStatue: false,
				wxPayStatue: false,
				order_list:'',
				code:'',
				firstFlag: true,
				value_inp:'',
				min_amount:'', //最小充值金额
				rechargeTitle:'',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				payment: {}
			}
		},
		mounted(){			
			var me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me._pay(1)
					// #ifdef H5
					me._pay(1)
					// #endif
					// #ifdef MP-BAIDU
					me._pay(2);
					// #endif
					me._axios()
				});
			});
		},
		onShow() {
			// #ifdef H5 
			var a = window.location.href;
			console.log("当前地址=" + a)
			if (a.split('?').length > 1) {
				var str = a.split('?')[1]
				var arr = str.split('&')
				for(var i in arr){
					if( typeof(arr[i])=="String" || typeof(arr[i]) == "string" ){
						if(arr[i].substring(0, 4)=='code'){
							str = arr[i].substring(5)
							this.code = str
						}
					}
				}
				console.log("code=" + this.code);
			}
			console.log("code=" + this.code)
			if (this.code == '') {
				this.toUrl();
			}
			// #endif
			
		},
		watch:{
			price:function(newValue,oldValue){
				
				this.$nextTick(function(){
					
					if(newValue>0.01){
						
						if(Math.abs(newValue-oldValue)==0){
							this.enterPay=true
							let num = Number(newValue)
							if(isNaN(num)){
								this.price = '0'
							} else {
								this.price = num
							}
							
							
						} else if(Math.abs(newValue-oldValue)<0.01){
							
							this.enterPay=true
							let num  = Number(newValue).toFixed(2)
							if(isNaN(num)){
								this.price = '0'
							} else {
								this.price = num
							}
						} else{
							
							this.enterPay=true
							let num  = Number(newValue)
							if(isNaN(num)){
								this.price = '0'
							} else {
								this.price = num
							}

						}
						
					}
					else{
						// 不可以提交
						this.enterPay=false
					}
				})
				
			}
		},
		methods:{
			/**
			 * 支付方式显示判断
			 * */
			isPayShow:function(){
				console.log("============>");
				var me = this
				
				// #ifdef H5
				if(me.payment.jsapi_wechat == 1){
					me.open_wxpay = true;
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				console.log("me.payment================="+me.payment.mini_wechat)
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
				
				console.log("############");
				console.log(me.payment);
				
				// #ifdef MP-TOUTIAO
				if(me.payment.tt_alipay == 1){
					me.open_alipay = true;
				}
				// #endif
				console.log("============>");
			},
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			_back() {
				uni.navigateBack({
					delta:1
				})
			},
			_axios(){
				var me = this
				var data = {
					module:'app',
					action:'recharge',
					app:'index',
					access_id:this.access_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							me.min_amount = res.data.min_cz;
							me.payment = res.data.payment
							
							me.rechargeTitle = `金额不小于${ me.min_amount }元 !`
							
							me.isPayShow()
						}
					}
				})
			},
			_money (e) {
				var me = this;
				console.log(me.min_amount);
				me.price = Number(e.detail.value);
				var monrys = Number(me.min_amount);
				if (me.price < monrys) {
					me.price = "";
					uni.showToast({
						title: `充值金额不小于${monrys}元,请重新输入!`,
						duration: 1500,
						icon:'none'
					})
				}
				me.fastTap = true;
			},
			toUrl() {
				var me = this
				var locationUrl = window.location.href
				let access_id = uni.getStorageSync("access_id");
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
					url:  uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						if (res.data.code == 200) {
							var myappid = res.data.data.config.appid
							this.myappid = myappid
							var myUrl = res.data.data.url
							var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myappid +
								"&redirect_uri=" + myUrl +
								"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
							window.location.href = url;
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
			},
			_checkValue (e) {
				var me = this;
				console.log(me.min_amount)
				me.price = Number(e.detail.value)
				var monrys = Number(me.min_amount)
				if (me.price < monrys) {
					me.fastTap = false
				}else {
					me.fastTap = true
				}
			},
			pay1(){
				let me = this;
				
				//是否可虚拟支付
				let flag = me.LaiKeTuiCommon.ttIOSCantVisualpay();
				if(!flag){
					return;
				}
				
				if(!this.fastTap){
					return;
				}
				this.fastTap=false;
				this.firstFlag = false;
				//是否输入了金额
				if(this.price == '' ){
					uni.showToast({
						title: "请输入充值金额！",
						duration: 1000,
						icon: 'none'
					});
					this.fastTap=true;
					this.firstFlag = true;
					return;
				}
				
				uni.showLoading({
					title:'正在请求支付...',
					mask:true
				});
				// #ifdef MP-WEIXIN
					this.weixinPay()
				// #endif
				// #ifndef MP-ALIPAY || MP-WEIXIN || MP-TOUTIAO
					this.pay_wx()
				// #endif
				// #ifdef MP-ALIPAY
					this.alipay_minipay()
				// #endif
				// #ifdef MP-TOUTIAO
					this.tt_pay()
				// #endif
				// #ifdef MP-BAIDU
					this.baidu_pay()
				// #endif
			},
			//百度小程序支付
			baidu_pay(){
				let me = this;
				// #ifdef MP-BAIDU
				me.getOrderInfo("baidu_pay").then(function(orderInfo){
					uni.hideLoading();
					me.laikepay.baidu_pay(me,orderInfo);	
				});
				// #endif
			},
			
			//头条小程序支付
			tt_pay(){
				let me = this;
				// #ifdef MP-TOUTIAO
				me.getOrderInfo("tt_alipay").then(function(orderInfo){
					uni.hideLoading();
					me.laikepay.tt_pay(me,orderInfo);	
				});
				// #endif
			},
			
			getOrderInfo(pay_type) {
				var me=this
				console.log("start##getOrderInfo");
				console.log(pay_type);
				if(!pay_type){
					uni.showToast({
						title: "请选择支付方式！",
						duration: 1000,
						icon: 'none'
					})
					me.firstFlag = true;
					return;
				}
				
				// const appid = plus.runtime.appid;
				let time = new Date().getTime();
				let data = {
					access_id: this.access_id,
					order_list: me.order_list,
					sNo:me.getCZNo(),
					title: '充值',
					module: 'app',
					action: 'pay',
					type: pay_type,
					total: me.price
				}
				
				uni.hideLoading();
				
				// #ifdef H5
				data.code = this.code
				// #endif
				console.log("获取请求数据:");
				let p = me.LaiKeTuiCommon.getMPAliAuthCode();
				return p.then(function(authcode){
					if(authcode){
						// #ifdef MP-ALIPAY
						data.alimp_authcode = authcode;
						// #endif
						// #ifdef MP-TOUTIAO
						data.tt_authcode = authcode;
						// #endif
					}
					return new Promise((laikeOK,fail) => {
						console.log( uni.getStorageSync("url"));
						console.log(JSON.stringify(data,null,4));
						uni.request({
							url: uni.getStorageSync("url"),
							data,
							success: (result) => {
								if (result.statusCode == 200) {
									// #ifndef MP-ALIPAY
									laikeOK(result);
									// #endif
									
									// #ifdef MP-ALIPAY
									let tno = result.data;
									laikeOK(tno.substr(1,tno.length));
									// #endif
								} 
							},
							fail: (e) => {
								// #ifdef MP-ALIPAY
								let tno = e.data;
								if( tno.length > 28 ){
									laikeOK(tno.substr((tno.indexOf("s")+1),(tno.length-4)));
								} else {
									me._payFail();
								}
								// #endif
							}
						})
					});
				});
			},
			
			//获取充值订单号
			getCZNo(){
				let time = new Date().getTime();
				return 'CZ' + time + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
			},
			//支付宝小程序支付
			alipay_minipay(){
				let me = this;
				// #ifdef MP-ALIPAY
				me.getOrderInfo("alipay_minipay").then(function(trade_no){
					my.tradePay({
						tradeNO: trade_no,
						success: function(res) {
							if (res.resultCode == 9000) {
								uni.showToast({
									title: "支付成功",
									icon: 'none'
								})
								this.rechargeSuccess('alipay');
							}else if (res.resultCode == 6001){
								setTimeout(function() {
									me._payFail();
								}, 1000);
							}
						},
						fail: function(res) {
							uni.showToast({
								title: res.memo,
								icon: 'none'
							})
							setTimeout(function() {
								me._payFail();
							}, 1000);
						},
					});
				});				
				// #endif
			},
			rechargeSuccess(paytype){
				let me = this;
				setTimeout( function() {
					uni.redirectTo({
						url: "rechargeSuccess?mylei=1&money=" + me.price + "&_type="+paytype
					});
				} , 1000);
			},
			//微信小程序充值
			weixinPay() {
				var me = this
				this.loading = true;
				uni.login({
					provider: 'weixin',
					success: (e) => {
						var pay_type = 'mini_wechat';
						let data={
							code: e.code,
							access_id: this.access_id,
							sNo:me.getCZNo(),
							title: '充值',
							module: 'app',
							action: 'pay',
							type: pay_type,
							total: me.price
						}
						console.log(JSON.stringify(data,null,4));
						uni.request({
							url: uni.getStorageSync("url"),
							data,
							success: (res) => {
								console.log(JSON.stringify(res,null,4));
								if (res.statusCode !== 200) {
									uni.showModal({
										title:'提示',
										content:'充值失败,请稍后再试',
										success:function(res){
											me.fastTap = true;
										}
									})
									return;
								} else if (res.statusCode == 200) {
									let paymentData = res.data;
									console.log("@@");
									console.log(JSON.stringify(paymentData));
									uni.requestPayment({
										provider: 'wxpay',
										timeStamp: paymentData.timeStamp,
										nonceStr: paymentData.nonceStr,
										package: paymentData.package,
										signType: 'MD5',
										paySign: paymentData.paySign,
										success: (res) => {
											uni.showToast({
												title: '充值成功！',
												duration: 1000,
												icon: 'none'
											})
											setTimeout(function() {
												uni.redirectTo({
													url: "rechargeSuccess?mylei=1&type=wx&_type=wx&money="+me.price
												})
											}, 1000)
											uni.hideLoading();
										},
										fail: (res) => {
											uni.showModal({
												title:'提示',
												content:'充值失败,请稍后再试',
												success:function(res){
													me.fastTap = true;
												}
											})
											uni.hideLoading();
										}
									})
								} else {
									uni.showModal({
										title:'提示',
										content:'充值失败,请稍后再试',
										success:function(res){
											me.fastTap = true;
										}
									})
									uni.hideLoading();
								}
							},
							fail: (e) => {
								console.log("fail", e);
								this.loading = false;
								uni.showModal({
									title:'提示',
									content:'充值失败,请稍后再试',
									success:function(res){
										me.fastTap = true;
									}
								})
								uni.hideLoading();
							}
						})
					},
					fail: (e) => {
						console.log("fail", e);
						this.loading = false;
						uni.showModal({
							title:'提示',
							content:'充值失败,请稍后再试',
							success:function(res){
								me.fastTap = true;
							}
						})
						uni.hideLoading();
					}
				})
			},
			///支付失败
			_payFail(){
				let me = this;
				uni.showModal({
					title: '提示',
					content: '支付失败，返回我的钱包！',
					success: function(res) {
						console.log(res);
						me.firstFlag  = true
						// #ifdef H5
						console.log("H5"+ uni.getStorageSync("h5_url"));
						var url =  uni.getStorageSync("h5_url")+"pagesB/myWallet/myWallet" ;
						if (res.cancel) {
							url =  uni.getStorageSync("h5_url")+"pages/tabBar/home" ;
						}
						setTimeout(function() {
							window.location.href = url;
						}, 1000)
						
						// #endif
						// #ifndef H5
							console.log("NOT_H5");
							// me.pay_display = false
							me.$store.state.payRes = me.order_list
							if (res.confirm) {
								uni.redirectTo({
									url: './myWallet'
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
			
			async pay_wx() {
				let me = this
				var pay_type =  'app_wechat';
				var store_type = 1;
				var providerStr = '';
				
				console.log("this.pay_provider：" + this.pay_provider);
				if (me.pay_provider == 'alipay') {
					providerStr = 'alipay';
					pay_type = 'alipay';
				} else {
					providerStr = 'wxpay';
					//#ifdef APP-PLUS
					pay_type = 'app_wechat'
					// #endif
					//#ifdef H5
					pay_type = 'jsapi_wechat'
					// #endif
					store_type = 2
				}
				console.log("############"+pay_type);
				let orderInfo = await me.getOrderInfo(pay_type);
				console.log(JSON.stringify(orderInfo));
				console.log(JSON.stringify(orderInfo,null,4));
				if (orderInfo.statusCode !== 200) {
					//支付失败
					me._payFail();
				}
				uni.hideLoading();
				// #ifdef H5
				if (pay_type == 'alipay') {
					var url =  uni.getStorageSync("endurl")+'order/' + me.sNo + '_alipay.html'
					window.location.href = url
				} else if (pay_type == 'jsapi_wechat') {
					var paymentData = orderInfo.data;
					function onBridgeReady(){
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
							if(res.err_msg == "get_brand_wcpay_request:ok") {
								me.$store.state.payRes = me.order_list;
								var price 	= me.price1;
								var sno 	= me.sNo;
								window.location.href =  uni.getStorageSync("h5_url")+"pagesB/myWallet/myWallet";
							} else {
								//支付失败
								me._payFail();
							}
						});
					}
					
					if (typeof WeixinJSBridge != "undefined") {
						onBridgeReady(paymentData);						
					} else {
						if (typeof WeixinJSBridge == "undefined"){
							if( document.addEventListener ){
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							}else if (document.attachEvent){
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						}
					}
				}
				// #endif
				
				// #ifndef H5 || MP-BAIDU
				uni.requestPayment({
					provider: providerStr,
					orderInfo: orderInfo.data, //订单数据
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						uni.showToast({
							title: '充值成功！',
							duration: 1000,
							icon: 'none'
						});
						
						var url = "rechargeSuccess?mylei=1&money=" + me.price;		
						if( 'alipay' == providerStr ){
							url = url + "&_type=alipay";
						}else if('wxpay' ==providerStr ){
							url = url + "&_type=wx";
						};
						
						setTimeout( function() {
							uni.redirectTo({
								url: url
							});
						} , 1000);
						
					},
					fail: function(err) {
						uni.showModal({
							title:'提示',
							content:'充值失败,请稍后再试',
							success:function(res){
							}
						})
						console.log('fail:' + JSON.stringify(err));
					}
				});
				// #endif
				
			},
			
			//支付方式选择
			_pay(index){
				this.pay_index = index
				this.pay_style = index+1
				
				if(index==0){
					this.pay_provider = "alipay"
				}else if(index==1){
					this.pay_provider = "app_wechat"
				}else if(index==2){
					this.pay_provider = "baidu_pay"
				}
			}
		},
		components:{
			heads
		},
		
	}
</script>

<style scoped lang="less">
	@import "../../static/css/myWallet/recharge"; 
</style>