(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-batchOrder"],{"0bda":function(t,e,a){"use strict";a.r(e);var i=a("7819"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},2133:function(t,e,a){var i=a("e5ef");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("14122fa5",i,!0,{sourceMap:!1,shadowMode:!1})},"242c":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("lktauthorize",{ref:"lktAuthorizeComp",on:{pChangeLoginStatus:function(e){arguments[0]=e=t.$handleEvent(e),t.changeLoginStatus.apply(void 0,arguments)}}}),a("div",{staticClass:"data_h",style:{height:t.halfWidth}},[a("div",{staticClass:"data_h_h",style:{height:t.halfWidth}})]),a("div",{staticStyle:{height:"88upx"}},[a("heads",{attrs:{title:t.title}})],1),a("ul",{staticClass:"order_goods",style:{top:t.halfWidth}},t._l(t.order,(function(e,i){return a("li",{staticClass:"order_two"},[a("img",{staticClass:"quan_img",attrs:{src:t.display_img[i]?t.quan_hei:t.quan_hui},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._checkedOne(e,i)}}}),a("img",{staticClass:"order_two_img",attrs:{src:e.imgurl}}),a("div",{staticStyle:{"margin-right":"40upx",width:"58%"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._goods(e.p_id)}}},[a("p",{staticClass:"order_space"},[t._v(t._s(e.p_name))])]),a("div",[a("p",[t._v("￥"+t._s(e.p_price))]),a("p",{staticClass:"color_two"},[t._v("x"+t._s(e.num))])])])})),0),a("div",{staticClass:"batch_bottom"},[a("div",{staticClass:"bottom_left"},[a("img",{staticClass:"quan_img",attrs:{src:t.selectAll?t.quan_hei:t.quan_hui},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._selectAll.apply(void 0,arguments)}}}),a("span",[t._v("全选")])]),a("div",{staticClass:"batch_bottom_q",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._button.apply(void 0,arguments)}}},[t._v("确定")])])],1)},n=[]},"4eb3":function(t,e,a){"use strict";a.r(e);var i=a("7afc"),o=a("f60a");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("8918");var s,r=a("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"4b3c7e46",null,!1,i["a"],s);e["default"]=c.exports},7819:function(t,e,a){"use strict";var i=a("4ea4");a("c975"),a("a434"),a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(a("4eb3")),n=(a("7d99"),{data:function(){return{title:"选择商品列表",orde_id:"",order:"",access_id:"",quan_hui:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/xuanzehui2x.png",quan_hei:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/xuanzehei2x.png",display_img:[],selectArray:[],selectAll:!1,fastTap:!0,rType:!1}},onLoad:function(t){var e=this;e.$nextTick((function(){e.$refs.lktAuthorizeComp.handleAfterAuth(e,"../login/login?landing_code=1",(function(){e.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):e.$store.state.access_id,e.orde_id=t.orde_id,e.rType=t.rType,e._axios()}))}))},computed:{halfWidth:function(){var t=uni.getStorageSync("data_height")?uni.getStorageSync("data_height"):this.$store.state.data_height,e=parseInt(t),a=2*e;return uni.upx2px(a)+"px"}},methods:{changeLoginStatus:function(){var t=this;t.access_id=uni.getStorageSync("access_id"),t._axios()},_checkedOne:function(t,e){console.log(t),Array.prototype.indexf=function(t){for(var e=0;e<this.length;e++)if(this[e]==t)return e;return-1},Array.prototype.remove=function(t){var e=this.indexf(t);e>-1&&this.splice(e,1)};var a=this.selectArray.indexOf(t);a<0?(this.selectArray.push(t),this.$set(this.display_img,e,!0)):(this.selectArray.remove(t),this.$set(this.display_img,e,!1)),this.selectArray.length==this.order.length?this.selectAll=!0:this.selectAll=!1,console.log(this.selectArray)},_selectAll:function(){this.selectAll=!this.selectAll,console.log(this.selectAll);this.$refs.img;if(this.selectAll)for(var t=0;t<this.order.length;t++)this.$set(this.selectArray,t,this.order[t]),this.$set(this.display_img,t,!0);else{this.selectArray=[];for(t=0;t<this.order.length;t++)this.$set(this.display_img,t,!1)}console.log(this.selectArray)},_button:function(){var t=this;if(this.fastTap){this.fastTap=!1;for(var e=[],a=0;a<this.selectArray.length;a++){var i=this.selectArray[a].id;e.push(i),console.log(i,888)}this.selectArray.length?uni.navigateTo({url:"../../pagesA/returnGoods/returnGoods?order_details_id="+e+"&order_anking=2&rType="+t.rType,success:function(){t.fastTap=!0}}):(t.fastTap=!0,uni.showToast({title:"请选择需要售后的商品！",duration:1e3,icon:"none"})),console.log(e)}},_axios:function(){var t=this,e={access_id:this.access_id,order_id:this.orde_id,module:"app",action:"order",app:"order_details"};uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){if(200==e.data.code){var a=e.data.data.list;console.log(a);for(var i=[],o=0;o<a.length;o++)2!=a[o].r_status&&1!=a[o].r_status||i.push(a[o]);t.order=i}else uni.showToast({title:e.data.message,duration:1500,icon:"none"});console.log(e)},error:function(t){console.log(t)}})}},components:{heads:o.default}});e.default=n},"7afc":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:"display:flex;height:"+t.BoxHeight},[a("div",{staticClass:"head",class:{head_w:"1"==t.ishead_w,border:1==t.border}},[a("div",{class:{white:!t.navWhite},style:{height:t.halfWidth}}),a("div",{staticClass:"header"},[t.flag&&!t.returnFlag?a("div",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back1.apply(void 0,arguments)}}},["1"==t.ishead_w?a("img",{attrs:{src:t.back1}}):a("img",{attrs:{src:t.back}})]):t._e(),t.flag||t.returnFlag?t._e():a("img",{staticClass:"header_img",attrs:{src:t.bback},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back1.apply(void 0,arguments)}}}),a("p",{class:{title_w:"1"==t.ishead_w}},[t._v(t._s(t.title))])])])])},n=[]},"7d99":function(t,e,a){"use strict";function i(t,e){uni.setStorage({key:t,data:e,success:function(){console.log("setSuccess")}})}function o(t){var e;return uni.getStorage({key:t,success:function(t){e=t.data,console.log("getSuccess")}}),e}function n(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(e,"__esModule",{value:!0}),e.setStorage=i,e.getStorage=o,e.removeStorage=n},8918:function(t,e,a){"use strict";var i=a("f6b3"),o=a.n(i);o.a},"89fa":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".border[data-v-4b3c7e46]{border-bottom:0 solid #eee!important}.head[data-v-4b3c7e46]{position:fixed;left:0;top:0;background-color:#fff!important;width:100%;z-index:9999}.head .white[data-v-4b3c7e46]{background:#fff}.header[data-v-4b3c7e46]{background-color:#fff;width:100%;height:%?88?%;border-bottom:1px solid #eee;color:#020202;font-size:%?40?%}.header img[data-v-4b3c7e46]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-4b3c7e46]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-4b3c7e46]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-4b3c7e46]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header>div[data-v-4b3c7e46]{height:%?88?%;width:%?160?%;position:absolute;z-index:9999}.head_w[data-v-4b3c7e46]{background:transparent;border-bottom:0}.title_w[data-v-4b3c7e46]{color:#fff!important}",""]),t.exports=e},"8a24":function(t,e,a){"use strict";var i=a("2133"),o=a.n(i);o.a},"90ee":function(t,e,a){"use strict";a.r(e);var i=a("242c"),o=a("0bda");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("8a24");var s,r=a("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"6da612c5",null,!1,i["a"],s);e["default"]=c.exports},e5ef:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".bottom_left>span[data-v-6da612c5]{font-size:%?26?%;color:#020202}.order_two img[data-v-6da612c5]:first-child{width:%?34?%;height:%?34?%}.batch_bottom[data-v-6da612c5],.bottom_left[data-v-6da612c5],.batch_bottom_q[data-v-6da612c5]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.batch_bottom[data-v-6da612c5]{ustify-content:space-around;padding-left:%?30?%;height:%?98?%;width:100%;font-size:%?30?%;color:#020202;border:1px solid #eee;position:fixed;left:0;bottom:0;z-index:20;background-color:#fff}.batch_bottom>div[data-v-6da612c5]{width:100%;height:100%}.bottom_left[data-v-6da612c5]{-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.batch_bottom_q[data-v-6da612c5]{background-color:#020202;color:#fff;font-size:%?35?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.quan_img[data-v-6da612c5]{margin-right:%?20?%}",""]),t.exports=e},f60a:function(t,e,a){"use strict";a.r(e);var i=a("f894"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},f6b3:function(t,e,a){var i=a("89fa");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("45e446d7",i,!0,{sourceMap:!1,shadowMode:!1})},f894:function(t,e,a){"use strict";var i=a("4ea4");a("a9e3"),a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(a("5530")),n=a("2f62"),s=a("7d99"),r={data:function(){return{flag:!0,bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/bback.png",back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},computed:{halfWidth:function(){var t=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,e=parseInt(t);return e+"px"},BoxHeight:function(){var t=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,e=0,a=parseInt(t)+uni.upx2px(88);return e=a&&a>0?a:uni.upx2px(88),e+"px"}},onLoad:function(t){console.log("header"),console.log(this.returnR)},props:["title","returnR","navWhite","returnFlag","border","ishead_w"],methods:(0,o.default)((0,o.default)({},(0,n.mapMutations)({status:"data_height"})),{},{_back:function(){this.flag=!1,console.log(this.returnR)},_back1:function(){switch(this.flag=!1,Number(this.returnR)){case 1:uni.navigateBack({delta:2});break;case 2:uni.switchTab({url:"../tabBar/shoppingCart"});break;case 3:uni.redirectTo({url:"../login/login.vue"});break;case 4:uni.navigateBack({delta:3});break;case 5:uni.redirectTo({url:"../order/myOrder"});break;case 6:uni.switchTab({url:"../../pages/tabBar/home"});break;case 7:uni.switchTab({url:"../../pages/tabBar/my"});break;case 8:uni.switchTab({url:"../tabBar/my"});break;case 9:uni.redirectTo({url:"/pagesA/myStore/myStore"});break;default:getCurrentPages().length>1?uni.navigateBack({delta:1}):uni.switchTab({url:"/pages/tabBar/home"})}this.flag=!0}})};e.default=r}}]);