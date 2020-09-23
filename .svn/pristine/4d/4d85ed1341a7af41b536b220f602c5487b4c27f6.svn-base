<template>
	<div class="order_ii" :style='{"overflow":overflow}'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" v-on:cancle="cancle"></lktauthorize>
		<div ref='box' id="boxs" style="position: relative;" @touchmove="setHead">
			<div class="data_h_h" :style="{height: halfWidth}" :class="{gd_headerplus:headerplus}"></div>
			<!--头部-->
			<div class="gd_header" :class="{gd_headerplus:headerplus}" :style="{top:halfWidth}">
				<!-- #ifndef MP -->
				<img :src="bback_img" class="gd_back" @tap="_goback()">
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<button @tap="showShareMask" id="copyy" :data-clipboard-text='shareHref' class="gd_card border_0 height_auto"
				 open-type="share">
					<img :src="fx_img" />
				</button>
				<!-- #endif --> 
			</div>
			<!--  轮播图   -->
			<div class='relative'>
				<view class="yyy"></view>

				<swiper class='swiperBox' @change='weiperChange'>
					<swiper-item v-for='img in pro.img_arr' :key='img.id'>
						<img class="swipe swiper_img" :src="img" />
					</swiper-item>
				</swiper>
				<div class='swiper_index' v-if='pro.img_arr'>
					{{swiperIndex}}/{{pro.img_arr?pro.img_arr.length:1}}
				</div>

				<view class="losebox" v-if="navType == 0">
					<image :src="shixiao"></image>
				</view>
			</div>
			<div class='load' v-if='load' :style="{top: halfWidth}">
				<div>
					<img class='load_img1' :src="load_img" />
					<p>图片加载中…</p>
				</div>
			</div>

			<div class='goods_name'>
				<div class='goods_price'>
					<view class="df aic">

						<view class="i-money">
							￥{{pro.price}}
						</view>

						<view>
							<view class="b-money">
								¥{{pro.yprice}}
							</view>

							<view class="c-money">
								限{{ pro.max_num || '0' }}件，仅剩{{ pro.num || '0' }}件
							</view>
						</view>


					</view>

					<view class="time-box">
						<view class="">
							{{ navType == 0?'已结束': navType == 1?'距结束': navType == 2?'距开始':'已结束' }}
						</view>

						<view class="time-text-body">
							<span>{{pro.count_hour}}</span>:<span>{{pro.count_min}}</span>:<span>{{pro.count_s}}</span>
						</view>
					</view>
					<!-- 					<div class='price1'>
						<span>￥</span>{{pro.price}}
						<view class="">
							<span class='price2'>￥{{pro.yprice}}</span>
						</view>
					</div> -->

					<!-- <div class='price_title'>限{{pro.max_num?pro.max_num:'0'}}件，秒完即止</div> -->

					<!-- 					<div class='price_right' v-if="navType != 0">
						<p class='mb_auto'>
							{{seckill_flag ?'距结束还剩':'距开始仅剩'}}
						</p>
						<p>
							<span>{{pro.count_hour}}</span>:<span>{{pro.count_min}}</span>:<span>{{pro.count_s}}</span>
						</p>
					</div> -->

				</div>

				<p>{{pro.name}}</p>
				<span>运费：{{pro.freight_name}}</span>
			</div>

			<div class='hr'></div>



			<div class='guige' @tap="_shopping1()" ref="homeHead">
				<span class='color_888'>选择</span>
				<span class='guige_name'>{{haveSkuBean.name}}</span>
				<img class='arrow' :src="you_img" />
			</div>
			<div class='hr'></div>
			<div class="group_wf">
			</div>
			<div class='hr'></div>
			<div class='user gd_user' v-if='comments.length&&!bargain' @tap="_evaluate(pro_id)">
				<p>用户评价（{{comments.length}}）</p>
				<img class='arrow' :src="you_img" />
			</div>
			<div class='user' v-if='!comments.length&&!bargain'>
				<p class='font_30'>暂无评价</p>
			</div>
			<div class='hr'></div>
			<div v-if='shop_list.shop_id' class='storeBox'>
				<div class='store store1'>
					<div class='store1Div'>
						<img class="store_image" :src='shop_list.shop_logo' :class="{ bargainLogo:bargain }">
						<div>{{shop_list.shop_name}}</div>
					</div>
					<div class="store_right">
						<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
						<button open-type="share" class='shareBtn' @tap='showShareMask(shop_list.shop_id)' id="copyshare"
						 :data-clipboard-text='shareHref'>
							<div class='goStore store1Div sharestore'>分享店铺</div>
						</button>
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
						<div class='goStore store1Div sharestore' @tap='showShareMask(shop_list.shop_id)' id="copyshare"
						 :data-clipboard-text='shareHref'>分享店铺</div>
						<!-- #endif -->
						<div class='goStore store1Div' @tap='_goStore(shop_list.shop_id)'>进店逛逛</div>
					</div>

				</div>
				<div class='store store2 around'>
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
					<div class='store2Div'>
						<p>{{shop_list.collection_num}}</p>
						<div>关注人数</div>
					</div>
				</div>
			</div>

			<div class='hr'></div>
			<div class='goods_d' @tap="_goods_x" id="doogi">商品详情</div>
			<!--  商品详情    -->
			<div class='content_d' id='content_d' v-if='goods_x'>
				<wxParse v-if='pro.content&&pro.content.length>0' :content="pro.content"></wxParse>
			</div>
			<!--  规格参数   -->
			<ul class='goods_spec' v-if='goods_g'>
				<li>
					<div class="g_div">
						<div>商品名称：</div>
					</div>
					<p>{{pro.name}}</p>
				</li>
				<li>
					<div class="g_div">
						<div>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</div>
					</div>
					<p>{{pro.brand_name}} * {{pro.cat_name}}</p>
				</li>
				<li>
					<div class="g_div">
						<div>商品编号：</div>
					</div>
					<p>{{pro_id}}</p>
				</li>
				<li>
					<div class="g_div">
						<div>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类：</div>
					</div>
					<p>{{pro.cat_name}}</p>
				</li>
				<li>
					<div class="g_div">
						<div>售&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后：</div>
					</div>
					<p>签收之日起48小时内无条件退货</p>
				</li>
			</ul>
			<div class='goods_foot' v-if='!bargain'>
				<div class='goods_bottom'>

					<!-- #ifndef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO-->
					<div class='goods_one' @tap="kf(pro_id)">
						<image class='image' :src="kf_img"></image>
					</div>
					<!-- #endif -->

					<!-- #ifdef MP-WEIXIN -->
					<div class='goods_one'>
						<button class="kf_button_css" open-type="contact">
							<image class='image' :src="kf_img"></image>
						</button>
					</div>
					<!-- #endif -->

					<!-- #ifdef MP-BAIDU  -->
					<div class='goods_one'>
						<button class="kf_button_css" open-type="contact" bindcontact="contactCB">
							<image class='image' :src="kf_img"></image>
						</button>
					</div>
					<!-- #endif -->

					<div class='w_100'>
						<div v-if='seckill_flag' class='goods_two w_100' @tap="_buy">立即秒杀</div>
						<div v-else class='goods_two w_100 background_999'>{{navType==2?'即将开始':navType==0?'秒杀已结束':'即将开抢'}}</div>
					</div>
				</div>
			</div>
			<div class='share' v-if="g_show">
				<div>
					<img :src="top_img" />
				</div>
			</div>
		</div>
		<!--  遮罩      -->
		<div class='mask' v-if='mask_display'>
			<div class="mask_d" :class='mask_display1?"goodAnimate1":(mask_display?"goodAnimate":"")'>
				<div class='mask_guige'>
					<div class='mask_one'>
						<div class='mask_one_data'>
							<img v-if='loadImg' @load='_loadImg()' class="shangp" :src="imgurl" />
							<img v-if='!loadImg' :src="load_img" class='load_img2'>
						</div>
						<div class='mask_pric'>
							<p class='mask_pric_data'>￥<span class='font_30'>{{pro.price}}</span></p>
							<text style="color: #020202;font-size: 24rpx;">已选：{{ haveSkuBean.name || '暂无' }}</text>
							<!-- <p style='font-size: 24upx;color: #999999;'>库存{{num}}</p> -->
						</div>
						<img class="cha" :src="guan_img" @tap="_mask_f()" />
					</div>
					<div class="mask_over">
						<div class='mask_two' v-for='(item,indx) in attrList' :key='indx'>
							<p>{{item.attrName}}</p>
							<ul v-if="num==0">
								<li v-for='(items,index) in item.attr' :key='index' @tap='showState(index,indx)'>
									<div>{{items.attributeValue}}</div>
								</li>
							</ul>
							<ul v-else>
								<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']"
								 @tap='showState(index,indx)'>
									<div>{{items.attributeValue}}</div>
								</li>
							</ul>
						</div>
						<div class='mask_num'>
							<p>数量</p>
							<div class='goods_mun'>
								<span class='border_right' @tap="_reduce">
									<img :src="numb==1?jian_hui:jian_hei" />
								</span>
								<span class='mun'>{{ numb }}</span>
								<span class='border_left' @tap="_add">
									<img :src='numb<num?jia_hei:jia_hui' />
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class='mask_quren_div'>
					<div class='mask_quren' @tap="_confirm">确认</div>
				</div>
			</div>
		</div>
		
		<div class='mask' @tap='_shareDiv' v-if='shareDiv'>
			<div class='allCenter mask_data'>
				<div class='mask_data_div' v-for='(item,index1) in shareWay' :key='index1' @tap='_invite(item.name)'>
					<div><img class='share_img' :src="item.imgUrl" alt=""></div>
					<span class='share_name'>{{item.name}}</span>
				</div>
			</div>
		</div>
		
		<div class="mask" v-if="saveEWM">
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
			<div class="h5_yaoqing" v-if="shareMask_H5">
				<div class="h5_top">
					<div class="h5_top_title">邀请链接</div>
				</div>
				<div class="h5_center">
					<input name="h5_input" id="h5_input" v-model="h5_url" readonly="readonly" />
				</div>
				<div class="h5_bottom">
					<div>取消</div>
					<div @tap="copyH5Url()">复制链接</div>
				</div>
			</div>
			<div class="shareMask" v-if="!shareMask_H5&&!saveEWM" @tap.stop>
				<div class="shareMaskTitle">分享至</div>
				<!-- #ifdef H5 -->
				<div class='shareMMM'>
					<div class="shareIcon" @tap="copy_url()">
						<img :src="erm_pyq_img" />
						<p>复制链接</p>
					</div>
					<div class="shareIcon" @tap="showSaveEWM('app')">
						<img :src="erm_img" />
						<p>二维码分享</p>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<div class='shareMMM'>
					<div class="shareIcon">
						<button class="share_btn" open-type="share">
							<img :src="wx_img" />
							<p style='margin-top: -26upx;'>微信好友</p>
						</button>
					</div>
					<div class="shareIcon" @tap="showSaveEWM('wx')">
						<img :src="erm_img" />
						<p>二维码分享</p>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<div class='shareMMM'>
					<div class="shareIcon w_33" @tap="_shareApp(1)">
						<img :src="erm_pyq_img" />
						<p>微信朋友圈</p>
					</div>
					<div class="shareIcon w_33" @tap="_shareApp(2)">
						<img :src="wx_img" />
						<p>微信好友</p>
					</div>
					<div class="shareIcon w_33" @tap="showSaveEWM('app')">
						<img :src="erm_img" />
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
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage.js'
	// #ifdef H5
	import jQuery from '../../common/jquery.js'
	// #endif
	import {
		LaiKeTui_axios,
		LaiKeTuiInvite,
		LaiKeTuiShowSaveEWM,
		LaiKeTui_collection,
		LaiKeTui_shopping,
		LaiKeTuiGetCoupon,
		LaiKeTui_buy_handle,
		LaiKeTui_confirm,
		LaiKeTui_spec,
		LaiKeTuiShowState,
		LaiKeTuiSetTimeData,
		LaiKeTuiToBr,
		LaiKeTuiShopEWM,
	} from '../../static/js/goods/goodsDetailed.js'

	export default {
		data() {
			return {
				clicktimes: [],
				close: '',
				saves: '',
				hour: 0,
				mniuate: 0,
				second: 0,
				day: 0,
				attr_id: '',
				bargain: false,
				shop_list: [],
				option: '',
				overflow: 'scroll',
				mask_display1: false,
				fastTap: true,
				title: '秒杀商品',
				loadImg: true,
				shop_id: '',
				bback_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/bback.png",
				fx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx.png',
				gw_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/gw.png",
				load_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/5-121204193R7.gif",
				you_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jiantouhei2x.png",
				kf_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/kefu.png',
				top_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/kaobei2x.png",
				guan_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/guanbi2x.png",
				wx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wechat.png",
				jian_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jian2x.png",
				jian_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jianhui2x.png",
				jia_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jia+2x.png",
				jia_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/add+2x.png",
				xing_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xinghei2x.png",
				xing_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xinghui2x.png",
				erm_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/ewmShare.png",
				erm_pyq_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wepyq.png",
				shixiao: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/shixiao.png",
				attrList: '',
				mask_display: false,
				num: '', //规格数量
				price: '', //规格价格
				imgurl: '', //规格图片
				pro: {}, //商品信息
				comments: '', //评价信息
				haveSkuBean: '', //选择规则属性
				numb: 1, //规格选择的数量
				collection: '', //收藏状态
				goods_x: true,
				goods_g: false,
				access_id: '',
				g_show: false, //回顶部显示
				load: true,
				shareMask: false,
				saveEWM: false,
				shares: {},
				shareContent: '一起来用来客推吧！', //分享的内容
				shareHref: '', //分享的链接
				shareHref2: '', //转发的链接
				sharehrefTitle: '一起来用来客推吧!', //分享的链接的标题
				sharehrefDes: '一起来用来客推吧!', //分享的链接的描述
				shareImg: '', //分享的图片
				shareDiv: false,
				pic: '',
				logo: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/lktlogo.png',
				pro_id: "",
				order_no: '',
				brStatus: '',
				bargain_id: '',
				ewmImg: '', //二维码图片
				login_status: '', //0:未登录；1已登录
				sNo_id: 0, //订单id
				show_rule: false, //是否显示规则
				shareMask_H5: false,
				h5_url: '',
				isfx: '',
				shareshop: 0,
				seckill: true,
				lefttime: 0, //活动剩余时间戳
				id: 0, //设置秒杀活动商品id
				shareWay: [
					// #ifndef MP-WEIXIN
					{
						name: '微信',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png'
					},
					{
						name: '朋友圈',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fdc.png'
					},
					{
						name: '二维码分享',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ewmShare.png'
					},
					// #endif
				],
				allCartNum: 0, //购物车的总商品数
				status: '2',
				is_shop: false,
				headerplus: false,
				navType: 0, //0 活动结束， 1活动进行中， 2活动即将开始
				swiperIndex: 1, //轮播下标
				seckill_flag: true, //秒杀是否已经开始,true已经开始
				pages: 'pagesB', //表明模块为pagesB
				msNum: "", //秒杀商品库存
				selectedlist: '',
				pam: { }
			}
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				// #ifdef MP
				heigh = 0
				// #endif
				return heigh + 'px';
			},
			...mapState({
				_cart_num: 'cart_num'
			})
		},
		watch: {
			numb(newl, old) {
				console.log(Boolean(this.haveSkuBean))
			}
		},
		onLoad(option) {
			var me = this;
			me.option = option
			me.fastTap = true;
			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl();
				resolve(1231)
			});
			p.then(() => {
				me.isfx = option.isfx
				if (option.productId) {
					me.pro_id = option.productId;
				} else if (option.pro_id) {
					me.pro_id = option.pro_id;
				}
				me.navType = option.navType
				me.id = option.id
				if (option.navType != 1) {
					console.log("option.navType != 1");
					me.seckill_flag = false
				}
				me.brStatus = option.brStatus;
				me.attr_id = option.attr_id;
				me.order_no = option.order_no;
				me.sNo_id = option.sNo_id;
				me.isbegin = option.isbegin;
				if (me.pro_id == '' || me.pro_id == undefined) {
					me.pro_id = me.$store.state.pro_id;
				}
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				me.hasorder = option.hasorder;
				uni.setStorageSync("fatherId", option.fatherId)
				me._axios();
			})
		},
		onShow(option) {
			var me = this;
			this.allCartNum = this.$store.state.cart_num;
			this.close = this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close_bb.png'
			this.saves = this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/save.png'
			me.fastTap = true;
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
			if (me.pro_id) {
				me._axios();
			}

			this.$nextTick(function() {
				uni.getProvider({
					service: 'share',
					success: function(res) {
						console.log(res.provider)
					}
				});
			})
		},
		//转发
		onShareAppMessage: function(res) {
			if (this.login_status == 0) {
				uni.navigateTo({
					url: '../../pages/login/login?landing_code=1'
				})
			} else {
				if (res.from === 'button') {

				}
				return {
					title: this.sharehrefTitle,
					path: this.shareHref2,
					imageUrl: this.shareImg,
					bgImgUrl: this.shareImg,
					success: function(res) {
						this.shareHref2 = '/pages/goods/goodsDetailed?productId=' + this.pro_id
					}
				}
			}
		},
		methods: {
			setHead() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#boxs').boundingClientRect(data => {
					if (data.top > -20) {
						this.headerplus = false
						// console.log(false,data.top)
					} else if (data.top < -20) {
						this.headerplus = true
						// console.log(true,data.top)
					}
				}).exec();
			},
			//授权取消按钮
			cancle() {
				this.fastTap = true;
			},
			changeLoginStatus() {
				var me = this;
				me.login_status = 1;
				me.fastTap = true;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			copy_url() {
				this.shareMask_H5 = true
				this.h5_url = this.shareHref
			},
			copyH5Url() {
				var me = this
				jQuery("#h5_input input").select();
				document.execCommand("Copy");
			},
			lodingPay(sNo_id) {
				uni.navigateTo({
					url: '../../pages/order/order?order_id=' + sNo_id + '&showPay=true'
				})
			},
			goPay() {
				var me = this
				var product = []
				product.push({
					pid: this.pro_id
				})
				product.push({
					cid: this.attr_id
				})
				product.push({
					num: 1
				})
				product = JSON.stringify(product)
				uni.navigateTo({
					url: '../../pages/pay/orderDetailsr?product=' + product + '&bargain=true&bargain_id=' + me.bargain_id +
						'&order_no=' + me.order_no
				})
			},
			toBrFirst() {
				console.log(".........toBrFirst......");
				// uni.navigateBack({
				// 	delta:1
				// })
				uni.navigateTo({
					url: '../../pagesA/bargain/bargain?topTabBar=true'
				})
			},
			toBr() {
				var me = this;
				LaiKeTuiToBr(me)
			},
			_goStore(shop_id) {
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id=' + shop_id
				})
			},
			_loadImg() {
				this.loadImg = true
			},
			_closeAllMask() {
				this.shareMask = false
				this.saveEWM = false
				this.shareMask_H5 = false
				this.overflow = 'scroll'
			},
			_shareDiv() {
				this.shareDiv = false
			},
			_invite(type) {
				var me = this
				LaiKeTuiInvite(type, me)
			},
			_goRule() {
				uni.navigateTo({
					url: '../../pagesA/bargain/rules'
				})
			},
			_goback() {
				// #ifdef H5
				uni.navigateBack({
					delta: 1
				});
				// #endif
				// #ifndef H5
				if (this.isfx == 'true') {
					uni.reLaunch({
						url: '../../pages/tabBar/home'
					});
					return false
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
				// #endif
			},
			_gocart() {
				uni.switchTab({
					url: '../tabBar/shoppingCart'
				})
			},
			_downEWM() {
				let me = this
				uni.getImageInfo({
					src: me.ewmImg,
					success: function(sres) {
						console.log(sres.path);
						uni.saveImageToPhotosAlbum({
							filePath: sres.path,
							success: function() {
								uni.showToast({
									title: "保存图片成功",
									duration: 1500,
									icon: 'none'
								})
							},
						})
					},
					fail: function() {
						uni.showToast({
							title: "保存图片失败",
							duration: 1500,
							icon: 'none'
						})
					},
				})
			},
			_shareApp(type) {
				var me = this
				var scene = ''
				if (type == 1) {
					//App分享到 微信朋友圈
					scene = 'WXSenceTimeline'
				} else if (type == 2) {
					//App分享到 微信好友
					scene = 'WXSceneSession'
				}
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 2,
					imageUrl: me.ewmImg,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			showShareMask(shop) {
				var me = this;
				if (shop && shop > 0) {
					me.is_shop = true
					me.shop_id = shop
					me.sharehrefTitle = me.shop_list.shop_name
					me.shareImg = me.shop_list.shop_logo
					me.shareContent = me.shop_list.shop_name
					var url = uni.getStorageSync("h5_url")
					me.shareHref = url + 'pagesA/store/store?is_share=true&shop_id=' + shop
					me.shareHref2 = '../../pagesA/store/store?is_share=true&shop_id=' + shop
				} else {
					me.is_shop = false
					me.shareHref2 = '/pages/goods/goodsDetailed?productId=' + me.pro_id
					me.sharehrefTitle = me.pro.name
					me.shareImg = me.imgurl
					me.shareContent = me.pro.name
					var url = uni.getStorageSync("h5_url")
					me.shareHref = url + 'pages/index/share?pages=goodsDetailed&productId=' + me.pro_id + '&isfx=true'
					if (me.pro.is_distribution == 1) {
						me.shareHref = url + 'pages/index/share?pages=goodsDetailed&productId=' + me.pro_id +
							'&isfx=true&fatherId=' + me.pro.user_id
					}
				}
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					// #ifdef H5
					var Clipboard = require('../../common/clipboard.js')
					if (shop && shop > 0) {
						var clipboard = new Clipboard('#copyshare')
					} else {
						var clipboard = new Clipboard('#copyy')
					}
					console.log(clipboard)
					clipboard.on('success', function(e) {
						console.log('--复制分享链接成功--'.e)
						uni.showToast({
							title: '复制分享链接成功！',
							duration: 1000,
							icon: 'none'
						})
					});
					clipboard.on('error', function(e) {
						console.log('--复制分享链接失败--'.e)
						uni.showToast({
							title: '复制分享链接失败！',
							duration: 1000,
							icon: 'none'
						})
						document.querySelector('.copy');
					});
					// #endif

					// #ifndef H5
					// #ifdef MP-WEIXIN
					me.shareMask = true
					// #endif
					// #ifndef MP-WEIXIN
					// #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
					me.shareDiv = true
					// #endif
					// #endif
					// #endif
				});
			},
			closeShareMask() {
				this.shareMask = false
				this.overflow = 'scroll'
			},
			showSaveEWM(string) {
				var me = this
				if (me.is_shop) {
					LaiKeTuiShopEWM(string, me)
				} else {
					LaiKeTuiShowSaveEWM(string, me)
				}
			},
			kf(pro_id) {
				var me = this;
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					uni.navigateTo({
						url: '../../pages/message/service?pid=' + pro_id
					});
				});
			},
			_reduce() {
				if (this.numb > 1 && Boolean(this.haveSkuBean)) {
					this.numb--
				} else {
					if (!this.haveSkuBean) {
						uni.showToast({
							title: '请先选择商品规格',
							duration: 1000,
							icon: 'none'
						})
					} else {
						this.numb == 1
						uni.showToast({
							title: '数量已经减少到最低了哦！',
							duration: 1000,
							icon: 'none'
						})
					}
				}
			},
			_add() {
				this.num = this.pro.num;
				console.log(this.num);

				if (this.numb >= (this.pro.buy_num - this.pro.purchased)) {
					uni.showToast({
						title: '每人限购' + this.pro.buy_num + '件！',
						duration: 1000,
						icon: 'none'
					})
				} else if (this.numb >= this.pro.num) {
					uni.showToast({
						title: '超过最大库存!',
						duration: 1000,
						icon: 'none'
					})
				} else if (this.numb < this.num && this.numb < this.pro.buy_num && Boolean(this.haveSkuBean)) {
					this.numb++
				} else {
					if (!this.haveSkuBean) {
						uni.showToast({
							title: '请先选择商品规格',
							duration: 1000,
							icon: 'none'
						})
					} else if (this.numb < (this.pro.buy_num - this.pro.purchased)) {
						uni.showToast({
							title: '每人限购' + this.pro.buy_num + '件！',
							duration: 1000,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '数量已经达到上限了哦！',
							duration: 1000,
							icon: 'none'
						})
					}
				}
			},
			_load_img() {
				this.load = false
			},
			_goods_x() {
				this.goods_x = true
				this.goods_g = false
			},
			_goods_g() {
				this.goods_x = false
				this.goods_g = true
			},
			...mapMutations({
				cart_id: 'SET_CART_ID',
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				pay_lx: "SET_PAY_LX",
				cart_num: 'SET_CART_NUM'
			}),
			_evaluate(pro_id) {
				var me = this
				if (this.bargain) {
					uni.navigateTo({
						url: '../evaluate/evaluate?bargain=true&pid=' + pro_id
					});
				} else {
					uni.navigateTo({
						url: '../../pages/evaluate/evaluate?pid=' + pro_id
					});
				}
			},

			//收藏
			_collection() {
				var me = this
				LaiKeTui_collection(me)
			},
			//规格选择
			_selectG() {
				this.type = 1
				this._mask_display()
			},
			//加入购物车
			_shopping() {
				var me = this
				if (me.status == 2) {
					LaiKeTui_shopping(me)
				} else {
					uni.showToast({
						title: '该商品已下架!',
						icon: 'none'
					})
				}
			},
			_shopping1() {
				if (this.navType == 0) {
					uni.showToast({
						title: '活动已结束！',
						icon: 'none'
					})
					return false
				} else if (this.navType == 2) {
					uni.showToast({
						title: '活动未开始！',
						icon: 'none'
					})
					return false
				}
				if (this.pro.buy_num <= this.pro.purchased) {
					uni.showToast({
						title: '每人限购' + this.pro.buy_num + '件！',
						icon: 'none'
					})
					return false
				}
				this.type = 1
				this.fastTap = true
				this.price = this.pro.price
				this._mask_display()
			},
			getCoupon() {
				var me = this;
				LaiKeTuiGetCoupon(me)
			},
			_buy() {
				var me = this;

				if (this.pro.buy_num <= this.pro.purchased) {
					uni.showToast({
						title: '每人限购' + this.pro.buy_num + '件！',
						icon: 'none'
					})
					return false
				}

				if (me.status == 2) {
					me.price = me.pro.price
					me.LaiKeTuiCommon.laiketuiNoDoublePress(me, me._buy_handle);
				} else {
					uni.showToast({
						title: '该商品已下架!',
						icon: 'none'
					})
				}
			},
			//立即购买
			_buy_handle() {
				var me = this
				LaiKeTui_buy_handle(me)
			},
			//打开遮罩层
			_mask_display() {
				this.mask_display = true
				this.overflow = 'hidden'
			},
			//关闭遮罩层
			_mask_false() {
				this.overflow = 'scroll'
				var me = this
				this.mask_display1 = true
				setTimeout(function() {
					me.mask_display = false
					me.mask_display1 = false
				}, 500)
				for (var i = 0; i < this.attrList.length; i++) {
					for (var b = 0; b < this.attrList[i].attr.length; b++) {
						this.attrList[i].attr[b].select = false
					}
				}
			},
			_mask_f() {
				this.haveSkuBean = ""
				this._mask_false()
				this.overflow = 'scroll'
			},
			//确认
			_confirm() {
				var me = this
				LaiKeTui_confirm(me)
			},
			_spec() {
				var me = this
				LaiKeTui_spec(me)
			},
			//选择属性
			showState(index, indx) {
				var me = this
				LaiKeTuiShowState(me, index, indx)
			},
			_axios() {
				var me = this
				LaiKeTui_axios(me)
			},
			timeout() {
				let me = this;
				uni.showToast({
					title: '账号登录超时,请重新登录！',
					duration: 1000,
					icon: 'none'
				});
				setTimeout(function() {
					me.fastTap = true;
					me.haveSkuBean = '';
					me.login_status = 0;
					uni.navigateTo({
						url: '../login/login'
					});
				}, 1000);
			},
			// 轮播图下标
			weiperChange(e) {
				this.swiperIndex = e.detail.current + 1
			},
			_remain_time(item) {
				var timeStr = ""; //转换后的时间字符串
				var secondTime = item.lefttime; //剩余时间的秒数
				var minuteTime = "0"; //剩余时间的分钟数
				var hourTime = "0"; //剩余时间的小时数
				//如果秒数大于60，将秒数转换成整数
				if (secondTime > 60) {
					//获取分钟，除以60取整数，得到整数分钟
					minuteTime = parseInt(secondTime / 60);
					//获取秒数，秒数取佘，得到整数秒数
					secondTime = parseInt(secondTime % 60);
					//如果分钟大于60，将分钟转换成小时
					if (minuteTime > 60) {
						//获取小时，获取分钟除以60，得到整数小时
						hourTime = parseInt(minuteTime / 60);
						//获取小时后取佘的分，获取分钟除以60取佘的分
						minuteTime = parseInt(minuteTime % 60);
					}
				}

				item.count_hour = hourTime < 10 ? ("0" + hourTime) : hourTime
				item.count_min = minuteTime < 10 ? ("0" + minuteTime) : minuteTime
				item.count_s = secondTime < 10 ? ("0" + secondTime) : secondTime
				this.pro = item
				this.msNum = this.pro.num
				this._setTime()
			},
			_setTime() {
				var me = this
				clearTimeout(me.settime)
				me.settime = setTimeout(() => {
					if (me.pro.lefttime > 0) {
						me.pro.lefttime--
						me._remain_time(me.pro)
					}
					if (me.pro.lefttime == 0) {
						me.navType = 0;
						me.seckill_flag = false
						return
					}
					me._setTime()
				}, 1000);
			}
		},
		components: {
			heads,
			wxParse,
			// #ifdef H5
			jQuery,
			// #endif
		}
	}
</script>

<style lang="less" scoped>
	
	@import "../../static/css/seckill/seckill_detail.less";
</style>
