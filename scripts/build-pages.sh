#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"
rm -rf _site
mkdir -p _site/data
cp index.html config.js manifest.webmanifest icon.svg .nojekyll _site/
restore(){ cat b64chunks/$1.gz.b64.part* | base64 -d | gzip -dc > "$2"; }
restore styles.css _site/styles.css
restore app.js _site/app.js
restore data__patterns.js _site/data/patterns.js
restore data__price-action.js _site/data/price-action.js
restore data__chart-patterns.js _site/data/chart-patterns.js
restore data__volume-principles.js _site/data/volume-principles.js
restore data__wyckoff.js _site/data/wyckoff.js
node --check _site/app.js
node --check _site/data/patterns.js
node --check _site/data/price-action.js
node --check _site/data/chart-patterns.js
node --check _site/data/volume-principles.js
node --check _site/data/wyckoff.js
echo "Built ChartLab static artifact in $ROOT_DIR/_site/"
