<template>
	<div class="order_ii" :style='{"overflow":overflow}' style="height: unset !important;">

		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<div ref='box'>
			<heads :title='title' ></heads>

			<!--  轮播图   -->
			<view class="yh-swiper">
				<div v-if='!isshow || pro_status==3' class="yh-isshow">
					<img :src="list_end" v-if='pro_status==3' class="yh-list-end" />
					<img :src="loseEfficacyImg" alt="" v-if="!isshow && pro_status!=3" class="yh-list-end" />
				</div>

				<swiper class="my_swiper yh-my-swiper" @change='_changeSwiper'>
					<swiper-item v-for='(item,index) in images' :key='index'>
						<img class="swipe yh-swiper-img" :src="item" />
					</swiper-item>
				</swiper>

				<view class="swiper_icon">
					{{swiperCurrent}}/{{images.length}}
				</view>

				<div class="swiper_end" v-if="false">
					<img :src="list_end" />
				</div>

			</view>

			<div class='load' v-if="load" :style="{ top: halfWidth }">
				<img class="yh-load-img" :src="load_img" />
				<p>图片加载中…</p>
			</div>

			<!-- 时间 -->
			<div class="group_time">

				<div class="group_time_l list_break1">

<!-- 					<span class="group_people">{{can_min_man}}人团 |</span>

					<span class="group_money">{{can_min_price}}
						<span class="group_line">￥{{detail.market_price}}</span>
					</span> -->
					<view class="group-pt">
						<view class="group-pt-ptjg"><text>￥</text> {{ can_min_price }}</view>
						<view class="group-pt-dmjg">单买价￥{{ detail.market_price }}</view>
					</view>

					<view class="group-pt-per">
						<text>{{ can_min_man }}人团</text>
					</view>
				</div>

				<div class="group_time_r" v-if="pro_status==3">
					<!-- 距离活动开始还有 -->
					<div class="group_prompt">活动已结束</div>
					<div class="group_countdown">
						<span>00</span>天
						<span>00</span>：
						<span>00</span>：
						<span>00</span>
					</div>
				</div>

				<div class="group_time_r" v-else>
					<!-- 距离活动开始还有 -->
					<div class="group_prompt" v-if="pro_status==4">距离活动开始还有</div>
					<div class="group_prompt" v-if="pro_status==1">距离活动结束仅剩</div>
					<div class="group_prompt" v-if="pro_status==2">距离活动结束仅剩</div>
					<div class="group_prompt" v-if="pro_status==3">距离活动结束已有</div>
					<div class="group_countdown">
						<span>{{overtime.day}}</span>天
						<span>{{overtime.hour}}</span>：
						<span>{{overtime.minute}}</span>：
						<span>{{overtime.second}}</span>
					</div>
				</div>
			</div>

			<div class='goods_name'>
				<!--<p>{{pro.brand_name}}{{pro.cat_name}}</p>-->
				<p class="yh-pro-name">{{ detail.pro_name }}</p>
				<p class="yh-freight-name">运费：{{ detail.freight_name }}</p>
				<!-- <div class='guige' @tap="_shopping()" ref="homeHead">
					<span style='color: #020202;'>请选择规格参数</span>
				</div> -->
				<div class='guige' @tap="_shopping1()" ref="homeHead">
					<span v-if="haveSkuBean==''">选择商品规格</span>
					<span v-else>{{haveSkuBean.name}}</span>
					<!-- <span>{{haveSkuBean==""?"选择商品规格":haveSkuBean.name}}</span> -->
					<img class='arrow' :src="you_img" />
				</div>
			</div>

			<div class="yh-groupList-line" v-if='groupList.length'></div>

			<div class="group_peo" v-if='groupList.length'>
				<div class="group_people_t">以下小伙伴正在发起拼团 <span class="group_span1">已有<span class="group_span2">{{detail.buysum}}</span>人团</span></div>
				<ul :class="[groupList.length>5?'cantuan_roll':'']">
					<template v-for="(item,index) in groupList">
						<li v-if='isshow && pro_status!=3' :key='index'>
							<div class="group_peo_l">
								<img :src="item.headimgurl">
								<div class="group_l_r">
									<p>{{item.user_name}}</p>
									<p>{{item.groupman}}人团</p>
								</div>
							</div>
							<div class="group_peo_r">
								<div class="group_r_l">
									<p>还差<span>{{item.groupman-item.ptnumber}}</span>人成团</p>
									<p>剩余<span>{{item.leftTimeStr}}</span></p>
								</div>
								<div class="group_r_r" @tap="_gocantuan(item.sNo)"><span>去参团</span></div>
							</div>
							<div class="yh-groupList-clear"></div>
						</li>
					</template>
				</ul>
			</div>

			<div class="yh-groupList-line"></div>

			<div class="group_wf">
				<div class="group_wf_t">
					<div class="yh-yhpj">拼团玩法</div>

					<div class="group_gz" @tap="showrule()">
						<span class="yh-ptgz">拼团规则</span>
					</div>

					<img class='arrow' :src="arrowimg" />
				</div>
				<ul>
					<li :style="list_bg1">
						<view class="buzhou_num">1</view>
						<p>点击开团</p>
						<p>或参团</p>
						<img class='arrow' :src="you_img" />
					</li>
					<li :style="list_bg2">
						<view class="buzhou_num">2</view>
						<p>邀请</p>
						<p>好友参团</p>
						<img class='arrow' :src="you_img" />
					</li>
					<li :style="list_bg3">
						<view class="buzhou_num">3</view>
						<p>达到</p>
						<p>拼团人数</p>
						<img class='arrow' :src="you_img" />
					</li>
					<li :style="list_bg4">
						<view class="buzhou_num">4</view>
						<p>组团成功</p>
						<p>等待发货</p>
					</li>
				</ul>
			</div>

			<div class="yh-groupList-line-a"></div>

			<div class='user gd_user' v-if='comments.length' @tap="_evaluate(pro_id)">
				<p class="yh-yhpj">用户评价（{{ comments.length }}）</p>
				<img class='arrow' :src="arrowimg" />
			</div>

			<div class='evaluate_c' v-if='comments.length'>

				<div class='user_name'>
					<img class="yh-img-imgurls" :src="comments[0].anonymous==0?(comments[0].headimgurl==''?imgurls:comments[0].headimgurl):imgurls" />
					<span>{{ comments[0].anonymous==1?'匿名':comments[0].user_name }}</span>
				</div>

				<div class='user_guige'>
					<span class='evaluate_t yh-evaluate-t'>{{ comments[0]?comments[0].time:'' }}</span>
					<span class='evaluate_gg'>{{comments[0].attribute}}</span>
				</div>

				<p>{{ comments[0]?comments[0].content:'' }}</p>
			</div>

			<div class='user' v-if='!comments.length'>
				<p class="yh-yhpj">暂无评价</p>
			</div>

			<div class="yh-groupList-line"></div>
			<!-- 店铺信息 -->
			<div v-if='shop_list.shop_id' class="yh-shop-id">

				<div class='store store1'>
					<div class='store1Div'>
						<img :src='shop_list.shop_logo'>
						<div>{{shop_list.shop_name}}</div>
					</div>
					<div class='goStore store1Div' @tap='_goStore(shop_list.shop_id)'>进店逛逛</div>
				</div>
				<div class='store store2 yh-store2'>

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
			<div class="yh-groupList-line"></div>
			<div class='goods_d' @tap="_goods_x" id="doogi">商品详情</div>

			<!--  商品详情    -->
			<div class='content_d' id='content_d' v-if='goods_x'>
				<wxParse v-if="detail&&detail.content != ''" :content="detail.content"></wxParse>
			</div>

			<!-- <div class='content_d' v-html="pro.content" id='content_d' v-if='goods_x'></div> -->
			<!--  规格参数   -->
			<ul class='goods_spec' v-if='goods_g'>
				<li>
					<div class="g_div">
						<div>商品名称：</div>
					</div>
					<p>{{detail.pro_name}}</p>
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
			<div class='goods_foot'>
				<div class='goods_bottom yh-goods-bottom'>

					<!-- #ifdef MP-WEIXIN -->
					<div class='goods_one yh-goods-one'>
						<button class="kf_button_css " type="primary" open-type="contact">
							<img :src="kf_img" />
							<p class="yh-mykh">客服</p>
						</button>

					</div>
					<!-- #endif -->

					<!-- #ifdef MP-BAIDU  -->
					<div class='goods_one yh-goods-one'>
						<button class="kf_button_css" open-type="contact" bindcontact="contactCB">
							<img :src="kf_img" />
							<p class="yh-mykh">客服</p>
						</button>
					</div>
					<!-- #endif -->

					<!-- #ifndef MP-WEIXIN || MP-TOUTIAO || MP-BAIDU -->
					<div class='goods_one yh-goods-one' @tap="kf(pro_id)">
						<img :src="kf_img" />
						<p class="yh-mykh">客服</p>
					</div>
					<!-- #endif -->

					<!-- #ifdef MP-ALIPAY  || MP-TOUTIAO || MP-BAIDU -->
					<button open-type="share" class='goods_one yh-fx-but' v-if="userinfo != '' || access_id != ''">
						<img :src="fx_img" />
						<p class="yh-fx-p">分享</p>
					</button>
					<button  class='goods_one yh-fx-but' @tap="_islogin()" v-else>
						<img :src="fx_img" />
						<p class="yh-fx-p">分享</p>
					</button>
					<!-- #endif -->

					<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
					<div class='goods_one' @tap="showShareMask" id="copyy" :data-clipboard-text='shareHref'>
						<img :src="fx_img" />
						<p class="yh-fx-p">分享</p>
					</div>
					<!-- #endif -->

					<!-- 可以进行拼团购买的 -->
					<div v-if="pro_status==1 && isshow">

						<div class='goods_two yh-shopping' @tap='_shopping'>
							<div>
								<p class="yh-shopping-p">
									￥
									<span class="yh-shopping-span">
										{{ market_price2 }}
									</span>
								</p>

								<p class="yh-shopping-s"></p>
								<p>单独购买</p>
							</div>
						</div>

						<div class='goods_two yh-ktbut' @tap="_buy">
							<div>
								<p class="yh-shopping-p">
									￥
									<span class="yh-shopping-span">
									{{ price2 }}
									</span>
								</p>

								<p class="yh-shopping-s"></p>
								<p>我要开团</p>
							</div>
						</div>

					</div>

					<!-- 不可以进行拼团购买的 -->
					<div v-else>
						<div class='goods_two yh-no-pt'>
							<div>
								<p>￥{{market_price2}}</p>
								<p>单独购买</p>
							</div>
						</div>
						<div class='goods_two goods_two_dsb yh-no-pt'>
							<div>
								<p>￥{{price2}}</p>
								<p>我要开团</p>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class='share' v-if="g_show">
				<div @tap="toTop">
					<img :src="top_img" />
				</div>
			</div>
		</div>
		<!--  遮罩      -->
		<div class='mask' v-if='mask_display'>
			<div class="mask_d" :class='mask_display1?"goodAnimate1":(mask_display?"goodAnimate":"")'>
				<div class='mask_guige'>
					<div class='mask_one'>

						<div>
							<img class="shangp" :src="imgurl" />
						</div>

						<div class='mask_pric'>

							<p class="yh-ml">
								￥
								<span class="yh-ml-span">
									{{isshopping?market_price:(type==3 || type==2)?price:market_price}}
								</span>
							</p>

							<p class="yh-kc-num">库存{{ num }}</p>
						</div>

						<img class="cha" :src="guan_img" @tap="_mask_f()" />
					</div>
					<div class="mask_over">
						<div class='mask_two' v-for='(item,indx) in attrList' :key='indx'>

							<p class="yh-attrName">{{ item.attrName }}</p>

							<ul v-if="num==0">
								<li v-for='(items,index) in item.attr' :key='index' @tap='showState(index,indx)'>{{items.attributeValue}}</li>
							</ul>
							<ul v-else>
								<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']"
								 @tap='showState(index,indx)'>{{items.attributeValue}}</li>
							</ul>
						</div>
						<div class='mask_two' v-if="type==3">

							<p style="color: rgb(2, 2, 2);">拼团人数</p>

							<ul>
								<li v-for='(ssd,indet) in group_level' :key='indet' @tap='_money(ssd,indet)' :class="indet==num_peo?'orange':'select'">{{indet}}
									人团</li>
							</ul>
						</div>
						<div class='mask_num'>
							<p>购买数量</p>
							<div class='numb'>
								<img :src="numb==1?jian_hui:jian_hei" @tap="_reduce" />
								<i>{{numb}}</i>
								<img :src='numb<num?jia_hei:jia_hui' @tap="_add" />
							</div>
						</div>
					</div>

				</div>
				<div style="height: 98upx;">
					<div class='mask_quren' @tap="_confirm">确认</div>
				</div>
			</div>
		</div>

		<div v-if=' !isshow || pro_status == 3' @tap="_endTips" class="yh-endTips"></div>

		<div class='mask' @tap='_shareDiv' v-if='shareDiv'>

			<div class='allCenter yh-allCenter'>

				<div class="yh-invite" v-for='(item,index1) in shareWay' :key='index1' @tap='_invite(item.name)'>

					<div>
						<img :src="item.imgUrl" class="yh-invite-img" />
					</div>

					<span class="yh-invite-span">{{ item.name }}</span>
				</div>

			</div>

		</div>

		<div class="mask" @touchmove.stop v-if="shareMask && saveEWM">
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
			<div class="shareMask" v-else-if="!shareMask_H5&&!saveEWM" @tap.stop>
				<div class="shareMaskTitle">分享至</div>

				<!-- #ifdef H5 -->
				<div style="width: 55%;margin: 0 auto;">
					<div class="shareIcon" @tap="copy_url()" style="width: 50%;">
						<img :src="erm_pyq_img" />
						<p>复制链接</p>
					</div>
					<div class="shareIcon" @tap="showSaveEWM(app)" style="width: 50%;">
						<img :src="erm_img" />
						<p>二维码分享</p>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<div style="width: 70%;margin: 0 auto;display: flex;justify-content: space-between;">
					<div class="shareIcon" style='width: 50%;position: relative;'>
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
				<div style="width: 70%;margin: 0 auto;">
					<div class="shareIcon" @tap="_shareApp(1)" style='width: 33%;'>
						<img :src="erm_pyq_img" />
						<p>微信朋友圈</p>
					</div>
					<div class="shareIcon" @tap="_shareApp(2)" style='width: 33%;'>
						<img :src="wx_img" />
						<p>微信好友</p>
					</div>
					<div class="shareIcon" @tap="showSaveEWM('app')" style='width: 33%;'>
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

		<!-- #ifdef MP-ALIPAY -->
		<view id="rule-box" @touchmove.stop="moveHandle" v-if="show_rule" class="yh-rule">

			<view class='content_d yh-rule-content' id='content_d'>

				<div class="yh-rule-ptgz">拼团规则</div>

				<div class="yh-rule-div">
					<rich-text class="richtext" :nodes="contentNodes" style="font-size: 14px;"></rich-text>
				</div>

				<view @tap="closerule()" class="yh-rule-closerule">我知道了</view>
			</view>

		</view>
		<!-- #endif -->

		<!-- #ifndef MP-ALIPAY -->
		<div id="rule-box" @touchmove.stop="moveHandle" v-if="show_rule" class="yh-rule">

			<div class='content_d yh-rule-content' id='content_d'>

				<div class="yh-rule-ptgz">拼团规则</div>
				<scroll-view scroll-y class="yh-rule-div">
					<rich-text class="richtext" :nodes="contentNodes" style="font-size: 14px;"></rich-text>
				</scroll-view>

				<div @tap="closerule()" class="yh-rule-closerule">我知道了</div>
			</div>
		</div>
		<!-- #endif -->

	</div>
</template>

<script>

	// #ifdef H5
	import jQuery from '../../common/jquery.js'
	// #endif

	import heads from "../../components/header.vue"
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import lktauthorize from '../../components/lktauthorize.vue'
	import {
		_axios,
		getPic,
		_money,
		setTimeData,
		countDown,
		dateformat,
		_invite,
		_gocantuan,
		_downEWM,
		_shareApp,
		showShareMask,
		showSaveEWM,
		_reduce,
		_buy,
		_confirm,
		_reattr,
		showState,
		_spec,
	} from '../../static/js/group/groupDetailed.js'
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage.js'
	export default {
		data() {
			return {
				close: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close_bb.png',
				saves: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/save.png',
				fx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/footshare2x.png',
				gw_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/gw.png',
				load_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				you_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/gd_inner.png',
				kf_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/kefu2x.png',
				top_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/kaobei2x.png',
				guan_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/guanbi2x.png',
				wx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png',
				jian_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jian2x.png',
				jian_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jianhui2x.png',
				jia_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jia+2x.png',
				jia_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/add+2x.png',
				xing_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xinghei2x.png',
				xing_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xinghui2x.png',
				erm_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ewmShare.png',
				wx_person: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wepyq.png',
				bback_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/bback.png',
				logo: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/lktlogo.png',
				list_end: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jp_end.png',
				erm_pyq_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wepyq.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				arrowimg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/gd_outer.png',
				overflow: 'scroll',
				mask_display1: false,
				fastTap: true,
				title: '商品详情',
				list_bg1: "",
				list_bg2: "",
				list_bg3: "",
				list_bg4: "",
				attribute_id: '',
				attrList: '',
				attrList2: '',
				skuBeanList: '',
				show_rule: false, //是否显示规则
				shop_list: [], //店铺信息
				mask_display: false,
				ys_price: '', //规格初始价格
				num: '', //规格数量
				price: '', //规格价格
				price2: '', //规格价格2
				imgurl: '', //规格图片
				collection_id: '', //收藏id
				pro: '', //商品信息
				activity_no: "", //商品拼团版本号
				comments: '', //评价信息
				haveSkuBean: '', //选择规则属性
				numb: 1, //规格选择的数量
				collection: '', //收藏状态
				type: '', //判断进入规格选择是从立即购买1、加入购物车2、规格选择进入3
				goods_x: true,
				goods_g: false,
				access_id: '',
				g_show: false, //回顶部显示
				imgurls: "", //图片
				load: true,
				attr_: '', //商品所有属性
				attr__: '', //商品所有属性固定不变
				isshopping: false, //是否单独购买
				can_min_price: '', //参团最低价格
				can_min_man: '', //参团价格最低对应人数
				again_can: '', //是否能继续！参！团
				again_open: '', //是否能继续！开！团
				market_price: '', //单独购买默认价格
				market_price2: '', //单独购买默认价格固定不变
				data_: '', //获取商品的数据
				shareMask: false,
				saveEWM: false,
				shareDiv: false,
				shares: {},
				shareContent: '一起来用来客推吧！', //分享的内容
				shareHref: '', //分享的链接
				sharehrefTitle: '一起来用来客推吧1', //分享的链接的标题
				sharehrefDes: '一起来用来客推吧2', //分享的链接的描述
				pic: '',
				pro_id: "",
				images: [], //轮播图
				detail: '',
				overtime: {
					day: '00',
					hour: '00',
					minute: '00',
					second: '00'
				}, //结束时间
				img: '',
				groupList: [], //拼团数量
				det: '',
				group_level: "", //几人团
				num_peo: "",
				mno_: "",
				groupzk: "", //当前所选拼团折扣
				control: "", //拼团参数
				pro_status: 1, //1代表正在进行拼团的产品
				head: true, //头部切换
				ewmImg: '', //二维码图片
				ewmImg_url: '', //二维码图片下载地址
				clickFlag: false,
				shareMask_H5: false,
				isshow: true,
				loseEfficacyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/loseEfficacy2x.png',
				h5_url: '',
				onshow: true,
				isfx: '',
				islogin: '',
				attr_list: '',
				platform_activities_id: '',
				user_can_can: '', //用户能否继续参团
				user_can_open: '', //用户能否继续开团
				user_can_can_num: '', //参团最大数量
				user_can_open_num: '', //开团最大数量
				bili: '', //优惠比例
				iscombotab: false, //是否连续点击
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
						name: '二维码',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ewmShare.png'
					},
					// #endif
				],
				goods_two: 'goods_two',
				clear: '',
				contentNodes: [],
				stop: "", //定时器对象
				swiperCurrent: 1, //轮播图的当前下标
				userinfo:'',//用户小程序登录授权信息
			}
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			}
		},
		watch: {
			numb(newl, old) {}
		},
		onShow(option) {

			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			//todo
			if (this.pro_id) {
				this._axios()
			}
			this.userinfo = uni.getStorageSync("userinfo");
			console.log("userinfo");
			console.log(this.userinfo);
			this.getPic()
			// this.imgurls = this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/landing_logo2x.png";
			this.imgurls = this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/landing_logo2x.png";
			this.shareHref = uni.getStorageSync("h5_url") + 'pages/index/share?pages=groupDetailed&isfx=true&pro_id=' + this.pro_id +
				'&activity_no=' + this.activity_no
			clearTimeout(this.stop);
		},
		beforeMount() {
			clearTimeout(this.stop);
		},
		onUnload() {
			clearTimeout(this.stop);
		},
		/**
		 * 转发
		 * */
		onShareAppMessage: function(res) {
			var me = this
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1',function(){
					return {
						title: this.detail.pro_name,
						path: '/pagesA/group/groupDetailed?pro_id=' + this.pro_id + '&activity_no=' + this.activity_no,
						imageUrl: this.images[0],
						bgImgUrl: this.images[0],
						success: function(res) {
							console.log('成功', res)
						}
					}
				});
			})


		},
		onLoad(option) {

			var me = this;
			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231)
				})
			});

			p.then(() => {
				me.pro_id = option.pro_id
				me.activity_no = option.activity_no
				me.platform_activities_id = option.platform_activities_id
				me.isfx = option.isfx
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				me._axios()
				me.getPic()
			})

		},
		mounted() {
			// window.addEventListener('scroll',this._scrollHeader)
			this.$nextTick(function() {
				uni.getProvider({
					service: 'share',
					success: function(res) {

					}
				});
			})

		},
		methods: {
			...mapMutations({
				cart_id: 'SET_CART_ID',
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				pay_lx: "SET_PAY_LX"
			}),
			/**
			 *
			 * */
			_changeSwiper(e) {
				this.swiperCurrent = e.detail.current + 1
			},
			/**
			 *
			 * */
			moveHandle() {

			},
			/**
			 *
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			_back1() {
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
			 *
			 * */
			copy_url() {
				this.shareMask_H5 = true
				var url = this.$store.state.url
				url = url.split('index')[0]
				this.h5_url = this.shareHref
			},
			/**
			 *
			 * */
			copyH5Url() {
				var me = this
				jQuery("#h5_input input").select();
				document.execCommand("Copy");
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
				uni.navigateTo({
					url: './group'
				})
			},
			/**
			 *
			 * */
			_navigateTo(url) {
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
			_axios() {
				var me = this
				_axios(me)
			},
			/**
			 *
			 * */
			getPic() {
				var me = this
				getPic(me)
			},
			/**
			 *
			 * */
			_money(ss, indet) {
				var me = this
				_money(ss, indet, me)
			},
			/**
			 *
			 * */
			setTimeData(data) {
				var me = this
				setTimeData(data, me)
			},
			/**
			 * 倒计时
			 * */
			countDown(endtime) {
				var me = this
				countDown(endtime, me)
			},
			/**
			 * 时间格式化输出，如11:03 25:19 每1s都会调用一次
			 * */
			dateformat(micro_second) {
				var me = this
				dateformat(micro_second, me)
			},
			/**
			 *
			 * */
			_closeAllMask() {
				this.shareMask = false
				this.saveEWM = false
				this.shareMask_H5 = false
				this.overflow = 'scroll'
			},
			/**
			 *
			 * */
			_shareDiv() {
				this.shareDiv = false
			},
			/**
			 *
			 * */
			_endTips() {
				if (this.pro_status == 3) {
					uni.showToast({
						title: '活动已经结束!',
						icon: 'none'
					})
				}

			},
			/**
			 *
			 * */
			_invite(type) {
				var me = this
				_invite(type, me)
			},
			/**
			 *
			 * */
			_gocantuan(sNo) {
				var me = this;
				_gocantuan(sNo, me)
			},
			/**
			 *
			 * */
			_goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			/**
			 *
			 * */
			_gocart() {
				uni.switchTab({
					url: '../tabBar/shoppingCart'
				})
			},
			/**
			 *
			 * */
			_downEWM() {
				var me = this
				_downEWM(me)
			},
			/**
			 *
			 * */
			_shareApp(type) {
				var me = this
				_shareApp(type, me)
			},
			/**
			 *
			 * */
			showShareMask() {
				var me = this;
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.shareHref = uni.getStorageSync("h5_url") + 'pages/index/share?pages=groupDetailed&isfx=true&pro_id=' + me.pro_id +
						'&activity_no=' + me.activity_no;
					// #ifdef H5
					var Clipboard = require('../../common/clipboard.js')
					var clipboard = new Clipboard('#copyy')
					clipboard.on('success', function(e) {
						uni.showToast({
							title: '复制分享链接成功！',
							duration: 1000,
							icon: 'none'
						})
					});
					clipboard.on('error', function(e) {
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
					//APP 分享选择
					me.shareDiv = true
					// #endif
					// #endif

				});
			},
			/**
			 *
			 * */
			closeShareMask() {
				this.shareMask = false
				this.overflow = 'scroll'
			},
			/**
			 *
			 * */
			showSaveEWM(string) {
				var me = this
				showSaveEWM(string, me)

			},
			/**
			 *
			 * */
			kf(pro_id) {
				var me = this
				if (!me.iscombotab) {
					me.iscombotab = true
					setTimeout(function() {
						me.iscombotab = false
					}, 2000)
				} else {
					return false
				}

				if (!this.access_id && !this.islogin) {
					uni.showToast({
						title: '未登录，请先登录',
						duration: 1000,
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../pages/login/login?landing_code=1'
						})
					}, 1000)
				} else {
					uni.navigateTo({
						url: '../../pages/message/service?pid=' + pro_id
					});
				}
			},
			/**
			 *
			 * */
			_reduce() {
				var me = this
				_reduce(me)
			},
			/**
			 *
			 * */
			_add() {
				if (!Boolean(this.haveSkuBean)) {
					uni.showToast({
						title: '请选择完整商品规格！',
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				// 如果是拼团购买，则还要判断是否勾选了拼团人数
				if (this.type == 3 && this.num_peo == "") {
					uni.showToast({
						title: '请选择完整拼团人数！',
						duration: 1000,
						icon: 'none'
					})
					return;
				}

				if (this.num <= this.numb) {
					uni.showToast({
						title: '库存不足！',
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				this.numb++

			},
			/**
			 *
			 * */
			_load_img() {
				this.load = false
			},
			_islogin(){
				var me = this
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					console.log("dll");
				});
			},
			/**
			 *
			 * */
			_goods_x() {
				this.goods_x = true
				this.goods_g = false
			},
			/**
			 *
			 * */
			_goods_g() {
				this.goods_x = false
				this.goods_g = true
			},
			/**
			 *
			 * */
			showrule() {
				var me = this
				me.show_rule = true
			},
			/**
			 *
			 * */
			closerule() {
				var me = this
				me.show_rule = false
			},
			/**
			 *
			 * */
			_evaluate(pro_id) {
				uni.navigateTo({
					url: '../../pages/evaluate/evaluate?pid=' + pro_id
				});
			},
			/**
			 *
			 * */
			toTop() {
				// document.documentElement.scrollTop = document.body.scrollTop = 0;
			},
			/**
			 * 规格选择
			 * */
			_selectG() {
				this.type = 1
				this._mask_display()
			},
			/**
			 *
			 * */
			in_array(stringToSearch, arrayToSearch) {
				for (let s = 0; s < arrayToSearch.length; s++) {
					let thisEntry = arrayToSearch[s].toString();
					if (thisEntry == stringToSearch) {
						return true;
					}
				}
				return false;
			},
			/**
			 * 单独购买
			 * */
			_shopping() {
				var me = this
				this.type = 2
				this.numb = 1
				this.fastTap = false
				this.isshopping = true
				if (this.pro_status == 3) {
					uni.showToast({
						title: "活动已结束，无法购买！",
						duration: 1000,
						icon: 'none'
					})
				} else {
					me.LaiKeTuiCommon.lktDelaySetVal(me);
					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
						me._mask_display()
					});
				}
			},
			/**
			 *
			 * */
			_shopping1() {
				if (this.pro_status == 3) {
					uni.showToast({
						title: "活动已结束，无法购买！",
						duration: 1000,
						icon: 'none'
					})
				} else if (this.pro_status == 2) {
					uni.showToast({
						title: "库存不足！",
						duration: 1000,
						icon: 'none'
					})
				} else if (this.pro_status == 4) {
					return false
				} else {
					this.type = 1
					this.fastTap = true
					this._mask_display()
				}

			},
			/**
			 * 开团
			 * */
			_buy() {
				var me = this
				_buy(me)
			},
			/**
			 * 打开遮罩层
			 * */
			_mask_display() {
				this.mask_display = true
				this.overflow = 'hidden'
			},
			/**
			 * 关闭遮罩层
			 * */
			_mask_false() {
				var me = this
				// this.haveSkuBean = ""
				this.overflow = 'scroll'
				this.mask_display1 = true
				setTimeout(function() {
					me.mask_display = false
					me.mask_display1 = false
				}, 500)
			},
			/**
			 *
			 * */
			_mask_f() {
				this.groupzk = ""
				this._mask_false()
				this.overflow = 'scroll'
			},
			/**
			 * 确认
			 * */
			_confirm() {
				var me = this
				_confirm(me)
			},
			/**
			 *
			 * */
			_reattr() {
				var me = this
				_reattr(me)
			},
			/**
			 *
			 * */
			_spec() {
				var me = this
				_spec(me)
			},
			/**
			 * 选择属性
			 * */
			showState(index, indx) {
				var me = this
				showState(index, indx, me)
			}
		},
		components: {
			heads,
			wxParse,
			// #ifdef H5
			jQuery,
			// #endif
			lktauthorize,
		}
	}
</script>

<style>
	@import url("../../static/css/group/groupDetailed.css");
</style>
