<template>
	<div class='container'>
		<heads :title='title'></heads>
		<div class='container_content' @tap='_changeEditor()'>
			<div class='relative'>
				<uni-richtext :richList1.sync="richList" :uploadUrl="uploadUrl"></uni-richtext>
			</div>
		</div>
		<div class='okBtn' @tap='ok()'>完成</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	import uniRichtext from '../../components/qiyue-richtext/uni-richtext.vue'
	export default {
		data() {
			return {
				richList:[],
				uploadUrl:'',
				text:'',
				showText:true,
				content:[],
				imgimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/ffff2x.png',
				test:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/_bg2x.png',
				overflow:'scroll',
				title: '商品详情',
				bback_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/bback.png',
				fx_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/fx.png',
				gw_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/gw.png",
				load_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/5-121204193R7.gif",
				editor:false,
				focus:false,
			}
		},
		watch:{
			richList:function (newValue,oldValue) {
				console.log(newValue)
			}
		},
		onLoad(option){
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
			if(this.$store.state.goodsDetail){
				this.richList=this.$store.state.goodsDetail
			}else{
				this.richList=[]
			}
		},
		methods: {
			ok(){
				var me=this
				me.$store.state.goodsDetail = JSON.parse(JSON.stringify(me.richList))
				me.$store.state.detaiFlag = true
				uni.navigateBack({
					delta:1
				});
			},
			_changeEditor(){
				var me=this
				this.editor=true
				setTimeout(function(){
					me.focus=true
				},200)
				
			},
			_creat(){
				this.focus=false
				this.showText=false
				var json={
					name: 'div',
					attrs: {
						class: 'demoCss',
						style: 'color: #020202;text-align:left;height:25px;font-size:12px;padding: 0 15px;display:flex;align-items:center;'
					},
					children: [{
						type: 'text',
						text: this.text
					}]
				}
				this.content.push(json)
			},
		},
		components: {
			heads,
			wxParse,
			uniRichtext
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/goodsDetail.less");
</style>