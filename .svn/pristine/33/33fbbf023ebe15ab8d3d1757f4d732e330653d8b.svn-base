<template>
	<div class="order_ii yh-integral">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		
		<div v-if='!goods' class='yulan'>
			<img class='img' :src='yulan'></image>
		</div>
		
		<div v-else ref='box' class="yh-boxs" id="boxs" @touchmove="setHead">
			<!-- 客服按钮 -->
			<!-- #ifdef MP-WEIXIN -->
				<button type="primary" open-type="contact">
					<img class="kefu" :src="integral_kf" />
				</button>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU-->
			<img :src="integral_kf" class="kefu" @tap="kf(pro_id)"/>
			<!-- #endif -->
			
			<!-- #ifdef MP-BAIDU -->
			<button open-type="contact" bindcontact="contactCB">
				<img class="kefu" :src="integral_kf" />
			</button>
			<!-- #endif -->
			
			<div class="data_h text123" :style="{height: halfWidth}">
				<div class="data_h_h text123" :style="{height: halfWidth}" :class="{gd_headerplus:headerplus}"></div>
			</div>
			<!--头部-->
			<div class="gd_header" :style="{top: halfWidth}" :class="{gd_headerplus:headerplus}" style="position: fixed;">
				<img :src="bback_img" class="gd_back" @tap="_goback()">
			</div>
			<!--  轮播图   -->
			<swiper  style='height: 750upx'>
				<swiper-item>
					<img v-if='goods.imgurl' style="width:100%;height:750upx" class="swipe" :src="goods.imgurl">
				</swiper-item>
			</swiper>
			<div class='goods_name'>
				<p class='goods_price'>
					<span style='font-size: 34upx;font-weight: bold;' v-if="goods.money>0 && goods.integral>0">￥{{goods.money + ' + '}}<img :src="integral_img" style="height: 26upx;width: 26upx;margin-right: 3px;">{{goods.integral}}</span>
					<span style='font-size: 30upx;' v-else><img :src="integral_img" style="height: 26upx;width: 26upx;margin-right: 3px;">{{goods.integral}}</span>
					<span class="sc_price">市场价：￥{{goods.price}}</span>
				</p>
				<p style="font-size: 30upx;font-weight: bold;padding-bottom: 30upx;">{{goods.attribute}}{{goods.product_title}} </p>
				<p class='goods_three'>
					<span>销量：{{goods.score}}</span>
					<span style='color: #020202;display: flex;align-items: center;' @tap="showShareMask(0)">
						<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
							<button id="copyy" :data-clipboard-text='shareHref' open-type="share" style="line-height: 0;">
								<img class="fenxiang" :src="fx_img"/>
							</button>分享
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU-->
							<img :src="fx_img" class="fenxiang" id="copyy" :data-clipboard-text='shareHref'/>分享
						<!-- #endif -->
					</span>
				</p>
				<!-- <p class="goods_guige">
					<span style="color: #888888;">属性</span>
					<span style="padding-left: 36upx;">{{goods.attribute}}</span>
					<img class='arrow' :src="you_img" />
				</p> -->
			</div>
			<div class="kong"></div>
			<div class='user gd_user' v-if='comments.length' @tap="_evaluate(goods.goods_id)">
				<p>用户评价（{{comm_count}}）</p>
				<img  class='arrow' :src="you_img" />
			</div>
			<div v-if='comments.length' style='padding: 0 30upx;margin: 30upx 0;'>
				<div style='height: 54upx;justify-content: flex-start;margin-bottom: 23upx;' class='allCenter'>
					<img :src="comments[0].anonymous==0?comments[0].headimgurl:niming" style='width: 54upx;height: 54upx;margin-right: 24upx;' >
					<span v-if="comments[0].anonymous==0" style='font-size: 28upx;color: #020202;'>{{comments[0].user_name}}</span>
					<span v-else style='font-size: 28upx;color: #020202;'>匿名</span>
				</div>
				<div style='font-size: 24upx;color: #999999;margin-bottom: 40upx;'>{{comments[0].add_time}}</div>
				<div style='font-size: 28upx;color: #020202;'>{{comments[0].content}}</div>
			</div>
			
			<div class='user' v-if='!comments.length'>
				<p style="font-size: 30upx;">暂无评价</p>
			</div>
			<div class="kong"></div>
			<div style='height: 228upx;'>
				<div class='store store1' >
					<div class='store1Div'>
						<img :src='shop_list.shop_logo' >
						<div style="font-weight: bold;">{{shop_list.shop_name}}</div>
					</div>
					<view style="display: flex;width: 280upx;justify-content: space-around;">
						<!-- #ifdef MP-ALIPAY || MP-BAIDU -->
						<button open-type="share" style="border: none;height: auto;" @tap='showShareMask(shop_list.shop_id)' id="copyshare" :data-clipboard-text='shareHref'>
							<div class='goStore store1Div' style="color: #FF4444!important;background: #fff!important;border: 1px solid #FF4444;!important">分享店铺</div>
						</button>
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY || MP-BAIDU-->
						<div class='goStore store1Div' style="color: #FF4444!important;background: #fff!important;border: 1px solid #FF4444;!important" @tap='showShareMask(shop_list.shop_id)' id="copyshare" :data-clipboard-text='shareHref'>分享店铺</div>
						<!-- #endif -->
						<div class='goStore store1Div' @tap='_goStore(shop_list.shop_id)'>进店逛逛</div>
					</view>
				</div>
				<div class='store store2' style='justify-content: space-around;'>
					<div class='store2Div'>
						<p>{{shop_list.quantity_on_sale}}</p>
						<div>在售商品</div>
						<div class="shuxian"></div>
					</div>
					<div class='store2Div'>
						<p>{{shop_list.quantity_sold}}</p>
						<div>已售</div>
						<div class="shuxian"></div>
					</div>
					<div class='store2Div' >
						<p>{{shop_list.collection_num}}</p>
						<div>关注人数</div>
					</div>
				</div>
			</div>
			<div class="kong"></div>
			<div class='goods_d' id="doogi">商品详情</div>
			<!--  商品详情    -->
			<div class='content_d' id='content_d'>
				<!-- <wxParse v-if='goods.content' :content="goods.content"></wxParse> -->
				<rich-text v-if='goods.content' :nodes="goods.content"></rich-text>
			</div>
			<div class='goods_foot'>
				<div class='goods_bottom'>
					<div class='goods_two' style="background-color: #020202;width: 100%;" @tap="_buy">立即兑换</div>
				</div>
			</div>
			<div class='share' v-if="g_show">
				<div >
					<img :src="top_img" />
				</div>
			</div>
		</div>
		
		<!-- 遮罩 -->
		<div class='mask' @touchmove.stop.prevent="moveHandle" @tap='_shareDiv' v-if='shareDiv'>
			
			<div class='allCenter yh-allCenter'>
				
				<div class="yh-shareWay" v-for='(item,index1) in shareWay' :key='index1' @tap='_invite(item.name)'>
					
					<div>
						<img :src="item.imgUrl" class="yh-imgUrl">
					</div>
					
					<span class="yh-shareWay-name">{{item.name}}</span>
				</div>
				
			</div>
			
		</div>
		
		<div class="mask" @touchmove.stop.prevent="moveHandle" v-if="saveEWM">
			
			<div class="shareEwm" v-if="saveEWM">
				
				<img :src="ewmImg" class="imgEwm">
				<img :src="close" class="close" @tap="_closeAllMask">
				
				<view class="saveEWMBtn" @tap="_downEWM()">
					<img :src="saves" class="saves">
					保存图片
				</view>
				
			</div>
			
		</div>
		
		<div class="mask" v-if="shareMask && !saveEWM" @tap="_closeAllMask">
			
			<!-- 邀请链接的弹框 -->
			<div class="shareMask" v-if="!saveEWM" @tap.stop>
				
				<div class="shareMaskTitle">分享至</div>
				
				<!-- #ifdef MP-WEIXIN -->
				<div class="yh-ptcon">
					
					<div class="shareIcon">
						<button class="share_btn" open-type="share">
							<img :src="wx_img"/>
							<p class="yh-p">微信好友</p>
						</button>
					</div>
					
					<div class="shareIcon" @tap="showSaveEWM('wx')">
						<img :src="erm_img"/>
						<p>二维码分享</p>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- #endif -->
				
				
				<!-- #ifdef APP-PLUS -->
				<div class="yh-ptcon">
					
					<div class="shareIcon yh-shareIcon" @tap="_shareApp(1)">
						<img :src="erm_pyq_img"/>
						<p>微信朋友圈</p>
					</div>
					
					<div class="shareIcon yh-shareIcon" @tap="_shareApp(2)">
						<img :src="wx_img"/>
						<p>微信好友</p>
					</div>
					
					<div class="shareIcon yh-shareIcon" @tap="showSaveEWM('app')">
						<img :src="erm_img"/>
						<p>二维码分享</p>
					</div>
					
					<div class="clearfix"></div>
				</div>
				<!-- #endif -->
				
				
				<div class="shareEnd" @tap="closeShareMask()">
					取消
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	
	import {mapMutations, mapState } from 'vuex'
	import { getStorage } from '../../common/storage.js'
	
	import {
		LaiKeTui_collection,
		LaiKeTuiShowSaveEWM,
		LaiKeTuiShopEWM,
		LaiKeTuiInvite,
	} from '../../static/js/goods/goodsDetailed.js'
	
	export default {
		data() {
			return {
				close:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/close_bb.png',
				saves:'',
				integral_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				integral_sc1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_sc1.png",
				integral_sc2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_sc2.png",
				integral_kf:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_kf.png",
				yulan:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/yulan.gif',
				fx_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon/share.png",
				top_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon/kaobei2x.png",
				niming:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/landing_logo2x.png",
				wx_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wechat.png",
				erm_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/ewmShare.png",
				erm_pyq_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wepyq.png",
				bback_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon/bback.png",
				imgurls:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon/landing_logo.png",
				logo:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon/lktlogo.png",
				you_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon/jiantou2x.png",
				option:'',
				comm_count:0,//评价总数
				num:'',//规格数量
				price:'',//规格价格
				imgurl:'',//规格图片
				pro:'',//商品信息
				comments:'',//评价信息
				type:'',//判断进入规格选择是从立即购买1、加入购物车2、规格选择进入3
				access_id:'',
				g_show:false,  //回顶部显示
				isfx:'',
				pro_id:'',
				goods:'',
				shop_list:'',
				ewmImg:'',//二维码图片
				saveEWM:false,
				collection:'',//收藏状态
				collection_id:'',//收藏id
				title: '商品详情',
				is_jifen:true,
				is_shop:false,
				shop_id:'',
				sharehrefTitle:'',
				shareImg:'',
				shareContent:'',
				shareHref:'',
				shareMask:false,
				shareDiv:false,
				fastTap:true,
				isopen:1,
				shareWay: [
					// #ifndef MP-WEIXIN
					{
						name: '微信',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/wechat.png'
					},
					{
						name: '朋友圈',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/fdc.png'
					},
					{
						name: '二维码分享',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/ewmShare.png'
					},
					// #endif
				],
				headerplus:false
			}
		},
		computed: {
			
		},
		onLoad(option){
			this.pro_id = option.pro_id
			// this._axios()
		},
		onShow(){
			this._axios()
		},
		  //转发
		onShareAppMessage: function (res) {
			if(this.login_status == 0){
				uni.navigateTo({
					url: '../../login/login?landing_code=1'
				})
			}else{
				if (res.from === 'button') {
					
				}
				return {
					title: this.sharehrefTitle,
					path: this.shareHref2,
					imageUrl:this.shareImg,
					bgImgUrl:this.shareImg,
					success: function (res) {
						this.shareHref2 = '/pagesB/integral/integral_detail?pro_id=' + this.pro_id
					}
				}
			}
		},
		methods: {
			moveHandle(){
				
			},
			_back1() {
				this.outtime();
			},
			timeout() {
				this.outtime();
			},
			outtime() {
				uni.showToast({
					title: '未登录，请先登录',
					icon: 'none',
					duration: 1500
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1'
					})
				}, 1000);
			},
			setHead(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#boxs').boundingClientRect(data => {
					if(data.top > -20){
						this.headerplus = false
					} else if(data.top < -20){
						this.headerplus = true
					}
				}).exec()
			},
			/**
			 * 
			 * */
			_invite(type) {
				this.shareDiv = false
				LaiKeTuiInvite(type,this)
			},
			/**
			 * 
			 * */
			_evaluate(pro_id){
				if(this.bargain){
					
					uni.navigateTo({
						url: '../../pages/evaluate/evaluate?bargain=true&pid='+pro_id
					})
					
				}else{
					
					uni.navigateTo({
						url: '../../pages/evaluate/evaluate?pid='+pro_id
					})
					
				}
			},
			/**
			 * 
			 * */
			_buy(){
				if(this.goods.is_delete == 1 || this.isopen == 0){
					uni.showToast({
						title:"该活动已结束！",
						duration:1500,
						icon:'none'
					})
					return
				}
				
				this.$refs.lktAuthorizeComp.handleAfterAuth(this,'../../pages/login/login?landing_code=1',() => {
					uni.navigateTo({
						url:'../integral/integral_order?id=' + this.pro_id
					})
				})
				
			},
			_shareDiv(){
				this.shareDiv = false
			},
			/**
			 * 
			 * */
			_closeAllMask(){
				this.shareMask = false
				this.saveEWM = false
			},
			/**
			 * 
			 * */
			_downEWM(){
				uni.getImageInfo({
					src: this.ewmImg,
					success: function (sres) {

						uni.saveImageToPhotosAlbum({
							filePath: sres.path,
							success: function () {
								uni.showToast({
									title:"保存图片成功",
									duration:1500,
									icon:'none'
								})
							},
						})
						
					},
					fail: function () {
						uni.showToast({
							title:"保存图片失败",
							duration:1500,
							icon:'none'
						})
					},
				})
				
			},
			/**
			 * 
			 * */
			showSaveEWM(string){
				var me = this
				if(me.is_shop){
					LaiKeTuiShopEWM(string,me)
				}else{
					LaiKeTuiShowSaveEWM(string,me)	
				}
			},
			/**
			 * 
			 * */
			showShareMask(shop){
				var me = this;
				if(me.goods.is_delete == 1 || me.isopen == 0){
					uni.showToast({
						title:"该活动已结束！",
						duration:1500,
						icon:'none'
					})
					return;
				}
				if(shop && shop>0){
					console.log('-------------------shop---------------'+shop)
					me.is_shop=true
					me.shop_id = shop
					me.sharehrefTitle = me.shop_list.shop_name
					me.shareImg = me.shop_list.shop_logo
					me.shareContent = me.shop_list.shop_name
					var url = uni.getStorageSync("h5_url")
					me.shareHref = url + 'pagesA/store/store?is_share=true&shop_id=' + shop
					me.shareHref2 = '/pagesA/store/store?is_share=true&shop_id='+ shop
				}else{
					debugger
					console.log('-------------------noshop---------------'+me.goods.product_title)
					me.is_shop=false
					me.shareHref2 = '/pagesB/integral/integral_detail?pro_id=' + me.pro_id
					me.sharehrefTitle = me.goods.product_title
					me.shareImg = me.goods.imgurl
					me.shareContent = me.goods.attribute+me.goods.product_title
					var url = uni.getStorageSync("h5_url");
					me.shareHref = url + 'pagesB/integral/integral_detail?pro_id=' + me.pro_id + '&isfx=true'
				}
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					
					// #ifdef H5
					var Clipboard = require('../../common/clipboard.js')
					if(shop && shop>0){
						var clipboard = new Clipboard('#copyshare')
					}else{
						var clipboard = new Clipboard('#copyy')
					}
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
						// #ifdef MP-WEIXIN
						me.shareMask=true
						// #endif
						// #ifndef MP-WEIXIN
						// #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
						me.shareDiv=true
						// #endif
						// #endif
					// #endif
				});
			},
			closeShareMask(){
				this.shareMask=false
				this.overflow='scroll'
			},
			/**
			 * 
			 * */
			_goback(){
				
				let num = getCurrentPages()
				
				if(num.length === 1){
					uni.switchTab({
						url:'../../pages/tabBar/home'
					})
					return 
				}
				
				uni.navigateBack();
			},
			/**
			 * 
			 * */
			_collection(){
				var me = this
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					LaiKeTui_collection(me)	
				});
			},
			/**
			 * 
			 * */
			kf(pro_id) {
				var me = this;
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					uni.navigateTo({
						url:'../../pages/message/service?pid='+pro_id
					});
				});
			},
			/**
			 * 
			 * */
			_goStore(shop_id){
				uni.navigateTo({
					url:'../../pagesA/store/store?shop_id='+shop_id
				})
			},
			/**
			 * 
			 * */
			_axios(){
				var me = this
				console.log('----------------------axios-------'+me.pro_id)
				var data = {
					module: 'app',
					action: 'integral',
					app: 'goodsdetail',
					access_id: me.access_id,
					id: me.pro_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						console.log(res)
						if(res.data.code == 200){
							let goods=res.data.goods
							goods.content=goods.content.replace(/<img/g,'<img style="width:100%;"')
							me.goods = goods
							me.shop_list = res.data.shop_list
							me.collection = me.goods.is_collection==1?true:false;
							me.collection_id = me.goods.collection_id
							me.comments = res.data.comments
							me.isopen = res.data.isopen
							me.comm_count = res.data.comm_count
						}else{
							uni.showToast({
								title:res.data.msg,
								duration:1500,
								icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
					}
				})
			},
		},
		computed: {
			halfWidth:function() {
				let gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				let heigh = parseInt(gru)
				let he = heigh * 2
				return uni.upx2px(he) + 'px'
			},
		},
		components: {
			heads,
			wxParse,
		}
	}
</script>

<style>
	@import url("../../static/css/integral/integral_detail.css")
</style>