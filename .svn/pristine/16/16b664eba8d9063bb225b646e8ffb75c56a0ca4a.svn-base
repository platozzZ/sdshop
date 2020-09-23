/*分销中心
/*佣金明细*/
/*提现*/
	// 金额格式判断
	export function lkt_back(me) {
		var mon = Number(me.put_mon)
		var monrys = Number(me.min_amount)
		console.log(mon+"==="+monrys)
		if(mon<monrys){
			mon = 0
			me.put_mon = mon.toFixed(2)
			uni.showToast({
				title: `提现金额需大于${monrys}元,请重新输入!`,
				duration: 1000,
				icon:'none'
			})
		}else if(mon>me.max_amount){
			mon = 0
			me.put_mon = mon.toFixed(2)
			uni.showToast({
				title: '提现金额不能大于总金额，请重新输入!',
				duration: 1000,
				icon:'none'
			})
		}else{
			mon = mon
		}
		me.mon_kc = mon.toFixed(2)
		console.log(me.put_mon>0)
	}
	//银行卡匹配
	export function lkt_bank(self){
		var pattern=/^([1-9]{1})(\d{5})$/;
		if(pattern.test(self.bank_number)){
			var data = {
				module: 'app',
				action: 'user',
				app: 'Verification',
				Bank_name:self.bank_name,
				Bank_card_number:self.bank_number
			}
			uni.request({
				data,
				url:uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					console.log(res)
					let {data:{code,message}} = res
					console.log(code,message)
					if(code!=200){
						self.bank_number = ''
						uni.showToast({
							title: '银行卡号输入错误，请重新输入！',
							duration: 1000,
							icon:'none'
						})
					}else{
						self.bank_name=res.data.Bank_name
					}
				}
			});
		}
		if(self.bank_number==''){
			self.bank_name=''
		}
	}
	//获取银行名称
	export function lkt_bank_p(self){
		var patt=/^[1-9]{1}\d{15}|\d{18}$/
		if(!patt.test(self.bank_number)){
			self.bank_name = ''
			self.bank_number = ''
			uni.showToast({
				title: '请输入合法的银行卡号！',
				duration: 1000,
				icon:'none'
			})
		 }
		 else{
			var data = {
				module: 'app',
				action: 'user',
				app: 'Verification',
				Bank_name:self.bank_name,
				Bank_card_number:self.bank_number
			}
			uni.request({
				data,
				url:uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					console.log(res)
					let {data:{code,message}} = res
					console.log(code,message)
					
					if(code!=200){
						self.bank_number = ''
						uni.showToast({
							title: '银行卡号输入错误，请重新输入！',
							duration: 1000,
							icon:'none'
						})
					}else{
						self.bank_name=res.data.Bank_name
					}
				}
			})
		}
	}
	//获取短信验证码
	export function lkt_getcode(me){
		if(!me.fastTap){
			return
		}
		me.fastTap=false
		me._telephone(me.phone)
		var data = {
			module: 'app',
			action: 'user',
			app: 'secret_key',
			phone:me.phone
		}
		if(me.phone){
			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					me.fastTap=true
					let {data: {code,message}} = res
						if(code!=200) {
							uni.showToast({
								title: message,
								duration: 1000,
								icon:'none'
							})
						} else if(code == 200) {
							me._time()
							me.one_code==1
							me.oldPhone=me.phone
						}
					console.log(res)
				},
				error:function(err){
					me.fastTap=true
				}
			})
		}else{
			me.fastTap=true
			uni.showToast({
				title: '请输入正确的手机号码！',
				duration: 1000,
				icon:'none'
			})
		}
	}
	//1分钟倒计时
	export function lkt_time(self){
		const TIME_COUNT = 60;
		if(!self.timer) {
			self.display = false;
			self.count = TIME_COUNT;
			self.timer = setInterval(() => {
				if(self.count > 0 && self.count <= TIME_COUNT) {
					self.count--;
				} else {
					self.display = true;
					clearInterval(self.timer);
					self.timer = null;
				}
			}, 1000)
		}
	}
	//申请提现
	export function lkt_submit(me){
		if(!me.fastTap){
			return
		}
		me.fastTap=false
		console.log(me.put_mon,me.bank_number,me.user_name,me.one_code==1,me.input_code.length==6,me.bank_name)

		var patt=/^([1-9]{1})(\d{15}|\d{18})$/;
		
		if(me.put_mon&&me.bank_number&&me.user_name&&me.bank_name&&me.branch){
				var data={
					module: 'app',
					action: 'commcenter',
					app: 'withdrawals',
					access_id:me.access_id,
					amoney:me.put_mon,//提现金额
					Bank_name:me.bank_name,// 银行名称
					branch:me.branch,// 支行名称
					Bank_card_number:me.bank_number,// 银行卡号
					Cardholder:me.user_name,// 持卡人
					mobile:me.phone,//手机号码
					code:me.input_code//验证码
				}
				uni.request({
					data,
					url: uni.getStorageSync("url"),
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					method:'POST',
					success:function(response){
						console.log(response)
						var message =response.data
						if(message.code == 200) {
							uni.showToast({
								title: '提现申请成功！',
								duration: 1000,
								icon:'none'
							})
							setTimeout(function() {
								me.fastTap=true
								uni.navigateTo({
									url:'./distribution_result?txId='+message.withdraw_id
								})
							}.bind(me), 1000)
							
						}else if(message.code !=200){
							me.fastTap=true
							uni.showToast({
								title: response.data.message,
								duration: 1000,
								icon:'none'
							})
							
						}
						
					},
					error:function(err){
						me.fastTap=true
					}
			});
		}
		else if(me.one_code!=1){
			uni.showToast({
				title: '请先获取验证码！',
				duration: 1000,
				icon:'none'
			})
			me.fastTap=true
		}
		else if(me.oldPhone!=me.phone){
			uni.showToast({
				title: '手机号码输入不一致,请确认后提交！',
				duration: 1000,
				icon:'none'
			})
			me.fastTap=true
		}
		else {
			setTimeout(function(){
				uni.showToast({
					title: '请填写完整信息！',
					duration: 1000,
					icon:'none'
				})
				me.fastTap=true
			},1500)
		}
	}
	//金额格式判断
	export function lkt_money(me){
		var mon = Number(me.put_mon)
		var monrys = Number(me.min_amount)
		console.log(mon+"==="+monrys)
		if(mon<monrys){
			mon = 0
			me.put_mon = mon.toFixed(2)
			uni.showToast({
				title: `提现金额需大于${monrys}元,请重新输入!`,
				duration: 1000,
				icon:'none'
			})
		}else if(mon>me.max_amount){
			mon = 0
			me.put_mon = mon.toFixed(2)
			uni.showToast({
				title: '提现金额不能大于总金额，请重新输入!',
				duration: 1000,
				icon:'none'
			})
		}else{
			mon = mon
		}
		me.mon_kc = mon.toFixed(2)
		console.log(me.put_mon>0)
	}
/*提现 end*/
/*分销商品*/
	//获取所有分销等级
	export function lkt_getgrade(me){
		var data = {
			module: "app",
			action: "commproduct",
			access_id: me.access_id,
			app:'getstart',
		}
		uni.request({
			data,
			url:uni.getStorageSync("url"),
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: function(res) {
				me.load = false
				me.header = res.data.pro
				me.status_id = res.data.pro[0].id
				me.order = res.data.pro[0].sonlist
				if(res.data.pro[0].sonlist.length==0){me.hasGoods=-1}
				else if(res.data.pro[0].sonlist.length>0){me.hasGoods=1}
			},
			error: function(err) {
				console.log(err)
			}
		})
	}
/*分销商品 end*/
/*分销规则*/
/*扫码分享*/
	//保存图片
	export function lkt_saveimg(me){
		uni.saveImageToPhotosAlbum({
			filePath: me.ewmImg,
			success(a) {
				uni.showToast({
					title:'保存成功',
					duration:1000
				})
			}
		})
	}
	//获取分享二维码
	export function lkt_getimg(me){
		var data = {
			module: 'app',
			action: 'getcode',
			app: 'index',
			access_id: me.access_id,
			m:'product_share',
			store_type:2,
			scene:'productId',
			path:'../tabBar/home',
			type:4,
			proType:'distribution',
		}
		// #ifdef MP-WEIXIN
		data.store_type = 1
		// #endif
		// #ifdef MP-ALIPAY
		data.store_type = 3
		// #endif
					
		uni.request({
			data,
			url: uni.getStorageSync("url"),
			header:{
				'content-type':'application/x-www-form-urlencoded'
			},
			method:'POST',
			success:function(res){
				var last=JSON.stringify(res.data);
				uni.hideLoading()
				if(res.data.code==200){
					me.ewmImg=res.data.url+""
					me.saveEWM=true
				}
				else if(res.data.code==404){
					uni.showToast({
						title: "未登录，请先登录！",
						duration: 1000,
						icon:'none'
					})
					setTimeout(function(){
						uni.navigateTo({
							url: '../login/login?landing_code=1'
						});
					},1000)
				}
				else{
					uni.showToast({
						title:res.data.message,
						duration:1500,
						icon:'none'
					})
				}
			},
		})	
	}
/*我的团队*/
	//查看下级
	export function lkt_seedown(userId,index,openFlag,me){
		if(openFlag){
			me.order[index].src = me.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/fx_bottom.png'
			me.sonList = []
		}else{
			me.order[index].src = me.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+'images/icon1/fx_top.png'
			for(var i in me.order){
				me.order[i].openFlag = false
			}
			var data = {
				module: "app",
				action: "commcenter",
				app:'mygroup',
				access_id: me.access_id,
				uid:userId
			}
			uni.request({
				data,
				url:uni.getStorageSync("url"),
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success:function(res){
					me.sonList = res.data.list
				},
				error:function(err){
					console.log(err)
				}
			})
		}
		me.order[index].openFlag = !me.order[index].openFlag
	}
/*提现明细*/