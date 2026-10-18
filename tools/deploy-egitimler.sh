#!/bin/bash
# Eğitimleri kendi yerel klasörlerinden ~/egitim.koraytoksoz.com/<ad>/ klasörlerine kopyalar.
# Kullanım:
#   tools/deploy-egitimler.sh [KULLANICI@SUNUCU] [ad ...]     (varsayılan: koray@koraytoksoz.com, bütün eğitimler)
#   tools/deploy-egitimler.sh --yerel KLASÖR [ad ...]          (sunucu yerine yerel bir klasöre; deneme için)
# Her eğitimin dışlama listesi kendi tools/deploy.sh betiğinden okunur. Sunucudaki dosyaları silmez (--delete yok).
# Commit edilmemiş değişikliği olan eğitim atlanır: yarım iş yayına çıkmasın.
# (Yalnızca --yerel ile denerken KIRLI_DE=1 bu denetimi kapatır.)
# Sürüm etiketine (?v=) dokunmaz: eğitimin son commit'teki index.html'i olduğu gibi gider.
set -e
cd "$(dirname "$0")/.."
KOK="$(cd .. && pwd)"

# ad:yerel klasör (bu deponun bir üst klasörüne göre). Yeni eğitim için bir öğe ekleyin.
EGITIMLER=(
  yz:yz_whatis
  muzik:music_theory
  klarnet:klarnet
  sdr:sdr
  anten:anten
  elektronik:elektronik
  felsefe:felsefe
)

YEREL=""
HOST="koray@koraytoksoz.com"
if [ "$1" = "--yerel" ]; then YEREL="$2"; shift 2; [ -n "$YEREL" ] || { echo "--yerel bir klasör ister"; exit 1; }
elif [ -n "$1" ] && [[ "$1" == *@* ]]; then HOST="$1"; shift; fi
SECILEN=" $* "

if [ -z "$YEREL" ]; then
  DURUM=$(ssh "$HOST" 'test -d ~/egitim.koraytoksoz.com && echo var || echo yok') || {
    echo "Sunucuya bağlanılamadı ($HOST). SSH anahtarını / ajanını kontrol edin."; exit 1; }
  [ "$DURUM" = var ] || {
    echo "Sunucuda ~/egitim.koraytoksoz.com yok. DreamHost panelinde egitim.koraytoksoz.com'u Fully Hosted + ücretsiz HTTPS olarak ekleyin."; exit 1; }
fi

YUKLENEN=(); ATLANAN=()
for e in "${EGITIMLER[@]}"; do
  ad="${e%%:*}"; klasor="$KOK/${e#*:}"
  [ "$SECILEN" = "  " ] || [[ "$SECILEN" == *" $ad "* ]] || continue
  if [ ! -f "$klasor/index.html" ]; then echo "UYARI: $ad atlandı: $klasor/index.html yok"; ATLANAN+=("$ad (klasör yok)"); continue; fi
  if [ -n "$(git -C "$klasor" status --porcelain)" ] && ! { [ -n "$YEREL" ] && [ "$KIRLI_DE" = 1 ]; }; then
    echo "UYARI: $ad atlandı: commit edilmemiş değişiklik var:"; git -C "$klasor" status --short | sed 's/^/    /'
    ATLANAN+=("$ad (commit edilmemiş değişiklik)"); continue
  fi
  # eğitimin kendi deploy.sh'indeki --exclude listesi + her zaman dışarıda kalanlar
  HARIC=(--exclude .git --exclude .DS_Store --exclude .claude --exclude node_modules)
  for x in $(grep -oE -- '--exclude [^ \\]+' "$klasor/tools/deploy.sh" | awk '{print $2}'); do HARIC+=(--exclude "$x"); done
  echo "== $ad ← $klasor ($(git -C "$klasor" log -1 --format='%h %s'))"
  if [ -n "$YEREL" ]; then
    mkdir -p "$YEREL/$ad"
    rsync -a "${HARIC[@]}" "$klasor/" "$YEREL/$ad/"
  else
    ssh "$HOST" "mkdir -p ~/egitim.koraytoksoz.com/$ad"
    rsync -avz "${HARIC[@]}" "$klasor/" "$HOST:~/egitim.koraytoksoz.com/$ad/"
  fi
  YUKLENEN+=("$ad")
done

echo
echo "Yüklenen: ${YUKLENEN[*]:-yok}"
if [ ${#ATLANAN[@]} -gt 0 ]; then printf 'Atlanan: %s\n' "${ATLANAN[@]}"; exit 2; fi
