<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<heads :title='title'></heads>

		<view class="twins_box">
			<view class="twins">
				<view class="nav_twin" :class='{"nav_twin_hover": navActive}' @tap="changeNav(true,1)">
					今日拼团
					<view class="nav_line" v-if="navActive==true"></view>
				</view>

				<view class="nav_twin" :class='{"nav_twin_hover": !navActive}' @tap="changeNav(false,2)">
					拼团抢先知
					<view class="nav_line" v-if="navActive==false"></view>
				</view>
			</view>
		</view>
		<!-- <div class="group_imgurl" :style='{marginTop:halfWidth}'>
				<img :src="list_img">
			</div> -->

		<toload :load="!load">

			<div v-if='list.length==0 || !list'>

				<div class='noFindDiv yh-noFindDiv'>

					<div>
						<img class='noFindImg' :src="noFind" />
					</div>
					<span class='noFindText'>暂时还没有拼团活动哦</span>
					<div @tap="_toHome()" class="yh-toHome">
						<span class='goHome'>去逛逛</span>
					</div>
				</div>
			</div>

			<!-- 今日拼团 -->
			<ul class="group" v-if="navActive==true">
				<li @tap="_goods(item)" v-for='(item,index) in list' :key='index'>
					<div class="gd_bq" v-if="item.product_status==2">已抢光</div>
					<div class="gd_bq" v-if="item.product_status==3">已结束</div>
					<img :src="item.imgurl">

					<div class="group_div">
						<div class="group_title list_break2">{{item.pro_name}}</div>
						<div class="group_num" style="color:#9B9B9B;">已团{{item.sum}}件</div>
						<div class="group_money list_break1">

							<span class="yh-pronum">
								{{ item.min_man }}人团
								<span class="text-bold">
									￥{{ item.min_price }}
								</span>
							</span>

						</div>
						<div class="group_price list_break1"><span>单买价￥{{item.market_price}}</span></div>
						<div class="group_go" v-if="item.product_status==1">去开团</div>
						<div class="group_go gray_bg" v-else>去开团</div>
					</div>

				</li>
			</ul>
			<!-- 拼团抢先知 -->
			<ul class="group" v-else>
				<li @tap="_goods(item)" v-for='(item,index) in list' :key='index'>
					<img :src="item.imgurl">
					<div class="group_div">
						<div class="group_title list_break2">{{item.pro_name}}</div>

						<div class="group_num">
							<text class="g_n_num">{{item.day?item.day:0}}</text>
							<text class="g_n_dian" style="color: #999999;">天</text>
							<text class="g_n_num">{{item.hour}}</text>

							<text class="g_n_dian" style="color: #999999;">:</text>
							<text class="g_n_num">{{item.mniuate}}</text>

							<text class="g_n_dian" style="color: #999999;">:</text>
							<text class="g_n_num">{{item.second}}</text>

							<text decode="true">&nbsp;&nbsp;</text>
							<text style="color: #999999;margin-left: 12rpx;"> 后开抢</text>
						</div>

						<div class="group_money list_break1">
							<span class="yh-min-man">{{item.min_man}}人团</span>
							<span class="text-bold">￥{{item.min_price}}</span>
						</div>

						<div class="group_price list_break1"><span>单买价￥{{item.market_price}}</span></div>
						<div class="group_go gray_bg">去开团</div>
					</div>
				</li>
			</ul>

			<uni-load-more v-if='list.length>=10' :loadingType="loadingType2"></uni-load-more>
		</toload>
	</div>

	</div>
</template>

<script>
	import {
		_axios,
		setTimeData,
	} from '../../static/js/group/group.js'
	import Heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage.js'
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default {
		data() {
			return {
				returnR: '',
				back: '',
				title: '拼团',
				access_id: '',
				list: [],
				istips: false,
				page: 1, //分页码,
				navActive: true,
				navType: 1,
				head: true, //头部切换
				clickFlag: false,
				loadingType2: 0,
				list_img: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548123520934.jpeg",
				noImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/icon-no.png',
				shopImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/shopping_l2x.png',
				noFind: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/noFind.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				load: true,
				timeI: ''
			}
		},
		onLoad(option) {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
		},
		onShow() {
			this.list = []
			this.loadingType2 = 0
			this.page = 1
			this._axios();
		},
		computed: {
			halfWidth() {
				var gru = getStorage('data_height') ? getStorage('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},
		// 下拉加载
		onReachBottom() {
			this.page++
			this.loadingType2 = 1
			this._axios();
		},
		methods: {
			...mapMutations({
				cindex: 'SET_CINDEX',
				data_height: 'SET_DATA_HEIGHT',
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
					url: '../../pages/tabBar/home'
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
			_navigateTo(url) {
				console.log("url=" + url)
				uni.switchTab({
					url: url,
				})
			},
			/**
			 * 
			 * */
			setTimeData(data) {
				var me = this
				setTimeData(data, me)
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this
				_axios(me)
			},
			/**
			 * 跳转商品详情页
			 * */
			_goods(item) {
				uni.navigateTo({
					url: '../group/groupDetailed?pro_id=' + item.product_id + "&activity_no=" + item.activity_no + '&platform_activities_id=' + item.platform_activities_id
				});
			},
			/**
			 * 点击切换导航条
			 * */
			changeNav(flag, type) {
				this.load = true
				this.list = []
				this.navActive = flag
				this.navType = type
				this.loadingType2 = 1
				this.page = 1
				this._axios();
			}
		},
		components: {
			Heads,
			uniLoadMore,
			toload
		}
	}
</script>

<style>
	@import "../../static/css/group/group.css";
</style>
