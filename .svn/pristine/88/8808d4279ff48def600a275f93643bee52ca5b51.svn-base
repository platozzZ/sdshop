<template>
	<div class='order'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<headapp :title='title' :returnR='returnR'></headapp>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中……</p>
			</div>
		</div>
		<div v-else style='position: relative;'>
			<div class='order_zt' :style='order.status!=2?"height:156upx":""' style="flex-direction: column;justify-content: center;">
				<p v-text="order.status==0 ? '待付款':(order.status==1?'已付款':(order.status==2?'已发货':(order.status==3||order.status==5||order.status==8?'交易成功':(order.status==7||order.status==6?'交易关闭':(order.status==4?cancelGoods:(order.status==12?'订单完成':(order.status==10||order.status==11?'拼团失败':(order.status==9?'拼团中':''))))))))"></p>
				<div class='order_wl' v-if='order_wl&&order.status==2'>
					<div>
						<div v-if='logistics.length'>
							<p class="order_puls" v-if='logistics.length==1 && logistics[0].list.length >= 1'>物流信息: {{logistics[0].list[0].context}}</p>
							<p class="order_puls" v-if='logistics.length>1'>物流信息: 该物流已拆分{{logistics.length}}个包裹发出, 点击"查看物流"可查看详情</p>
							<p class="order_time">{{logistics[0].deliver_time}}</p>
						</div>
						<p class='order_p' v-if='!logistics'>暂无物流信息</p>
					</div>
				</div>
				<div class='order_p' v-else>
					<p v-text="order.status==4 && cancelGoods!='审核中' && cancelGoods!='审核通过' && cancelGoods!='退货完成' && cancelGoods!='已退款'  ?'拒绝原因：'+cancelGoodsReason:(order.status==6&&order.list&&order.list[0].re_type==0&&order.hand_del==1)?'取消订单':(order.status==6&&order.list&&order.list[0].re_type==0&&order.hand_del==0)?'订单超时':''"></p>
				</div>
				<p class='order_p' v-if='order_zt'>{{order_zt}}</p>
				<image class="orderbg" :src="order.status==2?orderbg_dsh:orderbg_qt" mode="aspectFit"></image>
			</div>

			<div class='address_one'>
				<span class="address_one_a">{{order.name}}</span>
				<span class="address_one_b">{{order.mobile}}</span>
				<p>{{order.address}}</p>
			</div>

			<ul class='order_goods'>
		
				<li  class="order_goods_lis" style="0 0 30upx 0">
					
					<div class="order_one" @click="_goStore(order.list[0].shop_id)">
						<img :src="storeImg">{{ order.list[0].shop_name }}
						<img class="dd-boxa-img" :src="jiantou">
					</div>
					
					<template v-for="(item,index) in order.list">
					
					<div class="order_two"  :key="index">
						<img :src='item.imgurl' />
						<div class="order_two_a" @tap="_goods(item.p_id)">
							<p class="order_p_name">{{item.p_name}}</p>
							<p class="color_one">{{item.size}}</p>
						</div>
						<div>
							<p v-if="order.status == 0 && order.otype == 'pt'">￥{{order.product_total2}}</p>
							<p v-else-if="order.otype == 'KJ'">￥{{order.omsg.spz_price}}</p>
							<p v-else-if="order.otype == 'JP'">￥{{order.jp.jp_price}}</p>
							<p v-else-if="order.otype=='integral'" style="width: 180upx;">
								<span v-if="item.p_price>0">￥{{item.p_price}}+</span>
								<img :src="integral_hei" class="integral_hei integral-img" style="padding-top: 4upx;">{{order.allow}}
							</p>
							<p v-else>￥{{item.p_price}}</p>
							<p class='color_two'>x{{item.num}}</p>
							<div class='retreat' v-if="(item.r_status==2||item.r_status==1) && item.is_distribution != 1  && order.otype != 'integral' && order.otype != 'JP' && order.otype != 'PT'  && order.otype != 'MS' && order.otype != 'vipzs' && !kanjia"
							 @tap="_after($event,item.id,item.r_content,item.r_status)">申请退款</div>
							<div class="order_goods_adiv">
								<div class='retreat order_goods_adiv_b' v-if="item.r_status==3&&order.otype!='integral'&&user_can_after" @tap="_after($event,item.id,item.r_content,item.r_status)">申请售后</div>
								<div class='retreat' v-if="item.r_status==3 && !kanjia && order.otype != 'JP'" @tap="comment(item.id,item.r_status)">立即评价</div>
								<div class='retreat' v-if="item.r_status==5 && !kanjia && order.otype != 'JP'" @tap="comment(item.id,item.r_status)">追加评论</div>
							</div>
						</div>
					</div>
					<div class='complete complete_b' :key="index" v-if='item.r_status==4&&item.r_type==2&&display_t'>
						<div class='complete_qiandao'>
							<img class='complete_img' :src="guanbi" @tap="_onafter" />
							<p>拒绝原因：{{rr_content}}</p>
						</div>
					</div>
					<div class='' ></div>
					</template>
					
					
				</li>
				<li class='order_last'>
					<div class='order_color'>
						<p>商品总价</p>
						<p v-if="order.status == 0 && order.otype == 'pt'">￥{{order.product_total2}}</p>
						<p v-else-if="order.otype == 'integral'" class="order_color_a">
							<span v-if="order.product_total>0">￥{{order.product_total + " + "}}</span>
							<img :src="integral_hui" class="order_color_a_b integral-img">{{order.allow}}
						</p>
						<p v-else-if="order.otype == 'KJ'">￥{{order.omsg.spz_price}}</p>
						<p v-else-if="order.otype == 'JP'">￥{{order.jp.jp_price}}</p>
						<p v-else>￥{{order.product_total}}
						</p>
					</div>
					<div class='order_color' v-if="is_distribution!=1 && order.comm_discount==1 && otype != 'JP' && otype != 'KJ'&& otype != 'pt' && otype != 'MS' && otype != 'vipzs' && otype != 'VIP'">
						<p>优惠券</p>
						<p>￥{{order.coupon_price}}<span v-if="isDiscount">{{order.coupon_name}}</span></p>
					</div>
					<div class='order_color' v-if="order.comm_discount<1 && order.comm_discount>0 && otype != 'MS'">
						<p>分销折扣</p>
						<p>{{order.comm_discount*10}}折</p>
					</div>
					<div class='order_color' v-if="order.grade_rate<1 && order.grade_rate>0 && otype != 'vipzs' && otype != 'VIP'">
						<p>会员等级折扣</p>
						<p>{{order.grade_rate*10}}折</p>
					</div>
					<div class='order_color' v-if="is_distribution!=1 && order.comm_discount==1 && otype != 'KJ' && otype != 'JP'&& otype != 'pt' && otype != 'MS' && otype != 'vipzs' && otype != 'VIP'">
						<p>其他优惠</p>
						<p>{{order.coupon_activity_name}}</p>
					</div>
					<div class='order_color'>
						<p>运费</p>
						<p>￥{{order.z_freight}}</p>
					</div>
					<div class='order_color' v-if="otype != 'JP'&& otype != 'pt'&& otype != 'integral'">
						<p>订单备注</p>
						<p v-if="order.status == 0"><input type="text" v-model="remarks" class="order_color_a"></p>
						<p v-else class="order_color_b">{{order.remarks}}</p>
						<!-- <p>￥{{order.z_freight}}</p> -->
					</div>
					<div>
						<p class="margin-top-zj mt_0">订单总价</p>
						<p class="margin-top-zj mt_0" v-if="order.otype!='integral'">￥{{order.z_price}}</p>
						<p class="margin-top-zj margin-top-flex mt_0" v-else>
							<span v-if="order.z_price>0">￥{{order.z_price}}+</span>
							<img :src="integral_hei" class="integral_hei integral-img">{{order.allow}}
						</p>
					</div>
				</li>
				<li class="order_pay_li mt_0"></li>
				<li class='order_pay'>
					<p>实付款</p>
					<p class="z_price_bold" v-if="order.otype!='integral'">￥{{order.z_price}}</p>
					<p class="z_price_color" v-else>
						<span v-if="order.z_price>0">￥{{order.z_price}}+</span>
						<img :src="integral_hong" class="integral_hei integral-img">{{order.allow}}
					</p>
				</li>
				<li class="order_pay_li_a"></li>
			</ul>
			<div class='order_xx'>
				<div>
					<p>订单编号：
						<!-- <input class='copy_input' v-model="message" readonly/>-->
						{{message}}
					</p>
					<input id='order_no' disabled='disabled' class="order_no_opacity" type='hidden' v-model="message">
					<p>下单时间：{{order.add_time}}</p>
				</div>
				<div class='order_border' type="button" @tap='onCopy()'>复制</div>
			</div>
			<div style="height: 98upx;">
				<div class='' v-if="order.status==10||order.status==11">

				</div>
				<div class='order_foot' v-else-if="order.status==9">
					<div class='commonBtn a1' @tap='_yaoqing(order.sNo)'>
						邀请好友
					</div>
				</div>
				<div class='order_foot' v-else-if="order.self_lifting == '1' && order.status==2">
					<!-- 查看提取码 -->
					<div class='commonBtn a2' @tap='_receiving(order.id)' v-text="order.status==2?'查看提取码':'提取码'"></div>
				</div>
				<div class='order_foot' v-else-if="flag">
					<div class='commonBtn a2' @tap='_submitOne($event,order.sNo,order.id,order.status)' v-if='order.status!=12 ?(order.status==1||order.status==6? false : true):false'>
						{{btnText1}}
					</div>
				</div>
				<div class='order_foot' v-else :class='ishide==1?"hide":""'>
					<div style="position: absolute;left: 30upx;" v-if='(order.status==2||order.status==1)&&order.batch_del==0&&order.list.length>1'
					 @tap="_shou">批量售后</div>
					<div class='commonBtn a2' @tap='_submitOne($event,order.sNo,order.id,order.status)' v-if='order.status!=12 ?(order.status==1||order.status==6||order.status==2? false : true):false'>
						{{btnText1}}
					</div>
					<div class='commonBtn a2 commonBtnstyle2' @tap='_chakan(order.sNo)' v-if='order.status==2 || order.status==3'>
						查看物流
					</div>
					<div class='commonBtn a2 commonBtnstyle3' @tap='_delOrder(order.sNo,order.id)' v-if='order.status==6'>
						删除订单
					</div>
					<div v-if="(order.status !=1 && can_pay && order.status !=3 && order.status !=5 && order.status !=12 && order.status !=4) || (order.status==6&&order.list&&order.list[0].re_type==0)">
						<div class='commonBtnn a1' @tap='_submitTwo($event,order.id,order.status)' v-if='order.status!=12&&order.status!=1'>
							{{btnText2}}
						</div>
					</div>

					<div v-if='order.status==1 && order.delivery_status==0' @tap='txfh(order.id)' style='border-radius: 5upx;'>
						提醒发货
					</div>
					<div v-else-if='order.status==1 && order.delivery_status==1' style='border-radius: 5upx;background: #a9a9a9 ;'>
						提醒发货
					</div>
				</div>
			</div>
		</div>
		<div class='payment_pass' v-if="pay_display">
			<div class='payment_c'>
				<p>请输入支付密码</p>
				<div class="xian_d">
					<input ref="pwd" type='password' :maxlength="digits.length" v-model="msg" class="passwordstyle" />
					<ul class="pwd-wrap" @tap="focust">
						<li v-for="(item,key) in digits" :key='key'>
							<span v-if="msgLength > key" class="spanm"><input class="masd" type="number" v-model="key" pattern="\d*" /></span>
						</li>
					</ul>
				</div>
				<div class="payment_tt">
					<div class='cancel' @tap="_cancel">取消</div>
					<div class='confirm' @tap="_confirm">确认</div>
				</div>
			</div>
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
	import { copyText } from '@/common/util.js'
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
				showPayWay1: false,
				showPayWay: false,
				returnR: '1',
				password_status: "",
				pay_display: false,
				integral_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hui.png",
				integral_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
				integral_hong: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				finish2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/finish2x.png",

				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/store.png',
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/yuezhifu2x.png',
				guanbiImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close2x.png',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/xuanzehei2x.png',
				guanbi: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/qiandaoguanbi2x.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/5-121204193R7.gif',
				pay_y: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/yuezhifu2x.png',
				pay_z: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/zhifubaozhifu2x.png',
				pay_w: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/weixinzhifu2x.png',
				orderbg_dsh: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/orderbg_dsh.png',
				orderbg_qt: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/orderbg_qt.png',
				notWallte: false,
				useWallte: false,
				iscan: '',
				focus: true,
				msg: '',
				remarks: '', //订单备注
				frist_show: true,
				ishide: 0, //是否隐藏底部栏 1隐藏 0否
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
				can_pay: true,
				pay_style: '', //支付方式
				content: '是否抵扣余额？',
				enterless: true,
				z_price_: '', //最初默认总价
				title: '订单详情',
				orde_id: '', //订单ID
				access_id: '',
				order: '',
				order_wl: '', //物流信息显示状态
				order_zt: '', //
				time_c: '', //待付款倒计时，时间差
				time_D: '', //待付款倒计时，天
				time_H: '', //待付款倒计时，小时
				time_M: '', //待付款倒计时，分
				time_s: '', //待付款倒计时，秒
				message: '',
				rightText: ['立即付款', '申请退货', '确认收货', '立即评价', '再次购买', '联系客服', '追加评价', '批量售后', ],
				leftText: ['取消订单', '删除订单', '查看详情'],
				leftText1: ['立即付款', '追加评价', '确认收货', '立即评价', '提醒发货', '退货', '再次购买', '拼团详情', '邀请好友'],
				stau_num: 0, //提醒发货
				timer: null,
				orderInfo: [], //订单信息
				count: '',
				flag: true,
				load: true,
				user_can_open: '', //是否能够继续开团
				user_can_can: '', //是否能够继续参团
				user_can_after: '', //是否申请售后
				logistics: [],
				display_t: false,
				rr_content: '',
				showPay: false,
				showPay1: false,
				aliPayStatue: false,
				wxPayStatue: false,
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
				code: '',
				myappid: '',
				firstFlag: true,
				head: true, //头部切换
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				r_status_: '',
				has_status: false,
				cancelGoods: "", //退货中的状态
				cancelGoodsReason: "", //退货原因
				btnText1: "",
				btnText2: "",
				flag: false,
				is_remove_order: false,
				oldheight: '',
				is_distribution: 0,
				is_end: false, //拼团活动是否结束（true结束 false未结束）
				axios_times: 0,

				receiving_check: {},
				receiving_shop: {
					flag: false,
					bottom: '',
				},
			}
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				return heigh + 'px';
			},
			//是否显示折扣
			isDiscount: function() {
				if (this.order.coupon_name) {
					if (this.order.coupon_name == '(0折)') {
						return 0
					} else {
						return 1
					}
				}
			}
		},
		onLoad(option) {
			let me = this;
			this.receiving_shop.bottom = uni.upx2px(160)

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this.orde_id = option.order_id
			this.showPay = option.showPay
			if (option.returnR != undefined) {
				this.returnR = option.returnR
			}
			if (option._store != undefined) {
				this.returnR = option._store
			}
			// #ifdef H5
			var storage = window.localStorage;
			if (storage["_store"] == 'h5') {
				this.returnR = 'h5'
			}
			// #endif

			this.r_status_ = option.status
			if (this.r_status_ != '') {
				this.has_status = true
			}
			if (this.showPay) {
				this.showPay1 = true
			}
			// #ifdef MP-WEIXIN
			wx.getSystemInfo({
				success: function(res) {
					me.receiving_shop.bottom -= res.statusBarHeight
				}
			})
			// #endif
			// #ifndef MP-ALIPAY
			uni.onWindowResize((res) => {
				console.log('onWindowResize=======================================');
				console.log(JSON.stringify(res));
				console.log(JSON.stringify(res.size.windowHeight));
				console.log(JSON.stringify(res.size['windowHeight']));
				console.log('当前高度：' + res.size.windowHeight);
				console.log('原来高度：' + this.oldheight);

				if (this.oldheight == '' || !this.oldheight) {
					this.oldheight = res.size.windowHeight
					this._hide()
					console.log('隐藏1');
				} else {
					if (Number(this.oldheight) < Number(res.size.windowHeight)) {
						this.oldheight = res.size.windowHeight
						console.log('111')
						this._show()
						console.log('显示1');

					} else if (Number(this.oldheight) == Number(res.size.windowHeight)) {
						console.log('222')
						this._show()
						console.log('显示2');
					} else {
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
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1');
			})
			_axios(me);
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
				console.log("code=" + this.code);
			}
			console.log("测试9999")
			console.log("code=" + this.code)
			if (this.code == '') {

				// if(!this.has_status){
				// toUrl(this);
				// }

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
				url: uni.getStorageSync("url"),
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
			var order_list = {
					sNo: me.sNo,
					total: me.z_price_,
					order_id: me.orde_id
				},
				order_list = JSON.stringify(order_list)

			if (me.otype == '' && me.order.status == 0 && !me.is_remove_order) {
				//离开界面的时候去生成订单
				uni.request({
					url: uni.getStorageSync("url"),
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
			_goStore(shop_id) {
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id=' + shop_id
				})
			},
			_hide() {
				console.log('hide');
				this.ishide = 1
				console.log(this.ishide);
			},
			_show() {
				console.log('show');
				this.ishide = 0
				console.log(this.ishide);
				if (this.value.length == 0) {
					this.value = 0
				}
			},
			_back() {
				uni.switchTab({
					url: '/pages/order/myOrder'
				})
			},
			_yaoqing(sNo) {
				var me = this
				var path = '../../pagesA/group/group_end?returnR=1&sNo=' + sNo + "&ptcode=" + me.ptcode
				uni.navigateTo({
					url: path
				})
			},
			//提醒发货
			txfh(id) {
				txfh(id, this)
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
				_confirm(payNum, this)
			},
			//支付密码框取消，开始余额支付
			_payAxios(payNum) {
				_payAxios(payNum, this)
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
			_gotPayType() {
				var me = this;
				// if( !this.useWallte && !this.wxPayStatue && !this.aliPayStatue ){
				// 	uni.showToast({
				// 		title: "请选择支付方式！",
				// 		duration: 1000,
				// 		icon: 'none'
				// 	})
				// 	me.firstFlag = false;
				// } else {
				// 	me.firstFlag = true;
				// }
				var path = '../order/order_payment?order_id=' + me.orde_id + '&showPay=true';
				// #ifdef H5
				console.log('h1');
				path = '../order/order_payment?order_id=' + me.orde_id + '&showPay=true&_store=h5';
				// #endif
				uni.navigateTo({
					url: path
				})
			},
			async _pay_style() {
				_pay_style(this)
			},
			checkgroup() { //验证是否可以进行参团
				checkgroup(this)
			},
			chooseWay(way) {
				chooseWay(way, this)
			},
			getOrderInfo(type) {
				return getOrderInfo(type, this)
			},
			weixinPay() {
				weixinPay(this)
			},
			_payFail() {
				_payFail(this)
			},
			async pay_wx(type) {
				if (!type) {
					return;
				}
				var me = this
				let orderInfo = null;
				let p = new Promise((laikeOk) => {
					orderInfo = me.getOrderInfo(type);
					console.log('-----------orderinfo--------')
					console.log(orderInfo)
					laikeOk(orderInfo);
				});
				p.then(function(orderInfo) {
					var providerStr = "";
					if (type == 'wx') {
						providerStr = 'wxpay'
					} else if (type == 'ali') {
						providerStr = 'alipay'
					}
					var str = JSON.stringify(orderInfo.data)
					uni.hideLoading();
					// #ifdef H5
					me.laikepay.weixin_jsapipay(me, type, orderInfo);
					// #endif
					// #ifdef APP-PLUS 
					me.laikepay.app_pay(me, providerStr, orderInfo);
					// #endif
					// #ifdef MP-ALIPAY
					me.laikepay.alipay_minipay(me, orderInfo);
					// #endif
				});
			},
			switchChange(e) {
				switchChange(e, this)
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
				copyText('',me.message)
				// #endif
			},
			onError: function(e) {
				console.log('无法复制文本！')
			},
			comment(order_details_id, r_status) {
				if (r_status == 3) {
					uni.navigateTo({
						url: '../evaluate/evaluating?order_details_id=' + order_details_id + '&num=all'
					})
				} else {
					uni.navigateTo({
						url: '../evaluate/evaluating?order_details_id=' + order_details_id + '&add=true&num=all'
					})
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
			receiving_stop() {
				this.receiving_shop.flag = false
			},
			// 查看提取码
			_receiving() {
				var me = this
				_receiving(me)
			},
			_submitOne(event, sNo, order_id, status) {
				_submitOne(event, sNo, order_id, status, this)
			},
			_submitTwo(event, order_id, status) {
				_submitTwo(event, order_id, status, this)
			},
			back_click(id) {
				back_click(id, this)
			},

			changeValue(newValue, oldValue) {
				changeValue(newValue, oldValue, this)
			},
			_chakan(sNo) {
				var me = this
				if(me.logistics.length==1){
					uni.navigateTo({
						url: '../../pages/expressage/expressage?list='+JSON.stringify(me.logistics[0])+'&sNo=' + sNo,
					})
				}else if(me.logistics.length>1){
					uni.navigateTo({
						url: '../../pagesB/expressage/expressage?sNo=' + sNo,
					})
				}
			},
			_delOrder(sNo, order_id) {
				var me = this
				var data = {
					module: 'app',
					action: 'order',
					order_id: order_id,
					access_id: me.access_id,
					app: 'del_order'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						let {
							data: {
								code,
								message
							}
						} = res
						if (code == 200) {
							uni.showToast({
								title: '删除成功！',
								duration: 1000,
								icon: 'none'
							})
							uni.navigateBack({
								delta: 1
							})
						} else {
							uni.showToast({
								title: message,
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
			headapp
		}
	}
</script>

<style lang="less" scoped>
	/* @import url("../../static/css/order/order.css"); */
	@import url("../../static/css/order/order.less");

	.order_one {
		justify-content: flex-start;
		padding: 0 !important;
		font-size: 28upx;
		color: #666666;
		border-bottom: 1px solid rgb(238, 238, 238);
	}

	.order_one img:first-child {
		width: 33upx;
		height: 30upx;
		margin-right: 11upx;
	}

	.order_one img:last-child {
		width: 15upx;
		height: 27upx;
		margin-left: 16upx;
	}

	.order_two {
		padding-bottom: 0 !important;
	}

	.color_two {
		margin: 0;
	}

	.order_foot>div,
	.retreat {
		border-radius: 6upx;
		color: @uni-color-primary;
		border: 1px solid @uni-color-primary;
	}
	.order_zt{position: relative;overflow: hidden;}
	.orderbg{
		position: absolute;
		right: -120upx;top: 0;
		height: 100%;
	}
	.mt_0{
		margin-top: 0!important;
	}
	.order_time{
		font-size: 20rpx;
		color: #BBBBBB;
		margin-top: 16upx;
	}
</style>
