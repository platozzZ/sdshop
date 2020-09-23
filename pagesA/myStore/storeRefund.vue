<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>
		<div class='relative' :style="{marginTop:halfWidth}">
			<div class='container_data'>
				<div class='proListUp pd_30'>
					<div class='proListUpLeft'>
						<img :src="pro.imgurl">
					</div>
					<div class='proListUpRight'>
						<div class='proTitle'>{{pro.p_name}}</div>
						<div class='proPro'>{{pro.size}}</div>
					</div>
					<div class='proSellData'>
						<div class='sellMoney'>￥{{pro.p_price}}</div>
					</div>
				</div>
				<div class='hr'></div>
				<div class='formList pd_30'>
					<div class='leftDiv'>退货类型</div>
					<div v-if='pro.re_type==1' class='RightDiv'>退货退款</div>
					<div  v-if='pro.re_type==2' class='RightDiv'>退款</div>
					<div  v-if='pro.re_type==3' class='RightDiv'>换货</div>
				</div>
				<div class='formList pd_30'>
					<div class='leftDiv'>退款金额</div> 
					<div class='RightDiv'>￥{{pro.re_apply_money}}</div>
				</div>
				<div class='formList pd_30'>
					<div class='leftDiv'>退货原因</div>
					<div class='RightDiv'>{{pro.content}}</div>
				</div>
				<div class='formList pd_30 miaoshu'>
					<div class='leftDiv'>描述图片</div>
					<div class='RightDiv'>
						<img :src="item" @tap='seeImg(index)' v-for='(item,index) in returnImg' :key='index'>
					</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display1">
			<div class='mask_cont'>
				<p>确定要通过该用户的申请并让用户寄回？</p>
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(1)">取消</div>
					<div @tap="_confirm(1)">确认</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display2">
			<div class='mask_cont'>
				<p class='p1'>请填写拒绝理由</p>
				<input type="text"  v-model="reason" placeholder="请输入拒绝理由"  :placeholder-style="placeStyle" />
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(2)">取消</div>
					<div @tap="_confirm(2)">确认</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display3">
			<div class='mask_cont'>
				<p class='p1'>请填写退款金额</p>
				<input type="digit"  v-model="refundM" @input='_checkMoney($event)'  placeholder="请输入退款金额"  :placeholder-style="placeStyle" />
				<div class='div1'>
					<img :src="warnIng" class='img'>
					<span class='span'>应退￥{{refundNum}}，确认后款项将原路返回</span>
				</div>
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(3)">取消</div>
					<div @tap="_confirm(3)">确认</div>
				</div>
			</div>
		</div>
		<div class='refundBtn'>
			<div class='no' @tap='_no(pro.r_type)'>拒绝</div>
			<div class='yes' @tap='_yes(pro.re_type,pro.r_type)'>通过</div>
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'

	export default {
		data() {
			return {
				returnImg:'',
				pro:'',
				title: '退货审核',
				access_id:'',
				testImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yhqBg.png',
				warnIng:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/warnIng.png',
				mask_display1:false,
				mask_display2:false,
				mask_display3:false,
				reason:'',
				refundM:'',
				order_details_id:'',
				sNo:'',
				r_type:'',
				re_type:'',
				refundNum:'',
				placeStyle:'color:#b8b8b8;font-size:28upx'
			}
		},
		onLoad(option){
			let me = this ;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me.shop_id= uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):me.$store.state.shop_id
					me.order_details_id=option.order_details_id;
					me.sNo=option.sNo;
					me._axios();
				});
			});
		},
		methods: {
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			_checkMoney(e){
				if(Number(e.target.value)>this.refundNum){
					uni.showToast({
						title:'已超过最大可退还金额',
						duration:1500,
						icon:'none'
					})
					this.refundM=this.refundNum
				}
			},
			seeImg(index){
				var me=this
				uni.previewImage({
					current:'0',
					urls: me.returnImg
				});
			},
			_axios(){
				var me=this
				uni.request({
					url: uni.getStorageSync("url"),
					data:{
						access_id:me.access_id,
						shop_id:me.shop_id,
						sNo:me.sNo,
						order_details_id:me.order_details_id,
						module:'app',
						action:'mch',
						m:'return_page',
					},
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							me.pro=res.data.list[0]
							me.returnImg=res.data.imgs
							me.r_type=res.data.list[0].r_type
							me.re_type=res.data.list[0].re_type
						}else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},
					error:function(err){
						
					}
				})
			},
			_yes(re_type){
				console.log(re_type)
				if(re_type==1){
					this.mask_display1=true
				}else if(re_type==2){
					this.mask_display3=true
					var me=this
					uni.request({
						data:{
							shop_id:me.shop_id,
							sNo:me.sNo,
							order_details_id:me.order_details_id,
							module:'app',
							action:'mch',
							m:'return_amount',
							access_id:me.access_id,
						},
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							if(res.data.code==200){
								me.refundNum=res.data.price
							}else{
								uni.showToast({
									title:res.data.message,
									duration:1500,
									icon:'none'
								})
							}
						}
					})
				}else if(re_type==3){
					this.mask_display1=true
				}
			},
			_no(){
				this.mask_display2=true
			},
			_confirm(type){
				var me=this
				var data={
					shop_id:me.shop_id,
					sNo:me.sNo,
					order_details_id:me.order_details_id,
					module:'app',
					action:'mch',
					m:'examine',
					access_id:me.access_id,
				}
				if(type==1){
					this.mask_display1=false
					data.r_type=1
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							if(res.data.code==200){
								uni.showToast({
									title:'操作成功',
									duration:1500,
									icon:'none'
								})
								setTimeout(function(){
									uni.navigateBack({
										delta:1
									})
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
				}else if(type==2){
					this.mask_display2=false
					var me=this
					data.text=me.reason
					if(me.re_type==1){
						data.r_type=2
					}else if(me.re_type==2){
						data.r_type=8
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
								uni.showToast({
									title:'拒绝成功',
									duration:1500,
									icon:'none'
								})
								setTimeout(function(){
									uni.navigateBack({
										delta:1
									})
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
				}else if(type==3){
					this.mask_display3=false
					data.price=this.refundM
					data.r_type=9
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							if(res.data.code==200){
								uni.showToast({
									title:'退款成功',
									duration:1500,
									icon:'none'
								})
								setTimeout(function(){
									uni.navigateBack({
										delta:1
									})
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
			},
			_cancel(type){
				if(type==1){
					this.mask_display1=false
				}else if(type==2){
					this.mask_display2=false
				}else if(type==3){
					this.mask_display3=false
				}
			}
					
		},
		computed: {
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			}
		},
		components: {
			heads
		},
	}
</script>

<style>
	@import url("../../static/css/myStore/storeRefund.css");
</style>
