<template>
	<div>
		<heads :title='title'></heads>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中……</p>
			</div>
		</div>
		<rich-text class="richtext" :nodes="contentNodes" style="font-size: 14px;"></rich-text>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import htmlParser from '@/common/html-parser.js'
	
	export default {
		data() {
			return {
				title: '用户协议',
				content:'',
				contentNodes:[],
				load:true,
				loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/loading.gif'
			}
		},
		onLoad(){
			var me=this
			uni.request({
				data:{
					module: 'app',
					action: 'login',
					app: 'register_agreement',
				},
				url: uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					if(res.data.content){
						//吧view标签替换为html的P标签
						me.content="<div style='padding-left:8px;padding-right:8px;'>"+res.data.content.replace(new RegExp("<view","gm"),"<p").replace(new RegExp("</view>","gm"),"</p>")+"</div>";
						var htmlString  = me.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
						htmlString = htmlString.replace("<div style='padding-left:8px;padding-right:8px;'>",'<div style="padding: 0 15px;">')
						me.contentNodes =  htmlParser(htmlString);
						// #ifndef MP-ALIPAY
						setTimeout(function(){
							me.load = false;
						},50);
						// #endif
						// #ifdef MP-ALIPAY
						me.load = false ;
						// #endif
					}					
				}
			})
		},
		computed:{
			halfWidth() {
				var gru=this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		components:{
			Heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/login/agreement.css");
</style>