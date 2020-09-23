<template>
	<div>
		<div style="height: 98upx;width: 100%;">
			<ul class='bottom'>
				<li @click="a('home',1)" class='li' :class="{color:home}">
					<img :src='home ? home_2 : home_1' />
					<p>首页</p>
				</li>
				<li @click="a('allGoods',2)" class='li' :class="{color:go_shopping}">
					<img :src="go_shopping ? go_shopping_2 : go_shopping_1" />
					<p>全部产品</p>
				</li>
				<li @click="a('shoppingCart',3)" class='li' :class="{color:shopping}">
					<img :src="shopping ? shopping_2 : shopping_1" />
					<p>购物车</p>
				</li>
				<li @click="a('my',4)" class='li' :class="{color:my}">
					<img :src="my ? my_2 : my_1" />
					<p>我的</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

	import { mapMutations } from 'vuex'
	export default{
		data(){
			return{
				home:true,
				shopping:false,
				go_shopping:false,
				my:false,
				home_1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/home2x.png',
				home_2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/home22x.png',
				shopping_1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/shopping2x.png',
				shopping_2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/shopping22x.png',
				go_shopping_1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/go_shopping2x.png',
				go_shopping_2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/go_shopping22x.png',
				my_1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/my2x.png',
				my_2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/my22x.png',
				index:''
			} 
		},
		props:['bottom'],
		onLoad(option){
			
		},
		mounted() {
			this._bottom()
		},
		methods:{
			a(url,num){
				if(this.$store.state.tabIndex==num){
					return
				}
				else{
					this.tabIndex(num)
					uni.navigateTo({
						url
					})
					
				}
			},
			...mapMutations({
				tabIndex:'SET_TAB_INDEX'
			}),
			_bottom(){
				if(this.$store.state.tabIndex==1){
					this.home = true
					this.shopping=false
					this.go_shopping=false
					this.my=false
				}else if(this.$store.state.tabIndex==2){
					this.go_shopping=true
					this.home = false
					this.shopping=false
					this.my=false
				}else if(this.$store.state.tabIndex==3){
					this.shopping=true
					this.home = false
					this.go_shopping=false
					this.my=false
				}else if(this.$store.state.tabIndex==4){
					this.my=true
					this.home = false
					this.go_shopping=false
					this.shopping=false
				}
				console.log('as4d654as65d4');
			}
		}
	}
</script>

<style scoped>
	.bottom{display: flex;justify-content: space-around;align-items: center;height: 98upx;width: 100%;border-top:1px solid #eee;
			background-color: #F9F9F9;position: fixed;bottom: 0;left: 0;z-index: 40;transform: translateZ(0)}
	.li{text-align: center;color: #9D9D9D;font-size:22upx;width: 20%;}
	.bottom img{width:38upx;height:38upx;}
	.color{color:#020202;}
</style>