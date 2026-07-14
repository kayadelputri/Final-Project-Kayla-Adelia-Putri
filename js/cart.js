// js/cart.js — Manajemen keranjang belanja dengan localStorage

const CART_KEY = 'lumicake_cart';

// ====== STORAGE ======
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ====== OPERASI CART (stok otomatis berkurang/bertambah) ======
function tambahKeranjang(produkId, qty = 1) {
  const cart = getCart();
  const produk = getProdukById(produkId);
  if (!produk) return;

  const stokTersedia = getStok(produkId);
  if (stokTersedia < qty) {
    showNotif(stokTersedia <= 0
      ? `😔 "${produk.nama}" stoknya habis`
      : `😔 Stok "${produk.nama}" tinggal ${stokTersedia}`);
    return;
  }

  const existing = cart.find(item => item.id === produkId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: produk.id, nama: produk.nama, harga: produk.harga, satuan: produk.satuan, gambar: produk.gambar, qty });
  }

  saveCart(cart);
  ubahStok(produkId, -qty); // stok berkurang otomatis begitu masuk keranjang
  updateCartUI();
  if (typeof renderProduk === 'function') renderProduk();
  showNotif(`🎀 "${produk.nama}" ditambahkan ke keranjang!`);

  // GA Event
  if (typeof trackEvent === 'function') {
    trackEvent('ecommerce', 'add_to_cart', produk.nama);
  }
}

function hapusItem(produkId) {
  const cart = getCart();
  const item = cart.find(i => i.id === produkId);
  const sisa = cart.filter(i => i.id !== produkId);
  saveCart(sisa);
  if (item) ubahStok(produkId, item.qty); // kembalikan stok yang tadi dipesan
  updateCartUI();
  renderCartSidebar();
  if (typeof renderProduk === 'function') renderProduk();
}

function updateQty(produkId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === produkId);
  if (!item) return;

  const qtyBaru = Math.max(1, item.qty + delta);
  const perubahan = qtyBaru - item.qty; // perubahan riil (bisa 0 kalau sudah di batas minimum)

  if (perubahan > 0) {
    const stokTersedia = getStok(produkId);
    if (stokTersedia < perubahan) {
      showNotif(`😔 Stok "${item.nama}" tinggal ${stokTersedia}`);
      return;
    }
  }

  item.qty = qtyBaru;
  saveCart(cart);
  if (perubahan !== 0) ubahStok(produkId, -perubahan); // tambah keranjang = stok berkurang, sebaliknya bertambah
  updateCartUI();
  renderCartSidebar();
  if (typeof renderProduk === 'function') renderProduk();
}

// restoreStok=true (default) saat keranjang dikosongkan manual → stok kembali
// restoreStok=false dipakai setelah pesanan berhasil dibayar → stok tetap terpakai
function kosongkanCart(restoreStok = true) {
  if (restoreStok) {
    const cart = getCart();
    cart.forEach(item => ubahStok(item.id, item.qty));
  }
  saveCart([]);
  updateCartUI();
  renderCartSidebar();
  if (typeof renderProduk === 'function') renderProduk();
}

// ====== HITUNG TOTAL ======
function hitungSubtotal(cart) {
  return cart.reduce((acc, item) => acc + item.harga * item.qty, 0);
}

function formatRupiah(angka) {
  return 'Rp ' + angka.toLocaleString('id-ID');
}

// ====== UPDATE BADGE HEADER ======
function updateCartUI() {
  const cart = getCart();
  const totalQty = cart.reduce((a, i) => a + i.qty, 0);

  const el = document.getElementById('cart-count');
  if (el) el.textContent = totalQty;

  const elHeader = document.getElementById('cart-count-header');
  if (elHeader) elHeader.textContent = totalQty;
}

// ====== RENDER SIDEBAR CART ======
function renderCartSidebar() {
  const cart = getCart();
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const ongkir = 15000;

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Keranjangmu masih kosong 🥺<br/>Yuk pilih kue yang kamu suka!</p>`;
    if (cartFooter) cartFooter.classList.add('hidden');
    return;
  }

  if (cartFooter) cartFooter.classList.remove('hidden');

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.gambar}" alt="${item.nama}" onerror="this.src='images/placeholder.jpg'" />
      <div class="cart-item-info">
        <p class="cart-item-nama">${item.nama}</p>
        <p class="cart-item-harga">${formatRupiah(item.harga)} / ${item.satuan}</p>
        <div class="cart-item-qty">
          <button onclick="updateQty(${item.id}, -1)" aria-label="Kurangi">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)" aria-label="Tambah">+</button>
          <button class="btn-hapus" onclick="hapusItem(${item.id})" aria-label="Hapus item">🗑️</button>
        </div>
      </div>
      <p class="cart-item-total">${formatRupiah(item.harga * item.qty)}</p>
    </div>
  `).join('');

  const subtotal = hitungSubtotal(cart);
  const total = subtotal + ongkir;

  const subEl = document.getElementById('cartSubtotal');
  const totEl = document.getElementById('cartTotal');
  if (subEl) subEl.textContent = formatRupiah(subtotal);
  if (totEl) totEl.textContent = formatRupiah(total);
}

// ====== RENDER CHECKOUT ITEMS ======
function renderCheckoutItems() {
  const cart = getCart();
  const ongkir = 15000;
  const container = document.getElementById('checkoutItems');
  if (!container) return;

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <img src="${item.gambar}" alt="${item.nama}" onerror="this.src='images/placeholder.jpg'" />
      <div>
        <p><strong>${item.nama}</strong></p>
        <p>${item.qty} x ${formatRupiah(item.harga)}</p>
      </div>
      <p>${formatRupiah(item.harga * item.qty)}</p>
    </div>
  `).join('');

  const subtotal = hitungSubtotal(cart);
  const total = subtotal + ongkir;

  const coSub = document.getElementById('coSubtotal');
  const coTot = document.getElementById('coTotal');
  if (coSub) coSub.textContent = formatRupiah(subtotal);
  if (coTot) coTot.textContent = formatRupiah(total);
}
