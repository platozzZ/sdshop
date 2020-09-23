<template>
	<div ref='box'>

		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>

		<!-- #ifndef MP -->
		<div style="height: 88upx;">
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->

		<div class='allgoods_s home_navigation yh-home_navigation' :style="{top:halfWidth}">
			<div class='home_input yh-home_input'>
				<img class='searchImg' :src="serchimg" alt="">
				<input type="text" v-model="searchtxt" id='input' placeholder="请搜索你想要的订单" placeholder-style="color:#999999;font-size: 26upx"
				 name="sourch" />
			</div>
			<div class="yh_seart" @tap='_seart'>搜索</div>
		</div>


		<!--   订单列表     -->
		<template v-if='display'>
			<ul class='order_goods' v-for='(item,index) in list' :key="index">
			
				<li class='order_one'>
					
					<p @tap='_goStore(item.shop_id)' class='shopName'>
						<img :src="storeImg">{{item.ismch?'':item.shop_name}}
						<img :src="jiantou" class="yh-jiantou">
					</p>
					
					<p class="yh-prompt">{{item.prompt}}</p>
				</li>
			
				<li class='order_two'>
					<img :src='item.imgurl' />
					<div class="yh-order_two">
						<p class='order_p_name' style="height: auto;">{{item.p_name}}</p>
						<p class='color_one'>{{item.size}}</p>
					</div>
					<div>
						<p>￥{{item.p_price}}</p>
						<p class='color_two'>x{{item.num}}</p>
					</div>
				</li>
			
			
				<li class='order_last yh-order_last'>
					<!-- <div rich-text="item.re_type==1?'退货退款':'仅退款'"></div> -->
					<div>{{item.re_type==1?'退货退款':item.re_type==2?'仅退款':item.re_type==3&&item.r_type==12?'退换 退换成功':'退换'}}{{item.r_type==4||item.r_type==9?'-已退款':''}}</div>
					<div class='last_right'>
						<div @click="_uni_navigateTo('../../pagesA/afterSale/afterDetail?order_id='+item.order_id+'&status='+item.r_status+'&id='+item.id+'&pid='+item.p_id)">查看详情</div>
						<div v-if="item.r_type==5&&item.re_type==3" @click="">联系客服</div>
						<div v-if="item.r_type==11" @click="ok_order(item)">确认收货</div>
						<div v-if="item.prompt==text[0]" ref='bottom' @tap="_logistics(item.r_type,item.id,item.r_sNo,item.p_id)">{{item.r_type==1?text[1]:(item.r_type==3||item.r_type==11?text[2]:'')}}</div>
					</div>
				</li>
			
			
				<li class="yh-line"></li>
			
			</ul>
		</template>

		<div v-if='!display'>
			<div class='noFindDiv yh-noFindDiv'>
				<div>
					<img class='noFindImg' :src="noOrder" />
				</div>
				<span class='noFindText'>您还没有相关的订单哦</span>
				<div @tap="_toHome()" class="yh-toHome">
					<span class='goHome'>去逛逛</span>
				</div>
			</div>
		</div>


		<!--   订单列表     -->
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>


		<!--  物流信息   -->
		<div class='mask' v-if="logistics_display">

			<div class='logistics' v-if='logistics_f'>
				<img @tap="_close" class='logistics_img' :src="guanbi_img" />
				<div class='logistics_top'>
					<p class='logistics_head'>填写物流信息</p>
					<p>退货地址：{{address.address}} </p>
					<p>退货联系人：{{address.name}} </p>
					<p>退货联系人电话：{{address.phone}} </p>
				</div>
				<div class="yh-lines"></div>
				<ul class="message">
					<li class="flex" @tap='showSinglePicker'>
						<div>
							<span>快递名称</span>
							<input type="text" disabled="true" placeholder="请选择快递名称" v-model="express_name" />
						</div>
						<img class='arrow' :src="jiantou_img" @click="_logistics_name" />
					</li>
					<li>
						<span>快递单号</span>
						<input type="text" placeholder="填写快递单号" v-model="express_number" />
					</li>
					<li>
						<span>联系人&nbsp;&nbsp;&nbsp;</span>
						<input type="text" placeholder="请填写联系人姓名" v-model="contacts" />
					</li>
					<li>
						<span>联系电话</span>
						<input type="number" placeholder="请填写电话号码" v-model="contacts_phone" />
					</li>
				</ul>
				<div class='logistics_but' @tap="_but">提交</div>
				<mpvue-picker v-show='show' :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength"
				 :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
			</div>


			<div class='logistics' v-if="logistics_name">
				<div class='express_head'>
					
					<div class="yh-express_btn" @tap="_cancel">取消</div>
					<div class="yh-express_btn" @tap="_confirm">确认</div>
				</div>
			</div>


		</div>
	</div>
</template>

<script>
	import Heads from "../../components/header.vue"
	import mpvuePicker from '../../components/mpvuePicker.vue'
	import {
		getStorage
	} from '../../common/storage.js'
	import {
		telephone
	} from '../../common/landing.js'

	export default {
		data() {
			return {
				searchtxt: '',
				
				title: '退款/售后',
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				serchimg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/searchh.png',
				noOrder: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/noOrder.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/jiantou2x.png',
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/store.png',
				back_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/back2x.png",
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/loading.gif',
				bback_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/bback.png",
				search_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/search2x.png",
				guanbi_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/guanbi2x.png",
				empyimg_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/empyimg92x.png",
				jiantou_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/jiantou2x.png",
				head: true, //头部切换
				header: ['全部', '待付款', '待发货', '待收货', '待评价'],
				can_page: "",
				sreach_value: '',
				express_name: '',
				express_number: '',
				contacts: '',
				contacts_phone: '',
				slots: [{
					values: [],
					textAlign: 'center'
				}],
				access_id: '',
				list: '', //订单
				display: true,
				logistics_m: '', //是否填写物流信息
				logistics_display: false,
				logistics_name: false,
				logistics_f: true,
				logistics_re: '',
				address: '',
				phone_next: '', //电话号码验证，格式正确为1
				oid: '', //订单详情id
				flag: true, //头部颜色
				show: false,
				text: ['审核通过', '寄回商品', '查看物流'],
				fastTap: true,
				title: '退款/售后',
				page: 1,
				load: true,
			}
		},
		onLoad() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			// this._axios()
		},
		onShow() {
			let me = this;
			
			this._axios("onShow")
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
			});
			
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			}
		},
		methods: {
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
			_seart() {
				var me = this
				if (me.searchtxt == '') {
					uni.showToast({
						title: '请输入搜索关键词',
						duration: 1000,
						icon: 'none'
					})
					return false
				}
				uni.navigateTo({
					url: '../../pages/order/orderSearch?sreach_value=' + me.searchtxt
				})
			},
			/**
			 * 
			 * */
			ok_order(item) {
				var data = {
					module: 'app',
					action: 'order',
					app: 'ok_Order',
					order_id: item.id,
					access_id: this.access_id,
					r_type: 11,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						let {
							data: {
								code,
								message
							}
						} = res
						if (code == 200) {
							uni.showToast({
								title: "收货成功",
								duration: 1500,
								icon: 'none'
							})
							setTimeout(function() {
								_axios()
							}, 1500)
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
					error: function(err) {
						console.log(err)
					}
				})
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
			showSinglePicker() {
				this.show = true
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			/**
			 * 
			 * */
			onConfirm(e) {
				this.express_name = e.label
				console.log(e)
				this.show = false
			},
			/**
			 * 
			 * */
			_uni_navigateTo(url) {
				var me = this
				uni.navigateTo({
					url: url
				})
			},
			/**
			 * 
			 * */
			_homes() {
				uni.switchTab({
					url: '../tabBar/home'
				})
			},
			/**
			 * 
			 * */
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 头部切换
			 * */
			_head() {
				this.head = !this.head
			},
			/**
			 * 物流公司选择
			 * */
			onValuesChange(picker, values) {
				this.logistics_re = values[0]
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
			 * 寄回商品或查看物流
			 * */
			_logistics(index, id, r_sNo, pid) {
				console.log(index)
				this.oid = id
				var me = this
				if (index == 1) { //同意寄回商品
					if (!this.fastTap) {
						return
					}
					this.fastTap = false
					this.logistics_display = true
					//     			this.$refs.box.style.height = '100vh'
					//     			this.$refs.box.style.overflow = 'hidden'
					var data = {
						module: 'app',
						action: 'order',
						app: 'see_send',
						access_id: this.access_id,
						pid,
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							me.fastTap = true
							if (res.data.code == 200) {
								let {
									data: {
										address,
										express,
										name,
										phone
									}
								} = res
								console.log(address, express, name, phone)
								me.address = {
									address: address,
									name: name,
									phone: phone
								}
								for (var key in express) {
									me.pickerValueArray.push(express[key].kuaidi_name)
								}
							} else {
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						},
						error: function(err) {
							me.fastTap = true
							console.log(err)
						}
					})
				} else if (index == 3 || index == 11) { //用户已发货
					//跳转物流页面
					me.fastTap = true
					let data = {
						module: 'app',
						action: 'order',
						app: 'logistics',
						id: r_sNo,
						access_id:this.access_id,
						type:'',
					}
					
					if(this.source == 1){
						data.type = 'pond'
					}
					uni.request({
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data,
						method:'POST',
						success:(res) => {
							uni.hideLoading()
							if(res.data.code == 200){
								let data = res.data.res
								if(data.length>1){
									uni.navigateTo({
										url: '../../pagesB/expressage/expressage?sNo=' + r_sNo,
									})
								}else{
									uni.navigateTo({
										url: '../../pages/expressage/expressage?list='+JSON.stringify(data[0])+'&sNo=' + r_sNo,
									})
								}
							} else {
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						},
						fail:(e) => {
							uni.showToast({
								title: '数据加载失败！',
								duration: 2000,
								icon:'none'
							})
						}
					})
				}
			},
			/**
			 * 选择物流公司
			 * */
			_logistics_name() {
				this.logistics_f = false
				this.logistics_name = true
			},
			/**
			 * 确认
			 * */
			_confirm() {
				this.logistics_f = true
				this.logistics_name = false
				this.express_name = this.logistics_re
			},
			/**
			 * 取消
			 * */
			_cancel() {
				this.logistics_f = true
				this.logistics_name = false
				this.express_name = this.express_name
			},
			/**
			 * 
			 * */
			_close() {
				this.logistics_display = false
			},
			/**
			 * 提交
			 * */
			_but() {
				let me = this
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				console.log('this.express_name' + this.express_name);
				console.log('this.express_number' + this.express_number);
				console.log('this.contacts' + this.contacts);
				console.log('contacts_phone' + this.contacts_phone);
				console.log('contacts_phone.length' + this.contacts_phone.length);
				if (this.express_name && this.express_number && this.contacts && this.contacts_phone.length == 11) {
					console.log(this.contacts, 8888)
					//发送请求
					let data = {
						module: 'app',
						action: 'order',
						app: 'back_send',
						kdcode: this.express_number,
						kdname: this.express_name,
						lxdh: this.contacts_phone,
						lxr: this.contacts,
						oid: this.oid,
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
							me.fastTap = true
							console.log(res)
							let {
								data: {
									code,
									message
								}
							} = res
							if (code == 200) {
								me.logistics_display = false
								uni.showToast({
									title: '提交成功',
									duration: 1000,
									icon: 'none'
								})
								setTimeout(function() {
									me._axios()
								}, 1000)

							} else {
								uni.showToast({
									title: message,
									duration: 1000,
									icon: 'none'
								})
							}
							console.log(code, message)
						},
						error: function(err) {
							console.log(err)
							me.fastTap = true
							uni.showToast({
								title: '请输入正确的信息',
								duration: 1000,
								icon: 'none'
							})
						}
					})

				} else {
					me.fastTap = true
					uni.showToast({
						title: "请填写完整信息！",
						duration: 1000,
						icon: 'none'
					})
				}
			},
			
			/**
			 * 手机号码验证
			 * */
			_telephone() {
				this.phone_next = telephone(this.contacts_phone)
				if (!this.phone_next) {
					this.contacts_phone = ''
				}
			},
			/**
			 * 
			 * */
			_axios(type="") {
				var me = this
				var limit = 0;
				if(type == "onShow" && me.page !=1){
					limit = me.page*10
				}
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'order',
					app: 'ReturnDataList',
					page: me.page,
					limit:limit
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log(res)
						if (res.data.code == 200) {
							let {
								data: {
									list
								}
							} = res
							me.list = list
							me.can_page = res.data.hasp;
							if (list.length > 0) {
								me.display = true
								me.load = false
							} else {
								me.display = false
								me.load = false
							}
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
		},
		onReachBottom: function() {
			var me = this
			var new_page = me.page + 1;
			if (new_page > me.can_page) {
				return false
			}
			
			var data = {
				access_id: this.access_id,
				module: 'app',
				action: 'order',
				app: 'ReturnDataList',
				page: new_page,
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
						let {
							data: {
								list
							}
						} = res
						if (list.length > 0) {
							me.list = me.list.concat(list);
							me.page = me.page + 1;
							me.display = true
						} else {

							me.list = me.list.concat();
							me.display = false
						}

					} else {
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						})
					}
				},
				error: function(err) {
					console.log(err)
				}
			})
		},
		components: {
			mpvuePicker,
			Heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/afterSale/afterSale.css");
</style>
