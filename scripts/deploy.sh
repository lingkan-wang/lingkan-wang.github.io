#!/usr/bin/env bash
# Publish the portfolio to GitHub Pages.
#
# Builds the static export and pushes it to the `gh-pages` branch of
# lingkan-wang/lingkan-wang.github.io (which GitHub Pages serves at
# https://lingkan-wang.github.io/). Run this after committing content/code
# changes to main — the site refreshes ~1 min after the push.
#
# Self-contained: uses a throwaway shallow clone so it never touches the
# main working tree's branches or worktrees, and never force-pushes.
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="https://github.com/lingkan-wang/lingkan-wang.github.io.git"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "▶ Building static export…"
STATIC_EXPORT=1 npm run build
touch out/.nojekyll
rm -rf out/.git

echo "▶ Cloning gh-pages…"
git clone -q --depth 1 -b gh-pages "$REPO" "$TMP/ghp"

echo "▶ Syncing build output…"
rsync -a --delete --exclude '.git' out/ "$TMP/ghp/"

cd "$TMP/ghp"
git add -A
if git diff --cached --quiet; then
  echo "✓ No changes to deploy."
else
  git -c user.email="lyuxing@safeworld.ai" -c user.name="Lingkan Wang" \
    commit -q -m "deploy: $(date -u +%FT%TZ)"
  git push -q origin gh-pages
  echo "✓ Pushed to gh-pages — live in ~1 min at https://lingkan-wang.github.io/"
fi
