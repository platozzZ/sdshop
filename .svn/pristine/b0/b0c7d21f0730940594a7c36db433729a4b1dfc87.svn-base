<template>
	<div class="bidding">
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		
		<!-- #ifndef MP -->
		<div class="yh-ifndefMP" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_toHome()" />
					<p style="font-size: 32upx;">竞拍</p>
					<img class='head_search' />
				</div>
				<!--   导航栏      -->
				<ul class='order_header'>
					<li class='header_li' :class="{header_border:status_id!=index}" v-for='(item,index) in header' :key='item.id' @tap="_header_index(index)">{{item}}</li>
				</ul>
			</div>
		</div>
		<div style="height: 178upx;width: 100%;"></div>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<div class="yh-ifdefMP">
			<div class='position_head'>
				<!--   导航栏      -->
				<ul class='order_header'>
					<li class='header_li' :class="{header_border:status_id!=index}" v-for='(item,index) in header' :key='item.id' @tap="_header_index(index)">{{item}}</li>
				</ul>
			</div>
		</div>
		<div style="height: 89upx;width: 100%;"></div>
		<!-- #endif -->


		<!--   订单列表     -->
		<div class="yh-dd-list">
			<div class="list_height"></div>

			<template v-if='order.length&&!load'>
				<ul class="list_ul" v-for='(item,index) in order' :key="index">
					<li v-if="order.length&&!load" @tap="nav_click(item.id,item.mark,item.is_promise,item.is_pay,item.is_buy)">
						<div v-if='status_id!=1'>
							<div class="list_content">
								<img mode='aspectFill' class="list_imgurl" :src="item.imgurl" />
								<div class="list_title list_break2">{{item.title}}</div>
								<div class="list_up list_break1">起拍价<span>¥{{item.price}}</span>参与{{item.pepole}}人</div>
								<div class="list_number list_break1">出价幅度¥{{item.add_price}}/次</div>
							</div>
							<div class="list_bottom">
								<span>未开始</span><img class='list_time' :src="list_nao" /><span class="list_nt">{{item.starttime}}开始</span>
								<div class="list_status" :style="item.status==0?list_bg_pic:list_bg_pro">
									<span>待开拍</span>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="list_content">
								<img mode='aspectFill' class="list_imgurl" :src="item.imgurl" />
								<div class="list_title list_break2">{{item.title}}</div>
								<div class="list_up list_break1">起拍价<span>¥{{item.price}}</span>参与{{item.pepole}}人</div>
								<div class="list_number list_break1">出价幅度¥{{item.add_price}}/次</div>
							</div>
							<div class="list_bottom">
								<img class='list_time' :src="list_nao" /><span class="list_nt">{{item.endtime}}结束</span>
								<div class="list_status" :style="item.status=='end'?list_bg_pic:list_bg_pro">
									<span>{{item.mark==1?'竞拍':'已结束'}}</span>
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
			<p>暂时还没有新的竞拍商品哦~</p>
		</div>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>

		<!-- 判断交过押金提示弹框 -->
		<div class="bid_pup" v-if="showEndFlag">
			<div class="bid_pup_flex">
				<div class="bid_pup_auto">
					<div class="end_tishi">提示</div>
					<div class="end_content">
						<div style="color:#444444">{{show_content}}</div>
					</div>
					<div @tap="closeEndFlag('cancel')" class="end_btn yh-end-btn1">取消</div>
					<div @tap="closeEndFlag(go_mark)" class="end_btn yh-end-btn2">确定</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
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
				fastTap: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/noFind.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				search2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/search2x.png',
				list_img: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1547003354273.png",
				list_nao: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548060359295.png",
				list_etc: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548060492548.png",
				list_bg_pic: "background-image: url(https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548060492548.png)",
				list_bg_pro: "background-image: url(https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548062041627.png)",
				list_n: false,
				head: true, //头部切换
				// header: ['即将开拍', '正在热拍', '我的竞拍'],
				header: ['正在热拍', '即将开拍'],
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
				showEndFlag: false, //弹出框  false-不弹出  true-弹出
				go_mark: '', //根据mark进行跳转的标识 1---出价页  3---订单确认页
				show_content: '', //弹窗框提示语
				page_0: 1, //未开拍-分页码
				page_1: 1, //热拍-分页码
				load_next: true, //是否能继续下滑加载 true:能 false:不能
			}
		},
		// 		
		onLoad() {
			this.status_id = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
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
			},
		},
		onShow() {
			this.status_id = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			
			//第一次进来初始化选择正在热拍
			if(this.load){
				this._header_index(0);
			}else{
				this._axios()
			}
			
		},
		methods: {
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
			_navigateTo(status, id) {
				if (status == 0) {
					uni.navigateTo({
						url: 'order?order_id=' + id + '&showPay=true',
					})
				} else {
					uni.navigateTo({
						url: 'order?order_id=' + id,
					})
				}

				this.flag = false
			},
			/**
			 * 
			 * */
			_back() {
				this.flag = false
				uni.switchTab({
					url: '../../pages/tabBar/home'
				})

			},
			/**
			 * 
			 * */
			_header_index(index) {
				var me = this
				me.load = true
				me.load_next
				if (me.header[index] == '正在热拍') {
					me.head_id(1)
					me.page_1 = 1
					me.status_id = me.$store.state.head_id
				} else if (me.header[index] == '即将开拍') {
					me.head_id(0)
					me.status_id = me.$store.state.head_id
					me.page_0 = 1
				}
				this._axios()
			},
			/**
			 * 竞拍商品跳转
			 * */
			nav_click(id, stat, promise, is_pay, is_buy) {
				this.bindding_num(id)
				console.log("页面跳转=" + this.status_id)
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

				// #ifdef H5
				var storage = window.localStorage;
				storage['bindding_id'] = id
				// #endif

				//将地址栏后面的参数全部放到bid的json字符串中，防止经过code刷新页面造成地址栏参数被编码
				if (is_pay == 1 || stat == 2 || stat == 3 || stat == 4 || stat == 5) {
					//如果在列表页出过押金且在竞拍中，给出弹框提示
					if (stat == 1) {
						this.showEndFlag = true
						this.go_mark = 1 //出价页
						this.show_content = '尊敬的会员,你已在该活动中上交了押金'
						return false
					} else if (stat == 3) {
						this.showEndFlag = true
						this.go_mark = 3 //订单页--未生成订单
						this.show_content = '尊敬的会员，你已经竞拍到了该商品请前去付款'
						return false
					} else if (stat == 4 && (is_buy != 1)) {
						console.log('ppppppppppppppp')
						console.log(stat, this.order)
						this.showEndFlag = true
						this.go_mark = 4 //订单页--生成订单未付款
						this.show_content = '尊敬的会员，你已生成待付款订单请前去支付'
						return false
					}
					uni.navigateTo({
						url: 'bidding_detailed_Two?mark=' + stat,
					})
				} else {
					var bid = new Object()
					bid.bindding_id = id
					bid.type = stat
					bid = JSON.stringify(bid) //只有在跳转bidding_detailed才对参数序列化

					uni.navigateTo({
						url: 'bidding_detailed?bid=' + bid,
					})
				}

			},
			/**
			 * 弹框提示按钮处理
			 * */
			closeEndFlag(flag) {
				var me = this
				if (flag == 1) { //选择出价
					me.showEndFlag = false
					uni.navigateTo({
						url: 'bidding_detailed_Two?mark=' + 1, //已出价，且在进行中
					})
				} else if (flag == 3) {
					me.showEndFlag = false
					this.pay_lx("jp")
					uni.navigateTo({
						url: '../../pagesA/bidding/bidding_order'
					})
					return false
				} else if (flag == 4) { //已生成订单且未付款，才提示跳转
					me.showEndFlag = false
					uni.navigateTo({
						url: '../../pages/order/myOrder'
					})
				} else {
					me.showEndFlag = false
				}

			},
			/**
			 * 下拉加载
			 * */
			onReachBottom: function() {
				var me = this

				if (me.load_next) { //有加载商品
					uni.showToast({
						title: '加载中...'
					})

					if (this.status_id == 0) {
						me.page_0 += 1
					} else if (this.status_id = 1) {

						me.page_1 += 1
					}
					var data = {
						module: "app",
						action: "auction",
						m: 'index',
						access_id: this.access_id,
						type: 'my',
						page: this.page_1
					}

					if (this.status_id == 0) {
						data.type = 'ready'
						data.page = this.page_0
					} else if (this.status_id = 1) {
						data.type = 'running'
						data.page = this.page_1
					}
					
					this.$req.post({ data }).then(res => {
						uni.hideLoading()
						if (res.code == 200) {

							if (res.list.length > 0) {
								me.order = me.order.concat(res.list)
							} else {
								me.load_next = false
								
								uni.showToast({
									title: '没有更多了',
									duration: 1500,
									icon: 'none'
								})
							}
						}
					})

				} else { //没有加载商品
					uni.showToast({
						title: '没有更多了',
						duration: 1500,
						icon: 'none'
					})
				}
			},
			/**
			 * 初始化
			 * */
			_axios() {
				var me = this
				var data = {
					module: "app",
					action: "auction",
					m: 'index',
					access_id: this.access_id,
					type: 'my',
					page: this.page_1,
				}

				if (this.status_id == 0) {
					data.type = 'ready'
					data.page = this.page_0
				} else if (this.status_id == 1) {
					data.type = 'running'
					data.page = this.page_1
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(ress) {
						me.load = false
						let {
							data: {
								list
							}
						} = ress
						
						if(me.status_id == 1){
							list.filter(item=>{
								let time = new Date(item.endtime.replace(/-/g,'/'))
								
								// 当前时间戳
								let currentTime = new Date()
								
								let reslut = time.getTime() - currentTime.getTime()
								
								if(reslut<=0){
									item.mark = 5
									item.status = 'end'
								}
							})
						}
						
						//获取订单数据
						me.order = list

						if (ress.length < 10) {
							me.allLoaded = true
						} else {
							me.allLoaded = false
						}

					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			...mapMutations({
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				bindding_num: "SET_BINDDING_NUM",
				bind_status: 'SET_BIND_STATUS',
				bind_promise: "SET_BIND_PPOMISE",
				head_id: "SET_HEAD_ID",
				pay_lx: "SET_PAY_LX",
			})
		},
	}
</script>

<style scoped>
	@import url("../../static/css/bidding/bidding.css");
</style>
