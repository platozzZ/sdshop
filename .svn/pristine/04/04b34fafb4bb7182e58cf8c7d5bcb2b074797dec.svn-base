<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中……</p>
			</div>
		</div>
		<div v-else>		
			<template v-if='display'>
				<ul class='order_goods'  style='position: relative;' v-for='(item,index) in order' :key="index">
					
					<li class='order_one dd-boxa'>
						<p v-if='!item.shop_name'>订单号：{{item.sNo}}</p>
						
						<!-- <p else @tap='_goStore(item.shop_id)'>{{item.shop_name}}</p> -->
						
						
						<p v-else @tap="_goStore(item.shop_id)" class="shopName">
							
							<img :src="storeImg">
							
							{{ item.ismch?'':item.shop_name }}
							
							<img class="dd-boxa-img" :src="jiantou">
						</p>
						
						<p v-if="item.otype=='pt'" v-text="item.status==0 ? '待付款':(item.status==1?'拼团成功-待发货':(item.status==2?'拼团成功-已发货':(item.status==3?'拼团成功-待评价':(item.status==9?'拼团中':(item.status==10?'拼团失败-未退款':(item.status==11?'拼团失败-已退款':(item.status==6?'交易关闭':(item.status==12?'交易完成':''))))))))"></p>
						<p v-else v-text="item.status==0 ? '待付款':(item.status==1?'待发货':(item.status==2?'已发货':(item.status==3?'待评价':(item.status==4?'退货':(item.status==5||item.status==12?'交易成功':(item.status==7||item.status==6?'交易关闭':''))))))"></p>
					</li>
					
					<li class='order_two' v-for='(orders,index1) in item.list' :key="index1" @tap="_navigateTo(item.status,item.id,item.otype)" >
						<img :src="orders.imgurl" />
						<div style="margin-right: 40upx;width: 58%;">
							<p class='order_p_name' style="height: auto;">{{orders.p_name}}</p>
							<p class='color_one'>{{orders.size}}</p>
						</div>
						<div>
							<p>￥{{orders.p_price}}</p>
							<p class='color_two'>x{{orders.num}}</p>
							<div class='retreat' v-if="orders.r_status==4||orders.r_status==6&&orders.re_type!=0" rich-text="orders.r_status==4?'退货中':(orders.r_status==6&&orders.re_type!=0?'退货完成':'')"></div>
				            <div class='retreat' v-if="orders.r_status==3" @click.stop='comment(orders.id,orders.r_status)' style="border: 1px solid #999;color: #999;font-size: 12px;text-align: center;">立即评价</div>
				            <div class='retreat' v-if="orders.r_status==5" @click.stop='comment(orders.id,orders.r_status)' style="border: 1px solid #999;color: #999;font-size: 12px;text-align: center;">追加评论</div>
				        </div>
					</li>
					<li class='order_last'>
						<div>
							<span>共{{item.sum}}件商品</span>
							<span class='order_all'>合计：<span>￥{{item.z_price}}</span></span>
						</div>
						<div class='last_right' v-if="item.otype!='pt'">
							<div @tap='_buttonLeft($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status)' v-text="item.status==0? leftText[0]:(item.status==2||item.status==3||item.status==5?leftText[1]:(item.status==7||item.status==6?leftText[2]:(item.status==12||item.status==4||item.status==1?leftText[3]:'')))"></div>
							<div v-if="item.status!=3 && item.status!=5 && item.status!=12" :class='item.status==1&&item.delivery_status==1?"a1":""'>
								<div @tap='_buttonRight($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status,item.list)' 
								v-show='item.status!=12 ?true:false' :class='item.status==1&&item.delivery_status==1?"a1":""' >
								{{item.status==0 ? rightText[0]:(item.status==1?rightText[1]:(item.status==2?rightText[2]:(item.status==3?rightText[3]:(item.status==4?rightText[4]:(item.status==5?rightText[5]:(item.status==7||item.status==6||item.status==12?rightText[6]:''))))))}}
								</div>
							</div>
						</div>
						<div class='last_right' v-else>
							<div @tap='_buttonLeft($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status)' v-text="item.status==0? leftText[0]:(item.status==2||item.status==3||item.status==5?leftText[1]:(item.status==7||item.status==6||item.status==11||item.status==12?leftText[2]:(item.status==9||item.status==10||item.status==1?leftText[4]:'')))"></div>					
							<div v-if='item.status!=10&&item.status!=0&&item.status!=3&&item.status!=6&&item.status!=7&&item.status!=12' @tap='_buttonRight($event,item.id,item.sNo,order.attribute_id,order.p_id,index,item.status,item.delivery_status,item.list)' 
							 :class='(item.status==1||item.status==9||item.status==11)&&item.delivery_status==1?"a1":""' >
							{{item.status==1?rightText[1]:(item.status==2?rightText[2]:(item.status==3?rightText[3]:(item.status==4?rightText[4]:(item.status==5?rightText[5]:(item.status==9?rightText[8]:(item.status==11?rightText[7]:''))))))}}
							</div>
							
						</div>
					</li>
					<li style="background-color: #F4F4F4;height: 20upx;width: 100%;margin: 0;border: none;"></li>
				</ul>
			</template>
			<div  class='empty_play' v-if='!display'>
				<img :src="emptyImg" />
				<p>您暂时还没有相关的订单哦</p>
				<p class='empty_p'>可以去看看有那些想买的</p>
				<div @tap="_toHome()">去商城逛逛</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import {mapMutations} from 'vuex'
	import { getStorage } from '../../common/storage'
	
	export default{
		data(){
			return{
				rightText:['立即付款','提醒发货','确认收货','立即评价1','退货','追加评价','再次购买','拼团详情','邀请好友'],
				leftText:['取消订单','查看物流','删除订单','查看详情','拼团详情'],
				loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				emptyImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/empyimg92x.png',
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/store.png',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				title:'搜索结果',
				access_id: '',
				sreach_value:'',
				order:'',
				display:'',
				load:true,
				fastTap:true,
			}
		},
		onLoad(option){
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
			this.sreach_value = option.sreach_value
			if(this.access_id){
				this._axios()
			}
			else{
				this.load=false
			}
		},
		onShow(option) {
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					console.log('onshow');
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					if(me.access_id){
						me._axios()
					}
					else{
						me.load=false
					}
				});
			});
		},
		computed:{
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		methods:{
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			_navigateTo(status,id,otype){
				if(status==0){
					var path = '../order/order?order_id='+id + '&showPay=true';
					// #ifdef H5
					console.log('h5');
					path = '../order/order?order_id='+id + '&showPay=true&_store=h5';
					// #endif
					uni.navigateTo({
						url:path,
						success:function(){
							console.log(1.1)
						}
					})
				}
				else{
					var path1 = 'order?order_id='+id
					// #ifdef H5
					path1 = 'order?order_id='+id+ '&showPay=true&_store=h5';
					// #endif
					uni.navigateTo({
						url:path1,
						success:function(){
							console.log(1.2)
						}
					})
				}
				
				this.flag=false
			},
			_uni_navigateTo(url){
				uni.navigateTo({
					url
				})
			},
			_toHome(){
				uni.switchTab({
					url:'../tabBar/home'
				})
			},
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					ordervalue:this.sreach_value,
					module: 'app',
					action: 'order',
					app: 'index'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							let {data: {order}} = res
							me.order = order
							console.log('me.order__________');
							console.log(me.order);
							if(order.length>0){
								me.display = true
							}else{
								me.display = false
							}
							console.log(me.display);
							me.load = false
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
					}
				})
			},
            comment(order_details_id,r_status){
                if(r_status == 3){
                    uni.navigateTo({url:'../evaluate/evaluating?order_details_id='+order_details_id+'&num=all'})
                }else{
                    uni.navigateTo({url:'../evaluate/evaluating?order_details_id='+order_details_id+'&add=true&num=all'})
                }
            },
			_buttonLeft(event,order_id,sNo,attribute_id,p_id,index,status,sum){
				var me = this
				//orde_id订单id  attribute_id商品属性id  p_id商品id  
				var otype = sNo.substr(0,2);
				var data = {
						module:'app',
						action:'order',
						order_id:order_id,
						access_id: this.access_id
					}
				if(status == 0){
					data.app = 'removeOrder'
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							console.log(res)
							let {data:{code,message}} = res
							if(code==200){
								uni.showToast({
									title: '取消成功！',
									duration: 1000,
									icon:'none'
								})
								me._axios()
							}else if(code==202){
								uni.showToast({
									title: '卖家已发货！',
									duration: 1000,
									icon:'none'
								})
								me._axios()
							}
							else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						}
					})
				}else if(status==2||status==3||status==5){
					 uni.navigateTo({
						 url:'../expressage/expressage?sNo='+sNo,
					})
				}else if(status==12||status==4||(status==1&&otype!='PT')){
					uni.navigateTo({url:'order?order_id='+order_id}),
					console.log(456)
				}else if(status==9||status==10||(status==1&&otype=='PT')){
					console.log(11);
				    var path = '../../pagesA/group/group_end?sNo='+sNo+'&returnR=1'
					uni.navigateTo({url:path})
				}else if(status==7||status==6||status==11||status==12){
					/*发送请求*/
					data.app = 'del_order'
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							console.log(res)
							let {data:{code,message}} = res
							if(code==200){
								uni.showToast({
									title: '删除成功！',
									duration: 1000,
									icon:'none'
								})
								me._axios()
							}else{
								uni.showToast({
									title: message,
									duration: 1000,
									icon:'none'
								})
							}
						}
					})
				}
			},
			_buttonRight(event,orde_id,sNo,attribute_id,p_id,index,status,sum,list){
				
				var me = this
				var otype = sNo.substr(0,2);
				
				//orde_id订单id  attribute_id商品属性id  p_id商品id  
				if(status==7||status==6||status==12){
					//跳转订单详情支付页
					var data = {
						module:'app',
						action:'order ',
						app:'buy_again',
						id:orde_id,
						access_id:this.access_id
					}
					console.log(data)
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							console.log(res)
							let {data:{cart_id,code,message}} = res 
							if(code==200){
								me.cart_id(cart_id)
								me.order_id('')
								me.address_id('')
								// #ifdef H5 
									var storage=window.localStorage;
									storage['cart_id'] = res.data.cart_id
									console.log("storage['cart_id']")
									console.log(storage['cart_id'])
								// #endif
								uni.navigateTo({url:'../pay/orderDetailsr'})
							}
							else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						}
					})
				}else if(status==0){
					me.order_id(orde_id)
					me.address_id('')
					var path = '../order/order?order_id='+orde_id;
					if(otype != 'PT'){
						path = path + '&showPay=true'
					}
					uni.navigateTo({url:path})
				}else if(status==1){//提醒发货
					//请求接口
					console.log(this.fastTap)
					if(!this.fastTap){
						return
					}
					this.fastTap=false
					if(sum==0){
						var data={
							module:'app',
							order_id:orde_id,
							access_id:this.access_id,
							app:'delivery_delivery',
							action:'order'
						}
						console.log(data)
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								me.fastTap=true
								console.log(res)
								if(res.data.code==200){
									uni.showToast({
										title: '已提醒卖家发货！',
										duration: 1000,
										icon:'none'
									})
									me._axios()
								}
								else{
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
							}
						})
					}
					else{
						me.fastTap=true
					}
					
				}else if(status==4){
					//跳转订单详情
					uni.navigateTo({url:'order?order_id='+orde_id})
				}else if(status==3){
					//评价页面
					uni.navigateTo({url:'../evaluate/evaluating?order_id='+orde_id+'&num=all'})
				}else if(status==5){
					//追加评价页面
					uni.navigateTo({url:'../evaluate/evaluating?order_id='+orde_id+'&add=true&num=all'})
				}else if(status==9||status==10||status==11){
					//参团页面
					console.log(path);
					var path = '../../pagesA/group/group_end?sNo='+sNo+'&returnR=1'
					uni.navigateTo({url:path})
					
				}else if(status==2){
					var data = {
						module:'app',
						action:'order',
						app:'ok_Order',
						order_id:orde_id,
						access_id: this.access_id
					}
					
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							let {data:{code,message}} = res
							if(code==200){
								uni.showToast({
									title: '收货成功！',
									duration: 1000,
									icon:'none'
								})
								me._axios()
							}
							else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						}
					})
				}
		},
			...mapMutations({
				cart_id:'SET_CART_ID',
				order_id:'SET_ORDER_ID',
				address_id:'SET_ADDRESS_ID'
			}),
		},
		components:{
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/order/orderSearch.css");
</style>