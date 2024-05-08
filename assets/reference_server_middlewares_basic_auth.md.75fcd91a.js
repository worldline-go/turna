import{_ as s,o as a,c as e,S as n}from"./chunks/framework.662a2917.js";const u=JSON.parse('{"title":"basic_auth","description":"","frontmatter":{},"headers":[],"relativePath":"reference/server/middlewares/basic_auth.md","filePath":"reference/server/middlewares/basic_auth.md"}'),o={name:"reference/server/middlewares/basic_auth.md"},t=n(`<h1 id="basic-auth" tabindex="-1">basic_auth <a class="header-anchor" href="#basic-auth" aria-label="Permalink to &quot;basic_auth&quot;">​</a></h1><p>Basic authentication middleware.</p><p>For basic auth check uses <code>github.com/abbot/go-http-auth</code> package.<br> Users as <code>htpasswd</code>.</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">basic_auth</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">users</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test:$apr1$JMWtQHoL$g/5ey5x7psJM7htuB6OEy0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># pass</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test2:$apr1$u4NQ6Doq$KdCzBPfjarcQ0mk4Fd/3v1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># pass</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">header_field</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, string, add the username to the request&#39;s header</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">remove_header</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is false, bool, remove the Authorization header</span></span></code></pre></div>`,4),l=[t];function p(c,r,i,y,d,D){return a(),e("div",null,l)}const C=s(o,[["render",p]]);export{u as __pageData,C as default};
