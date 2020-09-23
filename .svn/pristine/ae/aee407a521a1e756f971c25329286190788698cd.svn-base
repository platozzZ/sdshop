<template>
	<view class="container">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<view class="container_top">
			<heads :title='title'></heads>
			<view class="searhBox">
				<view class="searhBox_item" @tap="classFlag=!classFlag">
					分类
					<image class="down" :src="down"></image>
					
					<view class="searhBox_item_list" v-if="classFlag" @tap.stop>
						<view @tap="changeClass(item)" :class="{active:item.checkMe}" class="li" v-for="(item,index) in classList" :key="index">{{item.pname}}</view>
					</view>
				</view>
				<view class="searhBox_item" @tap="classFlag1=!classFlag1">
					子类
					<image class="down" :src="down"></image>
					
					<view class="searhBox_item_list" v-if="classFlag1" @tap.stop>
						<template v-if="!cid">
							<view class="li">请选择分类！</view>
						</template>
						<template v-else-if="classList1.length==0">
							<view class="li">该分类没有子类！</view>
						</template>
						<template v-else>
							<view @tap="changeClass1(item)" :class="{active:item.checkMe}" class="li" v-for="(item,index) in classList1" :key="index">{{item.pname}}</view>
						</template>
					</view>
				</view>
				<view class="searhBox_item" @tap="brandFlag=!brandFlag">
					品牌
					<image class="down" :src="down"></image>
					
					<view class="searhBox_item_list" v-if="brandFlag" @tap.stop>
						<template v-if="!cid">
							<view class="li">请选择分类！</view>
						</template>
						<template v-else-if="brandList.length==0">
							<view class="li">该分类没有品牌！</view>
						</template>
						<template v-else>
							<view @tap="changeBrand(item)" :class="{active:item.checkMe}" class="li" v-for="(item,index) in brandList" :key="index">{{item.brand_name}}</view>
						</template>
					</view>
				</view>
				<view class="searhBox_item" @tap="proFlag=!proFlag">
					更多
					<image class="down" :src="down"></image>
					
					<view class="searhBox_item_proName" v-if="proFlag" @tap.stop>
						<view class="title">商品名称</view>
						<input type="text" class="proName" placeholder="输入商品名称" v-model="product_title">
						<view class="btnBox">
							<view class="leftBtn" @tap="quxiao">取消</view>
							<view class="rightBtn" @tap="queding">确定</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="proBox">
			<view class="pro" v-for="(item,index) in list" :key="index" @tap="checkChange(item)">
				<image class="xuanze" :src="item.checkMe?xuanzehei:xuanzehui"></image>
				<image class="image" :src="item.imgurl"></image>
				<view style="flex: 1;overflow: hidden;">
					<view class="proTitle">
						{{item.name}}
					</view>
					
					<view class="proSize">
						规格：{{item.attr}}
					</view>
					
					<view class="priceBox">
						<view class='price'>￥{{item.price}}</view>
						<view class="size">库存：{{item.num}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" v-if="list.length>9"></uni-load-more>
		</view>
		
		<view class="mask_bg" v-if="classFlag || classFlag1 || brandFlag || proFlag" @tap="closeBg" @touchmove.stop.prevent></view>
		
		<view class="bottomBox">
			<view class="bottomBox_left">
				<view class="bottomBox_left_left" @tap="checkChange(false)">
					<image class="xuanze" :src="qxFlag?xuanzehei:xuanzehui" style="margin-right: 12rpx;"></image>
					全选
				</view>
				
				<view class="bottomBox_left_right">
                    已选
					<view class="bold">{{checkNum}}</view>
                    款商品
                </view>
			</view>
			
			<view class="bottomBox_right" @tap="toAdd">
				{{ this.type == 'pt'?'拼团设置':'秒杀设置' }}
				
			</view>
		</view>
	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default {
		data(){
			return {
				title: '添加活动商品',
				access_id:'',
				id: '',
				list: [],
				classList: [],
				classList1: [],
				brandList: [],
				cid: '',
				cid1: '',
				cid2: '',
				brand_id: '',
				product_title: '',
				
				down: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/down.png',
				xuanzehui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanzehui2x.png',
				xuanzehei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/xuanzehei2x.png',

				classFlag: false,
				classFlag1: false,
				brandFlag: false,
				proFlag: false,
				
				qxFlag: false,
				page: 1,
				loadingType: 0,
				
				type: ''
			}
		},
		components:{ heads,uniLoadMore },
		onLoad(option) {
			this.id = option.id
			this.type = option.type
			
			if(this.type=='pt'){
				this.title="添加拼团商品"
			}else if(this.type=='ms'){
				this.title="添加秒杀商品"
			}
			
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me.list = []
					me.loadingType = 0
					me.page = 1
					me.qxFlag = false
					me.axios();
				});
			});
		},
		onReachBottom() {
			if (this.loadingType != 0) {
				return;
			}
			this.loadingType = 1
			this.page++
			this.axios()
		},
		computed:{
			checkNum(){
				var num = 0
				this.list.filter(item=>{
					if(item.checkMe){
						num++
					}
				})
				return num
			},
			checkList(){
				var arr = []
				this.list.filter(item=>{
					if(item.checkMe){
						item.act_price = parseInt(Number(item.price)*0.8)
						item.act_num = parseInt(Number(item.num)*0.1)
						if(item.act_num<1){
							item.act_num = 1
						}
						arr.push(item)
					}
				})
				return arr
			}
		},
		watch:{
			cid(val){
				this.brand_id = ''
				if(val){
					this.getBrand(val)
				}
				this.list = []
				this.loadingType = 0
				this.page = 1
				this.qxFlag = false
				this.axios()
			},
			brand_id(val){
				this.list = []
				this.loadingType = 0
				this.page = 1
				this.qxFlag = false
				this.axios()
			},
			classFlag(val){
				if(val){
					this.classFlag1 = false
					this.brandFlag = false
					this.proFlag = false
				}
			},
			classFlag1(val){
				if(val){
					this.classFlag = false
					this.brandFlag = false
					this.proFlag = false
				}
			},
			brandFlag(val){
				if(val){
					this.classFlag1 = false
					this.classFlag = false
					this.proFlag = false
				}
			},
			proFlag(val){
				if(val){
					this.classFlag1 = false
					this.brandFlag = false
					this.classFlag = false
				}
			}
		},
		onShow(){
			// let me = this;
			// me.$nextTick(function(){
			// 	me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
			// 		me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
			// 		me.list = []
			// 		me.loadingType = 0
			// 		me.page = 1
			// 		me.qxFlag = false
			// 		me.axios();
			// 	});
			// });
		},
		methods:{
			changeLoginStatus(){
				me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
				me.list = []
				me.loadingType = 0
				me.page = 1
				me.qxFlag = false
				me.axios();
			},
			toAdd(){
				if(this.checkNum == 0){
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					})
					return
				}
				uni.setStorageSync('checkProList',this.checkList)
				uni.navigateTo({
					url: '/pagesA/myStore/activities_set?id='+this.id+'&type='+this.type
				})
			},
			queding(){
				this.proFlag = false
				this.list = []
				this.loadingType = 0
				this.page = 1
				this.qxFlag = false
				this.axios()
			},
			quxiao(){
				this.proFlag = false
				this.product_title = ''
			},
			changeBrand(item){
				item.checkMe = !item.checkMe
				if(item.checkMe){
					this.brandList.filter(items=>{
						if(item.brand_id!=items.brand_id){
							items.checkMe = false
						}
					})
					this.brand_id = item.brand_id
				}else{
					this.brand_id = ''
				}
			},
			changeClass(item){
				item.checkMe = !item.checkMe
				if(item.checkMe){
					this.classList.filter(items=>{
						if(item.cid!=items.cid){
							items.checkMe = false
						}
					})
					this.cid = item.cid
					this.cid1 = item.cid
					this.getClass(item.cid)
				}else{
					this.cid = ''
					this.cid1 = ''
					this.classList1 = []
					this.brandList = []
				}
			},
			changeClass1(item){
				item.checkMe = !item.checkMe
				if(item.checkMe){
					this.classList1.filter(items=>{
						if(item.cid!=items.cid){
							items.checkMe = false
						}
					})
					this.cid = item.cid
					this.cid2 = item.cid
				}else{
					this.cid = this.cid1
				}
			},
			checkChange(item){
				if(item){
					item.checkMe = !item.checkMe
					
					let qxFlag = true
					this.list.filter(items=>{
						if(!items.checkMe){
							qxFlag = false
						}
					})
					
					this.qxFlag = qxFlag
				}else{
					this.qxFlag = !this.qxFlag
					
					this.list.filter(items=>{
						items.checkMe = this.qxFlag
					})
				}
			},
			closeBg(){
				this.classFlag = false
				this.classFlag1 = false
				this.brandFlag = false
				this.proFlag = false
			},
			axios(){
				let data = {
					module:'app',
					action: 'platform_activities',
					m: 'listdetail',
					access_id: this.access_id,
					mch_id: this.$store.state.shop_id?this.$store.state.shop_id:uni.getStorageSync('shop_id'),
					page: this.page,
					cid: this.cid,
					brand_id: this.brand_id,
					product_title: this.product_title
				}
				this.$req.post({data}).then(res=>{
					let { code, pro, message, attr } = res
					if(code==200){
						if(this.classList.length == 0){
							attr.filter(item=>{
								item.checkMe = false
							})
							this.classList = attr
						}
						
						if(pro.length>0){
							pro.filter(item=>{
								item.checkMe = false
							})
							this.list.push(...pro)
							this.qxFlag = false
						}
						
						if (pro.length > 9) {
							this.loadingType = 0;
						} else {
							this.loadingType = 2;
						}
					}else{
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
				})
			},
			getClass(cid){
				let data = {
					module:'app',
					action: 'platform_activities',
					m: 'pro_class',
					access_id: this.access_id,
					cid
				}
				this.$req.post({data}).then(res=>{
					let { code, message } = res
					if(code==200){
						res.class.filter(item=>{
							item.checkMe = false
						})
						this.classList1 = res.class
					}else{
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
				})
			},
			getBrand(cid){
				let data = {
					module:'app',
					action: 'platform_activities',
					m: 'pro_brand',
					access_id: this.access_id,
					cid
				}
				this.$req.post({data}).then(res=>{
					let { code, message, brand } = res
					if(code==200){
						brand.filter(item=>{
							item.checkMe = false
						})
						this.brandList = brand
					}else{
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		background-color: #F6F6F6;
		min-height: 100vh;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		
		&_top{
			position: sticky;top: 0;z-index: 999;
		
			.searhBox{
				display: flex;
				background: #FFFFFF;
				
				&_item{
					flex: 1;position: relative;
					display: flex;align-items: center;justify-content: center;
					height: 100rpx;
					border-bottom: 1px solid #EEEEEE;
					box-sizing: border-box;
					
					.down{
						width: 20rpx;height: 10rpx;margin-left: 14rpx;
					}
					
					&_list{
						position: absolute;top: 100rpx;left: 0;
						padding: 0 30rpx;
						background-color: #FFFFFF;
						max-height: 320rpx;overflow-y: auto;
					
						.li{
							width: 300rpx;height: 80rpx;line-height: 80rpx;
							padding: 0 10rpx;
							box-sizing: border-box;
						}
						
						.active{
							background-color: #EEEEEE;
						}
					}
					
					&_proName{
						position: absolute;top: 100rpx;right: 0;
						padding: 0 30rpx;
						background-color: #FFFFFF;
						height: 302rpx;width: 100vw;
						box-sizing: border-box;
						
						.title{
							padding: 27rpx 0 20rpx;
							font-size: 26rpx;color: #666666;line-height: 26rpx;
						}
						
						.proName{
							width: 100%;height: 70rpx;border:1px solid rgba(230,230,230,1); border-radius:6rpx;
							box-sizing: border-box;padding: 0 20rpx;
							font-size: 24rpx;
						}
						
						.btnBox{
							display: flex;align-items: center;justify-content: space-between;
							height: 120rpx;
							margin-top: 40rpx;
							
							.leftBtn,.rightBtn{
								display: flex;align-items: center;justify-content: center;
								width:330rpx;
								height:80rpx;
								border-radius:8rpx;
								font-size: 28rpx;
							}
							
							.leftBtn{
								background-color: #DDDDDD;color: #020202;
							}
							
							.rightBtn{
								background-color: #020202;color: #FFFEFE;
							}
						}
					}
				}
			}
			
			
		}
		
		.proBox{
			padding: 20rpx 0;
			
			.pro{
				display: flex;align-items: center;
				padding: 30rpx;background-color: #FFFFFF;border-bottom: 1px solid #E6E6E6;
				
				.image{
					width: 120rpx;height: 120rpx;margin-right: 24rpx;
				}
				
				.proTitle{
					color: #020202;font-size: 26rpx;line-height: 26rpx;
					white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
				}
				
				.proSize{
					color: #999999;font-size: 24rpx;line-height: 24rpx;margin-top: 20rpx;
					white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
				}
				
				.priceBox{
					display: flex;align-items: center;
					margin-top: 30rpx;
					
					.price{
						color: #FF0000;font-size: 24rpx;line-height: 24rpx;font-weight: bold;
					}
					
					.size{
						color: #999999;font-size: 24rpx;line-height: 24rpx;margin-left: 60rpx;
					}
				}
			}
		}
		
		.mask_bg{
			position: fixed;top: 0;left: 0;right: 0;bottom: 0;
			background-color: rgba(0,0,0,0.4);
			z-index: 101;
		}
		
		.bottomBox{
			display: flex;
			position: fixed;bottom: 0;left: 0;right: 0;
			height: 98rpx;
			background-color: #FFFFFF;
			z-index: 99;
			
			&_left{
				flex: 1;
				display: flex;justify-content: space-between;align-items: center;
				padding: 0 30rpx;
				border-top: 1px solid #E6E6E6;
				
				&_left{
					display: flex;align-items: center;height: 100%;
					width: 200rpx;
				}
				
				&_right{
					display: flex;align-items: center;
					font-size: 28rpx;color: #666666;
					
					.bold{
						color: #FF0000;font-weight: bold;
					}
				}
			}
			
			&_right{
				width: 240rpx;height: 98rpx;box-sizing: border-box;padding-left: 50rpx;
				line-height: 98rpx;font-size: 30rpx;
				background-color: #020202;color: #FFFFFF;
			}
		}
		
		.xuanze{
			width: 34rpx;height: 34rpx;margin-right: 30rpx;
		}
	}
</style>
