<template>
	<div v-if='guiderImg'>
		<div class='relative'>
			<div class='guiderBtn' @tap='countDown(true)'><span class='time'>{{time}}</span>秒后进入</div>
			<swiper class='swiper' circular="false" :autoplay="autoplay" indicator-dots='true' interval='1000' @change="changeAutoplay">
				<swiper-item v-for='(item,index) in guiderImg' :key="index">
					<image class='image' :src="item.image"></image>
				</swiper-item>
			</swiper> 
		</div>
	</div>
</template>

<script>
	import {setStorage,getStorage} from '../../common/storage.js'
	import {getLaiketuiNoRegisterLoginInfo} from '../../common/laiketuiNoRegisterLogin.js'
	export default {
		data() {
			return {
				title: 'Hello',
				guiderImg:[],
				time:3,
				timer:'',
				timeStatu:false,
                autoplay:true,
                num:1,
				clear:'',
				option:'',
			}
		},
		onLoad(option) {
			var me=this
			me.option = option
			console.log('=======option');
			console.log(me.option);
			me._geturl().then(function(){
				me.getImg();
				uni.getSystemInfo({
					success: function (res) {
						me.$store.state.data_height=res.statusBarHeight
					}
				});	
			});
			this.clear = setInterval(this.countDown,1000);
		},
		onShow() {
			this.timeStatu = false
            this.autoplay = true;
			this.time = 3;
		},
		methods: {
            changeAutoplay(e) {
				if(e.detail.current <= this.num){
					this.autoplay = false
				}else{
				    this.num = e.detail.current;
				    this.autoplay = true
				}
            },
			getImg:function(){
				var me=this
				uni.request({
					data:{
						app:'guided_graph',
						action:'index',
						module:'app',
						// #ifdef MP-WEIXIN
							store_type:1,
						// #endif
						// #ifndef MP-WEIXIN
							store_type:2,
						// #endif
					},
					url:me.$store.state.url,
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						me.guiderImg=res.data.list
					}
				})
			},
			// 倒计时
            countDown(){
                var that = this;
				if(that.time-- == 1){
					this.timeStatu=true
					console.log('this.option===========');
					console.log(this.option.pages);
					clearInterval(that.clear);
					uni.setStorageSync("isfx",true)
					var isfx = uni.getStorageSync("isfx")
					console.log("isfx-------------------:"+isfx);
					if(this.option.pages == 'goodsDetailed'){
						
						if(this.option.fatherId != '' || this.option.fatherId){
							uni.setStorageSync("pages",'goodsDetailed')
							uni.setStorageSync("productId",this.option.productId)
							uni.setStorageSync("fatherId",this.option.fatherId)
							uni.switchTab({
								url: '../../pages/tabBar/home?pages=goodsDetailed&productId=' + this.option.productId + '&isfx=true&fatherId='+this.option.fatherId
							})
							console.log('goodsDetailed____2');
					
							return false
						}
							uni.setStorageSync("pages",'goodsDetailed')
							uni.setStorageSync("productId",this.option.productId)
						console.log('goodsDetailed____1');
							uni.switchTab({
								url: '../../pages/tabBar/home?pages=goodsDetailed&productId=' + this.option.productId + '&isfx=true'
							})
						return false
					}else if(this.option.pages == 'groupDetailed'){
						uni.setStorageSync("pages",'groupDetailed')
						uni.setStorageSync("activity_no",this.option.activity_no)
						uni.setStorageSync("pro_id",this.option.pro_id)
						console.log("share_jump____________");
						uni.switchTab({
							url: '../../pages/tabBar/home?pages=groupDetailed&pro_id=' + this.option.pro_id +'&activity_no='+this.option.activity_no + '&isfx=true'
						})
						return false
					}else if(this.option.pages == 'group_end'){
						uni.setStorageSync("pages",'group_end')
						uni.setStorageSync("sNo",this.option.sNo)
						uni.setStorageSync("friend",true)

						uni.switchTab({
							url: '../../pages/tabBar/home?pages=group_end&sNo=' + this.option.sNo + '&friend=true&isfx=true'
						})
						return false
					}
					return false
					if(this.option.pages == 'goodsDetailed'){
						if(this.option.fatherId != '' || this.option.fatherId){
							uni.navigateTo({
								url: '../../pages/goods/goodsDetailed?productId=' + this.option.productId + '&isfx=true&fatherId='+this.option.fatherId
							})
							console.log('goodsDetailed____2');

							return false
						}
						console.log('goodsDetailed____1');
						uni.navigateTo({
							url: '../../pages/goods/goodsDetailed?productId=' + this.option.productId + '&isfx=true'
						})
						return false
					}else if(this.option.pages == 'groupDetailed'){
						uni.navigateTo({
							url: '../../pagesA/group/groupDetailed?pro_id=' + this.option.pro_id + '&isfx=true'
						})
						return false
					}else if(this.option.pages == 'group_end'){
						uni.navigateTo({
							url: '../../pagesA/group/group_end?sNo=' + this.option.sNo + '&friend=true&isfx=true'
						})
						return false
					}
					
                }
            },
        	_geturl:function(){
				var me = this;
				return new Promise((resolve, reject) => {
					var data = {
						module: 'app',
						action: 'url',
						app: 'geturl',
						get: 'mini_url,H5,endurl'
					}
					uni.request({
						data,
						url:me.LaiKeTuiCommon.LKT_API_URL,
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							if(res.data.code==200){
								me.$store.state.url = res.data.url.mini_url
								me.$store.state.h5_url = res.data.url.H5
								me.$store.state.endurl = res.data.url.endurl
							}else{
								me.$store.state.url 	= me.LaiKeTuiCommon.LKT_API_URL;
								me.$store.state.h5_url 	= me.LaiKeTuiCommon.LKT_H5_DEFURL;
								me.$store.state.endurl 	= me.LaiKeTuiCommon.LKT_ENDURL;
							}
					
							//#ifdef MP-WEIXIN
							uni.getExtConfig({
								success:function(res){
									if(res.extConfig.url){
										me.$store.state.url=res.extConfig.url
									}
									me.$store.state.url = me.$store.state.url + '&store_type=1'
									//获取是否免密码登录开关
									if(!uni.getStorageSync("needRegister")){
										getLaiketuiNoRegisterLoginInfo(1);
									}
								},
								error:function(err){
									console.log(err,2)
								}
							})
							//#endif
							//#ifndef MP
							me.$store.state.url = me.$store.state.url + '&store_type=2'
							//#endif
							//#ifdef MP
							me.$store.state.url = me.$store.state.url + '&store_type=1'
							//#endif
					
							uni.setStorageSync("url",me.$store.state.url);
							uni.setStorageSync("h5_url",me.$store.state.h5_url);
							uni.setStorageSync("endurl",me.$store.state.endurl);
							resolve(me);
						}
					});
				});
			},
		},
	}
</script>

<style>
	@import url("../../static/css/index/index.css");
</style>
