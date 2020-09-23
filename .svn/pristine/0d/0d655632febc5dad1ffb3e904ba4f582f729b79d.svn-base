<template>
	<div class='container' :style="'background-image:url('+kill_bg+')'">
		<div style='position: relative;'>
			<heads :title='title' navWhite='true' ishead_w="1"></heads>

			<!-- #ifndef MP -->
			<div class="seckill_disc" @tap='_toGradeUse(true)'>
				<image :src="seckill_rule" class='seckill_rule'></image>
				<p>秒杀规则</p>
			</div>
			<!-- #endif -->
		</div>
		<!-- #ifdef MP -->
		<div class="seckill_disc1" >
			<image :src="seckill_rule" class='seckill_rule' @tap='_toGradeUse(true)'></image>
			<p @tap='_toGradeUse(true)'>秒杀规则</p>
		</div>
		<!-- #endif -->
		<scroll-view scroll-x="true" :scroll-into-view="scroll_index" scroll-with-animation="true">
			<ul class='title_list' :style="'width:'+(20*t_list.length || 100)+'vw'">
				
				<li :id="'scroll_' + index" @tap='_change(index,item)' :class="{'active':index == t_index}" v-for='(item,index) in t_list' :key='index'>
					<span>{{item.title}}</span>
					<span v-if='item.type == 1' class='new_1'>抢购中</span>
					<span v-else-if='item.type == 2' class='new_2'>即将开抢</span>
					<span v-else-if='item.type == 0' class='new_2'>已结束</span>
				</li>
				
			</ul>
		</scroll-view>

		<view class="content-ul">
			<view class="content-ul-li content-ul-li-head p-s d-f a-c j-sb">
				<text>
					{{ type === 0? '秒杀已结束': type === 1? '抢购中，先抢先得': type === 2?'即将开抢，先抢先得': '秒杀已结束' }}
				</text>
				<view class="time-box">
					<text>
						{{ type === 0? '': type === 1? '抢购中': type === 2?'距开始': '已结束' }}
					</text>
					
					<template v-if="type !== 0">
						<text>{{ time.hours   || '00'}}:</text>
						<text>{{ time.minutes || '00'}}:</text>
						<text>{{ time.seconds || '00'}}</text>
					</template>

				</view>
			</view>

			<template v-if="!list.length">
				<view class="content-ul-li ul-li-empty d-f a-c j-c fd-c">
					<image :src="empty_bg"></image>
					<view>
						该时段暂无秒杀商品哦~
					</view>
				</view>
			</template>
			<template v-else>
				<view class="content-ul-li item d-f a-c" v-for="(item,index) in list" :key="index">
					<image class="item-img" :src="item.imgurl || ''"></image>

					<view class="item-body">
						<view class="item-body-title ">
							{{ item.product_title || item.pro_id }}
						</view>

						<view>
							<text class="item-progress">
								<text class="item-progress-text" :style="item.progress"></text>
								<text class="item-progress-title">{{ item.per }}%</text>
							</text>
							<text class="item-num">已抢<text style="color: #FF3333;">{{ item.max_num - item.num }}</text>件</text>
						</view>

						<view class="d-f j-sb a-c">
							<view class="">

								<view class="a-money">
									￥{{ item.seconds_price || 0 }}
								</view>

								<view class="b-money">
									￥{{ item.price || 0 }}
								</view>

							</view>

							<view class="o-btn d-f j-c a-c" v-if="item.type === 1" :class="{ jg: item.per === 100  }" @tap="_go_details(item)">
								立即抢购
							</view>
							
							<view class="o-btn d-f j-c a-c jg" v-if="item.type === 0" @tap="_go_details(item)">
								已结束
							</view>
							
							<view class="o-btn d-f j-c a-c jg" v-if="item.type === 2" @tap="_go_details(item)">
								即将开抢
							</view>

						</view>
					</view>
				</view>
			</template>
		</view>
		
		<!-- 规则 -->
		<ruleModal v-model="isShow" @click="_toGradeUse" title="使用规则" :details="content" />
	</div>
</template>

<script>
	import Heads from '../../components/header.vue'
	import ruleModal from '@/components/ruleModal.vue'
	import htmlParser from '@/common/html-parser.js'
	import { getTimeDiff } from '@/common/util.js'
	import {
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				title: '限时秒杀',
				access_id: '',
				t_list: [],
				type: 0,
				kill_bg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon/kill_bg.png',
				seckill_rule: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/seckill_rule.png',
				empty_bg: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/emptybg.png',
				t_index: 0,
				page: 1,
				list: [],
				id: '', //已选中时间段的id
				navType: 0, //列表类型 0 已结束 1 进行中 2即将开始
				scroll_index: 'scroll_0',
				isShow: false,
				content: '',
				rule: '',
				time: {
					hours:'00',
					minutes:'00',
					seconds:'00'
				}
			}
		},
		onLoad(option) {
			let me = this;
			me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
			me._axios(me.id);
			clearInterval(this.Intervalid)
		},
		onShow() {
			// 页面显示的时候，运行定时器
			
			// this._setTime()
		},
		computed: {
			halfWidth: function() {
				console.log(5)
				var gru = uni.getStorageSync('data_height') ? uni.getStorageSync('data_height') : this.$store.state.data_height
				var heigh = parseInt(gru)
				var he = heigh * 2
				return uni.upx2px(he) + 'px';
			},
		},
		components: {
			Heads,
			ruleModal
		},
		onUnload() {
			clearInterval(this.Intervalid)
		},
		watch: {
			// t_index:function(val){
			// 	console.log(val)
			// 	this.setCountDown(this.t_list[val])
			// 	this.type = this.t_list[val].type
			// }
		},
		methods: {
			...mapMutations({
				setseckilldata: 'setseckilldata',
			}),
			timeFun(endtime,item){
				let result = getTimeDiff(endtime)
				
				this.time.hours   = result.hours
				this.time.minutes = result.minutes
				
				if(result.seconds.toString().indexOf('-') !== -1){
					if(item.type === 1 || item.type === 2){
						this._axios();
						return 
					}
					
					
				}
				this.time.seconds = result.seconds
				
				this.time = this.time
			},
			/**
			 * 倒计时
			 * */ 
			setCountDown: function(item){
				clearInterval(this.Intervalid)
				
				let year = new Date().getFullYear()
				let month = new Date().getMonth() + 1
				let dates = new Date().getDate()
				let endtime = ''
				
				if(item.type == 2){
					endtime = `${ year }-${ month }-${ dates } ${ item.starttime }`
				} else {
					endtime = `${ year }-${ month }-${ dates } ${ item.endtime }`
				}
				
				this.timeFun(endtime,item)
				
				this.Intervalid = setInterval(() => {
					
					this.timeFun(endtime,item)
					
					
				},1200)
				
			},
			_axios(id) {
				
				var me = this;
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'seckill',
					m: 'seckillhome',
					page: me.page,
					id
				}

				this.$req.post({
					data
				}).then(res => {
					let {
						code,
						list,
						rule,
						time_list,
						msg
					} = res

					if (code === 200) {
						
						
						this.content = rule
						this.list = list
						this.rule = rule
						
						if(list.length){
							for(let i in list){
								list[i].progress = me._progress(list[i])
								
								let result = 100 - parseInt( (list[i].max_num - list[i].num) / list[i].max_num*100)
								// if(result === 0){
								// 	result = 100
								// }
								
								list[i].per = result
							}
						}

						if (!id) {
							this.t_list = time_list
							
							for (let i = 0; i < me.t_list.length; i++) {
								// 如果找到了开抢中的哪一列
								if (me.t_list[i].type == 1) {
									
									setTimeout(() => {
										me._change(i, me.t_list[i])
									}, 100)
									return
								}
							}
							
							// 如果没有进行中的活动
							me._change(0, me.t_list[0])
						}
						
						return
					}

					uni.showToast({
						title: res.message || msg,
						duration: 1500,
						icon: 'none'
					})
				})
			},
			// 查看秒杀商品
			_go_details(item) {
				var me = this

				if (item.num <= 0) {
					uni.showToast({
						title:"手速慢了哦，已经被抢完了！",
						icon:"none"
					})
					return false;
				}
				
				this.setseckilldata(item)
				
				uni.navigateTo({
					url: '../seckill/seckill_detail?pro_id=' + item.pro_id + '&navType=' + item.type + '&id=' + item.id
				});
			},
			// 选择时段
			_change(index, item) {
				var me = this;
				
				me.t_index = index
				
				if (item.type == 1) {
					me.navType = 0
				} else if (item.type == 2) {
					me.navType = 1
				}
				
				me.setCountDown(item)
				me.type = item.type

				me.id = item.id
				me._axios(me.id);
				
				me.scroll_index = 'scroll_' + index
			},
			// 提醒
			_remind(item) {
				item.setremind = item.setremind == 1 ? 0 : 1
				var me = this;
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'seckill',
					m: 'setremind',
					activity_id: item.activity_id,
					pro_id: item.pro_id,
					time_id: item.time_id,
					type: item.setremind
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						console.log(res)
						if (res.data.code != 200) {
							item.setremind = item.setremind == 1 ? 0 : 1
						}
						uni.showToast({
							title: res.data.message,
							duration: 1500,
							icon: 'none'
						})
					},
					error: function(err) {
						console.log(err)
					}
				})
			},
			// 剩余时间，距结束的时间
			_remain_time(item, type) {

				// item.lefttime 距结束的时间  item.totaltime 总持续时间
				var timeStr = ""; //转换后的时间字符串
				var secondTime = item.lefttime; //剩余时间的秒数
				var minuteTime = "0"; //剩余时间的分钟数
				var hourTime = "0"; //剩余时间的小时数
				//如果秒数大于60，将秒数转换成整数

				if (secondTime > 60) {
					//获取分钟，除以60取整数，得到整数分钟
					minuteTime = parseInt(secondTime / 60);

					//获取秒数，秒数取佘，得到整数秒数
					secondTime = parseInt(secondTime % 60);

					//如果分钟大于60，将分钟转换成小时
					if (minuteTime > 60) {
						//获取小时，获取分钟除以60，得到整数小时
						hourTime = parseInt(minuteTime / 60);

						//获取小时后取佘的分，获取分钟除以60取佘的分
						minuteTime = parseInt(minuteTime % 60);

					}
				}
				if (type == 1) {

					return hourTime < 10 ? ("0" + hourTime) : hourTime

				} else if (type == 2) {

					return minuteTime < 10 ? ("0" + minuteTime) : minuteTime
				} else if (type == 3) {

					return secondTime < 10 ? ("0" + secondTime) : secondTime
				}
			},
			_progress(item) {
				// 计算进度条
				// var time=item.totaltime-item.lefttime
				// var progress=time/item.totaltime*100
				// if(progress>100){
				// 	progress=100
				// }
				// return `width:${progress}%`
				let result = 100 - parseInt( (item.max_num - item.num) / item.max_num*100)
				// if(result === 0){
				// 	result = 100
				// }
				// 剩余数量进度条
				return `width:${ result }%`
			},
			_setTime() {
				var me = this
				// 清除定时器，以免有多个定时器存在
				clearTimeout(me.settime)
				me.settime = setTimeout(() => {
					// 给每一项秒杀定时
					for (let i = 0; i < me.list.length; i++) {
						
						if (me.list[i].lefttime > 0) {
							me.list[i].lefttime--
							me.list[i].count_hour = me._remain_time(me.list[i], 1)
							me.list[i].count_min = me._remain_time(me.list[i], 2)
							me.list[i].count_s = me._remain_time(me.list[i], 3)
							me.list[i].progress = me._progress(me.list[i])
						}
						
						if (me.list[i].lefttime == 0) {
							me._axios(me.id)
						}
					}
					me._setTime()
				}, 1000);
			},
			_toGradeUse(is) {
				var me = this
				if (is) {
					this.content = htmlParser(me.rule)
					this.isShow = !this.isShow
				} else {
					this.isShow = !this.isShow
				}
			},
		}
	}
</script>

<style scoped>
	@import url("../../static/css/seckill/seckill.css");
</style>
