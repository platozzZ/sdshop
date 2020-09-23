<template>
	<div>

		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<div>
			<div class='position_head'>
				<heads :title='title'></heads>
				<!--   导航栏      -->
				<div style='height: 94upx;'>
					<ul class='order_header'>
						<li class='header_li' :class="{header_border:status_id==index}" v-for='(item,index) in header' :key='item.id'
						 @tap="_header_index(index)">{{item}}</li>
					</ul>
				</div>
			</div>
		</div>
		<!--   订单列表     -->

		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>
		<div v-else>
			<!-- 微信小程序 -->
			<!-- #ifdef MP-WEIXIN -->
			<div class="yh-order" v-if='order.length'>
				
				<ul class='order_goods' v-for='(item,index) in order' :key="index">
					<img class='img_zt' :src="item.status==12?img_cg:img_sb" v-if='item.status==12||item.status==11||item.status==10'>
					<li class='order_one'>
						<!-- <p style='color: #999999;'>订单号：{{item.sNo}}</p> -->
						
						<p @tap='_goStore(item.shop_id)' class='shopName'>
							<img :src="storeImg">{{item.shop_name}}
							<img :src="jiantou" class="yh-jiantouimg">
						</p>
						<p style='color: #FF3333;' v-text="item.status==0 ? '待付款':(item.status==1?'拼团成功-待发货':(item.status==2?'拼团成功-已发货':(item.status==3?'拼团成功-待评价':(item.status==9?'拼团中':(item.status==10?'拼团失败-未退款':(item.status==11?'拼团失败-已退款':(item.status==6?'交易关闭':(item.status==12 || item.status=='5'?'交易完成':''))))))))"></p>
					</li>
					
					<li class='order_two' v-for='(orders,index1) in item.list' :key="index1" @tap="_navigateTo(item.status,item.id,item.otype,item.can_open)">
						<img :src="orders.imgurl" />
						<div style="margin-right: 40upx;width: 58%;">
							<p class='order_p_name' style="height: 80upx;">{{orders.p_name}}</p>
							<p class='color_one'>{{orders.size}}</p>
						</div>
						<div>
							<p>￥{{orders.p_price}}</p>
							<p class='color_two'>x{{orders.num}}</p>
							<div class='retreat' v-if="orders.r_status==4||orders.r_status==6&&orders.re_type!=0" rich-text="orders.r_status==4?'退货中':(orders.r_status==6&&orders.re_type!=0?'退货完成':'')"></div>
						</div>
					</li>
					<li class='order_last'>
						<div>
							<span>共{{item.sum}}件商品</span>
							<span class='order_all'>合计：<span>￥{{item.z_price}}</span></span>
						</div>
						<div class='last_right'>
							<div @tap='_buttonLeft($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status)'
							 v-text="item.status==0? leftText[0]:(item.status==2||item.status==3||item.status==5?leftText[1]:(item.status==7||item.status==6||item.status==11||item.status==12?leftText[2]:(item.status==9||item.status==10||item.status==1?leftText[4]:'')))"></div>
							<div v-if='item.status!=10&&item.status!=0&&item.status!=6&&item.status!=7&&item.status!=12' @tap='_buttonRight($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status,item.list)'
							 :class='(item.status==1||item.status==9||item.status==11)&&item.delivery_status==1?"a1":""'>
								{{item.status==1?rightText[1]:(item.status==2?rightText[2]:(item.status==3?rightText[3]:(item.status==4?rightText[4]:(item.status==5?rightText[5]:(item.status==9?rightText[8]:(item.status==11?rightText[7]:''))))))}}
							</div>
						</div>
					</li>
					<li class="yh-line"></li>
				</ul>
				<uni-load-more v-if='order.length>10' :loadingType="loadingType"></uni-load-more>
			</div>
			<!-- #endif -->

			<!-- #ifndef MP-WEIXIN -->
			<div class="yh-order" v-if='order.length'>
				
				<ul class='order_goods' v-for='(item,index) in order' :key="index">
					<img class='img_zt' :src="item.status==12?img_cg:img_sb" v-if='item.status==12||item.status==11||item.status==10'>
					<li class='order_one'>
						<!-- <p style='color: #999999;'>订单号：{{item.sNo}}</p> -->
						<p @tap='_goStore(item.shop_id)' class='shopName'>
							<img :src="storeImg">{{item.shop_name}}
							<img :src="jiantou" class="yh-jiantouimg">
						</p>
						<p style='color: #FF3333;' v-text="item.status==0 ? '待付款':(item.status==1?'拼团成功-待发货':(item.status==2?'拼团成功-已发货':(item.status==3?'拼团成功-待评价':(item.status==9?'拼团中':(item.status == 11 && !item.refund?'拼团失败-退款中':(item.status==10?'拼团失败-未退款':(item.status==11?'拼团失败-已退款':(item.status==6?'交易关闭':(item.status==12?'交易完成':(item.status==5?'交易完成':''))))))))))"></p>
					</li>
					<view style="border-top: 1px solid #E6E6E6;"></view>
					<li class='order_two' v-for='(orders,index1) in item.list' :key="index1" @tap="_navigateTo(item.status,item.id,item.otype,item.can_open)">
						<img :src="orders.imgurl" />
						<div style="margin-right: 40upx;width: 58%;">
							<p class='order_p_name' style="height: 80upx;">{{orders.p_name}}</p>
							<p class='color_one'>{{orders.size}}</p>
						</div>
						<div>
							<p>￥{{orders.p_price}}</p>
							<p class='color_two'>x{{orders.num}}</p>
							<div class='retreat' v-if="orders.r_status==4||orders.r_status==6&&orders.re_type!=0" rich-text="orders.r_status==4?'退货中':(orders.r_status==6&&orders.re_type!=0?'退货完成':'')"></div>
							<!--<div class='retreat' v-if="orders.r_status==1">申请售后</div>-->
						</div>
					</li>
					<view style="border-top: 2upx solid #E6E6E6;margin-left: 30upx;"></view>
					<li class='order_last'>
						<div>
							<span>共{{item.sum}}件商品</span>
							<span class='order_all'>合计：<span>￥{{item.z_price}}</span></span>
						</div>
						<div class='last_right'>
							<div @tap='_buttonLeft($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status)'
							 v-text="item.status==0? leftText[0]:(item.status==2||item.status==3||item.status==5?leftText[1]:(item.status==7||item.status==6||item.status==11||item.status==12?leftText[2]:(item.status==9||item.status==10||item.status==1?leftText[4]:'')))"></div>
							<div v-if='item.status!=10&&item.status!=0&&item.status!=6&&item.status!=7&&item.status!=12' @tap='_buttonRight($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status,item.list)'
							 :class='(item.status==1||item.status==9||item.status==11)&&item.delivery_status==1?"a1":""'>
								{{item.status==1?rightText[1]:(item.status==2?rightText[2]:(item.status==3?rightText[3]:(item.status==4?rightText[4]:(item.status==5?rightText[5]:(item.status==9?rightText[8]:(item.status==11?rightText[7]:''))))))}}
							</div>
						</div>
					</li>
					<li class="yh-line"></li>
				</ul>
				<uni-load-more v-if='order.length>10' :loadingType="loadingType"></uni-load-more>
			</div>
			<!-- #endif -->

			<div v-else>
				<div class='noFindDiv'>
					<div>
						<img class='noFindImg' :src="noOrder" />
					</div>
					<span class='noFindText'>您还没有相关的订单哦</span>
					<div @tap="_toHome()" class="yh-toHome">
						<span class='goHome'>去逛逛</span>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import headapp from '../../components/header.vue'
	import heads from "../../components/header.vue"
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage'
	import uniLoadMore from "@/components/uni-load-more.vue"

	export default {
		data() {
			return {
				title: '我的拼团',
				fastTap: true,
				img_cg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ass_success.png',
				img_sb: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ass_fail.png',
				noOrder: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/noOrder.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/loading.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				bback: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/bback.png',
				search2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/search2x.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jiantou2x.png',
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/store.png',
				head: true, //头部切换
				header: ['全部', '待付款', '拼团中', '拼团成功', '拼团失败'],
				header_copy: ['all', 'notpay', 'grouping', 'success', 'fail'],
				rightText: ['立即付款', '提醒发货', '确认收货', '立即评价', '退货', '追加评价', '再次购买', '拼团详情', '邀请好友'],
				leftText: ['取消订单', '查看物流', '删除订单', '查看详情', '拼团详情'],
				access_id: '',
				order: '', //订单数据 
				status_id: '', //订单状态
				dis_play: '', //
				sreach_value: '', //搜索框的值
				page: 1, //加载页面
				allLoaded: false,
				autoFill: false, //若为真，loadmore 会自动检测并撑满其容器
				bottomStatus: '',
				bottomPullText: '上拉加载更多...',
				bottomDropText: '释放更新...',
				loading: false,
				load: true,
				stau_num: null,
				timer: null,
				count: '',
				flag: true,
				loadingType: 0,
				value: '',
				isClick: true, //防止连续点击
				order_type: "all", //订单类型
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
				]
			}
		},
		onReachBottom() {

			var me = this

			if (this.loadingType != 0) {
				return;
			}

			this.loadingType = 1;
			me.page += 1

			var data = {
				module: 'app',
				access_id: this.access_id,
				action: 'groupbuy',
				m: 'grouporder',
				order_type: this.order_type,
				page: this.page
			}


			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: function(res) {
					console.log('onReachBottom_request');
					if (res.data.code == 404) {
						me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
					}

					let {
						data: {
							order
						}
					} = res

					if (order.length > 0) {
						me.order = me.order.concat(order);
						if (order.length < 10) {
							me.loadingType = 2;
						} else {
							me.loadingType = 0;
						}
					}
				}
			})
		},
		onLoad(options) {
			this.status_id = this.$store.state.status
			this.order_type = this.header_copy[this.status_id]

			if (options.isPay) {
				this.status_id = 1
			}

		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
			// halfWidth1: function() {
			// 	var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
			// 	var heigh = parseInt(gru)
			// 	var he = heigh * 2
			// 	// #ifdef APP-PLUS
			// 	he = 176
			// 	// #endif
			// 	// #ifndef APP-PLUS
			// 	he = 182
			// 	// #endif
			// 	return uni.upx2px(he) + 'px';
			// },
			// halfWidth2: function() {
			// 	var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
			// 	var heigh = parseInt(gru)
			// 	var he = heigh * 2
			// 	// #ifdef APP-PLUS
			// 	he = 94 + heigh * 2
			// 	// #endif
			// 	// #ifndef APP-PLUS
			// 	he = 94
			// 	// #endif
			// 	return uni.upx2px(he) + 'px';
			// },
		},
		watch: {
			value: function(newValue, oldValue) {
				this.changeValue()
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		onShow() {
			let me = this;
			this.load = true
			this.status_id = this.$store.state.status
			this.order_type = this.header_copy[this.status_id]

			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231);
				});
			})

			p.then(() => {
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				if (!me.access_id) {
					me.load = false
				} else {
					me.page = 1
					me.loadingType = 0
					me._axios()
				}
			});

			this.flag = true;
		},
		components: {
			uniLoadMore,
			heads,
			headapp
		},
		methods: {
			...mapMutations({
				cart_id: 'SET_CART_ID',
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				status: 'SET_STATUS'
			}),
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			/**
			 * 
			 * */
			_toHome() {
				uni.switchTab({
					url: '../../pages/tabBar/home'
				})
			},
			/**
			 * 
			 * */
			_navigateTo(status, id, otype, can_open) {

				if (status == 0) {
					var path = '../../pages/order/order?showPay=true&order_id=' + id;
				} else {
					var path = '../../pages/order/order?order_id=' + id;
				}

				uni.navigateTo({
					url: path,
					success: function() {
						console.log(1.1)
					}
				})
				this.loadingType = 0
				this.page = 1
				this.flag = false

			},
			/**
			 * 
			 * */
			_after(e, id, content) {
				var order_details_id = []
				order_details_id.push(id)
				let value = e.target.innerText
				if (value == '申请售后') {
					uni.navigateTo({
						url: '../../pagesA/returnGoods/returnGoods?order_details_id' + this.order_details_id + '&order_anking=1'
					})
				} else if (value == '退货拒绝') {
					console.log(content)
					this.display_t = true
					this.rr_content = content
				}
			},
			/**
			 * 
			 * */
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 头部切换
			 * */
			_head() {
				this.head = !this.head
			},
			/**
			 * 
			 * */
			_header_index(index) {
				this.page = 1
				if (this.header[index] == '待付款') {
					this.status(1)
					this.order_type = 'notpay'
				} else if (this.header[index] == '拼团中') {
					this.status(2)
					this.order_type = 'grouping'
				} else if (this.header[index] == '拼团成功') {
					this.status(3)
					this.order_type = 'success'
				} else if (this.header[index] == '拼团失败') {
					this.status(4)
					this.order_type = 'fail'
				} else if (this.header[index] == '全部') {
					this.status(0)
					this.order_type = 'all'
				}

				this.status_id = this.$store.state.status
				this._axios()
			},
			/**
			 * 点击时，实行的事件
			 * */
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'groupbuy',
					m: 'grouporder',
					order_type: this.order_type,
					page: this.page,
				}

				if (this.access_id) {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							if (res.data.code == 404) {
								me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
							}
							setTimeout(function() {
								me.load = false
							}, 300)

							let {
								data: {
									order
								}
							} = res
							me.order = order

							if (order.length < 10) {
								me.allLoaded = true;
							} else {
								me.allLoaded = false;
							}
						}
					})
				}
			},
			/**
			 * 点击取消订单
			 * */
			_buttonLeft(event, order_id, sNo, attribute_id, p_id, index, status, sum) {
				return function() {
					if (!this.isClick) {
						return
					}
					this.isClick = false
					setTimeout(() => {
						var me = this
						//orde_id订单id  attribute_id商品属性id  p_id商品id  
						var otype = sNo.substr(0, 2);
						var data = {
							module: 'app',
							action: 'order',
							order_id: order_id,
							access_id: this.access_id
						}

						if (status == 0) {
							data.app = 'removeOrder'
							uni.request({
								data,
								url: uni.getStorageSync("url"),
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								method: 'POST',
								success: function(res) {

									if (res.data.code == 404) {
										me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
									}
									let {
										data: {
											code,
											message
										}
									} = res
									if (code == 200) {
										me._axios()
										uni.showToast({
											title: '取消成功！',
											duration: 1000,
											icon: 'none'
										})

									} else if (code == 202) {
										uni.showToast({
											title: '卖家已发货！',
											duration: 1000,
											icon: 'none'
										})
										me._axios()
									} else {
										uni.showToast({
											title: '网络繁忙请稍后再试!',
											duration: 1000,
											icon: 'none'
										})
									}
								}
							})
						} else if (status == 2 || status == 3 || status == 5) {
							let data = {
								module: 'app',
								action: 'order',
								app: 'logistics',
								id: sNo,
								access_id:this.access_id,
								type:'',
							}
							
							if(this.source == 1){
								data.type = 'pond'
							}
							uni.request({
								url: uni.getStorageSync("url"),
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data,
								method:'POST',
								success:(res) => {
									uni.hideLoading()
									if(res.data.code == 200){
										let data = res.data.res
										if(data.length>1){
											uni.navigateTo({
												url: '../../pagesB/expressage/expressage?sNo=' + sNo,
											})
										}else{
											uni.navigateTo({
												url: '../../pages/expressage/expressage?list='+JSON.stringify(data[0])+'&sNo=' + sNo,
											})
										}
									} else {
										uni.showToast({
											title:res.data.message,
											duration:1500,
											icon:'none'
										})
									}
								},
								fail:(e) => {
									uni.showToast({
										title: '数据加载失败！',
										duration: 2000,
										icon:'none'
									})
								}
							})
						} else if (status == 4 || (status == 1 && otype != 'PT')) {
							uni.navigateTo({
									url: '../../pages/order?order_id=' + order_id
								}),
								console.log('../../pages/order?order_id=' + order_id);
							console.log(456)
						} else if (status == 9 || status == 10 || (status == 1 && otype == 'PT')) {
							var path = '../group/group_end?sNo=' + sNo + '&returnR=1'
							uni.navigateTo({
								url: path
							})
						} else if (status == 12 || status == 7 || status == 6 || status == 11) {
							/*发送请求*/
							data.app = 'del_order'
							uni.request({
								data,
								url: uni.getStorageSync("url"),
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								method: 'POST',
								success: function(res) {
									if (res.data.code == 404) {
										me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
									}
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
										me._axios()
									} else {
										uni.showToast({
											title: message,
											duration: 1000,
											icon: 'none'
										})
									}
								}
							})
						}
						this.isClick = true
					}, 2000)
				}.call(this)
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
			 * 
			 * */
			_buttonRight(event, orde_id, sNo, attribute_id, p_id, index, status, sum, list) {
				var me = this
				var otype = sNo.substr(0, 2);
				//orde_id订单id  attribute_id商品属性id  p_id商品id  
				if (status == 7 || status == 6 || status == 12) {
					//跳转订单详情支付页
					var data = {
						module: 'app',
						action: 'order ',
						app: 'buy_again',
						id: orde_id,
						access_id: this.access_id
					}
					console.log(data)
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							if (res.data.code == 404) {
								me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
							}
							let {
								data: {
									cart_id,
									code,
									message
								}
							} = res
							if (code == 200) {
								me.cart_id(cart_id)
								me.order_id('')
								me.address_id('')
								uni.navigateTo({
									url: '../../pages/pay/orderDetailsr'
								})
							} else if (code == 105) {
								uni.showToast({
									title: '部分商品库存不足，无法再次购买',
									duration: 2000,
									icon: 'none'
								})
							}
						}
					})
				} else if (status == 0) {
					me.order_id(orde_id)
					me.address_id('')
					var path = '../../pages/order/order?order_id=' + orde_id;
					if (otype != 'PT') {
						path = path + '&showPay=true'
					}
					uni.navigateTo({
						url: path
					})
				} else if (status == 1) { //提醒发货
					//请求接口
					console.log(this.fastTap)
					if (!this.fastTap) {
						return
					}
					this.fastTap = false
					if (sum == 0) {
						var data = {
							module: 'app',
							order_id: orde_id,
							access_id: this.access_id,
							app: 'delivery_delivery',
							action: 'order'
						}
						console.log(data)
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: function(res) {
								me.fastTap = true
								if (res.data.code == 404) {
									me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
								}
								if (res.data.code == 200) {
									uni.showToast({
										title: '已提醒卖家发货！',
										duration: 1000,
										icon: 'none'
									})
									me._axios()
								}
							}
						})
					} else {
						me.fastTap = true
					}

				} else if (status == 4) {
					//跳转订单详情
					uni.navigateTo({
						url: '../../pages/order?order_id=' + orde_id
					})
				} else if (status == 3) {
					//评价页面
					console.log(list[0].id);
					uni.navigateTo({
						url: '../../pages/evaluate/evaluating?order_details_id=' + list[0].id + '&num=all'
					})
				} else if (status == 5) {
					//追加评价页面
					uni.navigateTo({
						url: '../../pages/evaluate/evaluating?order_details_id=' + list[0].id + '&add=true&num=all'
					})
				} else if (status == 9 || status == 10 || status == 11) {
					//参团页面
					var path = '../group/group_end?sNo=' + sNo + '&returnR=1'
					uni.navigateTo({
						url: path
					})
				} else if (status == 2) {
					var data = {
						module: 'app',
						action: 'order',
						app: 'ok_Order',
						order_id: orde_id,
						access_id: this.access_id
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							if (res.data.code == 404) {
								me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
							}
							let {
								data: {
									code,
									message
								}
							} = res
							if (code == 200) {
								uni.showToast({
									title: '收货成功！',
									duration: 1000,
									icon: 'none'
								})
								me._axios()
							} else {
								uni.showToast({
									title: '确认收货失败！',
									duration: 1000,
									icon: 'none'
								})
							}

						}
					})
				}
			},
			/**
			 * 
			 * */
			back_click() {
				uni.showToast({
					title: '请不要频繁点击提醒！',
					duration: 1000,
					icon: 'none'
				})
			},
			/**
			 * 
			 * */
			_seart() {
				var me = this
				uni.navigateTo({
					url: '../../pages/order/orderSearch?sreach_value=' + me.sreach_value
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/group/groupOrder.css");
</style>
