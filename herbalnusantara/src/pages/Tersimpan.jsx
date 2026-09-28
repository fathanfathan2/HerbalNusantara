import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineBookmarkSquare, HiOutlineArrowRight } from "react-icons/hi2";
import { ushadaData } from "../data/ushadaData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Tersimpan() {
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();

  // Ambil data dari localStorage saat halaman dimuat
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    // Filter ushadaData untuk mencari data yang ID-nya ada di dalam bookmarks
    const filteredData = ushadaData.filter((data) => bookmarks.includes(data.id));
    setSavedItems(filteredData);
  }, []);

  return (
    <div className="p-6 sm:p-10 min-h-full flex flex-col">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-4xl mx-auto w-full space-y-8"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col gap-4 pt-4 sm:pt-0">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-emerald-900 tracking-tight mb-2">
              Koleksi Tersimpan
            </h1>
            <p className="text-stone-500 font-medium">
              Kumpulan racikan dan tanaman herbal favoritmu.
            </p>
          </div>
        </motion.div>

        {/* Kondisi jika belum ada yang disimpan */}
        {savedItems.length === 0 ? (
          <motion.div variants={item} className="bg-stone-100 rounded-3xl p-10 text-center border border-stone-200/60 mt-10">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-stone-400">
              <HiOutlineBookmarkSquare className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-xl text-stone-800 mb-2">Belum ada koleksi</h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto mb-6">
              Kamu belum menyimpan resep apapun. Jelajahi pustaka kami dan simpan racikan yang kamu suka!
            </p>
            <button 
              onClick={() => navigate("/pustaka")}
              className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20"
            >
              Jelajahi Pustaka <HiOutlineArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          /* Grid Kartu Data (Sama seperti di Pustaka/Deteksi) */
          <motion.div variants={item} className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {savedItems.map((itemData) => (
                <motion.div 
                  key={itemData.id}
                  onClick={() => navigate(`/detail/${itemData.id}`)}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-stone-200/60 shadow-lg shadow-stone-200/40 hover:shadow-xl transition-all cursor-pointer group flex flex-col sm:flex-row h-auto sm:h-40"
                >
                  <div className="w-full sm:w-2/5 h-40 sm:h-full overflow-hidden relative shrink-0">
                    <img 
                      src={itemData.image} 
                      alt={itemData.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-emerald-800 uppercase tracking-wider shadow-sm sm:hidden">
                      {itemData.type}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col justify-center flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif text-xl text-stone-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {itemData.name}
                      </h3>
                      <span className="hidden sm:inline-block bg-stone-100 px-2 py-0.5 rounded text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                        {itemData.type}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-3">
                      {itemData.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {itemData.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md text-[10px] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}