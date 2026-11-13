/* Runtime contrast fix for the dark live-learning preview.
 * Uses rendered text so it is independent of legacy class names.
 */
(function(){
  const WHITE="#ffffff";
  const SUB="#cbd5e1";
  const COPY="#cbd5e1";
  const BLUE="#93c5fd";

  function setColor(el,color,weight){
    if(!el || !el.style) return;
    el.style.setProperty("color",color,"important");
    el.style.setProperty("opacity","1","important");
    if(weight) el.style.setProperty("font-weight",weight,"important");
  }

  function findExact(root,text){
    const all=root.querySelectorAll("*");
    for(const el of all){
      if((el.textContent||"").trim()===text) return el;
    }
    return null;
  }

  function patch(){
    const markers=[...document.querySelectorAll("*")].filter(el=>
      (el.textContent||"").trim()==="LIVE LEARNING PREVIEW"
    );
    for(const marker of markers){
      let box=marker;
      for(let i=0;i<6 && box;i++,box=box.parentElement){
        const txt=(box.textContent||"");
        if(txt.includes("Hammer") && txt.includes("Cây Búa") && txt.includes("Xem mẫu hình")) break;
      }
      if(!box) continue;

      setColor(findExact(box,"Hammer"),WHITE,"800");
      setColor(findExact(box,"Cây Búa"),SUB,"650");
      setColor(findExact(box,"01 CANDLE · BULLISH REVERSAL"),BLUE,"750");
      setColor(findExact(box,"LIVE LEARNING PREVIEW"),BLUE,"750");

      const desc="Lực bán đẩy giá xuống nhưng bên mua kéo giá trở lại trước khi nến đóng cửa.";
      setColor(findExact(box,desc),COPY,"500");
    }
  }

  let queued=false;
  function schedule(){
    if(queued) return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;patch();});
  }

  document.addEventListener("DOMContentLoaded",schedule);
  window.addEventListener("hashchange",schedule);
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  schedule();
})();