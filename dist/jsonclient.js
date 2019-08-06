!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),o=n(5),i=n(4),s=n(3),a=n(2),u=n(1),c={postOptionsEnums:{Cache:r.Cache,Credentials:o.Credentials,Mode:i.Mode,Redirect:s.Redirect,Referrer:a.Referrer},defaults:{GET:u.defaults,POST:{data:{},options:{},headers:{"content-type":"application/json"}}},get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u(e,t,n)},post:function(e,t){if(0==(arguments.length<=2?0:arguments.length-2))return this.__post_data(e,t);if(5==(arguments.length<=2?0:arguments.length-2)){var n=arguments.length<=2?void 0:arguments[2],r=arguments.length<=3?void 0:arguments[3],o=arguments.length<=4?void 0:arguments[4],i=arguments.length<=5?void 0:arguments[5],s=arguments.length<=6?void 0:arguments[6];return this.__post_allArgs(e,t,n,r,o,i,s)}if(1==(arguments.length<=2?0:arguments.length-2)){var a=arguments.length<=2?void 0:arguments[2];return this.__post_options(e,t,a)}return null}};t.$json=c,Object.defineProperty(c,"__post_data",{value:function(e,t){return this.__post_options(e,t,this.defaults.POST.options)}}),Object.defineProperty(c,"__post_allArgs",{value:function(e,t,n,r,o,i,s){var a={cache:n,credentials:r,mode:o,redirect:i,referrer:s};return this.__post_options(e,t,a)}}),Object.defineProperty(c,"__post_options",{value:function(e,t,n){delete n.body,delete n.headers,delete n.method;var r={method:"POST",body:JSON.stringify(Object.assign({},this.defaults.POST.data,t)),headers:this.defaults.POST.headers},o=Object.assign({},r,n);return new Promise(function(t,n){var r=fetch(e,o);return r.then(function(e){return e.json().then(t).catch(function(){var e="Something went wrong during data inspection (data is not JSON)";return n(e),Promise.reject(e)})}),r})}})},function(e,t,n){var r;window,r=function(){var e=function(t,n,r){if(n=Object.assign({},e.defaults.qs,n||{}),r=r||{},"object"!=typeof n||null===n)throw new TypeError("'data' must be an Object");Object.values(n).forEach(function(e){var t=function(e){if("string"!=typeof e&&"number"!=typeof e)throw new TypeError("Invalid data object (elements are not all arrays of strings/numbers or strings or numbers)")};e instanceof Array?e.forEach(t):t(e)});var o=function(e){return encodeURIComponent(e.key)+"="+encodeURIComponent(e.value)},i=Object.entries(n).map(function(e){return{key:e[0],value:e[1]}}).map(function(e){return e.value instanceof Array?e.value.map(function(t){return{key:e.key,value:t}}).map(o).join("&"):o(e)}).join("&");return""!==i&&(/\?/.test(t)?/\?$/.test(t)||(i=/&$/.test(t)?i:"&"+i):i="?"+i),new Promise(function(n,o){if("string"==typeof t){var s=Object.assign({},e.defaults.options,r,{method:"GET"});s.headers=Object.assign({},e.defaults.headers,s.headers||{});var a=fetch(t+i,s);return a.then(function(e){return e.json().then(n).catch(function(){var e="Something went wrong during data inspection (data is not JSON or couldn't reach file)";return o(e),Promise.reject(e)})}),a}return"string"!=typeof t&&o("The 1st argument must be a string"),null})};return e.defaults={qs:{},options:{},headers:{"Content-Type":"application/json"}},e},e.exports=r()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.NONE="no-referrer",e.CLIENT="client"}(t.Referrer||(t.Referrer={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.FOLLOW="follow",e.MANUAL="manual",e.ERROR="error"}(t.Redirect||(t.Redirect={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.CORS="cors",e.NOCORS="no-cors",e.SAMEORIGIN="same-origin"}(t.Mode||(t.Mode={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.INCLUDE="include",e.OMIT="omit",e.SAMEORIGIN="same-origin"}(t.Credentials||(t.Credentials={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.DEFAULT="default",e.NONE="no-cache",e.RELOAD="reload",e.FORCE="force-cache",e.IFCACHED="only-if-cached"}(t.Cache||(t.Cache={}))},function(e,t,n){"use strict";n.r(t);var r,o,i=n(0);r=window,o=(()=>i.$json),r.$json=o()}]);