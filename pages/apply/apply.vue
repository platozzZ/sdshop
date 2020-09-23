<template>
	<view class="apply">
		<view v-html="apply" style="background-color: #ff0000;"></view>
		<!-- <view class="">
			<form id="alipaysubmit" name="alipaysubmit" action="https://openapi.alipay.com/gateway.do?charset=UTF-8" method="POST">
				<input type="hidden" name="biz_content"
					value="{&quot;body&quot;:&quot;\u8d8a\u91cee\u65cf&quot;,&quot;subject&quot;:&quot;\u8d8a\u91cee\u65cf&quot;,&quot;out_trade_no&quot;:&quot;1596528106000000078548&quot;,&quot;timeout_express&quot;:&quot;30m&quot;,&quot;total_amount&quot;:1868,&quot;product_code&quot;:&quot;QUICK_MSECURITY_PAY&quot;}"
				/>
				<input type="hidden" name="app_id" value="2019080366084792" />
				<input type="hidden" name="version" value="1.0" />
				<input type="hidden" name="format" value="json" />
				<input type="hidden" name="sign_type" value="RSA2" />
				<input type="hidden" name="method" value="alipay.trade.wap.pay" />
				<input type="hidden" name="timestamp" value="2020-08-04 16:01:46" />
				<input type="hidden" name="alipay_sdk" value="alipay-sdk-php-easyalipay-20190926" />
				<input type="hidden" name="notify_url" value="http://zyjd-api.fblife.com/pay/alipayCallback" />
				<input type="hidden" name="charset" value="UTF-8" />
				<input
					type="hidden"
					name="sign"
					value="ZAoLs4P/Zynjqm6iey0mw1zJfrolA+IbOijIR8ezbK0OcnVUjQ59IaheY7wxjWEX4LuSDLCP2qnuxuFygK6shoSv3h3xFh77iP4dsZ1d3r3vTKEqn2B3IWdVfIn56ZcpmHvukvUdVg51AembV1aeOfQYpH37TAAVTYvOAvuCjeOw2Q9Kx02pAvuKVAA8iki58N8sFUk0J7F+UFC8ESphUPWtO15v9qsMuNKkl6M7jj89HfsaGoLSg9Fq/e5dZdksqxhBEnHlUIbpcoABOL84WdEVPQjUDyj622bWqkLD6b6ew/P/ph1v3Yih+w1f3biwXM52mjmhU0oyxctb5GR/zA=="
				/>
				<input type='submit' value='ok' style='display:none;'>
			</form>
		</view> -->
	</view>
</template>
<script>
export default {
	name: 'apply',
	data() {
		return {
			apply: ''
		};
	},
	onLoad() {
		console.log('alipay-onload');
	},

	mounted() {
		console.log('alipay');
		let form = this.$route.query.htmls
		
		this.apply = form;
		console.log(form);
		// setTimeout(() => {
		//     document.forms[0].submit();
		// }, 100);
		this.$nextTick(()=> {
			console.log('$nextTick');
		    document.forms[0].submit();//自动执行表单提交事件
		})
	}
};
</script>

<style></style>
