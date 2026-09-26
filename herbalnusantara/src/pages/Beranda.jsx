import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineSun, 
  HiOutlineBookOpen, 
  HiOutlineHeart,
  HiOutlineSparkles 
} from "react-icons/hi2";
import { LuLeaf } from "react-icons/lu";

// Animasi transisi yang berurutan
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Beranda() {
  const [name, setName] = useState("Sobat Herbal");

  // Mengambil nama dari localStorage saat halaman dimuat
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);
  }, []);

  return (
    <div className="p-6 sm:p-10 min-h-full">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-4xl mx-auto space-y-8"
      >
        
        {/* Bagian Header & Sapaan */}
        <motion.div variants={item} className="flex flex-col gap-2 pt-4 sm:pt-0">
          <h1 className="font-serif text-3xl sm:text-4xl text-emerald-900 tracking-tight">
            Halo, {name}! <span className="inline-block origin-bottom-right hover:animate-pulse cursor-default">👋</span>
          </h1>
          <p className="text-stone-500 font-medium">
            Siap meracik ketenangan hari ini?
          </p>
        </motion.div>

        {/* Info Cards (Highlight Harian) */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Kartu Ramuan Hari Ini */}
          <div className="bg-emerald-700 rounded-3xl p-6 text-stone-50 shadow-xl shadow-emerald-900/20 relative overflow-hidden group cursor-pointer">
            <LuLeaf className="absolute -bottom-4 -right-4 h-28 w-28 text-emerald-600/50 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="bg-emerald-600/50 w-11 h-11 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-sm">
                <HiOutlineSun className="h-6 w-6 text-emerald-100" />
              </div>
              <p className="font-medium text-emerald-200/80 text-sm mb-1">Ramuan Hari Ini</p>
              <h3 className="text-2xl font-serif tracking-tight">Wedang Jahe Merah</h3>
            </div>
          </div>
          
          {/* Kartu Tips Sehat */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/60 shadow-xl shadow-stone-200/40 col-span-1 sm:col-span-2 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-100 p-2.5 rounded-2xl text-amber-700">
                    <HiOutlineSparkles className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-lg text-stone-800">Tips Kebugaran</h3>
             </div>
             <p className="text-stone-500 text-sm leading-relaxed">
                Rebusan air jahe hangat di pagi hari terbukti dapat melancarkan peredaran darah, meredakan peradangan, dan memperkuat sistem imun tubuh secara alami. Jangan lupa tambahkan sedikit madu liar!
             </p>
          </div>
        </motion.div>

        {/* Section: Racikan Favorit */}
        <motion.div variants={item} className="pt-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-2xl text-stone-800">Racikan Populer</h2>
            <button className="text-sm text-emerald-700 font-medium hover:text-emerald-800 transition-colors flex items-center gap-1">
              Lihat Pustaka <HiOutlineBookOpen className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card Racikan 1 */}
            <div className="group bg-white/70 backdrop-blur-md rounded-3xl p-4 border border-stone-200/60 shadow-lg shadow-stone-200/30 hover:shadow-xl hover:border-emerald-300/50 transition-all cursor-pointer flex gap-5 items-center">
              <img 
                src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop" 
                alt="Kunyit Asam" 
                className="w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="flex-1">
                <h4 className="font-serif text-lg text-stone-800 group-hover:text-emerald-700 transition-colors">Kunyit Asam</h4>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">Pereda nyeri alami dan penyegar tubuh khas tradisi keraton nusantara.</p>
                <div className="mt-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-stone-100 text-stone-500 rounded-lg text-[10px] font-medium">Pencernaan</span>
                </div>
              </div>
            </div>

            {/* Card Racikan 2 */}
            <div className="group bg-white/70 backdrop-blur-md rounded-3xl p-4 border border-stone-200/60 shadow-lg shadow-stone-200/30 hover:shadow-xl hover:border-emerald-300/50 transition-all cursor-pointer flex gap-5 items-center">
              <img 
                src="https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=200&auto=format&fit=crop" 
                alt="Beras Kencur" 
                className="w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="flex-1">
                <h4 className="font-serif text-lg text-stone-800 group-hover:text-emerald-700 transition-colors">Beras Kencur</h4>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">Menghilangkan pegal linu, menghangatkan tubuh, dan mengembalikan energi.</p>
                <div className="mt-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-stone-100 text-stone-500 rounded-lg text-[10px] font-medium">Kebugaran</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}