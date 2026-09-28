# AloePedia — Ensiklopedia Botani Edukasi Tanaman Lidah Buaya (*Aloe vera*)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Website edukasi botani modern, interaktif, komprehensif, dan responsif dalam Bahasa Indonesia yang didedikasikan untuk pelajar, mahasiswa, guru biologi, dan masyarakat luas yang ingin mempelajari tanaman **Lidah Buaya (*Aloe vera*)** secara ilmiah dan terpercaya.

---

## 🌿 Gambaran Proyek

AloePedia dirancang dengan estetika **modern botanical** bernuansa alam (*sage green*, *deep forest*, putih bersih, dan krem lembut) untuk memberikan pengalaman literasi sains yang elegan, nyaman dibaca, dan bebas dari kebosanan teks panjang.

### Fitur Utama:
- **Navigasi Lengkap & Sticky:** Header tetap terlihat dengan penanda posisi scroll (*scrollspy*) dan indikator persentase membaca (*reading progress bar*).
- **Mode Gelap / Terang (Dark / Light Mode):** Penggantian tema yang tersimpan di memori lokal (*localStorage*).
- **Pencarian Cepat Cerdas (Instant Search Modal):** Akses instan menggunakan tombol navigasi atau pintasan `Ctrl + K`.
- **Penjelajah Irisan Daun Interaktif:** Eksplorasi anatomi mikroskopis membedakan kutikula luar, sel perisikel lateks (*aloin*), dan inti gel bening (*parenkim*).
- **Tinjauan Kritis Bukti Sains:** Membedakan secara tegas bukti klinis kuat vs aplikasi kosmetik vs penelitian awal.
- **Panduan Budidaya Langkah demi Langkah:** Dari pemilihan anakan (*pups*), media tanam porus, hingga pemanenan higienis.
- **Diagnosis Masalah Tanaman (Problem & Solution):** Solusi visual untuk daun menguning, busuk akar, kekeringan, dan hama kutu putih.
- **Tutorial Pasca Panen 8 Langkah:** Cara benar meniriskan getah kuning lateks sebelum mengambil gel bening.
- **Tabel Komparasi Gel vs Lateks:** Perbandingan responsif untuk perangkat seluler maupun desktop.
- **Galeri Fotografi Botani & Lightbox:** Koleksi potret resolusi tinggi dengan filter kategori dan mode pratinjau penuh.
- **Accordion FAQ 10+ Pertanyaan:** Menjawab pertanyaan botani paling sering diajukan.
- **Kuis Pilihan Ganda Interaktif:** 7 soal botani dengan umpan balik langsung, penjelasan ilmiah, dan kalkulasi skor otomatis.
- **Kepustakaan Ilmiah Kredibel:** Mengacu pada monograf WHO, NCCIH (NIH USA), Kew Royal Botanic Gardens (POWO), dan jurnal PubMed.

---

## 📁 Struktur Direktori

```text
TANAMAN-HERBAL-LIDAH-BUAYA/
├── index.html          # Struktur dokumen semantik HTML5 dengan 22 bab lengkap
├── style.css           # Sistem desain botanical CSS modern (responsif & dark mode)
├── script.js           # Logika interaktif: kuis, pencarian, akordeon, scrollspy, lightbox
├── README.md           # Dokumentasi resmi proyek
└── assets/
    └── images/         # Foto botani berkualitas tinggi
        ├── hero.jpg        # Tanaman lidah buaya segar berembun pagi
        ├── gel_slice.jpg   # Kubus kristal irisan gel bening
        ├── flower.jpg      # Bunga lidah buaya mekar berwarna jingga
        ├── latex.jpg       # Eksudat lateks aloin kuning di laboratorium
        ├── farm.jpg        # Perkebunan budidaya organik
        ├── indoor.jpg      # Tanaman hias pot keramik interior
        └── products.jpg    # Formulasi kosmetik dan produk olahan
```

---

## 🚀 Cara Menjalankan Secara Lokal

Website ini dibangun menggunakan teknologi web murni (*Vanilla HTML, CSS, JavaScript*) tanpa memerlukan instalasi dependensi kompleks:

### Opsi 1: Buka Langsung
Cukup klik dua kali file `index.html` di komputer Anda untuk membukanya pada browser apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Opsi 2: Menggunakan Local Web Server (Python)
Jika Anda memiliki Python terpasang di komputer:
```bash
python -m http.server 8080
```
Buka browser dan kunjungi:
```
http://localhost:8080
```

---

## 🔬 Klasifikasi Taksonomi Tanaman

| Tingkat | Takson Ilmiah |
|---|---|
| **Kingdom** | Plantae (Tumbuhan) |
| **Klad** | Tracheophytes |
| **Klad** | Angiosperms |
| **Klad** | Monocots |
| **Ordo** | Asparagales |
| **Famili** | Asphodelaceae |
| **Subfamili** | Asphodeloideae |
| **Genus** | *Aloe* L. |
| **Spesies** | *Aloe vera* (L.) Burm.f. |

---

## 📜 Lisensi & Penafian

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE).

> **Penafian Kesehatan:** Informasi yang disajikan dalam website ini bersifat edukatif dan umum, serta tidak dimaksudkan untuk menggantikan diagnosis medis, saran dokter, atau resep pengobatan profesional.
