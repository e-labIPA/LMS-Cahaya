/* ===== DEKORASI & ANIMASI (dipakai halaman murid, login, dan tema) =====
   Semua gambar dibuat langsung dengan SVG, jadi tidak perlu file gambar tambahan. */
(function () {
  "use strict";
  let uid = 0;
  const reduce = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Maskot "Cahya" si bola lampu ---------- */
  function mascot(cls) {
    const k = "m" + (++uid);
    let rays = "";
    for (let i = 0; i < 12; i++) {
      rays += `<line x1="80" y1="6" x2="80" y2="${i % 2 ? 14 : 20}" stroke="#ffc933" stroke-width="6" stroke-linecap="round" transform="rotate(${i * 30} 80 70)"/>`;
    }
    return `<svg class="mascot ${cls || ""}" viewBox="0 0 160 190" role="img" aria-label="Cahya, maskot bola lampu">
  <defs>
    <radialGradient id="${k}g" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#fffdf0"/><stop offset=".55" stop-color="#ffe680"/><stop offset="1" stop-color="#ffc933"/></radialGradient>
    <linearGradient id="${k}b" x1="0" x2="1"><stop offset="0" stop-color="#c9d4e6"/><stop offset=".5" stop-color="#f3f6fb"/><stop offset="1" stop-color="#a9b6cc"/></linearGradient>
  </defs>
  <g class="m-rays">${rays}</g>
  <g class="m-body">
    <ellipse cx="80" cy="176" rx="34" ry="6" fill="rgba(30,42,74,.18)" class="m-shadow"/>
    <g class="m-armL"><path d="M32 104 Q14 100 12 84" fill="none" stroke="#ffc933" stroke-width="9" stroke-linecap="round"/><circle cx="12" cy="82" r="9" fill="#fff" stroke="#e0a800" stroke-width="2"/></g>
    <g class="m-armR"><path d="M128 104 Q146 112 148 128" fill="none" stroke="#ffc933" stroke-width="9" stroke-linecap="round"/><circle cx="148" cy="130" r="9" fill="#fff" stroke="#e0a800" stroke-width="2"/></g>
    <rect x="58" y="116" width="44" height="40" rx="9" fill="url(#${k}b)" stroke="#8795ae" stroke-width="2"/>
    <path d="M58 128h44M58 140h44" stroke="#8795ae" stroke-width="2"/>
    <rect x="68" y="154" width="24" height="12" rx="6" fill="#6b7a96"/>
    <circle cx="80" cy="70" r="54" fill="url(#${k}g)" stroke="#e0a800" stroke-width="3"/>
    <ellipse cx="58" cy="44" rx="14" ry="9" fill="#fff" opacity=".7" transform="rotate(-30 58 44)"/>
    <g class="m-eyes"><ellipse cx="62" cy="68" rx="7" ry="9" fill="#2a2150"/><ellipse cx="98" cy="68" rx="7" ry="9" fill="#2a2150"/>
      <circle cx="64.5" cy="64" r="2.8" fill="#fff"/><circle cx="100.5" cy="64" r="2.8" fill="#fff"/></g>
    <circle cx="48" cy="86" r="8" fill="#ff8fa3" opacity=".6"/><circle cx="112" cy="86" r="8" fill="#ff8fa3" opacity=".6"/>
    <path d="M66 82 Q80 100 94 82 Z" fill="#c2394b"/><path d="M73 91 Q80 96 87 91 Q80 87 73 91Z" fill="#ff8fa3"/>
  </g></svg>`;
  }

  /* ---------- Ilustrasi 5 tema (bergerak) ---------- */
  const T = {
    1: `<defs><linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset="1" stop-color="#e6f6ff"/></linearGradient>
<radialGradient id="s1g"><stop offset="0" stop-color="#fff7b0"/><stop offset="1" stop-color="#fff7b000"/></radialGradient></defs>
<rect width="320" height="190" fill="url(#s1)"/>
<rect y="146" width="320" height="44" fill="#b9854e"/><path d="M0 158h320M0 172h320" stroke="#9a6a38" stroke-width="2" opacity=".6"/>
<rect class="a-beam" x="70" y="100" width="204" height="7" rx="3.5" fill="#ffe14d"/>
<rect class="a-beam" x="70" y="96" width="204" height="15" rx="7" fill="#ffe14d" opacity=".25"/>
<g transform="translate(14 88)"><rect x="0" y="6" width="54" height="24" rx="9" fill="#4f7bd8"/><path d="M10 6v24M18 6v24" stroke="#3558a8" stroke-width="2"/><path d="M54 2l14 -4v38l-14 -4z" fill="#d9dfeb"/><ellipse cx="68" cy="15.5" rx="5" ry="17" fill="#ffe14d" class="a-glow"/></g>
<g><rect x="108" y="64" width="16" height="82" rx="3" fill="#c99a5b"/><circle cx="116" cy="103.5" r="4.5" fill="#3a2a18"/>
<rect x="160" y="64" width="16" height="82" rx="3" fill="#c99a5b"/><circle cx="168" cy="103.5" r="4.5" fill="#3a2a18"/>
<rect x="212" y="64" width="16" height="82" rx="3" fill="#c99a5b"/><circle cx="220" cy="103.5" r="4.5" fill="#3a2a18"/></g>
<rect x="272" y="62" width="14" height="86" rx="4" fill="#fff" stroke="#9fb0cc" stroke-width="2"/>
<circle class="a-glow" cx="279" cy="103.5" r="9" fill="url(#s1g)"/><circle cx="279" cy="103.5" r="4" fill="#ffe14d"/>`,

    2: `<defs><linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e9f8ff"/></linearGradient>
<linearGradient id="s2g" x1="0" x2="1"><stop offset="0" stop-color="#d9f2ff" stop-opacity=".9"/><stop offset="1" stop-color="#9fd8ff" stop-opacity=".55"/></linearGradient></defs>
<rect width="320" height="190" fill="url(#s2)"/>
<rect y="150" width="320" height="40" fill="#cdbb8f"/>
<g class="a-spin" style="transform-origin:42px 42px"><g stroke="#ffc933" stroke-width="5" stroke-linecap="round"><path d="M42 6v10M42 68v10M6 42h10M68 42h10M17 17l7 7M60 60l7 7M17 67l7-7M60 24l7-7"/></g></g>
<circle cx="42" cy="42" r="19" fill="#ffd84d" stroke="#f0b400" stroke-width="3"/>
<path class="a-beam" d="M62 54 L132 86 V112 L62 70Z" fill="#fff08a" opacity=".7"/>
<path class="a-beam" d="M60 62 L204 112 V132 L60 76Z" fill="#fff08a" opacity=".5"/>
<rect x="132" y="62" width="40" height="88" rx="5" fill="url(#s2g)" stroke="#5aa3d6" stroke-width="3"/>
<path d="M142 72l-6 22M154 72l-10 36" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/>
<path class="a-beam" d="M172 90 L250 128 V148 L172 118Z" fill="#fff08a" opacity=".55"/>
<rect x="204" y="86" width="42" height="64" rx="5" fill="#a0693a" stroke="#7a4a22" stroke-width="3"/>
<path d="M212 96v48M224 92v54M236 96v48" stroke="#7a4a22" stroke-width="2" opacity=".5"/>
<ellipse cx="274" cy="150" rx="30" ry="8" fill="#3b3550" opacity=".35"/>
<ellipse class="a-glow" cx="262" cy="150" rx="20" ry="5" fill="#fff6a8" opacity=".9"/>
<text x="148" y="46" font-size="12" font-weight="800" fill="#2d6a9f" text-anchor="middle" font-family="sans-serif">kaca</text>
<text x="225" y="76" font-size="12" font-weight="800" fill="#7a4a22" text-anchor="middle" font-family="sans-serif">kayu</text>`,

    3: `<defs><linearGradient id="s3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9b3ff"/><stop offset="1" stop-color="#f0eeff"/></linearGradient>
<linearGradient id="s3m" x1="0" x2="1"><stop offset="0" stop-color="#e8f4ff"/><stop offset=".5" stop-color="#bcd9f2"/><stop offset="1" stop-color="#f5fbff"/></linearGradient></defs>
<rect width="320" height="190" fill="url(#s3)"/>
<rect y="152" width="320" height="38" fill="#a68fd8" opacity=".55"/>
<rect x="222" y="30" width="62" height="118" rx="10" fill="#c58a4b" stroke="#8a5a26" stroke-width="3"/>
<rect x="230" y="38" width="46" height="102" rx="6" fill="url(#s3m)"/>
<path d="M240 46l-10 40M252 46l-16 60" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
<rect x="244" y="148" width="18" height="12" fill="#8a5a26"/>
<polyline class="a-flow" points="70,140 226,92" fill="none" stroke="#ffe14d" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 12"/>
<polyline class="a-flow" points="226,92 110,28" fill="none" stroke="#ffe14d" stroke-width="7" stroke-linecap="round" stroke-dasharray="14 12"/>
<path d="M226 92 L226 60" stroke="#6a5acd" stroke-width="2" stroke-dasharray="4 4"/>
<g transform="translate(18 120) rotate(-17)"><rect x="0" y="4" width="50" height="22" rx="8" fill="#ff7a8a"/><path d="M50 0l12 -4v34l-12 -4z" fill="#d9dfeb"/><ellipse cx="62" cy="13" rx="4" ry="15" fill="#ffe14d" class="a-glow"/></g>
<g class="a-twinkle"><path d="M96 24l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#fff6a8"/></g>`,

    4: `<defs><linearGradient id="s4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ee7e0"/><stop offset="1" stop-color="#e5fbf8"/></linearGradient>
<linearGradient id="s4w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cc8ff" stop-opacity=".75"/><stop offset="1" stop-color="#2a8fe0" stop-opacity=".85"/></linearGradient></defs>
<rect width="320" height="190" fill="url(#s4)"/>
<rect y="158" width="320" height="32" fill="#e0c598"/>
<g class="a-sway" style="transform-origin:160px 80px">
 <line x1="196" y1="8" x2="168" y2="84" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/>
 <line x1="196" y1="8" x2="193" y2="16" stroke="#ff7a8a" stroke-width="12" stroke-linecap="round"/>
</g>
<path d="M104 56 L120 156 Q122 164 130 164 H190 Q198 164 200 156 L216 56 Z" fill="rgba(255,255,255,.35)" stroke="#6aa6c4" stroke-width="4" stroke-linejoin="round"/>
<path d="M110 84 H210 L200 156 Q198 164 190 164 H130 Q122 164 120 156 Z" fill="url(#s4w)"/>
<line x1="150" y1="84" x2="122" y2="150" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/>
<line x1="150" y1="84" x2="168" y2="84" stroke="#ffd23f" stroke-width="2" opacity="0"/>
<path class="a-wave" d="M104 84 q14 -8 28 0 t28 0 t28 0 t28 0 t28 0" fill="none" stroke="#e8f8ff" stroke-width="4" stroke-linecap="round"/>
<circle class="a-bub b1" cx="170" cy="140" r="4" fill="#fff" opacity=".8"/><circle class="a-bub b2" cx="186" cy="130" r="3" fill="#fff" opacity=".8"/><circle class="a-bub b3" cx="140" cy="146" r="3.5" fill="#fff" opacity=".8"/>
<path d="M112 62 L118 100" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>
<g transform="translate(246 104)"><circle r="17" fill="#ffd23f" stroke="#d49a00" stroke-width="3"/><circle r="11" fill="none" stroke="#d49a00" stroke-width="2"/><text y="5" font-size="13" font-weight="800" text-anchor="middle" fill="#a87400" font-family="sans-serif">Rp</text></g>`,

    5: `<defs><linearGradient id="s5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd1ec"/><stop offset="1" stop-color="#fff4fb"/></linearGradient>
<linearGradient id="s5p" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="#bfe6ff" stop-opacity=".7"/></linearGradient></defs>
<rect width="320" height="190" fill="url(#s5)"/>
<rect y="160" width="320" height="30" fill="#c9a8e8" opacity=".5"/>
<line class="a-beam" x1="14" y1="118" x2="150" y2="104" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
<line x1="14" y1="118" x2="150" y2="104" stroke="#ffe36b" stroke-width="3" stroke-linecap="round" opacity=".8"/>
<g class="rb" stroke-width="7" stroke-linecap="round">
 <line style="--d:0s" x1="176" y1="104" x2="312" y2="60" stroke="#ff4d4d"/><line style="--d:.15s" x1="176" y1="106" x2="312" y2="76" stroke="#ff9f1c"/>
 <line style="--d:.3s" x1="176" y1="108" x2="312" y2="92" stroke="#ffe14d"/><line style="--d:.45s" x1="176" y1="110" x2="312" y2="108" stroke="#43d17a"/>
 <line style="--d:.6s" x1="176" y1="112" x2="312" y2="124" stroke="#3aa5ff"/><line style="--d:.75s" x1="176" y1="114" x2="312" y2="140" stroke="#5a5cff"/>
 <line style="--d:.9s" x1="176" y1="116" x2="312" y2="156" stroke="#b05cff"/></g>
<path d="M164 54 L206 140 H122 Z" fill="url(#s5p)" stroke="#7fb8e8" stroke-width="3" stroke-linejoin="round"/>
<path d="M164 70 L150 104" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>
<g class="a-twinkle"><path d="M250 28l2.5 7 7 2.5-7 2.5-2.5 7-2.5-7-7-2.5 7-2.5z" fill="#fff"/></g>`
  };
  function scene(id) {
    return `<svg class="scene s${id}" viewBox="0 0 320 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${T[id] || ""}</svg>`;
  }

  /* ---------- Latar langit ceria ---------- */
  function cloud(w) {
    return `<svg viewBox="0 0 120 56" width="${w}"><path d="M20 50a16 16 0 0 1 2-32 22 22 0 0 1 42-6 18 18 0 0 1 30 12 14 14 0 0 1 4 26z" fill="#fff"/></svg>`;
  }
  function scenery() {
    if (document.querySelector(".scenery")) return;
    const d = document.createElement("div");
    d.className = "scenery"; d.setAttribute("aria-hidden", "true");
    let sp = "";
    const icons = ["✨", "🔦", "🌈", "🔬", "⭐", "🪞", "💡", "✨"];
    for (let i = 0; i < 8; i++) {
      sp += `<span class="fl" style="left:${6 + i * 12}%;animation-delay:${-i * 2.3}s;animation-duration:${14 + (i % 4) * 3}s;font-size:${18 + (i % 3) * 8}px">${icons[i]}</span>`;
    }
    d.innerHTML = `
      <div class="sunbox"><svg viewBox="0 0 200 200" width="200" height="200"><g class="a-spin" style="transform-origin:100px 100px" stroke="#ffc933" stroke-width="8" stroke-linecap="round">
        <path d="M100 6v22M100 172v22M6 100h22M172 100h22M33 33l15 15M152 152l15 15M33 167l15-15M152 48l15-15"/></g>
        <circle cx="100" cy="100" r="46" fill="#ffd84d" stroke="#f5b800" stroke-width="5"/><circle cx="86" cy="94" r="5" fill="#a3640a"/><circle cx="114" cy="94" r="5" fill="#a3640a"/><path d="M84 112q16 14 32 0" stroke="#a3640a" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div>
      <div class="cl c1">${cloud(150)}</div><div class="cl c2">${cloud(110)}</div><div class="cl c3">${cloud(190)}</div>
      <div class="beams"></div>
      ${sp}
      <svg class="hills" viewBox="0 0 1200 220" preserveAspectRatio="none"><path d="M0 120q150-90 320-30t340-10 300 20 240-40V220H0z" fill="#8fdc8a"/><path d="M0 170q200-70 420-20t380 0 400-30V220H0z" fill="#5fc96b"/></svg>`;
    document.body.prepend(d);
  }

  /* ---------- Konfeti & sorakan ---------- */
  function confetti(x, y, n) {
    if (reduce()) return;
    n = n || 36;
    const cols = ["#ff5d73", "#ffc933", "#22c55e", "#3b6cf6", "#8b5cf6", "#06b6d4"];
    for (let i = 0; i < n; i++) {
      const s = document.createElement("i");
      s.className = "confetti";
      const a = Math.random() * Math.PI * 2, v = 90 + Math.random() * 190;
      s.style.cssText = `left:${x}px;top:${y}px;background:${cols[i % cols.length]};--dx:${Math.cos(a) * v}px;--dy:${Math.sin(a) * v - 120}px;--r:${Math.random() * 900 - 450}deg;animation-delay:${Math.random() * .12}s`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1900);
    }
  }
  function cheer(msg) {
    let c = document.getElementById("cheer");
    if (c) c.remove();
    c = document.createElement("div");
    c.id = "cheer"; c.className = "cheer";
    c.innerHTML = mascot("tiny") + `<div class="say">${msg}</div>`;
    document.body.appendChild(c);
    setTimeout(() => c.classList.add("out"), 3200);
    setTimeout(() => c.remove(), 3700);
  }
  /* angka naik pelan-pelan */
  function count(el, to, ms) {
    if (reduce()) { el.textContent = to; return; }
    const t0 = performance.now();
    (function f(t) {
      const k = Math.min(1, (t - t0) / (ms || 900));
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }

  window.DECO = { mascot, scene, scenery, confetti, cheer, count };
})();
