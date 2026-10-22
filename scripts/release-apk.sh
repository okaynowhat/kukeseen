#!/usr/bin/env bash
# Build a signed release APK and publish it as a GitHub Release asset.
# Needs android/keystore.properties (symlink to ~/keystores/kukeseen-keystore.properties) and a gh login.
set -euo pipefail
cd "$(dirname "$0")/.."
VER=$(node -p "require('./package.json').version")
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
npx cap sync android >/dev/null
( cd android && ./gradlew assembleRelease --no-daemon -q 2>&1 | grep -v '^Note:' || true )
APK=android/app/build/outputs/apk/release/app-release.apk
test -f "$APK" || { echo "release APK missing"; exit 1; }
mkdir -p dist && cp "$APK" "dist/kukeseen-v$VER.apk" && cp "$APK" dist/kukeseen.apk
# Release notes: what changed (README.md "Status", this version's line and the two before it), then the feature list.
NOTES=dist/release-notes.md
{ echo "## What changed in v$VER"; echo
  awk -v v="v$VER" '/^## Status/{s=1;next} s&&/^## /{exit} !s{next} /^- /{n++; if(index($0,v)&&!k)k=n} k&&n>=k&&n<=k+2{sub(/^- /,"- "); print}' README.md
  echo; cat docs/release-notes.md; } > "$NOTES"
if gh release view "v$VER" >/dev/null 2>&1; then
  gh release upload "v$VER" "dist/kukeseen-v$VER.apk" dist/kukeseen.apk --clobber
  gh release edit "v$VER" --notes-file "$NOTES"
else
  gh release create "v$VER" "dist/kukeseen-v$VER.apk" dist/kukeseen.apk --title "Kukeseen v$VER" --notes-file "$NOTES"
fi
echo "released: https://github.com/okaynowhat/kukeseen/releases/latest/download/kukeseen.apk"
