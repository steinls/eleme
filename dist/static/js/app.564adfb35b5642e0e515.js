webpackJsonp([5],{0:function(t,e){},"34KM":function(t,e){},"8QP9":function(t,e){},BDRl:function(t,e,s){"use strict";var i={props:{type:{type:Number,default:0},size:{type:Number,default:0}},data:function(){return{brandMap:["decrease","discount","special","invoice","guarantee"],sizeArr:["brand-map-small","brand-map-big"]}},computed:{brandClass:function(){return this.brandMap[this.type]+(0===this.size?"_1":"_2")},sizeClass:function(){return this.sizeArr[this.size]}}},a={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"brand-map",class:[this.brandClass,this.sizeClass]})},staticRenderFns:[]};var n=s("C7Lr")(i,a,!1,function(t){s("8QP9")},null,null);e.a=n.exports},HgIR:function(t,e){},"JY/S":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("briU"),s("y5uh");var i=s("EqYI"),a=s("T452"),n=s("NVrd"),r=s("BDRl"),l={data:function(){return{offerDetail:!1,supprts:["decrease","discount","special","invoice","guarantee"]}},props:{seller:{type:Object}},methods:{showOfferDetail:function(){this.offerDetail=!0},hideOfferDetail:function(){this.offerDetail=!1}},components:{Star:n.a,BrandMap:r.a}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"bg"},[s("img",{attrs:{src:t.seller.avatar,alt:""}})]),t._v(" "),s("div",{staticClass:"top"},[s("div",{staticClass:"content-wrap"},[s("div",{staticClass:"content"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:t.seller.avatar,alt:""}})]),t._v(" "),s("div",{staticClass:"massage"},[s("div",{staticClass:"name"},[s("div",{staticClass:"brand"}),t._v(" "),s("div",{staticClass:"text"},[t._v("\n              "+t._s(t.seller.name)+"\n            ")])]),t._v(" "),s("div",{staticClass:"time"},[t._v("\n            "+t._s(t.seller.description)+" / "+t._s(t.seller.deliveryTime)+" 分钟送达\n          ")]),t._v(" "),t.seller.supports?s("div",{staticClass:"offer"},[s("brand-map"),t._v(" "),s("div",{staticClass:"text"},[t._v("\n              "+t._s(t.seller.supports[0].description)+"\n            ")])],1):t._e(),t._v(" "),t.seller.supports?s("span",{staticClass:"offer-count",on:{click:t.showOfferDetail}},[t._v("\n            "+t._s(t.seller.supports.length)+"个\n            "),s("span",{staticClass:"icon icon-keyboard_arrow_right"})]):t._e()])])]),t._v(" "),s("div",{staticClass:"info",on:{click:t.showOfferDetail}},[s("div",{staticClass:"bulletin"}),t._v(" "),s("div",{staticClass:"text"},[t._v("\n        "+t._s(t.seller.bulletin)+"\n      ")]),t._v(" "),s("span",{staticClass:"icon icon-keyboard_arrow_right"})])]),t._v(" "),s("transition",{attrs:{name:"fade"}},[t.offerDetail?s("div",{staticClass:"sheet"},[s("div",{staticClass:"detail"},[s("div",{staticClass:"name"},[t._v(t._s(t.seller.name))]),t._v(" "),s("star",{attrs:{number:t.seller.score,type:3}}),t._v(" "),t.seller.supports?s("div",{staticClass:"supprts-wrap"},[s("div",{staticClass:"title-wrap"},[s("div",{staticClass:"title"},[t._v("\n              优惠信息\n            ")])]),t._v(" "),s("ul",{staticClass:"supprts"},t._l(t.seller.supports,function(e,i){return s("li",{key:i,staticClass:"supprts-item"},[s("brand-map",{attrs:{type:e.type,size:1}}),t._v(" "),s("div",{staticClass:"text"},[t._v(t._s(e.description))])],1)}),0)]):t._e(),t._v(" "),s("div",{staticClass:"m-header-seller"},[s("div",{staticClass:"title-wrap"},[s("div",{staticClass:"title"},[t._v("\n              商家公告\n            ")])]),t._v(" "),s("div",{staticClass:"seller-bulletin"},[t._v("\n            "+t._s(t.seller.bulletin)+"\n          ")])])],1),t._v(" "),s("div",{staticClass:"close"},[s("i",{staticClass:"icon icon-close",on:{click:t.hideOfferDetail}})])]):t._e()])],1)},staticRenderFns:[]};var o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tab"},[e("div",{staticClass:"state"}),this._v(" "),e("router-link",{staticClass:"tab-item",attrs:{tag:"div",to:"/goods"}},[e("span",[this._v("商品")])]),this._v(" "),e("router-link",{staticClass:"tab-item",attrs:{tag:"div",to:"/seller"}},[e("span",[this._v("商家")])]),this._v(" "),e("router-link",{staticClass:"tab-item",attrs:{tag:"div",to:"/ratings"}},[e("span",[this._v("评价")])])],1)},staticRenderFns:[]};var u={name:"App",data:function(){return{seller:{}}},created:function(){var t=this;this.$http.get("/api/seller").then(function(e){var s=e.body;s.errno===a.a&&(t.seller=s.data)})},components:{MHeader:s("C7Lr")(l,c,!1,function(t){s("HgIR")},null,null).exports,Tab:s("C7Lr")({data:function(){return{}}},o,!1,function(t){s("p7yE")},null,null).exports}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("m-header",{attrs:{seller:this.seller}}),this._v(" "),e("tab"),this._v(" "),e("keep-alive",[e("router-view",{attrs:{seller:this.seller}})],1)],1)},staticRenderFns:[]};var p=s("C7Lr")(u,d,!1,function(t){s("JY/S")},null,null).exports,v=s("7LQH");i.a.use(v.a);var f=new v.a({routes:[{path:"/",redirect:"/goods"},{path:"/seller",component:function(){return Promise.all([s.e(0),s.e(3)]).then(s.bind(null,"mpvN"))}},{path:"/goods",component:function(){return Promise.all([s.e(0),s.e(1)]).then(s.bind(null,"Uz4t"))}},{path:"/ratings",component:function(){return Promise.all([s.e(0),s.e(2)]).then(s.bind(null,"7kbm"))}}]}),h=(s("34KM"),s("iDdd")),m=s.n(h),_=s("hs12"),C=s("OolZ");i.a.config.productionTip=!1,m.a.attach(document.body),i.a.use(_.a,{loading:"static/loading/loading.png"}),i.a.use(C.a),new i.a({el:"#app",router:f,render:function(t){return t(p)}})},NVrd:function(t,e,s){"use strict";var i={props:{number:{type:Number},type:{type:Number}},computed:{classType:function(){return 1===this.type?"star-small":2===this.type?"star-middle":"star-big"},classArr:function(){for(var t=Math.floor(2*this.number)/2,e=t%1!=0,s=[],i=0;i<5;i++)i<t?s.push("star-on"):i===t+1&&e?s.push("star-half"):s.push("star-off");return s}}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"star-wrap",class:this.classType},this._l(this.classArr,function(t,s){return e("span",{key:s,staticClass:"star",class:t})}),0)},staticRenderFns:[]};var n=s("C7Lr")(i,a,!1,function(t){s("vl40")},null,null);e.a=n.exports},T452:function(t,e,s){"use strict";s.d(e,"a",function(){return i});var i=0},p7yE:function(t,e){},vl40:function(t,e){},y5uh:function(t,e){var s,i,a,n,r,l;window.mobileUtil=(s=window,i=document,a=navigator.userAgent,n=/android|adr/gi.test(a),r=/iphone|ipod|ipad/gi.test(a)&&!n,{isAndroid:n,isIos:r,isMobile:l=n||r,isNewsApp:/NewsApp\/[\d\.]+/gi.test(a),isWeixin:/MicroMessenger/gi.test(a),isQQ:/QQ\/\d/gi.test(a),isYixin:/YiXin/gi.test(a),isWeibo:/Weibo/gi.test(a),isTXWeibo:/T(?:X|encent)MicroBlog/gi.test(a),tapEvent:l?"tap":"click",fixScreen:function(){var t=i.querySelector('meta[name="viewport"]'),e=t?t.content:"",a=e.match(/initial\-scale=([\d\.]+)/),n=e.match(/width=([^,\s]+)/);if(t){if(l&&!a&&n&&"device-width"!=n[1]){var c=parseInt(n[1]),o=s.innerWidth||c,u=s.outerWidth||o,d=s.screen.width||o,p=s.screen.availWidth||o,v=s.innerHeight||c,f=s.outerHeight||v,h=s.screen.height||v,m=s.screen.availHeight||v;(w=Math.min(o,u,d,p,v,f,h,m)/c)<1&&(t.content=e+","+x(w))}}else{var _,C=i.documentElement,b=C.dataset.mw||750,g=r?Math.min(s.devicePixelRatio,3):1,w=1/g;C.removeAttribute("data-mw"),C.dataset.dpr=g,(t=i.createElement("meta")).name="viewport",t.content=x(w),C.firstElementChild.appendChild(t);var y=function(){var t=C.getBoundingClientRect().width;t/g>b&&(t=b*g);var e=t/16;C.style.fontSize=e+"px"};s.addEventListener("resize",function(){clearTimeout(_),_=setTimeout(y,300)},!1),s.addEventListener("pageshow",function(t){t.persisted&&(clearTimeout(_),_=setTimeout(y,300))},!1),y()}function x(t){return"initial-scale="+t+",maximum-scale="+t+",minimum-scale="+t+",user-scalable=no"}},getSearch:function(t){t=t||s.location.search;var e={},i=new RegExp("([^?=&]+)(=([^&]*))?","g");return t&&t.replace(i,function(t,s,i,a){e[s]=a}),e}}),mobileUtil.fixScreen()}},["NHnr"]);
//# sourceMappingURL=app.564adfb35b5642e0e515.js.map