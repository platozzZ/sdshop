<template>
	<div style='min-height: 100vh;background-color: #F6F6F6;width: 100vw;overflow: hidden;'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div class='relative'>
			<div class='topTabBar'>
				<div class='width_50' @tap='changeTabBar(true)' >
					<div :class='{"active":topTabBar}'>
						商品列表
					</div>
				</div>
				<div class='width_50' @tap='changeTabBar(false)'>
					<div :class='{"active":!topTabBar}'>
						待审核商品
					</div>
				</div>
			</div>
			
			<template v-if="loadFlag">
				<ul v-if='topTabBar'>
					<template v-if="list.length > 0">
						<li class='proList' v-for='(item,index) in list' :key='index'>
							<div class='proListUp'>
								<div class='proListUpLeft'>
									<img :src="item.imgurl">
								</div>
								<div class='proListUpRight'>
									<div class='proTitle'>{{item.product_title}}</div>
									<div class='proSellData' @tap='_checkDetail(item.id)'>
										<div class='sellMoney font_24'>￥{{item.price}}</div>
										<div class='font_24' :class='{"redColor":item.num<item.stockWarn}'>库存：{{item.num}}</div>
										<div class='font_24'>销量：{{item.volume}}</div>
									</div>
									<div class='proStatus' v-if='item.status==2'>已上架</div>
									<div class='proStatus' v-if='item.status==3' >已下架</div>
									<div class='proStatus' v-if='item.status==1' >待上架</div>
								</div>
							</div>
							<div class='proListDown'>
								<div class='proBtn'  v-if='item.status!=2' @tap='_delPro(item.id)'>删除商品</div>
								<div class='proBtn' @tap='_addStock(item.id)'>库存管理</div>
								<div class='proBtn'  v-if='item.status==2' @tap='_upDownPro(item.status,item.id)'>下架商品</div>
								<div class='proBtn' v-else  @tap='_upDownPro(item.status,item.id)' >上架商品</div>
								<div class='proBtn' v-if='item.status!=2' @tap='_reEditor(item.id)'>重新编辑</div>
							</div>
						</li>
					</template>
					<li class='proList zanwu' v-if="list.length == 0">暂无商品</li>
					<uni-load-more v-if="list.length>10" :loadingType="loadingType"></uni-load-more>
				</ul>
				<ul v-else>
					<template v-if="list.length>0">
						<li class='proList' v-for='(item,index) in list' :key='index'>
							<div class='proListUp'>
								<div class='proListUpLeft'>
									<img :src="item.imgurl">
								</div>
								<div class='proListUpRight' @tap='_checkDetail(item.id)'>
									<div class='proTitle'>{{item.product_title}}</div>
									<div class='proSellData'>
										<div class='sellMoney font_24'>￥{{item.price}}</div>
										<div class='font_24'>库存：{{item.num}}</div>
									</div>
									<div class='proStatus' v-if='item.mch_status==1'>审核中</div>
									<div class='proStatus' v-else-if="item.mch_status==2" >审核通过</div>
									<div class='proStatus' v-else-if="item.mch_status==3" >审核失败
									<text>：{{item.refuse_reasons}}</text>
									</div>
									<div class='proStatus' v-else >暂不审核</div>
								</div>
							</div>
							<div class='proListDown'>
								<div class='proBtn' @tap='_delPro(item.id)' v-if='item.mch_status==3||item.mch_status==4'>删除商品</div>
								<div class='proBtn' @tap='_reEditor(item.id)' v-if='item.mch_status==3||item.mch_status==4'>重新编辑</div>
								<div class='proBtn'  @tap='_checkStatus(item.id)' v-if='item.mch_status==1'>撤销审核</div>
								<div class='proBtn'  @tap='_checkStatus(item.id)' v-if='item.mch_status==4'>提交审核</div>
							</div>
						</li>
					</template>
					<li class='proList proList_center' v-if="list.length==0"><div>暂无商品</div></li>
					<uni-load-more v-if="list.length>10" :loadingType="loadingType"></uni-load-more>
				</ul>
			</template>
		</div>
		<div class='mask' v-if="mask_display1">
			<div class='mask_cont'>
				<p>请填写增加库存的数量</p>
				<input type="number"  v-model="addStockNum" placeholder="请填写增加库存的数量"  :placeholder-style="placeStyle" />
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel()">取消</div>
					<div @tap="_confirm()">确认</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import uniLoadMore from "@/components/uni-load-more.vue"

	export default {
		data() {
			return {
				addStockNum:'',
				mask_display1:false,
				title: '我的商品',
				access_id:'',
				topTabBar:true,
				testImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yhqBg.png',
				fastTap:true,
				shop_id:'',
				list:[],
				page:1,
				pro_id:'',
				type:1,
				placeStyle: 'color:#b8b8b8;font-size:28upx',
				loadFlag: false
			}
		},
		onLoad(option){
			let me = this;
			
			this.shop_id =uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):this.$store.state.shop_id
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
		},
		onShow() {
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
			});
			
			me._axios()
			
		},
		onReachBottom:function(){
			var me = this
			var data = {
				module: 'app',
				action: 'mch',
				m: 'my_merchandise_load',
				access_id:me.access_id,
				shop_id:me.shop_id,
				page:me.page
			}
			if(this.topTabBar){//判断获取哪种商品
				data.type=1
			}else{
				data.type=2
			}
			
			if(this.topTabBar){
				if(this.list.length > 0) {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							if(res.data.code==200){
								let {data: {list}} = res
								console.log(list)
								me.page += 1
								if(list.length > 0) {
									me.list = me.list1.concat(list);
									me.loadingType=0;
								} else {
									me.loadingType=2;
								}
							}else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
							
						},
						error:(err)=>{
							console.log(err)
						}
					})
				}
			}else{
				if(this.list.length > 0) {
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							if(res.data.code==200){
								let {data: {list}} = res
								console.log(list)
								me.page += 1
								if(list.length > 0) {
									me.list = me.list.concat(list);
									me.loadingType=0;
								} else {
									me.loadingType =2;
								}
							}else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						},
						error:(err)=>{
							console.log(err)
						}
					})
				}
			}
			
		},
		methods: {
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			_cancel(){
				this.mask_display1=false
				this.addStockNum=''
			},
			_checkStatus(id){
				var me=this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						module:'app',
						action:'mch',
						m:'submit_audit',
						shop_id:me.shop_id,
						p_id:id,
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							uni.showToast({
								title:'操作成功',
								duration:1500,
								icon:'none'
							})
							setTimeout(function(){
								me.fastTap=true
								me._axios()
							},1500)
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							me.fastTap=true
						}
					},
					error:function(){
						me.fastTap=true
					}
				})	
				
			},
			_reEditor(p_id){
				uni.navigateTo({
					url:'../myStore/uploadPro?pageStatus=editor&p_id='+p_id
				})
			},
			_addStock(id){
				uni.navigateTo({
					url:'addStock?p_id='+id
				})
			},
			_upDownPro(type,id){
				var me=this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						module:'app',
						action:'mch',
						m:'my_merchandise_status',
						shop_id:me.shop_id,
						status:type,
						p_id:id,
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							setTimeout(function(){
								me.fastTap=true
								me._axios()
							},1500)
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							me.fastTap=true
						}
					},
					error:function(err){
						me.fastTap=true
					}
				})
			},
			_delPro(id){
				var me=this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						module:'app',
						action:'mch',
						m:'del_my_merchandise',
						shop_id:me.shop_id,
						p_id:id,
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							uni.showToast({
								title:'删除成功',
								duration:1500,
								icon:'none'
							})
							setTimeout(function(){
								me.fastTap=true
								me._axios()
							},1500)
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
							me.fastTap=true
						}
					},
					error:function(){
						me.fastTap=true
					}
				})
			},
			_checkDetail(id){
				uni.navigateTo({
					url:'../myStore/uploadPro?pageStatus=see&p_id='+id
				})
			},
			changeTabBar(type){	
				if(type){
					this.topTabBar=true
				}
				else{
					this.topTabBar=false
				}
				this.list = []
				this.loadingType=0
				this.page = 1
				this.loadFlag = false
				this._axios();
			},
			_axios(){
				var me = this
				uni.showLoading({
					title: '请稍后...'
				})
				if(this.topTabBar){//判断获取哪种商品
					me.type=1
				}else{
					me.type=2
				}
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						module:'app',
						action:'mch',
						m:'my_merchandise',
						access_id:me.access_id,
						shop_id:me.shop_id,
						type:me.type,
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						me.loadFlag = true
						uni.hideLoading();
						if(res.data.code==200){
							me.list=res.data.list
							console.log(me.list)
						}else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						
					}
				})
			}
		},
		components: {
			heads,
			uniLoadMore
		},
	}
</script>

<style lang="less">
	@import url("../../static/css/myStore/myPro.less");
</style>
