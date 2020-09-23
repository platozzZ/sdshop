<template>
	<div style='height: 100vh;background-color: #f6f6f6;'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<div class='relative'>
			<div class='topTabBar'>
				<div class='width_50' @tap='changeTabBar(1)' >
					<div :class='{"active":topTabBar==1}'>
						收入明细
					</div>
				</div>
				<div class='width_50' @tap='changeTabBar(3)' >
					<div :class='{"active":topTabBar==3}'>
						积分明细
					</div>
				</div>
				<div class='width_50' @tap='changeTabBar(2)'>
					<div :class='{"active":topTabBar==2}'>
						提现明细
					</div>
				</div>
			</div>
			<div v-if='list.length>0 '>
			
				<div class='orderList' v-for='(item,index) in list' :key='index'>
					
					<ul class='orderTitle'>
						
						<li class='today_div'>
							<div class='date' >
								{{item.time}}<span v-if='item.time==now'>（今天）</span>
							</div>
						</li>
						
						<li v-for='(items,indexs) in item.res' :key='indexs' >
							
							<div class='list_group1'>
								<span>{{items.type_name}}</span>
								<template v-if="type != 3">
									<span class='bold' v-if='items.status==1'>+{{ items.price }}</span>
									<span class='bold' v-else-if='items.status==2' >-{{ items.price }}</span>
								</template>
								<template v-else>
									<span class='bold' v-if='items.status==1'>+{{ items.integral }}</span>
									<span class='bold' v-else-if='items.status==2' >-{{ items.integral }}</span>
								</template>
							</div>
							
							<div class='list_group2'>
								<span>{{ items.addtime }}</span>
								<span class='yue_money' v-if="type != 3">余额：{{ items.account_money }}</span>
								<span class='yue_money' v-else>积分：{{ items.integral_money }}</span>
							</div>
						</li>
						
					</ul>
				</div>
			</div>
			<div v-if='list.length==0 && status' class='wsj_box'>
				<img class='wsj_img' :src="wushuju">
				<div>
					暂时还没有记录哦~
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	export default {
		data() {
			return {
				title: '账户明细',
				access_id:'',
				topTabBar:1,
				shop_id:'',
				type:1,
				list:[],
				status:false,
				wushuju:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/wuzhangdan.png'
			}
		},
		onLoad(option){
			let me = this;
			uni.showLoading({
				title: '请稍后...'
			})
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '/pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.shop_id = uni.getStorageSync('shop_id') ? uni.getStorageSync('shop_id') : me.$store.state.shop_id
					me._axios()
				});
			});
		},
		methods: {
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios()
			},
			changeTabBar(num){
				this.topTabBar=num
				this.type=num
				this.list = []
				this.status = false
				this._axios()
			},
			_axios(){
				var me=this
				uni.showLoading({
					title: '请稍后...'
				})
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						shop_id:me.shop_id,
						module:'app',
						action:'mch',
						m:'account_details',
						type:me.type,
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						uni.hideLoading();
						if(res.data.code==200){
							res.data.list.forEach(r => {
								for(let item of r.res){
									item.addtime = item.addtime.split(' ')[1]
								}
							})
							me.list=res.data.list
							if(me.list.length == 0){
								me.status = true
							}
							console.log(me.list)
						}else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						
					},
					error:function(err){
						uni.showToast({
							title:"请求失败",
							icon:'none'
						})
					}
				})
			}
			
		},
		computed: {
			now:function(){
				var year=new Date().getFullYear()
				var month=new Date().getMonth()+1
				var date=new Date().getDate()
				var date1=year+'-'+month+'-'+date
				return date1
			}
		},
		components: {
			heads
		},
	}
</script>

<style lang="less">
	@import url("../../static/css/myStore/myFinance.less");
</style>
