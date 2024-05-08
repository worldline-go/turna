import{_ as s,o as a,c as e,S as l}from"./chunks/framework.662a2917.js";const _=JSON.parse('{"title":"log","description":"","frontmatter":{},"headers":[],"relativePath":"reference/server/middlewares/log.md","filePath":"reference/server/middlewares/log.md"}'),n={name:"reference/server/middlewares/log.md"},o=l(`<h1 id="log" tabindex="-1">log <a class="header-anchor" href="#log" aria-label="Permalink to &quot;log&quot;">​</a></h1><p>Log the method and path of the request with optional fields.</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">log</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">level</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">info</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is info, string, log level</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, string, add message</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">headers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is false, bool, print headers</span></span></code></pre></div>`,3),t=[o];function p(r,c,i,d,y,C){return a(),e("div",null,t)}const A=s(n,[["render",p]]);export{_ as __pageData,A as default};
