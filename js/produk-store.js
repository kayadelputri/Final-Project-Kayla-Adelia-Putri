// js/produk-store.js — Kelola tambah/edit/hapus produk oleh Admin
// PRODUK_DATA di products.js dianggap data dasar (read-only).
// Perubahan admin (tambah/edit/hapus) disimpan terpisah di localStorage,
// lalu digabung saat ditampilkan lewat getAllProduk().

const PRODUK_EXTRA_KEY = 'lumicake_produk_extra'; // produk baru dari admin
const PRODUK_EDIT_KEY  = 'lumicake_produk_edit';  // perubahan pada produk dasar
const PRODUK_HAPUS_KEY = 'lumicake_produk_hapus'; // id produk dasar yang dihapus

function getProdukExtra() {
  try { return JSON.parse(localStorage.getItem(PRODUK_EXTRA_KEY)) || []; } catch { return []; }
}
function saveProdukExtra(list) { localStorage.setItem(PRODUK_EXTRA_KEY, JSON.stringify(list)); }

function getProdukEdit() {
  try { return JSON.parse(localStorage.getItem(PRODUK_EDIT_KEY)) || {}; } catch { return {}; }
}
function saveProdukEdit(map) { localStorage.setItem(PRODUK_EDIT_KEY, JSON.stringify(map)); }

function getProdukHapus() {
  try { return JSON.parse(localStorage.getItem(PRODUK_HAPUS_KEY)) || []; } catch { return []; }
}
function saveProdukHapus(arr) { localStorage.setItem(PRODUK_HAPUS_KEY, JSON.stringify(arr)); }

// ====== GABUNGKAN SEMUA PRODUK (dasar + edit - hapus + tambahan admin) ======
function getAllProduk() {
  const edits = getProdukEdit();
  const hapus = getProdukHapus();
  const base = PRODUK_DATA
    .filter(p => !hapus.includes(p.id))
    .map(p => (edits[p.id] ? { ...p, ...edits[p.id] } : p));
  const extra = getProdukExtra();
  return [...base, ...extra];
}

function getProdukById(id) {
  return getAllProduk().find(p => p.id === id);
}

function generateProdukId() {
  const all = getAllProduk();
  return all.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

// ====== TAMBAH PRODUK BARU ======
function tambahProdukBaru(data) {
  const id = generateProdukId();
  const produkBaru = {
    id,
    badge: data.badge || '',
    badgeClass: data.badgeClass || '',
    ...data
  };
  delete produkBaru.stok; // stok dikelola terpisah lewat stock.js
  const extra = getProdukExtra();
  extra.push(produkBaru);
  saveProdukExtra(extra);
  setStok(id, data.stok ?? 10);
  return id;
}

// ====== EDIT PRODUK (baik produk dasar maupun produk tambahan admin) ======
function editProduk(id, data) {
  const isExtra = getProdukExtra().some(p => p.id === id);
  if (isExtra) {
    const extra = getProdukExtra().map(p => (p.id === id ? { ...p, ...data } : p));
    saveProdukExtra(extra);
  } else {
    const edits = getProdukEdit();
    edits[id] = { ...(edits[id] || {}), ...data };
    saveProdukEdit(edits);
  }
}

// ====== HAPUS PRODUK ======
function hapusProduk(id) {
  const isExtra = getProdukExtra().some(p => p.id === id);
  if (isExtra) {
    saveProdukExtra(getProdukExtra().filter(p => p.id !== id));
  } else {
    const hapus = getProdukHapus();
    if (!hapus.includes(id)) { hapus.push(id); saveProdukHapus(hapus); }
  }
}
