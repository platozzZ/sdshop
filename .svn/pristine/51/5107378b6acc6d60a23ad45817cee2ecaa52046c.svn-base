<template> 
	<div class='order'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		
		<headapp :title='title' returnR='5'></headapp>
		
		<paymodel v-model="pay_display" @success="_confirm" @cancel="_cancel"/>
		
		
		<div class='load' v-if='load'>
			<div> 
				<img :src="loadImg" />
				<p>加载中……</p>
			</div>
		</div>
		<div v-else style='position: relative;'>
			<div v-if='showPay1'>
				<ul style='background-color: #FFFFFF;margin-bottom: 100upx;'>
					<li class='pay' style='height: 100upx; box-sizing: border-box;'>
						<div style="width: 100%;">
							<div class="pay_yue" style="position: relative;width: 100%;justify-content: space-between;">
								<div class='pay_left'>
									<p>
										余额支付<span :class="user_money>0?'btn1':'btn2'">(余额￥{{user_money}})</span>
									</p>
								</div>
								<switch v-if="user_money>0" @change="switchChange" color='#4CD864' style='transform: scale(1, 0.9);'/>
							</div>
						</div>
					</li>
					<div v-if="useWallte" style='width: 100%; height: 20upx; background-color: rgb(244, 244, 244);'></div>
					<div v-if="useWallte" class='deco pay'>
						<div style='color: #020202;font-size: 28upx;'>使用余额</div>
						<div style="border: 2upx #B8B8B8 solid;padding: 10upx 10upx 10upx 0;width: 200upx;border-radius: 6upx;"><input type="digit" @blur.prevent="_usyue" v-model="value" placeholder="请输入抵扣金额" style='text-align: right;font-size: 28upx;color: #000000;'
							  @focus="_hide()" @blur="_show()"></div>
					</div>
					<li v-if="needpay > 0 || frist_show" style="width: 100%;height: 20upx;background-color: #F4F4F4;"></li>
					<div v-if="needpay > 0 || frist_show">
						<li class='pay'>
							<div style="width: 100%;">
								<div class="pay_yue" style="position: relative;width: 100%;justify-content: space-between;">
									<div class='pay_left'>
										<p>
											还需支付
										</p>
									</div>
									<span>￥{{needpay !== ''?needpay:endpay}}</span>
								</div>
							</div>
						</li>
						<div style='width:100%;height: 1px;background: #EEEEEE;'></div>
						<!-- #ifdef MP-BAIDU -->
						<li class='pay' @tap='chooseWay("baidu")' v-if="payment.baidu_pay==1">
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
						<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
						<li class='pay' @tap='chooseWay("wxPay")' v-if="open_wxpay==true">
							<div style="width: 100%;">
								<div class="pay_yue" style="position: relative;width: 100%;justify-content: space-between;">
									<div style='display: flex;align-items: center;'>
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
						<li class='pay' @tap='chooseWay("aliPay")' v-if="open_alipay==true">
							<div style="width: 100%;">
								<div class="pay_yue" style="position: relative;width: 100%;justify-content: space-between;">
									<div style='display: flex;align-items: center;'>
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
					</div>
				</ul>
			</div>
			
			<button class='order_foot' :class='ishide==1?"hide":""' @tap='_submitTwo($event,order.id,order.status)'>确定</button>
		</div>

		<!-- 提取码弹出框 -->
		<div v-if='receiving_shop.flag' class='receiving_modal' @tap='receiving_stop'>
			<div :style="'bottom:'+receiving_shop.bottom+'px'" @tap.stop='stop_tap'>
				<!-- 已完成 -->
				<img class='receiving_finish' v-if="receiving_check.status==3" :src="finish2x"></img>
				
				<div class='receiving_content'>
					<div class='receiving_shop_img'>
						<img :src="receiving_check.img" alt="" style='width:100%;height:100%;'>
					</div>			
					<div class='receiving_content_item'>
						<p>{{receiving_check.product_title}}</p>
						<div>
							<p>￥{{receiving_check.p_price}}</p>
							<div class='receiving_size'>
								<span class='receiving_size_item'>规格: {{receiving_check.size}}</span>
								<span class='receiving_count'>×{{receiving_check.num}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class='receiving_img'>
					<img :src="receiving_check.extraction_code_img" alt="" :style="receiving_check.status==3?'opacity: 0.4':''">
				</div>
				<div class='receiving_code' :style="receiving_check.status==3?'opacity: 0.6':''">
					<span class='receiving_name'>验证码:</span>
					<span class="receiving_code_data">{{receiving_check.extraction_code}}</span>
				</div>
			</div>
		</div>
	</div>

	</div>
</template>

<script>
	import paymodel from '@/components/paymodel.vue'
	import {
		_axios,
		toUrl,
		txfh,
		_confirm,
		_payAxios,
		checkgroup,
		chooseWay,
		weixinPay,
		switchChange,
		_after,
		_submitOne,
		back_click,
		payThree,
		changeValue,
		getOrderInfo,
		_payFail,
		pay_wx,
		onCopy,
		_pay_style,
		_submitTwo,
		_receiving,
		} from '../../static/js/order/order.js'

	// #ifdef H5
		import $ from "../../common/jquery.js"
	// #endif
	import heads from '../../components/header-h5.vue'
	import headapp from "../../components/header.vue"
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage'

	export default {
		data() {
			return {
				open_wxpay:false,
				open_alipay:false,
				payment:"",
				showPayWay1: false,
				showPayWay: false,
				returnR: '1',
				password_status: "",
				pay_display: false,
				integral_hui:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hui.png",
				integral_hei:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
				integral_hong:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				finish2x:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/finish2x.png",
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/yuezhifu2x.png",
				notWallte: false,
				useWallte: false,
				iscan:'',
				focus: true,
				msg: '',
				remarks: '',//订单备注
				frist_show:true,
				ishide:0,//是否隐藏底部栏 1隐藏 0否
				msgLength: 0,
				digits: ['', '', '', '', '', ''],
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
				can_pay:true,
				pay_style: '', //支付方式
				content: '是否抵扣余额？',
				enterless: true,
				z_price_:'',//最初默认总价
				guanbiImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/close2x.png',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehui2x.png",
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehei2x.png",
				guanbi: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/qiandaoguanbi2x.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/yuezhifu2x.png",
				pay_z: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
				pay_w: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/weixinzhifu2x.png',
				pay_bd:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/baiduzhifu2x.png',
				title: '请选择支付方式',
				orde_id: '', //订单ID
				access_id: '',
				order: '',
				message: '',
				count: '',
				flag: true,
				load: true,
				logistics: [],
				display_t: false,
				rr_content: '',
				showPay: false,
				showPay1: false,
				aliPayStatue: false,
				wxPayStatue: false,
				baidupayStatue:false,
				user_money: '',
				price: '',
				value: '',
				sNo: '',
				fastTap: true,
				otype: '', //订单类型
				endpay: '', //剩余支付
				pttype: '', //剩余支付
				// gstatus:'',
				ordermsg: '', //订单信息
				p_id: '', //产品id
				needpay: '',
				kanjia: false,
				code:'',
				myappid: '',
				firstFlag: true,
				head: true, //头部切换
				back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				r_status_:'',
				has_status:false,
				cancelGoods:"", //退货中的状态
				cancelGoodsReason:"", //退货原因
				btnText1:"",
				btnText2:"",
				flag:false,
				oldheight:'',
				is_distribution:0,
				is_end:false,//拼团活动是否结束（true结束 false未结束）
				axios_times : 0,
				payTitle:'',//支付商品标题
				receiving_check: {},
				pay_name:'MYORDER',
				is_order:true,
				order_list:[],
				receiving_shop: {
					flag: false,
					bottom: '',
				},
			}
		},
		computed: {
			//是否显示折扣
			isDiscount: function(){
				if(this.order.coupon_name){
					if(this.order.coupon_name == '(0折)'){
						return 0
					}else{
						return 1
					}
				}
			}
		},
		onLoad(option) {
			let me =  this;
			this.receiving_shop.bottom = uni.upx2px(160)

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this.orde_id = option.order_id
			this.showPay = option.showPay
			if(option.returnR != undefined){
				this.returnR = option.returnR
			}
			if(option._store != undefined){
				this.returnR = option._store
			}
			// #ifdef H5
				var storage=window.localStorage;
				if(storage["_store"] == 'h5'){
					this.returnR = 'h5'
				}
			// #endif
			_axios(me);
			this.r_status_ = option.status
			if(this.r_status_ != ''){
				this.has_status = true
			}
			if (this.showPay) {
				this.showPay1 = true
			}
			// #ifdef MP-WEIXIN
				wx.getSystemInfo({
					success: function (res) {
						me.receiving_shop.bottom -= res.statusBarHeight
					 }
				})
			// #endif
			// #ifndef MP-ALIPAY || MP-BAIDU
			uni.onWindowResize((res) => {
				console.log('onWindowResize=======================================');
				console.log(JSON.stringify(res));
				console.log(JSON.stringify(res.size.windowHeight));
				console.log(JSON.stringify(res.size['windowHeight']));
				console.log('当前高度：'+res.size.windowHeight);
				console.log('原来高度：'+this.oldheight);
			
				if(this.oldheight=='' || !this.oldheight){
					this.oldheight = res.size.windowHeight
					this._hide()
					console.log('隐藏1');
				}else{
					if(Number(this.oldheight)<Number(res.size.windowHeight)){
						this.oldheight = res.size.windowHeight
						console.log('111')
						this._show()
						console.log('显示1');
			
					}else if(Number(this.oldheight)==Number(res.size.windowHeight)){
						console.log('222')
						this._show()
						console.log('显示2');
					}else{
						console.log('333')
						this._hide()
						console.log('隐藏2');
					}
				}
				
			})
			// #endif
		},
		onShow() {
			var me = this
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1');
			})
			_axios(me);
			// #ifdef H5
			var a = window.location.href
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
			console.log("测试9999")
			console.log("code=" + this.code)
			if (this.code == '') {
				
				if(!me.$loginFrom.isCMMC()){
					toUrl(this);
				}
				
			}
			// this.showPay = true ;
			this.showPay1 = true
			// #endif
			console.log('this.order')
			console.log(this.order)
		},
		beforeDestroy() {
			clearInterval(this.timer);
			clearInterval(this.setTime);
			var me = this
			
			uni.request({
				url:  uni.getStorageSync("url"),
				data: {
					module: 'app',
					app: "up_remarks",
					action: 'order',
					access_id: me.access_id,
					remarks: me.remarks,
					sNo: me.sNo
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					console.log(res)
				}
			})
			
			this.$store.state.order_id = ''
			var order_list = {sNo:me.sNo,total:me.z_price_,order_id:me.orde_id},
			order_list = JSON.stringify(order_list)
			
			if (me.otype == '' && me.order.status == 0) {
				//离开界面的时候去生成订单
				uni.request({
					url:  uni.getStorageSync("url"),
					data: {
						module: 'app',
						app: "leave_Settlement",
						action: 'order',
						access_id: me.access_id,
						order_list: order_list,
						price: me.value,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
					}
				})
				
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
			},
			/**
			 * 我的订单页面app支付成功
			 */
			appPaySuccess(){
				let me = this;
				var dat_id = "";
				if (me.order_id) {
					dat_id = me.order_id
				} else {
					dat_id = me.or_id
				}
				me.pay_display = false
				
				var path = '';
				
				if (me.otype == 'pt') {
					
					if (parseFloat(me.price1) <= 0) {
						path = '../../pagesA/group/group_end?sNo=' + me.sNo +"&ptcode1="+me.ptcode
					} else {
						path = "../../pages/pay/payResult?payment_money=" + me.order.z_price + "&sNo=" + me.sNo + "&order_id=" + dat_id
					}
				} else {
						path = "../../pages/pay/payResult?payment_money=" + me.order.z_price + "&sNo=" + me.sNo + "&order_id=" + dat_id
				}
				
				uni.redirectTo({
					url: path
				})
			},
			_hide(){
				console.log('hide');
				this.ishide = 1
				console.log(this.ishide);
			},
			_show(){
				console.log('show');
				this.ishide = 0
				console.log(this.ishide);
				if(this.value.length == 0){
					this.value = 0
				}
			},
			_back(){
				uni.switchTab({
					url:'/pages/order/myOrder'
				})
			},			
			_yaoqing(sNo) {
				var me = this
				var path = '../../pagesA/group/group_end?returnR=1&sNo=' + sNo +"&ptcode="+me.ptcode
				uni.navigateTo({
					url: path
				})
			},
			txfh(id) {
				//提醒发货
				txfh(id,this)
			},
			_usyue: function() {
				if (this.otype == 'pt') {
					this.needpay = parseFloat(this.endpay - this.value).toFixed(2)
				} else {
					this.needpay = parseFloat(this.order.z_price - this.value).toFixed(2)
				}
			},
			_showPayWay() {
				var me = this
				this.showPayWay1 = true
				setTimeout(function() {
					me.showPayWay = false
					me.showPayWay1 = false
				}, 500)
			},
			focust() {
				this.focus = true
			},
			//余额支付校验密码等信息 payNum似乎没有用
			_confirm(payNum) {
				var me = this
				me.msg = payNum
				_confirm(payNum,this)
			},
			//支付密码框取消，开始余额支付
			_payAxios(payNum) {
				_payAxios(payNum,this)
			},
			//跳设置支付密码页面
			_cancel() {
				var me = this
				me.pay_display = false
				me.msg = ""
				uni.showToast({
					title: '支付取消',
					icon: 'none',
					duration: 1500
				})
			},
			payThree() {
				payThree(this)
			},
			//是否已经选择支付方式
			_gotPayType(){
				var me = this;
				if( !this.useWallte && !this.wxPayStatue && !this.aliPayStatue && !this.baidupayStatue){
					
					uni.showToast({
						title: "请选择支付方式！",
						duration: 1000,
						icon: 'none'
					})
					me.firstFlag = false;
				} else {
					me.firstFlag = true;
				}
			},
			async _pay_style() {
				_pay_style(this)
			},
			checkgroup() { //验证是否可以进行参团
				checkgroup(this)
			},
			chooseWay(way) {
				chooseWay(way,this)
			},
			getOrderInfo(type) {
				return getOrderInfo(type, this)
			},
			weixinPay() {
				weixinPay(this)
			},
			_payFail(){
				_payFail(this)
			},
			
			async pay_wx(type) {
				var me = this
				me.laikepay.laikePayMain(me,type);
			},
			
			switchChange(e) {
				switchChange(e,this)
			},
			_navigateTo(url) {
				uni.navigateTo({
					url,
				})
			},
			...mapMutations({
				cart_id: 'SET_CART_ID',
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				pro_id: 'SET_PRO_ID'
			}),
			_shou() {
				uni.navigateTo({
					url: 'batchOrder?orde_id=' + this.orde_id
				})
			},
			onCopy: function() {
				console.log('onCopy_start_in');
				// onCopy(this,$)
				var me = this
				// #ifndef H5
				uni.setClipboardData({
					data: me.message,
					success: function(res) {
						console.log(me.message);
						uni.showToast({
							title: '复制成功',
							duration: 1500,
							icon: 'none'
						})
					}
				});
				// #endif
				// #ifdef H5
				let input = $('#order_no input');
				input.select();
				document.execCommand("Copy");
				uni.showToast({
					title: '复制成功',
					duration: 1500,
					icon: 'none'
				})
				// #endif
			},
			onError: function(e) {
				console.log('无法复制文本！')
			},
			comment(order_details_id,r_status){
				if(r_status == 3){
				  uni.navigateTo({url:'../evaluate/evaluating?order_details_id='+order_details_id+'&num=all'})
				}else{
				  uni.navigateTo({url:'../evaluate/evaluating?order_details_id='+order_details_id+'&add=true&num=all'})
				}
			},
			_after(e, id, content, r_status) {
				console.log("_after");
				_after(e, id, content, r_status, this)
			},
			_onafter() {
				this.display_t = false
			},
			_goods(id) {
				console.log(id)
				this.pro_id(id)
				uni.navigateTo({
					url: '../goods/goodsDetailed'
				})
			},
			// 关闭提取码弹框
			receiving_stop(){
				this.receiving_shop.flag = false
			},
			// 查看提取码
			_receiving(){
				var me = this
				_receiving(me)
			},
			_submitOne(event, sNo, order_id, status) {
				_submitOne(event, sNo, order_id, status, this)
			},
			_submitTwo(event, order_id, status) {
				let me = this;
				if(me.order && me.order.list[0]){
					me.payTitle = me.order.list[0].p_name;
				}
				_submitTwo(event, order_id, status, this)
			},
			back_click(id) {
				back_click(id,this)
			},
		
			changeValue(newValue, oldValue) {
				changeValue(newValue, oldValue, this)
			},

		},
		watch: {
			time_c(newvalue, oldvalue) {
				if (newvalue == 0) {
					_axios(me)
				}
			},
			value: function(newValue, oldValue) {
				this.changeValue(newValue, oldValue)
			},
			msg(curVal) {
				this.msgLength = curVal.length;
				console.log(this.msg)
			},
		},
		components: {
			heads,
			headapp,
			paymodel
		}
	}
</script>

<style scoped>
	@import url("../../static/css/order/order.css");
	/* 上面引入的订单详情的css */
	.order_foot{
		border-radius: 0;
		background: #020202;
		color: #FFFFFF;
		font-size: 30upx;
		justify-content: center;
	}
	.order{
		background-color: #FFFFFF;
	}
	.pay{
		border-bottom: 0;
	}
	.pay_left{
		display: flex;align-items: center;flex: 1;
	}
	.pay_left p{
		width: 100%;font-size: 28upx;font-weight: bold;
	}
	.pay_yue span,.pay_yue p{
		font-size: 28upx;
	}
	.deco{
		margin-top: 0!important;
	}
</style>
