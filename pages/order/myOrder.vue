<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 20:00:34
 * @LastEditTime: 2019-08-30 18:21:31
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class='container'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<view class='position_head'>
			<headapp :title='title' returnR='7'></headapp>
			<!-- <div class='allgoods_s home_navigation'>
				<div class='home_input'>
					<img class='searchImg' :src="serchimg" alt="">
					<input type="text" v-model="sreach_value" placeholder="请输入商品名称/订单号" placeholder-style="color:#999999;font-size:26upx"
					 name="sourch" />
				</div>
				<div style='font-size: 28upx;' @tap='_seart()'>搜索</div>
			</div> -->
			<view class="p-search-contaienr p-flex p-align-center p-justify-between">
				<view class="p-search-form">
					<image class='' :src="serchimg" alt=""></image>
					<input type="text" v-model="sreach_value" placeholder="请输入商品名称/订单号" placeholder-style="color:#999999;font-size:26upx"
					 name="sourch"></input>
				</view>
				<view class="p-search-btn" @tap='_seart()'>
					搜索
				</view>
			</view>
			<!--   导航栏      -->
			<ul class='order_header'>
				<li class='header_li' :class="{header_border:status_id == index}" v-for='(item,index) in header' :key='item.id'
				 @tap="_header_index(index)">{{item}}</li>
			</ul>
		</view>
		<!--   订单列表     -->
		<div class='load' v-if='load'>
			<div>
				<img :src="loadImg" />
				<p>加载中…</p>
			</div>
		</div>

		<div v-else>
			<div class="orderlist" v-if='order.length>0'>
			
				<div class="orderlist-line"></div>
				<view class="p-order-item order_goods orderlist-head" v-for='(item,index) in order' :key="'i' + index">
					<!-- 订单头部 -->
					<view class="p-item-top order_one dd-boxa p-flex p-justify-between p-align-center">
						<view v-if="!item.shop_name">{{ item.shop_name }}</view>
						<view v-else @tap="_goStore(item.shop_id)" class="p-flex p-align-center">
							<image :src="storeImg"></image>
							{{ item.ismch?'':item.shop_name }}
							<image class="p-more" :src="jiantou"></image>
						</view>

						<view class='red'>{{ item.codetext }}</view>
					</view>
					<!-- 订单商品详情 -->
					<view 
						class='p-item-center order_two' 
						:style="{padding:(item.ismch?'10upx 0':'')}" 
						v-for='(orders,index1) in item.list' 
						:key="'c' + index + index1"
						@tap="_navigateTo(item.status,item.id,item.otype)"
					 >
						<view class="p-item-center-top p-flex p-justify-between" style="height: 120upx;">
							<!-- 订单商品图 -->
							<image :src="orders.imgurl" class="p-avatar"></image>
							<!-- 订单商品标题 -->
							<view class="p-item-center-content p-flex-sub p-flex p-flex-direction p-justify-between" style="height: 100%;">
								<!-- TODO：微信小程序不支持动态css -->
								<view class="order_p_name commodity-title">
									<text v-if="item.otype == 'pt'" class="ptCrl">拼团</text>
									<text v-else-if="item.otype == 'KJ'" class="ptCrl commodity-type-kj">砍价</text>
									<text v-else-if="item.otype == 'JP'" class="ptCrl commodity-type-jp">竞拍</text>
									<text v-else-if="item.otype == 'FX'" class="ptCrl commodity-type-px">分销</text>
									<text v-else-if="item.otype == 'integral'" class="ptCrl commodity-type-integral">积分</text>
									<text v-else-if="item.otype == 'MS'" class="ptCrl commodity-type-ms">秒杀</text>
									<!-- <text class="ptCrl commodity-type-ms">秒杀</text> -->
									{{ orders.p_name }}
								</view>
								<view class='color_one'>{{ orders.size }}</view>
							</view>
						
							<!-- 订单商品右 -->
							<view class="commodity-price">
								<!-- 商品价格积分 -->
								<view v-if="orders.p_price > 0">
									<!-- #ifndef MP-ALIPAY -->
									<text v-if="item.otype == 'KJ'">￥{{item.spz_price}}</text>
									<text v-if="item.otype == 'JP'">￥{{item.jp.jp_price}}</text>
									<text v-if="item.otype != 'JP' && item.otype != 'KJ' && item.otype != 'integral'">￥{{orders.p_price}}</text>
									<!-- #endif -->
									<!-- #ifdef MP-ALIPAY -->
									<view v-if="item.otype == 'KJ'">￥{{item.spz_price}}</view>
									<view v-if="item.otype == 'JP'">￥{{item.jp.jp_price}}</view>
									<view v-if="item.otype != 'JP' && item.otype != 'KJ' && item.otype != 'integral'">￥{{orders.p_price}}</view>
									<!-- #endif -->
									<text class="commodity-price-integral" v-if="orders.integral > 0">
										￥{{orders.p_price}} + <image class="commodity-price-img" :src="integral_hei"></image>
										{{orders.integral}}
									</text>
								</view>
								<view v-else>
									<text class="commodity-price-integral" v-if="orders.integral > 0">
										<image class="commodity-price-img" :src="integral_hei"></image>
										{{ orders.integral }}
									</text>
								</view>
								<!-- 购买数量 -->
								<view class="color_two">x{{ orders.num }}</view>
								<!-- 订单右边的按钮 -->
								<!-- 退款换货 -->
								<view class="retreat" style="color: #FF8800;" v-if="(orders.r_status == 4 || orders.r_status == 6) && orders.re_type !=0 ">
									{{orders.re_type == 1 || orders.re_type == 2?"退款":"退换"}}{{orders.r_status == 4?"中":"成功"}}
								</view>
						
								<view class="retreat commodity-price-btn" v-if="orders.r_status==3&&item.otype != 'integral'" @click.stop="comment(orders)">
									立即评价
								</view>
						
								<view class="retreat commodity-price-btn" v-if="orders.r_status==5&&item.otype != 'integral'" @click.stop="comment(orders)">
									追加评论
								</view>
							</view>
						
						</view>
						<!-- TODO: -->
						<view style="height: 20upx;width: 100%;" v-if="item.subtraction_list.product_title && (item.list.length - 1) == index1"></view>
						<view class="p-flex p-justify-between" v-if="item.subtraction_list.product_title && (item.list.length - 1) == index1">
							<image class="p-avatar" v-if="item.subtraction_list.product_title && (item.list.length - 1) == index1" :src="item.subtraction_list.imgurl"></image>
							<view style="width: 400upx;" v-if="item.subtraction_list.product_title && (item.list.length - 1) == index1">
								<view class="order_p_name" style="height: 80rpx;">
									<text style="color: red;">【赠品】</text>
									{{ item.subtraction_list.product_title }}
								</view>
								<view class="color_one"></view>
							</view>
							<view style="flex:1;" v-if="item.subtraction_list.product_title && (item.list.length - 1) == index1">
								<view>￥0.00
									<!-- {{item.subtraction_list.price}} -->
								</view>
								<view class="color_two">x{{item.subtraction_list.num}}</view>
						
								<!-- 退款换货 -->
								<view class="retreat" style="color: #FF8800;" v-if="(orders.r_status == 4 || orders.r_status == 6) && orders.re_type !=0 ">
									{{orders.re_type == 1 || orders.re_type == 2?"退款":"退换"}}{{orders.r_status == 4?"中":"成功"}}
								</view>
								<view class="retreat commodity-price-btn" v-if="orders.r_status==3&&item.otype != 'integral'" @click.stop="comment(orders)">立即评价</view>
								<view class="retreat commodity-price-btn" v-if="orders.r_status==5&&item.otype != 'integral'" @click.stop="comment(orders)">追加评论</view>
							</view>
						
						</view>
					</view>
					
					<!-- 商品底部 -->
					<view class="p-item-bot order_last commodity-footer">
						<!-- 左价格 -->
						<view class="p-item-bot-price commodity-footer-price">
							<span v-if="item.subtraction_list.num" class='color_666'>共{{ item.sum - 0 + item.subtraction_list.num }}件</span>
							<span v-else class='color_666'>共{{ item.sum }}件</span>
				
							<!-- 积分 -->
							<span class="commodity-footer-price-integral order_integral" v-if="item.otype == 'integral'">
								合计：
								<span v-if='item.z_price>0'>￥{{ item.z_price + '+ ' }}</span>
								<span class="integral">
									<img class="integral-img" :src="integral_hong">{{' ' + item.allow}}
								</span>
							</span>
				
							<!-- 普通商品 -->
							<span class="order_all commodity-footer-price-pt" v-else-if="item.otype!='pt'">
								合计：
								<span>￥{{ item.z_price }}</span>
							</span>
				
							<!-- 拼团 -->
							<span class="order_all commodity-footer-price-pt" v-else>
								合计：
								<span>￥{{ item.status == 0 ? item.pt_price : item.z_price }}</span>
							</span>
				
						</view>
				
						<!-- TODO:1 非拼团订单-->
						<view class='last_right' v-if="item.isExtract">
							<!-- 自提取消订单 -->
							<div class="last_right_leftBtn p-btn" v-if="item.self_lifting == '1' && item.status==0" @tap='_buttonLeft($event,item,order,index)'>{{ item.leftText}}</div>
							<!-- 自提立即付款 -->
							<div clas="p-btn" v-if="item.self_lifting == '1' && item.status==0">
								<div style="font-size: 24upx;" @tap='_buttonRight($event,item,order,index)'>
									{{ item.rightText }}
								</div>
							</div>
				
							<!-- 自提：查看提取码 -->
							<div classs=" p-btn" v-if="(item.status==2||item.status==3) && item.self_lifting == '1'" @tap='_receiving(item)'>{{item.status == 2?'查看提取码':'提取码'}}</div>
				
							<!-- <div style="border-radius: 3px;" v-if="item.self_lifting == '0' " @tap='_buttonLeft($event,item,order,index)' v-text="item.status==0? leftText[0]:(item.status==2||item.status==3||item.status==5?leftText[1]:(item.status==7||item.status==6?leftText[2]:(item.status==12||item.status==4||item.status==1?leftText[3]:'')))"></div> -->
							<!-- 非自提 -->
							<div class="last_right_leftBtn p-btn" v-if="item.self_lifting == '0' && item.leftText" @tap='_buttonLeft($event,item,order,index)'>{{ item.leftText}}</div>
				
							<!-- <div v-if="item.self_lifting == '0' && item.status!=2 && item.status!=5 && item.status!=3 && item.status!=12 &&(item.status==3&&item.list.length==1)" :class='item.status==1&&item.delivery_status==1?"a1":""'> -->
							<div class="p-btn" v-if="item.rightText && item.self_lifting !== '1'" :class='item.status==1&&item.delivery_status==1?"a1":""'>
				
								<!--TODO: v-show='item.status!= 12 ?true:false' -->
								<div style="font-size: 24upx;" @tap='_buttonRight($event,item,order,index)' :class='item.status==1&&item.delivery_status==1?"a1":""'>
				
									<!-- {{ item.status==0 ? rightText[0]:(item.status==1?rightText[1]:(item.status==2?rightText[2]:(item.status==3?rightText[3]:(item.status==4?rightText[4]:(item.status==5?rightText[5]:(item.status==7||item.status==6||item.status==12?rightText[6]:''))))))}} -->
									{{ item.rightText }}
								</div>
							</div>
							<!-- 评价按钮 -->
							<!-- <div v-else-if = "(item.status==3 || item.status==5)&&item.list.length==1&&item.otype!='JP' ">
								<div style="font-size: 24upx;" @click.stop='comment(orders)'  v-for='(orders,index1) in item.list' :key="index1"
								v-show='item.status!=12 ?true:false' >
								{{item.status==3?rightText[3]:rightText[5]}}
								</div>
							</div> -->
						</view>
				
						<!-- TODO:接上面的1 -->
						<view class='last_right' v-else>
							<!-- <div style="border-radius: 3px;" @tap='_buttonLeft($event,item,order,index)' v-text="item.status==0? leftText[0]:(item.status==2||item.status==3||item.status==5?leftText[1]:(item.status==7||item.status==6||item.status==11||item.status==12?leftText[2]:(item.status==9||item.status==10||item.status==1?leftText[4]:'')))"></div>					 -->
							<div v-if='item.leftText' class="last_right_leftBtn p-btn" @tap='_buttonLeft($event,item,order,index)'>
								{{ item.leftText }}
							</div>
				
							<div class="p-btn" v-if='item.rightText&&item.status!=10&&item.status!=3&&item.status!=5&&item.status!=6&&item.status!=7&&item.status!=12'
							 @tap='_buttonRight($event,item,order,index)' :class='(item.status==1||item.status==9||item.status==11)&&item.delivery_status==1?"a1":""'>
								<!-- {{item.status==1?rightText[1]:(item.status==2?rightText[2]:(item.status==3 && false?rightText[3]:(item.status==4?rightText[4]:(item.status==5?rightText[5]+'11':(item.status==9?rightText[8]:(item.status==11?rightText[7]:(item.status==0?rightText[0]:'')))))))}} -->
								{{ item.rightText }}
							</div>
				
							<!-- <div v-else-if="(item.status==3 || item.status==5)&&item.list.length==1">
								<div style="font-size: 24upx;" @click.stop='comment(orders)' v-for='(orders,index1) in item.list' :key="index1"
								 v-show='item.status!=12 ?true:false'>
									{{item.status==3?rightText[3]:rightText[5]}}
								</div>
							</div> -->
				
						</view>
				
					</view>
					<view style="background-color: #F4F4F4;height: 20upx;width: 100%;margin: 0;border: none;"></view>
				
				</view>
				
				<uni-load-more v-if='order.length > 10' :loadingType="loadingType"></uni-load-more>
			</div>
			
			
			
			<view v-else class="p-coupon-none p-flex p-flex-direction p-justify-center p-align-center">
				<image :src="noOrder"></image>
				<view class="">您还没有相关的订单哦~</view>
				<view class="p-coupon-btn" @tap="_toHome()" >
					去逛逛
				</view>
			</view>
			
			<!-- <div v-else style='height: 100vh;position: absolute;top: 0;width: 100%;display: flex;align-items: center;'>
				<div class='noFindDiv' style='width: 100%;padding-top: 378upx;height: 100%;'>
					<div>
						<img class='noFindImg' :src="noOrder" />
					</div>
					<span class='noFindText'>您还没有相关的订单哦</span>
					<div @tap="_toHome()" style='display: flex;align-items: center; justify-content: center;margin-top: 60upx;'>
						<span class='goHome'>去逛逛</span>
					</div>
				</div>
			</div> -->
		</div>
		

		<!-- 确认收货弹窗 -->
		<div v-if="alertTips" class='order_mask' @touchmove.stop.prevent>
			<div style="width: 70%;height: 340upx;left: 15%;top: 30%;position: fixed;background: #FFFFFF;border-radius: 40upx;">
				<div style="height: 75%;text-align: center;font-size: 15px;padding: 100upx 60upx;">请确认已收到货，否则您可能钱货两空</div>
				<div style="display: flex;border-top: 1px #e6e6e6 solid;font-size: 18px;text-align: center;height: 25%;">
					<span @tap="_selTips(false)" style="width: 50%;padding: 20upx;border-right: 1px #e6e6e6 solid;color: #9D9D9D;">取消</span>
					<span @tap="_selTips(true)" style="width: 50%;padding: 20upx;">确定</span>
				</div>
			</div>
		</div>

		<!-- 提取码弹出框 -->
		<div v-if='receiving_shop.flag' class='receiving_modal' @tap='receiving_stop'>
			<div @tap.stop>
				<!-- 已完成 -->
				<img class='receiving_finish' v-if="receiving_check.status==3" :src="finish2x"></img>
				<div class='receiving_content'>
					<div class='receiving_content_title'>
						订单编号: {{receiving_check.sNo}}
					</div>
					<div class='receiving_content_data' v-if='receiving_check.por_list.length==1'>
						<div class='receiving_shop_img'>
							<img :src="receiving_check.por_list[0].img" alt="" style='width:100%;height:100%;'>
						</div>
						<div class='receiving_content_item'>
							<p>{{receiving_check.por_list[0].product_title}}</p>
							<div>
								<p><span class='receiving_rmb'>￥</span>{{receiving_check.por_list[0].p_price}}</p>
								<div class='receiving_size'>
									<span class='receiving_size_item'>{{receiving_check.por_list[0].size}}</span>
									<span class='receiving_count'>×{{receiving_check.por_list[0].num}}</span>
								</div>
							</div>
						</div>
					</div>
					<scroll-view scroll-x v-else>
						<div class='receiving_content_data1' :style="'width:'+imgWidth">
							<div class='receiving_shop_img' v-for='(item,index) in receiving_check.por_list' :key='index'>
								<p class='receiving_shop_num' v-if='item.num>1'>{{item.num}}</p>
								<img :src="item.img" alt="" style='width:100%;height:100%;'>
							</div>
						</div>
					</scroll-view>
					<div class='receiving_content_bottom'>
						共{{receiving_check.num}}件, 合计<p class='red bold'>￥{{receiving_check.z_price}}</p>
					</div>
				</div>
				<div class='receiving_img'>
					<img :src="receiving_check.extraction_code_img" alt="" :style="receiving_check.status==3?'opacity: 0.4':''">
				</div>
				<div class='receiving_code' :style="receiving_check.status==3?'opacity: 0.6':''">
					<span class='receiving_name'>验证码:</span>
					<span class="receiving_code_data">{{receiving_check.extraction_code}}</span>
				</div>
			</div>
		</div>

		<delModel v-model="isDelModel" :nocancel="true" content="商品参数已变更，请重新购买！" @on-click="onModeOk"></delModel>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage'
	import uniLoadMore from "@/components/uni-load-more.vue"

	import heads from "../../components/header-h5.vue"
	import headapp from "../../components/header.vue"
	import delModel from "@/components/delModel.vue"
	import PROCESS from "./DataProcess.js"
	export default {
		data() {
			return {
				receiving_check: {
					por_list: []
				},
				receiving_shop: {
					// QRcode: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563425765262&di=75ec7f5464a6b9b2fd2f355f39cc6477&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FkD2BwibncCkYqdbC4FunNelTAjqxq6sFR8n1giaY52SIkdl2szrHD9lkoajvaqhxMRRYwx9eLoqzTPmkrjJsR71g%2F640%3Fwx_fmt%3Dpng',
					// receiving_code: 'JKOLSS56',
					flag: false,
					bottom: '',
				},
				can_del: true, //是否能删除订单
				fastTap: true,
				title: '我的订单',
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/jiantou2x.png',
				storeImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/store.png',
				serchimg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/searchh.png',
				noOrder: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/noOrder.png',
				loadImg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/loading.gif',
				bback: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/bback.png',
				search2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/search2x.png',
				integral_hong: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral.png",
				integral_hei: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/integral_hei.png",
				finish2x: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/finish2x.png",
				head: true, //头部切换
				header: ['全部', '待付款', '待发货', '待收货', '待评价'],
				rightText: ['立即付款', '提醒发货', '确认收货', '待评价', '退货', '追加评价', '再次购买', '拼团详情', '邀请好友'],
				leftText: ['取消订单', '查看物流', '删除订单', '查看详情', '拼团详情'],
				access_id: '',
				order: [], //订单数据 
				status_id: '', //订单状态
				sreach_value: '', //搜索框的值
				page: 1, //加载页面
				allLoaded: false,
				loading: false,
				del_num: 0,
				load: true,
				timer: null,
				count: '',
				flag: true,
				loadingType: 0,
				value: '',
				alertTips: false,
				pay_name: 'MYORDER',
				shouhuoData: [],
				isDelModel: false
			}
		},
		/**
		 * 上拉触底事件处理
		 * */
		onReachBottom() {
			this._rollBottom()
		},
		/** 
		 * 监听页面加载
		 * */
		onLoad(option) {

			this.receiving_shop.bottom = uni.upx2px(160)

			// #ifdef H5
			var storage = window.localStorage;
			storage["_store"] = 'h5';
			// #endif

			// #ifdef MP-WEIXIN
			var me = this
			wx.getSystemInfo({
				success: function(res) {
					me.receiving_shop.bottom -= res.statusBarHeight
				}
			})
			// #endif
		},
		computed: {
			imgWidth() {
				if (this.receiving_check.por_list) {
					if (this.receiving_check.por_list.length > 1) {
						let width = this.receiving_check.por_list.length * 150
						return uni.upx2px(width) + 'px'
					}
				}
			}
		},
		watch: {
			value: function(newValue, oldValue) {
				this.changeValue()
			}
		},
		/** 
		 * 监听实例销毁之前
		 * */
		beforeDestroy() {
			clearInterval(this.timer);
			this.order = [];
		},
		/** 
		 * 监听页面显示
		 * */
		onShow() {
			// #ifdef H5
			this.$nextTick(() => {
				this.$refs.lktAuthorizeComp.handleAfterAuth(this, '../login/login?landing_code=1', () => {
					// #endif
					this.load = true

					this.status_id = this.$store.state.status

					this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id

					if (!this.access_id) {
						this.load = false
					} else {
						this._axios();
						this.page = 1
						this.loadingType = 0
					}

					this.flag = true
					// #ifdef H5
				});
			});
			// #endif

		},
		components: {
			uniLoadMore,
			heads,
			headapp,
			delModel
		},
		methods: {
			...mapMutations({
				cart_id: 'SET_CART_ID',
				order_id: 'SET_ORDER_ID',
				address_id: 'SET_ADDRESS_ID',
				status: 'SET_STATUS'
			}),
			onModeOk() {
				this.isDelModel = !this.isDelModel
			},
			/** 
			 * 
			 * 设置请求数据选中项类型
			 * '' 全部 || payment 代付款 || send 代发货 || receipt 待收货 || evaluete 待评价
			 */
			getOrderType(data) {
				if (this.status_id == 0) {
					data.order_type = ''
				} else if (this.status_id == 1) {
					data.order_type = 'payment'
				} else if (this.status_id == 2) {
					data.order_type = 'send'
				} else if (this.status_id == 3) {
					data.order_type = 'receipt'
				} else if (this.status_id == 4) {
					data.order_type = 'evaluete'
				}
			},
			changeLoginStatus() {
				this.access_id = uni.getStorageSync('access_id');
				this._axios();
			},
			/**
			 * 上拉触底加载更多
			 */
			_rollBottom() {

				if (this.loadingType != 0) {
					console.log(this.loadingType, '开始')
					return;
				}
				console.log(this.loadingType, '结束')
				this.loadingType = 1

				var data = {
					module: 'app',
					action: 'order',
					app: 'load_more',
					access_id: this.access_id,
					page: this.page
				}

				this.getOrderType(data)

				this.$req.post({
					data
				}).then(res => {
					let {
						order
					} = res
					this.page++
					if (order.length > 0) {

						PROCESS(order)

						this.order.push(...order)

						this.del_num = 0
						this.loadingType = 0
					} else {
						this.loadingType = 2
					}
				})

			},
			/**
			 * 
			 * 确定收货
			 * @param type 
			 */
			_selTips(type) {
				var me = this
				if (type) {
					let orde_id = me.shouhuoData['orde_id'];
					let data = {
						module: 'app',
						action: 'order',
						app: 'ok_Order',
						order_id: orde_id,
						access_id: this.access_id
					}

					this.$req.post({
						data
					}).then(res => {
						let {
							code,
							message
						} = res
						if (code === 200) {
							uni.showToast({
								title: '收货成功！',
								duration: 1000,
								icon: 'none'
							})
							this.alertTips = false
							setTimeout(() => {
								this._axios()
							}, 1000)
						} else {
							uni.showToast({
								title: res.message,
								duration: 1500,
								icon: 'none'
							})
						}
					})
				} else {
					this.alertTips = false
				}
			},
			_goStore(shop_id) {
				uni.navigateTo({
					url: '../../pagesA/store/store?shop_id=' + shop_id
				})
			},
			/**
			 * 去逛逛
			 */
			_toHome() {
				uni.switchTab({
					url: '../tabBar/home'
				})
			},
			/**
			 * 
			 * 查看订单详情
			 */
			_navigateTo(status, id, otype) {
				let url = ''
				if (status == 0) {
					url = '../order/order?order_id=' + id + '&showPay=true';

					// #ifdef H5
					console.log('h5');
					url = '../order/order?order_id=' + id + '&showPay=true&_store=h5';
					// #endif

					uni.navigateTo({
						url
					})

				} else {

					url = '../order/order?order_id=' + id

					// #ifdef H5
					url = '../order/order?order_id=' + id + '&showPay=true&_store=h5';
					// #endif

					uni.navigateTo({
						url
					})
				}

				this.flag = false
			},
			/**
			 * 导航栏切换
			 */
			_header_index(index) {
				let me = this;
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
					me.page = 1
					if (me.header[index] == '待付款') {
						me.status(1)
						me.status_id = me.$store.state.status
					} else if (me.header[index] == '待发货') {
						me.status(2)
						me.status_id = me.$store.state.status
					} else if (me.header[index] == '待收货') {
						me.status(3)
						me.status_id = me.$store.state.status
					} else if (me.header[index] == '待评价') {
						me.status(4)
						me.status_id = me.$store.state.status
					} else if (me.header[index] == '全部') {
						me.status(0)
						me.status_id = me.$store.state.status
					}
					me._axios()
				});
			},
			/**
			 * 
			 * 加载订单数据
			 * */
			_axios() {

				let data = {
					access_id: this.access_id,
					module: 'app',
					action: 'order',
					app: 'index'
				}

				this.getOrderType(data)

				if (this.access_id) {
					this.$req.post({
						data
					}).then(res => {

						let {
							order
						} = res

						this.order = []

						setTimeout(() => {
							this.load = false
						}, 300)

						PROCESS(order)

						this.order.push(...order)


						if (order.length < 10) {
							this.allLoaded = true;
						} else {
							this.allLoaded = false;
						}
					}).catch(err => {
						uni.showToast({
							title: err.message,
							duration: 1500,
							icon: 'none'
						})
					})
				}
			},
			/**
			 * 评价
			 */
			comment(orders) {
				let {
					id: order_details_id,
					r_status
				} = orders
				if (r_status == 3) {
					uni.navigateTo({
						url: '../evaluate/evaluating?order_details_id=' + order_details_id + '&num=all'
					})
				} else {
					uni.navigateTo({
						url: '../evaluate/evaluating?order_details_id=' + order_details_id + '&add=true&num=all'
					})
				}
			},
			/**
			 * 删除？？？？
			 * 
			 */
			_buttonLeft(event, item, order, index) {
				let me = this
				let {
					id: order_id,
					sNo,
					status,
					delivery_status: sum
				} = item
				let {
					attribute_id,
					p_id
				} = order

				if (!this.can_del) {
					return false
				}
				this.can_del = false

				setTimeout(() => {
					this.can_del = true
				}, 1500)

				this.fastTap = false
				//orde_id订单id  attribute_id商品属性id  p_id商品id  
				let otype = sNo.substr(0, 2);

				let data = {
					module: 'app',
					action: 'order',
					order_id: order_id,
					access_id: this.access_id
				}

				if (status == 0) {
					data.app = 'removeOrder'
					this.$req.post({
						data
					}).then(res => {
						let {
							code,
							message
						} = res

						if (code === 200) {
							uni.showToast({
								title: '取消成功！',
								duration: 1000,
								icon: 'none'
							})
						}
						me._axios()
					})
				} else if (status == 2 || status == 3 || status == 5) {
					me.fastTap = true
					let data = {
						module: 'app',
						action: 'order',
						app: 'logistics',
						id: sNo,
						access_id: this.access_id,
						type: '',
					}

					if (this.source == 1) {
						data.type = 'pond'
					}
					uni.request({
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data,
						method: 'POST',
						success: (res) => {
							uni.hideLoading()
							if (res.data.code == 200) {
								let data = res.data.res
								if (data.length > 1) {
									uni.navigateTo({
										url: '../../pagesB/expressage/expressage?sNo=' + sNo,
									})
								} else {
									uni.navigateTo({
										url: '../../pages/expressage/expressage?list=' + JSON.stringify(data[0]) + '&sNo=' + sNo,
									})
								}
							} else {
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						},
						fail: (e) => {
							uni.showToast({
								title: '数据加载失败！',
								duration: 2000,
								icon: 'none'
							})
						}
					})
				} else if (status == 12 || status == 4 || (status == 1 && otype != 'PT')) {
					me.fastTap = true
					uni.navigateTo({
							url: '../order/order?order_id=' + order_id
						}),
						console.log(456)
				} else if (status == 9 || status == 10 || (status == 1 && otype == 'PT')) {
					me.fastTap = true
					var path = '../../pagesA/group/group_end?sNo=' + sNo + '&returnR=1'
					uni.navigateTo({
						url: path
					})
				} else if (status == 7 || status == 6 || status == 11 || status == 12) {


					/*发送请求*/
					data.app = 'del_order'

					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							console.log(res)
							let {
								data: {
									code,
									message
								}
							} = res
							if (code == 200) {
								uni.showToast({
									title: '删除成功！',
									duration: 1000,
									icon: 'none'
								})
								me.order.splice(index, 1)
								me.del_num++
								if (me.del_num >= 5) {
									//执行下拉加载数据操作
									me._rollBottom()

								}

							} else {
								uni.showToast({
									title: message,
									duration: 1000,
									icon: 'none'
								})
							}
							me.fastTap = true
						}
					})
				}
			},
			/** 
			 * TODO:还不清楚是啥
			 * @docs 提醒发货可以触发
			 * */
			_buttonRight(event, item, order, index) {
				
				console.log('==================>');
				console.log(item);
				console.log();

				let {
					id: orde_id,
					sNo,
					status,
					delivery_status: sum,
					list
				} = item

				let {
					attribute_id,
					p_id
				} = order

				var me = this
				var otype = sNo.substr(0, 2);
				//orde_id订单id  attribute_id商品属性id  p_id商品id  
				if (status == 7 || status == 6 || status == 12) {
					//跳转订单详情支付页
					var data = {
						module: 'app',
						action: 'order ',
						app: 'buy_again',
						id: orde_id,
						access_id: this.access_id
					}
					console.log(data)
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						// url: me.$store.state.url,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							console.log(res)
							let {
								data: {
									cart_id,
									code,
									message
								}
							} = res
							if (code == 200) {
								me.cart_id(cart_id)
								me.order_id('')
								me.address_id('')
								me.$store.state.cart_id = res.data.cart_id
								// #ifdef H5 
								var storage = window.localStorage;
								storage['cart_id'] = res.data.cart_id
								console.log("storage['cart_id']")
								console.log(storage['cart_id'])
								// #endif
								uni.navigateTo({
									url: '../pay/orderDetailsr?returnR=2&buy_again=true'
								})
							} else {
								uni.showToast({
									title: res.data.message,
									duration: 1500,
									icon: 'none'
								})
							}
						}
					})
				} else if (status == 0) {


					// if (item.can_buy) {
						me.order_id(orde_id)
						me.address_id('')

						var path = '../order/order_payment?order_id=' + orde_id + '&showPay=true';


						// #ifdef H5
						path = '../order/order_payment?order_id=' + orde_id + '&showPay=true&_store=h5';
						// #endif


						uni.navigateTo({
							url: path
						})

					// } 
					// else {
					// 	me.isDelModel = true
					// }

				} else if (status == 1) { //提醒发货
					//请求接口
					console.log(this.fastTap)
					if (!this.fastTap) {
						return
					}
					this.fastTap = false
					if (sum == 0) {
						var data = {
							module: 'app',
							order_id: orde_id,
							access_id: this.access_id,
							app: 'delivery_delivery',
							action: 'order'
						}
						console.log(data)
						uni.request({
							data,
							url: uni.getStorageSync("url"),
							// url: me.$store.state.url,
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							method: 'POST',
							success: function(res) {
								me.fastTap = true
								console.log(res)
								if (res.data.code == 200) {
									uni.showToast({
										title: '已提醒卖家发货！',
										duration: 1000,
										icon: 'none'
									})
									me._axios()
								} else {
									uni.showToast({
										title: res.data.message,
										duration: 1500,
										icon: 'none'
									})
								}
							}
						})
					} else {
						me.fastTap = true
					}

				} else if (status == 4) {

					//跳转订单详情
					uni.navigateTo({
						url: '../order/order?order_id=' + orde_id
					})
				} else if (status == 3) {
					//评价页面
					uni.navigateTo({
						url: '../evaluate/evaluating?order_details_id=' + orde_id + '&num=all'
					})
				} else if (status == 5) {
					//追加评价页面
					uni.navigateTo({
						url: '../evaluate/evaluating?order_details_id=' + orde_id + '&add=true&num=all'
					})
				} else if (status == 9 || status == 10 || status == 11) {
					//参团页面
					var path = '../../pagesA/group/group_end?sNo=' + sNo
					uni.navigateTo({
						url: path
					})
				} else if (status == 2) {
					me.shouhuoData['orde_id'] = orde_id
					me.alertTips = true;
					return false

				}
			},
			back_click() {
				uni.showToast({
					title: '请不要频繁点击提醒！',
					duration: 1000,
					icon: 'none'
				})
			},
			/**
			 * 搜索
			 */
			_seart() {
				if (this.sreach_value === '') {
					uni.showToast({
						title: '请输入搜索关键词',
						duration: 1000,
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '../order/orderSearch?sreach_value=' + this.sreach_value
					})
				}
			},
			// 关闭提取码弹框
			receiving_stop() {
				this.receiving_shop.flag = false
			},
			/**
			 * 查看提取码
			 */
			_receiving(e) {
				var me = this

				let data = {
					module: 'app',
					app: 'see_extraction_code',
					action: 'order',
					order_id: e.id,
					access_id: this.access_id
				}
				this.$req.post({
					data
				}).then(res => {
					this.receiving_shop.flag = true
					this.fastTap = true
					let {
						code,
						list,
						message
					} = res

					if (code === 200) {
						this.receiving_check = list
					} else {
						uni.showToast({
							title: message,
							duration: 1500,
							icon: 'none'
						})
					}
				})
			},
			returnGoods(orders) {
				let str = ''
				if (orders.re_type == 1 || orders.re_type == 2) {
					str = '退款'
				} else {
					str = '退换'
				}
				if (orders.r_status == 4) {
					str += '中'
				} else {
					str += '成功'
				}

				return str;
			},
			shuchu(item) {
				console.log(item)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../static/css/order/myOrder.less");
	@import url("../../static/css/pcommon.css");
	.p-search-contaienr{
		padding: 10upx 30upx;
		font-size: 28upx;
	}
	.p-search-form{
		background-color: #f4f4f4;
		line-height: 64upx;
		height: 64upx;
		font-size: 26upx;
		color: #333333;
		flex: 1;
		display: flex;
		align-items: center;
		margin: 0 30upx 0 0;
		border-radius: 10upx;
	}
	.p-search-form image{
		width: 30upx;
		height: 30upx;
		margin: 0 20upx;
	}
	.p-search-form input{
		flex: 1;
		font-size: 26upx;
	}
	
	.p-order-item{
		position: relative;
		min-height: 364upx;
		background-color: #ffffff;
	}
	.p-item-top{
		padding: 0 30upx;
		color: #666666;
		font-size: 28upx;
		height: 40px;
		line-height: 40px;
		border: 0!important;
		margin: 0!important;
		position: relative;
	}
	.p-item-top::after{
		content: "";
		position: absolute;
		bottom: 0;
		left: 30upx;
		width: calc(100% - 30upx);
		height: 1px;
		background-color: #eee;
	}
	.p-item-top image {
		width: 34upx;
		height: 34upx;
		margin-right: 10upx;
	}
	.p-item-top image.p-more{
		width: 15upx !important;
		height: 27upx !important;
		margin-left: 18upx;
	}
	.p-item-center{
		padding: 30upx;
		height: 180upx;
		font-size: 24upx;
		display: block!important;
	}
	.p-item-center-top{
		
	}
	.p-avatar{
		width: 120upx;
		height: 120upx;
		margin-right: 20upx;
	}
	.p-item-center-content .commodity-title{
		// font-size: 24upx;
		height: auto!important;
		word-break: break-all;
	}
	.color_one{
		color: #9d9d9d!important;
		font-size: 20upx!important;
	}
	.color_two {
		color: #9d9d9d!important;
		font-size: 24upx!important;
		padding: 6upx 0!important;
	}
	.ptCrl{
		font-size: 18upx;
		vertical-align: 1px;
	}
	.p-item-bot{
		padding: 0 30upx;
		position: relative;
		border: none!important;
		font-size: 24upx;
	}
	.p-item-bot::after{
		content: "";
		position: absolute;
		top: 0;
		left: 30upx;
		width: calc(100% - 30upx);
		height: 1px;
		background-color: #eee;
	}
	.order_last .last_right > div{
	    display: block!important;
	    line-height: 50upx;
	    text-align: center;
	}
	.order_last .last_right > div.p-btn{
		font-size: 24upx;
	}
	.p-coupon-none{
		position: fixed;
		top: 30%;
		left: 0;
		width: 100%;
		font-size: 30upx;
		color: #666;
	}
	.p-coupon-none image{
		width: 220upx;
		height: 250upx;
		margin-bottom: 30upx;
	}
	.p-coupon-btn{
		margin-top: 30upx;
		border: 1px solid #000;
		border-radius: 5upx;
		padding: 10upx 60upx;
		color: #000;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
