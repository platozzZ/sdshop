<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>

		<!--   订单列表     -->
		<div class="yh-ddlist">
			<div class="list_height"></div>
			<template v-if='order.length&&!load'>
				<ul class="list_ul" v-for='(item,index) in order' :key="index">
					<li v-if="order.length&&!load" @tap="nav_click(item.id,item.mark,item.is_promise)" :class="status_id==1?'list_li2':''">
						<div>
							<img class="list_imgurl" :src="item.imgurl" />
							<div class="list_content">
								<div class="list_title list_break2">{{item.title}}</div>
								<div class="list_up list_break1">起拍价<span>¥{{item.price}}</span>出价{{item.pepole}}人</div>
								<div class="list_number list_break1">出价幅度¥{{item.add_price}}/次</div>
							</div>
							<!-- mark（1-继续竞拍 2-已结束，不是得主  3.已结束，是得主未付款 4.已结束，是得主已付款） -->
							<div class="list_bottom">
								<span>{{item.mark==1?"进行中":(item.mark==2?"已结束":(item.mark==3?"待付款":(item.mark==4?"已完成":(item.mark==5?"已结束":""))))}}</span>
								<img class='list_time' :src="list_nao" />
								<span class="list_nt" v-if='item.mark == 3'>{{item.invalid_time}}前下单</span>
								<span class="list_nt" v-if='item.mark == 4 && item.is_buy == 0'>{{item.endtime}}截止</span>
								<span class="list_nt" v-if='item.mark == 4 && item.is_buy == 1'>{{item.endtime}}截止</span>
								<span class="list_nt" v-if='item.mark != 3 && item.mark != 4'>{{item.endtime}}截止</span>


								<!-- 待付款和我的订单阻止冒泡 -->
								<div v-if="item.mark==3||item.mark==4" class="list_status" :style="item.mark==2||item.mark ==5?list_bg_pic:list_bg_pro"
								 @click.stop="nav_click_sm(item.id,item.mark,item.is_promise)">
									<span>{{(item.mark==1?'继续竞拍':(item.mark==2?'已结束':(item.mark==3?'待付款':(item.mark==4?'我的订单':(item.mark==5?'已结束':"")))))}}</span>
								</div>

								<div v-else class="list_status" :style="item.mark==2||item.mark ==5?list_bg_pic:list_bg_pro">
									<span>{{(item.mark==1?'继续竞拍':(item.mark==2?'已结束':(item.mark==3?'待付款':(item.mark==4?'我的订单':(item.mark==5?'已结束':"")))))}}</span>
								</div>
							</div>
						</div>

						<div class="list_height"></div>
					</li>
				</ul>
			</template>
		</div>
		<div class='empty_play' v-if='!order.length&&!load'>
			<img :src="emptyImg" />
			<p>您暂时还没有相关的订单哦</p>
			<p class='empty_p'>可以去看看有那些想买的</p>
			<div @tap="_toHome()">去商城逛逛</div>
		</div>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
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
				title: '我的竞拍',
				fastTap: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/noFind.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				search2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/search@2x.png',
				list_img: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1547003354273.png",
				list_nao: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548060359295.png",
				list_etc: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548060492548.png",
				list_bg_pic: "background-image: url(https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548060492548.png)",
				list_bg_pro: "background-image: url(https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548062041627.png)",
				list_n: false,
				head: true, //头部切换
				// header: ['即将开拍', '正在热拍', '我的竞拍'],
				header: ['即将开拍', '正在热拍'],
				access_id: '',
				order: '', //订单数据 
				status_id: '', //订单状态
				dis_play: '', //
				sreach_value: '', //搜索框的值
				page: 1, //加载页码
				load_next: true, //能否继续下拉 true:能 false:不能
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
				clickFlag: false,
			}
		},
		components: {
			Heads
		},
		onLoad() {
			this.status_id = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this._axios()
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2

				// #ifdef MP-WEIXIN
				return '0px';
				// #endif

				// #ifndef MP-WEIXIN
				return uni.upx2px(he) + 'px';
				// #endif

			},
		},
		onShow() {
			var me = this;
			this.status_id = this.$store.state.head_id
			
			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231)
				});
			});
			
			p.then(() => {
				me.$nextTick(function() {
					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
						me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
						me._axios()
					});
				});
			})
		},
		onReachBottom: function() {
			var me = this
		
			if (me.load_next) { //有可加载的商品
				me.page += 1;
				var data = {
					module: 'app',
					auction: 'auction',
					m: 'index',
					type: 'my',
					access_id: this.access_id,
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
						if (res.data.code == 200) {
							if (res.data.list.length > 0) {
								me.order = me.order.concat(res.data.list)
							} else {
								me.load_next = false
								uni.showToast({
									title: '没有更多了',
									duration: 1500,
									icon: 'none'
								})
							}
						}
					},
					error: function(err) {
						console.log(err)
					},
					complete: function() {
						uni.hideLoading();
					}
				})
			} else { //无加载商品
				uni.showToast({
					title: '没有更多了',
					duration: 1500,
					icon: 'none'
				})
			}
		},
		methods: {
			...mapMutations({
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				bindding_num: "SET_BINDDING_NUM",
				bind_status: 'SET_BIND_STATUS',
				bind_promise: "SET_BIND_PPOMISE",
				head_id: "SET_HEAD_ID",
				pay_lx: "SET_PAY_LX",
			}),
			/**
			 * 自定义页面跳转方法
			 * */
			gotoHomePage() {
				var me = this;
				if (me.clickFlag) {
					return;
				} else {
					me.clickFlag = true
				}
				uni.switchTab({
					url: '../../pages/tabBar/my'
				})
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
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 跳转
			 * */
			nav_click(id, stat, promise) {
				this.bindding_num(id)
				if (this.status_id == 0) {
					this.bind_promise(0)
					this.bind_status(0)
				} else if (this.status_id == 2) {
					this.bind_promise(1)
					this.bind_status(stat)
				} else if (this.status_id == 1) {
					if (stat == 1) {
						this.bind_promise(promise)
					} else {
						this.bind_promise(1)
					}
					this.bind_status(stat)
				}
				//经我的竞拍页面进入出价详情页
				uni.navigateTo({
					url: 'bidding_detailed_Two?mark=' + stat + '&from_my=1',
				})
			},
			/**
			 * 待付款和我的订单跳转处理
			 * */
			nav_click_sm(id, stat, promise) {
				//一堆不知道操作设么的东西
				this.bindding_num(id)
				if (this.status_id == 0) {
					this.bind_promise(0)
					this.bind_status(0)
				} else if (this.status_id == 2) {
					this.bind_promise(1)
					this.bind_status(stat)
				} else if (this.status_id == 1) {
					if (stat == 1) {
						this.bind_promise(promise)
					} else {
						this.bind_promise(1)
					}
					this.bind_status(stat)
				}

				if (stat == 3) {
					this.pay_lx("jp")
					uni.navigateTo({
						url: '../../pagesA/bidding/bidding_order'
					})
					return false
				} else if (stat == 4) {
					uni.navigateTo({
						url: '../../pages/order/myOrder',
					})
				}
			},
			/**
			 * 初始加载函数
			 * */
			_axios() {
				var me = this
				var data = {
					module: "app",
					action: "auction",
					m: 'index',
					access_id: this.access_id,
					type: 'my',
					page: this.page,
				}

				console.log(data.type)
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(ress) {
						console.log("9090")
						console.log(ress)

						me.load = false
						let {
							data: {
								res
							}
						} = ress
						me.order = res
						console.log("res==")
						console.log(res)
						if (res.length < 10) {
							me.allLoaded = true
						} else {
							me.allLoaded = false
						}

					},
					error: function(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/bidding/bidding_my.css");
</style>
