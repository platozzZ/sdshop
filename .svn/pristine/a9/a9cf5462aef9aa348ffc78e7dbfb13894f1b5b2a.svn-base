<template>
	<div>
		<heads :title='title' :returnR='returnR'></heads>
		<div class='pay_result'>
			<img :src="xuanze"/>
			<span>支付成功</span>
			<p>您的商品很快就会找您啦！</p>
		</div>
		<!--灰色间隔-->
		<div class="yh-line"></div>
		<div>
			<ul>
				<li>
					<span class="yh-spans">订单编号：</span>
					<span>{{data1.sNo||sNo}}</span>
				</li>
				<li style="display: flex;">
					<span class="yh-spans">支付金额：</span>
					<span v-if="is_jifen" class="yh-is_jifen">
						<text v-if="data1.total > 0">￥{{data1.total}}+</text>
						<img :src="integral_img" class="yh-integral_img">{{data1.total_score}}
					</span>
					<span v-else>￥{{data1.total||payment_money}}</span>
				</li>	
			</ul>
			<div class='go_shopping yh-go_shopping' @tap="_home()">继续购物</div>
			<div v-if='order_id' class='go_shopping go_order' @tap="_order()">查看订单</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { mapMutations } from 'vuex'
	export default{
		data(){
			return{
				payment_money:'',
				title:'支付结果',
				sNo:'',
				order_id:'',
				data1:'',
				returnR:'6',
				flag:true,
				is_jifen:false,
				xuanze:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/xuanzehei2x.png",
				bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/bback.png",
				back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/back2x.png",
				integral_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
			}
		},
		onLoad(option){
			console.log("----------------oooo-");
			console.log(option);
			if(option.payment_money){
				this.payment_money = option.payment_money
				this.sNo = option.sNo
			}else if(option.is_jifen){
				this.is_jifen = option.is_jifen
				this.data1=uni.getStorageSync("payRes");
				this.order_id = this.data1.order_id
			}else{
				this.data1=JSON.parse(uni.getStorageSync("payRes"));
				this.data1.total = this.data1.total.toFixed(2);
				this.order_id = this.data1.order_id
			}
			console.log(this.data1);
		},
		components:{
			heads
		},
		methods:{
			...mapMutations({
				status: 'SET_STATUS',
			}),
			/**
			 * 
			 * */
			_home(){
				uni.switchTab({
					url: '../tabBar/home'
				});
			},
			/**
			 * 
			 * */
			_back(){
				uni.switchTab({
					url: '../tabBar/home'
				});
			},
			/**
			 * @description 查看订单
			 * */
			_order(){
				this.status(0)
				uni.navigateTo({
					url: '../order/myOrder'
				});
			}
		},

	}
</script>

<style scoped>
	@import url("../../static/css/pay/payResult.css");
</style>