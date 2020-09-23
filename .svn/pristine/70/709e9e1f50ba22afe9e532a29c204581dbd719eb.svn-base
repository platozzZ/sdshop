<template>
	<div class='us-all'>
		<heads :title='title'></heads>
		
		<div v-if='content' class="logo">
			<rich-text class="richtext yh-content" :nodes="content"></rich-text>
		</div>

	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import htmlParser from '@/common/html-parser.js'

	export default {
		data() {
			return {
				title: '使用说明',
				log: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/15306155488.png",
				content: '',
				access_id: '',
			}
		},
		onLoad() {
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

			let me = this
			uni.showLoading({
				title: '加载中'
			})
			uni.request({
				data: {
					module: "app",
					action: "sign",
					app: 'Instructions',
					access_id: this.access_id
				},
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: function(res) {
					uni.hideLoading();
					console.log("我的积分使用规则")
					console.log(res)
					if (res.data.code == 200) {
						me.content = htmlParser(res.data.Instructions)
					} else {
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						})
					}
					console.log(res)

				}
			})

		},
		components: {
			Heads,
			wxParse
		},
		methods: {

		}
	}
</script>

<style scoped>
	@import url("../../static/css/my/gradeUse.css");
</style>
