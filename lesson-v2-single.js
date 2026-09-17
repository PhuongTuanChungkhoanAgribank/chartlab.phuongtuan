/* chartlab.phuongtuan — Lesson v2 / Phase 2
 * Level 02 Single Candle: rejection family
 * Hammer · Hanging Man · Inverted Hammer · Shooting Star
 */

(function applySingleCandleV2(){
  const candleSource = 'https://candlecharts.com/candlestick-patterns/';
  const sources = {
    hangingman: 'https://ta-lib.org/functions/cdlhangingman',
    invertedhammer: 'https://ta-lib.org/functions/cdlinvertedhammer',
    shootingstar: 'https://ta-lib.org/functions/cdlshootingstar.html'
  };

  const configs = {
    hangingman: {
      name:'Hanging Man', viName:'Người Treo Cổ', bias:'Bearish', signalType:'Potential bearish reversal',
      tagline:'Lower-price rejection xuất hiện sau uptrend — một cảnh báo rằng cấu trúc tăng đã trở nên dễ tổn thương.',
      geometry:[
        ['Real body','Nhỏ, nằm gần phần trên của Range.'],
        ['Lower shadow','Rất dài; bản classic thường khoảng 2–3× real body.'],
        ['Upper shadow','Rất ngắn hoặc gần như không có.'],
        ['Body color','Không phải tiêu chí quyết định; context + confirmation quan trọng hơn.']
      ],
      story:[
        ['Sell-off','Trong phiên, phe bán có lúc ép giá xuống sâu.'],
        ['Recovery','Giá được kéo ngược lên gần vùng mở/đóng cửa.'],
        ['Warning','Sau một uptrend, cú sell-off intrabar cho thấy thị trường không còn “êm” như trước.']
      ],
      contextGood:'Sau một uptrend/rally rõ, đặc biệt gần resistance hoặc vùng giá đã tăng kéo dài.',
      contextBad:'Sau downtrend hoặc giữa range không có prior advance; khi đó geometry này không nên được gắn nhãn Hanging Man.',
      confirmation:'Hanging Man cần bearish confirmation. CandleCharts nhấn mạnh phiên kế tiếp mở thấp hơn và tốt hơn nữa là đóng dưới real body của Hanging Man. Break Low làm bằng chứng bearish mạnh thêm.',
      invalidation:'Bearish thesis suy yếu nếu giá giữ vững phía trên real body, vượt High của Hanging Man và uptrend tiếp tục có follow-through.',
      talib:'TA-Lib CDLHANGINGMAN nhận diện geometry bearish nhưng không xác minh prior uptrend. ChartLab vì vậy không cho Analyzer gọi Hanging Man nếu screenshot không cho thấy advance trước đó.',
      fallback:'Nếu thiếu prior uptrend: “lower-shadow rejection / umbrella line”, không kết luận bearish reversal.',
      counterpart:'hammer', counterpartLabel:'Hammer',
      source:sources.hangingman,
      diagram:'LOWER-SHADOW REJECTION · TOP CONTEXT'
    },
    invertedhammer: {
      name:'Inverted Hammer', viName:'Búa Ngược', bias:'Bullish', signalType:'Potential bullish reversal',
      tagline:'Một cú thử giá lên sau downtrend: demand đã xuất hiện, nhưng vẫn cần nến sau xác nhận rằng lực mua có thể duy trì.',
      geometry:[
        ['Real body','Nhỏ, nằm gần phần dưới của Range.'],
        ['Upper shadow','Dài, cho thấy giá đã được đẩy lên đáng kể trong phiên.'],
        ['Lower shadow','Rất ngắn hoặc gần như không có.'],
        ['Body color','Thứ yếu; prior downtrend + follow-through mới quyết định ý nghĩa.']
      ],
      story:[
        ['Attempt','Sau downtrend, bên mua có lúc đẩy giá lên mạnh.'],
        ['Give-back','Một phần mức tăng bị trả lại trước Close, nên demand chưa hoàn toàn kiểm soát.'],
        ['Potential shift','Việc giá có thể rally intrabar là bằng chứng sớm rằng supply không còn áp đảo tuyệt đối.']
      ],
      contextGood:'Sau downtrend/nhịp giảm rõ, gần vùng hỗ trợ hoặc sau một giai đoạn selling pressure.',
      contextBad:'Sau uptrend thì cùng hình học gần với Shooting Star; giữa range hoặc thiếu prior trend thì không nên gọi bullish reversal.',
      confirmation:'CandleCharts yêu cầu confirmation ở phiên sau: open cao hơn và đặc biệt là close cao hơn so với close của Inverted Hammer. Vượt High là bằng chứng bullish mạnh hơn.',
      invalidation:'Bullish thesis suy yếu nếu giá nhanh chóng xuyên Low của Inverted Hammer hoặc tiếp tục lower low mà không có follow-through tăng.',
      talib:'TA-Lib CDLINVERTEDHAMMER kiểm tra small body + long upper shadow + little/no lower shadow và quan hệ với nến trước, nhưng không xác minh preceding downtrend.',
      fallback:'Nếu thiếu prior downtrend: “upper-shadow rejection / inverted-hammer-like line”, không kết luận bullish reversal.',
      counterpart:'shootingstar', counterpartLabel:'Shooting Star',
      source:sources.invertedhammer,
      diagram:'UPPER-SHADOW TEST · BOTTOM CONTEXT'
    },
    shootingstar: {
      name:'Shooting Star', viName:'Sao Băng', bias:'Bearish', signalType:'Potential bearish reversal',
      tagline:'Giá được đẩy lên cao trong uptrend nhưng không giữ được vùng cao; upper shadow dài ghi lại một lần breakout/thử giá bị từ chối trong phiên.',
      geometry:[
        ['Real body','Nhỏ, nằm gần phần dưới của Range.'],
        ['Upper shadow','Dài; phần giá cao bị từ chối là đặc điểm chính.'],
        ['Lower shadow','Rất ngắn hoặc gần như không có.'],
        ['Body color','Không phải điều kiện cốt lõi; location + confirmation quan trọng hơn.']
      ],
      story:[
        ['Push higher','Phe mua tiếp tục đẩy giá lên theo uptrend.'],
        ['Rejection','Vùng giá cao không được chấp nhận; supply đẩy giá quay xuống.'],
        ['Vulnerability','Close thấp trong Range cho thấy bên mua không giữ được phần lớn thành quả intrabar.']
      ],
      contextGood:'Sau uptrend/rally rõ, đặc biệt gần resistance, prior high hoặc sau một đoạn tăng mở rộng.',
      contextBad:'Sau downtrend thì cùng hình học gần với Inverted Hammer; thiếu prior advance thì chỉ nên mô tả upper-shadow rejection.',
      confirmation:'Theo dõi bearish follow-through ở các nến sau: close thấp hơn, mất real body và mạnh hơn nếu phá Low của Shooting Star. Confirmation giúp tách rejection thật khỏi một nhịp rung lắc bình thường.',
      invalidation:'Bearish thesis suy yếu nếu giá sớm vượt High của Shooting Star và tiếp tục tạo higher high với follow-through.',
      talib:'TA-Lib CDLSHOOTINGSTAR nhận diện geometry bearish và quan hệ gap/relative position với nến trước, nhưng không xác minh preceding uptrend.',
      fallback:'Nếu thiếu prior uptrend: “upper-shadow rejection”, không gắn nhãn Shooting Star với confidence cao.',
      counterpart:'invertedhammer', counterpartLabel:'Inverted Hammer',
      source:sources.shootingstar,
      diagram:'UPPER-PRICE REJECTION · TOP CONTEXT'
    }
  };

  // Patch learning-card metadata so hover, compare and related sections inherit v2 wording.
  Object.entries(configs).forEach(([id,c])=>{
    const p=(window.CHARTLAB_PATTERNS||[]).find(x=>x.id===id);
    if(!p) return;
    Object.assign(p,{
      viName:c.viName,
      bias:c.bias,
      difficulty:'Core',
      signalType:c.signalType,
      formation:c.tagline,
      context:`Phù hợp: ${c.contextGood} Không đủ context: ${c.contextBad}`,
      confirmation:c.confirmation,
      invalidation:c.invalidation,
      implementationNote:c.talib,
      sourceLabel:`CandleCharts / Steve Nison; đối chiếu TA-Lib ${p.talib||''}.`,
      source:candleSource,
      secondarySource:c.source,
      verified:true,
      lessonVersion:'2.0.0'
    });
  });

  try {
    if(typeof levels!=='undefined' && levels[1]) levels[1].desc='Geometry · Prior Trend · Location · Confirmation · Failure';
  } catch(_) {}

  // Level 02 introduction: teaches the rules before the learner opens individual cards.
  const previousLevelPage=levelPage;
  levelPage=function levelPageSingleV2(n){
    if(n!==2) return previousLevelPage(n);
    const list=patterns.filter(p=>p.candles===1);
    const filtered=filterPatterns(list);
    const families=[
      ['Lower-shadow umbrella','Hammer ↔ Hanging Man','Gần cùng geometry. Downtrend tạo Hammer; uptrend tạo Hanging Man.'],
      ['Upper-shadow rejection','Inverted Hammer ↔ Shooting Star','Gần cùng geometry. Downtrend tạo Inverted Hammer; uptrend tạo Shooting Star.'],
      ['Indecision','Doji · Spinning Top · High Wave','Body co nhỏ hoặc hai phía đều bị từ chối; không tự mang một hướng giao dịch cố định.'],
      ['Conviction','Marubozu · Long Line · Belt Hold','Body chiếm ưu thế trong Range; cần đọc hướng Close và vị trí trong trend.']
    ];
    return pageWrap(`${breadcrumb(['Level 02','Single Candle'])}
      <section class="single-candle-intro">
        <div><div class="lesson-version">LESSON v2.0 · SINGLE CANDLE</div><span class="kicker">LEVEL 02</span><h1>Single Candle</h1><h2>Đừng học 17 cái tên. Học 4 câu hỏi.</h2><p>Một mẫu hình 1 nến chỉ đáng gọi tên khi <b>geometry</b> phù hợp, <b>prior trend</b> đủ rõ, <b>location</b> có ý nghĩa và phản ứng sau đó cho biết rejection/conviction có được duy trì hay không.</p></div>
        <div class="single-candle-checklist"><article><b>01</b><span>Geometry</span><p>Body nằm đâu? Shadow dài bên nào? Tỷ lệ so với Range?</p></article><article><b>02</b><span>Prior trend</span><p>Trước nến này là advance, decline hay trading range?</p></article><article><b>03</b><span>Location</span><p>Pattern nằm ở support/resistance, extreme hay giữa range?</p></article><article><b>04</b><span>Confirmation</span><p>Nến sau xác nhận, phủ nhận hay chưa cho thêm thông tin?</p></article></div>
      </section>

      <section class="lesson-v2-section"><div class="section-heading compact"><div><span class="kicker">FAMILY MAP</span><h2>Nhóm theo hành vi, không học thuộc rời rạc</h2></div><p>4 bài đầu đã được nâng lên v2 và trở thành reference family cho toàn bộ Level 02.</p></div><div class="family-map">${families.map((x,i)=>`<article class="family-card ${i<2?'upgraded':''}"><span>${i<2?'v2 READY':'NEXT'}</span><h3>${x[0]}</h3><h4>${x[1]}</h4><p>${x[2]}</p>${i===0?'<div><button data-nav="/pattern/hammer">Hammer</button><button data-nav="/pattern/hangingman">Hanging Man</button></div>':i===1?'<div><button data-nav="/pattern/invertedhammer">Inverted Hammer</button><button data-nav="/pattern/shootingstar">Shooting Star</button></div>':''}</article>`).join('')}</div></section>

      <section class="rule-box lesson-v2-rule"><span>NGUYÊN TẮC CHARTLAB #02</span><h3>Prior trend là một phần của tên pattern.</h3><p>Không thấy prior trend thì hạ cấp kết luận về “shape/rejection line”. Đặc biệt: Hammer ≠ Hanging Man chỉ vì màu nến; Inverted Hammer ≠ Shooting Star chỉ vì upper shadow dài.</p></section>

      <div class="listing-head single-list-head"><div><span class="kicker">${list.length} SINGLE-CANDLE PATTERNS</span><h2>Thư viện Level 02</h2><p>4 reference lessons đã nâng lên v2; các family còn lại sẽ được audit tiếp theo cùng framework.</p></div><div class="listing-stat"><b>4</b><span>v2 ready</span></div></div>
      <div class="filters"><label class="search">${searchIcon()}<input id="pattern-search" value="${escAttr(state.library.query)}" placeholder="Tìm Hammer, Doji, Marubozu..."></label><div class="filter-group" data-filter="bias">${['All','Bullish','Bearish','Neutral'].map(x=>`<button data-value="${x}" class="${state.library.bias===x?'selected':''}">${x==='All'?'Tất cả':x}</button>`).join('')}</div><div class="filter-group" data-filter="difficulty">${['All','Core','Intermediate','Advanced'].map(x=>`<button data-value="${x}" class="${state.library.difficulty===x?'selected':''}">${x==='All'?'Mọi cấp':x}</button>`).join('')}</div></div><div class="result-count">Hiển thị <b>${filtered.length}</b> / ${list.length} mẫu hình</div>${patternGridOrEmpty(filtered)}
    `);
  };

  // Detail-page template for the other three reference patterns.
  const previousPatternDetailPage=patternDetailPage;
  patternDetailPage=function singleCandleDetailV2(id){
    const c=configs[id];
    if(!c) return previousPatternDetailPage(id);
    const p=(window.CHARTLAB_PATTERNS||[]).find(x=>x.id===id);
    if(!p) return previousPatternDetailPage(id);
    const analyzerRules=[
      ['A','Geometry',`Chỉ gọi ${c.name} khi body/shadow đúng family và nến nhìn đủ rõ.`],
      ['B','Prior trend',c.bias==='Bullish'?'Phải thấy decline/downtrend trước pattern.':'Phải thấy advance/uptrend trước pattern.'],
      ['C','Location','Nếu pattern nằm giữa range hoặc screenshot quá ngắn, hạ confidence và mô tả rejection thay vì reversal.'],
      ['D','Confirmation','Tách pattern recognition khỏi reversal confirmation; theo dõi nến sau và break của High/Low.'],
      ['E','Fallback label',c.fallback]
    ];
    return pageWrap(`${breadcrumb(['Level 02','Single Candle',c.name])}
      <section class="detail-hero hammer-v2-hero"><div><div class="lesson-version">REFERENCE LESSON v2.0 · CORE</div><div class="detail-badges"><span class="difficulty core">Core</span><span>1 Candle</span><span>${c.signalType}</span></div><h1>${c.name}</h1><h2>${c.viName}</h2><p class="ten-second"><b>Ý chính:</b> ${c.tagline}</p><div class="detail-actions"><button class="secondary" data-nav="/level/2">← Level 02</button><button class="primary" data-nav="/compare/${id}/${c.counterpart}">So sánh ${c.counterpartLabel} ${arrow()}</button></div></div><div class="detail-diagram hammer-v2-diagram">${learningDiagram(id,'hero')}<span>${c.diagram}</span></div></section>

      <section class="hammer-v2-layout"><div class="hammer-v2-main">
        <article class="lesson-block"><span class="lesson-index">01</span><div><span class="kicker">NHẬN DIỆN HÌNH HỌC</span><h2>Đọc body và shadow trước khi gọi tên.</h2><div class="geometry-grid">${c.geometry.map(x=>`<div><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div></div></article>
        <article class="lesson-block"><span class="lesson-index">02</span><div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span><h2>Pattern ghi lại một lần quyền kiểm soát bị thử thách.</h2><div class="story-flow">${c.story.map((x,i)=>`${i?`<i>${arrow()}</i>`:''}<div><b>${i+1} · ${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div><p class="lesson-caveat">Intrabar rejection là <b>bằng chứng</b>, không phải kết luận trend đã đảo chiều.</p></div></article>
        <article class="lesson-block context-first-block"><span class="lesson-index">03</span><div><span class="kicker">CONTEXT BẮT BUỘC</span><h2>Prior trend quyết định tên và hàm ý.</h2><div class="context-split"><div class="good-context"><b>Context phù hợp</b><p>${c.contextGood}</p></div><div class="bad-context"><b>Context không đủ</b><p>${c.contextBad}</p></div></div><div class="context-note strong"><b>Pair logic</b><span>${c.name} và ${c.counterpartLabel} là cặp cần học cùng nhau để tránh nhận diện chỉ bằng silhouette.</span></div></div></article>
        <article class="lesson-block"><span class="lesson-index">04</span><div><span class="kicker">CONFIRMATION</span><h2>Chờ follow-through phù hợp với reversal thesis.</h2><p>${c.confirmation}</p></div></article>
        <article class="lesson-block"><span class="lesson-index">05</span><div><span class="kicker">FAILURE / INVALIDATION</span><h2>Pattern tồn tại trong lịch sử; thesis có thể thất bại.</h2><p>${c.invalidation}</p></div></article>
        <article class="lesson-block talib-boundary-block"><span class="lesson-index">06</span><div><span class="kicker">TA-LIB BOUNDARY</span><h2>Scanner geometry không thay thế trend context.</h2><p>${c.talib}</p><div class="context-note"><b>ChartLab policy</b><span>TA-Lib hit chỉ là candidate detection. Muốn diễn giải reversal phải vượt qua context gate.</span></div></div></article>
        <article class="lesson-block analyzer-rule-block"><span class="lesson-index">07</span><div><span class="kicker">RULE CHO CHART ANALYZER</span><h2>Không đủ context → downgrade label.</h2><div class="analyzer-rules">${analyzerRules.map(x=>`<div><b>${x[0]}</b><span><strong>${x[1]}</strong><p>${x[2]}</p></span></div>`).join('')}</div><div class="rule-box compact-rule"><span>CONFIDENCE POLICY</span><h3>Confidence = nhận diện + dữ liệu đủ.</h3><p>Không phải xác suất giá đi đúng hướng pattern.</p></div></div></article>
      </div><aside class="hammer-v2-aside"><div class="quick-facts"><h3>Quick facts · v2</h3>${fact('Tên',`${c.name} — ${c.viName}`)}${fact('Context',c.bias==='Bullish'?'Sau decline/downtrend':'Sau advance/uptrend')}${fact('Bias',c.signalType)}${fact('Lesson','v2.0 · Audited',true)}</div><div class="source-box"><span>NGUỒN ĐỊNH NGHĨA</span><p>CandleCharts cho classic definition/context; TA-Lib được dùng để audit scanner implementation và giới hạn của automated detection.</p><a href="${candleSource}" target="_blank" rel="noreferrer">CandleCharts glossary ↗</a><a href="${c.source}" target="_blank" rel="noreferrer">TA-Lib function ↗</a></div><div class="aside-warning"><span>PAIR STUDY</span><h3>${c.counterpartLabel}</h3><p>Cùng hoặc gần cùng geometry nhưng prior trend đổi tên và implication.</p><button class="secondary" data-nav="/compare/${id}/${c.counterpart}">So sánh 2 mẫu</button></div></aside></section>
    `);
  };
})();
