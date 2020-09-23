<template>
	<div class="box">
		<!--头部模块-->
		<heads :title='title' :border="true"></heads>
		
		<div class='home_navigation'>
			<div class='home_input'>
				<img class='searchImg' :src="serchimg" alt="">
				<input type="text" v-model.trim="searchtxt" :placeholder="placeholder1" @blur="_placeholder()" @focus="_placeholder1()"
				 id='input' :placeholder-style="placeStyle" name="sourch"/>
			</div>
			<div class='search_btn' @tap='_search'>搜索</div>
		</div>
		
		<div class='topTabBar'>
			<div class="tab-pane">
				<div :class='{"active":!topTabBar?true:false}' @tap="topTabBar=0">
					商品
				</div>
				<view class="xian_d" v-if="!topTabBar?true:false" ></view>
			</div>
			<div class="tab-pane">
				<div :class='{"active": topTabBar?true:false}' @tap="topTabBar=1">
					店铺
				</div>
				<view class="xian_d" v-if="topTabBar?true:false"</view>
			</div>
		</div>
		<!--点击搜索框跳转的初始模块-->
		<div class='search'>
			<div v-if='cancel'>
				<div class='search-hot' v-if='is_open'>
					<div class='hot'>
						<span>热门搜索</span>
						<img class='hot_img' :src="show" @tap='hotsearchStatu()' v-if='openHotWord'>
						<img class='hot_img' :src="hide" @tap='hotsearchStatu()' v-else>
					</div>
					<ul class='search-ul hotSearch1' v-if='openHotWord'>
						<li v-for='(item,index) in host' @tap.stop="hotsearch(item)" :key="index">{{item}}</li>
					</ul>
				</div>
				<div class='search-hot' v-show="storag">
					<div class='hot'>
						<span>历史搜索</span>
						<!-- 清空历史记录 -->
						<img class='hot_img1' :src="readimg" @tap='clearhis()'>
					</div>
					<ul class='search-ul' ref='record'>
						<li v-for='(item,index1) in storag' @tap.stop="_record(item)" :key="index1">{{item}}</li>
					</ul>
				</div>
			</div>
			<!--  输入提示信息   -->
			<ul v-if='!cancel' class='keyword home_search'>
				<li v-for='(item,index2) in prompt' @tap.stop="_record(item)" :key="index2">
					<p>{{item}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage.js'
	export default {
		data() {
			return {
				title: '搜索商品',
				openHotText: '关闭热门搜索',
				openHotWord: true,
				back_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/back2x.png",
				serchimg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/searchh.png',
				show: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/show.png',
				hide: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/hide.png',
				readimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/deletes2x.png',
				cancel: false,
				placeholder: '请输入商品名称',
				placeholder1: '',
				host: '',
				searchtxt: '',
				storag: '', //	接收历史记录的值
				prompt: '', //	接收输入提示的值
				searchgoods: '', //接收搜索后商品返回的数据
				success: '', //搜索商品是否有数据返回
				topTabBar: 0, // 0|1，商品|店铺
				is_open:false,
				placeStyle: 'color:#999999;font-size: 26upx'
			}
		},
		onShow: function() {
			this.storag = uni.getStorageSync('history')
			this.openHotWord = uni.getStorageSync('hotStatu')
			this.placeholder1 = this.placeholder
			if (this.openHotWord) {
				this.openHotText = '关闭热门搜索'
			} else {
				this.openHotText = '开启热门搜索'
			}
			this._axios()
			this.cancel = true
		},
		components: {
			heads
		},
		methods: {
			//输入框失去焦点
			_placeholder() {
				this.placeholder1 = this.placeholder
			},
			//输入框获得焦点
			_placeholder1() {
				this.placeholder1 = ''
			},
			// 查看热门搜索
			hotsearchStatu() {
				if (this.openHotWord) {
					this.openHotWord = false
				} else {
					this.openHotWord = true
				}
				
				let hotStatus = this.openHotWord
				uni.setStorage({
					key: 'hotStatu',
					data: hotStatus
				})
			},
			//从主页点击搜索框，进入搜索界面，热门数据请求
			_axios() {
				var me = this;
				var data = {
					module: 'app',
					action: 'search',
					app: 'hot_search',
					type: this.topTabBar
				}
				uni.request({
					data,
					url:  uni.getStorageSync("url"),
					success: (res) => {
						if (res.data.code == 200) {
							me.host = res.data.data
							
							if(res.data.is_open == 1){
								me.is_open = true
							}else{
								me.is_open = false
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
			//点击搜索时，实行的数据请求及处理
			_search() {
				let data = this.storag
				if (this.searchtxt != '') { //搜索框不为空  
					let me = this
					// #ifndef MP-WEIXIN
					if (data.length > 0) {
						if (data.length > 4) {
							if (!me.in_array(me.searchtxt, data)) {
								data.unshift(me.searchtxt)
								data.pop()
							} else {
								var b = data.indexOf(me.searchtxt)
								data.splice(b, 1)
								data.unshift(me.searchtxt)
							}
						} else {
							if (!me.in_array(me.searchtxt, data)) {
								data.unshift(me.searchtxt)
							} else {
								var b = data.indexOf(me.searchtxt)
								data.splice(b, 1)
								data.unshift(me.searchtxt)
							}
						}

					} else {
						data = []
						data.unshift(me.searchtxt)
					}
					uni.setStorageSync('history',data)
					me.type(1)
					me.cancel = false;
					uni.navigateTo({
						url: 'searchResult?searchtxt=' + me.searchtxt + '&topTabBar=' + me.topTabBar
					});
					me.searchtxt = '';
					
					// #endif
					//#ifdef MP-WEIXIN
					if (data.length > 0) {
						if (data.length > 4) {
							if (!me.in_array(me.searchtxt, data)) {
								data.unshift(me.searchtxt)
								data.pop()
							} else {
								var b = data.indexOf(me.searchtxt)
								data.splice(b, 1)
								data.unshift(me.searchtxt)
							}
						} else {
							if (!me.in_array(me.searchtxt, data)) {
								data.unshift(me.searchtxt)
							} else {
								var b = data.indexOf(me.searchtxt)
								data.splice(b, 1)
								data.unshift(me.searchtxt)
							}
						}
					} else {
						data = []
						data.unshift(me.searchtxt)
					}
					uni.setStorage({
						key: 'history',
						data: data,
						success: function(res) {
							uni.navigateTo({
								url: 'searchResult?searchtxt=' + me.searchtxt + '&topTabBar=' + me.topTabBar,
								success: function() {
									me.type(1)
									me.cancel = false;
									me.searchtxt = '';
								}
							});
						}
					})
					//#endif
				} else {
					uni.showToast({
						title: '请输入搜索的名称',
						duration: 1500,
						icon: 'none'
					})
				}
			},
			//判断数组中是否已有当前字符串
			in_array(stringToSearch, arrayToSearch) {
				for (let s = 0; s < arrayToSearch.length; s++) {
					let thisEntry = arrayToSearch[s].toString();
					if (thisEntry == stringToSearch) {
						return true;
					}
				}
				return false;
			},
			//清空历史记录
			clearhis() {
				let me = this
				uni.removeStorage({
					key: 'history',
					success: function() {
						me.storag = ''
						uni.showToast({
							title: '记录清除成功',
							duration: 1500,
							icon: 'none'
						})
					}
				})
			},
			//点击热门搜索把搜索的记录添加到good-storage中并跳转搜索列表页   
			hotsearch(item) {
				this.searchtxt = item;
				this._search();
			},
			//提示信息，历史记录的商品搜素
			_record(item) {
				this.searchtxt = item;
				this._search();
			},
			...mapMutations({
				type: 'SET_TYPE',
				// scroll_t:'SET_SCROLL_T'
			}),
		},
		watch: {
			topTabBar:function(val){
				// 监听 商品店铺切换动态设置标题
				// 0 商品 1 店铺
				if(val){
					this.title = '搜索店铺'
					return 
				}
				this.title = '搜索商品'
			},
			// 监听搜索输入框中值的变化
			searchtxt: function(val, oldval) {
				if (val == '') {
					this.cancel = true
				} else {
					this.cancel = false
				}
				//监听输入内容向后台请求数据  
				var me = this;
				var data = {
					module: 'app',
					action: 'search',
					app: 'input_search',
					type:me.topTabBar
				}
				data.keyword = this.searchtxt;
				if( this.searchtxt !== ''){
						uni.request({  //这个请求有问题
						data,
						url:uni.getStorageSync("url"),
						success: (res) => {
							var data = res.data
							if (data.data.length != 0) {
								me.prompt = data.data
						
								console.log( me.prompt + '11111' )
							} else {
								me.prompt = false
							}
						},
						error: function(err) {
							console.log(err)
						}
					})
				}
			}
		},
	}
</script>

<style lang="less">
	@import url("../../static/css/search/search.less");
</style>
