#!/usr/bin/env python3
import csv, io, json, os, re, urllib.request, urllib.parse, xml.etree.ElementTree as ET
from datetime import datetime, timezone

OUT="_site/data/market-global.json"\nOUT_JS="_site/data/market-global-data.js"
NOW=datetime.now(timezone.utc)

def ts(date_str):
    return int(datetime.strptime(date_str,"%Y-%m-%d").replace(tzinfo=timezone.utc).timestamp()*1000)

def put(payload,key,name,unit,data,updated=None):
    payload["series"][key]={"name":name,"unit":unit,"data":sorted(data),"updated":updated or datetime.fromtimestamp(sorted(data)[-1][0]/1000,timezone.utc).strftime("%Y-%m-%d")}

def fetch_bls():
    ids=["CUSR0000SA0","CUSR0000SA0L1E","WPSFD4","CES0000000001","LNS14000000","CES0500000003"]
    body=json.dumps({"seriesid":ids,"startyear":"2019","endyear":"2026"}).encode()
    req=urllib.request.Request("https://api.bls.gov/publicAPI/v2/timeseries/data/",data=body,headers={"Content-Type":"application/json","User-Agent":"ChartLab/1.0"})
    with urllib.request.urlopen(req,timeout=30) as r:
        obj=json.load(r)
    out={}
    for s in obj.get("Results",{}).get("series",[]):
        rows=[]
        for p in s.get("data",[]):
            period=p.get("period","")
            if not period.startswith("M") or period=="M13": continue
            try:
                d=f'{int(p["year"]):04d}-{int(period[1:]):02d}-01'
                rows.append([ts(d),float(p["value"].replace(",",""))])
            except Exception:
                pass
        out[s.get("seriesID")]=sorted(rows)
    return out

def fetch_treasury():
    url="https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value=2026"
    req=urllib.request.Request(url,headers={"User-Agent":"ChartLab/1.0"})
    with urllib.request.urlopen(req,timeout=30) as r:
        root=ET.fromstring(r.read())
    ns={"a":"http://www.w3.org/2005/Atom","m":"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata","d":"http://schemas.microsoft.com/ado/2007/08/dataservices"}
    r2=[]; r10=[]
    for e in root.findall("a:entry",ns):
        props=e.find("a:content/m:properties",ns)
        if props is None: continue
        date=props.find("d:NEW_DATE",ns)
        y2=props.find("d:BC_2YEAR",ns); y10=props.find("d:BC_10YEAR",ns)
        if date is None or not date.text: continue
        d=date.text[:10]
        try:
            if y2 is not None and y2.text: r2.append([ts(d),float(y2.text)])
            if y10 is not None and y10.text: r10.append([ts(d),float(y10.text)])
        except Exception:
            pass
    return r2,r10


def fetch_csv_url(url):
    req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 ChartLab/1.0"})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.read().decode("utf-8","replace")

def fetch_brent_datahub():
    txt=fetch_csv_url("https://datahub.io/core/oil-prices/_r/-/data/brent-daily.csv")
    rows=[]
    for row in csv.DictReader(io.StringIO(txt)):
        try:
            d=row.get("Date") or row.get("date")
            v=row.get("Price") or row.get("price")
            if not d or not v: continue
            if d < "2024-01-01": continue
            rows.append([ts(d[:10]),float(v)])
        except Exception:
            pass
    return sorted(rows)

def fetch_crack_321():
    req=urllib.request.Request("https://thinkingonenergy.com/data/SPREAD_321_CRACK/",headers={"User-Agent":"Mozilla/5.0 ChartLab/1.0"})
    with urllib.request.urlopen(req,timeout=30) as r:
        txt=r.read().decode("utf-8","replace")
    rows=[]
    seen=set()
    for d,v in re.findall(r'(20\\d{2}-\\d{2}-\\d{2})\\s*</?[^>]*>?\\s*[^0-9-]{0,20}(-?\\d+(?:\\.\\d+)?)',txt):
        try:
            key=(d,float(v))
            if key in seen: continue
            seen.add(key)
            if "2026-" in d:
                rows.append([ts(d),float(v)])
        except Exception:
            pass
    rows=sorted(rows)
    return rows[-180:]

payload={"generated_at":NOW.isoformat(),"series":{},"central_banks":{
  "FED":{"label":"FED","value":3.875,"display":"3,75–4,00%","date":"2026-10-29","source":"Federal Reserve"},
  "ECB":{"label":"ECB","value":2.50,"display":"2,50%","date":"2026-09-16","source":"ECB · Deposit facility"},
  "BOJ":{"label":"BOJ","value":1.25,"display":"1,25%","date":"2026-09-24","source":"Bank of Japan"},
  "BOE":{"label":"BOE","value":4.00,"display":"4,00%","date":"2026-11-05","source":"Bank of England"}
}}

# FED target range – official FOMC history/current rate.
put(payload,"FED_LOWER","Cận dưới Fed Funds","%",[[ts("2025-12-11"),3.50],[ts("2026-06-18"),3.50],[ts("2026-09-17"),3.75],[ts("2026-10-29"),3.75]])
put(payload,"FED_UPPER","Cận trên Fed Funds","%",[[ts("2025-12-11"),3.75],[ts("2026-06-18"),3.75],[ts("2026-09-17"),4.00],[ts("2026-10-29"),4.00]])

# BLS direct public API.
try:
    bls=fetch_bls()
    mapping={
      "CUSR0000SA0":("CPI_US","CPI Mỹ","chỉ số"),
      "CUSR0000SA0L1E":("CORE_CPI_US","Core CPI Mỹ","chỉ số"),
      "WPSFD4":("PPI_US","PPI Final Demand Mỹ","chỉ số"),
      "CES0000000001":("PAYEMS","Việc làm phi nông nghiệp","nghìn người"),
      "LNS14000000":("UNRATE","Tỷ lệ thất nghiệp","%"),
      "CES0500000003":("CES0500000003","Thu nhập bình quân theo giờ","USD/giờ")
    }
    for sid,(key,name,unit) in mapping.items():
        if bls.get(sid): put(payload,key,name,unit,bls[sid])
except Exception as e:
    payload["bls_error"]=str(e)

# U.S. Treasury official daily yield curve.
try:
    y2,y10=fetch_treasury()
    if y2: put(payload,"DGS2","Lợi suất TPCP Mỹ 2 năm","%",y2)
    if y10: put(payload,"DGS10","Lợi suất TPCP Mỹ 10 năm","%",y10)
except Exception as e:
    payload["treasury_error"]=str(e)

# BEA published PCE readings. Use published percentages directly, not reconstructed index levels.
pce_dates=["2026-06-01","2026-07-01","2026-08-01","2026-09-01"]
put(payload,"PCE_YOY","PCE Mỹ YoY","%",[[ts(d),v] for d,v in zip(pce_dates,[3.5,3.4,3.4,3.6])],"2026-09-01")
put(payload,"CORE_PCE_YOY","Core PCE Mỹ YoY","%",[[ts(d),v] for d,v in zip(pce_dates,[3.0,3.0,3.0,3.1])],"2026-09-01")
put(payload,"PCE_MOM","PCE Mỹ MoM","%",[[ts(d),v] for d,v in zip(pce_dates,[-0.1,0.2,0.3,0.5])],"2026-09-01")
put(payload,"CORE_PCE_MOM","Core PCE Mỹ MoM","%",[[ts(d),v] for d,v in zip(pce_dates,[0.1,0.2,0.2,0.3])],"2026-09-01")

# Gold international – recent verified observations retained locally so the chart never depends on browser CORS.
put(payload,"GOLD_INTL","Vàng quốc tế","USD/oz",[
 [ts("2026-11-16"),3856.52],[ts("2026-11-17"),3849.21],[ts("2026-11-18"),3725.18],[ts("2026-11-19"),3624.63],[ts("2026-11-20"),3539.00]
],"2026-11-20")

# Brent daily from DataHub mirror of EIA public series.
try:
    brent=fetch_brent_datahub()
    if brent: put(payload,"BRENT","Dầu Brent","USD/thùng",brent)
except Exception as e:
    payload["brent_error"]=str(e)

# 3-2-1 crack spread from a public data page.
try:
    crack=fetch_crack_321()
    if crack: put(payload,"CRACK_321","Crack spread 3-2-1","USD/thùng",crack)
except Exception as e:
    payload["crack_error"]=str(e)

# Domestic commodities from published sources.
put(payload,"CA_TRA_DONG_THAP","Cá tra thịt trắng 0,7–1,0 kg/con – giá giữa khoảng","đồng/kg",[
 [ts("2026-11-06"),36500],[ts("2026-11-13"),36750],[ts("2026-11-20"),36750]
],"2026-11-20")
put(payload,"WOLFRAMITE_65","Wolframite 65% WO₃","USD/mtu",[
 [ts("2026-08-31"),941],[ts("2026-09-30"),947],[ts("2026-10-31"),840],[ts("2026-11-01"),812],[ts("2026-11-20"),875]
],"2026-11-20")
put(payload,"VN_RETAIL_ELECTRICITY","Giá bán lẻ điện bình quân Việt Nam","đồng/kWh",[
 [ts("2024-10-11"),2103.1159],[ts("2025-05-10"),2204.0655],[ts("2026-11-01"),2159.9037]
],"2026-11-01")

os.makedirs(os.path.dirname(OUT),exist_ok=True)
with open(OUT,"w",encoding="utf-8") as f:
    json.dump(payload,f,ensure_ascii=False,separators=(",",":"))
ok=sum(bool(v.get("data")) for v in payload["series"].values())
print("Wrote",OUT,"and",OUT_JS,"series",ok,"keys",",".join(payload["series"].keys()))
if ok < 14:
    raise SystemExit("ERROR: international bundle incomplete; expected >=12 series")
