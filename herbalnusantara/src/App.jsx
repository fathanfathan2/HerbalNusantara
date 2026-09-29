import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuLeaf } from "react-icons/lu";

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
    // Layar loading muncul selama 1.5 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-emerald-100 p-6 rounded-3xl text-emerald-700 shadow-xl shadow-emerald-900/10 mb-6"
            >
              <LuLeaf className="w-16 h-16" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-emerald-950 mb-2 tracking-tight">
              HerbalNusantara
            </h1>
            <div className="flex items-center gap-2 text-stone-500 font-medium">
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
          {/* Halaman Login dibiarkan berdiri sendiri (Tanpa Layout) */}
          <Route path="/" element={<Login />} />
          
          {/* Semua Halaman Utama DIBUNGKUS ke dalam Layout */}
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