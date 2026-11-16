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

  const lessonProfiles = {
    'Hanging Man': {
      identifyTitle:'Nhìn hình dạng giống Hammer, nhưng phải đặt nó sau một nhịp tăng.',
      identify:[
        ['Thân nến','Thân nhỏ, nằm gần phần trên của toàn bộ biên độ nến.'],
        ['Bóng dưới','Dài và nổi bật; cho thấy trong phiên đã có lúc lực bán ép giá xuống sâu.'],
        ['Bóng trên','Rất ngắn hoặc gần như không có.'],
        ['Vị trí','Phải xuất hiện sau một nhịp tăng rõ hoặc gần vùng kháng cự. Cùng hình dạng sau nhịp giảm sẽ nghiêng về Hammer.']
      ],
      storyTitle:'Lực bán đã đủ mạnh để xuyên thủng vùng giá thấp trong phiên — dù bên mua kéo giá hồi lại.',
      story:[
        ['1 · Xu hướng tăng đang chiếm ưu thế','Trước mẫu, bên mua vẫn kiểm soát và giá đã đi lên rõ.'],
        ['2 · Lực bán bất ngờ xuất hiện','Trong phiên, giá bị ép xuống sâu và tạo bóng dưới dài.'],
        ['3 · Bên mua kéo giá hồi lại','Giá đóng cửa trở lại phần trên biên độ, nhưng cú ép xuống cho thấy bên bán đã bắt đầu tạo dấu ấn.']
      ],
      caveat:'Hanging Man là cảnh báo suy yếu, không phải xác nhận đảo chiều giảm. Cần nến sau hoặc cấu trúc giá sau đó chứng minh lực bán thực sự tiếp diễn.',
      context:[
        ['good','PHÙ HỢP','Sau nhịp tăng mạnh','Đây là bối cảnh đúng để diễn giải Hanging Man; đáng chú ý hơn khi gần kháng cự hoặc sau một nhịp tăng kéo dài.'],
        ['wait','CHƯA ĐỦ','Giữa vùng đi ngang','Hình dạng có thể giống Hanging Man nhưng thiếu xu hướng tăng trước đó nên chưa đủ cơ sở để gán ý nghĩa đảo chiều giảm.'],
        ['bad','SAI BỐI CẢNH','Sau nhịp giảm','Cùng hình dạng ở đây phù hợp với Hammer hơn, không nên gọi Hanging Man.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau tiếp tục lưỡng lự hoặc giá vẫn giữ trên vùng cao của Hanging Man.'],
        ['TỐT HƠN','Nến sau đóng thấp hơn thân hoặc phá vùng thấp của Hanging Man.'],
        ['MẠNH HƠN','Giá phá Low, hình thành lower high/lower low và thất bại khi quay lại vùng đỉnh trước.']
      ],
      invalidation:'Nếu giá tiếp tục tăng mạnh, vượt đỉnh Hanging Man và duy trì cấu trúc higher high/higher low, cảnh báo đảo chiều giảm từ mẫu này không còn đáng tin.',
      practice:[
        ['good','Ví dụ A · Đúng bối cảnh','Giá tăng nhiều phiên → xuất hiện Hanging Man gần kháng cự → nến sau suy yếu.','Có thể xem đây là cảnh báo sớm rằng lực bán đang quay trở lại.'],
        ['wait','Ví dụ B · Chưa xác nhận','Hanging Man xuất hiện sau nhịp tăng nhưng nến sau vẫn đi ngang và không phá Low.','Mẫu đã xuất hiện, nhưng luận điểm đảo chiều chưa được củng cố.'],
        ['fail','Ví dụ C · Thất bại','Giá vượt đỉnh Hanging Man và tiếp tục tạo đỉnh mới.','Cảnh báo suy yếu thất bại; không tiếp tục dùng mẫu làm bằng chứng bearish.']
      ],
      analyzer:[
        ['A','Hình dạng','Thân nhỏ ở phần trên range, bóng dưới dài, bóng trên rất ngắn.'],
        ['B','Xu hướng trước đó','Muốn gọi Hanging Man phải thấy nhịp tăng/uptrend trước đó trong ảnh.'],
        ['C','Vị trí','Ưu tiên ở cuối nhịp tăng hoặc gần kháng cự; giữa trading range phải hạ confidence.'],
        ['D','Xác nhận','Không kết luận đảo chiều chỉ từ một nến; cần theo dõi phá Low hoặc bearish follow-through.']
      ]
    },
    'Inverted Hammer': {
      identifyTitle:'Thân nhỏ ở phần dưới, bóng trên dài — nhưng chỉ có ý nghĩa tăng khi xuất hiện sau nhịp giảm.',
      identify:[
        ['Thân nến','Thân nhỏ, nằm gần phần dưới của toàn bộ biên độ.'],
        ['Bóng trên','Dài và nổi bật; cho thấy bên mua từng đẩy giá lên đáng kể trong phiên.'],
        ['Bóng dưới','Rất ngắn hoặc gần như không có.'],
        ['Vị trí','Phải xuất hiện sau nhịp giảm rõ. Cùng hình dạng sau nhịp tăng sẽ nghiêng về Shooting Star.']
      ],
      storyTitle:'Bên mua lần đầu cho thấy khả năng phản công sau một chuỗi giảm, dù chưa giữ được toàn bộ thành quả tới Close.',
      story:[
        ['1 · Phe bán đang kiểm soát','Mẫu xuất hiện sau một nhịp giảm, khi tâm lý thị trường vẫn nghiêng về bên bán.'],
        ['2 · Bên mua đẩy giá bật lên','Trong phiên, lực cầu kéo giá lên mạnh và tạo bóng trên dài.'],
        ['3 · Giá bị kéo xuống lại','Bên mua chưa giữ được vùng cao, nhưng việc giá từng bật mạnh cho thấy cán cân cung — cầu đã bắt đầu thay đổi.']
      ],
      caveat:'Inverted Hammer cần xác nhận mạnh hơn Hammer vì Close thường chưa thể hiện bên mua kiểm soát rõ. Follow-through tăng ở nến sau là phần rất quan trọng.',
      context:[
        ['good','PHÙ HỢP','Sau nhịp giảm rõ','Đúng bối cảnh để xem đây là dấu hiệu tiềm năng của đảo chiều tăng; đáng chú ý hơn gần hỗ trợ.'],
        ['wait','CHƯA ĐỦ','Giữa vùng đi ngang','Chỉ giống về hình học nhưng không có prior decline rõ nên chưa đủ để diễn giải bullish reversal.'],
        ['bad','SAI BỐI CẢNH','Sau nhịp tăng','Cùng hình dạng tại đây phù hợp hơn với Shooting Star.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau không vượt được vùng thân/đỉnh của Inverted Hammer và giá tiếp tục lưỡng lự.'],
        ['TỐT HƠN','Nến sau tăng và đóng cửa phía trên thân Inverted Hammer.'],
        ['MẠNH HƠN','Giá vượt High của Inverted Hammer và duy trì được cấu trúc hồi phục, nhất là tại hỗ trợ.']
      ],
      invalidation:'Nếu giá phá Low của Inverted Hammer và tiếp tục tạo đáy thấp hơn, nỗ lực phản công của bên mua đã thất bại và luận điểm đảo chiều tăng mất hiệu lực.',
      practice:[
        ['good','Ví dụ A · Đúng bối cảnh','Giá giảm kéo dài → Inverted Hammer tại hỗ trợ → nến sau tăng vượt vùng thân.','Mẫu được xác nhận tốt hơn nhờ follow-through tăng.'],
        ['wait','Ví dụ B · Chưa xác nhận','Inverted Hammer xuất hiện nhưng nến sau nhỏ và không vượt High.','Ghi nhận khả năng phản công nhưng chưa đủ bằng chứng đảo chiều.'],
        ['fail','Ví dụ C · Thất bại','Sau mẫu, giá phá Low và tạo đáy thấp hơn.','Luận điểm bullish thất bại.']
      ],
      analyzer:[
        ['A','Hình dạng','Thân nhỏ ở phần dưới range, bóng trên dài, bóng dưới rất ngắn.'],
        ['B','Prior decline','Phải nhìn thấy nhịp giảm trước đó; nếu không chỉ nên gọi inverted-hammer-like geometry.'],
        ['C','Phân biệt','Sau uptrend, cùng hình dạng nghiêng về Shooting Star thay vì Inverted Hammer.'],
        ['D','Xác nhận','Ưu tiên bullish follow-through, đặc biệt khi giá vượt High của mẫu.']
      ]
    },
    'Shooting Star': {
      identifyTitle:'Hình dạng gần Inverted Hammer, nhưng xuất hiện sau nhịp tăng và mang hàm ý từ chối giá cao.',
      identify:[
        ['Thân nến','Thân nhỏ, nằm gần phần dưới của biên độ.'],
        ['Bóng trên','Dài và nổi bật; giá đã được đẩy lên cao nhưng không giữ được.'],
        ['Bóng dưới','Rất ngắn hoặc gần như không có.'],
        ['Vị trí','Phải xuất hiện sau một nhịp tăng rõ hoặc quanh vùng kháng cự.']
      ],
      storyTitle:'Bên mua đẩy giá lên cao nhưng bị bên bán phản công mạnh và kéo Close trở lại vùng thấp.',
      story:[
        ['1 · Đà tăng tiếp diễn','Đầu phiên hoặc trong phiên, bên mua tiếp tục đẩy giá lên và tạo mức cao mới.'],
        ['2 · Giá cao bị từ chối','Bên bán xuất hiện mạnh ở vùng cao, khiến giá không giữ được phần tăng.'],
        ['3 · Close trở lại vùng thấp','Bóng trên dài ghi lại thất bại của bên mua tại vùng giá cao và cảnh báo momentum tăng có thể suy yếu.']
      ],
      caveat:'Shooting Star là tín hiệu cảnh báo bearish; cần xem nến sau có thực sự giảm, phá Low hoặc làm hỏng cấu trúc tăng trước đó hay không.',
      context:[
        ['good','PHÙ HỢP','Sau nhịp tăng mạnh','Đúng bối cảnh để diễn giải Shooting Star; càng đáng chú ý khi gần kháng cự hoặc vùng cung.'],
        ['wait','CHƯA ĐỦ','Giữa vùng tích lũy','Không có prior advance rõ thì bóng trên dài chỉ phản ánh rejection, chưa đủ để gọi bearish reversal.'],
        ['bad','SAI BỐI CẢNH','Sau nhịp giảm','Cùng hình dạng này phù hợp hơn với Inverted Hammer.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau không giảm hoặc giá vẫn giữ vững phía trên thân Shooting Star.'],
        ['TỐT HƠN','Nến sau giảm và đóng thấp hơn thân hoặc Low của Shooting Star.'],
        ['MẠNH HƠN','Giá phá Low, thất bại khi retest vùng đỉnh và bắt đầu hình thành lower high/lower low.']
      ],
      invalidation:'Nếu giá vượt rõ đỉnh Shooting Star và tiếp tục duy trì higher high/higher low, tín hiệu từ chối giá cao đã thất bại và luận điểm bearish mất hiệu lực.',
      practice:[
        ['good','Ví dụ A · Đúng bối cảnh','Giá tăng mạnh → Shooting Star tại kháng cự → nến sau giảm phá Low.','Đây là bối cảnh bearish reversal có chất lượng tốt hơn.'],
        ['wait','Ví dụ B · Chưa xác nhận','Shooting Star xuất hiện nhưng nến sau vẫn giữ giá trên thân mẫu.','Cảnh báo tồn tại nhưng chưa được thị trường xác nhận.'],
        ['fail','Ví dụ C · Thất bại','Giá vượt đỉnh Shooting Star và tạo đỉnh mới.','Rejection thất bại; không tiếp tục dùng mẫu làm bằng chứng giảm.']
      ],
      analyzer:[
        ['A','Hình dạng','Thân nhỏ ở phần dưới range, bóng trên dài, bóng dưới rất ngắn.'],
        ['B','Prior advance','Muốn gọi Shooting Star phải nhìn thấy nhịp tăng/uptrend trước đó.'],
        ['C','Phân biệt','Sau downtrend, cùng hình học nghiêng về Inverted Hammer.'],
        ['D','Xác nhận','Ưu tiên bearish follow-through hoặc phá Low; pattern recognized không đồng nghĩa xu hướng đã đảo chiều.']
      ]
    },
    'Doji': {
      identifyTitle:'Open và Close gần như trùng nhau — trọng tâm là sự do dự, không phải tự động tăng hay giảm.',
      identify:[
        ['Thân nến','Rất nhỏ vì Open và Close gần nhau; có thể gần như chỉ còn một đường ngang.'],
        ['Bóng nến','Bóng trên và dưới có thể ngắn hoặc dài; biến thể bóng nến tạo ra Dragonfly, Gravestone, Long-Legged Doji...'],
        ['Màu nến','Không quan trọng vì chênh lệch Open–Close rất nhỏ.'],
        ['Vị trí','Ý nghĩa phụ thuộc mạnh vào xu hướng trước đó, vùng giá và các nến xung quanh.']
      ],
      storyTitle:'Sau một chu kỳ mua — bán trong phiên, hai bên kết thúc gần điểm xuất phát: không bên nào giữ được ưu thế rõ ràng tới Close.',
      story:[
        ['1 · Giá dao động','Bên mua và bên bán luân phiên đẩy giá lên xuống trong phiên.'],
        ['2 · Không bên nào áp đảo tới cuối','Dù range có thể lớn, Open và Close quay về rất gần nhau.'],
        ['3 · Trạng thái cân bằng tạm thời','Doji ghi nhận sự lưỡng lự; sau một xu hướng mạnh, sự lưỡng lự này có thể đáng chú ý hơn nhưng chưa phải tín hiệu đảo chiều độc lập.']
      ],
      caveat:'Doji là tín hiệu về trạng thái cân bằng/lưỡng lự. Không nên gán bullish hoặc bearish nếu chưa nhìn bối cảnh và diễn biến kế tiếp.',
      context:[
        ['good','PHÙ HỢP','Tại vùng cực trị hoặc sau xu hướng kéo dài','Doji có giá trị quan sát cao hơn khi xuất hiện sau một xu hướng rõ, tại hỗ trợ/kháng cự hoặc sau một nhịp mở rộng mạnh.'],
        ['wait','CHƯA ĐỦ','Trong vùng sideway nhiễu','Doji xuất hiện thường xuyên khi thị trường vốn đã cân bằng; khi đó giá trị tín hiệu thấp hơn.'],
        ['bad','SAI CÁCH ĐỌC','Tự động gọi là đảo chiều','Doji không tự nói giá sẽ tăng hay giảm; phải chờ context và follow-through.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Doji xuất hiện nhưng các nến sau vẫn đi ngang trong range cũ.'],
        ['TỐT HƠN','Giá phá khỏi biên độ Doji theo hướng phù hợp với bối cảnh.'],
        ['MẠNH HƠN','Breakout đi kèm thay đổi cấu trúc giá rõ ràng tại vùng hỗ trợ/kháng cự hoặc cực trị xu hướng.']
      ],
      invalidation:'Không có “vô hiệu” theo hướng cố định vì Doji vốn trung tính. Luận điểm chỉ thất bại khi giá sau đó đi ngược với cách diễn giải theo bối cảnh mà người đọc đã chọn.',
      practice:[
        ['good','Ví dụ A · Đáng chú ý','Sau nhịp tăng kéo dài, Doji xuất hiện tại kháng cự rồi giá phá xuống.','Doji lúc này là dấu hiệu lưỡng lự được xác nhận theo hướng bearish.'],
        ['wait','Ví dụ B · Trung tính','Doji xuất hiện giữa vùng sideway và giá tiếp tục dao động trong range.','Không nên cố diễn giải thành tín hiệu đảo chiều.'],
        ['fail','Ví dụ C · Diễn giải sai','Doji ở đỉnh được gọi bearish nhưng giá sau đó phá lên mạnh và tạo đỉnh mới.','Luận điểm bearish thất bại; bản thân Doji vẫn chỉ ghi nhận sự lưỡng lự tại thời điểm xuất hiện.']
      ],
      analyzer:[
        ['A','Hình dạng','Open và Close phải đủ gần nhau tương đối với kích thước/range gần đây; không dùng một tỷ lệ cứng cho mọi mã.'],
        ['B','Bối cảnh','AI phải mô tả Doji là neutral/indecision trước, sau đó mới giải thích bias theo trend và vị trí.'],
        ['C','Biến thể','Nếu geometry phù hợp Dragonfly/Gravestone/Long-Legged Doji thì ưu tiên tên biến thể cụ thể.'],
        ['D','Xác nhận','Không biến Doji thành khuyến nghị; cần breakout/follow-through và cấu trúc giá sau đó.']
      ]
    }
  };

  function profileFor(p){ return lessonProfiles[p.name] || null; }
  function identifyHtml(p){
    const x=profileFor(p);
    if(!x) return `<div class="hammer-v3-identify">
      <div><span>01</span><b>Loại mẫu</b><p>${patternGroup(p)}.</p></div>
      <div><span>02</span><b>Hình dạng chính</b><p>${p.formation}</p></div>
      <div><span>03</span><b>Bối cảnh</b><p>${contextVi(p.context)}.</p></div>
      <div><span>04</span><b>Điểm cần nhớ</b><p>Hình dạng chỉ là bước đầu; vị trí của mẫu trong xu hướng mới quyết định cách diễn giải.</p></div>
    </div>`;
    return `<div class="hammer-v3-identify">${x.identify.map((v,i)=>`<div><span>0${i+1}</span><b>${v[0]}</b><p>${v[1]}</p></div>`).join('')}</div>`;
  }
  function storyHtml(p){
    const x=profileFor(p);
    if(!x) return `<h2>${supplyDemandStory(p)}</h2><p>${p.formation}</p><p class="lesson-caveat">Không nên dùng mẫu hình nến như một tín hiệu mua/bán độc lập. Hãy đọc cùng xu hướng trước đó, vùng giá quan trọng và diễn biến sau mẫu.</p>`;
    return `<h2>${x.storyTitle}</h2><div class="story-flow">${x.story.map((v,i)=>`<div><b>${v[0]}</b><p>${v[1]}</p></div>${i<x.story.length-1?'<i>→</i>':''}`).join('')}</div><p class="lesson-caveat">${x.caveat}</p>`;
  }
  function contextHtml(p){
    const x=profileFor(p);
    if(!x) return `<div class="hammer-v3-contexts">
      <div class="good"><span>PHÙ HỢP</span><b>Đúng vị trí trong xu hướng</b><p>${contextVi(p.context)}.</p></div>
      <div class="wait"><span>CHƯA ĐỦ</span><b>Chỉ giống về hình dạng</b><p>Nếu thiếu xu hướng trước đó hoặc biểu đồ bị cắt quá sát, chưa nên vội kết luận đây là ${p.name}.</p></div>
      <div class="bad"><span>SAI BỐI CẢNH</span><b>Vị trí không phù hợp</b><p>Cùng một cụm nến nhưng đặt ở vị trí khác có thể mang ý nghĩa hoàn toàn khác.</p></div>
    </div>`;
    return `<div class="hammer-v3-contexts">${x.context.map(v=>`<div class="${v[0]}"><span>${v[1]}</span><b>${v[2]}</b><p>${v[3]}</p></div>`).join('')}</div>`;
  }
  function confirmationHtml(p){
    const x=profileFor(p);
    if(!x) return '';
    return `<article class="lesson-block"><span class="lesson-index">04</span><div><span class="kicker">XÁC NHẬN</span><h2>Đợi thị trường xác nhận ý nghĩa của mẫu hình.</h2><div class="confirmation-scale">${x.confirmation.map(v=>`<div><span>${v[0]}</span><p>${v[1]}</p></div>`).join('')}</div></div></article>`;
  }
  function practiceHtml(p){
    const x=profileFor(p);
    if(!x) return `<div class="hammer-v3-practice-grid">
      <div class="good"><span>Ví dụ A · Đúng bối cảnh</span><b>${contextVi(p.context)}</b><p>Khi hình dạng phù hợp và xuất hiện đúng bối cảnh, mẫu hình có giá trị quan sát cao hơn.</p></div>
      <div class="wait"><span>Ví dụ B · Chưa đủ</span><b>Hình dạng giống nhưng thiếu bối cảnh hoặc diễn biến sau mẫu.</b><p>Chưa nên gán ý nghĩa tăng/giảm chỉ vì cụm nến trông giống mẫu hình.</p></div>
      <div class="fail"><span>Ví dụ C · Luận điểm sai</span><b>${invalidationText(p)}</b><p>Khi điều kiện này xảy ra, không nên tiếp tục dùng mẫu hình làm bằng chứng cho luận điểm ban đầu.</p></div>
    </div>`;
    return `<div class="hammer-v3-practice-grid">${x.practice.map(v=>`<div class="${v[0]}"><span>${v[1]}</span><b>${v[2]}</b><p>${v[3]}</p></div>`).join('')}</div>`;
  }
  function analyzerHtml(p){
    const x=profileFor(p);
    if(!x) return `<div class="analyzer-rules">
      <div><b>A</b><span><strong>Hình dạng</strong><p>${p.formation}</p></span></div>
      <div><b>B</b><span><strong>Bối cảnh</strong><p>${contextVi(p.context)}.</p></span></div>
      <div><b>C</b><span><strong>Diễn biến sau mẫu</strong><p>${p.confirmation || 'Theo dõi phản ứng của các nến sau và cấu trúc giá gần nhất.'}</p></span></div>
      <div><b>D</b><span><strong>Không dùng độc lập</strong><p>Một mẫu nến đơn lẻ chưa đủ để kết luận xu hướng chắc chắn sẽ đảo chiều hoặc tiếp diễn.</p></span></div>
    </div>`;
    return `<div class="analyzer-rules">${x.analyzer.map(v=>`<div><b>${v[0]}</b><span><strong>${v[1]}</strong><p>${v[2]}</p></span></div>`).join('')}</div>`;
  }

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
            <div><span class="kicker">CÁCH NHẬN DIỆN</span><h2>${profileFor(p)?.identifyTitle || 'Nhìn hình dạng, số nến và mối quan hệ giữa các nến.'}</h2>
              ${identifyHtml(p)}
            </div>
          </article>

          <article class="lesson-block">
            <span class="lesson-index">02</span>
            <div><span class="kicker">CÂU CHUYỆN CUNG — CẦU</span>${storyHtml(p)}
            </div>
          </article>

          <article class="lesson-block context-first-block">
            <span class="lesson-index">03</span>
            <div><span class="kicker">BỐI CẢNH BẮT BUỘC</span><h2>${contextVi(p.context)}.</h2>
              ${contextHtml(p)}
            </div>
          </article>

          ${confirmationHtml(p)}
          <article class="lesson-block">
            <span class="lesson-index">${profileFor(p)?'05':'04'}</span>
            <div><span class="kicker">KHI NÀO LUẬN ĐIỂM SAI</span>
              <p>${profileFor(p)?.invalidation || invalidationText(p)}</p>
            </div>
          </article>

          <article class="lesson-block hammer-v3-practice">
            <span class="lesson-index">${profileFor(p)?'06':'05'}</span>
            <div><span class="kicker">NHÌN TRÊN BIỂU ĐỒ THẬT</span><h2>Ba tình huống cần phân biệt.</h2>
              ${practiceHtml(p)}
            </div>
          </article>

          <article class="lesson-block analyzer-rule-block">
            <span class="lesson-index">${profileFor(p)?'07':'06'}</span>
            <div><span class="kicker">ĐIỀU KIỆN ĐỂ NHẬN DIỆN</span><h2>Khi nào có thể xác định đây là ${p.name}?</h2>
              ${analyzerHtml(p)}
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