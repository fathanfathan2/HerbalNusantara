import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Sudah ditambahkan
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBookOpen, HiOutlineBeaker } from "react-icons/hi2";
import { LuLeaf } from "react-icons/lu";
import { ushadaData } from "../data/ushadaData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Pustaka() {
  const [activeTab, setActiveTab] = useState("semua");
  const navigate = useNavigate(); // <-- Sudah dideklarasikan

  // Filter data berdasarkan tab yang aktif
  const filteredData = ushadaData.filter((data) => {
    if (activeTab === "semua") return true;
    return data.type === activeTab;
  });

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
              Pustaka Herbal
            </h1>
            <p className="text-stone-500 font-medium">
              Eksplorasi kekayaan tanaman obat dan resep warisan leluhur.
            </p>
          </div>

          {/* Sistem Tab/Filter */}
          <div className="flex bg-stone-200/50 p-1.5 rounded-2xl w-full sm:w-fit mt-2">
            <button
              onClick={() => setActiveTab("semua")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "semua" 
                  ? "bg-white text-emerald-800 shadow-sm" 
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <HiOutlineBookOpen className="h-4 w-4" /> Semua
            </button>
            <button
              onClick={() => setActiveTab("resep")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "resep" 
                  ? "bg-white text-emerald-800 shadow-sm" 
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <HiOutlineBeaker className="h-4 w-4" /> Resep
            </button>
            <button
              onClick={() => setActiveTab("tanaman")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "tanaman" 
                  ? "bg-white text-emerald-800 shadow-sm" 
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <LuLeaf className="h-4 w-4" /> Tanaman
            </button>
          </div>
        </motion.div>

        {/* Grid Kartu Data */}
        <motion.div variants={item} className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredData.map((itemData) => (
                <motion.div 
                  key={itemData.id}
                  onClick={() => navigate(`/detail/${itemData.id}`)} // <-- Perintah klik sudah ditambahkan
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
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
            </AnimatePresence>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}