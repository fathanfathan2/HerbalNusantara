import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineArrowLongRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { LuLeaf } from "react-icons/lu";

const scene = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("userName", trimmed);
    navigate("/beranda");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-stone-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      {/* Background Ornaments - Diskalakan untuk mobile */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-64 w-64 sm:h-[26rem] sm:w-[26rem] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -right-16 h-72 w-72 sm:h-[30rem] sm:w-[30rem] rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-teal-100/50 blur-2xl" />

        <LuLeaf className="absolute -bottom-10 -left-10 h-56 w-56 sm:h-72 sm:w-72 text-emerald-900/[0.04] rotate-12" />
        <LuLeaf className="absolute top-10 right-10 h-40 w-40 sm:h-56 sm:w-56 text-amber-900/[0.05] -rotate-[24deg]" />
      </div>

      <motion.div
        variants={scene}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* BAGIAN LOGO & JUDUL - Responsive flex-col di HP, flex-row di Laptop */}
        <motion.div variants={rise} className="mb-8 sm:mb-10 flex flex-col items-center text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Tag Gambar untuk Logo */}
            <img 
              src="/logoherbaln.png" 
              alt="Logo HerbalNusantara" 
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover shrink-0"
            />
            {/* Teks Judul */}
            <h1 className="font-serif text-4xl sm:text-5xl text-emerald-900 tracking-tight text-center sm:text-left">
              Herbal<span className="text-amber-600">Nusantara</span>
            </h1>
          </div>
          <p className="max-w-xs text-sm text-stone-500 font-medium px-4 sm:px-0">
            Resep tradisional, diracik untuk keseharian yang lebih tenang.
          </p>
        </motion.div>

        {/* Card Form - Padding disesuaikan untuk layar kecil */}
        <motion.div
          variants={rise}
          className="rounded-3xl border border-stone-200/60 bg-white/70 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 p-6 sm:p-10"
        >
          <motion.div variants={rise} className="mb-6 sm:mb-7">
            <h2 className="font-serif text-xl text-stone-800">Selamat datang</h2>
            <p className="mt-1 text-sm text-stone-500">
              Masukkan nama untuk mulai menjelajah ramuan alami kami.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <motion.div variants={rise}>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Nama pengguna
              </label>
              <div className="group relative">
                <HiOutlineUser className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400 transition-colors group-focus-within:text-emerald-600" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 py-3.5 pl-12 pr-4 text-stone-800 placeholder:text-stone-400 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </motion.div>

            <motion.button
              variants={rise}
              type="submit"
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.02 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3.5 text-sm font-medium text-stone-50 shadow-lg shadow-emerald-900/20 transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none"
            >
              Mulai Sekarang
              <HiOutlineArrowLongRight className="h-5 w-5" />
            </motion.button>
          </form>

          <motion.div
            variants={rise}
            className="mt-6 sm:mt-7 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-700"
          >
            <HiOutlineSparkles className="h-4 w-4 shrink-0" />
            <span>Tidak perlu kata sandi — cukup nama untuk mulai.</span>
          </motion.div>
        </motion.div>

        <motion.p variants={rise} className="mt-6 text-center text-xs text-stone-400 px-4 sm:px-0">
          Diracik dengan bahan alami Nusantara, untuk tubuh yang lebih seimbang.
        </motion.p>
      </motion.div>
    </div>
  );
}