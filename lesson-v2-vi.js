/* chartlab.phuongtuan — Vietnamese-first lesson terminology
 * Keep English only for proper names / pattern names / source names.
 */
(function chartlabVietnameseFirst(){
  const replacements = [
    // Version / navigation / section labels
    ['REFERENCE LESSON v2.0 · CORE','BÀI HỌC MẪU v2.0 · CỐT LÕI'],
    ['LESSON v2.0 · SINGLE CANDLE','BÀI HỌC v2.0 · NẾN ĐƠN'],
    ['LESSON v2.0 · FOUNDATION','BÀI HỌC v2.0 · NỀN TẢNG'],
    ['SINGLE-CANDLE PATTERNS','MẪU HÌNH NẾN ĐƠN'],
    ['SCHEMATIC · LOWER-PRICE REJECTION','SƠ ĐỒ · TỪ CHỐI VÙNG GIÁ THẤP'],
    ['LOWER-SHADOW REJECTION · TOP CONTEXT','BÓNG DƯỚI DÀI · BỐI CẢNH VÙNG ĐỈNH'],
    ['UPPER-SHADOW TEST · BOTTOM CONTEXT','BÓNG TRÊN DÀI · BỐI CẢNH VÙNG ĐÁY'],
    ['UPPER-PRICE REJECTION · TOP CONTEXT','TỪ CHỐI VÙNG GIÁ CAO · BỐI CẢNH VÙNG ĐỈNH'],
    ['Candlestick Anatomy','Cấu tạo nến'],
    ['Single Candle','Nến đơn'],
    ['LEVEL 01','CẤP ĐỘ 01'],
    ['LEVEL 02','CẤP ĐỘ 02'],
    ['METHODOLOGY','PHƯƠNG PHÁP'],
    ['FAMILY MAP','BẢN ĐỒ NHÓM'],
    ['OUTPUT POLICY','NGUYÊN TẮC ĐẦU RA'],
    ['Quick facts · v2','Thông tin nhanh · v2'],
    ['v2 READY','v2 ĐÃ CẬP NHẬT'],
    ['v2 ready','đã cập nhật v2'],
    ['NEXT','TIẾP THEO'],

    // Core technical labels
    ['Relative Size + Context','Kích thước tương đối + bối cảnh'],
    ['Range → Journey → Close → Context','Biên độ → Diễn biến → Đóng cửa → Bối cảnh'],
    ['Close Location','Vị trí đóng cửa'],
    ['Body / Range','Tỷ lệ thân / biên độ'],
    ['Upper Shadow','Bóng trên'],
    ['Upper shadow','Bóng trên'],
    ['Lower Shadow','Bóng dưới'],
    ['Lower shadow','Bóng dưới'],
    ['Real Body','Thân nến'],
    ['Real body','Thân nến'],
    ['Body color','Màu thân nến'],
    ['Range','Biên độ'],
    ['Geometry','Hình dạng'],
    ['Prior trend','Xu hướng trước đó'],
    ['Location','Vị trí'],
    ['Confirmation','Xác nhận'],
    ['Failure','Thất bại'],
    ['Potential bullish reversal','Khả năng đảo chiều tăng'],
    ['Potential bearish reversal','Khả năng đảo chiều giảm'],
    ['Bullish','Tăng giá'],
    ['Bearish','Giảm giá'],
    ['Neutral','Trung tính'],
    ['Core','Cốt lõi'],
    ['Intermediate','Trung cấp'],
    ['Advanced','Nâng cao'],
    ['1 Candle','1 nến'],
    ['Family','Nhóm'],
    ['Bias','Hàm ý'],
    ['Lesson','Bài học'],
    ['Audited','Đã kiểm định'],

    // Family labels
    ['Lower-shadow umbrella','Nhóm bóng dưới dài'],
    ['Upper-shadow rejection','Nhóm bóng trên bị từ chối'],
    ['Indecision','Lưỡng lự'],
    ['Conviction','Động lượng rõ'],

    // Common explanatory English
    ['Pattern Engine','hệ thống nhận diện mẫu hình'],
    ['reference family','nhóm mẫu chuẩn'],
    ['reference lessons','bài học mẫu'],
    ['framework','khung phương pháp'],
    ['pattern recognized','mẫu hình được nhận diện'],
    ['trade recommendation','khuyến nghị giao dịch'],
    ['prior downtrend','xu hướng giảm trước đó'],
    ['prior uptrend','xu hướng tăng trước đó'],
    ['prior decline','nhịp giảm trước đó'],
    ['prior advance','nhịp tăng trước đó'],
    ['preceding downtrend','xu hướng giảm trước đó'],
    ['preceding uptrend','xu hướng tăng trước đó'],
    ['downtrend','xu hướng giảm'],
    ['uptrend','xu hướng tăng'],
    ['trading range','vùng đi ngang'],
    ['selling pressure','áp lực bán'],
    ['support/resistance','hỗ trợ/kháng cự'],
    ['resistance','kháng cự'],
    ['support','hỗ trợ'],
    ['follow-through','diễn biến xác nhận'],
    ['screenshot','ảnh biểu đồ'],
    ['confidence','độ tin cậy'],
    ['classic','kinh điển'],
    ['geometry','hình dạng'],
    ['context','bối cảnh'],
    ['pattern','mẫu hình'],
    ['intrabar','trong phiên'],
    ['demand','lực cầu'],
    ['supply','lực cung'],
    ['rally','nhịp tăng'],

    // Story-flow labels
    ['Sell-off','Phe bán ép giá'],
    ['Recovery','Phục hồi'],
    ['Warning','Cảnh báo'],
    ['Attempt','Thử đẩy giá'],
    ['Give-back','Trả lại một phần mức tăng'],
    ['Potential shift','Dấu hiệu thay đổi'],
    ['Push higher','Đẩy giá lên'],
    ['Rejection','Từ chối giá'],
    ['Vulnerability','Dấu hiệu suy yếu'],

    // Sentences / phrases visible in upgraded lessons
    ['Lower-price rejection xuất hiện sau xu hướng tăng','Giá thấp bị từ chối sau xu hướng tăng'],
    ['upper-shadow rejection','sự từ chối ở vùng giá cao'],
    ['lower-shadow rejection','sự từ chối ở vùng giá thấp'],
    ['umbrella line','dạng nến có bóng dưới dài'],
    ['inverted-hammer-like line','dạng nến gần giống Inverted Hammer'],
    ['bullish reversal','đảo chiều tăng'],
    ['bearish reversal','đảo chiều giảm'],
    ['bullish confirmation','xác nhận tăng'],
    ['bearish confirmation','xác nhận giảm'],
    ['bullish thesis','luận điểm tăng'],
    ['bearish thesis','luận điểm giảm'],
    ['higher high','đỉnh cao hơn'],
    ['lower low','đáy thấp hơn'],
    ['Break Low','Phá đáy nến'],
    ['Break High','Vượt đỉnh nến'],
    ['open cao hơn','mở cửa cao hơn'],
    ['close cao hơn','đóng cửa cao hơn'],
    ['close thấp hơn','đóng cửa thấp hơn'],

    // Formula labels / text (keep compact O/H/L/C notation)
    ['High − max(O,C)','H − max(O,C)'],
    ['min(O,C) − Low','min(O,C) − L'],
    ['High − Low','H − L'],
    ['(Close − Low) / Biên độ','(C − L) / Biên độ'],
    ['|Close − Open|','|C − O|'],

    // Common UI remnants
    ['All','Tất cả'],
    ['Mọi cấp','Mọi cấp'],
    ['Tất cả patterns','Tất cả mẫu hình'],
    ['TA-LIB BOUNDARY','GIỚI HẠN NHẬN DIỆN TỰ ĐỘNG'],
    ['RULE CHO CHART ANALYZER','QUY TẮC CHO BỘ PHÂN TÍCH BIỂU ĐỒ'],
    ['CONFIDENCE POLICY','NGUYÊN TẮC ĐỘ TIN CẬY'],
    ['PAIR STUDY','SO SÁNH CẶP MẪU'],
    ['Pattern recognized ≠ trade recommendation','Nhận diện được mẫu hình ≠ khuyến nghị giao dịch'],
    ['candidate detection','nhận diện mẫu hình nghi vấn'],
    ['candidate pattern','mẫu hình nghi vấn'],
    ['Candidate','Mẫu nghi vấn'],
    ['candidate','mẫu nghi vấn'],
    ['low confidence','độ tin cậy thấp'],
    ['Confidence','Độ tin cậy'],
    ['confidence','độ tin cậy'],
    ['pattern recognition','nhận diện mẫu hình'],
    ['Pattern recognition','Nhận diện mẫu hình'],
    ['reversal thesis','luận điểm đảo chiều'],
    ['Reversal thesis','Luận điểm đảo chiều'],
    ['reversal warning','cảnh báo đảo chiều'],
    ['Reversal warning','Cảnh báo đảo chiều'],
    ['Potential reversal / rejection','Khả năng đảo chiều / từ chối giá'],
    ['Directional / reversal','Định hướng / đảo chiều'],
    ['False breakout / trap','Phá vỡ giả / bẫy giá'],
    ['Reversal / false breakout','Đảo chiều / phá vỡ giả'],
    ['Directional','Định hướng'],
    ['Continuation','Tiếp diễn'],
    ['Reversal','Đảo chiều'],
    ['Low momentum','Động lượng thấp'],
    ['Context-dependent','Phụ thuộc bối cảnh'],
    ['Sharp sentiment shift','Thay đổi tâm lý đột ngột'],
    ['Established trend','Xu hướng đã hình thành rõ'],
    ['Extended trend','Xu hướng kéo dài'],
    ['Trend extreme','Vùng cực trị của xu hướng'],
    ['At trend extreme','Tại vùng cực trị của xu hướng'],
    ['After directional trend','Sau một xu hướng tăng hoặc giảm rõ'],
    ['Inside established trend','Trong một xu hướng đã hình thành rõ'],
    ['bottoming zone','vùng tạo đáy'],
    ['high volatility','biến động mạnh'],
    ['key level','vùng giá quan trọng'],
    ['key levels','vùng giá quan trọng'],
    ['breakout','phá vỡ'],
    ['Breakout','Phá vỡ'],
    ['false breakout','phá vỡ giả'],
    ['Follow-through','Diễn biến xác nhận'],
    ['follow-through','diễn biến xác nhận'],
    ['scanner','hệ thống quét'],
    ['Scanner','Hệ thống quét'],
    ['implementation','cách triển khai'],
    ['Implementation','Cách triển khai'],
    ['boundary','giới hạn'],
    ['Boundary','Giới hạn'],
    ['output','kết quả'],
    ['Output','Kết quả'],
    ['policy','nguyên tắc'],
    ['Policy','Nguyên tắc'],
    ['downgrade label','hạ mức kết luận'],
    ['Fallback label','Cách gọi thay thế'],
    ['fallback label','cách gọi thay thế'],
    ['shape/rejection line','hình dạng / nến từ chối giá'],
    ['silhouette','hình dáng bên ngoài'],
    ['relative position','vị trí tương đối'],
    ['relative size','kích thước tương đối'],
    ['Relative size','Kích thước tương đối'],
    ['real bodies','thân nến'],
    ['real body','thân nến'],
    ['Real bodies','Thân nến'],
    ['open','giá mở cửa'],
    ['Open','Giá mở cửa'],
    ['close','giá đóng cửa'],
    ['Close','Giá đóng cửa'],
    ['high','giá cao nhất'],
    ['High','Giá cao nhất'],
    ['low','giá thấp nhất'],
    ['Low','Giá thấp nhất'],
    ['upper shadow','bóng trên'],
    ['lower shadow','bóng dưới'],
    ['shadow','bóng nến'],
    ['Shadow','Bóng nến'],
    ['body','thân nến'],
    ['Body','Thân nến'],
    ['range','biên độ'],
    ['Range','Biên độ'],
    ['prior move','nhịp trước đó'],
    ['prior high','đỉnh trước đó'],
    ['prior low','đáy trước đó'],
    ['advance','nhịp tăng'],
    ['decline','nhịp giảm'],
    ['trend','xu hướng'],
    ['Trend','Xu hướng'],
    ['extreme','vùng cực trị'],
    ['selling pressure','áp lực bán'],
    ['buyer control','bên mua kiểm soát'],
    ['seller control','bên bán kiểm soát'],
    ['directional control','quyền kiểm soát theo một hướng'],
    ['directional move','chuyển động có hướng'],
    ['directional pressure','áp lực theo một hướng'],
    ['momentum','động lượng'],
    ['Momentum','Động lượng'],
    ['rejection','sự từ chối giá'],
    ['Rejection','Sự từ chối giá'],
    ['upper-price rejection','sự từ chối vùng giá cao'],
    ['lower-price rejection','sự từ chối vùng giá thấp'],
    ['intraday volatility','biến động trong phiên'],
    ['intraday','trong phiên'],
    ['noise','nhiễu'],
    ['sideway','đi ngang'],
    ['sideways','đi ngang'],
    ['compression','co hẹp'],
    ['Compression','Co hẹp'],
    ['gap-up','khoảng trống tăng'],
    ['gap-down','khoảng trống giảm'],
    ['gap','khoảng trống'],
    ['Gap','Khoảng trống'],
    ['midpoint','điểm giữa'],
    ['endpoint','điểm biên'],
    ['reaction candles','các nến điều chỉnh'],
    ['reaction candle','nến điều chỉnh'],
    ['Classic','Kinh điển'],
    ['classic','kinh điển'],
    ['Bullish bias','Thiên hướng tăng'],
    ['Bearish bias','Thiên hướng giảm'],
    ['Both','Hai chiều'],
    ['Neutral / indecision','Trung tính / lưỡng lự'],
    ['Neutral','Trung tính'],
    ['Bullish','Tăng giá'],
    ['Bearish','Giảm giá'],
    ['Quick facts','Thông tin nhanh'],
    ['Source','Nguồn'],
    ['glossary','thuật ngữ'],
    ['function','hàm nhận diện'],
    ['Chart Analyzer','Bộ phân tích biểu đồ'],
    ['Analyzer','Bộ phân tích biểu đồ']
  ];

  // Longer phrases first so specific wording wins before generic terms.
  replacements.sort((a,b)=>b[0].length-a[0].length);

  function translateText(text){
    let out=text;
    const protectedNames=[];
    const patternNames=(window.CHARTLAB_PATTERNS||window.patterns||[])
      .map(p=>p&&p.name).filter(Boolean).sort((a,b)=>b.length-a.length);
    patternNames.forEach((name,i)=>{
      if(out.includes(name)){
        const token=`__CHARTLAB_PATTERN_NAME_${i}__`;
        protectedNames.push([token,name]);
        out=out.split(name).join(token);
      }
    });
    for(const [from,to] of replacements){
      if(out.includes(from)) out=out.split(from).join(to);
    }
    protectedNames.forEach(([token,name])=>{ out=out.split(token).join(name); });
    return out;
  }

  function translateNode(root){
    if(!root) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const p=node.parentElement;
      if(!p || ['SCRIPT','STYLE','CODE'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const next=translateText(node.nodeValue||'');
      if(next!==node.nodeValue) node.nodeValue=next;
    });
  }

  function run(){ translateNode(document.getElementById('app')); }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();

  const app=document.getElementById('app');
  if(app){
    const observer=new MutationObserver(()=>run());
    observer.observe(app,{childList:true,subtree:true,characterData:true});
  }

  window.CHARTLAB_VI_FIRST={version:'1.0.0',translateText};
})();
