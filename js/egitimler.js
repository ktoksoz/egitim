/* Bütün eğitimlerin listesi: ana sayfadaki kartlar bu dosyadan kurulur.
   Yeni eğitim için bir satır ekleyin. ad: egitim.koraytoksoz.com/<ad>/ klasörü ve img/kapak/<ad>.jpg görseli,
   slayt ve sure (anlatım seslerinin toplamı, saniye) ölçülerek yazılır: node tools/kapak.js <port> <ad>
   kategori: KATEGORILER'deki ad; kartlar kategorilerin altında, bu listedeki sırayla dizilir. */
window.KATEGORILER = [
  { ad: "teknoloji", baslik: "Teknoloji" },
  { ad: "muzik", baslik: "Müzik" },
  { ad: "felsefe", baslik: "Felsefe" },
];

window.EGITIMLER = [
  { ad: "yz", kategori: "teknoloji", baslik: "Nörondan Dil Modeline", alt: "Yapay zekâ ve sinir ağları", aciklama: "Bir beyin hücresinin mikroskop altındaki ilk çiziminden sohbet eden dil modellerine: uzman sistemler, tek bir nöronun öğrenmesi, XOR duvarı, rakam tanıyan bir ağ ve büyük dil modelleri.", slayt: 31, sure: 951, depo: "ktoksoz/noron-dil-modeli" },
  { ad: "elektronik", kategori: "teknoloji", baslik: "Elektrondan Bilgisayara", alt: "Elektronik ve bilgisayarın temelleri", aciklama: "Bir pil, bir direnç ve bir LED'den transistörlere, mantık kapılarına, hafızaya ve program çalıştıran basit bir bilgisayara. Her sayfada canlı bir devre var.", slayt: 56, sure: 2065, depo: "ktoksoz/elektrondan-bilgisayara" },
  { ad: "sdr", kategori: "teknoloji", baslik: "Dalgadan Sayıya", alt: "Yazılım tanımlı radyo ve IQ verisi", aciklama: "Bir radyo istasyonunun sesi nasıl sayılara dönüşür, sayılardan nasıl yeniden sese döner? Örneklemeden I ve Q'ya, spektrumdan alıcının içine ve modülasyona.", slayt: 35, sure: 1091, depo: "ktoksoz/dalgadan-sayiya" },
  { ad: "anten", kategori: "teknoloji", baslik: "Kablodan Boşluğa", alt: "Antenler, iletim hatları ve empedans", aciklama: "Kablodaki dalgadan yansımaya, Smith abağında empedans uydurmaktan antenin dalgayı boşluğa salmasına. Arka plandaki alanlar çizim değil, canlı hesap.", slayt: 35, sure: 1192, depo: "ktoksoz/anten-iletim-hatti" },
  { ad: "muzik", kategori: "muzik", baslik: "Titreşimden Şarkıya", alt: "Müzik teorisi", aciklama: "Havadaki bir kıpırtı nasıl ezgiye, akora ve ritme dönüşür? Sesin fiziğinden makamlara, beşliler çemberinden aksak usullere; her slaytta dinleyip çalarak.", slayt: 38, sure: 1138, depo: "ktoksoz/titresimden-sarkiya" },
  { ad: "gitar", kategori: "muzik", baslik: "Telden Şarkıya", alt: "Gitarı sıfırdan öğrenmek", aciklama: "Akorttan ilk akorlara, strum desenlerinden klavyedeki notalara, pentatonik kutulardan CAGED sistemine. Tarayıcıda çalan bir gitar, mikrofonlu akort aleti ve her gün dönülecek çalışma araçları.", slayt: 43, sure: 1450, depo: "ktoksoz/telden-sarkiya" },
  { ad: "klarnet", kategori: "muzik", baslik: "Nefesten Taksime", alt: "Türk müziğinde Sol klarnet", aciklama: "İlk sesten parmak pozisyonlarına, koma perdelerinden makamlara ve usullere, oradan Gamzedeyim'e ve taksime. Fiziksel modelle çalan bir klarnet, koma akort aleti ve usul metronomu.", slayt: 41, sure: 1181, depo: "ktoksoz/nefesten-taksime" },
  { ad: "san", kategori: "muzik", baslik: "Mırıltıdan Ezgiye", alt: "Şan ve doğru perdede söylemek", aciklama: "Sesin nasıl çıktığından nefese ve ısınmaya, perde eşlemeden ses aralığına, vibratodan makam perdelerine. Mikrofonla sesiniz nota defterine çizilir; ses hiçbir yere gönderilmez.", slayt: 43, sure: 1200, depo: "ktoksoz/miriltidan-ezgiye" },
  { ad: "felsefe", kategori: "felsefe", baslik: "Bilgelik Sevgisi", alt: "Felsefe tarihi ve büyük sorular", aciklama: "Milet kıyısında sorulan bir sorudan bugünün yapay zekâ tartışmalarına: kronolojik bir zaman yolculuğu ve kendi sezginizi sınayan düşünce deneyleri.", slayt: 68, sure: 1866, depo: "ktoksoz/felsefe" },
];
