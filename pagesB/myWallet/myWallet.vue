<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus" ></lktauthorize>
		<heads :title='title'></heads>
		<div class='wallet_account_box'>
			<div class='position'>
				<div class='wallet_account'>
					<div class='wallet_account_bg'>
						<img class='img' :src="qbkp">
					</div>
					<p class='wallet_ct'>{{user_money}}</p>
					<p class='wallet_xt'>账户余额（{{unit}}）</p>
					<div class='wallet_r'>
						<div class='wallet_border' @tap="_navigateTo('recharge')">
							<img :src="qbcz" />
							<span>充值</span>
						</div>
						<div @tap="_tixian()">
							<img :src="qbtx" />
							<span>提现</span>
						</div>
					</div>
				</div>
				<p class='wallet_my'>钱包明细</p>
			</div>
		</div>
		<ul class='overflow' ref='wallet'>
			<li class='wallet_mx' v-for='(item,index) in list' :key="index">
				<div>
					<p class='wallet_value'>{{type[item.type].value}}</p>
					<p class='wallet_size'>{{item.add_date}}</p>
				</div>
				<p class='wallet_zhi'><span v-text="item.type==1||item.type==5||item.type==13||item.type==14||item.type==19||item.type==20||item.type==22||item.type==23||item.type==27||item.type == 30?'+':'-'"></span>{{item.money}}</p>
			</li>
		</ul>
		<uni-load-more v-if="list.length>10" :loadingType="loadingType" ></uni-load-more>
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	import { getStorage } from '../../common/storage'
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default{
		data(){
			return{
				qbkp:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/qbkp.jpg',
				qbcz:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/qianbaochongzhi2x.png',
				qbtx:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/qianbaotixian2x.png',
				title:'我的钱包',
				access_id:'',
				list:'',//全部记录
				user_money:'',
				page: 1, //加载页面
				allLoaded: false,
				autoFill: false, //若为真，loadmore 会自动检测并撑满其容器
				bottomStatus: '',
				bottomPullText: '上拉加载更多...',
				bottomDropText: '释放更新...',
				loading: false,
				starts:"",
				unit:'元',
				type:[
					{0:'0'},
					{value:'充值'},{value:'申请提现'},{value:'分享'},{value:'余额消费'},{value:'退款'},
					{value:'红包提现'},{value:'佣金'},{value:'管理佣金'},{value:'待定'},{value:'消费金'},
					{value:'系统扣款'},{value:'给好友转余额'},{value:'转入余额'},{value:'系统充值'},{value:'系统充积分'},
					{value:'系统充消费金'},{value:'系统扣积分'},{value:'系统扣消费金'},{value:'消费金解封'},{value:'抽奖中奖'},
					{value:'提现成功'},{value:'提现失败'},{value:'取消订单'},{value:'分享获取红包'},
					{value:'未知'},{value:'上交竞拍押金'},{value:'退竞拍押金'},{value:'售后（仅退款）'},{value:'售后（退货退款）'},
					{value:'会员返现'},
				],
				loadingType:0,
			}
		},
		onLoad(){
			this.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):this.$store.state.access_id
		},
		mounted() {
			var me = this;
			me.$nextTick(function(){
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1',function(){
					me.access_id = uni.getStorageSync('access_id')?uni.getStorageSync('access_id'):me.$store.state.access_id
					me._axios()
				});
			});
		},
		onReachBottom() {
			if (this.loadingType != 0) {
				return;
			}
			console.log(this.loadingType)
			this.loadingType = 1;
			var me = this
			var data = {
				module: 'app',
				action: 'user',
				app: 'wallet_detailed',
				page: this.page,
				access_id: this.access_id,
			}
			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					console.log(res)
					let {data:{code,list}}=res
					me.page += 1
					if(list.length > 0) {
						me.list = me.list.concat(list);
						me.loadingType=0;
					} else {
						me.loadingType =2;
					}
				}
			})
		},
		computed:{
			halfWidth:function() {
				var gru=uni.getStorageSync('data_height')?uni.getStorageSync('data_height'):this.$store.state.data_height
				var heigh=parseInt(gru)
				var he=heigh*2
				return uni.upx2px(he) + 'px';
			},
			h5Height:function(){
				var height
				// #ifdef H5
					height=uni.upx2px(0)+'px'
				// #endif
				// #ifdef MP-WEIXIN
					height=uni.upx2px(0)+'px'
				// #endif
				// #ifdef APP-PLUS
					height=uni.upx2px(44)+'px'
				// #endif
				return height
			},
		},
		methods:{
			changeLoginStatus(){
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			_navigateTo(url){
				uni.navigateTo({
					url:url,
				})
			},
			handleBottomChange(status) {
				console.log(status)
				this.bottomStatus = status;
			},
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'user',
					app: 'details'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(res){
						if(res.data.code==200){
							let {data:{unit,user_money,code,list}} = res
							me.list =list
							me.user_money =user_money
							me.starts=res.data.status
							me.unit = unit
						}
						else{
							uni.showToast({
								title:res.data.message,
								duration:1500,
								icon:'none'
							})
						}
						console.log(res)
					}
				})
			},
			_tixian(){
				if(this.starts==0){
					uni.navigateTo({url:'putForward'})
				}else if(this.starts==1){
					uni.showToast({
						title: '已有一笔提现申请中',
						duration: 1000,
						icon:'none',
					})
				}
			}
		},
		components:{
			heads,
			uniLoadMore
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myWallet/myWallet.css");
</style>