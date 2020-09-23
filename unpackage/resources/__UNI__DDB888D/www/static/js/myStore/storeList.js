// 进入上传商品页面
export function LaiKeTui_axios(me){
	uni.request({
		url: uni.getStorageSync("url"),
		data:{
			module:'app',
			action:'mch',
			m:'order_details',
			shop_id:me.shop_id,
			access_id:me.access_id,
			sNo:me.order_id,
		},
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST',
		success:function(res){
			if(res.data.code==200){
				me.list=res.data.list
			}else{
				uni.showToast({
					title:res.data.message,
					duration:1500,
					icon:'none'
				})
			}
		}
	})
}
