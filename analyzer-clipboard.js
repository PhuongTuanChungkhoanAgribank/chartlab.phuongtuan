/* chartlab.phuongtuan — Analyzer Clipboard Paste v1
 * Lets users paste screenshots directly into the existing image-file workflow.
 */
(function enableAnalyzerClipboardPaste(){
  const FILE_SELECTOR = 'input[type="file"][accept*="image"], input[type="file"]';
  let toastTimer = null;
  let enhanceTimer = null;

  injectStyles();
  document.addEventListener('paste', handlePaste, true);

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scheduleEnhance();

  function handlePaste(event){
    const item = findImageClipboardItem(event.clipboardData);
    if(!item) return;

    const input = findAnalyzerFileInput();
    if(!input){
      showToast('Mở trang “Phân tích chart” rồi dán ảnh lại.', 'warning');
      return;
    }

    const sourceFile = item.getAsFile();
    if(!sourceFile) return;

    event.preventDefault();
    const file = normalizeClipboardFile(sourceFile);

    try{
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      pulseUploadArea(input);
      showToast('Đã dán ảnh chart từ clipboard ✓', 'success');
    }catch(error){
      console.warn('[ChartLab] Clipboard paste fallback failed:', error);
      showToast('Trình duyệt chưa cho phép dán ảnh vào ô upload. Hãy kéo/thả ảnh.', 'warning');
    }
  }

  function findImageClipboardItem(clipboardData){
    if(!clipboardData?.items) return null;
    return Array.from(clipboardData.items).find(item => item.kind === 'file' && /^image\//i.test(item.type));
  }

  function findAnalyzerFileInput(){
    const inputs = Array.from(document.querySelectorAll(FILE_SELECTOR));
    if(!inputs.length) return null;

    // Prefer an image input inside the current Analyzer UI.
    return inputs.find(input => {
      const region = input.closest('main, section, form, label, div');
      const text = region?.textContent || '';
      return /ảnh chart|phân tích chart|png\s*·\s*jpg|webp/i.test(text);
    }) || inputs[0];
  }

  function normalizeClipboardFile(file){
    const type = file.type || 'image/png';
    const ext = type.includes('jpeg') ? 'jpg' : type.includes('webp') ? 'webp' : 'png';
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    try{
      return new File([file], `chart-paste-${stamp}.${ext}`, {
        type,
        lastModified: Date.now()
      });
    }catch{
      return file;
    }
  }

  function scheduleEnhance(){
    clearTimeout(enhanceTimer);
    enhanceTimer = setTimeout(enhanceUploadCopy, 60);
  }

  function enhanceUploadCopy(){
    replaceLeafText('Kéo hoặc chọn ảnh chart', 'Kéo, chọn hoặc dán ảnh chart');
    replaceLeafText('PNG · JPG · WEBP', 'PNG · JPG · WEBP · Ctrl/Cmd+V');

    const input = findAnalyzerFileInput();
    if(!input) return;
    const host = input.closest('label') || input.parentElement;
    if(!host || host.querySelector('.chartlab-paste-tip')) return;

    const tip = document.createElement('div');
    tip.className = 'chartlab-paste-tip';
    tip.innerHTML = '<kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>V</kbd><span>Dán ảnh vừa chụp — không cần lưu file</span>';
    host.appendChild(tip);
  }

  function replaceLeafText(from, to){
    const nodes = document.querySelectorAll('h1,h2,h3,h4,p,span,small,b,strong,div');
    for(const node of nodes){
      if(node.children.length === 0 && node.textContent.trim() === from){
        node.textContent = to;
      }
    }
  }

  function pulseUploadArea(input){
    const area = findUploadArea(input);
    if(!area) return;
    area.classList.remove('chartlab-paste-flash');
    void area.offsetWidth;
    area.classList.add('chartlab-paste-flash');
    setTimeout(()=>area.classList.remove('chartlab-paste-flash'), 900);
  }

  function findUploadArea(input){
    let node = input.parentElement;
    for(let i=0; node && i<6; i++, node=node.parentElement){
      if(/kéo|chọn ảnh|ảnh chart|png|webp/i.test(node.textContent || '')) return node;
    }
    return input.parentElement;
  }

  function showToast(message, type){
    let toast = document.getElementById('chartlab-clipboard-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'chartlab-clipboard-toast';
      document.body.appendChild(toast);
    }
    toast.className = `chartlab-clipboard-toast ${type || ''} show`;
    toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 2600);
  }

  function injectStyles(){
    if(document.getElementById('chartlab-clipboard-style')) return;
    const style = document.createElement('style');
    style.id = 'chartlab-clipboard-style';
    style.textContent = `
      .chartlab-paste-tip{margin-top:14px;display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;color:#8fa4c2;font-size:12px;line-height:1.4;pointer-events:none}
      .chartlab-paste-tip span{margin-left:5px;color:#7187a7}
      .chartlab-paste-tip kbd{padding:2px 6px;border:1px solid #31445f;border-bottom-color:#526987;border-radius:5px;background:#0c1728;color:#d9e4f3;font:600 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;box-shadow:0 1px 0 rgba(255,255,255,.05)}
      .chartlab-paste-flash{animation:chartlabPasteFlash .9s ease}
      @keyframes chartlabPasteFlash{0%{box-shadow:0 0 0 0 rgba(247,162,31,.55)}45%{box-shadow:0 0 0 5px rgba(247,162,31,.18)}100%{box-shadow:0 0 0 0 rgba(247,162,31,0)}}
      .chartlab-clipboard-toast{position:fixed;right:24px;bottom:24px;z-index:99999;max-width:min(420px,calc(100vw - 32px));padding:12px 16px;border:1px solid #34455e;border-radius:10px;background:#0d1727;color:#e8eef7;font-size:13px;font-weight:650;box-shadow:0 16px 38px rgba(0,0,0,.36);opacity:0;transform:translateY(12px);pointer-events:none;transition:.2s ease}
      .chartlab-clipboard-toast.show{opacity:1;transform:translateY(0)}
      .chartlab-clipboard-toast.success{border-color:#1f765d;color:#bff6dd}
      .chartlab-clipboard-toast.warning{border-color:#8a6520;color:#ffe1a3}
      @media(max-width:720px){.chartlab-clipboard-toast{right:16px;bottom:16px}.chartlab-paste-tip span{width:100%;text-align:center;margin-left:0}}
    `;
    document.head.appendChild(style);
  }
})();