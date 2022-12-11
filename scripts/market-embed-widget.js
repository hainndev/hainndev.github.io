!(function () {
    "use strict";
    var e = Object.defineProperty,
        t = Object.defineProperties,
        i = Object.getOwnPropertyDescriptors,
        n = Object.getOwnPropertySymbols,
        r = Object.prototype.hasOwnProperty,
        h = Object.prototype.propertyIsEnumerable,
        l = (t, i, n) => (i in t ? e(t, i, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[i] = n)),
        C = (e, t) => {
            for (var i in t || (t = {})) r.call(t, i) && l(e, i, t[i]);
            if (n) for (var i of n(t)) h.call(t, i) && l(e, i, t[i]);
            return e;
        };
    new (class {
        constructor() {
            (this.commonConfig = { width: "100%", height: "100%", theme: "light" }),
                (this.defaultConfigs = { "dnse-market-index": { indexes: ["VNINDEX", "VN30", "HOSE", "HNX", "UPCOM"] } }),
                (this.serializedQueryString = function (e) {
                    var t = [];
                    for (var i in e) e.hasOwnProperty(i) && t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                    return t.join("&");
                }),
                this._processWidget(),
                this._renderWidget();
        }
        _processWidget() {
            (this.script = document.currentScript), (this.widgetContainer = this.script.parentElement), (this.widgetType = this.widgetContainer.className.split(" ")[0]), (this.config = this._scriptConfigToJSON());
        }
        _scriptConfigToJSON() {
            var e;
            const t =
                (null == (e = this.script)
                    ? void 0
                    : e.innerHTML
                          .replace(/ /g, "")
                          .replace(/(\r\n|\n|\r)/gm, "")
                          .trim()) || "";
            try {
                return JSON.parse(t);
            } catch (e) {
                return console.error("Widget settings parse error: " + e), {};
            }
        }
        _renderWidget() {
            if ("dnse-market-index" === this.widgetType) this.marketIndexEmbedding();
            else console.log("Unknown widget type: " + this.widgetType);
        }
        parseUnitValue(e, t) {
            return "string" == typeof e ? e : e + t;
        }
        marketIndexEmbedding() {
            const e = this.widgetContainer,
                l = this.script,
                s = ((c = C(C(C({}, this.commonConfig), this.defaultConfigs["dnse-market-index"]), this.config)), (o = { utm_source: "https://www.dnse.com.vn" || "", utm_medium: "widget" }), t(c, i(o)));
            var c, o;
            const a = this.serializedQueryString(
                ((e, t) => {
                    var i = {};
                    for (var l in e) r.call(e, l) && t.indexOf(l) < 0 && (i[l] = e[l]);
                    if (null != e && n) for (var l of n(e)) t.indexOf(l) < 0 && h.call(e, l) && (i[l] = e[l]);
                    return i;
                })(s, ["width", "height"])
            );
            const d = this.renderHeader(),
                p = this.renderLink(s),
                L = this.renderLogo(s, d),
                g = this.renderFontLinkTag(),
                f = this.renderIframe(a);
            document.head.appendChild(g),
                d.append(L),
                d.append(p),
                (e.style.cssText = `\n      width: ${this.parseUnitValue(s.width, "px")};\n      height: ${this.parseUnitValue(s.height, "px")};\n      box-shadow: 0 1px 8px -2px rgba(121, 121, 121, 0.15);\n    `),
                e.append(d),
                e.append(f),
                e.removeChild(l);
        }
        renderLink(e) {
            const t = document.createElement("a"),
                i = `${"https://openaccount.vps.com.vn/?MKTID=9128" || ""}?utm_source=${window.location.hostname}&utm_medium=widget`;
            return (
                t.setAttribute("href", i),
                t.setAttribute("target", "_blank"),
                (t.textContent = "Giao dịch"),
                (t.style.cssText = `\n      font-family:Roboto,sans-serif;\n      text-decoration:none;\n      color:${"dark" === e.theme ? "white" : "#800000"};\n      font-size:12px\n    `),
                t
            );
        }
        renderLogo(e, t) {
            const i = document.createElement("img");
            return ((i.setAttribute(
                          "src",
                          "data:image/png;base64,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"
                      ),
                      (t.style.backgroundColor = "#FFFFFF")),
                i.setAttribute("alt", "VPS Logo"),
                (i.style.cssText = "width:56px; height:27px"),
                i
            );
        }
        renderHeader() {
            const e = document.createElement("div");
            return (e.style.cssText = "\n      display: flex;\n      justify-content: space-between;\n      padding: 8px;\n      align-items: center;\n    "), e;
        }
        renderFontLinkTag() {
            let e = document.createElement("link");
            return (e.rel = "stylesheet"), (e.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" || ""), e;
        }
        renderIframe(e) {
            const t = document.createElement("iframe");
            return t.setAttribute("src", `${"https://widget.dnse.com.vn/index-widget" || "http://localhost:4000"}?${e}`), (t.style.cssText = "\n      width: 100%;\n      height: 100%;\n      border: none;\n    "), t;
        }
    })();
})();
//# sourceMappingURL=embed-widget.js.map
