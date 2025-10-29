// Client-side static State -> IP lookup
// This file contains the mapping and all logic. Ready to host on GitHub Pages.

const STATE_IPS = [
  {code:'AL',state:'Alabama',ip:'138.26.72.17'},
  {code:'AK',state:'Alaska',ip:'71.49.50.187'},
  {code:'AZ',state:'Arizona',ip:'148.167.2.30'},
  {code:'AR',state:'Arkansas',ip:'24.104.75.104'},
  {code:'CA',state:'California',ip:'151.143.51.85'},
  {code:'CO',state:'Colorado',ip:'73.14.194.136'},
  {code:'CT',state:'Connecticut',ip:'159.247.3.210'},
  {code:'DE',state:'Delaware',ip:'74.140.56.166'},
  {code:'DC',state:'District of Columbia',ip:'143.231.249.138'},
  {code:'FL',state:'Florida',ip:'50.73.157.178'},
  {code:'GA',state:'Georgia',ip:'178.134.61.66'},
  {code:'HI',state:'Hawaii',ip:'166.122.33.224'},
  {code:'ID',state:'Idaho',ip:'141.221.250.12'},
  {code:'IL',state:'Illinois',ip:'52.162.161.148'},
  {code:'IN',state:'Indiana',ip:'165.139.149.169'},
  {code:'IA',state:'Iowa',ip:'205.175.226.96'},
  {code:'KS',state:'Kansas',ip:'69.197.160.242'},
  {code:'KY',state:'Kentucky',ip:'74.129.237.233'},
  {code:'LA',state:'Louisiana',ip:'70.171.121.168'},
  {code:'ME',state:'Maine',ip:'169.244.142.131'},
  {code:'MD',state:'Maryland',ip:'134.192.135.254'},
  {code:'MA',state:'Massachusetts',ip:'173.237.207.39'},
  {code:'MI',state:'Michigan',ip:'69.215.26.194'},
  {code:'MN',state:'Minnesota',ip:'24.7.246.115'},
  {code:'MS',state:'Mississippi',ip:'130.18.139.171'},
  {code:'MO',state:'Missouri',ip:'24.104.75.104'},
  {code:'MT',state:'Montana',ip:'72.174.132.231'},
  {code:'NE',state:'Nebraska',ip:'162.127.124.90'},
  {code:'NV',state:'Nevada',ip:'207.166.3.52'},
  {code:'NH',state:'New Hampshire',ip:'73.227.236.200'},
  {code:'NJ',state:'New Jersey',ip:'69.141.112.210'},
  {code:'NM',state:'New Mexico',ip:'73.26.125.207'},
  {code:'NY',state:'New York',ip:'66.213.22.193'},
  {code:'NC',state:'North Carolina',ip:'216.131.104.185'},
  {code:'ND',state:'North Dakota',ip:'134.129.227.234'},
  {code:'OH',state:'Ohio',ip:'66.213.22.193'},
  {code:'OK',state:'Oklahoma',ip:'72.198.90.180'},
  {code:'OR',state:'Oregon',ip:'74.120.152.136'},
  {code:'PA',state:'Pennsylvania',ip:'147.31.182.137'},
  {code:'RI',state:'Rhode Island',ip:'68.229.79.117'},
  {code:'SC',state:'South Carolina',ip:'98.25.231.238'},
  {code:'SD',state:'South Dakota',ip:'172.68.58.196'},
  {code:'TN',state:'Tennessee',ip:'74.93.151.241'},
  {code:'TX',state:'Texas',ip:'76.142.231.100'},
  {code:'UT',state:'Utah',ip:'204.113.88.231'},
  {code:'VT',state:'Vermont',ip:'72.71.201.20'},
  {code:'VA',state:'Virginia',ip:'208.253.114.165'},
  {code:'WA',state:'Washington',ip:'156.33.241.5'},
  {code:'WV',state:'West Virginia',ip:'184.15.183.26'},
  {code:'WI',state:'Wisconsin',ip:'63.247.36.140'},
  {code:'WY',state:'Wyoming',ip:'24.230.96.108'}
];

// build lookup maps
const codeMap = new Map(STATE_IPS.map(s=>[s.code.toUpperCase(),s]));
const nameMap = new Map(STATE_IPS.map(s=>[s.state.toUpperCase(),s]));

// UI elements
const qInput = document.getElementById('q');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');
const resultEl = document.getElementById('result');
const resTitle = document.getElementById('resTitle');
const resBody = document.getElementById('resBody');
const copyBtn = document.getElementById('copyBtn');
const listEl = document.getElementById('list');
const downloadCsv = document.getElementById('downloadCsv');

function showResult(item){
  resultEl.classList.remove('hidden');
  resTitle.textContent = `${item.state} — ${item.code}`;
  resBody.innerHTML = `IP address: <code>${item.ip}</code><br><small>Note: These are static mappings (client-side). For live geolocation use a paid API or local GeoIP DB.</small>`;
  copyBtn.dataset.ip = item.ip;
}

function hideResult(){ resultEl.classList.add('hidden'); }

function search(q){
  if(!q) return;
  q = q.trim().toUpperCase();
  const byCode = codeMap.get(q);
  if(byCode){ showResult(byCode); return; }
  const byName = nameMap.get(q);
  if(byName){ showResult(byName); return; }
  // try partial match on name
  for(const s of STATE_IPS){
    if(s.state.toUpperCase().startsWith(q)){
      showResult(s); return;
    }
  }
  resTitle.textContent = 'Not found';
  resBody.textContent = 'No mapping found for your query. Try state code (e.g. TX) or full name (e.g. Texas).';
  resultEl.classList.remove('hidden');
}

searchBtn.addEventListener('click', ()=>{
  const v = qInput.value;
  if(!v){ alert('Type a state name or code'); return; }
  search(v);
});

qInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') searchBtn.click(); });

randomBtn.addEventListener('click', ()=>{
  const idx = Math.floor(Math.random()*STATE_IPS.length);
  const item = STATE_IPS[idx];
  qInput.value = item.code;
  search(item.code);
});

copyBtn.addEventListener('click', ()=>{
  const ip = copyBtn.dataset.ip;
  if(!ip) return; navigator.clipboard.writeText(ip).then(()=>{
    copyBtn.textContent = 'Copied!'; setTimeout(()=>copyBtn.textContent='Copy IP',1200);
  }).catch(()=>alert('Copy failed'));
});

// render the list
function renderList(){
  listEl.innerHTML = '';
  STATE_IPS.forEach(s=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<strong>${s.code}</strong> — ${s.state}<br><small><code>${s.ip}</code></small>`;
    div.addEventListener('click', ()=>{ navigator.clipboard.writeText(s.ip); div.style.opacity=0.6; setTimeout(()=>div.style.opacity=1,600); });
    listEl.appendChild(div);
  });
}

// CSV download
function buildCsv(){
  const header = 'state_code,state_name,ip\n';
  const rows = STATE_IPS.map(s=>`${s.code},"${s.state}",${s.ip}`).join('\n');
  return header + rows;
}

downloadCsv.addEventListener('click',(e)=>{
  const csv = buildCsv();
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  downloadCsv.href = url;
});

// init
renderList();
