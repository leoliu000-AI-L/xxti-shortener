# XXTI 短链服务 - 部署指南

## 方案对比

| 方案 | 国内可用 | 海外可用 | 需要梯子 | 自主控制 |
|------|---------|---------|---------|---------|
| tinyurl.com | ❌ | ✅ | 创建时需要 | ❌ |
| Cloudflare Workers | ✅ | ✅ | 不需要 | ✅ |
| 自建VPS+CF | ✅ | ✅ | 不需要 | ✅ |

**推荐 Cloudflare Workers**：免费、全球CDN、国内能访问、5分钟部署。

## 部署步骤（3种方式选一种）

### 方式A：网页部署（最简单，推荐）

1. 打开 https://dash.cloudflare.com （注册/登录）
2. 左侧菜单 → Workers & Pages → Create
3. 点 "Create Worker"
4. 把 `worker.js` 的内容全部复制粘贴进去
5. 点 "Deploy"
6. 完成！你会得到一个 `xxx.workers.dev` 的链接

### 方式B：命令行部署（需要 Node.js）

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

### 方式C：绑定自定义域名（可选）

1. 在 Cloudflare 添加你的域名
2. Workers → 你的Worker → Settings → Domains & Routes
3. 添加自定义域名，比如 `go.yourdomain.com`
4. 最终短链变成：`go.yourdomain.com/xxti`

## 使用方式

部署完成后，你的短链是：
- `https://xxti-links.xxx.workers.dev/xxti` → 夸克网盘
- `https://xxti-links.xxx.workers.dev/demo` → 测试网页

### 添加新链接

修改 `worker.js` 中的 `LINKS` 对象，加一行：
```js
"新短码": "https://pan.quark.cn/s/新的分享链接",
```
然后重新部署即可。

## 效果

- 国内用户点开 → 正常跳转 ✅
- 海外用户点开 → 正常跳转 ✅
- 手机/电脑 → 都能用 ✅
- 不需要梯子 ✅
- 完全免费 ✅
