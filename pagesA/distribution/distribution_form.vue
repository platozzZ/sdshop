<!-- 佣金提现的form表单 -->
<template>
	<div class='box'>
		
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		
		<!-- #ifndef MP -->
		<div class="yh-title">
			<heads :title='title'></heads>
		</div>
		<!-- #endif -->
		
		<div class='put_head' :style="{ top:halfWidth }">
			<p class="yh-max_amount">最大提现金额：<span>{{ max_amount }}</span></p>
			<p class="yh-put" @tap="_put()">全部提现</p>
		</div>
		
		<ul class="message" :style="{ top:halfWidth }">
			
			<li class="yh-border">
				<span class="left_text">提现金额</span>
				<input class="yh-put_mon" placeholder-style="color: #b8b8b8;" type="number" placeholder="请输入提现金额" v-model="put_mon"
				 @blur="_money" id='put_mon' />
			</li>
			
			<view class="sxl_class">
				最小提现金额¥{{min_amount}}，提现手续费{{cash_charge}}%
			</view>
			
			<li>
				<view class="li_title">填写提现银行卡信息</view>
			</li>
			
			<li>
				<span class="left_text">持卡人&nbsp;&nbsp;</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入持卡人姓名" v-model="user_name" @blur="_usname()" />
			</li>
			
			<li>
				<span class="left_text">银行卡号</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入银行卡号" v-model="bank_number" @input="_bank()"
				 @blur='_bank_p' />
			</li>
			
			<li>
				<span class="left_text">开户行</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入开户行" v-model="bank_name" />
			</li>
			
			<li>
				<span class="left_text">开户支行</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入开户支行" v-model="branch" />
			</li>
			
			<li>
				<span class="left_text">手机号&nbsp;&nbsp;</span>
				<input type="number" placeholder="请输入手机号" v-model="phone" disabled="true" readonly="readonly" />
			</li>
			
			<li class="flex yh-flex" style=''>
				<span class="left_text">验证码&nbsp;&nbsp;</span>
				<input placeholder-style="color: #b8b8b8;" class='input' :class='{marginleft:display}' type="number" placeholder="请输入手机验证码"
				 v-model="input_code">
				<span class='color yh-color' v-if='display' @tap="_verif">获取验证码</span>
				<span class='active yh-active' v-if='!display'>
					{{count}}S后再次获取
				</span>
			</li>
			
		</ul>
		<div class='setup-buttom' @tap="_sumber" :style='{top:halfWidth1}'>完成</div>

	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import {
		telephone
	} from '../../common/landing.js'
	import {
		mapMutations
	} from 'vuex'
	import {
		getStorage
	} from '../../common/storage'
	import {
		lkt_money,
		lkt_bank,
		lkt_bank_p,
		lkt_getcode,
		lkt_time,
		lkt_submit
	} from '../../static/js/distribution/distribution_center.js'

	export default {
		data() {
			return {
				type: '',
				title: '佣金提现',
				put_mon: "", 								// 提现金额
				bank_number: '',
				bank_name: '',
				user_name: '',
				branch: '', 								// 支行
				phone: '',
				input_code: '',
				display: true,
				count: '',
				timer: '',
				code: '',
				one_code: '', 							// 手机号码格式正确返回值
				max_amount: '', 						// 提现的最大金额
				min_amount: '', 						// 提现的最小金额
				bank_information: '', 			// 用户银行卡历史信息
				mobile: "",
				oldPhone: '',
				access_id: '',
				allComplete: false,
				fastTap: true,
				shop_id: '',
				cash_charge: 0, 						// 手续费
			}
		},
		onLoad(option) {
			let me = this;
			me.$nextTick(function() {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../../pages/login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me.shop_id = uni.getStorageSync('shop_id') ? uni.getStorageSync('shop_id') : me.$store.state.shop_id
					me.type = option.type
					if (me.access_id) {
						me._axios();
					}
				});
			});
		},
		computed: {
			halfWidth: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
			halfWidth1: function() {
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				
				// #ifdef APP-PLUS
				he = 70 + heigh * 2
				// #endif
				
				// #ifndef APP-PLUS
				he = 70
				// #endif
				
				return uni.upx2px(he) + 'px';
			},
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
			_axios() {
				let me = this
				
				
				let data = {
					module: 'app',
					action: 'commcenter',
					app: 'into_withdrawals',
					access_id: this.access_id
				}
				
				this.$req.post({ data }).then(res => {
					
					if (res.code == 200) {
						
						let {
							data: {
								bank_information,
								max_amount,
								min_amount,
								mobile,
								cash_charge
							}
						} = res
						
						me.max_amount = max_amount
						me.min_amount = min_amount
						me.cash_charge = cash_charge * 100
						me.bank_information = bank_information
						me.mobile = mobile
						me.bank_number = me.bank_information.Bank_card_number ? me.bank_information.Bank_card_number : ''
						me.bank_name = me.bank_information.Bank_name ? me.bank_information.Bank_name : ''
						me.branch = me.bank_information.branch ? me.bank_information.branch : ''
						me.user_name = me.bank_information.Cardholder ? me.bank_information.Cardholder : ''
						me.phone = me.mobile ? me.mobile : ''
						
					} else {
						
						uni.showToast({
							title: res.message,
							duration: 1500,
							icon: 'none'
						})
						
					}
				})
			},
			/**
			 * 
			 * */
			back() {
				this.myforward("")
				this.mybacks("")
				uni.navigateBack({
					delta: 1
				})
			},
			/**
			 * 全部提现
			 * */
			_put() {
				var mon = Number(this.max_amount)
				var monr = Number(this.put_mon)
				var monrys = Number(this.min_amount)
				if (mon < monrys) {
					uni.showToast({
						title: "提现金额不能小于最低限额",
						duration: 1000,
						icon: 'none'
					})
				} else {
					this.put_mon = mon.toFixed(2)
				}
			},
			/**
			 * 金额格式判断
			 * */
			_money() {
				lkt_money(this)
			},
			/**
			 * 银行卡匹配
			 * */
			_bank() {
				lkt_bank(this)
			},
			/**
			 * 
			 * */
			_bank_p() {
				lkt_bank_p(this)
			},
			/**
			 * 持卡人验证
			 * */
			_usname() {
				var self = this
				var name = /^[\u4e00-\u9fa5]{2,8}$/;
				if (!name.test(self.user_name)) {
					self.user_name = ""
					uni.showToast({
						title: '请输入合法的姓名！',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			/**
			 * 验证码发送1分钟倒计时
			 * */
			_verif() {
				lkt_getcode(this)
			},
			/**
			 * 1分钟倒计时
			 * */
			_time() {
				lkt_time(this)
			},
			/**
			 * 手机号码正则验证
			 * */
			_telephone(value) {
				this.one_code = telephone(value)
			},
			/**
			 * 提交
			 * */
			_sumber() {
				lkt_submit(this)
			}
		},
		components: {
			heads
		}
	}
</script>

<style scoped>
	@import url("../../static/css/distribution/distribution_form.css");
</style>
