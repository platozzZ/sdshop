<template>
	<div>
		<lktauthorize ref="lktAuthorizeComp" v-on:pChangeLoginStatus="changeLoginStatus"></lktauthorize>
		
		<heads :title='title'></heads>
		
		<ul class="yh-ul">
			
			<li class='myMessage_title' @tap="choiceImg">
				<p>头像设置</p>
				<div class='myMessage_right'>
					<img class='myMessage_img' :src="img" />
					<img class='arrow' :src="jiantou" />
				</div>
			</li>
			
			<li class='myMessage_name' @tap="_myname">
				<p>我的昵称</p>
				<div>
					<span>{{name}}</span>
					<img class='arrow' :src="jiantou" />
				</div>
			</li>
			
			<!-- #ifndef MP-ALIPAY -->
			<li class='myMessage_name'>
				<p>出生日期</p>
				<div>
					<picker class='picker_ yh-picker' mode="date" :disabled='birth_flag' start="1900-01-01" end="2050-01-01" @change="changeData">
						<view v-if="!is_birth" style="opacity: 1;" @tap='_toast'>请选择日期</view>
						<view v-if="is_birth">{{user_birth}}</view>
					</picker>
					<img class='arrow' :src="jiantou" />
				</div>
			</li>
			<!-- #endif -->
			
		</ul>
		
		<div class='mask' v-if="mask_display">
			<div class='mask_cont'>
				<p>修改昵称</p>
				<input type="text" v-model="new_name" />
				<div class='mask_button'>
					<div class='mask_button_left' @tap="_cancel">取消</div>
					<div @tap="_confirm">确认</div>
				</div>
			</div>
		</div>
		
		<!-- 判断交过押金提示弹框 -->
		<div class="bid_pup" v-if="showEndFlag">
			<div class="bid_pup_flex">
				<div class="bid_pup_auto">
					<div class="end_tishi">提示</div>
					<div class="end_content">
						<div class="yh-sr">生日只可以设置一次，是否继续修改？</div>
					</div>
					<div @tap="closeEndFlag('cancel')" class="end_btn yh-end_btns">取消</div>
					<div @tap="closeEndFlag('go')" class="end_btn yh-end_btnb">确定</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import heads from '../../components/header.vue'
	export default {
		data() {
			return {
				jiantou: this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL + 'images/icon1/jiantou2x.png',
				title: '我的信息',
				name: '',
				new_name: '',
				mask_display: false,
				img: '', //头像
				access_id: '',
				imgsrc: '',
				show: '',
				src_img: '',
				fastTap: true,
				user_birth: '',
				is_birth: false, //日期是否为空 fasle 空
				showEndFlag: false, //弹出框  false-不弹出  true-弹出
				birth_flag: true

			}
		},
		onLoad() {
			var me = this;
			this.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : this.$store.state.access_id
			me._axios()
		},
		mounted() {
			var me = this;
			me.$nextTick(function() {
				console.log(me.$refs)
				me.$refs.lktAuthorizeComp.handleAfterAuth(me, '../login/login?landing_code=1', function() {
					me.access_id = uni.getStorageSync('access_id') ? uni.getStorageSync('access_id') : me.$store.state.access_id
					me._axios()
				});
			});
		},
		methods: {
			/**
			 * 
			 * */ 
			_toast() {
				if (this.user_birth == '-0001-11-30' && this.birth_flag) {
					this.showEndFlag = true;
				}
			},
			/**
			 * 
			 * */ 
			changeData(e) {
				var me = this
				var data = {
					module: 'app',
					action: 'user',
					app: 'set_user',
					access_id: me.access_id,
					birthday: e.detail.value
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						me.fastTap = true
						console.log(res)
						if (res.data.code == 200) {
							me.mask_display = false
							me.user_birth = e.detail.value
							me.is_birth = true
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
					error: function(err) {
						me.fastTap = true
					}
				})

			},
			/**
			 * 弹框提示按钮处理
			 * */ 
			closeEndFlag(flag) {
				var me = this
				if (flag == 'cancel') {
					me.showEndFlag = false
					return false

				} else {
					me.showEndFlag = false
					me.birth_flag = false
				}

			},
			/**
			 * 
			 * */ 
			changeLoginStatus() {
				var me = this;
				me.access_id = uni.getStorageSync("access_id");
				me._axios();
			},
			/**
			 * 
			 * */ 
			_axios() {
				var me = this
				var data = {
					access_id: this.access_id,
					module: 'app',
					action: 'user',
					app: 'index'
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: function(res) {
						if (res.data.code == 200) {
							me.name = res.data.data.user.user_name
							me.img = res.data.data.user.headimgurl
							me.user_birth = res.data.data.user.birthday

							if (me.user_birth != '-0001-11-30') {
								me.is_birth = true
							} else {
								me.is_birth = false
							}

						} else {
							uni.showToast({
								title: res.data.message,
								duration: 1500,
								icon: 'none'
							})
						}
					},
				})
			},
			/**
			 * 
			 * */ 
			_myname() {
				this.mask_display = true
			},
			/**
			 * 
			 * */ 
			_confirm() {
				var me = this
				console.log(this.new_name.length)
				if (this.new_name.length > 6) {
					uni.showToast({
						title: '昵称最长只能六位！',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				if (this.name && this.new_name != '') {
					if(this.name == this.new_name){
						uni.showToast({
							title: '昵称已存在，请重新输入！',
							icon: 'none'
						})
						return
					}
					if (!this.fastTap) {
						return
					}
					this.fastTap = false
					var me = this
					var data = {
						module: 'app',
						action: 'user',
						app: 'set_user',
						access_id: this.access_id,
						Nickname: this.new_name
					}
					uni.request({
						data,
						url: uni.getStorageSync("url"),
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: function(res) {
							me.fastTap = true
							console.log(res)
							let {
								data: {
									code,
									message
								}
							} = res
							if (code == 200) {
								me.name = me.new_name
								me.mask_display = false
							} else {
								uni.showToast({
									title: message,
									duration: 1500,
									icon: 'none'
								})
							}
						},
						error: function(err) {
							me.fastTap = true
						}
					})
				} else {
					console.log(89789)
					uni.showToast({
						title: '请输入昵称！',
						icon: 'none',
						duration: 1000
					});
				}
			},
			/**
			 * 
			 * */ 
			_cancel() {
				this.mask_display = false
			},
			/**
			 * 
			 * */ 
			choiceImg() {
				var me = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						console.log(res)
						uni.uploadFile({
							url: uni.getStorageSync("url"),
							filePath: res.tempFilePaths[0],
							// #ifdef MP-ALIPAY
							fileType: "image",
							// #endif
							name: 'file',
							formData: {
								access_id: me.access_id,
								src_img: res.tempFilePaths[0],
								module: 'app',
								action: 'user',
								app: 'set_user',
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data)
								let {
									code,
									message
								} = data
								console.log(data)
								if (code == 200) {
									uni.showToast({
										title: '上传成功',
										duration: 1500,
										icon: 'none'
									})
									me._axios()
								} else {
									uni.showToast({
										title: message,
										duration: 1500,
										icon: 'none'
									})
								}
							}
						});
					}
				});
			}
		},
		components: {
			heads
		}

	}
</script>

<style scoped>
	@import url("../../static/css/my/myInfo.css");
</style>
