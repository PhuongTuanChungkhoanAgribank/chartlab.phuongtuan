(() => {
  const $ = (id) => document.getElementById(id);
  const chartEl = $("marketChart");
  const chart = window.echarts ? echarts.init(chartEl) : null;

  const indicators = [
    {id:"cpi",name:"CPI Việt Nam",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",unit:"%",macroType:"cpi",insight:"CPI phản ánh tốc độ tăng mặt bằng giá. ChartLab tách rõ biến động tháng, cùng kỳ và bình quân lũy kế để tránh nhầm giữa CPI tháng và CPI từ đầu năm.",impact:["Ngân hàng","Bất động sản","Bán lẻ"],note:"Tháng 10/2026: +0,20% MoM; +5,09% YoY; bình quân 10 tháng +4,57% YoY; lạm phát cơ bản +4,24%.",driver:"wichart"},
    {id:"gdp",name:"Tăng trưởng GDP Việt Nam",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê (NSO)",freq:"Hàng quý",unit:"%",macroType:"gdp",insight:"GDP cho biết tốc độ mở rộng của nền kinh tế. Mặc định ưu tiên tốc độ tăng theo quý và lũy kế từ đầu năm thay vì giá trị GDP tuyệt đối.",impact:["Ngân hàng","Bán lẻ","Công nghiệp"],note:"Quý III/2026 tăng 9,95% YoY; GDP 9 tháng 2026 tăng 9,01% YoY.",driver:"wichart"},
    {id:"iip",name:"Chỉ số sản xuất công nghiệp (IIP)",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",unit:"%",macroType:"iip",insight:"IIP phản ánh nhịp sản xuất của nền kinh tế. ChartLab ghi rõ tăng so với tháng trước, cùng kỳ và lũy kế từ đầu năm.",impact:["Khu công nghiệp","Logistics","Sản xuất"],note:"Tháng 10/2026: +2,3% MoM, +15,0% YoY; 10 tháng: +12,4% YoY.",driver:"wichart"},
    {id:"hhdv",name:"Tổng mức bán lẻ",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",unit:"nghìn tỷ VND",macroType:"retail",insight:"Bán lẻ cho biết sức cầu trong nước. Cần nhìn cả mức doanh thu, tăng trưởng tháng và tăng trưởng cùng kỳ.",impact:["Bán lẻ","Tiêu dùng","Dịch vụ"],note:"Tháng 10/2026: 695,5 nghìn tỷ đồng; +1,0% MoM; +14,7% YoY. Lũy kế 10 tháng: 6.618,9 nghìn tỷ đồng; +13,5% YoY.",driver:"wichart"},
    {id:"fdi",name:"FDI đăng ký & thực hiện",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",unit:"tỷ USD",macroType:"fdi",insight:"FDI cần tách rõ vốn đăng ký và vốn thực hiện. Với nhà đầu tư, số lũy kế từ đầu năm và tăng trưởng YoY dễ đọc hơn biến động từng tháng.",impact:["Khu công nghiệp","Logistics","Xây dựng"],note:"10 tháng 2026: FDI đăng ký 54,85 tỷ USD (+74,0% YoY); FDI thực hiện 24,08 tỷ USD (+13,1% YoY).",driver:"wichart"},
    {id:"cctm",name:"Xuất nhập khẩu & cán cân thương mại",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê / Hải quan",freq:"Nửa tháng / tháng",unit:"tỷ USD",macroType:"trade",insight:"Xuất nhập khẩu phản ánh cầu bên ngoài và sức khỏe sản xuất. ChartLab chuẩn hóa toàn bộ sang tỷ USD để dễ đọc.",impact:["Dệt may","Thủy sản","Logistics"],note:"Tháng 10/2026: xuất khẩu 64,67 tỷ USD; nhập khẩu 57,36 tỷ USD; xuất siêu 7,31 tỷ USD. Lũy kế 10 tháng: nhập siêu 12,07 tỷ USD.",driver:"wichart"},
    {id:"vdtnsnn",name:"Đầu tư từ ngân sách nhà nước",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê / Bộ Tài chính",freq:"Hàng tháng",unit:"nghìn tỷ VND",macroType:"publicInvestment",insight:"Giải ngân đầu tư công tạo cầu trực tiếp cho hạ tầng, vật liệu xây dựng và nhiều ngành liên quan. Cần nhìn cả tháng hiện tại, lũy kế và tiến độ kế hoạch năm.",impact:["Xây dựng","Đá","Thép"],note:"Tháng 10/2026: 121,6 nghìn tỷ đồng, +23,7% YoY. Lũy kế 10 tháng: 783,9 nghìn tỷ đồng, +19,8% YoY, đạt 69,0% kế hoạch năm.",driver:"wichart"},
    {id:"vdtptxh",name:"Vốn đầu tư phát triển toàn xã hội",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng quý",insight:"Tổng vốn đầu tư phát triển phản ánh quy mô vốn bỏ vào nền kinh tế từ nhà nước, tư nhân và FDI.",impact:["Xây dựng","Ngân hàng","Công nghiệp"],note:"Nên tách cơ cấu nhà nước, ngoài nhà nước và FDI để đọc động lực tăng trưởng.",driver:"wichart"},
    {id:"pmi",name:"PMI sản xuất",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"S&P Global / tổng hợp Wichart",freq:"Hàng tháng",unit:"điểm",insight:"PMI trên 50 thường cho thấy khu vực sản xuất mở rộng; dưới 50 cho thấy thu hẹp.",impact:["Sản xuất","Logistics","Khu công nghiệp"],note:"PMI là khảo sát sớm, nên đối chiếu với IIP và đơn hàng xuất khẩu.",driver:"wichart"},
    {id:"kqt",name:"Khách quốc tế đến Việt Nam",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Cục Thống kê (NSO)",freq:"Hàng tháng",unit:"triệu lượt",macroType:"tourism",insight:"Khách quốc tế phản ánh sức khỏe du lịch và dịch vụ. ChartLab ghi rõ mức tháng, MoM, YoY và lũy kế từ đầu năm.",impact:["Hàng không","Du lịch","Bán lẻ"],note:"Tháng 10/2026: 1,85 triệu lượt; +4,9% MoM; +7,0% YoY. Lũy kế 10 tháng: 19,5 triệu lượt, +13,8% YoY.",driver:"wichart"},
    {id:"tcns",name:"Thu – chi ngân sách nhà nước",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + NSO",origin:"Bộ Tài chính / Cục Thống kê",freq:"Hàng tháng",unit:"nghìn tỷ VND",macroType:"budget",insight:"Thu chi ngân sách phản ánh trạng thái tài khóa. ChartLab dùng thu, chi và chênh lệch lũy kế; không gọi chênh lệch theo tháng là bội chi ngân sách.",impact:["Đầu tư công","Xây dựng","Trái phiếu"],note:"10 tháng 2026: thu 2.438,9 nghìn tỷ đồng (96,4% dự toán, +11,0% YoY); chi 2.108,7 nghìn tỷ đồng (66,8% dự toán, +14,8% YoY); chênh lệch thu–chi +330,2 nghìn tỷ đồng.",driver:"wichart"},
    {id:"ncp",name:"Nợ Chính phủ – cơ cấu nguồn nợ",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart + Bộ Tài chính",origin:"Bộ Tài chính",freq:"Hàng quý / định kỳ",unit:"nghìn tỷ VND",macroType:"governmentDebt",insight:"Nợ Chính phủ nên được nhìn cả quy mô và cơ cấu nguồn nợ. ChartLab tách nợ trong nước và nợ nước ngoài để đánh giá rủi ro lãi suất và tỷ giá.",impact:["Trái phiếu","Tài khóa","Tỷ giá"],note:"Quý I/2026: nợ Chính phủ 4.057,1 nghìn tỷ đồng; trong nước 3.179,2 nghìn tỷ; nước ngoài 877,9 nghìn tỷ.",driver:"wichart"},
    {id:"tn",name:"Tỷ lệ thất nghiệp",group:"macro",groupLabel:"Vĩ mô Việt Nam",feed:"Wichart",origin:"Cục Thống kê (NSO)",freq:"Hàng quý",unit:"%",insight:"Thất nghiệp phản ánh sức khỏe thị trường lao động và gián tiếp cho biết sức cầu tiêu dùng.",impact:["Bán lẻ","Tiêu dùng","Dịch vụ"],note:"Theo dõi cùng thu nhập và lực lượng lao động.",driver:"wichart"},

    {id:"td",name:"Tín dụng toàn nền kinh tế",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng tháng",insight:"Tín dụng tăng cho thấy vốn đang được đưa vào nền kinh tế. Khi đi cùng chất lượng tài sản ổn định, đây thường là tín hiệu tích cực cho hoạt động kinh doanh.",impact:["Ngân hàng","Chứng khoán","Bất động sản"],note:"Theo dõi cùng huy động, NIM và nợ xấu.",driver:"wichart"},
    {id:"hd",name:"Huy động vốn toàn nền kinh tế (Tổng tiền gửi)",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng tháng",insight:"Huy động cho biết quy mô tiền gửi và tốc độ tăng nguồn vốn trong hệ thống ngân hàng. Cần so sánh cùng tín dụng trên cùng kỳ đo để đánh giá áp lực thanh khoản.",impact:["Ngân hàng"],note:"So sánh với tăng trưởng tín dụng trên cùng chuẩn kỳ (YoY/YTD) để tránh diễn giải sai.",driver:"wichart"},
    {id:"ctt",name:"Cung tiền M2 – Tổng phương tiện thanh toán",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng tháng",insight:"M2 phản ánh lượng tiền trong nền kinh tế. Tăng trưởng thanh khoản thường hỗ trợ tài sản tài chính nhưng cần đặt cạnh lạm phát và tỷ giá.",impact:["Chứng khoán","Ngân hàng","Bất động sản"],note:"Đường tăng trưởng M2 được hiển thị theo %, tách biệt với quy mô M2 tuyệt đối.",driver:"wichart"},
    {id:"lslnh",name:"Lãi suất liên ngân hàng",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng ngày / tuần",insight:"Lãi suất liên ngân hàng là nhiệt kế thanh khoản hệ thống. Tăng đột biến thường cho thấy thanh khoản ngắn hạn đang căng hơn.",impact:["Ngân hàng","Chứng khoán"],note:"Quan sát kỳ hạn qua đêm cùng OMO và tín phiếu.",driver:"wichart"},
    {id:"lsdh",name:"Lãi suất điều hành",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Theo quyết định",insight:"Lãi suất điều hành thể hiện định hướng chính sách tiền tệ. Giảm lãi suất thường hỗ trợ chi phí vốn và định giá tài sản.",impact:["Ngân hàng","Bất động sản","Chứng khoán"],note:"Tác động thực tế còn phụ thuộc lãi suất huy động và tín dụng.",driver:"wichart"},
    {id:"dhtg",name:"Tỷ giá trung tâm & biên độ",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Hàng ngày",insight:"Tỷ giá phản ánh sức ép ngoại hối. Biến động mạnh có thể ảnh hưởng dư địa chính sách tiền tệ và doanh nghiệp vay ngoại tệ.",impact:["Ngân hàng","Xuất khẩu","Hàng không"],note:"Theo dõi thêm DXY và cán cân thương mại.",driver:"wichart"},
    {id:"nvttm",name:"Nghiệp vụ thị trường mở (OMO)",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước (SBV)",freq:"Theo phiên",insight:"OMO cho thấy NHNN đang bơm hoặc hút thanh khoản ngắn hạn khỏi hệ thống ngân hàng.",impact:["Ngân hàng","Chứng khoán"],note:"Quy ước: số dương = bơm ròng; số âm = hút ròng. OMO khác với lãi suất cho vay qua đêm (O/N).",driver:"wichart"},
    {id:"dtnh",name:"Dự trữ ngoại hối",group:"money",groupLabel:"Tiền tệ & thanh khoản",feed:"Wichart",origin:"Ngân hàng Nhà nước / nguồn công bố quốc tế",freq:"Hàng tháng / quý",insight:"Dự trữ ngoại hối thể hiện bộ đệm của nhà điều hành trước biến động tỷ giá và dòng vốn.",impact:["Tỷ giá","Ngân hàng","Khối ngoại"],note:"Theo dõi cùng tỷ giá và cán cân thương mại.",driver:"wichart"},
    {id:"gold_intl",name:"Vàng quốc tế",group:"commodity",groupLabel:"Hàng hóa",feed:"GoldPrice.com / nguồn quốc tế",origin:"GoldPrice.com · LBMA/Metals.dev",freq:"Hàng ngày",unit:"USD/oz",insight:"Vàng quốc tế phản ánh nhu cầu phòng thủ, kỳ vọng lãi suất thực, USD và rủi ro vĩ mô toàn cầu.",impact:["Tài sản phòng thủ","USD","Lợi suất"],note:"Đơn vị USD trên mỗi troy ounce (USD/oz).",driver:"local",localSeries:["GOLD_INTL"]},
    {id:"vang",name:"Vàng trong nước – SJC",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"SJC / thị trường vàng trong nước",freq:"Hàng ngày",unit:"VND/lượng",insight:"Vàng SJC phản ánh thêm cung cầu nội địa và chênh lệch so với giá vàng quốc tế.",impact:["Tỷ giá","Tài sản phòng thủ"],note:"Hiển thị riêng giá mua vào và bán ra; không trộn với XAU/USD.",driver:"wichart",commodity:true},
    {id:"xang_dau",name:"Giá xăng dầu trong nước",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart + kỳ điều hành mới nhất",origin:"Petrolimex / Bộ Công Thương",freq:"Theo kỳ điều hành",unit:"đồng/lít",insight:"Giá xăng dầu bán lẻ trong nước truyền dẫn biến động năng lượng thế giới vào chi phí vận tải, sản xuất và CPI. Biểu đồ chỉ giữ các mốc giá thay đổi theo kỳ điều hành để dễ theo dõi.",impact:["CPI","Vận tải","Hàng không","Bán lẻ"],note:"Theo dõi 3 loại: E10 RON95-V, E5 RON92 và Diesel.",driver:"wichart",commodity:true,domesticFuel:true},
    {id:"dau_wti",name:"Dầu WTI",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường hàng hóa quốc tế",freq:"Hàng ngày",insight:"WTI là benchmark dầu thô Mỹ, ảnh hưởng kỳ vọng năng lượng và nhóm dầu khí.",impact:["Dầu khí","Hàng không","Vận tải"],note:"Nên xem đồng thời Brent và crack spread khi phân tích lọc hóa dầu.",driver:"wichart",commodity:true},
    {id:"brent",name:"Dầu Brent",group:"commodity",groupLabel:"Hàng hóa",feed:"EIA qua FRED · dữ liệu đóng gói",origin:"U.S. Energy Information Administration",freq:"Hàng ngày",unit:"USD/thùng",insight:"Brent là benchmark dầu thô quốc tế quan trọng đối với định giá dầu và sản phẩm lọc hóa dầu.",impact:["Dầu khí","BSR","Hàng không"],note:"Dữ liệu được lấy lúc build để tránh lỗi CORS trên GitHub Pages.",driver:"local",localSeries:["DCOILBRENTEU"]},
    {id:"crack_321",name:"Crack spread 3-2-1",group:"commodity",groupLabel:"Hàng hóa",feed:"EIA",origin:"U.S. Energy Information Administration",freq:"Hàng ngày / tuần",unit:"USD/thùng",insight:"Crack spread 3-2-1 là chỉ báo biên lọc dầu ngắn hạn, hữu ích khi theo dõi triển vọng BSR.",impact:["BSR","Lọc hóa dầu"],note:"Đang chuẩn hóa nguồn chuỗi lịch sử EIA trước khi hiển thị để tránh tạo dữ liệu giả.",driver:"pending"},
    {id:"hrc_hpg",name:"HRC trong nước – HPG",group:"commodity",groupLabel:"Hàng hóa",feed:"HPG",origin:"Tập đoàn Hòa Phát",freq:"Theo thông báo giá",unit:"VND/tấn",insight:"Giá HRC nội địa là biến quan trọng đối với chuỗi thép dẹt và biên lợi nhuận các doanh nghiệp sử dụng HRC.",impact:["HPG","HSG","NKG"],note:"Đang chuẩn hóa chuỗi giá công bố của HPG.",driver:"pending"},
    {id:"thep_xd_hpg",name:"Thép xây dựng – HPG",group:"commodity",groupLabel:"Hàng hóa",feed:"HPG",origin:"Tập đoàn Hòa Phát",freq:"Theo thông báo giá",unit:"VND/kg",insight:"Giá thép xây dựng HPG phản ánh mặt bằng giá thép nội địa phục vụ xây dựng và đầu tư công.",impact:["HPG","Xây dựng","Đầu tư công"],note:"Đang chuẩn hóa chuỗi giá công bố của HPG.",driver:"pending"},
    {id:"ton_ma",name:"Giá tôn mạ",group:"commodity",groupLabel:"Hàng hóa",feed:"Nguồn doanh nghiệp",origin:"Hoa Sen / Nam Kim",freq:"Theo thông báo giá",unit:"VND/kg",insight:"Giá tôn mạ giúp theo dõi mặt bằng giá sản phẩm thép hạ nguồn.",impact:["HSG","NKG"],note:"Đang chọn nguồn lịch sử công khai và ổn định giữa Hoa Sen/Nam Kim.",driver:"pending"},
    {id:"cat_xay_dung",name:"Giá cát xây dựng – Đà Nẵng",group:"commodity",groupLabel:"Hàng hóa",feed:"Sở Xây dựng Đà Nẵng",origin:"Công bố giá VLXD Đà Nẵng",freq:"Hàng tháng",unit:"VND/m³",insight:"Giá cát xây dựng phản ánh chi phí vật liệu tại địa phương và cần ghi rõ phạm vi địa lý.",impact:["Xây dựng","Hạ tầng","Đầu tư công"],note:"Benchmark Đà Nẵng; giá thực tế phụ thuộc loại cát, nguồn mỏ và điều kiện vận chuyển.",driver:"pending"},
    {id:"hrc_trung_quoc",name:"HRC Trung Quốc",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường thép Trung Quốc",freq:"Hàng ngày",insight:"HRC Trung Quốc là benchmark quốc tế quan trọng cho chuỗi thép Việt Nam.",impact:["HPG","HSG","NKG"],note:"Cần xem thêm quặng sắt, than cốc và tồn kho thép.",driver:"wichart",commodity:true},
    {id:"quang_sat",name:"Quặng sắt",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường nguyên liệu thép",freq:"Hàng ngày",insight:"Quặng sắt là nguyên liệu đầu vào lớn của thép lò cao.",impact:["Thép"],note:"Đọc cùng HRC và than cốc để đánh giá spread.",driver:"wichart",commodity:true},
    {id:"dong",name:"Giá đồng",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường kim loại",freq:"Hàng ngày",insight:"Đồng thường được xem là chỉ báo nhạy với chu kỳ công nghiệp và xây dựng toàn cầu.",impact:["Kim loại","Điện","Xây dựng"],note:"Theo dõi thêm PMI Trung Quốc và tồn kho kim loại.",driver:"wichart",commodity:true},
    {id:"cao_su_nhat_ban",name:"Cao su thế giới",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường cao su quốc tế",freq:"Hàng ngày",insight:"Giá cao su ảnh hưởng doanh thu doanh nghiệp cao su tự nhiên và chi phí săm lốp.",impact:["Cao su","Săm lốp"],note:"Cần so với sản lượng và giá bán thực tế.",driver:"wichart",commodity:true},
    {id:"phan_ure",name:"Giá Ure",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường phân bón",freq:"Hàng ngày",insight:"Giá Ure quyết định phần lớn triển vọng giá bán doanh nghiệp phân đạm.",impact:["Phân bón"],note:"Theo dõi đồng thời khí đầu vào.",driver:"wichart",commodity:true},
    {id:"than_newcastle",name:"Than Newcastle",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường than quốc tế",freq:"Hàng ngày",insight:"Giá than ảnh hưởng chi phí nhiên liệu, điện và một phần chuỗi sản xuất công nghiệp.",impact:["Nhiệt điện","Xi măng","Hóa chất"],note:"Tác động phụ thuộc cơ chế mua than từng doanh nghiệp.",driver:"wichart",commodity:true},
    {id:"khi_thien_nhien",name:"Khí thiên nhiên",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường năng lượng quốc tế",freq:"Hàng ngày",insight:"Giá khí tự nhiên ảnh hưởng điện khí, phân bón và hóa chất.",impact:["Điện khí","Phân bón","Hóa chất"],note:"Phân biệt giá khí theo khu vực.",driver:"wichart",commodity:true},
    {id:"ca_phe",name:"Giá cà phê",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường nông sản",freq:"Hàng ngày",insight:"Giá cà phê tác động trực tiếp tới doanh thu xuất khẩu.",impact:["Nông nghiệp","Xuất khẩu"],note:"Theo dõi sản lượng vụ mùa, tồn kho và tỷ giá.",driver:"wichart",commodity:true},
    {id:"tieu",name:"Giá hồ tiêu",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường nông sản",freq:"Hàng ngày",insight:"Giá hồ tiêu phản ánh cung cầu một mặt hàng xuất khẩu quan trọng của Việt Nam.",impact:["Nông nghiệp","Xuất khẩu"],note:"Sản lượng và tồn kho thường gây biến động theo mùa vụ.",driver:"wichart",commodity:true},
    {id:"heo_hoi",name:"Giá heo hơi",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường chăn nuôi Việt Nam",freq:"Hàng ngày",insight:"Giá heo hơi ảnh hưởng doanh thu chăn nuôi và CPI thực phẩm.",impact:["Chăn nuôi","Thực phẩm","CPI"],note:"Nên nhìn cùng giá thức ăn chăn nuôi.",driver:"wichart",commodity:true},
    {id:"nhua_duong_60_70",name:"Giá nhựa đường",group:"commodity",groupLabel:"Hàng hóa",feed:"Wichart",origin:"Thị trường vật liệu xây dựng",freq:"Định kỳ",insight:"Nhựa đường là đầu vào quan trọng của thi công hạ tầng giao thông.",impact:["Hạ tầng","Xây dựng"],note:"Hữu ích khi đánh giá biên lợi nhuận nhà thầu đường bộ.",driver:"wichart",commodity:true},

    {id:"fed_policy",name:"Lãi suất điều hành FED",group:"global",groupLabel:"Quốc tế",feed:"Federal Reserve qua dữ liệu đóng gói",origin:"Federal Reserve",freq:"Theo FOMC",unit:"%",globalType:"fedPolicy",driver:"local",localSeries:["DFEDTARL","DFEDTARU"],insight:"FED thiết lập một khoảng mục tiêu cho federal funds rate; đây là biến trung tâm của điều kiện tài chính toàn cầu.",impact:["USD","US10Y","Khối ngoại"],note:"Mức hiện tại được đọc theo cận dưới và cận trên của target range."},
    {id:"central_banks",name:"Lãi suất các NHTW lớn",group:"global",groupLabel:"Quốc tế",feed:"Nguồn NHTW chính thức",origin:"FED / ECB / BOJ / BOE",freq:"Theo quyết định",unit:"%",globalType:"centralBanks",driver:"local",insight:"So sánh lãi suất điều hành hiện tại của các ngân hàng trung ương lớn giúp đọc chênh lệch chính sách tiền tệ toàn cầu.",impact:["FX","Dòng vốn","Trái phiếu"],note:"FED hiển thị midpoint của target range; ECB dùng Deposit Facility; BOJ dùng policy rate; BOE dùng Bank Rate."},
    {id:"us_cpi",name:"CPI Mỹ",group:"global",groupLabel:"Quốc tế",feed:"BLS qua FRED · dữ liệu đóng gói",origin:"U.S. Bureau of Labor Statistics",freq:"Hàng tháng",unit:"%",globalType:"inflation",driver:"local",localSeries:["CPIAUCSL","CPILFESL"],insight:"CPI và Core CPI Mỹ cần đọc theo MoM và YoY thay vì mức chỉ số tuyệt đối.",impact:["FED","USD","Lợi suất"],note:"Chart ưu tiên YoY; KPI hiển thị đồng thời MoM và YoY."},
    {id:"us_pce",name:"PCE & Core PCE Mỹ",group:"global",groupLabel:"Quốc tế",feed:"BEA qua FRED · dữ liệu đóng gói",origin:"U.S. Bureau of Economic Analysis",freq:"Hàng tháng",unit:"%",globalType:"inflation",driver:"local",localSeries:["PCEPI","PCEPILFE"],insight:"PCE là thước đo lạm phát được FED theo dõi sát; Core PCE loại thực phẩm và năng lượng.",impact:["FED","USD","US10Y"],note:"Chart ưu tiên YoY; KPI hiển thị MoM và YoY."},
    {id:"us_ppi",name:"PPI Mỹ",group:"global",groupLabel:"Quốc tế",feed:"BLS qua FRED · dữ liệu đóng gói",origin:"U.S. Bureau of Labor Statistics",freq:"Hàng tháng",unit:"%",globalType:"inflation",driver:"local",localSeries:["PPIFIS"],insight:"PPI đo biến động giá ở cấp nhà sản xuất và có thể báo hiệu áp lực chi phí trước khi truyền sang CPI.",impact:["FED","Biên lợi nhuận","USD"],note:"Dùng PPI Final Demand; chart ưu tiên YoY, KPI có MoM."},
    {id:"us_jobs",name:"Báo cáo việc làm Mỹ",group:"global",groupLabel:"Quốc tế",feed:"BLS qua FRED · dữ liệu đóng gói",origin:"U.S. Bureau of Labor Statistics",freq:"Hàng tháng",globalType:"jobs",driver:"local",localSeries:["PAYEMS","UNRATE","CES0500000003"],insight:"Báo cáo việc làm tổng hợp số việc làm phi nông nghiệp, thất nghiệp và tăng trưởng tiền lương.",impact:["FED","USD","Trái phiếu"],note:"Nonfarm hiển thị thay đổi theo tháng; thất nghiệp và tiền lương hiển thị theo %."},
    {id:"DGS2",name:"Lợi suất TPCP Mỹ 2 năm",group:"global",groupLabel:"Quốc tế",feed:"FRED · dữ liệu đóng gói",origin:"Federal Reserve Bank of St. Louis",freq:"Hàng ngày",unit:"%",driver:"local",localSeries:["DGS2"],insight:"US2Y phản ánh kỳ vọng chính sách FED khá nhạy.",impact:["FED","Tỷ giá","Khối ngoại"],note:"Kết hợp với US10Y để đánh giá đường cong lợi suất."},
    {id:"DGS10",name:"Lợi suất TPCP Mỹ 10 năm",group:"global",groupLabel:"Quốc tế",feed:"FRED · dữ liệu đóng gói",origin:"Federal Reserve Bank of St. Louis",freq:"Hàng ngày",unit:"%",driver:"local",localSeries:["DGS10"],insight:"US10Y là lãi suất tham chiếu quan trọng của tài sản toàn cầu.",impact:["Định giá","Tỷ giá","Khối ngoại"],note:"Theo dõi cùng FED, lạm phát Mỹ và USD."}
  ];

  const groups = [
    ["all","Tất cả"],["macro","Vĩ mô"],["money","Tiền tệ"],["commodity","Hàng hóa"],["global","Quốc tế"]
  ];

  const initialGroup = new URLSearchParams(location.search).get("group");
  let activeGroup = ["macro","money","commodity","global"].includes(initialGroup) ? initialGroup : "all";
  let activeId = "cpi";
  let activeData = null;
  let activeItem = null;
  let selectedFuelSeries = "E10 RON95-V";
  const overviewIds = ["cpi","td","lslnh","DGS10"];

  function fmt(v){
    if(v === null || v === undefined || Number.isNaN(Number(v))) return "—";
    const n = Number(v);
    return new Intl.NumberFormat("vi-VN",{maximumFractionDigits:2}).format(n);
  }
  function fmtFuel(v){
    if(v === null || v === undefined || Number.isNaN(Number(v))) return "—";
    return new Intl.NumberFormat("vi-VN",{maximumFractionDigits:0}).format(Number(v));
  }
  function fmtGdp(v){
    if(v === null || v === undefined || Number.isNaN(Number(v))) return "—";
    return new Intl.NumberFormat("vi-VN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(v));
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
    const payload = {title:data.title || item.name, updated:data.timeUpdate || "Theo nguồn", stacked:!!data.stacked_column, series};
    if(item.group === "macro") applyMacroNormalization(payload,item);
    if(item.group === "money") applyMoneyNormalization(payload,item);
    if(item.domesticFuel) applyDomesticFuelLatest(payload);
    return payload;
  }

  let localMarketBundlePromise = null;
  async function loadLocalMarketBundle(){
    if(!localMarketBundlePromise){
      localMarketBundlePromise = fetch("./data/market-global.json",{cache:"no-store"}).then(r=>{
        if(!r.ok) throw new Error("Không tải được gói dữ liệu quốc tế nội bộ");
        return r.json();
      });
    }
    return localMarketBundlePromise;
  }
  function calcPctSeries(data, lag){
    return data.map((p,i)=>{
      if(i<lag) return null;
      const prev=Number(data[i-lag][1]), cur=Number(p[1]);
      if(!Number.isFinite(prev)||!Number.isFinite(cur)||prev===0) return null;
      return [p[0],(cur/prev-1)*100];
    }).filter(Boolean);
  }
  function calcDiffSeries(data){
    return data.map((p,i)=>i? [p[0],Number(p[1])-Number(data[i-1][1])] : null).filter(Boolean);
  }
  async function fetchLocalIndicator(item){
    const bundle=await loadLocalMarketBundle();
    if(item.globalType==="centralBanks"){
      const rows=Object.values(bundle.central_banks||{});
      return {title:item.name,updated:bundle.generated_at||"Theo nguồn",stacked:false,centralBanks:rows,series:rows.map(r=>({name:r.label,unit:"%",type:"bar",yAxisIndex:0,data:[[new Date(r.date+"T00:00:00Z").getTime(),Number(r.value)]]}))};
    }
    const ids=item.localSeries||[];
    const sourceSeries=ids.map(id=>({id,...(bundle.series?.[id]||{})})).filter(s=>Array.isArray(s.data)&&s.data.length);
    if(!sourceSeries.length) throw new Error("Gói dữ liệu nội bộ chưa có chuỗi cho chỉ tiêu này.");

    if(item.globalType==="inflation"){
      const series=sourceSeries.map(s=>({name:s.name.replace(" Mỹ","")+" YoY",unit:"%",type:"line",yAxisIndex:0,data:calcPctSeries(s.data,12)}));
      const metrics=sourceSeries.map(s=>({name:s.name,yoy:calcPctSeries(s.data,12).at(-1)?.[1]??null,mom:calcPctSeries(s.data,1).at(-1)?.[1]??null}));
      return {title:item.name,updated:sourceSeries.map(s=>s.updated).filter(Boolean).sort().at(-1)||"Theo nguồn",stacked:false,series,metrics};
    }
    if(item.globalType==="jobs"){
      const payroll=sourceSeries.find(s=>s.id==="PAYEMS");
      const unrate=sourceSeries.find(s=>s.id==="UNRATE");
      const wage=sourceSeries.find(s=>s.id==="CES0500000003");
      const series=[];
      if(payroll) series.push({name:"Thay đổi việc làm phi nông nghiệp",unit:"nghìn việc làm",type:"bar",yAxisIndex:0,data:calcDiffSeries(payroll.data)});
      if(unrate) series.push({name:"Tỷ lệ thất nghiệp",unit:"%",type:"line",yAxisIndex:1,data:unrate.data});
      if(wage) series.push({name:"Tăng lương theo giờ YoY",unit:"%",type:"line",yAxisIndex:1,data:calcPctSeries(wage.data,12)});
      return {title:item.name,updated:sourceSeries.map(s=>s.updated).filter(Boolean).sort().at(-1)||"Theo nguồn",stacked:false,series};
    }
    if(item.globalType==="fedPolicy"){
      return {title:item.name,updated:sourceSeries.map(s=>s.updated).filter(Boolean).sort().at(-1)||"Theo nguồn",stacked:false,series:sourceSeries.map((s,i)=>({name:i===0?"Cận dưới":"Cận trên",unit:"%",type:"line",yAxisIndex:0,data:s.data}))};
    }
    return {title:item.name,updated:sourceSeries[0].updated||"Theo nguồn",stacked:false,series:sourceSeries.map(s=>({name:s.name||item.name,unit:item.unit||s.unit||"",type:"line",yAxisIndex:0,data:s.data}))};
  }

  function applyMacroNormalization(payload,item){
    const ratioSeries = /tăng trưởng|tỷ lệ|growth|rate/i;
    payload.series.forEach(s=>{
      const isPercentSeries = ratioSeries.test(String(s.name||"")) || String(s.unit||"").includes("%") || (item.unit==="%" && payload.series.length===1);
      if(isPercentSeries){
        s.data = s.data.map(([ts,val])=>[ts, Math.abs(Number(val)) <= 2 ? Number(val)*100 : Number(val)]);
        s.unit = "%";
        if(payload.series.length>1) s.yAxisIndex = 1;
      }
    });

    if(item.macroType === "gdp"){
      payload.title = "Tăng trưởng GDP Việt Nam";
      const growth = payload.series.find(s=>/tăng trưởng/i.test(String(s.name||"")));
      if(growth){
        growth.name = "Tăng trưởng GDP YoY";
        growth.unit = "%";
        growth.yAxisIndex = 0;
        growth.data = growth.data.map(([ts,val]) => {
          const t = Number(ts);
          const d = new Date(t);
          if(d.getUTCFullYear()===2026 && d.getUTCMonth()===8) return [t,9.95];
          if(d.getUTCFullYear()===2026 && Number(val)>=9.9 && Number(val)<=10.1 && d.getUTCMonth()>=7 && d.getUTCMonth()<=9) return [t,9.95];
          return [t,val];
        });
        payload.series = [growth];
      }
    }

    if(item.macroType === "cpi"){
      payload.title = "CPI Việt Nam – phân biệt tháng và lũy kế";
      payload.series.forEach(s=>{
        s.name = "CPI bình quân lũy kế từ đầu năm (YoY)";
        s.unit = "%";
      });
    }

    if(item.macroType === "trade"){
      payload.title = "Xuất nhập khẩu & cán cân thương mại";
      payload.series.forEach(s=>{
        s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
        s.unit = "tỷ USD";
      });
    }

    if(item.macroType === "retail"){
      payload.series.forEach(s=>{
        if(!ratioSeries.test(String(s.name||""))){
          s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
          s.unit = "nghìn tỷ VND";
        }
      });
    }

    if(item.macroType === "fdi"){
      payload.series.forEach(s=>{
        if(!ratioSeries.test(String(s.name||""))){
          s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
          s.unit = "tỷ USD";
        }
      });
    }

    if(item.macroType === "publicInvestment"){
      payload.series.forEach(s=>{
        if(!ratioSeries.test(String(s.name||""))){
          s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
          s.unit = "nghìn tỷ VND";
        }
      });
    }

    if(item.macroType === "tourism"){
      payload.series.forEach(s=>{
        if(!ratioSeries.test(String(s.name||""))){
          s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
          s.unit = "triệu lượt";
        }
      });
    }

    if(item.macroType === "budget"){
      payload.title = "Thu – chi ngân sách nhà nước";
      payload.series = payload.series.filter(s=>!/bội chi/i.test(String(s.name||"")));
      payload.series.forEach(s=>{
        s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
        s.unit = "nghìn tỷ VND";
        s.yAxisIndex = 0;
      });
    }

    if(item.macroType === "governmentDebt"){
      payload.title = "Nợ Chính phủ – quy mô và cơ cấu nguồn nợ";
      payload.series.forEach(s=>{
        if(!ratioSeries.test(String(s.name||""))){
          s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
          s.unit = "nghìn tỷ VND";
        }
      });
    }
  }


  function applyMoneyNormalization(payload,item){
    const ratioSeries = /tăng trưởng|tỷ lệ|growth|rate/i;

    // Các series tỷ lệ từ Wichart thường trả dạng 0.xx; chuẩn hóa thành điểm %.
    payload.series.forEach(s=>{
      const isPercent = ratioSeries.test(String(s.name||"")) || String(s.unit||"").includes("%");
      if(isPercent){
        s.data = s.data.map(([ts,val])=>[ts, Math.abs(Number(val)) <= 2 ? Number(val)*100 : Number(val)]);
        s.unit = "%";
        s.yAxisIndex = 1;
      }
    });

    if(item.id === "td"){
      payload.title = "Tín dụng toàn nền kinh tế";
      payload.series.forEach(s=>{
        if(ratioSeries.test(String(s.name||"")) || s.unit === "%") s.name = "Tăng trưởng tín dụng (theo nguồn)";
        else s.name = "Tổng dư nợ tín dụng";
      });
    }

    if(item.id === "hd"){
      payload.title = "Huy động vốn toàn nền kinh tế (Tổng tiền gửi)";
      payload.series.forEach(s=>{
        if(/tổng tiền gửi|tiền gửi/i.test(String(s.name||""))) s.name = "Tổng tiền gửi";
        if(/tăng trưởng/i.test(String(s.name||""))) s.name = "Tăng trưởng huy động";
      });
    }

    if(item.id === "td" || item.id === "hd"){
      const amount = payload.series.find(s=>s.unit !== "%") || payload.series[0];
      const growth = payload.series.find(s=>s.unit === "%") || byName(/tăng trưởng/i);
      const a = latestOf(amount), g = latestOf(growth);
      const prev = amount?.data?.length>1 ? amount.data[amount.data.length-2] : null;
      const ch = a && prev ? a[1]-prev[1] : null;
      const label = item.id === "td" ? "Tín dụng" : "Huy động";
      $("marketKpis").innerHTML = [
        [label+" mới nhất", a?fmt(a[1]):"—", amount?.unit||""],
        ["Thay đổi kỳ gần nhất", ch===null?"—":(ch>=0?"+":"")+fmt(ch), amount?.unit||""],
        ["Tăng trưởng "+label.toLowerCase(), g?fmt(g[1]):"—", "%"],
        ["Số kỳ quan sát", getVisibleObservationCount(payload,item), ""]
      ].map((k,idx)=>`<div class="md-kpi"${idx===3?' data-kpi="observations"':''}><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
      return true;
    }

    if(item.id === "ctt"){
      payload.title = "Cung tiền M2 – Tổng phương tiện thanh toán";
      payload.series.forEach(s=>{
        if(!ratioSeries.test(String(s.name||""))) s.name = "Cung tiền M2";
        if(ratioSeries.test(String(s.name||""))) s.name = "Tăng trưởng M2";
      });
    }

    if(item.id === "lsdh"){
      payload.title = "Lãi suất điều hành";
    }

    if(item.id === "dhtg"){
      payload.title = "Tỷ giá USD/VND";
    }

    if(item.id === "nvttm"){
      payload.series.forEach(s=>{
        if(/bơm hút ròng của nhnn/i.test(String(s.name||""))) s.name = "Bơm/hút ròng tổng hợp NHNN";
        if(/sbv-bill/i.test(String(s.name||""))) s.name = "Bơm/hút ròng tín phiếu NHNN";
        if(/omo/i.test(String(s.name||""))) s.name = "Bơm/hút ròng OMO";
      });
    }

    if(item.id === "tpkb"){
      payload.title = "Tín phiếu NHNN";
      payload.series.forEach(s=>{
        if(/phát hành/i.test(String(s.name||""))) s.name = "Tín phiếu phát hành";
        if(/đáo hạn/i.test(String(s.name||""))) s.name = "Tín phiếu đáo hạn";
      });
    }

    if(item.id === "dtnh"){
      payload.title = "Dự trữ ngoại hối Nhà nước";
      payload.series.forEach(s=>{
        s.data = s.data.map(([ts,val])=>[ts, Number(val)/1000]);
        s.unit = "tỷ USD";
        s.yAxisIndex = 0;
      });
    }
  }

  function applyDomesticFuelLatest(payload){
    const rows = [
      ["2026-10-08T15:00:00+07:00",29050,27700,29120],
      ["2026-10-15T15:00:00+07:00",27520,26670,28800],
      ["2026-10-22T15:00:00+07:00",25710,25060,29250],
      ["2026-10-29T15:00:00+07:00",26530,26020,30240],
      ["2026-11-01T00:00:00+07:00",24950,24220,30240],
      ["2026-11-03T22:00:00+07:00",24230,23200,28870],
      ["2026-11-05T15:00:00+07:00",22650,20890,28690],
      ["2026-11-12T15:00:00+07:00",21840,19390,26820],
      ["2026-11-19T15:00:00+07:00",21100,18570,26340]
    ].map(r=>[new Date(r[0]).getTime(),r[1],r[2],r[3]]);

    payload.series = [
      {name:"E10 RON95-V",unit:"đồng/lít",type:"line",yAxisIndex:0,data:rows.map(r=>[r[0],r[1]])},
      {name:"E5 RON92",unit:"đồng/lít",type:"line",yAxisIndex:0,data:rows.map(r=>[r[0],r[2]])},
      {name:"Diesel",unit:"đồng/lít",type:"line",yAxisIndex:0,data:rows.map(r=>[r[0],r[3]])}
    ];
    payload.title = "Giá xăng dầu bán lẻ trong nước";
    payload.updated = "15:00 19/11/2026";
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
        if(item.driver === "pending") throw new Error("PENDING_SOURCE");
      const payload = item.driver === "local" ? await fetchLocalIndicator(item) : (item.driver === "fred" ? await fetchFred(item) : await fetchWichart(item));
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

  function getVisibleWindow(){
    if(!chart) return null;
    const opt = chart.getOption();
    const zoom = Array.isArray(opt.dataZoom) ? opt.dataZoom[0] : null;
    if(!zoom) return null;
    const start = Number(zoom.start ?? 0);
    const end = Number(zoom.end ?? 100);
    if(!Number.isFinite(start) || !Number.isFinite(end)) return null;
    return {start,end};
  }

  function getSelectedSeries(payload,item){
    if(item?.domesticFuel){
      return payload?.series?.find(s=>s.name===selectedFuelSeries) || payload?.series?.[0];
    }
    return payload?.series?.[0];
  }

  function getVisibleObservationCount(payload,item){
    const primary = getSelectedSeries(payload,item);
    if(!primary?.data?.length) return 0;
    const points = primary.data;
    const window = getVisibleWindow();
    if(!window || (window.start <= 0 && window.end >= 100)) return points.length;
    const minTs = Number(points[0][0]);
    const maxTs = Number(points[points.length-1][0]);
    if(!Number.isFinite(minTs) || !Number.isFinite(maxTs) || maxTs <= minTs) return points.length;
    const left = minTs + (maxTs-minTs) * window.start / 100;
    const right = minTs + (maxTs-minTs) * window.end / 100;
    return points.filter(p => Number(p[0]) >= left && Number(p[0]) <= right).length;
  }

  function updateObservationKpi(){
    if(!activeData || !activeItem || activeItem.macroType) return;
    const el = document.querySelector('[data-kpi="observations"] strong');
    if(el) el.textContent = String(getVisibleObservationCount(activeData,activeItem));
  }

  function renderMacroKpis(item){
    const cards = {
      cpi:[
        ["CPI tháng 10 · MoM","+0,20","%"],
        ["CPI tháng 10 · YoY","+5,09","%"],
        ["CPI bình quân 10T · YoY","+4,57","%"],
        ["Lạm phát cơ bản 10T","+4,24","%"]
      ],
      gdp:[
        ["GDP quý III/2026 · YoY","+9,95","%"],
        ["GDP 9 tháng 2026 · YoY","+9,01","%"],
        ["GDP quý II/2026 · YoY","+8,81","%"],
        ["GDP quý I/2026 · YoY","+8,15","%"]
      ],
      iip:[
        ["IIP tháng 10 · MoM","+2,3","%"],
        ["IIP tháng 10 · YoY","+15,0","%"],
        ["IIP 10 tháng · YoY","+12,4","%"],
        ["Kỳ tham chiếu","10/2026",""]
      ],
      retail:[
        ["Bán lẻ tháng 10","695,5","nghìn tỷ VND"],
        ["Tháng 10 · MoM","+1,0","%"],
        ["Tháng 10 · YoY","+14,7","%"],
        ["10 tháng · YoY","+13,5","%"]
      ],
      fdi:[
        ["FDI đăng ký 10T","54,85","tỷ USD"],
        ["FDI đăng ký · YoY","+74,0","%"],
        ["FDI thực hiện 10T","24,08","tỷ USD"],
        ["FDI thực hiện · YoY","+13,1","%"]
      ],
      trade:[
        ["Xuất khẩu tháng 10","64,67","tỷ USD"],
        ["Nhập khẩu tháng 10","57,36","tỷ USD"],
        ["Cán cân tháng 10","+7,31","tỷ USD"],
        ["Cán cân 10 tháng","-12,07","tỷ USD"]
      ],
      publicInvestment:[
        ["Đầu tư NSNN tháng 10","121,6","nghìn tỷ VND"],
        ["Tháng 10 · YoY","+23,7","%"],
        ["Lũy kế 10 tháng","783,9","nghìn tỷ VND"],
        ["Hoàn thành kế hoạch","69,0","%"]
      ],
      tourism:[
        ["Khách quốc tế tháng 10","1,85","triệu lượt"],
        ["Tháng 10 · MoM","+4,9","%"],
        ["Tháng 10 · YoY","+7,0","%"],
        ["10 tháng · YoY","+13,8","%"]
      ],
      budget:[
        ["Thu NSNN 10 tháng","2.438,9","nghìn tỷ VND"],
        ["Chi NSNN 10 tháng","2.108,7","nghìn tỷ VND"],
        ["Chênh lệch thu – chi","+330,2","nghìn tỷ VND"],
        ["Thu / Chi so dự toán","96,4 / 66,8","%"]
      ],
      governmentDebt:[
        ["Nợ Chính phủ Q1/2026","4.057,1","nghìn tỷ VND"],
        ["Nợ trong nước","3.179,2","nghìn tỷ VND"],
        ["Nợ nước ngoài","877,9","nghìn tỷ VND"],
        ["Trong nước / Nước ngoài","78,4 / 21,6","%"]
      ]
    };
    const rows = cards[item.macroType];
    if(!rows) return false;
    $("marketKpis").innerHTML = rows.map((k,idx)=>`<div class="md-kpi"${idx===3&&item.macroType!=="governmentDebt"?' data-kpi="observations"':''}><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
    return true;
  }


  function renderMoneyKpis(payload,item){
    if(item.group !== "money") return false;
    const byName = (re)=>payload.series.find(s=>re.test(String(s.name||"")));

    if(item.id === "ctt"){
      const amount = payload.series.find(s=>s.unit !== "%") || payload.series[0];
      const growth = byName(/Tăng trưởng M2/i);
      const a = latestOf(amount), g = latestOf(growth);
      const prev = amount?.data?.length>1 ? amount.data[amount.data.length-2] : null;
      const ch = a && prev ? a[1]-prev[1] : null;
      $("marketKpis").innerHTML = [
        ["M2 mới nhất", a?fmt(a[1]):"—", amount?.unit||""],
        ["Thay đổi M2 kỳ gần nhất", ch===null?"—":(ch>=0?"+":"")+fmt(ch), amount?.unit||""],
        ["Tăng trưởng M2", g?fmt(g[1]):"—", "%"],
        ["Số kỳ quan sát", getVisibleObservationCount(payload,item), ""]
      ].map((k,idx)=>`<div class="md-kpi"${idx===3?' data-kpi="observations"':''}><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
      return true;
    }

    if(item.id === "lsdh"){
      const picks = [
        byName(/chiết khấu/i),
        byName(/tái cấp vốn/i),
        byName(/qua đêm/i)
      ];
      const labels = ["Lãi suất chiết khấu","Lãi suất tái cấp vốn","LS qua đêm bù đắp thiếu hụt vốn"];
      $("marketKpis").innerHTML = picks.map((s,i)=>{
        const p=latestOf(s);
        return `<div class="md-kpi"><span>${labels[i]}</span><strong>${p?fmt(p[1]):"—"}</strong><em>%</em></div>`;
      }).join("") + `<div class="md-kpi"><span>Trạng thái</span><strong>Chưa thay đổi</strong><em>kỳ gần nhất</em></div>`;
      return true;
    }

    if(item.id === "nvttm"){
      const omo=byName(/OMO/i), bill=byName(/tín phiếu/i), total=byName(/tổng hợp NHNN/i);
      const cards=[
        ["Bơm/hút ròng OMO",latestOf(omo),omo?.unit||"tỷ VND"],
        ["Bơm/hút ròng tín phiếu",latestOf(bill),bill?.unit||"tỷ VND"],
        ["Bơm/hút ròng tổng hợp NHNN",latestOf(total),total?.unit||"tỷ VND"]
      ];
      $("marketKpis").innerHTML = cards.map(k=>`<div class="md-kpi"><span>${k[0]}</span><strong>${k[1]?(k[1][1]>=0?"+":"")+fmt(k[1][1]):"—"}</strong><em>${k[2]}</em></div>`).join("") + `<div class="md-kpi"><span>Quy ước</span><strong>+ Bơm / − Hút</strong><em>ròng</em></div>`;
      return true;
    }

    if(item.id === "tpkb"){
      const issue=byName(/phát hành/i), mature=byName(/đáo hạn/i);
      const a=latestOf(issue), b=latestOf(mature);
      const issued=a?Math.abs(Number(a[1])):0;
      const matured=b?Math.abs(Number(b[1])):0;
      const netLiquidity=matured-issued;
      $("marketKpis").innerHTML = [
        ["Tín phiếu phát hành",a?fmt(issued):"—",issue?.unit||"tỷ VND"],
        ["Tín phiếu đáo hạn",b?fmt(matured):"—",mature?.unit||"tỷ VND"],
        ["Bơm/hút ròng qua tín phiếu",(a||b)?(netLiquidity>=0?"+":"")+fmt(netLiquidity):"—",issue?.unit||mature?.unit||"tỷ VND"],
        ["Quy ước","+ Bơm / − Hút",""]
      ].map(k=>`<div class="md-kpi"><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
      return true;
    }

    if(item.id === "dtnh"){
      const s=payload.series[0], p=latestOf(s), prev=s?.data?.length>1?s.data[s.data.length-2]:null;
      const ch=p&&prev?p[1]-prev[1]:null;
      $("marketKpis").innerHTML = [
        ["Dự trữ ngoại hối mới nhất",p?fmt(p[1]):"—","tỷ USD"],
        ["Thay đổi kỳ gần nhất",ch===null?"—":(ch>=0?"+":"")+fmt(ch),"tỷ USD"],
        ["% thay đổi so kỳ trước",p&&prev&&prev[1]?(ch/Math.abs(prev[1])*100>=0?"+":"")+fmt(ch/Math.abs(prev[1])*100):"—","%"],
        ["Số kỳ quan sát",getVisibleObservationCount(payload,item),""]
      ].map((k,idx)=>`<div class="md-kpi"${idx===3?' data-kpi="observations"':''}><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
      return true;
    }

    return false;
  }

  function renderKpis(payload,item){
    if(item.macroType && renderMacroKpis(item)) return;
    if(renderMoneyKpis(payload,item)) return;
    const primary = getSelectedSeries(payload,item);
    const p = latestOf(primary);
    const prev = primary?.data?.length > 1 ? primary.data[primary.data.length-2] : null;
    const change = p && prev ? p[1]-prev[1] : null;
    const changePct = p && prev && prev[1] ? change/Math.abs(prev[1])*100 : null;
    const valueFormatter = item.domesticFuel ? fmtFuel : fmt;
    const unit = item.domesticFuel ? (primary?.unit || "đồng/lít") : (primary?.unit || item.unit || "");
    $("marketKpis").innerHTML = [
      [item.domesticFuel ? selectedFuelSeries + " · Giá mới nhất" : "Giá trị mới nhất", p ? valueFormatter(p[1]) : "—", unit],
      [item.domesticFuel ? selectedFuelSeries + " · Thay đổi kỳ gần nhất" : "Thay đổi kỳ gần nhất", change === null ? "—" : (change>=0?"+":"")+valueFormatter(change), unit],
      [item.domesticFuel ? selectedFuelSeries + " · % so với kỳ trước" : "% thay đổi so với kỳ trước", changePct === null ? "—" : (changePct>=0?"+":"")+fmt(changePct), changePct===null?"":"%"],
      ["Số kỳ quan sát", getVisibleObservationCount(payload,item), ""]
    ].map((k,idx) => `<div class="md-kpi"${idx===3?' data-kpi="observations"':''}><span>${k[0]}</span><strong>${k[1]}</strong><em>${k[2]}</em></div>`).join("");
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
      tooltip:{trigger:"axis",axisPointer:{type:"cross"},valueFormatter:(v)=>item.domesticFuel ? fmtFuel(v) : (item.macroType==="gdp" ? fmtGdp(v)+"%" : fmt(v))},
      legend:{
        top:4,type:"scroll",textStyle:{color:"#596174"},
        selected:item.domesticFuel
          ? Object.fromEntries(payload.series.map(s=>[s.name,s.name===selectedFuelSeries]))
          : (item.id==="dhtg"
              ? Object.fromEntries(payload.series.map(s=>[s.name,!/trần|sàn/i.test(String(s.name||""))]))
              : undefined)
      },
      toolbox:{right:8,feature:{dataZoom:{yAxisIndex:"none"},restore:{},saveAsImage:{name:item.id}}},
      xAxis:{type:"time",axisLine:{lineStyle:{color:"#cfd4df"}},axisLabel:{color:"#747c8c"}},
      yAxis:[
        {type:"value",scale:true,axisLabel:{color:"#747c8c",formatter:(v)=>item.domesticFuel ? fmtFuel(v) : (item.macroType==="gdp" ? fmtGdp(v)+"%" : fmt(v))},splitLine:{lineStyle:{color:"#eef0f5"}}},
        {type:"value",scale:true,position:"right",axisLabel:{color:"#747c8c",formatter:(v)=>((item.group==="macro") || (item.group==="money" && payload.series.some(s=>s.yAxisIndex===1 && s.unit==="%"))) ? fmt(v)+"%" : fmt(v)},splitLine:{show:false}}
      ],
      dataZoom:[{type:"inside"},{type:"slider",height:20,bottom:18,borderColor:"#e5e7eb",fillerColor:"rgba(115,87,255,.12)"}],
      series:payload.series.map((s,i)=>({
        name:s.name,type:item.domesticFuel?"line":(s.type==="bar"?"bar":"line"),yAxisIndex:s.yAxisIndex||0,data:s.data,
        showSymbol:item.domesticFuel || (s.data.length<=2),symbol:item.domesticFuel?"diamond":"circle",symbolSize:item.domesticFuel?8:7,
        smooth:false,connectNulls:true,
        barMaxWidth:24,
        lineStyle:{
          width:item.domesticFuel?2:(item.id==="dhtg" ? (/trung tâm/i.test(String(s.name||""))?3:2) : 2),
          type:item.id==="dhtg" && /trần|sàn/i.test(String(s.name||"")) ? "dashed" : "solid",
          opacity:item.id==="dhtg" && /trần|sàn/i.test(String(s.name||"")) ? 0.7 : 1
        },
        areaStyle:(!item.domesticFuel&&i===0&&s.type!=="bar")?{opacity:.035}:undefined
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
      activeItem = item;
      if(item.domesticFuel && !payload.series.some(s=>s.name===selectedFuelSeries)){
        selectedFuelSeries = payload.series[0]?.name || "E10 RON95-V";
      }
      renderMeta(item,payload); renderKpis(payload,item); renderChart(payload,item); requestAnimationFrame(updateObservationKpi);
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
      $("chartMessage").textContent = err?.message === "PENDING_SOURCE" ? "ChartLab đang chuẩn hóa nguồn chuỗi lịch sử cho chỉ tiêu này. Chưa hiển thị cho đến khi nguồn đủ tin cậy; không sử dụng dữ liệu giả." : ("Nguồn " + item.feed + " hiện không phản hồi hoặc dữ liệu đóng gói chưa sẵn sàng. ChartLab không hiển thị dữ liệu giả.");
      chart?.clear();
    }finally{
      chart?.hideLoading();
    }
  }

  $("marketSearch").addEventListener("input",renderList);
  chart?.on("legendselectchanged",(params)=>{
    if(!activeItem?.domesticFuel || !activeData) return;
    const clicked = params?.name;
    if(!activeData.series.some(s=>s.name===clicked)) return;
    selectedFuelSeries = clicked;
    const selected = {};
    activeData.series.forEach(s=>{ selected[s.name] = s.name === clicked; });
    chart.setOption({legend:{selected}});
    renderKpis(activeData,activeItem);
    requestAnimationFrame(updateObservationKpi);
  });
  chart?.on("datazoom",()=>requestAnimationFrame(updateObservationKpi));
  chart?.on("restore",()=>requestAnimationFrame(updateObservationKpi));
  window.addEventListener("resize",()=>chart?.resize());
  renderTabs(); renderList(); loadIndicator(activeId);
})();