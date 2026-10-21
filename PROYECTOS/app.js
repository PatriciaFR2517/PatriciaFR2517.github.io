const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const iso=(n=0)=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
function store(k,d){let v=d;try{const s=JSON.parse(localStorage.getItem(k));if(s)v=s}catch(e){}
return{get:()=>v,set:n=>{v=n;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}}}
function mount(views,actions){let cur=Object.keys(views)[0];const m=document.getElementById('m');
const draw=()=>{document.querySelectorAll('[data-v]').forEach(b=>b.classList.toggle('on',b.dataset.v===cur));m.innerHTML=views[cur]()};
const run=(a,d)=>{const r=actions[a](d);if(typeof r==='string')cur=r;draw()};
document.addEventListener('click',e=>{const b=e.target.closest('[data-v],[data-act]');if(!b)return;b.dataset.v?(cur=b.dataset.v,draw()):run(b.dataset.act,b.dataset)});
document.addEventListener('submit',e=>{e.preventDefault();run(e.target.dataset.act,Object.fromEntries(new FormData(e.target)))});
draw()}
