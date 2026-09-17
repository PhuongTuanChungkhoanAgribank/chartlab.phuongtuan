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
    ['Tất cả patterns','Tất cả mẫu hình']
  ];

  // Longer phrases first so specific wording wins before generic terms.
  replacements.sort((a,b)=>b[0].length-a[0].length);

  function translateText(text){
    let out=text;
    for(const [from,to] of replacements){
      if(out.includes(from)) out=out.split(from).join(to);
    }
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
