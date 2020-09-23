<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div v-if='loopStatu' class='mycoupon_bottom' @tap="_mycoupon()">
			<span>去我的优惠券</span>
		</div>
		<div v-if="list">
			<ul class='coupon_ul'>
				<li class='coupon_li' v-for ="(item,index) in list" :class='{active_background:isNone[index]}' :key="index">
					<img class='bg_img' :src="isNone[index]?coupon_bg1:coupon_bg">
					<img class="coupon_status" :src="isNone[index]?coupon_no:coupon_on"  v-if="item.point==''||item.point=='去使用'||isNone[index]"/>
					<div class='coupon_li_data' @tap="_receive(index,item.id,item.point,item.url)" >
						<div class='coupon_left' :class='{active_border:isNone[index]}'>
							<p class='coupon_p'>{{item.name}}</p>
							<div class='coupon_price' :class='{active_color:isNone[index]}'>
								<div class='coupon_price_div' v-if="item.activity_type==2">
									<span class='coupon_price_span'>￥</span>
									<span class='coupon_price_money'>{{item.money}}</span>
									<span class='coupon_t' :class='{active_color:isNone[index]}'>{{item.limit}}</span>
								</div>
								<div class='coupon_price_div color_ff3' v-else-if="item.activity_type==3">
									<span class='coupon_price_money'>{{item.discount}}<span class='font_28'>折</span></span>
									<span class='coupon_t' :class='{active_color:isNone[index]}'>{{item.limit}}</span>
								</div>
								<div class='color_ff3' v-else-if="item.activity_type==1">
									<span class='coupon_t ml_0' :class='{active_color:isNone[index]}'>{{item.limit}}</span>
								</div>
							</div>
						</div>
						<div class='coupon_right' v-if="item.point">
							<button type="button" class='coupon_but' :class='{coupon_no:isNone[index],coupon_gous:item.point=="去使用",coupon_red:item.point=="立即领取"}'>
								<span  ref='point'>{{item.point}}</span>
							</button>
						</div>
					</div>
				</li>
				
			</ul>
		</div>
		<div v-if="list && list.length==0"  class='relative'>
			<div class='noFindDiv'>
				<div>
					<img :src="noCoupon" class='noFindImg' alt="">
				</div>
				<span class='noFindText'>目前没有可以领取的优惠券哦~</span>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	
	export default {
		data(){
			return{
				returnR:'',
				back:'',
				title:'领券中心',
				access_id: '',
				list:false,
				receive_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/lingqu2x.png",
				noreceive_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/qiangguang2x.png",
				back_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/back2x.png",
				huiquan_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/huiquan2x.png',
				coupon_on:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/coupon/coupon_on.png',
				coupon_no:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/coupon_no.png',
				coupon_bg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/coupon_bg.png',
				coupon_bg1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/coupon_bg1.png',
				fastTap:true,
				frompage:'',
				noCoupon:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/noCoupon.png',
				loopStatu:true,
				isNone:[],   //是否是已抢光状态，true已抢光
			}
		},
		onLoad(option){
			if(option.loop){
				this.loopStatu=false
			}
		},
		onShow() {
			let me = this;
			me.$nextTick(function(){
				me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
				if(!me.list){
					uni.showLoading({
						title:'加载中...',
						mask:true,
					});
				}
				me._axios();
			})
		},
		methods:{
			// 检测登录后的回调
			changeLoginStatus(){
				var me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			// 去我的优惠券
			_mycoupon(){
				var me = this
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=coupon',function(){
					uni.navigateTo({
						url: '../../pagesB/coupon/mycoupon?loop=false'
					})
				});
			},
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'Coupon',
					app: 'index',
					access_id:this.access_id
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
						let {data:{list}} = res;
						me.list = list;
						me.fastTap=true;
						if(list && list.length){
							let arr = []
							for(let i=0;i<list.length;i++){
								arr.push(false)
								if(list[i].point=='已抢光'){
									arr[i]=true
								}
							}
							this.isNone = arr
						}
						
					},
					error:function(err){
						console.log(err)
					},
				})
			},
			// 点击优惠券右边的按钮
			_receive(index,id,point,url){
				var me = this
				if(point=='立即领取'){
					if(!this.fastTap){
						return
					}
					this.fastTap=false
					if(!this.access_id){
						uni.showToast({
							title:'未登录，请先登录',
							duration:1500,
							icon:'none'
						})
						setTimeout(function(){
							uni.navigateTo({
								url:'../../pages/login/login?landing_code=coupon'
							})
						},1500)
						return
					}
					var data = {
						module: 'app',
						action: 'Coupon',
						app: 'receive',
						access_id:this.access_id,
						id:id
					}
					
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							console.log(222)
							console.log(res)
							let {data:{code}} = res
							if(code==200){
								uni.showToast({
									title:'领取成功',
									duration:1500,
									icon:'none'
								})
								setTimeout(function(){
									me._axios()
								},1500)
							}else if(code==404){
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
								setTimeout(function(){
									uni.navigateTo({
										url:'../../pages/login/login?landing_code=coupon'
									})
								},1500)
							}else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
								setTimeout(function(){
									me._axios()
								},1500)
							}
						},
						error:function(err){
							me.fastTap=true
						},
					})
				}else if(point=='去使用'){
					if(!this.fastTap){
						return
					}
					this.fastTap=false
					if(url.indexOf('tabBar') > 0){
						uni.switchTab({
							url: url
						});
					}else{
						uni.navigateTo({
							url: url
						});
					}
				}
			},
		},
		components: {
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/shop/coupon.css");
</style>