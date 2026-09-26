import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Deteksi from "./pages/Deteksi";
import Pustaka from "./pages/Pustaka"; // <-- 1. Import halamannya
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/deteksi" element={<Deteksi />} />
          <Route path="/pustaka" element={<Pustaka />} /> {/* <-- 2. Tambahkan rutenya */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;