(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-distribution-distribution_tocashFlow"],{"1b2b":function(t,e,a){"use strict";var i=a("cde9"),n=a.n(i);n.a},"47ed":function(t,e,a){"use strict";a.r(e);var i=a("defa"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},5115:function(t,e,a){"use strict";a.r(e);var i=a("e53b"),n=a("47ed");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("1b2b");var d,s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"3fb1f804",null,!1,i["a"],d);e["default"]=c.exports},"621af":function(t,e,a){"use strict";var i=a("4ea4");a("99af"),a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("5530")),o=a("2f62"),d=(a("7d99"),i(a("5115")),{data:function(){return{fastTap:!0,loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/5-121204193R7.gif",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",head:!0,access_id:"",order:"",bindding_id:"",load:!0,header:["全部","待审核","审核通过","审核失败"],status_id:"",today:"0000-00-00",statusStr:["审核中","审核成功","审核失败"],hasFlag:"",page:0,total:0,loadingType:0,emptyImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/fx_tixNo.png",title:"提现明细"}},onReachBottom:function(){var t=this;if(0==this.loadingType){this.loadingType=1;var e={module:"app",action:"commcenter",app:"cash_list",access_id:this.access_id,page:this.page,status:t.status_id};this.order.length>0&&uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e);var a=e.data.list;console.log(a),t.page+=1,200==e.data.code?(t.order=t.order.concat(a),t.loadingType=0):t.loadingType=2},error:function(t){console.log(t)}})}},onLoad:function(){var t=this;t.$nextTick((function(){t.$refs.lktAuthorizeComp.handleAfterAuth(t,"../../pages/login/login?landing_code=1",(function(){t.bindding_id=t.$store.state.bindding_num,t.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):t.$store.state.access_id,t.access_id&&t._axios(),t._getToday()}))}))},computed:{halfWidth:function(){var t=uni.getStorageSync("data_height")?uni.getStorageSync("data_height"):this.$store.state.data_height,e=parseInt(t),a=2*e;return uni.upx2px(a)+"px"}},onShow:function(){this.bindding_id=this.$store.state.bindding_num,this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id},methods:(0,n.default)((0,n.default)({},(0,o.mapMutations)({})),{},{changeLoginStatus:function(){var t=this;t.access_id=uni.getStorageSync("access_id"),t._axios()},_goXQ:function(t){this.page=0,uni.navigateTo({url:"./distribution_result?txId="+t})},_header_index:function(t){this.status_id=t,this.page=0,this._axios()},_getToday:function(){var t=new Date;this.today=t.getFullYear()+"-"+(parseInt(t.getMonth())+1)+"-"+t.getDate()},_axios:function(){var t=this;console.log(this.bind_st);var e={module:"app",action:"commcenter",app:"cash_list",access_id:this.access_id,page:this.page,status:t.status_id};uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){t.load=!1,103==e.data.code?t.hasFlag=!1:200==e.data.code&&(t.hasFlag=!0,t.order=e.data.list,t.total=e.data.total,t.page=1),console.log(e.data.list)},error:function(t){console.log(t)}})},onReachBottom:function(){var t=this;if(0==this.loadingType){this.loadingType=1,console.log(this.page);var e={module:"app",action:"index",app:"get_more",page:this.page};console.log(e),this.goods_like.length>0&&uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e);var a=e.data.data;console.log(a),t.page+=1,a.length>0?(t.goods_like=t.goods_like.concat(a),t.loadingType=0):t.loadingType=2},error:function(t){console.log(t)}})}},_back:function(){this.flag=!1,uni.navigateBack({delta:1})}})});e.default=d},"7d99":function(t,e,a){"use strict";function i(t,e){uni.setStorage({key:t,data:e,success:function(){console.log("setSuccess")}})}function n(t){var e;return uni.getStorage({key:t,success:function(t){e=t.data,console.log("getSuccess")}}),e}function o(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(e,"__esModule",{value:!0}),e.setStorage=i,e.getStorage=n,e.removeStorage=o},"889d":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("lktauthorize",{ref:"lktAuthorizeComp",on:{pChangeLoginStatus:function(e){arguments[0]=e=t.$handleEvent(e),t.changeLoginStatus.apply(void 0,arguments)}}}),a("div",{staticClass:"data_h",style:{height:t.halfWidth}},[a("div",{staticClass:"data_h_h",style:{height:t.halfWidth}})]),a("div",{staticClass:"yh-halfWidth",style:{top:t.halfWidth}},[a("div",{staticClass:"position_head",style:{top:t.halfWidth}},[t.head?a("div",{staticClass:"head"},[a("img",{staticClass:"head_img",attrs:{src:t.back1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back()}}}),a("p",{staticClass:"yh-txmx"},[t._v("提现明细")]),a("img",{staticClass:"head_search"})]):t._e()])]),a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"c_top"},[a("v-uni-view",[t._v("累计提现佣金")]),a("v-uni-view",[t._v("+"+t._s(t.total||0)+"元")])],1),a("v-uni-view",{staticClass:"c_nav"},[a("ul",{staticClass:"order_header"},t._l(t.header,(function(e,i){return a("li",{key:e.id,staticClass:"header_li",class:{header_border:t.status_id==i},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._header_index(i)}}},[t._v(t._s(e))])})),0)]),t.hasFlag?a("v-uni-view",{staticClass:"c_content"},[t._l(t.order,(function(e,i){return a("v-uni-view",{key:i,staticClass:"c_b_item",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t._goXQ(e.id)}}},[a("v-uni-view",{staticClass:"item_flex"},[a("v-uni-view",{staticClass:"sty1"},[t._v("提现")]),a("v-uni-view",{staticClass:"sty2"},[t._v("-"+t._s(e.money))])],1),a("v-uni-view",{staticClass:"item_flex"},[a("v-uni-view",{staticClass:"sty3"},[t._v(t._s(e.add_date))]),a("v-uni-view",{staticClass:"sty4"},[t._v(t._s(t.statusStr[e.status]))])],1)],1)})),t.order.length>10?a("uni-load-more",{attrs:{loadingType:t.loadingType}}):t._e()],2):t._e(),t.hasFlag||t.load?t._e():a("div",{staticClass:"empty_play"},[a("img",{attrs:{src:t.emptyImg}}),a("p",{staticClass:"yh-emp"},[t._v("您还没有任何记录~")])])],1)],1)},o=[]},"8de2":function(t,e,a){"use strict";var i=a("ccc0"),n=a.n(i);n.a},"9c1f":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".load-more[data-v-3fb1f804]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.loading-img[data-v-3fb1f804]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-3fb1f804]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-3fb1f804]{position:absolute}.load1[data-v-3fb1f804],\n.load2[data-v-3fb1f804],\n.load3[data-v-3fb1f804]{height:24px;width:24px}.load2[data-v-3fb1f804]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-3fb1f804]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-3fb1f804]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-3fb1f804 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-3fb1f804{0%{opacity:1}100%{opacity:.2}}",""]),t.exports=e},b38a:function(t,e,a){"use strict";a.r(e);var i=a("621af"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},b5ae:function(t,e,a){"use strict";a.r(e);var i=a("889d"),n=a("b38a");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("8de2");var d,s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"36b40d50",null,!1,i["a"],d);e["default"]=c.exports},ccc0:function(t,e,a){var i=a("ed08");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("7a329e64",i,!0,{sourceMap:!1,shadowMode:!1})},cde9:function(t,e,a){var i=a("9c1f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("29437017",i,!0,{sourceMap:!1,shadowMode:!1})},defa:function(t,e,a){"use strict";a("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=i},e53b:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"load-more"},[a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[a("v-uni-view",{staticClass:"load1"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1),a("v-uni-view",{staticClass:"load2"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1),a("v-uni-view",{staticClass:"load3"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1)],1),a("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},o=[]},ed08:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'.head[data-v-36b40d50],\r\n.order_header[data-v-36b40d50]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.head[data-v-36b40d50]{height:%?88?%;padding:0 %?30?%;border-bottom:1px solid #eee;font-size:%?40?%;color:#242424}.head_img[data-v-36b40d50]{width:%?24?%;height:%?36?%}.head_search[data-v-36b40d50]{width:%?40?%;height:%?40?%;visibility:hidden}.order_header[data-v-36b40d50]{-webkit-justify-content:space-around;justify-content:space-around;width:100%;border-bottom:1px solid #d2d2d2}.header_li[data-v-36b40d50]{width:25%;text-align:center;height:%?84?%;line-height:%?84?%;border-bottom:1px solid #eee;font-size:%?30?%;color:#9d9d9d}.header_border[data-v-36b40d50]{color:#020202;font-weight:700;position:relative}.header_border[data-v-36b40d50]:after{border-bottom:%?5?% solid #020202;position:absolute;bottom:0;width:50%;content:"";left:25%}.last_right>div[data-v-36b40d50]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.position_head[data-v-36b40d50]{position:fixed;left:0;top:0;width:100%;background-color:#fff;z-index:35}.c_top[data-v-36b40d50]{padding:%?22?% %?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?28?%;font-family:PingFang-SC-Medium;font-weight:500;color:#242424;\r\n\t/* margin-top: 88upx; */border-bottom:%?2?% solid #eee}.order_header[data-v-36b40d50]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:none}.header_li[data-v-36b40d50]{width:25%;text-align:center;height:%?90?%;line-height:%?90?%;border-bottom:1px solid #eee;font-size:%?30?%;color:#9d9d9d}.header_border[data-v-36b40d50]{color:#020202;font-weight:700}.c_b_item[data-v-36b40d50]{padding:%?28?% %?29?% %?22?% %?29?%;border-bottom:%?2?% solid #f6f6f6}.item_flex[data-v-36b40d50]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-bottom:%?6?%}.sty1[data-v-36b40d50],\r\n.sty2[data-v-36b40d50]{font-size:%?28?%;color:#020202}.sty3[data-v-36b40d50],\r\n.sty4[data-v-36b40d50]{font-size:%?22?%;color:#999}.today[data-v-36b40d50]{font-size:%?22?%;font-family:PingFang-SC-Medium;font-weight:500;color:#999;padding:%?17?% %?30?%;background:#f6f6f6}.noMore[data-v-36b40d50]{font-size:%?24?%;font-family:PingFang-SC-Medium;font-weight:500;color:#b8b8b8;margin:%?29?% %?315?%}.item_flex[data-v-36b40d50]:nth-of-type(1){margin-bottom:%?12?%}.yh-halfWidth[data-v-36b40d50]{height:%?178?%;position:fixed;background:#fff;z-index:999}.yh-txmx[data-v-36b40d50]{font-size:%?32?%}\r\n\r\n/* 优化 */.yh-emp[data-v-36b40d50]{color:#8b8b8b}',""]),t.exports=e}}]);