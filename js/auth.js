// js/auth.js — Akun Admin & Pelanggan Lumicake by Kay
// Login sederhana berbasis localStorage (tanpa backend), khusus untuk
// membedakan tampilan Admin (kelola stok) dan Pelanggan (belanja).

const ACCOUNTS = [
  { username: 'admin',   password: 'admin123',   role: 'admin',     nama: 'Kayla Adelia Putri' },
  { username: 'kayla',   password: 'kayla123',   role: 'pelanggan', nama: 'Kayla (Pelanggan)' }
];

const USER_KEY = 'lumicake_user';
const ACCOUNTS_EXTRA_KEY = 'lumicake_accounts_extra'; // akun pelanggan tambahan dari admin

function getAkunExtra() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_EXTRA_KEY)) || []; } catch { return []; }
}
function saveAkunExtra(list) { localStorage.setItem(ACCOUNTS_EXTRA_KEY, JSON.stringify(list)); }

// Gabungan akun demo bawaan + akun pelanggan yang ditambahkan admin
function getAllAccounts() { return [...ACCOUNTS, ...getAkunExtra()]; }

// Tambah akun pelanggan baru (dipakai dari Panel Admin)
function tambahAkunPelanggan({ username, password, nama }) {
  username = (username || '').trim();
  if (!username || !password || !nama) {
    return { ok: false, msg: 'Semua kolom wajib diisi' };
  }
  if (getAllAccounts().some(a => a.username.toLowerCase() === username.toLowerCase())) {
    return { ok: false, msg: 'Username sudah dipakai, coba yang lain' };
  }
  const extra = getAkunExtra();
  extra.push({ username, password, role: 'pelanggan', nama });
  saveAkunExtra(extra);
  return { ok: true };
}

// Hapus akun pelanggan (hanya akun tambahan admin yang bisa dihapus)
function hapusAkunPelanggan(username) {
  saveAkunExtra(getAkunExtra().filter(a => a.username !== username));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch { return null; }
}

function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

function isAdmin() {
  const u = getCurrentUser();
  return !!u && u.role === 'admin';
}

function login(username, password) {
  const acc = getAllAccounts().find(a =>
    a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password
  );
  if (!acc) return false;
  setCurrentUser({ username: acc.username, role: acc.role, nama: acc.nama });
  return true;
}

function logout() {
  clearCurrentUser();
}

// ====== TERAPKAN TAMPILAN SESUAI PERAN (ADMIN vs PELANGGAN) ======
function applyModeUI() {
  const user = getCurrentUser();
  const admin = !!user && user.role === 'admin';

  document.body.classList.toggle('mode-admin', admin);

  // Sembunyikan bagian toko saat mode admin
  ['home', 'sejarah', 'kategori', 'produk', 'tentang'].forEach(id => {
    document.getElementById(id)?.classList.toggle('hidden', admin);
  });

  // Sembunyikan tombol keranjang & link toko di navbar saat admin
  document.querySelectorAll('.nav-shop-link').forEach(el => el.classList.toggle('hidden', admin));
  document.getElementById('cartBtnWrap')?.classList.toggle('hidden', admin);
  document.getElementById('cartBtnHeader')?.classList.toggle('hidden', admin);
  document.getElementById('adminNavLink')?.classList.toggle('hidden', !admin);

  // Panel admin hanya tampil saat mode admin
  document.getElementById('adminPanel')?.classList.toggle('hidden', !admin);

  if (admin) {
    // Otomatis tutup & sembunyikan keranjang + checkout saat masuk mode admin
    document.getElementById('cartSidebar')?.classList.add('hidden');
    document.getElementById('cartOverlay')?.classList.add('hidden');
    document.getElementById('checkoutPage')?.classList.add('hidden');
    document.body.style.overflow = '';
    if (typeof renderAdminPanel === 'function') renderAdminPanel();
  } else {
    // Kembali ke pelanggan: keranjang otomatis dikembalikan (data tidak hilang)
    if (typeof updateCartUI === 'function') updateCartUI();
    if (typeof renderProduk === 'function') renderProduk();
  }

  updateAuthUI(user);
}

function updateAuthUI(user) {
  const label = document.getElementById('authLabel');
  const btn = document.getElementById('authBtn');
  if (!label || !btn) return;

  if (user) {
    const roleLabel = user.role === 'admin' ? 'Admin' : 'Pelanggan';
    label.textContent = `👤 ${user.nama} · ${roleLabel}`;
    btn.dataset.state = 'logged-in';
  } else {
    label.textContent = '🔐 Masuk';
    btn.dataset.state = 'logged-out';
  }
}
