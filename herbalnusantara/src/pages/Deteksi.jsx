import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineMagnifyingGlass, HiOutlineSparkles } from "react-icons/hi2";
import { ushadaData } from "../data/ushadaData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const commonSymptoms = [
  "Masuk Angin", "Pegal", "Mual", "Batuk", "Nyeri Haid", "Luka Luar"
];

export default function Deteksi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const navigate = useNavigate();

  // Logika Pencarian: Mencocokkan input dengan array 'symptoms' di database
  const filteredResults = useMemo(() => {
    const query = activeFilter || searchQuery;
    
    // PERUBAHAN: Jika belum ada pencarian/filter, tampilkan SEMUA data
    if (!query.trim()) return ushadaData; 

    return ushadaData.filter((data) =>
      data.symptoms.some((symp) => symp.toLowerCase().includes(query.toLowerCase()))
    );
  }, [searchQuery, activeFilter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setActiveFilter(""); 
  };

  const handleFilter = (symptom) => {
    if (activeFilter === symptom) {
      setActiveFilter(""); 
    } else {
      setActiveFilter(symptom);
      setSearchQuery(""); 
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-full flex flex-col">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-4xl mx-auto w-full space-y-8"
      >
        {/* Header & Search Bar */}
        <motion.div variants={item} className="flex flex-col gap-4 pt-4 sm:pt-0">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-emerald-900 tracking-tight mb-2">
              Deteksi Keluhan
            </h1>
            <p className="text-stone-500 font-medium">
              Apa yang sedang kamu rasakan hari ini?
            </p>
          </div>

          <div className="relative mt-2">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Cari keluhan... (cth: mual, pegal)"
              className="w-full bg-white border border-stone-200/80 rounded-2xl py-4 pl-12 pr-4 text-stone-800 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-2">
            {commonSymptoms.map((symp) => (
              <button
                key={symp}
                onClick={() => handleFilter(symp)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === symp
                    ? "bg-emerald-700 text-stone-50 shadow-md shadow-emerald-900/20"
                    : "bg-white border border-stone-200 text-stone-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
                }`}
              >
                {symp}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Hasil Pencarian */}
        <motion.div variants={item} className="pt-4">
          
          {/* PERUBAHAN: Judul akan selalu muncul dan teksnya berubah otomatis */}
          <h2 className="font-serif text-xl text-stone-800 mb-5 flex items-center gap-2">
            <HiOutlineSparkles className="text-amber-500 h-5 w-5" />
            {searchQuery || activeFilter ? "Rekomendasi untukmu" : "Semua Solusi Alami"}
          </h2>

          {/* Menampilkan pesan jika tidak ada hasil saat proses filter */}
          {(searchQuery || activeFilter) && filteredResults.length === 0 && (
            <div className="bg-stone-100 rounded-3xl p-8 text-center border border-stone-200/60">
              <p className="text-stone-500">
                Belum ada resep yang cocok untuk keluhan tersebut di pustaka kami.
              </p>
            </div>
          )}

          {/* Grid Kartu Hasil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredResults.map((itemData) => (
              <motion.div 
                key={itemData.id}
                onClick={() => navigate(`/detail/${itemData.id}`)} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-stone-200/60 shadow-lg shadow-stone-200/40 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={itemData.image} 
                    alt={itemData.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-emerald-800 uppercase tracking-wider shadow-sm">
                    {itemData.type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-stone-800 group-hover:text-emerald-700 transition-colors mb-2">
                    {itemData.name}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-4">
                    {itemData.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {itemData.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}