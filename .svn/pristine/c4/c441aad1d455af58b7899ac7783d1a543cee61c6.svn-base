<template>
	<div class='box'>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		<heads :title='title'></heads>

		<!-- 		<div class='put_head'>
					<p>最大提现金额：<span>{{money}}</span></p>
					<p @tap="_put()">全部提现</p>
				</div> -->

		<ul class="message">

			<li style="border: none;height: 300rpx;align-items: baseline;">
				<!-- 				<span>提现金额</span>
								<input placeholder-style="color: #b8b8b8;" type="number" :placeholder="pshd"  v-model="put_mon" @blur="_money" id='put_mon'/>
							 -->
				<view style="margin-top: 49rpx;width: 100%;">
					<text style="color: #020202;font-size: 28rpx;">提现金额</text>

					<view class="" style="display: flex;margin-top: 49rpx;height: 35rpx;align-items: center;">
						<text style="font-size: 48rpx;color: #020202;">¥</text>
						<input placeholder-style="color: #b8b8b8;" type="number" :placeholder="pshd" v-model="put_mon"
						       @blur="_money" id='put_mon' placeholder-class="put_mons"/>
						<text @tap="_put()" style="flex: 1;text-align: end;">全部提现</text>
					</view>

					<view
						style="height: 70rpx;margin-top: 60rpx;align-items: center;border-top: 2rpx solid #E6E6E6;border-top: 1px solid rgb(230, 230, 230);display: flex;color: #999999;font-size: 22rpx;">
						<image :src="warnIng" style="width: 24rpx;height: 24rpx;margin-right: 9rpx;"></image>
						最小提现金额¥{{min_amount}}，提现手续费{{service_charge}}
					</view>
				</view>
			</li>


			<view class='hr'></view>
			<li>
				<text style="height: 90rpx;font-size: 30rpx;color: #020202;line-height:88rpx;">填写提现银行卡信息</text>
			</li>
			<li>
				<span>银行卡号</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入银行卡号" v-model="bank_number"
				       @input="_bank()" @blur='_bank_p'/>
			</li>
			<li>
				<span>开户银行</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入银行名称" v-model="bank_name"
				       @blur='_bank_p'/>
			</li>
			<li>
				<span>持卡人&nbsp;&nbsp;</span>
				<input placeholder-style="color: #b8b8b8;" type="text" placeholder="请输入持卡人姓名" v-model="user_name"
				       @blur="_usname()"/>
			</li>
			<li>
				<span>手机号&nbsp;&nbsp;</span>
				<input type="number" placeholder="请输入手机号" v-model="phone" disabled="true" readonly="readonly"/>
			</li>
			<li class="yz_li">
				<span>验证码&nbsp;&nbsp;</span>
				<input placeholder-style="color: #b8b8b8;" class='input' :class='{marginleft:display}' type="number"
				       placeholder="请输入手机验证码" v-model="input_code" style='flex: 1;'>

				<span class='color yz_span' v-if='display' @tap="_verif">获取验证码</span>
				<span class='active' v-if='!display'>
					{{count}}S后再次获取
				</span>

			</li>
		</ul>
		<div class='setup-buttom' @tap="_sumber">确认提现</div>
		<!-- <view id='setupButtomWrap' style="padding-top: 70upx;margin: 0;"></view> -->
	</div>
</template>

<script>
  import heads from '../../components/header.vue'
  import { telephone } from '../../common/landing.js'
  import { mapMutations } from 'vuex'
  import { getStorage } from '../../common/storage'

  export default {
    data () {
      return {
        pshd: '',
        type: '',
        title: '提现申请',
        put_mon: '',  //提现金额
        bank_number: '',
        bank_name: '',
        user_name: '',
        phone: '',
        input_code: '',
        display: true,
        count: '',
        timer: '',
        code: '',
        one_code: '',//手机号码格式正确返回值
        max_amount: '',//提现的最大金额
        min_amount: '',//提现的最小金额
        bank_information: '',//用户银行卡历史信息
        mobile: '',
        oldPhone: '',
        access_id: '',
        allComplete: false,
        fastTap: true,
        shop_id: '',
        money: '',
        warnIng: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/warnIng.png',

        service_charge: '',//提现手续费
      }
    },
    onLoad (option) {
      var self = this
      this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
      this.shop_id = uni.getStorageSync('shop_id') ? uni.getStorageSync('shop_id') : this.$store.state.shop_id
      this.type = option.type
      this._axios()
    },
    methods: {
      changeLoginStatus () {
        var me = this
        me.access_id = me.$store.state.access_id
        me._axios()
      },
      _axios () {
        var me = this
        var data = {
          module: 'app',
          action: 'user',
          app: 'into_withdrawals',
          access_id: this.access_id
        }
        if (this.type == 'store') {
          data.shop_id = this.$store.state.shop_id
        }
        uni.request({
          data,
          url: uni.getStorageSync('url'),
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            if (res.data.code == 200) {
              let { data: { data: { bank_information, pshd, max_amount, min_amount, money, mobile, service_charge } } } = res
              me.max_amount = max_amount
              me.min_amount = min_amount
              me.bank_information = bank_information
              me.mobile = mobile
              me.bank_number = me.bank_information.Bank_card_number ? me.bank_information.Bank_card_number : ''
              me.bank_name = me.bank_information.Bank_name ? me.bank_information.Bank_name : ''
              me.user_name = me.bank_information.Cardholder ? me.bank_information.Cardholder : ''
              me.phone = me.mobile ? me.mobile : ''
              // me.pshd=pshd
              me.pshd = '当前余额为' + money + '元'
              me.money = money

              me.service_charge = service_charge
            } else if (res.data.code == 115) {
              me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1')
            } else {
              uni.showToast({
                title: res.data.message,
                duration: 1500,
                icon: 'none'
              })
            }

          }
        })
      },
      back () {
        this.myforward('')
        this.mybacks('')
        uni.navigateBack({
          delta: 1
        })
      },
      //全部提现
      _put () {
        var me = this
        var mon = Number(this.max_amount)
        var monr = Number(this.put_mon)

        console.log(mon)
        console.log(this.min_amount)
        console.log(this.max_amount)
        if (this.money == 0) {
          uni.showToast({
            title: '您暂时没有可提现金额',
            duration: 1000,
            icon: 'none'
          })
        } else if (this.money > this.max_amount) {
          this.put_mon = this.max_amount
        } else {
          this.put_mon = this.money
        }
        // if(this.max_amount == 0){ // 当传过来的最多可提现金额为0时
        // 	uni.showToast({
        // 		title: "您暂时没有可提现金额",
        // 		duration: 1000,
        // 		icon:'none'
        // 	})
        // }else if(this.min_amount > this.max_amount){ // 当传过来的最多可提现金额小于最低提现金额时
        // 	uni.showToast({
        // 		title: "您暂时可提现金额小于最低提现金额",
        // 		duration: 1000,
        // 		icon:'none'
        // 	})
        // }else if(mon<this.min_amount||mon>this.max_amount){
        // 	uni.showToast({
        // 		title: "提现金额请在"+this.min_amount+"元-"+this.max_amount+"元之间",
        // 		duration: 1000,
        // 		icon:'none'
        // 	})
        // }else{
        // 	this.put_mon=this.max_amount
        // }
      },

      //金额格式判断
      _money () {
        var mon = Number(this.put_mon)
        var monrys = Number(this.min_amount)
        console.log(monrys)
        console.log('金额判断=' + mon)
        if (mon < monrys) {
          mon = 0
          this.put_mon = mon.toFixed(2)
          uni.showToast({
            title: `提现金额需大于${monrys}元,请重新输入!`,
            duration: 1000,
            icon: 'none'
          })
        } else if (mon > this.max_amount) {
          mon = 0
          this.put_mon = mon.toFixed(2)
          uni.showToast({
            title: '提现金额不能大于总金额，请重新输入!',
            duration: 1000,
            icon: 'none'
          })
        }
        this.put_mon = mon.toFixed(2)
        console.log(this.put_mon > 0)
      },
      //银行卡匹配
      _bank () {
        var self = this
        var pattern = /^([1-9]{1})(\d{5})$/
        if (pattern.test(self.bank_number)) {
          var data = {
            module: 'app',
            action: 'user',
            app: 'Verification',
            Bank_name: self.bank_name,
            Bank_card_number: self.bank_number
          }
          uni.request({
            data,
            url: self.$store.state.url,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              let { data: { code, message } } = res
              console.log(code, message)
              if (code != 200) {
                self.bank_number = ''
                uni.showToast({
                  title: '银行卡号输入错误，请重新输入！',
                  duration: 1000,
                  icon: 'none'
                })
              } else {
                self.bank_name = res.data.Bank_name
              }
            }
          })
        }
        if (this.bank_number == '') {
          this.bank_name = ''
        }
      },
      // 银行卡号输入完毕
      _bank_p () {
        var self = this
        var patt = /^[1-9]{1}\d{15}|\d{18}$/
        if (!patt.test(Number.parseInt(this.bank_number))) {
          uni.showToast({
            title: '请输入合法的银行卡号！',
            duration: 1000,
            icon: 'none'
          })
        } else {
          if (this.bank_name) {
            var data = {
              module: 'app',
              action: 'user',
              app: 'Verification',
              Bank_name: this.bank_name,
              Bank_card_number: this.bank_number
            }
            uni.request({
              data,
              url: self.$store.state.url,
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                let { data: { code, message } } = res
                console.log(code, message)

                if (code != 200) {
                  self.bank_number = ''
                  uni.showToast({
                    title: '银行卡号输入错误，请重新输入！',
                    duration: 1000,
                    icon: 'none'
                  })
                } else {
                  self.bank_name = res.data.Bank_name
                }
              }
            })
          }

        }
      },
      //持卡人验证
      _usname () {
        var self = this
        var name = /^[\u4e00-\u9fa5]{2,8}$/
        if (!name.test(self.user_name)) {
          self.user_name = ''
          uni.showToast({
            title: '请输入合法的姓名！',
            duration: 1000,
            icon: 'none'
          })
        }
      },
      /*   验证码发送1分钟倒计时     */
      _verif () {
        if (!this.fastTap) {
          return
        }
        this.fastTap = false
        this._telephone(this.phone)
        var me = this
        var data = {
          module: 'app',
          action: 'user',
          app: 'secret_key',
          phone: me.phone,
          message_type: 0, // 短信类型 0.验证码 1.短信通知
          message_type1: 6 // 短信类别 6.提现
        }
        if (me.phone) {
          uni.request({
            data,
            url: uni.getStorageSync('url'),
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              me.fastTap = true
              let { data: { code, message } } = res
              if (code != 200) {
                uni.showToast({
                  title: message,
                  duration: 1000,
                  icon: 'none'
                })
              } else if (code == 200) {
                me._time()
                me.one_code == 1
                me.oldPhone = me.phone
              }
              console.log(res)
            },
            error: function (err) {
              me.fastTap = true
            }
          })
        } else {
          me.fastTap = true
          uni.showToast({
            title: '请输入正确的手机号码！',
            duration: 1000,
            icon: 'none'
          })
        }
      },
      //1分钟倒计时
      _time () {
        const TIME_COUNT = 60
        if (!this.timer) {
          this.display = false
          this.count = TIME_COUNT
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.display = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      },
      //手机号码正则验证
      _telephone (value) {
        this.one_code = telephone(value)
      },
      //提交
      _sumber () {
        if (!this.fastTap) {
          return
        }
        this.fastTap = false
        console.log(this)
        var self = this
        var me = this
        var patt = /^([1-9]{1})(\d{15}|\d{18})$/

        if (this.put_mon && this.bank_number && this.user_name && this.one_code == 1 && this.input_code.length == 6 && this.bank_name && this.oldPhone == this.phone) {
          var data = {
            module: 'app',
            action: 'user',
            app: 'withdrawals',
            access_id: self.access_id,
            amoney: self.put_mon,
            Bank_name: self.bank_name,
            Bank_card_number: self.bank_number,
            Cardholder: self.user_name,
            // mobile:self.oldPhone,
            mobile: self.phone,
            keyCode: this.input_code,
          }
          if (this.type == 'store') {
            data.shop_id = this.shop_id
          }
          uni.request({
            data,
            url: uni.getStorageSync('url'),
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (response) {
              console.log(response)
              var message = response.data
              if (message.code == 200) {
                uni.showToast({
                  title: '提现申请成功！',
                  duration: 1000,
                  icon: 'none'
                })
                setTimeout(function () {
                  me.fastTap = true
                  uni.redirectTo({ url: 'rechargeSuccess?id_name=' + self.bank_name + '&id_catd=' + self.bank_number + '&id_monsy=' + self.put_mon + '&store=true' })
                }.bind(self), 1000)
              } else if (message.code != 200) {
                me.fastTap = true
                uni.showToast({
                  title: response.data.message,
                  duration: 1000,
                  icon: 'none'
                })
              }
            },
            error: function (err) {
              me.fastTap = true
            }
          })
        } else if (this.one_code != 1) {
          uni.showToast({
            title: '请先获取验证码！',
            duration: 1000,
            icon: 'none'
          })
          me.fastTap = true
        } else if (this.oldPhone != this.phone) {
          uni.showToast({
            title: '手机号码输入不一致,请确认后提交！',
            duration: 1000,
            icon: 'none'
          })
          me.fastTap = true
        } else {
          setTimeout(function () {
            uni.showToast({
              title: '请填写完整信息！',
              duration: 1000,
              icon: 'none'
            })
            me.fastTap = true
          }, 1500)
        }
      }
    },
    components: {
      heads
    }
  }
</script>

<style scoped lang="less">
	@import url("../../static/css/myWallet/putForward");
</style>