# 🔌 API Documentation

Dokumentasi lengkap untuk Google Apps Script Web App API yang digunakan oleh sistem Papan Pengumuman Kehendak Nikah.

---

## 📋 Overview

### Base Information

```
API Type: RESTful Web API
Protocol: HTTPS
Format: JSON
Authentication: None (Public Read-Only)
Rate Limit: ~100 requests/hour (Google Apps Script limit)
```

### Endpoint

```
GET https://script.google.com/macros/s/{SCRIPT_ID}/exec
```

**Example**:
```
https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXX/exec
```

---

## 🚀 API Endpoints

### GET / - Get All Announcements

Mengambil semua data pengumuman kehendak nikah dengan Status = TRUE

#### Request

**Method**: `GET`

**Headers**: None required

**Query Parameters**: None

**Example Request**:
```javascript
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
  .then(response => response.json())
  .then(data => console.log(data));
```

```bash
# cURL
curl -X GET "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

#### Response

**Status Code**: `200 OK`

**Content-Type**: `application/json`

**Response Body**:
```json
[
  {
    "nomorPemeriksaan": "NPXXXX3509121XXXXXX",
    "namaLakiLaki": "Ahmad Fauzi",
    "binLakiLaki": "Abdullah",
    "ttlLakiLaki": "Jember, 15 Januari 1995",
    "kewarganegaraanLakiLaki": "WNI",
    "agamaLakiLaki": "Islam",
    "pekerjaanLakiLaki": "Wiraswasta",
    "alamatLakiLaki": "Jl. Merdeka No. 123, Ambulu, Jember",
    "namaPerempuan": "Siti Aminah",
    "bintiPerempuan": "Muhammad",
    "ttlPerempuan": "Jember, 20 Maret 1997",
    "kewarganegaraanPerempuan": "WNI",
    "agamaPerempuan": "Islam",
    "pekerjaanPerempuan": "Guru",
    "alamatPerempuan": "Jl. Pahlawan No. 45, Ambulu, Jember",
    "jenisWali": "Nasab",
    "hubunganWali": "Ayah Kandung",
    "sebabWali": "",
    "namaWali": "Muhammad",
    "binWali": "Ahmad",
    "ttlWali": "Jember, 10 Juni 1970",
    "kewarganegaraanWali": "WNI",
    "agamaWali": "Islam",
    "pekerjaanWali": "Petani",
    "alamatWali": "Jl. Pahlawan No. 45, Ambulu, Jember",
    "hariNikah": "Sabtu",
    "tanggalNikah": "15 Desember 2025",
    "tempatNikah": "Masjid Al-Ikhlas, Ambulu"
  }
]
```

#### Response Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `nomorPemeriksaan` | String | Nomor pemeriksaan nikah | "NPXXXX3509121XXXXXX" |
| `namaLakiLaki` | String | Nama lengkap calon pengantin laki-laki | "Ahmad Fauzi" |
| `binLakiLaki` | String | Nama ayah calon laki-laki | "Abdullah" |
| `ttlLakiLaki` | String | Tempat, tanggal lahir laki-laki | "Jember, 15 Januari 1995" |
| `kewarganegaraanLakiLaki` | String | Kewarganegaraan | "WNI" |
| `agamaLakiLaki` | String | Agama | "Islam" |
| `pekerjaanLakiLaki` | String | Pekerjaan | "Wiraswasta" |
| `alamatLakiLaki` | String | Alamat lengkap | "Jl. Merdeka..." |
| `namaPerempuan` | String | Nama lengkap calon pengantin perempuan | "Siti Aminah" |
| `bintiPerempuan` | String | Nama ayah calon perempuan | "Muhammad" |
| `ttlPerempuan` | String | Tempat, tanggal lahir perempuan | "Jember, 20 Maret 1997" |
| `kewarganegaraanPerempuan` | String | Kewarganegaraan | "WNI" |
| `agamaPerempuan` | String | Agama | "Islam" |
| `pekerjaanPerempuan` | String | Pekerjaan | "Guru" |
| `alamatPerempuan` | String | Alamat lengkap | "Jl. Pahlawan..." |
| `jenisWali` | String | Jenis wali: "Nasab" atau "Hakim" | "Nasab" |
| `hubunganWali` | String | Hubungan wali (jika Nasab) | "Ayah Kandung" |
| `sebabWali` | String | Sebab wali hakim (jika Hakim) | "" |
| `namaWali` | String | Nama lengkap wali nikah | "Muhammad" |
| `binWali` | String | Nama ayah wali | "Ahmad" |
| `ttlWali` | String | Tempat, tanggal lahir wali | "Jember, 10 Juni 1970" |
| `kewarganegaraanWali` | String | Kewarganegaraan wali | "WNI" |
| `agamaWali` | String | Agama wali | "Islam" |
| `pekerjaanWali` | String | Pekerjaan wali | "Petani" |
| `alamatWali` | String | Alamat lengkap wali | "Jl. Pahlawan..." |
| `hariNikah` | String | Hari akad nikah | "Sabtu" |
| `tanggalNikah` | String | Tanggal akad nikah | "15 Desember 2025" |
| `tempatNikah` | String | Tempat akad nikah | "Masjid Al-Ikhlas" |

---

## 📊 Response Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request berhasil, data dikembalikan |
| 302 | Redirect | Google Apps Script redirect (normal) |
| 404 | Not Found | URL Web App salah |
| 500 | Internal Server Error | Error di Apps Script code |
| 503 | Service Unavailable | Google Apps Script down (jarang) |

---

## 🔒 Authentication & Authorization

### Current Implementation

**Authentication**: **None**
- API bersifat public dan read-only
- Tidak memerlukan API key atau token
- Siapapun bisa akses

**Authorization**: **Filter-based**
- Backend filter data berdasarkan kolom Status
- Hanya data dengan Status = TRUE yang di-expose
- Data dengan Status = FALSE tidak akan pernah tampil

### Security Model

```
User Request
    ↓
Apps Script (doGet)
    ↓
Filter: Status = TRUE only
    ↓
Return filtered data as JSON
```

**Benefits**:
- ✅ Simple - No auth complexity
- ✅ Secure - Sensitive data tetap private
- ✅ Fast - No auth overhead

**Limitations**:
- ❌ Anyone can access published data
- ❌ No rate limiting per user
- ❌ No usage analytics per user

---

## 🚦 Rate Limits

### Google Apps Script Limits

| Limit Type | Free Account | Google Workspace |
|------------|--------------|------------------|
| Script runtime | 6 min/execution | 6 min/execution |
| URL Fetch calls | 20,000/day | 100,000/day |
| Executions per day | 90,000 | 1,500,000 |
| Concurrent executions | 30 | 30 |

### Recommended Usage

**For Website**:
- Cache data di client-side (5 minutes)
- Auto-refresh: Max every 5 minutes
- Avoid polling every second

**For Third-Party Integration**:
- Max 100 requests/hour
- Implement exponential backoff
- Cache responses when possible

---

## 📝 Code Examples

### JavaScript (Fetch API)

```javascript
// Basic fetch
async function loadAnnouncements() {
    try {
        const response = await fetch('YOUR_WEBAPP_URL');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// With timeout
async function loadAnnouncementsWithTimeout(timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch('YOUR_WEBAPP_URL', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Request timeout');
        } else {
            console.error('Error:', error);
        }
        return [];
    }
}

// With caching
let cachedData = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function loadAnnouncementsWithCache() {
    const now = Date.now();
    
    if (cachedData && (now - lastFetch < CACHE_DURATION)) {
        console.log('Returning cached data');
        return cachedData;
    }
    
    try {
        const response = await fetch('YOUR_WEBAPP_URL');
        const data = await response.json();
        cachedData = data;
        lastFetch = now;
        return data;
    } catch (error) {
        console.error('Error:', error);
        return cachedData || [];
    }
}
```

### jQuery

```javascript
// Basic GET
$.ajax({
    url: 'YOUR_WEBAPP_URL',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        console.log(data);
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});

// With loading indicator
$('#loading').show();
$.getJSON('YOUR_WEBAPP_URL')
    .done(function(data) {
        console.log(data);
        // Process data
    })
    .fail(function(error) {
        console.error('Error:', error);
    })
    .always(function() {
        $('#loading').hide();
    });
```

### Python

```python
import requests
import json

# Basic request
def get_announcements():
    url = 'YOUR_WEBAPP_URL'
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')
        return []

# With caching
import time
from functools import lru_cache

@lru_cache(maxsize=1)
def get_announcements_cached():
    return get_announcements()

# Clear cache every 5 minutes
def get_announcements_with_cache():
    cache_key = int(time.time() / 300)  # 300 seconds = 5 minutes
    return get_announcements_cached.cache_clear() or get_announcements()
```

### PHP

```php
<?php
// Basic cURL request
function getAnnouncements($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    } else {
        return [];
    }
}

// With caching
function getAnnouncementsWithCache($url, $cacheFile = 'cache.json', $cacheTime = 300) {
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
        return json_decode(file_get_contents($cacheFile), true);
    }
    
    $data = getAnnouncements($url);
    file_put_contents($cacheFile, json_encode($data));
    return $data;
}

// Usage
$url = 'YOUR_WEBAPP_URL';
$announcements = getAnnouncementsWithCache($url);
print_r($announcements);
?>
```

---

## 🔧 Error Handling

### Error Response Format

Jika terjadi error, response bisa berupa:

**404 Not Found**:
```html
<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body>Error: Not Found</body>
</html>
```

**500 Internal Server Error**:
```json
{
  "error": "Script function not found",
  "message": "Function 'doGet' not found"
}
```

### Handling Errors in Code

```javascript
async function loadAnnouncementsSafely() {
    try {
        const response = await fetch(WEBAPP_URL);
        
        // Check HTTP status
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Check content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        
        // Parse JSON
        const data = await response.json();
        
        // Validate data structure
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format: expected array');
        }
        
        return data;
        
    } catch (error) {
        console.error('Failed to load announcements:', error.message);
        
        // Return empty array as fallback
        return [];
    }
}
```

---

## 📈 Performance Optimization

### Client-Side Caching

```javascript
// LocalStorage caching (persistent)
function getAnnouncementsWithLocalStorage() {
    const CACHE_KEY = 'announcements_cache';
    const CACHE_TIMESTAMP_KEY = 'announcements_cache_time';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    
    const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const now = Date.now();
    
    if (cachedTime && (now - parseInt(cachedTime) < CACHE_DURATION)) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            console.log('Using cached data');
            return Promise.resolve(JSON.parse(cached));
        }
    }
    
    return fetch(WEBAPP_URL)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
            return data;
        });
}
```

### Debouncing Requests

```javascript
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage: debounce search requests
const searchInput = document.getElementById('searchInput');
const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', debouncedSearch);
```

---

## 🧪 Testing

### Manual Testing

```bash
# Using cURL
curl -X GET "YOUR_WEBAPP_URL" -H "Accept: application/json"

# Pretty print JSON
curl -X GET "YOUR_WEBAPP_URL" | python -m json.tool

# Check response time
curl -w "@curl-format.txt" -o /dev/null -s "YOUR_WEBAPP_URL"

# curl-format.txt:
#   time_total: %{time_total}s
#   size_download: %{size_download} bytes
```

### Automated Testing (Jest)

```javascript
// __tests__/api.test.js
const fetch = require('node-fetch');

const WEBAPP_URL = 'YOUR_WEBAPP_URL';

describe('API Tests', () => {
    test('should return 200 OK', async () => {
        const response = await fetch(WEBAPP_URL);
        expect(response.status).toBe(200);
    });
    
    test('should return JSON', async () => {
        const response = await fetch(WEBAPP_URL);
        const contentType = response.headers.get('content-type');
        expect(contentType).toContain('application/json');
    });
    
    test('should return array', async () => {
        const response = await fetch(WEBAPP_URL);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });
    
    test('should have valid structure', async () => {
        const response = await fetch(WEBAPP_URL);
        const data = await response.json();
        
        if (data.length > 0) {
            const item = data[0];
            expect(item).toHaveProperty('nomorPemeriksaan');
            expect(item).toHaveProperty('namaLakiLaki');
            expect(item).toHaveProperty('namaPerempuan');
            expect(item).toHaveProperty('tanggalNikah');
        }
    });
    
    test('should respond within 5 seconds', async () => {
        const start = Date.now();
        await fetch(WEBAPP_URL);
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(5000);
    });
});
```

---

## 📚 Integration Examples

### WordPress Plugin

```php
<?php
/*
Plugin Name: KUA Ambulu Announcements
Description: Display wedding announcements from KUA Ambulu
Version: 1.0
*/

function kua_ambulu_announcements_shortcode() {
    $url = 'YOUR_WEBAPP_URL';
    $transient_key = 'kua_announcements';
    
    // Get cached data
    $data = get_transient($transient_key);
    
    if (false === $data) {
        // Fetch fresh data
        $response = wp_remote_get($url);
        
        if (is_wp_error($response)) {
            return '<p>Error loading announcements</p>';
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        // Cache for 5 minutes
        set_transient($transient_key, $data, 300);
    }
    
    // Display data
    ob_start();
    ?>
    <div class="kua-announcements">
        <?php foreach ($data as $item): ?>
            <div class="announcement-card">
                <h3><?php echo esc_html($item['nomorPemeriksaan']); ?></h3>
                <p><strong>Laki-laki:</strong> <?php echo esc_html($item['namaLakiLaki']); ?></p>
                <p><strong>Perempuan:</strong> <?php echo esc_html($item['namaPerempuan']); ?></p>
                <p><strong>Tanggal:</strong> <?php echo esc_html($item['tanggalNikah']); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode('kua_announcements', 'kua_ambulu_announcements_shortcode');
?>
```

### React Component

```jsx
import React, { useState, useEffect } from 'react';

function Announcements() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const WEBAPP_URL = 'YOUR_WEBAPP_URL';
        
        fetch(WEBAPP_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="announcements">
            {data.map((item, index) => (
                <div key={index} className="announcement-card">
                    <h3>{item.nomorPemeriksaan}</h3>
                    <p><strong>Laki-laki:</strong> {item.namaLakiLaki}</p>
                    <p><strong>Perempuan:</strong> {item.namaPerempuan}</p>
                    <p><strong>Tanggal:</strong> {item.tanggalNikah}</p>
                </div>
            ))}
        </div>
    );
}

export default Announcements;
```

---

## 📞 Support

**Technical Issues**:
- Email: kua.ambulu@kemenag.go.id
- WhatsApp: 082146035081

**API Updates**:
- Check GitHub for changelog
- Subscribe to repository notifications

---

**API Documentation Version**: 1.0  
**Last Updated**: 2025-10-30  
**Maintained by**: ZR48
