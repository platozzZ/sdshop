<template>
	<div ref='cart' class="order_ii">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<!-- #ifndef MP -->
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<!-- #endif -->

		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中…</p>
			</div>
		</div>
		<div v-else style="position: relative;">
			<!-- #ifndef MP -->
			<div class='page_title'>
				<div class="header" :style="{top:halfWidth}">
					<span class='span'>购物车</span>
					<div v-if="goods.length" @tap="_manage">{{manage_text}}</div>
				</div>
			</div>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<div class='statusDiv' v-if="goods.length" @tap="_manage">{{manage_text}}</div>
			<!-- #endif -->

			<div class='loginDiv' v-if="!access_id1&&!nrlflag">
				<div class='loginText'>登录后同步购物车中的商品</div>
				<div class='loginBtn' @tap='toLogin()'>登录</div>
			</div>
			<!--  有商品时显示   -->
			<ul class='goods' v-if="goods.length">
				<!-- 店铺名称 -->
				<div v-for="(item1,index1) in mch_list" :key="index1">
					<!-- 店铺之间分割线 -->
					<div v-if='index1>0' class='hr'></div>
					<div class="shop-name" :key="'a'+item1.index1">

						<image class="img1" @tap="_selectAllStore(item1,index1)" :src="display_img1[index1] ? quan_hei : quan_hui"></image>
						<image class="img2" :src="store"></image>
						
						<p @tap='toStore(item1.id)'>{{item1.name}}</p>
						<span @tap='toStore(item1.id)'>
							<image class="img3" :src="jiantou2x"></image>
						</span>
					</div>
					<view class="line">
						<view class="line-gray"></view>
					</view>

					<template v-for="(item,index) in goods">
						<li v-if="item1.id === item.mch_id" :key='index'>

							<img class='store_img1' :src="display_img[index] ? quan_hei:quan_hui" @tap="_checkedOne(item, index, item1, index1)" />

							<div class='store_img'>
								<img class='goods_img' :src="item.imgurl" @tap="_goodsDetailed(item.pid)" />
							</div>

							<div class='goods_right'>
								<div>
									<p class='good_name' @tap="_goodsDetailed(item.pid)">{{item.pro_name}}</p>
									<div class='goodDetail' @tap="_mask_display(item.stock,item.price,item.imgurl,item.id,item.attribute_id)">
										<!-- <span style='margin-right: 10upx;'>{{item.skuBeanList[index].name}}</span> -->
										<div v-for="(item5,index5) in item.skuBeanList">{{ item5.name }}</div>
										<img class='img_X' :src='jianX' />
									</div>
								</div>

								<div class='goods_bottom'>
									<p class='black'>
										<span class='price'>￥</span>
										<span class='price1'>{{item.price}}</span>
									</p>
									<div class='goods_mun'>
										<span class='border-right'>
											<img :src="item.num == 1 ? jian_hui : jian_hei" @tap="_reduce(index,item.id)" />
										</span>

										<span class='mun' :class='[item.num==1?"mun1":""]'>{{item.num}}</span>

										<span class='border-left'>
											<img :src='item.num >= 1 ?jia_hei:jia_hui' @tap="_add(index,item.stock,item.id)" />
										</span>

									</div>
								</div>

							</div>

							<view class="line line-top">
								<view class="line-gray"></view>
							</view>
						</li>
					</template>
				</div>
			</ul>
			<div :style="{marginBottom:h5Height}" class="bottom" v-if="goods.length&&!load">
				<div class='bottom_left' @tap=" _selectAll">
					<img class='quan_img' :src="selectAll ? quan_hei : quan_hui" />
					<span>全选</span>
				</div>
				<div class='bottom_right'>
					<span class='span' v-if='manage'>合计：<span class='red'>￥{{total}}</span></span>
					<div @tap="_delete">
						{{manage_pay}}
						
						<span v-if="manage_text == '编辑'">({{count}})</span>
					</div>
				</div>
			</div>
			<!--  没有商品时显示   -->
			<div class='empty' v-if="!goods.length&&!load">
				<img :src="kong" />
				<p>购物车是空的</p>
				<div @tap='toHome()' class='toHomeBtn'>去逛逛</div>
			</div>
			<div class='discover_tj'>
				<div class='discover_left'>
					<i></i>
				</div>
				<p>为你推荐</p>
				<div class='discover_right'>
					<i></i>
				</div>
			</div>
			<ul class='allgoods'>
				<li class="allgoods_li" v-for='(items,index) in list' @tap="_goods(items.id)" :key='index'>
					<img class='allgoods_li_img' :src="items.imgurl" />
					<p class='allgoods_li_title'>{{items.product_title}}</p>
					<p class='allgoods_li_subtitle'>{{items.subtitle}}</p>
					<div @tap.stop="shopping_j(items.id)">
						<span class='allgoods_price'>
							<span class='allgoods_price_money'>￥</span>
							<span class='allgoods_price_data'>{{items.price}}</span>
						</span>
						<img class='allgoods_shopImg' :src="shopImg" />
					</div>
				</li>
			</ul>
			<!-- #ifdef H5 -->
			<div class='h_100'></div>
			<!-- #endif -->
			<div class='white_line'></div>
			<maskM :content='content' :display='display' v-on:mask_value='_mask_value'></maskM>

			<!--  遮罩  -->
			<div class='mask' @touchmove.stop.prevent v-if='mask_display1'>
				<div class="mask_d" :style='{marginBottom:h5Height}'>
					
					
					<div class='mask_guige'>
						<div class='mask_one'>
							<div>
								<img class="shangp" :src="imgurl" />
							</div>
							<div class='mask_pric'>
								<p class='red'>￥<span>{{price}}</span></p>
								<p class='hui'>库存{{num}}</p>
							</div>
							<img class="cha" :src="closeImg" @tap="_mask_f()" />
						</div>
						<div class="mask_over">
							
							<scroll-view scroll-y style="height: 100%;">
								<div class='mask_two' v-for='(item,indx) in attrList' :key="indx">
									<p>{{item.attrName}}</p>
									<ul>
										<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']"
										 @tap='showState(index,indx)'>
											<view>{{ items.attributeValue }}</view>
										</li>
									</ul>
								</div>
								<div class='mask_num'>
									<p>数量</p>
									<div class='goods_mun'>
										<span class='border-right'>
											<img :src="numb == 1?jian_hui:jian_hei" @tap="changeStock(1)" />
										</span>
										<span class='mun'>{{ numb }}</span>
										<span class='border-left'>
											<img :src='numb > num?jia_hei:jia_hui' @tap="changeStock(2)" />
										</span>
									</div>
								</div>
							</scroll-view>
						</div>
					</div>
					<div class='queren_div'>
						<div class='mask_quren' @tap="_confirm1()">确认</div>
					</div>
				</div>
				<div class='white_line'></div>
			</div>
			<div class='mask' @touchmove.stop.prevent v-if='mask_display'>
				<div class="mask_d" :style='{marginBottom:h5Height}'>
					<div class='mask_guige'>
						<div class='mask_one'>
							<div>
								<img class="shangp" :src="imgurl" />
							</div>
							<div class='mask_pric'>
								<p class='red'>￥<span>{{price}}</span></p>
								<p class='hui'>库存{{num}}</p>
							</div>
							<img class="cha" :src="closeImg" @tap="_mask_false" />
						</div>
						<div class="mask_over">
							<scroll-view scroll-y style="height: 100%;">
								<div class='mask_two' v-for='(item,indx) in attrList' :key='item.id'>
									<p>{{item.attrName}}</p>
									<ul v-if="num==0">
										<li v-for='(items,index) in item.attr' :key='index' @tap='showState(index,indx)'>
											<view>{{items.attributeValue}}</view>
										</li>
									</ul>
									<ul v-else>
										<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']"
										 @tap='showState(index,indx)'>
											<view>{{items.attributeValue}}</view>
										</li>
									</ul>
								</div>
							</scroll-view>
						</div>
					</div>
					<div class='queren_div'>
						<div class='mask_quren' @tap="_confirm(num)">确认</div>
					</div>
				</div>
				<div class='white_line'></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage.js'
	import Bottom from '../../components/bottom.vue'
	import maskM from '../../components/maskM.vue'
	import lktauthorize from '../../components/lktauthorize.vue'

	export default {
		data() {
			return {
				numb: 1,
				access_id1: false,
				nrlflag: false, //是否开启授权登录
				shopImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/shopping2x.png',
				closeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/guanbi2x.png',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				kong: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/shopping3x.png',
				jianX: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jianX.png',
				jiantou2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				store: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/store.png',
				bottom: 3,
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/xuanzehei2x.png',
				jian_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jianhui2x.png',
				jian_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jian2x.png',
				jia_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jia+2x.png',
				jia_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/add+2x.png',
				manage: true, //编辑、管理状态
				manage_text: '编辑',
				manage_pay: '去结算',
				content: '确认删除选中的商品吗？', //给遮罩层传值
				mask_value: '', //接收遮罩层传过来的值
				display: false, //遮罩层显示状态
				display_img1: [], //店铺圆圈的选中状态
				display_img: [], //圆圈的选中状态
				selectArray: [], //存储选中商品
				selectStore: [], //存储选中店铺
				selectStoreArray: [], //存储店铺中选中的商品
				storeArray: [], //按店铺分商品
				goods: [], //初始化页面的商品数量
				selectAll: false, //全选状态
				access_id: '',
				load: true,
				mask_display: false, //规格显示隐藏和显示
				mask_display1: false,
				attribute_id: '',
				attrList: '',
				skuBeanList: '',
				num: '', //规格数量
				price: '', //规格价格
				imgurl: '', //规格图片
				haveSkuBean: '', //选择规则属性
				shopping_id: '', //单个商品购物车id
				jia_img: [],
				list: [],
				mch_list: [],
				fastTap: true,
			}
		},
		onLoad() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			let needRegister = uni.getStorageSync("needRegister");
			// 判断是否是授权登录
			this.nrlflag = (needRegister == this.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);
		},
		onTabItemTap(e) {
			this.LaiKeTuiCommon.closeMPAuthWin(this);
		},
		onShow() {
			// #ifndef H5
			uni.showTabBar()
			// #endif
			this.display = false
			let me = this;
			me.LaiKeTuiCommon.getUrlFirst(me._axios);
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			let needRegister = uni.getStorageSync("needRegister");
			// 判断是否是授权登录
			this.nrlflag = (needRegister == this.LaiKeTuiCommon.LKT_NRL_TYPE.NRL);
			for (var i = 0; i < this.goods.length; i++) {
				this.display_img[i] = false
			}
			this.selectArray = []
			for (var i = 0; i < this.mch_list.length; i++) {
				this.display_img1[i] = false
			}
			this.selectStore = []

			this.manage_text = '编辑'
			this.manage_pay = '去结算'
			this.selectAll = false
			this.manage = true
			//启动时就往数组原型中绑定方法
			//给数组原型绑定返回指定值索引的方法
			Array.prototype.indexf = function(val) { //prototype 给数组添加属性
				for (var i = 0; i < this.length; i++) { //this是指向数组，this.length指的数组类元素的数量
					if (this[i] == val) return i; //数组中元素等于传入的参数，i是下标，如果存在，就将i返回
				}
				return -1;
			};
			//给数组原型绑定删除指定值的方法（配合上一种方法用）
			Array.prototype.upxove = function(val) { //prototype 给数组添加属性
				var index = this.indexf(val); //调用index()函数获取查找的返回值
				if (index > -1) {
					this.splice(index, 1); //利用splice()函数删除指定元素，splice() 方法用于插入、删除或替换数组的元素
				}
			}
		},
		methods: {
			toStore(id){
				console.log(11)
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id='+id
				})
			},
			changeLoginStatus() {
				var me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			// 增加减少购买数量
			changeStock(type) {
				if (this.haveSkuBean) {
					if (type == 1) {
						this.numb > 1 ? this.numb-- : this.numb == 1
					} else if (type == 2) {
						if (this.numb < Number(this.num)) {
							this.numb++
						} else {
							uni.showToast({
								title: '已经超过购买限额',
								duration: 1000,
								icon: 'none'
							})
						}
					}
				} else {
					uni.showToast({
						title: '请先选择商品规格',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			// 点击确定购买之后，如果库存不为零。则运行
			_shopping(id) {
				var me = this
				if (this.haveSkuBean) {
					var data = {
						module: 'app',
						action: 'product',
						app: 'add_cart',
						pro_id: this.proid,
						attribute_id: this.haveSkuBean.cid,
						num: this.numb,
						type: 'addcart',
						access_id: this.$store.state.access_id
					}

					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							// if(res.data.code==404){
							//   request(me)
							//   return
							// }
							console.log(res)
							let {
								data: {
									code,
									data,
									message
								}
							} = res
							console.log(code, message)
							if (code == 200) {
								uni.showToast({
									title: '添加成功，在购物车等您哦~',
									duration: 1000,
									icon: 'none'
								})
								me.access_id = data.access_id
								me.$store.state.access_id = data.access_id

								this.fastTap = true
								me._axios()
								me.haveSkuBean = ''
								me._mask_f()
							} else {
								console.log(message)
								this.fastTap = true
							}
						},
						error: function(err) {
							console.log(err)
							this.fastTap = true
						}
					});
				} else {
					console.log(me.haveSkuBean)
					this._mask_display()
					this.fastTap = true
				}
			},
			// 为你推荐商品右下角的小购物车图标
			shopping_j(id) {
				var me = this
				console.log(this.fastTap)
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				this.proid = id
				var data = {
					module: 'app',
					action: 'product',
					app: 'index',
					pro_id: id,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						// if(res.data.code==404){
						//   request(me)
						//   return
						// }
						me.fastTap = true
						console.log(res)
						let {
							data: {
								data: {
									collection_id,
									pro,
									comments,
									attrList,
									skuBeanList,
									qj_price,
									type
								}
							}
						} = res
						me.ys_price = qj_price
						me.price = qj_price
						// me.goods=
						me.attrList = attrList
						console.log(me.attrList)
						me.skuBeanList = skuBeanList
						me.collection = type
						me.imgurl = pro.img_arr[0]
						me.num = pro.num
						me._spec()
						// me._mask_display()
						me.mask_display1 = true
						me.numb = 1
					},
					error: function(err) {
						console.log(err)
						me.fastTap = true
					}
				});

			},
			// 跳转至为你推荐的商品详情
			_goods(id) {
				this.$store.commit('SET_PRO_ID', id)
				console.log(this.$store.state.pro_id);
				uni.navigateTo({
					url: '../goods/goodsDetailed'
				})
			},
			// 登录
			toLogin() {
				uni.navigateTo({
					url: '../login/login?landing_code=1'
				});
			},
			//打开遮罩层
			toHome() {
				uni.switchTab({
					url: '../tabBar/home'
				})
			},
			// 购物车商品中，点击规格
			_mask_display(stock, price, imgurl, id, attribute_id) {
				console.log(attribute_id)
				this.shopping_id = id
				this.haveSkuBean = ''
				let me = this
				this.mask_display = true
				// this.$refs.cart.style.overflow = 'hidden'
				// this.$refs.cart.style.height = '100%'
				var data = {
					module: 'app',
					action: 'cart',
					app: 'dj_attribute',
					access_id: this.access_id,
					pro_id: id,
				}
				if (this.access_id) {
					data.cart_id = id
				} else {
					data.cart_id = id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						// if(res.data.code==404){
						//   request(me)
						//   return
						// }
						console.log(res)
						let {
							data: {
								data
							}
						} = res
						console.log(data)
						me.attrList = data[0].attrList
						me.skuBeanList = data[0].skuBeanList
						me._spec()
						console.log(me.skuBeanList)
						let index
						for (let i = 0; i < me.skuBeanList.length; i++) {
							if (me.skuBeanList[i].cid == attribute_id) {
								index = i
							}
						}
						me._first(index)
						console.log(index)
					}
				})
			},
			// 选择规格之后
			_first(index) {
				var attrListIn = this.attrList;
				var skuBeanListIn = this.skuBeanList;
				var select_list = skuBeanListIn[index];
				for (var i = 0; i < attrListIn.length; i++) {
					for (var j = 0; j < attrListIn[i].attr.length; j++) {
						for (var b = 0; b < select_list.attributes.length; b++) {
							if (select_list.attributes[b].attributeId == attrListIn[i].attr[j].attributeId && select_list.attributes[b].attributeValId ==
								attrListIn[i].attr[j].id) {
								attrListIn[i].attr[j].select = true;
							}
						}
					}
				}
				this.price = select_list.price
				this.imgurl = select_list.imgurl
				this.num = select_list.count
				this.haveSkuBean = select_list
				console.log(select_list)
			},
			// 关闭遮罩层
			_mask_f() {
				this.haveSkuBean = ""
				this.mask_display1 = false
			},
			//关闭遮罩层
			_mask_false() {
				this.mask_display = false
				// 				this.$refs.cart.style.overflow = 'auto'
				// 				this.$refs.cart.style.height = '100%'
			},
			// 遮罩层中，点击确认按钮
			_confirm1() {
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				if (Boolean(this.haveSkuBean)) {
					if (this.num == 0) {
						uni.showToast({
							title: '库存不足',
							duration: 1000,
							icon: 'none'
						})
						this.fastTap = true
					} else if (this.num != 0) {
						this._shopping()
					}

				} else {
					if (this.num == 0) {
						uni.showToast({
							title: '库存不足',
							duration: 1000,
							icon: 'none'
						})
						this.fastTap = true
					} else {
						uni.showToast({
							title: '请选择完整的商品规格！',
							duration: 1000,
							icon: 'none'
						})
						this.fastTap = true
					}
				}
				console.log(this.haveSkuBean)
			},
			//确认
			_confirm(num) {
				if (num == 0) {
					uni.showToast({
						title: '该产品规格库存不足！',
						duration: 1000,
						icon: 'none'
					})
					return
				}
				var me = this
				if (Boolean(this.haveSkuBean)) {
					let data = {
						module: 'app',
						action: 'cart',
						app: 'modify_attribute',
						access_id: this.access_id,
						cart_id: this.shopping_id,
						attribute_id: this.haveSkuBean.cid
					}
					console.log(this.haveSkuBean)
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							// if(res.data.code==404){
							//   request(me)
							//   return
							// }
							console.log(res)
							let {
								data: {
									code,
									message
								}
							} = res
							console.log(code, message)
							if (code == 200) {
								me._mask_false()
								me._axios()
							} else {
								console.log(message)
							}
						}
					})
				} else {
					uni.showToast({
						title: '请选择完整的商品规格！',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			// sku运算
			_spec() {
				const me = this
				var attrListIn = me.attrList;
				var skuBeanListIn = me.skuBeanList;
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
					for (var z = 0; z < skuBeanListIn.length; z++) {
						var ism = true;
						var skuBean = skuBeanListIn[z];
						for (var j = 0; j < attrsOtherSelect.length; j++) {
							var enable = false;
							for (var k = 0; k < skuBean.attributes.length; k++) {
								var goodAttrBean = skuBean.attributes[k];
								if (attrsOtherSelect[j].attributeId == goodAttrBean.attributeId &&
									attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
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
					for (let s = 0; s < attrListBig.attr.length; s++) {
						let attrItem = attrListBig.attr[s];
						attrItem.enable = Number(skuBeanListIn[s].count);
						// 这里需修改，如何改变enabale的真假
					}
				}
				// 重新赋值
				me.attrList = attrListIn,
				me.skuBeanList = skuBeanListIn
			},
			//选择属性
			showState(index, indx, stock, price) {
				console.log(index, indx)
				var listItem = this.attrList;
				var items = listItem[indx];
				var item = items.attr[index];
				console.log(item);
				if (!item.enable) {
					console.log('return')
					return;
				}
				console.log(item.enable, item.select);
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
				console.log(haveSkuBean)
				if (haveSkuBean.length != 0) {
					console.log(haveSkuBean[0])
					this.num = haveSkuBean[0].count;
					this.price = haveSkuBean[0].price;
					this.imgurl = haveSkuBean[0].imgurl
					this.haveSkuBean = haveSkuBean[0]
					/*console.log(this.haveSkuBean)*/
				} else {
					if (stock) {
						this.num = stock
					} else {
						if (this.goods.length > 1) {
							this.num = this.goods[index] ? this.goods[index].stock : ''
						} else if (this.skuBeanList) {
							this.num = this.skuBeanList[index].count
						}
					}
					if (price) {
						this.price = price
					} else {
						if (this.goods.length > 1) {
							this.num = this.goods[index] ? this.goods[index].price : ''
						} else if (this.skuBeanList) {
							// this.num = this.skuBeanList[index].price
						}
					}
					this.haveSkuBean = ''
				}

				// 重新赋值
				this.attrList = listItem
				/*infoText: canGetInfoLog,*/

				// 重新sku运算
				this._spec()
			},
			_axios() {
				var me = this
				this.goods = []
				
				if(!me.load){
					uni.showLoading({
						title: '请稍后...'
					})
				}
				
				var data = {
					module: 'app',
					action: 'cart',
					app: 'index',
					cart_id: me.$store.state.nCart
				}
				if (this.access_id) {
					data.access_id = this.access_id
				} else {
					data.access_id = ''
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						if(!me.load){
							uni.hideLoading();
						}
						
						let {
							data: {
								code,
								data,
								list,
								mch_list,
								login_status,
								message
							}
						} = res
						if (login_status != 0) {
							console.log("login_status!=0");
							me.access_id1 = true
						} else {
							console.log("login_status!=0else");
							me.access_id1 = false
						}
						if (res.data.code == 404) {
							console.log("res.data.code==404");
							me.access_id1 = false
							//   request(me)
							//   return
						}
						if (code == 200) {
							me.goods.push(...data)
							me.list = list
							me.mch_list = mch_list
							// 计算购物车商品总数量
							this._cartAllNum()
							// 按店铺分商品
							this._productDividedByStore()
							console.log('goods')
							console.log(this.goods)
							console.log('mch_list')
							console.log(this.mch_list)
						} else {
							me.goods = []
						}
						me.load = false
					},
					error: function(err) {
						console.log(err, 123)
					}
				})
			},
			...mapMutations({
				cart_id: 'SET_CART_ID',
				pro_id: 'SET_PRO_ID',
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				cart_num: 'SET_CART_NUM'

			}),
			//数量减少
			_reduce(index, id) {
				var num = this.goods[index].num;
				if (this.goods[index].num <= 1) {
					this.goods[index].num = 1;
					uni.showToast({
						title: '该宝贝不能减少了哟！',
						duration: 1000,
						icon: 'none'
					})
					return false
				} else {
					this.goods[index].num--
					this._munajax(this.goods[index].num, id)
					// 计算购物车总数量
					this._cartAllNum()
				}
			},
			//数量增加
			_add(index, stock, id) {
				console.log(this.num, stock)
				let num = this.num ? this.num : stock
				if (Number(this.goods[index].num) < Number(num)) {
					this.goods[index].num++
					this._munajax(this.goods[index].num, id)
					this.jia_img = true
					// 计算购物车总数量
					this._cartAllNum()
				} else {
					this.jia_img = false
					uni.showToast({
						title: '数量已达到上线哦！',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			in_array(stringToSearch, arrayToSearch) {
				for (let s = 0; s < arrayToSearch.length; s++) {
					let thisEntry = arrayToSearch[s].toString();
					if (thisEntry == stringToSearch) {
						return true;
					}
				}
				return false;
			},
			_munajax(goods, id) {
				var me = this
				let arr = {
					num: goods,
					cart_id: Number(id)
				}
				let data = {
					module: 'app',
					action: 'cart',
					app: 'up_cart',
					access_id: this.access_id,
					goods: JSON.stringify(arr),
				}
				// 				if(this.access_id){
				// 					data.cart_id=cart_id
				// 				}
				// 				else{
				// 					data.cart_id=this.$store.state.nCart
				// 				}
				console.log(data)
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						// if(res.data.code==404){
						//   request(me)
						//   return
						// }
					}
				})
			},
			//编辑管理状态
			_manage() {
				this.manage = !this.manage
				if (this.manage) {
					this.manage_text = '编辑'
					this.manage_pay = '去结算'
				} else {
					this.manage_text = '完成'
					this.manage_pay = '删除商品'
				}
			},
			//节奏遮罩层传值
			_mask_value(mask_value) {
				uni.showTabBar()
				var me = this
				this.mask_value = mask_value
				var cart_id = []
				var cart_str = ""
				for (var i = 0; i < this.selectArray.length; i++) {
					cart_id.push(Number(this.selectArray[i].id))
					cart_str = cart_str + Number(this.selectArray[i].id) + ",";
				}
				if (mask_value == '取消') {
					this.display = false
				} else if (this.manage_pay == '删除商品' && this.mask_value == '确认') {

					// #ifdef MP-ALIPAY
					cart_id = cart_str
					// #endif

					var data = {
						module: 'app',
						action: 'cart',
						app: 'delcart',
						access_id: this.access_id
					}

					// #ifdef MP-BAIDU
					for (let i in cart_id) {
						data[`cart_id[${i}]`] = cart_id[i]
					}
					// #endif

					// #ifndef MP-BAIDU
					data['cart_id'] = cart_id
					// #endif
					
					me.display_img1 = []
					console.log('删除商品', data)
					
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {

							if (res.data.code != 200) {
								uni.showToast({
									title: res.data.err,
									duration: 1500,
									icon: 'none'
								})
							}
							console.log(res)
							me.manage_text = '编辑'
							me.manage_pay = '去结算'
							me.manage = true
							me.selectAll = false
							me.selectArray = []
							for (var i = 0; i < me.goods.length; i++) {
								me.$set(me.display_img, i, false)
							}
							for (var i = 0; i < cart_id.length; i++) {
								var n = me.$store.state.nCart.indexOf(cart_id[i])
								if (n > -1) {
									me.$store.state.nCart.splice(n, 1);
								}
							}
							console.log(me.$store.state.nCart)
							me.display = false
							me._axios()
							// 计算购物车总数量
							me._cartAllNum()
						}
					})
				} else {
					console.log(5)
				}
			},
			//删除商品
			_delete() {
				console.log('删除商品')
				var me = this
				if (this.manage_pay == '删除商品' && this.selectArray.length > 0) {
					this.display = true
					// 					this.$refs.cart.style.height = '100%'
					// 					this.$refs.cart.style.overflow = 'hidden'
					// #ifndef H5
					uni.hideTabBar()
					// #endif
				} else if (this.manage_pay == '删除商品') {

					uni.showToast({
						title: '请选择您需要删除的商品！',
						duration: 1000,
						icon: 'none'
					})

				}

				if (this.manage_pay == '去结算' && this.selectArray.length > 0) {

					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
						var cart_id = [];
						var goods = [];
						for (var i = 0; i < me.selectArray.length; i++) {
							cart_id.push(me.selectArray[i].id)
							goods.push({
								num: me.selectArray[i].num,
								cart_id: Number(me.selectArray[i].id)
							})
						}
						var data = {
							module: 'app',
							action: 'cart',
							app: 'up_cart',
							goods: JSON.stringify(goods),
							access_id: me.access_id,
						}
						console.log(goods)
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: function(res) {
								if (res.data.code == 404) {
									console.log("支付发生异常");
									uni.showToast({
										title: '支付发生异常!',
										icon: 'none',
										duration: 1000
									});
									return
								}
								console.log(res)
								if (res.data.code == 200) {
									me.$store.state.cart_id = cart_id;
									me.cart_id(cart_id)
									me.order_id('')
									me.address_id('')

									// #ifdef H5
									var storage = window.localStorage;
									storage.cart_id = cart_id;
									// #endif

									uni.navigateTo({
										url: '../pay/orderDetailsr?cart_id=' + cart_id + '&canshu=true&returnR=1'
									})
								} else {
									uni.showToast({
										title: '库存不足!',
										icon: 'none',
										duration: 1000
									})
									setTimeout(function() {
										me._axios()
										me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
										for (var i = 0; i < me.goods.length; i++) {
											me.display_img[i] = false
										}
										me.selectArray = []
									}, 1000)
									me.selectAll = false
								}
							}
						})
					});
				} else if (this.manage_pay == '去结算') {
					uni.showToast({
						title: '请选择您需要购买的商品！',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			//单选
			_checkedOne(item, indexli, item1, index1) {
				console.log('单选')
				//给数组原型绑定返回指定值索引的方法
				Array.prototype.indexf = function(val) { //prototype 给数组添加属性
					for (var i = 0; i < this.length; i++) { //this是指向数组，this.length指的数组类元素的数量
						if (this[i] == val) return i; //数组中元素等于传入的参数，i是下标，如果存在，就将i返回
					}
					return -1;
				};
				//给数组原型绑定删除指定值的方法（配合上一种方法用）
				Array.prototype.upxove = function(val) { //prototype 给数组添加属性
					var index = this.indexf(val); //调用index()函数获取查找的返回值
					if (index > -1) {
						this.splice(index, 1); //利用splice()函数删除指定元素，splice() 方法用于插入、删除或替换数组的元素
					}
				};
				var cum = this.selectArray.indexOf(item);
				// 如果是有的话 点击就是取消
				//判断点击的传入的值是否存在数组中，如果没有添加，如果有删除，同时设定选中状态（第一次点击添加进数组，第二次点击从数组中删除）
				if (this.manage_pay == '删除商品') {
					if (cum < 0) {
						// 点击新增
						this.selectArray.push(item);
						this.$set(this.display_img, indexli, true)
					} else {
						// 点击取消
						/*console.log(this.selectArray[indexli].id)*/
						this.selectArray.upxove(item)
						this.$set(this.display_img, indexli, false)
					}
				} else if (this.manage_pay == '去结算') {
					if (cum < 0 && item.stock > 0) {
						// 点击新增
						this.selectArray.push(item);
						this.$set(this.display_img, indexli, true)
					} else if (cum >= 0 && item.stock > 0) {
						// 点击取消
						/*console.log(this.selectArray[indexli].id)*/
						this.selectArray.upxove(item)
						this.$set(this.display_img, indexli, false)
					} else {
						uni.showToast({
							title: '该商品库存不足！',
							duration: 1000,
							icon: 'none'
						})
					}
				}
				//根据产品选状态，设定全选状态
				if (this.selectArray.length == this.goods.length) {
					this.selectAll = true
				} else {
					this.selectAll = false
				}
				//根据产品选状态，设定店铺全选状态
				// 添加或删除店铺选择数组
				if (item.mch_id == item1.id) {
					if (!this.selectStoreArray[index1]) {
						this.selectStoreArray[index1] = []
					}
					var isSlectedInStore = this.selectStoreArray[index1].indexOf(item)
					if (isSlectedInStore < 0) {
						this.selectStoreArray[index1].push(item)
					} else {
						this.selectStoreArray[index1].upxove(item)
					}
					var isSlected = this.selectStore.indexOf(item1)
					console.log('单选所选的店铺和店铺所有内容是否相等', this.selectStoreArray[index1].length == this.storeArray[index1].children.length)
					console.log('这店铺是否被选', isSlected)

					if (this.selectStoreArray[index1].length == this.storeArray[index1].children.length) {
						if (isSlected < 0) {
							this.$set(this.display_img1, index1, true)
							this.selectStore.push(item1)
							console.log('单选店铺加1')
							console.log('单选店铺加1后的selectStorexxxxxxx')
							console.log(this.selectStore)
						}

					} else {
						if (isSlected >= 0) {
							this.$set(this.display_img1, index1, false)
							this.selectStore.upxove(item1)
							console.log('单选店铺-1')
							console.log('单选店铺-1后的selectStorexxxxxxx')
							console.log(this.selectStore)
						}

					}

				}
			},
			//全选
			_selectAll() {
				var arr = []
				for (var i = 0; i < this.goods.length; i++) {
					if (this.goods[i].stock > 0) {
						arr.push(1)
					}
				}
				if (this.manage_pay == '删除商品') {
					this.selectAll = !this.selectAll;
					if (this.selectAll) {
						for (var i = 0; i < this.goods.length; i++) {
							this.$set(this.selectArray, i, this.goods[i]);
							this.$set(this.display_img, i, true)
						}
						//店铺
						if (this.mch_list) {
							console.log('全选店铺操作1')
							for (var i = 0; i < this.mch_list.length; i++) {
								this.$set(this.selectStore, i, this.mch_list[i]);
								this.$set(this.display_img1, i, true)
								if (this.storeArray.children) {
									if (this.storeArray[i].children) {
										for (var j = 0; j < this.storeArray[i].children.length; j++) {
											if (!this.selectStoreArray[i]) {
												this.selectStoreArray[i] = []
											}
											this.$set(this.selectStoreArray[i], j, this.storeArray[i].children[j]);
										}
									}
								}
							}
						}
					} else {
						this.selectArray = []
						for (var i = 0; i < this.goods.length; i++) {
							this.$set(this.display_img, i, false)
						}
						//店铺
						this.selectStore = []
						this.selectStoreArray = []
						if (this.storeArray) {
							for (var i = 0; i < this.storeArray.length; i++) {
								this.$set(this.display_img1, i, false)
							}
						}
					}
				} else if (this.manage_pay == '去结算') {
					if (arr.length == this.goods.length) {
						this.selectAll = !this.selectAll;
						if (this.selectAll) {
							for (var i = 0; i < this.goods.length; i++) {
								this.$set(this.selectArray, i, this.goods[i]);
								this.$set(this.display_img, i, true)
							}
							//店铺
							if (this.mch_list) {
								console.log('全选店铺操作1')
								for (var i = 0; i < this.mch_list.length; i++) {
									this.$set(this.selectStore, i, this.mch_list[i]);
									this.$set(this.display_img1, i, true)
									if (this.storeArray[i].children) {
										for (var j = 0; j < this.storeArray[i].children.length; j++) {
											if (!this.selectStoreArray[i]) {
												this.selectStoreArray[i] = []
											}
											this.$set(this.selectStoreArray[i], j, this.storeArray[i].children[j]);
										}
									}
								}
							}
							console.log('全选 选择店铺 selectStore')
							console.log(this.selectStore)
							console.log('全选3 selectStoreArray')
							console.log(this.selectStoreArray)
						} else {
							this.selectArray = []
							for (var i = 0; i < this.goods.length; i++) {
								this.$set(this.display_img, i, false)
							}
							//店铺
							this.selectStore = []
							this.selectStoreArray = []
							if (this.storeArray) {
								for (var i = 0; i < this.storeArray.length; i++) {
									this.$set(this.display_img1, i, false)
								}
							}
						}
					} else {
						uni.showToast({
							title: '商品库存不足，不能进行该项操作！',
							duration: 1000,
							icon: 'none'
						})
					}
				}
			},
			// 全选某店铺商品
			_selectAllStore(item, index) {
				console.log('store')
				var storeId = this.mch_list[index].id
				var isSlected = this.selectStore.indexOf(item)
				// 判断此店铺是否被选中
				if (isSlected < 0) {
					// 否 则选中店铺
					for (var j = 0; j < this.goods.length; j++) {
						var cum = this.selectArray.indexOf(this.goods[j]);

						if (storeId == this.goods[j].mch_id) {
							console.log('添加店铺cum', cum)
							if (cum < 0) {
								this.selectArray.push(this.goods[j]);
								this.$set(this.display_img, j, true)
								if (!this.selectStoreArray[index]) {
									this.selectStoreArray[index] = []
								}
								this.selectStoreArray[index].push(this.goods[j])
							}
						}
					}
					this.selectStore.push(item)
					console.log('总选店铺加1')
					this.$set(this.display_img1, index, true)
					console.log('全黑')
					console.log('总选slectArray')
					console.log(this.selectArray)
				} else {
					// 是 则取消店铺
					for (var j = 0; j < this.goods.length; j++) {
						var cum = this.selectArray.indexOf(this.goods[j]);

						if (storeId == this.goods[j].mch_id) {
							console.log('取消店铺cum', cum)
							if (cum >= 0) {
								console.log(this.selectArray)
								console.log(this.goods[j])
								this.selectArray.upxove(this.goods[j]);
								this.$set(this.display_img, j, false)
								if (!this.selectStoreArray[index]) {
									this.selectStoreArray[index] = []
								}
								this.selectStoreArray[index].upxove(this.goods[j])
							}

						}
					}
					this.selectStore.upxove(item)
					console.log('总选店铺-1')
					this.$set(this.display_img1, index, false)
					console.log('全灰')
				}
				console.log('总选后的selectStore---------------')
				console.log(this.selectStore)
				console.log('总选后的selectStoreArray---------------')
				console.log(this.selectStoreArray)
				//根据产品选状态，设定全选状态
				if (this.selectArray.length == this.goods.length) {
					this.selectAll = true
				} else {
					this.selectAll = false
				}
			},
			// 按店铺分商品
			_productDividedByStore() {
				console.log('按店铺分商品')
				if (this.mch_list && this.goods) {
					for (var i = 0; i < this.mch_list.length; i++) {
						if (!this.storeArray[i]) {
							this.storeArray[i] = []
						}
						this.storeArray[i].push(this.mch_list[i])

						if (!this.storeArray[i].children) {
							this.storeArray[i].children = []
						}
						for (var j = 0; j < this.goods.length; j++) {
							if (this.mch_list[i].id == this.goods[j].mch_id) {
								this.storeArray[i].children.push(this.goods[j])
							}
						}
					}
				}
				console.log(this.storeArray)
			},
			_goodsDetailed(pro_id) {
				this.pro_id(pro_id)
				console.log(pro_id)
				uni.navigateTo({
					url: '../goods/goodsDetailed'
				})
			},
			// 计算购物车商品总数量
			_cartAllNum() {
				var data = this.goods
				if (data && data.length) {
					var allnum = 0
					for (var i = 0; i < data.length; i++) {
						allnum += Number(data[i].num);
					}
					this.cart_num(allnum)
				} else if (data.length == 0) {
					this.cart_num(0)
				}
				//添加，移除tabbar购物车小点提醒
				if (this._cart_num) {
					var cart_num_str = String(this._cart_num)
					uni.setTabBarBadge({
						index: 2,
						text: cart_num_str
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
			}
		},
		computed: {
			count: function() {
				var count = 0
				for (var i = 0; i < this.selectArray.length; i++) {
					console.log(Number(this.selectArray[i].num))
					count += Number(this.selectArray[i].num);
				}
				return count
			},
			h5Height: function() {
				var height
				// #ifdef H5
				height = 100 + 'upx'
				// #endif
				// #ifndef H5
				height = 0 + 'upx'
				// #endif
				return height
			},
			h5Height1: function() {
				var height
				// #ifdef H5
				height = 198 + 'upx'
				// #endif
				// #ifndef H5
				height = 100 + 'upx'
				// #endif
				return height
			},
			halfWidth() {
				var gru = getStorage('data_height') ? getStorage('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				// #ifdef MP
				heigh = 0
				// #endif
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
			total() {
				var total = 0;
				for (var i = 0; i < this.selectArray.length; i++) {
					if (this.selectArray[i]) {
						total += new Number(this.selectArray[i].price) * parseInt(this.selectArray[i].num);
					}
				}
				return total.toFixed(2);
			},
			...mapState({
				_cart_num: 'cart_num'
			})
		},
		components: {
			lktauthorize,
			maskM
		},
	}
</script>

<style scoped>
	@import url("../../static/css/tabBar/shoppingCart.css");
</style>
