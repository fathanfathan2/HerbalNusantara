import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LuActivity,
  LuArrowLeft,
  LuArrowRight,
  LuBandage,
  LuBone,
  LuBrain,
  LuDroplets,
  LuFlame,
  LuHeartPulse,
  LuLeaf,
  LuMoon,
  LuRotateCcw,
  LuThermometer,
  LuWind,
} from "react-icons/lu";
import { ushadaData } from "../data/ushadaData";

/* -------------------------------------------------------------------------- */
/*  1. DATA KELUHAN & PEMETAAN AREA TUBUH                                     */
/* -------------------------------------------------------------------------- */
const COMPLAINTS = [
  {
    id: "sakit-kepala",
    label: "Sakit Kepala / Pusing",
    area: "Kepala",
    icon: LuBrain,
    regions: ["head"],
    keywords: ["sakit kepala", "pusing", "migrain"],
  },
  {
    id: "insomnia",
    label: "Susah Tidur (Insomnia)",
    area: "Kepala",
    icon: LuMoon,
    regions: ["head"],
    keywords: ["susah tidur", "insomnia", "sulit tidur"],
  },
  {
    id: "batuk",
    label: "Batuk / Radang",
    area: "Leher",
    icon: LuWind,
    regions: ["neck"],
    keywords: ["batuk", "radang", "sakit tenggorokan", "tenggorokan"],
  },
  {
    id: "masuk-angin",
    label: "Masuk Angin",
    area: "Dada",
    icon: LuThermometer,
    regions: ["chest"],
    keywords: ["masuk angin", "meriang", "kedinginan"],
  },
  {
    id: "pegal",
    label: "Pegal / Linu",
    area: "Bahu & lengan",
    icon: LuActivity,
    regions: ["shoulderL", "shoulderR", "upperArmL", "upperArmR"],
    keywords: ["pegal", "linu", "capek", "otot", "kelelahan"],
  },
  {
    id: "mual",
    label: "Mual / Kembung",
    area: "Perut tengah",
    icon: LuFlame,
    regions: ["abdomenMid"],
    keywords: ["mual", "kembung", "maag", "pencernaan", "kurang nafsu makan"],
  },
  {
    id: "diare",
    label: "Diare / Melilit",
    area: "Perut bawah",
    icon: LuDroplets,
    regions: ["abdomenLow"],
    keywords: ["diare", "melilit", "mencret", "sakit perut"],
  },
  {
    id: "nyeri-haid",
    label: "Nyeri Haid",
    area: "Perut bawah & panggul",
    icon: LuHeartPulse,
    regions: ["abdomenLow", "hips"],
    keywords: ["nyeri haid", "haid", "menstruasi", "dismenore"],
  },
  {
    id: "luka-luar",
    label: "Luka Luar",
    area: "Lengan & kaki",
    icon: LuBandage,
    regions: ["forearmL", "forearmR", "shinL", "shinR"],
    keywords: ["luka", "lecet", "memar", "koreng", "mimisan", "gatal"],
  },
  {
    id: "nyeri-sendi",
    label: "Nyeri Sendi / Asam Urat",
    area: "Lutut & kaki",
    icon: LuBone,
    regions: ["kneeL", "kneeR", "footL", "footR"],
    keywords: ["nyeri sendi", "asam urat", "sendi", "rematik", "encok"],
  },
  {
    id: "paru-paru",
    label: "Paru-paru / Pernapasan",
    area: "Dada",
    icon: LuWind,
    regions: ["chest"],
    keywords: ["paru-paru", "sesak napas", "asma", "radang pernapasan"],
  },
  {
    id: "jantung",
    label: "Jantung / Berdebar",
    area: "Dada Kiri",
    icon: LuHeartPulse,
    regions: ["heart"],
    keywords: ["jantung", "dada berdebar", "tekanan darah tinggi", "kolesterol"],
  },
];

const LEFT_COLUMN = COMPLAINTS.slice(0, 6);
const RIGHT_COLUMN = COMPLAINTS.slice(6);

/* -------------------------------------------------------------------------- */
/*  2. PATH SVG MANEKIN (viewBox 0 0 200 480)                                 */
/* -------------------------------------------------------------------------- */
const BODY_REGIONS = [
  { id: "head", paths: ["M100 8 C118 8 128 22 128 38 C128 54 118 68 100 68 C82 68 72 54 72 38 C72 22 82 8 100 8 Z"] },
  { id: "neck", paths: ["M91 71 H109 V90 Q100 96 91 90 Z"] },
  { id: "shoulderL", paths: ["M60 100 Q66 90 79 92 L77 130 L58 128 Q54 112 60 100 Z"] },
  { id: "shoulderR", paths: ["M140 100 Q134 90 121 92 L123 130 L142 128 Q146 112 140 100 Z"] },
  { id: "chest", paths: ["M81 92 Q100 84 119 92 L121 158 Q100 164 79 158 Z"] },
  {
    id: "heart",
    paths: [
      "M109 125 C109 125 99 117 99 109 C99 104 103 101 106.5 103 C108 104 109 106 109 106 C109 106 110 104 111.5 103 C115 101 119 104 119 109 C119 117 109 125 109 125 Z",
    ],
  },
  { id: "upperArmL", paths: ["M58 134 L77 136 L73 200 L54 198 Z"] },
  { id: "upperArmR", paths: ["M142 134 L123 136 L127 200 L146 198 Z"] },
  {
    id: "forearmL",
    paths: ["M53 204 L72 206 L67 274 L50 272 Z", "M50 277 L67 279 L65 297 Q57 304 51 297 Z"],
  },
  {
    id: "forearmR",
    paths: ["M147 204 L128 206 L133 274 L150 272 Z", "M150 277 L133 279 L135 297 Q143 304 149 297 Z"],
  },
  { id: "abdomenMid", paths: ["M79 162 Q100 168 121 162 L119 206 Q100 210 81 206 Z"] },
  { id: "abdomenLow", paths: ["M81 210 Q100 214 119 210 L124 236 Q100 246 76 236 Z"] },
  { id: "hips", paths: ["M76 240 Q100 250 124 240 L127 260 Q100 272 73 260 Z"] },
  { id: "kneeL", paths: ["M85 343 C96 343 97 356 96 366 C95 374 76 374 75 366 C74 356 74 343 85 343 Z"] },
  { id: "kneeR", paths: ["M115 343 C126 343 126 356 125 366 C124 374 105 374 104 366 C103 356 104 343 115 343 Z"] },
  { id: "shinL", paths: ["M77 378 L94 378 L92 442 L79 442 Z"] },
  { id: "shinR", paths: ["M123 378 L106 378 L108 442 L121 442 Z"] },
  { id: "footL", paths: ["M79 446 L92 446 L96 462 Q84 470 71 463 Z"] },
  { id: "footR", paths: ["M121 446 L108 446 L104 462 Q116 470 129 463 Z"] },
];

const NEUTRAL_PATHS = [
  "M74 264 Q86 272 98 270 L95 338 L75 338 Z",
  "M126 264 Q114 272 102 270 L105 338 L125 338 Z",
];

const COLORS = {
  idle: { fill: "#e7e5e4", stroke: "#d6d3d1" }, 
  hover: { fill: "#fcd34d", stroke: "#f59e0b" }, 
  active: { fill: "#047857", stroke: "#10b981" },
};

/* -------------------------------------------------------------------------- */
/*  3. KOMPONEN KECIL MANEKIN & TOMBOL                                        */
/* -------------------------------------------------------------------------- */
function BodyRegion({ paths, status, reduceMotion }) {
  const isActive = status === "active";
  const c = COLORS[status];

  return (
    <g style={isActive ? { filter: "url(#hn-glow)" } : undefined}>
      {paths.map((d) => (
        <motion.path
          key={d}
          d={d}
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={false}
          animate={{
            fill: c.fill,
            stroke: c.stroke,
            fillOpacity: isActive && !reduceMotion ? [0.8, 1, 0.8] : 1,
          }}
          transition={{
            fill: { duration: 0.35 },
            stroke: { duration: 0.35 },
            fillOpacity:
              isActive && !reduceMotion
                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 },
          }}
        />
      ))}
    </g>
  );
}

function Mannequin({ selectedSymptoms, hoveredId, reduceMotion }) {
  const activeRegions = useMemo(() => {
    const set = new Set();
    COMPLAINTS.filter((c) => selectedSymptoms.includes(c.id)).forEach((c) =>
      c.regions.forEach((r) => set.add(r))
    );
    return set;
  }, [selectedSymptoms]);

  const hoverRegions = useMemo(() => {
    const c = COMPLAINTS.find((x) => x.id === hoveredId);
    return new Set(c ? c.regions : []);
  }, [hoveredId]);

  const statusOf = (id) =>
    activeRegions.has(id) ? "active" : hoverRegions.has(id) ? "hover" : "idle";

  return (
    <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-emerald-400/30 blur-3xl"
        initial={false}
        animate={{ opacity: selectedSymptoms.length ? 0.9 : 0.15, scale: selectedSymptoms.length ? 1 : 0.85 }}
        transition={{ duration: 0.6 }}
      />
      <svg viewBox="0 0 200 480" className="h-auto w-full drop-shadow-sm">
        <defs>
          <filter id="hn-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {NEUTRAL_PATHS.map((d) => (
          <path key={d} d={d} fill={COLORS.idle.fill} stroke={COLORS.idle.stroke} strokeWidth={1.5} strokeLinejoin="round" />
        ))}
        {BODY_REGIONS.map((r) => (
          <BodyRegion key={r.id} paths={r.paths} status={statusOf(r.id)} reduceMotion={reduceMotion} />
        ))}
      </svg>
    </div>
  );
}

function ComplaintButton({ complaint, active, onToggle, onHover }) {
  const Icon = complaint.icon;
  return (
    <motion.button
      type="button"
      onClick={() => onToggle(complaint.id)}
      onMouseEnter={() => onHover(complaint.id)}
      onMouseLeave={() => onHover(null)}
      whileTap={{ scale: 0.97 }}
      className={`group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors ${
        active
          ? "border-emerald-700 bg-emerald-700 text-white shadow-lg shadow-emerald-700/25"
          : "border-stone-200 bg-white text-stone-800 hover:border-emerald-700/50"
      }`}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
          active ? "bg-white/15 text-amber-300" : "bg-stone-100 text-emerald-700 group-hover:bg-emerald-50"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-snug">{complaint.label}</span>
        <span className={`block text-[11px] mt-0.5 ${active ? "text-emerald-100" : "text-stone-500"}`}>
          Area: {complaint.area}
        </span>
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. HALAMAN UTAMA DETEKSI                                                  */
/* -------------------------------------------------------------------------- */
export default function Deteksi() {
  const [phase, setPhase] = useState("select");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate(); // <-- Disambungkan ke Router milik kita

  const toggleSymptom = (id) =>
    setSelectedSymptoms((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const goTo = (next) => {
    setPhase(next);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setHoveredId(null);
    goTo("select");
  };

  // LOGIKA FILTER DISESUAIKAN DENGAN ushadaData MILIK KITA
// LOGIKA FILTER DISESUAIKAN DENGAN ushadaData MILIK KITA
  const results = useMemo(() => {
    if (!selectedSymptoms.length) return [];
    
    // 1. Ambil semua keywords dari keluhan yang dipilih user
    const selectedKeywords = COMPLAINTS
      .filter(c => selectedSymptoms.includes(c.id))
      .flatMap(c => c.keywords);

    // 2. Filter ushadaData: HANYA munculkan "resep" DAN cocokkan keyword gejala
    return ushadaData.filter((data) => {
      return data.type === "resep" && data.symptoms.some(symp =>
        selectedKeywords.some(keyword => symp.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
  }, [selectedSymptoms]);

  const canContinue = selectedSymptoms.length > 0;
  const selectedComplaints = COMPLAINTS.filter((c) => selectedSymptoms.includes(c.id));

  return (
    <main className="min-h-full bg-stone-50 overflow-x-hidden p-6 sm:p-10 pb-[calc(11rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          {phase === "select" ? (
            /* ============================ FASE 1: INTERAKSI MANEKIN ============================ */
            <motion.section
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <motion.header
                className="mx-auto mb-8 max-w-2xl text-center"
                exit={{ opacity: 0, y: -24 }}
              >
                <h1 className="font-serif text-3xl sm:text-4xl text-emerald-900 tracking-tight font-bold mb-2">
                  Apa yang sedang kamu rasakan?
                </h1>
                <p className="text-stone-500">
                  Pilih satu atau lebih keluhan di bawah ini. Kami akan meracik solusi yang tepat untukmu.
                </p>
              </motion.header>

              <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
                {/* Bagian Tengah: Manekin */}
                <motion.div
                  className="order-first lg:order-none"
                  exit={{ opacity: 0, scale: 0.85, y: -30 }}
                >
                  <Mannequin selectedSymptoms={selectedSymptoms} hoveredId={hoveredId} reduceMotion={reduceMotion} />
                </motion.div>

                {/* Kolom Kiri */}
                <motion.div
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:order-first lg:pt-6"
                  exit={{ opacity: 0, x: -60 }}
                >
                  {LEFT_COLUMN.map((c) => (
                    <ComplaintButton key={c.id} complaint={c} active={selectedSymptoms.includes(c.id)} onToggle={toggleSymptom} onHover={setHoveredId} />
                  ))}
                </motion.div>

                {/* Kolom Kanan */}
                <motion.div
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:pt-6"
                  exit={{ opacity: 0, x: 60 }}
                >
                  {RIGHT_COLUMN.map((c) => (
                    <ComplaintButton key={c.id} complaint={c} active={selectedSymptoms.includes(c.id)} onToggle={toggleSymptom} onHover={setHoveredId} />
                  ))}
                </motion.div>
              </div>

              {/* Floating Action Button "Lanjut" */}
<motion.div
  className="fixed left-0 right-0 z-20 flex justify-center px-4 bottom-[calc(7.5rem+env(safe-area-inset-bottom))] sm:bottom-[calc(2rem+env(safe-area-inset-bottom))]"
  exit={{ opacity: 0, y: 40 }}
>
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => goTo("result")}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-medium transition-all shadow-xl ${
                    canContinue
                      ? "bg-emerald-700 text-white shadow-emerald-900/30 hover:bg-emerald-800 scale-100"
                      : "bg-white text-stone-400 border border-stone-200 shadow-stone-200/50 scale-95 cursor-not-allowed"
                  }`}
                >
                  {canContinue ? `Cari Solusi untuk ${selectedSymptoms.length} Keluhan` : "Pilih minimal 1 keluhan"}
                  <LuArrowRight className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.section>

          ) : (
            /* ============================ FASE 2: HASIL REKOMENDASI ============================ */
            <motion.section
              key="result"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-emerald-900 mb-3">
                    {results.length > 0 ? "Rekomendasi untukmu" : "Belum ada solusi"}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {selectedComplaints.map((c) => (
                      <span key={c.id} className="inline-flex items-center gap-1.5 rounded-xl bg-stone-200 px-3 py-1 text-xs font-medium text-stone-600">
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50 sm:self-auto"
                >
                  <LuArrowLeft className="h-4 w-4" /> Pilih Ulang
                </button>
              </div>

              {/* GRID KARTU KITA YANG ESTETIK */}
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {results.map((itemData) => (
                    <motion.div 
                      key={itemData.id}
                      onClick={() => navigate(`/detail/${itemData.id}`)} 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-stone-200/60 shadow-lg shadow-stone-200/40 hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={itemData.image} 
                          alt={itemData.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-emerald-800 uppercase tracking-wider shadow-sm">
                          {itemData.type}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl text-stone-800 group-hover:text-emerald-700 transition-colors mb-2">
                          {itemData.name}
                        </h3>
                        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-4">
                          {itemData.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {itemData.tags.map((tag, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-[10px] font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="mx-auto mt-10 max-w-md rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-stone-100 text-stone-400">
                    <LuRotateCcw className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-stone-600 font-medium">
                    Belum ada ramuan yang cocok untuk kombinasi keluhan ini di pustaka kami.
                  </p>
                  <p className="mt-2 text-sm text-stone-400">
                    Coba pilih ulang dengan keluhan yang lebih sedikit.
                  </p>  
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}