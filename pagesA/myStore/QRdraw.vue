<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp"></lktauthorize>
		<heads :title='title'></heads>
		<div class='QR-content'>
			<p>验证码</p>
			<input type="text" placeholder="请输入提取验证码" :placeholder-style="placeStyle" v-model="shop_code"/>
		</div>
		<button @tap="QRsuccess" class="QR-btn">验证</button>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	export default{
		data(){
			return{
				title:'验证码提取',
				access_id:'',
				shop_code:'',
				order_id:'',
				p_price:'',
				sNo:'',
				placeStyle:'color:#888888;'
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
			if(option.order_id){
				this.order_id = option.order_id
			}
		},
		onShow() {
			var me = this
			me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
			me.shop_id = uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):me.$store.state.shop_id
		},
		methods:{
			_navigateTo(url){
				uni.navigateTo({
					url
				})
			},
			// 点击确认按钮提交验证码
			QRsuccess(e){
				// 成功后跳转 QRsuccess页面
				
				uni.showLoading({
					title:'加载中'
				});
				var me = this
				if(me.shop_code == ''){
					uni.showToast({
					    title:'请填写提货码',
					    duration:1500,
					    icon:'none'
					})
					return
				}
				var data={
					module:'app',
					action:'mch',
					m:'verification_extraction_code',
					access_id:me.access_id,
					shop_id:me.shop_id,
					order_id:me.order_id,
					extraction_code:me.shop_code
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
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							uni.redirectTo({
								url: "QRsuccess?p_price="+me.p_price+"&sNo="+me.sNo+"&order_id="+me.order_id
							})
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
		components:{
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/QRdraw.css");
</style>
