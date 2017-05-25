!function t (e, r, n) {
  function a (s, i) {
    if (!r[s]) {
      if (!e[s]) {
        var u = "function" == typeof require && require;
        if (!i && u)return u(s, !0);
        if (o)return o(s, !0);
        throw new Error("Cannot find module '" + s + "'")
      }
      var l = r[s] = {exports: {}};
      e[s][0].call(l.exports, function (t) {
        var r = e[s][1][t];
        return a(r ? r : t)
      }, l, l.exports, t, e, r, n)
    }
    return r[s].exports
  }

  for (var o = "function" == typeof require && require, s = 0; s < n.length; s++)a(n[s]);
  return a
}({
  1: [function (t, e, r) {
    "use strict";
    function n (t, e) {
      return t + Math.floor(Math.random() * (e - t + 1))
    }

    function a (t, e) {
      return n(1, e) <= t
    }

    function o (t, e) {
      var r;
      for (r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
      return t
    }

    function s (t, e) {
      return function (r) {
        return t.call(null, o(e, r || {}))
      }
    }

    function i (t) {
      var e = u.createElement("script");
      e.type = "text/javascript", e.async = !0, e.src = t, l.parentNode.insertBefore(e, l)
    }

    var u = document, l = u.getElementsByTagName("script")[0], c = function () {
    }, v = function (t) {
      return "function" == typeof t
    }, p = {base: 1e4}, f = {_config: p};
    f.load = function (t) {
      t = o({
        isLoadDevVersion: function () {
        }, dev: "", stable: "", grey: "", base: p.base
      }, t);
      var e, r = {};
      return t.ratio >= t.base || a(t.ratio, t.base) ? (e = t.grey, r.type = "grey") : (e = t.stable, r.type = "stable"), v(t.isLoadDevVersion) && t.isLoadDevVersion() && (e = t.dev, r.type = "dev"), r.url = e, v(t.before) && t.before(r), t.after = v(t.after) ? s(t.after, r) : c, i(e, t.after), this
    }, f.config = function (t) {
      return o(p, t || {}), this
    }, e.exports = f
  }, {}], 2: [function (t, e, r) {
    "use strict";
    function n (t, e) {
      return t && t.getAttribute ? t.getAttribute(e) || "" : ""
    }

    function a (t) {
      return s = s || document.getElementsByTagName("head")[0], i && !t ? i : s ? i = s.getElementsByTagName("meta") : []
    }

    function o (t) {
      var e, r, o, s = a(), i = s.length;
      for (e = 0; i > e; e++)r = s[e], n(r, "name") === t && (o = n(r, "content"));
      return o || ""
    }

    var s, i;
    r.tryToGetAttribute = n, r.getMetaTags = a, r.getMetaCnt = o, r.indexof = function (t, e) {
      for (var r = 0; r < t.length; r++)if (t[r] === e)return r;
      return -1
    };
    var u = function (t, e) {
      return t += "", t.length < e && (t = "0" + t), t
    };
    r.getDateMin = function () {
      var t = new Date, e = "";
      return e += t.getFullYear(), e += u(t.getMonth() + 1, 2), e += u(t.getDate(), 2), e += u(t.getHours(), 2), e += u(t.getMinutes(), 2)
    }
  }, {}], 3: [function (t, e, r) {
    "use strict";
    !function () {
      var e = t("../grey/util"), r = t("./for_aplus_fns"), n = {
        "aplus_o.js": {stable_version: {value: "7.4.3"}, grey_version: {value: "7.4.4"}, dev_version: {}},
        "aplus_std.js": {stable_version: {value: "7.4.3"}, grey_version: {value: "7.4.4"}, dev_version: {}},
        "aplus_int.js": {stable_version: {value: "7.4.3"}, grey_version: {value: "7.4.4"}, dev_version: {}},
        "aplus_wap.js": {stable_version: {value: "7.4.3"}, grey_version: {value: "7.4.4"}, dev_version: {}}
      }, a = window, o = "g_aplus_grey_launched";
      if (!a[o]) {
        a[o] = 1;
        var s = t("../grey/grey_publish"), i = location.protocol;
        0 != i.indexOf("http") && (i = "http:");
        var u = i + "//g.alicdn.com/alilog/s", l = r.getAplusVersion("aplus_std.js"), c = 1e4, v = [], p = {
          "aplus_std.js": [/^https?:\/\/(.*\.)?taobao\.com/i, /^https?:\/\/(.*\.)?tmall\.com/i, /^https?:\/\/(.*\.)?tmall\.hk/i],
          "aplus_wap.js": [/^https?:\/\/(.*\.)?mo\.m\.etao\.com/i, /^https?:\/\/(.*\.)?chaoshi\.m\.tmall\.com/i, /^https?:\/\/(.*\.)?xxx\.ju\.taobao\.com/i, /^https?:\/\/pages\.tmall\.com\/wh\/tmall\/import\/act\/mp-pc-2015/i, /^https?:\/\/pages\.tmall\.com\/wow\/jinkou\/act\/zhiying/i]
        }, f = function () {
          var t, e = n[l] || {}, r = e.dev_version || {};
          if (l && r.value) {
            var a, o = p[l] || [];
            for (a = 0; a < o.length; a++)if (location.href.match(o[a])) {
              t = !0;
              break
            }
          }
          return t
        }, g = function () {
          var t = "";
          if (v && v.length > 0)for (var r = e.getDateMin(), n = 0; n < v.length; n++) {
            var a = v[n].key + "";
            r >= a && (t = Math.floor(1e4 * v[n].value))
          }
          return t
        }, h = function (t, e) {
          var r;
          try {
            var n = parseInt(t.split(".")[0]);
            n > 7 ? r = 999 : 7 > n ? r = n : (r = t.replace(/\./g, ""), r = parseInt(r))
          } catch (a) {
            r = e
          } finally {
            return r
          }
        }, m = function (t) {
          var r = h(t, 736), n = e.getMetaCnt("aplus-auto-exp");
          return r >= 736 && n ? !0 : !1
        }, d = function (t) {
          var e = window.navigator.userAgent, r = h(t, 730);
          return r >= 730 && /WindVane/i.test(e) ? !0 : !1
        }, _ = function (t) {
          var e = [];
          d(t) && e.push("plugin/aplus_windvane2.js"), e.push(l), m(t) && e.push("plugin/aplus_ac.js");
          var r = [u, t].join("/") + "/??" + e.join(",");
          return r
        }, y = function () {
          var t, e = "aplus_grey_ratio";
          "number" == typeof a[e] && (t = Math.floor(1e4 * a[e]));
          var r = location.search.match(new RegExp("\\b" + e + "=([\\d\\.]+)"));
          return r && (r = parseFloat(r[1]), isNaN(r) || (t = Math.floor(1e4 * r))), t
        }, b = g(), j = y();
        b && (c = b), j && (c = j);
        var w = a.goldlog || (a.goldlog = {});
        w.record || (w.record = function (t, e, r, n) {
          (a.goldlog_queue || (a.goldlog_queue = [])).push({action: "goldlog.record", arguments: [t, e, r, n]})
        });
        var x = n[l];
        s.load({
          isLoadDevVersion: f,
          dev: _(x.dev_version.value),
          stable: _(x.stable_version.value),
          grey: _(x.grey_version.value),
          ratio: c,
          before: function (t) {
            switch (t.type) {
              case"grey":
                w.lver = x.grey_version.value;
                break;
              case"stable":
                w.lver = x.stable_version.value;
                break;
              case"dev":
                w.lver = x.dev_version.value
            }
          }
        })
      }
    }()
  }, {"../grey/grey_publish": 1, "../grey/util": 2, "./for_aplus_fns": 4}], 4: [function (t, e, r) {
    "use strict";
    var n = t("./util"), a = function () {
      return ["aplus_o.js", "aplus_std.js", "aplus_int.js", "aplus_wap.js"]
    };
    r.getAplusFns = a;
    var o = function () {
      for (var t, e = [{
        version: "aplus_o.js",
        domains: [/^https?:\/\/(.*\.)?youku\.com/i, /^https?:\/\/(.*\.)?tudou\.com/i, /^https?:\/\/(.*\.)?soku\.com/i, /^https?:\/\/(.*\.)?laifeng\.com/i]
      }, {
        version: "aplus_int.js",
        domains: [/^https?:\/\/(.*\.)?scmp\.com/i, /^https?:\/\/(.*\.)?luxehomes\.com\.hk/i, /^https?:\/\/(.*\.)?ays\.com\.hk/i, /^https?:\/\/(.*\.)?cpjobs\.com/i, /^https?:\/\/(.*\.)?educationpost\.com\.hk/i, /^https?:\/\/(.*\.)?elle\.com\.hk/i, /^https?:\/\/(.*\.)?harpersbazaar\.com\.hk/i, /^https?:\/\/(.*\.)?esquirehk\.com/i]
      }], r = 0; r < e.length; r++)for (var n = e[r].domains, a = e[r].version, o = 0; o < n.length; o++)if (location.href.match(n[o])) {
        t = a;
        break
      }
      return t
    }, s = function () {
      var t = n.getMetaCnt("aplus-version");
      t && (t += ".js");
      var e = a();
      return n.indexof(e, t) > -1 ? t : null
    }, i = function () {
      try {
        for (var t = document, e = t.getElementsByTagName("script"), r = 0; r < e.length; r++) {
          var n = e[r].getAttribute("src");
          if (/alilog\/mlog\/aplus_\w+\.js/.test(n) || /alicdn\.com\/js\/aplus_\w+\.js/.test(n))return n
        }
        return ""
      } catch (a) {
        return ""
      }
    }, u = function () {
      var t = "";
      try {
        var e = document, r = e.getElementById("tb-beacon-aplus") || e.getElementById("beacon-aplus");
        if (r && (t = r.getAttribute("src")), t || (t = i()), t) {
          var n = t.match(/aplus_\w+\.js/);
          "object" == typeof n && n.length > 0 && (t = n[0])
        }
      } catch (a) {
        t = ""
      } finally {
        return t
      }
    };
    r.getAplusVersion = function (t) {
      var e;
      try {
        e = t;
        var r = u();
        r && (e = r);
        var n = o();
        n && (e = n);
        var a = s();
        a && (e = a), "aplus_v2.js" === e && (e = "aplus_std.js")
      } catch (i) {
        e = "aplus_std.js"
      } finally {
        return e
      }
    }
  }, {"./util": 5}], 5: [function (t, e, r) {
    e.exports = t(2)
  }, {}]
}, {}, [3]);