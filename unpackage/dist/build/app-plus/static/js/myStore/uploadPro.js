// 进入上传商品页面
export function LaiKeTui_axios(me){
	uni.request({
	    url: uni.getStorageSync("url"),
	    data:{
	        access_id:me.access_id,
	        action:'mch',
	        module:'app',
	        m:'upload_merchandise_page',
	        shop_id:me.shop_id,
	    },
	    header:{
	        'content-type':'application/x-www-form-urlencoded'
	    },
	    method:'POST',
	    success:function(res){
	        if(res.data.code==200){
	            me.res=res.data
	            for(var i=0;i<res.data.freight_list.length;i++){
	            	me.proFreightPickerArray.push(res.data.freight_list[i].name)
	            }
				if(res.data.distributors){
					for(var i=0;i<res.data.distributors.length;i++){
						me.proDistributorsPickerArray.push(res.data.distributors[i].name)
					}
				}
	            me.show_adr=res.data.show_adr
	            me.proUnitPickerArray=res.data.unit
	
	            me.s_type=res.data.s_type
	            me.plugin_list=res.data.plugin_list
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
// 进入编辑商品页面
export function LaiKeTui_editor(me){
	uni.request({
	    url: uni.getStorageSync("url"),
	    data:{
	        module:'app',
	        action:'mch',
	        m:'modify',
	        access_id:me.access_id,
	        shop_id:me.shop_id, 
	        p_id:me.p_id,
	    },
	    header:{
	        'content-type':'application/x-www-form-urlencoded'
	    },
	    method:'POST',
	    success:function(res){
	        me.res=res.data
	        me.pageStatus=1
	        if(res.data.code==200){
	            var data=res.data
	            me.frames_status = data.status

	            me.proClass=data.product_class_list1
	            me.chooseClass=data.product_class_list1
	            me.proClassId = data.product_class_list1.cid
				
	            if(data.product_class_list1.length>1){
	                me.proClassId = data.product_class_list1[1].cid
	            }

	            me.res=res.data
	            me.proBrand=data.brand_class_list1
				me.proBrandId=data.brand_class_list1.brand_id // 品牌ID
	            me.proName=data.list.product_title
	            me.vstName=data.list.subtitle
	            me.keyWord=data.list.keyword
	            me.proWegiht=data.list.weight
	            me.proCode = data.list.scan
	            me.showImg=data.imgurls
	            me.showImgOld=[...data.imgurls]
	            me.$store.state.attr_group=data.attr
	            me.$store.state.attr_arr=data.attrList
				let chooseAttr=''
				for(let i=0;i<data.attr.length;i++){
					chooseAttr+=','+data.attr[i].attr_group_name
				}
				chooseAttr=chooseAttr.replace(',','')
				uni.setStorageSync('upload_attr_group',data.attr)
				uni.setStorageSync('upload_attr_arr',data.attrList)
				uni.setStorageSync('upload_chooseAttr',chooseAttr)
	            me.attr_group=data.attr
	            me.attr_arr=data.attrList
	            me.show_adr=data.show_adr
	            me.s_type=data.s_type
	            me.plugin_list=data.plugin_list
	            me.freightSet=data.freight_list1
	            me.freightSetId=data.freight_list1.id
	            me.distributorsSet=data.distributors1
	            me.distributorsSetId=data.distributors1.id
				me.content =data.content;
				me.type_status =data.type_status;
				if(data.richList != ''){
					me.richList =JSON.parse(data.richList);
					me.$store.state.goodsDetail = JSON.parse(data.richList);
				}else{
					me.$store.state.goodsDetail = [];
				}
				
	            if(me.distributorsSetId != 0){
	                me.show_adrStatus = false
	                me.distributorsStatus = true
	            }
	            me.costM = data.initial.cbj
	            me.oldM = data.initial.yj
	            me.sellM = data.initial.sj
	            me.stock = data.initial.kucun
	            me.unit = data.initial.unit
	            me.stockWarn = data.initial.stockWarn
	
	            if(data.initial.length>1){
	                me.costM = data.initial.cbj
	                me.oldM = data.initial.yj
	                me.sellM = data.initial.sj
	                me.stock = data.initial.kucun
	                me.unit = data.initial.unit
	                me.stockWarn = data.initial.stockWarn
	            }
	
	
				for(var i=0;i<data.s_type.length;i++){
	                if(data.s_type[i].status){
	                    me.s_typeStr.push(data.s_type[i].value)
	                }
	            }
				for(var i=0;i<data.show_adr.length;i++){
	                if(data.show_adr[i].status){
	                    me.active.push(i)
	                }
	            }
				for(var i=0;i<data.plugin_list.active.length;i++){
	                if(data.plugin_list.active[i].status){
	                    me.active.push(data.plugin_list.active[i].value)
	                }
					if(data.plugin_list.active[0].status == false){
						me.show_adrStatus = false
					}
	            }

				me.res.brand_class_list = res.data.list.brand_list
				
				if(res.data.brand_list){
					for(var i=0;i<res.data.brand_list.length;i++){
					    me.proBrandPickerArray.push(res.data.brand_list[i].brand_name)
					}
				}
				
				if(res.data.freight_list){
					for(var i=0;i<res.data.freight_list.length;i++){
					    me.proFreightPickerArray.push(res.data.freight_list[i].name)
					}
				}
				
				if(res.data.distributors){
					for(var i=0;i<res.data.distributors.length;i++){
					    me.proDistributorsPickerArray.push(res.data.distributors[i].name)
					}
				}
				
	            me.proUnitPickerArray=res.data.unit
	            if(data.list.is_hexiao==0){
	                me.downLineStatus=false
	            }else if(data.list.is_hexiao==1){
	                me.downLineStatus=true
	            }
	            me.downLineAdd=data.list.hxaddress
				
				setTimeout(function(){
					me.loadFlag = true
				},300)
	        }
	        else{
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
// 查看商品详情
export function LaiKeTui_see(me){
	uni.request({
	    url: uni.getStorageSync("url"),
	    data:{
	        module:'app',
	        action:'mch',
	        m:'modify',
	        access_id:me.access_id,
	        shop_id:me.shop_id,
	        p_id:me.p_id,
	    },
	    header:{
	        'content-type':'application/x-www-form-urlencoded'
	    },
	    method:'POST',
	    success:function(res){
	        if(res.data.code==200){
				me.showContent = true;
	            var data=res.data
				console.log(data)
	            me.proClass=data.product_class_list1
	            me.chooseClass=data.product_class_list1
	            me.proClassId = data.product_class_list1.cid
	            
	            if(data.product_class_list1.length>1){
	                me.proClassId = data.product_class_list1[1].cid
	            }
	
	            me.proBrand=data.brand_class_list1
				me.proBrandId=data.brand_class_list1.brand_id
	            me.unit = data.initial.unit
	            me.proName=data.list.product_title
	            me.vstName=data.list.subtitle
	            me.keyWord=data.list.keyword
	            me.proWegiht=data.list.weight
	            me.proCode = data.list.scan
	            me.showImg=data.imgurls
	            me.showImgOld=data.imgurls
	            me.$store.state.attr_group=data.attr
	            me.$store.state.attr_arr=data.attrList
	            me.attr_group=data.attr
	            me.attr_arr=data.attrList
	            me.freightSet=data.freight_list1
	            me.s_type=data.s_type
	            me.plugin_list=data.plugin_list
	            me.freightSetId=data.freight_list1.id
	            me.show_adr=data.show_adr
	            for(var i in data.s_type ){
	                if(data.s_type[i].status){
	                    me.s_typeStr.push(data.s_type[i].value)
	                }
	            }
	            for(var i in data.plugin_list.active){
	                if(data.plugin_list.active[i].status){
	                    me.active.push(data.plugin_list.active[i].value)
	                }
	            }
	
	            if(data.list.is_hexiao==0){
	                me.downLineStatus=false
	            }else if(data.list.is_hexiao==1){
	                me.downLineStatus=true
	            }
	            me.downLineAdd=data.list.hxaddress
				me.content = data.content;
				if(data.richList){
					me.richList =JSON.parse(data.richList);
					me.$store.state.goodsDetail = JSON.parse(data.richList);
				}else{
					me.richList = [];
					me.$store.state.goodsDetail = [];
				}
				if(me.content != ''){
					me.content = me.content.replace(new RegExp("<image","gm"),"<img").replace(new RegExp("</image>","gm"),"");
				}else{
					me.content = ' '
				}
				
				setTimeout(function(){
					me.loadFlag = true
				},300)
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
// 获取分类
export function LaiKeTui_showProClass(me){
	uni.request({
	    url: uni.getStorageSync("url"),
	    data:{
	        action:'mch',
	        module:'app',
	        m:'get_class',
			access_id:me.access_id,
	        shop_id:me.shop_id,
			class_str:me.proClassId,
			brand_str:me.proBrandId,
	    },
	    header:{
	        'content-type':'application/x-www-form-urlencoded'
	    },
	    method:'POST',
	    success:function(res){
	        if(res.data.code==200){
				me.chooseClassFlag = true
				if(res.data.list.class_list.length != 0){
					me.arrClass = res.data.list.class_list[0]
				}
				if(me.chooseClass != 0){
					if(me.chooseClass[me.chooseClass.length - 1].pname == '请选择'){
						
					}else{
						me.chooseClass.push({pname:'请选择'})
					}
				}else{
					me.chooseClass.push({pname:'请选择'})
				}
				me.res.brand_class_list = res.data.list.brand_list
				me.proBrandPickerArray = []
				for(var i=0;i<res.data.list.brand_list.length;i++){
					me.proBrandPickerArray.push(res.data.list.brand_list[i].brand_name)
				}
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
// 选择分类
export function LaiKeTui_onConfirmProClass(me,item){
	uni.request({
	    url: uni.getStorageSync("url"),
	    data:{
	        action:'mch',
	        module:'app',
	        m:'choice_class',
			access_id:me.access_id,
	        shop_id:me.shop_id,
			cid:item.cid,
			brand_str:me.proBrandId,
	    },
	    header:{
	        'content-type':'application/x-www-form-urlencoded'
	    },
	    method:'POST',
	    success:function(res){
	        if(res.data.code==200){
				var chooseClass_num = me.chooseClass.length - 1;
				me.proClassId = item.cid
				me.proClass = item.pname
						
				if(me.chooseClass[chooseClass_num].pname == '请选择'){
					me.chooseClass[chooseClass_num] = item
					if(res.data.list.class_list.length == 0){
						me.chooseClassFlag = false
					}else{
						me.arrClass = res.data.list.class_list[0]
						me.chooseClass.push({pname:'请选择'})
					}
				}
				me.proBrandPickerArray = []
				me.res.brand_class_list = res.data.list.brand_list
				var proBrandId = me.proBrandId
				me.proBrand = ''
				me.proBrandId = '0'
				console.log(res.data.list.brand_list)
				console.log(proBrandId)
				for(var i=0;i<res.data.list.brand_list.length;i++){
					if(proBrandId == res.data.list.brand_list[i].brand_id){
						console.log(res.data.list.brand_list[i].brand_id)
						me.proBrandId = res.data.list.brand_list[i].brand_id
						me.proBrand = res.data.list.brand_list[i].brand_name
					}
					me.proBrandPickerArray.push(res.data.list.brand_list[i].brand_name)
				}
				console.log(me.proBrandId)
				console.log(me.proBrand)
				console.log(me.proBrandPickerArray)

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
// 选择品牌
export function LaiKeTui_showProBrand(me){
	me.proBrandShow=true
	me.mode = 'selector'
	me.deepLength = 1
	me.proBrandPickerDefault = [0]
	me.$refs.proBrandPicker.show()
}
// 点击品牌
export function LaiKeTui_onConfirmProBrand(me,e){
	console.log(me.pageStatus)
	console.log(e.label)
	if(me.pageStatus==1){
		console.log(me.proBrand)
	    me.proBrand = {
			brand_name: e.label
		}
		// brand_name = e.label
	}else{
	    me.proBrand = e.label
	}
	console.log(me.proBrand)

	me.show=false
	if(me.res.brand_class_list[e.index[0]]){
		me.proBrandId=me.res.brand_class_list[e.index[0]].brand_id
	}
	
}
// 删除图片
export function LaiKeTui_delImg(me,index){
	if(in_array(me.showImg[index],me.showImgNewAdd)){
	    var a1=me.showImgNewAdd.indexOf(me.showImg[index])
	    me.showImgNewAdd.splice(a1,1)
	}
	if(in_array(me.showImg[index],me.showImgOld)){
	    var a1=me.showImgOld.indexOf(me.showImg[index])
	    me.showImgOld.splice(a1,1)
	}
	me.showImg.splice(index,1)
}
// 设为主图
export function LaiKeTui_setMain(me,index){
	var img=me.showImg[index]
	me.showImg.splice(index,1)
	me.showImg.unshift(img)
	//将新图上传为主图
	if(index>=me.showImgOld.length){
	    var index1 = index-me.showImgOld.length
	    var img1 = me.showImgNewAdd[index1]
	    me.showImgNewAdd.splice(index1,1)
	    me.showImgNewAdd.unshift(img1)
	}
}
// 选择图片
export function LaiKeTui_chooseImg(me,num){
	var count=me.upImgNum[num]
	uni.chooseImage({
	    count,
	    success:function(res){
	        if(me.pageStatus==1){
	            me.showImgNewAdd=me.showImgNewAdd.concat(res.tempFilePaths)
	        }
	        me.showImg=me.showImg.concat(res.tempFilePaths)
	    }
	})
}
// 成本价
export function LaiKeTui_cbj(me,e){
	if(me.status=="editor"){
		for(var i=0;i<me.attr_arr.length;i++){
			me.attr_arr[i].cbj = e.detail.value
		}
	}
}
// 原价
export function LaiKeTui_yj(me,e){
	if(me.status=="editor"){
		for(var i=0;i<me.attr_arr.length;i++){
			me.attr_arr[i].yj = e.detail.value
		}
	}
}
// 售价
export function LaiKeTui_sj(me,e){
	if(me.status=="editor"){
		for(var i=0;i<me.attr_arr.length;i++){
			me.attr_arr[i].sj = e.detail.value
		}
	}
}
// 库存
export function LaiKeTui_kc(me,e){
	if(me.status=="editor"){
		for(var i=0;i<me.attr_arr.length;i++){
			me.attr_arr[i].kucun = e.detail.value
		}
	}
}
// 库存预警
export function LaiKeTui_kcyj(me,e){
	if(me.status=="editor"){
		for(var i=0;i<me.attrList.length;i++){
			me.attrList[i].stockWarn = e.detail.value
		}
	}
}
// 显示单位
export function LaiKeTui_showProUnit(me){
	me.proUnitShow=true
	me.mode = 'selector'
	me.deepLength = 1
	me.proUnitPickerDefault = [0]
	me.$refs.proUnitPicker.show()
}
// 设置属性
export function LaiKeTui_setAttr(me){
	// pageStatus:'',//[0-上传，1-编辑，2-查看]
	if(me.pageStatus==0){
	    if(me.costM&&me.oldM&&me.sellM&&me.stock&&me.stockWarn){
	        uni.navigateTo({
	            url:'../myStore/setAttr?costM='+me.costM+'&oldM='+me.oldM+'&sellM='+me.sellM+'&stock='+me.stock+'&stockWarn='+me.stockWarn+'&unit='+me.unit+'&pageStatus='+me.pageStatus
	        })
	    }
	    else{
	        uni.showToast({
	            title:"请先完善以上的信息",
	            duration:1500,
	            icon:'none'
	        })
	    }
	}else {
	    uni.navigateTo({
	        url:'../myStore/setAttr?costM='+me.costM+'&oldM='+me.oldM+'&sellM='+me.sellM+'&stock='+me.stock+'&stockWarn='+me.stockWarn+'&unit='+me.unit+'&pageStatus='+me.pageStatus+'&frames_status='+me.frames_status
	    })
	}
}
// 运费
export function LaiKeTui_showProFreight(me){
	me.proFreightShow=true
	me.mode = 'selector'
	me.deepLength = 1
	me.proFreightPickerDefault = [0]
	me.$refs.proFreightPicker.show()
}
// 点击运费
export function LaiKeTui_onConfirmProFreight(me,e){
	if(me.pageStatus==1){
	    me.freightSet.name = e.label
	}else{
	    me.freightSet = e.label
	}
	me.show=false
	me.freightSetId=me.res.freight_list[e.index[0]].id
}
// 显示标签
export function LaiKeTui_chooseSType(me,index){
	me.s_typeStr=[]
	me.s_type[index].status=!me.s_type[index].status
	for(var i in me.s_type){
	    var a=me.s_type[i].status
	    if(a){
	        me.s_typeStr.push(i)
	    }
	}
}
// 支持活动
export function LaiKeTui_changeActive(me,num){
	if(me.type_status == 1){
		uni.showToast({
		    title:"该商品有未完成的订单，无法修改活动类型 ！",
		    duration:1500,
		    icon:'none'
		})
	}else if(me.type_status == 2){
		uni.showToast({
		    title:"该商品有参与插件活动，无法修改活动类型 ！",
		    duration:1500,
		    icon:'none'
		})
	}else{
		var a=0
		me.plugin_list.active[num].status=!me.plugin_list.active[num].status
		me.active = me.plugin_list.active[num].value
		for(var i=0;i<me.plugin_list.active.length;i++){
		    me.plugin_list.active[i].status=false
		}
		me.plugin_list.active[num].status=true
		if(me.plugin_list.active[num].value == 1){
		    me.show_adrStatus = true
		    me.distributorsStatus = false
		}else if(me.plugin_list.active[num].value == 5){
		    me.show_adrStatus = false
		    me.distributorsStatus = true
		}else{
		    me.show_adrStatus = false
		    me.distributorsStatus = false
		}
	}
}
// 显示位置
export function LaiKeTui_chooseShowAdr(me,index){
	me.display_position=[]
	me.show_adr[index].status=!me.show_adr[index].status
	for(var i in me.show_adr){
	    var a=me.show_adr[i].status
	    if(a){
	        me.display_position.push(i)
	    }
	}
}
// 等级绑定
export function LaiKeTui_showProDistributors(me){
	me.proDistributorsShow=true
	me.mode = 'selector'
	me.deepLength = 1
	me.proDistributorsPickerDefault = [0]
	me.$refs.proDistributorsPicker.show()
}
// 点击分销等级
export function LaiKeTui_onConfirmProDistributors(me,e){
	if(me.pageStatus==1){
	    me.distributorsSet.name = e.label
	}else{
	    me.distributorsSet = e.label
	}
	me.show=false
	me.distributorsSetId=me.res.distributors[e.index[0]].id
}
// 提交
export function LaiKeTui_Check(me,type){
	if(!me.fastTap){
	    return
	}
	// 初始值
	me.initial = "cbj="+me.costM+",yj="+me.oldM+",sj="+me.sellM+",kucun="+me.stock+",unit="+me.unit+",stockWarn="+me.stockWarn
	me.fastTap=false
	
	if(me.proName&&me.keyWord&&me.proWegiht&&me.proClass&&me.proBrand&&me.unit&&me.freightSet&&me.showImg.length>0&&me.attr_arr.length>0&&me.richList){
	    if(me.downLineStatus){
	        if(me.downLineAdd){
	            me._request(type)
	        }else{
	            me.fastTap=true
				me.check_Flag=true
	            uni.showToast({
	                title:'请填写核销地址',
	                duration:1500,
	                icon:'none'
	            })
	        }
	    }
	    else{
	        me._request(type)
	    }
	}else{
	    uni.showToast({
	        title:'请填写完整信息',
	        duration:1500,
	        icon:'none'
	    })
	    me.fastTap=true
		me.check_Flag=true
	}
}

export function LaiKeTui_request(me,type){
	uni.showLoading({
		title: '请稍后...'
	})
	var active_str = ''
	var show_adr_str = ''
	
	for(var j in me.show_adr){
		if(me.show_adr[j].status){
			show_adr_str += me.show_adr[j].value + ','
		}
	}
	for(var l in me.plugin_list.active){
		if(me.plugin_list.active[l].status){
			active_str = me.plugin_list.active[l].value
		}
	}
	//商品详情
	let content = me.getGoodsDetailsContext();
	let richList = JSON.stringify(me.richList);
	//pageStatus : [0-上传，1-编辑，2-查看]
	if(me.pageStatus==0){
	    for(var i=0;i<me.showImg.length;i++){
	        var data={
	            shop_id:me.shop_id,
	            access_id:me.access_id,
	            m:'upload_merchandise',
	            for_num:me.showImg.length,
	            module:'app',
	            p_id:me.p_id,
	            action:'mch',
	            product_title:encodeURI(me.proName),
	            subtitle:encodeURI(me.vstName),
	            scan:me.proCode,
	            time:i,
	            product_class_id:me.proClassId,
	            brand_id:me.proBrandId,
	            keyword:encodeURI(me.keyWord),
	            weight:me.proWegiht,
	            attr_group:encodeURI(JSON.stringify(me.attr_group)),
	            attr_arr:encodeURI(JSON.stringify(me.attr_arr)),
	            freight_id:me.freightSetId,
	            display_position:show_adr_str,
	            s_type:me.s_typeStr.join(','),
	            active:active_str,
	            distributor_id:me.distributorsSetId,
	            is_hexiao:me.downLineStatus,
	            hxaddress:me.downLineAdd,
	            unit:encodeURI(me.unit),
				stockWarn:me.stockWarn,
	            initial:encodeURI(me.initial),
				content:content,
				richList:richList
	        }
	        if(type=='no'){
	            data.mch_status=4
	        }else if(type=='yes'){
	            data.mch_status=1
	        }
	        // #ifdef MP-WEIXIN || MP-ALIPAY
	        data.store_type=1
	        // #endif
	        // #ifndef MP-WEIXIN || MP-ALIPAY
	        data.store_type=2
	        // #endif
				
	        //判断上次上传结果成功了才能执行下一次方法
	        data.p_id= me._p_id(i,data);
			
			if(i+1 == me.showImg.length){
				uni.hideLoading();
			}
	    }
	}
	else if(me.pageStatus==1){
	    if(me.showImgNewAdd.length>0){
	        for(var i=0;i<me.showImgNewAdd.length;i++){
	            var data={
	                showImgOld:me.showImgOld.join(","),
	                shop_id:me.shop_id,
	                access_id:me.access_id,
	                m:'re_edit',
	                for_num:me.showImgNewAdd.length,
	                module:'app',
	                p_id:me.p_id,
	                action:'mch',
	                unit:me.unit,
	                product_title:encodeURI(me.proName),
	                subtitle:encodeURI(me.vstName),
	                scan:me.proCode,
	                time:i,
	                product_class_id:me.proClassId,
	                brand_id:me.proBrandId,
	                keyword:encodeURI(me.keyWord),
	                weight:me.proWegiht,
	                attr_group:encodeURI(JSON.stringify(me.attr_group)),
	                attr_arr:encodeURI(JSON.stringify(me.attr_arr)),
	                freight_id:me.freightSetId,
	                display_position:show_adr_str,
	                s_type:me.s_typeStr.join(','),
	                active:active_str,
	                is_hexiao:me.downLineStatus,
	                hxaddress:me.downLineAdd,
	                firstPage:me.showImg[0],
	                distributor_id:me.distributorsSetId,
	                unit:encodeURI(me.unit),
					stockWarn:me.stockWarn,
	                initial:encodeURI(me.initial),
					content:content,
					richList:richList
	            }
	            if(type=='no'){
	                data.mch_status=4
	            }else if(type=='yes'){
	                data.mch_status=1
	            }
	            // #ifdef MP-WEIXIN || MP-ALIPAY
	            data.store_type=1
	            // #endif
	            // #ifndef MP-WEIXIN || MP-ALIPAY
	            data.store_type=2
	            // #endif
	            //判断上次上传结果成功了才能执行下一次方法
	            data.p_id= me._p_id1(i,data)
	        }
	    }
	    else{
	        var data={
	            showImgOld:me.showImgOld,
	            shop_id:me.shop_id,
	            access_id:me.access_id,
	            m:'re_edit',
	            for_num:1,
	            module:'app',
	            p_id:me.p_id,
	            action:'mch',
	            unit:me.unit,
	            product_title:me.proName,
	            subtitle:me.vstName,
	            scan:me.proCode,
	            time:0,
	            product_class_id:me.proClassId,
	            brand_id:me.proBrandId,
	            keyword:me.keyWord,
	            weight:me.proWegiht,
	            attr_group:JSON.stringify(me.attr_group),
	            attr_arr:JSON.stringify(me.attr_arr),
	            freight_id:me.freightSetId,
	            display_position:show_adr_str,
	            s_type:me.s_typeStr.join(','),
	            active:active_str,
	            is_hexiao:me.downLineStatus,
	            hxaddress:me.downLineAdd,
	            firstPage:me.showImg[0],
	            image:me.showImgOld,
	            distributor_id:me.distributorsSetId,
	            unit:me.unit,
				stockWarn:me.stockWarn,
	            initial:me.initial,
				content:content,
				richList:richList
	        }
	        if(type=='no'){
	            data.mch_status=4
	        }else if(type=='yes'){
	            data.mch_status=1
	        }
	        // #ifdef MP-WEIXIN
	        data.store_type=1
	        // #endif
	        // #ifndef MP-WEIXIN
	        data.store_type=2
	        // #endif
	        uni.request({
	            url: uni.getStorageSync("url"),
	            data,
	            header:{
	                'content-type':'application/x-www-form-urlencoded'
	            },
	            method:'POST',
	            success:function(res){
					me.check_Flag=true
	                if(res.data.code==200){
	                    uni.showToast({
	                        title:"修改成功",
	                        duration:1500,
	                        icon:'none'
	                    })
	                    setTimeout(function(){
							me.fastTap=true
	                        uni.navigateBack({
	                            delta:1
	                        })
	                        me.attr_group=[]
	                        me.attr_arr=[]
	                    },1500)
	                }
	            },
	            error:function(){
	                me.fastTap=true
					me.check_Flag=true
	            }
	        })
	    }
	}
}

export function LaiKeTui_p_id(i,data,me){
	return new Promise((res1)=>{
	    uni.uploadFile({
	        url: uni.getStorageSync("url"),
	        filePath: me.showImg[i],
			// #ifdef MP-ALIPAY
			header: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			},
			fileType: 'image',
			// #endif
	        name: 'file',
	        formData:data,
	        success:function(res){
				me.fastTap=true
	            var res2=res.data;
				if(typeof res2 == 'string'){
					res2=JSON.parse(res2);
				}
	            if(res2.code==200){
	                me.p_id=res2.p_id
	                i++
	                if(i==me.showImg.length){
	                    uni.showToast({
	                        title:'上传成功',
	                        duration:1500,
	                        icon:'none'
	                    })
	                    setTimeout(function(){
							// me.fastTap=true
	                        uni.navigateBack({
	                            delta:1
	                        })
	                        me.attr_group=[]
	                        me.attr_arr=[]
	                    },1500)
	                }
	            }else{
					me.fastTap=true
					me.check_Flag=true
	                uni.showToast({
	                    title:res2.message,
	                    duration:1500,
	                    icon:'none'
	                })
	                return
	            }
	            res1(res2.p_id);
	        },
	        error:function(){
	            me.fastTap=true
				me.check_Flag=true
	        }
	    })
	})
}

export function LaiKeTui_p_id1(i,data,me){
	return new Promise((res1)=>{
	    uni.uploadFile({
	        url: uni.getStorageSync("url"),
	        filePath: me.showImgNewAdd[i],
	        name: 'file',
			// #ifdef MP-ALIPAY
			header: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			},
			fileType: 'image',
			// #endif
	        formData:data,
	        success:function(res){
	            // var res2=JSON.parse(res.data)
	            var res2=res.data;
	            var json = {};				
	            if(typeof res2 == 'string'){
	            	// #ifndef H5
	            	if(me.platform1 == 'android'){
	            		let str = res2.replace('\r\n/g','').replace(/\n/g,"").replace(/\r/g,"").replace(/\\/g,"");						
	            		var retData = str.split(',');
	            		console.info(retData);
	            		json.code = retData[0].split(':')[1];
	            		if(str.indexOf('p_id')!=-1){
	            			json.p_id = retData[1].split(':')[1];
	            		}						
	            	} else {
	            		json = JSON.parse(res2);
	            	}
	            	// #endif
	            	
	            	// #ifdef H5
	            	json = JSON.parse(res2);
	            	// #endif
	            	
	            }
	            if(json.code==200){
	                me.p_id=json.p_id
	                i++
	                if(i==me.showImgNewAdd.length){
	                    uni.showToast({
	                        title:'上传成功',
	                        duration:1500,
	                        icon:'none'
	                    })
	                    setTimeout(function(){
							me.fastTap=true
	                        uni.navigateBack({
	                            delta:1
	                        })
	                        me.attr_group=[]
	                        me.attr_arr=[]
	                    },1500)
	                }
	            }else{
	                uni.showToast({
	                    title:json.message,
	                    duration:1500,
	                    icon:'none'
	                })
					me.check_Flag=true
	                return
	            }
	            res1(json.p_id);
	        },
	        error:function(){
	            me.fastTap=true
				me.check_Flag=true
	        },
			complete:function(){
				me.fastTap=true;
				uni.hideLoading();
			}
	    })
	})
}

export function in_array (stringToSearch, arrayToSearch) {
	for (let s = 0; s < arrayToSearch.length; s++) {
		let thisEntry = arrayToSearch[s].toString();
		if (thisEntry == stringToSearch) {
			return true;
		}
	}
	return false;
}
