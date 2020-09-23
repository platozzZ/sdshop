<template>
	<div>
		<!--头部模块-->
		<heads :title='title'></heads>
		<view style="height: 88rpx;">
			<view class="p-search-contaienr p-flex p-align-center p-justify-between">
				<view class="p-search-form">
					<image class='' @tap="_goBack()" :src="serchimg" alt=""></image>
					<input type="text" v-model="searchtxt" placeholder="请输入你想搜索的内容" disabled @tap="handleinput()" @focus.p="handleinput" id='input' :placeholder-style="placeStyle"
					 name="sourch"></input>
				</view>
				<view class="p-search-btn" @tap='_axios'>
					搜索
				</view>
			</view>
			
			<!-- <div class='allgoods_s home_navigation'>
				<div class='home_input'>
					<img class='searchImg' @tap="_goBack()" :src="serchimg" alt="">
					<input type="text" v-model="searchtxt" placeholder="请输入你想搜索的内容" disabled @tap="handleinput()" @focus.p="handleinput" id='input' :placeholder-style="placeStyle"
					 name="sourch" />
				</div>
				<div @tap='_axios'>搜索</div>
			</div> -->
		</view>
		
		<!-- 导航切换栏 -->
		<div style="height: 90rpx;">
			<div class='topTabBar'>
				<div class="tab-pane" @tap="_search(0)">
					<div :class='{"active":!topTabBar}'>
						商品
					</div>
					<view class="xian_d" v-if="!topTabBar?true:false"></view>
				</div>
				
				<div class="tab-pane" @tap="_search(1)">
					<div :class='{"active":topTabBar}'>
						店铺
					</div>
					<view class="xian_d" v-if="topTabBar?true:false"></view>
				</div>
				
			</div>
		</div>
		
		
		<!--搜索商品后商品展示模块 NEW-->
		<view class="p-goods" v-if="!topTabBar">
			<view class="p-empty p-flex p-justify-center p-align-center" v-if='!success'>
				<view class='p-empty_play p-flex p-flex-direction p-justify-center p-align-center'>
					<image :src="empic_img"></image>
					<view>没有找到相关的商品哦~</view>
					<view class="p-empty-btn" @tap="_home">去逛逛</view>
				</view>
			</view>
			<view class="p-goods-list" v-else>
				<view class="p-goods-item" v-for='(items,index) in searchgoods' :key='index' @tap="_goods(items.id)">
					<image class="p-goods-item-headImg" :src="items.imgurl" mode="aspectFit"></image>
					<view v-if="items.status == 3" style="width: 120rpx; height: 120rpx; border-radius: 50%; background-color: rgba(0, 0, 0, 0.6); position: absolute; top: 120rpx; left: 50%; transform: translateX(-50%); color: rgb(255, 255, 255); font-size: 13px; line-height: 60px; justify-content: center;">已下架</view>
					<view class="p-text-cut">{{items.product_title}}</view>
					<view class='p-goods_sub p-text-cut'>{{items.subtitle}}</view>
					<view class="p-response p-flex p-align-center p-justify-between">
						<text class='red'>￥{{items.price}}</text>
						<!-- <span class='volume'>销量：{{items.volume}}</span> -->
						<view class="p-flex p-align-center p-justify-center" @tap.stop="shopping_j(items.id)">
							<image :src="shoppingImg" style="width: 34rpx;height: 34rpx;"></image>
						</view>
					</view>
				</view>
				
				<uni-load-more :loadingType="loadingType" v-if="searchgoods.length>9"></uni-load-more>
			</view>
		</view>
		
		
		<!--搜索商品后商品展示模块-->
		<!-- <ul class='home-hot margin-top' id="margin-top" v-if="!topTabBar">
			<li v-if='!success'>
				<div class='empty_play'>
					<img :src="empic_img" />
					<p>没有找到相关的商品哦~</p>
					<div @tap="_home">去逛逛</div>
				</div>
			</li>
			<li v-else>
				<div class='allgoods_prev'></div>
				<ul class='allgoods'>
					<li class="allgoods_li" v-for='(items,index) in searchgoods' :key='index' @tap="_goods(items.id)">
						<img :src="items.imgurl" />
						<div v-if="items.status == 3" style="width: 120rpx; height: 120rpx; border-radius: 50%; background-color: rgba(0, 0, 0, 0.6); position: absolute; top: 120rpx; left: 50%; transform: translateX(-50%); color: rgb(255, 255, 255); font-size: 13px; line-height: 60px; justify-content: center;">已下架</div>
						<p>{{items.product_title}}</p>
						<p class='allgoods_p'>{{items.subtitle}}</p>
						<div>
							<span class='red'>￥{{items.price}}</span>
							<div @tap.stop="shopping_j(items.id)" style='display: flex;'>
								<img :src="shoppingImg" style="width: 34rpx;height: 34rpx;">
							</div>
						</div>
					</li>
				</ul>
				
				<uni-load-more :loadingType="loadingType" v-if="searchgoods.length>9"></uni-load-more>
			</li>
		</ul> -->
		<div v-if="topTabBar">
			<ul class="shoping" v-if='success'>
				<li v-for="(item, index) in searchgoods" :key="index">
					<div class="box">
						<img :src="item.logo" />
					</div>
					<div class="shop-prop">
						<view class="shop-content">
							<div class="shop-title">{{item.name}}</div>
							<button class="baguette" @tap="_goStore(item.id)">进店</button>
						</view>
						<view class="shop-count">
							<view>
								<p class="sum">{{item.quantity_on_sale}}</p>
								<p class="sum-name">在售商品</p>
							</view>
							<view>
								<p class="sum">{{item.quantity_sold}}</p>
								<p class="sum-name">已售</p>
							</view>
							<view>
								<p class="sum">{{item.collection_num}}</p>
								<p class="sum-name">关注人数</p>
							</view>
						</view>
					</div>
				</li>
			</ul>
			<uni-load-more :loadingType="loadingType" v-if="searchgoods.length>9"></uni-load-more>
			<ul class='home-hot margin-top' id="margin-top">
				<li v-if='!success'>
					<div class='empty_play'>
						<img :src="empic_img" />
						<p>没有找到相关的店铺哦~</p>
						<div @tap="_home">去逛逛</div>
					</div>
				</li>
			</ul>
		</div>
		<div slot="bottom" class="mint-loadmore-bottom">
			<span v-if="bottomStatus === 'pull'">{{bottomPullText}}</span>
			<span v-if="bottomStatus === 'drop'">{{bottomDropText}}</span>
		</div>
		<div class="goods_like_bottom" v-if='loading'>
			<div class='goods_like_hr'></div>
			<span>没有更多了</span>
			<div class='goods_like_hr'></div>
		</div>
		
		
		<!--  遮罩  -->
		<div class='mask' @touchmove.stop.prevent v-if='mask_display1'>
			<div class="mask_d">
				
				
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
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	
	import heads from '@/components/header.vue'
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default {
		data() {
			return {
				title: '搜索结果',
				back_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/back2x.png",
				empic_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/spnull2x.png",
				serchimg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/searchh.png',
				shoppingImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/shopping2x.png',
				host: '',
				searchtxt: '',
				storag: '', //	接收历史记录的值
				prompt: '', //	接收输入提示的值
				searchgoods: '', //接收搜索后商品返回的数据
				success: true, //搜索商品是否有数据返回
				s_type: '', //判断从那个页面进入
				page: 1, //加载页面
				allLoaded: false,
				autoFill: false, //若为真，loadmore 会自动检测并撑满其容器
				bottomStatus: '',
				bottomPullText: '上拉加载更多...',
				bottomDropText: '释放更新...',
				loading: false,
				topTabBar: 0, // 0|1，商品|店铺
				placeStyle: 'color:#999999',
				
				loadingType: 0,
				
				mask_display1: false,
				attribute_id: '',
				attrList: '',
				skuBeanList: '',
				num: '', //规格数量
				price: '', //规格价格
				imgurl: '', //规格图片
				haveSkuBean: '', //选择规则属性
				shopping_id: '', //单个商品购物车id
				closeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/guanbi2x.png',
				jian_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jianhui2x.png',
				jian_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jian2x.png',
				jia_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jia+2x.png',
				jia_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/add+2x.png',
				fastTap: true,
				proid: '',
				numb: 1
			}
		},
		onReachBottom(){
			if (this.loadingType != 0) {
				return;
			}
			this.loadingType = 1
			
			this.page++
			
			var data = {
				module: 'app',
				action: 'search',
				app: 'search',
				num: this.page,
				type: this.topTabBar
			}
			
			this.$req.post({data}).then(res=>{
				let { data,code,message } = res
				if (code==200) {
					this.searchgoods.push(...data);
					
					if(data.length>9){
						this.loadingType = 0
					}else{
						this.loadingType = 2
					}
				}else{
					this.loadingType = 0
					uni.showToast({
						title: message,
						duration: 1500,
						icon: 'none'
					})
				}
			})
		},
		onLoad(option) {
			var me =this;
			this.searchtxt = option.searchtxt;
			this.topTabBar = parseInt(option.topTabBar);
			this.s_type = this.$store.state.type;
			this.$nextTick(function(){
				me._axios();
			})
			
		},
		components: {
			heads,uniLoadMore
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				// #ifdef MP
				heigh=0
				// #endif
				return heigh + 'px';
			}
		},
		methods: {
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
						if (this.searchgoods.length > 1) {
							this.num = this.searchgoods[index] ? this.searchgoods[index].stock : ''
						} else if (this.skuBeanList) {
							this.num = this.skuBeanList[index].count
						}
					}
					if (price) {
						this.price = price
					} else {
						if (this.searchgoods.length > 1) {
							this.num = this.searchgoods[index] ? this.searchgoods[index].price : ''
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
			// 关闭遮罩层
			_mask_f() {
				this.haveSkuBean = ""
				this.mask_display1 = false
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
			// 点击搜索框返回搜索页面
			handleinput() {
				uni.hideKeyboard();
				uni.navigateBack({
					delta: 1
				});
			},
			// 点击搜索图标回到进入搜索功能的页面
			_goBack() {
				uni.navigateBack({
					delta: 2
				});
			},
			// 点击去逛逛回到商城首页
			_home() {
				uni.switchTab({
					url:'../../pages/tabBar/home'
				});
			},
			_axios() {
				var me = this;
				var data = {
					module: 'app',
					action: 'search',
					app: 'search', 
					num: this.page,
					type: this.topTabBar
				}
				data.keyword = this.searchtxt;
				if (this.searchtxt != '') { //搜索框不为空  
					uni.request({
						data,
						url:  uni.getStorageSync("url"),
						success: (res) => {
							console.log(res)
							if (res.data.code == 200) {
								var data = res.data.data;
								if (data.length) {
									me.searchgoods = data;
									me.success = true
									if (me.searchgoods.length < 10) {
										me.allLoaded = true;
									} else {
										me.allLoaded = false;
									}
									
									if(data.length>9){
										me.loadingType = 0
									}else{
										me.loadingType = 2
									}
								} else {
									me.searchgoods = '未找到相关宝贝'
									me.success = false
								}
							} else {
								me.success = false
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						},
						error: function(err) {
							console.log(err)
							me.searchgoods = '加载失败，请重新输入！'
							me.success = false
						},
					})
				}
			},
			// 点击导航切换商品/店铺
			_search(type) {
				this.searchgoods = '';
				this.topTabBar = type;
				this.success = true;
				this.page = 1
				this._axios();
			},
			// 进店
			_goStore(shop_id){
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id='+shop_id
				})
			},
			// 下拉加载
			loadBottom() {
				var me = this
				var data = {
					module: 'app',
					action: 'search',
					app: 'search',
					page: this.page
				}
				if (this.searchgoods.length > 0) {
					uni.request({
						data,
						url:  uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: (res) => {
							if (res.data.code == 200) {
								console.log(res)
								let {
									data: {
										data
									}
								} = res
								me.page += 1
								if (data.length < 10 && data.length > 0) {
									me.searchgoods = me.searchgoods.concat(data);
								} else {
									me.allLoaded = true;
									me.loading = true;
								}
								me.$refs.loadmore.onBottomLoaded();
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
						},
					})
				}
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			/*   跳转商品详情页    */
			_goods(id) {
				this.pro_id(id)
				uni.navigateTo({
					url: '../../pages/goods/goodsDetailed'
				});
			},
			...mapMutations({
				pro_id: 'SET_PRO_ID',
				type: 'SET_TYPE',
				scroll_t: 'SET_SCROLL_T'
			}),
		},
		beforeDestroy() {
			this.type('')
		},
		// 			beforeRouteLeave(to, from, next){
		//   				let position = document.documentElement.scrollTop || document.body.scrollTop
		//   				this.scroll_t(position) //离开路由时把位置存起来
		//   				next()
		// 			},
		updated() {
			this.$nextTick(function() {
				let position = this.$store.state.scroll_t //返回页面取出来
			})
		}
	}
</script>

<style scoped lang="less">
	@import url("../../static/css/search/searchResult.less");
	@import url("../../static/css/pcommon.css");
	.p-search-contaienr{
		padding: 0 30upx;
		height: 88rpx;
		font-size: 28upx;
		position: fixed;
		z-index: 88;
		width: 100%;
	}
	.p-search-form{
		background-color: #f4f4f4;
		line-height: 64upx;
		height: 64upx;
		font-size: 26upx;
		color: #333333;
		flex: 1;
		display: flex;
		align-items: center;
		margin: 0 30upx 0 0;
		border-radius: 10upx;
	}
	.p-search-form image{
		width: 30upx;
		height: 30upx;
		margin: 0 10upx;
	}
	
	.p-search-form input{
		flex: 1;
	}
	.p-goods{
	}
	.p-goods-list{
		background-color: #f8f8f8;
		padding-top: 10upx;
		display:flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.p-goods-item{
		padding: 70upx 20upx 20upx;
		width:49%;
		margin: 0 0 10upx 0;
		background-color: #fff;
		font-size: 30upx;
		/* 这里是防止高度不一致导致下方出现空白 */
		display:flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		/* 这里是防止一开始图片没有加载的时候会挤在一块了 */
		min-height: 548upx;
		position: relative;
	}
	.p-goods-item-headImg{
		width: 220upx;
		height: 220upx;
		margin-bottom: 50upx;
	}
	.p-goods_sub{
		font-size: 22upx;
		color: #9d9d9d;
		margin: 16upx 0 34upx 0;
	}
	
	.p-empty_play{
		font-size: 28upx;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: #888888;
	}
	.p-empty_play .p-empty-btn {
		width: 240upx;
		height: 70upx;
		border-radius: 8upx;
		border: 2upx solid @uni-color-primary-dark;
		font-size: 30upx;
		text-align: center;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: @uni-color-primary-dark;
		line-height: 60upx;
		margin-top: 60upx;
	}
	
	.p-empty_play image {
		margin: 140upx 0 20upx 0;
		width: 200upx;
		height: 200upx;
	}
	
	
	.mask {
		height: 100vh;
		width: 100%;
		background-color: rgba(000, 000, 000, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	.cha {
		width: 24upx;
		height: 24upx;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.back {
		background-color: #fff;
		height: 52rpx;border-radius: 8rpx;
	}
	
	.orange {
		background-color: #FFFFFF;
		color: @uni-color-primary-dark;
		height: 52upx;
		border: 2upx solid @uni-color-primary-dark !important;
		border-radius: 8upx;
	}
	
	.select {
		color: #666666;
		height: 56upx;
		border: 0upx solid rgba(2, 2, 2, 1) !important;
		background: rgba(248, 248, 248, 1);
		border-radius: 8upx;
	}
	
	.select>view {
		margin: 0px 30upx;
	}
	
	.orange>view {
		margin: 0px 30upx;
	}
	
	.mask_d {
		height: auto;
	}
	
	.mask_two li {
		float: left;
		width: auto;
		min-width: 60upx;
		border: 1px solid #eee;
		margin: 24upx 20upx 0 0;
		padding: 0 10upx;
	}
	.queren_div {
		height: 98upx;
	}
	
	.mask_num {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90rpx;
	}
	
	.mask_quren {
		position: absolute;
	}
	
	.goods_mun {
		color: #9D9D9D;
		padding: 0upx;
		display: inline-block;
		width: auto;
		background-color: #F8F8F8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.goods_mun {
		display: flex;
		align-items: center;
		border: 1px solid #DDDDDD;
		border-radius: 8upx;
		height: 46upx;
		width: 170upx;
	}
	
	.goods_mun span {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	
	.goods_mun span img {
		width: 16upx;
		height: 16upx;
		padding: 10upx;
		/* #ifdef MP-ALIPAY */
		background-size: 25upx 25upx !important;
		width: 0.1rem;
		height: 0.07rem;
		/* #endif */
	
	}
	.border-right {
		border-right: 1px solid #ddd !important;
	}
	
	.border-left {
		border-left: 1px solid #ddd !important;
	}
</style>
