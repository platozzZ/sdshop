<template>
	<!-- 规则弹窗 -->
	<view class="ruleModal" v-if="isShow" @touchmove.stop.prevent @click.stop="cancel()">
		<view class="ruleModal-content" @click.stop>
			<view class="ruleModal-content-header">
				{{ title }}
			</view>
			<scroll-view scroll-y="true" class="ruleModal-content-body">
				<rich-text :nodes="details"></rich-text>
			</scroll-view>
			<view class="ruleModal-content-footer">
				<view class="foobtn" @click.stop="cancel()">
					<text>我知道了</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:'ruleModal',
		props:['value','title','details'],
		data(){
			return {
				isShow:false
			}
		},
		watch:{
			value(op){
				this.isShow = op
			}
		},
		methods:{
			cancel(){
				this.$emit('click',false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.ruleModal {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 9999;
		display:flex;
    justify-content: center;
    align-items: center;
		&-content {
			width: 520upx;
			height: 720upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			display:flex;
			flex-direction: column;
			&-header {
				color: #020202;
				font-weight: bold;;
				font-size: 30upx;
				text-align: center;
				padding-top: 39upx;
				padding-bottom: 34upx;
			}
			
			&-body {
				padding: 0upx 29upx;
				margin-bottom: 15upx;
				font-size: 24upx;
				color: #666666;
				flex:1;
				overflow-y: scroll;
				box-sizing: border-box;
				word-wrap: break-word;
			}
			
			&-footer {
				display:flex;
				justify-content:center;
				margin-bottom: 40upx;
				.foobtn {
					width: 240upx;
					height: 70upx;
					border-radius:8upx;
					border:2upx solid rgba(36,36,36,1);
					display:flex;
					align-items: center;
					justify-content: center;
					
					text{
						color: #020202;
						font-size: 30upx;
						font-weight:500;
					}
				}
			}
		}
	}
</style>
