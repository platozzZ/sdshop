<script>
	import Vue from 'vue'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data(){
			return{
				abs:'123',
				access_id:false,
			}
		},
		onLaunch: function (options) {
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res);
					if(res.model == 'iPhone' && res.screenHeight == 812 && res.screenWidth == 375){
						// alert('isiPhoneX')
						uni.setStorageSync('isiPhoneX',true)
					}
			    }
			});
			var me = this
			me.isWeiXin()
			//获取URL
			var now_url = window.location.href;
			console.log(now_url);
			// 获取手机号
			let phone = this.getParam(now_url,'phone')
			console.log(phone);
			me.$store.commit('SET_PHONE',phone);
			uni.setStorageSync('tripartitePhone',phone)
			// 获取openid
			let openid = this.getParam(now_url,'openid')
			console.log(openid);
			
			// if(!openid){
			// 	window.history.back();
			// 	// self.location.href = "https://sd-nsn.fblife.com"
			// }
			me.$store.commit('SET_OPENID',openid);
			uni.setStorageSync('openid',openid)
			// 获取是否是小程序打开
			let isMini = this.getParam(now_url,'isMini')
			console.log(isMini);
			uni.setStorageSync('isMini',isMini)
			// 获取状态栏高度
			let statusBar = this.getParam(now_url,'statusbar')
			Vue.prototype.StatusBar = statusBar - 0
			Vue.prototype.CustomBar = statusBar - 0 + 45
			console.log(this.StatusBar);
			console.log(this.CustomBar);
			// 获取渠道号
			let channel = this.getParam(now_url,'channel')
			console.log('APP-channel:',channel)
			me.$store.commit('SET_CHANNEL',channel);
			uni.setStorageSync('tripartiteChannel',channel)
			
			me.$loginFrom._loginH5(me,channel,phone)
			
			
			let p = null
			// #ifdef MP-WEIXIN
			p = me.gd()
			if(p){
				p.then(function(request_url){
					me.geturl(request_url)
				});
			}
			// #endif
			
			// #ifndef MP-WEIXIN
			var m_url = me.LaiKeTuiCommon.LKT_API_URL;
			 me.geturl(m_url)
			// #endif
			// type: 1.文章海报 2.红包海报 3.商品海报 4.分销海报 5.邀请海报 6.竞拍海报
			// store_type=1小程序,=2app
			// store_id商城id
			//proType商品的类型：
			
			// #ifdef H5
			var a = window.location.href
			console.log("获取H5路径"+a)
			if(a.split('?').length>1){
				var e = a.split('?')[1].substring(10)
				if(e.length==0){
					return;
				}
				var str = decodeURIComponent(e)
				while(str.indexOf('%22') >= 0){
					str=str.replace('%22','"');
					str = str.split('#')[0]
					var json = eval('(' + str + ')')
					var toUrl = a.split('?')[0];
					if(json.proType=='pingtuan'){
						window.location.href=toUrl+'#/pagesA/group/groupDetailed?pro_id='+json.productId;
					}else if(json.proType=='putong'){
						window.location.href=toUrl+'#/pages/goods/goodsDetailed?productId='+json.productId;
					}else if(json.proType=="distribution"){
						window.location.href=toUrl+'#/pages/login/login?fatherId='+json.reUser;
					}else if(json.proType=='JP'){
						window.location.href=toUrl+'#/pagesA/bidding/bidding_detailed?biddingId='+json.reUser;
					}
				}
				
				console.log("json数据")
				console.log(json)
			}
			// #endif
			// #ifdef APP-PLUS
			            var height = plus.navigator.getStatusbarHeight();
			            _self.barHeight = height;
			            // #endif
			// #ifdef APP-PLUS
			
			var cid = me.LaiKeTuiCommon.getClientid();
			let timer = setInterval(() => {
				if ( !cid || cid == null || cid == 'null' ) {
					cid = me.LaiKeTuiCommon.getClientid();
				} else {
					clearInterval(timer);
					timer = null;
					uni.setStorageSync("cid",cid);
					console.log('cid:',cid);
				}
			}, 1000);
			
			const _handlePush = function(message) {
				uni.switchTab({
					url:'pages/tabBar/my'
				});
			};
			plus.push.addEventListener('click', function(message) {
				_handlePush();
			}, false);  
			plus.push.addEventListener('receive', function(message) {
				 logoutPushMsg(message);  
			}, false); 
			
			//创建本地推送  
			function createLocalPushMsg(content){  
				var options = {cover:false,};  
				plus.push.createMessage(content, "LocalMSG", options );  
			}
			
			//获取穿透参数  
			function logoutPushMsg( msg ) {
				
				if ( msg.payload &&  msg.payload !='LocalMSG') {
					if ( typeof(msg.payload)=="string" ) {  
						createLocalPushMsg(msg.content);  
					} else {  
						var data = JSON.parse(msg.payload);  
						createLocalPushMsg(data.content);  
					}  
				} else {  
					console.log( "payload: undefined" );  
				}  
			}
			
				var barHeight = plus.navigator.getStatusbarHeight()
					uni.setStorageSync('data_height',barHeight)
					me.data_height(barHeight)
			// #endif

			
			// if(now_url.indexOf('?') != -1){ // 切割出参数  
			//     var parameter = now_url
			// 	// parameter = parameter + '?phone=456&channel=a' //模拟三方传递参数
			//     parameter = parameter.split('?')[1].split("&")
			// 	var obj = {}
				
			//     parameter.forEach((item)=>{
			//      var par = item.split("=")
			//      obj[par[0]] = par[1]
			// 	})
			// 	obj['phone']&&uni.setStorageSync('tripartitePhone', obj['phone']);
			// 	obj['channel']&&uni.setStorageSync('tripartiteChannel', obj['channel']);
			// 	obj['phone']&&uni.setStorageSync('user_phone', obj['phone'])
			// 	// obj['channel']&&me.$loginFrom._loginH5(me,'',true);
			    
			//  }
		
		},
		onShow: function () {

			
		},
		onLoad:function(){
					console.log('App onReady')
					// this.jssdk_share();
				},
		onHide: function () {
			console.log('App Hide')
		},
		methods:{
			isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
				console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					var now_url = window.location.href;
					// alert(now_url)
					// 获取openid
					let openid = this.getParam(now_url,'openid')
					console.log(openid);
					// alert(openid)
					if(!openid){
						window.history.back();
						// self.location.href = "https://sd-nsn.fblife.com"
					}
					uni.setStorageSync('isWeixin',true)
					// alert('isWeixin: ' + true)
				} else {
					// alert('isWeixin: ' + false)
					uni.setStorageSync('isWeixin',false)
				}
			},
			//获取url地址栏参数值
			getParam(path, name) {
		        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
		        if (reg.test(path))
		        return unescape(RegExp.$2.replace(/\+/g, " "));
		        return "";
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
							console.log('app拼接url',request_url)
							resolve(request_url);
						},
						error:function(err){
							console.log(err,2)
							reject(err);
						},
					});
				}); 
			},
			geturl:function(request_url){
				var me = this;
				console.log('app.vue请求路劲为',request_url)
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
					},
					fail(e) {
						console.log(e);
					}
				})
				
			},
			...mapMutations({
				data_height: 'SET_DATA_HEIGHT',
			}),
		},
	}
</script>
<style lang="less">
	/*每个页面公共css */
	@import "./common/public";
	@import "static/css/common.css";
	@import "colorui/icon.css";
	uni-tabbar .uni-tabbar{
		height: calc(100upx + constant(safe-area-inset-bottom) / 2);
		height: calc(100upx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}
	uni-tabbar .uni-tabbar .uni-tabbar__bd{
		height: 100upx;
	}
	uni-tabbar .uni-tabbar~.uni-placeholder{
		height: calc(100upx + constant(safe-area-inset-bottom) / 2);
		height: calc(100upx + env(safe-area-inset-bottom) / 2);
	}
</style>
