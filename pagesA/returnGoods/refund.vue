<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>

		<!-- #ifndef MP-ALIPAY -->
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		<!-- #endif -->

		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title' :returnR='returnR'></heads>
		</div>
		<!-- #endif -->

		<!--  提交申请    -->
		<div v-if="!return_suess">
			<ul class='order_goods'>
				<li class='order_two' v-for='(item,index) in order' :key="index">
					<img :src='item.image' />
					<div class="order_two_div">
						<p class='p_name'>{{item.p_name}}</p>
						<p class='color_one'>{{item.size}}</p>
					</div>
					<div>
						<p>￥{{item.p_price}}</p>
						<p class='color_two'>x{{item.num}}</p>
					</div>
				</li>
			</ul>

			<div class="yh-line"></div>

			<ul class='refund_pay'>

				<li v-if="r_status != 3">
					<!-- <li > -->
					<div class='right_d'>
						<div class="right_d_div">
							<span>退款金额：</span>
							<p class="refund_color font_red">￥</p>
							<!-- <span class='refund_color font_red'>￥{{refund_price}}</span> -->
							<input class="refund_color font_red" type="number" v-model="refund_price_" @blur="refund_price_rule" />
						</div>
						<div>
							<span class='refund_color yh-refund_color'>最多￥{{refund_price}}</span>
						</div>
					</div>
				</li>

				<li v-if="r_status == 3" style="display: flex;justify-content: start;">
					<span style='line-height: 1;'>售后类型：</span>
					<span>退换</span>
				</li>

				<li :style="{'align-items':(r_status == 3?'flex-start':'center')}">
					<span style='line-height: 1;'>{{r_status != 3?"退款说明":"申请原因："}}</span>
					<textarea class='input_text' rows="4" maxlength="200" placeholder='最多200字' v-model="content" @keydown="_text" />
					</li>
				
				<li class='evaluat_ul evaluat_imgBox'>
					<span class="yh-evaluat_ul">上传凭证：</span>
					
					<div class='evaluat_li' v-for='(img,index) in src' :key='index' >
						<img class='evaluat_img' :src="img"  @touchstart='_touchstart(index)' @touchend='_touchend'/>
						<img class='img_dele' :src="delete_img"   @tap="_delete(index)"/>
					</div>
					
					<div class="uploadphoto" @tap = 'choiceImg(src.length)' v-if='src.length<3?true:false'>
						<img class='xiangji' :src="xiangji_img" />
						<p class="p">最多</p>
						<p class="p">上传3张</p>
					</div>
				</li>
				
			</ul>
			<div class="yh-return_suess-div"></div>
			<div class='bottom' @tap="_button" :style="dsb?'background: #999':'background: #020202'">提交</div>
		</div>
		<!--   申请成功   -->
		<div class='return_end' v-if="return_suess">
			
			<div class='pic'>
				<img :src="gouhei_img" />
			</div>
			
			<p class='end_one'>{{refund_type != 3?"退款":"售后"}}申请提交成功</p>
			
			<p class='end_two'>请耐心等待工作人员审核</p>
			
			<div class="yh-return-end-div"></div>
			
			<div class='return_message'>{{refund_type != 3?"退款信息":"售后信息"}}</div>

			<ul class="end_msg_ul">
				<li class='end_message'>
					<div class="end_lef">商品名称：</div>
					<div class='flex1'>{{order_end.product_title[0]}}</div>
				</li>

				<li class='end_message'>
					<div class="end_lef">订单号：</div>
					<div class='flex1'>{{order_end.sNo}}</div>
				</li>
				
				<li class='end_message'>
					<div class="end_lef">申请时间：</div>
					<div class='flex1'>{{order_end.time}}</div>
				</li>
				
				<li class='end_message'>
					<div class="end_lef" >退款类型：</div>
					<div class='flex1'>{{refund_type == 3?"换货":refund_type == 2?"仅退款":"退货退款"}}</div>
				</li>
				
				<li class='end_message'>
					<div class="end_lef">退款金额：</div>
					<div class='flex1'>￥{{order_end.refund_amount}}</div>
				</li>
				
				<li class='end_message'>
					<div class="end_lef">退款说明：</div>
					<div class='flex1'>{{content}}</div>
				</li>
				<li class='end_message'>
					<div class="end_lef">上传凭证：</div>
					
					<div class='evaluat_li' v-for='(img,index) in src' :key='index' >
						<img class='evaluat_img' :src="img"  @touchstart='_touchstart(index)' @touchend='_touchend'/>
					</div>
				</li>

			</ul>
			
		</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage.js'
	
	export default{
		data(){
			return{
				title:'申请售后',
				delete_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/delete2x.png",
				xiangji_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/xiangji2x.png",
				gouhei_img:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/gouhei2x.png",
				refund_type:'',// 区分退款方式1退货退款，2仅退款
				order_details_id:'',	
				access_id:'',
				order:'',
				returnR:'',
				money:'',
				content:'',
				src:[],
				srcLength:[3,2,1,0],
				requestTime:'',
				requestTime1:0,
				img_index:-1,
				return_suess:false,
				order_end:'',
				src_img:[],
				return_r:1,
				refund_price:'',
				refund_price_:'',
				order_anking:'',
				fastTap:true,
				rType:false,
				can_sbm:true,// 能否提交
				r_status:"",// 商品当前状态
				dsb:false,//禁用按钮颜色
			}
		},
		computed:{
			halfWidth:function() {
				var gru = uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh*2
				return uni.upx2px(he) + 'px';
			}
		},
		watch: {
			src(newValue, oldValue) {
				this.requestTime = this.src.length;
			}
		},
		onLoad(option){
			let me = this
			
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
			})
			
			me.refund_type = option.refund_type
			me.order_details_id = option.order_details_id
			me.order_anking = option.order_anking
			me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
			me.r_status = option.r_status
			
			if(me.r_status){
				me.title = "申请售后";
				me.returnR = 1;
			}
			
			me._axios()
			me.rType = option.rType
		},
		methods:{
			/**
			 * 
			 * */
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			/**
			 * 
			 * */
			async _button(){
				var me = this
				if(me.can_sbm){
					me.dsb = true
					me.can_sbm = false
					setTimeout(function(){
					me.dsb = false
					me.can_sbm = true	
					},10000)
				} else {
					return false
				}
				
				if(!this.fastTap){
					return
				}
				
				this.fastTap = false
				
				if(this.content && this.rType && me.src.length == 0){
					var data = {
						access_id:me.access_id,
						module:'app',
						action:'order',
						app:'ReturnData',
						order_details_id:me.order_details_id,
						refund_amount:me.refund_price,
						explain:me.content,
						type:me.refund_type,
						access_id : me.access_id,
						refund_apply_money:me.refund_price_,
					}
					
					uni.request({
						url: uni.getStorageSync("url"),
						data,
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						method:'POST',
						success:function(res){
							let {data:{code,date,message}} = res
							me.dsb = false
							me.can_sbm = true	

							if(code==200){
								me.return_suess = true
								me.return_r = 4
								me.order_end =date
								me.fastTap = true
								
								uni.showToast({
									title:'提交成功',
									icon:'none',
									duration:1000
								})
							}
							else{
								uni.showToast({
									title:message,
									duration:1500,
									icon:'none'
								})
							}
						},
						fail:function() {
							me.dsb = false
							me.can_sbm = true	
							uni.showToast({
								title:'网络繁忙！',
								icon:'none',
								duration:1000
							})
						},
						complete:function(){
							me.fastTap = true;
							uni.hideLoading();
						}
					})
				} else if(this.content && me.src.length > 0){

					for (var i=0;i < me.src.length;i++) {
						var data ={
								access_id:me.access_id,
								module:'app',
								action:'order',
								app:'ReturnData',
								order_details_id:me.order_details_id,
								refund_amount:me.refund_price,
								explain:encodeURI(me.content),
								type:me.refund_type,
								access_id : me.access_id,
								upload_z_num:me.src.length,
								upload_num:i,
								refund_apply_money:me.refund_price_,

							}
							// #ifdef MP-WEIXIN
								data.store_type=1
							// #endif
							// #ifndef MP-WEIXIN
								data.store_type=2
							// #endif
							//判断上次上传结果成功了才能执行下一次方法
							data = await this._upload(i,data)
							console.log(data);
							if(i+1 ==  me.src.length){
								uni.hideLoading();
							}
					}
					
				} else {
					this.fastTap = true
					
					if(!this.content){
						uni.showToast({
							title: "请填写退款原因！",
							duration: 1000,
							icon:'none'
						})
					}
					else if(me.src.length == 0 && !me.rType){
						uni.showToast({
							title: "请上传图片！",
							duration: 1000,
							icon:'none'
						})
					}
					
					me.dsb = false
					me.can_sbm = true	
					return false
				}
			},
			/**
			 * 
			 * */
			_upload(i,data){
				var me = this
				return new Promise((res1)=>{
					uni.uploadFile({
						url: uni.getStorageSync("url"),
						filePath: me.src[i],
						
						// #ifdef MP-ALIPAY
						fileType:'image',
						// #endif
						
						name: 'file',
						formData:data,
						success:function(res){
							var res2 = JSON.parse(res.data)
							me.fastTap = true
							if(res2.code == 200){

								i++
								
								if(i == me.src.length){
									me.return_suess = true
									me.return_r = 4
									var obj_ = JSON.parse(res.data)
									me.order_end = obj_.date

									me.fastTap=true
									
									uni.showToast({
										title:'提交成功',
										duration:1500,
										icon:'none'
									})
									
								}
							} else {
								uni.showToast({
									title:res2.status,
									duration:1500,
									icon:'none'
								})
								return
							}

							res1(res2);
						},
						error:function(){
							me.fastTap=true
						},
					})
				})
			},
			/**
			 * 
			 * */
			_text(){
				if(this.content.length == 200){
					uni.showToast({
						title: "字数已达到极限！",
						duration: 1000,
						icon:'none'
					})
				}
			},
			/**
			 * 
			 * */
			_axios(){
				var me = this
				var data = {
					module:'app',
					action:'order',
					app:'return_method',
					access_id:this.access_id,
					order_details_id:this.order_details_id
				}
				uni.request({
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					data,
					success: (res) => {
						if(res.data.code==200){
							let {data:{data:{list,refund_price}}} = res
							me.order = list
							me.refund_price_ = me.refund_price = refund_price
						} else {
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
					},
					error:function(err){
						console.log(err)
					}
				})
			},
			/**
			 * 上传图片
			 * */
			choiceImg(length){
				var me = this
				var count = this.srcLength[length]
				uni.chooseImage({
					count: count, 
					success: function (res) {
						me.src = me.src.concat(res.tempFilePaths)
					}
				})
			},
			/**
			 * 长按
			 * */
			_touchstart(index){
				var me = this
				this.timeout = setTimeout(function(e){
					me.img_index = index
				}, 800);  // 长按时间超过800ms，则执行传入的方法
			},
			/**
			 * 
			 * */
			_touchend(){
				clearTimeout(this.timeout);  //长按时间少于800ms，不会执行传入的方法
			},
			/**
			 * 删除图片
			 * */
			_delete(index){
				if(this.src.length>0){
					this.src.splice(index,1)
					this.img_index = -1
				} else {
					return
				}
			},
			/**
			 * 
			 * */
			refund_price_rule(){
				var me = this 
				if(me.refund_price_ > me.refund_price){
					me.refund_price_ = me.refund_price
				} else if(me.refund_price_ == "" || me.refund_price_<0){
					me.refund_price_ = me.refund_price
				}
			}
		},
		components:{
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/returnGoods/refund.css");
</style>
