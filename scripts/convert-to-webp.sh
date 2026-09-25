#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") <file-or-directory>"
  echo "Converts images to .webp using cwebp at quality 100."
  echo
  echo "Notes:"
  echo "  - Requires 'cwebp' (macOS: brew install webp)"
  echo "  - Supported inputs: jpg, jpeg, png, tiff, gif, bmp"
  echo "  - Skips files already ending in .webp"
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: 'cwebp' not found. Install it first (e.g., 'brew install webp' on macOS)." >&2
  exit 1
fi

TARGET=$1
QUALITY=100

convert_file() {
  local input=$1

  # Lowercase extension
  local ext_lower
  ext_lower="$(printf '%s' "${input##*.}" | tr '[:upper:]' '[:lower:]')"

  case "$ext_lower" in
    webp)
      echo "Skipping (already .webp): $input"
      return 0
      ;;
    jpg|jpeg|png|tiff|gif|bmp)
      ;;
    *)
      echo "Skipping (unsupported): $input"
      return 0
      ;;
  esac

  local dir base out
  dir="$(dirname "$input")"
  base="$(basename "$input")"
  base="${base%.*}"
  out="$dir/$base.webp"

  if [[ -f "$out" && "$out" -nt "$input" ]]; then
    echo "Up-to-date: $out"
    return 0
  fi

  echo "Converting: $input -> $out"
  cwebp -q "$QUALITY" "$input" -o "$out" >/dev/null
}

if [[ -d "$TARGET" ]]; then
  # Recursively find supported images and convert them
  find "$TARGET" -type f \( \
    -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o \
    -iname "*.tiff" -o -iname "*.gif" -o -iname "*.bmp" \
  \) -print0 | while IFS= read -r -d '' file; do
    convert_file "$file"
  done
elif [[ -f "$TARGET" ]]; then
  convert_file "$TARGET"
else
  echo "Error: Path not found: $TARGET" >&2
  exit 1
fi


