(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-order~pages-order-order_payment"],{"1e2d":function(e,t,a){"use strict";function o(e){var t=e;t.axios_times++;var a={access_id:t.access_id,order_id:t.orde_id,module:"app",action:"order",app:"order_details"};uni.request({data:a,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){if(200==e.data.code){var a=e.data,o=a.data,r=a.data,n=r.password_status,i=r.logistics,s=r.z_price,u=r.user_money,d=r.enterless,c=r.payment,l=r.sNo,p=r.id,_=r.remarks;if(0==o.status&&"pt"==o.otype&&(o.product_total2=o.product_total.toFixed(2),t.is_end=o.is_end,o.product_total=o.list[0].p_price=o.z_price=(100*o.z_price/100).toFixed(2)),t.is_end=o.is_end,t.user_can_open=o.user_can_open,t.user_can_can=o.user_can_can,t.user_can_after=o.user_can_after,t.payment=c,t.order=o,t.btnText1=0==t.order.status&&t.leftText?t.leftText[0]:3==t.order.status||5==t.order.status||4==t.order.status?t.leftText[1]:7==t.order.status||6==t.order.status?t.leftText[2]:"",t.btnText2="cantuan"!=t.pttype||7!=t.order.status&&6!=t.order.status&&11!=t.order.status&&12!=t.order.status?0==t.order.status&&("cantuan"!=t.pttype||"cantuan"==t.pttype&&1==t.gstatus.ptstatus)&&t.rightText?t.rightText[0]:1==t.order.status?t.order.list.length>1?t.rightText[7]:t.rightText[1]:2==t.order.status?t.rightText[2]:3==t.order.status?t.rightText[3]:7==t.order.status||6==t.order.status||12==t.order.status?t.rightText[4]:4==t.order.status?t.rightText[5]:8==t.order.status||5==t.order.status?t.rightText[6]:t.rightText&&t.rightText[0]:t.leftText[1],1==t.axios_times&&(t.flag="cantuan"==t.pttype&&2==t.gstatus.ptstatus),t.enterless=d,t.load=!1,t.sNo=l,t.order_id=p,t.z_price_=s,t.remarks=_,t.password_status=n,t.cancelGoods=e.data.data.list[0].prompt,t.is_distribution=e.data.data.list[0].is_distribution,t.cancelGoodsReason=e.data.data.list[0].r_content||"暂无！",i.length>0?t.logistics=i:t.logistics=!1,t.price=s,t.user_money=u,t.message=t.order.sNo,t.otype=t.order.otype,t.pttype=t.order.pttype,t.gstatus=t.order.gstatus,t.ordermsg=t.order.omsg,t.p_id=t.order.pro_id,t.checkgroup(),t.message.indexOf("KJ")>-1&&(t.kanjia=!0),"pt"==t.otype?(t.endpay=t.order.z_price,t.price=t.endpay):t.endpay=t.order.z_price,2==t.order.status||3==t.order.status||5==t.order.status||8==t.order.status)t.order_wl=!0,t.showPay1=!1;else if(0==t.order.status)if("cantuan"!=t.pttype||"cantuan"==t.pttype&&1==t.gstatus.ptstatus){var f=function(e){var a=new Date;t.time_c=parseInt((e-a.getTime())/1e3),t.time_c>=0?(t.time_D=Math.floor(t.time_c/60/60/24),t.time_H=Math.floor(t.time_c/3600%24),t.time_M=Math.floor(t.time_c/60%60),t.time_S=Math.floor(t.time_c%60),t.order_zt="".concat(t.time_H,"时").concat(t.time_M,"分").concat(t.time_S,"秒后订单关闭")):clearInterval(t.setTime)};t.order_wl=!1;var g=t.order.add_time,y=g.split(" "),m=y[0].replace("-","/"),h=m.replace("-","/"),w=h+","+y[1],v=new Date(w),T=v.getTime()+60*t.order.order_failure*60*1e3;if("cantuan"==t.pttype){var S=t.gstatus.endtime;S=new Date(S.replace(/-/g,"/")).getTime(),T=T>S?S:T}t.setTime=setInterval((function(){f(T)}),1e3)}else"cantuan"==t.pttype&&2==t.gstatus.ptstatus?(t.showPay1=!1,t.order_zt="此团已成功，请重新选择参团或开团",t.can_pay=!1,setTimeout((function(){return uni.showToast({title:"此团已成功，请重新选择参团或开团",icon:"none",duration:2e3}),!1}),700)):"cantuan"==t.pttype&&3==t.gstatus.ptstatus&&(t.showPay1=!1,t.order_zt="此团已失败，请重新选择参团或开团",t.can_pay=!1,setTimeout((function(){uni.showToast({title:"此团已失败，请重新选择参团或开团",icon:"none",duration:2e3});var e={module:"app",action:"order",order_id:t.orde_id,app:"removeOrder",access_id:t.access_id};e.app="removeOrder",uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){var t=e.data;t.code,t.message},error:function(e){console.log(e)}})}),700));else 1==t.order.status?(t.order_wl=!1,t.order_zt="等待发货",t.showPay1=!1):7==t.order.status&&(t.order_wl=!1,t.order_zt="超时关闭",t.showPay1=!1);0!=t.order.status&&(t.showPay1=!1),t.isshow()}else uni.showToast({title:e.data.message,duration:1500,icon:"none"})}})}function r(e){var t=e,a=window.location.href,o={type:"jsapi_wechat",access_id:t.access_id,app:"get_config",module:"app",action:"commcenter",url:a};uni.request({data:o,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){if(200==e.data.code){var a=e.data.data.config.appid;t.myappid=a;var o=e.data.data.url,r="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+a+"&redirect_uri="+o+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";console.log(r)}else uni.showToast({title:e.data.message,duration:1500,icon:"none"})},error:function(e){console.log(e)}})}function n(e,t){var a=t;if(a.fastTap){a.fastTap=!1;var r={module:"app",order_id:e,access_id:a.access_id,app:"delivery_delivery",action:"order"};uni.request({data:r,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){a.fastTap=!0,200==e.data.code?(uni.showToast({title:"已提醒卖家发货！",duration:1e3,icon:"none"}),o(a)):uni.showToast({title:e.data.message,duration:1500,icon:"none"})}})}}function i(e,t){var a=t;if(a.fastTap)if(a.fastTap=!1,a.enterless)if(6==a.msg.length){var o={module:"app",action:"user",app:"payment_password",access_id:a.access_id,password:a.msg,endTime:""};uni.request({data:o,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){a.pay_display=!1,a.fastTap=!0;var o=t.data,r=o.code,n=(o.message,o.enterless);200==r?a._payAxios(e):n?(uni.showToast({title:"您输入密码错误，请重试",duration:1e3,icon:"none"}),a.pay_display=!1,a.msg=""):n||(a.pay_display=!1,a.enterless=!1,uni.showToast({title:"您输入密码错误，请明天再使用钱包支付",duration:1e3,icon:"none"}))},error:function(e){a.fastTap=!0}})}else a.fastTap=!0,uni.showToast({title:"请输入完整密码！",duration:1e3,icon:"none"});else a.fastTap=!0,uni.showToast({title:"你输入的错误次数已达当日上限，请使用其它支付方式进行付款",duration:1e3,icon:"none"}),a.pay_display=!1}function s(e,t){var a=t,o={module:"app",action:"pay",app:"wallet_pay",m:"wallet_pay",type:"wallet_pay",access_id:a.access_id,payment_money:a.value,orde_id:a.orde_id,sNo:a.sNo,parameter:"order"};"pt"==a.otype&&(o.grade_rate=a.order.comm_discount,o.ptcode=a.ordermsg.ptcode,o.pro_id=a.p_id,o.man_num=a.ordermsg.groupman,o.page=a.pttype),uni.request({data:o,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){a.fastTap=!0;var t=e.data,o=t.code;t.message;if(200==o)if(Number(a.price1)>0)a.wxPayStatue?a.pay_wx("wx"):a.aliPayStatue?a.pay_wx("ali"):a.baidupayStatue&&a.pay_wx("baidu_pay");else{uni.showToast({title:"支付成功！",duration:1e3,icon:"none"});var r="";r=a.order_id?a.order_id:a.or_id,a.pay_display=!1;var n="",i=Number(a.order.z_price)+Number(a.order.offset_balance);n="pt"==a.otype&&parseFloat(a.price1)<=0?"../../pagesA/group/group_end?sNo="+a.sNo+"&ptcode1="+a.ptcode:"../../pages/pay/payResult?payment_money="+i+"&sNo="+a.sNo+"&order_id="+r,uni.redirectTo({url:n})}else a.pay_display=!1,a.msg="",uni.showToast({title:e.data.message,duration:1500,icon:"none"})},error:function(e){console.log(e)},fail:function(e){}})}function u(e){var t=e;t.useWallte?t.wxPayStatue?t.pay_wx():(uni.showToast({title:"请选择支付方式！",duration:1e3,icon:"none"}),t.firstFlag=!0):t.wxPayStatue||t.aliPayStatue||t.baidupayStatue?t.wxPayStatue?t.pay_wx("wx"):t.aliPayStatue?t.pay_wx("ali"):t.baidupayStatue&&t.pay_wx("baidu_pay"):(uni.showToast({title:"请选择支付方式！",duration:1e3,icon:"none"}),t.firstFlag=!0)}function d(e){var t=e;if(t.value||(t.value=0),t.price1=t.price-Number(t.value),t.price1=t.price1.toFixed(2),"cantuan"!=t.pttype||t.iscan)if(t._gotPayType(),t.useWallte)0==t.password_status?uni.showModal({title:"提示",content:"请先设置支付密码",showCancel:!0,success:function(e){t.firstFlag=!0,e.confirm&&uni.navigateTo({url:"../../pagesB/setUp/payment"})}}):t.price1>0&&0!=Number(t.needpay)?t.wxPayStatue||t.aliPayStatue||t.baidupayStatue?0==Number(t.value)?(t.useWallte=!1,t.payThree()):t.pay_display=!0:(t.firstFlag=!0,uni.showToast({title:"余额不足，请选择其它支付方式",icon:"none",duration:1500})):t.pay_display=!0;else{if(!t.wxPayStatue&&!t.baidupayStatue&&!t.aliPayStatue)return uni.showToast({title:"请选择支付方式！",duration:1e3,icon:"none"}),void(t.firstFlag=!0);t.payThree()}else uni.showModal({title:"提示",content:"无法继续参团,需要参加其它团吗?",success:function(e){e.confirm?uni.navigateTo({url:"../../pagesA/group/group"}):e.cancel&&console.log("用户点击取消")}})}function c(e){var t=e,a={module:"app",action:"groupbuy",m:"checkgroup",access_id:t.access_id,sNo:t.message};return new Promise((function(e){uni.request({url:uni.getStorageSync("url"),data:a,success:function(e){200==e.data.code&&(t.iscan=!0)},fail:function(t){e(t)}})}))}function l(e,t){var a=t;"wxPay"==e?a.wxPayStatue?a.wxPayStatue=!1:(a.wxPayStatue=!0,a.aliPayStatue=!1,a.baidupayStatue=!1):"aliPay"==e?a.aliPayStatue?a.aliPayStatue=!1:(a.wxPayStatue=!1,a.baidupayStatue=!1,a.aliPayStatue=!0):"baidu"==e&&(a.baidupayStatue?a.baidupayStatue=!1:(a.wxPayStatue=!1,a.aliPayStatue=!1,a.baidupayStatue=!0))}function p(e){var t=e;t.loading=!0,uni.hideLoading(),uni.login({provider:"weixin",success:function(e){var a={code:e.code,sNo:t.sNo,title:t.order.list[0].p_name,type:"mini_wechat",access_id:t.access_id,total:t.price1,module:"app",action:"pay"};uni.request({url:uni.getStorageSync("url"),data:a,success:function(e){if(200===e.statusCode)if(200==e.statusCode){var a=e.data;uni.requestPayment({provider:"wxpay",timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:"MD5",paySign:a.paySign,success:function(e){var a="";a=t.orde_id?t.orde_id:t.or_id,setTimeout((function(){uni.showToast({title:"支付成功1！",duration:1e3,icon:"none"});var e="";e="pt"==t.otype?"../../pagesA/group/group_end?sNo="+t.sNo+"&ptcode="+t.ptcode:"../../pages/pay/payResult?payment_money="+t.order.z_price+"&sNo="+t.sNo+"&order_id="+a,uni.redirectTo({url:e})}),1e3)},fail:function(e){uni.showModal({title:"提示",content:"支付失败，请重试",success:function(e){t.$store.state.payRes=t.order_list,e.confirm?uni.redirectTo({url:"../order/myOrder"}):e.cancel&&uni.switchTab({url:"../tabBar/home"})}})},complete:function(){t.loading=!1,uni.hideLoading()}})}else uni.showModal({title:"提示",content:"支付失败，请重试",success:function(e){t.$store.state.payRes=t.order_list,e.confirm?uni.redirectTo({url:"../order/myOrder"}):e.cancel&&uni.switchTab({url:"../tabBar/home"})}});else uni.showModal({title:"提示",content:"支付失败，请重试",success:function(e){t.$store.state.payRes=t.order_list,e.confirm?uni.redirectTo({url:"../order/myOrder"}):e.cancel&&uni.switchTab({url:"../tabBar/home"})}})},fail:function(e){t.loading=!1,uni.hideLoading(),uni.showModal({title:"提示",content:"支付失败，请重试",success:function(e){t.$store.state.payRes=t.order_list,e.confirm?uni.redirectTo({url:"../order/myOrder"}):e.cancel&&uni.switchTab({url:"../tabBar/home"})}})}})},fail:function(e){t.loading=!1,uni.hideLoading(),uni.showModal({title:"提示",content:"支付失败，请重试",success:function(e){t.$store.state.payRes=t.order_list,e.confirm?uni.redirectTo({url:"../order/myOrder"}):e.cancel&&uni.switchTab({url:"../tabBar/home"})}})}})}function _(e,t){var a=t;a.frist_show=!1,a.useWallte=e.detail.value,a.useWallte?"pt"!=a.otype?Number(a.order.z_price)>Number(a.user_money)?(a.value=a.user_money,a.needpay=parseFloat(a.order.z_price-a.user_money).toFixed(2)):(a.value=a.order.z_price,a.needpay=0):Number(a.endpay)>Number(a.user_money)?(a.value=a.user_money,a.needpay=parseFloat(a.endpay-a.user_money).toFixed(2)):(a.value=a.endpay,a.needpay=0):(a.value="",a.needpay="")}function f(e,t,a,o,r){var n=r,i=[];i.push(t),1==o||0==o||2==o||3==o?n.order.list.length>1?1==o?uni.navigateTo({url:"../../pagesA/returnGoods/returnGoods?rType=true&order_details_id="+i+"&order_anking=1&r_status="+o}):uni.navigateTo({url:"../../pagesA/returnGoods/returnGoods?order_details_id="+i+"&order_anking=1&r_status="+o}):1==o?uni.navigateTo({url:"../../pagesA/returnGoods/returnGoods?rType=true&order_details_id="+i+"&order_anking=1&r_status="+o}):2==o?uni.navigateTo({url:"../../pagesA/returnGoods/returnGoods?order_details_id="+i+"&order_anking=1&r_status="+o}):uni.navigateTo({url:"../../pagesA/returnGoods/refund?refund_type=3&order_details_id="+i+"&order_anking=1&r_status=3&rType=3"}):4==o||3==o&&uni.navigateTo({url:"../evaluate/evaluating?order_id="+t+"&num=one"})}function g(e){var t={module:"app",order_id:e.orde_id,access_id:e.access_id,app:"see_extraction_code",action:"order"};uni.request({data:t,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){e.receiving_shop.flag=!0,e.fastTap=!0,200==t.data.code?e.receiving_check=t.data.list:uni.showToast({title:t.data.message,duration:1500,icon:"none"})}})}function y(e,t,a,r,n){var i=n,s={module:"app",action:"order",order_id:a,access_id:i.access_id};0==r?(s.app="removeOrder",uni.request({data:s,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){var t=e.data,a=t.code;t.message;200==a?(i.is_remove_order=!0,uni.showToast({title:"取消成功！",duration:1e3,icon:"none"}),setTimeout((function(){uni.navigateBack({delta:1})}),1e3)):202==a?(uni.showToast({title:"卖家已发货！",duration:1e3,icon:"none"}),o(i)):uni.showToast({title:e.data.message,duration:1e3,icon:"none"})},error:function(e){console.log(e)}})):7==r||6==r?uni.navigateTo({url:"../expressage/expressage?sNo="+t}):2!=r&&3!=r&&5!=r&&4!=r||(s.app="del_order",uni.request({data:s,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){var t=e.data,a=t.code,o=t.message;200==a?(uni.showToast({title:"删除成功！",duration:1e3,icon:"none"}),uni.navigateBack({delta:1})):uni.showToast({title:o,duration:1e3,icon:"none"})},error:function(e){console.log(e)}}))}function m(e,t,a,r){var n=r;if(1==a)uni.navigateTo({url:"../returnGoods/returnGoods?order_details_id="+t+"&order_anking=1"});else if(0==a){if(n.is_end)return uni.showToast({title:"拼团活动已经结束！！",duration:1500,icon:"none"}),!1;if(!n.order.user_can_ms)return uni.showToast({title:"此商品秒杀数已达上限！",duration:1500,icon:"none"}),!1;if(!n.order.user_can_buy_ms)return uni.showToast({title:"此秒杀商品已经超过秒杀时间！",duration:1500,icon:"none"}),!1;if(!n.order.user_can_can)return uni.showToast({title:"参团数已达上限！",duration:1500,icon:"none"}),!1;if(!n.order.user_can_open)return uni.showToast({title:"开团数已达上限",duration:1500,icon:"none"}),!1;if(n.order.isagain_can&&"cantuan"==n.pttype)return uni.showToast({title:"不可重复参加此商品的团！",duration:1500,icon:"none"}),!1;if(n.order.isagain_open&&"kaituan"==n.pttype)return uni.showToast({title:"不可重复开此商品的团！",duration:1500,icon:"none"}),!1;if(n.order.isinpt)return uni.showToast({title:"你已经参加过该团！",duration:1500,icon:"none"}),!1;r._pay_style()}else if(2==a){var i={module:"app",action:"order",app:"ok_Order",order_id:t,access_id:r.access_id};uni.request({data:i,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){var t=e.data,a=t.code;t.message;200==a?(uni.showToast({title:"收货成功",duration:1500,icon:"none"}),setTimeout((function(){o(n)}),1500)):uni.showToast({title:e.data.message,duration:1500,icon:"none"})},error:function(e){console.log(e)}})}else if(3==a)uni.navigateTo({url:"../evaluate/evaluating?order_id="+r.orde_id+"&num=all"});else if(7==a||6==a||12==a){if(n.is_end)return uni.showToast({title:"拼团活动已经结束！",duration:1500,icon:"none"}),!1;i={module:"app",action:"order ",app:"buy_again",id:t,access_id:r.access_id};uni.request({data:i,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){var t=e.data,a=t.cart_id,o=t.code;t.message;200==o?(n.cart_id(a),n.address_id(""),uni.navigateTo({url:"../pay/orderDetailsr?returnR=2&&buy_again=true"})):uni.showToast({title:e.data.message,duration:1500,icon:"none"})},error:function(e){console.log(e)}})}else if(4==a){var s=uni.getStorageSync("url")+"&module=app&action=kefu";setTimeout((function(){window.location.href=s}),500)}else 5!=a&&8!=a||uni.navigateTo({url:"../evaluate/evaluating?order_id="+t+"&add=true"})}function h(e,t){var a=t;if(1==e)uni.showToast({title:"请不要频繁点击提醒！",duration:1e3,icon:"none"});else if(0==e){a.stau_num=1;var o=86400;a.timer||(a.count=o,a.timer=setInterval((function(){a.count>0&&a.count<=o?a.count--:(a.stau_num=0,clearInterval(a.timer),a.timer=null)}),1e3)),uni.showToast({title:"已提醒卖家发货！",duration:1e3,icon:"none"})}}function w(e,t,a){var o=a;o.needpay=parseFloat(o.endpay-e).toFixed(2),o.$nextTick((function(){if(o.price1=o.price-o.value,o.price1=Number(o.price1).toFixed(2),Number(o.value)>o.price?(Number(o.price)<=Number(o.user_money)?o.value=o.price:o.value=o.user_money,uni.showToast({title:"已超过最大金额",icon:"none",duration:1500})):Number(o.value)<Number(o.price)&&Number(o.value)>Number(o.user_money)&&(o.value=o.user_money,uni.showToast({title:"已超过最大金额",icon:"none",duration:1500})),o.price,Number(o.value),0==Math.abs(e-t)){var a=String(e).indexOf(".")+1,r=String(e).length-a;r>2&&0!=a&&(o.value=Number(e).toFixed(2))}else Math.abs(e-t)<.009999999999&&(o.value=Number(o.value).toFixed(2))}))}function v(e,t){var a=t,o={access_id:a.access_id,sNo:a.sNo,title:a.order.list[0].p_name,module:"app",action:"pay",type:"app_wechat",total:a.price1};a.wxPayStatue?(o.type="jsapi_wechat",o.code=a.code):a.aliPayStatue?o.type="alipay_mobile":a.baidupayStatue;var r=a.LaiKeTuiCommon.getMPAliAuthCode();return r.then((function(e){return new Promise((function(e){uni.request({url:uni.getStorageSync("url"),data:o,success:function(t){200==t.statusCode?e(t):uni.showToast({title:t.data.message,duration:1500,icon:"none"})},fail:function(t){e(t)}})}))}))}function T(e){var t=e;uni.showModal({title:"提示",content:"支付失败,查看订单详情",success:function(e){t.firstFlag=!0,e.confirm?window.location.href=uni.getStorageSync("h5_url")+"pages/order/myOrder?status=1":e.cancel&&(window.location.href=uni.getStorageSync("h5_url")+"pages/tabBar/home")}})}function S(e,t){var a=t("#order_no input");a.select(),document.execCommand("Copy"),uni.showToast({title:"复制成功",duration:1500,icon:"none"})}a("99af"),a("c975"),a("a9e3"),a("b680"),a("d3b7"),a("acd8"),a("e25e"),a("ac1f"),a("5319"),a("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t._axios=o,t.toUrl=r,t.txfh=n,t._confirm=i,t._payAxios=s,t.payThree=u,t._pay_style=d,t.checkgroup=c,t.chooseWay=l,t.weixinPay=p,t.switchChange=_,t._after=f,t._receiving=g,t._submitOne=y,t._submitTwo=m,t.back_click=h,t.changeValue=w,t.getOrderInfo=v,t._payFail=T,t.onCopy=S},2023:function(e,t,a){"use strict";var o=a("4ea4");a("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(a("5530")),n=a("2f62"),i=a("7d99"),s={data:function(){return{back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},onLoad:function(e){console.log("header-h5"),console.log(this.returnR)},computed:{halfWidth:function(){var e=(0,i.getStorage)("data_height")?(0,i.getStorage)("data_height"):this.$store.state.data_height,t=parseInt(e),a=2*t;return uni.upx2px(a)+"px"}},props:["title","returnR"],methods:(0,r.default)((0,r.default)({},(0,n.mapMutations)({status:"data_height"})),{},{_back1:function(){console.log("this.returnR == 00"),console.log(this.returnR),1==this.returnR||"1"==this.returnR?(console.log("if1"),uni.navigateBack({delta:1})):2==this.returnR||"2"==this.returnR?uni.navigateBack({delta:2}):"h5"==this.returnR?(console.log(this.returnR),uni.reLaunch({url:"/pages/tabBar/my"})):"myOrder"==this.returnR?uni.navigateBack({delta:1}):(console.log("returnRdefault"),uni.switchTab({url:"/pages/tabBar/home"}))}})};t.default=s},5605:function(e,t,a){"use strict";var o=a("b554"),r=a.n(o);r.a},"727c":function(e,t,a){"use strict";a.r(t);var o=a("c8f3"),r=a("b920");for(var n in r)"default"!==n&&function(e){a.d(t,e,(function(){return r[e]}))}(n);a("5605");var i,s=a("f0c5"),u=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"385f9e6c",null,!1,o["a"],i);t["default"]=u.exports},b554:function(e,t,a){var o=a("c075");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var r=a("4f06").default;r("cc6611e4",o,!0,{sourceMap:!1,shadowMode:!1})},b920:function(e,t,a){"use strict";a.r(t);var o=a("2023"),r=a.n(o);for(var n in o)"default"!==n&&function(e){a.d(t,e,(function(){return o[e]}))}(n);t["default"]=r.a},c075:function(e,t,a){var o=a("24fb");t=o(!1),t.push([e.i,".head[data-v-385f9e6c]{position:fixed;left:0;top:0;background-color:#fff;width:100%;z-index:40}.header img[data-v-385f9e6c]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-385f9e6c]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-385f9e6c]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-385f9e6c]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header span[data-v-385f9e6c]{height:%?88?%;width:%?60?%;display:inline-block;position:absolute}",""]),e.exports=t},c8f3:function(e,t,a){"use strict";var o;a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"head"},[a("div",{staticClass:"data_h",style:{height:e.halfWidth}},[a("div",{staticClass:"data_h_h",style:{height:e.halfWidth}})]),a("div",{staticClass:"header"},[a("span",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._back1.apply(void 0,arguments)}}},[a("img",{attrs:{src:e.back}})]),a("p",[e._v(e._s(e.title))])])])},n=[]}}]);