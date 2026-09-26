import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  HiOutlineHome, 
  HiOutlineMagnifyingGlass, 
  HiOutlineBookOpen, 
  HiOutlineBookmarkSquare 
} from "react-icons/hi2";

export default function Layout() {
  const location = useLocation();
  
  // Daftar menu navigasi
  const navItems = [
    { name: "Beranda", path: "/beranda", icon: HiOutlineHome },
    { name: "Deteksi", path: "/deteksi", icon: HiOutlineMagnifyingGlass },
    { name: "Pustaka", path: "/pustaka", icon: HiOutlineBookOpen },
    { name: "Tersimpan", path: "/tersimpan", icon: HiOutlineBookmarkSquare },
  ];

  return (
    <div className="flex h-screen w-full bg-stone-50 overflow-hidden text-stone-800">
      
      {/* SIDEBAR (Khusus Tablet & Laptop) */}
      <aside className="hidden sm:flex flex-col w-64 bg-white/70 backdrop-blur-xl border-r border-stone-200/60 p-6 shadow-2xl shadow-emerald-900/5 z-20">
        <div className="flex items-center gap-3 mb-10">
          <img 
            src="/logoherbaln.png" 
            alt="Logo" 
            className="h-10 w-10 rounded-xl object-cover"
          />
          <h2 className="font-serif text-xl text-emerald-900 tracking-tight">
            Herbal<span className="text-amber-600">Nusantara</span>
          </h2>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-emerald-700 text-stone-50 shadow-md shadow-emerald-900/20" 
                    : "text-stone-500 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* KONTEN UTAMA (Tempat halaman Beranda, dll dirender) */}
      <main className="flex-1 h-full overflow-y-auto pb-24 sm:pb-0 relative">
        <Outlet />
      </main>

      {/* BOTTOM NAVIGATION (Khusus HP, melayang di bawah) */}
      <nav className="sm:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-stone-200/60 pb-safe z-50">
        <div className="flex justify-around items-center p-3">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive ? "text-emerald-700" : "text-stone-400 hover:text-stone-600"
                }`}
              >
                <div className={`p-1.5 rounded-full ${isActive ? "bg-emerald-100" : "bg-transparent"}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}