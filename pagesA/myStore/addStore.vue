<template>
	<div class="addStore-container">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div class="addStore-list">
			<div>
				<p>门店名称</p>
				<input type="text" placeholder="请输入门店名称" :placeholder-style="placeColor" v-model="shop_name">
			</div>
		</div>
		<div class="addStore-list">
			<div>
				<p>联系电话</p>
				<input type="text" placeholder="请输入联系电话" :placeholder-style="placeColor" v-model="shop_mobile">
			</div>
		</div>
		<div class="addStore-list" @tap="openDatetimePicker()">
			<div>
				<p>营业时间</p>
				<input type="text" @focus="hideKeyboard()" disabled placeholder="请输入营业时间" :placeholder-style="placeColor" v-model="time_all">
				<img :src="jiantou" alt="">
			</div>
		</div>
		<div class="addStore-list" @tap='showMulLinkageThreePicker()'>
			<div>
				<p>所在城市</p>
				<input type="text" @focus="hideKeyboard()" disabled placeholder="请选择省/市/区" v-model="city_all"  :placeholder-style="placeColor">
				<img :src="jiantou" alt="">
			</div>
		</div>
		<div class="addStore-list">
			<div>
				<p>详细地址</p>
				<input type="text" placeholder="请输入详细地址" :placeholder-style="placeColor" v-model="shop_address">
			</div>
		</div>
		<button class="addStore-btn" @tap="preservation">保存</button>
		
		<mpvue-city-picker ref="mpvueCityPicker" :themeColor="themeColor" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		 
		 <!-- 时间选择 -->
		 <time-picker ref="timePicker" :themeColor="themeColor" :urseTime="time_ys" @onConfirm="onConfirm1"></time-picker>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import timePicker from '../../components/time-picker.vue'
	export default{
		data(){
			return{
				title:'门店信息设置',
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText:'',
				shop_id:'',
				shop_name:'', // 门店名称
				shop_mobile:'', // 门店电话
				time_all:'', //时间段
				time_ys:'', // 原始时间
				city_all:'', //最终选择省市区的值
				shop_address: '',  // 详细地址
				edit:'',
				btn_status: true,
				placeColor: 'color:#b8b8b8',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
			}
		},
		onLoad(option){
			var me = this
			me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
			me.shop_id = me.$store.state.shop_id
			me.edit = option.edit

			if(option.edit){
				me._edit_page()
			}
		},
		onShow() {
			var me = this;
			me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
		},
		methods:{
			// 点击城市
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			hideKeyboard(){
				uni.hideKeyboard()
			},
			// 城市-确定
			onConfirm(e) {
				this.city_all=e.label
			},
			// 营业时间-确定
			onConfirm1(e){
				var start = e[0].replace(/undefined/g,'00')
				var end = e[1].replace(/undefined/g,'00')
				this.time_all=start+'~'+end
				this.time_ys=this.time_all
			},
			// 点击营业时间
			openDatetimePicker(){
				this.$refs.timePicker.show(this.time_ys)
			},
			// 编辑页面
			_edit_page(){
				uni.showLoading({
					title:'加载中...',
					mask:true,
				});
				var me = this
				var data = {
					module: 'app',
					action: 'mch',
					m: 'edit_store_page',
					access_id:me.access_id,
					shop_id:me.shop_id,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if(res.data.code == 200){
							me.shop_name = res.data.list.name
							me.shop_mobile = res.data.list.mobile
							me.time_all = res.data.list.business_hours[0]
							me.time_ys = res.data.list.business_hours[0]
							me.city_all = res.data.list.sheng +'-'+ res.data.list.shi +'-'+ res.data.list.xian
							me.shop_address = res.data.list.address
						}else{
							uni.showToast({
								title:res.data.message,
							    duration:1500,
							    icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
					},
				})
			},
			// 保存
			preservation(){
				if(this.btn_status){
					this.btn_status = false
					var me = this
					console.log(me.edit)
					if(me.edit){
						me._edit()
					}else{
						me.add()
					}
				}
			},
			// 添加
			add(){
				uni.showLoading({
					title:'加载中...',
					mask:true,
				});
				var me = this
				var data = {
					module: 'app',
					action: 'mch',
					m: 'add_store',
					access_id:me.access_id,
					shop_id:me.shop_id,
					name:me.shop_name,
					mobile:me.shop_mobile,
					business_hours:me.time_all,
					city_all:me.city_all,
					address:me.shop_address,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if(res.data.code == 200){
							uni.showToast({
								title:res.data.message,
							    duration:1500,
							    icon:'none'
							})
							setTimeout(function(){
							    uni.navigateBack({
							        delta:1
							    })
							},1500)
						}else{
							me.btn_status=true
							uni.showToast({
								title:res.data.message,
							    duration:1500,
							    icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
						me.btn_status=true
					},
				})
			},
			// 编辑
			_edit(){
				uni.showLoading({
					title:'加载中...',
					mask:true,
				});
				var me = this
				var data = {
					module: 'app',
					action: 'mch',
					m: 'edit_store',
					access_id:me.access_id,
					shop_id:me.shop_id,
					name:me.shop_name,
					mobile:me.shop_mobile,
					business_hours:me.time_all,
					city_all:me.city_all,
					address:me.shop_address,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if(res.data.code == 200){
							uni.showToast({
								title:res.data.message,
							    duration:1500,
							    icon:'none'
							})
							setTimeout(function(){
							    uni.navigateBack({
							        delta:1
							    })
							},1500)
						}else{
							uni.showToast({
								title:res.data.message,
							    duration:1500,
							    icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
					},
				})
			}
		},
		components:{
			heads,mpvueCityPicker,timePicker
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/addStore.css");
</style>
