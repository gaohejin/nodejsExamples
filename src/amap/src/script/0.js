webpackJsonp([0], {
  17: function (t, e, a) {
    (function (e, a) {
      var i = {
        isLegalNamePoint: function (t) {
          if (e.isObject(t))return !0
        }, isEmptyName: function (t) {
          if (e.isObject(t) && !e.isEmpty(t.name))return !0
        }, isShowHistory: function (t) {
          if (e.isObject(t) && (!e.isEmpty(t.name) || !e.isEmpty(t.lnglat)))return !0
        }, isLegalLnglatPoint: function (t) {
          if (e.isObject(t) && !e.isEmpty(t.lnglat))return !0
        }, isLegalPoint: function (t) {
          if (e.isObject(t) && !e.isEmpty(t.lnglat))return !0
        }, isPointEqual: function (t, a) {
          if (e.isEmpty(t) || e.isEmpty(a))return !(!e.isEmpty(t) || !e.isEmpty(a));
          var i = t.name, n = a.name, r = t.lnglat, o = a.lnglat, s = t.modxy, l = t.modxy, p = t.id, c = a.id,
            d = "false" != t.adcode && t.adcode;
          return adcode2 = "false" != a.adcode && a.adcode, i == n && r == o && s == l && p == c && d == adcode2
        }, isViaEqual: function (t, i) {
          var n = this;
          if (e.isEmpty(t) && e.isEmpty(i))return !0;
          var r = [];
          if (a.each(t, function (t, a) {
              e.isEmpty(a) || r.push(a)
            }), r.length != i.length)return !1;
          for (var o = 0; o < r.length; o++) {
            var s = n.isPointEqual(r[o], i[o]);
            if (!s)break
          }
          return !0
        }, isDirEqual: function (t, a) {
          var i = this;
          if (!t || !a)return !1;
          var n = t.from || "", r = t.to || "", o = a.from || "", s = a.to || "", l = t.via, p = a.via,
            c = t.type || "car", d = a.type || "car", u = t.policy || "", m = a.policy || "", h = t.dateTime || "",
            f = a.dateTime || "";
          return e.isEmpty(t.via) && (l = []), e.isEmpty(a.via) && (p = []), !!(i.isPointEqual(n, o) && i.isPointEqual(r, s) && i.isViaEqual(l, p)) && c == d && u == m && h == f
        }
      };
      t.exports = i
    }).call(e, a(5), a(1))
  }, 30: function (t, e, a) {
    (function (e) {
      var a = {
        formatDistance: function (t) {
          return t = new Number(t).toFixed(2), t < 1e3 ? parseInt(t) + "米" : (t / 1e3).toFixed(1) + "公里"
        }, parseRoutes: function (t) {
          var e = [];
          t = t.path ? [t.path] : t;
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            e[a] = {
              steps: this._parseStep(i.steps),
              distance: this._parseInt(i.distance),
              time: this._parseInt(i.time),
              policy: i.policy,
              tolls: this._parseInt(i.tolls),
              tolls_distance: this._parseInt(i.toll_distance)
            }
          }
          return e
        }, parseStep: function (t) {
          for (var e = [], a = 0; a < t.length; a++) {
            var i = t[a], n = i.path;
            e[a] = {
              start_location: n[0],
              end_location: n[n.length - 1],
              instruction: this._parseString(i.instruction),
              orientation: this._parseString(i.orientation),
              road: this._parseString(i.road),
              distance: this._parseInt(i.distance),
              tolls: this._parseInt(i.tolls),
              toll_distance: this._parseInt(i.toll_distance),
              toll_road: this._parseString(i.toll_road),
              time: this._parseInt(i.time),
              path: n,
              action: this._parseString(i.action),
              assistant_action: this._parseString(i.assistant_action)
            }
          }
          return e
        }, str2LngLat: function (t) {
          var e = t.split(",");
          return new AMap.LngLat(e[0], e[1])
        }, multi2Lnglat: function (t) {
          for (var e = [], a = t.split(";"), i = 0; i < a.length; i++)e[i] = this._str2LngLat(a[i]);
          return e
        }, multiStr2Lnglat: function (t) {
          var e = [];
          if (t)for (var a = t.split(","), i = 0; i < a.length - 1; i += 2)e.push(new AMap.LngLat(a[i], a[i + 1]));
          return e
        }, multiStr2LnglatCar: function (t) {
          var a = [];
          if (t) {
            var i = t;
            e.isArray(t) || (i = JSON.parse(t));
            for (var n = 0; n < i.length - 1; n += 2)a.push(new AMap.LngLat(i[n], i[n + 1]))
          }
          return a
        }, parseString: function (t) {
          var e = "object" == typeof t || "undefined" == typeof t ? "" : t;
          return e
        }, parseInt: function (t) {
          var e = parseInt(t, 10);
          return isNaN(e) ? 0 : e
        }, formatTime: function (t) {
          if (!t || "0" == t)return "";
          if (t /= 60, t <= 60)return parseInt(Math.ceil(t)) + "分钟";
          var e = Math.floor(t / 60) + "小时";
          return t % 60 !== 0 && (0 === Math.floor(t % 60) || (e += Math.floor(t % 60) + "分钟")), e
        }, formatTimeByMinute: function (t) {
          if (!t || "0" == t)return "";
          var t = Number(t);
          return t / 60 > 1 ? Math.floor(t / 60) + "小时" + t % 60 + "分钟" : t % 60 + "分钟"
        }, formatTime2Day: function (t) {
          if (!t || "0" == t)return "";
          var t = t.split(":"), e = t[0] - 0;
          minites = t[1];
          var a = ~~(e / 24), i = e % 24;
          return i < 10 && (i = "0" + i), a = a > 0 ? "第" + (a + 1) + "天" : "", a + i + ":" + minites
        }, formatCost: function (t) {
          return t && "0" != t ? parseInt(t) + "元" : ""
        }, getCurTime: function () {
          var t = new Date, e = t.getFullYear(), a = t.getMonth() + 1, i = t.getDate(), n = t.getHours(),
            r = t.getMinutes().toString();
          return 1 == r.length && (r = "0" + r), {date: e + "-" + a + "-" + i, time: n + "-" + r}
        }, color2rgb: function (t) {
          var e = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
          if (t && e.test("#" + t)) {
            t = "#" + t.toLowerCase();
            for (var a = [], i = 1; i < 7; i += 2)a.push(parseInt("0x" + t.slice(i, i + 2)));
            return a.join(",")
          }
        }
      };
      t.exports = a
    }).call(e, a(1))
  }, 32: function (t, e, a) {
    (function (e, i, n) {
      var r = a(17), o = a(44), s = a(7), l = {
        submitTxt: {car: "开车去", bus: "坐公交", walk: "走路去"}, init: function () {
          var t = this;
          t.initDirSug(), t.initLoc(), t.initTooltips(), t.bindEvent()
        }, bindEvent: function () {
          var t = this, a = e("#planForm"), n = e(".dirtips");
          a.on("click", ".palntype_tab", function () {
            var a = e(this).data("type");
            amap.dirnew.type != a && (i.trace({
              type: "event",
              category: "dir",
              action: "click",
              label: a
            }), t.typeTab(a))
          }), a.on("input", ".dir_ipt", function () {
            var a = e(this), i = a.val(), n = a.attr("dirtype");
            e(".dirtips_item").hide(), i && i.length > 0 ? (a.closest(".line_serch_ipt").find(".del-item").show(), e(".dirSug").show()) : (a.closest(".line_serch_ipt").find(".del-item").hide(), t.showMylocSug(n))
          }), a.on("click", ".del-item", function () {
            var a = e(this);
            t.deleIpt(a)
          }), a.on("focus", ".dir_ipt", function () {
            t.focusIpt(e(this))
          }), a.on("blur", ".dir_ipt", function () {
            t.blurIpt(e(this))
          }), a.on("keydown", ".dir_ipt", function (e) {
            if (13 == e.keyCode)return void t.submitDir()
          }), a.on("click", "#dir_exchange", function () {
            t.exchange()
          }), a.on("click", "#via_add", function () {
            t.addVia()
          }), a.on("click", ".via_dele", function () {
            var a = e(this).closest(".line_serch_ipt").index();
            t.deleVia(a)
          }), a.on("click", ".dir_submit", function () {
            t.submitDir()
          }), a.on("click", ".dir_close", function () {
            t.closeDir()
          }), a.on("click", ".line-search-clear", function () {
            t.clearDir()
          }), n.on("mousedown", ".dirlocSug", function () {
            t.selecLoc()
          }), watch(amap, "adcode", function (e, a, i, n) {
            i !== n && t.initDirSug()
          })
        }, initTooltips: function () {
          e(".icondirtip").jBox("Tooltip", {
            animation: "move",
            closeOnClick: !0,
            addClass: "customTips",
            theme: "TooltipDark",
            offset: {y: 4}
          })
        }, initLoc: function () {
          var t = this;
          if ((!amap.dirnew.from || !amap.dirnew.from.name || "" == amap.dirnew.from.name) && amap.loc && "1" == amap.loc.code) {
            e("#dir_from_ipt").val("我的位置"), t.focusIpt(e("#dir_from_ipt"));
            var a = amap.loc;
            amap.dirnew.from = {
              name: "我的位置",
              id: "dirmyloc",
              adcode: amap.adcode,
              poitype: "",
              lnglat: a.lng + "," + a.lat,
              modxy: a.lng + "," + a.lat
            }
          }
        }, freshScroll: function () {
          var t = e("#planlist_wrap"), a = e("#planForm").height() + 82;
          t.length > 0 && (t.css("max-height", amap.panel.height - a), t.perfectScrollbar("update"));
          var i = e(".expand-content");
          if (i.length > 0) {
            var n = i.closest(".choose-poi-list");
            o.initScroll(n)
          }
        }, refill: function (t) {
          var a = this, i = t.from, o = t.to, s = t.via, l = t.type;
          if (e(".palntype_tab").removeClass("current"), e("#" + l + "Tab").addClass("current"), e(".dir_submit").text(a.submitTxt[l]), r.isEmptyName(i) && (e("#dir_from_ipt").val(i.name), e(".line-search-from").addClass("active").find(".del-item").show()), r.isEmptyName(o) && (e("#dir_to_ipt").val(o.name), e(".line-search-to").addClass("active").find(".del-item").show()), n.isArray(s)) {
            var p = s.length, c = e(".line-search-point").length;
            p == c ? n.each(s, function (t, a) {
              r.isEmptyName(t) && (e(".line-search-point").eq(a).find(".dir_ipt").val(t.name), e(".line-search-point").eq(a).find(".del-item").show())
            }) : (e(".passList").html(""), n.each(s, function (t, e) {
              r.isEmptyName(t) && a.addVia(t.name)
            }))
          }
          "car" != l ? e(".passList,#via_add").hide() : e(".passList,#via_add").show();
          var p = e(".line-search-point").length;
          p > 2 && e("#via_add").hide()
        }, typeTab: function (t) {
          var a = this, i = e("#dir_from_ipt").val(), n = e("#dir_to_ipt").val(), r = amap.dirnew;
          e(".palntype_tab").removeClass("current"), e("#" + t + "Tab").addClass("current"), r.type = t, "car" != t ? (e(".passList, #via_add").hide(), r.policy = "0") : (e(".passList, #via_add").show(), r.policy = "1"), r.dateTime = "now", e(".dir_submit").html(a.submitTxt[t]), i != (r.from && r.from.name) && (r.from = {}, r.from.name = i, amap.dirReady.from = !1), n != (r.to && r.to.name) && (r.to = {}, r.to.name = n, amap.dirReady.to = !1), a.redir()
        }, redir: function () {
          amap.dirReady.from && amap.dirReady.to && amap.dirReady.via ? amap.dirfwd("/dir?" + e.param(amap.dirnew)) : amap.dirfwd("/dir")
        }, focusIpt: function (t) {
          var e = this, a = t.closest(".line_serch_ipt");
          a.addClass("active");
          var i = t.attr("dirtype");
          if ("" == t.val())if ("via" == i) {
            var n = a.index();
            e.showMylocSug(i, n)
          } else e.showMylocSug(i)
        }, blurIpt: function (t) {
          var e = this, a = t.val();
          a && 0 != a.length || t.closest(".line_serch_ipt").removeClass("active"), e.hideMylocSug()
        }, deleIpt: function (t) {
          t.hide();
          var e = t.closest(".line_serch_ipt"), a = e.find(".dir_ipt");
          a.val(""), e.closest(".line_serch_ipt").removeClass("active")
        }, clearIpt: function () {
          e("#dir_from_ipt").val("").closest(".line_serch_ipt").removeClass("active").find(".del-item").hide(), amap.dirnew.from = {}, amap.dirReady.from = !1, e("#dir_to_ipt").val("").closest(".line_serch_ipt").removeClass("active").find(".del-item").hide(), amap.dirnew.to = {}, amap.dirReady.to = !1, e("#via_add").show(), e("#passList").html(""), amap.dirnew.via = [], amap.dirReady.via = !1, e(".line-search-clear").addClass("none"), amap.directionClone = {}, delete amap.dirnew.dateTime
        }, selecLoc: function () {
          var t = this;
          if (amap.loc && "1" == amap.loc.code) {
            var a = e(".dirlocSug"), i = a.attr("type"), n = "", r = null, o = amap.loc, s = {
              name: "我的位置",
              id: "dirmyloc",
              adcode: amap.adcode,
              poitype: "",
              lnglat: o.lng + "," + o.lat,
              modxy: o.lng + "," + o.lat
            };
            "via" == i ? (n = a.attr("index"), r = e(".line-search-point").eq(n), amap.dirnew.via[n] = s) : (r = e(".line-search-" + i), amap.dirnew[i] = s);
            var l = r.find(".dir_ipt");
            l.val("我的位置"), r.find(".del-item").show(), t.submitDir()
          }
        }, initDirSug: function () {
          var t = this;
          e(".dir_ipt").autocomplete({
            appendTo: e(".dirSug"),
            serviceUrl: amap.service.poiTipslite,
            paramName: "words",
            params: {city: amap.adcode || "110000", type: "dir"},
            dataType: "json",
            width: 360,
            maxHeight: 550,
            containerClass: "autocomplete-suggestions planform-suggestion",
            onSelect: function (a) {
              a = a.data;
              var i = e(this).attr("dirtype").split("-")[0], n = null;
              if (n = a && a.lnglat && a.lnglat.length > 5 ? {
                  id: a.id,
                  name: a.name,
                  lnglat: a.lnglat,
                  modxy: a.modxy,
                  poitype: a.category || "",
                  adcode: a.adcode
                } : {name: a.name}, "via" !== i) amap.dirnew[i] = n; else {
                var r = e(this).closest(".line-search-point").index();
                amap.dirnew.via[r] = n
              }
              t.submitDir()
            },
            transformResult: function (t) {
              var e = {suggestions: []};
              if ("1" != t.status)return e;
              for (var a = t.data && t.data.tip_list || [], i = 0; i < a.length; i++) {
                var n = a[i].tip, r = (n.datatype, "");
                r = "1" !== n.ignore_district ? n.district : "", r += "" !== n.terminals ? n.terminals : n.address, r += " ", e.suggestions.push({
                  value: n.name,
                  data: n,
                  address: r,
                  district: n.district,
                  adcode: n.adcode,
                  datatype_spec: n.datatype_spec
                })
              }
              return e
            }
          })
        }, exchange: function () {
          var t = this, a = e("#dir_from_ipt"), i = e("#dir_to_ipt"), r = amap.dirnew, o = e.extend(!0, {}, r.from),
            s = e.extend(!0, {}, r.to), l = a.val(), p = i.val(), c = e.extend(!0, {}, r.from),
            d = e.extend(!0, {}, r.to);
          o.name && o.name != l && (c = {}), s.name && s.name != p && (d = {}), r.from = d, r.to = c, a.val(p), i.val(l), e(".line_serch_ipt").removeClass("active").find(".del-item").hide(), "" != l && e("#dir_to_ipt").closest(".line_serch_ipt").addClass("active").find(".del-item").show(), "" != p && e("#dir_from_ipt").closest(".line_serch_ipt").addClass("active").find(".del-item").show(), n.isEmpty(d) || n.isEmpty(c) || t.redir()
        }, addVia: function (t) {
          var a = this,
            i = e('<p class="line_serch_ipt line-search-point none"><label>经 </label><input type="text" class="dir_ipt" dirtype="via" placeholder="请输入途经点"/><span class="del-item"></span><a class="via_dele icon-reduce"></a></p>');
          e(".passList").append(i), i.slideDown(function () {
            amap.dirp && a.freshScroll()
          }).removeClass("none"), t && "" != t && (i.find(".dir_ipt").val(t), i.addClass("active"), i.find(".del-item").show());
          var n = e(".line-search-point").length;
          n > 2 && e("#via_add").hide(), e("#via_add").addClass("active"), a.initDirSug()
        }, deleVia: function (t) {
          e("#via_add").show();
          var a = e(".line-search-point"), i = amap.dirnew, n = a.eq(t).closest(".line_serch_ipt");
          n.slideUp(function () {
            n.remove();
            var a = e(".line-search-point"), r = e("#viaPoiList" + t);
            a.length < i.via.length && amap.dirnew.via.splice(t, 1), (amap.dirp || r.html().length > 0) && amap.dirfwd("/dir"), 0 == a.length && e("#via_add").removeClass("active")
          })
        }, submitDir: function () {
          var t = this, a = amap.dirnew, i = e(".dir_ipt"), r = null, o = null, l = [], p = 0, c = 1;
          if (e.each(i, function (a, i) {
              var i = e(i), n = i.attr("dirtype").split("-")[0];
              if ("from" == n) r = i.val(); else if ("to" == n) o = i.val(); else if ("via" == n) {
                var s = i.val();
                if (s && "" != s) l.push(i.val()); else {
                  var a = e(i).closest(".line_serch_ipt").index();
                  t.deleVia(a)
                }
              }
            }), "我的位置" != r && r != (a.from && a.from.name) ? (a.from = {}, c = c && 0) : c = c && 1, r && (a.from.name = r), "我的位置" != o && o != (a.to && a.to.name) ? (a.to = {}, c = c && 0) : c = c && 1, o && (a.to.name = o), n.isEmpty(l) || e.each(l, function (t, e) {
              "我的位置" != e && e != (a.via[t] && a.via[t].name) ? (a.via[t] = {}, c = c && 0) : c = c && 1, a.via[t].name = e
            }), !r || "" == r)return void e("#dir_from_ipt").focus();
          if (!o || "" == o)return void e("#dir_to_ipt").focus();
          if (r == o)return void s.warning("起点不能与终点相同", "", {positionClass: "toast-top-center"});
          if (!n.isEmpty(l))for (var d = 0; d < l.length; d++)if (l[d] == r || l[d] == o)return s.warning("途经点不能与起点或终点相同", "", {positionClass: "toast-top-center"}), void e(".line-search-point").eq(d).find(".dir_ipt").focus();
          p || c ? (amap.directionClone = {}, t.redir()) : t.doDir()
        }, doDir: function () {
          var t = amap.dirnew;
          t.from.name, t.to.name, t.via, amap.dirfwd("/dir")
        }, clearDir: function () {
          var t = this;
          t.clearIpt(), e(".line-search-clear").addClass("none"), amap.title = "路线规划", amap.dirfwd("/dir")
        }, closeDir: function () {
          e(".line-search-clear").addClass("none"), amap.fwd("/")
        }, showMylocSug: function (t, a) {
          var i = this;
          if (amap.loc && !i.hasLocalName() && "1" == amap.loc.code) {
            var n;
            n = a || "0" == a ? a : "", e(".dirlocSug").attr("type", t).attr("index", n).show()
          }
        }, hideMylocSug: function () {
          e(".dirlocSug").hide()
        }, selectMyloc: function () {
        }, hasLocalName: function () {
          var t = e("#dir_from_ipt").val(), a = e("#dir_to_ipt").val(), i = !1;
          if ("" != e(".passList").html()) {
            var n = e(".line-search-point");
            e.each(n, function (t, a) {
              var n = e(a).find(".dir_ipt").val();
              if ("我的位置" == n)return void(i = !0)
            })
          }
          return !("我的位置" !== t && "我的位置" !== a && !i)
        }
      };
      t.exports = l
    }).call(e, a(1), a(6), a(5))
  }, 41: function (t, e, a) {
    (function (e) {
      var i = a(66), n = a(65), r = a(68), o = a(32), s = a(11), l = a(14), p = a(9), c = (a(55), {
        redir: function (t, e) {
          var a = this, i = {pos: t, type: e}, n = amap.dirnew;
          a.planRegeo(i, function (t) {
            "from" == e ? n.from = t : "to" == e && (n.to = t), amap.fwd("/dir")
          })
        }, clearDir: function () {
          var t = this, a = s;
          a.dragRoute && a.dragRoute.destroy();
          var i = a.polylinePlan;
          e.each(i, function (t, e) {
            e.setMap(null)
          }), i = {}, a.polylineDatasPlan = {};
          var n = a.markers;
          e.each(n, function (t, e) {
            e.setMap(null)
          }), n = {}, a.poiDatas = {}, t.clearAllRoute(), t.clearCarTmc()
        }, clearAllRoute: function () {
          var t = s;
          amap.carState.active = !1, t.polylineRoute, t.polylineRouteTop, e.each(t.polylineRouteTop, function (t, e) {
            e.setMap(null)
          }), e.each(t.polylineRoute, function (t, e) {
            e.setMap(null)
          }), t.polylineRoute = {}, t.polylineRouteTop = {}
        }, clearCarTmc: function () {
          var t = s, a = t.polylineRouteTmc;
          e.each(a, function (t, a) {
            e.each(a, function (t, e) {
              e.setMap(null)
            })
          }), a = {}
        }, clearBusEta: function () {
          var t = s, a = t.polylineBusEta;
          e.each(a, function (t, e) {
            e.setMap(null)
          }), a = {}
        }, closeDir: function () {
          var t = s, e = amap.dirnew, a = e.type, i = t.dragRoute, n = t.trans, r = t.walking;
          i && i.close(), n && n.close(), r && r.close(), "car" == a ? i && i.open() : "bus" == a ? n && n.open() : "walk" == a && r && r.open()
        }, planRegeo: function (t, e) {
          var a = t.pos, i = t.type;
          p.getRegeoData(a, function (t) {
            var n = t.adcode, r = null, o = null, s = null, l = null;
            if (t.road_list && t.road_list.length > 0) {
              var p = t.road_list[0];
              o = p.name, l = ""
            } else o = "from" == i ? "起点" : "to" == i ? "终点" : "未知道路", l = "";
            r = "regeo_" + (new Date).getTime(), s = a.lng + "," + a.lat;
            var c = {id: r, name: o, lnglat: s, adcode: n, modxy: l};
            e(c)
          })
        }, stepHighlight: function (t) {
          var a = s, i = t, n = a.polylineDatasPlan, r = a.polylinePlan;
          if ("poly-drive" != n["step-" + i].polyType) {
            var o = "step-" + amap.walkState.active;
            e.each(r, function (t, e) {
              o != t && e.setMap(null)
            })
          }
          r["step-" + i].setOptions({
            map: themap,
            strokeColor: "#FF0000",
            lineCap: "round",
            lineJoin: "round",
            strokeOpacity: .8,
            showdir: !0,
            zIndex: 51
          })
        }, stepFitviewBus: function (t) {
          var e = s, a = "step-" + t, i = e.polylinePlan[a];
          p.setObjFitView([i])
        }, unStepFitviewBus: function (t) {
          var e = s;
          e.polylinePlan, p.setObjFitView()
        }, stepHighlightCar: function (t) {
          var e = a(31), i = s, n = i.polylinePlan, r = Object.keys(n), o = r.length;
          e.unhighlightCarNav(), "start" == t || "end" == t || t == o - 1 ? (t = "start" == t ? 0 : o - 1, p.setObjFitView(n["step-" + t])) : e.highlightCarNav(t)
        }, stepHighlightBus: function (t) {
          var e = s, a = "step-" + t, i = e.polylineDatasPlan[a], n = e.polylineHighlight;
          n ? n.setPath(i.path) : p.addHighlightPolyline(i), p.setObjFitView([e.polylineHighlight])
        }, stepUnHighlightBus: function () {
          var t = s;
          t.polylineHighlight && t.polylineHighlight.setMap(null)
        }, stepUnHighlight: function (t) {
          var a = s, i = t, n = amap.dirnew, r = n.type, o = a.polylineDatasPlan, l = a.polylinePlan;
          o && (i ? "walk" == r ? l["step-" + i].setMap(null) : "car" == r && l["step-" + i].setMap(null) : "walk" == r ? e.each(l, function (t, e) {
            e.setMap(null)
          }) : "car" == r && e.each(l, function (t, e) {
              e.setMap(null)
            }))
        }, routeHighlight: function (t) {
          var a = [], i = [], n = amap.dirnew, r = n.type, o = [];
          if ("car" == r) o = amap.dirp.routes[t].steps; else if ("bus" == r) o = amap.dirp.buslist[t].segmentlist; else if ("walk" == r)return;
          e.each(o, function (t, e) {
            var a = e.path || [];
            i = i.concat(a)
          }), a.push({type: "polyline-tmp", list: [{path: i}]}), p.addOverlays(a, "noset")
        }, routeHighlightNew: function (t) {
          var a = amap.dirnew, i = [], n = [], r = a.type, o = [];
          if ("car" == r) o = amap.dirp.path_list && amap.dirp.path_list[t].steps; else if ("bus" == r) o = "railway" == amap.dirp.railtype ? amap.dirp.routelist && amap.dirp.routelist[t].segmentlist : amap.dirp.buslist && amap.dirp.buslist[t].segmentlist; else if ("walk" == r)return;
          e.each(o, function (t, e) {
            var a = e.path || [];
            n = n.concat(a)
          }), i.push({type: "polyline-tmp", list: [{path: n}]}), p.addOverlays(i, "noset")
        }, routeUnhighlight: function () {
          p.clearOverlays(["polyline-tmp"])
        }, creatDirQrcode: function () {
          var t = amap.dirnew, a = (t.to.lnglat && t.to.lnglat.split(","), amap.shareDir("pc_dir")),
            i = "canvas-dirQrcode", n = function (t) {
              l.tplLoad({
                filename: i, callback: function (a) {
                  var i = 78, n = e(".dir_qr");
                  n.html("").append(a), e(".dir_qrcode").attr("url", t).html("").qrcode({
                    width: i,
                    height: i,
                    text: t
                  }), n.slideDown()
                }
              }), amap.autumncard.url = t, amap.autumnshow = !0
            };
          amap.getShorturl(a, n)
        }, clearDirMenu: function () {
          amap.dirnew, o.clearIpt(), c.closeDir(), p.clearAllOverlays(), amap.fwd("/dir")
        }
      });
      e.extend(c, i), e.extend(c, n), e.extend(c, r), t.exports = c
    }).call(e, a(1))
  }, 44: function (t, e, a) {
    (function (e, i) {
      var n = (a(17), a(241)), r = a(242), o = a(240);
      searchModel = a(47);
      var s = {
        typename: {from: "起点", to: "终点", via: "途经点"}, poilist: {}, hasBind: !1, isOpen: !1, init: function (t) {
        }, bindEvent: function () {
          var t = this, a = e(".choose-poi");
          watch(amap, "dirSearchPointOk", function () {
            amap.dirSearchPointOk.length > 0 && amap.dirSearchPointOk.length == amap.dirSearchPoint.length && (e(".line-search-submit").removeClass("butLoading"), t.openContent())
          }), a.on("click", ".choose-poi-title", function () {
            var a = e(this).closest(".choose_wrap"), i = a.hasClass("expand-content");
            if (e(".choose_wrap").removeClass("expand-content"), !i) {
              a.addClass("expand-content");
              var n = e(this).closest(".choose-poi-list");
              t.initScroll(n)
            }
          }), a.on("click", ".dir_choose_item", function () {
            var a = e(this).attr("dirtype"), i = e(this).attr("dirindex"), n = e(this).closest(".poibox").attr("id"),
              r = t.poilist[n], o = {
                adcode: r.adcode,
                name: r.name,
                id: r.id,
                poitype: r.typecode || "",
                lnglat: r.location.lng + "," + r.location.lat,
                modxy: r.modxy
              };
            t.setDirInfo(o, a, i), t.isOpen = !1, e("#choosePoi").hide(), amap.dirfwd("/dir")
          }), a.on("click", ".paging-next", function () {
            var a = e(this), i = a.attr("type");
            t.pageChange(a, i)
          }), a.on("click", ".paging-prev", function () {
            var a = e(this), i = a.attr("type");
            t.pageChange(a, i)
          }), a.on("click", ".paging-index", function () {
            var a = e(this), i = a.attr("type");
            t.pageChange(a, i)
          }), a.on("click", ".choose-poi-choosecity", function (t) {
            t.stopPropagation(), e(".city-title").trigger("click")
          }), t.hasBind = !0
        }, creatPoilist: function (t) {
          var a = this, n = t && t.data && t.data.poi_list;
          i.isEmpty(n) || e.each(n, function (t, e) {
            a.poilist[e.id] = e
          })
        }, clearPoilist: function (t, a) {
          var i = e("#" + t + "PoiList");
          "via" == t && (i = e(a ? "#" + t + "PoiList" + a : ".viaPoiList")), i.html("")
        }, openContent: function () {
          var t = e(".choose_list");
          t.length > 0 && t.eq(0).addClass("expand-content")
        }, doChoosePoi: function (t, e) {
          var a = this;
          a.hasBind || a.bindEvent(), a.creatPoilist(t), "1" !== t.status || "0" === t.data.total ? a.noResult(t) : "1" == t.data.thisPoiFlag ? a.noNeedChoose(t) : a.chooselist(t)
        }, initScroll: function (t) {
          var a = this, i = t.find(".serp-list"), n = e(".choose_wrap"), r = e("#planForm").height() + 70 + 46 + 10,
            o = 180, s = 0;
          setTimeout(function () {
            e.each(n, function (t, a) {
              var i = 38;
              "" != e(a).html() && (e(a).hasClass("warning-title") && (i = 120), r += i)
            }), s = amap.panel.height - r, s < o && (s = o, a.initOutSroll()), i.length > 0 && (i.css("max-height", s), i.perfectScrollbar({
              suppressScrollX: !0,
              wheelPropagation: !0
            }))
          }, 0)
        }, initOutSroll: function () {
          var t = e("#choosePoi"), a = e("#planForm").height() + 70;
          t.length > 0 && (t.css("max-height", amap.panel.height - a), t.perfectScrollbar({suppressScrollX: !0}))
        }, chooselist: function (t, a) {
          var i = this, n = t.type, r = t.index, s = t.data.keywords, l = "";
          $choosePoi = e("#choosePoi"), "via" == n && (l = Number(r) + 1);
          var p = {
            cityname: amap.cityname,
            poiname: s,
            type: n,
            typetxt: i.typename[n],
            index: r,
            realindex: l,
            poilist: t.data.poi_list,
            page: t.data.page
          }, c = o(p);
          e("#" + n + "PoiList" + r).html(c), a || i.initScroll(e("#" + n + "PoiList" + r)), $choosePoi.show()
        }, reChooselist: function (t, a, i) {
          var n = this, r = t.data.poi_list, o = "";
          return r && (o = "", e.each(r, function (e, r) {
            n.creatPoilist(t), o += '<li class="poibox poibox-normal dir_choose_item choose_' + e + '" id="' + r.id + '" dirtype="' + a + '" dirindex="' + i + '"><div class="choose_marker"></div><h3 class="poi-title"><span class="poi-name">' + r.name + '</span></h3><div class="poi-info"><p class="poi-addr">' + r.address + '</p></div><button class="dir_choose_btn" dirtype="' + a + '" dirindex="' + i + '">设为' + n.typename[a] + "</button></li>"
          })), o
        }, noNeedChoose: function (t) {
          var a = this, i = t.type, n = t.index, o = "", s = t.data.keywords, l = t.data.thisPoi, p = e("#choosePoi");
          "via" == i && (o = Number(n) + 1);
          var c = {
            cityname: amap.cityname,
            poiname: s,
            type: i,
            typetxt: a.typename[i],
            index: n,
            realindex: o,
            poilist: t.data.poi_list,
            page: t.data.page
          }, d = r(c);
          e("#" + i + "PoiList" + n).html(d);
          var u = {
            adcode: l.adcode,
            name: l.name,
            id: l.id,
            poitype: l.typecode || "",
            lnglat: l.location.lng + "," + l.location.lat,
            modxy: l.modxy
          };
          a.setDirInfo(u, i, n), amap.dirReady.from && amap.dirReady.to && amap.dirReady.via ? (p.hide(), amap.dirfwd("/dir")) : p.show()
        }, noResult: function (t) {
          var a = this, i = t.type, r = t.index, o = "", s = t.data.keywords, l = e("#choosePoi");
          "via" == i && (o = Number(r) + 1);
          var p = {cityname: amap.cityname, poiname: s, type: i, typetxt: a.typename[i], index: r, realindex: o},
            c = n(p);
          e("#" + i + "PoiList" + r).html(c), l.show()
        }, pageChange: function (t, e) {
          var a = this, i = t.closest(".choose-poi-content"), n = i.attr("dirtype"), r = i.attr("dirindex"),
            o = t.attr("pageno"), s = Number(o) + 1;
          "prev" == e ? s = Number(o) - 1 : "index" == e && (s = 1);
          var l = amap.dirnew[n].name;
          "via" == n && (l = amap.dirnew.via[r].name);
          var p = {type: n, index: r, name: l, pagenum: s};
          a.reSearchChoose(p)
        }, reSearchChoose: function (t) {
          var a = this;
          if (t) {
            var i = {name: t.name, pagenum: t.pagenum || 1}, n = t.type, r = t.index;
            searchModel.searchPoi(i, function (t) {
              var i = t.data.page, o = a.reChooselist(t, n, r), s = e("#" + n + "PoiList");
              "via" == n && (s = e("#" + n + "PoiList" + r)), s.find(".serp-list").html(o), s.find(".paging-current").html(i.pageNum + "/" + i.pageTotal + "页"), i.pageNum < i.pageTotal ? s.find(".paging-next").show().attr("pageno", i.pageNum) : s.find(".paging-next").hide().attr("pageno", i.pageNum), i.pageNum > 1 ? s.find(".paging-prev").show().attr("pageno", i.pageNum) : s.find(".paging-prev").hide().attr("pageno", i.pageNum)
            })
          }
        }, setDirInfo: function (t, a, i) {
          var n = this;
          if (a) {
            var r = "";
            "from" == a ? (amap.dirnew.from = t, amap.dirReady.from = !0) : "to" == a ? (amap.dirnew.to = t, amap.dirReady.to = !0) : "via" == a && (r = i, amap.dirnew.via[r] = t, amap.dirReady.viarr[r] = !0, n.viaReady()), e("#" + a + "PoiList" + r).find(".choose_wrap").addClass("selected-title").removeClass("expand-content").removeClass("choose_list"), e("#" + a + "PoiList" + r).find(".choose_poiname").html(t.name)
          }
        }, viaReady: function () {
          var t = amap.dirnew.via.length;
          if (amap.dirReady.viarr.length == t)for (var e = 0; e < t && amap.dirReady.viarr[e]; e++)e == t - 1 && (amap.dirReady.via = !0)
        }
      };
      t.exports = s
    }).call(e, a(1), a(5))
  }, 47: function (t, e, a) {
    (function (e) {
      var a = {
        searchPoi: function (t, a) {
          var i = {
            query_type: "TQUERY",
            city: amap.adcode || "110000",
            keywords: t.name,
            pagesize: 10,
            pagenum: t.pagenum,
            addr_poi_merge: !0
          }, n = e.param(i);
          amap.get(amap.service.poiInfoPlan + n, function (t) {
            a && a(t)
          })
        }, searchGeo: function (t, e) {
        }
      };
      t.exports = a
    }).call(e, a(1))
  }, 55: function (t, e, a) {
    (function (t) {
      !function (e) {
        e.fn.qrcode = function (a) {
          function i (t) {
            this.mode = l, this.data = t
          }

          function n (t, e) {
            this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
          }

          function r (t, e) {
            if (void 0 == t.length)throw Error(t.length + "/" + e);
            for (var a = 0; a < t.length && 0 == t[a];)a++;
            this.num = Array(t.length - a + e);
            for (var i = 0; i < t.length - a; i++)this.num[i] = t[i + a]
          }

          function o (t, e) {
            this.totalCount = t, this.dataCount = e
          }

          function s () {
            this.buffer = [], this.length = 0
          }

          var l;
          i.prototype = {
            getLength: function () {
              return this.data.length
            }, write: function (t) {
              for (var e = 0; e < this.data.length; e++)t.put(this.data.charCodeAt(e), 8)
            }
          }, n.prototype = {
            addData: function (t) {
              this.dataList.push(new i(t)), this.dataCache = null
            }, isDark: function (t, e) {
              if (0 > t || this.moduleCount <= t || 0 > e || this.moduleCount <= e)throw Error(t + "," + e);
              return this.modules[t][e]
            }, getModuleCount: function () {
              return this.moduleCount
            }, make: function () {
              if (1 > this.typeNumber) {
                for (var t = 1, t = 1; 40 > t; t++) {
                  for (var e = o.getRSBlocks(t, this.errorCorrectLevel), a = new s, i = 0, n = 0; n < e.length; n++)i += e[n].dataCount;
                  for (n = 0; n < this.dataList.length; n++)e = this.dataList[n], a.put(e.mode, 4), a.put(e.getLength(), p.getLengthInBits(e.mode, t)), e.write(a);
                  if (a.getLengthInBits() <= 8 * i)break
                }
                this.typeNumber = t
              }
              this.makeImpl(!1, this.getBestMaskPattern())
            }, makeImpl: function (t, e) {
              this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
              for (var a = 0; a < this.moduleCount; a++) {
                this.modules[a] = Array(this.moduleCount);
                for (var i = 0; i < this.moduleCount; i++)this.modules[a][i] = null
              }
              this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), 7 <= this.typeNumber && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = n.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e)
            }, setupPositionProbePattern: function (t, e) {
              for (var a = -1; 7 >= a; a++)if (!(-1 >= t + a || this.moduleCount <= t + a))for (var i = -1; 7 >= i; i++)-1 >= e + i || this.moduleCount <= e + i || (this.modules[t + a][e + i] = 0 <= a && 6 >= a && (0 == i || 6 == i) || 0 <= i && 6 >= i && (0 == a || 6 == a) || 2 <= a && 4 >= a && 2 <= i && 4 >= i)
            }, getBestMaskPattern: function () {
              for (var t = 0, e = 0, a = 0; 8 > a; a++) {
                this.makeImpl(!0, a);
                var i = p.getLostPoint(this);
                (0 == a || t > i) && (t = i, e = a)
              }
              return e
            }, createMovieClip: function (t, e, a) {
              for (t = t.createEmptyMovieClip(e, a), this.make(), e = 0; e < this.modules.length; e++)for (var a = 1 * e, i = 0; i < this.modules[e].length; i++) {
                var n = 1 * i;
                this.modules[e][i] && (t.beginFill(0, 100), t.moveTo(n, a), t.lineTo(n + 1, a), t.lineTo(n + 1, a + 1), t.lineTo(n, a + 1), t.endFill())
              }
              return t
            }, setupTimingPattern: function () {
              for (var t = 8; t < this.moduleCount - 8; t++)null == this.modules[t][6] && (this.modules[t][6] = 0 == t % 2);
              for (t = 8; t < this.moduleCount - 8; t++)null == this.modules[6][t] && (this.modules[6][t] = 0 == t % 2)
            }, setupPositionAdjustPattern: function () {
              for (var t = p.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)for (var a = 0; a < t.length; a++) {
                var i = t[e], n = t[a];
                if (null == this.modules[i][n])for (var r = -2; 2 >= r; r++)for (var o = -2; 2 >= o; o++)this.modules[i + r][n + o] = -2 == r || 2 == r || -2 == o || 2 == o || 0 == r && 0 == o
              }
            }, setupTypeNumber: function (t) {
              for (var e = p.getBCHTypeNumber(this.typeNumber), a = 0; 18 > a; a++) {
                var i = !t && 1 == (e >> a & 1);
                this.modules[Math.floor(a / 3)][a % 3 + this.moduleCount - 8 - 3] = i
              }
              for (a = 0; 18 > a; a++)i = !t && 1 == (e >> a & 1), this.modules[a % 3 + this.moduleCount - 8 - 3][Math.floor(a / 3)] = i
            }, setupTypeInfo: function (t, e) {
              for (var a = p.getBCHTypeInfo(this.errorCorrectLevel << 3 | e), i = 0; 15 > i; i++) {
                var n = !t && 1 == (a >> i & 1);
                6 > i ? this.modules[i][8] = n : 8 > i ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n
              }
              for (i = 0; 15 > i; i++)n = !t && 1 == (a >> i & 1), 8 > i ? this.modules[8][this.moduleCount - i - 1] = n : 9 > i ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n;
              this.modules[this.moduleCount - 8][8] = !t
            }, mapData: function (t, e) {
              for (var a = -1, i = this.moduleCount - 1, n = 7, r = 0, o = this.moduleCount - 1; 0 < o; o -= 2)for (6 == o && o--; ;) {
                for (var s = 0; 2 > s; s++)if (null == this.modules[i][o - s]) {
                  var l = !1;
                  r < t.length && (l = 1 == (t[r] >>> n & 1)), p.getMask(e, i, o - s) && (l = !l), this.modules[i][o - s] = l, n--, -1 == n && (r++, n = 7)
                }
                if (i += a, 0 > i || this.moduleCount <= i) {
                  i -= a, a = -a;
                  break
                }
              }
            }
          }, n.PAD0 = 236, n.PAD1 = 17, n.createData = function (t, e, a) {
            for (var e = o.getRSBlocks(t, e), i = new s, r = 0; r < a.length; r++) {
              var l = a[r];
              i.put(l.mode, 4), i.put(l.getLength(), p.getLengthInBits(l.mode, t)), l.write(i)
            }
            for (r = t = 0; r < e.length; r++)t += e[r].dataCount;
            if (i.getLengthInBits() > 8 * t)throw Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * t + ")");
            for (i.getLengthInBits() + 4 <= 8 * t && i.put(0, 4); 0 != i.getLengthInBits() % 8;)i.putBit(!1);
            for (; !(i.getLengthInBits() >= 8 * t || (i.put(n.PAD0, 8), i.getLengthInBits() >= 8 * t));)i.put(n.PAD1, 8);
            return n.createBytes(i, e)
          }, n.createBytes = function (t, e) {
            for (var a = 0, i = 0, n = 0, o = Array(e.length), s = Array(e.length), l = 0; l < e.length; l++) {
              var c = e[l].dataCount, d = e[l].totalCount - c, i = Math.max(i, c), n = Math.max(n, d);
              o[l] = Array(c);
              for (var u = 0; u < o[l].length; u++)o[l][u] = 255 & t.buffer[u + a];
              for (a += c, u = p.getErrorCorrectPolynomial(d), c = new r(o[l], u.getLength() - 1).mod(u), s[l] = Array(u.getLength() - 1), u = 0; u < s[l].length; u++)d = u + c.getLength() - s[l].length, s[l][u] = 0 <= d ? c.get(d) : 0
            }
            for (u = l = 0; u < e.length; u++)l += e[u].totalCount;
            for (a = Array(l), u = c = 0; u < i; u++)for (l = 0; l < e.length; l++)u < o[l].length && (a[c++] = o[l][u]);
            for (u = 0; u < n; u++)for (l = 0; l < e.length; l++)u < s[l].length && (a[c++] = s[l][u]);
            return a
          }, l = 4;
          for (var p = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (t) {
              for (var e = t << 10; 0 <= p.getBCHDigit(e) - p.getBCHDigit(p.G15);)e ^= p.G15 << p.getBCHDigit(e) - p.getBCHDigit(p.G15);
              return (t << 10 | e) ^ p.G15_MASK
            },
            getBCHTypeNumber: function (t) {
              for (var e = t << 12; 0 <= p.getBCHDigit(e) - p.getBCHDigit(p.G18);)e ^= p.G18 << p.getBCHDigit(e) - p.getBCHDigit(p.G18);
              return t << 12 | e
            },
            getBCHDigit: function (t) {
              for (var e = 0; 0 != t;)e++, t >>>= 1;
              return e
            },
            getPatternPosition: function (t) {
              return p.PATTERN_POSITION_TABLE[t - 1]
            },
            getMask: function (t, e, a) {
              switch (t) {
                case 0:
                  return 0 == (e + a) % 2;
                case 1:
                  return 0 == e % 2;
                case 2:
                  return 0 == a % 3;
                case 3:
                  return 0 == (e + a) % 3;
                case 4:
                  return 0 == (Math.floor(e / 2) + Math.floor(a / 3)) % 2;
                case 5:
                  return 0 == e * a % 2 + e * a % 3;
                case 6:
                  return 0 == (e * a % 2 + e * a % 3) % 2;
                case 7:
                  return 0 == (e * a % 3 + (e + a) % 2) % 2;
                default:
                  throw Error("bad maskPattern:" + t)
              }
            },
            getErrorCorrectPolynomial: function (t) {
              for (var e = new r([1], 0), a = 0; a < t; a++)e = e.multiply(new r([1, c.gexp(a)], 0));
              return e
            },
            getLengthInBits: function (t, e) {
              if (1 <= e && 10 > e)switch (t) {
                case 1:
                  return 10;
                case 2:
                  return 9;
                case l:
                  return 8;
                case 8:
                  return 8;
                default:
                  throw Error("mode:" + t)
              } else if (27 > e)switch (t) {
                case 1:
                  return 12;
                case 2:
                  return 11;
                case l:
                  return 16;
                case 8:
                  return 10;
                default:
                  throw Error("mode:" + t)
              } else {
                if (!(41 > e))throw Error("type:" + e);
                switch (t) {
                  case 1:
                    return 14;
                  case 2:
                    return 13;
                  case l:
                    return 16;
                  case 8:
                    return 12;
                  default:
                    throw Error("mode:" + t)
                }
              }
            },
            getLostPoint: function (t) {
              for (var e = t.getModuleCount(), a = 0, i = 0; i < e; i++)for (var n = 0; n < e; n++) {
                for (var r = 0, o = t.isDark(i, n), s = -1; 1 >= s; s++)if (!(0 > i + s || e <= i + s))for (var l = -1; 1 >= l; l++)0 > n + l || e <= n + l || 0 == s && 0 == l || o == t.isDark(i + s, n + l) && r++;
                5 < r && (a += 3 + r - 5)
              }
              for (i = 0; i < e - 1; i++)for (n = 0; n < e - 1; n++)r = 0, t.isDark(i, n) && r++, t.isDark(i + 1, n) && r++, t.isDark(i, n + 1) && r++, t.isDark(i + 1, n + 1) && r++, (0 == r || 4 == r) && (a += 3);
              for (i = 0; i < e; i++)for (n = 0; n < e - 6; n++)t.isDark(i, n) && !t.isDark(i, n + 1) && t.isDark(i, n + 2) && t.isDark(i, n + 3) && t.isDark(i, n + 4) && !t.isDark(i, n + 5) && t.isDark(i, n + 6) && (a += 40);
              for (n = 0; n < e; n++)for (i = 0; i < e - 6; i++)t.isDark(i, n) && !t.isDark(i + 1, n) && t.isDark(i + 2, n) && t.isDark(i + 3, n) && t.isDark(i + 4, n) && !t.isDark(i + 5, n) && t.isDark(i + 6, n) && (a += 40);
              for (n = r = 0; n < e; n++)for (i = 0; i < e; i++)t.isDark(i, n) && r++;
              return t = Math.abs(100 * r / e / e - 50) / 5, a + 10 * t
            }
          }, c = {
            glog: function (t) {
              if (1 > t)throw Error("glog(" + t + ")");
              return c.LOG_TABLE[t]
            }, gexp: function (t) {
              for (; 0 > t;)t += 255;
              for (; 256 <= t;)t -= 255;
              return c.EXP_TABLE[t]
            }, EXP_TABLE: Array(256), LOG_TABLE: Array(256)
          }, d = 0; 8 > d; d++)c.EXP_TABLE[d] = 1 << d;
          for (d = 8; 256 > d; d++)c.EXP_TABLE[d] = c.EXP_TABLE[d - 4] ^ c.EXP_TABLE[d - 5] ^ c.EXP_TABLE[d - 6] ^ c.EXP_TABLE[d - 8];
          for (d = 0; 255 > d; d++)c.LOG_TABLE[c.EXP_TABLE[d]] = d;
          return r.prototype = {
            get: function (t) {
              return this.num[t]
            }, getLength: function () {
              return this.num.length
            }, multiply: function (t) {
              for (var e = Array(this.getLength() + t.getLength() - 1), a = 0; a < this.getLength(); a++)for (var i = 0; i < t.getLength(); i++)e[a + i] ^= c.gexp(c.glog(this.get(a)) + c.glog(t.get(i)));
              return new r(e, 0)
            }, mod: function (t) {
              if (0 > this.getLength() - t.getLength())return this;
              for (var e = c.glog(this.get(0)) - c.glog(t.get(0)), a = Array(this.getLength()), i = 0; i < this.getLength(); i++)a[i] = this.get(i);
              for (i = 0; i < t.getLength(); i++)a[i] ^= c.gexp(c.glog(t.get(i)) + e);
              return new r(a, 0).mod(t)
            }
          }, o.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], o.getRSBlocks = function (t, e) {
            var a = o.getRsBlockTable(t, e);
            if (void 0 == a)throw Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
            for (var i = a.length / 3, n = [], r = 0; r < i; r++)for (var s = a[3 * r + 0], l = a[3 * r + 1], p = a[3 * r + 2], c = 0; c < s; c++)n.push(new o(l, p));
            return n
          }, o.getRsBlockTable = function (t, e) {
            switch (e) {
              case 1:
                return o.RS_BLOCK_TABLE[4 * (t - 1) + 0];
              case 0:
                return o.RS_BLOCK_TABLE[4 * (t - 1) + 1];
              case 3:
                return o.RS_BLOCK_TABLE[4 * (t - 1) + 2];
              case 2:
                return o.RS_BLOCK_TABLE[4 * (t - 1) + 3]
            }
          }, s.prototype = {
            get: function (t) {
              return 1 == (this.buffer[Math.floor(t / 8)] >>> 7 - t % 8 & 1)
            }, put: function (t, e) {
              for (var a = 0; a < e; a++)this.putBit(1 == (t >>> e - a - 1 & 1))
            }, getLengthInBits: function () {
              return this.length
            }, putBit: function (t) {
              var e = Math.floor(this.length / 8);
              this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
            }
          }, "string" == typeof a && (a = {text: a}), a = e.extend({}, {
            render: "canvas",
            width: 256,
            height: 256,
            typeNumber: -1,
            correctLevel: 2,
            background: "#ffffff",
            foreground: "#000000"
          }, a), this.each(function () {
            var i;
            if ("canvas" == a.render) {
              i = new n(a.typeNumber, a.correctLevel), i.addData(a.text), i.make();
              var r = document.createElement("canvas");
              r.width = a.width, r.height = a.height;
              for (var o = r.getContext("2d"), s = a.width / i.getModuleCount(), l = a.height / i.getModuleCount(), p = 0; p < i.getModuleCount(); p++)for (var c = 0; c < i.getModuleCount(); c++) {
                o.fillStyle = i.isDark(p, c) ? a.foreground : a.background;
                var d = Math.ceil((c + 1) * s) - Math.floor(c * s), u = Math.ceil((p + 1) * s) - Math.floor(p * s);
                o.fillRect(Math.round(c * s), Math.round(p * l), d, u)
              }
            } else for (i = new n(a.typeNumber, a.correctLevel), i.addData(a.text), i.make(), r = e("<table></table>").css("width", a.width + "px").css("height", a.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", a.background), o = a.width / i.getModuleCount(), s = a.height / i.getModuleCount(), l = 0; l < i.getModuleCount(); l++)for (p = e("<tr></tr>").css("height", s + "px").appendTo(r), c = 0; c < i.getModuleCount(); c++)e("<td></td>").css("width", o + "px").css("background-color", i.isDark(l, c) ? a.foreground : a.background).appendTo(p);
            i = r, t(i).appendTo(this)
          })
        }
      }(t)
    }).call(e, a(1))
  }, 65: function (t, e, a) {
    (function (e, i, n) {
      var r = a(11), o = a(30), s = a(27), l = a(9), p = a(7), c = {
        timeTag: {0: "正常", 1: "可能存在风险", 2: "不在运营时间内", 3: "乘坐时间太早"},
        busTimeTag: {0: "正常", 2: "不在运营时间内", 3: "可能早班车未发出", 4: "可能错过末班车"},
        minTag: {0: "", 1: "时间短", 2: "步行少", 4: "换乘少", 7: "最佳", 8: "直达"},
        minTagSign: {0: "", 1: "lesstime", 2: "lesswalk", 4: "lesstransfer", 7: "best", 8: "nonstop"},
        etaStatus: {0: "", 1: "畅通", 2: "缓行", 3: "拥堵", 4: "非常拥堵"},
        etaStatusSign: {0: "", 1: "smooth", 2: "slow", 3: "jam", 4: "jamer"},
        priceType: {
          0: "不分仓位级别",
          3: "动卧",
          4: "火车一人软包",
          5: "火车观光座",
          6: "火车特等软座",
          7: "一等",
          8: "二等",
          9: "特等",
          10: "硬座",
          11: "软座",
          12: "软座1等座",
          13: "软座2等座",
          14: "硬卧上铺",
          15: "硬卧中铺",
          16: "硬卧下铺",
          17: "软卧上铺",
          18: "软卧下铺",
          19: "高级软卧上铺",
          20: "高级软卧下铺",
          21: "商务",
          22: "座席",
          23: "卧席上铺",
          24: "卧席中铺",
          25: "卧席下铺",
          30: "经济舱",
          31: "商务舱",
          40: "经济舱",
          41: "3等舱",
          42: "2等舱",
          43: "豪华舱"
        },
        railType: {2010: "普", 2011: "G", 2012: "D", 2013: "C", 2014: "Z", 2015: "T", 2016: "K", 2017: "临", 2018: "S"},
        dirBus: function (t) {
          var a = this, i = r, n = amap.dir.from, o = amap.dir.to, s = amap.dir.policy;
          amap.dir.type || "bus", AMap.service(["AMap.Transfer"], function () {
            var t = new AMap.Transfer({city: n.adcode || "110000", policy: s, nightflag: !0, extensions: "all"});
            i.trans = t;
            var r = n.lnglat, l = null;
            l = new AMap.LngLat(r.split(",")[0], r.split(",")[1]);
            var p = o.lnglat, c = null;
            c = new AMap.LngLat(p.split(",")[0], p.split(",")[1]), t.searviaIconOptsch(l, c), AMap.event.addListener(t, "complete", function (t) {
              var i = a.buildBusData(t);
              i.frominfo = n, i.toinfo = o, amap.dirp = i, e(document).trigger("amap.dirp", i)
            }), AMap.event.addListener(t, "error", function (t) {
              amap.dirp = null
            })
          })
        },
        buildBusData: function (t) {
          var a = {};
          if ("OK" == t.info) {
            a = {type: "bus", taxi_cost: t.taxi_cost, plans: []};
            var n = amap.dir.from.lnglat.split(","), r = amap.dir.to.lnglat.split(","), l = t.plans;
            l && l.length > 0 && (e.each(l, function (t, l) {
              l.buses = [], l.planTitle = [], l.walk_distance = 0;
              var p = 0, c = l.segments.length, d = {};
              e.each(l.segments, function (t, a) {
                if ("METRO_RAIL" == a.transit_mode && (a.transit_mode = "subway"), 0 === t && (a.name = amap.dir.from.name), "" !== a.transit_mode && "WALK" === a.transit_mode) l.segments[t - 1] ? (a.location = l.segments[t - 1].transit.off_station.location, a.id = "marker-plan-" + t, a.markerType = "marker-bus-" + l.segments[t - 1].transit_mode.toLowerCase() + "Stop", a.pre_on_station = l.segments[t - 1].on_station, a.pre_off_station = l.segments[t - 1].off_station, a.pre_lines = l.segments[t - 1].lines) : (a.location = new AMap.LngLat(n[0], n[1]), a.id = "marker-plan-" + t, a.markerType = "marker-bus-from", a.type = "from"), a.next_on_station = l.segments[t + 1] && l.segments[t + 1].transit.on_station, l.walk_distance += a.distance, a.polyType = "poly-bus-walk"; else {
                  p++, l.buses.push(a), a.location = a.transit.on_station.location, a.id = "marker-plan-" + t, l.segments[t - 1] ? a.markerType = "marker-bus-" + a.transit_mode.toLowerCase() + "Stop" : (a.location = new AMap.LngLat(n[0], n[1]), a.markerType = "marker-bus-from");
                  var i = a.transit.lines[0].name.replace(/\(.*\)/gi, "");
                  l.planTitle.push({name: i, type: a.transit_mode.toLowerCase()}), a.polyType = "poly-bus-bus"
                }
                t == c - 1 && "" !== a.transit_mode && ("SUBWAY" !== a.transit_mode && "BUS" !== a.transit_mode || (d = {
                  type: a.transit_mode.toLowerCase() + "-last",
                  id: "marker-plan-" + c,
                  markerType: "marker-bus-" + a.transit_mode.toLowerCase() + "Stop",
                  name: a.transit.off_station.name,
                  pre_lines: a.transit.lines,
                  location: a.transit.off_station.location,
                  pre_on_station: a.transit.on_station,
                  pre_off_station: a.transit.off_station
                })), a.preType = l.segments[t - 1] ? l.segments[t - 1].transit_mode.toLowerCase() : "", a.nextType = l.segments[t + 1] ? l.segments[t + 1].transit_mode.toLowerCase() : "", a.style = a.transit_mode.toLowerCase(), a.distance_num = a.distance, a.distance = o.formatDistance(a.distance), a = e.extend(a, a.transit)
              }), i.isEmpty(d) || l.segments.push(d), l.segments.push({
                id: "marker-plan-" + l.segments.length,
                location: new AMap.LngLat(r[0], r[1]),
                markerType: "marker-bus-to",
                type: "to",
                name: amap.dir.to.name
              }), e.each(l.segments, function (t, e) {
                e.on_station && (e.on_station.planid = "marker-plan-" + t), e.off_station && (e.off_station.planid = "marker-plan-" + (t + 1))
              }), a.plans[t] = {
                buses: l.buses,
                planTitle: l.planTitle,
                segments: l.segments,
                seglength: l.segments.length,
                path: l.path,
                distance_num: l.distance,
                distance: o.formatDistance(l.distance),
                transit_distance_num: l.transit_distance,
                transit_distance: o.formatDistance(l.transit_distance),
                walk_distance_num: l.walk_distance,
                walk_distance: o.formatDistance(l.walk_distance),
                time_num: l.time,
                time: o.formatTime(l.time),
                transferNum: p,
                cost: l.cost,
                feedBackUrl: s.dir(l.planTitle)
              }
            }), a.current = a.current || 0)
          }
          return a
        },
        addDirBusOverlays: function (t) {
          var e = amap.dirp, a = (e.frominfo.lnglat.split(","), e.toinfo.lnglat.split(","), []);
          a.push({type: "polyline", list: e.plans[t].segments}), a.push({
            type: "marker",
            list: e.plans[t].segments
          }), l.clearAllOverlays(), l.addOverlays(a)
        },
        doBus: function () {
          var t = this;
          i.isEmpty(amap.dirp.buslist) && i.isEmpty(amap.dirp.routelist) || (index = amap.busState.activeindex || "0", t.addDirBusOverlaysNew(index))
        },
        addDirBusOverlaysNew: function (t) {
          var e = amap.dirp, a = (e.frominfo.lnglat.split(","), e.toinfo.lnglat.split(","), []), i = null, n = null;
          if ("railway" == e.railtype) {
            if (!(e.routelist && e.routelist.length > 0))return;
            i = e.routelist[t].segmentlist, n = e.routelist[t].mapstops
          } else {
            if (!(e.buslist && e.buslist.length > 0))return;
            i = e.buslist[t].segmentlist, n = e.buslist[t].mapstops
          }
          a.push({type: "polyline", list: i}), a.push({type: "marker", list: n}), l.clearAllOverlays(), l.addOverlays(a)
        },
        getBusData: function (t) {
          var a, i = this, n = amap.dirnew, r = n.from, o = n.to, s = n.policy;
          if (n.type || "bus", "now" === n.dateTime) {
            var l = new Date, p = "";
            p += l.getFullYear() + "-", p += l.getMonth() + 1 + "-", p += l.getDate() + "|", p += (l.getHours() < 10 ? "0" + l.getHours() : l.getHours()) + "-", p += l.getMinutes() < 10 ? "0" + l.getMinutes() : l.getMinutes(), a = p.split("|")
          } else a = n.dateTime.split("|");
          var c = a[0] || "", d = a[1] || "", u = {night: 1, group: 1, pure_walk: 1, date: c, time: d, type: s, eta: 1};
          if (r.lnglat && o.lnglat) {
            var m = r.lnglat.split(","), h = o.lnglat.split(","), f = r.id && r.id.split("-")[0],
              g = o.id && o.id.split("-")[0], v = r.adcode, y = o.adcode, _ = {
                x1: m[0] || "",
                y1: m[1] || "",
                poiid1: f || "",
                ad1: v || "",
                x2: h[0] || "",
                y2: h[1] || "",
                poiid2: g || "",
                ad2: y || ""
              };
            u = e.extend(u, _), e.get(amap.service.navBus + e.param(u)).done(function (t) {
              amap.dirapip = e.extend(!0, {}, t), i.buildBusDataNew(t)
            })
          }
        },
        setDistence: function () {
          var t = amap.dirnew, e = t.from, a = t.to, i = e.lnglat.split(","), n = a.lnglat.split(","), r = [];
          r.push(i), r.push(n);
          var o = amap.getDistance(r);
          return o
        },
        buildBusDataNew: function (t) {
          var a = t.data, n = {}, r = this, s = amap.dirnew, l = s.from, p = s.to;
          if (a && "1" == a.code) {
            if (a.taxitime_text = o.formatTime(a.taxitime) || "", a.taxicost_text = o.formatCost(a.taxicost) || "", a.type = "bus", a.current = "0", a.frominfo = e.extend(!0, {}, s.from), a.frominfo.id = "marker-plan-0", a.toinfo = e.extend(!0, {}, s.to), a.frominfo.markerType = "marker-bus-from", a.frominfo.type = "from", a.frominfo.location = o.str2LngLat(a.frominfo.lnglat), a.toinfo.markerType = "marker-bus-to", a.toinfo.type = "to", a.toinfo.location = o.str2LngLat(a.toinfo.lnglat), "0" != a.count) {
              var d = a.buslist || a.taxilist;
              if (d.length > 0 && a.routelist.length > 0) a.railtype = "railway", a.count = a.routelist.length, c.buildRailroute(a), e.each(a.routelist, function (t, a) {
                var n = a.segments;
                if (!i.isEmpty(n)) {
                  c.fuseBusRail(a);
                  var r = 1;
                  e.each(n, function (t, a) {
                    var n = [];
                    "rail" == a.bustype ? n.push(a) : n = a.segmentlist, e.each(n, function (t, e) {
                      i.isEmpty(e.startinfo) || (e.startinfo.id = "marker-plan-" + r, r++), i.isEmpty(e.endinfo) || (e.endinfo.id = "marker-plan-" + r, r++)
                    })
                  })
                }
              }), n = a; else if (a.buslist.length > 0 && 0 == a.routelist.length) {
                var u = [], m = e.extend(!0, {}, a.frominfo), h = e.extend(!0, {}, a.toinfo);
                e.each(a.buslist, function (t, e) {
                  i.isEmpty(e.segmentlist) || u.push(c.buildBuslist(e, m, h))
                }), a.railtype = "bus", a.count = u.length, a.buslist = u, a.distanceNum = r.setDistence(), n = a
              } else n.type = "bus", n.msg = "no result", n.distanceNum = r.setDistence(), n.buslist = []
            }
          } else n.type = "bus", n.distanceNum = r.setDistence();
          l.id = l.id && l.id.split("-")[0] + "-from" || "from", p.id = p.id && p.id.split("-")[0] + "-to" || "to", amap.dirp = n, e(document).trigger("amap.dirp", n)
        },
        buildAlterBus: function (t) {
        },
        buildBuslist: function (t, a, n) {
          var r = e.extend(!0, {}, a);
          toinfo = e.extend(!0, {}, n), t.alllength = o.parseInt(t.allfootlength), t.allfootlength_text = o.formatDistance(t.allfootlength), t.expense_text = o.formatCost(t.expense), t.expensetime_text = o.formatTime(t.expensetime), t.min_tag_text = c.minTag[t.min_tag], t.min_tag_sign = c.minTagSign[t.min_tag], t.time_tag_text = c.timeTag[t.time_tag], t.endfootlength_text = o.formatDistance(t.endfootlength), t.endfoottime_text = o.formatTime(t.endfoottime), t.etastatus_text = c.etaStatus[t.etastatus] || "", t.etastatus_sign = c.etaStatusSign[t.etastatus] || "", t.transferNum = t.segmentlist && t.segmentlist.length, t.title = [];
          var l = t.endwalk;
          if (!i.isEmpty(l) && l.infolist.length > 0) {
            var p = [], d = 0;
            e.each(l.infolist, function (t, e) {
              p = p.concat(o.multiStr2Lnglat(e.coord)), d += o.parseInt(e.distance)
            }), l.end = t.segdest || "终点", l.sign = "end", l.foottime_text = t.endfoottime_text, l.path = p, l.distance_text = o.formatDistance(d), l.bustype = "walk", l.type = "walk", l.polyType = "poly-bus-walk"
          }
          var u = t.segmentlist, m = [], h = [];
          if (i.isEmpty(r) || h.push(r), u && u.length > 0) {
            var f = 1;
            e.each(u, function (a, n) {
              var r = null, s = [];
              n.segindex = a, "4" == n.bus_time_tag ? r = "(末班" + n.endtime + ")" : "3" == n.bus_time_tag && (r = "(首班" + n.starttime + ")"), s.push(n.bus_key_name), t.alllength += o.parseInt(n.driverlength), n.rgb = o.color2rgb(n.color), n.path = o.multiStr2Lnglat(n.drivercoord), n.driverlength_text = o.formatDistance(n.driverlength), n.drivertime_text = o.formatTime(n.drivertime), n.footlength_text = o.formatDistance(n.footlength), n.foottime_text = o.formatTime(n.foottime), n.bus_time_tag_text = c.busTimeTag[n.bus_time_tag], n.bustypepre = u[a - 1] && u[a - 1].bustype || "", n.busdirection = n.busname.split("--")[1].split(")")[0] || "", "0" != n.bus_time_tag && "0" == t.time_tag && (t.time_tag = n.bus_time_tag, t.time_tag_text = c.timeTag[t.time_tag]);
              var l = n.bustype;
              "1" == l || "5" == l || "6" == l || "7" == l || "8" == l || "16" == l || "17" == l || "18" == l ? (n.type = "bus", n.polyType = "poly-bus-bus") : (n.type = "subway", n.polyType = "poly-bus-subway");
              var p = {
                name: n.startname,
                id: "marker-plan-" + f,
                location: n.path[0],
                line: n.busname,
                lineid: n.busid,
                type: n.type,
                markerType: "marker-bus-" + n.type + "Stop",
                inport: n.inport,
                outport: n.outport,
                startname: n.startname,
                endname: n.endname
              };
              n.startinfo = e.extend(!0, {}, p), f++, h.push(e.extend(!0, {}, p));
              var d = {
                name: n.endname,
                id: "marker-plan-" + f,
                location: n.path[n.path.length - 1],
                line: n.busname,
                lineid: n.busid,
                type: n.type,
                markerType: "marker-bus-" + n.type + "Stop",
                inport: n.inport,
                outport: n.outport,
                startname: n.startname,
                endname: n.endname
              };
              n.endinfo = e.extend(!0, {}, d), f++, h.push(e.extend(!0, {}, d)), n.passdepot = [];
              var g = [];
              g = o.multiStr2Lnglat(n.passdepotcoord), passid = n.passdepotid.split(" "), passname = n.passdepotname.split(" "), e.each(g, function (t, e) {
                n.passdepot.push({name: passname[t], id: passid[t], coord: e})
              });
              var v = n.alterlist;
              if (i.isEmpty(v) || e.each(v, function (t, a) {
                  s.length < 3 && s.indexOf(a.bus_key_name) < 0 && s.push(a.bus_key_name), a.driverlength_text = o.formatDistance(a.driverlength), a.drivertime_text = o.formatTime(a.drivertime), a.footlength_text = o.formatDistance(a.footlength), a.foottime_text = o.formatTime(a.foottime), a.passdepot = [];
                  var i = [];
                  i = o.multiStr2Lnglat(a.passdepotcoord), passid = a.passdepotid.split(" "), passname = a.passdepotname.split(" "), e.each(i, function (t, e) {
                    a.passdepot.push({name: passname[t], id: passid[t], coord: e})
                  })
                }), t.title.push({
                  type: n.bustype,
                  name: s.length > 1 ? s.join("/") + "等" : s,
                  color: n.color,
                  time_tag: n.bus_time_tag,
                  time: r
                }), !i.isEmpty(n.eta)) {
                var y = o.multiStr2Lnglat(n.eta.etacoords);
                e.each(n.eta.lnk, function (t, e) {
                  var a = o.parseInt(e.sidx), i = o.parseInt(e.eidx);
                  e.path = y.slice(a, i)
                })
              }
              var _ = {};
              if ("1" == n.transfertype ? (_.type = "transfer", _.end = n.startname) : "2" == n.transfertype ? (_.type = "bustransfer", _.end = n.startname) : i.isEmpty(n.walk) || (_.type = "walk", _.end = n.startname), !i.isEmpty(n.walk)) {
                var w = n.walk;
                if (w.infolist.length > 0) {
                  var x = [], b = 0;
                  e.each(w.infolist, function (t, e) {
                    x = x.concat(o.multiStr2Lnglat(e.coord)), b += o.parseInt(e.distance)
                  }), w.path = x, w.distance = b, w.foottime = n.foottime, w.distance_text = o.formatDistance(b), w.foottime_text = n.foottime_text, _.path = x, _.polyType = "poly-bus-walk", _.distance_text = w.distance_text, _.foottime_text = w.foottime_text, _.dir = w.dir
                }
              }
              i.isEmpty(_) || m.push(_), m.push(n)
            })
          }
          if (t.allbuslength = Number(t.alllength) - Number(t.allfootlength), t.allbuslength_text = o.formatDistance(t.allbuslength), t.alllength_text = o.formatDistance(t.alllength), i.isEmpty(l) || m.push(l), i.isEmpty(toinfo) || h.push(toinfo), e.each(h, function (t, e) {
              e.stepCount = h.length
            }), r && (t.frominfo = r), toinfo && (t.toinfo = toinfo), e.each(h, function (t, e) {
              e.id = "marker-plan-" + t
            }), e.each(m, function (t, e) {
              e.segid = "poly-plan-" + t
            }), t.segmentlist = m, i.isEmpty(h)) t.mapstops = [], t.upstation = "未知"; else {
            t.mapstops = h;
            var g = h[1].name, v = h[1].inport && h[1].inport.name;
            "" != v && (g += "(" + v + "进)"), t.upstation = g
          }
          return t.feedBackUrl = s.dir(t.title), t
        },
        buildRailway: function (t) {
          var a = [], n = {};
          n.polyType = "poly-bus-rail", n.type = "railway", n.bustype = "railway", n.path = [];
          var r = t.price;
          if (r.price = {}, r) {
            var s = r.type.split(" "), l = r.value.split(" ");
            e.each(s, function (t, e) {
              c.priceType[e] && (r.price[c.priceType[e]] = l[t])
            })
          }
          var p = {};
          p.adcode = t.sad, p.location = new AMap.LngLat(t.scord.split(" ")[0], t.scord.split(" ")[1]), p.name = t.sst, p.id = t.sstid, p.markerType = "marker-bus-railwayStop", p.line = t.name, p.startname = t.sst, p.starttime = o.formatTime2Day(t.sint), p.endname = t.tst, p.endtime = o.formatTime2Day(t.tout), p.sin = t.sin, p.sint = t.sint, t.startinfo = e.extend(!0, {}, p), a.push(e.extend(!0, {}, p)), n.path.push(p.location);
          var d = [], u = "" == t.viastid ? null : t.viastid.split(" "), m = t.viast.split(" "),
            h = "" == t.viastcord ? "" : o.multiStr2LnglatCar(t.viastcord.split(" ")), f = t.viaint.split(" "),
            g = t.viawait.split(" ");
          u && e.each(u, function (t, e) {
            var a = {};
            a.name = m[t], a.wait = g[t], a.id = e, a.int = f[t], a.location = h[t], d.push(a), n.path.push(a.location)
          }), t.viainfo = d;
          var v = {};
          v.adcode = t.tad, v.location = new AMap.LngLat(t.tcord.split(" ")[0], t.tcord.split(" ")[1]), v.name = t.tst, v.id = t.tstid, v.markerType = "marker-bus-railwayStop", v.line = t.name, v.startname = t.sst, v.starttime = o.formatTime2Day(t.sint), v.endname = t.tst, v.endtime = o.formatTime2Day(t.tout), v.sin = t.tou, v.tout = t.tout, t.endinfo = e.extend(!0, {}, v), a.push(e.extend(!0, {}, v)), n.path.push(v.location), t.segmentlist = [], t.segmentlist.push(n), t.mapstops = a, t.sint_text = o.formatTime2Day(t.sint), t.tout_text = o.formatTime2Day(t.tout), t.railType = c.railType[t.type], t.dis_text = o.formatDistance(t.dis), t.time_text = o.formatTimeByMinute(t.time);
          var y = {};
          if (!i.isEmpty(t.alter)) {
            var _ = t.alter.id.split(" "), w = t.alter.name.split(" ");
            e.each(_, function (t, e) {
              y[e] = w[t]
            }), y.length = _.length
          }
          return t.alterinfo = y, t.hasover = !0, t
        },
        buildTaxilist: function (t) {
          var e = [], a = {};
          a.polyType = "poly-bus-taxi", a.type = "taxi", a.bustype = "taxi", a.path = [];
          var i = {};
          i.location = new AMap.LngLat(t.startpoint.split(",")[0], t.startpoint.split(",")[1]), i.name = t.sname, i.markerType = "marker-bus-taxistop", i.line = "出租车", i.startname = t.sname, i.endname = t.ename, t.startinfo = i, e.push(i), a.path.push(i.location), a.startinfo = i;
          var n = {};
          return n.location = new AMap.LngLat(t.endpoint.split(",")[0], t.endpoint.split(",")[1]), n.name = t.ename, n.markerType = "marker-bus-taxistop", t.endinfo = n, a.path.push(n.location), t.segmentlist = [], t.segmentlist.push(a), t.mapstops = e, t.length_text = o.formatDistance(t.length), t.drivetime_text = o.formatTime(t.drivetime), t.polycolor = t.color, t
        },
        fuseBusRail: function (t) {
          var a = t.segments, i = [], n = [], r = 0, s = amap.dirnew, l = e.extend(!0, {}, s.from),
            p = e.extend(!0, {}, s.to);
          return l.id = "marker-plan-0", l.markerType = "marker-bus-from", l.type = "from", l.location = o.str2LngLat(l.lnglat), p.markerType = "marker-bus-to", p.type = "to", p.location = o.str2LngLat(p.lnglat), i.push(e.extend(!0, {}, l)), e.each(a, function (t, o) {
            "bus" == o.bustype ? (t < a.length - 1 ? (o.seglast = !1, o.segdest = a[t + 1].sst) : o.seglast = !0, o = c.buildBuslist(o)) : "rail" == o.bustype ? (o.hasover || (o = c.buildRailway(o)), o.altercount ? r = o.altercount : r += o.alterinfo.length) : "taxi" == o.bustype && (o = c.buildTaxilist(o));
            var s = e.extend(!0, {}, o);
            i = i.concat(s.mapstops), n = n.concat(s.segmentlist)
          }), i.push(e.extend(!0, {}, p)), e.each(i, function (t, e) {
            e.id = "marker-plan-" + t
          }), e.each(n, function (t, e) {
            e.segid = "poly-plan-" + t
          }), t.recommend.altercount = r, t.mapstops = [].concat(i), t.segmentlist = [].concat(n), t
        },
        buildRailroute: function (t) {
          var a = t.routelist, n = t.buslist, r = t.taxilist;
          i.isEmpty(a) || e.each(a, function (t, a) {
            a.distance_text = o.formatDistance(a.distance), a.cost_text = o.formatCost(a.cost), a.time_text = o.formatTimeByMinute(a.time);
            var i = a.segments, s = [], l = [], p = {};
            e.each(i, function (t, a) {
              e.each(a, function (t, a) {
                if ("bus" == a[0]) {
                  var i = e.extend(!0, {}, n[Number(a[1])]);
                  i.bustype = "bus", s.push(i)
                } else if ("railway" == a[0]) {
                  var o = e.extend(!0, {}, a[1]);
                  o.bustype = "rail", l.indexOf(o.sst) < 0 && l.push(o.sst), p.name || (p.name = o.trip), l.push(o.tst), s.push(o)
                } else if ("taxi" == a[0]) {
                  var c = e.extend(!0, {}, r[Number(a[1])]);
                  c.bustype = "taxi", s.push(c)
                }
              })
            }), a.segments = s, a.plantitle = l, a.recommend = p
          })
        },
        alterBusline: function (t) {
        },
        getAlterRail: function (t, a, n) {
          if (i.isEmpty(t)) p.warning("抱歉，暂时未查询到其他车次！"); else {
            var r = t.sstid, o = t.tstid, s = (t.order, {pagenum: "1", pagesize: "100"});
            s = e.extend(s, t), e.get(amap.service.busRailway + e.param(s)).done(function (t) {
              if ("1" == t.status) {
                var s = t.data.railways;
                i.isEmpty(s) ? p.warning("抱歉，暂时未查询到其他车次！") : (e.each(s, function (t, e) {
                  e.altercount = s.length - 1, c.buildRailway(e)
                }), t.data.from = r, t.data.to = o, t.data.defaultorder = n, t.data.alterindex = a || "", amap.alterBus = t)
              }
            })
          }
        },
        showAlterBox: function (t) {
          n.tplLoad({
            filename: "dir-plan-busalter", data: t, callback: function (t) {
              $modal = e("#amap_panel_model");
              var a = e(".planlist_wrap").height() + 56, i = a - 92;
              i > 438 && (i = 438), $modal.html("").html(t).show();
              var n = e("#alter_list");
              n.css("height", i + "px"), amap.slimscroll(n, {height: i, staticHeight: !0})
            }
          })
        },
        hideAlterBox: function (t) {
          $modal = e("#amap_panel_model"), $modal.html("")
        },
        refreshAlterBox: function (t) {
          n.tplLoad({
            filename: "dir-plan-busalterlist", data: t, callback: function (t) {
              $modal = e("#alter_list"), $modal.html("").html(t).show()
            }
          })
        },
        dirBusNew: function (t, e) {
          var a = this;
          a.getBusData()
        }
      };
      t.exports = c, watch(amap, "alterBus", function () {
        var t = amap.alterBus;
        if ("1" == t.status) {
          var e = t.data;
          e.defaultorder ? c.showAlterBox(e) : c.refreshAlterBox(e)
        }
      })
    }).call(e, a(1), a(5), a(14))
  }, 66: function (t, e, a) {
    (function (e, i) {
      var n = a(11), r = a(30), o = a(9), s = a(67), l = a(7), p = {
        action_sign: {
          "直行": "0",
          "左转": "1",
          "右转": "2",
          "向左前方行驶": "3",
          "向右前方行驶": "4",
          "向左后方行驶": "5",
          "向右后方行驶": "6",
          "左转调头": "7",
          "直行": "8",
          "靠左": "9",
          "靠右": "10",
          "进入环岛": "11",
          "离开环岛": "12",
          "减速行驶": "13",
          "直行": "14"
        }, setDragRouteOpt: function (t, a) {
          var i = amap.dirnew, n = i.from.lnglat.split(","), r = i.to.lnglat.split(","), o = {
            size: new AMap.Size(25, 34),
            imageOffset: new AMap.Pixel(-9, -3),
            image: "/assets/img/poi-marker.png",
            imageSize: new AMap.Size(437, 267)
          }, s = {
            size: new AMap.Size(36, 34),
            imageOffset: new AMap.Pixel(-53, -3),
            image: "/assets/img/poi-marker.png",
            imageSize: new AMap.Size(437, 267)
          }, l = {
            size: new AMap.Size(25, 34),
            imageOffset: new AMap.Pixel(-97, -3),
            image: "/assets/img/poi-marker.png",
            imageSize: new AMap.Size(437, 267)
          }, p = new AMap.Icon(o), c = new AMap.Icon(l), d = new AMap.Icon(s), u = {
            startMarkerOptions: {
              visible: !1,
              position: new AMap.LngLat(n[0], n[1]),
              icon: p,
              offset: new AMap.Pixel(-14, -28)
            },
            midMarkerOptions: {icon: d, offset: new AMap.Pixel(-14, -28)},
            endMarkerOptions: {
              visible: !1,
              position: new AMap.LngLat(r[0], r[1]),
              icon: c,
              offset: new AMap.Pixel(-14, -28)
            },
            polyOptions: {
              isOutline: !0,
              outlineColor: "#fff",
              strokeWeight: 6,
              opacity: 1,
              zIndex: 9,
              lineCap: "round",
              lineJoin: "round",
              visible: t
            }
          };
          return a && e.extend(u, {thinning: 10}), u
        }, dirCar: function (t) {
          var a = this, r = n, o = amap.dir.from, s = amap.dir.to, l = amap.dir.via || [], p = amap.dir.policy;
          amap.dir.type || "car", a.from = amap.dir.from, a.to = amap.dir.to, a.via = amap.dir.via, a.policy = amap.dir.policy, a.routetype = amap.dir.type || "car", themap.plugin(["AMap.DragRoute", "AMap.DragRoutePC"], function () {
            var t = a.setDragRouteOpt(), n = [], c = o.modxy, d = o.lnglat, u = null;
            u = c ? new AMap.LngLat(c.split(",")[0], c.split(",")[1]) : new AMap.LngLat(d.split(",")[0], d.split(",")[1]), n.push(u), l && l.length > 0 && e.each(l, function (t, e) {
              if (!i.isEmpty(e)) {
                var a = e.modxy, r = e.lnglat, o = null;
                o = a ? new AMap.LngLat(a.split(",")[0], a.split(",")[1]) : new AMap.LngLat(r.split(",")[0], r.split(",")[1]), n.push(o)
              }
            });
            var m = s.modxy, h = s.lnglat, f = null;
            f = m ? new AMap.LngLat(m.split(",")[0], m.split(",")[1]) : new AMap.LngLat(h.split(",")[0], h.split(",")[1]), n.push(f);
            var g = null;
            r.dragRoute ? g = r.dragRoute : (g = r.dragRoute = new AMap.DragRoute(themap, n, p, t), AMap.event.addListener(g, "complete", function (t) {
              var n = t.data, o = a.from, s = a.to, l = a.via, p = a.policy, c = a.routetype;
              if ("OK" == n.info) {
                var d, u, m, h = r.driveStart = g.getStart(), f = r.driveEnd = g.getEnd(), v = g.getPoint(),
                  y = i.clone(g.getWays()), _ = [], w = !1, x = !1, b = !1, L = null, k = o.modxy || o.lnglat,
                  D = s.modxy || s.lnglat, T = !1, C = !1;
                if (y.length >= 3 && v.setDraggable(!1), amap.direction.refwd)if (r.viaPath && y.length < r.viaPath.length) T = a.deleIndex(y, r.viaPath); else if (r.viaPath && y.length == r.viaPath.length) {
                  var P = null;
                  Number(n.origin.lng) - Number(k.split(",")[0]) != 0 && Number(n.origin.lat) - Number(k.split(",")[1]) != 0 && (d = n.origin, P = d, w = !0, L = "from"), Number(n.destination.lng) - Number(D.split(",")[0]) != 0 && Number(n.destination.lat) - Number(D.split(",")[1]) != 0 && (u = n.destination, P = u, x = !0, L = "to");
                  for (var M = null, A = 0; A < y.length; A++)if (y[A].lng != r.viaPath[A].lng || y[A].lat != r.viaPath[A].lat) {
                    M = A, m = y[M], r.viaPath = y, P = m, b = !0, L = "via";
                    break
                  }
                } else r.viaPath && y.length > r.viaPath.length && (C = a.addIndex(y, r.viaPath), r.viaPath = y);
                if (T !== !1) {
                  l.splice(T, 1);
                  var E = {type: c, policy: p, from: o, to: s, via: l};
                  amap.fwd("/dir?" + e.param(E))
                } else if (C !== !1) {
                  var _ = y[C];
                  L = "via";
                  var S = function (t) {
                    l.length == y.length || l.splice(C, 0, t);
                    var a = {type: c, policy: p, from: o, to: s, via: l};
                    amap.fwd("/dir?" + e.param(a))
                  };
                  a.planRegeo({pos: _, type: L}, S)
                } else if (w || x || b) {
                  var _ = P, S = function (t) {
                    w && (o = t), x && (s = t), b && (l[M] = t);
                    var a = {type: c, policy: p, from: o, to: s, via: l};
                    amap.fwd("/dir?" + e.param(a))
                  };
                  a.planRegeo({pos: _, type: L}, S)
                } else {
                  r.viaPath = g.getWays() || [], o.id = !i.isEmpty(o.id) && o.id.split("-")[0] + "-from" || "from", s.id = !i.isEmpty(s.id) && s.id.split("-")[0] + "-to" || "to", n.frominfo = o, n.toinfo = s, n.viainfo = l;
                  var R = a.buildCarData(n);
                  amap.direction.refwd = !0, amap.dirp = R, e(document).trigger("amap.dirp", R), g.addListen || (AMap.event.addListener(h, "click", function (t) {
                    amap.carState.active = "start"
                  }), AMap.event.addListener(f, "click", function (t) {
                    amap.carState.active = "end"
                  }), g.addListen = !0)
                }
              }
            }), AMap.event.addListener(g, "error", function (t) {
              amap.dirp = null
            })), g.search(n, p, t)
          })
        }, dirCarNew: function (t) {
          var a = this, n = amap.dirnew, r = [], o = n.from.lnglat.split(",");
          r.push(o);
          var s = n.via;
          i.isEmpty(s) || e.each(s, function (t, e) {
            var a = e.lnglat.split(",");
            r.push(a)
          });
          var l = n.to.lnglat.split(",");
          r.push(l);
          var p = amap.getDistance(r), t = {engine_version: "3", policy2: n.policy};
          1e5 - p < 0 ? a.dirDragRoute(t, !0) : a.dirDragRoute(t, !1)
        }, dirDragRoute: function (t, a) {
          var r = this, o = n, s = amap.dirnew;
          r.thin = a, s.from, s.to, s.via || [], s.policy, s.type || "car", r.from = s.from, r.to = s.to, r.via = s.via, r.policy = s.policy, r.routetype = s.type || "car", themap.plugin(["AMap.DragRoutePC"], function () {
            function n (t) {
              var a = function (t) {
                t.policy = s.policy, amap.dirp = t, e(document).trigger("amap.dirp", t)
              };
              t && 1 == t.status && t.data ? r.dirDragRouteComplete(h, t, a) : t && 6 == t.status ? amap.goTraffitor(t) : (amap.dirp = null, e(".line-search-submit").removeClass("butLoading"), "ROUTE_FAIL" == t.data ? l.warning("路线请求失败，请稍后重试") : "OUT_OF_SERVICE" == t.data ? l.warning("终点不在支持范围内") : l.warning("抱歉，服务超时，请您稍后再试！"))
            }

            var p = r.setDragRouteOpt(!0, a), c = [], d = r.getDirCarFromend("from");
            c.push(d);
            var u = r.getDirCarVia();
            i.isEmpty(u) || e.each(u, function (t, e) {
              c.push(e)
            });
            var m = r.getDirCarFromend("to");
            c.push(m);
            var h = null;
            h = new AMap.DragRoute(themap, p), setTimeout(function () {
              o.dragRoute = h
            }, 0), AMap.event.addListener(h, "complete", function (t) {
              n(t)
            }), AMap.event.addListener(h, "error", function (t) {
              n(t)
            }), h.search(c, t)
          })
        }, dirLongDragRoute: function (t, a) {
          var r = this, o = n;
          amap.dir.from, amap.dir.to, amap.dir.via || [], amap.dir.policy, amap.dir.type || "car", r.from = amap.dir.from, r.to = amap.dir.to, r.via = amap.dir.via, r.policy = amap.dir.policy, r.routetype = amap.dir.type || "car", themap.plugin(["AMap.DragRoutePC"], function () {
            var n = r.setDragRouteOpt(!1, a), s = [], l = r.getDirCarFromend("from");
            s.push(l);
            var p = r.getDirCarVia();
            i.isEmpty(p) || e.each(p, function (t, e) {
              s.push(e)
            });
            var c = r.getDirCarFromend("to");
            s.push(c);
            var d = null;
            d = o.dragRouteLong = new AMap.DragRoute(themap, n), AMap.event.addListener(d, "complete", function (t) {
              var e = function (t) {
                amap.dirplong = t, amap.isdirplong = !0
              };
              r.dirDragRouteComplete(d, t, e)
            }), AMap.event.addListener(d, "error", function (t) {
              amap.dirplong = null
            }), d.search(s, t)
          })
        }, showLongDragRoute: function () {
          var t = n;
          t.dragRouteLong.getPolyline().show(), t.dragRoute.getPolyline().hide()
        }, dirDragRouteComplete: function (t, a, r) {
          var o = this, s = n, l = a.data || {}, p = a.origin, c = a.destination, d = amap.dirnew,
            u = amap.directionnew, m = d.from, h = d.to, f = d.via, g = d.policy, v = d.type || "car";
          if ("1" == l.code) {
            var y, _, w, x = s.driveStart = t.getStart(), b = s.driveEnd = t.getEnd(), L = t.getPoint(),
              k = i.clone(t.getWays()), D = [], T = !1, C = !1, P = !1, M = null, A = m.modxy || m.lnglat,
              E = h.modxy || h.lnglat, S = !1, R = !1;
            if (k.length >= 3 && L.setDraggable(!1), u.refwd)if (s.viaPath && k.length < s.viaPath.length) S = o.deleIndex(k, s.viaPath); else if (s.viaPath && k.length == s.viaPath.length) {
              var N = null;
              Number(p.lng) - Number(A.split(",")[0]) != 0 && Number(p.lat) - Number(A.split(",")[1]) != 0 && (y = p, N = y, T = !0, M = "from"), Number(c.lng) - Number(E.split(",")[0]) != 0 && Number(c.lat) - Number(E.split(",")[1]) != 0 && (_ = c, N = _, C = !0, M = "to");
              for (var B = null, O = 0; O < k.length; O++)if (k[O].lng != s.viaPath[O].lng || k[O].lat != s.viaPath[O].lat) {
                B = O, w = k[B], s.viaPath = k, N = w, P = !0, M = "via";
                break
              }
            } else s.viaPath && k.length > s.viaPath.length && (R = o.addIndex(k, s.viaPath), s.viaPath = k);
            if (S !== !1) {
              f.splice(S, 1);
              var I = {type: v, policy: g, from: m, to: h, via: f};
              amap.fwd("/dir?" + e.param(I))
            } else if (R !== !1) {
              var D = k[R];
              M = "via";
              var r = function (t) {
                f.length == k.length || f.splice(R, 0, t);
                var a = {type: v, policy: g, from: m, to: h, via: f};
                amap.fwd("/dir?" + e.param(a))
              };
              o.planRegeo({pos: D, type: M}, r)
            } else if (T || C || P) {
              var D = N, r = function (t) {
                T && (d.from = t), C && (d.to = t), P && (d.via[B] = t), amap.fwd("/dir")
              };
              o.planRegeo({pos: D, type: M}, r)
            } else {
              s.viaPath = t.getWays() || [], i.isEmpty(m.id) || "from" == m.id ? m.id = Date.parse(new Date) + "-from" : m.id = m.id.split("-")[0] + "-from", i.isEmpty(h.id) || "to" == h.id ? h.id = Date.parse(new Date) + "-to" : h.id = h.id.split("-")[0] + "-to", l.frominfo = e.extend({}, !0, m), l.toinfo = e.extend({}, !0, h), l.viainfo = e.extend({}, !0, f);
              var H = o.buildCarDataNew(l);
              u.refwd = !0, r(H);
              var W = new AMap.LngLat(m.lnglat.split(",")[0], m.lnglat.split(",")[1]),
                F = new AMap.LngLat(h.lnglat.split(",")[0], h.lnglat.split(",")[1]);
              i.delay(function () {
                x.setPosition(W), x.show(), b.setPosition(F), b.show()
              }, 10), t.addListen || (AMap.event.addListener(x, "click", function (t) {
                amap.carState.active = "start"
              }), AMap.event.addListener(b, "click", function (t) {
                amap.carState.active = "end"
              }), t.addListen = !0)
            }
          }
        }, getDirCarFromend: function (t) {
          var e = null, a = amap.dirnew;
          "from" == t ? e = a.from : "to" == t && (e = a.to);
          var n = e.lnglat.split(","), r = e.poitype, o = e.id && e.id.split("-")[0] || "";
          return i.isEmpty(e.modxy) || (n = e.modxy.split(",")), {lng: Number(n[0]), lat: Number(n[1]), type: r, pid: o}
        }, getDirCarVia: function () {
          var t = amap.dirnew, a = t.via, n = [];
          return a && a.length > 0 && e.each(a, function (t, e) {
            if (!i.isEmpty(e)) {
              var a = e.lnglat.split(","), r = e.id;
              i.isEmpty(e.modxy) || (a = e.modxy.split(",")), n.push({lng: Number(a[0]), lat: Number(a[1]), pid: r})
            }
          }), n
        }, buildCarData: function (t) {
          var a = n, o = {};
          if (o.type = "car", o.frominfo = t.frominfo, o.toinfo = t.toinfo, "OK" == t.info && t.routes.length > 0) {
            var s = t.origin, l = t.destination;
            o.routes = r.parseRoutes(t.routes), e.each(o.routes, function (n, o) {
              var p = [];
              o.planTitle = [];
              try {
                var c = i.clone(t.viainfo)
              } catch (t) {
              }
              e.each(o.steps, function (t, e) {
                if ("到达途经地" === e.assistant_action) {
                  var a = o.steps, i = {
                    start_location: a[t + 1].path[0],
                    end_location: a[t + 1].path[0],
                    instruction: "",
                    orientation: "",
                    road: "",
                    distance: 0,
                    tolls: 0,
                    toll_distance: 0,
                    toll_road: "",
                    time: 0,
                    path: [a[t + 1].path[a[t + 1].path.length - 1]],
                    action: "到达途经地",
                    assistant_action: "",
                    signs: a[t].signs,
                    polyType: "poly-drive",
                    name: c.pop().name
                  };
                  p.push(i), e.assistant_action = ""
                } else p.push(e)
              }), e.each(p, function (t, e) {
                o.steps, e.signs || (e.signs = a.routeSign[e.action] || "advance"), e.polyType = "poly-drive", e.id = "step-" + t, "" != e.road && o.planTitle.indexOf(e.road) < 0 && o.planTitle.push(e.road)
              }), o.steps = p, o.origin = s, o.destination = l, o.taxi_cost = 0, o.distanceNum = o.distance, o.distance = r.formatDistance(o.distance), o.time_num = o.time, o.time = r.formatTime(o.time), o.feedBackUrl = feedback.dir()
            }), o.current = t.current || 0
          } else o.feedBackUrl = feedback.dir();
          return o
        }, buildCarDataNew: function (t) {
          var a = this, o = n;
          t.type = "car";
          var s = t.path_list;
          if (!i.isEmpty(s)) {
            var l = t.cost && t.cost.split(",") || [], p = t.distance && t.distance.split(",") || [],
              c = t.drivetime && t.drivetime.split(",") || [], d = t.strategy && t.strategy.split(","),
              u = t.trafficlights && t.trafficlights.split(",") || [];
            e.each(s, function (t, n) {
              var s = n.path;
              n.cost = l[t] || "", n.cost_text = r.formatCost(l[t]), n.distance = p[t], n.distance_text = r.formatDistance(p[t]), n.drivetime = c[t], n.drivetime_text = r.formatTime(c[t]), n.strategy = d[t], n.trafficlights = u[t] || "", n.steps = [], n.path_title = a.setPlanTitle(s), e.each(s, function (t, a) {
                a.segments && !i.isEmpty(a.segments) || (a.segments = [], a.segments.push(e.extend(!0, {}, a))), a.name = a.name || !i.isEmpty(a.segments) && a.segments[0].name || "无名道路", a.action = a.action || !i.isEmpty(a.segments) && a.segments[0].action || "0", a.length = r.formatDistance(a.length), a.actionName = o.action[a.action], a.signs = o.routeSign[a.actionName], a.segments && !i.isEmpty(a.segments) || (a.segments = [], a.segments.push(a));
                var s = a.segments;
                e.each(s, function (t, e) {
                  e.action = e.action || "0", e.length = r.formatDistance(e.length), e.actionName = o.action[e.action], e.signs = o.routeSign[e.actionName], e.path = r.multiStr2LnglatCar(e.coor), e.start_location = e.path[0], e.polyType = "poly-drive", n.steps.push(e)
                }), e.each(n.steps, function (t, e) {
                  e.id = "step-" + t
                })
              })
            })
          }
          return t
        }, setPlanTitle: function (t) {
          var a = e.extend([], !0, t);
          e.each(a, function (t, e) {
            e.nameid = t
          }), a.length > 0 && a.sort(function (t, e) {
            return e.length - t.length
          });
          var i = a.splice(0, 3);
          i.sort(function (t, e) {
            return t.nameid - e.nameid
          });
          var n = [];
          return e.each(i, function (t, e) {
            n.push({length: e.length, name: e.name})
          }), n
        }, addDirCarOverlays: function (t) {
          var e = amap.dirp, a = e.frominfo.lnglat.split(","), i = e.toinfo.lnglat.split(","), n = [];
          n.push({type: "polyline", list: e.routes[t].steps}), n.push({
            type: "marker",
            list: [{
              id: e.toinfo.id,
              location: new AMap.LngLat(i[0], i[1]),
              markerType: "marker-drive-to",
              name: e.toinfo.name
            }, {
              id: e.frominfo.id,
              location: new AMap.LngLat(a[0], a[1]),
              markerType: "marker-drive-from",
              name: e.frominfo.name
            }]
          }), o.clearAllOverlays(!0), o.addOverlays(n)
        }, addDirCarOverlaysNew: function (t, e) {
          var e = amap.dirp, a = e.frominfo.lnglat.split(","), i = e.toinfo.lnglat.split(","), n = [];
          e.path_list && e.path_list.length > 0 && (n.push({
            type: "polyline",
            list: e.path_list[t].steps
          }), n.push({
            type: "marker",
            list: [{
              id: e.toinfo.id,
              location: new AMap.LngLat(i[0], i[1]),
              markerType: "marker-drive-to",
              name: e.toinfo.name
            }, {
              id: e.frominfo.id,
              location: new AMap.LngLat(a[0], a[1]),
              markerType: "marker-drive-from",
              name: e.frominfo.name
            }]
          }), o.clearAllOverlays(!0), o.addOverlays(n))
        }, setCarRoute: function (t) {
          var a = n, i = a.dragRoute;
          i && (a.polylineRouteTmc[t] && e.each(a.polylineRouteTmc[t], function (t, e) {
            e.setOptions({zIndex: 20})
          }), i.showRoute(t))
        }, showAllRoute: function () {
          var t = amap.carState.activeindex || "0", a = amap.dirp.routes, i = [], n = [];
          e.each(a, function (a, i) {
            if (a != t) {
              var r = i.steps, o = [];
              e.each(r, function (t, e) {
                var a = e.path || [];
                o = o.concat(a)
              }), n.push({index: a, path: o})
            }
          }), i.push({type: "polyline-route", list: n}), o.addOverlays(i, "noset")
        }, showAllRouteNew: function (t) {
          var a = this, i = amap.carState.activeindex || "0", n = t.path_list, r = [], l = [];
          e.each(n, function (t, a) {
            if (t != i) {
              var n = a.steps, r = [];
              e.each(n, function (t, e) {
                var a = e.path || [];
                r = r.concat(a)
              }), l.push({index: t, path: r})
            }
          }), r.push({type: "polyline-route", list: l}), o.addOverlays(r, "noset"), s.processData(a.thin)
        }, showAllRoutesTmc: function () {
          var t = n, a = amap.carState.activeindex || "0", i = t.dragRoute.getRoutes();
          e.each(i, function (i, n) {
            var r = n.polylines;
            i != a ? (t.polylineRouteTmc[i] = [], e.each(r, function (e, a) {
              t.polylineRouteTmc[i].push(a), a.setOptions({zIndex: 6}), a.setMap(themap)
            })) : e.each(r, function (t, e) {
              e.setOptions({zIndex: 10})
            })
          })
        }, showAllRoutesTmcNew: function () {
          var t = n, a = amap.carState.activeindex || "0", r = t.dragRoute.getRoutes();
          r && e.each(r, function (n, r) {
            var o = r.polylines;
            i.isEmpty(o) || (n != a ? (t.polylineRouteTmc[n] = [], e.each(o, function (e, a) {
              t.polylineRouteTmc[n].push(a), a.setOptions({strokeOpacity: .9, zIndex: 6}), a.setMap(themap)
            })) : e.each(o, function (t, e) {
              e.setOptions({zIndex: 10})
            }))
          })
        }, showAllRouteLongTmc: function () {
          var t = n, a = amap.carState.activeindex || "0", r = t.dragRouteLong.getRoutes();
          r && e.each(r, function (n, r) {
            var o = r.polylines;
            i.isEmpty(o) || (n != a ? (t.polylineRouteTmc[n] = [], e.each(o, function (e, a) {
              t.polylineRouteTmc[n].push(a), a.setOptions({strokeOpacity: .9, zIndex: 6}), a.setMap(themap)
            })) : e.each(o, function (t, e) {
              e.setOptions({zIndex: 10})
            }))
          })
        }, deleIndex: function (t, a) {
          var i, r = n, o = [];
          if (1 == r.viaPath.length && (r.viaPath = []), t.length > a.length) _arr = t, i = a; else {
            if (!(t.length < a.length))return !1;
            _arr = a, i = t
          }
          for (var s = 0; s < _arr.length; s++)if (i.length > 0) {
            var l = !1;
            e.each(i, function (t, e) {
              e == _arr[s] && (l = !0)
            }), l || o.push(s)
          } else o.push(0);
          return 1 == o.length && o[0]
        }, addIndex: function (t, a) {
          var i, n = [];
          if (t.length > a.length) _arr = t, i = a; else {
            if (!(t.length < a.length))return !1;
            _arr = a, i = t
          }
          for (var r = 0; r < _arr.length; r++)if (i.length > 0) {
            var o = !1;
            e.each(i, function (t, e) {
              e == _arr[r] && (o = !0)
            }), o || n.push(r)
          } else n.push(0);
          return 1 == n.length && n[0]
        }
      };
      t.exports = p
    }).call(e, a(1), a(5))
  }, 67: function (t, e, a) {
    var i = a(9), n = a(69), r = 3, o = 3, s = {
      formatData: function (t) {
        return t
      }, getWithHeight: function (t) {
        var e = amap.dirp.path_list[t], a = 130, i = 24;
        if (e) {
          var n = e.drivetime_text.length;
          a = 10 * n + 10 + 46
        }
        return {width: a, height: i}
      }, getLongerLen: function (t, e) {
        var a = t.length, i = e.length;
        return a >= i ? a : i
      }, getDiffData: function (t, e) {
        for (var a = {}, i = [], n = 0; n < e.length; n++)a[e[n].toString()] = 1;
        for (var r = 0; r < t.length; r++)a[t[r]] || i.push(t[r]);
        return a = {}, i
      }, getDiffPos: function (t, e) {
        for (var a, i, n = this, r = n.getLongerLen(t, e), o = [], s = [], l = 0; l < r; l++)t[l] && (o = o.concat(t[l].path || t)), e[l] && (s = s.concat(e[l].path || e));
        return a = n.getDiffData(o, s), i = n.getDiffData(s, o), a = a.length ? a : o, i = i.length ? i : s, [a, i]
      }, getDiffPath: function (t, e) {
        for (var a = this, i = a.getLongerLen(t, e), n = [], r = [], o = [], s = [], l = [], p = [], c = 0; c < i; c++)t[c] && (n.push(t[c].name), o.push(t[c].name + "-" + t[c].length)), e[c] && (r.push(e[c].name), s.push(e[c].name + "-" + e[c].length));
        for (var d = 0; d < i; d++)n[d] && r.indexOf(n[d]) == -1 && l.push(t[d]), r[d] && n.indexOf(r[d]) == -1 && p.push(e[d]);
        if (l.length && p.length)return [l, p];
        for (var u = 0; u < i; u++)o[u] && s.indexOf(o[u]) == -1 && l.push(t[u]), s[u] && o.indexOf(s[u]) == -1 && p.push(e[u]);
        return [l, p]
      }, getPathPos: function (t, e, a) {
        var i, n, r, o, s, l, p, c = this, d = [], u = 0, m = 0;
        i = c.getPercent(t, e);
        for (var h = 0; h < a.length; h++)n = a[h], r = n.length, r = getLength(r), d.push(r), u += r;
        for (var f = 0; f < d.length; f++)if ((m += d[f]) >= u * i) {
          m -= d[f];
          break
        }
        for (var g, v = a[f].segments || [], y = 0; y < v.length; y++)if (g = v[y], r = g.length, r = getLength(r), (m += r) >= u * i) {
          m -= r, o = v[y].path || [], s = o.length, l = Math.floor(r / s), p = Math.ceil((u * i - m) / l);
          break
        }
        return y != v.length || o || (o = v[v.length - 1].path || [], p = o.length - 1), o[p] ? o[p] : o[p - 1]
      }, checkCollision: function (t) {
        var e, a, i, n, r, o, s = this, l = t.length;
        if (l < 2)return !1;
        e = t[l - 2], a = t[l - 1], i = s.getWithHeight(l - 2), n = s.getWithHeight(l > amap.dirp.path_list.length ? 0 : l - 1), r = themap.lngLatToContainer(e), o = themap.lngLatToContainer(a);
        var p = r.x + i.width / 2 < o.x - n.width / 2 || r.x - i.width / 2 > o.x + n.width / 2 || r.y - i.height > o.y || r.y < o.y - n.height;
        return !p
      }, addTip: function (t) {
        for (var e = this, a = [], n = 0; n < t.length; n++)a.push({
          id: "plan-tip" + (n + 1),
          location: t[n],
          markerType: "marker-plan-notice",
          name: "方案" + (n + 1),
          width: e.getWithHeight(n).width,
          duration: amap.dirp.path_list[n].drivetime_text
        });
        var r = [];
        r.push({type: "marker", list: a}), i.addOverlays(r)
      }, getPercent: function (t, e) {
        var a, i, n, s, l = this;
        if (2 == l.planNum) s = r; else if (s = o, 2 == t)return .55;
        return a = e / 2 | 0, i = e % 2, n = i ? 0 == t ? (s + a - 1) / (s + a) : 1 - (s + a - 1) / (s + a) : 0 == t ? 1 / (s + a) : 1 - 1 / (s + a)
      }, getStepsPos: function (t, e, a) {
        var i = this, n = i.getPercent(t, e), r = a.length, o = r * n | 0;
        return a[o]
      }, getPos: function () {
        var t = this;
        return t.getStepsPos
      }, getTipPos: function (t) {
        for (var e, a = this, i = [], n = 0, r = a.getPos().bind(a), o = t.length, s = 0; s <= o; s++) {
          var l = t[s] || [];
          s == o && (l = t[0]), l.length && (e = s == o ? i[0] : r(s, n, l), i.push(e), a.checkCollision(i) && n < 10 && (i = [], s = -1, n++), i.length == o + 1 && i.pop())
        }
        return i
      }, initWebWorker: function (t) {
        var e, a = this;
        if (a.tipWorker) e = a.tipWorker; else {
          var i = new Blob(["(" + n.toString() + ")()"]), r = window.URL.createObjectURL(i);
          e = a.tipWorker = new Worker(r), e.onmessage = function (t) {
            var e = t.data, i = a.formatData(e);
            if (i.length) {
              var n = a.getTipPos(i);
              a.addTip(n)
            }
          }
        }
        e.postMessage(t)
      }, processData: function (t) {
        var e = this, a = amap.dirp && amap.dirp.path_list || [];
        if (window.Worker && window.Blob && window.URL.createObjectURL) e.initWebWorker(a); else if (!t) {
          var i = [];
          switch (e.planNum = a.length, e.planNum) {
            case 1:
              return;
            case 2:
              i = i.concat(e.getDiffPos(a[0].steps, a[1].steps));
              break;
            case 3:
              var n = e.getDiffPos(a[0].steps, a[1].steps.concat(a[2].steps)),
                r = e.getDiffPos(a[1].steps, a[2].steps.concat(a[0].steps)),
                o = e.getDiffPos(a[2].steps, a[0].steps.concat(a[1].steps));
              i = [n[0], r[0], o[0]]
          }
          var s = e.getTipPos(i);
          e.addTip(s)
        }
      }, init: function () {
      }
    };
    t.exports = s
  }, 68: function (t, e, a) {
    (function (e, i) {
      var n = a(11), r = a(30), o = a(27), s = a(9), l = {
        dirWalk: function (t) {
          var a = this, i = amap.dirnew, n = i.from, r = i.to, o = (i.policy, n.modxy, n.lnglat), s = null,
            l = (r.modxy, r.lnglat), p = null, c = [], d = o.split(","), u = l.split(",");
          c.push(d), c.push(u);
          var m = amap.getDistance(c);
          if (m > 1e5) {
            var h = {};
            return n.id = n.id && n.id.split("-")[0] + "-from" || "from", r.id = r.id && r.id.split("-")[0] + "-to" || "to", h.frominfo = n, h.toinfo = r, h.type = "walk", h.nodirp = "true", h.routes = [{distanceNum: m}], amap.dirp = h, void e(document).trigger("amap.dirp", h)
          }
          AMap.service(["AMap.Walking"], function () {
            o && (s = new AMap.LngLat(o.split(",")[0], o.split(",")[1])), l && (p = new AMap.LngLat(l.split(",")[0], l.split(",")[1]));
            var t = new AMap.Walking;
            amap.walking = t, t.search(s, p), AMap.event.addListener(t, "complete", function (t) {
              var i = a.buildWalkData(t);
              n.id = n.id && n.id.split("-")[0] + "-from" || "from", r.id = r.id && r.id.split("-")[0] + "-to" || "to", i.frominfo = n, i.toinfo = r, amap.dirp = i, e(document).trigger("amap.dirp", i)
            }), AMap.event.addListener(t, "error", function (t) {
              t.frominfo = n, t.toinfo = r, t.type = "walk", t.nodirp = "true", "20803" == t.infocode ? t.routes = [{distanceNum: 100001}] : t.routes = {routes: []}, amap.dirp = t, e(document).trigger("amap.dirp", amap.dirp)
            })
          })
        }, dirWalkNew: function () {
          var t = this;
          t.getWalkData()
        }, getWalkData: function () {
          var t = amap.dirnew, a = t.from, n = t.to,
            r = (t.policy, t.type || "walk", {lv: "2.5", taxi: 1, output: "json"}), o = a.lnglat.split(","),
            s = n.lnglat.split(","), l = a.id.split("-")[0], p = n.id.split("-")[0], c = "";
          c = l && !i.isEmpty(l) ? l : o[0] + "," + o[1];
          var d = "";
          d = p && !i.isEmpty(p) ? p : s[0] + "," + s[1];
          var u = "0", m = "0", h = 1e6, f = c + "," + d + "," + u + "," + m + "," + h, g = {
            poinavi: f,
            fromX: o[0] || "",
            fromY: o[1] || "",
            from_pid: l || "",
            toX: s[0] || "",
            toY: s[1] || "",
            to_pid: p || ""
          };
          r = e.extend(r, g), e.get(amap.service.navFoot + e.param(r)).done(function (t) {
          })
        }, buildWalkData: function (t) {
          var a = n;
          if ("ok" == t.info) {
            t.type = "walk";
            var i = t.routes[0], s = i.steps;
            s && s.length > 0 && (i.planTitle = [], e.each(s, function (t, e) {
              e.signs = a.routeSign[e.action] || "advance", e.polyType = "poly-walk", e.id = "step-" + t, t < s.length - 1 && e.path.push(s[t + 1].start_location), "" != e.road && i.planTitle.indexOf(e.road) < 0 && i.planTitle.push(e.road)
            }), i.distanceNum = i.distance, i.distance = r.formatDistance(i.distance), i.time = r.formatTime(i.time), i.feedBackUrl = o.dir())
          }
          return t
        }, buildWalkDataNew: function () {
        }, addDirWalkOverlays: function (t) {
          var e = amap.dirp, a = e.frominfo.lnglat.split(","), i = e.toinfo.lnglat.split(","), n = [];
          e.nodirp || (n.push({type: "polyline", list: e.routes[t].steps}), n.push({
            type: "marker",
            list: [{
              id: e.toinfo.id,
              location: new AMap.LngLat(i[0], i[1]),
              markerType: "marker-walk-to",
              type: "to",
              name: e.toinfo.name
            }, {
              id: e.frominfo.id,
              location: new AMap.LngLat(a[0], a[1]),
              markerType: "marker-walk-from",
              type: "from",
              name: e.frominfo.name
            }]
          }), s.clearAllOverlays(), s.addOverlays(n))
        }, addDirWalkOverlaysNew: function () {
        }
      };
      t.exports = l
    }).call(e, a(1), a(5))
  }, 69: function (t, e) {
    t.exports = function () {
      var t = new RegExp("[0-9]+([.]{1}[0-9]+){0,1}"), e = function (e) {
        return e = e.indexOf("公里") !== -1 || e.indexOf("千米") !== -1 ? 1e3 * parseFloat(t.exec(e)) : parseFloat(t.exec(e))
      }, a = {
        getLongerLen: function (t, e) {
          var a = t.length, i = e.length;
          return a >= i ? a : i
        }, getLngLatStr: function (t) {
          var e = t.lng, a = t.lat;
          return e + "-" + a
        }, getDiffData: function (t, e) {
          for (var a = this, i = {}, n = [], r = 0; r < e.length; r++)i[a.getLngLatStr(e[r])] = 1;
          for (var o = 0; o < t.length; o++)i[a.getLngLatStr(t[o])] || n.push(t[o]);
          return i = {}, n
        }, getDiffPos: function (t, e) {
          for (var a, i, n = this, r = n.getLongerLen(t, e), o = [], s = [], l = 0; l < r; l++)t[l] && (o = o.concat(t[l].path || t)), e[l] && (s = s.concat(e[l].path || e));
          return a = n.getDiffData(o, s), i = n.getDiffData(s, o), a = a.length ? a : o, i = i.length ? i : s, [a, i]
        }, getDiffPath: function (t, e) {
          for (var a = this, i = a.getLongerLen(t, e), n = [], r = [], o = [], s = [], l = [], p = [], c = 0; c < i; c++)t[c] && (n.push(t[c].name), o.push(t[c].name + "-" + t[c].length)), e[c] && (r.push(e[c].name), s.push(e[c].name + "-" + e[c].length));
          for (var d = 0; d < i; d++)n[d] && r.indexOf(n[d]) == -1 && l.push(t[d]), r[d] && n.indexOf(r[d]) == -1 && p.push(e[d]);
          if (l.length && p.length)return [l, p];
          for (var u = 0; u < i; u++)o[u] && s.indexOf(o[u]) == -1 && l.push(t[u]), s[u] && o.indexOf(s[u]) == -1 && p.push(e[u]);
          return [l, p]
        }, getPathPos: function (t, a, i) {
          var n, r, o, s, l, p, c, d = this, u = [], m = 0, h = 0;
          n = d.getPercent(t, a);
          for (var f = 0; f < i.length; f++)r = i[f], o = r.length, o = e(o), u.push(o), m += o;
          for (var g = 0; g < u.length; g++)if ((h += u[g]) >= m * n) {
            h -= u[g];
            break
          }
          for (var v, y = i[g].segments || [], _ = 0; _ < y.length; _++)if (v = y[_], o = v.length, o = e(o), (h += o) >= m * n) {
            h -= o, s = y[_].path || [], l = s.length, p = Math.floor(o / l), c = Math.ceil((m * n - h) / p);
            break
          }
          return _ != y.length || s || (s = y[y.length - 1].path || [], c = s.length - 1), s[c] ? s[c] : s[c - 1]
        }, processData: function (t) {
          var e = this, a = t || [], i = [];
          switch (e.planNum = a.length, e.planNum) {
            case 1:
              break;
            case 2:
              i = i.concat(e.getDiffPos(a[0].steps, a[1].steps));
              break;
            case 3:
              var n = e.getDiffPos(a[0].steps, a[1].steps.concat(a[2].steps)),
                r = e.getDiffPos(a[1].steps, a[2].steps.concat(a[0].steps)),
                o = e.getDiffPos(a[2].steps, a[0].steps.concat(a[1].steps));
              i = [n[0], r[0], o[0]]
          }
          return i || []
        }, init: function () {
          var t = this;
          onmessage = function (e) {
            var a = e.data, i = t.processData(a);
            postMessage(i)
          }
        }
      };
      a.init()
    }
  }, 240: function (t, e, a) {
    var i = a(2);
    t.exports = i("assets/biz/dir/tpl/dir-poi-chooseresult", function (t, e) {
      "use strict";
      var a = this, i = (a.$helpers, a.$escape), n = t.typetxt, r = t.realindex, o = t.poiname, s = t.index, l = t.type,
        p = a.$each, c = t.poilist, d = (t.$value, t.$index, t.page), u = "";
      return u += '<div class="choose_wrap choose_list">  <h3 class="choose-poi-title"> <i class="iconfont icon-whytip choose_type"></i> ', u += i(n), u += i(r), u += '： <span class="choose_poiname">', u += i(o), u += '</span> </h3> <div class="choose-poi-content" dirindex="', u += i(s), u += '" dirtype="', u += i(l), u += '"> <ul class="serp-list"> ', p(c, function (t, e) {
        u += ' <li class="poibox poibox-normal dir_choose_item choose_', u += i(e), u += '" id="', u += i(t.id), u += '" dirtype="', u += i(l), u += '" dirindex="', u += i(s), u += '"> <div class="choose_marker"></div> <h3 class="poi-title"> <span class="poi-name">', u += i(t.name), u += '</span> </h3> <div class="poi-info"> <p class="poi-addr">', u += i(t.address), u += '</p> </div> <button class="dir_choose_btn" dirtype="', u += i(l), u += '" dirindex="', u += i(s), u += '">设为', u += i(n), u += "</button> </li> "
      }), u += " </ul> ", d.pageTotal > 1 && (u += ' <div class="serp-paging"> <b class="paging-current">', u += i(d.pageNum), u += "/", u += i(d.pageTotal), u += "页</b> ", d.pageNum < d.pageTotal && (u += ' <span class="paging-next" type="next" pageno="', u += i(d.pageNum), u += '"> <i class="iconfont icon-chevronright"></i> </span> '), u += " ", d.pageNum > 1 ? (u += ' <span class="paging-prev" type="prev" pageno="', u += i(d.pageNum), u += '"> <i class="iconfont icon-chevronleft"></i> </span> ') : (u += ' <span class="paging-prev none" type="prev" pageno="', u += i(d.pageNum), u += '"> <i class="iconfont icon-chevronleft"></i> </span> '), u += ' <span class="paging-index" type="index" pageno="1">首页</span> </div> '), u += " </div> </div>", new String(u)
    })
  }, 241: function (t, e, a) {
    var i = a(2);
    t.exports = i("assets/biz/dir/tpl/dir-poi-noresult", function (t, e) {
      "use strict";
      var a = this, i = (a.$helpers, a.$escape), n = t.typetxt, r = t.realindex, o = t.poiname, s = t.cityname, l = "";
      return l += '<div class="choose_wrap warning-title"> <h3 class="choose-poi-title"> <i class="iconfont icon-icontishibaocuo choose_type"></i> ', l += i(n), l += i(r), l += '： <span class="title ellipsis choose_poiname">', l += i(o), l += '</span> <b class="choose-poi-choosecity">切换城市</b> </h3> <div class="choose-poi-noresult"> <div> 抱歉，在 <b> ', l += i(s), l += " </b> 没有找到与 <b> “", l += i(o), l += '” </b> 相关的地点。 </div> <div class="mt20"> 您还可以: </div> <div class="mt8"> 1. 检查输入的文字是否有误 </div> <div class="mt8"> 2. 尝试更换不同的文字 </div>  </div> </div>', new String(l)
    })
  }, 242: function (t, e, a) {
    var i = a(2);
    t.exports = i("assets/biz/dir/tpl/dir-poi-okresult", function (t, e) {
      "use strict";
      var a = this, i = (a.$helpers, a.$escape), n = t.typetxt, r = t.realindex, o = t.poiname, s = t.index, l = t.type,
        p = a.$each, c = t.poilist, d = (t.$value, t.$index, t.page), u = "";
      return u += '<div class="choose_wrap selected-title">  <h3 class="choose-poi-title"> <i class="iconfont icon-iconduihao choose_type"></i> ', u += i(n), u += i(r), u += '： <span class="choose_poiname">', u += i(o), u += '</span> </h3> <div class="choose-poi-content" dirindex="', u += i(s), u += '" dirtype="', u += i(l), u += '"> <ul class="serp-list"> ', p(c, function (t, e) {
        u += ' <li class="poibox poibox-normal amap-marker choose_', u += i(e), u += '" id="', u += i(t.id), u += '"> <div class="choose_marker"></div> <h3 class="poi-title"> <span class="poi-name">', u += i(t.name), u += '</span> </h3> <div class="poi-info"> <p class="poi-addr">', u += i(t.address), u += '</p> </div> <button class="dir_choose_btn" dirtype="', u += i(l), u += '" dirindex="', u += i(s), u += '">选择', u += i(n), u += "</button> </li> "
      }), u += " </ul> ", d.pageTotal > 1 && (u += ' <div class="serp-paging"> <b class="paging-current">', u += i(d.pageNum), u += "/", u += i(d.pageTotal), u += "页</b> ", d.pageNum < d.pageTotal && (u += ' <span class="paging-next" type="next" pageno="', u += i(d.pageNum), u += '"> <i class="iconfont icon-chevronright"></i> </span> '), u += " ", d.pageNum > 1 ? (u += ' <span class="paging-prev" type="prev" pageno="', u += i(d.pageNum), u += '"> <i class="iconfont icon-chevronleft"></i> </span> ') : (u += ' <span class="paging-prev none" type="prev" pageno="', u += i(d.pageNum), u += '"> <i class="iconfont icon-chevronleft"></i> </span> '), u += ' <span class="paging-index" type="index" pageno="1">首页</span> </div> '), u += " </div> </div>", new String(u)
    })
  }
});