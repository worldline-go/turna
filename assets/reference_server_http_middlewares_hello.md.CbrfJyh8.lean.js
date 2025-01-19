import{_ as i,c as a,a0 as t,o as n}from"./chunks/framework.C0t5_LYa.js";const o=JSON.parse('{"title":"hello","description":"","frontmatter":{},"headers":[],"relativePath":"reference/server/http/middlewares/hello.md","filePath":"reference/server/http/middlewares/hello.md"}'),e={name:"reference/server/http/middlewares/hello.md"};function l(h,s,p,k,r,d){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="hello" tabindex="-1">hello <a class="header-anchor" href="#hello" aria-label="Permalink to &quot;hello&quot;">​</a></h1><p>Multi purpose middleware that can be used to test the server with return a simple message.</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">middlewares</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    hello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      message</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello World&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # default is empty, string</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      status_code</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # default is 200, int</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      headers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># default is empty, map[string]string</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">string</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # default is string, it could be json, json-pretty, html, string</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # default is false, bool, use template</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      trust</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # default is false, bool, trust of the template dangerous functions</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      work_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # default is empty, string, work_dir for some of the template functions</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      delims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># default is empty, delims for the template</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;}}&quot;</span></span></code></pre></div><p>When template is used, values are:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{}{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;body&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:         body,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;method&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:       c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().Method,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;headers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:      c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().Header,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;query_params&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">QueryParams</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;cookies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:      c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Cookies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;path&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:         c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().URL.Path,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,5)]))}const g=i(e,[["render",l]]);export{o as __pageData,g as default};