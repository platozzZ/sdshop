<template>
	<div class='box'>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<div class='head'>发布成功</div>
		<div class='pic'>
			<img :src="gouhei_img" />
		</div>
		<p>发布成功</p>
		<div class='button'  @tap="toHome()">返回主页</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {mapMutations} from 'vuex'
	import { getStorage } from '../../common/storage.js'
	export default {
		data(){
			return{
				gouhei_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/gouhei2x.png'
			}
		},
		created(){
			
		},
		computed: {
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			}
		},
		methods:{
			toHome(){
				uni.reLaunch({
					url: '../tabBar/home'
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/evaluate/evaluat-end");
</style>