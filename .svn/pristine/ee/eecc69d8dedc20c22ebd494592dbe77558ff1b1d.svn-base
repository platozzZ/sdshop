<template>
	<div class='discover' style='background-color: #fff;'>
		<heads :title='title'></heads>
		<template v-if="loadFlag">
			<div class='discover_one' v-if='product'>
				<img :src="product.imgurl"  />
				<div>
					<p>{{product.product_title}}</p>
					<p class='discover_p'>￥{{product.price}}</p>
				</div>
			</div>
			<div class="hr"></div>
			<div class='discover_tj'>
				<div class='discover_left'>
					<i></i>
				</div>
				<p>相似推荐</p>
				<div class='discover_right'>
					<i></i>
				</div>
			</div>
			<ul class='allgoods' v-if='collection'>
				<li class="allgoods_li" v-for='(items,index) in collection' @tap="_goods(items.id)" :key='index'>
					<image class="li_image" lazy-load="true" :src="items.imgurl" />
					<view class="li_right">
						<p>{{items.product_title}}</p>
						<view class="right_dpn">
							店铺：{{items.mch_name}}
						</view>
						<div>
							<span class="ll_price1">￥{{items.price}}</span>
							<span class='allgoods_p'>{{items.yprice}}</span>
							<img class="ll_img" :src="shopImg" />
						</div>
					</view>
				</li>
			</ul>
			<div v-else-if="hasFlag==-1" class="relative">
				<div class="noFindDiv">
					<div>
						<img class='noFindImg' alt="" :src="noFind">
					</div>
					<span class='noFindText'>没有发现相似商品哦~</span>
				 </div>
			</div>
		</template>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {mapMutations} from 'vuex'
	import { getStorage } from '../../common/storage'
	export default {
		data(){
			return{
				shopImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/shopping2x.png',
				noImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				noFind:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/noFind.png',
				title:'发现',
				access_id:'',
				collection:'',  //相似商品
				product:'',   //本商品
				hasFlag:0,
				loadFlag: false
			}
		},
		onLoad(option) {
			console.log(this.$store.state)
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id;
			this.pro_id=this.$store.state.pro_id
			if(option.pro_id){
				this.pro_id=option.pro_id
			}
			this._axios()
		},
		onShow() {
		},
		methods:{
			_axios() {
				var me = this;
				var data = {
					module: 'app',
					action: 'addFavorites',
					app: 'similar',
					access_id: this.access_id,
					pro_id:this.pro_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						me.loadFlag = true
						if(res.data.code==200){
							me.collection = res.data.list
							me.product=res.data.product[0]
							me.oPro_id=me.pro_id
							if(me.collection.length==0){
								me.hasFlag=-1
							}
						}else{
							me.hasFlag=-1
							me.collection.length=''
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					}
				})
			},
			_goods(id){
				this.$store.commit('SET_PRO_ID',id)
				console.log(this.$store.state.pro_id);
				uni.navigateTo({
					url:'../goods/goodsDetailed'
				})
			},
			...mapMutations({
				pro_id: 'SET_PRO_ID'
			}),
		},
		mounted(){
		},
		components:{
			Heads,
		}
	}
</script>

<style scoped>
	@import url("../../static/css/collection/discover.css");
</style>