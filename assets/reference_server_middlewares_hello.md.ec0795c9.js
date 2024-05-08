import{_ as s,o as a,c as n,S as l}from"./chunks/framework.662a2917.js";const i=JSON.parse('{"title":"hello","description":"","frontmatter":{},"headers":[],"relativePath":"reference/server/middlewares/hello.md","filePath":"reference/server/middlewares/hello.md"}'),o={name:"reference/server/middlewares/hello.md"},p=l(`<h1 id="hello" tabindex="-1">hello <a class="header-anchor" href="#hello" aria-label="Permalink to &quot;hello&quot;">​</a></h1><p>Multi purpose middleware that can be used to test the server with return a simple message.</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">middlewares</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">hello</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello World</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, string</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">status_code</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is 200, int</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">headers</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, map[string]string</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is string, it could be json, json-pretty, html, string</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is false, bool, use template</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">trust</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is false, bool, trust of the template dangerous functions</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">work_dir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, string, work_dir for some of the template functions</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">delims</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># default is empty, delims for the template</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{{</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">}}</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><p>When template is used, values are:</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">data </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">map[</span><span style="color:#C792EA;">string</span><span style="color:#89DDFF;">]interface{}{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">         body</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">method</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">       c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Request</span><span style="color:#89DDFF;">().</span><span style="color:#A6ACCD;">Method</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">headers</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">      c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Request</span><span style="color:#89DDFF;">().</span><span style="color:#A6ACCD;">Header</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">query_params</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">QueryParams</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cookies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">      c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Cookies</span><span style="color:#89DDFF;">(),</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">         c</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Request</span><span style="color:#89DDFF;">().</span><span style="color:#A6ACCD;">URL</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">Path</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,5),e=[p];function t(r,c,D,y,F,C){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{i as __pageData,d as default};
