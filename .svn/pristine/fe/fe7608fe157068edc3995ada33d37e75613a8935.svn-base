<template>
	<div class='box'>
		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		<ul :style="{top:halfWidth}">
			<li v-for="(item,index) in list" @tap.prevent='_detailedMasege(item.id)'>
				<p rich-text="item.content" class="bosx">{{item.content}}</p>
				<div class='syatem-bottom'>
					<span style="font-size:22upx;color:#999;">{{item.time}}</span>
					<span :class="{color:item.type == 1}">查看详情 </span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	
	export default {
		data(){
			return{
				access_id:'',
				title:'系统信息',
				list:""
			}
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
		created(){
			this.access_id = getStorage('access_id')?getStorage('access_id'):this.$store.state.access_id
			this.wallets()
		},
		methods:{
			wallets(){
				var data={
        			access_id:this.access_id,
        			module:'app',
        			action:'message',
        			app:'index'
				}
				uni.request({
					data,
					url,
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (response) => {
						this.list = response.data.message
						console.log(this.list);
						console.log(response)
					},error:function(err){
						console.log(err)
					},
				})
			},
			_detailedMasege:function(index){
				uni.navigateTo({
						url: 'detailed_mesage?id='+index
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/message/system_mesage.css");
</style>