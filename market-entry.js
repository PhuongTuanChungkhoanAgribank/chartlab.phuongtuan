(() => {
  const MARKET_PAGE = "./market-data.html";
  const PROFILE_PAGE = "https://phuongtuantaichinh.awarechurn1.chatgpt.site/";

  const style = document.createElement("style");
  style.textContent = `
    .chartlab-profile-link{
      display:flex;align-items:center;gap:9px;margin-left:6px;padding-left:16px;
      border-left:1px solid #e4e7ee;text-decoration:none;color:#343b4c;white-space:nowrap
    }
    .chartlab-profile-mark{
      width:30px;height:30px;border-radius:10px;display:grid;place-items:center;
      background:linear-gradient(135deg,#f7f1ff,#fff7df);border:1px solid #e8dafb;
      color:#6d28d9;font-size:10px;font-weight:900;letter-spacing:.02em
    }
    .chartlab-profile-copy{display:flex;flex-direction:column;line-height:1.12}
    .chartlab-profile-copy b{font-size:12px;color:#292f3d}
    .chartlab-profile-copy small{font-size:9px;color:#9a7a22;margin-top:3px;font-weight:750}
    .chartlab-profile-link:hover .chartlab-profile-mark{transform:translateY(-1px);box-shadow:0 8px 18px rgba(109,40,217,.12)}
    .chartlab-profile-link:hover .chartlab-profile-copy b{color:#6d28d9}
    .chartlab-grouped-nav{display:flex;align-items:center;gap:8px;margin-left:auto}
    .chartlab-nav-group{position:relative}
    .chartlab-nav-trigger{
      border:0;background:transparent;color:#3f4656;cursor:pointer;padding:10px 12px;
      border-radius:10px;font:inherit;font-weight:650;white-space:nowrap;display:flex;align-items:center;gap:7px
    }
    .chartlab-nav-trigger:hover,.chartlab-nav-group.open>.chartlab-nav-trigger{background:#f7f5ff;color:#5c48ca}
    .chartlab-nav-trigger .chev{font-size:10px;transition:transform .18s ease}
    .chartlab-nav-group.open .chev{transform:rotate(180deg)}
    .chartlab-dropdown{
      position:absolute;top:calc(100% + 8px);left:0;min-width:250px;padding:8px;background:#fff;
      border:1px solid #e7e9f0;border-radius:14px;box-shadow:0 18px 42px rgba(29,25,61,.14);
      opacity:0;visibility:hidden;transform:translateY(-5px);transition:.16s ease;z-index:120
    }
    .chartlab-nav-group:hover>.chartlab-dropdown,.chartlab-nav-group.open>.chartlab-dropdown{
      opacity:1;visibility:visible;transform:translateY(0)
    }
    .chartlab-dropdown button,.chartlab-dropdown a{
      width:100%;border:0;background:transparent;text-align:left;display:flex;flex-direction:column;
      padding:10px 11px;border-radius:10px;color:#343b4c;cursor:pointer;text-decoration:none;font:inherit
    }
    .chartlab-dropdown button:hover,.chartlab-dropdown a:hover{background:#f7f5ff;color:#5c48ca}
    .chartlab-dropdown b{font-size:13px}.chartlab-dropdown small{font-size:11px;color:#8a91a0;margin-top:2px}
    .chartlab-dropdown .practice{margin-top:6px;border-top:1px solid #eceef4;padding-top:8px}
    .chartlab-dropdown .practice button{background:#fff8e9;color:#a87500;font-weight:800}
    .chartlab-dropdown .practice button:hover{background:#fff2cf}
    @media(max-width:980px){
      .chartlab-grouped-nav{display:none}
      .chartlab-profile-link{margin-left:auto;padding-left:12px}
      .chartlab-profile-copy small{display:none}
    }
    @media(max-width:560px){
      .chartlab-profile-copy b{font-size:10px}
      .chartlab-profile-mark{width:27px;height:27px;border-radius:9px}
    }
  `;
  document.head.appendChild(style);

  const techItems = [
    ["/level/1","Học","Học theo Level"],
    ["/library","Mẫu hình","Tra cứu mẫu hình"],
    ["/history","Lịch sử","Xem lại phân tích"],
    ["/methodology","Phương pháp","Nguyên tắc & nguồn"]
  ];

  const marketItems = [
    ["all","Tổng quan","Toàn bộ dữ liệu"],
    ["macro","Vĩ mô","GDP · CPI · PMI · FDI"],
    ["money","Tiền tệ","Tín dụng · M2 · Lãi suất"],
    ["commodity","Hàng hóa","Dầu · Thép · Vàng · Nông sản"],
    ["global","Quốc tế","Lợi suất · Fed · CPI Mỹ"]
  ];

  function goRoute(path){ location.hash = "#" + path; }
  function goMarket(group){ window.location.href = MARKET_PAGE + (group && group!=="all" ? "?group="+encodeURIComponent(group) : ""); }

  function createGroupedNav(){
    const wrap = document.createElement("div");
    wrap.className = "chartlab-grouped-nav";
    wrap.innerHTML = `
      <div class="chartlab-nav-group" data-menu="market">
        <button class="chartlab-nav-trigger" type="button">Dữ liệu Vĩ mô – Tiền tệ – Hàng hóa <span class="chev">▼</span></button>
        <div class="chartlab-dropdown">
          ${marketItems.map(([group,title,sub])=>`<button type="button" data-market-group="${group}"><b>${title}</b><small>${sub}</small></button>`).join("")}
        </div>
      </div>
      <div class="chartlab-nav-group" data-menu="technical">
        <button class="chartlab-nav-trigger" type="button">Phân tích kỹ thuật <span class="chev">▼</span></button>
        <div class="chartlab-dropdown">
          ${techItems.map(([path,title,sub])=>`<button type="button" data-tech-route="${path}"><b>${title}</b><small>${sub}</small></button>`).join("")}
          <div class="practice"><button type="button" data-tech-route="/analyzer"><b>▣ Phân tích chart</b><small>Thực hành trên chart thực tế</small></button></div>
        </div>
      </div>
    `;
    wrap.querySelectorAll("[data-tech-route]").forEach(btn => btn.addEventListener("click",()=>goRoute(btn.dataset.techRoute)));
    wrap.querySelectorAll("[data-market-group]").forEach(btn => btn.addEventListener("click",()=>goMarket(btn.dataset.marketGroup)));
    wrap.querySelectorAll(".chartlab-nav-trigger").forEach(btn => btn.addEventListener("click",(e)=>{
      e.stopPropagation();
      const group=btn.closest(".chartlab-nav-group");
      document.querySelectorAll(".chartlab-nav-group.open").forEach(x=>{if(x!==group)x.classList.remove("open")});
      group.classList.toggle("open");
    }));
    return wrap;
  }

  function syncDesktop(){
    const topbar = document.querySelector(".topbar-inner");
    const brand = topbar?.querySelector(".brand");
    const oldNav = topbar?.querySelector(".nav-links");
    const analyze = topbar?.querySelector(".analyze-nav");
    if(!topbar || !oldNav) return;

    if(brand && !brand.dataset.marketHomeBound){
      brand.dataset.marketHomeBound="1";
      brand.setAttribute("aria-label","Về giao diện Dữ liệu thị trường");
      brand.addEventListener("click",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        window.location.href=MARKET_PAGE;
      },true);
    }

    if(brand && !topbar.querySelector(".chartlab-profile-link")){
      const profile=document.createElement("a");
      profile.className="chartlab-profile-link";
      profile.href=PROFILE_PAGE;
      profile.target="_blank";
      profile.rel="noopener noreferrer";
      profile.setAttribute("aria-label","Về Phương Tuấn — mở trang giới thiệu trong tab mới");
      profile.innerHTML='<span class="chartlab-profile-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none"><circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 19c.7-3.2 3.1-5 6.5-5s5.8 1.8 6.5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="chartlab-profile-copy"><b>Về Phương Tuấn</b><small>Giới thiệu ↗</small></span>';
      brand.insertAdjacentElement("afterend",profile);
    }

    let grouped = topbar.querySelector(".chartlab-grouped-nav");
    if(!grouped){
      grouped = createGroupedNav();
      oldNav.insertAdjacentElement("beforebegin",grouped);
    }
    oldNav.style.display = "none";
    if(analyze) analyze.style.display = "none";
  }

  function syncMobile(){
    const nav = document.querySelector(".mobile-nav");
    if(!nav) return;
    // Mobile giữ các nút truy cập nhanh hiện có; dữ liệu được thêm nếu chưa có.
    if(!nav.querySelector(".chartlab-market-mobile")){
      const btn=document.createElement("button");
      btn.type="button"; btn.className="chartlab-market-mobile";
      btn.innerHTML="<b>▥</b><span>Dữ liệu</span>";
      btn.addEventListener("click",()=>goMarket("all"));
      nav.appendChild(btn);
    }
  }

  function sync(){ syncDesktop(); syncMobile(); }
  sync();
  const obs = new MutationObserver(sync);
  obs.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("click",()=>document.querySelectorAll(".chartlab-nav-group.open").forEach(x=>x.classList.remove("open")));
})();