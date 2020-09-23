<template>
	<div class="store-container" :style="shop_css">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<toload :load = 'loadFlag'>
			<div class="store-item" v-for="(item, index) in shop_list" :key="index" @tap="choseStore(item)">
				<div>
					<div class='flex1'>
						<p class="store-title">{{item.name}}</p>
						<p class="store-text">{{item.sheng}}{{item.shi}}{{item.xian}}{{item.address}}</p>
					</div>
				</div>
				<p class="store-line"></p>
				<div class="store-item-bottom">
					<p>营业时间 {{item.business_hours}}</p>
					<p>联系电话 {{item.mobile}}</p>
				</div>
			</div>
			<div v-if="user_status==1&&shop_list.length==0" class="add-store">
				<div @tap="_navigateTo('../myStore/addStore')">
					<img :src="add_1img">
					<span>添加线下门店</span>
				</div>
			</div>
			<div v-if="user_status==1&&shop_list.length>0" class='storeList-bottom'>
				<button class='edit_btn' @tap='edit()'>编辑</button>
				<button @tap='del()'>删除</button>
			</div>
		</toload>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import toload from '../../components/toload.vue'
	import { getStorage } from '../../common/storage.js'
	export default{
		data(){
			return{
				user_status:'', //用户等级，商户还是买家,1是卖家 否则是买家
				returnR:'',
				back:'',
				title:'门店列表',
				access_id: '',
				list:false,
				shop_id:'',
				selectorSrcIndex: 0,  //选中的地址下标
				selectorSrcFlag:false,  //点击编辑或删除进入多选
				shop_list:[],
				shop_css:'',
				add_1img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/add_1.png",
				
				loadFlag: false
			}
		},
		onLoad(option){
			var me = this
			if(option.shop_id){
				me.shop_id = option.shop_id
			}else{
				me.shop_id = me.$store.state.shop_id
			}
			
			me.user_status = option.status_class
		},
		onShow() {
			let me = this;
			me.$nextTick(function(){
				me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
				if(!me.list){
					uni.showLoading({
						title:'加载中...',
						mask:true,
					});
				}
				me._axios();
			})
		},
		methods:{
			changeLoginStatus(){
				var me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			_navigateTo(url){
				uni.navigateTo({
					url
				})
			},
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'mch',
					m: 'my_store',
					access_id:me.access_id,
					shop_id:me.shop_id
				}
				
				// 隐藏做门店编辑，做完解除	
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if(res.data.code == 200){
							me.shop_list = res.data.list
							if(me.shop_list){
								me.shop_css = "min-height:100vh"
							}
						}else{
							uni.showToast({
							    title:res.data.message,
							    duration:1500,
							    icon:'none'
							})
						}
						
						me.loadFlag = true
					},
					error:function(err){
						console.log(err)
					},
				})
			},
			choseStore(e){
				// 如果是买家，则选中地址后跳转至订单确定页面
				if(this.user_status!=1){
					uni.setStorageSync("shop_address_id",e.id)
					uni.navigateBack({
						delta:1
					})
				}
			},
			// 编辑
			edit(){
				this._navigateTo('../myStore/addStore?edit=true')
			},
			// 删除
			del(e){
				uni.showLoading({
					title:'加载中...',
					mask:true,
				});
				var me = this
				var data = {
					module: 'app',
					action: 'mch',
					m: 'del_store',
					access_id:me.access_id,
					shop_id:me.shop_id
				}
				// 隐藏做门店编辑，做完解除	
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						uni.showToast({
							title:res.data.message,
						    duration:1500,
						    icon:'none'
						})
						me._axios();
					},
					error:function(err){
						console.log(err)
					},
				})
			}
		},
		components:{
			heads,
			toload
		}
		
	}
</script>

<style scoped>
	@import url("../../static/css/myStore/storeList.css");
</style>