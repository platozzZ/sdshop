<template>
	<div class='head'>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<div class='header' >
			<span  @tap='_back1'  >
				<img :src="back" >
			</span>
			<p>{{title}}</p>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import {getStorage} from '../common/storage.js'
	export default{
		data(){
			
			return{
				back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
			}
		},
		
		onLoad (option){
			console.log('header-h5');
			console.log(this.returnR);
		},
		computed: {
			halfWidth :function(){
				var gru=getStorage('data_height')?getStorage('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		props:['title','returnR'],
		
			methods:{
				...mapMutations({
					status:'data_height'
				}),
				
				_back1(){
					console.log('this.returnR == 00')
					console.log(this.returnR)
					if(this.returnR == 1 || this.returnR == '1'){
						console.log('if1');
						uni.navigateBack({
							delta:1
						});
					}else if(this.returnR == 2 || this.returnR == '2'){
						uni.navigateBack({
							delta:2
						});
					}else if(this.returnR == 'h5'){
						console.log(this.returnR);
						uni.reLaunch({
							url:"/pages/tabBar/my"
						});
					}else if(this.returnR == 'myOrder'){
						// uni.navigateTo({
						// 	url:"/pagesA/myStore/myOrder"
						// });
						uni.navigateBack({
							delta:1
						});
					}else{
						console.log('returnRdefault')
						uni.switchTab({
							url:'/pages/tabBar/home'
						})
					}
					
				
				}
			}
		
	}
</script>

<style scoped>
.head{position: fixed;left: 0;top: 0;background-color: #fff;width:100%;z-index: 40;}
.header img{position: absolute;top:26upx;left:20upx;width:24upx;height:36upx;}
.header a{position: absolute;width:36upx;height:36upx;border-radius: 50%;}
.header_img{top:46upx!important;left:10upx!important;width:64upx!important;height:64upx!important;}
.header p{text-align:center;width:100%;height:100%;line-height:88upx;color: #020202;font-size: 32upx;}
.header span{height: 88upx;width: 60upx;display: inline-block;position: absolute;}
</style>