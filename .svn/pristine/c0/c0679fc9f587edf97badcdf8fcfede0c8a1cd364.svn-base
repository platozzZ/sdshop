<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<div class='relative'>
			<div class='pl_30'>
				<div class='formDiv'>
					<div class='formList h_120'>
						<div class='leftText1'>
							<span>头像设置</span>
						</div>
						<div class='rightInput1'>
							<img class='head_img' :src="storeImg" @tap='_changeImg()'>
							<div class='jiantouDiv' @tap='_changeImg()'>
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span>店铺名称</span>
						</div>
						<div class='rightInput1'>
							<div>{{storeName}}</div>
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span>店铺信息</span>
						</div>
						<div class='rightInput1 dianpuDiv' @tap='showEditor(1)'>
							<text class='text' >{{storeTitle}}</text>
							<div class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
				<div class='formDiv border_0'>
					<div class='formList'>
						<div class='leftText1'>
							<span>经营范围</span>
						</div>
						<div class='rightInput1' @tap='showEditor(2)'>
							<span>{{storeRange}}</span>
							<div class='jiantouDiv'>
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>
			<div class='pl_30'>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span>用户姓名</span>
						</div>
						<div class='rightInput1'>
							<div>{{userName}}</div>
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span>身份证号</span>
						</div>
						<div class='rightInput1'>
							<div>{{userID}}</div>
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span>联系电话</span>
						</div>
						<div class='rightInput1' @tap='showEditor(3)'>
							<span>{{userPhone}}</span>
							<div class='jiantouDiv' >
								<img :src="jiantou"  alt="">
							</div>
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span>联系地址</span>
						</div>
						<div class='rightInput1'>
							<div>{{userAdd}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display1">
			<div class='mask_cont'>
				<p>修改店铺简介</p>
				<input type="text" v-model="new_title" maxlength="50"/>
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(1)">取消</div>
					<div @tap="_confirm(1)">确认</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display2">
			<div class='mask_cont'>
				<p>修改经营范围</p>
				<input type="text"  v-model="new_range"/>
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(2)">取消</div>
					<div @tap="_confirm(2)">确认</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display3">
			<div class='mask_cont'>
				<p>修改联系方式</p>
				<input type="text"  v-model="new_phone"/>
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(3)">取消</div>
					<div @tap="_confirm(3)">确认</div>
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
				title: '店铺设置',
				storeImg:'',
				storeName:'',
				storeTitle:'',
				storeRange:'',
				userName:'',
				userID:'',
				userPhone:'',
				userAdd:'',
				new_title:'',
				new_range:'',
				new_phone:'',
				access_id:'',
				shop_id:'',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				textImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yhqBg.png',
				mask_display1:false,
				mask_display2:false,
				mask_display3:false,
			}
		},
		onLoad(option){
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
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
				me._axios();
			},
			plusXing (str,frontLen,endLen) { 
				var len = str.length-frontLen-endLen;
				var xing = '';
				for (var i=0;i<len;i++) {
				xing+='*';
				}
				return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
			},
			_changeImg(){
				var me=this
				uni.chooseImage({
					count:1,
					success:function(res){
						console.log(res)
						uni.uploadFile({
							url: uni.getStorageSync("url"),
							filePath: res.tempFilePaths[0],
							name:'file',
							formData:{
								access_id:me.access_id,
								shop_id:me.shop_id,
								module: 'app',
								m:'set_shop',
								action:'mch',
							},
							success:function(uploadFileRes){
								var data = JSON.parse(uploadFileRes.data)
								console.log(data)
								if(data.code==200){
									uni.showToast({
										title:'修改成功',
										duration:1500,
										icon:'none'
									})
									setTimeout(function(){
										me._axios()
									},1500)
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
				})
			},
			showEditor(type){
				if(type==1){
					this.mask_display1=true
				}else if(type==2){
					this.mask_display2=true
				}else if(type==3){
					this.mask_display3=true
				}
			},
			_confirm(type){
				var me=this
				if(type==1){
					this.mask_display1=false
					if(this.new_title){
						uni.request({
							data:{
								module:'app',
								action:'mch',
								m:'set_shop',
								access_id:me.access_id,
								shop_id:me.shop_id,
								shop_information:me.new_title
							},
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								if(res.data.code==200){
									uni.showToast({
										title:'修改成功',
										duration:1500,
										icon:'none'
									})
									setTimeout(function(){
										me._axios()
									},1500)
								}else{
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
							}
						})
					}else{
						uni.showToast({
							title:'请输入完整的信息',
							duration:1500,
							icon:'none'
						})
					}
				}else if(type==2){
					this.mask_display2=false
					if(this.new_range){
						uni.request({
							data:{
								module:'app',
								action:'mch',
								m:'set_shop',
								access_id:me.access_id,
								shop_id:me.shop_id,
								shop_range:me.new_range
							},
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								if(res.data.code==200){
									uni.showToast({
										title:'修改成功',
										duration:1500,
										icon:'none'
									})
									setTimeout(function(){
										me._axios()
									},1500)
								}else{
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
							}
						})
					}else{
						uni.showToast({
							title:'请输入完整的信息',
							duration:1500,
							icon:'none'
						})
					}
				}else if(type==3){
					this.mask_display3=false
					if(this.new_phone.length==11){
						uni.request({
							data:{
								module:'app',
								action:'mch',
								m:'set_shop',
								access_id:me.access_id,
								shop_id:me.shop_id,
								tel:me.new_phone,
							},
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								if(res.data.code==200){
									uni.showToast({
										title:'修改成功',
										duration:1500,
										icon:'none'
									})
									setTimeout(function(){
										me._axios()
									},1500)
								}else{
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
							}
						})
					}else{
						uni.showToast({
							title:'请输入正确的电话号码',
							duration:1500,
							icon:'none'
						})
					}
				}
			},
			_cancel(type){
				if(type==1){
					this.mask_display1=false
				}else if(type==2){
					this.mask_display2=false
				}else if(type==3){
					this.mask_display3=false
				}
			},
			_axios(){
				var me=this
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						module:'app',
						action:'mch',
						m:'into_set_shop',
						access_id:me.access_id,
						shop_id:me.shop_id
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							var data=res.data.list[0]
							me.storeImg=data.logo
							me.storeName=data.name
							me.storeRange=data.shop_range
							me.storeTitle=data.shop_information
							me.userName=data.realname
							me.userID=data.ID_number.replace(/^(\d{8})\d{6}(\d+)/,"$1******$2")
							me.userPhone=data.tel.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
							me.userAdd=data.address
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
		},
		components: {
			heads
		},
	}
</script>

<style>
	@import url("../../static/css/myStore/storeSetup.css");
</style>
