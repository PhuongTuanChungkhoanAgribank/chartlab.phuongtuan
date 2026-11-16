/* ChartLab — curated compare pages for commonly confused patterns */
(function(){
  const PAIRS=[
    {
      names:['Inverted Hammer','Shooting Star'],
      title:'Cùng bóng trên dài — khác vị trí, khác hàm ý.',
      key:'Điểm phân biệt quyết định là prior trend: sau nhịp giảm nghiêng về Inverted Hammer; sau nhịp tăng nghiêng về Shooting Star.',
      rows:[
        ['Hình dạng','Thân nhỏ gần đáy range, upper shadow dài','Thân nhỏ gần đáy range, upper shadow dài'],
        ['Context','Sau downtrend / gần support','Sau uptrend / gần resistance'],
        ['Hàm ý','Potential bullish reversal','Potential bearish reversal'],
        ['Xác nhận','Bullish follow-through, mạnh hơn khi vượt High','Bearish follow-through, mạnh hơn khi phá Low'],
        ['Sai khi','Giá phá Low và tạo đáy thấp hơn','Giá vượt High và tiếp tục tạo đỉnh mới']
      ]
    },
    {
      names:['Doji','Spinning Top'],
      title:'Đều là lưỡng lự — khác nhau ở kích thước real body.',
      key:'Doji có Open và Close gần như trùng nhau; Spinning Top vẫn có một real body nhỏ nhưng nhìn thấy rõ.',
      rows:[
        ['Real body','Gần như bằng 0 / Open ≈ Close','Nhỏ nhưng vẫn hữu hình'],
        ['Shadows','Có thể ngắn hoặc dài','Thường có shadow hai phía'],
        ['Ý nghĩa','Neutral / indecision','Neutral / indecision'],
        ['Context','Càng đáng chú ý ở trend extreme/key level','Càng đáng chú ý ở trend extreme/consolidation'],
        ['Xác nhận','Breakout khỏi range theo context','Breakout/follow-through theo context']
      ]
    },
    {
      names:['Piercing Pattern','Dark Cloud Cover'],
      title:'Hai mẫu đối xứng — một ở đáy, một ở đỉnh.',
      key:'Piercing là bullish reversal sau downtrend; Dark Cloud Cover là bearish reversal sau uptrend. Cả hai đều đọc độ xuyên sâu vào real body nến đầu.',
      rows:[
        ['Nến đầu','Nến giảm dài','Nến tăng dài'],
        ['Nến hai','Nến tăng mở dưới Low rồi hồi sâu','Nến giảm mở cao rồi rơi sâu'],
        ['Mốc quan trọng','Close nến hai vượt midpoint thân nến đầu','Close nến hai xuyên sâu vào thân nến đầu; TA-Lib mặc định penetration 0.5'],
        ['Context','Downtrend','Uptrend'],
        ['Xác nhận','Tăng tiếp / phá kháng cự','Giảm tiếp / phá hỗ trợ']
      ]
    },
    {
      names:['Morning Star','Evening Star'],
      title:'Cùng cấu trúc 3 nến — đảo ngược hoàn toàn theo hướng trend.',
      key:'Morning Star hình thành sau downtrend và nghiêng bullish; Evening Star hình thành sau uptrend và nghiêng bearish.',
      rows:[
        ['Nến 1','Giảm dài','Tăng dài'],
        ['Nến 2','Star thân nhỏ phía dưới','Star thân nhỏ phía trên'],
        ['Nến 3','Tăng, đóng sâu vào thân nến 1','Giảm, đóng sâu vào thân nến 1'],
        ['Context','Downtrend','Uptrend'],
        ['Invalidation','Phá đáy star','Vượt đỉnh star']
      ]
    },
    {
      names:['Dragonfly Doji','Gravestone Doji'],
      title:'Một từ chối giá thấp — một từ chối giá cao.',
      key:'Dragonfly có thân Doji gần High và lower shadow dài; Gravestone có thân Doji gần Low và upper shadow dài. Cả hai đều context-dependent.',
      rows:[
        ['Vị trí Open≈Close','Gần High','Gần Low'],
        ['Shadow nổi bật','Lower shadow dài','Upper shadow dài'],
        ['Context đáng chú ý','Sau decline / tại support','Sau advance / tại resistance'],
        ['Cách đọc','Lower-price rejection','Upper-price rejection'],
        ['Lưu ý TA-Lib','Output +100 không đồng nghĩa luôn bullish','Output +100 không đồng nghĩa luôn bullish']
      ]
    },
    {
      names:['Harami Pattern','Engulfing Pattern'],
      title:'Một mẫu co vào — một mẫu bao phủ ra ngoài.',
      key:'Harami cho thấy real body nến hai co vào trong thân nến một; Engulfing cho thấy real body nến hai trái màu bao phủ thân nến một.',
      rows:[
        ['Quan hệ body','Nến 2 nằm trong body nến 1','Body nến 2 bao phủ body nến 1'],
        ['Momentum','Co lại / cảnh báo thay đổi','Chuyển quyền kiểm soát mạnh hơn'],
        ['Màu nến 2','Không bắt buộc trái màu trong TA-Lib','Trái màu với nến 1'],
        ['Tín hiệu','Reversal warning','Reversal candidate'],
        ['Xác nhận','Breakout khỏi thân/range theo hướng đảo chiều','Follow-through theo hướng Engulfing']
      ]
    }
  ];

  function findByName(name){ return (window.CHARTLAB_PATTERNS||window.patterns||[]).find(p=>p.name===name); }
  function pairRoute(a,b){ return '#/compare/'+a.id+'/'+b.id; }
  function esc(s=''){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

  function resolved(){
    return PAIRS.map(x=>{
      const a=findByName(x.names[0]), b=findByName(x.names[1]);
      return a&&b?{...x,a,b}:null;
    }).filter(Boolean);
  }

  function content(x){
    const {a,b}=x;
    return `
      <main id="main-content" class="compare-v2 curated-compare">
        <div class="breadcrumb">
          <button class="link-button" data-nav="/pattern/${a.id}">${esc(a.name)}</button><span>›</span>
          <b>So sánh với ${esc(b.name)}</b>
        </div>
        <section class="compare-v2-hero">
          <span class="kicker">SO SÁNH MẪU HÌNH</span>
          <h1><span>${esc(a.name)}</span> <i>vs</i> <span>${esc(b.name)}</span></h1>
          <p>${esc(x.title)}</p>
        </section>
        <section class="compare-v2-cards">
          <article class="compare-v2-card">
            <div class="compare-v2-head"><span class="compare-v2-tag">${a.candles} nến · ${esc(a.signalType||'')}</span><h2>${esc(a.name)}</h2><h3>${esc(a.viName||'')}</h3></div>
            <div class="compare-v2-candle">${typeof learningDiagram==='function'?learningDiagram(a.id,'hero'):''}</div>
            <p><b>Bối cảnh:</b> ${esc(a.context||'Phụ thuộc bối cảnh')}.</p>
          </article>
          <article class="compare-v2-card">
            <div class="compare-v2-head"><span class="compare-v2-tag">${b.candles} nến · ${esc(b.signalType||'')}</span><h2>${esc(b.name)}</h2><h3>${esc(b.viName||'')}</h3></div>
            <div class="compare-v2-candle">${typeof learningDiagram==='function'?learningDiagram(b.id,'hero'):''}</div>
            <p><b>Bối cảnh:</b> ${esc(b.context||'Phụ thuộc bối cảnh')}.</p>
          </article>
        </section>
        <section class="compare-v2-key"><span class="kicker">KHÁC BIỆT CỐT LÕI</span><h2>${esc(x.key)}</h2></section>
        <section class="compare-v2-table">
          <div class="compare-v2-row header"><span>Tiêu chí</span><span>${esc(a.name)}</span><span>${esc(b.name)}</span></div>
          ${x.rows.map(r=>`<div class="compare-v2-row"><b>${esc(r[0])}</b><span>${esc(r[1])}</span><span>${esc(r[2])}</span></div>`).join('')}
        </section>
        <section class="rule-box lesson-v2-rule">
          <span>NGUYÊN TẮC CHARTLAB</span>
          <h3>Đừng chọn mẫu chỉ vì hình giống nhau.</h3>
          <p>Ưu tiên theo thứ tự: geometry → prior trend → key level → confirmation. Nếu screenshot thiếu context, AI phải hạ confidence thay vì cố chọn một tên.</p>
        </section>
        <div class="compare-v2-actions">
          <button class="secondary" data-nav="/pattern/${a.id}">← ${esc(a.name)}</button>
          <button class="secondary" data-nav="/pattern/${b.id}">${esc(b.name)} →</button>
        </div>
      </main>`;
  }

  function render(){
    const list=resolved();
    const hash=location.hash;
    const x=list.find(p=>hash===pairRoute(p.a,p.b)||hash===pairRoute(p.b,p.a));
    if(!x) return false;
    const app=document.getElementById('app'); if(!app) return false;
    app.innerHTML=(typeof pageWrap==='function')?pageWrap(content(x)):content(x);
    window.scrollTo({top:0,behavior:'auto'});
    return true;
  }

  function exposePairs(){
    window.CHARTLAB_CURATED_COMPARE_PAIRS=resolved().map(x=>({a:x.a.id,b:x.b.id,names:x.names}));
  }
  window.addEventListener('hashchange',()=>setTimeout(render,0));
  document.addEventListener('DOMContentLoaded',()=>{exposePairs();setTimeout(render,0);});
  setTimeout(()=>{exposePairs();render();},0);
})();
