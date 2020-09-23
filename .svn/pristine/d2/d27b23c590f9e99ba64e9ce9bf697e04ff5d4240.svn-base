<template>
	<div class="conten">
		<div ref='box' class="conten">
			<heads :title='title'></heads>
			<!-- 有商品的时候显示 -->
			<ul class='allgoods relative' v-if='list.length>0'>
				<li class="allgoods_li" v-for='(item,index) in list' :key='index'>
					<img :src="item.imgurl" @tap="_goods(item.id)"/>
					<p @tap="_goods(item.id)" class="allgoods_name">{{item.name}}</p>
					<p class="allgoods_subtitle">{{item.subtitle}}</p>
					<div>
						<span class='price'>￥{{item.price_yh}}</span>
						<span class='sales'>销量：{{item.volume}}</span>
						<!-- 购物图标 -->
						<img class='img' @tap="shopping_j(item.id)" :src="shopImg" />
					</div>
				</li>
			</ul>
			<!-- 无商品的时候显示 -->
			<div  v-else  class='relative'>
				<div class="search_no">
					<div class="font_14">
						<img class='img' :src="noImg">
					</div>
					<span class='span'>暂时还没有本类商品哦！</span>
				 </div>
			</div>
		</div>
		<!--  遮罩：点击购物小图标弹出  -->
		<div class='mask' v-if='mask_display'>
			<div class="mask_d">
				<div class='mask_guige'>
					<div class='mask_one'>
						<div>
							<img class="shangp" :src="imgurl" />
						</div>
						<div class='mask_pric'>
							<p class='red'>￥<span>{{price}}</span></p>
							<p>库存{{num}}</p>
						</div>
						<img class="cha" :src="closed"  @tap="_mask_f()"/>
					</div>
					<div class="mask_over">
						<div class='mask_two' v-for='(item,indx) in attrList' :key="indx">
							<p>{{item.attrName}}</p>
							<ul >
								<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']" @tap='showState(index,indx)'>{{items.attributeValue}}</li>
							</ul>
						</div>
						<div class='mask_num'>
							<p>购买数量</p>
							<div class='numb'>
								<img :src="numb==1?jian_hui:jian_hei" @tap="numb>1&&Boolean(haveSkuBean)?numb--:numb==1"/>
								<i>{{numb}}</i>
								<img :src='numb<num?jia_hei:jia_hui' @tap="numb<num&&Boolean(haveSkuBean)?numb++:false"/>
							</div>
						</div>
					</div>
				</div>
				<div style="height: 98upx;">
					<div class='mask_quren' @tap="_confirm">确认</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import {mapMutations} from 'vuex'
	export default {
		data(){
			return{
				fastTap:true,
				shopImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/shopping_l2x.png',
				closed:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				noImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/noFind.png',
				title:'', //页面标题
				cid:'',//分类id
				loadingType:0,
				page:1,//分页码
				list:'',
				jian_hei:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jian2x.png",
				jian_hui:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jianhui2x.png",
				jia_hei:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/jia+2x.png",
				jia_hui:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/add+2x.png",
				attribute_id: '',
				attrList: '',
				skuBeanList: '',
				mask_display:false,
				ys_price:'',//规格初始价格
				num:'',//规格数量
				price:'',//规格价格
				imgurl:'',//规格图片
				scan_d:'',//收藏id
				pro:'',//商品信息
				load_next:true,//是否能继续下滑加载
				haveSkuBean:'',//选择规则属性
				numb:1,//规格选择的数量
				access_id:'',
				proid:'',
				msg:'',
				shop_id:'',
			}
		},
		onLoad(option){
			
			this.cid = option.cid
			this.title = option.name
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
			this.shop_id = option.shop_id
			
			this._axios()
			
		},
		// 下拉加载
		onReachBottom:function(){
			var me = this
			if(me.load_next){
				uni.showLoading({
					title: '请稍后...'
				})
				if (me.loadingType != 0) {
					return;
				}
				me.loadingType = 1;
				me.page += 1
				var data = {
					cid: me.cid,
					module: 'app',
					action: 'search',
					app: 'listdetail',
					page:me.page,
					pro:''
				}
				if(me.shop_id){
					data.shop_id=me.shop_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if(res.data.pro.length > 0) {
							me.list = me.list.concat(res.data.pro);
							me.loadingType=0;
						} else {
							me.load_next = false
							uni.showToast({
								title:'没有更多了',
								duration:1500,
								icon:'none'
							})
							me.loadingType = 2;
						}
					},
					error:function(err){
						console.log(err)
					},
					complete:function(){
						uni.hideLoading();
					}
				});
			}else{
				uni.showToast({
					title:'没有更多了',
					duration:1500,
					icon:'none'
				})
			}
		},
		methods:{
			_axios() {
				uni.showLoading({
					title: '请稍后...'
				})
				var me = this
				var data = {
					cid: this.cid,
					module: 'app',
					action: 'search',
					app: 'listdetail',
					page:this.page,
					pro:''
				}
				if(this.shop_id){
					data.shop_id=this.shop_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						uni.hideLoading();
						if(res.data.code==200){
							let {data:{pro,pname}} = res
							me.list = pro
							me.title = pname
							if(pname){
								//#ifdef MP
								uni.setNavigationBarTitle({
									title: pname
								});
								// #endif
							}
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
					},
					complete:function(){
						uni.hideLoading();
					}
				});
			},
			/*   跳转商品详情页    */
			_goods(id) {
				this.pro_id(id)
				uni.navigateTo({
					url:'../goods/goodsDetailed?pro_id='+id
				});
			},
			// 点击购物图标
			shopping_j(id){
				var me = this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				this.proid = id
				var data = {
					module: 'app',
					action: 'product',
					app: 'index',
					pro_id: id,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						me.fastTap=true
						if(res.data.code==200){
							let {data: {data: {collection_id,pro,comments,attrList,skuBeanList,qj_price,type}}} = res
							me.ys_price=qj_price
							me.price = qj_price 
							me.attrList = attrList
							me.skuBeanList = skuBeanList
							me.collection = type
							me.imgurl = pro.img_arr[0]
							me.num = pro.num
							me._spec()
							me._mask_display()
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						
					},error:function(err){
						me.fastTap=true
					}
					});
				
			},
			//打开遮罩层
			_mask_display(){
				this.mask_display = true
				if(!this.haveSkuBean){
					for(var i = 0;i<this.attrList.length;i++){
						var attr = this.attrList[i].attr
						if(attr.length==1){
							this.showState(0,i)
							}
						}
				}
			},
			//关闭遮罩层
			_mask_false(){
				// 关闭弹窗让购买数量重新设为默认
				this.numb=1
				this.mask_display = false
				if(!this.haveSkuBean){
					for(var i = 0;i<this.attrList.length;i++){
						var attr = this.attrList[i].attr
						if(attr.length==1){
							this.showState(0,i)
							}
						}
				}
			},
			//点击遮罩层的关闭按钮
			_mask_f(){
				this.haveSkuBean=""
				this._mask_false()
				this.mask_display = false
			},
			//确认
			_confirm(){
				if(Boolean(this.haveSkuBean)){
					if(this.num==0){
						uni.showToast({
							title: '库存不足',
							duration: 1000,
							icon:'none'
						})
					}else if(this.num!=0){
						this._shopping()
					}
					
				}else{
					if(this.num==0){
						uni.showToast({
							title: '库存不足',
							duration: 1000,
							icon:'none'
						})
					}else{
						uni.showToast({
							title: '请选择完整的商品规格！',
							duration: 1000,
							icon:'none'
						})
					}
				}
			},
			// sku运算
			_spec() {
				var attrListIn = this.attrList;
				for(var i = 0; i < attrListIn.length; i++) {
					var attrListBig = attrListIn[i];
					//当前类别之外的选择列表
					var attrsOtherSelect = [];
					for(var j = 0; j < attrListIn.length; j++) {
						var attrListSmall = attrListIn[j];
						if(attrListSmall.id != attrListBig.id) {
							for(var k = 0; k < attrListSmall.attr.length; k++) {
								var attrListSmallAttr = attrListSmall.attr[k];
								if(attrListSmallAttr.enable && attrListSmallAttr.select) {
									//可选并且已经选择的属性
									attrsOtherSelect.push(attrListSmallAttr);
								}
							}
						}
					}
					var enableIds = [];
					var skuBeanListIn = this.skuBeanList;
					for(var z = 0; z < skuBeanListIn.length; z++) {
						var ism = true;
						var skuBean = skuBeanListIn[z];
						for(var j = 0; j < attrsOtherSelect.length; j++) {
							var enable = false;
							for(var k = 0; k < skuBean.attributes.length; k++) {
								var goodAttrBean = skuBean.attributes[k];
								if(attrsOtherSelect[j].attributeId == goodAttrBean.attributeId &&
									attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
									enable = true;
									break;
								}
							}
							ism = enable && ism;
						}

						if(ism) {
							for(var o = 0; o < skuBean.attributes.length; o++) {
								var goodAttrBean = skuBean.attributes[o];
								if(attrListBig.id == goodAttrBean.attributeId) {
									enableIds.push(goodAttrBean.attributeValId);
								}
							}
						}
					}
					var integers = enableIds;
					for(var s = 0; s < attrListBig.attr.length; s++) {
						var attrItem = attrListBig.attr[s];
						attrItem.enable = integers.indexOf(attrItem.id) != -1;

					}
				}
				// 重新赋值
				this.attrList = attrListIn,
				this.skuBeanList = skuBeanListIn
			},
			//选择属性
			showState(index,indx) {
				var listItem = this.attrList;
				var items = listItem[indx];
				var item = items.attr[index];
				if(!item.enable) {
					return;
				}
				var select = !item.select;
				for(var i = 0; i < items.attr.length; i++) {
					items.attr[i].select = false;
				}
				item.select = select;
				// 获取点击属性列表
				var canGetInfo = [];
				for(var skuIndex = 0; skuIndex < listItem.length; skuIndex++) {
					for(var skuIndexIn = 0; skuIndexIn < listItem[skuIndex].attr.length; skuIndexIn++) {
						if(listItem[skuIndex].attr[skuIndexIn].enable && listItem[skuIndex].attr[skuIndexIn].select) {
							canGetInfo.push(listItem[skuIndex].attr[skuIndexIn]);
						}
					}
				}

				var canGetInfoLog = "";

				var skuBeanList = this.skuBeanList;

				var haveSkuBean = [];
				// 对应库存清单扫描
				for(var skuBeanIndex = 0; skuBeanIndex < skuBeanList.length; skuBeanIndex++) {
					var iListCount = 0;
					for(var skuBeanIndexIn = 0; skuBeanIndexIn < skuBeanList[skuBeanIndex].attributes.length; skuBeanIndexIn++) {
						if(canGetInfo.length == skuBeanList[skuBeanIndex].attributes.length) {
							if(skuBeanList[skuBeanIndex].attributes[skuBeanIndexIn].attributeValId == canGetInfo[skuBeanIndexIn].id) {
								iListCount++;
							}
						} else {
							canGetInfoLog = "库存清单不存在此属性" + " ";
						}
					}
					if(iListCount == skuBeanList[skuBeanIndex].attributes.length) {
						haveSkuBean.push(skuBeanList[skuBeanIndex]);
					}
				}

				for(var iox = 0; iox < canGetInfo.length; iox++) {
					canGetInfoLog += canGetInfo[iox].attributeValue + " ";
				}

				if(haveSkuBean.length != 0) {
					this.num = haveSkuBean[0].count;
					this.price = haveSkuBean[0].price;
					this.imgurl = haveSkuBean[0].imgurl
					this.haveSkuBean =haveSkuBean[0]
				} else {
					this.num = this.pro.num
					this.price = this.ys_price
					this.haveSkuBean = ''
				}

				// 重新赋值
				this.attrList = listItem
				/*infoText: canGetInfoLog,*/

				// 重新sku运算
				this._spec();
			},
			// 数组里面包含某个值吗
			in_array (stringToSearch, arrayToSearch) {
				 for (let s = 0; s < arrayToSearch.length; s++) {
				  let thisEntry = arrayToSearch[s].toString();
				  if (thisEntry == stringToSearch) {
				   return true;
				  }
				 }
				 return false;
			},
			//加入购物车
			_shopping(){
				var me = this
					if(this.haveSkuBean){
						var data = {
							module:'app',
							action:'product',
							app:'add_cart',
							pro_id:this.proid,
							attribute_id:this.haveSkuBean.cid,
							num:this.numb,
							type:'addcart'
						}
						if(this.access_id){
							data.access_id=this.access_id
						}
						else{
							data.access_id=''
						}
						if(this.$store.state.nCart){
							data.cart_id=this.$store.state.nCart
						}
						else{
							data.cart_id=''
						}
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success: (res) => {
								let {data:{code,data,message}} = res
								if(code==200){
									uni.showToast({
										title: '添加成功，在购物车等您哦~',
										duration: 1000,
										icon:'none'
									})
									me.haveSkuBean  = ''
									me._mask_false()
								}
								else{
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
								if(data.cart_id){
									if(!me.in_array(data.cart_id,me.$store.state.nCart)){
										me.$store.state.nCart.push(data.cart_id)
									}
								}
							},error:function(err){
								console.log(err)
							}
						});
					}
					else{
						this._mask_display()
					}
				},
			...mapMutations({
				pro_id:'SET_PRO_ID',
				cindex:'SET_CINDEX'
				}),
		},
		components:{
			Heads,
		}
	}
</script>

<style>
	@import url("../../static/css/goods/goods.css");
</style>