<template>
	<div class='box'>
		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		<div :style="{top:halfWidth}" class='detailed-content' v-for="(item,index) in list" :key="index">
			<p class='heads'>{{item.title}}</p>
			<p class='user'>尊敬的用户：</p>
			<!-- <p class='content' rich-text="{type:'node'}"></p> -->
			<text decode="true">{{item.content}}</text>
			<p class='time'>{{item.time}}</p>
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
			this.access_id = getStorage('access_id')?getStorage('access_id'):this.$store.state.access_id
        	this.id=option.id
     		this.wallets()
		},
		components:{
			Heads
		},
		computed:{
			halfWidth:function() {
				var gru=getStorage('data_height')?getStorage('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		methods:{
			wallets(){
				var me=this
				var data={
        			access_id:this.access_id,
        			id:this.id,
        			type:2,
        			module:'app',
        			action:'message',
        			app:'oneindex'
				}
				console.log(data)
				uni.request({
					data,
					url,
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (response) => {
						me.list = response.data.message
						console.log(me.list);
					},error:function(err){
						console.log(err)
					},
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/message/detailed_message");
</style>