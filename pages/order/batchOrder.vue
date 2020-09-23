<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		<ul class='order_goods' :style="{top:halfWidth}">
			<li class='order_two' v-for="(item,index) in order">
				<img class='quan_img' :src="display_img[index] ? quan_hei:quan_hui" @tap="_checkedOne(item, index)" />
				<img class='order_two_img' :src='item.imgurl' />
				<div style="margin-right: 40upx;width: 58%;" @tap="_goods(item.p_id)">
					<p class='order_space'>{{item.p_name}}</p>
				</div>
				<div>
					<p>￥{{item.p_price}}</p>
					<p class='color_two'>x{{item.num}}</p>
				</div>
			</li>
		</ul>
		<div class='batch_bottom'>
			<div class='bottom_left'>
				<img class='quan_img' :src="selectAll ? quan_hei : quan_hui" @tap=" _selectAll" />
				<span>全选</span>
			</div>
			<div class="batch_bottom_q" @tap="_button">确定</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	
	export default{
		data(){
			return{
				title:'选择商品列表',
				orde_id:'',
				order:'',
				access_id: '',
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehui2x.png",
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/xuanzehei2x.png",
				display_img: [], //圆圈的选中状态
				selectArray: [], //存储选中商品
				selectAll: false, //全选状态
				fastTap:true,
				rType:false,
			}
		},
		onLoad(option){
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me.orde_id = option.orde_id
					me.rType=option.rType
					me._axios();
				});
			});
		},
		computed:{
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
		},
		methods:{
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			//单选
			_checkedOne(item, indexli) {
				 console.log(item)
				//给数组原型绑定返回指定值索引的方法
				Array.prototype.indexf = function(val) { //prototype 给数组添加属性
					for(var i = 0; i < this.length; i++) { //this是指向数组，this.length指的数组类元素的数量
						if(this[i] == val) return i; //数组中元素等于传入的参数，i是下标，如果存在，就将i返回
					}
					return -1;
				};
				//给数组原型绑定删除指定值的方法（配合上一种方法用）
				Array.prototype.remove = function(val) { //prototype 给数组添加属性
					var index = this.indexf(val); //调用index()函数获取查找的返回值
					if(index > -1) {
						this.splice(index, 1); //利用splice()函数删除指定元素，splice() 方法用于插入、删除或替换数组的元素
					}
				};
				var cum = this.selectArray.indexOf(item);
				// 如果是有的话 点击就是取消
				//判断点击的传入的值是否存在数组中，如果没有添加，如果有删除，同时设定选中状态（第一次点击添加进数组，第二次点击从数组中删除）

					if(cum < 0) {
						this.selectArray.push(item);
						this.$set(this.display_img, indexli, true)
					} else {
						this.selectArray.remove(item)
						this.$set(this.display_img, indexli, false)
					}
					//根据产品选状态，设定全选状态
					if(this.selectArray.length == this.order.length) {
						this.selectAll = true
					} else {
						this.selectAll = false
					}
				console.log(this.selectArray)
			},
			//全选
			_selectAll() {
				//根据全选状态，设定商品选中状态
				this.selectAll = !this.selectAll;
				console.log(this.selectAll)
				var img = this.$refs.img;
				//根据全选状态，设定商品选中状态
				if(this.selectAll) {
						for(var i = 0; i < this.order.length; i++) {
							this.$set(this.selectArray, i, this.order[i]);
							this.$set(this.display_img, i, true)
						}
					}else{
						this.selectArray = []
						for(var i = 0; i < this.order.length; i++) {
							this.$set(this.display_img, i, false)
						}
					}
				console.log(this.selectArray)
			},
			_button(){
				var me=this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				let order_details_id = []
				for(let i=0;i<this.selectArray.length;i++){
					let id = this.selectArray[i].id
					order_details_id.push(id)
					console.log(id,888)
				}
				if(this.selectArray.length){
					uni.navigateTo({
						url:'../../pagesA/returnGoods/returnGoods?order_details_id='+order_details_id+'&order_anking=2&rType='+me.rType,
						success:function(){
							me.fastTap=true
						}
					})
				}else{
					me.fastTap=true
					uni.showToast({
						title: '请选择需要售后的商品！',
						duration: 1000,
						icon:'none'
					})
				}
				console.log(order_details_id)
			},
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					order_id: this.orde_id,
					module: 'app',
					action: 'order',
					app: 'order_details'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							let {data: {data:{list}}} = res
							console.log(list)
							var order = []
							for(let i = 0;i<list.length;i++){
								if(list[i].r_status==2||list[i].r_status==1){
									order.push(list[i])
								}
							}
							me.order = order
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						console.log(res)
					},
					error:function(err){
						console.log(err)
					}
				})
			}
		},
		components: {
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/order/batchOrder.css");
</style>