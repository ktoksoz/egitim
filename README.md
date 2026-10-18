# Eğitimler

**Canlı site: https://egitim.koraytoksoz.com**

Her konuyu, her slaytta elle oynanabilen bir deneyle ve Türkçe sesli anlatımla anlatan ücretsiz, açık kaynaklı sunumların ana sayfası. Hazırlayan: **Koray Toksöz**

*Home page of free, open-source interactive presentations in Turkish with narration. Code: MIT · Content: CC BY 4.0*

## Eğitimler

Her eğitim ayrı bir projedir: kendi deposu, kendi yerel klasörü ve kendi yayın betiği vardır. Bu depo yalnızca ana sayfayı ve yayın betiklerini tutar.

| Adres | Eğitim | Konu | Depo |
|---|---|---|---|
| [/yz/](https://egitim.koraytoksoz.com/yz/) | Nörondan Dil Modeline | Yapay zekâ ve sinir ağları | [noron-dil-modeli](https://github.com/ktoksoz/noron-dil-modeli) |
| [/muzik/](https://egitim.koraytoksoz.com/muzik/) | Titreşimden Şarkıya | Müzik teorisi | [titresimden-sarkiya](https://github.com/ktoksoz/titresimden-sarkiya) |
| [/sdr/](https://egitim.koraytoksoz.com/sdr/) | Dalgadan Sayıya | Yazılım tanımlı radyo ve IQ verisi | [dalgadan-sayiya](https://github.com/ktoksoz/dalgadan-sayiya) |
| [/anten/](https://egitim.koraytoksoz.com/anten/) | Kablodan Boşluğa | Antenler, iletim hatları ve empedans | [anten-iletim-hatti](https://github.com/ktoksoz/anten-iletim-hatti) |
| [/elektronik/](https://egitim.koraytoksoz.com/elektronik/) | Elektrondan Bilgisayara | Elektronik ve bilgisayarın temelleri | [elektrondan-bilgisayara](https://github.com/ktoksoz/elektrondan-bilgisayara) |
| [/felsefe/](https://egitim.koraytoksoz.com/felsefe/) | Bilgelik Sevgisi | Felsefe tarihi ve büyük sorular | [felsefe](https://github.com/ktoksoz/felsefe) |
| [/klarnet/](https://egitim.koraytoksoz.com/klarnet/) | Nefesten Taksime | Türk müziğinde Sol klarnet | [nefesten-taksime](https://github.com/ktoksoz/nefesten-taksime) |

Eski alt alan adları (yz.koraytoksoz.com vb.) bu adreslere yönlendirilir.

## Yapı

```
index.html              ana sayfa (statik; kartlar js/site.js ile kurulur)
js/egitimler.js         eğitimlerin listesi: kartların tek veri kaynağı
js/site.js              kartları listeden kurar
css/site.css            stiller (açık ve karanlık tema)
img/kapak/<ad>.jpg      kapak ekran görüntüleri (1440×860)
img/og.jpg              paylaşım önizlemesi (1200×630)
.htaccess               HTTPS yönlendirmesi, sıkıştırma, önbellek, klasör listeleme kapalı
tools/deploy.sh         ana sayfayı yükler
tools/deploy-egitimler.sh  eğitimleri kendi klasörlerinden /<ad>/ altına yükler
tools/serve.py          yerel sunucu (Range destekli: ses ileri sarma denenebilir)
tools/kapak.js          kapak görüntülerini çeker, slayt sayısını ölçer
tools/sure.sh           anlatım seslerinin toplam süresini ölçer
tools/og.html, og.js    paylaşım görselini üretir
```

Derleme yok, takip ya da çerez yok. Yazı tipi Newsreader (Google Fonts, SIL OFL 1.1).

## Yeni eğitim ekleme

1. Eğitimin kendi `tools/deploy.sh` betiğinin hedefini `~/egitim.koraytoksoz.com/<ad>/` yapın. Eğitim kökten başlayan yol (`/css/…`) kullanmamalı; `localStorage` anahtarlarına `<ad>.` öneki verilmeli.
2. `tools/deploy-egitimler.sh` içindeki `EGITIMLER` listesine `<ad>:<yerel klasör>` ekleyin.
3. Yerelde sunucu yapısını kurun ve sunun:
   ```
   KIRLI_DE=1 tools/deploy-egitimler.sh --yerel /tmp/egitim-site
   rsync -a --exclude tools --exclude .git ./ /tmp/egitim-site/
   python3 tools/serve.py 8813 /tmp/egitim-site
   ```
4. Slayt sayısını ve anlatım süresini ölçün, `js/egitimler.js`'e bir satır ekleyin:
   ```
   tools/sure.sh ../<yerel klasör>                 # sure (saniye)
   NODE_PATH=<playwright-core'un bulunduğu node_modules> node tools/kapak.js 8813 <ad>   # kapak + slayt sayısı
   ```
5. Paylaşım görselini yenilemek isterseniz `tools/og.html`'e kapağı ekleyip `node tools/og.js <port>` çalıştırın (sunucu bu deponun kökünü sunmalı).
6. Yükleyin: `tools/deploy-egitimler.sh <ad>` ve `tools/deploy.sh`.

## Yayınlama

```
tools/deploy.sh                    # ana sayfa → ~/egitim.koraytoksoz.com/
tools/deploy-egitimler.sh          # bütün eğitimler → ~/egitim.koraytoksoz.com/<ad>/
tools/deploy-egitimler.sh yz sdr   # yalnızca seçilenler
```

İkisi de varsayılan olarak `koray@koraytoksoz.com` sunucusunu kullanır ve `--delete` kullanmaz. `deploy-egitimler.sh` her eğitimin dışlama listesini o eğitimin kendi `tools/deploy.sh` betiğinden okur ve commit edilmemiş değişikliği olan eğitimi atlar. Sunucu klasörü `~/egitim.koraytoksoz.com` DreamHost panelinden açılır (Fully Hosted + ücretsiz HTTPS); betikler bu klasör yoksa durur.

## Lisans

| Ne | Lisans |
|---|---|
| Kod (`js/`, `css/`, `tools/`, `index.html` içindeki kod) | MIT |
| İçerik (metinler, kapak görüntüleri, paylaşım görseli) | CC BY 4.0 |
| Creative Commons simgeleri (`img/cc-*.svg`) | Creative Commons, [kullanım koşulları](https://creativecommons.org/policies) |
| Newsreader yazı tipi | SIL OFL 1.1 |

Kapak görüntüleri eğitimlerin kendi sitelerinden alınmıştır; her eğitimin lisansı kendi deposundadır.

Önerilen atıf:

> Koray Toksöz, *Eğitimler*, https://egitim.koraytoksoz.com, CC BY 4.0
