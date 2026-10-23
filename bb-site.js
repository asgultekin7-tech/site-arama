/* ==============================================================
   benceburada.com.tr - SITE TASARIM PAKETI (bb-site.js)
   Ne yapar : Sitenin tum ozel tasarimlarini tek dosyada toplar:
     - bb-early : eski tasarimin yarim saniyelik gorunmesini engeller
     - bb-hdr   : header (arama cubugu, favori, Hesabim menusu, Sepetim)
     - bb-sg    : arama oneri penceresi (tum parcalar, kategori etiketi)
     - bb-logo  : robot supurgeli animasyonlu logo (v5)
     - bb-login : giris / uye ol karti (sayfa izin verirse)
     - bb-hero  : turuncu marka/model alani (mmz.js) tasarimi
     - bb-acc   : Hesabim sol menu + sag kart
     - bb-accmid: Hesabim orta alan (Siparislerim, Adres Defterim, Hediye Cekleri)
     - bb-fav   : Hesabim > Favorilerim
     - bb-bc    : kategori silsilesi + Onceki Sayfaya Don
   Nerede   : Script Yonetimi > 10 - Tum Sayfalar - Header (tek satir <script src>)
   Surum    : v4 (v3 + header altindaki bos beyaz serit kaldirildi)
   Not      : Sadece gorunumu degistirir; siparis, sepet, arama gibi
              islevlere karismaz.
   Kaldirmak: Header yuvasindaki <script src=".../bb-site.js"> satirini silmek.
   ============================================================== */

/* ===== bb-pdgizle: urun sayfasinda asil tasarim kurulana kadar ham gorunumu gizler =====
   Ticimax urun sayfasini once sade bir on surumle gonderiyor (Azalt/Artir, gorselsiz),
   sonra sablon ve tasarim kodlari asil gorunumu kuruyor. Bu blok yalnizca urun
   sayfalarinda (body.ProductBody) icerik alanini galeri + puan kutusu gelene kadar
   gorunmez tutar; en fazla 2,5 sn bekler, sonra her durumda gosterir. */
(function(){
  if(window.__bbpdg) return; window.__bbpdg=1;
  var d=document.documentElement;
  var st=document.createElement('style'); st.id='bb-pdgizle';
  st.textContent='body.ProductBody #divIcerik.productDetailContainer{opacity:0}'+
    'html.bbpd-ok body.ProductBody #divIcerik.productDetailContainer{opacity:1;transition:opacity .15s ease}';
  (document.head||d).appendChild(st);
  function ok(){ if(!d.classList.contains('bbpd-ok')) d.classList.add('bbpd-ok'); }
  var t0=Date.now(), sw=0;
  (function chk(){
    var b=document.body;
    if(b && !b.classList.contains('ProductBody') && document.readyState!=='loading'){ ok(); return; }
    var c=document.getElementById('divIcerik');
    if(c){
      var g=c.querySelector('.swiper-initialized,.swiper-container-initialized'), p=c.querySelector('.bbPuan');
      if(g && !sw) sw=Date.now();
      if(g && (p || Date.now()-sw>400)){ setTimeout(ok,60); return; }
    }
    if(Date.now()-t0>2500){ ok(); return; }
    setTimeout(chk,40);
  })();
  window.addEventListener('load',function(){ setTimeout(ok,500); });
})();

(function(){
  if(document.getElementById('bb-site-css')) return;
  var s=document.createElement('style'); s.id='bb-site-css';
  s.textContent="/* ---------- bb-widenav: header altindaki bos beyaz kategori seridi (masaustu) ---------- */\n@media (min-width:992px){#headerNew #wide-nav.header-bottom{height:0!important;min-height:0!important;padding:0!important;border:0!important}}\n\n/* ---------- bb-early: eski logo yeni logo gelene kadar gizli ---------- */\nimg[src*=\"9e1c53dd-6b30-4dca-8285-fb9220638711\"]:not([data-bblogo]){visibility:hidden!important}\n\n/* ---------- bb-hdr: header (arama, favori, hesabım, sepet) ---------- */\n@media (min-width:992px){\n.bb-search{display:flex!important;align-items:center!important;position:relative!important;background:#fff!important;border-radius:999px!important;height:48px!important;padding:0 4px 0 20px!important;border:2px solid transparent!important;box-shadow:0 6px 18px rgba(0,0,0,.18)!important;box-sizing:border-box!important;transition:border-color .2s,box-shadow .2s}\n.bb-search:focus-within{border-color:#f39200!important;box-shadow:0 0 0 4px rgba(243,146,0,.28)!important}\n.bb-sgrow{flex:1 1 auto!important;display:flex!important;align-items:center!important;height:100%!important;background:transparent!important;border:0!important;margin:0!important;padding:0!important;box-shadow:none!important;min-width:0!important;position:static!important;float:none!important}\n.bb-spass{display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;margin:0!important;padding:0!important;box-shadow:none!important;position:static!important;float:none!important;flex:0 0 auto!important;height:auto!important;width:auto!important;top:auto!important;right:auto!important;transform:none!important}\n.bb-search input.bb-q{flex:1 1 auto!important;width:100%!important;border:0!important;outline:0!important;background:transparent!important;height:100%!important;font-size:15px!important;color:#1e2a3b!important;padding:0 10px 0 0!important;box-shadow:none!important;margin:0!important;float:none!important;position:static!important}\n.bb-search input.bb-q::placeholder{color:#8a94a3!important}\n.bb-search img[src*=\"mic\"]{width:20px!important;height:20px!important;opacity:.55;margin:0 8px!important}\n.bb-sbtn{position:static!important;top:auto!important;right:auto!important;bottom:auto!important;left:auto!important;float:none!important;transform:none!important;align-self:center!important;flex:0 0 40px!important;width:40px!important;height:40px!important;min-width:40px!important;max-width:40px!important;border-radius:50%!important;border:0!important;padding:0!important;margin:0!important;cursor:pointer!important;font-size:0!important;color:transparent!important;text-indent:-999px!important;overflow:hidden!important;background:#f39200 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E\") no-repeat center/18px!important;transition:background-color .2s}\n.bb-sbtn:hover{background-color:#e07f00!important}\n.bb-sbtn>*{display:none!important}\n.bb-fav,.bb-acc,.bb-cart{display:inline-flex!important;align-items:center!important;gap:8px!important;height:46px!important;padding:0 16px!important;border-radius:12px!important;box-sizing:border-box!important;font-size:14px!important;font-weight:600!important;text-decoration:none!important;position:relative!important;cursor:pointer!important;white-space:nowrap!important;transition:background-color .2s,border-color .2s,transform .15s;width:auto!important;min-width:0!important}\n.bb-fav,.bb-acc{background:rgba(255,255,255,.06)!important;border:1px solid rgba(255,255,255,.22)!important;color:#fff!important}\n.bb-fav:hover,.bb-acc:hover,.bb-accroot.bb-open .bb-acc{background:rgba(255,255,255,.14)!important;border-color:#f39200!important}\n.bb-cart{background:#f39200!important;border:1px solid #f39200!important;color:#fff!important;box-shadow:0 6px 16px rgba(243,146,0,.35)!important}\n.bb-cart:hover{background:#e07f00!important;transform:translateY(-1px)}\n.bb-fav *,.bb-acc *,.bb-cart *{background:transparent!important;border:0!important;box-shadow:none!important;color:inherit!important;margin:0!important;padding:0!important;position:static!important;width:auto!important;height:auto!important;line-height:1.2!important;font-size:inherit!important}\n.bb-fav img,.bb-fav i,.bb-fav svg,.bb-acc img,.bb-acc i,.bb-acc svg,.bb-cart img,.bb-cart i,.bb-cart svg{display:none!important}\n.bb-fav::before,.bb-acc::before,.bb-cart::before{content:\"\";width:20px;height:20px;flex:0 0 20px;background:no-repeat center/contain}\n.bb-fav::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linejoin='round'%3E%3Cpath d='M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z'/%3E%3C/svg%3E\")}\n.bb-acc::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 21a8 8 0 0 1 16 0'/%3E%3C/svg%3E\")}\n.bb-cart::before{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='9' cy='20' r='1.5'/%3E%3Ccircle cx='18' cy='20' r='1.5'/%3E%3Cpath d='M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6'/%3E%3C/svg%3E\")}\n.bb-fav .bb-cnt,.bb-favwrap .bb-cnt{background:#f39200!important;color:#fff!important;min-width:20px!important;height:20px!important;line-height:20px!important;border-radius:10px!important;font-size:11px!important;font-weight:700!important;text-align:center!important;padding:0 6px!important;display:inline-block!important}\n.bb-cart .bb-hide,.bb-hide{display:none!important}\n.bb-cart .bb-price{font-weight:800!important;padding-left:10px!important;border-left:1px solid rgba(255,255,255,.45)!important}\n.bb-accroot{position:relative!important;z-index:9998!important}\n.bb-accmenu{display:none!important;position:absolute!important;margin:0!important;background:#fff!important;border:0!important;border-radius:14px!important;box-shadow:0 18px 40px rgba(16,24,40,.22)!important;padding:8px!important;min-width:230px!important;width:auto!important;height:auto!important;box-sizing:border-box!important;z-index:9999!important;transform:none!important}\n.bb-accroot.bb-open .bb-accmenu{display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}\n.bb-accmenu::before{content:\"\";position:absolute;left:0;right:0;top:-14px;height:14px;background:transparent}\n.bb-accmenu *{background:transparent!important;border:0!important;box-shadow:none!important;visibility:visible!important;opacity:1!important}\n.bb-accmenu ul{display:block!important;position:static!important;margin:0!important;padding:0!important;list-style:none!important}\n.bb-accmenu li{display:block!important;margin:0!important;padding:0!important;list-style:none!important}\n.bb-accmenu a{display:block!important;padding:10px 14px!important;border-radius:10px!important;color:#1e2a3b!important;font-size:14px!important;font-weight:500!important;text-decoration:none!important;white-space:nowrap!important;transition:background-color .15s,color .15s,padding-left .15s}\n.bb-accmenu a:hover{background:#fff4e5!important;color:#e07f00!important;padding-left:18px!important}\n.bb-accmenu .bb-accadm{display:block!important;background:#1e2a3b!important;color:#fff!important;border-radius:10px!important;padding:8px 14px!important;margin:0 0 6px!important;font-size:12px!important;font-weight:700!important;letter-spacing:.06em!important;text-transform:uppercase!important;text-align:center!important}\n.bb-accmenu a.bb-out{color:#d93025!important;margin-top:6px!important;border-top:1px solid #eef0f3!important;border-radius:0 0 10px 10px!important}\n.bb-accmenu a.bb-out:hover{background:#fdecea!important;color:#d93025!important}\n}\n\n/* ---------- bb-sg: arama öneri penceresi ---------- */\n.bb-achide{display:none!important}\n.bb-sg{position:fixed;display:none;background:#fff;border-radius:16px;box-shadow:0 22px 48px rgba(16,24,40,.28);z-index:100000;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;text-align:left;box-sizing:border-box;cursor:default}\n.bb-sg.bb-on{display:block}\n.bb-sg *{box-sizing:border-box}\n.bb-sg-head{position:sticky;top:0;z-index:1;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #eef0f3;font-size:13px;color:#5b6575}\n.bb-sg-head b{color:#1e2a3b}\n.bb-sg-all{color:#e07f00!important;font-weight:700;text-decoration:none!important;white-space:nowrap}\n.bb-sg-all:hover{text-decoration:underline!important}\n.bb-sg-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:14px}\n.bb-sg-card{display:flex;align-items:center;gap:14px;padding:12px;border:1px solid #eef0f3;border-radius:14px;background:#fff;text-decoration:none!important;transition:border-color .2s,box-shadow .2s,transform .15s}\n.bb-sg-card:hover{border-color:#f39200;box-shadow:0 8px 20px rgba(243,146,0,.16);transform:translateY(-2px)}\n.bb-sg-card img{width:64px;height:64px;flex:0 0 64px;object-fit:contain;background:#f7f8fa;border-radius:10px;padding:6px}\n.bb-sg-txt{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:5px}\n.bb-sg-chip{background:#fff4e5;color:#e07f00;font-size:11px;font-weight:700;padding:3px 9px;border-radius:999px;line-height:1.3}\n.bb-sg-name{color:#1e2a3b;font-size:13.5px;font-weight:600;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.bb-sg-price{color:#f39200;font-size:15px;font-weight:800}\n.bb-sg-msg{padding:28px 16px;text-align:center;color:#5b6575;font-size:14px}\n.bb-sg-spin{display:inline-block;width:18px;height:18px;border:2px solid #f3d6a8;border-top-color:#f39200;border-radius:50%;animation:bbspin .7s linear infinite;vertical-align:middle;margin-right:8px}\n@keyframes bbspin{to{transform:rotate(360deg)}}\n@media (max-width:767px){\n.bb-sg{border-radius:14px}\n.bb-sg-head{padding:10px 12px}\n.bb-sg-all{background:#f39200;color:#fff!important;padding:7px 12px;border-radius:999px;font-size:12px}\n.bb-sg-list{grid-template-columns:1fr;padding:10px;gap:8px}\n.bb-sg-card{padding:10px;gap:12px}\n.bb-sg-card:hover{transform:none}\n.bb-sg-card img{width:58px;height:58px;flex-basis:58px}\n.bb-sg-name{font-size:14px}\n}\n\n/* ---------- bb-logo ---------- */\nimg[data-bblogo]{height:40px!important;width:auto!important;max-width:100%!important;max-height:none!important;object-fit:contain!important;image-rendering:auto!important}\n@media (max-width:991px){img[data-bblogo]{height:30px!important}}\n\n/* ---------- bb-login: giriş / üye ol kartı ---------- */\n.bb-login{max-width:520px!important;width:100%!important;margin:28px auto!important;background:#fff!important;border-radius:20px!important;box-shadow:0 18px 50px rgba(16,24,40,.12)!important;border:1px solid #eef0f3!important;padding:28px 28px 24px!important;box-sizing:border-box!important}\n.bb-login div{background-color:transparent!important}\n.bb-login .bb-login-hello{text-align:center;margin:0 0 20px}\n.bb-login .bb-login-hello b{display:block;font-size:22px;font-weight:800;color:#1e2a3b;margin-bottom:6px}\n.bb-login .bb-login-hello span{font-size:14px;color:#6b7585}\n.bb-login .bb-tabs{display:flex!important;background:#f1f3f6!important;border-radius:999px!important;padding:5px!important;gap:4px!important;border:0!important;margin:0 0 20px!important;box-shadow:none!important}\n.bb-login .bb-tab{flex:1 1 0!important;text-align:center!important;border:0!important;border-radius:999px!important;padding:11px 10px!important;font-size:15px!important;font-weight:700!important;color:#6b7585!important;cursor:pointer!important;background:transparent!important;text-decoration:none!important;width:auto!important;box-shadow:none!important;transition:background .2s,color .2s,box-shadow .2s}\n.bb-login .bb-tab *{color:inherit!important;border:0!important;background:transparent!important}\n.bb-login .bb-tab.bb-on{background:#fff!important;color:#1e2a3b!important;box-shadow:0 4px 12px rgba(16,24,40,.10)!important}\n.bb-login .bb-field{background:#fff!important;border:1.5px solid #e3e7ee!important;border-radius:12px!important;padding:10px 14px!important;margin:0 0 12px!important;box-shadow:none!important;transition:border-color .2s,box-shadow .2s}\n.bb-login .bb-field:focus-within,.bb-login input.bb-field:focus{border-color:#f39200!important;box-shadow:0 0 0 4px rgba(243,146,0,.15)!important}\n.bb-login .bb-field input{border:0!important;outline:0!important;box-shadow:none!important;background:transparent!important;font-size:15px!important;color:#1e2a3b!important}\n.bb-login input.bb-field{width:100%!important;font-size:15px!important;color:#1e2a3b!important;outline:0!important;box-sizing:border-box!important}\n.bb-login .bb-field label{color:#8a94a3!important;font-size:12px!important;font-weight:600!important}\n.bb-login input[type=checkbox],.bb-login input[type=radio]{accent-color:#f39200}\n.bb-login .bb-btn{background:linear-gradient(135deg,#f7a21b,#ef8a00)!important;color:#fff!important;border:0!important;border-radius:12px!important;min-height:52px!important;width:100%!important;font-size:16px!important;font-weight:800!important;letter-spacing:.02em!important;box-shadow:0 10px 24px rgba(243,146,0,.35)!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;text-decoration:none!important;transition:transform .15s,box-shadow .2s}\n.bb-login .bb-btn:hover{transform:translateY(-1px);box-shadow:0 14px 28px rgba(243,146,0,.42)!important}\n.bb-login .bb-btn *{color:#fff!important;background:transparent!important}\n.bb-login .bb-forgot{color:#e07f00!important;font-weight:600!important;text-decoration:none!important}\n.bb-login .bb-forgot:hover{text-decoration:underline!important}\n@media (max-width:600px){.bb-login{padding:20px 16px!important;margin:16px auto!important;border-radius:16px!important}.bb-login .bb-login-hello b{font-size:19px}}\n\n/* ---------- bb-hero: turuncu marka/model alanı (mmz.js) ---------- */\n#mmzRoot .searchModule{background:radial-gradient(circle at 10% 15%,rgba(255,255,255,.18) 0,rgba(255,255,255,0) 30%),radial-gradient(circle at 90% 90%,rgba(255,255,255,.12) 0,rgba(255,255,255,0) 28%),linear-gradient(135deg,#f8a51f 0%,#f39200 50%,#e47d00 100%)!important;padding:40px 0!important}\n#mmzRoot .searchContainer{display:flex!important;align-items:center!important;gap:48px!important;max-width:1240px!important;margin:0 auto!important;padding:0 20px!important;box-sizing:border-box!important;float:none!important;width:auto!important}\n#mmzRoot .searchLeft{flex:0 0 30%!important;max-width:30%!important;width:auto!important;float:none!important;margin:0!important;padding:0!important;text-align:left!important}\n#mmzRoot .searchLeft::before{content:\"🔧 Yedek Parça Bulucu\";display:inline-block;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);color:#fff;font-size:13px;font-weight:700;letter-spacing:.03em;padding:6px 12px;border-radius:999px;margin:0 0 14px}\n#mmzRoot .searchLeft::after{content:\"Cihazına uyan parçayı saniyeler içinde bul.\";display:block;color:rgba(255,255,255,.88);font-size:15px;font-weight:500;margin-top:12px}\n#mmzRoot .searchLeft .sl-text{display:block!important;margin:0!important;padding:0!important;float:none!important}\n#mmzRoot .searchLeft .sl-text span{display:block!important;color:#fff!important;font-size:36px!important;font-weight:800!important;line-height:1.15!important;letter-spacing:-.01em!important;text-shadow:0 2px 10px rgba(120,60,0,.18)!important}\n#mmzRoot .searchRight{flex:1 1 auto!important;max-width:none!important;width:auto!important;float:none!important;margin:0!important;background:#fff!important;border-radius:20px!important;box-shadow:0 18px 44px rgba(120,60,0,.22)!important;padding:22px 22px 18px!important;box-sizing:border-box!important;display:flex!important;flex-direction:column!important;justify-content:center!important;height:auto!important;min-height:0!important}\n#mmzRoot .searchList,#mmzRoot .searchContents{width:100%!important;float:none!important;margin:0!important;padding:0!important;background:transparent!important}\n#mmzRoot .searchContents{display:flex!important;align-items:center!important;gap:12px!important}\n#mmzRoot .searchContents>ul{display:flex!important;flex:1 1 auto!important;gap:12px!important;margin:0!important;padding:0!important;list-style:none!important;width:auto!important;float:none!important}\n#mmzRoot .searchContents>ul>li{flex:1 1 0!important;width:auto!important;max-width:none!important;margin:0!important;padding:0!important;float:none!important;list-style:none!important}\n#mmzRoot .searchArea,#mmzRoot .searchSelect{width:100%!important;margin:0!important;padding:0!important;float:none!important}\n#mmzRoot .mmz .mmz-btn{height:52px!important;border:1.5px solid #e3e7ee!important;border-radius:12px!important;padding:0 16px!important;font-size:15px!important;font-weight:600!important;color:#1e2a3b!important;background-color:#fff!important;box-shadow:none!important;transition:border-color .2s,box-shadow .2s}\n#mmzRoot .mmz .mmz-btn:hover:not(:disabled){border-color:#f39200!important}\n#mmzRoot .mmz .mmz-btn:disabled{background-color:#f6f7f9!important;color:#a0a8b4!important}\n#mmzRoot .mmz.open .mmz-btn{border-color:#f39200!important;box-shadow:0 0 0 4px rgba(243,146,0,.15)!important}\n#mmzRoot .mmz .mmz-panel{border:0!important;border-radius:14px!important;box-shadow:0 18px 40px rgba(16,24,40,.2)!important;top:calc(100% + 8px)!important}\n#mmzRoot .mmz .mmz-search{height:42px!important;border:1.5px solid #e3e7ee!important;border-radius:10px!important;padding:0 12px!important;font-size:14px!important}\n#mmzRoot .mmz .mmz-search:focus{outline:0!important;border-color:#f39200!important;box-shadow:0 0 0 3px rgba(243,146,0,.15)!important}\n#mmzRoot .mmz .mmz-list li{border-radius:8px!important;margin:0 6px!important;width:auto!important;color:#1e2a3b!important}\n#mmzRoot .mmz .mmz-list li[aria-selected=true],#mmzRoot .mmz .mmz-list li:hover{background:#fff4e5!important;color:#e07f00!important}\n#mmzRoot .mmz .mmz-list li.mmz-head{background:#f6f7f9!important;color:#6b7585!important;margin:4px 6px!important}\n#mmzRoot .mmz-list mark{color:#e07f00!important}\n#mmzRoot .aramabtn{flex:0 0 170px!important;width:170px!important;margin:0!important;padding:0!important;float:none!important}\n#mmzRoot #aramaBtn{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:52px!important;border:0!important;border-radius:12px!important;font-size:15px!important;font-weight:800!important;letter-spacing:.08em!important;text-decoration:none!important;background:linear-gradient(135deg,#f7a21b,#ef8a00)!important;color:#fff!important;box-shadow:0 10px 24px rgba(243,146,0,.38)!important;animation:bbBreath 2.2s ease-in-out infinite;transition:transform .15s}\n#mmzRoot #aramaBtn:hover{transform:translateY(-1px);animation:none}\n#mmzRoot #aramaBtn.disabled{background:#eef0f3!important;color:#9aa3af!important;box-shadow:none!important;animation:none!important;transform:none!important}\n@keyframes bbBreath{0%,100%{box-shadow:0 10px 24px rgba(243,146,0,.38)}50%{box-shadow:0 10px 30px rgba(243,146,0,.6),0 0 0 6px rgba(243,146,0,.12)}}\n#mmzRoot .searchRight-text{width:100%!important;margin:16px 0 4px!important;padding:0!important;float:none!important;text-align:center!important;height:auto!important;min-height:0!important}\n#mmzRoot .searchRight-text .sl-text{margin:0!important;padding:0!important;line-height:1.4!important}\n#mmzRoot .searchRight-text .sl-text span{color:#1e2a3b!important;font-size:15px!important;font-weight:700!important}\n#mmzRoot .searchRight a:not(#aramaBtn),#mmzRoot .searchRight a:not(#aramaBtn) *{color:#e07f00!important;font-weight:600!important}\n#mmzRoot .searchRight a:not(#aramaBtn) svg,#mmzRoot .searchRight a:not(#aramaBtn) svg *{stroke:#e07f00!important}\n#mmzRoot .searchRight a:not(#aramaBtn){display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;margin:8px auto 0!important;text-decoration:none!important}\n#mmzRoot .searchRight a:not(#aramaBtn):hover{text-decoration:underline!important}\n@media (max-width:991px){\n#mmzRoot .searchModule{padding:28px 0!important}\n#mmzRoot .searchContainer{flex-direction:column!important;gap:20px!important;padding:0 14px!important}\n#mmzRoot .searchLeft{flex:none!important;max-width:none!important;width:100%!important;text-align:center!important}\n#mmzRoot .searchLeft .sl-text span{font-size:26px!important}\n#mmzRoot .searchLeft::before{font-size:12px;margin-bottom:10px}\n#mmzRoot .searchLeft::after{font-size:14px;margin-top:8px}\n#mmzRoot .searchRight{width:100%!important;padding:16px!important;border-radius:16px!important}\n#mmzRoot .searchContents{flex-direction:column!important;align-items:stretch!important}\n#mmzRoot .searchContents>ul{flex-direction:column!important}\n#mmzRoot .aramabtn{flex:none!important;width:100%!important}\n}\n@media (prefers-reduced-motion:reduce){#mmzRoot #aramaBtn{animation:none!important}}\n\n/* ---------- bb-acc: Hesabım sol menü + sağ kart ---------- */\n.bb-side{background:#fff!important;border:1px solid #eef0f3!important;border-radius:18px!important;box-shadow:0 12px 32px rgba(16,24,40,.08)!important;padding:10px!important;box-sizing:border-box!important}\n.bb-side *{background-color:transparent!important}\n.bb-side a{display:flex!important;align-items:center!important;gap:10px!important;padding:11px 14px!important;border-radius:12px!important;color:#1e2a3b!important;font-size:14px!important;font-weight:500!important;text-decoration:none!important;transition:background-color .15s,color .15s,padding-left .15s}\n.bb-side a:hover{background-color:#fff4e5!important;color:#e07f00!important;padding-left:18px!important}\n.bb-side a.bb-active{background-color:#fff4e5!important;color:#e07f00!important;font-weight:700!important;box-shadow:inset 3px 0 0 #f39200!important}\n.bb-side i,.bb-side svg,.bb-side [class*=icon]{color:#f39200!important;fill:currentColor}\n.bb-side a.bb-exit,.bb-side a.bb-exit i{color:#d93025!important}\n.bb-side a.bb-exit:hover{background-color:#fdecea!important}\n.bb-main{background:#fff!important;border:1px solid #eef0f3!important;border-radius:18px!important;box-shadow:0 12px 32px rgba(16,24,40,.08)!important;padding:26px!important;box-sizing:border-box!important}\n.bb-main input[type=text],.bb-main input[type=email],.bb-main input[type=tel],.bb-main input[type=password],.bb-main input:not([type]),.bb-main select,.bb-main textarea{border:1.5px solid #e3e7ee!important;border-radius:10px!important;min-height:46px!important;font-size:14px!important;color:#1e2a3b!important;background-color:#fff!important;box-shadow:none!important;outline:0!important;transition:border-color .2s,box-shadow .2s}\n.bb-main input:focus,.bb-main select:focus,.bb-main textarea:focus{border-color:#f39200!important;box-shadow:0 0 0 4px rgba(243,146,0,.15)!important}\n.bb-main label,.bb-main .bb-lbl{color:#6b7585!important;font-weight:600!important}\n.bb-main input[type=radio],.bb-main input[type=checkbox]{accent-color:#f39200;width:18px;height:18px;cursor:pointer}\n.bb-main .bb-save{background:linear-gradient(135deg,#f7a21b,#ef8a00)!important;color:#fff!important;border:0!important;border-radius:12px!important;min-height:48px!important;padding:0 32px!important;font-size:15px!important;font-weight:800!important;box-shadow:0 10px 24px rgba(243,146,0,.35)!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;transition:transform .15s,box-shadow .2s}\n.bb-main .bb-save:hover{transform:translateY(-1px);box-shadow:0 14px 28px rgba(243,146,0,.42)!important}\n.bb-main .bb-save *{color:#fff!important;background:transparent!important}\n.bb-main .bb-del{background:#fff!important;color:#d93025!important;border:1.5px solid #f3c2bd!important;border-radius:12px!important;min-height:48px!important;padding:0 20px!important;font-size:14px!important;font-weight:600!important;box-shadow:none!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;transition:background .2s,border-color .2s}\n.bb-main .bb-del:hover{background:#fdecea!important;border-color:#d93025!important}\n.bb-main .bb-del *{color:#d93025!important;background:transparent!important}\n@media (max-width:991px){.bb-side,.bb-main{border-radius:14px!important}.bb-main{padding:16px!important}}\n\n/* ---------- bb-accmid: Hesabım orta alan ---------- */\n.bb-mtabs{display:inline-flex!important;flex-wrap:wrap!important;gap:4px!important;background:#f1f3f6!important;border-radius:999px!important;padding:5px!important;border:0!important;margin:0 0 20px!important;box-shadow:none!important;width:auto!important;list-style:none!important}\n.bb-mtab{border:0!important;border-radius:999px!important;padding:10px 18px!important;background:transparent!important;color:#6b7585!important;font-size:14px!important;font-weight:700!important;cursor:pointer!important;text-decoration:none!important;box-shadow:none!important;margin:0!important;height:auto!important;line-height:1.3!important;transition:background .2s,color .2s,box-shadow .2s}\n.bb-mtab *{color:inherit!important;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important}\n.bb-mtab:hover{color:#1e2a3b!important}\n.bb-mtab.bb-mon{background:#fff!important;color:#e07f00!important;box-shadow:0 4px 12px rgba(16,24,40,.10)!important}\n.bb-mempty{border:0!important;background:#fafbfc!important;border-radius:16px!important;padding:40px 20px!important;text-align:center!important}\n.bb-memptyic{border:2px dashed #f8c98a!important;background:#fff4e5!important;color:#f39200!important}\n.bb-memptyic *{color:#f39200!important;fill:#f39200!important}\n.bb-mtitle{color:#1e2a3b!important;font-weight:800!important}\n.bb-mbtn{background:linear-gradient(135deg,#f7a21b,#ef8a00)!important;color:#fff!important;border:0!important;border-radius:12px!important;min-height:46px!important;padding:0 28px!important;font-size:15px!important;font-weight:800!important;box-shadow:0 10px 24px rgba(243,146,0,.35)!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important;transition:transform .15s,box-shadow .2s}\n.bb-mbtn:hover{transform:translateY(-1px);box-shadow:0 14px 28px rgba(243,146,0,.42)!important}\n.bb-mbtn *{color:#fff!important;background:transparent!important}\n.bb-mcard{border:1.5px solid #eef0f3!important;border-radius:16px!important;padding:18px!important;background:#fff!important;box-shadow:0 4px 14px rgba(16,24,40,.04)!important;transition:border-color .2s,box-shadow .2s,transform .15s;box-sizing:border-box!important}\n.bb-mcard:hover{border-color:#f39200!important;box-shadow:0 10px 24px rgba(243,146,0,.14)!important;transform:translateY(-2px)}\n.bb-mcard,.bb-mcard *{color:#3d4757}\n.bb-medit,.bb-mdel{display:inline-flex!important;align-items:center!important;gap:4px!important;border-radius:999px!important;padding:5px 12px!important;font-size:12px!important;font-weight:700!important;text-decoration:none!important;cursor:pointer!important;border:0!important;transition:background .2s}\n.bb-medit,.bb-medit *{color:#e07f00!important;background:#fff4e5!important}\n.bb-medit:hover,.bb-medit:hover *{background:#ffe7c7!important}\n.bb-mdel,.bb-mdel *{color:#d93025!important;background:#fdecea!important}\n.bb-mdel:hover,.bb-mdel:hover *{background:#fbd5d1!important}\n@media (max-width:767px){.bb-mtabs{display:flex!important;border-radius:16px!important}.bb-mtab{flex:1 1 auto!important;text-align:center!important}}\n\n/* ---------- bb-fav: Hesabım > Favorilerim ---------- */\n.bbf-head{background:#f6f7f9!important;color:#6b7585!important;font-weight:700!important;border-radius:12px!important}\n.bbf-head *{color:#6b7585!important;background:transparent!important}\n.bbf-card{border:1.5px solid #eef0f3!important;border-radius:16px!important;background:#fff!important;transition:border-color .2s,box-shadow .2s}\n.bbf-card:hover{border-color:#f39200!important;box-shadow:0 10px 24px rgba(243,146,0,.14)!important}\n.bbf-price{color:#f39200!important;font-size:20px!important;font-weight:800!important}\n.bbf-add{background:#f39200!important;color:#fff!important;border:0!important;border-radius:10px!important;padding:9px 16px!important;font-weight:700!important;cursor:pointer!important}\n.bbf-add:hover{background:#e07f00!important}\n.bbf-add *{color:#fff!important}\n.bbf-rem{background:#fff!important;color:#d93025!important;border:1.5px solid #f3c2bd!important;border-radius:10px!important;padding:8px 14px!important;font-weight:600!important;cursor:pointer!important}\n.bbf-rem:hover{background:#fdecea!important}\n.bbf-rem *{color:#d93025!important}\n\n/* ---------- bb-bc: kategori silsilesi ---------- */\n.bb-bc{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;background:#fff!important;border:1px solid #eef0f3!important;border-radius:14px!important;box-shadow:0 4px 14px rgba(16,24,40,.04)!important;padding:8px 10px 8px 12px!important;box-sizing:border-box!important;min-height:52px!important}\n.bb-bc-list{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:2px!important;min-width:0!important;margin:0!important;padding:0!important;list-style:none!important}\n.bb-bcitem{display:inline-flex!important;align-items:center!important;margin:0!important;padding:0!important;float:none!important;list-style:none!important;background:transparent!important}\n.bb-bcitem::after{content:none!important;display:none!important}\n.bb-bcitem+.bb-bcitem::before{content:\"\"!important;display:inline-block!important;width:14px!important;height:14px!important;margin:0 4px!important;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b4bcc8' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m9 6 6 6-6 6'/%3E%3C/svg%3E\") no-repeat center/contain!important;color:transparent!important;font-size:0!important;padding:0!important}\n.bb-bc a.bb-bclink{display:inline-flex!important;align-items:center!important;gap:6px!important;color:#6b7585!important;font-size:13px!important;font-weight:500!important;text-decoration:none!important;padding:5px 10px!important;border-radius:999px!important;transition:background .15s,color .15s;white-space:nowrap!important}\n.bb-bc a.bb-bclink:hover{background:#fff4e5!important;color:#e07f00!important}\n.bb-bc a.bb-bchome::before{content:\"\"!important;width:15px;height:15px;flex:0 0 15px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f39200' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 11 12 4l9 7'/%3E%3Cpath d='M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9'/%3E%3C/svg%3E\") no-repeat center/contain}\n.bb-bccur{display:inline-block!important;color:#1e2a3b!important;font-size:13px!important;font-weight:700!important;background:#f6f7f9!important;padding:5px 12px!important;border-radius:999px!important;max-width:420px!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}\n.bb-bcback{display:inline-flex!important;align-items:center!important;gap:6px!important;flex:0 0 auto!important;color:#1e2a3b!important;font-size:13px!important;font-weight:600!important;text-decoration:none!important;border:1.5px solid #e3e7ee!important;border-radius:999px!important;padding:7px 14px 7px 10px!important;background:#fff!important;white-space:nowrap!important;transition:border-color .2s,color .2s,background .2s}\n.bb-bcback::before{content:\"\";width:15px;height:15px;flex:0 0 15px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e2a3b' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 12H5'/%3E%3Cpath d='m12 19-7-7 7-7'/%3E%3C/svg%3E\") no-repeat center/contain}\n.bb-bcback:hover{border-color:#f39200!important;color:#e07f00!important;background:#fff8ef!important}\n@media (max-width:767px){\n.bb-bc{padding:6px 8px!important;border-radius:12px!important}\n.bb-bc-list{flex-wrap:nowrap!important;overflow-x:auto!important;scrollbar-width:none}\n.bb-bc-list::-webkit-scrollbar{display:none}\n.bb-bccur{max-width:200px!important}\n.bb-bcback{padding:6px 10px!important;font-size:0!important;gap:0!important}\n}\n";
  (document.head||document.documentElement).appendChild(s);
})();
/* ===== bb-early: tasarım kodlarını ekran çizilmeden önce çalıştırır ===== */
(function(){
  if(window.__bbearly) return; window.__bbearly=1;
  var queued=false, obs;
  function tick(){ queued=false; var l=window.bbEarly||[]; for(var i=0;i<l.length;i++){ try{l[i]();}catch(e){} } }
  function q(){ if(!queued){ queued=true; requestAnimationFrame(tick); } }
  if(window.MutationObserver){
    obs=new MutationObserver(q);
    obs.observe(document.documentElement,{childList:true,subtree:true});
    document.addEventListener('DOMContentLoaded',function(){ tick(); obs.disconnect(); });
  }
})();

/* ===== bb-hdr: header (arama, favori, hesabım, sepet) ===== */
(function(){
  if(window.__bbhdr) return; window.__bbhdr=1;
  function vis(e){return !!(e && e.offsetParent!==null);}
  function top(e){return e.getBoundingClientRect().top+window.pageYOffset;}
  function txt(e){return (e.textContent||'').replace(/\s+/g,' ').trim();}
  function desk(){return window.innerWidth>=992;}
  function leaf(re,scope,needVis){
    var root=scope||document.body; if(!root) return null;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false), n;
    while((n=w.nextNode())){
      var v=n.nodeValue; if(!v||v.length>80) continue;
      var s=v.replace(/\s+/g,' ').trim(); if(!s||!re.test(s)) continue;
      var e=n.parentElement; if(!e||/^(SCRIPT|STYLE|NOSCRIPT)$/.test(e.tagName)) continue;
      if(needVis){ if(!vis(e)||top(e)>260) continue; var rr=e.getBoundingClientRect(); if(rr.left<-5||rr.right>window.innerWidth+5) continue; }
      return e;
    }
    return null;
  }
  function tagCount(scope){
    var els=scope.querySelectorAll('*');
    for(var i=0;i<els.length;i++){ if(!els[i].children.length && /^\d{1,3}$/.test(txt(els[i]))){els[i].classList.add('bb-cnt');return true;} }
    return false;
  }
  function initSearch(){
    if(document.querySelector('.bb-search')) return;
    var q=document.getElementById('txtbxArama');
    if(!vis(q)){ q=null;
      var ins=document.querySelectorAll('input[type=text],input[type=search],input:not([type])');
      for(var i=0;i<ins.length;i++){ if(vis(ins[i]) && top(ins[i])<260 && /ara/i.test(ins[i].placeholder||ins[i].value||'')){q=ins[i];break;} }
    }
    if(!q) return;
    var btn=null, wrap=q.parentElement;
    for(var lv=0; lv<5 && wrap && !btn; lv++){
      var c=wrap.querySelectorAll('button,input[type=submit],input[type=button],input[type=image],a,div[onclick],span[onclick]');
      for(var k=0;k<c.length;k++){
        var b=c[k]; if(b===q||b.contains(q)||!vis(b)) continue;
        if(b.querySelector('img[src*="mic"]')||(b.tagName==='IMG'&&/mic/.test(b.src))) continue;
        if(b.getBoundingClientRect().width<130){btn=b;break;}
      }
      if(!btn) wrap=wrap.parentElement;
    }
    if(!btn||!wrap) return;
    wrap.classList.add('bb-search'); q.classList.add('bb-q'); btn.classList.add('bb-sbtn');
    for(var e=q.parentElement; e && e!==wrap; e=e.parentElement) e.classList.add('bb-sgrow');
    for(var f=btn.parentElement; f && f!==wrap; f=f.parentElement) if(!f.classList.contains('bb-sgrow')) f.classList.add('bb-spass');
    q.setAttribute('placeholder','Marka, model veya parça ara…');
  }
  function initFav(){
    var f0=document.querySelector('.bb-fav');
    if(f0){ if(!document.querySelector('.bb-cnt')){ if(!tagCount(f0) && f0.parentElement && f0.parentElement.children.length<=3){ f0.parentElement.classList.add('bb-favwrap'); tagCount(f0.parentElement); } } return; }
    var a=document.querySelectorAll('a[href*="Favorilerim"]'), fav=null;
    for(var i=0;i<a.length;i++){ if(vis(a[i]) && top(a[i])<260){fav=a[i];break;} }
    if(!fav) return;
    fav.classList.add('bb-fav');
    if(!tagCount(fav) && fav.parentElement && fav.parentElement.children.length<=3){
      fav.parentElement.classList.add('bb-favwrap'); tagCount(fav.parentElement);
    }
  }
  function initAcc(){
    if(document.querySelector('.bb-accmenu')) return;
    var btn=document.querySelector('.bb-acc');
    if(!btn){
      var lab=leaf(/^(Hesabım|Üye Girişi|Giriş Yap)$/i,document.body,true);
      if(!lab) return;
      btn=lab.closest('a')||lab.parentElement;
      btn.classList.add('bb-acc');
    }
    var menuRe=/^(Siparişlerim|Üye Ol|Çıkış Yap|Üyelik Bilgilerim|Adres Defterim)$/i;
    var root=btn.parentElement, link=null;
    for(var lv=0; lv<6 && root; lv++){
      var c=root.querySelectorAll('a,li,span');
      for(var i=0;i<c.length;i++){ if(!btn.contains(c[i]) && menuRe.test(txt(c[i]))){link=c[i];break;} }
      if(link) break; root=root.parentElement;
    }
    if(!link) return;
    root.classList.add('bb-accroot');
    var m=link; while(m.parentElement && m.parentElement!==root && !m.parentElement.contains(btn)) m=m.parentElement;
    m.classList.add('bb-accmenu');
    var adm=leaf(/^Admin$/,m,false); if(adm) adm.classList.add('bb-accadm');
    var ls=m.querySelectorAll('a'); for(var j=0;j<ls.length;j++){ if(/^Çıkış Yap$/i.test(txt(ls[j]))) ls[j].classList.add('bb-out'); }
    var t=null;
    function place(){
      var r=root.getBoundingClientRect(), b=btn.getBoundingClientRect();
      m.style.setProperty('top',(b.bottom-r.top+10)+'px','important');
      m.style.setProperty('right',(r.right-b.right)+'px','important');
      m.style.setProperty('left','auto','important');
      m.style.setProperty('bottom','auto','important');
    }
    function open(){ if(!desk()) return; clearTimeout(t); place(); root.classList.add('bb-open'); }
    function close(){ clearTimeout(t); t=setTimeout(function(){root.classList.remove('bb-open');},350); }
    root.addEventListener('mouseenter',open);
    root.addEventListener('mouseleave',close);
    m.addEventListener('mouseenter',open);
    document.addEventListener('click',function(ev){ if(!root.contains(ev.target)) root.classList.remove('bb-open'); });
  }
  function hideCartCount(cart){
    var w=document.createTreeWalker(cart,NodeFilter.SHOW_TEXT,null,false), n, list=[];
    while((n=w.nextNode())) list.push(n);
    for(var i=0;i<list.length;i++){
      var tn=list[i];
      if(!/^\s*\(?\d{1,3}\)?\s*$/.test(tn.nodeValue)) continue;
      var p=tn.parentElement;
      if(p && p!==cart && /^\(?\d{1,3}\)?$/.test(txt(p))) p.classList.add('bb-hide');
      else tn.nodeValue='';
    }
  }
  function initCart(){
    if(document.querySelector('.bb-cart')) return;
    var lab=leaf(/^Sepetim\b/i,document.body,true);
    if(!lab) return;
    var cart=lab.closest('a');
    if(!cart){ cart=lab;
      while(cart.parentElement && txt(cart.parentElement).length<45 && !cart.parentElement.querySelector('.bb-q,.bb-acc,.bb-fav')) cart=cart.parentElement;
    }
    cart.classList.add('bb-cart');
    hideCartCount(cart);
    var els=cart.querySelectorAll('*');
    for(var i=0;i<els.length;i++){ if(!els[i].children.length && /₺|TL/.test(txt(els[i])) && !/Sepetim/i.test(txt(els[i]))){els[i].classList.add('bb-price');break;} }
    if(window.MutationObserver){
      new MutationObserver(function(){ hideCartCount(cart); }).observe(cart,{childList:true,subtree:true,characterData:true});
    }
  }
  var hdrDone=false;
  function run(){ if(!document.body||hdrDone) return;
    if(document.querySelector('.bb-search')&&document.querySelector('.bb-accmenu')&&document.querySelector('.bb-cart')&&document.querySelector('.bb-fav')&&document.querySelector('.bb-cnt')){hdrDone=true;return;}
    try{initSearch();}catch(e){} try{initFav();}catch(e){} try{initAcc();}catch(e){} try{initCart();}catch(e){} }
  (window.bbEarly=window.bbEarly||[]).push(run);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  window.addEventListener('load',run);
  setTimeout(run,800); setTimeout(run,2000); setTimeout(run,4000);
})();

/* ===== bb-sg: arama öneri penceresi ===== */
(function(){
  if(window.__bbsg2) return; window.__bbsg2=1;
  var PATS=['/arama?q={q}','/Arama?kelime={q}','/arama?kelime={q}','/Arama.aspx?kelime={q}'];
  var KEY='bbSgMode1', cache={}, mode=null, token=0, tmr=null, panel=null, cur=null;
  var rules={}, hideSt=document.createElement('style'); hideSt.id='bb-hide-orig';
  var EXCL='#mmzRoot,[id*=mmz],[class*=mmz],[class*=select2],[class*=choices],[class*=bootstrap-select],[class*=dropdown],[role=listbox],[role=combobox]';
  try{mode=JSON.parse(localStorage.getItem(KEY));}catch(e){}
  function save(p,f){mode={p:p,f:f};try{localStorage.setItem(KEY,JSON.stringify(mode));}catch(e){}}
  function txt(e){return (e.textContent||'').replace(/\s+/g,' ').trim();}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function urlFor(p,q){return p.replace('{q}',encodeURIComponent(q));}
  function norm(s){return String(s).toLocaleLowerCase('tr-TR').replace(/[^0-9a-zçğıöşü]/g,'');}
  function rank(q,list){
    var full=norm(q), toks=String(q).split(/\s+/).map(norm).filter(function(t){return t.length>0;});
    return list.map(function(p,i){
      var n=norm(p.n), sc=0;
      toks.forEach(function(t){ if(n.indexOf(t)>-1) sc+=10; });
      if(full && n.indexOf(full)>-1) sc+=5;
      return {p:p,s:sc,i:i};
    }).sort(function(a,b){ return b.s-a.s || a.i-b.i; }).map(function(x){return x.p;});
  }
  function isSearch(t){
    if(!t||t.tagName!=='INPUT') return false;
    var ty=(t.getAttribute('type')||'text').toLowerCase(); if(ty!=='text'&&ty!=='search') return false;
    if(t.closest('.bb-sg')) return false;
    if(t.classList.contains('bb-q') || t.id==='txtbxArama') return true;
    if(t.closest(EXCL)) return false;
    var meta=(t.id||'')+' '+(t.name||'')+' '+(t.className||'');
    var inHeader=!!t.closest('header,[class*=header],[id*=header],[class*=Header],[id*=Header]');
    if(!inHeader) return false;
    return /arama|search/i.test(meta) || /ara|search/i.test(t.placeholder||'');
  }
  function cat(n){
    var s=n.split(/uyumlu/i).pop();
    var m=[[/ara hortum|teker|adaptör|adaptor|mandal|tırnak|tirnak|aksesuar/i,'Diğer Parçalar'],[/torba/i,'Süpürge Toz Torbaları'],[/filtre/i,'Süpürge Filtreleri'],[/hortum/i,'Süpürge Hortumları'],[/boru/i,'Süpürge Boruları'],[/tutma|\bsap/i,'Süpürge Tutma Sapları'],[/başl|basl|emici|turbo|fırça|firca/i,'Süpürge Emici Başlıkları'],[/dişli|disli|kaplin/i,'Blender Dişlileri'],[/motor/i,'Blender Motorları'],[/parçalayıcı|parcalayici|bıçak|bicak/i,'Blender Parçalayıcı Ayakları'],[/musluk/i,'Sebil Yedek Parçaları'],[/pervane/i,'Vantilatör Yedek Parçaları'],[/silikon/i,'Çaydanlık Aksesuar']];
    for(var i=0;i<m.length;i++) if(m[i][0].test(s)) return m[i][1];
    return 'Yedek Parça';
  }
  function parse(doc){
    var links=doc.querySelectorAll('[class*=productName] a, a[class*=productName], [class*=ProductName] a'), items=[], seen={};
    for(var i=0;i<links.length;i++){
      var a=links[i], href=a.getAttribute('href'); if(!href||seen[href]) continue;
      if(a.closest('header,[class*=mini],[class*=Mini],[id*=mini],[id*=Mini],.bb-sg')) continue;
      var name=txt(a)||a.getAttribute('title')||''; if(!name) continue;
      var it=a, lv=0; while(it && lv<7 && !it.querySelector('img')){it=it.parentElement;lv++;}
      if(!it) continue;
      var img='', ims=it.querySelectorAll('img');
      for(var j=0;j<ims.length;j++){
        var s=ims[j].getAttribute('data-original')||ims[j].getAttribute('data-src')||ims[j].getAttribute('data-lazy')||ims[j].getAttribute('src')||'';
        if(s && !/blank\.(png|gif)/i.test(s) && !/^data:/.test(s)){img=s;break;}
      }
      var price='', all=it.querySelectorAll('*');
      for(var k=0;k<all.length;k++){
        var e=all[k]; if(e.children.length) continue;
        var t=txt(e);
        if(/₺|TL/.test(t) && /\d/.test(t) && t.length<20 && !e.closest('del,s,[class*=old],[class*=Old],[class*=eski]')) price=t;
      }
      seen[href]=1; items.push({p:it.parentElement, d:{n:name,h:href,i:img,p:price}});
    }
    var counts=[], best=null, bn=0;
    items.forEach(function(x){
      for(var c=0;c<counts.length;c++){ if(counts[c].el===x.p){counts[c].n++;return;} }
      counts.push({el:x.p,n:1});
    });
    counts.forEach(function(c){ if(c.n>bn){bn=c.n;best=c.el;} });
    if(bn>=2) items=items.filter(function(x){return x.p===best;});
    return items.map(function(x){return x.d;});
  }
  function viaFetch(u){
    return fetch(u,{credentials:'same-origin'}).then(function(r){
      if(!r.ok) throw 0;
      var fu=new URL(r.url); if(fu.pathname==='/' && !fu.search) throw 0;
      return r.text();
    }).then(function(h){ return parse(new DOMParser().parseFromString(h,'text/html')); });
  }
  function viaIframe(u){
    return new Promise(function(res){
      var f=document.createElement('iframe'), done=false, last=-1, tries=0;
      f.setAttribute('aria-hidden','true'); f.tabIndex=-1;
      f.style.cssText='position:absolute;left:-10000px;top:0;width:1200px;height:900px;border:0;visibility:hidden';
      function fin(l){ if(done) return; done=true; try{f.remove();}catch(e){} res(l); }
      f.onload=function(){
        var iv=setInterval(function(){
          tries++; var l=[]; try{ l=parse(f.contentDocument); }catch(e){}
          if((l.length && l.length===last) || tries>22){ clearInterval(iv); fin(l); }
          last=l.length;
        },300);
      };
      setTimeout(function(){ fin([]); },9000);
      f.src=u; document.body.appendChild(f);
    });
  }
  function detect(q){
    var i=0, ok=[];
    function tryF(){
      if(i>=PATS.length) return tryI(0);
      var p=PATS[i++], u=urlFor(p,q);
      return viaFetch(u).then(function(l){ if(l.length){save(p,'f');return {list:l,url:u};} ok.push(p); return tryF(); }, function(){ return tryF(); });
    }
    function tryI(j){
      if(j>=ok.length) return Promise.resolve({list:[],url:urlFor(PATS[0],q)});
      var p=ok[j], u=urlFor(p,q);
      return viaIframe(u).then(function(l){ if(l.length){save(p,'i');return {list:l,url:u};} return tryI(j+1); });
    }
    return tryF();
  }
  function get(q){
    if(cache[q]) return Promise.resolve(cache[q]);
    var pr;
    if(mode){ var u=urlFor(mode.p,q); pr=(mode.f==='i'?viaIframe(u):viaFetch(u)).then(function(l){return {list:l,url:u};}); }
    else pr=detect(q);
    return pr.then(function(r){ cache[q]=r; return r; });
  }
  function ensurePanel(){
    if(panel) return;
    panel=document.createElement('div'); panel.className='bb-sg'; document.body.appendChild(panel);
    document.head.appendChild(hideSt);
  }
  function place(){
    if(!panel||!cur||!panel.classList.contains('bb-on')) return;
    var r=cur.getBoundingClientRect(), vw=window.innerWidth;
    var vh=(window.visualViewport?window.visualViewport.height:window.innerHeight);
    var mob=vw<992, w=mob?vw-16:Math.min(780,vw*0.94);
    var left=mob?8:Math.max(8,Math.min(vw-w-8,r.left+r.width/2-w/2));
    var top=Math.max(8,r.bottom+8);
    panel.style.left=left+'px'; panel.style.top=top+'px'; panel.style.width=w+'px';
    panel.style.maxHeight=Math.max(200,vh-top-12)+'px';
  }
  function show(){ ensurePanel(); panel.classList.add('bb-on'); place(); }
  function hide(){ if(panel) panel.classList.remove('bb-on'); }
  function render(q,r){
    if(!r.list.length){ panel.innerHTML='<div class="bb-sg-msg">“'+esc(q)+'” için ürün bulunamadı. Marka veya model kodunu kontrol edin.</div>'; return; }
    var h='<div class="bb-sg-head"><span><b>“'+esc(q)+'”</b> için sonuçlar</span><a class="bb-sg-all" href="'+esc(r.url)+'">Tüm sonuçları gör →</a></div><div class="bb-sg-list">';
    rank(q,r.list).slice(0,12).forEach(function(p){
      h+='<a class="bb-sg-card" href="'+esc(p.h)+'">'+(p.i?'<img src="'+esc(p.i)+'" alt="" loading="lazy">':'')+
         '<div class="bb-sg-txt"><span class="bb-sg-chip">'+esc(cat(p.n))+'</span><span class="bb-sg-name">'+esc(p.n)+'</span>'+
         (p.p?'<span class="bb-sg-price">'+esc(p.p)+'</span>':'')+'</div></a>';
    });
    panel.innerHTML=h+'</div>';
  }
  function run(){
    if(!cur) return;
    var q=(cur.value||'').trim();
    if(q.length<2){ hide(); return; }
    ensurePanel();
    var my=++token;
    if(!cache[q]) panel.innerHTML='<div class="bb-sg-msg"><span class="bb-sg-spin"></span>Aranıyor…</div>';
    show();
    get(q).then(function(r){ if(my===token){ render(q,r); show(); } }).catch(function(){ if(my===token) hide(); });
  }
  function addRule(el){
    var sel='';
    if(el.id) sel='#'+(window.CSS&&CSS.escape?CSS.escape(el.id):el.id);
    else{
      var cls=[].filter.call(el.classList,function(c){return c.indexOf('bb-')!==0;});
      if(cls.length) sel=el.tagName.toLowerCase()+'.'+cls.map(function(c){return window.CSS&&CSS.escape?CSS.escape(c):c;}).join('.');
    }
    if(!sel||rules[sel]) return;
    var m; try{ m=document.querySelectorAll(sel); }catch(e){ return; }
    if(m.length!==1) return;
    if(m[0].closest(EXCL) || m[0].querySelector('#mmzRoot')) return;
    var ins=m[0].querySelectorAll('input'); for(var i=0;i<ins.length;i++) if(isSearch(ins[i])) return;
    rules[sel]=1;
    hideSt.textContent=Object.keys(rules).join(',')+'{display:none!important}';
  }
  function hideOriginal(){
    if(!cur||!document.body) return;
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false), n;
    while((n=w.nextNode())){
      if((n.nodeValue||'').trim()!=='Kategoriler') continue;
      var el=n.parentElement; if(!el || el.closest('.bb-sg') || el.closest(EXCL)) continue;
      var r=el; while(r.parentElement && r.parentElement!==document.body && !r.parentElement.contains(cur)) r=r.parentElement;
      if(r.contains(cur) || r.closest('.bb-sg') || r.querySelector('#mmzRoot')) continue;
      if(!(r.querySelector('img') || /Ürünler/.test(r.textContent||''))) continue;
      r.classList.add('bb-achide'); r.style.setProperty('display','none','important');
      ensurePanel(); addRule(r);
    }
  }
  var ht=null;
  function schedHide(){ clearTimeout(ht); ht=setTimeout(function(){ try{hideOriginal();}catch(e){} },40); }
  document.addEventListener('input',function(e){
    if(!isSearch(e.target)) return;
    cur=e.target; cur.setAttribute('autocomplete','off');
    clearTimeout(tmr); tmr=setTimeout(run,350); schedHide();
  },true);
  document.addEventListener('focusin',function(e){
    if(!isSearch(e.target)){ if(e.target && e.target.closest && !e.target.closest('.bb-sg')) hide(); return; }
    cur=e.target; var q=(cur.value||'').trim();
    if(q.length>=2 && cache[q]){ ensurePanel(); render(q,cache[q]); show(); }
    schedHide();
  },true);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') hide(); },true);
  document.addEventListener('click',function(e){
    if(!panel||!panel.classList.contains('bb-on')) return;
    if(panel.contains(e.target) || (cur && (e.target===cur || cur.contains(e.target)))) return;
    hide();
  },true);
  window.addEventListener('resize',place);
  window.addEventListener('scroll',place,true);
  if(window.visualViewport) window.visualViewport.addEventListener('resize',place);
  function startObs(){
    if(window.MutationObserver) new MutationObserver(function(){
      if(cur && document.activeElement===cur && (cur.value||'').length>1) schedHide();
    }).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});
  }
  if(document.body) startObs(); else document.addEventListener('DOMContentLoaded',startObs);
})();

/* ===== bb-logo: robot süpürgeli logo (v5) ===== */
(function(){
  if(window.__bblogo) return; window.__bblogo=1;
  var SRC='https://static.ticimax.cloud/74653/uploads/bankalogo/benceburada-logo-v5-supurge.svg';
  function swap(){
    var ims=document.querySelectorAll('img[src*="9e1c53dd-6b30-4dca-8285-fb9220638711"],img[data-original*="9e1c53dd-6b30-4dca-8285-fb9220638711"],img[data-src*="9e1c53dd-6b30-4dca-8285-fb9220638711"]');
    for(var i=0;i<ims.length;i++){
      var im=ims[i]; if(im.getAttribute('data-bblogo')) continue;
      im.setAttribute('data-bblogo','1');
      im.removeAttribute('srcset');
      im.removeAttribute('width'); im.removeAttribute('height');
      im.src=SRC; im.alt='benceburada';
    }
  }
  (window.bbEarly=window.bbEarly||[]).push(swap);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',swap); else swap();
  window.addEventListener('load',swap); setTimeout(swap,1500);
})();

/* ===== bb-login: giriş / üye ol kartı ===== */
(function(){
  if(window.__bblogin) return; window.__bblogin=1;
  function txt(e){return (e.textContent||e.value||'').replace(/\s+/g,' ').trim();}
  function vis(e){return !!(e && e.offsetParent!==null);}
  function lum(e){var m=(getComputedStyle(e).color||'').match(/\d+/g);return m?(+m[0]*299+ +m[1]*587+ +m[2]*114)/1000:255;}
  function leafs(scope,re){var a=scope.querySelectorAll('*'),r=[];for(var i=0;i<a.length;i++){var e=a[i];if(re.test(txt(e))){var deeper=false;for(var j=0;j<e.children.length;j++)if(re.test(txt(e.children[j]))){deeper=true;break;}if(!deeper)r.push(e);}}return r;}
  var box=null, tabs=[];
  function markActive(){
    if(tabs.length<2) return;
    var a=lum(tabs[0]), b=lum(tabs[1]);
    tabs[0].classList.remove('bb-on'); tabs[1].classList.remove('bb-on');
    (a<=b?tabs[0]:tabs[1]).classList.add('bb-on');
  }
  function tag(){
    var pw=null, ps=document.querySelectorAll('input[type=password]');
    for(var i=0;i<ps.length;i++) if(vis(ps[i])){pw=ps[i];break;}
    if(!pw) return;
    if(!box){
      var c=pw;
      for(var lv=0;lv<12 && c;lv++){
        c=c.parentElement; if(!c||c===document.body) return;
        var t=c.textContent||'';
        if(/Giriş Yap/.test(t) && /Üye Ol/.test(t) && c.querySelectorAll('input').length>=2){box=c;break;}
      }
      if(!box) return;
      box.classList.add('bb-login');
      var pt=pw.getBoundingClientRect().top;
      var t1=leafs(box,/^Giriş Yap$/).filter(function(e){return e.getBoundingClientRect().top<pt;})[0];
      var t2=leafs(box,/^Üye Ol$/).filter(function(e){return e.getBoundingClientRect().top<pt;})[0];
      if(t1&&t2){
        t1=t1.closest('a,li,button')||t1; t2=t2.closest('a,li,button')||t2;
        var row=t1.parentElement; while(row && !row.contains(t2)) row=row.parentElement;
        if(row && row!==box){
          row.classList.add('bb-tabs'); t1.classList.add('bb-tab'); t2.classList.add('bb-tab'); tabs=[t1,t2];
          var hello=document.createElement('div'); hello.className='bb-login-hello';
          hello.innerHTML='<b>benceburada’ya hoş geldin 👋</b><span>Giriş yap ya da birkaç saniyede üye ol.</span>';
          row.parentElement.insertBefore(hello,row);
          markActive();
          [t1,t2].forEach(function(t){ t.addEventListener('click',function(){ setTimeout(markActive,60); setTimeout(markActive,350); }); });
        }
      }
      if(window.MutationObserver){ var tm=null; new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(tagInner,120); }).observe(box,{childList:true,subtree:true}); }
    }
    tagInner();
  }
  function tagInner(){
    if(!box) return;
    var ins=box.querySelectorAll('input[type=text],input[type=email],input[type=password],input[type=tel],input:not([type])'), last=null;
    for(var i=0;i<ins.length;i++){
      var inp=ins[i]; if(!vis(inp)) continue; last=inp;
      var w=inp.parentElement, n=0, q=w.querySelectorAll('input');
      for(var k=0;k<q.length;k++) if(vis(q[k]) && q[k].type!=='hidden' && q[k].type!=='checkbox') n++;
      if(w!==box && n===1 && !w.classList.contains('bb-tabs')){ if(!w.classList.contains('bb-field')) w.classList.add('bb-field'); }
      else if(!inp.classList.contains('bb-field')) inp.classList.add('bb-field');
    }
    if(last){
      var lt=last.getBoundingClientRect().top, best=null, bw=0;
      var bs=box.querySelectorAll('a,button,input[type=submit],input[type=button]');
      for(var j=0;j<bs.length;j++){
        var b=bs[j]; if(!vis(b) || b.classList.contains('bb-tab') || b.closest('.bb-tabs')) continue;
        if(!/^(Giriş Yap|Üye Ol|Kayıt Ol|Devam|Üyeliği Tamamla)/i.test(txt(b))) continue;
        var r=b.getBoundingClientRect(); if(r.top<lt) continue;
        if(r.width>bw){bw=r.width;best=b;}
      }
      if(best && !best.classList.contains('bb-btn')) best.classList.add('bb-btn');
    }
    var fl=leafs(box,/^Şifremi Unuttum/); for(var f=0;f<fl.length;f++){ var fa=fl[f].closest('a')||fl[f]; if(!fa.classList.contains('bb-forgot')) fa.classList.add('bb-forgot'); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',tag); else tag();
  window.addEventListener('load',tag); setTimeout(tag,1200);
})();

/* ===== bb-acc: Hesabım sol menü + sağ kart ===== */
(function(){
  if(!/hesabim/i.test(location.pathname)) return;
  if(window.__bbacc) return; window.__bbacc=1;
  function txt(e){return (e.textContent||e.value||'').replace(/\s+/g,' ').trim();}
  function vis(e){return !!(e && e.offsetParent!==null);}
  function outHeader(e){return !e.closest('.bb-accroot,.bb-accmenu,header,[class*=header],[id*=header]');}
  function leaf(re){
    var a=document.querySelectorAll('a,span,div,li,p,b,strong');
    for(var i=0;i<a.length;i++){ var e=a[i]; if(!vis(e)||!outHeader(e)||!re.test(txt(e))) continue;
      var d=false; for(var j=0;j<e.children.length;j++) if(re.test(txt(e.children[j]))){d=true;break;}
      if(!d) return e; }
    return null;
  }
  var side=null, main=null;
  function find(){
    if(!side){
      var a=leaf(/^Güvenli Çıkış$/i), b=leaf(/^Sözleşmelerim$/i)||leaf(/^Favorilerim$/i);
      if(!a||!b) return false;
      var c=a; while(c && !c.contains(b)) c=c.parentElement;
      if(!c||c===document.body) return false;
      side=c; side.classList.add('bb-side');
    }
    if(!main||!document.body.contains(main)){
      var col=side; while(col.parentElement && col.parentElement.children.length<2) col=col.parentElement;
      var best=null, bw=0, kids=col.parentElement?col.parentElement.children:[];
      for(var i=0;i<kids.length;i++){ var k=kids[i]; if(k===col||!vis(k)) continue; var w=k.getBoundingClientRect().width; if(w>bw){bw=w;best=k;} }
      if(best){ main=best; main.classList.add('bb-main'); }
    }
    return true;
  }
  function decorate(){
    if(!find()) return;
    var links=side.querySelectorAll('a'), h=(location.hash||'').toLowerCase();
    for(var i=0;i<links.length;i++){
      var l=links[i], href=(l.getAttribute('href')||'').toLowerCase();
      l.classList.toggle('bb-active', !!h && href.indexOf(h)>-1 && h.length>2);
      if(/Güvenli Çıkış/i.test(txt(l))) l.classList.add('bb-exit');
    }
    if(main){
      var bs=main.querySelectorAll('a,button,input[type=submit],input[type=button]');
      for(var j=0;j<bs.length;j++){
        var t=txt(bs[j]);
        if(/^(Kaydet|Güncelle|Adres Ekle|Yeni Adres Ekle)$/i.test(t)) bs[j].classList.add('bb-save');
        else if(/Sil$/i.test(t) && /Üyelik/i.test(t)) bs[j].classList.add('bb-del');
      }
    }
  }
  var tm=null;
  function sched(){ clearTimeout(tm); tm=setTimeout(function(){ try{decorate();}catch(e){} },120); }
  function start(){
    decorate(); setTimeout(decorate,800); setTimeout(decorate,2000);
    window.addEventListener('hashchange',function(){ setTimeout(decorate,300); setTimeout(decorate,1200); });
    if(window.MutationObserver) new MutationObserver(sched).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();

/* ===== bb-accmid: Hesabım orta alan (Siparişlerim, Adres Defterim, Hediye Çeklerim) ===== */
(function(){
  if(!/hesabim/i.test(location.pathname)) return;
  if(window.__bbmid) return; window.__bbmid=1;
  function txt(e){return (e.textContent||e.value||'').replace(/\s+/g,' ').trim();}
  function vis(e){return !!(e && e.offsetParent!==null);}
  function lum(e){var m=(getComputedStyle(e).backgroundColor||'').match(/[\d.]+/g);if(!m)return 255;if(m.length>3&&+m[3]===0)return 255;return (+m[0]*299+ +m[1]*587+ +m[2]*114)/1000;}
  function main(){return document.querySelector('.bb-main');}
  function tabs(m){
    var c=m.querySelectorAll('a,li,button,div,span');
    for(var i=0;i<c.length;i++){
      var el=c[i]; if(!vis(el) || el.closest('.bb-mtabs')) continue;
      var t=txt(el); if(t.length<3||t.length>45) continue;
      if(lum(el)>70) continue;
      var r=el.getBoundingClientRect(); if(r.width>420||r.height>80) continue;
      var tab=el;
      for(var up=0; up<3 && tab.parentElement && tab.parentElement!==m && tab.parentElement.children.length<2; up++) tab=tab.parentElement;
      var row=tab.parentElement; if(!row||row===m) continue;
      var kids=[].filter.call(row.children,function(k){ if(!vis(k)) return false; var kr=k.getBoundingClientRect(); return Math.abs(kr.height-tab.getBoundingClientRect().height)<8 && txt(k).length>2 && txt(k).length<46; });
      if(kids.length<2) continue;
      row.classList.add('bb-mtabs');
      kids.forEach(function(k){
        k.classList.add('bb-mtab');
        k.addEventListener('click',function(){ kids.forEach(function(x){x.classList.remove('bb-mon');}); k.classList.add('bb-mon'); });
      });
      tab.classList.add('bb-mon');
    }
  }
  function empties(m){
    var all=m.querySelectorAll('*');
    for(var i=0;i<all.length;i++){
      var el=all[i]; if(el.children.length || !/bulunmamaktadır|bulunamadı|bulunmuyor/i.test(txt(el))) continue;
      el.classList.add('bb-mtitle');
      var box=el.parentElement;
      for(var up=0; up<4 && box && box!==m; up++){
        if(parseFloat(getComputedStyle(box).borderTopWidth)>0 || box.getBoundingClientRect().height>200) break;
        box=box.parentElement;
      }
      if(!box||box===m||box.classList.contains('bb-mempty')) continue;
      box.classList.add('bb-mempty');
      var ins=box.querySelectorAll('*');
      for(var q=0;q<ins.length;q++){
        var cs=getComputedStyle(ins[q]);
        if(/dashed|dotted/.test(cs.borderTopStyle) && ins[q].getBoundingClientRect().width<260){ ins[q].classList.add('bb-memptyic'); break; }
      }
    }
  }
  function buttons(m){
    var bs=m.querySelectorAll('a,button,input[type=submit],input[type=button],span,div');
    for(var i=0;i<bs.length;i++){
      var b=bs[i], t=txt(b); if(!t || t.length>30) continue;
      var deeper=false; for(var j=0;j<b.children.length;j++) if(txt(b.children[j])===t){deeper=true;break;}
      if(deeper) continue;
      var clk=b.closest('a,button')||b;
      if(/^(Alışverişe Başla|Yeni Ekle|Yeni Adres Ekle|Adres Ekle)$/i.test(t)) clk.classList.add('bb-mbtn');
      else if(/^Düzenle$/i.test(t)){
        clk.classList.add('bb-medit');
        var card=clk;
        for(var up=0; up<6 && card.parentElement && card.parentElement!==m; up++){
          card=card.parentElement;
          if(parseFloat(getComputedStyle(card).borderTopWidth)>0 && card.getBoundingClientRect().height>100){ card.classList.add('bb-mcard'); break; }
        }
      }
      else if(/^\W*Sil$/i.test(t)) clk.classList.add('bb-mdel');
    }
  }
  function run(){ var m=main(); if(!m) return; try{tabs(m);}catch(e){} try{empties(m);}catch(e){} try{buttons(m);}catch(e){} }
  var tm=null;
  function sched(){ clearTimeout(tm); tm=setTimeout(run,180); }
  function start(){
    run(); setTimeout(run,900); setTimeout(run,2200);
    window.addEventListener('hashchange',function(){ setTimeout(run,350); setTimeout(run,1300); });
    if(window.MutationObserver) new MutationObserver(sched).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();

/* ===== bb-fav: Hesabım > Favorilerim ===== */
(function(){
  if(!/hesabim/i.test(location.pathname)) return;
  if(window.__bbfav) return; window.__bbfav=1;
  function t(e){return (e.value||e.textContent||'').replace(/\s+/g,' ').trim();}
  function dark(e){var m=(getComputedStyle(e).backgroundColor||'').match(/[\d.]+/g);return m&&!(m.length>3&&+m[3]===0)&&(+m[0]+ +m[1]+ +m[2])<300;}
  function run(){
    if(!/favori/i.test(location.hash)) return;
    var els=document.querySelectorAll('a,button,input,span,div,th,td');
    for(var i=0;i<els.length;i++){
      var e=els[i], s=t(e);
      if(s==='Tanım'){ var b=e; for(var k=0;k<4&&b&&!dark(b);k++) b=b.parentElement; if(b&&dark(b)) b.classList.add('bbf-head'); }
      else if(s==='Sepete Ekle'&&!e.querySelector('*')){
        var btn=e.closest('a,button')||e; btn.classList.add('bbf-add');
        var c=btn; for(var j=0;j<7&&c.parentElement;j++){ c=c.parentElement; if(c.querySelector('img')) break; }
        c.classList.add('bbf-card');
        var all=c.querySelectorAll('*');
        for(var p=0;p<all.length;p++){ var ps=t(all[p]); if(!all[p].children.length&&/₺/.test(ps)&&ps.length<15) all[p].classList.add('bbf-price'); }
      }
      else if(s==='Favorilerden Kaldır'&&!e.querySelector('*')) (e.closest('a,button')||e).classList.add('bbf-rem');
    }
  }
  var n=0, iv=setInterval(function(){ run(); if(++n>20) clearInterval(iv); },500);
  window.addEventListener('hashchange',function(){ n=0; clearInterval(iv); iv=setInterval(function(){ run(); if(++n>20) clearInterval(iv); },500); });
})();

/* ===== bb-bc: kategori silsilesi + Önceki Sayfaya Dön ===== */
(function(){
  if(window.__bbbc) return; window.__bbbc=1;
  var done=false;
  function txt(e){return (e.textContent||'').replace(/\s+/g,' ').trim();}
  function vis(e){return !!(e && e.offsetParent!==null);}
  function run(){
    if(done||!document.body) return;
    var homes=document.querySelectorAll('a'), home=null;
    for(var i=0;i<homes.length;i++){
      var a=homes[i]; if(txt(a)!=='Anasayfa'||!vis(a)) continue;
      if(a.closest('footer,[class*=footer],[id*=footer],header,[class*=header],[id*=header],.bb-accmenu')) continue;
      home=a; break;
    }
    if(!home) return;
    var c=home;
    for(var k=0;k<8;k++){
      var p=c.parentElement; if(!p||p===document.body) break;
      if(p.getBoundingClientRect().height>90||txt(p).length>320) break;
      c=p;
    }
    if(c.querySelectorAll('a').length<2) return;
    done=true;
    c.classList.add('bb-bc');
    var back=null, all=c.querySelectorAll('a,span,div');
    for(var j=0;j<all.length;j++){ if(/Önceki Sayfaya Dön/i.test(txt(all[j])) && !all[j].querySelector('a')){ back=all[j].closest('a')||all[j]; } }
    var links=[].filter.call(c.querySelectorAll('a'),function(a){return a!==back && !(back&&back.contains(a));});
    var itemsHost=home; while(itemsHost.parentElement && !links.every(function(l){return itemsHost.parentElement.contains(l);})) itemsHost=itemsHost.parentElement;
    var host=itemsHost.parentElement||c;
    if(back && host.contains(back) && host!==c){ host=c; }
    if(host!==c) host.classList.add('bb-bc-list');
    links.forEach(function(a){
      a.classList.add('bb-bclink');
      var it=a; while(it.parentElement && it.parentElement!==host && it.parentElement!==c) it=it.parentElement;
      it.classList.add('bb-bcitem');
    });
    home.classList.add('bb-bchome');
    var w=document.createTreeWalker(host,NodeFilter.SHOW_TEXT,null,false), n, seps=[];
    while((n=w.nextNode())){ if(/^\s*[\/>»›|]\s*$/.test(n.nodeValue)) seps.push(n); }
    seps.forEach(function(s){ s.nodeValue=''; });
    var leaves=host.querySelectorAll('*'), cur=null;
    for(var q=0;q<leaves.length;q++){
      var e=leaves[q]; if(e.children.length||e.closest('a')||!txt(e)||/^[\/>»›|]$/.test(txt(e))) continue;
      if(back&&back.contains(e)) continue; cur=e;
    }
    if(cur){
      cur.classList.add('bb-bccur');
      var ci=cur; while(ci.parentElement && ci.parentElement!==host && ci.parentElement!==c) ci=ci.parentElement;
      ci.classList.add('bb-bcitem');
    }
    if(back){
      back.classList.add('bb-bcback');
      var tw=document.createTreeWalker(back,NodeFilter.SHOW_TEXT,null,false), tn;
      while((tn=tw.nextNode())){ tn.nodeValue=tn.nodeValue.replace(/[<«]\s*[<«]?\s*/g,''); }
    }
  }
  (window.bbEarly=window.bbEarly||[]).push(run);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  window.addEventListener('load',function(){ run(); setTimeout(function(){ run(); done=true; },1200); });
})();
