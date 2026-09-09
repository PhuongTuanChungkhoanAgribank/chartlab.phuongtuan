#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"
rm -rf _site
mkdir -p _site/data
cp index.html config.js manifest.webmanifest icon.svg .nojekyll _site/
cat srcchunks/styles.css.part* > _site/styles.css
cat srcchunks/app.js.part* > _site/app.js
cat srcchunks/data__patterns.js.part* > _site/data/patterns.js
cat srcchunks/data__price-action.js.part* > _site/data/price-action.js
cat srcchunks/data__chart-patterns.js.part* > _site/data/chart-patterns.js
cat srcchunks/data__volume-principles.js.part* > _site/data/volume-principles.js
cat srcchunks/data__wyckoff.js.part* > _site/data/wyckoff.js
node --check _site/app.js
node --check _site/data/patterns.js
node --check _site/data/price-action.js
node --check _site/data/chart-patterns.js
node --check _site/data/volume-principles.js
node --check _site/data/wyckoff.js
echo "Built ChartLab static artifact in $ROOT_DIR/_site/"
