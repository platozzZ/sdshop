<template>
	<div class='us-all'>
		
		<div class="yh-title">
			<heads :title='title'></heads>
		</div>
		
		<div class="logo" :style="{top:halfWidth}">
			<img :src="log" />
		</div>
		
		<div class="about-us"></div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'

	export default {
		data() {
			return {
				title: '关于我们',
				log: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/15306155488.png'
			}
		},
		components: {
			Heads
		},
		computed: {
			halfWidth() {
				var gru = this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},
		methods: {

		}
	}
</script>

<style scoped>
	@import url("../../static/css/my/about_me.css");
</style>
