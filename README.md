# Proyek Perbandingan Proyeksi Peta: Web Mercator vs. EPSG:4326

## Deskripsi Singkat

Proyek ini merupakan implementasi sederhana untuk memvisualisasikan dan membandingkan dua sistem proyeksi peta yang umum digunakan dalam aplikasi web: Web Mercator (EPSG:3857) dan EPSG:4326 (WGS 84). Studi kasus yang diambil adalah pemetaan batas wilayah dan lokasi Sekolah Dasar Negeri (SDN) di Kecamatan Gunung Puyuh, Sukabumi.

Tujuan utama dari proyek ini adalah untuk memahami secara praktis bagaimana perbedaan sistem proyeksi memengaruhi tampilan visual peta dan mengapa Web Mercator menjadi standar de-facto untuk platform pemetaan web seperti Google Maps dan OpenStreetMap.

## Tampilan Peta

Proyek ini menghasilkan dua peta interaktif dengan sumber data GeoJSON yang sama, namun dirender menggunakan sistem proyeksi yang berbeda.

### 1. Peta Default (Web Mercator - EPSG:3857)

Peta ini menggunakan proyeksi default dari Leaflet.js, yaitu Web Mercator. Tampilannya terlihat proporsional dan peta dasar dari OpenStreetMap berhasil dimuat dengan sempurna, memberikan konteks geografis yang lengkap seperti jalan, bangunan, dan sungai.

**File:** `index.html`

*(Di sini nanti bisa ditambahkan screenshot untuk peta Web Mercator)*

### 2. Peta EPSG:4326

Peta kedua ini secara eksplisit diatur untuk menggunakan sistem koordinat geografis EPSG:4326. Hasilnya menunjukkan perbedaan yang signifikan:

- **Tampilan Visual:** Peta terlihat sedikit lebih lebar atau "gepeng" karena memetakan derajat lintang dan bujur secara langsung ke bidang datar.

- **Peta Dasar (Basemap):** Peta dasar dari OpenStreetMap gagal dimuat. Ini terjadi karena penyedia tile peta (OpenStreetMap) menyajikan gambarnya dalam format Web Mercator. Adanya ketidakcocokan sistem proyeksi antara "kanvas" (EPSG:4326) dan "gambar" (Web Mercator) membuat tile tidak dapat dirender.

**File:** `peta-2.html`

*(Di sini nanti bisa ditambahkan screenshot untuk peta EPSG:4326)*

## Analisis Perbedaan (Jawaban Tugas)

Berdasarkan kedua peta di atas, berikut adalah jawaban singkat mengenai perbedaannya:

### a. Apa bedanya tampilan kedua peta?

Perbedaan utama terletak pada tampilan visual dan ketersediaan peta dasar. Peta Web Mercator menampilkan peta dasar OpenStreetMap dengan bentuk yang proporsional seperti yang biasa kita lihat. Sebaliknya, peta EPSG:4326 memiliki tampilan yang sedikit terdistorsi (lebih lebar) dan tidak dapat memuat peta dasar, sehingga hanya menampilkan data GeoJSON di atas latar belakang kosong.

### b. Kenapa peta web lebih sering pakai Web Mercator?

Peta web lebih sering menggunakan Web Mercator (EPSG:3857) karena proyeksi ini dirancang untuk efisiensi dan kompatibilitas. Bentuknya yang mendekati persegi memudahkan pembagian peta menjadi tile-tile gambar (ubin) 256x256 piksel, yang dapat dimuat dengan cepat oleh browser. Hampir semua penyedia peta dasar global seperti Google Maps dan OpenStreetMap telah mengadopsi standar ini, sehingga memastikan interoperabilitas di seluruh platform web.

## Struktur File

```
assignment3-gis/
├── index.html          # Peta utama (Web Mercator)
├── peta-2.html         # Peta kedua (EPSG:4326)
├── style.css           # Styling untuk peta utama
├── style-2.css         # Styling untuk peta kedua
├── map.js              # JavaScript peta utama
├── map-2.js            # JavaScript peta kedua
├── map.geojson         # Data geografis (SDN & batas kecamatan)
└── README.md           # Dokumentasi proyek
```

## Cara Menjalankan

1. Clone atau download repository ini
2. Buka file `index.html` di browser untuk melihat peta Web Mercator
3. Buka file `peta-2.html` di browser untuk melihat peta EPSG:4326
4. Bandingkan tampilan kedua peta

## Teknologi yang Digunakan

- **HTML** - Struktur halaman web
- **CSS** - Styling dan layout responsif
- **JavaScript** - Logika interaktif dan manipulasi peta
- **Leaflet.js** - Library untuk peta interaktif
- **OpenStreetMap** - Sebagai penyedia data peta dasar
- **GeoJSON** - Sebagai format data geografis

## Fitur

- ✅ Peta interaktif dengan zoom dan pan
- ✅ Layer control untuk menampilkan/menyembunyikan data
- ✅ Popup informasi untuk setiap feature
- ✅ Scale control dan koordinat display
- ✅ Responsive design untuk mobile
- ✅ Error handling dan loading states
- ✅ Perbandingan visual dua sistem proyeksi

## Kesimpulan

Proyek ini berhasil mendemonstrasikan perbedaan praktis antara Web Mercator dan EPSG:4326 dalam konteks pemetaan web. Saya dapat melihat secara langsung mengapa Web Mercator menjadi standar industri untuk aplikasi peta web, terutama dalam hal kompatibilitas dengan tile server dan efisiensi rendering.