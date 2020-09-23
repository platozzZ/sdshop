<template>
	<div>
		<!-- #ifndef MP -->
		<heads :title='title' :returnR='returnR'></heads>
		<!-- #endif -->
		<div class='pay_result'>
			<img :src="xuanze"/>
			<span>付款成功</span>
			<p>您的商品很快就会找您啦！</p>
		</div>
		<!--灰色间隔-->
		<div class='hr'></div>
		<div>
			<ul>
				<li>
					<span class='color_666'>订单编号：</span>
					<span>{{data1.sNo||sNo}}</span>
				</li>
				<li>
					<span class='color_666'>支付金额：</span>
					<span v-if="is_jifen" class='flex_center'>
						<font v-if='data1.total>0'>￥{{data1.total}}+</font>
						<img :src="integral_img" class='int_img'>{{data1.total_score}}
					</span>
					<span v-else>￥{{data1.total||payment_money}}</span>
				</li>	
			</ul>
			<div class='go_shopping go_home' @tap="_home">继续购物</div>
			<div class='go_shopping chakan' @tap="_order">查看订单</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	export default{
		data(){
			return{
				payment_money:'',
				title:'付款成功',
				sNo:'',
				order_id:'',
				data1:'',
				xuanze:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehei2x.png',
				returnR:99,
				flag:true,
				bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/bback.png',
				back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				is_jifen:false,
				integral_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
			}
		},
		onLoad(option){
			this.data1=JSON.parse(uni.getStorageSync("payRes"));
			this.data1.total = this.data1.total.toFixed(2);
		},
		components:{heads},
		methods:{
			_home(){
				uni.switchTab({
					url: '../../pages/tabBar/home'
				});
			},
			_order(){
				var path = '../../pages/order/order?order_id='+this.data1.order_id + '&showPay=true';
				// #ifdef H5
				console.log('h5');
				path = '../../pages/order/order?order_id='+this.data1.order_id + '&showPay=true&_store=h5';
				// #endif
				uni.redirectTo({
					url: path
				});
			}
		},

	}
</script>

<style scoped>
	@import url("../../static/css/pay/payResult.css");
	/* 上面试公共CSS,下面是私有css*/
	.hr{
		width: 100%;height: 20upx;background-color: #F4F4F4;
	}
	.color_666{color: #666666;}
	.flex_center{display: flex;justify-content: center;align-items: center;}
	.int_img{height: 24upx;width: 24upx;margin-right: 6upx;margin-bottom: 6upx;}
	.go_home{color:#fff;border-radius: 8upx;}
	.chakan{border-radius: 8upx;margin-top: 0;background: transparent;color:#242424;border: 1px solid #242424;}
</style>