(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-distribution-distribution_share"],{"05e2":function(t,e,n){"use strict";var a=n("3908"),i=n.n(a);i.a},"090e":function(t,e,n){"use strict";n.r(e);var a=n("31b9"),i=n("5d02");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("05e2");var d,s=n("f0c5"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"66d23d46",null,!1,a["a"],d);e["default"]=r.exports},"0a0f":function(t,e,n){"use strict";var a=n("4ea4");n("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("5530")),o=(a(n("5115")),n("2f62")),d=(n("7d99"),n("5dfa")),s={data:function(){return{fastTap:!0,loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/5-121204193R7.gif",emptyImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/empyimg92x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",head:!0,access_id:"",order:"",bindding_id:"",load:!0,ewmImg:"",user_id:""}},onLoad:function(){var t=this;t.$nextTick((function(){t.$refs.lktAuthorizeComp.handleAfterAuth(t,"../../pages/login/login?landing_code=1",(function(){t.bindding_id=t.$store.state.bindding_num,t.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):t.$store.state.access_id,t.access_id&&t._axios()}))}))},computed:{halfWidth:function(){var t=uni.getStorageSync("data_height")?uni.getStorageSync("data_height"):this.$store.state.data_height,e=parseInt(t),n=2*e;return uni.upx2px(n)+"px"}},onShow:function(){this.bindding_id=this.$store.state.bindding_num,this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id,this._axios()},methods:(0,i.default)((0,i.default)({},(0,o.mapMutations)({})),{},{changeLoginStatus:function(){var t=this;t.access_id=uni.getStorageSync("access_id"),t._axios()},_saveImg:function(){(0,d.lkt_saveimg)(this)},shibieImg:function(){},_axios:function(){var t=this;wx.showLoading({title:"请等待片刻..."}),t._shareImg()},_shareImg:function(){(0,d.lkt_getimg)(this)},_back:function(){this.flag=!1,uni.navigateBack({delta:1})}})};e.default=s},"1b2b":function(t,e,n){"use strict";var a=n("cde9"),i=n.n(a);i.a},"31b9":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("lktauthorize",{ref:"lktAuthorizeComp",on:{pChangeLoginStatus:function(e){arguments[0]=e=t.$handleEvent(e),t.changeLoginStatus.apply(void 0,arguments)}}}),n("div",{staticClass:"data_h",style:{height:t.halfWidth}},[n("div",{staticClass:"data_h_h",style:{height:t.halfWidth}})]),n("div",{staticClass:"yh-halfWidth",style:{top:t.halfWidth}},[n("div",{staticClass:"position_head",style:{top:t.halfWidth}},[t.head?n("div",{staticClass:"head"},[n("img",{staticClass:"head_img",attrs:{src:t.back1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back()}}}),n("p",{staticClass:"yh-smfx"},[t._v("扫码分享")]),n("p",{staticClass:"saveClass"})]):t._e()])]),n("div",{staticClass:"yh-ewm"},[t.ewmImg?n("img",{staticClass:"yh-ewmImg",attrs:{src:t.ewmImg},on:{longpress:function(e){arguments[0]=e=t.$handleEvent(e),t.shibieImg()}}}):t._e()])],1)},o=[]},3908:function(t,e,n){var a=n("b64a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("a7d26146",a,!0,{sourceMap:!1,shadowMode:!1})},"47ed":function(t,e,n){"use strict";n.r(e);var a=n("defa"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},5115:function(t,e,n){"use strict";n.r(e);var a=n("e53b"),i=n("47ed");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("1b2b");var d,s=n("f0c5"),r=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"3fb1f804",null,!1,a["a"],d);e["default"]=r.exports},"5d02":function(t,e,n){"use strict";n.r(e);var a=n("0a0f"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"5dfa":function(t,e,n){"use strict";function a(t){var e=Number(t.put_mon),n=Number(t.min_amount);console.log(e+"==="+n),e<n?(e=0,t.put_mon=e.toFixed(2),uni.showToast({title:"提现金额需大于".concat(n,"元,请重新输入!"),duration:1e3,icon:"none"})):e>t.max_amount?(e=0,t.put_mon=e.toFixed(2),uni.showToast({title:"提现金额不能大于总金额，请重新输入!",duration:1e3,icon:"none"})):e=e,t.mon_kc=e.toFixed(2),console.log(t.put_mon>0)}function i(t){var e=/^([1-9]{1})(\d{5})$/;if(e.test(t.bank_number)){var n={module:"app",action:"user",app:"Verification",Bank_name:t.bank_name,Bank_card_number:t.bank_number};uni.request({data:n,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e);var n=e.data,a=n.code,i=n.message;console.log(a,i),200!=a?(t.bank_number="",uni.showToast({title:"银行卡号输入错误，请重新输入！",duration:1e3,icon:"none"})):t.bank_name=e.data.Bank_name}})}""==t.bank_number&&(t.bank_name="")}function o(t){var e=/^[1-9]{1}\d{15}|\d{18}$/;if(e.test(t.bank_number)){var n={module:"app",action:"user",app:"Verification",Bank_name:t.bank_name,Bank_card_number:t.bank_number};uni.request({data:n,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e);var n=e.data,a=n.code,i=n.message;console.log(a,i),200!=a?(t.bank_number="",uni.showToast({title:"银行卡号输入错误，请重新输入！",duration:1e3,icon:"none"})):t.bank_name=e.data.Bank_name}})}else t.bank_name="",t.bank_number="",uni.showToast({title:"请输入合法的银行卡号！",duration:1e3,icon:"none"})}function d(t){if(t.fastTap){t.fastTap=!1,t._telephone(t.phone);var e={module:"app",action:"user",app:"secret_key",phone:t.phone};t.phone?uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){t.fastTap=!0;var n=e.data,a=n.code,i=n.message;200!=a?uni.showToast({title:i,duration:1e3,icon:"none"}):200==a&&(t._time(),t.one_code,t.oldPhone=t.phone),console.log(e)},error:function(e){t.fastTap=!0}}):(t.fastTap=!0,uni.showToast({title:"请输入正确的手机号码！",duration:1e3,icon:"none"}))}}function s(t){var e=60;t.timer||(t.display=!1,t.count=e,t.timer=setInterval((function(){t.count>0&&t.count<=e?t.count--:(t.display=!0,clearInterval(t.timer),t.timer=null)}),1e3))}function r(t){if(t.fastTap){t.fastTap=!1,console.log(t.put_mon,t.bank_number,t.user_name,1==t.one_code,6==t.input_code.length,t.bank_name);if(t.put_mon&&t.bank_number&&t.user_name&&t.bank_name&&t.branch){var e={module:"app",action:"commcenter",app:"withdrawals",access_id:t.access_id,amoney:t.put_mon,Bank_name:t.bank_name,branch:t.branch,Bank_card_number:t.bank_number,Cardholder:t.user_name,mobile:t.phone,code:t.input_code};uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e);var n=e.data;200==n.code?(uni.showToast({title:"提现申请成功！",duration:1e3,icon:"none"}),setTimeout(function(){t.fastTap=!0,uni.navigateTo({url:"./distribution_result?txId="+n.withdraw_id})}.bind(t),1e3)):200!=n.code&&(t.fastTap=!0,uni.showToast({title:e.data.message,duration:1e3,icon:"none"}))},error:function(e){t.fastTap=!0}})}else 1!=t.one_code?(uni.showToast({title:"请先获取验证码！",duration:1e3,icon:"none"}),t.fastTap=!0):t.oldPhone!=t.phone?(uni.showToast({title:"手机号码输入不一致,请确认后提交！",duration:1e3,icon:"none"}),t.fastTap=!0):setTimeout((function(){uni.showToast({title:"请填写完整信息！",duration:1e3,icon:"none"}),t.fastTap=!0}),1500)}}function c(t){var e=Number(t.put_mon),n=Number(t.min_amount);console.log(e+"==="+n),e<n?(e=0,t.put_mon=e.toFixed(2),uni.showToast({title:"提现金额需大于".concat(n,"元,请重新输入!"),duration:1e3,icon:"none"})):e>t.max_amount?(e=0,t.put_mon=e.toFixed(2),uni.showToast({title:"提现金额不能大于总金额，请重新输入!",duration:1e3,icon:"none"})):e=e,t.mon_kc=e.toFixed(2),console.log(t.put_mon>0)}function u(t){var e={module:"app",action:"commproduct",access_id:t.access_id,app:"getstart"};uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){t.load=!1,t.header=e.data.pro,t.status_id=e.data.pro[0].id,t.order=e.data.pro[0].sonlist,0==e.data.pro[0].sonlist.length?t.hasGoods=-1:e.data.pro[0].sonlist.length>0&&(t.hasGoods=1)},error:function(t){console.log(t)}})}function l(t){uni.saveImageToPhotosAlbum({filePath:t.ewmImg,success:function(t){uni.showToast({title:"保存成功",duration:1e3})}})}function f(t){var e={module:"app",action:"getcode",app:"index",access_id:t.access_id,m:"product_share",store_type:2,scene:"productId",path:"../tabBar/home",type:4,proType:"distribution"};uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){JSON.stringify(e.data);uni.hideLoading(),200==e.data.code?(t.ewmImg=e.data.url+"",t.saveEWM=!0):404==e.data.code?(uni.showToast({title:"未登录，请先登录！",duration:1e3,icon:"none"}),setTimeout((function(){uni.navigateTo({url:"../login/login?landing_code=1"})}),1e3)):uni.showToast({title:e.data.message,duration:1500,icon:"none"})}})}function m(t,e,n,a){if(n)a.order[e].src=a.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/fx_bottom.png",a.sonList=[];else{for(var i in a.order[e].src=a.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/fx_top.png",a.order)a.order[i].openFlag=!1;var o={module:"app",action:"commcenter",app:"mygroup",access_id:a.access_id,uid:t};uni.request({data:o,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){a.sonList=t.data.list},error:function(t){console.log(t)}})}a.order[e].openFlag=!a.order[e].openFlag}n("a9e3"),n("b680"),Object.defineProperty(e,"__esModule",{value:!0}),e.lkt_back=a,e.lkt_bank=i,e.lkt_bank_p=o,e.lkt_getcode=d,e.lkt_time=s,e.lkt_submit=r,e.lkt_money=c,e.lkt_getgrade=u,e.lkt_saveimg=l,e.lkt_getimg=f,e.lkt_seedown=m},"7d99":function(t,e,n){"use strict";function a(t,e){uni.setStorage({key:t,data:e,success:function(){console.log("setSuccess")}})}function i(t){var e;return uni.getStorage({key:t,success:function(t){e=t.data,console.log("getSuccess")}}),e}function o(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(e,"__esModule",{value:!0}),e.setStorage=a,e.getStorage=i,e.removeStorage=o},"9c1f":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".load-more[data-v-3fb1f804]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.loading-img[data-v-3fb1f804]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-3fb1f804]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-3fb1f804]{position:absolute}.load1[data-v-3fb1f804],\n.load2[data-v-3fb1f804],\n.load3[data-v-3fb1f804]{height:24px;width:24px}.load2[data-v-3fb1f804]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-3fb1f804]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-3fb1f804]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-3fb1f804 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-3fb1f804{0%{opacity:1}100%{opacity:.2}}",""]),t.exports=e},b64a:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'.head[data-v-66d23d46],\r\n.order_header[data-v-66d23d46]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.head[data-v-66d23d46]{height:%?88?%;padding:0 %?30?%;border-bottom:none;font-size:%?40?%;border-bottom:1px solid #e5e5e5}.head_img[data-v-66d23d46]{width:%?24?%;height:%?36?%}.head_search[data-v-66d23d46]{width:%?40?%;height:%?40?%;visibility:hidden}.order_header[data-v-66d23d46]{-webkit-justify-content:space-around;justify-content:space-around;width:100%}.header_li[data-v-66d23d46]{width:25%;text-align:center;height:%?84?%;line-height:%?84?%;border-bottom:1px solid #eee;font-size:%?30?%;color:#9d9d9d}.header_border[data-v-66d23d46]{color:#020202;font-weight:700;position:relative}.header_border[data-v-66d23d46]:after{border-bottom:%?5?% solid #020202;position:absolute;bottom:0;width:50%;content:"";left:25%}.last_right>div[data-v-66d23d46]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.position_head[data-v-66d23d46]{position:fixed;left:0;top:0;width:100%;background-color:#fff;z-index:35}.content[data-v-66d23d46]{position:absolute;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;\r\n\r\n\r\ntop:%?158?%;\r\nleft:%?50?%;right:%?50?%;height:%?1008?%;background:#fff;padding:%?36?%;box-shadow:0 6px 16px 0 rgba(36,36,36,.17);border-radius:5px}.codeImg[data-v-66d23d46]{width:%?500?%;height:%?500?%}.saveClass[data-v-66d23d46]{font-size:%?28?%;font-family:PingFang-SC-Medium;font-weight:500;color:#000}uni-page-body[data-v-66d23d46]{height:100%\r\n\t/* background-color: #f5f5f5; */}.ewm-center[data-v-66d23d46]{font-size:%?28?%;color:#020202;font-weight:700;text-align:center;margin:%?40?%}.ewm-title[data-v-66d23d46]{font-size:%?32?%;color:#242424;font-weight:700;width:100%}.ewm-text[data-v-66d23d46]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;padding-left:%?10?%;margin-top:%?26?%}.ewm-text span[data-v-66d23d46]{font-size:%?28?%;color:#020202;font-weight:700}.ewm-text p[data-v-66d23d46]{font-size:%?28?%;color:#242424;-webkit-box-flex:1;-webkit-flex:1;flex:1}\r\n\r\n/* 优化 */.yh-halfWidth[data-v-66d23d46]{height:%?178?%;position:fixed;background:#fff;z-index:999}.yh-smfx[data-v-66d23d46]{font-size:%?32?%}.yh-ewm[data-v-66d23d46]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-align-content:center;align-content:center;margin-top:%?150?%}.yh-ewmImg[data-v-66d23d46]{width:%?678?%;height:%?1036?%}',""]),t.exports=e},cde9:function(t,e,n){var a=n("9c1f");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("29437017",a,!0,{sourceMap:!1,shadowMode:!1})},defa:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=a},e53b:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"load-more"},[n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[n("v-uni-view",{staticClass:"load1"},[n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}})],1),n("v-uni-view",{staticClass:"load2"},[n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}})],1),n("v-uni-view",{staticClass:"load3"},[n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}}),n("v-uni-view",{style:{background:t.color}})],1)],1),n("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},o=[]}}]);