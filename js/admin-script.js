// ============================================
// SIKEN9 Admin Panel - DEBUG Version
// ============================================

import { db, auth } from './firebase-config.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDocs, 
    deleteDoc, 
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

console.log('🔵 Admin script loaded');
console.log('🔵 Auth object:', auth);
console.log('🔵 DB object:', db);

let currentEditId = null;
let unsubscribe = null;
let allDataAdmin = [];
let currentFilter = 'aktif';

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

function isEventFinished(tanggalNikah) {
    const weddingDate = parseIndonesianDate(tanggalNikah);
    if (!weddingDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);
    
    return weddingDate < today;
}

function getAutoStatus(tanggalNikah) {
    const weddingDate = parseIndonesianDate(tanggalNikah);
    if (!weddingDate) return 'Unknown';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);
    
    if (weddingDate < today) return 'Arsip';
    if (weddingDate.getTime() === today.getTime()) return 'Hari Ini';
    return 'Aktif';
}

// Check auth state
console.log('🔵 Setting up auth listener...');
onAuthStateChanged(auth, (user) => {
    console.log('🔵 Auth state changed:', user);
    if (user) {
        console.log('✅ User logged in:', user.email);
        showDashboard();
        loadData();
    } else {
        console.log('❌ No user logged in');
        showLogin();
    }
});

function showLogin() {
    console.log('🔵 Showing login screen');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').classList.remove('show');
}

function showDashboard() {
    console.log('🔵 Showing dashboard');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').classList.add('show');
}

// Handle Login
window.handleLogin = async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    
    console.log('🔵 Attempting login with email:', email);
    
    try {
        console.log('🔵 Calling signInWithEmailAndPassword...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Login successful!', userCredential.user);
        errorDiv.classList.remove('show');
    } catch (error) {
        console.error('❌ Login error:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        
        let errorMessage = '❌ Login gagal! ';
        
        switch(error.code) {
            case 'auth/invalid-email':
                errorMessage += 'Format email tidak valid.';
                break;
            case 'auth/user-not-found':
                errorMessage += 'User tidak ditemukan. Pastikan sudah dibuat di Firebase Authentication.';
                break;
            case 'auth/wrong-password':
                errorMessage += 'Password salah!';
                break;
            case 'auth/invalid-credential':
                errorMessage += 'Email atau password salah!';
                break;
            case 'auth/too-many-requests':
                errorMessage += 'Terlalu banyak percobaan. Tunggu sebentar.';
                break;
            default:
                errorMessage += error.message;
        }
        
        errorDiv.innerHTML = `
            <strong>${errorMessage}</strong><br>
            <small style="display: block; margin-top: 5px;">Error code: ${error.code}</small>
        `;
        errorDiv.classList.add('show');
    }
};

// Handle Logout
window.handleLogout = async function() {
    if (confirm('Yakin ingin logout?')) {
        try {
            await signOut(auth);
            if (unsubscribe) unsubscribe();
            console.log('✅ Logged out successfully');
        } catch (error) {
            console.error('❌ Logout error:', error);
        }
    }
};

// Load data
function loadData() {
    console.log('🔵 loadData() called');
    
    const q = collection(db, 'announcements');
    
    console.log('🔵 Setting up Firestore listener...');
    
    unsubscribe = onSnapshot(q, 
        (snapshot) => {
            console.log('✅ Snapshot received!');
            console.log('📊 Snapshot size:', snapshot.size);
            
            allDataAdmin = [];
            snapshot.forEach((doc) => {
                allDataAdmin.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            console.log('📊 Total data loaded:', allDataAdmin.length);
            
            allDataAdmin.sort((a, b) => {
                const dateA = parseIndonesianDate(a.tanggalNikah);
                const dateB = parseIndonesianDate(b.tanggalNikah);
                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;
                return dateB - dateA;
            });
            
            renderTable();
            updateStats();
        },
        (error) => {
            console.error('❌ Firestore listener error:', error);
            alert('Error loading data: ' + error.message);
        }
    );
}

function updateStats() {
    const aktif = allDataAdmin.filter(item => !isEventFinished(item.tanggalNikah)).length;
    const arsip = allDataAdmin.filter(item => isEventFinished(item.tanggalNikah)).length;
    
    console.log('📊 Stats - Aktif:', aktif, 'Arsip:', arsip, 'Total:', allDataAdmin.length);
    
    document.getElementById('statsAktif').textContent = aktif;
    document.getElementById('statsArsip').textContent = arsip;
    document.getElementById('statsTotal').textContent = allDataAdmin.length;
}

function getFilteredData() {
    if (currentFilter === 'aktif') {
        return allDataAdmin.filter(item => !isEventFinished(item.tanggalNikah));
    } else if (currentFilter === 'arsip') {
        return allDataAdmin.filter(item => isEventFinished(item.tanggalNikah));
    } else {
        return allDataAdmin;
    }
}

window.changeFilter = function(filter) {
    console.log('🔵 Filter changed to:', filter);
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('filter-' + filter).classList.add('active');
    
    renderTable();
};

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const data = getFilteredData();
    
    console.log('🔵 Rendering table with', data.length, 'items');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Tidak ada data untuk filter ini</td></tr>';
        return;
    }
    
    let html = '';
    data.forEach(item => {
        const autoStatus = getAutoStatus(item.tanggalNikah);
        const isArsip = isEventFinished(item.tanggalNikah);
        
        html += `
            <tr ${isArsip ? 'style="background: #f5f5f5; opacity: 0.8;"' : ''}>
                <td>${item.nomorPemeriksaan}</td>
                <td>${item.namaLakiLaki}</td>
                <td>${item.namaPerempuan}</td>
                <td>${item.tanggalNikah}</td>
                <td>
                    <span style="padding: 5px 10px; border-radius: 5px; font-size: 0.85em; font-weight: 600; background: ${
                        autoStatus === 'Aktif' ? '#d4edda' : 
                        autoStatus === 'Hari Ini' ? '#fff3cd' : '#e8e8e8'
                    }; color: ${
                        autoStatus === 'Aktif' ? '#155724' : 
                        autoStatus === 'Hari Ini' ? '#856404' : '#666'
                    };">
                        ${autoStatus === 'Arsip' ? '📦 ' : autoStatus === 'Hari Ini' ? '🔔 ' : '✅ '}${autoStatus}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" onclick="editData('${item.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteData('${item.id}', '${item.nomorPemeriksaan}')">Hapus</button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    console.log('✅ Table rendered');
}

window.openAddModal = function() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Tambah Pengumuman';
    document.getElementById('dataForm').reset();
    document.getElementById('editId').value = '';
    
    document.getElementById('kewarganegaraanLakiLaki').value = 'WNI';
    document.getElementById('agamaLakiLaki').value = 'Islam';
    document.getElementById('kewarganegaraanPerempuan').value = 'WNI';
    document.getElementById('agamaPerempuan').value = 'Islam';
    document.getElementById('kewarganegaraanWali').value = 'WNI';
    document.getElementById('agamaWali').value = 'Islam';
    
    document.getElementById('formModal').classList.add('show');
};

window.closeModal = function() {
    document.getElementById('formModal').classList.remove('show');
};

window.toggleWaliFields = function() {
    const jenisWali = document.getElementById('jenisWali').value;
    const hubunganGroup = document.getElementById('hubunganWaliGroup');
    const sebabGroup = document.getElementById('sebabWaliGroup');
    
    if (jenisWali === 'Nasab') {
        hubunganGroup.style.display = 'block';
        sebabGroup.style.display = 'none';
        document.getElementById('hubunganWali').required = true;
        document.getElementById('sebabWali').required = false;
    } else {
        hubunganGroup.style.display = 'none';
        sebabGroup.style.display = 'block';
        document.getElementById('hubunganWali').required = false;
        document.getElementById('sebabWali').required = true;
    }
};

window.editData = async function(id) {
    console.log('🔵 Editing data:', id);
    try {
        const snapshot = await getDocs(collection(db, 'announcements'));
        let itemData = null;
        
        snapshot.forEach((doc) => {
            if (doc.id === id) {
                itemData = { id: doc.id, ...doc.data() };
            }
        });
        
        if (!itemData) {
            alert('Data tidak ditemukan!');
            return;
        }
        
        console.log('✅ Data found:', itemData);
        
        currentEditId = id;
        document.getElementById('modalTitle').textContent = 'Edit Pengumuman';
        document.getElementById('editId').value = id;
        
        // Fill form (simplified for debug)
        document.getElementById('nomorPemeriksaan').value = itemData.nomorPemeriksaan;
        document.getElementById('namaLakiLaki').value = itemData.namaLakiLaki;
        document.getElementById('binLakiLaki').value = itemData.binLakiLaki;
        document.getElementById('ttlLakiLaki').value = itemData.ttlLakiLaki;
        document.getElementById('kewarganegaraanLakiLaki').value = itemData.kewarganegaraanLakiLaki;
        document.getElementById('agamaLakiLaki').value = itemData.agamaLakiLaki;
        document.getElementById('pekerjaanLakiLaki').value = itemData.pekerjaanLakiLaki;
        document.getElementById('alamatLakiLaki').value = itemData.alamatLakiLaki;
        
        document.getElementById('namaPerempuan').value = itemData.namaPerempuan;
        document.getElementById('bintiPerempuan').value = itemData.bintiPerempuan;
        document.getElementById('ttlPerempuan').value = itemData.ttlPerempuan;
        document.getElementById('kewarganegaraanPerempuan').value = itemData.kewarganegaraanPerempuan;
        document.getElementById('agamaPerempuan').value = itemData.agamaPerempuan;
        document.getElementById('pekerjaanPerempuan').value = itemData.pekerjaanPerempuan;
        document.getElementById('alamatPerempuan').value = itemData.alamatPerempuan;
        
        document.getElementById('jenisWali').value = itemData.jenisWali;
        toggleWaliFields();
        document.getElementById('hubunganWali').value = itemData.hubunganWali || '';
        document.getElementById('sebabWali').value = itemData.sebabWali || '';
        document.getElementById('namaWali').value = itemData.namaWali;
        document.getElementById('binWali').value = itemData.binWali;
        document.getElementById('ttlWali').value = itemData.ttlWali;
        document.getElementById('kewarganegaraanWali').value = itemData.kewarganegaraanWali;
        document.getElementById('agamaWali').value = itemData.agamaWali;
        document.getElementById('pekerjaanWali').value = itemData.pekerjaanWali;
        document.getElementById('alamatWali').value = itemData.alamatWali;
        
        document.getElementById('hariNikah').value = itemData.hariNikah;
        document.getElementById('tanggalNikah').value = itemData.tanggalNikah;
        document.getElementById('tempatNikah').value = itemData.tempatNikah;
        
        document.getElementById('formModal').classList.add('show');
        
    } catch (error) {
        console.error('❌ Error loading data:', error);
        alert('Gagal memuat data: ' + error.message);
    }
};

window.deleteData = async function(id, nomorPemeriksaan) {
    if (!confirm(`Yakin ingin menghapus data ${nomorPemeriksaan}?`)) {
        return;
    }
    
    console.log('🔵 Deleting:', id);
    
    try {
        await deleteDoc(doc(db, 'announcements', id));
        console.log('✅ Deleted successfully');
        alert('✅ Data berhasil dihapus!');
    } catch (error) {
        console.error('❌ Delete error:', error);
        alert('❌ Gagal menghapus: ' + error.message);
    }
};

window.handleSubmit = async function(e) {
    e.preventDefault();
    
    console.log('🔵 Submitting form...');
    
    const data = {
        nomorPemeriksaan: document.getElementById('nomorPemeriksaan').value,
        namaLakiLaki: document.getElementById('namaLakiLaki').value,
        binLakiLaki: document.getElementById('binLakiLaki').value,
        ttlLakiLaki: document.getElementById('ttlLakiLaki').value,
        kewarganegaraanLakiLaki: document.getElementById('kewarganegaraanLakiLaki').value,
        agamaLakiLaki: document.getElementById('agamaLakiLaki').value,
        pekerjaanLakiLaki: document.getElementById('pekerjaanLakiLaki').value,
        alamatLakiLaki: document.getElementById('alamatLakiLaki').value,
        
        namaPerempuan: document.getElementById('namaPerempuan').value,
        bintiPerempuan: document.getElementById('bintiPerempuan').value,
        ttlPerempuan: document.getElementById('ttlPerempuan').value,
        kewarganegaraanPerempuan: document.getElementById('kewarganegaraanPerempuan').value,
        agamaPerempuan: document.getElementById('agamaPerempuan').value,
        pekerjaanPerempuan: document.getElementById('pekerjaanPerempuan').value,
        alamatPerempuan: document.getElementById('alamatPerempuan').value,
        
        jenisWali: document.getElementById('jenisWali').value,
        hubunganWali: document.getElementById('hubunganWali').value,
        sebabWali: document.getElementById('sebabWali').value,
        namaWali: document.getElementById('namaWali').value,
        binWali: document.getElementById('binWali').value,
        ttlWali: document.getElementById('ttlWali').value,
        kewarganegaraanWali: document.getElementById('kewarganegaraanWali').value,
        agamaWali: document.getElementById('agamaWali').value,
        pekerjaanWali: document.getElementById('pekerjaanWali').value,
        alamatWali: document.getElementById('alamatWali').value,
        
        hariNikah: document.getElementById('hariNikah').value,
        tanggalNikah: document.getElementById('tanggalNikah').value,
        tempatNikah: document.getElementById('tempatNikah').value,
        
        updatedAt: new Date().toISOString()
    };
    
    if (!currentEditId) {
        data.createdAt = new Date().toISOString();
    }
    
    console.log('📄 Data to save:', data);
    
    try {
        const docId = currentEditId || data.nomorPemeriksaan.replace(/[^a-zA-Z0-9]/g, '_');
        console.log('🔵 Saving to document ID:', docId);
        
        await setDoc(doc(db, 'announcements', docId), data);
        
        console.log('✅ Saved successfully!');
        alert(currentEditId ? '✅ Data berhasil diupdate!' : '✅ Data berhasil ditambahkan!');
        closeModal();
        document.getElementById('dataForm').reset();
        
    } catch (error) {
        console.error('❌ Save error:', error);
        alert('❌ Gagal menyimpan: ' + error.message);
    }
};

console.log('✅ Admin script initialization complete');