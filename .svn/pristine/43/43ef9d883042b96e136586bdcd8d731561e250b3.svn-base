<template>
	<div>
		<heads :title='title' returnR='7'></heads>
		<div class='relative'>
			<div class='noFindDiv'>
				<div class='noFindDiv_top'>
					<img class='noFindImg' :src="sucImg" />
				</div>
				<div class='noFindTitle'>入驻申请提交成功</div>
				<span class='noFindText'> 请耐心等待工作人员审核</span>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'

	export default {
		data(){
			return {
				back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				access_id:'',
				title:'申请结果',
				fastTap:true,
				sucImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/gouhei2x.png',
			}
		},
		onLoad(option){
		},
		components: {
			heads,
		},
	}
</script>

<style>
	@import url("../../static/css/myStore/applySuc.css");
</style>
