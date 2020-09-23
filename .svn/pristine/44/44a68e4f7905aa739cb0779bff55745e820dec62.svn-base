<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		<div style='position: relative;' :style="{top:halfWidth}" class='detailed-content' v-for="(item,index) in list" :key="index">
			<p class='title'>{{item.title}}</p>
			<p class='time'>{{item.time}}</p>
			<p class='border'></p>
			<text decode="true" class="text">{{item.content}}</text>
		</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	
	export default{
		data(){
			return{
				title:'系统信息',
				access_id:'',
				list:"",
				id:''
			}
		},
		onLoad(option){
			var me = this;
			this.access_id = getStorage('access_id')?getStorage('access_id'):this.$store.state.access_id
        	this.id=option.id
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me.getDetailedMesageData()
				});
			});
		},
		onShow() {
			var me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me.getDetailedMesageData()
				});
			});
		},
		components:{
			Heads
		},
		computed:{
			halfWidth:function() {
				var gru = getStorage('data_height')?getStorage('data_height'):this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},
		methods:{
			changeLoginStatus(){
				this.access_id = uni.getStorageSync("access_id");
				this.getDetailedMesageData();
			},
			/**
			 * 获取消息详情
			 * */
			getDetailedMesageData(){
				var me=this
				var data={
        			access_id:this.access_id,
        			id:this.id,
        			type:2,
        			module:'app',
        			action:'message',
        			app:'oneindex'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						if(res.data.code==200){
							me.list = res.data.message
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},error:function(err){
						
					},
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/message/detailedMesage.css");
</style>