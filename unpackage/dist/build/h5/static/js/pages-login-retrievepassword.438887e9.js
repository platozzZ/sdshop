(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-retrievepassword"],{"049c":function(e,t,n){"use strict";n.r(t);var o=n("cfe5"),a=n("a0d7");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("5171");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"529a8325",null,!1,o["a"],s);t["default"]=r.exports},"4eb3":function(e,t,n){"use strict";n.r(t);var o=n("7afc"),a=n("f60a");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("8918");var s,c=n("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"4b3c7e46",null,!1,o["a"],s);t["default"]=r.exports},5171:function(e,t,n){"use strict";var o=n("5e04"),a=n.n(o);a.a},"57cd":function(e,t,n){"use strict";function o(e,t){var n=/^\w{6,20}$/g,o=n.test(e);1==o?uni.showToast({title:"格式正确！",duration:1e3,icon:"none"}):""==e?(t.style.display="block",t.innerHTML="用户名不能为空",uni.showToast({title:"用户名不能为空",duration:1e3,icon:"none"})):(t.style.display="block",e="")}function a(e,t,n){var o=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,a=o.test(e);1==a||(""==e?uni.showToast({title:"密码不能为空！",duration:1e3,icon:"none"}):uni.showToast({title:"请输入6-16位数密码（数字和字母组合）！",duration:1e3,icon:"none"}))}function i(e,t){if(e==t&&""!=t)return 1;""==t?uni.showToast({title:"请输入确认密码！",duration:1e3,icon:"none"}):uni.showToast({title:"两次输入不一致！",duration:1e3,icon:"none"})}function s(e){var t=/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,n=t.test(e);return 1==n&&11==e.length?1:""==e?2:(console.log(111111),uni.showToast({title:"请输入正确的手机号！",duration:1e3,icon:"none"}),3)}function c(e,t){var n=60;e||(t=n,e=setInterval((function(){t>0&&t<=n?t--:(clearInterval(e),e=null)}),1e3))}function r(e){e="",console.log(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.onblur=o,t.pass=a,t.confirmpass=i,t.telephone=s,t.time=c,t.empty=r},"5e04":function(e,t,n){var o=n("ccc4");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("975f6912",o,!0,{sourceMap:!1,shadowMode:!1})},"7afc":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:"display:flex;height:"+e.BoxHeight},[n("div",{staticClass:"head",class:{head_w:"1"==e.ishead_w,border:1==e.border}},[n("div",{class:{white:!e.navWhite},style:{height:e.halfWidth}}),n("div",{staticClass:"header"},[e.flag&&!e.returnFlag?n("div",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._back1.apply(void 0,arguments)}}},["1"==e.ishead_w?n("img",{attrs:{src:e.back1}}):n("img",{attrs:{src:e.back}})]):e._e(),e.flag||e.returnFlag?e._e():n("img",{staticClass:"header_img",attrs:{src:e.bback},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._back1.apply(void 0,arguments)}}}),n("p",{class:{title_w:"1"==e.ishead_w}},[e._v(e._s(e.title))])])])])},i=[]},"7d99":function(e,t,n){"use strict";function o(e,t){uni.setStorage({key:e,data:t,success:function(){console.log("setSuccess")}})}function a(e){var t;return uni.getStorage({key:e,success:function(e){t=e.data,console.log("getSuccess")}}),t}function i(e){uni.removeStorage({key:e,success:function(e){console.log("removeSuccess")}})}Object.defineProperty(t,"__esModule",{value:!0}),t.setStorage=o,t.getStorage=a,t.removeStorage=i},8918:function(e,t,n){"use strict";var o=n("f6b3"),a=n.n(o);a.a},"89fa":function(e,t,n){var o=n("24fb");t=o(!1),t.push([e.i,".border[data-v-4b3c7e46]{border-bottom:0 solid #eee!important}.head[data-v-4b3c7e46]{position:fixed;left:0;top:0;background-color:#fff!important;width:100%;z-index:9999}.head .white[data-v-4b3c7e46]{background:#fff}.header[data-v-4b3c7e46]{background-color:#fff;width:100%;height:%?88?%;border-bottom:1px solid #eee;color:#020202;font-size:%?40?%}.header img[data-v-4b3c7e46]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-4b3c7e46]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-4b3c7e46]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-4b3c7e46]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header>div[data-v-4b3c7e46]{height:%?88?%;width:%?160?%;position:absolute;z-index:9999}.head_w[data-v-4b3c7e46]{background:transparent;border-bottom:0}.title_w[data-v-4b3c7e46]{color:#fff!important}",""]),e.exports=t},a0d7:function(e,t,n){"use strict";n.r(t);var o=n("eea5"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},ccc4:function(e,t,n){var o=n("24fb");t=o(!1),t.push([e.i,".login uni-input[data-v-529a8325]{border-bottom:1px solid #eee;margin:0;width:100%}.login_p[data-v-529a8325]{width:%?190?%;height:%?80?%;position:absolute;bottom:%?20?%;right:%?-20?%;text-align:center;line-height:%?80?%;z-index:99;color:#020202}.login[data-v-529a8325]{padding-bottom:%?4?%}.button[data-v-529a8325]{border-radius:%?8?%;background-color:#9a9a9a;width:80%;margin:%?72?% %?76?%}.active[data-v-529a8325]{background-color:#020202}.login_inpu img[data-v-529a8325]{padding:%?20?% %?0?%;right:%?0?%;bottom:%?20?%}.loginsss[data-v-529a8325]{width:90%;margin:0 auto;border:none;border-radius:0;font-size:%?30?%;margin-bottom:%?4?%}.b[data-v-529a8325]{color:#666}.buttons[data-v-529a8325]{width:90%;margin:%?72?% %?32?%}",""]),e.exports=t},cfe5:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("heads",{attrs:{title:e.title}}),e.pass?n("div",{staticStyle:{position:"relative"}},[n("div",{staticClass:"login"},[n("div",{staticClass:"login_inpu loginsss"},[n("v-uni-input",{attrs:{"placeholder-style":"color:#b8b8b8",type:"text",placeholder:"请输入账号",disabled:e.phoneS},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e._phone_t(1)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e._telephone(e.phone,1)},input:function(t){arguments[0]=t=e.$handleEvent(t),e._changeStep.apply(void 0,arguments)}},model:{value:e.zhanghao,callback:function(t){e.zhanghao=t},expression:"zhanghao"}}),n("img",{directives:[{name:"show",rawName:"v-show",value:e.zhanghao.length&&e.phone_t,expression:"zhanghao.length&&phone_t"}],attrs:{src:e.del},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._empty(1)}}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.code_dis,expression:"code_dis"}],staticClass:"login_inpu loginsss"},[n("v-uni-input",{attrs:{type:"number","placeholder-style":"color:#b8b8b8",placeholder:"验证码"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e._changeStep1.apply(void 0,arguments)}},model:{value:e.phone_code,callback:function(t){e.phone_code=t},expression:"phone_code"}}),n("div",{staticClass:"login_p",class:"获取验证码"===e.time_code?"":"b",domProps:{textContent:e._s(e.time_code)},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._code()}}})],1)]),e.next?n("div",{staticClass:"button a1",class:{active:e.changeStep},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._next_one.apply(void 0,arguments)}}},[e._v("下一步")]):e._e(),e.next?e._e():n("div",{staticClass:"button a2",class:{active:e.changeStep},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._next_two.apply(void 0,arguments)}}},[e._v("下一步")])]):e._e(),e.pass?e._e():n("div",[n("div",{staticClass:"login",staticStyle:{position:"relative"}},[n("div",{staticClass:"login_inpu loginsss"},[e.pwFlag?n("v-uni-input",{attrs:{type:"text",placeholder:"请输入6-15位数字或字母密码!","placeholder-style":"color:#b8b8b8"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e._phone_t(2)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e._w_password(1)},input:function(t){arguments[0]=t=e.$handleEvent(t),e._changeStep2.apply(void 0,arguments)}},model:{value:e.new_password,callback:function(t){e.new_password=t},expression:"new_password"}}):n("v-uni-input",{attrs:{type:"password",placeholder:"请输入6-15位数字或字母密码!","placeholder-style":"color:#b8b8b8"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e._phone_t(2)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e._w_password(1)},input:function(t){arguments[0]=t=e.$handleEvent(t),e._changeStep2.apply(void 0,arguments)}},model:{value:e.new_password,callback:function(t){e.new_password=t},expression:"new_password"}}),e.pwFlag?n("img",{attrs:{src:e.pwHide},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._seepw(1)}}}):n("img",{attrs:{src:e.pwShow},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._seepw(1)}}})],1),n("div",{staticClass:"login_inpu loginsss"},[e.pwFlag1?n("v-uni-input",{attrs:{type:"text",placeholder:"确认新密码","placeholder-style":"color:#b8b8b8"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e._phone_t(3)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e._w_password(2)},input:function(t){arguments[0]=t=e.$handleEvent(t),e._changeStep2.apply(void 0,arguments)}},model:{value:e.old_password,callback:function(t){e.old_password=t},expression:"old_password"}}):n("v-uni-input",{attrs:{type:"password",placeholder:"确认新密码","placeholder-style":"color:#b8b8b8"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e._phone_t(3)},blur:function(t){arguments[0]=t=e.$handleEvent(t),e._w_password(2)},input:function(t){arguments[0]=t=e.$handleEvent(t),e._changeStep2.apply(void 0,arguments)}},model:{value:e.old_password,callback:function(t){e.old_password=t},expression:"old_password"}}),e.pwFlag1?n("img",{attrs:{src:e.pwHide},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._seepw(2)}}}):n("img",{attrs:{src:e.pwShow},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._seepw(2)}}})],1),n("div",{staticClass:"button buttons",class:{active:e.changeStep},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e._next_three.apply(void 0,arguments)}}},[e._v("保存")])])])],1)},i=[]},eea5:function(e,t,n){"use strict";var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n("57cd");var a=o(n("4eb3")),i={data:function(){return{phoneS:!1,fastTap:!0,del:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/delete2x.png",pwShow:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/pwShow.png",pwHide:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/pwHide.png",title:"找回密码",phone:"",phone_next:"",code_dis:!1,phone_code:"",old_phone:"",count:"",timer:null,time_code:"获取验证码",next:!0,pass:!0,pwFlag:!1,pwFlag1:!1,old_password:"",new_password:"",phone_t:"",new_password_f:"",old_password_f:"",changeStep:!1,zhanghao:"",codeBtnAllowClick:!1,isInput:!1}},onShow:function(){this.codeBtnAllowClick=!0},methods:{_seepw:function(e){1!=e?this.pwFlag1=!this.pwFlag1:this.pwFlag=!this.pwFlag},_changeStep:function(e){""!==e.detail.value?(this.isInput=!0,this.changeStep=!0):this.changeStep=!1,this.zhanghao=e.detail.value},_changeStep1:function(e){6===e.detail.value.length?(this.isInput=!1,this.changeStep=!0):this.changeStep=!1},_changeStep2:function(e){e.detail.value==this.new_password||e.detail.value==this.old_password?(this.isInput=!0,this.changeStep=!0):this.changeStep=!1},_phone_t:function(e){1==e?this.phone_t=!0:2==e?this.new_password_f=!0:3==e&&(this.old_password_f=!0)},_w_password:function(e){1==e?this.new_password_f=!0:2==e&&(this.old_password_f=!0)},_telephone:function(e,t){1==t&&(this.phone_t=!0)},_next_one:function(){var e=this;if(this.isInput){var t=this,n={module:"app",action:"login",app:"forget_zhanghao",zhanghao:this.zhanghao};uni.request({data:n,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(n){console.log(n);var o=n.data,a=o.message,i=o.code,s=o.mobile;200==i?(t.next=!1,t.code_dis=!0,e.phoneS=!0,e.phone_t=!1,e.zhanghao=s,e.changeStep=!1):uni.showToast({title:a,duration:1e3,icon:"none"})},error:function(e){console.log(e)}})}},_next_two:function(){if(!this.isInput){console.log(this.zhanghao);var e=this;this.fastTap&&(this.fastTap=!1,!this.phone_code&&this.code_dis?(uni.showToast({title:"验证码不能为空！",duration:1500,icon:"none"}),setTimeout((function(){e.fastTap=!0}),1500)):6!=this.phone_code.length?(uni.showToast({title:"验证码输入错误！",duration:1500,icon:"none"}),setTimeout((function(){e.fastTap=!0}),1500)):6==this.phone_code.length&&this.phoneS&&uni.request({data:{module:"app",action:"login",app:"forget_code",phone:e.zhanghao,keyCode:e.phone_code},url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){var n=t.data,o=n.code,a=n.message;console.log(t,o),200==o?(e.title="重置密码",e.changeStep=!1,e.pass=!1):uni.showToast({title:a,duration:1500,icon:"none"}),setTimeout((function(){e.fastTap=!0}),1500)},error:function(){e.fastTap=!0}}))}},_empty:function(e){1==e?this.zhanghao="":2==e?this.new_password="":3==e&&(this.old_password="")},_newpassword:function(){var e=/^[a-z0-9]{6,15}$/i;if(""!=this.new_password){if(this.rez=e.test(this.new_password),1==this.rez)return 1;uni.showToast({title:"请输入6-15位数字或字母账号！",duration:2e3,icon:"none"})}},_next_three:function(){if(this.isInput){var e=this._newpassword();console.log(e);if(1==e)if(this.old_password==this.new_password&&""!=this.new_password&&6==this.phone_code.length){var t={module:"app",action:"login",app:"forgotpassword",phone:this.zhanghao,password:this.new_password,keyCode:this.phone_code};uni.request({data:t,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e);var t=e.data,n=t.message,o=t.code;200==o?(uni.showToast({title:n,icon:"none",duration:1e3}),setTimeout((function(){uni.redirectTo({url:"login?toHome=true"})}),1e3)):uni.showToast({title:n,icon:"none"})},error:function(e){console.log(e)}})}else uni.showToast({title:"两次密码输入不一致，请重新输入！",duration:1e3,icon:"none"});else uni.showToast({title:"密码格式错误！",duration:1e3,icon:"none"})}},_code:function(){var e=this;if(e.codeBtnAllowClick){e.codeBtnAllowClick=!1;var t={module:"app",action:"user",app:"secret_key",phone:this.zhanghao};console.log(t),uni.request({data:t,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){var n=t.data,o=n.code,a=n.message;if(220==o)uni.showToast({title:a,duration:1e3,icon:"none"});else if(200==o){e.phoneS=!0;var i=60;e.timer||(e.count=i,e.timer=setInterval((function(){e.count>0&&e.count<=i?(e.count--,e.time_code="".concat(e.count,"s后可重获")):(clearInterval(e.timer),e.time_code="获取验证码",e.timer=null,e.count="",e.codeBtnAllowClick=!0)}),1e3))}else uni.showToast({title:"获取验证码失败，请稍后再试。",duration:1e3,icon:"none"})},error:function(e){console.log(e)}})}else console.log("正在获取验证码..")}},components:{heads:a.default}};t.default=i},f60a:function(e,t,n){"use strict";n.r(t);var o=n("f894"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},f6b3:function(e,t,n){var o=n("89fa");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("45e446d7",o,!0,{sourceMap:!1,shadowMode:!1})},f894:function(e,t,n){"use strict";var o=n("4ea4");n("a9e3"),n("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("5530")),i=n("2f62"),s=n("7d99"),c={data:function(){return{flag:!0,bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/bback.png",back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},computed:{halfWidth:function(){var e=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,t=parseInt(e);return t+"px"},BoxHeight:function(){var e=(0,s.getStorage)("data_height")?(0,s.getStorage)("data_height"):this.$store.state.data_height,t=0,n=parseInt(e)+uni.upx2px(88);return t=n&&n>0?n:uni.upx2px(88),t+"px"}},onLoad:function(e){console.log("header"),console.log(this.returnR)},props:["title","returnR","navWhite","returnFlag","border","ishead_w"],methods:(0,a.default)((0,a.default)({},(0,i.mapMutations)({status:"data_height"})),{},{_back:function(){this.flag=!1,console.log(this.returnR)},_back1:function(){switch(this.flag=!1,Number(this.returnR)){case 1:uni.navigateBack({delta:2});break;case 2:uni.switchTab({url:"../tabBar/shoppingCart"});break;case 3:uni.redirectTo({url:"../login/login.vue"});break;case 4:uni.navigateBack({delta:3});break;case 5:uni.redirectTo({url:"../order/myOrder"});break;case 6:uni.switchTab({url:"../../pages/tabBar/home"});break;case 7:uni.switchTab({url:"../../pages/tabBar/my"});break;case 8:uni.switchTab({url:"../tabBar/my"});break;case 9:uni.redirectTo({url:"/pagesA/myStore/myStore"});break;default:getCurrentPages().length>1?uni.navigateBack({delta:1}):uni.switchTab({url:"/pages/tabBar/home"})}this.flag=!0}})};t.default=c}}]);