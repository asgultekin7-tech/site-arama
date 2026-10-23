/* ==============================================================
   benceburada.com.tr - ANASAYFA SCRIPT PAKETI (anasayfa.js)
   Ne yapar :
     - bbModelYardim : turuncu marka/model alanina "Model numarami
       nerede bulurum?" linki + cizimli yardim penceresi
     - bbKategoriKart: urunlu "Banner ve Urun Slider" bloklarinin
       yerine yalnizca kategori gorsellerini tek satirda gosterir
       (masaustu 4'lu, tablet 3'lu, mobil 2'li). Bloklarda urun olsa
       da olmasa da calisir; bloklar gizlenir, gorsel + link kalir.
     - bbSliderBoy   : genis ekranda ana slider'in yuksekligini soldaki
       kategori menusunun yuksekligine esitler (gorsel ortalanip
       kirpilir, menu kuculmez). Dar ekranda dokunmaz.
   Nerede   : Script Yonetimi > 2 - Anasayfa (tek <script src>).
   Surum    : v5 (v4'teki bbBannerFit ve bbOwlEsitle kaldirildi;
              urun slider'lari ana sayfadan kalktigi icin gereksiz)
   Kaldirmak: Yuvadaki <script src=".../anasayfa.js"> satirini silmek.
   ============================================================== */
(function(){
  if(window.__bbModelYardim) return; window.__bbModelYardim=1;
  var CSS =
    '#bbModelLinkKap{text-align:center}'+
    '#bbModelLink{display:inline-flex;align-items:center;gap:6px;margin-top:10px;color:#fff;font-size:14px;font-weight:600;text-decoration:underline;text-underline-offset:3px;cursor:pointer}'+
    '#bbModelYardim{position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}'+
    '#bbModelYardim.gizli{display:none}'+
    '#bbModelYardim .bbMK{background:#fff;border-radius:14px;max-width:640px;width:100%;max-height:90vh;overflow:auto;position:relative;box-shadow:0 12px 40px rgba(0,0,0,.2);color:#222;font-size:14px;line-height:1.5}'+
    '#bbModelYardim .bbX{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:0;background:#f4f4f4;font-size:24px;line-height:1;cursor:pointer;color:#111}'+
    '#bbModelYardim .bbUst{padding:22px 56px 14px 22px;border-bottom:1px solid #eee}'+
    '#bbModelYardim .bbBas{font-size:18px;font-weight:700}'+
    '#bbModelYardim .bbAlt{color:#6b7280;font-size:13px;margin-top:2px}'+
    '#bbModelYardim .bbIc{padding:18px 22px}'+
    '#bbModelYardim .bbGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}'+
    '#bbModelYardim .bbKart{display:flex;flex-direction:column;align-items:center;gap:6px;border:1px solid #eee;border-radius:12px;padding:10px 10px 14px;text-align:center;font-size:13px;color:#555;line-height:1.35;background:#fff;transition:transform .2s,box-shadow .2s,border-color .2s}'+
    '#bbModelYardim .bbKart:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(0,0,0,.08);border-color:#F39200}'+
    '#bbModelYardim .bbKart b{color:#111;font-size:14px}'+
    '#bbModelYardim .bbSahne{width:100%;background:#FFF8EF;border-radius:10px;margin-bottom:6px;position:relative}'+
    '#bbModelYardim .bbNo{position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:#1f2a37;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center}'+
    '#bbModelYardim .bbSahne svg{display:block;width:100%;height:auto}'+
    '#bbModelYardim .bbPuls{transform-box:fill-box;transform-origin:center;animation:bbPuls 1.6s ease-out infinite}'+
    '@keyframes bbPuls{0%{transform:scale(.6);opacity:1}100%{transform:scale(2.6);opacity:0}}'+
    '#bbModelYardim .bbH{margin-top:18px;font-weight:700}'+
    '#bbModelYardim .bbSatir{display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-top:8px}'+
    '#bbModelYardim .bbEtiket{flex:0 0 220px;border:1.5px solid #1f2a37;border-radius:6px;padding:10px 12px;font-family:monospace;font-size:12px;line-height:1.7;background:#fafafa}'+
    '#bbModelYardim .bbEtiket .bbVurgu{background:#fff3e0;border:1.5px solid #F39200;border-radius:4px;padding:0 6px;margin:2px -6px}'+
    '#bbModelYardim .bbEtiket .bbGri{color:#888}'+
    '#bbModelYardim .bbAcik{flex:1;min-width:200px;font-size:13px;color:#444}'+
    '#bbModelYardim .bbAcik div{margin-bottom:6px}'+
    '#bbModelYardim .bbTur{color:#F39200}'+
    '#bbModelYardim .bbIpucu{margin-top:16px;padding:12px 14px;border:1px solid #e6e8eb;border-left:4px solid #16a34a;border-radius:8px;background:#f7f8fa;font-size:13px;color:#444}'+
    '#bbModelYardim .bbIpucu b{color:#111}'+
    '#bbModelYardim .bbTamam{margin-top:16px;width:100%;height:46px;border:0;border-radius:10px;background:#F39200;color:#fff;font-weight:600;font-size:15px;cursor:pointer;font-family:inherit}'+
    '@media(max-width:600px){#bbModelYardim .bbGrid{grid-template-columns:1fr}#bbModelYardim .bbSahne svg{max-height:130px}#bbModelYardim .bbEtiket{flex:1 1 100%}}';

  var S='<svg viewBox="0 0 160 112" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">';
  function balon(x,y){ return '<circle cx="'+x+'" cy="'+y+'" r="20" fill="#fff" stroke="#F39200" stroke-width="2"/>'
    +'<rect x="'+(x-13)+'" y="'+(y-9)+'" width="26" height="18" rx="2.5" fill="#FFF3E0" stroke="#F39200" stroke-width="1.5"/>'
    +'<path d="M'+(x-9)+' '+(y-4)+'h18M'+(x-9)+' '+y+'h11M'+(x-9)+' '+(y+4)+'h15" stroke="#F39200" stroke-width="1.5"/>'; }
  function cizgi(x1,y1,x2,y2){ return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="#F39200" stroke-width="1.5" stroke-dasharray="3 3"/>'; }
  function nokta(x,y){ return '<circle class="bbPuls" cx="'+x+'" cy="'+y+'" r="6" stroke="#F39200" stroke-width="2"/>'; }

  var KUTU = S
    +'<ellipse cx="72" cy="104" rx="54" ry="4" fill="#1f2a37" opacity=".08"/>'
    +'<path d="M118 66C134 64 142 48 138 22" stroke="#1f2a37" stroke-width="6"/>'
    +'<path d="M118 66C134 64 142 48 138 22" stroke="#cfd6df" stroke-width="2" stroke-dasharray="1 3"/>'
    +'<path d="M134 22h8" stroke="#1f2a37" stroke-width="4"/>'
    +'<path d="M24 82C24 56 46 44 72 44C100 44 120 56 120 78V86C120 92 114 96 106 96H38C30 96 24 92 24 86Z" fill="#E9EDF2" stroke="#1f2a37" stroke-width="2"/>'
    +'<path d="M38 62C46 52 58 48 72 48C88 48 100 53 108 62" stroke="#1f2a37" stroke-width="2"/>'
    +'<path d="M44 60C52 54 62 52 72 52C84 52 94 55 102 60L98 66C90 62 82 60 72 60C62 60 54 62 48 66Z" fill="#cfd6df"/>'
    +'<circle cx="104" cy="74" r="4" fill="#1f2a37"/>'
    +'<circle cx="38" cy="96" r="9" fill="#fff" stroke="#1f2a37" stroke-width="2"/><circle cx="38" cy="96" r="3" fill="#1f2a37"/>'
    +'<rect x="62" y="90" width="24" height="6" rx="1.5" fill="#F39200"/>'
    + cizgi(42,38,70,88) + nokta(74,93) + balon(28,26) + '</svg>';

  var DIKEY = S
    +'<ellipse cx="102" cy="106" rx="30" ry="3.5" fill="#1f2a37" opacity=".08"/>'
    +'<path d="M94 8h16" stroke="#1f2a37" stroke-width="4"/>'
    +'<rect x="99" y="8" width="5" height="34" rx="2" fill="#cfd6df" stroke="#1f2a37" stroke-width="2"/>'
    +'<rect x="88" y="40" width="28" height="38" rx="9" fill="#E9EDF2" stroke="#1f2a37" stroke-width="2"/>'
    +'<rect x="91" y="52" width="13" height="22" rx="4" fill="#DCEBFA" stroke="#1f2a37" stroke-width="1.5"/>'
    +'<path d="M94 58h7M94 63h7" stroke="#9fb7cf" stroke-width="1.5"/>'
    +'<rect x="106" y="56" width="7" height="17" rx="2" fill="#1f2a37"/>'
    +'<rect x="99.5" y="78" width="4" height="18" fill="#cfd6df" stroke="#1f2a37" stroke-width="1.5"/>'
    +'<rect x="80" y="95" width="44" height="9" rx="4.5" fill="#1f2a37"/>'
    +'<rect x="92" y="43" width="20" height="6" rx="1.5" fill="#F39200"/>'
    + cizgi(46,40,90,46) + nokta(102,46) + balon(30,32) + '</svg>';

  var ROBOT = S
    +'<ellipse cx="96" cy="104" rx="40" ry="4" fill="#1f2a37" opacity=".08"/>'
    +'<circle cx="96" cy="58" r="42" fill="#E9EDF2" stroke="#1f2a37" stroke-width="2"/>'
    +'<circle cx="96" cy="58" r="35" stroke="#cfd6df" stroke-width="2"/>'
    +'<rect x="60" y="46" width="9" height="22" rx="3.5" fill="#1f2a37"/><rect x="123" y="46" width="9" height="22" rx="3.5" fill="#1f2a37"/>'
    +'<rect x="80" y="60" width="32" height="10" rx="5" fill="#cfd6df" stroke="#1f2a37" stroke-width="1.5"/>'
    +'<path d="M86 60v10M92 60v10M98 60v10M104 60v10" stroke="#1f2a37" stroke-width="1"/>'
    +'<circle cx="96" cy="28" r="4" fill="#fff" stroke="#1f2a37" stroke-width="1.5"/>'
    +'<circle cx="70" cy="30" r="2.5" fill="#1f2a37"/><path d="M70 30l-9-6M70 30l-2-10M70 30l9-5M70 30l-10 3" stroke="#1f2a37" stroke-width="1.2"/>'
    +'<rect x="85" y="78" width="22" height="7" rx="1.5" fill="#F39200"/>'
    + cizgi(44,40,84,80) + nokta(96,81.5) + balon(28,28) + '</svg>';

  function stil(){ if(document.getElementById('bbModelCss')) return; var s=document.createElement('style'); s.id='bbModelCss'; s.textContent=CSS; document.head.appendChild(s); }
  function kapat(m){ m.classList.add('gizli'); document.body.style.overflow=''; }
  function modal(){
    var m=document.getElementById('bbModelYardim');
    if(m){ m.classList.remove('gizli'); document.body.style.overflow='hidden'; return; }
    m=document.createElement('div'); m.id='bbModelYardim';
    m.innerHTML='<div class="bbMK">'
      +'<button type="button" class="bbX" data-kapat aria-label="Kapat">×</button>'
      +'<div class="bbUst"><div class="bbBas">Model numaramı nerede bulurum?</div><div class="bbAlt">Süpürgenizin üzerindeki ürün etiketinde yazar. Turuncu ile işaretli yerlere bakın.</div></div>'
      +'<div class="bbIc">'
      +'<div class="bbGrid">'
      +'<div class="bbKart"><div class="bbSahne"><span class="bbNo">1</span>'+KUTU+'</div><b>Toz torbalı / kutulu</b>Gövdenin altında ya da toz haznesi kapağının içinde</div>'
      +'<div class="bbKart"><div class="bbSahne"><span class="bbNo">2</span>'+DIKEY+'</div><b>Dikey / şarjlı</b>Motor gövdesinde, toz haznesinin veya bataryanın altında</div>'
      +'<div class="bbKart"><div class="bbSahne"><span class="bbNo">3</span>'+ROBOT+'</div><b>Robot süpürge</b>Cihazın altında, toz haznesini çıkarınca</div>'
      +'</div>'
      +'<div class="bbH">Etikette neye bakmalıyım?</div>'
      +'<div class="bbSatir">'
      +'<div class="bbEtiket"><b>MARKA</b><div class="bbVurgu">Type / Model: <b>FC9919/07</b></div><div class="bbGri">220-240V ~ 50-60Hz 2000W</div><div class="bbGri">S/N: 4823XXXXXXXX</div></div>'
      +'<div class="bbAcik"><div><b class="bbTur">"Type"</b>, <b class="bbTur">"Model"</b> veya <b class="bbTur">"Typ"</b> yazan satırdaki kodu arayın.</div><div>Seri numarası (S/N) ve güç bilgisi (W, V) model numarası değildir.</div><div>Örnek formatlar: <b>FC9919/07</b>, <b>S 7534</b>, <b>BGS41X300</b></div></div>'
      +'</div>'
      +'<div class="bbIpucu"><b>İpucu:</b> Etiket silindiyse model numarasını kullanım kılavuzunda, faturada veya ürünün kutusunda bulabilirsiniz. Listede kodun tamamını bulamazsanız ilk kısmını yazmayı deneyin (örneğin FC9919/07 yerine FC9919).</div>'
      +'<button type="button" class="bbTamam" data-kapat>Anladım, modelimi seçeceğim</button>'
      +'</div></div>';
    m.addEventListener('click',function(e){ if(e.target===m||e.target.closest('[data-kapat]')) kapat(m); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!m.classList.contains('gizli')) kapat(m); });
    document.body.appendChild(m); document.body.style.overflow='hidden';
  }
  function calis(){
    var r=document.getElementById('mmzRoot'); if(!r) return false;
    if(document.getElementById('bbModelLink')) return true;
    var yazi=[].filter.call(r.querySelectorAll('span'),function(s){return /Marka ve Model Seçerek/i.test(s.textContent);})[0];
    if(!yazi) return false;
    stil();
    var kap=document.createElement('div'); kap.id='bbModelLinkKap';
    var a=document.createElement('a'); a.id='bbModelLink'; a.href='#';
    a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>Model numaramı nerede bulurum?';
    a.addEventListener('click',function(e){ e.preventDefault(); modal(); });
    kap.appendChild(a); yazi.parentNode.insertBefore(kap, yazi.nextSibling);
    return true;
  }
  var n=0,t=setInterval(function(){ if(calis()||++n>30) clearInterval(t); },400);
})();

/* ===== bbKategoriKart: urunlu bloklar yerine kategori gorselleri ===== */
(function(){
  if(window.__bbKatKart) return; window.__bbKatKart=1;
  var SEL='section[id^=bannerurunslider]';
  var css=document.createElement('style'); css.id='bb-katkart-css';
  css.textContent=SEL+'{display:none!important}'+
    '.bb-katgrid-wrap{margin-top:20px;margin-bottom:10px}'+
    '.bb-katgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}'+
    '.bb-katgrid a{display:block;border-radius:10px;overflow:hidden;background:#f4f5f7;transition:transform .15s ease,box-shadow .15s ease}'+
    '.bb-katgrid a:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.12)}'+
    '.bb-katgrid img{display:block;width:100%;height:auto;aspect-ratio:var(--bbar,237/330);object-fit:cover}'+
    '@media (max-width:991px){.bb-katgrid{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}}'+
    '@media (max-width:575px){.bb-katgrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}}';
  (document.head||document.documentElement).appendChild(css);
  function realSrc(img){
    var c=[img.getAttribute('data-src'),img.getAttribute('data-original'),img.getAttribute('data-lazy'),img.getAttribute('src')];
    for(var i=0;i<c.length;i++){ var s=c[i]; if(s && !/blank\.(png|gif)|data:image/i.test(s)) return s; }
    return img.currentSrc||img.src;
  }
  function build(){
    if(document.querySelector('.bb-katgrid')) return true;
    var secs=[].slice.call(document.querySelectorAll(SEL)); if(!secs.length) return false;
    var items=[];
    secs.forEach(function(s){
      var a=s.querySelector('.blokResimLink')||s.querySelector('a[href] img')&&s.querySelector('a[href] img').closest('a');
      var img=a&&a.querySelector('img'); if(!a||!img) return;
      items.push({href:a.getAttribute('href')||'#',src:realSrc(img),alt:img.getAttribute('alt')||'',title:a.getAttribute('title')||''});
    });
    if(!items.length) return false;
    var cont=secs[0].querySelector('.ticiContainer'), wrap=document.createElement('section');
    wrap.className='landing-block bb-katgrid-wrap';
    var inner=document.createElement('div'); inner.className=cont?cont.className:'ticiContainer';
    var grid=document.createElement('div'); grid.className='bb-katgrid';
    items.forEach(function(it){
      var a=document.createElement('a'); a.href=it.href; if(it.title) a.title=it.title;
      var im=document.createElement('img'); im.src=it.src; im.alt=it.alt||it.title||'Kategori'; im.loading='lazy'; im.decoding='async';
      im.onload=function(){ if(im.naturalWidth&&im.naturalHeight) grid.style.setProperty('--bbar',im.naturalWidth+'/'+im.naturalHeight); };
      a.appendChild(im); grid.appendChild(a);
    });
    inner.appendChild(grid); wrap.appendChild(inner);
    secs[0].parentNode.insertBefore(wrap,secs[0]);
    return true;
  }
  var n=0;(function go(){ if(build()||++n>40) return; setTimeout(go,250); })();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',build);
})();

/* ===== bbSliderBoy: ana slider yuksekligi = kategori menusu yuksekligi ===== */
(function(){
  if(window.__bbSliderBoy) return; window.__bbSliderBoy=1;
  var st=document.createElement('style'); st.id='bb-sliderboy-css';
  (document.head||document.documentElement).appendChild(st);
  function fit(){
    var c=document.querySelector('.anasayfa_tek_slider'); if(!c){ st.textContent=''; return; }
    var col=c.parentElement, nav=col&&col.querySelector('.newHeaderNavigation');
    var wide=window.innerWidth>=992 && nav && getComputedStyle(nav).display!=='none';
    var nw=wide?nav.getBoundingClientRect().width:0, cw=col?col.clientWidth:0;
    if(!wide || nw<=0 || nw>=cw*0.5){ st.textContent=''; return; }
    var h=Math.round(nav.getBoundingClientRect().height);
    if(h<200){ st.textContent=''; return; }
    st.textContent='.anasayfa_tek_slider .owl-stage-outer{max-height:'+h+'px!important;border-radius:10px}'+
      '.anasayfa_tek_slider .owl-item img{height:'+h+'px!important;width:100%!important;object-fit:cover!important;object-position:center center!important}';
  }
  var t=null; function later(){ clearTimeout(t); t=setTimeout(fit,150); }
  window.addEventListener('resize',later);
  window.addEventListener('load',function(){ fit(); setTimeout(fit,800); setTimeout(fit,2000); });
  if(document.readyState!=='loading') fit(); else document.addEventListener('DOMContentLoaded',fit);
  var k=0,iv=setInterval(function(){ fit(); if(++k>12) clearInterval(iv); },500);
})();
