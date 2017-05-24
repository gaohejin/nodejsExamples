(function (config) {
  var ba = navigator.userAgent.toLowerCase(), da = window, ea = document, ja = ea.documentElement;

  function e (a) {
    return -1 !== ba.indexOf(a)
  }

  var ka = /([a-z0-9]*\d+[a-z0-9]*)/;

  function la () {
    var a = ma;
    if (!a)return null;
    var a = a.toLowerCase(), b = null;
    if (b = a.match(/angle \((.*)\)/)) a = b[1], a = a.replace(/\s*direct3d.*$/, "");
    a = a.replace(/\s*\([^\)]*wddm[^\)]*\)/, "");
    if (0 <= a.indexOf("intel")) {
      b = ["Intel"];
      0 <= a.indexOf("mobile") && b.push("Mobile");
      (0 <= a.indexOf("gma") || 0 <= a.indexOf("graphics media accelerator")) && b.push("GMA");
      if (0 <= a.indexOf("haswell")) b.push("Haswell"); else if (0 <= a.indexOf("ivy")) b.push("HD 4000"); else if (0 <= a.indexOf("sandy")) b.push("HD 3000"); else if (0 <= a.indexOf("ironlake")) b.push("HD");
      else {
        0 <= a.indexOf("hd") && b.push("HD");
        var c = a.match(ka);
        c && b.push(c[1].toUpperCase())
      }
      return b = b.join(" ")
    }
    return 0 <= a.indexOf("nvidia") || 0 <= a.indexOf("quadro") || 0 <= a.indexOf("geforce") || 0 <= a.indexOf("nvs") ? (b = ["nVidia"], 0 <= a.indexOf("geforce") && b.push("geForce"), 0 <= a.indexOf("quadro") && b.push("Quadro"), 0 <= a.indexOf("nvs") && b.push("NVS"), a.match(/\bion\b/) && b.push("ION"), a.match(/gtx\b/) ? b.push("GTX") : a.match(/gts\b/) ? b.push("GTS") : a.match(/gt\b/) ? b.push("GT") : a.match(/gs\b/) ? b.push("GS") : a.match(/ge\b/) ?
      b.push("GE") : a.match(/fx\b/) && b.push("FX"), (c = a.match(ka)) && b.push(c[1].toUpperCase().replace("GS", "")), 0 <= a.indexOf("titan") ? b.push("TITAN") : 0 <= a.indexOf("ti") && b.push("Ti"), b = b.join(" ")) : 0 <= a.indexOf("amd") || 0 <= a.indexOf("ati") || 0 <= a.indexOf("radeon") || 0 <= a.indexOf("firegl") || 0 <= a.indexOf("firepro") ? (b = ["AMD"], 0 <= a.indexOf("mobil") && b.push("Mobility"), c = a.indexOf("radeon"), 0 <= c && b.push("Radeon"), 0 <= a.indexOf("firepro") ? b.push("FirePro") : 0 <= a.indexOf("firegl") && b.push("FireGL"), 0 <= a.indexOf("hd") &&
    b.push("HD"), 0 <= c && (a = a.substring(c)), (c = a.match(ka)) && b.push(c[1].toUpperCase().replace("HD", "")), b = b.join(" ")) : a.substring(0, 100)
  }

  var na = "microsoft basic render driver;vmware svga 3d;Intel 965GM;Intel B43;Intel G41;Intel G45;Intel G965;Intel GMA 3600;Intel Mobile 4;Intel Mobile 45;Intel Mobile 965".split(";"),
    pa = "ActiveXObject" in da,
    qa = "devicePixelRatio" in da && 1 < da.devicePixelRatio || pa && "matchMedia" in da && da.matchMedia("(min-resolution:144dpi)") && da.matchMedia("(min-resolution:144dpi)").matches,
    sa = e("windows nt"), ua = -1 !== ba.search(/windows nt [1-5]\./), va = -1 !== ba.search(/windows nt 5\.[12]/),
    wa = ua && !va;
  e("windows nt 10");
  var xa = e("windows phone"), ya = e("macintosh"), za = e("Mb2345Browser"), Aa = e("ipad;") || e("ipad "),
    Ba = Aa && qa, Ca = e("ipod touch;"), Da = e("iphone;") || e("iphone "), Ea = Da || Aa || Ca,
    Ga = Ea && -1 !== ba.search(/ os [456]_/);
  Ea && ba.search(/ os [4-8]_/);
  var Ha = Ea && -1 !== ba.search(/ os [78]_/);
  Ea && e("os 8_");
  var Ia = Ea && e("os 10_"), La = e("android"), Ma = -1 !== ba.search(/android [123]/), Na = e("android 4");
  La && -1 === ba.search(/android [1-4]/) || ba.search(/android 4.4/);
  var Oa = La ? "android" : Ea ? "ios" : sa ? "windows" : ya ? "mac" : "other", Pa = pa && !da.XMLHttpRequest,
    Qa = pa && !ea.querySelector, Ra = pa && !ea.addEventListener, Sa = pa && e("ie 9"), Ta = pa && e("msie 10"),
    Ua = pa && e("rv:11"), Wa = e("alipay") || La && Va, Xa = e("edge"), Ya = e("qtweb"), Va = e("ucbrowser"),
    Za = e("miuibrowser"), $a = e("micromessenger"), ab = e("mqqbrowser"), bb = e("baidubrowser"),
    chrome = (e("chrome") || e("crios")) && !$a && !bb && !ab && !Xa && !Za, cb = chrome && e("chromium"),
    db = chrome && !cb && 30 < parseInt(ba.split("chrome/")[1]), eb = e("firefox"), fb = eb &&
      27 < parseInt(ba.split("firefox/")[1]), gb = (ya || Ea) && e("safari") && e("version/"),
    hb = ya && gb && 7 < parseInt(ba.split("version/")[1]), ib = Ea && e("aliapp"),
    jb = Ea && (!ab && !Va && !$a && !chrome && !eb && !gb || ib), kb = La || Ea || xa || e("mobile"),
    lb = da.navigator && da.navigator.msPointerEnabled && !!da.navigator.msMaxTouchPoints,
    mb = da.navigator && da.navigator.pointerEnabled && !!da.navigator.maxTouchPoints, nb = mb || lb,
    ob = "ontouchstart" in ea || nb, pb = function () {
      if (!kb)return da.devicePixelRatio || 1;
      var a = document.getElementsByTagName("meta");
      if (window.parent && window.parent !== window)try {
        if (window.parent.location.origin == window.location.origin) a = window.parent.document.getElementsByTagName("meta"); else return 1
      } catch (b) {
        return 1
      }
      for (var c = a.length - 1; 0 <= c; c--)if ("viewport" === a[c].name) {
        var c = a[c].content, d;
        -1 !== c.indexOf("initial-scale") && (d = parseFloat(c.split("initial-scale=")[1]));
        a = -1 !== c.indexOf("minimum-scale") ? parseFloat(c.split("minimum-scale=")[1]) : 0;
        c = -1 !== c.indexOf("maximum-scale") ? parseFloat(c.split("maximum-scale=")[1]) : Infinity;
        if (d) {
          if (c >= a)return d > c ? c : d < a ? a : d
        } else if (c >= a)return 1 <= a ? 1 : Math.min(c, 1);
        console && console.log && console.log("viewport\u53c2\u6570\u4e0d\u5408\u6cd5");
        return null
      }
    }(), qb = qa && (!kb || !!pb && 1 <= pb), rb = pa && "transition" in ja.style,
    sb = !!ea.createElementNS && !!ea.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
    vb = ea.createElement("canvas"), wb = !(!vb || !vb.getContext), xb = window.URL || window.webkitURL,
    yb = !pa && !(Va && La) && window.Worker && xb && xb.createObjectURL && window.Blob, zb = "", ma = "", Ab = 0,
    Bb = {
      alpha: !0,
      antialias: !0, depth: !1, failIfMajorPerformanceCaveat: !0, preserveDrawingBuffer: !0, stencil: !1
    }, Cb = function () {
      if (!wb || !yb || jb)return !1;
      for (var a = ["webgl", "experimental-webgl", "moz-webgl"], b = null, c = 0; c < a.length; c += 1) {
        try {
          b = vb.getContext(a[c], Bb)
        } catch (d) {
        }
        if (b) {
          if (b.drawingBufferWidth !== vb.width || b.drawingBufferHeight !== vb.height)break;
          if (!b.getShaderPrecisionFormat || !b.getParameter || !b.getExtension)break;
          Ab = b.getParameter(b.MAX_RENDERBUFFER_SIZE);
          var f = b.getParameter(b.MAX_VIEWPORT_DIMS);
          if (!f)break;
          Ab =
            Math.min(Ab, f[0], f[1]);
          gb && "mac" == Oa && (Ab = Math.min(Ab, 4096));
          f = Math.max(screen.width, screen.height);
          qb && (f *= Math.min(2, window.devicePixelRatio || 1));
          if (f > Ab)break;
          if (23 > b.getShaderPrecisionFormat(35632, 36338).precision || 23 > b.getShaderPrecisionFormat(35633, 36338).precision)break;
          ma = b.getExtension("WEBGL_debug_renderer_info") ? b.getParameter(37446) : null;
          if ((b = la()) && -1 !== na.indexOf(b))break;
          zb = a[c];
          return !0
        }
      }
      return !1
    }(), Db = Cb && !kb && (db || fb || hb) && ("mac" == Oa || "windows" == Oa), Eb = !wb || Ya || xa || kb && eb || Sa ||
      Ga || Ba || Ca || Ma || e("gt-n710") || wa, Fb = !Eb && !Db && (Na || Ha || Ea && $a || !kb),
    Gb = Db ? "vw" : Eb ? "d" : Fb ? "dv" : "v", Hb = e("webkit"),
    Ib = "WebKitCSSMatrix" in da && "m11" in new window.WebKitCSSMatrix, Jb = "MozPerspective" in ja.style,
    Kb = "OTransition" in ja.style, Lb = rb || Ib || Jb || Kb, Mb = void 0 !== config[8] ? config[8] : !0,
    Nb = void 0 !== config[9] ? config[9] : !0, Ob = void 0 !== config[10] ? config[10] : !0, Pb = !sb && kb && wb,
    Qb = !1;
  try {
    Qb = "undefined" !== typeof da.localStorage
  } catch (Rb) {
  }
  config.j = {
    size: Da ? 100 : La ? 200 : 400,
    su: ya,
    u7: sa,
    oK: Ea,
    qZ: Ia,
    xg: La,
    i4: Ma,
    mJ: Wa,
    ar: Oa,
    Xy: bb,
    s6: ab,
    rM: gb,
    M2: $a,
    Sn: pa,
    Eg: Pa,
    Jq: Qa,
    C5: Sa,
    cZ: Ta,
    ed: Ra,
    eZ: pa && !Ua,
    WZ: za,
    ru: Qb,
    geolocation: kb || pa && !Ra || Xa,
    qC: Va && !chrome,
    chrome: chrome,
    Cz: qa && chrome,
    hJ: eb,
    V: kb,
    b6: kb && Hb,
    $Z: kb && Ib,
    a6: kb && da.opera,
    Sc: qa,
    xC: pb,
    oa: qb,
    ud: ob,
    f_: lb,
    ML: mb,
    NL: nb,
    FW: 57 <= parseInt(ba.split("chrome/")[1]),
    K2: Hb,
    B5: rb,
    L2: Ib,
    U4: Jb,
    g6: Kb,
    MV: Lb,
    gj: sb,
    Oq: wb,
    AK: yb,
    Av: Ob,
    pW: Cb,
    Vn: Db,
    H2: zb,
    I2: Bb,
    RJ: ma,
    VZ: Ab,
    a3: !1,
    WX: Mb,
    cf: Mb && !Eb,
    ZV: Mb ? Gb : "d",
    Wn: Nb &&
    !!da.WebSocket && !bb,
    e6: Pb,
    E_: wb || Pb ? "c" : "d"
  };
  var da = window,
    Sb = {overlay: ["style"], "AMap.IndoorMap": ["AMap.CustomLayer", "cvector"], "AMap.MarkerList": ["AMap.TplUtils"]},
    Tb = "http map anip layers overlay0 brender mrender".split(" ");
  config.Fd = "main";
  config.j.ud && (Tb += ",touch", config.Fd += "t");
  config.j.V || (Tb += ",mouse", config.Fd += "m");
  config.Fd += "c";
  config.j.cf && (config.Fd += "v", Tb += ",vectorlayer,overlay", config.j.Vn ? (config.Fd += "w", Tb += ",wgl") : (config.Fd += "cg", Tb += ",cmng,cgl"));
  if (config[7]) {
    for (var Ub = [], Vb = config[7].split(","), V = 0; V < Vb.length; V += 1) {
      var Wb = Vb[V];
      Sb[Wb] && Ub.push.apply(Ub, Sb[Wb]);
      Ub.push(Wb)
    }
    Tb += "," + Ub.join(",");
    config.Fd += config[7].replace(",", "").replace(eval("/AMap./gi"), "")
  }
  config.En = Sb;
  Tb += ",sync";
  config.fN = Tb.split(",");
  window.AMap = window.AMap || {};
  window.AMap.Ai = "1.3.27.5";
  var Xb = window.AMap.wC = {}, Yb = config[2].split(",")[0], Zb = Yb + "/theme/v" + config[4] + "/style1.3.27.5.css",
    $b = document.head || document.getElementsByTagName("head")[0];
  if ($b) {
    var nc = document.createElement("link");
    nc.setAttribute("rel", "stylesheet");
    nc.setAttribute("type", "text/css");
    nc.setAttribute("href", Zb);
    $b.insertBefore(nc, $b.firstChild)
  } else document.write("<link rel='stylesheet' href='" + Zb + "'/>");
  function oc (a) {
    var b = document, c = b.createElement("script");
    c.charset = "utf-8";
    c.src = a;
    (a = b.body || $b) && a.appendChild(c)
  }

  function pc () {
    // for (var a = Yb + "/maps/main?v=" + config[4] + "&key=" + config[0] + "&m=" + config.fN.join(",") + "&vrs=1.3.27.5", b = document.getElementsByTagName("script"), c, d = 0; d < b.length; d += 1)if (0 === b[d].src.indexOf(Yb.split(":")[1] + "/maps?")) {
    //   c = b[d];
    //   break
    // }
    var a = './script/main.js'
    config[5] || c && c.async ? oc(a) : (document.write('<script id="amap_main_js" src=\'' + a + "' type='text/javascript'>\x3c/script>"), setTimeout(function () {
      document.getElementById("amap_main_js") || oc(a)
    }, 1))
  }

  var qc = (new Date).getTime();
  Xb.__load__ = function (a) {
    a(config, qc);
    Xb.__load__ = null
  };
  try {
    if (window.localStorage) {
      var rc = window.localStorage["_AMap_" + config.Fd], sc = !1;
      rc ? (rc = JSON.parse(rc), rc.version === window.AMap.Ai ? (eval(rc.script), Xb.loaded = !0) : sc = !0) : sc = !0;
      if (sc)for (V in window.localStorage)window.localStorage.hasOwnProperty(V) && 0 === V.indexOf("_AMap_") && window.localStorage.removeItem(V)
    }
  } catch (tc) {
  }
  Xb.loaded || (pc(), config.fN = void 0);
})(["bfe31f4e0fb231d29e1d3ce951e2c780", [115.423411, 39.442758, 117.514625, 41.060816, 116.405285, 39.904989], "http://webapi.amap.com", 1, "1.3", null, "110000", "", true, true, true])