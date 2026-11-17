/* ChartLab — Hammer rebuilt from scratch */
(function(){
  function candleSvg(){
    return '<svg viewBox="0 0 260 320" role="img" aria-label="Minh họa nến Hammer — Cây Búa">'+
      '<line x1="130" y1="62" x2="130" y2="276" stroke="#7c3aed" stroke-width="7" stroke-linecap="round"/>'+
      '<rect x="94" y="72" width="72" height="46" rx="7" fill="#7c3aed"/>'+
      '<line x1="38" y1="286" x2="222" y2="286" stroke="#cbd5e1" stroke-width="2"/>'+
      '</svg>';
  }

  function content(){
    return `
      <main id="main-content" class="hammer-rebuilt">
        <div class="lesson-topnav">
          <button class="lesson-back-home" data-nav="/">← Quay về Học</button>
          <div class="breadcrumb">
            <button class="link-button" data-nav="/">Trang chủ</button>
            <span>›</span>
            <button class="link-button" data-nav="/">Học</button>
            <span>›</span>
            <button class="link-button" data-nav="/level/2">Cấp độ 02</button>
            <span>›</span>
            <span>Nến đơn</span>
            <span>›</span>
            <b>Hammer — Cây Búa</b>
          </div>
        </div>

        <section class="detail-hero hammer-v3-hero">
          <div>
            <div class="lesson-version">BÀI HỌC MẪU · KIẾN THỨC CỐT LÕI</div>
            <div class="detail-badges"><span class="difficulty core">Cốt lõi</span><span>Nến đơn</span><span>Có thể báo hiệu đảo chiều tăng</span></div>
            <h1>Hammer</h1>
            <h2>Cây Búa</h2>
            <p class="hammer-v3-lead"><b>Nhận diện trong 10 giây:</b> thân nến nhỏ nằm gần phía trên toàn bộ biên độ; bóng dưới dài, thường được mô tả khoảng ít nhất <b>2 lần</b> chiều cao thân nến; bóng trên rất ngắn hoặc gần như không có. Hammer chỉ có ý nghĩa như một dấu hiệu đảo chiều tăng khi xuất hiện sau một nhịp giảm rõ.</p>
            <div class="hammer-v3-summary">
              <span><b>Loại mẫu</b>Nến đơn</span>
              <span><b>Bối cảnh</b>Sau một nhịp giảm mạnh</span>
              <span><b>Ý nghĩa</b>Giá thấp bị từ chối</span>
              <span><b>Trạng thái</b>Cần xác nhận</span>
            </div>
            <div class="detail-actions">
              <button class="secondary" data-nav="/level/2">← Cấp độ 02</button>
              <button class="primary" data-nav="/compare/hammer/hangingman">So sánh với Hanging Man →</button>
            </div>
          </div>
          <div class="detail-diagram hammer-v2-diagram">${candleSvg()}<span>SƠ ĐỒ NHẬN DIỆN</span></div>
        </section>

        <section class="hammer-v2-layout">
          <div class="hammer-v2-main">
            <article class="lesson-block">
              <span class="lesson-index">01</span>
              <div><span class="kicker">CÁCH NHẬN DIỆN</span><h2>Nhìn 4 yếu tố chính.</h2>
                <div class="hammer-v3-identify">
                  <div><span>01</span><b>Thân nến</b><p>Thân nến là khoảng từ giá mở cửa đến giá đóng cửa. Với Hammer, thân nến nhỏ và nằm gần phía trên của toàn bộ biên độ nến.</p></div>
                  <div><span>02</span><b>Bóng dưới</b><p>Dài và nổi bật; cách mô tả kinh điển thường là dài khoảng ít nhất 2 lần chiều cao thân nến.</p></div>
                  <div><span>03</span><b>Bóng trên</b><p>Rất ngắn hoặc gần như không có.</p></div>
                  <div><span>04</span><b>Vị trí trên biểu đồ</b><p>Phải xuất hiện sau một nhịp giảm rõ. Hình dạng và vị trí của nến quan trọng hơn màu của thân nến.</p></div>
                </div>
                <p class="lesson-caveat"><b>Màu thân nến không phải tiêu chí chính.</b> Hammer có thể là nến tăng hoặc nến giảm. Khi đọc biểu đồ, hãy ưu tiên <b>hình dạng cây nến, vị trí của nó trong xu hướng và phản ứng giá sau đó</b>. Tỷ lệ “2 lần” là cách mô tả dễ nhớ, không phải ngưỡng máy móc cho mọi thị trường.</p>
              </div>
            </article>

            <article class="lesson-block">
              <span class="lesson-index">02</span>
              <div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span><h2>Lực bán suy yếu, lực mua bắt đầu giành lại quyền kiểm soát.</h2>
                <div class="hammer-3d-story hammer-motion-story" aria-label="Mô phỏng đường đi của giá trong phiên tạo nến Hammer">
                  <div class="hammer-3d-stage hammer-motion-stage">
                    <div class="hammer-3d-grid"></div>
                    <div class="motion-title"><b>Đường đi của giá trong một phiên</b><span>Đọc từ ① đến ④</span></div>

                    <svg class="hammer-motion-svg" viewBox="0 0 620 400" role="img" aria-label="Giá mở cửa, giảm sâu, tạo đáy rồi hồi phục và đóng cửa gần vùng cao">
                      <defs>
                        <linearGradient id="hammerPathGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stop-color="#e11d48"/>
                          <stop offset="52%" stop-color="#f59e0b"/>
                          <stop offset="100%" stop-color="#7c3aed"/>
                        </linearGradient>
                        <filter id="motionGlow" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="5" result="blur"/>
                          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                        </filter>
                        <marker id="arrowPurple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c3aed"/>
                        </marker>
                        <marker id="arrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d48"/>
                        </marker>
                      </defs>

                      <line x1="58" y1="92" x2="558" y2="92" class="motion-level close-level"/>
                      <line x1="58" y1="328" x2="558" y2="328" class="motion-level low-level"/>

                      <path class="motion-price-path" d="M105 122 C145 145 175 226 222 305 C252 354 292 337 318 302 C356 252 378 176 430 122 C465 86 505 82 536 98"/>
                      <path class="motion-sell-arrow" d="M118 138 C155 176 184 242 218 294" marker-end="url(#arrowRed)"/>
                      <path class="motion-buy-arrow" d="M278 318 C326 276 354 190 425 126 C458 96 492 90 528 99" marker-end="url(#arrowPurple)"/>

                      <circle cx="105" cy="122" r="11" class="motion-dot open-dot"/>
                      <circle cx="240" cy="326" r="11" class="motion-dot low-dot"/>
                      <circle cx="407" cy="142" r="11" class="motion-dot recover-dot"/>
                      <circle cx="536" cy="98" r="11" class="motion-dot close-dot"/>

                      <g class="motion-marker m1"><circle cx="105" cy="74" r="18"/><text x="105" y="80">1</text></g>
                      <g class="motion-marker m2"><circle cx="240" cy="372" r="18"/><text x="240" y="378">2</text></g>
                      <g class="motion-marker m3"><circle cx="407" cy="190" r="18"/><text x="407" y="196">3</text></g>
                      <g class="motion-marker m4"><circle cx="536" cy="54" r="18"/><text x="536" y="60">4</text></g>

                      <text x="72" y="112" class="motion-label">Mở cửa</text>
                      <text x="182" y="314" class="motion-label red">Giá thấp nhất</text>
                      <text x="350" y="132" class="motion-label purple">Kéo giá trở lại</text>
                      <text x="438" y="88" class="motion-label purple">Đóng cửa</text>

                      <text x="78" y="205" class="motion-force-label sell-label">BÊN BÁN ÉP GIÁ XUỐNG</text>
                      <text x="350" y="250" class="motion-force-label buy-label">BÊN MUA KÉO GIÁ LÊN</text>
                    </svg>

                    <div class="hammer-result-card">
                      <span>KẾT QUẢ CỦA CẢ QUÁ TRÌNH</span>
                      <div class="mini-hammer">
                        <i></i><b></b>
                      </div>
                      <p>Bóng dưới dài chính là dấu vết của đoạn giá đã bị ép xuống rồi được kéo ngược lên.</p>
                    </div>
                  </div>

                  <div class="hammer-3d-steps hammer-motion-steps">
                    <article><span>01</span><b>Mở cửa ở vùng phía trên</b><p>Phiên bắt đầu quanh vùng thân nến. Lúc này chưa có Hammer — mới chỉ là điểm xuất phát.</p></article>
                    <article><span>02</span><b>Bên bán ép giá xuống sâu</b><p>Giá giảm mạnh xuống vùng thấp. Quãng đường đi xuống này về sau trở thành phần bóng dưới của Hammer.</p></article>
                    <article><span>03</span><b>Bên mua xuất hiện và kéo ngược</b><p>Tại vùng giá thấp, lực mua đủ mạnh để hấp thụ áp lực bán và kéo giá quay trở lại gần vùng mở cửa.</p></article>
                    <article><span>04</span><b>Đóng cửa trở lại gần vùng cao</b><p>Phần lớn mức giảm trong phiên bị xóa. Kết quả cuối cùng là thân nhỏ ở phía trên và bóng dưới dài — hình dạng Hammer.</p></article>
                  </div>
                </div>
                <p class="lesson-caveat">Mô hình này giúp hình dung diễn biến trong phiên. Hammer cho thấy cán cân cung — cầu đã tích cực hơn, nhưng vẫn cần các nến sau xác nhận.</p>
              </div>
            </article>

            <article class="lesson-block context-first-block">
              <span class="lesson-index">03</span>
              <div><span class="kicker">BỐI CẢNH BẮT BUỘC</span><h2>Cùng hình dạng nhưng khác vị trí sẽ mang ý nghĩa khác.</h2>
                <div class="hammer-v3-contexts">
                  <div class="good"><span>PHÙ HỢP</span><b>Sau một nhịp giảm mạnh</b><p>Đây là bối cảnh phù hợp để diễn giải như Hammer. Nếu gần vùng hỗ trợ thì giá trị quan sát tăng thêm.</p></div>
                  <div class="wait"><span>CHƯA ĐỦ</span><b>Giữa vùng đi ngang</b><p>Có thể giống Hammer về hình dạng nhưng chưa đủ bối cảnh để nói về đảo chiều tăng.</p></div>
                  <div class="bad"><span>SAI BỐI CẢNH</span><b>Sau một nhịp tăng</b><p>Cùng hình dạng này phù hợp với Hanging Man hơn.</p></div>
                </div>
                <div class="context-note strong"><b>Hammer và Hanging Man</b><span>Đây là ví dụ rõ nhất cho nguyên tắc: <b>“Bối cảnh là một phần của mẫu hình.”</b> Hammer xuất hiện sau nhịp giảm; Hanging Man xuất hiện sau nhịp tăng.</span></div>
              </div>
            </article>

            <article class="lesson-block">
              <span class="lesson-index">04</span>
              <div><span class="kicker">XÁC NHẬN VÀ KHI LUẬN ĐIỂM SAI</span><h2>Đợi thị trường chứng minh lực mua có tiếp tục hay không.</h2>
                <div class="confirmation-scale">
                  <div><span>CHƯA ĐỦ</span><p>Hammer xuất hiện nhưng nến sau tiếp tục lưỡng lự hoặc quay xuống.</p></div>
                  <div><span>TỐT HƠN</span><p>Các nến sau giữ được vùng thân Hammer và có phản ứng tăng tiếp nối.</p></div>
                  <div><span>MẠNH HƠN</span><p>Giá vượt đỉnh Hammer và duy trì được phía trên, đặc biệt nếu bối cảnh hỗ trợ rõ.</p></div>
                </div>
                <div class="context-note strong"><b>Khi luận điểm sai</b><span>Nếu giá nhanh chóng phá xuống dưới đáy Hammer và tiếp tục tạo đáy thấp hơn, không nên tiếp tục xem Hammer là bằng chứng cho khả năng đảo chiều tăng.</span></div>
              </div>
            </article>

            <article class="lesson-block hammer-v3-practice">
              <span class="lesson-index">05</span>
              <div><span class="kicker">NHÌN TRÊN BIỂU ĐỒ THẬT</span><h2>Ba tình huống phải phân biệt được.</h2>
                <div class="hammer-v3-practice-grid">
                  <div class="good"><span>Ví dụ A · Đúng bối cảnh</span><b>Giá giảm nhiều phiên → xuất hiện bóng dưới dài → đóng cửa trở lại gần phần trên biên độ.</b><p>Có thể ghi nhận Hammer, nhưng vẫn cần theo dõi nến sau.</p></div>
                  <div class="wait"><span>Ví dụ B · Chưa xác nhận</span><b>Hammer xuất hiện sau nhịp giảm nhưng nến kế tiếp nhỏ, đi ngang và không vượt đỉnh Hammer.</b><p>Mẫu hình tồn tại, nhưng luận điểm đảo chiều chưa được củng cố.</p></div>
                  <div class="fail"><span>Ví dụ C · Thất bại</span><b>Sau Hammer, giá phá đáy Hammer và tiếp tục tạo đáy thấp hơn.</b><p>Luận điểm đảo chiều tăng đã thất bại.</p></div>
                </div>
              </div>
            </article>

            <article class="lesson-block analyzer-rule-block">
              <span class="lesson-index">06</span>
              <div><span class="kicker">ĐIỀU KIỆN ĐỂ NHẬN DIỆN</span><h2>Khi nào có thể xác định đây là Hammer?</h2>
                <div class="analyzer-rules">
                  <div><b>A</b><span><strong>Hình dạng</strong><p>Thân nhỏ, bóng dưới dài và bóng trên rất ngắn.</p></span></div>
                  <div><b>B</b><span><strong>Xu hướng trước đó</strong><p>Muốn gọi là Hammer theo nghĩa đảo chiều tăng phải nhìn thấy nhịp giảm trước đó.</p></span></div>
                  <div><b>C</b><span><strong>Vị trí</strong><p>Nếu ở giữa vùng đi ngang hoặc ảnh bị cắt quá sát, phải hạ độ tin cậy.</p></span></div>
                  <div><b>D</b><span><strong>Xác nhận</strong><p>Một Hammer đơn lẻ chưa đủ để kết luận xu hướng đã đảo chiều; cần theo dõi phản ứng của các nến sau.</p></span></div>
                </div>
              </div>
            </article>
          </div>

          <aside class="hammer-v2-aside">
            <div class="quick-facts quick-facts-table">
              <h3>Thông tin nhanh</h3>
              <div class="qf-row"><span>Tên mẫu hình</span><b>Hammer — Cây Búa</b></div>
              <div class="qf-row"><span>Loại mẫu</span><b>Nến đơn</b></div>
              <div class="qf-row"><span>Hình dạng chính</span><b>Thân nhỏ, bóng dưới dài</b></div>
              <div class="qf-row"><span>Bối cảnh cần có</span><b>Sau một nhịp giảm mạnh</b></div>
              <div class="qf-row"><span>Hàm ý</span><b>Có thể báo hiệu đảo chiều tăng</b></div>
              <div class="qf-row"><span>Xác nhận</span><b>Cần theo dõi phản ứng của các nến sau</b></div>
            </div>
            <div class="aside-warning"><span>DỄ NHẦM</span><h3>Hanging Man — Người Treo Cổ</h3><p>Hình dạng gần như giống Hammer. Điểm khác nằm ở vị trí trên biểu đồ: Hammer xuất hiện sau nhịp giảm, còn Hanging Man xuất hiện sau nhịp tăng.</p><button class="secondary" data-nav="/compare/hammer/hangingman">So sánh Hammer và Hanging Man</button></div>
          </aside>
        </section>
      </main>`;
  }

  function renderHammer(){
    if(location.hash !== '#/pattern/hammer') return false;
    const app=document.getElementById('app');
    if(!app) return false;
    app.innerHTML=(typeof pageWrap==='function') ? pageWrap(content()) : content();
    window.scrollTo({top:0,behavior:'auto'});
    return true;
  }

  window.addEventListener('hashchange',()=>setTimeout(renderHammer,0));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(renderHammer,0));
  setTimeout(renderHammer,0);
  window.CHARTLAB_HAMMER_REBUILT={version:'1.0.0',render:renderHammer};
})();