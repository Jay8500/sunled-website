// Local Storage helpers. Data is per-browser; never store passwords or customer data here.
const KEYS = {products:"sunled_products", categories:"sunled_categories", settings:"sunled_settings", version:"sunled_version"};
const DEFAULT_SETTINGS = {whatsapp:"919440922147", phone:"9440922147", email:"sunled369@gmail.com"};

function readJSON(key){ try { return JSON.parse(localStorage.getItem(key)); } catch(e){ return null; } }
function writeJSON(key,val){ try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch(e){ return false; } }
function validProduct(p){ return p && typeof p.id==="string" && typeof p.name==="string" && p.name.trim() && typeof p.category==="string"; }

function getProducts(){
  const saved = readJSON(KEYS.products);
  const ok = Array.isArray(saved) && saved.every(validProduct);
  if (ok && readJSON(KEYS.version) === DATA_VERSION) return saved;
  if (ok) { // sample data was updated: refresh sample products, keep products added in admin
    const seedIds = SEED_PRODUCTS.map(p=>p.id);
    const merged = SEED_PRODUCTS.concat(saved.filter(p=>!seedIds.includes(p.id)));
    writeJSON(KEYS.products, merged); writeJSON(KEYS.version, DATA_VERSION); return merged;
  }
  writeJSON(KEYS.products, SEED_PRODUCTS); writeJSON(KEYS.version, DATA_VERSION);
  return SEED_PRODUCTS.slice();
}
function saveProducts(list){ return writeJSON(KEYS.products, list); }
function getCategories(){
  const saved = readJSON(KEYS.categories);
  if (Array.isArray(saved) && saved.length && saved.every(c=>typeof c==="string")) return saved;
  writeJSON(KEYS.categories, SEED_CATEGORIES); return SEED_CATEGORIES.slice();
}
function getSettings(){
  const s = readJSON(KEYS.settings);
  return Object.assign({}, DEFAULT_SETTINGS, s && typeof s==="object" ? s : {});
}
function resetData(){ Object.values(KEYS).forEach(k=>localStorage.removeItem(k)); }
