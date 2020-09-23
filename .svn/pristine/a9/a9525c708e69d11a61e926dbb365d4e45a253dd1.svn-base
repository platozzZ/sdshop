<template>
	<div>
		<div v-if='guiderImg.length==0' class='yulan'>
			<img class='img' :src='yulan'></image>
		</div>
		<div v-else class='relative'>
			<div class='guiderBtn' @tap='countDown(true)'><span class='time'>{{time}}</span>秒后进入</div>
			<!-- circular="false"不采用衔接滑动  autoplay是否自动切换   -->
			<swiper class='swiper' circular="false" :autoplay="autoplay" indicator-dots='true' interval='1000'>
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
				guiderImg:[],  // 轮播图
				time:3,   //倒计时秒数设定
				autoplay:true,  //是否自动切换
				clear:'',
				yulan:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + '/images/icon1/yulan.gif',  // 加载动画
			}
		},
		onLoad() {
			var me=this;
			let p = null;
			// #ifdef MP-WEIXIN
			p = me.gd();
			
			if(p){
				p.then(function(url){
					me._geturl(url).then(function(){
						me.getImg();
						uni.getSystemInfo({
							success: function (res) {
								me.$store.state.data_height=res.statusBarHeight
							}
						});	
					});
				});
			}
			// #endif
			
			// #ifndef MP-WEIXIN
			var url = me.LaiKeTuiCommon.LKT_API_URL;
			me._geturl(url).then(function(){
				me.getImg();
				uni.getSystemInfo({
					success: function (res) {
						me.$store.state.data_height=res.statusBarHeight
					}
				});	
			});
			// #endif	
			
			
		},
		// 页面卸载的时候删除定时器
		onUnload() {
			clearInterval(this.clear);
		},
		onShow() {
      this.autoplay = true;
			this.time = 3;
		},
		methods: {
			// 获取轮播图
			getImg:function(){
				var me = this
				
				uni.request({
					data:{
						app:'guided_graph',
						action:'index',
						module:'app',
						// #ifdef MP-WEIXIN || MP-ALIPAY
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
						let { data } = res;
						
						// https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/2/1561950492710.png
						// 当有轮播图的时候才显示本页面，否则直接跳转到home页
						if( data.list && data.list.length > 0 ){
							me.guiderImg = data.list
							// 启动倒计时
							me.clear = setInterval(me.countDown,1000);
						}else{
							uni.switchTab({
								url:'../tabBar/home'
							});
						}
					}
				})
			},
			// 倒计时
            countDown(type){
                var that = this;
				if(that.time == 1 || type){
					uni.reLaunch({
						url:'../tabBar/home'
					});
					clearInterval(that.clear);
                } else if(that.time > 1){
					that.time--;
				}
            },
			//第三方授权，接口地址获取函数
			gd:function(){
				var me = this;
				return  new Promise((resolve, reject)=>{
					uni.getExtConfig({
						success:function(res){
							if(res.extConfig.url){
								me.$store.state.url=res.extConfig.url
							}else{
								me.$store.state.url=me.LaiKeTuiCommon.LKT_API_URL
							}
							me.$store.state.url = me.$store.state.url + 'store_type=1'
						    let request_url = me.$store.state.url
							console.log('index拼接url',request_url)
							//获取是否免密码登录开关
							if(!uni.getStorageSync("needRegister")){
								getLaiketuiNoRegisterLoginInfo(1);
							}
							resolve(request_url);
						},
						error:function(err){
							console.log(err,2)
							reject(err);
						},
				});
				}); 
			},
			// 获取公共链接地址
        	_geturl:function(request_url){
				var me = this;
				// #ifndef MP-WEIXIN
			    request_url = me.LaiKeTuiCommon.LKT_API_URL;
				// #endif
				console.log('index.vue请求路劲为',request_url)
				return new Promise((resolve, reject) => {
					var data = {
						module: 'app',
						action: 'url',
						app: 'geturl',
						get: 'mini_url,H5,endurl'
					}
					uni.request({
						data,
						url:request_url,
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
