<template>
	<view class='page_container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>
		<view  v-else-if='list.length>0' class='page_content'>
			<view v-for="(item,index) in list" :key='index'>
				<view class='list_top' @tap='_goStore(item.shop_id)'>
					<image class='list_logo' :src="storeImg"></image>
					{{item.shop_name}}
					<image class='list_back' :src="jiantou"></image>
					<text class='stutas'>{{item.status == 0?"待付款":item.status == 1?"待发货":item.status == 2?"待收货":item.status == 3?"待评价":item.status == 6?"交易关闭":""}}</text>
					<!-- <img :src="storeImg" >{{ item.ismch?'':item.shop_name }}
					<img :src="jiantou" style='width: 15upx;height: 30upx;margin-left: 20upx;' > -->
				</view>
				<view class='list_center'>
					<image class='list_img' :src="item.list[0].imgurl"></image>
					<view class='list_content'>
						<text>{{item.list[0].p_name}}</text>
						<text class='size'>{{item.list[0].size}}</text>
					</view>
					<view class='money'>
						<text>￥{{item.z_price}}</text>
						<text class='size'>x{{item.sum}}</text>
					</view>
				</view>
				<view class='list_bottom'>
					<view class='list_bottom_money'>
						<span class='size bold'>共{{item.sum}}件</span>
						<view>
							<span class='bold'>合计</span>
							<span class='red bold'>￥{{item.z_price}}</span>
						</view>
					</view>
					<view class='btn_box'>
						<button @tap="_goorder(item.id)">查看详情</button>
						<button @tap="_goorder(item.id)" v-if="item.status == 0" class='btn_back'>立即付款</button>
					</view>
				</view>
			</view>
			<uni-load-more v-if='moreFlag' :loadingType="loadingType"></uni-load-more>
		</view>
		<div v-else class='noFindDiv'>
			<div>
				<img class='noFindImg' :src="noOrder" />
			</div>
			<span class='noFindText'>您还没有相关的订单哦</span>
			<div @tap="_toHome()" class='goHomeBox'>
				<span class='goHome'>去逛逛</span>
			</div>
		</div>
	</view>
</template>
<script>
	import Heads from '../../components/header.vue'
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default {
		data(){
			return{
				title:'我的秒杀',
				access_id:'',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				storeImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/store.png',
				list:[],  //我的秒杀商品列表
				page:1,//页码
				noOrder:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/noOrder.png',
				load:true,
				loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				loadingType:0,
				moreFlag: false
			}
		},
		mounted(){
			let me = this;
			me.$nextTick(function() {				
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me._axios();
				});
			});
		},
		components: {
			Heads,uniLoadMore
		},
		methods:{
			_axios(){
				var me = this
				var data = {
					module: 'app',
					action: 'seckill',
					m: 'seckillorder',
					access_id: this.access_id,
					page:me.page,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					xhrFields: {
						withCredentials: true
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						me.load = false
						me.list = res.data.order
						me.page = 1
						if(res.data.order.length>=10){
							me.moreFlag = true
						}
					}
				})
			},
			_goStore(shop_id){
				uni.navigateTo({
					url:'../../pagesA/store/store?shop_id='+shop_id
				})
			},
			_goorder(order_id){
				uni.navigateTo({
						url: '../../pages/order/order?order_id=' + order_id
					})
				return false
			},
			_toHome(){
				uni.navigateTo({
					url:'../../pagesB/seckill/seckill'
				})
			}
		},
		onReachBottom(){
			var me=this
			if (this.loadingType != 0) {
				return;
			}
			this.loadingType = 1;
			me.page+=1
			var data = {
				module: 'app',
				action: 'seckill',
				m: 'seckillorder',
				access_id: this.access_id,
				page:me.page,
			}
			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success: (res) => {
					if(res.data.order.length > 0) {
						me.list = me.list.concat(res.data.order)
						me.loadingType=0;
					} else {
						me.loadingType =2;
					}
				},
				error:(err)=>{
					console.log(err)
				}
			})
		}
	}
</script>
<style scoped>
	@import url("../../static/css/seckill/seckill_my.css");
</style>