try{self["workbox:core:6.5.3"]&&_()}catch(t){}const t=function(t){let e=t;for(var s=arguments.length,n=new Array(s>1?s-1:0),i=1;i<s;i++)n[i-1]=arguments[i];return n.length>0&&(e+=` :: ${JSON.stringify(n)}`),e};class e extends Error{constructor(e,s){super(t(e,s)),this.name=e,this.details=s}}try{self["workbox:routing:6.5.3"]&&_()}catch(t){}const s=t=>t&&"object"==typeof t?t:{handle:t};class n{constructor(t,e,n){void 0===n&&(n="GET"),this.handler=s(e),this.match=t,this.method=n}setCatchHandler(t){this.catchHandler=s(t)}}class i extends n{constructor(t,e,s){super((e=>{let{url:s}=e;const n=t.exec(s.href);if(n&&(s.origin===location.origin||0===n.index))return n.slice(1)}),e,s)}}class r{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest(t){let{request:e,event:s}=t;const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const i=n.origin===location.origin,{params:r,route:o}=this.findMatchingRoute({event:s,request:e,sameOrigin:i,url:n});let a=o&&o.handler;const c=e.method;if(!a&&this.i.has(c)&&(a=this.i.get(c)),!a)return;let h;try{h=a.handle({url:n,request:e,event:s,params:r})}catch(t){h=Promise.reject(t)}const l=o&&o.catchHandler;return h instanceof Promise&&(this.o||l)&&(h=h.catch((async t=>{if(l)try{return await l.handle({url:n,request:e,event:s,params:r})}catch(e){e instanceof Error&&(t=e)}if(this.o)return this.o.handle({url:n,request:e,event:s});throw t}))),h}findMatchingRoute(t){let{url:e,sameOrigin:s,request:n,event:i}=t;const r=this.t.get(n.method)||[];for(const t of r){let r;const o=t.match({url:e,sameOrigin:s,request:n,event:i});if(o)return r=o,(Array.isArray(r)&&0===r.length||o.constructor===Object&&0===Object.keys(o).length||"boolean"==typeof o)&&(r=void 0),{route:t,params:r}}return{}}setDefaultHandler(t,e){void 0===e&&(e="GET"),this.i.set(e,s(t))}setCatchHandler(t){this.o=s(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this.t.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this.t.get(t.method).splice(s,1)}}let o;const a=()=>(o||(o=new r,o.addFetchListener(),o.addCacheListener()),o);const c={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=t=>[c.prefix,t,c.suffix].filter((t=>t&&t.length>0)).join("-"),l=t=>t||h(c.precache),u=t=>t||h(c.runtime);function f(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.3"]&&_()}catch(t){}function w(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:n}=t;if(!n)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class d{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async t=>{let{request:e,state:s}=t;s&&(s.originalRequest=e)},this.cachedResponseWillBeUsed=async t=>{let{event:e,state:s,cachedResponse:n}=t;if("install"===e.type&&s&&s.originalRequest&&s.originalRequest instanceof Request){const t=s.originalRequest.url;n?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return n}}}class p{constructor(t){let{precacheController:e}=t;this.cacheKeyWillBeUsed=async t=>{let{request:e,params:s}=t;const n=(null==s?void 0:s.cacheKey)||this.h.getCacheKeyForURL(e.url);return n?new Request(n,{headers:e.headers}):e},this.h=e}}let y;async function g(t,s){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new e("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},o=s?s(r):r,a=function(){if(void 0===y){const t=new Response("");if("body"in t)try{new Response(t.body),y=!0}catch(t){y=!1}y=!1}return y}()?i.body:await i.blob();return new Response(a,o)}function v(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class R{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const m=new Set;try{self["workbox:strategies:6.5.3"]&&_()}catch(t){}function q(t){return"string"==typeof t?new Request(t):t}class U{constructor(t,e){this.l={},Object.assign(this,e),this.event=e.event,this.u=t,this.p=new R,this.g=[],this.v=[...t.plugins],this.R=new Map;for(const t of this.v)this.R.set(t,{});this.event.waitUntil(this.p.promise)}async fetch(t){const{event:s}=this;let n=q(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const t=await s.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.u.fetchOptions);for(const e of this.iterateCallbacks("fetchDidSucceed"))t=await e({event:s,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:s,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=q(t);let s;const{cacheName:n,matchOptions:i}=this.u,r=await this.getCacheKey(e,"read"),o=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,o);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const n=q(t);var i;await(i=0,new Promise((t=>setTimeout(t,i))));const r=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(o=r.url,new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var o;const a=await this.m(s);if(!a)return!1;const{cacheName:c,matchOptions:h}=this.u,l=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(t,e,s,n){const i=v(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),o=await t.keys(e,r);for(const e of o)if(i===v(e.url,s))return t.match(e,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of m)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:f,newResponse:a.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.l[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=q(await t({mode:e,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(t){for(const e of this.u.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.u.plugins)if("function"==typeof e[t]){const s=this.R.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.g.push(t),t}async doneWaiting(){let t;for(;t=this.g.shift();)await t}destroy(){this.p.resolve(null)}async m(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class b{constructor(t){void 0===t&&(t={}),this.cacheName=u(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new U(this,{event:e,request:s,params:n}),r=this.q(i,s,e);return[r,this.U(r,i,s,e)]}async q(t,s,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(i=await this.L(s,t),!i||"error"===i.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:e,event:n,request:s}),i)break;if(!i)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))i=await e({event:n,request:s,response:i});return i}async U(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}class L extends b{constructor(t){void 0===t&&(t={}),t.cacheName=l(t.cacheName),super(t),this._=!1!==t.fallbackToNetwork,this.plugins.push(L.copyRedirectedCacheableResponsesPlugin)}async L(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.C(t,e):await this.O(t,e))}async O(t,s){let n;const i=s.params||{};if(!this._)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=i.integrity,r=t.integrity,o=!r||r===e;n=await s.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||e:void 0})),e&&o&&"no-cors"!==t.mode&&(this.N(),await s.cachePut(t,n.clone()))}return n}async C(t,s){this.N();const n=await s.fetch(t);if(!await s.cachePut(t,n.clone()))throw new e("bad-precaching-response",{url:t.url,status:n.status});return n}N(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==L.copyRedirectedCacheableResponsesPlugin&&(n===L.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(L.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}L.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate(t){let{response:e}=t;return!e||e.status>=400?null:e}},L.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate(t){let{response:e}=t;return e.redirected?await g(e):e}};class C{constructor(t){let{cacheName:e,plugins:s=[],fallbackToNetwork:n=!0}=void 0===t?{}:t;this.k=new Map,this.K=new Map,this.P=new Map,this.u=new L({cacheName:l(e),plugins:[...s,new p({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.u}precache(t){this.addToCacheList(t),this.T||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.T=!0)}addToCacheList(t){const s=[];for(const n of t){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:t,url:i}=w(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.k.has(i)&&this.k.get(i)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this.k.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.P.has(t)&&this.P.get(t)!==n.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:i});this.P.set(t,n.integrity)}if(this.k.set(i,t),this.K.set(i,r),s.length>0){const t=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return f(t,(async()=>{const e=new d;this.strategy.plugins.push(e);for(const[e,s]of this.k){const n=this.P.get(s),i=this.K.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return f(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.k.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.k}getCachedURLs(){return[...this.k.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.k.get(e.href)}getIntegrityForCacheKey(t){return this.P.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}let E;const O=()=>(E||(E=new C),E);class x extends n{constructor(t,e){super((s=>{let{request:n}=s;const i=t.getURLsToCacheKeys();for(const s of function(t,e){let{ignoreURLParametersMatching:s=[/^utm_/,/^fbclid$/],directoryIndex:n="index.html",cleanURLs:i=!0,urlManipulation:r}=void 0===e?{}:e;return function*(){const e=new URL(t,location.href);e.hash="",yield e.href;const o=function(t,e){void 0===e&&(e=[]);for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(e,s);if(yield o.href,n&&o.pathname.endsWith("/")){const t=new URL(o.href);t.pathname+=n,yield t.href}if(i){const t=new URL(o.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:e});for(const e of t)yield e.href}}()}(n.url,e)){const e=i.get(s);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}function N(t){const s=O();!function(t,s,r){let o;if("string"==typeof t){const e=new URL(t,location.href);o=new n((t=>{let{url:s}=t;return s.href===e.href}),s,r)}else if(t instanceof RegExp)o=new i(t,s,r);else if("function"==typeof t)o=new n(t,s,r);else{if(!(t instanceof n))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});o=t}a().registerRoute(o)}(new x(s,t))}var k;self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),k={},function(t){O().precache(t)}([{url:"/bruga-music/./index.html",revision:"04682606e789fc6a3ee8270d364c27c5"},{url:"/bruga-music/logo.png",revision:"f48ff222a92586bd00fe792ab2c4b7c1"}]),N(k),self.addEventListener("activate",(t=>{const e=l();t.waitUntil(async function(t,e){void 0===e&&(e="-precache-");const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s}(e).then((t=>{})))}));
