const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: !!process.env.ANALYZE
});
module.exports = withBundleAnalyzer();
