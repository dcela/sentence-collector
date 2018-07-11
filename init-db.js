parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("kinto-http"),t=u(e),r=require("kinto-http/lib/bucket.js"),s=u(r),i=require("kinto-http/lib/collection.js"),o=u(i),c=require("../db.js"),a=u(c);function u(e){return e&&e.__esModule?e:{default:e}}const n="User";class l{constructor(e,t){this.id=null,this.server=e,this.bucket=t}async getId(){const e=await this.server.fetchServerInfo();this.id=e.user.id}async tryAuth(e){try{const t=await this.server.bucket(a.default.BUCKET_NAME),r=await t.collection(n),s=await r.createRecord({id:e,data:{username:e}});console.log("authed?",s)}catch(e){console.log("create error",e)}}}exports.default=l,l.COLLECTION_NAME=n;
},{"../db.js":2}],2:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("btoa"),t=c(e),s=require("kinto-http"),r=c(s),i=require("kinto-http/lib/bucket.js"),a=c(i),u=require("./collections/user"),o=c(u);function c(e){return e&&e.__esModule?e:{default:e}}const n="https://kinto.mozvoice.org/v1",h="App";class d{constructor(e,s){this.username=e,this.password=s;const i={remote:n};e&&s&&(i.headers={Authorization:"Basic "+(0,t.default)(`${e}:${s}`)}),this.server=new r.default(n,i),this.bucket=new a.default(this.server,h),this.user=new o.default(this.server,this.bucket),this.authenticated=!1}async auth(){const e=await this.user.tryAuth(this.username);return this.authenticated=e,console.log("authed?",e),e}async initDB(){try{let e=await this.user.getId();await this.server.createBucket(h);const t=await this.server.bucket(h,{permissions:{read:["system.Authenticated"]}});return await t.createCollection(o.default.COLLECTION_NAME,{permissions:{"record:create":["system.Authenticated"]}}),e}catch(e){console.error("init error",e)}}}exports.default=d,d.BUCKET_NAME=h;
},{"./collections/user":4}],1:[function(require,module,exports) {
"use strict";var e=require("../shared/js/db"),n=o(e);function o(e){return e&&e.__esModule?e:{default:e}}global.fetch=require("node-fetch");const t="admin",i="password";function r(){new n.default(t,i).initDB().then(console.log.bind(console,"database initialized")).catch(console.error.bind(console))}r();
},{"../shared/js/db":2}]},{},[1], null)
//# sourceMappingURL=/init-db.map