// js/admin.js — Panel Admin lengkap: Ringkasan, Stok, Produk, Pesanan, Akun Pelanggan

let editingProdukId = null; // null = mode tambah baru, angka = mode edit

// ====== INIT TAB SWITCHING ======
function initAdminTabs() {
  document.querySelectorAll('.admin-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.add('hidden'));
      const tab = btn.dataset.tab;
      document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1))?.classList.remove('hidden');
      renderAdminPanel(); // refresh data tiap ganti tab biar selalu up to date
    });
  });
}

// ====== RENDER SEMUA TAB (dipanggil saat masuk mode admin) ======
function renderAdminPanel() {
  renderLaporan();
  renderStokTab();
  renderKelolaProdukTab();
  renderPesananTab();
  renderAkunTab();
}

// ====================================================
// TAB 1: RINGKASAN / LAPORAN PENJUALAN
// ====================================================
function renderLaporan() {
  const wrap = document.getElementById('adminLaporan');
  if (!wrap) return;

  const pesanan = getPesanan();
  const totalPendapatan = pesanan.reduce((a, o) => a + o.total, 0);
  const jumlahPesanan = pesanan.length;
  const rataRata = jumlahPesanan ? Math.round(totalPendapatan / jumlahPesanan) : 0;

  const produkTerjual = {};
  pesanan.forEach(o => o.items.forEach(it => {
    produkTerjual[it.nama] = (produkTerjual[it.nama] || 0) + it.qty;
  }));
  const terlaris = Object.entries(produkTerjual).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const semuaProduk = getAllProduk();
  const stokMenipis = semuaProduk.filter(p => getStok(p.id) > 0 && getStok(p.id) <= 5);
  const stokHabis = semuaProduk.filter(p => getStok(p.id) <= 0);

  wrap.innerHTML = `
    <div class="admin-ringkasan">
      <div class="admin-stat"><span>Rp ${totalPendapatan.toLocaleString('id-ID')}</span><p>Total Pendapatan</p></div>
      <div class="admin-stat"><span>${jumlahPesanan}</span><p>Jumlah Pesanan</p></div>
      <div class="admin-stat"><span>Rp ${rataRata.toLocaleString('id-ID')}</span><p>Rata-rata / Pesanan</p></div>
      <div class="admin-stat"><span>${semuaProduk.length}</span><p>Total Produk</p></div>
    </div>

    ${(stokMenipis.length > 0 || stokHabis.length > 0) ? `
      <div class="admin-alert">
        <h3>⚠️ Perhatian Stok</h3>
        ${stokHabis.length > 0 ? `<p>😔 <strong>${stokHabis.length} produk stoknya habis:</strong> ${stokHabis.map(p => p.nama).join(', ')}</p>` : ''}
        ${stokMenipis.length > 0 ? `<p>🟠 <strong>${stokMenipis.length} produk stoknya menipis (≤5):</strong> ${stokMenipis.map(p => `${p.nama} (${getStok(p.id)})`).join(', ')}</p>` : ''}
      </div>
    ` : `<div class="admin-alert admin-alert-aman"><p>✅ Semua stok produk dalam kondisi aman.</p></div>`}

    <h3 class="admin-subtitle">🏆 Produk Terlaris</h3>
    <div class="admin-terlaris-list">
      ${terlaris.length ? terlaris.map(([nama, qty], i) => `
        <div class="admin-terlaris-item">
          <span class="terlaris-rank">#${i + 1}</span>
          <span class="terlaris-nama">${nama}</span>
          <span class="terlaris-qty">${qty} terjual</span>
        </div>`).join('') : '<p class="admin-empty">Belum ada data penjualan. Yuk promosikan tokonya! 🌸</p>'}
    </div>
  `;
}

// ====================================================
// TAB 2: STOK
// ====================================================
function renderStokTab() {
  const wrap = document.getElementById('adminProdukList');
  if (!wrap) return;

  const produk = getAllProduk();

  wrap.innerHTML = produk.map(p => {
    const stok = getStok(p.id);
    const statusClass = stok <= 0 ? 'habis' : (stok <= 5 ? 'rendah' : '');
    const statusText = stok <= 0 ? 'Habis' : (stok <= 5 ? 'Menipis' : 'Aman');
    return `
    <div class="admin-produk-row" data-id="${p.id}">
      <img src="${p.gambar}" alt="${p.nama}" onerror="this.src='images/placeholder.jpg'" />
      <div class="admin-produk-info">
        <p class="admin-produk-nama">${p.nama}</p>
        <p class="admin-produk-kategori">${labelKategori(p.kategori)} · Rp ${p.harga.toLocaleString('id-ID')} / ${p.satuan}</p>
      </div>
      <div class="admin-stok-control">
        <button class="stok-btn" onclick="adminUbahStok(${p.id}, -1)" aria-label="Kurangi stok">−</button>
        <span class="stok-value ${statusClass}" id="stokVal-${p.id}">${stok}</span>
        <button class="stok-btn" onclick="adminUbahStok(${p.id}, 1)" aria-label="Tambah stok">+</button>
        <span class="stok-status ${statusClass}">${statusText}</span>
      </div>
      <div class="admin-stok-set">
        <input type="number" min="0" class="stok-input" id="stokInput-${p.id}" placeholder="Set stok" />
        <button class="btn-stok-set" onclick="adminSetStok(${p.id})">Simpan</button>
      </div>
    </div>`;
  }).join('');

  const totalStok = produk.reduce((a, p) => a + getStok(p.id), 0);
  const totalHabis = produk.filter(p => getStok(p.id) <= 0).length;

  const ringkasan = document.getElementById('adminRingkasanStok');
  if (ringkasan) {
    ringkasan.innerHTML = `
      <div class="admin-stat"><span>${produk.length}</span><p>Total Produk</p></div>
      <div class="admin-stat"><span>${totalStok}</span><p>Total Stok Tersedia</p></div>
      <div class="admin-stat"><span>${totalHabis}</span><p>Produk Stok Habis</p></div>
    `;
  }
}

function adminUbahStok(id, delta) {
  ubahStok(id, delta);
  renderStokTab();
  renderLaporan();
}

function adminSetStok(id) {
  const input = document.getElementById('stokInput-' + id);
  const val = parseInt(input.value, 10);
  if (isNaN(val) || val < 0) {
    showNotif('⚠️ Masukkan angka stok yang valid');
    return;
  }
  setStok(id, val);
  input.value = '';
  renderStokTab();
  renderLaporan();
  showNotif('✅ Stok berhasil diperbarui');
}

// ====================================================
// TAB 3: KELOLA PRODUK (Tambah / Edit / Hapus)
// ====================================================
function renderKelolaProdukTab() {
  const wrap = document.getElementById('adminKelolaProdukList');
  if (!wrap) return;

  const produk = getAllProduk();
  wrap.innerHTML = produk.map(p => `
    <div class="admin-produk-row" data-id="${p.id}">
      <img src="${p.gambar}" alt="${p.nama}" onerror="this.src='images/placeholder.jpg'" />
      <div class="admin-produk-info">
        <p class="admin-produk-nama">${p.nama}</p>
        <p class="admin-produk-kategori">${labelKategori(p.kategori)} · Rp ${p.harga.toLocaleString('id-ID')} / ${p.satuan}</p>
      </div>
      <div class="admin-produk-aksi">
        <button class="btn-edit-produk" onclick="bukaEditProduk(${p.id})">✏️ Edit</button>
        <button class="btn-hapus-produk" onclick="adminHapusProduk(${p.id})">🗑️ Hapus</button>
      </div>
    </div>
  `).join('');
}

function initFormProduk() {
  document.getElementById('btnTambahProdukBaru')?.addEventListener('click', () => {
    editingProdukId = null;
    resetFormProduk();
    document.getElementById('formProdukTitle').textContent = 'Tambah Produk Baru';
    document.getElementById('fpStokWrap').classList.remove('hidden');
    document.getElementById('formProdukWrap')?.classList.remove('hidden');
    document.getElementById('formProdukWrap')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('btnBatalProduk')?.addEventListener('click', () => {
    document.getElementById('formProdukWrap')?.classList.add('hidden');
    editingProdukId = null;
  });

  document.getElementById('formProduk')?.addEventListener('submit', e => {
    e.preventDefault();
    simpanFormProduk();
  });
}

function resetFormProduk() {
  document.getElementById('formProduk')?.reset();
  const errEl = document.getElementById('fpError');
  if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
}

function bukaEditProduk(id) {
  const p = getProdukById(id);
  if (!p) return;
  editingProdukId = id;

  document.getElementById('fpNama').value = p.nama;
  document.getElementById('fpKategori').value = p.kategori;
  document.getElementById('fpSatuan').value = p.satuan;
  document.getElementById('fpHarga').value = p.harga;
  document.getElementById('fpGambar').value = p.gambar;
  document.getElementById('fpDeskripsi').value = p.deskripsi;
  document.getElementById('fpBadge').value = p.badge || '';
  document.getElementById('fpBadgeClass').value = p.badgeClass || '';

  document.getElementById('fpStokWrap').classList.add('hidden'); // stok diedit lewat tab Stok, bukan di sini
  document.getElementById('formProdukTitle').textContent = `Edit Produk: ${p.nama}`;
  document.getElementById('formProdukWrap')?.classList.remove('hidden');
  document.getElementById('formProdukWrap')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function simpanFormProduk() {
  const errEl = document.getElementById('fpError');
  const data = {
    nama: document.getElementById('fpNama').value.trim(),
    kategori: document.getElementById('fpKategori').value,
    satuan: document.getElementById('fpSatuan').value.trim(),
    harga: parseInt(document.getElementById('fpHarga').value, 10),
    gambar: document.getElementById('fpGambar').value.trim() || 'images/placeholder.jpg',
    deskripsi: document.getElementById('fpDeskripsi').value.trim(),
    badge: document.getElementById('fpBadge').value.trim(),
    badgeClass: document.getElementById('fpBadgeClass').value
  };

  if (!data.nama || !data.satuan || !data.deskripsi || isNaN(data.harga) || data.harga <= 0) {
    errEl.textContent = 'Nama, satuan, harga, dan deskripsi wajib diisi dengan benar.';
    errEl.style.display = 'block';
    return;
  }

  if (editingProdukId === null) {
    const stok = parseInt(document.getElementById('fpStok').value, 10);
    data.stok = isNaN(stok) || stok < 0 ? 10 : stok;
    tambahProdukBaru(data);
    showNotif(`🎉 Produk "${data.nama}" berhasil ditambahkan!`);
  } else {
    editProduk(editingProdukId, data);
    showNotif(`✅ Produk "${data.nama}" berhasil diperbarui!`);
  }

  document.getElementById('formProdukWrap')?.classList.add('hidden');
  editingProdukId = null;
  renderAdminPanel();
  if (typeof renderProduk === 'function') renderProduk();
}

function adminHapusProduk(id) {
  const p = getProdukById(id);
  if (!p) return;
  if (confirm(`Hapus produk "${p.nama}"? Tindakan ini tidak bisa dibatalkan.`)) {
    hapusProduk(id);
    renderAdminPanel();
    if (typeof renderProduk === 'function') renderProduk();
    showNotif(`🗑️ Produk "${p.nama}" telah dihapus`);
  }
}

// ====================================================
// TAB 4: PESANAN MASUK
// ====================================================
function renderPesananTab() {
  const wrap = document.getElementById('adminPesananList');
  if (!wrap) return;

  const pesanan = getPesanan();
  if (pesanan.length === 0) {
    wrap.innerHTML = '<p class="admin-empty">Belum ada pesanan masuk. Yuk tunggu pelanggan checkout! 🎀</p>';
    return;
  }

  wrap.innerHTML = pesanan.map(o => `
    <div class="admin-pesanan-card">
      <div class="admin-pesanan-head">
        <div>
          <p class="pesanan-id">${o.id}</p>
          <p class="pesanan-tanggal">${new Date(o.tanggal).toLocaleString('id-ID')}</p>
        </div>
        <select class="pesanan-status" onchange="adminUbahStatus('${o.id}', this.value)">
          <option value="baru" ${o.status === 'baru' ? 'selected' : ''}>🆕 Baru</option>
          <option value="diproses" ${o.status === 'diproses' ? 'selected' : ''}>👩‍🍳 Diproses</option>
          <option value="dikirim" ${o.status === 'dikirim' ? 'selected' : ''}>🚚 Dikirim</option>
          <option value="selesai" ${o.status === 'selesai' ? 'selected' : ''}>✅ Selesai</option>
        </select>
      </div>
      <div class="admin-pesanan-body">
        <p class="pesanan-pelanggan"><strong>${o.pelanggan.nama}</strong> · ${o.pelanggan.hp} · ${o.pelanggan.email}</p>
        <p class="pesanan-alamat">📍 ${o.pelanggan.alamat}</p>
        ${o.pelanggan.catatan ? `<p class="pesanan-catatan">📝 ${o.pelanggan.catatan}</p>` : ''}
        <div class="pesanan-items">
          ${o.items.map(it => `<span class="pesanan-item-chip">${it.qty}x ${it.nama}</span>`).join('')}
        </div>
        <p class="pesanan-total">Total: <strong>Rp ${o.total.toLocaleString('id-ID')}</strong> · ${labelMetodeBayar(o.metode)}</p>
      </div>
      <button class="btn-hapus-pesanan" onclick="adminHapusPesanan('${o.id}')">🗑️ Hapus Pesanan</button>
    </div>
  `).join('');
}

function adminUbahStatus(id, status) {
  ubahStatusPesanan(id, status);
  showNotif('✅ Status pesanan diperbarui');
}

function adminHapusPesanan(id) {
  if (confirm('Hapus pesanan ini dari daftar?')) {
    hapusPesanan(id);
    renderPesananTab();
    renderLaporan();
  }
}

// ====================================================
// TAB 5: AKUN PELANGGAN
// ====================================================
function renderAkunTab() {
  const wrap = document.getElementById('adminAkunList');
  if (!wrap) return;

  const semuaAkun = getAllAccounts().filter(a => a.role === 'pelanggan');
  const akunExtra = getAkunExtra().map(a => a.username);

  wrap.innerHTML = `
    <h3 class="admin-subtitle">Daftar Akun Pelanggan (${semuaAkun.length})</h3>
    <div class="admin-akun-items">
      ${semuaAkun.map(a => `
        <div class="admin-akun-row">
          <div>
            <p class="admin-akun-nama">${a.nama}</p>
            <p class="admin-akun-username">@${a.username}</p>
          </div>
          ${akunExtra.includes(a.username)
            ? `<button class="btn-hapus-produk" onclick="adminHapusAkun('${a.username}')">🗑️ Hapus</button>`
            : `<span class="akun-demo-badge">Akun Demo</span>`}
        </div>
      `).join('')}
    </div>
  `;
}

function initFormAkun() {
  document.getElementById('formAkunBaru')?.addEventListener('submit', e => {
    e.preventDefault();
    const nama = document.getElementById('akunNama').value.trim();
    const username = document.getElementById('akunUsername').value.trim();
    const password = document.getElementById('akunPassword').value.trim();
    const errEl = document.getElementById('akunError');

    const hasil = tambahAkunPelanggan({ nama, username, password });
    if (!hasil.ok) {
      errEl.textContent = hasil.msg;
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';
    document.getElementById('formAkunBaru').reset();
    renderAkunTab();
    showNotif(`🎉 Akun pelanggan "${nama}" berhasil dibuat!`);
  });
}

function adminHapusAkun(username) {
  if (confirm(`Hapus akun "${username}"?`)) {
    hapusAkunPelanggan(username);
    renderAkunTab();
    showNotif('🗑️ Akun pelanggan dihapus');
  }
}
