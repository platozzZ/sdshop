(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesB-seckill-seckill"],{"051d":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.isShow?i("v-uni-view",{staticClass:"ruleModal",on:{touchmove:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e)},click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.cancel()}}},[i("v-uni-view",{staticClass:"ruleModal-content",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e)}}},[i("v-uni-view",{staticClass:"ruleModal-content-header"},[t._v(t._s(t.title))]),i("v-uni-scroll-view",{staticClass:"ruleModal-content-body",attrs:{"scroll-y":"true"}},[i("v-uni-rich-text",{attrs:{nodes:t.details}})],1),i("v-uni-view",{staticClass:"ruleModal-content-footer"},[i("v-uni-view",{staticClass:"foobtn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.cancel()}}},[i("v-uni-text",[t._v("我知道了")])],1)],1)],1)],1):t._e()},o=[]},"139f":function(t,e,i){"use strict";i.r(e);var n=i("051d"),a=i("7999");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("654a");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"0d0a11e5",null,!1,n["a"],r);e["default"]=c.exports},1571:function(t,e,i){"use strict";var n=i("588b"),a=i.n(n);a.a},"17ad":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"ruleModal",props:["value","title","details"],data:function(){return{isShow:!1}},watch:{value:function(t){this.isShow=t}},methods:{cancel:function(){this.$emit("click",!1)}}};e.default=n},"4eb3":function(t,e,i){"use strict";i.r(e);var n=i("7afc"),a=i("f60a");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("8918");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"4b3c7e46",null,!1,n["a"],r);e["default"]=c.exports},"588b":function(t,e,i){var n=i("fa55");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("9e295154",n,!0,{sourceMap:!1,shadowMode:!1})},"654a":function(t,e,i){"use strict";var n=i("6b0e"),a=i.n(n);a.a},"6b0e":function(t,e,i){var n=i("8759");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("cb0084a4",n,!0,{sourceMap:!1,shadowMode:!1})},7999:function(t,e,i){"use strict";i.r(e);var n=i("17ad"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"7afc":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{style:"display:flex;height:"+t.BoxHeight},[i("div",{staticClass:"head",class:{head_w:"1"==t.ishead_w,border:1==t.border}},[i("div",{class:{white:!t.navWhite},style:{height:t.halfWidth}}),i("div",{staticClass:"header"},[t.flag&&!t.returnFlag?i("div",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back1.apply(void 0,arguments)}}},["1"==t.ishead_w?i("img",{attrs:{src:t.back1}}):i("img",{attrs:{src:t.back}})]):t._e(),t.flag||t.returnFlag?t._e():i("img",{staticClass:"header_img",attrs:{src:t.bback},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back1.apply(void 0,arguments)}}}),i("p",{class:{title_w:"1"==t.ishead_w}},[t._v(t._s(t.title))])])])])},o=[]},"7d99":function(t,e,i){"use strict";function n(t,e){uni.setStorage({key:t,data:e,success:function(){console.log("setSuccess")}})}function a(t){var e;return uni.getStorage({key:t,success:function(t){e=t.data,console.log("getSuccess")}}),e}function o(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(e,"__esModule",{value:!0}),e.setStorage=n,e.getStorage=a,e.removeStorage=o},"828e":function(t,e,i){"use strict";i("c975"),i("13d5"),i("4d63"),i("ac1f"),i("25f0"),i("466d"),i("5319"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,a=/^<\/([-A-Za-z0-9_]+)[^>]*>/,o=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,r=b("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),s=b("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),c=b("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),l=b("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),d=b("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),u=b("script,style");function f(t,e){var i,f,b,h=[],g=t;h.last=function(){return this[this.length-1]};while(t){if(f=!0,h.last()&&u[h.last()])t=t.replace(new RegExp("([\\s\\S]*?)</"+h.last()+"[^>]*>"),(function(t,i){return i=i.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,"$1$2"),e.chars&&e.chars(i),""})),m("",h.last());else if(0==t.indexOf("\x3c!--")?(i=t.indexOf("--\x3e"),i>=0&&(e.comment&&e.comment(t.substring(4,i)),t=t.substring(i+3),f=!1)):0==t.indexOf("</")?(b=t.match(a),b&&(t=t.substring(b[0].length),b[0].replace(a,m),f=!1)):0==t.indexOf("<")&&(b=t.match(n),b&&(t=t.substring(b[0].length),b[0].replace(n,v),f=!1)),f){i=t.indexOf("<");var p=i<0?t:t.substring(0,i);t=i<0?"":t.substring(i),e.chars&&e.chars(p)}if(t==g)throw"Parse Error: "+t;g=t}function v(t,i,n,a){if(i=i.toLowerCase(),s[i])while(h.last()&&c[h.last()])m("",h.last());if(l[i]&&h.last()==i&&m("",i),a=r[i]||!!a,a||h.push(i),e.start){var u=[];n.replace(o,(function(t,e){var i=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:d[e]?e:"";u.push({name:e,value:i,escaped:i.replace(/(^|[^\\])"/g,'$1\\"')})})),e.start&&e.start(i,u,a)}}function m(t,i){if(i){for(n=h.length-1;n>=0;n--)if(h[n]==i)break}else var n=0;if(n>=0){for(var a=h.length-1;a>=n;a--)e.end&&e.end(h[a]);h.length=n}}m()}function b(t){for(var e={},i=t.split(","),n=0;n<i.length;n++)e[i[n]]=!0;return e}function h(t){return t.replace(/<\?xml.*\?>\n/,"").replace(/<!doctype.*>\n/,"").replace(/<!DOCTYPE.*>\n/,"")}function g(t){return t.reduce((function(t,e){var i=e.value,n=e.name;return t[n]?t[n]=t[n]+" "+i:t[n]=i,t}),{})}function p(t){t=h(t);var e=[],i={node:"root",children:[]};return f(t,{start:function(t,n,a){var o={name:t};if(0!==n.length&&(o.attrs=g(n)),a){var r=e[0]||i;r.children||(r.children=[]),r.children.push(o)}else e.unshift(o)},end:function(t){var n=e.shift();if(n.name!==t&&console.error("invalid state: mismatch end tag"),0===e.length)i.children.push(n);else{var a=e[0];a.children||(a.children=[]),a.children.push(n)}},chars:function(t){var n={type:"text",text:t};if(0===e.length)i.children.push(n);else{var a=e[0];a.children||(a.children=[]),a.children.push(n)}},comment:function(t){var i={node:"comment",text:t},n=e[0];n.children||(n.children=[]),n.children.push(i)}}),i.children}var v=p;e.default=v},8759:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.ruleModal[data-v-0d0a11e5]{position:fixed;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.6);z-index:9999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ruleModal-content[data-v-0d0a11e5]{width:%?520?%;height:%?720?%;background-color:#fff;border-radius:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.ruleModal-content-header[data-v-0d0a11e5]{color:#020202;font-weight:700;font-size:%?30?%;text-align:center;padding-top:%?39?%;padding-bottom:%?34?%}.ruleModal-content-body[data-v-0d0a11e5]{padding:%?0?% %?29?%;margin-bottom:%?15?%;font-size:%?24?%;color:#666;-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow-y:scroll;box-sizing:border-box;word-wrap:break-word}.ruleModal-content-footer[data-v-0d0a11e5]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-bottom:%?40?%}.ruleModal-content-footer .foobtn[data-v-0d0a11e5]{width:%?240?%;height:%?70?%;border-radius:%?8?%;border:%?2?% solid #242424;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.ruleModal-content-footer .foobtn uni-text[data-v-0d0a11e5]{color:#020202;font-size:%?30?%;font-weight:500}',""]),t.exports=e},8918:function(t,e,i){"use strict";var n=i("f6b3"),a=i.n(n);a.a},"89fa":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".border[data-v-4b3c7e46]{border-bottom:0 solid #eee!important}.head[data-v-4b3c7e46]{position:fixed;left:0;top:0;background-color:#fff!important;width:100%;z-index:9999}.head .white[data-v-4b3c7e46]{background:#fff}.header[data-v-4b3c7e46]{background-color:#fff;width:100%;height:%?88?%;border-bottom:1px solid #eee;color:#020202;font-size:%?40?%}.header img[data-v-4b3c7e46]{position:absolute;top:%?26?%;left:%?20?%;width:%?24?%;height:%?36?%}.header a[data-v-4b3c7e46]{position:absolute;width:%?36?%;height:%?36?%;border-radius:50%}.header_img[data-v-4b3c7e46]{top:%?46?%!important;left:%?10?%!important;width:%?64?%!important;height:%?64?%!important}.header p[data-v-4b3c7e46]{text-align:center;width:100%;height:100%;line-height:%?88?%;color:#020202;font-size:%?32?%}.header>div[data-v-4b3c7e46]{height:%?88?%;width:%?160?%;position:absolute;z-index:9999}.head_w[data-v-4b3c7e46]{background:transparent;border-bottom:0}.title_w[data-v-4b3c7e46]{color:#fff!important}",""]),t.exports=e},b7cc:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container",style:"background-image:url("+t.kill_bg+")"},[i("div",{staticStyle:{position:"relative"}},[i("heads",{attrs:{title:t.title}}),i("div",{staticClass:"seckill_disc",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._toGradeUse(!0)}}},[i("v-uni-image",{staticClass:"seckill_rule",attrs:{src:t.seckill_rule}}),i("p",[t._v("秒杀规则")])],1)],1),i("v-uni-scroll-view",{attrs:{"scroll-x":"true","scroll-into-view":t.scroll_index,"scroll-with-animation":"true"}},[i("ul",{staticClass:"title_list",style:"width:"+(20*t.t_list.length||100)+"vw"},t._l(t.t_list,(function(e,n){return i("li",{key:n,class:{active:n==t.t_index},attrs:{id:"scroll_"+n},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t._change(n,e)}}},[i("span",[t._v(t._s(e.title))]),1==e.type?i("span",{staticClass:"new_1"},[t._v("抢购中")]):2==e.type?i("span",{staticClass:"new_2"},[t._v("即将开抢")]):0==e.type?i("span",{staticClass:"new_2"},[t._v("已结束")]):t._e()])})),0)]),i("v-uni-view",{staticClass:"content-ul"},[i("v-uni-view",{staticClass:"content-ul-li content-ul-li-head p-s d-f a-c j-sb"},[i("v-uni-text",[t._v(t._s(0===t.type?"秒杀已结束":1===t.type?"抢购中，先抢先得":2===t.type?"即将开抢，先抢先得":"秒杀已结束"))]),i("v-uni-view",{staticClass:"time-box"},[i("v-uni-text",[t._v(t._s(0===t.type?"":1===t.type?"抢购中":2===t.type?"距开始":"已结束"))]),0!==t.type?[i("v-uni-text",[t._v(t._s(t.time.hours||"00")+":")]),i("v-uni-text",[t._v(t._s(t.time.minutes||"00")+":")]),i("v-uni-text",[t._v(t._s(t.time.seconds||"00"))])]:t._e()],2)],1),t.list.length?t._l(t.list,(function(e,n){return i("v-uni-view",{key:n,staticClass:"content-ul-li item d-f a-c"},[i("v-uni-image",{staticClass:"item-img",attrs:{src:e.imgurl||""}}),i("v-uni-view",{staticClass:"item-body"},[i("v-uni-view",{staticClass:"item-body-title "},[t._v(t._s(e.product_title||e.pro_id))]),i("v-uni-view",[i("v-uni-text",{staticClass:"item-progress"},[i("v-uni-text",{staticClass:"item-progress-text",style:e.progress}),i("v-uni-text",{staticClass:"item-progress-title"},[t._v(t._s(e.per)+"%")])],1),i("v-uni-text",{staticClass:"item-num"},[t._v("已抢"),i("v-uni-text",{staticStyle:{color:"#FF3333"}},[t._v(t._s(e.max_num-e.num))]),t._v("件")],1)],1),i("v-uni-view",{staticClass:"d-f j-sb a-c"},[i("v-uni-view",{},[i("v-uni-view",{staticClass:"a-money"},[t._v("￥"+t._s(e.seconds_price||0))]),i("v-uni-view",{staticClass:"b-money"},[t._v("￥"+t._s(e.price||0))])],1),1===e.type?i("v-uni-view",{staticClass:"o-btn d-f j-c a-c",class:{jg:100===e.per},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t._go_details(e)}}},[t._v("立即抢购")]):t._e(),0===e.type?i("v-uni-view",{staticClass:"o-btn d-f j-c a-c jg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t._go_details(e)}}},[t._v("已结束")]):t._e(),2===e.type?i("v-uni-view",{staticClass:"o-btn d-f j-c a-c jg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t._go_details(e)}}},[t._v("即将开抢")]):t._e()],1)],1)],1)})):[i("v-uni-view",{staticClass:"content-ul-li ul-li-empty d-f a-c j-c fd-c"},[i("v-uni-image",{attrs:{src:t.empty_bg}}),i("v-uni-view",[t._v("该时段暂无秒杀商品哦~")])],1)]],2),i("ruleModal",{attrs:{title:"使用规则",details:t.content},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._toGradeUse.apply(void 0,arguments)}},model:{value:t.isShow,callback:function(e){t.isShow=e},expression:"isShow"}})],1)},o=[]},c97e:function(t,e,i){"use strict";i.r(e);var n=i("e988"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},e988:function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("c975"),i("d3b7"),i("e25e"),i("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5530")),o=n(i("4eb3")),r=n(i("139f")),s=n(i("828e")),c=i("d5da"),l=i("2f62"),d={data:function(){return{title:"限时秒杀",access_id:"",t_list:[],type:0,kill_bg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/kill_bg.png",seckill_rule:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/seckill_rule.png",empty_bg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/emptybg.png",t_index:0,page:1,list:[],id:"",navType:0,scroll_index:"scroll_0",isShow:!1,content:"",rule:"",time:{hours:"00",minutes:"00",seconds:"00"}}},onLoad:function(t){var e=this;e.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):e.$store.state.access_id,e._axios(e.id),clearInterval(this.Intervalid)},onShow:function(){},computed:{halfWidth:function(){console.log(5);var t=uni.getStorageSync("data_height")?uni.getStorageSync("data_height"):this.$store.state.data_height,e=parseInt(t),i=2*e;return uni.upx2px(i)+"px"}},components:{Heads:o.default,ruleModal:r.default},onUnload:function(){clearInterval(this.Intervalid)},watch:{},methods:(0,a.default)((0,a.default)({},(0,l.mapMutations)({setseckilldata:"setseckilldata"})),{},{timeFun:function(t,e){var i=(0,c.getTimeDiff)(t);this.time.hours=i.hours,this.time.minutes=i.minutes,-1===i.seconds.toString().indexOf("-")||1!==e.type&&2!==e.type?(this.time.seconds=i.seconds,this.time=this.time):this._axios()},setCountDown:function(t){var e=this;clearInterval(this.Intervalid);var i=(new Date).getFullYear(),n=(new Date).getMonth()+1,a=(new Date).getDate(),o="";o=2==t.type?"".concat(i,"-").concat(n,"-").concat(a," ").concat(t.starttime):"".concat(i,"-").concat(n,"-").concat(a," ").concat(t.endtime),this.timeFun(o,t),this.Intervalid=setInterval((function(){e.timeFun(o,t)}),1200)},_axios:function(t){var e=this,i=this,n={access_id:this.access_id,module:"app",action:"seckill",m:"seckillhome",page:i.page,id:t};this.$req.post({data:n}).then((function(n){var a=n.code,o=n.list,r=n.rule,s=n.time_list,c=n.msg;if(200!==a)uni.showToast({title:n.message||c,duration:1500,icon:"none"});else{if(e.content=r,e.list=o,e.rule=r,o.length)for(var l in o){o[l].progress=i._progress(o[l]);var d=100-parseInt((o[l].max_num-o[l].num)/o[l].max_num*100);o[l].per=d}if(!t){e.t_list=s;for(var u=function(t){if(1==i.t_list[t].type)return setTimeout((function(){i._change(t,i.t_list[t])}),100),{v:void 0}},f=0;f<i.t_list.length;f++){var b=u(f);if("object"===typeof b)return b.v}i._change(0,i.t_list[0])}}}))},_go_details:function(t){if(t.num<=0)return uni.showToast({title:"手速慢了哦，已经被抢完了！",icon:"none"}),!1;this.setseckilldata(t),uni.navigateTo({url:"../seckill/seckill_detail?pro_id="+t.pro_id+"&navType="+t.type+"&id="+t.id})},_change:function(t,e){var i=this;i.t_index=t,1==e.type?i.navType=0:2==e.type&&(i.navType=1),i.setCountDown(e),i.type=e.type,i.id=e.id,i._axios(i.id),i.scroll_index="scroll_"+t},_remind:function(t){t.setremind=1==t.setremind?0:1;var e={access_id:this.access_id,module:"app",action:"seckill",m:"setremind",activity_id:t.activity_id,pro_id:t.pro_id,time_id:t.time_id,type:t.setremind};uni.request({data:e,url:uni.getStorageSync("url"),header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(e){console.log(e),200!=e.data.code&&(t.setremind=1==t.setremind?0:1),uni.showToast({title:e.data.message,duration:1500,icon:"none"})},error:function(t){console.log(t)}})},_remain_time:function(t,e){var i=t.lefttime,n="0",a="0";return i>60&&(n=parseInt(i/60),i=parseInt(i%60),n>60&&(a=parseInt(n/60),n=parseInt(n%60))),1==e?a<10?"0"+a:a:2==e?n<10?"0"+n:n:3==e?i<10?"0"+i:i:void 0},_progress:function(t){var e=100-parseInt((t.max_num-t.num)/t.max_num*100);return"width:".concat(e,"%")},_setTime:function(){var t=this;clearTimeout(t.settime),t.settime=setTimeout((function(){for(var e=0;e<t.list.length;e++)t.list[e].lefttime>0&&(t.list[e].lefttime--,t.list[e].count_hour=t._remain_time(t.list[e],1),t.list[e].count_min=t._remain_time(t.list[e],2),t.list[e].count_s=t._remain_time(t.list[e],3),t.list[e].progress=t._progress(t.list[e])),0==t.list[e].lefttime&&t._axios(t.id);t._setTime()}),1e3)},_toGradeUse:function(t){var e=this;t?(this.content=(0,s.default)(e.rule),this.isShow=!this.isShow):this.isShow=!this.isShow}})};e.default=d},ed23:function(t,e,i){"use strict";i.r(e);var n=i("b7cc"),a=i("c97e");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("1571");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"db43d9ce",null,!1,n["a"],r);e["default"]=c.exports},f60a:function(t,e,i){"use strict";i.r(e);var n=i("f894"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},f6b3:function(t,e,i){var n=i("89fa");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("45e446d7",n,!0,{sourceMap:!1,shadowMode:!1})},f894:function(t,e,i){"use strict";var n=i("4ea4");i("a9e3"),i("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5530")),o=i("2f62"),r=i("7d99"),s={data:function(){return{flag:!0,bback:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon/bback.png",back:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png"}},computed:{halfWidth:function(){var t=(0,r.getStorage)("data_height")?(0,r.getStorage)("data_height"):this.$store.state.data_height,e=parseInt(t);return e+"px"},BoxHeight:function(){var t=(0,r.getStorage)("data_height")?(0,r.getStorage)("data_height"):this.$store.state.data_height,e=0,i=parseInt(t)+uni.upx2px(88);return e=i&&i>0?i:uni.upx2px(88),e+"px"}},onLoad:function(t){console.log("header"),console.log(this.returnR)},props:["title","returnR","navWhite","returnFlag","border","ishead_w"],methods:(0,a.default)((0,a.default)({},(0,o.mapMutations)({status:"data_height"})),{},{_back:function(){this.flag=!1,console.log(this.returnR)},_back1:function(){switch(this.flag=!1,Number(this.returnR)){case 1:uni.navigateBack({delta:2});break;case 2:uni.switchTab({url:"../tabBar/shoppingCart"});break;case 3:uni.redirectTo({url:"../login/login.vue"});break;case 4:uni.navigateBack({delta:3});break;case 5:uni.redirectTo({url:"../order/myOrder"});break;case 6:uni.switchTab({url:"../../pages/tabBar/home"});break;case 7:uni.switchTab({url:"../../pages/tabBar/my"});break;case 8:uni.switchTab({url:"../tabBar/my"});break;case 9:uni.redirectTo({url:"/pagesA/myStore/myStore"});break;default:getCurrentPages().length>1?uni.navigateBack({delta:1}):uni.switchTab({url:"/pages/tabBar/home"})}this.flag=!0}})};e.default=s},fa55:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".container[data-v-db43d9ce]{background-repeat:no-repeat;background-size:100% %?330?%;background-color:#f6f6f6;min-height:100vh}.title_list[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?30?% 0}.title_list li[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:25vw;min-width:25vw;color:#c6c6c6;text-align:center;font-size:%?30?%;line-height:%?60?%}.title_list li.active[data-v-db43d9ce]{position:relative;color:#fffefe;font-size:%?35?%;font-weight:700}.title_list li.active .new_2[data-v-db43d9ce]{color:#fff}\r\n\r\n/* .title_list li.active:after{\r\n\t\tcontent: '';\r\n\t\tposition: absolute;\r\n\t\tbottom: 0;\r\n\t\tleft: 50%;\r\n\t\tmargin-left: -68upx;\r\n\t\twidth: 136upx;\r\n\t\theight: 4upx;\r\n\t\tbackground: #FFFFFF;\r\n\t\tborder-radius: 2upx;\r\n\t} */.title_list li span[data-v-db43d9ce]{line-height:%?34?%;margin-bottom:%?10?%}.title_list li .new_1[data-v-db43d9ce]{width:%?86?%;height:%?30?%;line-height:%?30?%;font-size:%?22?%;color:#020202;background:#fff;border-radius:%?15?%}.title_list li .new_2[data-v-db43d9ce]{height:%?30?%;line-height:%?30?%;font-size:%?22?%;color:#b8b8b8;background:transparent}.content[data-v-db43d9ce]{padding:0 %?23?%;height:calc(100vh - %?232?%);overflow-y:scroll}.content li[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?11?% %?11?% %?21?% %?11?%;background:#fff;border-radius:%?15?%;position:relative;margin-bottom:%?20?%}.shop_img[data-v-db43d9ce]{width:%?170?%;height:%?170?%;border-radius:%?10?%;margin-right:%?43?%}.content .title[data-v-db43d9ce]{font-size:%?24?%;color:#242424;line-height:%?26?%}.content .time[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?22?%;line-height:%?30?%;color:#242424;margin:%?15?% 0;width:%?250?%}.content .time .bg[data-v-db43d9ce]{display:inline-block;width:%?34?%;height:%?30?%;line-height:%?30?%;text-align:center;background:#434343;color:#fff;font-size:%?20?%;font-weight:700;border-radius:%?5?%;margin:0 %?4?%}.qianguang_box[data-v-db43d9ce]{height:%?110?%;background:rgba(0,0,0,.3);width:%?110?%;border-radius:100%;position:absolute;left:%?44?%;color:#fff;font-size:%?28?%;line-height:%?110?%;text-align:center}.price_red[data-v-db43d9ce]{font-size:%?20?%;color:#e93536;font-weight:700}.price_red span[data-v-db43d9ce]{font-size:%?28?%;font-weight:700;display:inline-block;line-height:%?28?%}.price_hui[data-v-db43d9ce]{font-size:%?20?%;color:#888;font-weight:700;text-decoration:line-through;padding-left:%?19?%}.content .btn[data-v-db43d9ce]{position:absolute;bottom:%?49?%;right:%?31?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?131?%;height:%?42?%;border:1px solid #242424;border-radius:%?8?%;font-size:%?20?%}.content .btn1[data-v-db43d9ce]{border-color:#9a9a9a;color:#9a9a9a}.content .btn_qiangguang[data-v-db43d9ce]{position:absolute;bottom:%?49?%;right:%?31?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?131?%;height:%?42?%;border:1px solid #9a9a9a;border-radius:%?8?%;font-size:%?20?%;color:#9a9a9a}.content .btn2[data-v-db43d9ce]{background:-webkit-linear-gradient(17deg,#242527,#505153);background:linear-gradient(73deg,#242527,#505153);color:#fff}.progress[data-v-db43d9ce]{position:absolute;bottom:0;left:0;border-radius:%?5?%;height:%?10?%;\r\n\t/* background: linear-gradient(45deg,#fb3 50%, #58a 50%);\r\n\t\tbackground-size: 20upx 100%; */background-color:#4f4f4f}.seckill_disc[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;padding:0 %?30?%;height:%?88?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;\r\n\t/* color: #FFFFFF; */font-size:%?28?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;position:absolute;bottom:0;right:0;z-index:9999}.seckill_rule[data-v-db43d9ce]{width:%?33?%;height:%?33?%;margin-right:%?9?%}.kucun[data-v-db43d9ce]{font-size:%?20?%;width:%?120?%;position:absolute;right:%?30?%;bottom:%?92?%}.ml_16[data-v-db43d9ce]{margin-left:%?16?%!important}.flex_end[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end}.red[data-v-db43d9ce]{color:red!important}li.timebox[data-v-db43d9ce]{position:-webkit-sticky;position:sticky;top:0;z-index:99;margin:auto;border-radius:%?10?% %?10?% %?0?% %?0?%;border-bottom:%?2?% solid #e6e6e6;box-sizing:border-box}li.timebox>div[data-v-db43d9ce]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}li.item1[data-v-db43d9ce]{border-radius:%?0?% %?0?% %?10?% %?10?%}.timebox-title[data-v-db43d9ce]{font-size:%?24?%;font-weight:500;color:#020202}.content-ul[data-v-db43d9ce]{height:calc(100vh - %?300?%);position:relative;padding:%?0?% %?30?%;overflow-y:scroll}.content-ul-li[data-v-db43d9ce]{background-color:#fff;border-radius:%?10?%}.content-ul-li[data-v-db43d9ce]:not(:first-of-type){margin-bottom:%?20?%}.content-ul-li[data-v-db43d9ce]:nth-child(2){border-radius:%?0?% %?0?% %?20?% %?20?%}.content-ul-li-head[data-v-db43d9ce]{top:0;height:%?69?%;padding:%?0?% %?18?%;border-bottom:%?2?% solid #e6e6e6;box-sizing:border-box;background-color:#fff;border-radius:%?10?% %?10?% %?0?% %?0?%;z-index:1}.content-ul-li-head[data-v-db43d9ce]:first-child{color:#020202;font-size:%?24?%}.ul-li-empty[data-v-db43d9ce]{height:calc(90vh - %?300?%)}.ul-li-empty > uni-image[data-v-db43d9ce]{width:%?200?%;height:%?200?%}.ul-li-empty > uni-view[data-v-db43d9ce]{margin-top:%?30?%;color:#888;font-size:%?28?%;font-weight:500}.item[data-v-db43d9ce]{padding:%?30?% %?21?%}.item-body[data-v-db43d9ce]{-webkit-box-flex:1;-webkit-flex:1;flex:1;height:%?200?%;margin-left:%?27?%}.item-img[data-v-db43d9ce]{width:%?200?%;height:%?200?%}.item-body-title[data-v-db43d9ce]{color:#020202;font-size:%?28?%;font-weight:500}.item-progress[data-v-db43d9ce]{display:inline-block;width:%?200?%;border:%?2?% solid #f33;height:%?20?%;box-sizing:border-box;position:relative;border-radius:%?90?%}.item-progress-text[data-v-db43d9ce]{height:%?16?%;left:0;border-radius:%?90?%;position:absolute;background:#ffdede}.item-progress-title[data-v-db43d9ce]{position:absolute;top:50%;left:50%;color:#f33;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:%?20?%}.item-num[data-v-db43d9ce]{margin-left:%?14?%;color:#888;font-size:%?24?%}.a-money[data-v-db43d9ce]{font-size:%?30?%;color:#f33;font-weight:700}.b-money[data-v-db43d9ce]{font-size:%?24?%;color:#999;text-decoration:line-through}.p-s[data-v-db43d9ce]{position:-webkit-sticky;position:sticky}.d-f[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex}.a-c[data-v-db43d9ce]{-webkit-box-align:center;-webkit-align-items:center;align-items:center}.j-sb[data-v-db43d9ce]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.j-c[data-v-db43d9ce]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.fd-c[data-v-db43d9ce]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.o-btn[data-v-db43d9ce]{width:%?190?%;height:%?70?%;border:%?2?% solid #020202;border-radius:%?6?%}.time-box uni-text[data-v-db43d9ce]:first-of-type{font-size:%?24?%;font-weight:500;margin-right:%?9?%;color:#666}.time-box uni-text[data-v-db43d9ce]:not(:first-of-type){font-size:%?24?%;font-weight:700;color:#f33}.seckill_disc1[data-v-db43d9ce]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;height:%?40?%}.seckill_disc1>p[data-v-db43d9ce]{font-size:%?26?%;color:#fff;margin-right:%?20?%;height:%?40?%;line-height:%?40?%}",""]),t.exports=e}}]);