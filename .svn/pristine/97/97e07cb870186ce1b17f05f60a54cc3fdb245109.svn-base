<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title' :returnR="returnR"></heads>
		<div v-if='!load'>
			<div class='checkDiv' v-if='haveStore==1'>
				<div class='noFindDiv'>
					<div style='noFindImgDiv'>
						<img class='noFindImg' :src="checkImg" />
					</div>
					<div class='checkDivData'>审核中</div>
					<span class='noFindText font_24'> 您的资料已提交，正在审核中，请耐心等待</span>
					<div class='goOn'>
					</div>
				</div>
			</div>
			<div class='checkDiv' v-else-if='haveStore==2'>
				<div class='myStoreBox' :style='style'>
					<div class='myStoreTop'>
						<div>
							<img class='img' :src="info.logo">
						</div>
						<div>
							<!-- color: #020202;font-size: 30upx; -->
							<p class='infoName'>{{info.name}}</p>
							<!-- color: #999999; -->
							<p class='infoShop'>简介：{{info.shop_information}}</p>
						</div>
						<div class='btnDiv' @tap="QRcode"></div>
					</div>
					<div class='myStoreDataDiv'>
						<div @tap="_navigateTo('../myStore/myOrder?status=all')">
							<p class='dataBlack'>{{info.order_num}}</p>
							<p class='dataGray'>今日订单数</p>
						</div>
						<div @tap="_navigateTo('../myStore/myOrder?status=dfh')">
							<p class='dataBlack'>{{info.order_num1}}</p>
							<p class='dataGray'>待发货订单</p>
						</div>
						<div @tap="_navigateTo('../myStore/myOrder?status=sh')">
							<p class='dataBlack'>{{info.order_num2}}</p>
							<p class='dataGray'>售后订单</p>
						</div>
						<div @tap="_navigateTo('../myStore/myCli')">
							<p class='dataBlack'>{{info.visitor_num}}</p>
							<p class='dataGray'>访客数</p>
						</div>
						<div @tap="_navigateTo('../myStore/myOrder?status=all')">
							<p class='dataBlack'>{{info.income}}</p>
							<p class='dataGray'>今日新增收入</p>
						</div>
						<div @tap="_navigateTo('../myStore/myCha')">
							<p class='dataBlack'>{{info.account_money}}</p>
							<p class='dataGray'>账户金额</p>
						</div>
					</div>
					<div class='myStoreSetupDiv'>
						<div  @tap="_navigateTo('../myStore/uploadPro')">
							<img :src="ULPro" alt="">
							<p class='setupBlack'>上架商品</p>
						</div>
						<div  @tap="_navigateTo('../myStore/myPro')">
							<img :src="myPro" alt="">
							<p class='setupBlack'>我的商品</p>
						</div>
						<div  @tap="_navigateTo('../myStore/myOrder')">
							<img :src="myOrder" alt="">
							<p class='setupBlack'>我的订单</p>
						</div>
						<div  @tap="_navigateTo('../myStore/myCha')">
							<img :src="myCha" alt="">
							<p class='setupBlack'>我的提现</p>
						</div>
						<div  @tap="_navigateTo('/pagesA/myStore/fight_manage')">
							<img :src="mystore_group" alt="">
							<p class='setupBlack'>拼团管理</p>
						</div>
						<div  @tap="_navigateTo('/pagesA/myStore/MsIndex')">
							<img :src="mystore_skill" alt="">
							<p class='setupBlack'>限时秒杀</p>
						</div>
						<div  @tap="_navigateTo('/pagesA/myStore/platform_activities')">
							<img :src="mystore_activity" alt="">
							<p class='setupBlack'>活动管理</p>
						</div>
						<div  @tap="_navigateTo('../myStore/myCli')">
							<img :src="myCli" alt="">
							<p class='setupBlack'>我的客户</p>
						</div>
						<div  @tap="_navigateTo('../myStore/storeSetup')">
							<img :src="storeSet" alt="">
							<p class='setupBlack'>店铺设置</p>
						</div>
						<div  @tap="_navigateTo('../myStore/storeList?status_class=1')">
							<img :src="storeSite" alt="">
							<p class='setupBlack'>门店管理</p>
						</div>
						<!-- #ifdef MP-WEIXIN -->
						<!-- <navigator :url="livePlayUrl">
						<div >
							<img :src="livePlayImg" alt="">
							<p class='setupBlack'>我的直播</p>
						</div>
						</navigator> -->
						<!-- #endif -->
						<p class='clear'></p>
					</div>
					
				</div>
			</div>
			<div class='relative' v-else-if='haveStore==0'>
				<div class='myStoreDiv'>
					<div class='myStoreImgDiv'>
						<img class='img' :src="noStore">
					</div>
					<span class='noFindText'>您还未申请开店</span>
					<div class='toApplyDiv' @tap='_toApply()'>
						<span class='toApply' >申请开店</span>
					</div>
				</div>
			</div>
			<div class='checkDiv1' v-else-if='haveStore==3'>
				<div class='noFindDiv'>
					<div>
						<img class='noFindImg' :src="checkFalse" />
					</div>
					<div class='checkDivData'>审核未通过</div>
					<span class='noFindText font_24'>原因:{{reason}}</span>
					<div class='goOn'>
						<div class='toApply1' @tap='_toApply1'>继续申请</div>
					</div>
				</div>
			</div>
		</div>
		<div class='load' v-else>
			<div>
				<img :src="loadGif" />
				<p>加载中</p>
			</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	export default {
		data(){
			return {
				load:true,
				loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				access_id:'',
				title:'我的店铺',
				fastTap:true,
				reason:'',
				noStore:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/noStore.png',
				checkImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/checkIng.png',
				haveStore:3,
				myCli:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/myCli.png',
				livePlayImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/hhhh2x.png',
				storeLogo:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/storeLogo.png',
				myPro:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/myPro.png',
				ULPro:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/ULPro.png',
				myOrder:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/myOrder.png',
				storeSet:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/storeSet.png',
				storeSite:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/storeSite.png',
				checkFalse:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/checkFalse.png',
				myCha:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/myCha.png',
				mystore_skill:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/mystore_skill.png',
				mystore_activity:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/mystore_activity.png',
				mystore_group:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/mystore_group.png',
				info:'',
				returnR:7,
				livePlayUrl:'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=1',
				padding: '30upx;background-image: url('+this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'/images/icon1/QRcode.png);background-size: 100% auto;background-repeat: no-repeat;',
				style:'background-image: url('+this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'/images/icon1/QRcode.png);background-size: 100% auto;background-repeat: no-repeat;'
			}
		},
		mounted () {
			let me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me._axios();
				});
			});
		},
		methods: {
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			_navigateTo(url){
				uni.navigateTo({
					url
				})
			},
			_toApply() {
				uni.navigateTo({
					url:'../myStore/applyStore'
				})
			},
			_toApply1() {
				console.log(110)
				uni.navigateTo({
					url:'../myStore/applyStore?goOn=true'
				})
			},
			_axios(){

				var me=this ;
				me.livePlayUrl =  'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=1';
				uni.request({
					data:{
						access_id:me.access_id,
						module:'app',
						action:'mch',
						m:'index',
					},
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						console.log(res)
						setTimeout(function(){
							me.load=false
						},200)
						if(res.data.code==200){
							me.haveStore=res.data.status
							//直播间房号
							let roomid = 1;
							if(res.data.data.roomid ){
								roomid =res.data.data.roomid;
							}
							me.reason=res.data.data.review_result;
							me.info=res.data.data
							if(roomid==0){
								roomid = 1;
							}
							me.livePlayUrl = 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=';
							me.livePlayUrl =  me.livePlayUrl + roomid;
							uni.setStorage({
								key:'shop_id',
								data:res.data.data.shop_id
							})
							me.$store.state.shop_id=res.data.data.shop_id
						}else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					}
				})
			},
			// 扫码核销
			QRcode(){
				this._navigateTo('../myStore/QRcode')
			}
		},
		components: {
			heads,
		},
	}
</script>

<style scoped lang="less">
	@import url("../../static/css/myStore/myStore.less");
</style>
