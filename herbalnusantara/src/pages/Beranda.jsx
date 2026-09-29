import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBookOpen, 
  HiOutlineSparkles,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBookmarkSquare,
  HiOutlineArrowRight,
  HiOutlineCloud,
  HiArrowDownTray // <-- IKON UNDUH DITAMBAHKAN
} from "react-icons/hi2";
import { LuLeaf, LuActivity, LuWind, LuThermometer, LuBrain } from "react-icons/lu";
import { ushadaData } from "../data/ushadaData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Beranda() {
  const [name, setName] = useState("Sobat Herbal");
  const [greeting, setGreeting] = useState({ text: "Halo", icon: HiOutlineSun, color: "text-amber-500" });
  const [savedCount, setSavedCount] = useState(0);
  const [installPrompt, setInstallPrompt] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);

    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setSavedCount(bookmarks.length);

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setGreeting({ text: "Selamat Pagi", icon: HiOutlineSun, color: "text-amber-500" });
    } else if (hour >= 11 && hour < 15) {
      setGreeting({ text: "Selamat Siang", icon: HiOutlineSun, color: "text-amber-600" });
    } else if (hour >= 15 && hour < 18) {
      setGreeting({ text: "Selamat Sore", icon: HiOutlineCloud, color: "text-orange-500" });
    } else {
      setGreeting({ text: "Selamat Malam", icon: HiOutlineMoon, color: "text-indigo-500" });
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault(); 
      setInstallPrompt(e); 
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const heroItem = ushadaData[0]; 
  const popularItems = ushadaData.slice(1, 3);

  const quickShortcuts = [
    { label: "Pusing", icon: LuBrain },
    { label: "Batuk", icon: LuWind },
    { label: "Masuk Angin", icon: LuThermometer },
    { label: "Pegal", icon: LuActivity },
  ];

  return (
    <div className="p-6 sm:p-10 min-h-full bg-stone-50 overflow-x-hidden relative">
      
      {/* ================= TOMBOL UNDUH MELAYANG (FAB) ================= */}
      {installPrompt && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInstallClick}
          // Posisi diatur agak ke atas (bottom-24) di HP agar tidak tertutup menu navigasi bawah
          className="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 z-50 flex items-center gap-2.5 bg-emerald-700 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-emerald-900/40 hover:bg-emerald-800 transition-colors"
        >
          <HiArrowDownTray className="h-5 w-5 animate-bounce" />
          <span className="font-bold text-sm tracking-wide">Unduh App</span>
        </motion.button>
      )}

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="max-w-4xl mx-auto space-y-10"
      >
        {/* ================= HEADER & STATISTIK ================= */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 sm:pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-stone-500 font-medium mb-1">
              <greeting.icon className={`h-5 w-5 ${greeting.color}`} />
              <span>{greeting.text},</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-emerald-950 tracking-tight font-bold">
              {name} <span className="inline-block origin-bottom-right hover:animate-pulse cursor-default">👋</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white border border-stone-200/80 px-4 py-2.5 rounded-2xl shadow-sm cursor-pointer hover:border-emerald-200 transition-colors" onClick={() => navigate('/tersimpan')}>
              <div className="bg-emerald-100 p-1.5 rounded-xl text-emerald-700">
                <HiOutlineBookmarkSquare className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <span className="block font-bold text-stone-800 leading-none">{savedCount}</span>
                <span className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Tersimpan</span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="p-3 bg-white border border-stone-200/80 rounded-2xl text-stone-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm tooltip-trigger relative group"
              aria-label="Ganti Akun"
            >
              <HiOutlineArrowRightOnRectangle className="h-6 w-6" />
              <span className="absolute -bottom-10 right-0 bg-stone-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
                Keluar Akun
              </span>
            </button>
          </div>
        </motion.div>

        {/* ================= PINTASAN CEPAT ================= */}
        <motion.div variants={item} className="space-y-3">
          <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider">Punya keluhan cepat?</h3>
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-6 px-6 sm:mx-0 sm:px-0">
            {quickShortcuts.map((shortcut, idx) => (
              <button
                key={idx}
                onClick={() => navigate('/deteksi')}
                className="flex items-center gap-2.5 bg-white border border-stone-200/60 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-700 transition-all whitespace-nowrap group text-stone-600 font-medium"
              >
                <shortcut.icon className="h-5 w-5 text-emerald-600/70 group-hover:text-emerald-600 transition-colors" />
                {shortcut.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ================= HIGHLIGHT HARIAN ================= */}
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div 
            className="lg:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl shadow-stone-200/50 min-h-[280px] flex flex-col justify-end"
            onClick={() => navigate(`/detail/${heroItem.id}`)}
          >
            <img 
              src={heroItem.image} 
              alt={heroItem.name} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>
            
            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <HiOutlineSparkles className="h-4 w-4 text-amber-300" />
              Sorotan Hari Ini
            </div>

            <div className="relative z-10 p-6 sm:p-8 w-full sm:w-4/5">
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-3 drop-shadow-md">
                {heroItem.name}
              </h2>
              <p className="text-emerald-50/80 text-sm line-clamp-2 leading-relaxed mb-5">
                {heroItem.description}
              </p>
              <div className="flex items-center gap-2 text-emerald-200 text-sm font-semibold group-hover:text-white transition-colors">
                Lihat Resepnya <HiOutlineArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 rounded-[2rem] p-7 border border-emerald-100/50 flex flex-col justify-center relative overflow-hidden group">
             <LuLeaf className="absolute -bottom-6 -right-6 h-32 w-32 text-emerald-100/50 group-hover:rotate-12 transition-transform duration-700" />
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white p-2.5 rounded-2xl text-emerald-600 shadow-sm">
                      <LuActivity className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-xl text-emerald-900">Tips Sehat</h3>
               </div>
               <p className="text-emerald-800/80 text-sm leading-relaxed font-medium">
                  Tahukah kamu? Mengonsumsi rebusan jahe merah atau kencur saat sore hari sangat efektif melancarkan sirkulasi darah dan mencegah kelelahan otot setelah beraktivitas seharian.
               </p>
             </div>
          </div>
        </motion.div>

        {/* ================= RACIKAN POPULER ================= */}
        <motion.div variants={item} className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-stone-800">Banyak Dicari</h2>
            <button onClick={() => navigate('/pustaka')} className="text-sm text-emerald-600 font-bold hover:text-emerald-800 transition-colors flex items-center gap-1 bg-emerald-50 px-4 py-2 rounded-xl">
              Lihat Pustaka <HiOutlineBookOpen className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {popularItems.map((itemData) => (
              <div 
                key={itemData.id}
                onClick={() => navigate(`/detail/${itemData.id}`)} 
                className="group bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/60 shadow-lg shadow-stone-200/20 hover:shadow-xl hover:border-emerald-300/50 transition-all cursor-pointer flex gap-5 items-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-sm relative">
                  <img 
                    src={itemData.image} 
                    alt={itemData.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-lg sm:text-xl text-stone-800 group-hover:text-emerald-700 transition-colors mb-1.5">
                    {itemData.name}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
                    {itemData.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {itemData.tags.slice(0,2).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-stone-100 text-stone-500 rounded-lg text-[10px] font-bold tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}