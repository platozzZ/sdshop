<template>
	<div class="order_ii" :style='{"overflow":overflow}'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" v-on:cancle="cancle"></lktauthorize>
		<div ref='box' id="boxs" class='relative' @touchmove="setHead">

			<!-- #ifndef MP -->
			<div class="data_h" :style="{height: halfWidth}">
				<div class="data_h_h" :style="{height: halfWidth}"></div>
			</div>
			<!-- #endif -->

			<!--头部-->
			<!-- #ifndef MP -->
			<!-- 砍价头部 -->
			<div v-if="bargain">

				<!-- <heads title='砍价商品详情' returnR="6"></heads> -->
				<!-- #ifndef MP-WEIXIN || MP-ALIPAY -->
				<div class='bargain_top' :style="{top:halfWidth}">
					<div class='position_head' :style="{top:halfWidth}">
						<div class='head'>
							<img :src="back1" class="head_img" @tap="_goback()">
							<p class='head_title'>砍价商品详情</p>
							<p @tap='_goRule()'>砍价规则</p>
						</div>
					</div>
				</div>


				<div class='head_height'></div>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<view class="wei_gz">
					<view class="" @tap='_goRule()'>砍价规则</view>
				</view>
				<!-- #endif -->
			</div>


			<!-- #endif -->
			<!-- 非砍价商品头部 -->
			<div v-if="!bargain" class="gd_header" :class="{gd_headerplus:headerplus}" :style="{top:halfWidth}">
				<!-- #ifndef MP -->
				<img :src="bback_img" class="gd_back" @tap="_goback()">
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
				<button @tap="showShareMask" id="copyy copyy1" :data-clipboard-text='shareHref' class="gd_card gd_card-bto"
				 open-type="share">
					<img :src="fx_img" />
				</button>
				<!-- #endif -->
				<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
				<img v-if="!bargain" :src="fx_img" class="gd_card" v-clipboard:copy="shareHref" @tap="showShareMask"  id="copyy" :data-clipboard-text='shareHref' />
				<!-- #endif -->

				<img v-if="isDistribution==false&&!bargain&&active!=6" :src="gw_img" class="gd_share" @tap="_gocart()" />
				<div class="cartnum" v-if='isDistribution==false&&allCartNum&&active!=6'>{{allCartNum}}</div>
			</div>
			
			
			<toload :load="loadFlag"></toload>
			<template v-if="loadFlag">
				
				<!--  轮播图   -->
				<div class="relative">
					<swiper class='swiper' @change="swiperChange">
						<swiper-item v-for='img in pro.img_arr' :key='img.id'>
							<img class="swipe" :src="img" />
						</swiper-item>
					</swiper>
					<div class="swiperIndex">{{swiperIndex}}/{{pro.img_arr&&pro.img_arr.length}}</div>
				</div>
				<!-- 非砍价商品价格和名称 -->
				<div class='goods_name' v-if='!bargain'>
					<p class='goods_price'><span class='span'>￥</span>{{pro.price}}</p>
					<p class='goods_proName'>{{pro.name}}</p>
					<div class="volume">
						<span>运费规则：{{pro.yunfei}}</span>
						<span>销量{{pro.volume}}</span>
					</div>
				</div>
				<!-- 砍价商品价格和名称 -->
				<div class='goods_name goods_bargain_name' v-else>
					<p class='goods_price'>{{cs_num}}人已完成砍价
						<span class='cs_yprice'>{{cs_yprice}}</span>
						<span class='cs_price'>{{cs_price}}</span>
					</p>
					<p>{{pro.name}}</p>
				</div>
				<div class='hr' v-if="isDistribution==false"></div>
				<div class='coupon' @tap="getCoupon()" v-if="isDistribution==false && !bargain&& active != 6 && coupon_status==true">
					<span>领券</span>
					<div>
						<div v-for="(item,index) in coupon_str" :key="index" class="coupon_data" :style="'background-image:url(' + coupon_img + ')'">{{item}}</div>
					</div>
					<img class='arrow' :src="you_img" />
				</div>
				<div class='hr'></div>
				<!-- 非砍价商品选择商品规格 -->
				<div v-if='!bargain' class='guige' @tap="_shopping1()" ref="homeHead">
					<span>{{haveSkuBean==""?"选择商品规格":haveSkuBean.name}}</span>
					<img class='arrow' :src="you_img" />
				</div>
				<div v-if='!bargain' class='hr'></div>
				<div class='user gd_user' v-if='comments.length&&!bargain' @tap="_evaluate(pro_id)">
					<p>用户评价（{{comments.length}}）</p>
					<img class='arrow' :src="you_img" />
				</div>
				<div class='comments' v-if='comments.length&&!bargain'>
					<div class='allCenter'>
						<img class='img' :src="comments[0].headimgurl?comments[0].headimgurl:niming">
						<span class='span'>{{comments[0].user_name}}</span>
					</div>
					<div class='time'>{{comments[0].add_time}}</div>
					<div class='disc'>{{comments[0].content}}</div>
				</div>
				<div class='user' v-if='!comments.length&&!bargain'>
					<p style="font-size: 30upx;">暂无评价</p>
				</div>
				<!-- 砍价页面显示 -->
				<div v-if='bargain'>
					<div v-if='comments.length>0' class='user gd_user' @tap="_evaluate(pro_id)">
						<p>砍成晒单（{{comments.length}}）</p>
						<img class='arrow' :src="you_img" />
					</div>
					<div v-else class='user gd_user'>
						<p>砍成晒单（0）</p>
						<img class='arrow' :src="you_img" />
					</div>
					<template v-if='comments.length'>
						<div class='comments' v-for='(item,index) in comments' :key='index'>
							<div class='allCenter'>
								<img class='img' :src="item.headimgurl?item.headimgurl:niming">
								<span class='span'>{{item.user_name}}</span>
							</div>
							<div class='time'>{{item.add_time}}</div>
							<div class='disc'>{{item.content}}</div>
						</div>
					</template>
					<div class='user' v-if='comments.length<=0'>
						<p class='font_30'>暂无评价</p>
					</div>
				</div>
				<div class='hr'></div>
				<div class='shop_list' v-if='shop_list.shop_id'>
					<div class='store store1'>
						<div class='store1Div'>
							<img :src='shop_list.shop_logo' :class="{ bargainLogo:bargain }">
							<div>{{shop_list.shop_name}}</div>
						</div>
						<div class="store_right">
							<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
							<button class='share_btn' open-type="share" @tap='showShareMask(shop_list.shop_id)' id="copyshare"
							 :data-clipboard-text='shareHref'>
								<div class='goStore store1Div sharestore'>分享店铺</div>
							</button>
							<!-- #endif -->
							<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
							<div class='goStore store1Div sharestore' v-clipboard:copy="shareHref" @tap='showShareMask(shop_list.shop_id)' id="copyshare"
							 :data-clipboard-text='shareHref'>分享店铺</div>
							<!-- #endif -->
							<div class='goStore store1Div' @tap='_goStore(shop_list.shop_id)'>进店逛逛</div>
						</div>
					</div>
					<div class='store store2'>
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
					<!-- <wxParse v-if='pro.content' :content="pro.content"></wxParse> -->
					<rich-text class="richtext" :nodes="pro.content"></rich-text>
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
					
					<view class="footer-hint" v-if="pro.status == '3'">
						商品已经下架啦~
					</view>
					
					<div class='goods_bottom' :class="{'goods_bottoms':pro.status == '3'}">
				
						<!-- #ifdef MP-WEIXIN -->
						<div class='goods_one ml_25'>
							<button class="kf_button_css center" style="background: none;padding: 0;height: 100%;" type="primary" open-type="contact">
								<img :src="kf_img" />
								<p>客服</p>
							</button>
						</div>
						<!-- #endif -->
				
						<!-- #ifdef MP-BAIDU -->
						<div class='goods_one ml_25'>
							<button class='center' open-type="contact" bindcontact="contactCB" style="background:none;padding:0px;height: 100%;">
								<img :src="kf_img" />
								<p>客服</p>
							</button>
						</div>
						<!-- #endif -->
				
						<!-- #ifndef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU -->
						<div class='goods_one ml_25 center' @tap="kf(pro_id)">
							<img :src="kf_img" />
							<p>客服</p>
						</div>
						<!-- #endif -->
				
						<div class='goods_one center' @tap="_collection">
							<img :src="collection?xing_hei:xing_hui" />
							<p v-if='collection'>已收藏</p>
							<p v-else>收藏</p>
						</div>
						
						<template v-if="pro.status == '3'">
							<div v-if="pro.is_distribution == '1' || active == '6'">
								<div class='goods_two _buy' style="color: #333333;">立即购买</div>
							</div>
							<div v-else-if="pro.is_distribution == '0' && active != '6' ">
								<div class='goods_two' style="color: #333333;">加入购物车</div>
								<div class='goods_two _buy1' style="color: #333333;">立即购买</div>
							</div>
				
						</template>
						<template v-else>
							<div v-if="pro.is_distribution == '1' || active == '6'">
								<div class='goods_two _buy' @tap="_buy">立即购买</div>
							</div>
							<div v-else-if="pro.is_distribution == '0' && active != '6' ">
								<div class='goods_two' @tap='_shopping'>加入购物车</div>
								<div class='goods_two _buy1' @tap="_buy">立即购买</div>
							</div>
						</template>
						
						
						
						
					</div>
				</div>
				<div class="goods_foot" :style="{height: height}" v-else>
					<div class='goods_bottom goods_bottom_time' v-if='leftTime>0'>
						距砍价结束还剩：
						<span v-if='day!=0'>{{day}}天</span>
						<span v-else>0天</span>
						<span v-if='hour!=0'>{{hour}}时</span>
						<span v-else>00时</span>
						<span v-if='mniuate!=0'>{{mniuate}}分</span>
						<span v-else>00分</span>
						<span v-if='second!=0'>{{second}}秒</span>
						<span v-else>00秒</span>
					</div>
					<div class='goods_bottom bt_0'>
						<div class='goods_two goods_two_gd' @tap='toBrFirst()'>更多砍价商品</div>
						<div v-if='leftTime<=0||brStatus==-1' class='goods_two btn-gray'>立即砍价</div>
						<div v-else-if='brStatus==4 && isbegin==1' class='goods_two btn-black' @tap="toBr()">立即砍价</div>
						<div v-else-if='brStatus==0 && leftTime>0 && isbegin==1' class='goods_two btn-black' @tap="toBr()">继续砍价</div>
						<div v-else-if='leftTime<0 && isbegin==1' class='goods_two btn-black'>已结束</div>
						<div v-else-if='leftTime>0 && isbegin!=1' class='goods_two btn-black'>未开始</div>
						<div v-else-if='brStatus==1 && !hasorder && isbegin==1' class='goods_two btn-black' @tap='goPay()'>去付款</div>
						<div v-else-if='brStatus==1 && hasorder && isbegin==1' class='goods_two btn-black' @tap='lodingPay(sNo_id)'>待付款</div>
						<div v-else-if='brStatus==2 && isbegin==1' class='goods_two btn-black'>已付款</div>
						<div v-else-if='brStatus==3||leftTime<0' class='goods_two btn-black'>砍价失败</div>
					</div>
				</div>
				<div class='share' v-if="g_show">
					<div>
						<img :src="top_img" />
					</div>
				</div>
			</template>
		</div>
		<!--  遮罩 -->
		<div class='mask' @touchmove.stop.prevent v-if='mask_display'></div>
			<div class="mask_d" :class='mask_display1?"goodAnimate1":(mask_display?"goodAnimate":"")' v-if='mask_display'>
				
				<div class='mask_guige'>
					<div class='mask_one' @touchmove.stop.prevent>
						<div class='mask_imgDiv'>
							<img v-if='loadImg' @load='_loadImg()' class="shangp" :src="imgurl" />
							<img v-if='!loadImg' :src="load_img" class='img'>
						</div>
						<div class='mask_pric'>
							<p class='mask_price'>￥<span class='font_30'>{{price}}</span></p>
							<p class='mask_pric_num'>库存{{num}}</p>
						</div>
						<img class="cha" :src="guan_img" @tap="_mask_f()" />
					</div>
					<div class="mask_over">
						<div class='mask_two' v-for='(item,indx) in attrList' :key='indx'>
							<p>{{item.attrName}}</p>
						
							<ul>
								<li v-for='(items,index) in item.attr' :key='index' :class="items.enable ? (items.select ? 'orange':'select') : 'back'"
								 @tap='showState(index,indx)'>
									<div>{{items.attributeValue}}</div>
								</li>
							</ul>
						</div>
						<div class='mask_num'>
							<p>数量</p>
							<div class='goods_mun'>
								<span class='goods_mun_span' @tap="_reduce">
									<img :src="numb==1?jian_hui:jian_hei" />
								</span>
								<span class='mun'>{{ numb }}</span>
								<span class='goods_mun_add' @tap="_add">
									<img :src='numb<num?jia_hei:jia_hui' />
								</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class='mask_querenDiv'>
					<div class='mask_quren' @tap="_confirm">确认</div>
				</div>
			</div>
		

		<!-- 分享弹框 -->
		<div class='mask' @tap='_shareDiv' v-if='shareDiv'>
			<div class='allCenter'>

				<!-- 兼容头条小程序 -->
				<!-- #ifdef MP-TOUTIAO -->
				<div @tap='_invite(shareWay[2].name)'>

					<div>
						<img :src="shareWay[2].imgUrl" alt="" style='width: 80upx;height: 80upx;'>
					</div>

					<span style='font-size: 24upx;color: #666666;'>{{shareWay[2].name}}</span>
				</div>
				<!-- #endif -->


				<!-- #ifndef MP-TOUTIAO -->
				<div v-for='(item,index1) in shareWay' :key='index1' @tap='_invite(item.name)'>

					<div>
						<img :src="item.imgUrl" alt="" style='width: 80upx;height: 80upx;'>
					</div>

					<span style='font-size: 24upx;color: #666666;'>{{item.name}}</span>
				</div>
				<!-- #endif -->

			</div>
		</div>

		<div class="mask" v-if="saveEWM">

			<div class="shareEwm" v-if="saveEWM">
				
				<image style="width: 80rpx;height: 80rpx;" v-if="!ewmImg" :src="load_img"></image>
				<img v-else :src="ewmImg" class="imgEwm">
				
				<img :src="close" class="close" @tap="_closeAllMask">

				<view class="saveEWMBtn" @tap="_downEWM()">
					<img :src="saves" class="saves">
					保存图片
				</view>
			</div>
		</div>
		<!-- 分享弹框 -->
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
				<div class='sharepyq'>
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
				<div class='sharepyq'>
					<div class="shareIcon">
						<button class="share_btn" open-type="share">
							<img :src="wx_img" />
							<p class='p'>微信好友</p>
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
				<div class='sharepyq'>
					<div class="shareIcon width_33" @tap="_shareApp(1)">
						<img :src="erm_pyq_img" />
						<p>微信朋友圈</p>
					</div>
					<div class="shareIcon width_33" @tap="_shareApp(2)">
						<img :src="wx_img" />
						<p>微信好友</p>
					</div>
					<div class="shareIcon width_33" @tap="showSaveEWM('app')">
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
		
		<img class="zhiding" :src="zhiding" @tap="_zhiding">
		
		<!-- 领取优惠券 -->
		<div class="mask" v-if="couponMask">
			<div class="couponMask">
				<div class="couponWapper">
					<div class="title">
						<div>领券</div>
						<img class="cha" :src="guan_img" @tap="closeCouponMask" />
					</div>
					<div class="couponList">
						<div class="couponItem" v-for="(item,index) in coupon_list" :key="index">


							<div class="rightPart">

								<div class="limit">{{item.name}}</div>
								<span class="money" v-if="item.activity_type == 1">包邮</span>
								<span class="money" v-if="item.activity_type != 1">
									<span class='font_32' v-if="item.money>0">￥</span>
									{{item.money>0?item.money:item.discount}}
									<span class='font_32' v-if="item.money<=0">折</span>
								</span>
								<span class="payLine">{{ item.limit }}</span>
							</div>

							<div class="splitLine"></div>

							<div class="leftPart">
								<button class="toReceive" v-if="item.point == '立即领取'" @tap="_receive(index,item.id)">{{item.point}}</button>
								<button class="toReceive clicks" v-else-if="item.point == '可用商品'">已领取</button>
								<img class='img' alt="" v-if="item.point=='可用商品'" :src="coupon_on">
							</div>


						</div>
					</div>
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
	// #ifdef H5
	import jQuery from '../../common/jquery.js'
	import {
		copyText
	} from '@/common/util.js'
	// import copy from 'copy-to-clipboard'
	// #endif
	import {
		LaiKeTui_axios,
		LaiKeTuiInvite,
		LaiKeTuiShowSaveEWM,
		LaiKeTui_collection,
		LaiKeTui_shopping,
		LaiKeTuiGetCoupon,
		LaiKeTui_receive,
		LaiKeTui_buy_handle,
		LaiKeTui_confirm,
		LaiKeTui_spec,
		LaiKeTuiShowState,
		LaiKeTuiSetTimeData,
		LaiKeTuiToBr,
		LaiKeTuiShopEWM,
	} from '../../static/js/goods/goodsDetailed.js'
	
	import toload from '../../components/toload.vue'

	export default {
		data() {
			return {
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				niming: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/landing_logo2x.png', //图片
				zhiding: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/zhiding.png', //置顶
				coupon_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/coupon_detail.png',
				close: '',
				saves: '',
				cs_yprice: '',
				cs_price: '',
				cs_num: '',
				hour: 0,
				mniuate: 0,
				second: 0,
				day: 0,
				leftTime: '',
				attr_id: '',
				com1: [{
					img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ewmShare.png',
					tel: '15013245678',
					date: '2018-07-30',
					content: '特别好，很喜欢，蛋糕很成功。'
				}],
				bargain: false,
				shop_list: [],
				option: '',
				overflow: 'scroll',
				mask_display1: false,
				fastTap: true,
				axios_complete: false, //是否已加载完初始数据
				title: '商品详情',
				loadImg: true,
				shop_id: '',
				bback_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/bback.png',
				fx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx.png',
				gw_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/gw.png",
				load_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/5-121204193R7.gif",
				you_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jiantouhei2x.png",
				kf_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/kefu2x.png',
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
				coupon_on: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon_on.png",
				attribute_id: '',
				attrList: '',
				skuBeanList: '',
				mask_display: false,
				ys_price: '', //规格初始价格
				num: '', //规格数量
				price: '', //规格价格
				imgurl: '', //规格图片
				collection_id: '', //收藏id
				pro: '', //商品信息
				comments: '', //评价信息
				haveSkuBean: '', //选择规则属性
				numb: 1, //规格选择的数量
				collection: '', //收藏状态
				type: '', //判断进入规格选择是从立即购买1、加入购物车2、规格选择进入3
				goods_x: true,
				goods_g: false,
				access_id: '',
				g_show: false, //回顶部显示
				imgurls: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/landing_logo.png", //图片
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
				isDistribution: false, //是否是分销商品？true是，false不是
				ewmImg: '', //二维码图片
				login_status: '', //0:未登录；1已登录
				is_grade: '', //0:不是会员 1：是会员
				active: '', //活动类型
				hasorder: 0, //是否是待付款 0|1(待付款)
				sNo_id: 0, //订单id
				isbegin: 1, //是否是已开始的砍价商品 0（否）|1（是）
				shareMask_H5: false,
				h5_url: '',
				isfx: '',
				shareshop: 0,
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
				couponMask: false,
				coupon_list: [],
				clicktimes: [], //记录点击buy按钮时的时间
				allCartNum: 0, //购物车的总商品数
				status: '2',
				is_shop: false,
				headerplus: false,
				coupon_status: false,
				coupon_str: [], //显示的优惠券图标
				swiperIndex: 1, //轮播图下标
				
				loadFlag: false
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
			height: function() {
				if (this.leftTime > 0) {
					return uni.upx2px(750 * 79 / 375) + 'px';
				}
			},
			...mapState({
				_cart_num: 'cart_num'
			})
		},
		watch: {
			numb(newl, old) {
				console.log(Boolean(this.haveSkuBean))
			},
			
		},
		onLoad(option) {
			
			var me = this;
			me.option = option
			me.fastTap = true;
			
			me.leftTime = option.leftTime
			
			if (me.leftTime) {
				LaiKeTuiSetTimeData(me)
			}
			me.isfx = option.isfx
			if (option.productId) {
				me.pro_id = option.productId;
			} else if (option.pro_id) {
				me.pro_id = option.pro_id;
			}
			me.bargain_id = option.bargain_id;
			me.bargain = option.bargain;
			me.brStatus = option.brStatus;
			me.attr_id = option.attr_id;
			me.order_no = option.order_no;
			me.sNo_id = option.sNo_id;
			me.isbegin = option.isbegin;
			
			if (me.pro_id == '' || me.pro_id == undefined) {
				me.pro_id = me.$store.state.pro_id;
			}
			
			if (option.isDistribution) {
				me.isDistribution = option.isDistribution
			}
			
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
			me.hasorder = option.hasorder;
			
			uni.setStorageSync("fatherId", option.fatherId)
			
			// let p = new Promise((resolve, reject) => {
			// 	me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
			// 		resolve(1231);
			// 	});
			// });

			// p.then(() => {
				
			// 	me._axios();
			// })
		},
		onShow(option) {
			var me = this;
			this.allCartNum = this.$store.state.cart_num;
			this.close = this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close_bb.png'
			this.saves = this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/save.png'
			me.fastTap = true;
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id

			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231);
				});
			});

			p.then(() => {
				me._axios();
				
				this.$nextTick(function() {
					uni.getProvider({
						service: 'share',
						success: function(res) {
							console.log(res.provider)
						}
					});
				})
			})
			
			this.couponMask=false
		},
		//转发
		onShareAppMessage: function(res) {
			if (this.login_status == 0) {
				uni.navigateTo({
					url: '../../login/login?landing_code=1'
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
			swiperChange(e){
				this.swiperIndex = e.detail.current+1
			},
			_zhiding(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			onCopy(e) {
				uni.showToast({
					title: '复制成功！',
					icon: 'none',
					duration: 1500
				});
			},
			onError(e) {
				uni.showToast({
					title: '复制失败！',
					icon: 'none',
					duration: 1500
				});
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
			setHead() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#boxs').boundingClientRect(data => {
					if (data.top > -20) {
						this.headerplus = false
					} else if (data.top < -20) {
						this.headerplus = true
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
				if (me.pro.num < 1) {
					uni.showToast({
						title: '库存不足，无法参与砍价！',
						icon: 'none',
						duration: 1500
					})
					return;
				}
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
				if(this.option.toback=='true'){
					uni.navigateBack({
						delta: 1
					});
					return
				}
				// #ifdef H5
				uni.reLaunch({
					url: '../../pages/tabBar/home'
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
					me.shareHref2 = '/pagesA/store/store?is_share=true&shop_id=' + shop
				} else {
					me.is_shop = false
					me.shareHref2 = '/pages/goods/goodsDetailed?productId=' + me.pro_id
					me.sharehrefTitle = me.pro.name
					me.shareImg = me.imgurl
					me.shareContent = me.pro.name
					var url = uni.getStorageSync("h5_url")
					me.shareHref = url + 'pages/index/share?pages=goodsDetailed&productId=' + me.pro_id + '&isfx=true'
					if (me.pro.is_distribution == 1) {
						me.isDistribution = true
						me.shareHref = url + 'pages/index/share?pages=goodsDetailed&productId=' + me.pro_id +
							'&isfx=true&fatherId=' + me.pro.user_id
					}
				}

				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
					// #ifdef H5
					
						uni.showToast({
							title: "复制成功！",
							duration: 1500,
							icon: 'none'
						})
					return false

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
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
					uni.navigateTo({
						url: '../message/service?pid=' + pro_id
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
				if (this.numb < this.num && Boolean(this.haveSkuBean)) {
					this.numb++
				} else {
					if (!this.haveSkuBean) {
						uni.showToast({
							title: '请先选择商品规格',
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
						url: '../evaluate/evaluate?pid=' + pro_id
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
				this.type = 1
				this.fastTap = true
				this._mask_display()
			},
			getCoupon() {
				var me = this;
				LaiKeTuiGetCoupon(me)
			},
			_receive(index, id) {
				var me = this
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
					LaiKeTui_receive(me, id)
				});
			},
			closeCouponMask() {
				this.couponMask = false;
			},
			_buy() {
				var me = this;
				if (!me.axios_complete) {
					return false
				}
				if (me.status == 2) {
					if (me.pro.canbuy == 1) {
						me.LaiKeTuiCommon.laiketuiNoDoublePress(me, me._buy_handle);
					} else {
						if (this.active == 5) {
							uni.showToast({
								title: '您的会员等级不满足购买要求，请升级会员等级后再购买!',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '您的分销等级不满足购买要求，请升级分销等级后再购买!',
								icon: 'none'
							})
						}
					}
				} else {
					uni.showToast({
						title: '该商品已下架!',
						icon: 'none'
					})
				}
				if (this.active == 6) {
					if (this.is_grade == 0 && this.login_status == 1) {
						uni.showToast({
							icon: 'none',
							title: '对不起，你不是会员'
						})
					}

					return
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
				me.axios_complete = true
			}
		},
		components: {
			heads,
			wxParse,
			// #ifdef H5
			jQuery,
			// #endif
			toload,
		}
	}
</script>

<style lang="less" scoped>
	/* @import url("../../static/css/goods/goodsDetailed.css"); */
	@import url("../../static/css/goods/goodsDetailed.less");
</style>
