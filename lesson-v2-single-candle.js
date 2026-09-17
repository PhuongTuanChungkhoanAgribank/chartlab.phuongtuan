/* chartlab.phuongtuan — Lesson v2 / Single-candle rejection family
 * Scope: Hanging Man, Inverted Hammer, Shooting Star.
 * Analyzer remains untouched. Pattern identity and trading interpretation are separated.
 */
(function applySingleCandleV2(){
  const ROOT = window.CHARTLAB_LESSON_V2 || {};
  const SOURCES = Object.assign({}, ROOT.sources || {}, {
    candlePatterns: 'https://candlecharts.com/candlestick-patterns/',
    talibHangingMan: 'https://github.com/TA-Lib/ta-lib/blob/main/src/ta_func/ta_CDLHANGINGMAN.c',
    talibInvertedHammer: 'https://github.com/TA-Lib/ta-lib/blob/main/src/ta_func/ta_CDLINVERTEDHAMMER.c',
    talibShootingStar: 'https://github.com/TA-Lib/ta-lib/blob/main/src/ta_func/ta_CDLSHOOTINGSTAR.c'
  });

  const norm = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,'');
  const getPattern = id => (window.CHARTLAB_PATTERNS || []).find(p => p.id === id);
  const getName = p => p && (p.name || p.enName || p.englishName || p.title || p.id || '');

  const lessons = {
    hangingman: {
      match: ['hangingman'],
      en: 'Hanging Man', vi: 'Người Treo Cổ', family: 'Umbrella line', bias: 'Potential bearish reversal',
      summary: 'Phe bán đã có lúc ép giá xuống mạnh trong phiên nhưng giá hồi lên trước Close. Sau một uptrend, sự xuất hiện của lực bán sâu như vậy là cảnh báo rằng bên mua không còn kiểm soát tuyệt đối.',
      geometry: [
        ['Real body','Nhỏ, nằm gần phần trên của Range.'],
        ['Lower shadow','Dài; classic textbook thường mô tả khoảng ≥ 2× real body.'],
        ['Upper shadow','Rất ngắn hoặc gần như không có.'],
        ['Body color','Không phải tiêu chí quyết định; nến giảm có thể tăng sắc thái cảnh báo nhưng context quan trọng hơn.']
      ],
      contextGood: 'Sau uptrend / nhịp tăng rõ, đặc biệt gần kháng cự hoặc sau pha tăng kéo dài.',
      contextBad: 'Sau downtrend thì cùng geometry phù hợp với Hammer hơn; giữa trading range thì tín hiệu yếu.',
      story: ['Sell-off xuất hiện','Giá hồi lại phần lớn','Sau uptrend, cú sell-off sâu là cảnh báo supply đã xuất hiện'],
      confirmation: 'Cần nến sau xác nhận suy yếu: thất bại khi tạo đỉnh mới, đóng cửa thấp hơn hoặc phá vùng Low/real body của Hanging Man. Không coi riêng một nến là tín hiệu bán.',
      invalidation: 'Luận điểm bearish suy yếu nếu giá nhanh chóng vượt đỉnh Hanging Man và tiếp tục cấu trúc tăng.',
      talib: 'TA-Lib nhận diện geometry tương đối theo CandleSettings và vị trí thân gần vùng High/Low liên quan; việc xác nhận prior uptrend vẫn phải do người dùng/engine context thực hiện.',
      source: SOURCES.talibHangingMan,
      confusion: 'Hammer',
      fallback: 'lower-shadow rejection / umbrella line nếu ảnh không cho thấy prior uptrend.'
    },
    invertedhammer: {
      match: ['invertedhammer'],
      en: 'Inverted Hammer', vi: 'Búa Ngược', family: 'Upper-shadow reversal family', bias: 'Potential bullish reversal',
      summary: 'Sau một nhịp giảm, giá có lúc được kéo mạnh lên trên Open/Close nhưng không giữ được toàn bộ mức cao. Dù Close chưa mạnh, cú thử giá lên cho thấy demand bắt đầu phản công.',
      geometry: [
        ['Real body','Nhỏ, nằm gần phần dưới của Range.'],
        ['Upper shadow','Dài; thường nổi bật rõ so với real body.'],
        ['Lower shadow','Rất ngắn hoặc gần như không có.'],
        ['Body color','Thứ yếu; geometry + prior decline quyết định cách gọi tên.']
      ],
      contextGood: 'Sau downtrend / nhịp giảm rõ, tốt hơn khi gần support hoặc sau selling pressure.',
      contextBad: 'Sau uptrend thì cùng hình học thuộc Shooting Star; giữa trading range chỉ nên mô tả upper-shadow rejection.',
      story: ['Demand đẩy giá lên','Supply ép giá trở lại','Việc giá từng được kéo mạnh lên cho thấy phe mua bắt đầu thử giành quyền kiểm soát'],
      confirmation: 'Cần bullish follow-through ở nến sau; mạnh hơn nếu giá vượt High của Inverted Hammer và giữ được phía trên vùng thân.',
      invalidation: 'Luận điểm bullish suy yếu nếu giá mất Low và tiếp tục tạo lower low.',
      talib: 'TA-Lib tập trung vào geometry: short real body, long upper shadow, very short lower shadow và quan hệ gap/position theo implementation; prior downtrend không phải lúc nào được engine thư viện tự xác minh.',
      source: SOURCES.talibInvertedHammer,
      confusion: 'Shooting Star',
      fallback: 'upper-shadow rejection nếu ảnh thiếu prior decline.'
    },
    shootingstar: {
      match: ['shootingstar'],
      en: 'Shooting Star', vi: 'Sao Băng', family: 'Upper-shadow reversal family', bias: 'Potential bearish reversal',
      summary: 'Sau một nhịp tăng, giá được đẩy lên cao nhưng bị bán ngược mạnh và đóng cửa trở lại gần vùng thấp của Range. Bóng trên dài thể hiện sự từ chối giá cao.',
      geometry: [
        ['Real body','Nhỏ, nằm gần phần dưới của Range.'],
        ['Upper shadow','Dài và nổi bật.'],
        ['Lower shadow','Rất ngắn hoặc gần như không có.'],
        ['Body color','Thứ yếu; bearish body có thể trực quan yếu hơn nhưng không phải điều kiện bắt buộc.']
      ],
      contextGood: 'Sau uptrend / nhịp tăng rõ, đặc biệt gần resistance hoặc sau pha tăng nhanh.',
      contextBad: 'Sau downtrend thì cùng geometry phù hợp với Inverted Hammer hơn; giữa range thì không nên kết luận reversal.',
      story: ['Buyers đẩy giá lên','Giá cao bị từ chối','Close quay về vùng thấp → supply giành lại phần lớn intrabar control'],
      confirmation: 'Ưu tiên bearish follow-through: nến sau không vượt High và đóng cửa thấp hơn; mạnh hơn khi phá vùng Low/real body của Shooting Star.',
      invalidation: 'Luận điểm bearish suy yếu nếu giá vượt High của Shooting Star và giữ được trên vùng đó.',
      talib: 'TA-Lib nhận diện short body + long upper shadow + very short lower shadow cùng quan hệ vị trí/gap theo implementation. Trend context phải được kiểm tra riêng trước khi diễn giải bearish reversal.',
      source: SOURCES.talibShootingStar,
      confusion: 'Inverted Hammer',
      fallback: 'upper-shadow rejection nếu ảnh thiếu prior uptrend.'
    }
  };

  function identify(p){
    const n = norm(getName(p));
    return Object.values(lessons).find(l => l.match.some(m => n.includes(m))) || null;
  }

  // Sync card/hover metadata without altering the canonical 61-pattern identity.
  (window.CHARTLAB_PATTERNS || []).forEach(p => {
    const lesson = identify(p);
    if (!lesson) return;
    Object.assign(p, {
      viName: lesson.vi,
      difficulty: 'Core',
      signalType: lesson.bias,
      formation: lesson.summary,
      context: lesson.contextGood,
      confirmation: lesson.confirmation,
      invalidation: lesson.invalidation,
      implementationNote: lesson.talib,
      sourceLabel: `TA-Lib implementation + CandleCharts context methodology`,
      source: SOURCES.candlePatterns,
      secondarySource: lesson.source,
      verified: true,
      lessonVersion: '2.0.0'
    });
  });

  const previousPatternDetailPage = patternDetailPage;
  patternDetailPage = function singleCandlePatternDetailV2(id){
    const p = getPattern(id);
    const lesson = identify(p);
    if (!p || !lesson) return previousPatternDetailPage(id);

    const contextDirection = lesson.en === 'Hanging Man' || lesson.en === 'Shooting Star' ? 'uptrend' : 'downtrend';
    const rules = [
      ['A','Geometry','Chỉ nhận diện khi body/shadow nhìn đủ rõ và đúng family hình học.'],
      ['B','Prior trend',`Muốn dùng tên ${lesson.en} theo nghĩa reversal phải thấy prior ${contextDirection} trong screenshot.`],
      ['C','Location','Ưu tiên khi pattern xuất hiện ở cuối một nhịp có hướng hoặc tại support/resistance phù hợp.'],
      ['D','Confirmation','Pattern identity không phải trade signal. Luôn tách nhận diện khỏi follow-through.'],
      ['E','Fallback label',lesson.fallback]
    ];

    return pageWrap(`${breadcrumb(['Level 02','Single Candle',lesson.en])}
      <section class="detail-hero hammer-v2-hero">
        <div>
          <div class="lesson-version">REFERENCE LESSON v2.0 · CORE</div>
          <div class="detail-badges"><span class="difficulty core">Core</span><span>1 Candle</span><span>${lesson.bias}</span></div>
          <h1>${lesson.en}</h1><h2>${lesson.vi}</h2>
          <p class="ten-second"><b>Ý chính:</b> ${lesson.summary}</p>
          <div class="detail-actions"><button class="secondary" data-nav="/level/2">← Level 02</button></div>
        </div>
        <div class="detail-diagram hammer-v2-diagram">${learningDiagram(p.id,'hero')}<span>SCHEMATIC · ${lesson.family.toUpperCase()}</span></div>
      </section>

      <section class="hammer-v2-layout">
        <div class="hammer-v2-main">
          <article class="lesson-block"><span class="lesson-index">01</span><div><span class="kicker">NHẬN DIỆN HÌNH HỌC</span><h2>Đọc geometry trước khi gắn ý nghĩa.</h2><div class="geometry-grid">${lesson.geometry.map(x=>`<div><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div></div></article>

          <article class="lesson-block"><span class="lesson-index">02</span><div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span><h2>Pattern mô tả sự thay đổi quyền kiểm soát trong kỳ.</h2><div class="story-flow">${lesson.story.map((x,i)=>`${i?`<i>${arrow()}</i>`:''}<div><b>${i+1}</b><p>${x}</p></div>`).join('')}</div><p class="lesson-caveat">Đây là bằng chứng intrabar. Nó chưa chứng minh xu hướng đã đảo chiều.</p></div></article>

          <article class="lesson-block context-first-block"><span class="lesson-index">03</span><div><span class="kicker">CONTEXT BẮT BUỘC</span><h2>Cùng hình học có thể mang tên khác nếu prior trend khác.</h2><div class="context-split"><div class="good-context"><b>Context phù hợp</b><p>${lesson.contextGood}</p></div><div class="bad-context"><b>Context không đủ / sai</b><p>${lesson.contextBad}</p></div></div><div class="context-note strong"><b>Đừng nhầm với ${lesson.confusion}</b><span>Hãy xác định prior trend trước khi gọi tên. Context là một phần của định nghĩa.</span></div></div></article>

          <article class="lesson-block"><span class="lesson-index">04</span><div><span class="kicker">CONFIRMATION</span><h2>Đợi phản ứng tiếp theo xác nhận luận điểm.</h2><p>${lesson.confirmation}</p></div></article>

          <article class="lesson-block"><span class="lesson-index">05</span><div><span class="kicker">FAILURE / INVALIDATION</span><h2>Pattern đã tồn tại; thesis mới là thứ bị vô hiệu.</h2><p>${lesson.invalidation}</p></div></article>

          <article class="lesson-block talib-boundary-block"><span class="lesson-index">06</span><div><span class="kicker">TA-LIB BOUNDARY</span><h2>Geometry engine không thay thế context engine.</h2><p>${lesson.talib}</p><div class="boundary-grid"><div><b>Engine hình học</b><ul><li>Body / shadow tương đối</li><li>Quan hệ vị trí theo CandleSettings</li><li>Pattern candidate</li></ul></div><div><b>ChartLab phải bổ sung</b><ul><li>Prior trend</li><li>Location trên cấu trúc giá</li><li>Follow-through / invalidation</li></ul></div></div></div></article>

          <article class="lesson-block analyzer-rule-block"><span class="lesson-index">07</span><div><span class="kicker">RULE CHO CHART ANALYZER</span><h2>Thiếu context thì hạ cấp từ “pattern” về “shape observation”.</h2><div class="analyzer-rules">${rules.map(x=>`<div><b>${x[0]}</b><span><strong>${x[1]}</strong><p>${x[2]}</p></span></div>`).join('')}</div><div class="rule-box compact-rule"><span>OUTPUT POLICY</span><h3>Recognition confidence ≠ directional probability.</h3><p>Confidence chỉ phản ánh mức chắc chắn khi nhận diện geometry + context từ ảnh.</p></div></div></article>
        </div>

        <aside class="hammer-v2-aside">
          <div class="quick-facts"><h3>Quick facts · v2</h3>${fact('Tên',`${lesson.en} — ${lesson.vi}`)}${fact('Family',lesson.family)}${fact('Context',contextDirection === 'uptrend' ? 'Sau uptrend' : 'Sau downtrend')}${fact('Bias',lesson.bias)}${fact('Confusing',lesson.confusion)}${fact('Lesson','v2.0 · Audited',true)}</div>
          <div class="source-box"><span>NGUỒN / BOUNDARY</span><p>ChartLab dùng TA-Lib làm baseline geometry và dùng context-based interpretation để tránh biến hình dạng đơn lẻ thành tín hiệu mua/bán.</p><a href="${SOURCES.candlePatterns}" target="_blank" rel="noreferrer">CandleCharts — Candlestick Patterns ↗</a><a href="${lesson.source}" target="_blank" rel="noreferrer">TA-Lib source — ${lesson.en} ↗</a></div>
          <div class="aside-warning"><span>ĐỪNG NHẦM</span><h3>${lesson.confusion}</h3><p>Hình học có thể gần như giống nhau. Prior trend và vị trí trên chart mới quyết định cách diễn giải.</p></div>
        </aside>
      </section>
    `);
  };
})();