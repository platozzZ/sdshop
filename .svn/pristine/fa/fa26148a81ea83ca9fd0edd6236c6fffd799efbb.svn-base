<template>
	<div class='us-all'>
		<heads :title='title'></heads>
		
		<toload :load="load">
			<rich-text :nodes="contentNodes" class="yh-contentNodes"></rich-text>
		</toload>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import htmlParser from '../../common/html-parser.js'
	import toload from '@/components/toload.vue'
	
	export default {
		data() {
			return {
				title: '关于我们',
				log: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/15306155488.png",
				content: '',
				contentNodes: [],
				load: false
			}
		},
		onLoad() {
			let me = this
			
			uni.request({
				data: {
					module: 'app',
					action: 'user',
					app: 'about_us',
				},
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: function(res) {
					if (res.data.code == 200) {
						me.load = true
						me.content = "<div style='padding-left:8px;padding-right:8px;'>" + res.data.aboutus.replace(new RegExp("<view",
							"gm"), "<p").replace(new RegExp("</view>", "gm"), "</p>") + "</div>";
							
						var htmlString = me.content.replace(/\\/g, "").replace(/<img/g, "<img  style='width:318px;height:230px;margin-left:-5px;' ");
						me.contentNodes = htmlParser(htmlString);

					} else {
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						})
					}
				}
			})

		},
		components: {
			Heads,
			toload
		},
	}
</script>

<style scoped>
	@import url("../../static/css/my/aboutMe.css");
</style>
