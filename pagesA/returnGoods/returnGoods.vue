<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<div class="data_h" :style="{height: halfWidth}">
			<div class="data_h_h" :style="{height: halfWidth}"></div>
		</div>
		
		<!-- #ifndef MP -->
		<div style='height: 88upx;'>
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		
		<ul class='order_goods'>
			<li class='order_two' v-for='(item,index) in order' :key="index">
				<img :src='item.image' />
				<div class="yh-order-two-div">
					<p class='p_name'>{{item.p_name}}</p>
					<p class='color_one'>{{item.size}}</p>
				</div>
				<div>
					<p>￥{{item.p_price}}</p>
					<p class='color_two'>x{{item.num}}</p>
				</div>
			</li>
		</ul>
		
		<!-- 线 -->
		<div class="yh-line"></div>
		
		<ul>
			<li class="return_pay" v-if="status && self_lifting == '0'" @tap="_uni_navigateTo('refund?refund_type=1&order_details_id='+order_details_id+'&rType='+rType)">
				<div class='return_right'>
					<div>
						<img class="return_right_img" :src="tuihuo_img" />
						<span>退货退款</span>
					</div>
					<p>已收到货，需要退还已收到的货物</p>
				</div>
				<img class='arrow' :src="jiantouhei_img" />
			</li>
			<li class="return_pay" v-if="r_status != '3'" @tap="_uni_navigateTo('refund?refund_type=2&order_details_id='+order_details_id+'&order_anking='+order_anking+'&rType='+rType)">
				<div class='return_right'>
					<div>
						<img class="return_right_img" :src="tuikuan_img" />
						<span>仅退款</span>
					</div>
					<p>未收到货，或与客服协商同意仅退款</p>
				</div>
				<img class='arrow' :src="jiantouhei_img" />
			</li>
			<li class="return_pay" v-if="r_status == '3'" @tap="_uni_navigateTo('refund?refund_type=3&order_details_id='+order_details_id+'&order_anking='+order_anking+'&r_status='+r_status+'&rType='+rType)">
				<div class='return_right'>
					<div>
						<img class="return_right_img" :src="tuikuan_img" />
						<span>换货</span>
					</div>
					<p>确认收货，需要更换已收到的货物</p>
				</div>
				<img class='arrow' :src="jiantouhei_img" />
			</li>
		</ul>
		
	</div>
</template>

<script>
	import heads from '../../components/header.vue'

	export default {
		data() {
			return {
				title: '请选择售后类型',
				order_details_id: '',
				tuihuo_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/tuihuo2x.png",
				jiantouhei_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/jiantouhei2x.png",
				tuikuan_img: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + "images/icon/tuikuan2x.png",
				access_id: '',
				order: '',
				order_anking: '', // 批量申请还是单个申请
				rType: false,
				status: '',
				self_lifting: '',
				r_status: "",
			}
		},
		onLoad(option) {
			let me = this;
			
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1');
			});
			
			this.order_details_id = option.order_details_id
			this.order_anking = option.order_anking
			this.r_status = option.r_status
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			
			this._axios()
			
			this.rType = option.rType
			if (this.r_status == "3") {
				this.rType = 3
			}
			
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px'
			}
		},
		methods: {
			/**
			 * 
			 * */
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync('access_id');
				me._axios();
			},
			/**
			 * 
			 * */
			_uni_navigateTo(url) {
				uni.redirectTo({
					url
				})
			},
			/**
			 * @description 加载数据
			 * */
			_axios() {
				var me = this
				var data = {
					module: 'app',
					action: 'order',
					app: 'return_method',
					access_id: this.access_id,
					order_details_id: this.order_details_id
				}
				
				uni.request({
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data,
					method: 'POST',
					success: (res) => {
						if (res.data.code == 200) {
							let {
								data: {
									data
								}
							} = res
							me.order = data.list
							me.self_lifting = data.self_lifting
							me.status = data.status
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
					error: function(err) {

					}
				})
			},
		},
		components: {
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/returnGoods/returnGoods.css");
</style>
