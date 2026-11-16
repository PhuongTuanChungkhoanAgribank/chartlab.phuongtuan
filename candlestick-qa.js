/* ChartLab — lightweight runtime QA for candlestick curriculum */
(function(){
  function run(){
    const list=window.CHARTLAB_PATTERNS||window.patterns||[];
    const required=['id','name','viName','candles','bias','signalType','formation','context'];
    const ids=new Set(), dupIds=[], missing=[];
    for(const p of list){
      if(ids.has(p.id)) dupIds.push(p.id); else ids.add(p.id);
      const miss=required.filter(k=>p[k]===undefined||p[k]===null||String(p[k]).trim()==='');
      if(miss.length) missing.push({id:p.id,name:p.name,fields:miss});
    }
    const notes=window.CHARTLAB_CURATED_LESSON_NOTES||{};
    const bespoke=new Set([
      'Hammer','Hanging Man','Inverted Hammer','Shooting Star','Doji',
      'Dragonfly Doji','Gravestone Doji','Long-Legged Doji','Spinning Top','Marubozu',
      'Belt-hold','Closing Marubozu','High-Wave Candle','Long Line Candle','Short Line Candle',
      'Takuri','Rickshaw Man'
    ]);
    const uncovered=list.filter(p=>!bespoke.has(p.name)&&!notes[p.name]).map(p=>({id:p.id,name:p.name}));
    const defs=window.CHARTLAB_CURATED_COMPARE_DEFS||[];
    const unresolvedPairs=defs.filter(d=>!d.names.every(n=>list.some(p=>p.name===n))).map(d=>d.names);
    const byCandles=list.reduce((a,p)=>{a[p.candles]=(a[p.candles]||0)+1;return a;},{});
    const app=document.getElementById('app');
    const isLesson=location.hash==='#/level/1'||location.hash.startsWith('#/pattern/');
    const sectionCount=isLesson&&app?app.querySelectorAll('.lesson-block').length:null;
    const technicalTerms=['geometry','prior trend','context','follow-through','confidence','candidate','reversal','continuation','breakout','invalidation','bullish','bearish'];
    const visibleText=app?(app.innerText||'').toLowerCase():'';
    const englishTechnicalTerms=isLesson?technicalTerms.filter(t=>visibleText.includes(t)):[];
    const sixSectionsOk=!isLesson||sectionCount===6;
    const vietnameseTermsOk=!isLesson||englishTechnicalTerms.length===0;
    const report={
      ok:list.length===61&&dupIds.length===0&&missing.length===0&&uncovered.length===0&&unresolvedPairs.length===0&&sixSectionsOk&&vietnameseTermsOk,
      total:list.length,
      byCandles,
      duplicateIds:dupIds,
      missingFields:missing,
      uncoveredLessons:uncovered,
      comparePairsResolved:defs.length-unresolvedPairs.length,
      comparePairsTotal:defs.length,
      unresolvedPairs,
      currentLesson:isLesson?location.hash:null,
      sectionCount,
      sixSectionsOk,
      englishTechnicalTerms,
      vietnameseTermsOk
    };
    window.CHARTLAB_QA=report;
    const fn=report.ok?'info':'warn';
    console[fn]('[ChartLab QA]',report);
    document.documentElement.dataset.chartlabQa=report.ok?'pass':'warn';
    return report;
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(run,50));
  window.addEventListener('hashchange',()=>setTimeout(run,80));
  window.addEventListener('load',()=>setTimeout(run,0));
  setTimeout(run,0);
  window.CHARTLAB_RUN_QA=run;
})();
