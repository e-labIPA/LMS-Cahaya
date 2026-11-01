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

/* ===== VIDEO MATERI (satu video, tampil di beranda siswa dengan judul "Materi") =====
   Boleh link YouTube biasa (watch?v=...), youtu.be/..., atau kode <iframe ...>. */
const MATERI_URL = "https://youtu.be/7mLmJAiYYuI?si=BRMvck6wmAwbWiwB";

/* ===== FUNGSI BANTU ===== */
function load(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; } catch (e) { return d; } }
function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); if (k === "lms_progress" && typeof SYNC !== "undefined") SYNC.jadwal(); }
function getUser() { return load("lms_user", null); }
function logout() { localStorage.removeItem("lms_user"); location.href = "index.html"; }

function getMateri() { return load("lms_materi", "") || MATERI_URL; }

function toEmbed(url) {
  if (!url) return "";
  url = url.trim();
  const f = url.match(/src=["']([^"']+)["']/);   // jika yang ditempel kode <iframe>
  if (f) url = f[1];
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return "https://www.youtube.com/embed/" + m[1] + "?rel=0";
  return /^https?:\/\//.test(url) ? url : "";
}

/* progres siswa: {nama:{temaId:{orientasi,lab}}} */
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
  return Math.round(((d.orientasi ? 1 : 0) + (d.lab ? 1 : 0)) / 2 * 100);
}


/* ===== SINKRONISASI DATA KE SERVER (Google Apps Script) =====
   Data murid tetap disimpan di browser (agar tetap jalan tanpa internet), lalu dikirim ke server
   supaya tutor dapat melihat data dari perangkat mana pun. Alamat server diisi di sync-config.js. */
const SYNC = {
  state: "off", onstate: null, _t: null, _retry: null,
  url() { return ((window.SYNC_CONFIG || {}).URL || "").trim(); },
  aktif() { return !!this.url(); },
  set(s) { this.state = s; if (this.onstate) this.onstate(s); },
  async kirim(obj, ms, keep) {
    const c = new AbortController(), t = setTimeout(() => c.abort(), ms || 15000);
    try {
      const r = await fetch(this.url(), { method: "POST", body: JSON.stringify(obj), signal: c.signal, keepalive: !!keep });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "gagal");
      return j;
    } finally { clearTimeout(t); }
  },
  jadwal() {
    const u = getUser();
    if (!this.aktif() || !u || u.role !== "siswa") return;
    save2("lms_dirty", 1); this.set("saving");
    clearTimeout(this._t); this._t = setTimeout(() => this.dorong(), 1500);
  },
  async dorong(keep) {
    const u = getUser();
    if (!this.aktif() || !u || u.role !== "siswa") return;
    try {
      await this.kirim({ aksi: "simpan", nama: u.nama, data: getProgress()[u.nama] || {} }, 20000, keep);
      localStorage.removeItem("lms_dirty"); this.set("ok");
    } catch (e) {
      console.warn("[SYNC] gagal kirim:", e.message); this.set("err");
      clearTimeout(this._retry); this._retry = setTimeout(() => this.dorong(), 20000);
    }
  },
  /* ambil data murid dari server lalu gabungkan dengan data di perangkat ini (tidak ada yang hilang) */
  async tarik(nama) {
    if (!this.aktif()) return false;
    try {
      const j = await this.kirim({ aksi: "ambil", nama: nama }, 9000);
      if (!j.data) return true;
      const p = getProgress(), lokal = p[nama] || {};
      p[nama] = gabung(lokal, j.data);
      localStorage.setItem("lms_progress", JSON.stringify(p));
      /* pulihkan keadaan virtual lab (jawaban misi & laporan) jika data server lebih lengkap */
      Object.keys(p[nama]).forEach(id => {
        const d = p[nama][id]; if (!d || !d.labkey || !d.labstate) return;
        const k = "labprog_" + d.labkey + "_" + nama.slice(0, 60);
        let cur = null; try { cur = JSON.parse(localStorage.getItem(k)); } catch (e) {}
        if (!cur || skorLab(d.labstate) > skorLab(cur)) localStorage.setItem(k, JSON.stringify(d.labstate));
      });
      return true;
    } catch (e) { console.warn("[SYNC] gagal tarik:", e.message); return false; }
  },
  async bacaSemua(pw) { return (await this.kirim({ aksi: "baca", pw: pw }, 20000)).murid || {}; },
  async cek(pw) { return (await this.kirim({ aksi: "cek", pw: pw }, 12000)).ok; },
  async hapusSemua(pw) { return (await this.kirim({ aksi: "hapus", pw: pw }, 20000)).ok; }
};
function save2(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function skorLab(P) {
  if (!P || typeof P !== "object") return 0;
  return Object.keys(P.done || {}).length * 10000 + (P.report ? 5000 : 0) + (P.obs || []).length * 100 + Math.min(99, JSON.stringify(P.drafts || {}).length / 50);
}
/* gabung dua data progres: yang benar tetap benar, angka diambil yang terbesar, teks yang sudah terisi dipertahankan */
function gabung(a, b) {
  if (a === undefined || a === null) return b;
  if (b === undefined || b === null) return a;
  if (typeof a === "boolean" || typeof b === "boolean") return !!(a || b);
  if (typeof a === "number" && typeof b === "number") return Math.max(a, b);
  if (typeof a === "string" && typeof b === "string") return a.length >= b.length ? a : b;
  if (Array.isArray(a) && Array.isArray(b)) return Array.from({ length: Math.max(a.length, b.length) }, (_, i) => gabung(a[i], b[i]));
  if (typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
    const o = {};
    new Set(Object.keys(a).concat(Object.keys(b))).forEach(k => {
      if (k === "labstate") o[k] = skorLab(b[k]) > skorLab(a[k]) ? b[k] : (a[k] || b[k]);
      else o[k] = gabung(a[k], b[k]);
    });
    return o;
  }
  return a;
}
window.addEventListener("online", () => { if (localStorage.getItem("lms_dirty")) SYNC.dorong(); });
window.addEventListener("pagehide", () => { if (localStorage.getItem("lms_dirty")) SYNC.dorong(true); });
/* penanda status simpan: <span id="syncChip"> */
document.addEventListener("DOMContentLoaded", () => {
  const c = document.getElementById("syncChip"); if (!c) return;
  const T = { saving: ["⏳ Menyimpan…", ""], ok: ["☁️ Tersimpan", "ok"], err: ["⚠️ Belum tersambung (disimpan di perangkat)", "err"] };
  SYNC.onstate = s => { const t = T[s]; c.hidden = !t; if (t) { c.textContent = t[0]; c.className = "syncchip " + t[1]; } };
  if (SYNC.aktif()) SYNC.set(localStorage.getItem("lms_dirty") ? "err" : "ok");
});
