(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-myStore-myCli"],{"05a8":function(t,a,e){"use strict";var i=e("483c"),s=e.n(i);s.a},"1b2b":function(t,a,e){"use strict";var i=e("cde9"),s=e.n(i);s.a},"2b35":function(t,a,e){"use strict";var i=e("4ea4");e("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=i(e("4eb3")),n=i(e("5115")),o={data:function(){return{loadGif:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/loading.gif",jiantou:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/jianX.png",textImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/yhqBg.png",title:"我的客户",access_id:"",load:!0,shop_id:"",list1:[],list2:[],list3:[],list4:[],time1:"",time2:"",time3:"",time4:"",wushuju:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/wukehu.png",page:0,listNum:0,loadingType:0}},onLoad:function(t){this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id,this.shop_id=uni.getStorageSync("shop_id")?uni.getStorageSync("shop_id"):this.$store.state.shop_id,this._axios()},onReachBottom:function(){0==this.loadingType&&(this.loadingType=1,this.page++,this._axios())},methods:{showMore1:function(t,a){this.list1[a][0].status?(this.list1[a][0].status=!1,this.list1[a][0].transform=0):(this.list1[a][0].status=!0,this.list1[a][0].transform=180)},showMore2:function(t){this.list2[t][0].status?(this.list2[t][0].status=!1,this.list2[t][0].transform=0):(this.list2[t][0].status=!0,this.list2[t][0].transform=180)},showMore3:function(t){this.list3[t][0].status?(this.list3[t][0].status=!1,this.list3[t][0].transform=0):(this.list3[t][0].status=!0,this.list3[t][0].transform=180)},showMore4:function(t){this.list4[t][0].status?(this.list4[t][0].status=!1,this.list4[t][0].transform=0):(this.list4[t][0].status=!0,this.list4[t][0].transform=180)},_axios:function(){var t=this;uni.request({url:uni.getStorageSync("url"),data:{module:"app",action:"mch",m:"shop_customer",access_id:t.access_id,shop_id:t.shop_id,page:this.page},header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(a){if(console.log("我的客户"),console.log(a),t.load=!1,200==a.data.code){if(t.listNum+=Number(a.data.num),Number(a.data.num)>9?t.loadingType=0:t.loadingType=2,a.data.list.list1.res&&a.data.list.list1.res.length>0){for(var e=a.data.list.list1.res,i=0;i<e.length;i++)e[i][0].transform=0;t.list1=e,t.time1=a.data.list.list1.time}if(a.data.list.list2.res&&a.data.list.list2.res.length>0){for(var s=a.data.list.list2.res,n=0;n<s.length;n++)s[n][0].transform=0;t.list2=s,t.time2=a.data.list.list2.time}if(a.data.list.list3.res&&a.data.list.list3.res.length>0){for(var o=a.data.list.list3.res,r=0;r<o.length;r++)o[r][0].transform=0;t.list3=o,t.time3=a.data.list.list3.time}if(a.data.list.list4.res&&a.data.list.list4.res.length>0){for(var d=a.data.list.list4.res,l=0;l<d.length;l++)d[l][0].transform=0;t.list4=a.data.list.list4.res,t.time4=a.data.list.list4.time}}else uni.showToast({title:a.data.message,duration:1500,icon:"none"})}})}},computed:{now:function(){var t=(new Date).getFullYear(),a=(new Date).getMonth()+1,e=(new Date).getDate(),i=t+"-"+a+"-"+e;return i}},components:{heads:s.default,uniLoadMore:n.default}};a.default=o},4089:function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".dateListExpand[data-v-066a2e4a]{padding-left:%?90?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?60?%}.dateListExpand span[data-v-066a2e4a]{font-size:%?26?%;color:#b8b8b8}.date[data-v-066a2e4a]{font-size:%?22?%;color:#999;padding:%?20?% %?30?%}.dateList[data-v-066a2e4a]{background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?90?%}.dateListLeft[data-v-066a2e4a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;position:relative}.dateList img[data-v-066a2e4a]{width:%?50?%;height:%?50?%;border-radius:50%;margin:0 %?20?%}.dateList span[data-v-066a2e4a]{font-size:%?26?%;color:#020202;white-space:nowrap}.dateListLeft span[data-v-066a2e4a]{max-width:%?180?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dateListLeft .mr_72[data-v-066a2e4a]{max-width:%?280?%}.expand[data-v-066a2e4a]{position:absolute;right:0;width:%?72?%}.wsj_box[data-v-066a2e4a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-top:%?200?%}.wsj_box>div[data-v-066a2e4a]{text-align:center;color:#888f9e;font-size:%?30?%}.wsj_img[data-v-066a2e4a]{width:%?220?%;height:%?250?%}.container[data-v-066a2e4a]{min-height:100vh;background-color:#f6f6f6}.today_list[data-v-066a2e4a]{padding:0 %?20?%;background-color:#fff}.border_bottom[data-v-066a2e4a]{border-bottom:1px solid #eee}.mr_72[data-v-066a2e4a]{margin-right:%?72?%}.jiantou[data-v-066a2e4a]{width:%?28?%!important;height:%?16?%!important}",""]),t.exports=a},"47ed":function(t,a,e){"use strict";e.r(a);var i=e("defa"),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=s.a},"483c":function(t,a,e){var i=e("4089");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=e("4f06").default;s("70b32010",i,!0,{sourceMap:!1,shadowMode:!1})},"4eb3":function(t,a,e){"use strict";e.r(a);var i=e("7afc"),s=e("f60a");for(var n in s)"default"!==n&&function(t){e.d(a,t,(function(){return s[t]}))}(n);e("8918");var o,r=e("f0c5"),d=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,"4b3c7e46",null,!1,i["a"],o);a["default"]=d.exports},5115:function(t,a,e){"use strict";e.r(a);var i=e("e53b"),s=e("47ed");for(var n in s)"default"!==n&&function(t){e.d(a,t,(function(){return s[t]}))}(n);e("1b2b");var o,r=e("f0c5"),d=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,"3fb1f804",null,!1,i["a"],o);a["default"]=d.exports},"7afc":function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}));var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{style:"display:flex;height:"+t.BoxHeight},[e("div",{staticClass:"head",class:{head_w:"1"==t.ishead_w,border:1==t.border}},[e("div",{class:{white:!t.navWhite},style:{height:t.halfWidth}}),e("div",{staticClass:"header"},[t.flag&&!t.returnFlag?e("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._back1.apply(void 0,arguments)}}},["1"==t.ishead_w?e("img",{attrs:{src:t.back1}}):e("img",{attrs:{src:t.back}})]):t._e(),t.flag||t.returnFlag?t._e():e("img",{staticClass:"header_img",attrs:{src:t.bback},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._back1.apply(void 0,arguments)}}}),e("p",{class:{title_w:"1"==t.ishead_w}},[t._v(t._s(t.title))])])])])},n=[]},"7d99":function(t,a,e){"use strict";function i(t,a){uni.setStorage({key:t,data:a,success:function(){console.log("setSuccess")}})}function s(t){var a;return uni.getStorage({key:t,success:function(t){a=t.data,console.log("getSuccess")}}),a}function n(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(a,"__esModule",{value:!0}),a.setStorage=i,a.getStorage=s,a.removeStorage=n},8918:function(t,a,e){"use strict";var i=e("f6b3"),s=e.n(i);s.a},"89fa":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".border[data-v-4b3c7e46]{border-bottom:0 solid #eee!important}.head[data-v-4b3c7e46]{position:fixed;left:0;top:0;background-color:#fff!important;width:100%;z-index:9999}.head .white[data-v-4b3c7e46]{background:#fff}.header[data-v-4b3c7e46]{background-color:#fff;width:100%;height:%?88?%;border-bottom:1px solid #eee;color:#020202;font-size:%?40?%}.header img[data-v-4b3c7e46]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-4b3c7e46]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-4b3c7e46]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-4b3c7e46]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header>div[data-v-4b3c7e46]{height:%?88?%;width:%?160?%;position:absolute;z-index:9999}.head_w[data-v-4b3c7e46]{background:transparent;border-bottom:0}.title_w[data-v-4b3c7e46]{color:#fff!important}",""]),t.exports=a},"8cd9":function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}));var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("heads",{attrs:{title:t.title}}),t.load?e("div",{staticClass:"load"},[e("div",[e("img",{attrs:{src:t.loadGif}}),e("p",[t._v("加载中…")])])]):e("div",[t.list1.length>0?e("div",[e("div",{staticClass:"date"},[t._v(t._s(t.time1)),e("span",[t._v("(今天)")])]),t._l(t.list1,(function(a,i){return e("div",{key:i,staticClass:"today_list"},[e("div",{staticClass:"border_bottom"},[e("div",{staticClass:"dateList"},[e("div",{staticClass:"dateListLeft"},[e("img",{attrs:{src:a[0].headimgurl,alt:""}}),e("span",[t._v(t._s(a[0].zhanghao))]),e("span",[t._v(t._s(a[0].event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a[0].add_time))]),a.length>1?e("span",{staticClass:"expand",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showMore1(a,i)}}},[e("img",{staticClass:"jiantou",style:"transform: rotate("+a[0].transform+"deg)",attrs:{src:t.jiantou}})]):t._e()])]),a[0].status?t._l(a,(function(a,i){return e("div",{key:i},[0!=i?e("div",{staticClass:"dateListExpand"},[e("div",{staticClass:"dateListLeft"},[e("span",[t._v(t._s(a.zhanghao))]),e("span",[t._v(t._s(a.event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a.add_time))])])]):t._e()])})):t._e()],2)])}))],2):t._e(),t.list2.length>0?e("div",[e("div",{staticClass:"date"},[t._v(t._s(t.time2)),e("span",[t._v("(昨天)")])]),t._l(t.list2,(function(a,i){return e("div",{key:i},[e("div",{staticClass:"dateList"},[e("div",{staticClass:"dateListLeft"},[e("img",{attrs:{src:a[0].headimgurl,alt:""}}),e("span",[t._v(t._s(a[0].zhanghao))]),e("span",[t._v(t._s(a[0].event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a[0].add_time))]),a.length>1?e("span",{staticClass:"expand",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.showMore2(i)}}},[e("img",{staticClass:"jiantou",style:"transform: rotate("+a[0].transform+"deg)",attrs:{src:t.jiantou}})]):t._e()])]),a[0].status?t._l(a,(function(a,i){return e("div",{key:i},[0!=i?e("div",{staticClass:"dateListExpand"},[e("div",{staticClass:"dateListLeft"},[e("span",[t._v(t._s(a.zhanghao))]),e("span",[t._v(t._s(a.event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a.add_time))])])]):t._e()])})):t._e()],2)}))],2):t._e(),t.list3.length>0?e("div",[e("div",{staticClass:"date"},[t._v(t._s(t.time3)),e("span",[t._v("(前天)")])]),t._l(t.list3,(function(a,i){return e("div",{key:i},[e("div",{staticClass:"dateList"},[e("div",{staticClass:"dateListLeft"},[e("img",{attrs:{src:a[0].headimgurl,alt:""}}),e("span",[t._v(t._s(a[0].zhanghao))]),e("span",[t._v(t._s(a[0].event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a[0].add_time))]),a.length>1?e("span",{staticClass:"expand",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.showMore3(i)}}},[e("img",{staticClass:"jiantou",style:"transform: rotate("+a[0].transform+"deg)",attrs:{src:t.jiantou}})]):t._e()])]),a[0].status?t._l(a,(function(a,i){return e("div",{key:i},[0!=i?e("div",{staticClass:"dateListExpand"},[e("div",{staticClass:"dateListLeft"},[e("span",[t._v(t._s(a.zhanghao))]),e("span",[t._v(t._s(a.event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a.add_time))])])]):t._e()])})):t._e()],2)}))],2):t._e(),t.list4.length>0?e("div",[e("div",{staticClass:"date"},[t._v(t._s(t.time4)),e("span",[t._v("(更早)")])]),t._l(t.list4,(function(a,i){return e("div",{key:i},[e("div",{staticClass:"dateList"},[e("div",{staticClass:"dateListLeft"},[e("img",{attrs:{src:a[0].headimgurl,alt:""}}),e("span",[t._v(t._s(a[0].zhanghao))]),e("span",[t._v(t._s(a[0].event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a[0].add_time))]),a.length>1?e("span",{staticClass:"expand",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.showMore4(i)}}},[e("img",{staticClass:"jiantou",style:"transform: rotate("+a[0].transform+"deg)",attrs:{src:t.jiantou}})]):t._e()])]),a[0].status?t._l(a,(function(a,i){return e("div",{key:i},[0!=i?e("div",{staticClass:"dateListExpand"},[e("div",{staticClass:"dateListLeft"},[e("span",[t._v(t._s(a.zhanghao))]),e("span",[t._v(t._s(a.event))])]),e("div",{staticClass:"dateListLeft"},[e("span",{staticClass:"mr_72"},[t._v(t._s(a.add_time))])])]):t._e()])})):t._e()],2)}))],2):t._e(),t.listNum>11?e("uni-load-more",{attrs:{loadingType:t.loadingType}}):t._e(),0==t.list1.length&&0==t.list2.length&&0==t.list3.length&&0==t.list4.length?e("div",{staticClass:"wsj_box"},[e("img",{staticClass:"wsj_img",attrs:{src:t.wushuju}}),e("div",[t._v("暂时还没有客户访问哦~")])]):t._e()],1)],1)},n=[]},"9c1f":function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,".load-more[data-v-3fb1f804]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.loading-img[data-v-3fb1f804]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-3fb1f804]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-3fb1f804]{position:absolute}.load1[data-v-3fb1f804],\n.load2[data-v-3fb1f804],\n.load3[data-v-3fb1f804]{height:24px;width:24px}.load2[data-v-3fb1f804]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-3fb1f804]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-3fb1f804]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-3fb1f804 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-3fb1f804{0%{opacity:1}100%{opacity:.2}}",""]),t.exports=a},c500:function(t,a,e){"use strict";e.r(a);var i=e("2b35"),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=s.a},cde9:function(t,a,e){var i=e("9c1f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=e("4f06").default;s("29437017",i,!0,{sourceMap:!1,shadowMode:!1})},defa:function(t,a,e){"use strict";e("a9e3"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};a.default=i},e53b:function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}));var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"load-more"},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[e("v-uni-view",{staticClass:"load1"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load2"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load3"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1)],1),e("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[]},f15a:function(t,a,e){"use strict";e.r(a);var i=e("8cd9"),s=e("c500");for(var n in s)"default"!==n&&function(t){e.d(a,t,(function(){return s[t]}))}(n);e("05a8");var o,r=e("f0c5"),d=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,"066a2e4a",null,!1,i["a"],o);a["default"]=d.exports},f60a:function(t,a,e){"use strict";e.r(a);var i=e("f894"),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=s.a},f6b3:function(t,a,e){var i=e("89fa");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=e("4f06").default;s("45e446d7",i,!0,{sourceMap:!1,shadowMode:!1})},f894:function(t,a,e){"use strict";var i=e("4ea4");e("a9e3"),e("e25e"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=i(e("5530")),n=e("2f62"),o=e("7d99"),r={data:function(){return{flag:!0,bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/bback.png",back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},computed:{halfWidth:function(){var t=(0,o.getStorage)("data_height")?(0,o.getStorage)("data_height"):this.$store.state.data_height,a=parseInt(t);return a+"px"},BoxHeight:function(){var t=(0,o.getStorage)("data_height")?(0,o.getStorage)("data_height"):this.$store.state.data_height,a=0,e=parseInt(t)+uni.upx2px(88);return a=e&&e>0?e:uni.upx2px(88),a+"px"}},onLoad:function(t){console.log("header"),console.log(this.returnR)},props:["title","returnR","navWhite","returnFlag","border","ishead_w"],methods:(0,s.default)((0,s.default)({},(0,n.mapMutations)({status:"data_height"})),{},{_back:function(){this.flag=!1,console.log(this.returnR)},_back1:function(){switch(this.flag=!1,Number(this.returnR)){case 1:uni.navigateBack({delta:2});break;case 2:uni.switchTab({url:"../tabBar/shoppingCart"});break;case 3:uni.redirectTo({url:"../login/login.vue"});break;case 4:uni.navigateBack({delta:3});break;case 5:uni.redirectTo({url:"../order/myOrder"});break;case 6:uni.switchTab({url:"../../pages/tabBar/home"});break;case 7:uni.switchTab({url:"../../pages/tabBar/my"});break;case 8:uni.switchTab({url:"../tabBar/my"});break;case 9:uni.redirectTo({url:"/pagesA/myStore/myStore"});break;default:getCurrentPages().length>1?uni.navigateBack({delta:1}):uni.switchTab({url:"/pages/tabBar/home"})}this.flag=!0}})};a.default=r}}]);