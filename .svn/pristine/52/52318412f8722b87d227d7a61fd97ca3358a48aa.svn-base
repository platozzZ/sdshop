<template>
	<div class="yh-integral">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title' returnR='7'></heads>


		<toload :load="!load">
			<div class="yh-loads">
				<img v-show="topTabBar" :src="brHeadImg" class="banner">
				<div class="div1">
					<div class="div1_left">
						我的积分：
						<img :src="integral_img" alt="">
						<text class="red">{{ myscore }}</text>
					</div>
					<div v-if="go_sign" class="div1_right" @tap='gosign'>领积分</div>
					<div class='guize_bg'>
						<img class='wen_img' :src="hei_wen" />
						<p @tap='_toGradeUse(true)' class='guize'>使用规则</p>
					</div>
				</div>

				<ul class="div2" v-if="!nogoods">
					<li @tap="_goods(item.id)" v-for='(item,index) in list' :key='index'>
						<div class="pro_all">

							<img :src="item.imgurl" class="pro_img">
							<div class="pro_title">{{item.product_title}}</div>

							<div class="pro_div3">

								<span class="pro_price" v-if="item.money>0 && item.integral>0">
									￥{{ item.money + ' + ' }}
									<img :src="integral_img">
									{{ item.integral }}
								</span>

								<span class="pro_price" v-else>
									<img :src="integral_img">
									{{item.integral}}
								</span>

								<div class="pro_two">

									<span>市场价:￥<span class="yh-price">{{ item.price }}</span></span>
									<span>销量:{{item.sales}}</span>
								</div>

							</div>
						</div>
					</li>
					<!-- <li @tap="_navigateTo1('../integral/integral_detail')">
					<div class="pro_all">
						<img :src="brHeadImg" class="pro_img" alt="">
						<div class="pro_title">小狗卡通休闲抱枕卡通休闲抱枕超可爱摆饰送女友</div>
						<div class="pro_div3">
							<span class="pro_price">￥100+<img :src="integral_img" alt="">580</span>
							<div class="pro_two">
								<span>市场价：￥<s>128 </s></span>
								<span>销量：12458</span>
							</div>
						</div>
					</div>
				</li> -->
				</ul>
				<!-- 如果没有商品的话显示 -->
				<view class="no-bargain" v-if="nogoods">
					<img :src="nogoodsImg" />
					<p>暂无积分商品~</p>
				</view>
			</div>
			<uni-load-more :loadingType="loadingType" v-if="list.length>9" v-show="uniLoadMore"></uni-load-more>
			<ruleModal v-model="isShow" @click="_toGradeUse" title="使用规则" :details="content" />
		</toload>

	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage'
	import uniLoadMore from "@/components/uni-load-more.vue"
	import ruleModal from '@/components/ruleModal.vue'
	import htmlParser from '@/common/html-parser.js'
	import toload from '@/components/toload.vue'

	export default {
		data() {
			return {
				title: '积分商城',
				access_id: '',
				nogoods: false,
				hei_wen: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx_heiwenhao.png',
				nogoodsImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/noFind.png",
				integral_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				// loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/loading.gif",
				brHeadImg: '',
				load: true,
				topTabBar: false,
				list: '',
				page: 1,
				loadingType: 0,
				uniLoadMore: false, //默认不显示上拉加载
				daodi: false,
				myscore: 0,
				go_sign: false,
				isShow: false, //规则控制
				content: '', //规则
			}
		},
		mounted(option) {

			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me._axios()
				});
			});

		},
		// onShow() {
		// 	let me = this;
		// 	me.$nextTick(function() {
		// 		me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
		// 			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
		// 			me._axios()
		// 		});
		// 	});
		// },
		methods: {
			/**
			 * 
			 * */
			_back() {
				uni.switchTab({
					url: '../../pages/tabBar/my'
				});
			},
			/**
			 * 
			 * */
			gosign() {
				uni.navigateTo({
					url: '../../pagesA/shop/sign'
				});
			},
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me.page = 1
				me.daodi = false
				me._axios();
			},
			/**
			 * 跳转商品详情页
			 * */
			_goods(id) {
				console.log(id)
				uni.navigateTo({
					url: '../integral/integral_detail?pro_id=' + id
				});
			},
			/**
			 * 
			 * */
			_axios() {
				var me = this

				if (me.page == 1) {
					me.list = ''
				}

				me.loadingType = 1;

				let data = {
					access_id: me.access_id,
					module: 'app',
					action: 'integral',
					app: 'index',
					page: me.page
				}

				this.$req.post({
					data
				}).then(res => {

					let list = res.list

					// 关闭加载中
					this.load = false

					if (res.code == 200) {

						if (me.page == 1) {

							me.nogoods = false
							me.list = list

							if (res.bg_img && res.bg_img.length > 0 && me.brHeadImg == '') {
								me.brHeadImg = res.bg_img
								me.topTabBar = true
							}

							me.myscore = res.score
							me.go_sign = res.go_sign

							if (list.length <= 0) {
								me.nogoods = true
							}

						} else {

							if (list.length > 0) {
								me.list.push(...res.list)
							}

						}

						if (list.length) {
							me.nogoods = false
							if (list.length < 10) {
								me.page = 1
								me.daodi = true
							}
							me.loadingType = 2
						} else {
							me.loadingType = 2
						}

					} else {

						if (res.data.msg) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1500
							})
						}
					}
				})

			},
			/**
			 * 
			 * */
			_navigateTo1(url) {
				uni.navigateTo({
					url: url,
				})
			},
			/**
			 * 规则
			 * */
			_toGradeUse(is) {
				if (is) {
					uni.request({
						data: {
							module: "app",
							action: "integral",
							app: 'rule',
							access_id: this.access_id
						},
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							if (res.data.code == 200) {
								this.content = htmlParser(res.data.content)
								this.isShow = !this.isShow
							} else {
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						}
					})
				} else {
					this.isShow = !this.isShow
				}

			},
		},
		onReachBottom() {
			var me = this;

			if (me.daodi) {
				return false
			}

			me.page = ++me.page
			me._axios()
		},
		components: {
			uniLoadMore,
			heads,
			ruleModal,
			toload
		},
	}
</script>

<style scoped>
	@import url("../../static/css/integral/integral.css");
</style>
