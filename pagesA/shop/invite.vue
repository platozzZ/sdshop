<template>
	<div class="invite" @tap='mdmDivHidden'>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<div class='bgImgDiv'>
			<img class='img' :src="bgImg1">
		</div>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中…</p>
			</div>
		</div>
		<div  class="head"  v-else :style="{top:halfWidth}">
			<span href="javascript:void(0);" @tap="_back"  v-if="flag">
				<img :src="back2x" >
			</span>
			<img :src="bback" @tap="_back"  v-if="!flag" class="header_img">
			<div class="sign_right"  @tap="_complete_report">活动规则</div>
		</div>
		<div class='invite_content'>
			<div class='main'>
				<img :src="textImg" class='textImg'>
				<div class='relative mt_85'>
					<img :src="coin1" class='coinImg coin1'>
					<img :src="coin2" class='coinImg coin2'>
					<img :src="coin1" class='coinImg coin3'>
					
					<img :src="redImg" class='redImg'>
					<div class='invite_user'>每邀请一位新用户下单成功，奖励</div>
					<div class='invite_money'><span class='span'>{{invitePrice}}</span>元</div>
					<div class='invite_text'>{{text1}}</div>
				</div>
				<div class='inviteMethod'>
					<div :style="{width:storeWidth+'%'}" v-for='(item,index) in share_store' :key='index' @tap='_invite(item.name)'>
						<div><img class='img' :src="item.img"></div>
						<span class='span'>{{item.name}}</span>
					</div>
				</div> 
				<div class='invite_strategy'>
					<img class='img' :src="yqImg">
					<span style='font-size: 26upx;color:#E3BC88;margin: 0 20upx;'>邀请攻略</span>
					<img class='img' :src="yqImg">
				</div>
				<div class='strategy_content'>
					<div>
						<div class="stepUp">
							<div class='yuan'>1</div>
							<span class='span'></span>
							<div class='yuan'>2</div>
							<span class='span'></span>
							<div class='yuan'>3</div>
						</div>
						<div class="stepDown">
							<div>发送邀请给好友</div>
							<div>好友领取福利</div>
							<div>现金券到账</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='mdmImgDiv' v-if='mdmDiv'>
			<img class='img' :src="mdmImg" @tap="_saveImg()">
			<div @tap.stop="_saveImg()" class='mask'>
				点击图片保存到本地
			</div>
		</div>
		<div class='mask' v-if='complete_report'>
			<div class='maskContent'>
				<p class='maskContentTitle'>活动规则</p>
				<rich-text :nodes="rule" class='font_28'></rich-text>
				<div>
					<button class="closeDiv" type="button" @tap="_oncomplete_report">我知道了</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getStorage } from '../../common/storage'
	import {  mapMutations } from 'vuex'
	import htmlParser from '@/common/html-parser.js'
	export default {
		data() {
			return {
				coin1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/coin1.png',
				coin2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/coin2.png',
				yqImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yq.png',
				yq1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yq1.png',
				yq2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yq2.png',
				yq3:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yq3.png',
				loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/5-121204193R7.gif",
				bgImg1:'',
				textImg:'',
				redImg:'',
				title: '邀请有奖',
				back2x:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/back2x.png",
				bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/bback.png',
				flag:true,
				guanbi:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/qiandaoguanbi2x.png',
				complete_report:false,
				text1:'',
				invitePrice:'',
				share_store:'',
				storeWidth:'',
				mdmImg:'',
				mdmDiv:false,
				load:true,
				logo:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/lktlogo.png',
				shareContent:'一起来用来客推吧！',//分享的内容
				fastTap:true,
				rule:"", //活动规则
				shareHref:"",//分享链接
			}
		},
		computed:{
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				return heigh + 'px';
			},
		},
		onLoad(){
			uni.getProvider({
				service: "share",
				success: (e) => {
					console.log("success", e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin',
									sort:0
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '分享到新浪微博',
									id: 'sinaweibo',
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq',
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					uni.showModal({
						content:"获取登录通道失败",
						showCancel:false
					})
				}
			});
		
		},
		onShow() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id;
			this._request()
		},
		methods: {
			_saveImg(){
				let me=this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				uni.getImageInfo({
					src: me.mdmImg,
					success: function (image) {
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function () {
								me.fastTap=true
								uni.showToast({
									title:'保存成功',
									icon:'none',
									duration:2000,
								})
								me.mdmDiv=false
							},
							error:function(){
								me.fastTap=true
								uni.showToast({
									title:'保存失败，请稍后再试',
									icon:'none',
									duration:2000,
								})
								me.mdmDiv=false
							}
						});
					}
				});
			},
			_invite(type){
				if(!this.access_id){
					uni.navigateTo({
						url:'../../pages/login/login'
					})
					return
				}
				let me=this
				if(!this.fastTap){
					return
				}
				if(type=='面对面邀请'){
					let data={
						access_id:this.access_id,
						module: 'app',
						action:'invitation ',
						m:'invitation_picture ',
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							me.fastTap=true
							if(res.data.code==200){
								console.log(res.data.url)
								if(res.data.status==1){
									me.mdmImg=res.data.url
									me.mdmDiv=true
								}
							}
							
						},
					})
				}
				else if(type=='朋友圈'){
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						type: 0,
						href: me.shareHref,
						title: "来客推分享",
						summary: me.shareContent,
						imageUrl: me.logo,
						success: function (res) {
							me.fastTap=true
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							me.fastTap=true
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
				else if(type=='微信'){
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: me.shareHref,
						title: "来客推分享",
						summary: me.shareContent,
						imageUrl: me.logo,
						success: function (res) {
							me.fastTap=true
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							me.fastTap=true
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
				else if(type=='QQ'){
					uni.share({
						provider: "qq",
						type: 1,
						href: me.shareHref,
						title: "来客推分享",
						summary: me.shareContent,
						imageUrl: me.logo,
						success: function (res) {
							me.fastTap=true
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							me.fastTap=true
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			},
			_complete_report(){
				this.complete_report = true
			},
			_oncomplete_report(){
				this.complete_report = false
			},
			_back(){
				this.flag=false
				uni.navigateBack({
					delta: 1
				});
			},
			_back1(){
				if(this.return_r==1){
					uni.navigateBack({
						delta: 2
					});
				}else if(this.return_r==2){
					uni.navigateBack({
						delta: 3
					});
				}else if(this.return_r==3){
					uni.navigateTo({
						url: '../login/login?register_type=1'
					});
				}else{
					uni.navigateBack({
						delta: 1
					});
				}
				this.flag=true
			},
			_request(){
				var me=this
				let data={
					access_id:this.access_id,
					module: 'app',
					action:'invitation',
					m:'index'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						console.log(res.data)
						if(res.data.code==200){
							let {data:{status,share_store,price,data}}=res
							if(status==1){
								me.bgImg1=data.bg_img
								me.textImg=data.sucai2_img
								me.redImg=data.sucai1_img
								me.text1=data.text1
								me.invitePrice=price
								me.share_store=share_store
								me.storeWidth=100/share_store.length
								// me.rule = data.rule
								me.rule=htmlParser(data.rule)
								// console.log(htmlParser(data.rule))
							}
							else{
								uni.showToast({
									title:'网络繁忙，请稍后再试',
									icon:'none',
									duration:1500
								})
							}
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						console.log(res)
						me.load=false
						
					}
				})
			},
			mdmDivHidden(){
				if(this.mdmDiv){
					this.mdmDiv=false
					this.fastTap=true
				}
			}
		},
	}
</script>

<style scoped>
	@import url("../../static/css/shop/invite.css");
</style>
