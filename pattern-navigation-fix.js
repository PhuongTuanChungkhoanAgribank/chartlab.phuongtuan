/* ChartLab — Hammer preview route patch
 * Keep the app's native delegated router. We only add the correct data-nav
 * to Hammer's hover-preview button and never intercept the click.
 */
(function hammerPreviewRoutePatch(){
  function patch(){
    const buttons=[...document.querySelectorAll('button,a,[role="button"]')]
      .filter(el => (el.textContent||'').trim().toLowerCase().includes('xem chi tiết'));

    for(const btn of buttons){
      let node=btn;
      let isHammer=false;
      for(let i=0;i<9 && node;i++,node=node.parentElement){
        const txt=(node.textContent||'');
        if(txt.includes('Hammer') && txt.includes('Cây Búa')){
          isHammer=true;
          break;
        }
      }
      if(isHammer){
        btn.setAttribute('data-nav','/pattern/hammer');
        if(btn.tagName==='A') btn.setAttribute('href','#/pattern/hammer');
      }
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
  document.addEventListener('mouseover',schedule,{passive:true});
  new MutationObserver(schedule).observe(document.documentElement,{
    subtree:true,childList:true
  });
  schedule();

  window.CHARTLAB_PATTERN_NAV_FIX={version:'2.0.0',patch};
})();