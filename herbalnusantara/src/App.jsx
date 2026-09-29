import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast"; // <-- INI YANG KEMBALI DITAMBAHKAN

// IMPORT HALAMAN
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Deteksi from "./pages/Deteksi";
import Pustaka from "./pages/Pustaka";
import Detail from "./pages/Detail";
import Tersimpan from "./pages/Tersimpan";

// IMPORT LAYOUT
import Layout from "./components/Layout";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ================= WADAH NOTIFIKASI ================= */}
      {/* Posisinya bisa kamu ubah jadi "top-center" kalau ingin notifnya di atas */}
      <Toaster position="top-center" reverseOrder={false} />

      <AnimatePresence mode="wait">
        {isLoading && (
          /* ================= SPLASH SCREEN ================= */
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-50"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4"
            >
              {/* PASTIKAN NAMA FILE LOGO SESUAI */}
              <img 
                src="/logoherbaln.png" 
                alt="Logo Herbal Nusantara" 
                className="w-24 h-24 object-contain drop-shadow-md"
              />
            </motion.div>
            
            <h1 
              className="text-4xl font-bold mb-6 tracking-tight"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              <span className="text-emerald-700">Herbal</span>
              <span className="text-orange-500">Nusantara</span>
            </h1>
            
            <div className="w-48 h-1.5 bg-stone-200 rounded-full overflow-hidden mb-3">
              <motion.div 
                className="h-full bg-emerald-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                Meracik bahan alami...
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= APLIKASI UTAMA ================= */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/beranda" element={<Beranda />} />
            <Route path="/deteksi" element={<Deteksi />} />
            <Route path="/pustaka" element={<Pustaka />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/tersimpan" element={<Tersimpan />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}