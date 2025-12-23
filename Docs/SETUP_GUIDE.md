# 📖 Setup Guide - Papan Pengumuman Kehendak Nikah

Panduan lengkap untuk setup sistem dari awal hingga deployment.

---

## 📋 Prasyarat

### 1. Akun Yang Dibutuhkan:
- ✅ **Google Account** (untuk Spreadsheet & Apps Script)
- ✅ **GitHub Account** (untuk hosting website)

### 2. Tools & Software:
- ✅ **Browser Modern**: Chrome, Firefox, atau Edge (versi terbaru)
- ✅ **Text Editor** (opsional): VS Code, Sublime Text, atau Notepad++
- ✅ **Git** (opsional): Untuk command line deployment

### 3. Pengetahuan Dasar:
- ✅ Cara menggunakan Google Sheets
- ✅ Basic HTML/CSS/JavaScript (untuk kustomisasi)
- ✅ Navigasi GitHub (untuk deployment)

---

## 🎯 Alur Setup

```
Step 1: Setup Google Spreadsheet
    ↓
Step 2: Setup Google Apps Script
    ↓
Step 3: Deploy Web App
    ↓
Step 4: Konfigurasi File Website
    ↓
Step 5: Deploy ke GitHub Pages
    ↓
Step 6: Testing & Verification
    ↓
Step 7: Go Live! 🎉
```

---

## 📊 STEP 1: Setup Google Spreadsheet

### 1.1 Buat Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **+ Blank** (Spreadsheet kosong)
3. Rename file:
   ```
   Database Pengumuman Nikah KUA Ambulu
   ```
4. Klik **Share** → Set ke **Restricted** (private)

### 1.2 Rename Sheet

1. Klik kanan pada tab **Sheet1** di bawah
2. Pilih **Rename**
3. Ganti nama menjadi: `Data Pengumuman` (persis seperti ini, case-sensitive)

### 1.3 Setup Header (Baris 1)

Copy-paste header berikut ke baris 1 (A1 sampai AC1):

```
Status | Nomor Pemeriksaan | Nama Laki-Laki | Bin Laki-Laki | TTL Laki-Laki | Kewarganegaraan Laki-Laki | Agama Laki-Laki | Pekerjaan Laki-Laki | Alamat Laki-Laki | Nama Perempuan | Binti Perempuan | TTL Perempuan | Kewarganegaraan Perempuan | Agama Perempuan | Pekerjaan Perempuan | Alamat Perempuan | Jenis Wali | Hubungan Wali | Sebab Wali | Nama Wali | Bin Wali | TTL Wali | Kewarganegaraan Wali | Agama Wali | Pekerjaan Wali | Alamat Wali | Hari Nikah | Tanggal Nikah | Tempat Nikah
```

**Atau import template CSV:**
1. Download template CSV dari repository
2. File → Import → Upload
3. Replace current sheet

### 1.4 Format Header

1. **Bold header**: Select A1:AC1 → Bold
2. **Background color**: Hijau (#66bb6a)
3. **Text color**: Putih
4. **Alignment**: Center
5. **Freeze header**: View → Freeze → 1 row

### 1.5 Set Column Width

| Kolom | Lebar | Keterangan |
|-------|-------|------------|
| A | 80px | Status |
| B | 120px | Nomor Pemeriksaan |
| C-H | 150px | Data Laki-Laki |
| I | 250px | Alamat Laki-Laki |
| J-O | 150px | Data Perempuan |
| P | 250px | Alamat Perempuan |
| Q-Z | 150px | Data Wali |
| AA-AC | 150px | Jadwal Nikah |

### 1.6 Data Validation

**Untuk Kolom A (Status):**
1. Select A2:A1000
2. Data → Data validation
3. Criteria: **List of items**: `TRUE,FALSE`
4. On invalid data: **Reject input**
5. Show validation help text: "Pilih TRUE untuk tampilkan, FALSE untuk sembunyikan"
6. Save

**Untuk Kolom Q (Jenis Wali):**
1. Select Q2:Q1000
2. Data → Data validation
3. Criteria: **List of items**: `Nasab,Hakim`
4. Save

### 1.7 Input Data Contoh

Input minimal 1 data untuk testing:

| A | B | C | ... |
|---|---|---|-----|
| TRUE | NPXXXX3509121XXXXXX | Ahmad Fauzi | ... |

**Contoh data lengkap:**
```
TRUE | NPXXXX3509121XXXXXX | Ahmad Fauzi | Abdullah | Jember, 15 Januari 1995 | WNI | Islam | Wiraswasta | Jl. Merdeka No. 123, Ambulu | Siti Aminah | Muhammad | Jember, 20 Maret 1997 | WNI | Islam | Guru | Jl. Pahlawan No. 45, Ambulu | Nasab | Ayah Kandung | - | Muhammad | Ahmad | Jember, 10 Juni 1970 | WNI | Islam | Petani | Jl. Pahlawan No. 45, Ambulu | Sabtu | 15 Desember 2025 | Masjid Al-Ikhlas, Ambulu
```

---

## ⚙️ STEP 2: Setup Google Apps Script

### 2.1 Buka Apps Script Editor

1. Di Spreadsheet, klik menu **Extensions**
2. Pilih **Apps Script**
3. Tab baru akan terbuka dengan editor

### 2.2 Hapus Kode Default

1. Hapus semua kode yang ada di `Code.gs`
2. Pastikan editor kosong

### 2.3 Copy Kode Apps Script

Copy kode berikut ke editor:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data Pengumuman');
  const data = sheet.getDataRange().getValues();
  
  // Hapus header (baris pertama)
  data.shift();
  
  const announcements = [];
  
  data.forEach(row => {
    // Kolom A (index 0) adalah status True/False
    const status = row[0];
    
    // Hanya tampilkan jika status = TRUE
    if (status === true || status === 'TRUE' || status === 'True') {
      const announcement = {
        nomorPemeriksaan: row[1] || '',
        
        // Data Calon Laki-Laki
        namaLakiLaki: row[2] || '',
        binLakiLaki: row[3] || '',
        ttlLakiLaki: row[4] || '',
        kewarganegaraanLakiLaki: row[5] || '',
        agamaLakiLaki: row[6] || '',
        pekerjaanLakiLaki: row[7] || '',
        alamatLakiLaki: row[8] || '',
        
        // Data Calon Perempuan
        namaPerempuan: row[9] || '',
        bintiPerempuan: row[10] || '',
        ttlPerempuan: row[11] || '',
        kewarganegaraanPerempuan: row[12] || '',
        agamaPerempuan: row[13] || '',
        pekerjaanPerempuan: row[14] || '',
        alamatPerempuan: row[15] || '',
        
        // Data Wali
        jenisWali: row[16] || '',
        hubunganWali: row[17] || '',
        sebabWali: row[18] || '',
        namaWali: row[19] || '',
        binWali: row[20] || '',
        ttlWali: row[21] || '',
        kewarganegaraanWali: row[22] || '',
        agamaWali: row[23] || '',
        pekerjaanWali: row[24] || '',
        alamatWali: row[25] || '',
        
        // Jadwal Nikah
        hariNikah: row[26] || '',
        tanggalNikah: row[27] || '',
        tempatNikah: row[28] || ''
      };
      
      announcements.push(announcement);
    }
  });
  
  return ContentService
    .createTextOutput(JSON.stringify(announcements))
    .setMimeType(ContentService.MimeType.JSON);
}

// Fungsi untuk testing
function testGetData() {
  const result = doGet();
  Logger.log(result.getContent());
}
```

### 2.4 Save Project

1. Klik ikon **💾 Save** atau tekan `Ctrl+S`
2. Rename project: `API Pengumuman Nikah KUA Ambulu`
3. Klik **OK**

### 2.5 Test Script (Opsional)

1. Di dropdown function, pilih `testGetData`
2. Klik **▶️ Run**
3. **Pertama kali**: Akan minta authorization
   - Klik **Review permissions**
   - Pilih akun Google Anda
   - Klik **Advanced**
   - Klik **Go to ... (unsafe)** (aman karena ini script Anda sendiri)
   - Klik **Allow**
4. Setelah authorization, klik Run lagi
5. Cek **Execution log** di bawah:
   - Harus tampil JSON array data
   - Contoh: `[{"nomorPemeriksaan":"001/N/2025",...}]`

---

## 🚀 STEP 3: Deploy Web App

### 3.1 Deploy as Web App

1. Klik tombol **Deploy** (pojok kanan atas)
2. Pilih **New deployment**
3. Klik ⚙️ (gear icon) di samping "Select type"
4. Pilih **Web app**

### 3.2 Konfigurasi Deployment

Isi form deployment:

```
Description: API Pengumuman Nikah KUA Ambulu v1.0
Execute as: Me (your-email@gmail.com)
Who has access: Anyone
```

**⚠️ PENTING**: "Who has access" HARUS "**Anyone**" agar website bisa akses API

### 3.3 Deploy

1. Klik **Deploy**
2. Tunggu proses selesai
3. Akan muncul dialog dengan informasi deployment

### 3.4 Copy Web App URL

Dialog akan menampilkan:
```
Web app
URL: https://script.google.com/macros/s/AKfycby.../exec
```

**⚠️ SANGAT PENTING**: 
- **COPY URL ini** dan simpan di tempat aman (Notepad, dll)
- URL ini akan dipakai di langkah berikutnya
- Format URL harus berakhiran `/exec`

### 3.5 Test Web App URL

1. Paste URL di browser baru (New Tab)
2. Tekan Enter
3. Harus muncul JSON data:
   ```json
   [{"nomorPemeriksaan":"001/N/2025","namaLakiLaki":"Ahmad Fauzi",...}]
   ```
4. Jika muncul JSON = **✅ Berhasil!**
5. Jika error/blank = **❌ Cek kembali langkah 2 dan 3**

---

## 💻 STEP 4: Konfigurasi File Website

### 4.1 Download/Copy File

Download 3 file dari repository:
- `index.html`
- `style.css`
- `script.js`

Atau copy dari artifacts yang sudah dibuat.

### 4.2 Edit script.js

1. Buka `script.js` dengan text editor
2. Cari baris 2:
   ```javascript
   const WEBAPP_URL = 'MASUKKAN_URL_WEB_APP_ANDA_DISINI';
   ```
3. Ganti dengan URL dari Step 3.4:
   ```javascript
   const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save file

### 4.3 Edit index.html (Opsional)

**Ganti Nomor WhatsApp** (jika perlu):
1. Buka `index.html`
2. Cari baris 62:
   ```html
   <a href="https://wa.me/6282146035081"...>
   ```
3. Ganti nomor (format: 628xxxxxxxxxx)
4. Save

**Update Alamat KUA** (jika perlu):
1. Cari baris 70:
   ```html
   Jl. Watu Ulo No. 113 Tegalsari, Ambulu, Kab. Jember. 68172
   ```
2. Update sesuai alamat Anda
3. Save

### 4.4 Test di Local (Opsional)

1. Double-click `index.html`
2. Akan terbuka di browser
3. Cek apakah:
   - ✅ CSS ter-load (tampilan hijau, grid layout)
   - ✅ Data muncul dari Spreadsheet
   - ✅ Search berfungsi
   - ✅ Pagination muncul (jika data > 16)

---

## 🌐 STEP 5: Deploy ke GitHub Pages

### 5.1 Login ke GitHub

1. Buka [github.com](https://github.com)
2. Login dengan akun Anda
3. Navigate ke repository: `https://github.com/kuaambulu/SIKEN9`

### 5.2 Upload Files

**Via Web Interface** (Mudah):

1. Klik tombol **Add file** → **Upload files**
2. Drag & drop 3 file:
   - `index.html`
   - `style.css`
   - `script.js`
3. Scroll ke bawah
4. Commit message: `Initial deployment - Pengumuman Nikah v2.1`
5. Klik **Commit changes**

**Via Git Command Line** (Advanced):

```bash
# Clone repository
git clone https://github.com/kuaambulu/SIKEN9.git
cd SIKEN9

# Copy files ke folder ini
cp /path/to/index.html .
cp /path/to/style.css .
cp /path/to/script.js .

# Add files
git add index.html style.css script.js

# Commit
git commit -m "Initial deployment - Pengumuman Nikah v2.1"

# Push
git push origin main
```

### 5.3 Enable GitHub Pages

1. Di repository, klik tab **Settings**
2. Scroll ke bagian **Pages** (sidebar kiri)
3. Konfigurasi:
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```
4. Klik **Save**
5. Tunggu 1-2 menit untuk build

### 5.4 Akses Website

URL website Anda:
```
https://kuaambulu.github.io/SIKEN9/
```

atau 

```
https://kuaambulu.github.io/SIKEN9/index.html
```

**Note**: File `index.html` akan otomatis jadi homepage, jadi URL bisa diakses tanpa `index.html`

---

## ✅ STEP 6: Testing & Verification

### 6.1 Functional Testing

| Test | Expected Result | Status |
|------|----------------|--------|
| Website loads | Tampilan hijau, layout grid | ☐ |
| CSS loads | Styling applied correctly | ☐ |
| JS loads | No console errors (F12) | ☐ |
| Data appears | Cards muncul dari Spreadsheet | ☐ |
| Search works | Filter data saat ketik | ☐ |
| Pagination works | Next/Prev button berfungsi | ☐ |
| Countdown badge | Badge muncul dengan warna sesuai | ☐ |
| WhatsApp link | Redirect ke WA saat diklik | ☐ |
| Social media links | IG, FB, TT bisa diklik | ☐ |

### 6.2 Responsive Testing

Test di berbagai device:

**Desktop**:
- [ ] Chrome (1920×1080)
- [ ] Firefox (1920×1080)
- [ ] Safari (1920×1080)
- [ ] Edge (1920×1080)

**Tablet**:
- [ ] iPad (1024×768)
- [ ] Android Tablet (800×1280)

**Mobile**:
- [ ] iPhone (375×667)
- [ ] Android (360×640)

### 6.3 Performance Testing

Gunakan [Google PageSpeed Insights](https://pagespeed.web.dev/):

1. Input URL: `https://kuaambulu.github.io/SIKEN9/`
2. Klik **Analyze**
3. Target score:
   - **Performance**: > 90
   - **Accessibility**: > 90
   - **Best Practices**: > 90
   - **SEO**: > 90

### 6.4 Security Testing

- [ ] URL menggunakan HTTPS (🔒)
- [ ] No mixed content warnings
- [ ] Data Status FALSE tidak terexpose
- [ ] No sensitive data in source code
- [ ] External links have `rel="noopener noreferrer"`

---

## 🎉 STEP 7: Go Live!

### 7.1 Final Checklist

- [x] Spreadsheet setup dengan data valid
- [x] Apps Script deployed dengan URL benar
- [x] Website files uploaded ke GitHub
- [x] GitHub Pages enabled dan accessible
- [x] Testing passed (functional, responsive, performance)
- [x] Documentation ready

### 7.2 Announce to Stakeholders

1. **Internal KUA**:
   - Inform kepala KUA
   - Training untuk petugas
   - Share access ke Spreadsheet

2. **Public Announcement**:
   - Post di social media (IG, FB, TikTok)
   - Sebar link ke group WhatsApp
   - Pasang barcode pengumuman di kantor


### 7.3 Monitor & Maintain

**Daily**:
- Cek data baru yang masuk
- Verifikasi countdown badge accurate
- Respond to feedback

**Weekly**:
- Backup Spreadsheet
- Review analytics (if enabled)
- Update Status FALSE untuk data lama

**Monthly**:
- Security audit
- Performance review
- Feature improvement planning

---

## 🔄 Update & Maintenance

### Update Data Spreadsheet

1. Buka Spreadsheet
2. Edit/tambah data
3. Set Status = TRUE untuk publish
4. Data otomatis update di website (maks 5 menit)

### Update Website Files

**Update HTML**:
```bash
1. Edit index.html
2. Upload ke GitHub (replace file)
3. Commit: "Update HTML - [description]"
4. Wait 1-2 minutes for rebuild
```

**Update CSS**:
```bash
1. Edit style.css
2. Upload ke GitHub (replace file)
3. Commit: "Update CSS - [description]"
4. Users may need hard refresh (Ctrl+F5)
```

**Update JavaScript**:
```bash
1. Edit script.js
2. Upload ke GitHub (replace file)
3. Commit: "Update JS - [description]"
4. Users may need hard refresh (Ctrl+F5)
```

### Re-deploy Apps Script

Jika ada perubahan kode Apps Script:

1. Edit kode di Apps Script editor
2. Save
3. Deploy → Manage deployments
4. Click ✏️ (edit) pada deployment aktif
5. Version: **New version**
6. Click **Deploy**
7. URL tetap sama (tidak perlu update di script.js)

---

## 🆘 Troubleshooting

Lihat [TROUBLESHOOTING.md](TROUBLESHOOTING.md) untuk solusi masalah umum.

**Quick fixes**:
- **Data tidak muncul**: Cek WEBAPP_URL di script.js
- **CSS tidak load**: Hard refresh (Ctrl+F5)
- **Search tidak jalan**: Cek JavaScript Console (F12)

---

## 📞 Support

Butuh bantuan?

- **WhatsApp**: 082146035081
- **Email**: kua.ambulu@kemenag.go.id
- **GitHub Issues**: [Report Bug](https://github.com/kuaambulu/SIKEN9/issues)

---

## 📚 Next Steps

Setelah setup selesai, baca dokumentasi tambahan:

- [API_DOCS.md](API_DOCS.md) - Dokumentasi API
- [FAQ.md](FAQ.md) - Pertanyaan umum
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solusi masalah
- [SECURITY.md](SECURITY.md) - Kebijakan keamanan

---

**Setup Guide Version**: 1.0  
**Last Updated**: 2025-10-30  
**Estimated Setup Time**: 45-60 minutes  
**Difficulty**: Beginner-Intermediate

---

*Selamat! Sistem Anda sudah siap digunakan! 🎊*
