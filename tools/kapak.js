/* Kapak görüntülerini çeker ve slayt sayısını ölçer (geliştirme aracı).
   Kullanım: NODE_PATH=<playwright-core'un bulunduğu node_modules> node tools/kapak.js <port> [ad,...]
   Sunucu, ana sayfayı ve eğitim klasörlerini birlikte sunmalı (tools/deploy-egitimler.sh --yerel + tools/serve.py).
   img/kapak/<ad>.jpg dosyalarını yazar; her eğitimin slayt sayısını ve sayfa yüklenirken çıkan hataları yazdırır. */
const { chromium } = require("playwright-core");
const fs = require("fs"), path = require("path"), os = require("os");
const [port = "8813", only = ""] = process.argv.slice(2);
const exe = (() => {
  const base = path.join(os.homedir(), "Library/Caches/ms-playwright");
  const d = fs.readdirSync(base).filter((x) => x.startsWith("chromium-")).sort().pop();
  return path.join(base, d, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing");
})();
global.window = {};
eval(fs.readFileSync(path.join(__dirname, "../js/egitimler.js"), "utf8"));
const liste = window.EGITIMLER.filter((e) => !only || only.split(",").includes(e.ad));

(async () => {
  const out = path.join(__dirname, "../img/kapak");
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: exe });
  for (const e of liste) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 1 });
    await page.addInitScript((ad) => { try { localStorage.setItem(ad + ".rehber.kapali", "1"); } catch (er) {} }, e.ad);
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (er) => errs.push(er.message));
    page.on("response", (r) => { if (r.status() >= 400) errs.push(`${r.status()} ${r.url()}`); });
    await page.goto(`http://localhost:${port}/${e.ad}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    const slayt = await page.evaluate(() => document.querySelectorAll("section.slide").length);
    await page.screenshot({ path: path.join(out, `${e.ad}.jpg`), type: "jpeg", quality: 82 });
    console.log(`${e.ad}: ${slayt} slayt${slayt === e.slayt ? "" : ` (listede ${e.slayt})`}${errs.length ? " | " + errs.join(" | ") : ""}`);
    await page.close();
  }
  await browser.close();
})();
