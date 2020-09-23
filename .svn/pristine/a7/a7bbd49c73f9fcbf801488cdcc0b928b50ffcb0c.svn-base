<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>

		<!-- #ifndef MP -->
		<div class="yh-ifndefMP" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_back()" />
					<p class="yh-head-p">竞拍详情</p>
					<p class="yh-head-gz" @tap='_goRule()'>竞拍规则</p>
				</div>
			</div>
		</div>
		<div class="yh-ifndefMP-no"></div>
		<!-- #endif -->

		<!-- #ifdef MP-->
		<view class="wei_gz yh-wei-gz">
			<view class="" @tap='_goRule()'>竞拍规则</view>
		</view>
		<!-- #endif -->

		<!-- 轮播图 -->
		<div class="swiper_detail" v-if='have_jp&&!load'>
			<swiper class="swiper_swiper">
				<swiper-item>
					<img :src="order.imgurl" />
				</swiper-item>
			</swiper>
			<view class="swiper_icon">
				1/1
			</view>
			<div class="swiper_end" v-if="is_invalid">
				<img :src="jp_invalid" />
			</div>
		</div>

		<!-- 内容 -->
		<div class="bid_content" v-if='have_jp&&!load'>
			<div class="bid_t">
				<img :src="list_time" />
				<!-- formMy_old=1从我的竞拍过来的，并且已经过了结束时间 -->
				<div class="bid_time" v-if="from_mark!=0 && from_mark != 1">
					<span>已结束</span>
				</div>
				<div class="bid_time" v-else>
					<!-- form_type=0即将开拍 -->
					<span v-if="from_mark==1">距结束</span>
					<span v-else>距开始</span>
					<span>{{overtime.day}}</span>天
					<span>{{overtime.hour}}</span>：
					<span>{{overtime.minute}}</span>：
					<span>{{overtime.second}}</span>
				</div>
			</div>

			<div class="bid_up">
				<div class="titile_outer">
					<div class="bid_title">{{order.title}}</div>


					<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
					<button id="copyy" :data-clipboard-text='shareHref' v-if="!is_invalid" open-type="share" class="yh-titile-outer-btn">
						<div class="bid_right">
							<img :src="jp_share">
							<div>分享</div>
						</div>
					</button>
					<!-- #endif -->


					<!-- #ifndef MP-ALIPAY || MP-TOUTIAO  || MP-BAIDU -->
					<div class="bid_right" @tap="showShareMask" id="copyy" :data-clipboard-text='shareHref' v-if="!is_invalid">
						<img :src="jp_share">
						<div>分享</div>
					</div>
					<!-- #endif -->


				</div>

				<div class="bid_bigin">
					<span :class="bid_money==true?'bid_bigin_l bid_color':'bid_bigin_l'">¥{{order.price}}</span>
					<span class="bid_bigin_r">¥{{order.current_price}}</span>
				</div>
				<div class="bid_number">
					<span class="bid_number_l">市场价<span>¥{{order.market_price}}</span></span>
					<span class="bid_number_r">参与<span>{{order.pepole}}</span>人</span>
				</div>
			</div>

			<div class="bid_div" v-if="bind_pro==1&&bind_st==1">
				<div class="list_height"></div>
				<div class="bid_my_record">我的竞拍动态</div>
				<div v-for='(item,indexs) in res_my' v-if='res_my.length' :key="indexs">
					<div class="bid_out_money">
						<div class="bid_money_l">已出价{{item.price}}元。 </div>
						<div class="bid_money_r">{{item.add_time}}</div>
					</div>
				</div>
				<div v-if='!res_my.length'>
					<div class="bid_out_money">
						<div class="bid_money_l">未成功出价 </div>
					</div>
				</div>
			</div>

			<div class="bid_div" v-if="bind_pro==1&&bind_st==1">
				<div class="bid_my_record">竞拍动态</div>
				<div class="clears clear">
					<ul class="bid_uls" v-for='(items,index) in res_ove' v-if='res_ove.length' :key="index">
						<li>
							<div class="bid_ul_l">{{items.user_name}}出价{{items.price}}元。</div>
							<div class="bid_ul_r">{{items.add_time}}</div>
						</li>
					</ul>
					<div class="bid_out_money yh-bid-out-money" v-if='!res_ove.length'>
						<div class="bid_money_l">未成功出价</div>
					</div>
					<div class="clears"></div>
				</div>

			</div>

			<div class="bid_div">
				<div class="bid_dynamic">竞拍动态</div>
				<div class="list_height"></div>
			</div>

			<div class="bid_div" v-if="from_mark==2||from_mark==4">
				<div class="list_height"></div>
				<div class="bid_dynamic">恭喜用户{{order.user_name}}以¥{{order.current_price}}的价格拍得本商品</div>
				<div class="list_height"></div>
			</div>

			<div class="bid_div">
				<div class="bid_record" @tap="_bid_record()">
					<span>竞拍记录</span>
					<span style="color: ;">丨{{bid_num}}条</span>
					<img :src="list_right" />
				</div>
				<view class="three_record">
					<view class="three_record_item" v-for="(item,index) in threeRecords">
						<view class="three_font user_name_long">{{item.user_name}}</view>
						<view class="three_font">{{item.grade}}</view>
						<view class="three_font">{{item.add_time}}</view>
						<view class="three_font" style="width: 18%;">{{item.price}}</view>
					</view>
				</view>
				<div class="list_height"></div>
			</div>

			<div class="bid_div yh-bid-div">
				<view class="jp_cate">
					<view>拍卖类型</view>
					<view>普通竞拍</view>
				</view>
				<view class="jp_cate">
					<view>起拍价</view>
					<view>¥{{order.price}}</view>
				</view>
				<view class="jp_cate">
					<view>保证金</view>
					<view>¥{{order.promise}}</view>
				</view>
				<view class="jp_cate">
					<view>加价幅度</view>
					<view>¥{{order.add_price}}</view>
				</view>
				<view class="jp_cate">
					<view>开拍时间</view>
					<view>{{startTime}}</view>
				</view>
				<view class="jp_cate">
					<view>结束时间</view>
					<view>{{endTime}}</view>
				</view>
			</div>
			<div style="height: 10upx;"></div>
			<div class="list_height"></div>

			<div class="bid_div">
				<div class="bid_describe">参拍流程</div>
				<img class="bid_liucheng_ing" mode="aspectFill" :src="jp_liucheng">
				<div style="height: 30upx;"></div>
				<div class="list_height"></div>
			</div>

			<!-- 分割线 -->
			<div class="yh-noun"></div>

			<div v-if='shop_list.shop_id' style='height: 228upx;'>
				<div class='store store1'>
					<div class='store1Div'>
						<!-- :class="{ bargainLogo:bargain }" -->
						<img :src='shop_list.shop_logo'>
						<div>{{shop_list.shop_name}}</div>
					</div>
					<div class="store_right">
						<div class='goStore store1Div' @tap='_goStore(shop_list.shop_id)'>进店逛逛</div>
					</div>

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
					<div class='store2Div'>
						<p>{{shop_list.collection_num}}</p>
						<div>关注人数</div>
					</div>
				</div>
			</div>

			<div class="yh-noun"></div>

			<div class="bid_div">
				<div class="bid_describe">拍品描述<br />
					<p style="font-size: 13px;">规格:{{order.attr}}</p>
				</div>
				<div class="bid_describe_content" v-if='order.content'>
					<!-- <wxParse :content="order.content"></wxParse> -->
					<rich-text class="richtext" :nodes="order.content"></rich-text>
				</div>
				<div class="bid_describe_content" v-else>
				</div>
			</div>
		</div>

		<!-- 尾部 -->
		<div class="bid_footer" v-if='have_jp&&!load'>
			<div class="bid_l">
				<div class="bid_footer_l">
					<div class="bid_auto">
						<div class="bid_word"><span>保证金</span></div>
						<div class="bid_prict"><span>¥{{order.promise}}</span></div>
					</div>
				</div>
				<div class="bid_footer_r">
					<div class="bid_auto">
						<div class="bid_word"><span>加价幅度</span></div>
						<div class="bid_prict"><span>¥{{order.price}}/次</span></div>
					</div>
				</div>
			</div>

			<!-- 1.从即将开拍点击进来  未开拍 -->
			<!-- 2.正在热拍点击进来  进入出价（即出押金） -->
			<!-- 3.我的竞拍点击进来  出价，已结束，待付款，已完成 -->
			<div class="detail_btn" style="background: #888888;" v-if="form_type==0||jp_status==0">
				<span>未开拍</span>
			</div>
			<div @tap="_state(1,order.current_price,order.add_price)" :class="(is_invalid || formMy_old == 1)?'detail_btn_gray':'detail_btn_hei'"
			 v-else-if="form_type==1||jp_status==1">
				<span>进入出价</span>
			</div>
		</div>

		<div class='empty_play' v-if='!have_jp&&!load'>
			<img :src="emptyImg" />
			<p>暂时还没有相关的竞拍产品哦</p>
			<p class='empty_p'>可以去看看有那些想买的</p>
			<div @tap="_toHome()">去商城逛逛</div>
		</div>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>

		<!-- 弹窗 -->
		<div class="bid_pup" v-if="bid_pup" @touchmove.stop.prevent="stopTap">
			<div class="bid_pup_flex">
				<div class="bid_pup_auto">
					<!-- <div class="bid_pup_title">{{(bind_st==0||bind_st==1)&&state==1?'支付保证金':'竞拍出价'}}</div> -->
					<div class="bid_pup_title">{{form_type==1?'支付保证金':'竞拍出价'}}</div>
					<!-- 支付保证金的 -->
					<div class="bid_pup_word" v-if="form_type==1">

						<div class="bid_pup_money">保证金
							<span class="yh-bid-pup-money1"></span>
							<span class="yh-bid-pup-money2">¥</span>
							<span class="yh-bid-pup-money3">{{order.promise}}</span>
						</div>

						<div class="bid_pup_xuan">请选择支付方式</div>
						<ul class="bid_li">

							<!-- #ifdef MP-BAIDU -->
							<li @tap="_li(4,order.promise)" v-if="payment.baidu_pay==1">
								<img :src="list_bd" class="bid_li_img1" />
								百度支付
								<img :src="list_hui" v-if="daidu_flag" class="bid_li_img2" />
								<img :src="list_xuan" v-if="!daidu_flag" class="bid_li_img2" />
							</li>
							<!-- #endif -->

							<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
							<li @tap="_li(1,order.promise)" v-if="open_wxpay==true">
								<img :src="list_wx" class="bid_li_img1" />
								微信支付
								<img :src="list_hui" v-if="wx_flag" class="bid_li_img2" />
								<img :src="list_xuan" v-if="!wx_flag" class="bid_li_img2" />
							</li>
							<!-- #endif -->

							<!-- #ifdef  APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
							<li @tap="_li(3,order.promise)" v-if="open_alipay==true">
								<img :src="list_zhifubao" class="bid_li_img1" />
								支付宝支付
								<img :src="list_hui" v-if="zfb_flag" class="bid_li_img2" />
								<img :src="list_xuan" v-if="!zfb_flag" class="bid_li_img2" />
							</li>
							<!-- #endif -->

							<li @tap="_li(2,order.promise)">
								<img :src="list_yue" class="bid_li_img1" />
								余额支付
								<img :src="list_hui" v-if="ye_flag" class="bid_li_img2" />
								<img :src="list_xuan" v-if="!ye_flag" class="bid_li_img2" />
							</li>

						</ul>
					</div>
					<!-- 出价的 -->
					<div class="bid_pup_word" v-else>
						<div class="bid_ju">
							<div class="bid_ju_d"></div>
							<input type="number" name="money" v-model="bid_value" style="color: #242424;">
						</div>
						<div class="bid_text">当前最低出价为{{money_s}}元</div>
					</div>
					<div class="bid_pup_btn">
						<div class="bid_pup_l" @tap="_cancel1()">取消</div>
						<div class="bid_pup_r" @tap="_click()">确定</div>
					</div>
				</div>
			</div>
		</div>

		<!--余额支付密码框-->
		<div class='payment_pass' v-if="pay_display">
			<div class='payment_c'>
				<p>请输入支付密码</p>
				<div class="xian_d">
					<input ref="pwd" :focus="focus" type='password' :maxlength="digits.length" v-model="msg" class="yh-xian-d-input" />
					<ul class="pwd-wrap" @tap="focust">
						<li v-for="(item,key) in digits" :key='key'>
							<span v-if="msgLength > key" class="spanm">
								<input class="masd" type="number" password="true" v-model="key" pattern="\d*" style="font-size: 18px;" />
							</span>
						</li>
					</ul>
				</div>
				<div class="payment_tt">
					<div class='cancel' @tap="_cancel">取消</div>
					<div class='confirm' @tap="_confirm">确认</div>
				</div>
			</div>
		</div>
		<!--没有设置支付密码提示框-->
		<div class='payment_pass' v-if="password_display">
			<div class='payment_c'>
				<div class='payment_ww'>无支付密码，前往设置！</div>
				<div class="payment_tt payment_boo" @tap="_password_status">
					去设置
				</div>
			</div>
		</div>

		<div class="mask" v-if="shareMask && saveEWM" @touchmove.stop.prevent>
			<div class="shareEwm" v-if="saveEWM">
				<img :src="ewmImg" class="imgEwm">
				<img :src="close" class="close" @tap="_closeAllMask">
				<view class="saveEWMBtn" @tap="_downEWM()">
					<img :src="saves" class="saves">
					保存图片
				</view>
			</div>
		</div>

		<div class="mask" v-if="shareMask && !saveEWM" @tap="_closeAllMask" @touchmove.stop.prevent>
			<div class='allCenter'>

				<!-- #ifdef MP-WEIXIN -->
				<div style="width: 72%;margin: 0 auto;" class="share_content">
					<div>
						<button class="share_btn" open-type="share">
							<img :src="wx_img" class="yh-share-content1" />
						</button>
						<p class="yh-share-content2">微信好友</p>
					</div>

					<div @tap="showSaveEWM('wx')">
						<div>
							<img :src="erm_img" alt="" class="yh-share-content1">
						</div>
						<span class="yh-share-content3">二维码分享</span>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
				<div @tap='_shareApp(2)'>
					<div>
						<img :src="wx_img" alt="" class="yh-share-content1">
					</div>
					<span class="yh-share-content3">微信好友</span>
				</div>

				<div @tap='_shareApp(1)'>
					<div>
						<img :src="erm_pyq_img" alt="" class="yh-share-content1">
					</div>
					<span class="yh-share-content3">微信朋友圈</span>
				</div>

				<div @tap="showSaveEWM('app')">
					<div>
						<img :src="erm_img" alt="" class="yh-share-content1">
					</div>
					<span class="yh-share-content3">二维码分享</span>
				</div>
				<!-- #endif -->

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
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import htmlParser from '../../common/html-parser.js'
	import {
		lkt_showShareMask,
		lkt_showSaveEWM,
		lkt_weixinPay,
		lkt_pay_wx,
		lkt_payFail,
		lkt_click,
		lkt_changeTimeStyle,
		lkt_dateformat,
	} from '../../static/js/bidding/bidding.js'

	var me = this;
	export default {
		data() {
			return {
				open_wxpay:false,
				open_alipay:false,
				payment:"",
				close: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close_bb.png',
				saves: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/save.png',
				fastTap: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				fx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx.png',
				wx_person: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png',
				erm_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/ewmIcon.png",
				list_wx: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wechat.png",
				list_bd: uni.getStorageSync("endurl") + "images/icon/baiduzhifu2x.png",
				list_yue: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jp_yue.png",
				list_zhifubao: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/zhifubaozhifu2x.png",
				list_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehui2x.png",
				list_xuan: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehei2x.png",
				list_time: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/naz.png",
				list_right: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jiantouhei2x.png",
				list_end: uni.getStorageSync("endurl") + "images/icon/end.png", //结束图
				jp_share: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jp_share.png",
				jp_liucheng: uni.getStorageSync("endurl") + "images/icon/jp_liucheng.png", //流程图
				jp_invalid: uni.getStorageSync("endurl") + "images/icon/jp_invalid.png", //失效图
				is_invalid: false, //fasle-未失效 true-已失效
				h5_content: '',
				code: '',
				myappid: '',
				head: true, //头部切换
				status_i: false,
				bid_pup: false,
				bid_money: false,
				wx_flag: false, //微信支付
				ye_flag: true, //余额支付
				zfb_flag: true, //支付宝支付
				daidu_flag: true, //百度支付
				load: true,
				access_id: '',
				order: '', //订单数据
				res_ove: "", //所有出价记录
				res_my: "", //我的出价记录
				bindding_id: "", //竞拍商品id
				head_ids: "", //判断从哪个跳过来的
				bind_st: "", //状态值，（0未开始，进行中，2待付款，3我的订单）
				bind_pro: "", //是否出过保障金（0为否，1为是）
				state: "",
				money: "", //余额
				passwd_status: "",
				digits: ['', '', '', '', '', ''], //input框位数控制,这里可以配置多少个“输入框”
				msg: '', //消息提示
				msgLength: 0,
				page: 0,
				bid_value: "",
				money_s: "", //最低出价
				pay_display: false, //支付密码框显示
				password_status: '', //判定是否已经设置支付密码
				password_display: false, //前往设置支付密码提示框
				focus: true,
				sNos: "",
				titles: "",
				totals: "",
				shareMask: false,
				saveEWM: false,
				shares: {},
				shareContent: '一起来用来客推吧！', //分享的内容
				shareHref: '', //分享的链接
				sharehrefTitle: '一起来用来客推吧1', //分享的链接的标题
				sharehrefDes: '一起来用来客推吧2', //分享的链接的描述
				pic: '',
				logo: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/lktlogo.png',
				startTime: '00月00日 00：00',
				endTime: '00月00日 00：00',
				shop_list: {},
				form_type: -1, //form_type(0-即将开拍，1-正在热拍，其他就是我的竞拍)
				from_mark: 0, //from_mark代表竞拍的mark状态值(从我的竞拍页面过来的)
				overtime: {
					day: 0,
					hour: 0,
					minute: 0,
					second: 0
				},
				stop3: '', //轮循定时器
				formMy_old: 0, //=1的时候，代表从我的竞拍页面进来的，并且结束时间也过去了
				bid_num: 0, //竞拍记录的条数
				threeRecords: [], //最新的三条竞拍记录
				ewmImg: '',
				erm_pyq_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fdc.png',
				wx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png',
				copy_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/copyIcon.png',
				cat: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/2019041632x.png',
				emptyImg: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548145298728.png',
				is_user: '', //是否登录[0-未登录，1-登录]
				//0:未开拍，1：正在热拍，2：已结束
				jp_status: '', //0:未开拍，1：正在热拍，2：已结束
				bid: '', //竞拍地址栏json参数---对象
				bid_str: '', //竞拍地址栏json参数---字符串
				clickFlag: false,
				isH5: 0, //1-表示在H5，-1表示不在H5
				isfx: '',
				have_jp: true, //是否查询到竞拍商品
				qd_flag: true, //支付的确认按钮只能按一次
			}
		},
		components: {
			wxParse,
		},
		onLoad(options) {
			console.log("options", options)

			let me = this;

			// #ifdef MP-WEIXIN
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
			})
			// #endif

			if (options.bid) {
				this.bid = JSON.parse(options.bid)
				this.isfx = this.bid.isfx
				this.form_type = this.bid.type
				this.from_mark = this.bid.type
				this.bindding_id = this.bid.bindding_id
			} else {
				this.isfx = options.isfx
				this.form_type = options.type
				this.from_mark = options.mark
				this.bindding_id = this.$store.state.bindding_num
			}
			this.bindding_num(this.bindding_id)
			this.bind_st = this.$store.state.bind_status
			this.bind_pro = this.$store.state.bind_promise
			this.head_ids = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

			// this._axios();
			//获取通道

			uni.getProvider({
				service: "payment",
				success: (e) => {
					this.providerList = e.provider.map((value) => {
						switch (value) {
							case 'alipay':
								return {
									name: '支付宝',
									id: value,
									loading: false
								}
							case 'wxpay':
								return {
									name: '微信',
									id: value,
									loading: false
								}
						}
					})
				},
				fail: (e) => {
					console.log("获取登录通道失败：", e);
				}
			})

		},
		onUnload() {
			clearTimeout(this.stop3)
			clearTimeout(this.stop)
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
		watch: {
			msg(curVal) {
				this.msgLength = curVal.length;
				console.log(this.msg)
			},
			'page': {
				handler: function(newValue, oldValue) {
					if (oldValue == 0 && newValue == 1) {
						//第一次进入页面，自动获得焦点，这里可优化。
						this.timer = setTimeout(() => {}, 500);
					}
				},
				deep: true
			},
			coupon_name: function() {
				this.changeValue()
			},
			value: function(newValue, oldValue) {
				this.changeValue()
			},
			price1: function(newValue, oldValue) {
				var me = this
				this.$nextTick(function() {
					me.price1 = me.products_total + me.freight - me.coupon_name - me.reduce_money - me.value
					me.price1 = Number(me.price1).toFixed(2)
					console.log(me.price1)
				})
			},
		},
		onShow() {
			this.qd_flag = true
			if (!this.bindding_id) { //若option中不存在bidding_id
				this.bindding_id = this.$store.state.bindding_num
			}

			// #ifdef H5
			var storage = window.localStorage;
			if (storage['bargain']) {
				this.cpId = storage['product']
			}
			// #endif

			this.bind_st = this.$store.state.bind_status
			this.bind_pro = this.$store.state.bind_promise
			this.head_ids = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this.bid.isfx = true
			this.bid_str = JSON.stringify(this.bid)
			this.shareHref = uni.getStorageSync("h5_url") + 'pagesA/bidding/bidding_detailed?bid=' + encodeURIComponent(this.bid_str)
			//改路劲未经过浏览器，手动转码第一个参数之后的参数
			// window.history.pushState('state', document.title, this.shareHref);

			// #ifdef H5
			var a = window.location.href;
			if (a.split('?').length > 1) {
				var str = a.split('?')[1]
				var arr = str.split('&')
				for (var i in arr) {
					if (typeof(arr[i]) == "String" || typeof(arr[i]) == "string") {
						if (arr[i].substring(0, 4) == 'code') {
							str = arr[i].substring(5)
							this.code = str
						}
					}
				}
			}

			if (this.code == '') {
				storage.removeItem("bargain")
				storage.removeItem("bargain_id")
				storage.removeItem("order_no")
				storage.removeItem("product")
				console.log('要走入跳转')
				this.toUrl();

			}
			// #endif
			this._axios()
		},
		/**
		 * 转发
		 * */
		onShareAppMessage: function(res) {
			if (res.from === 'button') {

			}
			console.log('title是', this.order.title)
			return {
				title: this.order.title,
				path: '/pagesA/bidding/bidding_detailed?bid=' + this.bid_str,
				imageUrl: this.order.imgurl,
				bgImgUrl: this.order.imgurl,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		methods: {
			/**
			 *
			 * */
			_cancel1() {
				this.bid_pup = false
				this.qd_flag = true
			},
			/**
			 *
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
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
			_goStore(shop_id) {
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id=' + shop_id
				})
			},
			/**
			 *
			 * */
			_goRule() {
				uni.navigateTo({
					url: '../bidding/bidding_rule'
				})
			},
			/**
			 *
			 * */
			_closeAllMask() {
				this.shareMask = false
				this.saveEWM = false
			},
			/**
			 *
			 * */
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
			/**
			 *
			 * */
			_shareApp(type) {
				var me = this
				var scene = ''

				console.log("me.ewmImg=" + me.ewmImg)
				if (type == 1) {
					//App分享到 微信朋友圈
					scene = 'WXSenceTimeline'
				} else if (type == 2) {
					//App分享到 微信好友
					scene = 'WXSceneSession'
				}
				uni.share({
					title: this.order.title,
					summary: me.shareContent,
					provider: "weixin",
					scene,
					type: 0,
					href: this.shareHref,
					imageUrl: this.order.imgurl,
					success: function(res) {
						me.saveEWM = false
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			/**
			 *
			 * */
			saveImg() {
				var me = this
				uni.saveImageToPhotosAlbum({
					filePath: me.ewmImg,
					success: function() {
						uni.showToast({
							title: "保存图片成功",
							duration: 1500,
							icon: 'none'
						})
					}
				});
			},
			/**
			 *
			 * */
			showShareMask() {
				var me = this;
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					lkt_showShareMask(me)
				});
			},
			/**
			 *
			 * */
			closeShareMask() {
				this.shareMask = false
			},
			/**
			 *
			 * */
			showSaveEWM(string) {
				lkt_showSaveEWM(string, this)
			},
			/**
			 * 复制链接
			 * */
			copyUrl() {
				var me = this
				var a = getCurrentPages()
				uni.setClipboardData({
					data: me.shareHref,
					success: function() {
						// me.$store.state.isMe = true
						uni.showToast({
							title: '复制成功',
							duration: 1500,
							icon: 'none'
						})
					}
				});
			},
			/**
			 * 设置密码跳转
			 * */
			_password_status() {
				uni.navigateTo({
					url: '../../pages/setUp/payment'
				});
				this.password_display = false
			},
			/**
			 *
			 * */
			focust() {
				this.focus = true
			},
			/**
			 * 支付密码框取消
			 * */
			_cancel() {
				var me = this
				me.pay_display = false
				this.qd_flag = true
				me.msg = ""
			},
			/**
			 * 判断支付是否显示
			 * type 1.微信 2.支付宝
			 * */
			isshow:function(){
				var me = this
				// #ifdef H5
				if(me.payment.jsapi_wechat == 1){
					me.open_wxpay = true;
				}
				// #endif
				// #ifdef MP-WEIXIN
				if(me.payment.mini_wechat == 1){
					me.open_wxpay = true;
				}
				// #endif
				// #ifdef APP-PLUS
				if(me.payment.app_wechat == 1){
					me.open_wxpay = true;
				}
				if(me.payment.alipay == 1){
					me.open_alipay = true;
				}
				// #endif
				// #ifdef MP-ALIPAY
				if(me.payment.alipay_minipay == 1){
					me.open_alipay = true;
				}
				// #endif
				// #ifdef MP-TOUTIAO
				if(me.payment.tt_alipay == 1){
					me.open_alipay = true;
				}
				// #endif
			},
			/**
			 * 余额支付密码框确认
			 * */
			_confirm() {
				var me = this
				if (me.wx_flag == true && me.ye_flag == false) {
					me.type = "wallet_pay"
				} else {
					me.type = "wx"
				}
				if (this.msg.length == 6) {
					var data = {
						module: "app",
						action: "auction",
						m: "go_pay",
						password: this.msg,
						id: this.bindding_id,
						access_id: this.access_id,
						type: me.type
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							console.log("余额支付确认", res)
							if (res.data.info == "上交押金成功！") {

								if (res.data.status == 2) {
									uni.showToast({
										title: '上交押金成功！',
										duration: 1000,
										icon: 'none'
									})
									me.pay_display = false
									uni.redirectTo({
										url: './bidding_detailed_Two?mark=1&detail_one=1',

									})
									return false
								} else if (res.data.status == 1) {
									console.log("这个是微信支付")
								}
							} else if (res.data.err == "支付密码错误！") {
								me.msg = '';
								uni.showToast({
									title: '您输入密码错误,请重新输入',
									duration: 1000,
									icon: 'none'
								})
								me.fastTap = true
							}
						},
						error: function(err) {
							console.log(err)
						}
					})
				} else {
					uni.showToast({
						title: '请输入完整密码！',
						duration: 1000,
						icon: 'none'
					})
				}
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
				if (this.isfx == true) { //为布尔值

					uni.switchTab({
						url: '../../pages/tabBar/home'
					})
				} else {
					uni.redirectTo({
						url: '../../pagesA/bidding/bidding'
					})
				}
			},
			/**
			 * 登录后返回页面处理
			 * */
			_back1() {
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
			/**
			 *
			 * */
			toUrl() {
				console.log('走入了跳转')
				var me = this
				var locationUrl = window.location.href
				var data = {
					type: 'jsapi_wechat',
					access_id: this.access_id,
					app: 'get_config',
					module: "app",
					action: "commcenter",
					url: locationUrl
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						if (res.data.code == 200) {
							var myappid = res.data.data.config.appid
							this.myappid = myappid
							var myUrl = res.data.data.url
							var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myappid +
								"&redirect_uri=" + myUrl +
								"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
							window.location.href = url
						} else {
							// uni.showToast({
							// 	title: res.data.message,
							// 	duration: 1500,
							// 	icon: 'none'
							// })
						}
					},
					error: function(err) {
						console.log(err)
					},
				})
			},
			/**
			 * 弹窗
			 * */
			_state(state, num, num1) {

				var me = this
				//活动失效判断
				if (me.is_invalid) {
					return false
				}

				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					if (me.is_user == 1) {
						//从正在热拍进来的-去出押金
						if (state == 1) {
							var promise = parseFloat(num)
							var money = parseFloat(num1)
							me.money_s = promise + money
							me.bid_pup = true
						}
						//从我的热拍进来的-from_mark（1-继续竞拍 2-已结束，不是得主  3.已结束，是得主未付款 4.已结束，是得主已付款）
						else {
							//继续出价
							if (me.from_mark == 1) {
								var promise = parseFloat(num)
								var money = parseFloat(num1)
								me.money_s = promise + money
								me.bid_pup = true
							}
						}
					}
				});
			},

			/**
			 * 支付方式选择
			 * */
			_li(index, promise) {
				var me = this
				var promise = parseFloat(promise)
				var money = parseFloat(me.money)
				console.log(index, promise, money)
				if (index == 1) {
					me.wx_flag = false
					me.ye_flag = true
					me.zfb_flag = true
					me.daidu_flag = true
				} else if (index == 2) {
					if (promise > money) {
						me.wx_flag = false
						me.ye_flag = true
						me.zfb_flag = true
						me.daidu_flag = true
						uni.showToast({
							title: "余额不足，请充值",
							duration: 1000,
							icon: 'none'
						})
					} else {
						me.wx_flag = true
						me.ye_flag = false
						me.zfb_flag = true
						me.daidu_flag = true
					}
				} else if (index == 3) {
					me.wx_flag = true
					me.ye_flag = true
					me.zfb_flag = false
					me.daidu_flag = true
				} else {
					me.wx_flag = true
					me.ye_flag = true
					me.zfb_flag = true
					me.daidu_flag = false
				}
			},
			/**
			 * 获取支付时订单详情
			 * */
			getOrderInfo(type) {
				var me = this
				const appid = "wxf6e29bcc719cf499"
				let data = {
					access_id: this.access_id,
					order_list: me.order_list,
					title: '',
					module: 'app',
					action: 'pay',
					sNo: me.sNos,
					title: me.titles,
					type: type,
					total: me.totals

				}

				// #ifdef H5
				if (type == 'wx') {
					data.type = 'jsapi_wechat'
					data.code = this.code
				} else if (type == 'ali') {
					data.type = 'alipay_mobile'
				}
				// #endif

				// #ifndef H5
				if (type == 'wx') {
					data.type = 'app_wechat'
				} else if (type == 'ali') {
					data.type = 'alipay'
					// #ifdef MP-ALIPAY
					data.type = 'alipay_minipay';
					data.store_type = 1;
					// #endif
					//#ifdef MP-TOUTIAO
					data.type = 'tt_alipay'
					data.store_type = 1
					// #endif
				} else if (type == 'baidu') {
					// #ifdef MP-BAIDU
					data.type = 'baidu_pay'
					data.store_type = 1
					// #endif
				}
				// #endif
				let p = me.LaiKeTuiCommon.getMPAliAuthCode();
				return p.then((authcode) => {
					if (authcode) {
						// #ifdef MP-ALIPAY
						data.alimp_authcode = authcode;
						// #endif
						// #ifdef MP-TOUTIAO
						data.tt_authcode = authcode;
						// #endif
					}
					return new Promise((res) => {
						uni.request({
							url: uni.getStorageSync("url"),
							data,
							success: (result) => {
								if (result.statusCode == 200) {
									// #ifndef MP-ALIPAY
									res(result);
									// #endif

									// #ifdef MP-ALIPAY
									let tno = result.data;
									res(tno.substr(1, tno.length));
									// #endif
									if (type == 'ali') {
										//支付宝支付
										this.h5_content = result.data;
									}
								} else if (result.data.code != undefined && result.data.code != 200) {
									uni.showToast({
										title: result.data.message,
										duration: 1500,
										icon: 'none'
									});
								}
							},
							fail: (e) => {
								// #ifndef MP-ALIPAY
								res(e);
								// #endif

								// #ifdef MP-ALIPAY
								let tno = e.data;
								res(tno.substr((tno.indexOf("s") + 1), (tno.length - 4)));
								// #endif
							}
						})
					})
				})
			},
			/**
			 * 微信支付（单独处理小程序微信支付）
			 * */
			weixinPay() {
				lkt_weixinPay(this)
			},
			/**
			 * 微信支付和支付宝支付（非小程序）
			 * */
			async pay_wx(type) {
				lkt_pay_wx(type, this)
			},
			/**
			 * 支付失败提示处理
			 * */
			_payFail() {
				lkt_payFail(this)
			},
			/**
			 * 选择支付确定
			 * */
			_click() {
				if (this.qd_flag) {
					this.qd_flag = false
					lkt_click(this)
				}
			},
			/**
			 *
			 * */
			_bid_record() {
				uni.navigateTo({
					url: 'bidding_record',
				})
			},
			/**
			 * 获取数据
			 * */
			_axios() {
				var me = this
				var data = {
					module: "app",
					action: "auction",
					id: this.bindding_id,
					access_id: this.access_id,
					isfx: this.isfx
				}

				// 即将开拍和正在热拍的,只要请求detail
				if (this.form_type == 1 || this.form_type == 0) { //0--即将开拍  1--正在热拍
					data.m = 'detail'
				} else { //从我的竞拍过来的
					//mark=1:detail;mark=1:end_detail;
					if (this.from_mark == 1) {
						data.m = 'detail'
					}
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						if (res.data.code == 109) { //未查询到改竞拍商品
							me.have_jp = false
							me.load = false
						} else { //查询到改竞拍商品
							//0:未开拍，1：正在热拍，2：已结束

							if (res.data.res) {
								me.jp_status = res.data.res[0].status
								me.is_user = res.data.is_user
							} else {
								return false
							}


							if (me.isfx && (res.data.res[0].is_show != 1 || res.data.res[0].recycle == 1)) { //已失效活动
								me.load = false
								me.is_invalid = true
							} else { //未失效活动
								if (me.form_type == 0 && me.jp_status == 1) {
									me.bid.type = 1;
									me.bid_str = JSON.stringify(me.bid)
									uni.redirectTo({
										url: 'bidding_detailed?bid=' + me.bid_str,
									})
								} else if (me.jp_status == 2 || me.jp_status == 3) {
									//mark！=1 就可以走end——detail接口 再又接口更新竞拍商品状态
									setTimeout(function() {
										if (me.isfx) {
											uni.redirectTo({
												url: './bidding_detailed_Two?mark=2&isfx=' + me.isfx,
											})
										} else {
											uni.redirectTo({
												url: './bidding_detailed_Two?mark=2',
											})
										}
									}, 1000)
									return false
								} else {
									me.load = false

									if (res.data.is_promise == 1) {
										// #ifdef H5
										if (me.code) {
											uni.showToast({
												title: '即将为您跳转出价页面',
												duration: 1500,
												icon: 'none'
											})
											console.log('记录刷新判断isfx')
											console.log(me.isfx)
											setTimeout(function() {
												//判断是否为分享的页面跳转
												if (me.isfx) {
													uni.redirectTo({
														url: './bidding_detailed_Two?mark=1&detail_one=1&isfx=' + me.isfx,
													})
												} else {
													uni.redirectTo({
														url: './bidding_detailed_Two?mark=1&detail_one=1',
													})
												}
											}, 2000)
										}
										// #endif
										// #ifndef H5
										uni.showToast({
											title: '即将为您跳转出价页面',
											duration: 1500,
											icon: 'none'
										})
										console.log('记录刷新判断isfx')
										console.log(me.isfx)
										setTimeout(function() {
											//判断是否为分享的页面跳转
											if (me.isfx) {
												uni.redirectTo({
													url: './bidding_detailed_Two?mark=1&detail_one=1&isfx=' + me.isfx,
												})
											} else {
												uni.redirectTo({
													url: './bidding_detailed_Two?mark=1&detail_one=1',
												})
											}
										}, 2000)
										// #endif
									}
								}
							}

							var content = res.data.res[0].content.replace(/src/g,"style='width:100%!important;height: auto!important;' src").replace(/table/g,`table style="width:100%!important;"`)

							res.data.res[0].content = htmlParser(content)
							me.order = res.data.res[0]

							me.shop_list = res.data.shop_list
							me.changeTimeStyle()
							me.state = res.data.type
							me.money = res.data.money
							me.bid_num = res.data.bid_num
							me.payment = res.data.payment
							me.passwd_status = res.data.password_status
							me.res_ove = res.data.res_all
							me.res_my = res.data.res_my
							console.log('order---------------------axios1')
							console.log(me.order)

							if (res.data.res_bid.length > 0) {
								for (var i in res.data.res_bid) {
									if (i == 0) {
										res.data.res_bid[i].grade = '领先'
									} else {
										res.data.res_bid[i].grade = '出局'
									}
								}
							}
							me.threeRecords = res.data.res_bid
							//不改变时间格式
							me.startTime = res.data.res[0].starttime
							me.startTime = me.startTime.substring(0, 10)
							me.endTime = res.data.res[0].endtime
							me.endTime = me.endTime.substring(0, 10)
							var start_second = res.data.res[0].start_second //据开始的秒数
							var end_second = res.data.res[0].end_second //据结束的秒数

							//即将开拍
							if (me.form_type == 0) {
								//距离开始时间
								me.countDown(start_second)
							} else {
								me.loop()
								//距离结束时间
								me.countDown(end_second)
							}

						}

						me.isshow();

					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			/**
			 * 转换开始,结束时间的格式
			 * */
			changeTimeStyle() {
				lkt_changeTimeStyle(this)
			},
			/**
			 * 倒计时
			 * */
			countDown(endtime) {
				var that = this
				//主要是考虑从我的竞拍过来的（结束时间也已经过去了）
				that.dateformat(endtime)
				clearTimeout(that.stop)
				that.stop = setTimeout(function() {
					if (endtime > 0) {
						endtime--
						that.countDown(endtime);
					} else {
						if (that.from_mark == 1) {
							that.time_end = 1
							that.form_type = 2
							that.from_mark = 2
						}
						that.formMy_old = 1
						that.overtime.day = 0
						that.overtime.hour = 0
						that.overtime.minute = 0
						that.overtime.second = 0
						//主动去开启竞拍
						that.biddingStart(function(){
							clearTimeout(that.stop);
						});
					}
				}, 1000)
			},
			biddingStart(callback){
				let me = this;				
				let data = {
					module:	'app',
					action:	'auction',
					id: me.bindding_id,
					access_id: me.access_id,
					m: 'startAution'
				};
				me.$req.post({
					data
				}).then(res => {
					
					if(res.code == 200){
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1500
						})
						me._axios();
					}
					
					if(callback && typeof(callback) == 'function'){
						callback();
					}
				});
			},
			/**
			 * 轮循
			 * */
			loop() {
				var that = this
				if (that.form_type == 1) {
					var data = {
						module: "app",
						action: "auction",
						id: that.bindding_id,
						access_id: that.access_id,
						isfx: that.isfx,
						m: 'timeRequest'
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
								console.log(res.data.code)
								that.bid_num = res.data.bid_num
								// that.order.current_price = Number(res.data.max_price).toFixed(2)
								// that.order.pepole = res.data.pepole

								if (res.data.res_bid) {
									for (var i in res.data.res_bid) {
										if (i == 0) {
											res.data.res_bid[i].grade = '领先'
										} else {
											res.data.res_bid[i].grade = '出局'
										}
									}
								}
								that.res_bid = res.data.res_bid
								that.threeRecords = that.res_bid

							}
						},
						error: function(err) {
							console.log(err)
						}
					})
				}

				clearTimeout(that.stop3)
				that.stop3 = setTimeout(function() {

					if (that.form_type == 1) {
						that.loop()
					} else {
						clearTimeout(that.stop3)
					}
				}, 5000);


			},
			/**
			 * 时间格式化输出，如11:03 25:19 每1s都会调用一次
			 * */
			dateformat(micro_second) {
				this.overtime = lkt_dateformat(micro_second, this)
			},
			/**
			 * 登录超时的timeout
			 * */
			timeout() {
				uni.showToast({
					title: '未登录，请先登录!',
					icon: 'none',
					duration: 1500
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1',
					})
				}, 1500)
			},
			/**
			 * 阻止冒泡，阻止弹窗出现后还能上下移动页面
			 * */
			stopTap() {

			},
			...mapMutations({
				bind_promise: "SET_BIND_PPOMISE",
				pay_lx: "SET_PAY_LX",
				bindding_num: "SET_BINDDING_NUM",
			})
		},
	}
</script>

<style scoped>
	@import url("../../static/css/bidding/bidding_detailed.css");
</style>
