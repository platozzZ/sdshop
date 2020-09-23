<template>
	<div class="body">
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadGif" />
				<p>加载中…</p>
			</div>
		</div>
		<div  v-if='!load' class='sign_head'>
			<div class="sign_one">
				<div class="sign_left" @tap="toScore">
					<img class='img' :src='imgurl'>
					<span>当前积分：</span>
					<span class='span'>{{score?score:0}}</span>
				</div>
				<div class="sign_right" @tap="_complete_report">
					<img class='img' :src="sign_rule">
					签到规则
				</div>
			</div>
			<div class='relative'>
				<div :class="sign_status==0?'lose':'active'" id="signBtn" @tap="_sign">{{sign_status==0?lose:active}}</div>
				<div v-if='sign_status!=0' class='signTextDown'></div>
			</div>
			<p>已连续签到{{num?num:0}}天，累计签到{{sign_num.length}}天</p>
		</div>
		<div  v-if='!load' class='signDayDiv'>
			<div class='signDay' >
				<div class='sign7Div' v-for="(index,item) in sign7" :key='item'>
					<div :class='num+1>index?"signDayBC1":"signDayBC2"'>
						<div :class='num+1>index?"signDayText1":"signDayText2"' :style='{"marginBottom":signTextTop}'>{{index}}</div>
						<img v-if="index!=7" :src="num+1>index?sign_right:sign_core"  :class='num+1>index?"signDayImg1":"signDayImg2"'>
						<img v-else  :src="sign_gift" :class='num+1>index?"signDayImg1":"signDayImg2"' >
					</div>
					<div class='signDownText'>{{index}}天</div>
				</div>
			</div>
		</div>
		<div  v-if='!load' class="calendar">
			<!--  日历头部     -->
			<div class="date">
				<span style="margin: 0 40upx;">{{ time.year }}-{{ time.month>9?time.month:'0'+ time.month}}</span>
			</div>

			<div class="month">
				<!--  周几     -->
				<div class="week">
					<div>日</div>
					<div>一</div>
					<div>二</div>
					<div>三</div>
					<div>四</div>
					<div>五</div>
					<div>六</div>
				</div>
				<!--   每月对应的日期    -->
				<ul>
					<li v-for="is in dat1" :key='is.id'></li>
					<li v-for="(i,index) in dat2" :key="index" >
						<div :class="time.day==index+1?'today':''" >
							<span>
								<i v-if='time.day==index+1' class='w_100' :class="signData[index]?'sign_in':''">今</i>
								<i v-else class='w_100' :class="signData[index]?'sign_in':''">{{ index+1 }}</i>
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class='complete' v-if='showFliter'>
			<div class='complete_tishi'>
				<img :src="guanbi"  class='closeBtn' @tap="_close"/>
				<img class='sign_suc' :src="sign_suc"/>
				<p class='complete_text'>签到成功!</p>
				<p>已获得<span class='color_ff3'>{{sign_score}}</span>积分,已连续签到<span class='color_ff3'>{{num}}</span>天</p>
			</div>
		</div>
		<div class='mask' v-if='complete_report'>
			<div class='maskContent'>
				<div class='maskContentTitle'>签到规则</div>
				<view class='richBox'>
					<rich-text class="richtext font_14" :nodes="details"></rich-text>
				</view>
				<!-- <wxParse :content='details'></wxParse> -->
				<div class='closeBtnDiv'>
					<button class="closeDiv" type="button" @tap="_oncomplete_report">我知道了</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Heads from '../../components/header.vue'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse'
	import { getStorage } from '../../common/storage.js'
	import htmlParser from '../../common/html-parser.js'
	export default {
		data() {
			return {
				details:'',
				title:'每日签到',
				sign7:[1,2,3,4,5,6,7],
				signData:[],
				sign_right:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/sign_right.png',
				sign_rule:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/sign_rule.png',
				sign_suc:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/sign_suc.png',
				sign_core:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/sign_core.png',
				sign_gift:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/sign_gift.png',
				back2x:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon1/back2x.png",
				bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/bback.png',
				flag:true,
				guanbi:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				chengg: uni.getStorageSync("endurl") + 'images/icon/qiandaochengg2x.png',
				report_t:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/qiandao2x.png',
				report_f:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yiqiandao.png',
				loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				dat: new Date(),
				dat1:'',
				dat2:'',
				time: {
					year: '',
					month: '',
					day: ''
				},
				load:true,
				data_day:'',
				daySign:'',//时候签到
				num: '',//连续签到天数
				showFliter: false, //签到显示界面
				sign_score: '', //签到积分
				score: '', //当前积分
				sign_status: '', //判断当天是否签到
				access_id:'',
				showSign: [],
				sign_num:'',
				complete_report:false,
				active:'点击签到',
				lose:'今日已签',
				ss:1,
				sign_status1:true,
				signFinish:true,
				imgurl:'',
				returnR:'',
			}
		},
		onLoad(option) {
			var me=this
			this.time.year = this.dat.getFullYear();
			this.time.month = this.dat.getMonth() + 1;
			this.time.day = this.dat.getDate();
			this.dat1=new Date(2019,me.time.month-1,1).getDay()
			this.dat2=new Date(2019,me.time.month,0).getDate()
		},
		onShow() {
			this.signFinish = true
			
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
			this._axios();
		},
		computed:{
			today:function(index){
				return this.timeDay==index+1&&this.timeMonth==this.datMonth + 1
			},
			timeDay:function(index){
				return this.time.day==index+1
			},
			timeMonth:function(){
				return this.time.month
			},
			datMonth:function(){
				return this.dat.getMonth()
			},
			signTextTop:function(){
				// #ifndef MP-WEIXIN
					return uni.upx2px(0) + 'px';
				// #endif
			},
		},
		methods: {
			/* 
			 跳转至我的积分
			 */
			toScore(){
				const pages = getCurrentPages()
				if(pages.length==2&&pages[0].route=="pages/tabBar/home" || (pages.length==3&&pages[0].route=="pages/tabBar/home"&&pages[1].route=="pages/tabBar/home")){
					uni.navigateTo({
						url: '/pages/my/myScore'
					})
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
			},
			changeLoginStatus(){
				var me = this;
				me.access_id = me.$store.state.access_id;
				me._axios();
			},
			in_array (stringToSearch, arrayToSearch) {
				 for (let s = 0; s < arrayToSearch.length; s++) {
				  let thisEntry = arrayToSearch[s].toString();
				  if (thisEntry == stringToSearch) {
				   return true;
				  }
				 }
				 return false;
			},
			_back(){
				this.flag=false
				uni.navigateBack({
						delta: 1
				});
			},
			_complete_report(){
				this.complete_report = true
			},
			_oncomplete_report(){
				this.complete_report = false
			},
			_sign() {
				let me = this;
				console.log("===>"+this.signFinish);
				if(this.sign_status == 0){
					return
				}
				
				if(!this.signFinish){
					return
				}
				
				this.signFinish=false
				// me.LaiKeTuiCommon.lktDelaySetVal(me);
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					if(me.sign_status == 1) {
						var data = {
							module: 'app',
							action: 'sign',
							app: 'index',
							access_id:me.access_id
						}
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success: (res) => {
								let {data:{score,sign_score,num}} = res
								if(res.data.code==200){
									me.showFliter = true
									me.sign_score = sign_score
									me.num = num
								}else if(res.data.code==404){
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
									setTimeout(function(){
										uni.navigateTo({
											url:'../../pages/login/login?landing_code=1',
										})
									},1500)
								}
								else{
									me.signFinish = true;
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
								console.log(res)
							},
							error:function(err){
								me.signFinish = true;
								console.log(err)
							},
						})
					}
				});
			},
			_close() {
				this.showFliter = false;
				this._axios()
			},
			_axios() {
				this.signData=[]
				console.log(this.access_id)
				var me = this;
				var data = {
					module: 'app',
					action: 'sign',
					app: 'sign',
					year: this.time.year,
					month: this.time.month,
					access_id: this.access_id
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						if(res.data.code==200){
							setTimeout(function(){
								me.load=false
							},200)
							console.log(res)
							let {data:{score,sign_status,num,sign_time,imgurl,details}} = res
							// me.num = num
							me.sign_status = sign_status
							if(sign_status==0){
								me.sign_status1=false
							}
							me.score = score
							me.num=num
							me.sign_num = sign_time
							me.imgurl=imgurl
							me.details=htmlParser(details)
							let data_day=[]
							var data_t = new Date(2019,me.time.month,0).getDate()
							if(sign_time.length>0){
								console.log(sign_time)
								for(var i=0;i<data_t;i++){
									var data_f = `2019-${me.dat.getMonth() + 1}-${i+1}`
									data_day.push(data_f)
									for(var f=0;f<sign_time.length;f++){
										if(data_f==sign_time[f]){
											// me.$set(me.showSign,i,sign_time[f])
											me.showSign.push(sign_time[f])
										}
										else{
											// me.showSign.push('')
										}
									}
								}
								me.data_day=data_day
							}
							else{
								for(var i=0;i<data_t;i++){
									var data_f = `2019-${me.dat.getMonth() + 1}-${i+1}`
									data_day.push(data_f)
								}
								me.showSign = []
								me.data_day=data_day
							}
							for(var i=0;i<data_t;i++){
								if(me.in_array(me.data_day[i],me.showSign)){
									me.signData.push(true)
								}
								else{
									me.signData.push(false)
								}
							}
							
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						
						console.log(me.signData)
					},
					error:function(err){
						console.log(err)
					}
				})
			}
		},
		components: {
			Heads,
			wxParse,
		}
	}
</script>

<style scoped lang="less">
	@import url("../../static/css/shop/sign.less");
</style>