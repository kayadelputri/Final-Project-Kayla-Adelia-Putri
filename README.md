# 🐰 Lumicake by Kay — Cake & Bakery

> *Handmade with Love — Kue cantik, lembut, dan penuh cinta untuk setiap momen spesialmu 🎀*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-pink?style=for-the-badge)](https://kayadelputri.github.io/Final-Project-Kayla-Adelia-Putri/)
[![Repo](https://img.shields.io/badge/📁_Repository-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/kayadelputri/Final-Project-Kayla-Adelia-Putri)

---

## 📋 Daftar Isi

1. [Tentang Proyek](#tentang-proyek)
2. [Fitur Website](#fitur-website)
3. [Struktur Folder](#struktur-folder)
4. [Cara Menjalankan](#cara-menjalankan)
5. [Business Overview](#-business-overview)
6. [Strategi Digital & Analytics](#-strategi-digital--analytics)
7. [Keamanan & Pemeliharaan](#-keamanan--pemeliharaan)
8. [Teknologi yang Digunakan](#teknologi-yang-digunakan)

---

## Tentang Proyek

**Lumicake by Kay** adalah prototype website e-commerce untuk bisnis kue dan bakery handmade yang berbasis di Bandung. Proyek ini dibuat sebagai tugas akhir mata kuliah **KAIT II** Program Studi Administrasi Bisnis, Semester Genap 2025/2026.

Website ini mengintegrasikan konsep e-commerce modern dengan fitur-fitur bisnis yang fungsional mulai dari katalog produk, keranjang belanja berbasis localStorage, sistem filter dan pencarian, checkout dengan validasi form dan pilihan metode pembayaran, hingga **Panel Admin** lengkap (login role admin/pelanggan, laporan penjualan, kelola stok, kelola produk, kelola pesanan, dan kelola akun pelanggan) untuk mensimulasikan operasional bisnis secara end-to-end.

---

## ✨ Fitur Website

### Fitur Teknis — Sisi Pelanggan
| Fitur | Status | Keterangan |
|-------|--------|------------|
| Responsive Design | ✅ | Desktop, tablet, mobile — media query lengkap |
| Navbar + Hero Banner | ✅ | Sticky navbar, smooth scroll, mobile hamburger menu |
| Katalog Produk (10 produk) | ✅ | 10 produk dari 5 kategori berbeda |
| Modal Detail Produk | ✅ | Klik produk untuk melihat detail + pilih qty |
| Filter Kategori | ✅ | Filter by: Semua, Cakes, Wedding Cake, Cupcake, Pastry, Cookies & Sweet Treats |
| Search Produk | ✅ | Pencarian real-time dengan debounce |
| Filter Harga (Range Slider) | ✅ | Filter berdasarkan batas harga maksimum |
| Urutkan Produk | ✅ | Default, harga murah-mahal, harga mahal-murah, A–Z |
| Stok Real-Time | ✅ | Stok berkurang otomatis saat produk masuk keranjang, tombol nonaktif jika habis |
| Keranjang Belanja (localStorage) | ✅ | Add, update qty, hapus item, kosongkan |
| Total Otomatis | ✅ | Subtotal + ongkir dihitung otomatis |
| Halaman Checkout | ✅ | Form lengkap + pilihan metode pembayaran |
| Validasi Form | ✅ | Nama, email, HP, alamat — dengan pesan error |
| Metode Pembayaran | ✅ | E-wallet (QRIS), Transfer Bank, COD |
| Notifikasi Toast | ✅ | Feedback visual setiap aksi |
| Google Analytics | ✅ | Script GA4 + event tracking (add_to_cart, checkout, dll) |
| Smooth Scroll + Animasi | ✅ | Page load, hover, scroll effects |
| Accessibility | ✅ | ARIA labels, keyboard navigation, prefers-reduced-motion |

### Fitur Teknis — Sisi Admin
| Fitur | Status | Keterangan |
|-------|--------|------------|
| Login Akun (Admin & Pelanggan) | ✅ | Login berbasis localStorage, membedakan tampilan Admin dan Pelanggan |
| Panel Admin | ✅ | Muncul otomatis di navbar setelah login sebagai admin |
| Tab Ringkasan | ✅ | Total pendapatan, jumlah pesanan, rata-rata order, produk terlaris |
| Tab Kelola Stok | ✅ | Lihat & ubah stok tiap produk secara manual |
| Tab Kelola Produk | ✅ | Tambah, edit, dan hapus produk (CRUD) langsung dari panel |
| Tab Pesanan | ✅ | Lihat daftar pesanan masuk & ubah status (Baru → Diproses → Dikirim → Selesai) |
| Tab Akun Pelanggan | ✅ | Tambah & hapus akun pelanggan baru |

---

## 📁 Struktur Folder

```
Final-Project-Kayla-Adelia-Putri/
│
├── index.html              # Halaman utama (produk, cart, checkout, panel admin, login)
│
├── css/
│   └── style.css           # Semua styling (responsive, animasi, komponen)
│
├── js/
│   ├── products.js         # Data dasar 10 produk (nama, harga, kategori, deskripsi, stok awal)
│   ├── produk-store.js     # CRUD produk oleh admin (tambah/edit/hapus), digabung dgn products.js
│   ├── stock.js            # Manajemen stok per produk (localStorage), berkurang otomatis saat checkout
│   ├── cart.js             # Logika keranjang belanja + localStorage
│   ├── auth.js             # Login & akun (admin/pelanggan), tambah akun pelanggan baru
│   ├── orders.js           # Simpan & kelola pesanan masuk untuk Panel Admin
│   ├── admin.js            # Logika Panel Admin: ringkasan, stok, produk, pesanan, akun
│   └── app.js              # Logika utama: render produk, filter, modal, checkout, init semua modul
│
├── images/
│   ├── lumicake.png                       # Gambar hero
│   ├── pearly butterfly.webp
│   ├── sweet harmony cookies.webp
│   ├── rose macaron box.jpg
│   ├── blueberry cheesecake.jpg
│   ├── Lily Blossom Wedding Cake.jpg
│   ├── Cupcake Bouquet.jpg
│   ├── Dubai Chocolate Chewy Cookie.jpg
│   ├── Almond Butter Croissant.jpg
│   ├── Cookies & Cream Cake.jpg
│   ├── Molten Chocolate Lava Cake.jpg
│   └── qris lumicakeby_kay.jpg            # QR code pembayaran e-wallet
│
└── README.md               # Dokumentasi ini
```

---

## 🚀 Cara Menjalankan

### Lokal (tanpa server)
1. Clone repository:
   ```bash
   git clone https://github.com/kayadelputri/Final-Project-Kayla-Adelia-Putri.git
   ```
2. Buka folder hasil clone
3. Buka `index.html` di browser favorit kamu

### Live (GitHub Pages)
Langsung kunjungi: [https://kayadelputri.github.io/Final-Project-Kayla-Adelia-Putri/](https://kayadelputri.github.io/Final-Project-Kayla-Adelia-Putri/)

### Login Panel Admin
Klik ikon akun di navbar untuk membuka modal login, lalu gunakan salah satu akun demo berikut (tersedia juga tombol "Isi Akun Admin" / "Isi Akun Pelanggan" untuk mengisi otomatis):

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Pelanggan | `kayla` | `kayla123` |

Setelah login sebagai Admin, menu **🛠️ Panel Admin** akan muncul di navbar.

---

## 🏪 Business Overview

### 1. Identitas Bisnis

| | |
|---|---|
| **Nama Bisnis** | Lumicake by Kay |
| **Jenis Bisnis** | Bakery & Cake Shop Handmade |
| **Model Bisnis** | B2C (Business to Consumer) via E-Commerce |
| **Lokasi** | Jl. Suci No. 62, Kota Bandung, Jawa Barat |
| **Kontak** | lumicakebykay@gmail.com / +62 858-6857-0216 |
| **Social Media** | @Lumicakeby_Kay (Instagram & TikTok) |

### 2. Value Proposition

Lumicake by Kay hadir untuk memenuhi kebutuhan kue cantik dan berkualitas yang **handmade, customizable, dan terjangkau** bagi masyarakat Bandung dan sekitarnya. Dibandingkan toko kue konvensional, Lumicake menawarkan:

- 🌿 **Bahan premium tanpa pengawet berbahaya** — fresh every order
- 🎨 **Desain custom** sesuai permintaan pelanggan (tema, warna, dekorasi)
- 🚚 **Packaging premium** agar kue aman sampai tujuan
- 💌 **Gratis kartu ucapan** di setiap pesanan
- 📱 **Pemesanan mudah** via website atau WhatsApp

### 3. Target Market & Segmentasi Pelanggan

#### Segmentasi Demografis
- **Usia:** 18–35 tahun (Gen Z & Millennial)
- **Gender:** Mayoritas perempuan (70%), namun terbuka untuk semua
- **Lokasi:** Kota Bandung dan sekitarnya
- **Pendapatan:** Menengah ke atas (SES B–A)

#### Segmentasi Psikografis
- Orang yang peduli estetika dan visual appeal
- Aktif di media sosial (Instagram, TikTok)
- Suka berikan hadiah bermakna untuk orang tersayang
- Menghargai produk artisan/handmade

#### Segmentasi Perilaku
- Pembeli kue untuk momen spesial: ulang tahun, pernikahan, anniversary, wisuda
- Pembelian impulsif karena konten visual yang menarik di media sosial
- Loyal jika puas dengan produk dan pelayanan

### 4. Analisis Pasar & Kompetitor

#### Peluang Pasar
Industri bakery dan patisserie Indonesia tumbuh pesat pasca pandemi. Tren *custom cake* dan *aesthetic cake* semakin diminati, terutama didorong oleh budaya berbagi momen di Instagram dan TikTok. Bandung sebagai kota kuliner dan kreatif menjadi pasar yang sangat potensial.

#### Analisis Kompetitor

| Kompetitor | Keunggulan | Kelemahan | Posisi Lumicake |
|---|---|---|---|
| Toko kue besar (Breadtalk, Holland) | Brand awareness tinggi, tersedia di mall | Kurang personal, tidak custom, mahal | Lebih personal, custom, harga terjangkau |
| UMKM lokal sejenis | Lebih murah | Desain kurang konsisten, online presence lemah | Desain lebih estetik, branding kuat |
| Artisan cake Bandung | Kualitas tinggi | Harga premium, waitlist panjang | Harga menengah, turnaround lebih cepat |

#### Keunggulan Kompetitif Lumicake
- Visual branding yang konsisten (pink pastel, elegan, instagramable)
- Aktif di TikTok & Instagram dengan konten proses pembuatan kue
- Website e-commerce yang memudahkan pemesanan dan tracking

### 5. Katalog Produk & Manajemen Produk

#### Kategori & Produk

| Kategori | Produk | Rentang Harga |
|---|---|---|
| 🎂 Birthday Cake | Pearly Butterfly Cake, Blueberry Cheesecake Bliss, Cookies & Cream Cake, Molten Chocolate Lava Cake | Rp 14.000 – Rp 180.000 |
| 💍 Wedding Cake | Lily Blossom Wedding Cake | Rp 3.500.000 (3 tier) |
| 🧁 Cupcake | Mini Cupcake Bouquet | Rp 110.000 / 7 pcs |
| 🍪 Cookies & Sweet Treats | Sweet Harmony Cookies, Rose Macaron Box, Dubai Chocolate Chewy Cookie | Rp 45.000 - 68.000 |
| 🍞 Pastry | Almond Butter Croissant | Rp 25.000 / pcs |

#### Strategi Manajemen Produk
- **Product Mix:** Kombinasi produk premium (wedding cake) + produk entry-level (brownie, slice cheesecake) untuk menjangkau berbagai segmen harga
- **Badge Strategy:** Best Seller, New, Diskon, Premium, Populer, Favorit — untuk memengaruhi keputusan beli
- **Deskripsi Produk:** Menggunakan bahasa emosional dan sensorik ("meleleh di mulut", "harum mawar asli") untuk meningkatkan konversi
- **Foto Produk:** Foto dengan pencahayaan natural, latar bersih, dan angle estetik

### 6. Model Bisnis & Revenue Stream

#### Model Bisnis: D2C (Direct to Consumer) via E-Commerce
Lumicake menjual langsung ke konsumen akhir tanpa perantara, sehingga margin keuntungan lebih besar dan hubungan dengan pelanggan lebih personal.

#### Revenue Stream

| Sumber Pendapatan | Keterangan |
|---|---|
| Penjualan produk standar | Produk ready stock / pre-order dengan harga tetap |
| Custom cake & order khusus | Harga negotiable berdasarkan kompleksitas desain |
| Hamper & gift box | Paket bundling untuk hari raya dan momen spesial |
| Kemitraan catering | Suplai kue untuk acara kantor, pernikahan, dll |

### 7. Strategi Harga & Promosi

#### Strategi Penetapan Harga
- **Cost-Plus Pricing:** Harga = Biaya bahan + Biaya tenaga + Profit margin 40%
- **Psychological Pricing:** Harga Rp 14.000 (bukan Rp 15.000) untuk produk entry-level
- **Premium Pricing:** Untuk wedding cake yang menekankan eksklusivitas

#### Strategi Promosi
| Taktik | Detail |
|---|---|
| Diskon First Order | Diskon 10% untuk pelanggan baru dengan kode LUMIFIRST |
| Flash Sale | Promo terbatas setiap Jumat malam via Instagram Story |
| Referral Program | Dapatkan Rp 20.000 untuk setiap teman yang berhasil order |
| Free Ongkir | Gratis ongkir untuk pembelian di atas Rp 200.000 (area Bandung) |
| Bundle Deal | Beli 2 produk pastry, gratis 1 cookies |
| Loyalty Points | Setiap Rp 10.000 = 1 poin, bisa ditukar diskon |

### 8. Proses Checkout & Payment Gateway

#### Alur Pembelian
```
Pilih Produk → Tambah ke Keranjang → Cek Keranjang → Isi Form Checkout → Pilih Pembayaran → Konfirmasi → Proses Pesanan → Pengiriman
```

#### Metode Pembayaran yang Tersedia di Website

**💳 E-Wallet (QRIS)**
- Mendukung pembayaran dari GoPay, OVO, Dana, dan e-wallet lain via scan QRIS
- Saat dipilih, sistem menampilkan QR code pembayaran resmi Lumicake by Kay
- Pelanggan konfirmasi manual lewat tombol "Saya Sudah Bayar"

**🏦 Transfer Bank**
- Menerima transfer dari semua bank
- Konfirmasi pembayaran juga melalui QR/instruksi yang sama sebelum pesanan diproses

**💵 COD (Cash on Delivery)**
- Khusus area Bandung Kota dan sekitarnya
- Pesanan langsung tercatat sebagai "Baru" di Panel Admin tanpa perlu konfirmasi pembayaran di awal

> ℹ️ Untuk versi produksi (bukan tugas akademik), metode pembayaran ini dapat dikembangkan lebih lanjut dengan mengintegrasikan payment gateway pihak ketiga seperti E-wallet atau Transfer Bank agar verifikasi pembayaran berjalan otomatis secara real-time.

---

## 📊 Strategi Digital & Analytics

### Google Analytics 4 (GA4)

Script GA4 telah diintegrasikan dengan ID `G-LUMICAKE2026`. Metrik yang akan dipantau:

#### Metrik Utama (KPI)
| Metrik | Target | Frekuensi Review |
|---|---|---|
| Conversion Rate | ≥ 2.5% | Mingguan |
| Average Order Value (AOV) | ≥ Rp 150.000 | Mingguan |
| Bounce Rate | ≤ 55% | Mingguan |
| Session Duration | ≥ 2 menit | Bulanan |
| Cart Abandonment Rate | ≤ 70% | Mingguan |

#### Event Tracking yang Diimplementasikan
```javascript
// Event yang ditrack di website:
trackEvent('ecommerce', 'add_to_cart', namaProduct);  // Tambah ke keranjang
trackEvent('product', 'view_detail', namaProduct);     // Lihat detail produk
trackEvent('filter', 'kategori', namaKategori);        // Filter kategori
trackEvent('checkout', 'begin_checkout', 'cart');       // Mulai checkout
trackEvent('checkout', 'purchase', orderId);            // Berhasil beli
```

#### Penggunaan Data untuk Pengambilan Keputusan
- **Produk terlaris** → Prioritaskan stok bahan baku
- **Halaman bounce tinggi** → Perbaiki copywriting / loading speed
- **Kategori paling dicari** → Tambah varian produk di kategori itu
- **Waktu traffic tertinggi** → Jadwalkan promo/posting di jam tersebut
- **Funnel drop-off** → Identifikasi di mana pelanggan keluar dan perbaiki UX

### Strategi SEO

| Aspek | Implementasi |
|---|---|
| Meta Title | "Lumicake by Kay — Cake & Bakery Bandung" |
| Meta Description | Deskripsi bisnis 150 karakter dengan keyword utama |
| Alt Text | Setiap gambar memiliki alt text deskriptif |
| Heading Structure | H1 di hero, H2 di tiap section, H3 di card produk |
| Page Speed | Lazy loading gambar, minimal external dependency |
| Mobile-First | Responsive design, tidak ada elemen yang overflow |
| Local SEO | Mencantumkan alamat lengkap di footer dan kontak |

**Target Keywords:**
- "kue ultah Bandung"
- "custom cake Bandung murah"
- "pesan kue online Bandung"
- "bakery aesthetic Bandung"

---

## 🔒 Keamanan & Pemeliharaan

### Keamanan Transaksi
- **SSL/HTTPS:** GitHub Pages sudah otomatis HTTPS
- **Validasi Form Client-Side:** Validasi nama, email, HP, dan alamat sebelum submit
- **Tidak Ada Input Kartu:** Website tidak meminta atau menyimpan data kartu kredit/debit sama sekali; pembayaran dilakukan lewat QRIS/transfer manual
- **Login Berbasis Role:** Akses Panel Admin (kelola stok, produk, pesanan, akun) hanya terbuka untuk akun dengan role admin
- **LocalStorage Aman:** Keranjang, pesanan, dan data akun tersimpan lokal di browser, tidak ada data sensitif seperti kartu atau OTP

> ⚠️ Catatan: karena ini proyek akademik berbasis front-end murni (tanpa backend/database), penyimpanan akun & pesanan di `localStorage` bersifat demo — cocok untuk simulasi alur bisnis, namun untuk produksi sesungguhnya perlu backend, database, dan payment gateway resmi yang tersertifikasi.

### Rencana Pemeliharaan
| Frekuensi | Kegiatan |
|---|---|
| Harian | Pantau pesan WA & email, proses pesanan baru |
| Mingguan | Update stok produk, review GA4, posting konten media sosial |
| Bulanan | Evaluasi performa website, update foto produk, review harga |
| Per Semester | Evaluasi strategi bisnis, tambah/hapus produk, redesign minor |

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Keterangan |
|---|---|
| HTML5 | Struktur semantik, accessibility (ARIA) |
| CSS3 | Flexbox, CSS Grid, Custom Properties (variables), animasi |
| JavaScript ES6+ | Vanilla JS, localStorage, event handling, debounce |
| Google Fonts | Cormorant Garamond (display) + DM Sans (body) |
| Google Analytics 4 | Event tracking & analisis perilaku pengunjung |
| GitHub Pages | Deployment & hosting gratis |
| Git | Version control dengan commit history yang rapi |

> ⚠️ **Tidak menggunakan framework apapun (Bootstrap/Tailwind/React)** — Semua CSS dan JS ditulis dari nol untuk memaksimalkan kontrol dan pemahaman fundamental web development.

---

## 👩‍💻 Informasi Akademik

| | |
|---|---|
| **Nama** | Kayla Adelia Putri |
| **Mata Kuliah** | KAIT II |
| **Program Studi** | Administrasi Bisnis |
| **Nim** | 209250085 |
| **Kelas** | Administrasi Bisnis 3 / ABI 3 |
| **Semester** | 2 |
| **Judul Proyek** | Membangun Website E-Commerce Fungsional dengan Integrasi Strategi Bisnis Modern |

---

<p align="center">Made with 🌸 by <strong>Kayla Adelia Putri</strong> · Lumicake by Kay © 2026</p>
