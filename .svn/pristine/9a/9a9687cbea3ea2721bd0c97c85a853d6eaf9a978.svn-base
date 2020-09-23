<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<headapp :title='title' :returnR="backUrl" ></headapp>
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中……</p>
			</div>
		</div> 
		<div v-else class='relative'>
			<div class='order_zt'>
				<p v-if='list.status==0'>待付款</p>
				<p v-if='list.status==1'>待发货</p>
				<p v-if="list.status==2 && list.self_lifting == '0'">待收货</p>
				<p v-if="list.status==2 && list.self_lifting == '1'">待发货</p>
				<p v-if='list.status==3'>已收货</p>
				<p v-if='list.status==4'>退货</p>
				<p v-if='list.status==5'>完成</p>
				<p v-if='list.status==6'>订单关闭</p>
				<p v-if='list.status==7'>订单完成</p>
				<div class='order_wl'>
					<div class='orderTitle'>
						<div>订单号：{{list.sNo}}</div>
						<div class='copy_btn' @tap='onCopy()'>复制</div>
					</div>
				</div>
				<p class='order_p'>下单时间：{{list.add_time}}</p>
			</div>
			<ul class='order_xx' v-if='diplay'>
				<li class='border_bottom'>
					<img :src="buyhead" />
					<p>买家：{{list.user_name}}</p>
				</li>
				<li>
					<img :src="buyadd" />
					<p>{{list.name}}&nbsp;&emsp;{{list.mobile}}<br /><span class='font_24 color_888'>{{list.address}}</span></p>
				</li>
			</ul>
			<ul class='order_xx' v-else>
				<li class='border_bottom'>
					<img :src="buyhead" />
					<p>买家：{{list.user_name}}</p>
				</li>
				<li class='border_bottom'>
					<!-- <img :src="buyadd" /> -->
					<img :src="addressImg" />
					<div class='edit_add'>
						<span class='fl'>收件人姓名</span>
						<input type="text" name='name'  @blur="changeValue()" v-model="list.name" />
					</div>
					<img :src="jiantou" class='jiantou' />
				</li>
				<li class='border_bottom'>
					<div class='edit_add pl_56'>
						<span class='fl'>联系电话</span>
						<input type="text" name='name'  @blur="changeValue()" v-model="list.mobile" />
					</div>
					<img :src="jiantou" class='jiantou' />
				</li>
				<li>
					<div class='edit_add pl_56'>
						<span class='fl'>收件地址</span>
						<input type="text" name='name'  @blur="changeValue()" v-model="list.address" style="width: auto;" />
					</div>
					<img :src="jiantou" class='jiantou' />
				</li>
			</ul>
			<ul class='order_goods'>
				<li v-for='(item,index) in list.list' :key='index'>
					<div class='order_two'>
						<img :src='item.pic' />
						<div class='order_two_div1'>
							<p class='order_p_name'>{{item.p_name}}</p>
							<div v-if='!diplay && list.status == 0' class='goodDetail' @tap='_changeAttr(index,list.sNo,item.p_id,item.sid)'>
								<span class='span'>{{item.size}}</span>
								<img class='img_X' :src='jianX' />
							</div>
							<p v-else class='color_one' >{{item.size}}</p>
						</div>
						<div class='order_two_div2'>
							<div v-if='!diplay && list.status == 0' class='edit_money'>
								<font class='fl pl_10'>￥</font>
								<input class='digit1' v-model="item.p_price" @focus="changeFinish" @blur="changePrice" type="digit"/>
								<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hei">{{list.allow}}</span>
							</div>
							<p v-else>￥{{item.p_price}}<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hei">{{list.allow}}</span></p>
							<p class='color_two'>x{{item.num}}</p>
						</div>
					</div>
				</li>
				<li class='order_last ml_30'>
					<div class='order_color'>
						<p>商品总价</p>						
						<p v-if="list.status == 0 && list.otype == 'pt'">￥{{list.spz_price}}
						<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hui">{{list.allow}}</span>
						</p>
						<p v-else>￥{{list.spz_price}}<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hui">{{list.allow}}</span></p>
					</div>
					<div class='order_color' v-if="list.coupon_money != 0 && list.coupon_money != '0.00'">
						<p>优惠券</p>
						<p>￥{{list.coupon_money}}<span >{{list.coupon_name}}</span></p>
					</div>
					<div class='order_color' v-if="list.comm_discount<1 && list.comm_discount>0 ">
						<p>分销折扣</p>
						<p>{{list.comm_discount*10}}折</p>
					</div>
					<div class='order_color'  v-if="list.grade_rate>0&&list.grade_rate<1">
						<p>会员等级折扣</p>
						<p>{{list.grade_rate*10}}折</p>
					</div>
					<div class='order_color' v-if="list.reduce_money != 0 && list.reduce_money != '0.00'">
						<p>满减优惠</p>
						<p>￥{{list.reduce_money}}</p>
					</div>
					<div class='order_color'>
						<p>运费</p>
						<div v-if='!diplay && list.status == 0' class='edit_money'>
							<font class='fl pl_30'>￥</font>
							<input class='digit2' v-model="list.z_freight" @focus="changeFinish('f')" @input="changeFreight" type="digit"/>
						</div>
						<p v-else>￥{{list.z_freight}}</p>
					</div>
					<div class='order_color' >
						<p>订单备注</p>
						<p style="max-width:520upx;">{{list.remarks}}</p>
					</div>
					<div>
						<p>订单总价</p>
						<div v-if='!diplay && list.status == 0' class='edit_money' style='border: none;'>
							<font class='fl pl_30'>￥</font>
							<input class='digit2' v-model="list.z_price" disabled="true" type="digit"/>
							<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hei">{{list.allow}}</span>
						</div>
						<p v-else>￥{{list.z_price}}<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hei">{{list.allow}}</span></p>
					</div>
				</li>
				<li class='order_pay'>
					<p>实收款</p>
					<p class='z_price'>￥{{list.z_price}}<span v-if="list.allow>0">+<img class="integral-img" :src="integral_hong">{{list.allow}}</span></p>
				</li>
			</ul>
		</div>
		<div class='h_98' v-if='diplay'>
			<div class='order_foot' v-if="(list.status==0 && list.order_status||list.status==1||list.status==2) && list.self_lifting=='0'">
				<div  v-if='list.status!=2' class='order_button mr_20' @tap="_edit()">
					编辑订单
				</div>
				<div v-if='list.status==2' class='order_button' @tap='_seeWL(list.sNo)'>
					查看物流
				</div>
				<div v-if='list.status==1' class='order_button' @tap='_showFhDiv()'>
					发货
				</div>
			</div>
			<div class='order_foot' v-if="list.self_lifting=='1' && list.status==2">
				<div class='order_button mr_10' @tap='QRx'>验证码核销</div>
				<div class='order_button' @tap='QRs' >自提扫码</div>
			</div>
		</div>
		<div class='edit_btn' v-if='!diplay&&okBtn' @tap="_ok()">
			<span class='span'>完成</span>
		</div>
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
					<div class='rightInput1'>
						<input type="text" disabled="true"  :placeholder-style="placeStyle" v-model="proClass" placeholder="请选择快递公司"  />
						<div class='jiantouDiv' @tap='showSinglePicker()'>
							<img :src="jiantou"  alt="">
						</div>
					</div>
				</div>
				<div class='formList'>
					<div class='leftText1' >
						<span>快递单号</span>
					</div>
					<div class='rightInput1'>
						<input type="number"   :placeholder-style="placeStyle" v-model="courier_num" placeholder="请填写快递单号"  />
					</div>
				</div>
				<div class='fhSubmit' @tap='_send()'>提交</div>
			</div>
		</div>
		<div class='mask' v-if='mask_display' >
			<div class="mask_d">
				<div class='mask_guige'>
					<div class='mask_one'>
						<div>
							<img class="shangp" :src="imgurl" />
						</div>
						<div class='mask_pric'>
							<p class='red'>￥<span>{{price}}</span></p>
							<p>库存{{num}}</p>
						</div>
						<img class="cha" :src="closeImg" @tap="_mask_false" />
					</div>
					<div class="mask_over">
						<div class='mask_two' v-for='(item,indx) in attrList' :key='item.id'>
							<p>{{item.attrName}}</p>
							<ul v-if="num==0">
								<li v-for='(items,index) in item.attr' :key='index' @tap='showState(index,indx)'>{{items.attributeValue}}</li>
							</ul>
							<ul v-else>
								<li v-for='(items,index) in item.attr' :key='index' :class="[items.enable ? (items.select ? 'orange':'select') : 'back']"
								@tap='showState(index,indx)'>{{items.attributeValue}}</li>
							</ul>
						</div>
					</div>
		
				</div>
				<div class='h_98' >
					<div class='mask_quren' style='position: absolute;' @tap="_confirm(num)">确认</div>
				</div>
			</div>
		</div>
	<mpvue-picker v-show='show' :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
	 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</div>
</template>

<script>
	import mpvuePicker from '../../components/mpvuePicker.vue'
	import headapp from '../../components/header.vue'
	import heads from "../../components/header-h5.vue"
	import {
		LaiKeTui_axios,
		LaiKeTui_changeValue,
		LaiKeTui_changeAttr,
		LaiKeTui_showFhDiv,
		LaiKeTui_ok,
		LaiKeTui_send,
		LaiKeTui_showState,
		LaiKeTui_confirm,
		LaiKeTui_spec,
		LaiKeTui_first,
	} from '../../static/js/myStore/order.js'
	
	import { copyText } from '@/common/util.js'
	
	export default {
		data() {
			return {
				orderList_id:'',
				express_id:'',
				imgurl:'',
				closeImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				mask_display:false,
				proClass:'',
				access_id:'',
				shop_id:'',
				p_id:'',
				integral_hui: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hui.png",
				integral_hong: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				integral_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
				back1: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/back2x.png',
				guanbi:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/guanbi2x.png',
				jianX:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/jianX.png',
				jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				goodsimg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/yhqBg.png',
				buyadd:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/add2x.png',
				buyhead:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/buyhead2x.png',
				loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/5-121204193R7.gif',
				addressImg:uni.getStorageSync("endurl")+'images/icon1/address2x.png',
				title: '订单详情',
				order_id:'',
				load:true,
				diplay:true,
				fhDiv:false,
				list:'',
				attrList:'',
				skuBeanList:'',
				haveSkuBean:'',
				okBtn:true,
				sNo:'',
				courier_num:'',
				kuaidiList:'',
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				show:false,
				backUrl:'myOrder',
				finishBlur:false,//是否完成bulr计算
				fastTap:true,
				placeStyle:'color:#b8b8b8;font-size:28upx'
			}
		},
		onLoad(option){
			let me = this;
			if(option.editor==1){
				me.title='编辑订单'
			}
			
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.order_id=option.order_id
					console.log(me.order_id)
					if(option.editor==1){
						me.diplay=false
					} else {
						me.diplay=true
					}
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me.shop_id = uni.getStorageSync('shop_id')?uni.getStorageSync('shop_id'):me.$store.state.shop_id
					me._axios();
				});
			});
			
		},
		methods: {
			_axios(){
				var me=this
				LaiKeTui_axios(me)
			},
			// 复制
			onCopy: function () {
				let me=this
				
				// #ifdef H5
				copyText('',me.list.sNo)
				// #endif
				
				// #ifndef H5
				uni.setClipboardData({
					data: me.list.sNo,
					success: function (res) {
						uni.showToast({
							title:'复制成功',
							duration:1500,
							icon:'none'
						})
					}
				});
				// #endif
			},
			// 改变联系人信息
			changeValue(){
				var me=this
				LaiKeTui_changeValue(me)
			},
			// 改变属性
			_changeAttr(index,sNo,p_id,attribute_id){
				var me=this
				LaiKeTui_changeAttr(me,index,sNo,p_id,attribute_id)
			},
			// 改变完成
			changeFinish(type){
				if('f' == type){
					this.finishBlur = true;
					return;
				}
				this.finishBlur = false;
			},
			// 商品单价改变
			changePrice(e){
				var me = this
				let promise = new Promise((resolve, reject)=>{
					me.changeValue();
					resolve("==");
				})
				let p2 = promise.then(function(){
					me.finishBlur = true;
				});
			},
			// 运费改变
			changeFreight(e){
				var me = this;
				me.list.z_freight  = e.detail.value;
				me.changeValue();
				this.finishBlur = true;
			},
			// 编辑订单
			_edit(){
				this.title='编辑订单'
				this.diplay=false
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
			// 发货
			_showFhDiv(){
				var me=this
				LaiKeTui_showFhDiv(me)
			},
			// 完成
			_ok(){
				var me = this;
				LaiKeTui_ok(me)
			},
			// 关闭物流信息
			_closeFhDiv(){
				this.fhDiv=false
			},
			// 显示物流公司
			showSinglePicker() {
				this.show=true
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			// 发货
			_send(){
				var me=this
				LaiKeTui_send(me)
			},
			
			showState(index, indx, stock, price) {
				var me=this
				LaiKeTui_showState(me,index, indx, stock, price)
			},
			
			_confirm(num) {
				var me  = this
				LaiKeTui_confirm(me,num)
			},
			onConfirm(e) {
				this.proClass = e.label
				this.show=false
				this.express_id=this.kuaidiList[e.index[0]].id
			},
			
			_spec() {
				var me  = this
				LaiKeTui_spec(me)
			},
			_first(index) {
				var me  = this
				LaiKeTui_first(me,index)
			},
			_mask_false(){
				this.mask_display=false
				this.okBtn=true
			},
			// 跳转至手动输入验证码页面
			QRx(){
				uni.navigateTo({
					url:'../myStore/QRdraw'
				})
			},
			// 自提扫码
			QRs(){
				// #ifndef H5
					uni.scanCode({
						success: function (rew) {
							uni.showLoading({
								title:'加载中'
							});
							var me = this
							QRs(me,rew)
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
		components: {
			heads,
			mpvuePicker,
			headapp
		},
	}
</script>

<style>
	@import url("../../static/css/myStore/order.css");
</style>
