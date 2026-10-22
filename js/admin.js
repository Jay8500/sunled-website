// Simple admin: no login and no passwords. Anyone using this browser can edit its local copy.
const form = $("#pform"), tbody = $("#rows"), f = form.elements; let products = getProducts();
$("#a-cat").innerHTML = getCategories().map(c=>`<option>${esc(c)}</option>`).join("");
const say = m => $("#msg").textContent = m;
function setPreview(src){ const i = $("#preview"); i.hidden = !src; i.src = src || ""; }

function draw(){
  tbody.innerHTML = products.length ? products.map(p=>`<tr><td><img src="${esc(productImage(p))}" alt=""></td><td>${esc(p.name)}</td><td>${esc(p.category)}</td><td>${p.available?"Yes":"No"}</td>
   <td><button class="btn btn-line btn-sm" data-e="${esc(p.id)}">Edit</button> <button class="btn btn-del btn-sm" data-d="${esc(p.id)}">Delete</button></td></tr>`).join("")
   : `<tr><td colspan="5" class="empty">No products yet. Add one above.</td></tr>`;
}
function persist(msg){ say(saveProducts(products) ? msg : "Could not save: browser storage is full or blocked. Try a smaller image."); draw(); }

// Resize uploaded photos so they fit comfortably in Local Storage.
$("#a-file").onchange = e=>{
  const file = e.target.files[0]; if(!file) return;
  const r = new FileReader();
  r.onload = ()=>{ const img = new Image();
    img.onload = ()=>{ const s = Math.min(1, 800/Math.max(img.width,img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width*s); c.height = Math.round(img.height*s); c.getContext("2d").drawImage(img,0,0,c.width,c.height);
      f.image.value = c.toDataURL("image/jpeg",.82); setPreview(f.image.value); };
    img.onerror = ()=>say("That file is not a valid image."); img.src = r.result; };
  r.readAsDataURL(file);
};
$("#clear-img").onclick = ()=>{ f.image.value = ""; $("#a-file").value = ""; setPreview(""); };

form.onsubmit = e=>{
  e.preventDefault(); const g = n=>f[n].value.trim();
  if(g("name").length<2){ say("Enter a product name."); return; }
  if(g("price") && !/^\d+(\.\d{1,2})?$/.test(g("price"))){ say("Price must be a number, for example 450."); return; }
  const p = {id:g("id")||"p"+Date.now(), name:g("name"), category:g("category"), wattage:g("wattage"), price:g("price"),
    image:f.image.value, description:g("description"), available:f.available.checked, featured:f.featured.checked,
    specs:g("specs").split("\n").map(l=>l.split(":").map(s=>s.trim())).filter(a=>a[0]&&a[1]).map(a=>[a[0],a.slice(1).join(":")])};
  const i = products.findIndex(x=>x.id===p.id); if(i>=0) products[i]=p; else products.push(p);
  persist(i>=0?"Product updated.":"Product added."); form.reset(); f.id.value=""; setPreview("");
};
form.onreset = ()=>{ f.id.value=""; setPreview(""); say(""); };
tbody.onclick = e=>{
  const ed = e.target.dataset.e, del = e.target.dataset.d;
  if(ed){ const p = products.find(x=>x.id===ed);
    f.id.value=p.id; f.name.value=p.name; f.category.value=p.category; f.wattage.value=p.wattage||""; f.price.value=p.price||"";
    f.image.value=p.image||""; setPreview(p.image||""); f.description.value=p.description||""; f.available.checked=!!p.available; f.featured.checked=!!p.featured;
    f.specs.value=(p.specs||[]).map(s=>s.join(": ")).join("\n"); say("Editing: "+p.name); f.name.focus(); window.scrollTo({top:0,behavior:"smooth"}); }
  if(del && confirm("Delete this product?")){ products = products.filter(x=>x.id!==del); persist("Product deleted."); }
};
$("#reset").onclick = ()=>{ if(confirm("Reset all products to the sample data? Your changes will be lost.")){ resetData(); products = getProducts(); persist("Sample data restored."); } };
$("#export").onclick = ()=>{ const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(products,null,2)],{type:"application/json"})); a.download = "sunled-products-backup.json"; a.click(); URL.revokeObjectURL(a.href); };
$("#import").onchange = e=>{
  const file = e.target.files[0]; if(!file) return; const r = new FileReader();
  r.onload = ()=>{ try { const data = JSON.parse(r.result);
      if(!Array.isArray(data) || !data.every(validProduct)) throw new Error("bad");
      products = data; persist("Backup restored."); } catch(err){ say("That file is not a valid SUNLED products backup."); } };
  r.readAsText(file); e.target.value = "";
};
draw();
