<template>
	<view class="rePlay">
		<view id="myVideo" class="video">
			<video :src="src" 
			object-fit="fill" 
			:autoplay="true" 
			:muted="true" 
			show-play-btn 
			show-center-play-btn 
			enable-progress-gesture
			enable-play-gesture
			auto-pause-if-navigate
			auto-pause-if-open-native
			:poster="img"
			@ended='playNext'
			>
			</video>
		</view>
		<view style="width: 100px;height: 100px;background-color: pink;position: absolute;top: 0;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				roomid: '',
				src: '',  //回放链接
				img: '',
				isMore: true, //是否有多条视频
				currentPlay: 0,
				total: 0,  //视频总条数
			};
		},
		onReady(){
			 this.videoContext = uni.createVideoContext('myVideo')
		},
		onLoad(option){
			// this.title = option.title
			this.img = option.img
			uni.setNavigationBarTitle({
				title: option.title
			});	
			this.getReplayList(option.roomID)
			console.log(this.$store.state.replayGoods)
		},
		methods:{
			async getReplayList(roomid){
				let data = {
					module: 'app',
					action: 'liveBroadcast',
					app: 'getLiveHistory',
					start: 0,
					limit: 10,
					roomid: roomid
				}
				let res = await this.$req.post({data})
				console.log(res)
				if(res.code == 200){
					this.total = res.list.total
					if(res.list.total == 1){
						this.isMore = false
					}else{
						this.currentPlay = 0
					}
					let reversArr = res.list.live_replay.reverse()
					this.playList = reversArr
					this.src = reversArr[0].media_url
				}
				
			},
			// 结束
			playNext(){
				if(this.isMore){
					if(this.total-1 == this.currentPlay){
						uni.showToast({
							title: '播完了'
						})
						this.isMore = false
					}else{
						this.currentPlay++
						this.src = this.playList[this.currentPlay]
					}
				}
			}
		},
	}
</script>

<style lang="less" scoped>
.rePlay{
	position: relative;
}
.video{
	width: 100%;
	height: 100vh;
	video{
		width: 100%;
		height: 100vh;
	}
}
</style>
