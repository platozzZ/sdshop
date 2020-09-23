<template>
	<div ref='box'>
		<!-- #ifndef MP -->
		<heads :title="title"></heads>
		<!-- #endif -->

		<div class='allgoods_s home_navigation flex yh-allgoods_s' :style="{top:halfWidth}">


			<div class="font-white status-box yh-font-white">
				{{info.type == "0"?"审核中":
				info.type == "1"?"审核通过":
				info.type == "3"?"商品审核中":
				info.type == "2" || info.type == "8"?"审核拒绝":
				info.type == "5"?"拒绝退换":
				info.type == "4" || info.type == "9"?"审核通过":
				info.type == "11"?'退换中':
				info.type == "12"?'售后完成':
				""}}
			</div>


			<div class="font-white tips-box yh-tips-box">
				{{info.type == "0"?"您的售后申请正在审核中，请耐心等待2-3个工作日":
				info.type == "1"?"请您寄回商品，并填写商品寄回物流信息":
				info.type == "2" || info.type == "8" || info.type == "5"?"拒绝原因："+info.r_content:
				info.type == "3"?"您的回寄商品需要3-5个工作日完成审核，请耐心等待":
				info.type == "4" || info.type == "9"?"您的售后申请已通过，退款金额于2-3个工作日到账":
				info.type == "11"?'商品已发货':
				info.type == "12"?'买家确认收货，售后完成！':
				""}}
			</div>


		</div>

		<div class="yh-line" v-if="info.type != '11' && info.type != '12'"></div>


		<div class="block-title yh-block-title" v-if="info.type != '11' && info.type != '12'">
			<span>协商记录</span>

			<div class="yh-block-title-div">
				<img class="yh-block-title-img" :src="gdInnerImg">
			</div>
		</div>

		<div class="rt-address-box" v-if="info.type == '11'||info.type == '12'">
			<div class="yh-line"></div>
			<div class="block-title">商家退换物流信息</div>
			<div class="flex address-row">
				<div>快递名称：</div>
				<div>{{return_info.express}}</div>
			</div>
			<div class="flex address-row">
				<div>快递单号：</div>
				<div>{{return_info.express_num}}</div>
			</div>
			<div class="flex address-row">
				<div>退换日期：</div>
				<div>{{return_info.add_data}}</div>
			</div>
		</div>

		<div class="rt-address-box" v-if="(info.type == '11' && info.type != '0' && info.type != '1') || info.type == '12' || info.type == '5' || info.type == '3'">
			<div class="yh-line"></div>
			<div class="block-title">买家回寄物流信息</div>
			<div class="flex address-row">
				<div>快递名称：</div>
				<div>{{send_info.express}}</div>
			</div>
			<div class="flex address-row">
				<div>快递单号：</div>
				<div>{{send_info.express_num}}</div>
			</div>
			<div class="flex address-row">
				<div>联系人：</div>
				<div>{{send_info.name}}</div>
			</div>
			<div class="flex address-row">
				<div>联系电话：</div>
				<div>{{send_info.tel}}</div>
			</div>
			<div class="flex address-row">
				<div>回寄日期：</div>
				<div>{{send_info.add_data}}</div>
			</div>
		</div>

		<div class="rt-address-box" v-if="info.type== '1' || info.type== '3' ||info.type== '5' ||info.type== '11' ||info.type== '12'">
			<div class="yh-line"></div>
			<div class="block-title" v-if="record.length > 0 && info.type == '11'"><span>商家退换物流信息</span> <img :src="fxBottomImg"
				 alt=""></div>
			<div class="block-title" v-if="record.length > 0 && info.type == '11'"><span>买家回寄物流信息</span> <img :src="fxBottomImg"
				 alt=""></div>
			<div class="block-title">售后地址</div>
			<div class="flex address-row">
				<div>退货地址：</div>
				<div>{{address}}</div>
			</div>
			<div class="flex address-row">
				<div>联系人：</div>
				<div>{{name}}</div>
			</div>
			<div class="flex address-row">
				<div>联系人电话：</div>
				<div>{{phone}}</div>
			</div>
		</div>

		<div class="rt-product-box">
			<div class="yh-line"></div>
			<div class="block-title yh-block-title">
				<span>售后信息</span>
				<div @tap="_edit_after()" v-if="info.type==2" class="yh-type">重新编辑</div>
			</div>
			<div class="flex address-row">
				<div>商品名称：</div>
				<div class="yh-p_name">{{info.p_name}}</div>
			</div>
			<div class="flex address-row">
				<div>订 单 号：</div>
				<div>{{info.r_sNo}}</div>
			</div>
			<div class="flex address-row">
				<div>申请时间：</div>
				<div>{{info.re_time}}</div>
			</div>
			<div class="flex address-row">
				<div>售后类型：</div>
				<div>{{info.re_type==1?'退货退款':info.re_type==3?'退换':'仅退款'}}</div>
			</div>
			<div class="flex address-row h_auto">
				<div>申请原因：</div>
				<div class='yx_right'>{{info.content}}</div>
			</div>
			<div class="flex address-row h_auto" v-if="info.re_photo&&info.re_photo.length > 0">
				<div>上传凭证：</div>
				<div class="flex">
					<div class="re_photo" v-for="(items,index) in info.re_photo" :key='index'>
						<img :src="items" alt="">
					</div>
				</div>
			</div>
			<div class="flex address-row" v-if="info.re_type != 3">
				<div>退款金额：</div>
				<div>￥{{info.p_price}}</div>
			</div>
		</div>
		<div class="rt-address-box" v-if="false">
			<div class="yh-line"></div>
			<div class="block-title">售后记录</div>
			<template v-if="record.length > 0">
				<div class="yh-record" v-for="(item,index) in record" :key='index'>
					<div class="flex address-row yh-addres">
						<span>{{item.re_type == 1?"退货退款":item.re_type == 2?"仅退款":item.re_type == 3?"退换":""}}</span>
					</div>
					<div class="flex address-row">
						<div>退款金额：</div>
						<div>￥{{item.money}}</div>
					</div>
					<div class="flex address-row">
						<div>申请日期：</div>
						<div>{{item.re_time}}</div>
					</div>
					<div class="flex address-row">
						<div>审批状态：</div>
						<div style="color: red;">拒绝</div>
					</div>
					<div class="flex address-row">
						<div>拒绝原因：</div>
						<div>{{item.content}}</div>
					</div>
				</div>
			</template>
		</div>

	</div>
</template>

<script>
	import Heads from "../../components/header.vue"
	import {
		getStorage
	} from '../../common/storage.js'
	import {
		telephone
	} from '../../common/landing.js'

	export default {
		data() {
			return {
				title: '售后详情',
				id: '', //订单id
				pid: '', //商品id
				access_id: '',
				address: '',
				name: '',
				phone: '',
				info: {},
				record: [], //售后记录
				send_info: [], //买家回寄信息
				return_info: [], //买家回寄信息
				gdInnerImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/gd_inner.png",
				fxBottomImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/fx_bottom.png"
			}
		},
		onLoad(option) {
			console.log("onload_start");
			var me = this
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
			me.id = option.id
			me.pid = option.pid
			// me.$nextTick(function() {
			// 	me._axios()
			// })
		},
		onShow() {
			var me = this
			me.$nextTick(function() {
				me._axios()
			})
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			}
		},
		methods: {
			/**
			 * 
			 * 
			 * */
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'order',
					app: 'Returndetail',
					id: me.id,
					pid: me.pid,
				}
				console.log(JSON.stringify(data));
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log(res)
						if (res.data.code == 200) {
							console.log(JSON.stringify(res));
							me.info = res.data.info
							me.return_info = res.data.return_info
							me.send_info = res.data.send_info
							me.store_info = res.data.store_info
							me.record = res.data.record
							console.log("===========================");
							console.log(JSON.stringify(me.store_info));
							me.address = me.store_info.address
							me.name = me.store_info.name
							me.phone = me.store_info.phone
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			/**
			 * 
			 * 
			 * */
			_edit_after() {
				console.log("_edit_after");
				var me = this
				uni.navigateTo({
					url: '../../pagesA/returnGoods/refund?refund_type=3&order_details_id=' + me.id +
						'order_anking=1&r_status=3&rType=3',
				});
			},
		},
		components:{ Heads }
	}
</script>

<style scoped>
	@import url("../../static/css/afterSale/afterDetail.css");
</style>
