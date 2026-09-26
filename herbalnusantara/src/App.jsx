import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login berdiri sendiri tanpa Layout */}
        <Route path="/" element={<Login />} />
        
        {/* Rute yang dibungkus oleh Layout */}
        <Route element={<Layout />}>
          <Route path="/beranda" element={<Beranda />} />
          {/* Nanti halaman /deteksi, /pustaka, dll ditambahkan di sini */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;