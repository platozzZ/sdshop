<template>
	<div class="yh-page">

		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<heads :title='title' :returnR="doodsreturn"></heads>

		<toload :load="load">

			<div style='position: relative;'>
				<img v-if="brHeadImg" v-show="topTabBar" :src="brHeadImg" class="yh-brHeadImg">

				<div v-if='topTabBar'>
					<div class="spacer" v-if="!noBargain"></div>
					<div class='brDiv' v-for='(item,index) in list' :key='index' @tap='goGoods(item.goods_id,item.attr_id,item.status,item.order_no,item.leftTime,item.bargain_id,item.hasorder,item.sNo_id, item.isbegin)'>
						<div class='leftBrDiv'><img :src="item.img"></div>
						<div class='rightBrDiv'>
							<div class='proTitle'>{{item.title}}</div>
							<div class='proPrice'>
								<span class='newPrice'>¥{{item.min_price}}</span>
								<span class='oldPrice'>¥{{item.price}}</span>
							</div>
							<div class="group_num">
								<text class="g_n_num dayNum">{{item.day}}</text>
								<text class="yh-day">天</text>
								<text class="g_n_num">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num yh-g-n-num">{{item.second}}</text>
								<text style="color: #999;">{{item.isbegin==0?'后开始':'后结束'}}</text>
							</div>
							<div class='brBtn' v-if="item.isbegin && item.leftTime>0" @tap.stop='toBargainIng(item.goods_id,item.attr_id,item.status,item.order_no,item.bargain_id,item.hasorder,item.leftTime)'>
								<text v-if="item.status==0">立即砍价</text>
								<text v-else-if="item.status==1">继续砍价</text>
								<text v-else>查看详情</text>
							</div>
							<!-- isbegin : 1: 已开始 0: 未开始 -->
							<div class='brBtn getGray' v-else-if="!item.isbegin">未开始</div>
							<div class='brBtn getGray' v-else-if="item.leftTime<0">已结束</div>
						</div>
						<div class="spacer"></div>
					</div>
					<button class="btn-fixed" @tap="changeTabBar(false)">我的砍价</button>
				</div>

				<div v-else class="mt-2">
					<div class='brDiv' v-for='(item,index) in list' :key='index' @tap='goGoods(item.goods_id,item.attr_id,item.status,item.order_no,item.leftTime,item.bargain_id,item.hasorder,item.sNo_id, item.isbegin)'>
						<div class='leftBrDiv'><img :src="item.img" alt=""></div>
						<div class='rightBrDiv'>
							<div class='proTitle'>{{item.title}}</div>

							<div v-if='item.status==1&&item.original_price>0' class='proPrice' style='color: #ff1818;'>
								<div>
									<span class='newPrice'>¥{{item.min_price}}</span>
									<span class='oldPrice' style='color: #999999;'>¥{{item.price}}</span>
								</div>
								<div class="yh-length">
									已砍<span>{{item.success_money}}</span>元，还差<span>{{item.original_price}}</span>元
								</div>
							</div>

							<div v-else-if="item.leftTime>0&&item.status==2&&item.gopay==1" class='proPrice' style='color: #ff1818;'>砍价成功，待付款</div>
							<div v-else-if='item.leftTime>0&&item.status==2' class='proPrice' style='color: #ff1818;'>已砍至最低价，砍价成功</div>

							<!-- 砍价失败未砍至最低价 -->
							<div v-else-if='item.status==-1' class='proPrice' style='color: #ff1818;'>
								<div>
									<span class='newPrice'>¥{{ item.min_price }}</span>
									<span class='oldPrice' style='color: #999999;'>¥{{item.price}}</span>
								</div>
								<text v-if='item.original_price>0'>未砍至最低价，砍价失败</text>
								<text v-else>砍价失败，付款超时</text>
							</div>


							<div v-else class='proPrice' style='color: #ff1818;'>
								<text v-if='item.status==2&&!item.hasorder'>砍价成功，去付款</text>
								<text v-else-if='item.gopay==1&&item.hasorder==1'>砍价成功，待付款</text>
								<text v-else-if='item.status==3'>砍价成功,已付款！</text>
							</div>

							<!-- 继续砍价倒计时 -->
							<div class="group_num" v-if='item.leftTime > 0 && item.status ==1'>

								<span v-if='item.day'>
									<span class="g_n_num dayNum ">{{ item.day }}</span>
									<span style='margin: 0 5upx;color: #020202;'>天</span>
								</span>

								<text class="g_n_num">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num" style='margin-right: 10upx;'>{{item.second}}</text>


								<text v-if="item.status==2" style='color: #999;'>后取消订单</text>
								<text v-else-if="item.status==1" style='color: #999;'>后结束</text>
								<text v-else style='color: #999;'></text>
							</div>
							<!-- 去付款倒计时 -->
							<div class="group_num" v-else-if='item.status == 2 && !item.hasorder'>

								<span v-if='item.day'>
									<span class="g_n_num dayNum ">{{ item.day }}</span>
									<span style='margin: 0 5upx;color: #020202;'>天</span>
								</span>

								<text class="g_n_num">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num" style='margin-right: 10upx;'>{{item.second}}</text>


								<text v-if="item.status==2" style='color: #999;'>后取消订单</text>
								<text v-else-if="item.status==1" style='color: #999;'>后结束</text>
								<text v-else style='color: #999;'></text>
							</div>
							<!-- 待付款倒计时 -->
							<div class="group_num" v-else-if='item.gopay == 1 && item.hasorder == 1'>

								<span v-if='item.day'>
									<span class="g_n_num dayNum ">{{ item.day }}</span>
									<span style='margin: 0 5upx;color: #020202;'>天</span>
								</span>

								<text class="g_n_num">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num" style='margin-right: 10upx;'>{{item.second}}</text>


								<text v-if="item.status==2" style='color: #999;'>后取消订单</text>
								<text v-else-if="item.status==1" style='color: #999;'>后结束</text>
								<text v-else style='color: #999;'></text>
							</div>
							<!-- 已结束倒计时 -->
							<div class="group_num" v-else-if='item.leftTime <= 0'>

								<span v-if='item.day'>
									<span class="g_n_num dayNum g_n_nums">{{ item.day }}</span>
									<span style='margin: 0 5upx;color: #020202;'>天</span>
								</span>

								<text class="g_n_num g_n_nums">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num g_n_nums">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num g_n_nums" style='margin-right: 10upx;'>{{item.second}}</text>


								<text v-if="item.status==2" style='color: #999;'>后取消订单</text>
								<text v-else-if="item.status==1" style='color: #999;'>后结束</text>
								<text v-else style='color: #999;'></text>
							</div>
							<!-- 查看详情倒计时1 -->
							<div class="group_num" v-else-if='item.status==2 || item.status==3 || item.status==-1'>

								<span v-if='item.day'>
									<span class="g_n_num dayNum g_n_nums">{{ item.day }}</span>
									<span style='margin: 0 5upx;color: #020202;'>天</span>
								</span>

								<text class="g_n_num g_n_nums">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num g_n_nums">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num g_n_nums" style='margin-right: 10upx;'>{{item.second}}</text>


								<text v-if="item.status==2" style='color: #999;'>后取消订单</text>
								<text v-else-if="item.status==1" style='color: #999;'>后结束</text>
								<text v-else style='color: #999;'></text>
							</div>
							<!-- 查看详情倒计时2 -->
							<div class="group_num" v-else>

								<span v-if='item.day'>
									<span class="g_n_num dayNum g_n_nums">{{ item.day }}</span>
									<span style='margin: 0 5upx;color: #020202;'>天</span>
								</span>

								<text class="g_n_num g_n_nums">{{item.hour}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num g_n_nums">{{item.mniuate}}</text>
								<span class="g_n_dian">:</span>
								<text class="g_n_num g_n_nums" style='margin-right: 10upx;'>{{item.second}}</text>


								<text v-if="item.status==2" style='color: #999;'>后取消订单</text>
								<text v-else-if="item.status==1" style='color: #999;'>后结束</text>
								<text v-else style='color: #999;'></text>
							</div>


							<div class='brBtn' v-if='item.leftTime>0&&item.status==1' @tap.stop='contBr(item.goods_id,item.attr_id,item.status,item.order_no,item.bargain_id,item.isbegin)'>继续砍价</div>
							<div class='brBtn' v-else-if='item.status == 2 && !item.hasorder' @tap.stop='toPay(item.goods_id,item.attr_id,item.status,item.order_no,item.bargain_id,item.isbegin)'>去付款</div>
							<div class='brBtn' v-else-if='item.gopay == 1 && item.hasorder == 1' @tap.stop='lodingPay(item.sNo_id)'>待付款</div>

							<!-- <div class='brBtn getGray' v-else-if='item.status==2'>已付款</div> -->
							<div class='brBtn getGray' v-else-if='item.leftTime<=0'>已结束</div>
							<div class='brBtn getGray' v-else-if='item.status==2 || item.status==3 || item.status==-1' @tap.stop='contBr(item.goods_id,item.attr_id,item.status,item.order_no,item.bargain_id,item.isbegin)'>查看详情</div>
							<div class='brBtn getGray' v-else>查看详情</div>
						</div>
						<div class="spacer"></div>
					</div>

				</div>

				<!-- 如果没有商品的话显示 -->
				<view class="no-bargain" v-if="noBargain">
					<img :src="no_bargain" />
					<p>暂无砍价商品~</p>
				</view>
			</div>

			<template v-if="!noBargain&&list.length>9">
				<uni-load-more v-if="uniLoadMore" :loadingType="loadingType"></uni-load-more>
			</template>

	
			<!-- #ifndef MP-ALIPAY -->
			<transition name="fade">
			<!-- #endif -->
			
				<view class="dialog" v-show="isShow">
					<view class="dialog-box">
						<view class="dialog-header">提示</view>
						<view class="dialog-content">
							<p>{{dialogContent}}</p>
						</view>
						<view class="dialog-footer">
							<view class="dialog-cancel" @tap="closeDialog">否</view>
							<view class="dialog-confirm" @tap="clickConfirm">是</view>
						</view>
					</view>
				</view>
				
			<!-- #ifndef MP-ALIPAY -->
			</transition>
			<!-- #endif -->
			
		</toload>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import {
		mapMutations
	} from 'vuex'
	import uniLoadMore from "@/components/uni-load-more.vue"
	import toload from '@/components/toload.vue'
	export default {
		data() {
			return {
				doodsreturn: 0,
				timeid: 0,
				groupList: [],
				title: '热门砍价',
				access_id: '',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/loading.gif",
				nobargainImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/noFind.png",
				no_bargain: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/no_bargain.png",
				brHeadImg: '',
				load: false,
				topTabBar: true,
				list: '',
				page1: 1,
				page2: 1,
				noBargain: false, //是否显示暂无砍价商品
				loadingType: 0,
				daodi: false,
				obj: {},
				isShow: false, //是否显示模态框
				dialogContent: '', //模态框内容正文
				uniLoadMore: false, //默认不显示上拉加载
				hasorder: 0 //是否是待付款 0|1(待付款)
			}
		},
		onLoad(option) {
			var me = this;

			if (!option.topTabBar) {
				me.topTabBar = false;

				uni.setNavigationBarTitle({
					title: '我的砍价'
				})

				me.title = '我的砍价'
			} else {
				console.log('转发')
				this.doodsreturn = 6
			}

			me.access_id = uni.getStorageSync('access_id');
		},
		onShow() {
			let me = this;
			me.access_id = uni.getStorageSync('access_id');
			me.page1 = 1;
			me.page2 = 1;

			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231)
				});
			});

			p.then(() => {
				me.$nextTick(function() {
					// me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me._axios()
					// });
				});
			})
		},
		methods: {
			/**
			 * 返回
			 * */
			_back() {
				if (this.topTabBar) {
					uni.switchTab({
						url: '../../pages/tabBar/home'
					});
				} else {
					uni.switchTab({
						url: '../../pages/tabBar/my'
					});
				}
			},
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
			toPay(id, attr_id, status, order_no, bargain_id) {
				var product = []
				product.push({
					pid: id
				})
				product.push({
					cid: attr_id
				})
				product.push({
					num: 1
				})
				product.push({
					bargain: true
				})
				product.push({
					bargain_id: bargain_id
				})
				product.push({
					order_no: order_no
				})
				product = JSON.stringify(product)

				//#ifdef H5
				var storage = window.localStorage;
				storage.product = product;
				storage.bargain = true;
				storage.bargain_id = bargain_id;
				storage.order_no = order_no;
				uni.setStorageSync('bargain', true);
				// #endif

				uni.navigateTo({
					url: '../../pages/pay/orderDetailsr?product=' + product + '&bargain=true&bargain_id=' + bargain_id +
						'&order_no=' + order_no
				})
			},
			/**
			 * 
			 * */
			contBr(id, attr_id, status, order_no, bargain_id) {
				uni.navigateTo({
					url: 'bargainIng?proId=' + id + '&attr_id=' + attr_id + '&brStatus=' + status + '&order_no=' + order_no +
						'&bargain_id=' + bargain_id
				})
			},
			/**
			 * 
			 * */
			goGoods(id, attr_id, status, order_no, leftTime, bargain_id, hasorder, sNo_id, isbegin) {
				var me = this
				this.$store.state.pro_id = id;
				var bstatus = 3;
				if (status == 0) {
					bstatus = 4;
				} else if (status == 1) {
					bstatus = 0;
				} else if (status == 2) {
					bstatus = 1;
				} else if (status == 3) {
					bstatus = 2;
				}
				if (leftTime <= 0) {
					bstatus = 3;
				}
				// TDDO:
				// if (status > 0) {
				// 	uni.navigateTo({
				// 		url: 'bargainIng?proId=' + id + '&attr_id=' + attr_id + '&brStatus=' + status + '&order_no=' + order_no +
				// 			'&bargain_id=' + bargain_id + '&isbegin=' + isbegin
				// 	});
				// } else 
				if (leftTime > 0 && status == 2 && hasorder) {
					uni.navigateTo({
						url: '../../pages/goods/goodsDetailed?bargain=true&isbegin=' + isbegin + '&pro_id=' + id + '&brStatus=' +
							bstatus + '&attr_id=' +
							attr_id + '&order_no=' + order_no + '&leftTime=' + leftTime + '&bargain_id=' + bargain_id + '&hasorder=' +
							hasorder + '&sNo_id=' + sNo_id
					});
				} else {
					uni.navigateTo({
						url: '../../pages/goods/goodsDetailed?bargain=true&pro_id=' + id + '&brStatus=' + bstatus + '&attr_id=' +
							attr_id + '&order_no=' + order_no + '&leftTime=' + leftTime + '&bargain_id=' + bargain_id + '&isbegin=' +
							isbegin
					});
				}
			},
			/**
			 * 
			 * */
			lodingPay(sNo_id) {
				uni.navigateTo({
					url: '../../pages/order/order?order_id=' + sNo_id + '&showPay=true'
				})
			},
			/**
			 * 
			 * */
			setTimeData() {

				var self = this;
				if (self.groupList.length === 0) return false
				// if (!data) return false;
				// var groupList = data;

				for (var i = 0; i < self.groupList.length; i++) {

					var tt = true

					if (self.topTabBar) {

						var t = --self.groupList[i].leftTime;
						if (self.groupList[i].leftTime < 0) {
							tt = false
						}

					} else {

						if (self.groupList[i].status == 2) {

							var t = --self.groupList[i].canbuy;
							if (self.groupList[i].canbuy <= 0) {
								tt = false
							}

						} else {

							var t = --self.groupList[i].leftTime;
							if (self.groupList[i].leftTime <= 0 || self.groupList[i].status == 3 || self.groupList[i].status == -1) {
								tt = false
							}

						}
					}

					if (!tt) {
						self.groupList[i].hour = "00"
						self.groupList[i].mniuate = "00"
						self.groupList[i].second = "00"
						self.groupList[i].day = '0'
					} else {


						var d = Math.floor(parseInt(t) / 86400);
						var h = Math.floor((t / 3600) - (d * 24));
						var m = Math.floor((t - h * 60 * 60 - d * 24 * 60 * 60) / 60);
						var s = t % 60;
						if (h < 10) h = "0" + h;
						if (m < 10) m = "0" + m;
						if (s < 10) s = "0" + s;
						if (d == 0) d = "0";


						self.groupList[i].hour = isNaN(h) ? '00' : h;
						self.groupList[i].mniuate = isNaN(h) ? '00' : m;
						self.groupList[i].second = isNaN(h) ? '00' : s;
						self.groupList[i].day = isNaN(h) ? '00' : d;
					}
				}
				if (self.timeid === 0) {
					self.timeid = setInterval(function() {

						for (var i = 0; i < self.groupList.length; i++) {
							var tt = true
							if (self.topTabBar) {
								var t = --self.groupList[i].leftTime;
								if (self.groupList[i].leftTime < 0) {
									tt = false
								}
							} else {
								if (self.groupList[i].status == 2) {
									var t = --self.groupList[i].canbuy;
									if (self.groupList[i].canbuy <= 0) {
										tt = false
									}
								} else {
									var t = --self.groupList[i].leftTime;
									if (self.groupList[i].leftTime <= 0 || self.groupList[i].status == 3 || self.groupList[i].status == -1) {
										tt = false
									}
								}
							}
							if (!tt) {
								self.groupList[i].hour = "00"
								self.groupList[i].mniuate = "00"
								self.groupList[i].second = "00"
								self.groupList[i].day = '0'
							} else {
								var d = Math.floor(parseInt(t) / 86400);
								var h = Math.floor((t / 3600) - (d * 24));
								var m = Math.floor((t - h * 60 * 60 - d * 24 * 60 * 60) / 60);
								var s = t % 60;
								if (h < 10) h = "0" + h;
								if (m < 10) m = "0" + m;
								if (s < 10) s = "0" + s;
								if (d == 0) d = "0";
								self.groupList[i].hour = h;
								self.groupList[i].mniuate = m;
								self.groupList[i].second = s;
								self.groupList[i].day = d;
							}
						}
					}, 1000)

				}

				setTimeout(function() {
					self.list = self.groupList
				}, 0)
			},
			/**
			 * 关闭弹窗
			 * */
			closeDialog() {
				this.isShow = false;
			},
			/**
			 * 
			 * */
			clickConfirm() {
				var me = this
				this.closeDialog();
				uni.navigateTo({
					url: 'bargainIng?proId=' + me.obj.proId + '&attr_id=' + me.obj.attr_id + '&brStatus=' + me.obj.brStatus +
						'&bargain_id=' + me.obj.bargain_id + '&order_no=' + me.obj.order_no + '&hasorder=' + me.hasorder
				})
			},
			/**
			 * 立即砍价
			 * */
			toBargainIng(id, attr_id, status, order_no, bargain_id, hasorder, leftTime) {
				if (leftTime <= 0) {
					return;
				}

				var me = this
				var data = {
					module: 'app',
					action: 'login',
					app: 'token',
					access_id: this.access_id,
				}
				uni.request({
					url: uni.getStorageSync("url"),
					data,
					success: function(res) {
						if (res.data.code == 200 && res.data.login_status === 1) {
							console.log(status + '---leftTime----' + leftTime)
							if (status != 0 && leftTime > 0) {
								let content = {
									4: '砍价失败，是否查看详情？',
									0: '此商品砍价结束，是否查看详情？',
									1: '您已参与此商品的砍价活动，是否查看详情？',
									2: '您已完成砍价，是否查看详情？',
									3: '您已付款此商品，是否查看详情？'
								}
								me.obj = {
									proId: id,
									attr_id: attr_id,
									brStatus: status,
									order_no: order_no,
									bargain_id: bargain_id,
									hasorder: hasorder
								}
								if (status < 0) {
									if (status == -1) {
										me.dialogContent = content[0];
									} else {
										me.dialogContent = content[4];
									}
								} else {
									me.dialogContent = content[status];
								}
								me.isShow = true;
							} else if (status == 0) {
								uni.navigateTo({
									url: 'bargainIng?proId=' + id + '&attr_id=' + attr_id + '&brStatus=' + status + '&bargain_id=' +
										bargain_id + '&order_no=' + order_no
								})
							}
						} else {
							me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
						}
					}
				});
			},
			/**
			 * 
			 * */
			timeout() {
				let me = this;
				uni.showToast({
					title: '未登录，请先登录!',
					duration: 1000,
					icon: 'none'
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1'
					})
				}, 1000);
			},
			/**
			 * 我的砍价
			 * */
			changeTabBar(type) {
				let me = this;
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					uni.navigateTo({
						url: '/pagesA/bargain/bargain'
					})
					// me.list = '';
					// me.topTabBar = type;
					// me.title='我的砍价'
					// me._axios();
				});
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this;
				me.groupList = [];
				me.loadingType = 0;
				me.daodi = false;

				var data = {
					access_id: me.access_id,
					module: 'app',
					action: 'bargain',
				}

				if (this.topTabBar) {
					data.m = "bargainhome"
					data.page = this.page1
				} else {
					data.m = "mybargain"
					data.page = this.page2
				}

				uni.request({
					url: uni.getStorageSync("url"),
					data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						me.load = true
						if (res.data.code == 200) {

							me.uniLoadMore = true;
							me.brHeadImg = res.data.img;
							me.list = res.data.list;
							console.log(me.list);
							me.groupList.push(...res.data.list)

							me.setTimeData()

							me.noBargain = res.data.list.length ? false : true;

							if (res.data.list.length < 10) {
								me.loadingType = 2;
								me.daodi = true;
							}

						} else if (res.data.code == 404) {
							me.topTabBar = true;
							console.log("#########################");
							// me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
						} else {
							me.list = [];
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500
							})
						}
					}
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 * */
		onReachBottom() {

			if (this.daodi) {
				return false
			}

			var data = {
				access_id: this.access_id,
				module: 'app',
				action: 'bargain',
			}

			if (this.topTabBar) {
				data.m = "bargainhome"
				data.page = ++this.page1
			} else {
				data.m = "mybargain"
				data.page = ++this.page2
			}

			this.loadingType = 1;

			this.$req.post({
				data
			}).then(res => {

				if (res.code == 200) {
					if (res.list.length) {

						this.list = this.list.concat(res.list)
						this.groupList.push(...res.list)
						if (res.list.length < 10) {
							this.loadingType = 2;
							if (this.topTabBar) {
								this.page1 = 1;
							} else {
								this.page2 = 1;
							}
							this.daodi = true;
						}
					} else {
						this.loadingType = 2;
					}
				}

			})
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				// #ifdef MP
				heigh = 0
				// #endif
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			}
		},
		components: {
			uniLoadMore,
			heads,
			toload
		},
	}
</script>

<style scoped>
	@import url("../../static/css/bargain/bargain.css");
</style>
