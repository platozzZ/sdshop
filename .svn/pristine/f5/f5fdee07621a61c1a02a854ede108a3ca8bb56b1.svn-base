<template>
	<view class="live">
		<heads title="来客直播" bgHei='true' navWhite='true' returnFlag='1'/>
		<view class="topBarBox">
			<view v-for="(item,index) in topBar" :key="index" :class="currentIndex==index?'checked':''" @tap="changeTab(index)">{{item}}</view>
		</view>
		<!-- 无数据的时候 -->
		<view class="null" v-if="isNull" >暂无直播数据</view>
		<!-- 直播列表的组件 --> 
		<scroll-view scroll-y="true" class="scroll"  v-else>
			<view>
				<live-item :liveList="list"></live-item>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import heads from '../../components/header.vue'
	import liveItem from '../../components/liveItem.vue'
	export default {
		data() {
			return {
				topBar: ['正在直播','未开始','已结束'],
				currentIndex: 0,
				// viewHeigth: 0,
				notStartList: [],  //未开始的
				endList: [],  //结束的数据
				Listing: [],  //进行中数据
				list: [],  //传给组件的的数组
				isNull: false,
				start: 0,
				limit: 10,  //一次返5条吧
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.getLiveList()
			}) 
		},
		methods: {
			async getLiveList(){
				let data = {
					module: 'app',
					action: 'liveBroadcast',
					app: 'getLiveList',
					start: this.start,
					limit: this.limit
				}
				let res = await this.$req.post({data})
				console.log(res)
				if(res.code == 200){
					this.classificationByStatus(res.list.room_info)
					// this.list = res.list.room_info
					// console.log(this.list)
				}else{
					this.isNull = true
				}
			},
			/* 把数据根据状态分类
			* 101 直播中
			* 102未开始
			* 103已结束
			*/ 
			classificationByStatus(allList){
				allList.filter((item)=>{
					if(item.live_status == 101){
						this.Listing.push(item)
					}else if(item.live_status == 102){
						this.notStartList.push(item)
					}else if(item.live_status == 103){
						this.endList.push(item)
					}
				})
				// 默认给正在直播的数据
				this.list = this.Listing
				if(!this.list.length){
					this.isNull = true
				}
			},
			// 切换导航
			changeTab(index){
				this.currentIndex = index
				switch (index){
					case 0:
						this.list = this.Listing
						break;
					case 1:
						this.list = this.notStartList
						break;
					case 2:
						this.list = this.endList
						break;
				}
				if(this.list.length === 0){
					this.isNull = true
				}else{
					this.isNull = false
				}
			}
		},
		components: {
			heads,
			liveItem
		}
	}
</script>

<style lang="less" scoped>
	.null{
		width: 100%;
		line-height: 100rpx;
		text-align: center;
		color: #999;
		font-size: 24rpx;
		padding-top: 50px;
	}
	.topBarBox{
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 90rpx;
		view{
			font-size: 28rpx;
			color: @uni-text-color-grey;
			text-align: center;
			flex: 1;
		}
	}
	.checked{
		position: relative;
		color: @uni-color-primary !important;
		&::after{
			content: '';
			position: absolute;
			width: 120rpx;
			height: 2px;
			background-color: @uni-color-primary;
			bottom: 0;
			left: 64rpx;
		}
	}
	.scroll{
		// height: 1048rpx;
		box-sizing: border-box;
		height: 81vh;
	}
</style>
