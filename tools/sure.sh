#!/bin/sh
# Bir eğitimin anlatım seslerinin toplam süresini saniye olarak yazar (js/egitimler.js'teki "sure").
# Kullanım: tools/sure.sh <eğitimin yerel klasörü>   (ffprobe gerekir)
[ -d "$1/audio" ] || { echo "Kullanım: tools/sure.sh <klasör>  (klasörde audio/ olmalı)"; exit 1; }
find "$1/audio" -name '*.mp3' -print0 | xargs -0 -n1 ffprobe -v error -show_entries format=duration -of csv=p=0 |
  awk '{ s += $1; n++ } END { printf "%d ses, %.0f sn (%d dk %d sn)\n", n, s, s / 60, s % 60 }'
