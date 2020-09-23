<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp"></lktauthorize>
		<!-- #ifndef MP -->
		<heads :title='title'></heads>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
			<camera class='camera' mode='scanCode' @scancode="QRcode"></camera>
			<cover-view class='QR-bottom' @tap="_navigateTo('../myStore/QRdraw')">
				<cover-image class="QR-img" :src="QR_img" alt=""></cover-image>
				<cover-view class="QR-view">手动输入</cover-view>
			</cover-view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
			<!-- #ifndef H5 -->
			<button class='QRcode-s' @tap="QRs">扫码输入</button>
			<!-- #endif -->
			<button class='QRcode-x' @tap="_navigateTo('../myStore/QRdraw')">手动输入</button>
		<!-- #endif -->
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	export default{
		data(){
			return{
				title:'扫一扫',
				access_id:'',
				shop_id:'',
				order_id:'',
				p_price:'',
				sNo:'',
				QR_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/store_input.png',
				QR_flag: true
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
			// #ifndef MP-WEIXIN
				this.title='验证方式'
			// #endif
			var me = this
			if(option.shop_id){
				me.shop_id = option.shop_id
			}else{
				me.shop_id = me.$store.state.shop_id
			}
			me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
		},
		onShow() {
			
		},
		methods:{
			_navigateTo(url){
				uni.navigateTo({
					url
				})
			},
			QRcode(res){
				if(!this.QR_flag){
					return
				}
				this.QR_flag = false
				const me = this
				// 小程序扫码
				// 成功后跳转 QRsuccess页面
				uni.showLoading({
					title:'加载中'
				});
				var data={
					module:'app',
					action:'mch',
					m:'sweep_extraction_code',
					access_id:me.access_id,
					shop_id:me.shop_id,
					extraction_code: res.detail.result
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						uni.hideLoading();
						if(res.data.code==200){
							me.order_id = res.data.order_id
							me.p_price = res.data.p_price
							me.sNo = res.data.sNo
							setTimeout(()=>{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							},100)
							// 成功后跳转 QRsuccess页面
							setTimeout(()=>{
								uni.redirectTo({
									url: "QRsuccess?p_price="+me.p_price+"&sNo="+me.sNo+"&order_id="+me.order_id
								})
							},1000)
						}
						else{
							this.QR_flag = true
							setTimeout(()=>{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							},100)
						}
					}
				})
			},
			// 小程序以外扫码
			QRs(){
				var me = this
				// #ifndef H5
					uni.scanCode({
						success: function (rew) {
							uni.showLoading({
								title:'加载中'
							});
							var data={
								module:'app',
								action:'mch',
								m:'sweep_extraction_code',
								access_id:me.access_id,
								shop_id:me.shop_id,
								extraction_code: rew.result
							}
							uni.request({
								data,
								url: uni.getStorageSync("url"),
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								method:'POST',
								success:function(res){
									uni.hideLoading();
									if(res.data.code==200){
										me.order_id = res.data.order_id
										me.p_price = res.data.p_price
										me.sNo = res.data.sNo
										setTimeout(()=>{
											uni.showToast({
												title:res.data.message,
												duration:1500,
												icon:'none'
											})
										},100)
										// 成功后跳转 QRsuccess页面
										setTimeout(()=>{
											uni.redirectTo({
												url: "QRsuccess?p_price="+me.p_price+"&sNo="+me.sNo+"&order_id="+me.order_id
											})
										},1000)
									}else{
										setTimeout(()=>{
											uni.showToast({
												title:res.data.message,
												duration:1500,
												icon:'none'
											})
										},100)
									}
								}
							})
						}
					});
				// #endif
				
				// #ifdef H5
					uni.showToast({
						icon: 'none',
						title: 'H5不支持扫码功能，请选择手动输入'
					})
				// #endif
			}
		},
		components:{
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/QRcode.css");
</style>
