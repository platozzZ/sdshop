<template>
	<view>
		<div class='relative'>
			<heads :title='title' returnR='7'></heads>
			<!-- #ifndef MP -->
			<div id='copyshare' v-if='share_s==1' @tap="vipshare" :style="'top: '+top+'px'" :data-clipboard-text='shareHref'>会员分享</div>
			<!-- #endif -->
		</div>
		
		<!-- #ifdef MP -->
		
			<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
			<button class='vip_share_box' open-type="share">
				<div class='div'>会员分享</div>
			</button>
			<!-- #endif -->
			
			<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
			<div class='vip_share_box' v-if='share_s==1'>
				<span class='div' @tap="vipshare">会员分享</span>
			</div>
			<!-- #endif -->
			
		<!-- #endif -->
		<div class='all' v-for='(item, i) in userVipMsg' :key='i'>
			<div>
				<!-- 会员卡面 -->
				<div class='vip-card' :style="'height:'+TT_height">
					<image :src="item.imgurl" id='vip-card-img' :style="'height:'+TT_height"></image>
					<div>
						<image :src="item.headimgurl" class='vip-card-headimg'></image>
						<div class='vip-msg'>
							<span class='name'>
								<span class="user_name_style" :style="'color:'+item.font_color">{{item.user_name}}</span>
								<div class='tag vip-level' :style="'color:'+item.font_color">
									<img class='img' :src="item.imgurl_s">
									<span>{{item.grade}}</span>
								</div>
							</span>
							<div class='pay_btn_box'>
								<span v-if='vip_up==1' class='tag pay-tag' @tap="toVip(3)">升级</span>
							</div>
						</div>
					</div>
					<span class='tag-xf' @tap="toVip(2)">立即续费</span>
					<span class='time' :style="'color:'+item.date_color">{{item.grade}}有效期至{{item.grade_end}}</span>
				</div>
				<!-- 权益 -->
				<span class='desc-title'>我的专属权益</span>
				
				<div class='up-title' @tap='_toGradeUse'>晋升规则</div>
				<div class='desc'>
					<div class='desc-item'>
						<div class='desc-img rate'>{{item.rate}}</div>
						<span>{{item.rate}}折</span>
					</div>
					<div class='desc-item' v-for='(item, id) in vipRights' :key='id'>
						<div class='desc-img'></div>
						<span>{{item.name}}</span>
					</div>
				</div>
				<!-- 会员商品 -->
				<span class='good-title'>会员特惠商品</span>
				<div class='good'>
					<div class='good-item' v-for='(item, num) in product' :key='num'>
						<image class="good-img" :src="item.imgurl" mode="widthFix" @tap="_goods(item.id)"></image>
						<div class='good-msg'>
							<span class='good-name'>
								<span class='span'>会员</span>
								{{item.product_title}}
							</span>
							<span class='good-price'>会员价 ¥{{item.price}}</span>
							<span class='yj-price'>原价 ¥{{item.yprice}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 会员分享蒙版 -->
		<div v-if='shareFlag' class='vipshare' @tap="shareStop" @touchmove.stop.prevent='stopmove'>
			<div>
				<!-- #ifdef MP-WEIXIN -->
				<div class='relative'>
					<img :src="wechatimg">
					<p style='margin-top: -26upx;'>微信好友</p>
					<button class="share_btn" open-type="share">分享</button>
				</div>
				<!-- #endif -->
				
				<!-- #ifdef APP-PLUS -->
				<div @tap.stop='_shareApp(2)'>
					<img :src="wechatimg">
					<p>微信</p>
				</div>
				<div @tap.stop='_shareApp(1)'>
					<img :src="pyq_img">
					<p>朋友圈</p>
				</div>
				<!-- #endif -->
				
				<div @tap.stop='_shareApp(3)'>
					<img :src="ewmShareimg">
					<p>二维码分享</p>
				</div>
				
			</div>
		</div>
		<ruleModal v-model="isShow" @click="_toGradeUse" title="晋升规则" :details="rule" />
	</view>
</template>

<script>
	import Heads from '../../components/header.vue'
	import ruleModal from '@/components/ruleModal.vue'
	import htmlParser from '@/common/html-parser.js'
	import {
		getStorage
	} from '../../common/storage.js'
	import {
		mapMutations
	} from 'vuex'
	import lktauthorize from '../../components/lktauthorize.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import '../../common/clipboard.js'
	
	export default {
		data() {
			return {
				title: 'VIP会员中心', //页面标题
				userVipMsg: [],
				share_img:'',
				rule: '',
				product: [],
				shareFlag: false, //会员分享控制
				top:'0',  //设备顶部状态栏高度
				share_s:0,
				vip_up: 1,  //1、可以升级
				gz_height: '',
				user_id:'',
				shareHref:'',  //分享链接
				isShow:false,
				TT_height: '',
				pyq_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/wepyq.png",
				wechatimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wechat.png",
				ewmShareimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/ewmShare.png",
				
				// 以下为各会员权益，测试版
				vipRights: [
					{
						name: '快速退货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '活动专属', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '快速发货', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}, {
						name: '其他优惠', //权益名称
						image: uni.getStorageSync("endurl") + 'images/image_1/156404126821.png', //权益图标
					}
				]
			}
		},
		components: {
			Heads,
			wxParse,
			ruleModal
		},
		//转发
		onShareAppMessage: function(res) {
				
			let data = {
				isfx:1,
				tui_id:this.user_id,
			}
			
			let share = '/pagesA/vip/vip?data='+JSON.stringify(data)
			
			console.log('share是', share)
			if (res.from === 'button') {
				console.log('--------------button---------------')
			}
			
			return {
				title: '会员分享',
				path: share,
				imageUrl:this.share_img,
				// bgImgUrl:this.userVipMsg[0].imgurl,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onLoad() {
			//#ifdef MP
			let data={
				isfx: 1,
				tui_id: this.user_id,
			}
			// #endif
			//微信小程序中自定义标题
			//#ifdef MP-WEIXIN
			uni.setNavigationBarTitle({
				title: this.title
			});
			// #endif
			// #ifdef APP-PLUS
			var that = this
			uni.getSystemInfo({
				success(res){
					that.top=res.statusBarHeight
				}
			})
			// #endif

			this.gz_height = uni.upx2px(150)+'px'
			// 适配头条小程序
			this.TT_height = uni.upx2px(300) + 'px'
		},
		onShow() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id,
			this._axios();
		},
		methods: {
			_navigateTo(url){
				uni.navigateTo({
					url:url,
				})
			}, 
			/*   跳转商品详情页    */
			_goods(id) {
				uni.navigateTo({
					url: '../../pages/goods/goodsDetailed?pro_id=' + id
				});
			},
			_axios() {
				var me = this
				var data = {
					access_id: me.access_id,
					module: 'app',
					action: 'recharge',
					app: 'grade_center'
				}
				const promise = new Promise((resolve) => {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							if (res.data.code == 404) {
								me.access_id1 = false
							} else if (res.data.code == 200) {
								
								me.userVipMsg = res.data.data;
								me.share_img = res.data.share_img
								
								me.userVipMsg[0].grade_end=me.userVipMsg[0].grade_end.substring(0,11)
								me.userVipMsg[0].rate = Number(me.userVipMsg[0].rate).toFixed(1)
								me.rule = res.data.rule;
								me.product = res.data.product;
								me.share_s=res.data.share
								me.vip_up=res.data.up
								me.user_id=res.data.data[0].user_id
								
								
								resolve();
							}
						},
						error: function(err) {
							console.log(err)
						}
					})
				})
				promise.then(() => console.log(111));
			},
			// 进入vip支付页面
			toVip(flag){
				uni.setStorageSync('edit_flag',flag)
				uni.setStorageSync('edit_grade',this.userVipMsg[0].grade)
				this._navigateTo('../vip/vip')
			},
			// 会员分享,控制蒙版打开
			vipshare(){
				
				// #ifdef H5
				let data={
					isfx: 1,
					tui_id: this.user_id
				}
				let me=this
				me.shareHref=uni.getStorageSync("h5_url")+'pagesA/vip/vip?data='+encodeURIComponent(JSON.stringify(data))
				var Clipboard = require('../../common/clipboard.js')
				var clipboard = new Clipboard('#copyshare')
				clipboard.on('success', function (e) {
					console.log('--复制分享链接成功--'.e)
					uni.showToast({
						title:'复制分享链接成功！',
						duration:1000,
						icon:'none'
					})
				});
				clipboard.on('error', function(e) {
					console.log('--复制分享链接失败--'.e)
					uni.showToast({
						title:'复制分享链接失败！',
						duration:1000,
						icon:'none'
					})
					document.querySelector('.copy');
				});
				// #endif
				
				// #ifndef H5
				this.shareFlag=true
				// #endif
			},
			// 查看更多
			_gzgd(){
				if(this.gz_height!='auto'){
					this.gz_height='auto'
				}else{
					this.gz_height = uni.upx2px(150)+'px'
				}
			},
			// 关闭会员分享蒙版
			shareStop(){
				this.shareFlag=false
			},
			// 阻止冒泡
			stopmove(){},
			// 分享方法
			_shareApp(type){
				if(type==3){
					uni.navigateTo({
						url:'../../pagesB/vip/vip_share'
					})
					return
				}
				var me = this
				var scene=''
				if(type==1){
					//App分享到 微信朋友圈
					scene='WXSenceTimeline'
				}else if(type==2){
					//App分享到 微信好友
					scene='WXSceneSession'
				}
				let data={
					isfx: 1,
					tui_id: this.user_id
				}
				var url=uni.getStorageSync("h5_url")+'pagesA/vip/vip?data='+encodeURIComponent(JSON.stringify(data))
				uni.share({
					provider: "weixin",
					scene,
					type: 0,
					href: url,
					title:'会员推荐',
					summary:'快来加入会员吧，享受更多优惠!',
					imageUrl: me.userVipMsg[0].headimgurl,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			_toGradeUse(){
				this.isShow = !this.isShow
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/vip/vipClub.css");
</style>