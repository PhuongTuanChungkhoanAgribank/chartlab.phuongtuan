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
,
    'Dragonfly Doji': {
      identifyTitle:'Open và Close gần vùng cao, bóng dưới dài — một biến thể Doji cho thấy giá thấp bị từ chối.',
      identify:[
        ['Thân nến','Open và Close gần như trùng nhau, nằm gần phía trên của toàn bộ range.'],
        ['Bóng dưới','Dài và nổi bật; ghi lại việc giá từng bị đẩy xuống sâu trong phiên.'],
        ['Bóng trên','Rất ngắn hoặc gần như không có.'],
        ['Bối cảnh','Sau nhịp giảm có thể mang sắc thái tích cực hơn; sau nhịp tăng có thể chỉ phản ánh biến động mạnh và cần đọc thận trọng.']
      ],
      storyTitle:'Giá bị đẩy xuống thấp nhưng bên mua kéo trở lại gần điểm mở cửa — phe bán không giữ được vùng thấp.',
      story:[
        ['1 · Giá bị ép xuống','Lực bán đẩy giá xuống sâu trong phiên.'],
        ['2 · Lực cầu hấp thụ','Bên mua phản ứng mạnh tại vùng thấp và kéo giá hồi lên.'],
        ['3 · Close gần Open','Phiên kết thúc gần điểm mở cửa, cho thấy vùng thấp bị từ chối nhưng chưa đủ để kết luận đảo chiều.']
      ],
      caveat:'Dragonfly Doji mang thông tin về rejection ở vùng thấp. Sắc thái bullish chỉ hợp lý hơn khi nó xuất hiện sau một nhịp giảm hoặc tại hỗ trợ.',
      context:[
        ['good','PHÙ HỢP','Sau nhịp giảm hoặc tại hỗ trợ','Vùng thấp bị từ chối trong bối cảnh bán quá mức có thể là dấu hiệu đáng chú ý.'],
        ['wait','CHƯA ĐỦ','Giữa vùng sideway','Dragonfly Doji có thể chỉ phản ánh dao động nội phiên, không nhất thiết tạo bias rõ.'],
        ['bad','SAI CÁCH ĐỌC','Mặc định bullish ở mọi vị trí','Hình dạng không tự tạo tín hiệu mua; cần prior trend và follow-through.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá tiếp tục đi ngang và không vượt vùng cao của Dragonfly Doji.'],
        ['TỐT HƠN','Nến sau tăng và giữ trên phần thân/đỉnh của mẫu.'],
        ['MẠNH HƠN','Giá vượt High và hình thành cấu trúc phục hồi rõ tại hỗ trợ.']
      ],
      invalidation:'Nếu sau bối cảnh bullish, giá phá Low của Dragonfly Doji và tiếp tục tạo đáy thấp hơn, luận điểm từ chối vùng thấp đã thất bại.',
      practice:[
        ['good','Ví dụ A · Đáng chú ý','Sau nhịp giảm mạnh, Dragonfly Doji xuất hiện tại hỗ trợ rồi giá bật lên.','Có thể xem đây là rejection vùng thấp được xác nhận.'],
        ['wait','Ví dụ B · Trung tính','Dragonfly Doji nằm giữa vùng tích lũy và giá tiếp tục đi ngang.','Không nên gán bias tăng chỉ từ hình dạng.'],
        ['fail','Ví dụ C · Thất bại','Sau mẫu, giá phá Low và tiếp tục giảm.','Rejection không tạo được follow-through.']
      ],
      analyzer:[
        ['A','Hình dạng','Open và Close gần nhau ở phần trên range, lower shadow dài, upper shadow rất ngắn.'],
        ['B','Bối cảnh','AI phải ưu tiên mô tả “lower-price rejection” trước khi gán bullish bias.'],
        ['C','Phân biệt','Nếu thân không đủ nhỏ, có thể gần Hammer/Hanging Man hơn là Doji.'],
        ['D','Xác nhận','Sau downtrend, chỉ nâng confidence bullish khi có follow-through tăng hoặc phản ứng tại hỗ trợ.']
      ]
    },
    'Gravestone Doji': {
      identifyTitle:'Open và Close gần vùng thấp, bóng trên dài — một biến thể Doji cho thấy giá cao bị từ chối.',
      identify:[
        ['Thân nến','Open và Close gần như trùng nhau, nằm gần phía dưới của range.'],
        ['Bóng trên','Dài và nổi bật; giá từng được đẩy lên cao nhưng không giữ được.'],
        ['Bóng dưới','Rất ngắn hoặc gần như không có.'],
        ['Bối cảnh','Sau nhịp tăng hoặc tại kháng cự, rejection vùng cao đáng chú ý hơn.']
      ],
      storyTitle:'Bên mua đẩy giá lên nhưng bị bên bán kéo trở lại gần điểm mở cửa — vùng giá cao không được chấp nhận.',
      story:[
        ['1 · Giá bật lên mạnh','Bên mua đẩy giá lên trong phiên.'],
        ['2 · Lực bán phản công','Cung xuất hiện ở vùng cao và kéo giá lùi xuống.'],
        ['3 · Close gần Open','Phiên kết thúc gần vùng thấp, cho thấy bên mua không giữ được thành quả.']
      ],
      caveat:'Gravestone Doji thường được chú ý hơn ở đỉnh hoặc tại kháng cự, nhưng vẫn cần nến sau xác nhận lực bán tiếp diễn.',
      context:[
        ['good','PHÙ HỢP','Sau nhịp tăng hoặc tại kháng cự','Upper-price rejection trong bối cảnh này có thể cảnh báo đà tăng suy yếu.'],
        ['wait','CHƯA ĐỦ','Giữa vùng sideway','Chỉ phản ánh rejection nội phiên, chưa đủ để kết luận bearish reversal.'],
        ['bad','SAI CÁCH ĐỌC','Mặc định bearish ở mọi vị trí','Sau nhịp giảm, cùng hình dạng có thể chỉ là lưỡng lự và cần đọc khác.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá vẫn giữ trên vùng thân/đỉnh cũ và không có follow-through giảm.'],
        ['TỐT HƠN','Nến sau giảm và phá vùng thấp của Gravestone Doji.'],
        ['MẠNH HƠN','Giá phá Low, thất bại khi retest vùng đỉnh và bắt đầu tạo cấu trúc giảm.']
      ],
      invalidation:'Nếu giá vượt rõ High của Gravestone Doji và tiếp tục tạo đỉnh mới, luận điểm rejection vùng cao theo hướng bearish không còn hiệu lực.',
      practice:[
        ['good','Ví dụ A · Đáng chú ý','Sau nhịp tăng, Gravestone Doji xuất hiện tại kháng cự rồi giá giảm.','Rejection vùng cao được xác nhận tốt hơn.'],
        ['wait','Ví dụ B · Trung tính','Mẫu xuất hiện giữa sideway và giá tiếp tục dao động.','Không nên tự động gọi đảo chiều giảm.'],
        ['fail','Ví dụ C · Thất bại','Giá vượt High của mẫu và tiếp tục tăng.','Luận điểm bearish thất bại.']
      ],
      analyzer:[
        ['A','Hình dạng','Open và Close gần nhau ở phần dưới range, upper shadow dài, lower shadow rất ngắn.'],
        ['B','Bối cảnh','Sau uptrend/kháng cự mới có cơ sở mạnh hơn để diễn giải bearish.'],
        ['C','Phân biệt','Nếu body lớn hơn rõ, có thể gần Shooting Star hơn Doji.'],
        ['D','Xác nhận','Không kết luận đảo chiều nếu thiếu bearish follow-through.']
      ]
    },
    'Long-Legged Doji': {
      identifyTitle:'Open và Close gần nhau nhưng cả bóng trên lẫn bóng dưới đều dài — dấu hiệu giằng co mạnh.',
      identify:[
        ['Thân nến','Open và Close gần như trùng nhau.'],
        ['Bóng trên','Dài, cho thấy giá từng được đẩy lên cao đáng kể.'],
        ['Bóng dưới','Dài, cho thấy giá cũng từng bị ép xuống sâu.'],
        ['Ý nghĩa hình học','Range lớn nhưng kết thúc gần điểm bắt đầu: cả hai phe đều thử chiếm ưu thế nhưng không giữ được.']
      ],
      storyTitle:'Một phiên giằng co mạnh: cả bên mua lẫn bên bán đều có lúc kiểm soát, nhưng cuối cùng không bên nào thắng rõ.',
      story:[
        ['1 · Bên mua đẩy giá lên','Giá được kéo lên đáng kể trong phiên.'],
        ['2 · Bên bán kéo xuống','Giá cũng bị ép xuống sâu về phía đối diện.'],
        ['3 · Trở lại gần Open','Close quay gần điểm mở cửa, phản ánh sự bất định lớn hơn Doji thông thường.']
      ],
      caveat:'Long-Legged Doji thể hiện sự lưỡng lự với biên độ lớn. Nó đặc biệt đáng chú ý sau một xu hướng mạnh, nhưng không có hướng dự báo cố định.',
      context:[
        ['good','PHÙ HỢP','Sau xu hướng kéo dài hoặc tại vùng cực trị','Sự bất định tăng mạnh sau một trend rõ có thể báo hiệu giai đoạn chuyển trạng thái.'],
        ['wait','CHƯA ĐỦ','Trong thị trường vốn đã biến động mạnh và sideway','Range lớn có thể chỉ là nhiễu, không nhất thiết là tín hiệu mới.'],
        ['bad','SAI CÁCH ĐỌC','Ép thành bullish hoặc bearish ngay','Long-Legged Doji là mẫu trung tính trước khi xét context và breakout.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá tiếp tục dao động bên trong range của Doji.'],
        ['TỐT HƠN','Giá phá khỏi range theo một hướng rõ.'],
        ['MẠNH HƠN','Breakout đi cùng thay đổi cấu trúc giá tại vùng cực trị hoặc hỗ trợ/kháng cự.']
      ],
      invalidation:'Không có hướng vô hiệu cố định. Luận điểm chỉ sai khi giá phá ngược với hướng diễn giải theo bối cảnh đã chọn.',
      practice:[
        ['good','Ví dụ A · Chuyển trạng thái','Sau nhịp tăng dài, Long-Legged Doji xuất hiện rồi giá phá xuống.','Sự giằng co được xác nhận theo hướng suy yếu.'],
        ['wait','Ví dụ B · Chưa đủ','Doji xuất hiện nhưng giá vẫn nằm trong range.','Tiếp tục coi là trung tính.'],
        ['fail','Ví dụ C · Diễn giải sai','Gọi bearish nhưng giá phá lên mạnh và tạo đỉnh mới.','Bias bearish sai; bản thân mẫu vẫn chỉ phản ánh bất định.']
      ],
      analyzer:[
        ['A','Hình dạng','Open-Close rất gần nhau, đồng thời cả upper và lower shadow đều dài tương đối.'],
        ['B','Bối cảnh','AI phải mô tả “high indecision / wide-range balance” trước khi đưa bias.'],
        ['C','So sánh','Nếu chỉ một phía shadow dài rõ, ưu tiên Dragonfly hoặc Gravestone Doji.'],
        ['D','Xác nhận','Cần breakout khỏi range và context hỗ trợ để diễn giải hướng.']
      ]
    },
    'Spinning Top': {
      identifyTitle:'Thân nhỏ nhưng không nhỏ đến mức Doji; cả hai bóng thường hiện diện và thể hiện giằng co.',
      identify:[
        ['Thân nến','Nhỏ so với toàn bộ range nhưng Open và Close vẫn cách nhau rõ hơn Doji.'],
        ['Bóng trên','Có bóng trên, cho thấy bên mua từng đẩy giá cao hơn.'],
        ['Bóng dưới','Có bóng dưới, cho thấy bên bán từng ép giá thấp hơn.'],
        ['Điểm phân biệt','Doji nhấn mạnh Open≈Close; Spinning Top có thân nhỏ nhưng vẫn hữu hình.']
      ],
      storyTitle:'Hai bên đều tạo được chuyển động trong phiên nhưng không bên nào giữ ưu thế rõ đến lúc đóng cửa.',
      story:[
        ['1 · Mua và bán cùng hoạt động','Giá di chuyển cả lên lẫn xuống trong phiên.'],
        ['2 · Không phe nào áp đảo','Cả hai phía đều để lại shadow.'],
        ['3 · Close gần vùng giữa','Thân nhỏ cho thấy động lượng định hướng không mạnh.']
      ],
      caveat:'Spinning Top chủ yếu phản ánh sự cân bằng/lưỡng lự. Ý nghĩa tăng hay giảm phải dựa trên trend trước đó và phản ứng sau mẫu.',
      context:[
        ['good','PHÙ HỢP','Tại cuối một nhịp mạnh hoặc vùng giá quan trọng','Sự lưỡng lự có thể là dấu hiệu momentum đang giảm.'],
        ['wait','CHƯA ĐỦ','Trong vùng sideway','Spinning Top xuất hiện thường xuyên khi thị trường vốn đã cân bằng.'],
        ['bad','SAI CÁCH ĐỌC','Coi thân xanh là bullish hoặc thân đỏ là bearish','Màu thân thứ yếu; điều quan trọng là thân nhỏ + context.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá tiếp tục dao động quanh mẫu mà không phá cấu trúc.'],
        ['TỐT HƠN','Giá phá khỏi range của mẫu theo hướng phù hợp context.'],
        ['MẠNH HƠN','Breakout đi kèm thay đổi swing structure hoặc phản ứng rõ tại hỗ trợ/kháng cự.']
      ],
      invalidation:'Không có hướng vô hiệu cố định vì mẫu trung tính. Luận điểm chỉ thất bại nếu diễn biến sau đó đi ngược cách diễn giải theo bối cảnh.',
      practice:[
        ['good','Ví dụ A · Đáng chú ý','Sau nhịp tăng mạnh, Spinning Top xuất hiện tại kháng cự rồi giá suy yếu.','Có thể xem là dấu hiệu momentum tăng chậm lại.'],
        ['wait','Ví dụ B · Trung tính','Spinning Top xuất hiện giữa range.','Không có thêm thông tin mới đáng kể.'],
        ['fail','Ví dụ C · Diễn giải sai','Gọi đảo chiều nhưng giá tiếp tục breakout theo trend cũ.','Mẫu chỉ là lưỡng lự tạm thời, không phải đảo chiều.']
      ],
      analyzer:[
        ['A','Hình dạng','Body nhỏ tương đối với range nhưng vẫn lớn hơn Doji; có shadow hai phía.'],
        ['B','Phân biệt','Nếu Open và Close gần như trùng nhau, ưu tiên Doji.'],
        ['C','Bối cảnh','Tại trend extreme mới tăng giá trị diễn giải; giữa sideway hạ confidence.'],
        ['D','Xác nhận','Không gán hướng nếu chưa có breakout/follow-through.']
      ]
    },
    'Marubozu': {
      identifyTitle:'Thân dài chiếm phần lớn range, shadow rất ngắn hoặc gần như không có — một nến thể hiện directional control mạnh.',
      identify:[
        ['Thân nến','Dài và chiếm phần lớn biên độ phiên.'],
        ['Bóng nến','Upper/lower shadow rất ngắn hoặc gần như không có tùy biến thể.'],
        ['Màu thân','Quan trọng hơn các mẫu trung tính: thân tăng cho thấy buyer control, thân giảm cho thấy seller control.'],
        ['Bối cảnh','Có thể xuất hiện trong breakout, continuation hoặc exhaustion; vị trí quyết định cách diễn giải.']
      ],
      storyTitle:'Một phe kiểm soát gần như toàn bộ phiên và giữ phần lớn thành quả đến lúc đóng cửa.',
      story:[
        ['1 · Directional pressure','Giá di chuyển mạnh theo một hướng ngay trong phiên.'],
        ['2 · Ít rejection','Shadow ngắn cho thấy phía đối diện không tạo được phản ứng đáng kể.'],
        ['3 · Close gần cực trị','Giá đóng gần High hoặc Low, xác nhận quyền kiểm soát rõ của một phe.']
      ],
      caveat:'Marubozu cho thấy conviction mạnh trong chính cây nến đó, nhưng không tự nói move sẽ kéo dài bao lâu. Gần vùng cực trị sau một trend dài, nó vẫn có thể là exhaustion.',
      context:[
        ['good','PHÙ HỢP','Breakout hoặc continuation có cấu trúc hỗ trợ','Một Marubozu cùng hướng với breakout/trend có thể củng cố động lượng.'],
        ['wait','CHƯA ĐỦ','Xuất hiện đơn lẻ giữa vùng nhiễu','Một nến mạnh trong sideway có thể nhanh chóng bị hấp thụ.'],
        ['bad','SAI CÁCH ĐỌC','Mặc định “thân dài = xu hướng sẽ tiếp tục”','Cần xét vị trí, gap, volume, kháng cự/hỗ trợ và follow-through.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau đảo ngược mạnh và trả giá trở lại range cũ.'],
        ['TỐT HƠN','Giá giữ được phần lớn thân Marubozu và tiếp tục theo cùng hướng.'],
        ['MẠNH HƠN','Follow-through phá cấu trúc hoặc duy trì breakout phía ngoài vùng giá quan trọng.']
      ],
      invalidation:'Luận điểm continuation suy yếu khi giá nhanh chóng bị kéo ngược xuyên sâu vào thân Marubozu hoặc phá ngược cực trị đối diện của mẫu.',
      practice:[
        ['good','Ví dụ A · Breakout khỏe','Bullish Marubozu phá kháng cự và nến sau giữ trên vùng breakout.','Directional control được xác nhận tốt.'],
        ['wait','Ví dụ B · Chưa đủ','Marubozu xuất hiện giữa sideway nhưng không phá cấu trúc.','Chưa nên suy rộng thành một trend mới.'],
        ['fail','Ví dụ C · False move','Sau Marubozu, giá đảo ngược mạnh và quay lại range cũ.','Conviction của cây nến không chuyển thành follow-through.']
      ],
      analyzer:[
        ['A','Hình dạng','Body dài tương đối, shadow rất ngắn so với body/range; tránh dùng ngưỡng tuyệt đối cứng.'],
        ['B','Hướng','Bullish và bearish Marubozu phải được phân biệt theo Open-Close.'],
        ['C','Bối cảnh','AI phải xác định đây là breakout, continuation hay move đơn lẻ trước khi diễn giải.'],
        ['D','Xác nhận','Confidence tăng khi giá giữ được thân và có follow-through theo cùng hướng.']
      ]
    },
    'Belt-hold': {
      identifyTitle:'Một thân nến dài mở gần một đầu range và di chuyển gần như một chiều.',
      identify:[
        ['Thân nến','Dài hơn bình thường và thể hiện directional move rõ.'],
        ['Điểm mở cửa','Bullish Belt-hold thường mở gần vùng thấp; bearish Belt-hold thường mở gần vùng cao.'],
        ['Shadow phía mở cửa','Rất ngắn hoặc gần như không có, cho thấy một phe chiếm quyền kiểm soát sớm.'],
        ['Bối cảnh','Đáng chú ý hơn tại trend extreme hoặc vùng giá quan trọng; không tự động là đảo chiều.']
      ],
      storyTitle:'Một phe chiếm quyền kiểm soát gần từ đầu phiên và giữ phần lớn lợi thế đến Close.',
      story:[
        ['1 · Kiểm soát sớm','Giá mở gần một đầu range, gần như không có rejection ở phía mở cửa.'],
        ['2 · Di chuyển có hướng','Một phe đẩy giá đi mạnh theo hướng của thân nến.'],
        ['3 · Close giữ phần lớn move','Thân dài cho thấy directional conviction cao hơn bình thường.']
      ],
      caveat:'Belt-hold có thể mang ý nghĩa continuation hoặc reversal tùy vị trí. Hướng của nến chỉ là dữ liệu đầu tiên; context quyết định cách diễn giải.',
      context:[
        ['good','PHÙ HỢP','Tại trend extreme hoặc breakout','Một Belt-hold xuất hiện đúng vùng giá quan trọng có thể cho thấy thay đổi/tiếp diễn lực kiểm soát đáng chú ý.'],
        ['wait','CHƯA ĐỦ','Giữa vùng nhiễu','Một nến dài đơn lẻ có thể chỉ là biến động ngắn hạn.'],
        ['bad','SAI CÁCH ĐỌC','Gắn nhãn đảo chiều chỉ từ hình dạng','Cần prior trend, vị trí và follow-through để xác nhận luận điểm.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau phủ nhận phần lớn thân Belt-hold.'],
        ['TỐT HƠN','Giá giữ được phần lớn thân và tiếp tục theo cùng hướng.'],
        ['MẠNH HƠN','Follow-through đi kèm breakout cấu trúc hoặc phản ứng tại vùng giá quan trọng.']
      ],
      invalidation:'Nếu nến sau nhanh chóng đảo ngược và xuyên sâu phần lớn thân Belt-hold, luận điểm directional/reversal từ mẫu này suy yếu rõ.',
      practice:[
        ['good','Ví dụ A · Có context','Bearish Belt-hold xuất hiện tại kháng cự sau nhịp tăng rồi giá giảm tiếp.','Có thể xem là bằng chứng lực bán kiểm soát tốt hơn.'],
        ['wait','Ví dụ B · Đơn lẻ','Belt-hold xuất hiện giữa sideway.','Chưa đủ cơ sở để gọi breakout hoặc đảo chiều.'],
        ['fail','Ví dụ C · Bị phủ nhận','Nến sau đảo ngược gần hết thân Belt-hold.','Directional conviction không tạo được follow-through.']
      ],
      analyzer:[
        ['A','Hình dạng','Body dài; open gần một đầu range; shadow phía open rất ngắn.'],
        ['B','Hướng','Phân biệt bullish/bearish theo màu thân và vị trí Open-Close.'],
        ['C','Bối cảnh','AI phải xác định trend extreme/breakout hay nhiễu trước khi gán ý nghĩa.'],
        ['D','Xác nhận','Không coi Belt-hold là reversal chắc chắn nếu thiếu follow-through.']
      ]
    },
    'Closing Marubozu': {
      identifyTitle:'Nến có rất ít hoặc không có shadow ở phía đóng cửa — lực kiểm soát được giữ tới cuối phiên.',
      identify:[
        ['Thân nến','Thân tương đối dài, thể hiện directional move.'],
        ['Phía Close','Shadow ở phía đóng cửa rất ngắn hoặc gần như không có.'],
        ['Bullish/Bearish','Bullish đóng gần High; bearish đóng gần Low.'],
        ['Điểm phân biệt','Không yêu cầu cả hai phía đều không có shadow như Marubozu đầy đủ.']
      ],
      storyTitle:'Một phe giữ được áp lực cho tới tận Close, cho thấy quyền kiểm soát cuối phiên tương đối rõ.',
      story:[
        ['1 · Giá di chuyển có hướng','Một phe chiếm ưu thế trong phần lớn phiên.'],
        ['2 · Phía đối diện có thể phản ứng','Có thể vẫn tồn tại shadow ở phía mở cửa.'],
        ['3 · Close gần cực trị','Điểm đóng cửa cho thấy phe đang thắng không bị kéo lùi đáng kể vào cuối phiên.']
      ],
      caveat:'Closing Marubozu phản ánh quyền kiểm soát ở cuối phiên, nhưng vẫn cần context để biết đó là continuation, breakout hay move dễ bị đảo ngược.',
      context:[
        ['good','PHÙ HỢP','Tại breakout hoặc vùng giá quan trọng','Close gần cực trị có thể củng cố move khi cấu trúc hỗ trợ.'],
        ['wait','CHƯA ĐỦ','Giữa vùng sideway','Một Close mạnh chưa đủ chứng minh thị trường rời khỏi range.'],
        ['bad','SAI CÁCH ĐỌC','Coi giống hệt Marubozu hoàn chỉnh','Closing Marubozu chỉ nhấn mạnh phía Close, không bắt buộc cả hai shadow đều vắng mặt.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau quay ngược và xuyên sâu thân.'],
        ['TỐT HƠN','Giá giữ được phần lớn thân và tiếp tục theo cùng hướng.'],
        ['MẠNH HƠN','Close mạnh được nối tiếp bằng breakout/continuation rõ.']
      ],
      invalidation:'Luận điểm directional suy yếu nếu giá nhanh chóng đảo ngược và xuyên sâu phần lớn thân Closing Marubozu.',
      practice:[
        ['good','Ví dụ A · Breakout','Bullish Closing Marubozu đóng gần High khi phá kháng cự.','Close mạnh giúp củng cố breakout nếu nến sau giữ được vùng này.'],
        ['wait','Ví dụ B · Trong range','Mẫu xuất hiện giữa sideway.','Chỉ ghi nhận close mạnh, chưa kết luận xu hướng mới.'],
        ['fail','Ví dụ C · False move','Nến sau đảo ngược sâu vào thân.','Quyền kiểm soát cuối phiên không kéo dài sang phiên kế tiếp.']
      ],
      analyzer:[
        ['A','Hình dạng','Shadow phía Close rất ngắn; body mang tính directional.'],
        ['B','Phân biệt','Nếu cả hai shadow đều gần như vắng mặt và body dài, ưu tiên Marubozu.'],
        ['C','Bối cảnh','Tại breakout/key level tăng giá trị diễn giải.'],
        ['D','Xác nhận','Follow-through cùng hướng quan trọng hơn việc chỉ thấy một Close mạnh.']
      ]
    },
    'High-Wave Candle': {
      identifyTitle:'Thân nhỏ với cả bóng trên và bóng dưới dài — biến động lớn nhưng quyền kiểm soát cuối phiên thấp.',
      identify:[
        ['Thân nến','Nhỏ so với range.'],
        ['Bóng trên','Dài, cho thấy giá cao bị thử nhưng không giữ được.'],
        ['Bóng dưới','Dài, cho thấy giá thấp cũng bị thử nhưng không giữ được.'],
        ['Khác Doji','Open và Close không nhất thiết gần như trùng nhau; body chỉ cần nhỏ.']
      ],
      storyTitle:'Cả hai phe đều đẩy giá đi xa trong phiên nhưng cuối cùng không bên nào giữ được ưu thế.',
      story:[
        ['1 · Biến động mở rộng','Giá đi xa về một phía.'],
        ['2 · Đảo chiều trong phiên','Phe đối diện phản công và đẩy giá mạnh theo chiều ngược lại.'],
        ['3 · Close không xác nhận bên thắng','Thân nhỏ cho thấy quyền kiểm soát cuối phiên yếu dù range lớn.']
      ],
      caveat:'High-Wave cho thấy bất định cao hơn bình thường. Mẫu không có hướng độc lập và dễ bị diễn giải sai nếu bỏ qua trend/vùng giá.',
      context:[
        ['good','PHÙ HỢP','Sau expansion hoặc tại vùng giá quan trọng','Bất định tăng mạnh sau một move lớn có thể báo hiệu giai đoạn chuyển trạng thái.'],
        ['wait','CHƯA ĐỦ','Thị trường vốn đã nhiễu và biến động cao','Mẫu có thể chỉ phản ánh noise.'],
        ['bad','SAI CÁCH ĐỌC','Cố gán bullish/bearish từ màu thân','Màu thân thứ yếu; trọng tâm là range lớn + body nhỏ.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá tiếp tục nằm trong range High-Wave.'],
        ['TỐT HƠN','Giá phá khỏi range theo một hướng rõ.'],
        ['MẠNH HƠN','Breakout đi cùng thay đổi swing structure hoặc phản ứng tại key level.']
      ],
      invalidation:'Không có hướng vô hiệu cố định. Bias diễn giải chỉ sai khi giá phá ngược hướng kỳ vọng hoặc tiếp tục trend cũ không bị gián đoạn.',
      practice:[
        ['good','Ví dụ A · Chuyển trạng thái','Sau nhịp tăng mạnh, High-Wave xuất hiện tại kháng cự rồi giá phá xuống.','Bất định được xác nhận theo hướng suy yếu.'],
        ['wait','Ví dụ B · Nhiễu','High-Wave xuất hiện giữa vùng sideway biến động cao.','Không có thêm edge rõ ràng.'],
        ['fail','Ví dụ C · Trend tiếp diễn','Gọi đảo chiều nhưng giá nhanh chóng phá đỉnh High-Wave.','Mẫu chỉ là giằng co tạm thời.']
      ],
      analyzer:[
        ['A','Hình dạng','Body nhỏ, cả upper và lower shadow đều dài tương đối.'],
        ['B','Phân biệt','Nếu Open≈Close, có thể ưu tiên Long-Legged Doji/Rickshaw Man tùy vị trí body.'],
        ['C','Bối cảnh','Sau expansion/key level mới tăng giá trị.'],
        ['D','Xác nhận','Không gán hướng trước khi có breakout/follow-through.']
      ]
    },
    'Long Line Candle': {
      identifyTitle:'Thân nến dài hơn bình thường — tín hiệu về động lượng theo hướng nến.',
      identify:[
        ['Thân nến','Dài tương đối so với các nến gần đây.'],
        ['Hướng','Bullish khi Close cao hơn Open rõ; bearish khi Close thấp hơn Open rõ.'],
        ['Shadow','Có thể vẫn có shadow; không cần “không râu” như Marubozu.'],
        ['Bối cảnh','Đáng chú ý hơn khi phá vùng giá hoặc xuất hiện cùng xu hướng đã hình thành.']
      ],
      storyTitle:'Một phe tạo được chuyển động directional đủ lớn để mở rộng real body so với trạng thái bình thường.',
      story:[
        ['1 · Pressure tăng','Một phía đẩy giá đi xa khỏi Open.'],
        ['2 · Body mở rộng','Phần move được giữ lại tới Close lớn hơn bình thường.'],
        ['3 · Momentum rõ','Giá đóng cho thấy directional conviction cao hơn các nến lân cận.']
      ],
      caveat:'Long Line mô tả độ dài body, không phải tên gọi cho continuation hay reversal cố định. Context quyết định ý nghĩa.',
      context:[
        ['good','PHÙ HỢP','Tại breakout hoặc continuation','Body dài cùng hướng cấu trúc có thể củng cố momentum.'],
        ['wait','CHƯA ĐỦ','Giữa vùng nhiễu','Một body dài chưa chắc tạo trend.'],
        ['bad','SAI CÁCH ĐỌC','Đồng nhất Long Line với Marubozu','Long Line vẫn có thể có shadow đáng kể.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau đảo ngược phần lớn thân.'],
        ['TỐT HƠN','Giá giữ được phần lớn thân và tiếp tục theo hướng nến.'],
        ['MẠNH HƠN','Follow-through đồng thời phá cấu trúc/key level.']
      ],
      invalidation:'Luận điểm động lượng suy yếu khi giá nhanh chóng đảo ngược phần lớn real body của Long Line.',
      practice:[
        ['good','Ví dụ A · Breakout','Bullish Long Line phá kháng cự và được giữ ở phiên sau.','Momentum tăng được xác nhận tốt hơn.'],
        ['wait','Ví dụ B · Một nến đơn','Long Line giữa vùng sideway.','Chưa đủ để kết luận trend mới.'],
        ['fail','Ví dụ C · Bị đảo ngược','Nến sau phủ nhận phần lớn body.','Directional conviction không kéo dài.']
      ],
      analyzer:[
        ['A','Hình dạng','Body dài tương đối so với candle averages gần đây.'],
        ['B','Phân biệt','Không yêu cầu shadow ngắn như Marubozu.'],
        ['C','Bối cảnh','AI phải xác định breakout/continuation/reversal context riêng.'],
        ['D','Xác nhận','Follow-through hoặc giữ được body làm tăng độ tin cậy.']
      ]
    },
    'Short Line Candle': {
      identifyTitle:'Thân và range ngắn hơn bình thường — dấu hiệu động lượng thấp hoặc co hẹp biến động.',
      identify:[
        ['Thân nến','Nhỏ tương đối so với các nến gần đây.'],
        ['Range','Toàn bộ High-Low cũng ngắn hơn bình thường.'],
        ['Ý nghĩa','Phản ánh low momentum hoặc compression, không phải bias tăng/giảm.'],
        ['Bối cảnh','Có thể đáng chú ý trước breakout hoặc khi một trend đang chững lại.']
      ],
      storyTitle:'Cả bên mua và bên bán đều không tạo được quãng di chuyển đáng kể trong phiên.',
      story:[
        ['1 · Biên độ co hẹp','Giá không đi xa khỏi vùng mở cửa.'],
        ['2 · Conviction thấp','Không bên nào tạo được body đủ lớn.'],
        ['3 · Thị trường tạm nén','Phiên kết thúc với ít thông tin hướng nhưng có thể cho thấy compression.']
      ],
      caveat:'Short Line không có hướng độc lập. Giá trị của nó đến từ vị trí trong cấu trúc: compression, pause hay suy yếu động lượng.',
      context:[
        ['good','PHÙ HỢP','Trong pha co hẹp trước breakout hoặc sau move mạnh','Short Line có thể giúp nhận diện sự nén/chững lại.'],
        ['wait','CHƯA ĐỦ','Một nến ngắn đơn lẻ','Không đủ để gọi consolidation hay reversal.'],
        ['bad','SAI CÁCH ĐỌC','Gán bullish/bearish theo màu thân','Màu thân không tạo edge nếu range vẫn rất nhỏ.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá tiếp tục co hẹp mà chưa phá range.'],
        ['TỐT HƠN','Giá phá khỏi cụm compression.'],
        ['MẠNH HƠN','Breakout đi kèm mở rộng range/body và thay đổi cấu trúc.']
      ],
      invalidation:'Không có hướng vô hiệu cố định; luận điểm compression chỉ hết giá trị khi giá đã mở rộng rõ khỏi vùng nén.',
      practice:[
        ['good','Ví dụ A · Compression','Nhiều Short Line liên tiếp ngay dưới kháng cự rồi breakout.','Có thể đọc như pha nén trước mở rộng.'],
        ['wait','Ví dụ B · Đơn lẻ','Một Short Line nằm giữa thị trường bình thường.','Thông tin bổ sung rất ít.'],
        ['fail','Ví dụ C · Diễn giải quá mức','Gọi đảo chiều chỉ vì một nến ngắn.','Short Line không phải reversal pattern độc lập.']
      ],
      analyzer:[
        ['A','Hình dạng','Body và range đều ngắn tương đối so với candle averages.'],
        ['B','Bối cảnh','AI phải xác định compression/pause thay vì gán hướng.'],
        ['C','Phân biệt','Body nhỏ nhưng shadow dài có thể là Spinning Top/High-Wave thay vì Short Line.'],
        ['D','Xác nhận','Đợi breakout/mở rộng range để xác định hướng tiếp theo.']
      ]
    },
    'Takuri': {
      identifyTitle:'Biến thể Dragonfly Doji với bóng dưới đặc biệt dài — nhấn mạnh rejection vùng giá thấp.',
      identify:[
        ['Thân nến','Doji hoặc thân cực nhỏ nằm gần High.'],
        ['Bóng dưới','Rất dài, nổi bật hơn Dragonfly Doji thông thường.'],
        ['Bóng trên','Rất ngắn hoặc gần như không có.'],
        ['Bối cảnh','Thường chỉ có ý nghĩa bullish hơn khi xuất hiện sau nhịp giảm hoặc tại hỗ trợ.']
      ],
      storyTitle:'Lực bán ép giá xuống rất sâu nhưng bị hấp thụ mạnh, kéo Close trở lại vùng cao.',
      story:[
        ['1 · Sell-off sâu','Giá bị đẩy xuống rất xa khỏi Open.'],
        ['2 · Rejection mạnh','Bên mua hấp thụ lượng cung ở vùng thấp.'],
        ['3 · Recovery gần High','Close trở lại gần Open/High, cho thấy vùng thấp bị từ chối quyết liệt.']
      ],
      caveat:'TA-Lib trả output dương khi nhận dạng Takuri nhưng dấu dương không đồng nghĩa luôn bullish. Prior downtrend/support vẫn là phần bắt buộc khi diễn giải reversal.',
      context:[
        ['good','PHÙ HỢP','Sau downtrend hoặc tại hỗ trợ','Lower-price rejection rất mạnh có thể là dấu hiệu đảo chiều tiềm năng.'],
        ['wait','CHƯA ĐỦ','Giữa sideway','Bóng dưới dài có thể chỉ là intraday volatility.'],
        ['bad','SAI CÁCH ĐỌC','Mặc định bullish ở mọi vị trí','Không có prior decline thì chỉ nên mô tả rejection, không kết luận reversal.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Nến sau không vượt vùng cao của Takuri.'],
        ['TỐT HƠN','Giá tăng và giữ trên phần thân/High của mẫu.'],
        ['MẠNH HƠN','Follow-through tăng tại support và cấu trúc giá chuyển sang higher low/higher high.']
      ],
      invalidation:'Nếu giá phá Low của Takuri và tiếp tục tạo đáy thấp hơn, luận điểm lower-price rejection theo hướng bullish thất bại.',
      practice:[
        ['good','Ví dụ A · Đúng context','Takuri xuất hiện sau sell-off tại hỗ trợ và nến sau bật tăng.','Rejection vùng thấp được xác nhận tốt hơn.'],
        ['wait','Ví dụ B · Chưa đủ','Takuri giữa range.','Không nên tự động gọi đáy.'],
        ['fail','Ví dụ C · Thất bại','Giá phá Low Takuri.','Rejection không tạo được follow-through.']
      ],
      analyzer:[
        ['A','Hình dạng','Doji/thân cực nhỏ gần High, lower shadow rất dài, upper shadow rất ngắn.'],
        ['B','Phân biệt','Takuri là biến thể extreme của Dragonfly Doji.'],
        ['C','Bối cảnh','Sau downtrend/support mới nâng bias bullish.'],
        ['D','Xác nhận','Không suy diễn output +100 của TA-Lib thành xác suất tăng.']
      ]
    },
    'Rickshaw Man': {
      identifyTitle:'Thân cực nhỏ nằm gần giữa range với bóng hai phía dài — trạng thái cân bằng ngay giữa biến động lớn.',
      identify:[
        ['Thân nến','Doji hoặc thân rất nhỏ.'],
        ['Vị trí thân','Nằm gần giữa toàn bộ range.'],
        ['Bóng nến','Cả bóng trên và bóng dưới đều kéo dài.'],
        ['Ý nghĩa','Thể hiện indecision cao; không có hướng độc lập.']
      ],
      storyTitle:'Giá đi xa cả lên lẫn xuống nhưng quay về cân bằng gần giữa range khi đóng cửa.',
      story:[
        ['1 · Buyer push','Bên mua từng đẩy giá lên đáng kể.'],
        ['2 · Seller push','Bên bán cũng từng ép giá xuống sâu.'],
        ['3 · Balance at close','Close trở lại gần giữa range, cho thấy không phe nào giữ quyền kiểm soát.']
      ],
      caveat:'Rickshaw Man là một dạng Doji/indecision đặc biệt. Sau trend extreme nó đáng chú ý hơn, nhưng vẫn cần breakout để biết hướng.',
      context:[
        ['good','PHÙ HỢP','Sau trend dài hoặc trong high volatility','Cân bằng mạnh sau biến động có thể báo hiệu chuyển trạng thái.'],
        ['wait','CHƯA ĐỦ','Trong sideway rộng','Mẫu có thể chỉ lặp lại trạng thái cân bằng vốn có.'],
        ['bad','SAI CÁCH ĐỌC','Gán hướng từ màu thân','Body gần như không đáng kể; màu không phải trọng tâm.']
      ],
      confirmation:[
        ['CHƯA ĐỦ','Giá tiếp tục nằm trong range Rickshaw Man.'],
        ['TỐT HƠN','Giá breakout khỏi range theo một hướng rõ.'],
        ['MẠNH HƠN','Breakout đi kèm thay đổi cấu trúc tại vùng cực trị/key level.']
      ],
      invalidation:'Không có hướng vô hiệu cố định. Cách diễn giải chỉ sai khi giá đi ngược bias được gán từ context.',
      practice:[
        ['good','Ví dụ A · Sau trend','Rickshaw Man xuất hiện sau nhịp tăng kéo dài rồi giá phá xuống.','Indecision được xác nhận theo hướng suy yếu.'],
        ['wait','Ví dụ B · Trung tính','Mẫu xuất hiện giữa range.','Tiếp tục coi là cân bằng.'],
        ['fail','Ví dụ C · Bias sai','Gọi bearish nhưng giá phá lên mạnh.','Bias sai; pattern vẫn chỉ là indecision.']
      ],
      analyzer:[
        ['A','Hình dạng','Thân cực nhỏ gần giữa range, shadows hai phía dài.'],
        ['B','Phân biệt','Nếu body lệch xa khỏi giữa range, có thể là Long-Legged Doji khác biến thể.'],
        ['C','Bối cảnh','Trend extreme/high volatility tăng giá trị diễn giải.'],
        ['D','Xác nhận','Không gán bullish/bearish trước breakout/follow-through.']
      ]
    }  };

  function synthesizedProfile(p,note){
    if(!note) return null;
    const direction=(p.bias||'').toLowerCase();
    const signal=(p.signalType||'').toLowerCase();
    const directional=direction.includes('bull')?'tăng':direction.includes('bear')?'giảm':'phù hợp với bối cảnh';
    const confirm=p.confirmation || 'Theo dõi phản ứng của các nến sau và cấu trúc giá gần nhất.';
    const invalid=p.invalidation || 'Nếu giá đi ngược hoàn toàn với cách diễn giải ban đầu, luận điểm từ mẫu hình không còn giá trị.';
    return {
      identifyTitle:note.focus,
      identify:[
        ['Cấu trúc cốt lõi',p.formation],
        ['Số nến & quan hệ',`${patternGroup(p)}; đọc mối quan hệ Open–High–Low–Close giữa các nến thay vì chỉ đếm màu.`],
        ['Bối cảnh',`${contextVi(p.context)}.`],
        ['Điểm dễ nhầm',note.wrong]
      ],
      storyTitle:note.story,
      story:[
        ['1 · Trạng thái trước mẫu',`Mẫu chỉ có ý nghĩa khi đặt trong bối cảnh: ${contextVi(p.context)}.`],
        ['2 · Chuyển biến trong mẫu',note.focus],
        ['3 · Điều thị trường cần chứng minh',confirm]
      ],
      caveat:`${note.boundary} Pattern recognized không đồng nghĩa trade recommendation.`,
      context:[
        ['good','PHÙ HỢP',contextVi(p.context),`Đây là vị trí phù hợp để diễn giải ${p.name} theo đúng catalog ChartLab.`],
        ['wait','CHƯA ĐỦ','Chỉ thấy hình dạng',`Nếu screenshot thiếu prior trend, key level hoặc phần nến trước đó, chỉ nên ghi nhận candidate pattern và hạ confidence.`],
        ['bad','DỄ ĐỌC SAI','Sai điều kiện phân biệt',note.wrong]
      ],
      confirmation:[
        ['CHƯA ĐỦ',`Mẫu đã hình thành nhưng chưa có diễn biến sau mẫu đủ rõ.`],
        ['TỐT HƠN',confirm],
        ['MẠNH HƠN',`Follow-through ${directional} đồng thời phá/giữ được vùng cấu trúc quan trọng gần mẫu.`]
      ],
      invalidation:invalid,
      practice:[
        ['good','Ví dụ A · Đúng cấu trúc',`${note.focus}`,`Đặt đúng tại ${contextVi(p.context).toLowerCase()} và có confirmation phù hợp thì giá trị quan sát cao hơn.`],
        ['wait','Ví dụ B · Candidate',`Hình học giống ${p.name} nhưng ảnh bị crop sát hoặc thiếu prior trend.`,'AI chỉ nên báo candidate/low confidence, không tự bù context.'],
        ['fail','Ví dụ C · Luận điểm sai',invalid,'Khi điều kiện này xảy ra, không tiếp tục dùng pattern làm bằng chứng cho thesis ban đầu.']
      ],
      analyzer:[
        ['A','Geometry',p.formation],
        ['B','Context',`Phải nhìn thấy hoặc suy ra hợp lý từ chart: ${contextVi(p.context)}.`],
        ['C','TA-Lib boundary',note.boundary],
        ['D','Output policy','Confidence là độ tin cậy nhận diện geometry + context, không phải xác suất giá sẽ đi đúng hướng.']
      ]
    };
  }
  function profileFor(p){
    return lessonProfiles[p.name] || synthesizedProfile(p,(window.CHARTLAB_CURATED_LESSON_NOTES||{})[p.name]);
  }
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
    if(entries[0]) return entries[0];
    const defs=window.CHARTLAB_CURATED_COMPARE_DEFS||[];
    const d=defs.find(x=>Array.isArray(x.names)&&x.names.includes(p.name));
    if(!d) return null;
    const otherName=d.names.find(n=>n!==p.name);
    const other=patterns.find(q=>q.name===otherName);
    return other?{id:other.id,pattern:other,note:d.key||d.title||'Hai mẫu dễ nhầm; cần so geometry và context.'}:null;
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