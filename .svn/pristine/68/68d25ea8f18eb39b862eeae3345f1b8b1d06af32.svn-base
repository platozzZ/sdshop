<template>
	<div :style="'display:flex;height:'+BoxHeight">
		<!-- #ifndef MP-ALIPAY -->
		<div class='head' :class="{'head_w':ishead_w == '1', 'border':border == true}">
			<div :class="{'white':!navWhite}" :style="{height: halfWidth}"></div>
			<div class='header'>
				<div @tap='_back1' v-if="flag&&(!returnFlag)">
					<img v-if="ishead_w == '1'" :src="back1">
					<img v-else :src="back">
				</div>
				<img :src="bback" @tap='_back1' v-if="(!flag) && (!returnFlag)" class="header_img">
				<p :class="{'title_w':ishead_w == '1'}">{{title}}</p>
			</div>
		</div>
		<!-- #endif -->
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../common/storage.js'
	export default {
		data() {
			return {
				flag: true,
				bback: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/bback.png',
				back: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
			}
		},
		computed:{
			halfWidth() {
				var gru=getStorage('data_height')?getStorage('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru);
				// #ifdef MP-TOUTIAO
				// const info = uni.getSystemInfoSync()
				// if(info.platform == 'ios'){
				// 	heigh=parseInt(gru);
				// }else{
				// 	heigh=0
				// }
				// #endif
				return heigh + 'px';
			},
			BoxHeight() {
				var gru=getStorage('data_height')?getStorage('data_height'):this.$store.state.data_height
				// #ifdef MP-TOUTIAO
				// const info = uni.getSystemInfoSync()
				// if(info.platform != 'ios'){
				// 	gru=0
				// }
				// #endif
				let height = 0;
				// #ifndef MP-ALIPAY
				var heigh=parseInt(gru) + uni.upx2px(88)
				height = heigh&&heigh>0?heigh:uni.upx2px(88)
				// #endif
				return height +'px'
			}
		},
		onLoad(option) {
			console.log('header');
			console.log(this.returnR);
		},
		props: [
			'title','returnR','navWhite','returnFlag','border','ishead_w'
		],

		methods: {
			...mapMutations({
				status: 'data_height'
			}),
			_back() {
				this.flag = false
				console.log(this.returnR)
			},
			_back1() {
				this.flag = false
				switch (Number(this.returnR)) {
					case 1:
						uni.navigateBack({
							delta: 2
						});
						break;
					case 2:
						uni.switchTab({
							url: '../tabBar/shoppingCart'
						});
						break;
					case 3:
						uni.redirectTo({
							url: '../login/login.vue'
						});
						break;
					case 4:
						uni.navigateBack({
							delta: 3
						});
						break;
					case 5:
						uni.redirectTo({
							url: '../order/myOrder'
						});
						break;
					case 6:
						uni.switchTab({
							url: '../../pages/tabBar/home'
						});
						break;
					case 7:
						uni.switchTab({
							url: '../../pages/tabBar/my'
						});
						break;
					case 8:
						uni.switchTab({
							url: "../tabBar/my"
						});
						break;
					case 9:
						uni.redirectTo({
							url: "/pagesA/myStore/myStore"
						});
						break;
					default:
						if(getCurrentPages().length>1){
							uni.navigateBack({
								delta: 1
							})
						}else{
							uni.switchTab({
								url:'/pages/tabBar/home'
							})
						}
				}
				this.flag = true
			}
		}

	}
</script>

<style scoped>
	.border {
		border-bottom: 0px solid #eee !important;
	}
	
	.head {
		position: fixed;
		left: 0;
		top: 0;
		background-color: #fff;
		width: 100%;
		z-index: 9999;
		border-bottom: 1px solid #eee;
	}
	.head .white{
		background: #FFFFFF;
	}

	.header {
		color: #fff;
		border: none;
	}

	.header img {
		position: absolute;
		top: 26upx;
		left: 20upx;
		width: 24upx;
		height: 36upx;
	}

	.header a {
		position: absolute;
		width: 36upx;
		height: 36upx;
		border-radius: 50%;
	}

	.header_img {
		top: 46upx !important;
		left: 10upx !important;
		width: 64upx !important;
		height: 64upx !important;
	}

	.header p {
		text-align: center;
		width: 100%;
		height: 100%;
		line-height: 88upx;
		color: #020202;
		font-size: 32upx;
	}

	.header>div {
		height: 88upx;
		width: 160upx;
		position: absolute;
		z-index: 9999;
	}
	
	.head_w{background: transparent;border-bottom: 0;}
	.title_w{color: #FFFFFF!important;}
</style>
