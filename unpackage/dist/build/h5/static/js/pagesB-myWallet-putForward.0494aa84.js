(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesB-myWallet-putForward"],{"110e":function(e,t,n){"use strict";n.r(t);var a=n("5995"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"25eb":function(e,t,n){var a=n("23e7"),i=n("c20d");a({target:"Number",stat:!0,forced:Number.parseInt!=i},{parseInt:i})},"4eb3":function(e,t,n){"use strict";n.r(t);var a=n("7afc"),i=n("f60a");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("8918");var s,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"4b3c7e46",null,!1,a["a"],s);t["default"]=c.exports},"57cd":function(e,t,n){"use strict";function a(e,t){var n=/^\w{6,20}$/g,a=n.test(e);1==a?uni.showToast({title:"格式正确！",duration:1e3,icon:"none"}):""==e?(t.style.display="block",t.innerHTML="用户名不能为空",uni.showToast({title:"用户名不能为空",duration:1e3,icon:"none"})):(t.style.display="block",e="")}function i(e,t,n){var a=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,i=a.test(e);1==i||(""==e?uni.showToast({title:"密码不能为空！",duration:1e3,icon:"none"}):uni.showToast({title:"请输入6-16位数密码（数字和字母组合）！",duration:1e3,icon:"none"}))}function o(e,t){if(e==t&&""!=t)return 1;""==t?uni.showToast({title:"请输入确认密码！",duration:1e3,icon:"none"}):uni.showToast({title:"两次输入不一致！",duration:1e3,icon:"none"})}function s(e){var t=/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,n=t.test(e);return 1==n&&11==e.length?1:""==e?2:(console.log(111111),uni.showToast({title:"请输入正确的手机号！",duration:1e3,icon:"none"}),3)}function r(e,t){var n=60;e||(t=n,e=setInterval((function(){t>0&&t<=n?t--:(clearInterval(e),e=null)}),1e3))}function c(e){e="",console.log(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.onblur=a,t.pass=i,t.confirmpass=o,t.telephone=s,t.time=r,t.empty=c},5995:function(e,t,n){"use strict";var a=n("4ea4");n("a9e3"),n("25eb"),n("b680"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("4eb3")),o=n("57cd"),s=(n("2f62"),n("7d99"),{data:function(){return{pshd:"",type:"",title:"提现申请",put_mon:"",bank_number:"",bank_name:"",user_name:"",phone:"",input_code:"",display:!0,count:"",timer:"",code:"",one_code:"",max_amount:"",min_amount:"",bank_information:"",mobile:"",oldPhone:"",access_id:"",allComplete:!1,fastTap:!0,shop_id:"",money:"",warnIng:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/warnIng.png",service_charge:""}},onLoad:function(e){this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id,this.shop_id=uni.getStorageSync("shop_id")?uni.getStorageSync("shop_id"):this.$store.state.shop_id,this.type=e.type,this._axios()},methods:{changeLoginStatus:function(){var e=this;e.access_id=e.$store.state.access_id,e._axios()},_axios:function(){var e=this,t={module:"app",action:"user",app:"into_withdrawals",access_id:this.access_id};"store"==this.type&&(t.shop_id=this.$store.state.shop_id),uni.request({data:t,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){if(200==t.data.code){var n=t.data.data,a=n.bank_information,i=(n.pshd,n.max_amount),o=n.min_amount,s=n.money,r=n.mobile,c=n.service_charge;e.max_amount=i,e.min_amount=o,e.bank_information=a,e.mobile=r,e.bank_number=e.bank_information.Bank_card_number?e.bank_information.Bank_card_number:"",e.bank_name=e.bank_information.Bank_name?e.bank_information.Bank_name:"",e.user_name=e.bank_information.Cardholder?e.bank_information.Cardholder:"",e.phone=e.mobile?e.mobile:"",e.pshd="当前余额为"+s+"元",e.money=s,e.service_charge=c}else 115==t.data.code?e.$refs.lktAuthorizeComp.handleAfterAuth(e,"../login/login?landing_code=1"):uni.showToast({title:t.data.message,duration:1500,icon:"none"})}})},back:function(){this.myforward(""),this.mybacks(""),uni.navigateBack({delta:1})},_put:function(){var e=Number(this.max_amount);Number(this.put_mon);console.log(e),console.log(this.min_amount),console.log(this.max_amount),0==this.money?uni.showToast({title:"您暂时没有可提现金额",duration:1e3,icon:"none"}):this.money>this.max_amount?this.put_mon=this.max_amount:this.put_mon=this.money},_money:function(){var e=Number(this.put_mon),t=Number(this.min_amount);console.log(t),console.log("金额判断="+e),e<t?(e=0,this.put_mon=e.toFixed(2),uni.showToast({title:"提现金额需大于".concat(t,"元,请重新输入!"),duration:1e3,icon:"none"})):e>this.max_amount&&(e=0,this.put_mon=e.toFixed(2),uni.showToast({title:"提现金额不能大于总金额，请重新输入!",duration:1e3,icon:"none"})),this.put_mon=e.toFixed(2),console.log(this.put_mon>0)},_bank:function(){var e=this,t=/^([1-9]{1})(\d{5})$/;if(t.test(e.bank_number)){var n={module:"app",action:"user",app:"Verification",Bank_name:e.bank_name,Bank_card_number:e.bank_number};uni.request({data:n,url:e.$store.state.url,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t);var n=t.data,a=n.code,i=n.message;console.log(a,i),200!=a?(e.bank_number="",uni.showToast({title:"银行卡号输入错误，请重新输入！",duration:1e3,icon:"none"})):e.bank_name=t.data.Bank_name}})}""==this.bank_number&&(this.bank_name="")},_bank_p:function(){var e=this,t=/^[1-9]{1}\d{15}|\d{18}$/;if(t.test(Number.parseInt(this.bank_number))){if(this.bank_name){var n={module:"app",action:"user",app:"Verification",Bank_name:this.bank_name,Bank_card_number:this.bank_number};uni.request({data:n,url:e.$store.state.url,header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){console.log(t);var n=t.data,a=n.code,i=n.message;console.log(a,i),200!=a?(e.bank_number="",uni.showToast({title:"银行卡号输入错误，请重新输入！",duration:1e3,icon:"none"})):e.bank_name=t.data.Bank_name}})}}else uni.showToast({title:"请输入合法的银行卡号！",duration:1e3,icon:"none"})},_usname:function(){var e=this,t=/^[\u4e00-\u9fa5]{2,8}$/;t.test(e.user_name)||(e.user_name="",uni.showToast({title:"请输入合法的姓名！",duration:1e3,icon:"none"}))},_verif:function(){if(this.fastTap){this.fastTap=!1,this._telephone(this.phone);var e=this,t={module:"app",action:"user",app:"secret_key",phone:e.phone,message_type:0,message_type1:6};e.phone?uni.request({data:t,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){e.fastTap=!0;var n=t.data,a=n.code,i=n.message;200!=a?uni.showToast({title:i,duration:1e3,icon:"none"}):200==a&&(e._time(),e.one_code,e.oldPhone=e.phone),console.log(t)},error:function(t){e.fastTap=!0}}):(e.fastTap=!0,uni.showToast({title:"请输入正确的手机号码！",duration:1e3,icon:"none"}))}},_time:function(){var e=this,t=60;this.timer||(this.display=!1,this.count=t,this.timer=setInterval((function(){e.count>0&&e.count<=t?e.count--:(e.display=!0,clearInterval(e.timer),e.timer=null)}),1e3))},_telephone:function(e){this.one_code=(0,o.telephone)(e)},_sumber:function(){if(this.fastTap){this.fastTap=!1,console.log(this);var e=this,t=this;if(this.put_mon&&this.bank_number&&this.user_name&&1==this.one_code&&6==this.input_code.length&&this.bank_name&&this.oldPhone==this.phone){var n={module:"app",action:"user",app:"withdrawals",access_id:e.access_id,amoney:e.put_mon,Bank_name:e.bank_name,Bank_card_number:e.bank_number,Cardholder:e.user_name,mobile:e.phone,keyCode:this.input_code};"store"==this.type&&(n.shop_id=this.shop_id),uni.request({data:n,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(n){console.log(n);var a=n.data;200==a.code?(uni.showToast({title:"提现申请成功！",duration:1e3,icon:"none"}),setTimeout(function(){t.fastTap=!0,uni.redirectTo({url:"rechargeSuccess?id_name="+e.bank_name+"&id_catd="+e.bank_number+"&id_monsy="+e.put_mon+"&store=true"})}.bind(e),1e3)):200!=a.code&&(t.fastTap=!0,uni.showToast({title:n.data.message,duration:1e3,icon:"none"}))},error:function(e){t.fastTap=!0}})}else 1!=this.one_code?(uni.showToast({title:"请先获取验证码！",duration:1e3,icon:"none"}),t.fastTap=!0):this.oldPhone!=this.phone?(uni.showToast({title:"手机号码输入不一致,请确认后提交！",duration:1e3,icon:"none"}),t.fastTap=!0):setTimeout((function(){uni.showToast({title:"请填写完整信息！",duration:1e3,icon:"none"}),t.fastTap=!0}),1500)}}},components:{heads:i.default}});t.default=s},"5a2a":function(e,t,n){"use strict";var a=n("fafb"),i=n.n(a);i.a},"7afc":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:"display:flex;height:"+e.BoxHeight},[n("div",{staticClass:"head",class:{head_w:"1"==e.ishead_w,border:1==e.border}},[n("div",{class:{white:!e.navWhite},style:{height:e.halfWidth}}),n("div",{staticClass:"header"},[e.flag&&!e.returnFlag?n("div",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._back1.apply(void 0,arguments)}}},["1"==e.ishead_w?n("img",{attrs:{src:e.back1}}):n("img",{attrs:{src:e.back}})]):e._e(),e.flag||e.returnFlag?e._e():n("img",{staticClass:"header_img",attrs:{src:e.bback},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._back1.apply(void 0,arguments)}}}),n("p",{class:{title_w:"1"==e.ishead_w}},[e._v(e._s(e.title))])])])])},o=[]},"7d99":function(e,t,n){"use strict";function a(e,t){uni.setStorage({key:e,data:t,success:function(){console.log("setSuccess")}})}function i(e){var t;return uni.getStorage({key:e,success:function(e){t=e.data,console.log("getSuccess")}}),t}function o(e){uni.removeStorage({key:e,success:function(e){console.log("removeSuccess")}})}Object.defineProperty(t,"__esModule",{value:!0}),t.setStorage=a,t.getStorage=i,t.removeStorage=o},"888e":function(e,t,n){"use strict";n.r(t);var a=n("d602"),i=n("110e");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("5a2a");var s,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"23848e2e",null,!1,a["a"],s);t["default"]=c.exports},8918:function(e,t,n){"use strict";var a=n("f6b3"),i=n.n(a);i.a},"89fa":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".border[data-v-4b3c7e46]{border-bottom:0 solid #eee!important}.head[data-v-4b3c7e46]{position:fixed;left:0;top:0;background-color:#fff!important;width:100%;z-index:9999}.head .white[data-v-4b3c7e46]{background:#fff}.header[data-v-4b3c7e46]{background-color:#fff;width:100%;height:%?88?%;border-bottom:1px solid #eee;color:#020202;font-size:%?40?%}.header img[data-v-4b3c7e46]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-4b3c7e46]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-4b3c7e46]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-4b3c7e46]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header>div[data-v-4b3c7e46]{height:%?88?%;width:%?160?%;position:absolute;z-index:9999}.head_w[data-v-4b3c7e46]{background:transparent;border-bottom:0}.title_w[data-v-4b3c7e46]{color:#fff!important}",""]),e.exports=t},d204:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,".box[data-v-23848e2e]{height:100vh;background-color:#f6f6f6}.head[data-v-23848e2e]{position:fixed;left:0;top:0;background-color:#fff;width:100%;z-index:40}.header[data-v-23848e2e]{background-color:#fff}.header img[data-v-23848e2e]{position:absolute;top:%?28?%;left:%?20?%;width:%?24?%;height:%?36?%}.header p[data-v-23848e2e]{text-align:center;width:100%;height:100%;line-height:%?88?%}.put_head[data-v-23848e2e]{height:%?60?%;line-height:%?60?%;padding:0 %?30?%;font-size:%?22?%;color:#9d9d9d;position:relative}.put_head span[data-v-23848e2e]{color:#020202}.put_head[data-v-23848e2e],\n.put_money[data-v-23848e2e],\n.yz_li[data-v-23848e2e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}uni-input[data-v-23848e2e]::-webkit-input-placeholder{color:#9d9d9d}.put_money[data-v-23848e2e]{background-color:#fff;font-size:%?28?%;color:#020202}.message[data-v-23848e2e]{font-size:%?28?%;color:#020202;background-color:#fff;position:relative}.message li[data-v-23848e2e]{margin:0 %?30?%;border-bottom:1px solid #eee;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}li span[data-v-23848e2e]{width:65px;display:-webkit-box;display:-webkit-flex;display:flex;height:%?90?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;font-size:%?28?%;color:#020202}.message uni-input[data-v-23848e2e]{border:none;padding-left:%?30?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.setup-buttom[data-v-23848e2e]{height:%?90?%;width:%?690?%;margin:0 auto;position:relative;border-radius:%?8?%;margin-top:%?72?%}.put_head > p[data-v-23848e2e]:first-child{font-size:%?21?%}.put_head > p[data-v-23848e2e]:last-child{color:#020202;font-size:%?22?%}.yz_li[data-v-23848e2e]{position:relative;border:none}.yz_span[data-v-23848e2e]{text-align:right;width:auto!important;color:#020202}.yz_li .active[data-v-23848e2e]{text-align:right;width:auto!important;color:#666}.hr[data-v-23848e2e]{height:%?20?%;width:100%;background:#f6f6f6}.put_mons[data-v-23848e2e]{font-size:%?28?%;color:#b8b8b8}\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 订单模块颜色值 */\n/* 背景颜色 */\n/*  背景渐变色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */",""]),e.exports=t},d602:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box"},[n("lktauthorize",{ref:"lktAuthorizeComp",on:{pChangeLoginStatus:function(t){arguments[0]=t=e.$handleEvent(t),e.changeLoginStatus.apply(void 0,arguments)}}}),n("heads",{attrs:{title:e.title}}),n("ul",{staticClass:"message"},[n("li",{staticStyle:{border:"none",height:"300rpx","align-items":"baseline"}},[n("v-uni-view",{staticStyle:{"margin-top":"49rpx",width:"100%"}},[n("v-uni-text",{staticStyle:{color:"#020202","font-size":"28rpx"}},[e._v("提现金额")]),n("v-uni-view",{staticStyle:{display:"flex","margin-top":"49rpx",height:"35rpx","align-items":"center"}},[n("v-uni-text",{staticStyle:{"font-size":"48rpx",color:"#020202"}},[e._v("¥")]),n("v-uni-input",{attrs:{"placeholder-style":"color: #b8b8b8;",type:"number",placeholder:e.pshd,id:"put_mon","placeholder-class":"put_mons"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e._money.apply(void 0,arguments)}},model:{value:e.put_mon,callback:function(t){e.put_mon=t},expression:"put_mon"}}),n("v-uni-text",{staticStyle:{flex:"1","text-align":"end"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._put()}}},[e._v("全部提现")])],1),n("v-uni-view",{staticStyle:{height:"70rpx","margin-top":"60rpx","align-items":"center","border-top":"1px solid rgb(230, 230, 230)",display:"flex",color:"#999999","font-size":"22rpx"}},[n("v-uni-image",{staticStyle:{width:"24rpx",height:"24rpx","margin-right":"9rpx"},attrs:{src:e.warnIng}}),e._v("最小提现金额¥"+e._s(e.min_amount)+"，提现手续费"+e._s(e.service_charge))],1)],1)],1),n("v-uni-view",{staticClass:"hr"}),n("li",[n("v-uni-text",{staticStyle:{height:"90rpx","font-size":"30rpx",color:"#020202","line-height":"88rpx"}},[e._v("填写提现银行卡信息")])],1),n("li",[n("span",[e._v("银行卡号")]),n("v-uni-input",{attrs:{"placeholder-style":"color: #b8b8b8;",type:"text",placeholder:"请输入银行卡号"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e._bank()},blur:function(t){arguments[0]=t=e.$handleEvent(t),e._bank_p.apply(void 0,arguments)}},model:{value:e.bank_number,callback:function(t){e.bank_number=t},expression:"bank_number"}})],1),n("li",[n("span",[e._v("开户银行")]),n("v-uni-input",{attrs:{"placeholder-style":"color: #b8b8b8;",type:"text",placeholder:"请输入银行名称"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e._bank_p.apply(void 0,arguments)}},model:{value:e.bank_name,callback:function(t){e.bank_name=t},expression:"bank_name"}})],1),n("li",[n("span",[e._v("持卡人")]),n("v-uni-input",{attrs:{"placeholder-style":"color: #b8b8b8;",type:"text",placeholder:"请输入持卡人姓名"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e._usname()}},model:{value:e.user_name,callback:function(t){e.user_name=t},expression:"user_name"}})],1),n("li",[n("span",[e._v("手机号")]),n("v-uni-input",{attrs:{type:"number",placeholder:"请输入手机号",disabled:"true",readonly:"readonly"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("li",{staticClass:"yz_li"},[n("span",[e._v("验证码")]),n("v-uni-input",{staticClass:"input",class:{marginleft:e.display},staticStyle:{flex:"1"},attrs:{"placeholder-style":"color: #b8b8b8;",type:"number",placeholder:"请输入手机验证码"},model:{value:e.input_code,callback:function(t){e.input_code=t},expression:"input_code"}}),e.display?n("span",{staticClass:"color yz_span",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._verif.apply(void 0,arguments)}}},[e._v("获取验证码")]):e._e(),e.display?e._e():n("span",{staticClass:"active"},[e._v(e._s(e.count)+"S后再次获取")])],1)],1),n("div",{staticClass:"setup-buttom",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._sumber.apply(void 0,arguments)}}},[e._v("确认提现")])],1)},o=[]},f60a:function(e,t,n){"use strict";n.r(t);var a=n("f894"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},f6b3:function(e,t,n){var a=n("89fa");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("45e446d7",a,!0,{sourceMap:!1,shadowMode:!1})},f894:function(e,t,n){"use strict";var a=n("4ea4");n("a9e3"),n("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("5530")),o=n("2f62"),s=n("7d99"),r={data:function(){return{flag:!0,bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/bback.png",back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},computed:{halfWidth:function(){var e=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,t=parseInt(e);return t+"px"},BoxHeight:function(){var e=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,t=0,n=parseInt(e)+uni.upx2px(88);return t=n&&n>0?n:uni.upx2px(88),t+"px"}},onLoad:function(e){console.log("header"),console.log(this.returnR)},props:["title","returnR","navWhite","returnFlag","border","ishead_w"],methods:(0,i.default)((0,i.default)({},(0,o.mapMutations)({status:"data_height"})),{},{_back:function(){this.flag=!1,console.log(this.returnR)},_back1:function(){switch(this.flag=!1,Number(this.returnR)){case 1:uni.navigateBack({delta:2});break;case 2:uni.switchTab({url:"../tabBar/shoppingCart"});break;case 3:uni.redirectTo({url:"../login/login.vue"});break;case 4:uni.navigateBack({delta:3});break;case 5:uni.redirectTo({url:"../order/myOrder"});break;case 6:uni.switchTab({url:"../../pages/tabBar/home"});break;case 7:uni.switchTab({url:"../../pages/tabBar/my"});break;case 8:uni.switchTab({url:"../tabBar/my"});break;case 9:uni.redirectTo({url:"/pagesA/myStore/myStore"});break;default:getCurrentPages().length>1?uni.navigateBack({delta:1}):uni.switchTab({url:"/pages/tabBar/home"})}this.flag=!0}})};t.default=r},fafb:function(e,t,n){var a=n("d204");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("32fa8d06",a,!0,{sourceMap:!1,shadowMode:!1})}}]);