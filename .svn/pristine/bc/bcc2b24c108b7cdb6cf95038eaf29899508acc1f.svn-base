<template>
	<div class='mask' v-if='display' @touchmove.stop.prevent>
		<div class="mask_content">
			<p>{{content}}</p>
			<div>
				<div class='cancel' @click="_click('取消')">取消</div>
				<div class='confirm' @click="_click('确认')">确认</div>
			</div>
		</div>
	</div>
</template>
file:///Users/boluo/Desktop/来客/LaiKePages/
<script> 
export default{
	props:['content','display'],
	data(){
		return {
			mask_value:''
		}
	},   
	created(){
		console.log(this.display)
	},
	methods:{
		_click(value){
			this.mask_value = value
			this.$emit('mask_value',this.mask_value)
		}
	}
}
</script>

<style scoped>
	.mask{height: 100vh;width: 100%;background-color: rgba(000,000,000,0.5);position: fixed;top: 0;left: 0;z-index: 999;
		display: flex;justify-content: center;align-items: center;}
	.mask_content{width: 550upx;height: 250upx;background-color: #fff;text-align: center;font-size: 30upx;border-radius: 23upx;position: relative;}
	.mask_content >div{border-top: 1px solid #eee;width: 100%;
					font-size: 34upx;color:#005edf;height: 94upx;position: absolute;bottom: 0;left: 0;}
	.cancel{border-right: 1px solid #eee;color: #999999;}
	.cancel,.confirm{width: 50%;float: left;height: 100%;line-height: 98upx;font-size: 34upx;}
	.confirm{color: #020202;}
	.mask_content>p{font-size: 30upx;color:#333;line-height: 160upx;}
</style> 