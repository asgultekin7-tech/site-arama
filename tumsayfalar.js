/* ==============================================================
   benceburada.com.tr - TUM SAYFALAR SCRIPT PAKETI (tumsayfalar.js)
   Ne yapar : Script Yonetimi > 1 - Tum Sayfalar yuvasindaki
              script'leri tek dosyada toplar:
     - bbKargo : mini sepette ve "sepete eklendi" panelinde
                 "Ucretsiz kargoya X TL kaldi" cubugu
     - bbGuven : anasayfada guven bandi (ayni gun kargo, ucretsiz
                 kargo, guvenli odeme, 14 gun iade)
   Nerede   : Script Yonetimi > 1 - Tum Sayfalar (tek <script src>).
              CSS bloklari (mini sepet, sepete eklendi paneli,
              giris / uye ol sayfalari) yuvada kalir, cunku giris ve
              uye ol sayfalarinda Ticimax script'i siler, CSS'i birakir.
   Surum    : v1 (kargo cubugu izleyicisi hafifletildi: sadece
              eleman ekleme/cikarmayi dinler, metin degisikliklerini
              degil; ayni icerik tekrar yazilmaz)
   Kaldirmak: Yuvadaki <script src=".../tumsayfalar.js"> satirini silmek.
   ============================================================== */

/* ===== bbKargo: ucretsiz kargo cubugu ===== */
(function(){
  if(window.__bbKargo) return; window.__bbKargo=1;
  var LIMIT = 1000; /* ucretsiz kargo alt siniri (TL) */
  function num(s){return parseFloat(String(s).replace(/[^\d,]/g,'').replace(',','.'))||0;}
  function tl(n){return n.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})+' ₺';}
  function html(total){
    var kalan = LIMIT-total, pct = Math.min(100, Math.round(total/LIMIT*100));
    var ust = kalan>0
      ? 'Ücretsiz kargoya <b style="color:#F39200">'+tl(kalan)+'</b> kaldı'
      : '<b style="color:#15803d">Tebrikler, kargonuz ücretsiz!</b>';
    var renk = kalan>0 ? '#F39200' : '#16a34a';
    return '<div style="display:flex;align-items:center;gap:8px;font-size:14px;color:#222;margin-bottom:8px">'
      + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="'+renk+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:0 0 20px"><path d="M1 4h13v11H1z"/><path d="M14 8h4l4 4v3h-8z"/><circle cx="5.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/></svg>'
      + '<span>'+ust+'</span></div>'
      + '<div style="height:8px;background:#eceef1;border-radius:99px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+renk+';border-radius:99px;transition:width .4s"></div></div>';
  }
  function koy(kap, once, total){
    var b = kap.querySelector(':scope > .bbKargoBar');
    if(!b){ b=document.createElement('div'); b.className='bbKargoBar';
      b.style.cssText='padding:14px 20px;background:#fff8ef;border-bottom:1px solid #f6e3c8;flex:0 0 auto';
      kap.insertBefore(b, once||kap.firstChild); }
    var h = html(total); if(b.__h!==h){ b.innerHTML=h; b.__h=h; }
  }
  function guncelle(){
    var mc = document.querySelector('.miniCartRigthScroll');
    if(mc){ var t = mc.querySelector('.miniCartTotalAmountBottom .miniCartCol2');
      if(t && mc.querySelector('.miniCartItem')) koy(mc, null, num(t.textContent));
      else { var x = mc.querySelector(':scope > .bbKargoBar'); if(x) x.remove(); } }
    var md = document.getElementById('divSepeteEklendiModal');
    if(md){ var t2 = md.querySelector('.pSepetToplamFiyat span');
      if(t2) koy(md, md.querySelector('.divEklenenUrun'), num(t2.textContent)); }
  }
  function basla(){
    var z;
    if(window.MutationObserver) new MutationObserver(function(){ clearTimeout(z); z=setTimeout(guncelle,200); })
      .observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',function(){ clearTimeout(z); z=setTimeout(guncelle,600); },true);
    guncelle();
  }
  if(document.body) basla(); else document.addEventListener('DOMContentLoaded', basla);
})();

/* ===== bbGuven: anasayfa guven bandi ===== */
(function(){
  if(window.__bbGuven) return; window.__bbGuven=1;
  if(window.productDetailModel) return; /* urun sayfalarinda gosterme */
  var MADDELER = [
    ['kargo',  'Aynı gün kargo',    '12.00\'ye kadar verilen siparişler'],
    ['hediye', 'Ücretsiz kargo',    '1.000 ₺ ve üzeri alışverişlerde'],
    ['kilit',  'Güvenli ödeme',     'SSL ile korunan ödeme altyapısı'],
    ['iade',   '14 gün iade hakkı', 'Cayma hakkı güvencesi']
  ];
  var IKON = {
    kargo:'<path d="M2 7h11v9H2z"/><path d="M13 10h4l3 3v3h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/><path d="M4 4h6"/>',
    hediye:'<rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M2 9h20v-3H2z"/><path d="M12 6v15"/><path d="M12 6c-2-4-7-3-6 0M12 6c2-4 7-3 6 0"/>',
    kilit:'<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.4"/><path d="M12 16.4v2"/>',
    iade:'<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 3v4.5h4.5"/><path d="M9 12.5l2 2 4-4"/>'
  };
  var CSS =
    '.bbGuven{float:left;width:100%;margin:24px 0 4px;box-sizing:border-box}'+
    '.bbGuven .bbGI{max-width:1440px;margin:0 auto;padding:0;box-sizing:border-box;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}'+
    '.bbGuven .bbGM{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #e6e8eb;border-radius:14px;padding:16px 18px;transition:transform .2s,box-shadow .2s,border-color .2s}'+
    '.bbGuven .bbGM:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.06);border-color:#F39200}'+
    '.bbGuven .bbGS{flex:0 0 48px;width:48px;height:48px;border-radius:50%;background:#FFF3E0;display:flex;align-items:center;justify-content:center;outline:1.5px dashed #F8C98A;outline-offset:3px}'+
    '.bbGuven .bbGS svg{width:26px;height:26px}'+
    '.bbGuven .bbGB{font-size:15px;font-weight:700;color:#111;line-height:1.25}'+
    '.bbGuven .bbGA{font-size:13px;color:#6b7280;line-height:1.35;margin-top:2px}'+
    '@media(max-width:1470px){.bbGuven .bbGI{padding:0 15px}}'+
    '@media(max-width:991px){.bbGuven .bbGI{grid-template-columns:repeat(2,minmax(0,1fr))}}'+
    '@media(max-width:480px){.bbGuven .bbGM{padding:12px;gap:10px}.bbGuven .bbGS{flex-basis:38px;width:38px;height:38px}.bbGuven .bbGS svg{width:22px;height:22px}.bbGuven .bbGB{font-size:13px}.bbGuven .bbGA{font-size:12px}}';
  function kur(){
    if(!document.getElementById('bbGuvenCss')){var s=document.createElement('style');s.id='bbGuvenCss';s.textContent=CSS;document.head.appendChild(s);}
    var d=document.createElement('div'); d.id='bbGuven'; d.className='bbGuven';
    d.innerHTML='<div class="bbGI">'+MADDELER.map(function(m){
      return '<div class="bbGM"><span class="bbGS"><svg viewBox="0 0 24 24" fill="none" stroke="#F39200" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+IKON[m[0]]+'</svg></span><div><div class="bbGB">'+m[1]+'</div><div class="bbGA">'+m[2]+'</div></div></div>';
    }).join('')+'</div>';
    return d;
  }
  function calis(){
    if(document.getElementById('bbGuven')) return true;
    if(window.productDetailModel) return true;
    var hedef=document.getElementById('sliderblok_1')||document.getElementById('boshtml_0');
    if(hedef && document.getElementById('mmzRoot')){ hedef.parentNode.insertBefore(kur(), hedef.nextSibling); return true; }
    return false;
  }
  var n=0,t=setInterval(function(){ if(calis()||++n>25) clearInterval(t); },400);
})();
