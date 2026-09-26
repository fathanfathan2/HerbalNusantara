// src/data/ushadaData.js

// 1. DATA KATALOG TANAMAN
export const tanamanList = [
  {
    id: "T001",
    nama: "Jahe Merah",
    khasiatUtama: "Meredakan Mual & Menghangatkan Tubuh",
    deskripsi: "Rimpang dengan rasa pedas yang khas, sangat baik untuk melancarkan peredaran darah dan mengatasi masuk angin.",
    gambar: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=500&auto=format&fit=crop" // Gambar placeholder
  },
  {
    id: "T002",
    nama: "Kunyit",
    khasiatUtama: "Anti-inflamasi & Meredakan Nyeri Lambung",
    deskripsi: "Mengandung kurkumin yang sangat baik untuk meredakan peradangan dan masalah pencernaan seperti maag.",
    gambar: "https://images.unsplash.com/photo-1615486171448-4af6215f5734?q=80&w=500&auto=format&fit=crop"
  }
];

// 2. DATA ARTIKEL & RAMUAN
export const artikelList = [
  {
    id: "A001",
    judul: "Ramuan Jahe Merah Penangkal Masuk Angin",
    deskripsiSingkat: "Resep tradisional simpel untuk mengusir hawa dingin dan mual.",
    panduanPraktis: "Cuci bersih 2 ruas jahe merah, geprek, lalu rebus dengan 2 gelas air hingga tersisa 1 gelas. Minum selagi hangat. Pastikan istirahat dan tidur 7-8 jam untuk memaksimalkan efeknya.",
    bahan: ["T001"], // Relasi ke ID Tanaman
    artikelTerkait: ["A002"]
  },
  {
    id: "A002",
    judul: "Kunyit Asam Penyelamat Lambung",
    deskripsiSingkat: "Paduan kunyit dan asam jawa untuk menenangkan perut kembung dan perih.",
    panduanPraktis: "Parut 3 ruas kunyit, peras airnya. Campur dengan sedikit asam jawa dan air hangat. Minum 1x sehari setelah makan.",
    bahan: ["T002"],
    artikelTerkait: ["A001"]
  }
];

// 3. LOGIKA DETEKSI KELUHAN
// Ini yang akan kita cocokkan dengan input user nanti
export const keluhanList = [
  {
    id: "K001",
    gejala: "Mual & Masuk Angin",
    rekomendasiRamuan: "A001", // Langsung mengarah ke ID Artikel Ramuan Jahe Merah
    pesanSingkat: "Tubuhmu butuh kehangatan. Jahe merah sangat cocok untuk meredakan mual dan membuang gas berlebih di perut."
  },
  {
    id: "K002",
    gejala: "Perut Perih / Maag",
    rekomendasiRamuan: "A002", 
    pesanSingkat: "Kunyit memiliki zat anti-radang yang bisa melapisi dan menenangkan dinding lambungmu."
  }
];

// 4. TEKS DISCLAIMER GLOBAL
export const medicalDisclaimer = "Informasi ramuan herbal dari web ini berfungsi sebagai edukasi preventif atau pertolongan alami berbasis tradisional. Ini BUKAN pengganti konsultasi medis profesional. Segera periksakan ke dokter jika keluhan berlanjut atau memburuk.";