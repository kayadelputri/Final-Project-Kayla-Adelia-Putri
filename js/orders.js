// js/orders.js — Simpan & kelola pesanan masuk untuk Panel Admin

const ORDER_KEY = 'lumicake_orders';

function getPesanan() {
  try { return JSON.parse(localStorage.getItem(ORDER_KEY)) || []; } catch { return []; }
}
function savePesananList(list) { localStorage.setItem(ORDER_KEY, JSON.stringify(list)); }

function simpanPesanan(order) {
  const list = getPesanan();
  list.unshift(order); // pesanan terbaru di atas
  savePesananList(list);
}

function ubahStatusPesanan(id, status) {
  const list = getPesanan();
  const o = list.find(x => x.id === id);
  if (o) { o.status = status; savePesananList(list); }
}

function hapusPesanan(id) {
  savePesananList(getPesanan().filter(x => x.id !== id));
}

function labelMetodeBayar(m) {
  const map = { qris: '💳 E-wallet', bank: '🏦 Transfer Bank', cod: '💵 COD' };
  return map[m] || m;
}

function labelStatusPesanan(s) {
  const map = { baru: '🆕 Baru', diproses: '👩‍🍳 Diproses', dikirim: '🚚 Dikirim', selesai: '✅ Selesai' };
  return map[s] || s;
}
