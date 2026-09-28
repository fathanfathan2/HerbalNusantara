import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // <-- 1. Import Toaster
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Deteksi from "./pages/Deteksi";
import Pustaka from "./pages/Pustaka";
import Detail from "./pages/Detail";
import Tersimpan from "./pages/Tersimpan";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      {/* 2. Tambahkan komponen Toaster di sini dengan styling premium */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#292524', /* Warna bg-stone-800 */
            color: '#fafaf9',      /* Warna text-stone-50 */
            borderRadius: '1rem',  /* rounded-2xl */
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/deteksi" element={<Deteksi />} />
          <Route path="/pustaka" element={<Pustaka />} />
          <Route path="/tersimpan" element={<Tersimpan />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;