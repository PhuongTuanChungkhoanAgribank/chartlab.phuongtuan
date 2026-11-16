/* ChartLab — Hammer vs Hanging Man comparison v2 */
(function(){
  function hammerSvg(){
    return '<svg viewBox="0 0 220 260" role="img" aria-label="Hammer — Cây Búa">'+
      '<line x1="110" y1="44" x2="110" y2="218" stroke="#7c3aed" stroke-width="7" stroke-linecap="round"/>'+
      '<rect x="78" y="56" width="64" height="42" rx="7" fill="#7c3aed"/>'+
      '<line x1="42" y1="232" x2="178" y2="232" stroke="#cbd5e1" stroke-width="2"/>'+
      '</svg>';
  }
  function hangingSvg(){
    return '<svg viewBox="0 0 220 260" role="img" aria-label="Hanging Man — Người Treo Cổ">'+
      '<line x1="110" y1="44" x2="110" y2="218" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>'+
      '<rect x="78" y="56" width="64" height="42" rx="7" fill="#ef4444"/>'+
      '<line x1="42" y1="232" x2="178" y2="232" stroke="#cbd5e1" stroke-width="2"/>'+
      '</svg>';
  }

  function content(){
    return `
      <main id="main-content" class="compare-v2">
        <div class="breadcrumb"><button class="link-button" data-nav="/pattern/hammer">Hammer</button><span>›</span><b>So sánh với Hanging Man</b></div>

        <section class="compare-v2-hero">
          <span class="kicker">SO SÁNH MẪU HÌNH</span>
          <h1><span>Hammer</span> <i>vs</i> <span>Hanging Man</span></h1>
          <p>Hai mẫu có hình dạng gần như giống nhau. Điểm khác biệt cốt lõi nằm ở <b>vị trí xuất hiện trong xu hướng</b>.</p>
        </section>

        <section class="compare-v2-cards">
          <article class="compare-v2-card bullish">
            <div class="compare-v2-head">
              <span class="compare-v2-tag">Nến đơn · Có thể đảo chiều tăng</span>
              <h2>Hammer</h2>
              <h3>Cây Búa</h3>
            </div>
            <div class="compare-v2-candle">${hammerSvg()}</div>
            <p><b>Bối cảnh:</b> xuất hiện sau một nhịp giảm mạnh. Lực bán từng đẩy giá xuống sâu, nhưng lực mua bắt đáy kéo giá trở lại gần vùng cao của phiên.</p>
          </article>

          <article class="compare-v2-card bearish">
            <div class="compare-v2-head">
              <span class="compare-v2-tag">Nến đơn · Có thể cảnh báo suy yếu</span>
              <h2>Hanging Man</h2>
              <h3>Người Treo Cổ</h3>
            </div>
            <div class="compare-v2-candle">${hangingSvg()}</div>
            <p><b>Bối cảnh:</b> xuất hiện sau một nhịp tăng mạnh. Hình dạng giống Hammer, nhưng vị trí này cho thấy lực bán đã bắt đầu xuất hiện và bên mua không còn kiểm soát hoàn toàn.</p>
          </article>
        </section>

        <section class="compare-v2-key">
          <span class="kicker">KHÁC BIỆT CỐT LÕI</span>
          <h2>Đừng chỉ nhìn hình dạng — hãy nhìn vị trí của cây nến trong xu hướng.</h2>
          <div class="compare-v2-rule">
            <div><b>Sau nhịp giảm mạnh</b><span>→ Hammer</span></div>
            <div><b>Sau nhịp tăng mạnh</b><span>→ Hanging Man</span></div>
          </div>
        </section>

        <section class="compare-v2-table">
          <div class="compare-v2-row header"><span>Tiêu chí</span><span>Hammer</span><span>Hanging Man</span></div>
          <div class="compare-v2-row"><b>Tên tiếng Việt</b><span>Cây Búa</span><span>Người Treo Cổ</span></div>
          <div class="compare-v2-row"><b>Loại mẫu</b><span>Nến đơn</span><span>Nến đơn</span></div>
          <div class="compare-v2-row"><b>Hình dạng</b><span>Thân nhỏ, bóng dưới dài</span><span>Thân nhỏ, bóng dưới dài</span></div>
          <div class="compare-v2-row"><b>Bối cảnh</b><span>Sau một nhịp giảm mạnh</span><span>Sau một nhịp tăng mạnh</span></div>
          <div class="compare-v2-row"><b>Ý nghĩa chính</b><span>Lực bán suy yếu, lực mua bắt đầu giành lại thế chủ động</span><span>Lực bán xuất hiện trong xu hướng tăng, cảnh báo đà tăng có thể suy yếu</span></div>
          <div class="compare-v2-row"><b>Khi luận điểm sai</b><span>Giá phá đáy Hammer và tiếp tục tạo đáy thấp hơn</span><span>Giá tiếp tục tăng mạnh và vượt vùng cao của Hanging Man</span></div>
        </section>

        <div class="compare-v2-actions">
          <button class="secondary" data-nav="/pattern/hammer">← Quay lại Hammer</button>
        </div>
      </main>`;
  }

  function render(){
    if(location.hash!=='#/compare/hammer/hangingman') return false;
    const app=document.getElementById('app');
    if(!app) return false;
    app.innerHTML=(typeof pageWrap==='function') ? pageWrap(content()) : content();
    window.scrollTo({top:0,behavior:'auto'});
    return true;
  }

  window.addEventListener('hashchange',()=>setTimeout(render,0));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0));
  setTimeout(render,0);
})();