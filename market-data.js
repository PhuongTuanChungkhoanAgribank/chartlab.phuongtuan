(() => {
  const $ = (id) => document.getElementById(id);
  const chartEl = $("marketChart");
  const chart = window.echarts ? echarts.init(chartEl) : null;

  const indicators = [
    {id:"cpi",name:"CPI Việt Nam",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",unit:"%",insight:"CPI phản ánh tốc độ tăng mặt bằng giá. Khi lạm phát tăng mạnh, dư địa giảm lãi suất thường thu hẹp và định giá cổ phiếu có thể chịu áp lực.",impact:["Ngân hàng","Bất động sản","Bán lẻ"],note:"Theo dõi thêm lạm phát cơ bản, tỷ giá và lãi suất điều hành.",driver:"wichart"},
    {id:"gdp",name:"Tăng trưởng GDP",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng quý",unit:"%",insight:"GDP cho biết tốc độ mở rộng của nền kinh tế. Tăng trưởng cải thiện thường hỗ trợ doanh thu doanh nghiệp và khẩu vị rủi ro.",impact:["Ngân hàng","Bán lẻ","Công nghiệp"],note:"Nên nhìn cùng sản xuất công nghiệp, bán lẻ và đầu tư.",driver:"wichart"},
    {id:"iip",name:"Chỉ số sản xuất công nghiệp",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",insight:"IIP phản ánh nhịp sản xuất của nền kinh tế. Đà tăng tốt thường là tín hiệu thuận lợi cho nhóm công nghiệp và logistics.",impact:["Khu công nghiệp","Logistics","Sản xuất"],note:"Theo dõi cùng PMI và xuất nhập khẩu.",driver:"wichart"},
    {id:"hhdv",name:"Tổng mức bán lẻ",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",insight:"Bán lẻ cho biết sức cầu trong nước. Tăng trưởng tốt thường hỗ trợ các doanh nghiệp tiêu dùng, bán lẻ và dịch vụ.",impact:["Bán lẻ","Tiêu dùng","Dịch vụ"],note:"Cần loại trừ ảnh hưởng giá để đánh giá sức mua thực.",driver:"wichart"},
    {id:"fdi",name:"FDI",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",insight:"FDI đăng ký và giải ngân phản ánh sức hút đầu tư dài hạn. Dòng vốn mạnh thường hỗ trợ khu công nghiệp, logistics và xây dựng.",impact:["Khu công nghiệp","Logistics","Xây dựng"],note:"Ưu tiên theo dõi vốn giải ngân bên cạnh vốn đăng ký.",driver:"wichart"},
    {id:"cctm",name:"Xuất nhập khẩu & cán cân thương mại",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê / Hải quan",freq:"Nửa tháng / tháng",insight:"Xuất nhập khẩu phản ánh cầu bên ngoài và sức khỏe sản xuất. Thặng dư thương mại cũng hỗ trợ nguồn cung ngoại tệ.",impact:["Dệt may","Thủy sản","Logistics"],note:"Nên bóc theo từng nhóm hàng khi phân tích doanh nghiệp.",driver:"wichart"},
    {id:"vdtnsnn",name:"Đầu tư từ ngân sách nhà nước",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê / Bộ Tài chính",freq:"Hàng tháng",insight:"Giải ngân đầu tư công tạo cầu trực tiếp cho hạ tầng, vật liệu xây dựng và nhiều ngành liên quan.",impact:["Xây dựng","Đá","Thép"],note:"Theo dõi tiến độ giải ngân so với kế hoạch năm.",driver:"wichart"},
    {id:"vdtptxh",name:"Vốn đầu tư phát triển toàn xã hội",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng quý",insight:"Tổng vốn đầu tư phát triển phản ánh quy mô vốn bỏ vào nền kinh tế từ nhà nước, tư nhân và FDI.",impact:["Xây dựng","Ngân hàng","Công nghiệp"],note:"Nên tách cơ cấu nhà nước, ngoài nhà nước và FDI để đọc động lực tăng trưởng.",driver:"wichart"},
    {id:"pmi",name:"PMI sản xuất",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"S&P Global / tổng hợp Wichart",freq:"Hàng tháng",unit:"điểm",insight:"PMI trên 50 thường cho thấy khu vực sản xuất mở rộng; dưới 50 cho thấy thu hẹp.",impact:["Sản xuất","Logistics","Khu công nghiệp"],note:"PMI là khảo sát sớm, nên đối chiếu với IIP và đơn hàng xuất khẩu.",driver:"wichart"},
    {id:"kqt",name:"Khách quốc tế đến Việt Nam",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",insight:"Khách quốc tế phản ánh sức khỏe du lịch và dịch vụ, tác động tới hàng không, lưu trú, bán lẻ và vận tải.",impact:["Hàng không","Du lịch","Bán lẻ"],note:"Theo dõi thêm cơ cấu thị trường khách và công suất vận chuyển.",driver:"wichart"},
    {id:"tcns",name:"Thu chi ngân sách nhà nước",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Bộ Tài chính",freq:"Hàng tháng",insight:"Thu chi ngân sách phản ánh trạng thái tài khóa và khả năng hỗ trợ tăng trưởng thông qua chi đầu tư và chi thường xuyên.",impact:["Đầu tư công","Xây dựng","Trái phiếu"],note:"Quan trọng nhất là tiến độ chi đầu tư phát triển và cân đối ngân sách.",driver:"wichart"},
    {id:"ncp",name:"Nợ công & nợ Chính phủ",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Bộ Tài chính",freq:"Hàng năm / định kỳ",insight:"Nợ công cho biết dư địa tài khóa và nghĩa vụ trả nợ của khu vực công.",impact:["Trái phiếu","Tài khóa"],note:"Nên đặt trong tương quan GDP, thu ngân sách và cơ cấu kỳ hạn nợ.",driver:"wichart"},
    {id:"tn",name:"Tỷ lệ thất nghiệp",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng quý",unit:"%",insight:"Thất nghiệp phản ánh sức khỏe thị trường lao động và gián tiếp cho biết sức cầu tiêu dùng.",impact:["Bán lẻ","Tiêu dùng","Dịch vụ"],note:"Theo dõi cùng thu nhập và lực lượng lao động.",driver:"wichart"},

    {id:"td",name:"Tín dụng toàn nền kinh tế",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng tháng",insight:"Tín dụng tăng cho thấy vốn đang được đưa vào nền kinh tế. Khi đi cùng chất lượng tài sản ổn định, đây thường là tín hiệu tích cực cho hoạt động kinh doanh.",impact:["Ngân hàng","Chứng khoán","Bất động sản"],note:"Theo dõi cùng huy động, NIM và nợ xấu.",driver:"wichart"},
    {id:"ctt",name:"Cung tiền M2",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng tháng",insight:"M2 phản ánh lượng tiền trong nền kinh tế. Tăng trưởng thanh khoản thường hỗ trợ tài sản tài chính nhưng cần đặt cạnh lạm phát và tỷ giá.",impact:["Chứng khoán","Ngân hàng","Bất động sản"],note:"Không nên dùng M2 đơn lẻ để dự báo thị trường.",driver:"wichart"},
    {id:"lslnh",name:"Lãi suất liên ngân hàng",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng ngày / tuần",insight:"Lãi suất liên ngân hàng là nhiệt kế thanh khoản hệ thống. Tăng đột biến thường cho thấy thanh khoản ngắn hạn đang căng hơn.",impact:["Ngân hàng","Chứng khoán"],note:"Quan sát kỳ hạn qua đêm cùng OMO và tín phiếu.",driver:"wichart"},
    {id:"lsdh",name:"Lãi suất điều hành",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Theo quyết định",insight:"Lãi suất điều hành thể hiện định hướng chính sách tiền tệ. Giảm lãi suất thường hỗ trợ chi phí vốn và định giá tài sản.",impact:["Ngân hàng","Bất động sản","Chứng khoán"],note:"Tác động thực tế còn phụ thuộc lãi suất huy động và tín dụng.",driver:"wichart"},
    {id:"dhtg",name:"Tỷ giá trung tâm & biên độ",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng ngày",insight:"Tỷ giá phản ánh sức ép ngoại hối. Biến động mạnh có thể ảnh hưởng dư địa chính sách tiền tệ và doanh nghiệp vay ngoại tệ.",impact:["Ngân hàng","Xuất khẩu","Hàng không"],note:"Theo dõi thêm DXY và cán cân thương mại.",driver:"wichart"},
    {id:"nvttm",name:"Nghiệp vụ thị trường mở (OMO)",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Theo phiên",insight:"OMO cho thấy NHNN đang bơm hoặc hút thanh khoản ngắn hạn khỏi hệ thống ngân hàng.",impact:["Ngân hàng","Chứng khoán"],note:"Cần nhìn theo số dư ròng nhiều phiên thay vì một phiên đơn lẻ.",driver:"wichart"},
    {id:"tpkb",name:"Tín phiếu NHNN",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Theo phiên",insight:"Phát hành tín phiếu thường là công cụ hút bớt thanh khoản ngắn hạn; đáo hạn tín phiếu có tác động ngược lại.",impact:["Ngân hàng","Chứng khoán"],note:"Đọc cùng OMO và lãi suất liên ngân hàng.",driver:"wichart"},
    {id:"hd",name:"Huy động vốn toàn nền kinh tế",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng tháng",insight:"Huy động cho biết tốc độ tăng nguồn vốn trong hệ thống ngân hàng. Chênh lệch tăng trưởng huy động và tín dụng có thể gợi ý áp lực thanh khoản.",impact:["Ngân hàng"],note:"So sánh với tăng trưởng tín dụng và lãi suất huy động.",driver:"wichart"},
    {id:"lshd",name:"Lãi suất huy động",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước / thị trường",freq:"Hàng tháng",unit:"%",insight:"Lãi suất huy động là chi phí vốn quan trọng của ngân hàng và là mức sinh lời cạnh tranh với các tài sản rủi ro.",impact:["Ngân hàng","Chứng khoán","Bất động sản"],note:"Xu hướng lãi suất huy động thường truyền dẫn sang lãi suất cho vay với độ trễ.",driver:"wichart"},
    {id:"dtnh",name:"Dự trữ ngoại hối",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước / nguồn công bố quốc tế",freq:"Hàng tháng / quý",insight:"Dự trữ ngoại hối thể hiện bộ đệm của nhà điều hành trước biến động tỷ giá và dòng vốn.",impact:["Tỷ giá","Ngân hàng","Khối ngoại"],note:"Cần nhìn cùng cán cân thương mại và cán cân thanh toán.",driver:"wichart"},
    {id:"cctt",name:"Cán cân thanh toán",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng quý",insight:"Cán cân thanh toán tổng hợp các dòng ngoại tệ vào ra nền kinh tế, giúp đánh giá áp lực lên tỷ giá và dự trữ ngoại hối.",impact:["Tỷ giá","Khối ngoại","Ngân hàng"],note:"Tách tài khoản vãng lai và tài khoản tài chính khi cần phân tích sâu.",driver:"wichart"},

    {id:"dau_wti",name:"Dầu WTI",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường hàng hóa quốc tế",freq:"Hàng ngày",insight:"Giá dầu ảnh hưởng trực tiếp tới nhóm dầu khí và gián tiếp tới vận tải, hàng không, hóa chất và lạm phát.",impact:["Dầu khí","Hàng không","Vận tải"],note:"Nên xem đồng thời Brent và crack spread khi phân tích lọc hóa dầu.",driver:"wichart",commodity:true},
    {id:"vang",name:"Giá vàng",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường vàng",freq:"Hàng ngày",insight:"Vàng thường phản ánh nhu cầu phòng thủ, kỳ vọng lãi suất thực và rủi ro vĩ mô.",impact:["Tài sản phòng thủ","Tỷ giá"],note:"Theo dõi cùng lợi suất thực và USD.",driver:"wichart",commodity:true},
    {id:"hrc_trung_quoc",name:"HRC Trung Quốc",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường thép Trung Quốc",freq:"Hàng ngày",insight:"HRC là biến đầu vào/đầu ra quan trọng của ngành thép. Biến động giá ảnh hưởng doanh thu, tồn kho và biên lợi nhuận theo từng doanh nghiệp.",impact:["HPG","HSG","NKG"],note:"Cần xem thêm quặng sắt, than cốc và tồn kho thép.",driver:"wichart",commodity:true},
    {id:"quang_sat",name:"Quặng sắt",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường nguyên liệu thép",freq:"Hàng ngày",insight:"Quặng sắt là nguyên liệu đầu vào lớn của thép lò cao. Giá tăng có thể gây áp lực chi phí nếu giá bán thép không tăng tương ứng.",impact:["Thép"],note:"Đọc cùng HRC và than cốc để đánh giá spread.",driver:"wichart",commodity:true},
    {id:"dong",name:"Giá đồng",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường kim loại",freq:"Hàng ngày",insight:"Đồng thường được xem là chỉ báo nhạy với chu kỳ công nghiệp và xây dựng toàn cầu.",impact:["Kim loại","Điện","Xây dựng"],note:"Theo dõi thêm PMI Trung Quốc và tồn kho kim loại.",driver:"wichart",commodity:true},
    {id:"cao_su_nhat_ban",name:"Cao su thế giới",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường cao su quốc tế",freq:"Hàng ngày",insight:"Giá cao su ảnh hưởng doanh thu các doanh nghiệp cao su tự nhiên và chi phí đầu vào của ngành săm lốp.",impact:["Cao su","Săm lốp"],note:"Cần so với sản lượng và giá bán thực tế của doanh nghiệp.",driver:"wichart",commodity:true},
    {id:"phan_ure",name:"Giá Ure",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường phân bón",freq:"Hàng ngày",insight:"Giá Ure quyết định phần lớn triển vọng giá bán của doanh nghiệp phân đạm, trong khi khí đầu vào quyết định biên lợi nhuận.",impact:["Phân bón"],note:"Theo dõi đồng thời khí đầu vào và chính sách xuất khẩu của các nước lớn.",driver:"wichart",commodity:true},
    {id:"than_newcastle",name:"Than Newcastle",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường than quốc tế",freq:"Hàng ngày",insight:"Giá than ảnh hưởng chi phí nhiên liệu, điện và một phần chuỗi sản xuất công nghiệp.",impact:["Nhiệt điện","Xi măng","Hóa chất"],note:"Tác động khác nhau tùy doanh nghiệp mua than theo hợp đồng hay giá thị trường.",driver:"wichart",commodity:true},
    {id:"khi_thien_nhien",name:"Khí thiên nhiên",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường năng lượng quốc tế",freq:"Hàng ngày",insight:"Giá khí tự nhiên ảnh hưởng điện khí, phân bón và nhiều ngành công nghiệp sử dụng khí làm nguyên liệu.",impact:["Điện khí","Phân bón","Hóa chất"],note:"Phân biệt giá khí theo khu vực và cơ chế hợp đồng.",driver:"wichart",commodity:true},
    {id:"ca_phe",name:"Giá cà phê",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường nông sản",freq:"Hàng ngày",insight:"Giá cà phê tác động trực tiếp tới doanh thu xuất khẩu và các doanh nghiệp trong chuỗi cà phê.",impact:["Nông nghiệp","Xuất khẩu"],note:"Theo dõi sản lượng vụ mùa, tồn kho và tỷ giá.",driver:"wichart",commodity:true},
    {id:"tieu",name:"Giá hồ tiêu",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường nông sản",freq:"Hàng ngày",insight:"Giá hồ tiêu phản ánh cung cầu một mặt hàng xuất khẩu quan trọng của Việt Nam.",impact:["Nông nghiệp","Xuất khẩu"],note:"Sản lượng và tồn kho thường gây biến động lớn theo mùa vụ.",driver:"wichart",commodity:true},
    {id:"heo_hoi",name:"Giá heo hơi",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường chăn nuôi Việt Nam",freq:"Hàng ngày",insight:"Giá heo hơi ảnh hưởng doanh thu chăn nuôi và đồng thời là một cấu phần đáng chú ý của giá thực phẩm.",impact:["Chăn nuôi","Thực phẩm","CPI"],note:"Nên nhìn cùng giá thức ăn chăn nuôi và quy mô đàn.",driver:"wichart",commodity:true},
    {id:"nhua_duong_60_70",name:"Giá nhựa đường",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường vật liệu xây dựng",freq:"Định kỳ",insight:"Nhựa đường là đầu vào quan trọng của thi công hạ tầng giao thông.",impact:["Hạ tầng","Xây dựng"],note:"Hữu ích khi đánh giá biên lợi nhuận nhà thầu đường bộ.",driver:"wichart",commodity:true},

    {id:"DGS10",name:"Lợi suất TPCP Mỹ 10 năm",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"Federal Reserve Bank of St. Louis",freq:"Hàng ngày",unit:"%",insight:"US10Y là lãi suất tham chiếu quan trọng của tài sản toàn cầu. Lợi suất tăng nhanh thường gây áp lực lên định giá cổ phiếu tăng trưởng và dòng vốn mới nổi.",impact:["Định giá","Tỷ giá","Khối ngoại"],note:"Theo dõi cùng Fed Funds, CPI Mỹ và DXY.",driver:"fred"},
    {id:"DGS2",name:"Lợi suất TPCP Mỹ 2 năm",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"Federal Reserve Bank of St. Louis",freq:"Hàng ngày",unit:"%",insight:"US2Y phản ánh kỳ vọng chính sách Fed khá nhạy. Chênh lệch US10Y-US2Y thường được dùng để đọc hình dạng đường cong lợi suất.",impact:["Fed","Tỷ giá","Khối ngoại"],note:"Kết hợp với US10Y để đánh giá đường cong lợi suất.",driver:"fred"},
    {id:"FEDFUNDS",name:"Fed Funds Rate",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"Federal Reserve",freq:"Hàng tháng",unit:"%",insight:"Fed Funds Rate là mốc lãi suất cốt lõi của chính sách tiền tệ Mỹ, ảnh hưởng chi phí vốn và dòng tiền toàn cầu.",impact:["USD","Khối ngoại","Định giá"],note:"Thị trường thường phản ứng trước theo kỳ vọng, không chờ quyết định chính thức.",driver:"fred"},
    {id:"UNRATE",name:"Tỷ lệ thất nghiệp Mỹ",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"U.S. Bureau of Labor Statistics",freq:"Hàng tháng",unit:"%",insight:"Thất nghiệp là biến quan trọng trong nhiệm vụ kép của Fed. Thị trường theo dõi nó để đánh giá sức khỏe lao động và hướng lãi suất.",impact:["Fed","USD","Chứng khoán toàn cầu"],note:"Đọc cùng bảng lương phi nông nghiệp và tăng trưởng tiền lương.",driver:"fred"},
    {id:"CPIAUCSL",name:"CPI Mỹ",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"U.S. Bureau of Labor Statistics",freq:"Hàng tháng",unit:"chỉ số",insight:"CPI Mỹ là biến quan trọng chi phối kỳ vọng lãi suất Fed và lợi suất trái phiếu.",impact:["Fed","USD","Khối ngoại"],note:"Để đọc lạm phát, nên xem tốc độ YoY/MoM thay vì chỉ mức chỉ số.",driver:"fred"},
    {id:"CPILFESL",name:"CPI lõi Mỹ",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"U.S. Bureau of Labor Statistics",freq:"Hàng tháng",unit:"chỉ số",insight:"CPI lõi loại thực phẩm và năng lượng, giúp nhìn áp lực giá mang tính dai dẳng hơn.",impact:["Fed","US10Y","Định giá"],note:"Đặt cạnh CPI tổng thể và PCE lõi.",driver:"fred"},
    {id:"INDPRO",name:"Sản xuất công nghiệp Mỹ",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"Federal Reserve",freq:"Hàng tháng",unit:"chỉ số",insight:"Sản xuất công nghiệp cho biết nhịp hoạt động của khu vực công nghiệp Mỹ và chu kỳ kinh tế.",impact:["Hàng hóa","Chu kỳ kinh tế"],note:"Theo dõi cùng PMI/ISM và đơn hàng mới.",driver:"fred"},
    {id:"RSAFS",name:"Doanh số bán lẻ Mỹ",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"U.S. Census Bureau",freq:"Hàng tháng",unit:"triệu USD",insight:"Bán lẻ phản ánh sức khỏe tiêu dùng Mỹ, động lực lớn nhất của nền kinh tế này.",impact:["Fed","USD","Chứng khoán Mỹ"],note:"Cần lưu ý số liệu danh nghĩa chịu ảnh hưởng của giá.",driver:"fred"},
    {id:"M2SL",name:"Cung tiền M2 Mỹ",group:"global",groupLabel:"Quốc tế",feed:"FRED",origin:"Federal Reserve",freq:"Hàng tháng",unit:"tỷ USD",insight:"M2 Mỹ cho biết quy mô tiền rộng trong nền kinh tế và là biến tham khảo về điều kiện thanh khoản.",impact:["Thanh khoản toàn cầu","Tài sản rủi ro"],note:"Không nên diễn giải M2 như một tín hiệu giao dịch độc lập.",driver:"fred"}
  ];

  const groups = [
    ["all","Tất cả"],["macro","Vĩ mô"],["money","Tiền tệ"],["commodity","Hàng hóa"],["global","Quốc tế"]
  ];

  const initialGroup = new URLSearchParams(location.search).get("group");
  let activeGroup = ["macro","money","commodity","global"].includes(initialGroup) ? initialGroup : "all";
  let activeId = "lslnh";
  let activeData = null;
  const overviewIds = ["cpi","td","lslnh","DGS10"];

  function fmt(v){
    if(v === null || v === undefined || Number.isNaN(Number(v))) return "—";
    const n = Number(v);
    return new Intl.NumberFormat("vi-VN",{maximumFractionDigits:2}).format(n);
  }
  function fmtDate(x){
    const d = new Date(x);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("vi-VN");
  }

  function renderTabs(){
    $("marketTabs").innerHTML = groups.map(([id,label]) => `<button class="md-tab ${activeGroup===id?"active":""}" data-group="${id}">${label}</button>`).join("");
    document.querySelectorAll(".md-tab").forEach(btn => btn.onclick = () => {
      activeGroup = btn.dataset.group;
      renderTabs(); renderList();
    });
  }

  function filteredIndicators(){
    const q = ($("marketSearch").value || "").trim().toLowerCase();
    return indicators.filter(x => (activeGroup === "all" || x.group === activeGroup) && (!q || (x.name+" "+x.groupLabel+" "+x.origin).toLowerCase().includes(q)));
  }

  function renderList(){
    const rows = filteredIndicators();
    $("indicatorCount").textContent = rows.length + " chỉ tiêu";
    $("indicatorList").innerHTML = rows.map(x => `<button class="md-indicator ${x.id===activeId?"active":""}" data-id="${x.id}">${x.name}<small>${x.origin}</small></button>`).join("");
    document.querySelectorAll(".md-indicator").forEach(btn => btn.onclick = () => loadIndicator(btn.dataset.id));
  }

  async function fetchWichart(item){
    let url = `https://api.wichart.vn/vietnambiz/vi-mo?name=${encodeURIComponent(item.id)}`;
    if(item.commodity) url += "&key=hanghoa";
    const response = await fetch(url);
    if(!response.ok) throw new Error("Wichart HTTP " + response.status);
    const data = await response.json();
    const series = (data.chart?.series || []).map((s, idx) => ({
      name:s.name || item.name,
      unit:s.unit || item.unit || "",
      type:s.type === "bar" ? "bar" : "line",
      yAxisIndex: idx > 0 && data.chart.series[0]?.type !== s.type ? 1 : 0,
      data:(s.data || []).map(p => [Number(p[0]), Number(p[1])]).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1])).sort((a,b)=>a[0]-b[0])
    }));
    return {title:data.title || item.name, updated:data.timeUpdate || "Theo nguồn", stacked:!!data.stacked_column, series};
  }

  async function fetchFred(item){
    const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(item.id)}`;
    const response = await fetch(url);
    if(!response.ok) throw new Error("FRED HTTP " + response.status);
    const text = await response.text();
    const lines = text.trim().split(/\r?\n/).slice(1);
    const data = lines.map(line => {
      const [date,val] = line.split(",");
      const n = Number(val);
      return [new Date(date+"T00:00:00Z").getTime(), n];
    }).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]));
    return {title:item.name, updated:data.length ? fmtDate(data[data.length-1][0]) : "Theo nguồn", stacked:false, series:[{name:item.name,unit:item.unit||"",type:"line",yAxisIndex:0,data}]};
  }

  function renderOverviewShell(){
    $("overviewCards").innerHTML = overviewIds.map(id => {
      const item = indicators.find(x => x.id === id);
      return `<button class="md-overview-card loading" data-overview-id="${id}">
        <div class="md-overview-card-top"><span class="md-overview-card-title">${item.name}</span><span class="md-overview-card-source">${item.feed}</span></div>
        <div class="md-overview-value"><strong>…</strong><span></span></div>
        <div class="md-overview-change">Đang tải dữ liệu</div>
      </button>`;
    }).join("");
    document.querySelectorAll("[data-overview-id]").forEach(btn => btn.onclick = () => loadIndicator(btn.dataset.overviewId));
  }

  async function loadOverview(){
    renderOverviewShell();
    await Promise.all(overviewIds.map(async id => {
      const item = indicators.find(x => x.id === id);
      const card = document.querySelector(`[data-overview-id="${id}"]`);
      if(!item || !card) return;
      try{
        const payload = item.driver === "fred" ? await fetchFred(item) : await fetchWichart(item);
        const primary = payload.series[0];
        const p = latestOf(primary);
        const prev = primary?.data?.length > 1 ? primary.data[primary.data.length-2] : null;
        const change = p && prev ? p[1]-prev[1] : null;
        card.classList.remove("loading");
        card.querySelector(".md-overview-value").innerHTML = `<strong>${p ? fmt(p[1]) : "—"}</strong><span>${primary?.unit || item.unit || ""}</span>`;
        const changeEl = card.querySelector(".md-overview-change");
        if(change === null){
          changeEl.textContent = payload.updated || "Theo nguồn";
        }else{
          changeEl.textContent = `${change>=0?"▲":"▼"} ${fmt(Math.abs(change))} ${primary?.unit || ""} · kỳ gần nhất`;
          changeEl.className = "md-overview-change " + (change>=0 ? "up" : "down");
        }
      }catch(e){
        card.classList.remove("loading");
        card.querySelector(".md-overview-value").innerHTML = "<strong>—</strong><span></span>";
        card.querySelector(".md-overview-change").textContent = "Nguồn tạm gián đoạn";
      }
    }));
  }

  function latestOf(series){
    if(!series?.data?.length) return null;
    return series.data[series.data.length-1];
  }

  function renderKpis(payload,item){
    const primary = payload.series[0];
    const p = latestOf(primary);
    const prev = primary?.data?.length > 1 ? primary.data[primary.data.length-2] : null;
    const change = p && prev ? p[1]-prev[1] : null;
    const changePct = p && prev && prev[1] ? change/Math.abs(prev[1])*100 : null;
    $("marketKpis").innerHTML = [
      ["Giá trị mới nhất", p ? fmt(p[1]) : "—", primary?.unit || item.unit || ""],
      ["Thay đổi kỳ gần nhất", change === null ? "—" : (change>=0?"+":"")+fmt(change), primary?.unit || ""],
      ["Thay đổi tương đối", changePct === null ? "—" : (changePct>=0?"+":"")+fmt(changePct), changePct===null?"":"%"],
      ["Điểm dữ liệu", primary?.data?.length || 0, ""]
    ].map(k => `<div class="md-kpi"><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
  }

  function renderMeta(item,payload){
    $("chartCategory").textContent = item.groupLabel;
    $("chartTitle").textContent = payload.title || item.name;
    $("chartSubtitle").textContent = item.insight.split(".")[0] + ".";
    $("sourceStatus").textContent = "● " + item.feed + " · miễn phí";
    $("quickInsight").textContent = item.insight;
    $("impactTags").innerHTML = item.impact.map(x => `<span class="md-impact-tag">${x}</span>`).join("");
    $("impactNote").textContent = item.note;
    $("feedSource").textContent = item.feed;
    $("originSource").textContent = item.origin;
    $("frequency").textContent = item.freq;
    $("updatedAt").textContent = payload.updated || "Theo nguồn";
  }

  function renderChart(payload,item){
    if(!chart) throw new Error("Không tải được thư viện biểu đồ.");
    const colors = ["#7357ff","#ff8b3d","#0f7c83","#f2b94b","#d94c4c"];
    const allValues = payload.series.flatMap(s => s.data.map(p => p[1]));
    const option = {
      animationDuration:500,
      color:colors,
      grid:{left:54,right:payload.series.some(s=>s.yAxisIndex===1)?58:24,top:42,bottom:70,containLabel:true},
      tooltip:{trigger:"axis",axisPointer:{type:"cross"},valueFormatter:(v)=>fmt(v)},
      legend:{top:4,type:"scroll",textStyle:{color:"#596174"}},
      toolbox:{right:8,feature:{dataZoom:{yAxisIndex:"none"},restore:{},saveAsImage:{name:item.id}}},
      xAxis:{type:"time",axisLine:{lineStyle:{color:"#cfd4df"}},axisLabel:{color:"#747c8c"}},
      yAxis:[
        {type:"value",scale:true,axisLabel:{color:"#747c8c"},splitLine:{lineStyle:{color:"#eef0f5"}}},
        {type:"value",scale:true,position:"right",axisLabel:{color:"#747c8c"},splitLine:{show:false}}
      ],
      dataZoom:[{type:"inside"},{type:"slider",height:20,bottom:18,borderColor:"#e5e7eb",fillerColor:"rgba(115,87,255,.12)"}],
      series:payload.series.map((s,i)=>({
        name:s.name,type:s.type==="bar"?"bar":"line",yAxisIndex:s.yAxisIndex||0,data:s.data,
        showSymbol:false,symbolSize:5,smooth:s.type!=="bar",connectNulls:true,
        barMaxWidth:24,lineStyle:{width:2},areaStyle:i===0&&s.type!=="bar"?{opacity:.035}:undefined
      }))
    };
    if(allValues.length===0) throw new Error("Nguồn chưa trả về dữ liệu.");
    chart.clear(); chart.setOption(option,true);
  }

  async function loadIndicator(id){
    const item = indicators.find(x => x.id === id) || indicators[0];
    activeId = item.id; renderList();
    $("chartTitle").textContent = item.name;
    $("chartSubtitle").textContent = "Đang tải dữ liệu...";
    $("chartMessage").hidden = true;
    $("marketKpis").innerHTML = `<div class="md-kpi"><span>Trạng thái</span><strong>Đang tải…</strong></div>`;
    chart?.showLoading("default",{text:"Đang lấy dữ liệu miễn phí..."});
    try{
      const payload = item.driver === "fred" ? await fetchFred(item) : await fetchWichart(item);
      activeData = payload;
      renderMeta(item,payload); renderKpis(payload,item); renderChart(payload,item);
    }catch(err){
      console.error(err);
      $("chartCategory").textContent = item.groupLabel;
      $("chartTitle").textContent = item.name;
      $("chartSubtitle").textContent = "Không lấy được dữ liệu từ nguồn ở lần tải này.";
      $("sourceStatus").textContent = "○ Nguồn tạm gián đoạn";
      $("quickInsight").textContent = item.insight;
      $("impactTags").innerHTML = item.impact.map(x => `<span class="md-impact-tag">${x}</span>`).join("");
      $("impactNote").textContent = item.note;
      $("feedSource").textContent = item.feed;
      $("originSource").textContent = item.origin;
      $("frequency").textContent = item.freq;
      $("updatedAt").textContent = "Chưa cập nhật";
      $("marketKpis").innerHTML = "";
      $("chartMessage").hidden = false;
      $("chartMessage").textContent = "Nguồn " + item.feed + " hiện không phản hồi hoặc trình duyệt chặn truy cập chéo miền. ChartLab không hiển thị dữ liệu giả. Hãy thử tải lại sau.";
      chart?.clear();
    }finally{
      chart?.hideLoading();
    }
  }

  $("marketSearch").addEventListener("input",renderList);
  window.addEventListener("resize",()=>chart?.resize());
  renderTabs(); renderList(); loadOverview(); loadIndicator(activeId);
})();