#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"
rm -rf _site
mkdir -p _site/data
cp index.html styles.css config.js manifest.webmanifest icon.svg .nojekyll _site/
cat chunks/app.js.part* > _site/app.js
cp data/*.js _site/data/
echo "Built ChartLab static artifact in $ROOT_DIR/_site/"
