<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div class='wl_content' v-for='(item,index) in list' :key='index' @tap='_goEx(index)'>
			<div class='wx_title'>
				<img class='wl_img' :src="wl_img">
				物流单号：{{item.courier_num}}
			</div>
			<scroll-view class='scroll_view' scroll-x>
				<div class='scroll_view_data'>
					<div v-for='(items,indx) in item.pro_list' :key='indx'>
						<span class='scroll_view_num' v-if='items.num>1'>{{items.num}}</span>
						<img class='img' :src="items.img">
					</div>
				</div>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	
	export default{
		data(){
			return{
				title: '查看物流',
				access_id: '',
				wl_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/wuliu2x.png',
				list: [],
			}
		},
		components:{
			heads
		},
		onLoad(option) {
			if(option.sNo){
				let sNo = option.sNo
				let data = {
					module: 'app',
					action: 'order',
					app: 'logistics',
					id: sNo,
					access_id:this.access_id,
					type:'',
				}
				
				if(this.source == 1){
					data.type = 'pond'
				}
				uni.request({
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data,
					method:'POST',
					success:(res) => {
						uni.hideLoading()
						if(res.data.code == 200){
							this.list = res.data.res
						} else {
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},
					fail:(e) => {
						uni.showToast({
							title: '数据加载失败！',
							duration: 2000,
							icon:'none'
						})
					}
				})
			}
		},
		methods:{
			_goEx(index){
				let data = this.list[index]
				uni.navigateTo({
					url: '../../pages/expressage/expressage?list='+JSON.stringify(data),
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		min-height: 100vh;
		background: #F6F6F6;
	}
	.wl_content{
		display: flex;
		flex-direction: column;
		height: 240upx;
		padding: 30upx;
		background: #FFFFFF;
		margin-bottom: 20upx;
	}
	.wl_img{
		width: 31upx;
		height: 31upx;
		margin-right: 14upx;
	}
	.wx_title{
		display: flex;
		align-items: center;
		font-size: 28upx;
		line-height: 28upx;
		color: #020202;
	}
	.scroll_view{
		flex: 1;
	}
	.scroll_view_data{
		display: flex;
		padding-top: 32upx;
	}
	.scroll_view_data>div{
		position: relative;
		width: 120upx;height: 120upx;
		margin-right: 30upx;
		border: 1px solid #E6E6E6;
	}
	.scroll_view_data .img{
		width: 100%;height: 100%;
	}
	.scroll_view_num{
		position: absolute;
		border-radius: 50%;
		border: 1px solid #FF3333;
		font-size: 22upx;
		color: #FF3333;
		width: 30upx;
		height: 30upx;
		line-height: 30upx;
		text-align: center;
		right: -13upx;
		top: -13upx;
		background: #FFFFFF;
	}
</style>