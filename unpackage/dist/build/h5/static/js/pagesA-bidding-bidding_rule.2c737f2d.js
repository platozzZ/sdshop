(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-bidding-bidding_rule"],{1814:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"data_h",style:{height:t.halfWidth}},[a("div",{staticClass:"data_h_h",style:{height:t.halfWidth}})]),a("div",{staticClass:"yh-ifndefMP",style:{top:t.halfWidth}},[a("div",{staticClass:"position_head",style:{top:t.halfWidth}},[t.head?a("div",{staticClass:"head"},[a("img",{staticClass:"head_img",attrs:{src:t.back1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t._back()}}}),a("p",{staticStyle:{"font-size":"32upx"}},[t._v("竞拍规则")]),a("img",{staticClass:"head_search"})]):t._e()])]),t.load?a("div",{staticClass:"load"},[a("div",[a("img",{attrs:{src:t.loadImg}}),a("p",[t._v("加载中…")])])]):t._e(),a("div",{staticStyle:{height:"88upx"}}),a("div",{staticClass:"rule_list"},[t.my_rule?a("v-uni-rich-text",{staticClass:"richtext",staticStyle:{"font-size":"14px"},attrs:{nodes:t.my_rule}}):t._e()],1)])},o=[]},"194b":function(t,e,a){"use strict";var i=a("4ea4");a("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("5530")),o=a("2f62"),r=(a("7d99"),i(a("5115")),i(a("828e"))),s={data:function(){return{fastTap:!0,loadImg:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/5-121204193R7.gif",back1:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/back2x.png",jp_rule:this.LaiKeTuiCommon.LKT_ROOT_VERSION_URL+"images/icon1/jp_rule.png",list_n:!1,head:!0,access_id:"",order:"",page:1,allLoaded:!1,autoFill:!1,bottomStatus:"",bottomPullText:"上拉加载更多...",bottomDropText:"释放更新...",loading:!1,load:!0,my_rule:""}},onLoad:function(){this.status_id=this.$store.state.head_id,this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id,console.log(this.access_id),this._axios()},computed:{halfWidth:function(){var t=uni.getStorageSync("data_height")?uni.getStorageSync("data_height"):this.$store.state.data_height,e=parseInt(t),a=2*e;return uni.upx2px(a)+"px"}},components:{},onShow:function(){this.status_id=this.$store.state.head_id,this.access_id=uni.getStorageSync("access_id")?uni.getStorageSync("access_id"):this.$store.state.access_id,this._axios()},methods:(0,n.default)({_toHome:function(){uni.switchTab({url:"../tabBar/home"})},_navigateTo:function(t,e){0==t?uni.navigateTo({url:"order?order_id="+e+"&showPay=true"}):uni.navigateTo({url:"order?order_id="+e}),this.flag=!1},_back:function(){this.flag=!1,uni.navigateBack({delta:1})},_axios:function(){var t=this,e={module:"app",action:"auction",m:"rule",access_id:this.access_id};this.$req.post({data:e}).then((function(e){t.my_rule=(0,r.default)(e.my_rule),t.load=!1}))}},(0,o.mapMutations)({order_id:"SET_ORDER_ID",address_id:"SET_ADDRESS_ID",bindding_num:"SET_BINDDING_NUM",bind_status:"SET_BIND_STATUS",bind_promise:"SET_BIND_PPOMISE",head_id:"SET_HEAD_ID"}))};e.default=s},"1b2b":function(t,e,a){"use strict";var i=a("cde9"),n=a.n(i);n.a},"22d9":function(t,e,a){var i=a("a91e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("f5be0b46",i,!0,{sourceMap:!1,shadowMode:!1})},"47ed":function(t,e,a){"use strict";a.r(e);var i=a("defa"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},5115:function(t,e,a){"use strict";a.r(e);var i=a("e53b"),n=a("47ed");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("1b2b");var r,s=a("f0c5"),d=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"3fb1f804",null,!1,i["a"],r);e["default"]=d.exports},"56d1":function(t,e,a){"use strict";a.r(e);var i=a("194b"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"7d99":function(t,e,a){"use strict";function i(t,e){uni.setStorage({key:t,data:e,success:function(){console.log("setSuccess")}})}function n(t){var e;return uni.getStorage({key:t,success:function(t){e=t.data,console.log("getSuccess")}}),e}function o(t){uni.removeStorage({key:t,success:function(t){console.log("removeSuccess")}})}Object.defineProperty(e,"__esModule",{value:!0}),e.setStorage=i,e.getStorage=n,e.removeStorage=o},"828e":function(t,e,a){"use strict";a("c975"),a("13d5"),a("4d63"),a("ac1f"),a("25f0"),a("466d"),a("5319"),a("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,n=/^<\/([-A-Za-z0-9_]+)[^>]*>/,o=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,r=h("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),s=h("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),d=h("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),c=h("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),l=h("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),u=h("script,style");function f(t,e){var a,f,h,b=[],v=t;b.last=function(){return this[this.length-1]};while(t){if(f=!0,b.last()&&u[b.last()])t=t.replace(new RegExp("([\\s\\S]*?)</"+b.last()+"[^>]*>"),(function(t,a){return a=a.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,"$1$2"),e.chars&&e.chars(a),""})),m("",b.last());else if(0==t.indexOf("\x3c!--")?(a=t.indexOf("--\x3e"),a>=0&&(e.comment&&e.comment(t.substring(4,a)),t=t.substring(a+3),f=!1)):0==t.indexOf("</")?(h=t.match(n),h&&(t=t.substring(h[0].length),h[0].replace(n,m),f=!1)):0==t.indexOf("<")&&(h=t.match(i),h&&(t=t.substring(h[0].length),h[0].replace(i,p),f=!1)),f){a=t.indexOf("<");var g=a<0?t:t.substring(0,a);t=a<0?"":t.substring(a),e.chars&&e.chars(g)}if(t==v)throw"Parse Error: "+t;v=t}function p(t,a,i,n){if(a=a.toLowerCase(),s[a])while(b.last()&&d[b.last()])m("",b.last());if(c[a]&&b.last()==a&&m("",a),n=r[a]||!!n,n||b.push(a),e.start){var u=[];i.replace(o,(function(t,e){var a=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:l[e]?e:"";u.push({name:e,value:a,escaped:a.replace(/(^|[^\\])"/g,'$1\\"')})})),e.start&&e.start(a,u,n)}}function m(t,a){if(a){for(i=b.length-1;i>=0;i--)if(b[i]==a)break}else var i=0;if(i>=0){for(var n=b.length-1;n>=i;n--)e.end&&e.end(b[n]);b.length=i}}m()}function h(t){for(var e={},a=t.split(","),i=0;i<a.length;i++)e[a[i]]=!0;return e}function b(t){return t.replace(/<\?xml.*\?>\n/,"").replace(/<!doctype.*>\n/,"").replace(/<!DOCTYPE.*>\n/,"")}function v(t){return t.reduce((function(t,e){var a=e.value,i=e.name;return t[i]?t[i]=t[i]+" "+a:t[i]=a,t}),{})}function g(t){t=b(t);var e=[],a={node:"root",children:[]};return f(t,{start:function(t,i,n){var o={name:t};if(0!==i.length&&(o.attrs=v(i)),n){var r=e[0]||a;r.children||(r.children=[]),r.children.push(o)}else e.unshift(o)},end:function(t){var i=e.shift();if(i.name!==t&&console.error("invalid state: mismatch end tag"),0===e.length)a.children.push(i);else{var n=e[0];n.children||(n.children=[]),n.children.push(i)}},chars:function(t){var i={type:"text",text:t};if(0===e.length)a.children.push(i);else{var n=e[0];n.children||(n.children=[]),n.children.push(i)}},comment:function(t){var a={node:"comment",text:t},i=e[0];i.children||(i.children=[]),i.children.push(a)}}),a.children}var p=g;e.default=p},"9c1f":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".load-more[data-v-3fb1f804]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.loading-img[data-v-3fb1f804]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-3fb1f804]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-3fb1f804]{position:absolute}.load1[data-v-3fb1f804],\n.load2[data-v-3fb1f804],\n.load3[data-v-3fb1f804]{height:24px;width:24px}.load2[data-v-3fb1f804]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-3fb1f804]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-3fb1f804]{width:6px;height:2px;border-top-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-3fb1f804 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-3fb1f804]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-3fb1f804]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-3fb1f804]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-3fb1f804]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-3fb1f804]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-3fb1f804{0%{opacity:1}100%{opacity:.2}}",""]),t.exports=e},a91e:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'.head[data-v-5506b464],\r\n.order_header[data-v-5506b464]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.head[data-v-5506b464]{height:%?88?%;padding:0 %?30?%;border-bottom:1px solid #eee;font-size:%?40?%;color:#242424}.head_img[data-v-5506b464]{width:%?24?%;height:%?36?%}.head_search[data-v-5506b464]{width:%?40?%;height:%?40?%;visibility:hidden}.order_header[data-v-5506b464]{-webkit-justify-content:space-around;justify-content:space-around;width:100%}.header_li[data-v-5506b464]{width:25%;text-align:center;height:%?84?%;line-height:%?84?%;font-size:%?30?%;color:#242424}.header_border[data-v-5506b464]{color:#242424;position:relative}.header_border[data-v-5506b464]:after{border-bottom:%?5?% solid #d30202;position:absolute;bottom:0;width:50%;content:"";left:25%}.last_right>div[data-v-5506b464]{-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.position_head[data-v-5506b464]{position:fixed;left:0;top:0;width:100%;background-color:#fff;z-index:35}.rule_img[data-v-5506b464]{width:100%;height:auto}\r\n\r\n/* 优化 */.yh-ifndefMP[data-v-5506b464]{height:%?178?%;position:fixed;background:#fff;z-index:999}',""]),t.exports=e},adcf:function(t,e,a){"use strict";a.r(e);var i=a("1814"),n=a("56d1");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("c54b");var r,s=a("f0c5"),d=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"5506b464",null,!1,i["a"],r);e["default"]=d.exports},c54b:function(t,e,a){"use strict";var i=a("22d9"),n=a.n(i);n.a},cde9:function(t,e,a){var i=a("9c1f");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("29437017",i,!0,{sourceMap:!1,shadowMode:!1})},defa:function(t,e,a){"use strict";a("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=i},e53b:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"load-more"},[a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[a("v-uni-view",{staticClass:"load1"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1),a("v-uni-view",{staticClass:"load2"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1),a("v-uni-view",{staticClass:"load3"},[a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}}),a("v-uni-view",{style:{background:t.color}})],1)],1),a("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},o=[]}}]);