$ErrorActionPreference = "Stop"

$SourceUrl = if ($env:SOURCE_URL) { $env:SOURCE_URL } else { "https://d3h5h54wint40o.cloudfront.net/index.html" }
$SourceDomain = if ($env:SOURCE_DOMAIN) { $env:SOURCE_DOMAIN } else { "d3h5h54wint40o.cloudfront.net" }
$RawRoot = if ($env:RAW_ROOT) { $env:RAW_ROOT } else { "source-mirror/raw" }

wget `
  --mirror `
  --page-requisites `
  --adjust-extension `
  --span-hosts `
  --domains $SourceDomain `
  --no-parent `
  --execute robots=off `
  --directory-prefix $RawRoot `
  $SourceUrl

node tools/crawl/generate-manifests.mjs
