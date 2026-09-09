#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"
rm -rf _site
mkdir -p _site/data
cp index.html styles.css app.js config.js manifest.webmanifest icon.svg .nojekyll _site/
cp data/*.js data/*.json _site/data/
echo "Built ChartLab static artifact in $ROOT_DIR/_site/"
