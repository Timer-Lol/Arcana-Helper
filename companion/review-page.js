"use strict";const fs=require("fs"),path=require("path"),esc=o=>String(o).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),mb=o=>o>=1048576?`${(o/1048576).toFixed(1)} MB`:o>=1024?`${Math.round(o/1024)} KB`:`${o} B`;function listFiles(o){const a=[],l=c=>{for(const t of fs.readdirSync(c).sort()){const i=path.join(c,t);if(fs.statSync(i).isDirectory()){l(i);continue}if(t.startsWith("."))continue;const s=path.relative(o,i).split(path.sep).join("/"),h=/\.jpe?g$|\.png$|\.bmp$/i.test(t)?"picture":/\.log$/i.test(t)?"log":/\.jsonl?$/i.test(t)?"data":"text";a.push({rel:s,name:t,size:fs.statSync(i).size,kind:h})}};return l(o),a}function reviewPage(o,a,l,c={}){const t=c.report||null,i=path.join(a,o),s=listFiles(i),h=s.reduce((e,n)=>e+n.size,0),g=s.filter(e=>e.kind==="log"),u=s.filter(e=>e.kind==="picture"),f=s.filter(e=>e.kind!=="log"&&e.kind!=="picture"),m=(e,n=2*1024*1024)=>{try{const r=fs.readFileSync(path.join(i,e));return r.length>n?r.slice(0,n).toString("utf8")+`
\u2026 (${mb(r.length-n)} more; open the file itself for the rest)`:r.toString("utf8")}catch(r){return`(could not read: ${r.message})`}},b=(()=>{try{return JSON.parse(fs.readFileSync(path.join(i,"summary.json"),"utf8"))}catch{return{}}})(),d=fs.existsSync(path.join(i,".sent"))?"sent":fs.existsSync(path.join(i,".kept"))?"kept":fs.existsSync(path.join(i,".approved"))?"approved":"waiting",p=l&&l.to?l.to:"the helper's owner",v={sent:`This board log was already sent to ${p}.`,kept:"You chose not to send this board log. It stays on this PC only (companion\\sessions, the newest 40 boards are kept).",approved:`You approved this board log; it goes to ${p} with the next send.`,waiting:"Not sent yet. Look through it below, then choose."}[d],y=g.map(e=>{const n=m(e.rel),r=n.split(`
`).filter(Boolean).length;return`<details open><summary>${esc(e.name)} \xB7 ${r} lines \xB7 ${mb(e.size)}</summary><div class="help">The game's own lines about the Arcana board, as the game wrote them (the scrubber kept only lines about the Tarot Path: tile reveals, moves, cards, chests and the board's screens; everything else in the game log is dropped before it reaches this file).</div><pre>${esc(n)}</pre></details>`}).join(""),w=f.map(e=>`<details><summary>${esc(e.rel)} \xB7 ${mb(e.size)}</summary><pre>${esc(m(e.rel,512*1024))}</pre></details>`).join(""),x=e=>t&&t.dropped&&t.dropped.has(e.rel),$=u.map(e=>`<figure${x(e)?' class="left"':""}><a href="/review/file?board=${encodeURIComponent(o)}&f=${encodeURIComponent(e.rel)}" target="_blank" rel="noopener"><img loading="lazy" src="/review/file?board=${encodeURIComponent(o)}&f=${encodeURIComponent(e.rel)}" alt="${esc(e.name)}"></a><figcaption>${esc(e.rel)} \xB7 ${mb(e.size)}</figcaption></figure>`).join("");return`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t?"Bug report preview":"Board log "+esc(o)}</title>
<style>
[hidden]{display:none!important}
:root{color-scheme:dark;--bg:#14121a;--panel:#1e1b27;--line:#35304a;--text:#ece8f4;--muted:#a9a2bd;--ok:#4fbf7a;--warn:#e0b04a;--accent:#8f7cf0}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.45 system-ui,Segoe UI,sans-serif}
main{max-width:1100px;margin:0 auto;padding:16px}
h1{font-size:20px;margin:0 0 6px}h2{font-size:16px;margin:18px 0 8px}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin:10px 0}
.help{color:var(--muted);font-size:13px}
.state{padding:8px 10px;border-radius:8px;border:1px solid var(--line);margin:8px 0}
.state.sent,.state.approved{border-color:var(--ok)}.state.kept{border-color:var(--warn)}
button{font:inherit;padding:8px 14px;border-radius:8px;border:1px solid var(--line);background:#2a2638;color:var(--text);cursor:pointer}
button.primary{background:var(--accent);border-color:var(--accent);color:#fff}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
pre{white-space:pre-wrap;word-break:break-all;background:#0f0d14;border:1px solid var(--line);border-radius:8px;padding:10px;max-height:60vh;overflow:auto;font-size:12px}
details summary{cursor:pointer;padding:4px 0}
.pics{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px}
figure{margin:0}figure img{width:100%;border-radius:8px;border:1px solid var(--line);background:#000}figcaption{font-size:12px;color:var(--muted);margin-top:4px}
figure.left{opacity:.35}figure.left figcaption::after{content:" \xB7 left out (the report is full)"}
table{border-collapse:collapse;font-size:13px}td{padding:2px 10px 2px 0;color:var(--muted)}td:first-child{color:var(--text)}
</style></head><body><main>
<h1>${t?"What your bug report sends":"Board log "+esc(o)}</h1>
<div class="row" style="margin:6px 0"><button id="openFolder" title="Opens this board's folder in File Explorer">Open this board's folder</button><button id="openAll" title="Opens companion\\sessions: every board's folder">Open all board logs</button></div>
${t?`<div class="state">This is exactly what <b>Send report</b> sends to ${esc(p)}: the files of this board (companion\\sessions\\${esc(o)}${b.board?"":", still in progress"}) shown below${t.dropped&&t.dropped.size?`, except the ${t.dropped.size} oldest pictures marked as left out`:""}, plus <b>info.txt</b> with your note and what the helper held at that moment (your tile, life, refill die, chests, hand and the advice on screen)${t.latest?" and the latest picture of the game (at the end of this page)":""}. About ${t.mb} MB in all. Nothing else is sent. Close this page and press <b>Send report</b> or <b>Cancel</b> in the helper.</div>`:`<div class="help">This is everything in this board's folder (companion\\sessions\\${esc(o)}), ${s.length} files, ${mb(h)} in all. Nothing else is sent: when you press Send, these files are packed into one zip and uploaded to ${esc(p)}.</div>
<div class="state ${d}" id="state">${esc(v)}</div>`}
${t?"":`<div class="row" id="buttons" ${d==="sent"?"hidden":""}>
  ${d!=="approved"?'<button class="primary" data-how="approve">Send this board log</button>':""}
  ${d!=="kept"?`<button data-how="keep">Don't send it</button>`:""}
  ${d!=="waiting"?'<button data-how="clear">Ask me again later</button>':""}
</div>`}
<div class="panel"><h2>Summary</h2><table>${Object.entries(b).map(([e,n])=>`<tr><td>${esc(e)}</td><td>${esc(typeof n=="object"?JSON.stringify(n):n)}</td></tr>`).join("")}</table>
<div class="help">Picture count, how many tiles the screen reader filled in and how many of those you landed on were right or wrong, and the tiles flagged for a look.</div></div>
<div class="panel"><h2>Game log lines (${g.length} file${g.length===1?"":"s"})</h2>${y||'<div class="help">No log file in this folder.</div>'}</div>
<div class="panel"><h2>Flags, debug marks and picture list (${f.length})</h2><div class="help">flags.jsonl: tiles the reader wasn't sure about or got wrong, with the small crop of that tile. shots.json: the list of pictures. marks.jsonl: your Ctrl+Alt+J debug marks (what the helper held at that moment).</div>${w||'<div class="help">None.</div>'}</div>
<div class="panel"><h2>Pictures of the game window (${u.length})</h2><div class="help">Taken after each move, of the Torchlight window only (never the whole screen). Click one to open it full size.</div><div class="pics">${$||'<div class="help">None.</div>'}</div></div>
${t&&t.latest?`<div class="panel"><h2>The latest picture of the game</h2><div class="help">Taken when you pressed Ctrl+Alt+J (it isn't in a board log, so it goes along by itself).</div><div class="pics"><figure><a href="/review/latest" target="_blank" rel="noopener"><img src="/review/latest" alt="latest picture"></a></figure></div></div>`:""}
<script>
const openIt = (body) => fetch('/api/open-folder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => alert('Could not reach the companion.'));
document.getElementById('openFolder').addEventListener('click', () => openIt({ board: ${JSON.stringify(o)} }));
document.getElementById('openAll').addEventListener('click', () => openIt({}));
for (const b of document.querySelectorAll('#buttons button')) b.addEventListener('click', async () => {
  const how = b.dataset.how;
  if (how === 'approve' && !confirm('Send this board log (all the files on this page) to ${esc(p).replace(/'/g,"\\'")}?')) return;
  b.disabled = true;
  try {
    const r = await fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ board: ${JSON.stringify(o)}, how }) }).then((x) => x.json());
    if (!r.ok) { alert('Could not save your answer (is the companion running?)'); b.disabled = false; return; }
    location.reload();
  } catch (e) { alert('Could not reach the companion: ' + e.message); b.disabled = false; }
});
<\/script></main></body></html>`}module.exports={reviewPage,listFiles};
