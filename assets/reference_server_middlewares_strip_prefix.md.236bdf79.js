import{_ as s,o as e,c as a,S as n}from"./chunks/framework.662a2917.js";const _=JSON.parse('{"title":"strip_prefix","description":"","frontmatter":{},"headers":[],"relativePath":"reference/server/middlewares/strip_prefix.md","filePath":"reference/server/middlewares/strip_prefix.md"}'),p={name:"reference/server/middlewares/strip_prefix.md"},l=n(`<h1 id="strip-prefix" tabindex="-1">strip_prefix <a class="header-anchor" href="#strip-prefix" aria-label="Permalink to &quot;strip_prefix&quot;">​</a></h1><p>Prefix middleware is use to strip prefix from the request path.</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">strip_prefix</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">force_slash</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is true, auto add slash begin of the path if not exist</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">prefix</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/test</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">prefixes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, prefixes has priority over prefix</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/test</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/test2</span></span></code></pre></div>`,3),t=[l];function o(r,i,c,y,f,C){return e(),a("div",null,t)}const D=s(p,[["render",o]]);export{_ as __pageData,D as default};
