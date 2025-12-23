# ❓ Frequently Asked Questions (FAQ)

Kumpulan pertanyaan yang sering diajukan tentang Papan Pengumuman Kehendak Nikah Digital KUA Ambulu.

---

## 📑 Daftar Isi

- [Umum](#-umum)
- [Fitur Pencarian](#-fitur-pencarian)
- [Pagination](#-pagination)
- [Countdown Badge](#-countdown-badge)
- [Sorting & Urutan Data](#-sorting--urutan-data)
- [Tampilan & Responsiveness](#-tampilan--responsiveness)
- [Akses & Keamanan](#-akses--keamanan)
- [Update Data](#-update-data)
- [Desain & Warna](#-desain--warna)
- [Kontak & Pengaduan](#-kontak--pengaduan)
- [Troubleshooting](#-troubleshooting)
- [Untuk Petugas KUA](#-untuk-petugas-kua)
- [Statistik](#-statistik)
- [Fitur Mendatang](#-fitur-mendatang)
- [Tips & Trik](#-tips--trik)
- [Regulasi](#-regulasi)

---

## 🌐 Umum

### Q1: Apa itu Papan Pengumuman Kehendak Nikah Digital?
**A:** Website online untuk mengumumkan rencana pernikahan sesuai PMA No. 30 Tahun 2024. Website ini menggantikan atau melengkapi papan pengumuman fisik di kantor KUA.

### Q2: Apakah website ini resmi?
**A:** Ya, website ini dikembangkan oleh KUA Kecamatan Ambulu, Kabupaten Jember sebagai sistem resmi pengumuman kehendak nikah.

### Q3: Bagaimana cara mengakses website?
**A:** Buka browser dan akses: https://kuaambulu.github.io/SIKEN9/

### Q4: Apakah harus registrasi untuk melihat pengumuman?
**A:** Tidak. Website ini bersifat publik dan bisa diakses tanpa registrasi atau login.

### Q5: Apakah website tersedia 24/7?
**A:** Ya. Website online 24 jam sehari, 7 hari seminggu, kecuali ada maintenance dari GitHub.

---

## 🔍 Fitur Pencarian

### Q6: Bagaimana cara mencari pengumuman tertentu?
**A:** Ketik nama, nomor pemeriksaan, atau tanggal di kolom pencarian. Hasil akan muncul secara real-time tanpa perlu klik tombol search.

### Q7: Apa saja yang bisa dicari?
**A:** Anda bisa mencari berdasarkan:
- Nama calon pengantin laki-laki
- Nama calon pengantin perempuan
- Nomor pemeriksaan (contoh: 001/N/2025)
- Tanggal akad (contoh: 15 Desember)
- Hari akad (contoh: Sabtu)

### Q8: Apakah pencarian case-sensitive?
**A:** Tidak. Pencarian tidak membedakan huruf besar/kecil. "ahmad", "Ahmad", atau "AHMAD" akan memberikan hasil yang sama.

### Q9: Bisakah mencari dengan kata kunci sebagian?
**A:** Ya! Ketik "Ahmad" akan menemukan "Ahmad Fauzi", "Ahmad Rizki", dll.

### Q10: Kenapa hasil pencarian saya kosong?
**A:** Kemungkinan:
- Salah eja nama/nomor
- Data belum diinput oleh petugas
- Status data = FALSE (tidak aktif)
- Coba keyword yang lebih pendek atau berbeda

---

## 📄 Pagination

### Q11: Berapa banyak pengumuman yang ditampilkan per halaman?
**A:** 
- **Desktop/Laptop**: 16 kartu (grid 4×4)
- **Mobile/HP**: 4 kartu (grid 1×4)

### Q12: Bagaimana cara pindah halaman?
**A:** Gunakan tombol "← Sebelumnya" atau "Selanjutnya →" di bawah grid kartu.

### Q13: Kenapa tombol pagination tidak bisa diklik?
**A:** Tombol otomatis disable jika Anda di halaman pertama (tombol Sebelumnya) atau halaman terakhir (tombol Selanjutnya).

### Q14: Apakah hasil pencarian juga menggunakan pagination?
**A:** Ya. Jika hasil pencarian lebih dari 16 item (desktop) atau 4 item (mobile), akan ada pagination.

### Q15: Bisakah langsung loncat ke halaman tertentu?
**A:** Saat ini belum ada fitur jump to page. Gunakan tombol next/previous secara berurutan.

---

## ⏰ Countdown Badge

### Q16: Apa arti warna-warna pada badge countdown?
**A:**
- 🔴 **Merah "HARI INI"**: Akad nikah hari ini
- 🟠 **Oranye Terang "Besok"**: Akad nikah besok
- 🟠 **Oranye "X Hari Lagi"**: Akad 2-7 hari lagi
- 🟢 **Hijau "X Hari Lagi"**: Akad 8-30 hari lagi
- 🔵 **Biru "X Hari Lagi"**: Akad lebih dari 30 hari
- ⚪ **Abu-abu "Sudah Dilaksanakan"**: Akad sudah lewat

### Q17: Apakah countdown update otomatis setiap hari?
**A:** Ya. Countdown menghitung berdasarkan waktu real-time zona WIB (UTC+7) dan update setiap kali halaman dibuka.

### Q18: Kenapa ada pengumuman dengan badge "Sudah Dilaksanakan"?
**A:** Data lama yang belum dinonaktifkan oleh petugas. Data ini tetap ditampilkan untuk transparansi dan arsip publik.

### Q19: Apakah countdown memperhitungkan jam?
**A:** Tidak. Countdown hanya menghitung berdasarkan tanggal (hari), bukan jam spesifik.

### Q20: Bagaimana jika tanggal di Spreadsheet salah format?
**A:** Countdown tidak akan muncul atau muncul "Sudah Dilaksanakan". Pastikan format: "DD Bulan YYYY" (contoh: 15 Desember 2025).

---

## 📊 Sorting & Urutan Data

### Q21: Bagaimana urutan pengumuman ditampilkan?
**A:** Data diurutkan berdasarkan **tanggal akad nikah terdekat** (ascending). Akad yang paling dekat ditampilkan paling atas/awal.

### Q22: Bisakah mengubah urutan sorting?
**A:** Saat ini belum ada opsi custom sorting. Default adalah sort by date ascending (terdekat dulu).

### Q23: Kenapa data "Sudah Dilaksanakan" ada di bawah?
**A:** Karena tanggalnya sudah lewat, otomatis masuk urutan terakhir setelah semua akad yang akan datang.

### Q24: Apakah sorting tetap berlaku saat pencarian?
**A:** Ya. Hasil pencarian juga tetap di-sort berdasarkan tanggal terdekat.

---

## 🖥️ Tampilan & Responsiveness

### Q25: Kenapa tampilan di HP berbeda dengan laptop?
**A:** Website ini responsive dan otomatis menyesuaikan layout dengan ukuran layar untuk kenyamanan optimal.

### Q26: Browser apa saja yang didukung?
**A:** Mendukung semua browser modern:
- ✅ Google Chrome
- ✅ Mozilla Firefox
- ✅ Safari (Mac/iOS)
- ✅ Microsoft Edge
- ✅ Opera

### Q27: Apakah perlu install aplikasi?
**A:** Tidak. Ini website berbasis browser, tidak perlu install apa pun. Cukup buka di browser.

### Q28: Bisakah print pengumuman?
**A:** Ya. Gunakan Ctrl+P (Windows) atau Cmd+P (Mac). Layout sudah dioptimalkan untuk printing.

### Q29: Kenapa loading lama?
**A:** Kemungkinan:
- Koneksi internet lambat
- Data sangat banyak (>100 pengumuman)
- Browser cache penuh (coba clear cache)
- Server Google Apps Script lambat

---

## 🔒 Akses & Keamanan

### Q30: Apakah website ini gratis?
**A:** Ya, 100% gratis dan dapat diakses siapa saja tanpa biaya.

### Q31: Apakah data pribadi saya aman?
**A:** Website ini hanya menampilkan data publik yang memang wajib diumumkan sesuai PMA 30/2024. Tidak ada input data pribadi dari pengunjung.

### Q32: Bisakah mengedit data di website?
**A:** Tidak. Pengunjung hanya bisa melihat (read-only). Edit data hanya bisa dilakukan petugas KUA melalui Spreadsheet backend.

### Q33: Apakah website tersedia 24/7?
**A:** Ya, website online 24 jam kecuali ada maintenance dari GitHub atau Google.

### Q34: Apakah butuh login untuk akses?
**A:** Tidak. Website ini public access, tidak perlu login atau registrasi.

---

## 🔄 Update Data

### Q35: Berapa lama data baru muncul di website?
**A:** Maksimal 5 menit setelah petugas input di Spreadsheet (karena auto-refresh setiap 5 menit).

### Q36: Bisakah refresh manual?
**A:** Ya. Tekan F5 atau tombol refresh di browser untuk reload data terbaru.

### Q37: Kenapa data saya tidak muncul?
**A:** Kemungkinan:
- Data belum diinput petugas KUA
- Status di Spreadsheet = FALSE
- Tunggu sampai auto-refresh (maks 5 menit)
- Coba hard refresh: Ctrl+F5

### Q38: Bagaimana cara melaporkan data yang salah?
**A:** Klik tombol "📱 Hubungi WhatsApp KUA Ambulu" di footer, atau langsung via WA: 082146035081

---

## 🎨 Desain & Warna

### Q39: Kenapa tema warnanya hijau?
**A:** Hijau melambangkan:
- ✅ Ketenangan dan kedamaian
- ✅ Pertumbuhan dan kehidupan baru
- ✅ Keberkahan (sesuai untuk pernikahan Islami)
- ✅ Ramah lingkungan dan modern

### Q40: Bisakah mengubah tema warna?
**A:** Tidak dari sisi pengguna. Hanya admin yang bisa edit CSS untuk ganti tema warna.

### Q41: Kenapa ada pola batik di background?
**A:** Untuk memberikan sentuhan budaya Indonesia dan estetika modern yang khas, memadukan tradisi dan teknologi.

### Q42: Apakah ada dark mode?
**A:** Saat ini belum ada. Fitur dark mode direncanakan untuk update mendatang (lihat roadmap).

---

## 📞 Kontak & Pengaduan

### Q43: Bagaimana cara menghubungi KUA?
**A:** Beberapa cara:
- WhatsApp: [082146035081](https://wa.me/6282146035081)
- Email: kua.ambulu@gmail.com
- Datang langsung: Jl. Watu Ulo No. 113 Tegalsari, Ambulu
- Social media: Instagram, Facebook, TikTok (link di footer)

### Q44: Apa saja yang bisa dilaporkan?
**A:** 
- Data yang salah/tidak sesuai
- Keberatan atas pengumuman nikah
- Pertanyaan seputar prosedur nikah
- Masalah teknis website
- Feedback dan saran

### Q45: Berapa lama respons dari KUA?
**A:** 
- Urgent: 1-2 jam (jam kerja)
- Normal: 1-2 hari kerja
- Jam kerja: Senin-Jumat, 08:00-16:00 WIB

---

## 🛠️ Troubleshooting

### Q46: Website tidak bisa dibuka
**A:** Coba:
1. Cek koneksi internet
2. Clear browser cache (Ctrl+Shift+Delete)
3. Gunakan browser lain
4. Coba dari device lain
5. Tunggu beberapa menit (mungkin maintenance)

### Q47: Data tidak muncul sama sekali
**A:** Kemungkinan:
- URL Web App belum dikonfigurasi (untuk admin)
- Apps Script error
- Spreadsheet kosong atau tidak ada data dengan Status = TRUE
- Network error (cek koneksi)

### Q48: Pencarian tidak berfungsi
**A:** 
1. Pastikan ketik di kolom search yang benar
2. Coba keyword yang berbeda
3. Hard refresh: Ctrl+F5
4. Coba browser lain
5. Jika masih error, laporkan ke admin

### Q49: Countdown badge tidak sesuai
**A:** 
- Pastikan tanggal di sistem benar (cek tanggal device)
- Format tanggal di Spreadsheet: "DD Bulan YYYY"
- Zona waktu: WIB (UTC+7)
- Refresh browser: F5

### Q50: Pagination tidak muncul
**A:** Pagination hanya muncul jika data lebih dari:
- Desktop: > 16 pengumuman
- Mobile: > 4 pengumuman

Jika data sedikit, tidak ada pagination.

---

## 👥 Untuk Petugas KUA

### Q51: Bagaimana cara menambah data baru?
**A:**
1. Buka Google Spreadsheet
2. Tambah baris baru
3. Isi semua kolom (A sampai AC)
4. Set kolom A (Status) = TRUE
5. Data otomatis muncul di website (maks 5 menit)

### Q52: Bagaimana cara menyembunyikan data?
**A:** Ubah kolom A (Status) dari TRUE menjadi FALSE. Data hilang dari website tapi tetap tersimpan di Spreadsheet untuk arsip.

### Q53: Bisakah menghapus data permanen?
**A:** Bisa, tapi tidak direkomendasikan. Lebih baik set Status = FALSE untuk arsip dan transparansi.

### Q54: Apa yang harus dilakukan jika ada data duplikat?
**A:**
1. Cek nomor pemeriksaan (harus unik)
2. Nonaktifkan salah satu (Status = FALSE)
3. Verifikasi data yang benar
4. Hapus atau arsipkan data duplikat

### Q55: Bagaimana cara backup data?
**A:**
1. Di Spreadsheet: File → Make a copy
2. Simpan dengan nama: "Backup_TANGGAL"
3. Lakukan backup minimal seminggu sekali
4. Simpan di Google Drive folder khusus

### Q56: Bolehkah share link Spreadsheet?
**A:** **JANGAN!** Spreadsheet harus tetap private. Hanya share URL website (GitHub Pages) ke publik.

### Q57: Bagaimana cara update nomor WhatsApp?
**A:**
1. Edit file index.html
2. Cari: `https://wa.me/6282146035081` (ada 1 tempat)
3. Ganti dengan nomor baru (format: 628xxx)
4. Re-upload ke GitHub

### Q58: Bisakah menambah kolom baru di Spreadsheet?
**A:** Tidak direkomendasikan. Jika menambah kolom, Apps Script dan website juga harus diupdate. Konsultasi dengan developer (ZR48).

---

## 📊 Statistik

### Q59: Apa arti "Total Pengumuman"?
**A:** Jumlah seluruh data dengan Status = TRUE yang tersimpan di database saat ini.

### Q60: Apa arti "Ditampilkan"?
**A:** Jumlah data yang tampil setelah filtering pencarian. Jika tidak ada pencarian, angka ini sama dengan Total.

### Q61: Bisakah melihat statistik pengunjung?
**A:** Saat ini belum ada. Untuk statistik detail, bisa integrate dengan Google Analytics (lihat dokumentasi teknis).

### Q62: Berapa rata-rata pengunjung per hari?
**A:** Data ini tersedia jika mengaktifkan Google Analytics. Tanpa analytics, data tidak tercatat.

---

## 🔮 Fitur Mendatang

### Q63: Apakah akan ada fitur download PDF?
**A:** Direncanakan di Phase 2. Saat ini bisa gunakan Print to PDF dari browser (Ctrl+P).

### Q64: Apakah akan ada notifikasi otomatis?
**A:** Direncanakan di Phase 3. Email/SMS notification untuk calon pengantin H-7, H-3, H-1.

### Q65: Apakah akan ada form input online?
**A:** Direncanakan di Phase 3. Calon pengantin bisa input data sendiri via form, lalu petugas verifikasi.

### Q66: Apakah akan ada fitur QR Code?
**A:** Direncanakan di Phase 2. Setiap pengumuman akan punya QR code unik untuk share dan tracking.

### Q67: Kapan fitur-fitur baru diluncurkan?
**A:** Roadmap:
- Phase 2 (Q1 2025): PDF export, QR code, share button
- Phase 3 (Q2 2025): Notifications, form online, dashboard admin
- Phase 4 (Q3 2025): Multi-language, voice search, PWA

---

## 💡 Tips & Trik

### Q68: Cara cepat menemukan data spesifik?
**A:**
1. Gunakan nomor pemeriksaan (paling akurat)
2. Ketik nama lengkap
3. Jika lupa nama, cari berdasarkan tanggal
4. Gunakan Ctrl+F browser sebagai alternatif

### Q69: Cara terbaik akses dari HP?
**A:**
1. Gunakan Chrome atau Safari (browser terbaru)
2. Rotate ke portrait mode (vertikal) untuk layout optimal
3. Gunakan fitur search untuk cari cepat
4. Bookmark website untuk akses mudah
5. Add to Home Screen untuk akses seperti app

### Q70: Cara print pengumuman dengan rapi?
**A:**
1. Tekan Ctrl+P (Windows) atau Cmd+P (Mac)
2. Pilih "Save as PDF" (jika ingin simpan)
3. Atau pilih printer langsung
4. Layout otomatis print-friendly (footer dsb akan hilang)
5. Pastikan orientation: Portrait

### Q71: Cara share pengumuman ke teman?
**A:**
1. Copy URL website: https://kuaambulu.github.io/SIKEN9/
2. Tambahkan info "cari nama XXX"
3. Kirim via WhatsApp/Telegram/Email
4. Atau screenshot card pengumuman (kurang disarankan, data bisa berubah)

### Q72: Cara cek apakah data sudah muncul?
**A:**
1. Buka website
2. Ketik nomor pemeriksaan di search
3. Jika muncul = sudah online ✅
4. Jika tidak = tunggu 5 menit atau hubungi petugas

---

## 🏛️ Regulasi

### Q73: Apa dasar hukum pengumuman kehendak nikah?
**A:** Berdasarkan **PMA No. 30 Tahun 2024** tentang Pengumuman Kehendak Nikah.

### Q74: Berapa lama pengumuman harus ditampilkan?
**A:** Sesuai peraturan, minimal **10 hari kerja** sebelum akad nikah.

### Q75: Apakah pengumuman wajib online?
**A:** Pengumuman bisa offline (papan fisik) atau online. Website ini sebagai tambahan untuk kemudahan akses masyarakat.

### Q76: Bisakah pengumuman dihapus sebelum waktunya?
**A:** Tidak boleh. Pengumuman harus tetap ditampilkan hingga waktu yang ditentukan, kecuali ada pembatalan resmi dari calon pengantin.

### Q77: Apa yang harus dilakukan jika ada keberatan?
**A:** Segera hubungi KUA via WhatsApp (082146035081). Sertakan nomor pemeriksaan dan alasan keberatan. KUA akan proses sesuai prosedur.

---

## 📚 Resources

### Q78: Dimana bisa baca dokumentasi lengkap?
**A:** Check repository GitHub:
- [SETUP_GUIDE.md](Docs/SETUP_GUIDE.md) - Panduan setup
- [API_DOCS.md](Docs/API_DOCS.md) - Dokumentasi API
- [TROUBLESHOOTING.md](Docs/TROUBLESHOOTING.md) - Solusi masalah
- [SECURITY.md](Docs/SECURITY.md) - Kebijakan keamanan

### Q79: Bagaimana cara berkontribusi ke project?
**A:** 
1. Fork repository di GitHub
2. Buat branch baru untuk fitur/fix
3. Commit perubahan
4. Submit Pull Request
5. Tunggu review dari maintainer

### Q80: Siapa yang mengembangkan sistem ini?
**A:** Dikembangkan oleh **ZR48** untuk KUA Kecamatan Ambulu, Kabupaten Jember.

---

## 🎓 Quick Reference

### Keyboard Shortcuts
```
F5           = Refresh halaman
Ctrl+F5      = Hard refresh (clear cache)
Ctrl+F       = Find in page
Ctrl+P       = Print
Ctrl++       = Zoom in
Ctrl+-       = Zoom out
Ctrl+0       = Reset zoom
```

### URL Penting
```
Website: https://kuaambulu.github.io/SIKEN9/
WhatsApp: https://wa.me/6282146035081
Instagram: @kuaambulu
Facebook: KUA Ambulu
TikTok: @kua.ambulu123
```

### Format Data
```
Nomor: NPXXXX3509121BBTTTT (contoh: NP00013509121112025)
Tanggal: DD Bulan YYYY (contoh: 11 November 2025)
TTL: Tempat, DD Bulan YYYY
Status: TRUE atau FALSE
```

---

## 📞 Masih Ada Pertanyaan?

Jika pertanyaan Anda tidak ada dalam FAQ ini:

**Hubungi Kami:**
- **WhatsApp**: 082146035081
- **Email**: kua.ambulu@gmail.com
- **Instagram**: [@kuaambulu](https://www.instagram.com/kuaambulu/)
- **Facebook**: [KUA Ambulu](https://www.facebook.com/share/1MjeCrXmgN/)
- **TikTok**: [@kua.ambulu123](https://www.tiktok.com/@kua.ambulu123)

**Format Pertanyaan:**
```
Nama: [Nama Anda]
Pertanyaan: [Detail pertanyaan]
Screenshot: [Jika ada error]
```

**Atau kunjungi**:
```
Kantor KUA Kecamatan Ambulu
Jl. Watu Ulo No. 113 Tegalsari, Ambulu, Kab. Jember. 68172
Jam: Senin-Kamis, 07:30-16:00 WIB
     Jum'at, 07.30-16.30 WIB
```

---

**FAQ Version**: 1.0  
**Last Updated**: 2025-10-30  
**Total Questions**: 80  
**Maintained by**: ZR48

---

*Terima kasih telah menggunakan sistem Papan Pengumuman Kehendak Nikah Digital KUA Ambulu! 💚*
