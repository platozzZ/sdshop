<template>
	<div class='us-all'>
		<heads :title='title'></heads>
		<div v-if='content' class="logo">
			<rich-text class="richtext" :nodes="content"></rich-text>
		</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import htmlParser from '../../common/html-parser.js'
	
	export default{
		data(){
			return{
				title:'',
				log:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/15306155488.png",
				content:'',
			}
		},
		onLoad() {
			let me=this
			uni.showLoading({
				title:'加载中'
			})
			uni.request({
				data:{
					module: 'app',
					action: 'mch',
					m: 'agreement',
				},
				url: uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					uni.hideLoading();
					if(res.data.code==200){
						var str=res.data.agreement.replace(/<strong><span/g,"<span style='font-weight:bold;'").replace(/span><\/strong>/g,'span>').replace(/<strong>/g,'<span style="font-weight:bold;">').replace(/strong>/g,'span>')
						me.content = htmlParser(str)
						
						if(res.data.name){
							me.title = res.data.name
						}else{
							me.title = '入驻协议'
						}
					}
					else{
						uni.showToast({
							title:res.data.message,
							duration:1500,
							icon:'none'
						});
					}
					console.log(res);
				}
			})
			
		},
		components:{
			Heads
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/applyAgreement.css");
</style>