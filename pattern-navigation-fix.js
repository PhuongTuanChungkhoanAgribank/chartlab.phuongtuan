/* ChartLab — pattern preview navigation reliability patch
 * Fixes hover-preview buttons that disappear before the click reaches the router.
 */
(function patternNavigationFix(){
  function normalize(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim(); }

  function patternIdFromText(text){
    const hay=normalize(text);
    const list=window.CHARTLAB_PATTERNS||[];
    const hit=list.find(p=>{
      const names=[p.id,p.name,p.enName,p.viName,p.title].filter(Boolean).map(normalize);
      return names.some(n=>n && hay.includes(n));
    });
    return hit?.id || null;
  }

  function routeFromElement(el){
    if(!el) return null;
    const direct=el.getAttribute?.('data-nav') || el.closest?.('[data-nav]')?.getAttribute('data-nav');
    if(direct) return direct;

    const href=el.getAttribute?.('href') || el.closest?.('a[href]')?.getAttribute('href');
    if(href && href.includes('#/')) return href.split('#')[1];

    // Walk upward because the hover preview does not use a stable public class.
    let node=el;
    for(let i=0;i<9 && node;i++,node=node.parentElement){
      const id=patternIdFromText(node.textContent||'');
      if(id) return '/pattern/'+id;
    }

    // Fallback: the source card is usually still :hover when pointerdown fires.
    const hovered=[...document.querySelectorAll(':hover')].reverse();
    for(const h of hovered){
      const id=patternIdFromText(h.textContent||'');
      if(id) return '/pattern/'+id;
    }
    return null;
  }

  function navigate(route){
    if(!route) return false;
    const clean=route.startsWith('#') ? route.slice(1) : route;
    const next='#'+(clean.startsWith('/') ? clean : '/'+clean);
    if(location.hash===next){
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }else{
      location.hash=next;
    }
    return true;
  }

  function isDetailTrigger(el){
    const btn=el.closest?.('button,a,[role="button"]');
    if(!btn) return null;
    const label=(btn.textContent||'').trim().toLowerCase();
    return label.includes('xem chi tiết') ? btn : null;
  }

  function handle(ev){
    const btn=isDetailTrigger(ev.target);
    if(!btn) return;

    // Hammer is the only pattern currently using a custom lesson overlay.
    // Route it explicitly so the preview does not depend on legacy metadata.
    let node=btn;
    let hammer=false;
    for(let i=0;i<9 && node;i++,node=node.parentElement){
      const txt=(node.textContent||'');
      if(txt.includes('Hammer') && txt.includes('Cây Búa')){
        hammer=true;
        break;
      }
    }

    const route=hammer ? '/pattern/hammer' : routeFromElement(btn);
    if(!route) return;
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    navigate(route);
  }

  // pointerdown fires before a hover popover can vanish on mouseleave.
  document.addEventListener('pointerdown',handle,true);
  document.addEventListener('click',handle,true);

  window.CHARTLAB_PATTERN_NAV_FIX={version:'1.0.0',navigate,routeFromElement};
})();