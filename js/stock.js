// js/stock.js — Manajemen stok produk Lumicake by Kay
// Stok disimpan terpisah di localStorage supaya bisa diubah manual oleh admin
// dan otomatis berkurang saat pelanggan menambahkan produk ke keranjang.

const STOK_KEY = 'lumicake_stok';

function getStokMap() {
  try {
    return JSON.parse(localStorage.getItem(STOK_KEY)) || {};
  } catch { return {}; }
}

function saveStokMap(map) {
  localStorage.setItem(STOK_KEY, JSON.stringify(map));
}

// Isi stok awal dari products.js kalau belum pernah tersimpan di localStorage
function initStok() {
  const map = getStokMap();
  let changed = false;
  const daftarProduk = typeof getAllProduk === 'function' ? getAllProduk() : PRODUK_DATA;
  daftarProduk.forEach(p => {
    if (!(p.id in map)) {
      map[p.id] = typeof p.stok === 'number' ? p.stok : 10;
      changed = true;
    }
  });
  if (changed) saveStokMap(map);
}

function getStok(id) {
  const map = getStokMap();
  return map[id] ?? 0;
}

// Set stok ke jumlah tertentu (dipakai admin untuk input manual)
function setStok(id, value) {
  const map = getStokMap();
  map[id] = Math.max(0, Math.round(value));
  saveStokMap(map);
  syncStokUI();
  return map[id];
}

// Tambah/kurangi stok sejumlah delta (dipakai tombol +/- admin & saat cart berubah)
function ubahStok(id, delta) {
  const map = getStokMap();
  const current = map[id] ?? 0;
  map[id] = Math.max(0, current + delta);
  saveStokMap(map);
  return map[id];
}

// Refresh tampilan yang menampilkan stok (grid produk & panel admin)
function syncStokUI() {
  if (typeof renderProduk === 'function') renderProduk();
  if (typeof renderAdminPanel === 'function') renderAdminPanel();
}
