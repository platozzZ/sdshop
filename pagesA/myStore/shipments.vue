<template>
	<view class="container">
		<lktauthorize ref="lktAuthorizeComp"></lktauthorize>
		<heads :title='title'></heads>
		<template v-if="title == '选择商品'">
			<view class="list">
				<view class="list_li" v-for="(item,index) in list.list" :key="index" v-if="item.r_status==1" @tap="_choose(item)">
					<image v-if="item.chooseMe" class="xuanze" :src="xuanze"></image>
					<view class="xuanze_i" v-else></view>
					<image class="image" :src="item.imgurl"></image>
					<view class="right">
						<view class="view">{{item.p_name}}</view>
						<view class="text">{{item.size}}</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view @tap="_chooseQ">
					<image v-if="quanxuan" class="xuanze" :src="xuanze"></image>
					<view class="xuanze_i" v-else></view>
					全选
				</view>
				<view @tap="_shipments">发货</view>
			</view>
		</template>
		<template v-else>
			<view class="_ul">
				<view class="_li">
					<text>快递公司</text>
					<input @tap="showSinglePicker" type="text" disabled placeholder="请选择快递公司" v-model="company">
					<image @tap="showSinglePicker" class="jiantou" :src="jiantou"></image>
				</view>
				<view class="_li">
					<text>快递单号</text>
					<input type="text" placeholder="请填写快递单号" v-model="courier_num">
				</view>
			</view>
			<view class="bottom_ship" @tap="_shipments1">确定</view>
			<mpvue-picker v-show='show' :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
		</template>
	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	import mpvuePicker from '../../components/mpvuePicker.vue'
	export default{
		data(){
			return{
				title:'选择商品',
				// title:'填写物流信息',
				access_id:'',
				list: '',
				xuanze: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanze_hd.png',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				quanxuan: false,
				
				courier_num: '',  //快递单号
				company: '',  //快递公司
				orderList_id:'',
				sNo: '',
				shop_id:'',
				kuaidiList: [],
				express_id:'',  //快递公司ID
				
				show:false,
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
			}
		},
		computed:{
			
		},
		onLoad(option){
			var me = this
			me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
			me.shop_id = uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):me.$store.state.shop_id
			me.list = JSON.parse(option.shops)
			console.log(me.list)
		},
		onShow() {
			
		},
		methods:{
			_choose(item){
				this.$set(item,'chooseMe',!item.chooseMe)
				let list = this.list.list
				let flag = true
				for(let i = 0;i<list.length;i++){
					if(!list[i].chooseMe){
						flag = false
						break
					}
				}
				this.quanxuan = flag
			},
			_chooseQ(){
				this.quanxuan = !this.quanxuan
				let list = this.list.list
				for(let i = 0;i<list.length;i++){
					this.$set(list[i],'chooseMe',this.quanxuan)
				}
			},
			_shipments(){
				const me = this
				me.orderList_id=[]
				var dd=me.list.list
				for(let i=0;i<dd.length;i++){
					if(dd[i].chooseMe&&dd[i].r_status==1){
						me.orderList_id.push(dd[i].id)
					}
				}
				me.sNo=me.list.sNo
				if(me.orderList_id.length==0){
					uni.showToast({
						title:'请选择发货商品',
						duration:1500,
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						shop_id:me.shop_id,
						module:'app',
						action:'mch',
						m:'into_send',
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						uni.hideLoading()
						if(res.data.code==200){
							var list=[]
							me.kuaidiList=res.data.list
							for(var key in res.data.list){
								list.push(res.data.list[key].kuaidi_name)
							}
							me.pickerValueArray=list
							me.title = '填写物流信息'
						}else if(res.data.code==404){
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'../../pages/login/login?landing_code=1',
								})
							},1500)
						}else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					}
				})
			},
			_shipments1(){
				const me = this
				var data={
					access_id:me.access_id,
					shop_id:me.shop_id,
					module:'app',
					action:'mch',
					m:'send',
					sNo:me.sNo,
					express_id:me.express_id,
					courier_num:me.courier_num,
					orderList_id:me.orderList_id.join(',')
				}
				uni.request({
					url: uni.getStorageSync("url"),
					data,
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							uni.showToast({
								title:'发货成功',
								duration:1500,
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},1500)
						}else if(res.data.code==404){
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'../../pages/login/login?landing_code=1',
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
						
					}
				})
			},
			// 选择快递公司
			showSinglePicker() {
				this.show=true
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.company = e.label
				this.show=false
				this.express_id=this.kuaidiList[e.index[0]].id
			},
		},
		components:{
			heads,mpvuePicker
		}
	}
</script>

<style scoped>
	.container{
		min-height: 100vh;
		background-color: #F4F4F4;
		padding-bottom: 98rpx;
		box-sizing: border-box;
	}
	.list{background-color: #FFFFFF;}
	.list_li{
		display: flex;align-items: center;height: 180rpx;margin-left: 30rpx;padding: 30rpx 30rpx 30rpx 0;
		box-sizing: border-box;
	}
	.list .list_li:not(:last-child){border-bottom: 1px solid #E6E6E6;}
	.list_li .image{
		width: 120rpx;height: 120rpx;margin-right: 20rpx;
	}
	.xuanze,.xuanze_i{
		width: 34rpx;height: 34rpx;border-radius: 34rpx;margin-right: 30rpx;
	}
	.xuanze_i{
		box-sizing: border-box;border: 1px solid #B8B8B8;
	}
	.list_li .right{
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.list_li .right .view{
		color: #020202;
		font-size: 24rpx;
		line-height: 28rpx;
		margin-bottom: 20rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list_li .right .text{
		display: inline-block;
		color: #999999;
		font-size: 22rpx;line-height: 22rpx;
	}
	.bottom{
		display: flex;
		position: fixed;
		bottom: 0;left: 0;right: 0;
		height: 98rpx;
	}
	.bottom .xuanze,.bottom .xuanze_i{margin-right: 12rpx;}
	.bottom>view:first-child{
		flex: 1;
		display: flex;align-items: center;
		padding: 0 30rpx;
		background: #FFFFFF;
	}
	.bottom>view:last-child{
		width: 240rpx;height: 100%;
		background: #000000;color: #FFFFFF;
		font-size: 30rpx;line-height: 98rpx;
		text-align: center;
	}
	
	.jiantou{
		width: 15rpx;height: 27rpx;
	}
	._ul{
		background-color: #FFFFFF;
		padding-left: 30rpx;
	}
	._li{
		display: flex;
		align-items: center;
		height: 90rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
	}
	._ul>._li:not(:last-child){
		border-bottom: 1px solid #E6E6E6;
	}
	._li text{
		color: #020202;
		font-size: 28rpx;
	}
	._li input{
		flex: 1;
		padding-left: 60rpx;
		font-size: 28rpx;
	}
	.bottom_ship{
		position: fixed;
		left: 0;right: 0;bottom: 0;
		height: 98rpx;line-height: 98rpx;text-align: center;
		font-size: 30rpx;
		color: #FFFFFF;
		background-color: #020202;
	}
</style>
