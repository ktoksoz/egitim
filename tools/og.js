/* tools/og.html şablonundan img/og.jpg paylaşım görselini (1200×630) üretir.
   Kullanım: NODE_PATH=<playwright-core'un bulunduğu node_modules> node tools/og.js <port>
   Sunucu bu deponun kökünü sunmalı: python3 tools/serve.py <port> */
const { chromium } = require("playwright-core");
const fs = require("fs"), path = require("path"), os = require("os");
const port = process.argv[2] || "8813";
const base = path.join(os.homedir(), "Library/Caches/ms-playwright");
const d = fs.readdirSync(base).filter((x) => x.startsWith("chromium-")).sort().pop();
const exe = path.join(base, d, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
(async () => {
  const b = await chromium.launch({ executablePath: exe });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto(`http://localhost:${port}/tools/og.html`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "../img/og.jpg"), type: "jpeg", quality: 85 });
  await b.close();
  console.log("img/og.jpg yazıldı");
})();
