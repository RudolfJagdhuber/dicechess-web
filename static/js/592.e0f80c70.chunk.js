/*! For license information please see 592.e0f80c70.chunk.js.LICENSE.txt */
!function(){"use strict";var t={117:function(t,e){var r=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),c=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),l=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),p=Symbol.iterator;var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v=Object.assign,d={};function m(t,e,r){this.props=t,this.context=e,this.refs=d,this.updater=r||y}function g(){}function b(t,e,r){this.props=t,this.context=e,this.refs=d,this.updater=r||y}m.prototype.isReactComponent={},m.prototype.setState=function(t,e){if("object"!==typeof t&&"function"!==typeof t&&null!=t)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},m.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")},g.prototype=m.prototype;var w=b.prototype=new g;w.constructor=b,v(w,m.prototype),w.isPureReactComponent=!0;var x=Array.isArray,S=Object.prototype.hasOwnProperty,_={current:null},j={key:!0,ref:!0,__self:!0,__source:!0};function k(t,e,n){var o,i={},a=null,u=null;if(null!=e)for(o in void 0!==e.ref&&(u=e.ref),void 0!==e.key&&(a=""+e.key),e)S.call(e,o)&&!j.hasOwnProperty(o)&&(i[o]=e[o]);var c=arguments.length-2;if(1===c)i.children=n;else if(1<c){for(var f=Array(c),s=0;s<c;s++)f[s]=arguments[s+2];i.children=f}if(t&&t.defaultProps)for(o in c=t.defaultProps)void 0===i[o]&&(i[o]=c[o]);return{$$typeof:r,type:t,key:a,ref:u,props:i,_owner:_.current}}function E(t){return"object"===typeof t&&null!==t&&t.$$typeof===r}var L=/\/+/g;function O(t,e){return"object"===typeof t&&null!==t&&null!=t.key?function(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,(function(t){return e[t]}))}(""+t.key):e.toString(36)}function A(t,e,o,i,a){var u=typeof t;"undefined"!==u&&"boolean"!==u||(t=null);var c=!1;if(null===t)c=!0;else switch(u){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case r:case n:c=!0}}if(c)return a=a(c=t),t=""===i?"."+O(c,0):i,x(a)?(o="",null!=t&&(o=t.replace(L,"$&/")+"/"),A(a,e,o,"",(function(t){return t}))):null!=a&&(E(a)&&(a=function(t,e){return{$$typeof:r,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}(a,o+(!a.key||c&&c.key===a.key?"":(""+a.key).replace(L,"$&/")+"/")+t)),e.push(a)),1;if(c=0,i=""===i?".":i+":",x(t))for(var f=0;f<t.length;f++){var s=i+O(u=t[f],f);c+=A(u,e,o,s,a)}else if(s=function(t){return null===t||"object"!==typeof t?null:"function"===typeof(t=p&&t[p]||t["@@iterator"])?t:null}(t),"function"===typeof s)for(t=s.call(t),f=0;!(u=t.next()).done;)c+=A(u=u.value,e,o,s=i+O(u,f++),a);else if("object"===u)throw e=String(t),Error("Objects are not valid as a React child (found: "+("[object Object]"===e?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return c}function P(t,e,r){if(null==t)return t;var n=[],o=0;return A(t,n,"","",(function(t){return e.call(r,t,o++)})),n}function W(t){if(-1===t._status){var e=t._result;(e=e()).then((function(e){0!==t._status&&-1!==t._status||(t._status=1,t._result=e)}),(function(e){0!==t._status&&-1!==t._status||(t._status=2,t._result=e)})),-1===t._status&&(t._status=0,t._result=e)}if(1===t._status)return t._result.default;throw t._result}var $={current:null},I={transition:null}},791:function(t,e,r){r(117)}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",f=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(P){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),u=new L(n||[]);return i(a,"_invoke",{value:_(t,r,u)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}r.wrap=l;var p={};function y(){}function v(){}function d(){}var m={};s(m,u,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(O([])));b&&b!==n&&o.call(b,u)&&(m=b);var w=d.prototype=y.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function S(e,r){function n(i,a,u,c){var f=h(e[i],e,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==t(l)&&o.call(l,"__await")?r.resolve(l.__await).then((function(t){n("next",t,u,c)}),(function(t){n("throw",t,u,c)})):r.resolve(l).then((function(t){s.value=t,u(s)}),(function(t){return n("throw",t,u,c)}))}c(f.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return a=a?a.then(o,o):o()}})}function _(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return A()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=j(a,r);if(u){if(u===p)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function j(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function O(t){if(t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:A}}function A(){return{value:void 0,done:!0}}return v.prototype=d,i(w,"constructor",{value:d,configurable:!0}),i(d,"constructor",{value:v,configurable:!0}),v.displayName=s(d,f,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,s(t,f,"GeneratorFunction")),t.prototype=Object.create(w),t},r.awrap=function(t){return{__await:t}},x(S.prototype),s(S.prototype,c,(function(){return this})),r.AsyncIterator=S,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new S(l(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),s(w,f,"Generator"),s(w,u,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=O,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},r}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){var r="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return u=t.done,t},e:function(t){c=!0,a=t},f:function(){try{u||null==r.return||r.return()}finally{if(c)throw a}}}}function i(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(f){return void r(f)}u.done?e(c):Promise.resolve(c).then(n,o)}r(791);function a(t){function e(t){if(Object(t)!==t)return Promise.reject(new TypeError(t+" is not an object."));var e=t.done;return Promise.resolve(t.value).then((function(t){return{value:t,done:e}}))}return a=function(t){this.s=t,this.n=t.next},a.prototype={s:null,n:null,next:function(){return e(this.n.apply(this.s,arguments))},return:function(t){var r=this.s.return;return void 0===r?Promise.resolve({value:t,done:!0}):e(r.apply(this.s,arguments))},throw:function(t){var r=this.s.return;return void 0===r?Promise.reject(t):e(r.apply(this.s,arguments))}},new a(t)}var u=function(t,e){var r=function(t){return{top:t[0],right:t[1],bottom:t[2],left:t[3],opposing:t[4]}};switch(t){case-1:return r(Array(5).fill(-1));case 0:return r(Array(5).fill(0));case 1:switch(e){case 2:return r([4,5,3,2,6]);case 3:return r([2,4,5,3,6]);case 5:return r([3,2,4,5,6]);case 4:return r([5,3,2,4,6]);default:return r(Array(5).fill(-1))}case 2:switch(e){case 1:return r([3,6,4,1,5]);case 4:return r([1,3,6,4,5]);case 6:return r([4,1,3,6,5]);case 3:return r([6,4,1,3,5]);default:return r(Array(5).fill(-1))}case 3:switch(e){case 1:return r([5,6,2,1,4]);case 2:return r([1,5,6,2,4]);case 6:return r([2,1,5,6,4]);case 5:return r([6,2,1,5,4]);default:return r(Array(5).fill(-1))}case 4:switch(e){case 1:return r([2,6,5,1,3]);case 5:return r([1,2,6,5,3]);case 6:return r([5,1,2,6,3]);case 2:return r([6,5,1,2,3]);default:return r(Array(5).fill(-1))}case 5:switch(e){case 1:return r([4,6,3,1,2]);case 3:return r([1,4,6,3,2]);case 6:return r([3,1,4,6,2]);case 4:return r([6,3,1,4,2]);default:return r(Array(5).fill(-1))}case 6:switch(e){case 2:return r([3,5,4,2,1]);case 4:return r([2,3,5,4,1]);case 5:return r([4,2,3,5,1]);case 3:return r([5,4,2,3,1]);default:return r(Array(5).fill(-1))}default:return r(Array(5).fill(-1))}},c=function(t,e){var r,n,o,i,a="top"===e?t.orientation.bottom:"right"===e?t.orientation.left:"bottom"===e?t.orientation.top:"left"===e?t.orientation.right:0,c="top"===e||"bottom"===e?t.orientation.left:"right"===e?t.orientation.opposing:"left"===e?t.number:0,s=t.position+f[e];return r=a,n=c,o=s,i=t.isWhite,{number:r,orientation:u(r,n),position:o,isWhite:i}},f={top:-8,right:1,bottom:8,left:-1},s=function t(e,r,n,i,a,u){if(e.position<0||e.position>63)return u;if(0===n){var f=a[e.position];return f&&f.isWhite===e.isWhite||u.push({direction:i,endNumber:e.number,endOrientation:e.orientation,position:e.position}),u}if(a[e.position]&&i)return u;var s,l;e.position%8===0&&(r=r.filter((function(t){return"left"!==t}))),e.position%8===7&&(r=r.filter((function(t){return"right"!==t})));var h,p=o(r);try{var y=function(){var o=h.value,f=null!==i&&void 0!==i?i:o;s=c(e,o),l=r,"top"===o?l=l.filter((function(t){return"bottom"!==t})):"bottom"===o?l=l.filter((function(t){return"top"!==t})):"left"===o?l=l.filter((function(t){return"right"!==t})):"right"===o&&(l=l.filter((function(t){return"left"!==t}))),f!==o&&(l=l.filter((function(t){return t===o}))),u=t(s,l,n-1,f,a,u)};for(p.s();!(h=p.n()).done;)y()}catch(v){p.e(v)}finally{p.f()}return u},l=function(t,e){return s(t,["top","right","bottom","left"],0===t.number?1:t.number,void 0,e,[])},h=function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2,i=p(e);return i.forEach((function(i,a){var u=y(e,i);if(n===o)i.rating=(r?1:-1)*v(u);else if(0===u.filter((function(t){return t&&0===t.number&&t.isWhite===!r})).length)i.rating=1e3;else{var c=t(u,!r,n+1,o);i.rating=c[0].rating}})),i.sort((function(t,e){return t.rating&&e.rating?e.rating-t.rating:0})),i.forEach((function(t){t.rating&&(t.rating=-1*t.rating)})),i},p=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t.filter((function(t){return t&&t.isWhite===e})).flatMap((function(e){return e?l(e,t).map((function(t){return{dice:e,move:t}})):[]}))},y=function(t,e){var r=t.slice(),n={isWhite:e.dice.isWhite,number:e.move.endNumber,position:e.move.position,orientation:e.move.endOrientation};return r[e.dice.position]=void 0,r[e.move.position]=n,r},v=function(t){var e=0,r=t.filter((function(t){return t&&0===t.number}));if(r.length<2&&r[0])return r[0].isWhite?1e3:-1e3;if(!r[0]||!r[1])return-7777;e+=t.filter((function(t){return t&&t.isWhite})).length-t.filter((function(t){return t&&!t.isWhite})).length;var n=p(t,!0),o=p(t,!1);e+=.1*(n.length-o.length);var i=r[0].isWhite?r[0].position:r[1].position,a=r[0].isWhite?r[1].position:r[0].position,u=o.filter((function(t){return t.move.position===i})).length>0,c=n.filter((function(t){return t.move.position===a})).length>0;return e+=c?.4:u?-.4:0,o.filter((function(t){return 0===t.dice.number})).forEach((function(t){n.filter((function(e){return e.move.position===t.move.position})).length>0&&(e+=.3)})),n.filter((function(t){return 0===t.dice.number})).forEach((function(t){o.filter((function(e){return e.move.position===t.move.position})).length>0&&(e-=.3)})),e};!function(t,r){self.onmessage=function(){var n,u=(n=e().mark((function n(i){var u,c,f,s,l,h,p,y,v;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(u=t(i.data))||!u[Symbol.asyncIterator]){e.next=30;break}f=!1,s=!1,e.prev=3,h=function(t){var e,r,n,o=2;for("undefined"!=typeof Symbol&&(r=Symbol.asyncIterator,n=Symbol.iterator);o--;){if(r&&null!=(e=t[r]))return e.call(t);if(n&&null!=(e=t[n]))return new a(e.call(t));r="@@asyncIterator",n="@@iterator"}throw new TypeError("Object is not async iterable")}(u);case 5:return e.next=7,h.next();case 7:if(!(f=!(l=e.sent).done)){e.next=12;break}self.postMessage(l.value,null==r?void 0:r());case 9:f=!1,e.next=5;break;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),s=!0,c=e.t0;case 17:if(e.prev=17,e.prev=18,e.t1=f&&null!=h.return,!e.t1){e.next=23;break}return e.next=23,h.return();case 23:if(e.prev=23,!s){e.next=26;break}throw c;case 26:return e.finish(23);case 27:return e.finish(17);case 28:e.next=41;break;case 30:if(!u||!u[Symbol.iterator]){e.next=35;break}p=o(u);try{for(p.s();!(y=p.n()).done;)v=y.value,self.postMessage(v,null==r?void 0:r())}catch(n){p.e(n)}finally{p.f()}e.next=41;break;case 35:return e.t2=self,e.next=38,u;case 38:e.t3=e.sent,e.t4=null==r?void 0:r(),e.t2.postMessage.call(e.t2,e.t3,e.t4);case 41:case"end":return e.stop()}}),n,null,[[3,14,17,28],[18,,23,27]])})),function(){var t=this,e=arguments;return new Promise((function(r,o){var a=n.apply(t,e);function u(t){i(a,r,o,u,c,"next",t)}function c(t){i(a,r,o,u,c,"throw",t)}u(void 0)}))});return function(t){return u.apply(this,arguments)}}()}((function(t){if(!t)return{result:[]};var e=h(t.board,t.isWhitesMove,t.currentDepth,t.maxDepth);return console.log("Proposed a move!"),{result:e}}))}()}();
//# sourceMappingURL=592.e0f80c70.chunk.js.map