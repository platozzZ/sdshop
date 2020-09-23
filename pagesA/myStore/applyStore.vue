<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<div class='relative'>
			<div class='contentBox'>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>店铺名称</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="text" v-model="storeName" maxlength='14' :placeholder="storeNamePH" @focus="_changePH1('storeName')" @blur="_changePH('storeName')" />
						</div>
					</div>
					<div v-if='warnTextStatus' class='warningText'><img :src="warnImg" class='warnImg'>该店铺名已经存在，请重新填写</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>店铺信息</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="text" v-model="storeTitle" maxlength="50" :placeholder="storeTitlePH" @focus="_changePH1('storeTitle')" @blur="_changePH('storeTitle')" />
						</div>
					</div>
				</div>
				<div class='formDiv border_0'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>经营范围</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="text" v-model="sellRange" maxlength="50" :placeholder="sellRangePH" @focus="_changePH1('sellRange')" @blur="_changePH('sellRange')" />
						</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>
			<div class='contentBox'>
				<div class='formDiv'> 
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>用户姓名</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="text" :placeholder="userNamePH" @focus="_changePH1('userName')" @blur="_changePH('userName')" v-model="userName" />
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>身份证号</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="idcard"  maxlength='18' :placeholder="userIDPH" @focus="_changePH1('userID')" @blur="_changePH('userID')" v-model="userID" />
						</div>
					</div>
				</div>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>联系电话</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="number" :placeholder="userPhonePH" @focus="_changePH1('userPhone')" @blur="_changePH('userPhone')" v-model="userPhone" />
						</div>
					</div>
				</div>
				<div class='formDiv border_0'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='must'>*</span><span class='font_28'>联系地址</span>
						</div>
						<div class='rightInput1'>
							<input :placeholder-style="placeStyle" type="text" :placeholder="userAddPH" @focus="_changePH1('userAdd')" @blur="_changePH('userAdd')" v-model="userAdd" />
						</div>
					</div>
				</div>
			</div>
			<div class='hr'></div>
			<div class='contentBox'>
				<div class='formDiv'>
					<div class='formList'>
						<div class='leftText1'>
							<span class='font_28'>所属性质</span>
						</div>
						<div class='rightInput1'>
							<view class="ri_outer" @tap="_changeType(1)">
								<img class='quan_img' :src="storeType==1 ? quan_hei:quan_hui"/>
								<span>个人</span>
							</view>
							<view class="ri_outer" @tap="_changeType(2)">
								<img class='quan_img' :src="storeType==2 ? quan_hei:quan_hui"/>
								<span>企业</span>
							</view>
						</div>
					</div>
				</div>
				<div class='formDiv border_0'>
					<div class='formList'>
						<div class='leftText1 permit'>
							<span class='font_28'>营业执照</span>
						</div>
						<div class='rightInput1 permitDiv'>
							<div class='upLoadPic' @tap='upLoadImg()'>
								<!-- 当上传了图片 -->
								<img v-if='upImg' :src="delImg" class='closeImg' @tap.stop='_delImg()'>
								<!-- 没有上传图片 -->
								<div v-if='!upImg' class='tc'>
									<img class='img' :src="addImg" alt="">
									<div class='text'>上传营业执照</div>
								</div>
								<img class='img1' v-else :src='upImg'/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class='submitBtn' @tap='_submit()'>
						提交申请
					</div>
					<div class='protocol'>
						<div @tap="_agreement()">
							<!-- #ifndef MP-ALIPAY -->
							<img :src="agreement?agreement_t:agreement_f" style='width:26upx;height:26upx;margin-right: 10upx;' />
							<!-- #endif -->
							<!-- #ifdef MP-ALIPAY -->
							<img v-if="agreement" :src="agreement_t" style='width:26upx;height:26upx;margin-right: 10upx;' />
							<img v-if="!agreement" :src="agreement_f" style='width:26upx;height:26upx;margin-right: 10upx;'/>
							<!-- #endif -->
							我已阅读并了解
						</div>
						<div @tap="_lookXY()">《申请入驻协议》</div>
					</div>
				</div>	
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
				upImg1:'',
				goOn:false,
				licence:'',
				storeType:1,
				warnTextStatus:false,
				upImg:'',
				access_id:'',
				title:'申请开店',
				fastTap:true,
				storeName:'',
				storeNamePH:'请填写店铺名称', 
				storeNamePH1:'请填写店铺名称',
				storeTitle:'',
				storeTitlePH:'请填写店铺简介信息（50字以内）',
				storeTitlePH1:'请填写店铺简介信息（50字以内）',
				userName:'',
				userNamePH:'请填写真实姓名',
				userNamePH1:'请填写真实姓名',
				userID:'',
				userIDPH:'请填写身份证号',
				userIDPH1:'请填写身份证号',
				userPhone:'',
				userPhonePH:'请填写联系电话',
				userPhonePH1:'请填写联系电话',
				userAdd:'',
				userAddPH:'请填写联系地址',
				userAddPH1:'请填写联系地址',
				sellRange:'',
				sellRangePH:'请填写店铺经营范围',
				sellRangePH1:'请填写店铺经营范围',
				agreement:false,
				warnImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/warnIng.png',
				addImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/tianjiadizhi2x.png',
				agreement_t: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/landing_gou2x.png',
				agreement_f: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/landing_wei2x.png',
				delImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/delete2x.png',
				storeNameStatus:false,
				storeTitleStatus:false,
				userNameStatus:false,
				userIDStatus:false,
				userPhoneStatus:false,
				userAddStatus:false,
				compStatus:false,
				sellRangeStatus:false,
				quan_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehui2x.png',
				quan_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/xuanzehei2x.png',
				placeStyle: 'color:#b8b8b8;font-size:28upx;'
			}
		},
		onLoad(option) {
			this.goOn=option.goOn
		},
		mounted(){
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id;
					me.shop_id = uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):me.$store.state.shop_id;
					
					if(me.goOn){
						uni.request({
							data:{
								module:'app',
								action:'mch',
								m:'continue_apply',
								access_id:me.access_id,
								shop_id:me.shop_id
							},
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success: (res) => {
								var data=res.data.list
								me.storeName=data.name
								me.storeTitle=data.shop_information
								me.sellRange=data.shop_range
								me.userName=data.realname
								me.userID=data.ID_number
								me.userPhone=data.tel
								me.userAdd=data.address
								me.storeType=data.shop_nature
								me.agreement=true
								me.upImg=data.business_license
								me.upImg1=data.business_license
								me.storeNameStatus=true
								me.storeTitleStatus=true
								me.userNameStatus=true
								me.userIDStatus=true
								me.userPhoneStatus=true
								me.userAddStatus=true
							}
						})
					}
				});
			});			
		},
		components: {
			heads,
		},
		methods: {
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
			},
			_delImg(){
				this.upImg=''
			},
			// 上传图片
			upLoadImg(){
				var me=this
				if(!this.fastTap){
					return
				}
				this.fastTap=false
				if(this.upImg){
					me.fastTap=true
					uni.previewImage({
						urls: me.upImg,
						success:function(){
							
						}
					});
				}else{
					me.fastTap=true
					uni.chooseImage({
						count:1,
						success:function(res){
							me.upImg=res.tempFilePaths[0];
						},
						error:function(){
							
						}
					})
				}
				
			},
			_submit(){
				var me=this
				if(!this.fastTap){
					return;
				}
				
				this.fastTap = false;
				let flag = this.storeNameStatus&&this.storeTitleStatus&&this.userNameStatus&&this.userIDStatus&&this.userPhoneStatus&&
				this.userAddStatus&&this.agreement&&this.sellRange;
				
				console.log(11111)
				if(flag){
					console.log(this.upImg)
					console.log(this.upImg1)
					if(this.upImg&&this.upImg!=this.upImg1){
						console.log(22222)
						uni.uploadFile({
							url: uni.getStorageSync("url"),
							filePath:me.upImg,
							// #ifdef MP-ALIPAY || MP-BAIDU
							header: {
							    'Content-Type': 'application/x-www-form-urlencoded',
							},
							fileType: 'image',
							// #endif
							name: 'file',
							formData:{
								module:'app',
								action:'mch',
								m:'apply',
								access_id:me.access_id,
								name:me.storeName,
								shop_information:me.storeTitle,
								shop_range:me.sellRange,
								realname:me.userName,
								ID_number:me.userID,
								tel:me.userPhone,
								address:me.userAdd,
								shop_nature:me.storeType,
							},
							success:function(res){
								var res1=JSON.parse(res.data)
								me.fastTap=true
								if(res1.code==200){
									uni.redirectTo({
										url:'../myStore/applySuc'
									})
								}else{
									me.fastTap=true
									uni.showToast({
										title:res1.message,
										duration:1500,
										icon:'none'
									})
								}
								
							},
							error:function(){
								me.fastTap=true
							}
						})
					}else {
						console.log(3333)
						uni.request({
							url: uni.getStorageSync("url"),
							data:{
								module:'app',
								action:'mch',
								m:'apply',
								access_id:me.access_id,
								name:me.storeName,
								shop_information:me.storeTitle,
								shop_range:me.sellRange,
								realname:me.userName,
								ID_number:me.userID,
								tel:me.userPhone,
								address:me.userAdd,
								shop_nature:me.storeType,
							},
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success: (res) => {
								me.fastTap=true
								if(res.data.code==200){
									uni.redirectTo({
										url:'../myStore/applySuc'
									})
								}else{
									me.fastTap=true
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
								}
							},
							error:function(){
								me.fastTap=true
							}
							
						})
					}
					// else{
					// 	console.log(444)
					// }
				}
				else if(!this.agreement){
					this.fastTap=true
					uni.showToast({
						title:'请勾选我已阅读协议',
						icon:'none'
					})
				}
				else{
					this.fastTap=true
					var res = '';
					if(!this.storeNameStatus){
						res = '店铺名称不能为空'
					}else if(!this.storeTitleStatus){
						res = '店铺信息不能为空'
					}else if(!this.userNameStatus){
						res = '用户姓名不能为空'
					}else if(!this.userIDStatus){
						res = '身份证号不能为空'
					}else if(!this.userPhoneStatus){
						res = '联系电话不能为空'
					}else if(!this.userAddStatus){
						res = '联系地址不能为空'
					}else if(!this.agreement){
						res = '协议未勾选'
					}else if(!this.sellRange){
						res = '经营范围不能为空'
					}
					uni.showToast({
						title:res,
						icon:'none',
						duration:1500
					})
				}
			},
			_agreement(){
				this.agreement= !this.agreement;
			},
			_lookXY(){
				uni.navigateTo({
					url:'./applyAgreement'
				});
			},
			_changeType:function(num){
				console.log(num)
				this.storeType=num
			},
			// 离开事件
			_changePH(type) {
				var me=this
				if(type=='storeName'){
					this.storeNamePH=this.storeNamePH1
					if(this.storeName.length==0){
						this.storeNameStatus=false
					}else if(this.storeName.length>0){
						uni.request({
							data:{
								module:'app',
								action:'mch',
								m:'verify_store_name',
								access_id:me.access_id,
								name:me.storeName
							},
							url: uni.getStorageSync("url"),
							header:{
								'content-type':'application/x-www-form-urlencoded'
							},
							method:'POST',
							success:function(res){
								if(res.data.code==200){
									me.storeNameStatus=true
									me.warnTextStatus=false
								}
								else{
									uni.showToast({
										title:res.data.message,
										duration:1500,
										icon:'none'
									})
									me.storeNameStatus=false
									me.warnTextStatus=true
								}
							}
						})
					}
				}else if(type=='storeTitle'){
					this.storeTitlePH=this.storeTitlePH1
					if(this.storeTitle.length==0){
						this.storeTitleStatus=false
					}else if(this.storeTitle.length>0){
						this.storeTitleStatus=true
					}
				}else if(type=='userName'){
					this.userNamePH=this.userNamePH1
					if(this.userName.length==0){
						this.userNameStatus=false
					}else if(this.userName.length>1){
						this.userNameStatus=true
					}
				}else if(type=='userID'){
					this.userIDPH=this.userIDPH1
					if(this.userID.length==0){
						this.userIDStatus=false
					}else if(this.userID.length<18){
						uni.showToast({
							title:'请输入正确的身份证号',
							duration:1500,
							icon:'none'
						})
						this.userIDStatus=false
					}else if(this.userID.length==18){
						this.userIDStatus=true
					}
				}else if(type=='userPhone'){
					this.userPhonePH=this.userPhonePH1
					if(this.userPhone.length==0){
						this.userPhoneStatus=false
					}else if(this.userPhone.length<11){
						uni.showToast({
							title:'请输入正确的联系电话',
							duration:1500,
							icon:'none'
						})
						this.userPhoneStatus=false
					}
					else if(this.userPhone.length==11){
						this.userPhoneStatus=true
					}
				}else if(type=='userAdd'){
					this.userAddPH=this.userAddPH1
					if(this.userAdd.length==0){
						this.userAddStatus=false
					}else if(this.userAdd.length>0){
						this.userAddStatus=true
					}
				}else if(type=='sellRange'){
					this.sellRangePH=this.sellRangePH1
					if(this.sellRange.length==0){
						this.sellRangeStatus=false
					}else if(this.sellRange.length>0){
						this.sellRangeStatus=true
					}
				}
			},
			// 获取焦点
			_changePH1(type){
				if(type=='storeName'){ // 店铺名称
					this.storeNamePH=''
				}else if(type=='storeTitle'){ // 店铺信息
					this.storeTitlePH=''
				}else if(type=='userName'){ // 用户姓名
					this.userNamePH=''
				}else if(type=='userID'){ // 身份证号
					this.userIDPH=''
				}else if(type=='userPhone'){ // 联系电话
					this.userPhonePH=''
				}else if(type=='userAdd'){ // 联系地址
					this.userAddPH=''
				}else if(type=='sellRange'){ // 经营范围
					this.sellRangePH=''
				}
			},
		},
	}
</script>

<style>
	@import url("../../static/css/myStore/applyStore.less");
</style>
