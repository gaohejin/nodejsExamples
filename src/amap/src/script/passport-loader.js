!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.passport = e() : t.passport = e()
}(this, function () {
  return function (t) {
    function e (n) {
      if (o[n])return o[n].exports;
      var a = o[n] = {exports: {}, id: n, loaded: !1};
      return t[n].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
    }

    var o = {};
    return e.m = t, e.c = o, e.p = "//a.amap.com/lbs-p/static/", e(0)
  }([function (t, e, o) {
    "use strict";
    function n (t, e, o) {
      var n = document.createElement("script");
      n.type = "text/javascript", n.chartset = "UTF-8", n.readyState ? n.onreadystatechange = function () {
        "loaded" != n.readyState && "complete" != n.readyState || (n.onreadystatechange = null, e && e())
      } : (n.onload = function () {
        e && e()
      }, n.onerror = function () {
        o && o()
      }), n.src = t, document.getElementsByTagName("head")[0].appendChild(n)
    }

    var a = "".trim(), s = a ? "-" + a : "", r = "//a.amap.com/lbs-p/static/js/passport" + s, p = window.passport || {},
      c = void 0;
    p.load = function (t) {
      c = t, p.show && c && c()
    }, n("//a.amap.com/lbs-p/static/js/version" + s + ".js?" + Date.now(), function () {
      window._passport_version && (r += "-" + _passport_version + ".js", delete window._passport_version), n(r, function () {
        c && c()
      })
    }, function () {
      n(r, function () {
        c && c()
      })
    }), t.exports = p
  }])
});