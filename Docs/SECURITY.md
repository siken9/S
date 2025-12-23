# 🔐 Security Policy

## Keamanan Sistem Pengumuman Kehendak Nikah

Dokumen ini menjelaskan kebijakan keamanan untuk sistem Papan Pengumuman Kehendak Nikah KUA Ambulu.

---

## 🛡️ Lapisan Keamanan

### 1. Data Protection

#### Google Spreadsheet (Private)
```
🔒 Access Level: Private
✅ Only KUA staff can edit
✅ View/Edit permissions controlled via Google Account
✅ Audit log available (File → Version history)
```

**Best Practices:**
- JANGAN share link edit Spreadsheet ke publik
- Gunakan akun Google resmi KUA
- Enable 2-Factor Authentication (2FA)
- Review permissions secara berkala

#### Google Apps Script (Backend)
```
🔒 Access Level: Execute as Owner
✅ Code hanya visible untuk owner
✅ Web App URL tidak expose kode
✅ Filter data berdasarkan Status TRUE/FALSE
```

**Security Measures:**
```javascript
// Apps Script hanya expose data dengan Status = TRUE
if (status === true || status === 'TRUE' || status === 'True') {
    // Data akan diexpose
}
// Data dengan Status FALSE tidak akan pernah terexpose
```

#### Website (Public Read-Only)
```
🌐 Access Level: Public
✅ Read-only access
❌ No write/edit capability from website
❌ No form submission to Spreadsheet
✅ HTTPS via GitHub Pages
```

---

## 🔍 Data Yang Diexpose

### ✅ Data Publik (Boleh Diakses)
Sesuai PMA No. 30 Tahun 2024, data berikut BOLEH dipublikasikan:

- Nomor Pemeriksaan
- Nama lengkap calon pengantin laki-laki dan perempuan
- Nama ayah (Bin/Binti)
- Tempat, tanggal lahir
- Kewarganegaraan
- Agama
- Pekerjaan
- Alamat
- Data wali nikah
- Jadwal akad nikah (hari, tanggal, tempat)

### ❌ Data Sensitif (TIDAK Diexpose)
Data berikut TIDAK BOLEH ditampilkan di website:

- NIK (Nomor Induk Kependudukan)
- Nomor KK (Kartu Keluarga)
- Nomor HP/Email pribadi
- Foto KTP
- Dokumen persyaratan nikah
- Informasi medis
- Data rekening bank
- Password/PIN

---

## 🚨 Vulnerability Reporting

### Cara Melaporkan Kerentanan Keamanan

Jika Anda menemukan celah keamanan, JANGAN posting di public issue. Laporkan secara private:

#### 1. Via Email
```
To: kua.ambulu@gmail.com
Subject: [SECURITY] Vulnerability Report - Pengumuman Nikah
```

#### 2. Via WhatsApp
```
Nomor: 082146035081
Format: [SECURITY] Brief description + screenshot
```

#### 3. Via GitHub Security Advisory
```
Repository → Security → Report a vulnerability
```

### Informasi Yang Harus Disertakan:

- **Tipe vulnerability**: SQL Injection, XSS, CSRF, dll
- **Lokasi**: File/line number atau URL
- **Severity**: Critical, High, Medium, Low
- **Steps to reproduce**: Langkah-langkah detail
- **Impact**: Apa yang bisa terjadi jika dieksploitasi
- **Proof of Concept**: Screenshot atau video (jika ada)
- **Suggested Fix**: Rekomendasi perbaikan (optional)

### Response Time:
- **Critical**: < 24 jam
- **High**: < 48 jam
- **Medium**: < 7 hari
- **Low**: < 30 hari

---

## 🔒 Security Best Practices

### Untuk Petugas KUA

#### 1. Account Security
```
✅ DO:
- Gunakan password kuat (min 12 karakter)
- Enable 2FA di akun Google
- Jangan share credentials
- Logout setelah selesai
- Gunakan akun resmi KUA

❌ DON'T:
- Share password dengan orang lain
- Login dari device publik (warnet, dll)
- Simpan password di browser publik
- Gunakan WiFi publik tanpa VPN
```

#### 2. Data Input
```
✅ DO:
- Validasi data sebelum input
- Double-check data sensitif
- Gunakan Status FALSE untuk draft
- Backup sebelum edit massal

❌ DON'T:
- Copy-paste dari source tidak terpercaya
- Input data pribadi yang tidak perlu
- Share data via screenshot publik
- Hapus data permanen (use Status FALSE)
```

#### 3. Access Control
```
✅ DO:
- Review permissions bulanan
- Remove access untuk staff yang sudah pindah
- Use least privilege principle
- Monitor activity log

❌ DON'T:
- Beri edit access ke banyak orang
- Share Web App URL ke publik
- Allow anonymous edit
```

### Untuk Developer

#### 1. Code Security
```javascript
// ✅ GOOD - Sanitize input
const searchTerm = document.getElementById('searchInput').value
    .toLowerCase()
    .trim()
    .replace(/[<>]/g, ''); // Remove potential XSS

// ❌ BAD - Direct use without sanitization
const searchTerm = document.getElementById('searchInput').value;
```

#### 2. API Security
```javascript
// ✅ GOOD - Read-only operation
async function loadAnnouncements() {
    const response = await fetch(WEBAPP_URL); // GET only
}

// ❌ BAD - Allow write operation
async function updateData(data) {
    await fetch(WEBAPP_URL, { 
        method: 'POST', 
        body: JSON.stringify(data) 
    }); // Security risk!
}
```

#### 3. Environment Variables
```javascript
// ✅ GOOD - Use environment variable
const WEBAPP_URL = process.env.WEBAPP_URL;

// ❌ BAD - Hardcode in public repo
const WEBAPP_URL = 'https://script.google.com/macros/s/ABC123/exec';
```

---

## 🔐 Authentication & Authorization

### Current Implementation:

```
User (Public)
    ↓
Website (GitHub Pages)
    ↓ HTTP GET Request
Apps Script (Public Web App)
    ↓ Filter: Status = TRUE only
Google Spreadsheet (Private)
    ↓ Read data
Return JSON to Website
```

### Authorization Matrix:

| Role | Spreadsheet | Apps Script | Website |
|------|-------------|-------------|---------|
| Admin KUA | Edit | View Code | View |
| Petugas KUA | Edit | - | View |
| Public | - | - | View |
| Developer | - | View Code | Edit Code |

---

## 🚨 Incident Response Plan

### Level 1: Data Breach
**Scenario**: Data pribadi ter-leak ke publik

**Response:**
1. **Immediate (0-1 jam)**:
   - Take down website (disable GitHub Pages)
   - Revoke Apps Script Web App
   - Notify stakeholders
   
2. **Short-term (1-24 jam)**:
   - Investigate source of leak
   - Identify affected data
   - Notify affected individuals
   - Report to Kemenag

3. **Long-term (1-7 hari)**:
   - Patch vulnerability
   - Strengthen security
   - Review all permissions
   - Update security policy

### Level 2: Unauthorized Access
**Scenario**: Orang tidak berwenang edit Spreadsheet

**Response:**
1. **Immediate**:
   - Change Spreadsheet permissions
   - Revoke suspicious access
   - Check audit log

2. **Short-term**:
   - Restore from backup if needed
   - Notify admin
   - Change passwords

3. **Long-term**:
   - Implement stricter access control
   - Enable audit logging
   - Training untuk staff

### Level 3: Website Defacement
**Scenario**: Website di-hack, tampilan berubah

**Response:**
1. **Immediate**:
   - Revert to last known good commit
   - Change GitHub credentials
   
2. **Short-term**:
   - Investigate how breach occurred
   - Scan for malware
   - Review all commits

3. **Long-term**:
   - Enable GitHub 2FA
   - Restrict push access
   - Code review process

---

## 🔍 Security Audit Checklist

### Monthly Review:
- [ ] Review Spreadsheet access permissions
- [ ] Check Apps Script execution logs
- [ ] Monitor website traffic (if analytics enabled)
- [ ] Review GitHub commit history
- [ ] Test data exposure (try to access FALSE data)
- [ ] Check for XSS vulnerabilities in search
- [ ] Verify HTTPS is working
- [ ] Test on different browsers

### Quarterly Review:
- [ ] Penetration testing
- [ ] Code security audit
- [ ] Update dependencies
- [ ] Review security policy
- [ ] Staff security training
- [ ] Backup verification
- [ ] Disaster recovery drill

### Annually:
- [ ] Comprehensive security assessment
- [ ] Third-party security audit
- [ ] Update incident response plan
- [ ] Review compliance with PMA regulations
- [ ] Update security documentation

---

## 🛠️ Security Tools & Resources

### Recommended Tools:

#### For Web Security:
- **OWASP ZAP**: Vulnerability scanner
- **Burp Suite**: Security testing
- **Google Lighthouse**: Security audit

#### For Code Security:
- **ESLint Security Plugin**: Static analysis
- **Snyk**: Dependency vulnerability check
- **GitHub Dependabot**: Auto security updates

#### For Monitoring:
- **Google Analytics**: Traffic monitoring
- **UptimeRobot**: Uptime monitoring
- **Sentry**: Error tracking

---

## 📚 Compliance & Regulations

### Peraturan Yang Relevan:

1. **PMA No. 30 Tahun 2024**
   - Tentang Pengumuman Kehendak Nikah
   - Mengatur data apa yang boleh dipublikasikan

2. **UU No. 27 Tahun 2022**
   - Tentang Perlindungan Data Pribadi
   - Mengatur handling data sensitif

3. **PP No. 71 Tahun 2019**
   - Tentang Penyelenggaraan Sistem dan Transaksi Elektronik
   - Mengatur keamanan sistem elektronik

### Compliance Checklist:
- [x] Hanya publish data yang diizinkan PMA 30/2024
- [x] Tidak menyimpan data pribadi sensitif di website
- [x] Menggunakan HTTPS
- [x] Audit trail tersedia
- [x] Backup data secara berkala
- [x] Informed consent (data adalah public record)

---

## 📞 Security Contact

**Security Team:**
- **Email**: kua.ambulu@kemenag.go.id
- **WhatsApp**: 082146035081
- **Emergency Hotline**: [Number for critical issues]

**Response Hours:**
- **Critical Issues**: 24/7
- **Non-Critical**: Senin-Kamis, 07:30-16:00 WIB
                    Jum'at, 07:30-16:30 WIB
**PGP Public Key**: [If available for encrypted communication]

---

## 🔄 Security Updates

### Version History:

**v2.1 (2025-10-30)**
- Initial security documentation
- HTTPS via GitHub Pages
- Read-only public access

**v2.0 (2025-10-28)**
- Status TRUE/FALSE filtering
- No public write access

**v1.0 (2025-10-27)**
- Basic security implementation

---

## ✅ Security Acknowledgments

Kami berterima kasih kepada:
- Tim Kemenag RI untuk panduan regulasi
- Google untuk platform keamanan (Sheets, Apps Script)
- GitHub untuk secure hosting
- Security researchers yang melaporkan vulnerabilities

---

## 📄 License

Security Policy ini adalah bagian dari sistem Papan Pengumuman Kehendak Nikah KUA Ambulu dan dilindungi oleh copyright © 2025 KUA Kecamatan Ambulu.

---

**Last Updated**: 2025-10-30  
**Version**: 2.1  
**Maintained by**: Tim IT KUA Ambulu

---

*"Security is not a product, but a process."*

Untuk pertanyaan atau klarifikasi mengenai security policy ini, silakan hubungi tim security melalui kontak di atas.
