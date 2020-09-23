/**
 * 加载数据
 * @param {Object} that
 */
export function _axios(that) {
	var me = that

	var data = {
		module: 'app',
		action: 'groupbuy',
		page: me.page,
		access_id: me.access_id,
		m: 'grouphome',
		navType: me.navType
	}
	
	uni.request({
		data,
		url: uni.getStorageSync("url"),
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: (res) => {
			
			if (res.data.code == 404) {
				me.$refs.lktAuthorizeComp.handleAfterAuth(me,'../../pages/login/login?landing_code=1');
			}
			me.load = false
			if (res.data.list.length) {
				if (me.navType == 2) {
					me.setTimeData(res.data.list)
				} else {
					let {
						data: {
							pro
						}
					} = res
					me.list.push(...res.data.list)
				}
				if(res.data.list.length>9){
					me.loadingType2 = 0
				}else{
					me.loadingType2 = 2
				}
			} else {
				me.loadingType2 = 2
				me.msg = res.data.code
			}
		},
		error: function(err) {
			console.log(err)
		}
	});
}

function timing(groupList,me){
	for (var i = 0; i < groupList.length; i++) {
		
		var t = --groupList[i].leftTime;
		
		if(t<0){
			continue
		}
		
		if(t == 0){
			let data = {
				module: 'app',
				action: 'groupbuy',
				m:'set_status',
				id: groupList[i].id
			}
			
			uni.request({
				data,
				url: uni.getStorageSync("url"),
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					console.log(res)
					if(res.data.status == 1){
						me.list=[]
						me.loadingType2=0
						me.page=1
						me._axios()
					}
				},
				error: function(err) {
					console.log(err)
				}
			})
		}
		
		var d = Math.floor(parseInt(t) / 86400);
		var h = Math.floor((t / 3600) - (d * 24));
		var m = Math.floor((t - h * 60 * 60 - d * 24 * 60 * 60) / 60);
		var s = t % 60;
		
		if (h < 10) h = "0" + h;
		if (m < 10) m = "0" + m;
		if (s < 10) s = "0" + s;
		if (d < 10) d = "0" + d;
		if (d == 0) d = "00";
		
		groupList[i].hour = h
		groupList[i].mniuate = m
		groupList[i].second = s
		groupList[i].day = d
		if(groupList[i].day == 0){
			groupList[i].day = '00'
		}
		
		if (groupList[i].leftTime <= 0) {
			groupList[i].hour = "00"
			groupList[i].mniuate = "00"
			groupList[i].second = "00"
			groupList[i].day = '00'
		}
	}
}

/**
 * 倒计时
 * @param {Object} data
 * @param {Object} that
 */
export function setTimeData(data, that) {
	var me = that;
	me.list.push(...data)
	
	timing(me.list,me)
	
	clearInterval(me.timeI)
	me.timeI = setInterval(function() {
		timing(me.list,me)
	}, 1000)
	
	setTimeout(function() {
		me.list = me.list
	}, 0)
}
