/* ChartLab — standardized candlestick lesson template
 * Applies Hammer's approved learning structure to all candlestick patterns.
 * Hammer itself keeps its dedicated rebuilt lesson.
 */
(function(){
  const originalPatternDetailPage = patternDetailPage;

  const contextMap = new Map([
    ['Uptrend','Sau một nhịp tăng mạnh / trong xu hướng tăng'],
    ['Downtrend','Sau một nhịp giảm mạnh / trong xu hướng giảm'],
    ['Mature uptrend','Sau một nhịp tăng mạnh đã kéo dài'],
    ['Trend extreme','Khi xu hướng đã đi xa và giá ở vùng cực trị'],
    ['At trend extreme','Khi xu hướng đã đi xa và giá ở vùng cực trị'],
    ['Extended trend','Sau một xu hướng kéo dài'],
    ['After directional trend','Sau một nhịp tăng hoặc giảm rõ ràng'],
    ['Inside established trend','Trong một xu hướng đã hình thành rõ'],
    ['Downtrend / bottoming zone','Sau nhịp giảm mạnh hoặc quanh vùng tạo đáy'],
    ['Any; stronger at key levels','Có thể xuất hiện ở nhiều vị trí; đáng chú ý hơn tại vùng giá quan trọng'],
    ['Any','Có thể xuất hiện ở nhiều vị trí trên biểu đồ']
  ]);

  function contextVi(v=''){
    if(contextMap.has(v)) return contextMap.get(v);
    return String(v)
      .replace(/Uptrend/gi,'xu hướng tăng')
      .replace(/Downtrend/gi,'xu hướng giảm')
      .replace(/trend/gi,'xu hướng')
      .replace(/bottoming zone/gi,'vùng tạo đáy')
      .replace(/key levels/gi,'vùng giá quan trọng')
      .replace(/directional/gi,'có hướng rõ ràng')
      .replace(/extreme/gi,'vùng cực trị');
  }

  function difficultyVi(v=''){
    return ({Core:'Cốt lõi',Intermediate:'Trung cấp',Advanced:'Nâng cao'})[v] || v;
  }

  function patternGroup(p){
    if(p.candles===1) return 'Nến đơn';
    if(p.candles===2) return 'Nến đôi';
    if(p.candles===3) return 'Nến ba';
    return 'Tổ hợp nến';
  }

  function levelInfo(p){
    if(p.candles===1) return {num:'02',route:'/level/2',name:'Cấp độ 02'};
    if(p.candles===2) return {num:'03',route:'/level/3',name:'Cấp độ 03'};
    if(p.candles===3) return {num:'04',route:'/level/4',name:'Cấp độ 04'};
    return {num:'05',route:'/level/5',name:'Cấp độ 05'};
  }

  function biasVi(p){
    const x=(p.bias||'').toLowerCase();
    if(x.includes('bull')) return 'Có thể nghiêng về tăng giá';
    if(x.includes('bear')) return 'Có thể nghiêng về giảm giá';
    if(x.includes('both')) return 'Có thể xuất hiện theo cả hai hướng';
    return 'Trung tính / phụ thuộc bối cảnh';
  }

  function signalVi(p){
    const s=(p.signalType||'').toLowerCase();
    if(s.includes('reversal warning')) return 'Cảnh báo khả năng đảo chiều';
    if(s.includes('reversal')) return 'Có thể báo hiệu đảo chiều';
    if(s.includes('continuation')) return 'Có thể báo hiệu tiếp diễn';
    if(s.includes('directional')) return 'Thể hiện lực giá theo hướng nến';
    return 'Cần đọc cùng bối cảnh';
  }

  function supplyDemandStory(p){
    const b=(p.bias||'').toLowerCase();
    const signal=(p.signalType||'').toLowerCase();
    if(b.includes('bull')){
      if(signal.includes('continuation')) return 'Cấu trúc nến cho thấy lực mua vẫn duy trì ưu thế và bên bán chưa tạo được phản ứng đủ mạnh để làm thay đổi xu hướng hiện tại.';
      return 'Diễn biến trong cụm nến cho thấy lực bán bắt đầu suy yếu hoặc bị hấp thụ, trong khi lực mua phản ứng tốt hơn và dần giành lại thế chủ động.';
    }
    if(b.includes('bear')){
      if(signal.includes('continuation')) return 'Cấu trúc nến cho thấy lực bán vẫn duy trì ưu thế và lực mua chưa đủ mạnh để đảo ngược xu hướng hiện tại.';
      return 'Diễn biến trong cụm nến cho thấy lực mua bắt đầu suy yếu, trong khi lực bán phản ứng mạnh hơn và dần giành lại thế chủ động.';
    }
    if(b.includes('both')){
      return 'Mẫu này có thể xuất hiện theo cả hai hướng. Không nên gán ý nghĩa tăng hay giảm chỉ từ hình dạng; cần đọc hướng của các nến trong mẫu và xu hướng trước đó.';
    }
    return 'Mẫu hình chủ yếu phản ánh trạng thái cân bằng, lưỡng lự hoặc thay đổi trong cán cân mua — bán. Ý nghĩa cụ thể phụ thuộc vị trí xuất hiện trên biểu đồ.';
  }

  function invalidationText(p){
    return p.invalidation || 'Nếu diễn biến giá sau đó đi ngược hoàn toàn với ý nghĩa của mẫu hình, luận điểm từ mẫu này không còn giá trị.';
  }

  function compareInfo(p){
    const entries=(comparePairs[p.id]||[])
      .map(x=>({...x,pattern:patterns.find(q=>q.id===x.id)}))
      .filter(x=>x.pattern);
    return entries[0] || null;
  }

  function navHtml(level,p){
    return `<div class="lesson-topnav">
      <button class="lesson-back-home" data-nav="/">← Quay về Học</button>
      <div class="breadcrumb">
        <button class="link-button" data-nav="/">Trang chủ</button><span>›</span>
        <button class="link-button" data-nav="/">Học</button><span>›</span>
        <button class="link-button" data-nav="${level.route}">${level.name}</button><span>›</span>
        <span>${patternGroup(p)}</span><span>›</span>
        <b>${p.name} — ${p.viName}</b>
      </div>
    </div>`;
  }

  function quickFacts(p){
    return `<div class="quick-facts quick-facts-table">
      <h3>Thông tin nhanh</h3>
      <div class="qf-row"><span>Tên mẫu hình</span><b>${p.name} — ${p.viName}</b></div>
      <div class="qf-row"><span>Loại mẫu</span><b>${patternGroup(p)}</b></div>
      <div class="qf-row"><span>Hình dạng chính</span><b>${p.formation}</b></div>
      <div class="qf-row"><span>Bối cảnh cần có</span><b>${contextVi(p.context)}</b></div>
      <div class="qf-row"><span>Hàm ý</span><b>${signalVi(p)} · ${biasVi(p)}</b></div>
      <div class="qf-row"><span>Diễn biến nên theo dõi</span><b>${p.confirmation || 'Theo dõi phản ứng của các nến sau và cấu trúc giá gần nhất.'}</b></div>
    </div>`;
  }

  patternDetailPage = function standardizedCandlestickLesson(id){
    const p=patterns.find(x=>x.id===id);
    if(!p || id==='hammer') return originalPatternDetailPage(id);

    const level=levelInfo(p);
    const compare=compareInfo(p);

    return pageWrap(`${navHtml(level,p)}
      <section class="detail-hero hammer-v3-hero candle-standard-hero">
        <div>
          <div class="lesson-version">BÀI HỌC MẪU · ${difficultyVi(p.difficulty).toUpperCase()}</div>
          <div class="detail-badges">
            <span class="difficulty ${(p.difficulty||'').toLowerCase()}">${difficultyVi(p.difficulty)}</span>
            <span>${patternGroup(p)}</span>
            <span>${signalVi(p)}</span>
          </div>
          <h1>${p.name}</h1>
          <h2>${p.viName}</h2>
          <p class="hammer-v3-lead"><b>Nhận diện nhanh:</b> ${p.formation}</p>
          <div class="hammer-v3-summary">
            <span><b>Loại mẫu</b>${patternGroup(p)}</span>
            <span><b>Bối cảnh</b>${contextVi(p.context)}</span>
            <span><b>Hàm ý</b>${biasVi(p)}</span>
            <span><b>Theo dõi</b>${p.confirmation || 'Phản ứng của các nến sau'}</span>
          </div>
          <div class="detail-actions">
            <button class="secondary" data-nav="${level.route}">← ${level.name}</button>
            ${compare?`<button class="primary" data-nav="/compare/${p.id}/${compare.pattern.id}">So sánh với ${compare.pattern.name} →</button>`:''}
          </div>
        </div>
        <div class="detail-diagram hammer-v2-diagram">${learningDiagram(p.id,'hero')}<span>SƠ ĐỒ NHẬN DIỆN</span></div>
      </section>

      <section class="hammer-v2-layout">
        <div class="hammer-v2-main">
          <article class="lesson-block">
            <span class="lesson-index">01</span>
            <div><span class="kicker">CÁCH NHẬN DIỆN</span><h2>Nhìn hình dạng, số nến và mối quan hệ giữa các nến.</h2>
              <div class="hammer-v3-identify">
                <div><span>01</span><b>Loại mẫu</b><p>${patternGroup(p)}.</p></div>
                <div><span>02</span><b>Hình dạng chính</b><p>${p.formation}</p></div>
                <div><span>03</span><b>Bối cảnh</b><p>${contextVi(p.context)}.</p></div>
                <div><span>04</span><b>Điểm cần nhớ</b><p>Hình dạng chỉ là bước đầu; vị trí của mẫu trong xu hướng mới quyết định cách diễn giải.</p></div>
              </div>
            </div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">02</span>
            <div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span><h2>${supplyDemandStory(p)}</h2>
              <p>${p.formation}</p>
              <p class="lesson-caveat">Không nên dùng mẫu hình nến như một tín hiệu mua/bán độc lập. Hãy đọc cùng xu hướng trước đó, vùng giá quan trọng và diễn biến sau mẫu.</p>
            </div>
          </article>

          <article class="lesson-block context-first-block">
            <span class="lesson-index">03</span>
            <div><span class="kicker">BỐI CẢNH BẮT BUỘC</span><h2>${contextVi(p.context)}.</h2>
              <div class="hammer-v3-contexts">
                <div class="good"><span>PHÙ HỢP</span><b>Đúng vị trí trong xu hướng</b><p>${contextVi(p.context)}.</p></div>
                <div class="wait"><span>CHƯA ĐỦ</span><b>Chỉ giống về hình dạng</b><p>Nếu thiếu xu hướng trước đó hoặc biểu đồ bị cắt quá sát, chưa nên vội kết luận đây là ${p.name}.</p></div>
                <div class="bad"><span>SAI BỐI CẢNH</span><b>Vị trí không phù hợp</b><p>Cùng một cụm nến nhưng đặt ở vị trí khác có thể mang ý nghĩa hoàn toàn khác.</p></div>
              </div>
            </div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">04</span>
            <div><span class="kicker">KHI NÀO LUẬN ĐIỂM SAI</span>
              <p>${invalidationText(p)}</p>
            </div>
          </article>

          <article class="lesson-block hammer-v3-practice">
            <span class="lesson-index">05</span>
            <div><span class="kicker">NHÌN TRÊN BIỂU ĐỒ THẬT</span><h2>Ba tình huống cần phân biệt.</h2>
              <div class="hammer-v3-practice-grid">
                <div class="good"><span>Ví dụ A · Đúng bối cảnh</span><b>${contextVi(p.context)}</b><p>Khi hình dạng phù hợp và xuất hiện đúng bối cảnh, mẫu hình có giá trị quan sát cao hơn.</p></div>
                <div class="wait"><span>Ví dụ B · Chưa đủ</span><b>Hình dạng giống nhưng thiếu bối cảnh hoặc diễn biến sau mẫu.</b><p>Chưa nên gán ý nghĩa tăng/giảm chỉ vì cụm nến trông giống mẫu hình.</p></div>
                <div class="fail"><span>Ví dụ C · Luận điểm sai</span><b>${invalidationText(p)}</b><p>Khi điều kiện này xảy ra, không nên tiếp tục dùng mẫu hình làm bằng chứng cho luận điểm ban đầu.</p></div>
              </div>
            </div>
          </article>

          <article class="lesson-block analyzer-rule-block">
            <span class="lesson-index">06</span>
            <div><span class="kicker">ĐIỀU KIỆN ĐỂ NHẬN DIỆN</span><h2>Khi nào có thể xác định đây là ${p.name}?</h2>
              <div class="analyzer-rules">
                <div><b>A</b><span><strong>Hình dạng</strong><p>${p.formation}</p></span></div>
                <div><b>B</b><span><strong>Bối cảnh</strong><p>${contextVi(p.context)}.</p></span></div>
                <div><b>C</b><span><strong>Diễn biến sau mẫu</strong><p>${p.confirmation || 'Theo dõi phản ứng của các nến sau và cấu trúc giá gần nhất.'}</p></span></div>
                <div><b>D</b><span><strong>Không dùng độc lập</strong><p>Một mẫu nến đơn lẻ chưa đủ để kết luận xu hướng chắc chắn sẽ đảo chiều hoặc tiếp diễn.</p></span></div>
              </div>
            </div>
          </article>
        </div>

        <aside class="hammer-v2-aside">
          ${quickFacts(p)}
          ${compare?`<div class="aside-warning"><span>DỄ NHẦM</span><h3>${compare.pattern.name} — ${compare.pattern.viName}</h3><p>${compare.note || 'Hai mẫu có nét giống nhau nhưng khác bối cảnh hoặc cách xác nhận.'}</p><button class="secondary" data-nav="/compare/${p.id}/${compare.pattern.id}">So sánh 2 mẫu</button></div>`:''}
        </aside>
      </section>
    `);
  };
})();