#!/bin/bash
# Convert hero videos into web-optimized H.264, H.265, VP9, AV1 + mobile + poster.
# Run from project root: ./scripts/convert-hero-videos.sh

set -e

FFMPEG="$HOME/.local/bin/ffmpeg"
PUBLIC="solitaire-website/public"

# Inputs (already in public/)
INTRO_IN="$PUBLIC/hero-intro-source.mp4"     # 4K, 5s — plays first
AMBIENT_IN="$PUBLIC/hero-video.mp4"          # 1080p, 18.8s — loops

echo "==============================================="
echo "Hero Video Premium Conversion Pipeline"
echo "==============================================="

convert_video () {
  local IN="$1"          # input path
  local BASE="$2"        # output basename (e.g. hero-intro)

  echo ""
  echo "▶ Converting: $IN  →  $BASE"

  echo "  [1/6] H.264 1080p (universal) ..."
  "$FFMPEG" -hide_banner -loglevel error -y -i "$IN" \
    -c:v libx264 -crf 18 -preset slow \
    -movflags +faststart -an \
    -vf "scale=1920:-2" -pix_fmt yuv420p \
    "$PUBLIC/${BASE}-h264.mp4"

  echo "  [2/6] H.265 1080p (Safari/Apple) ..."
  "$FFMPEG" -hide_banner -loglevel error -y -i "$IN" \
    -c:v libx265 -crf 22 -preset slow \
    -tag:v hvc1 -movflags +faststart -an \
    -vf "scale=1920:-2" -pix_fmt yuv420p \
    "$PUBLIC/${BASE}-h265.mp4"

  echo "  [3/6] WebM VP9 1080p (Chrome/Firefox) ..."
  "$FFMPEG" -hide_banner -loglevel error -y -i "$IN" \
    -c:v libvpx-vp9 -crf 30 -b:v 0 \
    -deadline good -cpu-used 2 -row-mt 1 -an \
    -vf "scale=1920:-2" -pix_fmt yuv420p \
    "$PUBLIC/${BASE}.webm"

  echo "  [4/6] AV1 1080p (cutting-edge Chrome) ..."
  "$FFMPEG" -hide_banner -loglevel error -y -i "$IN" \
    -c:v libaom-av1 -crf 32 -b:v 0 \
    -cpu-used 6 -row-mt 1 -tiles 2x2 -an \
    -vf "scale=1920:-2" -pix_fmt yuv420p \
    "$PUBLIC/${BASE}-av1.mp4"

  echo "  [5/6] H.264 720p (mobile) ..."
  "$FFMPEG" -hide_banner -loglevel error -y -i "$IN" \
    -c:v libx264 -crf 23 -preset slow \
    -movflags +faststart -an \
    -vf "scale=1280:-2" -pix_fmt yuv420p \
    "$PUBLIC/${BASE}-mobile.mp4"

  echo "  [6/6] Poster frame (WebP) ..."
  "$FFMPEG" -hide_banner -loglevel error -y -i "$IN" \
    -ss 00:00:01 -frames:v 1 \
    -vf "scale=1920:-2" -q:v 90 \
    "$PUBLIC/${BASE}-poster.webp"

  echo "  ✓ Done: $BASE"
}

convert_video "$INTRO_IN"   "hero-intro"
convert_video "$AMBIENT_IN" "hero-ambient"

echo ""
echo "==============================================="
echo "All conversions complete. File sizes:"
echo "==============================================="
ls -lh "$PUBLIC"/hero-intro-* "$PUBLIC"/hero-ambient-* "$PUBLIC"/hero-intro.webm "$PUBLIC"/hero-ambient.webm 2>/dev/null
