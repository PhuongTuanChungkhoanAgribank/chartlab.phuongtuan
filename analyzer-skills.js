/* chartlab.phuongtuan — Analyzer Skills v1
 * Skill-oriented workflow adapted to ChartLab's technical-analysis-only scope.
 */
(function applyAnalyzerSkills(){
  const SKILLS = [
    {id:'overview', label:'Phân tích toàn diện', icon:'◎', hint:'Cấu trúc · vùng giá · mẫu hình · khối lượng · Wyckoff'},
    {id:'quick', label:'Đọc nhanh chart', icon:'⚡', hint:'Tóm tắt nhanh những gì đáng chú ý nhất'},
    {id:'structure', label:'Cấu trúc giá', icon:'〽', hint:'Đỉnh/đáy · xu hướng · thay đổi cấu trúc'},
    {id:'levels', label:'Hỗ trợ & kháng cự', icon:'◉', hint:'Vùng giá quan trọng · phản ứng · phá vỡ'},
    {id:'pattern', label:'Mẫu hình kỹ thuật', icon:'◇', hint:'Nến · hành vi giá · mẫu hình giá'},
    {id:'volume', label:'Giá & khối lượng', icon:'▦', hint:'Xác nhận · phân kỳ · nỗ lực/kết quả'},
    {id:'wyckoff', label:'Wyckoff', icon:'W', hint:'Vùng đi ngang · giai đoạn · sự kiện nếu đủ dữ liệu'},
    {id:'breakout', label:'Kiểm tra Breakout', icon:'↗', hint:'Mức phá vỡ · khối lượng · kiểm định lại · thất bại'}
  ];
  const QUICK_REQUESTS = [
    'Tập trung vào diễn biến 10–20 nến gần nhất.',
    'Chỉ nêu các nhận định có độ tin cậy đủ tốt.',
    'Ưu tiên các vùng giá cần theo dõi trong ngắn hạn.',
    'Giải thích ngắn gọn để tư vấn viên mới dễ sử dụng.'
  ];
  const skillById = id => SKILLS.find(x=>x.id===id) || SKILLS[0];
  const a = state.analyzer;
  if (!a.skill) a.skill = localStorage.getItem('chartlab_analyzer_skill_v1') || 'overview';
  if (typeof a.customRequest !== 'string') a.customRequest = '';

  const previousAnalyzerPage = analyzerPage;
  analyzerPage = function analyzerPageSkills(){
    let html = previousAnalyzerPage();
    const current = skillById(state.analyzer.skill);
    const skills = `<section class="analyzer-skill-box">
      <div class="skill-box-head"><div><span>KỸ NĂNG PHÂN TÍCH</span><h3>Bạn muốn hệ thống tập trung vào phần nào?</h3></div><small>Mỗi lần nên chọn 1 mục tiêu chính để giảm phân tích lan man.</small></div>
      <div class="skill-grid">${SKILLS.map(s=>`<button type="button" data-analysis-skill="${s.id}" class="skill-card ${current.id===s.id?'active':''}"><i>${s.icon}</i><span><b>${s.label}</b><small>${s.hint}</small></span></button>`).join('')}</div>
      <label class="analysis-request"><span>Yêu cầu bổ sung <small>· không bắt buộc</small></span><textarea id="analysis-custom-request" rows="2" maxlength="300" placeholder="Ví dụ: tập trung vùng hỗ trợ gần nhất, bỏ qua chỉ báo...">${escText(state.analyzer.customRequest||'')}</textarea></label>
      <div class="request-chips">${QUICK_REQUESTS.map((x,i)=>`<button type="button" data-request-chip="${i}">${escText(x)}</button>`).join('')}</div>
    </section>`;
    html = html.replace('<div class="chart-photo-tips">', skills + '<div class="chart-photo-tips">');
    html = html.replace(/(<button class="primary full" id="analyze-button"[^>]*>)[\s\S]*?(<\/button>)/, `$1Phân tích · ${escText(current.label)} ${arrow()}$2`);
    return html;
  };

  const previousAnalysisResult = analysisResult;
  analysisResult = function analysisResultSkills(r){
    const meta = r?.analysisMeta || {};
    const skill = skillById(meta.skill || state.analyzer.skill);
    const filtered = {...r, sections: filterSections(r.sections || [], skill.id)};
    let html = previousAnalysisResult(filtered);
    const when = meta.analyzedAt ? formatAnalysisTime(meta.analyzedAt) : '—';
    const request = meta.customRequest ? `<span><b>Yêu cầu thêm</b>${escText(meta.customRequest)}</span>` : '';
    const strip = `<div class="analysis-meta-strip"><span><b>Mã</b>${escText(r.symbol||'—')}</span><span><b>Khung</b>${escText(r.timeframe||'—')}</span><span><b>Kỹ năng</b>${escText(skill.label)}</span><span><b>Thời điểm</b>${escText(when)}</span>${request}</div>`;
    return html.replace('<div class="analysis-output">','<div class="analysis-output">'+strip);
  };

  const previousClientResult = clientResult;
  clientResult = function clientResultSkills(r){
    let html = previousClientResult(r);
    const skill = skillById(r?.analysisMeta?.skill || state.analyzer.skill);
    return html.replace('<div class="client-title">', `<div class="client-skill-tag">${escText(skill.label)}</div><div class="client-title">`);
  };

  const previousBindAnalyzer = bindAnalyzer;
  bindAnalyzer = function bindAnalyzerSkills(){
    previousBindAnalyzer();
    document.querySelectorAll('[data-analysis-skill]').forEach(btn=>btn.addEventListener('click',()=>{
      const next = btn.dataset.analysisSkill || 'overview';
      if (state.analyzer.skill === next) return;
      state.analyzer.skill = next;
      localStorage.setItem('chartlab_analyzer_skill_v1', next);
      state.analyzer.result = null;
      state.analyzer.historyId = '';
      state.analyzer.error = '';
      render();
    }));
    const req = document.getElementById('analysis-custom-request');
    if(req) req.addEventListener('input',e=>{ state.analyzer.customRequest = String(e.target.value||'').slice(0,300); });
    document.querySelectorAll('[data-request-chip]').forEach(btn=>btn.addEventListener('click',()=>{
      const text = QUICK_REQUESTS[Number(btn.dataset.requestChip)] || '';
      state.analyzer.customRequest = text;
      const ta = document.getElementById('analysis-custom-request');
      if(ta) ta.value = text;
    }));
  };

  const previousLoadHistoryIntoAnalyzer = loadHistoryIntoAnalyzer;
  loadHistoryIntoAnalyzer = async function loadHistorySkills(id, rerun=false){
    const item = state.history.find(x=>x.id===id);
    const meta = item?.result?.analysisMeta || {};
    if(meta.skill) state.analyzer.skill = meta.skill;
    state.analyzer.customRequest = meta.customRequest || '';
    return previousLoadHistoryIntoAnalyzer(id, rerun);
  };

  runAnalyzer = async function runAnalyzerSkills(){
    const a=state.analyzer;
    if(!a.file||a.loading)return;
    a.loading=true;a.error='';a.result=null;a.tab='analysis';render();
    try{
      const symbol=(a.symbol||'CỔ PHIẾU').toUpperCase();
      const skill=skillById(a.skill).id;
      const customRequest=String(a.customRequest||'').trim().slice(0,300);
      if(API_ENDPOINT){
        const imageDataUrl=await fileToOptimizedDataUrl(a.file);
        const body=JSON.stringify({imageDataUrl,symbol,timeframe:a.timeframe,skill,customRequest});
        const callBackend=async(accessCode='')=>{
          const headers={'Content-Type':'application/json'};
          if(accessCode)headers['X-ChartLab-Access']=accessCode;
          const response=await fetch(API_ENDPOINT,{method:'POST',headers,body});
          const data=await response.json().catch(()=>({}));
          return {response,data};
        };
        let accessCode=localStorage.getItem(AI_ACCESS_STORAGE_KEY)||'';
        let {response,data}=await callBackend(accessCode);
        if(response.status===401&&data?.code==='ACCESS_REQUIRED'){
          const entered=window.prompt('Nhập mã truy cập AI ChartLab. Mã này được lưu trên thiết bị để dùng cho các lần sau.');
          if(!entered)throw new Error('Chưa nhập mã truy cập AI.');
          accessCode=String(entered).trim();
          localStorage.setItem(AI_ACCESS_STORAGE_KEY,accessCode);
          ({response,data}=await callBackend(accessCode));
          if(response.status===401&&data?.code==='ACCESS_REQUIRED'){
            localStorage.removeItem(AI_ACCESS_STORAGE_KEY);
            throw new Error('Mã truy cập AI chưa đúng. Hãy thử lại.');
          }
        }
        if(!response.ok||!data.ok)throw new Error(data.detail||data.error||`Backend error ${response.status}`);
        a.result=normalizeApiResult(data.result,symbol,a.timeframe);
        a.result.analysisMeta = {
          skill: data?.result?.analysisMeta?.skill || skill,
          skillLabel: data?.result?.analysisMeta?.skillLabel || skillById(skill).label,
          customRequest: data?.result?.analysisMeta?.customRequest || customRequest,
          analyzedAt: data?.result?.analysisMeta?.analyzedAt || new Date().toISOString(),
          engineVersion: data?.engineVersion || ''
        };
      }else if(config.allowDemoFallback!==false){
        await new Promise(r=>setTimeout(r,350));
        a.result=demoResult(symbol,a.timeframe);
        a.result.analysisMeta={skill,skillLabel:skillById(skill).label,customRequest,analyzedAt:new Date().toISOString(),engineVersion:'demo'};
      }else{
        throw new Error('Chưa cấu hình AI backend trong config.js.');
      }
      a.clientShort=a.result.clientShort;a.clientText=a.result.clientText;a.clientMode='short';a.editing=false;
      await saveCurrentAnalysisToHistory(false);
    }catch(error){
      a.error=error?.message||'Không xác định được lỗi.';
    }finally{
      a.loading=false;render();
    }
  };

  function filterSections(sections, skill){
    const allow = {
      overview:null,
      quick:['MARKET STRUCTURE','KEY LEVELS','VOLUME'],
      structure:['MARKET STRUCTURE','KEY LEVELS'],
      levels:['MARKET STRUCTURE','KEY LEVELS'],
      pattern:['MARKET STRUCTURE','CANDLESTICK','PRICE ACTION','CHART PATTERN'],
      volume:['MARKET STRUCTURE','KEY LEVELS','VOLUME'],
      wyckoff:['MARKET STRUCTURE','KEY LEVELS','VOLUME','WYCKOFF'],
      breakout:['MARKET STRUCTURE','KEY LEVELS','PRICE ACTION','CHART PATTERN','VOLUME']
    }[skill];
    return allow ? sections.filter(x=>allow.includes(x.title)) : sections;
  }

  function formatAnalysisTime(value){
    try{return new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value));}catch{return String(value||'');}
  }
})();