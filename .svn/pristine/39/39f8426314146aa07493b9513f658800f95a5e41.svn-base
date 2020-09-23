<template>
	<div style="min-height: 100vh;" :style="address?'background-color: #F6f6f6;':''">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<!-- 标题 -->
		<div style='position: relative;'>
			<heads :title='title'></heads>
			<!-- #ifndef MP -->
			<div class='manage' v-if='manage' @tap="_manage">{{address_m}}</div>
			<!-- #endif -->
		</div>
		<!-- #ifdef MP -->
		<div class='manage1' v-if='manage' @tap="_manage">{{address_m}}</div>
		<!-- #endif -->
		<!-- 当没有设置地址栏的时候，页面显示添加地图图片提示 -->
		<div class="address_wu" @tap="_uni_navigateTo('addAddress?state_addre=1')" v-if='address?false:true'>
			<img :src="add" />
			<p>添加地址</p>
		</div>
		<!-- 地址栏 -->
		<ul class='address' v-if='address?true:false'>
			<li v-for="(item,index) in address" :key='item.id'>
				<div class='address_top' @tap="_state_manage(item)">
					<div>
						<div class='address_user'>
							<span style="margin-right: 30upx">{{item.name}}</span>
							<span>{{item.tel}}</span>
						</div>
						<div class='address_xs'>
							<div class='address_ms' v-show='item.is_default==0?false:true'>默认</div>
							<p>{{item.address_xq}}</p>
						</div>
					</div>
					<img class='quan_img' v-if="re_img" :src="addre_id== item.addr_id ? circle_hei : circle_hui" />
				</div>
				<div class='address_foot' v-if="del">
					<div class="address_left" @tap="_default(item.addr_id,index)">
						<img class='quan_img' :src="item.is_default==0 ? circle_hui : circle_hei" />
						<span>默认地址</span>
					</div>
					<div class='address_right' style="display: flex;">
						<div @tap="_addAddress(item.addr_id)">
							<img class='quan_img' :src="edtAdd" />
							<span style="margin-right: 30upx;">编辑</span>
						</div>
						<div @tap="delAddress(item.addr_id,index)">
							<img class='quan_img' :src="delAdd" />
							<span>删除</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<!-- 底部按钮 -->
		<div class='bottom' v-if="address" @tap="_uni_navigateTo('addAddress?state_addre=1')">添加新地址</div>
		<lkdelModel :content="text" v-model="lkdelModel" @on-click="_delAddress" />
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {
		mapMutations
	} from 'vuex'
	import lkdelModel from '@/components/delModel.vue'

	export default {
		data() {
			return {
				title: '收货地址',
				add: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/tianjiadizhi2x.png',
				edtAdd: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/bianjidizhi2x.png',
				delAdd: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/shanchudizhi2x.png',
				fastTap: true,
				manage: '', //管理状态
				del: '', //删除编辑状态
				del_index: -1, //删除地址的index
				state_manage: '', //判断从个人中心页面进(1)，还是订单页面进(2)
				access_id: '',
				address: '', //接受后台返回地址
				circle_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanzehui2x.png',
				circle_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanzehei2x.png',
				order_id: '',
				re_img: "",
				addre_id: '', //地址id
				address_m: '管理',
				flag: true,
				lkdelModel: false,
				delobj: {},
				text: ''
			}
		},
		beforeDestroy() {
			var me = this
		},
		onShow() {
			var me = this;
			let p = new Promise((resolve, reject) => {
				me.LaiKeTuiCommon.getLKTApiUrl().then(function() {
					resolve(1231)
				});
			});
			p.then(() => {
				me.$nextTick(function() {
					me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
						me._axios()
						me.address_id = me.$store.state.address_id
					});
				});
			});
		},
		onLoad(option) {
			this.order_id = this.$store.state.order_id
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			this.state_manage = option.state_manage
			this.addre_id = option.addre_id
			uni.setStorageSync("canshu", "false")
			if (this.state_manage == 1) {
				this.manage = true
				this.del = false
				this.re_img = true
			} else if (this.state_manage == 2) {
				this.manage = false
				this.del = true
				this.re_img = false
			}
		},
		components: {
			Heads,
			lkdelModel
		},
		methods: {
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			_uni_navigateTo(url) {
				uni.navigateTo({
					url
				})
			},
			//从订单页面进入点击调回前一页
			_state_manage(item) {
				this.addre_id = item.id
				var me = this
				me.$store.state.address_id = item.id
				uni.setStorageSync('chooseAddress', item)
			},
			//点击管理切换状态
			_manage() {
				this.del = !this.del
				if (this.del) {
					this.address_m = '完成'
				} else {
					this.address_m = '管理'
				}
			},
			delAddress(addr_id, index) {

				this.delobj = {
					addr_id,
					index
				}

				if (this.address[index].is_default == 1) {
					this.text = '确认删除默认地址吗?'
				} else {
					this.text = ''
				}

				this.lkdelModel = true
			},
			// 删除地址
			_delAddress() {

				let {
					addr_id,
					index
				} = this.delobj

				if (!this.fastTap) {
					return
				}

				this.fastTap = false
				var me = this

				var data = {
					module: 'app',
					action: 'address',
					app: 'del_adds',
					access_id: this.access_id,
					addr_id: addr_id
				}

				if (this.address.length == 1) {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {

							me.fastTap = true

							let {
								data: {
									code
								}
							} = res
							if (code == 200) {
								me.$store.state.address_id_def = ''

								uni.setStorageSync("lkt_address_id_def", '');
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 1000
								})
								me._axios()
							} else {
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						}
					})

				} else if (this.address[index].is_default == 1) {

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
									code
								}
							} = res
							if (code == 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 1000
								})
								me.$store.state.address_id_def = '';
								console.log('设置lkt_address_id_def为空2');
								uni.setStorageSync("lkt_address_id_def", '');
								me._axios()
							} else {
								me.fastTap = true
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						}
					})
				} else {
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
									code
								}
							} = res
							if (code == 200) {
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 1000
								})
								me._axios()
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
						}
					})
				}
				this.lkdelModel = false
			},
			// 编辑地址
			_addAddress(addr_id) {
				uni.navigateTo({
					url: 'addAddress?state_addre=2&addr_id=' + addr_id
				})
			},
			//设置默认地址
			_default(address_id, index) {
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				var me = this
				var data = {
					module: 'app',
					action: 'address',
					app: 'set_default',
					access_id: this.access_id,
					addr_id: address_id
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
						console.log(me.address[index].id)
						if (code == 200) {
							for (var i = 0; i < me.address.length; i++) {
								me.address[i].is_default = 0
							}
							me.address[index].is_default = 1
							me.$store.state.address_id_def = me.address[index].id
							console.log('1设置lkt_address_id_def为' + me.address[index].id);
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
					}
				})
			},
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'address',
					app: 'index',
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
						let adds = res.data.adds || []
						console.log(adds)
						if (res.data.code == 200) {
							me.address = adds
							// 如果创建的新地址选择了默认
							if (uni.getStorageSync('address_default')) {
								for (let i = 0; i < adds.length; i++) {
									if (adds[i].is_default == 1) {
										me.addre_id = adds[i].id
										break
									}
								}
								uni.removeStorageSync('address_default')
							}
						} else {
							me.address = ''
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}

						var asd = me.$store.state.address_id_def
						if (adds.length > 0 && me.$store.state.address_id_def == '') {
							if (me.$store.state.address_id_def == '') {
								for (var k in adds) {
									if (adds[k].is_default == 1) {
										me.$store.state.address_id_def = adds[k].id
										uni.setStorageSync("lkt_address_id_def", adds[k].id);
										me.$store.state.address_id = adds[k].id
									}
								}
							} else {
								me.$store.state.address_id_def = me.$store.state.address_id_def
								uni.setStorageSync("lkt_address_id_def", me.$store.state.address_id_def);
							}
						}
					},
				})
			},
			...mapMutations({
				address_id: 'SET_ADDRESS_ID'
			})
		},
	}
</script>
<style scoped lang="less">
	@import url("../../static/css/address/receivingAddress");
</style>
