const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const esc = t => String(t ?? "").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const settings = getSettings();
const DEFAULT_MSG = "Hello SUNLED, I would like to enquire about your products.";
const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 0 1 12 4zM9 7.5c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.8-.4-1.9-.9-2.8-2.2-.1-.2 0-.3.1-.5l.4-.5.3-.4c0-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4z"/></svg>';

function waLink(text){ return `https://wa.me/${settings.whatsapp.replace(/\D/g,"")}?text=${encodeURIComponent(text || DEFAULT_MSG)}`; }
function enquiryText(p){ return `Hello SUNLED, I am interested in your ${p.name.replace(/^SUNLED\s+/,"")}. Please share the price and specifications.`; }

// Simple brand-style drawings, used until a real photo is added for a product (see admin page).
function art(category){
  let dots=""; for(let i=0;i<12;i++){ const a=i*Math.PI/6; dots+=`<circle cx="${200+62*Math.cos(a)}" cy="${150+62*Math.sin(a)}" r="8" fill="#f28a1c"/>`; }
  const shapes = {
    "Emergency Lights":`<rect x="125" y="125" width="150" height="90" rx="16" fill="#1a2147"/><circle cx="165" cy="108" r="26" fill="#f28a1c"/><circle cx="235" cy="108" r="26" fill="#f28a1c"/><circle cx="165" cy="108" r="11" fill="#fff6dc"/><circle cx="235" cy="108" r="11" fill="#fff6dc"/><rect x="152" y="155" width="56" height="26" rx="6" fill="#3a8a1d"/><circle cx="240" cy="168" r="7" fill="#f23a1c"/>`,
    "LED Panel Lights":`<rect x="110" y="55" width="180" height="190" rx="14" fill="#fff" stroke="#1a2147" stroke-width="8"/><rect x="130" y="75" width="140" height="150" rx="6" fill="#fff1cf"/><path d="M130 125h140M130 175h140M200 75v150" stroke="#f9c76a" stroke-width="3"/>`,
    "LED Tube Lights":`<rect x="70" y="118" width="260" height="46" rx="23" fill="#fff" stroke="#1a2147" stroke-width="7"/><rect x="70" y="118" width="34" height="46" rx="12" fill="#1a2147"/><rect x="296" y="118" width="34" height="46" rx="12" fill="#1a2147"/><path d="M125 190l-12 36M190 190l-5 40M215 190l5 40M275 190l12 36" stroke="#f28a1c" stroke-width="6" stroke-linecap="round"/>`,
    "Day and Night Sensor Lights":`<circle cx="200" cy="140" r="52" fill="#fff" stroke="#1a2147" stroke-width="7"/><rect x="178" y="192" width="44" height="34" rx="8" fill="#1a2147"/><circle cx="105" cy="82" r="18" fill="#f28a1c"/><path d="M105 52v-10M105 112v10M75 82H65M145 82h-10M84 61l-7-7M126 103l7 7M84 103l-7 7M126 61l7-7" stroke="#f28a1c" stroke-width="5" stroke-linecap="round"/><path d="M300 60a26 26 0 1 0 22 40a20 20 0 0 1-22-40z" fill="#1f3a99"/>`,
    "Motion Sensor Lights":`<rect x="115" y="110" width="110" height="80" rx="16" fill="#1a2147"/><circle cx="170" cy="150" r="20" fill="#f28a1c"/><circle cx="170" cy="150" r="9" fill="#fff6dc"/><path d="M250 120a48 48 0 0 1 0 60M272 105a72 72 0 0 1 0 90" fill="none" stroke="#3a8a1d" stroke-width="7" stroke-linecap="round"/>`,
    "LED Components and Spare Parts":`<circle cx="200" cy="150" r="90" fill="#fff" stroke="#1a2147" stroke-width="7"/>${dots}<rect x="170" y="125" width="60" height="50" rx="8" fill="#3a8a1d"/>`
  };
  const body = shapes[category] || `<circle cx="200" cy="125" r="52" fill="#f28a1c"/><rect x="178" y="180" width="44" height="44" rx="8" fill="#1a2147"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 340"><rect width="400" height="340" fill="#f4f8ef"/><circle cx="200" cy="150" r="125" fill="#ffe7c6"/>${body}</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
const productImage = p => p.image || art(p.category);
const detailUrl = p => `products.html?id=${encodeURIComponent(p.id)}`;

function layout(){
  const page = location.pathname.split("/").pop() || "index.html";
  const links = [["index.html","Home"],["products.html","Products"],["about.html","About us"],["contact.html","Contact us"]];
  $("#site-header").innerHTML = `<div class="wrap bar"><a class="logo" href="index.html" aria-label="SUNLED home"><img src="assets/images/logo.svg" alt="SUNLED Lights &amp; Manufacturers" width="122" height="56"></a>
    <button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span></button>
    <nav>${links.map(([h,t])=>`<a href="${h}" ${h===page?'aria-current="page"':""}>${t}</a>`).join("")}
    <a class="btn btn-wa" data-wa target="_blank" rel="noopener">${WA_ICON}WhatsApp</a></nav></div>`;
  $("#site-footer").innerHTML = `<div class="wrap"><div class="foot"><div><img src="assets/images/logo.svg" alt="SUNLED Lights &amp; Manufacturers" width="122" height="56">
    <p>LED lights: manufacturing, sales and repair.</p><p>Pachipenta, Parvathipuram Manyam District, Andhra Pradesh, India</p></div>
    <div><p><b>Contact</b></p><p>Phone: <a href="tel:${esc(settings.phone)}">${esc(settings.phone)}</a></p><p>Email: <a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a></p></div>
    <div><p><b>Pages</b></p><p><a href="products.html">Products</a></p><p><a href="about.html">About us</a></p><p><a href="contact.html">Contact us</a></p></div></div>
    <div class="legal">&copy; ${new Date().getFullYear()} SUNLED Lights &amp; Manufacturers. <a href="admin.html">Admin</a></div></div>`;
  const fab = document.createElement("a");
  fab.className = "wa-float"; fab.dataset.wa = ""; fab.target = "_blank"; fab.rel = "noopener"; fab.setAttribute("aria-label","Chat on WhatsApp");
  fab.innerHTML = `${WA_ICON}<span>Chat on WhatsApp</span>`; document.body.appendChild(fab);
  const btn = $(".menu-btn"), hd = $("#site-header");
  btn.onclick = ()=>{ const o = hd.classList.toggle("open"); btn.setAttribute("aria-expanded", o); };
  $$("nav a").forEach(a=>a.addEventListener("click",()=>hd.classList.remove("open")));
}
function wireWhatsApp(){ $$("[data-wa]").forEach(a=>{ a.href = waLink(a.dataset.wa); a.target="_blank"; a.rel="noopener"; }); }

const SUFFIX = {"Warranty":" warranty","Power backup":" backup","Working life":" life"};
function chips(p){
  const list = (p.specs||[]).filter(s=>Array.isArray(s) && !["Type","Made in","Voltage","Protection","Energy saving"].includes(s[0])).slice(0,3);
  return list.length ? `<div class="chips">${list.map(([k,v])=>`<span>${esc(v)}${SUFFIX[k]||""}</span>`).join("")}</div>` : "";
}
function card(p){
  return `<article class="card"><a class="pic" href="${detailUrl(p)}" tabindex="-1" aria-hidden="true"><img src="${esc(productImage(p))}" alt="" loading="lazy"></a>
    <div class="card-body"><span class="tag">${esc(p.category)}</span><h3><a href="${detailUrl(p)}">${esc(p.name)}</a></h3>
    <p>${esc(p.description || "")}</p>${chips(p)}
    <div class="actions"><a class="btn btn-wa btn-sm" data-wa="${esc(enquiryText(p))}">${WA_ICON}Enquire</a><a class="btn btn-line btn-sm" href="${detailUrl(p)}">Details</a></div></div></article>`;
}
const emptyMsg = `<p class="empty">No products to show. Try another category or message us on WhatsApp.</p>`;

function renderHome(){
  const feat = $("#featured"); if(!feat) return;
  const products = getProducts();
  const f = products.filter(p=>p.featured).slice(0,3);
  feat.innerHTML = f.length ? f.map(card).join("") : emptyMsg;
  $("#tiles").innerHTML = getCategories().map(c=>{
    const list = products.filter(p=>p.category===c);
    return `<a class="tile" href="products.html?cat=${encodeURIComponent(c)}"><img src="${esc(list[0] ? productImage(list[0]) : art(c))}" alt=""><span>${esc(c)}<small>${list.length} ${list.length===1?"product":"products"}</small></span></a>`;
  }).join("");
  const s = products.find(p=>p.id==="p1") || f[0], box = $("#spot");
  if(!s){ box.hidden = true; return; }
  const facts = (s.specs||[]).slice(0,6).map(([k,v])=>`<li><b>${esc(v)}</b><span>${esc(k)}</span></li>`).join("");
  box.innerHTML = `<img src="${esc(productImage(s))}" alt="${esc(s.name)}"><div><span class="tag">${esc(s.category)}</span><h2>${esc(s.name)}</h2><p>${esc(s.description||"")}</p>
    <ul class="facts">${facts}</ul><div class="row"><a class="btn btn-wa" data-wa="${esc(enquiryText(s))}">${WA_ICON}Enquire on WhatsApp</a><a class="btn btn-line" href="${detailUrl(s)}">Full details</a></div></div>`;
}

function renderProducts(){
  const grid = $("#product-grid"); if(!grid) return;
  const products = getProducts(), params = new URLSearchParams(location.search);
  const one = products.find(p=>p.id===params.get("id"));
  if (one) return renderDetail(one, products);
  const cats = getCategories(); let cat = cats.includes(params.get("cat")) ? params.get("cat") : "";
  const q = $("#q"), pills = $("#pills");
  const draw = ()=>{
    const term = q.value.trim().toLowerCase();
    const list = products.filter(p=>(!cat||p.category===cat) && (!term||(p.name+" "+p.description+" "+p.category).toLowerCase().includes(term)));
    pills.innerHTML = ["", ...cats].map(c=>`<button class="pill" type="button" data-c="${esc(c)}" aria-pressed="${c===cat}">${esc(c||"All products")}</button>`).join("");
    $("#count").textContent = `${list.length} ${list.length===1?"product":"products"}`;
    grid.innerHTML = list.length ? list.map(card).join("") : emptyMsg; wireWhatsApp();
  };
  pills.onclick = e=>{ const b = e.target.closest(".pill"); if(!b) return; cat = b.dataset.c; draw(); };
  q.oninput = draw; draw();
}

function renderDetail(p, products){
  $("#list-view").hidden = true; $("#banner").hidden = true;
  const d = $("#detail-view"); d.hidden = false; document.title = p.name + " | SUNLED";
  const rel = products.filter(x=>x.id!==p.id).sort((a,b)=>(b.category===p.category)-(a.category===p.category)).slice(0,3);
  d.innerHTML = `<p class="crumbs"><a href="index.html">Home</a> / <a href="products.html">Products</a> / <a href="products.html?cat=${encodeURIComponent(p.category)}">${esc(p.category)}</a></p>
    <div class="detail"><img src="${esc(productImage(p))}" alt="${esc(p.name)}"><div><span class="tag">${esc(p.category)}</span><h1 style="font-size:clamp(1.8rem,4vw,2.6rem)">${esc(p.name)}</h1>
    <p>${esc(p.description||"")}</p><p class="price">${p.price?`₹${esc(p.price)}`:"Price on enquiry"}</p><span class="status ${p.available?"":"off"}">${p.available?"Available":"Currently unavailable"}</span>
    <table class="specs"><tbody>${(p.specs||[]).map(([k,v])=>`<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>
    <div class="row"><a class="btn btn-wa" data-wa="${esc(enquiryText(p))}">${WA_ICON}Enquire on WhatsApp</a><a class="btn btn-line" href="products.html">All products</a></div></div></div>
    ${rel.length?`<h2 style="margin-top:56px">You may also like</h2><div class="grid">${rel.map(card).join("")}</div>`:""}`;
}

function setupContact(){
  const f = $("#contact-form"); if(!f) return;
  f.onsubmit = e=>{
    e.preventDefault(); const v = n=>f.elements[n].value.trim();
    const rules = {name:v("name").length>=2, phone:/^[6-9]\d{9}$/.test(v("phone").replace(/\D/g,"").slice(-10)), message:v("message").length>=5};
    let ok = true; for(const k in rules){ $(`[data-err=${k}]`).hidden = rules[k]; ok = ok && rules[k]; }
    if(!ok) return;
    window.open(waLink(`Hello SUNLED, I am ${v("name")} (phone ${v("phone")}). ${v("message")}`), "_blank", "noopener");
    $("#sent").hidden = false; f.reset();
  };
}

layout(); renderHome(); renderProducts(); setupContact(); wireWhatsApp();
