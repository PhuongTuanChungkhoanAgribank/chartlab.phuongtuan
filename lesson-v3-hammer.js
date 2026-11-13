/* chartlab.phuongtuan — Hammer lesson v3
 * Final reference template for future lessons.
 * Vietnamese-first; keep English for the pattern name and source names only.
 */
(function applyHammerV3(){
  const original = patternDetailPage;

  patternDetailPage = function hammerV3Detail(id){
    if(id !== 'hammer') return original(id);
    const p = getPattern(id);
    if(!p) return original(id);

    const identify = [
      ['01','Thân nến','Nhỏ, nằm gần phía trên biên độ của cây nến.'],
      ['02','Bóng dưới','Dài và nổi bật so với thân nến.'],
      ['03','Bóng trên','Rất ngắn hoặc gần như không có.'],
      ['04','Bối cảnh','Phải xuất hiện sau một nhịp giảm rõ để diễn giải như Hammer.']
    ];

    const contexts = [
      ['TỐT','Sau một nhịp giảm rõ','Hình dạng phù hợp và có bối cảnh giảm trước đó. Nếu nằm gần vùng hỗ trợ thì giá trị quan sát tăng thêm.'],
      ['CHƯA ĐỦ','Giữa vùng đi ngang','Có thể giống Hammer về hình dạng nhưng chưa đủ bối cảnh để gọi là dấu hiệu đảo chiều tăng.'],
      ['SAI BỐI CẢNH','Sau một nhịp tăng','Cùng hình dạng này phù hợp với Hanging Man hơn.']
    ];

    const practice = [
      ['Ví dụ A · Đúng bối cảnh','Giá giảm nhiều phiên → xuất hiện bóng dưới dài → đóng cửa trở lại gần phần trên biên độ.','Có thể ghi nhận Hammer, nhưng vẫn cần theo dõi nến sau.','good'],
      ['Ví dụ B · Chưa xác nhận','Hammer xuất hiện sau nhịp giảm nhưng nến kế tiếp nhỏ, đi ngang và không vượt đỉnh Hammer.','Mẫu hình tồn tại, nhưng luận điểm đảo chiều chưa được củng cố.','wait'],
      ['Ví dụ C · Thất bại','Sau Hammer, giá phá đáy Hammer và tiếp tục tạo đáy thấp hơn.','Luận điểm đảo chiều tăng đã thất bại; không nên tiếp tục dùng Hammer làm bằng chứng tăng.','fail']
    ];

    const analyzerRules = [
      ['A','Hình dạng','Chỉ nhận diện khi thấy rõ thân nhỏ, bóng dưới dài và bóng trên rất ngắn.'],
      ['B','Xu hướng trước đó','Muốn gọi tên Hammer theo nghĩa đảo chiều tăng phải nhìn thấy nhịp giảm trước đó trên ảnh.'],
      ['C','Vị trí','Nếu ở giữa vùng đi ngang hoặc ảnh bị cắt quá sát, phải hạ độ tin cậy.'],
      ['D','Xác nhận','Không biến một Hammer đơn lẻ thành khuyến nghị. Theo dõi phản ứng của các nến sau.'],
      ['E','Cách gọi khi thiếu dữ liệu','Nếu chỉ thấy hình dạng nhưng không thấy xu hướng trước đó, mô tả là “nến có bóng dưới dài” thay vì kết luận Hammer đảo chiều tăng.']
    ];

    return pageWrap(`${breadcrumb(['Level 02','Nến đơn','Hammer'])}
      <section class="detail-hero hammer-v3-hero">
        <div>
          <div class="lesson-version">BÀI HỌC MẪU · CỐT LÕI</div>
          <div class="detail-badges"><span class="difficulty core">Cốt lõi</span><span>1 nến</span><span>Có thể báo hiệu đảo chiều tăng</span></div>
          <h1>Hammer</h1><h2>Cây Búa</h2>
          <p class="hammer-v3-lead"><b>Nhận diện trong 10 giây:</b> thân nhỏ ở gần phía trên biên độ, bóng dưới dài, bóng trên rất ngắn. Chỉ có ý nghĩa như một dấu hiệu đảo chiều tăng khi xuất hiện sau một nhịp giảm.</p>
          <div class="hammer-v3-summary">
            <span><b>Loại</b>Nến đơn</span>
            <span><b>Bối cảnh</b>Sau nhịp giảm</span>
            <span><b>Ý nghĩa</b>Giá thấp bị từ chối</span>
            <span><b>Trạng thái</b>Cần xác nhận</span>
          </div>
          <div class="detail-actions"><button class="secondary" data-nav="/level/2">← Cấp độ 02</button><button class="primary" data-nav="/compare/hammer/hangingman">So sánh với Hanging Man ${arrow()}</button></div>
        </div>
        <div class="detail-diagram hammer-v2-diagram">${learningDiagram('hammer','hero')}<span>SƠ ĐỒ NHẬN DIỆN</span></div>
      </section>

      <section class="hammer-v2-layout">
        <div class="hammer-v2-main">
          <article class="lesson-block">
            <span class="lesson-index">01</span><div><span class="kicker">CÁCH NHẬN DIỆN</span><h2>Nhìn 4 yếu tố, không cần học thuộc một loạt tỷ lệ cứng.</h2>
            <div class="hammer-v3-identify">${identify.map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div>
            <p class="lesson-caveat">Tỷ lệ chỉ mang tính mô tả. Khi đọc chart thật, hãy so cây nến với các nến gần đó thay vì áp một con số tuyệt đối cho mọi thị trường.</p></div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">02</span><div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span><h2>Điều đáng chú ý là vùng giá thấp đã bị từ chối.</h2>
            <div class="story-flow">
              <div><b>1 · Bên bán ép giá</b><p>Trong phiên, giá bị đẩy xuống thấp và tạo bóng dưới dài.</p></div><i>${arrow()}</i>
              <div><b>2 · Bên mua phản ứng</b><p>Lực mua xuất hiện ở vùng thấp và kéo giá ngược lên.</p></div><i>${arrow()}</i>
              <div><b>3 · Đóng cửa hồi lên</b><p>Giá đóng cửa trở lại gần phía trên biên độ, cho thấy bên bán không giữ được toàn bộ lợi thế.</p></div>
            </div>
            <p class="lesson-caveat">Hammer cho thấy sự thay đổi trong cán cân mua — bán của chính cây nến đó. Nó chưa chứng minh xu hướng đã đảo chiều.</p></div>
          </article>

          <article class="lesson-block context-first-block">
            <span class="lesson-index">03</span><div><span class="kicker">BỐI CẢNH BẮT BUỘC</span><h2>Cùng một hình dạng, đặt ở vị trí khác nhau sẽ mang ý nghĩa khác.</h2>
            <div class="hammer-v3-contexts">${contexts.map(x=>`<div class="${x[0]==='TỐT'?'good':x[0]==='CHƯA ĐỦ'?'wait':'bad'}"><span>${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div>
            <div class="context-note strong"><b>Hammer và Hanging Man</b><span>Hai mẫu có hình dạng gần như giống nhau. Điểm phân biệt quan trọng nhất là xu hướng trước đó.</span></div></div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">04</span><div><span class="kicker">XÁC NHẬN</span><h2>Đợi thị trường chứng minh lực mua có tiếp tục hay không.</h2>
            <div class="confirmation-scale">
              <div><span>CHƯA ĐỦ</span><p>Hammer xuất hiện nhưng nến sau tiếp tục lưỡng lự hoặc quay xuống.</p></div>
              <div><span>TỐT HƠN</span><p>Các nến sau giữ được vùng thân Hammer và có phản ứng tăng tiếp nối.</p></div>
              <div><span>MẠNH HƠN</span><p>Giá vượt đỉnh Hammer và duy trì được phía trên, đặc biệt nếu bối cảnh hỗ trợ rõ.</p></div>
            </div></div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">05</span><div><span class="kicker">KHI NÀO LUẬN ĐIỂM SAI</span><h2>Mẫu hình đã xuất hiện vẫn là sự thật; thứ bị vô hiệu là kỳ vọng đảo chiều.</h2>
            <p>Nếu giá nhanh chóng phá đáy Hammer và tiếp tục tạo đáy thấp hơn, phản ứng từ chối giá thấp đã không tạo được diễn biến tiếp nối như kỳ vọng. Khi đó không nên tiếp tục dùng Hammer làm bằng chứng tăng.</p></div>
          </article>

          <article class="lesson-block hammer-v3-practice">
            <span class="lesson-index">06</span><div><span class="kicker">NHÌN TRÊN CHART THẬT</span><h2>Ba tình huống phải phân biệt được.</h2>
            <div class="hammer-v3-practice-grid">${practice.map(x=>`<div class="${x[3]}"><span>${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div>
            <p class="hammer-v3-note">Giai đoạn tiếp theo của ChartLab sẽ thay 3 khung mô tả này bằng ảnh chart thật đã kiểm định.</p></div>
          </article>

          <article class="lesson-block talib-boundary-block">
            <span class="lesson-index">07</span><div><span class="kicker">RANH GIỚI TA-LIB</span><h2>TA-Lib giúp nhận diện hình dạng; ChartLab phải tự kiểm tra bối cảnh.</h2>
            <p>TA-Lib CDLHAMMER tập trung vào thân nến, bóng nến và quan hệ vị trí theo các thiết lập tương đối. Thư viện này không thay thế bước đọc xu hướng trước đó, vùng hỗ trợ/kháng cự hay diễn biến xác nhận sau mẫu hình.</p>
            <div class="boundary-grid"><div><b>TA-Lib hỗ trợ</b><ul><li>Kiểm tra thân và bóng tương đối</li><li>Tìm ứng viên có hình dạng Hammer</li><li>Dùng tiêu chuẩn tương đối thay vì ngưỡng cố định</li></ul></div><div><b>ChartLab bổ sung</b><ul><li>Xu hướng trước đó</li><li>Vị trí trong cấu trúc giá</li><li>Xác nhận và thất bại</li></ul></div></div></div>
          </article>

          <article class="lesson-block analyzer-rule-block">
            <span class="lesson-index">08</span><div><span class="kicker">QUY TẮC CHO ANALYZER</span><h2>AI chỉ được gọi tên Hammer khi đủ bằng chứng.</h2>
            <div class="analyzer-rules">${analyzerRules.map(x=>`<div><b>${x[0]}</b><span><strong>${x[1]}</strong><p>${x[2]}</p></span></div>`).join('')}</div>
            <div class="rule-box compact-rule"><span>NGUYÊN TẮC ĐẦU RA</span><h3>Nhận diện mẫu hình ≠ khuyến nghị giao dịch.</h3><p>Độ tin cậy chỉ phản ánh mức chắc chắn khi nhận diện hình dạng và bối cảnh từ ảnh, không phải xác suất giá sẽ tăng.</p></div></div>
          </article>
        </div>

        <aside class="hammer-v2-aside">
          <div class="quick-facts"><h3>Thông tin nhanh</h3>${fact('Tên','Hammer — Cây Búa')}${fact('Loại','Nến đơn')}${fact('Bối cảnh','Sau nhịp giảm')}${fact('Ý nghĩa','Từ chối vùng giá thấp')}${fact('Xác nhận','Cần theo dõi nến sau')}${fact('Trạng thái','Bài mẫu đã chốt',true)}</div>
          <div class="source-box"><span>NGUỒN THAM KHẢO</span><p>ChartLab dùng CandleCharts/Steve Nison cho cách diễn giải theo bối cảnh và TA-Lib cho ranh giới nhận diện hình dạng.</p><a href="${window.CHARTLAB_LESSON_V2?.sources?.candlecharts || '#'}" target="_blank" rel="noreferrer">CandleCharts ↗</a><a href="${window.CHARTLAB_LESSON_V2?.sources?.talibHammer || '#'}" target="_blank" rel="noreferrer">TA-Lib CDLHAMMER ↗</a></div>
          <div class="aside-warning"><span>DỄ NHẦM</span><h3>Hanging Man</h3><p>Hình dạng gần như giống nhau. Hammer xuất hiện sau nhịp giảm; Hanging Man xuất hiện sau nhịp tăng.</p><button class="secondary" data-nav="/compare/hammer/hangingman">So sánh 2 mẫu</button></div>
        </aside>
      </section>
    `);
  };
})();