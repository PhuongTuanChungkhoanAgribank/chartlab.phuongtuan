(() => {
  const href = "./market-data.html";
  const style = document.createElement("style");
  style.textContent = `
    .chartlab-market-link{display:inline-flex;align-items:center;gap:7px;padding:9px 12px;border-radius:12px;background:linear-gradient(135deg,#fff0e5,#f0ecff);border:1px solid #eadfff;color:#5c48ca!important;font-weight:800;font-size:13px;text-decoration:none!important;box-shadow:0 7px 20px rgba(70,52,150,.08)}
    .chartlab-market-link:hover{transform:translateY(-1px)}
    .chartlab-market-link .dot{width:8px;height:8px;border-radius:50%;background:#ff8b3d}
    .chartlab-market-float{position:fixed;right:18px;bottom:18px;z-index:80}
    @media(max-width:720px){.chartlab-market-float{right:12px;bottom:78px}.chartlab-market-link{padding:9px 11px}}
  `;
  document.head.appendChild(style);

  function add(){
    if(document.querySelector(".chartlab-market-link")) return true;
    const a = document.createElement("a");
    a.href = href;
    a.className = "chartlab-market-link";
    a.innerHTML = '<span class="dot"></span><span>Dữ liệu thị trường</span>';
    a.setAttribute("aria-label","Mở Dữ liệu thị trường");

    const target =
      document.querySelector(".topbar-actions") ||
      document.querySelector(".header-actions") ||
      document.querySelector("header nav") ||
      document.querySelector("header");

    if(target){
      target.appendChild(a);
    }else{
      const wrap = document.createElement("div");
      wrap.className = "chartlab-market-float";
      wrap.appendChild(a);
      document.body.appendChild(wrap);
    }
    return true;
  }

  if(!add()){
    const obs = new MutationObserver(() => { if(add()) obs.disconnect(); });
    obs.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(() => { obs.disconnect(); add(); },2500);
  }
})();