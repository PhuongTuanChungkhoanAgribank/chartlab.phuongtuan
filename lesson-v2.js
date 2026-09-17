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
      levels[0].desc = 'OHLC · Range · Body · Shadows · Close Location · Relative Size · Context';
    }
  } catch (_) {}

  // --- Level 01 override ---------------------------------------------------
  anatomyPage = function anatomyPageV2(){
    const concepts = [
      ['01','OHLC','Bốn mốc giá','Open là điểm bắt đầu; High/Low là hai cực trị; Close là nơi thị trường chốt lại quyền kiểm soát trong kỳ.'],
      ['02','Range','Biên độ nến','Range = High − Low. Đây là toàn bộ quãng giá đã được giao dịch trong một cây nến.'],
      ['03','Real Body','Thân nến','Body = |Close − Open|. Body càng lớn so với Range, giá càng giữ được phần lớn chuyển động tới lúc đóng cửa.'],
      ['04','Upper Shadow','Bóng trên','High − max(Open, Close). Bóng trên dài cho thấy giá cao hơn đã được thử nhưng không được giữ lại.'],
      ['05','Lower Shadow','Bóng dưới','min(Open, Close) − Low. Bóng dưới dài cho thấy vùng giá thấp đã bị từ chối trong phiên.'],
      ['06','Body / Range','Tỷ lệ thân / biên độ','Giúp phân biệt nến có directional conviction với nến nhiều giằng co. Luôn so tương đối, không dùng một ngưỡng tuyệt đối cho mọi thị trường.'],
      ['07','Close Location','Vị trí Close','Hỏi Close nằm gần High, giữa Range hay gần Low. Vị trí đóng cửa thường quan trọng hơn chỉ nhìn màu xanh/đỏ.'],
      ['08','Relative Size + Context','Kích thước tương đối + bối cảnh','So nến hiện tại với các nến gần đây và hỏi nó xuất hiện ở đâu trong trend, hỗ trợ/kháng cự hay trading range.']
    ];

    const readSteps = [
      ['01','Xác định biên độ','Đánh dấu High và Low trước. Range cho biết thị trường đã đi xa đến mức nào trong kỳ.'],
      ['02','Đọc hành trình','So Body với hai Shadow để xem giá đã đi đâu và phần nào của chuyển động bị từ chối.'],
      ['03','Đọc điểm kết thúc','Xem Close nằm ở đâu trong Range. Close gần High khác hoàn toàn Close gần Low dù hai nến có cùng độ dài bóng.'],
      ['04','Đặt vào bối cảnh','So với các nến trước và vị trí trên chart. Một hình dạng chỉ có ý nghĩa khi context phù hợp.']
    ];

    return pageWrap(`${breadcrumb(['Level 01','Candlestick Anatomy'])}
      <section class="level-hero lesson-v2-hero">
        <div>
          <div class="lesson-version">LESSON v2.0 · FOUNDATION</div>
          <span class="kicker">LEVEL 01</span>
          <h1>Candlestick Anatomy</h1>
          <h2>Đọc một cây nến như một phiên đấu giá thu nhỏ.</h2>
          <p>Đừng bắt đầu bằng tên mẫu hình. Bắt đầu bằng bốn câu hỏi: giá đã đi bao xa, bị từ chối ở đâu, đóng cửa ở đâu và cây nến đó có gì khác so với bối cảnh xung quanh.</p>
        </div>
        <div class="anatomy-v2-visual">${candlestickAnatomy()}<div class="anatomy-caption">High → Low là toàn bộ hành trình. Open → Close là phần chuyển động được giữ lại.</div></div>
      </section>

      <section class="lesson-v2-section">
        <div class="section-heading compact"><div><span class="kicker">8 KHÁI NIỆM NỀN</span><h2>Từ OHLC đến Context</h2></div><p>Level 01 mới không chỉ học tên bộ phận của nến; mục tiêu là biến hình dạng thành thông tin có thể kiểm tra.</p></div>
        <div class="anatomy-v2-grid">${concepts.map(x=>`<article class="anatomy-v2-card"><span>${x[0]}</span><h3>${x[1]}</h3><h4>${x[2]}</h4><p>${x[3]}</p></article>`).join('')}</div>
      </section>

      <section class="lesson-v2-section two-col-reading">
        <div class="reading-panel">
          <span class="kicker">QUY TRÌNH ĐỌC 20 GIÂY</span>
          <h2>Range → Journey → Close → Context</h2>
          <div class="reading-steps">${readSteps.map(x=>`<article><b>${x[0]}</b><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('')}</div>
        </div>
        <aside class="formula-panel">
          <span class="kicker">CÔNG THỨC CẦN NHỚ</span>
          <div class="formula-chip"><b>Range</b><code>High − Low</code></div>
          <div class="formula-chip"><b>Real Body</b><code>|Close − Open|</code></div>
          <div class="formula-chip"><b>Upper Shadow</b><code>High − max(O,C)</code></div>
          <div class="formula-chip"><b>Lower Shadow</b><code>min(O,C) − Low</code></div>
          <div class="formula-chip"><b>Close Location</b><code>(Close − Low) / Range</code></div>
          <p class="formula-note">Các tỷ lệ là công cụ mô tả. Không biến chúng thành “ngưỡng thần kỳ”; nhiều pattern chuyên nghiệp dùng tiêu chuẩn tương đối so với các nến trước.</p>
        </aside>
      </section>

      <section class="rule-box lesson-v2-rule">
        <span>NGUYÊN TẮC CHARTLAB #01</span>
        <h3>Hình dạng là dữ liệu. Context mới tạo ra ý nghĩa.</h3>
        <p>Một bóng dưới dài không tự động bullish; một thân đỏ không tự động bearish. Trước khi gọi tên pattern, hãy đọc vị trí Close, xu hướng trước đó, vùng giá đang giao dịch và phản ứng tiếp theo.</p>
      </section>

      <section class="lesson-source-strip">
        <div><span class="kicker">METHODOLOGY</span><h3>Level 01 là nền cho toàn bộ Pattern Engine.</h3><p>CMT nhấn mạnh việc đọc real body, shadows và ý nghĩa của candlestick trong bối cảnh trend; CandleCharts nhấn mạnh “context before conclusions”.</p></div>
        <div class="source-links"><a href="${window.CHARTLAB_LESSON_V2.sources.cmtProgram}" target="_blank" rel="noreferrer">CMT Program Guide ↗</a><a href="${window.CHARTLAB_LESSON_V2.sources.nisonContext}" target="_blank" rel="noreferrer">CandleCharts — Context ↗</a></div>
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
