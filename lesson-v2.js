/* chartlab.phuongtuan — Lesson v2 overlay
 * Phase 1: Level 01 Candlestick Anatomy + Hammer reference lesson.
 * The analyzer remains intentionally untouched in this phase.
 */

window.CHARTLAB_LESSON_V2 = {
  version: '2.0.0',
  scope: ['level-01-anatomy', 'hammer'],
  sources: {
    candlecharts: 'https://candlecharts.com/candlestick-patterns/',
    nisonContext: 'https://candlecharts.com/about/the-nison-advantage/',
    talibHammer: 'https://github.com/TA-Lib/ta-lib/blob/main/src/ta_func/ta_CDLHAMMER.c',
    cmtProgram: 'https://cmtassociation.org/wp-content/uploads/2025/12/CMT-PROGRAM-GUIDE-2026-1.pdf'
  }
};

(function applyLessonV2(){
  // Keep cards / hover / standard compare pages in sync with the upgraded lesson.
  const hammer = (window.CHARTLAB_PATTERNS || []).find(p => p.id === 'hammer');
  if (hammer) {
    Object.assign(hammer, {
      viName: 'Cây Búa',
      difficulty: 'Core',
      bias: 'Bullish',
      signalType: 'Potential bullish reversal',
      formation: 'Thân nến nhỏ nằm gần phần trên của biên độ; bóng dưới dài thể hiện cú ép giá xuống bị từ chối, trong khi bóng trên rất ngắn hoặc gần như không có.',
      context: 'Chỉ diễn giải như Hammer đảo chiều tăng khi xuất hiện sau một nhịp giảm/downtrend hoặc tại vùng giá mà phe bán đã đẩy thị trường xuống đáng kể. Cùng hình học sau xu hướng tăng thuộc bối cảnh Hanging Man.',
      confirmation: 'Ưu tiên chờ follow-through tăng ở các nến sau: giá giữ được phía trên vùng thân Hammer và mạnh hơn khi vượt High của Hammer. Kết hợp hỗ trợ/kháng cự, cấu trúc giá và volume nếu có; không coi một nến đơn lẻ là lệnh mua.',
      invalidation: 'Luận điểm đảo chiều suy yếu rõ khi giá nhanh chóng mất lại Low của Hammer hoặc không có follow-through và tiếp tục tạo đáy thấp hơn. Phân biệt “mẫu hình đã xuất hiện” với “luận điểm đảo chiều còn hiệu lực”.',
      implementationNote: 'TA-Lib CDLHAMMER kiểm tra thân nhỏ, bóng dưới dài, bóng trên rất ngắn và thân nằm gần vùng Low của nến trước theo CandleSettings. TA-Lib không kiểm tra prior downtrend; ChartLab bắt buộc kiểm tra context trước khi diễn giải bullish reversal.',
      sourceLabel: 'CandleCharts / Steve Nison — Hammer Pattern; đối chiếu implementation với TA-Lib CDLHAMMER.',
      source: window.CHARTLAB_LESSON_V2.sources.candlecharts,
      secondarySource: window.CHARTLAB_LESSON_V2.sources.talibHammer,
      verified: true,
      lessonVersion: '2.0.0'
    });
  }

  try {
    if (typeof levels !== 'undefined' && levels[0]) {
      levels[0].desc = 'Giá mở cửa · Giá cao nhất · Giá thấp nhất · Giá đóng cửa · Thân nến · Bóng nến · Bối cảnh';
    }
  } catch (_) {}

  // --- Level 01 override ---------------------------------------------------
  anatomyPage = function anatomyPageV2(){
    return pageWrap(`${breadcrumb(['Cấp độ 01','Cấu tạo nến'])}
      <section class="level-hero lesson-v2-hero">
        <div>
          <div class="lesson-version">BÀI HỌC NỀN TẢNG</div>
          <span class="kicker">CẤP ĐỘ 01</span>
          <h1>Cấu tạo nến</h1>
          <h2>Đọc một cây nến như một phiên đấu giá thu nhỏ.</h2>
          <p>Mục tiêu của cấp độ này là hiểu cây nến đã đi đâu, vùng giá nào bị từ chối, giá đóng cửa nằm ở đâu và cây nến đó có ý nghĩa gì khi đặt cạnh các nến trước.</p>
        </div>
        <div class="anatomy-v2-visual">${candlestickAnatomy()}<div class="anatomy-caption">Từ giá cao nhất đến giá thấp nhất là toàn bộ biên độ. Từ giá mở cửa đến giá đóng cửa là phần chuyển động được giữ lại.</div></div>
      </section>

      <section class="hammer-v2-layout">
        <div class="hammer-v2-main">
          <article class="lesson-block">
            <span class="lesson-index">01</span>
            <div><span class="kicker">BỐN MỨC GIÁ CƠ BẢN</span><h2>Giá mở cửa, cao nhất, thấp nhất và đóng cửa.</h2>
              <div class="hammer-v3-identify">
                <div><span>01</span><b>Giá mở cửa</b><p>Mức giá bắt đầu của cây nến trong khoảng thời gian đang quan sát.</p></div>
                <div><span>02</span><b>Giá cao nhất</b><p>Mức giá cao nhất thị trường đã giao dịch trong cây nến.</p></div>
                <div><span>03</span><b>Giá thấp nhất</b><p>Mức giá thấp nhất thị trường đã giao dịch trong cây nến.</p></div>
                <div><span>04</span><b>Giá đóng cửa</b><p>Mức giá kết thúc cây nến; đây là vị trí rất quan trọng để đánh giá bên mua hay bên bán giữ được lợi thế đến cuối kỳ.</p></div>
              </div>
            </div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">02</span>
            <div><span class="kicker">THÂN NẾN VÀ BÓNG NẾN</span><h2>Phân biệt phần giá giữ được và phần giá bị từ chối.</h2>
              <div class="geometry-grid">
                <div><b>Thân nến</b><p>Là khoảng từ giá mở cửa đến giá đóng cửa. Thân càng lớn so với toàn bộ biên độ, chuyển động theo một hướng càng rõ.</p></div>
                <div><b>Bóng trên</b><p>Là phần từ đỉnh thân nến lên giá cao nhất. Bóng trên dài cho thấy vùng giá cao từng được thử nhưng không được giữ lại.</p></div>
                <div><b>Bóng dưới</b><p>Là phần từ đáy thân nến xuống giá thấp nhất. Bóng dưới dài cho thấy vùng giá thấp từng bị ép xuống nhưng sau đó được kéo trở lại.</p></div>
              </div>
            </div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">03</span>
            <div><span class="kicker">BIÊN ĐỘ VÀ VỊ TRÍ ĐÓNG CỬA</span><h2>Không chỉ nhìn màu nến; hãy nhìn giá đóng cửa nằm ở đâu.</h2>
              <div class="context-split">
                <div class="good-context"><b>Đóng cửa gần vùng cao</b><p>Bên mua giữ được phần lớn thành quả trong cây nến.</p></div>
                <div class="bad-context"><b>Đóng cửa gần vùng thấp</b><p>Bên bán giữ được phần lớn lợi thế trong cây nến.</p></div>
              </div>
              <div class="context-note"><b>Cách tính để tham khảo</b><span>Biên độ = Giá cao nhất − Giá thấp nhất. Thân nến = |Giá đóng cửa − Giá mở cửa|. Các tỷ lệ chỉ dùng để mô tả tương đối, không phải ngưỡng cố định cho mọi thị trường.</span></div>
            </div>
          </article>

          <article class="lesson-block context-first-block">
            <span class="lesson-index">04</span>
            <div><span class="kicker">CÂU CHUYỆN CUNG — CẦU VÀ BỐI CẢNH</span><h2>Cùng một hình dạng nhưng đặt ở vị trí khác có thể mang ý nghĩa khác.</h2>
              <div class="story-flow">
                <div><b>1 · Nhìn hành trình giá</b><p>Giá đã được đẩy lên hay ép xuống trong phiên?</p></div><i>→</i>
                <div><b>2 · Nhìn vùng bị từ chối</b><p>Bóng nến cho biết vùng giá nào đã được thử nhưng không giữ được.</p></div><i>→</i>
                <div><b>3 · Đặt vào xu hướng</b><p>So với các nến trước, vùng hỗ trợ, vùng kháng cự và vị trí hiện tại trên biểu đồ.</p></div>
              </div>
              <p class="lesson-caveat">Hình dạng chỉ là dữ liệu ban đầu. Bối cảnh mới quyết định cách diễn giải.</p>
            </div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">05</span>
            <div><span class="kicker">XÁC NHẬN VÀ KHI CÁCH ĐỌC SAI</span><h2>Đừng kết luận chỉ từ một cây nến.</h2>
              <div class="confirmation-scale">
                <div><span>CHƯA ĐỦ</span><p>Cây nến xuất hiện nhưng các nến sau vẫn đi ngang hoặc không cho thêm thông tin.</p></div>
                <div><span>TỐT HƠN</span><p>Các nến sau tiếp tục theo hướng phù hợp với cách diễn giải ban đầu.</p></div>
                <div><span>SAI LUẬN ĐIỂM</span><p>Giá đi ngược rõ ràng, phá vùng quan trọng và làm mất ý nghĩa mà ta gán cho cây nến trước đó.</p></div>
              </div>
            </div>
          </article>

          <article class="lesson-block analyzer-rule-block">
            <span class="lesson-index">06</span>
            <div><span class="kicker">QUY TRÌNH ĐỌC CHO NGƯỜI HỌC VÀ AI</span><h2>Luôn đi theo cùng một thứ tự.</h2>
              <div class="analyzer-rules">
                <div><b>A</b><span><strong>Nhìn hình dạng</strong><p>Thân nến nằm đâu, bóng trên và bóng dưới dài hay ngắn.</p></span></div>
                <div><b>B</b><span><strong>Nhìn xu hướng trước đó</strong><p>Giá đang tăng, giảm hay đi ngang trước khi cây nến xuất hiện.</p></span></div>
                <div><b>C</b><span><strong>Nhìn vị trí</strong><p>Cây nến nằm ở hỗ trợ, kháng cự, vùng cực trị hay giữa vùng đi ngang.</p></span></div>
                <div><b>D</b><span><strong>Chờ xác nhận</strong><p>Nếu ảnh biểu đồ bị cắt quá sát hoặc thiếu dữ liệu, phải hạ độ tin cậy và không suy đoán cho đủ.</p></span></div>
              </div>
            </div>
          </article>
        </div>

        <aside class="hammer-v2-aside">
          <div class="quick-facts quick-facts-table">
            <h3>Thông tin nhanh</h3>
            <div class="qf-row"><span>Mục tiêu</span><b>Hiểu cấu tạo và cách đọc một cây nến</b></div>
            <div class="qf-row"><span>Trọng tâm</span><b>Thân nến · Bóng nến · Biên độ · Vị trí đóng cửa</b></div>
            <div class="qf-row"><span>Nguyên tắc</span><b>Luôn đọc cùng xu hướng và vùng giá</b></div>
            <div class="qf-row"><span>Số phần</span><b>6 phần thống nhất</b></div>
          </div>
          <div class="source-box"><span>NGUỒN THAM KHẢO</span><p>Nội dung nền được đối chiếu với tài liệu CMT và phương pháp đọc nến theo bối cảnh của CandleCharts.</p><a href="${window.CHARTLAB_LESSON_V2.sources.cmtProgram}" target="_blank" rel="noreferrer">Tài liệu chương trình CMT ↗</a><a href="${window.CHARTLAB_LESSON_V2.sources.nisonContext}" target="_blank" rel="noreferrer">CandleCharts — đọc theo bối cảnh ↗</a></div>
        </aside>
      </section>
    `);
  };

  // --- Hammer reference lesson override ----------------------------------
  const originalPatternDetailPage = patternDetailPage;
  patternDetailPage = function patternDetailPageV2(id){
    if (id !== 'hammer') return originalPatternDetailPage(id);
    const p = (window.CHARTLAB_PATTERNS || []).find(x => x.id === 'hammer');
    if (!p) return originalPatternDetailPage(id);

    const geometry = [
      ['Real body','Nhỏ và nằm gần phần trên của Range.'],
      ['Lower shadow','Dài; bản classic thường được mô tả ít nhất khoảng 2× chiều cao real body.'],
      ['Upper shadow','Rất ngắn hoặc gần như không có.'],
      ['Body color','Thứ yếu; vị trí body + shadow + context quan trọng hơn màu nến.']
    ];
    const analyzerRules = [
      ['A','Geometry','Chỉ nhận diện khi thân nhỏ + lower shadow dài + upper shadow rất ngắn nhìn đủ rõ.'],
      ['B','Prior trend','Muốn gọi “Hammer” theo nghĩa bullish reversal phải thấy prior decline/downtrend trong screenshot.'],
      ['C','Location','Ưu tiên khi xuất hiện ở cuối nhịp giảm / vùng support hoặc sau selling pressure; giữa trading range thì hạ confidence.'],
      ['D','Confirmation','Không biến một Hammer đơn lẻ thành khuyến nghị. Theo dõi follow-through; vượt High làm bằng chứng mạnh hơn.'],
      ['E','Fallback label','Nếu chỉ thấy hình học mà thiếu prior trend: ghi “hammer-like lower-shadow rejection / umbrella line”, không kết luận bullish reversal.']
    ];

    return pageWrap(`${breadcrumb(['Level 02','Single Candle','Hammer'])}
      <section class="detail-hero hammer-v2-hero">
        <div>
          <div class="lesson-version">REFERENCE LESSON v2.0 · CORE</div>
          <div class="detail-badges"><span class="difficulty core">Core</span><span>1 Candle</span><span>Potential bullish reversal</span></div>
          <h1>Hammer</h1><h2>Cây Búa</h2>
          <p class="ten-second"><b>Ý chính:</b> phe bán đẩy giá xuống mạnh trong kỳ nhưng không giữ được vùng thấp; giá được kéo trở lại gần phần trên của Range. Đây là <em>potential reversal evidence</em>, không phải bằng chứng đảo chiều hoàn tất.</p>
          <div class="detail-actions"><button class="secondary" data-nav="/level/2">← Level 02</button><button class="primary" data-nav="/compare/hammer/hangingman">So sánh Hanging Man ${arrow()}</button></div>
        </div>
        <div class="detail-diagram hammer-v2-diagram">${learningDiagram('hammer','hero')}<span>SCHEMATIC · LOWER-PRICE REJECTION</span></div>
      </section>

      <section class="hammer-v2-layout">
        <div class="hammer-v2-main">
          <article class="lesson-block">
            <span class="lesson-index">01</span><div><span class="kicker">NHẬN DIỆN HÌNH HỌC</span><h2>Một “umbrella line” ở đáy.</h2>
            <div class="geometry-grid">${geometry.map(x=>`<div><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div>
            <div class="context-note"><b>Không dùng màu nến làm tiêu chí chính.</b><span>Hammer xanh có thể trực quan mạnh hơn, nhưng Hammer đỏ vẫn có thể là Hammer nếu geometry + context phù hợp.</span></div></div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">02</span><div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span><h2>Giá thấp bị thử, nhưng không được chấp nhận tới Close.</h2>
            <div class="story-flow"><div><b>1 · Sell-off</b><p>Phe bán ép giá xuống, tạo phần lower shadow.</p></div><i>${arrow()}</i><div><b>2 · Rejection</b><p>Demand xuất hiện ở vùng thấp và hấp thụ/đẩy ngược lực bán.</p></div><i>${arrow()}</i><div><b>3 · Recovery</b><p>Close quay lên gần phần trên của Range, cho thấy phe bán không giữ được toàn bộ thành quả.</p></div></div>
            <p class="lesson-caveat">Điều này cho thấy <b>sự thay đổi trong intrabar control</b>; nó chưa chứng minh trend đã đảo chiều.</p></div>
          </article>

          <article class="lesson-block context-first-block">
            <span class="lesson-index">03</span><div><span class="kicker">CONTEXT BẮT BUỘC</span><h2>Không có prior decline → không được vội gọi bullish Hammer.</h2>
            <div class="context-split"><div class="good-context"><b>Context phù hợp</b><p>Sau downtrend/nhịp giảm rõ; gần support; sau selling pressure; chart đủ lịch sử để nhìn thấy prior move.</p></div><div class="bad-context"><b>Context không đủ</b><p>Giữa trading range; sau uptrend; screenshot crop quá sát; chỉ thấy một cây nến mà không thấy các nến trước.</p></div></div>
            <div class="context-note strong"><b>Hammer vs Hanging Man</b><span>Hình học gần như giống nhau. Downtrend → Hammer; uptrend → Hanging Man. Context là phần của định nghĩa, không phải “phần bổ sung”.</span></div></div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">04</span><div><span class="kicker">CONFIRMATION</span><h2>Đợi thị trường chứng minh rejection có follow-through.</h2>
            <p>Confirmation mạnh hơn khi các nến sau giữ được phía trên real body của Hammer và đặc biệt khi giá vượt High của Hammer. Nếu xuất hiện tại support và có volume hỗ trợ, bằng chứng có thể mạnh hơn; nhưng volume không phải điều kiện bắt buộc để pattern tồn tại.</p>
            <div class="confirmation-scale"><div><span>YẾU</span><p>Hammer xuất hiện nhưng nến sau tiếp tục lưỡng lự / quay xuống.</p></div><div><span>TRUNG BÌNH</span><p>Giá giữ vùng thân Hammer và có nến tăng tiếp nối.</p></div><div><span>MẠNH HƠN</span><p>Follow-through vượt High + context hỗ trợ rõ.</p></div></div></div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">05</span><div><span class="kicker">FAILURE / INVALIDATION</span><h2>Tách “pattern identity” khỏi “reversal thesis”.</h2>
            <p>Cây nến đã hình thành thì lịch sử không biến mất. Thứ bị vô hiệu là <b>luận điểm đảo chiều</b>. Nếu giá nhanh chóng xuyên thủng Low của Hammer và tiếp tục tạo lower low, rejection vừa thấy không tạo được follow-through như kỳ vọng.</p></div>
          </article>

          <article class="lesson-block talib-boundary-block">
            <span class="lesson-index">06</span><div><span class="kicker">TA-LIB BOUNDARY</span><h2>CDLHAMMER nhận diện geometry — không xác nhận downtrend.</h2>
            <p>TA-Lib kiểm tra real body ngắn, lower shadow dài, upper shadow rất ngắn và body nằm gần vùng Low của nến trước theo các CandleSettings tương đối. Chính source code TA-Lib lưu ý rằng người dùng phải tự xét Hammer có xuất hiện trong downtrend hay không.</p>
            <div class="boundary-grid"><div><b>TA-Lib làm</b><ul><li>So body/shadow với candle averages</li><li>Kiểm tra vị trí body gần prior low</li><li>Trả output bullish cho geometry phù hợp</li></ul></div><div><b>TA-Lib không làm</b><ul><li>Không xác minh downtrend</li><li>Không đánh giá support/resistance</li><li>Không xác minh follow-through</li></ul></div></div></div>
          </article>

          <article class="lesson-block analyzer-rule-block">
            <span class="lesson-index">07</span><div><span class="kicker">RULE CHO CHART ANALYZER</span><h2>AI chỉ được gọi tên pattern khi đủ bằng chứng.</h2>
            <div class="analyzer-rules">${analyzerRules.map(x=>`<div><b>${x[0]}</b><span><strong>${x[1]}</strong><p>${x[2]}</p></span></div>`).join('')}</div>
            <div class="rule-box compact-rule"><span>OUTPUT POLICY</span><h3>Pattern recognized ≠ trade recommendation.</h3><p>Confidence là độ tin cậy của việc nhận diện pattern/context từ ảnh, không phải xác suất giá sẽ tăng.</p></div></div>
          </article>
        </div>

        <aside class="hammer-v2-aside">
          <div class="quick-facts"><h3>Quick facts · v2</h3>${fact('Tên','Hammer — Cây Búa')}${fact('Family','Umbrella line')}${fact('Context','Sau decline/downtrend')}${fact('Geometry','Small body · long lower shadow')}${fact('Bias','Potential bullish reversal')}${fact('Lesson','v2.0 · Audited',true)}</div>
          <div class="source-box"><span>NGUỒN ĐỊNH NGHĨA</span><p>CandleCharts mô tả classic Hammer là small real body ở phần trên range, lower shadow dài, little/no upper shadow và xuất hiện trong downtrend.</p><a href="${window.CHARTLAB_LESSON_V2.sources.candlecharts}" target="_blank" rel="noreferrer">CandleCharts — Hammer ↗</a><a href="${window.CHARTLAB_LESSON_V2.sources.talibHammer}" target="_blank" rel="noreferrer">TA-Lib CDLHAMMER source ↗</a><a href="${window.CHARTLAB_LESSON_V2.sources.cmtProgram}" target="_blank" rel="noreferrer">CMT Program Guide ↗</a></div>
          <div class="aside-warning"><span>ĐỪNG NHẦM</span><h3>Hanging Man</h3><p>Gần như cùng geometry, nhưng xuất hiện sau uptrend. Đây là ví dụ rõ nhất cho nguyên tắc “Context is part of the pattern”.</p><button class="secondary" data-nav="/compare/hammer/hangingman">So sánh 2 mẫu</button></div>
        </aside>
      </section>
    `);
  };
})();
