(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-myStore-myStore"],{2721:function(t,a,e){var i=e("58a5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("0fdb70af",i,!0,{sourceMap:!1,shadowMode:!1})},"2ef7":function(t,a,e){"use strict";var i=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(e("4eb3")),n=(e("7d99"),{data:function(){return{load:!0,loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/5-121204193R7.gif",access_id:"",title:"我的店铺",fastTap:!0,reason:"",noStore:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/noStore.png",checkImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/checkIng.png",haveStore:3,myCli:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/myCli.png",livePlayImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/hhhh2x.png",storeLogo:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/storeLogo.png",myPro:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/myPro.png",ULPro:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/ULPro.png",myOrder:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/myOrder.png",storeSet:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/storeSet.png",storeSite:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/storeSite.png",checkFalse:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/checkFalse.png",myCha:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/myCha.png",mystore_skill:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/mystore_skill.png",mystore_activity:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/mystore_activity.png",mystore_group:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/mystore_group.png",info:"",returnR:7,livePlayUrl:"plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=1",padding:"30upx;background-image: url("+this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"/images/icon1/QRcode.png);background-size: 100% auto;background-repeat: no-repeat;",style:"background-image: url("+this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"/images/icon1/QRcode.png);background-size: 100% auto;background-repeat: no-repeat;"}},mounted:function(){var t=this;t.$nextTick((function(){t.$refs.lktAuthorizeComp.handleAfterAuth(t,"../../pages/login/login?landing_code=1",(function(){t.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):t.$store.state.access_id,t._axios()}))}))},methods:{changeLoginStatus:function(){var t=this;t.access_id=uni.getStorageSync("access_id"),t._axios()},_navigateTo:function(t){uni.navigateTo({url:t})},_toApply:function(){uni.navigateTo({url:"../myStore/applyStore"})},_toApply1:function(){console.log(110),uni.navigateTo({url:"../myStore/applyStore?goOn=true"})},_axios:function(){var t=this;t.livePlayUrl="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=1",uni.request({data:{access_id:t.access_id,module:"app",action:"mch",m:"index"},url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(a){if(console.log(a),setTimeout((function(){t.load=!1}),200),200==a.data.code){t.haveStore=a.data.status;var e=1;a.data.data.roomid&&(e=a.data.data.roomid),t.reason=a.data.data.review_result,t.info=a.data.data,0==e&&(e=1),t.livePlayUrl="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=",t.livePlayUrl=t.livePlayUrl+e,uni.setStorage({key:"shop_id",data:a.data.data.shop_id}),t.$store.state.shop_id=a.data.data.shop_id}else uni.showToast({title:a.data.message,duration:1500,icon:"none"})}})},QRcode:function(){this._navigateTo("../myStore/QRcode")}},components:{heads:o.default}});a.default=n},3334:function(t,a,e){"use strict";var i=e("2721"),o=e.n(i);o.a},4005:function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}));var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("lktauthorize",{ref:"lktAuthorizeComp",on:{pChangeLoginStatus:function(a){arguments[0]=a=t.$handleEvent(a),t.changeLoginStatus.apply(void 0,arguments)}}}),e("heads",{attrs:{title:t.title,returnR:t.returnR}}),t.load?e("div",{staticClass:"load"},[e("div",[e("img",{attrs:{src:t.loadGif}}),e("p",[t._v("加载中")])])]):e("div",[1==t.haveStore?e("div",{staticClass:"checkDiv"},[e("div",{staticClass:"noFindDiv"},[e("div",{staticStyle:{}},[e("img",{staticClass:"noFindImg",attrs:{src:t.checkImg}})]),e("div",{staticClass:"checkDivData"},[t._v("审核中")]),e("span",{staticClass:"noFindText font_24"},[t._v("您的资料已提交，正在审核中，请耐心等待")]),e("div",{staticClass:"goOn"})])]):2==t.haveStore?e("div",{staticClass:"checkDiv"},[e("div",{staticClass:"myStoreBox",style:t.style},[e("div",{staticClass:"myStoreTop"},[e("div",[e("img",{staticClass:"img",attrs:{src:t.info.logo}})]),e("div",[e("p",{staticClass:"infoName"},[t._v(t._s(t.info.name))]),e("p",{staticClass:"infoShop"},[t._v("简介："+t._s(t.info.shop_information))])]),e("div",{staticClass:"btnDiv",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.QRcode.apply(void 0,arguments)}}})]),e("div",{staticClass:"myStoreDataDiv"},[e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myOrder?status=all")}}},[e("p",{staticClass:"dataBlack"},[t._v(t._s(t.info.order_num))]),e("p",{staticClass:"dataGray"},[t._v("今日订单数")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myOrder?status=dfh")}}},[e("p",{staticClass:"dataBlack"},[t._v(t._s(t.info.order_num1))]),e("p",{staticClass:"dataGray"},[t._v("待发货订单")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myOrder?status=sh")}}},[e("p",{staticClass:"dataBlack"},[t._v(t._s(t.info.order_num2))]),e("p",{staticClass:"dataGray"},[t._v("售后订单")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myCli")}}},[e("p",{staticClass:"dataBlack"},[t._v(t._s(t.info.visitor_num))]),e("p",{staticClass:"dataGray"},[t._v("访客数")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myOrder?status=all")}}},[e("p",{staticClass:"dataBlack"},[t._v(t._s(t.info.income))]),e("p",{staticClass:"dataGray"},[t._v("今日新增收入")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myCha")}}},[e("p",{staticClass:"dataBlack"},[t._v(t._s(t.info.account_money))]),e("p",{staticClass:"dataGray"},[t._v("账户金额")])])]),e("div",{staticClass:"myStoreSetupDiv"},[e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/uploadPro")}}},[e("img",{attrs:{src:t.ULPro,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("上架商品")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myPro")}}},[e("img",{attrs:{src:t.myPro,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("我的商品")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myOrder")}}},[e("img",{attrs:{src:t.myOrder,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("我的订单")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myCha")}}},[e("img",{attrs:{src:t.myCha,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("我的提现")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("/pagesA/myStore/fight_manage")}}},[e("img",{attrs:{src:t.mystore_group,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("拼团管理")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("/pagesA/myStore/MsIndex")}}},[e("img",{attrs:{src:t.mystore_skill,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("限时秒杀")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("/pagesA/myStore/platform_activities")}}},[e("img",{attrs:{src:t.mystore_activity,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("活动管理")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/myCli")}}},[e("img",{attrs:{src:t.myCli,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("我的客户")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/storeSetup")}}},[e("img",{attrs:{src:t.storeSet,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("店铺设置")])]),e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._navigateTo("../myStore/storeList?status_class=1")}}},[e("img",{attrs:{src:t.storeSite,alt:""}}),e("p",{staticClass:"setupBlack"},[t._v("门店管理")])]),e("p",{staticClass:"clear"})])])]):0==t.haveStore?e("div",{staticClass:"relative"},[e("div",{staticClass:"myStoreDiv"},[e("div",{staticClass:"myStoreImgDiv"},[e("img",{staticClass:"img",attrs:{src:t.noStore}})]),e("div",{staticClass:"p-noFindText"},[t._v("您还未申请开店")]),e("div",{staticClass:"toApplyDiv",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._toApply()}}},[e("span",{staticClass:"toApply"},[t._v("申请开店")])])])]):3==t.haveStore?e("div",{staticClass:"checkDiv1"},[e("div",{staticClass:"noFindDiv"},[e("div",[e("img",{staticClass:"noFindImg",attrs:{src:t.checkFalse}})]),e("div",{staticClass:"checkDivData"},[t._v("审核未通过")]),e("span",{staticClass:"noFindText font_24"},[t._v("原因:"+t._s(t.reason))]),e("div",{staticClass:"goOn"},[e("div",{staticClass:"toApply1",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._toApply1.apply(void 0,arguments)}}},[t._v("继续申请")])])])]):t._e()])],1)},n=[]},"4eb3":function(t,a,e){"use strict";e.r(a);var i=e("7afc"),o=e("f60a");for(var n in o)"default"!==n&&function(t){e.d(a,t,(function(){return o[t]}))}(n);e("8918");var s,r=e("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"4b3c7e46",null,!1,i["a"],s);a["default"]=c.exports},"58a5":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".container[data-v-c2d15fba]{width:100vw;min-height:100vh;background-color:#f6f6f6}.checkDiv[data-v-c2d15fba]{position:relative;background-color:#fff;min-height:100vh}.checkDiv1[data-v-c2d15fba]{background-color:#fff;min-height:100vh;padding:0 %?30?%}.noFindImgDiv[data-v-c2d15fba]{padding-top:%?88?%}.checkDivData[data-v-c2d15fba]{font-size:%?30?%;color:#000}.goOn[data-v-c2d15fba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?40?%}.support[data-v-c2d15fba]{width:100%;height:%?80?%;color:#b8b8b8;font-size:%?24?%;text-align:center}.setupBlack[data-v-c2d15fba]{color:#020202;font-size:%?28?%}.myStoreDataDiv[data-v-c2d15fba]{border-radius:%?8?%;box-shadow:rgba(0,0,0,.16) 1px 1px %?20?% 1px;height:%?280?%;margin-top:%?41?%;text-align:center;padding:%?20?%;background:#fff}.myStoreSetupDiv[data-v-c2d15fba]{border-radius:%?8?%;margin-top:%?70?%;text-align:center}.myStoreSetupDiv img[data-v-c2d15fba]{width:%?62?%;height:%?62?%;margin-bottom:%?20?%}.myStoreSetupDiv div[data-v-c2d15fba]{width:33.33%;height:50%;float:left;margin-bottom:%?80?%}.myStoreDataDiv div[data-v-c2d15fba]{width:33.33%;height:50%;float:left}.dataBlack[data-v-c2d15fba]{color:#020202;font-size:%?32?%;margin:%?10?% 0;font-weight:700}.dataGray[data-v-c2d15fba]{color:#999;font-size:%?24?%}.myStoreTop[data-v-c2d15fba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;height:%?120?%;\n}.myStoreTop .img[data-v-c2d15fba]{width:%?120?%;height:%?120?%;border-radius:50%;margin-right:%?20?%}.infoName[data-v-c2d15fba]{color:#fff;font-size:%?35?%;margin-bottom:%?20?%;font-weight:600}.infoShop[data-v-c2d15fba]{color:#fff;font-size:%?22?%;word-wrap:break-word;width:%?460?%}.btnDiv[data-v-c2d15fba]{height:100%;width:%?120?%;margin-left:auto}.myStoreDiv[data-v-c2d15fba]{margin:%?30?%;background-color:#fff;padding:%?248?% %?20?% %?288?% %?20?%;text-align:center;border-radius:%?20?%}.toApply[data-v-c2d15fba]{border-radius:%?5?%;padding:%?20?% %?160?%;color:#fff;background-color:#020202;display:-webkit-box;display:-webkit-flex;display:flex;border-radius:%?10?%;font-size:%?30?%}.toApply1[data-v-c2d15fba]{border-radius:%?5?%;padding:%?20?% %?120?%;color:#020202;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;border-radius:%?10?%;font-size:%?30?%;border:1px solid #020202}.myStoreBox[data-v-c2d15fba]{padding:%?30?%}.font_24[data-v-c2d15fba]{font-size:%?24?%}.clear[data-v-c2d15fba]{clear:both}.supportData[data-v-c2d15fba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.supportData .img[data-v-c2d15fba]{width:%?28?%;height:%?28?%;margin-right:%?10?%}.myStoreImgDiv[data-v-c2d15fba]{margin-bottom:%?46?%}.myStoreImgDiv .img[data-v-c2d15fba]{width:%?108?%;height:%?108?%}.myStoreDiv > .toApplyDiv[data-v-c2d15fba]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:%?59?%}.p-noFindText[data-v-c2d15fba]{font-size:%?30?%!important;color:#666}\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 订单模块颜色值 */\n/* 背景颜色 */\n/*  背景渐变色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */",""]),t.exports=a},"7afc":function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}));var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{style:"display:flex;height:"+t.BoxHeight},[e("div",{staticClass:"head",class:{head_w:"1"==t.ishead_w,border:1==t.border}},[e("div",{class:{white:!t.navWhite},style:{height:t.halfWidth}}),e("div",{staticClass:"header"},[t.flag&&!t.returnFlag?e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._back1.apply(void 0,arguments)}}},["1"==t.ishead_w?e("img",{attrs:{src:t.back1}}):e("img",{attrs:{src:t.back}})]):t._e(),t.flag||t.returnFlag?t._e():e("img",{staticClass:"header_img",attrs:{src:t.bback},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._back1.apply(void 0,arguments)}}}),e("p",{class:{title_w:"1"==t.ishead_w}},[t._v(t._s(t.title))])])])])},n=[]},"7d99":function(t,a,e){"use strict";function i(t,a){uni.setStorage({key:t,data:a,success:function(){console.log("setSuccess")}})}function o(t){var a;return uni.getStorage({key:t,success:function(t){a=t.data,console.log("getSuccess")}}),a}function n(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(a,"__esModule",{value:!0}),a.setStorage=i,a.getStorage=o,a.removeStorage=n},8918:function(t,a,e){"use strict";var i=e("f6b3"),o=e.n(i);o.a},"89fa":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".border[data-v-4b3c7e46]{border-bottom:0 solid #eee!important}.head[data-v-4b3c7e46]{position:fixed;left:0;top:0;background-color:#fff!important;width:100%;z-index:9999}.head .white[data-v-4b3c7e46]{background:#fff}.header[data-v-4b3c7e46]{background-color:#fff;width:100%;height:%?88?%;border-bottom:1px solid #eee;color:#020202;font-size:%?40?%}.header img[data-v-4b3c7e46]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-4b3c7e46]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-4b3c7e46]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-4b3c7e46]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header>div[data-v-4b3c7e46]{height:%?88?%;width:%?160?%;position:absolute;z-index:9999}.head_w[data-v-4b3c7e46]{background:transparent;border-bottom:0}.title_w[data-v-4b3c7e46]{color:#fff!important}",""]),t.exports=a},a516:function(t,a,e){"use strict";e.r(a);var i=e("4005"),o=e("df43");for(var n in o)"default"!==n&&function(t){e.d(a,t,(function(){return o[t]}))}(n);e("3334");var s,r=e("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"c2d15fba",null,!1,i["a"],s);a["default"]=c.exports},df43:function(t,a,e){"use strict";e.r(a);var i=e("2ef7"),o=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=o.a},f60a:function(t,a,e){"use strict";e.r(a);var i=e("f894"),o=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=o.a},f6b3:function(t,a,e){var i=e("89fa");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("45e446d7",i,!0,{sourceMap:!1,shadowMode:!1})},f894:function(t,a,e){"use strict";var i=e("4ea4");e("a9e3"),e("e25e"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=i(e("5530")),n=e("2f62"),s=e("7d99"),r={data:function(){return{flag:!0,bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/bback.png",back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},computed:{halfWidth:function(){var t=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,a=parseInt(t);return a+"px"},BoxHeight:function(){var t=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,a=0,e=parseInt(t)+uni.upx2px(88);return a=e&&e>0?e:uni.upx2px(88),a+"px"}},onLoad:function(t){console.log("header"),console.log(this.returnR)},props:["title","returnR","navWhite","returnFlag","border","ishead_w"],methods:(0,o.default)((0,o.default)({},(0,n.mapMutations)({status:"data_height"})),{},{_back:function(){this.flag=!1,console.log(this.returnR)},_back1:function(){switch(this.flag=!1,Number(this.returnR)){case 1:uni.navigateBack({delta:2});break;case 2:uni.switchTab({url:"../tabBar/shoppingCart"});break;case 3:uni.redirectTo({url:"../login/login.vue"});break;case 4:uni.navigateBack({delta:3});break;case 5:uni.redirectTo({url:"../order/myOrder"});break;case 6:uni.switchTab({url:"../../pages/tabBar/home"});break;case 7:uni.switchTab({url:"../../pages/tabBar/my"});break;case 8:uni.switchTab({url:"../tabBar/my"});break;case 9:uni.redirectTo({url:"/pagesA/myStore/myStore"});break;default:getCurrentPages().length>1?uni.navigateBack({delta:1}):uni.switchTab({url:"/pages/tabBar/home"})}this.flag=!0}})};a.default=r}}]);