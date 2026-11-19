(() => {
  const href = "./market-data.html";

  const style = document.createElement("style");
  style.textContent = `
    .nav-links .chartlab-market-nav{
      border:0;background:transparent;color:#3f4656;cursor:pointer;padding:10px 12px;
      border-radius:10px;font:inherit;font-weight:500;white-space:nowrap
    }
    .nav-links .chartlab-market-nav:hover{background:#f7f5ff;color:#5c48ca}
    .mobile-nav .chartlab-market-mobile{border:0;background:transparent;color:inherit}
    .mobile-nav .chartlab-market-mobile b{font-size:16px}
  `;
  document.head.appendChild(style);

  function syncDesktop(){
    const nav = document.querySelector(".nav-links");
    if(!nav) return;
    if(nav.querySelector(".chartlab-market-nav")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chartlab-market-nav";
    btn.textContent = "Dữ liệu thị trường";
    btn.setAttribute("aria-label","Mở Dữ liệu thị trường");
    btn.addEventListener("click", () => { window.location.href = href; });
    nav.appendChild(btn);
  }

  function syncMobile(){
    const nav = document.querySelector(".mobile-nav");
    if(!nav || nav.querySelector(".chartlab-market-mobile")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chartlab-market-mobile";
    btn.innerHTML = "<b>▥</b><span>Dữ liệu</span>";
    btn.setAttribute("aria-label","Mở Dữ liệu thị trường");
    btn.addEventListener("click", () => { window.location.href = href; });
    nav.appendChild(btn);
  }

  function sync(){
    syncDesktop();
    syncMobile();
  }

  sync();
  const obs = new MutationObserver(sync);
  obs.observe(document.documentElement,{childList:true,subtree:true});
})();