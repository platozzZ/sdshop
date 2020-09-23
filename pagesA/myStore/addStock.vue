<template>
	<div style='min-height: 100vh;'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<!-- #ifndef MP -->
		<div class='header_box' :style='{paddingTop:halfWidth}'>
			<div class='header'>
				<span @tap='_back1()'>
					<img :src="back">
				</span>
				<p>{{title}}</p>
			</div>
		</div>
		<!-- #endif -->
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中…</p>
			</div>
		</div>
		<div v-else class='relative' :style="{marginTop:halfWidth}">
			<div class='attrList table' :style='{width:tableList}'>
				<div class='attrListHead tr'>
					<div class='list2 th' v-for='(item,index) in attr' :key='index'>
						{{item.attrName[0]}}
					</div>
					<div class='list1 th'>剩余库存</div>
					<div class='list1 th'>库存预警</div>
					<div class='list1 th'>添加库存</div>
				</div>
				<div class='attrListBody tr' v-for='(item,index) in attrList' :key="index">
					<div v-if='item.length>1' class='tr attrListTr1'>
						<div class='list2  aa td' v-for='(items,indexs) in item' :key='indexs'>
							<span class='a1'>{{item[indexs].value}}</span>
						</div>
						<div class='list1 td bcd' :class='{"redColor":item[0].stock<item[0].stockWarn}'>{{item[0].stock}}</div>
						<div class='list1 td'>{{item[0].stockWarn}}</div>
						<div class='list1 td'><input @input='checkNum($event,item[0],index)' type="number" v-model="item[0].addStockNum"></div>
					</div>
					<div v-else class='tr'>
						<div class='list2  td bb'>
							<span class='a2 td'>{{item.value}}</span>
						</div>
						<div class='list1 td asd' :class='{"redColor":item.stock<item.stockWarn}'>{{item.stock}}</div>
						<div class='list1 td'>{{item.stockWarn}}</div>
						<div class='list1 td'><input @input='checkNum($event,item,index)' type="number" v-model="item.addStockNum"></div>
					</div>
				</div>
			</div>
			<div class='subBtn' @tap='_sub()'>保存</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'

	export default {
		data() {
			return {
				back: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				addStockNum: '',
				title: '库存管理',
				access_id: '',
				loadGif: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				load: false,
				shop_id: '',
				p_id: '',
				attr: '',
				attrList: '',
				fastTap: true,
			}
		},
		onLoad(option) {
			let me = this;
			me.p_id = option.p_id
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.shop_id = uni.getStorageSync('shop_id') ? uni.getStorageSync('shop_id') : me.$store.state.shop_id
					me._axios()
				});
			});
		},
		methods: {
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			_back1() {
				var showModal = false
				if (this.attrList[0].length > 1) {
					for (let i = 0; i < this.attrList.length; i++) {
						if (this.attrList[i][0].addStockNum != 0) {
							showModal = true
						}
					}
				} else {
					for (let i = 0; i < this.attrList.length; i++) {
						if (this.attrList[i].addStockNum != 0) {
							showModal = true
						}
					}
				}
				var me = this
				if (!showModal) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '是否提交修改？',
						success: function(res) {
							if (res.confirm) {
								me._sub()
							} else {
								uni.navigateBack({
									delta: 1
								})
							}
						}
					})
				}
			},
			checkNum(e, attr, index) {
				if (Number(e.target.value < 0)) {
					if (Math.abs(e.target.value) >= attr.stock) {
						uni.showToast({
							title: '已超过最大可减少的库存数量',
							duration: 1500,
							icon: 'none'
						})
						attr.addStockNum = 0
					}
				}
			},
			_sub() {
				if (!this.fastTap) {
					return
				}
				this.fastTap = false
				var changeNum = []
				if (this.attrList[0].length > 1) {
					for (var i = 0; i < this.attrList.length; i++) {
						changeNum.push(this.attrList[i][0].addStockNum)
					}
					console.log(123)
				} else {
					for (var i = 0; i < this.attrList.length; i++) {
						changeNum.push(this.attrList[i].addStockNum)
					}
					console.log(321)
				}

				changeNum = changeNum.join(',')
				console.log(changeNum)
				var me = this
				uni.request({
					url: uni.getStorageSync("url"),
					data: {
						access_id: me.access_id,
						shop_id: me.shop_id,
						module: 'app',
						action: 'mch',
						p_id: me.p_id,
						m: 'up_stock',
						number: changeNum,
					},
					success: function(res) {
						me.fastTap = true
						if (res.data.code == 200) {
							uni.showToast({
								title: '修改成功',
								duration: 1500,
								icon: 'none'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
						console.log(res)
					},
					error: function(err) {
						me.fastTap = true
					}
				})
			},
			_axios() {
				var me = this
				uni.request({
					url: uni.getStorageSync("url"),
					data: {
						access_id: me.access_id,
						shop_id: me.shop_id,
						module: 'app',
						action: 'mch',
						p_id: me.p_id,
						m: 'up_stock_page',
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						if (res.data.code == 200) {
							console.log(res)
							me.attr = res.data.attr
							me.attrList = res.data.attrList
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500
							});
						}
					},
					error: function(err) {
						console.log("异常");
						console.log(err);
					}
				})
			}
		},
		computed: {
			tableList: function() {
				if (this.attr.length == 0) {
					var width = 750
					return uni.upx2px(width) + 'px'
				} else {
					var width = this.tableWidth * 2 + 130 * 5
					return uni.upx2px(width) + 'px'
				}
			},
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			}
		},
		components: {
			heads
		},
	}
</script>

<style>
	@import url("../../static/css/myStore/addStock.css");
</style>
