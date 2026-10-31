/* Ilustrasi benda nyata (SVG) — dipakai bersama oleh kelima virtual lab */
(function(L){
const u=L.uid,I={};

I.table=(W,y)=>`<rect x="0" y="${y}" width="${W}" height="${380-y}" fill="#8a5a33"/><rect x="0" y="${y}" width="${W}" height="9" fill="#c28a52"/><path d="M0 ${y+30}H${W}M0 ${y+50}H${W}" stroke="#6b4222" stroke-width="2" opacity=".55"/><path d="M150 ${y+9}V380M420 ${y+9}V380M610 ${y+9}V380" stroke="#6b4222" stroke-width="2" opacity=".4"/>`;

/* senter: pusat lensa di (0,0), menghadap ke kanan */
I.flashlight=on=>{const g=u('fl');return `<defs>
<linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4e2ff"/><stop offset=".35" stop-color="#5b82c8"/><stop offset="1" stop-color="#1f3562"/></linearGradient>
<linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6fb"/><stop offset=".5" stop-color="#aab4c8"/><stop offset="1" stop-color="#5c6780"/></linearGradient>
<radialGradient id="${g}c"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="${on===false?'#cfd6e6':'#ffd23f'}"/></radialGradient></defs>
<rect x="-130" y="-15" width="16" height="30" rx="7" fill="#1f3562"/>
<rect x="-120" y="-17" width="100" height="34" rx="9" fill="url(#${g}a)"/>
<path d="M-102 -16V16M-94 -16V16M-86 -16V16" stroke="#13264a" stroke-width="3" opacity=".5"/>
<rect x="-68" y="-25" width="22" height="9" rx="3" fill="#e5484d"/>
<path d="M-22 -17L2 -27V27L-22 17Z" fill="url(#${g}b)"/>
<ellipse cx="3" cy="0" rx="7" ry="25" fill="url(#${g}c)" stroke="#8892a8" stroke-width="2"/>`;};

/* karton/kardus: pojok kiri-atas (0,0); lubang opsional (hy,rx,ry) */
I.cardboard=(w,h,hy,rx,ry,solid)=>{const g=u('cb');return `<defs>
<pattern id="${g}p" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#c99a5b"/><path d="M0 0V6" stroke="#b5833f" stroke-width="2"/></pattern>
<linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>
${solid?'':`<mask id="${g}m"><rect width="${w}" height="${h}" fill="#fff"/><ellipse cx="${w/2}" cy="${hy}" rx="${rx}" ry="${ry}" fill="#000"/></mask>`}</defs>
<g ${solid?'':`mask="url(#${g}m)"`}><rect width="${w}" height="${h}" rx="3" fill="url(#${g}p)"/><rect width="${w}" height="${h}" rx="3" fill="url(#${g}s)"/></g>
<rect x="${w}" y="2" width="7" height="${h-2}" fill="#8f6430"/>
<rect x="${w/2-15}" y="-2" width="30" height="14" fill="#f3e3b8" opacity=".85"/>
${solid?'':`<ellipse cx="${w/2}" cy="${hy}" rx="${rx+1}" ry="${ry+1}" fill="none" stroke="#7a5326" stroke-width="2.5"/>`}`;};

I.book=(w,h)=>`<rect width="${w}" height="${h}" rx="4" fill="#a8232b"/><rect width="9" height="${h}" rx="3" fill="#7d1a20"/><rect x="${w-8}" y="3" width="8" height="${h-6}" fill="#f6efe0"/><path d="M${w-6} 6V${h-6}M${w-3.5} 6V${h-6}" stroke="#d9cdb4" stroke-width="1"/><rect x="14" y="14" width="${w-26}" height="8" rx="2" fill="#f3c969"/><rect x="14" y="28" width="${w-26}" height="4" rx="2" fill="#f3c969" opacity=".7"/><rect x="14" y="${h-22}" width="${w-26}" height="10" rx="2" fill="#f3c969" opacity=".5"/>`;

I.screen=(w,h,post)=>`<rect x="-3" y="-7" width="${w+6}" height="9" rx="3" fill="#2a2f3a"/><rect width="${w}" height="${h}" rx="3" fill="#f3f6fb" stroke="#bcc7dc" stroke-width="2"/><rect x="${w/2-2}" y="${h}" width="4" height="${post}" fill="#59627a"/>`;

/* bahan untuk lab 2 (w x h) */
I.mat=(kind,w,h)=>{
  if(kind==='kaca'){const g=u('mk');return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8f0ff" stop-opacity=".55"/><stop offset="1" stop-color="#9fd0f5" stop-opacity=".25"/></linearGradient></defs>
<rect width="${w}" height="${h}" rx="5" fill="#eef2f7" stroke="#aeb9cb" stroke-width="2"/><rect x="7" y="7" width="${w-14}" height="${h-14}" rx="2" fill="url(#${g})" stroke="#b9cfe6"/>
<path d="M7 ${h/2}H${w-7}" stroke="#eef2f7" stroke-width="5"/><path d="M14 ${h-34}L${w-14} 26V44L14 ${h-16}Z" fill="#fff" opacity=".4"/><circle cx="${w-12}" cy="${h/2}" r="3" fill="#8f9bb0"/>`;}
  if(kind==='plastik')return `<rect width="${w}" height="${h}" rx="6" fill="rgba(190,225,255,.2)" stroke="rgba(255,255,255,.8)" stroke-width="2"/>
<path d="M10 24Q24 64 10 104T12 176" stroke="#fff" stroke-opacity=".55" stroke-width="3" fill="none"/><path d="M${w-12} 16Q${w-26} 70 ${w-12} 126" stroke="#fff" stroke-opacity=".45" stroke-width="3" fill="none"/>
<rect x="8" y="-7" width="13" height="15" rx="2" fill="#56627a"/><rect x="${w-21}" y="-7" width="13" height="15" rx="2" fill="#56627a"/><text x="${w/2}" y="${h-10}" font-size="11" text-anchor="middle" fill="#fff" opacity=".7">plastik</text>`;
  if(kind==='air')return `<rect width="${w}" height="${h}" rx="6" fill="rgba(255,255,255,.1)" stroke="#e6f3ff" stroke-width="3"/><rect x="3" y="24" width="${w-6}" height="${h-27}" fill="#3f9bff" opacity=".62"/><rect x="3" y="24" width="${w-6}" height="5" fill="#d5ecff" opacity=".85"/>
<circle cx="16" cy="${h-34}" r="4" fill="#fff" opacity=".6"/><circle cx="${w-16}" cy="${h-70}" r="3" fill="#fff" opacity=".6"/><circle cx="22" cy="${h-90}" r="2.5" fill="#fff" opacity=".6"/><text x="${w/2}" y="${h-48}" font-size="26" text-anchor="middle">🐟</text><text x="${w/2}" y="14" font-size="11" text-anchor="middle" fill="#cfe6ff">bak air</text>`;
  if(kind==='minyak')return `<rect width="${w}" height="${h}" rx="3" fill="#f3e2b4" opacity=".93" stroke="#cdb67e" stroke-width="2"/><path d="M8 22h30M20 52h34M6 82h26M24 112h30M10 142h34M22 170h30" stroke="#d6bd86" stroke-width="2"/>
<path d="M${w} ${h-28}L${w-26} ${h}L${w} ${h}Z" fill="#e0c98f"/><rect x="10" y="-8" width="14" height="16" rx="2" fill="#3b4254"/><rect x="${w-24}" y="-8" width="14" height="16" rx="2" fill="#3b4254"/>`;
  if(kind==='kardus')return I.cardboard(w,h,0,0,0,true);
  if(kind==='kayu'){const g=u('mw');let gr='';for(let i=0;i<7;i++)gr+=`M6 ${14+i*26}Q${w/2} ${8+i*26} ${w-6} ${16+i*26}`;return `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#bb864c"/><stop offset=".5" stop-color="#a06d3a"/><stop offset="1" stop-color="#8d5d2f"/></linearGradient></defs>
<rect width="${w}" height="${h}" rx="3" fill="url(#${g})"/><path d="M0 ${h/3}H${w}M0 ${2*h/3}H${w}" stroke="#5e3a18" stroke-width="2"/><path d="${gr}" stroke="#7a4d22" stroke-width="1.5" fill="none" opacity=".7"/>
<circle cx="9" cy="10" r="2.5" fill="#3c2a18"/><circle cx="${w-9}" cy="10" r="2.5" fill="#3c2a18"/><circle cx="9" cy="${h-10}" r="2.5" fill="#3c2a18"/><circle cx="${w-9}" cy="${h-10}" r="2.5" fill="#3c2a18"/>`;}
  return '';
};

I.prism=()=>{const g=u('pr');return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8f7ff" stop-opacity=".85"/><stop offset=".5" stop-color="#9fd8f5" stop-opacity=".45"/><stop offset="1" stop-color="#6fb4e8" stop-opacity=".6"/></linearGradient></defs>
<path d="M0 -105L-92 60H92Z" fill="url(#${g})" stroke="#d3f0ff" stroke-width="3" stroke-linejoin="round"/><path d="M-6 -78L-70 48" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/><path d="M-60 60H92" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>`;};

I.sun=r=>{let s='';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<path d="M${(r+8)*Math.cos(a)} ${(r+8)*Math.sin(a)}L${(r+22)*Math.cos(a)} ${(r+22)*Math.sin(a)}" stroke="#ffd23f" stroke-width="4" stroke-linecap="round"/>`;}
  return s+`<circle r="${r}" fill="#ffd23f"/><circle r="${r*.62}" fill="#fff3a6" opacity=".7"/>`;};
I.cloud=s=>`<g transform="scale(${s})"><ellipse cx="0" cy="8" rx="46" ry="20" fill="#dfe5ee"/><circle cx="-18" cy="-6" r="20" fill="#e9eef6"/><circle cx="8" cy="-14" r="24" fill="#f1f4f9"/><circle cx="28" cy="0" r="17" fill="#e4e9f1"/></g>`;
I.coin=r=>{const g=u('co');return `<defs><radialGradient id="${g}" cx=".35" cy=".3"><stop offset="0" stop-color="#fff2a8"/><stop offset=".6" stop-color="#f2b705"/><stop offset="1" stop-color="#b57e00"/></radialGradient></defs><circle r="${r}" fill="url(#${g})" stroke="#8a5e00" stroke-width="2"/><circle r="${r*.68}" fill="none" stroke="#b57e00" stroke-width="2"/><text y="${r*.28}" font-size="${r*.95}" text-anchor="middle" fill="#8a5e00" font-weight="700">★</text>`;};

/* ikon contoh dunia nyata untuk lab cermin */
I.wardrobe=()=>`<rect x="-26" y="-48" width="52" height="92" rx="6" fill="#a9763f" stroke="#6e4524" stroke-width="2"/><rect x="-20" y="-42" width="40" height="80" rx="3" fill="#cfe6f7"/><path d="M-12 30L10 -30L16 -30L-6 30Z" fill="#fff" opacity=".5"/><rect x="-22" y="44" width="8" height="8" fill="#6e4524"/><rect x="14" y="44" width="8" height="8" fill="#6e4524"/>`;
I.spoon=()=>`<ellipse cx="0" cy="-22" rx="24" ry="30" fill="#cfd5e0" stroke="#7d8798" stroke-width="2"/><ellipse cx="-4" cy="-26" rx="14" ry="20" fill="#eef1f7"/><rect x="-5" y="6" width="10" height="46" rx="5" fill="#b6bdcc" stroke="#7d8798" stroke-width="2"/>`;
I.spion=()=>`<rect x="-3" y="14" width="6" height="34" fill="#2a2f3a"/><rect x="-18" y="46" width="36" height="8" rx="3" fill="#2a2f3a"/><ellipse cx="0" cy="-12" rx="28" ry="24" fill="#2a2f3a"/><ellipse cx="0" cy="-12" rx="23" ry="19" fill="#bcd3ea"/><path d="M-14 -22Q0 -32 14 -20" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`;

L.icons=I;
})(window.LabKit);
