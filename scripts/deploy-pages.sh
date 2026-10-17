#!/usr/bin/env bash
# Publish app/ to the gh-pages branch (GitHub Pages, branch source). Run from the repo root after committing.
set -euo pipefail
cd "$(dirname "$0")/.."
git diff --quiet && git diff --cached --quiet || { echo "commit your changes first"; exit 1; }
rm -f app/artifact-index.html.tmp
git branch -D gh-pages 2>/dev/null || true
git subtree split --prefix app -b gh-pages >/dev/null
git push -f origin gh-pages
git branch -D gh-pages
echo "published: https://okaynowhat.github.io/kukeseen/"
