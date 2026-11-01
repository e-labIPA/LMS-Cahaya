/* ===== PENGATURAN PENILAIAN AI =====
   Isi kunci API di bawah ini. Urutan kerja:
   1) Gemini dicoba dulu (model pertama, lalu model cadangan Gemini jika kena limit)
   2) Jika Gemini gagal / kena limit / tidak merespons -> otomatis dialihkan ke Groq (atau Grok xAI)
   3) Jika keduanya gagal -> memakai penilaian kata kunci sementara (ditandai di hasil beserta alasannya)

   CATATAN KUNCI:
   - Gemini: buat kunci di https://aistudio.google.com/apikey (biasanya berawalan "AIza").
   - Groq: kunci berawalan "gsk_" dari https://console.groq.com/keys -> isi di GROQ_API_KEY.
   - Grok (xAI): kunci berawalan "xai-" -> isi di GROK_API_KEY.

   PENTING (keamanan): kunci yang ditulis di file ini ikut terkirim ke browser siswa
   dan bisa dilihat siapa pun yang membuka "View Source". Jika repository GitHub-mu PUBLIK,
   kunci ini juga terlihat publik. Untuk dipakai luas, isi PROXY_URL dan kosongkan kunci.
*/
window.AI_CONFIG = {
  GEMINI_API_KEY: "AQ.Ab8RN6LXO55Ch3-W0PDPk1k8C5CE1j1hl48GPv3s9VevjgyUIw",
  GEMINI_MODELS: ["gemini-flash-latest", "gemini-flash-lite-latest"],   // dicoba berurutan

  GROQ_API_KEY: "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",
  GROQ_MODEL: "llama-3.3-70b-versatile",   // model utama; jika akunmu tidak punya akses, otomatis dipilih model lain yang tersedia
  GROQ_URL: "https://api.groq.com/openai/v1/chat/completions",

  GROK_API_KEY: "",                         // hanya jika memakai Grok xAI (berawalan xai-)
  GROK_MODEL: "grok-4",
  GROK_URL: "https://api.x.ai/v1/chat/completions",

  /* Opsional: alamat server perantara (Cloudflare Worker / Netlify Function, dll.).
     Server menerima POST JSON {system, prompt} dan membalas JSON {text: "..."} */
  PROXY_URL: "",

  TIMEOUT_MS: 25000                         // batas tunggu tiap percobaan (milidetik)
};
