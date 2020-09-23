/*
 * @Description: 表单数据预处理
 * @Author: 绍吉
 * @Date: 2019-08-23 15:37:31
 * @LastEditTime: 2019-08-30 18:14:16
 * @LastEditors: Please set LastEditors
 */

const pt = (code) => {
  const status = new Map([
    ['pt-0','待付款'],
    ['pt-1','拼团成功-待发货'],
    ['pt-2','拼团成功-已发货'],
    ['pt-3','拼团成功-待评价'],
    ['pt-9','拼团中'],
    ['pt-10','拼团失败-未退款'],
    ['pt-11','拼团失败-已退款'],
    ['pt-6','交易关闭'],
    ['pt-12','交易完成'],
    ['pt-5','交易完成'],
    ['default','']
  ])
  return status.get(code) || status.get('default')
}


const p = (code) => {
  const status = new Map([
    ['-0','待付款'],
    ['-1','待发货'],
    ['-2','已发货'],
    ['-3','交易成功'],
    ['-4','退货'],
    ['-5','交易成功'],
    ['-12','交易完成'],
    ['-7','交易关闭'],
    ['-6','交易关闭'],
    ['default','']
  ])
  return status.get(code) || status.get('default')
}

const integral = (code) => {
  const status = new Map([
    ['integral-0','待付款'],
    ['integral-1','待发货'],
    ['integral-2','已发货'],
    ['integral-3','交易成功'],
    ['integral-4','退货'],
    ['integral-5','交易成功'],
    ['integral-12','交易完成'],
    ['integral-7','交易关闭'],
    ['integral-6','交易关闭'],
    ['default','']
  ])
  return status.get(code) || status.get('default')
}

const fx = (code) => {
  const status = new Map([
    ['FX-0','待付款'],
    ['FX-1','待发货'],
    ['FX-2','已发货'],
    ['FX-3','待评价'],
    ['FX-4','退货'],
    ['FX-5','交易成功'],
    ['FX-6','交易关闭'],
    ['FX-7','交易关闭'],
    ['FX-12','交易成功'],
    ['default','']
  ])
  return status.get(code) || status.get('default')
}

const kj = (code) => {
  const status = new Map([
    ['KJ-0','待付款'],
    ['KJ-1','待发货'],
    ['KJ-2','已发货'],
    ['KJ-3','待评价'],
    ['KJ-4','退货'],
    ['KJ-5','交易成功'],
    ['KJ-6','交易关闭'],
    ['KJ-7','交易关闭'],
    ['KJ-12','交易成功'],
    ['default','']
  ])
  return status.get(code) || status.get('default')
}

const ms = (code) => {
  const status = new Map([
    ['MS-0','待付款'],
    ['MS-1','待发货'],
    ['MS-2','已发货'],
    ['MS-3','待评价'],
    ['MS-4','退货'],
    ['MS-5','交易成功'],
    ['MS-6','交易关闭'],
    ['MS-7','交易关闭'],
    ['MS-12','交易成功'],
    ['default','']
  ])
  return status.get(code) || status.get('default')
}

const CODE = new Map([
  [/^pt-[0-99]/,pt],
  [/^-[0-99]/,p],
  [/^integral-[0-99]/,integral],
  [/^FX-[0-99]/,fx],
  [/^KJ-[0-99]/,kj],
  [/^MS-[0-99]/,ms]
])


const setEvaluationText = () => {
  // if="(orders.r_status==3&&item.list.length>1) || (orders.r_status==3&& item.otype == 'pt')
  // if="orders.r_status==5&&item.list.length>1 && item.otype != 'pt'" 

}

const getLeftText = (code,isExtract) => {
  const leftText = [
    '取消订单',
    '查看物流',
    '删除订单',
    // '查看详情',
    '',
    '拼团详情'
  ]
  
  let status = null
  if(isExtract){
    status = new Map([
      [0,leftText[0]],
      [1,leftText[3]],
      [2,leftText[1]],
      [3,leftText[1]],
      [4,leftText[3]],
      [5,leftText[1]],
      [6,leftText[2]],
      [7,leftText[2]],
      [12,leftText[3]],
      ['default','']
    ])
  } else {
    status = new Map([
      [0,leftText[0]],
      [2,leftText[1]],
      [3,leftText[1]],
      [5,leftText[1]],
      [7,leftText[2]],
      [6,leftText[2]],
      [11,leftText[2]],
      [12,leftText[2]],
      [9,leftText[4]],
      [10,leftText[4]],
      [1,leftText[4]],
      ['default','']
    ])
  }
  
  return status.get(parseInt(code)) || status.get('default')
}

const getRightText = (code,isExtract) => {
  const rightText = [
    '立即付款',
    '提醒发货',
    '确认收货',
    // '待评价',
    '',
    '退货',
    // '追加评价',
    '',
    '再次购买',
    '拼团详情',
    '邀请好友'
  ]

	let status = null
	if(isExtract){
		status = new Map([
			[0,rightText[0]],
			[1,rightText[1]],
			[2,rightText[2]],
			[3,rightText[3]],
			[4,rightText[4]],
			[5,rightText[5]],
			[6,rightText[6]],
			[7,rightText[6]],
			[12,rightText[6]],
			['default','']
		])
	} else {
		status = new Map([
			[0,rightText[0]],
			[1,rightText[1]],
			[2,rightText[2]],
			[3,rightText[3]],
			[4,rightText[4]],
			[5,rightText[5] + '11'],
			[9,rightText[8]],
			[11,rightText[7]],
			['default','']
		])
	}

  return status.get(parseInt(code)) || status.get('default')
}
export default function(list){
  if(Array.isArray(list)){
    for(let item of list){
      let { ismch,shop_name,shop_id,otype,status,list } = item

      if(otype !== 'pt') {
        item['isExtract'] = true
      }
			
			const code = `${ otype }-${ status }`
			
			for(let or of CODE){
				if(or[0].test(code)){
					item['codetext'] = or[1](code)
					break
				}
			}
			
			item['leftText'] = getLeftText(status,item.isExtract)
			item['rightText'] = getRightText(status,item.isExtract)

      // 198 判断提取码
    }
		
		// 商品数据
		function setComList(list){
			
			let arr = []
			
			for( let item of list){
				if(item.shop_name !== undefined){
					
					if(!arr.length){
						arr.push(item.shop_name)
						
						continue
					}
					arr.push(item.shop_name)
				}
			}
			
			
			let result = repetitionIndex(arr)
			console.log(arr)
			console.log(result)
			
			// 删除店铺名
			for(let item of result){
				list[item].shop_name = ''
			}
		}
		
		// 获取重复店铺下标
		function repetitionIndex(arr){
			let result = []
			
			for(let i = 0 ; i < arr.length; i++) {
			  for(let j = 1; j < arr.length; j++) {
			    if(arr[i] === arr[j] && j !== i && j > i) {
			      result.push(j)
			    }
			  }
			}
			
			return result
		}
		
		list.forEach(e => {
			setComList(e.list)
		})
  }
	
}
