// chartlab.phuongtuan runtime config
// 1) Deploy frontend first with apiEndpoint="" -> Demo mode.
// 2) Deploy Cloudflare Worker, then paste its /analyze URL here and push again.
// Expected GitHub Pages URL: https://phuongtuanchungkhoanagribank.github.io/chartlab.phuongtuan/
// Never place OPENAI_API_KEY or AI_ACCESS_CODE in this file.
window.CHARTLAB_CONFIG = {
  apiEndpoint: "",
  allowDemoFallback: true
};
