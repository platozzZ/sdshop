<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title' :returnR="returnR"></heads>
		<div class='relative'>
			<div class='topTabBar'>
				<div class='width_25' @tap='changeTabBar(1)' >
					<div :class='{"active":topTabBar==1}'>
						全部
					</div>
				</div>
				<div class='width_25' @tap='changeTabBar(2)'>
					<div :class='{"active":topTabBar==2}'>
						待付款<span v-if='payment_num!=0' class='color_ff3'>({{payment_num}})</span>
					</div>
				</div>
				<div class='width_25' @tap='changeTabBar(3)' >
					<div :class='{"active":topTabBar==3}'>
						待发货<span v-if='send_num!=0'  class='color_ff3'>({{send_num}})</span>
					</div>
				</div>
				<div class='width_25' @tap='changeTabBar(4)'>
					<div :class='{"active":topTabBar==4}'>
						退货<span v-if='return_num!=0'  class='color_ff3'>({{return_num}})</span>
					</div>
				</div>
			</div>
			<div v-if='list.length>0'>
				<div  v-for='(item,index) in list' :key='index'>
					<div class='date' >{{item.time}}<span v-if='item.time==now'>(今天)</span></div>
					<div class='orderList' v-for='(items,indexs) in item.res' :key='indexs'>
						<div class='orderTitle'>
							<div>订单号：{{items.sNo}}</div>
							<div>
								<span v-if="items.status==0 && items.self_lifting == '0'">待付款</span>
								<span v-else-if="items.status==1 && items.self_lifting == '0'">待发货</span>
								<span v-else-if="items.status==2 && items.self_lifting == '0'">待收货</span>
								<span v-else-if="items.status==2 && items.self_lifting == '1'">待发货</span>
								<span v-else-if='items.status==3'>待评论</span>
								<span v-else-if='items.status==4'>
									<span v-if='items.list[0].r_type==0'>退货审核中</span>
									<span v-else-if='items.list[0].r_type==1 && items.list[0].re_type==3'>同意换货</span>
									<span v-else-if='items.list[0].r_type==1'>同意退货</span>
									<span v-else-if='items.list[0].r_type==2'>拒绝退货</span>
									<span v-else-if='items.list[0].r_type==3'>待商家收货</span>
									<span v-else-if='items.list[0].r_type==4'>同意退款</span>
									<span v-else-if='items.list[0].r_type==5'>拒绝并退回商品</span>
									<span v-else-if='items.list[0].r_type==8'>拒绝退款</span>
									<span v-else-if='items.list[0].r_type==9'>同意并退款</span>
									<span v-else-if='items.list[0].r_type==11'>商家寄出商品</span>
									<span v-else-if='items.list[0].r_type==12'>售后完成</span>
								</span>
								<span v-else-if='items.status==5'>已完成</span>
								<span v-else-if='items.status==6'>订单关闭</span>
							</div>
						</div>
						<div class='proList' v-for='(itemList,indexList) in items.list' :key='indexList' >
							<div class='proListUp ml_60' @tap='_changeDetail(items.sNo)' v-if='items.status==1&&items.list.length>1&&(items.fhRadios&&fhRadios)'>
								<div class='fhRadios'>
									<label class="radio" v-if="itemList.r_status==1">
										<radio class='radio_color' value="1" @tap.stop='_changeFh(itemList.id,index,indexs,indexList)' :checked="itemList.status"/>
									</label>
								</div>
								<div class='proListUpLeft'>
									<img :src="itemList.imgurl">
								</div>
								<div class='proListUpRight'>
									<div class='proTitle'>
										<span v-if="itemList.otype=='pt'" class='ptCrl'>拼团</span>
										<span v-else-if="itemList.otype=='KJ'" class='ptCrl KJ_color'>砍价</span>
										<span v-else-if="itemList.otype=='JP'" class='ptCrl JP_color'>竞拍</span>
										<span v-else-if="itemList.otype=='FX'"  class='ptCrl FX_color'>分销</span>
										<span v-else-if="items.self_lifting =='1'" class='ptCrl ZT_color'>自提</span>
										{{itemList.p_name}}
									</div>
									<div class='proPro mt_40'>{{itemList.size}}</div>
								</div>
								<div class='proSellData'>
									<div class='sellMoney'>￥{{itemList.p_price}}<span v-if="items.allow>0">+<img class="integral-img" :src="integral_hei">{{items.allow}}</span></div>
									<div class='sellMoney mt_40'>x{{itemList.num}}</div>
								</div>
							</div>
							<div v-else class='proListUp' @tap='_changeDetail(items.sNo)' >
								<div class='proListUpLeft'>
									<img :src="itemList.imgurl">
								</div>
								<div class='proListUpRight'>
									<div class='proTitle'>
										<span v-if="itemList.otype=='pt'" class='ptCrl'>拼团</span>
										<span v-else-if="itemList.otype=='KJ'" class='ptCrl KJ_color'>砍价</span>
										<span v-else-if="itemList.otype=='JP'" class='ptCrl JP_color'>竞拍</span>
										<span v-else-if="itemList.otype=='FX'"  class='ptCrl FX_color'>分销</span>
										{{itemList.p_name}}
									</div>
									<div class='proPro mt_20'>{{itemList.size}}</div>
								</div>
								<div class='proSellData'>
									<div class='sellMoney'>￥{{itemList.p_price}}<span v-if="items.allow>0">+<img class="integral-img" :src="integral_hei">{{items.allow}}</span></div>
									<div class='sellMoney mt_20'>x{{itemList.num}}</div>
								</div>
							</div>
						</div>
						<div class='proListDown ml_60' v-if='items.status==1&&items.list.length>1&&(items.fhRadios&&fhRadios)' >
							<div class='fhRadios1' >
								<label class="radio">
									<radio class='radio_color' value="1" @tap='_changeFh1(index,indexs)' :checked="changeFh1"/>
								</label>
							</div>
							<div class='font_28'>合计：
								<span class='color_ff0'>￥{{items.z_price}}</span>
								<span class='color_ff0' v-if="items.allow>0">+<img class="integral-img" :src="integral_hong">{{items.allow}}</span>
							</div>
							<div class='center'>
								<div class='proBtn' @tap='th1(items.sNo)'>编辑订单</div>
								<div class='proBtn' @tap='_showFhDiv(items.sNo,index,indexs)'>发货</div>
							</div>
						</div>
						<div class='proListDown ' v-else>
							<div class='font_28'>合计：
								<span class='color_ff0'>￥{{items.z_price}}</span>
								<span class='color_ff0' v-if="items.allow>0">+<img class="integral-img" :src="integral_hong">{{items.allow}}</span>
							</div>
							<div class='center ml_10' v-if="items.self_lifting=='0' || items.status==4">
								<div class='proBtn' @tap='_closeOrder(items.sNo)' v-if='items.status==0'>关闭订单</div>
								<div class='proBtn' @tap='toReturn(items.sNo,items.list[0].id)'
								 v-if='items.list[0].r_type==0&&items.status==4'>审核</div>
								<div class='proBtn' @tap='th1(items.sNo)' v-if='(items.status==0 && !items.pay_time && items.order_status) || items.status==1'>编辑订单</div>
								<div class='proBtn' @tap='_showFhDiv1(items.list.length,items.sNo,items.list[0].id,index,indexs,items)' 
								 v-if='items.status==1||(items.status==4&&items.list[0].r_type==5)'>发货</div>
								<div class='proBtn' v-if='items.status==2||(items.status==4&&items.list[0].r_type==3)' @tap='_seeWL(items.sNo)' >查看物流</div>
								<div class='proBtn' @tap='returnM(items.sNo,items.list[0].id)' v-if='items.status==4&&items.list[0].r_type==3&&items.list[0].re_type!=3'>退款</div>
								<div class='proBtn' @tap='_showFhDiv2(items.list.length,items.sNo,items.list[0].id,index,indexs)' v-if='items.status==4&&items.list[0].r_type==3&&items.list[0].re_type==3'>回寄</div>
								<div class='proBtn' @tap='refuse(items.sNo,items.list[0].id)' v-if='items.status==4&&items.list[0].r_type==3'>拒绝</div>
							</div>
							<div class='center ml_10' v-if="items.self_lifting=='1' && items.status==2">
								<!-- 自提 -->
								<div class='proBtn' @tap='QRx(items.id)' >验证码核销</div>
								<div class='proBtn' @tap='QRs(items.id)' >自提扫码</div>
							</div>
						</div>
						<div v-if='indexs+1!=item.res.length' class='hr'></div>
					</div>
				</div>
				<uni-load-more v-if='list.length>10' :loadingType="loadingType"></uni-load-more>
			</div>
			
			<div v-else-if="nodata==1" class='noFindDiv'>
				<div>
					<img class='noFindImg'  :src="noOrder" />
				</div>
				<span class='noFindText'>您还没有相关的订单哦</span>
			</div>
		</div>
		<mpvue-picker v-show='show' :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<div class='mask' v-if='fhDiv'>
			<div class='fhDiv'>
				<div class='fhDivTitle'>
					<span class='span'>填写物流信息</span>
					<img class='img' @tap='_closeFhDiv()' :src="guanbi">
				</div>
				<div class='formList'>
					<div class='leftText1' >
						<span>快递公司</span>
					</div>
					<div class='rightInput1' @tap='showSinglePicker()'>
						<input type="text" disabled="true"  :placeholder-style='placeStyle' v-model="proClass" placeholder="请选择快递公司"  />
						<div class='jiantouDiv'>
							<img :src="jiantou"  alt="">
						</div>
					</div>
				</div>
				<div class='formList'>
					<div class='leftText1' >
						<span>快递单号</span>
					</div>
					<div class='rightInput1'>
						<input type="text"  :placeholder-style='placeStyle' v-model="courier_num" placeholder="请填写快递单号"  />
					</div>
				</div>
				<div class='fhSubmit'  @tap='_send()'>提交</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display2">
			<div class='mask_cont'>
				<p>请填写拒绝理由</p>
				<input type="text"  v-model="reason" placeholder="请输入拒绝理由"  :placeholder-style='placeStyle' />
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel(2)">取消</div>
					<div @tap="_confirm(2)">确认</div>
				</div>
			</div>
		</div>
		<div class='mask' v-if="mask_display3">
			<div class='mask_cont'>
				<p>请填写退款金额</p>
				<input type="digit"  v-model="refundM" @input='_checkMoney($event)'  placeholder="请输入退款金额"  :placeholder-style='placeStyle' />
				<div class='mask_cont_div center'>
					<img :src="warnIng" class='img'>
					<span>应退￥{{refundNum}}，确认后款项将原路返回</span>
				</div>
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
	import mpvuePicker from '../../components/mpvuePicker.vue'
	import uniLoadMore from "@/components/uni-load-more.vue"
	import {
		LaiKeTui_axios,
		LaiKeTui_changeTabBar,
		LaiKeTui_changeFh,
		LaiKeTui_changeFh1,
		LaiKeTui_showFhDiv,
		LaiKeTui_showFhDiv1,
		LaiKeTui_closeOrder,
		LaiKeTui_returnM,
		LaiKeTui_send,
		LaiKeTui_confirm,
	} from '../../static/js/myStore/myOrder.js'
	export default {
		data() {
			return {
				warnIng:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/warnIng.png',
				refundNum:'',
				refundM:'',
				reason:'',
				mask_display1:false,
				mask_display2:false,
				mask_display3:false,
				noOrder:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/noOrder.png',
				loadingType:0,
				express_id:'',
				title: '我的订单',
				access_id:'',
				topTabBar:1,
				integral_hong: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				integral_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
				testImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yhqBg.png',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				guanbi:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				changeFh:[],
				changeFh1:false,
				fhRadios:false,
				fhDiv:false,
				kuaidiList:'',
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				show:false,
				proClass:'',
				courier_num:'',
				shop_id:'',
				order_type:'',
				list:[],
				page:1,
				sNo:'',
				fastTap:true,
				payment_num:'',
				return_num:'',
				send_num:'',
				status:'',
				orderList_id:[],
				nodata:0,//1代表没有数据，-1有数据
				returnR:9,
				re_type:1, 
				placeStyle:'color:#b8b8b8;font-size:28upx',
				is_tui: true,
			}
		},
		onLoad(option){
			let me = this;
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id

			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
			});
			this.status=option.status
			if(this.status=='all'){
				this.order_type=''
				this.topTabBar=1
			}else if(this.status=='dfk'){
				this.order_type='payment'
				this.topTabBar=2
			}else if(this.status=='dfh'){
				this.order_type='send'
				this.topTabBar=3
			}else if(this.status=='sh'){
				this.order_type='return'
				this.topTabBar=4
			}
		},
		onShow(){
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
			this.shop_id = uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):this.$store.state.shop_id
			
			this._axios()
		},
		methods: {
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			changeTabBar(num){
				var me=this
				LaiKeTui_changeTabBar(me,num)
			},
			_axios(){
				var me=this;
				LaiKeTui_axios(me);

			},
			_changeDetail(id){
				uni.navigateTo({
					url:'../myStore/order?order_id='+id
				})
			},
			_changeFh(id,index,index1,index2){
				var me=this
				LaiKeTui_changeFh(me,id,index,index1,index2)
			},
			_changeFh1(index,index1){
				var me=this
				LaiKeTui_changeFh1(me,index,index1)
			},
			// 编辑订单
			th1(sNo){
				uni.navigateTo({
					url:'../myStore/order?editor=1&order_id='+sNo
				})
			},
			// 发货  单件商品
			_showFhDiv(sNo,index,index1){
				var me=this
				LaiKeTui_showFhDiv(me,sNo,index,index1)
			},
			// 发货
			_showFhDiv1(length,sNo,id,index,indexs,items){
				uni.navigateTo({
					url: '/pagesA/myStore/shipments?shops='+JSON.stringify(items)
				})
				// var me=this
				// me.orderList_id.push(id)
				// LaiKeTui_showFhDiv1(me,sNo,length,index,indexs)
			},
			// 回寄
			_showFhDiv2(length,sNo,id,index,indexs){
				var me=this
				me.re_type = 3
				me.orderList_id = id
				LaiKeTui_showFhDiv1(me,sNo,length,index,indexs)
			},
			// 关闭订单
			_closeOrder(sNo){
				var me=this
				LaiKeTui_closeOrder(me,sNo)
			},
			// 审核
			toReturn(sNo,order_details_id){
				uni.navigateTo({
					url:'../myStore/storeRefund?sNo='+sNo+'&order_details_id='+order_details_id
				})
			},
			// 查看物流
			_seeWL(sNo){
				let data = {
					module: 'app',
					action: 'order',
					app: 'logistics',
					id: sNo,
					access_id:this.access_id,
					type:'',
				}
				
				if(this.source == 1){
					data.type = 'pond'
				}
				uni.request({
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data,
					method:'POST',
					success:(res) => {
						uni.hideLoading()
						if(res.data.code == 200){
							let data = res.data.res
							if(data.length>1){
								uni.navigateTo({
									url: '../../pagesB/expressage/expressage?sNo=' + sNo,
								})
							}else{
								uni.navigateTo({
									url: '../../pages/expressage/expressage?list='+JSON.stringify(data[0])+'&sNo=' + sNo,
								})
							}
						} else {
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},
					fail:(e) => {
						uni.showToast({
							title: '数据加载失败！',
							duration: 2000,
							icon:'none'
						})
					}
				})
			},
			// 退款
			returnM(sNo,order_details_id){//同意退款
				var me=this
				LaiKeTui_returnM(me,sNo,order_details_id)
			},
			// 拒绝
			refuse(sNo,order_details_id){//拒绝退货
				this.sNo=sNo
				this.orderList_id=order_details_id
				this.mask_display2=true
			},
			_closeFhDiv(){
				this.fhDiv=false
				this.fhRadios=false
			},
			showSinglePicker() {
				this.show=true
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			// 物流提交
			_send(){
				var me=this
				LaiKeTui_send(me)
			},
			// 拒绝理由取消
			_cancel(type){
				if(type==1){
					this.mask_display1=false
				}else if(type==2){
					this.mask_display2=false
				}else if(type==3){
					this.mask_display3=false
				}
			},
			// 拒绝理由提交
			_confirm(type){
				var me=this
				LaiKeTui_confirm(me,type)
			},
			// 请输入退款金额
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
			// 选择快递公司
			onConfirm(e) {
				this.proClass = e.label
				this.show=false
				this.express_id=this.kuaidiList[e.index[0]].id
			},
			th(){
				uni.navigateTo({
					url:'../myStore/storeRefund'
				})
			},
			// 跳转至手动输入验证码页面
			QRx(id){
				uni.navigateTo({
					url:'../myStore/QRdraw?order_id='+id
				})
			},
			// 自提扫码
			QRs(id){
				var me = this
				// #ifndef H5
					uni.scanCode({
						success: function (rew) {
							if(!rew.result){
								return
							}
							uni.showLoading({
								title:'加载中'
							});
							var data={
								module:'app',
								action:'mch',
								m:'sweep_extraction_code',
								access_id:me.access_id,
								shop_id:me.shop_id,
								order_id:id,
								extraction_code: rew.result
							}

							uni.request({
								data,
								url: uni.getStorageSync("url"),
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								method:'POST',
								success:function(res){
									uni.hideLoading();
									if(res.data.code==200){
										me.order_id = res.data.order_id
										me.p_price = res.data.p_price
										me.sNo = res.data.sNo
										uni.showToast({
											title:res.data.message,
											duration:1500,
											icon:'none'
										})
										// 成功后跳转 QRsuccess页面
										uni.redirectTo({
											url: "QRsuccess?p_price="+me.p_price+"&sNo="+me.sNo+"&order_id="+me.order_id
										})
									}
									else{
										uni.showToast({
											title:res.data.message,
											duration:1500,
											icon:'none'
										})
									}
								}
							})
						}
					});
				// #endif
				// #ifdef H5
					uni.showToast({
						icon: 'none',
						title: 'H5不支持扫码功能，请选择手动输入'
					})
				// #endif
			}
		},
		onReachBottom:function () {
			var me=this
			if (this.loadingType != 0) {
				return;
			}
			this.loadingType = 1;

			var data={
				module: 'app',
				action: 'mch',
				m: 'my_order_load',
				access_id:me.access_id,
				shop_id:me.shop_id,
				order_type:me.order_type,
				page:me.page
			}
			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success: (res) => {
					let {data: {list}} = res
					me.page += 1
					if(list.length > 0) {
						me.list = me.list.concat(list);
						me.loadingType=0;
					} else {
						me.loadingType =2;
					}
				},
				error:(err)=>{
					console.log(err)
				}
			})
			
		},
		computed: {
			now:function(){
				var year=new Date().getFullYear()
				var month=new Date().getMonth()+1
				var date=new Date().getDate()
				var date1=year+'-'+month+'-'+date
				return date1
			},
		},
		components: {
			heads,
			mpvuePicker,
			uniLoadMore
		},
	}
</script>

<style lang="less">
	@import url("../../static/css/myStore/myOrder.less");
</style>
