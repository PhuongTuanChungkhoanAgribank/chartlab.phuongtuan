// chartlab.phuongtuan runtime config
// AI Live runs through Cloudflare Workers AI (free-tier first).
// The frontend never stores provider credentials.
window.CHARTLAB_CONFIG = {
  apiEndpoint: "https://chartlab-phuongtuan-ai.tuanntp0407.workers.dev/analyze",
  allowDemoFallback: true
};
