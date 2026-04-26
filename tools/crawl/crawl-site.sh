#!/usr/bin/env bash
set -euo pipefail

SOURCE_URL="${SOURCE_URL:-https://d3h5h54wint40o.cloudfront.net/index.html}"
SOURCE_DOMAIN="${SOURCE_DOMAIN:-d3h5h54wint40o.cloudfront.net}"
RAW_ROOT="${RAW_ROOT:-source-mirror/raw}"

wget \
  --mirror \
  --page-requisites \
  --adjust-extension \
  --span-hosts \
  --domains "${SOURCE_DOMAIN}" \
  --no-parent \
  --execute robots=off \
  --directory-prefix "${RAW_ROOT}" \
  "${SOURCE_URL}"

node tools/crawl/generate-manifests.mjs
