<template>
	<div>
		<div class='relative'>
			<heads :title='title'></heads>
			<!-- #ifndef MP -->
			<div id='copyshare' @tap="saveImg" :style="'top: '+top+'px'">保存</div>
			<!-- #endif -->
		</div>
		<!-- #ifdef MP-WEIXIN -->
		<div id='copyshare1' @tap="saveImg">保存</div>
		<!-- #endif -->
		<div class="canvas">
			<img :src="canvas">
		</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	export default {
		data() {
			return {
				title: '会员分享', //页面标题
				canvas:'',
				top:'0',
				saveImgFlag: true
			}
		},
		components: {
			Heads
		},
		onLoad() {
			//微信小程序中自定义标题
			//#ifdef MP-WEIXIN
			uni.setNavigationBarTitle({
				title: this.title
			});
			// #endif
			
			// #ifdef APP-PLUS
			var that = this
			uni.getSystemInfo({
				success(res){
					that.top=res.statusBarHeight
				}
			})
			// #endif
		},
		onShow() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			this._axios();
		},
		methods: {
			_axios() {
				var me = this
				var store_type
				// #ifdef APP-PLUS
				store_type = 2
				// #endif
				// #ifdef MP-WEIXIN
				store_type=1
				// #endif
				var data = {
					access_id: me.access_id,
					module: 'app',
					action: 'recharge',
					app: 'share',
					store_type:store_type
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						if (res.data.code == 200) {
							me.canvas = res.data.imgUrl
						}
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			saveImg(){
				if(this.saveImgFlag){
					this.saveImgFlag=false
					var me = this
					uni.getImageInfo({
						src:me.canvas,
						success(res){
							if(res.path){
								uni.saveImageToPhotosAlbum({
									filePath: res.path,
									success: function () {
										uni.showToast({
											icon:'none',
											title:'保存成功'
										})
									},
									complete: function () {
										me.saveImgFlag=true
									}
								});
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/vip/vip_share.css");
</style>
