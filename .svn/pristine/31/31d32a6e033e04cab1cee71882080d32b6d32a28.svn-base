<template>
	<div class="page">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="is-status"></div>
		<div class="heads">
			<div class="heads-left">
				<img class='heads-img' :src="headsimg" @tap="_back()" />
			</div>
			<div class="heads-centent">超值砍价</div>
			<div class="heads-right"></div>
		</div>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中…</p>
			</div>
		</div>
		<div v-else>
			
			<div class='bargainRule' @tap='_ruleDiv(true)'>
				<img :src="barExp" alt="">
				<span>砍价规则</span>
			</div>
			
			<div class='bargainContent'>
				<div v-if='friend && islogin' class='allCenter yh-allCenter'>
					
					<img :src="headimgurl" class="yh-allCenter-img">
					
					<div class="yh-allCenter-div">
						<div class="yh-allCenter-div-name">{{user_name}}:</div>
						<div class="yh-allCenter-div-text">我正在砍一件好货，来帮我砍价吧！</div>
					</div>
					
				</div>
				<div class='brDiv' @tap="goGoods(list.goods_id,list.attr_id,list.selfstatus,list.selforder_no,list.leftTime,list.bargain_id,list.selfhasorder)">
					<div class='leftBrDiv'><img :src="list.img" alt=""></div>
					<div class='rightBrDiv'>
						<div class='proTitle'>{{list.title}}</div>

						<div class="group_num">

							<span v-if='list.day'>
								<span class="g_n_num dayNum">{{list.day}}</span>
								<span class="yh-day">天</span>
							</span>

							<text class="g_n_num">{{list.hour}}</text>
							<text class="g_n_dian">:</text>
							<text class="g_n_num">{{list.mniuate}}</text>
							<text class="g_n_dian">:</text>
							<text class="g_n_num yh-g-n-num">{{list.second}}</text>
							<span v-if="list.leftTime>0" class="gray">后结束</span>

						</div>

						<div class='brNum' v-if='list.leftTime<0 && list.original_price!=0'>
							<div class='proPrice'>
								<span class="yh-proPrice">对不起您的砍价时间已到，砍价失败</span>
							</div>
						</div>
						<div class='brNum' v-else>
							<div class='proPrice'>
								砍价后<span class="yh-jh-proPrice">¥{{list.min_price}}</span>元
							</div>
						</div>
					</div>
				</div>
				
				<div v-if="list.original_price>0"  class="yh-original-price">
					已砍
					<span style='color: #ff1818;'>{{list.success_money}}</span>
					元，还差
					<span style='color: #ff1818;'>{{list.original_price}}</span>元
				</div>
				
				<div v-else class="yh-original-price">
					<text v-if="friend">您已帮好友砍价成功</text>
					<text v-else>恭喜您已完成砍价</text>
				</div>
				
				<div class='allCenter yh-allCenters'>
					<div :style='{width:width1}' class="yh-allCenters-wid"></div>
					<div class="yh-allCenters-abs"></div>
				</div>
				
				<!-- #ifdef MP-ALIPAY || MP-TOUTIAO  || MP-BAIDU -->
				<button open-type="share" style="border: none;height: auto;" @tap='_shareDiv(true)' v-if='friendOver&&list.original_price!=0'
				 class='shareBtn copyy'>
					帮好友分享此砍价
				</button>
				<!-- #endif -->
				
				<!-- #ifndef MP-ALIPAY || MP-TOUTIAO  || MP-BAIDU -->
				<div v-if='friendOver&&list.original_price!=0' :data-clipboard-text='shareHref' data-clipboard-action="copy" class='shareBtn copyy'
				 @tap='_shareDiv(true)'>
					帮好友分享此砍价
				</div>
				<!-- #endif -->
				
				<div v-else-if='friendOver&&list.original_price==0' class='shareBtn'>
					您已帮好友砍价成功
				</div>
				<!-- #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
				<button open-type="share" style="border: none;height: auto;" @tap='_shareDiv(true)' v-else-if='list.leftTime>0&&!friend&&list.original_price!=0'
				 class='shareBtn copyy'>
					邀好友帮砍
				</button>
				<!-- #endif -->
				<!-- #ifndef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU -->
				<div v-else-if='list.leftTime>0&&!friend&&list.original_price!=0' :data-clipboard-text='shareHref'
				 data-clipboard-action="copy" class='shareBtn copyy' @tap='_shareDiv(true)'>
					邀好友帮砍
				</div>
				<!-- #endif -->
				<div v-else-if='!friend&&list.original_price==0&&!list.hasorder&&!order_id' class='shareBtn' @tap='goPay()'>
					去付款
				</div>
				<div v-else-if='!friend&&list.original_price==0&&list.gopay==1' class='shareBtn' @tap='go_order()'>
					待付款
				</div>
				<div v-else-if='!friend&&list.original_price==0&&list.status==2' class='shareBtn' @tap='go_order()'>
					查看订单详情
				</div>
				<div v-else-if='list.leftTime<=0' class='shareBtn white'>
					已结束
				</div>
				<div v-else-if='list.leftTime>0&&friend&&list.original_price!=0' class='shareBtn' @tap='_helpBar()'>
					帮好友砍一刀
				</div>
				<div v-else-if='list.status==-1&&friend' class='shareBtn' @tap='goBr()'>
					去看更多砍价
				</div>
				<button class="shareBtn white" v-if="friend" @tap='goGoods(list.goods_id,list.attr_id,list.selfstatus,list.selforder_no,list.leftTime,list.bargain_id,list.selfhasorder)'>我也去砍价</button>
				<div class='bargainList'>
					<div class='allCenter brListTitle'>砍价帮</div>
					<ul v-if='helpListStatus'>
						<template v-for='(item,index) in help_list'>
							<li class='helpList' :key='index' v-if="help_num > 0">
								<div class='helper allCenter'>
									<img :src="item.headimgurl" />
									<span>{{item.user_name}}</span>
								</div>
								<div class='helpBrPrice'>
									砍掉 <span> {{item.bargain_money}} </span> 元
								</div>
							</li>
						</template>
					</ul>
					<div v-show='helpListStatus' class='upDownList' @tap='_helpList(false)'>
						收起<img :src="upList" />
					</div>
					<div v-show="!helpListStatus" class='upDownList' @tap='_helpList(true)'>
						展开<img :src="upList" style="transform: rotate(180deg)" />
					</div>
				</div>
			</div>
			<div class='mask' v-if='cogDiv && brPrice'>
				<div class='maskContent'>
					<img v-if="celebrate" :src="celebrate" class='cogImg' />
					<div class='maskText1' v-if='!friend'>
						您已砍<span style='color: #FF1818;font-weight:bold;'>{{brPrice}}元</span>
					</div>
					<div class='maskText1' v-else>
						您已帮好友砍<span style='color: #FF1818;font-weight:bold;'>{{brPrice}}元</span>
					</div>
					<div class='maskText2' v-if='!friend'>分享给好友帮你砍价！</div>
					<div class='maskBtn allCenter' @tap='hideMask()'>知道啦</div>
				</div>
			</div>

			<div class="mask" v-if="shareDiv && hbStatus">
				<div class="shareEwm" v-if="hbStatus">
					<img :src="ewm" class="imgEwm">
					<img :src="close" class="close" @tap="_closeAllMask">
					<view class="saveEWMBtn" @tap="saveImg()">
						<img :src="saves" class="saves">
						保存图片
					</view>
				</div>
			</div>

			<div class='mask' @tap='_shareDiv(false)' v-if='shareDiv && !hbStatus'>
				<div class='allCenter yh-allCentermask'>
					<!-- #ifdef MP-WEIXIN -->
					<div class="shareIcon" style='position: relative;padding-right:20%;'>
						<button class="share_btn" open-type="share">
							<img :src="wx_img" />
							<p style='margin-top: -26upx;'>微信好友</p>
						</button>
					</div>
					<!-- #endif -->

					<div style='width: 25%;text-align: center;' v-for='(item,index1) in shareWay' :key='index1' @tap='_invite(item.name)'>

						<div>
							<img :src="item.imgUrl" alt="" style='width: 80upx;height: 80upx;'>
						</div>

						<span style='font-size: 24upx;color: #666666;'>{{item.name}}</span>

					</div>

				</div>
			</div>

			<div class='mask' v-if='ruleDiv'>
				<div class='maskContent'>
					<!-- <view style="height: 365px;overflow: auto;">
						<wxParse :content='details'></wxParse>
					</view> -->
					<div style="height: 365px;overflow: auto;">
						<rich-text :nodes="details" style="font-size: 14px;"></rich-text>
					</div>

					<view class="closeDiv" @tap="_ruleDiv(false)">我知道了</view>
				</div>
			</div>

			<div class="isLoseEfficacy" v-if="loseEfficacy">
				<img :src="loseEfficacyImg" />
			</div>
			<div class="isLoseEfficacy" v-else-if="list.status==-1">
				<img :src="loseImg" />
			</div>
			<input type="text" id="shareHref" :value='shareHref' />
		
		
		</div>
	</div>
</template>
<script>
	// #ifdef H5
	import jQuery from "@/common/jquery.js"
	// #endif
	import htmlParser from '@/common/html-parser.js'
	import heads from '@/components/header.vue'
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	var me;
	
	export default {
		data() {
			return {
				cat: uni.getStorageSync("endurl") + 'images/icon/catIcon.png',
				headsimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/back2x.png',
				close: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/close_bb.png',
				saves: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/save.png',
				wx_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/wechat.png',
				logo: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/lktlogo.png',
				ewm: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/1553677239.png',
				barExp: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/barExp.png',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/loading.gif',
				brHeadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/brHeadImg.png',
				celebrate: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/celebrate.png",
				upList: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/upList.png',
				loseEfficacyImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/loseEfficacy@2x.png',
				loseImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/kj_lose.png',
				user_name: '',
				headimgurl: '',
				bargain_id: '',
				friendOver: false,
				a: '',
				self: '',
				helpListStatus: true,
				friend: false,
				ruleDiv: false,
				list: '',
				order_no: '',
				orderNo: '',
				bargain_id: '',
				providerList: '',
				details: [],
				shareContent: '一起来用来客推吧！', //分享的内容
				shareHref: '',
				brPrice: '',
				hbStatus: false,
				shareDiv: false,
				title: '超值砍价',
				access_id: '',
				fastTap: true,
				load: false,
				cogDiv: false,
				proId: '',
				brStatus: '',
				attr_id: '',
				help_num: 0,
				help_list: [],
				islogin: true,
				order_id: '',
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
					// #endif
					{
						name: '二维码分享',
						imgUrl: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/ewmIcon.png'
					},
				],
				loseEfficacy: false,
				pageFlag: false,
				_setTime1: ''
			}
		},
		onShow() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			if (this.pageFlag) {
				this._axios()
			}
		},
		async onLoad(option) {
			// TODO:修改为同步拉取数据解决体验问题
			me = this;
			//#ifdef MP-WEIXIN
			uni.getExtConfig({
				success: function(res) {
					console.info(res);
					if (res.extConfig.url || res.extConfig.kefu_url) {
						me.$store.state.kefu_url = res.extConfig.kefu_url
					}
				},
				error: function(err) {
					console.log(err, 2)
				}
			})

			uni.showShareMenu({
				withShareTicket: true
			})

			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
			});
			// #endif

			this.friend = option.friend
			if (this.friend) {
				// #ifndef H5
				uni.setClipboardData({
					data: '',
				});
				// #endif
			}
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin',
									sort: 0
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline',
									sort: 1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '分享到新浪微博',
									id: 'sinaweibo',
									sort: 2
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq',
									sort: 3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x, y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
					uni.showModal({
						content: "获取登录通道失败",
						showCancel: false
					})
				}
			});
			this.proId = option.proId
			this.attr_id = option.attr_id
			this.brStatus = option.brStatus
			this.order_no = option.order_no
			this.orderNo = option.order_no
			this.bargain_id = option.bargain_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

			await this._axios()
			// this._axios()
		},
		onShareAppMessage(res) {
			var a = getCurrentPages()
			return {
				title: '快来帮我砍价吧！',
				path: a[a.length - 1].route
			}
		},
		/**
		 * 转发
		 * */
		onShareAppMessage: function(res) {
			if (res.from === 'button') {

			}
			return {
				title: this.list.title,
				path: '/pagesA/bargain/bargainIng?proId=' + this.proId + "&attr_id=" + this.attr_id + "&order_no=" + this.order_no +
					"&brStatus=" + this.brStatus + "&friend=true&bargain_id=" + this.bargain_id,
				imageUrl: this.list.img,
				bgImgUrl: this.list.img,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		methods: {
			
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
			go_order() {
				uni.navigateTo({
					url: '../../pages/order/order?order_id=' + this.order_id + '&showPay=true'
				})
			},
			changeLoginStatus() {
				let me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			_back() {
				this.flag = false;
				if (this.friend) {
					uni.switchTab({
						url: '../../pages/tabBar/home'
					});
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			_closeAllMask() {
				this.hbStatus = false
				this.shareDiv = false
			},
			goGoods(id, attr_id, status, order_no, leftTime, bargain_id, hasorder) {
				var me = this
				console.log('=---------------self---------------' + status)
				this.$store.state.pro_id = id
				if (hasorder == 1) {
					uni.navigateTo({
						url: '../../pages/goods/goodsDetailed?&bargain=true&isbegin=1&brStatus=' + status + '&attr_id=' + attr_id +
							'&order_no=' +
							order_no + '&leftTime=' + leftTime + '&bargain_id=' + bargain_id + '&hasorder=' + hasorder + '&sNo_id=' + me.order_id
					})
				} else {
					uni.navigateTo({
						url: '../../pages/goods/goodsDetailed?&bargain=true&isbegin=1&brStatus=' + status + '&attr_id=' + attr_id +
							'&order_no=' +
							order_no + '&leftTime=' + leftTime + '&bargain_id=' + bargain_id + '&sNo_id=' + me.order_id
					})
				}

				this.pageFlag = true
			},
			goPay() {
				var me = this
				var product = []
				product.push({
					pid: this.proId
				})
				product.push({
					cid: this.attr_id
				})
				product.push({
					num: 1
				})
				product.push({
					bargain: true
				})
				product.push({
					bargain_id: me.bargain_id
				})
				product.push({
					order_no: me.order_no
				})
				product = JSON.stringify(product)
				uni.navigateTo({
					url: '../../pages/pay/orderDetailsr?product=' + product + '&bargain=true&bargain_id=' + me.bargain_id +
						'&order_no=' + me.order_no
				})
			},
			goBr() {
				uni.navigateTo({
					url: 'bargain?topTabBar=true'
				})
			},
			_helpBar() {
				let me = this
				if (!this.islogin) {
					this.$refs.lktAuthorizeComp.handleAfterAuth(this, '../../pages/login/login?landing_code=1');
				}
				uni.request({
					url: uni.getStorageSync("url"),
					data: {
						access_id: me.access_id,
						module: 'app',
						action: 'bargain',
						goods_id: me.proId,
						attr_id: me.attr_id,
						order_no: me.orderNo,
						m: 'helpbargain'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log('----helpbargain----')
						console.log(res)
						if (res.data.code == 200) {
							if (res.data.statusCode == "500") {
								me.friendOver = true;
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								});
							} else {
								me.friendOver = true
								me.cogDiv = true
								me.brPrice = res.data.randprice;
								me.list.success_money = (parseFloat(me.list.success_money) + res.data.randprice).toFixed(2);
								me.list.original_price = (parseFloat(me.list.original_price) - res.data.randprice).toFixed(2);
								console.log('---------sele-------')
								console.log(res.data)
								me.help_list.push({
									bargain_money: res.data.randprice,
									headimgurl: res.data.headimgurl,
									user_name: res.data.user_name
								});
							}
						} else if (res.data.code == 404) {
							me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
						}
					}
				})
			},
			_helpList(type) {
				this.helpListStatus = type
			},
			_ruleDiv(type) {

				this.ruleDiv = type;
				if (!type) return false;

				let data = {
					m: 'getRule',
					action: 'bargain',
					module: 'app'
				}

				uni.request({
					url: uni.getStorageSync("url"),
					data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						
						var content = "<div style='padding-left:8px;padding-right:8px;'>" + res.data.rule.replace(new RegExp("<view",
							"gm"), "<p").replace(new RegExp("</view>", "gm"), "</p>") + "</div>";
						var htmlString = content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
						htmlString = htmlString.replace("<div style='padding-left:8px;padding-right:8px;'>",
							'<div style="padding: 0 15px;">')
						console.log(htmlString)
						me.details = htmlParser(htmlString);
						
						// me.details = res.data.rule;
					},
					fail: (res) => {
						console.log(JSON.stringify(res, null, 4));
					}
				})

			},
			saveImg() {
				uni.saveImageToPhotosAlbum({
					filePath: me.ewm,
					success: function() {
						uni.showToast({
							title: "保存图片成功",
							duration: 1500,
							icon: 'none'
						})
					}
				});
			},
			_shareDiv(type) {
				var url = uni.getStorageSync("h5_url");
				this.shareHref = url + "pagesA/bargain/bargainIng?proId=" + this.proId + "&attr_id=" + this.attr_id +
					"&order_no=" + this.order_no + "&brStatus=" + this.brStatus + "&friend=true&bargain_id=" + this.bargain_id;
				// #ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
				return;
				// #endif
				// #ifdef H5
				if (type) {
					var Clipboard = require('../../common/clipboard.js')
					var clipboard = new Clipboard(".copyy");
					clipboard.on('success', function(e) {
						uni.showToast({
							title: '复制分享链接成功！',
							duration: 1500,
							icon: 'none'
						})
					});

					clipboard.on('error', function(e) {
						uni.showToast({
							title: '复制分享链接失败！',
							duration: 1500,
							icon: 'none'
						})
					});
				}
				// #endif

				// #ifndef H5
				this.shareDiv = type
				// #endif
			},
			hideMask() {
				this.cogDiv = false
			},
			_invite(type) {
				if (!this.access_id) {
					uni.navigateTo({
						url: '../../pages/login/login?landing_code=1'
					})
					return
				} else {
					console.log("-------------------------share-----" + me.list.img)
					let a = getCurrentPages();
					let href = uni.getStorageSync("h5_url") + "pagesA/bargain/bargainIng?proId=" + me.proId + "&attr_id=" + me.attr_id +
						"&order_no=" + me.order_no + "&brStatus=" + me.brStatus + "&friend=true&bargain_id=" + me.bargain_id;
					if (type == '二维码分享') {
						uni.request({
							url: uni.getStorageSync("url"),
							data: {
								// module: 'app',
								// action: 'bargain',
								// m: "shareimg",
								// order_no: me.order_no,
								module: 'app',
								action: 'getcode',
								m: 'share',
								order_no: me.order_no,
								proId: this.proId,
								access_id: this.access_id,
								// #ifdef MP-WEIXIN
								store_type: 1,
								// #endif
								// #ifndef MP-WEIXIN
								store_type: 0,
								// #endif
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: function(res) {
								me.ewm = uni.getStorageSync("endurl") + res.data.imgUrl
							}
						});
						me.hbStatus = true;
					} else if (type == '朋友圈') {
						uni.share({
							provider: "weixin",
							scene: "WXSenceTimeline",
							type: 0,
							href: href,
							title: me.list.title,
							summary: me.shareContent,
							imageUrl: me.list.img,
							success: function(res) {
								me.fastTap = true
								uni.showToast({
									title: '分享成功!',
									icon: 'none'
								})
							},
							fail: function(err) {
								me.fastTap = true
								uni.showToast({
									title: '分享失败!',
									icon: 'none'
								})
								console.log("fail:" + JSON.stringify(err));
							}
						});
					} else if (type == '微信') {
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							href: href,
							title: me.list.title,
							summary: me.shareContent,
							imageUrl: me.list.img,
							success: function(res) {
								me.fastTap = true
								uni.showToast({
									title: '分享成功!',
									icon: 'none'
								})
							},
							fail: function(err) {
								me.fastTap = true
								uni.showToast({
									title: '分享失败!',
									icon: 'none'
								})
								console.log("fail:" + JSON.stringify(err));
							}
						});
					} else if (type == '复制链接') {
						// #ifndef H5
						uni.setClipboardData({
							data: href,
							success: function() {
								me.$store.state.isMe = true
								uni.showToast({
									title: '复制成功',
									duration: 1500,
									icon: 'none'
								})
							}
						});
						// #endif
						// #ifdef H5
						let input = $('#shareHref input');
						input.val(href);
						input.select();
						document.execCommand("Copy");
						uni.showToast({
							title: '复制成功',
							duration: 1500,
							icon: 'none'
						})
						// #endif
					}
				}
			},

			_AxiosAsync(pURI, pData) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: pURI,
						data: pData,
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							resolve(res)
						},
						fail: err => {
							reject(err)
						}
					})
				})
			},
			async _axios() {
				clearTimeout(this._setTime1)

				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'bargain',
					goods_id: this.proId,
					attr_id: this.attr_id,
					order_no: this.order_no,
					bargain_id: this.bargain_id,
				}
				if (this.friend) {
					data.m = 'getgoodsdetail';
					data.isHelp = 1;
				} else if (this.brStatus == 0) {
					data.m = 'createbargain';
				} else {
					data.m = 'getgoodsdetail';
				}

				let res = await this._AxiosAsync(uni.getStorageSync("url"), data)
				if (res.data.code == 200) {
					await this.setTimeData(res.data.list)
					this.brPrice = res.data.bargain_money
					this.help_list = res.data.help_list

					this.list = res.data.list

					if (!this.list.selfstatus && this.list.selfstatus != 0) {
						console.log('--------------ssss--------' + this.list.selfstatus)
						this.list.selfstatus = this.list.status
					}

					this.loseEfficacy = res.data.loseEfficacy;
					this.bargain_id = res.data.list.bargain_id;
					if (this.brStatus != 0 && res.data.islogin == 0) {
						this.islogin = false
					}

					this.user_name = res.data.help_list[0].user_name
					this.headimgurl = res.data.help_list[0].headimgurl

					if (res.data.list.sNo_id) {
						this.order_id = res.data.list.sNo_id
					}
					if (this.brStatus == 0) {
						this.bargain_id = res.data.list.bargain_id
						if (res.data.order_no && res.data.order_no != 'undefined') {
							console.log('----------o1-------' + this.order_no)
							this.order_no = res.data.order_no
						}
					}
					if (res.data.status == 500) {
						if (res.data.message) {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
						this.cogDiv = false
					} else {
						this.cogDiv = true
					}
					this.self = res.data.self;
					if (this.friend) {
						if (res.data.status == 500) {
							this.friendOver = true
							this.cogDiv = false
						}
					}
				} else if (res.data.code == 404) {
					this.brPrice = res.data.bargain_money
					this.help_list = res.data.help_list
					console.log('status======================404');
					console.log(res.data)
					this.list = res.data.list
					this.setTimeData(res.data.list)
					this.loseEfficacy = res.data.loseEfficacy;
					console.log('404end');
					if (!res.data.help_list) {
						this.islogin = false;
						this.$refs.lktAuthorizeComp.handleAfterAuth(this, '../../pages/login/login?landing_code=1');
					} else {
						this.self = res.data.help_list[0];
						this.user_name = res.data.help_list[0].user_name
						this.headimgurl = res.data.help_list[0].headimgurl
					}
					
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none'
					})
				}
				console.log(this.brPrice + '-----弹窗！-------' + this.cogDiv)
				this.help_num = this.help_list.length
			},
			async setTimeData(data) {
				var self = this;
				var groupList = data
				try {
					groupList.leftTime;
				} catch (e) {
					return false;
				}

				var t = groupList.leftTime - 1;
				var d = Math.floor(t / 60 / 60 / 24);
				var h = Math.floor((t / 3600) - (d * 24));
				var m = Math.floor((t - h * 60 * 60 - d * 24 * 60 * 60) / 60);

				var s = t % 60;
				if (h < 10) h = "0" + h;
				if (m < 10) m = "0" + m;
				if (s < 10) s = "0" + s;

				groupList.hour = h
				groupList.mniuate = m
				groupList.second = s
				groupList.day = d

				if (groupList.leftTime <= 0) {
					groupList.hour = "00"
					groupList.mniuate = "00"
					groupList.second = "00"
					groupList.day = ''
				}

				self.list = groupList
				clearTimeout(self._setTime1)
				self._setTime1 = setTimeout(function() {
					try {
						groupList.leftTime;
					} catch (e) {
						return false;
					}

					var t = --groupList.leftTime;
					var d = Math.floor(t / 60 / 60 / 24);
					var h = Math.floor((t / 3600) - (d * 24));
					var m = Math.floor((t - h * 60 * 60 - d * 24 * 60 * 60) / 60);

					var s = t % 60;
					if (h < 10) h = "0" + h;
					if (m < 10) m = "0" + m;
					if (s < 10) s = "0" + s;

					groupList.hour = h
					groupList.mniuate = m
					groupList.second = s
					groupList.day = d

					if (groupList.leftTime <= 0) {
						groupList.hour = "00"
						groupList.mniuate = "00"
						groupList.second = "00"
						groupList.day = ''
					}
					self.list = groupList
					self.setTimeData(data)

				}, 1000)
			},
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
			width1: function() {
				this.a = this.list.success_money / this.list.free_money * 100
				return this.a + '%';
			},
		},
		components: {
			heads,
			wxParse
		}
	}
</script>

<style scoped>
	@import url("../../static/css/bargain/bargainIng.css");
</style>
