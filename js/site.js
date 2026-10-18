/* Kartları js/egitimler.js'teki listeden kurar. */
(function () {
  const liste = document.getElementById("egitimler");
  if (!liste || !window.EGITIMLER) return;
  const GH = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const dakika = (sn) => Math.round(sn / 60);

  const kart = (e) => `
    <li class="egitim">
      <div class="kapak">
        <img src="img/kapak/${esc(e.ad)}.jpg" alt="" width="1440" height="860" loading="lazy" decoding="async">
      </div>
      <h3><a href="${esc(e.ad)}/">${esc(e.baslik)}</a></h3>
      <p class="alt">${esc(e.alt)}</p>
      <p class="aciklama">${esc(e.aciklama)}</p>
      <p class="olcu"><span>${e.slayt} slayt</span><span>${dakika(e.sure)} dakikalık anlatım</span><a class="kaynak" href="https://github.com/${esc(e.depo)}" target="_blank" rel="noopener">${GH}Kaynak kodu</a></p>
    </li>`;

  // Kategorisi listede olmayan eğitim kaybolmasın: sona "Diğer" başlığıyla eklenir.
  const kategoriler = (window.KATEGORILER || []).slice();
  const bilinen = new Set(kategoriler.map((k) => k.ad));
  if (window.EGITIMLER.some((e) => !bilinen.has(e.kategori))) kategoriler.push({ ad: "diger", baslik: "Diğer" });
  const gruplar = kategoriler
    .map((k) => ({ k, egitimler: window.EGITIMLER.filter((e) => (bilinen.has(e.kategori) ? e.kategori : "diger") === k.ad) }))
    .filter((g) => g.egitimler.length);

  const nav = gruplar.length > 1 ? `
    <nav class="kategoriler" aria-label="Kategoriler">${gruplar.map((g) => `<a href="#${esc(g.k.ad)}">${esc(g.k.baslik)}<span>${g.egitimler.length}</span></a>`).join("")}</nav>` : "";

  liste.innerHTML = nav + gruplar.map((g) => `
    <section class="kategori" id="${esc(g.k.ad)}" aria-labelledby="k-${esc(g.k.ad)}">
      <h2 id="k-${esc(g.k.ad)}">${esc(g.k.baslik)}<span class="sayi">${g.egitimler.length} eğitim</span></h2>
      <ul class="egitimler">${g.egitimler.map(kart).join("")}
      </ul>
    </section>`).join("");
})();
