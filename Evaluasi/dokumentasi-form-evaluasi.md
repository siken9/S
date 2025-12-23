# 📋 Dokumentasi Form Evaluasi & Monitoring SIKEN9

## 📖 Tentang Form

Form Evaluasi & Monitoring SIKEN9 adalah instrumen pengumpulan data untuk mengukur efektivitas dan kepuasan pengguna terhadap Sistem Informasi Kehendak Nikah (N9) Digital di KUA Ambulu.

**Tujuan:**
- Mengukur tingkat kepuasan pengguna
- Mengevaluasi aksesibilitas dan kemudahan penggunaan
- Mengidentifikasi masalah dan area perbaikan
- Mengumpulkan saran untuk pengembangan sistem
- Menyediakan data pendukung untuk laporan aktualisasi

---

## 📊 Struktur Form

### Bagian 1: Identitas Responden (7 pertanyaan)
Mengumpulkan data demografi responden:
- Nama Lengkap
- Umur
- Jenis Kelamin
- Pendidikan Terakhir
- Pekerjaan
- Status Responden (Calon Pengantin, Keluarga, Masyarakat, Petugas KUA, Lainnya)

**Tujuan:** Segmentasi data untuk analisis yang lebih detail

---

### Bagian 2: Aksesibilitas Website (3 pertanyaan)
Mengevaluasi kemudahan akses:
- Sumber informasi tentang SIKEN9 (multiple choice)
- Device yang digunakan (Smartphone, Tablet, Laptop, Desktop)
- Kemudahan menemukan website (Skala 1-5)

**Metrik:**
- % pengguna per device
- Efektivitas promosi/sosialisasi
- Tingkat kemudahan akses

---

### Bagian 3: Kemudahan Penggunaan (4 pertanyaan)
Mengevaluasi user experience:
- Tampilan website (Skala Likert 1-5)
- Fitur pencarian (Skala Likert 1-5)
- Kelengkapan informasi (Skala Likert 1-5)
- Kompatibilitas device (Skala Likert 1-5)

**Metrik:**
- Rata-rata skor per aspek
- Identifikasi area yang perlu perbaikan

---

### Bagian 4: Manfaat SIKEN9 (3 pertanyaan)
Mengevaluasi perceived benefits:
- Kemudahan akses informasi (Skala Likert 1-5)
- Kepraktisan vs papan fisik (Skala Likert 1-5)
- Peningkatan transparansi (Skala Likert 1-5)

**Metrik:**
- Perceived value dari digitalisasi
- Dampak terhadap pelayanan

---

### Bagian 5: Tingkat Kepuasan (2 pertanyaan)
Mengukur kepuasan keseluruhan:
- Kepuasan keseluruhan (Rating 1-5 bintang)
- Kesediaan merekomendasikan (Ya/Mungkin/Tidak)

**Metrik:**
- Overall satisfaction score
- Net Promoter Score (NPS)

---

### Bagian 6: Saran & Masukan (4 pertanyaan)
Mengumpulkan feedback kualitatif:
- Kendala yang dialami (text area)
- Saran perbaikan (text area)
- Fitur tambahan yang diinginkan (text area)
- Komentar tambahan (text area)

**Tujuan:**
- Identifikasi bug/masalah
- Ide pengembangan fitur
- Feedback detail dari pengguna

---

## 🚀 Setup & Deployment

### Langkah 1: Buat Google Spreadsheet

1. Buat Spreadsheet baru: "Data Evaluasi SIKEN9"
2. Sheet akan otomatis dibuat saat data pertama masuk
3. Nama sheet: "Evaluasi SIKEN9"

### Langkah 2: Setup Google Apps Script

1. Di Spreadsheet, klik **Extensions** → **Apps Script**
2. Hapus kode default
3. Copy-paste kode dari artifact "Apps Script - Form Evaluasi SIKEN9"
4. Save project dengan nama: "Form Evaluasi SIKEN9 API"

### Langkah 3: Deploy Web App

1. Klik **Deploy** → **New deployment**
2. Type: **Web app**
3. Konfigurasi:
   ```
   Description: Form Evaluasi SIKEN9 API
   Execute as: Me
   Who has access: Anyone
   ```
4. Click **Deploy**
5. **COPY URL Web App** yang muncul

### Langkah 4: Konfigurasi Form HTML

1. Buka file `form-evaluasi-siken9.html`
2. Cari baris 5:
   ```javascript
   const FORM_WEBAPP_URL = 'MASUKKAN_URL_WEB_APP_FORM_ANDA_DISINI';
   ```
3. Ganti dengan URL dari Langkah 3:
   ```javascript
   const FORM_WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
4. Save file

### Langkah 5: Upload ke GitHub

1. Upload file: `form-evaluasi-siken9.html`
2. Commit message: "Add evaluation form for SIKEN9"
3. File akan accessible di: `https://kuaambulu.github.io/SIKEN9/form-evaluasi-siken9.html`

### Langkah 6: Test Form

1. Buka form di browser
2. Isi semua field
3. Click "Kirim Evaluasi"
4. Cek Spreadsheet → Sheet "Evaluasi SIKEN9" harus ada data baru

---

## 📈 Analisis Data

### Generate Laporan Statistik

Di Apps Script, jalankan fungsi `generateReport()`:

1. Apps Script Editor
2. Select function: `generateReport`
3. Click **Run**
4. Check Spreadsheet → Sheet baru "Laporan Statistik"

**Isi Laporan:**
- Total Responden
- Rata-rata Kepuasan
- Breakdown Device Usage (%)
- Breakdown Status Responden (%)
- Breakdown Rekomendasi (%)

### Metrik Utama (KPI)

#### 1. Overall Satisfaction Score (OSS)
```
OSS = (Σ Kepuasan Keseluruhan) / Total Responden
Target: ≥ 4.0 / 5.0
```

#### 2. Net Promoter Score (NPS)
```
NPS = (% Ya - % Tidak) × 100
Target: ≥ 50
```

#### 3. Average Usability Score
```
Avg Usability = (Tampilan + Fitur Search + Kelengkapan + Kompatibilitas) / 4
Target: ≥ 4.0 / 5.0
```

#### 4. Benefit Perception Score
```
Benefit Score = (Manfaat Akses + Manfaat Praktis + Manfaat Transparansi) / 3
Target: ≥ 4.0 / 5.0
```

---

## 📊 Contoh Visualisasi Data

### Chart 1: Kepuasan Keseluruhan
```
5 Bintang: ████████████████████ 60%
4 Bintang: ████████████ 30%
3 Bintang: ████ 8%
2 Bintang: ██ 2%
1 Bintang: 0%
```

### Chart 2: Device Usage
```
Smartphone: ██████████████████ 65%
Laptop:     ████████ 25%
Tablet:     ████ 8%
Desktop:    ██ 2%
```

### Chart 3: Status Responden
```
Calon Pengantin:         ████████████ 45%
Keluarga Calon Pengantin: ████████ 30%
Masyarakat Umum:         ████ 15%
Petugas KUA:             ████ 10%
```

---

## 📝 Template Laporan Aktualisasi

### A. Executive Summary

```
EVALUASI SISTEM INFORMASI KEHENDAK NIKAH (SIKEN9)
KUA Kecamatan Ambulu, Kabupaten Jember

Periode: [Tanggal Awal] s/d [Tanggal Akhir]

Total Responden: [N] orang
Rata-rata Kepuasan: [X.X] / 5.0
Net Promoter Score: [XX]

Kesimpulan:
Implementasi SIKEN9 mendapat respon [POSITIF/CUKUP/NEGATIF] dari pengguna
dengan tingkat kepuasan [TINGGI/SEDANG/RENDAH].
```

### B. Profil Responden

```
1. Jenis Kelamin:
   - Laki-laki: XX%
   - Perempuan: XX%

2. Pendidikan:
   - SD/SMP: XX%
   - SMA/SMK: XX%
   - D3/S1: XX%
   - S2/S3: XX%

3. Status Responden:
   - Calon Pengantin: XX%
   - Keluarga: XX%
   - Masyarakat Umum: XX%
   - Petugas KUA: XX%
```

### C. Hasil Evaluasi

```
1. AKSESIBILITAS
   - Kemudahan Akses: [X.X] / 5.0
   - Device Dominan: [Smartphone/Laptop/dll]
   - Sumber Info Utama: [Media Sosial/dll]

2. KEMUDAHAN PENGGUNAAN
   - Tampilan Website: [X.X] / 5.0
   - Fitur Pencarian: [X.X] / 5.0
   - Kelengkapan Info: [X.X] / 5.0
   - Kompatibilitas: [X.X] / 5.0
   Rata-rata: [X.X] / 5.0

3. MANFAAT
   - Kemudahan Akses Info: [X.X] / 5.0
   - Kepraktisan: [X.X] / 5.0
   - Transparansi: [X.X] / 5.0
   Rata-rata: [X.X] / 5.0

4. KEPUASAN
   - Overall Satisfaction: [X.X] / 5.0
   - Rekomendasi Ya: XX%
   - Net Promoter Score: [XX]
```

### D. Masalah & Saran

```
MASALAH YANG DITEMUKAN:
1. [Masalah 1] - dilaporkan oleh XX responden
2. [Masalah 2] - dilaporkan oleh XX responden
3. dst...

SARAN PERBAIKAN:
1. [Saran 1] - diusulkan oleh XX responden
2. [Saran 2] - diusulkan oleh XX responden
3. dst...

FITUR YANG DIINGINKAN:
1. [Fitur 1] - diminati oleh XX responden
2. [Fitur 2] - diminati oleh XX responden
3. dst...
```

### E. Rencana Tindak Lanjut

```
JANGKA PENDEK (1-3 bulan):
1. Fix bug [A]
2. Improve fitur [B]
3. Sosialisasi lebih intensif

JANGKA MENENGAH (3-6 bulan):
1. Tambah fitur [C]
2. Integrasi dengan [D]
3. Training petugas

JANGKA PANJANG (6-12 bulan):
1. Pengembangan [E]
2. Scalability improvement
3. Advanced analytics
```

---

## 🎯 Best Practices

### Untuk Pengumpulan Data:

1. **Periode Evaluasi:** Minimal 1 bulan setelah launching
2. **Target Responden:** Minimal 30 responden untuk data valid
3. **Distribusi Form:**
   - QR Code di papan pengumuman fisik
   - Link di website SIKEN9
   - Share di social media KUA
   - Blast WA ke group RT/RW

4. **Incentive (Optional):**
   - Doorprize untuk responden
   - Merchandise KUA
   - Apresiasi di social media

### Untuk Analisis:

1. **Segmentasi Data:**
   - Analisis per status responden
   - Analisis per device
   - Analisis per demografi

2. **Tren Analysis:**
   - Bandingkan periode sebelum/sesudah perbaikan
   - Track perubahan skor kepuasan
   - Monitor adoption rate

3. **Qualitative Analysis:**
   - Categorize feedback/saran
   - Prioritize masalah berdasarkan frekuensi
   - Identify quick wins vs long-term improvements

---

## 📞 Support & Maintenance

### Update Form:

Jika perlu menambah/mengubah pertanyaan:

1. Edit HTML form
2. Update Apps Script untuk handle field baru
3. Update header Spreadsheet (manual atau via code)
4. Test dengan data dummy
5. Re-deploy

### Export Data:

**Format CSV:**
```
File → Download → Comma-separated values (.csv)
```

**Format Excel:**
```
File → Download → Microsoft Excel (.xlsx)
```

**Via Apps Script:**
```javascript
// Export to Google Drive
function exportToCSV() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Evaluasi SIKEN9');
  const url = 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=csv&gid=' + sheet.getSheetId();
  Logger.log(url);
}
```

---

## 🔐 Privacy & Ethics

### Data Protection:

1. **Informed Consent:**
   - Tambahkan disclaimer di form
   - Jelaskan tujuan pengumpulan data
   - Informasikan bahwa data akan digunakan untuk evaluasi

2. **Anonymization:**
   - Nama bisa dianonimkan untuk laporan publik
   - Hanya tampilkan aggregated data

3. **Data Retention:**
   - Simpan data minimal 1 tahun
   - Backup secara berkala
   - Hapus data yang tidak relevan

4. **Access Control:**
   - Batasi akses Spreadsheet
   - Hanya tim evaluasi yang bisa lihat raw data
   - Share laporan agregat, bukan raw data

---

## 📚 Resources

### Files:
- `form-evaluasi-siken9.html` - Form HTML
- Apps Script code - Backend untuk menerima data
- Template laporan aktualisasi

### Links:
- Form URL: `https://kuaambulu.github.io/SIKEN9/Evaluasi/form-evaluasi-siken9.html`
- Spreadsheet: [Link to Google Sheets]
- Dashboard: [Link to report/dashboard]

### Documentation:
- Setup guide (this document)
- User guide for form
- Analysis guide
- Reporting template

---

## ✅ Checklist Implementasi

### Pre-Launch:
- [ ] Spreadsheet dibuat
- [ ] Apps Script deployed
- [ ] Form HTML dikonfigurasi
- [ ] Form diupload ke GitHub
- [ ] Test form dengan data dummy
- [ ] Verifikasi data masuk ke Spreadsheet

### Launch:
- [ ] Share link form ke stakeholders
- [ ] Buat QR code untuk form
- [ ] Announce di social media
- [ ] Brief petugas KUA
- [ ] Monitor response rate

### Post-Launch:
- [ ] Kumpulkan data minimal 30 responden
- [ ] Generate laporan statistik
- [ ] Analisis data
- [ ] Identifikasi action items
- [ ] Buat laporan aktualisasi
- [ ] Present hasil ke stakeholders

---

**Version:** 1.0  
**Created:** 2025-11-03  
**For:** Laporan Aktualisasi SIKEN9  
**By:** Tim IT KUA Ambulu

---

*Form evaluasi ini adalah bagian integral dari monitoring dan continuous improvement SIKEN9.*
