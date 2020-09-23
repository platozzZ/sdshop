<template>
	<div class="order_ii">
		<heads title="全部分类" bgHei='true' navWhite='true' returnFlag='1'/>
		
		<toload v-if="!load" :load="load"></toload>
		<div class='order_container' v-if="load">
		
			<div class="allgoods_b" :style="{paddingBottom:h5Height}">
				<!-- 左边的列表 -->
				<ul class="allgoods_left" ref='allgoods_left'>
					<li v-for='(item,index) in centre_title' :class="{color:title_index==index}" :key='index' class='allgoods_l'  @tap="_title(index)">
						<div >{{item.cate_name}}</div>
						<div :class="{isborder:title_index==index}"></div>
					</li>
				</ul>
				<!-- 右边的详细分类 -->
				<div class="allgoods_right">
					<ul class="allgoods_u" v-if="centre_list.length > 0">
						<li  @tap="_goods(items.child_id,items.name)" v-for='(items,index) in centre_list' :key='index' >
							<image style="width: 120upx;height: 120upx;" lazy-load='true' :src="items.picture"/>
							<p>{{items.name}}</p>
						</li>
					</ul>
					<div v-else>
						<div>
							<img class='noFindImg' style="margin-top: 100px;" :src="noOrder" />
						</div>
						<span class='noFindText'>暂时还没有二级分类哦</span>
					</div>
				</div>
				<div style="background-color: #fff;height: 1px;"></div>
			</div>
			<div style="background-color: #fff;height: 1px;"></div>
		</div>
	</div>
</template>

<script>
	import Bottom from '../../components/bottom.vue'
	import { mapMutations } from 'vuex'
	import {getStorage} from '../../common/storage.js'
	import heads from '../../components/header.vue'
	import toload from '@/components/toload.vue'
	
	export default{
		data(){
			return{
				loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				noOrder:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/fenlei.png',
				title_index:0,  //商品导航切换
				centre_title:'',  //左侧分类标题
				centre_list:'',  //右侧详细分类
				cid:'',//分类id
				load: false,
				cc:0,  //导航下标
			}
		},
		computed:{
			halfWidth() {
				var gru=getStorage('data_height')?getStorage('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
			h5Height:function(){
				var height
				// #ifdef H5
				height=100
				// #endif
				// #ifndef H5
				height=0
				// #endif
				return uni.upx2px(height) + 'px';
			},
		},
		components: {
			Bottom,
			heads,
			toload
		},
		onLoad(option){
			let me = this;
			me.LaiKeTuiCommon.getUrlFirst(me._axios);
			this.storag=uni.getStorageSync('history')
		},
		onshow(){
			var me=this
			this.cc= this.$store.state.cindex
		},
		methods:{
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'search',
					app: 'index'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						console.log(res)
						let {data:{List}} = res
						me.centre_title = List
						me.centre_list = List[0]
						me.cc= me.$store.state.cindex
						me._title(me.cc)
						me.load=true
					},
					error:function(err){
						console.log(err)
					}
				})
			},
			/*   商品导航切换    */
			_title(index){
				this.title_index = index;
				this.centre_list = this.centre_title[index].children
				this.cindex(index);
			},
			_focus() {

			},
			/*   跳转商品展示页面    */
			_goods(id,name){
				console.log(id)
				uni.navigateTo({
					url: '../goods/goods?cid='+id+'&name='+name
				});
			},
			...mapMutations({
				cindex:'SET_CINDEX'
			}),
		},
		watch:{

		},
	}
</script>

<style scoped>
	@import url("../../static/css/tabBar/allGoods.css");
</style>
