<template>
	<div class="yh-myscore">
		
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		
		<!-- #ifndef MP -->
		<div class="yh-title" :style="{paddingTop:halfWidth}">
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中…</p>
			</div>
		</div>
		<div v-else class="yh-halfWidth2" :style="{top:halfWidth2}">
			
			<div class="score_head">
				<div class='scoreData'>
					<div class='scoreNum'>{{scoreNum}}</div>
					
					<div class="yh-kyjf">当前可用积分</div>
					<view class="scoreData-btn" @click="jmpNav()" style="margin: 0 auto;">
						签到领积分
					</view>
				</div>
				<div class='useExp' @tap='_toGradeUse(true)'>
					<img :src="useExp" alt="">
					<span>使用说明</span>
				</div>
				<image :src="myScoreimg"></image>
			</div>
			
			<div class='scoreRecode' :style='{top:halfWidth1}'>
				
				<div class='recodeTop' >
					<div @tap='topChange(0)'><span>全部明细</span><span v-if='topStatus==0' class='border1'></span></div>
					<div @tap='topChange(1)'><span>获取明细</span><span v-if='topStatus==1' class='border1'></span></div>
					<div @tap='topChange(2)'><span>使用明细</span><span v-if='topStatus==2' class='border1'></span></div>
				</div>
				
				<div class='recodeDiv'>
					<div v-if='topStatus==0'>
						<div v-for='(item,index) in list1' :key='index' class='recodeDetail'>
							<div>
								<div class='recodeTitle'>
									<span>{{item.name}}</span>
								</div>
								<div class='recodeTime'>{{item.sign_time}}</div>
							</div>
							<div>
								<div class='recodeScore'>
									<span v-if='item.status'>+{{item.sign_score}}</span>
									<span v-else class="yh-sign_score">-{{item.sign_score}}</span>
								</div>
							</div>
						</div>
						<uni-load-more v-if='list1.length>5' :loadingType="loadingType0"></uni-load-more>
					</div>
					
					<div v-else-if='topStatus==1'>
						<div v-for='(item,index) in list2' :key='index' class='recodeDetail'>
							<div>
								<div class='recodeTitle'>
									<span>{{item.name}}</span>
								</div>
								<div class='recodeTime'>{{item.sign_time}}</div>
							</div>
							<div>
								<div class='recodeScore'>
									<span>+{{item.sign_score}}</span>
								</div>
							</div>
						</div>
						<uni-load-more v-if='list2.length>5' :loadingType="loadingType1"></uni-load-more>
					</div>
					
					<div v-else-if='topStatus==2'>
						<div v-for='(item,index) in list3' :key='index' class='recodeDetail'>
							<div>
								<div class='recodeTitle'>
									<span>{{item.name}}</span>
								</div>
								<div class='recodeTime'>{{item.sign_time}}</div>
							</div>
							<div>
								<div class='recodeScore'>
									<span class="yh-sign_score">-{{item.sign_score}}</span>
								</div>
							</div>
						</div>
						<uni-load-more v-if='list3.length>10' :loadingType="loadingType2"></uni-load-more>
					</div>
					
				</div>
			</div>
		</div>
		<ruleModal v-model="isShow" @click="_toGradeUse" title="使用规则" :details="content" />
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import uniLoadMore from "@/components/uni-load-more.vue"
	import ruleModal from '@/components/ruleModal.vue'
	import htmlParser from '@/common/html-parser.js'
	export default {
		data() {
			return {
				loadingType0:0,
				loadingType1:0,
				loadingType2:0,
				topStatus:0,
				title: '我的积分',
				access_id:'',
				load:false,
				scoreNum:'',
				list1:'',
				list2:'',
				list3:'',
				page0:1,
				page1:1,
				page2:1,
				myScoreimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon/integralback.png',// 积分背景
				useExp:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/useExp.png',
				loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/loading.gif',
				isShow:false,
				content:''
			}
		},
		
		mounted() {
			var me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me._axios()
				});
			});
		},
		methods: {
			/**
			 * 跳转签到
			 * @description 
			 * */
			jmpNav(){
				uni.navigateTo({
					url:'../../pagesA/shop/sign'
				})
			},
			/**
			 * 
			 * */
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			/**
			 * 
			 * */
			_toGradeUse(is){
				if(is){
					uni.request({
						data:{
							module: "app",
							action: "sign",
							app: 'Instructions',
							access_id: this.access_id
						},
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:(res) => {
							if(res.data.code==200){
								this.content = htmlParser(res.data.Instructions)
								this.isShow = !this.isShow
							} else {
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						}
					})
				} else {
					this.isShow = !this.isShow
				}

			},
			/**
			 * 
			 * */
			topChange(num){
				this.topStatus=num
				uni.pageScrollTo({scrollTop:0,duration:10})
			},
			/**
			 * 
			 * */
			_axios(){
				var me=this
				const requestTask1=uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						module:'app',
						action:'sign',
						app:'integral',
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						if(res.data.code==200){
							me.scoreNum=res.data.data.score
							me.list1=res.data.data.whole
							me.list2=res.data.data.sign
							me.list3=res.data.data.consumption
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
						console.log("异常");
						console.error(err);
					}
				})
			}
		},
		computed: {
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
			halfWidth1:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=0
				// #ifdef MP
				he=350
				// #endif
				// #ifdef APP-PLUS
				he=350
				// #endif
				// #ifdef H5
				he=350
				// #endif
				return uni.upx2px(he) + 'px';
			},
			halfWidth2:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				// #ifdef MP
				he=0
				// #endif
				// #ifdef APP-PLUS
				he=heigh*2
				// #endif
				// #ifdef H5
				// he=heigh*2+44
				he=0
				// #endif
				return uni.upx2px(he) + 'px';
			}
		},
		onReachBottom:function(){
			var me=this
			if(this.topStatus==0){
				if (this.loadingType0 != 0) {
					return;
				}
				this.loadingType0 = 1;
				var data={
					module: 'app',
					action: 'sign',
					app: 'load_integral',
					access_id:me.access_id,
					type:'',
					page: this.page0,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						console.log(res)
						let {data: {list}} = res
						console.log(list)
						me.page0 += 1
						if(list.length > 0) {
							me.list1 = me.list1.concat(list);
							me.loadingType0=0;
						} else {
							me.loadingType0 =2;
						}
					},
					error:(err)=>{
						console.log(err)
					}
				})
			}else if(this.topStatus==1){
				if (this.loadingType1 != 0) {
					return;
				}
				this.loadingType1 = 1;
				var data={
					module: 'app',
					action: 'sign',
					app: 'load_integral',
					access_id:me.access_id,
					type:1,
					page: this.page1,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						console.log(res)
						let {data: {list}} = res
						console.log(list)
						me.page0 += 1
						if(list.length > 0) {
							me.list2 = me.list2.concat(list);
							me.loadingType1=0;
						} else {
							me.loadingType1 =2;
						}
					},
					error:(err)=>{
						console.log(err)
					}
				})
			}else if(this.topStatus==2){
				if (this.loadingType2 != 0) {
					return;
				}
				this.loadingType2 = 1;
				var data={
					module: 'app',
					action: 'sign',
					app: 'load_integral',
					access_id:me.access_id,
					type:2,
					page: this.page2,
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						console.log(res)
						let {data: {list}} = res
						console.log(list)
						me.page0 += 1
						if(list.length > 0) {
							me.list3 = me.list3.concat(list);
							me.loadingType2=0;
						} else {
							me.loadingType2=2;
						}
					},
					error:(err)=>{
						console.log(err)
					}
				})
			}
			
		},
		components: {
			heads,
			uniLoadMore,
			ruleModal
		},
	}
</script>

<style lang="less" scoped>
	@import url("../../static/css/my/myScore.less");
</style>
