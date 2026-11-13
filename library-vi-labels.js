/* ChartLab — Vietnamese library labels */
(function(){
  const replacements = [
    [/^(\d+)\s*CANDLE\s*·\s*NEUTRAL$/i, '$1 NẾN · TRUNG TÍNH'],
    [/^(\d+)\s*CANDLE\s*·\s*BULLISH\s*REVERSAL$/i, '$1 NẾN · ĐẢO CHIỀU TĂNG'],
    [/^(\d+)\s*CANDLE\s*·\s*BEARISH\s*REVERSAL$/i, '$1 NẾN · ĐẢO CHIỀU GIẢM'],
    [/^(\d+)\s*CANDLE\s*·\s*BULLISH$/i, '$1 NẾN · TĂNG GIÁ'],
    [/^(\d+)\s*CANDLE\s*·\s*BEARISH$/i, '$1 NẾN · GIẢM GIÁ'],
    [/^Verified$/i, 'Đã kiểm định'],
    [/^CORE$/i, 'CỐT LÕI'],
    [/^INTERMEDIATE$/i, 'TRUNG CẤP'],
    [/^ADVANCED$/i, 'NÂNG CAO'],
    [/^CONTEXT$/i, 'BỐI CẢNH']
  ];

  function translateText(text){
    const trimmed=text.trim();
    for(const [re,to] of replacements){
      if(re.test(trimmed)) return text.replace(trimmed,trimmed.replace(re,to));
    }
    return text;
  }
  function patch(root=document.getElementById('app')){
    if(!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    for(const node of nodes){
      const next=translateText(node.nodeValue||'');
      if(next!==node.nodeValue) node.nodeValue=next;
    }
  }
  let queued=false;
  function schedule(){
    if(queued) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;patch();});
  }
  document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('hashchange',schedule);
  new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  schedule();
})();