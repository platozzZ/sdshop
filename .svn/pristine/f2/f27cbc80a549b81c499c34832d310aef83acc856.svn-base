<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:31:40
 * @LastEditTime: 2019-09-06 10:12:41
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		
		<toload :load="load">
			
			<div class="m_top">
				<div class="top_text" style="flex:1.6;">共有<text class="red">{{total}}</text>条信息，有<text class="red">{{noread}}</text>条未读</div>
				<div v-if="noread>0" class="top_read" style="flex:1;" @tap="readAll"><img class="top_readimg" :src="read">一键已读</div>
				<div v-else class="top_read" style="flex:1;color: #c2c2c2;"><img class="top_readimg" :src="readed">一键已读</div>
				<div class="top_read top_ed" style="flex:0.4;" v-if="opeshow" @click="onEdit">编辑</div>
				<div class="top_read top_ed" style="flex:0.4;" v-else @click="onYes">完成</div>
			</div>
			
			<ul v-if="total>0" style="background-color: #f6f6f6;padding-top: 90upx">
				<li v-for="(item,index) in list" @tap.prevent='_detailedMasege(item.id,index)' :key="index">
					<!-- 时间 -->
					<span class="time">{{item.time}}</span>
					
					<div class="lk-crad">
						
						<div class="lk-label" v-if="!opeshow">
							<image v-if="item.show" @tap.stop="setSelected(index)" class="lk-label-image" :src="selectimg"></image>
							<div v-if="!item.show" @tap.stop="setSelected(index)" class="lk-label-divs"></div>
						</div>
						
						<!-- 主体 -->
						<div class="content">
							<span class="title">系统消息</span>
							<img v-if='item.type==1' :src="newimg" class="new">
							<div class="con">{{item.content}}</div>
							<!-- <wxParse :content="item.content" class="con"></wxParse> -->
							<div class="border"></div>
							<div class='syatem-bottom'>
								<span>查看详情 </span>
								<img :src="jiantou" >
							</div>
						</div>
					
					</div>
				</li>
				<div v-if="!opeshow" style="height: 98upx;"></div>
			</ul>
			<div class='noFindDiv' v-else>
				<div>
					<img :src='noCol' class='noFindImg' />
				</div>
				<span class='noFindText'>您还没有收到消息哦！</span>
			</div>
			
			<div class="messagetail" v-if="!opeshow">
				<div class="lk-label chec" @click="AllSetSelected">
					
					<div v-if="selectall" class="lk-label-div"></div>
					<image v-if="!selectall" class="lk-label-img" :src="selectimg"></image>
					<span class="lk-label-span">全选</span>
					
				</div>
				<div class="btn" @tap="del">
					删除
				</div>
			</div>
		</toload>

	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import { mapMutations } from 'vuex'
	import { getStorage } from '../../common/storage.js'
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue' 
	import toload from '@/components/toload.vue'
	
	export default {
		data(){
			return{
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				readed:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/readed.png",
				noCol: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/nomeaasge.png",
				newimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/new.png',
				read:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/read.png',
				selectimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/action.png',// 选中图标
				access_id:'',
				title:'消息',
				list:[],
				total:"",
				noread:"",
				page:1,
				load: false,
				loadingType:0,
				opeshow:true, // 12-13 编辑true 完成!false 隐藏显示控制
				selectall:true,// 全选控制
				isChick:true
			}
		},
		onReachBottom() {
			var me = this
			if (me.loadingType != 0) {
				return;
			}
			me.loadingType = 1;
			var data = {
				module: "app",
				action: "message",
				app:'more',
				access_id: me.access_id,
				page:me.page
			}
			if(me.list.length > 0) {
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						let data = res.data.message
						console.log(res)
						me.page += 1
						if(res.data.code == 200) {
							if(data.length > 0){
								
								for(let t of data){
									t.show = false
								}
								
								me.list.push(...data)
								me.loadingType=0;
							}else{
								me.loadingType=3;
							}
						} else {
							me.loadingType =2;
						}
					},
					error:(err)=>{
						console.log(err)
					}
				})
			}
		},
		onLoad() {
			// var me = this;
			// let p = new Promise((resolve, reject)=>{
			// 	me.LaiKeTuiCommon.getLKTApiUrl().then(function(){
			// 		resolve(1231)
			// 	});
			// });
			// p.then(()=>{
			// 	me.$nextTick(function(){
			// 		setTimeout(function(){
			// 			me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
			// 				me.wallets()
			// 			});
			// 		},50);
			// 	});
			// })
		},
		mounted() {
			this.loadingType = 0;
			this.page = 1;
			// this.$refs.lktAuthorizeComp.handleAfterAuth(this,'../login/login?landing_code=1',() => {
			// 	this.wallets()
			// });
			
			var me = this;
			let p = new Promise((resolve, reject)=>{
				me.LaiKeTuiCommon.getLKTApiUrl().then(function(){
					resolve(1231)
				});
			});
			p.then(()=>{
				me.$nextTick(function(){
					setTimeout(function(){
						me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../login/login?landing_code=1',function(){
							me.wallets()
						});
					},50);
				});
			})
		},
		components:{
			Heads,
			wxParse,
			toload
		},
		methods:{
			...mapMutations({
				status:'data_height'
			}),
			changeLoginStatus(){
				this.wallets();
			},
			/*
			* @func 全部选中
			* @docs
			* 2019-7-31 17:53:28
			* */
			AllSetSelected(){
				for(let t of this.list){
					t.show = this.selectall
				}
				this.selectall = !this.selectall
			},
			/*
			 * @func 选中
			 * @param { Number } i 当前选中下标 
			 * @docs 
			 * 2019-7-31 16:53:33
			 * */
			setSelected(i){
				this.list[i].show = !this.list[i].show
			},
			/*
			* @func 完成事件
			* @return { undefined }
			* @docs 删除完成作用返回
			* 2019-7-31 14:35:15
			* */
			onYes(){
				// TODO:
				this.isChick = true
				this.opeshow = !this.opeshow
			},
			/*
			*	@func 编辑事件
			* @return { undefined }
			* @docs 用于切换编辑状态
			* 2019-7-30 17:47:36 
			* */
			onEdit(){
				// TODO:待处理
				this.isChick = false
				this.opeshow = !this.opeshow
			},
			/**
			 * 删除选中订单
			 * @return { undefined }
			 * */
			del(){
				let { list } = this
				let ids = ''
				let i = 0
				for(let item of list){
					if(item.show){
						ids += item.id + ','
						i++
					}
				}
				
				if(i <= 0){
					uni.showToast({
						title:"请选择需要删除的消息！",
						icon:'none',
						duration:1500
					})
					return;
				}

				if(ids){
					let data = {
						access_id:this.access_id,
						module:'app',
						action:'message',
						app:'del',
						id:ids
					}
					uni.request({
						url: uni.getStorageSync("url"),
						data,
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {
							if(res.data.code==200){
								uni.showToast({
									title:`成功删除${i}条信息`,
									icon:'none',
									duration:1500
								})
								this.selectall = true
								this.wallets()
							}
						},error:function(err){
							console.log(err)
						}
					})
				}
			},
			/**
			 * 获取订单数据
			 * 
			 * */
			wallets(){
				let data={
					access_id:this.access_id,
					module:'app',
					action:'message',
					app:'index',
					store_type:2,
				}
				
				// #ifdef MP
				data.store_type = 1;
				// #endif

				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success: (res) => {
						console.log('消息首页res')
						console.log(res)
						if(res.data.code==200){
							this.load = true
							// 添加判断
							this.list = []
							for(let t of res.data.message){
								t.show = false
							}
							
							this.list.push(...res.data.message)
							this.noread = res.data.noread
							this.total = res.data.total
						}
						else if(res.data.code==404){
							uni.showToast({
								title:'未登录，请先登录!',
								icon:'none',
								duration:1500
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'../login/login?landing_code=1',
								})
							},1500)
						}
						else if(res.data.code==115){
							uni.showToast({
								title:'账号登录超时,请重新登录！',
								icon:'none',
								duration:1500
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'../login/login?landing_code=1',
								})
							},1500)
						}
						else{
							uni.showToast({
								title:'获取失败，请重试',
								duration:1500,
								icon:'none'
							})
						}
					},error:function(err){
						console.log(err)
					},
				})
			},
			_detailedMasege:function(index,i){
				
				if(this.isChick){
					uni.navigateTo({
						url: 'detailedMesage?id='+index
					})
					return
				}
				this.setSelected(i)
				
			},
			/**
			* 消息全部已读
			* 2019-8-2 11:07:13
			**/
			readAll:function(){
				if(this.list){
					// 判断是否有未选中
					let ult = this.list.filter(res => res.type === '1' )
					if(!ult.length) {
						uni.showToast({
							title:'暂无未读消息',
							duration:3000,
							icon:'none'
						})
						return
					}
					
					var data = {
						access_id:this.access_id,
						module:'app',
						action:'message',
						app:'all'
					}

					uni.request({
						url: uni.getStorageSync("url"),
						data,
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success: (res) => {

							if(res.data.code==200){
								this.wallets()
							}
							
						},error:function(err){
							console.log(err)
						}
					})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	// @import url("../../static/css/message/systemMesage.css");
	@import url("../../static/css/message/systemMesage.less");
</style>