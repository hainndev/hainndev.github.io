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
            return (
                "dark" === e.theme
                    ? (i.setAttribute(
                          "src",
                          "data:image/svg+xml,%3csvg width='76' height='27' viewBox='0 0 76 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M44.926 18.035h1.562c1.006 0 1.76.122 2.245.364.485.243.898.624 1.204 1.178.323.538.467 1.179.467 1.889 0 .52-.02 1.258-.259 1.75-.193.395-.526.78-.76.992-.236.214-.733.51-1.007.59-.359.104-.987.155-1.885.155h-1.58l.013-6.918zm1.31 1.213v4.363h.611c.611 0 1.042-.07 1.312-.208.269-.139.485-.516.664-.828.18-.312.252-.71.252-1.16 0-.711-.198-1.266-.611-1.647-.377-.346-.97-.52-1.778-.52h-.45zM51.807 18h1.257l2.981 4.575L56.028 18h1.31l.018 6.953h-1.275l-2.963-4.475v4.475h-1.311L51.789 18h.018zM63.544 19.092l-1.149.831c-.413-.468-.808-.693-1.24-.693a.9.9 0 0 0-.502.139c-.126.086-.198.19-.198.294 0 .104.054.226.144.312.126.139.503.416 1.131.85.593.398.952.658 1.078.762.323.26.539.502.665.745.125.242.197.502.197.78 0 .554-.233 1.004-.7 1.35-.467.365-1.06.538-1.814.538-.575 0-1.096-.121-1.527-.347-.43-.225-.808-.606-1.113-1.091l1.31-.641c.396.589.845.883 1.366.883.269 0 .485-.069.664-.19.18-.122.27-.277.27-.433 0-.156-.072-.295-.198-.45-.144-.157-.431-.382-.898-.694-.898-.589-1.473-1.057-1.724-1.369-.252-.329-.395-.64-.395-.97 0-.468.215-.866.646-1.195.431-.33.97-.503 1.599-.503.413 0 .79.07 1.167.225.395.173.79.45 1.221.867zM64.89 18h4.454v1.438h-2.91v1.213h2.91v1.213h-2.91v1.75h2.91v1.34h-4.455V18zM38.508 22.934c0 .645-.149 1.165-.446 1.558-.296.39-.695.586-1.195.586-.534 0-.946-.189-1.238-.566l-.035.488h-.664v-6h.722v2.238c.292-.362.694-.543 1.207-.543.513 0 .916.194 1.207.582.295.388.442.92.442 1.594v.063zm-.723-.082c0-.493-.095-.873-.285-1.141-.19-.268-.464-.402-.82-.402-.477 0-.82.22-1.028.664V23.8c.222.443.567.664 1.035.664.347 0 .616-.134.81-.402.192-.269.288-.672.288-1.211zm2.973 1.09.984-3.169h.774l-1.7 4.88c-.263.703-.68 1.054-1.254 1.054l-.136-.012-.27-.05v-.586l.196.015c.244 0 .434-.05.57-.148.138-.1.251-.28.34-.543l.16-.43-1.508-4.18h.79l1.054 3.168zM17.54 4.282h4.973v1.62H19.26V7.47h3.252v1.589H19.26v2.286h3.252v1.62H17.54V4.282zM24.133 4.282H25.8l3.892 5.71v-5.71h1.733v8.682h-1.665l-3.893-5.699v5.699h-1.733V4.282zM32.606 4.282h5.029v1.631H35.98v7.051h-1.755v-7.05h-1.62V4.281zM38.94 4.282h1.834c1.002 0 1.721.086 2.15.258.427.171.764.45 1.023.847.259.397.394.87.394 1.406 0 .569-.147 1.052-.428 1.428-.281.386-.72.676-1.294.869l2.16 3.863h-1.89l-2.047-3.68h-.158v3.68h-1.733V4.282h-.01zm1.733 3.391h.54c.551 0 .934-.064 1.136-.204.203-.14.315-.365.315-.687a.814.814 0 0 0-.157-.493.84.84 0 0 0-.416-.3c-.17-.065-.484-.097-.946-.097h-.472v1.781zM48.954 4.282h1.756l3.499 8.682h-1.8l-.71-1.792h-3.712l-.743 1.792h-1.8l3.51-8.682zm.89 2.297-1.227 2.983h2.43l-1.204-2.983zM55.557 4.282h2.048c1.328 0 2.306.161 2.948.472.641.311 1.17.827 1.586 1.524.416.698.63 1.524.63 2.468 0 .666-.112 1.288-.349 1.846-.236.558-.55 1.03-.967 1.395a3.624 3.624 0 0 1-1.328.773c-.483.14-1.305.215-2.486.215h-2.082V4.282zM57.28 5.87v5.474h.799c.787 0 1.361-.086 1.721-.258.36-.172.653-.462.878-.87.225-.407.337-.912.337-1.513 0-.922-.27-1.641-.81-2.146-.484-.461-1.271-.687-2.34-.687h-.585zM64.435 4.282h4.973v1.62h-3.252V7.47h3.252v1.589h-3.252v2.286h3.252v1.62h-4.973V4.282zM5.512 8.559 0 12.885l.024-8.606 5.488 4.28zM10.005 8.559l5.512 4.326v-8.63L10.005 8.56z' fill='white'/%3e %3cpath d='m3.011 10.523-.656-.398-.825-1.894.898-1.286.559-.35L.024 4.302 0 12.838l3.011-2.315zM13.914 8.676l-.777 1.473-.607.374 2.987 2.315V4.303L12.53 6.594l1.069.655.315 1.427zM7.6 13.4l-4.346-2.713-2.987 2.338 7.334 4.092V13.4zM7.891 17.117l7.358-4.092-2.987-2.338-4.37 2.712v3.718zM7.891 0v3.788l4.371 2.643 2.987-2.339L7.89 0zM7.6 0 .269 4.116 3.254 6.43l4.347-2.643V0zM74.403 3.327l1.519-2.211h-1.215l-.9 1.341.596.87zM74.402 3.552 76 5.892h-1.193l-1.001-1.47.596-.87zM71.42 1.116h1.317l1.587 2.318-1.688 2.458h-1.328l1.7-2.458-1.587-2.318z' fill='white'/%3e%3c/svg%3e"
                      ),
                      (t.style.backgroundColor = "#212326"))
                    : (i.setAttribute(
                          "src",
                          "data:image/svg+xml,%3csvg width='96' height='31' viewBox='0 0 96 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M27.3633 6.073H35.6762V8.2703H29.6566V10.8505H35.1986V13.0478H29.6566V15.9148H35.867V18.1121H27.3633V6.073Z' fill='%23333333'/%3e%3cpath d='M37.4922 9.32153H39.1171L39.4987 10.182C39.7095 10.0099 39.9576 9.83784 40.2058 9.70442C40.6447 9.47495 41.2371 9.22681 41.9828 9.22681C44.0654 9.22681 45.5183 10.6597 45.5183 12.953V18.1121H43.321V13.2399C43.321 12.0938 42.5752 11.3294 41.5052 11.3294C40.4353 11.3294 39.6895 12.0938 39.6895 13.2399V18.1121H37.4922V9.32153Z' fill='%23333333'/%3e%3cpath d='M47.7153 11.3283H46.3772V9.5126H46.9509C47.6579 9.5126 48.0022 9.16839 48.0022 8.46131V7.21924H49.9126V9.32182H51.8231V11.3283H49.9126V14.9585C49.9126 15.723 50.3902 16.2006 51.1547 16.2006C51.3655 16.2006 51.4802 16.1819 51.5749 16.1619L51.7284 16.1045V18.015C51.6323 18.0537 51.5376 18.091 51.4229 18.111C51.2121 18.1684 50.9639 18.2071 50.6771 18.2071C48.9374 18.2071 47.7153 16.965 47.7153 15.0546V11.3283V11.3283Z' fill='%23333333'/%3e%3cpath d='M53.1614 9.32189H54.7863L55.1679 10.2771C55.3213 10.0863 55.5121 9.91424 55.7216 9.76081C56.0844 9.47398 56.6008 9.22583 57.2692 9.22583C57.4799 9.22583 57.6134 9.26452 57.7468 9.2832L57.9376 9.32189V11.6152L57.7281 11.5766C57.5947 11.5579 57.4026 11.5192 57.1744 11.5192C56.1045 11.5192 55.3587 12.2836 55.3587 13.4297V18.1111H53.1614V9.32189Z' fill='%23333333'/%3e%3cpath d='M65.0097 17.2519C64.8003 17.424 64.5895 17.5961 64.3414 17.7295C63.9024 17.9777 63.2901 18.2072 62.5256 18.2072C60.3283 18.2072 58.4165 16.3154 58.4165 13.7165C58.4165 11.1176 60.327 9.22583 62.5256 9.22583C63.2901 9.22583 63.9011 9.47398 64.3414 9.70345C64.5895 9.83686 64.8003 10.009 65.0097 10.1811L65.3926 9.32055H67.0163V18.1111H65.3926L65.0097 17.2519ZM65.0097 13.7165C65.0097 12.2636 64.0545 11.3284 62.8124 11.3284C61.5704 11.3284 60.6151 12.265 60.6151 13.7165C60.6151 15.1694 61.5704 16.1046 62.8124 16.1046C64.0532 16.1059 65.0097 15.1694 65.0097 13.7165Z' fill='%23333333'/%3e%3cpath d='M74.7554 17.2516C74.5459 17.4237 74.3351 17.5958 74.087 17.7293C73.648 17.9774 73.0357 18.2069 72.2712 18.2069C70.0739 18.2069 68.1621 16.3151 68.1621 13.7162C68.1621 11.1173 70.0726 9.22554 72.2712 9.22554C72.9783 9.22554 73.552 9.45501 73.9522 9.66446C74.1817 9.79788 74.3912 9.93129 74.5633 10.0847V6.073H76.7606V18.1121H75.1369L74.7554 17.2516ZM74.7554 13.7162C74.7554 12.2633 73.8001 11.3281 72.5581 11.3281C71.316 11.3281 70.3608 12.2647 70.3608 13.7162C70.3608 15.1691 71.316 16.1043 72.5581 16.1043C73.8001 16.1056 74.7554 15.1691 74.7554 13.7162Z' fill='%23333333'/%3e%3cpath d='M86.2208 15.4362C85.7618 16.7543 84.2903 18.2072 82.3038 18.2072C79.9344 18.2072 77.9092 16.2006 77.9092 13.7165C77.9092 11.2324 79.9344 9.22583 82.3038 9.22583C84.5971 9.22583 86.5076 11.0416 86.5076 13.7165C86.5076 13.9273 86.4689 14.1181 86.4503 14.2902L86.4116 14.577H80.2973C80.5081 15.4375 81.1578 16.1059 82.3038 16.1059C82.8961 16.1059 83.259 15.9525 83.5459 15.7817C83.6993 15.6857 83.8327 15.5709 83.9288 15.4375H86.2208V15.4362ZM84.405 13.0481C84.1942 12.0742 83.4498 11.3284 82.3024 11.3284C81.1551 11.3284 80.4107 12.0742 80.1999 13.0481H84.405Z' fill='%23333333'/%3e%3cpath d='M45.4253 21.0684H46.6554V24.27C46.8913 23.8588 47.4979 23.4814 48.3068 23.4814C49.8806 23.4814 50.7332 24.6778 50.7332 26.2213C50.7332 27.8052 49.7963 29.0016 48.2629 29.0016C47.5181 29.0016 46.9486 28.6781 46.6453 28.1726V28.8736H45.4253V21.0684V21.0684ZM48.054 24.5935C47.2553 24.5935 46.6419 25.1866 46.6419 26.2314C46.6419 27.266 47.2553 27.8928 48.054 27.8928C48.8729 27.8928 49.4661 27.266 49.4661 26.2314C49.4694 25.1866 48.8864 24.5935 48.054 24.5935Z' fill='%2391131C'/%3e%3cpath d='M52.9505 28.25L50.7061 23.6228H52.1181L53.6279 26.9457L55.04 23.6228H56.3678L53.0247 31H51.6867L52.9505 28.25Z' fill='%2391131C'/%3e%3cpath d='M59.5295 21.2305H62.2358C64.3185 21.2305 65.9564 22.6122 65.9564 25.069C65.9564 27.5157 64.2949 28.8739 62.2256 28.8739H59.5295V21.2305ZM64.6083 25.069C64.6083 23.2795 63.5198 22.4168 62.1919 22.4168H60.8237V27.691H62.1818C63.5096 27.6876 64.6083 26.835 64.6083 25.069Z' fill='%2391131C'/%3e%3cpath d='M68.3415 23.084V28.8739H67.0474V21.2305H68.6987L72.1699 26.653V21.2305H73.464V28.8773H72.116L68.3415 23.084Z' fill='%2391131C'/%3e%3cpath d='M77.3869 22.2108C76.6118 22.2108 76.0726 22.7298 76.0726 23.3095C76.0726 23.7948 76.3759 24.1621 76.969 24.2902L78.0677 24.516C79.4157 24.7856 80.1369 25.6382 80.1369 26.7167C80.1369 27.903 79.1764 29.0353 77.4307 29.0353C75.4895 29.0353 74.5931 27.785 74.4751 26.6863L75.6816 26.3426C75.7558 27.1413 76.3287 27.8726 77.4273 27.8726C78.344 27.8726 78.8192 27.4076 78.8192 26.8144C78.8192 26.319 78.4519 25.918 77.7947 25.7798L76.7162 25.554C75.5502 25.3181 74.775 24.5497 74.775 23.4072C74.775 22.1232 75.9512 21.0684 77.3734 21.0684C79.1731 21.0684 79.874 22.167 80.0493 23.0197L78.8832 23.387C78.8125 22.9118 78.4114 22.2108 77.3869 22.2108Z' fill='%2391131C'/%3e%3cpath d='M81.2156 21.2305H85.9405V22.437H82.5097V24.4658H85.617V25.642H82.5097V27.6708H85.9405V28.8773H81.2156V21.2305Z' fill='%2391131C'/%3e%3cpath d='M21.2873 6.74418V17.3972C21.2873 17.6493 21.2193 17.8921 21.0992 18.1043C21.1139 18.0696 21.4327 17.3105 20.2133 16.594C20.2053 16.59 20.1986 16.586 20.1906 16.5807H20.1893V16.5793L13.2425 12.5676C12.8583 12.3462 12.8583 11.7912 13.2425 11.5697L20.1893 7.55799C21.4367 6.8389 21.1139 6.06911 21.0992 6.03442C21.2193 6.24788 21.2873 6.49069 21.2873 6.74418Z' fill='%2391131C'/%3e%3cpath d='M8.04478 11.5709C8.42901 11.7924 8.42901 12.3474 8.04478 12.5689L1.09666 16.5792L1.09532 16.5806C1.06997 16.5952 1.04596 16.6086 1.02194 16.6233C-0.0813772 17.297 0.146756 17.9987 0.185445 18.0935C0.0667082 17.8827 0.00133543 17.6452 0.00133543 17.3957V17.2129L0 6.92551V6.74273C0 6.49058 0.0667121 6.24777 0.189452 6.03564C0.174776 6.07033 -0.136075 6.8081 1.02328 7.51519C1.04729 7.52987 1.07131 7.54454 1.09666 7.55788C1.09666 7.55922 1.09799 7.55922 1.09799 7.55922L8.04478 11.5709Z' fill='%2391131C'/%3e%3cpath d='M20.4668 5.75008C20.4668 5.76476 20.4668 5.7781 20.4641 5.78744C20.4361 6.08761 20.2453 6.52654 19.5115 6.95079L15.9988 8.97733L10.6436 5.88349L5.28708 8.976L1.77433 6.94946C1.04056 6.52654 0.851113 6.08628 0.821763 5.7861C0.819094 5.77676 0.819092 5.76342 0.819092 5.74875C0.819092 5.64735 0.851112 5.4459 1.07925 5.30181C1.08325 5.29915 1.08992 5.29381 1.09526 5.29114C2.48942 4.48666 9.77508 0.280166 9.77508 0.280166L9.93384 0.189446C10.1553 0.0613695 10.3981 0 10.6436 0C10.8891 0 11.1319 0.0613695 11.3534 0.189446L11.5121 0.280166C11.5121 0.280166 18.7964 4.48666 20.1919 5.29114C20.1986 5.29381 20.2039 5.29915 20.2079 5.30181C20.4361 5.44723 20.4668 5.64869 20.4668 5.75008Z' fill='%2391131C'/%3e%3cpath d='M20.4671 18.3894C20.4671 18.4908 20.4351 18.6922 20.207 18.8363C20.203 18.839 20.1963 18.8443 20.191 18.847C18.7968 19.6514 11.5111 23.8579 11.5111 23.8579L11.3524 23.9487C11.1309 24.0767 10.8881 24.1381 10.6426 24.1381C10.3971 24.1381 10.1543 24.0767 9.93286 23.9487L9.7741 23.8579C9.7741 23.8579 2.48978 19.6514 1.09428 18.847C1.08761 18.8443 1.08227 18.839 1.07827 18.8363C0.848802 18.6922 0.818115 18.4894 0.818115 18.3894C0.818115 18.3747 0.818118 18.3613 0.820786 18.352C0.848803 18.0518 1.03958 17.6129 1.77335 17.1886L5.2861 15.1621L10.6426 18.2546L15.9991 15.1621L19.5119 17.1886C20.2456 17.6116 20.4351 18.0518 20.4644 18.352C20.4671 18.36 20.4671 18.3733 20.4671 18.3894Z' fill='%2391131C'/%3e%3cpath d='M93.3054 9.02287L92.2821 10.4544L91.1414 12.0527H89.1135L91.2588 9.02154L89.1135 6.01709H91.1774L92.2821 7.57802L93.3054 9.02287Z' fill='white'/%3e%3cpath d='M95.4519 6.01709L93.3053 9.02287L92.282 7.57802L93.388 6.01709H95.4519Z' fill='%2391131C'/%3e%3cpath d='M95.4519 12.0523H93.424L92.282 10.454L93.3053 9.02246L95.4519 12.0523Z' fill='%2391131C'/%3e%3cpath d='M93.2936 8.73833C93.4137 8.90776 93.4137 9.1359 93.2923 9.30533L92.4718 10.4527L91.3311 12.051H89.3032L91.2484 9.304C91.3684 9.13457 91.3684 8.90643 91.247 8.737L89.3032 6.01538H91.3671L92.4718 7.57497L93.2936 8.73833Z' fill='white'/%3e%3cpath d='M92.7238 8.73833C92.8438 8.90776 92.8438 9.1359 92.7224 9.30533L91.9019 10.4527L90.7613 12.051H88.7334L90.6785 9.304C90.7986 9.13457 90.7986 8.90643 90.6772 8.737L88.7334 6.01538H90.7973L91.9019 7.57497L92.7238 8.73833Z' fill='%23333333'/%3e%3c/svg%3e"
                      ),
                      (t.style.backgroundColor = "#FFFFFF")),
                i.setAttribute("alt", "Entrade X Logo"),
                (i.style.cssText = "width:76px; height:27px"),
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
