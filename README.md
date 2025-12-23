# 📋 Papan Pengumuman Kehendak Nikah - KUA Ambulu

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://kuaambulu.github.io/SIKEN9/index.html)
[![Version](https://img.shields.io/badge/Version-2.3-blue)](https://github.com/kuaambulu/SIKEN9)
[![License](https://img.shields.io/badge/License-KUA%20Ambulu-green)](https://github.com/kuaambulu/SIKEN9)

Website digital untuk pengumuman kehendak nikah sesuai PMA No. 30 Tahun 2024 dengan sistem privacy-first yang melindungi data sensitif pengguna.

## 🌐 Live Demo

**URL**: [https://kuaambulu.github.io/SIKEN9/index.html](https://kuaambulu.github.io/SIKEN9/index.html)

---

## ✨ Fitur Utama

### 🔍 Pencarian Canggih
- Real-time search tanpa reload
- 4 parameter: Nama Laki-Laki, Nama Perempuan, Tanggal, Hari
- Case-insensitive dan partial match support
- **TIDAK termasuk nomor pemeriksaan** untuk privasi

### 🔐 Smart Privacy Protection (NEW! v2.3)
- **TTL Default Hidden**: Data Tempat Tanggal Lahir disembunyikan secara default
- **Auto-Show pada Pencarian Nama Lengkap**: TTL otomatis muncul HANYA saat pencarian exact match nama lengkap
- **Indicator Visual**: Badge "🔒 TTL Ditampilkan" muncul saat TTL terlihat
- **Privacy-First Approach**: Melindungi data sensitif (TTL Calon Pengantin & Wali Nikah) kecuali untuk pihak yang berkepentingan
- **Smooth Animation**: Transisi halus saat TTL muncul/hilang

### 📄 Pagination Cerdas
- **Desktop**: 3×1 grid (3 kartu per halaman)
- **Tablet**: 2×1 grid (2 kartu per halaman)
- **Mobile**: 1×1 grid (1 kartu per halaman)
- Auto-adjust responsive

### 📅 Sorting Otomatis
- Urutkan berdasarkan tanggal akad terdekat
- Zona waktu WIB (UTC+7)
- Parser tanggal Bahasa Indonesia

### ⏰ Countdown Badge
- 6 kategori waktu dengan warna berbeda:
  - 🔴 Hari Ini
  - 🟠 Besok
  - 🟡 2-7 Hari Lagi
  - 🟢 8-30 Hari Lagi
  - 🔵 31+ Hari Lagi
  - ⚪ Sudah Dilaksanakan

### 🎨 Desain Modern
- Tema hijau dengan gradasi
- Perpaduan batik dan teknologi
- Fully responsive (desktop, tablet, mobile)
- Smooth animations

### 📊 Statistik Live
- Total pengumuman aktif
- Jumlah hasil pencarian
- Update real-time

---

## 📂 Struktur File

```
SIKEN9/
├── index.html          # File HTML utama (v2.3)
├── css/
│   └── style.css       # Stylesheet dengan TTL default hidden
├── js/
│   └── script.js       # JavaScript dengan smart privacy logic
├── asset/
│   ├── logo.png        # Logo Kemenag
│   └── Icon.png        # Favicon
└── README.md           # Dokumentasi ini
```

---

## 🚀 Teknologi yang Digunakan

- **HTML5** - Struktur website
- **CSS3** - Styling dan animasi dengan privacy-first design
- **JavaScript (ES6)** - Logic, interaksi & smart privacy features
- **Google Apps Script** - Backend API
- **Google Spreadsheet** - Database
- **Google Analytics** - Tracking & monitoring
- **GitHub Pages** - Hosting

---

## 📦 Instalasi & Setup

### Prasyarat
- Akun Google (untuk Spreadsheet & Apps Script)
- Akun GitHub (untuk hosting)
- Browser modern (Chrome, Firefox, Safari, Edge)

### Langkah Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/kuaambulu/SIKEN9.git
   cd SIKEN9
   ```

2. **Setup Google Spreadsheet**
   - Buat Spreadsheet baru
   - Buat sheet bernama "Data Pengumuman"
   - Setup 29 kolom (A-AC) sesuai dokumentasi

3. **Deploy Apps Script**
   - Extensions → Apps Script
   - Copy kode dari dokumentasi
   - Deploy sebagai Web App
   - Set "Who has access" = Anyone
   - Copy URL Web App

4. **Konfigurasi JavaScript**
   - Edit `js/script.js`
   - Ganti `WEBAPP_URL` dengan URL dari langkah 3
   ```javascript
   const WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

5. **Setup Google Analytics (Opsional)**
   - Edit `index.html` baris 3-12
   - Ganti `G-C5WPG6Z79G` dengan ID Analytics Anda

6. **Deploy ke GitHub Pages**
   - Push file ke repository
   - Settings → Pages
   - Source: main branch
   - Simpan

7. **Akses Website**
   - https://[username].github.io/SIKEN9/index.html

---

## 🔧 Konfigurasi

### Update URL Web App

Edit file `js/script.js` baris 2:
```javascript
const WEBAPP_URL = 'YOUR_WEBAPP_URL_HERE';
```

### Ganti Nomor WhatsApp

Edit file `index.html` (bagian footer contact):
```html
<a href="https://wa.me/6282146035081" ...>
```

### Update Media Sosial

Edit file `index.html` (bagian footer social):
```html
<a href="https://www.instagram.com/kuaambulu/" ...>
<a href="https://www.facebook.com/share/1MjeCrXmgN/" ...>
<a href="https://www.tiktok.com/@kua.ambulu123" ...>
```

### Ubah Tema Warna

Edit file `css/style.css` baris 9-10:
```css
body {
    background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #43a047 100%);
}
```

### Konfigurasi Smart Privacy (v2.3)

Sistem privacy bekerja otomatis tanpa konfigurasi tambahan:
- TTL default hidden untuk semua pengunjung
- TTL auto-show saat pencarian nama lengkap (exact match)
- Logic ada di `js/script.js` fungsi `shouldShowTTL()`

---

## 📊 Struktur Data Spreadsheet

### Kolom Wajib (29 kolom A-AC):

| Kolom | Field | Contoh | Format Baru |
|-------|-------|--------|-------------|
| A | Status | TRUE/FALSE | - |
| B | Nomor Pemeriksaan | NPXXXX3509121MMYYYY | **Update format** |
| C-I | Data Calon Laki-Laki | Nama, Bin, TTL, dll | - |
| J-P | Data Calon Perempuan | Nama, Binti, TTL, dll | - |
| Q-Z | Data Wali Nikah | Jenis, Nama, dll | - |
| AA-AC | Jadwal Nikah | Hari, Tanggal, Tempat | - |

**Format Nomor Pemeriksaan (Kolom B)**:
- **NPXXXX**: Prefix nomor pemeriksaan (contoh: NP0001, NP0234)
- **3509121**: Kode wilayah/identifikasi
- **MMYYYY**: Bulan dan Tahun (contoh: 112024 = November 2024)
- **Contoh lengkap**: `NP00013509121112024`

Detail lengkap: Lihat dokumentasi di folder `docs/`

---

## 🎯 Cara Penggunaan

### Untuk Petugas KUA

1. **Input Data Baru**
   - Buka Google Spreadsheet
   - Tambah baris baru
   - Isi semua kolom
   - **Format Nomor Pemeriksaan**: NPXXXX3509121MMYYYY
   - Set Status = TRUE

2. **Sembunyikan Data**
   - Ubah Status = FALSE
   - Data tidak tampil di website tapi tetap tersimpan

3. **Update Data**
   - Edit langsung di Spreadsheet
   - Perubahan otomatis muncul dalam 5 menit

### Untuk Masyarakat

1. **Cari Pengumuman (Tanpa Nomor Pemeriksaan)**
   - Ketik nama/tanggal di kolom search
   - Hasil muncul real-time
   - **Privasi**: Nomor pemeriksaan tidak bisa dicari untuk keamanan

2. **Lihat Detail**
   - Scroll card untuk lihat info lengkap
   - Perhatikan countdown badge untuk jadwal
   - **TTL tersembunyi** secara default

3. **Melihat TTL (Smart Privacy)**
   - **Cara 1**: Ketik **nama lengkap** calon pengantin di search
   - Sistem akan otomatis menampilkan TTL jika nama exact match
   - Badge "🔒 TTL Ditampilkan" akan muncul
   - **Cara 2**: Hanya pihak berkepentingan yang perlu melihat TTL

4. **Lapor Keberatan**
   - Klik tombol WhatsApp di footer
   - Hubungi petugas KUA

---

## 📱 Responsive Breakpoints

| Device | Width | Grid | Items/Page |
|--------|-------|------|------------|
| Desktop Large | >1200px | 3 columns | 3 |
| Desktop | 900-1200px | 3 columns | 3 |
| Tablet | 768-900px | 2 columns | 2 |
| Mobile | <768px | 1 column | 1 |

---

## 🛠 Troubleshooting

### Website Tidak Muncul Data

**Solusi**:
1. Cek URL Web App di `js/script.js`
2. Test URL di browser (harus return JSON)
3. Pastikan ada data dengan Status = TRUE
4. Pastikan format Nomor Pemeriksaan: NPXXXX3509121MMYYYY
5. Clear browser cache (Ctrl+Shift+Delete)

### CSS Tidak Ter-load

**Solusi**:
1. Pastikan struktur folder: `css/style.css`
2. Cek link di HTML: `<link rel="stylesheet" href="css/style.css">`
3. Hard refresh: Ctrl+F5

### Search Tidak Berfungsi

**Solusi**:
1. Pastikan `js/script.js` ter-load
2. Buka Console (F12) untuk cek error
3. Pastikan JavaScript enabled di browser
4. **Ingat**: Nomor pemeriksaan tidak bisa dicari (by design)

### TTL Tidak Muncul Saat Search Nama

**Solusi**:
1. Pastikan ketik **nama lengkap** yang exact match
2. Nama harus persis sama dengan data di spreadsheet
3. Cek Console (F12) untuk debug
4. Coba clear search dan ketik ulang
5. TTL hanya muncul untuk exact match nama, bukan partial match

### TTL Muncul Padahal Tidak Search

**Solusi**:
1. Cek fungsi `shouldShowTTL()` di `js/script.js`
2. Pastikan logic exact match bekerja
3. Clear cache dan refresh

---

## 🔒 Keamanan & Privasi

- ✅ Data dengan Status = FALSE tidak akan terexpose
- ✅ Spreadsheet tetap private (hanya petugas yang bisa edit)
- ✅ Public hanya bisa READ, tidak bisa WRITE
- ✅ HTTPS secure connection via GitHub Pages
- ✅ **NEW**: TTL default hidden untuk semua pengunjung
- ✅ **NEW**: TTL hanya muncul saat pencarian nama lengkap exact match
- ✅ **NEW**: Nomor pemeriksaan tidak dapat dicari (privacy protection)
- ✅ **NEW**: Indicator visual saat TTL ditampilkan
- ✅ Privacy-first approach berdasarkan feedback monitoring & evaluasi

---

## 📝 Changelog

### Version 2.3 (2025-11-04) - Smart Privacy Update
- ✅ **FITUR BARU**: TTL default HIDDEN untuk semua pengunjung
- ✅ **FITUR BARU**: Auto-show TTL hanya saat pencarian nama lengkap (exact match)
- ✅ **FITUR BARU**: Indicator badge "🔒 TTL Ditampilkan" saat TTL visible
- ✅ **PRIVASI**: Nomor pemeriksaan dihapus dari parameter pencarian
- ✅ **UPDATE**: Format nomor pemeriksaan: NPXXXX3509121MMYYYY
- ✅ Placeholder search & hint text diperbarui
- ✅ Smooth animation saat TTL muncul/hilang
- ✅ Logic smart privacy dengan exact name matching
- ✅ Berdasarkan feedback monitoring & evaluasi pengguna
- ✅ Print mode: TTL tetap hidden
- ✅ Responsive di semua device

### Version 2.2 (2025-11-04) - Privacy Update
- ✅ Toggle Hide/Show TTL untuk privasi data
- ✅ Tombol visual dengan ikon mata (👁️ / 👁️‍🗨️)
- ✅ State persisten dengan localStorage
- ✅ Smooth animation saat hide/show

### Version 2.1 (2025-10-31)
- ✅ File dipisah menjadi HTML, CSS, JS
- ✅ Footer lengkap dengan info KUA Ambulu
- ✅ Social media links (Instagram, Facebook, TikTok)
- ✅ Developer credit
- ✅ Google Analytics integration

### Version 2.0 (2025-10-29)
- ✅ Fitur pencarian real-time
- ✅ Pagination responsive
- ✅ Sorting berdasarkan tanggal terdekat
- ✅ Countdown badge dinamis
- ✅ Tema hijau modern
- ✅ Stats bar

### Version 1.0 (2025-10-27)
- ✅ Basic display pengumuman
- ✅ Tema biru
- ✅ Tanpa pagination

---

## 🤝 Contributing

Kontribusi untuk pengembangan sistem ini sangat diterima!

### Cara Berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Guidelines:
- Ikuti coding style yang ada
- Test di berbagai browser dan device
- Update dokumentasi jika perlu
- Tambahkan comments untuk kode complex
- **PRIORITAS**: Jaga privasi dan keamanan data pengguna

---

## 📞 Kontak & Support

### Kantor Urusan Agama Kecamatan Ambulu
- **Alamat**: Jl. Watu Ulo No. 113 Tegalsari, Ambulu, Kab. Jember. 68172
- **WhatsApp**: [082146035081](https://wa.me/6282146035081)
- **Email**: kua.ambulu@kemenag.go.id

### Social Media
- **Instagram**: [@kuaambulu](https://www.instagram.com/kuaambulu/)
- **Facebook**: [KUA Ambulu](https://www.facebook.com/share/1MjeCrXmgN/)
- **TikTok**: [@kua.ambulu123](https://www.tiktok.com/@kua.ambulu123)

### Developer
- **Developed by**: ZR48
- **GitHub Issues**: [Report Bug](https://github.com/kuaambulu/SIKEN9/issues)

---

## 📄 License

Copyright © 2025 Kantor Urusan Agama Kecamatan Ambulu, Kabupaten Jember

Website ini dibuat untuk keperluan pelayanan publik KUA Kecamatan Ambulu sesuai dengan PMA No. 30 Tahun 2024 tentang Pengumuman Kehendak Nikah dengan mengedepankan privasi dan keamanan data masyarakat.

---

## 🙏 Acknowledgments

- Kementerian Agama RI
- Google (Sheets, Apps Script, Analytics)
- GitHub (Hosting)
- Tim IT KUA Ambulu
- **Masyarakat Kecamatan Ambulu** atas feedback monitoring & evaluasi yang konstruktif
- Semua pihak yang telah memberikan kritik dan saran untuk peningkatan privasi

---

## 📚 Dokumentasi Tambahan

- [Panduan Setup Lengkap](Docs/SETUP_GUIDE.md)
- [FAQ](Docs/FAQ.md)
- [API Documentation](Docs/API_DOCS.md)
- [Troubleshooting Guide](Docs/TROUBLESHOOTING.md)
- [Privacy Policy](Docs/PRIVACY.md)
- [Smart Privacy Feature Guide](Docs/SMART_PRIVACY.md) - NEW!

---

## ⭐ Star History

Jika project ini bermanfaat, berikan ⭐ untuk support pengembangan!

---

**Dibuat dengan ❤️ oleh ZR48 untuk KUA Kecamatan Ambulu**

*Mempermudah Pelayanan, Meningkatkan Kepuasan, Melindungi Privasi*

**#PrivacyFirst #DataProtection #DigitalKUA**
