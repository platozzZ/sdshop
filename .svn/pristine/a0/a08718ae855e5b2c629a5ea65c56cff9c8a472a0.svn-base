<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp"></lktauthorize>
		<heads :title='title'></heads>
		<div class='QR-card'>
			<div>
				<img :src="gouhei2ximg">
				<p>验证成功</p>
			</div>
			<p>商品自提成功~</p>
		</div>
		<div class='hr'></div>
		<div class='QR-text'>
			<p>订单编号：<span>{{order.number}}</span></p>
			<p>支付金额：<span>￥{{order.price}}</span></p>
			<button @tap="myOrder" class='myOrder'>查看订单</button>
			<button @tap="Return">返回</button>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	export default{
		data(){
			return{
				title:'扫码提取',
				order:{
					number:'',
					price:'',
					gouhei2ximg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/gouhei2x.png"
				}
			}
		},
		computed:{
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		onLoad(option){
			this.order.price = option.p_price
			this.order.number = option.sNo
		},
		onShow() {
			
		},
		methods:{
			_navigateTo(url){
				uni.navigateTo({
					url
				})
			},
			// 查看订单
			myOrder(){
				var me=this
				uni.navigateTo({
					url:'../myStore/order?order_id='+me.order.number
				})
			},
			// 返回按钮
			Return(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		components:{
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/QRsuccess.css");
</style>
