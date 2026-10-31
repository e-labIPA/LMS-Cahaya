/* ===== PENGATURAN PENILAIAN AI =====
   Isi kunci API di bawah ini. Urutan kerja:
   1) Gemini dicoba dulu (model pertama, lalu model cadangan Gemini jika kena limit)
   2) Jika Gemini gagal / kena limit / tidak merespons -> otomatis dialihkan ke Grok
   3) Jika keduanya gagal -> memakai penilaian kata kunci sementara (ditandai di hasil)

   PENTING (keamanan): kunci yang ditulis di file ini ikut terkirim ke browser siswa
   dan bisa dilihat siapa pun yang membuka "View Source". Untuk uji coba/kelas kecil
   boleh langsung diisi di sini. Untuk dipakai luas, isi PROXY_URL (lihat catatan
   di bawah) dan kosongkan kedua kunci di sini.
*/
window.AI_CONFIG = {
  GEMINI_API_KEY: "",                       // tempel kunci Gemini di antara tanda kutip
  GEMINI_MODELS: ["gemini-flash-latest", "gemini-flash-lite-latest"],   // dicoba berurutan

  GROK_API_KEY: "",                         // tempel kunci Grok (xAI) di antara tanda kutip
  GROK_MODEL: "grok-4",                     // ganti sesuai nama model yang tersedia di akun xAI-mu
  GROK_URL: "https://api.x.ai/v1/chat/completions",

  /* Opsional: alamat server perantara (Cloudflare Worker / Netlify Function, dll.).
     Jika diisi, browser hanya memanggil alamat ini (kunci disimpan di server, aman).
     Server menerima POST JSON {system, prompt} dan membalas JSON {text: "..."} */
  PROXY_URL: "",

  TIMEOUT_MS: 25000                         // batas tunggu tiap percobaan (milidetik)
};
