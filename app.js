/* ===== PENGATURAN UTAMA ===== */
const CONFIG = {
  NAMA_LMS: "LMS Praktikum IPA – Cahaya",
  PASSWORD_TUTOR: "tutor123"   // GANTI password ini
};

const TEMA = [
  { id: 1, judul: "Cahaya Merambat Lurus",        ikon: "➡️", lab: "lab-1.html" },
  { id: 2, judul: "Cahaya Menembus Benda Bening", ikon: "🪟", lab: "lab-2.html" },
  { id: 3, judul: "Cahaya Dipantulkan",           ikon: "🪞", lab: "lab-3.html" },
  { id: 4, judul: "Cahaya Dibiaskan",             ikon: "🥤", lab: "lab-4.html" },
  { id: 5, judul: "Cahaya Diuraikan",             ikon: "🌈", lab: "lab-5.html" }
];

/* ===== KOLOM KOSONG LINK =====
   "materi" = video materi penguatan (langkah terakhir tiap tema).
   Tempel link di antara tanda kutip. Boleh link YouTube biasa (watch?v=...),
   youtu.be/..., atau kode <iframe ...>. Slide orientasi berupa gambar: lihat gambar.js */
const DEFAULT_LINKS = {
  1: { materi: "" },
  2: { materi: "" },
  3: { materi: "" },
  4: { materi: "" },
  5: { materi: "" }
};

/* ===== FUNGSI BANTU ===== */
function load(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } }
function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function getUser() { return load("lms_user", null); }
function logout() { localStorage.removeItem("lms_user"); location.href = "index.html"; }

function getLinks() {
  const s = load("lms_links", {}), o = {};
  TEMA.forEach(t => {
    o[t.id] = Object.assign({}, DEFAULT_LINKS[t.id], s[t.id] || {});
    // link dari pengaturan tutor hanya menimpa jika tidak kosong
    ["materi"].forEach(k => { if (!o[t.id][k]) o[t.id][k] = DEFAULT_LINKS[t.id][k]; });
  });
  return o;
}

function toEmbed(url) {
  if (!url) return "";
  url = url.trim();
  const f = url.match(/src=["']([^"']+)["']/);   // jika yang ditempel kode <iframe>
  if (f) url = f[1];
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return "https://www.youtube.com/embed/" + m[1] + "?rel=0";
  return /^https?:\/\//.test(url) ? url : "";
}

/* progres siswa: {nama:{temaId:{orientasi,lab,materi}}} */
function getProgress() { return load("lms_progress", {}); }
function setDone(nama, id, key) {
  const p = getProgress();
  p[nama] = p[nama] || {};
  p[nama][id] = p[nama][id] || {};
  p[nama][id][key] = true;
  save("lms_progress", p);
}
function pct(nama, id) {
  const d = (getProgress()[nama] || {})[id] || {};
  return Math.round(((d.orientasi ? 1 : 0) + (d.lab ? 1 : 0) + (d.materi ? 1 : 0)) / 3 * 100);
}
