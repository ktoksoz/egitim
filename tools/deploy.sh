#!/bin/sh
# Ana sayfayı DreamHost'a yükle. Kullanım: tools/deploy.sh [KULLANICI@SUNUCU]  (varsayılan: koray@koraytoksoz.com)
# CSS/JS sürüm etiketini (?v=...) tarih-saatle yeniler, sonra yalnızca değişen dosyaları gönderir.
# Sunucudaki dosyaları silmez (--delete yok): eğitimler aynı klasörün alt klasörlerinde durur.
# Eğitimlerin kendisi için: tools/deploy-egitimler.sh
set -e
HOST="${1:-koray@koraytoksoz.com}"
cd "$(dirname "$0")/.."
ssh "$HOST" 'test -d ~/egitim.koraytoksoz.com' || {
  echo "Sunucuda ~/egitim.koraytoksoz.com yok. DreamHost panelinde egitim.koraytoksoz.com'u Fully Hosted + ücretsiz HTTPS olarak ekleyin."; exit 1; }
V=$(date +%Y%m%d%H%M)
sed -i '' -E "s/\?v=[0-9]+\"/?v=$V\"/g" index.html
echo "Sürüm etiketi: $V"
rsync -avz \
  --exclude tools --exclude README.md --exclude LICENSE --exclude .DS_Store --exclude .git --exclude .gitignore --exclude node_modules \
  ./ "$HOST:~/egitim.koraytoksoz.com/"
echo "Yüklendi: https://egitim.koraytoksoz.com/"
