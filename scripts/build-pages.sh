#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

rm -rf _site
mkdir -p _site/data
cp index.html config.js manifest.webmanifest icon.svg .nojekyll _site/

restore() {
  local bundle="$1" out="$2"
  shopt -s nullglob
  local parts=(b64chunks/"${bundle}".gz.b64.part*)
  shopt -u nullglob
  if [ ${#parts[@]} -eq 0 ]; then
    echo "ERROR: missing bundle parts for ${bundle}" >&2
    exit 1
  fi
  cat "${parts[@]}" | base64 -d | gzip -dc > "$out"
}

restore styles.css _site/styles.css
restore app.js _site/app.js
restore patterns.js _site/data/patterns.js
restore price-action.js _site/data/price-action.js
restore chart-patterns.js _site/data/chart-patterns.js
restore volume-principles.js _site/data/volume-principles.js
restore wyckoff.js _site/data/wyckoff.js

cat > /tmp/chartlab-sha256.txt <<'EOF'
37ce4e33853beb8cfaaab15ce8de9516378b3ba72c842e9980645f3c296b71b5  _site/app.js
7f7e2659657d6dd0d073694c0aade2a14d233df40847454eb1fc3a49db07379d  _site/styles.css
f3a4bf40f2d76ea59774654fddcc6e7d1c426434be625470bd0e8e70df58f234  _site/data/patterns.js
bb3d4a4f696607f5317400346b669a47ea22f3e05aec3e5e3734b2ad096a9a76  _site/data/price-action.js
7115be8f1c06ad2fb319ba5f99eff1fc41ad3f0a7db064791cdd7caf43dbb8e8  _site/data/chart-patterns.js
fa6228159088d92084511e3414d07cba5a1db0fa83e602307436dba6ee3eee0d  _site/data/volume-principles.js
58902b7200ce2c3ad20be51c06d480a4675087e62c4f19217b9a435d3180f567  _site/data/wyckoff.js
EOF
sha256sum -c /tmp/chartlab-sha256.txt

node --check _site/app.js
node --check _site/data/patterns.js
node --check _site/data/price-action.js
node --check _site/data/chart-patterns.js
node --check _site/data/volume-principles.js
node --check _site/data/wyckoff.js

echo "Built ChartLab static artifact in $ROOT_DIR/_site/"
