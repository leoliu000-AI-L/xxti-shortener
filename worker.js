// ============================================
// XXTI 短链服务 - Cloudflare Workers 版本
// 部署到 Cloudflare Workers 即可使用
// 免费额度：每天10万次请求
// ============================================

// 📌 短链映射表：key = 短码, value = 真实链接
// 你要加新链接，在这里加一行就行
const LINKS = {
  // 夸克网盘资源
  "xxti":  "https://pan.quark.cn/s/df894522e7c1",
  
  // 测试网页（备用）
  "demo":  "https://xxti.dpdns.org/",
  
  // 示例：后续加新资源在这里加
  // "ai-pkg": "https://pan.quark.cn/s/xxxxxxxx",
  // "fonts":  "https://pan.quark.cn/s/yyyyyyyy",
};

// 自定义404页面（可选，也可以改成跳转到你的X主页）
const FALLBACK_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XXTI 仙道演算法</title>
  <style>
    body {
      background: #0a0a0a;
      color: #22d3ee;
      font-family: system-ui, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      text-align: center;
    }
    .box { max-width: 400px; padding: 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    p { color: #888; line-height: 1.6; }
    a { color: #fbbf24; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="box">
    <h1>⚡ 灵力不足</h1>
    <p>此短链不存在或已过期</p>
    <p><a href="https://xxti.dpdns.org/">→ 前往仙道命盘</a></p>
  </div>
</body>
</html>
`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1); // 去掉开头的 /

    // 根路径：展示所有可用短链（方便你自己管理）
    if (path === "" || path === "admin") {
      const links = Object.entries(LINKS)
        .map(([code, target]) => `<li><strong>/${code}</strong> → <a href="${target}">${target}</a></li>`)
        .join("\n");
      
      return new Response(`
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"><title>XXTI 短链管理</title>
        <style>body{background:#0a0a0a;color:#e0e0e0;font-family:system-ui;padding:2rem}
        h1{color:#22d3ee}li{margin:0.5rem 0}a{color:#fbbf24}code{color:#22d3ee}</style></head>
        <body>
          <h1>🔗 XXTI 短链管理</h1>
          <p>可用短链：</p>
          <ul>${links}</ul>
          <hr style="border-color:#333">
          <p style="color:#666">
            使用方式：<code>https://你的域名/xxti</code><br>
            添加新链接：修改 Workers 代码中的 LINKS 对象
          </p>
        </body></html>
      `, {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    }

    // 查找短链并跳转
    if (LINKS[path]) {
      return Response.redirect(LINKS[path], 302);
    }

    // 404
    return new Response(FALLBACK_HTML, {
      status: 404,
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  },
};
