const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: !!process.env.ANALYZE
});
const withSourceMaps = require("@zeit/next-source-maps")();

module.exports = withBundleAnalyzer(withSourceMaps());
