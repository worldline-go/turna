var he=Object.defineProperty;var me=(e,t,n)=>t in e?he(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Et=(e,t,n)=>me(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function M(){}const ge=e=>e;function ht(e,t){for(const n in t)e[n]=t[n];return e}function Zt(e){return e()}function qt(){return Object.create(null)}function W(e){e.forEach(Zt)}function j(e){return typeof e=="function"}function F(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function _e(e){return Object.keys(e).length===0}function Mt(e,...t){if(e==null){for(const r of t)r(void 0);return M}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function ye(e){let t;return Mt(e,n=>t=n)(),t}function Ct(e,t,n){e.$$.on_destroy.push(Mt(t,n))}function Tt(e){return e??""}function we(e){return e&&j(e.destroy)?e.destroy:M}const Kt=typeof window<"u";let be=Kt?()=>window.performance.now():()=>Date.now(),Pt=Kt?e=>requestAnimationFrame(e):M;const Z=new Set;function Vt(e){Z.forEach(t=>{t.c(e)||(Z.delete(t),t.f())}),Z.size!==0&&Pt(Vt)}function ve(e){let t;return Z.size===0&&Pt(Vt),{promise:new Promise(n=>{Z.add(t={c:e,f:n})}),abort(){Z.delete(t)}}}function E(e,t){e.appendChild(t)}function jt(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function $e(e){const t=C("style");return t.textContent="/* empty */",Ee(jt(e),t),t.sheet}function Ee(e,t){return E(e.head||e,t),t.sheet}function x(e,t,n){e.insertBefore(t,n||null)}function O(e){e.parentNode&&e.parentNode.removeChild(e)}function C(e){return document.createElement(e)}function xt(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function it(e){return document.createTextNode(e)}function R(){return it(" ")}function Lt(){return it("")}function mt(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function zt(e){return function(t){return t.preventDefault(),e.call(this,t)}}function Dt(e){return function(t){return t.stopPropagation(),e.call(this,t)}}function $(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ke(e){return Array.from(e.childNodes)}function Ot(e,t){t=""+t,e.data!==t&&(e.data=t)}function ft(e,t,n){e.classList.toggle(t,!!n)}function te(e,t,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:r})}function gt(e,t){return new e(t)}const _t=new Map;let yt=0;function Se(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}function Ae(e,t){const n={stylesheet:$e(t),rules:{}};return _t.set(e,n),n}function Rt(e,t,n,r,o,a,u,i=0){const s=16.666/r;let l=`{
`;for(let b=0;b<=1;b+=s){const S=t+(n-t)*a(b);l+=b*100+`%{${u(S,1-S)}}
`}const d=l+`100% {${u(n,1-n)}}
}`,p=`__svelte_${Se(d)}_${i}`,h=jt(e),{stylesheet:y,rules:m}=_t.get(h)||Ae(h,e);m[p]||(m[p]=!0,y.insertRule(`@keyframes ${p} ${d}`,y.cssRules.length));const A=e.style.animation||"";return e.style.animation=`${A?`${A}, `:""}${p} ${r}ms linear ${o}ms 1 both`,yt+=1,p}function Ne(e,t){const n=(e.style.animation||"").split(", "),r=n.filter(t?a=>a.indexOf(t)<0:a=>a.indexOf("__svelte")===-1),o=n.length-r.length;o&&(e.style.animation=r.join(", "),yt-=o,yt||Me())}function Me(){Pt(()=>{yt||(_t.forEach(e=>{const{ownerNode:t}=e.stylesheet;t&&O(t)}),_t.clear())})}let nt;function et(e){nt=e}function vt(){if(!nt)throw new Error("Function called outside component initialization");return nt}function Ce(e){vt().$$.on_mount.push(e)}function Pe(e){vt().$$.after_update.push(e)}function Le(e){vt().$$.on_destroy.push(e)}function Oe(){const e=vt();return(t,n,{cancelable:r=!1}={})=>{const o=e.$$.callbacks[t];if(o){const a=te(t,n,{cancelable:r});return o.slice().forEach(u=>{u.call(e,a)}),!a.defaultPrevented}return!0}}function Bt(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(r=>r.call(this,t))}const Q=[],rt=[];let K=[];const It=[],ee=Promise.resolve();let At=!1;function ne(){At||(At=!0,ee.then(re))}function qe(){return ne(),ee}function st(e){K.push(e)}const kt=new Set;let X=0;function re(){if(X!==0)return;const e=nt;do{try{for(;X<Q.length;){const t=Q[X];X++,et(t),Te(t.$$)}}catch(t){throw Q.length=0,X=0,t}for(et(null),Q.length=0,X=0;rt.length;)rt.pop()();for(let t=0;t<K.length;t+=1){const n=K[t];kt.has(n)||(kt.add(n),n())}K.length=0}while(Q.length);for(;It.length;)It.pop()();At=!1,kt.clear(),et(e)}function Te(e){if(e.fragment!==null){e.update(),W(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(st)}}function xe(e){const t=[],n=[];K.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),K=t}let tt;function ze(){return tt||(tt=Promise.resolve(),tt.then(()=>{tt=null})),tt}function St(e,t,n){e.dispatchEvent(te(`${t?"intro":"outro"}${n}`))}const dt=new Set;let Y;function ot(){Y={r:0,c:[],p:Y}}function at(){Y.r||W(Y.c),Y=Y.p}function L(e,t){e&&e.i&&(dt.delete(e),e.i(t))}function q(e,t,n,r){if(e&&e.o){if(dt.has(e))return;dt.add(e),Y.c.push(()=>{dt.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}const De={duration:0};function Ut(e,t,n,r){let a=t(e,n,{direction:"both"}),u=r?0:1,i=null,s=null,l=null,d;function p(){l&&Ne(e,l)}function h(m,A){const b=m.b-u;return A*=Math.abs(b),{a:u,b:m.b,d:b,duration:A,start:m.start,end:m.start+A,group:m.group}}function y(m){const{delay:A=0,duration:b=300,easing:S=ge,tick:P=M,css:D}=a||De,w={start:be()+A,b:m};m||(w.group=Y,Y.r+=1),"inert"in e&&(m?d!==void 0&&(e.inert=d):(d=e.inert,e.inert=!0)),i||s?s=w:(D&&(p(),l=Rt(e,u,m,b,A,S,D)),m&&P(0,1),i=h(w,b),st(()=>St(e,m,"start")),ve(_=>{if(s&&_>s.start&&(i=h(s,b),s=null,St(e,i.b,"start"),D&&(p(),l=Rt(e,u,i.b,i.duration,0,S,a.css))),i){if(_>=i.end)P(u=i.b,1-u),St(e,i.b,"end"),s||(i.b?p():--i.group.r||W(i.group.c)),i=null;else if(_>=i.start){const v=_-i.start;u=i.a+i.d*S(v/i.duration),P(u,1-u)}}return!!(i||s)}))}return{run(m){j(a)?ze().then(()=>{a=a({direction:m?"in":"out"}),y(m)}):y(m)},end(){p(),i=s=null}}}function Ft(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Re(e,t){q(e,1,1,()=>{t.delete(e.key)})}function Be(e,t,n,r,o,a,u,i,s,l,d,p){let h=e.length,y=a.length,m=h;const A={};for(;m--;)A[e[m].key]=m;const b=[],S=new Map,P=new Map,D=[];for(m=y;m--;){const c=p(o,a,m),f=n(c);let g=u.get(f);g?D.push(()=>g.p(c,t)):(g=l(f,c),g.c()),S.set(f,b[m]=g),f in A&&P.set(f,Math.abs(m-A[f]))}const w=new Set,_=new Set;function v(c){L(c,1),c.m(i,d),u.set(c.key,c),d=c.first,y--}for(;h&&y;){const c=b[y-1],f=e[h-1],g=c.key,k=f.key;c===f?(d=c.first,h--,y--):S.has(k)?!u.has(g)||w.has(g)?v(c):_.has(k)?h--:P.get(g)>P.get(k)?(_.add(g),v(c)):(w.add(k),h--):(s(f,u),h--)}for(;h--;){const c=e[h];S.has(c.key)||s(c,u)}for(;y;)v(b[y-1]);return W(D),b}function wt(e,t){const n={},r={},o={$$scope:1};let a=e.length;for(;a--;){const u=e[a],i=t[a];if(i){for(const s in u)s in i||(r[s]=1);for(const s in i)o[s]||(n[s]=i[s],o[s]=1);e[a]=i}else for(const s in u)o[s]=1}for(const u in r)u in n||(n[u]=void 0);return n}function bt(e){return typeof e=="object"&&e!==null?e:{}}function U(e){e&&e.c()}function B(e,t,n){const{fragment:r,after_update:o}=e.$$;r&&r.m(t,n),st(()=>{const a=e.$$.on_mount.map(Zt).filter(j);e.$$.on_destroy?e.$$.on_destroy.push(...a):W(a),e.$$.on_mount=[]}),o.forEach(st)}function I(e,t){const n=e.$$;n.fragment!==null&&(xe(n.after_update),W(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ie(e,t){e.$$.dirty[0]===-1&&(Q.push(e),ne(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function H(e,t,n,r,o,a,u=null,i=[-1]){const s=nt;et(e);const l=e.$$={fragment:null,ctx:[],props:a,update:M,not_equal:o,bound:qt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:qt(),dirty:i,skip_bound:!1,root:t.target||s.$$.root};u&&u(l.root);let d=!1;if(l.ctx=n?n(e,t.props||{},(p,h,...y)=>{const m=y.length?y[0]:h;return l.ctx&&o(l.ctx[p],l.ctx[p]=m)&&(!l.skip_bound&&l.bound[p]&&l.bound[p](m),d&&Ie(e,p)),h}):[],l.update(),d=!0,W(l.before_update),l.fragment=r?r(l.ctx):!1,t.target){if(t.hydrate){const p=ke(t.target);l.fragment&&l.fragment.l(p),p.forEach(O)}else l.fragment&&l.fragment.c();t.intro&&L(e.$$.fragment),B(e,t.target,t.anchor),re()}et(s)}class G{constructor(){Et(this,"$$");Et(this,"$$set")}$destroy(){I(this,1),this.$destroy=M}$on(t,n){if(!j(n))return M;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(t){this.$$set&&!_e(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Ue="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Ue);const J=[];function se(e,t){return{subscribe:lt(e,t).subscribe}}function lt(e,t=M){let n;const r=new Set;function o(i){if(F(e,i)&&(e=i,n)){const s=!J.length;for(const l of r)l[1](),J.push(l,e);if(s){for(let l=0;l<J.length;l+=2)J[l][0](J[l+1]);J.length=0}}}function a(i){o(i(e))}function u(i,s=M){const l=[i,s];return r.add(l),r.size===1&&(n=t(o,a)||M),i(e),()=>{r.delete(l),r.size===0&&n&&(n(),n=null)}}return{set:o,update:a,subscribe:u}}function ie(e,t,n){const r=!Array.isArray(e),o=r?[e]:e;if(!o.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const a=t.length<2;return se(n,(u,i)=>{let s=!1;const l=[];let d=0,p=M;const h=()=>{if(d)return;p();const m=t(r?l[0]:l,u,i);a?u(m):p=j(m)?m:M},y=o.map((m,A)=>Mt(m,b=>{l[A]=b,d&=~(1<<A),s&&h()},()=>{d|=1<<A}));return s=!0,h(),function(){W(y),p(),s=!1}})}function oe(e,t){if(e instanceof RegExp)return{keys:!1,pattern:e};var n,r,o,a,u=[],i="",s=e.split("/");for(s[0]||s.shift();o=s.shift();)n=o[0],n==="*"?(u.push("wild"),i+="/(.*)"):n===":"?(r=o.indexOf("?",1),a=o.indexOf(".",1),u.push(o.substring(1,~r?r:~a?a:o.length)),i+=~r&&!~a?"(?:/([^/]+?))?":"/([^/]+?)",~a&&(i+=(~r?"?":"")+"\\"+o.substring(a))):i+="/"+o;return{keys:u,pattern:new RegExp("^"+i+"/?$","i")}}function Fe(e){let t,n,r;const o=[e[2]];var a=e[0];function u(i,s){let l={};for(let d=0;d<o.length;d+=1)l=ht(l,o[d]);return s!==void 0&&s&4&&(l=ht(l,wt(o,[bt(i[2])]))),{props:l}}return a&&(t=gt(a,u(e)),t.$on("routeEvent",e[7])),{c(){t&&U(t.$$.fragment),n=Lt()},m(i,s){t&&B(t,i,s),x(i,n,s),r=!0},p(i,s){if(s&1&&a!==(a=i[0])){if(t){ot();const l=t;q(l.$$.fragment,1,0,()=>{I(l,1)}),at()}a?(t=gt(a,u(i,s)),t.$on("routeEvent",i[7]),U(t.$$.fragment),L(t.$$.fragment,1),B(t,n.parentNode,n)):t=null}else if(a){const l=s&4?wt(o,[bt(i[2])]):{};t.$set(l)}},i(i){r||(t&&L(t.$$.fragment,i),r=!0)},o(i){t&&q(t.$$.fragment,i),r=!1},d(i){i&&O(n),t&&I(t,i)}}}function He(e){let t,n,r;const o=[{params:e[1]},e[2]];var a=e[0];function u(i,s){let l={};for(let d=0;d<o.length;d+=1)l=ht(l,o[d]);return s!==void 0&&s&6&&(l=ht(l,wt(o,[s&2&&{params:i[1]},s&4&&bt(i[2])]))),{props:l}}return a&&(t=gt(a,u(e)),t.$on("routeEvent",e[6])),{c(){t&&U(t.$$.fragment),n=Lt()},m(i,s){t&&B(t,i,s),x(i,n,s),r=!0},p(i,s){if(s&1&&a!==(a=i[0])){if(t){ot();const l=t;q(l.$$.fragment,1,0,()=>{I(l,1)}),at()}a?(t=gt(a,u(i,s)),t.$on("routeEvent",i[6]),U(t.$$.fragment),L(t.$$.fragment,1),B(t,n.parentNode,n)):t=null}else if(a){const l=s&6?wt(o,[s&2&&{params:i[1]},s&4&&bt(i[2])]):{};t.$set(l)}},i(i){r||(t&&L(t.$$.fragment,i),r=!0)},o(i){t&&q(t.$$.fragment,i),r=!1},d(i){i&&O(n),t&&I(t,i)}}}function Ge(e){let t,n,r,o;const a=[He,Fe],u=[];function i(s,l){return s[1]?0:1}return t=i(e),n=u[t]=a[t](e),{c(){n.c(),r=Lt()},m(s,l){u[t].m(s,l),x(s,r,l),o=!0},p(s,[l]){let d=t;t=i(s),t===d?u[t].p(s,l):(ot(),q(u[d],1,1,()=>{u[d]=null}),at(),n=u[t],n?n.p(s,l):(n=u[t]=a[t](s),n.c()),L(n,1),n.m(r.parentNode,r))},i(s){o||(L(n),o=!0)},o(s){q(n),o=!1},d(s){s&&O(r),u[t].d(s)}}}function Ht(){const e=window.location.href.indexOf("#/");let t=e>-1?window.location.href.substr(e+1):"/";const n=t.indexOf("?");let r="";return n>-1&&(r=t.substr(n+1),t=t.substr(0,n)),{location:t,querystring:r}}const $t=se(null,function(t){t(Ht());const n=()=>{t(Ht())};return window.addEventListener("hashchange",n,!1),function(){window.removeEventListener("hashchange",n,!1)}});ie($t,e=>e.location);ie($t,e=>e.querystring);const Gt=lt(void 0);function Ye(e){e?window.scrollTo(e.__svelte_spa_router_scrollX,e.__svelte_spa_router_scrollY):window.scrollTo(0,0)}function We(e,t,n){let{routes:r={}}=t,{prefix:o=""}=t,{restoreScrollState:a=!1}=t;class u{constructor(_,v){if(!v||typeof v!="function"&&(typeof v!="object"||v._sveltesparouter!==!0))throw Error("Invalid component object");if(!_||typeof _=="string"&&(_.length<1||_.charAt(0)!="/"&&_.charAt(0)!="*")||typeof _=="object"&&!(_ instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:c,keys:f}=oe(_);this.path=_,typeof v=="object"&&v._sveltesparouter===!0?(this.component=v.component,this.conditions=v.conditions||[],this.userData=v.userData,this.props=v.props||{}):(this.component=()=>Promise.resolve(v),this.conditions=[],this.props={}),this._pattern=c,this._keys=f}match(_){if(o){if(typeof o=="string")if(_.startsWith(o))_=_.substr(o.length)||"/";else return null;else if(o instanceof RegExp){const g=_.match(o);if(g&&g[0])_=_.substr(g[0].length)||"/";else return null}}const v=this._pattern.exec(_);if(v===null)return null;if(this._keys===!1)return v;const c={};let f=0;for(;f<this._keys.length;){try{c[this._keys[f]]=decodeURIComponent(v[f+1]||"")||null}catch{c[this._keys[f]]=null}f++}return c}async checkConditions(_){for(let v=0;v<this.conditions.length;v++)if(!await this.conditions[v](_))return!1;return!0}}const i=[];r instanceof Map?r.forEach((w,_)=>{i.push(new u(_,w))}):Object.keys(r).forEach(w=>{i.push(new u(w,r[w]))});let s=null,l=null,d={};const p=Oe();async function h(w,_){await qe(),p(w,_)}let y=null,m=null;a&&(m=w=>{w.state&&(w.state.__svelte_spa_router_scrollY||w.state.__svelte_spa_router_scrollX)?y=w.state:y=null},window.addEventListener("popstate",m),Pe(()=>{Ye(y)}));let A=null,b=null;const S=$t.subscribe(async w=>{A=w;let _=0;for(;_<i.length;){const v=i[_].match(w.location);if(!v){_++;continue}const c={route:i[_].path,location:w.location,querystring:w.querystring,userData:i[_].userData,params:v&&typeof v=="object"&&Object.keys(v).length?v:null};if(!await i[_].checkConditions(c)){n(0,s=null),b=null,h("conditionsFailed",c);return}h("routeLoading",Object.assign({},c));const f=i[_].component;if(b!=f){f.loading?(n(0,s=f.loading),b=f,n(1,l=f.loadingParams),n(2,d={}),h("routeLoaded",Object.assign({},c,{component:s,name:s.name,params:l}))):(n(0,s=null),b=null);const g=await f();if(w!=A)return;n(0,s=g&&g.default||g),b=f}v&&typeof v=="object"&&Object.keys(v).length?n(1,l=v):n(1,l=null),n(2,d=i[_].props),h("routeLoaded",Object.assign({},c,{component:s,name:s.name,params:l})).then(()=>{Gt.set(l)});return}n(0,s=null),b=null,Gt.set(void 0)});Le(()=>{S(),m&&window.removeEventListener("popstate",m)});function P(w){Bt.call(this,e,w)}function D(w){Bt.call(this,e,w)}return e.$$set=w=>{"routes"in w&&n(3,r=w.routes),"prefix"in w&&n(4,o=w.prefix),"restoreScrollState"in w&&n(5,a=w.restoreScrollState)},e.$$.update=()=>{e.$$.dirty&32&&(history.scrollRestoration=a?"manual":"auto")},[s,l,d,r,o,a,P,D]}class Xe extends G{constructor(t){super(),H(this,t,We,Ge,F,{routes:3,prefix:4,restoreScrollState:5})}}let Je={title:"",sideBarOpen:!1},Qe="";const V=lt(Je),ae=lt(Qe),Yt=()=>{let e=ye(ae);return e===""?".":e.endsWith("/")?e.slice(0,-1):e},pt=[];let le;function ue(e){const t=e.pattern.test(le);Wt(e,e.className,t),Wt(e,e.inactiveClassName,!t)}function Wt(e,t,n){(t||"").split(" ").forEach(r=>{r&&(e.node.classList.remove(r),n&&e.node.classList.add(r))})}$t.subscribe(e=>{le=e.location+(e.querystring?"?"+e.querystring:""),pt.map(ue)});function Ze(e,t){if(t&&(typeof t=="string"||typeof t=="object"&&t instanceof RegExp)?t={path:t}:t=t||{},!t.path&&e.hasAttribute("href")&&(t.path=e.getAttribute("href"),t.path&&t.path.length>1&&t.path.charAt(0)=="#"&&(t.path=t.path.substring(1))),t.className||(t.className="active"),!t.path||typeof t.path=="string"&&(t.path.length<1||t.path.charAt(0)!="/"&&t.path.charAt(0)!="*"))throw Error('Invalid value for "path" argument');const{pattern:n}=typeof t.path=="string"?oe(t.path):{pattern:t.path},r={node:e,className:t.className,inactiveClassName:t.inactiveClassName,pattern:n};return pt.push(r),ue(r),{destroy(){pt.splice(pt.indexOf(r),1)}}}function Ke(e){let t,n,r,o,a,u,i,s;return{c(){t=C("div"),n=C("a"),r=C("span"),o=it(e[0]),$(r,"class","block px-2"),$(n,"href",a=`#${e[1]}`),$(n,"class","block h-full hover:bg-slate-700 hover:text-white"),$(t,"class","border-b border-black h-7")},m(l,d){x(l,t,d),E(t,n),E(n,r),E(r,o),i||(s=we(u=Ze.call(null,n,{path:e[1],className:"bg-black text-white",inactiveClassName:"bg-white text-black"})),i=!0)},p(l,[d]){d&1&&Ot(o,l[0]),d&2&&a!==(a=`#${l[1]}`)&&$(n,"href",a),u&&j(u.update)&&d&2&&u.update.call(null,{path:l[1],className:"bg-black text-white",inactiveClassName:"bg-white text-black"})},i:M,o:M,d(l){l&&O(t),i=!1,s()}}}function Ve(e,t,n){let{name:r}=t,{path:o}=t;return e.$$set=a=>{"name"in a&&n(0,r=a.name),"path"in a&&n(1,o=a.path)},[r,o]}class Xt extends G{constructor(t){super(),H(this,t,Ve,Ke,F,{name:0,path:1})}}function je(e){let t,n,r,o,a,u;return r=new Xt({props:{name:"Main",path:"/"}}),a=new Xt({props:{name:"LDAP",path:"/ldap"}}),{c(){t=C("div"),n=C("div"),U(r.$$.fragment),o=R(),U(a.$$.fragment),$(n,"class","sticky top-0 overflow-auto max-h-svh no-scrollbar svelte-5d8dzl"),$(t,"class","sidebar-bg border-r border-black svelte-5d8dzl")},m(i,s){x(i,t,s),E(t,n),B(r,n,null),E(n,o),B(a,n,null),u=!0},p:M,i(i){u||(L(r.$$.fragment,i),L(a.$$.fragment,i),u=!0)},o(i){q(r.$$.fragment,i),q(a.$$.fragment,i),u=!1},d(i){i&&O(t),I(r),I(a)}}}class tn extends G{constructor(t){super(),H(this,t,null,je,F,{})}}function en(e){let t,n,r,o;return{c(){t=xt("svg"),n=xt("path"),$(n,"d",r=e[4][e[0]]),$(t,"xmlns","http://www.w3.org/2000/svg"),$(t,"class",o="inline "+e[3]),$(t,"width",e[2]),$(t,"height",e[1]),$(t,"viewBox","0 0 24 24"),$(t,"fill-rule","evenodd"),$(t,"clip-rule","evenodd")},m(a,u){x(a,t,u),E(t,n)},p(a,[u]){u&1&&r!==(r=a[4][a[0]])&&$(n,"d",r),u&8&&o!==(o="inline "+a[3])&&$(t,"class",o),u&4&&$(t,"width",a[2]),u&2&&$(t,"height",a[1])},i:M,o:M,d(a){a&&O(t)}}}function nn(e,t,n){const r={link:"M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z",right:"M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z",left:"M16.67 24l2.83-2.829-9.339-9.175 9.339-9.167-2.83-2.829-12.17 11.996z",menu:"M3 6h18v-2h-18v2zm0 6h18v-2h-18v2zm0 6h18v-2h-18v2z"};let{icon:o}=t,{height:a="24"}=t,{width:u="24"}=t,{class:i=void 0}=t;return e.$$set=s=>{"icon"in s&&n(0,o=s.icon),"height"in s&&n(1,a=s.height),"width"in s&&n(2,u=s.width),"class"in s&&n(3,i=s.class)},[o,a,u,i,r]}class ce extends G{constructor(t){super(),H(this,t,nn,en,F,{icon:0,height:1,width:2,class:3})}}function rn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Nt={exports:{}};(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});function n(c){return typeof c=="object"&&!("toString"in c)?Object.prototype.toString.call(c).slice(8,-1):c}var r=typeof process=="object"&&!0;function o(c,f){if(!c)throw r?new Error("Invariant failed"):new Error(f())}t.invariant=o;var a=Object.prototype.hasOwnProperty,u=Array.prototype.splice,i=Object.prototype.toString;function s(c){return i.call(c).slice(8,-1)}var l=Object.assign||function(c,f){return d(f).forEach(function(g){a.call(f,g)&&(c[g]=f[g])}),c},d=typeof Object.getOwnPropertySymbols=="function"?function(c){return Object.keys(c).concat(Object.getOwnPropertySymbols(c))}:function(c){return Object.keys(c)};function p(c){return Array.isArray(c)?l(c.constructor(c.length),c):s(c)==="Map"?new Map(c):s(c)==="Set"?new Set(c):c&&typeof c=="object"?l(Object.create(Object.getPrototypeOf(c)),c):c}var h=function(){function c(){this.commands=l({},y),this.update=this.update.bind(this),this.update.extend=this.extend=this.extend.bind(this),this.update.isEquals=function(f,g){return f===g},this.update.newContext=function(){return new c().update}}return Object.defineProperty(c.prototype,"isEquals",{get:function(){return this.update.isEquals},set:function(f){this.update.isEquals=f},enumerable:!0,configurable:!0}),c.prototype.extend=function(f,g){this.commands[f]=g},c.prototype.update=function(f,g){var k=this,N=typeof g=="function"?{$apply:g}:g;Array.isArray(f)&&Array.isArray(N)||o(!Array.isArray(N),function(){return"update(): You provided an invalid spec to update(). The spec may not contain an array except as the value of $set, $push, $unshift, $splice or any custom command allowing an array value."}),o(typeof N=="object"&&N!==null,function(){return"update(): You provided an invalid spec to update(). The spec and every included key path must be plain objects containing one of the "+("following commands: "+Object.keys(k.commands).join(", ")+".")});var T=f;return d(N).forEach(function(z){if(a.call(k.commands,z)){var de=f===T;T=k.commands[z](N[z],T,N,f),de&&k.isEquals(T,f)&&(T=f)}else{var ct=s(f)==="Map"?k.update(f.get(z),N[z]):k.update(f[z],N[z]),pe=s(T)==="Map"?T.get(z):T[z];(!k.isEquals(ct,pe)||typeof ct>"u"&&!a.call(f,z))&&(T===f&&(T=p(f)),s(T)==="Map"?T.set(z,ct):T[z]=ct)}}),T},c}();t.Context=h;var y={$push:function(c,f,g){return A(f,g,"$push"),c.length?f.concat(c):f},$unshift:function(c,f,g){return A(f,g,"$unshift"),c.length?c.concat(f):f},$splice:function(c,f,g,k){return S(f,g),c.forEach(function(N){P(N),f===k&&N.length&&(f=p(k)),u.apply(f,N)}),f},$set:function(c,f,g){return w(g),c},$toggle:function(c,f){b(c,"$toggle");var g=c.length?p(f):f;return c.forEach(function(k){g[k]=!f[k]}),g},$unset:function(c,f,g,k){return b(c,"$unset"),c.forEach(function(N){Object.hasOwnProperty.call(f,N)&&(f===k&&(f=p(k)),delete f[N])}),f},$add:function(c,f,g,k){return v(f,"$add"),b(c,"$add"),s(f)==="Map"?c.forEach(function(N){var T=N[0],z=N[1];f===k&&f.get(T)!==z&&(f=p(k)),f.set(T,z)}):c.forEach(function(N){f===k&&!f.has(N)&&(f=p(k)),f.add(N)}),f},$remove:function(c,f,g,k){return v(f,"$remove"),b(c,"$remove"),c.forEach(function(N){f===k&&f.has(N)&&(f=p(k)),f.delete(N)}),f},$merge:function(c,f,g,k){return _(f,c),d(c).forEach(function(N){c[N]!==f[N]&&(f===k&&(f=p(k)),f[N]=c[N])}),f},$apply:function(c,f){return D(c),c(f)}},m=new h;t.isEquals=m.update.isEquals,t.extend=m.extend,t.default=m.update,t.default.default=e.exports=l(t.default,t);function A(c,f,g){o(Array.isArray(c),function(){return"update(): expected target of "+n(g)+" to be an array; got "+n(c)+"."}),b(f[g],g)}function b(c,f){o(Array.isArray(c),function(){return"update(): expected spec of "+n(f)+" to be an array; got "+n(c)+". Did you forget to wrap your parameter in an array?"})}function S(c,f){o(Array.isArray(c),function(){return"Expected $splice target to be an array; got "+n(c)}),P(f.$splice)}function P(c){o(Array.isArray(c),function(){return"update(): expected spec of $splice to be an array of arrays; got "+n(c)+". Did you forget to wrap your parameters in an array?"})}function D(c){o(typeof c=="function",function(){return"update(): expected spec of $apply to be a function; got "+n(c)+"."})}function w(c){o(Object.keys(c).length===1,function(){return"Cannot have more than one key in an object with $set"})}function _(c,f){o(f&&typeof f=="object",function(){return"update(): $merge expects a spec of type 'object'; got "+n(f)}),o(c&&typeof c=="object",function(){return"update(): $merge expects a target of type 'object'; got "+n(c)})}function v(c,f){var g=s(c);o(g==="Map"||g==="Set",function(){return"update(): "+n(f)+" expects a target of type Set or Map; got "+n(g)})}})(Nt,Nt.exports);var sn=Nt.exports;const ut=rn(sn);function on(e){let t,n,r,o,a,u=e[1].title+"",i,s,l,d,p;return r=new ce({props:{icon:e[1].sideBarOpen?"left":"menu",height:"18",class:"fill-white"}}),{c(){t=C("div"),n=C("button"),U(r.$$.fragment),o=R(),a=C("span"),i=it(u),$(n,"class","mr-2 hover:bg-slate-700 flex items-center h-full px-1"),$(t,"class",s=`${e[0]} bg-black text-white flex items-center border-b border-gray-500`)},m(h,y){x(h,t,y),E(t,n),B(r,n,null),E(t,o),E(t,a),E(a,i),l=!0,d||(p=mt(n,"click",e[2]),d=!0)},p(h,[y]){const m={};y&2&&(m.icon=h[1].sideBarOpen?"left":"menu"),r.$set(m),(!l||y&2)&&u!==(u=h[1].title+"")&&Ot(i,u),(!l||y&1&&s!==(s=`${h[0]} bg-black text-white flex items-center border-b border-gray-500`))&&$(t,"class",s)},i(h){l||(L(r.$$.fragment,h),l=!0)},o(h){q(r.$$.fragment,h),l=!1},d(h){h&&O(t),I(r),d=!1,p()}}}function an(e,t,n){let r;Ct(e,V,u=>n(1,r=u));let{class:o=""}=t;const a=()=>V.update(u=>ut(u,{sideBarOpen:{$set:!u.sideBarOpen}}));return e.$$set=u=>{"class"in u&&n(0,o=u.class)},[o,r,a]}class ln extends G{constructor(t){super(),H(this,t,an,on,F,{class:0})}}const un=[],fe=lt(un),cn=e=>{fe.update(t=>{var n;return(n=t[e])!=null&&n.timeout&&clearTimeout(t[e].timeout),ut(t,{$set:t.filter(r=>r.id!=e)})})};function Jt(e,t,n){const r=e.slice();return r[4]=t[n],r}function Qt(e,t){let n,r,o,a,u,i,s=t[4].message+"",l,d,p,h,y,m,A;o=new ce({props:{icon:"right"}});function b(){return t[3](t[4])}return{key:e,first:null,c(){n=C("div"),r=C("button"),U(o.$$.fragment),a=R(),u=C("div"),i=C("span"),l=it(s),d=R(),$(r,"class","hover:fill-red-500"),$(u,"class","pl-2"),$(n,"class",p=Tt(`${t[4].type} flex p-2 h-12 items-center border-l border-t border-gray-700 w-[28rem]`)+" svelte-bldy2k"),this.first=n},m(S,P){x(S,n,P),E(n,r),B(o,r,null),E(n,a),E(n,u),E(u,i),E(i,l),E(n,d),y=!0,m||(A=mt(r,"click",b),m=!0)},p(S,P){t=S,(!y||P&1)&&s!==(s=t[4].message+"")&&Ot(l,s),(!y||P&1&&p!==(p=Tt(`${t[4].type} flex p-2 h-12 items-center border-l border-t border-gray-700 w-[28rem]`)+" svelte-bldy2k"))&&$(n,"class",p)},i(S){y||(L(o.$$.fragment,S),S&&st(()=>{y&&(h||(h=Ut(n,t[2],{duration:250},!0)),h.run(1))}),y=!0)},o(S){q(o.$$.fragment,S),S&&(h||(h=Ut(n,t[2],{duration:250},!1)),h.run(0)),y=!1},d(S){S&&O(n),I(o),S&&h&&h.end(),m=!1,A()}}}function fn(e){let t,n=[],r=new Map,o,a=Ft(e[0]);const u=i=>i[4].id;for(let i=0;i<a.length;i+=1){let s=Jt(e,a,i),l=u(s);r.set(l,n[i]=Qt(l,s))}return{c(){t=C("div");for(let i=0;i<n.length;i+=1)n[i].c();$(t,"class","fixed bottom-0 right-0 z-50")},m(i,s){x(i,t,s);for(let l=0;l<n.length;l+=1)n[l]&&n[l].m(t,null);o=!0},p(i,[s]){s&3&&(a=Ft(i[0]),ot(),n=Be(n,s,u,1,i,a,r,t,Re,Qt,null,Jt),at())},i(i){if(!o){for(let s=0;s<a.length;s+=1)L(n[s]);o=!0}},o(i){for(let s=0;s<n.length;s+=1)q(n[s]);o=!1},d(i){i&&O(t);for(let s=0;s<n.length;s+=1)n[s].d()}}}function dn(e,t,n){let r;Ct(e,fe,i=>n(0,r=i));const o=i=>{cn(i)};return[r,o,(i,{duration:s})=>({duration:s,css:(l,d)=>`transform: translateX(${d*400}px)`}),i=>o(i.id)]}class pn extends G{constructor(t){super(),H(this,t,dn,fn,F,{})}}function hn(e){let t;return{c(){t=C("div"),t.innerHTML='<span class="text-2xl self-center">Welcome!</span>',$(t,"class","flex w-full h-full justify-center align-middle")},m(n,r){x(n,t,r)},p:M,i:M,o:M,d(n){n&&O(t)}}}function mn(e){return V.update(t=>ut(t,{title:{$set:"Main"}})),[]}class gn extends G{constructor(t){super(),H(this,t,mn,hn,F,{})}}const _n=e=>{const t=new FormData(e),n={};for(const r of t){const[o,a]=r;n[o]=a}return n};function yn(e){let t,n,r,o,a,u,i,s,l,d,p,h,y,m,A,b,S,P;return{c(){t=C("div"),n=C("div"),r=C("span"),r.textContent="Ldap - get an user info",o=R(),a=C("form"),a.innerHTML='<label><span>Uid</span> <input type="text" name="uid" class="px-1"/></label> <button type="submit" class="submit-button svelte-gzgqca">Submit</button>',u=R(),i=C("textarea"),s=R(),l=C("hr"),d=R(),p=C("div"),h=C("span"),h.textContent="Ldap - Get groups",y=R(),m=C("form"),m.innerHTML='<button type="submit" class="submit-button svelte-gzgqca">Submit</button>',A=R(),b=C("textarea"),$(i,"class","code svelte-gzgqca"),$(l,"class","mt-2 mb-2"),$(b,"class","code svelte-gzgqca"),$(t,"class","p-2")},m(D,w){x(D,t,w),E(t,n),E(n,r),E(n,o),E(n,a),E(n,u),E(n,i),e[4](i),E(t,s),E(t,l),E(t,d),E(t,p),E(p,h),E(p,y),E(p,m),E(p,A),E(p,b),e[5](b),S||(P=[mt(a,"submit",Dt(zt(e[2]))),mt(m,"submit",Dt(zt(e[3])))],S=!0)},p:M,i:M,o:M,d(D){D&&O(t),e[4](null),e[5](null),S=!1,W(P)}}}function wn(e,t,n){V.update(l=>ut(l,{title:{$set:"LDAP"}}));let r,o;const a=async l=>{const d=_n(l.currentTarget);if(d.uid===""){console.error("Uid is required");return}try{const p=await fetch(Yt()+"/api/ldap-users/"+d.uid,{method:"GET",headers:{"Content-Type":"application/json"}});if(!p.ok)throw new Error("failed to get user info, status: "+p.status);const h=await p.json();n(0,r.textContent=JSON.stringify(h,null,2),r)}catch(p){console.error(p)}},u=async()=>{try{const l=await fetch(Yt()+"/api/ldap-groups",{method:"GET",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error("failed to get groups, status: "+l.status);const d=await l.json();n(1,o.textContent=JSON.stringify(d,null,2),o)}catch(l){console.error(l)}};function i(l){rt[l?"unshift":"push"](()=>{r=l,n(0,r)})}function s(l){rt[l?"unshift":"push"](()=>{o=l,n(1,o)})}return[r,o,a,u,i,s]}class bn extends G{constructor(t){super(),H(this,t,wn,yn,F,{})}}function vn(e){let t;return{c(){t=C("h1"),t.textContent="Not Found"},m(n,r){x(n,t,r)},p:M,i:M,o:M,d(n){n&&O(t)}}}function $n(e){return V.update(t=>ut(t,{title:{$set:"404 - Not Found"}})),[]}class En extends G{constructor(t){super(),H(this,t,$n,vn,F,{})}}function kn(e){let t,n,r,o,a,u,i;return t=new tn({}),o=new ln({}),u=new Xe({props:{routes:e[3]}}),{c(){U(t.$$.fragment),n=R(),r=C("div"),U(o.$$.fragment),a=R(),U(u.$$.fragment),$(r,"class","h-full w-full grid grid-rows-[1.75rem]")},m(s,l){B(t,s,l),x(s,n,l),x(s,r,l),B(o,r,null),E(r,a),B(u,r,null),i=!0},p:M,i(s){i||(L(t.$$.fragment,s),L(o.$$.fragment,s),L(u.$$.fragment,s),i=!0)},o(s){q(t.$$.fragment,s),q(o.$$.fragment,s),q(u.$$.fragment,s),i=!1},d(s){s&&(O(n),O(r)),I(t,s),I(o),I(u)}}}function Sn(e){let t;return{c(){t=C("div"),t.innerHTML='<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>',$(t,"class","absolute inset-0 flex items-center justify-center")},m(n,r){x(n,t,r)},p:M,i:M,o:M,d(n){n&&O(t)}}}function An(e){let t,n,r,o,a,u;t=new pn({});const i=[Sn,kn],s=[];function l(d,p){return d[1]?1:0}return o=l(e),a=s[o]=i[o](e),{c(){U(t.$$.fragment),n=R(),r=C("div"),a.c(),$(r,"class","grid h-full w-full relative overflow-y-auto bg-slate-100"),ft(r,"grid-cols-[8rem,1fr]",e[2].sideBarOpen),ft(r,"grid-cols-[0,1fr]",!e[2].sideBarOpen)},m(d,p){B(t,d,p),x(d,n,p),x(d,r,p),s[o].m(r,null),e[4](r),u=!0},p(d,[p]){let h=o;o=l(d),o===h?s[o].p(d,p):(ot(),q(s[h],1,1,()=>{s[h]=null}),at(),a=s[o],a?a.p(d,p):(a=s[o]=i[o](d),a.c()),L(a,1),a.m(r,null)),(!u||p&4)&&ft(r,"grid-cols-[8rem,1fr]",d[2].sideBarOpen),(!u||p&4)&&ft(r,"grid-cols-[0,1fr]",!d[2].sideBarOpen)},i(d){u||(L(t.$$.fragment,d),L(a),u=!0)},o(d){q(t.$$.fragment,d),q(a),u=!1},d(d){d&&(O(n),O(r)),I(t,d),s[o].d(),e[4](null)}}}function Nn(e,t,n){let r;Ct(e,V,s=>n(2,r=s));let o,a=!1;const u=new Map;u.set("/ldap",bn),u.set("/",gn),u.set("/*",En),Ce(async()=>{try{const l=await(await fetch("./info")).json();ae.set(l.prefix_path||"")}catch(s){console.error(s)}n(1,a=!0)});function i(s){rt[s?"unshift":"push"](()=>{o=s,n(0,o)})}return[o,a,r,u,i]}class Mn extends G{constructor(t){super(),H(this,t,Nn,An,F,{})}}new Mn({target:document.body});
