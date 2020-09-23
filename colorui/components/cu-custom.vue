<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action leftAction" v-if="isLeft">
					<view class="backcontent" @tap="BackPage" v-if="isBack">
						<text class="cuIcon-back"></text>
						<slot name="backText"></slot>
					</view>
					<slot name='left'></slot>
					<!-- <view class="backcontent" @tap="BackPage" v-if="isBack">
						<text class="cuIcon-back"></text>
						<slot name="backText"></slot>
					</view>
					<view class="" @tap="backHome" v-if="isBackHome">
						<text class="cuIcon-homefill"></text>
						<slot name="homeContent"></slot>
					</view> -->
				</view>
				
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				
				<view class="action rightAction" v-if="isRight">
					<slot name="right"></slot>
					
					<!-- <view class="" @tap="toSearch">
						<text class="cuIcon-search"></text>
						<slot name="right"></slot>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				// StatusBar: !plus.navigator.getStatusbarHeight()?0:plus.navigator.getStatusbarHeight(),
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				// var StatusBar= !plus.navigator.getStatusbarHeight()?0:plus.navigator.getStatusbarHeight();
				var CustomBar= this.CustomBar;
				console.log(this);
				// alert('this.StatusBar:',this.StatusBar)
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				// alert(style)
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isLeft: {
				type: Boolean,
				default: false
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isBackHome: {
				type: Boolean,
				default: true
			},
			bgImage: {
				type: String,
				default: ''
			},
			isSort: {
				type: Boolean,
				default: false
			},
			isRight: {
				type: Boolean,
				default: false
			},
		},
		mounted() {
			// console.log(this.CustomBar);
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			backHome(){
				// #ifdef APP-PLUS
					let ws = plus.webview.getTopWebview();
					plus.webview.close(ws);
				// #endif
				// #ifdef H5
					window.history.back()
				// #endif
			},
			tips(){
				uni.showToast({
					title: "敬请期待~",
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
	view{
		box-sizing: border-box;
	}
	/* .action{
		display: flex;
		align-items: center;
		width: 160upx;
		height: 60upx;
	}
	.action.leftAction{
		border-radius: 32upx;
		font-size: 32upx;
		justify-content: center;
	}
	.action.leftAction>view{
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
	}
	.backcontent::after{
		position: absolute;
		content: '';
		width: 100%;
		height: calc(100% - 20upx);
		left: 0;
		top: 10upx;
	}
	.content image{
		width: 72px;
		height: auto;
	}
	.action.rightAction{
		justify-content: flex-end;
		
	}
	.action.rightAction view{
		padding: 5px 8px;
	} */
</style>
