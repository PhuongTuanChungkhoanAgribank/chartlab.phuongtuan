#!/usr/bin/env python3
import csv, io, json, os, urllib.request
from datetime import datetime, timezone

OUT = "_site/data/market-global.json"
SERIES = {
  "DGS2":{"unit":"%","name":"Lợi suất TPCP Mỹ 2 năm"},
  "DGS10":{"unit":"%","name":"Lợi suất TPCP Mỹ 10 năm"},
  "DFEDTARL":{"unit":"%","name":"Cận dưới Fed Funds"},
  "DFEDTARU":{"unit":"%","name":"Cận trên Fed Funds"},
  "CPIAUCSL":{"unit":"index","name":"CPI Mỹ"},
  "CPILFESL":{"unit":"index","name":"CPI lõi Mỹ"},
  "PCEPI":{"unit":"index","name":"PCE Mỹ"},
  "PCEPILFE":{"unit":"index","name":"Core PCE Mỹ"},
  "PPIFIS":{"unit":"index","name":"PPI Mỹ"},
  "PAYEMS":{"unit":"nghìn người","name":"Việc làm phi nông nghiệp"},
  "UNRATE":{"unit":"%","name":"Tỷ lệ thất nghiệp"},
  "CES0500000003":{"unit":"USD/giờ","name":"Thu nhập bình quân theo giờ"},
  "DCOILBRENTEU":{"unit":"USD/thùng","name":"Dầu Brent"},
  "GOLDAMGBD228NLBM":{"unit":"USD/oz","name":"Vàng quốc tế"}
}
def fetch_fred(series_id):
    url=f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}&cosd=2019-01-01"
    req=urllib.request.Request(url,headers={"User-Agent":"ChartLab/1.0"})
    with urllib.request.urlopen(req,timeout=25) as r:
        txt=r.read().decode("utf-8","replace")
    rows=[]
    for row in csv.reader(io.StringIO(txt)):
        if not row or row[0]=="DATE": continue
        try:
            dt=datetime.strptime(row[0],"%Y-%m-%d").replace(tzinfo=timezone.utc)
            v=float(row[1])
        except Exception:
            continue
        rows.append([int(dt.timestamp()*1000),v])
    return rows

payload={"generated_at":datetime.now(timezone.utc).isoformat(),"series":{},"central_banks":{
  "FED":{"label":"FED","value":3.875,"display":"3,75–4,00%","date":"2026-10-29","source":"Federal Reserve"},
  "ECB":{"label":"ECB","value":2.50,"display":"2,50%","date":"2026-09-16","source":"ECB · Deposit facility"},
  "BOJ":{"label":"BOJ","value":1.25,"display":"1,25%","date":"2026-09-24","source":"Bank of Japan"},
  "BOE":{"label":"BOE","value":4.00,"display":"4,00%","date":"2026-11-05","source":"Bank of England"}
}}
for sid,meta in SERIES.items():
    try:
        data=fetch_fred(sid)
        if data:
            payload["series"][sid]={**meta,"data":data,"updated":datetime.fromtimestamp(data[-1][0]/1000,timezone.utc).strftime("%Y-%m-%d")}
    except Exception as e:
        payload["series"][sid]={**meta,"data":[],"error":str(e)}

os.makedirs(os.path.dirname(OUT),exist_ok=True)
with open(OUT,"w",encoding="utf-8") as f:
    json.dump(payload,f,ensure_ascii=False,separators=(",",":"))
print("Wrote",OUT,"series",sum(bool(v.get("data")) for v in payload["series"].values()))
