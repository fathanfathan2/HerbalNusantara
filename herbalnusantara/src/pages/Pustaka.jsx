import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineBookOpen, 
  HiOutlineBeaker,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel
} from "react-icons/hi2";
import { LuLeaf, LuArrowRight, LuSearchX } from "react-icons/lu";
import { ushadaData } from "../data/ushadaData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Pustaka() {
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Daftar Tab Dinamis
  const tabs = [
    { id: "semua", label: "Semua", icon: HiOutlineBookOpen },
    { id: "resep", label: "Resep", icon: HiOutlineBeaker },
    { id: "tanaman", label: "Tanaman", icon: LuLeaf },
  ];

  // Logika Filter Multi-lapis (Tab + Pencarian)
  const filteredData = useMemo(() => {
    return ushadaData.filter((data) => {
      const matchTab = activeTab === "semua" || data.type === activeTab;
      const matchSearch = 
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        data.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="p-6 sm:p-10 min-h-full flex flex-col bg-stone-50 overflow-x-hidden pb-32">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-5xl mx-auto w-full space-y-8"
      >
        
        {/* ================= HEADER & SEARCH ================= */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 sm:pt-0">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-emerald-950 tracking-tight font-bold mb-3">
              Pustaka Herbal
            </h1>
            <p className="text-stone-500 font-medium max-w-md leading-relaxed">
              Eksplorasi kekayaan tanaman obat Nusantara dan temukan resep warisan leluhur untuk kesehatanmu.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              placeholder="Cari ramuan atau khasiat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-200/80 rounded-2xl py-3.5 pl-12 pr-4 text-stone-800 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-stone-400 font-medium"
            />
          </div>
        </motion.div>

        {/* ================= KONTROL TAB & STATS ================= */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-4">
          
          {/* Tab Interaktif ala iOS (SUDAH DIPERBAIKI UNTUK MOBILE) */}
          <div className="flex bg-stone-200/50 p-1.5 rounded-2xl w-full sm:w-fit relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                // Perhatikan class di bawah ini: ukuran teks dan jaraknya berubah menyesuaikan layar (sm:...)
                className={`relative flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-6 py-2.5 rounded-xl text-[11px] sm:text-sm font-semibold transition-colors z-10 whitespace-nowrap ${
                  activeTab === tab.id ? "text-emerald-900" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabPustaka"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-stone-200/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Indikator Jumlah Data */}
          <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
            <HiOutlineFunnel className="h-4 w-4" />
            Menampilkan <span className="text-emerald-700 font-bold">{filteredData.length}</span> data
          </div>
        </motion.div>

      {/* ================= GRID KARTU DATA ================= */}
        <motion.div variants={item} className="pt-2 min-h-[400px]">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredData.map((itemData) => (
                  <motion.div 
                    key={itemData.id}
                    onClick={() => navigate(`/detail/${itemData.id}`)}
                    // HAPUS kata 'layout' di sini agar browser tidak ngelag menghitung posisi 60 kartu
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }} // Animasi dipercepat sedikit agar terasa lebih ringan
                    className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-stone-200/60 shadow-lg shadow-stone-200/40 hover:shadow-xl hover:border-emerald-300/50 transition-all cursor-pointer group flex flex-col h-full"
                  >
                    {/* Bagian Gambar */}
                    <div className="w-full h-48 overflow-hidden relative shrink-0">
                      <img 
                        src={itemData.image} 
                        alt={itemData.name} 
                        loading="lazy" // TAMBAHAN: Agar gambar tidak diload semua bersamaan (Lazy Load)
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      
                      {/* Badge Kategori */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-bold text-emerald-800 uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        {itemData.type === "resep" ? <HiOutlineBeaker className="h-3 w-3" /> : <LuLeaf className="h-3 w-3" />}
                        {itemData.type}
                      </div>
                    </div>

                    {/* Bagian Teks */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-serif text-2xl text-stone-800 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2">
                        {itemData.name}
                      </h3>
                      <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-4">
                        {itemData.description}
                      </p>
                      
                      {/* Tags & Action Button di bagian bawah */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                        <div className="flex flex-wrap gap-1.5">
                          {itemData.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold tracking-wide">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <LuArrowRight className="h-4 w-4 -translate-x-0.5 group-hover:translate-x-0 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* ================= EMPTY STATE ================= */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center text-center py-20 px-4"
            >
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-stone-300 mb-6">
                <LuSearchX className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">Pencarian tidak ditemukan</h3>
              <p className="text-stone-500 max-w-sm mx-auto">
                Kami tidak dapat menemukan ramuan atau tanaman dengan kata kunci "<span className="font-semibold text-stone-700">{searchQuery}</span>". Coba gunakan kata kunci lain.
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-200 transition-colors"
              >
                Hapus Pencarian
              </button>
            </motion.div>
          )}
        </motion.div>


      </motion.div>
    </div>
  );
}