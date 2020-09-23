<template>
	<div>
		<heads :title='title'></heads>
		<!--  没有搜索商品显示   -->
		<div class='empty' v-if='!goods.length&&!load'>
			<img class='empty_img' :src="empic_img" />
			<p class='empty_p'>殿下，此商品暂无销售，且试试关键字搜索吧</p>
			<div class='empty_input'>
				<span>商品条码</span>
				<span>{{result}}</span>
			</div>
			<div class='empty_search'>
				<input type="number" placeholder="输入商品名称" @focus="_focus"/>
				<img :src="search_img" />
			</div>
		</div>
		<!--  有商品显示    -->
		<ul v-if='goods.length&&!load'>
			<li class='sacven_goods' v-for='(item,index) in goods' @click="_goods(item.id)" :key='index'>
				<img :src='item.imgurl' />
				<div class='sacven_right'>
					<div class='sacven_name'>{{item.product_title}}</div>
					<p class='sacven_size'>规格：{{item.subtitle}}</p>
					<p class='sacven_price'>￥{{Number(item.price)}}</p>
				</div>
			</li>
		</ul>
		<div class='load' v-if='load'>
			<div>
				<img :src="load_img" />
				<p>加载中……</p>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	// import qs from 'qs'
	import { mapMutations } from 'vuex'
	
	export default {
		data(){
			return{
				title:'码上购',
				empic_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/empic2x.png",
				search_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/search2x.png",
				load_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/5-121204193R7.gif",
				result:'',
				bar_code:'',
				goods:'',
				load:true
			}
		},
		onLoad(option){
			this.bar_code = option.result
			this.result = Number(this.bar_code)
			console.log(this.bar_code,this.result)
			this._axios()
		},
		methods: {
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'index',
					app: 'scan',
					bar_code:this.result
				}
				console.log(data)
				uni.request({
					data,
					url,
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						console.log(res)
						me.load = false
						let {data:{data}} = res
						console.log(data)
						if(data.length>0){
							me.goods = data
						}
						console.log(me.goods)
					},
						error:function(err){
							console.log(err)
						},
					})
			},
			_goods(id) {
				this.pro_id(id)
				uni.navigateTo({
					url:"../goods/goodsDetailed"
				})
			},
			_focus(){
				uni.navigateTo({
					url:"../../pagesA/search/search"
				})
			},
			...mapMutations({
				pro_id: 'SET_PRO_ID'
			}),
		},
		components: {
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/scavenging/scavenging.css");
</style>