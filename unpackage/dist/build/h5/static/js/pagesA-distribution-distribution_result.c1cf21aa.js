(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-distribution-distribution_result"],{"0cab":function(t,i,e){"use strict";var a=e("4ea4");e("e25e"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=a(e("5530")),o=e("2f62"),s=(e("7d99"),a(e("5115")),{data:function(){return{fastTap:!0,head:!0,access_id:"",order:"",bindding_id:"",load:!0,title:"提现",txId:"",totalPrice:0,result1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/fx_status0.png",result2:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/fx_status1.png",result3:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/fx_status2.png",loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/5-121204193R7.gif",emptyImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/empyimg92x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",fail:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/fx_fail.png"}},onLoad:function(t){var i=this;i.$nextTick((function(){i.$refs.lktAuthorizeComp.handleAfterAuth(i,"../../pages/login/login?landing_code=1",(function(){i.bindding_id=i.$store.state.bindding_num,i.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):i.$store.state.access_id,i.txId=t.txId,i.access_id&&i._axios()}))}))},computed:{halfWidth:function(){var t=uni.getStorageSync("data_height")?uni.getStorageSync("data_height"):this.$store.state.data_height,i=parseInt(t),e=2*i;return uni.upx2px(e)+"px"}},onShow:function(){this.bindding_id=this.$store.state.bindding_num,this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id,this._axios()},methods:(0,n.default)((0,n.default)({},(0,o.mapMutations)({})),{},{changeLoginStatus:function(){var t=this;t.access_id=uni.getStorageSync("access_id"),t._axios()},goCenter:function(){uni.navigateTo({url:"./distribution_center"})},_axios:function(){var t=this,i={module:"app",action:"commcenter",app:"cash_detail",access_id:this.access_id,id:t.txId};uni.request({data:i,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(i){t.load=!1,t.totalPrice=i.data.res.money,t.order=i.data.res,console.log(i)},error:function(t){console.log(t)}})},_back:function(){this.flag=!1,uni.navigateBack({delta:1})}})});i.default=s},"1b2b":function(t,i,e){"use strict";var a=e("cde9"),n=e.n(a);n.a},"203b":function(t,i,e){"use strict";var a=e("6688"),n=e.n(a);n.a},"2a33":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'.head[data-v-051f7a5b],\r\n.order_header[data-v-051f7a5b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.head[data-v-051f7a5b]{height:%?88?%;padding:0 %?30?%;border-bottom:1px solid #eee;font-size:%?40?%;color:#242424}.head_img[data-v-051f7a5b]{width:%?24?%;height:%?36?%}.head_search[data-v-051f7a5b]{width:%?40?%;height:%?40?%;visibility:hidden}.order_header[data-v-051f7a5b]{-webkit-justify-content:space-around;justify-content:space-around;width:100%;border-bottom:1px solid #d2d2d2}.header_li[data-v-051f7a5b]{width:25%;text-align:center;height:%?84?%;line-height:%?84?%;border-bottom:1px solid #eee;font-size:%?30?%;color:#9d9d9d}.header_border[data-v-051f7a5b]{color:#020202;font-weight:700;position:relative}.header_border[data-v-051f7a5b]:after{border-bottom:%?5?% solid #020202;position:absolute;bottom:0;width:50%;content:"";left:25%}.last_right>div[data-v-051f7a5b]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.position_head[data-v-051f7a5b]{position:fixed;left:0;top:0;width:100%;background-color:#fff;z-index:35}.content[data-v-051f7a5b]{margin-top:%?88?%}.fail_icon[data-v-051f7a5b]{width:%?100?%;height:%?100?%;margin:%?81?% %?325?% %?30?% %?325?%}.content uni-view[data-v-051f7a5b]:nth-of-type(1){font-size:%?30?%;font-family:PingFang-SC-Medium;font-weight:500;color:#242424;text-align:center}.content_v2[data-v-051f7a5b]{margin-top:%?101?%;padding:%?32?% %?29?%;font-size:%?28?%;font-family:PingFang-SC-Medium;font-weight:500;color:#999}.content_v3[data-v-051f7a5b]{border-top:%?2?% solid #eee;border-bottom:%?2?% solid #eee;font-size:%?28?%;font-family:PingFang-SC-Medium;font-weight:500;color:#020202;padding:%?32?% %?0?%;margin:%?0?% %?30?%}.cg_desc[data-v-051f7a5b]{font-size:%?24?%;font-family:PingFang-SC-Medium;font-weight:500;color:#999;margin-top:%?20?%;margin-bottom:%?88?%;text-align:center}.cg_item[data-v-051f7a5b]{padding:%?32?% %?0?%;margin:%?0?% %?28?%;border-bottom:%?2?% solid #eee;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.cg_item uni-view[data-v-051f7a5b]:nth-of-type(1){font-size:%?28?%;font-family:PingFang-SC-Medium;font-weight:500;color:#999}.cg_item uni-view[data-v-051f7a5b]:nth-of-type(2){font-size:%?28?%;font-family:PingFang-SC-Medium;font-weight:500;color:#020202}.cg_btn[data-v-051f7a5b]{width:%?690?%;height:%?90?%;background:#242424;border-radius:%?5?%;margin:%?73?% auto;font-size:%?30?%;font-family:PingFang-SC-Medium;font-weight:500;color:#fff;text-align:center;line-height:%?90?%}.yh-halfWidth[data-v-051f7a5b]{height:%?178?%;position:fixed;background:#fff;z-index:999}.yh-title[data-v-051f7a5b]{font-size:%?32?%}.yh-load[data-v-051f7a5b]{height:60vh}',""]),t.exports=i},"47ed":function(t,i,e){"use strict";e.r(i);var a=e("defa"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a},5115:function(t,i,e){"use strict";e.r(i);var a=e("e53b"),n=e("47ed");for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("1b2b");var s,d=e("f0c5"),c=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"3fb1f804",null,!1,a["a"],s);i["default"]=c.exports},"5d0c":function(t,i,e){"use strict";e.r(i);var a=e("782b"),n=e("e65c");for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("203b");var s,d=e("f0c5"),c=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"051f7a5b",null,!1,a["a"],s);i["default"]=c.exports},6688:function(t,i,e){var a=e("2a33");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("4000b97a",a,!0,{sourceMap:!1,shadowMode:!1})},"782b":function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("lktauthorize",{ref:"lktAuthorizeComp",on:{pChangeLoginStatus:function(i){arguments[0]=i=t.$handleEvent(i),t.changeLoginStatus.apply(void 0,arguments)}}}),e("div",{staticClass:"data_h",style:{height:t.halfWidth}},[e("div",{staticClass:"data_h_h",style:{height:t.halfWidth}})]),e("div",{staticClass:"yh-halfWidth",style:{top:t.halfWidth}},[e("div",{staticClass:"position_head",style:{top:t.halfWidth}},[t.head?e("div",{staticClass:"head"},[e("img",{staticClass:"head_img",attrs:{src:t.back1},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),2==t.order.status?t._back():t.goCenter()}}}),e("p",{staticClass:"yh-title"},[t._v(t._s(t.title))]),e("img",{staticClass:"head_search"})]):t._e()])]),2==t.order.status?e("v-uni-view",{staticClass:"content"},[e("img",{staticClass:"fail_icon",attrs:{src:t.result3}}),e("v-uni-view",{},[t._v("提现申请失败")]),e("v-uni-view",{staticClass:"content_v2"},[t._v("审核失败原因")]),e("v-uni-view",{staticClass:"content_v3"},[t._v(t._s(t.order.refuse))])],1):1==t.order.status?e("v-uni-view",{staticClass:"content"},[e("img",{staticClass:"fail_icon",attrs:{src:t.result2}}),e("v-uni-view",{},[t._v("提现申请成功")]),e("v-uni-view",{staticClass:"cg_desc"},[t._v("提现金额将在3个工作日内到账，请注意查收")]),e("v-uni-view",{staticClass:"cg_items"},[e("v-uni-view",{staticClass:"cg_item"},[e("v-uni-view",[t._v("提现银行卡")]),e("v-uni-view",[t._v(t._s(t.order.bank_name)+" 尾号("+t._s(t.order.last)+")")])],1),e("v-uni-view",{staticClass:"cg_item"},[e("v-uni-view",[t._v("提现金额")]),e("v-uni-view",[t._v("￥"+t._s(t.totalPrice))])],1)],1),e("v-uni-view",{staticClass:"cg_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goCenter()}}},[t._v("完成")])],1):0==t.order.status?e("v-uni-view",{staticClass:"content"},[e("img",{staticClass:"fail_icon",attrs:{src:t.result1}}),e("v-uni-view",{},[t._v("提现申请审核中")]),e("v-uni-view",{staticClass:"cg_desc"},[t._v("正在审核中，请耐心等待。")]),e("v-uni-view",{staticClass:"cg_items"},[e("v-uni-view",{staticClass:"cg_item"},[e("v-uni-view",[t._v("提现银行卡")]),e("v-uni-view",[t._v(t._s(t.order.bank_name)+" 尾号("+t._s(t.order.last)+")")])],1),e("v-uni-view",{staticClass:"cg_item"},[e("v-uni-view",[t._v("提现金额")]),e("v-uni-view",[t._v("￥"+t._s(t.totalPrice))])],1)],1),e("v-uni-view",{staticClass:"cg_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goCenter()}}},[t._v("完成")])],1):t._e(),t.load?e("div",{staticClass:"load yh-load"},[e("div",[e("img",{attrs:{src:t.loadImg}}),e("p",[t._v("加载中…")])])]):t._e()],1)},o=[]},"7d99":function(t,i,e){"use strict";function a(t,i){uni.setStorage({key:t,data:i,success:function(){console.log("setSuccess")}})}function n(t){var i;return uni.getStorage({key:t,success:function(t){i=t.data,console.log("getSuccess")}}),i}function o(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(i,"__esModule",{value:!0}),i.setStorage=a,i.getStorage=n,i.removeStorage=o},"9c1f":function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,".load-more[data-v-3fb1f804]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.loading-img[data-v-3fb1f804]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-3fb1f804]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-3fb1f804]{position:absolute}.load1[data-v-3fb1f804],\n.load2[data-v-3fb1f804],\n.load3[data-v-3fb1f804]{height:24px;width:24px}.load2[data-v-3fb1f804]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-3fb1f804]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-3fb1f804]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-3fb1f804 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-3fb1f804{0%{opacity:1}100%{opacity:.2}}",""]),t.exports=i},cde9:function(t,i,e){var a=e("9c1f");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("29437017",a,!0,{sourceMap:!1,shadowMode:!1})},defa:function(t,i,e){"use strict";e("a9e3"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};i.default=a},e53b:function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"load-more"},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[e("v-uni-view",{staticClass:"load1"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load2"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load3"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1)],1),e("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},o=[]},e65c:function(t,i,e){"use strict";e.r(i);var a=e("0cab"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a}}]);