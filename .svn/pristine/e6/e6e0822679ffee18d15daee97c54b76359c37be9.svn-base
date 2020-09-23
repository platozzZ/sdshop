<template>
	<div :style='{"overflow":overflow}'>
		<div>

			<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>

			<heads v-if='friend' :title='title' returnR='6'></heads>
			<heads v-else :title='title'></heads>

			<ul class="group" v-if="groupmsg.ptstatus!=2">
				<li @tap="_navigateTo('groupDetailed?pro_id=' + groupmsg.ptgoods_id + '&activity_no=' + groupmsg.activity_no + '&platform_activities_id=' + groupmsg.platform_activities_id,'todetail')">
					<img :src="groupmsg.img">
					<div class="group_div">
						<div class="group_title list_break2">{{groupmsg.p_name}}</div>
						<div class="group_num">{{groupmsg.groupman}}人团 已团{{groupmsg.sum}}件</div>
						<div class="group_money list_break1"><span>￥{{price}}</span><span>￥{{groupmsg.price}}</span></div>
					</div>
				</li>
			</ul>

			<div class="group_end yh-group-end" v-if="groupmsg.ptstatus==1 && groupmsg.leftTime > 1">还差<span>{{groupmsg.groupman-groupmsg.ptnumber}}</span>人拼购成功，<span>{{timeStr}}</span>后结束</div>

			<!-- groupmsg.ptstatus==2：拼团成功 -->
			<div class="group_end gsuccess yh-gsuccess" v-else-if="groupmsg.ptstatus==2">
				<img class="class_gou_img" :src="success_gou_img">
				<view class="success_word">
					拼团成功
				</view>
			</div>

			<div class="group_end gfail yh-gfail" v-else-if="groupmsg.ptstatus==10||groupmsg.ptstatus==11">拼团失败,款项将在 2
				个工作日内原路退回</div>

			<div :class="[groupMember.length>4?'can_roll':'']">

				<ul class="group_u" :class="[groupMember.length>4?'flex_start':'']">
					<li v-for="(item,keys) in groupMember" :key="keys">
						<img :class="item.headimgurl?'active':''" :src="item.headimgurl">
						<div class="group_u_name" v-if="keys==0"><span>团长</span></div>

						<view class="wenhao_css" v-if="item.headimgurl"></view>

						<view class="wenhao_css yh-wenhao-css" v-else>
							？
						</view>

					</li>
				</ul>

			</div>
			<!-- #ifdef MP-WEIXIN -->
			<button class="wxshareIcon" v-if="groupmsg.isSelf&&groupmsg.ptstatus==1" @tap="showShareMask">立即邀请好友参团</button>
			<!-- #endif -->

			<!-- #ifdef MP-ALIPAY || MP-TOUTIAO  || MP-BAIDU -->
			<button class="wxshareIcon" open-type="share" v-if="groupmsg.isSelf&&groupmsg.ptstatus==1" >立即邀请好友参团</button>
			<!-- #endif -->

			<!-- #ifndef MP-WEIXIN || MP-ALIPAY || MP-TOUTIAO  || MP-BAIDU -->
			<div class="group_btns" v-if="groupmsg.isSelf&&groupmsg.ptstatus==1&&groupmsg.leftTime>0" @tap="showShareMask" id="copyy"
			 :data-clipboard-text='shareHref'><span>立即邀请好友参团</span></div>
			<!-- #endif -->

			<!-- 拼团成功 -->
			<view class="yh-ptcg" v-if="groupmsg.ptstatus == 2">

				<view class="yh-line"></view>

				<div class="group_wf_t yh-group-wf-t" @tap="_toDetail()">
					<div class="pro_name">

						<text class="yh-p-title">商品名称：</text>
						<text class="yh-p-name">{{groupmsg.p_name}}</text>

					</div>

					<div class="group_gz"></div>
					<img class='arrow' :src="you_img" />
				</div>
				<!-- TODO:原判断 v-if="groupmsg.ptstatus !=2 " -->
				<div class="group_wf_t yh-group-wf-y">
					<div class="pro_name">
						<text class="yh-p-title">支付金额：</text>
						<text class="yh-p-name">{{groupmsg.p_price}}</text>
					</div>
				</div>

			</view>

			<div class="group_btns yh-group-btns-q" v-if="(groupmsg.isSelf&&(groupmsg.ptstatus==2||groupmsg.ptstatus==3)) || groupmsg.ptstatus == 2 || is_end"
			 @tap="_toDetail()"><span>{{is_end?'拼团结束，再次开团':'再次开团'}}</span></div>

			<div class="group_btns yh-group-btns-w" v-if="groupmsg.isSelf&&groupmsg.ptstatus==2"
			 @tap="_toOrderDetail()"><span style="color: #242424;">查看订单</span></div>

			<div class="group_btns" v-if="!groupmsg.isSelf && groupmsg.ptstatus!=2 && groupmsg.leftTime > 0" @tap="_buy"><span>立即参团</span></div>

			<div class="group_peo" v-if="groupmsg.isSelf&&groupmsg.ptstatus==3&&groupList.length">

				<div class="group_people_t yh-group-people-t">或参加别人的团</div>

				<ul>
					<li v-for="(item,index) in groupList" :key='index'>
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

							<div class="yh-ct-title" @tap="_gocantuan(item.sNo)"><span style='color: #FFF9ED;'>去参团</span></div>
						</div>
						<div style="clear: both;"></div>
					</li>
				</ul>

			</div>

			<div class="group_wf" v-if="groupmsg.ptstatus!=2">

				<div class="group_wf_t yh-group-wf-r">
					<div class="yh-pt-ptwf">拼团玩法</div>

					<div class="group_gz" @tap="showrule()">
						<span class="yh-pt-ptgz">拼团规则</span>
					</div>

					<img class='arrow' :src="gdOuterImg" />
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

			<!--  遮罩      -->
			<div class='mask' v-if='mask_display'>
				<div class="mask_d" :class='mask_display1?"goodAnimate1":(mask_display?"goodAnimate":"")'>
					<div class='mask_guige'>
						<div class='mask_one'>
							<div>
								<img class="shangp" :src="imgurl" />
							</div>
							<div class='mask_pric'>
								<p style="color: red;">￥<span> {{price}}</span></p>
								<p style="font-size: 12px;color: rgb(153, 153, 153);">库存{{num}}</p>
							</div>
							<img class="cha" :src="guan_img" @tap="_mask_f()" />
						</div>
						<div class="mask_over">
							<div class='mask_two' v-for='(item,indx) in attrList' :key='indx'>
								<p>{{item.attrName}}</p>
								<ul v-if="num==0">
									<li v-for='(items,index) in item.attr' :key='index' @tap='showState(index,indx)'>{{items.attributeValue}}</li>
								</ul>
								<ul v-else>
									<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']"
									 @tap='showState(index,indx)'>{{items.attributeValue}}</li>
								</ul>
							</div>
							<div class='mask_two'>
								<p>拼团人数</p>
								<ul>
									<li class="orange">{{groupmsg.groupman}} 人团</li>
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

			<div class="mask yh-mask" v-if="shareMask" @tap="_closeAllMask">
				<div class="shareMask yh-shareMask" v-if="saveEWM" @tap.stop>

					<img :src="guan_img" class='cha yh-cha' @tap="closeShareMask()">

					<div class="right yh-right">
						<img :src="ewmImg" class="yh-ewmImg">
					</div>

					<div class="clearfix"></div>

					<button type="button" class="saveEWMBtn yh-saveEWMBtn-q" @tap="_downEWM()">
						保存图片
					</button>
				</div>

				<div class="allCenter yh-allCenter" v-else="saveEWM" @tap.stop>
					<!-- <div style="width: 58%;margin: 0 auto;display: flex;"> -->

						<!-- #ifdef APP-PLUS-->
						<div class="shareIcon" @tap="_showPerson()">
							<img :src="wx_img" />
							<p>微信</p>
						</div>

						<div class="shareIcon" @tap="_shareShow()">
							<img :src="wx_person" />
							<p>朋友圈</p>
						</div>

						<div class="shareIcon" @tap="showSaveEWM('app')">
							<img :src="wx_ewmfxt" />
							<p>二维码</p>
						</div>
						<!-- #endif -->

						<!-- #ifdef MP-WEIXIN -->
						<div class="shareIcon yh-shareIcon">
							<button class="share_btn" open-type="share">
								<img :src="wx_img" />
								<p style='margin-top: -38upx;margin-bottom: 0 !important;'>微信好友</p>
							</button>
						</div>
						<!-- <div class="shareIcon" @tap="_shareShow()">
							<img :src="wx_person" />
							<p>朋友圈</p>
						</div> -->
						<div class="shareIcon" @tap="showSaveEWM('wx')">
							<img :src="wx_ewmfxt" />
							<p style="margin-bottom: 0 !important;">二维码</p>
						</div>
						<!-- #endif -->

						<!-- #ifdef MP-ALIPAY -->
						<div class="shareIcon yh-shareIcon">
							<button class="share_btn" open-type="share" style="border: none;">
								<img :src="wx_img" />
								<p style='margin-top: -56upx;'>微信好友</p>
							</button>
						</div>
						<div class="shareIcon" @tap="showSaveEWM('ali')">
							<img :src="wx_ewmfxt" />
							<p style="margin-bottom: 0;">二维码</p>
						</div>
						<!-- #endif -->
						<div class="clearfix"></div>
					<!-- </div> -->
				</div>
			</div>

		</div>

		<div class="isLoseEfficacy" v-if="!isshow">
			<img :src="loseEfficacyImg" alt="">
		</div>

		<div class="isload load yh-s-load" v-if="isload">
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>

		<!-- #ifdef MP-ALIPAY -->
		<view id="rule-box" v-if="show_rule" class="yh-rule">
			<view class='content_d yh-rule-content' id='content_d'>
				<div class="yh-rule-div">拼团规则</div>
				<scroll-view scroll-y class="yh-rule-s">
					<!-- <wxParse v-if="rule != ''" :content="rule"></wxParse> -->
					<rich-text class="richtext" :nodes="contentNodes" style="font-size: 14px;"></rich-text>

				</scroll-view>
						<view @tap="closerule()" class="yh-closerule">我知道了</view>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifndef MP-ALIPAY -->
		<div id="rule-box" v-if="show_rule" class="yh-show-rule">
			<div class='content_d yh-show-rule-content' id='content_d'>
				<div class="yh-show-rule-ptgz">拼团规则</div>
				<scroll-view scroll-y class="yh-show-rule-div">
					<wxParse v-if="rule != ''" :content="rule"></wxParse>
				</scroll-view>
				<div @tap="closerule()" class="yh-show-rule-closerule">我知道了</div>
			</div>
		</div>
		<!-- #endif -->

	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import htmlParser from '../../common/html-parser.js'
	import lktauthorize from '../../components/lktauthorize.vue'

	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage.js'

	export default {
		data() {
			return {
				gdOuterImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/gd_outer.png",
				overflow: 'scroll',
				mask_display1: false,
				fastTap: true,
				list_bg1: "",
				list_bg2: "",
				list_bg3: "",
				list_bg4: "",
				is_end: false,//拼团是否结束 true 结束 false 未结束
				title: '一起拼团',
				access_id: '',
				ptcode: '', //拼团号
				img: '',
				attr__: '',
				isload:'',
				login: '', //是否登录
				data_: '',
				saves: '',
				groupmsg: '',
				attrList: '',
				skuBeanList: '',
				groupList: '',
				load: true,
				timeStr: '',
				groupMember: [],
				shareMask: false,
				saveEWM: false,
				shares: {},
				show_rule:false,//是否显示规则
				rule:"",
				shareContent: '一起来用来客推吧！', //分享的内容
				shareHref: '', //分享的链接
				sharehrefTitle: '一起来用来客推吧1', //分享的链接的标题
				sharehrefDes: '一起来用来客推吧2', //分享的链接的描述
				ewmImg: '',
				mask_display: false,
				num: '', //规格数量
				price: '', //规格价格
				imgurl: '', //规格图片
				numb: 1, //规格选择的数量
				haveSkuBean: '', //选择规则属性
				goodscode: '',
				head: true, //头部切换
				clickFlag: false,
				loseEfficacyImg: '',
				isshow: true,
				returnR: '',
				otype: '',
				friend: false,
				isonload: 0,
				user_can_open:'',
				user_can_can:'',
				group_again_by:'',//是否开启再次参团
				inter:'',//倒计时对象
				activity_no:"",//拼团活动编号
				list_img: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1548123520934.jpeg",
				list_bg_pic: "background-image: url(" + this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/bj.png)',
				success_gou_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/group_end_success.png',
				shopImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/shopping_l2x.png',
				you_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/jiantou2x.png',
				noImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/icon-no.png',
				guan_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				jian_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/jian2x.png',
				jian_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/jianhui2x.png',
				loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/loading.gif',
				jia_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/jia+2x.png',
				jia_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/add+2x.png',
				wx_person: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/fdc.png',
				wx_ewmfxt: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/ewmShare.png',
				wx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/wechat.png',
				erm_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/ewmShare.png',
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
			}
		},
		onLoad(option) {
			var me = this;

			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function(){
					resolve(1231);
				});
			});

			p.then(() => {
				me.mask_display = false
				me.returnR = option.returnR
				me.otype = option.otype
				me.sNo = option.sNo
				me.friend = option.friend
				me.activity_no = option.activity_no
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				me._axios();
			})

		},
		onShow() {
			var me = this

			me.mask_display = false
			me.isload = true

			if (me.isonload == 0) {
				me.isonload = 1
			} else {
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				me._axios();
			}
		},
		/**
		 * 转发
		 * */
		onShareAppMessage: function(res) {

			if (res.from === 'button') {

			}
			// path: '/pagesA/group/group_end?sNo=' + this.sNo + '&returnR=' + this.returnR+"&friend=true",
			return {
				title: this.groupmsg.p_name,
				path: '/pagesA/group/group_end?sNo=' + this.sNo +'&activity_no='+me.activity_no+'&friend=true&isfx=true&cc=1',
				imageUrl: this.groupmsg.img,
				success: function(res) {}
			}
		},
		methods: {
			/**
			 *
			 * */
			changeLoginStatus(){
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
				uni.navigateTo({
					url: './groupDetailed?pro_id=' + me.groupmsg.ptgoods_id+'&activity_no='+this.activity_no,
				})
			},
			/**
			 * 取数据
			 * */
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'groupbuy',
					m: 'cangroup',
					oid: this.sNo,
					access_id: this.access_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {

						if (res.data.code == 404) {
							me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
							return
						}

						me.attrList = res.data.attrList
						me.skuBeanList = res.data.skuBeanList
						me.groupList = res.data.groupList
						me.groupmsg = res.data.groupmsg
						me.user_can_can = res.data.user_can_can
						me.user_can_open = res.data.user_can_open
						me.group_again_by = res.data.group_again_by
						me.rule = res.data.rule

						me.content="<div style='padding-left:8px;padding-right:8px;'>"+me.rule.replace(new RegExp("<view","gm"),"<p").replace(new RegExp("</view>","gm"),"</p>")+"</div>";
						var htmlString  = me.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
						htmlString = htmlString.replace("<div style='padding-left:8px;padding-right:8px;'>",'<div style="padding: 0 15px;">')

						console.log(htmlString)
						me.contentNodes =  htmlParser(htmlString);
							console.log();
							console.log(me.groupmsg.leftTime);
								if(Number(me.groupmsg.leftTime) > 0){
									console.log('>0');
									me.is_end = false
								}else{
									me.is_end = true
								}

							console.log('====================is_end');
							console.log(me.is_end);

						me.imgurl = me.groupmsg.img
						me.num = me.groupmsg.p_num
						me.login = res.data.islogin
						console.log('login');
						console.log(me.login);
						me.ptcode = res.data.ptcode
						me.goodscode = res.data.goodscode
						var pricee = me.groupmsg.price;
						for(var i = 0;i<me.attrList[0].attr.length;i++){
							console.log("2222---");
							console.log(me.attrList[0].attr[i].enable);
							if(me.attrList[0].attr[i].enable && me.attrList[0].attr[i].select){
								pricee = me.attrList[0].attr[i].price;
							}
						}
						me.price = me._money(pricee, me.groupmsg.zekou)
						console.log('price');
						console.log(me.price);
						me.load = false
						console.log("返回的结果");
						console.log(res.data)
						console.log(me.goodscode)
						me.orderNo = res.data.groupmsg.id
						me.orderStatus = res.data.groupmsg.status
						if (res.data.isshow == 1) {
							me.isshow = true
						} else {
							me.isshow = false
						}
						console.log('show')
						console.log(me.isshow)
						me.loseEfficacyImg = res.data.loseEfficacyImg
						if (me.groupList.length) {
							me.setTimeList(me.groupList)
						}

						clearInterval(me.inter);
						me.setTimeData(me.groupmsg.leftTime)
						var groupMember = [];
						for (var i = me.groupmsg.groupman - 1; i >= 0; i--) {
							if (res.data.groupMember[i]) {
								groupMember[i] = res.data.groupMember[i]
							} else {
								groupMember[i] = {}
							}
						}
						me.groupMember = groupMember
						me._spec()
						me.attr__ = me.attr_ = res.data.attrList[0].attr;
						me.data_ = res.data
						me.isload = false
						me.price = res.data.min_price
						for (var i = 0; i < me.attr_.length; i++) {
							console.log('me.attr');
							console.log(me.attr_);
							console.log(me.attr__);
							if (me.attr_[i].select && me.attr_[i].enable) {
								console.log(me.data_);
								me.num = me.attr_[i].count
								me.haveSkuBean = me.data_.skuBeanList[i]
								console.log('me.haveSkuBean');
								console.log(me.haveSkuBean);
								if (me.isshopping) {
									me.market_price = me.market_price2 = me.attr_[i].price
								} else {
									me.market_price = me.market_price2 = me.attr_[i].price
								}
							}
						}

					},
					error: function(err) {
						console.log(err)
						me.load = false
					},
				})
			},
			/**
			 *
			 * */
			_money(prices, zekou) {
				var me = this
				prices = (zekou * prices) / 100
				var price = prices.toFixed(2);
				return price;
			},
			/**
			 *
			 * */
			setTimeData(time) {
				var me = this;
				console.log(time);

					me.inter = setInterval(function() {
					if (time <= 0) {
						clearInterval(me.inter);
						me.timeStr = '00:00:00'
						return false
						console.log(time);
					}
					var t = --time;
					var h = Math.floor(t / 60 / 60);
					var m = Math.floor((t - h * 60 * 60) / 60);
					var s = t % 60;
					if (h < 10) h = "0" + h;
					if (m < 10) m = "0" + m;
					if (s < 10) s = "0" + s;
					me.timeStr = h + ':' + m + ':' + s
				}, 1000)


			},
			/**
			 *
			 * */
			setTimeList(data) {
				var self = this;
				var groupList = data
				setInterval(function() {
					for (var i = 0; i < groupList.length; i++) {
						var t = --groupList[i].leftTime;
						var h = Math.floor(t / 60 / 60);
						var m = Math.floor((t - h * 60 * 60) / 60);
						var s = t % 60;
						if (h < 10) h = "0" + h;
						if (m < 10) m = "0" + m;
						if (s < 10) s = "0" + s;
						groupList[i].leftTimeStr = h + ':' + m + ':' + s
						if (groupList[i].leftTime <= 0) {
							groupList[i].leftTimeStr = '00:00:00';
						}
					}

					self.groupList = groupList
				}, 1000)
			},
			/**
			 *
			 * */
			_downEWM() {
				let me = this
				console.log("需要保存到本地的图片地址：" + me.ewmImg_url);
				uni.getImageInfo({
					src: me.ewmImg_url,
					success: function (sres) {
						console.log(sres.path);
						// #ifdef MP-ALIPAY
						my.saveImage({
						url: sres.path,
						 success: () => {
							uni.showToast({
								title:"保存图片成功",
								duration:1500,
								icon:'none'
							})
						  },
						})
						return false
						// #endif
						uni.saveImageToPhotosAlbum({
							filePath: sres.path,
							success: function () {
								uni.showToast({
									title:"保存图片成功",
									duration:1500,
									icon:'none'
								})
							},
							fail: function () {
								uni.showToast({
									title:"保存图片失败！",
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
			 * 分享到微信朋友圈
			 * */
			_shareShow() {
				let me = this
				let groupmsg = me.groupmsg



				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: uni.getStorageSync("h5_url") + 'pagesA/group/group_end?sNo=' + me.sNo +
						'&activity_no='+me.activity_no+'&friend=true&isfx=true&cc=2',
					title: groupmsg.p_name,
					summary: '',
					imageUrl: groupmsg.img,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			/**
			 * 分享给微信好友
			 * */
			_showPerson() {

				let me = this
				let groupmsg = me.groupmsg
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: uni.getStorageSync("h5_url") + 'pagesA/group/group_end?sNo=' + me.sNo +
						'&activity_no='+me.activity_no+'&friend=true&isfx=true&cc=3',
					title: groupmsg.p_name,
					summary: '',
					imageUrl: groupmsg.img,
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
				var me = this
				console.log("__________activity_no");
				console.log(me.activity_no);
				// #ifdef H5
				this.shareHref = uni.getStorageSync("h5_url") + 'pagesA/group/group_end?sNo=' + me.sNo +'&activity_no='+me.activity_no+'&friend=true&isfx=true&cc=1'
				// #endif
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){

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
					// -sel H5
					// #ifndef H5
					me.shareMask = true
					// #endif
				});
			},
			/**
			 *
			 * */
			closeShareMask() {
				this.saveEWM = false
				this.shareMask = false
				this.overflow = 'scroll'
			},
			/**
			 *
			 * */
			_closeAllMask() {
				this.shareMask = false
				this.saveEWM = false
				this.overflow = 'scroll'
			},
			/**
			 *
			 * */
			showSaveEWM(string) {
				var me = this
				var data = {
					module: 'app',
					action: 'getcode',
					m: 'share',
					proId: this.groupmsg.ptgoods_id,
					access_id: this.access_id,
					type: 'pt_end',
					sNo: me.sNo,
				}
				console.log('err1');
				if (string == 'wx') {
					data.store_type = 1
				}if (string == 'ali') {
					data.store_type = 3
				} else {
					data.store_type = 2
				}
				console.log('err2');

				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log('err3');

						if (res.data.code == 200) {
							me.ewmImg = uni.getStorageSync("endurl") + res.data.imgUrl

							me.ewmImg_url = uni.getStorageSync("endurl") + res.data.imgUrl
							console.log("me.ewmImg_url");
							console.log(me.ewmImg_url);
							me.saveEWM = true
							me.shareMask = true

							console.log('err4');

						} else if (res.data.code == 404) {
							me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
							console.log('err5');
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
							console.log('err6');

						}
						console.log('=======');
						console.log(me.shareMask);
						console.log(me.saveEWM);
						console.log('err7');

						console.log(res)
					},
				})

			},
			/**
			 *
			 * */
			_navigateTo(url, type = '') {
				if (type == 'todetail') {
					console.log('todetail============if');
					console.log(type);
					uni.navigateTo({
						url: url
					})
				} else {
					console.log("else==============");
					// #ifdef H5
					uni.reLaunch({
						url: '../../pages/tabBar/home'
					})
					return false
					// #endif
					if (this.friend == 'true') {
						console.log('back_home');
						uni.reLaunch({
							url: '../../pages/tabBar/home'
						})
					} else if ((Number)(this.returnR) == 1) {
						console.log('back_1');
						uni.navigateBack({
							delta: 1
						});
						return false
					} else if ((Number)(this.returnR) == 2) {
						console.log('back_2');
						uni.navigateBack({
							delta: 2
						});
						return false
					} else {
						uni.reLaunch({
							url: '../../pagesA/group/group'
						})
						return false
					}

				}
			},
			/**
			 * 跳到产品详情页面
			 * */
			_toDetail() {
				if(this.is_end){

					uni.navigateTo({
						url: '../group/group',
					})

					return false
				}
				uni.navigateTo({
					url: '../group/groupDetailed?pro_id=' + this.groupmsg.ptgoods_id+'&activity_no='+this.activity_no,
				})
			},
			/**
			 * 跳到订单详情页面
			 * */
			_toOrderDetail() {
				// item.status,item.id,item.otype
				// orderStatus
				uni.navigateTo({
					url: '../../pages/order/order?order_id=' + this.orderNo + '&returnR=1',
				})
			},
			/**
			 *
			 * */
			_reduce() {
				if (this.numb > 1 && Boolean(this.haveSkuBean)) {
					this.numb--
				} else {
					this.numb == 1
					uni.showToast({
						title: '数量已经减少到最低了哦！',
						duration: 1000,
						icon: 'none'
					})
				}
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
				if(this.num <= this.numb){
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
			showrule(){
				var me = this
				me.show_rule = true
			},
			/**
			 *
			 * */
			closerule(){
				var me = this
				me.show_rule = false
			},
			/**
			 * 开团
			 * */
			_buy() {
				var me = this
				me.fastTap = false
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1',function(){
					if (me.goodscode.g_status == 1) {
						uni.showToast({
							title: "活动暂未开始，无法购买！",
							duration: 1000,
							icon: 'none'
						})
						return false;
					} else if (me.goodscode.g_status == 3) {
						uni.showToast({
							title: "活动已结束，无法购买！",
							duration: 1000,
							icon: 'none'
						})
						return false;
					}else if(!me.group_again_by){
						uni.showToast({
							title: "此商品无法再次参团！",
							duration: 1000,
							icon: 'none'
						})
						return false;
					}else if(!me.user_can_can){
						uni.showToast({
							title: "已达参团上限，无法继续参团！",
							duration: 1000,
							icon: 'none'
						})
						return false;
					}
					// else if(!me.user_can_open){
					// 	uni.showToast({
					// 		title: "已达开团上限，无法继续开团！",
					// 		duration: 1000,
					// 		icon: 'none'
					// 	})
					// 	return false;
					// }
					me._mask_display()
					me.fastTap = true
				});
			},
			/**
			 *
			 * */
			_gocantuan(sNo) {
				uni.navigateTo({
					url: '../group/group_end?sNo=' + sNo
				});
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
				this.haveSkuBean = ""
				//this.mask_display = false
				this.overflow = 'scroll'
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
			/**
			 *
			 * */
			_mask_f() {
				this.haveSkuBean = ""
				this._mask_false()
				this.overflow = 'scroll'
			},
			/**
			 * 确认
			 * */
			_confirm() {
				var me = this

				if (Boolean(this.haveSkuBean)) {
					if (this.num == 0) {
						uni.showToast({
							title: "库存不足",
							duration: 1000,
							icon: 'none'
						})
					} else if (this.num != 0) {
						var product = {}
						product['pid'] = this.groupmsg.ptgoods_id
						product['cid'] = this.haveSkuBean.cid
						product['num'] = this.numb
						product['groupnum'] = this.groupmsg.groupman
						product['ptcode'] = this.ptcode
						product['price'] = this.price
						product['price'] = this.price
						product['activity_no'] = this.activity_no
						product['frompage'] = 'cantuan'

						product = JSON.stringify(product)

						uni.navigateTo({
							url: '../group/payfor?product=' + product + '&returnR=1'
						});
						me.fastTap = true
					}

				}else if(this.haveSkuBean == ''){
					uni.showToast({
						title: "请选择完整的商品规格！",
						duration: 1000,
						icon: 'none'
					})
				} else {
					if (this.num == 0) {
						uni.showToast({
							title: "库存不足",
							duration: 1000,
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: "请选择完整的商品规格！",
							duration: 1000,
							icon: 'none'
						})
					}
				}

			},
			/**
			 *
			 * */
			_spec() {

				var attrListIn = this.attrList;
				for (var i = 0; i < attrListIn.length; i++) {
					var attrListBig = attrListIn[i];
					//当前类别之外的选择列表
					var attrsOtherSelect = [];
					for (var j = 0; j < attrListIn.length; j++) {
						var attrListSmall = attrListIn[j];
						if (attrListSmall.id != attrListBig.id) {
							for (var k = 0; k < attrListSmall.attr.length; k++) {
								var attrListSmallAttr = attrListSmall.attr[k];
								if (attrListSmallAttr.enable && attrListSmallAttr.select) {
									//可选并且已经选择的属性
									attrsOtherSelect.push(attrListSmallAttr);
								}
							}
						}
					}
					var enableIds = [];
					var skuBeanListIn = this.skuBeanList;
					for (var z = 0; z < skuBeanListIn.length; z++) {
						var ism = true;
						var skuBean = skuBeanListIn[z];
						for (var j = 0; j < attrsOtherSelect.length; j++) {
							var enable = false;
							for (var k = 0; k < skuBean.attributes.length; k++) {
								var goodAttrBean = skuBean.attributes[k];
								if (attrsOtherSelect[j].attributeId == goodAttrBean.attributeId &&
									attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
									/*console.log(attrsOtherSelect[j].attributeId, goodAttrBean.attributeId, attrsOtherSelect[j].id, goodAttrBean.attributeValId)*/
									enable = true;
									break;
								}
							}
							ism = enable && ism;
						}

						if (ism) {
							for (var o = 0; o < skuBean.attributes.length; o++) {
								var goodAttrBean = skuBean.attributes[o];
								if (attrListBig.id == goodAttrBean.attributeId) {
									enableIds.push(goodAttrBean.attributeValId);
								}
							}
						}
					}
					var integers = enableIds;
					for (var s = 0; s < attrListBig.attr.length; s++) {
						var attrItem = attrListBig.attr[s];
						attrItem.enable = integers.indexOf(attrItem.id) != -1;
					}
				}
				// 重新赋值
				this.attrList = attrListIn,
					this.skuBeanList = skuBeanListIn
			},
			/**
			 * 选择属性
			 * */
			showState(index, indx) {
				var listItem = this.attrList;

				var items = listItem[indx];
				var item = items.attr[index];
				if (!item.enable) {
					return;
				}
				var select = !item.select;
				for (var i = 0; i < items.attr.length; i++) {
					items.attr[i].select = false;
				}
				item.select = select;
				// 获取点击属性列表
				var canGetInfo = [];
				for (var skuIndex = 0; skuIndex < listItem.length; skuIndex++) {
					for (var skuIndexIn = 0; skuIndexIn < listItem[skuIndex].attr.length; skuIndexIn++) {
						if (listItem[skuIndex].attr[skuIndexIn].enable && listItem[skuIndex].attr[skuIndexIn].select) {
							canGetInfo.push(listItem[skuIndex].attr[skuIndexIn]);
						}
					}
				}

				/*console.log(canGetInfo, "目前点击的属性");*/

				var canGetInfoLog = "";

				var skuBeanList = this.skuBeanList;

				var haveSkuBean = [];
				// 对应库存清单扫描
				for (var skuBeanIndex = 0; skuBeanIndex < skuBeanList.length; skuBeanIndex++) {
					var iListCount = 0;
					for (var skuBeanIndexIn = 0; skuBeanIndexIn < skuBeanList[skuBeanIndex].attributes.length; skuBeanIndexIn++) {
						if (canGetInfo.length == skuBeanList[skuBeanIndex].attributes.length) {
							if (skuBeanList[skuBeanIndex].attributes[skuBeanIndexIn].attributeValId == canGetInfo[skuBeanIndexIn].id) {
								iListCount++;
							}
						} else {
							canGetInfoLog = "库存清单不存在此属性" + " ";
						}
					}
					if (iListCount == skuBeanList[skuBeanIndex].attributes.length) {
						haveSkuBean.push(skuBeanList[skuBeanIndex]);
					}
				}

				/*console.log(haveSkuBean, "存在于库存清单");*/

				for (var iox = 0; iox < canGetInfo.length; iox++) {
					canGetInfoLog += canGetInfo[iox].attributeValue + " ";
				}

				if (haveSkuBean.length != 0) {
					var gkprice = haveSkuBean[0].price;
					gkprice = this._money(gkprice, this.groupmsg.zekou);
					this.num = haveSkuBean[0].count;
					this.price = gkprice;
					this.imgurl = haveSkuBean[0].imgurl
					this.haveSkuBean = haveSkuBean[0]
					//this._mno = haveSkuBean[0].price;
				} else {
					console.log(2)
					this.num = 1
					this.price = this.groupmsg.price
					this.haveSkuBean = ''
					//this._mno = this.det.market_price
				}

				// 重新赋值
				this.attrList = listItem
				/*infoText: canGetInfoLog,*/

				// 重新sku运算
				this._spec();
			},
		},
		components: {
			Heads,
			wxParse,
		}
	}
</script>

<style scoped lang="less">
	@import url("../../static/css/group/group_end.less");
</style>
