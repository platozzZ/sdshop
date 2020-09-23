<template>
	<div class="yh-bidding">

		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>

		<!-- #ifndef MP -->
		<div class="yh-ifndefMP" :style="{top:halfWidth}">
			<div class='position_head' :style="{top:halfWidth}">
				<div class='head' v-if='head'>
					<img class='head_img' :src="back1" @tap="_back()" />
					<p class="yh-head-p">竞拍详情</p>
					<!-- <img class='head_search' /> -->
					<p class="yh-goRule-s" @tap='_goRule()'>竞拍规则</p>
				</div>
			</div>
		</div>
		<div class="yh-ifndefMP-on"></div>
		<!-- #endif -->

		<!-- #ifdef MP -->
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
			<!-- mark（1-继续竞拍 2-已结束，不是得主  3.已结束，是得主未付款 4.已结束，是得主已付款） -->
			<div class="swiper_end" v-if="from_mark!=1 && (!is_invalid)">
				<img :src="list_end" />
			</div>
			<div class="swiper_end" v-if="is_invalid">
				<img :src="is_invalid" />
			</div>

			<!-- <div class="gd_header">
				<img :src="fx_img" class="gd_share"  @tap="showShareMask"/>
			</div> -->
		</div>

		<!-- 内容 -->
		<div class="bid_content" v-if='have_jp&&!load'>
			<div class="bid_t">
				<img :src="list_time" />{{form_type==0?'未开拍': form_type==1?'正在进行中':(from_mark==1?'正在进行中':(from_mark==2?'已结束':(from_mark==3?'待付款':(from_mark==4?'已完成':""))))}}
				<!-- <span class="bid_time" v-if="bind_st==1">距结束<span>00</span>时<span>10</span>分<span>36</span>秒</span> -->
				<div class="bid_time" v-if="from_mark!=0 && from_mark != 1">
					<span>已结束</span>
				</div>

				<div class="bid_time" v-else>
					<!-- form_type=0即将开拍 -->
					<span v-if="from_mark==0">距开始</span>
					<span v-else>距结束</span>

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
					<button id="copyy" :data-clipboard-text='shareHref' v-if="from_mark == 0 || from_mark == 1" open-type="share"  class="yh-copyy">
						<div class="bid_right">
							<img :src="jp_share">
							<div>分享</div>
						</div>
					</button>
					<!-- #endif -->

					<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
					<div class="bid_right" @tap="showShareMask" id="copyy" :data-clipboard-text='shareHref' v-if="from_mark == 0 || from_mark == 1">
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

			<div class="bid_div">
				<div class="bid_dynamic">竞拍动态</div>
				<div class="list_height"></div>
			</div>
			<div class="bid_div" v-if="(from_mark==2||from_mark==4||from_mark==3)&&threeRecords.length">
				<div class="list_height"></div>
				<div class="bid_dynamic">恭喜用户{{host_user}}以¥{{order.current_price}}的价格拍得本商品</div>
				<div class="list_height"></div>
			</div>
			<div class="bid_div" v-else-if="from_mark==5">
				<div class="list_height"></div>
				<div class="bid_dynamic">本次活动已流拍，感谢您的参与</div>
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


			<div @tap="_state(2,order.current_price,order.add_price)" :class="(from_mark==1 && time_end != 1)?'detail_btn_hei':'detail_btn_gray'">
				<span v-if="from_mark==1 && canbidding==0">出价</span>
				<span v-else-if="from_mark==2||from_mark==3||from_mark==4||from_mark==5||time_end==1">出价</span>
				<span v-else>{{canbidding}}s后继续竞拍</span>
			</div>
			<!-- form_type(0-即将开拍，1-正在热拍，其他就是我的竞拍) -->
			<!-- from_mark（1-继续竞拍 2-已结束，不是得主  3.已结束，是得主未付款 4.已结束，是得主已付款） -->
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

		<!-- 提示去付款的弹框 -->

		<div class="bid_pup" v-if="showEndFlag">
			<div class="bid_pup_flex">
				<div class="bid_pup_auto">
					<div class="end_tishi">提示</div>
					<div class="end_content">
						<div>本次竞拍结束！</div>
						<div>尊敬的会员，你已经竞拍到了该商品请前去付款</div>
					</div>
					<div @tap="closeEndFlag('leave')" class="end_btn yh-end-btn1">取消</div>
					<div @tap="closeEndFlag('go')" class="end_btn yh-end-btn2">确定</div>
				</div>
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
						<div class="bid_pup_money">保证金¥{{order.promise}}</div>
						<div class="bid_pup_xuan">请选择支付方式</div>
						<ul class="bid_li">
							<li @tap="_li(1,order.promise)">
								<img :src="list_wx" class="bid_li_img1" />
								微信支付
								<img :src="list_hui" v-if="wx_flag" class="bid_li_img2" />
								<img :src="list_xuan" v-if="!wx_flag" class="bid_li_img2" />
							</li>
							<li @tap="_li(2,order.promise)">
								<img :src="list_zfb" class="bid_li_img1" />
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
						<div class="bid_text">出价不得低于{{low_price}}元</div>
					</div>
					<div class="bid_pup_btn">
						<div class="bid_pup_l" @tap="bid_pup=false">取消</div>
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
							<span v-if="msgLength > key" class="spanm"><input class="masd" type="number" v-model="key" pattern="\d*" /></span>
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

		<div class="mask" v-if="shareMask && saveEWM">
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
				<div class="share_content yh-share-content">

					<div>
						<button class="share_btn" open-type="share">
							<img :src="wx_img" class="yh-share-content-img" />
						</button>
						<p class="yh-share-content-p">微信好友</p>
					</div>

					<div @tap="showSaveEWM('wx')">
						<div>
							<img :src="erm_img" alt="" class="yh-share-content-imgs">
						</div>
						<span class="yh-share-content-span">二维码分享</span>
					</div>

					<div class="clearfix"></div>
				</div>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
				<div @tap='_shareApp(2)'>
					<div>
						<img :src="wx_img" alt="" class="yh-share-content-imgs">
					</div>
					<span class="yh-share-content-span">微信好友</span>
				</div>

				<div @tap='_shareApp(1)'>
					<div>
						<img :src="erm_pyq_img" alt="" class="yh-share-content-imgs">
					</div>
					<span class="yh-share-content-span">微信朋友圈</span>
				</div>

				<div @tap="showSaveEWM('app')">
					<div>
						<img :src="erm_img" alt="" class="yh-share-content-imgs">
					</div>
					<span class="yh-share-content-span">二维码分享</span>
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
		lkt_changeTimeStyle,
		lkt_dateformat,

	} from '../../static/js/bidding/bidding.js'
	export default {
		data() {
			return {
				close: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close_bb.png',
				saves: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/save.png',
				fastTap: true,
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/5-121204193R7.gif',
				emptyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/empyimg92x.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				fx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fx.png',
				wx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png',
				wx_person: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png',
				erm_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/ewmIcon.png",
				list_wx: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/wechat.png",
				list_zfb: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jp_yue.png",
				list_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehui2x.png",
				list_xuan: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehei2x.png",
				list_time: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/naz.png",
				list_right: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jiantouhei2x.png",
				list_end: uni.getStorageSync("endurl") + "images/icon/bidding_finish.png",
				jp_share: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jp_share.png",
				jp_liucheng: uni.getStorageSync("endurl") + "images/icon/jp_liucheng.png",
				jp_invalid: uni.getStorageSync("endurl") + "images/icon/jp_invalid.png", //失效图
				erm_pyq_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/fdc.png',
				copy_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/copyIcon.png',
				cat: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/2019041632x.png',
				logo: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/lktlogo.png',
				stop: '', //倒计时定时器
				stop2: '', //出价倒计时定时器
				stop3: '', //轮循定时器
				is_invalid: false, //fasle-未失效 true-已失效
				head: true, //头部切换
				status_i: false,
				bid_pup: false,
				bid_money: false,
				wx_flag: false,
				ye_flag: true,
				load: true,
				access_id: '',
				order: '', //订单数据
				res_ove: "", //所有出价记录
				res_ove2: "",
				res_my: "", //我的出价记录
				bindding_id: "", //订单id
				head_ids: "", //判断从哪个跳过来的
				bind_st: "", //状态值，（0未开始，进行中，2待付款，3我的订单）
				bind_pro: "", //是否出过保障金（0为否，1为是）
				state: "",
				money: "", //余额
				passwd_status: "",
				digits: ['', '', '', '', '', ''], //input框位数控制,这里可以配置多少个“输入框”
				msg: '',
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
				ewmImg: '',
				startTime: '00月00日',
				endTime: '00月00日',
				shop_list: {},
				form_type: -1, //1:从即将开拍和正在热拍的页面跳转过来的
				from_mark: 0, //from_mark代表竞拍的mark状态值(从我的竞拍页面过来的)
				overtime: {
					day: 0,
					hour: 0,
					minute: 0,
					second: 0
				},
				canbidding: 0,
				formMy_old: 0, //=1的时候，代表从我的竞拍页面进来的，并且结束时间也过去了
				bid_num: 0, //竞拍记录的条数
				low_pepole: 0, //最低竞拍人数
				pepole: 0, //目前已有的人数
				threeRecords: [], //最新的三条竞拍记录
				host_user: '', //得主的姓名或者号码
				from_detail_one: -1, //判断从哪个页面跳转过来的？1：交押金页面过来的，其他：从我的竞拍页面过来的
				showEndFlag: false, //是否显示本次竞拍结束的弹框？false:不显示；true:显示
				is_user: '', //是否登录[0-未登录，1-登录]
				clickFlag: false,
				isfx: '', //是否为分享过来的页面
				bid_str: '', //竞拍地址栏json参数---字符串
				have_jp: true, //是否查询到竞拍商品
				from_my: '', //是否从我的竞拍进入 1-是
				time_end: '', //时间上是否已结束 1-是
				low_price: '', //最低出价
			}
		},
		components: {
			wxParse,
		},
		onLoad(options) {
			this.isfx = options.isfx
			this.form_type = options.type
			this.from_mark = options.mark
			this.from_detail_one = options.detail_one
			this.from_my = options.from_my
			this.bindding_id = this.$store.state.bindding_num
			this.bind_st = this.$store.state.bind_status
			this.bind_pro = this.$store.state.bind_promise
			this.head_ids = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			// clearTimeout(this.stop2)
			this.canbidding = 0
			// clearTimeout(this.stop)
			// this._axios()
		},
		onUnload() {
			clearTimeout(this.stop2)
			clearTimeout(this.stop)
			clearTimeout(this.stop3)
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
			},
			'page': {
				handler: function(newValue, oldValue) {
					if (oldValue == 0 && newValue == 1) {
						// 第一次进入页面，自动获得焦点，这里可优化。
						this.timer = setTimeout(() => {}, 500);
					}
				},
				deep: true
			},
			coupon_name: function() {
				this.changeValue()
			},
			canbidding: function(newValue, oldValue) {
				if (newValue <= 0) {
					clearTimeout(this.stop2)
					this.canbidding = 0
					this.stop2 = ''
				}
			},
			value: function(newValue, oldValue) {
				this.changeValue()
			},
			price1: function(newValue, oldValue) {
				var me = this
				this.$nextTick(function() {
					me.price1 = me.products_total + me.freight - me.coupon_name - me.reduce_money - me.value
					me.price1 = Number(me.price1).toFixed(2)
				})
			},
		},
		onShow() {
			this.bindding_id = this.$store.state.bindding_num
			this.bind_st = this.$store.state.bind_status
			this.bind_pro = this.$store.state.bind_promise
			this.head_ids = this.$store.state.head_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			var bid = new Object()
			bid.bindding_id = this.bindding_id
			bid.type = 1
			bid.isfx = true
			this.bid_str = JSON.stringify(bid)
			this.shareHref = uni.getStorageSync("h5_url") + 'pagesA/bidding/bidding_detailed?bid=' + encodeURIComponent(this.bid_str)

			// window.history.pushState('state', 'document.title','pagesA/bidding/bidding_detailed?biddingId=' + this.bindding_id+'&type=1&isfx=true');静态设置分享路径不刷新页面

			clearTimeout(this.stop2)
			clearTimeout(this.stop)
			this.canbidding = 0
			this._axios();

		},
		/**
		 * 转发
		 * */
		onShareAppMessage: function(res) {
			if (res.from === 'button') {}

			return {
				title: this.order.title,
				path: '/pagesA/bidding/bidding_detailed?biddingId=' + this.bindding_id + '&type=1',
				imageUrl: this.order.imgurl,
				bgImgUrl: this.order.imgurl,
				success: function(res) {}
			}
		},
		methods: {
			...mapMutations({
				bind_promise: "SET_BIND_PPOMISE",
				pay_lx: "SET_PAY_LX",
			}),
			/**
			 * 加载数据
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

				//从交押金页面过来的
				if (this.from_detail_one == 1) {
					data.m = 'detail'
				}
				//非交押金页面过来
				else {
					//mark=1:detail;mark=1:end_detail;
					if (this.from_mark == 1) {
						data.m = 'detail'
					} else {
						data.m = 'end_detail'
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
						if (res.data.code == 109) {
							me.have_jp = false
						}
						me.load = false
						if (me.isfx && res.data.res[0]) {
							me.from_mark = res.data.res[0].mark
							if (res.data.res[0].is_show != 1 || res.data.res[0].recycle == 1) {
								me.is_invalid = true
							}
						}
						if (me.from_mark == 3) { //提示去付款
							me.showEndFlag = true
						}
						if (res.data.res[0]) {
							var content = res.data.res[0].content.replace(/src/g,"style='width:100%!important;height: auto!important;' src").replace(/table/g,`table style="width:100%!important;"`)

							res.data.res[0].content = htmlParser(content)
							me.order = res.data.res[0]
						}
						me.shop_list = res.data.shop_list
						me.changeTimeStyle()
						me.state = res.data.type
						me.money = res.data.money
						me.host_user = res.data.host_user
						me.bid_num = res.data.bid_num
						me.low_price = Number(Number(me.order.current_price) + Number(me.order.add_price)).toFixed(2)
						me.passwd_status = res.data.password_status
						me.res_ove2 = me.res_ove = res.data.res_bid
						me.res_my = res.data.res_my

						me.low_pepole = res.data.res[0].low_pepole
						me.pepole = res.data.res[0].pepole

						var canbidding = res.data.res[0].wait_time
						if (canbidding && canbidding != 0) {
							// canbidding = new Date(res.data.res[0].wait_time.replace(/-/g, '/')).getTime();
							me.countDownn(canbidding)
						}
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
						me.is_user = res.data.is_user
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
							//距离结束时间
							me.countDown(end_second)
						}
						//竞拍中-轮循
						if (me.from_mark == 1) {
							me.loop()
						} else {
							clearTimeout(that.stop3)
						}

					},
					error: function(err) {
						console.log(err)
					}
				})
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
					url: './bidding_my'
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
			 * 弹框提示按钮处理
			 * */
			closeEndFlag(flag) {
				var me = this
				if (flag == 'go') { //去付款
					me.showEndFlag = false
					this.pay_lx("jp")
					uni.navigateTo({
						url: '../../pagesA/bidding/bidding_order'
					})
					return false
				} else { //停留详情页
					me.showEndFlag = false
				}
			},
			/**
			 *
			 * */
			_shareApp(type) {
				var me = this
				var scene = ''
				var url = this.$store.state.url
				url = url.split('index')[0]
				var shareUrl = uni.getStorageSync("h5_url") + 'pagesA/bidding/bidding_detailed?bid=' + encodeURIComponent(this.bid_str)
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
					href: shareUrl,
					imageUrl: this.order.imgurl,
					success: function(res) {
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
			showShareMask() {
				lkt_showShareMask(this)
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
			showSaveEWM(string) {
				lkt_showSaveEWM(string, this)
			},
			/**
			 * 复制链接
			 * */
			copyUrl() {
				var me = this
				var url = this.$store.state.url
				url = url.split('index')[0]

				var shareUrl = uni.getStorageSync("h5_url") + 'pagesA/bidding/bidding_detailed?bid=' + encodeURIComponent(this.bid_str)
				var a = getCurrentPages()
				uni.setClipboardData({
					data: shareUrl,
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
					url: '../../pagesB/setUp/payment'
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

				if (this.isfx == 'true') {
					uni.switchTab({
						url: '../../pages/tabBar/home'
					})
					return false

				} else {
					if (this.from_detail_one == 1) {
						uni.redirectTo({
							url: '../../pagesA/bidding/bidding'
						})
					} else {
						uni.navigateBack({
							delta: 1
						})
					}

				}
			},
			/**
			 * 弹窗
			 * */
			_state(state, num, num1) {
				if (this.canbidding > 0) {
					return;
				}

				if (this.is_user == 0) {
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
					return;
				} else if (this.is_user == 1) {
					console.log('from_mark')
					console.log(this.from_mark)

					if (this.from_mark == 1) {
						var promise = parseFloat(num)
						var money = parseFloat(num1)
						this.money_s = promise + money
						this.money_s = this.money_s.toFixed(2)
						console.log("money_s=" + this.money_s)
						this.bid_pup = true
					}
				}
			},
			/**
			 * 选择支付确定
			 * */
			_click() {
				var me = this
				//去支付保证金
				if (me.form_type == 1) {
					// if (me.bind_st == 1 && me.state == 1) {
					if (me.wx_flag == true && me.ye_flag == false) {
						if (me.passwd_status == 1) {
							me.bid_pup = false
							me.pay_display = true
						} else {
							me.bid_pup = false
							me.password_display = true
						}
					} else {
						var data = {
							module: "app",
							action: "auction",
							m: "go_pay",
							password: this.msg,
							id: this.bindding_id,
							access_id: this.access_id,
							type: "wx"
						}
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: (res) => {
								me.sNos = res.data.sNo
								me.titles = res.data.title
								me.totals = res.data.total
								me.bid_pup = false
								// #ifdef MP-WEIXIN
								me.weixinPay()
								// #endif
								//#ifndef MP-WEIXIN
								me.pay_wx()
								// #endif
							},
							error: function(err) {
								console.log(err)
							}
						})
						// }
					}
				}
				//去出价
				else {
					var bid_value = parseFloat(me.bid_value)

					var money_s = parseFloat(me.money_s)
					let should_pay = Number((Number(me.order.current_price) + Number(me.order.add_price)).toFixed(2))
					if (bid_value < should_pay) {
						uni.showToast({
							title: "出价幅度过低",
							duration: 1000,
							icon: 'none'
						})
						return false
					}
					if (isNaN(bid_value)) {
						uni.showToast({
							title: "请输入正确的金额",
							duration: 1000,
							icon: 'none'
						})
					} else {
						var data = {
							module: "app",
							action: "auction",
							m: "bid",
							price: bid_value,
							id: this.bindding_id,
							access_id: this.access_id
						}

						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},


							method: 'POST',
							success: function(res) {
								if (res.data.info == "更新加价成功！") {
									uni.showToast({
										title: "加价成功",
										duration: 1000,
										icon: 'none'
									})
									clearTimeout(me.stop);

									me._axios()
									me.bid_pup = false
									me.bind_promise(1)
									me.bid_value = ''
								} else {
									uni.showToast({
										title: "出价失败," + res.data.info,
										duration: 1000,
										icon: 'none'
									})
								}
							},
							error: function(err) {
								console.log(err)
							}
						})
					}
				}

			},
			/**
			 * 跳转出价记录表
			 * */
			_bid_record() {
				uni.navigateTo({
					url: 'bidding_record',
				})
			},
			/**
			 * 转换开始,结束时间的格式
			 * */
			changeTimeStyle() {
				lkt_changeTimeStyle(this)
			},
			/**
			 * 轮循
			 * */
			loop() {
				//请求更新数据
				var that = this
				if (that.from_mark == 1) {
					var data = {
						module: 'app',
						action: 'auction',
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
								that.bid_num = res.data.bid_num
								that.order.current_price = Number(res.data.max_price).toFixed(2)
								that.low_price = Number(Number(res.data.max_price) + Number(that.order.add_price)).toFixed(2)
								that.order.pepole = res.data.pepole
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
				//竞拍中-循环请求
				clearTimeout(that.stop3)
				that.stop3 = setTimeout(function() {

					if (that.from_mark == 1) {
						that.loop()
					} else {
						clearTimeout(that.stop3)
					}
				}, 5000)

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
						clearTimeout(that.stop)
					}
				}, 1000)

			},
			/**
			 * 倒计时
			 * */
			countDownn(endtime) {
				var me = this
				var e = ''
				clearTimeout(me.stop2)
				if (endtime > 0) {
					endtime--
					me.canbidding = endtime
					me.stop2 = setTimeout(function() {
						me.countDownn(endtime)
					}, 1000)
				} else {
					clearTimeout(me.stop2)
					me.canbidding = 0
				}
			},
			/**
			 * 时间格式化输出，如11:03 25:19 每1s都会调用一次
			 * */
			dateformat(micro_second) {
				this.overtime = lkt_dateformat(micro_second, this)
			},
			/**
			 * 阻止冒泡，阻止弹窗出现后还能上下移动页面
			 * */
			stopTap() {

			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/bidding/bidding_detailed_Two.css");
</style>
