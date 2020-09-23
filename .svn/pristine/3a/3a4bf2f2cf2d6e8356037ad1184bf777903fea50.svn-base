<template>
	<view class="container">
		<heads :title='title'></heads>
		<!-- 导航栏 -->
		<view class="nav">
			<view :class="active==index?'active':''" v-for="(item,index) in ['未使用','已使用','已过期']" :key='index' @tap="navTo(index)">{{item}}</view>
		</view>
		<template v-if="loadFlag">
			<scroll-view v-if="list.length>0" class="content" scroll-y="true">
				<view :class="active==0?'coupon':'coupon1'" v-for="(item,index) in list" :key='index' :style="item.activity_type==5&&active==0?bg_color1:''">
					<image v-if="(item.activity_type==4||item.activity_type==5)&&active==0" class="vip_img" :src="vip_img"></image>
					<view class="coupon_top" :class="item.activity_type==5&&active==0?'coupon_top1':active==1||active==2?'coupon_top2':''" :style="item.activity_type==5&&active==0?'border-color:#B0E1FF;':''">
						<view class="coupon_top_left">
							<view>
								<span class='coupon_name'>
									{{item.name?item.name:item.product_title}}
								</span>
								<span v-if="active==0" class="coupon_top_icon" :style="item.activity_type==5?'border-color:#3398FF;color:#3398FF':''">{{item.activity_type==1?'免邮券':item.activity_type==2?'满减券':item.activity_type==3?'折扣券':item.activity_type==4?'会员赠券':item.activity_type==5?'兑换券':''}}</span>
							</view>
							<span>{{item.expiry_time}} 到期</span>
						</view>
						<!--  免邮 -->
						<view v-if="item.activity_type==1" class="coupon_top_right" :style="active==0?bg_img1:active==1?bg_img2:bg_img3">
							<view>￥<text class='coupon_top_right_data'>包邮</text></view>
							<span>{{item.limit}}</span>
						</view>
						<!--  满减 -->
						<view v-if="item.activity_type==2" class="coupon_top_right" :style="active==0?bg_img1:active==1?bg_img2:bg_img3">
							<view>￥<text class='coupon_top_right_data'>{{item.money}}</text></view>
							<span>{{item.limit}}</span>
						</view>
						<!-- 折扣 -->
						<view v-else-if="item.activity_type==3" class="coupon_top_right" :style="active==0?bg_img1:active==1?bg_img2:bg_img3">
							<view><text class='coupon_top_right_data'>{{item.discount}}</text>折</view>
							<span>{{item.limit}}</span>
						</view>
						<!-- 会员赠送券 -->
						<view v-else-if="item.activity_type==4" class="coupon_top_right" :style="active==0?bg_img1:active==1?bg_img2:bg_img3">
							<view v-if="item.money == 0"><text class='coupon_top_right_data'>{{item.discount}}</text>折</view>
							<view v-else>￥<text class='coupon_top_right_data'>{{item.money}}</text></view>
							<span>{{item.limit}}</span>
						</view>
						<!-- 兑换 -->
						<view v-else-if="item.activity_type==5" class="coupon_top_right" :style="active==0?bg_img1+'border-color:#B0E1FF;':active==1?bg_img4:bg_img3">
							<image class='duihuan_img' :src="item.imgurl"></image>
						</view>
					</view>
					<view class="coupon_bottom">
						<view class="coupon_bottom_left" @tap="discTap(index)">
							<view class="coupon_bottom_l">
								使用说明
								<image class='coupon_bottom_img' v-if="item.discFlag" :src="discFlagtop"></image>
								<image v-else class='coupon_bottom_img' :src="discFlagbottom"></image>
							</view>
						</view>
						<view v-if="active==0" class="coupon_bottom_right" @tap="to_detail(item)">
							立即使用
						</view>
						<view v-else-if="active==1" class="coupon_bottom_right pastDue">
							已使用
						</view>
						<view v-else-if="active==2" class="coupon_bottom_right pastDue">
							已过期
						</view>
						<view v-if="item.discFlag" class="coupon_bottom_b">
							<text v-if='item.activity_type==5' class='font_22'>
								1、本券可用于兑换指定商品，不能与其它优惠一同使用。
								<br>
								2、本券一次只能使用一张，自领取日起{{item.valid}}日内有效。
							</text>
							<text v-else class='font_22'>{{item.Instructions}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view v-else class="no-bargain">
				<img :src="nobargainImg" />
				<p>暂无{{active==0?"未使用":active==1?"已使用":"已过期"}}优惠券~</p>
			</view>
		</template>
		<button v-if="loop" class="coupon_btn" @tap="toCoupon">去领更多券</button>
	</view>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {
		getStorage
	} from '../../common/storage.js'
	import {
		mapMutations
	} from 'vuex'
	import lktauthorize from '../../components/lktauthorize.vue'
	export default {
		data() {
			return {
				title: '优惠券',
				access_id: '',
				active: 0,
				list: [],
				discArray:[],
				loop: true,
				nobargainImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "/images/icon1/noFind.png",
				bg_color1:'border-color:#B0E1FF;background: linear-gradient(to top, #F7FCFF 0%, #F2FAFF 100%);',
				vip_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/coupon/vip.png',
				discFlagtop:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/top.png",
				discFlagbottom:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/coupon/bottom.png",
				
				loadFlag: false
			}
		},
		components: {
			Heads
		},
		computed:{
			bg_img1(){
				let width = uni.upx2px(138)
				return `background: url(${this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL}images/icon1/coupon_bg1.png) no-repeat top right/${width}px ${width}px;`
			},
			bg_img2(){
				let width = uni.upx2px(88)
				return `background: url(${this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL}images/icon1/beenuse.png) no-repeat top right/${width}px ${width}px;border-color:rgb(221, 221, 221)`
			},
			bg_img3(){
				let width = uni.upx2px(88)
				return `background: url(${this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL}images/icon1/coupon_time.png) no-repeat top right/${width}px ${width}px;border-color:rgb(221, 221, 221)`
			},
			bg_img4(){
				let width = uni.upx2px(88)
				return `border-color:#DDDDDD;background: url(${this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL}images/icon1/beenuse.png) no-repeat top right/${width}px ${width}px;`
			}
		},
		onLoad(option) {
			if(option.loop){
				this.loop=false
			}
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			
			for(let i=0;i<this.list.length;i++){
				this.discArray.push(false)
			}
		},
		onShow(){
			let me = this;
			let p = new Promise((resolve, reject)=>{
				me.LaiKeTuiCommon.getLKTApiUrl().then(function(){
					resolve(1231)
				});
			});
			p.then(()=>{
				me._axios()
			});
		},
		methods:{
			// 导航切换
			navTo(e){
				this.list=[]
				this.active=e
				this.loadFlag = false
                this._axios()
			},
			// 使用说明
			discTap(e){
				this.$set(this.list[e],'discFlag',!this.list[e].discFlag)
			},
			// 立即使用优惠券
			to_detail(item){
				if(item.activity_type=='5'){
					uni.setStorageSync('order_list',item.order_list)
					uni.setStorageSync('level',item.level)
					uni.navigateTo({
						url:'coupon_detail'
					})
				}else{
          if (item.skip_type === 2) {
            uni.navigateTo({
              url: item.url
            });
          } else {
            uni.switchTab({
              url: item.url
            });
          }
				}
			},
			_axios(){
                uni.showLoading({
                    title:'加载中...',
                    mask:true,
                });
				let me=this
				let data={
					module: 'app',
					action: 'Coupon',
					app: 'mycoupon',
					access_id:this.access_id,
                    type: this.active
				}
				uni.request({
					data,
					url:  uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success:(res) => {
						me.loadFlag = true
                        uni.hideLoading();
						if(res.data.code==200){
                            me.list=res.data.list
						}
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			// 去领券中心
			toCoupon(){
				uni.navigateTo({
						url: '../../pagesA/shop/coupon?loop=false'
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@import url("../../static/css/coupon/coupon.less");
</style>
