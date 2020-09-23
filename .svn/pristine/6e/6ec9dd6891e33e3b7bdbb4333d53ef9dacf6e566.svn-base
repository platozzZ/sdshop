<template>
	<div>
		<heads :title='title'></heads>
		<div class='success_head'>
			<img :src="gouhei"  />
			<p class='success_title'>{{title_p}}</p>
			<p class='success_title_disc' v-show="isBankCard">加速审核中，请耐心等待</p>
		</div>
		<div class='hr'></div>
		<ul>
			<li v-if='type'>
				<p>{{card}}</p>
				<div>
					<span>{{back}}</span>
				</div>
			</li>
			<li v-else v-show="isBankCard">
				<p>{{card}}</p>
				<div>
					<span>{{back}}</span>
					<span>尾号（{{back_number}}）</span>
				</div>
			</li>
			<li>
				<p>{{text_p}}</p>
				<p>￥{{money}}</p>
			</li>
		</ul>
		<div class='go_shopping' @tap="_toHome()">返回首页</div>
		<div v-if='!store' class="look_order" @tap="_back()">返回钱包</div>
		<div v-else class="look_order" @tap="_back1()">返回店铺</div>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import {getStorage} from '../../common/storage.js'
	export default{
		data(){
			return{
				gouhei:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/gouhei2x.png',
				type:'',
				title:'',
				title_p:'',
				text_p:'',
				card:"",
				back:"",
				back_number:"",
				money:"",
				flag:true,
				store:false,
				isBankCard: false,	//是否是银行卡支付
			}
		},
		components:{
			heads
		},
		onLoad(option) {
			// option.type = this.way
			var str=option.id_catd
			this.money=option.money;
			this.type = option.type;
			this.type = option._type;
			if(option._type == 'wx' ){
				this.isBankCard = false;
			}
			
			if(this.type == undefined) {
				this.type = option._type;
			}
			if(option.mylei==1){
				this.title="充值成功"
				this.title_p="充值成功"
				this.text_p="充值金额"
				if(this.type){
					this.card="充值方式"
					if(this.type=='wx'){
						this.back='微信支付'
						this.isBankCard = false;
					}else if(this.type=='alipay'){
						this.back='支付宝支付'
						this.isBankCard = false;
					}
				}
				else{
					this.card="储蓄卡"
				}
			}else{
				this.isBankCard = true;
				this.title="提现申请"
				this.title_p="提现申请提交成功"
				this.text_p="提现金额"
				this.card="储蓄卡"
				this.back=option.id_name
				this.back_number=str.substr(str.length-4)
				this.money=option.id_monsy
			}
		},
		mounted() {
			var self = this;
		},
		methods:{
			_toHome(){
				uni.switchTab({
					url:'../../pages/tabBar/home'
				})
			},
			_back(){
				this.flag=false
				uni.navigateBack({
					delta: 1
				})
			},
			_back1(){
				this.flag=false
				uni.navigateBack({
					delta:3
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myWallet/rechargeSuccess.css");
</style>