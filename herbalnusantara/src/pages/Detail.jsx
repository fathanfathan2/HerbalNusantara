import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  HiOutlineArrowLeft, 
  HiOutlineCheckCircle, 
  HiOutlineListBullet,
  HiOutlineBookmark,
  HiBookmark
} from "react-icons/hi2";
import { ushadaData } from "../data/ushadaData";
import toast from "react-hot-toast"; // <-- Tambahkan ini

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const data = ushadaData.find((item) => item.id === id);

  // Cek apakah resep ini sudah ada di localStorage saat halaman dimuat
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setIsBookmarked(saved.includes(id));
  }, [id]);

  // Fungsi untuk menyimpan/menghapus bookmark
const toggleBookmark = () => {
  let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (isBookmarked) {
    // Jika sebelumnya tersimpan, maka hapus
    saved = saved.filter((savedId) => savedId !== id);
    toast("Dihapus dari Tersimpan", { icon: "🗑️" }); // <-- Notifikasi hapus
  } else {
    // Jika belum, maka simpan
    saved.push(id);
    toast.success("Resep berhasil disimpan!", { icon: "🔖" }); // <-- Notifikasi simpan
  }
  localStorage.setItem("bookmarks", JSON.stringify(saved));
  setIsBookmarked(!isBookmarked);
};

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-stone-500">
        <p>Racikan tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-24 sm:pb-10 bg-stone-50">
      {/* Gambar Header */}
      <div className="relative w-full h-72 sm:h-96 sm:rounded-b-[3rem] overflow-hidden shadow-lg">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-black/20 to-transparent"></div>
        
        {/* Tombol Kembali (Kiri Atas) */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/40 transition z-10"
        >
          <HiOutlineArrowLeft className="h-6 w-6" />
        </button>

        {/* Tombol Bookmark (Kanan Atas) */}
        <button 
          onClick={toggleBookmark}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white/40 transition z-10"
        >
          {isBookmarked ? (
            <HiBookmark className="h-6 w-6 text-amber-400" />
          ) : (
            <HiOutlineBookmark className="h-6 w-6" />
          )}
        </button>

        {/* Judul */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white z-10">
          <span className="bg-emerald-600/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-sm">
            {data.type}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl tracking-tight drop-shadow-md">{data.name}</h1>
        </div>
      </div>

      <motion.div 
        initial="hidden" 
        animate="show" 
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-3xl mx-auto px-6 sm:px-0 mt-8 space-y-8"
      >
        {/* Deskripsi & Kategori */}
        <motion.div variants={fadeUp}>
          <p className="text-stone-600 text-lg leading-relaxed">{data.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {data.tags.map((tag, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-xl text-xs font-medium shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bahan-bahan */}
        {data.ingredients && data.ingredients.length > 0 && (
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-xl shadow-stone-200/30">
            <h2 className="font-serif text-2xl text-stone-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
                <HiOutlineListBullet className="h-6 w-6" />
              </div>
              Bahan-bahan
            </h2>
            <ul className="space-y-4">
              {data.ingredients.map((bahan, idx) => (
                <li key={idx} className="flex items-start gap-3 text-stone-600 font-medium">
                  <HiOutlineCheckCircle className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{bahan}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Langkah Pembuatan */}
        {data.steps && data.steps.length > 0 && (
          <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/60 shadow-xl shadow-stone-200/30">
            <h2 className="font-serif text-2xl text-stone-800 mb-8 flex items-center gap-3">
              <span className="bg-emerald-700 text-stone-50 px-3 py-1.5 rounded-xl text-sm font-bold uppercase tracking-wider">
                Langkah
              </span>
              Cara Pembuatan
            </h2>
            <div className="space-y-6">
              {data.steps.map((langkah, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold shadow-sm shrink-0">
                      {idx + 1}
                    </div>
                    {idx !== data.steps.length - 1 && <div className="w-0.5 h-full bg-stone-200 mt-2"></div>}
                  </div>
                  <p className="text-stone-600 pt-1 pb-4 leading-relaxed">{langkah}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}