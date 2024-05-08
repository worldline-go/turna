import{_ as s,o as a,c as e,S as n}from"./chunks/framework.662a2917.js";const A=JSON.parse('{"title":"role","description":"","frontmatter":{},"headers":[],"relativePath":"reference/server/middlewares/role.md","filePath":"reference/server/middlewares/role.md"}'),l={name:"reference/server/middlewares/role.md"},o=n(`<h1 id="role" tabindex="-1">role <a class="header-anchor" href="#role" aria-label="Permalink to &quot;role&quot;">​</a></h1><p>Check the role of the token with specific http methods.</p><p>This usable after the <code>auth</code> middleware.</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">role</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty checking all, []string</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">GET</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">POST</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">roles</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, []string</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">role1</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">role2</span></span></code></pre></div>`,4),p=[o];function t(r,c,i,y,D,d){return a(),e("div",null,p)}const _=s(l,[["render",t]]);export{A as __pageData,_ as default};
