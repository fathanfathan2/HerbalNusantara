// src/pages/Beranda.jsx
import { useNavigate } from "react-router-dom";

export default function Beranda() {
  const navigate = useNavigate();
  // Mengambil nama dari localStorage (jika kosong, panggil "Teman")
  const userName = localStorage.getItem("userName") || "Teman";

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-slate-800 font-serif mb-4">
        Selamat datang, {userName}! 🌿
      </h1>
      <p className="text-slate-600 mb-8">Halaman Beranda sedang dibangun...</p>
      
      <button 
        onClick={handleLogout}
        className="text-red-500 underline"
      >
        Keluar
      </button>
    </div>
  );
}