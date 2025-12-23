# 🔧 Troubleshooting Guide

Panduan solusi untuk masalah umum yang mungkin terjadi pada sistem Papan Pengumuman Kehendak Nikah.

---

## 📑 Daftar Isi

- [Website Issues](#-website-issues)
- [Data Issues](#-data-issues)
- [Search Issues](#-search-issues)
- [Display Issues](#-display-issues)
- [Performance Issues](#-performance-issues)
- [Mobile Issues](#-mobile-issues)
- [Backend Issues](#-backend-issues)
- [Deployment Issues](#-deployment-issues)
- [Browser Issues](#-browser-issues)
- [Network Issues](#-network-issues)

---

## 🌐 Website Issues

### ❌ Problem: Website Tidak Bisa Dibuka

**Gejala:**
- URL tidak merespon
- Page not found (404)
- Connection timeout

**Penyebab & Solusi:**

#### 1. GitHub Pages Not Enabled

```
Cek: Settings → Pages → Source
✅ Should be: Deploy from branch (main)
❌ If not set: Enable GitHub Pages
```

**Langkah:**
1. Buka repository di GitHub
2. Settings → Pages
3. Source: **main branch**
4. Folder: **/ (root)**
5. Save
6. Tunggu 1-2 menit

#### 2. Wrong URL

```
❌ Wrong: https://github.com/kuaambulu/SIKEN9
✅ Correct: https://kuaambulu.github.io/SIKEN9/
```

**Format URL:**
```
https://[username].github.io/[repository-name]/
```

#### 3. Repository is Private

**Cek:**
1. Repository → Settings → General
2. Scroll ke bawah: "Danger Zone"
3. Pastikan repository adalah **Public**

**Fix:**
1. Jika private, klik "Change visibility"
2. Pilih "Make public"
3. Confirm

#### 4. Internet Connection Issues

**Test:**
```bash
# Windows
ping github.com

# Mac/Linux
ping -c 4 github.com
```

**Fix:**
- Cek koneksi WiFi/data
- Restart router
- Coba network lain
- Gunakan VPN jika GitHub di-block

---

### ❌ Problem: Website Muncul Tapi Blank/Kosong

**Gejala:**
- Page load tapi tidak ada content
- Header muncul, data tidak muncul
- Loading terus-menerus

**Diagnosis:**

#### 1. Cek Browser Console

```
Tekan F12 → Tab Console
Lihat error messages (warna merah)
```

**Common Errors:**

**Error: `WEBAPP_URL is not defined`**
```
Cause: Variable WEBAPP_URL belum dikonfigurasi
Fix: Edit script.js, set WEBAPP_URL dengan URL Apps Script Anda
```

**Error: `Failed to fetch`**
```
Cause: CORS error atau URL salah
Fix: 
1. Cek WEBAPP_URL di script.js
2. Test URL di browser (harus return JSON)
3. Re-deploy Apps Script dengan "Anyone" access
```

**Error: `Unexpected token < in JSON`**
```
Cause: Response bukan JSON (mungkin HTML error page)
Fix:
1. Test WEBAPP_URL di browser
2. Jika muncul HTML, Apps Script belum deployed benar
3. Re-deploy sebagai Web App
```

#### 2. Cek Network Tab

```
F12 → Tab Network → Reload page (F5)
Lihat request ke Apps Script URL
```

**Status Codes:**

| Code | Meaning | Fix |
|------|---------|-----|
| 200 | OK | Data berhasil, cek parsing |
| 302 | Redirect | Normal untuk Apps Script |
| 403 | Forbidden | Apps Script access bukan "Anyone" |
| 404 | Not Found | URL salah atau Apps Script belum deployed |
| 500 | Server Error | Error di kode Apps Script |

#### 3. Cek Data di Spreadsheet

**Checklist:**
- [ ] Spreadsheet name: "Data Pengumuman" (exact match)
- [ ] Minimal 1 row dengan Status = TRUE
- [ ] Semua kolom terisi (tidak boleh ada yang kosong)
- [ ] Format tanggal benar: "DD Bulan YYYY"

---

## 📊 Data Issues

### ❌ Problem: Data Tidak Muncul

**Gejala:**
- Website muncul tapi no data
- Message: "Tidak Ada Data Ditemukan"

**Solusi:**

#### 1. Cek Status di Spreadsheet

```
Kolom A (Status) HARUS = TRUE (capital, no space)
```

**Valid Values:**
- ✅ TRUE
- ✅ True
- ❌ true (lowercase tidak akan detect)
- ❌ T / Y / 1

**Fix:**
1. Buka Spreadsheet
2. Set kolom A = TRUE untuk data yang ingin ditampilkan
3. Tunggu 5 menit atau refresh website (F5)

#### 2. Cek Nama Sheet

```
Sheet name HARUS = "Data Pengumuman" (exact match, case-sensitive)
```

**Fix:**
1. Klik kanan pada tab sheet
2. Rename menjadi: `Data Pengumuman`
3. Re-test website

#### 3. Cek Apps Script Code

**Possible Issues:**

**Issue: `getSheetByName` returns null**
```javascript
// ❌ Wrong
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data pengumuman');

// ✅ Correct
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data Pengumuman');
```

**Issue: Column index mismatch**
```javascript
// Kolom di Spreadsheet: A(0), B(1), C(2)...
const nomorPemeriksaan = row[1]; // Kolom B
const namaLakiLaki = row[2]; // Kolom C
```

---

### ❌ Problem: Data Tidak Update/Refresh

**Gejala:**
- Edit data di Spreadsheet tidak muncul di website
- Data lama masih tampil

**Solusi:**

#### 1. Cache Issue (Client Side)

**Fix:**
```
Hard Refresh:
- Windows: Ctrl + F5
- Mac: Cmd + Shift + R
- Chrome: Ctrl + Shift + Delete → Clear cache

Clear LocalStorage (jika dipakai):
1. F12 → Console
2. Type: localStorage.clear()
3. Enter
4. Refresh page
```

#### 2. Auto-Refresh Interval

**Info:**
```javascript
// Website auto-refresh setiap 5 menit
setInterval(loadAnnouncements, 300000);
```

**Options:**
- Wait 5 minutes for auto-refresh
- Manual refresh: F5
- Edit script.js untuk interval lebih pendek (not recommended)

#### 3. Apps Script Cache

**Note:** Apps Script juga cache. Untuk force refresh:

```
1. Edit sedikit Apps Script code (add comment)
2. Save
3. Deploy → Manage deployments
4. Edit active deployment
5. Version: New version
6. Deploy
```

---

### ❌ Problem: Data Tidak Lengkap/Terpotong

**Gejala:**
- Beberapa field kosong
- Alamat terpotong
- Nama tidak lengkap

**Solusi:**

#### 1. Cek Data di Spreadsheet

**Common Issues:**
- Cell kosong → Akan tampil ""
- Data terlalu panjang → Check cell width
- Special characters → Bisa menyebabkan parsing error

**Fix:**
```
1. Pastikan semua required fields terisi
2. Cek tidak ada line break di tengah cell
3. Remove special characters yang aneh
```

#### 2. Column Mapping Issue

**Verify:**
```javascript
// Di Apps Script, cek mapping kolom
namaLakiLaki: row[2] || '',  // Kolom C
alamatLakiLaki: row[8] || '', // Kolom I
```

**Fix:**
```
Count dari 0: A=0, B=1, C=2, ...
Sesuaikan dengan struktur Spreadsheet Anda
```

---

## 🔍 Search Issues

### ❌ Problem: Pencarian Tidak Berfungsi

**Gejala:**
- Ketik di search box tidak ada hasil
- Hasil tidak filter

**Diagnosis:**

#### 1. JavaScript Error

**Cek Console:**
```
F12 → Console
Cari error saat mengetik di search box
```

**Common Errors:**

**`Cannot read property 'value' of null`**
```javascript
// Issue: getElementById tidak menemukan element
// Fix: Cek ID element di HTML
<input type="text" id="searchInput" ...>
```

**`toLowerCase is not a function`**
```javascript
// Issue: Data bukan string
// Fix: Add safety check
const searchTerm = (document.getElementById('searchInput').value || '').toLowerCase();
```

#### 2. Event Listener Not Attached

**Cek:**
```javascript
// Pastikan event listener terpasang
searchInput.addEventListener('input', performSearch);
```

**Fix:**
```javascript
// Wrap dalam DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
});
```

#### 3. Search Logic Issue

**Test:**
```javascript
// Di Console, test manual
const searchTerm = 'ahmad';
const result = allData.filter(item => 
    item.namaLakiLaki.toLowerCase().includes(searchTerm)
);
console.log(result);
```

---

## 🎨 Display Issues

### ❌ Problem: CSS Tidak Load (Tampilan Berantakan)

**Gejala:**
- No styling/colors
- Layout broken
- Teks hitam putih

**Solusi:**

#### 1. File Path Issue

**Cek di HTML:**
```html
<!-- ❌ Wrong -->
<link rel="stylesheet" href="styles/style.css">

<!-- ✅ Correct (same folder) -->
<link rel="stylesheet" href="style.css">
```

**Fix:**
```
1. Pastikan style.css di folder yang sama dengan index.html
2. Cek huruf besar/kecil (case-sensitive di Linux)
3. No typo di filename
```

#### 2. Cache Issue

**Fix:**
```
Hard Refresh: Ctrl + Shift + R
Disable cache (Developer mode):
1. F12 → Network tab
2. Check "Disable cache"
3. Refresh page
```

#### 3. GitHub Pages Build Issue

**Cek:**
```
Repository → Actions tab
Lihat status build terakhir
```

**Fix jika failed:**
```
1. Cek error message di Actions log
2. Re-commit file
3. Tunggu rebuild (1-2 menit)
```

---

### ❌ Problem: Responsive Tidak Bekerja di Mobile

**Gejala:**
- Layout tidak adjust di HP
- Card terlalu kecil/besar
- Text terpotong

**Solusi:**

#### 1. Viewport Meta Tag Missing

**Cek di HTML:**
```html
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```

#### 2. CSS Media Queries

**Verify:**
```css
@media (max-width: 768px) {
    .announcements-grid {
        grid-template-columns: 1fr; /* Should be 1 column */
    }
}
```

#### 3. Test di DevTools

```
F12 → Toggle device toolbar (Ctrl+Shift+M)
Select device: iPhone, iPad, etc
Test responsive breakpoints
```

---

## ⚡ Performance Issues

### ❌ Problem: Loading Sangat Lambat

**Gejala:**
- Page load > 5 detik
- Lagging saat scroll
- Search delay

**Diagnosis:**

#### 1. Cek Network Speed

**Test:**
```
F12 → Network tab
Cek "Finish" time dan "DOMContentLoaded"
```

**Ideal Times:**
- HTML: < 500ms
- CSS: < 200ms
- JS: < 500ms
- API Call: < 2s

#### 2. Too Much Data

**Issue:**
```
Jika data > 100 items, consider pagination atau lazy loading
```

**Fix:**
```javascript
// Already implemented: pagination limits items per page
const itemsPerPage = 16; // Desktop
const itemsPerPage = 4;  // Mobile
```

#### 3. API Response Slow

**Test API:**
```bash
# Test response time
curl -w "@curl-format.txt" -o /dev/null -s "YOUR_WEBAPP_URL"

# curl-format.txt content:
# time_total: %{time_total}s
```

**If slow (> 3s):**
- Apps Script might be hitting limits
- Spreadsheet too large (> 1000 rows)
- Consider caching strategy

---

## 📱 Mobile Issues

### ❌ Problem: Touch Events Not Working

**Gejala:**
- Buttons tidak bisa diklik di mobile
- Scroll tidak smooth

**Solusi:**

#### 1. Touch Target Size

**Fix CSS:**
```css
/* Buttons harus min 44×44px */
button, a {
    min-width: 44px;
    min-height: 44px;
    padding: 10px 20px;
}
```

#### 2. Prevent Default Issues

**Check JS:**
```javascript
// Jangan prevent default tanpa reason
element.addEventListener('click', function(e) {
    // e.preventDefault(); // Remove if not needed
});
```

---

### ❌ Problem: Font Terlalu Kecil di Mobile

**Solusi:**

**Check CSS:**
```css
@media (max-width: 768px) {
    body {
        font-size: 16px; /* Min 16px untuk readability */
    }
    
    h1 {
        font-size: 1.5em; /* Adjust for mobile */
    }
}
```

---

## ⚙️ Backend Issues

### ❌ Problem: Apps Script Error 500

**Gejala:**
- API return 500 Internal Server Error
- Console error: "Failed to fetch"

**Solusi:**

#### 1. Syntax Error di Code

**Check:**
```javascript
// Common mistakes
function doGet(e) {
  const sheet = SpreadsheetApp...
  // Missing semicolon, bracket, etc
}
```

**Fix:**
```
1. Copy kode dari documentation (verified)
2. Check all brackets match {}
3. Check all parentheses match ()
4. Check semicolons
```

#### 2. Wrong Sheet Name

```javascript
// ❌ Will throw error if sheet not found
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Wrong Name');

// ✅ Add error handling
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data Pengumuman');
if (!sheet) {
  return ContentService.createTextOutput(JSON.stringify({error: 'Sheet not found'}));
}
```

#### 3. Permission Issue

**Fix:**
```
1. Apps Script → Run → Authorize
2. Review permissions
3. Allow all requested permissions
4. Re-deploy Web App
```

---

### ❌ Problem: Apps Script Timeout

**Gejala:**
- Request takes > 30 seconds
- Timeout error

**Cause:**
- Too much data (> 1000 rows)
- Complex calculations
- Too many API calls

**Fix:**
```javascript
// Optimize code: remove unnecessary loops
// Use getDataRange() once, not multiple times
const data = sheet.getDataRange().getValues(); // Good
// vs
// Multiple getRange() calls // Bad
```

---

## 🚀 Deployment Issues

### ❌ Problem: Changes Not Showing After Upload

**Gejala:**
- Upload file baru ke GitHub
- Website masih tampil versi lama

**Solusi:**

#### 1. GitHub Pages Build Delay

**Wait:**
```
Normal delay: 1-2 minutes
Max delay: 5-10 minutes
```

**Check:**
```
Repository → Actions
See build status (green = success)
```

#### 2. Browser Cache

**Fix:**
```
Clear cache:
- Ctrl + Shift + Delete
- Select "Cached images and files"
- Clear

Hard refresh:
- Ctrl + F5 (Windows)
- Cmd + Shift + R (Mac)
```

#### 3. CDN Cache (GitHub)

**Wait:**
```
GitHub Pages uses CDN
Cache can take up to 10 minutes to clear
Be patient or use incognito mode to test
```

---

### ❌ Problem: GitHub Pages Build Failed

**Gejala:**
- Actions tab shows red X
- Website returns 404

**Diagnosis:**

**Check Actions Log:**
```
Repository → Actions → Click failed build
Read error message
```

**Common Issues:**

**Invalid HTML:**
```
Fix: Validate HTML at validator.w3.org
Check for unclosed tags
```

**File Too Large:**
```
GitHub file limit: 100MB
GitHub repo limit: 1GB
```

**Branch Issue:**
```
Settings → Pages → Check branch is correct
Should be: main (or master)
```

---

## 🌐 Browser Issues

### ❌ Problem: Works in Chrome, Broken in Other Browsers

**Solusi:**

#### 1. JavaScript Compatibility

**Issue:** Modern JS not supported in old browsers

**Fix:**
```javascript
// Use compatible syntax
// ❌ Optional chaining (not supported IE)
const value = data?.field;

// ✅ Traditional check
const value = data && data.field;
```

#### 2. CSS Compatibility

**Issue:** Modern CSS not supported

**Fix:**
```css
/* Add vendor prefixes */
.element {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
```

#### 3. Test Multiple Browsers

**Recommended Testing:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🌍 Network Issues

### ❌ Problem: CORS Error

**Gejala:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Cause:**
- Apps Script Web App not deployed with "Anyone" access

**Fix:**
```
1. Apps Script → Deploy → Manage deployments
2. Edit active deployment
3. Execute as: Me
4. Who has access: Anyone ← IMPORTANT
5. Deploy
```

---

### ❌ Problem: Rate Limit Exceeded

**Gejala:**
```
Error 429: Too Many Requests
```

**Cause:**
- Too many requests to Apps Script
- Google Apps Script quota exceeded

**Fix:**
```
Implement client-side caching:
- Cache data for 5 minutes
- Reduce auto-refresh frequency
- Use localStorage for caching
```

---

## 🆘 Emergency Procedures

### 🚨 Website Completely Down

**Quick Fix:**
```
1. Check GitHub status: githubstatus.com
2. Check if repo/pages still enabled
3. Roll back to last working commit:
   - Repository → Code → History
   - Find last working version
   - Revert to that commit
```

### 🚨 Data Leak/Security Issue

**Immediate Actions:**
```
1. Disable GitHub Pages (Settings → Pages → None)
2. Revoke Apps Script Web App
3. Check Spreadsheet permissions
4. Contact admin: kua.ambulu@kemenag.go.id
5. See SECURITY.md for full incident response
```

---

## 📞 Getting Help

### Self-Diagnosis Checklist

Before contacting support, check:

- [ ] Tried hard refresh (Ctrl+F5)
- [ ] Checked browser console for errors (F12)
- [ ] Verified WEBAPP_URL is correct
- [ ] Tested in different browser
- [ ] Checked GitHub Pages is enabled
- [ ] Verified data exists in Spreadsheet with Status=TRUE
- [ ] Read relevant documentation (FAQ, SETUP_GUIDE)

### Contact Support

**Include this info:**

```
1. Problem description
2. What you tried
3. Error messages (screenshot F12 console)
4. Browser & version
5. Device & OS
6. URL or file having issue
7. When problem started
```

**Contact:**
- WhatsApp: 082146035081
- Email: kua.ambulu@gmail.com
- GitHub Issues: https://github.com/kuaambulu/SIKEN9/issues

---

**Troubleshooting Guide Version**: 1.0  
**Last Updated**: 2025-10-30  
**Maintained by**: ZR48

---

*Jika masalah belum terselesaikan, jangan ragu untuk menghubungi tim support!*
