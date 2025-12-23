// ============================================
// SIKEN9 - Firebase Real-time Version
// dengan Auto-hide untuk pengumuman selesai
// ============================================

import { db } from './firebase-config.js';
import { collection, query, onSnapshot, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Global variables
let allData = [];
let filteredData = [];
let currentPage = 1;
let ttlVisible = false;
let searchTerm = '';
let unsubscribe = null;

// Parse tanggal dari format Indonesia ke Date object
function parseIndonesianDate(dateStr) {
    if (!dateStr) return null;
    
    const monthMap = {
        'januari': 0, 'februari': 1, 'maret': 2, 'april': 3,
        'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7,
        'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
    };
    
    const parts = dateStr.toLowerCase().trim().split(' ');
    if (parts.length >= 3) {
        const day = parseInt(parts[0]);
        const monthStr = parts[1];
        const year = parseInt(parts[2]);
        
        for (let key in monthMap) {
            if (key.startsWith(monthStr.substring(0, 3))) {
                return new Date(year, monthMap[key], day);
            }
        }
    }
    return null;
}

// Cek apakah acara sudah selesai (tanggal sudah lewat)
function isEventFinished(tanggalNikah) {
    const weddingDate = parseIndonesianDate(tanggalNikah);
    if (!weddingDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);
    
    // Selesai jika tanggal akad sudah lewat (kemarin atau sebelumnya)
    return weddingDate < today;
}

// Hitung hari tersisa hingga akad nikah
function getDaysUntilWedding(tanggalNikah) {
    const weddingDate = parseIndonesianDate(tanggalNikah);
    if (!weddingDate) return null;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);
    
    const diffTime = weddingDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

// Format countdown badge
function getCountdownBadge(tanggalNikah) {
    const days = getDaysUntilWedding(tanggalNikah);
    
    if (days === null) return '';
    if (days < 0) return '<div class="countdown-badge" style="background: linear-gradient(135deg, #9e9e9e 0%, #757575 100%);">Sudah Dilaksanakan</div>';
    if (days === 0) return '<div class="countdown-badge" style="background: linear-gradient(135deg, #e53935 0%, #d32f2f 100%);">🔔 HARI INI</div>';
    if (days === 1) return '<div class="countdown-badge" style="background: linear-gradient(135deg, #ff7043 0%, #ff5722 100%);">⏰ Besok</div>';
    if (days <= 7) return `<div class="countdown-badge" style="background: linear-gradient(135deg, #ffa726 0%, #ff9800 100%);">⏱️ ${days} Hari Lagi</div>`;
    if (days <= 30) return `<div class="countdown-badge" style="background: linear-gradient(135deg, #66bb6a 0%, #4caf50 100%);">📅 ${days} Hari Lagi</div>`;
    return `<div class="countdown-badge" style="background: linear-gradient(135deg, #42a5f5 0%, #2196f3 100%);">📆 ${days} Hari Lagi</div>`;
}

// Cek apakah search term adalah nama lengkap yang exact match
function isExactNameMatch(item, searchTerm) {
    const search = searchTerm.toLowerCase().trim();
    const namaLaki = item.namaLakiLaki.toLowerCase().trim();
    const namaPerempuan = item.namaPerempuan.toLowerCase().trim();
    
    return search === namaLaki || search === namaPerempuan;
}

// Check apakah harus show TTL berdasarkan hasil pencarian
function shouldShowTTL() {
    if (!searchTerm || searchTerm.trim() === '') {
        return false;
    }
    
    if (filteredData.length > 0) {
        return filteredData.some(item => isExactNameMatch(item, searchTerm));
    }
    
    return false;
}

// Update tampilan tombol TTL
function updateTTLButton() {
    const btnIcon = document.getElementById('ttlBtnIcon');
    const btnText = document.getElementById('ttlBtnText');
    const toggleBtn = document.getElementById('toggleTTLBtn');
    
    if (ttlVisible) {
        toggleBtn.style.display = 'flex';
        btnIcon.textContent = '🔒';
        btnText.textContent = 'TTL Ditampilkan';
        toggleBtn.style.background = 'rgba(76, 175, 80, 0.3)';
        toggleBtn.style.borderColor = 'rgba(76, 175, 80, 0.6)';
    } else {
        toggleBtn.style.display = 'none';
    }
}

// Apply visibility ke semua TTL data
function applyTTLVisibility() {
    const ttlElements = document.querySelectorAll('.ttl-data');
    ttlElements.forEach(el => {
        if (ttlVisible) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// Load data dengan Real-time listener
// HANYA TAMPILKAN YANG BELUM SELESAI (untuk website publik)
function loadAnnouncements() {
    const contentDiv = document.getElementById('content');
    
    contentDiv.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Memuat data pengumuman...</p>
        </div>
    `;
    
    try {
        // Query semua data
        const q = query(collection(db, 'announcements'));
        
        unsubscribe = onSnapshot(q, 
            (snapshot) => {
                allData = [];
                
                snapshot.forEach((doc) => {
                    const data = {
                        id: doc.id,
                        ...doc.data()
                    };
                    
                    // FILTER: Hanya tampilkan yang belum selesai
                    if (!isEventFinished(data.tanggalNikah)) {
                        allData.push(data);
                    }
                });
                
                // Sort berdasarkan tanggal akad terdekat
                allData.sort((a, b) => {
                    const dateA = parseIndonesianDate(a.tanggalNikah);
                    const dateB = parseIndonesianDate(b.tanggalNikah);
                    
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return 1;
                    if (!dateB) return -1;
                    
                    return dateA - dateB;
                });
                
                filteredData = [...allData];
                updateStats();
                currentPage = 1;
                renderPage();
                
                console.log('✅ Data loaded (aktif):', allData.length);
            },
            (error) => {
                console.error('❌ Firebase Error:', error);
                contentDiv.innerHTML = `
                    <div class="no-data">
                        <div class="no-data-icon">⚠️</div>
                        <h3>Terjadi Kesalahan</h3>
                        <p>Tidak dapat memuat data dari Firebase. Cek console untuk detail.</p>
                        <p style="font-size: 0.9em; color: #999; margin-top: 10px;">${error.message}</p>
                    </div>
                `;
            }
        );
        
    } catch (error) {
        console.error('❌ Error:', error);
        contentDiv.innerHTML = `
            <div class="no-data">
                <div class="no-data-icon">⚠️</div>
                <h3>Terjadi Kesalahan</h3>
                <p>Pastikan Firebase sudah dikonfigurasi dengan benar.</p>
            </div>
        `;
    }
}

// Update statistik
function updateStats() {
    document.getElementById('totalData').textContent = allData.length;
    document.getElementById('displayedData').textContent = filteredData.length;
}

// Render halaman dengan pagination
function renderPage() {
    const contentDiv = document.getElementById('content');
    const paginationDiv = document.getElementById('pagination');
    
    if (filteredData.length === 0) {
        contentDiv.innerHTML = `
            <div class="no-data">
                <div class="no-data-icon">🔍</div>
                <h3>Tidak Ada Pengumuman Aktif</h3>
                <p>Saat ini tidak ada pengumuman kehendak nikah yang aktif.</p>
            </div>
        `;
        paginationDiv.style.display = 'none';
        return;
    }

    let itemsPerPageActual;
    if (window.innerWidth <= 768) {
        itemsPerPageActual = 1;
    } else if (window.innerWidth <= 900) {
        itemsPerPageActual = 2;
    } else {
        itemsPerPageActual = 3;
    }
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPageActual);
    
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    const startIndex = (currentPage - 1) * itemsPerPageActual;
    const endIndex = startIndex + itemsPerPageActual;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    let html = '<div class="announcements-grid">';
    
    pageData.forEach(item => {
        const countdownBadge = getCountdownBadge(item.tanggalNikah);
        
        html += `
            <div class="announcement-card">
                <div class="card-header">
                    <div class="card-number">
                        <span>${item.nomorPemeriksaan}</span>
                    </div>
                    ${countdownBadge}
                </div>

                <div class="section gender-male">
                    <div class="section-title">Calon Pengantin Laki-Laki</div>
                    <div class="data-row">
                        <div class="data-label">Nama</div>
                        <div class="data-value">${item.namaLakiLaki}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Bin</div>
                        <div class="data-value">${item.binLakiLaki}</div>
                    </div>
                    <div class="data-row ttl-data">
                        <div class="data-label">TTL</div>
                        <div class="data-value">${item.ttlLakiLaki}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Kewarganegaraan</div>
                        <div class="data-value">${item.kewarganegaraanLakiLaki || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Agama</div>
                        <div class="data-value">${item.agamaLakiLaki || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Pekerjaan</div>
                        <div class="data-value">${item.pekerjaanLakiLaki || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Alamat</div>
                        <div class="data-value">${item.alamatLakiLaki}</div>
                    </div>
                </div>

                <div class="section gender-female">
                    <div class="section-title">Calon Pengantin Perempuan</div>
                    <div class="data-row">
                        <div class="data-label">Nama</div>
                        <div class="data-value">${item.namaPerempuan}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Binti</div>
                        <div class="data-value">${item.bintiPerempuan}</div>
                    </div>
                    <div class="data-row ttl-data">
                        <div class="data-label">TTL</div>
                        <div class="data-value">${item.ttlPerempuan}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Kewarganegaraan</div>
                        <div class="data-value">${item.kewarganegaraanPerempuan || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Agama</div>
                        <div class="data-value">${item.agamaPerempuan || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Pekerjaan</div>
                        <div class="data-value">${item.pekerjaanPerempuan || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Alamat</div>
                        <div class="data-value">${item.alamatPerempuan}</div>
                    </div>
                </div>

                <div class="section gender-wali">
                    <div class="section-title">Wali Nikah</div>
                    <div class="data-row">
                        <div class="data-label">Jenis Wali</div>
                        <div class="data-value">${item.jenisWali}</div>
                    </div>
                    ${item.jenisWali === 'Nasab' ? `
                        <div class="data-row">
                            <div class="data-label">Hubungan</div>
                            <div class="data-value">${item.hubunganWali || '-'}</div>
                        </div>
                    ` : `
                        <div class="data-row">
                            <div class="data-label">Sebab</div>
                            <div class="data-value">${item.sebabWali || '-'}</div>
                        </div>
                    `}
                    <div class="data-row">
                        <div class="data-label">Nama</div>
                        <div class="data-value">${item.namaWali}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Bin</div>
                        <div class="data-value">${item.binWali}</div>
                    </div>
                    <div class="data-row ttl-data">
                        <div class="data-label">TTL</div>
                        <div class="data-value">${item.ttlWali}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Kewarganegaraan</div>
                        <div class="data-value">${item.kewarganegaraanWali || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Agama</div>
                        <div class="data-value">${item.agamaWali || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Pekerjaan</div>
                        <div class="data-value">${item.pekerjaanWali || '-'}</div>
                    </div>
                    <div class="data-row">
                        <div class="data-label">Alamat</div>
                        <div class="data-value">${item.alamatWali}</div>
                    </div>
                </div>

                <div class="section">
                    <div class="schedule-highlight">
                        <div class="day">${item.hariNikah}</div>
                        <div class="date">${item.tanggalNikah}</div>
                        <div class="location" title="${item.tempatNikah}">📍 ${item.tempatNikah}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contentDiv.innerHTML = html;
    
    applyTTLVisibility();
    updateTTLButton();
    
    if (totalPages > 1) {
        paginationDiv.style.display = 'flex';
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('prevBtn').disabled = currentPage === 1;
        document.getElementById('nextBtn').disabled = currentPage === totalPages;
    } else {
        paginationDiv.style.display = 'none';
    }
}

// Ganti halaman
window.changePage = function(direction) {
    currentPage += direction;
    renderPage();
    
    const statsBar = document.getElementById('statsBar');
    if (statsBar) {
        const yOffset = -20;
        const y = statsBar.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};

// Search function
function performSearch() {
    searchTerm = document.getElementById('searchInput').value;
    const search = searchTerm.toLowerCase().trim();
    
    if (search === '') {
        filteredData = [...allData];
        ttlVisible = false;
    } else {
        filteredData = allData.filter(item => {
            return (
                item.namaLakiLaki.toLowerCase().includes(search) ||
                item.namaPerempuan.toLowerCase().includes(search) ||
                item.tanggalNikah.toLowerCase().includes(search) ||
                item.hariNikah.toLowerCase().includes(search) ||
                item.nomorPemeriksaan.toLowerCase().includes(search)
            );
        });
        
        ttlVisible = shouldShowTTL();
    }
    
    updateStats();
    currentPage = 1;
    renderPage();
}

// Event listener untuk search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

// Load data saat halaman dimuat
loadAnnouncements();

// Re-render saat resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        renderPage();
    }, 250);
});

// Cleanup saat halaman ditutup
window.addEventListener('beforeunload', function() {
    if (unsubscribe) {
        unsubscribe();
    }
});
