var that
that = this
let loginIndex = {
    default: this,// for typescript
    isCMMC(that) {
		return that.$store.state.channel.toLowerCase() == 'zyjd';
        // return this.getChannel().toLowerCase() == 'cmmc';
    },
    isCMMC2() {
        return this.getChannel().toLowerCase() == 'zyjd';
    },
    getChannel() {
        return uni.getStorageSync("tripartiteChannel");
    },
    getPhone() {
        return uni.getStorageSync("tripartitePhone");
    },
	login(me, isFirst) {
		//调用原生登录
		console.log('login');
		console.log('me.$jweixin:',me.$jweixin)
		console.log('me.$uni:',me.$uni)
		console.log(wx);
		let isMini = uni.getStorageSync('isMini')
		if(!isMini){
			self.location.href = 'https://sd-nsn.fblife.com/pages/login/login'
			// self.location.href = 'http://192.168.0.180:8080/pages/login/login'
			// https://sd-nsn.fblife.com/
			return
		}
		var ua = navigator.userAgent.toLowerCase();
		console.log(ua);
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			//ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
			me.$jweixin.miniProgram.getEnv((res)=>{
				console.log(res);
			   if (res.miniprogram) {
				   console.log("在小程序里");
					me.$jweixin.miniProgram.navigateTo({
						url: '/pages/login/login',
					}) 
			   } else {
				   me.$uni.webView.navigateTo({
						url: '/pages/login/login',
				   })
				   console.log("不在小程序里");
			   }
			})
			// me.$uni.webView.navigateTo({
			// 	url: '/pages/login/login',
			// })
			console.log("不在小程序里,在微信浏览器");
		}else{
			me.$uni.webView.navigateTo({
				url: '/pages/login/login',
			})
			console.log('不在微信里');
		}
    },
    //渠道号和手机号自动登录
    _loginH5(me) {
		console.log('=======_loginH5======')
		console.log('channel:',me.$store.state.channel)
		console.log('phone:',me.$store.state.phone)
		let channel = me.$store.state.channel
		let phone = me.$store.state.phone
		if(!phone){
			this._loginOutH5(me)
			return
		}
        var data = {
            module: 'app',
            action: 'login',
            app: 'register_channel',
            phone: phone,
			// userid: user.userId,
			// username: user.userName,
			// userimg: user.headImg,
            access_id: "",
            clientid: uni.getStorageSync("cid"),
            channel_id: channel,
        };
            uni.request({
                data,
                url: "https://shoplk.fblife.com/index.php?store_id=50&store_type=2",
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
					console.log('_loginH5:',res.data);
                    let {
                        access_id,
                        wx_status
                    } = res.data;
                    me.$store.commit("login", access_id);
                    me.$store.commit("SET_ACCESS_ID", access_id);
                    // me.$store.state.access_id = access_id;
					uni.setStorageSync('laiketuiAccessId',access_id)
					uni.setStorageSync('access_id',access_id)
                    uni.setStorageSync("LoingByHand", true);
                }
            })
        // }
    },
	
	_loginOutH5: (me) => {
        uni.removeStorage({
            key: 'history'
        })

        uni.removeStorage({
            key: 'user_phone'
        })

        uni.removeStorage({
            key: 'hotStatu'
        })
        me.$store.state.cart = []
        me.$store.state.cart_id = []
        me.$store.state.nCart = []
        me.$store.state.shouquan = false

        // #ifdef MP
        uni.removeStorageSync("userinfo");
        uni.removeStorageSync("laiketuiAccessId");
        // #endif

        uni.removeStorageSync("online");
        uni.removeStorageSync("LoingByHand")

        let data = {
            module: 'app',
            action: 'login',
            app: 'quit',
            access_id: this.access_id
        }

        me.$req.post({
            data
        }).then(res => {
            me.$store.state.access_id = ''
            uni.removeStorage({
                key: 'access_id'
            })

        })

    }
};


module.exports = loginIndex;