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
			me.load = false
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

export function LaiKeTui_changeValue(me){
	var list=[]
	for(var i=0;i<me.list.list.length;i++){
		var json={
			p_id:me.list.list[i].p_id,
			p_price:me.list.list[i].p_price,
			sid:me.list.list[i].sid,
			size:me.list.list[i].size,
		}
		list.push(json)
	}
	var data1={
		z_freight:me.list.z_freight,
		mobile:me.list.mobile,
		spz_price:me.list.spz_price,
		name:me.list.name,
		address:me.list.address,
		list,
	}
	data1=JSON.stringify(data1)
	uni.request({
		url: uni.getStorageSync("url"),
		data:{
			module:'app',
			action:'mch',
			m:'change',
			shop_id:me.shop_id,
			access_id:me.access_id,
			sNo:me.list.sNo,
			data:data1
		},
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST',
		success:function(res){
			if(res.data.code==200){
	            me.finishBlur = true;
				me.list=res.data.list
			}else{
				uni.showToast({
					title:res.data.message,
					duration:1500,
					icon:'none'
				})
			}
		}
	});
}

export function LaiKeTui_changeAttr(me,index,sNo,p_id,attribute_id){
	uni.request({
		url: uni.getStorageSync("url"),
		data:{
			module:'app',
			action:'mch',
			m:'dj_attribute',
			shop_id:me.shop_id,
			access_id:me.access_id,
			p_id,
		},
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST',
		success:function(res){
			if(res.data.code==200){
				me.okBtn=false
				me.p_id=p_id
				me.sNo=sNo
				console.log(res)
				me.mask_display=true
				me.imgurl=res.data.data[0].skuBeanList[0].imgurl
				me.attrList=res.data.data[0].attrList
				me.skuBeanList = res.data.data[0].skuBeanList
				me._spec()
				let index
				for(let i = 0; i < me.skuBeanList.length; i++) {
					if(me.skuBeanList[i].cid == attribute_id) {
						index = i
					}
				}
				me._first(index)
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

export function LaiKeTui_showFhDiv(me){
	me.fhDiv=true
	uni.request({
		url: uni.getStorageSync("url"),
		data:{
			access_id:me.access_id,
			shop_id:me.shop_id,
			module:'app',
			action:'mch',
			m:'into_send',
		},
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST',
		success:function(res){
			if(res.data.code==200){
				var list=[]
				me.kuaidiList=res.data.list
				for(var key in res.data.list){
					list.push(res.data.list[key].kuaidi_name)
				}
				me.pickerValueArray=list
			}else{
				uni.showToast({
					title:res.data.message,
					duration:1500,
					icon:'none'
				})
			}
		},
		error:function(err){
			
		}
	})
}

export function LaiKeTui_ok(me){
	setTimeout(function(){
		if(me.finishBlur){
			me.title='订单详情'
			me.diplay=true
			var list=[]
			for(var i=0;i<me.list.list.length;i++){
				var a={
					p_id:me.list.list[i].p_id,
					p_price:me.list.list[i].p_price,
					sid:me.list.list[i].sid,
					size:me.list.list[i].size,
				}
				list.push(a)
			}
			var orderDetail={
				address:me.list.address,
				mobile:me.list.mobile,
				name:me.list.name,
				spz_price:me.list.spz_price,
				z_freight:me.list.z_freight,
				z_price:me.list.z_price,
				list,
			}
			var data={
				module:'app',
				action:'mch',
				m:'up_order',
				sNo:me.order_id,
				shop_id:me.shop_id,
				access_id:me.access_id,
				orderDetail:JSON.stringify(orderDetail)
			}
			uni.request({
				url: uni.getStorageSync("url"),
				data,
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:'POST',
				success: (res) => {
					if(res.data.code==200){
						me._axios()
					}else{
						uni.showToast({
							title:res.data.message,
							duration:1500,
							icon:'none'
						})
					}
				}
			})
		}else{
			uni.navigateBack({
				delta:1
			})
		}
	},500)
}

export function LaiKeTui_send(me){
	if(!me.fastTap){
		return
	}
	me.fastTap=false
	uni.request({
		url: uni.getStorageSync("url"),
		data:{
			access_id:me.access_id,
			shop_id:me.shop_id,
			module:'app',
			action:'mch',
			m:'send',
			sNo:me.order_id,
			express_id:me.express_id,
			courier_num:me.courier_num,
			orderList_id:'',
		},
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST',
		success:function(res){
			if(res.data.code==200){
				uni.showToast({
					title:'发货成功',
					duration:1500,
					icon:'none'
				})
				setTimeout(function(){
					me._axios()
					me.fhDiv=false
					me.fhRadios=false
					me.fastTap=true
				},1500)
			}else{
				uni.showToast({
					title:res.data.message,
					duration:1500,
					icon:'none'
				})
				me.fastTap=true
			}
		},
		error:function(err){
			
		}
	})
}

export function LaiKeTui_showState(me,index, indx, stock, price){
	var listItem = me.attrList;
	var items = listItem[indx];
	var item = items.attr[index];
	if(!item.enable) {
		return;
	}
	var select = !item.select;
	for(var i = 0; i < items.attr.length; i++) {
		items.attr[i].select = false;
	}
	item.select = select;
	// 获取点击属性列表
	var canGetInfo = [];
	for(var skuIndex = 0; skuIndex < listItem.length; skuIndex++) {
		for(var skuIndexIn = 0; skuIndexIn < listItem[skuIndex].attr.length; skuIndexIn++) {
			if(listItem[skuIndex].attr[skuIndexIn].enable && listItem[skuIndex].attr[skuIndexIn].select) {
				canGetInfo.push(listItem[skuIndex].attr[skuIndexIn]);
			}
		}
	}
	var canGetInfoLog = "";
				
	var skuBeanList = me.skuBeanList;
				
	var haveSkuBean = [];
	// 对应库存清单扫描
	for(var skuBeanIndex = 0; skuBeanIndex < skuBeanList.length; skuBeanIndex++) {
		var iListCount = 0;
		for(var skuBeanIndexIn = 0; skuBeanIndexIn < skuBeanList[skuBeanIndex].attributes.length; skuBeanIndexIn++) {
			if(canGetInfo.length == skuBeanList[skuBeanIndex].attributes.length) {
				if(skuBeanList[skuBeanIndex].attributes[skuBeanIndexIn].attributeValId == canGetInfo[skuBeanIndexIn].id) {
					iListCount++;
				}
			} else {
				canGetInfoLog = "库存清单不存在此属性" + " ";
			}
		}
		if(iListCount == skuBeanList[skuBeanIndex].attributes.length) {
			haveSkuBean.push(skuBeanList[skuBeanIndex]);
		}
	}
				
	/*console.log(haveSkuBean, "存在于库存清单");*/
				
	for(var iox = 0; iox < canGetInfo.length; iox++) {
		canGetInfoLog += canGetInfo[iox].attributeValue + " ";
	}
	if(haveSkuBean.length != 0) {
		me.num = haveSkuBean[0].count;
		me.price = haveSkuBean[0].price;
		me.imgurl = haveSkuBean[0].imgurl
		me.haveSkuBean = haveSkuBean[0]
	} else {
		if(stock) {
			me.num = stock
		} else {
			if(me.goods.length>1){
				me.num = me.goods[index].stock
			}
			else if(me.skuBeanList){
				me.num = me.skuBeanList[index].count
			}
		}
		if(price) {
			me.price = price
		} else {
			if(me.goods.length>1){
				me.num = me.goods[index].price
			}
			else if(me.skuBeanList){
				me.num = me.skuBeanList[index].price
			}
		}
		me.haveSkuBean = ''
	}
				
	// 重新赋值
	me.attrList = listItem
	/*infoText: canGetInfoLog,*/
				
	// 重新sku运算
	me._spec()
}

export function LaiKeTui_confirm(me,num){
	if(num==0){
		uni.showToast({
			title: '该产品规格库存不足！',
			duration: 1000,
			icon:'none'
		})
		return
	}
	if(Boolean(me.haveSkuBean)) {
		
		let data = {
			module: 'app',
			action: 'mch',
			m: 'up_attribute',
			access_id: me.access_id,
			shop_id:me.shop_id,
			p_id:me.p_id,
			sNo:me.sNo,
			attribute_id: me.haveSkuBean.cid
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
					me.okBtn=true
					me.mask_display=false
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
	} else {
		uni.showToast({
			title: '请选择完整的商品规格！',
			duration: 1000,
			icon:'none'
		})
	}
}

export function LaiKeTui_spec(me){
	var attrListIn = me.attrList;
	for(var i = 0; i < attrListIn.length; i++) {
		var attrListBig = attrListIn[i];
		//当前类别之外的选择列表
		var attrsOtherSelect = [];
		for(var j = 0; j < attrListIn.length; j++) {
			var attrListSmall = attrListIn[j];
			if(attrListSmall.id != attrListBig.id) {
				/*console.log(attrListSmall)*/
				for(var k = 0; k < attrListSmall.attr.length; k++) {
					var attrListSmallAttr = attrListSmall.attr[k];
					/*console.log(attrListSmallAttr)*/
					if(attrListSmallAttr.enable && attrListSmallAttr.select) {
						//可选并且已经选择的属性
						attrsOtherSelect.push(attrListSmallAttr);
					}
				}
			}
		}
		var enableIds = [];
		var skuBeanListIn = me.skuBeanList;
		for(var z = 0; z < skuBeanListIn.length; z++) {
			var ism = true;
			var skuBean = skuBeanListIn[z];
			for(var j = 0; j < attrsOtherSelect.length; j++) {
				var enable = false;
				for(var k = 0; k < skuBean.attributes.length; k++) {
					var goodAttrBean = skuBean.attributes[k];
					if(attrsOtherSelect[j].attributeId == goodAttrBean.attributeId &&
						attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
						/*console.log(attrsOtherSelect[j].attributeId, goodAttrBean.attributeId, attrsOtherSelect[j].id, goodAttrBean.attributeValId)*/
						enable = true;
						break;
					}
				}
				ism = enable && ism;
			}
			if(ism) {
				for(var o = 0; o < skuBean.attributes.length; o++) {
					var goodAttrBean = skuBean.attributes[o];
					if(attrListBig.id == goodAttrBean.attributeId) {
						enableIds.push(goodAttrBean.attributeValId);
					}
				}
			}
		}
		var integers = enableIds;
		for(var s = 0; s < attrListBig.attr.length; s++) {
			var attrItem = attrListBig.attr[s];
			attrItem.enable = integers.indexOf(attrItem.id) != -1;
				
		}
	}
	// 重新赋值
	me.attrList = attrListIn,
	me.skuBeanList = skuBeanListIn
}

export function LaiKeTui_first(me,index){
	var attrListIn = me.attrList;
	var skuBeanListIn = me.skuBeanList;
	var select_list = skuBeanListIn[index];
	for(var i = 0; i < attrListIn.length; i++) {
		for(var j = 0; j < attrListIn[i].attr.length; j++) {
			for(var b = 0; b < select_list.attributes.length; b++) {
				if(select_list.attributes[b].attributeId == attrListIn[i].attr[j].attributeId && select_list.attributes[b].attributeValId == attrListIn[i].attr[j].id) {
					attrListIn[i].attr[j].select = true;
				}
			}
		}
	}
	me.price = select_list.price
	me.imgurl = select_list.imgurl
	me.num = select_list.count
	me.haveSkuBean = select_list
}
export function QRs(me,rew){
	var data={
		module:'app',
		action:'mch',
		m:'sweep_extraction_code',
		access_id:me.access_id,
		shop_id:me.shop_id,
		extraction_code: rew.result
	}
	uni.request({
		data,
		url: uni.getStorageSync("url"),
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		method:'POST',
		success:function(res){
			uni.hideLoading();
			if(res.data.code==200){
				me.order_id = res.data.order_id
				me.p_price = res.data.p_price
				me.sNo = res.data.sNo
				uni.showToast({
					title:res.data.message,
					duration:1500,
					icon:'none'
				})
				// 成功后跳转 QRsuccess页面
				uni.redirectTo({
					url: "QRsuccess?p_price="+me.p_price+"&sNo="+me.sNo+"&order_id="+me.order_id
				})
			}
			else{
				uni.showToast({
					title:res.data.message,
					duration:1500,
					icon:'none'
				})
			}
		}
	})
}