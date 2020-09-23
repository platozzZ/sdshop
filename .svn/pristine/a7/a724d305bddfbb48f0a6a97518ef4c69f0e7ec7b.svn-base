<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<!-- #ifndef MP-->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		<ul class='mesage' :style="{top:halfWidth}" style='position: relative;'>
			<li @click.prevent="_SystemMesage">
				<img class='mesage_img' :src="mess2x" />
				<span>系统信息</span>
				<div class='first-right'>
					<div class='circle' v-if='list.cishu'>
						{{list.cishu}}
					</div>
					<img class='arrow' :src="jiantou">
				</div>
			</li>

			<li @click="_navigateTo('service')">
				<img class='mesage_img' :src="kf" />
				<div class='last-right'>
					<div>
						<p class='font'>客服</p>
						<p class='size'>2018-12-10</p>
					</div>
					<p class='font-size'>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {getStorage} from '../../common/storage.js'
	import lktauthorize from '../../components/lktauthorize.vue'

	export default {
		data() {
			return {
				access_id: '',
				title: '我的消息',
				list: "",
				mess2x:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/messe2x.png',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				kf:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/kfef2x.png',
				back:'',
				returnR:'',
			}
		},
		computed:{
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		components: {
			Heads,
			lktauthorize,
		},
		onLoad(option) {
			me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
				me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
				me.wallets()
				if(option.back){
					me.back=option.back
				}
				if(me.back){
					me.returnR=1
				}else{
					me.returnR=0
				}
			});
		},
		methods: {
			_navigateTo(url){
				if(this.access_id){
					uni.navigateTo({
						url,
					})
				}else{
					uni.showToast({
						title: '未登录，请先登录',
						icon: 'none',
						duration: 1500
					});
					setTimeout(function(){
						uni.navigateTo({
							url: '../login/login?src=message'
						});
					},1500)
				}
			},
			wallets() {
				var me=this
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'message',
					app: 'index'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (response) => {
						if(response.data.code==200){
							me.list = response.data;	
						}
						else{
							uni.showToast({
								title:response.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},error:function(err){
						console.log(err)
					}
				});
			},
			_SystemMesage: function() {
				if(this.access_id){
					uni.navigateTo({
						url: '../message/systemMesage'
					});
				}else{
					uni.showToast({
						title: '未登录，请先登录',
						icon: 'none',
						duration: 1500
					});
					setTimeout(function(){
						uni.navigateTo({
							url: '../login/login?src=message'
						});
					},1500)
				}
				
			},

		}
	}
</script>

<style scoped>
	@import url("../../static/css/message/message.css");
</style>
