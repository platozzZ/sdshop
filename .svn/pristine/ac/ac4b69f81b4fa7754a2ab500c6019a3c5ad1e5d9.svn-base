<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<!-- #ifndef MP-ALIPAY -->
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<!-- #endif -->
		<!-- #ifndef MP-ALIPAY -->
		<div class='navtion' :style='{top:halfWidth}'>
			<!--头部区域-->
			<div>
				<div class='header'>
					<img :src="back" @tap="_back">
					<view>
						我的收藏
					</view>
					<!-- #ifndef MP -->
					<p v-if='collection1.length&&navType == 1' @tap='_state' :class="{'active':!collection1.length}">{{state}}</p>
					<p v-else-if='collection.length&&navType == 2' @tap='_state' :class="{'active':!collection.length}">{{state}}</p>
					<p v-else></p>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<p></p>
					<!-- #endif -->
				</div>
			</div>
		</div>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<div class='bg_F6' v-if='collection1.length&&navType == 1'>
			<p class='manege' @tap='_state' :class="{'active':!collection1.length}">编辑</p>
		</div>
		<div class='bg_F6' v-if='collection1.length&&navType == 2'>
			<p class='manege' @tap='_state' :class="{'active':!collection.length}">编辑</p>
		</div>
		<!-- #endif -->
		<view class="twins">
			<view class="nav_twin" :class='{"nav_twin_hover": navActive}' @tap="changeNav(true,1)">
				商品收藏
				<view class="nav_line" v-if="navActive==true"></view>
			</view>
			<view class="nav_twin" :class='{"nav_twin_hover": !navActive}' @tap="changeNav(false,2)">
				店铺收藏
				<view class="nav_line" v-if="navActive==false"></view>
			</view>
		</view>

		<template v-if="loadFlag">
			<!--收藏商品展示模块-->
			<view class="" v-if="navActive==true" style="flex: 1;overflow: scroll;">
				<ul v-if='collection1.length'>
					
					<li v-for='(item,index) in collection1' :key="item.p_id" class="list_li">
						<div class="list_imgBox" @tap="_checkedOne(item, index)" v-if='statevalue'>
							<img class='quan_img list_img' :src="display_img1[index] ? quan_hei:quan_hui"/>
						</div>
						<img :src="item.imgurl" @tap="_goods(item.p_id)" />
						<view :class="statevalue ? 'sc_right_X':'sc_right_Y' " @tap="_goods(item.p_id)">
							<div class='describe' :class='{left:statevalue}'>
								<span>{{item.product_title}}</span>
							</div>
							<view class="dp_css">
								店铺：{{item.mch_name}}
							</view>
							<div class='collection_button'>
								<span class="span_b1">￥{{item.price}}</span>
								<span class="span_b2">￥{{item.yprice}}</span>
								<div @tap.stop="_find(item.p_id)">
									<!--<div @click="_axios">-->
									<span>看相似</span>
									<!-- <img :src='jiantou' /> -->
								</div>
							</div>
						</view>
					</li>
					<li style="height: 98rpx;"></li>
				</ul>
				<div class='noFindDiv' v-else>
					<div>
						<img :src='noCol' class='noFindImg' />
					</div>
					<span class='noFindText'>您还没有收藏的商品哦！</span>
				</div>
			</view>
			
			<!--收藏店铺展示模块-->
			<view class="" v-else>
				<ul v-if='collection.length'>
					<li @tap='_goStore(item)' v-for='(item,index) in collection' :key="index" class="list_li">
						<div class="list_imgBox" @tap.stop="_checkedOne(item, index)" v-if='statevalue'>
							<img class='quan_img list_img1' :src="display_img[index] ? quan_hei:quan_hui" />
						</div>
						<img class="dp_img" :src="item.img"></img>
						<view class="dp_con">
							<view class="dp_con1">
								{{item.mch_name}}
							</view>
							<view class="dp_con2">
								{{item.collection_num}}人收藏
							</view>
						</view>
						<image class="dp_right" :src="toImage"></image>
					</li>
				</ul>
				<div class='noFindDiv' v-else>
					<div>
						<img :src='noCol' class='noFindImg' />
					</div>
					<span class='noFindText'>您还没有收藏的店铺哦！</span>
				</div>
			</view>
			
			
			<!--点击管理后显示的全选和删除模块-->
			<div class='del' v-if='statevalue&&navType==1'>
				<div class='del_sele' @tap="_selectAll">
					<img class='quan_img' :src="selectAll1 ? quan_hei : quan_hui" />
					<span>全选</span>
				</div>
				<div class='del_div' @tap="_delete">取消收藏</div>
			</div>
			<div class='del' v-else-if='statevalue'>
				<div class='del_sele' @tap="_selectAll">
					<img class='quan_img' :src="selectAll ? quan_hei : quan_hui" />
					<span>全选</span>
				</div>
				<div class='del_div' @tap="_delete">取消收藏</div>
			</div>
		</template>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				back: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/back2x.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/jiantou2x.png',
				noCol: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/noCol.png',
				toImage:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/jiantou2x.png',
				collection: [], //收藏商品数据
				collection1: [], //收藏商品数据
				state: '编辑', //管理与完成的切换
				statevalue: false, //管理与完成的状态值
				selectvalue: '', //单选的状态值
				selectvalue1: '', //单选的状态值
				selectAll: '', //全选的状态值
				selectAll1: '', //全选的状态值
				selectArray: [], //单选数据存储
				selectArray1: [], //单选数据存储
				deletecolle: {}, //删除商品
				access_id: '',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehei2x.png',
				display_img: [], //圆圈的选中状态
				display_img1: [], //圆圈的选中状态
				flag: true,
				fastTap: true,
				navActive: true,
				navType: 1,
				
				loadFlag: false
			}
		},
		onLoad() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			this.navType = 1
			this._axios()
		},
		onShow() {
			var me = this;
			let p = new Promise((resolve, reject)=>{
				me.LaiKeTuiCommon.getLKTApiUrl().then(function(){
					resolve(1231)
				});
			});
			p.then(()=>{
				me.$nextTick(function(){
					me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
						me._axios()
					});
				});
			})
		},
		computed: {
			halfWidth() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				return heigh + 'px';
			},
		},
		methods: {
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			_goStore(shop_id) {
				console.log('shop_id---------'+JSON.stringify(shop_id))
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id=' + shop_id.mch_id
				})
			},
			_find(id) {
				this.pro_id(id)
				uni.navigateTo({
					url: 'discover?pro_id=' + id
				})
			},
			_back() {
				this.flag = false
				uni.navigateBack({
					delta: 1
				})
			},
			_state() {
				if (this.collection1.length || this.collection.length) {
					this.selectAll = ''
					this.selectAll1 = ''
					this.statevalue = !this.statevalue;
					if (this.statevalue) {
						this.state = '完成'
					} else {
						this.state = '编辑'
					}
				} else {
					this.statevalue = !this.statevalue;
					if (this.statevalue) {
						this.state = '完成'
					} else {
						this.state = '编辑'
					}
				}
			},
			_axios() {
				var me = this;
				var data = {
					module: 'app',
					action: 'addFavorites',
					app: 'collection',
					access_id: this.access_id,
					pro_id: this.pro_id,
					type: this.navType
				}
				uni.request({
					data,
					url:  uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						me.loadFlag = true

						if (res.data.code == 200) {
							if (me.navType == 1) {
								me.collection1 = res.data.data;
							} else {
								me.collection = res.data.data;
							}
						} else {
							me.collection = ''
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					}
				})
			},

			// 点击切换导航条
			changeNav(flag, type) {
				var that = this
				that.navActive = flag
				that.navType = type
				this.loadFlag = false
				that._axios();
			},

			//单选
			_checkedOne(item, indexli) {
				var me = this
				if (me.navType == 1) {
					var cum = me.selectArray1.indexOf(item);
					//判断点击的传入的值是否存在数组中，如果没有添加，如果有删除，同时设定选中状态（第一次点击添加进数组，第二次点击从数组中删除）
					if (me.statevalue) {
						var img = me.$refs.img;
						if (cum < 0) {
							me.selectArray1.push(item);
							me.$set(me.display_img1, indexli, true)
						} else {
							me.selectArray1.splice(cum,1)
							me.$set(me.display_img1, indexli, false)
						}
						//根据产品选状态，设定全选状态
						if (me.selectArray1.length == me.collection1.length) {
							me.selectAll1 = true
						} else {
							me.selectAll1 = false
						}
					}
				} else {
					var cum = me.selectArray.indexOf(item);
					//判断点击的传入的值是否存在数组中，如果没有添加，如果有删除，同时设定选中状态（第一次点击添加进数组，第二次点击从数组中删除）
					if (me.statevalue) {
						var img = me.$refs.img;
						if (cum < 0) {
							me.selectArray.push(item);
							me.$set(me.display_img, indexli, true)
						} else {
							me.selectArray.splice(cum,1)
							me.$set(me.display_img, indexli, false)
						}
						//根据产品选状态，设定全选状态
						if (me.selectArray.length == me.collection.length) {
							me.selectAll = true
						} else {
							me.selectAll = false
						}
					}
				}
			},
			_selectHandle(obj) {
				var me = this;
				obj.selectAll1 = !obj.selectAll1;
				var img = me.$refs.img;
				//根据全选状态，设定商品选中状态
				if (obj.selectAll1) {
					for (var i = 0; i < obj.collection1.length; i++) {
						me.$set(obj.selectArray1, i, obj.collection1[i]);
						me.$set(obj.display_img1, i, true)
					}
				} else {
					obj.selectArray1 = []
					for (var i = 0; i < obj.collection1.length; i++) {
						me.$set(obj.display_img1, i, false)
					}
				}
				return obj;
			},
			//全选
			_selectAll() {
				var me = this;
				if (this.navType == 1) {
					var obj = {
						selectAll1: me.selectAll1,
						display_img1: me.display_img1,
						selectArray1: me.selectArray1,
						collection1: me.collection1
					}

					obj = this._selectHandle(obj);
					me.selectAll1 = obj.selectAll1;

				} else {
					var obj = {
						selectAll1: me.selectAll,
						display_img1: me.display_img,
						selectArray1: me.selectArray,
						collection1: me.collection
					}
					obj = this._selectHandle(obj);
					me.selectAll = obj.selectAll1;
				}

			},
			//删除
			_delete() {
				var me = this
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				if (this.selectArray1.length || this.selectArray.length) {
					// me.deletecolle.collection = [];
					me.deletecolle.collection = '';
					me.deletecolle.access_id = me.access_id
					if (me.navType == 1) {
						this.selectArray1.forEach(function(item, index) {
							// me.deletecolle.collection.push(item.id)
							me.deletecolle.collection += item.id+','
						})
					} else {
						this.selectArray.forEach(function(item, index) {
							// me.deletecolle.collection.push(item.id)
							me.deletecolle.collection += item.id+','
						})
					}

					var data = me.deletecolle;
					uni.request({
						data,
						url:  uni.getStorageSync("url") + "&module=app&action=addFavorites&app=removeFavorites",
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							me.fastTap = true
							var s1 = [];
							var s = [];
							if (res.data.code == 200) {

								var itemIds = me.deletecolle.collection;
								for (var x in itemIds) {

									if (me.navType == 1) {
										me.selectArray1.forEach(function(item, index) {
											if (itemIds[x] != item.id) {
												s1.push(item);
											}
										});
										me.selectArray1 = s1;
									} else {
										me.selectArray.forEach(function(item, index) {
											if (itemIds[x] != item.id) {
												s.push(item);
											}
										});
										me.selectArray = s;
									}
								}
								me.display_img1 = [];
								for (var i = 0; i < me.collection1.length; i++) {
									me.display_img1.push(false)
								}
								me.display_img = [];
								for (var i = 0; i < me.collection.length; i++) {
									me.display_img.push(false)
								}
								
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none',
									success:function(){
										setTimeout(function() {
											me.collection 	= []
											me.collection1 	= []
											me._axios()
											me.selectArray1 = []
											me.statevalue 	= !me.statevalue
											me.state 				= "编辑"
										}, 1500);
									}
								})

							} else {
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
							for (var i = 0; i < me.display_img.length; i++) {
								me.$set(me.display_img1, i, false)
							}

						},
						error: function() {
							me.fastTap = true
						}
					})
				} else {
					this.fastTap = true
					uni.showToast({
						title: '请选择需要删除的商品！',
						duration: 1000,
						icon: "none"
					})
				}
			},
			_goods(id) {
				this.pro_id(id)
				uni.navigateTo({
					url: '../goods/goodsDetailed'
				})
			},
			...mapMutations({
				pro_id: 'SET_PRO_ID'
			}),
		},
		components: {

		}

	}
</script>

<style lang="less" scoped>
	@import url("../../static/css/collection/collection.less");
</style>
