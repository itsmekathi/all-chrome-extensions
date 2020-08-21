!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        (t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = e()
    }
}(function() {
    var e, t, n;
    return function i(a, s, l) {
        function c(n, e) {
            if (!s[n]) {
                if (!a[n]) {
                    var t = "function" == typeof require && require;
                    if (!e && t)
                        return t(n, !0);
                    if (u)
                        return u(n, !0);
                    var r = new Error("Cannot find module '" + n + "'");
                    throw r.code = "MODULE_NOT_FOUND",
                    r
                }
                var o = s[n] = {
                    exports: {}
                };
                a[n][0].call(o.exports, function(e) {
                    var t = a[n][1][e];
                    return c(t || e)
                }, o, o.exports, i, a, s, l)
            }
            return s[n].exports
        }
        for (var u = "function" == typeof require && require, e = 0; e < l.length; e++)
            c(l[e]);
        return c
    }({
        1: [function(e, t, n) {
            function r(e) {
                this.name = "RavenConfigError",
                this.message = e
            }
            (r.prototype = new Error).constructor = r,
            t.exports = r
        }
        , {}],
        2: [function(e, t, n) {
            var r = function(e, r, o) {
                var i = e[r]
                  , a = e;
                if (r in e) {
                    var s = "warn" === r ? "warning" : r;
                    e[r] = function() {
                        var e = [].slice.call(arguments)
                          , t = "" + e.join(" ")
                          , n = {
                            level: s,
                            logger: "console",
                            extra: {
                                arguments: e
                            }
                        };
                        "assert" === r ? !1 === e[0] && (t = "Assertion failed: " + (e.slice(1).join(" ") || "console.assert"),
                        n.extra.arguments = e.slice(1),
                        o && o(t, n)) : o && o(t, n),
                        i && Function.prototype.apply.call(i, a, e)
                    }
                }
            };
            t.exports = {
                wrapMethod: r
            }
        }
        , {}],
        3: [function(N, D, e) {
            (function(e) {
                var l = N(6)
                  , o = N(7)
                  , c = N(1)
                  , t = N(5)
                  , a = t.isError
                  , s = t.isObject
                  , u = t.isErrorEvent
                  , n = t.isUndefined
                  , p = t.isFunction
                  , d = t.isString
                  , g = t.isArray
                  , i = t.isEmptyObject
                  , f = t.each
                  , m = t.objectMerge
                  , h = t.truncate
                  , x = t.objectFrozen
                  , _ = t.hasKey
                  , v = t.joinRegExp
                  , y = t.urlencode
                  , r = t.uuid4
                  , w = t.htmlTreeAsString
                  , b = t.isSameException
                  , A = t.isSameStacktrace
                  , k = t.parseUrl
                  , C = t.fill
                  , S = N(2).wrapMethod
                  , E = "source protocol user pass host port path".split(" ")
                  , P = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
                function L() {
                    return +new Date
                }
                var T = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}
                  , B = T.document
                  , R = T.navigator;
                function I(t, n) {
                    return p(n) ? function(e) {
                        return n(e, t)
                    }
                    : n
                }
                function O() {
                    for (var e in this._hasJSON = !("object" != typeof JSON || !JSON.stringify),
                    this._hasDocument = !n(B),
                    this._hasNavigator = !n(R),
                    this._lastCapturedException = null,
                    this._lastData = null,
                    this._lastEventId = null,
                    this._globalServer = null,
                    this._globalKey = null,
                    this._globalProject = null,
                    this._globalContext = {},
                    this._globalOptions = {
                        logger: "javascript",
                        ignoreErrors: [],
                        ignoreUrls: [],
                        whitelistUrls: [],
                        includePaths: [],
                        collectWindowErrors: !0,
                        maxMessageLength: 0,
                        maxUrlLength: 250,
                        stackTraceLimit: 50,
                        autoBreadcrumbs: !0,
                        instrument: !0,
                        sampleRate: 1
                    },
                    this._ignoreOnError = 0,
                    this._isRavenInstalled = !1,
                    this._originalErrorStackTraceLimit = Error.stackTraceLimit,
                    this._originalConsole = T.console || {},
                    this._originalConsoleMethods = {},
                    this._plugins = [],
                    this._startTime = L(),
                    this._wrappedBuiltIns = [],
                    this._breadcrumbs = [],
                    this._lastCapturedEvent = null,
                    this._keypressTimeout,
                    this._location = T.location,
                    this._lastHref = this._location && this._location.href,
                    this._resetBackoff(),
                    this._originalConsole)
                        this._originalConsoleMethods[e] = this._originalConsole[e]
                }
                (O.prototype = {
                    VERSION: "3.20.1",
                    debug: !1,
                    TraceKit: l,
                    config: function(e, t) {
                        var n = this;
                        if (n._globalServer)
                            return this._logDebug("error", "Error: Raven has already been configured"),
                            n;
                        if (!e)
                            return n;
                        var r = n._globalOptions;
                        t && f(t, function(e, t) {
                            "tags" === e || "extra" === e || "user" === e ? n._globalContext[e] = t : r[e] = t
                        }),
                        n.setDSN(e),
                        r.ignoreErrors.push(/^Script error\.?$/),
                        r.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),
                        r.ignoreErrors = v(r.ignoreErrors),
                        r.ignoreUrls = !!r.ignoreUrls.length && v(r.ignoreUrls),
                        r.whitelistUrls = !!r.whitelistUrls.length && v(r.whitelistUrls),
                        r.includePaths = v(r.includePaths),
                        r.maxBreadcrumbs = Math.max(0, Math.min(r.maxBreadcrumbs || 100, 100));
                        var o = {
                            xhr: !0,
                            console: !0,
                            dom: !0,
                            location: !0,
                            sentry: !0
                        }
                          , i = r.autoBreadcrumbs;
                        "[object Object]" === {}.toString.call(i) ? i = m(o, i) : !1 !== i && (i = o),
                        r.autoBreadcrumbs = i;
                        var a = {
                            tryCatch: !0
                        }
                          , s = r.instrument;
                        return "[object Object]" === {}.toString.call(s) ? s = m(a, s) : !1 !== s && (s = a),
                        r.instrument = s,
                        l.collectWindowErrors = !!r.collectWindowErrors,
                        n
                    },
                    install: function() {
                        var e = this;
                        return e.isSetup() && !e._isRavenInstalled && (l.report.subscribe(function() {
                            e._handleOnErrorStackInfo.apply(e, arguments)
                        }),
                        e._patchFunctionToString(),
                        e._globalOptions.instrument && e._globalOptions.instrument.tryCatch && e._instrumentTryCatch(),
                        e._globalOptions.autoBreadcrumbs && e._instrumentBreadcrumbs(),
                        e._drainPlugins(),
                        e._isRavenInstalled = !0),
                        Error.stackTraceLimit = e._globalOptions.stackTraceLimit,
                        this
                    },
                    setDSN: function(e) {
                        var t = this
                          , n = t._parseDSN(e)
                          , r = n.path.lastIndexOf("/")
                          , o = n.path.substr(1, r);
                        t._dsn = e,
                        t._globalKey = n.user,
                        t._globalSecret = n.pass && n.pass.substr(1),
                        t._globalProject = n.path.substr(r + 1),
                        t._globalServer = t._getGlobalServer(n),
                        t._globalEndpoint = t._globalServer + "/" + o + "api/" + t._globalProject + "/store/",
                        this._resetBackoff()
                    },
                    context: function(e, t, n) {
                        return p(e) && (n = t || [],
                        t = e,
                        e = void 0),
                        this.wrap(e, t).apply(this, n)
                    },
                    wrap: function(r, o, i) {
                        var a = this;
                        if (n(o) && !p(r))
                            return r;
                        if (p(r) && (o = r,
                        r = void 0),
                        !p(o))
                            return o;
                        try {
                            if (o.__raven__)
                                return o;
                            if (o.__raven_wrapper__)
                                return o.__raven_wrapper__
                        } catch (e) {
                            return o
                        }
                        function e() {
                            var e = []
                              , t = arguments.length
                              , n = !r || r && !1 !== r.deep;
                            for (i && p(i) && i.apply(this, arguments); t--; )
                                e[t] = n ? a.wrap(r, arguments[t]) : arguments[t];
                            try {
                                return o.apply(this, e)
                            } catch (e) {
                                throw a._ignoreNextOnError(),
                                a.captureException(e, r),
                                e
                            }
                        }
                        for (var t in o)
                            _(o, t) && (e[t] = o[t]);
                        return e.prototype = o.prototype,
                        (o.__raven_wrapper__ = e).__raven__ = !0,
                        e.__orig__ = o,
                        e
                    },
                    uninstall: function() {
                        return l.report.uninstall(),
                        this._unpatchFunctionToString(),
                        this._restoreBuiltIns(),
                        Error.stackTraceLimit = this._originalErrorStackTraceLimit,
                        this._isRavenInstalled = !1,
                        this
                    },
                    captureException: function(t, e) {
                        var n = !a(t)
                          , r = !u(t)
                          , o = u(t) && !t.error;
                        if (n && r || o)
                            return this.captureMessage(t, m({
                                trimHeadFrames: 1,
                                stacktrace: !0
                            }, e));
                        u(t) && (t = t.error),
                        this._lastCapturedException = t;
                        try {
                            var i = l.computeStackTrace(t);
                            this._handleStackInfo(i, e)
                        } catch (e) {
                            if (t !== e)
                                throw e
                        }
                        return this
                    },
                    captureMessage: function(e, t) {
                        if (!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(e)) {
                            var n = m({
                                message: e + ""
                            }, t = t || {}), r;
                            try {
                                throw new Error(e)
                            } catch (e) {
                                r = e
                            }
                            r.name = null;
                            var o = l.computeStackTrace(r)
                              , i = g(o.stack) && o.stack[1]
                              , a = i && i.url || "";
                            if ((!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(a)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(a))) {
                                if (this._globalOptions.stacktrace || t && t.stacktrace) {
                                    t = m({
                                        fingerprint: e,
                                        trimHeadFrames: (t.trimHeadFrames || 0) + 1
                                    }, t);
                                    var s = this._prepareFrames(o, t);
                                    n.stacktrace = {
                                        frames: s.reverse()
                                    }
                                }
                                return this._send(n),
                                this
                            }
                        }
                    },
                    captureBreadcrumb: function(e) {
                        var t = m({
                            timestamp: L() / 1e3
                        }, e);
                        if (p(this._globalOptions.breadcrumbCallback)) {
                            var n = this._globalOptions.breadcrumbCallback(t);
                            if (s(n) && !i(n))
                                t = n;
                            else if (!1 === n)
                                return this
                        }
                        return this._breadcrumbs.push(t),
                        this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(),
                        this
                    },
                    addPlugin: function(e) {
                        var t = [].slice.call(arguments, 1);
                        return this._plugins.push([e, t]),
                        this._isRavenInstalled && this._drainPlugins(),
                        this
                    },
                    setUserContext: function(e) {
                        return this._globalContext.user = e,
                        this
                    },
                    setExtraContext: function(e) {
                        return this._mergeContext("extra", e),
                        this
                    },
                    setTagsContext: function(e) {
                        return this._mergeContext("tags", e),
                        this
                    },
                    clearContext: function() {
                        return this._globalContext = {},
                        this
                    },
                    getContext: function() {
                        return JSON.parse(o(this._globalContext))
                    },
                    setEnvironment: function(e) {
                        return this._globalOptions.environment = e,
                        this
                    },
                    setRelease: function(e) {
                        return this._globalOptions.release = e,
                        this
                    },
                    setDataCallback: function(e) {
                        var t = this._globalOptions.dataCallback;
                        return this._globalOptions.dataCallback = I(t, e),
                        this
                    },
                    setBreadcrumbCallback: function(e) {
                        var t = this._globalOptions.breadcrumbCallback;
                        return this._globalOptions.breadcrumbCallback = I(t, e),
                        this
                    },
                    setShouldSendCallback: function(e) {
                        var t = this._globalOptions.shouldSendCallback;
                        return this._globalOptions.shouldSendCallback = I(t, e),
                        this
                    },
                    setTransport: function(e) {
                        return this._globalOptions.transport = e,
                        this
                    },
                    lastException: function() {
                        return this._lastCapturedException
                    },
                    lastEventId: function() {
                        return this._lastEventId
                    },
                    isSetup: function() {
                        return !!this._hasJSON && (!!this._globalServer || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0,
                        this._logDebug("error", "Error: Raven has not been configured.")),
                        !1))
                    },
                    afterLoad: function() {
                        var e = T.RavenConfig;
                        e && this.config(e.dsn, e.config).install()
                    },
                    showReportDialog: function(e) {
                        if (B) {
                            var t = (e = e || {}).eventId || this.lastEventId();
                            if (!t)
                                throw new c("Missing eventId");
                            var n = e.dsn || this._dsn;
                            if (!n)
                                throw new c("Missing DSN");
                            var r = encodeURIComponent
                              , o = "";
                            o += "?eventId=" + r(t),
                            o += "&dsn=" + r(n);
                            var i = e.user || this._globalContext.user;
                            i && (i.name && (o += "&name=" + r(i.name)),
                            i.email && (o += "&email=" + r(i.email)));
                            var a = this._getGlobalServer(this._parseDSN(n))
                              , s = B.createElement("script");
                            s.async = !0,
                            s.src = a + "/api/embed/error-page/" + o,
                            (B.head || B.body).appendChild(s)
                        }
                    },
                    _ignoreNextOnError: function() {
                        var e = this;
                        this._ignoreOnError += 1,
                        setTimeout(function() {
                            e._ignoreOnError -= 1
                        })
                    },
                    _triggerEvent: function(e, t) {
                        var n, r;
                        if (this._hasDocument) {
                            for (r in t = t || {},
                            e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1),
                            B.createEvent ? (n = B.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = B.createEventObject()).eventType = e,
                            t)
                                _(t, r) && (n[r] = t[r]);
                            if (B.createEvent)
                                B.dispatchEvent(n);
                            else
                                try {
                                    B.fireEvent("on" + n.eventType.toLowerCase(), n)
                                } catch (e) {}
                        }
                    },
                    _breadcrumbEventHandler: function(n) {
                        var r = this;
                        return function(e) {
                            if (r._keypressTimeout = null,
                            r._lastCapturedEvent !== e) {
                                var t;
                                r._lastCapturedEvent = e;
                                try {
                                    t = w(e.target)
                                } catch (e) {
                                    t = "<unknown>"
                                }
                                r.captureBreadcrumb({
                                    category: "ui." + n,
                                    message: t
                                })
                            }
                        }
                    },
                    _keypressEventHandler: function() {
                        var o = this
                          , i = 1e3;
                        return function(e) {
                            var t;
                            try {
                                t = e.target
                            } catch (e) {
                                return
                            }
                            var n = t && t.tagName;
                            if (n && ("INPUT" === n || "TEXTAREA" === n || t.isContentEditable)) {
                                var r = o._keypressTimeout;
                                r || o._breadcrumbEventHandler("input")(e),
                                clearTimeout(r),
                                o._keypressTimeout = setTimeout(function() {
                                    o._keypressTimeout = null
                                }, i)
                            }
                        }
                    },
                    _captureUrlChange: function(e, t) {
                        var n = k(this._location.href)
                          , r = k(t)
                          , o = k(e);
                        this._lastHref = t,
                        n.protocol === r.protocol && n.host === r.host && (t = r.relative),
                        n.protocol === o.protocol && n.host === o.host && (e = o.relative),
                        this.captureBreadcrumb({
                            category: "navigation",
                            data: {
                                to: t,
                                from: e
                            }
                        })
                    },
                    _patchFunctionToString: function() {
                        var e = this;
                        e._originalFunctionToString = Function.prototype.toString,
                        Function.prototype.toString = function() {
                            return "function" == typeof this && this.__raven__ ? e._originalFunctionToString.apply(this.__orig__, arguments) : e._originalFunctionToString.apply(this, arguments)
                        }
                    },
                    _unpatchFunctionToString: function() {
                        this._originalFunctionToString && (Function.prototype.toString = this._originalFunctionToString)
                    },
                    _instrumentTryCatch: function() {
                        var c = this
                          , t = c._wrappedBuiltIns;
                        function e(i) {
                            return function(e, t) {
                                for (var n = new Array(arguments.length), r = 0; r < n.length; ++r)
                                    n[r] = arguments[r];
                                var o = n[0];
                                return p(o) && (n[0] = c.wrap(o)),
                                i.apply ? i.apply(this, n) : i(n[0], n[1])
                            }
                        }
                        var u = this._globalOptions.autoBreadcrumbs;
                        function n(l) {
                            var e = T[l] && T[l].prototype;
                            e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (C(e, "addEventListener", function(s) {
                                return function(e, t, n, r) {
                                    try {
                                        t && t.handleEvent && (t.handleEvent = c.wrap(t.handleEvent))
                                    } catch (e) {}
                                    var o, i, a;
                                    return u && u.dom && ("EventTarget" === l || "Node" === l) && (i = c._breadcrumbEventHandler("click"),
                                    a = c._keypressEventHandler(),
                                    o = function(e) {
                                        if (e) {
                                            var t;
                                            try {
                                                t = e.type
                                            } catch (e) {
                                                return
                                            }
                                            return "click" === t ? i(e) : "keypress" === t ? a(e) : void 0
                                        }
                                    }
                                    ),
                                    s.call(this, e, c.wrap(t, void 0, o), n, r)
                                }
                            }, t),
                            C(e, "removeEventListener", function(o) {
                                return function(e, t, n, r) {
                                    try {
                                        t = t && (t.__raven_wrapper__ ? t.__raven_wrapper__ : t)
                                    } catch (e) {}
                                    return o.call(this, e, t, n, r)
                                }
                            }, t))
                        }
                        C(T, "setTimeout", e, t),
                        C(T, "setInterval", e, t),
                        T.requestAnimationFrame && C(T, "requestAnimationFrame", function(t) {
                            return function(e) {
                                return t(c.wrap(e))
                            }
                        }, t);
                        for (var r = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], o = 0; o < r.length; o++)
                            n(r[o])
                    },
                    _instrumentBreadcrumbs: function() {
                        var c = this
                          , e = this._globalOptions.autoBreadcrumbs
                          , t = c._wrappedBuiltIns;
                        function a(e, t) {
                            e in t && p(t[e]) && C(t, e, function(e) {
                                return c.wrap(e)
                            })
                        }
                        if (e.xhr && "XMLHttpRequest"in T) {
                            var n = XMLHttpRequest.prototype;
                            C(n, "open", function(n) {
                                return function(e, t) {
                                    return d(t) && -1 === t.indexOf(c._globalKey) && (this.__raven_xhr = {
                                        method: e,
                                        url: t,
                                        status_code: null
                                    }),
                                    n.apply(this, arguments)
                                }
                            }, t),
                            C(n, "send", function(i) {
                                return function(e) {
                                    var t = this;
                                    function n() {
                                        if (t.__raven_xhr && 4 === t.readyState) {
                                            try {
                                                t.__raven_xhr.status_code = t.status
                                            } catch (e) {}
                                            c.captureBreadcrumb({
                                                type: "http",
                                                category: "xhr",
                                                data: t.__raven_xhr
                                            })
                                        }
                                    }
                                    for (var r = ["onload", "onerror", "onprogress"], o = 0; o < r.length; o++)
                                        a(r[o], t);
                                    return "onreadystatechange"in t && p(t.onreadystatechange) ? C(t, "onreadystatechange", function(e) {
                                        return c.wrap(e, void 0, n)
                                    }) : t.onreadystatechange = n,
                                    i.apply(this, arguments)
                                }
                            }, t)
                        }
                        e.xhr && "fetch"in T && C(T, "fetch", function(l) {
                            return function(e, t) {
                                for (var n = new Array(arguments.length), r = 0; r < n.length; ++r)
                                    n[r] = arguments[r];
                                var o = n[0], i = "GET", a;
                                "string" == typeof o ? a = o : "Request"in T && o instanceof T.Request ? (a = o.url,
                                o.method && (i = o.method)) : a = "" + o,
                                n[1] && n[1].method && (i = n[1].method);
                                var s = {
                                    method: i,
                                    url: a,
                                    status_code: null
                                };
                                return c.captureBreadcrumb({
                                    type: "http",
                                    category: "fetch",
                                    data: s
                                }),
                                l.apply(this, n).then(function(e) {
                                    return s.status_code = e.status,
                                    e
                                })
                            }
                        }, t),
                        e.dom && this._hasDocument && (B.addEventListener ? (B.addEventListener("click", c._breadcrumbEventHandler("click"), !1),
                        B.addEventListener("keypress", c._keypressEventHandler(), !1)) : (B.attachEvent("onclick", c._breadcrumbEventHandler("click")),
                        B.attachEvent("onkeypress", c._keypressEventHandler())));
                        var r = T.chrome, o, i = !(r && r.app && r.app.runtime) && T.history && history.pushState && history.replaceState;
                        if (e.location && i) {
                            var s = T.onpopstate;
                            T.onpopstate = function() {
                                var e = c._location.href;
                                if (c._captureUrlChange(c._lastHref, e),
                                s)
                                    return s.apply(this, arguments)
                            }
                            ;
                            var l = function(t) {
                                return function() {
                                    var e = 2 < arguments.length ? arguments[2] : void 0;
                                    return e && c._captureUrlChange(c._lastHref, e + ""),
                                    t.apply(this, arguments)
                                }
                            };
                            C(history, "pushState", l, t),
                            C(history, "replaceState", l, t)
                        }
                        if (e.console && "console"in T && console.log) {
                            var u = function(e, t) {
                                c.captureBreadcrumb({
                                    message: e,
                                    level: t.level,
                                    category: "console"
                                })
                            };
                            f(["debug", "info", "warn", "error", "log"], function(e, t) {
                                S(console, t, u)
                            })
                        }
                    },
                    _restoreBuiltIns: function() {
                        for (var e; this._wrappedBuiltIns.length; ) {
                            var t = (e = this._wrappedBuiltIns.shift())[0]
                              , n = e[1]
                              , r = e[2];
                            t[n] = r
                        }
                    },
                    _drainPlugins: function() {
                        var o = this;
                        f(this._plugins, function(e, t) {
                            var n = t[0]
                              , r = t[1];
                            n.apply(o, [o].concat(r))
                        })
                    },
                    _parseDSN: function(t) {
                        var e = P.exec(t)
                          , n = {}
                          , r = 7;
                        try {
                            for (; r--; )
                                n[E[r]] = e[r] || ""
                        } catch (e) {
                            throw new c("Invalid DSN: " + t)
                        }
                        if (n.pass && !this._globalOptions.allowSecretKey)
                            throw new c("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                        return n
                    },
                    _getGlobalServer: function(e) {
                        var t = "//" + e.host + (e.port ? ":" + e.port : "");
                        return e.protocol && (t = e.protocol + ":" + t),
                        t
                    },
                    _handleOnErrorStackInfo: function() {
                        this._ignoreOnError || this._handleStackInfo.apply(this, arguments)
                    },
                    _handleStackInfo: function(e, t) {
                        var n = this._prepareFrames(e, t);
                        this._triggerEvent("handle", {
                            stackInfo: e,
                            options: t
                        }),
                        this._processException(e.name, e.message, e.url, e.lineno, n, t)
                    },
                    _prepareFrames: function(r, e) {
                        var o = this
                          , i = [];
                        if (r.stack && r.stack.length && (f(r.stack, function(e, t) {
                            var n = o._normalizeFrame(t, r.url);
                            n && i.push(n)
                        }),
                        e && e.trimHeadFrames))
                            for (var t = 0; t < e.trimHeadFrames && t < i.length; t++)
                                i[t].in_app = !1;
                        return i = i.slice(0, this._globalOptions.stackTraceLimit)
                    },
                    _normalizeFrame: function(e, t) {
                        var n = {
                            filename: e.url,
                            lineno: e.line,
                            colno: e.column,
                            function: e.func || "?"
                        };
                        return e.url || (n.filename = t),
                        n.in_app = !(this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n.function) || /raven\.(min\.)?js$/.test(n.filename)),
                        n
                    },
                    _processException: function(e, t, n, r, o, i) {
                        var a = (e ? e + ": " : "") + (t || ""), s;
                        if ((!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(t) && !this._globalOptions.ignoreErrors.test(a)) && (o && o.length ? (n = o[0].filename || n,
                        o.reverse(),
                        s = {
                            frames: o
                        }) : n && (s = {
                            frames: [{
                                filename: n,
                                lineno: r,
                                in_app: !0
                            }]
                        }),
                        (!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(n)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(n)))) {
                            var l = m({
                                exception: {
                                    values: [{
                                        type: e,
                                        value: t,
                                        stacktrace: s
                                    }]
                                },
                                culprit: n
                            }, i);
                            this._send(l)
                        }
                    },
                    _trimPacket: function(e) {
                        var t = this._globalOptions.maxMessageLength;
                        if (e.message && (e.message = h(e.message, t)),
                        e.exception) {
                            var n = e.exception.values[0];
                            n.value = h(n.value, t)
                        }
                        var r = e.request;
                        return r && (r.url && (r.url = h(r.url, this._globalOptions.maxUrlLength)),
                        r.Referer && (r.Referer = h(r.Referer, this._globalOptions.maxUrlLength))),
                        e.breadcrumbs && e.breadcrumbs.values && this._trimBreadcrumbs(e.breadcrumbs),
                        e
                    },
                    _trimBreadcrumbs: function(e) {
                        for (var t = ["to", "from", "url"], n, r, o, i = 0; i < e.values.length; ++i)
                            if ((r = e.values[i]).hasOwnProperty("data") && s(r.data) && !x(r.data)) {
                                o = m({}, r.data);
                                for (var a = 0; a < t.length; ++a)
                                    n = t[a],
                                    o.hasOwnProperty(n) && o[n] && (o[n] = h(o[n], this._globalOptions.maxUrlLength));
                                e.values[i].data = o
                            }
                    },
                    _getHttpData: function() {
                        if (this._hasNavigator || this._hasDocument) {
                            var e = {};
                            return this._hasNavigator && R.userAgent && (e.headers = {
                                "User-Agent": navigator.userAgent
                            }),
                            this._hasDocument && (B.location && B.location.href && (e.url = B.location.href),
                            B.referrer && (e.headers || (e.headers = {}),
                            e.headers.Referer = B.referrer)),
                            e
                        }
                    },
                    _resetBackoff: function() {
                        this._backoffDuration = 0,
                        this._backoffStart = null
                    },
                    _shouldBackoff: function() {
                        return this._backoffDuration && L() - this._backoffStart < this._backoffDuration
                    },
                    _isRepeatData: function(e) {
                        var t = this._lastData;
                        return !(!t || e.message !== t.message || e.culprit !== t.culprit) && (e.stacktrace || t.stacktrace ? A(e.stacktrace, t.stacktrace) : !e.exception && !t.exception || b(e.exception, t.exception))
                    },
                    _setBackoffState: function(e) {
                        if (!this._shouldBackoff()) {
                            var t = e.status;
                            if (400 === t || 401 === t || 429 === t) {
                                var n;
                                try {
                                    n = e.getResponseHeader("Retry-After"),
                                    n = 1e3 * parseInt(n, 10)
                                } catch (e) {}
                                this._backoffDuration = n || (2 * this._backoffDuration || 1e3),
                                this._backoffStart = L()
                            }
                        }
                    },
                    _send: function(e) {
                        var t = this._globalOptions
                          , n = {
                            project: this._globalProject,
                            logger: t.logger,
                            platform: "javascript"
                        }
                          , r = this._getHttpData();
                        r && (n.request = r),
                        e.trimHeadFrames && delete e.trimHeadFrames,
                        (e = m(n, e)).tags = m(m({}, this._globalContext.tags), e.tags),
                        e.extra = m(m({}, this._globalContext.extra), e.extra),
                        e.extra["session:duration"] = L() - this._startTime,
                        this._breadcrumbs && 0 < this._breadcrumbs.length && (e.breadcrumbs = {
                            values: [].slice.call(this._breadcrumbs, 0)
                        }),
                        i(e.tags) && delete e.tags,
                        this._globalContext.user && (e.user = this._globalContext.user),
                        t.environment && (e.environment = t.environment),
                        t.release && (e.release = t.release),
                        t.serverName && (e.server_name = t.serverName),
                        p(t.dataCallback) && (e = t.dataCallback(e) || e),
                        e && !i(e) && (p(t.shouldSendCallback) && !t.shouldSendCallback(e) || (this._shouldBackoff() ? this._logDebug("warn", "Raven dropped error due to backoff: ", e) : "number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this._sendProcessedPayload(e) : this._sendProcessedPayload(e)))
                    },
                    _getUuid: function() {
                        return r()
                    },
                    _sendProcessedPayload: function(n, r) {
                        var o = this
                          , e = this._globalOptions;
                        if (this.isSetup())
                            if (n = this._trimPacket(n),
                            this._globalOptions.allowDuplicates || !this._isRepeatData(n)) {
                                this._lastEventId = n.event_id || (n.event_id = this._getUuid()),
                                this._lastData = n,
                                this._logDebug("debug", "Raven about to send:", n);
                                var t = {
                                    sentry_version: "7",
                                    sentry_client: "raven-js/" + this.VERSION,
                                    sentry_key: this._globalKey
                                };
                                this._globalSecret && (t.sentry_secret = this._globalSecret);
                                var i = n.exception && n.exception.values[0];
                                this._globalOptions.autoBreadcrumbs && this._globalOptions.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                    category: "sentry",
                                    message: i ? (i.type ? i.type + ": " : "") + i.value : n.message,
                                    event_id: n.event_id,
                                    level: n.level || "error"
                                });
                                var a = this._globalEndpoint;
                                (e.transport || this._makeRequest).call(this, {
                                    url: a,
                                    auth: t,
                                    data: n,
                                    options: e,
                                    onSuccess: function e() {
                                        o._resetBackoff(),
                                        o._triggerEvent("success", {
                                            data: n,
                                            src: a
                                        }),
                                        r && r()
                                    },
                                    onError: function e(t) {
                                        o._logDebug("error", "Raven transport failed to send: ", t),
                                        t.request && o._setBackoffState(t.request),
                                        o._triggerEvent("failure", {
                                            data: n,
                                            src: a
                                        }),
                                        t = t || new Error("Raven send failed (no additional details provided)"),
                                        r && r(t)
                                    }
                                })
                            } else
                                this._logDebug("warn", "Raven dropped repeat event: ", n)
                    },
                    _makeRequest: function(t) {
                        var n = T.XMLHttpRequest && new T.XMLHttpRequest, e;
                        if (n && ("withCredentials"in n || "undefined" != typeof XDomainRequest)) {
                            var r = t.url;
                            "withCredentials"in n ? n.onreadystatechange = function() {
                                if (4 === n.readyState)
                                    if (200 === n.status)
                                        t.onSuccess && t.onSuccess();
                                    else if (t.onError) {
                                        var e = new Error("Sentry error code: " + n.status);
                                        e.request = n,
                                        t.onError(e)
                                    }
                            }
                            : (n = new XDomainRequest,
                            r = r.replace(/^https?:/, ""),
                            t.onSuccess && (n.onload = t.onSuccess),
                            t.onError && (n.onerror = function() {
                                var e = new Error("Sentry error code: XDomainRequest");
                                e.request = n,
                                t.onError(e)
                            }
                            )),
                            n.open("POST", r + "?" + y(t.auth)),
                            n.send(o(t.data))
                        }
                    },
                    _logDebug: function(e) {
                        this._originalConsoleMethods[e] && this.debug && Function.prototype.apply.call(this._originalConsoleMethods[e], this._originalConsole, [].slice.call(arguments, 1))
                    },
                    _mergeContext: function(e, t) {
                        n(t) ? delete this._globalContext[e] : this._globalContext[e] = m(this._globalContext[e] || {}, t)
                    }
                }).setUser = O.prototype.setUserContext,
                O.prototype.setReleaseContext = O.prototype.setRelease,
                D.exports = O
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            1: 1,
            2: 2,
            5: 5,
            6: 6,
            7: 7
        }],
        4: [function(i, a, e) {
            (function(e) {
                var t = i(3)
                  , n = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}
                  , r = n.Raven
                  , o = new t;
                o.noConflict = function() {
                    return n.Raven = r,
                    o
                }
                ,
                o.afterLoad(),
                a.exports = o
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            3: 3
        }],
        5: [function(e, E, t) {
            (function(e) {
                var r = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {};
                function t(e) {
                    return "object" == typeof e && null !== e
                }
                function n(e) {
                    switch ({}.toString.call(e)) {
                    case "[object Error]":
                    case "[object Exception]":
                    case "[object DOMException]":
                        return !0;
                    default:
                        return e instanceof Error
                    }
                }
                function o(e) {
                    return u() && "[object ErrorEvent]" === {}.toString.call(e)
                }
                function i(e) {
                    return void 0 === e
                }
                function a(e) {
                    return "function" == typeof e
                }
                function l(e) {
                    return "[object String]" === Object.prototype.toString.call(e)
                }
                function s(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                function c(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t))
                            return !1;
                    return !0
                }
                function u() {
                    try {
                        return new ErrorEvent(""),
                        !0
                    } catch (e) {
                        return !1
                    }
                }
                function p(r) {
                    function e(e, t) {
                        var n = r(e) || e;
                        return t && t(n) || n
                    }
                    return e
                }
                function d(e, t) {
                    var n, r;
                    if (i(e.length))
                        for (n in e)
                            h(e, n) && t.call(null, n, e[n]);
                    else if (r = e.length)
                        for (n = 0; n < r; n++)
                            t.call(null, n, e[n])
                }
                function g(n, e) {
                    return e && d(e, function(e, t) {
                        n[e] = t
                    }),
                    n
                }
                function f(e) {
                    return !!Object.isFrozen && Object.isFrozen(e)
                }
                function m(e, t) {
                    return !t || e.length <= t ? e : e.substr(0, t) + "…"
                }
                function h(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                function x(e) {
                    for (var t = [], n = 0, r = e.length, o; n < r; n++)
                        l(o = e[n]) ? t.push(o.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : o && o.source && t.push(o.source);
                    return new RegExp(t.join("|"),"i")
                }
                function _(e) {
                    var n = [];
                    return d(e, function(e, t) {
                        n.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
                    }),
                    n.join("&")
                }
                function v(e) {
                    var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
                    if (!t)
                        return {};
                    var n = t[6] || ""
                      , r = t[8] || "";
                    return {
                        protocol: t[2],
                        host: t[4],
                        path: t[5],
                        relative: t[5] + n + r
                    }
                }
                function y() {
                    var e = r.crypto || r.msCrypto;
                    if (i(e) || !e.getRandomValues)
                        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                            var t = 16 * Math.random() | 0, n;
                            return ("x" === e ? t : 3 & t | 8).toString(16)
                        });
                    var t = new Uint16Array(8);
                    e.getRandomValues(t),
                    t[3] = 4095 & t[3] | 16384,
                    t[4] = 16383 & t[4] | 32768;
                    var n = function(e) {
                        for (var t = e.toString(16); t.length < 4; )
                            t = "0" + t;
                        return t
                    };
                    return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
                }
                function w(e) {
                    for (var t = 5, n = 80, r = [], o = 0, i = 0, a = " > ", s = a.length, l; e && o++ < 5 && !("html" === (l = b(e)) || 1 < o && 80 <= i + r.length * s + l.length); )
                        r.push(l),
                        i += l.length,
                        e = e.parentNode;
                    return r.reverse().join(a)
                }
                function b(e) {
                    var t = [], n, r, o, i, a;
                    if (!e || !e.tagName)
                        return "";
                    if (t.push(e.tagName.toLowerCase()),
                    e.id && t.push("#" + e.id),
                    (n = e.className) && l(n))
                        for (r = n.split(/\s+/),
                        a = 0; a < r.length; a++)
                            t.push("." + r[a]);
                    var s = ["type", "name", "title", "alt"];
                    for (a = 0; a < s.length; a++)
                        o = s[a],
                        (i = e.getAttribute(o)) && t.push("[" + o + '="' + i + '"]');
                    return t.join("")
                }
                function A(e, t) {
                    return !!(!!e ^ !!t)
                }
                function k(e, t) {
                    return !A(e, t) && (e = e.values[0],
                    t = t.values[0],
                    e.type === t.type && e.value === t.value && C(e.stacktrace, t.stacktrace))
                }
                function C(e, t) {
                    if (A(e, t))
                        return !1;
                    var n = e.frames, r = t.frames, o, i;
                    if (n.length !== r.length)
                        return !1;
                    for (var a = 0; a < n.length; a++)
                        if (o = n[a],
                        i = r[a],
                        o.filename !== i.filename || o.lineno !== i.lineno || o.colno !== i.colno || o.function !== i.function)
                            return !1;
                    return !0
                }
                function S(e, t, n, r) {
                    var o = e[t];
                    e[t] = n(o),
                    e[t].__raven__ = !0,
                    e[t].__orig__ = o,
                    r && r.push([e, t, o])
                }
                E.exports = {
                    isObject: t,
                    isError: n,
                    isErrorEvent: o,
                    isUndefined: i,
                    isFunction: a,
                    isString: l,
                    isArray: s,
                    isEmptyObject: c,
                    supportsErrorEvent: u,
                    wrappedCallback: p,
                    each: d,
                    objectMerge: g,
                    truncate: m,
                    objectFrozen: f,
                    hasKey: h,
                    joinRegExp: x,
                    urlencode: _,
                    uuid4: y,
                    htmlTreeAsString: w,
                    htmlElementAsString: b,
                    isSameException: k,
                    isSameStacktrace: C,
                    parseUrl: v,
                    fill: S
                }
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}],
        6: [function(t, n, e) {
            (function(e) {
                var h = t(5)
                  , x = {
                    collectWindowErrors: !0,
                    debug: !1
                }
                  , _ = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}
                  , v = [].slice
                  , y = "?"
                  , w = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                function b() {
                    return "undefined" == typeof document || null == document.location ? "" : document.location.href
                }
                x.report = function e() {
                    var o = [], i = null, a = null, u = null, p, t;
                    function n(e) {
                        c(),
                        o.push(e)
                    }
                    function r(e) {
                        for (var t = o.length - 1; 0 <= t; --t)
                            o[t] === e && o.splice(t, 1)
                    }
                    function s() {
                        g(),
                        o = []
                    }
                    function d(e, t) {
                        var n = null;
                        if (!t || x.collectWindowErrors) {
                            for (var r in o)
                                if (o.hasOwnProperty(r))
                                    try {
                                        o[r].apply(null, [e].concat(v.call(arguments, 2)))
                                    } catch (e) {
                                        n = e
                                    }
                            if (n)
                                throw n
                        }
                    }
                    function l(e, t, n, r, o) {
                        var i = null;
                        if (u)
                            x.computeStackTrace.augmentStackTraceWithInitialElement(u, t, n, e),
                            f();
                        else if (o && h.isError(o))
                            d(i = x.computeStackTrace(o), !0);
                        else {
                            var a = {
                                url: t,
                                line: n,
                                column: r
                            }, s = void 0, l = e, c, c;
                            if ("[object String]" === {}.toString.call(e))
                                (c = e.match(w)) && (s = c[1],
                                l = c[2]);
                            a.func = y,
                            d(i = {
                                name: s,
                                message: l,
                                url: b(),
                                stack: [a]
                            }, !0)
                        }
                        return !!p && p.apply(this, arguments)
                    }
                    function c() {
                        t || (p = _.onerror,
                        _.onerror = l,
                        t = !0)
                    }
                    function g() {
                        t && (_.onerror = p,
                        t = !1,
                        p = void 0)
                    }
                    function f() {
                        var e = u
                          , t = i;
                        d.apply(a = u = i = null, [e, !1].concat(t))
                    }
                    function m(e, t) {
                        var n = v.call(arguments, 1);
                        if (u) {
                            if (a === e)
                                return;
                            f()
                        }
                        var r = x.computeStackTrace(e);
                        if (u = r,
                        a = e,
                        i = n,
                        setTimeout(function() {
                            a === e && f()
                        }, r.incomplete ? 2e3 : 0),
                        !1 !== t)
                            throw e
                    }
                    return m.subscribe = n,
                    m.unsubscribe = r,
                    m.uninstall = s,
                    m
                }(),
                x.computeStackTrace = function e() {
                    function r(e) {
                        if (void 0 !== e.stack && e.stack) {
                            for (var t = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, n = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, r = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, o = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, i = /\((\S*)(?::(\d+))(?::(\d+))\)/, a = e.stack.split("\n"), s = [], l, c, u, p = /^(.*) is undefined$/.exec(e.message), d = 0, g = a.length; d < g; ++d) {
                                if (c = t.exec(a[d])) {
                                    var f = c[2] && 0 === c[2].indexOf("native"), m;
                                    (m = c[2] && 0 === c[2].indexOf("eval")) && (l = i.exec(c[2])) && (c[2] = l[1],
                                    c[3] = l[2],
                                    c[4] = l[3]),
                                    u = {
                                        url: f ? null : c[2],
                                        func: c[1] || y,
                                        args: f ? [c[2]] : [],
                                        line: c[3] ? +c[3] : null,
                                        column: c[4] ? +c[4] : null
                                    }
                                } else if (c = r.exec(a[d]))
                                    u = {
                                        url: c[2],
                                        func: c[1] || y,
                                        args: [],
                                        line: +c[3],
                                        column: c[4] ? +c[4] : null
                                    };
                                else {
                                    if (!(c = n.exec(a[d])))
                                        continue;
                                    var m;
                                    (m = c[3] && -1 < c[3].indexOf(" > eval")) && (l = o.exec(c[3])) ? (c[3] = l[1],
                                    c[4] = l[2],
                                    c[5] = null) : 0 !== d || c[5] || void 0 === e.columnNumber || (s[0].column = e.columnNumber + 1),
                                    u = {
                                        url: c[3],
                                        func: c[1] || y,
                                        args: c[2] ? c[2].split(",") : [],
                                        line: c[4] ? +c[4] : null,
                                        column: c[5] ? +c[5] : null
                                    }
                                }
                                !u.func && u.line && (u.func = y),
                                s.push(u)
                            }
                            return s.length ? {
                                name: e.name,
                                message: e.message,
                                url: b(),
                                stack: s
                            } : null
                        }
                    }
                    function p(e, t, n, r) {
                        var o = {
                            url: t,
                            line: n
                        };
                        if (o.url && o.line) {
                            if (e.incomplete = !1,
                            o.func || (o.func = y),
                            0 < e.stack.length && e.stack[0].url === o.url) {
                                if (e.stack[0].line === o.line)
                                    return !1;
                                if (!e.stack[0].line && e.stack[0].func === o.func)
                                    return e.stack[0].line = o.line,
                                    !1
                            }
                            return e.stack.unshift(o),
                            e.partial = !0
                        }
                        return !(e.incomplete = !0)
                    }
                    function d(e, t) {
                        for (var n = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, r = [], o = {}, i = !1, a, s, l, c = d.caller; c && !i; c = c.caller)
                            if (c !== g && c !== x.report) {
                                if (s = {
                                    url: null,
                                    func: y,
                                    line: null,
                                    column: null
                                },
                                c.name ? s.func = c.name : (a = n.exec(c.toString())) && (s.func = a[1]),
                                void 0 === s.func)
                                    try {
                                        s.func = a.input.substring(0, a.input.indexOf("{"))
                                    } catch (e) {}
                                o["" + c] ? i = !0 : o["" + c] = !0,
                                r.push(s)
                            }
                        t && r.splice(0, t);
                        var u = {
                            name: e.name,
                            message: e.message,
                            url: b(),
                            stack: r
                        };
                        return p(u, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description),
                        u
                    }
                    function g(e, t) {
                        var n = null;
                        t = null == t ? 0 : +t;
                        try {
                            if (n = r(e))
                                return n
                        } catch (e) {
                            if (x.debug)
                                throw e
                        }
                        try {
                            if (n = d(e, t + 1))
                                return n
                        } catch (e) {
                            if (x.debug)
                                throw e
                        }
                        return {
                            name: e.name,
                            message: e.message,
                            url: b()
                        }
                    }
                    return g.augmentStackTraceWithInitialElement = p,
                    g.computeStackTraceFromStackProp = r,
                    g
                }(),
                n.exports = x
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            5: 5
        }],
        7: [function(e, t, n) {
            function s(e, t) {
                for (var n = 0; n < e.length; ++n)
                    if (e[n] === t)
                        return n;
                return -1
            }
            function r(e, t, n, r) {
                return JSON.stringify(e, o(t, r), n)
            }
            function l(e) {
                var t = {
                    stack: e.stack,
                    message: e.message,
                    name: e.name
                };
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            }
            function o(r, o) {
                var i = []
                  , a = [];
                return null == o && (o = function(e, t) {
                    return i[0] === t ? "[Circular ~]" : "[Circular ~." + a.slice(0, s(i, t)).join(".") + "]"
                }
                ),
                function(e, t) {
                    if (0 < i.length) {
                        var n = s(i, this);
                        ~n ? i.splice(n + 1) : i.push(this),
                        ~n ? a.splice(n, 1 / 0, e) : a.push(e),
                        ~s(i, t) && (t = o.call(this, e, t))
                    } else
                        i.push(t);
                    return null == r ? t instanceof Error ? l(t) : t : r.call(this, e, t)
                }
            }
            (n = t.exports = r).getSerialize = o
        }
        , {}]
    }, {}, [4])(4)
}),
LPRavenSanitize = function() {
    var n = /(([^<>()\[\]\\.,;:\s@"']+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
      , t = /(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3})|(?:((?:[0-9a-fA-F]{1,4}:){7}(?:[0-9a-fA-F]{1,4}|:)|(?:[0-9a-fA-F]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[0-9a-fA-F]{1,4}|:)|(?:[0-9a-fA-F]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[0-9a-fA-F]{1,4}){1,2}|:)|(?:[0-9a-fA-F]{1,4}:){4}(?:(:[0-9a-fA-F]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[0-9a-fA-F]{1,4}){1,3}|:)|(?:[0-9a-fA-F]{1,4}:){3}(?:(:[0-9a-fA-F]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[0-9a-fA-F]{1,4}){1,4}|:)|(?:[0-9a-fA-F]{1,4}:){2}(?:(:[0-9a-fA-F]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[0-9a-fA-F]{1,4}){1,5}|:)|(?:[0-9a-fA-F]{1,4}:){1}(?:(:[0-9a-fA-F]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[0-9a-fA-F]{1,4}){1,6}|:)|(?::((?::[0-9a-fA-F]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[0-9a-fA-F]{1,4}){1,7}|:)))(%[0-9a-zA-Z]{1,})?)/
      , i = /^(?:(https?|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(?:[\/\w \.-]*)/i
      , o = function(e) {
        if (!c.replaceEmail)
            return e;
        var t = n.exec(e);
        return t && t.length ? "[[*@*." + t.pop() + "]]" : e
    }
      , a = function(e) {
        return c.replaceIp && t.test(e) ? -1 < e.indexOf(".") ? "[[ipv4 address]]" : "[[ipv6 address]]" : e
    }
      , s = function(e) {
        if (!c.replaceUrl)
            return e;
        var t = i.exec(e);
        if (!t || !t.length)
            return e;
        var n = t[1]
          , r = t[2]
          , o = t[3];
        return -1 < r.indexOf("lastpass") ? e : "[[" + (n || "") + r + "." + o + "]]"
    }
      , l = {
        culprit: !0,
        stacktrace: !0
    }
      , c = {
        replaceUrl: !0,
        replaceEmail: !0,
        replaceIp: !0
    }
      , u = function(n) {
        var r = {};
        return Object.keys(n).forEach(function(e) {
            if (r[e] = void 0,
            n[e])
                if (l[e])
                    r[e] = n[e];
                else if (Array.isArray(n[e]))
                    r[e] = n[e].map(function(e) {
                        return u(e)
                    });
                else if ("object" == typeof n[e])
                    r[e] = u(n[e]);
                else if ("string" == typeof n[e]) {
                    var t = n[e];
                    t = o(t),
                    t = a(t),
                    t = s(t),
                    r[e] = t
                }
        }),
        r
    };
    return {
        config: c,
        sanitize: u
    }
}(),
"undefined" == typeof g_iscasper && (g_iscasper = !1);
var ischrome = !0, g_tsstart = (new Date).getTime(), g_bg = null, g_getdata_page = "", g_getdata_handler = null, g_user_prefs_to_write = new Array, g_global_prefs_to_write = new Array, g_delete_group_callback = null, g_delete_aid_callback = null, g_send_sms_passcodes_callback = null, g_security_prompt_handler = null, g_language = null, g_included_language = "", g_language_data = "", g_lastresults, g_lastsearchstring, g_do_totp = !1, g_totp_domains = {
    "amazon.com": !0,
    "dropbox.com": !0,
    "evernote.com": !0,
    "facebook.com": !0,
    "google.com": !0,
    "mailchimp.com": !1,
    "salesforce.com": !1
}, DEFAULT_KEY_ITERATIONS = 100100, g_old_langs = {
    af_ZA: "Afrikaans",
    sq_AL: "Albanian",
    ar: "Arabic",
    ar_EG: "Arabic (Egypt)",
    az_AZ: "Azerbaijani",
    bs_BA: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    zh_CN: "Chinese (Simplified)",
    zh_TW: "Chinese (Traditional)",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en_US: "English",
    en_GB: "English (United Kingdom)",
    eo_US: "Esperanto",
    et: "Estonian",
    fi: "Finnish",
    fr: "French",
    fr_CA: "French (Canada)",
    gl_ES: "Galician",
    ka_GE: "Georgian",
    de: "German",
    el: "Greek",
    he: "Hebrew",
    hu: "Hungarian",
    is_ID: "Icelandic",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    lv: "Latvian",
    lt: "Lithuanian",
    mk_MK: "Macedonian",
    mg_MG: "Malagasy",
    ms: "Malay",
    nb: "Norwegian",
    nn_NO: "Norwegian Nynorsk",
    fa: "Persian",
    pl: "Polish",
    pt_PT: "Portuguese",
    pt_BR: "Portuguese (Brazilian)",
    ro: "Romanian",
    ru: "Russian",
    sr: "Serbian",
    sk: "Slovak",
    sl: "Slovenian",
    es: "Spanish",
    es_419: "Spanish (Mexico)",
    sv: "Swedish",
    tl_PH: "Tagalog",
    ta: "Tamil",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    ur_PK: "Urdu",
    vi: "Vietnamese"
}, g_langs = {
    nl: "Dutch",
    en_US: "English",
    fr: "French",
    de: "German",
    it: "Italian",
    pt_BR: "Portuguese (Brazilian)",
    es: "Spanish"
}, g_webkit_selectable = "-webkit-user-select:none;", g_opera_selectable = "";
function convert_camel(e) {
    return 5 != e.length ? e : e.substring(0, 3) + e.substring(3, 5).toUpperCase();
    var t
}
function transformLocaleCode(e) {
    var t = e.replace("-", "_")
      , n = Object.keys(g_old_langs);
    if (-1 === n.indexOf(t)) {
        var r, o = n.map(function(e) {
            return e.substring(0, 2)
        }).indexOf(t.substring(0, 2));
        t = -1 < o ? n[o] : "en_US"
    }
    return t
}
function include_language(e, t) {
    "object" == typeof reduxApp && reduxApp && reduxApp.setLanguage(e);
    try {
        if (g_included_language === e)
            return;
        g_included_language = e;
        try {
            void 0 !== window.top.lptranslations && (lptranslations = window.top.lptranslations)
        } catch (e) {}
        if ("" == e) {
            if ("es_MX" == (e = (e = navigator.language).replace("-", "_")) && (e = "es_419"),
            e = convert_camel(e),
            void 0 === g_langs[e])
                for (var n in g_langs)
                    if (n.substring(0, 2) == e) {
                        e = n;
                        break
                    }
            void 0 === g_langs[e] && (e = "en_US")
        }
        e = transformLocaleCode(e);
        var r = new Array;
        "en_US" != e && r.push("en_US"),
        r.push(e);
        for (var o = {}, n = 0; n < r.length; n++)
            try {
                if ("Scheme" == (e = r[n]))
                    continue;
                var i = new XMLHttpRequest
                  , a = getchromeurl("_locales/" + (e = e.replace("-", "_")) + "/messages.json", !0);
                if (i.open("GET", a, !1),
                i.overrideMimeType("application/json"),
                i.send(null),
                "en_US" == e ? lptranslations = JSON.parse(i.responseText) : o = JSON.parse(i.responseText),
                o)
                    for (var s in o)
                        "string" == typeof s && (lptranslations[s.toLowerCase()] = o[s])
            } catch (e) {}
        t || (g_language_data = "lptranslations=" + JSON.stringify(lptranslations))
    } catch (e) {}
}
var matches = "undefined" != typeof document && document.location && document.location.href.match(/[?&]lplanguage=([^&]*)/);
matches && include_language(g_language = matches[1]),
is_chrome() && is_edge() && chrome.runtime.sendMessage({
    action: "getTranslations"
}, function(e) {
    lptranslations = e
});
var lpgslocales = []
  , lpgscache = [];
function gs(e, t) {
    var n = e.replace(/[^a-zA-Z0-9_]/g, "_");
    if ("_____" === (n = n.replace(/([A-Z])/g, "_$1")) && "!$%@#" !== e)
        return e;
    var r = "";
    if (void 0 !== t && t && "undefined" != typeof translations && void 0 !== translations[t] && void 0 !== translations[t][e])
        r = translations[t][e];
    else if ("undefined" != typeof lptranslations)
        void 0 !== lptranslations[n.toLowerCase()] && void 0 !== lptranslations[n.toLowerCase()].message ? r = lptranslations[n.toLowerCase()].message : void 0 !== lptranslations[n] && void 0 !== lptranslations[n].message && (r = lptranslations[n].message);
    else if ("undefined" == typeof lptranslations && "undefined" != typeof chrome && void 0 !== chrome.i18n && "function" == typeof chrome.i18n.getMessage)
        try {
            r = chrome.i18n.getMessage(n)
        } catch (e) {}
    void 0 !== r && null != r || (r = ""),
    "" == r && (r = e),
    g_issafari || g_issafari_appext ? r = (r = r.replace(/Google Chrome/g, "Safari")).replace(/Chrome/g, "Safari") : is_opera_chromium() ? r = (r = r.replace(/Google Chrome/g, "Opera")).replace(/Chrome/g, "Opera") : is_edge() ? r = (r = r.replace(/Google Chrome/g, "Edge")).replace(/Chrome/g, "Edge") : g_isfirefoxsdk || is_firefox_webext() ? r = (r = r.replace(/Google Chrome/g, "Firefox")).replace(/Chrome/g, "Firefox") : "string" == typeof g_browseroverride && g_browseroverride.length && (r = (r = r.replace(/Google Chrome/g, g_browseroverride)).replace(/Chrome/g, g_browseroverride));
    var o = "";
    return r
}
function upperFirstChar(e) {
    return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
}
function CheckStringForObfuscation(e, t, n) {
    if (0 != e.indexOf("ff_") || null == n || void 0 === n || 0 != n.indexOf("__"))
        return lpgscache[t] = n;
    n = n.substr(2);
    for (var r = "", o = 0; o < 8; o++)
        r += "arti";
    var i = dec(n, r);
    return lpgscache[t] = i
}
function ApplyOverrides(e) {
    var t = e;
    e = "" == e ? "en-US" : e;
    var n = "undefined" == typeof g_ff ? "" : g_ff;
    if (null != n && "" != n) {
        for (var r = n.split("\n"), o = !1, i = 0; i < r.length; i++) {
            if (o && 0 == r[i].indexOf("lang="))
                return;
            if (o || r[i] != "lang=" + e) {
                if (o) {
                    var a = r[i].indexOf("=");
                    if (-1 != a) {
                        var s = r[i].substr(0, a), l;
                        CheckStringForObfuscation(s, t + s, r[i].substr(a + 1))
                    }
                }
            } else
                o = !0
        }
        lpgslocales[t] = 1
    }
}
function ApplyAllOverrides() {
    lpgscache = [],
    lpgslocales = []
}
function sr(e, t, n, r) {
    var o = e.getElementById(t);
    o && o.setAttribute(n, gs(r))
}
function L(e) {
    g_isdebug && console_log((new Date).getTime() - g_tsstart + " : " + e)
}
function probe(e, t) {
    var n = e;
    for (var r in t) {
        var o = typeof t[r];
        "string" != o && "number" != o || (o = t[r]),
        n += "\n" + r + " : " + o
    }
    L(n)
}
function is_chrome() {
    return void 0 !== g_ischrome ? g_ischrome : g_ischrome = "undefined" != typeof chrome && (void 0 !== chrome.runtime || void 0 !== chrome.extension)
}
function is_safari() {
    return void 0 !== g_issafari ? g_issafari : "undefined" != typeof safari && void 0 !== safari.extension
}
function is_firefox() {
    return !!g_isfirefoxsdk || !("undefined" == typeof self || void 0 === self.data || !self.data || "function" != typeof self.data.url)
}
function getBrowserPlatformId() {
    return is_firefox() ? "ff" : is_safari() ? "saf" : is_edge() ? "edge" : "cr"
}
function get_lplanguage() {
    var e = "";
    return e = void 0 !== g_language && g_language ? g_language : "function" == typeof lpGetPref && lpGetPref("language", "") ? lpGetPref("language", "") : g_issafari_appext ? bg.get("g_language") : navigator.language
}
function getchromeurl(e, t) {
    if (is_chrome()) {
        if (void 0 !== chrome.runtime && void 0 !== chrome.runtime.getURL)
            return chrome.runtime.getURL(e);
        if (void 0 !== chrome.extension)
            return chrome.extension.getURL(e)
    } else if (is_safari() || is_firefox()) {
        if (t || (e += (-1 != e.indexOf("?") ? "&" : "?") + "lplanguage=" + encodeURIComponent(get_lplanguage())),
        is_safari())
            return safari.extension.baseURI + e;
        if (is_firefox())
            try {
                if ("undefined" != typeof self && void 0 !== self.data && self.data && "function" == typeof self.data.url)
                    return self.data.url(e);
                if (getBG() && void 0 !== getBG().g_chrome_url)
                    return getBG().g_chrome_url + e
            } catch (e) {}
    } else {
        if ("undefined" != typeof g_iscasper && g_iscasper)
            return t_get_extension_url() + e;
        if (g_issafari_appext)
            return t || (e += (-1 != e.indexOf("?") ? "&" : "?") + "lplanguage=" + encodeURIComponent(get_lplanguage())),
            location.href.substring(0, location.href.indexOf("background.html")) + e
    }
    return e
}
function ischromeurl(e) {
    return 0 == (e = e.replace(/^blob:/i, "")).indexOf(getchromeurl("", !0)) || 0 == e.indexOf(punycode.URLToASCII(getchromeurl("", !0))) || 0 == e.indexOf(punycode.URLToASCII(punycode.URLToASCII(getchromeurl("", !0))))
}
function testSetParseJson(e, t, n, r) {
    return void 0 !== t.message[n] && (e[n] = r ? t.message[n] : LPJSON.parse(e[n]),
    !0)
}
function callIfFunction(e) {
    "function" == typeof e && e()
}
var getdata_message_handler = Raven.wrap(function(e) {
    var t = getBG();
    if (g_isedge)
        e.message = JSON.parse(JSON.stringify(e)),
        e.name = e.messagetype;
    else if (g_isfirefoxsdk) {
        if (e.origin != window.location.origin || "object" != typeof e.data || void 0 === e.data.messagefrom || "messageshim" != e.data.messagefrom)
            return;
        e.message = e.data,
        e.name = e.data.messagetype
    }
    switch (e.name) {
    case "gotdata":
        for (var n in e.message)
            t[n] = e.message[n];
        switch (void 0 !== t.sitepwlen && ("undefined" == typeof LP && (LP = this),
        LP.sitepwlen = t.sitepwlen),
        g_userprefs = t.g_userprefs = LPJSON.parse(t.g_userprefsstr),
        g_gblprefs = t.g_gblprefs = LPJSON.parse(t.g_gblprefsstr),
        g_prompts = t.g_prompts = LPJSON.parse(t.g_promptsstr),
        g_getdata_page) {
        case "login":
            t.g_reprompt_callback && (t.g_reprompt_callback = function() {
                dispatch_message("reprompt_callback", {
                    g_user_prefs_to_write: LPJSON.stringify(g_user_prefs_to_write)
                })
            }
            ),
            t.g_reprompt_error_callback && (t.g_reprompt_error_callback = function() {
                dispatch_message("reprompt_error_callback", {})
            }
            );
            break;
        case "omnikey":
            t.g_omnikey_callback && (t.g_omnikey_callback = function(e) {
                dispatch_message("omnikey_callback", {
                    pin: e,
                    g_user_prefs_to_write: LPJSON.stringify(g_user_prefs_to_write)
                })
            }
            );
            break;
        case "vault":
            testSetParseJson(t, e, "g_pendings"),
            testSetParseJson(t, e, "lp_attaches");
            break;
        case "formfill":
            t.g_formfill_data = LPJSON.parse(t.g_formfill_data);
            break;
        case "site":
            t.g_site_data = fix_fields(LPJSON.parse(t.g_site_data));
            break;
        case "img":
            t.g_img_data = fix_fields(LPJSON.parse(t.g_img_data))
        }
        testSetParseJson(t, e, "g_icons") && (g_icons = t.g_icons),
        testSetParseJson(t, e, "g_bigicons") && (g_bigicons = t.g_bigicons),
        testSetParseJson(t, e, "g_sites") ? testSetParseJson(t, e, "g_sites_tld") || (t.g_sites_tld = t.g_sites) : testSetParseJson(t, e, "g_sites_tld") && (t.g_sites = t.g_sites_tld),
        testSetParseJson(t, e, "g_shares"),
        testSetParseJson(t, e, "g_savesitestopersonal"),
        testSetParseJson(t, e, "g_securenotes"),
        testSetParseJson(t, e, "g_applications"),
        testSetParseJson(t, e, "g_formfills"),
        testSetParseJson(t, e, "g_identities"),
        testSetParseJson(t, e, "g_nevers"),
        testSetParseJson(t, e, "g_prefoverrides"),
        testSetParseJson(t, e, "g_flags"),
        testSetParseJson(t, e, "g_can_allow_reprompt_skip", !0),
        testSetParseJson(t, e, "g_create_account_data"),
        testSetParseJson(t, e, "g_emer_sharers"),
        testSetParseJson(t, e, "g_emer_sharees"),
        testSetParseJson(t, e, "g_pending_shares"),
        testSetParseJson(t, e, "g_note_templates"),
        testSetParseJson(t, e, "g_reminders"),
        void 0 !== t.g_local_key && null != t.g_local_key && (g_local_key = t.g_local_key,
        g_local_key_hex = AES.bin2hex(g_local_key),
        g_local_key_hash = SHA256(g_local_key)),
        void 0 !== t.ischrome && (ischrome = t.ischrome),
        g_getdata_handler();
        break;
    case "delete_group_callback":
        callIfFunction(g_delete_group_callback);
        break;
    case "delete_aid_callback":
        callIfFunction(g_delete_aid_callback);
        break;
    case "security_prompt_callback":
        callIfFunction(g_security_prompt_handler);
        break;
    case "generatepasswordfound":
        callIfFunction(getBG().g_checkgeneratepasswordcallback);
        break;
    case "send_sms_passcodes_callback":
        "function" == typeof g_send_sms_passcodes_callback && g_send_sms_passcodes_callback(e.message.result);
        break;
    case "unprotect_data_callback":
        if ("undefined" != typeof passwords)
            for (var n in passwords)
                if (passwords[n] == e.message.protected_data) {
                    passwords[n] = e.message.unprotected_data;
                    break
                }
        document.getElementById("p") && document.getElementById("p").value == e.message.protected_data && (document.getElementById("p").value = e.message.unprotected_data),
        "function" == typeof g_unprotect_data_callback && g_unprotect_data_callback(e.message.unprotected_data);
        break;
    case "change_master_password_callback":
        g_change_master_password_callback(e.message.newdata);
        break;
    case "make_lp_key_hash_iterations_callback":
        g_make_lp_key_hash_iterations_callback(e.message.lpkey, e.message.lphash);
        break;
    case "website_event_callback":
        website_event_callback(LPJSON.parse(e.message.data));
        break;
    case "fast_decryptatt_callback":
        var r = e.message.id;
        if (document.getElementById(r)) {
            var o = document.getElementById(r).getElementsByTagName("img");
            if (o && 0 < o.length) {
                var i = o[0];
                i.setAttribute("src", e.message.mimetype + ";base64," + e.message.result),
                t.have_binary() ? i.addEventListener("click", function() {
                    attachment_action_menu(this, showattach)
                }) : i.addEventListener("click", function() {
                    showattach(this)
                })
            }
        }
        break;
    case "fast_encryptatt_callback":
        g_encatt = LPJSON.parse(e.message.data),
        dosave(null, !0);
        break;
    case "get_saved_logins_callback":
        get_saved_logins_callback(e.message.rows);
        break;
    case "cpwbot_got_user_debug_messages":
        var a = document
          , s = LPJSON.parse(e.message.value)
          , l = a.getElementById("cpwmsgdiv");
        s && l && set_innertext(l, s);
        break;
    case "cpwbot_gotpwchangestate":
        var a = document
          , s = LPJSON.parse(e.message.value);
        "undefined" != typeof g_cpwbot_pwchangestate && (g_cpwbot_pwchangestate = s);
        break;
    case "cpwbot_got_dialog_msg":
        var a = document
          , c = LPJSON.parse(e.message.value);
        "undefined" != typeof cpw_progress_update && cpw_progress_update(c);
        break;
    case "create_account_success_callback":
        g_create_account_success_callback(e.message.req);
        break;
    case "create_account_failure_callback":
        g_create_account_failure_callback();
        break;
    case "enable_credit_monitoring_success_callback":
        g_enable_credit_monitoring_success_callback(e.message.req);
        break;
    case "enable_credit_monitoring_failure_callback":
        g_enable_credit_monitoring_failure_callback();
        break;
    case "runonload":
        hidemenu(),
        $("#body").css("background", ""),
        document.getElementById("password_button") && (document.getElementById("password_button").style.display = "none"),
        document.getElementById("password_combo") && (document.getElementById("password_combo").style.display = "none"),
        g_generate = void 0 !== e.message.generate && e.message.generate,
        onLoad();
        break;
    case "data_callback":
        t.g_sites = LPJSON.parse(e.message.g_sites),
        t.g_securenotes = LPJSON.parse(e.message.g_securenotes),
        t.g_applications = LPJSON.parse(e.message.g_applications),
        t.g_formfills = LPJSON.parse(e.message.g_formfills),
        g_menu = getmenu(),
        g_pointer = g_menu;
        break;
    case "raven_response":
        getBG().handleRavenResponse(e.message)
    }
});
function get_data(e, t) {
    if (g_issafari_appext || g_isedge && getBG() === this)
        g_getdata_page = e,
        g_getdata_handler = t,
        dispatch_message("getdata", {
            page: e
        });
    else if (g_ischrome)
        t();
    else if (g_issafari)
        safari.self.addEventListener("message", getdata_message_handler, !1),
        g_getdata_page = e,
        g_getdata_handler = t,
        dispatch_message("getdata", {
            page: e
        });
    else if (g_isfirefoxsdk) {
        if (window.addEventListener("message", getdata_message_handler, !1),
        g_getdata_page = e,
        g_getdata_handler = t,
        dispatch_message("getdata", {
            page: e,
            delay_data: -1 != document.location.href.indexOf("delay_data=1")
        }),
        is_in_panel()) {
            "undefined" == typeof jQuery && addJquery();
            var n = document.createElement("link");
            n.rel = "stylesheet",
            n.type = "text/css",
            n.href = "buttons.css",
            document.head.appendChild(n),
            window.alert = alertex
        } else if (is_in_dialog()) {
            window.addEventListener("keydown", function(e) {
                27 == e.keyCode && getBG().closecurrenttab("")
            });
            try {
                for (var r = 0; r < window.frames.length; r++)
                    window.frames[r].window.addEventListener("keydown", function(e) {
                        27 == e.keyCode && getBG().closecurrenttab("")
                    })
            } catch (e) {}
            "undefined" == typeof jQuery && addJquery(),
            setTimeout(function() {
                resize_html_dialog()
            }, 50),
            setTimeout(function() {
                resize_html_dialog()
            }, 200)
        }
    } else
        "undefined" != typeof g_iscasper && g_iscasper && (g_getdata_page = e,
        g_getdata_handler = t,
        dispatch_message("getdata", {
            page: e
        }))
}
function fakebg() {
    var e = this, t, n, r, o, i, a, s, l;
    this.console_log = console_log,
    this.disablesitealert = function(e) {
        dispatch_message("disablesitealert", {
            aid: e
        })
    }
    ,
    this.disableallalerts = function() {
        dispatch_message("disableallalerts", {})
    }
    ,
    this.lpdbg = function(e, t) {
        dispatch_message("lpdbg", {
            type: e,
            string: t
        })
    }
    ,
    this.sendLpImprove = function(e, t) {
        dispatch_message("sendLpImprove", {
            event: e,
            args: t
        })
    }
    ,
    this.openOnNewTab = function(e) {
        dispatch_message("openOnNewTab", {
            url: e
        })
    }
    ,
    this.set_share_folder_id = function(e) {
        dispatch_message("set_share_folder_id", {
            id: e
        })
    }
    ,
    this.set_share_folder_group = function(e) {
        dispatch_message("set_share_folder_group", {
            group: e
        })
    }
    ,
    this.open_native_messaging_html_if = function() {}
    ,
    this.geticonFF = "undefined" == typeof geticonFF ? void 0 : geticonFF,
    this.get_sitepwlen = get_sitepwlen,
    this.get_saved_logins = (t = get_saved_logins,
    function(e) {
        g_isfirefoxsdk ? (get_saved_logins_callback = e,
        dispatch_message("get_saved_logins", {})) : t(e)
    }
    ),
    this.delete_saved_login = (n = delete_saved_login,
    function(e) {
        g_isfirefoxsdk ? dispatch_message("delete_saved_login", {
            username: e
        }) : n(e)
    }
    ),
    this.getchromeurl = getchromeurl,
    this.processCS = function(e, t, n) {
        dispatch_message("processCS", {
            data: LPJSON.stringify(t)
        })
    }
    ,
    this.get_key_iterations = function(e) {
        return this.g_key_iterations
    }
    ,
    this.lpGetPref = (r = "undefined" == typeof lpGetPref ? void 0 : lpGetPref,
    function(e, t) {
        return void 0 !== r ? r(e, t) : "undefined" != typeof g_userprefs && void 0 !== g_userprefs[e] ? g_userprefs[e] : "undefined" != typeof g_gblprefs && void 0 !== g_gblprefs[e] ? g_gblprefs[e] : t
    }
    ),
    this.lpPutUserPref = function(e, t) {
        g_userprefs[e] = t,
        g_user_prefs_to_write[e] = t
    }
    ,
    this.lpPutGblPref = function(e, t) {
        g_gblprefs[e] = t,
        g_global_prefs_to_write[e] = t
    }
    ,
    this.lpWriteAllPrefs = function() {
        dispatch_message("writeAllPrefs", {
            g_user_prefs_to_write: LPJSON.stringify(g_user_prefs_to_write),
            g_global_prefs_to_write: LPJSON.stringify(g_global_prefs_to_write)
        })
    }
    ,
    this.disablepasswordmanager = function(e) {
        dispatch_message("disablepasswordmanager", {
            disable: e
        })
    }
    ,
    this.LP_do_login = function(e, t, n, r, o, i, a, s) {
        var l = void 0 !== this.g_manual_login && this.g_manual_login;
        dispatch_message("LP_do_login", {
            u: e,
            p: t,
            rememberemail: n,
            rememberpassword: r,
            donotclearmultifactor: o,
            showvault: i,
            lpkey: a,
            lphash: s,
            manual_login: l
        })
    }
    ,
    this.openURL = function(e, t, n) {
        var r = {
            url: e
        };
        n && (r.g_site_data = LPJSON.stringify(n)),
        dispatch_message("openURL", r)
    }
    ,
    this.start_trial = function() {
        dispatch_message("start_trial", {})
    }
    ,
    this.repromptSuccess = function() {
        dispatch_message("repromptSuccess", {})
    }
    ,
    this.install_binary = function() {
        dispatch_message("install_binary", {})
    }
    ,
    this.unlock_plug2web = function() {
        dispatch_message("unlock_plug2web", {})
    }
    ,
    this.have_binary = function() {
        return this.have_nplastpass() || this.have_native_messaging() || this.have_ws() || g_issafari_appext
    }
    ,
    this.have_nplastpass = function() {
        return void 0 !== this.g_have_nplastpass && this.g_have_nplastpass
    }
    ,
    this.get_nplastpass_version = function() {
        return void 0 !== this.g_nplastpass_version ? this.g_nplastpass_version : gs("Unknown")
    }
    ,
    this.get_nplastpass_build_date_time = function() {
        return void 0 !== this.g_nplastpass_build_date_time ? this.g_nplastpass_build_date_time : gs("Unknown")
    }
    ,
    this.have_native_messaging = function() {
        return void 0 !== this.g_have_native_messaging && this.g_have_native_messaging
    }
    ,
    this.have_ws = function() {
        return void 0 !== this.g_have_ws && this.g_have_ws
    }
    ,
    this.have_pplastpass = function() {
        return void 0 !== this.g_have_pplastpass && this.g_have_pplastpass
    }
    ,
    this.can_copy_to_clipboard = function() {
        return void 0 !== this.g_can_copy_to_clipboard && this.g_can_copy_to_clipboard
    }
    ,
    this.can_clear_clipboard = function() {
        return void 0 !== this.g_can_clear_clipboard && this.g_can_clear_clipboard
    }
    ,
    this.copytoclipboard = function(e) {
        var t;
        dispatch_message("copytoclipboard", {
            g_data: e
        })
    }
    ,
    this.is_chrome_portable = function() {
        return void 0 !== this.g_is_chrome_portable && this.g_is_chrome_portable
    }
    ,
    this.update_prefs = function(e) {
        var t = {
            page: e,
            g_user_prefs_to_write: LPJSON.stringify(g_user_prefs_to_write),
            g_global_prefs_to_write: LPJSON.stringify(g_global_prefs_to_write)
        };
        "generate" == e && (t.g_genpws = this.g_genpws),
        dispatch_message("update_prefs", t)
    }
    ,
    this.update_prompts = function() {
        var e = {
            g_prompts: LPJSON.stringify(g_prompts)
        };
        dispatch_message("update_prompts", e)
    }
    ,
    i = {},
    a = 0,
    (o = this).LPRavenTransport = function(e) {
        var t = ++a;
        i[t] = {
            onSuccess: e.onSuccess,
            onError: e.onError
        },
        dispatch_message("raven_transport", {
            requestId: t,
            data: e.data,
            auth: e.auth
        })
    }
    ,
    o.handleRavenResponse = function(e) {
        var t = i[e.requestId];
        e.error ? t.onError(e.error) : t.onSuccess()
    }
    ,
    this.check_ident_aid = function(e) {
        return !0
    }
    ,
    this.check_ident_appaid = function(e) {
        return !0
    }
    ,
    this.check_ident_ffid = function(e) {
        return !0
    }
    ,
    this.DeleteOTP = function() {}
    ,
    this.deletesavedpw = function(e) {
        dispatch_message("deletesavedpw", {
            username: e
        })
    }
    ,
    this.setprefs = function(e, t) {}
    ,
    this.get_searchNotesPref = function() {
        return this.searchinnotes
    }
    ,
    this.IsIconsUpdated = function(e) {
        return this.lpclearrecent ? !(this.lpclearrecent = !1) : this.g_icons_length != e
    }
    ,
    this.getClearRecentTime = function() {
        return this.clearRecentTime
    }
    ,
    this.getRecentCount = function() {
        return this.recentCount
    }
    ,
    this.hex2bin = function(e) {
        return AES.hex2bin(e)
    }
    ,
    this.bin2hex = function(e) {
        return AES.bin2hex(e)
    }
    ,
    this.lp_sort_case_insensitive_name = function(e, t) {
        return (e = e.name.toLowerCase()) < (t = t.name.toLowerCase()) ? -1 : 1
    }
    ,
    this.geticonhtml = geticonhtml,
    this.geticonhtmlfromrecord = geticonhtmlfromrecord,
    this.geticonurl = geticonurl,
    this.geticonurlfromrecord = geticonurlfromrecord,
    this.getbigiconurlfromrecord = getbigiconurlfromrecord,
    this.getbigsquareiconurlfromrecord = getbigsquareiconurlfromrecord,
    this.db_prepend = function(e) {
        return e
    }
    ,
    this.dec = dec,
    this.enc = enc,
    this.lpmdec = (s = lpmdec,
    function(e, t, n) {
        var r = null;
        return n && (r = AES.bin2hex(n)),
        s(e, t, n, r)
    }
    ),
    this.lpmdec_acct = lpmdec_acct,
    this.lpmenc_acct = lpmenc_acct,
    this.lpdec_acct = lpdec_acct,
    this.lpenc_acct = lpenc_acct,
    this.lpmenc = lpmenc,
    this.lpenc = lpenc,
    this.lpdec = lpdec,
    this.openall = function(e) {
        dispatch_message("openall", {
            group: e
        })
    }
    ,
    this.openAllSites = function(e) {
        dispatch_message("openAllSites", {
            sites: e
        })
    }
    ,
    this.deleteGroup = function(e, t, n, r, o, i, a) {
        g_delete_group_callback = n,
        dispatch_message("deleteGroup", {
            group: e
        })
    }
    ,
    this.copyusername = function(e) {
        dispatch_message("copyusername", {
            aid: e
        })
    }
    ,
    this.copypassword = function(e) {
        dispatch_message("copypassword", {
            aid: e
        })
    }
    ,
    this.copyurl = function(e) {
        dispatch_message("copyurl", {
            aid: e
        })
    }
    ,
    this.copynote = function(e) {
        dispatch_message("copynote", {
            aid: e
        })
    }
    ,
    this.deleteAid = function(e, t, n, r, o, i) {
        var a;
        g_delete_aid_callback = o,
        dispatch_message("deleteAid", {
            aid: e,
            skip_pwprotect: n,
            skip_confirm: r
        })
    }
    ,
    this.editAid = function(e, t, n, r) {
        r = r || 0,
        dispatch_message("editAid", {
            aid: e,
            openchpw: r
        })
    }
    ,
    this.gotourl = function(e) {
        dispatch_message("gotourl", {
            aid: e
        })
    }
    ,
    this.launch = function(e, t) {
        dispatch_message("launch", {
            aid: e,
            skip_pwprotect: t
        })
    }
    ,
    this.open_login = function(e) {
        dispatch_message("open_login", {
            forcetab: e
        })
    }
    ,
    this.addprofile = function() {
        dispatch_message("addprofile", {})
    }
    ,
    this.update_create_account_data = function() {
        dispatch_message("update_create_account_data", {
            create_account_data: LPJSON.stringify(getBG().g_create_account_data)
        })
    }
    ,
    this.lpMakeRequest = (l = lpMakeRequest,
    function(e, t, n, r, o, i) {
        LP = LPobj,
        l(e, t, n, r, o, i)
    }
    ),
    this.SecureReprompter = new function() {
        this.add_secret = function(e, t, n, r) {
            dispatch_message("sr_add_secret", {
                aid: e,
                acct: t,
                t: n,
                hash: r
            })
        }
        ,
        this.get_secret = function(e) {
            return dispatch_message("sr_get_secret", {
                id: e
            }),
            null
        }
    }
    ,
    this.of = of,
    this.get_breach_data = function() {
        dispatch_message("get_breach_data", {})
    }
    ,
    this.addcreditcard = function() {
        dispatch_message("addcreditcard", {})
    }
    ,
    this.editprofile = function(e) {
        dispatch_message("editprofile", {
            ffid: e
        })
    }
    ,
    this.openprefs = function(e) {
        dispatch_message("openprefs", {
            tab: e
        })
    }
    ,
    this.openbaseurl = function(e) {
        dispatch_message("openbaseurl", {
            suffix: e
        })
    }
    ,
    this.changemasterpassword = function() {
        dispatch_message("changemasterpassword", {})
    }
    ,
    this.openaddsecurenote = function() {
        dispatch_message("openaddsecurenote", {})
    }
    ,
    this.loggedOut = function(e, t) {
        dispatch_message("loggedOut", {
            skiprequest: e,
            from: t
        })
    }
    ,
    this.switch_identity = function(e, t) {
        this.g_identity = e,
        dispatch_message("switch_identity", {
            iid: e,
            skip_reprompt: t
        })
    }
    ,
    this.renameGroup = function(e, t) {
        dispatch_message("renameGroup", {
            origgrp: e,
            newgrp: t
        })
    }
    ,
    this.addEmptyGroup = function(e, t, n) {
        dispatch_message("addEmptyGroup", {
            newgrp: e
        })
    }
    ,
    this.moveSelectedToGroup = function(e, t, n, r, o) {
        dispatch_message("moveSelectedToGroup", {
            group: e,
            aids: t
        })
    }
    ,
    this.en = function(e) {
        return encodeURIComponent(e)
    }
    ,
    this.update_state = function(e) {
        (g_getdata_page = "vault") == e ? g_getdata_handler = function() {
            checkLoggedInHome(!0)
        }
        : "search" == e && (g_getdata_handler = function() {
            checkVersion(!0)
        }
        ),
        dispatch_message("getdata", {
            page: "vault",
            g_username: this.g_username,
            g_local_accts_version: this.g_local_accts_version,
            lploggedin: this.lploggedin,
            g_identity: this.g_identity,
            g_isadmin: this.g_isadmin,
            g_enterpriseuser: this.g_enterpriseuser,
            g_teamsenterprisemodel: this.g_teamsenterprisemodel,
            g_enterpriseuserrole: this.g_enterpriseuserrole,
            g_iscompanyadmin: this.g_iscompanyadmin,
            g_token: this.g_token,
            g_premium_exp: this.g_premium_exp,
            g_showcredmon: this.g_showcredmon
        })
    }
    ,
    this.security_prompt = function(e) {
        g_security_prompt_handler = e,
        dispatch_message("security_prompt", {})
    }
    ,
    this.savePassword = function(e, t, n, r, o) {
        dispatch_message("savePassword", {
            pass: e,
            url: t,
            tabid: n,
            nofill: r,
            saveOptions: o
        })
    }
    ,
    this.checkgeneratepassword = function(e) {
        dispatch_message("checkgeneratepassword", {
            tabid: e
        })
    }
    ,
    this.fillform = function(e, t, n, r) {
        dispatch_message("fillform", {
            ffid: e,
            origtabid: n,
            ccffid: r
        })
    }
    ,
    this.getsites = function(e, t) {
        return this.g_sites_tld
    }
    ,
    this.changePassword = function(e, t, n, r, o) {
        var i = {
            password: e,
            aids: t
        };
        void 0 === r && void 0 === o ? dispatch_message("changePassword", i) : this.makeBackgroundRequest("changePassword", i, r, o)
    }
    ,
    this.getusernamefromacct = getusernamefromacct,
    this.getpasswordfromacct = getpasswordfromacct,
    this.geturlfromacct = geturlfromacct,
    this.receiveTS = function(e, t) {
        dispatch_message("receiveTS", t)
    }
    ,
    this.deleteformfill = function(e, t, n, r, o, i, a) {
        dispatch_message("deleteformfill", {
            ffid: e
        })
    }
    ,
    this.addeditformfill = function(e, t, n, r) {
        var o = {
            ffdata: LPJSON.stringify(e),
            site: LPJSON.stringify(t)
        };
        dispatch_message("addeditformfill", o)
    }
    ,
    this.getname_url = getname_url,
    this.createNewAcct = createNewAcct,
    this.fix_tlds = function(e, t, n) {
        dispatch_message("fix_tlds", {
            oldtld: e,
            newtld: t,
            aid: n
        })
    }
    ,
    this.moveIntoSharedFolder = function(e, t, n, r, o, i, a) {
        var s = !0;
        return o = o || !1,
        a = a || !1,
        (i = i || !1) ? s = checkMoveIntoSharedFolder(e, t, n, r, o, i, a) : dispatch_message("moveIntoSharedFolder", {
            shareinfo: LPJSON.stringify(e),
            shareinfoorig: LPJSON.stringify(t),
            aidsThatChangedGroups: LPJSON.stringify(n),
            aidsnewgrps: LPJSON.stringify(r),
            copy: o,
            onlycheck: i,
            skipcheck: a
        }),
        s
    }
    ,
    this.increment_local_accts_version = function() {
        dispatch_message("increment_local_accts_version", {})
    }
    ,
    this.rewritelocalfile = function() {
        dispatch_message("rewritelocalfile", {})
    }
    ,
    this.saveSite = function(e, t, n, r) {
        var o;
        dispatch_message("saveSite", {
            postdata: e,
            acct: t
        })
    }
    ,
    this.openLinkedSites = function(e, t, n) {
        dispatch_message("openLinkedSites", {
            password: e,
            tld: t,
            excludeid: n
        })
    }
    ,
    this.saveAllSite = function(e, t, n, r) {
        dispatch_message("saveAllSite", {
            postdata: e,
            acct: LPJSON.stringify(t)
        })
    }
    ,
    this.saveSiteFromSubmit = function(e, t, n, r) {
        dispatch_message("saveSiteFromSubmit", {
            postdata: e,
            acct: LPJSON.stringify(t)
        })
    }
    ,
    this.saveFields = function(e, t, n, r, o) {
        var i = {
            getdata: e,
            postdata: t,
            aData: LPJSON.stringify(n)
        };
        dispatch_message("saveFields", i)
    }
    ,
    this.update_site = function(e) {
        var t = get_record(e);
        t && dispatch_message("update_site", {
            site: LPJSON.stringify(t)
        })
    }
    ,
    this.applyattacharraychanges = function(e) {
        dispatch_message("applyattacharraychanges", {
            changes: LPJSON.stringify(e)
        })
    }
    ,
    this.update_fields = function(e, t) {
        dispatch_message("update_fields", {
            aid: e,
            fields: LPJSON.stringify(t)
        })
    }
    ,
    this.fastDecryptAttachment = function(e, t, n, r, o) {
        dispatch_message("fastDecryptAttachment", {
            id: e,
            mimetype: t,
            data: n,
            attachkey: r,
            key: o
        })
    }
    ,
    this.fastEncryptAttachments = function(e, t, n) {
        var r = {
            akey: e,
            attachments: LPJSON.stringify(t)
        };
        dispatch_message("fastEncryptAttachments", r)
    }
    ,
    this.set_editfieldsopener = function(e) {
        dispatch_message("set_editfieldsopener", {})
    }
    ,
    this.close_editfieldsopener = function() {
        dispatch_message("close_editfieldsopener", {})
    }
    ,
    this.unprotect_data = function(e, t, n) {
        return g_unprotect_data_callback = n,
        dispatch_message("unprotect_data", {
            data: e,
            windowsonly: t
        }),
        n && n(e),
        e
    }
    ,
    this.select_selectedtabid = function() {
        dispatch_message("select_selectedtabid", {})
    }
    ,
    this.closecurrenttab = function(e) {
        g_issafari_appext ? window.close() : dispatch_message("closecurrenttab", {
            page: e
        })
    }
    ,
    this.closeTab = function(e) {
        dispatch_message("closeTab", {
            tabID: e
        })
    }
    ,
    this.addDomainToMPWNever = function() {
        dispatch_message("addDomainToMPWNever", {})
    }
    ,
    this.MPWNoNag = function() {
        dispatch_message("MPWNoNag", {})
    }
    ,
    this.add_identity = function() {
        dispatch_message("add_identity", {})
    }
    ,
    this.checkforupdates = function() {
        dispatch_message("checkforupdates", {})
    }
    ,
    this.clearforms = function() {
        dispatch_message("clearforms", {})
    }
    ,
    this.clearrecent = function() {
        dispatch_message("clearrecent", {})
    }
    ,
    this.openabout = function() {
        dispatch_message("openabout", {})
    }
    ,
    this.openaddsite = function() {
        dispatch_message("openaddsite", {})
    }
    ,
    this.openchooseprofilecc = function() {
        dispatch_message("openchooseprofilecc", {})
    }
    ,
    this.openexport = function() {
        dispatch_message("openexport", {})
    }
    ,
    this.openfavorites = function() {
        dispatch_message("openfavorites", {})
    }
    ,
    this.openfeedback = function() {
        dispatch_message("openfeedback", {})
    }
    ,
    this.opengenpw = function() {
        dispatch_message("opengenpw", {})
    }
    ,
    this.openhelp = function(e) {
        dispatch_message("openhelp", {
            topic: e
        })
    }
    ,
    this.openimport = function() {
        dispatch_message("openimport", {})
    }
    ,
    this.doimport = function(e, t) {
        dispatch_message("doimport", {
            source: e,
            filename: t
        })
    }
    ,
    this.openlastpassexport = function() {
        dispatch_message("openlastpassexport", {})
    }
    ,
    this.wlanexport = function() {
        dispatch_message("wlanexport", {})
    }
    ,
    this.formfillexport = function() {
        dispatch_message("formfillexport", {})
    }
    ,
    this.openpremium = function() {
        dispatch_message("openpremium", {})
    }
    ,
    this.openpricing = function() {
        dispatch_message("openpricing", {})
    }
    ,
    this.openTranslationsReadMore = function() {
        dispatch_message("openTranslationsReadMore", {})
    }
    ,
    this.openentconsole = function() {
        dispatch_message("openentconsole", {})
    }
    ,
    this.openFamilyConsole = function() {
        dispatch_message("openfamilyconsole", {})
    }
    ,
    this.opensearch = function() {
        dispatch_message("opensearch", {})
    }
    ,
    this.openseccheck = function() {
        dispatch_message("openseccheck", {})
    }
    ,
    this.opensessions = function() {
        dispatch_message("opensessions", {})
    }
    ,
    this.openvault = function() {
        dispatch_message("openvault", {})
    }
    ,
    this.recheckpage = function() {
        dispatch_message("recheckpage", {})
    }
    ,
    this.refreshsites = function() {
        dispatch_message("refreshsites", {})
    }
    ,
    this.saveall = function() {
        dispatch_message("saveall", {})
    }
    ,
    this.upgradetoserver = function() {
        dispatch_message("upgradetoserver", {})
    }
    ,
    this.clearCache = function(e) {
        dispatch_message("clearCache", {
            noprompt: e
        })
    }
    ,
    this.loglogin = function(e) {
        dispatch_message("loglogin", {
            aid: e
        })
    }
    ,
    this.deleteNever = function(e) {
        dispatch_message("deleteNever", {
            n: LPJSON.stringify(e)
        })
    }
    ,
    this.fillaid = function(e) {
        dispatch_message("fillaid", {
            aid: e
        })
    }
    ,
    this.openprint = function(e) {
        dispatch_message("openprint", {
            notes: e
        })
    }
    ,
    this.getmatchingsites = function() {
        var e = this.g_sites_tld, t, n, r, o = [];
        for (t in e)
            n = e[t].aid,
            void 0 !== this.g_sites[n] && (r = this.g_sites[n],
            o.push({
                aid: r.aid,
                name: r.name,
                username: getusernamefromacct(r),
                fiid: r.fiid
            }));
        return o
    }
    ,
    this.getnevers = function() {
        return this.g_nevers
    }
    ,
    this.getmenuheight = function(e, t, n, r) {
        return g_menuheight
    }
    ,
    this.isadmin = function() {
        return void 0 !== this.g_isadmin && this.g_isadmin
    }
    ,
    this.getbaseurl = function() {
        return void 0 !== this.base_url ? this.base_url : "https://lastpass.com/"
    }
    ,
    this.change_master_password = function(e, t, n, r) {
        g_change_master_password_callback = r,
        dispatch_message("change_master_password", {
            newusername: e,
            newpassword: t,
            toserver: n
        })
    }
    ,
    this.lpvt_store_data_and_setsinglefactortype = function(e) {
        dispatch_message("lpvt_store_data_and_setsinglefactortype", {
            data: e
        })
    }
    ,
    this.delete_file = function(e) {
        dispatch_message("delete_file", {
            f: e
        })
    }
    ,
    this.lpevent = function(e) {
        dispatch_message("lpevent", {
            w: e
        })
    }
    ,
    this.make_lp_key_hash_iterations = function(e, t, n, r) {
        g_make_lp_key_hash_iterations_callback = r,
        dispatch_message("make_lp_key_hash_iterations", {
            u: e,
            p: t,
            key_iter: n
        })
    }
    ,
    this.gethelpurl = function() {
        return this.getbaseurl() + "help.php?fromwebsite=1"
    }
    ,
    this.can_allow_reprompt_skip = function() {
        return void 0 === this.g_can_allow_reprompt_skip || this.g_can_allow_reprompt_skip
    }
    ,
    this.dopwchange = function(e, t) {
        dispatch_message("dopwchange", {
            aid: e
        })
    }
    ,
    this.cpwbot_get_user_debug_messages = function() {
        dispatch_message("cpwbot_get_user_debug_messages", {})
    }
    ,
    this.cpwbot_getpwchangestate = function() {
        dispatch_message("cpwbot_getpwchangestate", {})
    }
    ,
    this.cpwbot_get_dialog_msg = function() {
        dispatch_message("cpwbot_get_dialog_msg", {})
    }
    ,
    this.cpwbot_preinit = function() {
        dispatch_message("cpwbot_preinit", {})
    }
    ,
    this.cpwbot_halt = function() {
        dispatch_message("cpwbot_halt", {})
    }
    ,
    this.close_cpw_tabs = function() {
        dispatch_message("close_cpw_tabs", {})
    }
    ,
    this.g_show_pw_in_logs = !1,
    this.send_sms_passcodes = function(e, t) {
        g_send_sms_passcodes_callback = t,
        dispatch_message("send_sms_passcodes", {
            postdata: e
        })
    }
    ,
    this.create_account = function(e, t, n) {
        g_create_account_success_callback = t,
        g_create_account_failure_callback = n,
        dispatch_message("create_account", {
            postdata: e
        })
    }
    ,
    this.enable_credit_monitoring = function(e, t, n) {
        g_enable_credit_monitoring_success_callback = t,
        g_enable_credit_monitoring_failure_callback = n,
        dispatch_message("enable_credit_monitoring", {
            postdata: e
        })
    }
    ,
    this.clear_badge = function() {
        dispatch_message("clear_badge", {}),
        g_badgedata = null
    }
    ,
    this.resize_panel = function(e, t, n) {
        dispatch_message("resize_panel", {
            width: e,
            height: t,
            force_30: n
        })
    }
    ,
    this.resize_login_panel = function(e, t) {
        dispatch_message("resize_login_panel", {
            width: e,
            height: t
        })
    }
    ,
    this.resize_html_panel = function(e, t) {
        dispatch_message("resize_html_panel", {
            width: e,
            height: t
        })
    }
    ,
    this.resize_html_dialog = function(e, t) {
        dispatch_message("resize_html_dialog", {
            width: e,
            height: t
        })
    }
    ,
    this.openmyaccount = function() {
        dispatch_message("openmyaccount", {})
    }
    ,
    this.switchLanguage = function(e) {
        dispatch_message("switchLanguage", {
            languageCode: e
        })
    }
    ,
    this.saveUserLanguage = function(e) {
        dispatch_message("saveUserLanguage", {
            languageCode: e
        })
    }
    ,
    this.setcurrenttabid = function(e) {
        g_currenttabid = e
    }
    ,
    this.setcurrenturl = function(e) {
        g_currenturl = e
    }
    ,
    this.gethistorybuf = function() {
        return g_historybuf
    }
    ,
    this.reset_history = function() {
        dispatch_message("reset_history", {})
    }
    ,
    this.opendebugtab = function() {
        dispatch_message("opendebugtab", {})
    }
    ,
    this.is_user_debug_enabled = function() {
        return "undefined" != typeof g_user_debug_enabled && g_user_debug_enabled
    }
    ,
    this.lpReportError = function(e) {
        dispatch_message("lpReportError", {
            msg: e
        })
    }
    ;
    var c = function(e) {
        var t = {};
        for (var n in e) {
            var r = e[n].group;
            r && (t[n] = r)
        }
        return t
    };
    this.refreshGroupNames = function() {
        dispatch_message("refreshGroupNames", {
            data: {
                sites: c(this.g_sites),
                notes: c(this.g_securenotes),
                applications: c(this.g_applications)
            }
        })
    }
    ,
    this.storeAccountLinkToken = storeAccountLinkToken,
    this.removeAccountLinkToken = removeAccountLinkToken
}
function getBG() {
    if (null != g_bg)
        return g_bg;
    try {
        if (g_ischrome) {
            if ("function" == typeof chrome.extension.getBackgroundPage && null != (g_bg = chrome.extension.getBackgroundPage()))
                return g_bg;
            var e = chrome.extension.getViews();
            for (var t in e)
                if ("function" == typeof e[t].receiveTS)
                    return g_bg = e[t]
        } else if (g_issafari || g_isfirefoxsdk)
            if (g_issafari) {
                if (void 0 !== safari.extension.globalPage)
                    return g_bg = safari.extension.globalPage.contentWindow
            } else if (g_isfirefoxsdk && "undefined" != typeof g_firefox_button)
                return this;
        return g_bg = new fakebg
    } catch (e) {
        L("TS : getBG FAILED error=" + e)
    }
    return null
}
function array_length(e) {
    var t = 0;
    for (var n in e)
        t++;
    return t
}
function array_contains(e, t) {
    for (var n in t)
        if (t[n] == e)
            return !0;
    return !1
}
function hostof(e) {
    try {
        var t = document.createElement("a");
        return t.href = e,
        t.host
    } catch (e) {
        return ""
    }
}
function geticonhtml(e, t, n) {
    if (n) {
        var r = n.createElement("img");
        return r.setAttribute("src", geticonurl(e, t)),
        r
    }
    return "<image src='" + geticonurl(e, t) + "'/>"
}
function geticonhtmlfromrecord(e, t) {
    return is_application(e) ? geticonhtml("a" + e.fiid, !1, t) : geticonhtml(void 0 !== e.fiid && "" != e.fiid ? e.fiid : e.aid, "http://sn" == e.url, t)
}
function getNoteValue(e, t, n, r) {
    if (!t)
        return null;
    var o = (t = "\n" + t).indexOf("\n" + (e += ":"));
    if ("NoteType:" == e) {
        if (0 != o)
            return null
    } else if (-1 == o)
        return null;
    o++;
    var i = n ? "-1" : t.indexOf("\n", o);
    -1 == i && (i = t.length);
    var a, s = t.substring(o + e.length, i).replace(/^\s*/, "").replace(/\s*$/, "");
    return r && "" != s ? JSON.parse(s) : s
}
function geticonurlfromrecord(e, t) {
    return is_application(e) ? geticonurl("a" + e.fiid) : geticonurl(void 0 !== e.fiid && "" != e.fiid ? e.fiid : e.aid, "http://sn" == e.url, t)
}
function getbigiconurlfromrecord(e) {
    return getbigicon(e.url)
}
function getbigsquareiconurlfromrecord(e) {
    return getbigicon(e.url, "sq")
}
function getbigicon(e, t) {
    var n = null
      , r = {};
    "undefined" != typeof g_bigicons ? r = g_bigicons : "undefined" != typeof g_bigsquareicons && (r = g_bigsquareicons),
    "undefined" != typeof g_bigsquareicons && t && ("sq" === t || t.square) && (r = g_bigsquareicons);
    var o = hostof(e);
    if (void 0 !== r[o] && (n = r[o]),
    !n) {
        var i = lp_gettld_url(e);
        void 0 !== r[i] && (n = r[i])
    }
    return n = n && "data:image/png;base64," + n,
    t && t.callback && t.callback(n),
    n
}
function geticonurl(e, t, n) {
    var r = "data:image/gif;base64,R0lGODlhEAAQAIcAAAAAAExnf1BpgWR0iHZ6hHeBkX+GkYiOmpeaopucoaSlqqWmqrm9w7q+xL+/wry/xcXGyc3Oz9HS1NPU1tnZ2d/h4+Di5OLj5uPl5+Tk5OXm6O7u7+7v8O/w8e/w8vDw8fHx8vLy8/Pz8/Pz9PT09fX19fX29vb29vf39/f3+Pj4+Pj4+fn5+vr6+/v7/Pz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAiQAAEIHEiw4MAFCBEmQCjBIIAFMiLK8CBjA4QIBiFu2Fgh4oYJDgpq5Chxw4KCCiqSlKigIAKVGyowYNDgAYGCB2BWsHABgwYDBQvA/CCiBAoVBQoOUNlBhAkVLV4MKCigIgenK1zAiCGgYICKIEhAhRExgFcZHEKcYEG27NkOI1K0aCvDLMEAePPqteuwr8CAADs=";
    n && (r = null);
    var o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAcRJREFUOBFjYKAQMJOiP1h0oqo4oxPbg9+7v8D0EWsAY5XBYm9HZYV1isJ8utysjjuvvd/yE2QIUQZ48bap2SoqdTIxMOhwsrBoSXNwyX/5rL73wY8DP4BieAFjqe4iLw9tramXX79q+vnn77W///4xcLKyOAizCoqCdOJzAWOJ5gIvVX7BBayMjLr8bGyaZ56/aOFjZpW68+ldyZwHGadBBjCCCCyAsUB1gZeKIN98JkYmoE3/gUoYGX7+/bd96+2bOXs+Vt6D6WGBMZBoxgKlOV6KfDzz///7L/qH4S/Ylr//GV7df/9uClDzfSS1GC5gzAVqVuAD2cwI9uN/oO3//zO+uv/5U8KUu8k7gJpBzoEDZBcwZsrP8ZLh5Z3/D2jzP0aIuv9Amx98+hQ/7UHKTqAuFM0gU2BhANQ800uWh3c+UABsM0gSqPrlk6/fEnBphhsQLDFFW5eXdz8D0NlAG4EUAwMwtl4+/fEtYe6TDKw2gzSDANgLHCz/mX7//Qe2mRGo+9+/fy+f/f6esOBJNl7NcAMYGH4z/P37D2wi0AEvXv76kbjgOWHNIA2wMGCIFu/TBQkwMfx9ufhl6SsQmy4AAGDppnLK9UyYAAAAAElFTkSuQmCC";
    return "sn" == e ? o : (null != e && (void 0 !== g_icons[e + ".gif"] ? r = "data:image/gif;base64," + g_icons[e + ".gif"] : void 0 !== g_icons[e + ".ico"] ? r = "data:image/ico;base64," + g_icons[e + ".ico"] : t || getBG().g_securenotes && void 0 !== getBG().g_securenotes[e] ? null == (r = geticonsntemplate(e)) && (r = o) : is_formfill(e) && (r = geticonFF(get_ffid(e)))),
    r)
}
function geticonsntemplate(e) {
    var t = getBG();
    if (void 0 !== t.g_securenotes[e] && t.g_securenotes[e].extra.length < 512) {
        var n = getNoteValue("NoteType", lpmdec_acct(t.g_securenotes[e].extra, !0, t.g_securenotes[e], t.g_shares));
        if (n && void 0 !== sntemplateicons[n])
            return sntemplateicons[n]
    }
    return null
}
function getcount(e) {
    var t = 0;
    for (var n in e)
        t++;
    return t
}
function geturlfromacct(e) {
    return e ? is_application(e) || void 0 === e.url || "http://sn" == e.url ? "" : e.url : ""
}
function createNewAcct() {
    var e = {
        aid: "",
        name: "",
        group: "",
        url: "",
        tld: "",
        extra: "",
        fav: "0",
        sharedfromuid: "",
        username: "",
        unencryptedUsername: "",
        password: "",
        pwprotect: 0,
        genpw: 0,
        sn: 0
    };
    return e.last_touch = lp_get_gmt_timestamp(),
    e.autologin = 0,
    e.never_autofill = 0,
    e.realm_data = "",
    e.fiid = "",
    e.custom_js = "",
    e.submit_id = "",
    e.captcha_id = "",
    e.urid = "0",
    e.basic_auth = "0",
    e.method = "",
    e.action = "",
    e.individualshare = !1,
    e.fields = [],
    e
}
function fix_fields(e) {
    if (void 0 !== e.fields && void 0 === e.fields.length) {
        var t = new Array;
        for (var n in e.fields)
            t[t.length] = e.fields[n];
        e.fields = t
    }
    return e
}
g_pageid = "lppage" + (new Date).getTime() + "_" + Math.floor(100 * Math.random()),
LPobj = this;
var g_console_log = "";
function truncatelog() {
    2e4 < g_console_log.length && (g_console_log = g_console_log.substring(g_console_log.length - 2e4))
}
function console_log(e) {
    console.log(e),
    g_issafari && (truncatelog(),
    g_console_log += e + "\n")
}
function console_warn(e) {
    console.warn(e),
    g_issafari && (truncatelog(),
    g_console_log += e + "\n")
}
function console_error(e) {
    console.error(e),
    g_issafari && (truncatelog(),
    g_console_log += e + "\n")
}
function get_key_iterations(e) {
    var t = SHA256(e), n = t + "_key_iter", r;
    return null != localStorage_getItem(n) ? localStorage_getItem(n) : null != localStorage_getItem(t + "_lt.cac") || null != localStorage_getItem(t + ".savedtree") ? (localStorage_setItem(t + "_key_iter", 1),
    1) : DEFAULT_KEY_ITERATIONS
}
function is_application(e) {
    return "string" == typeof e ? 0 == e.indexOf("app") : e && void 0 !== e.appaid
}
function is_formfill(e) {
    return "string" == typeof e ? 0 == e.indexOf("fillforms") : e && void 0 !== e.ffid
}
function get_appaid(e) {
    return 0 == e.indexOf("app") ? e.substring(3) : e
}
function get_ffid(e) {
    return 0 == e.indexOf("fillforms") ? e.substring(9) : e
}
function get_record_id(e) {
    return is_application(e) ? "app" + e.appaid : e.aid
}
function isSecureReprompt(e) {
    if (e) {
        if (e.password && "<SECURE_REPROMPT>" == e.password)
            return !0;
        if (e.extra && "<SECURE_REPROMPT>" == e.extra)
            return !0;
        if (e.fields)
            for (var t = 0; t < e.fields.length; t++)
                if ("password" == e.fields[t].type && "<SECURE_REPROMPT>" == e.fields[t].value)
                    return !0;
        return !1
    }
    return !0
}
function get_record(e, t) {
    if (void 0 === e)
        return null;
    var n = getBG(), r;
    if ((void 0 === t || 0 == t) && void 0 !== n.g_secret_cache && ("string" == typeof n.g_secret_cache && (n.g_secret_cache = LPJSON.parse(n.g_secret_cache)),
    void 0 !== n.g_secret_cache[e] && null !== n.g_secret_cache[e] && null !== n.g_secret_cache[e][0] && isSecureReprompt(get_record(e, !0))))
        return n.g_secret_cache[e][0];
    return is_application(e) ? get_application(e) : "undefined" != typeof g_sites && void 0 !== g_sites[e] ? g_sites[e] : "undefined" != typeof g_securenotes && void 0 !== g_securenotes[e] ? g_securenotes[e] : void 0 !== n.g_sites[e] ? n.g_sites[e] : void 0 !== n.g_securenotes[e] ? n.g_securenotes[e] : void 0 !== n.g_deletedsites && void 0 !== n.g_deletedsites[e] ? n.g_deletedsites[e] : null
}
function get_application(e) {
    return is_application(e) && (e = get_appaid(e)),
    "undefined" != typeof g_applications && void 0 !== g_applications[e] ? g_applications[e] : getBG().g_applications[e]
}
function search_results(e, t, n, r) {
    var o = getBG()
      , i = new Array
      , a = new Array
      , s = new Array;
    if (void 0 !== n && (resultid = document.getElementById(n),
    void 0 !== resultid.childNodes && 0 < resultid.childNodes.length))
        for (var l in resultid.childNodes) {
            var c = resultid.childNodes[l].id;
            void 0 !== o.g_sites[c] && (s[c] = o.g_sites[c]),
            void 0 !== o.g_securenotes[c] && (a[c] = o.g_securenotes[c])
        }
    e = e.toLowerCase(),
    vallist = (g_lastsearchstring = e).split(" ");
    var u = vallist;
    if (void 0 !== n && "" == vallist[vallist.length - 1] && "" != vallist)
        return g_lastresults;
    for (var p in vallist = [vallist[vallist.length - 1]],
    0 == a.length && 0 == s.length && (a = o.g_securenotes,
    s = o.g_sites),
    s)
        for (var d in vallist)
            if (checkfieldsofaid("site", p, vallist[d], t)) {
                shouldappend = !0;
                for (var g = 0; g < u.length; g++)
                    "" != u[g] && (checkfieldsofaid("site", p, u[g], t) || (shouldappend = !1));
                if (shouldappend) {
                    var f = o.g_sites[p];
                    i[i.length] = f
                }
            }
    for (var p in a)
        for (var d in vallist) {
            var m;
            if (checkfieldsofaid("note", p, vallist[d], t)) {
                shouldappend = !0;
                for (var g = 0; g < u.length; g++)
                    "" != u[g] && (checkfieldsofaid("note", p, u[g], t) || (shouldappend = !1));
                var f = o.g_securenotes[p];
                if (shouldappend) {
                    var f = o.g_securenotes[p];
                    i[i.length] = f
                }
            }
        }
    for (var p in o.g_applications) {
        var f;
        if (o.check_ident_appaid(p))
            if (-1 != (f = o.g_applications[p]).appname.toLowerCase().indexOf(e) || -1 != f.name.toLowerCase().indexOf(e) || -1 != f.group.toLowerCase().indexOf(e) || -1 != getusernamefromacct(f).toLowerCase().indexOf(e))
                i[i.length] = f;
            else if (t && 0 < f.extra.length && !f.pwprotect && (void 0 === f.url || "http://group" != f.url)) {
                var h;
                -1 != o.lpmdec_acct(f.extra, !0, f, o.g_shares).toLowerCase().indexOf(e) && (i[i.length] = f)
            }
    }
    if (r)
        for (var x in o.g_formfills) {
            var f;
            if (o.check_ident_ffid(x))
                -1 != (f = o.g_formfills[x]).decprofilename.toLowerCase().indexOf(e) && (i[i.length] = {
                    name: f.decprofilename,
                    aid: "fillforms" + f.ffid,
                    fiid: "fillforms" + f.ffid
                })
        }
    return g_lastresults = i
}
function mostRecent() {
    return "undefined" != typeof window ? window : "undefined" != typeof g_timers ? g_timers : null
}
function currentWindow() {
    return window
}
function en(e) {
    return encodeURIComponent(e)
}
function lpprefsHasUserValue(e, t) {
    return t
}
function lpprefsGetBoolPref(e, t) {
    return t
}
function lpprefsGetIntPref(e, t) {
    return t
}
function lpGetAccounts() {
    get_accts()
}
function elapsedTime(e) {
    if ("undefined" == typeof g_xlat_never && (g_xlat_never = gs("Never")),
    void 0 === e || e < 31536e3)
        return g_xlat_never;
    var t = new Date(e)
      , n = g_language ? g_language.replace("_", "-") : "en-US";
    return t.toLocaleString(n) + " GMT"
}
function is_opera_chromium() {
    return "undefined" == typeof g_isoperachromium && (g_isoperachromium = g_ischrome && -1 != navigator.userAgent.indexOf(" OPR/")),
    g_isoperachromium
}
function is_firefox_webext() {
    return void 0 === g_isfirefoxwebext && (g_isfirefoxwebext = g_ischrome && -1 != navigator.userAgent.indexOf(" Firefox/")),
    g_isfirefoxwebext
}
function is_edge() {
    return void 0 === g_isedge && (g_isedge = g_ischrome && -1 != navigator.userAgent.indexOf(" Edge/")),
    g_isedge
}
function is_edge_chromium() {
    return "undefined" == typeof g_isedgechromium && (g_isedgechromium = g_ischrome && -1 != navigator.userAgent.indexOf(" Edg/")),
    g_isedgechromium
}
function supports_native_messaging() {
    if (is_opera_chromium()) {
        var e = navigator.userAgent.match(/ OPR\/(\d+)/);
        if (e && 20 <= parseInt(e[1]))
            return !0
    } else if (g_ischrome || g_isfirefoxsdk)
        return !0;
    return !1
}
function window_close(e) {
    g_isfirefoxsdk ? getBG().closecurrenttab(e) : window.close()
}
dispatch_message = function() {
    var r = null
      , o = null;
    return function(e, t) {
        if (t = t || {},
        g_isedge)
            r || "undefined" == typeof chrome || void 0 === chrome.extension || void 0 === chrome.extension.getBackgroundPage || (r = chrome.extension.getBackgroundPage()),
            r.message_handler({
                name: e,
                message: t,
                callback: getdata_message_handler
            });
        else if (g_issafari)
            void 0 !== safari.self && void 0 !== safari.self.tab && void 0 !== safari.self.tab.dispatchMessage && safari.self.tab.dispatchMessage(e, t);
        else if (g_isfirefoxsdk)
            t.messagetype = e,
            t.messagefrom = "htmlpage",
            t.messagefromurl = document.location.href,
            window.postMessage(t, window.location.origin);
        else if (g_issafari_appext) {
            if (!o) {
                var n = new LPBackgroundRequester(LPPlatform.requestFrameworkInitializer);
                o = Interfaces.createInstance(Interfaces.BackgroundInterface, {
                    direct: !1,
                    asyncOnly: !0,
                    requestFunction: function(e) {
                        n.sendRequest({
                            type: "backgroundRequest",
                            data: e
                        })
                    }
                })
            }
            o.LPPlatform.postLegacyMessage({
                name: e,
                message: t,
                callback: getdata_message_handler
            })
        }
    }
}(),
checkfieldsofaid = function() {
    var s = function(e, t) {
        return !(!e || -1 == e.toLowerCase().indexOf(t))
    };
    return function(e, t, n, r) {
        var o = getBG();
        if ("site" == e) {
            if (!o.check_ident_aid(t))
                return !1;
            var i;
            if ("http://group" == (i = o.g_sites[t]).url)
                return !1;
            if (s(i.url, n) || s(i.name, n) || s(i.group, n) || s(i.unencryptedUsername, n))
                return !0;
            if (r && 0 < i.extra.length && "http://group" != i.url) {
                var a = o.lpmdec_acct(i.extra, !0, i, o.g_shares);
                if (s(a, n))
                    return !0
            }
        } else if ("note" == e) {
            if (!o.check_ident_aid(t))
                return !1;
            var i = o.g_securenotes[t];
            if (s(i.name, n) || s(i.group, n))
                return !0;
            if (r && 0 < i.extra.length && "http://group" != i.url && !i.pwprotect) {
                var a = getBG().lpmdec_acct(i.extra, !0, i, o.g_shares);
                if (s(a, n))
                    return !0
            }
        }
        return !1
    }
}();
var dbgts = (new Date).getTime();
function lpdbg(e, t) {
    ("object" != typeof dbgall || dbgall[e] || dbgall.all) && void 0 !== g_isdebug && g_isdebug && console_log(Math.floor(((new Date).getTime() - dbgts) / 1e3) + " : " + e + " : " + t)
}
function lplog(e) {
    console_log(e)
}
function convert_object_to_array(e) {
    var t = new Array;
    for (var n in e)
        t[t.length] = e[n];
    return t
}
function getQueryVariable(e, t) {
    var n;
    if (t) {
        var r = t.indexOf("?");
        n = -1 != r ? t.substring(r + 1) : ""
    } else
        n = window.location.search.substring(1);
    for (var o = n.split("&"), i = 0; i < o.length; i++) {
        var a = o[i].split("=");
        if (a[0] == e)
            return decodeURIComponent(a[1])
    }
    return ""
}
function checkMoveIntoSharedFolder(e, t, n, r, o, i, a) {
    var s = "object" == typeof e && "object" == typeof t && e.id == t.id;
    if (!a && !s) {
        var l = gs("You are moving sites to a shared folder. This will potentially make them available to others.\n\nAre you sure you would like to continue?");
        if (void 0 !== e && e ? void 0 !== t && t && (l = gs("You are moving sites to a different shared folder. This may change who has access to the sites.\n\n Do you want to continue?")) : l = gs("You are moving sites from a shared folder into your general vault. This will potentially make them unavailable to others.\n\n Do you want to continue?"),
        !confirm(l))
            return !1
    }
    for (var c in n)
        if (n.hasOwnProperty(c)) {
            var u = get_record(n[c])
              , p = !1;
            if (null == u)
                return alert(gs("Error: This folder has already been moved?")),
                !1;
            if (void 0 !== u.individualshare && u.individualshare) {
                if (null != u.sharedfromaid && "" != u.sharedfromaid && "0" != u.sharedfromaid)
                    return alert(gs("You cannot move individually shared sites into a shared folder.")),
                    !1;
                if (o || a)
                    p = !0;
                else {
                    var l = gs("A site that has been previously shared cannot be moved to a shared folder.\n\nWould you like to make a copy?");
                    if (!confirm(l))
                        return !1;
                    p = !0
                }
            }
        }
    return !0
}
function get_saved_logins(o) {
    var t = getBG();
    t.g_db_transaction_tested = t.g_db_transaction_worked = !1;
    var e = opendb();
    if (e = e || opendb(),
    createSavedLoginsTable(e),
    e)
        if (g_indexeddb) {
            var n = [];
            e.transaction("LastPassSavedLogins2", "readonly").objectStore("LastPassSavedLogins2").index("last_login").openCursor(null, "prev").onsuccess = function(e) {
                var t = e.target.result;
                t ? (n[n.length] = t.value,
                t.continue()) : o(n)
            }
        } else
            e.transaction(function(e) {
                t.g_db_transaction_tested = t.g_db_transaction_worked = !0,
                e.executeSql("SELECT * FROM LastPassSavedLogins2 order by last_login desc", [], function(e, t) {
                    for (var n = new Array, r = 0; r < t.rows.length; r++)
                        n[r] = {
                            username: t.rows.item(r).username,
                            password: t.rows.item(r).password
                        },
                        n[r].protected = t.rows.item(r).protected;
                    o(n)
                }, function(e, t) {
                    console_log(t)
                })
            });
    else
        o([])
}
function delete_saved_login(t) {
    var e = opendb();
    createSavedLoginsTable(e),
    e && (g_indexeddb ? e.transaction("LastPassSavedLogins2", "readwrite").objectStore("LastPassSavedLogins2").delete(t) : e.transaction(function(e) {
        e.executeSql("DELETE FROM LastPassSavedLogins2 WHERE username=?", [t])
    }, function(e, t) {}, function(e, t) {
        console_log(t)
    }))
}
function redirect_to_url(e) {
    g_isfirefoxsdk ? (is_in_panel() || is_in_dialog()) && -1 != e.indexOf("homelocal2.html") ? getBG().openURL(getchromeurl(e)) : (e = getchromeurl(e),
    is_in_panel() ? e += (-1 == e.indexOf("?") ? "?" : "&") + "lpinpanel=1" : is_in_dialog() && (e += (-1 == e.indexOf("?") ? "?" : "&") + "lpindialog=1"),
    setTimeout(function() {
        document.location.href = e
    }, 50)) : document.location.href = e
}
function chrome_runtime_sendMessage(e, t) {
    void 0 !== chrome.runtime && void 0 !== chrome.runtime.sendMessage ? chrome.runtime.sendMessage(e, t) : chrome.extension.sendRequest(e, t)
}
function lp_ofa(e) {
    return ofa(e)
}
function lp_of(e) {
    return of(e)
}
function lp_ofja(e) {
    return ofja(e)
}
function lp_es(e) {
    return es(e)
}
function get_personal_linked(e) {
    var t = getBG().g_shares;
    if (t)
        for (var n in t) {
            var r = t[n];
            if ("object" == typeof r && void 0 !== r.associative && "1" == r.associative)
                return e ? r.decsharename : r.id
        }
    return ""
}
function get_personal_linked_needs_verification() {
    var e = getBG().g_prefoverrides;
    return !!e && "1" == e.personalaccountneedsverification
}
function is_personal_linked(e) {
    var t = get_personal_linked(!0);
    return "" != t && (e == t || 0 == e.indexOf(t + "\\"))
}
function localStorage_setItem(t, e) {
    try {
        return localStorage.setItem(t, e),
        !0
    } catch (e) {
        return L("Failed to setItem(" + t + ") e: " + e),
        !1
    }
}
function localStorage_getItem(t) {
    try {
        return localStorage.getItem(t)
    } catch (e) {
        return L("Failed to getItem(" + t + ") e: " + e),
        null
    }
}
function localStorage_removeItem(t) {
    try {
        return localStorage.removeItem(t)
    } catch (e) {
        return L("Failed to removeItem(" + t + ") e: " + e),
        null
    }
}
function set_innertext(e, t) {
    g_isfirefoxsdk || is_firefox_webext() ? e.textContent = t : e.innerText = t
}
function get_innertext(e) {
    return g_isfirefoxsdk || is_firefox_webext() ? null == e.textContent ? "" : e.textContent : null == e.innerText ? "" : e.innerText
}
function get_srcelement(e) {
    return g_isfirefoxsdk || is_firefox_webext() ? e.target : e.srcElement
}
function is_in_panel() {
    return g_isfirefoxsdk && -1 != document.location.href.indexOf("lpinpanel=1")
}
function is_in_dialog() {
    return g_isfirefoxsdk && -1 != document.location.href.indexOf("lpindialog=1")
}
var addedjquery = !(this.get_default_group = function(e) {
    var t = getBG();
    if ("" != e) {
        var n = get_personal_linked();
        if ("" != n && void 0 !== t.g_savesitestopersonal) {
            var r = t.g_savesitestopersonal;
            if (0 < array_length(r) && !array_contains(lp_gettld_url(punycode.URLToASCII(e)), r)) {
                var o = t.g_shares;
                for (var i in o)
                    if (o[i].id == n)
                        return o[i].decsharename
            }
        }
        if (void 0 !== siteCats[lp_gettld_url(e)])
            return gs(siteCats[lp_gettld_url(e)])
    }
    return ""
}
);
function addJquery() {
    if (!addedjquery) {
        addedjquery = !0;
        var e = document.createElement("script");
        e.setAttribute("src", getchromeurl("min.js")),
        e.setAttribute("type", "text/javascript"),
        document.head.appendChild(e)
    }
}
function resize_html_panel() {
    g_isfirefoxsdk && "undefined" != typeof jQuery && setTimeout(function() {
        getBG().resize_html_panel(Math.min(1280, Math.max(400, $(document).width() + 50)), Math.min(720, Math.max(400, $(document).height() + 50)))
    }, 0)
}
function resize_html_dialog() {
    g_isfirefoxsdk && "undefined" != typeof jQuery && setTimeout(function() {
        getBG().resize_html_dialog(Math.min(1280, Math.max(400, $(document).width() + 50)), Math.min(720, Math.max(400, $(document).height() + 50)))
    }, 0)
}
function confirmex(e, t, n) {
    is_in_panel() ? lpwindow({
        html: of(e).replace(/\n/g, "<br/>"),
        showok: !0,
        showcancel: !0,
        onclick: t,
        onclose: n
    }) : confirm(e) ? t() : n()
}
function alertex(e, t) {
    is_in_panel() ? lpwindow({
        html: of(e).replace(/\n/g, "<br/>"),
        showok: !0,
        onclick: t,
        onclose: t
    }) : (alert(e),
    t && t())
}
function shouldUseSaveAll(e) {
    return e && -1 != e.indexOf("streetscape.com")
}
function is_user_premium() {
    var e = getBG();
    return !!e && !!(e.lploggedin && e.g_premium_exp && parseInt(e.g_premium_exp) > lp_get_local_timestamp() && "1" != e.g_enterpriseuser)
}
function get_devicetype_param() {
    return "function" == typeof is_fennec && is_fennec() ? "&devicetype=" + (-1 != navigator.userAgent.indexOf("Tablet") ? "tablet" : "phone") : ""
}
function get_selected_tab_data_no_extension(e, t) {
    get_selected_tab_data(e, function(e) {
        t(e && e.url && 0 === e.url.indexOf(getchromeurl("", !0)) ? null : e)
    })
}
function gettaburl(e) {
    if (g_issafari_appext)
        return e.tabURL;
    try {
        var t = punycode.URLToASCII(e ? e.url : "");
        return g_isedge && t && 0 == t.indexOf("https://www.msn.com/spartan/") && (t = "about:newtab"),
        t
    } catch (e) {
        return ""
    }
}
function get_selected_tab_data(e, t) {
    get_selected_tab(e, function(e) {
        t({
            id: gettabid(e),
            url: gettaburl(e)
        })
    })
}
function get_selected_tab(e, t) {
    if (g_ischrome) {
        if (void 0 !== chrome.tabs.query) {
            var n = {
                active: !0
            };
            e ? n.windowId = e : n.currentWindow = !0,
            chrome.tabs.query(n, function(e) {
                0 < e.length && t(e[0])
            })
        }
    } else
        g_issafari ? t(safari.application.activeBrowserWindow.activeTab) : g_isfirefoxsdk ? t(g_tabs.activeTab) : g_iscasper ? t(get_casper_active_tab(document)) : g_issafari_appext && LPPlatform.getCurrentTabDetails(t);
    return !0
}
function set_last_reprompt_time() {
    last_reprompt_time = (new Date).getTime(),
    lpPutUserPref("lastreprompttime", last_reprompt_time),
    lpWriteAllPrefs()
}
function get_last_reprompt_time() {
    return lpGetPref("lastreprompttime", 0)
}
function create_label(e, t, n) {
    var r = e.ownerDocument.createElement("label");
    r.setAttribute("for", t),
    set_innertext(r, n),
    LP_decimate_children(e),
    e.appendChild(r)
}
function LP_decimate_children(e) {
    if (e)
        for (; e.firstChild; )
            e.removeChild(e.firstChild)
}
function canLaunchApplication() {
    return "undefined" != typeof g_is_win ? g_is_win : "undefined" != typeof navigator && -1 != navigator.appVersion.indexOf("Windows")
}
function launchApp(e, t) {
    launch("app" + e, t)
}
function no_persistent_messaging() {
    return "undefined" == typeof g_no_persistent_messaging && (g_no_persistent_messaging = "undefined" != typeof chrome && void 0 !== chrome.runtime && void 0 === chrome.runtime.connect && void 0 !== chrome.extension && void 0 === chrome.extension.connect),
    g_no_persistent_messaging
}
function requirechangereuse() {
    return "undefined" != typeof g_prefoverrides && void 0 !== g_prefoverrides.requirechangereuse && "1" == g_prefoverrides.requirechangereuse || ("1" == getQueryVariable("requirechangereuse") || !("undefined" == typeof g_requirechangereuse || !g_requirechangereuse))
}
function isOffline() {
    return g_loggedinoffline && !g_loggedinonline
}
function is_prebuild() {
    return g_ischrome && void 0 !== chrome.runtime && void 0 !== chrome.runtime.id && "debgaelkhoipmbjnhpoblmbacnmmgbeg" == chrome.runtime.id
}
function filterNormalEquivalentDomains(e) {
    var t = {};
    for (var n in e)
        e.hasOwnProperty(n) && ("object" == typeof e[n] && -1 !== e[n].join("").indexOf("=") || (t[n] = e[n]));
    return t
}
function filterExactEquivalentDomains(e) {
    var t = {};
    for (var n in e)
        e.hasOwnProperty(n) && "object" == typeof e[n] && -1 !== e[n].join("").indexOf("=") && (t[n] = e[n].map(function(e) {
            return e.replace("=", "")
        }));
    return t
}
function isStrictDomainMatch(e, t) {
    try {
        return -1 < t.indexOf(new URL(e).hostname)
    } catch (e) {
        return !1
    }
}
function send_message(e) {
    e.messagefrom = "htmlpage",
    window.postMessage(e, window.location.origin)
}
function storeAccountLinkToken(e) {
    localStorage_setItem(g_username_hash + "_personalaccountlinktoken", e)
}
function removeAccountLinkToken() {
    localStorage_removeItem(g_username_hash + "_personalaccountlinktoken")
}
function createElement(e) {
    if (Array.isArray(e))
        return e.map(function(e) {
            return createElement(e)
        });
    var t = document.createElement(e.type);
    if (e.attrs)
        for (var n in e.attrs)
            if (e.attrs.hasOwnProperty(n)) {
                var r = e.attrs[n];
                null != r && t.setAttribute(n, e.attrs[n])
            }
    return e.text ? t.textContent = e.text : e.children && e.children.forEach(function(e) {
        t.appendChild("string" == typeof e ? document.createTextNode(e) : createElement(e))
    }),
    t
}
function emptyElement(e) {
    if (e)
        for (var t = e.childNodes.length; t--; )
            e.removeChild(e.lastChild)
}
function replaceElement(t, e) {
    emptyElement(t);
    var n = createElement(e);
    Array.isArray(n) ? n.forEach(function(e) {
        t.appendChild(e)
    }) : t.appendChild(n)
}
function getAttributes(t, e) {
    return e = e || {},
    t.style && g_ischrome && experimentaloverlay && (t["data-lpstyle"] = t.style,
    delete t.style),
    e.customEvent && (t.lpevent = e.customEvent,
    t.onclick = "this.dispatchEvent(lpcustomEvent);"),
    e.dynamic && e.dynamic.forEach(function(e) {
        t[e.name] = e.value
    }),
    t
}
function show_password_meter(e, t) {
    var n = document.createElement("div");
    n.id = "page_passwordmeterback";
    var r = document.createElement("div");
    r.id = "page_passwordmeterfront",
    n.appendChild(r),
    t.appendChild(n),
    document.getElementById("page_passwordmeterback").style.textAlign = "left",
    document.getElementById("page_passwordmeterback").style.height = "10px",
    document.getElementById("page_passwordmeterback").style.border = "1px solid #B5B8C8",
    document.getElementById("page_passwordmeterback").style.width = e + "px",
    document.getElementById("page_passwordmeterback").style.backgroundImage = "url(images/passwordmeter_back.gif)",
    document.getElementById("page_passwordmeterback").style.marginTop = "3px",
    document.getElementById("page_passwordmeterfront").style.backgroundImage = "url(images/passwordmeter_front.gif)",
    document.getElementById("page_passwordmeterfront").style.height = "10px",
    document.getElementById("page_passwordmeterfront").style.width = "50px",
    document.getElementById("page_passwordmeterfront").style.lineHeight = "1px",
    document.getElementById("page_passwordmeterfront").style.fontSize = "1px"
}
function update_password_meter(e, t, n) {
    var r, o;
    n = n || document,
    update_password_meter_manual(("function" == typeof getpasswordstrength ? getpasswordstrength : LP.getpasswordstrength)(e, t), n)
}
function update_password_meter_manual(e, t) {
    var n = t.getElementById("page_passwordmeterback").clientWidth
      , r = Math.round(e * n / 100) + "px";
    t.getElementById("page_passwordmeterfront").style.width = r
}
function es(e) {
    return e = (e = (e = e.replace(/\\/g, "\\\\")).replace(/'/g, "\\'")).replace(/"/g, '\\"')
}
function of(e) {
    var t = document.createElement("div")
      , n = document.createTextNode(e);
    return t.appendChild(n),
    t.innerHTML
}
function ofa(e) {
    var t = (e = e.toString()).length, n = "", r = 0, o;
    for (o = 0; o < t; ++o)
        (r = e.charCodeAt(o)) < 48 || 57 < r && r < 65 || 90 < r && r < 97 || 122 < r && r < 256 ? (2 != (r = r.toString(16)).length && (r = "0" + r),
        n += "&#x" + r + ";") : n += e.charAt(o);
    return n
}
function ofj(e) {
    if ("string" != typeof e) {
        if (null == e)
            return e;
        e += ""
    }
    var t = "", n, r = e.length, o, i;
    for (n = 0; n < r; ++n)
        ((o = e.charCodeAt(n)) < 48 || 57 < o && o < 65 || 90 < o && o < 97 || 122 < o && o < 256) && 32 != o && 95 !== o ? (0 == (i = (o = o.toString(16)).length) ? o = "0000" : 1 == i ? o = "000" + o : 2 == i ? o = "00" + o : 3 == i && (o = "0" + o),
        t += "\\u" + o) : t += e.charAt(n);
    return t
}
function ofja(e) {
    return "number" == typeof e ? e : ofa(ofj(es(e)))
}
function ofx(e) {
    return e.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&apos;").replace(/\"/g, "&quot;")
}
function Arcfour() {
    this.i = 0,
    this.j = 0,
    this.S = new Array
}
function ARC4init(e) {
    var t, n, r;
    for (t = 0; t < 256; ++t)
        this.S[t] = t;
    for (t = n = 0; t < 256; ++t)
        n = n + this.S[t] + e[t % e.length] & 255,
        r = this.S[t],
        this.S[t] = this.S[n],
        this.S[n] = r;
    this.i = 0,
    this.j = 0
}
function ARC4next() {
    var e;
    return this.i = this.i + 1 & 255,
    this.j = this.j + this.S[this.i] & 255,
    e = this.S[this.i],
    this.S[this.i] = this.S[this.j],
    this.S[this.j] = e,
    this.S[e + this.S[this.i] & 255]
}
function prng_newstate() {
    return new Arcfour
}
this.getpasswordstrength = function(e, t) {
    var n = 0;
    if ("" == e && "" == t)
        return 0;
    if (t == e)
        return 1;
    "" != e && -1 != e.indexOf(t) && (n -= 15),
    "" != e && -1 != t.indexOf(e) && (n -= e.length),
    n += t.length,
    0 < t.length && t.length <= 4 ? n += t.length : 5 <= t.length && t.length <= 7 ? n += 6 : 8 <= t.length && t.length <= 15 ? n += 12 : 16 <= t.length && (n += 18),
    t.match(/[a-z]/) && (n += 1),
    t.match(/[A-Z]/) && (n += 5),
    t.match(/\d/) && (n += 5),
    t.match(/.*\d.*\d.*\d/) && (n += 5),
    t.match(/[!,@,#,$,%,^,&,*,?,_,~]/) && (n += 5),
    t.match(/.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~]/) && (n += 5),
    t.match(/(?=.*[a-z])(?=.*[A-Z])/) && (n += 2),
    t.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/) && (n += 2),
    t.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*,?,_,~])/) && (n += 2);
    var r = [], o = 0, i, a;
    for (i = 0; i < t.length; ++i)
        void 0 === r[a = t.charAt(i)] && (r[a] = 1,
        ++o);
    return 1 == o ? 2 : ((n *= 2) < 0 ? n = 0 : 100 < n && (n = 100),
    n)
}
,
Arcfour.prototype.init = ARC4init,
Arcfour.prototype.next = ARC4next;
var rng_psize = 256, rng_state, rng_pool, rng_pptr;
function rng_seed_int(e) {
    rng_pool[rng_pptr++] ^= 255 & e,
    rng_pool[rng_pptr++] ^= e >> 8 & 255,
    rng_pool[rng_pptr++] ^= e >> 16 & 255,
    rng_pool[rng_pptr++] ^= e >> 24 & 255,
    rng_psize <= rng_pptr && (rng_pptr -= rng_psize)
}
function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}
if (null == rng_pool) {
    var t;
    if (rng_pool = new Array,
    rng_pptr = 0,
    "undefined" != typeof navigator && "Netscape" == navigator.appName && navigator.appVersion < "5" && "undefined" != typeof window && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
    }
    try {
        var crypt_obj = null;
        if ("undefined" != typeof window && void 0 !== window.crypto ? crypt_obj = window.crypto : "undefined" != typeof window && void 0 !== window.msCrypto && (crypt_obj = window.msCrypto),
        void 0 !== crypt_obj && "function" == typeof crypt_obj.getRandomValues && rng_pptr < rng_psize) {
            var num = Math.floor((rng_psize - rng_pptr) / 2) + 1
              , buf = new Uint16Array(num);
            crypt_obj.getRandomValues(buf);
            for (var i = 0; i < buf.length; i++) {
                var t = buf[i];
                rng_pool[rng_pptr++] = t >>> 8,
                rng_pool[rng_pptr++] = 255 & t
            }
        }
    } catch (e) {}
    for (; rng_pptr < rng_psize; )
        t = Math.floor(65536 * Math.random()),
        rng_pool[rng_pptr++] = t >>> 8,
        rng_pool[rng_pptr++] = 255 & t;
    rng_pptr = 0,
    rng_seed_time()
}
function rng_get_byte() {
    if (null == rng_state) {
        for (rng_seed_time(),
        (rng_state = prng_newstate()).init(rng_pool),
        rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(e) {
    var t;
    for (t = 0; t < e.length; ++t)
        e[t] = rng_get_byte()
}
function SecureRandom() {}
function get_random(e, t) {
    var n = t - e + 1;
    rng_seed_time();
    for (var r = new Array, o = 0; o < 4; o++)
        r[o] = 0;
    rng_get_bytes(r);
    for (var i = 0, o = 0; o < 4; o++)
        i *= 256,
        i += r[o];
    return i %= n,
    i += e
}
function get_random_password(e, t) {
    if ("number" != typeof e && (e = 12),
    "number" != typeof t && (t = 16),
    t < e) {
        var n = e;
        e = t,
        t = n
    }
    return pwlen = get_random(e, t),
    rand_str(pwlen)
}
function rand_str(e, t) {
    var n = "";
    t = void 0 !== t ? t : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (var r = 0; r < e; r++)
        n += t.charAt(get_random(0, t.length - 1));
    return n
}
SecureRandom.prototype.nextBytes = rng_get_bytes;
var createRandomHexString = function(e) {
    for (var t = "0123456789ABCDEF", n = "", r = 0; r < e; ++r) {
        var o = get_random(0, t.length - 1);
        n += t.substring(o, o + 1)
    }
    return n
};
"undefined" == typeof btoa && (btoa = function(e) {
    if ("object" == typeof LP && "function" == typeof LP.lpGetCurrentWindow && void 0 === ischrome) {
        var t = LP.lpGetCurrentWindow();
        if ("object" == typeof t && "function" == typeof t.btoa)
            return t.btoa(e)
    }
    if (0 == e.length)
        return "";
    for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", r, o, i, a, s, l, c, u, p = 0, d = ""; s = (u = (r = e.charCodeAt(p++)) << 16 | (o = e.charCodeAt(p++)) << 8 | (i = e.charCodeAt(p++))) >> 12 & 63,
    l = u >> 6 & 63,
    c = 63 & u,
    d += n.charAt(a = u >> 18 & 63) + n.charAt(s) + n.charAt(l) + n.charAt(c),
    p < e.length; )
        ;
    switch (e.length % 3) {
    case 1:
        d = d.slice(0, -2) + "==";
        break;
    case 2:
        d = d.slice(0, -1) + "="
    }
    return d
}
),
"undefined" == typeof atob && (atob = function(e) {
    if ("object" == typeof LP && "function" == typeof LP.lpGetCurrentWindow && void 0 === ischrome) {
        var t = LP.lpGetCurrentWindow();
        if ("object" == typeof t && "function" == typeof t.atob)
            return t.atob(e)
    }
    if ("string" != typeof e || e.length % 4 != 0 || void 0 === e.charAt)
        return "";
    for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", r, o, i, a, s, l, c, u, p = 0, d = ""; r = (u = (a = n.indexOf(e.charAt(p++))) << 18 | (s = n.indexOf(e.charAt(p++))) << 12 | (l = n.indexOf(e.charAt(p++))) << 6 | (c = n.indexOf(e.charAt(p++)))) >> 16 & 255,
    o = u >> 8 & 255,
    i = 255 & u,
    d += 64 == l ? String.fromCharCode(r) : 64 == c ? String.fromCharCode(r, o) : String.fromCharCode(r, o, i),
    p < e.length; )
        ;
    return d
}
);
var AES = function() {
    var e = 4
      , s = [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]]
      , t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      , o = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]
      , i = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125]
      , a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
      , l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      , c = function(e) {
        for (var t = 0; t < 4; t++)
            e[t] = o[e[t]];
        return e
    }
      , u = function(e) {
        for (var t = e[0], n = 0; n < 3; n++)
            e[n] = e[n + 1];
        return e[3] = t,
        e
    }
      , p = function(e, t, n) {
        var r, o;
        for (r = 0; r < 4; r++)
            for (o = 0; o < 4; o++)
                e[r][o] ^= n[4 * t + o][r];
        return e
    }
      , d = function(e) {
        var t, n, r;
        for (t = 0; t < 4; t++)
            for (n = 0; n < 4; n++)
                r = e[t][n],
                e[t][n] = o[e[t][n]];
        return e
    }
      , g = function(e) {
        var t, n, r = new Array;
        for (t = 1; t < 4; t++) {
            for (n = 0; n < 4; n++)
                r[n] = e[t][(n + t) % 4];
            for (n = 0; n < 4; n++)
                e[t][n] = r[n]
        }
        return e
    }
      , f = function(e) {
        var t, n, r = new Array, o = new Array, i = new Array;
        for (t = 0; t < 4; t++) {
            for (n = 0; n < 4; n++)
                r[n] = e[n][t],
                o[n] = r[n] << 1,
                255 < o[n] && (o[n] ^= 283),
                i[n] = r[n] ^ o[n];
            e[0][t] = o[0] ^ i[1] ^ r[2] ^ r[3],
            e[1][t] = r[0] ^ o[1] ^ i[2] ^ r[3],
            e[2][t] = r[0] ^ r[1] ^ o[2] ^ i[3],
            e[3][t] = i[0] ^ r[1] ^ r[2] ^ o[3]
        }
        return e
    }
      , m = function(e) {
        var t, n, r;
        for (t = 0; t < 4; t++)
            for (n = 0; n < 4; n++)
                r = e[t][n],
                e[t][n] = i[e[t][n]];
        return e
    }
      , h = function(e) {
        var t, n, r = new Array;
        for (t = 1; t < 4; t++) {
            for (n = 0; n < 4; n++)
                r[n] = e[t][(n + (4 - t)) % 4];
            for (n = 0; n < 4; n++)
                e[t][n] = r[n]
        }
        return e
    }
      , x = function(e) {
        var t, n, r = new Array, o = new Array, i = new Array, a = new Array, s = new Array, l = new Array, c = new Array, u = new Array;
        for (t = 0; t < 4; t++) {
            for (n = 0; n < 4; n++)
                r[n] = e[n][t],
                o[n] = r[n] << 1,
                255 < o[n] && (o[n] ^= 283),
                i[n] = o[n] << 1,
                255 < i[n] && (i[n] ^= 283),
                a[n] = i[n] << 1,
                255 < a[n] && (a[n] ^= 283),
                s[n] = a[n] ^ r[n],
                l[n] = a[n] ^ o[n] ^ r[n],
                c[n] = a[n] ^ i[n] ^ r[n],
                u[n] = a[n] ^ i[n] ^ o[n];
            e[0][t] = u[0] ^ l[1] ^ c[2] ^ s[3],
            e[1][t] = s[0] ^ u[1] ^ l[2] ^ c[3],
            e[2][t] = c[0] ^ s[1] ^ u[2] ^ l[3],
            e[3][t] = l[0] ^ c[1] ^ s[2] ^ u[3]
        }
        return e
    }
      , _ = function(e) {
        "function" == typeof reportError && reportError(e, null)
    };
    return {
        KeyExpansion: function(e) {
            var t, n, r = new Array, o, i;
            e instanceof Array && (16 == e.length || 24 == e.length || 32 == e.length) || _("KeyExpansion: key must be an array of length 16, 24, or 32 bytes"),
            i = 6 + (o = e.length / 4);
            var a = new Array;
            for (t = 0; t < o; t++)
                a[t] = [e[4 * t], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]];
            for (; t < 4 * (1 + i); t++) {
                for (a[t] = new Array,
                n = 0; n < 4; n++)
                    r[n] = a[t - 1][n];
                if (t % o == 0)
                    for (r = c(u(r)),
                    n = 0; n < 4; n++)
                        r[n] ^= s[t / o][n];
                else
                    6 < o && t % o == 4 && (r = c(r));
                for (n = 0; n < 4; n++)
                    a[t][n] = a[t - o][n] ^ r[n]
            }
            return a
        },
        Cipher: function(e, t) {
            var n, r, o, i = new Array, a = new Array, s;
            if (!(e instanceof Array && 16 == e.length))
                return _("Cipher: input must be an array of length 16"),
                null;
            if (!(t instanceof Array) || 44 != t.length && 52 != t.length && 60 != t.length)
                return _("Cipher: roundKeys must be an array of length 44, 52, or 60"),
                null;
            for (o = t.length / 4 - 1,
            n = 0; n < 4; n++)
                for (i[n] = new Array,
                r = 0; r < 4; r++)
                    i[n][r] = e[n + 4 * r];
            for (i = p(i, 0, t),
            s = 1; s < o; s++)
                i = d(i),
                i = g(i),
                i = f(i),
                i = p(i, s, t);
            for (i = d(i),
            i = g(i),
            i = p(i, o, t),
            n = 0; n < 4; n++)
                for (r = 0; r < 4; r++)
                    a[n + 4 * r] = i[n][r];
            return a
        },
        InvCipher: function(e, t) {
            var n, r, o, i = new Array, a = new Array, s;
            if (!(e instanceof Array && 16 == e.length))
                return _("Cipher: input must be an array of length 16"),
                null;
            if (!(t instanceof Array) || 44 != t.length && 52 != t.length && 60 != t.length)
                return _("Cipher: roundKeys must be an array of length 44, 52, or 60"),
                null;
            for (o = t.length / 4 - 1,
            n = 0; n < 4; n++)
                for (i[n] = new Array,
                r = 0; r < 4; r++)
                    i[n][r] = e[n + 4 * r];
            for (i = p(i, o, t),
            s = o - 1; 0 < s; s--)
                i = h(i),
                i = m(i),
                i = p(i, s, t),
                i = x(i);
            for (i = h(i),
            i = m(i),
            i = p(i, 0, t),
            n = 0; n < 4; n++)
                for (r = 0; r < 4; r++)
                    a[n + 4 * r] = i[n][r];
            return a
        },
        StringToKeyIv: function(e, t) {
            var n, r = new Array, o = new Array, i = new Array, a = 0, s = 16, l;
            if (128 != t && 192 != t && 256 != t)
                return _("BytesToKey: bits must be 128, 192, or 256"),
                null;
            for (a = t / 8,
            l = 0; l < e.length; l++)
                r[l] = e.charCodeAt(l);
            for (; ; ) {
                if (l = 0,
                a)
                    for (; a && (o.push(r[l++]),
                    a--,
                    l != r.length); )
                        ;
                if (s && l < r.length)
                    for (; s && (i.push(r[l++]),
                    s--,
                    l != r.length); )
                        ;
                if (!a && !s || !a && l >= r.length)
                    break
            }
            return {
                key: o,
                iv: i
            }
        },
        StringToPaddedData: function(e) {
            var t = new Array, n;
            for (e = AES._utf8_encode(e),
            n = 0; n < e.length; n++)
                t.push(e.charCodeAt(n));
            var r = 16 - n % 16;
            for (n = 0; n < r; n++)
                t.push(r);
            return t
        },
        PaddedDataToString: function(e, t) {
            var n = "", r, o = e[e.length - 1];
            if (0 <= o && o <= 16) {
                for (r = e.length - 1; 0 < r && e[r] == o; r--)
                    ;
                for (var i = 0; i <= r; i++)
                    n += String.fromCharCode(e[i])
            }
            return n = AES._utf8_decode(n)
        },
        _utf8_encode: function(e) {
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r < 128 ? t += String.fromCharCode(r) : (127 < r && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224),
                t += String.fromCharCode(r >> 6 & 63 | 128)),
                t += String.fromCharCode(63 & r | 128))
            }
            return t
        },
        _utf8_decode: function(e) {
            for (var t = "", n = 0, r = 0, o = 0, i = 0, a = 0; n < e.length; )
                (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r),
                n++) : 191 < r && r < 224 ? (i = e.charCodeAt(n + 1),
                t += String.fromCharCode((31 & r) << 6 | 63 & i),
                n += 2) : (i = e.charCodeAt(n + 1),
                a = e.charCodeAt(n + 2),
                t += String.fromCharCode((15 & r) << 12 | (63 & i) << 6 | 63 & a),
                n += 3);
            return t
        },
        db64: function(e) {
            return atob(e)
        },
        eb64: function(e) {
            return btoa(e)
        },
        BytesToB64: function(e) {
            var t, n = "";
            for (t = 0; t < e.length; t++)
                n += String.fromCharCode(e[t]);
            return AES.eb64(n)
        },
        B64ToBytes: function(e) {
            for (var t = AES.db64(e), n = new Array, r = 0; r < t.length; r++)
                n[r] = t.charCodeAt(r);
            return n
        },
        Prepare: function(e) {
            var t, n, r, o = 256, i = {
                mode: "ecb",
                b64: !1,
                data: new Array,
                key: new Array,
                iv: new Array
            };
            if ("cbc" == e.mode && (i.mode = e.mode),
            1 == e.b64 && (i.b64 = e.b64),
            "string" == typeof e.pass) {
                for (128 != e.bits && 192 != e.bits || (o = e.bits),
                n = AES.StringToKeyIv(e.pass, o),
                t = 0; t < n.key.length; t++)
                    i.key[t] = n.key[t];
                for (t = 0; t < n.iv.length; t++)
                    i.iv[t] = n.iv[t]
            } else {
                if (!(e.key instanceof Array) || 16 != e.key.length && 24 != e.key.length && 32 != e.key.length)
                    return _("obj.key must be a byte array of length 16, 24, or 32"),
                    null;
                for (t = 0; t < e.key.length; t++) {
                    if ("number" != typeof e.key[t])
                        return _("obj.key must be a byte array of length 16, 24, or 32"),
                        null;
                    i.key[t] = e.key[t]
                }
                if ("cbc" == i.mode) {
                    if (!(e.iv instanceof Array) || 16 != e.iv.length)
                        return _("obj.iv must be a byte array of length 16"),
                        null;
                    for (t = 0; t < e.iv.length; t++) {
                        if ("number" != typeof e.iv[t])
                            return _("obj.iv must be a byte array of length 16"),
                            null;
                        i.iv[t] = e.iv[t]
                    }
                }
            }
            if ("string" == typeof e.data)
                for (r = AES.StringToPaddedData(e.data),
                t = 0; t < r.length; t++)
                    i.data[t] = r[t];
            else {
                if (!(e.data instanceof Array) || e.data.length % 16)
                    return _("obj.data must be a byte array with a multiple of 16 length "),
                    null;
                for (t = 0; t < e.data.length; t++) {
                    if ("number" != typeof e.data[t])
                        return _("obj.data must be a byte array with a multiple of 16 length "),
                        null;
                    i.data[t] = e.data[t]
                }
            }
            return i.round = AES.KeyExpansion(i.key),
            i
        },
        CreateIV: function(e) {
            var t = {
                arr: [],
                str: ""
            };
            try {
                var n = null;
                if ("undefined" != typeof window && void 0 !== window.crypto ? n = window.crypto : "undefined" != typeof window && void 0 !== window.msCrypto && (n = window.msCrypto),
                "undefined" != typeof Uint8Array && null != n && void 0 !== n.getRandomValues) {
                    var r = new Uint8Array(e);
                    for (n.getRandomValues(r),
                    k = 0; k < e; ++k)
                        t.arr[k] = parseInt(r[k]),
                        t.str += String.fromCharCode(t.arr[k]);
                    return t
                }
            } catch (e) {
                console.log(e)
            }
            for (k = 0; k < e; ++k)
                t.arr[k] = Math.floor(256 * Math.random()),
                t.str += String.fromCharCode(t.arr[k]);
            return t
        },
        Encrypt: function(e) {
            var t = new Array, n = new Array, r, o, i, a, s;
            if (null == (s = AES.Prepare(e)))
                return null;
            for ("cbc" == s.mode && (r = s.iv),
            i = 0; i < s.data.length / 16; i++) {
                for (o = 0; o < 16; o++)
                    n[o] = s.data[16 * i + o],
                    "cbc" == s.mode && (n[o] ^= r[o]);
                for (r = AES.Cipher(n, s.round),
                o = 0; o < 16; o++)
                    t[16 * i + o] = r[o]
            }
            return s.b64 && (t = AES.BytesToB64(t)),
            t
        },
        Decrypt: function(e, t) {
            var n = new Array, r = new Array, o = new Array, i, a, s, l, c;
            if (null == (c = AES.Prepare(e)))
                return null;
            if (c.b64 && (c.data = AES.B64ToBytes(e.data)),
            "cbc" == c.mode)
                for (a = 0; a < c.iv.length; a++)
                    o[a] = c.iv[a];
            for (s = 0; s < c.data.length / 16; s++) {
                if (0 < s && "cbc" == c.mode)
                    for (a = 0; a < 16; a++)
                        o[a] = r[a];
                for (a = 0; a < 16; a++)
                    r[a] = c.data[16 * s + a];
                for (i = AES.InvCipher(r, c.round),
                a = 0; a < 16; a++)
                    n[16 * s + a] = i[a],
                    "cbc" == c.mode && (n[16 * s + a] ^= o[a])
            }
            return AES.PaddedDataToString(n, t)
        },
        bin2hex: function(e) {
            if (null == e)
                return "";
            for (var t = e.length, n = "", r, o = 0; 0 < t--; )
                r = e.charCodeAt(o++),
                n += a[(240 & r) >> 4],
                n += a[15 & r];
            return n
        },
        url2hex: function(e) {
            return null == e ? "" : (e = AES._utf8_encode(e),
            AES.bin2hex(e))
        },
        hex2url: function(e) {
            return null == e ? "" : (e = AES._utf8_decode(e),
            AES.hex2bin(e))
        },
        hex2bin: function(e) {
            if (null == e)
                return "";
            for (var t = e.length, n = "", r, o, i, a, s = 0; 1 < t; )
                r = (i = e.charAt(s++)).charCodeAt(0),
                o = (a = e.charAt(s++)).charCodeAt(0),
                n += String.fromCharCode((l[r] << 4) + l[o]),
                t -= 2;
            return n
        },
        ok: function(e) {
            if ("string" != typeof e)
                return !1;
            if (0 == e.length)
                return !0;
            if (16 <= e.length) {
                if (AES.isb64(e))
                    return !0;
                var t = e.match(/^!([^|]*)\|(.*)$/);
                if (t && AES.isb64(t[1]) && AES.isb64(t[2]))
                    return !0
            }
            return !1
        },
        isb64: function(e) {
            var t = new RegExp("^[A-Za-z0-9+/=]+$");
            return !!e.match(t)
        }
    }
}()
  , lp_sha2lib = SHA256lib();
function SHA256(e, t) {
    return lp_sha2lib.sha256(e, t)
}
function SHA256_crypt(e) {
    var t = rand_str(16);
    return lp_sha2lib.crypt_sha256(e, t, 5e3, null)
}
function ab2bin(e) {
    for (var t = 1024, n = new Uint8Array(e), r = "", o = 0; o < Math.ceil(e.byteLength / t); o++)
        r += String.fromCharCode.apply(null, n.slice(o * t, t * (o + 1)));
    return r
}
function bin2ab(e) {
    for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), r = 0; r < e.length; ++r)
        n[r] = e.charCodeAt(r);
    return t
}
function lp_pbkdf2_sync(t, e, n, r, o) {
    if ("undefined" != typeof document && document.getElementById("lpplugin") && "function" == typeof document.getElementById("lpplugin").pbkdf2) {
        var i = document.getElementById("lpplugin").pbkdf2(btoa(t), btoa(e), n, r);
        return "function" == typeof o && o(AES.hex2bin(i), t, n),
        i
    }
    if ("undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 || "function" != typeof lpusexpcomencrypt || !lpusexpcomencrypt() || "function" != typeof lpxpcomobj.pbkdf2) {
        if ("undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 || "function" != typeof lpuseopensslpbkdf2 || !lpuseopensslpbkdf2() || "function" != typeof lpopensslpbkdf2) {
            if ("undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 || "function" != typeof have_binary_function || !have_binary_function("pbkdf2") || "function" != typeof o) {
                if ("undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 || "function" != typeof have_nplastpass || !have_nplastpass() || "undefined" == typeof g_nplastpass || "function" != typeof g_nplastpass.pbkdf2)
                    return "undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 || "function" != typeof have_pplastpass || !have_pplastpass() || "function" != typeof o ? "undefined" == typeof lptoolband || "undefined" == typeof lptoolbandcall ? lp_sha2lib.pbkdf2(t, e, n, r, o) : "string" != typeof (i = lptoolbandcall(["lppbkdf2", btoa(t), btoa(e), parseInt(n), r])) || 0 == i.length ? lp_sha2lib.pbkdf2(t, e, n, r, o) : ("function" == typeof o && o(AES.hex2bin(i), t, n),
                    i) : pplastpass_send_message({
                        cmd: "pbkdf2",
                        password: btoa(t),
                        salt: btoa(e),
                        num_iterations: parseInt(n),
                        num_bytes: r
                    }, function(e) {
                        o(AES.hex2bin(e), t, n)
                    });
                var i = g_nplastpass.pbkdf2(btoa(t), btoa(e), n, r), i;
                return "function" == typeof o && o(AES.hex2bin(i), t, n),
                i
            }
            return call_binary_function("pbkdf2", btoa(t), btoa(e), parseInt(n), r, function(e) {
                o(AES.hex2bin(e), t, n)
            })
        }
        var i = lpopensslpbkdf2(t, e, n, r);
        return "function" == typeof o && o(AES.hex2bin(i), t, n),
        i
    }
    var i = lpxpcomobj.pbkdf2(btoa(t), btoa(e), n, r);
    return "function" == typeof o && o(AES.hex2bin(i), t, n),
    i
}
function lp_pbkdf2(t, n, r, e, o) {
    if (!(o && "undefined" != typeof crypto && crypto.subtle && crypto.subtle.importKey && crypto.subtle.deriveKey && crypto.subtle.exportKey))
        return lp_pbkdf2_sync(t, n, r, e, o);
    var i = crypto.subtle.importKey("raw", bin2ab(t), {
        name: "PBKDF2"
    }, !1, ["deriveBits", "deriveKey"]).then(function(e) {
        return crypto.subtle.deriveKey({
            name: "PBKDF2",
            salt: bin2ab(n),
            iterations: parseInt(r, 10),
            hash: "SHA-256"
        }, e, {
            name: "AES-CBC",
            length: 256
        }, !0, ["encrypt", "decrypt"])
    }).then(function(e) {
        return crypto.subtle.exportKey("raw", e)
    }).then(function(e) {
        o(ab2bin(e), t, r)
    }).catch(function() {
        lp_pbkdf2_sync(t, n, r, e, o)
    })
}
function SHA256lib() {
    function s(e) {
        null == e && (e = ""),
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            r < 128 ? t += String.fromCharCode(r) : (127 < r && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224),
            t += String.fromCharCode(r >> 6 & 63 | 128)),
            t += String.fromCharCode(63 & r | 128))
        }
        return t
    }
    function w(e, t, n, r) {
        var o = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          , i = e << 16 | t << 8 | n;
        out = "";
        for (var a = 0; a < r; a++)
            out += o.charAt(63 & i),
            i >>>= 6;
        return out
    }
    return {
        sha256: function(e, t) {
            e = s(e);
            for (var n = [], r = 0; r < e.length; r++)
                n[r] = e.charCodeAt(r);
            e = sjcl.codec.bytes.toBits(n);
            var o = sjcl.hash.sha256.hash(e, 8 * e.length);
            if (void 0 === t || 1 != t)
                return sjcl.codec.hex.fromBits(o);
            for (var i = sjcl.codec.bytes.fromBits(o), a = [], r = 0; r < i.length / 4; r++)
                a[r] = i[4 * r] << 24 | i[4 * r + 1] << 16 | i[4 * r + 2] << 8 | i[4 * r + 3];
            return a
        },
        sha512: function(e) {
            for (var t = [], n = 0; n < e.length; n++)
                t[n] = e.charCodeAt(n);
            e = sjcl.codec.bytes.toBits(t);
            var r = sjcl.hash.sha512.hash(e, 8 * e.length);
            return sjcl.codec.hex.fromBits(r)
        },
        crypt_sha256: function(e, t, n, r) {
            var o = []
              , i = [];
            16 < t.length && (t = t.substr(0, 16)),
            n < 1e3 && (n = 1e3);
            for (var a = 0; a < e.length; a++)
                o[a] = e.charCodeAt(a);
            for (a = 0; a < t.length; a++)
                i[a] = t.charCodeAt(a);
            password_bits = sjcl.codec.bytes.toBits(o),
            salt_bits = sjcl.codec.bytes.toBits(i);
            var s = new sjcl.hash.sha256;
            s.update(password_bits),
            s.update(salt_bits);
            var l = new sjcl.hash.sha256;
            l.update(password_bits),
            l.update(salt_bits),
            l.update(password_bits);
            var c = l.finalize(), u;
            for (u = e.length; 32 < u; u -= 32)
                s.update(c);
            for (s.update(sjcl.bitArray.bitSlice(c, 0, 8 * u)),
            u = e.length; 0 < u; u >>= 1)
                0 != (1 & u) ? s.update(c) : s.update(password_bits);
            var p = s.finalize()
              , d = new sjcl.hash.sha256;
            for (u = 0; u < e.length; u++)
                d.update(password_bits);
            var g = d.finalize()
              , f = [];
            for (u = e.length; 32 <= u; u -= 32)
                f = sjcl.bitArray.concat(f, g);
            f = sjcl.bitArray.concat(f, sjcl.bitArray.bitSlice(g, 0, 8 * u));
            var m = new sjcl.hash.sha256;
            for (u = 0; u < 16 + sjcl.bitArray.extract(p, 0, 8); u++)
                m.update(salt_bits);
            var h = m.finalize()
              , x = [];
            for (u = t.length; 32 <= u; u -= 32)
                x = sjcl.bitArray.concat(x, h);
            for (x = sjcl.bitArray.concat(x, sjcl.bitArray.bitSlice(h, 0, 8 * u)),
            u = 0; u < n; u++) {
                var _ = new sjcl.hash.sha256;
                1 == (1 & u) ? _.update(f) : _.update(p),
                u % 3 != 0 && _.update(x),
                u % 7 != 0 && _.update(f),
                1 == (1 & u) ? _.update(p) : _.update(f),
                p = _.finalize()
            }
            var v = "$5$";
            5e3 != n && (v += "rounds=" + n + "$"),
            v += t + "$";
            var y = sjcl.codec.bytes.fromBits(p);
            if (v += w(y[0], y[10], y[20], 4),
            v += w(y[21], y[1], y[11], 4),
            v += w(y[12], y[22], y[2], 4),
            v += w(y[3], y[13], y[23], 4),
            v += w(y[24], y[4], y[14], 4),
            v += w(y[15], y[25], y[5], 4),
            v += w(y[6], y[16], y[26], 4),
            v += w(y[27], y[7], y[17], 4),
            v += w(y[18], y[28], y[8], 4),
            v += w(y[9], y[19], y[29], 4),
            v += w(0, y[31], y[30], 3),
            "function" != typeof r)
                return v;
            r(v)
        },
        pbkdf2: function(e, t, n, r, o) {
            for (var i = [], a = [], s = 0; s < e.length; s++)
                i[s] = e.charCodeAt(s);
            for (var s = 0; s < t.length; s++)
                a[s] = t.charCodeAt(s);
            e = sjcl.codec.bytes.toBits(i),
            t = sjcl.codec.bytes.toBits(a);
            var l = sjcl.misc.pbkdf2(e, t, n, 8 * r, null, o, null), c;
            if ("function" != typeof o)
                return sjcl.codec.hex.fromBits(l)
        },
        utf8encode: function(e) {
            return s(e)
        }
    }
}
function es(e) {
    return e = (e = (e = e.replace(/\\/g, "\\\\")).replace(/'/g, "\\'")).replace(/"/g, '\\"')
}
function of(e) {
    var t = document.createElement("div")
      , n = document.createTextNode(e);
    return t.appendChild(n),
    t.innerHTML
}
function strip_tags(e) {
    return e.replace(/<[^>]+>/g, "")
}
function trim(e) {
    return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
var g_override_force_logout = "";
function force_logout(e) {
    g_override_force_logout.length ? window.location.href = g_override_force_logout : window.location.href = null != e ? e : "https://lastpass.com/logout.php?nk_enc=1"
}
function encecb(e, t) {
    if (null == e || 0 == e.length)
        return "";
    var n;
    if (t)
        n = t;
    else {
        if ("string" != typeof g_local_key || 0 == g_local_key.length)
            return void 0 !== ischrome && !lploggedin || (g_one_alert || (g_one_alert = 1,
            alert("No encryption key found, forcing logoff!")),
            force_logout()),
            "";
        n = g_local_key
    }
    return AES.Encrypt({
        pass: n,
        data: e,
        b64: !0,
        bits: 256
    })
}
var g_one_alert = 0
  , g_aKeys = {}
  , allowWebCryptoApi = !0;
function enccbc(t, e, n) {
    if (null == t || 0 == t.length)
        return "function" == typeof n ? void n("") : "";
    var r, o;
    if (void 0 !== e && null != e)
        r = e;
    else {
        if ("string" != typeof g_local_key || 0 == g_local_key.length)
            return void 0 !== ischrome && !lploggedin || (g_one_alert || (g_one_alert = 1,
            alert("No encryption key found, forcing logoff!")),
            force_logout()),
            "function" == typeof n ? void n("") : "";
        r = g_local_key
    }
    if (1e3 < t.length)
        if (void 0 !== g_isie && g_isie) {
            if ("function" == typeof lpusexpcomencrypt && lpusexpcomencrypt() && "function" == typeof lpxpcomobj.encryptcbc) {
                var i = lpxpcomobj.encryptcbc(lp_bin2hex(r), t);
                return "function" == typeof n ? void n(i) : i
            }
            if ("function" == typeof have_nplastpass && have_nplastpass() && "undefined" != typeof g_nplastpass && "function" == typeof g_nplastpass.encryptcbc) {
                var i = g_nplastpass.encryptcbc(AES.bin2hex(r), t);
                return "function" == typeof n ? void n(i) : i
            }
            if ("function" == typeof n && "function" == typeof have_binary_function && have_binary_function("encryptcbc"))
                return void call_binary_function("encryptcbc", AES.bin2hex(r), t, n)
        } else if (n && allowWebCryptoApi && "undefined" != typeof crypto && crypto.subtle && crypto.subtle.importKey && crypto.subtle.encrypt) {
            var a = crypto.getRandomValues(new Uint8Array(16));
            return crypto.subtle.importKey("raw", bin2ab(r), "AES-CBC", !1, ["encrypt"]).then(function(e) {
                return crypto.subtle.encrypt({
                    name: "AES-CBC",
                    iv: a
                }, e, bin2ab(t))
            }).then(function(e) {
                var t = "";
                t += "!",
                t += btoa(ab2bin(a)),
                t += "|",
                t += btoa(ab2bin(e)),
                n(t)
            }).catch(function(e) {
                console.error("Web Crypto API encryption failed, falling back to legacy crypto functions"),
                console.error(e),
                lpReportError("Web Crypto API encryption failed, falling back to legacy crypto functions. uid=" + g_uid),
                allowWebCryptoApi = !1,
                enccbc(t, r, n)
            })
        }
    if (void 0 === g_aKeys[r]) {
        var s = []
          , l = r.length;
        for (o = 0; o < l; ++o)
            s[o] = r.charCodeAt(o);
        g_aKeys[r] = s
    }
    var c = AES.CreateIV(16)
      , a = c.str
      , u = c.arr
      , i = "!" + AES.eb64(a) + "|" + AES.Encrypt({
        key: g_aKeys[r],
        iv: u,
        data: t,
        b64: !0,
        bits: 256,
        mode: "cbc"
    });
    return "function" == typeof n ? void n(i) : i
}
function enc(e, t) {
    return enccbc(e, t)
}
function dec(e, t, n, r) {
    if (null == e || 0 == e.length)
        return "function" == typeof r ? void r("") : "";
    if ("(none)" === e || "function" == typeof gs && e === gs("(none)"))
        return "function" == typeof r ? void r(e) : e;
    var o;
    if (void 0 !== t && null != t)
        o = t;
    else {
        if ("string" != typeof g_local_key || 0 == g_local_key.length)
            return void 0 !== ischrome && !lploggedin || (g_one_alert || (g_one_alert = 1,
            alert("No encryption key found, forcing logoff! " + typeof g_local_key)),
            force_logout("https://lastpass.com/logout.php?nk_dec=1")),
            "function" == typeof r ? void r("") : "";
        o = g_local_key
    }
    g_to_dec = e;
    var i = ""
      , a = !0;
    if ("object" == typeof lptoolband && void 0 === n && !n) {
        a = !1;
        try {
            i = lptoolbandcall(["lpdecie", AES.bin2hex(o), e])
        } catch (e) {
            a = !0
        }
    }
    if ("function" == typeof have_nplastpass && have_nplastpass() && "undefined" != typeof g_nplastpass && "function" == typeof g_nplastpass.decrypt && "function" == typeof g_nplastpass.decryptcbc) {
        var s = AES.bin2hex(o);
        if ("!" == e.charAt(0)) {
            var l = g_nplastpass.decryptcbc(s, e);
            return "function" == typeof r ? void r(l) : l
        }
        var l = g_nplastpass.decrypt(s, e);
        return "function" == typeof r ? void r(l) : l
    }
    if ("function" == typeof r && "function" == typeof have_binary_function && have_binary_function("decrypt") && have_binary_function("decryptcbc")) {
        var s = AES.bin2hex(o);
        return "!" == e.charAt(0) ? void call_binary_function("decryptcbc", s, e, r) : void call_binary_function("decrypt", s, e, r)
    }
    if (a)
        if ("!" != e.charAt(0)) {
            var c = atob(e);
            if ("!" == c.charAt(0) && c.length % 16 == 1 && 32 < c.length) {
                var u = c.substring(1, 17)
                  , p = c.substring(17);
                "" == (i = dec("!" + btoa(u) + "|" + btoa(p), o)) && (i = AES.Decrypt({
                    pass: o,
                    data: e,
                    b64: !0,
                    bits: 256
                }))
            } else
                i = AES.Decrypt({
                    pass: o,
                    data: e,
                    b64: !0,
                    bits: 256
                })
        } else {
            var d = e.split("|", 2);
            if (2 != d.length)
                return "function" == typeof r ? void r("") : "";
            if (void 0 === g_aKeys[o]) {
                var g = []
                  , f = o.length;
                for (k = 0; k < f; ++k)
                    g[k] = o.charCodeAt(k);
                g_aKeys[o] = g
            }
            i = AES.Decrypt({
                key: g_aKeys[o],
                iv: AES.B64ToBytes(d[0].substring(1)),
                data: d[1],
                b64: !0,
                bits: 256,
                mode: "cbc"
            })
        }
    return "function" == typeof r ? void r(i) : i
}
function lpenc(e) {
    return enc(e)
}
function lpenc(e, t) {
    return enc(e, t)
}
function lpdec(e) {
    return dec(e)
}
function lpdec(e, t, n) {
    return dec(e, t, !1, n)
}
function lpenc_u(e) {
    return updated_enc ? enc(e) : e
}
var lpdec_u_cache = new Array;
function lpdec_u(e) {
    return updated_enc ? (void 0 !== lpdec_u_cache[e] || (lpdec_u_cache[e] = dec(e)),
    lpdec_u_cache[e]) : e
}
function lpbin2hex_u(e) {
    return updated_enc ? AES.bin2hex(e) : e
}
function lphex2bin_u(e) {
    return updated_enc ? AES.hex2bin(e) : e
}
function fix_username(e) {
    return e ? e.toLowerCase().replace(/\s*/g, "") : ""
}
function utf8_string(e) {
    var t = 1;
    return "undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 || (e = lp_sha2lib.utf8encode(e)),
    e
}
function make_lp_hash(e, t) {
    return SHA256(SHA256(fix_username(e) + t) + t)
}
function make_lp_key(e, t) {
    return AES.hex2bin(SHA256(fix_username(e) + t))
}
function make_lp_key_iterations(e, t, n, r) {
    if (1 == n)
        return "function" == typeof r ? void r(make_lp_key(e, t), t, n) : make_lp_key(e, t);
    e = utf8_string(e);
    var o = t;
    return t = utf8_string(t),
    AES.hex2bin(lp_pbkdf2(t, e, n, 32, "function" == typeof r ? function(e) {
        r(e, o, n)
    }
    : null))
}
function make_lp_hash_iterations(e, t, n, r) {
    if (1 != n)
        return lp_pbkdf2(e, t = utf8_string(t), 1, 32, "function" == typeof r ? function(e) {
            r(AES.bin2hex(e))
        }
        : null);
    var o = SHA256(AES.bin2hex(e) + t);
    return "function" == typeof r && r(o),
    o
}
function make_lp_key_hash(e, t, n) {
    var r = get_key_iterations(e);
    make_lp_key_hash_iterations(e, t, r, function(e, t) {
        n(e, t, r)
    })
}
function make_lp_key_hash_iterations(e, n, r, o) {
    make_lp_key_iterations(e, n, r, function(e) {
        var t = make_lp_hash_iterations(e, n, r);
        o(e, t),
        n = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    })
}
function check_email(e) {
    return e.match(/^.+@.+\.[A-Za-z]{2,}$/)
}
var iebody = null;
function offsetL() {
    return document.all ? iebody.scrollLeft : pageXOffset
}
function offsetT() {
    return document.all ? iebody.scrollTop : pageYOffset
}
"undefined" != typeof document && (iebody = document.compatMode && "BackCompat" != document.compatMode ? document.documentElement : document.body);
var FILENAME_FRAGMENT_VALID = 1
  , FILENAME_FRAGMENT_EMPTY = 0
  , FILENAME_FRAGMENT_BAD_SHELL_CHARS = -1
  , FILENAME_FRAGMENT_BAD_CONTROL_CHARS = -2;
function check_filename_badchars(e) {
    var t;
    return t = 0 == e.length ? FILENAME_FRAGMENT_EMPTY : /[\;\$\|\*\?]/.test(e) ? (alert(gs("Suspicious characters found in selected filename, will not process it")),
    FILENAME_FRAGMENT_BAD_SHELL_CHARS) : /[\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x7f]/.test(e) ? FILENAME_FRAGMENT_BAD_CONTROL_CHARS : FILENAME_FRAGMENT_VALID
}
function get_mimetype_from_filename(e) {
    var t = "";
    return void 0 === e || e.length <= 0 || (t = "other:" + (e = e.toLowerCase()).split(".").pop(),
    -1 == e.indexOf(".") ? t = "other:application/octet-stream" : -1 != e.indexOf(".png") ? t = "data:image/png" : -1 != e.indexOf(".gif") ? t = "data:image/gif" : -1 != e.indexOf(".jpg") || -1 != e.indexOf(".jpeg") ? t = "data:image/jpg" : -1 != e.indexOf(".wav") && (t = "data:audio/wav")),
    t
}
function getAllowedFileExtensionsGrouped() {
    var e = {};
    return e[StringUtils.translate("Documents")] = ["csv", "tsv", "doc", "docx", "odt", "ppt", "pptx", "txt", "xls", "xlsx", "pdf", "rtf", "html", "htm"],
    e[StringUtils.translate("Media")] = ["png", "gif", "jpg", "m4a", "mpg", "wav", "avi", "mov", "tiff", "tif", "jpeg", "wmv"],
    e[StringUtils.translate("Other")] = ["zip", "rar", "log", "key"],
    e
}
function getInvalidFileExtensionMessageStrings() {
    var t = [StringUtils.translate("Sorry, you can't attach that file. Supported file types are:")]
      , n = getAllowedFileExtensionsGrouped();
    return Object.keys(n).forEach(function(e) {
        t.push("• " + e + ": " + n[e].join(", "))
    }),
    t
}
function getAllowedFileExtensions() {
    var n = getAllowedFileExtensionsGrouped();
    return Object.keys(n).reduce(function(e, t) {
        return e.concat(n[t])
    }, [])
}
function isAllowedFileExtension(e) {
    var t = getAllowedFileExtensions(), n, r = e.toLowerCase().replace(/\\/g, "/").replace(/.*\//, "").match(/(?:\.([^.]+))?$/)[1] || "";
    return -1 < t.indexOf(r)
}
function can_copy_to_clipboard() {
    return !0
}
function can_clear_clipboard() {
    return !0
}
var dbgall = {
    state: 0,
    sk: 0,
    js: 0,
    bb: 0,
    az: 0,
    xhr: 0,
    invis: 0,
    retry: 0,
    autofill: 0,
    autologin: 0,
    icons: 0,
    login: 0,
    checkpw: 0,
    tabsel: 0,
    unload: 0,
    regex: 0,
    redo: 0,
    formfill: 0,
    checkpage: 0,
    checkgenpw: 0,
    checkadd: 0,
    autoauto: 0,
    iframe: 0,
    formsubmit: 0,
    notif: 0,
    xulshow: 0,
    save: 0,
    basic_auth: 0,
    genpw: 0,
    cookie: 0,
    yubikey: 0,
    googleauth: 0,
    outofband: 0,
    securityquestion: 0,
    grid: 0,
    multifactor: 0,
    sesame: 0,
    custom_js: 0,
    rsa: 1,
    idle: 0,
    namedpipes: 0,
    groupstate: 0,
    websiteevent: 0,
    readfile: 0,
    writefile: 0,
    deletefile: 0,
    renamefile: 0,
    fileexists: 0,
    disableoffline: 0,
    sharing: 0,
    prof: 0,
    ffupload: 1,
    sharedfolders: 1,
    recentlyused: 0,
    neverurl: 0,
    credmon: 0,
    error: 1,
    push: 0,
    info: 1,
    popupautologin: 0,
    prefs: 0,
    parsemobile: 0,
    challenge: 1,
    parsegetaccts: 1,
    onload: 0,
    binary: 0,
    captcha: 0,
    onpopupiframe: 0,
    inpopupiframe: 0,
    setlasttouch: 0,
    lploglogin: 0,
    recheck: 0,
    populategenpw: 0,
    vault: 0,
    siteinfo: 0,
    overlay: 1,
    changeicon: 0,
    resource: 0,
    cpw: 0,
    fieldicon: 0,
    ignorelogic: 1,
    all: 0
}
  , lpWRASO = "webrootaso"
  , lpWRWEBSITELOGIN = "webrootwebsitelogin"
  , lpWRWEBSITELOGIN_ASOREGISTRY = "webrootwebsiteloginasoregistry"
  , lpWRNAMEDPIPELOGIN_ASOREGISTRY = "webrootnamedpipeloginasoregistry"
  , lpWRPLUGINLOGIN_ASOREGISTRY = "webrootpluginloginasoregistry"
  , lpWRSSODIR = "/sso/webroot/"
  , lpWRDIR = "/webroot/"
  , lpWRASOTESTFILE = ""
  , lpWRASOTESTFILE2 = ""
  , dbgts = (new Date).getTime()
  , that = this;
this.lpgenpwlist = new Array,
this.lphelpstats = null,
this.lpbuilt = "Unknown",
void 0 === this.lp_basehost && (this.lp_basehost = "lastpass.com",
this.lp_base = "https://" + this.lp_basehost + "/"),
this.lpcurrcontextmenusite = 0,
this.last_dialog_close = 0,
this.lpformalname = "LastPass",
this.LANGS = [["Default", ""], ["Afrikaans", "af-ZA"], ["Albanian", "sq-AL"], ["Arabic", "ar-SA"], ["Arabic (Egypt)", "ar-EG"], ["Azerbaijani", "az-AZ"], ["Bosnian", "bs-BA"], ["Bulgarian", "bg-BG"], ["Catalan", "ca-ES"], ["Chinese (Simplified)", "zh-CN"], ["Chinese (Traditional)", "zh-TW"], ["Croatian", "hr-HR"], ["Czech", "cs-CZ"], ["Danish", "da-DK"], ["Dutch", "nl-NL"], ["English", "en-US"], ["English (United Kingdom)", "en-GB"], ["Esperanto", "eo-US"], ["Estonian", "et-EE"], ["Finnish", "fi-FI"], ["French", "fr-FR"], ["French (Canada)", "fr-CA"], ["Galician", "gl-ES"], ["Georgian", "ka-GE"], ["German", "de-DE"], ["Greek", "el-GR"], ["Hebrew", "he-IL"], ["Hungarian", "hu-HU"], ["Icelandic", "is-IS"], ["Indonesian", "id-ID"], ["Italian", "it-IT"], ["Japanese", "ja-JP"], ["Korean", "ko-KR"], ["Latvian", "lv-LV"], ["Lithuanian", "lt-LT"], ["Macedonian", "mk-MK"], ["Malagasy", "mg-MG"], ["Malay", "ms-MY"], ["Norwegian", "nb-NO"], ["Norwegian Nynorsk", "nn-NO"], ["Persian", "fa-IR"], ["Polish", "pl-PL"], ["Portuguese", "pt-PT"], ["Portuguese (Brazilian)", "pt-BR"], ["Romanian", "ro-RO"], ["Russian", "ru-RU"], ["Serbian", "sr-RS"], ["Slovak", "sk-SK"], ["Slovenian", "sl-SI"], ["Spanish", "es-ES"], ["Spanish (Mexico)", "es-MX"], ["Swedish", "sv-SE"], ["Tagalog", "tl-PH"], ["Tamil", "ta-IN"], ["Thai", "th-TH"], ["Turkish", "tr-TR"], ["Ukrainian", "uk-UA"], ["Urdu", "ur-PK"], ["Vietnamese", "vi-VN"]];
var lpversion = "4.54.0", lpversionpre = "1", lploggedin = !1, lpisadmin = !1, lpiscompanyadmin = !1, lpshowcredmon = !1, lploglogins = !1, lp_local_key = "", lp_local_key_hex = "", g_local_key = "", g_local_key_hex = "", lp_local_key_hash = "", lpemail = "", lpnotifytimerid = null, lpretryonlinetimerid = null, lpdebug = !1, lpdebuginfo = new Array, lpnomoreprompts = !1, lpaccts = new Array, lpshares = new Array, lpsecurenotes = new Array, lpapplications = new Array, lpacctsnum = 0, lptlds = new Array, lpgenpws = new Array, lpbasicauths = new Array, lpurls = new Array, lpneversaveurls = new Array, lpnevergenurls = new Array, lpneverffurls = new Array, lpneverautologinurls = new Array, lpnevershowiconurls = new Array, lpneverenablelp = new Array, lponlysaveurls = new Array, lponlygenurls = new Array, lponlyffurls = new Array, lponlyautologinurls = new Array, lponlyshowiconurls = new Array, lponlyenablelp = new Array, lpmanuallogins = new Array, lpforminfomap = new Array, lprejectedaddsites = new Array, lpforminfomap_multi = new Array, lpfavaccts = new Array, lpsavedform = null, lpsavedformfields = new Array, lpisopener = 0, lpdelayedFunction = null, lpFunctionToRunOnShow = null, lpBrowserToRun = null, lpDebug = !0, lploginattempts = new Array, lppopulateaccountsfromlogin = !1, lppwdeckey = null, lpdisableoffline = !1, lploggedinoffline = !1, lpusername = "", lpusername_hash = "", lphash = "", lpmpstrength = null, lpsendmpstrength = !1, lpuid = "", lptoken = "", lpgenpassforms = new Array, lpgenpasscurrentpwfields = new Array, lp_local_accts_version = -1, lp_server_accts_version = -1, lp_local_attach_version = -1, lp_server_attach_version = -1, lp_attaches = new Array, lploginpostdata = "", lpRegisteredForXHREvents = !1, lpimportsource = "", lpimportdata = "", lpfindxpcom = !1, lpxpcomobj = null, lpctypeslib = null, lpctypesabi = null, lpctypespath = null, lpctypesfree = null, lpidleobserver = this.lpctypesworker = null, lpidleobservertime = 0, sleeptimer = null, last_sleep_check = 0, polltimer = null, lastpoll = 0, lastlogin = 0, lpffaccounts = new Array, lplaunches = new Array, lpshowedautologinoncontentloaded = new Array, lpshowedgenerateoncontentloaded = new Array, lpshowedformfilloncontentloaded = new Array, lponcontentloadeddone = new Array, lpformfills = new Array, lpidentities = new Array, lpdocfinder = new Array, lpforcenewtab = !1, lpdeccache = new Array, lpdeccachekey = null, lpcurrentwindow = null, lpbLoginSitePrompt = !1, lpbEditSitePrompt = !1, lpbEditSecureNotePrompt = !1, lpbViewPwPrompt = !1, lpbViewFormFillPrompt = !1, lpbCompanyLoginSitePrompt = !1, lpbCompanyCopyViewSitePrompt = !1, lpbGeneratedPw = !1, lpbImprove = !0, lpLoadThreshold = 1e3, lpequivdomains = new Array, lpallowcrossorigin = new Array, lpurlrules = new Array, lpmobileformat = new Array, lp_premium_exp = 0, lp_enterpriseuser = 0, lp_trueapi_trial_exp = 0, lpiconsupdated = !1, lpbSwitchIdentityPrompt = !1, lpbMultifactorReprompt = !1, currCompact = !0, lpLastPwPrompt = 0, countryfromip = "", lpbUpdateAvailable = !1, lpbInstallingUpdate = !1, lpdialogs = new Array, lppendingshares = new Array, lppendingsharests = 0, lpprefoverrides = new Array, lpshareeautopushes = new Array, lpshareeautopushests = 0, lpnewvalues = [], lppublickeys = {}, logoff_other_ses = !1, lp_phpsessid = null, lpoverridelang = null, lpisconnected = !1, lppd = 0, lpeu = 0, lphidecontextmenu = !1, lpincludenameinlogoffbtn = !0, lpdelayfillhiddenfields = !1, WAVTOOLBAR = 0, WISCTOOLBAR = 0, lpiterations = -1, lpNotificationsAfterClick, lpRepromptTime, lpAutomaticallyFill, lpShowNotifications, lpShowLoginNotifications, lpShowFormFillNotifications, lpdontfillautocompleteoff, lpwarninsecureforms, lpOfferGeneratePasswd, lpNotificationsAfterClick, lpShowSaveSiteNotifications, lpShowChangePasswordNotifications, lpShowAcctsInSidebar, lpShowAcctsInGroups, lpautoauto, lpautoautoVal, lpIdleLogoff, lpIdleLogoffVal, lpalwayschooseprofilecc, lpNotificationsBottom, lpUseCompact, lpopenloginstart, lpcapturenewformfill, lphidenotes = !1, lphideidentities = !1, lphidevault = !1, lpdointerationreductionscheck = !0, lphidewelcome = !1, lphideexport = !1, lphideimport = !1, lphidesharing = !1, lphideprint = !1, lppassusernamehash = !1, lphidestatusbaricon = !1, lpdohttptest = !1, lploginstarted = !1, lpdonotoverwritefilledfields = !1, lpasoregistry = !1, g_notifydata = null, lpshowweakdupalerts = !0, lpbundles = new Array, startup_time = lp_get_gmt_timestamp(), all_states = null, all_countries = null, all_timezones = null, lp_all_tlds = null, isFennec = !1, isFennecXUL = !1, isFennecNative = !1, fennecBrowser = null, nativeWindow = null, fennecMenuID = null, g_multifactorscore = 0, g_disablepwalerts = -1, lp_sharing_enabled = !0, lp_folder_sharing_enabled = !0, lpdonotrefreshwindowsts = null, lplastloggedin = 0, lplastrefreshts = null, SpecialSites = new Array, MAXATTACH = 10485760, g_search_array = {}, g_CNTsearch_results = 0, g_CNTinit_vault = 0;
function lpfavinfo() {
    var e, t
}
function lpacctinfo() {
    var e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M, j, U, G, q, H, K, V, J
}
function lpshareeautopushinfo() {
    var e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C
}
function lplogininfo() {
    var e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x
}
function lpfieldinfo() {
    var e, t, n, r, o, i, a, s, l
}
function lpforminfo() {
    var e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A
}
function lpautologininfo() {
    var e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h
}
function lpevent() {
    var e
}
function lpobjrejectedaddsite() {
    var e, t, n, r
}
function lpobjffaccount() {
    var e, t, n, r, o, i, a
}
function lpobjhelpstats() {
    var e, t, n, r, o
}
function lpformfillinfo() {
    var e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M, j, U, G, q, H, K, V, J, W, Y, X, Z, Q, $, ee, te
}
function lpcustomfieldinfo() {
    var e, t, n, r
}
function stateinfo() {
    var e, t, n
}
function countryinfo() {
    var e, t, n, r, o
}
function timezoneinfo() {
    var e, t
}
function lpidentity() {
    var e, t, n, r, o, i
}
this.g_flags = {};
var lpArrayOffset = -1
  , AES = void 0 === AES ? null : AES
  , LPISLOC = !1
  , LPISUPEK = !1
  , LPISUPEKCAPABLE = !1
  , lpmaxid = 0
  , rfdefaults = null
  , DEFAULT_KEY_ITERATIONS = 100100;
this.HIDE_HOME_HK = 0,
this.HIDE_SEARCH_HK = 0,
this.DISABLE_HKS = 0,
this.lpdopoll = !0,
this.lpdolostpwotp = !0,
this.NO_LOGIN_NOTIFICATION_UNTIL_LOGIN = 0,
this.althelpurl = "",
this.HIDE_SHARE = !1,
this.islastpass = !0,
this.LPISLOC = LPISLOC,
this.LPISUPEK = LPISUPEK,
this.LPISUPEKCAPABLE = LPISUPEKCAPABLE;
var gcontrols = {
    hidegopremium: !1,
    hidecreate: !1,
    hideiconsprefpane: !1,
    hideothersessions: !1,
    vaulturloverride: "",
    hidescreenkeyboard: !1,
    hidetranslateformfill: !1,
    hideopenfavorites: !1,
    hideclearcache: !1,
    hideabout: !1,
    hideseccheck: !1,
    hidesitesearch: !1,
    hidesaedhotkey: !1,
    hideformfilltitle: !1,
    hidewlanexport: !1,
    hidewlanimport: !1,
    forcetabrefreshonlogout: !1,
    instructionpartneroverride: !1,
    offer_popupfill: !0,
    hidemyaccount: !1,
    dummy: !1
}
  , sntemplates = {
    Generic: {
        "": "textarea"
    },
    "Bank Account": {
        "Bank Name": "text",
        "Account Type": "text",
        "Routing Number": "text",
        "Account Number": "text",
        "SWIFT Code": "text",
        "IBAN Number": "text",
        Pin: "text",
        "Branch Address": "text",
        "Branch Phone": "text",
        Notes: "textarea"
    },
    "Credit Card": {
        "Name on Card": "text",
        Type: "text",
        Number: "text",
        "Security Code": "text",
        "Start Date": "datemoyr",
        "Expiration Date": "datemoyr",
        Notes: "textarea"
    },
    Database: {
        Type: "text",
        Hostname: "text",
        Port: "text",
        Database: "text",
        Username: "text",
        Password: "text",
        SID: "text",
        Alias: "text",
        Notes: "textarea"
    },
    "Driver's License": {
        Number: "text",
        "Expiration Date": "date",
        "License Class": "text",
        Name: "text",
        Address: "text",
        "City / Town": "text",
        State: "text",
        "ZIP / Postal Code": "text",
        Country: "text",
        "Date of Birth": "date",
        Sex: "text",
        Height: "text",
        Notes: "textarea"
    },
    "Email Account": {
        Username: "text",
        Password: "text",
        Server: "text",
        Port: "text",
        Type: "text",
        "SMTP Server": "text",
        "SMTP Port": "text",
        Notes: "textarea"
    },
    "Health Insurance": {
        Company: "text",
        "Company Phone": "text",
        "Policy Type": "text",
        "Policy Number": "text",
        "Group ID": "text",
        "Member Name": "text",
        "Member ID": "text",
        "Physician Name": "text",
        "Physician Phone": "text",
        "Physician Address": "text",
        "Co-pay": "text",
        Notes: "textarea"
    },
    "Instant Messenger": {
        Type: "text",
        Username: "text",
        Password: "text",
        Server: "text",
        Port: "text",
        Notes: "textarea"
    },
    Insurance: {
        Company: "text",
        "Policy Type": "text",
        "Policy Number": "text",
        Expiration: "date",
        "Agent Name": "text",
        "Agent Phone": "text",
        URL: "text",
        Notes: "textarea"
    },
    Membership: {
        Organization: "text",
        "Membership Number": "text",
        "Member Name": "text",
        "Start Date": "date",
        "Expiration Date": "date",
        Website: "text",
        Telephone: "text",
        Password: "text",
        Notes: "textarea"
    },
    Passport: {
        Type: "text",
        Name: "text",
        Country: "text",
        Number: "text",
        Sex: "text",
        Nationality: "text",
        "Issuing Authority": "text",
        "Date of Birth": "date",
        "Issued Date": "date",
        "Expiration Date": "date",
        Notes: "textarea"
    },
    Server: {
        Hostname: "text",
        Username: "text",
        Password: "text",
        Notes: "textarea"
    },
    "Social Security": {
        Name: "text",
        Number: "text",
        Notes: "textarea"
    },
    "Software License": {
        "License Key": "text",
        Licensee: "text",
        Version: "text",
        Publisher: "text",
        "Support Email": "text",
        Website: "text",
        Price: "text",
        "Purchase Date": "date",
        "Order Number": "text",
        "Number of Licenses": "text",
        "Order Total": "text",
        Notes: "textarea"
    },
    "SSH Key": {
        "Bit Strength": "text",
        Format: "text",
        Passphrase: "text",
        "Private Key": "text",
        "Public Key": "text",
        Hostname: "text",
        Date: "date",
        Notes: "textarea"
    },
    "Wi-Fi Password": {
        SSID: "text",
        Password: "text",
        "Connection Type": "text",
        "Connection Mode": "text",
        Authentication: "text",
        Encryption: "text",
        "Use 802.1X": "text",
        "FIPS Mode": "text",
        "Key Type": "text",
        Protected: "text",
        "Key Index": "text",
        Notes: "textarea"
    }
}
  , sntemplateicons = {
    "Bank Account": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAe5JREFUOBFjYKAQMOLSr9Lgycf/94P8P3bGT+drjj3EpY4Jl4S6DEeBoY3+JU1NlYXiseLcuNQxY5FgtGyxCRSXEQ9kZmFWYWJm+s/KyvHiwdt71xmeM/xDV49hgFO/R6SilsJiJhYmyZ/ff574//+/uJCYUIyAhOiXh7vvHkM3AMMLfCLcYT9+/mC+cPSa04p5S9xP7jrt9u379zf8EryhgqGC/OgGsKAL/Prx6wsLOysLLz+nr7ys5rO7N67fYBPmMOP8y8j6fvX7j+jqMbzAqyf4nEeAx5ZXiCdYXE4kWlFdRfvfz79vzxw+eYbhARFh8Pzw0yd/ZX5vYGZlfcLAyMTOysniAzQsRlhMlPnxn4eH0Q3BcIF2hbYKEyPX/7MNx3fc/XNrHeNf5sN8QnzW7Dzs9p/ffZz39dLXr8jewAhEURnJ+TLqEhc1i/QsGHgY/n958+HSj68/Pv77+4+Xk1uQC1kziI0RiO9fvFsiJCk8UUxJbKewrMM5ZhYmQQZmBv1P7z6t+P71/Wt0AzC88PLQ8/N8BvzHmFmZ5ZjZmF3+/WP49enlx87PDz7UPlz48AtBA4AK/r88/OK+kLWYMgsrs8OfX78vPLn1MB+bZpBhGF6A2fDtDXP/l9ev1/0HZqaXi1+iBBxMDVVoAPf9trYjCW1eAAAAAElFTkSuQmCC",
    "Credit Card": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAWxJREFUOBFjYBhowAhygEODtoS+knQYHx8PDzEO+vXjx9tL926t21515zULSIOdoWqdhJhAJjbNjIyMDP///2cA0QjAz8DIymyyneFOKtgAHh4O9U9fvh05dvxmHjMb0z+EQkzW769/uGzsNLuE+LmUQbJgA/7+/cvAwcaqaWWu1oupBVOEnZVF8+fP35fgBvz8+RPI/ifMwMjgiK4c3Qsg7/z8/Yvhx69fYKUQF/z7z/D3H8TlMP+CaBAA+RzEgocAKCyAcn9BkkAA8wLjl6+/j1y5+jiHmQF/GPz4+Y/T0Ei2l4mRCWHAnz9/QJzfz5+8v3121rNvYBkchHGaFNe/v9K//0HtAbvg5y9QGBAPkNWDDfgDjAUgYBUWFtD1qhXG64I/f/5yAdWzAj3wG6QJbMD7j9/vighxpWhoC58ACeIDsAD9+PH7DJA6sAGPn3+s+vX71xk2RmZhfJphct9///ny/s2XVTD+wNIAS+GRPES9izQAAAAASUVORK5CYII=",
    Database: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAkFJREFUOBGlU71uE0EQ3tndW5/vbMt2YmEhMJbSRIoUiSJUPA4VNR0NElJaurwAJS8Az4CoaAjCRRJELNmJleT+vLc/zKyjg1BQwOi8N3sz8/mbb2cZ+0+D3+phNHqeDqp2DC2h2p1E9aJ2m+LXdVmWWaH92upVXFaLxVGBnx3FAsDj8eFoZ9o/HHQ6u0LAhAGMgXkFQGH0POYC1975uXXu9DovP3/7unz9afnyXBJKt8/HW73uM/K997jQg0v40Vcyq3CZIOak32k/bfXhLVuyDYCxXCBySNssVPx3kzLOKCMwyG8KVVR6Jjnf+bOMuiBSoRsMku+cm2VXuWkApInOjk/mL1SkbnpJtCWkGAnGUUBPtNFAW+ZKY8wyy/WqsnVfWxdRJDBQPbH96N72O2/9MSaeGcsugbnCM6hJbGAQCSaSJIqGgyR5AAJ2Z+cXBw2ArU0LaUnM3OOM7ylJGgTsX/yJO5rHXvCPmETZaB+yCl7lVVW/V5F8wsAPg/iwKWj8Zusv17X5WOqsagB43XKLq+xDbsyr2LNKteRDzgV3DlJK4tznxnlr1vp7Zeo4TZKDGlS/AYi4V8Nu+mbovcY5+IE0F/jOkbCmQUKjoUohjUfg/H1EVHpV7jcAOGmptaElhYJNcT/FN8ZpClFK6hvnJHRB54kqM4bYaEGDch2dFFV9FEm5j/EJnsAY625HmXTEkwCmPeNzPJXTUpsvzkj0b/mRg8bxMiXNZZKJ4iDCZcL2y9LcuUzY3p05DwD/tPwEMrcZWxQDzgYAAAAASUVORK5CYII=",
    "Driver's License": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAeZJREFUOBHFUs1LVFEUP/d9jD2H52u0dKSYEQlpEYFhuYmCQjcahBC4aNFW3Ljzb2jtImjTon2rCiJwIbQQxUywomikSUacYXiNH+O8e8+913ve9MYPXLTzwL3n3PPxO79z3gM4b2HHCQzdezGY9r3HFzwvOu5PbCml+lutfVhemPqc+FoAmf7Z4O7wnTe2Y3UrpSutgGVSlTlGM8Yuo8Dyp8XlibDwvEYgDl0k+WxuwHbY/Y1CcaSysb7Y9J68e67dHMrneufz2d6BsABLFG0BBJn2R1GDrxa3Sith6WX9ZGnzVU/NrGV7Lq0GmYvjxhMDxEyJ/uCN6x9RqR0e4fxZxYkv1eY8cB3bX1n7NkpjxAz8ILgCDG47tgW25z40s4LWOq5JbNKJmJDu8jNXQ4AarQhc6VqICPu7jffbm5WnQoiykhLoIIpYC87LW6XK5MF+/R0iZ0rRWls74HGi1Ggaa0lg1r+GxINMZQwllSslMoZHbOIRuADgUYMAx9JB25jgZCdJCYTu9jtSr6U2zCJp4pzyj74Cdf0vIVzCNE1JYgYaG2kpbXLDThg9kcB+kH1aLIW3Ojq9V0QObUU0mgCb4s+X1G5uWisr/ft79S3A3Jm/MvQ9+9m/l2unvOLX6q/TDc7nfQjYYNSInJegDAAAAABJRU5ErkJggg==",
    "Email Account": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAbpJREFUOBHFUc0uA1EUvnc6/Zt20LKoCVESSmLrCdh1J2GBiIWNV5B4ARIvQSKxaSIRK0/AwoaUNCTdlKpRZfpzf+a6585MaFnYuZNz751vzvnmO+dD6L8XBgHG4sHw6PjIctRIJv4iiDH6Ui6WCh+F9aoOBROzuZ3kUGrLKwZOIUNxe9Av+5iG5q4LaFMRRAwjR5rtS05YMWImVjESWABH78JYtOv1Iz0an4qa5gR81mDjjMtbyHqvPJ3ZpfIKbZMb1+UIgnPvpB1yY5ceVpyqfYr0kOVyF0o9AsooooRYiZHhQ92M5ytXdxuNx9oeaXdaEm/B/VFien9fHnIYpRahRBGoFkAB1pQYHIrH1tIz2YVmzd59Lz4vCeHieGpgMj2dPUEazrhSEbQnxX0RCC6wasPDYM/E0gP7YTNx7sqBhsOReS5khV8ECUG+r4DJsQHcs7A2LweqkoVyBrwBRD4wN7kUASUUacIbSg/Fj9fAYJd+I+CyIcF+5CogKAhcxVKpstgfgpocaTj3YAuEss0/vbtvJdgpA3qHkzitW/iDaqFVedtmnF1IIwZ/19GN8g53SP31uBv9r7dPR1ft7I4Te2QAAAAASUVORK5CYII=",
    "Health Insurance": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAedJREFUOBGlUkFLG1EQfm931UNks0mqJhZ6WEmLRITWKlXRYxGvhd7EUvsn/AU99C9UwaPSc/FgodBY0ooUgsaDmuIhKIJJs3Ql2STvdb5N3rJFBdGB2W/eNzPfzuxbxu5pPNy/EYtFE5FIb4tz2XTdv/PlsoP853jcNIjXpeQXxL+uVKqqLxDIjz+dTfYPLOs93TNMyBbZ97Oz0/coTCZTy7phTDHO9KbXyJZKpQ/PfuW/IOcL5EZGRofsR5ucaykpiSQWSPbHfzJmdZBAUk6eHp78fjmdP9jTkBjoi70RQqborUwKwRRSbAnRssARdlxAIDWYePAWvYb/0LvTotlC2J4Jbw+WQxAiOiMaWlca5b5A3fNcTevB2R89tEKwDriwNRoNF2d/hVrtckvQ+HCJUTuIuL1OGxErv6SeQOC4eLJer3tZlQwjVsMZ6DvFXs3LogcCwWC54eEXfYn4J875QyRuMvqApfNy5dVkofADNYEADruZzJxpmmu0b3/7FsGGTLJzx3EWx/b3NxX7nwDIn5knc9Fea4U+56AqAuLunZq7MJEv+D+Qyl0RQGI7nZ61THNV43wIVygkK5ar1aWZo6OvqlHhtQJIZm37edQ0P1LIaex308Xijmq6NX6z7cfwWzfcpfAfNmMIbSLQWdAAAAAASUVORK5CYII=",
    "Instant Messenger": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAcBJREFUOBGtUj1LA0EQnd3NXWJMkCSNf8AiKDGNIhoLKwULC3+AIEoKwdIfkc5CIYVN2jRCEEUrURshSkDQxsomFkaMSTC5/XC/LlFJQNA5bvd29s2bmXcD8EdDKj6e21uKjqc3SDAcByEdyqv2Aca89sv7XfmgtrN1ElCY4WR6nURGVg3ej9bcfSmI60J4bALXAAyBICTBGdNgITMjGav2/mZLdN2YutcVcEqByVdZ9exwDUJORR9+Li2aGl1cKSgKwU1CTcBkdmEJYtOZLCJuR+ugCXotCdpxqcQhWSLzTEJDQBkgxzC+Xp/nIRQaUEE7lVhYnuWSmNseNYHgHBSzsujkXFYESAdjrM9c3ulvgQQH5vg4v2LbgqyYmYDGzVUeHNKtQLRpODI1n0PBUAaAgBJbqOxWdEPAOcLWMZSe2RQYezq9XbjjJJEVzZ8Tzr9owBmVIhIDDzgy03fzy1VeJB+hWKink3RFxNjOgQb1BrH3DwypnYK691w9Uh4joixfiSMa9YL3UN4HJ1rXcMLMOMoWzZmYvdn04L7y2CWQwQg+GgV2cbwNxeKbBv9yMS1Un07h9nIXSqXWL+P+D/YJSQ7IaGolBfkAAAAASUVORK5CYII=",
    Insurance: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAohJREFUOBF1U81PU0EQn+3rx2v5sNEWLiQaLSKINzEajOBFTyTejIZAjCcSQwx/gCf8E7ypSQ3xIx5UDCHeioZwqIqtUYMBLTFI6Yc0ltfX1+7OuvNeW0rUafbN7OxvfjM7s2XwPxkcbAsNDZyj49xC/DUsLhb/BWV/OUeGQ52nBy4FOrpGNb9viADctBZKmc2ZrQ+JF/B0Ptsc0yDwjV8+EuyNXNHD4VHN7emRIB0cKUIpjZyvlDPZmcLK6iMr+mSNADaBfv3qwY4zp94ylytEzr3SxGAfMJAocpml+MnyvYfrbvKhVm1HxBAgNrI51LRVAepHmkRKZTMWohja2wRkKAJShFBRCkyapFY+N415EJBxt7WO2/dxTsFV04CCOwvFrla24AKqhjGXib+bEpwzoXDkq4tdQYVbFc45lUalWqpkjwLY5Nwsz20vJyeCJ45Ps4A+hkLY16AYInGusJ7OiWOWAZrWgkb5Jjd3gr5w+DZa1nwh8Wmive/oNNP1MVWBk1iCAT/y9rtwCEpaSViVZebznkWvNln5lh0XppErpzdetfT0TwMFq8wk1B6s8PdQ9fymvdODpSWzWtyeFerOqsu9vu5DUV4orrZE+uzMVHZ90f154dcsxGI7RNCYgrmZiuqB1msuj6eXSLzdh5+rge2j5lJvaHwkTOBnM/39gb1RH61uQHLNkH2RCvj9F9XYNYmoq2VPs65RolXNbN2Sd5+9qcftEiiPjCcT0B/ZkH7/BYnS7WSV6o2ouUhpYj57Q9yZuV8PJr2HgDhkYP9H1OErer3q/wCdlF11P4HZ3JT8svEYUqnai3NonPfp2M1fBiPDB6Cr8zwgk/AzHYOXsTwlaAaR/QeFIF/m6ggfrgAAAABJRU5ErkJggg==",
    Membership: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAeJJREFUOBHFUjtPVFEQnnMvK+z1uqtgwMRH1IQCN1kIFhTGxIqEBmOwkspGGyWhsbKw4R8oBdGC2kJrGwkJhQmEUBlfhNBASBDkYdjzmPGbw4JKNNAY5+TOnMzjO9/MXKL/LaZOwDw9fau9tZQ1HoXQ8tb296GV1/PIlQYteFu5P3Cl5dRzQ6ZsAClCpPZvgvhG+8mWob6PL8YjQHOh0OtdKGuB4AAo2j8CABzhUltT8Tpu44kmSZA0hEAcmN+vrD9+t7TUt7XjpzgIhcDw79p4Z46+lFhLKTJgcPJI9EEWpr58fvaEJtYnG+9Vz+XZNe3EMs9tOz8TK6DyQsPVwEqlDmCdJ5ckSv1i94Xzwy9pcDJPkpvWOszCkAU750MsUGWR6dyvDICm9ND/5pmm4g3LoSsVamb4RUA5xndfVACPoy2rxBYcGGwEnp5d+3p3dm3xwxjN+EfUn/eczR9eLmYjAdB7DJSnx6cP7gOIAE3kWEfpxHBHqUJ3qBKDgU1RWWAOnXmSdqozLgG1nmV6H6DmWLJCWs0orf62RuzI16lGRKi9FbPDOiCxhdWanThOdBvhsmAjOji1Kgd/LHUbI99WnX0T4zELvtHywKU08cA5XJxPag82X31C5s/JHl72jzJ+AGco7ye5ugMmAAAAAElFTkSuQmCC",
    Passport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAfVJREFUOBFjYKAV4KnaryM//8EakeZj6fjsYMIlySct6cUmJBTMq6IczBA6lQeXOpwG/P//n+Xv378M/4A0ww+WfyQb8O/fP4Z/f/8x/P2DUy/YTFwuYPz94yf7nz9/Gf7/+cMINIkdlwuYMSRCZ/ILxDdnsEtJ5gO9wcPAwirLLisl8lfd5/rfE0veoatnhAs4NLBwWNpZ8ygo1DJzsDvDxf8DWSBV//4/+vH0RfvHiyeXMKzO/gKTBxvAV7hDiFFKsoJVSDAHKMEJk8RG//3xY+uPh3davnd5nQDJQwyYcGUjCxeP3///DH8Y/vw6/vfTlwMM//+JsIiIZP7/9ev47/dvlzPzCtgzcXI6MTD+F2T8///zt0vndX9MDX7IAjLl9+evd/9++Vb6+8Xrnb9ePrgPciJXy+kqBmA0/v/778eXU5fmMnA8n8nJoy7+X1bOgZmLy43xNxvIcwxgA75vuFDOcDb9N0gABsDRCIoFoCFgsLrh13cGhsdA9mKG0NBlDKtXgyUg0YimmcF4JiswBsT+gtLC//8CnIKcIjCDIYZBNIPYiFiAqQgNZWbRKmpj4ucvZfj/Hyz///fvkzzvX7u/73T9CFMGo8FegHEgtDbzv18/Of69e1vL9P3b4f9sLOr/WTkcv7/5JACUxzAAVS8ZPACe5tB/LSYhOgAAAABJRU5ErkJggg==",
    Server: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlJREFUOBHFkrFSAjEQhje5nDIwFqhzymBl6TvY2/gA2lvzAD6KvTyAjXTM+Bo2Muig54hXyJ0km7ibEFFGRjr+4pJNdv/Z/XIA65bgBm5ujy9qjc0MtUuUkmaVpspJlZ+e3F0pTt5rb59LBfuP9y+91lG7A+Do1HuDoMVRyCsr3lQf9T6FwcCYKSiRAFoAYzQlCyri1OVCq32C72A0GF/XairbSGXy/PB2ubxsflOVOufIG1hEMCjBGhcO5nlLd1zD8gY7Wf1MKNkaDYpe+7DZ+TUCzx4Hp20M66XqUxgYoDMgjKAODCAuPEIsXkBikdolBQbD9+5GmmaKSObDYiUGn9MfDIDHSS1Y6/wLsPO/CghCB1vNlBiI1vhp0ts9aHS+H/8Pl8hHa9mn6xkDml06CejsjEFExQ5xzytp9ldZjXMGxWvZTVKZSemSIq9WYmCm6P+D4LrO7xcn+pRWyLTrKQAAAABJRU5ErkJggg==",
    "Social Security": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAjdJREFUOBGdU81rE1EQfx+7aZrNZhNrA4oJDVRaROOhogfBkx48enMvPQmCIJiD/gEeFHrTguBBiqcI3ooHQfwHpAcvHorFxvgF1tRsq/nYfW/HN2/3JRHqxVl2Z3ZmfvP5HiX/IHg4X4jmSlfBze5l3n56SRut7kGu1Ci/35jNe6fdGnEcQqOY83PVBiu7y4RSItu7zfBN6wF3sj0S9mWwEbTLj3Z+IVYHQPDMzTOP2YzjA4CCUALqiT/8eEYoA1Y75JtEyghxp9fsrG5cxyAMDV7dq7LilA9CUCpjAlIQ5LxSvMiPuZdQJlLqF4Sk6OudKswh1sJPRC1uDcJRO4BKRQrYQQ6cHUaOlNooydraXwdAg86iHUA1QIlod9cGr97dVhWzqcv1e9ZR95r2012bFGkFaMCyDaFZ7Px8Uri/ryvo1XfXeDmnAxgfw/UM9I9QPU68Vi63ZJxsbl/ABDqJmsVksrSFMBmSQShuVdy74eulRcapYKXcMuAgFWF1ybAURlESQMmAU/6bgObts2qtam9SsaRvintEOcGnARBoAgjYjr/ur4jPwYv++/4emqaPTxesI94VXsk31EZqaQloGgdQZ0Ar6Hb3VsbfWtc/448K9GV1+HT+G18oPcdDZki3YMcR0DjGyihk7PPD9RMnjcMkZxF4WCl2QX4LPRQdINgctIoLwyZzLB9mM3fGq5mEp7IUEPdkM9jqf0TN6PTpy7TIq3gqD4CNVFhtsBm3zGUaGf5X+AOa5/VOUVpfEgAAAABJRU5ErkJggg==",
    "Software License": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAWRJREFUOBHFkb1KA0EQx397uQRjJKggKiqo0V5LQUQsfAGxEQQbLWx9AdFCGx9AKzsr9QmEgJIHsNVGUxj8BCEJJHe7zt4dIXeNUQv34JiZ/c9vPhb+eJTNN4u4zFOgP5fpiPderXHDgyriuUHC5uA2hfw+qHwMoIRvjISDOmLLrTW1+WTi44Diy6Ey6+TYGL/AVWNUqme4KR8dwyQc7TCQXaOpy1w+rrhkhau9NA0qXD0fqRNqiYyYa7boZnV0SYJpPHQ4gufFRN86od4OJMuzxw/swOzoZ/VRyu87iAP8jgq3RJ7oo4eJOvgpQHbWAtTF1L6PwwizmR1zTDtNSVxeqVUb8eXoIXmBMpLrMs0kT41bhp0FetkL0dGAdUqyLUWPMxcibFxKm2aDN3Nuc5U5de5IqalQkPjXdQnlKLpMBLB9RxArbZp7ZXaZoY9lAYf7SDBEr+SLWmq7tIO9ct0W+SfzCwlUcrSUSEWpAAAAAElFTkSuQmCC",
    "SSH Key": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAcZJREFUOBHdUjtLXEEU/ubOVdfLxlx33cRUq11CiA9QsTRVwCLlFtoIQhBJE9JYWAjpxEqSLiAI2gmWdoKFiIgSwoJJEySk2OxmZVdd752nZ1ZvI/oD4hlmvjPn8Z05wwH+e2FJBwuAN/0GYWs3OhtlXDROUH1ZhEj892GT4NcYUrnXuQ9B/tEkfDyHZXVVE5v149Ji12dxfF+ys7PtMfij47lPrblg7nagEeagsvd7/NkKyrd9yZ1VZoPhcCDcIUOK+GCV+cm410tqC2Ahq2LdKFtMEhL0SFHn8a7fnm3pN0JSMhlqYuPfTu1dR1/7ZJBPLztCP80m6HuaeZYImStCy4nRfN6HloC8DiCLZgEY81hEpJRPX2Qp2CGJO80NujuUsf5lufGNP2YRBaW8NhS6RtKD4LbHKuU6gL40qzo2P7iBx0N/gh7zwtWPKnLJSr3Lhw5R6nmFLG+zo9DEb02WkDtdR/rw4k80lV1WW+8z6iD1hL21ML0wBvJvPJP5Yva9AhWpHsk5WZEfEcuiFVLTPtV1uaJOROHpV5Saz6VDx8KDVLCS2ruZkOvmyLmQDFJIg3R29yCdTiNvI3Q4wswavjt8AHIF3GXFwjL3PSwAAAAASUVORK5CYII=",
    "Wi-Fi Password": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAoBJREFUOBHV0k9IFFEcB/A3b3ZmHGd2dVfdqU3RBNOw1Ug8abkkiKlEdCiwQOsSFHjp0imIvHTt0J9D1CUCD1GX0khaEvpDGe2SlOafdHfdXW3XcbXdnZn33vRmYMMipGsDj+G9x+/D9/feA+C//xirg8Xj9W2AgaK6kU7EY8nl7imwRpfNf+nOBtbPtt6VJWnQKiAmnspm88GUqo58CX992zMLtO0gaG3qmq4RhDHB2BIai4uKLlQp3udth1puhbt8DdsBdoKxJiBJLneZz1NaI8nOw05JPMZC2GwVEkJmoivJobrH38b+BtnAXE+lX8OEi8QzUT68mXa0lzh3K8qgu8R1GTJMKTFBKrqcPFk/ujT+J2ID8RMN91zF4gDdjGRz2hM1k75e9zTx+WPnzlO1Pu8whLCamGRmIRI72vzi+/RWxD4D2ruJEQJ0VAk8e87rKZ+Y66sZ3D8evx9fTZ3H2MjQXvZ4yzxDt1sAtxVgrUn/LjOIDD1InVkewiYTmJ5injtyxicsPRiLPdxXK4kOCDtYyPg92DF6Y2EzVkDsBBxinHOJ9fCdR/NXFxPpXqQbIUIwX1EiXelrd1cmUsmbBKMoTVEkS3xvodj620CpJA4fqFY+nO72XUwHk++X1fVLCOk5Gr26zCX2z09kV35k88+wYQCBZTtGGoFcQGyAASY9BLzDJTiulQcqBt6oq+Oahkbp2wAchAdBJeANHb2z3glDUJ3MA/E3ABuIpQMgAzGyADvdk4DkDWOaxgYmQjVcORBySFvFyAB0TXFB9y/AvsZQl+w1NjjFUgUur/pf5iKhLkUyNvRaBuBcy+vMrBkIOCa10F6Txm19tfapkOAnEdEmhrLLyEAAAAAASUVORK5CYII="
}
  , lp_last_launch = new Array
  , lp_last_trial_nag = 0
  , lpdoupgradepage = !0
  , AL_OPEN = 0
  , AL_SAVE = 1
  , AL_DELETE = 2
  , AL_CANCEL = 3
  , AL_MIN = AL_OPEN
  , AL_MAX = AL_CANCEL
  , AL_STRINGS = ["Open File", "Save File", "Delete", "Cancel"]
  , FILENAME_FRAGMENT_VALID = 1
  , FILENAME_FRAGMENT_EMPTY = 0
  , FILENAME_FRAGMENT_BAD_SHELL_CHARS = -1
  , FILENAME_FRAGMENT_BAD_CONTROL_CHARS = -2
  , NOTE_SEARCH_NEXT = 1
  , NOTE_SEARCH_PREV = 2
  , NOTE_SEARCH_UNKNOWN = 0
  , POPUP_SORT_COL_SITE = 1
  , POPUP_SORT_COL_USERNAME = 2
  , POPUP_SORT_COL_LASTTOUCH = 3
  , POPUP_SORTTYPES = [POPUP_SORT_COL_SITE, POPUP_SORT_COL_USERNAME, POPUP_SORT_COL_LASTTOUCH]
  , POPUP_TABLE_DISPLAY_ROWS = 5
  , do_bgiconinput = !(this.httptestdone = !1)
  , NO_CREATE = !1
  , OK_CREATE = !0
  , LPICON_WIDTH = 16
  , g_popupfill_rows = 0
  , g_autofillsites = {}
  , g_fillaid = null
  , g_popupfill_widest = 0
  , g_popupfill_parent = null
  , LPMAGIC = "__lpform_"
  , LPMAGICIFRAME = "lpformframe"
  , g_form_has_password_cache = []
  , verbose = !1
  , CLICKABLE_ICON_ZINDEX = 1e9
  , g_weaseled = !1
  , SKIP_GENPWS = !(this.g_didchangepw = [])
  , MAX_INPUTS_HARD = 200
  , MAX_INPUTS_SOFT = 100
  , INCLUDE_HIDDEN = !0
  , lpIconWorkingSet = []
  , g_csr = []
  , fakeout_overlay = !1
  , g_icon_number_in_toolbar = !0
  , g_alert_btn_flag = !1
  , g_cpwbot = !0;
if (!0 === verbose)
    var g_isdebug = !0;
var g_lp_model = 1
  , g_trial_available = !1;
this.user_agent = "";
var ffver = "0";
function lp_init_tlds() {
    void 0 !== lp_all_tlds && null != lp_all_tlds || ((lp_all_tlds = new Array).hu = new Array("2000","agrar","blogspot","bolt","casino","city","co","com","erotica","erotika","film","forum","games","hotel","info","ingatlan","jogasz","konyvelo","lakas","media","news","nui","org","priv","reklam","sex","shop","sport","suli","szex","tm","tozsde","utazas","video"),
    lp_all_tlds.nl = new Array("*.transurl","752","blogspot","bv","co","virtueeldomein"),
    lp_all_tlds.ca = new Array("ab","bc","blogspot","co","gc","mb","nb","nf","nl","no-ip","ns","nt","nu","on","pe","qc","sk","yk"),
    lp_all_tlds.pa = new Array("abo","ac","com","edu","gob","ing","med","net","nom","org","sld"),
    lp_all_tlds.se = new Array("a","ab","ac","b","bd","blogspot","brand","c","com","d","e","f","fh","fhsk","fhv","g","h","i","k","komforb","kommunalforbund","komvux","l","lanarb","lanbib","m","mil","n","naturbruksgymn","net","o","org","p","parti","pp","press","r","s","sshn","t","tm","u","w","x","y","z"),
    lp_all_tlds.ac = new Array("ac","co","com","edu","gov","gv","mil","net","or","org"),
    lp_all_tlds.ae = new Array("ac","blogspot","co","com","gov","mil","name","net","org","pro","sch"),
    lp_all_tlds.at = new Array("*.ex.ortsinfo","*.kunden.ortsinfo","blogspot.co","ac","biz","co","futurehosting","futuremailing","gv","info","or","priv"),
    lp_all_tlds.be = new Array("*.transurl","ac","ap","blogspot","co","com","fgov","to","xa"),
    lp_all_tlds.cn = new Array("cn-north-1.compute.amazonaws.com","s3.cn-north-1.amazonaws.com","cn-north-1.compute.amazonaws","compute.amazonaws.com","compute.amazonaws","ac","ah","bj","com","cq","edu","fj","gd","gov","gs","gx","gz","ha","hb","he","hi","hk","hl","hn","jl","js","jx","ln","mil","mo","net","nm","nx","org","qh","sc","sd","sh","sn","sx","tj","tw","xj","xn--55qx5d","xn--io0a7i","xn--od0alg","xz","yn","zj"),
    lp_all_tlds.cr = new Array("ac","co","ed","fi","go","or","sa"),
    lp_all_tlds.cy = new Array("blogspot.com","*","ac","biz","com","ekloges","gov","info","ltd","name","net","org","parliament","press","pro","tm"),
    lp_all_tlds.fj = new Array("*","ac","biz","com","gov","id","info","mil","name","net","org","pro","school"),
    lp_all_tlds.fk = new Array("*","ac","co","gov","net","nom","org"),
    lp_all_tlds.gg = new Array("ac","alderney","co","gov","guernsey","ind","ltd","net","org","sark","sch"),
    lp_all_tlds.gn = new Array("ac","com","edu","gov","net","org"),
    lp_all_tlds.gt = new Array("com","edu","gob","ind","mil","net","org"),
    lp_all_tlds.id = new Array("blogspot.co","ac","biz","co","desa","go","mil","my","net","or","sch","web"),
    lp_all_tlds.il = new Array("blogspot.co","*","ac","co","gov","idf","k12","muni","net","org"),
    lp_all_tlds.im = new Array("ltd.co","plc.co","ac","co","com","gov","net","nic","org","ro","tt","tv"),
    lp_all_tlds.in = new Array("ac","blogspot","cloudns","co","edu","ernet","firm","gen","gov","ind","mil","net","nic","org","res"),
    lp_all_tlds.ir = new Array("ac","co","gov","id","net","org","sch","xn--mgba3a4f16a","xn--mgba3a4fra"),
    lp_all_tlds.is = new Array("ac","blogspot","com","cupcake","edu","gov","int","net","org"),
    lp_all_tlds.je = new Array("ac","co","gov","ind","jersey","ltd","net","org","sch"),
    lp_all_tlds.jp = new Array("ac","ad","aichi","akita","aomori","blogspot","chiba","co","ed","ehime","fukui","fukuoka","fukushima","gifu","go","gov","gr","gunma","hiroshima","hokkaido","hyogo","ibaraki","ishikawa","iwate","kagawa","kagoshima","kanagawa","kawasaki","kitakyushu","kobe","kochi","kumamoto","kyoto","lg","mie","miyagi","miyazaki","nagano","nagasaki","nagoya","nara","ne","net","niigata","oita","okayama","okinawa","or","org","osaka","saga","saitama","sapporo","sendai","shiga","shimane","shizuoka","tochigi","tokushima","tokyo","tottori","toyama","wakayama","xn--0trq7p7nn","xn--1ctwo","xn--1lqs03n","xn--1lqs71d","xn--2m4a15e","xn--32vp30h","xn--4it168d","xn--4it797k","xn--4pvxs","xn--5js045d","xn--5rtp49c","xn--5rtq34k","xn--6btw5a","xn--6orx2r","xn--7t0a264c","xn--8ltr62k","xn--8pvr4u","xn--c3s14m","xn--d5qv7z876c","xn--djrs72d6uy","xn--djty4k","xn--efvn9s","xn--ehqz56n","xn--elqq16h","xn--f6qx53a","xn--k7yn95e","xn--kbrq7o","xn--klt787d","xn--kltp7d","xn--kltx9a","xn--klty5x","xn--mkru45i","xn--nit225k","xn--ntso0iqx3a","xn--ntsq17g","xn--pssu33l","xn--qqqt11m","xn--rht27z","xn--rht3d","xn--rht61e","xn--rny31h","xn--tor131o","xn--uist22h","xn--uisz3g","xn--uuwu58a","xn--vgu402c","xn--zbx025d","yamagata","yamaguchi","yamanashi","yokohama"),
    lp_all_tlds.kr = new Array("ac","blogspot","busan","chungbuk","chungnam","co","daegu","daejeon","es","gangwon","go","gwangju","gyeongbuk","gyeonggi","gyeongnam","hs","incheon","jeju","jeonbuk","jeonnam","kg","mil","ms","ne","nm","or","pe","re","sc","seoul","ulsan"),
    lp_all_tlds.mw = new Array("ac","biz","co","com","coop","edu","gov","int","museum","net","org"),
    lp_all_tlds.nz = new Array("blogspot.co","*","ac","co","cri","geek","gen","govt","health","iwi","kiwi","maori","mil","net","org","parliament","school","xn--mori-qsa"),
    lp_all_tlds.ru = new Array("ac","adygeya","altai","amur","amursk","arkhangelsk","astrakhan","baikal","bashkiria","belgorod","bir","blogspot","bryansk","buryatia","cbg","chel","chelyabinsk","chita","chukotka","chuvashia","cmw","com","dagestan","dudinka","e-burg","edu","fareast","gov","grozny","int","irkutsk","ivanovo","izhevsk","jamal","jar","joshkar-ola","k-uralsk","kalmykia","kaluga","kamchatka","karelia","kazan","kchr","kemerovo","khabarovsk","khakassia","khv","kirov","kms","koenig","komi","kostroma","krasnoyarsk","kuban","kurgan","kursk","kustanai","kuzbass","lipetsk","magadan","magnitka","mari","mari-el","marine","mil","mordovia","mosreg","msk","murmansk","mytis","nakhodka","nalchik","net","nkz","nnov","norilsk","nov","novosibirsk","nsk","omsk","orenburg","org","oryol","oskol","palana","penza","perm","pp","pskov","ptz","pyatigorsk","rnd","rubtsovsk","ryazan","sakhalin","samara","saratov","simbirsk","smolensk","snz","spb","stavropol","stv","surgut","syzran","tambov","tatarstan","test","tom","tomsk","tsaritsyn","tsk","tula","tuva","tver","tyumen","udm","udmurtia","ulan-ude","vdonsk","vladikavkaz","vladimir","vladivostok","volgograd","vologda","voronezh","vrn","vyatka","yakutia","yamal","yaroslavl","yekaterinburg","yuzhno-sakhalinsk","zgrad"),
    lp_all_tlds.rw = new Array("ac","co","com","edu","gouv","gov","int","mil","net"),
    lp_all_tlds.au = new Array("act.edu","blogspot.com","nsw.edu","nt.edu","qld.edu","qld.gov","sa.edu","sa.gov","tas.edu","tas.gov","vic.edu","vic.gov","wa.edu","wa.gov","act","asn","com","conf","csiro","edu","gov","id","info","net","nsw","nt","org","oz","qld","sa","tas","telememo","vic","wa"),
    lp_all_tlds.th = new Array("ac","co","go","in","mi","net","or"),
    lp_all_tlds.tj = new Array("ac","biz","co","com","edu","go","gov","int","mil","name","net","nic","org","test","web"),
    lp_all_tlds.tz = new Array("ac","co","go","hotel","info","me","mil","mobi","ne","or","sc","tv"),
    lp_all_tlds.ug = new Array("ac","blogspot","co","com","go","ne","or","org","sc"),
    lp_all_tlds.uk = new Array("*.sch","blogspot.co","no-ip.co","service.gov","wellbeingzone.co","!bl","!british-library","!jet","!mod","!national-library-scotland","!nel","!nic","!nls","!parliament","*","ac","co","com","gov","icnet","ltd","me","mil","net","nhs","org","plc","police","sch"),
    lp_all_tlds.vn = new Array("ac","biz","blogspot","com","edu","gov","health","info","int","name","net","org","pro"),
    lp_all_tlds.yu = new Array("ac","co","edu","org"),
    lp_all_tlds.za = new Array("blogspot.co","*","ac","agric","agrica","alt","city","co","com","edu","gov","grondar","law","mil","net","ngo","nis","nom","org","school","tm","web"),
    lp_all_tlds.zm = new Array("*","ac","biz","co","com","edu","gov","info","mil","net","org","sch"),
    lp_all_tlds.zw = new Array("*","ac","co","gov","org"),
    lp_all_tlds.br = new Array("*.nom","ac.leg","al.leg","am.leg","ap.leg","ba.leg","blogspot.com","ce.leg","df.leg","es.leg","go.leg","ma.leg","mg.leg","ms.leg","mt.leg","pa.leg","pb.leg","pe.leg","pi.leg","pr.leg","rj.leg","rn.leg","ro.leg","rr.leg","rs.leg","sc.leg","se.leg","sp.leg","to.leg","sp.gov","adm","adv","agr","am","arq","art","ato","b","bio","blog","bmd","cim","cng","cnt","com","coop","dpn","ecn","eco","edu","emp","eng","esp","etc","eti","far","flog","fm","fnd","fot","fst","g12","ggf","gov","imb","ind","inf","jor","jus","leg","lel","mat","med","mil","mp","mus","net","nom","not","ntr","odo","org","ppg","pro","psc","psi","qsl","radio","rec","slg","srv","taxi","teo","tmp","trd","tur","tv","vet","vlog","wiki","zlg"),
    lp_all_tlds.ht = new Array("adult","art","asso","com","coop","edu","firm","gouv","info","med","net","org","perso","pol","pro","rel","shop"),
    lp_all_tlds.mv = new Array("aero","biz","com","coop","edu","gov","info","int","mil","museum","name","net","org","pro"),
    lp_all_tlds.pl = new Array("ap.gov","griw.gov","ic.gov","is.gov","kmpsp.gov","konsulat.gov","kppsp.gov","kwp.gov","kwpsp.gov","mup.gov","mw.gov","oirm.gov","oum.gov","pa.gov","pinb.gov","piw.gov","po.gov","psp.gov","psse.gov","pup.gov","rzgw.gov","sa.gov","sdn.gov","sko.gov","so.gov","sr.gov","starostwo.gov","ug.gov","ugim.gov","um.gov","umig.gov","upow.gov","uppo.gov","us.gov","uw.gov","uzs.gov","wif.gov","wiih.gov","winb.gov","wios.gov","witd.gov","wiw.gov","wsa.gov","wskr.gov","wuoz.gov","wzmiuw.gov","zp.gov","6bone","agro","aid","art","atm","augustow","auto","babia-gora","bedzin","beep","beskidy","bialowieza","bialystok","bielawa","bieszczady","biz","boleslawiec","bydgoszcz","bytom","cieszyn","co","com","czeladz","czest","dlugoleka","edu","elblag","elk","gda","gdansk","gdynia","gliwice","glogow","gmina","gniezno","gorlice","gov","grajewo","gsm","ilawa","info","irc","jaworzno","jelenia-gora","jgora","kalisz","karpacz","kartuzy","kaszuby","katowice","kazimierz-dolny","kepno","ketrzyn","klodzko","kobierzyce","kolobrzeg","konin","konskowola","krakow","kutno","lapy","lebork","legnica","lezajsk","limanowa","lodz","lomza","lowicz","lubin","lublin","lukow","mail","malbork","malopolska","mazowsze","mazury","mbone","med","media","miasta","mielec","mielno","mil","mragowo","naklo","net","ngo","nieruchomosci","nom","nowaruda","nysa","olawa","olecko","olkusz","olsztyn","opoczno","opole","org","ostroda","ostroleka","ostrowiec","ostrowwlkp","pc","pila","pisz","podhale","podlasie","polkowice","pomorskie","pomorze","powiat","poznan","priv","prochowice","pruszkow","przeworsk","pulawy","radom","rawa-maz","realestate","rel","rybnik","rzeszow","sanok","sejny","sex","shop","siedlce","sklep","skoczow","slask","slupsk","sopot","sos","sosnowiec","stalowa-wola","starachowice","stargard","suwalki","swidnica","swiebodzin","swinoujscie","szczecin","szczytno","szkola","targi","tarnobrzeg","tgory","tm","torun","tourism","travel","turek","turystyka","tychy","usenet","ustka","walbrzych","warmia","warszawa","waw","wegrow","wielun","wlocl","wloclawek","wodzislaw","wolomin","wroc","wroclaw","zachpomor","zagan","zakopane","zarow","zgora","zgorzelec"),
    lp_all_tlds.us = new Array("chtr.k12.ma","paroch.k12.ma","pvt.k12.ma","cc.ak","cc.al","cc.ar","cc.as","cc.az","cc.ca","cc.co","cc.ct","cc.dc","cc.de","cc.fl","cc.ga","cc.gu","cc.hi","cc.ia","cc.id","cc.il","cc.in","cc.ks","cc.ky","cc.la","cc.ma","cc.md","cc.me","cc.mi","cc.mn","cc.mo","cc.ms","cc.mt","cc.nc","cc.nd","cc.ne","cc.nh","cc.nj","cc.nm","cc.nv","cc.ny","cc.oh","cc.ok","cc.or","cc.pa","cc.pr","cc.ri","cc.sc","cc.sd","cc.tn","cc.tx","cc.ut","cc.va","cc.vi","cc.vt","cc.wa","cc.wi","cc.wv","cc.wy","k12.ak","k12.al","k12.ar","k12.as","k12.az","k12.ca","k12.co","k12.ct","k12.dc","k12.de","k12.fl","k12.ga","k12.gu","k12.ia","k12.id","k12.il","k12.in","k12.ks","k12.ky","k12.la","k12.ma","k12.md","k12.me","k12.mi","k12.mn","k12.mo","k12.ms","k12.mt","k12.nc","k12.ne","k12.nh","k12.nj","k12.nm","k12.nv","k12.ny","k12.oh","k12.ok","k12.or","k12.pa","k12.pr","k12.ri","k12.sc","k12.tn","k12.tx","k12.ut","k12.va","k12.vi","k12.vt","k12.wa","k12.wi","k12.wy","lib.ak","lib.al","lib.ar","lib.as","lib.az","lib.ca","lib.co","lib.ct","lib.dc","lib.de","lib.fl","lib.ga","lib.gu","lib.hi","lib.ia","lib.id","lib.il","lib.in","lib.ks","lib.ky","lib.la","lib.ma","lib.md","lib.me","lib.mi","lib.mn","lib.mo","lib.ms","lib.mt","lib.nc","lib.nd","lib.ne","lib.nh","lib.nj","lib.nm","lib.nv","lib.ny","lib.oh","lib.ok","lib.or","lib.pa","lib.pr","lib.ri","lib.sc","lib.sd","lib.tn","lib.tx","lib.ut","lib.va","lib.vi","lib.vt","lib.wa","lib.wi","lib.wy","ak","al","ar","as","az","ca","cloudns","co","com","ct","dc","de","dni","drud","fed","fl","ga","golffan","gu","hi","ia","id","il","in","is-by","isa","kids","ks","ky","la","land-4-sale","ma","md","me","mi","mn","mo","ms","mt","nc","nd","ne","nh","nj","nm","noip","nsn","nv","ny","oh","ok","or","pa","pointto","pr","ri","sc","sd","stuff-4-sale","tn","tx","ut","va","vi","vt","wa","wi","wv","wy"),
    lp_all_tlds.fi = new Array("aland","blogspot","dy","iki"),
    lp_all_tlds.mil = new Array("army","navy"),
    lp_all_tlds.do = new Array("art","com","edu","gob","gov","mil","net","org","sld","web"),
    lp_all_tlds.dz = new Array("art","asso","com","edu","gov","net","org","pol"),
    lp_all_tlds.co = new Array("blogspot.com","arts","com","edu","firm","gov","info","int","mil","net","nom","org","rec","store","uk","web"),
    lp_all_tlds.ro = new Array("arts","blogspot","com","firm","info","nom","nt","org","rec","shop","store","tm","www"),
    lp_all_tlds.ve = new Array("arts","bib","co","com","e12","edu","firm","gob","gov","info","int","mil","net","nom","org","rec","store","tec","web"),
    lp_all_tlds.lv = new Array("asn","com","conf","edu","eu","gov","id","mil","net","org"),
    lp_all_tlds.lk = new Array("ac","assn","com","edu","gov","grp","hotel","int","ltd","net","ngo","org","sch","soc","web"),
    lp_all_tlds.fr = new Array("aeroport","assedic","asso","avocat","avoues","blogspot","cci","chambagri","chirurgiens-dentistes","chirurgiens-dentistes-en-france","com","experts-comptables","fbx-os","fbxos","freebox-os","freeboxos","geometre-expert","gouv","greta","huissier-justice","medecin","nom","notaires","pharmacien","port","prd","presse","tm","veterinaire"),
    lp_all_tlds.gp = new Array("asso","com","edu","mobi","net","org"),
    lp_all_tlds.mc = new Array("asso","tm"),
    lp_all_tlds.tr = new Array("blogspot.com","gov.nc","!nic","*","av","bbs","bel","biz","com","dr","edu","gen","gov","info","k12","kep","mil","name","nc","net","org","pol","tel","tv","web"),
    lp_all_tlds.az = new Array("biz","com","edu","gov","info","int","mil","name","net","org","pp","pro"),
    lp_all_tlds.et = new Array("*","biz","com","edu","gov","info","name","net","org"),
    lp_all_tlds.nr = new Array("biz","co","com","edu","gov","info","net","org"),
    lp_all_tlds.om = new Array("!mediaphone","!nawras","!nawrastelecom","!omanmobile","!omanpost","!omantel","!rakpetroleum","!siemens","!songfest","!statecouncil","*","biz","co","com","edu","gov","med","mil","museum","net","org","pro","sch"),
    lp_all_tlds.pk = new Array("biz","com","edu","fam","gob","gok","gon","gop","gos","gov","info","net","org","web"),
    lp_all_tlds.pr = new Array("ac","biz","com","edu","est","gov","info","isla","name","net","org","pro","prof"),
    lp_all_tlds.tt = new Array("aero","biz","co","com","coop","edu","gov","info","int","jobs","mobi","museum","name","net","org","pro","travel","us"),
    lp_all_tlds.ua = new Array("biz","cherkassy","cherkasy","chernigov","chernihiv","chernivtsi","chernovtsy","ck","cn","co","com","cr","crimea","cv","dn","dnepropetrovsk","dnipropetrovsk","dominic","donetsk","dp","edu","gov","if","in","ivano-frankivsk","kh","kharkiv","kharkov","kherson","khmelnitskiy","khmelnytskyi","kiev","kirovograd","km","kr","krym","ks","kv","kyiv","lg","lt","lugansk","lutsk","lv","lviv","mk","mykolaiv","net","nikolaev","od","odesa","odessa","org","pl","poltava","pp","rivne","rovno","rv","sb","sebastopol","sevastopol","sm","sumy","te","ternopil","uz","uzhgorod","vinnica","vinnytsia","vn","volyn","yalta","zaporizhzhe","zaporizhzhia","zhitomir","zhytomyr","zp","zt"),
    lp_all_tlds.tw = new Array("blogspot","club","com","ebiz","edu","game","gov","gove","idv","mil","net","org","xn--czrw28b","xn--uc0atv","xn--zf0ao64a"),
    lp_all_tlds.ag = new Array("co","com","net","nom","org"),
    lp_all_tlds.ao = new Array("co","ed","gv","it","og","pb"),
    lp_all_tlds.bw = new Array("co","org"),
    lp_all_tlds.ck = new Array("!www","*","co"),
    lp_all_tlds.ls = new Array("co","org"),
    lp_all_tlds.ma = new Array("ac","co","gov","net","org","press"),
    lp_all_tlds.af = new Array("com","edu","gov","net","org"),
    lp_all_tlds.ai = new Array("com","net","off","org"),
    lp_all_tlds.al = new Array("blogspot","com","edu","gov","inima","mil","net","org","soros","tirana","uniti","upt"),
    lp_all_tlds.an = new Array("com","edu","net","org"),
    lp_all_tlds.ar = new Array("blogspot.com","!congresodelalengua3","!educ","!gobiernoelectronico","!mecon","!nacion","!nic","!promocion","!retina","!uba","*","com","edu","gob","gov","int","mil","net","org","tur"),
    lp_all_tlds.aw = new Array("com"),
    lp_all_tlds.bb = new Array("biz","co","com","edu","gov","info","net","org","store","tv"),
    lp_all_tlds.bd = new Array("*","com","edu","gov","mil","net","org"),
    lp_all_tlds.bm = new Array("com","edu","gov","net","org"),
    lp_all_tlds.bn = new Array("*","com","edu","net","org"),
    lp_all_tlds.bo = new Array("com","edu","gob","gov","int","mil","net","org","tv"),
    lp_all_tlds.bs = new Array("com","edu","gov","net","org"),
    lp_all_tlds.bt = new Array("com","edu","gov","net","org"),
    lp_all_tlds.cd = new Array("com","gov","net","org"),
    lp_all_tlds.ch = new Array("blogspot","com","gotdns","gov","net","org"),
    lp_all_tlds.cu = new Array("com","edu","gov","inf","net","org"),
    lp_all_tlds.dm = new Array("com","edu","gov","net","org"),
    lp_all_tlds.ec = new Array("com","edu","fin","gob","gov","info","k12","med","mil","net","org","pro"),
    lp_all_tlds.ee = new Array("blogspot.com","aip","com","edu","fie","gov","lib","med","org","pri","riik"),
    lp_all_tlds.eg = new Array("blogspot.com","com","edu","eun","gov","mil","name","net","org","sci"),
    lp_all_tlds.es = new Array("blogspot.com","com","edu","gob","nom","org"),
    lp_all_tlds.eu = new Array("*.transurl","cloudns","com","mycd","spdns","wellbeingzone"),
    lp_all_tlds.gb = new Array("com","net"),
    lp_all_tlds.ge = new Array("com","edu","gov","mil","net","org","pvt"),
    lp_all_tlds.gh = new Array("com","edu","gov","mil","org"),
    lp_all_tlds.gi = new Array("com","edu","gov","ltd","mod","org"),
    lp_all_tlds.gr = new Array("blogspot","com","edu","gov","net","org"),
    lp_all_tlds.gu = new Array("*","com","edu","gov","mil","net","org"),
    lp_all_tlds.hk = new Array("blogspot","com","edu","gov","idv","inc","ltd","net","org","xn--55qx5d","xn--ciqpn","xn--gmq050i","xn--gmqw5a","xn--io0a7i","xn--lcvr32d","xn--mk0axi","xn--mxtq1m","xn--od0alg","xn--od0aq3b","xn--tn0ag","xn--uc0atv","xn--uc0ay4a","xn--wcvs22d","xn--zf0avx"),
    lp_all_tlds.hn = new Array("com","edu","gob","mil","net","org"),
    lp_all_tlds.hr = new Array("blogspot","com","from","iz","name"),
    lp_all_tlds.jm = new Array("*","com","edu","gov","net","org"),
    lp_all_tlds.jo = new Array("com","edu","gov","mil","name","net","org","sch"),
    lp_all_tlds.kh = new Array("*","com","edu","gov","mil","net","org","per"),
    lp_all_tlds.kw = new Array("*","com","edu","gov","mil","net","org"),
    lp_all_tlds.ky = new Array("com","edu","gov","net","org"),
    lp_all_tlds.kz = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.la = new Array("bnr","c","com","edu","gov","info","int","net","org","per"),
    lp_all_tlds.lb = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.lc = new Array("co","com","edu","gov","net","org","oy"),
    lp_all_tlds.li = new Array("blogspot","com","gov","net","org"),
    lp_all_tlds.lr = new Array("com","edu","gov","net","org"),
    lp_all_tlds.ly = new Array("com","edu","gov","id","med","net","org","plc","sch"),
    lp_all_tlds.mg = new Array("co","com","edu","gov","mil","nom","org","prd","tm"),
    lp_all_tlds.mk = new Array("blogspot","com","edu","gov","inf","name","net","org"),
    lp_all_tlds.mm = new Array("*","com","edu","gov","net","org"),
    lp_all_tlds.mo = new Array("com","edu","gov","net","org"),
    lp_all_tlds.mt = new Array("blogspot.com","*","com","edu","gov","net","org"),
    lp_all_tlds.mu = new Array("ac","co","com","gov","net","or","org"),
    lp_all_tlds.mx = new Array("blogspot","com","edu","gob","gov","net","org"),
    lp_all_tlds.my = new Array("blogspot","com","edu","gov","mil","name","net","org"),
    lp_all_tlds.na = new Array("ca","cc","co","com","dr","in","info","mobi","mx","name","net","or","org","pro","school","tv","us","ws"),
    lp_all_tlds.nc = new Array("asso","com","net","org"),
    lp_all_tlds.ng = new Array("blogspot.com","ac","com","edu","gov","i","mil","mobi","name","net","org","sch"),
    lp_all_tlds.ni = new Array("*","ac","biz","co","com","edu","gob","in","info","int","mil","net","nom","org","web"),
    lp_all_tlds.no = new Array("bo.nordland","bo.telemark","gs.aa","gs.ah","gs.bu","gs.fm","gs.hl","gs.hm","gs.jan-mayen","gs.mr","gs.nl","gs.nt","gs.of","gs.ol","gs.oslo","gs.rl","gs.sf","gs.st","gs.svalbard","gs.tm","gs.tr","gs.va","gs.vf","heroy.more-og-romsdal","heroy.nordland","nes.akershus","nes.buskerud","os.hedmark","os.hordaland","sande.more-og-romsdal","sande.vestfold","sande.xn--mre-og-romsdal-qqb","valer.hedmark","valer.ostfold","xn--b-5ga.nordland","xn--b-5ga.telemark","xn--hery-ira.nordland","xn--hery-ira.xn--mre-og-romsdal-qqb","xn--vler-qoa.hedmark","xn--vler-qoa.xn--stfold-9xa","aa","aarborte","aejrie","afjord","agdenes","ah","aknoluokta","akrehamn","al","alaheadju","alesund","algard","alstahaug","alta","alvdal","amli","amot","andasuolo","andebu","andoy","ardal","aremark","arendal","arna","aseral","asker","askim","askoy","askvoll","asnes","audnedaln","aukra","aure","aurland","aurskog-holand","austevoll","austrheim","averoy","badaddja","bahcavuotna","bahccavuotna","baidar","bajddar","balat","balestrand","ballangen","balsfjord","bamble","bardu","barum","batsfjord","bearalvahki","beardu","beiarn","berg","bergen","berlevag","bievat","bindal","birkenes","bjarkoy","bjerkreim","bjugn","blogspot","bodo","bokn","bomlo","bremanger","bronnoy","bronnoysund","brumunddal","bryne","bu","budejju","bygland","bykle","cahcesuolo","co","com","davvenjarga","davvesiida","deatnu","dep","dielddanuorri","divtasvuodna","divttasvuotna","donna","dovre","drammen","drangedal","drobak","dyroy","egersund","eid","eidfjord","eidsberg","eidskog","eidsvoll","eigersund","elverum","enebakk","engerdal","etne","etnedal","evenassi","evenes","evje-og-hornnes","farsund","fauske","fedje","fet","fetsund","fhs","finnoy","fitjar","fjaler","fjell","fla","flakstad","flatanger","flekkefjord","flesberg","flora","floro","fm","folkebibl","folldal","forde","forsand","fosnes","frana","fredrikstad","frei","frogn","froland","frosta","froya","fuoisku","fuossko","fusa","fylkesbibl","fyresdal","gaivuotna","galsa","gamvik","gangaviika","gaular","gausdal","giehtavuoatna","gildeskal","giske","gjemnes","gjerdrum","gjerstad","gjesdal","gjovik","gloppen","gol","gran","grane","granvin","gratangen","grimstad","grong","grue","gulen","guovdageaidnu","ha","habmer","hadsel","hagebostad","halden","halsa","hamar","hamaroy","hammarfeasta","hammerfest","hapmir","haram","hareid","harstad","hasvik","hattfjelldal","haugesund","hemne","hemnes","hemsedal","herad","hitra","hjartdal","hjelmeland","hl","hm","hobol","hof","hokksund","hol","hole","holmestrand","holtalen","honefoss","hornindal","horten","hoyanger","hoylandet","hurdal","hurum","hvaler","hyllestad","ibestad","idrett","inderoy","iveland","ivgu","jan-mayen","jessheim","jevnaker","jolster","jondal","jorpeland","kafjord","karasjohka","karasjok","karlsoy","karmoy","kautokeino","kirkenes","klabu","klepp","kommune","kongsberg","kongsvinger","kopervik","kraanghke","kragero","kristiansand","kristiansund","krodsherad","krokstadelva","kvafjord","kvalsund","kvam","kvanangen","kvinesdal","kvinnherad","kviteseid","kvitsoy","laakesvuemie","lahppi","langevag","lardal","larvik","lavagis","lavangen","leangaviika","lebesby","leikanger","leirfjord","leirvik","leka","leksvik","lenvik","lerdal","lesja","levanger","lier","lierne","lillehammer","lillesand","lindas","lindesnes","loabat","lodingen","lom","loppa","lorenskog","loten","lund","lunner","luroy","luster","lyngdal","lyngen","malatvuopmi","malselv","malvik","mandal","marker","marnardal","masfjorden","masoy","matta-varjjat","meland","meldal","melhus","meloy","meraker","midsund","midtre-gauldal","mil","mjondalen","mo-i-rana","moareke","modalen","modum","molde","mosjoen","moskenes","moss","mosvik","mr","muosat","museum","naamesjevuemie","namdalseid","namsos","namsskogan","nannestad","naroy","narviika","narvik","naustdal","navuotna","nedre-eiker","nesna","nesodden","nesoddtangen","nesseby","nesset","nissedal","nittedal","nl","nord-aurdal","nord-fron","nord-odal","norddal","nordkapp","nordre-land","nordreisa","nore-og-uvdal","notodden","notteroy","nt","odda","of","oksnes","ol","omasvuotna","oppdal","oppegard","orkanger","orkdal","orland","orskog","orsta","osen","oslo","osoyro","osteroy","ostre-toten","overhalla","ovre-eiker","oyer","oygarden","oystre-slidre","porsanger","porsangu","porsgrunn","priv","rade","radoy","rahkkeravju","raholt","raisa","rakkestad","ralingen","rana","randaberg","rauma","rendalen","rennebu","rennesoy","rindal","ringebu","ringerike","ringsaker","risor","rissa","rl","roan","rodoy","rollag","romsa","romskog","roros","rost","royken","royrvik","ruovat","rygge","salangen","salat","saltdal","samnanger","sandefjord","sandnes","sandnessjoen","sandoy","sarpsborg","sauda","sauherad","sel","selbu","selje","seljord","sf","siellak","sigdal","siljan","sirdal","skanit","skanland","skaun","skedsmo","skedsmokorset","ski","skien","skierva","skiptvet","skjak","skjervoy","skodje","slattum","smola","snaase","snasa","snillfjord","snoasa","sogndal","sogne","sokndal","sola","solund","somna","sondre-land","songdalen","sor-aurdal","sor-fron","sor-odal","sor-varanger","sorfold","sorreisa","sortland","sorum","spjelkavik","spydeberg","st","stange","stat","stathelle","stavanger","stavern","steigen","steinkjer","stjordal","stjordalshalsen","stokke","stor-elvdal","stord","stordal","storfjord","strand","stranda","stryn","sula","suldal","sund","sunndal","surnadal","svalbard","sveio","svelvik","sykkylven","tana","tananger","time","tingvoll","tinn","tjeldsund","tjome","tm","tokke","tolga","tonsberg","torsken","tr","trana","tranby","tranoy","troandin","trogstad","tromsa","tromso","trondheim","trysil","tvedestrand","tydal","tynset","tysfjord","tysnes","tysvar","ullensaker","ullensvang","ulvik","unjarga","utsira","va","vaapste","vadso","vaga","vagan","vagsoy","vaksdal","valle","vang","vanylven","vardo","varggat","varoy","vefsn","vega","vegarshei","vennesla","verdal","verran","vestby","vestnes","vestre-slidre","vestre-toten","vestvagoy","vevelstad","vf","vgs","vik","vikna","vindafjord","voagat","volda","voss","vossevangen","xn--andy-ira","xn--asky-ira","xn--aurskog-hland-jnb","xn--avery-yua","xn--bdddj-mrabd","xn--bearalvhki-y4a","xn--berlevg-jxa","xn--bhcavuotna-s4a","xn--bhccavuotna-k7a","xn--bidr-5nac","xn--bievt-0qa","xn--bjarky-fya","xn--bjddar-pta","xn--blt-elab","xn--bmlo-gra","xn--bod-2na","xn--brnny-wuac","xn--brnnysund-m8ac","xn--brum-voa","xn--btsfjord-9za","xn--davvenjrga-y4a","xn--dnna-gra","xn--drbak-wua","xn--dyry-ira","xn--eveni-0qa01ga","xn--finny-yua","xn--fjord-lra","xn--fl-zia","xn--flor-jra","xn--frde-gra","xn--frna-woa","xn--frya-hra","xn--ggaviika-8ya47h","xn--gildeskl-g0a","xn--givuotna-8ya","xn--gjvik-wua","xn--gls-elac","xn--h-2fa","xn--hbmer-xqa","xn--hcesuolo-7ya35b","xn--hgebostad-g3a","xn--hmmrfeasta-s4ac","xn--hnefoss-q1a","xn--hobl-ira","xn--holtlen-hxa","xn--hpmir-xqa","xn--hyanger-q1a","xn--hylandet-54a","xn--indery-fya","xn--jlster-bya","xn--jrpeland-54a","xn--karmy-yua","xn--kfjord-iua","xn--klbu-woa","xn--koluokta-7ya57h","xn--krager-gya","xn--kranghke-b0a","xn--krdsherad-m8a","xn--krehamn-dxa","xn--krjohka-hwab49j","xn--ksnes-uua","xn--kvfjord-nxa","xn--kvitsy-fya","xn--kvnangen-k0a","xn--l-1fa","xn--laheadju-7ya","xn--langevg-jxa","xn--ldingen-q1a","xn--leagaviika-52b","xn--lesund-hua","xn--lgrd-poac","xn--lhppi-xqa","xn--linds-pra","xn--loabt-0qa","xn--lrdal-sra","xn--lrenskog-54a","xn--lt-liac","xn--lten-gra","xn--lury-ira","xn--mely-ira","xn--merker-kua","xn--mjndalen-64a","xn--mlatvuopmi-s4a","xn--mli-tla","xn--mlselv-iua","xn--moreke-jua","xn--mosjen-eya","xn--mot-tla","xn--msy-ula0h","xn--mtta-vrjjat-k7af","xn--muost-0qa","xn--nmesjevuemie-tcba","xn--nry-yla5g","xn--nttery-byae","xn--nvuotna-hwa","xn--oppegrd-ixa","xn--ostery-fya","xn--osyro-wua","xn--porsgu-sta26f","xn--rady-ira","xn--rdal-poa","xn--rde-ula","xn--rdy-0nab","xn--rennesy-v1a","xn--rhkkervju-01af","xn--rholt-mra","xn--risa-5na","xn--risr-ira","xn--rland-uua","xn--rlingen-mxa","xn--rmskog-bya","xn--rros-gra","xn--rskog-uua","xn--rst-0na","xn--rsta-fra","xn--ryken-vua","xn--ryrvik-bya","xn--s-1fa","xn--sandnessjen-ogb","xn--sandy-yua","xn--seral-lra","xn--sgne-gra","xn--skierv-uta","xn--skjervy-v1a","xn--skjk-soa","xn--sknit-yqa","xn--sknland-fxa","xn--slat-5na","xn--slt-elab","xn--smla-hra","xn--smna-gra","xn--snase-nra","xn--sndre-land-0cb","xn--snes-poa","xn--snsa-roa","xn--sr-aurdal-l8a","xn--sr-fron-q1a","xn--sr-odal-q1a","xn--sr-varanger-ggb","xn--srfold-bya","xn--srreisa-q1a","xn--srum-gra","xn--stjrdal-s1a","xn--stjrdalshalsen-sqb","xn--stre-toten-zcb","xn--tjme-hra","xn--tnsberg-q1a","xn--trany-yua","xn--trgstad-r1a","xn--trna-woa","xn--troms-zua","xn--tysvr-vra","xn--unjrga-rta","xn--vads-jra","xn--vard-jra","xn--vegrshei-c0a","xn--vestvgy-ixa6o","xn--vg-yiab","xn--vgan-qoa","xn--vgsy-qoa0j","xn--vre-eiker-k8a","xn--vrggt-xqad","xn--vry-yla5g","xn--yer-zna","xn--ygarden-p1a","xn--ystre-slidre-ujb"),
    lp_all_tlds.np = new Array("*","com","edu","gov","mil","net","org","ort"),
    lp_all_tlds.pe = new Array("blogspot","com","edu","gob","mil","net","nom","org"),
    lp_all_tlds.pf = new Array("com","edu","org"),
    lp_all_tlds.pg = new Array("*","com","net"),
    lp_all_tlds.ph = new Array("com","edu","gov","i","mil","net","ngo","org"),
    lp_all_tlds.ps = new Array("com","edu","gov","net","org","plo","sec"),
    lp_all_tlds.pt = new Array("blogspot","com","edu","gov","int","net","nome","org","publ"),
    lp_all_tlds.py = new Array("com","coop","edu","gov","mil","net","org"),
    lp_all_tlds.qc = new Array("com"),
    lp_all_tlds.sa = new Array("com","edu","gov","med","net","org","pub","sch"),
    lp_all_tlds.sb = new Array("com","edu","gov","net","org"),
    lp_all_tlds.sc = new Array("com","edu","gov","net","org"),
    lp_all_tlds.sd = new Array("com","edu","gov","info","med","net","org","tv"),
    lp_all_tlds.sg = new Array("blogspot","com","edu","gov","idn","net","org","per"),
    lp_all_tlds.sh = new Array("*.platform","com","edu","gov","hashbang","mil","net","now","org"),
    lp_all_tlds.sv = new Array("*","co","com","edu","gob","org","red"),
    lp_all_tlds.sy = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.tn = new Array("agrinet","com","defense","edunet","ens","fin","gov","ind","info","intl","mincom","nat","net","org","perso","rnrt","rns","rnu","tourism","turen"),
    lp_all_tlds.uy = new Array("blogspot.com","com","edu","gub","mil","net","org"),
    lp_all_tlds.vi = new Array("co","com","edu","gov","k12","net","org"),
    lp_all_tlds.ye = new Array("*","com","net"),
    lp_all_tlds.pro = new Array("aaa","aca","acct","avocat","bar","cloudns","cpa","eng","jur","law","med","recht"),
    lp_all_tlds.arpa = new Array("e164","in-addr","ip6","iris","uri","urn"),
    lp_all_tlds.int = new Array("eu"),
    lp_all_tlds.bf = new Array("gov"),
    lp_all_tlds.by = new Array("blogspot.com","com","gov","mil","of"),
    lp_all_tlds.cx = new Array("ath","gov"),
    lp_all_tlds.ie = new Array("blogspot","gov"),
    lp_all_tlds.it = new Array("abr","abruzzo","ag","agrigento","al","alessandria","alto-adige","altoadige","an","ancona","andria-barletta-trani","andria-trani-barletta","andriabarlettatrani","andriatranibarletta","ao","aosta","aosta-valley","aostavalley","aoste","ap","aq","aquila","ar","arezzo","ascoli-piceno","ascolipiceno","asti","at","av","avellino","ba","balsan","bari","barletta-trani-andria","barlettatraniandria","bas","basilicata","belluno","benevento","bergamo","bergamo ","bg","bi","biella","bl","blogspot","bn","bo","bologna","bolzano","bozen","br","brescia","brindisi","bs","bt","bz","ca","cagliari","cal","calabria","caltanissetta","cam","campania","campidano-medio","campidanomedio","campobasso","carbonia-iglesias","carboniaiglesias","carrara-massa","carraramassa","caserta","catania","catanzaro","cb","ce","cesena-forli","cesenaforli","ch","chieti","ci","cl","cn","co","como","cosenza","cr","cremona","crotone","cs","ct","cuneo","cz","dell-ogliastra","dellogliastra","edu","emilia-romagna","emiliaromagna","emr","en","enna","fc","fe","fermo","ferrara","fg","fi","firenze","florence","fm","foggia","forli-cesena","forlicesena","fr","friuli-v-giulia","friuli-ve-giulia","friuli-vegiulia","friuli-venezia-giulia","friuli-veneziagiulia","friuli-vgiulia","friuliv-giulia","friulive-giulia","friulivegiulia","friulivenezia-giulia","friuliveneziagiulia","friulivgiulia","frosinone","fvg","ge","genoa","genova","go","gorizia","gov","gr","grosseto","iglesias-carbonia","iglesiascarbonia","im","imperia","is","isernia","kr","la-spezia","laquila","laspezia","latina","laz","lazio","lc","le","lecce","lecco","li","lig","liguria","livorno","lo","lodi","lom","lombardia","lombardy","lt","lu","lucania","lucca","macerata","mantova","mar","marche","massa-carrara","massacarrara","matera","mb","mc","me","medio-campidano","mediocampidano","messina","mi","milan","milano","mn","mo","modena","mol","molise","monza","monza-brianza","monza-e-della-brianza","monzabrianza","monzaebrianza","monzaedellabrianza","ms","mt","na","naples","napoli","no","novara","nu","nuoro","og","ogliastra","olbia-tempio","olbiatempio","or","oristano","ot","pa","padova","padua","palermo","parma","pavia","pc","pd","pe","perugia","pesaro-urbino","pesarourbino","pescara","pg","pi","piacenza","piedmont","piemonte","pisa","pistoia","pmn","pn","po","pordenone","potenza","potenza ","pr","prato","pt","pu","pug","puglia","pv","pz","ra","ragusa","ravenna","rc","re","reggio-calabria","reggio-emilia","reggiocalabria","reggioemilia","rg","ri","rieti","rimini","rm","rn","ro","roma","rome","rovigo","sa","salerno","sar","sardegna","sardinia","sassari","savona","si","sic","sicilia","sicily","siena","siracusa","so","sondrio","sp","sr","ss","suedtirol","sv","ta","taa","taranto","te","tempio-olbia","tempioolbia","teramo","terni","tn","to","torino","tos","toscana","tp","tr","trani-andria-barletta","trani-barletta-andria","traniandriabarletta","tranibarlettaandria","trapani","trentino","trentino-a-adige","trentino-aadige","trentino-alto-adige","trentino-altoadige","trentino-s-tirol","trentino-stirol","trentino-sud-tirol","trentino-sudtirol","trentino-sued-tirol","trentino-suedtirol","trentinoa-adige","trentinoaadige","trentinoalto-adige","trentinoaltoadige","trentinos-tirol","trentinostirol","trentinosud-tirol","trentinosudtirol","trentinosued-tirol","trentinosuedtirol","trento","treviso","trieste","ts","turin","tuscany","tv","ud","udine","umb","umbria","urbino-pesaro","urbinopesaro","va","val-d-aosta","val-daosta","vald-aosta","valdaosta","valle-aosta","valle-d-aosta","valle-daosta","valleaosta","valled-aosta","valledaosta","vallee-aoste","valleeaoste","vao","varese","vb","vc","vda","ve","ven","veneto","venezia","venice","verbania","vercelli","verona","vi","vibo-valentia","vibovalentia","vicenza","viterbo","vr","vs","vt","vv"),
    lp_all_tlds.lt = new Array("blogspot","gov","mil"),
    lp_all_tlds.lu = new Array("blogspot","gov","mil","net","org"),
    lp_all_tlds.to = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.tp = new Array("gov"),
    lp_all_tlds.tv = new Array("better-than","dyndns","gov","on-the-web","worse-than"),
    lp_all_tlds.mobi = new Array("dscloud","music","weather"),
    lp_all_tlds.mh = new Array("net"),
    lp_all_tlds.ad = new Array("nom"),
    lp_all_tlds.sr = new Array("rs"),
    lp_all_tlds.va = new Array("vatican"),
    lp_all_tlds.aero = new Array("accident-investigation","accident-prevention","aerobatic","aeroclub","aerodrome","agents","air-surveillance","air-traffic-control","aircraft","airline","airport","airtraffic","ambulance","amusement","association","author","ballooning","broker","caa","cargo","catering","certification","championship","charter","civilaviation","club","conference","consultant","consulting","control","council","crew","design","dgca","educator","emergency","engine","engineer","entertainment","equipment","exchange","express","federation","flight","freight","fuel","gliding","government","groundhandling","group","hanggliding","homebuilt","insurance","journal","journalist","leasing","logistics","magazine","maintenance","marketplace","media","microlight","modelling","navigation","parachuting","paragliding","passenger-association","pilot","press","production","recreation","repbody","res","research","rotorcraft","safety","scientist","services","show","skydiving","software","student","taxi","trader","trading","trainer","union","workinggroup","works"),
    lp_all_tlds.as = new Array("gov"),
    lp_all_tlds.ba = new Array("blogspot","co","com","edu","gov","mil","net","org","rs","unbi","unsa"),
    lp_all_tlds.bg = new Array("0","1","2","3","4","5","6","7","8","9","a","b","blogspot","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"),
    lp_all_tlds.bh = new Array("com","edu","gov","net","org"),
    lp_all_tlds.bi = new Array("co","com","edu","or","org"),
    lp_all_tlds.bj = new Array("asso","barreau","blogspot","gouv"),
    lp_all_tlds.bz = new Array("com","edu","gov","net","org","za"),
    lp_all_tlds.ci = new Array("ac","asso","co","com","ed","edu","go","gouv","int","md","net","or","org","presse","xn--aroport-bya"),
    lp_all_tlds.cl = new Array("blogspot","co","gob","gov","mil"),
    lp_all_tlds.cm = new Array("co","com","gov","net"),
    lp_all_tlds.cw = new Array("com","edu","net","org"),
    lp_all_tlds.er = new Array("*"),
    lp_all_tlds.gy = new Array("co","com","edu","gov","net","org"),
    lp_all_tlds.io = new Array("*.stolos","apps.lair","customer.enonic","backplaneapp","boxfuse","browsersafetymark","com","dedyn","drud","enonic","github","gitlab","hasura-app","hzc","ngrok","nid","pantheon","pantheonsite","protonet","sandcats","shiftedit","spacekit"),
    lp_all_tlds.iq = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.ke = new Array("blogspot.co","co","or","ne","go","ac","sc","me","mobi","info"),
    lp_all_tlds.kg = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.ki = new Array("biz","com","edu","gov","info","net","org"),
    lp_all_tlds.km = new Array("ass","asso","com","coop","edu","gouv","gov","medecin","mil","nom","notaires","org","pharmaciens","prd","presse","tm","veterinaire"),
    lp_all_tlds.kn = new Array("edu","gov","net","org"),
    lp_all_tlds.kp = new Array("com","edu","gov","org","rep","tra"),
    lp_all_tlds.me = new Array("ac","brasilia","co","daplie","ddns","diskstation","dnsfor","dscloud","edu","gov","hopto","i234","its","loginto","myds","net","noip","org","priv","synology","webhop","yombo"),
    lp_all_tlds.ml = new Array("com","edu","gouv","gov","net","org","presse"),
    lp_all_tlds.mn = new Array("edu","gov","nyc","org"),
    lp_all_tlds.mr = new Array("blogspot","gov"),
    lp_all_tlds.museum = new Array("academy","agriculture","air","airguard","alabama","alaska","amber","ambulance","american","americana","americanantiques","americanart","amsterdam","and","annefrank","anthro","anthropology","antiques","aquarium","arboretum","archaeological","archaeology","architecture","art","artanddesign","artcenter","artdeco","arteducation","artgallery","arts","artsandcrafts","asmatart","assassination","assisi","association","astronomy","atlanta","austin","australia","automotive","aviation","axis","badajoz","baghdad","bahn","bale","baltimore","barcelona","baseball","basel","baths","bauern","beauxarts","beeldengeluid","bellevue","bergbau","berkeley","berlin","bern","bible","bilbao","bill","birdart","birthplace","bonn","boston","botanical","botanicalgarden","botanicgarden","botany","brandywinevalley","brasil","bristol","british","britishcolumbia","broadcast","brunel","brussel","brussels","bruxelles","building","burghof","bus","bushey","cadaques","california","cambridge","can","canada","capebreton","carrier","cartoonart","casadelamoneda","castle","castres","celtic","center","chattanooga","cheltenham","chesapeakebay","chicago","children","childrens","childrensgarden","chiropractic","chocolate","christiansburg","cincinnati","cinema","circus","civilisation","civilization","civilwar","clinton","clock","coal","coastaldefence","cody","coldwar","collection","colonialwilliamsburg","coloradoplateau","columbia","columbus","communication","communications","community","computer","computerhistory","contemporary","contemporaryart","convent","copenhagen","corporation","corvette","costume","countryestate","county","crafts","cranbrook","creation","cultural","culturalcenter","culture","cyber","cymru","dali","dallas","database","ddr","decorativearts","delaware","delmenhorst","denmark","depot","design","detroit","dinosaur","discovery","dolls","donostia","durham","eastafrica","eastcoast","education","educational","egyptian","eisenbahn","elburg","elvendrell","embroidery","encyclopedic","england","entomology","environment","environmentalconservation","epilepsy","essex","estate","ethnology","exeter","exhibition","family","farm","farmequipment","farmers","farmstead","field","figueres","filatelia","film","fineart","finearts","finland","flanders","florida","force","fortmissoula","fortworth","foundation","francaise","frankfurt","franziskaner","freemasonry","freiburg","fribourg","frog","fundacio","furniture","gallery","garden","gateway","geelvinck","gemological","geology","georgia","giessen","glas","glass","gorge","grandrapids","graz","guernsey","halloffame","hamburg","handson","harvestcelebration","hawaii","health","heimatunduhren","hellas","helsinki","hembygdsforbund","heritage","histoire","historical","historicalsociety","historichouses","historisch","historisches","history","historyofscience","horology","house","humanities","illustration","imageandsound","indian","indiana","indianapolis","indianmarket","intelligence","interactive","iraq","iron","isleofman","jamison","jefferson","jerusalem","jewelry","jewish","jewishart","jfk","journalism","judaica","judygarland","juedisches","juif","karate","karikatur","kids","koebenhavn","koeln","kunst","kunstsammlung","kunstunddesign","labor","labour","lajolla","lancashire","landes","lans","larsson","lewismiller","lincoln","linz","living","livinghistory","localhistory","london","losangeles","louvre","loyalist","lucerne","luxembourg","luzern","mad","madrid","mallorca","manchester","mansion","mansions","manx","marburg","maritime","maritimo","maryland","marylhurst","media","medical","medizinhistorisches","meeres","memorial","mesaverde","michigan","midatlantic","military","mill","miners","mining","minnesota","missile","missoula","modern","moma","money","monmouth","monticello","montreal","moscow","motorcycle","muenchen","muenster","mulhouse","muncie","museet","museumcenter","museumvereniging","music","national","nationalfirearms","nationalheritage","nativeamerican","naturalhistory","naturalhistorymuseum","naturalsciences","nature","naturhistorisches","natuurwetenschappen","naumburg","naval","nebraska","neues","newhampshire","newjersey","newmexico","newport","newspaper","newyork","niepce","norfolk","north","nrw","nuernberg","nuremberg","nyc","nyny","oceanographic","oceanographique","omaha","online","ontario","openair","oregon","oregontrail","otago","oxford","pacific","paderborn","palace","paleo","palmsprings","panama","paris","pasadena","pharmacy","philadelphia","philadelphiaarea","philately","phoenix","photography","pilots","pittsburgh","planetarium","plantation","plants","plaza","portal","portland","portlligat","posts-and-telecommunications","preservation","presidio","press","project","public","pubol","quebec","railroad","railway","research","resistance","riodejaneiro","rochester","rockart","roma","russia","saintlouis","salem","salvadordali","salzburg","sandiego","sanfrancisco","santabarbara","santacruz","santafe","saskatchewan","satx","savannahga","schlesisches","schoenbrunn","schokoladen","school","schweiz","science","science-fiction","scienceandhistory","scienceandindustry","sciencecenter","sciencecenters","sciencehistory","sciences","sciencesnaturelles","scotland","seaport","settlement","settlers","shell","sherbrooke","sibenik","silk","ski","skole","society","sologne","soundandvision","southcarolina","southwest","space","spy","square","stadt","stalbans","starnberg","state","stateofdelaware","station","steam","steiermark","stjohn","stockholm","stpetersburg","stuttgart","suisse","surgeonshall","surrey","svizzera","sweden","sydney","tank","tcm","technology","telekommunikation","television","texas","textile","theater","time","timekeeping","topology","torino","touch","town","transport","tree","trolley","trust","trustee","uhren","ulm","undersea","university","usa","usantiques","usarts","uscountryestate","usculture","usdecorativearts","usgarden","ushistory","ushuaia","uslivinghistory","utah","uvic","valley","vantaa","versailles","viking","village","virginia","virtual","virtuel","vlaanderen","volkenkunde","wales","wallonie","war","washingtondc","watch-and-clock","watchandclock","western","westfalen","whaling","wildlife","williamsburg","windmill","workshop","xn--9dbhblg6di","xn--comunicaes-v6a2o","xn--correios-e-telecomunicaes-ghc29a","xn--h1aegh","xn--lns-qla","york","yorkshire","yosemite","youth","zoological","zoology"),
    lp_all_tlds.mz = new Array("!teledata","*","ac","adv","co","edu","gov","mil","net","org"),
    lp_all_tlds.nf = new Array("arts","com","firm","info","net","other","per","rec","store","web"),
    lp_all_tlds.pn = new Array("co","edu","gov","net","org"),
    lp_all_tlds.pw = new Array("belau","cloudns","co","ed","go","ne","or"),
    lp_all_tlds.qa = new Array("blogspot","com","edu","gov","mil","name","net","org","sch"),
    lp_all_tlds.re = new Array("asso","blogspot","com","nom"),
    lp_all_tlds.rs = new Array("ac","blogspot","co","edu","gov","in","org"),
    lp_all_tlds.sl = new Array("com","edu","gov","net","org"),
    lp_all_tlds.sn = new Array("art","blogspot","com","edu","gouv","org","perso","univ"),
    lp_all_tlds.so = new Array("com","net","org"),
    lp_all_tlds.st = new Array("co","com","consulado","edu","embaixada","gov","mil","net","org","principe","saotome","store"),
    lp_all_tlds.sx = new Array("gov"),
    lp_all_tlds.sz = new Array("ac","co","org"),
    lp_all_tlds.tl = new Array("gov"),
    lp_all_tlds.tm = new Array("co","com","edu","gov","mil","net","nom","org"),
    lp_all_tlds.uz = new Array("co","com","net","org"),
    lp_all_tlds.vc = new Array("com","edu","gov","mil","net","org"),
    lp_all_tlds.ws = new Array("com","dyndns","edu","gov","mypets","net","org"),
    lp_all_tlds.net = new Array("a.prod.fastly","a.ssl.fastly","b.ssl.fastly","global.prod.fastly","global.ssl.fastly","*.alwaysdata","*.cryptonomic","r.cdn77","at-band-camp","azure-mobile","azurewebsites","blogdns","bounceme","broke-it","buyshouses","cdn77-ssl","cloudapp","cloudfront","cloudfunctions","ddns","dnsalias","dnsdojo","does-it","dontexist","dsmynas","dynalias","dynathome","dynv6","eating-organic","endofinternet","familyds","feste-ip","firewall-gateway","from-az","from-co","from-la","from-ny","gb","gets-it","ham-radio-op","homeftp","homeip","homelinux","homeunix","hu","in","in-the-band","is-a-chef","is-a-geek","isa-geek","jp","kicks-ass","knx-server","mydissent","myeffect","myfritz","mymediapc","mypsx","mysecuritycamera","nhlfan","no-ip","office-on-the","pgafan","podzone","privatizehealthinsurance","rackmaze","redirectme","scrapper-site","se","selfip","sells-it","servebbs","serveblog","serveftp","serveminecraft","static-access","sytes","taleo","thruhere","uk","webhop","za"),
    lp_all_tlds.com = new Array("*.api.githubcloud","*.cns.joyent","*.ext.githubcloud","ap-northeast-1.compute.amazonaws","ap-northeast-2.compute.amazonaws","ap-southeast-1.compute.amazonaws","ap-southeast-2.compute.amazonaws","eu-central-1.compute.amazonaws","eu-west-1.compute.amazonaws","s3.ap-northeast-2.amazonaws","s3.eu-central-1.amazonaws","sa-east-1.compute.amazonaws","us-gov-west-1.compute.amazonaws","us-west-1.compute.amazonaws","us-west-2.compute.amazonaws","z-1.compute-1.amazonaws","z-2.compute-1.amazonaws","*.0emm","*.githubcloudusercontent","alpha.bounty-full","apps.fbsbx","beta.bounty-full","compute-1.amazonaws","compute.amazonaws","elb.amazonaws","eu-1.evennode","eu-2.evennode","eu.meteorapp","gist.githubcloud","s3-ap-northeast-1.amazonaws","s3-ap-northeast-2.amazonaws","s3-ap-southeast-1.amazonaws","s3-ap-southeast-2.amazonaws","s3-eu-central-1.amazonaws","s3-eu-west-1.amazonaws","s3-external-1.amazonaws","s3-external-2.amazonaws","s3-fips-us-gov-west-1.amazonaws","s3-sa-east-1.amazonaws","s3-us-gov-west-1.amazonaws","s3-us-west-1.amazonaws","s3-us-west-2.amazonaws","s3-website-ap-northeast-1.amazonaws","s3-website-ap-southeast-1.amazonaws","s3-website-ap-southeast-2.amazonaws","s3-website-eu-west-1.amazonaws","s3-website-sa-east-1.amazonaws","s3-website-us-east-1.amazonaws","s3-website-us-gov-west-1.amazonaws","s3-website-us-west-1.amazonaws","s3-website-us-west-2.amazonaws","s3.amazonaws","us-1.evennode","us-2.evennode","us-east-1.amazonaws","xen.prgmr","1kapp","3utilities","4u","africa","alpha-myqnapcloud","appchizi","applinzi","appspot","ar","betainabox","blogdns","blogspot","blogsyte","bloxcms","bounty-full","br","cechire","ciscofreak","cloudcontrolapp","cloudcontrolled","cn","co","codespot","damnserver","ddnsking","de","dev-myqnapcloud","ditchyourip","dnsalias","dnsdojo","dnsiskinky","doesntexist","dontexist","doomdns","dreamhosters","dsmynas","dyn-o-saur","dynalias","dyndns-at-home","dyndns-at-work","dyndns-blog","dyndns-free","dyndns-home","dyndns-ip","dyndns-mail","dyndns-office","dyndns-pics","dyndns-remote","dyndns-server","dyndns-web","dyndns-wiki","dyndns-work","dynns","elasticbeanstalk","est-a-la-maison","est-a-la-masion","est-le-patron","est-mon-blogueur","eu","familyds","firebaseapp","firewall-gateway","flynnhub","freebox-os","freeboxos","from-ak","from-al","from-ar","from-ca","from-ct","from-dc","from-de","from-fl","from-ga","from-hi","from-ia","from-id","from-il","from-in","from-ks","from-ky","from-ma","from-md","from-mi","from-mn","from-mo","from-ms","from-mt","from-nc","from-nd","from-ne","from-nh","from-nj","from-nm","from-nv","from-oh","from-ok","from-or","from-pa","from-pr","from-ri","from-sc","from-sd","from-tn","from-tx","from-ut","from-va","from-vt","from-wa","from-wi","from-wv","from-wy","gb","geekgalaxy","getmyip","githubcloud","githubusercontent","googleapis","googlecode","gotdns","gotpantheon","gr","health-carereform","herokuapp","herokussl","hk","hobby-site","homelinux","homesecuritymac","homesecuritypc","homeunix","hu","iamallama","is-a-anarchist","is-a-blogger","is-a-bookkeeper","is-a-bulls-fan","is-a-caterer","is-a-chef","is-a-conservative","is-a-cpa","is-a-cubicle-slave","is-a-democrat","is-a-designer","is-a-doctor","is-a-financialadvisor","is-a-geek","is-a-green","is-a-guru","is-a-hard-worker","is-a-hunter","is-a-landscaper","is-a-lawyer","is-a-liberal","is-a-libertarian","is-a-llama","is-a-musician","is-a-nascarfan","is-a-nurse","is-a-painter","is-a-personaltrainer","is-a-photographer","is-a-player","is-a-republican","is-a-rockstar","is-a-socialist","is-a-student","is-a-teacher","is-a-techie","is-a-therapist","is-an-accountant","is-an-actor","is-an-actress","is-an-anarchist","is-an-artist","is-an-engineer","is-an-entertainer","is-certified","is-gone","is-into-anime","is-into-cars","is-into-cartoons","is-into-games","is-leet","is-not-certified","is-slick","is-uberleet","is-with-theband","isa-geek","isa-hockeynut","issmarterthanyou","jpn","kr","likes-pie","likescandy","logoip","meteorapp","mex","myactivedirectory","myasustor","mydrobo","myqnapcloud","mysecuritycamera","myshopblocks","myvnc","neat-url","net-freaks","nfshost","no","on-aptible","onthewifi","operaunite","outsystemscloud","ownprovider","pagefrontapp","pagespeedmobilizer","pgfog","point2this","publishproxy","qa2","qc","quicksytes","rackmaze","rhcloud","ro","ru","sa","saves-the-whales","se","securitytactics","selfip","sells-for-less","sells-for-u","servebbs","servebeer","servecounterstrike","serveexchange","serveftp","servegame","servehalflife","servehttp","servehumour","serveirc","servemp3","servep2p","servepics","servequake","servesarcasm","simple-url","sinaapp","space-to-rent","stufftoread","teaches-yoga","townnews-staging","uk","unusualperson","us","uy","vipsinaapp","withgoogle","withyoutube","workisboring","writesthisblog","xenapponazure","yolasite","za"),
    lp_all_tlds.org = new Array("ssl.origin.cdn77-secure","al.eu","asso.eu","at.eu","au.eu","be.eu","bg.eu","c.cdn77","ca.eu","cd.eu","ch.eu","cn.eu","cy.eu","cz.eu","de.eu","dk.eu","edu.eu","ee.eu","es.eu","fi.eu","fr.eu","go.dyndns","gr.eu","home.dyndns","hr.eu","hu.eu","ie.eu","il.eu","in.eu","int.eu","is.eu","it.eu","jp.eu","kr.eu","lt.eu","lu.eu","lv.eu","mc.eu","me.eu","mk.eu","mt.eu","my.eu","net.eu","ng.eu","nl.eu","no.eu","nz.eu","paris.eu","pl.eu","pt.eu","q-a.eu","ro.eu","rsc.cdn77","ru.eu","se.eu","si.eu","sk.eu","tr.eu","uk.eu","us.eu","ae","blogdns","blogsite","bmoattachments","boldlygoingnowhere","cable-modem","certmgr","cloudns","collegefan","couchpotatofries","ddnss","dnsalias","dnsdojo","doesntexist","dontexist","doomdns","dsmynas","duckdns","dvrdns","dynalias","dyndns","endofinternet","endoftheinternet","eu","familyds","from-me","game-host","gotdns","hepforge","hk","hobby-site","homedns","homeftp","homelinux","homeunix","hopto","is-a-bruinsfan","is-a-candidate","is-a-celticsfan","is-a-chef","is-a-geek","is-a-knight","is-a-linux-user","is-a-patsfan","is-a-soxfan","is-found","is-lost","is-saved","is-very-bad","is-very-evil","is-very-good","is-very-nice","is-very-sweet","isa-geek","js","kicks-ass","misconfused","mlbfan","my-firewall","myfirewall","myftp","mysecuritycamera","nflfan","no-ip","pimienta","podzone","poivron","potager","read-books","readmyblog","selfip","sellsyourhome","servebbs","serveftp","servegame","spdns","stuff-4-sale","sweetpepper","tunk","tuxfamily","ufcfan","us","webhop","wmflabs","za","zapto"),
    lp_all_tlds.de = new Array("dyn.cosidns","dyn.ddnss","dyn.home-webserver","dyndns.ddnss","blogspot","com","ddnss","dnshome","dnsupdater","dyn-ip24","dynamisches-dns","dyndns1","firewall-gateway","fuettertdasnetz","goip","home-webserver","internet-dns","isteingeek","istmein","keymachine","l-o-g-i-n","lebtimnetz","leitungsen","logoip","my-gateway","my-router","myhome-server","spdns","taifun-dns","traeumtgerade"),
    lp_all_tlds.biz = new Array("cloudns","dscloud","dyndns","for-better","for-more","for-some","for-the","mmafan","myftp","no-ip","selfip","webhop"),
    lp_all_tlds.info = new Array("barrel-of-knowledge","barrell-of-knowledge","cloudns","dvrcam","dynamic-dns","dyndns","for-our","groks-the","groks-this","here-for-more","ilovecollege","knowsitall","no-ip","nsupdate","selfip","webhop"),
    lp_all_tlds.cc = new Array("cloudns","fantasyleague","ftpaccess","game-server","myphotos","scrapping"),
    lp_all_tlds.nu = new Array("merseine","mine","shacknet"),
    lp_all_tlds.cf = new Array("blogspot"),
    lp_all_tlds.cv = new Array("blogspot"),
    lp_all_tlds.cz = new Array("blogspot","co","e4","realm"),
    lp_all_tlds.dk = new Array("biz","blogspot","co","firm","reg","store"),
    lp_all_tlds.sk = new Array("blogspot"),
    lp_all_tlds.td = new Array("blogspot"),
    lp_all_tlds.ms = new Array("com","edu","gov","net","org"),
    lp_all_tlds.vu = new Array("com","edu","net","org"),
    lp_all_tlds["xn--90a3ac"] = new Array("xn--80au","xn--90azh","xn--c1avg","xn--d1at","xn--o1ac","xn--o1ach"),
    lp_all_tlds.su = new Array("adygeya","arkhangelsk","balashov","bashkiria","bryansk","dagestan","grozny","ivanovo","kalmykia","kaluga","karelia","khakassia","krasnodar","kurgan","lenug","mordovia","msk","murmansk","nalchik","nov","obninsk","penza","pokrovsk","sochi","spb","togliatti","troitsk","tula","tuva","vladikavkaz","vladimir","vologda"),
    lp_all_tlds.name = new Array("forgot.her","forgot.his"),
    lp_all_tlds.gl = new Array("co","com","edu","net","org"),
    lp_all_tlds.am = new Array("blogspot"),
    lp_all_tlds.md = new Array("blogspot"),
    lp_all_tlds.si = new Array("blogspot"),
    lp_all_tlds.link = new Array("cyon","mypep"),
    lp_all_tlds.site = new Array("cyon"),
    lp_all_tlds.estate = new Array("*.compute"),
    lp_all_tlds.network = new Array("*.alces"),
    lp_all_tlds.management = new Array("router"),
    lp_all_tlds.ovh = new Array("nerdpol"),
    lp_all_tlds.cloud = new Array("*.magentosite","*.statics","myfusion"),
    lp_all_tlds.xyz = new Array("fhapp"),
    lp_all_tlds.land = new Array("dev.static","sites.static","static"),
    lp_all_tlds.space = new Array("stackspace"),
    lp_all_tlds.zone = new Array("*.triton"),
    lp_all_tlds.krd = new Array("co","edu"),
    lp_all_tlds.systems = new Array("knightpoint"),
    lp_all_tlds.hosting = new Array("opencraft"),
    lp_all_tlds.fit = new Array("ptplus"),
    lp_all_tlds.asia = new Array("cloudns"),
    lp_all_tlds.club = new Array("cloudns"),
    lp_all_tlds.faith = new Array("ybo"),
    lp_all_tlds.one = new Array("homelink"),
    lp_all_tlds.party = new Array("ybo"),
    lp_all_tlds.review = new Array("ybo"),
    lp_all_tlds.science = new Array("ybo"),
    lp_all_tlds.trade = new Array("ybo"),
    lp_all_tlds.edu = new Array("*"),
    lp_all_tlds.gov = new Array("*"))
}
var lpParseUriCache = new Array
  , lpParseUriNumber = 0;
function lpParseUri(e) {
    if ("string" != typeof e)
        return "";
    if (null != lpParseUriCache[e])
        return lpParseUriCache[e];
    var t = e
      , n = e.substring(0, 8).toLowerCase();
    0 !== n.indexOf("http://") && 0 !== n.indexOf("https://") && 0 !== n.indexOf("ftp://") && (e = "https://" + e);
    var r = {};
    try {
        var o;
        if ("function" == typeof URL)
            "object" == typeof (o = new URL(e)) && "string" == typeof o.href && void 0 !== o.hostname && (r.host = o.hostname)
    } catch (e) {}
    var i = lpParseUri_old(e);
    if (void 0 !== r.host && void 0 !== i.host && r.host.toLowerCase() != i.host.toLowerCase())
        return "";
    var a = i;
    if (void 0 !== a.host && (a.host = fix_url_host(a.host)),
    500 < lpParseUriNumber) {
        for (var o in lpParseUriCache) {
            delete lpParseUriCache[o];
            break
        }
        lpParseUriNumber = 0
    }
    return lpParseUriCache[t] = a,
    lpParseUriNumber++,
    a
}
function lpParseUri_old(t) {
    var e = null
      , n = null;
    for (-1 != t.indexOf("#") && (n = t.substring(t.indexOf("#") + 1),
    t = t.substring(0, t.indexOf("#"))),
    -1 != t.indexOf("?") && (e = t.substring(t.indexOf("?") + 1),
    t = t.substring(0, t.indexOf("?"))); ; ) {
        var r = t.match(/^(.*:\/\/[^\/]+\/.*)@/);
        if (!r)
            break;
        t = t.substring(0, r[1].length) + t.substring(r[1].length).replace(/@/g, "%40")
    }
    if (2047 < t.length)
        return "";
    var o = lpParseUri.options
      , i = null;
    try {
        i = o.parser[o.strictMode ? "strict" : "loose"].exec(t)
    } catch (e) {
        try {
            i = 500 < t.length ? o.parser[o.strictMode ? "strict" : "loose"].exec(t.substr(0, 500)) : o.parser[o.strictMode ? "strict" : "loose"].exec(t.substr(0, floor(t.length / 2)))
        } catch (e) {
            lpReportError("parseuri : failing " + t),
            i = o.parser[o.strictMode ? "strict" : "loose"].exec("http://")
        }
    }
    for (var a = i, s = {}, l = 14; l--; )
        s[o.key[l]] = a[l] || "";
    return s[o.q.name] = {},
    s[o.key[12]].replace(o.q.parser, function(e, t, n) {
        t && (s[o.q.name][t] = n)
    }),
    null != e && (s.query = e,
    null != n && (s.anchor = n)),
    s
}
lpParseUri.options = {
    strictMode: !1,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};
var lpCanUrlCache = new Array
  , lpCanUrlExNumber = 0;
function lpcanonizeUrl(e, t) {
    if ("about:blank" == e)
        return "";
    if (null != lpCanUrlCache[e])
        return lpCanUrlCache[e];
    null == t && (t = lpParseUri(e));
    var n = "", r;
    if ("" != t.port && t.port != get_default_port(t.protocol) && (n = ":" + t.port),
    t.host)
        r = t.host.toLowerCase() + n + t.path;
    else {
        if (!e)
            return "";
        r = e
    }
    if (-1 != r.indexOf(";") && (r = r.substring(0, r.indexOf(";"))),
    500 < lpCanUrlExNumber) {
        for (var o in lpCanUrlCache) {
            delete lpCanUrlCache[o];
            break
        }
        lpCanUrlExNumber = 0
    }
    return lpCanUrlCache[e] = r,
    lpCanUrlExNumber++,
    r
}
function lp_gettld(e, t) {
    if (void 0 !== lp_all_tlds && null != lp_all_tlds || lp_init_tlds(),
    "string" != typeof e)
        return "";
    if ("" == e && "string" == typeof t && 0 == t.indexOf("file://"))
        return "file:";
    var n = "";
    "." == (e = e.toLowerCase()).substr(-1) && (n = ".");
    var r = (e = e.replace(/\.$/, "")).split("."), o;
    if (e.match(/^\d+\.\d+\.\d+\.\d+$/))
        o = 4;
    else if (o = 2,
    3 <= r.length) {
        var i = r[r.length - 1];
        if (void 0 !== lp_all_tlds[i]) {
            var a = r[r.length - 2];
            3 <= r.length && lp_in_array(r[r.length - 3] + "." + a, lp_all_tlds[i]) ? o = 4 : lp_in_array(a, lp_all_tlds[i]) && (o = 3)
        }
    }
    for (; r.length > o; )
        r.shift();
    var s = r.join(".");
    return s += n
}
function lp_gettld_url(e) {
    var t, n;
    return lp_gettld(lpParseUri(e).host, e)
}
function getname_url(e) {
    var t = lpParseUri(punycode.URLToUnicode(e)), n;
    return ("string" == typeof t.host ? t.host : "").replace(/^www\./, "")
}
function lptrim(e) {
    return "string" != typeof e ? e : e.replace(/^\s+|\s+$/g, "")
}
function lp_regexp_quote(e) {
    return (e + "").replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1")
}
function getactiontld(e) {
    return void 0 === e || null == e || void 0 === e.action ? "" : 0 == e.action.indexOf("javascript:") ? "" : lp_gettld_url(punycode.URLToASCII(e.action))
}
function getname(e, t) {
    if (t && void 0 !== e.id && "" != e.id)
        return e.id;
    if (void 0 !== e && null != e) {
        if (void 0 !== e.name && "" != e.name)
            return e.name;
        if (void 0 !== e.id)
            return e.id
    }
    return ""
}
function lpIsVisible(e, t) {
    if (e && "INPUT" == e.tagName && "hidden" == e.type)
        return !1;
    for (; e && "BODY" != e.tagName; e = e.parentNode) {
        if (void 0 !== e.style && ("hidden" == e.style.visibility || "none" == e.style.display))
            return !1;
        try {
            var n = e.ownerDocument.defaultView.getComputedStyle(e, "");
            if ("hidden" == n.visibility || "none" == n.display)
                return !1
        } catch (e) {}
        if (t)
            return !0
    }
    return !0
}
function lp_in_array(e, t) {
    if (null == t)
        return !1;
    for (var n = t.length, r = 0; r <= n; r++)
        if (void 0 !== t[r] && t[r] == e)
            return lpArrayOffset = r,
            !0;
    return !1
}
function strip(e) {
    if (!e.length)
        return e;
    var t = (e = (e = (e = e.replace(/\s+/g, " ")).replace(/^\s+|\s+$/g, "")).replace(/[\|]+$/g, "")).match(/\|([^\|]+)$/);
    return t && (e = (e = t[1]).replace(/^\s+|\s+$/g, "")),
    e
}
function lpxmlescape(e) {
    var t;
    return null == e ? "" : ("number" == typeof e && (e = "" + e),
    t = (t = (t = (t = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;")).replace(/"/g, "&quot;"))
}
function lpxmlunescape(e) {
    var t;
    return null == e ? "" : ("number" == typeof e && (e = "" + e),
    t = (t = (t = (t = e.replace(/&lt;/g, "<")).replace(/&gt;/g, ">")).replace(/&quot;/g, '"')).replace(/&amp;/g, "&"))
}
var lpRegExCache = new Array
  , lpRegExNumber = 0;
function regexp_match_c(e, t) {
    var n = e.toString() + "_" + t;
    if (80 < n.length && ("function" == typeof fasthash ? n = fasthash(n) : "function" == typeof SHA256 && (n = SHA256(n))),
    null != lpRegExCache[n])
        return "1" == lpRegExCache[n];
    var r = e.exec(t);
    if (2500 < lpRegExNumber) {
        for (var o in lpRegExCache) {
            delete lpRegExCache[o];
            break
        }
        lpRegExNumber = 0
    }
    return lpRegExCache[n] = r ? "1" : "0",
    lpRegExNumber++,
    r
}
function fire_onchange(e, t, n) {
    try {
        if (e) {
            if (e.ownerDocument && "function" == typeof e.ownerDocument.createEvent) {
                var r = e.ownerDocument.createEvent("Events");
                if (r.initEvent("change", !0, !0),
                e.dispatchEvent(r),
                (r = e.ownerDocument.createEvent("Events")).initEvent("input", !0, !0),
                e.dispatchEvent(r),
                void 0 !== ischrome && ischrome && "function" == typeof e.onkeyup) {
                    n && (r.keyCode = 8);
                    var o = r;
                    e.onkeyup(r)
                }
            } else
                void 0 !== e.fireEvent && (e.fireEvent("onchange"),
                e.fireEvent("oninput"));
            if (void 0 !== t && null != t && !t || "function" != typeof sendKey || sendKey("SHIFT", e),
            "function" == typeof lpGetBrowserForDocument) {
                var i = lpGetBrowserForDocument(e.ownerDocument);
                i && (i.lpfieldchanged = !0)
            }
        }
    } catch (e) {}
}
function get_default_port(e) {
    switch (e) {
    case "http":
        return 80;
    case "https":
        return 443;
    case "ftp":
        return 21;
    default:
        return 0
    }
}
function get_port(e) {
    var t = 0;
    return void 0 !== e.port && e.port ? t = e.port : void 0 !== e.protocol && e.protocol && (t = get_default_port(e.protocol)),
    t
}
function compare_ports(e, t) {
    var n, r;
    return ("" != e.port ? e.port : get_default_port(e.protocol)) == ("" != t.port ? t.port : get_default_port(t.protocol))
}
function array_size(e) {
    var t = e.length ? --e.length : -1;
    for (var n in e)
        t++;
    return t
}
function lpgetlocalts() {
    return (new Date).getTime()
}
function lp_get_gmt_timestamp() {
    var e, t = (new Date).getTime(), n;
    return parseInt(t / 1e3)
}
function lp_get_local_timestamp() {
    return lp_get_gmt_timestamp()
}
function checkurlrules(e, t, n, r, o, i, a) {
    if (0 == t.length)
        return t;
    for (var s = [], l = [], c = 0; c < e.length; c++)
        if (void 0 === e[c].tld && (e[c].tld = lp_gettld_url(e[c].url),
        e[c].parts = lpParseUri(e[c].url),
        e[c].path = "string" == typeof e[c].parts.path ? e[c].parts.path : ""),
        n == e[c].tld) {
            var u = r, p;
            if (void 0 !== e[c].case_insensitive && "1" == e[c].case_insensitive && (u = u.toLowerCase()),
            "" != e[c].path && 0 != u.indexOf(e[c].path))
                l[l.length] = e[c];
            else
                o == e[c].parts.host || 1 == e[c].exacthost && -1 != o.indexOf("." + e[c].parts.host) || 0 == e[c].exacthost ? s[s.length] = e[c] : l[l.length] = e[c]
        }
    if (0 == s.length && 0 == l.length)
        return t;
    if (0 < s.length) {
        for (var d = t, c = 0; c < s.length; c++) {
            var g = applyurlrule(t, s[c], r, o, a, i);
            g.length < d.length && (d = g)
        }
        return d
    }
    for (var c = 0; c < l.length; c++)
        removeurlrule(t, l[c], i, o, a);
    return t
}
function applyurlrule(e, t, n, r, o, i) {
    var a = void 0 !== t.case_insensitive && "1" == t.case_insensitive;
    a && (n = n.toLowerCase());
    var s = t.path;
    if ("" != s && 0 != n.indexOf(s))
        return e;
    for (var l, c = s.split("/").length, u = [], p = !1, d = 0; d < e.length; d++) {
        var g = e[d]
          , f = g.pathlevelmatch
          , m = g.servermatch
          , h = g.portmatch;
        if (void 0 === f || a) {
            var x = n.split("/"), _ = void 0 !== g.url ? g.url : i[g.id].url, _;
            a && (_ = _.toLowerCase()),
            (_ = lpParseUri(_)).path = void 0 !== _.path ? _.path : "";
            var v = _.path.split("/"), y;
            for (y = 0; y < x.length && y < v.length && v[y] == x[y]; y++)
                ;
            f = y,
            m = r == _.host,
            h = o == get_port(_)
        }
        "" != s && f < c || (p = !(!p && 1 != t.exacthost && 1 != t.exactport),
        !m && 0 != t.exacthost || !h && 0 != t.exactport || (p = !0,
        u[u.length] = e[d]))
    }
    return p ? u : e
}
function removeurlrule(e, t, n, r, o) {
    for (var i = void 0 !== t.case_insensitive && "1" == t.case_insensitive, a = t.path, s = 0; s < e.length; s++) {
        var l = void 0 !== e[s].id ? e[s].id : e[s].aid;
        if (void 0 !== n[l]) {
            var c, u = n[l].url, u;
            i && (u = u.toLowerCase()),
            (u = lpParseUri(u)).path = void 0 !== u.path ? u.path : "",
            "" != a && 0 != u.path.indexOf(a) || "0" != t.exacthost && t.parts.host != u.host || "0" != t.exactport && get_port(t.parts) != get_port(u) || (e.splice(s, 1),
            s -= 1)
        }
    }
}
function lpcreaterandomhexstring(e) {
    for (var t = "0123456789ABCDEF", n = "", r = 0; r < e; r++) {
        var o = get_random(0, t.length - 1);
        n += t.substring(o, o + 1)
    }
    return n
}
function iso2to3(e) {
    var t = {
        AD: "AND",
        AE: "ARE",
        AF: "AFG",
        AG: "ATG",
        AL: "ALB",
        AM: "ARM",
        AO: "AGO",
        AQ: "ATA",
        AR: "ARG",
        AT: "AUT",
        AU: "AUS",
        AW: "ABW",
        AZ: "AZE",
        BA: "BIH",
        BB: "BRB",
        BD: "BGD",
        BE: "BEL",
        BF: "BFA",
        BG: "BGR",
        BH: "BHR",
        BI: "BDI",
        BJ: "BEN",
        BM: "BMU",
        BN: "BRN",
        BO: "BOL",
        BR: "BRA",
        BS: "BHS",
        BT: "BTN",
        BW: "BWA",
        BY: "BLR",
        BZ: "BLZ",
        CA: "CAN",
        CD: "COD",
        CF: "CAF",
        CG: "COG",
        CH: "CHE",
        CI: "CIV",
        CL: "CHL",
        CM: "CMR",
        CN: "CHN",
        CO: "COL",
        CR: "CRI",
        CU: "CUB",
        CV: "CPV",
        CY: "CYP",
        CZ: "CZE",
        DE: "DEU",
        DJ: "DJI",
        DK: "DNK",
        DM: "DMA",
        DO: "DOM",
        DZ: "DZA",
        EC: "ECU",
        EE: "EST",
        EG: "EGY",
        EH: "ESH",
        ER: "ERI",
        ES: "ESP",
        ET: "ETH",
        FI: "FIN",
        FJ: "FJI",
        FM: "FSM",
        FO: "FRO",
        FR: "FRA",
        GA: "GAB",
        GB: "GBR",
        GD: "GRD",
        GE: "GEO",
        GF: "GUF",
        GH: "GHA",
        GM: "GMB",
        GN: "GIN",
        GP: "GLP",
        GQ: "GNQ",
        GR: "GRC",
        GT: "GTM",
        GW: "GNB",
        GY: "GUY",
        HN: "HND",
        HR: "HRV",
        HT: "HTI",
        HU: "HUN",
        IC: "ESC",
        ID: "IDN",
        IE: "IRL",
        IL: "ISR",
        IN: "IND",
        IO: "IOT",
        IQ: "IRQ",
        IR: "IRN",
        IS: "ISL",
        IT: "ITA",
        JE: "JEY",
        JM: "JAM",
        JO: "JOR",
        JP: "JPN",
        KE: "KEN",
        KG: "KGZ",
        KH: "KHM",
        KI: "KIR",
        KM: "COM",
        KN: "KNA",
        KP: "PRK",
        KR: "KOR",
        KW: "KWT",
        KZ: "KAZ",
        LA: "LAO",
        LB: "LBN",
        LC: "LCA",
        LI: "LIE",
        LK: "LKA",
        LR: "LBR",
        LS: "LSO",
        LT: "LTU",
        LU: "LUX",
        LV: "LVA",
        LY: "LBY",
        MA: "MAR",
        MC: "MCO",
        MD: "MDA",
        ME: "MNE",
        MG: "MDG",
        MK: "MKD",
        ML: "MLI",
        MM: "MMR",
        MN: "MNG",
        MO: "MAC",
        MQ: "MTQ",
        MR: "MRT",
        MS: "MSR",
        MU: "MUS",
        MV: "MDV",
        MW: "MWI",
        MX: "MEX",
        MY: "MYS",
        MZ: "MOZ",
        NA: "NAM",
        NE: "NER",
        NG: "NGA",
        NI: "NIC",
        NL: "NLD",
        NO: "NOR",
        NP: "NPL",
        NZ: "NZL",
        OM: "OMN",
        PA: "PAN",
        PE: "PER",
        PG: "PNG",
        PH: "PHL",
        PK: "PAK",
        PL: "POL",
        PS: "PSE",
        PT: "PRT",
        PW: "PLW",
        PY: "PRY",
        QA: "QAT",
        RE: "REU",
        RO: "ROU",
        RS: "SRB",
        RU: "RUS",
        RW: "RWA",
        SA: "SAU",
        SB: "SLB",
        SC: "SYC",
        SD: "SDN",
        SE: "SWE",
        SH: "SHN",
        SI: "SVN",
        SK: "SVK",
        SL: "SLE",
        SM: "SMR",
        SN: "SEN",
        SO: "SOM",
        SR: "SUR",
        ST: "STP",
        SV: "SLV",
        SY: "SYR",
        SZ: "SWZ",
        TD: "TCD",
        TF: "ATF",
        TG: "TGO",
        TH: "THA",
        TJ: "TJK",
        TL: "TLS",
        TM: "TKM",
        TN: "TUN",
        TR: "TUR",
        TT: "TTO",
        TW: "TWN",
        TZ: "TZA",
        UA: "UKR",
        UG: "UGA",
        US: "USA",
        UY: "URY",
        UZ: "UZB",
        VC: "VCT",
        VE: "VEN",
        VN: "VNM",
        VU: "VUT",
        YE: "YEM",
        ZA: "ZAF",
        ZM: "ZMB",
        ZW: "ZWE"
    };
    return void 0 !== t[e] ? t[e] : e
}
function crypto_atob(e) {
    if (e && 17 <= e.length && "!" == e.charAt(0)) {
        var t = e.indexOf("|");
        if (-1 != t)
            return "!" + atob(e.substring(1, t)) + atob(e.substring(t + 1))
    }
    return atob(e)
}
function crypto_btoa(e) {
    return e && 33 <= e.length && e.length % 16 == 1 && "!" == e.charAt(0) ? "!" + btoa(e.substring(1, 17)) + "|" + btoa(e.substring(17)) : btoa(e)
}
function CompareLastPassVersions(e, t, n) {
    for (var r = 0, o = 0, i = 0, a = 0, s = 0, l = 0, c = e.split("."), u = 0; u < c.length; u++)
        0 == u ? r = parseInt(c[u]) : 1 == u ? o = parseInt(c[u]) : 2 == u && (i = parseInt(c[u]));
    for (var p = t.split("."), u = 0; u < p.length; u++)
        0 == u ? a = parseInt(p[u]) : 1 == u ? s = parseInt(p[u]) : 2 == u && (l = parseInt(p[u]));
    return r != a ? a < r ? 1 : -1 : o != s ? s < o ? 1 : -1 : n ? 0 : i != l ? l < i ? 1 : -1 : 0
}
function lpalert(e, t) {
    "undefined" != typeof LP && "function" == typeof LP.lpgs ? LP.alert(LP.lpgs(e), t) : "function" == typeof alertfrombg ? alertfrombg(gs(e)) : alert(gs(e))
}
function issharedfolder(e, t) {
    if (!e || 0 == e.length || void 0 === t || null == t)
        return !1;
    var n = t;
    if (0 < n.indexOf("\\") && (n = n.substr(0, n.indexOf("\\"))),
    "" == n)
        return !1;
    for (var r in e) {
        var o = e[r];
        if ("object" == typeof o && void 0 !== o.decsharename) {
            var i = "0";
            if (void 0 !== o.linkedshare && "1" == o.linkedshare && (i = "1"),
            o.decsharename == n)
                return {
                    id: o.id,
                    sharekey: o.key,
                    decsharename: o.decsharename,
                    readonly: o.readonly,
                    give: o.give,
                    associative: o.associative,
                    linkedshare: i
                }
        }
    }
    return !1
}
function getsharekey(e, t) {
    for (var n = 0; void 0 !== e && null != e && n < e.length; n++) {
        var r = e[n];
        if (r.id == t)
            return r.key
    }
    return null
}
function lpmenc_acct(e, t, n, r) {
    if (void 0 === n.sharefolderid)
        return lpmenc(e, t);
    var o = issharedfolder(r, n.group);
    return o ? lpmenc(e, t, o.sharekey) : lpmenc(e, t)
}
function lpmdec_acct(e, t, n, r) {
    if (void 0 === n.sharefolderid)
        return lpmdec(e, t);
    var o = issharedfolder(r, n.group);
    return o ? lpmdec(e, t, o.sharekey) : lpmdec(e, t)
}
function lpdec_acct(e, t, n) {
    if (void 0 === t.sharefolderid)
        return lpdec(e);
    var r = issharedfolder(n, t.group);
    return r ? lpdec(e, r.sharekey) : lpdec(e)
}
function lpenc_acct(e, t, n) {
    if (void 0 === t.sharefolderid)
        return lpenc(e);
    var r = issharedfolder(n, t.group);
    return r ? lpenc(e, r.sharekey) : lpenc(e)
}
function checkmove(e, t, n) {
    return !(t && !checkreadonly(t, !1, n))
}
function checkreadonly(e, t, n) {
    return !e || "1" != e.readonly || (t || lpalert("Sorry, this shared folder is read-only.", n),
    !1)
}
function checkUsernameHash() {
    if (null == lpusername_hash || "" == lpusername_hash) {
        var e = null;
        "string" == typeof g_username && "" != g_username ? e = g_username : "string" == typeof lpusername && "" != lpusername && (e = lpusername),
        null != e && ("function" == typeof SHA256 ? lpusername_hash = SHA256(e) : "function" == typeof lp_sha256 && (lpusername_hash = lp_sha256(e)))
    }
}
function applyattacharraychanges(e) {
    if (void 0 !== e.add)
        for (var t in e.add)
            if (e.add.hasOwnProperty(t)) {
                var n = {};
                n.id = e.add[t].id,
                n.parent = e.add[t].parent,
                n.mimetype = e.add[t].mimetype,
                n.filename = e.add[t].filename,
                n.size = e.add[t].size,
                n.storagekey = e.add[t].storagekey,
                lp_attaches.push(n)
            }
    if (void 0 !== e.remove)
        for (var t in e.remove)
            for (var r = 0; r < lp_attaches.length; r++)
                e.remove[t] == lp_attaches[r].id && lp_attaches.splice(r, 1)
}
function rollbackattacharrayadds(e) {
    if (void 0 !== e.add)
        for (var t in e.add)
            if (e.add.hasOwnProperty(t))
                for (var n = 0; n < lp_attaches.length; n++)
                    if (lp_attaches[n].id == e.add[t].id) {
                        lp_attaches.splice(n, 1);
                        break
                    }
}
function is_encrypted_field(e) {
    return "text" == e || "password" == e || "textarea" == e || "email" == e || "tel" == e || "url" == e
}
function clear_filled_fields(e, t, n) {
    if (void 0 === n && (n = 1),
    10 < n)
        return null;
    if (e && "object" == typeof e.lp_filled_fields) {
        for (var r = 0; r < e.lp_filled_fields.length; r++) {
            var o = e.lp_filled_fields[r].value;
            (e.lp_filled_fields[r].value = "") != o && fire_onchange(e.lp_filled_fields[r])
        }
        e.lp_filled_fields = new Array
    }
    if (e && "object" == typeof e.formfillfields) {
        var i = e.formfillfields;
        for (var a in i) {
            var s = i[a].field
              , o = s.value;
            (s.value = "") != o && fire_onchange(s)
        }
        e.formfillfields = new Array
    }
    if (t && t.frames) {
        var l = t.frames.length;
        10 < l && (l = 10);
        for (var r = 0; r < l; r++)
            t.frames[r].document && clear_filled_fields(t.frames[r].document, t.frames[r].window, n + 1)
    }
}
function get_sitepwlen(e) {
    return "undefined" != typeof LP && void 0 !== LP.sitepwlen && void 0 !== LP.sitepwlen[e] ? LP.sitepwlen[e] : "undefined" != typeof g_sitepwlen && void 0 !== g_sitepwlen[e] ? g_sitepwlen[e] : "undefined" == typeof calllptoolband ? 1 : parseInt(calllptoolband(["getsitepwlens", e]));
    var t
}
function fix_url_host(e) {
    if ("string" == typeof e) {
        var t, t;
        if (27 < e.length && -1 != e.indexOf("logmein.com", e.length - 11))
            if (t = e.match(/^(.*)-[a-z]{10}(\.app).*(\.logmein\.com)$/))
                return t[1] + t[2] + t[3];
        if (24 < e.length && -1 != e.indexOf("logme.in", e.length - 8))
            if (t = e.match(/^(.*)-[a-z]{10}(\.app).*(\.logme\.in)$/))
                return t[1] + t[2] + t[3]
    }
    return e
}
function is_watermark(e) {
    return !1
}
function is_watermark_password(e) {
    return !1
}
function updateAndEncryptData(e, t, n, r, o, i) {
    for (var a = "", s = null, l = "undefined" == typeof g_shares ? lpshares : g_shares, c = void 0 !== e ? e.split("\n") : new Array, u = 0; u < c.length; u++) {
        var p, d = c[u].split("\t");
        if (4 == d.length || 5 == d.length) {
            var g = "0"
              , f = decodeURIComponent(d[1])
              , m = decodeURIComponent(d[2])
              , h = d[3]
              , x = !1
              , _ = m
              , v = !1;
            if (s = null,
            "select-one" != h || "temp_id" != f && "userId-select" != f || "" == m || m != i.username || "fidelity.com" != r.tld || void 0 === i.fromiframe || "" == i.new_username || (h = "text"),
            "email" == h || "tel" == h || "text" == h || "password" == h || "hidden" == h || "textarea" == h || "url" == h)
                n && n.push(m),
                i ? "email" != h && "tel" != h && "text" != h && "url" != h || m != i.username || "" === m && (void 0 === i.fromiframe || "" == i.new_username) ? "password" == h && m == i.password && ("" !== m || void 0 !== i.fromiframe && "" != i.new_password) && (s = lpenc_acct(i.new_password, r, l)) : s = lpenc_acct(i.new_username, r, l) : s = void 0 !== r.username && "" != r.username && m == lpmdec_acct(r.username, !0, r, l) ? crypto_btoa(r.username) : void 0 !== r.password && "" != r.password && m == lpmdec_acct(r.password, !0, r, l) ? crypto_btoa(r.password) : lpenc_acct(m, r, l),
                null == s ? "function" == typeof verbose_log && verbose_log("updateAndEncryptData ERROR: field=" + f) : a += "0\t" + LP.en(f) + "\t" + LP.en(s) + "\t" + LP.en(h) + "\n",
                "hidden" != h && null != s && (x = !0,
                _ = crypto_atob(s));
            else if ("action" == h)
                a += "0\taction\t" + LP.en(m) + "\taction\n";
            else if ("method" == h)
                a += "0\tmethod\t" + LP.en(m) + "\tmethod\n";
            else {
                if (i && 0 === i.save_all)
                    continue;
                a += "0\t" + LP.en(f) + "\t" + LP.en(m) + "\t" + LP.en(h) + "\n",
                "radio" == h || "checkbox" == h ? (v = "-1" == m.substring(m.length - 2),
                "radio" == h && !v || (x = !0,
                _ = m.substring(0, m.length - 2))) : "select-one" == h && (x = !0)
            }
            if (x) {
                var y = {
                    otherfield: !1
                };
                y.name = f,
                y.type = h,
                y.value = _,
                y.checked = v,
                y.formname = "",
                y.urid = "0",
                y.otherlogin = "0",
                y.url = "",
                t[t.length] = y
            }
        }
    }
    return a
}
function lp_ofa(e) {
    return ofa.apply(this, arguments)
}
function lp_of(e) {
    return of.apply(this, arguments)
}
function lp_ofja(e) {
    return ofja.apply(this, arguments)
}
function lp_es(e) {
    return es.apply(this, arguments)
}
function fill_field_via_keys(e, t) {
    e.value = "",
    e.focus();
    for (var n = 0; n < t.length; n++)
        send_simulated_key(e, t.charCodeAt(n), 0, !1)
}
function LP_decimate_children(e) {
    if (!e)
        return !1;
    try {
        for (; e.firstChild; )
            e.removeChild(e.firstChild)
    } catch (e) {
        return !1
    }
    return !0
}
function csv_encode(e) {
    return "string" != typeof e ? "" : (e.match(/^[=+-]/) && !e.match(/^[=+-][0-9.]+$/) && (e = " " + e),
    e.match(/,|\r|\n|"/) && (e = '"' + e.replace(/"/g, '""') + '"'),
    e)
}
function parse_emailaddress(e) {
    var t, n, r = {
        username: "",
        hostname: ""
    };
    return e && "string" == typeof e && (0 === (e = e.trim()).indexOf("@") ? r.hostname = e.substring(1) : 0 < e.indexOf("@") ? (t = e.substring(0, e.lastIndexOf("@")),
    n = e.substring(e.lastIndexOf("@") + 1),
    r.username = t,
    r.hostname = n) : r.username = e),
    r
}
function is_equivalent_email(e, t, n, r) {
    if (!(e && t && n && r))
        return !1;
    var o = function() {
        return !1
    };
    "undefined" != typeof compare_tlds && (o = compare_tlds),
    "undefined" != typeof compare_equiv_domains && (o = compare_equiv_domains),
    "undefined" != typeof LP_compare_tlds && (o = LP_compare_tlds);
    var i = lp_gettld_url(n)
      , a = lp_gettld_url(r);
    if (!o(i, a))
        return !1;
    var s = parse_emailaddress(e)
      , l = parse_emailaddress(t);
    if ("" === s.hostname && "" === l.hostname)
        return s.username === l.username;
    if (s.username === l.username && !l.hostname) {
        if (o(i, "gmail.com") && o(s.hostname, "gmail.com") && o(a, "gmail.com"))
            return !0;
        if (o(i, "yahoo.com") && o(s.hostname, "yahoo.com") && o(a, "yahoo.com"))
            return !0
    }
    return !!(s.username === l.username && s.hostname && l.hostname && o(i, a) && o(s.hostname, a) && o(l.hostname, a))
}
function verify_accts_integrity(e, t, n, r, o, i, a, s) {
    var l = {
        total: 0,
        corrupted: 0,
        corruptionRatio: 0,
        corruptedAids: [],
        corruptedIids: [],
        corruptedShareIds: []
    };
    if (void 0 !== e && e && lpmdec(e) !== t) {
        var c = "Vault integrity check failed. Username could not be decrypted using current local key. Uid: " + s;
        return lpReportError(c),
        void console.error(c)
    }
    var u = Object.keys(n).map(function(e) {
        return n[e]
    })
      , p = Object.keys(r).map(function(e) {
        return r[e]
    })
      , d = Object.keys(o).map(function(e) {
        return o[e]
    })
      , g = [].concat(u, p, d)
      , f = {
        encgroup: "group",
        encname: "name"
    };
    if (l.total += g.length,
    l.total += Object.keys(i).length,
    g.forEach(function(n) {
        var r = !1, e, t;
        Object.keys(f).forEach(function(e) {
            var t = f[e];
            n[e] && n[e].length && (n[t] && n[t].length || (r = !0))
        }),
        !n.username || n.unencryptedUsername || lpmdec_acct(n.username, !0, n, a) || (r = !0),
        n.password && n.password.length && (lpmdec_acct(n.password, !0, n, a) || (r = !0));
        n.extra && n.extra.length && (lpmdec_acct(n.extra, !0, n, a).length || (r = !0));
        r && (l.corrupted++,
        l.corruptedAids.push(n.aid))
    }),
    Object.keys(i).map(function(e) {
        return i[e]
    }).forEach(function(e) {
        e.iname && ("string" == typeof e.deciname && e.deciname.length || lpmdec(e.iname) || (l.corrupted++,
        l.corruptedIids.push(e.iid)))
    }),
    Object.keys(a).map(function(e) {
        return a[e]
    }).forEach(function(e) {
        if (e.sharename) {
            var t = AES.hex2bin(lpmdec(e.sharekeyaes, !0)), n;
            lpmdec(e.sharename, !1, t) || (l.corrupted++,
            l.corruptedShareIds.push(e.shareid))
        }
    }),
    0 < l.total && 0 < l.corrupted) {
        l.corruptionRatio = Math.round(l.corrupted / l.total * 100) / 100;
        var m = JSON.stringify(l.corruptedAids)
          , h = JSON.stringify(l.corruptedIids)
          , x = JSON.stringify(l.corruptedShareIds)
          , c = "Vault integrity check failed. " + l.corrupted + " items were corrupted out of " + l.total + ". Ratio: " + l.corruptionRatio + ". Corrupted aids: " + m + ", corrupted iids: " + h + ", corrupted shareids: " + x + " uid: " + s;
        lpReportError(c),
        console.error(c)
    }
    return l
}
function getusernamefromacct(e) {
    if (void 0 === e || !e)
        return "";
    var t = getBG();
    if (is_application(e)) {
        for (var n in e.fields) {
            var r = e.fields[n];
            if ("" == r.type && "" != r.value)
                return t.lpmdec_acct(r.value, !0, e, t.g_shares)
        }
        return ""
    }
    if (e.save_all) {
        for (var o in e.fields)
            if (("text" == e.fields[o].type || "email" == e.fields[o].type || "tel" == e.fields[o].type) && "" != e.fields[o].value)
                return t.lpmdec_acct(e.fields[o].value, !0, e, t.g_shares);
        return ""
    }
    if (void 0 !== e.url && "http://sn" == e.url) {
        var i = t.lpmdec_acct(e.extra, !0, e, t.g_shares)
          , a = getNoteValue("NoteType", i);
        if (void 0 !== sntemplates[a] && void 0 !== sntemplates[a].Username)
            return getNoteValue("Username", i)
    }
    var s = void 0 !== e.unencryptedUsername ? e.unencryptedUsername : "";
    if ("" != s)
        return s;
    if ("object" == typeof e.fields)
        try {
            for (var o = 0; o < e.fields.length; o++)
                if ("text" == e.fields[o].type || "email" == e.fields[o].type)
                    return s = e.fields[o].value,
                    t.lpmdec_acct(s, !0, e, t.g_shares)
        } catch (e) {}
    return ""
}
function getpasswordfromacct(e) {
    if (void 0 === e || !e)
        return "";
    var t = getBG();
    if (is_application(e)) {
        for (var n in e.fields) {
            var r = e.fields[n];
            if ("password" == r.type && "" != r.value)
                return t.lpmdec_acct(r.value, !0, e, t.g_shares)
        }
        return ""
    }
    if (e.save_all) {
        for (var o in e.fields)
            if ("password" == e.fields[o].type && "" != e.fields[o].value)
                return t.lpmdec_acct(e.fields[o].value, !0, e, t.g_shares);
        return ""
    }
    if (void 0 !== e.url && "http://sn" == e.url) {
        var i = t.lpmdec_acct(e.extra, !0, e, t.g_shares)
          , a = getNoteValue("NoteType", i);
        if (void 0 !== sntemplates[a] && void 0 !== sntemplates[a].Password)
            return getNoteValue("Password", i)
    }
    var s = void 0 !== e.password ? e.password : "";
    if ("" == s && "object" == typeof e.fields)
        try {
            for (var o = 0; o < e.fields.length; o++)
                if ("password" == e.fields[o].type) {
                    s = e.fields[o].value;
                    break
                }
        } catch (e) {}
    return t.lpmdec_acct(s, !0, e, t.g_shares)
}
function reencryptShareeAutoPushes(e, t, n) {
    var r = ["name", "group", "username", "password", "extra"]
      , o = {}
      , i = !0;
    for (var a in r) {
        var s = r[a];
        if (null != t[s]) {
            if (o[s] = lpdec(t[s], e),
            "" != t[s] && (null == o[s] || "" == o[s])) {
                lpReportError("lprsa_acceptshareeautopushes : failing id=" + t.id + " because we failed to decrypt : " + s + "=" + t[s]),
                i = !1;
                break
            }
            var l = lpenc(o[s]);
            if ("" != o[s] && (null == l || "" == l)) {
                lpReportError("lprsa_acceptshareeautopushes : failing aid=" + n + " id=" + t.id + " because we failed to reencrypt : " + s),
                i = !1;
                break
            }
            o[s] = l
        }
    }
    if (!i)
        return null;
    for (var c in t.fields) {
        var u = t.fields[c];
        if ("email" == u.type || "tel" == u.type || "text" == u.type || "password" == u.type || "textarea" == u.type || "hidden" == u.type) {
            var p = u.value
              , d = lpdec(p, e);
            if ("" != p && (null == d || "" == d)) {
                lpReportError("lprsa_acceptshareeautopushes : failing aid=" + n + " id=" + t.id + " because we failed to decrypt field" + c + "=" + p),
                i = !1;
                break
            }
            var g = lpenc(d);
            if ("" != d && (null == g || "" == g)) {
                lpReportError("lprsa_acceptshareeautopushes : failing aid=" + n + " id=" + t.id + " because we failed to reencrypt field" + c + "=" + d),
                i = !1;
                break
            }
            t.fields[c].value = g
        }
    }
    if (!i)
        return null;
    for (var c in t.otherfields) {
        var f = t.otherfields[c];
        if ("email" == f.type || "tel" == f.type || "text" == f.type || "password" == f.type || "textarea" == f.type || "hidden" == f.type) {
            var p = f.value
              , d = lpdec(p, e);
            if ("" != p && (null == d || "" == d)) {
                lpReportError("lprsa_acceptshareeautopushes : failing aid=" + n + " id=" + t.id + " because we failed to decrypt otherfield" + c + "=" + p),
                i = !1;
                break
            }
            var g = lpenc(d);
            if ("" != d && (null == g || "" == g)) {
                lpReportError("lprsa_acceptshareeautopushes : failing aid=" + n + " id=" + t.id + " because we failed to reencrypt otherfield" + c + "=" + d),
                i = !1;
                break
            }
            t.otherfields[c].value = g
        }
    }
    if (!i)
        return null;
    var m = {};
    for (var h in t)
        if ("fields" == h)
            for (var c in m.numf = t.fields.length,
            t.fields)
                m["f" + c + "urid"] = t.fields[c].urid,
                m["f" + c + "name"] = t.fields[c].name,
                m["f" + c + "value"] = t.fields[c].value,
                m["f" + c + "type"] = t.fields[c].type;
        else if ("otherfields" == h)
            for (var c in m.numof = t.otherfields.length,
            t.otherfields)
                m["of" + c + "urid"] = t.otherfields[c].urid,
                m["of" + c + "name"] = t.otherfields[c].name,
                m["of" + c + "value"] = t.otherfields[c].value,
                m["of" + c + "type"] = t.otherfields[c].type,
                m["of" + c + "formname"] = t.otherfields[c].formname;
        else
            "sharekeyhexenc" != h && null != t[h] && (m[h] = void 0 !== o[h] ? o[h] : t[h]);
    return m
}
function createShareeAutoPushesResponse(e, t, n) {
    lpdbg("sharing", "createShareeAutoPushesResponse started");
    var r = e.responseXML.documentElement
      , o = r.getElementsByTagName("sharerpublickeys")
      , i = r.getElementsByTagName("shareepublickeys")
      , a = r.getElementsByTagName("encfields")
      , s = r.getElementsByTagName("encofields");
    if (o.length <= 0 && i.length <= 0)
        return lpdbg("sharing", "createShareeAutoPushesResponse ERROR A"),
        !1;
    var l = t.aid
      , c = t.postdata
      , u = void 0 === t.newvalues ? [] : t.newvalues;
    if (void 0 === n || null == n)
        return lpdbg("sharing", "createShareeAutoPushesResponse ERROR B"),
        lpReportError("SHARE : createShareeAutoPushesResponse failed for aid=" + l, null),
        !1;
    var p = {}
      , d = a[0].getElementsByTagName("encfield");
    lpdbg("sharing", "Received encfields numfields=" + d.length),
    c += "&numencf=" + LP.en(d.length);
    for (var g = 0; g < d.length; ++g) {
        var f = d[g].getAttribute("afid")
          , m = d[g].getAttribute("value");
        p[f] = m
    }
    var h = {}
      , x = s[0].getElementsByTagName("encofield");
    lpdbg("sharing", "Received encofields numofields=" + x.length),
    c += "&numencof=" + LP.en(x.length);
    for (var g = 0; g < x.length; ++g) {
        var f = x[g].getAttribute("afid")
          , m = x[g].getAttribute("value");
        h[f] = m
    }
    for (c += "&numvalueenc=" + LP.en(u.length),
    P = 0; P < u.length; ++P) {
        var _ = lpenc(u[P]);
        c += "&valueenc" + P + "=" + LP.en(_)
    }
    if (0 < i.length) {
        var v = i[0].getElementsByTagName("sharee");
        c += "&numsharees=" + LP.en(v.length),
        lpdbg("sharing", "Received sharee publickeys numsharees=" + v.length);
        for (var g = 0; g < v.length; ++g) {
            var y = v[g].getAttribute("uid"), w = v[g].getAttribute("key"), b = lpcreaterandomhexstring(64), A = lp_hex2bin(b), k;
            if (0 == (k = lprsa_encryptdata(w, b)))
                return lpdbg("sharing", "createShareeAutoPushesResponse ERROR C"),
                lpReportError("SHARE : lprsa_encryptdata failed for shareeuid=" + y + " using shareepublickeyhex=" + w, null),
                !1;
            c += "&sharee" + g + "uid=" + LP.en(y),
            c += "&sharee" + g + "sharekeyhexenc=" + LP.en(k);
            var C = {
                name: n.name,
                grouping: n.group,
                username: "undefined" != typeof g_sites ? lpmdec(n.username, !0) : lpdec(n.username),
                password: "undefined" != typeof g_sites ? lpmdec(n.password, !0) : lpdec(n.password),
                extra: "undefined" != typeof g_sites ? lpmdec(n.extra, !0) : lpdec(n.extra)
            };
            for (var S in C) {
                var E = lpenc(C[S], A);
                if ("" != C[S] && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR D"),
                    lpReportError("SHARE : error AES encrypting aid=" + l + " for shareeuid=" + y, null),
                    !1;
                c += "&sharee" + g + S + "=" + LP.en(E)
            }
            var P = 0;
            for (var f in p) {
                var m = lpdec(p[f])
                  , E = lpenc(m, A);
                if ("" != m && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR E"),
                    lpReportError("SHARE : error AES encrypting field afid=" + f + " aid=" + l + " for shareeuid=" + y, null),
                    !1;
                c += "&sharee" + g + "fafid" + P + "=" + LP.en(f),
                c += "&sharee" + g + "fvalue" + P + "=" + LP.en(E),
                ++P
            }
            var P = 0;
            for (var f in h) {
                var m = lpdec(h[f])
                  , E = lpenc(m, A);
                if ("" != m && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR F"),
                    lpReportError("SHARE : error AES encrypting otherfield afid=" + f + " aid=" + l + " for shareeuid=" + y, null),
                    !1;
                c += "&sharee" + g + "ofafid" + P + "=" + LP.en(f),
                c += "&sharee" + g + "ofvalue" + P + "=" + LP.en(E),
                ++P
            }
            for (P = 0; P < u.length; ++P) {
                var m = u[P]
                  , E = lpenc(m, A);
                if ("" != m && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR G"),
                    lpReportError("SHARE : error AES encrypting newvalues k=" + P + " aid=" + l + " for shareeuid=" + y, null),
                    !1;
                c += "&sharee" + g + "valueenc" + P + "=" + LP.en(E)
            }
        }
    }
    if (0 < o.length) {
        var L = o[0].getElementsByTagName("sharer");
        c += "&numsharers=" + LP.en(L.length),
        lpdbg("sharing", "Received sharer publickeys numsharers=" + L.length);
        for (var g = 0; g < L.length; ++g) {
            var T = L[g].getAttribute("uid"), B = L[g].getAttribute("key"), b = lpcreaterandomhexstring(64), A = lp_hex2bin(b), k;
            if (0 == (k = lprsa_encryptdata(B, b)))
                return lpdbg("sharing", "createShareeAutoPushesResponse ERROR H"),
                lpReportError("SHARE : lprsa_encryptdata failed for shareruid=" + T + " using sharerpublickeyhex=" + B, null),
                !1;
            c += "&sharer" + g + "uid=" + LP.en(T),
            c += "&sharer" + g + "sharekeyhexenc=" + LP.en(k);
            var C = {
                name: n.name,
                grouping: n.group,
                username: "undefined" != typeof g_sites ? lpmdec(n.username, !0) : lpdec(n.username),
                password: "undefined" != typeof g_sites ? lpmdec(n.password, !0) : lpdec(n.password),
                extra: "undefined" != typeof g_sites ? lpmdec(n.extra, !0) : lpdec(n.extra)
            };
            for (var S in C) {
                var E = lpenc(C[S], A);
                if ("" != C[S] && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR I"),
                    lpReportError("SHARE : error AES encrypting aid=" + l + " for shareruid=" + T, null),
                    !1;
                c += "&sharer" + g + S + "=" + LP.en(E)
            }
            var P = 0;
            for (var f in p) {
                var m = lpdec(p[f])
                  , E = lpenc(m, A);
                if ("" != m && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR J"),
                    lpReportError("SHARE : error AES encrypting field afid=" + f + " aid=" + l + " for shareruid=" + T, null),
                    !1;
                c += "&sharer" + g + "fafid" + P + "=" + LP.en(f),
                c += "&sharer" + g + "fvalue" + P + "=" + LP.en(E),
                ++P
            }
            var P = 0;
            for (var f in h) {
                var m = lpdec(h[f])
                  , E = lpenc(m, A);
                if ("" != m && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR K"),
                    lpReportError("SHARE : error AES encrypting otherfield afid=" + f + " aid=" + l + " for shareruid=" + T, null),
                    !1;
                c += "&sharer" + g + "ofafid" + P + "=" + LP.en(f),
                c += "&sharer" + g + "ofvalue" + P + "=" + LP.en(E),
                ++P
            }
            for (P = 0; P < u.length; ++P) {
                var m = u[P]
                  , E = lpenc(m, A);
                if ("" != m && (null == E || "" == E))
                    return lpdbg("sharing", "createShareeAutoPushesResponse ERROR L"),
                    lpReportError("SHARE : error AES encrypting newvalues k=" + P + " aid=" + l + " for shareruid=" + T, null),
                    !1;
                c += "&sharer" + g + "valueenc" + P + "=" + LP.en(E)
            }
        }
    }
    return lpdbg("sharing", "createShareeAutoPushesResponse ending"),
    c
}
function parseAutoPushMobile(e, t) {
    for (var n = 0; null != e && n < e.length; n++) {
        var r = new lpshareeautopushinfo;
        r.fields = [],
        r.otherfields = [];
        var o = !0
          , i = ["id", "aid", "sharekeyhexenc", "name", "group", "username", "password", "extra", "url", "rurl", "fav", "never_autofill", "pwprotect", "basic_auth", "autologin", "last_touch", "last_modified", "urid", "last_pw_change", "numf", "numof", "favico", "nexturid", "method", "is_http", "manual"];
        for (var a in i)
            if (void 0 !== e[n][i[a]])
                r[i[a]] = e[n][i[a]];
            else {
                if ("id" == i[a] || "aid" == i[a] || "sharekeyhexenc" == i[a]) {
                    lpReportError("SHARE: shareeautopushes : error missing required arg=" + i[a], null),
                    o = !1;
                    break
                }
                r[i[a]] = null
            }
        if (o) {
            for (var s = null != r.numf ? r.numf : 0, a = 0; a < s; ++a) {
                var l = {};
                l.urid = e[n]["f" + a + "urid"],
                l.name = e[n]["f" + a + "name"],
                l.value = e[n]["f" + a + "value"],
                l.type = e[n]["f" + a + "type"],
                r.fields.push(l)
            }
            for (var c = null != r.numof ? r.numof : 0, a = 0; a < c; ++a) {
                var u = {};
                u.urid = e[n]["of" + a + "urid"],
                u.name = e[n]["of" + a + "name"],
                u.value = e[n]["of" + a + "value"],
                u.type = e[n]["of" + a + "type"],
                u.formname = e[n]["of" + a + "formname"],
                r.otherfields.push(u)
            }
            void 0 === t[r.aid] && (t[r.aid] = []),
            t[r.aid].push(r)
        }
    }
}
function handle_pending_pushed_sites(e, t, n) {
    if (void 0 === LP.ppsids_done && (LP.ppsids_done = new Array),
    "undefined" == typeof JSON && "undefined" != typeof LP && (JSON = LP.JSON),
    "object" == typeof e && 0 < e.length) {
        for (var r = "cmd=uploadaccounts&username=" + LP.en(lpusername), o = 0, i = 0; i < e.length; i++) {
            var a = e[i].ppsid;
            if (!lp_in_array(a, LP.ppsids_done)) {
                LP.ppsids_done.push(a);
                var s = "&ppsid" + LP.en(o) + "=" + LP.en(a)
                  , l = JSON.parse(atob(e[i].data))
                  , c = !1;
                for (var u in l)
                    if ("object" == typeof l[u] && void 0 !== l[u].value && void 0 !== l[u].encrypt) {
                        var p = u
                          , d = p.indexOf("X");
                        if (-1 != d) {
                            p = p.substring(0, d) + o + p.substring(d + 1);
                            var g = l[u].value;
                            if (void 0 !== l[u].decrypt && 0 != l[u].decrypt) {
                                if (c = !0,
                                n)
                                    for (var f = 0; f < n.length; f++)
                                        if (n[f].id == l[u].decrypt) {
                                            c = !1,
                                            g = lpdec(g, n[f].key);
                                            break
                                        }
                                if (c)
                                    break
                            }
                            l[u].encrypt && (g = lpenc(g)),
                            s += "&" + LP.en(p) + "=" + LP.en(g)
                        }
                    }
                c || (r += s,
                o++)
            }
        }
        if (0 < o) {
            var m = "string" == typeof base_url ? base_url : LP.lp_base;
            LP.lpMakeRequest(m + "lastpass/api.php", r, t, function() {})
        }
    }
}
function lpmakerequesterror(e, r, t, n, o) {
    lpisconnected = !1;
    var i = "SK:requestfailed";
    if (i += "\n  url         : " + r.url,
    i += "\n  reason      : " + e,
    i += "\n  isqueueable : " + (t ? "yes" : "no"),
    void 0 !== n && n && n.target && n.target.status && (i += "\n  status      : " + n.target.status,
    n.target.responseText && (i += "\n  response    : " + n.target.responseText)),
    t)
        return lplog(i += "\n  action      : appending to queue"),
        void lpretryinsert(r);
    if (i += "\n  action      : dropping request since it is not queueable",
    "invalidresponse" == e || "onerror" == e || "exception" == e || "objectcreation" == e) {
        if ("object" == typeof o && 429 == o.status)
            return void console.log("Throttled request -- ignore error notification");
        var a = r.url, s, l;
        ["loglogin.php", "logformfill.php", "error.php", "prof.php", "getappdata.php", "poll_server.php", "httptest.php", "geticon.php", "logout.php", "uploadsuperkeys.php", "getattach.php", "lastpass/api.php"].some(function(e) {
            var t = -1 < a.indexOf(e), n;
            t && "lastpass/api.php" === e && (t = -1 < r.params.indexOf("cmd=lpimprove"));
            return t
        }) || (lpdbg("error", "lpmakerequesterror showing error bar notification to user : reason=" + e + " url=" + a + " isqueueable=" + t),
        lpshowError("ErrorSendingMsg"))
    }
}
function compare_accounts_versions(e, t) {
    return !!LPISLOC || parseInt(e) === parseInt(t)
}
function parse_query_string(e) {
    var t = new Array;
    if ("string" == typeof e && "" != e)
        for (var n = e.split("&"), r = 0; r < n.length; r++) {
            var o = n[r].split("=");
            t[o[0]] = 2 <= o.length ? decodeURIComponent(o[1]) : ""
        }
    return t
}
function format_query_params(e) {
    var t = [];
    for (var n in e)
        e.hasOwnProperty(n) && t.push(n + "=" + encodeURIComponent(e[n]));
    return t.join("&")
}
function get_new_id() {
    return ++lpmaxid
}
function lpMakeRequestLoc(e, t, n, r, o, i) {
    if ("undefined" == typeof JSON && "undefined" != typeof LP && (JSON = LP.JSON),
    "function" == typeof n) {
        var a, s = (a = "undefined" != typeof document ? document : LP.getBrowser().contentDocument).implementation.createDocument("", "x", null), l, c = null, u = parse_query_string(t), p;
        if (-1 != e.indexOf("change_pw.php")) {
            (l = s.createElement("ok")).setAttribute("newpassword", u.password);
            for (var d = ""; void 0 !== u["id" + d]; ) {
                var g = u["id" + d], f;
                l.setAttribute("id" + d, g),
                f = "undefined" != typeof g_sites && void 0 !== g_sites[g] ? crypto_btoa(g_sites[g].password) : void 0 !== lpaccts && void 0 !== lpaccts[g] ? lpaccts[g].password : "",
                l.setAttribute("oldpassword" + d, f),
                "" == d ? d = 1 : d++
            }
        } else if (-1 != e.indexOf("deliver_and_add.php") || -1 != e.indexOf("show.php") && "1" != u.delete) {
            var m = null;
            void 0 !== u.url ? m = u.url : void 0 !== u.ref && (m = u.ref);
            var h = "", x = "", _ = "", v, g, y;
            if (m) {
                var w = lp_gettld_url(AES.hex2url(m));
                if (w)
                    try {
                        (rfdefaults = rfdefaults || JSON.parse(lp_hex2bin(lpReadFile("rfdefaults")))) && void 0 !== rfdefaults[w] && (h = rfdefaults[w].submit_id,
                        x = rfdefaults[w].captcha_id,
                        _ = rfdefaults[w].custom_js)
                    } catch (e) {}
            }
            l = s.createElement("result"),
            g = 1 == u.replacing ? (v = "accountreplaced",
            u.aid) : void 0 !== u.aid && "0" != u.aid ? (v = "accountupdated",
            u.aid) : (v = "accountadded",
            get_new_id()),
            l.setAttribute("msg", v),
            l.setAttribute("aid", g),
            y = -1 != e.indexOf("deliver_and_add.php") ? get_new_id() : "undefined" != typeof g_sites && void 0 !== g_sites[g] ? g_sites[g].urid : void 0 !== lpaccts && void 0 !== lpaccts[g] ? lpaccts[g].urid : "0",
            l.setAttribute("urid", y),
            l.setAttribute("submit_id", h),
            l.setAttribute("captcha_id", x),
            l.setAttribute("custom_js", _)
        } else if (-1 != e.indexOf("fields.php"))
            l = s.createElement("result");
        else if (-1 != e.indexOf("formfill.php") && -1 == e.indexOf("logformfill.php")) {
            var v, b;
            l = s.createElement("result"),
            b = "1" == u.deleteext ? (v = "ffdeleted",
            u.ffid) : "0" == u.ffid ? (v = "ffadded",
            get_new_id()) : (v = "ffupdated",
            u.ffid),
            l.setAttribute("msg", v),
            l.setAttribute("ffid", b);
            for (var A = "", k = "", C = 1; void 0 !== u["customfield" + C + "cfid"]; C++)
                "0" == u["customfield" + C + "cfid"] && (A += k + get_new_id(),
                k = ",");
            l.setAttribute("cfids", A)
        } else if (-1 != e.indexOf("gm_deliver.php"))
            (l = s.createElement("ok")).setAttribute("urid", get_new_id());
        else if (-1 != e.indexOf("groups.php"))
            l = s.createElement("ok");
        else if (-1 != e.indexOf("save_gen_pw.php"))
            (l = s.createElement("ok")).setAttribute("url", u.url),
            l.setAttribute("password", u.password),
            l.setAttribute("nofill", void 0 !== u.nofill ? u.nofill : "0"),
            l.setAttribute("aid", get_new_id());
        else if (-1 != e.indexOf("show.php") && "1" == u.delete)
            (l = s.createElement("result")).setAttribute("action", "delete"),
            l.setAttribute("aid", u.aid);
        else {
            if (-1 == e.indexOf("api.php"))
                return;
            l = s.createElement("OK"),
            c = "A-OK"
        }
        p = "undefined" != typeof g_local_accts_version ? g_local_accts_version + 1 : void 0 !== lp_local_accts_version ? lp_local_accts_version + 1 : 1,
        l.setAttribute("accts_version", p),
        s.documentElement.appendChild(l);
        var S = new Array;
        S.responseXML = s,
        S.readyState = 4,
        S.status = 200,
        c && (S.responseText = c),
        "function" == typeof setTimeout ? setTimeout(function() {
            n(S, r, o)
        }, 0) : LP.setTimeout(function() {
            n(S, r, o)
        }, 0)
    }
}
function lpgetrequesthash() {
    var e = lpusername;
    "" != e && null != e || "undefined" == typeof g_username || (e = g_username);
    var t = void 0 !== g_ischrome && g_ischrome ? "cr" : "ff";
    return "" == e || null == e ? t + "unknown1" : "" == (e = e.toLowerCase().replace(/\s*/g, "")) ? t + "unknown2" : "" == (e = encecb(e)) ? t + "unknown3" : e
}
this.lpMakeRequest = function(e, t, n, r, o, i) {
    var a = parse_query_string(t);
    if (LPISLOC) {
        var s = !0;
        if (-1 != e.indexOf("error.php") ? "1" == a.fb && (s = !1) : -1 == e.indexOf("upgrade.php") && -1 == e.indexOf("create_account.php") && -1 == e.indexOf("import_local.php") || (s = !1),
        s)
            return void lpMakeRequestLoc(e, t, n, r, o, i)
    }
    if (i || ("undefined" != typeof LP && "function" == typeof LP.mostRecent ? i = LP.mostRecent() : "undefined" != typeof window && (i = window)),
    null != lpuid && "" != lpuid && (a.requid = lpuid),
    null != lp_phpsessid && "" != lp_phpsessid && (e.match(/^https:\/\//i) || LP.lp_url_is_lastpass(e))) {
        a.wxsessid = lp_phpsessid;
        var l = LP.lpprefsHasUserValue("logOffWhenCloseBrowser", !0) && 1 == LP.lpprefsGetBoolPref("logOffWhenCloseBrowser", !0) && (!LP.lpprefsHasUserValue("logOffWhenCloseBrowserVal", !0) || 0 == LP.lpprefsGetIntPref("logOffWhenCloseBrowserVal", !0));
        "" != lpusername && (a.sessonly = l ? "1" : "0")
    }
    lppassusernamehash && "" != lpusername && "" != lphash && (e.match(/^https:\/\//i) || LP.lp_url_is_lastpass(e)) && (a.wxusername = lpusername,
    a.wxhash = lphash),
    void 0 !== lptoken && "" != lptoken && -1 == e.indexOf("create_account.php") && (a.token = lptoken),
    t = format_query_params(a),
    i ? i.setTimeout(function() {
        LP.lpMakeRequestReal(e, t, n, r, o)
    }, 0) : LP.setTimeout(function() {
        LP.lpMakeRequestReal(e, t, n, r, o)
    }, 0)
}
,
this.lpMakeRequestReal = function(e, t, n, r, o) {
    var i = lpgetlocalts(), a, s = {
        rid: i + "_" + get_random(1, 1e4),
        ts: i,
        url: e,
        params: t
    };
    lpisretry(e) || -1 == t.indexOf("?requesthash=") && -1 == t.indexOf("&requesthash=") && (t += ("" == t ? "" : "&") + "requesthash=" + encodeURIComponent(lpgetrequesthash()),
    t += ("" == t ? "" : "&") + "requestsrc=" + encodeURIComponent(void 0 !== g_ischrome && g_ischrome ? "cr" : "ff"),
    s.params = t),
    "?" != (t = t.replace(/&?sentms=[^\&]+/, "")).substring(0, 1) && "&" != t.substring(0, 1) || (t = t.substring(1)),
    t = (t = "sentms=" + encodeURIComponent(i) + ("" == t ? "" : "&" + t)).replace(/&?encuser=[^\&]+/, ""),
    "undefined" != typeof g_username && "" != g_username ? t += "&encuser=" + encodeURIComponent(encecb(g_username)) : void 0 !== lpusername && "" != lpusername && (t += "&encuser=" + encodeURIComponent(encecb(lpusername))),
    -1 == t.indexOf("hasplugin=") && lpversion && (t += ("" == t ? "" : "&") + "hasplugin=" + encodeURIComponent(lpversion)),
    -1 == t.indexOf("lpversion=") && lpversion && (t += ("" == t ? "" : "&") + "lpversion=" + encodeURIComponent(lpversion));
    var l = lpisqueueable(e)
      , c = "function" == typeof r ? r : lpmakerequesterror
      , u = function(e) {
        lpreadystatechange(n, e, r, o, s, l)
    }
      , p = r && !l ? r : function(e, t) {
        "function" == typeof r && r(e, t),
        lpmakerequesterror("onerror", s, l, e, t)
    }
    ;
    try {
        this.lpMakeRequestReallyReal(e, t, u, p)
    } catch (e) {
        c("exception: " + e, s, l)
    }
}
;
var gPulledInvalidAccts = !(this.lpMakeRequestReallyReal = function(e, t, n, r, o) {
    var i = new XMLHttpRequest;
    i.onreadystatechange = function() {
        n(i)
    }
    ,
    i.onerror = r;
    var a = "POST";
    if (void 0 !== o && void 0 !== o.method && (a = o.method),
    i.open(a, e, !0),
    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
    void 0 !== o)
        for (var s in o)
            o.hasOwnProperty(s) && "method" !== s && i.setRequestHeader(s, o[s]);
    i.send(t)
}
);
function lpreadystatechange(e, t, n, r, o, i) {
    if (4 == t.readyState && 200 == t.status) {
        lpisconnected = !0;
        var a = lpisretry(o.url)
          , s = null;
        if (a && !(s = lpgetretryrid(o.url)))
            return;
        if (t.responseXML && t.responseXML.documentElement) {
            var l = t.responseXML.documentElement.getElementsByTagName("error");
            if (l && 0 < l.length) {
                var c = l[0].getAttribute("cause");
                c && "oldpassword" == c && (lpdbg("state", "oldpassword seen logging off and deleted files"),
                "function" == typeof lpDeleteFile && (lpDeleteFile(lpusername + "_lp.act.xml"),
                lpDeleteFile(lpusername + "_lps.act.xml"),
                lpDeleteFile(lpusername_hash + "_lp.act.xml"),
                lpDeleteFile(lpusername_hash + "_lps.act.xml"),
                lpDeleteFile(lpusername_hash + "_lps.act.sxml")),
                lplog("LOGGING OFF : error : resonsetext=" + t.responseText),
                lplogoff(!1, "ff_oldpassword"));
                var u = l[0].getAttribute("notloggedin");
                if (u && "1" == u) {
                    a ? lpretryrequestdone(s, !1) : lpmakerequesterror("notloggedin", o, i),
                    lpdbg("state", "notlogged in seen in msg: " + t.responseText);
                    var p = "function" == typeof e && e ? e.toString().substring(0, 100) : "";
                    return lplog("SESSION EXPIRED B : url=" + (void 0 !== o && void 0 !== o.url ? o.url : "unknown") + " funcstr=" + p + " responseText=" + t.responseText),
                    lplog("LOGGING OFF : ErrorSessionMsg A"),
                    lplogoff(!1, "ff_servernotloggedin"),
                    void lpshowError("ErrorSessionMsg", !1, !0)
                }
                var d = l[0].getAttribute("oldretry");
                if (d && "1" == d)
                    return a ? void lpretryrequestdone(s, !0) : void lpReportError("SK:ERROR : received oldretry=1 for non retry request!", null)
            }
        }
        var g = !1;
        if (is_valid_xml(t))
            g = !0;
        else {
            (0 <= o.url.indexOf("geticon.php") || t.responseText && ("latest" == t.responseText || "nodata" == t.responseText || 0 == t.responseText.indexOf("iconsversion"))) && (g = !0),
            0 <= o.url.indexOf("logout.php") && (g = !0),
            0 <= o.url.indexOf("alert.php") && (g = !0),
            0 <= o.url.indexOf("error.php") && (g = !0),
            0 <= o.url.indexOf("prof.php") && (g = !0),
            0 <= o.url.indexOf("alert.php") && (g = !0),
            0 <= o.url.indexOf("getappdata.php") && (g = !0),
            0 <= o.url.indexOf("uploadsuperkeys.php") && (g = !0),
            0 <= o.url.indexOf("country_from_ip.php") && (g = !0),
            0 <= o.url.indexOf("loglogin.php") && (g = !0),
            0 <= o.url.indexOf("logformfill.php") && (g = !0),
            0 <= o.url.indexOf("secure_reprompt.php") && (g = !0),
            0 <= o.url.indexOf("httptest.php") && (g = !0),
            0 <= o.url.indexOf("set_never_autofill.php") && (g = !0),
            0 <= o.url.indexOf("help.php") && (g = !0),
            0 <= o.url.indexOf("getattach.php") && (g = !0),
            0 <= o.url.indexOf("misc_challenge.php") && (g = !0),
            0 <= o.url.indexOf("creditmon.php") && (g = !0);
            try {
                0 <= o.url.indexOf("/lmiapi/") && JSON.parse(t.responseText) && (g = !0)
            } catch (e) {}
            "undefined" != typeof FROMPARTNER && (g = !0),
            0 <= o.url.indexOf("getaccts.php") && (0 <= o.url.indexOf("mobile") ? g = !0 : ("undefined" != typeof LP && 0 == gPulledInvalidAccts && (LP.lpGetAccounts(),
            gPulledInvalidAccts = !0),
            lpReportError("ERROR: Got invalid xml from getaccts")))
        }
        if (a)
            return g || lpdbg("sk", "SK:retry request url=" + o.url + "\nSK:req.responseXML=" + t.responseXML + "\nSK:retry request response:\n" + t.responseText),
            void lpretryrequestdone(s, g);
        if (g) {
            if ("function" == typeof e) {
                var p;
                if (!lploggedin)
                    if (-1 != (p = e.toString().substring(0, 100)).indexOf("poll_server_response"))
                        return lpdbg("state", "We were about to process a response, but we're not logged in...logoff and show the red bar origresponsefunc=" + p),
                        lplog("SESSION EXPIRED C : url=" + (void 0 !== o && void 0 !== o.url ? o.url : "unknown") + " funcstr=" + p + " responseText=" + t.responseText),
                        lplog("LOGGING OFF : ErrorSessionMsg B"),
                        lplogoff(!1, "ff_sessionexp"),
                        void lpshowError("ErrorSessionMsg", !1, !0);
                e(t, n, r)
            }
        } else
            lpdbg("sk", "SK:invalid response when calling url=" + o.url + "\n" + t.responseText),
            lpmakerequesterror("invalidresponse", o, i),
            "function" == typeof n && n("Invalid Response")
    } else
        4 == t.readyState && ("function" == typeof t.onerror ? t.onerror("onerror", t) : "function" == typeof n && n(t.statusText, t))
}
function is_valid_xml(e) {
    return !(!e.responseXML || !e.responseXML.documentElement) && (void 0 === e.responseXML.documentElement.nodeName || "parsererror" != e.responseXML.documentElement.nodeName || null == typeof e.responseXML.documentElement.namespaceURI || "http://www.mozilla.org/newlayout/xml/parsererror.xml" != e.responseXML.documentElement.namespaceURI)
}
function lpisretry(e) {
    return 0 < e.indexOf("?rid=") || 0 < e.indexOf("&rid=")
}
function lpgetretryrid(e) {
    var t, n = new RegExp("[?&]rid=([^&]+)").exec(e), r;
    return n && 2 == n.length ? n[1] : (lpdbg("sk", "SK:lpgetretryrid - could not find rid in url"),
    lpReportError("SK:lpgetretryrid - could not find rid in url", null),
    null)
}
function lpisqueueable(e) {
    if (lpisretry(e))
        return !1;
    var t = ["add_never.php", "change_pw.php", "deliver_and_add.php", "formfill.php", "gm_deliver.php", "save_gen_pw.php", "set_autologin.php", "set_never_autofill.php", "show.php", "fields.php", "addapp.php"], n;
    for (n in t)
        if (0 <= e.indexOf(t[n]))
            return !0;
    return !1
}
function lpretryinsert(e) {
    var t = lpreadretryfile(!0)
      , n = e.rid
      , r = e.ts
      , o = null;
    for (var i in t) {
        if (t[i].rid == n)
            return lpReportError("SK:We tried to append a row with an idential rid value", null),
            !1;
        var a;
        if (null == o)
            r < parseInt(t[i].ts) && (o = i)
    }
    if (null == o)
        t[t.length] = e;
    else {
        var s = [];
        for (var i in t)
            i == o && (s[s.length] = e),
            s[s.length] = t[i];
        t = s
    }
    return !!lpwriteretryfile(t) || (lpdbg("error", "Could not write to retry file in lpretryinsert"),
    lpReportError("SK:Could not write to retry file in lpretryinsert", null),
    !1)
}
var g_retry = {
    exit: null,
    error: !1,
    rid: null,
    status: null,
    sentms: null,
    donems: null,
    retryintervalms: 0,
    initretryintervalms: 0,
    responsewaitms: 1e4
};
function lpretryrequestdone(e, t) {
    if (t) {
        if (!lpremovefromretryfile(e))
            return lpReportError("SK:lpremovefromretryfile failed for rid=" + e, null),
            lplogretryfile("SK:lpremovefromretryfile failed for rid=" + e + ". Contents of retry file:"),
            void (g_retry.exit = !0);
        g_retry.status = "done",
        g_retry.donems = (new Date).getTime(),
        lpdbg("sk", "SK:Retry request completed successfully for rid=" + e),
        lpchangeretryinterval(!1)
    } else
        g_retry.status = "failed",
        g_retry.donems = (new Date).getTime(),
        lpdbg("sk", "SK:Retry request failed for rid=" + e),
        lpchangeretryinterval(!0, !0, e)
}
var aNumretryattempts = new Array;
function lpchangeretryinterval(e, t, n) {
    if (e) {
        var r = t ? 864e5 : 6e5, o = g_retry.retryintervalms, i = 2 * o, a, s;
        if (0 == i ? i = 2e3 : r < i && (i = r),
        o != (g_retry.retryintervalms = i))
            lpdbg("retry", "Increasing retry interval from " + Math.round(o / 1e3) + " sec to " + Math.round(i / 1e3) + " sec : serverresponded=" + t);
        t && (void 0 === aNumretryattempts[n] && (aNumretryattempts[n] = 0),
        aNumretryattempts[n]++,
        16 == aNumretryattempts[n] && (lpdbg("retry", "Giving up on retrying - removing from retry request from the file...this might result in the user losing a change. rid=" + n),
        aNumretryattempts[n] = 0,
        lpremovefromretryfile(n)))
    } else {
        var l, c;
        if (g_retry.retryintervalms != g_retry.initretryintervalms)
            lpdbg("retry", "Decreasing retry interval from " + Math.round(g_retry.retryintervalms / 1e3) + " sec to " + Math.round(g_retry.initretryintervalms / 1e3) + " sec");
        g_retry.retryintervalms = g_retry.initretryintervalms
    }
}
this.lpretryrequests = function() {
    var e = 1e4;
    if (lploggedin && "omnikey" == multifactor_getdata("type") && ("function" == typeof lpusexpcom && lpusexpcom() && "function" == typeof lpxpcomobj.omnikey_supported && !lpxpcomobj.omnikey_supported() ? (lplog("LOGGING OFF : omnikey A"),
    lplogoff(!1, "ff_omnikey")) : "function" == typeof have_binary_function && have_binary_function("omnikey_supported") && call_binary_function("omnikey_supported", function(e) {
        e || (lplog("LOGGING OFF : omnikey B"),
        lplogoff(!1, "ff_omnikey2"))
    })),
    !g_retry.exit && lploggedin) {
        if ("started" == g_retry.status) {
            var t;
            if ((new Date).getTime() - g_retry.sentms <= g_retry.responsewaitms)
                return void LP.lpGetCurrentWindow().setTimeout(function() {
                    LP.lpretryrequests()
                }, e);
            lpchangeretryinterval(!0, !1),
            g_retry.donems = (new Date).getTime(),
            g_retry.rid = null,
            g_retry.sentms = null,
            g_retry.status = null
        }
        if (g_retry.donems && (new Date).getTime() - g_retry.donems < g_retry.retryintervalms)
            LP.lpGetCurrentWindow().setTimeout(function() {
                LP.lpretryrequests()
            }, e);
        else {
            g_retry.rid = null,
            g_retry.sentms = null,
            g_retry.status = null,
            g_retry.donems = null;
            var n = lpreadretryfile();
            if (0 != n.length) {
                var r = n[0], o = r.url, i = r.rid, a = r.ts, s;
                o += (-1 == o.indexOf("?") ? "?" : "&") + "rid=" + encodeURIComponent(i),
                o += "&localts=" + encodeURIComponent(a),
                g_retry.rid = i,
                g_retry.sentms = (new Date).getTime(),
                g_retry.status = "started",
                lpdbg("error", "lpretryrequests : issuing retry request and waiting " + Math.round(g_retry.responsewaitms / 1e3) + " sec for a response rid=" + i);
                var l = r.params;
                l = null == l || "" == l ? "debugcase=noparams" : "?" == l.substring(0, 1) ? "debugcase=startswithquestion&" + l.substring(1) : "&" == l.substring(0, 1) ? "debugcase=startswithampersand&" + l.substring(1) : "debugcase=allok&" + l,
                LP.lpMakeRequest(o, l, null, null, null),
                LP.lpGetCurrentWindow().setTimeout(function() {
                    LP.lpretryrequests()
                }, e)
            } else
                LP.lpGetCurrentWindow().setTimeout(function() {
                    LP.lpretryrequests()
                }, e)
        }
    }
}
;
var g_retrycache = null
  , lp_old_file_cleanup = !0;
function lpremovefromretryfile(e) {
    var t = lpreadretryfile(!0), n;
    if (0 == t.length)
        return !0;
    var r = !1
      , o = [];
    for (n = 0; n < t.length; ++n)
        t[n].rid == e ? r = !0 : o[o.length] = t[n];
    return r ? lpwriteretryfile(o) ? (0 == o.length && LP.lpGetAccounts(),
    !0) : (lpdbg("error", "lpremovefromretryfile : ERROR lpwriteretryfile failed when trying to remove rid=" + e + ". Contents of retryfile:\n" + tmp),
    !1) : (lplogretryfile("SK:lpremovefromretryfile : ERROR could not find rid=" + e + ". Contents of retry file:"),
    !1)
}
function lplogretryfile(e) {
    var t = lpreadretryfile(!0)
      , n = e;
    for (var r in t)
        for (var o in n += "\n[" + r + "] :",
        t[r])
            n += " " + o + "->" + t[r][o];
    lplog(n)
}
function lpreadretryfile(e) {
    if (null == g_retrycache || e) {
        var t = new Array
          , n = lpreadretry();
        if (null == n)
            return t;
        if ("" == n)
            return g_retrycache = t;
        var r = lpdec(n);
        if ("" == r || null == r)
            return lpReportError("Failed to decrypt retry data", null),
            lpdeleteretry(),
            t;
        var o = lpatob(r);
        if (null == o)
            return lpReportError("Failed to lpatob decrypted retry data (so perhaps decryption failed)", null),
            lpdeleteretry(),
            t;
        var i = o.indexOf(">LastPassRetry");
        if (o.length < 28 || 0 != o.indexOf("LastPassRetry<") || i != o.length - 14)
            return lpReportError("Retry data format after decryption invalid: end=" + i + " data=" + o, null),
            lpdeleteretry(),
            t;
        if ("" != (o = o.substring(14, i))) {
            var a = o.split("\n"), s, l;
            for (s = 0; s < a.length; ++s)
                t[t.length] = lpxml2array(a[s])
        }
        g_retrycache = t
    }
    return g_retrycache
}
function lpwriteretryfile(e) {
    var t = "", n, r;
    for (n = 0; n < e.length; ++n)
        t += (0 == n ? "" : "\n") + lparray2xml("row", e[n]);
    var o = lpbtoa("LastPassRetry<" + t + ">LastPassRetry");
    if (null == o)
        return !1;
    var i = lpenc(o);
    if ("" == i || null == i)
        return !1;
    g_retrycache = null;
    var a = lpwriteretry(i)
      , s = lpreadretryfile(!0);
    return a
}
function lpxml2array(e) {
    var t = new Array, n, r = (n = new RegExp("<([^ ]+) ?(.*)/>")).exec(e);
    if (!r || 3 != r.length)
        return t;
    for (var o = r[2], n = new RegExp('([^=]+)="([^"]*)"'), i = null; null != (i = n.exec(o)) && 3 == i.length; ) {
        var a = i[1].toString()
          , s = i[2].toString();
        o = o.replace(a + '="' + s + '"', ""),
        a = lptrim(a),
        s = lpxmlunescape(s),
        "null" == a ? s = null : "false" == a && (s = !1),
        t[a] = s
    }
    return t
}
function lparray2xml(e, t) {
    var n = "<" + e, r;
    for (r in t)
        null == t[r] && (t[r] = "null"),
        "object" == typeof t[r] && (t[r] = "null"),
        n += " " + r + '="' + lpxmlescape(t[r].toString()) + '"';
    return n += "/>"
}
var g_allowmultifactortrust = !0;
this.allowmultifactortrust = function() {
    return g_allowmultifactortrust
}
,
this.lplogincheck = function(e, t, n, r) {
    "function" == typeof lplogincheck2 ? lplogincheck2(e, t, n, r) : LP.mostRecent().setTimeout(function() {
        lp_logincheckhelper(e)
    }, 100)
}
;
var lplastlogincheck = 0;
function lp_logincheckhelper(e, t, n, r) {
    var o = (new Date).getTime();
    if (!(o - lplastlogincheck < 1e3)) {
        lplastlogincheck = o,
        lpSetupXHRIntercepts(),
        yubikey_cleardata(),
        googleauth_cleardata(),
        outofband_cleardata(),
        securityquestion_cleardata(),
        sesame_cleardata(),
        grid_cleardata(),
        multifactor_cleardata(),
        loginoffline(!0, e),
        lpdbg("login", "Trying to login to an existing session. Issuing request to login_check.php from:" + e),
        lploggedin || lploggedinoffline || LP.lp_handle_buttons_all("loggingin");
        var i = "canexpire=1&cansetuuid=1&version=" + LP.en(lpversion) + "&method=" + LP.get_method() + "&hp=" + (LP.IsHomePage() ? "1" : "0");
        if (i += LP.get_devicetype_param(),
        i += t ? "&sessionid=" + LP.en(t) : "",
        i += n ? "&wxusername=" + LP.en(n) : "",
        i += r ? "&wxhash=" + LP.en(r) : "",
        i += "&uuid=" + LP.en(LP.getuuid()),
        sesame_setdata("logincheckpostdata", i),
        WAVTOOLBAR)
            return lpdbg("login", "issuing delayed ASO logincheck instead of login_check.php : webrootaso WAV"),
            lphash = lpusername_hash = lpusername = "",
            CHANGEKEY("", "lp_logincheckhelper"),
            void LP.mostRecent().setTimeout(function() {
                lpnp_notify("logincheck")
            }, 2e3);
        lastpoll = lastlogin = lp_get_gmt_timestamp(),
        LP.lpMakeRequest(LP.lp_base + "login_check.php", i, lpLoginCheckResponse, function() {
            lpLoginCheckErrorHandler(e, "makerequest")
        }, e)
    }
}
var lplogincheckerrorhandlercalled = 0;
function lpLoginCheckErrorHandler(e, t) {
    var n = (new Date).getTime();
    n - lplogincheckerrorhandlercalled < 1e3 || (lplogincheckerrorhandlercalled = n,
    lploggedin || lploggedinoffline || LP.lp_handle_buttons_all("off"),
    lpdbg("login", "Trying to login to an existing session : failed " + e + " : " + t + "=> try to login to login.php using saved credentials"),
    lp_login_from_saved(e) || lploggedinoffline || (lploginstarted = !1,
    "httptest" == e && lpopenloginstart ? LP.lpOpenLogin() : "noexistingsession" == t || "nokeyfileA" == t || "nokeyfileB" == t || "nokeyfileC" == t || ("invalidresponse" == t || "exception" == t ? lpshowError("LoginError", !1, !0) : "makerequest" == t ? lpshowError("ErrorLoginMsg") : lpshowError("LoginError", !1, !0))))
}
function lp_loginhelper_wav_delayedasologincheck(e) {
    lpdbg("login", "WEBROOT WAV : lp_loginhelper_wav_delayedasologincheck : clearing key and issuing delayed ASO logincheck instead of making a request to login.php : from=" + e),
    lploggedinoffline = lploggedin = !1,
    lphash = lpusername_hash = lpusername = "",
    fix_toolbar_mode(),
    CHANGEKEY("", "lp_loginhelper_wav_delayedasologincheck"),
    e == lpWRWEBSITELOGIN_ASOREGISTRY ? (lpdbg("login", "WEBROOT WAV : lp_loginhelper_wav_delayedasologincheck : setting lpdonotrefreshwindowsts so we don't refresh windows within the next 10sec : from=" + e),
    lpdonotrefreshwindowsts = (new Date).getTime(),
    LP.mostRecent().setTimeout(function() {
        lpnp_notify("logincheck", {
            data0: "donotignoreself"
        })
    }, 2e3)) : LP.mostRecent().setTimeout(function() {
        lpnp_notify("logincheck")
    }, 2e3)
}
function lp_loginhelper_wav_loginuntrusted(e) {
    lpdbg("login", "WEBROOT WAV : lp_loginhelper_wav_loginuntrusted : got namedpipe login so assuming credentials are valid and logging in instead of making a request to login.php : from=" + e),
    lpisadmin = lploggedinoffline = !(lploggedin = !(lpuid = "")),
    lpemail = "",
    lp_server_accts_version = lp_local_accts_version = -1,
    lpLastPwPrompt = lploglogins = 0,
    LP.lp_handle_buttons_all("in"),
    OnAllLogins(),
    lpdbg("login", "Refreshing windows.  from=" + e),
    lpdonotrefreshwindowsts = null,
    lprefreshwindows()
}
this.lplogin = function(e, t, n, r) {
    LP.mostRecent().setTimeout(function() {
        lp_loginhelper(e, t, n, r),
        t = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }, 100)
}
;
var g_iterpw = "";
function lp_loginhelper(e, t, n, r) {
    if (lpdbg("login", "Login from " + n),
    lpSetupXHRIntercepts(),
    (WISCTOOLBAR || WAVTOOLBAR) && (n == lpWRWEBSITELOGIN_ASOREGISTRY ? lpnp_notify("login", {
        data0: e,
        data1: lphash,
        data2: lp_local_key_hex
    }) : n == lpWRPLUGINLOGIN_ASOREGISTRY ? lpnp_notify("login", {
        data0: e,
        data1: lphash,
        data2: lp_local_key_hex
    }) : n == lpWRNAMEDPIPELOGIN_ASOREGISTRY || lpnp_notify("login", {
        data0: e,
        data1: t
    })),
    WAVTOOLBAR)
        return "namedpipes" == n || n == lpWRNAMEDPIPELOGIN_ASOREGISTRY ? void lp_loginhelper_wav_loginuntrusted(n) : void lp_loginhelper_wav_delayedasologincheck(n);
    if ("function" == typeof lpDeleteFile && (lpDeleteFile(e + "_lp.act.xml"),
    lpDeleteFile(e + "_lps.act.xml")),
    yubikey_cleardata(),
    googleauth_cleardata(),
    outofband_cleardata(),
    securityquestion_cleardata(),
    sesame_cleardata(),
    grid_cleardata(),
    r || multifactor_cleardata(),
    n == lpWRWEBSITELOGIN_ASOREGISTRY || n == lpWRNAMEDPIPELOGIN_ASOREGISTRY || n == lpWRPLUGINLOGIN_ASOREGISTRY)
        ;
    else {
        lpusername = e.toLowerCase().replace(/\s*/g, ""),
        lpusername_hash = lp_sha256(lpusername),
        fix_toolbar_mode();
        var o = LP.make_lp_key(lpusername, t);
        lphash = LP.make_lp_hash(lpusername, o, t),
        calculateMasterStrength(lpusername, t),
        CHANGEKEY(o, "lp_loginhelper")
    }
    lpRenameFile(lpusername_hash + "_lp.key", lpusername_hash + "_lp.act.key"),
    lpRenameFile(lpusername_hash + "_lp.act.key", lpusername_hash + "_lp.act.lps"),
    lpRenameFile(lpusername_hash + "_lp.act.lps", lpusername_hash + "_lpall.lps"),
    lploggedinoffline || loginoffline(!0, n),
    lpdbg("login", "Trying to login online : issuing request to login.php"),
    lploggedin || lploggedinoffline || LP.lp_handle_buttons_all("loggingin");
    var i = "canexpire=1&cansetuuid=1&xml=2&username=" + LP.en(lpusername) + "&method=" + LP.get_method() + "&hash=" + lphash + "&version=" + LP.en(lpversion);
    i += LP.get_devicetype_param(),
    i += "&hp=" + (LP.IsHomePage() ? "1" : "0"),
    i += "&encrypted_username=" + LP.en(encecb(lpusername)),
    i += "&uuid=" + LP.en(LP.getuuid()),
    void 0 !== lpoverridelang && (i += "&lang=" + LP.en(lpoverridelang));
    var a = LP.get_key_iterations(lpusername);
    if (i += "&iterations=" + LP.en(a),
    "" != (lpiterations = a) && 1 < parseInt(a)) {
        var s = checkNeedsPBKDF2v2(lpusername, t);
        i += s,
        "" != s && "undefined" != typeof g_oldpbkdf2 && 1 == g_oldpbkdf2 && (i += "&fallback=1")
    }
    n != lpWRWEBSITELOGIN_ASOREGISTRY && n != lpWRNAMEDPIPELOGIN_ASOREGISTRY && n != lpWRPLUGINLOGIN_ASOREGISTRY || (i += "&wrfrom=" + LP.en(n)),
    !LP.lpdolostpwotp || LP.lpprefsHasUserValue("StoreLostPWOTP") && !LP.lpprefsGetBoolPref("StoreLostPWOTP") ? LP.DeleteOTP() : i += "&lostpwotphash=" + LP.en(LP.GetOTPHash()),
    sesame_cleardata(),
    sesame_setdata("postdata", i),
    sesame_setdata("from", n),
    yubikey_cleardata(),
    yubikey_setdata("postdata", i),
    yubikey_setdata("from", n),
    g_iterpw = t,
    googleauth_cleardata(),
    googleauth_setdata("postdata", i),
    googleauth_setdata("from", n),
    outofband_cleardata(),
    outofband_setdata("postdata", i),
    outofband_setdata("from", n),
    securityquestion_cleardata(),
    securityquestion_setdata("postdata", i),
    securityquestion_setdata("from", n),
    grid_cleardata(),
    grid_setdata("postdata", i),
    grid_setdata("from", n),
    r || multifactor_cleardata(),
    multifactor_setdata("postdata", i),
    multifactor_setdata("from", n),
    i += "&otp=",
    i += "&sesameotp=",
    i += "&gridresponse=",
    i += "&multifactorresponse=",
    LP.isFennecNative ? i += "&duosupported=1&outofbandpasscodesupported=1" : i += "&outofbandsupported=1",
    lastpoll = lastlogin = lp_get_gmt_timestamp(),
    lplog("Requesting login.php G"),
    LP.lpMakeRequest(LP.lp_base + "login.php", i, lpLoginResponse, function() {
        lpLoginErrorHandler(n)
    }, n),
    t = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
function checkNeedsPBKDF2v2(e, t) {
    for (var n = 0; n < e.length; n++)
        if (127 < e.charCodeAt(n))
            return "&reqpbkdf2v2=1";
    for (var n = 0; n < t.length; n++)
        if (127 < t.charCodeAt(n))
            return "&reqpbkdf2v2=1";
    return ""
}
var lploginerrorhandlercalled = 0;
function lpLoginErrorHandler(e) {
    var t = (new Date).getTime();
    t - lploginerrorhandlercalled < 1e3 || (lploginerrorhandlercalled = t,
    lpdbg("login", "Login via login.php failed => try logging in offline using saved credentials -- if not already logged in offline --"),
    lploggedin || lploggedinoffline || LP.lp_handle_buttons_all("off"),
    loginoffline(!1, e))
}
function offlineloginsuccessful(e, t) {
    !LPISLOC || "pluginlogin" != e || LP.lpprefsHasUserValue("showHomepageAfterLogin", !1) && !LP.lpprefsGetBoolPref("showHomepageAfterLogin", !1) || (lpdbg("login", "Showing vault from offlineloginsuccessful.  from=" + e),
    launchHomeIf()),
    OnAllLogins(),
    lpisadmin = !(lploggedinoffline = lploggedin = !(lpuid = "")),
    lploglogins = LPISLOC ? 1 : 0,
    lpemail = "",
    lp_server_attach_version = lp_local_attach_version = lp_server_accts_version = lp_local_accts_version = -1,
    lpLastPwPrompt = 0,
    fix_toolbar_mode(),
    LP.lp_handle_buttons_all("in"),
    lpGetAccountsLocal(!0),
    lpnotifytimerid && (LP.mostRecent().clearTimeout(lpnotifytimerid),
    lpnotifytimerid = null);
    var n = t ? 3e4 : 0;
    if (lpnotifytimerid = LP.mostRecent().setTimeout(function() {
        LP.notifyoffline(e)
    }, n),
    e == lpWRWEBSITELOGIN_ASOREGISTRY || e == lpWRNAMEDPIPELOGIN_ASOREGISTRY || e == lpWRPLUGINLOGIN_ASOREGISTRY)
        ;
    else {
        lpretryonlinetimerid && (LP.mostRecent().clearTimeout(lpretryonlinetimerid),
        lpretryonlinetimerid = null);
        var r = 3e4;
        lpretryonlinetimerid = LP.mostRecent().setTimeout(function() {
            LP.retryonlinelogin(r)
        }, r)
    }
}
function OnAllLogins() {
    LP.lpprefsSetBoolPref("ffhasloggedin", !0, !1),
    LP.SetupUserPreferences(),
    LP.lpSetupIdleTimer(),
    LP.lpprefsHasUserValue("ffhasloggedinsuccessfully", !1) || (LP.lpprefsSetBoolPref("ffhasloggedinsuccessfully", !0, !1),
    LP.flush_prefs())
}
function readenckeyfromkeyfile(e) {
    var t = readkeyfile(e, null, !1), n, r;
    return t ? t.split("\n")[0] : null
}
function readkeyfile(e, t, n, r) {
    var o = void 0 === t || null == t ? lp_local_key : t
      , i = !(void 0 !== n && !n)
      , a = lp_sha256(e)
      , s = lpReadFile(a + "_lpall.slps");
    if (s)
        lpdbg("login", "A data=" + s),
        lpdbg("login", "B data=" + (s = lp_unprotect_data(s, !0)));
    else if (s = lpReadFile(a + "_lpall.lps")) {
        var l = lp_protect_data(s, !0);
        lpWriteFile(a + "_lpall.slps", l),
        lpDeleteFile(a + "_lpall.lps")
    } else {
        if (!(s = lpReadFile(e + "_lp.act.lps"))) {
            if (LPISLOC && LPISUPEK && !r && lp_hex2bin(lp_sha256(e + "")) != lp_local_key) {
                lppwdeckey = lp_local_key,
                lpWriteKeyFile();
                var c = new Object;
                return c.accts_version = 0,
                c.sites = new Array,
                c.securenotes = new Array,
                c.prompts = new Array,
                LPISUPEK && (c.prompts.login_site_prompt = !0,
                c.prompts.edit_site_prompt = !0,
                c.prompts.edit_sn_prompt = !0,
                c.prompts.view_pw_prompt = !0,
                c.prompts.view_ff_prompt = !0,
                c.prompts.switch_identity_prompt = !0,
                c.prompts.switch_f_prompt = !0,
                c.prompts.multifactor_reprompt = !0),
                c.formfills = new Array,
                c.identities = new Array,
                c.equivalentdomains = new Array,
                c.neverurls = new Array,
                c.premium_exp = 0,
                c.enterpriseuser = 0,
                c.encrypted_username = encecb(lpusername),
                c.pendings = new Array,
                c.shareeautopushes = new Array,
                c.maxid = new Array,
                c.maxid.maxid = 0,
                c.urlrules = new Array,
                save_accounts_file(c, null, "readkeyfile"),
                readkeyfile(e, t, n, !0)
            }
            return null
        }
        lpRenameFile(e + "_lp.act.lps", a + "_lpall.lps")
    }
    var u = s.split("\n");
    if (lpdbg("login", "C splitdata.length=" + u.length),
    2 != u.length)
        return null;
    if (i) {
        if (lpdbg("login", "D deckey=" + o),
        lpdbg("login", "E splitdata[1]=" + u[1]),
        "" == o)
            return null;
        var p = lpdec(u[1], o, !0);
        if (lpdbg("login", "F verificationdata=" + p),
        "lastpass rocks" != p)
            return null
    }
    return lpdbg("login", "G returning data=" + s),
    s
}
function checkGridEnabled(e, t) {
    if ("httptest" != t)
        return !0;
    var n = null != e[0].getAttribute("gridenabled") && "" != e[0].getAttribute("gridenabled")
      , r = null != e[0].getAttribute("gridresponseok") && "" != e[0].getAttribute("gridresponseok");
    if (n) {
        if (!r) {
            lpdbg("login", "LoginCheck : Asking for grid values and reissuing request to login_check.php");
            var o = grid_getvalues(lpusername, e[0].getAttribute("challenge"));
            if ("" == o)
                return lpdbg("login", "LoginCheck : User did not enter grid values- logging off and showing an error"),
                lplog("LOGGING OFF : gridenabled"),
                lplogoff(!1, "ff_nogrid"),
                void lpshowError("LoginError", !1, !0);
            lpdbg("login", "LoginCheck : User entered values=" + o + " -- REISSUING LOGINCHECK REQUEST");
            var i = sesame_getdata("logincheckpostdata") + "&gridresponse=" + encodeURIComponent(o);
            return grid_getdata("label") && (i += "&trustlabel=" + LP.en(grid_getdata("label"))),
            e[0].getAttribute("wxsessid") && (i += "&wxsessid=" + LP.en(e[0].getAttribute("wxsessid"))),
            LP.lpMakeRequest(LP.lp_base + "login_check.php", i, lpLoginCheckResponse, function() {
                lpLoginCheckErrorHandler(t, "makerequest")
            }, t),
            !1
        }
        lpdbg("login", "LoginCheck : grid reprompt-rerequest succeeded!")
    }
    return !0
}
function CheckDownloadNewDataFile(e, t, n, r, o) {
    if ("" != e && "0" != e) {
        var i = n
          , a = !1;
        if (lpFileExists(t)) {
            var s = lpReadFile(t)
              , l = -1 == s.indexOf("\n") ? s.length : s.indexOf("\n");
            i = s.substr(0, l)
        } else
            a = !0;
        if (-1 != i && 0 < CompareLastPassVersions(e, i) && (a = !0),
        a) {
            var c = LP.lp_base + "getappdata.php";
            LP.lpMakeRequest(c, "type=" + LP.en(r), lpDownloadDataResponse, null, o)
        }
    }
}
function lp_getlastusercredentials() {
    if (LPISLOC && LPISUPEK)
        return null;
    var e = lp_get_loginusers();
    if (0 == e.length)
        return null;
    var t = e[0], n = lp_get_loginpws(), r;
    return void 0 === n[t] ? null : {
        username: t,
        password: n[t]
    }
}
function lp_login_from_saved(e) {
    var t = lp_getlastusercredentials();
    if (!t)
        return lpdbg("login", "Trying to login online using saved credentials : failed since no saved credentials"),
        !1;
    var n = t.username
      , r = t.password;
    return lpdbg("login", "Trying to login online using saved credentials username=" + n),
    LP.lplogin(n, r, e),
    !0
}
function lp_loginusersupdate(e, t) {
    for (var n = lp_get_loginusers(), r = 0; r < n.length; r++)
        if (n[r] == e) {
            n.splice(r, 1);
            break
        }
    null == t && (t = !!LP.lpprefsHasUserValue("rememberUsername") && LP.lpprefsGetBoolPref("rememberUsername")),
    t && LP.check_email(e) && n.unshift(e),
    save_loginusers(n)
}
function lp_get_loginusers(e) {
    var t = "";
    LP.lpprefsHasUserValue("loginusers", !1) && (t = LP.lpprefsGetCharPref("loginusers", !1));
    var n = new Array
      , r = encodeURIComponent(e);
    if (void 0 !== e && "" != e && -1 == t.indexOf(r) && (t = r + "|" + t),
    "" != t) {
        n = t.split("|");
        for (var o = 0; o < n.length; o++)
            try {
                n[o] = decodeURIComponent(n[o])
            } catch (e) {
                n[o] = ""
            }
    }
    return n
}
function lp_loginpws_removeifdifferent(e, t) {
    var n = lp_get_loginpws();
    void 0 !== n[e] && LP.make_lp_key(e, n[e]) != t && (n[e] = null,
    save_loginpws(n))
}
function lp_loginpws_remember(e, t, n) {
    var r = lp_get_loginpws();
    void 0 !== r[e] && (r[e] = null),
    n && (r[e] = t),
    save_loginpws(r)
}
function lp_remove_loginuser(e) {
    for (var t = lp_get_loginusers(), n = lp_get_loginpws(), r = 0; r < t.length; r++)
        if (t[r] == e) {
            t.splice(r, 1);
            break
        }
    return void 0 !== n[e] && (n[e] = null),
    save_loginusers(t),
    save_loginpws(n),
    LP.flush_prefs(),
    t
}
function lp_deprecate_loginpws_prefs() {
    if (lplog("lp_deprecate_loginpws_prefs called"),
    LP.lpprefsHasUserValue("loginpws", !1)) {
        var e = LP.lpprefsGetCharPref("loginpws", !1);
        if ("" != e) {
            lplog("Deprecating loginpws pref");
            var t = lp_unprotect_data(e);
            if ("" != t) {
                var n = lp_loginpws_to_map(t);
                save_loginpws(n),
                LP.lpprefsSetCharPref("loginpws", "", !1)
            }
        }
    }
}
function lp_get_loginpws() {
    var e = new Array;
    try {
        var t = lpReadFile("lp.loginpws"), n;
        if ("" != t)
            e = lp_loginpws_to_map(lp_unprotect_data(t))
    } catch (e) {
        lpReportError("Failure reading lp.loginpws")
    }
    return e
}
function lp_loginpws_to_map(e) {
    var t = new Array
      , n = new Array;
    if ("" != e) {
        t = e.split("|");
        for (var r = 0; r < t.length; r++) {
            var o = t[r].split("=");
            if (void 0 !== o[1]) {
                var i, a;
                try {
                    i = decodeURIComponent(o[0])
                } catch (e) {
                    i = ""
                }
                try {
                    a = decodeURIComponent(o[1])
                } catch (e) {
                    a = ""
                }
                var s = lp_hex2bin(lp_sha256(i));
                a = lpdec(a, s),
                n[i] = a
            } else
                lpdbg("error", "lp_loginpws_to_map : failed to split up i=" + r + " val=" + t[r])
        }
    }
    return n
}
function lp_save_passwords_with_lastpass(e, t) {
    lp_lpOpenLoginHelper(e, t)
}
function lp_lpOpenLoginHelper(e, t) {
    lploggedin || LP.lpGetCurrentWindow().setTimeout(function() {
        lploggedin || LP.lpOpenLogin(e.extra)
    }, 500)
}
this.notifyoffline = function(e) {
    lploggedin && lploggedinoffline && (lpdbg("login", "Trying to log in offline : notify user that they are logged in offline"),
    lp_showNotification("LoggedInOffline", null, 0, "offline"),
    "pluginlogin" != e && "createaccount" != e && e != lpWRPLUGINLOGIN_ASOREGISTRY || LP.lpprefsHasUserValue("showHomepageAfterLogin", !1) && !LP.lpprefsGetBoolPref("showHomepageAfterLogin", !1) || (lpdbg("login", "Showing vault from notifyoffline.  from=" + e),
    launchHomeIf()))
}
,
this.retryonlinelogin = function(e) {
    if (lploggedin && lploggedinoffline) {
        var t;
        lpdbg("login", "We're still logged in offline => retrying to login online.  retryinterval=" + e / 6e4 + " minutes"),
        LP.lplogincheck("retryonline");
        var n = 2 * e;
        12e5 < n && (n = 12e5),
        LP.mostRecent().setTimeout(function() {
            LP.retryonlinelogin(n)
        }, n)
    }
}
,
this.lpLoginResponse = function(e, t, n) {
    "function" == typeof lpLoginResponse2 ? lpLoginResponse2(e, t, n) : lpLoginResponse(e, t, n)
}
,
this.have_loginpw = function(e) {
    var t = lp_get_loginpws();
    return void 0 !== t[e] && t[e]
}
,
this.delete_loginpw = function(e) {
    var t = lp_get_loginpws();
    void 0 !== t[e] && (t[e] = null),
    save_loginpws(t)
}
;
var lplasthttptest = 0;
function httptestresponse(e) {
    try {
        if (e && 4 == e.readyState) {
            if (200 == e.status && null != e.responseXML && null != e.responseXML.documentElement) {
                var t, n = e.responseXML.documentElement.getElementsByTagName("ok"), r;
                if (0 < n.length)
                    if ("1" == n[0].getAttribute("lastpass"))
                        return void LP.lplogincheck("httptest")
            }
            httptesterror()
        }
    } catch (e) {
        httptesterror()
    }
}
function httptesterror() {
    LP.setTimeout(function() {
        LP.httptest()
    }, 3e5)
}
function get_multifactor_disable_url(e, t) {
    return "multifactordisable.php?cmd=sendemail&username=" + encodeURIComponent(e) + "&type=" + encodeURIComponent(t)
}
function ff_or_chrome_gs(e) {
    return "undefined" != typeof LP ? LP.lpgs(e) : gs(e)
}
function init_timezones() {
    var e;
    void 0 !== all_timezones && null != all_timezones || (all_timezones = new Array,
    (e = new timezoneinfo).name = "(-12:00) " + ff_or_chrome_gs("International Date Line West"),
    e.value = "-12:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-11:00) " + ff_or_chrome_gs("Midway Island, Samoa"),
    e.value = "-11:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-10:00) " + ff_or_chrome_gs("Hawaii"),
    e.value = "-10:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-09:00) " + ff_or_chrome_gs("Alaska"),
    e.value = "-09:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-08:00) " + ff_or_chrome_gs("Pacific Time (US & Canada)"),
    e.value = "-08:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-07:00) " + ff_or_chrome_gs("Arizona"),
    e.value = "-07:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-07:00) " + ff_or_chrome_gs("Mountain Time (US & Canada)"),
    e.value = "-07:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-06:00) " + ff_or_chrome_gs("Central America, Saskatchewan"),
    e.value = "-06:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-06:00) " + ff_or_chrome_gs("Central Time (US & Canada), Guadalajara, Mexico City"),
    e.value = "-06:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-05:00) " + ff_or_chrome_gs("Indiana, Bogota, Lima, Quito, Rio Branco"),
    e.value = "-05:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-05:00) " + ff_or_chrome_gs("Eastern Time (US & Canada)"),
    e.value = "-05:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-04:30) " + ff_or_chrome_gs("Caracas"),
    e.value = "-04:30,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-04:00) " + ff_or_chrome_gs("Atlantic Time (Canada), Manaus, Santiago"),
    e.value = "-04:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-04:00) " + ff_or_chrome_gs("La Paz"),
    e.value = "-04:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-03:30) " + ff_or_chrome_gs("Newfoundland"),
    e.value = "-03:30,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-03:00) " + ff_or_chrome_gs("Greenland, Brasilia, Montevideo"),
    e.value = "-03:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-03:00) " + ff_or_chrome_gs("Buenos Aires, Georgetown"),
    e.value = "-03:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-02:00) " + ff_or_chrome_gs("Mid-Atlantic"),
    e.value = "-02:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-01:00) " + ff_or_chrome_gs("Azores"),
    e.value = "-01:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(-01:00) " + ff_or_chrome_gs("Cape Verde Is."),
    e.value = "-01:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(00:00) " + ff_or_chrome_gs("Casablanca, Monrovia, Reykjavik"),
    e.value = "00:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(00:00) " + ff_or_chrome_gs("GMT Dublin, Edinburgh, Lisbon, London"),
    e.value = "00:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+01:00) " + ff_or_chrome_gs("Amsterdam, Berlin, Rome, Vienna, Prague, Brussels"),
    e.value = "+01:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+01:00) " + ff_or_chrome_gs("West Central Africa"),
    e.value = "+01:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+02:00) " + ff_or_chrome_gs("Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem"),
    e.value = "+02:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+02:00) " + ff_or_chrome_gs("Harare, Pretoria"),
    e.value = "+02:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+03:00) " + ff_or_chrome_gs("Baghdad"),
    e.value = "+03:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+03:00) " + ff_or_chrome_gs("Kuwait, Riyadh, Nairobi, Moscow, St. Petersburg, Volgograd"),
    e.value = "+03:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+03:30) " + ff_or_chrome_gs("Tehran"),
    e.value = "+03:30,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+04:00) " + ff_or_chrome_gs("Abu Dhabi, Muscat, Tbilisi, Izhevsk"),
    e.value = "+04:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+04:00) " + ff_or_chrome_gs("Baku, Yerevan"),
    e.value = "+04:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+04:30) " + ff_or_chrome_gs("Kabul"),
    e.value = "+04:30,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+05:00) " + ff_or_chrome_gs("GMT+5"),
    e.value = "+05:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+05:00) " + ff_or_chrome_gs("Islamabad, Karachi, Tashkent, Ekaterinburg"),
    e.value = "+05:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+05:30) " + ff_or_chrome_gs("Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura"),
    e.value = "+05:30,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+05:45) " + ff_or_chrome_gs("Kathmandu"),
    e.value = "+05:45,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+06:00) " + ff_or_chrome_gs("Astana, Dhaka, Novosibirsk"),
    e.value = "+06:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+06:00) " + ff_or_chrome_gs("Almaty"),
    e.value = "+06:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+06:30) " + ff_or_chrome_gs("Yangon (Rangoon)"),
    e.value = "+06:30,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+07:00) " + ff_or_chrome_gs("GMT+7"),
    e.value = "+07:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+07:00) " + ff_or_chrome_gs("Bangkok, Hanoi, Jakarta, Krasnoyarsk"),
    e.value = "+07:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+08:00) " + ff_or_chrome_gs("Beijing, Hong Kong, Singapore, Taipei, Irkutsk"),
    e.value = "+08:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+08:00) " + ff_or_chrome_gs("Ulaan Bataar, Perth"),
    e.value = "+08:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+09:00) " + ff_or_chrome_gs("GMT+9"),
    e.value = "+09:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+09:00) " + ff_or_chrome_gs("Seoul, Osaka, Sapporo, Tokyo, Yakutsk"),
    e.value = "+09:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+09:30) " + ff_or_chrome_gs("Darwin"),
    e.value = "+09:30,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+09:30) " + ff_or_chrome_gs("Adelaide"),
    e.value = "+09:30,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+10:00) " + ff_or_chrome_gs("Brisbane, Guam, Port Moresby, Vladivostok"),
    e.value = "+10:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+10:00) " + ff_or_chrome_gs("Canberra, Melbourne, Sydney, Hobart"),
    e.value = "+10:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+11:00) " + ff_or_chrome_gs("Magadan, Solomon Is., New Caledonia"),
    e.value = "+11:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+12:00) " + ff_or_chrome_gs("Auckland, Wellington"),
    e.value = "+12:00,1",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+12:00) " + ff_or_chrome_gs("Fiji, Kamchatka, Marshall Is."),
    e.value = "+12:00,0",
    all_timezones[all_timezones.length] = e,
    (e = new timezoneinfo).name = "(+13:00) " + ff_or_chrome_gs("Nuku'alofa"),
    e.value = "+13:00,0",
    all_timezones[all_timezones.length] = e)
}
function init_countries() {
    if (void 0 === all_countries || null == all_countries) {
        var e;
        all_countries = new Array,
        (e = new countryinfo).name = LP.lpgs("Afghanistan"),
        e.cc2l = "AF",
        e.cc3l = "AFG",
        e.num = "4",
        e.phone = "93",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Aland Islands"),
        e.cc2l = "AX",
        e.cc3l = "ALA",
        e.num = "248",
        e.phone = "358",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Albania"),
        e.cc2l = "AL",
        e.cc3l = "ALB",
        e.num = "8",
        e.phone = "355",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Algeria"),
        e.cc2l = "DZ",
        e.cc3l = "DZA",
        e.num = "12",
        e.phone = "213",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("American Samoa"),
        e.cc2l = "AS",
        e.cc3l = "ASM",
        e.num = "16",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Andorra"),
        e.cc2l = "AD",
        e.cc3l = "AND",
        e.num = "20",
        e.phone = "376",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Angola"),
        e.cc2l = "AO",
        e.cc3l = "AGO",
        e.num = "24",
        e.phone = "244",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Anguilla"),
        e.cc2l = "AI",
        e.cc3l = "AIA",
        e.num = "660",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Antarctica"),
        e.cc2l = "AQ",
        e.cc3l = "ATA",
        e.num = "10",
        e.phone = "672",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Antigua and Barbuda"),
        e.cc2l = "AG",
        e.cc3l = "ATG",
        e.num = "28",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Argentina"),
        e.cc2l = "AR",
        e.cc3l = "ARG",
        e.num = "32",
        e.phone = "54",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Armenia"),
        e.cc2l = "AM",
        e.cc3l = "ARM",
        e.num = "51",
        e.phone = "374",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Aruba"),
        e.cc2l = "AW",
        e.cc3l = "ABW",
        e.num = "533",
        e.phone = "297",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Australia"),
        e.cc2l = "AU",
        e.cc3l = "AUS",
        e.num = "36",
        e.phone = "61",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Austria"),
        e.cc2l = "AT",
        e.cc3l = "AUT",
        e.num = "40",
        e.phone = "43",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Azerbaijan"),
        e.cc2l = "AZ",
        e.cc3l = "AZE",
        e.num = "31",
        e.phone = "994",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bahamas"),
        e.cc2l = "BS",
        e.cc3l = "BHS",
        e.num = "44",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bahrain"),
        e.cc2l = "BH",
        e.cc3l = "BHR",
        e.num = "48",
        e.phone = "973",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bangladesh"),
        e.cc2l = "BD",
        e.cc3l = "BGD",
        e.num = "50",
        e.phone = "880",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Barbados"),
        e.cc2l = "BB",
        e.cc3l = "BRB",
        e.num = "52",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Belarus"),
        e.cc2l = "BY",
        e.cc3l = "BLR",
        e.num = "112",
        e.phone = "375",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Belgium"),
        e.cc2l = "BE",
        e.cc3l = "BEL",
        e.num = "56",
        e.phone = "32",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Belize"),
        e.cc2l = "BZ",
        e.cc3l = "BLZ",
        e.num = "84",
        e.phone = "501",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Benin"),
        e.cc2l = "BJ",
        e.cc3l = "BEN",
        e.num = "204",
        e.phone = "229",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bermuda"),
        e.cc2l = "BM",
        e.cc3l = "BMU",
        e.num = "60",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bhutan"),
        e.cc2l = "BT",
        e.cc3l = "BTN",
        e.num = "64",
        e.phone = "975",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bolivia"),
        e.cc2l = "BO",
        e.cc3l = "BOL",
        e.num = "68",
        e.phone = "591",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bosnia and Herzegovina"),
        e.cc2l = "BA",
        e.cc3l = "BIH",
        e.num = "70",
        e.phone = "387",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Botswana"),
        e.cc2l = "BW",
        e.cc3l = "BWA",
        e.num = "72",
        e.phone = "267",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bouvet Island"),
        e.cc2l = "BV",
        e.cc3l = "BVT",
        e.num = "74",
        e.phone = "47",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Brazil"),
        e.cc2l = "BR",
        e.cc3l = "BRA",
        e.num = "76",
        e.phone = "55",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("British Indian Ocean Territory"),
        e.cc2l = "IO",
        e.cc3l = "IOT",
        e.num = "86",
        e.phone = "246",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Brunei Darussalam"),
        e.cc2l = "BN",
        e.cc3l = "BRN",
        e.num = "96",
        e.phone = "673",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Bulgaria"),
        e.cc2l = "BG",
        e.cc3l = "BGR",
        e.num = "100",
        e.phone = "359",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Burkina Faso"),
        e.cc2l = "BF",
        e.cc3l = "BFA",
        e.num = "854",
        e.phone = "226",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Burundi"),
        e.cc2l = "BI",
        e.cc3l = "BDI",
        e.num = "108",
        e.phone = "257",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cambodia"),
        e.cc2l = "KH",
        e.cc3l = "KHM",
        e.num = "116",
        e.phone = "855",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cameroon"),
        e.cc2l = "CM",
        e.cc3l = "CMR",
        e.num = "120",
        e.phone = "237",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Canada"),
        e.cc2l = "CA",
        e.cc3l = "CAN",
        e.num = "124",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Canary Islands"),
        e.cc2l = "IC",
        e.cc3l = "ESC",
        e.num = "895",
        e.phone = "34",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cape Verde"),
        e.cc2l = "CV",
        e.cc3l = "CPV",
        e.num = "132",
        e.phone = "238",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cayman Islands"),
        e.cc2l = "KY",
        e.cc3l = "CYM",
        e.num = "136",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Central African Republic"),
        e.cc2l = "CF",
        e.cc3l = "CAF",
        e.num = "140",
        e.phone = "236",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Chad"),
        e.cc2l = "TD",
        e.cc3l = "TCD",
        e.num = "148",
        e.phone = "235",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Chile"),
        e.cc2l = "CL",
        e.cc3l = "CHL",
        e.num = "152",
        e.phone = "56",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("China"),
        e.cc2l = "CN",
        e.cc3l = "CHN",
        e.num = "156",
        e.phone = "86",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Christmas Island"),
        e.cc2l = "CX",
        e.cc3l = "CXR",
        e.num = "162",
        e.phone = "61",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cocos (Keeling) Islands"),
        e.cc2l = "CC",
        e.cc3l = "CCK",
        e.num = "166",
        e.phone = "61",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Colombia"),
        e.cc2l = "CO",
        e.cc3l = "COL",
        e.num = "170",
        e.phone = "57",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Comoros"),
        e.cc2l = "KM",
        e.cc3l = "COM",
        e.num = "174",
        e.phone = "269",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Congo"),
        e.cc2l = "CG",
        e.cc3l = "COG",
        e.num = "178",
        e.phone = "242",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Congo, the Democratic Republic of The"),
        e.cc2l = "CD",
        e.cc3l = "COD",
        e.num = "180",
        e.phone = "243",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cook Islands"),
        e.cc2l = "CK",
        e.cc3l = "COK",
        e.num = "184",
        e.phone = "682",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Costa Rica"),
        e.cc2l = "CR",
        e.cc3l = "CRI",
        e.num = "188",
        e.phone = "506",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cote D'ivoire"),
        e.cc2l = "CI",
        e.cc3l = "CIV",
        e.num = "384",
        e.phone = "225",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Croatia"),
        e.cc2l = "HR",
        e.cc3l = "HRV",
        e.num = "191",
        e.phone = "385",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cuba"),
        e.cc2l = "CU",
        e.cc3l = "CUB",
        e.num = "192",
        e.phone = "53",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Cyprus"),
        e.cc2l = "CY",
        e.cc3l = "CYP",
        e.num = "196",
        e.phone = "357",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Czech Republic"),
        e.cc2l = "CZ",
        e.cc3l = "CZE",
        e.num = "203",
        e.phone = "420",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Denmark"),
        e.cc2l = "DK",
        e.cc3l = "DNK",
        e.num = "208",
        e.phone = "45",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Djibouti"),
        e.cc2l = "DJ",
        e.cc3l = "DJI",
        e.num = "262",
        e.phone = "253",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Dominica"),
        e.cc2l = "DM",
        e.cc3l = "DMA",
        e.num = "212",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Dominican Republic"),
        e.cc2l = "DO",
        e.cc3l = "DOM",
        e.num = "214",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Ecuador"),
        e.cc2l = "EC",
        e.cc3l = "ECU",
        e.num = "218",
        e.phone = "593",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Egypt"),
        e.cc2l = "EG",
        e.cc3l = "EGY",
        e.num = "818",
        e.phone = "20",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("El Salvador"),
        e.cc2l = "SV",
        e.cc3l = "SLV",
        e.num = "222",
        e.phone = "503",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Equatorial Guinea"),
        e.cc2l = "GQ",
        e.cc3l = "GNQ",
        e.num = "226",
        e.phone = "240",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Eritrea"),
        e.cc2l = "ER",
        e.cc3l = "ERI",
        e.num = "232",
        e.phone = "291",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Estonia"),
        e.cc2l = "EE",
        e.cc3l = "EST",
        e.num = "233",
        e.phone = "372",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Ethiopia"),
        e.cc2l = "ET",
        e.cc3l = "ETH",
        e.num = "231",
        e.phone = "251",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Falkland Islands (Malvinas)"),
        e.cc2l = "FK",
        e.cc3l = "FLK",
        e.num = "238",
        e.phone = "500",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Faroe Islands"),
        e.cc2l = "FO",
        e.cc3l = "FRO",
        e.num = "234",
        e.phone = "298",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Fiji"),
        e.cc2l = "FJ",
        e.cc3l = "FJI",
        e.num = "242",
        e.phone = "679",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Finland"),
        e.cc2l = "FI",
        e.cc3l = "FIN",
        e.num = "246",
        e.phone = "358",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("France"),
        e.cc2l = "FR",
        e.cc3l = "FRA",
        e.num = "250",
        e.phone = "33",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("French Guiana"),
        e.cc2l = "GF",
        e.cc3l = "GUF",
        e.num = "254",
        e.phone = "594",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("French Polynesia"),
        e.cc2l = "PF",
        e.cc3l = "PYF",
        e.num = "258",
        e.phone = "689",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("French Southern Territories"),
        e.cc2l = "TF",
        e.cc3l = "ATF",
        e.num = "260",
        e.phone = "596",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Gabon"),
        e.cc2l = "GA",
        e.cc3l = "GAB",
        e.num = "266",
        e.phone = "241",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Gambia"),
        e.cc2l = "GM",
        e.cc3l = "GMB",
        e.num = "270",
        e.phone = "220",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Georgia"),
        e.cc2l = "GE",
        e.cc3l = "GEO",
        e.num = "268",
        e.phone = "995",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Germany"),
        e.cc2l = "DE",
        e.cc3l = "DEU",
        e.num = "276",
        e.phone = "49",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Ghana"),
        e.cc2l = "GH",
        e.cc3l = "GHA",
        e.num = "288",
        e.phone = "233",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Gibraltar"),
        e.cc2l = "GI",
        e.cc3l = "GIB",
        e.num = "292",
        e.phone = "350",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Greece"),
        e.cc2l = "GR",
        e.cc3l = "GRC",
        e.num = "300",
        e.phone = "30",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Greenland"),
        e.cc2l = "GL",
        e.cc3l = "GRL",
        e.num = "304",
        e.phone = "299",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Grenada"),
        e.cc2l = "GD",
        e.cc3l = "GRD",
        e.num = "308",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guadeloupe"),
        e.cc2l = "GP",
        e.cc3l = "GLP",
        e.num = "312",
        e.phone = "590",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guam"),
        e.cc2l = "GU",
        e.cc3l = "GUM",
        e.num = "316",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guatemala"),
        e.cc2l = "GT",
        e.cc3l = "GTM",
        e.num = "320",
        e.phone = "502",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guernsey"),
        e.cc2l = "GG",
        e.cc3l = "GGY",
        e.num = "831",
        e.phone = "44",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guinea"),
        e.cc2l = "GN",
        e.cc3l = "GIN",
        e.num = "324",
        e.phone = "224",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guinea-Bissau"),
        e.cc2l = "GW",
        e.cc3l = "GNB",
        e.num = "624",
        e.phone = "245",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Guyana"),
        e.cc2l = "GY",
        e.cc3l = "GUY",
        e.num = "328",
        e.phone = "592",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Haiti"),
        e.cc2l = "HT",
        e.cc3l = "HTI",
        e.num = "332",
        e.phone = "509",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Heard Island and Mcdonald Islands"),
        e.cc2l = "HM",
        e.cc3l = "HMD",
        e.num = "334",
        e.phone = "672",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Holy See (Vatican City State)"),
        e.cc2l = "VA",
        e.cc3l = "VAT",
        e.num = "336",
        e.phone = "379",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Honduras"),
        e.cc2l = "HN",
        e.cc3l = "HND",
        e.num = "340",
        e.phone = "504",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Hong Kong"),
        e.cc2l = "HK",
        e.cc3l = "HKG",
        e.num = "344",
        e.phone = "852",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Hungary"),
        e.cc2l = "HU",
        e.cc3l = "HUN",
        e.num = "348",
        e.phone = "36",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Iceland"),
        e.cc2l = "IS",
        e.cc3l = "ISL",
        e.num = "352",
        e.phone = "354",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("India"),
        e.cc2l = "IN",
        e.cc3l = "IND",
        e.num = "356",
        e.phone = "91",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Indonesia"),
        e.cc2l = "ID",
        e.cc3l = "IDN",
        e.num = "360",
        e.phone = "62",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Iran (Islamic Republic Of)"),
        e.cc2l = "IR",
        e.cc3l = "IRN",
        e.num = "364",
        e.phone = "98",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Iraq"),
        e.cc2l = "IQ",
        e.cc3l = "IRQ",
        e.num = "368",
        e.phone = "964",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Ireland"),
        e.cc2l = "IE",
        e.cc3l = "IRL",
        e.num = "372",
        e.phone = "353",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Isle of Man"),
        e.cc2l = "IM",
        e.cc3l = "IMM",
        e.num = "833",
        e.phone = "44",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Israel"),
        e.cc2l = "IL",
        e.cc3l = "ISR",
        e.num = "376",
        e.phone = "972",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Italy"),
        e.cc2l = "IT",
        e.cc3l = "ITA",
        e.num = "380",
        e.phone = "39",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Jamaica"),
        e.cc2l = "JM",
        e.cc3l = "JAM",
        e.num = "388",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Japan"),
        e.cc2l = "JP",
        e.cc3l = "JPN",
        e.num = "392",
        e.phone = "81",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Jersey"),
        e.cc2l = "JE",
        e.cc3l = "JEY",
        e.num = "832",
        e.phone = "44",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Jordan"),
        e.cc2l = "JO",
        e.cc3l = "JOR",
        e.num = "400",
        e.phone = "962",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Kazakhstan"),
        e.cc2l = "KZ",
        e.cc3l = "KAZ",
        e.num = "398",
        e.phone = "7",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Kenya"),
        e.cc2l = "KE",
        e.cc3l = "KEN",
        e.num = "404",
        e.phone = "254",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Kiribati"),
        e.cc2l = "KI",
        e.cc3l = "KIR",
        e.num = "296",
        e.phone = "686",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Korea, Democratic People's Republic Of"),
        e.cc2l = "KP",
        e.cc3l = "PRK",
        e.num = "408",
        e.phone = "850",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Korea, Republic Of"),
        e.cc2l = "KR",
        e.cc3l = "KOR",
        e.num = "410",
        e.phone = "82",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Kuwait"),
        e.cc2l = "KW",
        e.cc3l = "KWT",
        e.num = "414",
        e.phone = "965",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Kyrgyzstan"),
        e.cc2l = "KG",
        e.cc3l = "KGZ",
        e.num = "417",
        e.phone = "996",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Lao People's Democratic Republic"),
        e.cc2l = "LA",
        e.cc3l = "LAO",
        e.num = "418",
        e.phone = "856",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Latvia"),
        e.cc2l = "LV",
        e.cc3l = "LVA",
        e.num = "428",
        e.phone = "371",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Lebanon"),
        e.cc2l = "LB",
        e.cc3l = "LBN",
        e.num = "422",
        e.phone = "961",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Lesotho"),
        e.cc2l = "LS",
        e.cc3l = "LSO",
        e.num = "426",
        e.phone = "266",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Liberia"),
        e.cc2l = "LR",
        e.cc3l = "LBR",
        e.num = "430",
        e.phone = "231",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Libyan Arab Jamahiriya"),
        e.cc2l = "LY",
        e.cc3l = "LBY",
        e.num = "434",
        e.phone = "218",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Liechtenstein"),
        e.cc2l = "LI",
        e.cc3l = "LIE",
        e.num = "438",
        e.phone = "423",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Lithuania"),
        e.cc2l = "LT",
        e.cc3l = "LTU",
        e.num = "440",
        e.phone = "370",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Luxembourg"),
        e.cc2l = "LU",
        e.cc3l = "LUX",
        e.num = "442",
        e.phone = "352",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Macao"),
        e.cc2l = "MO",
        e.cc3l = "MAC",
        e.num = "446",
        e.phone = "853",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Macedonia, the Former Yugoslav Republic Of"),
        e.cc2l = "MK",
        e.cc3l = "MKD",
        e.num = "807",
        e.phone = "389",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Madagascar"),
        e.cc2l = "MG",
        e.cc3l = "MDG",
        e.num = "450",
        e.phone = "261",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Malawi"),
        e.cc2l = "MW",
        e.cc3l = "MWI",
        e.num = "454",
        e.phone = "265",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Malaysia"),
        e.cc2l = "MY",
        e.cc3l = "MYS",
        e.num = "458",
        e.phone = "60",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Maldives"),
        e.cc2l = "MV",
        e.cc3l = "MDV",
        e.num = "462",
        e.phone = "960",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mali"),
        e.cc2l = "ML",
        e.cc3l = "MLI",
        e.num = "466",
        e.phone = "223",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Malta"),
        e.cc2l = "MT",
        e.cc3l = "MLT",
        e.num = "470",
        e.phone = "356",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Marshall Islands"),
        e.cc2l = "MH",
        e.cc3l = "MHL",
        e.num = "584",
        e.phone = "692",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Martinique"),
        e.cc2l = "MQ",
        e.cc3l = "MTQ",
        e.num = "474",
        e.phone = "596",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mauritania"),
        e.cc2l = "MR",
        e.cc3l = "MRT",
        e.num = "478",
        e.phone = "222",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mauritius"),
        e.cc2l = "MU",
        e.cc3l = "MUS",
        e.num = "480",
        e.phone = "230",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mayotte"),
        e.cc2l = "YT",
        e.cc3l = "MYT",
        e.num = "175",
        e.phone = "262",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mexico"),
        e.cc2l = "MX",
        e.cc3l = "MEX",
        e.num = "484",
        e.phone = "52",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Micronesia, Federated States Of"),
        e.cc2l = "FM",
        e.cc3l = "FSM",
        e.num = "583",
        e.phone = "691",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Moldova, Republic Of"),
        e.cc2l = "MD",
        e.cc3l = "MDA",
        e.num = "498",
        e.phone = "373",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Monaco"),
        e.cc2l = "MC",
        e.cc3l = "MCO",
        e.num = "492",
        e.phone = "377",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mongolia"),
        e.cc2l = "MN",
        e.cc3l = "MNG",
        e.num = "496",
        e.phone = "976",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Montenegro"),
        e.cc2l = "ME",
        e.cc3l = "MNE",
        e.num = "499",
        e.phone = "382",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Montserrat"),
        e.cc2l = "MS",
        e.cc3l = "MSR",
        e.num = "500",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Morocco"),
        e.cc2l = "MA",
        e.cc3l = "MAR",
        e.num = "504",
        e.phone = "212",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Mozambique"),
        e.cc2l = "MZ",
        e.cc3l = "MOZ",
        e.num = "508",
        e.phone = "258",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Myanmar"),
        e.cc2l = "MM",
        e.cc3l = "MMR",
        e.num = "104",
        e.phone = "95",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Namibia"),
        e.cc2l = "NA",
        e.cc3l = "NAM",
        e.num = "516",
        e.phone = "264",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Nauru"),
        e.cc2l = "NR",
        e.cc3l = "NRU",
        e.num = "520",
        e.phone = "674",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Nepal"),
        e.cc2l = "NP",
        e.cc3l = "NPL",
        e.num = "524",
        e.phone = "977",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Netherlands"),
        e.cc2l = "NL",
        e.cc3l = "NLD",
        e.num = "528",
        e.phone = "31",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Netherlands Antilles"),
        e.cc2l = "AN",
        e.cc3l = "ANT",
        e.num = "530",
        e.phone = "599",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("New Caledonia"),
        e.cc2l = "NC",
        e.cc3l = "NCL",
        e.num = "540",
        e.phone = "687",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("New Zealand"),
        e.cc2l = "NZ",
        e.cc3l = "NZL",
        e.num = "554",
        e.phone = "64",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Nicaragua"),
        e.cc2l = "NI",
        e.cc3l = "NIC",
        e.num = "558",
        e.phone = "505",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Niger"),
        e.cc2l = "NE",
        e.cc3l = "NER",
        e.num = "562",
        e.phone = "227",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Nigeria"),
        e.cc2l = "NG",
        e.cc3l = "NGA",
        e.num = "566",
        e.phone = "234",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Niue"),
        e.cc2l = "NU",
        e.cc3l = "NIU",
        e.num = "570",
        e.phone = "683",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Norfolk Island"),
        e.cc2l = "NF",
        e.cc3l = "NFK",
        e.num = "574",
        e.phone = "672",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Northern Mariana Islands"),
        e.cc2l = "MP",
        e.cc3l = "MNP",
        e.num = "580",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Norway"),
        e.cc2l = "NO",
        e.cc3l = "NOR",
        e.num = "578",
        e.phone = "47",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Oman"),
        e.cc2l = "OM",
        e.cc3l = "OMN",
        e.num = "512",
        e.phone = "968",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Pakistan"),
        e.cc2l = "PK",
        e.cc3l = "PAK",
        e.num = "586",
        e.phone = "92",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Palau"),
        e.cc2l = "PW",
        e.cc3l = "PLW",
        e.num = "585",
        e.phone = "680",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Palestinian Territories"),
        e.cc2l = "PS",
        e.cc3l = "PSE",
        e.num = "275",
        e.phone = "970",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Panama"),
        e.cc2l = "PA",
        e.cc3l = "PAN",
        e.num = "591",
        e.phone = "507",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Papua New Guinea"),
        e.cc2l = "PG",
        e.cc3l = "PNG",
        e.num = "598",
        e.phone = "675",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Paraguay"),
        e.cc2l = "PY",
        e.cc3l = "PRY",
        e.num = "600",
        e.phone = "595",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Peru"),
        e.cc2l = "PE",
        e.cc3l = "PER",
        e.num = "604",
        e.phone = "51",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Philippines"),
        e.cc2l = "PH",
        e.cc3l = "PHL",
        e.num = "608",
        e.phone = "63",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Pitcairn"),
        e.cc2l = "PN",
        e.cc3l = "PCN",
        e.num = "612",
        e.phone = "872",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Poland"),
        e.cc2l = "PL",
        e.cc3l = "POL",
        e.num = "616",
        e.phone = "48",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Portugal"),
        e.cc2l = "PT",
        e.cc3l = "PRT",
        e.num = "620",
        e.phone = "351",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Puerto Rico"),
        e.cc2l = "PR",
        e.cc3l = "PRI",
        e.num = "630",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Qatar"),
        e.cc2l = "QA",
        e.cc3l = "QAT",
        e.num = "634",
        e.phone = "974",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Reunion"),
        e.cc2l = "RE",
        e.cc3l = "REU",
        e.num = "638",
        e.phone = "262",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Romania"),
        e.cc2l = "RO",
        e.cc3l = "ROU",
        e.num = "642",
        e.phone = "40",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Russian Federation"),
        e.cc2l = "RU",
        e.cc3l = "RUS",
        e.num = "643",
        e.phone = "7",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Rwanda"),
        e.cc2l = "RW",
        e.cc3l = "RWA",
        e.num = "646",
        e.phone = "250",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Barthelemy"),
        e.cc2l = "BL",
        e.cc3l = "BLM",
        e.num = "652",
        e.phone = "590",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Helena"),
        e.cc2l = "SH",
        e.cc3l = "SHN",
        e.num = "654",
        e.phone = "290",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Kitts and Nevis"),
        e.cc2l = "KN",
        e.cc3l = "KNA",
        e.num = "659",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Lucia"),
        e.cc2l = "LC",
        e.cc3l = "LCA",
        e.num = "662",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Martin (French Part)"),
        e.cc2l = "MF",
        e.cc3l = "MAF",
        e.num = "663",
        e.phone = "590",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Pierre and Miquelon"),
        e.cc2l = "PM",
        e.cc3l = "SPM",
        e.num = "666",
        e.phone = "508",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saint Vincent and the Grenadines"),
        e.cc2l = "VC",
        e.cc3l = "VCT",
        e.num = "670",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Samoa"),
        e.cc2l = "WS",
        e.cc3l = "WSM",
        e.num = "882",
        e.phone = "685",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("San Marino"),
        e.cc2l = "SM",
        e.cc3l = "SMR",
        e.num = "674",
        e.phone = "378",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Sao Tome and Principe"),
        e.cc2l = "ST",
        e.cc3l = "STP",
        e.num = "678",
        e.phone = "239",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Saudi Arabia"),
        e.cc2l = "SA",
        e.cc3l = "SAU",
        e.num = "682",
        e.phone = "966",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Senegal"),
        e.cc2l = "SN",
        e.cc3l = "SEN",
        e.num = "686",
        e.phone = "221",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Serbia"),
        e.cc2l = "RS",
        e.cc3l = "SRB",
        e.num = "688",
        e.phone = "381",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Seychelles"),
        e.cc2l = "SC",
        e.cc3l = "SYC",
        e.num = "690",
        e.phone = "248",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Sierra Leone"),
        e.cc2l = "SL",
        e.cc3l = "SLE",
        e.num = "694",
        e.phone = "232",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Singapore"),
        e.cc2l = "SG",
        e.cc3l = "SGP",
        e.num = "702",
        e.phone = "65",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Slovakia"),
        e.cc2l = "SK",
        e.cc3l = "SVK",
        e.num = "703",
        e.phone = "421",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Slovenia"),
        e.cc2l = "SI",
        e.cc3l = "SVN",
        e.num = "705",
        e.phone = "386",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Solomon Islands"),
        e.cc2l = "SB",
        e.cc3l = "SLB",
        e.num = "90",
        e.phone = "677",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Somalia"),
        e.cc2l = "SO",
        e.cc3l = "SOM",
        e.num = "706",
        e.phone = "252",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("South Africa"),
        e.cc2l = "ZA",
        e.cc3l = "ZAF",
        e.num = "710",
        e.phone = "27",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("South Georgia and the South Sandwich Islands"),
        e.cc2l = "GS",
        e.cc3l = "SGS",
        e.num = "239",
        e.phone = "995",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Spain"),
        e.cc2l = "ES",
        e.cc3l = "ESP",
        e.num = "724",
        e.phone = "34",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Sri Lanka"),
        e.cc2l = "LK",
        e.cc3l = "LKA",
        e.num = "144",
        e.phone = "94",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Sudan"),
        e.cc2l = "SD",
        e.cc3l = "SDN",
        e.num = "736",
        e.phone = "249",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Suriname"),
        e.cc2l = "SR",
        e.cc3l = "SUR",
        e.num = "740",
        e.phone = "597",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Svalbard and Jan Mayen"),
        e.cc2l = "SJ",
        e.cc3l = "SJM",
        e.num = "744",
        e.phone = "47",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Swaziland"),
        e.cc2l = "SZ",
        e.cc3l = "SWZ",
        e.num = "748",
        e.phone = "268",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Sweden"),
        e.cc2l = "SE",
        e.cc3l = "SWE",
        e.num = "752",
        e.phone = "46",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Switzerland"),
        e.cc2l = "CH",
        e.cc3l = "CHE",
        e.num = "756",
        e.phone = "41",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Syrian Arab Republic"),
        e.cc2l = "SY",
        e.cc3l = "SYR",
        e.num = "760",
        e.phone = "963",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Taiwan"),
        e.cc2l = "TW",
        e.cc3l = "TWN",
        e.num = "158",
        e.phone = "886",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Tajikistan"),
        e.cc2l = "TJ",
        e.cc3l = "TJK",
        e.num = "762",
        e.phone = "992",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Tanzania, United Republic Of"),
        e.cc2l = "TZ",
        e.cc3l = "TZA",
        e.num = "834",
        e.phone = "255",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Thailand"),
        e.cc2l = "TH",
        e.cc3l = "THA",
        e.num = "764",
        e.phone = "66",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Timor-Leste"),
        e.cc2l = "TL",
        e.cc3l = "TLS",
        e.num = "626",
        e.phone = "670",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Togo"),
        e.cc2l = "TG",
        e.cc3l = "TGO",
        e.num = "768",
        e.phone = "228",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Tokelau"),
        e.cc2l = "TK",
        e.cc3l = "TKL",
        e.num = "772",
        e.phone = "690",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Tonga"),
        e.cc2l = "TO",
        e.cc3l = "TON",
        e.num = "776",
        e.phone = "676",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Trinidad and Tobago"),
        e.cc2l = "TT",
        e.cc3l = "TTO",
        e.num = "780",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Tunisia"),
        e.cc2l = "TN",
        e.cc3l = "TUN",
        e.num = "788",
        e.phone = "216",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Turkey"),
        e.cc2l = "TR",
        e.cc3l = "TUR",
        e.num = "792",
        e.phone = "90",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Turkmenistan"),
        e.cc2l = "TM",
        e.cc3l = "TKM",
        e.num = "795",
        e.phone = "993",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Turks and Caicos Islands"),
        e.cc2l = "TC",
        e.cc3l = "TCA",
        e.num = "796",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Tuvalu"),
        e.cc2l = "TV";
        e.cc3l = "TUV",
        e.num = "798",
        e.phone = "688",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Uganda"),
        e.cc2l = "UG",
        e.cc3l = "UGA",
        e.num = "800",
        e.phone = "256",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Ukraine"),
        e.cc2l = "UA",
        e.cc3l = "UKR",
        e.num = "804",
        e.phone = "380",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("United Arab Emirates"),
        e.cc2l = "AE",
        e.cc3l = "ARE",
        e.num = "784",
        e.phone = "971",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("United Kingdom"),
        e.cc2l = "GB",
        e.cc3l = "GBR",
        e.num = "826",
        e.phone = "44",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("United States"),
        e.cc2l = "US",
        e.cc3l = "USA",
        e.num = "840",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("United States Minor Outlying Islands"),
        e.cc2l = "UM",
        e.cc3l = "UMI",
        e.num = "581",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Uruguay"),
        e.cc2l = "UY",
        e.cc3l = "URY",
        e.num = "858",
        e.phone = "598",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Uzbekistan"),
        e.cc2l = "UZ",
        e.cc3l = "UZB",
        e.num = "860",
        e.phone = "998",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Vanuatu"),
        e.cc2l = "VU",
        e.cc3l = "VUT",
        e.num = "548",
        e.phone = "678",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Venezuela"),
        e.cc2l = "VE",
        e.cc3l = "VEN",
        e.num = "862",
        e.phone = "58",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Viet Nam"),
        e.cc2l = "VN",
        e.cc3l = "VNM",
        e.num = "704",
        e.phone = "84",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Virgin Islands (British)"),
        e.cc2l = "VG",
        e.cc3l = "VGB",
        e.num = "92",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Virgin Islands (U.S.)"),
        e.cc2l = "VI",
        e.cc3l = "VIR",
        e.num = "850",
        e.phone = "1",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Wallis and Futuna"),
        e.cc2l = "WF",
        e.cc3l = "WLF",
        e.num = "876",
        e.phone = "681",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Western Sahara"),
        e.cc2l = "EH",
        e.cc3l = "ESH",
        e.num = "732",
        e.phone = "212",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Yemen"),
        e.cc2l = "YE",
        e.cc3l = "YEM",
        e.num = "887",
        e.phone = "967",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Yugoslavia"),
        e.cc2l = "YU",
        e.cc3l = "YUG",
        e.num = "891",
        e.phone = "381",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Zambia"),
        e.cc2l = "ZM",
        e.cc3l = "ZMB",
        e.num = "894",
        e.phone = "260",
        all_countries[all_countries.length] = e,
        (e = new countryinfo).name = LP.lpgs("Zimbabwe"),
        e.cc2l = "ZW",
        e.cc3l = "ZWE",
        e.num = "716",
        e.phone = "263",
        all_countries[all_countries.length] = e
    }
}
function cc3lFromcc2l(e) {
    for (var t = 0; t < all_countries.length; t++)
        if (all_countries[t].cc2l == e)
            return all_countries[t].cc3l;
    return all_countries[0].cc3l
}
this.httptest = function() {
    var e = (new Date).getTime();
    if (!(0 < lplasthttptest))
        if (lplasthttptest = e,
        "undefined" != typeof FROMPARTNER || "undefined" != typeof g_skiphttptest && 1 == g_skiphttptest || void 0 !== lpdohttptest && !lpdohttptest)
            LP.islastpass && LP.lplogincheck("httptest");
        else if (!lploggedin) {
            "function" == typeof lpSetupXHRIntercepts && lpSetupXHRIntercepts(),
            loginoffline(!0, "httptest");
            var t = LP.lp_base + "httptest.php";
            t = t.replace(/^https:\/\//, "http://"),
            LP.lpMakeRequest(t, "", httptestresponse, httptesterror)
        }
}
;
var lp_premium_exp = 0
  , lp_enterpriseuser = 0
  , lp_wote = 0
  , lp_fete = 0
  , lp_trueapi_trial_exp = 0
  , lp_captcha_regexp = null
  , lp_shared_folder_keys_upload = ""
  , lp_shared_folder_keys_upload_counter = 0
  , lp_look_for_invalid_types = !1
  , lp_found_invalid_type = !1;
function parsemobile(e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M) {
    lp_look_for_invalid_types && (lp_found_invalid_type = !1),
    msfids = new Array,
    p && (void 0 === p.neveraccounts && (p.neveraccounts = new Array),
    void 0 === p.nevergenerates && (p.nevergenerates = new Array),
    void 0 === p.neverformfills && (p.neverformfills = new Array),
    void 0 === p.neverautologins && (p.neverautologins = new Array),
    void 0 === p.nevershowicons && (p.nevershowicons = new Array),
    void 0 === p.onlyaccounts && (p.onlyaccounts = new Array),
    void 0 === p.onlygenerates && (p.onlygenerates = new Array),
    void 0 === p.onlyformfills && (p.onlyformfills = new Array),
    void 0 === p.onlyautologins && (p.onlyautologins = new Array),
    void 0 === p.onlyshowicons && (p.onlyshowicons = new Array),
    void 0 === p.neverenablelp && (p.neverenablelp = new Array),
    void 0 === p.onlyenablelp && (p.onlyenablelp = new Array),
    void 0 === p.onlympwreuse && (p.onlympwreuse = new Array),
    void 0 === p.nevermpwreuse && (p.nevermpwreuse = new Array)),
    0 == r && (lp_shared_folder_keys_upload = "",
    lp_shared_folder_keys_upload_counter = lp_fete = lp_wote = lp_trueapi_trial_exp = 0,
    g_enterpriseoffering = null),
    null != A && void 0 !== A || (A = g_local_key,
    void 0 !== g_local_key_hex && null != g_local_key_hex && 0 != g_local_key_hex.length || (g_local_key_hex = AES.bin2hex(g_local_key)),
    k = g_local_key_hex);
    var j = 0
      , U = i && 0 < i.length ? i.length - 1 : -1
      , G = l && 0 < l.length ? l.length - 1 : 0
      , q = !1;
    void 0 !== B && !B || "LPAV" == e.substring(0, 4) || (r = t),
    (x = x || new Array).maxid = 0,
    P = P || new Array;
    var H = "", K;
    try {
        for (; r < t; ) {
            var V = e.substring(r, r + 4)
              , J = unserialize_num(e.substring(r + 4, r + 8));
            if ("ACCT" == V && "error" != C) {
                var W = r + 8, Y;
                if (W += mget(e, W, Y = {}, "aid"),
                W += mget(e, W, Y, "encname"),
                "undefined" == typeof parsedonotdecryptnames ? Y.name = lpmdec(Y.encname, 1, A, k, Y.aid) : Y.name = Y.encname,
                Y.isHidden = !!C && C.isHidden,
                W += mget(e, W, Y, "encgroup"),
                Y.group = lpmdec(Y.encgroup, 1, A, k, Y.aid),
                C && A != g_local_key && ("" == Y.group ? Y.group = C.decsharename : Y.group = C.decsharename + "\\" + Y.group),
                W += mget(e, W, Y, "url"),
                W += mget(e, W, Y, "extra"),
                W += mget(e, W, Y, "fav"),
                W += mget(e, W, Y, "sharedfromaid"),
                W += mget(e, W, Y, "username"),
                W += mget(e, W, Y, "password"),
                W += mget(e, W, Y, "pwprotect"),
                Y.pwprotect = "1" == Y.pwprotect,
                W += mget(e, W, Y, "genpw"),
                Y.genpw = "1" == Y.genpw,
                W += mget(e, W, Y, "sn"),
                Y.sn = "1" == Y.sn,
                W += mget(e, W, Y, "last_touch"),
                W += mget(e, W, Y, "autologin"),
                Y.autologin = "1" == Y.autologin,
                W += mget(e, W, Y, "never_autofill"),
                Y.never_autofill = "1" == Y.never_autofill,
                W += mget(e, W, Y, "realm_data"),
                W += mget(e, W, Y, "fiid"),
                (W += mget(e, W, Y, "custom_js")) < r + J + 8 && (W += mget(e, W, Y, "submit_id")),
                W < r + J + 8 && (W += mget(e, W, Y, "captcha_id")),
                W < r + J + 8 && (W += mget(e, W, Y, "urid")),
                W < r + J + 8 && (W += mget(e, W, Y, "basic_auth")),
                W < r + J + 8 && (W += mget(e, W, Y, "method")),
                W < r + J + 8 && (W += mget(e, W, Y, "action")),
                W < r + J + 8 && (W += mget(e, W, Y, "groupid")),
                W < r + J + 8 && (W += mget(e, W, Y, "deleted")),
                W < r + J + 8 && (W += mget(e, W, Y, "attachkey"),
                W += mget(e, W, Y, "attachpresent")),
                W < r + J + 8 ? (W += mget(e, W, Y, "individualshare"),
                Y.individualshare = "1" == Y.individualshare) : Y.individualshare = !1,
                W < r + J + 8 ? W += mget(e, W, Y, "notetype") : Y.notetype = "",
                W < r + J + 8 ? W += mget(e, W, Y, "noalert") : Y.noalert = "",
                W < r + J + 8 ? W += mget(e, W, Y, "last_modified_gmt") : Y.last_modified_gmt = "",
                W < r + J + 8 ? W += mget(e, W, Y, "hasbeenshared") : Y.hasbeenshared = "",
                W < r + J + 8 ? W += mget(e, W, Y, "last_pwchange_gmt") : Y.last_pwchange_gmt = "",
                W < r + J + 8 ? W += mget(e, W, Y, "created_gmt") : Y.created_gmt = "",
                W < r + J + 8 ? W += mget(e, W, Y, "vulnerable") : Y.vulnerable = "",
                W < r + J + 8 ? W += mget(e, W, Y, "pwch") : Y.pwch = "0",
                W < r + J + 8 ? W += mget(e, W, Y, "breached") : Y.breached = "0",
                W < r + J + 8 ? W += mget(e, W, Y, "template") : Y.template = "",
                Y.fields = new Array,
                void 0 !== C && null != C && A != g_local_key && (Y.sharefolderid = C.id,
                0 == C.give && (Y.sharedfromaid = 1)),
                T && Y.aid && (Y.aid == T || Y.aid == T.toString()))
                    return Y;
                Y.sn ? !a || T || Y.isHidden ? !T && Y.isHidden && void 0 !== M && null != M && M.push(Y) : a.push(Y) : i && !T && (U = i.length,
                i.push(Y)),
                j++
            } else if ("SPMT" == V) {
                if (s) {
                    var W = r + 8;
                    W += mget(e, W, s, "login_site_prompt"),
                    s.login_site_prompt = "1" == s.login_site_prompt,
                    W += mget(e, W, s, "edit_site_prompt"),
                    s.edit_site_prompt = "1" == s.edit_site_prompt,
                    W += mget(e, W, s, "edit_sn_prompt"),
                    s.edit_sn_prompt = "1" == s.edit_sn_prompt,
                    W += mget(e, W, s, "view_pw_prompt"),
                    s.view_pw_prompt = "1" == s.view_pw_prompt,
                    W += mget(e, W, s, "view_ff_prompt"),
                    s.view_ff_prompt = "1" == s.view_ff_prompt,
                    W += mget(e, W, s, "improve"),
                    s.improve = "1" == s.improve,
                    W += mget(e, W, s, "switch_identity_prompt"),
                    s.switch_identity_prompt = "1" == s.switch_identity_prompt,
                    W += mget(e, W, s, "switch_f_prompt"),
                    s.switch_f_prompt = "1" == s.switch_f_prompt,
                    W < r + J + 8 ? (W += mget(e, W, s, "multifactor_reprompt"),
                    s.multifactor_reprompt = "1" == s.multifactor_reprompt) : s.multifactor_reprompt = !1,
                    W < r + J + 8 ? (W += mget(e, W, s, "company_login_site_prompt"),
                    s.company_login_site_prompt = "1" == s.company_login_site_prompt) : s.company_login_site_prompt = !1,
                    W < r + J + 8 ? (W += mget(e, W, s, "company_copyview_site_prompt"),
                    s.company_copyview_site_prompt = "1" == s.company_copyview_site_prompt) : s.company_copyview_site_prompt = !1
                }
            } else if ("PREF" == V) {
                if (y) {
                    var W = r + 8;
                    W += mget(e, W, y, "allowmasterpasswordsave"),
                    W += mget(e, W, y, "logoffclosebrowser"),
                    (W += mget(e, W, y, "logoffidle")) < r + J + 8 && (W += mget(e, W, y, "noexport")),
                    W < r + J + 8 && (W += mget(e, W, y, "logofflock")),
                    W < r + J + 8 && (W += mget(e, W, y, "logoffscreen")),
                    W < r + J + 8 && (W += mget(e, W, y, "logoffshutdown")),
                    W < r + J + 8 && (W += mget(e, W, y, "sitepwlen")),
                    W < r + J + 8 && (W += mget(e, W, y, "hideidentities")),
                    W < r + J + 8 && (W += mget(e, W, y, "savesitestopersonal")),
                    W < r + J + 8 && (W += mget(e, W, y, "import")),
                    W < r + J + 8 && (W += mget(e, W, y, "share")),
                    W < r + J + 8 && (W += mget(e, W, y, "shareout")),
                    W < r + J + 8 && (W += mget(e, W, y, "share_onlyfolders")),
                    W < r + J + 8 && (W += mget(e, W, y, "sharedomain_allowed")),
                    W < r + J + 8 && (W += mget(e, W, y, "revert")),
                    W < r + J + 8 && (W += mget(e, W, y, "show_notes")),
                    W < r + J + 8 && (W += mget(e, W, y, "show_fingerprint")),
                    W < r + J + 8 && (W += mget(e, W, y, "bookmarklets")),
                    W < r + J + 8 && (W += mget(e, W, y, "hint")),
                    W < r + J + 8 && (W += mget(e, W, y, "account_recovery")),
                    W < r + J + 8 && (W += mget(e, W, y, "link_personal")),
                    W < r + J + 8 && (W += mget(e, W, y, "multifactor_disable")),
                    W < r + J + 8 && (W += mget(e, W, y, "show_reprompt_on_copy")),
                    W < r + J + 8 && (W += mget(e, W, y, "requirechangereuse")),
                    W < r + J + 8 && (W += mget(e, W, y, "logname")),
                    W < r + J + 8 && (W += mget(e, W, y, "show_formfills")),
                    W < r + J + 8 && (W += mget(e, W, y, "accountselectionbasedonemail")),
                    W < r + J + 8 && (W += mget(e, W, y, "personalaccountneedsverification")),
                    W < r + J + 8 && (W += mget(e, W, y, "noformfill"),
                    0 <= y.noformfill.indexOf(",") ? y.noformfill = y.noformfill.split(",") : y.noformfill ? y.noformfill = [y.noformfill] : y.noformfill = [])
                }
            } else if ("LPFF" == V && "error" != C) {
                if (l) {
                    var W = r + 8
                      , X = {};
                    W += mget(e, W, X, "ffid"),
                    W += mget(e, W, X, "profiletype"),
                    W += mget(e, W, X, "profilename"),
                    W += mget(e, W, X, "profilelanguage"),
                    W += mget(e, W, X, "firstname"),
                    W += mget(e, W, X, "middlename"),
                    W += mget(e, W, X, "lastname"),
                    W += mget(e, W, X, "email"),
                    W += mget(e, W, X, "company"),
                    W += mget(e, W, X, "ssn"),
                    W += mget(e, W, X, "birthday"),
                    W += mget(e, W, X, "address1"),
                    W += mget(e, W, X, "address2"),
                    W += mget(e, W, X, "city"),
                    W += mget(e, W, X, "state"),
                    W += mget(e, W, X, "state_name"),
                    W += mget(e, W, X, "zip"),
                    W += mget(e, W, X, "country"),
                    W += mget(e, W, X, "country_cc3l"),
                    W += mget(e, W, X, "country_name"),
                    W += mget(e, W, X, "mobilephone"),
                    W += mget(e, W, X, "mobilephone3lcc"),
                    W += mget(e, W, X, "mobileext"),
                    W += mget(e, W, X, "evephone"),
                    W += mget(e, W, X, "evephone3lcc"),
                    W += mget(e, W, X, "eveext"),
                    W += mget(e, W, X, "phone"),
                    W += mget(e, W, X, "phone3lcc"),
                    W += mget(e, W, X, "phoneext"),
                    W += mget(e, W, X, "fax"),
                    W += mget(e, W, X, "fax3lcc"),
                    W += mget(e, W, X, "faxext"),
                    W += mget(e, W, X, "ccnum"),
                    W += mget(e, W, X, "ccexp"),
                    W += mget(e, W, X, "cccsc"),
                    W += mget(e, W, X, "username"),
                    W += mget(e, W, X, "address3"),
                    W += mget(e, W, X, "title"),
                    W += mget(e, W, X, "gender"),
                    W += mget(e, W, X, "driverlicensenum"),
                    W += mget(e, W, X, "taxid"),
                    W += mget(e, W, X, "pwprotect"),
                    X.pwprotect = "1" == X.pwprotect,
                    W += mget(e, W, X, "bankname"),
                    W += mget(e, W, X, "bankacctnum"),
                    W += mget(e, W, X, "bankroutingnum"),
                    W += mget(e, W, X, "timezone"),
                    W += mget(e, W, X, "county"),
                    W += mget(e, W, X, "ccstart"),
                    W += mget(e, W, X, "ccname"),
                    W += mget(e, W, X, "ccissuenum"),
                    (W += mget(e, W, X, "notes")) < r + J + 8 && (W += mget(e, W, X, "lastname2")),
                    W < r + J + 8 && (W += mget(e, W, X, "mobileemail"),
                    W += mget(e, W, X, "firstname2"),
                    W += mget(e, W, X, "firstname3"),
                    W += mget(e, W, X, "lastname3")),
                    X.creditmon = 0,
                    W < r + J + 8 && (W += mget(e, W, X, "creditmon"),
                    X.creditmon = "1" == X.creditmon ? 1 : 0),
                    X.custom_fields = new Array,
                    void 0 !== C && null != C && A != g_local_key ? (X.sharefolderid = C.id,
                    0 == C.give && (X.sharedfromaid = 1),
                    X.group = C.decsharename) : X.group = "",
                    G = l.length,
                    l.push(X)
                }
            } else if ("IDNT" == V) {
                if (c) {
                    var W = r + 8
                      , Z = {};
                    W += mget(e, W, Z, "iid"),
                    W += mget(e, W, Z, "iname"),
                    W += mget(e, W, Z, "aids"),
                    W += mget(e, W, Z, "ffids"),
                    W += mget(e, W, Z, "pw_prompt"),
                    Z.pw_prompt = "1" == Z.pw_prompt,
                    W < r + J + 8 ? W += mget(e, W, Z, "appaids") : Z.appaids = "",
                    c.push(Z)
                }
            } else if ("PNDG" == V) {
                if (m) {
                    var W = r + 8
                      , Q = {};
                    W += mget(e, W, Q, "id"),
                    W += mget(e, W, Q, "fiid"),
                    W += mget(e, W, Q, "sharerusername"),
                    W += mget(e, W, Q, "sharedfromaid"),
                    W += mget(e, W, Q, "sharemessage"),
                    W += mget(e, W, Q, "sharekeyenchex"),
                    W += mget(e, W, Q, "sharekeyenchexsig"),
                    W += mget(e, W, Q, "sharename"),
                    W += mget(e, W, Q, "sharegroup"),
                    W += mget(e, W, Q, "username"),
                    W += mget(e, W, Q, "password"),
                    W += mget(e, W, Q, "extra"),
                    W += mget(e, W, Q, "shareautoaccept"),
                    Q.shareafids = {};
                    var $ = new Array;
                    W += mget(e, W, $, "numafids");
                    for (var ee = 0; ee < $.numafids; ee++) {
                        var te = new Array;
                        W += mget(e, W, te, "afid"),
                        W += mget(e, W, te, "value"),
                        Q.shareafids[te.afid] = te.value
                    }
                    W += mget(e, W, Q, "attachkey"),
                    (W += mget(e, W, Q, "save_all")) < r + J + 8 ? W += mget(e, W, Q, "template") : Q.template = "",
                    W < r + J + 8 ? W += mget(e, W, Q, "emailverified") : Q.emailverified = "-1",
                    Q.save_all = "1" === Q.save_all,
                    m.push(Q)
                }
            } else if ("SHAP" == V) {
                if (h) {
                    var W = r + 8
                      , ne = new Array;
                    for (W += mget(e, W, ne, "aid"); W < r + J + 8; ) {
                        var te = new Array;
                        W += mget(e, W, te, "name"),
                        W += mget(e, W, te, "value"),
                        ne[te.name] = te.value
                    }
                    h.push(ne)
                }
            } else if ("FFCF" == V && "error" != C) {
                if (l) {
                    var W = r + 8
                      , re = {};
                    W += mget(e, W, re, "cfid"),
                    W += mget(e, W, re, "text"),
                    W += mget(e, W, re, "value"),
                    W += mget(e, W, re, "alttext"),
                    l[G].custom_fields.push(re)
                }
            } else if ("EQDN" == V) {
                if (u) {
                    var W = r + 8
                      , oe = new Array;
                    W += mget(e, W, oe, "edid"),
                    W += mget(e, W, oe, "domain"),
                    oe.domain = AES.hex2url(oe.domain),
                    void 0 === u[oe.edid] && (u[oe.edid] = new Array),
                    u[oe.edid][u[oe.edid].length] = oe.domain,
                    u[oe.domain] = oe.edid
                }
            } else if ("URUL" == V) {
                if (_) {
                    var W = r + 8
                      , ie = new Array;
                    W += mget(e, W, ie, "url"),
                    (W += mget(e, W, ie, "exacthost")) < r + J + 8 ? W += mget(e, W, ie, "exactport") : ie.exactport = "0",
                    W < r + J + 8 ? W += mget(e, W, ie, "case_insensitive") : ie.case_insensitive = "0",
                    ie.url = AES.hex2url(ie.url),
                    "1" == ie.case_insensitive && (ie.url = ie.url.toLowerCase()),
                    _.push(ie)
                }
            } else if ("GRPI" == V)
                ;
            else if ("NEVR" == V) {
                if (p) {
                    var W = r + 8
                      , ae = new Array;
                    W += mget(e, W, ae, "type"),
                    W += mget(e, W, ae, "url"),
                    ae.url = AES.hex2url(ae.url),
                    "0" == ae.type ? p.neveraccounts.push(ae.url) : "1" == ae.type ? p.nevergenerates.push(ae.url) : "2" == ae.type ? p.neverformfills.push(ae.url) : "3" == ae.type ? p.neverautologins.push(ae.url) : "6" == ae.type ? p.nevershowicons.push(ae.url) : "8" == ae.type ? p.neverenablelp.push(ae.url) : "9" == ae.type ? p.nevermpwreuse.push(ae.url) : "10000" == ae.type ? p.onlyaccounts.push(ae.url) : "10001" == ae.type ? p.onlygenerates.push(ae.url) : "10002" == ae.type ? p.onlyformfills.push(ae.url) : "10003" == ae.type ? p.onlyautologins.push(ae.url) : "10006" == ae.type ? p.onlyshowicons.push(ae.url) : "10008" == ae.type && p.onlyenablelp.push(ae.url)
                }
            } else if ("ACFL" != V && "ACOF" != V || "error" == C) {
                if ("PREM" == V)
                    lp_premium_exp = response_substring(e, r + 8, r + 8 + J);
                else if ("TATE" == V)
                    lp_trueapi_trial_exp = response_substring(e, r + 8, r + 8 + J);
                else if ("WOTE" == V)
                    lp_wote = response_substring(e, r + 8, r + 8 + J);
                else if ("FETE" == V)
                    lp_fete = response_substring(e, r + 8, r + 8 + J);
                else if ("ENCU" == V)
                    f = response_substring(e, r + 8, r + 8 + J);
                else if ("PRIK" == V)
                    g_rsaprivatekeyenchex = response_substring(e, r + 8, r + 8 + J);
                else if ("MXID" == V) {
                    var se = parseInt(response_substring(e, r + 8, r + 8 + J));
                    se > x.maxid && (x.maxid = se)
                } else if ("ATVR" == V) {
                    var le = parseInt(response_substring(e, r + 8, r + 8 + J));
                    (P = P || new Array).attachversion = le
                } else if ("SHAR" == V || "SHAL" == V || "HSHR" == V) {
                    var ce = "HSHR" == V, W = r + 8, ue = void 0 !== w && null != w && "" != w, pe, pe;
                    if (null != b)
                        if (W += mget(e, W, pe = {}, "id"),
                        W += mget(e, W, pe, "sharekey"),
                        W += mget(e, W, pe, "sharename"),
                        W += mget(e, W, pe, "readonly"),
                        (W += mget(e, W, pe, "give")) < r + J + 8 ? W += mget(e, W, pe, "sharekeyaes") : pe.sharekeyaes = "",
                        W < r + J + 8 ? W += mget(e, W, pe, "associative") : pe.associative = "0",
                        W < r + J + 8 ? W += mget(e, W, pe, "accepted") : pe.accepted = "1",
                        "0" === pe.accepted)
                            D && D.push(pe);
                        else if ("function" == typeof lpdbg && lpdbg("sharedfolders", "Attempting to add shared folder: " + pe.id),
                        ue || "" != pe.sharekeyaes) {
                            var de = null;
                            try {
                                "SHAL" == V && null == de && "" != pe.sharekeyaes ? (de = lpmdec(pe.sharekeyaes, !0, H),
                                pe.linkedshare = "1") : null == de && "" != pe.sharekeyaes && (de = lpmdec(pe.sharekeyaes, !0),
                                "1" == pe.associative && (H = AES.hex2bin(de)));
                                var ge = !1;
                                if (null == de || "" == de)
                                    var fe;
                                if ((null == de || "" == de) && ue) {
                                    if ("function" == typeof lpusexpcomencrypt && lpusexpcomencrypt() && "function" == typeof lpxpcomobj.xCryptoRSADecrypt && (null != (de = AES.hex2bin(lpxpcomobj.xCryptoRSADecrypt(w, pe.sharekey))) && "" != de || "function" != typeof lpdbg || (logMissingSharedFolder(new Error("Share key decrypt failed"), g_uid, pe.id),
                                    lpdbg("sharedfolders", "Share key decrypt failed"))),
                                    null == de && "function" == typeof have_nplastpass && have_nplastpass() && "undefined" != typeof g_nplastpass && "function" == typeof g_nplastpass.xCryptoRSADecrypt && (de = AES.hex2bin(g_nplastpass.xCryptoRSADecrypt(w, pe.sharekey))),
                                    null == de || "" == de) {
                                        var me = new RSAKey;
                                        parse_private_key(me, w) && (de = me.decrypt(pe.sharekey),
                                        "1" == pe.associative && (H = AES.hex2bin(de)))
                                    }
                                    null != de && "" != de && "function" == typeof crypto_btoa && (pe.sharekeyaes = lpmenc(de, !0),
                                    lp_shared_folder_keys_upload += "&shareid" + lp_shared_folder_keys_upload_counter + "=" + encodeURIComponent(pe.id),
                                    lp_shared_folder_keys_upload += "&sharekey" + lp_shared_folder_keys_upload_counter + "=" + encodeURIComponent(pe.sharekey),
                                    lp_shared_folder_keys_upload += "&sharekeyaes" + lp_shared_folder_keys_upload_counter + "=" + encodeURIComponent(crypto_btoa(pe.sharekeyaes)),
                                    lp_shared_folder_keys_upload_counter++)
                                }
                                if (null != de && "" != de) {
                                    var he = AES.hex2bin(de), xe = lpmdec(pe.sharename, 0, he, de), Y;
                                    if (pe.key = he,
                                    pe.decsharename = xe,
                                    (Y = {}).aid = pe.id,
                                    Y.name = "",
                                    Y.group = xe,
                                    Y.url = AES.url2hex("http://group"),
                                    Y.sharefolderid = pe.id,
                                    Y.fields = new Array,
                                    Y.otherfields = new Array,
                                    T && Y.aid && (Y.aid == T || Y.aid == T.toString()))
                                        return Y;
                                    T || ce ? !T && ce && void 0 !== z && null != z && z.push(Y) : i.push(Y),
                                    A = he,
                                    k = de,
                                    (C = pe).isHidden = ce,
                                    T || ce ? !T && ce && void 0 !== F && null != F && F.push(pe) : b.push(pe),
                                    "function" == typeof lpdbg && lpdbg("sharedfolders", "Added shared folder: " + xe + " (" + pe.id + ")")
                                } else
                                    C = "error",
                                    logMissingSharedFolder(new Error("Cannot decrypt share key",g_uid,pe.id)),
                                    "function" == typeof lpdbg && lpdbg("sharedfolders", "Cannot decrypt share key: " + pe.sharekey)
                            } catch (e) {
                                logMissingSharedFolder(e, g_uid, pe.id),
                                "undefined" != typeof console && "function" == typeof console.error ? console.error(e) : "function" == typeof lpdbg && lpdbg("sharedfolders", e),
                                C = "error"
                            }
                        } else
                            C = "error";
                    else
                        C = "error";
                    if ("error" == C && (logMissingSharedFolder(new Error("SHARE ERROR"), g_uid, pe.id),
                    "function" == typeof lpdbg && lpdbg("sharedfolders", "SHARE ERROR"),
                    U = -1),
                    (void 0 === w || null == w || "" == w) && null != b && 0 == b.length)
                        (pe = new Array).id = 0,
                        b.push(pe)
                } else if ("MSFI" == V) {
                    var W = r + 8;
                    "undefined" == typeof g_msfi_count && (g_msfi_count = 0);
                    var _e = new Array;
                    W += mget(e, W, _e, "shareid"),
                    W += mget(e, W, _e, "uid"),
                    W += mget(e, W, _e, "key"),
                    foundmsfi = !0,
                    msfids[g_msfi_count] = _e,
                    g_msfi_count++
                } else if ("ENDM" == V)
                    q = !0;
                else if ("ATTA" == V) {
                    if (E) {
                        var W = r + 8
                          , ve = {};
                        W += mget(e, W, ve, "id"),
                        W += mget(e, W, ve, "parent"),
                        W += mget(e, W, ve, "mimetype"),
                        W += mget(e, W, ve, "storagekey"),
                        W += mget(e, W, ve, "size"),
                        W += mget(e, W, ve, "filename"),
                        ve.mimetype = ve.mimetype.toLowerCase(),
                        E.push(ve)
                    }
                } else if ("AACT" == V && "error" != C) {
                    if (S) {
                        var W = r + 8
                          , ye = {};
                        W += mget(e, W, ye, "appaid"),
                        W += mget(e, W, ye, "appname"),
                        W += mget(e, W, ye, "extra"),
                        W += mget(e, W, ye, "encname"),
                        ye.name = lpmdec(ye.encname, 1, A, k),
                        W += mget(e, W, ye, "encgroup"),
                        ye.group = lpmdec(ye.encgroup, 1, A, k),
                        C && A != g_local_key && ("" == ye.group ? ye.group = C.decsharename : ye.group = C.decsharename + "\\" + ye.group),
                        W += mget(e, W, ye, "last_touch"),
                        W += mget(e, W, ye, "fiid"),
                        W += mget(e, W, ye, "pwprotect"),
                        ye.pwprotect = "1" == ye.pwprotect,
                        W += mget(e, W, ye, "fav"),
                        W += mget(e, W, ye, "script"),
                        W += mget(e, W, ye, "wintitle"),
                        W += mget(e, W, ye, "wininfo"),
                        W += mget(e, W, ye, "exeversion"),
                        W += mget(e, W, ye, "autologin"),
                        W += mget(e, W, ye, "warnversion"),
                        ye.warnversion = "1" == ye.warnversion,
                        W += mget(e, W, ye, "exehash"),
                        ye.fields = new Array,
                        ye.logins = new Array,
                        void 0 !== C && null != C && A != g_local_key && (ye.sharefolderid = C.id,
                        0 == C.give && (ye.sharedfromaid = 1)),
                        S.push(ye)
                    }
                } else if ("AACF" == V && "error" != C) {
                    if (S && 0 < S.length) {
                        var W = r + 8, we;
                        W += mget(e, W, we = {}, "id"),
                        W += mget(e, W, we, "value"),
                        W += mget(e, W, we, "type"),
                        S[S.length - 1].fields.push(we)
                    }
                } else if ("ENTU" == V)
                    lp_enterpriseuser = response_substring(e, r + 8, r + 8 + J),
                    g_enterpriseuser = lp_enterpriseuser;
                else if ("ENTM" == V)
                    g_enterprisemodel = response_substring(e, r + 8, r + 8 + J);
                else if ("ILPR" == V)
                    g_is_legacy_premium = response_substring(e, r + 8, r + 8 + J);
                else if ("ENTR" == V)
                    g_enterpriseuserrole = AES._utf8_decode(response_substring(e, r + 8, r + 8 + J));
                else if ("ENTA" == V)
                    g_iscompanyadmin = "1" === response_substring(e, r + 8, r + 8 + J);
                else if ("ENTO" == V)
                    g_enterpriseoffering = response_substring(e, r + 8, r + 8 + J);
                else if ("PSHD" == V || "PSHE" == V) {
                    if (L) {
                        var W = r + 8
                          , be = new Array;
                        W += mget(e, W, be, "ppsid"),
                        W += mget(e, W, be, "data"),
                        L.push(be)
                    }
                } else if ("EMER" === V || "EMEE" === V) {
                    if (R || I) {
                        var Ae = {}
                          , W = r + 8;
                        W += mget(e, W, Ae, "username"),
                        W += mget(e, W, Ae, "accepted"),
                        W += mget(e, W, Ae, "confirmed"),
                        W += mget(e, W, Ae, "hours_to_override"),
                        W += mget(e, W, Ae, "override_date"),
                        W += mget(e, W, Ae, "allowed_access"),
                        W += mget(e, W, Ae, "linked"),
                        "EMER" === V && R ? R.push(Ae) : "EMEE" === V && I && I.push(Ae)
                    }
                } else if ("TOTP" == V) {
                    if (O) {
                        var W = r + 8;
                        W += mget(e, W, O, "multifactorenabled"),
                        W += mget(e, W, O, "lastpassauthenabled"),
                        W += mget(e, W, O, "domains"),
                        O.domains = JSON.parse(O.domains)
                    }
                } else if ("TMPL" == V) {
                    if (N) {
                        var ke = {
                            data: []
                        }
                          , W = r + 4;
                        if (W += mget(e, W, ke, "data", !1),
                        ke.data) {
                            var Ce = JSON.parse(AES._utf8_decode(ke.data));
                            Ce && Ce.forEach(function(e) {
                                e.fields = JSON.parse(e.fields),
                                N.push(e)
                            })
                        }
                    }
                } else if (lp_look_for_invalid_types && !V.match(/^[A-Z]{4}$/))
                    return void (lp_found_invalid_type = !0)
            } else if (d) {
                var W = r + 8, we;
                (we = {}).otherfield = "ACOF" == V,
                W += mget(e, W, we, "name"),
                we.name = AES._utf8_decode(we.name),
                W += mget(e, W, we, "type"),
                W += mget(e, W, we, "value"),
                "select-one" == we.type && (we.value = AES._utf8_decode(we.value)),
                W += mget(e, W, we, "checked"),
                we.checked = "1" == we.checked,
                W += mget(e, W, we, "formname"),
                we.formname = AES._utf8_decode(we.formname),
                W < r + J + 8 && (W += mget(e, W, we, "urid")),
                W < r + J + 8 && (W += mget(e, W, we, "otherlogin")),
                W < r + J + 8 && (W += mget(e, W, we, "url")),
                0 <= U && U < i.length && (void 0 !== lp_captcha_regexp && lp_captcha_regexp && (void 0 === i[U].captcha_id || "" == i[U].captcha_id) && "text" == we.type && lp_captcha_regexp.exec(we.name) && (i[U].captcha_id = we.name),
                i[U].save_all = we.otherfield && 0 == i[U].username.length && 0 == i[U].password.length,
                i[U].fields.push(we))
            }
            if (r += J + 8,
            -1 != n && n <= j)
                return void setTimeout(function() {
                    parsemobile(e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M)
                }, 0)
        }
    } catch (e) {
        "undefined" != typeof console && ("function" == typeof console.error ? console.error(e) : "function" == typeof console.log && console.log(e))
    }
    0 < lp_shared_folder_keys_upload_counter && "undefined" != typeof LP && "function" == typeof LP.lpMakeRequest && "string" == typeof LP.lp_base && LP.lpMakeRequest(LP.lp_base + "shared_folder_keys_upload.php", lp_shared_folder_keys_upload),
    R && R.forEach && R.forEach(function(e) {
        "1" === e.allowed_access && "1" !== e.linked && BackgroundServer.emergencyAccess.requestAccess({
            params: {
                sharer: e
            }
        })
    }),
    o && (K = o(i, a, s, l, c, u, p, q, e, g, f, m, h, x, _, v, y, b, S, E, P, L, N));
    var Se = get_version(e);
    return -1 !== Se && ("undefined" != typeof g_local_accts_version && -1 === g_local_accts_version && "undefined" != typeof Topics && Topics.get(Topics.ACCTS_VERSION_UPDATED).publish(Se),
    "undefined" != typeof Topics && Topics.get(Topics.BLOB_UPDATED).publish(),
    g_local_accts_version = Se),
    "undefined" != typeof LPServer && "undefined" != typeof g_emer_sharees && g_emer_sharees.length && LPServer.emergencyAccess.checkEmergencyAccessHealth(),
    K
}
function search_backup_for_aid(r, o) {
    lpReadAcctsData && lpReadAcctsData(!1, null, !0, function(e) {
        var t, n = parsemobile(e, e.length, 100, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, g_shares, null, null, null, null, null, null, null, r);
        o && "function" == typeof o && o(n)
    })
}
function response_substring(e, t, n) {
    return (" " + e.substring(t, n)).substring(1)
}
function mget(e, t, n, r, o, i, a) {
    var s = unserialize_num(e.substring(t, t + 4));
    return n[r] = response_substring(e, t + 4, t + 4 + s),
    o && (n[r] = lpmdec(n[r], 1, i, a)),
    4 + s
}
globalkey = "";
var mdec_cache = {}, mdec_cache_key = null, g_maxid, dbits;
function lpmdec(e, t, n, r, o) {
    if (void 0 === e || null == e || 0 == e.length)
        return "";
    if (void 0 !== n && n != g_local_key) {
        if (void 0 !== r && r || (r = AES.bin2hex(n)),
        o && void 0 !== mdec_cache[o + e])
            return mdec_cache[o + e];
        var i = mdec(e, t, n, r);
        return o && (mdec_cache[o + e] = i),
        i
    }
    if (void 0 !== g_local_key && mdec_cache_key != g_local_key && (mdec_cache = {},
    mdec_cache_key = g_local_key),
    void 0 !== mdec_cache[o + e])
        return mdec_cache[o + e];
    var i = mdec(e, t);
    return o && (mdec_cache[o + e] = i),
    i
}
function mdec(e, t, n, r) {
    if (void 0 === e || null == e || 0 == e.length)
        return "";
    if ("string" != typeof g_local_key || 0 == g_local_key.length)
        return void 0 !== ischrome && !lploggedin || (alert("No encryption key found, forcing logout!"),
        window.location.href = "../logout.php?nk_dec=1&mobile=1"),
        "";
    var o = g_local_key;
    void 0 !== g_local_key_hex && null != g_local_key_hex && 0 != g_local_key_hex.length || (g_local_key_hex = AES.bin2hex(g_local_key));
    var i = g_local_key_hex;
    void 0 !== n && null != n && void 0 !== r && null != r && (o = n,
    i = r);
    try {
        var a, s, l;
        if (l = t ? "!" == e.charAt(0) && e.length % 16 == 1 && 32 < e.length : "!" == e.charAt(0)) {
            if ("function" == typeof lpusexpcomencrypt && lpusexpcomencrypt() && "function" == typeof lpxpcomobj.decryptcbc)
                return t && (e = "!" + btoa(e.substring(1, 17)) + "|" + btoa(e.substring(17))),
                lpxpcomobj.decryptcbc(i, e);
            if ("function" == typeof have_nplastpass && have_nplastpass() && "undefined" != typeof g_nplastpass && "function" == typeof g_nplastpass.decryptcbc)
                return t && (e = "!" + btoa(e.substring(1, 17)) + "|" + btoa(e.substring(17))),
                g_nplastpass.decryptcbc(i, e);
            if ("undefined" != typeof document && document.getElementById("lpplugin") && "function" == typeof document.getElementById("lpplugin").decrypt)
                return t && (e = "!" + btoa(e.substring(1, 17)) + "|" + btoa(e.substring(17))),
                document.getElementById("lpplugin").decrypt(i, e);
            for (var c = AES.StringToKeyIv(o, 256), u = [], p = 0; p < c.key.length; ++p)
                u[p] = c.key[p];
            var d = [], a;
            if (t) {
                for (var p = 1; p < 17; ++p)
                    d[p - 1] = e.charCodeAt(p);
                a = new Array;
                for (var p = 17; p < e.length; p++)
                    a[p - 17] = e.charCodeAt(p)
            } else {
                var g = e.indexOf("|");
                if (-1 != g) {
                    for (var f = atob(e.substring(1, g)), p = 0; p < 16; ++p)
                        d[p] = f.charCodeAt(p);
                    a = e.substring(g + 1)
                }
            }
            return AES.Decrypt({
                key: u,
                iv: d,
                data: a,
                b64: !t,
                bits: 256,
                mode: "cbc"
            })
        }
        if ("function" == typeof lpusexpcomencrypt && lpusexpcomencrypt())
            return lpxpcomobj.decrypt(i, t ? btoa(e) : e);
        if ("function" == typeof have_nplastpass && have_nplastpass() && "undefined" != typeof g_nplastpass && "function" == typeof g_nplastpass.decrypt)
            return g_nplastpass.decrypt(i, t ? btoa(e) : e);
        if ("undefined" != typeof document && document.getElementById("lpplugin") && "function" == typeof document.getElementById("lpplugin").decrypt)
            return document.getElementById("lpplugin").decrypt(i, t ? btoa(e) : e);
        if (t) {
            a = new Array;
            for (var p = 0; p < e.length; p++)
                a[p] = e.charCodeAt(p);
            s = !1
        } else
            a = e,
            s = !0;
        return AES.Decrypt({
            pass: o,
            data: a,
            b64: s,
            mode: "ecb",
            bits: 256
        })
    } catch (e) {
        return "ERROR: AES mobile bug 2"
    }
}
function unserialize_num(e) {
    for (var t = 0, n = 0, r = 3; 0 <= r; r--) {
        var o;
        t += e.charCodeAt(r) << n,
        n += 8
    }
    return t
}
function get_version(e, t) {
    t = t || "LPAV";
    var n = -1;
    if (e && 0 === e.indexOf(t)) {
        var r = unserialize_num(e.substring(4, 8));
        n = response_substring(e, 8, 8 + r)
    }
    return parseInt(n)
}
function lpmenc(e, t, n) {
    var r = n || g_local_key;
    return void 0 === e || null == e || 0 == e.length ? "" : menc(e, t, r)
}
function menc(e, t, n) {
    var r = n || g_local_key;
    if (void 0 === e || null == e || 0 == e.length)
        return "";
    if ("string" != typeof r || 0 == r.length)
        return "";
    try {
        if ("function" == typeof lpusexpcomencrypt && lpusexpcomencrypt() && "function" == typeof lpxpcomobj.encryptcbc) {
            var o;
            if (e = lpxpcomobj.encryptcbc(lp_bin2hex(r), e),
            t)
                -1 != (o = e.indexOf("|")) && (e = "!" + atob(e.substring(1, o)) + atob(e.substring(o + 1)));
            return e
        }
        if ("function" == typeof have_nplastpass && have_nplastpass() && "undefined" != typeof g_nplastpass && "function" == typeof g_nplastpass.encryptcbc) {
            var o;
            if (e = g_nplastpass.encryptcbc(AES.bin2hex(r), e),
            t)
                -1 != (o = e.indexOf("|")) && (e = "!" + atob(e.substring(1, o)) + atob(e.substring(o + 1)));
            return e
        }
        for (var i = AES.StringToKeyIv(r, 256), a = [], s = 0; s < i.key.length; ++s)
            a[s] = i.key[s];
        var l = AES.CreateIV(16)
          , e = AES.Encrypt({
            key: a,
            iv: l.arr,
            data: e,
            b64: !t,
            bits: 256,
            mode: "cbc"
        })
          , c = "!";
        if (t) {
            c += l.str;
            for (var s = 0; s < e.length; s++) {
                var u = e[s];
                u < 0 && (u += 256),
                c += String.fromCharCode(u)
            }
        } else
            c += btoa(l.str) + "|" + e;
        return c
    } catch (e) {
        return "ERROR: AES mobile bug"
    }
}
function serialize_num(e) {
    for (var t = "", n = 1; n <= 4; n++)
        t = String.fromCharCode(e % 256) + t,
        e >>= 8;
    return t
}
function serialize_str(e) {
    return null == e && (e = ""),
    "number" == typeof e && (e = "" + e),
    serialize_num(e.length) + e
}
function get_digits(e) {
    return "string" == typeof e ? e.replace(/\D/g, "") : parseInt(e)
}
function flattenshare(e) {
    var t;
    return "SHAR" + serialize_str(serialize_str(e.id) + serialize_str(e.sharekey) + serialize_str(e.sharename) + serialize_str(e.readonly) + serialize_str(e.give) + serialize_str(e.sharekeyaes) + serialize_str(e.associative) + serialize_str(e.accepted))
}
function flattendata(e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A) {
    "number" != typeof (g_maxid = d) && (g_maxid = void 0 !== g_maxid ? parseInt(g_maxid) : 0);
    var k = "";
    k += "LPAV" + serialize_str(e),
    l && 0 != l && (k += "PREM" + serialize_str(l)),
    lp_trueapi_trial_exp && 0 != lp_trueapi_trial_exp && (k += "TATE" + serialize_str(lp_trueapi_trial_exp)),
    lp_wote && 0 != lp_wote && (k += "WOTE" + serialize_str(lp_wote)),
    lp_fete && 0 != lp_fete && (k += "FETE" + serialize_str(lp_fete)),
    void 0 !== c && "" != c && (k += "ENCU" + serialize_str(c)),
    k += "CBCU" + serialize_str("1"),
    x && 0 != x && (k += "ENTU" + serialize_str(x)),
    "undefined" != typeof g_enterprisemodel && g_enterprisemodel && 0 !== g_enterprisemodel && (k += "ENTM" + serialize_str(g_enterprisemodel)),
    "undefined" != typeof g_is_legacy_premium && 1 == g_is_legacy_premium && (k += "ILPR" + serialize_str("1")),
    "undefined" != typeof g_enterpriseuserrole && g_enterpriseuserrole && "" != g_enterpriseuserrole && (k += "ENTR" + serialize_str(g_enterpriseuserrole)),
    g_iscompanyadmin && (k += "ENTA" + serialize_str("1")),
    g_enterpriseoffering && (k += "ENTO" + serialize_str(g_enterpriseoffering));
    var C = {}
      , S = 0
      , E = []
      , P = []
      , L = [];
    for (var T in t) {
        var B, R;
        if (get_digits(T) == T)
            if (void 0 === t[T].sharefolderid)
                "" != (B = void 0 !== t[T].group ? t[T].group : "") && (void 0 === C[B] && (C[B] = S,
                ++S),
                t[T].groupid = C[B]),
                k += flattensite(t[T]);
            else
                void 0 === E[R = t[T].sharefolderid] && (E[R] = []),
                E[R].push(t[T])
    }
    for (var T in n) {
        var B, R;
        if (get_digits(T) == T)
            if (void 0 === n[T].sharefolderid)
                "" != (B = void 0 !== n[T].group ? n[T].group : "") && (void 0 === C[B] && (C[B] = S,
                ++S),
                n[T].groupid = C[B]),
                k += flattensite(n[T]);
            else
                void 0 === E[R = n[T].sharefolderid] && (E[R] = []),
                E[R].push(n[T])
    }
    var I = "";
    if (I += serialize_str(r.login_site_prompt ? "1" : "0"),
    I += serialize_str(r.edit_site_prompt ? "1" : "0"),
    I += serialize_str(r.edit_sn_prompt ? "1" : "0"),
    I += serialize_str(r.view_pw_prompt ? "1" : "0"),
    I += serialize_str(r.view_ff_prompt ? "1" : "0"),
    I += serialize_str(r.improve ? "1" : "0"),
    I += serialize_str(r.switch_identity_prompt ? "1" : "0"),
    I += serialize_str(r.switch_f_prompt ? "1" : "0"),
    I += serialize_str(r.multifactor_reprompt ? "1" : "0"),
    I += serialize_str(r.company_login_site_prompt ? "1" : "0"),
    k += "SPMT" + serialize_str(I += serialize_str(r.company_copyview_site_prompt ? "1" : "0")),
    f) {
        var O = !1;
        for (var T in f) {
            O = !0;
            break
        }
        if (O) {
            var I = "";
            I += serialize_str(f.allowmasterpasswordsave),
            I += serialize_str(f.logoffclosebrowser),
            I += serialize_str(f.logoffidle),
            void 0 === f.noexport && (f.noexport = "0"),
            I += serialize_str(f.noexport),
            void 0 === f.logofflock && (f.logofflock = "0"),
            I += serialize_str(f.logofflock),
            void 0 === f.logoffscreen && (f.logoffscreen = "0"),
            I += serialize_str(f.logoffscreen),
            void 0 === f.logoffshutdown && (f.logoffshutdown = "0"),
            I += serialize_str(f.logoffshutdown),
            void 0 === f.sitepwlen && (f.sitepwlen = ""),
            I += serialize_str(f.sitepwlen),
            void 0 === f.hideidentities && (f.hideidentities = "0"),
            I += serialize_str(f.hideidentities),
            void 0 === f.savesitestopersonal && (f.savesitestopersonal = ""),
            I += serialize_str(f.savesitestopersonal),
            void 0 === f.import && (f.import = ""),
            I += serialize_str(f.import),
            void 0 === f.share && (f.share = ""),
            I += serialize_str(f.share),
            void 0 === f.shareout && (f.shareout = ""),
            I += serialize_str(f.shareout),
            void 0 === f.share_onlyfolders && (f.share_onlyfolders = ""),
            I += serialize_str(f.share_onlyfolders),
            void 0 === f.sharedomain_allowed && (f.sharedomain_allowed = ""),
            I += serialize_str(f.sharedomain_allowed),
            void 0 === f.revert && (f.revert = ""),
            I += serialize_str(f.revert),
            void 0 === f.show_notes && (f.show_notes = ""),
            I += serialize_str(f.show_notes),
            void 0 === f.show_fingerprint && (f.show_fingerprint = ""),
            I += serialize_str(f.show_fingerprint),
            void 0 === f.bookmarklets && (f.bookmarklets = ""),
            I += serialize_str(f.bookmarklets),
            void 0 === f.hint && (f.hint = ""),
            I += serialize_str(f.hint),
            void 0 === f.account_recovery && (f.account_recovery = ""),
            I += serialize_str(f.account_recovery),
            void 0 === f.link_personal && (f.link_personal = ""),
            I += serialize_str(f.link_personal),
            void 0 === f.multifactor_disable && (f.multifactor_disable = ""),
            I += serialize_str(f.multifactor_disable),
            void 0 === f.show_reprompt_on_copy && (f.show_reprompt_on_copy = ""),
            I += serialize_str(f.show_reprompt_on_copy),
            void 0 === f.requirechangereuse && (f.requirechangereuse = ""),
            I += serialize_str(f.requirechangereuse),
            void 0 === f.logname && (f.logname = "0"),
            I += serialize_str(f.logname),
            I += serialize_str(f.show_formfills),
            void 0 === f.accountselectionbasedonemail && (f.accountselectionbasedonemail = ""),
            k += "PREF" + serialize_str(I += serialize_str(f.accountselectionbasedonemail))
        }
    }
    if (o)
        for (var N = o.length, T = 0; T < N; T++) {
            var D = o[T], I = "", R;
            if (void 0 === D.sharefolderid)
                k += flattenff(D);
            else
                void 0 === L[R = D.sharefolderid] && (L[R] = []),
                L[R].push(D)
        }
    if (a)
        for (var z in a) {
            var F;
            if ("function" != typeof a[z])
                if (!z.match(/^[0-9]+$/))
                    I = "",
                    I += serialize_str(a[z]),
                    k += "EQDN" + serialize_str(I += serialize_str(AES.url2hex(z)))
        }
    if (i)
        for (var N = i.length, T = 0; T < N; T++) {
            var M = i[T], j;
            I = "",
            I += serialize_str(M.iid),
            I += serialize_str(M.iname),
            I += serialize_str(M.aids),
            I += serialize_str(M.ffids),
            I += serialize_str((void 0 !== M.pw_prompt ? M.pw_prompt : void 0 !== M.pwprotect && M.pwprotect) ? "1" : "0"),
            k += "IDNT" + serialize_str(I += serialize_str(M.appaids))
        }
    if (u)
        for (var U = u.length, T = 0; T < U; T++) {
            var G = u[T];
            I = "",
            I += serialize_str(G.id),
            I += serialize_str(G.fiid),
            I += serialize_str(G.sharerusername),
            I += serialize_str(G.sharedfromaid),
            I += serialize_str(G.sharemessage),
            I += serialize_str(G.sharekeyenchex),
            I += serialize_str(G.sharekeyenchexsig),
            I += serialize_str(G.sharename),
            I += serialize_str(G.sharegroup),
            I += serialize_str(G.username),
            I += serialize_str(G.password),
            I += serialize_str(G.extra),
            I += serialize_str(G.shareautoaccept),
            I += serialize_str(G.emailverified);
            var q = 0
              , H = "";
            for (var K in G.shareafids)
                q++,
                H += serialize_str(K),
                H += serialize_str(G.shareafids[K]);
            I += serialize_str(q),
            k += "PNDG" + serialize_str(I += H)
        }
    try {
        if (p)
            for (var V in p) {
                var J = p[V][0];
                for (var W in I = "",
                I += serialize_str(V),
                J)
                    "aid" != W && (I += serialize_str(W),
                    I += serialize_str(J[W]));
                k += "SHAP" + serialize_str(I)
            }
    } catch (e) {}
    if (s) {
        for (var T = 0; void 0 !== s.neveraccounts && T < s.neveraccounts.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("0") + serialize_str(AES.url2hex(s.neveraccounts[T])))
        }
        for (var T = 0; void 0 !== s.nevergenerates && T < s.nevergenerates.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("1") + serialize_str(AES.url2hex(s.nevergenerates[T])))
        }
        for (var T = 0; void 0 !== s.neverformfills && T < s.neverformfills.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("2") + serialize_str(AES.url2hex(s.neverformfills[T])))
        }
        for (var T = 0; void 0 !== s.neverautologins && T < s.neverautologins.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("3") + serialize_str(AES.url2hex(s.neverautologins[T])))
        }
        for (var T = 0; void 0 !== s.nevershowicons && T < s.nevershowicons.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("6") + serialize_str(AES.url2hex(s.nevershowicons[T])))
        }
        for (var T = 0; void 0 !== s.onlyaccounts && T < s.onlyaccounts.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("10000") + serialize_str(AES.url2hex(s.onlyaccounts[T])))
        }
        for (var T = 0; void 0 !== s.onlygenerates && T < s.onlygenerates.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("10001") + serialize_str(AES.url2hex(s.onlygenerates[T])))
        }
        for (var T = 0; void 0 !== s.onlyformfills && T < s.onlyformfills.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("10002") + serialize_str(AES.url2hex(s.onlyformfills[T])))
        }
        for (var T = 0; void 0 !== s.onlyautologins && T < s.onlyautologins.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("10003") + serialize_str(AES.url2hex(s.onlyautologins[T])))
        }
        for (var T = 0; void 0 !== s.onlyshowicons && T < s.onlyshowicons.length; T++) {
            var Y;
            k += "NEVR" + serialize_str(Y = serialize_str("10006") + serialize_str(AES.url2hex(s.onlyshowicons[T])))
        }
    }
    if (g)
        for (var X = g.length, T = 0; T < X; T++) {
            var Z = g[T];
            I = "",
            I += serialize_str(AES.url2hex(Z.url)),
            I += serialize_str(Z.exacthost),
            I += serialize_str(Z.exactport),
            k += "URUL" + serialize_str(I += serialize_str(void 0 !== Z.case_insensitive ? Z.case_insensitive : "0"))
        }
    if (h)
        for (var T in h) {
            var R;
            if (get_digits(T) == T)
                if (void 0 === h[T].sharefolderid)
                    k += flattenapplication(h[T]);
                else
                    void 0 === P[R = h[T].sharefolderid] && (P[R] = []),
                    P[R].push(h[T])
        }
    if (_)
        for (var T in _)
            get_digits(T) == T && (I = "",
            I += serialize_str(_[T].id),
            I += serialize_str(_[T].parent),
            I += serialize_str(_[T].mimetype),
            I += serialize_str(_[T].storagekey),
            I += serialize_str(_[T].size),
            k += "ATTA" + serialize_str(I += serialize_str(_[T].filename)));
    if (m && 0 < m.length) {
        "string" == typeof lp_rsaprivatekeyenchex && 0 < lp_rsaprivatekeyenchex.length && (k += "PRIK" + serialize_str(lp_rsaprivatekeyenchex));
        for (var T = 0; T < m.length; T++) {
            var Q = m[T];
            k += flattenshare(Q);
            for (var $ = Q.key, R = Q.id, K = 0; void 0 !== E[R] && K < E[R].length; K++) {
                var ee = E[R][K].group;
                E[R][K].group = E[R][K].group.substr(Q.decsharename.length + 1),
                k += flattensite(E[R][K], $),
                E[R][K].group = ee
            }
            for (var K = 0; void 0 !== P[R] && K < P[R].length; K++) {
                var ee = P[R][K].group;
                P[R][K].group = P[R][K].group.substr(Q.decsharename.length + 1),
                k += flattenapplication(P[R][K], $),
                P[R][K].group = ee
            }
            for (var K = 0; void 0 !== L[R] && K < L[R].length; K++)
                k += flattenff(L[R][K], $)
        }
    }
    if (A && 0 < A.length)
        for (var T = 0, te = A.length; T < te; ++T)
            k += flattenshare(A[T]);
    if (v && 0 < v.length)
        for (var T = 0, te = v.length; T < te; ++T) {
            var ne;
            I = "",
            I += serialize_str((ne = v[T]).username),
            I += serialize_str(ne.accepted),
            I += serialize_str(ne.confirmed),
            I += serialize_str(ne.hours_to_override),
            I += serialize_str(ne.override_date),
            k += "EMER" + serialize_str(I += serialize_str(ne.allowed_access))
        }
    if (y && 0 < y.length)
        for (var T = 0, te = y.length; T < te; ++T) {
            var ne;
            I = "",
            I += serialize_str((ne = y[T]).username),
            I += serialize_str(ne.accepted),
            I += serialize_str(ne.confirmed),
            I += serialize_str(ne.hours_to_override),
            I += serialize_str(ne.override_date),
            k += "EMEE" + serialize_str(I += serialize_str(ne.allowed_access))
        }
    if (w) {
        var I = "";
        I += serialize_str(w.multifactorenabled),
        I += serialize_str(w.lastpassauthenabled),
        k += "TOTP" + serialize_str(I += serialize_str(JSON.stringify(w.domains)))
    }
    return b && (b.forEach(function(e) {
        e.fields = JSON.stringify(e.fields)
    }),
    k += "TMPL" + serialize_str(AES._utf8_encode(JSON.stringify(b))),
    b.forEach(function(e) {
        e.fields = JSON.parse(e.fields)
    })),
    k += "MXID" + serialize_str(g_maxid),
    k += "ENDM" + serialize_str("OK")
}
function flattensite(e, t) {
    var n = "", r, o;
    n += serialize_str(e.aid),
    n += serialize_str(void 0 !== e.encname && lpmdec(e.encname, !0, t, null, e.aid) == e.name ? e.encname : lpmenc(e.name, !0, t)),
    n += serialize_str(void 0 !== e.encgroup && lpmdec(e.encgroup, !0, t, null, e.aid) == e.group ? e.encgroup : lpmenc(e.group, !0, t)),
    n += serialize_str("undefined" != typeof lp_no_url_bin2hex && lp_no_url_bin2hex ? e.url : AES.url2hex(e.url)),
    n += serialize_str(e.extra),
    n += serialize_str(e.fav),
    n += serialize_str(e.sharedfromaid),
    n += serialize_str(e.username),
    n += serialize_str(e.password),
    n += serialize_str(e.pwprotect ? "1" : "0"),
    n += serialize_str(e.genpw ? "1" : "0"),
    n += serialize_str(e.sn ? "1" : "0"),
    n += serialize_str(e.last_touch),
    n += serialize_str(e.autologin ? "1" : "0"),
    n += serialize_str(e.never_autofill ? "1" : "0"),
    n += serialize_str(e.realm_data),
    n += serialize_str(e.fiid),
    n += serialize_str(e.custom_js),
    void 0 === e.submit_id && (e.submit_id = ""),
    n += serialize_str(e.submit_id),
    void 0 === e.captcha_id && (e.captcha_id = ""),
    n += serialize_str(e.captcha_id),
    void 0 === e.urid && (e.urid = "0"),
    n += serialize_str(e.urid),
    void 0 === e.basic_auth && (e.basic_auth = "0"),
    n += serialize_str(e.basic_auth),
    void 0 === e.method && (e.method = ""),
    n += serialize_str(e.method),
    void 0 === e.action && (e.action = ""),
    n += serialize_str(e.action),
    void 0 === e.groupid && (e.groupid = ""),
    n += serialize_str(e.groupid),
    void 0 === e.deleted && (e.deleted = ""),
    n += serialize_str(e.deleted),
    void 0 === e.attachkey && (e.attachkey = ""),
    n += serialize_str(e.attachkey),
    void 0 === e.attachpresent && (e.attachpresent = ""),
    n += serialize_str(e.attachpresent),
    void 0 === e.individualshare && (e.individualshare = !1),
    n += serialize_str(e.individualshare ? "1" : "0"),
    void 0 === e.notetype && (e.notetype = ""),
    n += serialize_str(e.notetype),
    void 0 === e.noalert && (e.noalert = ""),
    n += serialize_str(e.noalert),
    void 0 === e.last_modified_gmt && (e.last_modified_gmt = ""),
    n += serialize_str(e.last_modified_gmt),
    void 0 === e.hasbeenshared && (e.hasbeenshared = ""),
    n += serialize_str(e.hasbeenshared),
    void 0 === e.last_pwchange_gmt && (e.last_pwchange_gmt = ""),
    n += serialize_str(e.last_pwchange_gmt),
    void 0 === e.created_gmt && (e.created_gmt = ""),
    n += serialize_str(e.created_gmt),
    void 0 === e.vulnerable && (e.vulnerable = ""),
    n += serialize_str(e.vulnerable),
    void 0 === e.pwch && (e.pwch = "0"),
    n += serialize_str(e.pwch),
    void 0 === e.breached && (e.breached = "0"),
    n += serialize_str(e.breached),
    void 0 === e.template && (e.template = "");
    var i = "ACCT" + serialize_str(n += serialize_str(e.template));
    if (void 0 !== e.fields)
        for (var a = 0; a < e.fields.length; a++) {
            var s = e.fields[a]
              , l = serialize_str(AES._utf8_encode(s.name));
            l += serialize_str(s.type);
            var c = s.value;
            "select-one" == s.type && (c = AES._utf8_encode(c)),
            l += serialize_str(c),
            l += serialize_str(s.checked ? "1" : "0"),
            l += serialize_str(AES._utf8_encode(s.formname)),
            void 0 === s.urid && (s.urid = "0"),
            l += serialize_str(s.urid),
            void 0 === s.otherlogin && (s.otherlogin = "0"),
            l += serialize_str(s.otherlogin),
            void 0 === s.url && (s.url = ""),
            l += serialize_str(s.url),
            i += (s.otherfield ? "ACOF" : "ACFL") + serialize_str(l)
        }
    return i
}
function flattenapplication(e, t) {
    var n = "", r = "", o, i;
    r += serialize_str(e.appaid),
    r += serialize_str(AES.url2hex(e.appname)),
    r += serialize_str(e.extra),
    r += serialize_str(void 0 !== e.encname && lpmdec(e.encname, !0, t) == e.name ? e.encname : lpmenc(e.name, !0, t)),
    r += serialize_str(void 0 !== e.encgroup && lpmdec(e.encgroup, !0, t) == e.group ? e.encgroup : lpmenc(e.group, !0, t)),
    r += serialize_str(e.last_touch),
    r += serialize_str(e.fiid),
    r += serialize_str(e.pwprotect ? "1" : "0"),
    r += serialize_str(e.fav),
    r += serialize_str(e.script),
    r += serialize_str(e.wintitle),
    r += serialize_str(e.wininfo),
    r += serialize_str(e.exeversion),
    r += serialize_str(e.autologin),
    r += serialize_str(e.warnversion ? "1" : "0"),
    n += "AACT" + serialize_str(r += serialize_str(e.exehash));
    for (var a = 0; a < e.fields.length; a++)
        r = "",
        r += serialize_str(e.fields[a].id),
        r += serialize_str(e.fields[a].value),
        n += "AACF" + serialize_str(r += serialize_str(e.fields[a].type));
    return n
}
function flattenff(e, t) {
    var n = ""
      , r = "";
    r += serialize_str(e.ffid),
    r += serialize_str(e.profiletype),
    r += serialize_str(e.profilename),
    r += serialize_str(e.profilelanguage),
    r += serialize_str(e.firstname),
    r += serialize_str(e.middlename),
    r += serialize_str(e.lastname),
    r += serialize_str(e.email),
    r += serialize_str(e.company),
    r += serialize_str(e.ssn),
    r += serialize_str(e.birthday),
    r += serialize_str(e.address1),
    r += serialize_str(e.address2),
    r += serialize_str(e.city),
    r += serialize_str(e.state),
    r += serialize_str(e.state_name),
    r += serialize_str(e.zip),
    r += serialize_str(e.country),
    r += serialize_str(e.country_cc3l),
    r += serialize_str(e.country_name),
    r += serialize_str(e.mobilephone),
    r += serialize_str(e.mobilephone3lcc),
    r += serialize_str(e.mobileext),
    r += serialize_str(e.evephone),
    r += serialize_str(e.evephone3lcc),
    r += serialize_str(e.eveext),
    r += serialize_str(e.phone),
    r += serialize_str(e.phone3lcc),
    r += serialize_str(e.phoneext),
    r += serialize_str(e.fax),
    r += serialize_str(e.fax3lcc),
    r += serialize_str(e.faxext),
    r += serialize_str(e.ccnum),
    r += serialize_str(e.ccexp),
    r += serialize_str(e.cccsc),
    r += serialize_str(e.username),
    r += serialize_str(e.address3),
    r += serialize_str(e.title),
    r += serialize_str(e.gender),
    r += serialize_str(e.driverlicensenum),
    r += serialize_str(e.taxid),
    r += serialize_str(e.pwprotect ? "1" : "0"),
    r += serialize_str(e.bankname),
    r += serialize_str(e.bankacctnum),
    r += serialize_str(e.bankroutingnum),
    r += serialize_str(e.timezone),
    r += serialize_str(e.county),
    r += serialize_str(e.ccstart),
    r += serialize_str(e.ccname),
    r += serialize_str(e.ccissuenum),
    r += serialize_str(e.notes),
    r += serialize_str(e.lastname2),
    r += serialize_str(e.mobileemail),
    r += serialize_str(e.firstname2),
    r += serialize_str(e.firstname3),
    r += serialize_str(e.lastname3),
    n += "LPFF" + serialize_str(r += serialize_str(e.creditmon ? "1" : "0"));
    for (var o = e.custom_fields.length, i = 0; i < o; i++) {
        var a = e.custom_fields[i];
        r = "",
        r += serialize_str(a.cfid),
        r += serialize_str(a.text),
        r += serialize_str(a.value),
        n += "FFCF" + serialize_str(r += serialize_str(a.alttext))
    }
    return n
}
function logMissingSharedFolder(e, t, n) {
    "undefined" != typeof Raven ? Raven.captureException(e, {
        extra: {
            uid: t,
            shareId: n
        }
    }) : "undefined" != typeof console && "function" == typeof console.error && console.error(e, t, n)
}
var canary = 0xdeadbeefcafe
  , j_lm = 15715070 == (16777215 & canary);
function BigInteger(e, t, n) {
    null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
}
function nbi() {
    return new BigInteger(null)
}
function am1(e, t, n, r, o, i) {
    for (; 0 <= --i; ) {
        var a = t * this[e++] + n[r] + o;
        o = Math.floor(a / 67108864),
        n[r++] = 67108863 & a
    }
    return o
}
function am2(e, t, n, r, o, i) {
    for (var a = 32767 & t, s = t >> 15; 0 <= --i; ) {
        var l = 32767 & this[e]
          , c = this[e++] >> 15
          , u = s * l + c * a;
        o = ((l = a * l + ((32767 & u) << 15) + n[r] + (1073741823 & o)) >>> 30) + (u >>> 15) + s * c + (o >>> 30),
        n[r++] = 1073741823 & l
    }
    return o
}
function am3(e, t, n, r, o, i) {
    for (var a = 16383 & t, s = t >> 14; 0 <= --i; ) {
        var l = 16383 & this[e]
          , c = this[e++] >> 14
          , u = s * l + c * a;
        o = ((l = a * l + ((16383 & u) << 14) + n[r] + o) >> 28) + (u >> 14) + s * c,
        n[r++] = 268435455 & l
    }
    return o
}
dbits = j_lm && "undefined" != typeof navigator && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2,
30) : j_lm && "undefined" != typeof navigator && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1,
26) : (BigInteger.prototype.am = am3,
28),
BigInteger.prototype.DB = dbits,
BigInteger.prototype.DM = (1 << dbits) - 1,
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP),
BigInteger.prototype.F1 = BI_FP - dbits,
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz", BI_RC = new Array, rr, vv;
for (rr = "0".charCodeAt(0),
vv = 0; vv <= 9; ++vv)
    BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0),
vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0),
vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
function int2char(e) {
    return BI_RM.charAt(e)
}
function intAt(e, t) {
    var n = BI_RC[e.charCodeAt(t)];
    return null == n ? -1 : n
}
function bnpCopyTo(e) {
    for (var t = this.t - 1; 0 <= t; --t)
        e[t] = this[t];
    e.t = this.t,
    e.s = this.s
}
function bnpFromInt(e) {
    this.t = 1,
    this.s = e < 0 ? -1 : 0,
    0 < e ? this[0] = e : e < -1 ? this[0] = e + DV : this.t = 0
}
function nbv(e) {
    var t = nbi();
    return t.fromInt(e),
    t
}
function bnpFromString(e, t) {
    var n;
    if (16 == t)
        n = 4;
    else if (8 == t)
        n = 3;
    else if (256 == t)
        n = 8;
    else if (2 == t)
        n = 1;
    else if (32 == t)
        n = 5;
    else {
        if (4 != t)
            return void this.fromRadix(e, t);
        n = 2
    }
    this.t = 0,
    this.s = 0;
    for (var r = e.length, o = !1, i = 0; 0 <= --r; ) {
        var a = 8 == n ? 255 & e[r] : intAt(e, r);
        a < 0 ? "-" == e.charAt(r) && (o = !0) : (o = !1,
        0 == i ? this[this.t++] = a : i + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - i) - 1) << i,
        this[this.t++] = a >> this.DB - i) : this[this.t - 1] |= a << i,
        (i += n) >= this.DB && (i -= this.DB))
    }
    8 == n && 0 != (128 & e[0]) && (this.s = -1,
    0 < i && (this[this.t - 1] |= (1 << this.DB - i) - 1 << i)),
    this.clamp(),
    o && BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    for (var e = this.s & this.DM; 0 < this.t && this[this.t - 1] == e; )
        --this.t
}
function bnToString(e) {
    if (this.s < 0)
        return "-" + this.negate().toString(e);
    var t;
    if (16 == e)
        t = 4;
    else if (8 == e)
        t = 3;
    else if (2 == e)
        t = 1;
    else if (32 == e)
        t = 5;
    else {
        if (4 != e)
            return this.toRadix(e);
        t = 2
    }
    var n = (1 << t) - 1, r, o = !1, i = "", a = this.t, s = this.DB - a * this.DB % t;
    if (0 < a--)
        for (s < this.DB && 0 < (r = this[a] >> s) && (o = !0,
        i = int2char(r)); 0 <= a; )
            s < t ? (r = (this[a] & (1 << s) - 1) << t - s,
            r |= this[--a] >> (s += this.DB - t)) : (r = this[a] >> (s -= t) & n,
            s <= 0 && (s += this.DB,
            --a)),
            0 < r && (o = !0),
            o && (i += int2char(r));
    return o ? i : "0"
}
function bnNegate() {
    var e = nbi();
    return BigInteger.ZERO.subTo(this, e),
    e
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(e) {
    var t = this.s - e.s;
    if (0 != t)
        return t;
    var n = this.t;
    if (0 != (t = n - e.t))
        return t;
    for (; 0 <= --n; )
        if (0 != (t = this[n] - e[n]))
            return t;
    return 0
}
function nbits(e) {
    var t = 1, n;
    return 0 != (n = e >>> 16) && (e = n,
    t += 16),
    0 != (n = e >> 8) && (e = n,
    t += 8),
    0 != (n = e >> 4) && (e = n,
    t += 4),
    0 != (n = e >> 2) && (e = n,
    t += 2),
    0 != (n = e >> 1) && (e = n,
    t += 1),
    t
}
function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(e, t) {
    var n;
    for (n = this.t - 1; 0 <= n; --n)
        t[n + e] = this[n];
    for (n = e - 1; 0 <= n; --n)
        t[n] = 0;
    t.t = this.t + e,
    t.s = this.s
}
function bnpDRShiftTo(e, t) {
    for (var n = e; n < this.t; ++n)
        t[n - e] = this[n];
    t.t = Math.max(this.t - e, 0),
    t.s = this.s
}
function bnpLShiftTo(e, t) {
    var n = e % this.DB, r = this.DB - n, o = (1 << r) - 1, i = Math.floor(e / this.DB), a = this.s << n & this.DM, s;
    for (s = this.t - 1; 0 <= s; --s)
        t[s + i + 1] = this[s] >> r | a,
        a = (this[s] & o) << n;
    for (s = i - 1; 0 <= s; --s)
        t[s] = 0;
    t[i] = a,
    t.t = this.t + i + 1,
    t.s = this.s,
    t.clamp()
}
function bnpRShiftTo(e, t) {
    t.s = this.s;
    var n = Math.floor(e / this.DB);
    if (n >= this.t)
        t.t = 0;
    else {
        var r = e % this.DB
          , o = this.DB - r
          , i = (1 << r) - 1;
        t[0] = this[n] >> r;
        for (var a = n + 1; a < this.t; ++a)
            t[a - n - 1] |= (this[a] & i) << o,
            t[a - n] = this[a] >> r;
        0 < r && (t[this.t - n - 1] |= (this.s & i) << o),
        t.t = this.t - n,
        t.clamp()
    }
}
function bnpSubTo(e, t) {
    for (var n = 0, r = 0, o = Math.min(e.t, this.t); n < o; )
        r += this[n] - e[n],
        t[n++] = r & this.DM,
        r >>= this.DB;
    if (e.t < this.t) {
        for (r -= e.s; n < this.t; )
            r += this[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
        r += this.s
    } else {
        for (r += this.s; n < e.t; )
            r -= e[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
        r -= e.s
    }
    t.s = r < 0 ? -1 : 0,
    r < -1 ? t[n++] = this.DV + r : 0 < r && (t[n++] = r),
    t.t = n,
    t.clamp()
}
function bnpMultiplyTo(e, t) {
    var n = this.abs()
      , r = e.abs()
      , o = n.t;
    for (t.t = o + r.t; 0 <= --o; )
        t[o] = 0;
    for (o = 0; o < r.t; ++o)
        t[o + n.t] = n.am(0, r[o], t, o, 0, n.t);
    t.s = 0,
    t.clamp(),
    this.s != e.s && BigInteger.ZERO.subTo(t, t)
}
function bnpSquareTo(e) {
    for (var t = this.abs(), n = e.t = 2 * t.t; 0 <= --n; )
        e[n] = 0;
    for (n = 0; n < t.t - 1; ++n) {
        var r = t.am(n, t[n], e, 2 * n, 0, 1);
        (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
        e[n + t.t + 1] = 1)
    }
    0 < e.t && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
    e.s = 0,
    e.clamp()
}
function bnpDivRemTo(e, t, n) {
    var r = e.abs();
    if (!(r.t <= 0)) {
        var o = this.abs();
        if (o.t < r.t)
            return null != t && t.fromInt(0),
            void (null != n && this.copyTo(n));
        null == n && (n = nbi());
        var i = nbi()
          , a = this.s
          , s = e.s
          , l = this.DB - nbits(r[r.t - 1]);
        0 < l ? (r.lShiftTo(l, i),
        o.lShiftTo(l, n)) : (r.copyTo(i),
        o.copyTo(n));
        var c = i.t
          , u = i[c - 1];
        if (0 != u) {
            var p = u * (1 << this.F1) + (1 < c ? i[c - 2] >> this.F2 : 0)
              , d = this.FV / p
              , g = (1 << this.F1) / p
              , f = 1 << this.F2
              , m = n.t
              , h = m - c
              , x = null == t ? nbi() : t;
            for (i.dlShiftTo(h, x),
            0 <= n.compareTo(x) && (n[n.t++] = 1,
            n.subTo(x, n)),
            BigInteger.ONE.dlShiftTo(c, x),
            x.subTo(i, i); i.t < c; )
                i[i.t++] = 0;
            for (; 0 <= --h; ) {
                var _ = n[--m] == u ? this.DM : Math.floor(n[m] * d + (n[m - 1] + f) * g);
                if ((n[m] += i.am(0, _, n, h, 0, c)) < _)
                    for (i.dlShiftTo(h, x),
                    n.subTo(x, n); n[m] < --_; )
                        n.subTo(x, n)
            }
            null != t && (n.drShiftTo(c, t),
            a != s && BigInteger.ZERO.subTo(t, t)),
            n.t = c,
            n.clamp(),
            0 < l && n.rShiftTo(l, n),
            a < 0 && BigInteger.ZERO.subTo(n, n)
        }
    }
}
function bnMod(e) {
    var t = nbi();
    return this.abs().divRemTo(e, null, t),
    this.s < 0 && 0 < t.compareTo(BigInteger.ZERO) && e.subTo(t, t),
    t
}
function Classic(e) {
    this.m = e
}
function cConvert(e) {
    return e.s < 0 || 0 <= e.compareTo(this.m) ? e.mod(this.m) : e
}
function cRevert(e) {
    return e
}
function cReduce(e) {
    e.divRemTo(this.m, null, e)
}
function cMulTo(e, t, n) {
    e.multiplyTo(t, n),
    this.reduce(n)
}
function cSqrTo(e, t) {
    e.squareTo(t),
    this.reduce(t)
}
function bnpInvDigit() {
    if (this.t < 1)
        return 0;
    var e = this[0];
    if (0 == (1 & e))
        return 0;
    var t = 3 & e;
    return 0 < (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) ? this.DV - t : -t
}
function Montgomery(e) {
    this.m = e,
    this.mp = e.invDigit(),
    this.mpl = 32767 & this.mp,
    this.mph = this.mp >> 15,
    this.um = (1 << e.DB - 15) - 1,
    this.mt2 = 2 * e.t
}
function montConvert(e) {
    var t = nbi();
    return e.abs().dlShiftTo(this.m.t, t),
    t.divRemTo(this.m, null, t),
    e.s < 0 && 0 < t.compareTo(BigInteger.ZERO) && this.m.subTo(t, t),
    t
}
function montRevert(e) {
    var t = nbi();
    return e.copyTo(t),
    this.reduce(t),
    t
}
function montReduce(e) {
    for (; e.t <= this.mt2; )
        e[e.t++] = 0;
    for (var t = 0; t < this.m.t; ++t) {
        var n = 32767 & e[t]
          , r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
        for (e[n = t + this.m.t] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV; )
            e[n] -= e.DV,
            e[++n]++
    }
    e.clamp(),
    e.drShiftTo(this.m.t, e),
    0 <= e.compareTo(this.m) && e.subTo(this.m, e)
}
function montSqrTo(e, t) {
    e.squareTo(t),
    this.reduce(t)
}
function montMulTo(e, t, n) {
    e.multiplyTo(t, n),
    this.reduce(n)
}
function bnpIsEven() {
    return 0 == (0 < this.t ? 1 & this[0] : this.s)
}
function bnpExp(e, t) {
    if (4294967295 < e || e < 1)
        return BigInteger.ONE;
    var n = nbi()
      , r = nbi()
      , o = t.convert(this)
      , i = nbits(e) - 1;
    for (o.copyTo(n); 0 <= --i; )
        if (t.sqrTo(n, r),
        0 < (e & 1 << i))
            t.mulTo(r, o, n);
        else {
            var a = n;
            n = r,
            r = a
        }
    return t.revert(n)
}
function bnModPowInt(e, t) {
    var n;
    return n = e < 256 || t.isEven() ? new Classic(t) : new Montgomery(t),
    this.exp(e, n)
}
function bnClone() {
    var e = nbi();
    return this.copyTo(e),
    e
}
function bnIntValue() {
    if (this.s < 0) {
        if (1 == this.t)
            return this[0] - this.DV;
        if (0 == this.t)
            return -1
    } else {
        if (1 == this.t)
            return this[0];
        if (0 == this.t)
            return 0
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}
function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
}
function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
}
function bnpChunkSize(e) {
    return Math.floor(Math.LN2 * this.DB / Math.log(e))
}
function bnSigNum() {
    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
}
function bnpToRadix(e) {
    if (null == e && (e = 10),
    0 == this.signum() || e < 2 || 36 < e)
        return "0";
    var t = this.chunkSize(e)
      , n = Math.pow(e, t)
      , r = nbv(n)
      , o = nbi()
      , i = nbi()
      , a = "";
    for (this.divRemTo(r, o, i); 0 < o.signum(); )
        a = (n + i.intValue()).toString(e).substr(1) + a,
        o.divRemTo(r, o, i);
    return i.intValue().toString(e) + a
}
function bnpFromRadix(e, t) {
    this.fromInt(0),
    null == t && (t = 10);
    for (var n = this.chunkSize(t), r = Math.pow(t, n), o = !1, i = 0, a = 0, s = 0; s < e.length; ++s) {
        var l = intAt(e, s);
        l < 0 ? "-" == e.charAt(s) && 0 == this.signum() && (o = !0) : (a = t * a + l,
        ++i >= n && (this.dMultiply(r),
        this.dAddOffset(a, 0),
        a = i = 0))
    }
    0 < i && (this.dMultiply(Math.pow(t, i)),
    this.dAddOffset(a, 0)),
    o && BigInteger.ZERO.subTo(this, this)
}
function bnpFromNumber(e, t, n) {
    if ("number" == typeof t)
        if (e < 2)
            this.fromInt(1);
        else
            for (this.fromNumber(e, n),
            this.testBit(e - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(e - 1), op_or, this),
            this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t); )
                this.dAddOffset(2, 0),
                this.bitLength() > e && this.subTo(BigInteger.ONE.shiftLeft(e - 1), this);
    else {
        var r = new Array
          , o = 7 & e;
        r.length = 1 + (e >> 3),
        t.nextBytes(r),
        0 < o ? r[0] &= (1 << o) - 1 : r[0] = 0,
        this.fromString(r, 256)
    }
}
function bnToByteArray() {
    var e = this.t
      , t = new Array;
    t[0] = this.s;
    var n = this.DB - e * this.DB % 8, r, o = 0;
    if (0 < e--)
        for (n < this.DB && (r = this[e] >> n) != (this.s & this.DM) >> n && (t[o++] = r | this.s << this.DB - n); 0 <= e; )
            n < 8 ? (r = (this[e] & (1 << n) - 1) << 8 - n,
            r |= this[--e] >> (n += this.DB - 8)) : (r = this[e] >> (n -= 8) & 255,
            n <= 0 && (n += this.DB,
            --e)),
            0 != (128 & r) && (r |= -256),
            0 == o && (128 & this.s) != (128 & r) && ++o,
            (0 < o || r != this.s) && (t[o++] = r);
    return t
}
function bnEquals(e) {
    return 0 == this.compareTo(e)
}
function bnMin(e) {
    return this.compareTo(e) < 0 ? this : e
}
function bnMax(e) {
    return 0 < this.compareTo(e) ? this : e
}
function bnpBitwiseTo(e, t, n) {
    var r, o, i = Math.min(e.t, this.t);
    for (r = 0; r < i; ++r)
        n[r] = t(this[r], e[r]);
    if (e.t < this.t) {
        for (o = e.s & this.DM,
        r = i; r < this.t; ++r)
            n[r] = t(this[r], o);
        n.t = this.t
    } else {
        for (o = this.s & this.DM,
        r = i; r < e.t; ++r)
            n[r] = t(o, e[r]);
        n.t = e.t
    }
    n.s = t(this.s, e.s),
    n.clamp()
}
function op_and(e, t) {
    return e & t
}
function bnAnd(e) {
    var t = nbi();
    return this.bitwiseTo(e, op_and, t),
    t
}
function op_or(e, t) {
    return e | t
}
function bnOr(e) {
    var t = nbi();
    return this.bitwiseTo(e, op_or, t),
    t
}
function op_xor(e, t) {
    return e ^ t
}
function bnXor(e) {
    var t = nbi();
    return this.bitwiseTo(e, op_xor, t),
    t
}
function op_andnot(e, t) {
    return e & ~t
}
function bnAndNot(e) {
    var t = nbi();
    return this.bitwiseTo(e, op_andnot, t),
    t
}
function bnNot() {
    for (var e = nbi(), t = 0; t < this.t; ++t)
        e[t] = this.DM & ~this[t];
    return e.t = this.t,
    e.s = ~this.s,
    e
}
function bnShiftLeft(e) {
    var t = nbi();
    return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
    t
}
function bnShiftRight(e) {
    var t = nbi();
    return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
    t
}
function lbit(e) {
    if (0 == e)
        return -1;
    var t = 0;
    return 0 == (65535 & e) && (e >>= 16,
    t += 16),
    0 == (255 & e) && (e >>= 8,
    t += 8),
    0 == (15 & e) && (e >>= 4,
    t += 4),
    0 == (3 & e) && (e >>= 2,
    t += 2),
    0 == (1 & e) && ++t,
    t
}
function bnGetLowestSetBit() {
    for (var e = 0; e < this.t; ++e)
        if (0 != this[e])
            return e * this.DB + lbit(this[e]);
    return this.s < 0 ? this.t * this.DB : -1
}
function cbit(e) {
    for (var t = 0; 0 != e; )
        e &= e - 1,
        ++t;
    return t
}
function bnBitCount() {
    for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n)
        e += cbit(this[n] ^ t);
    return e
}
function bnTestBit(e) {
    var t = Math.floor(e / this.DB);
    return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
}
function bnpChangeBit(e, t) {
    var n = BigInteger.ONE.shiftLeft(e);
    return this.bitwiseTo(n, t, n),
    n
}
function bnSetBit(e) {
    return this.changeBit(e, op_or)
}
function bnClearBit(e) {
    return this.changeBit(e, op_andnot)
}
function bnFlipBit(e) {
    return this.changeBit(e, op_xor)
}
function bnpAddTo(e, t) {
    for (var n = 0, r = 0, o = Math.min(e.t, this.t); n < o; )
        r += this[n] + e[n],
        t[n++] = r & this.DM,
        r >>= this.DB;
    if (e.t < this.t) {
        for (r += e.s; n < this.t; )
            r += this[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
        r += this.s
    } else {
        for (r += this.s; n < e.t; )
            r += e[n],
            t[n++] = r & this.DM,
            r >>= this.DB;
        r += e.s
    }
    t.s = r < 0 ? -1 : 0,
    0 < r ? t[n++] = r : r < -1 && (t[n++] = this.DV + r),
    t.t = n,
    t.clamp()
}
function bnAdd(e) {
    var t = nbi();
    return this.addTo(e, t),
    t
}
function bnSubtract(e) {
    var t = nbi();
    return this.subTo(e, t),
    t
}
function bnMultiply(e) {
    var t = nbi();
    return this.multiplyTo(e, t),
    t
}
function bnSquare() {
    var e = nbi();
    return this.squareTo(e),
    e
}
function bnDivide(e) {
    var t = nbi();
    return this.divRemTo(e, t, null),
    t
}
function bnRemainder(e) {
    var t = nbi();
    return this.divRemTo(e, null, t),
    t
}
function bnDivideAndRemainder(e) {
    var t = nbi()
      , n = nbi();
    return this.divRemTo(e, t, n),
    new Array(t,n)
}
function bnpDMultiply(e) {
    this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
    ++this.t,
    this.clamp()
}
function bnpDAddOffset(e, t) {
    if (0 != e) {
        for (; this.t <= t; )
            this[this.t++] = 0;
        for (this[t] += e; this[t] >= this.DV; )
            this[t] -= this.DV,
            ++t >= this.t && (this[this.t++] = 0),
            ++this[t]
    }
}
function NullExp() {}
function nNop(e) {
    return e
}
function nMulTo(e, t, n) {
    e.multiplyTo(t, n)
}
function nSqrTo(e, t) {
    e.squareTo(t)
}
function bnPow(e) {
    return this.exp(e, new NullExp)
}
function bnpMultiplyLowerTo(e, t, n) {
    var r = Math.min(this.t + e.t, t), o;
    for (n.s = 0,
    n.t = r; 0 < r; )
        n[--r] = 0;
    for (o = n.t - this.t; r < o; ++r)
        n[r + this.t] = this.am(0, e[r], n, r, 0, this.t);
    for (o = Math.min(e.t, t); r < o; ++r)
        this.am(0, e[r], n, r, 0, t - r);
    n.clamp()
}
function bnpMultiplyUpperTo(e, t, n) {
    --t;
    var r = n.t = this.t + e.t - t;
    for (n.s = 0; 0 <= --r; )
        n[r] = 0;
    for (r = Math.max(t - this.t, 0); r < e.t; ++r)
        n[this.t + r - t] = this.am(t - r, e[r], n, 0, 0, this.t + r - t);
    n.clamp(),
    n.drShiftTo(1, n)
}
function Barrett(e) {
    this.r2 = nbi(),
    this.q3 = nbi(),
    BigInteger.ONE.dlShiftTo(2 * e.t, this.r2),
    this.mu = this.r2.divide(e),
    this.m = e
}
function barrettConvert(e) {
    if (e.s < 0 || e.t > 2 * this.m.t)
        return e.mod(this.m);
    if (e.compareTo(this.m) < 0)
        return e;
    var t = nbi();
    return e.copyTo(t),
    this.reduce(t),
    t
}
function barrettRevert(e) {
    return e
}
function barrettReduce(e) {
    for (e.drShiftTo(this.m.t - 1, this.r2),
    e.t > this.m.t + 1 && (e.t = this.m.t + 1,
    e.clamp()),
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0; )
        e.dAddOffset(1, this.m.t + 1);
    for (e.subTo(this.r2, e); 0 <= e.compareTo(this.m); )
        e.subTo(this.m, e)
}
function barrettSqrTo(e, t) {
    e.squareTo(t),
    this.reduce(t)
}
function barrettMulTo(e, t, n) {
    e.multiplyTo(t, n),
    this.reduce(n)
}
function bnModPow(e, t) {
    var n = e.bitLength(), r, o = nbv(1), i;
    if (n <= 0)
        return o;
    r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6,
    i = n < 8 ? new Classic(t) : t.isEven() ? new Barrett(t) : new Montgomery(t);
    var a = new Array
      , s = 3
      , l = r - 1
      , c = (1 << r) - 1;
    if (a[1] = i.convert(this),
    1 < r) {
        var u = nbi();
        for (i.sqrTo(a[1], u); s <= c; )
            a[s] = nbi(),
            i.mulTo(u, a[s - 2], a[s]),
            s += 2
    }
    var p = e.t - 1, d, g = !0, f = nbi(), m;
    for (n = nbits(e[p]) - 1; 0 <= p; ) {
        for (l <= n ? d = e[p] >> n - l & c : (d = (e[p] & (1 << n + 1) - 1) << l - n,
        0 < p && (d |= e[p - 1] >> this.DB + n - l)),
        s = r; 0 == (1 & d); )
            d >>= 1,
            --s;
        if ((n -= s) < 0 && (n += this.DB,
        --p),
        g)
            a[d].copyTo(o),
            g = !1;
        else {
            for (; 1 < s; )
                i.sqrTo(o, f),
                i.sqrTo(f, o),
                s -= 2;
            0 < s ? i.sqrTo(o, f) : (m = o,
            o = f,
            f = m),
            i.mulTo(f, a[d], o)
        }
        for (; 0 <= p && 0 == (e[p] & 1 << n); )
            i.sqrTo(o, f),
            m = o,
            o = f,
            f = m,
            --n < 0 && (n = this.DB - 1,
            --p)
    }
    return i.revert(o)
}
function bnGCD(e) {
    var t = this.s < 0 ? this.negate() : this.clone()
      , n = e.s < 0 ? e.negate() : e.clone();
    if (t.compareTo(n) < 0) {
        var r = t;
        t = n,
        n = r
    }
    var o = t.getLowestSetBit()
      , i = n.getLowestSetBit();
    if (i < 0)
        return t;
    for (o < i && (i = o),
    0 < i && (t.rShiftTo(i, t),
    n.rShiftTo(i, n)); 0 < t.signum(); )
        0 < (o = t.getLowestSetBit()) && t.rShiftTo(o, t),
        0 < (o = n.getLowestSetBit()) && n.rShiftTo(o, n),
        0 <= t.compareTo(n) ? (t.subTo(n, t),
        t.rShiftTo(1, t)) : (n.subTo(t, n),
        n.rShiftTo(1, n));
    return 0 < i && n.lShiftTo(i, n),
    n
}
function bnpModInt(e) {
    if (e <= 0)
        return 0;
    var t = this.DV % e
      , n = this.s < 0 ? e - 1 : 0;
    if (0 < this.t)
        if (0 == t)
            n = this[0] % e;
        else
            for (var r = this.t - 1; 0 <= r; --r)
                n = (t * n + this[r]) % e;
    return n
}
function bnModInverse(e) {
    var t = e.isEven();
    if (this.isEven() && t || 0 == e.signum())
        return BigInteger.ZERO;
    for (var n = e.clone(), r = this.clone(), o = nbv(1), i = nbv(0), a = nbv(0), s = nbv(1); 0 != n.signum(); ) {
        for (; n.isEven(); )
            n.rShiftTo(1, n),
            t ? (o.isEven() && i.isEven() || (o.addTo(this, o),
            i.subTo(e, i)),
            o.rShiftTo(1, o)) : i.isEven() || i.subTo(e, i),
            i.rShiftTo(1, i);
        for (; r.isEven(); )
            r.rShiftTo(1, r),
            t ? (a.isEven() && s.isEven() || (a.addTo(this, a),
            s.subTo(e, s)),
            a.rShiftTo(1, a)) : s.isEven() || s.subTo(e, s),
            s.rShiftTo(1, s);
        0 <= n.compareTo(r) ? (n.subTo(r, n),
        t && o.subTo(a, o),
        i.subTo(s, i)) : (r.subTo(n, r),
        t && a.subTo(o, a),
        s.subTo(i, s))
    }
    return 0 != r.compareTo(BigInteger.ONE) ? BigInteger.ZERO : 0 <= s.compareTo(e) ? s.subtract(e) : s.signum() < 0 ? (s.addTo(e, s),
    s.signum() < 0 ? s.add(e) : s) : s
}
Classic.prototype.convert = cConvert,
Classic.prototype.revert = cRevert,
Classic.prototype.reduce = cReduce,
Classic.prototype.mulTo = cMulTo,
Classic.prototype.sqrTo = cSqrTo,
Montgomery.prototype.convert = montConvert,
Montgomery.prototype.revert = montRevert,
Montgomery.prototype.reduce = montReduce,
Montgomery.prototype.mulTo = montMulTo,
Montgomery.prototype.sqrTo = montSqrTo,
BigInteger.prototype.copyTo = bnpCopyTo,
BigInteger.prototype.fromInt = bnpFromInt,
BigInteger.prototype.fromString = bnpFromString,
BigInteger.prototype.clamp = bnpClamp,
BigInteger.prototype.dlShiftTo = bnpDLShiftTo,
BigInteger.prototype.drShiftTo = bnpDRShiftTo,
BigInteger.prototype.lShiftTo = bnpLShiftTo,
BigInteger.prototype.rShiftTo = bnpRShiftTo,
BigInteger.prototype.subTo = bnpSubTo,
BigInteger.prototype.multiplyTo = bnpMultiplyTo,
BigInteger.prototype.squareTo = bnpSquareTo,
BigInteger.prototype.divRemTo = bnpDivRemTo,
BigInteger.prototype.invDigit = bnpInvDigit,
BigInteger.prototype.isEven = bnpIsEven,
BigInteger.prototype.exp = bnpExp,
BigInteger.prototype.toString = bnToString,
BigInteger.prototype.negate = bnNegate,
BigInteger.prototype.abs = bnAbs,
BigInteger.prototype.compareTo = bnCompareTo,
BigInteger.prototype.bitLength = bnBitLength,
BigInteger.prototype.mod = bnMod,
BigInteger.prototype.modPowInt = bnModPowInt,
BigInteger.ZERO = nbv(0),
BigInteger.ONE = nbv(1),
NullExp.prototype.convert = nNop,
NullExp.prototype.revert = nNop,
NullExp.prototype.mulTo = nMulTo,
NullExp.prototype.sqrTo = nSqrTo,
Barrett.prototype.convert = barrettConvert,
Barrett.prototype.revert = barrettRevert,
Barrett.prototype.reduce = barrettReduce,
Barrett.prototype.mulTo = barrettMulTo,
Barrett.prototype.sqrTo = barrettSqrTo;
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
  , lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
    var t, n = this.abs();
    if (1 == n.t && n[0] <= lowprimes[lowprimes.length - 1]) {
        for (t = 0; t < lowprimes.length; ++t)
            if (n[0] == lowprimes[t])
                return !0;
        return !1
    }
    if (n.isEven())
        return !1;
    for (t = 1; t < lowprimes.length; ) {
        for (var r = lowprimes[t], o = t + 1; o < lowprimes.length && r < lplim; )
            r *= lowprimes[o++];
        for (r = n.modInt(r); t < o; )
            if (r % lowprimes[t++] == 0)
                return !1
    }
    return n.millerRabin(e)
}
function bnpMillerRabin(e, t) {
    var n = this.subtract(BigInteger.ONE)
      , r = n.getLowestSetBit();
    if (r <= 0)
        return !1;
    var o = n.shiftRight(r);
    (e = e + 1 >> 1) > lowprimes.length && (e = lowprimes.length);
    for (var i = nbi(), a, s = void 0 !== t ? t + 1 : e, l = void 0 !== t ? t : 0; l < s; ++l) {
        i.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var c = i.modPow(o, this);
        if (0 != c.compareTo(BigInteger.ONE) && 0 != c.compareTo(n)) {
            for (var u = 1; u++ < r && 0 != c.compareTo(n); )
                if (0 == (c = c.modPowInt(2, this)).compareTo(BigInteger.ONE))
                    return !1;
            if (0 != c.compareTo(n))
                return !1
        }
    }
    return !0
}
function parseBigInt(e, t) {
    return new BigInteger(e,t)
}
function linebrk(e, t) {
    for (var n = "", r = 0; r + t < e.length; )
        n += e.substring(r, r + t) + "\n",
        r += t;
    return n + e.substring(r, e.length)
}
function byte2Hex(e) {
    return e < 16 ? "0" + e.toString(16) : e.toString(16)
}
function pkcs1pad2(e, t) {
    if (t < e.length + 11)
        return alert(gs("Message too long for RSA")),
        null;
    for (var n = new Array, r = e.length - 1; 0 <= r && 0 < t; ) {
        var o = e.charCodeAt(r--);
        o < 128 ? n[--t] = o : 127 < o && o < 2048 ? (n[--t] = 63 & o | 128,
        n[--t] = o >> 6 | 192) : (n[--t] = 63 & o | 128,
        n[--t] = o >> 6 & 63 | 128,
        n[--t] = o >> 12 | 224)
    }
    n[--t] = 0;
    for (var i = new SecureRandom, a = new Array; 2 < t; ) {
        for (a[0] = 0; 0 == a[0]; )
            i.nextBytes(a);
        n[--t] = a[0]
    }
    return n[--t] = 2,
    n[--t] = 0,
    new BigInteger(n)
}
function RSAKey() {
    this.n = null,
    this.e = 0,
    this.d = null,
    this.p = null,
    this.q = null,
    this.dmp1 = null,
    this.dmq1 = null,
    this.coeff = null
}
function RSASetPublic(e, t) {
    null != e && null != t && 0 < e.length && 0 < t.length ? (this.n = parseBigInt(e, 16),
    this.e = parseInt(t, 16)) : alert(gs("Invalid RSA public key"))
}
function RSADoPublic(e) {
    return e.modPowInt(this.e, this.n)
}
function RSAEncrypt(e) {
    var t = oaeppad(e);
    if (null == t)
        return null;
    var n = this.doPublic(t);
    if (null == n)
        return null;
    for (var r = n.toString(16); r.length < 512; )
        r = "0" + r;
    return r
}
function pkcs1unpad2(e, t) {
    for (var n = e.toByteArray(), r = 0; r < n.length && 0 == n[r]; )
        ++r;
    if (n.length - r != t - 1 || 2 != n[r])
        return null;
    for (++r; 0 != n[r]; )
        if (++r >= n.length)
            return null;
    for (var o = ""; ++r < n.length; ) {
        var i = 255 & n[r];
        i < 128 ? o += String.fromCharCode(i) : 191 < i && i < 224 ? (o += String.fromCharCode((31 & i) << 6 | 63 & n[r + 1]),
        ++r) : (o += String.fromCharCode((15 & i) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]),
        r += 2)
    }
    return o
}
function RSASetPrivate(e, t, n) {
    null != e && null != t && 0 < e.length && 0 < t.length ? (this.n = parseBigInt(e, 16),
    this.e = parseInt(t, 16),
    this.d = parseBigInt(n, 16)) : alert(gs("Invalid RSA private key"))
}
function RSASetPrivateEx(e, t, n, r, o, i, a, s) {
    null != e && null != t && 0 < e.length && 0 < t.length ? (this.n = parseBigInt(e, 16),
    this.e = parseInt(t, 16),
    this.d = parseBigInt(n, 16),
    this.p = parseBigInt(r, 16),
    this.q = parseBigInt(o, 16),
    this.dmp1 = parseBigInt(i, 16),
    this.dmq1 = parseBigInt(a, 16),
    this.coeff = parseBigInt(s, 16)) : alert(gs("Invalid RSA private key"))
}
function RSAGenerate(e, t) {
    var n = new SecureRandom
      , r = e >> 1;
    this.e = parseInt(t, 16);
    for (var o = new BigInteger(t,16); ; ) {
        for (; this.p = new BigInteger(e - r,1,n),
        0 != this.p.subtract(BigInteger.ONE).gcd(o).compareTo(BigInteger.ONE) || !this.p.isProbablePrime(10); )
            ;
        for (; this.q = new BigInteger(r,1,n),
        0 != this.q.subtract(BigInteger.ONE).gcd(o).compareTo(BigInteger.ONE) || !this.q.isProbablePrime(10); )
            ;
        if (this.p.compareTo(this.q) <= 0) {
            var i = this.p;
            this.p = this.q,
            this.q = i
        }
        var a = this.p.subtract(BigInteger.ONE)
          , s = this.q.subtract(BigInteger.ONE)
          , l = a.multiply(s);
        if (0 == l.gcd(o).compareTo(BigInteger.ONE)) {
            this.n = this.p.multiply(this.q),
            this.d = o.modInverse(l),
            this.dmp1 = this.d.mod(a),
            this.dmq1 = this.d.mod(s),
            this.coeff = this.q.modInverse(this.p);
            break
        }
    }
}
function RSADoPrivate(e) {
    if (null == this.p || null == this.q)
        return e.modPow(this.d, this.n);
    for (var t = e.mod(this.p).modPow(this.dmp1, this.p), n = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(n) < 0; )
        t = t.add(this.p);
    return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
}
function RSADecrypt(e) {
    var t = parseBigInt(e, 16)
      , n = this.doPrivate(t);
    return null == n ? null : oaepunpad(n)
}
BigInteger.prototype.chunkSize = bnpChunkSize,
BigInteger.prototype.toRadix = bnpToRadix,
BigInteger.prototype.fromRadix = bnpFromRadix,
BigInteger.prototype.fromNumber = bnpFromNumber,
BigInteger.prototype.bitwiseTo = bnpBitwiseTo,
BigInteger.prototype.changeBit = bnpChangeBit,
BigInteger.prototype.addTo = bnpAddTo,
BigInteger.prototype.dMultiply = bnpDMultiply,
BigInteger.prototype.dAddOffset = bnpDAddOffset,
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo,
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo,
BigInteger.prototype.modInt = bnpModInt,
BigInteger.prototype.millerRabin = bnpMillerRabin,
BigInteger.prototype.clone = bnClone,
BigInteger.prototype.intValue = bnIntValue,
BigInteger.prototype.byteValue = bnByteValue,
BigInteger.prototype.shortValue = bnShortValue,
BigInteger.prototype.signum = bnSigNum,
BigInteger.prototype.toByteArray = bnToByteArray,
BigInteger.prototype.equals = bnEquals,
BigInteger.prototype.min = bnMin,
BigInteger.prototype.max = bnMax,
BigInteger.prototype.and = bnAnd,
BigInteger.prototype.or = bnOr,
BigInteger.prototype.xor = bnXor,
BigInteger.prototype.andNot = bnAndNot,
BigInteger.prototype.not = bnNot,
BigInteger.prototype.shiftLeft = bnShiftLeft,
BigInteger.prototype.shiftRight = bnShiftRight,
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit,
BigInteger.prototype.bitCount = bnBitCount,
BigInteger.prototype.testBit = bnTestBit,
BigInteger.prototype.setBit = bnSetBit,
BigInteger.prototype.clearBit = bnClearBit,
BigInteger.prototype.flipBit = bnFlipBit,
BigInteger.prototype.add = bnAdd,
BigInteger.prototype.subtract = bnSubtract,
BigInteger.prototype.multiply = bnMultiply,
BigInteger.prototype.divide = bnDivide,
BigInteger.prototype.remainder = bnRemainder,
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder,
BigInteger.prototype.modPow = bnModPow,
BigInteger.prototype.modInverse = bnModInverse,
BigInteger.prototype.pow = bnPow,
BigInteger.prototype.gcd = bnGCD,
BigInteger.prototype.isProbablePrime = bnIsProbablePrime,
BigInteger.prototype.square = bnSquare,
RSAKey.prototype.doPublic = RSADoPublic,
RSAKey.prototype.setPublic = RSASetPublic,
RSAKey.prototype.encrypt = RSAEncrypt,
RSAKey.prototype.doPrivate = RSADoPrivate,
RSAKey.prototype.setPrivate = RSASetPrivate,
RSAKey.prototype.setPrivateEx = RSASetPrivateEx,
RSAKey.prototype.generate = RSAGenerate,
RSAKey.prototype.decrypt = RSADecrypt;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , b64pad = "=";
function hex2b64(e) {
    var t, n, r = "";
    for (t = 0; t + 3 <= e.length; t += 3)
        n = parseInt(e.substring(t, t + 3), 16),
        r += b64map.charAt(n >> 6) + b64map.charAt(63 & n);
    for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16),
    r += b64map.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16),
    r += b64map.charAt(n >> 2) + b64map.charAt((3 & n) << 4)); 0 < (3 & r.length); )
        r += b64pad;
    return r
}
function b64tohex(e) {
    var t = "", n, r = 0, o;
    for (n = 0; n < e.length && e.charAt(n) != b64pad; ++n)
        v = b64map.indexOf(e.charAt(n)),
        v < 0 || (r = 0 == r ? (t += int2char(v >> 2),
        o = 3 & v,
        1) : 1 == r ? (t += int2char(o << 2 | v >> 4),
        o = 15 & v,
        2) : 2 == r ? (t += int2char(o),
        t += int2char(v >> 2),
        o = 3 & v,
        3) : (t += int2char(o << 2 | v >> 4),
        t += int2char(15 & v),
        0));
    return 1 == r && (t += int2char(o << 2)),
    t
}
function b64toBA(e) {
    var t = b64tohex(e), n, r = new Array;
    for (n = 0; 2 * n < t.length; ++n)
        r[n] = parseInt(t.substring(2 * n, 2 * n + 2), 16);
    return r
}
function Stream(e, t) {
    e instanceof Stream ? (this.enc = e.enc,
    this.pos = e.pos) : (this.enc = e,
    this.pos = t)
}
function ASN1(e, t, n, r, o) {
    this.stream = e,
    this.header = t,
    this.length = n,
    this.tag = r,
    this.sub = o
}
Stream.prototype.get = function(e) {
    if (null == e && (e = this.pos++),
    e >= this.enc.length)
        throw "Requesting byte offset " + e + " on a stream of length " + this.enc.length;
    return this.enc[e]
}
,
Stream.prototype.hexDigits = "0123456789ABCDEF",
Stream.prototype.hexByte = function(e) {
    return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
}
,
Stream.prototype.hexDump = function(e, t) {
    for (var n = "", r = e; r < t; ++r)
        switch (n += this.hexByte(this.get(r)),
        15 & r) {
        case 7:
            n += "  ";
            break;
        case 15:
            n += "\n";
            break;
        default:
            n += " "
        }
    return n
}
,
Stream.prototype.parseStringISO = function(e, t) {
    for (var n = "", r = e; r < t; ++r)
        n += String.fromCharCode(this.get(r));
    return n
}
,
Stream.prototype.parseStringUTF = function(e, t) {
    for (var n = "", r = 0, o = e; o < t; ) {
        var r;
        n += (r = this.get(o++)) < 128 ? String.fromCharCode(r) : 191 < r && r < 224 ? String.fromCharCode((31 & r) << 6 | 63 & this.get(o++)) : String.fromCharCode((15 & r) << 12 | (63 & this.get(o++)) << 6 | 63 & this.get(o++))
    }
    return n
}
,
Stream.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
Stream.prototype.parseTime = function(e, t) {
    var n = this.parseStringISO(e, t)
      , r = this.reTime.exec(n);
    return r ? (n = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4],
    r[5] && (n += ":" + r[5],
    r[6] && (n += ":" + r[6],
    r[7] && (n += "." + r[7]))),
    r[8] && (n += " UTC",
    "Z" != r[8] && (n += r[8],
    r[9] && (n += ":" + r[9]))),
    n) : "Unrecognized time: " + n
}
,
Stream.prototype.parseInteger = function(e, t) {
    var n = t - e;
    if (4 < n) {
        n <<= 3;
        var r = this.get(e);
        if (0 == r)
            n -= 8;
        else
            for (; r < 128; )
                r <<= 1,
                --n;
        return "(" + n + " bit)"
    }
    for (var o = 0, i = e; i < t; ++i)
        o = o << 8 | this.get(i);
    return o
}
,
Stream.prototype.parseBitString = function(e, t) {
    var n = this.get(e)
      , r = (t - e - 1 << 3) - n
      , o = "(" + r + " bit)";
    if (r <= 20) {
        var i = n;
        o += " ";
        for (var a = t - 1; e < a; --a) {
            for (var s = this.get(a), l = i; l < 8; ++l)
                o += s >> l & 1 ? "1" : "0";
            i = 0
        }
    }
    return o
}
,
Stream.prototype.parseOctetString = function(e, t) {
    var n = t - e
      , r = "(" + n + " byte) ";
    20 < n && (t = e + 20);
    for (var o = e; o < t; ++o)
        r += this.hexByte(this.get(o));
    return 20 < n && (r += String.fromCharCode(8230)),
    r
}
,
Stream.prototype.parseOID = function(e, t) {
    for (var n, r = 0, o = 0, i = e; i < t; ++i) {
        var a = this.get(i);
        r = r << 7 | 127 & a,
        o += 7,
        128 & a || (null == n ? n = parseInt(r / 40) + "." + r % 40 : n += "." + (31 <= o ? "bigint" : r),
        r = o = 0),
        n += String.fromCharCode()
    }
    return n
}
,
ASN1.prototype.typeName = function() {
    if (null == this.tag)
        return "unknown";
    var e = this.tag >> 6
      , t = this.tag >> 5 & 1
      , n = 31 & this.tag;
    switch (e) {
    case 0:
        switch (n) {
        case 0:
            return "EOC";
        case 1:
            return "BOOLEAN";
        case 2:
            return "INTEGER";
        case 3:
            return "BIT_STRING";
        case 4:
            return "OCTET_STRING";
        case 5:
            return "NULL";
        case 6:
            return "OBJECT_IDENTIFIER";
        case 7:
            return "ObjectDescriptor";
        case 8:
            return "EXTERNAL";
        case 9:
            return "REAL";
        case 10:
            return "ENUMERATED";
        case 11:
            return "EMBEDDED_PDV";
        case 12:
            return "UTF8String";
        case 16:
            return "SEQUENCE";
        case 17:
            return "SET";
        case 18:
            return "NumericString";
        case 19:
            return "PrintableString";
        case 20:
            return "TeletexString";
        case 21:
            return "VideotexString";
        case 22:
            return "IA5String";
        case 23:
            return "UTCTime";
        case 24:
            return "GeneralizedTime";
        case 25:
            return "GraphicString";
        case 26:
            return "VisibleString";
        case 27:
            return "GeneralString";
        case 28:
            return "UniversalString";
        case 30:
            return "BMPString";
        default:
            return "Universal_" + n.toString(16)
        }
    case 1:
        return "Application_" + n.toString(16);
    case 2:
        return "[" + n + "]";
    case 3:
        return "Private_" + n.toString(16)
    }
}
,
ASN1.prototype.content = function() {
    if (null == this.tag)
        return null;
    var e;
    if (0 != this.tag >> 6)
        return null == this.sub ? null : "(" + this.sub.length + ")";
    var t = 31 & this.tag
      , n = this.posContent()
      , r = Math.abs(this.length);
    switch (t) {
    case 1:
        return 0 == this.stream.get(n) ? "false" : "true";
    case 2:
        return this.stream.parseInteger(n, n + r);
    case 3:
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(n, n + r);
    case 4:
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + r);
    case 6:
        return this.stream.parseOID(n, n + r);
    case 16:
    case 17:
        return "(" + this.sub.length + " elem)";
    case 12:
        return this.stream.parseStringUTF(n, n + r);
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 26:
        return this.stream.parseStringISO(n, n + r);
    case 23:
    case 24:
        return this.stream.parseTime(n, n + r)
    }
    return null
}
,
ASN1.prototype.toString = function() {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null == this.sub ? "null" : this.sub.length) + "]"
}
,
ASN1.prototype.toPrettyString = function(e) {
    null == e && (e = "");
    var t = e + this.typeName() + " @" + this.stream.pos;
    if (t += "+" + this.header,
    0 <= this.length && (t += "+"),
    t += this.length,
    32 & this.tag ? t += " (constructed)" : 3 != this.tag && 4 != this.tag || null == this.sub || (t += " (encapsulates)"),
    t += "\n",
    null != this.sub) {
        e += "  ";
        for (var n = 0, r = this.sub.length; n < r; ++n)
            t += this.sub[n].toPrettyString(e)
    }
    return t
}
,
ASN1.prototype.posStart = function() {
    return this.stream.pos
}
,
ASN1.prototype.posContent = function() {
    return this.stream.pos + this.header
}
,
ASN1.prototype.posEnd = function() {
    return this.stream.pos + this.header + Math.abs(this.length)
}
,
ASN1.prototype.fakeHover = function(e) {
    this.node.className += " hover",
    e && (this.head.className += " hover")
}
,
ASN1.prototype.fakeOut = function(e) {
    var t = / ?hover/;
    this.node.className = this.node.className.replace(t, ""),
    e && (this.head.className = this.head.className.replace(t, ""))
}
,
ASN1.prototype.toHexDOM_sub = function(e, t, n, r, o) {
    if (!(o <= r)) {
        var i = document.createElement("span");
        i.className = t,
        i.appendChild(document.createTextNode(n.hexDump(r, o))),
        e.appendChild(i)
    }
}
,
ASN1.prototype.toHexDOM = function(t) {
    var e = document.createElement("span");
    if (e.className = "hex",
    null == t && (t = e),
    this.head.hexNode = e,
    this.head.onmouseover = function() {
        this.hexNode.className = "hexCurrent"
    }
    ,
    this.head.onmouseout = function() {
        this.hexNode.className = "hex"
    }
    ,
    e.asn1 = this,
    e.onmouseover = function() {
        var e = !t.selected;
        e && (t.selected = this.asn1,
        this.className = "hexCurrent"),
        this.asn1.fakeHover(e)
    }
    ,
    e.onmouseout = function() {
        var e = t.selected == this.asn1;
        this.asn1.fakeOut(e),
        e && (t.selected = null,
        this.className = "hex")
    }
    ,
    this.toHexDOM_sub(e, "tag", this.stream, this.posStart(), this.posStart() + 1),
    this.toHexDOM_sub(e, 0 <= this.length ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()),
    null == this.sub)
        e.appendChild(document.createTextNode(this.stream.hexDump(this.posContent(), this.posEnd())));
    else if (0 < this.sub.length) {
        var n = this.sub[0]
          , r = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(e, "intro", this.stream, this.posContent(), n.posStart());
        for (var o = 0, i = this.sub.length; o < i; ++o)
            e.appendChild(this.sub[o].toHexDOM(t));
        this.toHexDOM_sub(e, "outro", this.stream, r.posEnd(), this.posEnd())
    }
    return e
}
,
ASN1.decodeLength = function(e) {
    var t = e.get()
      , n = 127 & t;
    if (n == t)
        return n;
    if (3 < n)
        throw "Length over 24 bits not supported at position " + (e.pos - 1);
    if (0 == n)
        return -1;
    for (var r = t = 0; r < n; ++r)
        t = t << 8 | e.get();
    return t
}
,
ASN1.hasContent = function(e, t, n) {
    if (32 & e)
        return !0;
    if (e < 3 || 4 < e)
        return !1;
    var r = new Stream(n), o;
    if (3 == e && r.get(),
    r.get() >> 6 & 1)
        return !1;
    try {
        var i = ASN1.decodeLength(r);
        return r.pos - n.pos + i == t
    } catch (e) {
        return !1
    }
}
,
ASN1.decode = function(e) {
    e instanceof Stream || (e = new Stream(e,0));
    var t = new Stream(e)
      , n = e.get()
      , r = ASN1.decodeLength(e)
      , o = e.pos - t.pos
      , i = null;
    if (ASN1.hasContent(n, r, e)) {
        var a = e.pos;
        if (3 == n && e.get(),
        i = [],
        0 <= r) {
            for (var s = a + r; e.pos < s; )
                i[i.length] = ASN1.decode(e);
            if (e.pos != s)
                throw "Content size is not correct for container starting at offset " + a
        } else
            try {
                for (; ; ) {
                    var l = ASN1.decode(e);
                    if (0 == l.tag)
                        break;
                    i[i.length] = l
                }
                r = a - e.pos
            } catch (e) {
                throw "Exception while decoding undefined length content: " + e
            }
    } else
        e.pos += r;
    return new ASN1(t,o,r,n,i)
}
;
var Hex = {}, global_rsa, global_var, global_sieve;
function parse_public_key(e, t) {
    var n = Hex.decode(t), r, o = ASN1.decode(n).toPrettyString(), i;
    i = -1 != o.indexOf("<br>") ? o.split(/<br>/) : o.split(/\n/);
    for (var a = !1, s = 0, l = new Array("n","e"), c = new Object, u = 0; u < i.length; u++) {
        var p = i[u];
        if (-1 != p.indexOf("STRING"))
            a = !0;
        else if (a && -1 != p.indexOf("INTEGER")) {
            var d = p.indexOf("@");
            if (-1 == d)
                return !1;
            var g = p.substring(d + 1);
            if (3 != (g = g.split(/\+/)).length)
                return !1;
            var f = 2 * g[0]
              , m = 2 * g[1]
              , h = 2 * g[2]
              , x = t.substring(f + m, f + m + h);
            c[l[s]] = x,
            s++
        }
    }
    return !(!a || s != l.length) && (e.setPublic(c.n, c.e),
    !0)
}
function parse_private_key(e, t) {
    var n = Hex.decode(t), r, o = ASN1.decode(n).toPrettyString(), i;
    i = -1 != o.indexOf("<br>") ? o.split(/<br>/) : o.split(/\n/);
    for (var a = !1, s = 0, l = new Array(null,"n","e","d","p","q","dp","dq","c"), c = new Object, u = 0; u < i.length; u++) {
        var p = i[u];
        if (-1 != p.indexOf("STRING"))
            a = !0;
        else if (a && -1 != p.indexOf("INTEGER")) {
            if (0 < s) {
                var d = p.indexOf("@");
                if (-1 == d)
                    return !1;
                var g = p.substring(d + 1);
                if (3 != (g = g.split(/\+/)).length)
                    return !1;
                var f = 2 * g[0]
                  , m = 2 * g[1]
                  , h = 2 * g[2]
                  , x = t.substring(f + m, f + m + h);
                c[l[s]] = x
            }
            s++
        }
    }
    return !(!a || s != l.length) && (e.setPrivateEx(c.n, c.e, c.d, c.p, c.q, c.dp, c.dq, c.c),
    !0)
}
function encode_length(e) {
    var t = e.toString(16), n;
    return t.length % 2 == 1 && (t = "0" + t),
    e <= 127 ? t : (128 | t.length / 2).toString(16) + t
}
function encode_integer(e) {
    return (e = e.toUpperCase()).length % 2 == 1 && (e = "0" + e),
    -1 != "89ABCDEF".indexOf(e.charAt(0)) && (e = "00" + e),
    "02" + encode_length(e.length / 2) + e
}
function encode_sequence(e) {
    return "30" + encode_length(e.length / 2) + e
}
function encode_octet_string(e) {
    return "04" + encode_length(e.length / 2) + e
}
function encode_bit_string(e) {
    return "03" + encode_length((e = "00" + e).length / 2) + e
}
function encode_public_key(e) {
    var t = "";
    return t += encode_integer(e.n.toString(16)),
    (t = encode_sequence(t = "300D06092A864886F70D0101010500" + (t = encode_bit_string(t = encode_sequence(t += encode_integer(e.e.toString(16))))))).toUpperCase()
}
function encode_private_key(e) {
    var t = "";
    return t += "020100",
    t += encode_integer(e.n.toString(16)),
    t += encode_integer(e.e.toString(16)),
    t += encode_integer(e.d.toString(16)),
    t += encode_integer(e.p.toString(16)),
    t += encode_integer(e.q.toString(16)),
    t += encode_integer(e.dmp1.toString(16)),
    t += encode_integer(e.dmq1.toString(16)),
    (t = encode_sequence(t = "020100300D06092A864886F70D0101010500" + (t = encode_octet_string(t = encode_sequence(t += encode_integer(e.coeff.toString(16))))))).toUpperCase()
}
function oaeppad(e) {
    for (var t = "", n = SHA1(""), r = 256, o = 20, i = "", a = 0; a < r - e.length - 40 - 2; a++)
        i += String.fromCharCode(0);
    for (var s = n + i + String.fromCharCode(1) + e, l = "", a = 0; a < 20; a++)
        l += String.fromCharCode(get_random(0, 255));
    var c, u = XOR(s, MGF(l, 235)), p, d = XOR(l, MGF(u, 20)), g;
    return new BigInteger(string_to_array(String.fromCharCode(0) + d + u))
}
function oaepunpad(e) {
    for (var t = e.toByteArray(); t.length < 255; )
        t.unshift(0);
    for (var n = "", r = 0; r < t.length; r++) {
        var o = t[r];
        o < 0 && (o += 256),
        n += String.fromCharCode(o)
    }
    if (255 == n.length && (n = String.fromCharCode(0) + n),
    0 != n.charCodeAt(0))
        return "";
    var i = "", a = SHA1(""), s = n.length, l = 20, c = n.substring(1, 21), u = n.substring(21), p, d, g, f = XOR(u, MGF(XOR(c, MGF(u, 20)), s - 20 - 1));
    if (f.substring(0, 20) != a)
        return "";
    for (var r = 20; r < f.length && 1 != f.charCodeAt(r); r++)
        if (0 != f.charCodeAt(r))
            return "";
    return r >= f.length ? "" : f.substring(r + 1)
}
function SHA1(e) {
    function t(e, t) {
        var n;
        return e << t | e >>> 32 - t
    }
    function n(e) {
        var t = "", n, r, o;
        for (n = 0; n <= 6; n += 2)
            o = e >>> 4 * n & 15,
            t += (r = e >>> 4 * n + 4 & 15).toString(16) + o.toString(16);
        return t
    }
    function r(e) {
        var t = "", n, r;
        for (n = 7; 0 <= n; n--)
            t += (r = e >>> 4 * n & 15).toString(16);
        return t
    }
    function o(e) {
        e = e.replace(/\r<br>/g, "<br>");
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            r < 128 ? t += String.fromCharCode(r) : (127 < r && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224),
            t += String.fromCharCode(r >> 6 & 63 | 128)),
            t += String.fromCharCode(63 & r | 128))
        }
        return t
    }
    var i, a, s, l = new Array(80), c = 1732584193, u = 4023233417, p = 2562383102, d = 271733878, g = 3285377520, f, m, h, x, _, v, y = e.length, w = new Array;
    for (a = 0; a < y - 3; a += 4)
        s = e.charCodeAt(a) << 24 | e.charCodeAt(a + 1) << 16 | e.charCodeAt(a + 2) << 8 | e.charCodeAt(a + 3),
        w.push(s);
    switch (y % 4) {
    case 0:
        a = 2147483648;
        break;
    case 1:
        a = e.charCodeAt(y - 1) << 24 | 8388608;
        break;
    case 2:
        a = e.charCodeAt(y - 2) << 24 | e.charCodeAt(y - 1) << 16 | 32768;
        break;
    case 3:
        a = e.charCodeAt(y - 3) << 24 | e.charCodeAt(y - 2) << 16 | e.charCodeAt(y - 1) << 8 | 128
    }
    for (w.push(a); w.length % 16 != 14; )
        w.push(0);
    for (w.push(y >>> 29),
    w.push(y << 3 & 4294967295),
    i = 0; i < w.length; i += 16) {
        for (a = 0; a < 16; a++)
            l[a] = w[i + a];
        for (a = 16; a <= 79; a++)
            l[a] = t(l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16], 1);
        for (f = c,
        m = u,
        h = p,
        x = d,
        _ = g,
        a = 0; a <= 19; a++)
            v = t(f, 5) + (m & h | ~m & x) + _ + l[a] + 1518500249 & 4294967295,
            _ = x,
            x = h,
            h = t(m, 30),
            m = f,
            f = v;
        for (a = 20; a <= 39; a++)
            v = t(f, 5) + (m ^ h ^ x) + _ + l[a] + 1859775393 & 4294967295,
            _ = x,
            x = h,
            h = t(m, 30),
            m = f,
            f = v;
        for (a = 40; a <= 59; a++)
            v = t(f, 5) + (m & h | m & x | h & x) + _ + l[a] + 2400959708 & 4294967295,
            _ = x,
            x = h,
            h = t(m, 30),
            m = f,
            f = v;
        for (a = 60; a <= 79; a++)
            v = t(f, 5) + (m ^ h ^ x) + _ + l[a] + 3395469782 & 4294967295,
            _ = x,
            x = h,
            h = t(m, 30),
            m = f,
            f = v;
        c = c + f & 4294967295,
        u = u + m & 4294967295,
        p = p + h & 4294967295,
        d = d + x & 4294967295,
        g = g + _ & 4294967295
    }
    for (var v = r(c) + r(u) + r(p) + r(d) + r(g), b = Hex.decode(v), A = "", a = 0; a < b.length; a++) {
        var k = b[a];
        k < 0 && (k += 256),
        A += String.fromCharCode(k)
    }
    return A
}
function MGF(e, t) {
    for (var n = "", r = Math.ceil(t / 20), o = 0; o < r; o++) {
        var i;
        n += SHA1(e + I2OSP(o))
    }
    return n
}
function I2OSP(e) {
    for (var t = "", n = 1; n <= 4; n++)
        t = String.fromCharCode(e % 256) + t,
        e >>= 8;
    return t
}
function XOR(e, t) {
    for (var n = "", r = 0; r < e.length; r++) {
        var o = e.charCodeAt(r) ^ t.charCodeAt(r);
        o < 0 && (o += 256),
        n += String.fromCharCode(o)
    }
    return n
}
function string_to_array(e) {
    for (var t = new Array, n = 0; n < e.length; n++)
        t[t.length] = e.charCodeAt(n);
    return t
}
Hex.decode = function(e) {
    if (null == Hex.decoder) {
        for (var t = "0123456789ABCDEF", n = " \f\n\r\t \u2028\u2029", r = [], o = 0; o < 16; ++o)
            r[t.charAt(o)] = o;
        t = t.toLowerCase();
        for (var o = 10; o < 16; ++o)
            r[t.charAt(o)] = o;
        for (var o = 0; o < n.length; ++o)
            r[n.charAt(o)] = -1;
        Hex.decoder = r
    }
    for (var i = [], a = 0, s = 0, o = 0; o < e.length; ++o) {
        var l = e.charAt(o);
        if ("=" == l)
            break;
        if (-1 != (l = Hex.decoder[l])) {
            if (null == l)
                throw "Illegal character at offset " + o;
            a |= l,
            2 <= ++s ? (i[i.length] = a,
            s = a = 0) : a <<= 4
        }
    }
    if (s)
        throw "Hex encoding incomplete: 4 bits missing";
    return i
}
;
var global_e = nbv(17), global_j, global_p, global_first, global_max, global_callback;
function generate_key(e, t) {
    e.e = 17,
    global_rsa = e,
    global_var = "p",
    global_callback = t,
    setTimeout(function() {
        generate_prime()
    }, 0)
}
function finish_generating_key() {
    var e = global_rsa;
    if (e.p.compareTo(e.q) <= 0) {
        var t = e.p;
        e.p = e.q,
        e.q = t
    }
    var n = e.p.subtract(BigInteger.ONE)
      , r = e.q.subtract(BigInteger.ONE)
      , o = n.multiply(r);
    e.n = e.p.multiply(e.q),
    e.d = nbv(e.e).modInverse(o),
    e.dmp1 = e.d.mod(n),
    e.dmq1 = e.d.mod(r),
    e.coeff = e.q.modInverse(e.p),
    global_callback(e)
}
function generate_prime() {
    for (var e = new BigInteger("127804746306617771565130290907657227155653050846679607905329198323075574205473340977159933096399107640015080961471068715210545851266499317553508720220251135299819361731740305938621109247760895038048676161247933788783372750727844704797860102025119363920819503689823071404962495159387923310468886140592221847552",10), t = new BigInteger("179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624224137215",10), n = new SecureRandom, r = BigInteger.ZERO; r.compareTo(e) < 0; )
        r = new BigInteger(1024,n);
    var o = r.add(nbv(1024)).min(t);
    r.isEven() && (r = r.add(BigInteger.ONE)),
    global_sieve = get_sieve(r, o),
    global_j = 0,
    global_p = global_first = r,
    global_max = o,
    first_prime()
}
function first_prime() {
    for (var e = 0; global_j < global_sieve.length; global_j++)
        if (!global_sieve[global_j]) {
            if ((global_p = global_first.add(nbv(2 * global_j))).subtract(BigInteger.ONE).gcd(global_e).equals(BigInteger.ONE) && global_p.isProbablePrime(1))
                return void setTimeout(function() {
                    verify_prime(1)
                }, 0);
            if (1 < ++e)
                return global_j++,
                void setTimeout(function() {
                    first_prime()
                }, 0)
        }
    setTimeout(function() {
        generate_prime()
    }, 0)
}
function verify_prime(e) {
    5 <= e ? (global_rsa[global_var] = global_p,
    "p" == global_var ? (global_var = "q",
    setTimeout(function() {
        generate_prime()
    }, 0)) : "q" == global_var && setTimeout(function() {
        finish_generating_key()
    }, 0)) : global_p.millerRabin(10, e) ? setTimeout(function() {
        verify_prime(e + 1)
    }, 0) : (global_j++,
    setTimeout(function() {
        first_prime()
    }, 0))
}
var primes = new Array(2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999,2003,2011,2017,2027,2029,2039,2053,2063,2069,2081,2083,2087,2089,2099,2111,2113,2129,2131,2137,2141,2143,2153,2161,2179,2203,2207,2213,2221,2237,2239,2243,2251,2267,2269,2273,2281,2287,2293,2297,2309,2311,2333,2339,2341,2347,2351,2357,2371,2377,2381,2383,2389,2393,2399,2411,2417,2423,2437,2441,2447,2459,2467,2473,2477,2503,2521,2531,2539,2543,2549,2551,2557,2579,2591,2593,2609,2617,2621,2633,2647,2657,2659,2663,2671,2677,2683,2687,2689,2693,2699,2707,2711,2713,2719,2729,2731,2741,2749,2753,2767,2777,2789,2791,2797,2801,2803,2819,2833,2837,2843,2851,2857,2861,2879,2887,2897,2903,2909,2917,2927,2939,2953,2957,2963,2969,2971,2999,3001,3011,3019,3023,3037,3041,3049,3061,3067,3079,3083,3089,3109,3119,3121,3137,3163,3167,3169,3181,3187,3191,3203,3209,3217,3221,3229,3251,3253,3257,3259,3271,3299,3301,3307,3313,3319,3323,3329,3331,3343,3347,3359,3361,3371,3373,3389,3391,3407,3413,3433,3449,3457,3461,3463,3467,3469,3491,3499,3511,3517,3527,3529,3533,3539,3541,3547,3557,3559,3571,3581,3583,3593,3607,3613,3617,3623,3631,3637,3643,3659,3671,3673,3677,3691,3697,3701,3709,3719,3727,3733,3739,3761,3767,3769,3779,3793,3797,3803,3821,3823,3833,3847,3851,3853,3863,3877,3881,3889,3907,3911,3917,3919,3923,3929,3931,3943,3947,3967,3989,4001,4003,4007,4013,4019,4021,4027,4049,4051,4057,4073,4079,4091,4093,4099,4111,4127,4129,4133,4139,4153,4157,4159,4177,4201,4211,4217,4219,4229,4231,4241,4243,4253,4259,4261,4271,4273,4283,4289,4297,4327,4337,4339,4349,4357,4363,4373,4391,4397,4409,4421,4423,4441,4447,4451,4457,4463,4481,4483,4493,4507,4513,4517,4519,4523,4547,4549,4561,4567,4583,4591,4597,4603,4621,4637,4639,4643,4649,4651,4657,4663,4673,4679,4691,4703,4721,4723,4729,4733,4751,4759,4783,4787,4789,4793,4799,4801,4813,4817,4831,4861,4871,4877,4889,4903,4909,4919,4931,4933,4937,4943,4951,4957,4967,4969,4973,4987,4993,4999,5003,5009,5011,5021,5023,5039,5051,5059,5077,5081,5087,5099,5101,5107,5113,5119,5147,5153,5167,5171,5179,5189,5197,5209,5227,5231,5233,5237,5261,5273,5279,5281,5297,5303,5309,5323,5333,5347,5351,5381,5387,5393,5399,5407,5413,5417,5419,5431,5437,5441,5443,5449,5471,5477,5479,5483,5501,5503,5507,5519,5521,5527,5531,5557,5563,5569,5573,5581,5591,5623,5639,5641,5647,5651,5653,5657,5659,5669,5683,5689,5693,5701,5711,5717,5737,5741,5743,5749,5779,5783,5791,5801,5807,5813,5821,5827,5839,5843,5849,5851,5857,5861,5867,5869,5879,5881,5897,5903,5923,5927,5939,5953,5981,5987,6007,6011,6029,6037,6043,6047,6053,6067,6073,6079,6089,6091,6101,6113,6121,6131,6133,6143,6151,6163,6173,6197,6199,6203,6211,6217,6221,6229,6247,6257,6263,6269,6271,6277,6287,6299,6301,6311,6317,6323,6329,6337,6343,6353,6359,6361,6367,6373,6379,6389,6397,6421,6427,6449,6451,6469,6473,6481,6491,6521,6529,6547,6551,6553,6563,6569,6571,6577,6581,6599,6607,6619,6637,6653,6659,6661,6673,6679,6689,6691,6701,6703,6709,6719,6733,6737,6761,6763,6779,6781,6791,6793,6803,6823,6827,6829,6833,6841,6857,6863,6869,6871,6883,6899,6907,6911,6917,6947,6949,6959,6961,6967,6971,6977,6983,6991,6997,7001,7013,7019,7027,7039,7043,7057,7069,7079,7103,7109,7121,7127,7129,7151,7159,7177,7187,7193,7207,7211,7213,7219,7229,7237,7243,7247,7253,7283,7297,7307,7309,7321,7331,7333,7349,7351,7369,7393,7411,7417,7433,7451,7457,7459,7477,7481,7487,7489,7499,7507,7517,7523,7529,7537,7541,7547,7549,7559,7561,7573,7577,7583,7589,7591,7603,7607,7621,7639,7643,7649,7669,7673,7681,7687,7691,7699,7703,7717,7723,7727,7741,7753,7757,7759,7789,7793,7817,7823,7829,7841,7853,7867,7873,7877,7879,7883,7901,7907,7919,7927,7933,7937,7949,7951,7963,7993,8009,8011,8017,8039,8053,8059,8069,8081,8087,8089,8093,8101,8111,8117,8123,8147,8161,8167,8171,8179,8191,8209,8219,8221,8231,8233,8237,8243,8263,8269,8273,8287,8291,8293,8297,8311,8317,8329,8353,8363,8369,8377,8387,8389,8419,8423,8429,8431,8443,8447,8461,8467,8501,8513,8521,8527,8537,8539,8543,8563,8573,8581,8597,8599,8609,8623,8627,8629,8641,8647,8663,8669,8677,8681,8689,8693,8699,8707,8713,8719,8731,8737,8741,8747,8753,8761,8779,8783,8803,8807,8819,8821,8831,8837,8839,8849,8861,8863,8867,8887,8893,8923,8929,8933,8941,8951,8963,8969,8971,8999,9001,9007,9011,9013,9029,9041,9043,9049,9059,9067,9091,9103,9109,9127,9133,9137,9151,9157,9161,9173,9181,9187,9199,9203,9209,9221,9227,9239,9241,9257,9277,9281,9283,9293,9311,9319,9323,9337,9341,9343,9349,9371,9377,9391,9397,9403,9413,9419,9421,9431,9433,9437,9439,9461,9463,9467,9473,9479,9491,9497,9511,9521,9533,9539,9547,9551,9587,9601,9613,9619,9623,9629,9631,9643,9649,9661,9677,9679,9689,9697,9719,9721,9733,9739,9743,9749,9767,9769,9781,9787,9791,9803,9811,9817,9829,9833,9839,9851,9857,9859,9871,9883,9887,9901,9907,9923,9929,9931,9941,9949,9967,9973,10007,10009,10037,10039,10061,10067,10069,10079,10091,10093,10099,10103,10111,10133,10139,10141,10151,10159,10163,10169,10177,10181,10193,10211,10223,10243,10247,10253,10259,10267,10271,10273,10289,10301,10303,10313,10321,10331,10333,10337,10343,10357,10369,10391,10399,10427,10429,10433,10453,10457,10459,10463,10477,10487,10499,10501,10513,10529,10531,10559,10567,10589,10597,10601,10607,10613,10627,10631,10639,10651,10657,10663,10667,10687,10691,10709,10711,10723,10729,10733,10739,10753,10771,10781,10789,10799,10831,10837,10847,10853,10859,10861,10867,10883,10889,10891,10903,10909,10937,10939,10949,10957,10973,10979,10987,10993,11003,11027,11047,11057,11059,11069,11071,11083,11087,11093,11113,11117,11119,11131,11149,11159,11161,11171,11173,11177,11197,11213,11239,11243,11251,11257,11261,11273,11279,11287,11299,11311,11317,11321,11329,11351,11353,11369,11383,11393,11399,11411,11423,11437,11443,11447,11467,11471,11483,11489,11491,11497,11503,11519,11527,11549,11551,11579,11587,11593,11597,11617,11621,11633,11657,11677,11681,11689,11699,11701,11717,11719,11731,11743,11777,11779,11783,11789,11801,11807,11813,11821,11827,11831,11833,11839,11863,11867,11887,11897,11903,11909,11923,11927,11933,11939,11941,11953,11959,11969,11971,11981,11987,12007,12011,12037,12041,12043,12049,12071,12073,12097,12101,12107,12109,12113,12119,12143,12149,12157,12161,12163,12197,12203,12211,12227,12239,12241,12251,12253,12263,12269,12277,12281,12289,12301,12323,12329,12343,12347,12373,12377,12379,12391,12401,12409,12413,12421,12433,12437,12451,12457,12473,12479,12487,12491,12497,12503,12511,12517,12527,12539,12541,12547,12553,12569,12577,12583,12589,12601,12611,12613,12619,12637,12641,12647,12653,12659,12671,12689,12697,12703,12713,12721,12739,12743,12757,12763,12781,12791,12799,12809,12821,12823,12829,12841,12853,12889,12893,12899,12907,12911,12917,12919,12923,12941,12953,12959,12967,12973,12979,12983,13001,13003,13007,13009,13033,13037,13043,13049,13063,13093,13099,13103,13109,13121,13127,13147,13151,13159,13163,13171,13177,13183,13187,13217,13219,13229,13241,13249,13259,13267,13291,13297,13309,13313,13327,13331,13337,13339,13367,13381,13397,13399,13411,13417,13421,13441,13451,13457,13463,13469,13477,13487,13499,13513,13523,13537,13553,13567,13577,13591,13597,13613,13619,13627,13633,13649,13669,13679,13681,13687,13691,13693,13697,13709,13711,13721,13723,13729,13751,13757,13759,13763,13781,13789,13799,13807,13829,13831,13841,13859,13873,13877,13879,13883,13901,13903,13907,13913,13921,13931,13933,13963,13967,13997,13999,14009,14011,14029,14033,14051,14057,14071,14081,14083,14087,14107,14143,14149,14153,14159,14173,14177,14197,14207,14221,14243,14249,14251,14281,14293,14303,14321,14323,14327,14341,14347,14369,14387,14389,14401,14407,14411,14419,14423,14431,14437,14447,14449,14461,14479,14489,14503,14519,14533,14537,14543,14549,14551,14557,14561,14563,14591,14593,14621,14627,14629,14633,14639,14653,14657,14669,14683,14699,14713,14717,14723,14731,14737,14741,14747,14753,14759,14767,14771,14779,14783,14797,14813,14821,14827,14831,14843,14851,14867,14869,14879,14887,14891,14897,14923,14929,14939,14947,14951,14957,14969,14983,15013,15017,15031,15053,15061,15073,15077,15083,15091,15101,15107,15121,15131,15137,15139,15149,15161,15173,15187,15193,15199,15217,15227,15233,15241,15259,15263,15269,15271,15277,15287,15289,15299,15307,15313,15319,15329,15331,15349,15359,15361,15373,15377,15383,15391,15401,15413,15427,15439,15443,15451,15461,15467,15473,15493,15497,15511,15527,15541,15551,15559,15569,15581,15583,15601,15607,15619,15629,15641,15643,15647,15649,15661,15667,15671,15679,15683,15727,15731,15733,15737,15739,15749,15761,15767,15773,15787,15791,15797,15803,15809,15817,15823,15859,15877,15881,15887,15889,15901,15907,15913,15919,15923,15937,15959,15971,15973,15991,16001,16007,16033,16057,16061,16063,16067,16069,16073,16087,16091,16097,16103,16111,16127,16139,16141,16183,16187,16189,16193,16217,16223,16229,16231,16249,16253,16267,16273,16301,16319,16333,16339,16349,16361,16363,16369,16381,16411,16417,16421,16427,16433,16447,16451,16453,16477,16481,16487,16493,16519,16529,16547,16553,16561,16567,16573,16603,16607,16619,16631,16633,16649,16651,16657,16661,16673,16691,16693,16699,16703,16729,16741,16747,16759,16763,16787,16811,16823,16829,16831,16843,16871,16879,16883,16889,16901,16903,16921,16927,16931,16937,16943,16963,16979,16981,16987,16993,17011,17021,17027,17029,17033,17041,17047,17053,17077,17093,17099,17107,17117,17123,17137,17159,17167,17183,17189,17191,17203,17207,17209,17231,17239,17257,17291,17293,17299,17317,17321,17327,17333,17341,17351,17359,17377,17383,17387,17389,17393,17401,17417,17419,17431,17443,17449,17467,17471,17477,17483,17489,17491,17497,17509,17519,17539,17551,17569,17573,17579,17581,17597,17599,17609,17623,17627,17657,17659,17669,17681,17683,17707,17713,17729,17737,17747,17749,17761,17783,17789,17791,17807,17827,17837,17839,17851,17863,17881,17891,17903,17909,17911,17921,17923,17929,17939,17957,17959,17971,17977,17981,17987,17989,18013,18041,18043,18047,18049,18059,18061,18077,18089,18097,18119,18121,18127,18131,18133,18143,18149,18169,18181,18191,18199,18211,18217,18223,18229,18233,18251,18253,18257,18269,18287,18289,18301,18307,18311,18313,18329,18341,18353,18367,18371,18379,18397,18401,18413,18427,18433,18439,18443,18451,18457,18461,18481,18493,18503,18517,18521,18523,18539,18541,18553,18583,18587,18593,18617,18637,18661,18671,18679,18691,18701,18713,18719,18731,18743,18749,18757,18773,18787,18793,18797,18803,18839,18859,18869,18899,18911,18913,18917,18919,18947,18959,18973,18979,19001,19009,19013,19031,19037,19051,19069,19073,19079,19081,19087,19121,19139,19141,19157,19163,19181,19183,19207,19211,19213,19219,19231,19237,19249,19259,19267,19273,19289,19301,19309,19319,19333,19373,19379,19381,19387,19391,19403,19417,19421,19423,19427,19429,19433,19441,19447,19457,19463,19469,19471,19477,19483,19489,19501,19507,19531,19541,19543,19553,19559,19571,19577,19583,19597,19603,19609,19661,19681,19687,19697,19699,19709,19717,19727,19739,19751,19753,19759,19763,19777,19793,19801,19813,19819,19841,19843,19853,19861,19867,19889,19891,19913,19919,19927,19937,19949,19961,19963,19973,19979,19991,19993,19997,20011,20021,20023,20029,20047,20051,20063,20071,20089,20101,20107,20113,20117,20123,20129,20143,20147,20149,20161,20173,20177,20183,20201,20219,20231,20233,20249,20261,20269,20287,20297,20323,20327,20333,20341,20347,20353,20357,20359,20369,20389,20393,20399,20407,20411,20431,20441,20443,20477,20479,20483,20507,20509,20521,20533,20543,20549,20551,20563,20593,20599,20611,20627,20639,20641,20663,20681,20693,20707,20717,20719,20731,20743,20747,20749,20753,20759,20771,20773,20789,20807,20809,20849,20857,20873,20879,20887,20897,20899,20903,20921,20929,20939,20947,20959,20963,20981,20983,21001,21011,21013,21017,21019,21023,21031,21059,21061,21067,21089,21101,21107,21121,21139,21143,21149,21157,21163,21169,21179,21187,21191,21193,21211,21221,21227,21247,21269,21277,21283,21313,21317,21319,21323,21341,21347,21377,21379,21383,21391,21397,21401,21407,21419,21433,21467,21481,21487,21491,21493,21499,21503,21517,21521,21523,21529,21557,21559,21563,21569,21577,21587,21589,21599,21601,21611,21613,21617,21647,21649,21661,21673,21683,21701,21713,21727,21737,21739,21751,21757,21767,21773,21787,21799,21803,21817,21821,21839,21841,21851,21859,21863,21871,21881,21893,21911,21929,21937,21943,21961,21977,21991,21997,22003,22013,22027,22031,22037,22039,22051,22063,22067,22073,22079,22091,22093,22109,22111,22123,22129,22133,22147,22153,22157,22159,22171,22189,22193,22229,22247,22259,22271,22273,22277,22279,22283,22291,22303,22307,22343,22349,22367,22369,22381,22391,22397,22409,22433,22441,22447,22453,22469,22481,22483,22501,22511,22531,22541,22543,22549,22567,22571,22573,22613,22619,22621,22637,22639,22643,22651,22669,22679,22691,22697,22699,22709,22717,22721,22727,22739,22741,22751,22769,22777,22783,22787,22807,22811,22817,22853,22859,22861,22871,22877,22901,22907,22921,22937,22943,22961,22963,22973,22993,23003,23011,23017,23021,23027,23029,23039,23041,23053,23057,23059,23063,23071,23081,23087,23099,23117,23131,23143,23159,23167,23173,23189,23197,23201,23203,23209,23227,23251,23269,23279,23291,23293,23297,23311,23321,23327,23333,23339,23357,23369,23371,23399,23417,23431,23447,23459,23473,23497,23509,23531,23537,23539,23549,23557,23561,23563,23567,23581,23593,23599,23603,23609,23623,23627,23629,23633,23663,23669,23671,23677,23687,23689,23719,23741,23743,23747,23753,23761,23767,23773,23789,23801,23813,23819,23827,23831,23833,23857,23869,23873,23879,23887,23893,23899,23909,23911,23917,23929,23957,23971,23977,23981,23993,24001,24007,24019,24023,24029,24043,24049,24061,24071,24077,24083,24091,24097,24103,24107,24109,24113,24121,24133,24137,24151,24169,24179,24181,24197,24203,24223,24229,24239,24247,24251,24281,24317,24329,24337,24359,24371,24373,24379,24391,24407,24413,24419,24421,24439,24443,24469,24473,24481,24499,24509,24517,24527,24533,24547,24551,24571,24593,24611,24623,24631,24659,24671,24677,24683,24691,24697,24709,24733,24749,24763,24767,24781,24793,24799,24809,24821,24841,24847,24851,24859,24877,24889,24907,24917,24919,24923,24943,24953,24967,24971,24977,24979,24989,25013,25031,25033,25037,25057,25073,25087,25097,25111,25117,25121,25127,25147,25153,25163,25169,25171,25183,25189,25219,25229,25237,25243,25247,25253,25261,25301,25303,25307,25309,25321,25339,25343,25349,25357,25367,25373,25391,25409,25411,25423,25439,25447,25453,25457,25463,25469,25471,25523,25537,25541,25561,25577,25579,25583,25589,25601,25603,25609,25621,25633,25639,25643,25657,25667,25673,25679,25693,25703,25717,25733,25741,25747,25759,25763,25771,25793,25799,25801,25819,25841,25847,25849,25867,25873,25889,25903,25913,25919,25931,25933,25939,25943,25951,25969,25981,25997,25999,26003,26017,26021,26029,26041,26053,26083,26099,26107,26111,26113,26119,26141,26153,26161,26171,26177,26183,26189,26203,26209,26227,26237,26249,26251,26261,26263,26267,26293,26297,26309,26317,26321,26339,26347,26357,26371,26387,26393,26399,26407,26417,26423,26431,26437,26449,26459,26479,26489,26497,26501,26513,26539,26557,26561,26573,26591,26597,26627,26633,26641,26647,26669,26681,26683,26687,26693,26699,26701,26711,26713,26717,26723,26729,26731,26737,26759,26777,26783,26801,26813,26821,26833,26839,26849,26861,26863,26879,26881,26891,26893,26903,26921,26927,26947,26951,26953,26959,26981,26987,26993,27011,27017,27031,27043,27059,27061,27067,27073,27077,27091,27103,27107,27109,27127,27143,27179,27191,27197,27211,27239,27241,27253,27259,27271,27277,27281,27283,27299,27329,27337,27361,27367,27397,27407,27409,27427,27431,27437,27449,27457,27479,27481,27487,27509,27527,27529,27539,27541,27551,27581,27583,27611,27617,27631,27647,27653,27673,27689,27691,27697,27701,27733,27737,27739,27743,27749,27751,27763,27767,27773,27779,27791,27793,27799,27803,27809,27817,27823,27827,27847,27851,27883,27893,27901,27917,27919,27941,27943,27947,27953,27961,27967,27983,27997,28001,28019,28027,28031,28051,28057,28069,28081,28087,28097,28099,28109,28111,28123,28151,28163,28181,28183,28201,28211,28219,28229,28277,28279,28283,28289,28297,28307,28309,28319,28349,28351,28387,28393,28403,28409,28411,28429,28433,28439,28447,28463,28477,28493,28499,28513,28517,28537,28541,28547,28549,28559,28571,28573,28579,28591,28597,28603,28607,28619,28621,28627,28631,28643,28649,28657,28661,28663,28669,28687,28697,28703,28711,28723,28729,28751,28753,28759,28771,28789,28793,28807,28813,28817,28837,28843,28859,28867,28871,28879,28901,28909,28921,28927,28933,28949,28961,28979,29009,29017,29021,29023,29027,29033,29059,29063,29077,29101,29123,29129,29131,29137,29147,29153,29167,29173,29179,29191,29201,29207,29209,29221,29231,29243,29251,29269,29287,29297,29303,29311,29327,29333,29339,29347,29363,29383,29387,29389,29399,29401,29411,29423,29429,29437,29443,29453,29473,29483,29501,29527,29531,29537,29567,29569,29573,29581,29587,29599,29611,29629,29633,29641,29663,29669,29671,29683,29717,29723,29741,29753,29759,29761,29789,29803,29819,29833,29837,29851,29863,29867,29873,29879,29881,29917,29921,29927,29947,29959,29983,29989,30011,30013,30029,30047,30059,30071,30089,30091,30097,30103,30109,30113,30119,30133,30137,30139,30161,30169,30181,30187,30197,30203,30211,30223,30241,30253,30259,30269,30271,30293,30307,30313,30319,30323,30341,30347,30367,30389,30391,30403,30427,30431,30449,30467,30469,30491,30493,30497,30509,30517,30529,30539,30553,30557,30559,30577,30593,30631,30637,30643,30649,30661,30671,30677,30689,30697,30703,30707,30713,30727,30757,30763,30773,30781,30803,30809,30817,30829,30839,30841,30851,30853,30859,30869,30871,30881,30893,30911,30931,30937,30941,30949,30971,30977,30983,31013,31019,31033,31039,31051,31063,31069,31079,31081,31091,31121,31123,31139,31147,31151,31153,31159,31177,31181,31183,31189,31193,31219,31223,31231,31237,31247,31249,31253,31259,31267,31271,31277,31307,31319,31321,31327,31333,31337,31357,31379,31387,31391,31393,31397,31469,31477,31481,31489,31511,31513,31517,31531,31541,31543,31547,31567,31573,31583,31601,31607,31627,31643,31649,31657,31663,31667,31687,31699,31721,31723,31727,31729,31741,31751,31769,31771,31793,31799,31817,31847,31849,31859,31873,31883,31891,31907,31957,31963,31973,31981,31991,32003,32009,32027,32029,32051,32057,32059,32063,32069,32077,32083,32089,32099,32117,32119,32141,32143,32159,32173,32183,32189,32191,32203,32213,32233,32237,32251,32257,32261,32297,32299,32303,32309,32321,32323,32327,32341,32353,32359,32363,32369,32371,32377,32381,32401,32411,32413,32423,32429,32441,32443,32467,32479,32491,32497,32503,32507,32531,32533,32537,32561,32563,32569,32573,32579,32587,32603,32609,32611,32621,32633,32647,32653,32687,32693,32707,32713,32717,32719);
function get_sieve(e, t) {
    for (var n = nbv(2), r = t.subtract(e).divide(n).add(BigInteger.ONE), o = new Array, i = 0; i < r; i++)
        o[i] = !1;
    for (var i = 0; i < primes.length; i++) {
        var a = nbv(primes[i])
          , s = n.modInverse(a);
        if (!s.equals(BigInteger.ZERO))
            for (var l = a.subtract(e.mod(a)).multiply(s).mod(a); l.compareTo(r) < 0; l = l.add(a))
                o[parseInt(l.toString(10))] = !0
    }
    return o
}
function calculate_time_zone(e) {
    var t = new Date
      , n = new Date(t.getFullYear(),0,1,0,0,0,0)
      , r = new Date(t.getFullYear(),6,1,0,0,0,0)
      , o = n.toGMTString()
      , i = new Date(o.substring(0, o.lastIndexOf(" ") - 1));
    o = r.toGMTString();
    var a, s = (n - i) / 36e5, l = (r - new Date(o.substring(0, o.lastIndexOf(" ") - 1))) / 36e5, c, u, p;
    s == l ? c = "0" : (0 <= s - l && (s = l),
    c = "1");
    if (null == e)
        for (p = 0; p < document.getElementById("timezone").options.length; p++)
            if (document.getElementById("timezone").options[p].value == convert(s) + "," + c) {
                document.getElementById("timezone").selectedIndex = p;
                break
            }
    return convert(s) + "," + c
}
function convert(e) {
    var t = parseInt(e);
    e -= parseInt(e),
    e *= 60;
    var n = Math.abs(parseInt(e));
    e -= parseInt(e),
    e *= 60;
    var r = parseInt(e)
      , o = t;
    return o = t < 10 && 0 < t ? "+0" + t : "+" + t,
    o = 0 == t ? "0" + t : o,
    (o = t < 0 && -10 < t ? "-0" + Math.abs(t) : o) + ":" + (n = n < 10 ? "0" + n : n)
}
this.LPJSON = {},
function() {
    function r(e, t) {
        if (Array.isArray(t)) {
            var n = {};
            return Object.keys(t).forEach(function(e) {
                n[e] = t[e]
            }),
            n
        }
        return t
    }
    "function" != typeof LPJSON.stringify && (LPJSON.stringify = function(e, t, n) {
        return JSON.stringify(e, t || r, n)
    }
    ),
    "function" != typeof LPJSON.parse && (LPJSON.parse = function(e, t) {
        return JSON.parse(e, t)
    }
    )
}();
var rsa_extract_privatekey = function() {
    var e = 19
      , t = 42
      , r = function(e) {
        return !e || e.length <= 42 || 0 !== e.indexOf("LastPassPrivateKey<") || e.indexOf(">LastPassPrivateKey") !== e.length - 19
    };
    return function(e, t) {
        var n = null;
        return e ? (n = "!" == e.charAt(0) ? lpdec(e, t) : AES.Decrypt({
            pass: t + t.substring(0, 16),
            data: btoa(AES.hex2bin(e)),
            b64: !0,
            bits: 256,
            mode: "cbc"
        }),
        r(n) ? "" : n.substring(19, n.length - 19)) : ""
    }
}();
function rsa_encrypt_privatekey_v1(e, t) {
    var n = "LastPassPrivateKey<" + e + ">LastPassPrivateKey", r;
    return AES.bin2hex(atob(AES.Encrypt({
        pass: t + t.substring(0, 16),
        data: n,
        b64: !0,
        bits: 256,
        mode: "cbc"
    }))).toUpperCase()
}
function rsa_encrypt_privatekey_v2(e, t) {
    var n;
    return enccbc("LastPassPrivateKey<" + e + ">LastPassPrivateKey", t)
}
function rsa_encrypt_privatekey(e, t) {
    return rsa_encrypt_privatekey_v1(e, t)
}
function printStackTrace(e) {
    var t = (e = e || {
        guess: !0
    }).e || null
      , n = !!e.guess
      , r = new printStackTrace.implementation
      , o = r.run(t)
      , i = n ? r.guessAnonymousFunctions(o) : o;
    return i.shift(),
    i.shift(),
    i.shift(),
    i.join("\n\n")
}
printStackTrace.implementation = function() {}
,
printStackTrace.implementation.prototype = {
    run: function(e) {
        e = e || this.createException();
        var t = this.mode(e);
        return "other" === t ? this.other(arguments.callee) : this[t](e)
    },
    createException: function() {
        try {
            return this.undef(),
            null
        } catch (e) {
            return e
        }
    },
    mode: function(e) {
        return e.arguments && e.stack ? this._mode = "chrome" : e.message && "undefined" != typeof window && window.opera ? this._mode = e.stacktrace ? "opera10" : "opera" : e.stack ? this._mode = "firefox" : this._mode = "other"
    },
    instrumentFunction: function(t, n, r) {
        var e = (t = t || window)[n];
        t[n] = function e() {
            return r.call(this, printStackTrace().slice(4)),
            t[n]._instrumented.apply(this, arguments)
        }
        ,
        t[n]._instrumented = e
    },
    deinstrumentFunction: function(e, t) {
        e[t].constructor === Function && e[t]._instrumented && e[t]._instrumented.constructor === Function && (e[t] = e[t]._instrumented)
    },
    chrome: function(e) {
        return e.stack.replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n")
    },
    firefox: function(e) {
        return e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n")
    },
    opera10: function(e) {
        var t, n = e.stacktrace.split("\n"), r = "{anonymous}", o = /.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i, i, a, s;
        for (i = 2,
        a = 0,
        s = n.length; i < s - 2; i++)
            if (o.test(n[i])) {
                var l = RegExp.$6 + ":" + RegExp.$1 + ":" + RegExp.$2
                  , c = RegExp.$3;
                c = c.replace(/<anonymous function\:?\s?(\S+)?>/g, r),
                n[a++] = c + "@" + l
            }
        return n.splice(a, n.length - a),
        n
    },
    opera: function(e) {
        var t = e.message.split("\n"), n = "{anonymous}", r = /Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i, o, i, a;
        for (o = 4,
        i = 0,
        a = t.length; o < a; o += 2)
            r.test(t[o]) && (t[i++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : n + "()@" + RegExp.$2 + ":" + RegExp.$1) + " -- " + t[o + 1].replace(/^\s+/, ""));
        return t.splice(i, t.length - i),
        t
    },
    other: function(e) {
        for (var t = "{anonymous}", n = /function\s*([\w\-$]+)?\s*\(/i, r = [], o, i, a = 10; e && r.length < 10; )
            o = n.test(e.toString()) && RegExp.$1 || t,
            i = Array.prototype.slice.call(e.arguments || []),
            r[r.length] = o + "(" + this.stringifyArguments(i) + ")",
            e = e.caller;
        return r
    },
    stringifyArguments: function(e) {
        for (var t = Array.prototype.slice, n = 0; n < e.length; ++n) {
            var r = e[n];
            void 0 === r ? e[n] = "undefined" : null === r ? e[n] = "null" : r.constructor && (r.constructor === Array ? r.length < 3 ? e[n] = "[" + this.stringifyArguments(r) + "]" : e[n] = "[" + this.stringifyArguments(t.call(r, 0, 1)) + "..." + this.stringifyArguments(t.call(r, -1)) + "]" : r.constructor === Object ? e[n] = "#object" : r.constructor === Function ? e[n] = "#function" : r.constructor === String && (e[n] = '"' + r + '"'))
        }
        return e.join(",")
    },
    sourceCache: {},
    ajax: function(e) {
        var t = this.createXMLHTTPObject();
        if (t)
            return t.open("GET", e, !1),
            t.setRequestHeader("User-Agent", "XMLHTTP/1.0"),
            t.send(""),
            t.responseText
    },
    createXMLHTTPObject: function() {
        for (var e, t = [function() {
            return new XMLHttpRequest
        }
        , function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }
        , function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }
        , function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
        ], n = 0; n < t.length; n++)
            try {
                return e = t[n](),
                this.createXMLHTTPObject = t[n],
                e
            } catch (e) {}
    },
    isSameDomain: function(e) {
        return -1 !== e.indexOf(location.hostname)
    },
    getSource: function(e) {
        return e in this.sourceCache || (this.sourceCache[e] = this.ajax(e).split("\n")),
        this.sourceCache[e]
    },
    guessAnonymousFunctions: function(e) {
        for (var t = 0; t < e.length; ++t) {
            var n = /\{anonymous\}\(.*\)@(\w+:\/\/([\-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/
              , r = e[t]
              , o = n.exec(r);
            if (o) {
                var i = o[1]
                  , a = o[4]
                  , s = o[7] || 0;
                if (i && this.isSameDomain(i) && a) {
                    var l = this.guessAnonymousFunction(i, a, s);
                    e[t] = r.replace("{anonymous}", l)
                }
            }
        }
        return e
    },
    guessAnonymousFunction: function(t, e, n) {
        var r;
        try {
            r = this.findFunctionName(this.getSource(t), e)
        } catch (e) {
            r = "getSource failed with url: " + t + ", exception: " + e.toString()
        }
        return r
    },
    findFunctionName: function(e, t) {
        for (var n = /function\s+([^(]*?)\s*\(([^)]*)\)/, r = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/, o = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/, i = "", a, s = 10, l, c = 0; c < 10; ++c)
            if (a = e[t - c]) {
                if (i = a + i,
                (l = r.exec(i)) && l[1])
                    return l[1];
                if ((l = n.exec(i)) && l[1])
                    return l[1];
                if ((l = o.exec(i)) && l[1])
                    return l[1]
            }
        return "(?)"
    }
};
var g_dialogclose = void 0 === g_dialogclose ? {} : g_dialogclose
  , g_dialogname = void 0 === g_dialogname ? {} : g_dialogname
  , g_windowid = void 0 === g_windowid ? 0 : g_windowid
  , g_lppromptid = void 0 === g_lppromptid ? 0 : g_lppromptid
  , g_progressargs = void 0 === g_progressargs ? {} : g_progressargs
  , g_progresstimer = void 0 === g_progresstimer ? null : g_progresstimer;
if ("undefined" != typeof LPDialog && LPDialog.setBaseURL("newvault/"),
"function" != typeof gs)
    var gs = function(e) {
        return "undefined" != typeof translations && void 0 !== translations[e] ? translations[e] : e
    };
function lpwindow(e) {
    var t = void 0 !== e.html ? e.html : ""
      , n = void 0 !== e.onclick ? e.onclick : null
      , r = void 0 !== e.showok && e.showok
      , o = void 0 !== e.showcancel && e.showcancel
      , i = void 0 !== e.title ? e.title : ""
      , a = void 0 !== e.xdialogwidth && e.xdialogwidth
      , s = void 0 !== e.okbuttontext ? e.okbuttontext : null
      , l = void 0 === e.showclose || e.showclose
      , c = void 0 !== e.inputid ? e.inputid : null
      , u = void 0 !== e.url ? e.url : null
      , p = (e.urlParams,
    e.urlParams)
      , d = void 0 !== e.onclose ? e.onclose : null
      , g = void 0 !== e.width ? e.width : null
      , f = void 0 !== e.aftershow ? e.aftershow : null
      , m = void 0 !== e.name ? e.name : null
      , h = void 0 !== e.headerhtml ? e.headerhtml : null
      , x = void 0 !== e.padding ? e.padding : null
      , _ = void 0 !== e.bordercolor ? e.bordercolor : null
      , v = void 0 !== e.height ? e.height : null
      , y = void 0 !== e.overflow ? e.overflow : null
      , w = void 0 !== e.contentheight ? e.contentheight : null
      , b = void 0 !== e.topv ? e.topv : null
      , A = void 0 !== e.maxwidth ? e.maxwidth : null
      , k = void 0 !== e.swapdefaults && e.swapdefaults
      , C = void 0 !== e.htmlafter ? e.htmlafter : null
      , S = void 0 !== e.zindex ? e.zindex : null
      , E = void 0 !== e.nobg ? e.nobg : null
      , P = void 0 !== e.nomaxheight ? e.nomaxheight : null
      , L = void 0 !== e.noheight ? e.noheight : null
      , T = void 0 !== e.nomaxwidth ? e.nomaxwidth : null
      , B = void 0 !== e.cancelbuttontext ? e.cancelbuttontext : null
      , R = void 0 !== e.settingswin ? e.settingswin : null
      , I = void 0 === e.closebgclick || e.closebgclick
      , O = void 0 !== e.showcustom && e.showcustom
      , N = void 0 !== e.custombuttontext ? e.custombuttontext : null
      , D = void 0 !== e.customonclick ? e.customonclick : null
      , z = void 0 !== e.leftv ? e.leftv : null
      , F = void 0 !== e.addnewstyle && e.addnewstyle
      , M = void 0 !== e.addnewclass ? e.addnewclass : ""
      , j = void 0 !== e.customcloseicon ? e.customcloseicon : null
      , U = {};
    void 0 !== e.classok && (U.classok = e.classok),
    void 0 !== e.classcancel && (U.classcancel = e.classcancel),
    null != s && (r = !0),
    null != B && (o = !0),
    N && D || (O = !1),
    lpwindow_internal(t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, U, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M, j)
}
function lpwindowx(e) {
    e.xdialogwidth = !0,
    lpwindow(e)
}
function lpmessagebox(e, t, n, r, o, i) {
    "function" == typeof tracelog && tracelog(t),
    "undefined" != typeof LPDialog ? dialogs.alert.open({
        title: e,
        text: t,
        handler: n,
        closeHandler: r
    }) : (n = void 0 !== n ? n : null,
    lpwindow(o ? {
        title: e,
        html: t,
        showok: !0,
        onclick: n,
        showclose: !1,
        onclose: r,
        addnewstyle: !0,
        addnewclass: o,
        okbuttontext: i
    } : {
        title: e,
        html: t,
        showok: !0,
        onclick: n,
        showclose: !1,
        onclose: r
    }))
}
function lpconfirmbox(e, t, n, r, o, i, a, s, l) {
    "undefined" != typeof LPDialog ? dialogs.confirmation.open({
        title: e,
        text: t,
        nextButtonText: gs("OK"),
        backButtonText: Strings.Vault.CANCEL,
        handler: n,
        closeHandler: r
    }) : lpwindow({
        title: e,
        html: t,
        showok: !0,
        showcancel: !0,
        showclose: !1,
        onclick: n,
        onclose: r,
        classok: o,
        classcancel: i,
        addnewclass: a,
        okbuttontext: s,
        cancelbuttontext: l,
        name: "confirm"
    })
}
function lpyesnobox(e, t, n, r, o, i) {
    "undefined" != typeof LPDialog ? dialogs.confirmation.open({
        title: e,
        text: t,
        nextButtonText: Strings.Vault.YES,
        backButtonText: Strings.Vault.NO,
        handler: n,
        closeHandler: r
    }) : lpwindow({
        title: e,
        html: t,
        showok: !0,
        showcancel: !0,
        showclose: !1,
        onclick: n,
        onclose: r,
        classok: o,
        classcancel: i,
        okbuttontext: gs("Yes"),
        cancelbuttontext: gs("No")
    })
}
function lpwaitbox(e, t) {
    "undefined" != typeof LPDialog && "undefined" != typeof dialogs && void 0 !== dialogs.wait ? dialogs.wait.open() : (lpwaitboxhide(),
    lpwindow({
        title: e,
        html: t = "<br/><br/><b>" + t + "</b><br/><br/>",
        showclose: !1,
        name: "waitbox"
    }))
}
function lpwaitboxhide() {
    "undefined" != typeof LPDialog && "undefined" != typeof dialogs && void 0 !== dialogs.wait ? dialogs.wait.close() : hidedialog({
        name: "waitbox"
    })
}
function lpprompt(e, t, n, r, o, i, a, s) {
    var l = "lpprompt" + ++g_lppromptid;
    lpwindow({
        title: e,
        html: t = '<div class="lppromptwrapper">' + t + (a ? "" : "<br/><br/>") + '<input id="' + l + '" type="text" style="width:300px;" value="' + ofa(n = n || "") + '" ' + (o ? ' name="' + ofa(o) + '"' : "") + "/></div>",
        showok: !0,
        inputid: l,
        okbuttontext: i,
        htmlafter: s,
        showcancel: !0,
        swapdefaults: !0,
        onclick: function() {
            if (void 0 !== r && r) {
                var e = $("#" + l)
                  , t = e.val()
                  , n = r(t);
                return void 0 === n || n || e.focus().val("").val(t),
                n
            }
        },
        onclose: function() {
            r(null)
        },
        aftershow: function() {
            $("#" + l).focus().val("").val(n)
        }
    }),
    $(".lppromptwrapper").css("text-align", "center")
}
function confirmmasterpassword(e, t, n, r) {
    getmasterpassword(e, getmasterpasswordhelperfailure, t, !1, "", n, r)
}
function performMultifactorFilteredAction(o, i, a, s) {
    showConfirmPasswordForm(function() {
        var e = $("#confirmmasterpassword").val();
        make_lp_key_hash_iterations(g_username, e, g_key_iterations || 1, function(e, t) {
            var n = !1
              , r = function(e) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    url: "lmiapi/" + o,
                    data: JSON.stringify($.extend(i, {
                        username: g_username,
                        hash: t,
                        challengeResponse: e
                    }))
                }).done(function(e) {
                    hidedialog(),
                    a(e)
                }).fail(function(e) {
                    if (401 === e.status) {
                        var t = e.responseJSON;
                        if (t && t.challenge)
                            switch (t.challenge.result) {
                            case "waiting":
                                n || (n = !0,
                                lpmessagebox(t.challenge.friendlyName, gs("We sent a push notification to your device. Please accept this request to perform the update."))),
                                r({
                                    retryId: t.challenge.retryId
                                });
                                break;
                            case "unpaired":
                            case "failed":
                                n && hidedialog(),
                                s()
                            }
                        else
                            t && 2041 === t.code && lpmessagebox(gs("An Error Occurred"), gs("The master password you entered is incorrect. Please try again."))
                    } else
                        n && hidedialog(),
                        s()
                })
            };
            r({
                returnImmediately: !0
            })
        })
    })
}
function confirmMasterPasswordWithToken(i, a, s) {
    function t(t, e) {
        e = e || function() {
            showConfirmPasswordForm(l, 2, !1, g_reason)
        }
        ;
        var n = "undefined" != typeof g_key_iterations ? g_key_iterations : 1
          , r = make_lp_key_iterations(g_username, t, n)
          , o = getMasterPasswordPostData(r, t, n);
        o.maketoken = 1,
        o.tokenfor = s || "",
        $.ajax({
            global: !1,
            type: "POST",
            cache: !1,
            dataType: "json",
            url: "verifypassword.php",
            data: o,
            success: function(e) {
                e.success ? (g_localkey = g_local_key = r,
                i(e, t)) : a(e)
            },
            error: e
        })
    }
    var l = function() {
        var e;
        a = a || function(e) {
            var t, n = function() {
                document.location.href = "/?ac=1"
            };
            switch (void 0 === e.reason ? "unknown" : e.reason) {
            case "nosession":
                lpmessagebox("", gs("You must sign in to your LastPass account before this operation."), n, n);
                break;
            case "blacklisted":
                lpmessagebox("", gs("Your account has been temporarily suspended because of too many login attempt failures."), n, n);
                break;
            default:
                showConfirmPasswordForm(l, 2, !1, "")
            }
        }
        ,
        t($("#confirmmasterpassword").val(), function() {
            showConfirmPasswordForm(l, 2, !1, g_reason)
        })
    };
    isFederatedUserLogin() ? t(lpFederatedLoginObj.getFederatedMasterPassword(), function() {}) : FederatedLogin.isFederated(g_username, function(e) {
        e ? FederatedLogin.getPassword(g_username, function(e) {
            t(e, function() {})
        }, MessageBoxErrorHandler) : showConfirmPasswordForm(l)
    }, MessageBoxErrorHandler)
}
function showConfirmPasswordForm(e, t, n, r) {
    var o = "";
    n && (o = ' onkeypress="return event.keyCode != 13;"');
    var i = "";
    "undefined" != typeof VirtualKeyboard && (i = '<a style="position:relative;left:-30px;top:-4px;" href="#" onclick="showgetpwkeyboard();return false;" id="keyboardlink"><img alt="launch on-screen keyboard" src="/images/keyboard.png"/></a>');
    var a = "<div style='text-align:center;'><p><strong>" + (r || "") + "</strong></p>" + gs("Please re-enter your LastPass Master Password") + (2 == t ? "<br/><p class='errormsg'>" + gs("The master password you entered is incorrect. Please try again.") + "</p>" : "<br/>") + '<form method="post" action="#" autocomplete="OFF" onsubmit="onSubmit();return false;"><center><input id="confirmmasterpassword" type="password"  value="" ' + o + "/>" + i + "</center></form></div>";
    lpwindow({
        title: gs("Confirm Password"),
        html: a,
        showok: !0,
        showcancel: !0,
        cancelbuttontext: "Cancel",
        okbuttontext: "Continue",
        onclick: e,
        inputid: "confirmmasterpassword"
    }),
    Lpwm.uptopzindex(),
    t && $("#confirmmasterpassword").css({
        border: "solid 2px red"
    }),
    $("#confirmmasterpassword").css({
        width: "200px"
    }),
    $("#confirmmasterpassword").css({
        "text-align": "left"
    }),
    $("#confirmmasterpassword").css({
        "margin-topalign": "12px"
    }),
    $("#confirmmasterpassword").select(),
    $("#confirmmasterpassword").on("focus", function() {
        attachKeyboard(this)
    }),
    "undefined" != typeof VirtualKeyboard && ($("#confirmmasterpassword").on("focus", function() {
        attachKeyboard(this)
    }),
    VirtualKeyboard.toggle("confirmmasterpassword", "virtualkeyboard"))
}
function isFederatedUserLogin() {
    return "object" == typeof lpFederatedLoginObj && lpFederatedLoginObj.wasLastLoginFederated()
}
function getmasterpassword(e, t, n, r, o, i, a) {
    g_func2 = e,
    g_func3 = t,
    g_reason = o || "",
    isFederatedUserLogin() ? getmasterpasswordhelper(lpFederatedLoginObj.getFederatedMasterPassword(), i, a) : FederatedLogin.isFederated(g_username, function(e) {
        e ? FederatedLogin.getPassword(g_username, function(e) {
            getmasterpasswordhelper(e, i, a)
        }, MessageBoxErrorHandler) : showConfirmPasswordForm(function(e) {
            getmasterpasswordhelper(e, i, a)
        }, n, r, o)
    }, MessageBoxErrorHandler)
}
function getmasterpasswordhelper(t, e, n) {
    t || (t = $("#confirmmasterpassword").val(),
    "function" == typeof challengegetstrength && (g_mpw_strength = challengegetstrength(g_USERNAME, t, !0)));
    var r = "undefined" != typeof g_key_iterations ? g_key_iterations : 1
      , o = make_lp_key_iterations(g_username, t, r)
      , i = getMasterPasswordPostData(o, t, r, e)
      , a = ""
      , s = document.getElementById("csrftoken");
    i.keyType = e,
    s && s.value && (a = {
        "X-CSRF-TOKEN": s.value
    }),
    $.ajax({
        global: !1,
        type: "POST",
        cache: !1,
        dataType: "json",
        url: selectURL(n),
        data: i,
        headers: a,
        success: function(e) {
            1 == e.success ? (g_localkey = g_local_key = o,
            g_func2(t, i.pwhash, e)) : g_func3(e)
        },
        error: function(e) {
            getmasterpassword(g_func2, g_func3, 2, !1, g_reason, e.keyType, e.action)
        }
    })
}
function selectURL(e) {
    var t = "verifypassword.php";
    return "regenerate" === e ? t = "lmiapi/mfa/regenerate-key" : "show" === e && (t = "lmiapi/mfa/show-key"),
    t
}
function getMasterPasswordPostData(e, t, n, r) {
    var o = make_lp_hash_iterations(e, t, n)
      , i = null;
    "undefined" != typeof g_token ? i = g_token : document.getElementById("csrftoken") && (i = document.getElementById("csrftoken").value);
    var a = {
        cmd: "verify",
        email: g_username,
        pwhash: o,
        iterations: n,
        from: "reprompt",
        token: i
    };
    return "undefined" != typeof g_reprompt_from && (a.from = g_reprompt_from),
    a
}
function getmasterpasswordhelperfailure(e) {
    var t;
    switch (void 0 === e.reason ? "unknown" : e.reason) {
    case "nosession":
        alert(gs("You must log into your LastPass vault before starting the LastPass Security Challenge.")),
        hidedialog(),
        document.location.href = "misc_login.php?from_uri=" + encodeURIComponent("/misc_challenge.php");
        break;
    case "blacklisted":
        lpmessagebox("", gs("Your account has been temporarily suspended because of too many login attempt failures.")),
        hidedialog();
        break;
    default:
        getmasterpassword(g_func2, g_func3, 2, !1, g_reason, e.keyType, e.action)
    }
}
function setonclick(e, t) {
    var n = $(e);
    n && (void 0 !== n.on ? n.on("click", t) : void 0 !== n.live && n.click(t))
}
function getRandomInt(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
}
function lpwindow_internal(e, t, n, r, o, i, a, s, l, c, u, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M, j) {
    if (void 0 !== c && c) {
        var U = {};
        if (void 0 !== lp_phpsessid && (U.wxsessid = lp_phpsessid),
        "object" == typeof u)
            for (var G in u)
                u.hasOwnProperty(G) && (U[G] = u[G]);
        var q, H = "pleasewait";
        return lpwindow({
            title: o,
            html: "<center><img src='/opensslccs/wait.gif'/></center>",
            name: H,
            showclose: !1
        }),
        void $.ajax({
            global: !1,
            type: "POST",
            cache: !1,
            dataType: "html",
            url: c,
            data: U,
            timeout: 2e4,
            success: function(e) {
                hidedialog(H),
                lpwindow_internal(e, t, n, r, o, i, a, s, l, null, null, p, d, g, f, m, h, x, _, v, y, w, b, A, k, C, S, E, P, L, T, B, R, I, O, N, D, z, F, M),
                "show_website.php?extjs=1" == c && initializeURLTypeahead("#url", "#grouping")
            },
            error: function() {
                hidedialog(H),
                lpmessagebox(null, gs("Something went wrong, please try again."), null, -1 != c.indexOf("settings.php") && "function" == typeof closeiframe ? closeiframe : null)
            }
        })
    }
    var K = ""
      , V = ""
      , J = "";
    if (void 0 !== Lpwm.next_is_dup && Lpwm.next_is_dup(e))
        return !1;
    "function" == typeof stopprogress && stopprogress(),
    void 0 !== o && null != o || (o = "LastPass");
    var W = i ? "iframe" : ""
      , Y = ++g_windowid + "x" + getRandomInt(1, 1e8)
      , X = Lpwm.prefix + Y
      , Z = Lpwm.bgprefix + Y + W
      , Q = Lpwm.htmlprefix + Y
      , ee = Lpwm.titleprefix + Y
      , te = X + "x" + W
      , ne = null
      , re = null
      , oe = null
      , ie = X + "header"
      , ae = Lpwm.nextbgz()
      , se = Lpwm.nextwinz();
    null != S && (se = S);
    var le = "600px"
      , ce = ""
      , ue = ""
      , pe = ""
      , de = 800
      , ge = ""
      , fe = "auto";
    n && (K = (ne = new LPButton("ok",X,Y,a,k && void 0 !== k.classok ? k.classok : "")).html()),
    r && (V = (re = new LPButton("cancel",X,Y + W,B,k && void 0 !== k.classcancel ? k.classcancel : "")).html()),
    O && void 0 !== N && N && (J = (oe = new LPButton("custom",X,Y,N,k && void 0 !== k.classok ? k.classok : "")).html()),
    void 0 !== p && p && (g_dialogclose[Z] = p),
    void 0 !== f && f && (g_dialogname[f] = {
        id: X,
        bgid: Z,
        titleid: ee
    }),
    void 0 !== d && null != d && (ue = parseInt(d, 10) == d ? d + "px" : d);
    var me = "<div id='" + Z + "' class='modalbackground'></div>";
    E && (me = ""),
    void 0 !== _ && null != _ && (pe = parseInt(_, 10) == _ ? _ + "px" : _),
    void 0 !== b && null != b && (de = b + "px");
    var he = "";
    void 0 !== F && F && (he = " newstyle"),
    void 0 !== M && "" != M && (he = he + " " + M),
    me += "<div id='" + X + "'  class='dialog" + he + "'>";
    var xe = void 0 !== g_isfirefoxsdk && g_isfirefoxsdk ? "" : "/"
      , _e = "images/lastpass_dialog_24x24.png";
    -1 != document.location.href.indexOf("webroot.com") && (_e = "images/webroot/24x24_1.png");
    var s = !(void 0 !== s && !s);
    if (void 0 === F || void 0 !== F && !F) {
        var ve = "";
        if (s) {
            var ye = "x";
            j && (ye = j),
            ve = "<a class='icon_close_grey' id='" + te + "' alt='close dialog'>" + ye + "</a>"
        }
        me += "<div class='dialog_hdr'><span class='lpwindowtitle' id='" + ee + "'></span>" + ve + "</div>"
    } else {
        var ve = "";
        s && (ve = "<div class='dialogHeaderButtons'><button title='Close' class='dialogCloseButton dialogHeaderButton' id='" + te + "'></button></div>"),
        me += "<div class='dialog_hdr'><span class='lpwindowtitle' id='" + ee + "'></span>" + ve + "</div>"
    }
    void 0 !== m && m && (me += "<div id='" + ie + "'>" + m + "</div>"),
    void 0 !== h && null != h && (ge = parseInt(h, 10) == h ? h + "px" : h),
    void 0 !== y && null != y && (ce = parseInt(y, 10) == y ? y + "px" : y),
    void 0 !== v && v && (fe = v),
    me += "<form autocomplete='off' action='' method='post'><div id='" + Q + "' class='clearfix dialog_content' automation-id='dialogContent'></div></form>",
    me += "</div>";
    var we = "#google_auth_mp_reprompt";
    if (0 != $(we).length && "undefined" != typeof showdialogforce ? ($(we).html(me).show(),
    "undefined" != typeof showdialogforce && (showdialogforce = void 0)) : $("body").append(me),
    $("#" + Z).css("z-index", ae),
    $("#" + X).css("width", ue),
    $("#" + X).css("border-color", x),
    $("#" + X).css("height", pe),
    $("#" + X).css("z-index", se),
    T || $("#" + X).css("max-width", de),
    $("#" + ee).css("padding-left", "32px !important"),
    $("#" + Q).css("padding", ge),
    P || $("#" + Q).css("max-height", le),
    $("#" + Q).css("height", ce),
    $("#" + Q).css("overflow", fe),
    is_online_vault() || set_class_styling(),
    o = gs(o),
    $("#" + ee).html(o),
    "" != K || "" != V || "" != J) {
        var be = "";
        e += '<div id="bctrd" class="wrap2btnsB btn_swap" automation-id="dialogActionButtons"><div class="wrapinner">' + (be = A ? K + V + J : V + K + J) + "</div></div>"
    }
    C && (e += C),
    $("#" + Q).html(e);
    var Ae = t ? function() {
        var e = t();
        void 0 !== e && !e || (void 0 !== g_dialogclose[Z] && g_dialogclose[Z] && (g_dialogclose[Z] = null,
        delete g_dialogclose[Z]),
        void 0 !== f && f ? hidedialog(f) : hidedialog())
    }
    : function() {
        void 0 !== f && f ? hidedialog(f) : hidedialog()
    }
    ;
    l && $("#" + l).keypress(function(e) {
        13 == e.which && (e.preventDefault(),
        Ae())
    }),
    ne && setonclick("#" + ne.id(), function() {
        return Ae(),
        !1
    }),
    re && setonclick("#" + re.id(), function() {
        return hidedialog({
            closeiframe: !0,
            clicked: this
        }),
        !1
    }),
    oe && setonclick("#" + oe.id(), function() {
        return D(),
        !1
    }),
    setonclick("#" + te, function() {
        return hidedialog({
            closeiframe: !(g_porig = ""),
            clicked: this
        }),
        !1
    }),
    s && I && setonclick("#" + Z, function() {
        return hidedialog({
            closeiframe: !0,
            clicked: this
        }),
        !1
    }),
    lpwindow_show_div(X, Z, ue, i, w, R, g, L, n, r, Ae, ne ? ne.id() : "", se, ae)
}
function lpwindow_show_div(e, r, t, n, o, i, a, s, l, c, u, p, d, g) {
    var f = e
      , m = 1400;
    "" == t && $("#" + f).width() > m && $("#" + f).css({
        width: "1400px"
    });
    var h = $(window).height()
      , x = $(document).height()
      , _ = $(document).scrollTop()
      , v = Math.round(($(window).width() - $("#" + f).width()) / 2)
      , y = Math.round(($(window).height() - $("#" + f).height()) / 2) - 100 + $(document).scrollTop();
    if (v < 0 && (v = 0),
    y < 0 && (y = 0),
    y < $(document).scrollTop() && ((y = Math.round(($(window).height() - $("#" + f).height()) / 2) + $(document).scrollTop()) < $(document).scrollTop() && (y = Math.round(($(document).height() - $("#" + f).height()) / 2) + $(document).scrollTop()),
    y < 0 && (y = 0)),
    void 0 !== n && n) {
        var w = 800
          , b = 500;
        600 < $(document).width() && (b = $(document).width() - 200),
        m < b && (b = m),
        b < 800 && (b = 800);
        var A = 500;
        100 < $(document).height() && (A = $(document).height() - 100),
        y = Math.round(($(document).height() - A) / 2),
        $("#" + f).css({
            width: b + "px",
            top: y + "px"
        }),
        navigator && /MSIE 8/.test(navigator.userAgent) || $("#" + f).css({
            position: "fixed"
        })
    }
    y < 0 && (y = 1),
    void 0 !== o && null != o && (y = o);
    var k = function() {
        var e = $("#" + r);
        if (e.length) {
            var t = $(document).width()
              , n = $(document).height();
            e.css({
                width: t + "px",
                height: n + "px"
            }).show()
        }
    }, v;
    if ($(window).resize(k),
    setTimeout(function() {
        k()
    }, 0),
    (v = Math.round(($(document).width() - $("#" + f).width()) / 2)) < 0 && (v = 0),
    "undefined" != typeof leftv && null != leftv && (v = leftv),
    $("#" + f).css({
        left: v,
        top: y
    }).show(),
    $("#" + f).height() > $(document).height() && (s || $("#" + f).css({
        height: $(document).height() - 100
    })),
    p && !c && $("#" + p) && void 0 !== $("#" + p).css && $("#" + p).css("margin-right", "12px"),
    l || c) {
        try {
            $(document).keydown(function(e) {
                27 == e.which && (c ? $("#" + cancelid).click() : l && $("#" + p).click())
            })
        } catch (e) {}
        void 0 === n && (document.onkeydown = function(e) {
            13 == e.keyCode && (u(),
            e.preventDefault())
        }
        )
    }
    Lpwm.pushWindow({
        id: r,
        zval: g
    }),
    Lpwm.pushWindow({
        id: f,
        zval: d
    }),
    i && (g_settingswin = Lpwm.gettophtmlid()),
    void 0 !== a && a && a()
}
function lpwindowget(e) {
    if (void 0 === e || void 0 === e.value || !e.value)
        return null;
    var t = null;
    if (void 0 !== e.name && e.name) {
        if (void 0 === g_dialogname[e.name])
            return null;
        t = g_dialogname[e.name].id
    } else {
        var n, n;
        if (n = Lpwm.popWindow())
            if (t = n.id,
            !document.getElementById(t))
                (n = Lpwm.popWindow()) && (t = n.id)
    }
    if (!t || !document.getElementById(t))
        return null;
    var r = $("#" + t);
    switch (e.value.toLowerCase()) {
    case "innerwidth":
        return r.innerWidth();
    case "innerheight":
        return r.innerHeight()
    }
    return null
}
function lpwindowupdate(e) {
    if (void 0 !== e && void 0 !== e.name && e.name && void 0 !== g_dialogname[e.name]) {
        var t = g_dialogname[e.name].id
          , n = $("#" + t);
        if (void 0 !== e.title && e.title) {
            var r = g_dialogname[e.name].titleid;
            $("#" + r).text(e.title)
        }
        void 0 !== e.url && e.url && $.ajax({
            global: !1,
            type: "GET",
            cache: !1,
            dataType: "html",
            url: url,
            success: function(e) {
                n.html(e)
            },
            error: function() {
                n.html(gs("An error occurred"))
            }
        })
    }
}
function hidealldialogs(e) {
    for (var e = void 0 === e || e, t = 0; t < 10; ++t)
        hidedialog({
            closeiframe: e,
            force: 1
        });
    for (var n in g_dialogname)
        hidedialog({
            name: n,
            closeiframe: e
        })
}
function hidedialog(e) {
    Lpwm.lock && Lpwm.unlockit(),
    "string" == typeof e && (e = {
        name: e
    });
    var t = !1
      , n = ""
      , r = "";
    if (void 0 !== e && void 0 !== e.name && e.name) {
        if (void 0 === g_dialogname[e.name])
            return;
        n = g_dialogname[e.name].id,
        r = g_dialogname[e.name].bgid,
        t = !0,
        Lpwm.deleteById(n),
        Lpwm.deleteById(r)
    } else {
        var o = Lpwm.popWindow()
          , i = Lpwm.popWindow();
        if (o && i && (n = o.id,
        r = i.id,
        !document.getElementById(n))) {
            var o = Lpwm.popWindow()
              , i = Lpwm.popWindow();
            o && i && (n = o.id,
            r = i.id)
        }
    }
    if (void 0 !== g_dialogclose[r] && g_dialogclose[r]) {
        var a = g_dialogclose[r]();
        if (void 0 !== a && !a)
            return;
        g_dialogclose[r] = null,
        delete g_dialogclose[r]
    }
    t && (g_dialogname[e.name] = null,
    delete g_dialogname[e.name]);
    var s = !1;
    e && (e.force || e.clicked && -1 < e.clicked.id.indexOf("iframe")) && (s = !0);
    var l = Lpwm.getnumwindows() < 2;
    "function" == typeof closeiframe && void 0 !== e && void 0 !== e.closeiframe && 1 == e.closeiframe && (s || l) && closeiframe(),
    document.onkeydown = null,
    void 0 !== document.accountform && 0 == Lpwm.getnumwindows() && document.accountform.parentNode.removeChild(document.accountform),
    n && "" != n && document.getElementById(n) && ($("#" + n).hide(),
    e && e.hideonly || $("#" + n).remove()),
    r && "" != r && document.getElementById(r) && ($("#" + r).hide(),
    $("#" + r).remove()),
    (e && e.closeiframe && $(e.clicked).hasClass("icon_close_grey") || e && e.closeiframe && $(e.clicked).hasClass("modalbackground") || e && e.closeiframe && $(e.clicked).attr("automation-id", "cancel")) && "function" == typeof parent_callback_finished && parent_callback_finished()
}
function showprogress(e, t, n, r) {
    if (1 < n && (n = 1),
    "useglobals" == e && "useglobals" == t && (e = g_progressargs.textabove,
    t = g_progressargs.textbelow),
    void 0 !== g_dialogname.progress) {
        var o = g_dialogname.progress
          , i = Lpwm.gettopobj();
        if (i && o.id == i.id)
            return $("#" + o.titleid).html(e),
            void $("#progresstextbelow").html(t)
    }
    var a = "<p style='text-align:left;' id='progresstextbelow'>" + t + "</p><div class='progress_container'><div class='progress_bar' id='progress_bar'/></div>";
    hidedialog(),
    lpwindow({
        name: "progress",
        title: e,
        html: a,
        showclose: !1
    }),
    stopprogress(),
    r && ("useglobals" != e && "useglobals" != t && (g_progressargs.textabove = e,
    g_progressargs.textbelow = t),
    g_progresstimer = setTimeout(function() {
        showprogress("useglobals", "useglobals", n + r / 100, !0)
    }, r))
}
function hideprogress() {
    stopprogress(),
    hidedialog()
}
function stopprogress() {
    g_progresstimer && (clearTimeout(g_progresstimer),
    g_progresstimer = null)
}
function check_enterprise_multifactor_reprompt(e) {
    try {
        if (void 0 !== e.enterprisemultifactorreprompt && e.enterprisemultifactorreprompt)
            return window.location.href = "enterprise_multifactor_reprompt.php?from_uri=" + encodeURIComponent(window.location.href),
            !0
    } catch (e) {}
    return !1
}
function is_online_vault() {
    return 0 == window.location.href.indexOf("https://")
}
function set_class_styling() {
    $(".dialog").css("position", "absolute"),
    $(".dialog").css("text-align", "left"),
    $(".dialog").css("background-color", "#FFFFFF"),
    $(".dialog").css("margin", "0"),
    $(".dialog").css("padding", "0"),
    $(".lastpass_window_icon").css("display", "inline-block"),
    $(".lastpass_window_icon").css("height", "16px"),
    $(".lastpass_window_icon").css("border-radius", "2px"),
    $(".lastpass_window_icon").css("left", "8px"),
    $(".modalbackground").css("position", "absolute"),
    $(".modalbackground").css("left", "0px"),
    $(".modalbackground").css("top", "0px"),
    $(".modalbackground").css("background-color", "rgba(0,0,0,.6)"),
    $(".modalbackground").css("margin", "0"),
    $(".modalbackground").css("padding", "0"),
    $(".icon_close_grey").css("position", "absolute"),
    $(".icon_close_grey").css("cursor", "pointer"),
    $(".icon_close_grey").css("right", "12px"),
    $(".icon_close_grey").css("top", "0px"),
    $(".lastpass_window_icon").css("display", "inline-block"),
    $(".lastpass_window_icon").css("height", "16px"),
    $(".lastpass_window_icon").css("border-radius", "2px"),
    $(".lastpass_window_icon").css("left", "8px"),
    $(".lpwindowtitle").css("padding-left", "32px !important"),
    $(".dialog:not(.newstyle) .lpwindowtitle").css("padding-left", "32px !important"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("margin-left", "0px"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("margin-right", "0px"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("width", "100%"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("font-size", "100%"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("line-height", "16px"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("font-weight", "bold"),
    $(".dialog:not(.newstyle) .dialog_hdr").css("margin", "8px"),
    $(".dialog:not(.newstyle) .dialog_content").css("background", "#e6e6e6"),
    $(".dialog:not(.newstyle) .dialog_content").css("padding", "16px")
}
function attachKeyboard(e) {
    "undefined" != typeof VirtualKeyboard && VirtualKeyboard.attachInput(e)
}
function showgetpwkeyboard() {
    $("#virtualkeyboard").is(":visible") ? $("#virtualkeyboard").slideUp(100) : $("#virtualkeyboard").slideDown(100)
}
function lpwindow_div_dialog(e, t, n, r) {
    var o = e
      , i = g_windowid + "x" + getRandomInt(1, 1e8)
      , a = Lpwm.bgprefix + i
      , s = o + "close"
      , l = Lpwm.nextbgz()
      , c = Lpwm.nextwinz()
      , u = "<div id='" + a + "' class='modalbackground'></div>";
    $("body").append(u);
    var p = new LPButton("ok",o,i,n,null)
      , d = "";
    if (!1 !== r) {
        var g = new LPButton("cancel",o,i,null,null);
        d = g.html()
    }
    d += p.html(),
    $("#" + o + "buttons").html(d),
    $("#" + a).css("z-index", l),
    $("#" + o).css("z-index", c);
    var f = t ? function() {
        var e = t();
        void 0 !== e && !e || (void 0 !== g_dialogclose[a] && g_dialogclose[a] && (g_dialogclose[a] = null,
        delete g_dialogclose[a]),
        hidedialog({
            hideonly: !0
        }))
    }
    : function() {
        hidedialog({
            hideonly: !0
        })
    }
    ;
    setonclick("#" + p.id(), function() {
        return f(),
        !1
    }),
    setonclick("#" + s, function() {
        return hidedialog({
            hideonly: !0,
            closeiframe: !0,
            clicked: this
        }),
        !1
    }),
    !1 !== r && setonclick("#" + g.id(), function() {
        return hidedialog({
            hideonly: !0,
            closeiframe: !0,
            clicked: this
        }),
        !1
    }),
    lpwindow_show_div(e, a, null, null, null, null, null, null, null, null, null, p.id(), c, l)
}
"undefined" == typeof Lpwm && (Lpwm = function() {}
,
Lpwm.prefix = "lpwin",
Lpwm.htmlprefix = "lpwinhtml",
Lpwm.bgprefix = "lpwinbg",
Lpwm.titleprefix = "lpwintitle",
Lpwm.lpwindowstack = [],
Lpwm.z = 9e3,
Lpwm.lock = !1,
Lpwm.uptopzindex = function() {
    Lpwm.gettopobj().style.zIndex = "50000",
    Lpwm.gettopbg().style.zIndex = "49999"
}
,
Lpwm.next_is_dup = function(e) {
    if (0 == Lpwm.lpwindowstack.length)
        return !1;
    var t = Lpwm.gettophtmlid();
    if (null == t || void 0 === document.getElementById(t))
        return !1;
    var n = $("#" + t).html().replace("/", "")
      , e = e.replace("/", "");
    return 0 == n.indexOf(e)
}
,
Lpwm.nextz = function() {
    return Lpwm.z
}
,
Lpwm.nextbgz = function() {
    return Lpwm.z
}
,
Lpwm.nextwinz = function() {
    return Lpwm.z + 1
}
,
Lpwm.gettophtmlid = function() {
    return null == Lpwm.gettopobj() ? null : Lpwm.gettopobj().id.replace(Lpwm.prefix, Lpwm.htmlprefix)
}
,
Lpwm.nexthtmltitleid = function() {
    return Lpwm.nextid() + "title"
}
,
Lpwm.getnumwindows = function() {
    return Lpwm.lpwindowstack.length
}
,
Lpwm.pushWindow = function(e) {
    return Lpwm.z++,
    void 0 !== e && void 0 !== e.zval && void 0 !== e.id && (Lpwm.lpwindowstack.push(e),
    !0)
}
,
Lpwm.lockit = function() {
    return !Lpwm.lock && (Lpwm.lock = !0)
}
,
Lpwm.unlockit = function() {
    return Lpwm.lock && (Lpwm.lock = !1),
    !0
}
,
Lpwm.popWindow = function() {
    var e = Lpwm.lpwindowstack.pop();
    return void 0 !== e && (Lpwm.z--,
    e)
}
,
Lpwm.deleteById = function(e) {
    for (var t in Lpwm.lpwindowstack)
        if (Lpwm.lpwindowstack[t].id == e)
            return Lpwm.lpwindowstack.splice(t, 1),
            !0;
    return !1
}
,
Lpwm.currentid = function() {
    return 0 == Lpwm.lpwindowstack.length ? null : Lpwm.lpwindowstack[this.getnumwindows() - 1].id
}
,
Lpwm.currentbg = function() {
    return Lpwm.lpwindowstack.length < 2 ? null : Lpwm.lpwindowstack[this.getnumwindows() - 2].id
}
,
Lpwm.gettopobj = function() {
    var e = Lpwm.currentid();
    return null !== e ? document.getElementById(e) : null
}
,
Lpwm.gettophtmlobj = function() {
    var e = Lpwm.gettopobj().id;
    return replace(Lpwm.prefix, this.htmlprefix)
}
,
Lpwm.gettopbg = function() {
    var e = Lpwm.currentbg();
    return null !== e ? document.getElementById(e) : null
}
,
Lpwm.settitle = function(e, t) {
    var n = Lpwm.gettitlefromcontentid(e);
    n && $("#" + n).html(t)
}
,
Lpwm.gettitlefromcontentid = function(e, t) {
    return 0 <= e.indexOf(Lpwm.prefix) && 0 <= e.indexOf("html") ? e.replace("html", "title") : null
}
,
LPButton = function(e, t, n, r, o) {
    this.type = e || "",
    this.idprefix = t || "",
    this.idpostfix = n || "",
    this.label = r || "",
    this.customclass = o || ""
}
,
LPButton.prototype.id = function() {
    return this.idprefix + this.type + this.idpostfix
}
,
LPButton.prototype.html = function() {
    var e = this.label;
    return e ? e = gs(e) : "ok" === this.type ? e = gs("OK") : "cancel" === this.type && (e = gs("Cancel")),
    '<a id="' + this.id() + '" class="nbtn rbtn btn_mini btn_exp_h ' + this.customclass + '" automation-id="' + this.type + '">' + e + "</a>"
}
);
var GPW = {
    pronounceablecaps: function(e) {
        for (var t = this.pronounceable(e), n = 0; n < e && t[n]; ) {
            var r, o, i;
            t = t.substr(0, n) + (1 == Math.floor(2 * Math.random()) ? t[n].toUpperCase() : t[n]) + t.substr(n + 1),
            n++
        }
        return t
    },
    pronounceable: function(e) {
        var t = "", n, r, o, i = 0, a, s, l, c, u = "abcdefghijklmnopqrstuvwxyz", p = [[[2, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0], [37, 25, 2, 5, 38, 0, 0, 2, 46, 1, 0, 304, 0, 2, 49, 0, 0, 24, 24, 0, 19, 0, 0, 0, 14, 0], [26, 1, 64, 2, 107, 0, 1, 94, 67, 0, 173, 13, 5, 1, 35, 1, 13, 32, 3, 114, 23, 0, 0, 0, 45, 0], [35, 7, 3, 43, 116, 6, 3, 8, 75, 14, 1, 16, 25, 3, 44, 3, 1, 35, 20, 1, 10, 25, 9, 0, 18, 0], [2, 0, 2, 1, 0, 1, 3, 0, 0, 0, 0, 10, 0, 2, 3, 0, 0, 12, 6, 0, 2, 0, 0, 0, 0, 0], [5, 0, 0, 0, 14, 50, 2, 0, 3, 0, 2, 5, 0, 2, 7, 0, 0, 5, 1, 39, 1, 0, 0, 0, 1, 0], [30, 1, 0, 1, 182, 0, 42, 5, 30, 0, 0, 7, 9, 42, 51, 3, 0, 24, 3, 0, 21, 0, 3, 0, 3, 0], [12, 0, 0, 0, 20, 0, 0, 0, 3, 0, 0, 5, 4, 2, 13, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0], [2, 0, 10, 26, 2, 1, 10, 0, 2, 1, 2, 87, 13, 144, 0, 2, 0, 93, 30, 23, 0, 3, 1, 0, 0, 0], [4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [11, 0, 1, 1, 98, 1, 0, 1, 15, 0, 0, 3, 0, 0, 5, 1, 0, 3, 0, 1, 2, 0, 3, 0, 8, 0], [78, 20, 34, 45, 124, 21, 24, 5, 109, 0, 28, 237, 31, 3, 53, 23, 0, 7, 16, 69, 29, 26, 5, 0, 26, 2], [70, 57, 1, 1, 98, 3, 0, 1, 68, 0, 0, 3, 38, 2, 43, 69, 0, 3, 14, 3, 12, 0, 2, 0, 14, 0], [114, 6, 156, 359, 103, 8, 146, 12, 141, 2, 57, 4, 0, 89, 61, 1, 4, 1, 124, 443, 29, 6, 1, 3, 28, 9], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 3, 2, 2, 2, 0, 0, 0, 0, 0], [29, 3, 0, 1, 59, 1, 0, 86, 25, 0, 1, 14, 1, 1, 37, 94, 0, 9, 22, 30, 8, 0, 0, 0, 9, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0], [124, 64, 101, 233, 115, 12, 47, 5, 188, 3, 61, 55, 68, 34, 46, 25, 6, 94, 48, 189, 5, 22, 5, 1, 172, 2], [19, 3, 32, 0, 71, 0, 1, 81, 49, 0, 22, 3, 19, 2, 19, 34, 4, 0, 152, 211, 12, 0, 1, 0, 17, 1], [50, 3, 41, 2, 863, 4, 0, 144, 352, 0, 5, 14, 6, 3, 144, 0, 0, 60, 13, 106, 57, 1, 5, 0, 8, 5], [0, 5, 23, 35, 5, 5, 38, 1, 0, 1, 3, 33, 4, 23, 0, 4, 1, 35, 52, 56, 0, 1, 0, 7, 0, 1], [35, 0, 0, 1, 108, 0, 0, 0, 49, 0, 0, 1, 0, 0, 19, 0, 0, 0, 0, 0, 3, 1, 0, 0, 6, 0], [30, 10, 0, 4, 3, 6, 2, 2, 2, 0, 10, 13, 4, 15, 3, 0, 0, 6, 3, 5, 0, 0, 0, 0, 2, 0], [3, 0, 0, 0, 4, 0, 0, 0, 22, 0, 0, 1, 0, 0, 7, 2, 0, 0, 1, 1, 0, 0, 3, 0, 3, 0], [11, 8, 1, 5, 16, 5, 1, 2, 2, 0, 0, 10, 7, 4, 13, 1, 0, 3, 5, 7, 3, 0, 5, 0, 0, 0], [10, 0, 0, 1, 22, 0, 0, 0, 10, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 2, 2, 0, 0, 0, 4, 11]], [[0, 17, 74, 11, 1, 2, 19, 4, 8, 0, 10, 68, 7, 73, 1, 7, 0, 110, 54, 55, 9, 1, 3, 1, 12, 1], [7, 0, 0, 0, 16, 0, 0, 0, 10, 0, 0, 24, 0, 0, 9, 0, 0, 2, 3, 0, 2, 0, 0, 0, 14, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0], [51, 1, 14, 34, 18, 11, 16, 7, 9, 0, 1, 85, 5, 48, 2, 2, 2, 199, 36, 41, 0, 4, 5, 1, 6, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [34, 8, 22, 21, 8, 3, 9, 1, 0, 3, 1, 50, 7, 45, 16, 4, 2, 29, 22, 59, 4, 4, 0, 0, 0, 3], [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [57, 0, 0, 0, 519, 0, 0, 0, 35, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 32, 1, 0, 0, 3, 0], [0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [62, 7, 4, 21, 3, 2, 9, 3, 8, 1, 1, 46, 8, 63, 58, 2, 0, 55, 15, 20, 46, 6, 17, 10, 19, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [110, 0, 0, 0, 77, 0, 0, 0, 100, 0, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 28, 0, 0, 0, 10, 0], [0, 0, 6, 0, 16, 0, 0, 0, 7, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 27, 2, 0, 0, 0, 0, 0], [1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 3, 21, 16, 3, 5, 14, 0, 12, 1, 2, 52, 7, 20, 2, 0, 1, 104, 44, 54, 0, 0, 0, 3, 1, 5], [0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 3, 0, 1, 2, 0, 0, 0, 4, 0, 0, 0, 3, 0, 6, 8, 3, 0, 0, 2, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[1, 47, 17, 33, 1, 3, 4, 5, 7, 1, 3, 120, 40, 120, 1, 59, 1, 171, 60, 150, 19, 20, 1, 0, 5, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [23, 0, 0, 0, 22, 0, 0, 5, 13, 0, 0, 13, 0, 0, 26, 0, 0, 7, 0, 0, 27, 0, 0, 0, 0, 0], [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [23, 6, 4, 17, 6, 6, 1, 2, 13, 0, 0, 50, 12, 109, 7, 43, 0, 76, 63, 22, 1, 0, 4, 0, 2, 1], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 4, 1, 0, 1, 0, 0, 0, 0, 0], [165, 10, 2, 3, 176, 4, 3, 1, 141, 0, 0, 26, 20, 16, 102, 1, 0, 63, 8, 10, 44, 0, 13, 0, 20, 0], [76, 15, 8, 33, 24, 16, 3, 0, 0, 0, 0, 38, 5, 45, 50, 28, 0, 29, 38, 71, 6, 8, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [17, 16, 2, 3, 90, 4, 1, 7, 20, 1, 1, 45, 8, 8, 12, 9, 0, 3, 32, 6, 6, 0, 13, 0, 22, 0], [95, 0, 0, 0, 84, 0, 0, 0, 50, 0, 0, 0, 0, 0, 54, 0, 0, 0, 0, 0, 34, 0, 0, 0, 3, 0], [1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [33, 16, 40, 22, 14, 10, 11, 12, 9, 1, 1, 101, 218, 421, 24, 56, 2, 129, 37, 40, 86, 22, 25, 4, 4, 2], [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0], [101, 0, 0, 0, 112, 0, 0, 0, 75, 0, 0, 0, 0, 0, 88, 0, 0, 0, 0, 1, 41, 0, 0, 0, 25, 0], [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0], [44, 0, 0, 0, 12, 2, 0, 0, 113, 0, 0, 0, 2, 0, 94, 0, 0, 46, 0, 0, 42, 0, 1, 0, 3, 0], [3, 12, 2, 6, 6, 6, 0, 0, 8, 0, 0, 102, 42, 10, 9, 15, 0, 72, 51, 41, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 1, 20, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 2, 2, 4, 0, 3, 2, 9, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 7, 16, 7, 1, 2, 13, 6, 18, 0, 3, 54, 23, 59, 0, 10, 0, 31, 6, 40, 8, 13, 3, 0, 32, 3], [9, 0, 0, 0, 7, 0, 0, 0, 3, 0, 0, 2, 0, 0, 8, 0, 0, 1, 0, 0, 8, 0, 0, 0, 2, 0], [5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [8, 0, 0, 0, 30, 0, 0, 3, 19, 0, 0, 38, 0, 0, 4, 0, 0, 4, 0, 0, 1, 0, 0, 0, 16, 0], [34, 37, 82, 14, 17, 41, 11, 4, 5, 2, 0, 88, 62, 170, 14, 40, 4, 183, 99, 39, 6, 20, 16, 6, 1, 2], [6, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 2, 0, 0, 5, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0], [4, 0, 0, 0, 73, 0, 0, 0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 3, 0], [8, 0, 0, 0, 9, 0, 0, 0, 4, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [100, 10, 104, 12, 33, 26, 31, 1, 1, 0, 1, 22, 22, 65, 57, 15, 0, 20, 138, 53, 20, 31, 1, 6, 0, 1], [4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 0, 0, 0, 79, 0, 0, 0, 12, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0], [13, 0, 0, 0, 3, 0, 0, 0, 21, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [7, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0], [1, 5, 21, 10, 6, 3, 20, 1, 3, 0, 0, 30, 38, 54, 17, 7, 0, 39, 11, 10, 30, 5, 54, 5, 1, 3], [6, 0, 0, 0, 1, 0, 0, 1, 3, 0, 0, 1, 0, 0, 7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [74, 0, 0, 0, 47, 0, 0, 0, 53, 0, 0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 22, 0, 0, 0, 8, 0], [1, 0, 3, 0, 10, 0, 0, 9, 5, 0, 1, 3, 10, 0, 16, 8, 0, 0, 0, 31, 1, 0, 2, 0, 0, 0], [3, 0, 0, 0, 1, 0, 0, 6, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 7, 52, 2, 5, 3, 4, 0, 2, 0, 1, 33, 14, 15, 5, 11, 1, 19, 15, 8, 1, 0, 0, 0, 0, 1], [3, 0, 0, 0, 13, 0, 0, 0, 7, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [19, 0, 0, 0, 10, 0, 0, 0, 19, 0, 0, 0, 0, 0, 8, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 2, 1, 2, 3, 1, 2, 0, 1, 0, 1, 4, 4, 12, 0, 0, 0, 0, 8, 1, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]], [[0, 39, 34, 110, 0, 12, 13, 3, 0, 0, 50, 68, 38, 71, 0, 13, 1, 117, 80, 112, 28, 19, 7, 0, 0, 1], [32, 5, 0, 0, 31, 0, 0, 0, 8, 0, 0, 6, 0, 0, 28, 0, 0, 32, 2, 3, 29, 0, 0, 0, 4, 0], [33, 0, 9, 2, 51, 0, 0, 39, 49, 0, 47, 26, 0, 0, 59, 0, 0, 35, 2, 206, 42, 0, 0, 0, 2, 0], [29, 7, 1, 16, 45, 5, 22, 3, 88, 0, 0, 8, 9, 4, 24, 2, 0, 27, 8, 4, 27, 0, 7, 0, 13, 0], [2, 4, 13, 63, 1, 6, 1, 4, 10, 0, 19, 23, 13, 66, 1, 42, 0, 43, 9, 34, 1, 4, 6, 0, 0, 8], [14, 0, 1, 2, 36, 33, 0, 0, 22, 0, 0, 15, 0, 0, 24, 0, 0, 14, 1, 13, 35, 0, 0, 0, 5, 0], [48, 1, 0, 0, 36, 1, 15, 2, 38, 0, 0, 7, 4, 4, 26, 0, 0, 38, 0, 0, 19, 0, 0, 0, 4, 0], [14, 0, 0, 0, 24, 0, 0, 0, 6, 0, 0, 0, 1, 0, 18, 0, 0, 4, 0, 0, 4, 0, 0, 0, 3, 0], [8, 0, 5, 13, 2, 1, 42, 0, 1, 1, 2, 13, 7, 59, 1, 1, 0, 10, 25, 22, 0, 7, 0, 0, 0, 2], [4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [2, 1, 0, 1, 6, 0, 0, 0, 4, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 3, 0, 0, 0, 0, 1, 0], [76, 7, 6, 57, 131, 19, 7, 3, 125, 0, 4, 238, 22, 1, 48, 15, 0, 4, 27, 26, 17, 19, 2, 0, 7, 0], [87, 53, 1, 0, 84, 0, 0, 0, 102, 0, 0, 3, 8, 8, 56, 64, 0, 0, 4, 0, 19, 0, 1, 0, 8, 0], [78, 17, 68, 159, 128, 8, 35, 14, 96, 2, 2, 4, 5, 54, 57, 3, 2, 9, 127, 624, 33, 10, 8, 0, 11, 16], [0, 0, 8, 10, 0, 6, 7, 1, 2, 0, 0, 23, 10, 38, 0, 16, 0, 14, 6, 4, 41, 3, 2, 2, 0, 1], [26, 1, 1, 0, 27, 0, 0, 32, 45, 0, 0, 21, 1, 0, 35, 9, 0, 35, 10, 65, 13, 0, 2, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 0, 0, 0], [217, 57, 66, 22, 190, 41, 70, 13, 200, 3, 14, 40, 134, 117, 113, 42, 2, 123, 167, 135, 23, 58, 22, 1, 123, 1], [17, 7, 74, 6, 58, 1, 3, 25, 82, 0, 3, 6, 17, 5, 34, 52, 7, 0, 222, 278, 18, 2, 1, 0, 6, 0], [78, 3, 19, 0, 129, 4, 0, 93, 105, 0, 1, 3, 2, 2, 50, 1, 0, 73, 5, 113, 17, 0, 4, 0, 32, 4], [0, 4, 7, 6, 1, 0, 4, 0, 0, 0, 2, 3, 17, 4, 0, 15, 0, 46, 20, 18, 0, 2, 1, 0, 0, 0], [29, 0, 0, 0, 121, 0, 0, 0, 56, 0, 0, 0, 0, 0, 26, 0, 0, 2, 1, 0, 2, 2, 0, 0, 3, 1], [33, 4, 3, 4, 16, 2, 0, 5, 24, 0, 0, 3, 3, 3, 23, 2, 0, 3, 15, 4, 0, 0, 1, 0, 2, 0], [29, 0, 43, 0, 20, 0, 0, 14, 21, 0, 0, 0, 0, 0, 15, 78, 1, 0, 0, 72, 12, 0, 0, 1, 2, 0], [7, 3, 1, 4, 25, 2, 0, 2, 0, 0, 1, 4, 6, 4, 4, 1, 0, 2, 3, 0, 0, 1, 4, 0, 0, 0], [1, 0, 0, 0, 9, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 1, 1, 0, 0, 2, 3]], [[1, 10, 39, 5, 2, 1, 1, 3, 18, 0, 2, 35, 10, 27, 0, 0, 0, 36, 13, 18, 10, 0, 2, 3, 4, 1], [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [18, 5, 24, 6, 12, 0, 2, 0, 6, 0, 1, 25, 6, 18, 2, 0, 0, 114, 17, 15, 4, 2, 2, 0, 1, 0], [10, 2, 0, 0, 51, 0, 0, 2, 45, 0, 0, 21, 4, 0, 13, 0, 0, 9, 7, 0, 7, 0, 0, 0, 8, 0], [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 9, 58, 18, 42, 7, 11, 0, 0, 0, 0, 29, 2, 53, 0, 0, 0, 40, 41, 18, 0, 2, 0, 10, 0, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [64, 0, 0, 0, 50, 0, 0, 0, 21, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 42, 0, 0, 0, 15, 0], [6, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 1, 8, 2, 1, 0, 7, 0, 6, 0, 0, 34, 1, 8, 32, 2, 0, 165, 5, 0, 25, 1, 2, 7, 1, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [64, 0, 0, 0, 66, 0, 0, 0, 35, 0, 0, 0, 0, 0, 35, 0, 0, 0, 0, 0, 11, 0, 0, 0, 3, 0], [1, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 19, 0, 0, 3, 1, 0, 0, 0, 1, 0, 3, 0, 0, 1, 9, 0, 0, 0, 4, 0, 8, 0], [0, 0, 4, 2, 1, 0, 9, 0, 0, 2, 0, 119, 7, 24, 0, 0, 0, 28, 31, 6, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 20, 5, 11, 3, 2, 11, 3, 13, 0, 0, 68, 24, 60, 1, 5, 0, 63, 23, 68, 15, 8, 5, 0, 2, 5], [4, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [23, 3, 2, 4, 12, 1, 1, 3, 4, 0, 0, 32, 8, 141, 39, 4, 0, 96, 29, 33, 1, 1, 4, 0, 5, 0], [0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0], [8, 0, 0, 0, 20, 0, 0, 1, 60, 0, 0, 24, 0, 0, 3, 1, 0, 6, 4, 0, 0, 0, 0, 0, 12, 0], [18, 4, 1, 1, 12, 2, 1, 1, 2, 0, 1, 4, 0, 3, 12, 1, 0, 1, 3, 153, 2, 0, 3, 0, 1, 0], [23, 21, 16, 6, 7, 2, 9, 0, 0, 0, 0, 24, 7, 103, 17, 1, 0, 10, 26, 19, 3, 10, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [49, 0, 0, 0, 73, 0, 0, 0, 25, 0, 0, 0, 0, 0, 38, 0, 0, 0, 0, 0, 13, 0, 0, 0, 17, 0], [23, 0, 0, 0, 12, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0], [26, 1, 0, 0, 28, 0, 0, 0, 20, 0, 0, 0, 0, 0, 26, 2, 0, 0, 0, 1, 7, 0, 0, 0, 0, 0], [6, 4, 3, 16, 6, 1, 10, 1, 5, 0, 0, 22, 1, 49, 20, 3, 0, 34, 12, 23, 16, 7, 5, 0, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [216, 0, 0, 0, 97, 0, 0, 0, 43, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 14, 0, 0, 0, 3, 0], [2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 2, 1, 0, 0, 0, 18, 0, 0, 1, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 8, 3, 0, 0, 0, 0, 0, 17, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [28, 1, 1, 0, 49, 1, 1, 0, 41, 0, 0, 26, 15, 24, 2, 0, 0, 14, 22, 6, 0, 0, 0, 0, 3, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 3, 0, 6, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[2, 26, 15, 20, 6, 8, 22, 3, 31, 0, 11, 90, 66, 171, 3, 25, 0, 142, 30, 49, 20, 11, 20, 0, 13, 8], [4, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 2, 0, 0, 12, 0, 0, 2, 0, 0, 4, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0], [123, 5, 22, 33, 37, 5, 3, 0, 27, 0, 0, 87, 65, 86, 17, 7, 1, 311, 57, 42, 11, 11, 14, 8, 11, 2], [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [22, 22, 56, 15, 23, 6, 19, 0, 0, 1, 1, 73, 20, 79, 17, 41, 0, 36, 53, 39, 3, 11, 0, 0, 0, 6], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 11, 0, 0, 0, 8, 0, 0, 0, 0, 0, 22, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0], [21, 0, 0, 0, 15, 0, 0, 0, 6, 0, 0, 0, 1, 0, 7, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0], [3, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 0, 1, 3, 0, 0, 0, 4, 0, 2, 0, 0, 0, 0, 0], [13, 18, 13, 25, 17, 5, 13, 0, 7, 1, 4, 101, 62, 62, 44, 29, 0, 130, 45, 33, 81, 8, 28, 0, 6, 2], [3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [20, 0, 0, 0, 23, 0, 0, 0, 40, 0, 0, 1, 0, 0, 72, 0, 0, 0, 0, 0, 13, 0, 0, 0, 3, 0], [3, 0, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0], [3, 0, 2, 1, 21, 9, 1, 7, 5, 0, 0, 1, 4, 3, 4, 1, 0, 2, 7, 1, 1, 0, 3, 0, 6, 0], [3, 13, 7, 6, 3, 5, 12, 1, 0, 0, 0, 7, 37, 26, 0, 3, 0, 37, 24, 15, 0, 0, 0, 2, 2, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [17, 0, 0, 0, 5, 0, 0, 2, 5, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 1, 1, 39, 1, 0, 3, 0, 1, 0, 0, 13, 9, 0, 0, 25, 0, 9, 29, 9, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 33, 20, 8, 1, 0, 17, 5, 1, 0, 2, 169, 20, 230, 0, 3, 0, 30, 13, 91, 0, 1, 1, 2, 0, 1], [11, 19, 0, 0, 38, 0, 0, 0, 22, 0, 0, 131, 1, 2, 10, 0, 0, 20, 1, 0, 23, 0, 0, 0, 2, 0], [161, 0, 3, 0, 113, 0, 0, 62, 113, 0, 142, 15, 0, 4, 46, 0, 0, 12, 5, 53, 42, 0, 0, 0, 7, 0], [51, 2, 0, 31, 232, 0, 30, 0, 46, 1, 0, 5, 1, 8, 10, 1, 0, 1, 10, 5, 11, 0, 7, 0, 9, 0], [0, 1, 17, 6, 1, 16, 11, 1, 0, 0, 1, 52, 4, 70, 0, 1, 0, 66, 18, 50, 7, 17, 6, 0, 0, 2], [7, 0, 0, 0, 31, 45, 0, 0, 27, 0, 0, 9, 0, 1, 10, 0, 0, 2, 0, 24, 10, 0, 0, 0, 71, 0], [48, 0, 0, 0, 41, 0, 30, 147, 30, 0, 0, 4, 15, 57, 20, 1, 0, 23, 3, 1, 15, 0, 1, 0, 2, 2], [1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [6, 0, 0, 0, 17, 0, 0, 0, 3, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0], [60, 10, 6, 36, 106, 6, 5, 7, 90, 0, 13, 253, 14, 0, 24, 1, 0, 1, 10, 31, 6, 6, 5, 0, 10, 0], [76, 26, 0, 0, 94, 1, 0, 1, 53, 0, 0, 1, 38, 1, 30, 133, 0, 1, 8, 0, 17, 0, 0, 0, 2, 0], [212, 12, 143, 168, 396, 83, 435, 26, 94, 8, 43, 9, 6, 44, 70, 3, 10, 2, 139, 205, 35, 46, 4, 4, 15, 1], [2, 2, 20, 10, 1, 0, 9, 0, 0, 0, 0, 28, 12, 604, 0, 8, 0, 25, 13, 24, 139, 3, 2, 3, 0, 1], [20, 5, 0, 0, 26, 2, 0, 16, 16, 1, 0, 33, 6, 0, 13, 39, 0, 5, 19, 28, 5, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 0, 0, 0, 0], [41, 2, 39, 24, 106, 7, 9, 0, 19, 0, 11, 20, 24, 1, 24, 8, 0, 39, 11, 31, 3, 5, 8, 0, 10, 0], [35, 5, 71, 4, 110, 4, 2, 189, 56, 1, 13, 12, 93, 5, 55, 33, 3, 6, 85, 271, 4, 1, 1, 0, 8, 0], [136, 1, 34, 1, 184, 5, 0, 77, 158, 0, 1, 4, 6, 5, 70, 1, 0, 31, 2, 105, 72, 0, 1, 0, 142, 19], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 121, 1, 0, 0, 0, 1, 19, 0, 0, 0, 0, 0, 0, 0], [57, 0, 0, 0, 292, 0, 0, 0, 37, 0, 0, 0, 0, 0, 12, 0, 0, 1, 0, 0, 3, 0, 0, 0, 2, 0], [3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 2, 1, 1, 0, 3, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 9, 1, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 16]], [[0, 2, 32, 1, 1, 0, 3, 3, 2, 0, 3, 1, 8, 17, 0, 2, 0, 5, 2, 0, 2, 3, 2, 1, 1, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 0, 24, 1, 1, 3, 0, 1, 0, 2, 0, 2, 0, 6, 2, 0, 0, 11, 9, 5, 0, 0, 6, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 4, 0, 0, 0, 0, 2, 4, 3, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 2, 6, 0, 3, 0, 3, 12, 10, 0, 1, 6, 0, 5, 0, 0, 0, 10, 10, 1, 13, 4, 2, 0, 7, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 3, 0, 19, 0, 0, 8, 0, 2, 2, 2, 8, 5, 24, 0, 1, 0, 15, 9, 5, 0, 1, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 3, 0, 6, 1, 2, 8, 2, 1, 1, 1, 9, 4, 13, 2, 3, 0, 18, 4, 17, 2, 1, 2, 1, 5, 2], [3, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 11, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [4, 3, 0, 7, 28, 3, 3, 2, 1, 0, 0, 20, 5, 55, 3, 3, 0, 59, 18, 56, 2, 1, 4, 0, 27, 0], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [9, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 8, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0], [5, 2, 3, 9, 15, 1, 1, 0, 0, 0, 1, 10, 10, 87, 2, 4, 0, 11, 15, 13, 0, 2, 2, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [15, 0, 0, 0, 46, 0, 0, 0, 13, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0], [13, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 11, 0, 0, 0, 10, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0], [1, 1, 2, 3, 2, 4, 0, 2, 1, 0, 1, 3, 1, 7, 1, 2, 0, 6, 2, 1, 7, 4, 5, 2, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 5, 0, 0, 0, 2, 0], [2, 2, 1, 0, 1, 0, 1, 9, 5, 0, 1, 0, 4, 0, 8, 3, 0, 0, 0, 11, 4, 0, 1, 0, 1, 0], [3, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 5, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 5, 1, 1, 0, 8, 0, 2, 1, 1, 0, 0, 1, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [9, 0, 0, 0, 4, 0, 0, 1, 2, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 4, 0, 0, 2, 0, 0, 2, 1, 0, 1, 0, 3, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[1, 46, 84, 43, 3, 2, 46, 9, 52, 0, 10, 3, 64, 242, 4, 23, 1, 157, 92, 210, 45, 21, 23, 9, 42, 11], [12, 0, 0, 0, 17, 0, 0, 0, 3, 0, 0, 2, 0, 0, 13, 0, 0, 4, 0, 0, 4, 0, 0, 0, 2, 0], [9, 0, 0, 0, 6, 0, 0, 12, 4, 0, 0, 1, 1, 0, 19, 0, 0, 2, 0, 1, 7, 0, 0, 0, 2, 0], [2, 3, 2, 0, 41, 4, 0, 1, 16, 0, 0, 1, 2, 3, 13, 1, 0, 8, 9, 2, 3, 0, 5, 0, 3, 0], [94, 25, 75, 44, 36, 13, 55, 9, 26, 1, 1, 9, 55, 121, 22, 22, 0, 77, 84, 115, 12, 29, 14, 30, 75, 1], [9, 1, 0, 0, 4, 1, 1, 1, 12, 0, 0, 1, 0, 0, 7, 0, 0, 8, 1, 2, 8, 0, 1, 0, 0, 0], [16, 0, 0, 0, 12, 0, 0, 0, 10, 0, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0], [7, 0, 0, 0, 6, 0, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [82, 33, 140, 26, 43, 37, 73, 0, 0, 1, 6, 11, 46, 238, 50, 40, 13, 5, 90, 127, 12, 36, 0, 3, 0, 7], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [7, 0, 0, 0, 4, 0, 0, 3, 9, 0, 0, 2, 0, 1, 2, 0, 0, 0, 3, 0, 0, 0, 3, 0, 8, 0], [128, 12, 2, 4, 169, 7, 2, 4, 152, 1, 0, 0, 7, 0, 100, 2, 0, 1, 10, 2, 41, 0, 7, 0, 53, 0], [27, 0, 0, 2, 11, 0, 0, 2, 9, 0, 0, 0, 1, 0, 13, 0, 0, 0, 4, 0, 3, 0, 0, 0, 3, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [23, 23, 65, 15, 7, 4, 132, 3, 32, 0, 2, 7, 29, 69, 50, 36, 11, 74, 33, 53, 66, 16, 80, 1, 12, 1], [11, 0, 0, 0, 3, 1, 0, 21, 5, 0, 0, 0, 1, 0, 6, 0, 0, 3, 1, 4, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 2, 0, 0, 0, 6, 0], [7, 1, 0, 0, 16, 0, 0, 8, 23, 0, 1, 0, 1, 0, 20, 3, 0, 0, 1, 23, 0, 0, 1, 0, 2, 0], [22, 1, 0, 0, 23, 0, 0, 14, 34, 0, 0, 0, 2, 0, 23, 0, 0, 9, 3, 0, 8, 1, 1, 0, 18, 5], [5, 17, 26, 18, 31, 5, 13, 0, 5, 2, 4, 8, 68, 31, 15, 5, 0, 21, 68, 56, 0, 4, 0, 13, 0, 1], [19, 0, 0, 1, 46, 0, 0, 0, 9, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [8, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 4, 12, 2, 2, 2, 3, 7, 2, 0, 1, 3, 13, 11, 2, 11, 0, 2, 31, 15, 1, 0, 4, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 10, 59, 34, 3, 0, 57, 7, 31, 3, 25, 104, 6, 326, 2, 4, 0, 144, 49, 192, 10, 2, 3, 11, 14, 7], [31, 1, 0, 1, 44, 0, 0, 0, 32, 0, 0, 31, 0, 1, 27, 1, 0, 32, 1, 0, 21, 0, 0, 0, 0, 0], [3, 1, 17, 6, 2, 2, 9, 3, 5, 0, 9, 3, 3, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [30, 6, 8, 45, 3, 2, 14, 1, 4, 0, 1, 51, 19, 283, 10, 4, 0, 125, 39, 128, 0, 2, 9, 3, 4, 1], [0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [19, 0, 93, 54, 8, 2, 19, 0, 0, 1, 2, 76, 9, 194, 4, 0, 1, 21, 96, 109, 10, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [40, 0, 0, 0, 46, 0, 0, 0, 33, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 17, 0, 0, 0, 12, 0], [12, 0, 0, 0, 4, 0, 0, 0, 10, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [4, 10, 13, 28, 4, 1, 14, 3, 11, 0, 6, 47, 10, 168, 16, 3, 0, 107, 40, 45, 56, 8, 1, 1, 1, 2], [52, 3, 0, 0, 71, 1, 1, 26, 18, 0, 4, 71, 0, 0, 50, 0, 0, 41, 9, 43, 19, 0, 0, 0, 7, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 2, 1, 5, 1, 0, 2, 3, 0, 1, 0, 2, 0, 8, 2, 0, 0, 1, 10, 1, 0, 0, 0, 2, 0], [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 7, 11, 6, 3, 6, 0, 2, 0, 2, 55, 11, 29, 2, 1, 0, 18, 53, 30, 0, 0, 0, 0, 0, 3], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 11, 0, 5, 0, 1, 0, 0, 0, 0, 1, 0, 2, 7, 0, 0, 7, 7, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[2, 24, 33, 23, 6, 3, 30, 6, 20, 0, 9, 115, 29, 59, 2, 31, 0, 94, 28, 159, 19, 10, 5, 0, 1, 5], [5, 0, 1, 0, 20, 0, 0, 0, 1, 0, 0, 4, 0, 0, 7, 0, 0, 4, 1, 0, 10, 0, 0, 0, 0, 0], [25, 0, 0, 0, 190, 0, 0, 87, 51, 0, 1, 18, 0, 0, 62, 0, 0, 16, 0, 36, 21, 0, 0, 0, 8, 0], [75, 11, 4, 1, 162, 6, 3, 7, 102, 1, 1, 22, 10, 2, 57, 9, 2, 46, 30, 4, 37, 0, 11, 0, 20, 0], [34, 12, 36, 12, 29, 17, 16, 4, 14, 0, 0, 45, 16, 20, 25, 8, 6, 88, 80, 84, 32, 12, 37, 18, 45, 3], [15, 0, 0, 0, 30, 0, 0, 0, 38, 0, 0, 23, 0, 0, 26, 0, 0, 10, 0, 0, 19, 0, 0, 0, 0, 0], [22, 8, 0, 3, 114, 6, 0, 15, 18, 0, 3, 51, 5, 0, 20, 2, 0, 24, 24, 28, 38, 0, 2, 0, 9, 0], [18, 0, 0, 0, 16, 0, 0, 0, 6, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0], [90, 9, 148, 14, 33, 27, 35, 4, 1, 0, 5, 12, 25, 44, 26, 21, 7, 4, 87, 94, 29, 11, 0, 4, 0, 4], [2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0], [6, 0, 1, 0, 22, 4, 1, 1, 10, 0, 0, 12, 2, 0, 1, 1, 0, 2, 2, 3, 0, 0, 0, 0, 9, 0], [9, 0, 0, 0, 8, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [8, 0, 0, 0, 5, 0, 0, 0, 2, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [39, 0, 0, 0, 74, 0, 0, 0, 52, 0, 1, 0, 0, 0, 23, 0, 0, 0, 1, 0, 14, 0, 1, 0, 25, 0], [4, 18, 21, 10, 4, 4, 15, 0, 11, 0, 0, 30, 60, 34, 11, 11, 0, 80, 32, 47, 52, 18, 24, 7, 2, 2], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0, 0, 6, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0], [3, 0, 1, 0, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 3, 0, 0, 0, 6, 0], [26, 4, 23, 2, 73, 17, 3, 12, 96, 0, 5, 8, 13, 0, 60, 25, 0, 1, 3, 79, 39, 4, 4, 0, 5, 0], [143, 1, 1, 1, 175, 2, 2, 64, 209, 0, 0, 13, 3, 1, 65, 1, 0, 114, 3, 0, 32, 0, 2, 0, 21, 1], [12, 6, 16, 6, 11, 3, 6, 0, 5, 0, 1, 15, 35, 9, 6, 3, 0, 9, 25, 31, 1, 0, 0, 0, 0, 1], [15, 0, 0, 0, 43, 0, 0, 0, 20, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0], [12, 0, 0, 0, 3, 0, 0, 2, 4, 0, 0, 0, 0, 0, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [5, 3, 1, 1, 0, 0, 0, 1, 0, 0, 0, 7, 14, 0, 4, 1, 1, 1, 3, 1, 1, 1, 2, 1, 0, 0], [10, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 5, 0]], [[1, 0, 20, 30, 0, 2, 5, 2, 0, 0, 9, 9, 8, 18, 0, 4, 1, 51, 13, 44, 1, 1, 0, 2, 0, 0], [17, 24, 2, 2, 28, 2, 0, 1, 32, 4, 0, 19, 0, 1, 16, 0, 0, 5, 26, 3, 8, 3, 1, 0, 2, 0], [50, 0, 28, 0, 38, 0, 0, 47, 26, 0, 129, 14, 0, 0, 33, 0, 0, 25, 0, 34, 20, 0, 0, 0, 8, 0], [17, 3, 3, 15, 59, 3, 13, 4, 47, 0, 1, 13, 2, 1, 22, 3, 0, 8, 11, 0, 21, 0, 8, 0, 35, 0], [0, 6, 1, 7, 0, 3, 0, 1, 6, 0, 1, 10, 3, 13, 1, 0, 1, 10, 15, 6, 2, 7, 0, 3, 1, 0], [7, 0, 0, 0, 4, 63, 0, 0, 10, 0, 0, 4, 1, 0, 6, 0, 0, 1, 0, 15, 4, 0, 0, 0, 1, 0], [34, 2, 0, 1, 44, 1, 22, 3, 15, 1, 0, 11, 3, 11, 7, 0, 0, 80, 1, 2, 18, 0, 1, 0, 83, 0], [10, 0, 0, 0, 8, 0, 0, 0, 6, 0, 0, 1, 5, 9, 5, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0], [3, 1, 12, 53, 1, 1, 2, 0, 0, 0, 1, 27, 0, 51, 0, 0, 0, 11, 39, 8, 0, 0, 0, 1, 0, 0], [1, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 2, 1, 0, 48, 0, 0, 1, 7, 0, 1, 4, 0, 0, 3, 1, 0, 0, 5, 0, 3, 0, 1, 0, 6, 0], [71, 4, 6, 83, 111, 8, 5, 3, 121, 0, 14, 124, 16, 1, 132, 6, 0, 1, 18, 24, 43, 16, 2, 0, 46, 1], [89, 50, 1, 0, 174, 5, 0, 1, 76, 0, 0, 2, 64, 7, 56, 125, 1, 1, 4, 0, 4, 0, 2, 0, 22, 0], [129, 3, 64, 82, 181, 52, 86, 3, 124, 10, 11, 7, 3, 46, 75, 1, 6, 10, 107, 149, 8, 38, 9, 1, 54, 5], [0, 2, 4, 92, 0, 22, 4, 1, 0, 0, 68, 42, 42, 44, 0, 19, 0, 21, 21, 68, 0, 3, 0, 0, 0, 2], [28, 1, 2, 0, 71, 0, 2, 82, 32, 1, 3, 16, 1, 1, 45, 29, 0, 17, 14, 21, 10, 0, 2, 0, 19, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0], [122, 26, 31, 96, 138, 7, 34, 2, 143, 0, 61, 8, 85, 76, 61, 59, 1, 58, 46, 211, 11, 4, 9, 0, 116, 1], [31, 4, 24, 0, 107, 0, 3, 18, 102, 0, 2, 7, 9, 1, 18, 42, 2, 0, 63, 127, 5, 1, 2, 0, 8, 0], [45, 7, 11, 0, 64, 2, 1, 88, 63, 0, 0, 10, 3, 1, 42, 4, 0, 17, 7, 63, 9, 0, 3, 0, 11, 0], [3, 11, 17, 13, 3, 3, 62, 1, 6, 0, 0, 32, 1, 137, 0, 11, 1, 86, 445, 103, 0, 7, 0, 1, 0, 2], [26, 0, 0, 0, 109, 0, 0, 0, 27, 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [18, 14, 2, 13, 48, 6, 0, 8, 8, 0, 1, 28, 7, 83, 1, 8, 0, 5, 13, 2, 2, 0, 1, 0, 4, 1], [2, 1, 3, 0, 5, 1, 1, 3, 26, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 14, 0], [15, 1, 4, 6, 3, 1, 0, 0, 1, 0, 0, 3, 0, 1, 4, 1, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1]], [[0, 8, 38, 11, 1, 0, 18, 0, 17, 0, 2, 50, 5, 73, 1, 23, 1, 176, 50, 101, 18, 5, 7, 1, 10, 2], [3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 0, 2, 1, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [51, 1, 62, 34, 19, 4, 8, 0, 3, 1, 2, 47, 2, 108, 4, 10, 0, 292, 22, 50, 3, 1, 8, 2, 2, 4], [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [56, 0, 0, 2, 88, 0, 0, 0, 76, 0, 0, 3, 0, 1, 97, 0, 0, 13, 1, 3, 5, 0, 0, 0, 79, 0], [21, 0, 74, 25, 33, 1, 19, 0, 0, 0, 6, 27, 3, 74, 12, 11, 2, 37, 27, 57, 3, 2, 0, 2, 0, 2], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [150, 0, 0, 0, 121, 0, 0, 0, 59, 0, 0, 0, 0, 0, 33, 0, 0, 0, 0, 0, 29, 0, 0, 0, 11, 0], [6, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 1, 19, 10, 12, 2, 7, 0, 31, 0, 12, 111, 14, 55, 23, 17, 0, 97, 126, 52, 20, 3, 13, 3, 2, 0], [16, 0, 0, 0, 48, 0, 0, 1, 20, 0, 0, 32, 1, 0, 25, 0, 0, 32, 3, 0, 1, 0, 0, 0, 16, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [39, 0, 0, 0, 166, 0, 0, 0, 104, 0, 0, 0, 0, 0, 273, 0, 0, 0, 0, 0, 12, 0, 0, 0, 1, 0], [4, 1, 3, 0, 17, 0, 0, 5, 22, 0, 1, 1, 2, 0, 13, 0, 0, 0, 0, 14, 6, 0, 1, 0, 35, 0], [16, 0, 1, 0, 9, 0, 0, 3, 107, 0, 0, 0, 0, 0, 33, 0, 0, 3, 0, 0, 19, 0, 0, 0, 4, 0], [1, 8, 4, 8, 3, 6, 4, 0, 1, 0, 1, 41, 8, 22, 0, 9, 0, 39, 18, 28, 0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 0, 0, 0, 0, 3, 0, 1, 0, 1, 3, 0, 0, 1, 0, 0, 20, 0, 3, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [110, 0, 0, 0, 100, 0, 0, 0, 128, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 72, 130, 95, 8, 35, 73, 14, 85, 3, 10, 121, 95, 313, 2, 119, 1, 26, 66, 277, 19, 45, 28, 2, 28, 13], [32, 0, 0, 0, 26, 0, 0, 0, 35, 0, 0, 4, 0, 0, 44, 0, 0, 3, 1, 0, 9, 0, 0, 0, 5, 0], [18, 0, 2, 0, 47, 0, 0, 86, 25, 0, 3, 11, 0, 0, 13, 0, 0, 1, 2, 7, 38, 0, 0, 0, 4, 0], [22, 5, 1, 0, 26, 1, 0, 4, 42, 0, 0, 4, 0, 2, 17, 1, 0, 5, 9, 4, 3, 0, 4, 0, 7, 0], [166, 26, 106, 99, 114, 52, 55, 20, 25, 4, 4, 60, 69, 143, 20, 72, 8, 11, 257, 119, 14, 56, 34, 7, 23, 2], [11, 0, 0, 0, 15, 1, 0, 0, 9, 0, 0, 7, 0, 0, 8, 0, 0, 4, 0, 0, 12, 0, 0, 0, 0, 0], [26, 0, 0, 0, 63, 0, 0, 5, 25, 0, 0, 11, 1, 0, 18, 0, 0, 2, 2, 0, 13, 0, 0, 0, 11, 0], [11, 0, 0, 0, 19, 0, 0, 0, 5, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0], [182, 54, 210, 87, 79, 38, 65, 1, 0, 1, 6, 49, 65, 166, 82, 61, 1, 0, 151, 141, 29, 44, 1, 6, 1, 10], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [4, 2, 0, 1, 19, 0, 0, 3, 9, 0, 0, 6, 3, 2, 5, 3, 0, 1, 10, 2, 0, 0, 1, 0, 6, 0], [24, 2, 0, 4, 28, 0, 0, 0, 36, 0, 0, 0, 0, 0, 14, 1, 0, 0, 2, 1, 2, 0, 1, 0, 8, 0], [97, 1, 2, 0, 29, 2, 0, 3, 65, 0, 0, 2, 0, 0, 39, 1, 0, 0, 1, 1, 10, 0, 1, 0, 5, 0], [53, 5, 0, 0, 50, 4, 0, 3, 29, 0, 1, 0, 6, 0, 16, 1, 0, 0, 9, 5, 7, 0, 2, 0, 4, 0], [46, 40, 79, 40, 18, 22, 56, 4, 32, 5, 10, 76, 90, 167, 84, 127, 2, 14, 127, 74, 127, 42, 63, 17, 15, 3], [10, 0, 0, 0, 21, 0, 0, 33, 10, 0, 0, 5, 1, 0, 25, 0, 0, 12, 8, 8, 5, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0], [53, 0, 0, 0, 92, 0, 0, 5, 85, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 14, 0, 0, 0, 60, 0], [26, 2, 2, 2, 84, 1, 0, 16, 44, 0, 4, 2, 3, 1, 43, 12, 1, 0, 0, 32, 14, 1, 2, 0, 2, 0], [39, 2, 2, 0, 61, 5, 3, 101, 99, 0, 0, 11, 7, 3, 32, 0, 0, 17, 12, 1, 27, 0, 2, 0, 24, 7], [5, 21, 30, 31, 15, 6, 12, 0, 18, 0, 0, 10, 46, 41, 1, 28, 0, 3, 83, 22, 0, 1, 1, 1, 0, 1], [31, 0, 0, 0, 37, 0, 0, 0, 28, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0], [15, 0, 0, 0, 6, 0, 0, 0, 12, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 3, 3, 5, 3, 0, 1, 0, 0, 0, 0, 10, 11, 4, 12, 16, 0, 0, 9, 4, 0, 0, 2, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[2, 44, 23, 16, 1, 10, 21, 4, 16, 1, 7, 80, 17, 89, 1, 10, 0, 36, 10, 43, 22, 10, 13, 5, 7, 0], [9, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 6, 0, 0, 2, 0, 0, 18, 0, 0, 0, 3, 0], [81, 0, 0, 0, 65, 0, 1, 78, 37, 0, 0, 5, 1, 0, 88, 0, 0, 92, 0, 0, 40, 0, 0, 0, 3, 0], [11, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0], [38, 14, 47, 18, 33, 7, 8, 3, 11, 0, 1, 63, 39, 101, 5, 28, 14, 83, 28, 41, 12, 19, 15, 15, 19, 1], [3, 0, 0, 0, 7, 0, 0, 0, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 6, 0, 0, 0, 1, 0], [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 5, 1, 0, 2, 0, 0, 0, 0, 0], [97, 9, 1, 0, 79, 3, 0, 0, 75, 0, 1, 4, 16, 3, 81, 2, 0, 27, 0, 1, 20, 1, 6, 0, 17, 0], [55, 56, 44, 80, 28, 15, 38, 0, 0, 0, 2, 50, 40, 78, 148, 7, 1, 7, 99, 89, 9, 76, 0, 8, 0, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [9, 0, 0, 0, 24, 0, 0, 0, 35, 0, 0, 0, 2, 0, 3, 0, 0, 1, 0, 0, 5, 0, 0, 0, 23, 0], [42, 0, 0, 0, 35, 0, 0, 0, 29, 0, 0, 1, 0, 0, 29, 0, 0, 0, 0, 0, 13, 0, 0, 0, 2, 0], [57, 0, 0, 0, 30, 0, 0, 0, 31, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 14, 0, 0, 0, 2, 0], [21, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 4, 6, 0, 0, 0, 2, 0], [6, 4, 26, 12, 6, 10, 4, 1, 8, 1, 0, 67, 65, 190, 8, 21, 0, 71, 0, 11, 34, 6, 3, 0, 3, 1], [63, 1, 0, 0, 116, 0, 0, 41, 82, 0, 0, 24, 0, 0, 69, 0, 0, 34, 1, 0, 16, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 0, 0, 0, 0, 0], [4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0], [50, 3, 2, 0, 77, 3, 0, 4, 151, 0, 0, 5, 11, 1, 42, 2, 0, 4, 0, 4, 17, 0, 13, 0, 19, 0], [258, 6, 4, 1, 291, 9, 1, 11, 240, 1, 0, 25, 12, 2, 205, 6, 0, 255, 3, 0, 58, 2, 7, 0, 36, 0], [14, 38, 17, 6, 7, 11, 6, 0, 11, 0, 0, 39, 35, 37, 1, 42, 0, 71, 30, 4, 0, 0, 0, 0, 0, 4], [0, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [37, 0, 0, 0, 31, 0, 0, 0, 28, 0, 0, 0, 0, 0, 21, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 32, 1, 1, 0, 1, 0, 0, 0, 1, 18, 19, 30, 0, 2, 0, 9, 5, 1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 74, 44, 8, 3, 9, 45, 8, 68, 0, 15, 130, 36, 181, 1, 23, 0, 128, 22, 185, 13, 11, 9, 13, 4, 0], [7, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 6, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 2, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [52, 9, 29, 37, 66, 9, 17, 6, 16, 0, 2, 65, 49, 185, 18, 20, 0, 588, 61, 23, 9, 9, 9, 16, 1, 0], [6, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 1, 0, 0, 6, 0, 0, 1, 0, 0, 24, 0, 0, 0, 0, 0], [4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0], [68, 6, 1, 5, 274, 8, 1, 2, 62, 0, 1, 9, 13, 3, 90, 4, 1, 61, 8, 2, 31, 0, 16, 0, 49, 0], [99, 35, 342, 16, 35, 45, 34, 0, 0, 0, 3, 67, 75, 183, 419, 28, 9, 18, 75, 88, 9, 128, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [18, 0, 0, 0, 102, 0, 0, 0, 5, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0], [25, 0, 0, 0, 8, 0, 0, 0, 3, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [3, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 4, 1, 0, 0, 0, 0, 0], [5, 6, 34, 11, 8, 7, 26, 0, 14, 0, 9, 38, 65, 238, 26, 56, 0, 319, 19, 16, 36, 3, 36, 7, 3, 2], [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [315, 0, 0, 0, 98, 0, 0, 0, 246, 0, 0, 0, 0, 0, 201, 0, 0, 0, 0, 0, 68, 0, 1, 0, 64, 0], [2, 2, 2, 1, 10, 2, 0, 3, 4, 0, 1, 0, 13, 0, 9, 3, 0, 0, 0, 8, 5, 2, 5, 0, 3, 0], [44, 0, 0, 0, 154, 1, 1, 2, 53, 0, 1, 45, 0, 0, 33, 0, 0, 10, 8, 0, 4, 1, 0, 0, 25, 0], [41, 14, 9, 41, 8, 5, 4, 0, 10, 0, 0, 19, 30, 29, 13, 10, 0, 159, 35, 22, 0, 0, 0, 1, 1, 0], [3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [14, 0, 0, 0, 12, 0, 0, 1, 23, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 1, 2, 0, 0, 0, 1, 0, 1, 0, 0, 14, 2, 0, 0, 34, 0, 14, 3, 0, 0, 0, 2, 1, 0, 0], [1, 0, 0, 0, 5, 0, 1, 0, 2, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]], [[0, 4, 7, 21, 0, 1, 5, 1, 4, 0, 5, 51, 2, 26, 0, 1, 0, 48, 9, 37, 0, 2, 4, 0, 3, 0], [8, 18, 0, 1, 20, 0, 0, 2, 18, 2, 0, 23, 5, 0, 2, 1, 0, 10, 15, 8, 7, 2, 0, 0, 1, 0], [10, 0, 14, 0, 23, 0, 0, 31, 29, 0, 55, 16, 0, 0, 7, 0, 0, 9, 1, 47, 5, 0, 0, 0, 2, 0], [17, 1, 0, 24, 67, 0, 18, 0, 39, 0, 0, 4, 0, 0, 8, 0, 0, 1, 10, 0, 2, 0, 2, 0, 7, 1], [6, 9, 0, 1, 5, 5, 4, 1, 0, 1, 0, 21, 1, 33, 1, 1, 0, 19, 22, 15, 2, 0, 0, 0, 3, 6], [1, 0, 0, 0, 0, 58, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0], [19, 1, 0, 0, 21, 0, 34, 80, 3, 0, 0, 4, 2, 2, 6, 0, 0, 1, 1, 0, 11, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 2, 14, 14, 6, 0, 1, 0, 0, 0, 0, 32, 0, 31, 1, 8, 0, 19, 44, 64, 1, 4, 0, 2, 0, 3], [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [1, 0, 0, 1, 12, 0, 0, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [136, 4, 11, 11, 46, 14, 7, 0, 35, 0, 10, 67, 5, 2, 23, 16, 0, 1, 24, 73, 16, 3, 1, 0, 5, 1], [22, 52, 3, 1, 51, 5, 0, 1, 32, 0, 0, 2, 28, 11, 8, 48, 1, 0, 8, 1, 6, 2, 0, 0, 0, 0], [21, 6, 73, 131, 25, 5, 46, 2, 55, 0, 33, 4, 2, 13, 4, 2, 0, 2, 15, 82, 1, 0, 2, 0, 5, 0], [0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 2, 0, 3, 0, 2, 0, 16, 3, 5, 29, 0, 0, 0, 2, 0], [4, 4, 1, 2, 31, 1, 1, 14, 10, 0, 1, 13, 1, 0, 8, 24, 0, 13, 13, 24, 2, 0, 2, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0], [75, 27, 21, 17, 149, 8, 60, 1, 66, 2, 11, 17, 11, 55, 28, 15, 1, 51, 43, 43, 9, 15, 3, 0, 28, 1], [31, 5, 29, 2, 105, 0, 1, 53, 64, 0, 17, 3, 0, 1, 8, 12, 1, 0, 34, 115, 6, 0, 0, 0, 4, 0], [45, 1, 14, 1, 69, 0, 1, 55, 77, 0, 0, 8, 3, 3, 49, 0, 0, 13, 7, 51, 11, 0, 2, 0, 6, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 5, 4, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 12]], [[0, 9, 20, 8, 1, 0, 14, 2, 8, 1, 3, 69, 2, 57, 0, 1, 0, 31, 18, 36, 5, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [6, 2, 5, 4, 4, 3, 6, 4, 5, 0, 1, 47, 4, 120, 3, 1, 0, 271, 46, 24, 0, 0, 1, 5, 10, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [37, 4, 33, 23, 21, 2, 8, 0, 2, 0, 3, 43, 0, 47, 18, 0, 0, 16, 65, 30, 5, 16, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 23, 0, 0, 0, 3, 0, 9, 0, 5, 48, 2, 6, 1, 0, 0, 10, 4, 9, 10, 1, 3, 0, 6, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[1, 4, 7, 8, 0, 3, 12, 3, 18, 0, 8, 53, 5, 20, 0, 4, 0, 100, 27, 55, 1, 9, 1, 4, 71, 1], [6, 0, 0, 0, 7, 0, 0, 0, 1, 0, 0, 0, 0, 0, 10, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0], [3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 0, 3, 0, 0, 1, 0, 0, 0, 3, 0], [30, 5, 1, 9, 33, 0, 2, 1, 19, 0, 0, 51, 0, 11, 0, 2, 0, 36, 21, 7, 0, 2, 0, 0, 2, 0], [1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [18, 0, 0, 0, 47, 0, 0, 0, 52, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 14, 18, 5, 5, 15, 0, 0, 0, 0, 40, 2, 83, 0, 2, 0, 8, 38, 47, 0, 4, 0, 1, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0], [3, 0, 0, 0, 9, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 0], [8, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 6, 1, 1, 2, 3, 0, 0, 0, 0, 0, 0, 2, 0, 1, 10, 4, 1, 0, 2, 0, 3, 0], [0, 1, 0, 0, 3, 1, 0, 0, 0, 0, 3, 10, 17, 8, 54, 1, 0, 121, 1, 1, 3, 2, 1, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [7, 0, 0, 0, 12, 0, 0, 0, 25, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0], [0, 1, 1, 0, 2, 0, 0, 1, 1, 0, 1, 2, 2, 0, 5, 3, 0, 1, 1, 4, 1, 0, 2, 0, 1, 0], [1, 0, 0, 0, 1, 0, 0, 3, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]], [[0, 0, 5, 1, 0, 1, 3, 0, 0, 0, 0, 4, 6, 6, 0, 0, 0, 0, 3, 6, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [3, 0, 0, 0, 11, 0, 0, 3, 7, 0, 0, 7, 0, 0, 3, 0, 0, 5, 0, 0, 7, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 7, 1, 0, 0, 2, 0, 1, 0, 0, 2, 6, 9, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [7, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], [8, 2, 12, 8, 4, 2, 2, 0, 0, 0, 0, 2, 11, 4, 8, 0, 0, 0, 9, 2, 0, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 1, 1, 10, 0, 1, 0, 6, 1, 5, 0, 0, 0, 0, 0, 0], [8, 0, 0, 0, 27, 0, 0, 0, 5, 0, 0, 18, 0, 0, 12, 0, 0, 7, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [6, 1, 0, 0, 22, 0, 0, 1, 7, 0, 0, 0, 0, 0, 7, 0, 0, 31, 0, 0, 9, 0, 0, 0, 1, 0], [4, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[0, 0, 5, 5, 0, 0, 1, 1, 0, 0, 2, 11, 3, 29, 1, 4, 1, 20, 1, 3, 0, 0, 3, 0, 0, 0], [4, 0, 0, 4, 7, 0, 0, 0, 2, 0, 0, 0, 0, 0, 9, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0], [4, 0, 0, 0, 18, 0, 0, 31, 4, 0, 0, 19, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [4, 1, 0, 0, 12, 0, 0, 0, 2, 0, 0, 0, 0, 2, 1, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0, 0], [11, 3, 0, 1, 1, 1, 1, 0, 1, 0, 0, 13, 1, 6, 2, 1, 0, 19, 7, 6, 0, 1, 1, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 1, 3, 1, 8, 0, 0, 3, 0, 0, 1, 0, 0, 0, 2, 0], [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [15, 0, 0, 0, 22, 0, 0, 0, 13, 0, 1, 19, 0, 0, 11, 1, 0, 0, 2, 0, 3, 6, 0, 0, 0, 0], [18, 4, 1, 0, 20, 0, 0, 0, 5, 0, 0, 0, 3, 7, 11, 20, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0], [14, 0, 11, 3, 12, 0, 3, 1, 2, 0, 0, 0, 0, 3, 11, 0, 0, 0, 0, 6, 0, 0, 0, 2, 1, 0], [0, 0, 2, 2, 0, 4, 6, 0, 0, 0, 5, 2, 1, 18, 0, 4, 0, 8, 4, 5, 17, 1, 1, 0, 0, 1], [2, 0, 0, 0, 24, 0, 0, 17, 5, 0, 0, 2, 0, 2, 21, 0, 0, 5, 7, 16, 3, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [15, 0, 0, 2, 6, 1, 0, 0, 21, 0, 0, 0, 0, 2, 29, 0, 0, 2, 0, 1, 4, 0, 0, 0, 1, 0], [3, 1, 3, 0, 12, 0, 0, 1, 38, 0, 0, 1, 2, 0, 4, 3, 0, 0, 6, 39, 2, 0, 0, 0, 0, 0], [2, 0, 0, 0, 16, 0, 0, 16, 10, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0], [0, 0, 3, 0, 0, 0, 3, 1, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [10, 0, 1, 0, 3, 0, 0, 2, 4, 0, 0, 0, 0, 0, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]], [[1, 3, 2, 0, 0, 0, 5, 1, 1, 0, 1, 4, 1, 11, 0, 1, 0, 19, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 1, 2, 1, 1, 0, 0, 0, 1, 0, 1, 7, 0, 12, 0, 0, 0, 13, 3, 3, 1, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 2, 0, 7, 0, 5, 0, 0, 0, 0, 5, 4, 6, 1, 1, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [3, 0, 0, 2, 2, 0, 1, 0, 7, 0, 0, 0, 3, 10, 5, 2, 0, 5, 0, 0, 1, 1, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [7, 0, 0, 0, 1, 0, 0, 0, 7, 0, 0, 17, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 5, 0]]];
        for (s = "function" == typeof get_random ? get_random(0, 125729) : 125729 * (c = Math.random()),
        n = i = 0; n < 26; n++)
            for (r = 0; r < 26; r++)
                for (o = 0; o < 26; o++)
                    s < (i += p[n][r][o]) && (t += u.charAt(n),
                    t += u.charAt(r),
                    t += u.charAt(o),
                    o = r = n = 26);
        for (a = 3; a < e; ) {
            for (n = u.indexOf(t.charAt(a - 2)),
            r = u.indexOf(t.charAt(a - 1)),
            o = i = 0; o < 26; o++)
                i += p[n][r][o];
            if (0 == i)
                break;
            for (s = "function" == typeof get_random ? get_random(0, i) : (c = Math.random()) * i,
            o = i = 0; o < 26; o++)
                s < (i += p[n][r][o]) && (t += u.charAt(o),
                o = 26);
            a++
        }
        for (var d = "", g = 0; g < t.length; g++) {
            var f, m;
            if (t[g] === (void 0 !== t[g + 1] ? t[g + 1] : "")) {
                d = this.pronounceable(e);
                break
            }
            d = t
        }
        return d
    }
}
  , g_punycodecache = []
  , g_punycodecache2 = [];
function isipv6url(e) {
    return !!e.match(/\[.*\]/)
}
var punycode = new function e() {
    this.utf16 = {
        decode: function(e) {
            for (var t = [], n = 0, r = e.length, o, i; n < r; ) {
                if (55296 == (63488 & (o = e.charCodeAt(n++)))) {
                    if (i = e.charCodeAt(n++),
                    55296 != (64512 & o) || 56320 != (64512 & i))
                        throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
                    o = ((1023 & o) << 10) + (1023 & i) + 65536
                }
                t.push(o)
            }
            return t
        },
        encode: function(e) {
            for (var t = [], n = 0, r = e.length, o; n < r; ) {
                if (55296 == (63488 & (o = e[n++])))
                    throw new RangeError("UTF-16(encode): Illegal UTF-16 value");
                65535 < o && (o -= 65536,
                t.push(String.fromCharCode(o >>> 10 & 1023 | 55296)),
                o = 56320 | 1023 & o),
                t.push(String.fromCharCode(o))
            }
            return t.join("")
        }
    };
    var t = 128
      , n = 72
      , r = "-"
      , _ = 36
      , o = 700
      , v = 1
      , y = 26
      , i = 38
      , w = 2147483647;
    function b(e) {
        return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : _
    }
    function h(e, t) {
        return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
    }
    function A(e, t, n) {
        var r;
        for (e = n ? Math.floor(e / o) : e >> 1,
        e += Math.floor(e / t),
        r = 0; (_ - v) * y >> 1 < e; r += _)
            e = Math.floor(e / (_ - v));
        return Math.floor(r + (_ - v + 1) * e / (e + i))
    }
    function x(e, t) {
        return (e -= (e - 97 < 26) << 5) + ((!t && e - 65 < 26) << 5)
    }
    this.decode = function(e, t) {
        var n = [], r = [], o = e.length, i, a, s, l, c, u, p, d, g, f, m, h, x;
        for (i = 128,
        s = 0,
        l = 72,
        (c = e.lastIndexOf("-")) < 0 && (c = 0),
        u = 0; u < c; ++u) {
            if (t && (r[n.length] = e.charCodeAt(u) - 65 < 26),
            128 <= e.charCodeAt(u))
                throw new RangeError("Illegal input >= 0x80");
            n.push(e.charCodeAt(u))
        }
        for (p = 0 < c ? c + 1 : 0; p < o; ) {
            for (d = s,
            g = 1,
            f = _; ; f += _) {
                if (o <= p)
                    throw RangeError("punycode_bad_input(1)");
                if (m = b(e.charCodeAt(p++)),
                _ <= m)
                    throw RangeError("punycode_bad_input(2)");
                if (m > Math.floor((w - s) / g))
                    throw RangeError("punycode_overflow(1)");
                if (s += m * g,
                m < (h = f <= l ? v : l + y <= f ? y : f - l))
                    break;
                if (g > Math.floor(w / (_ - h)))
                    throw RangeError("punycode_overflow(2)");
                g *= _ - h
            }
            if (l = A(s - d, a = n.length + 1, 0 === d),
            Math.floor(s / a) > w - i)
                throw RangeError("punycode_overflow(3)");
            i += Math.floor(s / a),
            s %= a,
            t && r.splice(s, 0, e.charCodeAt(p - 1) - 65 < 26),
            n.splice(s, 0, i),
            s++
        }
        if (t)
            for (s = 0,
            x = n.length; s < x; s++)
                r[s] && (n[s] = String.fromCharCode(n[s]).toUpperCase().charCodeAt(0));
        return this.utf16.encode(n)
    }
    ,
    this.encode = function(e, t) {
        var n, r, o, i, a, s, l, c, u, p, d, g;
        t && (g = this.utf16.decode(e));
        var f = (e = this.utf16.decode(e.toLowerCase())).length;
        if (t)
            for (s = 0; s < f; s++)
                g[s] = e[s] != g[s];
        var m = [];
        for (n = 128,
        a = 72,
        s = r = 0; s < f; ++s)
            e[s] < 128 && m.push(String.fromCharCode(g ? x(e[s], g[s]) : e[s]));
        for (o = i = m.length,
        0 < i && m.push("-"); o < f; ) {
            for (l = w,
            s = 0; s < f; ++s)
                n <= (d = e[s]) && d < l && (l = d);
            if (l - n > Math.floor((w - r) / (o + 1)))
                throw RangeError("punycode_overflow (1)");
            for (r += (l - n) * (o + 1),
            n = l,
            s = 0; s < f; ++s) {
                if ((d = e[s]) < n && ++r > w)
                    return Error("punycode_overflow(2)");
                if (d == n) {
                    for (c = r,
                    u = _; !(c < (p = u <= a ? v : a + y <= u ? y : u - a)); u += _)
                        m.push(String.fromCharCode(h(p + (c - p) % (_ - p), 0))),
                        c = Math.floor((c - p) / (_ - p));
                    m.push(String.fromCharCode(h(c, t && g[s] ? 1 : 0))),
                    a = A(r, o + 1, o == i),
                    r = 0,
                    ++o
                }
            }
            ++r,
            ++n
        }
        return m.join("")
    }
    ,
    this.get_host = function(e, t) {
        var n = e;
        if (isipv6url(e) && t) {
            var r = e.match(/\[.*\](:\d+)/);
            if (r)
                return r[0]
        }
        var o = n.indexOf("://");
        return -1 != o && (n = n.substring(o + 3)),
        -1 != (o = n.indexOf("/")) && (n = n.substring(0, o)),
        -1 != (o = n.indexOf("?")) && (n = n.substring(0, o)),
        -1 != (o = n.indexOf("@")) && (n = n.substring(o + 1)),
        -1 != (o = n.indexOf(":")) && (n = n.substring(0, o)),
        -1 != n.indexOf(".", n.length - 1) && (n = n.substring(0, n.length - 1)),
        n
    }
    ,
    this.URLToASCII = function(e) {
        if ("string" != typeof e)
            return e;
        if (void 0 === g_punycodecache && (g_punycodecache = []),
        void 0 !== g_punycodecache[e])
            return g_punycodecache[e];
        var t = !1;
        isipv6url(e) && (t = !0);
        var n = this.get_host(e, t)
          , r = this.ToASCII(n, t);
        if (r == n)
            return g_punycodecache[e] = e;
        var o = e.replace(n, r);
        return g_punycodecache[e] = o
    }
    ,
    this.ToASCII = function(e, t) {
        var n = e.split(".");
        t && (n = [e]);
        var r = []
          , o = /[^A-Za-z0-9-]/;
        t && (o = /[^\[\]A-Za-z0-9:.-]/);
        for (var i = 0; i < n.length; ++i) {
            var a = n[i];
            r.push(a.match(o) ? "xn--" + punycode.encode(a) : a)
        }
        return r.join(".")
    }
    ,
    this.URLToUnicode = function(e) {
        if ("string" != typeof e)
            return e;
        if (void 0 === g_punycodecache2 && (g_punycodecache2 = []),
        void 0 !== g_punycodecache2[e])
            return g_punycodecache2[e];
        var t = this.get_host(e)
          , n = this.ToUnicode(t);
        if (n == t)
            return g_punycodecache2[e] = e;
        var r = e.replace(t, n);
        return g_punycodecache2[e] = r
    }
    ,
    this.ToUnicode = function(e) {
        for (var t = e.split("."), n = [], r = 0; r < t.length; ++r) {
            var o = t[r];
            n.push(o.match(/^xn--/) ? punycode.decode(o.slice(4)) : o)
        }
        return n.join(".")
    }
}
  , g_lower = {
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    e: 1,
    f: 1,
    g: 1,
    h: 1,
    i: 1,
    j: 1,
    k: 1,
    l: 1,
    m: 1,
    n: 1,
    o: 1,
    p: 1,
    q: 1,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 1,
    w: 1,
    x: 1,
    y: 1,
    z: 1
}
  , g_upper = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 1,
    F: 1,
    G: 1,
    H: 1,
    I: 1,
    J: 1,
    K: 1,
    L: 1,
    M: 1,
    N: 1,
    O: 1,
    P: 1,
    Q: 1,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 1,
    W: 1,
    X: 1,
    Y: 1,
    Z: 1
}
  , g_digit = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    0: 1
}
  , WEAKPASSWORDSCORE = 50
  , sfcounts = []
  , AIDtoSFNames = []
  , challengeRunning = !1
  , sharedstrengthscore = []
  , sharedblanksites = []
  , g_allnumdupsites = 0
  , g_allnumduppasswords = 0
  , g_numdictionarypart = 0
  , g_challengeregexcache = [];
function get_trie_from_dict(e) {
    var t = new Trie;
    if (!e)
        return t;
    var n = [];
    for (var r in e)
        e.hasOwnProperty(r) && n.push(r);
    return t.insertlist(n),
    t
}
function do_dictionary_lookup(e, t, n, r) {
    for (var o = [t, n, r], i = 0; i < o.length; i++) {
        var a = o[i];
        if (a) {
            for (var s = [], l = 0; l < a.length; l++) {
                var c = e.search(a.substring(l));
                c && 3 <= c.length && s.push(c)
            }
            if (s.length) {
                s.sort(function(e, t) {
                    return t.length - e.length
                });
                for (var u = 0; u < s.length; u++)
                    a = a.replace(s[u], s[u].charAt(0));
                return a
            }
        }
    }
    return t
}
function challengegetstrength(e, t, n) {
    var r, o;
    return challengegetstrength_with_dict(get_trie_from_dict("undefined" == typeof g_aDictionary ? {} : g_aDictionary), e, t, n)
}
function challengegetstrength_with_dict(e, t, n, r) {
    var o = 0, i, a = t;
    if (t = t || "",
    "password" == (n = n || ""))
        return 0;
    var s = n.toLowerCase()
      , l = t.toLowerCase();
    if (n == t)
        return 0;
    if (s == l)
        return 5 < n.length ? 5 : n.length;
    if ("" != l && "" != s) {
        if (-1 != t.indexOf(n))
            return 5 < n.length ? 5 : n.length;
        if (-1 != l.indexOf(s))
            return 10 < n.length ? 10 : n.length;
        if (-1 != s.indexOf(l)) {
            t = (t = t.replace(/\*/g, "\\*")).replace(/\+/g, "\\+");
            var c = 0;
            try {
                void 0 !== g_challengeregexcache[t] ? i = g_challengeregexcache[t] : (i = new RegExp(t,"gi"),
                g_challengeregexcache[t] = i)
            } catch (e) {
                c = 1
            }
            if (c)
                try {
                    t = (t = (t = t.replace(/\?/g, "\\?")).replace(/\)/g, "\\)")).replace(/\(/g, "\\("),
                    i = new RegExp(t,"gi")
                } catch (e) {
                    r && alert(gs("An error occurred.\nPlease send a screenshot of this error to support@lastpass.com") + "\n\nError=3 uorig=" + a + " u=" + t),
                    i = new RegExp("","gi")
                }
            pnew = n.replace(i, ""),
            pnew != n && (n = pnew)
        }
    }
    var u = null
      , p = null;
    n.match(/[0135\$\@]/) && (0 < (u = (u = (u = (u = (u = n.replace(/5/g, "s")).replace(/\$/g, "s")).replace(/3/g, "e")).replace(/0/g, "o")).replace(/\@/g, "a")).indexOf("1") && (p = u.replace(/1/g, "i")),
    u = u.replace(/1/g, "l")),
    "undefined" != typeof g_aDictionary && null != g_aDictionary && (n = do_dictionary_lookup(e, n, u, p));
    var d = n.length, g = 0, f = 0, m = 0, h = 0, x = 0, _ = [], v, y;
    for (v = 0; v < d; ++v)
        void 0 === _[y = n.charAt(v)] && (_[y] = 1,
        ++g),
        g_lower[y] ? ++f : g_upper[y] ? ++m : g_digit[y] ? ++h : ++x;
    return 0 < f && 0 < m && 0 < h && 0 < x ? o = 6 <= g && 8 <= d ? 95 + g : 4 < g && 6 <= d ? 70 + g : 2 < g && 4 <= d ? 50 + g : g : 0 < f && 0 < m && 0 < h ? o = 6 <= g && 8 <= d ? 85 + g : 4 < g && 6 <= d ? 60 + g : 2 < g && 4 <= d ? 40 + g : g : 0 < f && 0 < m && 0 < x || 0 < f && 0 < h && 0 < x || 0 < m && 0 < h && 0 < x ? o = 6 <= g && 8 <= d ? 90 + g : 4 < g && 6 <= d ? 65 + g : 2 < g && 4 <= d ? 45 + g : g : 0 < f && 0 < m ? o = 6 <= g && 8 <= d ? 85 + g : 4 < g && 6 <= d ? 60 + g : 2 < g && 4 <= d ? 40 + g : g : 0 < f && 0 < h || 0 < m && 0 < h ? o = 6 <= g && 8 <= d ? 75 + g : 4 < g && 6 <= d ? 50 + g : 2 < g && 4 <= d ? 30 + g : g : 0 < f && 0 < x || 0 < m && 0 < x || 0 < h && 0 < x ? o = 6 <= g && 8 <= d ? 75 + g : 4 < g && 6 <= d ? 50 + g : 2 < g && 4 <= d ? 30 + g : g : 0 < f || 0 < m || 0 < h ? o = 6 <= g && 8 <= d ? 65 + g : 4 < g && 6 <= d ? 40 + g : 2 < g && 4 <= d ? 20 + g : g : 0 < x && (o = 6 <= g && 8 <= d ? 85 + g : 4 < g && 6 <= d ? 70 + g : 2 < g && 4 <= d ? 50 + g : g),
    o < 0 ? o = 0 : 100 < o && (o = 100),
    "" !== n && o < 10 && (o = 5 < d ? 5 : d),
    o
}
var g_usernames = [], g_mpw_duplicates, g_MAXNUMCOMPUTESCORE = 1;
function challengecomputescore(e, t) {
    if (0 === g_totalscore) {
        var n = void 0 === t ? 0 : t, r = 0, o, i, a, s, l, c, u, i, a, s, l, c, u;
        for (void 0 !== g_aSites[n] && void 0 !== g_aSites[n].sfname && (o = g_aSites[n].sfname),
        void 0 === o && (o = "nonshared"),
        void 0 === sfcounts && (sfcounts = []),
        void 0 === sharedstrengthscore && (sharedstrengthscore = []),
        void 0 === sharedblanksites && (sharedblanksites = []),
        "undefined" == typeof sharedweak && (sharedweak = []),
        "undefined" == typeof sharedavgpasswordlength && (sharedavgpasswordlength = []),
        "undefined" == typeof SharedPasswords && (SharedPasswords = []),
        "undefined" == typeof shareddictionary && (shareddictionary = []),
        "undefined" == typeof sharedcountscore && (sharedcountscore = []),
        "undefined" == typeof NonSharedAccounts && (NonSharedAccounts = []),
        "undefined" == typeof g_SFNames && (g_SFNames = []),
        "undefined" == typeof AllSFNames && (AllSFNames = []),
        void 0 === sfcounts[o] && (sfcounts[o] = 0),
        sfcounts[o]++,
        void 0 === t && (g_challengeregexcache = []); n < g_numsites; ++n) {
            if ("function" == typeof reportprogress && reportprogress(n, g_numsites),
            o = "nonshared",
            void 0 !== g_aSites[n].sfname)
                var o = g_aSites[n].sfname;
            var p = g_aSites[n].usernamedec
              , d = g_aSites[n].passworddec;
            d = d || "";
            var g = g_aSites[n].passworddecfix
              , f = g_aSites[n].domain2lvl
              , m = void 0 !== g_aSites[n].realdomain2lvl ? g_aSites[n].realdomain2lvl : f
              , h = void 0 !== g_aSites[n].vulnerable;
            "undefined" == typeof g_numblanksites && (g_numblanksites = 0),
            "undefined" == typeof g_numvulnerablesites && (g_numvulnerablesites = 0),
            void 0 === sharedblanksites[o] && (sharedblanksites[o] = 0),
            void 0 === sharedstrengthscore[o] && (sharedstrengthscore[o] = 0);
            var x = "function" == typeof get_sitepwlen ? get_sitepwlen(m) : 1;
            if (h ? (lpdbgchallenge("challengecomputescore : Found vulnerable site domain2lvl=" + f + " sfname=" + o),
            "nonshared" == o && ++g_numvulnerablesites,
            g_aSites[n].challenge_score = 0) : 0 < d.length && d.length < x ? g_aSites[n].challenge_score = 0 : g_aSites[n].challenge_score = challengegetstrength_with_dict(e, p, d, !1),
            "" != g) {
                if ("nonshared" == o && (g_avgpasswordlength += d.length),
                void 0 === sharedavgpasswordlength[o] && (sharedavgpasswordlength[o] = 0),
                sharedavgpasswordlength[o] += d.length,
                "undefined" != typeof g_aDictionary && void 0 !== g_aDictionary[g] && ("nonshared" == o && g_numdictionary++,
                void 0 === shareddictionary[o] && (shareddictionary[o] = 0),
                shareddictionary[o]++),
                void 0 === SharedPasswords[o] && (SharedPasswords[o] = []),
                "nonshared" == o) {
                    void 0 === g_aPasswords[g] && (g_aPasswords[g] = []),
                    (void 0 === g_aPasswords[g][f] || "function" == typeof g_aPasswords[g][f] && void 0 === g_aPasswords[g][f].push) && (g_aPasswords[g][f] = []);
                    try {
                        g_aPasswords[g][f].push(n)
                    } catch (e) {
                        return void (g = d = p = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                    }
                }
                "undefined" == typeof g_allPasswords && (g_allPasswords = []),
                void 0 === g_allPasswords[g] && (g_allPasswords[g] = []),
                (void 0 === g_allPasswords[g][f] || "function" == typeof g_allPasswords[g][f] && void 0 === g_allPasswords[g][f].push) && (g_allPasswords[g][f] = []);
                try {
                    g_allPasswords[g][f].push(n)
                } catch (e) {
                    return void (g = d = p = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                }
                if ("nonshared" != o) {
                    void 0 === SharedPasswords[o][g] && (SharedPasswords[o][g] = []),
                    (void 0 === SharedPasswords[o][g][f] || "function" == typeof SharedPasswords[o][g][f] && void 0 === SharedPasswords[o][g][f].push) && (SharedPasswords[o][g][f] = []);
                    try {
                        SharedPasswords[o][g][f].push(n)
                    } catch (e) {
                        return void (g = d = p = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                    }
                }
                if (++r > g_MAXNUMCOMPUTESCORE) {
                    var _ = null;
                    try {
                        "function" == typeof setTimeout ? _ = setTimeout : "undefined" != typeof LP && void 0 !== LP.mostRecent && void 0 !== LP.mostRecent().setTimeout && (_ = LP.mostRecent().setTimeout)
                    } catch (e) {}
                    return null != _ ? _(function() {
                        challengecomputescore(e, n + 1)
                    }, 0) : challengecomputescore(e, n + 1),
                    void (g = d = p = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
                }
                g = d = p = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            } else
                "nonshared" == o && g_numblanksites++,
                sharedblanksites[o]++,
                "undefined" != typeof g_blanksites && g_blanksites.push(n),
                g = d = p = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }
        for (u in g_challengeregexcache = [],
        g_avgpasswordlength = g_numsites == g_numblanksites ? 0 : Math.round(10 * g_avgpasswordlength / (g_numsites - g_numblanksites)) / 10,
        g_aPasswords)
            if (c = 0,
            g_aPasswords.hasOwnProperty(u)) {
                for (var v in a = g_aPasswords[u])
                    a.hasOwnProperty(v) && c++;
                if (1 != c && "" != u) {
                    for (var v in ++g_numduppasswords,
                    l = 0,
                    a)
                        a.hasOwnProperty(v) && (l += g_aPasswords[u][v].length);
                    for (var v in g_numdupsites += l,
                    a)
                        if (a.hasOwnProperty(v))
                            for (i in s = g_aPasswords[u][v])
                                s.hasOwnProperty(i) && (n = g_aPasswords[u][v][i],
                                g_aSites[n].challenge_numduplicates = l,
                                g_aSites[n].challenge_duplicatescore = g_aSites[n].challenge_score / c)
                } else {
                    if ("undefined" != typeof g_reuse)
                        for (var y in g_aPasswords[u])
                            for (var w in g_aPasswords[u][y])
                                delete g_reuse[g_aPasswords[u][y][w]];
                    delete g_aPasswords[u]
                }
            }
        for (u in u = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "undefined" == typeof g_allPasswords && (g_allPasswords = {},
        g_allnumdupsites = g_numsites),
        g_allPasswords)
            if (g_allPasswords.hasOwnProperty(u)) {
                for (var v in c = 0,
                a = g_allPasswords[u])
                    a.hasOwnProperty(v) && ++c;
                if (1 != c && "" != u) {
                    for (var v in void 0 === g_allnumduppasswords && (g_allnumduppasswords = 0),
                    ++g_allnumduppasswords,
                    void (l = 0) === g_allnumdupsites && (g_allnumdupsites = 0),
                    a)
                        a.hasOwnProperty(v) && (l += g_allPasswords[u][v].length);
                    for (var v in g_allnumdupsites += l,
                    a)
                        if (a.hasOwnProperty(v))
                            for (var i in s = g_allPasswords[u][v])
                                s.hasOwnProperty(i) && (n = g_allPasswords[u][v][i],
                                void 0 !== g_aSites[n] && (g_aSites[n].challenge_numduplicates = l,
                                g_aSites[n].challenge_duplicatescore = g_aSites[n].challenge_score / c))
                } else
                    delete g_allPasswords[u]
            }
        for (u = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        n = 0; n < g_aSites.length; ++n)
            void 0 !== g_aSites[n].sfname && (o = g_aSites[n].sfname),
            void 0 === g_aSites[n].sfname && (o = "nonshared"),
            void 0 === sharedweak[o] && (sharedweak[o] = 0),
            g_aSites[n].challenge_scorefinal = g_aSites[n].challenge_score,
            !g_aSites[n].usernamedec || -1 === g_aSites[n].usernamedec.indexOf("@") || g_aSites[n].usernamedec in g_usernames || (g_usernames[g_aSites[n].usernamedec] = [],
            g_usernames[g_aSites[n].usernamedec].hash = lp_sha2lib.sha256(g_aSites[n].usernamedec),
            g_usernames[g_aSites[n].usernamedec].link = g_aSites[n].link),
            void 0 === g_aSites[n].challenge_dictionary || void 0 === g_aSites[n].challenge_duplicatescore ? void 0 === g_aSites[n].challenge_dictionary ? void 0 === g_aSites[n].challenge_duplicatescore ? (g_aSites[n].challenge_score < WEAKPASSWORDSCORE && "" != g_aSites[n].passworddecfix && ("nonshared" == o && ++g_numweak,
            "nonshared" != o && ++sharedweak[o]),
            "nonshared" == o && (g_strengthscore += g_aSites[n].challenge_score,
            g_avgstrength = g_numsites == g_numblanksites ? 0 : Math.round(10 * g_strengthscore / (g_numsites - g_numblanksites)) / 10,
            0 != NonSharedAccounts.length && (g_avgstrength = NonSharedAccounts.length == g_numblanksites ? 0 : Math.round(10 * g_strengthscore / (NonSharedAccounts.length - g_numblanksites)) / 10)),
            "nonshared" != o && (sharedstrengthscore[o] += g_aSites[n].challenge_score,
            sharedavgstrength[o] = sfcounts[o] == sharedblanksites[o] ? 0 : Math.round(10 * sharedstrengthscore[o] / (SharedAccounts[o].length - sharedblanksites[o])) / 10),
            void 0 === sharedcountscore[o] && (sharedcountscore[o] = 0),
            70 <= g_aSites[n].challenge_score && void 0 === g_aSites[n].sfname && (g_countscore += 2),
            70 <= g_aSites[n].challenge_score && void 0 !== g_aSites[n].sfname && (sharedcountscore[o] += 2)) : (g_aSites[n].challenge_scorefinal = g_aSites[n].challenge_duplicatescore,
            void 0 === g_aSites[n].sfname && (g_strengthscore += g_aSites[n].challenge_duplicatescore),
            void 0 !== g_aSites[n].sfname && (sharedstrengthscore[o] += g_aSites[n].challenge_duplicatescore)) : (g_aSites[n].challenge_scorefinal = .5 * g_aSites[n].challenge_scorefinal,
            "nonshared" == o && ++g_numweak,
            "nonshared" != o && ++sharedweak[o]) : (g_aSites[n].challenge_scorefinal = .5 * g_aSites[n].challenge_duplicatescore,
            "nonshared" == o && ++g_numweak,
            "nonshared" != o && ++sharedweak[o]);
        100 < g_countscore && (g_countscore = 100),
        100 < sharedcountscore[o] && (sharedcountscore[o] = 100),
        "undefined" != typeof NonSharedAccounts && 0 != NonSharedAccounts.length && (g_numsites = NonSharedAccounts.length),
        0 < g_numsites - g_numblanksites && (g_totalscore = Math.round(10 * (g_strengthscore / (g_numsites - g_numblanksites) * .8 + g_countscore / 10)) / 10);
        for (var n = 0; n < AllSFNames.length; n++)
            o = AllSFNames[n],
            void 0 === SharedAccounts[o] && (SharedAccounts[o] = []),
            void 0 === sharedblanksites[o] && (sharedblanksites[o] = 0),
            0 < SharedAccounts[o].length - sharedblanksites[o] && (sharedtotalscore[o] = Math.round(10 * (sharedstrengthscore[o] / (SharedAccounts[o].length - sharedblanksites[o]) * .8 + sharedcountscore[o] / 10)) / 10);
        100 < g_totalscore && (g_totalscore = 100),
        g_runtimems = (new Date).getTime() - g_runtimems;
        var b = Math.round(g_runtimems / 1e3);
        "undefined" != typeof reduxApp && "function" == typeof reduxApp.saveChallengeResults && reduxApp.saveChallengeResults(g_totalscore, g_aSites);
        var A = "undefined" == typeof g_isonsite;
        A || "function" != typeof computescorecallback || computescorecallback(b),
        A && "function" == typeof computescorecallback_extensions && computescorecallback_extensions(b)
    }
}
function getscorecolor(e, t) {
    var n = "";
    return n = void 0 === t ? 80 < e ? "#008000" : 60 < e ? "#AAD400" : 50 < e ? "#FFCC00" : 30 < e ? "#FF7F2A" : "#ff0000" : 80 < e ? "#44AA00" : 60 < e ? "#AAD400" : 50 < e ? "#FFFF00" : 30 < e ? "#FF7F2A" : "#ff2020"
}
function getscoretxt(e) {
    var t = Math.round(e);
    return isNaN(t) || (e = t),
    e += "%"
}
function getWeakAndDuplicateIds(e, i, a) {
    var t = function(e) {
        if (e) {
            var t = e.split("\n");
            if (4 == t.length) {
                var n = t[2];
                if (lpdec(n) == i) {
                    var r, o = lpdec(t[3]).split("\n");
                    return a ? void a(o) : o
                }
            }
        }
        if (!a)
            return ["", ""];
        a(["", ""])
    };
    if (!a)
        return t(ReadFileGeneric(e + ".sch"));
    ReadFileGeneric(e + ".sch", null, t)
}
function isWeakPassword(e, t) {
    var n = "," + e + ","
      , r = n.indexOf("," + t + ":");
    if (-1 == r)
        return !1;
    var o = n.indexOf(":", r + 1), i = n.indexOf(",", r + 1), a;
    return n.substring(o + 1, i)
}
function isBreachedSite(e) {
    return void 0 !== e.breached && 0 != e.breached
}
function isDuplicateSite(e, t) {
    var n, r;
    return -1 != ("," + e + ",").indexOf("," + t + ",")
}
function getDictionary(o, i, a) {
    var e = function(e) {
        if (null == e || "" == e || 0 == e)
            return getDictionaryRemote(o, i),
            a ? void a(null) : null;
        for (var t = e.split("\n"), n = {}, r = 0; r < t.length - 1; r++)
            n[t[r]] = 1;
        if (!a)
            return n;
        a(n)
    };
    if (!a)
        return e(ReadFileGeneric("words.dic"));
    ReadFileGeneric("words.dic", null, e)
}
!function() {
    var a = {}
      , s = function(e, t) {
        var n = e + "-" + t
          , r = a[n];
        return void 0 === r && (r = a[n] = []),
        r
    }
      , i = function(e, t, n) {
        for (var r = s(e, t), o = 0, i = r.length; o < i; ++o)
            r[o](n);
        a = {}
    };
    writeCachedScore = function(e, t, n, r, o) {
        void 0 === r && (r = ""),
        void 0 === o && (o = ""),
        i(e, t, n),
        WriteFileGeneric(e + ".sch", t + "\n" + n + "\n" + r + "\n" + o)
    }
    ;
    var l = function(e, t) {
        var n = null;
        if (e) {
            var r = e.split("\n");
            t == r[0] && (n = "NaN" != r[1] ? r[1] : null)
        }
        return n
    }
      , c = function(e, t, n, r, o) {
        null === e && o ? s(t, n).push(r) : r(e)
    };
    getCachedScore = function(t, n, r, o) {
        if (!r)
            return l(ReadFileGeneric(t + ".sch"), n);
        ReadFileGeneric(t + ".sch", null, function(e) {
            c(l(e, n), t, n, r, o)
        })
    }
}();
var g_getdiclastcalledts = 0;
function getDictionaryRemote(e, t) {
    var n = (new Date).getTime();
    if (!(n - g_getdiclastcalledts < 36e5)) {
        g_getdiclastcalledts = n;
        var r = "misc_challenge.php?getdic=1&lang=" + encodeURIComponent(e)
          , o = function(e) {
            WriteFileGeneric("words.dic", e),
            t && t()
        };
        "undefined" != typeof LP && "function" == typeof LP.lpMakeRequest ? LP.lpMakeRequest(LP.lp_base + r, "", function(e, t) {
            4 == e.readyState && 200 == e.status && o(e.responseText)
        }) : "undefined" != typeof $ && $.ajax && $.get(r, o)
    }
}
function calculateMasterStrength(n, r) {
    getDictionary(getLanguage(), function() {
        calculateMasterStrength(n, r)
    }, function(e) {
        if (e) {
            var t = get_trie_from_dict(g_aDictionary = e);
            lpmpstrength = challengegetstrength_with_dict(t, n, r)
        }
    })
}
function lpdbgchallenge(e) {
    void 0 !== ischrome && ischrome || void 0 !== g_issafari && g_issafari ? lplog("challenge:" + e) : "undefined" != typeof LP && void 0 !== LP.lpMakeRequest && lpdbg("challenge", e)
}
function runChallenge(t) {
    var e = "string" == typeof g_username_hash ? g_username_hash : void 0 !== lpusername_hash ? lpusername_hash : null
      , n = "undefined" != typeof g_local_accts_version ? g_local_accts_version : void 0 !== lp_local_accts_version ? lp_local_accts_version : -1;
    null != e ? getCachedScore(e, n, function(e) {
        null !== e && "undefined" != typeof reduxApp && "function" == typeof reduxApp.getChallengeResults && reduxApp.getChallengeResults(),
        runChallenge2(t, e)
    }) : lpdbgchallenge("returning cuz username_hash==null")
}
function runChallenge2(t, n) {
    null == n || t ? 1 != challengeRunning ? (lpdbgchallenge("setting challengeRunning=1"),
    challengeRunning = !0,
    getDictionary(getLanguage(), null, function(e) {
        lpdbgchallenge("getDictionary callback"),
        g_aDictionary = e,
        runChallenge3(t, n)
    })) : lpdbgchallenge("returning cuz already running") : lpdbgchallenge("returning cuz cached")
}
function runChallenge3(e, t) {
    if (lpdbgchallenge("runChallenge3 : alwaysrun=" + e),
    null == g_aDictionary)
        return lpdbgchallenge("runChallenge3 : returning cuz dictionary is being fetched"),
        void (challengeRunning = !1);
    lpdbgchallenge("runChallenge3 : setup"),
    g_SFNames = [],
    SharedAccounts = [],
    AIDtoSFNames = [],
    NonSharedAccounts = [],
    g_aSites = [],
    g_myaccounts = [],
    g_runtimems = (new Date).getTime(),
    g_shared_accounts = 0,
    sfcounts = [],
    folderscores = [],
    shareddictionary = [],
    sharedblanksites = [],
    sharedavgpasswordlength = [],
    SharedPasswords = [],
    sharedweak = [],
    sharedstrengthscore = [],
    sharedavgstrength = [],
    sharedcountscore = [],
    sharedtotalscore = [],
    SFNameToID = [],
    AllSFIDs = [],
    AllSFNames = [];
    var n = "undefined" != typeof g_sites ? g_sites : lpaccts
      , r = "undefined" != typeof g_shares ? g_shares : lpshares
      , o = "undefined" != typeof g_equivalentdomains ? g_equivalentdomains : lpequivdomains;
    for (var i in n)
        if (n.hasOwnProperty(i))
            if ("http://group" != n[i].url) {
                if ("http://sn" != n[i].url) {
                    var a = ""
                      , s = issharedfolder(r, n[i].group)
                      , l = null != n[i].sharedfromaid && "" != n[i].sharedfromaid && "0" != n[i].sharedfromaid
                      , c = "0";
                    if (s || !l) {
                        s && (getsharedata = issharedfolder(r, n[i].group),
                        a = getsharedata.decsharename,
                        c = getsharedata.associative,
                        void 0 === SharedAccounts[a] && (g_SFNames[g_SFNames.length] = a,
                        SharedAccounts[a] = [],
                        SFNameToID[a] = n[i].sharefolderid),
                        SharedAccounts[a][SharedAccounts[a].length] = i,
                        AIDtoSFNames[i] = a,
                        g_shared_accounts++),
                        s || (NonSharedAccounts[NonSharedAccounts.length] = i);
                        var u = {};
                        if (u.id = i,
                        u.usernamedec = getusernamefromacct(n[i]),
                        u.passworddec = getpasswordfromacct(n[i]),
                        u.passworddecfix = fix_username(u.passworddec),
                        u.domain2lvl = u.realdomain2lvl = lp_gettld_url(n[i].url),
                        u.genpw = void 0 !== n[i].genpw && 1 == n[i].genpw ? 1 : 0,
                        u.link = c,
                        void 0 !== n[i].vulnerable && "" != n[i].vulnerable && (lpdbgchallenge("challengecleanupgenpw: site i=" + i + " is vulnerable"),
                        u.vulnerable = JSON.parse(n[i].vulnerable)),
                        s && (u.sfname = a),
                        void 0 !== o[u.domain2lvl]) {
                            var p = o[u.domain2lvl];
                            void 0 !== o[p] && (u.domain2lvl = o[p][0])
                        }
                        void 0 === (g_aSites[g_aSites.length] = u).sfname && (g_myaccounts[g_myaccounts.length] = u.id)
                    }
                }
            } else
                n[i].aid == n[i].sharefolderid && (AllSFIDs[AllSFIDs.length] = i,
                AllSFNames[AllSFNames.length] = n[i].group,
                SFNameToID[n[i].group] = i);
    g_numsites = g_aSites.length,
    g_numSharedFolders = g_SFNames.length,
    g_ind_accounts = NonSharedAccounts.length,
    g_avgpasswordlength = g_numdictionary = g_numblanksites = g_numvulnerablesites = g_numduppasswords = g_allnumduppasswords = g_numdupsites = g_allnumdupsites = g_numweak = g_strengthscore = g_avgstrength = g_countscore = g_totalscore = g_runtimems = g_numdictionarypart = 0,
    g_aPasswords = {},
    g_allPasswords = {},
    sharedpasswords = [],
    g_unshared_usernames = [],
    lpdbgchallenge("runChallenge3 : g_numsites=" + g_numsites + " g_numSharedFolders=" + g_numSharedFolders),
    challengecleanupgenpw()
}
function computescorecallback_extensions() {
    "WAITING" == g_mpw_duplicates && setTimeout(function() {
        computescorecallback()
    }, 0);
    var e = "string" == typeof g_username ? g_username : void 0 !== lpusername ? lpusername : null
      , t = "string" == typeof g_username_hash ? g_username_hash : void 0 !== lpusername_hash ? lpusername_hash : null
      , n = "undefined" != typeof g_local_accts_version ? g_local_accts_version : void 0 !== lp_local_accts_version ? lp_local_accts_version : -1
      , r = "";
    g_totalscore += g_multifactorscore,
    lpdbgchallenge("Found numvulnerablesites=" + g_numvulnerablesites);
    var o = {
        totalscore: g_totalscore,
        version: n,
        numblanksites: g_numblanksites,
        numvulnerablesites: g_numvulnerablesites,
        numduppasswords: g_numduppasswords,
        numallduppasswords: g_allnumduppasswords,
        numdupsites: g_numdupsites,
        numalldupsites: g_allnumdupsites,
        numweak: g_numweak,
        avgstrength: g_avgstrength,
        multifactorscore: g_multifactorscore,
        countscore: g_countscore
    }, i = 0, a = "", s;
    for (s in g_aPasswords)
        if (g_aPasswords.hasOwnProperty(s)) {
            var l = "";
            for (var c in g_aPasswords[s])
                if (g_aPasswords[s].hasOwnProperty(c)) {
                    var u = g_aPasswords[s][c];
                    for (var p in u)
                        u.hasOwnProperty(p) && (l += g_aSites[u[p]].id + ",",
                        a += g_aSites[u[p]].id + ",")
                }
            i++
        }
    s = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    var i = 0, a = "", s;
    for (s in g_allPasswords)
        if (g_allPasswords.hasOwnProperty(s)) {
            var l = "";
            for (var c in g_allPasswords[s])
                if (g_allPasswords[s].hasOwnProperty(c)) {
                    var u = g_allPasswords[s][c];
                    for (var p in u)
                        if (u.hasOwnProperty(p)) {
                            var d = SFNameToID[AIDtoSFNames[g_aSites[u[p]].id]];
                            void 0 === d && (d = "NotShared"),
                            l += d + ":" + g_aSites[u[p]].id + ",",
                            a += g_aSites[u[p]].id + ","
                        }
                }
            o["dupsites_global_" + i] = l,
            i++
        }
    s = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    for (var g = "", f = [], m = [], h = 0; h < g_aSites.length; h++)
        void 0 !== g_aSites[h].challenge_scorefinal && (void 0 === g_aSites[h].sfname || "nonshared" == g_aSites[h].sfname) && parseInt(g_aSites[h].challenge_scorefinal) < WEAKPASSWORDSCORE && (g += g_aSites[h].id + ":" + g_aSites[h].challenge_scorefinal.toFixed(2) + ","),
        void 0 !== g_aSites[h].challenge_scorefinal && void 0 !== g_aSites[h].sfname && (void 0 === m[r = g_aSites[h].sfname] && (m[r] = ""),
        m[r] += g_aSites[h].id + ":" + g_aSites[h].challenge_scorefinal.toFixed(2) + ",",
        parseInt(g_aSites[h].challenge_scorefinal) < WEAKPASSWORDSCORE && (void 0 === f[r] && (f[r] = ""),
        f[r] += g_aSites[h].id + ":" + g_aSites[h].challenge_scorefinal.toFixed(2) + ","));
    o.weak = g;
    for (var x = [], _ = [], h = 0; h < AllSFNames.length; h++) {
        var r = AllSFNames[h]
          , v = SFNameToID[r];
        o[(_[h] = v) + "_sfname"] = r,
        o[v + "_totalscore"] = sharedtotalscore[r],
        o[v + "_numaccts"] = SharedAccounts[r].length,
        o[v + "_numblanksites"] = sharedblanksites[r],
        o[v + "_numweak"] = sharedweak[r],
        o[v + "_avgstrength"] = sharedavgstrength[r],
        o[v + "_countscore"] = sharedcountscore[r]
    }
    o.SFIDs = _,
    o.AllSFIDs = AllSFIDs,
    o.SFScores = x,
    o.SharedFolderList = AllSFNames,
    o.my_accts = g_myaccounts.length,
    writeCachedScore(t, n, g_totalscore, lpenc(e), lpenc("," + a + "\n," + g));
    var y = "", w = "", c;
    if ("undefined" != typeof lpsendchallengescore && lpsendchallengescore && (y = JSON.stringify(o),
    w = "string" == typeof base_url ? base_url : LP.lp_base,
    "string" == typeof pollserver_url && (w = pollserver_url),
    LP.lpMakeRequest(w + "poll_server.php", "challengescore=" + LP.en(y), null, null)),
    "undefined" != typeof pwndlistscan && pwndlistscan) {
        var b = "cmd=pwnedlist&auto=1" + LP.en(y)
          , A = 0;
        for (var h in g_usernames)
            b += "&username" + A + "=" + g_usernames[h].hash,
            b += "&linked" + A + "=" + g_usernames[h].link,
            A++;
        LP.lpMakeRequest(w + "misc_challenge.php", b, null, null)
    }
    for (h = 0; h < g_aSites.length; ++h)
        g_aSites[h].usernamedec = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        g_aSites[h].passworddec = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        g_aSites[h].passworddecfix = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    g_aSites = {};
    var k = 0;
    for (c in g_aPasswords)
        ++k,
        delete g_aPasswords[c];
    g_aPasswords = {};
    var k = 0;
    for (c in g_allPasswords)
        ++k,
        delete g_allPasswords[c];
    g_allPasswords = {},
    g_avgpasswordlength = g_numdictionary = g_numblanksites = g_numvulnerablesites = g_numduppasswords = g_allnumduppasswords = g_numdupsites = g_allnumdupsites = g_numweak = g_strengthscore = g_avgstrength = g_countscore = g_totalscore = g_runtimems = g_numdictionarypart = 0,
    g_aDictionary = [],
    challengeRunning = !1,
    "function" == typeof fix_sites_secure_reprompt && fix_sites_secure_reprompt()
}
function challengecleanupgenpw() {
    try {
        lpdbgchallenge("challengecleanupgenpw: called g_numsites=" + g_numsites);
        var e = 0
          , t = 0
          , n = {}
          , r = {}
          , o = {};
        for (i = 0; i < g_numsites; ++i) {
            var a = g_aSites[i]
              , s = void 0 !== a.sfname;
            o[a.id] = a.domain2lvl;
            var l = a.passworddec, c;
            void 0 === a.genpw || 1 != a.genpw || s ? void 0 !== a.genpw && 0 != a.genpw || (++t,
            void 0 === r[l] && (r[l] = []),
            r[l].push(a.id)) : (++e,
            n[a.id] = l),
            l = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }
        lpdbgchallenge("challengecleanupgenpw : g_numsites=" + g_numsites + " numgenpw=" + e + " numnongenpw=" + t);
        var u = "";
        for (var p in n) {
            var l;
            if (void 0 !== r[l = n[p]]) {
                var d = !1
                  , g = "";
                for (var f in r[l]) {
                    var m = r[l][f];
                    o[p].toLowerCase() == o[m].toLowerCase() && (d = !0,
                    g += ("" == g ? "" : ",") + m)
                }
                d && (lpdbgchallenge("challengecleanupgenpw : Deleting genpw id=" + p + " domain=" + o[p].toLowerCase() + " password=REDACTED since the following non-generated-password-sites have identical passwords and 2nd level domains: " + g),
                u += ("" == u ? "" : ",") + p)
            }
            l = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }
        try {
            var f = null;
            for (f in n)
                n[f] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            for (f in r)
                delete r[f];
            for (f = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            r = {},
            f = 0; f < t + 10; ++f)
                r["xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" + f] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            r = {}
        } catch (e) {
            lpdbgchallenge("challengecleanupgenpw : Exception occurred while cleaning memory")
        }
        return "" == u ? (lpdbgchallenge("challengecleanupgenpw : Not calling server to delete genpws since none to delete"),
        void deletegenpwsdone()) : void deletegenpws(u)
    } catch (e) {
        lpdbgchallenge("challengecleanupgenpw : EXCEPTION")
    }
    deletegenpwsdone()
}
function deletegenpws(e) {
    if (lpdbgchallenge("deletegenpws called"),
    void 0 !== ischrome && ischrome || void 0 !== g_issafari && g_issafari || "undefined" != typeof LP && void 0 !== LP.lpMakeRequest) {
        var t = LP.lp_base + "misc_challenge.php?lpnorefresh=1";
        lpdbgchallenge("deletegenpws using URL=" + t),
        lpdbgchallenge("deletegenpws passing delids=" + e);
        var n = "cmd=deletegenpws&format=xml&ids=" + LP.en(e);
        LP.lpMakeRequest(t, n, function(e, t) {
            if (4 == e.readyState) {
                if (200 == e.status && null != e.responseXML && null != e.responseXML.documentElement) {
                    var n, r = e.responseXML.documentElement.getElementsByTagName("ok"), o = "";
                    if (0 < r.length && null != (o = r[0].getAttribute("deletedids")) && "" != o) {
                        lpdbgchallenge("server returned success deletedids=" + o);
                        var a = {}
                          , s = o.split(":");
                        for (i = 0; i < s.length; ++i)
                            a[s[i]] = 1;
                        return void deletegenpwsack(a)
                    }
                }
                return lpdbgchallenge("server returned error. responsetxt=" + e.responseText),
                void deletegenpwsdone()
            }
        })
    } else if ("undefined" != typeof $ && void 0 !== $.ajax && "undefined" != typeof g_token) {
        var n = {
            cmd: "deletegenpws",
            ids: e,
            token: g_token
        };
        $.ajax({
            global: !1,
            type: "POST",
            cache: !1,
            dataType: "json",
            url: "misc_challenge.php?lpnorefresh=1",
            data: n,
            success: function(e) {
                1 == e.success ? deletegenpwsack(e.deletedids) : challengeerror(e)
            },
            error: challengeerror
        })
    } else
        lpdbgchallenge("deletegenpws failed"),
        deletegenpwsdone()
}
function deletegenpwsack(e) {
    lpdbgchallenge("deletegenpwsack called");
    var t = [];
    for (i = 0; i < g_numsites; ++i) {
        var n = g_aSites[i].id;
        void 0 === e[n] ? t[t.length] = g_aSites[i] : lpdbgchallenge("deleted site=" + n)
    }
    g_aSites = t,
    g_numsites = g_aSites.length,
    deletegenpwsdone()
}
function deletegenpwsdone() {
    var e, t;
    lpdbgchallenge("deletegenpwsdone called"),
    challengecomputescore(get_trie_from_dict("undefined" == typeof g_aDictionary ? {} : g_aDictionary))
}
function get_securityChallengeScore(e) {
    var t = "string" == typeof g_username_hash ? g_username_hash : void 0 !== lpusername_hash ? lpusername_hash : null
      , n = "undefined" != typeof g_local_accts_version ? g_local_accts_version : void 0 !== lp_local_accts_version ? lp_local_accts_version : -1;
    if (!e)
        return getCachedScore(t, n);
    getCachedScore(t, n, e, !0)
}
function qualifyForWeakCheck(e) {
    return !(!e || e.length <= 5 && 0 == isNaN(e))
}
function lp_deepCopy(e) {
    var t = e;
    if (e && "object" == typeof e)
        for (var n in t = "[object Array]" === Object.prototype.toString.call(e) ? [] : {},
        e)
            t[n] = lp_deepCopy(e[n]);
    return t
}
var siteCats = Object();
siteCats["google.com"] = "Email",
siteCats["live.com"] = "Email",
siteCats["yahoo.com"] = "Email",
siteCats["namecheap.com"] = "Email",
siteCats["yahoo.co.jp"] = "Email",
siteCats["gmail.com"] = "Email",
siteCats["aol.com"] = "Email",
siteCats["mail.com"] = "Email",
siteCats["postini.com"] = "Email",
siteCats["126.com"] = "Email",
siteCats["hushmail.com"] = "Email",
siteCats["hotmail.com"] = "Email",
siteCats["americanfunds.com"] = "Email",
siteCats["mail.ru"] = "Email",
siteCats["royalmail.com"] = "Email",
siteCats["me.com"] = "Email",
siteCats["paypal.com"] = "Finance",
siteCats["chase.com"] = "Finance",
siteCats["americanexpress.com"] = "Finance",
siteCats["bankofamerica.com"] = "Finance",
siteCats["wellsfargo.com"] = "Finance",
siteCats["etrade.com"] = "Finance",
siteCats["hrsaccount.com"] = "Finance",
siteCats["capitalone.com"] = "Finance",
siteCats["neteller.com"] = "Finance",
siteCats["anthem.com"] = "Finance",
siteCats["equifax.com"] = "Finance",
siteCats["cigna.com"] = "Finance",
siteCats["hrblock.com"] = "Finance",
siteCats["healthcare.gov"] = "Finance",
siteCats["allstate.com"] = "Finance",
siteCats["scottrade.com"] = "Finance",
siteCats["transunion.com"] = "Finance",
siteCats["metlife.com"] = "Finance",
siteCats["capitalone360.com"] = "Finance",
siteCats["ingdirect.com"] = "Finance",
siteCats["mtgox.com"] = "Finance",
siteCats["experian.net"] = "Finance",
siteCats["ally.com"] = "Finance",
siteCats["coinbase.com"] = "Finance",
siteCats["fidelity.com"] = "Finance",
siteCats["adp.com"] = "Finance",
siteCats["vsp.com"] = "Finance",
siteCats["taxact.com"] = "Finance",
siteCats["freshbooks.com"] = "Finance",
siteCats["hsbc.com"] = "Finance",
siteCats["pnc.com"] = "Finance",
siteCats["ibanking-services.com"] = "Finance",
siteCats["ameritrade.com"] = "Finance",
siteCats["hmrc.gov.uk"] = "Finance",
siteCats["ww2.financialtrans.net"] = "Finance",
siteCats["eftps.gov"] = "Finance",
siteCats["mygreatlakes.org"] = "Finance",
siteCats["authorize.net"] = "Finance",
siteCats["securepaynet.net"] = "Finance",
siteCats["prudential.com"] = "Finance",
siteCats["principal.com"] = "Finance",
siteCats["westernunion.com"] = "Finance",
siteCats["tiaa-cref.org"] = "Finance",
siteCats["myedaccount.com"] = "Finance",
siteCats["toyotafinancial.com"] = "Finance",
siteCats["myfedloan.org"] = "Finance",
siteCats["nelnet.net"] = "Finance",
siteCats["skrill.com"] = "Finance",
siteCats["blog.bitcoin.cz"] = "Finance",
siteCats["acs-education.com"] = "Finance",
siteCats["payza.com"] = "Finance",
siteCats["morningstar.com"] = "Finance",
siteCats["kiva.org"] = "Finance",
siteCats["hondafinancialservices.com"] = "Finance",
siteCats["webmoney.ru"] = "Finance",
siteCats["suntrust.com"] = "Finance",
siteCats["sharebuilder.com"] = "Finance",
siteCats["indiegogo.com"] = "Finance",
siteCats["barclaycard.co.uk"] = "Finance",
siteCats["ml.com"] = "Finance",
siteCats["dfas.mil"] = "Finance",
siteCats["aessuccess.org"] = "Finance",
siteCats["ing.nl"] = "Finance",
siteCats["btc-e.com"] = "Finance",
siteCats["troweprice.com"] = "Finance",
siteCats["royalbank.com"] = "Finance",
siteCats["moneysupermarket.com"] = "Finance",
siteCats["morganstanleyclientserv.com"] = "Finance",
siteCats["bbt.com"] = "Finance",
siteCats["accountonline.com"] = "Finance",
siteCats["kickstarter.com"] = "Finance",
siteCats["usaa.com"] = "Finance",
siteCats["onlinecreditcenter6.com"] = "Finance",
siteCats["creditkarma.com"] = "Finance",
siteCats["discovercard.com"] = "Finance",
siteCats["aaa.com"] = "Finance",
siteCats["wellsfargodealerservices.com"] = "Finance",
siteCats["discover.com"] = "Finance",
siteCats["citi.com"] = "Finance",
siteCats["ssa.gov"] = "Finance",
siteCats["vanguard.com"] = "Finance",
siteCats["statefarm.com"] = "Finance",
siteCats["myuhc.com"] = "Finance",
siteCats["salliemae.com"] = "Finance",
siteCats["aetna.com"] = "Finance",
siteCats["progressive.com"] = "Finance",
siteCats["usbank.com"] = "Finance",
siteCats["citibank.com"] = "Finance",
siteCats["schwab.com"] = "Finance",
siteCats["barclaycardus.com"] = "Finance",
siteCats["gogecapital.com"] = "Finance",
siteCats["fbsw.com"] = "Finance",
siteCats["facebook.com"] = "Social",
siteCats["twitter.com"] = "Social",
siteCats["linkedin.com"] = "Social",
siteCats["pinterest.com"] = "Social",
siteCats["tumblr.com"] = "Social",
siteCats["instagram.com"] = "Social",
siteCats["reddit.com"] = "Social",
siteCats["pof.com"] = "Social",
siteCats["xing.com"] = "Social",
siteCats["match.com"] = "Social",
siteCats["evite.com"] = "Social",
siteCats["warez-bb.org"] = "Social",
siteCats["freecycle.org"] = "Social",
siteCats["zhihu.com"] = "Social",
siteCats["caringbridge.org"] = "Social",
siteCats["badoo.com"] = "Social",
siteCats["blog.com"] = "Social",
siteCats["uber.com"] = "Social",
siteCats["eharmony.com"] = "Social",
siteCats["couchsurfing.org"] = "Social",
siteCats["nextdoor.com"] = "Social",
siteCats["mixi.jp"] = "Social",
siteCats["pixiv.net"] = "Social",
siteCats["classmates.com"] = "Social",
siteCats["flickr.com"] = "Social",
siteCats["pottermore.com"] = "Social",
siteCats["xanga.com"] = "Social",
siteCats["skyrock.com"] = "Social",
siteCats["zoosk.com"] = "Social",
siteCats["tianya.cn"] = "Social",
siteCats["taringa.net"] = "Social",
siteCats["raptr.com"] = "Social",
siteCats["duowan.com"] = "Social",
siteCats["meetup.com"] = "Social",
siteCats["myspace.com"] = "Social",
siteCats["yelp.com"] = "Social",
siteCats["foursquare.com"] = "Social",
siteCats["vk.com"] = "Social",
siteCats["disqus.com"] = "Social",
siteCats["ancestry.com"] = "Social",
siteCats["gravatar.com"] = "Social",
siteCats["eventbrite.com"] = "Social",
siteCats["renren.com"] = "Social",
siteCats["livejournal.com"] = "Social",
siteCats["okcupid.com"] = "Social",
siteCats["imgur.com"] = "Social",
siteCats["netflix.com"] = "Entertainment",
siteCats["pandora.com"] = "Entertainment",
siteCats["spotify.com"] = "Entertainment",
siteCats["redbox.com"] = "Entertainment",
siteCats["nicovidoe.jp"] = "Entertainment",
siteCats["dishnetwork.com"] = "Entertainment",
siteCats["sky.com"] = "Entertainment",
siteCats["plex.tv"] = "Entertainment",
siteCats["plexapp.com"] = "Entertainment",
siteCats["dish.com"] = "Entertainment",
siteCats["bt.com"] = "Entertainment",
siteCats["hulu.com"] = "Entertainment",
siteCats["vimeo.com"] = "Entertainment",
siteCats["ustream.tv"] = "Entertainment",
siteCats["charter.com"] = "Entertainment",
siteCats["youku.com"] = "Entertainment",
siteCats["flixster.com"] = "Entertainment",
siteCats["uvvu.com"] = "Entertainment",
siteCats["go.com"] = "Entertainment",
siteCats["last.fm"] = "Entertainment",
siteCats["tivo.com"] = "Entertainment",
siteCats["blockbuster.com"] = "Entertainment",
siteCats["vudu.com"] = "Entertainment",
siteCats["justin.tv"] = "Entertainment",
siteCats["rhapsody.com"] = "Entertainment",
siteCats["xiami.com"] = "Entertainment",
siteCats["lovefilm.com"] = "Entertainment",
siteCats["livenation.com"] = "Entertainment",
siteCats["ameba.jp"] = "Entertainment",
siteCats["slacker.com"] = "Entertainment",
siteCats["iheart.com"] = "Entertainment",
siteCats["tunein.com"] = "Entertainment",
siteCats["thepiratebay.se"] = "Entertainment",
siteCats["sling.com"] = "Entertainment",
siteCats["9gag.com"] = "Entertainment",
siteCats["livestream.com"] = "Entertainment",
siteCats["adultfriendfinder.com"] = "Entertainment",
siteCats["megaupload.com"] = "Entertainment",
siteCats["rapidgator.net"] = "Entertainment",
siteCats["movietickets.com"] = "Entertainment",
siteCats["torrentleech.org"] = "Entertainment",
siteCats["mygully.com"] = "Entertainment",
siteCats["pornolab.net"] = "Entertainment",
siteCats["ted.com"] = "Entertainment",
siteCats["t411.me"] = "Entertainment",
siteCats["jibjab.com"] = "Entertainment",
siteCats["zattoo.com"] = "Entertainment",
siteCats["tvcatchup.com"] = "Entertainment",
siteCats["xunlei.com"] = "Entertainment",
siteCats["behance.net"] = "Entertainment",
siteCats["iptorrents.com"] = "Entertainment",
siteCats["podbean.com"] = "Entertainment",
siteCats["blogbus.com"] = "Entertainment",
siteCats["what.cd"] = "Entertainment",
siteCats["filefactory.com"] = "Entertainment",
siteCats["photobucket.com"] = "Entertainment",
siteCats["directtv.com"] = "Entertainment",
siteCats["sonyentertainmentnetwork.com"] = "Entertainment",
siteCats["youtube.com"] = "Entertainment",
siteCats["soundcloud.com"] = "Entertainment",
siteCats["roku.com"] = "Entertainment",
siteCats["audible.com"] = "Entertainment",
siteCats["grooveshark.com"] = "Entertainment",
siteCats["sirisuxm.com"] = "Entertainment",
siteCats["lego.com"] = "Entertainment",
siteCats["scribd.com"] = "Entertainment",
siteCats["lynda.com"] = "Education",
siteCats["duolingo.com"] = "Education",
siteCats["edx.org"] = "Education",
siteCats["safaribooksonline.com"] = "Education",
siteCats["pearsonvue.com"] = "Education",
siteCats["collegeboard.org"] = "Education",
siteCats["codeschool.com"] = "Education",
siteCats["symplicity.com"] = "Education",
siteCats["dreamspark.com"] = "Education",
siteCats["blackboard.com"] = "Education",
siteCats["instructables.com"] = "Education",
siteCats["udemy.com"] = "Education",
siteCats["mit.edu"] = "Education",
siteCats["mypearson.com"] = "Education",
siteCats["skillport.com"] = "Education",
siteCats["livemocha.com"] = "Education",
siteCats["ets.org"] = "Education",
siteCats["edmodo.com"] = "Education",
siteCats["pearsoncmg.com"] = "Education",
siteCats["researchgate.net"] = "Education",
siteCats["udacity.com"] = "Education",
siteCats["chegg.com"] = "Education",
siteCats["applyyourself.com"] = "Education",
siteCats["wikispaces.com"] = "Education",
siteCats["wiley.com"] = "Education",
siteCats["stanford.edu"] = "Education",
siteCats["scholastic.com"] = "Education",
siteCats["berkeley.edu"] = "Education",
siteCats["projecteuler.net"] = "Education",
siteCats["lumosity.com"] = "Education",
siteCats["coursera.org"] = "Education",
siteCats["codecademy.com"] = "Education",
siteCats["allrecipes.com"] = "Dining",
siteCats["panerabread.com"] = "Dining",
siteCats["pizzahut.com"] = "Dining",
siteCats["jimmyjohns.com"] = "Dining",
siteCats["theidealmeal.com"] = "Dining",
siteCats["restaurant.com"] = "Dining",
siteCats["papajohns.com"] = "Dining",
siteCats["opentable.com"] = "Dining",
siteCats["dominos.com"] = "Dining",
siteCats["swtor.com"] = "Games",
siteCats["leagueoflegends.com"] = "Games",
siteCats["playstation.com"] = "Games",
siteCats["guildwars2.com"] = "Games",
siteCats["mojang.com"] = "Games",
siteCats["battle.net"] = "Games",
siteCats["perfectworld.com"] = "Games",
siteCats["geocaching.com"] = "Games",
siteCats["gamestop.com"] = "Games",
siteCats["pogo.com"] = "Games",
siteCats["greenmangaming.com"] = "Games",
siteCats["square-enix.com"] = "Games",
siteCats["stardock.com"] = "Games",
siteCats["kongregate.com"] = "Games",
siteCats["gamefly.com"] = "Games",
siteCats["trionworlds.com"] = "Games",
siteCats["us.ncsoft.com"] = "Games",
siteCats["curse.com"] = "Games",
siteCats["nintendo.com"] = "Games",
siteCats["rockstargames.com"] = "Games",
siteCats["demonoid.ph"] = "Games",
siteCats["pathofexile.com"] = "Games",
siteCats["elderscrollsonline.com"] = "Games",
siteCats["bioware.com"] = "Games",
siteCats["bigfishgames.com"] = "Games",
siteCats["wargaming.net"] = "Games",
siteCats["poweruprewards.com"] = "Games",
siteCats["callofduty.com"] = "Games",
siteCats["eveonline.com"] = "Games",
siteCats["bigpoint.com"] = "Games",
siteCats["sdo.com"] = "Games",
siteCats["enjin.com"] = "Games",
siteCats["thesims3.com"] = "Games",
siteCats["hirezstudios.com"] = "Games",
siteCats["mwomercs.com"] = "Games",
siteCats["nexon.net"] = "Games",
siteCats["armorgames.com"] = "Games",
siteCats["secondlife.com"] = "Games",
siteCats["needforspeed.com"] = "Games",
siteCats["play4free.com"] = "Games",
siteCats["onlive.com"] = "Games",
siteCats["steampowered.com"] = "Games",
siteCats["ea.com"] = "Games",
siteCats["minecraft.net"] = "Games",
siteCats["ubi.com"] = "Games",
siteCats["steamcommunity.com"] = "Games",
siteCats["origin.com"] = "Games",
siteCats["gog.com"] = "Games",
siteCats["twitch.tv"] = "Games",
siteCats["nexusmods.com"] = "Games",
siteCats["humblebundle.com"] = "Games",
siteCats["battlefield.com"] = "Games",
siteCats["godaddy.com"] = "Business",
siteCats["wordpress.com"] = "Business",
siteCats["intuit.com"] = "Business",
siteCats["mint.com"] = "Business",
siteCats["basecamphq.com"] = "Business",
siteCats["microsoft.com"] = "Business",
siteCats["ning.com"] = "Business",
siteCats["blackberry.com"] = "Business",
siteCats["networksolutions.com"] = "Business",
siteCats["ibm.com"] = "Business",
siteCats["mozilla.com"] = "Business",
siteCats["mcafee.com"] = "Business",
siteCats["alibaba.com"] = "Business",
siteCats["asus.com"] = "Business",
siteCats["1and1.com"] = "Business",
siteCats["ups.com"] = "Business",
siteCats["elance.com"] = "Business",
siteCats["dell.com"] = "Business",
siteCats["usajobs.gov"] = "Business",
siteCats["autodesk.com"] = "Business",
siteCats["dreamhost.com"] = "Business",
siteCats["atlassian.net"] = "Business",
siteCats["wordpress.org"] = "Business",
siteCats["glassdoor.com"] = "Business",
siteCats["citrixonline.com"] = "Business",
siteCats["netvibes.com"] = "Business",
siteCats["apply2jobs.com"] = "Business",
siteCats["tweedeck.com"] = "Business",
siteCats["heroku.com"] = "Business",
siteCats["clickbank.com"] = "Business",
siteCats["successfactors.com"] = "Business",
siteCats["freelancer.com"] = "Business",
siteCats["atlassian.com"] = "Business",
siteCats["rackspace.com"] = "Business",
siteCats["cloudflare.com"] = "Business",
siteCats["usps.com"] = "Business",
siteCats["taleo.net"] = "Business",
siteCats["microsoftonline.com"] = "Business",
siteCats["bigcommerce.com"] = "Business",
siteCats["basecamp.com"] = "Business",
siteCats["gotomeeting.com"] = "Business",
siteCats["telekom.com"] = "Business",
siteCats["shopify.com"] = "Business",
siteCats["computershare.com"] = "Business",
siteCats["silkroad.com"] = "Business",
siteCats["medfusion.com"] = "Business",
siteCats["000webhost.com"] = "Business",
siteCats["aon.com"] = "Business",
siteCats["cisco.com"] = "Business",
siteCats["1und1.de"] = "Business",
siteCats["redhat.com"] = "Business",
siteCats["virginmedia.com"] = "Business",
siteCats["myharmony.com"] = "Business",
siteCats["salesforce.com"] = "Business",
siteCats["fedex.com"] = "Business",
siteCats["pingdom.com"] = "Business",
siteCats["crucial.com"] = "Business",
siteCats["newrelic.com"] = "Business",
siteCats["cj.com"] = "Business",
siteCats["symantec.com"] = "Business",
siteCats["geico.com"] = "Business",
siteCats["hidemyass.com"] = "Business",
siteCats["peoplefluent.com"] = "Business",
siteCats["ooma.com"] = "Business",
siteCats["avast.com"] = "Business",
siteCats["norton.com"] = "Business",
siteCats["proboards.com"] = "Business",
siteCats["paychex.com"] = "Business",
siteCats["360.cn"] = "Business",
siteCats["aweber.com"] = "Business",
siteCats["10086.cn"] = "Business",
siteCats["force.com"] = "Business",
siteCats["vistaprint.com"] = "Business",
siteCats["netsuite.com"] = "Business",
siteCats["parallels.com"] = "Business",
siteCats["opendns.com"] = "Business",
siteCats["monster.com"] = "Business",
siteCats["kuaipan.cn"] = "Business",
siteCats["jacquielawson.com"] = "Business",
siteCats["evenue.net"] = "Business",
siteCats["evga.com"] = "Business",
siteCats["adrive.com"] = "Business",
siteCats["ringcentral.com"] = "Business",
siteCats["jobvite.com"] = "Business",
siteCats["dyn.com"] = "Business",
siteCats["odesk.com"] = "Business",
siteCats["tracfone.com"] = "Business",
siteCats["priorityclub.com"] = "Business",
siteCats["experts-exchange.com"] = "Business",
siteCats["keurig.com"] = "Business",
siteCats["stackexchange.com"] = "Business",
siteCats["bell.ca"] = "Business",
siteCats["canon.com"] = "Business",
siteCats["carbonite.com"] = "Business",
siteCats["register.com"] = "Business",
siteCats["indeed.com"] = "Business",
siteCats["proflowers.com"] = "Business",
siteCats["magentocommerce.com"] = "Business",
siteCats["beeline.ru"] = "Business",
siteCats["apc.com"] = "Business",
siteCats["oracle.com"] = "Business",
siteCats["digitalocean.com"] = "Business",
siteCats["hostgator.com"] = "Business",
siteCats["avg.com"] = "Business",
siteCats["dyndns.com"] = "Business",
siteCats["miles-and-more.com"] = "Business",
siteCats["britishgas.co.uk"] = "Business",
siteCats["gamespot.com"] = "Business",
siteCats["alipay.com"] = "Business",
siteCats["socalgas.com"] = "Business",
siteCats["three.co.uk"] = "Business",
siteCats["mozilla.org"] = "Business",
siteCats["nest.com"] = "Business",
siteCats["statcounter.com"] = "Business",
siteCats["vodafone.co.uk"] = "Business",
siteCats["warriorforum.com"] = "Business",
siteCats["fritz.box"] = "Business",
siteCats["optimum.net"] = "Business",
siteCats["netgear.com"] = "Business",
siteCats["libertymutual.com"] = "Business",
siteCats["mysql.com"] = "Business",
siteCats["intel.com"] = "Business",
siteCats["cint.com"] = "Business",
siteCats["custhelp.com"] = "Business",
siteCats["mts.ru"] = "Business",
siteCats["straighttalk.com"] = "Business",
siteCats["viadeo.com"] = "Business",
siteCats["real.com"] = "Business",
siteCats["23andme.com"] = "Business",
siteCats["privateinternetaccess.com"] = "Business",
siteCats["convio.net"] = "Business",
siteCats["51job.com"] = "Business",
siteCats["123-reg.co.uk"] = "Business",
siteCats["nationalgridus.com"] = "Business",
siteCats["stamps.com"] = "Business",
siteCats["afraid.org"] = "Business",
siteCats["verizon.net"] = "Business",
siteCats["buysub.com"] = "Business",
siteCats["cerberusapp.com"] = "Business",
siteCats["cafepress.com"] = "Business",
siteCats["governmentjobs.com"] = "Business",
siteCats["farmers.com"] = "Business",
siteCats["bestwestern.com"] = "Business",
siteCats["depositfiles.com"] = "Business",
siteCats["sfr.fr"] = "Business",
siteCats["legalzoom.com"] = "Business",
siteCats["synology.com"] = "Business",
siteCats["o2online.de"] = "Business",
siteCats["hrdepartment.com"] = "Business",
siteCats["bitdefender.com"] = "Business",
siteCats["sharefile.com"] = "Business",
siteCats["travelers.com"] = "Business",
siteCats["majesticseo.com"] = "Business",
siteCats["istockphoto.com"] = "Business",
siteCats["lulu.com"] = "Business",
siteCats["sce.com"] = "Business",
siteCats["fc2cn.com"] = "Business",
siteCats["telstra.com.au"] = "Business",
siteCats["moo.com"] = "Business",
siteCats["citrix.com"] = "Business",
siteCats["bayareafastrak.org"] = "Business",
siteCats["yubico.com"] = "Business",
siteCats["regonline.com"] = "Business",
siteCats["surveyhead.com"] = "Business",
siteCats["myfico.com"] = "Business",
siteCats["jolicloud.com"] = "Business",
siteCats["seomoz.org"] = "Business",
siteCats["infusionsoft.com"] = "Business",
siteCats["ipage.com"] = "Business",
siteCats["healthcaresource.com"] = "Business",
siteCats["wm.com"] = "Business",
siteCats["swype.com"] = "Business",
siteCats["eset.com"] = "Business",
siteCats["kuronekoyamato.co.jp"] = "Business",
siteCats["envato.com"] = "Business",
siteCats["icims.com"] = "Business",
siteCats["careerbuilder.com"] = "Business",
siteCats["squareup.com"] = "Business",
siteCats["bluehost.com"] = "Business",
siteCats["zoho.com"] = "Business",
siteCats["weightwatchers.com"] = "Health",
siteCats["medcohealth.com"] = "Health",
siteCats["caremark.com"] = "Health",
siteCats["kaiserpermanente.org"] = "Health",
siteCats["express-scripts.com"] = "Health",
siteCats["humana.com"] = "Health",
siteCats["mymedicare.gov"] = "Health",
siteCats["sparkpeople.com"] = "Health",
siteCats["medscape.com"] = "Health",
siteCats["hcsc.net"] = "Health",
siteCats["vitacost.com"] = "Health",
siteCats["wageworks.com"] = "Health",
siteCats["strava.com"] = "Health",
siteCats["myfitnesspal.com"] = "Health",
siteCats["amazon.com"] = "Shopping",
siteCats["ebay.com"] = "Shopping",
siteCats["apple.com"] = "Shopping",
siteCats["craigslist.org"] = "Shopping",
siteCats["newegg.com"] = "Shopping",
siteCats["groupon.com"] = "Shopping",
siteCats["fandago.com"] = "Shopping",
siteCats["gap.com"] = "Shopping",
siteCats["ikea.com"] = "Shopping",
siteCats["amazon.co.jp"] = "Shopping",
siteCats["sears.com"] = "Shopping",
siteCats["ticketmaster.com"] = "Shopping",
siteCats["xiaomi.com"] = "Shopping",
siteCats["drusgstore.com"] = "Shopping",
siteCats["ebay.ca"] = "Shopping",
siteCats["tesco.com"] = "Shopping",
siteCats["squaretrade.com"] = "Shopping",
siteCats["amazon.cn"] = "Shopping",
siteCats["hp.com"] = "Shopping",
siteCats["fiverr.com"] = "Shopping",
siteCats["costco.com"] = "Shopping",
siteCats["rei.com"] = "Shopping",
siteCats["buy.com"] = "Shopping",
siteCats["amazon.de"] = "Shopping",
siteCats["taobao.com"] = "Shopping",
siteCats["rakuten.com"] = "Shopping",
siteCats["rakuten.co.jp"] = "Shopping",
siteCats["ebay.co.uk"] = "Shopping",
siteCats["amazon.co.uk"] = "Shopping",
siteCats["walmart.com"] = "Shopping",
siteCats["onthehub.com"] = "Shopping",
siteCats["bestbuy.com"] = "Shopping",
siteCats["tomtom.com"] = "Shopping",
siteCats["centurylink.com"] = "Shopping",
siteCats["bhphotovideo.com"] = "Shopping",
siteCats["nespresso.com"] = "Shopping",
siteCats["billmelater.com"] = "Shopping",
siteCats["costcophotocenter.com"] = "Shopping",
siteCats["amazon.ca"] = "Shopping",
siteCats["amazon.fr"] = "Shopping",
siteCats["dx.com"] = "Shopping",
siteCats["mycokerewards.com"] = "Shopping",
siteCats["staplesrewardscenter.com"] = "Shopping",
siteCats["ebates.com"] = "Shopping",
siteCats["upromise.com"] = "Shopping",
siteCats["target.com"] = "Shopping",
siteCats["12306.cn"] = "Shopping",
siteCats["zulily.com"] = "Shopping",
siteCats["zazzle.com"] = "Shopping",
siteCats["national-lottery.co.uk"] = "Shopping",
siteCats["starbucks.com"] = "Shopping",
siteCats["play.com"] = "Shopping",
siteCats["1saleaday.com"] = "Shopping",
siteCats["zappos.com"] = "Shopping",
siteCats["safeway.com"] = "Shopping",
siteCats["e-rewards.com"] = "Shopping",
siteCats["lenovo.com"] = "Shopping",
siteCats["nike.com"] = "Shopping",
siteCats["landsend.com"] = "Shopping",
siteCats["bahn.de"] = "Shopping",
siteCats["kohls.com"] = "Shopping",
siteCats["livingsocial.com"] = "Shopping",
siteCats["aliexpress.com"] = "Shopping",
siteCats["samsung.com"] = "Shopping",
siteCats["walgreens.com"] = "Shopping",
siteCats["shutterfly.com"] = "Shopping",
siteCats["garmin.com"] = "Shopping",
siteCats["etsy.com"] = "Shopping",
siteCats["ebay.de"] = "Shopping",
siteCats["ruelala.com"] = "Shopping",
siteCats["jcpenney.com"] = "Shopping",
siteCats["gilt.com"] = "Shopping",
siteCats["qvc.com"] = "Shopping",
siteCats["nomorerack.com"] = "Shopping",
siteCats["marktplaats.nl"] = "Shopping",
siteCats["bol.com"] = "Shopping",
siteCats["kobobooks.com"] = "Shopping",
siteCats["stapleseasyrebates.com"] = "Shopping",
siteCats["fotolia.com"] = "Shopping",
siteCats["victoriassecret.com"] = "Shopping",
siteCats["ebay.fr"] = "Shopping",
siteCats["cabelas.com"] = "Shopping",
siteCats["officedepot.com"] = "Shopping",
siteCats["asos.com"] = "Shopping",
siteCats["6pm.com"] = "Shopping",
siteCats["ebuyer.com"] = "Shopping",
siteCats["shoprunner.com"] = "Shopping",
siteCats["dangdang.com"] = "Shopping",
siteCats["swagbucks.com"] = "Shopping",
siteCats["quibids.com"] = "Shopping",
siteCats["bedbathandbeyond.com"] = "Shopping",
siteCats["marksandspencer.com"] = "Shopping",
siteCats["toysrus.com"] = "Shopping",
siteCats["abebooks.com"] = "Shopping",
siteCats["llbean.com"] = "Shopping",
siteCats["fatwallet.com"] = "Shopping",
siteCats["slickdeals.net"] = "Shopping",
siteCats["quidco.com"] = "Shopping",
siteCats["jd.com"] = "Shopping",
siteCats["sephora.com"] = "Shopping",
siteCats["cdw.com"] = "Shopping",
siteCats["corporateperks.com"] = "Shopping",
siteCats["officemax.com"] = "Shopping",
siteCats["allegro.pl"] = "Shopping",
siteCats["autotrader.com"] = "Shopping",
siteCats["hm.com"] = "Shopping",
siteCats["ashampoo.com"] = "Shopping",
siteCats["meritline.com"] = "Shopping",
siteCats["fab.com"] = "Shopping",
siteCats["dealextreme.com"] = "Shopping",
siteCats["autozone.com"] = "Shopping",
siteCats["pixmania.com"] = "Shopping",
siteCats["mypoints.com"] = "Shopping",
siteCats["confused.com"] = "Shopping",
siteCats["woothemes.com"] = "Shopping",
siteCats["cyberlink.com"] = "Shopping",
siteCats["vente-privee.com"] = "Shopping",
siteCats["nectar.com"] = "Shopping",
siteCats["logitech.com"] = "Shopping",
siteCats["gumtree.com"] = "Shopping",
siteCats["zagg.com"] = "Shopping",
siteCats["nordstrom.com"] = "Shopping",
siteCats["comixology.com"] = "Shopping",
siteCats["360buy.com"] = "Shopping",
siteCats["theclymb.com"] = "Shopping",
siteCats["frys.com"] = "Shopping",
siteCats["officemaxperks.com"] = "Shopping",
siteCats["worldmarketexplorer.com"] = "Shopping",
siteCats["myguestaccount.com"] = "Shopping",
siteCats["myfonts.com"] = "Shopping",
siteCats["58.com"] = "Shopping",
siteCats["gmarket.co.kr"] = "Shopping",
siteCats["mercadolibre.com"] = "Shopping",
siteCats["emusic.com"] = "Shopping",
siteCats["clickandbuy.com"] = "Shopping",
siteCats["gunbroker.com"] = "Shopping",
siteCats["zennioptical.com"] = "Shopping",
siteCats["hsn.com"] = "Shopping",
siteCats["meituan.com"] = "Shopping",
siteCats["ebay.it"] = "Shopping",
siteCats["ebay.in"] = "Shopping",
siteCats["trulia.com"] = "Shopping",
siteCats["shopyourway.com"] = "Shopping",
siteCats["giffgaff.com"] = "Shopping",
siteCats["ticketmaster.co.uk"] = "Shopping",
siteCats["rewardsnetwork.com"] = "Shopping",
siteCats["ticketfly.com"] = "Shopping",
siteCats["advanceautoparts.com"] = "Shopping",
siteCats["lowes.com"] = "Shopping",
siteCats["ford.com"] = "Shopping",
siteCats["macys.com"] = "Shopping",
siteCats["tigerdirect.com"] = "Shopping",
siteCats["staples.com"] = "Shopping",
siteCats["woot.com"] = "Shopping",
siteCats["snapfish.com"] = "Shopping",
siteCats["samsclub.com"] = "Shopping",
siteCats["cvs.com"] = "Shopping",
siteCats["fitbit.com"] = "Shopping",
siteCats["barnesandnoble.com"] = "Shopping",
siteCats["homedepot.com"] = "Shopping",
siteCats["sony.com"] = "Shopping",
siteCats["monoprice.com"] = "Shopping",
siteCats["overstock.com"] = "Shopping",
siteCats["nokia.com"] = "Shopping",
siteCats["stubhub.com"] = "Shopping",
siteCats["mlb.com"] = "Sports",
siteCats["nfl.com"] = "Sports",
siteCats["cbssports.com"] = "Sports",
siteCats["bodybuilding.com"] = "Sports",
siteCats["active.com"] = "Sports",
siteCats["weibo.com"] = "News/Reference",
siteCats["duoban.com"] = "News/Reference",
siteCats["rr.com"] = "News/Reference",
siteCats["whitehouse.gov"] = "News/Reference",
siteCats["houzz.com"] = "News/Reference",
siteCats["thinkgeek.com"] = "News/Reference",
siteCats["ed.gov"] = "News/Reference",
siteCats["gmx.net"] = "News/Reference",
siteCats["washingtonpost.com"] = "News/Reference",
siteCats["cnet.com"] = "News/Reference",
siteCats["wsj.com"] = "News/Reference",
siteCats["dhs.gov"] = "News/Reference",
siteCats["web.de"] = "News/Reference",
siteCats["aarp.org"] = "News/Reference",
siteCats["dailymotion.com"] = "News/Reference",
siteCats["naver.com"] = "News/Reference",
siteCats["ft.com"] = "News/Reference",
siteCats["daum.net"] = "News/Reference",
siteCats["va.gov"] = "News/Reference",
siteCats["nnm-club.ru"] = "News/Reference",
siteCats["oreilly.com"] = "News/Reference",
siteCats["techrepublic.com"] = "News/Reference",
siteCats["bbc.co.uk"] = "News/Reference",
siteCats["4pda.ru"] = "News/Reference",
siteCats["stumbleupon.com"] = "News/Reference",
siteCats["theladders.com"] = "News/Reference",
siteCats["i-dox.net"] = "News/Reference",
siteCats["dice.com"] = "News/Reference",
siteCats["sammobile.com"] = "News/Reference",
siteCats["wunderground.com"] = "News/Reference",
siteCats["gfan.com"] = "News/Reference",
siteCats["irctc.co.in"] = "News/Reference",
siteCats["komando.com"] = "News/Reference",
siteCats["bibliocommons.com"] = "News/Reference",
siteCats["tonymacx86.com"] = "News/Reference",
siteCats["weather.com"] = "News/Reference",
siteCats["digg.com"] = "News/Reference",
siteCats["economist.com"] = "News/Reference",
siteCats["rambler.ru"] = "News/Reference",
siteCats["charter.net"] = "News/Reference",
siteCats["ubuntuforums.org"] = "News/Reference",
siteCats["zdnet.com"] = "News/Reference",
siteCats["ycombinator.com"] = "News/Reference",
siteCats["pcbeta.com"] = "News/Reference",
siteCats["sohu.com"] = "News/Reference",
siteCats["pulse.me"] = "News/Reference",
siteCats["androidcentral.com"] = "News/Reference",
siteCats["fool.com"] = "News/Reference",
siteCats["slashdot.org"] = "News/Reference",
siteCats["androidforums.com"] = "News/Reference",
siteCats["mobilenations.com"] = "News/Reference",
siteCats["alexa.com"] = "News/Reference",
siteCats["consumerreports.org"] = "News/Reference",
siteCats["angieslist.com"] = "News/Reference",
siteCats["nytimes.com"] = "News/Reference",
siteCats["wikipedia.org"] = "News/Reference",
siteCats["ruttracker.com"] = "News/Reference",
siteCats["xda-developers.com"] = "News/Reference",
siteCats["goodreads.com"] = "News/Reference",
siteCats["imdb.com"] = "News/Reference",
siteCats["163.com"] = "News/Reference",
siteCats["att.net"] = "News/Reference",
siteCats["yandex.ru"] = "News/Reference",
siteCats["ca.gov"] = "News/Reference",
siteCats["odnoklassniki.ru"] = "News/Reference",
siteCats["quora.com"] = "News/Reference",
siteCats["slideshare.net"] = "News/Reference",
siteCats["zinio.com"] = "News/Reference",
siteCats["shutterstock.com"] = "Arts",
siteCats["sxu.hu"] = "Arts",
siteCats["dreamstime.com"] = "Arts",
siteCats["themeforest.com"] = "Arts",
siteCats["deezer.com"] = "Arts",
siteCats["deviantart.com"] = "Arts",
siteCats["192.168.1.1"] = "Home",
siteCats["10.0.0.1"] = "Home",
siteCats["1.1.1.1"] = "Home",
siteCats["192.168.100.1"] = "Home",
siteCats["bhg.com"] = "Home",
siteCats["127.0.0.1"] = "Home",
siteCats["zillow.com"] = "Home",
siteCats["dropbox.com"] = "Productivity Tools",
siteCats["skype.com"] = "Productivity Tools",
siteCats["evernote.com"] = "Productivity Tools",
siteCats["adobe.com"] = "Productivity Tools",
siteCats["lookout.com"] = "Productivity Tools",
siteCats["ubuntu.com"] = "Productivity Tools",
siteCats["logmein.com"] = "Productivity Tools",
siteCats["box.com"] = "Productivity Tools",
siteCats["github.com"] = "Productivity Tools",
siteCats["mediafire.com"] = "Productivity Tools",
siteCats["icloud.com"] = "Productivity Tools",
siteCats["delicious.com"] = "Productivity Tools",
siteCats["arcot.com"] = "Productivity Tools",
siteCats["runkeeper.com"] = "Productivity Tools",
siteCats["protectmyid.com"] = "Productivity Tools",
siteCats["weebly.com"] = "Productivity Tools",
siteCats["preyproject.com"] = "Productivity Tools",
siteCats["speedtest.net"] = "Productivity Tools",
siteCats["about.me"] = "Productivity Tools",
siteCats["noip.com"] = "Productivity Tools",
siteCats["wolframalpha.com"] = "Productivity Tools",
siteCats["wunderlist.com"] = "Productivity Tools",
siteCats["asana.com"] = "Productivity Tools",
siteCats["soureforge.net"] = "Productivity Tools",
siteCats["no-ip.com"] = "Productivity Tools",
siteCats["yousendit.com"] = "Productivity Tools",
siteCats["docusign.net"] = "Productivity Tools",
siteCats["crashplan.com"] = "Productivity Tools",
siteCats["toodledo.com"] = "Productivity Tools",
siteCats["rapidshare.com"] = "Productivity Tools",
siteCats["mega.co.nz"] = "Productivity Tools",
siteCats["plaxo.com"] = "Productivity Tools",
siteCats["mywot.com"] = "Productivity Tools",
siteCats["opera.com"] = "Productivity Tools",
siteCats["readability.com"] = "Productivity Tools",
siteCats["wix.com"] = "Productivity Tools",
siteCats["here.com"] = "Productivity Tools",
siteCats["ovi.com"] = "Productivity Tools",
siteCats["webs.com"] = "Productivity Tools",
siteCats["diigo.com"] = "Productivity Tools",
siteCats["fc2.com"] = "Productivity Tools",
siteCats["codeproject.com"] = "Productivity Tools";
siteCats["rdio.com"] = "Productivity Tools",
siteCats["copy.com"] = "Productivity Tools",
siteCats["getpocket.com"] = "Productivity Tools",
siteCats["vmware.com"] = "Productivity Tools",
siteCats["doodle.com"] = "Productivity Tools",
siteCats["magicjack.com"] = "Productivity Tools",
siteCats["box.net"] = "Productivity Tools",
siteCats["kaspersky.com"] = "Productivity Tools",
siteCats["htcdev.com"] = "Productivity Tools",
siteCats["waze.com"] = "Productivity Tools",
siteCats["endomondo.com"] = "Productivity Tools",
siteCats["boerse.bz"] = "Productivity Tools",
siteCats["mylookout.com"] = "Productivity Tools",
siteCats["workflowy.com"] = "Productivity Tools",
siteCats["mozy.com"] = "Productivity Tools",
siteCats["launchpad.net"] = "Productivity Tools",
siteCats["firefox.com"] = "Productivity Tools",
siteCats["jawbone.com"] = "Productivity Tools",
siteCats["icq.com"] = "Productivity Tools",
siteCats["echosign.com"] = "Productivity Tools",
siteCats["hipchat.com"] = "Productivity Tools",
siteCats["mycheckfree.com"] = "Productivity Tools",
siteCats["addthis.com"] = "Productivity Tools",
siteCats["uploaded.net"] = "Productivity Tools",
siteCats["expensify.com"] = "Productivity Tools",
siteCats["acronis.com"] = "Productivity Tools",
siteCats["mapmyrun.com"] = "Productivity Tools",
siteCats["efax.com"] = "Productivity Tools",
siteCats["familysearch.org"] = "Productivity Tools",
siteCats["screencast.com"] = "Productivity Tools",
siteCats["roboform.com"] = "Productivity Tools",
siteCats["imageshack.us"] = "Productivity Tools",
siteCats["500px.com"] = "Productivity Tools",
siteCats["smugmug.com"] = "Productivity Tools",
siteCats["mindbodyonline.com"] = "Productivity Tools",
siteCats["hpconnected.com"] = "Productivity Tools",
siteCats["freesound.org"] = "Productivity Tools",
siteCats["corel.com"] = "Productivity Tools",
siteCats["signupgenius.com"] = "Productivity Tools",
siteCats["bitcasa.com"] = "Productivity Tools",
siteCats["turnitin.com"] = "Productivity Tools",
siteCats["justcloud.com"] = "Productivity Tools",
siteCats["podio.com"] = "Productivity Tools",
siteCats["zotero.org"] = "Productivity Tools",
siteCats["pivotaltracker.com"] = "Productivity Tools",
siteCats["animoto.com"] = "Productivity Tools",
siteCats["wufoo.com"] = "Productivity Tools",
siteCats["testflightapp.com"] = "Productivity Tools",
siteCats["pogoplug.com"] = "Productivity Tools",
siteCats["gotomypc.com"] = "Productivity Tools",
siteCats["rescuetime.com"] = "Productivity Tools",
siteCats["toggl.com"] = "Productivity Tools",
siteCats["lucidchart.com"] = "Productivity Tools",
siteCats["openoffice.org"] = "Productivity Tools",
siteCats["mindmeister.com"] = "Productivity Tools",
siteCats["floorplanner.com"] = "Productivity Tools",
siteCats["acrobat.com"] = "Productivity Tools",
siteCats["jsfiddle.net"] = "Productivity Tools",
siteCats["gliffy.com"] = "Productivity Tools",
siteCats["smartsheet.com"] = "Productivity Tools",
siteCats["teamviewer.com"] = "Productivity Tools",
siteCats["ifttt.com"] = "Productivity Tools",
siteCats["4shared.com"] = "Productivity Tools",
siteCats["baidu.com"] = "Productivity Tools",
siteCats["secureserver.net"] = "Productivity Tools",
siteCats["hootsuite.com"] = "Productivity Tools",
siteCats["logme.in"] = "Productivity Tools",
siteCats["zendesk.com"] = "Productivity Tools",
siteCats["surveymonkey.com"] = "Productivity Tools",
siteCats["tripit.com"] = "Productivity Tools",
siteCats["bitly.com"] = "Productivity Tools",
siteCats["bitbucket.org"] = "Productivity Tools",
siteCats["instapaper.com"] = "Productivity Tools",
siteCats["prezi.com"] = "Productivity Tools",
siteCats["lastpass.com"] = "Productivity Tools",
siteCats["webex.com"] = "Productivity Tools",
siteCats["demonoid.me"] = "Productivity Tools",
siteCats["sugarsync.com"] = "Productivity Tools",
siteCats["trello.com"] = "Productivity Tools",
siteCats["rememberthemilk.com"] = "Productivity Tools",
siteCats["yammer.com"] = "Productivity Tools",
siteCats["united.com"] = "Travel",
siteCats["priceline.com"] = "Travel",
siteCats["hotels.com"] = "Travel",
siteCats["travelocity.com"] = "Travel",
siteCats["starwoodhotels.com"] = "Travel",
siteCats["jetblue.com"] = "Travel",
siteCats["hertz.com"] = "Travel",
siteCats["airbnb.com"] = "Travel",
siteCats["britishairways.com"] = "Travel",
siteCats["tripadvisor.com"] = "Travel",
siteCats["kayak.com"] = "Travel",
siteCats["easyjet.com"] = "Travel",
siteCats["southwest.com"] = "Travel",
siteCats["choicehotels.com"] = "Travel",
siteCats["hyatt.com"] = "Travel",
siteCats["virginamerica.com"] = "Travel",
siteCats["amtrak.com"] = "Travel",
siteCats["ihg.com"] = "Travel",
siteCats["ua2go.com"] = "Travel",
siteCats["avis.com"] = "Travel",
siteCats["thetrainline.com"] = "Travel",
siteCats["hotwire.com"] = "Travel",
siteCats["gogoinflight.com"] = "Travel",
siteCats["enterprise.com"] = "Travel",
siteCats["zipcar.com"] = "Travel",
siteCats["alaskaair.com"] = "Travel",
siteCats["tfl.gov.uk"] = "Travel",
siteCats["wyndhamrewards.com"] = "Travel",
siteCats["airtran.com"] = "Travel",
siteCats["qantas.com.au"] = "Travel",
siteCats["nationalcar.com"] = "Travel",
siteCats["homeaway.com"] = "Travel",
siteCats["reserveamerica.com"] = "Travel",
siteCats["delta.com"] = "Travel",
siteCats["aa.com"] = "Travel",
siteCats["hilton.com"] = "Travel",
siteCats["expedia.com"] = "Travel",
siteCats["marriott.com"] = "Travel",
siteCats["booking.com"] = "Travel",
siteCats["orbitz.com"] = "Travel",
siteCats["usairways.com"] = "Travel",
siteCats["att.com"] = "Telecom",
siteCats["verizonwireless.com"] = "Telecom",
siteCats["comcast.net"] = "Telecom",
siteCats["vonage.com"] = "Telecom",
siteCats["cox.com"] = "Telecom",
siteCats["cosx.net"] = "Telecom",
siteCats["comcast.com"] = "Telecom",
siteCats["free.fr"] = "Telecom",
siteCats["o2.co.uk"] = "Telecom",
siteCats["orange.co.uk"] = "Telecom",
siteCats["vzw.com"] = "Telecom",
siteCats["verizon.com"] = "Telecom",
siteCats["t-mobile.com"] = "Telecom",
siteCats["rogers.com"] = "Telecom",
siteCats["timewarnercable.com"] = "Telecom",
siteCats["virginmobileusa.com"] = "Telecom",
siteCats["kroger.com"] = "Telecom",
siteCats["sprint.com"] = "Telecom",
siteCats["oneunited.com"] = "Finance",
siteCats["nasafcu.com"] = "Finance";
var sjcl = {
    cipher: {},
    hash: {},
    keyexchange: {},
    mode: {},
    misc: {},
    codec: {},
    exception: {
        corrupt: function(e) {
            this.toString = function() {
                return "CORRUPT: " + this.message
            }
            ,
            this.message = e
        },
        invalid: function(e) {
            this.toString = function() {
                return "INVALID: " + this.message
            }
            ,
            this.message = e
        },
        bug: function(e) {
            this.toString = function() {
                return "BUG: " + this.message
            }
            ,
            this.message = e
        },
        notReady: function(e) {
            this.toString = function() {
                return "NOT READY: " + this.message
            }
            ,
            this.message = e
        }
    }
}, lp_global_sprintf;
"undefined" != typeof module && module.exports && (module.exports = sjcl),
"function" == typeof define && define([], function() {
    return sjcl
}),
sjcl.bitArray = {
    bitSlice: function(e, t, n) {
        return e = sjcl.bitArray._shiftRight(e.slice(t / 32), 32 - (31 & t)).slice(1),
        void 0 === n ? e : sjcl.bitArray.clamp(e, n - t)
    },
    extract: function(e, t, n) {
        var r, o = Math.floor(-t - n & 31);
        return (r = -32 & (t + n - 1 ^ t) ? e[t / 32 | 0] << 32 - o ^ e[t / 32 + 1 | 0] >>> o : e[t / 32 | 0] >>> o) & (1 << n) - 1
    },
    concat: function(e, t) {
        if (0 === e.length || 0 === t.length)
            return e.concat(t);
        var n = e[e.length - 1]
          , r = sjcl.bitArray.getPartial(n);
        return 32 === r ? e.concat(t) : sjcl.bitArray._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1))
    },
    bitLength: function(e) {
        var t = e.length, n;
        return 0 === t ? 0 : (n = e[t - 1],
        32 * (t - 1) + sjcl.bitArray.getPartial(n))
    },
    clamp: function(e, t) {
        if (32 * e.length < t)
            return e;
        var n = (e = e.slice(0, Math.ceil(t / 32))).length;
        return t &= 31,
        0 < n && t && (e[n - 1] = sjcl.bitArray.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)),
        e
    },
    partial: function(e, t, n) {
        return 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e
    },
    getPartial: function(e) {
        return Math.round(e / 1099511627776) || 32
    },
    equal: function(e, t) {
        if (sjcl.bitArray.bitLength(e) !== sjcl.bitArray.bitLength(t))
            return !1;
        var n = 0, r;
        for (r = 0; r < e.length; r++)
            n |= e[r] ^ t[r];
        return 0 === n
    },
    _shiftRight: function(e, t, n, r) {
        var o, i = 0, a;
        for (void 0 === r && (r = []); 32 <= t; t -= 32)
            r.push(n),
            n = 0;
        if (0 === t)
            return r.concat(e);
        for (o = 0; o < e.length; o++)
            r.push(n | e[o] >>> t),
            n = e[o] << 32 - t;
        return i = e.length ? e[e.length - 1] : 0,
        a = sjcl.bitArray.getPartial(i),
        r.push(sjcl.bitArray.partial(t + a & 31, 32 < t + a ? n : r.pop(), 1)),
        r
    },
    _xor4: function(e, t) {
        return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]]
    },
    byteswapM: function(e) {
        var t, n, r = 65280;
        for (t = 0; t < e.length; ++t)
            n = e[t],
            e[t] = n >>> 24 | n >>> 8 & r | (n & r) << 8 | n << 24;
        return e
    }
},
sjcl.codec.utf8String = {
    fromBits: function(e) {
        var t = "", n = sjcl.bitArray.bitLength(e), r, o;
        for (r = 0; r < n / 8; r++)
            0 == (3 & r) && (o = e[r / 4]),
            t += String.fromCharCode(o >>> 24),
            o <<= 8;
        return decodeURIComponent(escape(t))
    },
    toBits: function(e) {
        e = unescape(encodeURIComponent(e));
        var t = [], n, r = 0;
        for (n = 0; n < e.length; n++)
            r = r << 8 | e.charCodeAt(n),
            3 == (3 & n) && (t.push(r),
            r = 0);
        return 3 & n && t.push(sjcl.bitArray.partial(8 * (3 & n), r)),
        t
    }
},
sjcl.codec.hex = {
    fromBits: function(e) {
        var t = "", n;
        for (n = 0; n < e.length; n++)
            t += (0xf00000000000 + (0 | e[n])).toString(16).substr(4);
        return t.substr(0, sjcl.bitArray.bitLength(e) / 4)
    },
    toBits: function(e) {
        var t, n = [], r;
        for (r = (e = e.replace(/\s|0x/g, "")).length,
        e += "00000000",
        t = 0; t < e.length; t += 8)
            n.push(0 ^ parseInt(e.substr(t, 8), 16));
        return sjcl.bitArray.clamp(n, 4 * r)
    }
},
sjcl.codec.base64 = {
    _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    fromBits: function(e, t, n) {
        var r = "", o, i = 0, a = sjcl.codec.base64._chars, s = 0, l = sjcl.bitArray.bitLength(e);
        for (n && (a = a.substr(0, 62) + "-_"),
        o = 0; 6 * r.length < l; )
            r += a.charAt((s ^ e[o] >>> i) >>> 26),
            i < 6 ? (s = e[o] << 6 - i,
            i += 26,
            o++) : (s <<= 6,
            i -= 6);
        for (; 3 & r.length && !t; )
            r += "=";
        return r
    },
    toBits: function(e, t) {
        e = e.replace(/\s|=/g, "");
        var n = [], r, o = 0, i = sjcl.codec.base64._chars, a = 0, s;
        for (t && (i = i.substr(0, 62) + "-_"),
        r = 0; r < e.length; r++) {
            if ((s = i.indexOf(e.charAt(r))) < 0)
                throw new sjcl.exception.invalid("this isn't base64!");
            26 < o ? (o -= 26,
            n.push(a ^ s >>> o),
            a = s << 32 - o) : a ^= s << 32 - (o += 6)
        }
        return 56 & o && n.push(sjcl.bitArray.partial(56 & o, a, 1)),
        n
    }
},
sjcl.codec.base64url = {
    fromBits: function(e) {
        return sjcl.codec.base64.fromBits(e, 1, 1)
    },
    toBits: function(e) {
        return sjcl.codec.base64.toBits(e, 1)
    }
},
sjcl.codec.bytes = {
    fromBits: function(e) {
        var t = [], n = sjcl.bitArray.bitLength(e), r, o;
        for (r = 0; r < n / 8; r++)
            0 == (3 & r) && (o = e[r / 4]),
            t.push(o >>> 24),
            o <<= 8;
        return t
    },
    toBits: function(e) {
        var t = [], n, r = 0;
        for (n = 0; n < e.length; n++)
            r = r << 8 | e[n],
            3 == (3 & n) && (t.push(r),
            r = 0);
        return 3 & n && t.push(sjcl.bitArray.partial(8 * (3 & n), r)),
        t
    }
},
sjcl.hash.sha256 = function(e) {
    this._key[0] || this._precompute(),
    e ? (this._h = e._h.slice(0),
    this._buffer = e._buffer.slice(0),
    this._length = e._length) : this.reset()
}
,
sjcl.hash.sha256.hash = function(e) {
    return (new sjcl.hash.sha256).update(e).finalize()
}
,
sjcl.hash.sha256.prototype = {
    blockSize: 512,
    reset: function() {
        return this._h = this._init.slice(0),
        this._buffer = [],
        this._length = 0,
        this
    },
    update: function(e) {
        "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e));
        var t, n = this._buffer = sjcl.bitArray.concat(this._buffer, e), r = this._length, o = this._length = r + sjcl.bitArray.bitLength(e);
        for (t = 512 + r & -512; t <= o; t += 512)
            this._block(n.splice(0, 16));
        return this
    },
    finalize: function() {
        var e, t = this._buffer, n = this._h;
        for (e = (t = sjcl.bitArray.concat(t, [sjcl.bitArray.partial(1, 1)])).length + 2; 15 & e; e++)
            t.push(0);
        for (t.push(Math.floor(this._length / 4294967296)),
        t.push(0 | this._length); t.length; )
            this._block(t.splice(0, 16));
        return this.reset(),
        n
    },
    _init: [],
    _key: [],
    _precompute: function() {
        var e = 0, t = 2, n;
        function r(e) {
            return 4294967296 * (e - Math.floor(e)) | 0
        }
        e: for (; e < 64; t++) {
            for (n = 2; n * n <= t; n++)
                if (t % n == 0)
                    continue e;
            e < 8 && (this._init[e] = r(Math.pow(t, .5))),
            this._key[e] = r(Math.pow(t, 1 / 3)),
            e++
        }
    },
    _block: function(e) {
        var t, n, r, o, i = e.slice(0), a = this._h, s = this._key, l = a[0], c = a[1], u = a[2], p = a[3], d = a[4], g = a[5], f = a[6], m = a[7];
        for (t = 0; t < 64; t++)
            n = (n = t < 16 ? i[t] : (r = i[t + 1 & 15],
            o = i[t + 14 & 15],
            i[15 & t] = (r >>> 7 ^ r >>> 18 ^ r >>> 3 ^ r << 25 ^ r << 14) + (o >>> 17 ^ o >>> 19 ^ o >>> 10 ^ o << 15 ^ o << 13) + i[15 & t] + i[t + 9 & 15] | 0)) + m + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (g ^ f)) + s[t],
            m = f,
            f = g,
            g = d,
            d = p + n | 0,
            p = u,
            u = c,
            l = n + ((c = l) & u ^ p & (c ^ u)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
        a[0] = a[0] + l | 0,
        a[1] = a[1] + c | 0,
        a[2] = a[2] + u | 0,
        a[3] = a[3] + p | 0,
        a[4] = a[4] + d | 0,
        a[5] = a[5] + g | 0,
        a[6] = a[6] + f | 0,
        a[7] = a[7] + m | 0
    }
},
sjcl.hash.sha512 = function(e) {
    this._key[0] || this._precompute(),
    e ? (this._h = e._h.slice(0),
    this._buffer = e._buffer.slice(0),
    this._length = e._length) : this.reset()
}
,
sjcl.hash.sha512.hash = function(e) {
    return (new sjcl.hash.sha512).update(e).finalize()
}
,
sjcl.hash.sha512.prototype = {
    blockSize: 1024,
    reset: function() {
        return this._h = this._init.slice(0),
        this._buffer = [],
        this._length = 0,
        this
    },
    update: function(e) {
        "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e));
        var t, n = this._buffer = sjcl.bitArray.concat(this._buffer, e), r = this._length, o = this._length = r + sjcl.bitArray.bitLength(e);
        for (t = 1024 + r & -1024; t <= o; t += 1024)
            this._block(n.splice(0, 32));
        return this
    },
    finalize: function() {
        var e, t = this._buffer, n = this._h;
        for (e = (t = sjcl.bitArray.concat(t, [sjcl.bitArray.partial(1, 1)])).length + 4; 31 & e; e++)
            t.push(0);
        for (t.push(0),
        t.push(0),
        t.push(Math.floor(this._length / 4294967296)),
        t.push(0 | this._length); t.length; )
            this._block(t.splice(0, 32));
        return this.reset(),
        n
    },
    _init: [],
    _initr: [12372232, 13281083, 9762859, 1914609, 15106769, 4090911, 4308331, 8266105],
    _key: [],
    _keyr: [2666018, 15689165, 5061423, 9034684, 4764984, 380953, 1658779, 7176472, 197186, 7368638, 14987916, 16757986, 8096111, 1480369, 13046325, 6891156, 15813330, 5187043, 9229749, 11312229, 2818677, 10937475, 4324308, 1135541, 6741931, 11809296, 16458047, 15666916, 11046850, 698149, 229999, 945776, 13774844, 2541862, 12856045, 9810911, 11494366, 7844520, 15576806, 8533307, 15795044, 4337665, 16291729, 5553712, 15684120, 6662416, 7413802, 12308920, 13816008, 4303699, 9366425, 10176680, 13195875, 4295371, 6546291, 11712675, 15708924, 1519456, 15772530, 6568428, 6495784, 8568297, 13007125, 7492395, 2515356, 12632583, 14740254, 7262584, 1535930, 13146278, 16321966, 1853211, 294276, 13051027, 13221564, 1051980, 4080310, 6651434, 14088940, 4675607],
    _precompute: function() {
        var e = 0, t = 2, n;
        function r(e) {
            return 4294967296 * (e - Math.floor(e)) | 0
        }
        function o(e) {
            return 1099511627776 * (e - Math.floor(e)) & 255
        }
        e: for (; e < 80; t++) {
            for (n = 2; n * n <= t; n++)
                if (t % n == 0)
                    continue e;
            e < 8 && (this._init[2 * e] = r(Math.pow(t, .5)),
            this._init[2 * e + 1] = o(Math.pow(t, .5)) << 24 | this._initr[e]),
            this._key[2 * e] = r(Math.pow(t, 1 / 3)),
            this._key[2 * e + 1] = o(Math.pow(t, 1 / 3)) << 24 | this._keyr[e],
            e++
        }
    },
    _block: function(e) {
        var t, n, r, o = e.slice(0), i = this._h, a = this._key, s = i[0], l = i[1], c = i[2], u = i[3], p = i[4], d = i[5], g = i[6], f = i[7], m = i[8], h = i[9], x = i[10], _ = i[11], v = i[12], y = i[13], w = i[14], b = i[15], A = s, k = l, C = c, S = u, E = p, P = d, L = g, T = f, B = m, R = h, I = x, O = _, N = v, D = y, z = w, F = b;
        for (t = 0; t < 80; t++) {
            if (t < 16)
                n = o[2 * t],
                r = o[2 * t + 1];
            else {
                var M = o[2 * (t - 15)]
                  , j = o[2 * (t - 15) + 1]
                  , U = (j << 31 | M >>> 1) ^ (j << 24 | M >>> 8) ^ M >>> 7
                  , G = (M << 31 | j >>> 1) ^ (M << 24 | j >>> 8) ^ (M << 25 | j >>> 7)
                  , q = o[2 * (t - 2)]
                  , H = o[2 * (t - 2) + 1]
                  , K = (H << 13 | q >>> 19) ^ (q << 3 | H >>> 29) ^ q >>> 6
                  , V = (q << 13 | H >>> 19) ^ (H << 3 | q >>> 29) ^ (q << 26 | H >>> 6)
                  , J = o[2 * (t - 7)]
                  , W = o[2 * (t - 7) + 1]
                  , Y = o[2 * (t - 16)]
                  , X = o[2 * (t - 16) + 1];
                n = U + J + ((r = G + W) >>> 0 < G >>> 0 ? 1 : 0),
                n += K + ((r += V) >>> 0 < V >>> 0 ? 1 : 0),
                n += Y + ((r += X) >>> 0 < X >>> 0 ? 1 : 0)
            }
            o[2 * t] = n |= 0,
            o[2 * t + 1] = r |= 0;
            var Z = B & I ^ ~B & N
              , Q = R & O ^ ~R & D
              , $ = A & C ^ A & E ^ C & E
              , ee = k & S ^ k & P ^ S & P
              , te = (k << 4 | A >>> 28) ^ (A << 30 | k >>> 2) ^ (A << 25 | k >>> 7)
              , ne = (A << 4 | k >>> 28) ^ (k << 30 | A >>> 2) ^ (k << 25 | A >>> 7)
              , re = (R << 18 | B >>> 14) ^ (R << 14 | B >>> 18) ^ (B << 23 | R >>> 9)
              , oe = (B << 18 | R >>> 14) ^ (B << 14 | R >>> 18) ^ (R << 23 | B >>> 9)
              , ie = a[2 * t]
              , ae = a[2 * t + 1]
              , se = F + oe
              , le = z + re + (se >>> 0 < F >>> 0 ? 1 : 0);
            le += Z + ((se += Q) >>> 0 < Q >>> 0 ? 1 : 0),
            le += ie + ((se += ae) >>> 0 < ae >>> 0 ? 1 : 0);
            var ce = ne + ee, ue;
            z = N,
            F = D,
            N = I,
            D = O,
            I = B,
            O = R,
            B = L + (le += n + ((se += r) >>> 0 < r >>> 0 ? 1 : 0)) + ((R = T + se | 0) >>> 0 < T >>> 0 ? 1 : 0) | 0,
            L = E,
            T = P,
            E = C,
            P = S,
            C = A,
            S = k,
            A = le + (te + $ + (ce >>> 0 < ne >>> 0 ? 1 : 0)) + ((k = se + ce | 0) >>> 0 < se >>> 0 ? 1 : 0) | 0
        }
        l = i[1] = l + k | 0,
        i[0] = s + A + (l >>> 0 < k >>> 0 ? 1 : 0) | 0,
        u = i[3] = u + S | 0,
        i[2] = c + C + (u >>> 0 < S >>> 0 ? 1 : 0) | 0,
        d = i[5] = d + P | 0,
        i[4] = p + E + (d >>> 0 < P >>> 0 ? 1 : 0) | 0,
        f = i[7] = f + T | 0,
        i[6] = g + L + (f >>> 0 < T >>> 0 ? 1 : 0) | 0,
        h = i[9] = h + R | 0,
        i[8] = m + B + (h >>> 0 < R >>> 0 ? 1 : 0) | 0,
        _ = i[11] = _ + O | 0,
        i[10] = x + I + (_ >>> 0 < O >>> 0 ? 1 : 0) | 0,
        y = i[13] = y + D | 0,
        i[12] = v + N + (y >>> 0 < D >>> 0 ? 1 : 0) | 0,
        b = i[15] = b + F | 0,
        i[14] = w + z + (b >>> 0 < F >>> 0 ? 1 : 0) | 0
    }
},
sjcl.misc.hmac = function(e, t) {
    this._hash = t = t || sjcl.hash.sha256;
    var n = [[], []], r, o = t.prototype.blockSize / 32;
    for (this._baseHash = [new t, new t],
    e.length > o && (e = t.hash(e)),
    r = 0; r < o; r++)
        n[0][r] = 909522486 ^ e[r],
        n[1][r] = 1549556828 ^ e[r];
    this._baseHash[0].update(n[0]),
    this._baseHash[1].update(n[1]),
    this._resultHash = new t(this._baseHash[0])
}
,
sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function(e) {
    if (this._updated)
        throw new sjcl.exception.invalid("encrypt on already updated hmac called!");
    return this.update(e),
    this.digest(e)
}
,
sjcl.misc.hmac.prototype.reset = function() {
    this._resultHash = new this._hash(this._baseHash[0]),
    this._updated = !1
}
,
sjcl.misc.hmac.prototype.update = function(e) {
    this._updated = !0,
    this._resultHash.update(e)
}
,
sjcl.misc.hmac.prototype.digest = function() {
    var e = this._resultHash.finalize()
      , t = new this._hash(this._baseHash[1]).update(e).finalize();
    return this.reset(),
    t
}
,
sjcl.misc.pbkdf2 = function(e, t, n, r, o, i, a) {
    if (n = n || 1e3,
    r < 0 || n < 0)
        throw sjcl.exception.invalid("invalid params to pbkdf2");
    var s, l, c, u, p, d, g, f;
    "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e)),
    "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t)),
    o = o || sjcl.misc.hmac;
    var m = !1;
    for (null != a ? (d = a.k,
    u = a.i,
    c = a.ui,
    l = a.u,
    s = a.prf,
    f = a.b,
    g = a.out,
    m = !0) : (a = {},
    s = new o(e),
    d = 1,
    g = [],
    f = sjcl.bitArray); 32 * g.length < (r || 1); d++) {
        for (m || (l = c = s.encrypt(f.concat(t, [d])),
        u = 1),
        m = !1; u < n; u++) {
            for (c = s.encrypt(c),
            p = 0; p < c.length; p++)
                l[p] ^= c[p];
            if (u < n && u % 200 == 0 && "function" == typeof i)
                return a.k = d,
                a.i = u + 1,
                a.u = l,
                a.ui = c,
                a.prf = s,
                a.b = f,
                a.out = g,
                setTimeout(function() {
                    sjcl.misc.pbkdf2(e, t, n, r, o, i, a)
                }, 0),
                null
        }
        g = g.concat(l)
    }
    if (r && (g = f.clamp(g, r)),
    "function" == typeof i) {
        for (var h = sjcl.codec.hex.fromBits(g), x = AES.hex2bin(h), _ = sjcl.codec.bytes.fromBits(e), v = "", u = 0; u < _.length; u++)
            v += String.fromCharCode(_[u]);
        i(x, v, n)
    }
    return g
}
,
function(e) {
    var m = {
        not_string: /[^s]/,
        number: /[dief]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fiosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    };
    function h() {
        var e = arguments[0]
          , t = h.cache;
        return t[e] && t.hasOwnProperty(e) || (t[e] = h.parse(e)),
        h.format.call(null, t[e], arguments)
    }
    h.format = function(e, t) {
        var n = 1, r = e.length, o = "", i, a = [], s, l, c, u, p, d, g = !0, f = "";
        for (s = 0; s < r; s++)
            if ("string" === (o = x(e[s])))
                a[a.length] = e[s];
            else if ("array" === o) {
                if ((c = e[s])[2])
                    for (i = t[n],
                    l = 0; l < c[2].length; l++) {
                        if (!i.hasOwnProperty(c[2][l]))
                            throw new Error(h("[sprintf] property '%s' does not exist", c[2][l]));
                        i = i[c[2][l]]
                    }
                else
                    i = c[1] ? t[c[1]] : t[n++];
                if ("function" == x(i) && (i = i()),
                m.not_string.test(c[8]) && "number" != x(i) && isNaN(i))
                    throw new TypeError(h("[sprintf] expecting number but found %s", x(i)));
                switch (m.number.test(c[8]) && (g = 0 <= i),
                c[8]) {
                case "b":
                    i = i.toString(2);
                    break;
                case "c":
                    i = String.fromCharCode(i);
                    break;
                case "d":
                case "i":
                    i = parseInt(i, 10);
                    break;
                case "e":
                    i = c[7] ? i.toExponential(c[7]) : i.toExponential();
                    break;
                case "f":
                    i = c[7] ? parseFloat(i).toFixed(c[7]) : parseFloat(i);
                    break;
                case "o":
                    i = i.toString(8);
                    break;
                case "s":
                    i = (i = String(i)) && c[7] ? i.substring(0, c[7]) : i;
                    break;
                case "u":
                    i >>>= 0;
                    break;
                case "x":
                    i = i.toString(16);
                    break;
                case "X":
                    i = i.toString(16).toUpperCase()
                }
                !m.number.test(c[8]) || g && !c[3] ? f = "" : (f = g ? "+" : "-",
                i = i.toString().replace(m.sign, "")),
                p = c[4] ? "0" === c[4] ? "0" : c[4].charAt(1) : " ",
                d = c[6] - (f + i).length,
                u = c[6] && 0 < d ? _(p, d) : "",
                a[a.length] = c[5] ? f + i + u : "0" === p ? f + u + i : u + f + i
            }
        return a.join("")
    }
    ,
    h.cache = {},
    h.parse = function(e) {
        for (var t = e, n = [], r = [], o = 0; t; ) {
            if (null !== (n = m.text.exec(t)))
                r[r.length] = n[0];
            else if (null !== (n = m.modulo.exec(t)))
                r[r.length] = "%";
            else {
                if (null === (n = m.placeholder.exec(t)))
                    throw new SyntaxError("[sprintf] unexpected placeholder");
                if (n[2]) {
                    o |= 1;
                    var i = []
                      , a = n[2]
                      , s = [];
                    if (null === (s = m.key.exec(a)))
                        throw new SyntaxError("[sprintf] failed to parse named argument key");
                    for (i[i.length] = s[1]; "" !== (a = a.substring(s[0].length)); )
                        if (null !== (s = m.key_access.exec(a)))
                            i[i.length] = s[1];
                        else {
                            if (null === (s = m.index_access.exec(a)))
                                throw new SyntaxError("[sprintf] failed to parse named argument key");
                            i[i.length] = s[1]
                        }
                    n[2] = i
                } else
                    o |= 2;
                if (3 === o)
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                r[r.length] = n
            }
            t = t.substring(n[0].length)
        }
        return r
    }
    ;
    var t = function(e, t, n) {
        return (n = (t || []).slice(0)).splice(0, 0, e),
        h.apply(null, n)
    };
    function x(e) {
        return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
    }
    function _(e, t) {
        return Array(t + 1).join(e)
    }
    void 0 !== g_isie && g_isie ? (init_LPfn(),
    "undefined" != typeof LPfn && (LPfn.sprintf = h,
    LPfn.vsprintf = t)) : (e.sprintf = h,
    e.vsprintf = t,
    "function" == typeof define && define.amd && define(function() {
        return {
            sprintf: h,
            vsprintf: t
        }
    })),
    ("undefined" != typeof LP || void 0 !== is_firefox && is_firefox() || void 0 !== is_firefox_webext && is_firefox_webext()) && (lp_global_sprintf = h),
    void 0 !== g_isie && g_isie && (lp_global_sprintf = h)
}("undefined" == typeof window ? this : window),
(void 0 !== is_firefox && is_firefox() || void 0 !== is_firefox_webext && is_firefox_webext()) && (sprintf = lp_global_sprintf);
var EXPORTED_SYMBOLS = ["crc32"];
function crc32(e, t) {
    var n = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    void 0 === t && (t = 0);
    var r = 0
      , o = 0;
    t ^= -1;
    for (var i = 0, a = e.length; i < a; i++)
        r = 255 & (t ^ e.charCodeAt(i)),
        t = t >>> 8 ^ (o = "0x" + n.substr(9 * r, 8));
    return -1 ^ t
}
var LPPerl = new LPPerl_t;
function LPPerl_t() {
    g_isfirefox || (sprintf = window.sprintf),
    "undefined" != typeof sprintf && null !== sprintf || void 0 === lp_global_sprintf || (sprintf = lp_global_sprintf),
    this.time = function() {
        var e = 0;
        if ("undefined" != typeof Date) {
            var t = new Date;
            e = parseInt(t.getTime() / 1e3 + 60 * t.getTimezoneOffset()),
            !isNaN(e) && e != 1 / 0 || (e = 0)
        }
        return e
    }
    ,
    this.ctime = function(e) {
        var t = "";
        if (null == e && (e = (new Date).getTime()),
        "undefined" != typeof Date) {
            var n = new Date(e);
            void 0 !== n.toUTCString ? t = n.toUTCString() : void 0 !== n.toGMTString && (t = n.toGMTString())
        }
        return t || "Infinity" != (t = parseInt(e / 1e3).toString()) && "NaN" != t || (t = ""),
        t
    }
    ,
    this.chomp = function(e) {
        return e && "string" == typeof e ? ("\n" == e.substr(e.length - 1, 1) && (e = e.substr(0, e.length - 1)),
        e) : ""
    }
    ,
    this.warn = function() {
        var e = "";
        e = "undefined" == typeof sprintf ? arguments.join(" ") : sprintf.apply(this, arguments),
        void 0 !== console_warn && console_warn(e),
        "undefined" != typeof write_history && write_history({
            cmd: "warn",
            msg: e
        }),
        "undefined" != typeof write_to_history && write_to_history(document, "warn", e)
    }
    ,
    this.keys = function(e) {
        return void 0 === Object.keys && (Object.keys = function() {
            "use strict";
            var o = Object.prototype.hasOwnProperty
              , i = !{
                toString: null
            }.propertyIsEnumerable("toString")
              , a = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
              , s = a.length;
            return function(e) {
                if ("object" != typeof e && ("function" != typeof e || null === e))
                    throw new TypeError("Object.keys called on non-object");
                var t = [], n, r;
                for (n in e)
                    o.call(e, n) && t.push(n);
                if (i)
                    for (r = 0; r < s; r++)
                        o.call(e, a[r]) && t.push(a[r]);
                return t
            }
        }()),
        Object.keys(e)
    }
}
var False = !1
  , True = !0
  , pass = !0;
function TrieNode() {
    this.value = null,
    this.children = {}
}
function Trie(e) {
    this.root = new TrieNode,
    this.__search = function(e) {
        var t = this.root, n = null, r;
        for (r = 0; r < e.length; r++) {
            t.value && (n = t.value);
            var o = e.charAt(r);
            if (!(o in t.children))
                return [t, e.substring(0, r), n];
            t = t.children[o]
        }
        return t.value && (n = t.value),
        [t, e, n]
    }
}
Trie.prototype.search = function(e) {
    var t;
    return this.__search(e)[2]
}
,
Trie.prototype.insert = function(e) {
    var t, n = this.__search(e), r = n[0], o = n[1];
    if (r.value !== e) {
        for (t = o.length; t < e.length; t++) {
            var i = new TrieNode;
            r.children[e.charAt(t)] = i,
            r = i
        }
        r.value = e
    }
}
,
Trie.prototype.insertlist = function(e) {
    var t;
    for (t = 0; t < e.length; t++)
        this.insert(e[t])
}
;
var ExtensionPreferences = function() {
    var r = {};
    return {
        getConst: function(e, t) {
            t(window[e])
        },
        getDefault: function(e, t) {
            t(Preferences.getDefault(e))
        },
        read: function(e, t) {
            t(Preferences.get(e))
        },
        write: function(e, t, n) {
            Preferences.set(e, t)
        },
        addListener: function(e, t) {
            var n = r[e] || [];
            n.push(t),
            r[e] = n
        },
        removeListener: function(e, t) {
            var n = r[e] || [];
            r[e] = n.filter(function(e) {
                return e !== t
            })
        },
        triggerChange: function(e, t) {
            var n;
            (r[e] || []).forEach(function(e) {
                e(t)
            })
        },
        getUnavailablePreferences: function(e) {
            e(LPPlatform.getUnavailablePreferences())
        }
    }
}();
function tokenize(e) {
    var t = e.replace(/[^a-zA-Z0-9_]/g, "_");
    return "_____" === (t = t.replace(/([A-Z])/g, "_$1")) && "!$%@#" !== e ? e : t
}
"object" == typeof module && "object" == typeof module.exports && (module.exports = tokenize),
Topics = function() {
    var i = {};
    return {
        publish: function(e, t) {
            Topics.get(e).publish(t)
        },
        get: function(e) {
            var t = e && i[e];
            if (!t) {
                var o = []
                  , n = function(e) {
                    for (var t = 0, n = o.length; t < n; ++t)
                        if (e === o[t])
                            return t;
                    return -1
                }
                  , r = function(e) {
                    var t = n(e);
                    -1 < t && o.splice(t, 1)
                };
                t = {
                    publish: function() {
                        for (var e = !0, t = o.slice(), n = 0, r = t.length; n < r && !1 !== e; ++n)
                            try {
                                "function" == typeof t[n] && (e = t[n].apply(window, arguments))
                            } catch (e) {
                                "function" == typeof LPPlatform.logException && LPPlatform.logException(e)
                            }
                    },
                    subscribe: function(e) {
                        -1 === n(e) && o.push(e)
                    },
                    subscribeFirst: function(e) {
                        r(e),
                        o.unshift(e)
                    },
                    unsubscribe: function(e) {
                        r(e)
                    }
                },
                e && (i[e] = t)
            }
            return t
        }
    }
}(),
Topics.ITEMS_DESELECTED = 1,
Topics.ITEMS_SELECTED = 2,
Topics.CONTEXT_MENU = 3,
Topics.CONFIRM = 4,
Topics.ITEM_SHARE = 5,
Topics.ERROR = 6,
Topics.SUCCESS = 7,
Topics.IDENTITY_ENABLE = 8,
Topics.SITE_ADDED = 9,
Topics.NOTE_ADDED = 10,
Topics.FORM_FILL_ADDED = 11,
Topics.EDIT_NOTE = 12,
Topics.EDIT_SITE = 13,
Topics.EDIT_FORM_FILL = 14,
Topics.ACCEPT_SHARE = 15,
Topics.REJECT_SHARE = 16,
Topics.GROUP_ADDED = 17,
Topics.RENAME_FOLDER = 18,
Topics.CONTEXT_CLOSE = 19,
Topics.EDIT_SETTINGS = 20,
Topics.REQUEST_START = 21,
Topics.REQUEST_SUCCESS = 22,
Topics.REQUEST_ERROR = 23,
Topics.COLLAPSE_ALL = 24,
Topics.EXPAND_ALL = 25,
Topics.DISPLAY_GRID = 26,
Topics.DISPLAY_LIST = 27,
Topics.CLEAR_DATA = 28,
Topics.EDIT_IDENTITY = 29,
Topics.CREATE_SUB_FOLDER = 30,
Topics.DIALOG_OPEN = 31,
Topics.DIALOG_CLOSE = 32,
Topics.ESCAPE = 33,
Topics.IDENTITY_ADDED = 34,
Topics.PUSH_STATE = 35,
Topics.EDIT_SHARED_FOLDER = 36,
Topics.LEFT_ARROW = 37,
Topics.RIGHT_ARROW = 38,
Topics.PASSWORD_CHANGE = 39,
Topics.UP_ARROW = 40,
Topics.DOWN_ARROW = 41,
Topics.ENTER = 42,
Topics.EDIT_SHARED_FOLDER_ACCESS = 43,
Topics.REMOVED_SHARED_FOLDER_USER = 44,
Topics.LOGIN = 45,
Topics.REFRESH_DATA = 46,
Topics.ACCOUNT_LINKED = 48,
Topics.ACCOUNT_UNLINKED = 49,
Topics.CREATE_SHARED_FOLDER = 50,
Topics.DIALOG_LOADING = 51,
Topics.DIALOG_LOADED = 52,
Topics.REPROMPT = 53,
Topics.EDIT_APPLICATION = 54,
Topics.ATTACHMENT_REMOVED = 55,
Topics.CLEAR_STATE = 56,
Topics.SELECT_COUNT_CHANGE = 57,
Topics.REAPPLY_SEARCH = 58,
Topics.EMERGENCY_RECIPIENT_ADDED = 59,
Topics.EDIT_EMERGENCY_RECIPIENT = 60,
Topics.UPDATE_NOTIFICATION_COUNT = 61,
Topics.UPDATE_VAULT_STATE = 62,
Topics.ENROLLED_CREDIT_MONITORING = 63,
Topics.ITEM_SHARED = 64,
Topics.REFRESH_PREFERENCES = 65,
Topics.DISPLAY_COMPACT = 66,
Topics.DISPLAY_LARGE = 67,
Topics.ALL_COLLAPSED = 68,
Topics.ALL_EXPANDED = 69,
Topics.APPLICATION_ADDED = 70,
Topics.REQUEST_STATUS = 71,
Topics.DIALOG_RESIZE = 72,
Topics.SECURENOTE_TEMPLATE_ADDED = 73,
Topics.INITIALIZED = 74,
Topics.REQUEST_FRAMEWORK_INITIALIZED = 75,
Topics.SITE_NOTIFICATION_STATE = 76,
Topics.SITE_NOTIFICATION = 77,
Topics.DROPDOWN_SHOWN = 78,
Topics.DROPDOWN_HIDE = 79,
Topics.FILLED_GENERATED_PW = 80,
Topics.VAULT_LEFT_MENU_TOGGLE = 81,
Topics.EMPTY_VAULT_STATE_CHANGE = 82,
Topics.LOGIN_FINISHED = 83,
Topics.ACCTS_VERSION_UPDATED = 84,
Topics.ITEM_REMOVED = 85,
Topics.INFIELD_NOTIFICATION_OPENED = 86,
Topics.INFIELD_NOTIFICATION_CLOSED = 87,
Topics.INFIELD_NOTIFICATION_FILLED = 88,
Topics.INFIELD_FRAME_POSITION_CHANGED = 89,
Topics.MIGRATION_RUNNING = 90,
Topics.BLOB_UPDATED = 91,
Topics.CONVERT_FOLDER_TO_LEGACY = 92,
Topics.FORM_SUBMITTED = 93,
Topics.INTRO_TOURS_LOADED = 94,
Topics.PREFERENCES_READ = 95,
Topics.PREFERENCES_WRITE = 96,
Topics.MANUAL_LOGIN_FINISHED = 97,
Topics.PROCESSED_FORM_SUBMIT = 98,
Topics.BADGE_NOTIFICATION = 99,
Topics.BADGE_CLEAR = 100,
Topics.POPOVER_RESIZE = 101,
Topics.MATCHING_ITEMS_CHANGED = 102,
Topics.PASSWORD_FORM_SUBMITTED = 103,
Topics.REMOVED_SHARE = 104,
Topics.ACCOUNT_LINKED_NEEDS_VERIFICATION = 105,
Topics.CONTENT_SCRIPT_ADD_SITE_DIALOG_OPENED = 106,
LPMessaging = function(a) {
    var t = 0, s = {}, o = 0, i = function(e) {
        var t = {}
          , n = !1;
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var o = e[r];
                switch (typeof o) {
                case "function":
                    n = n || !0,
                    t[r] = o.length;
                    break;
                case "object":
                    t[r] = i(o),
                    n = n || null !== t[r]
                }
            }
        return n ? t : null
    }, l = function(e) {
        var t = {};
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                switch (typeof r) {
                case "function":
                    t[n] = r,
                    delete e[n];
                    break;
                case "object":
                    t[n] = l(r)
                }
            }
        return t
    }, c = function(e) {
        return e && "object" == typeof e
    }, u = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }, p = function(e) {
        if (c(e))
            switch (Object.prototype.toString.call(e)) {
            case "[object Array]":
                return !1;
            case "[object Element]":
                return !0;
            case "[object Object]":
                return null !== Object.getPrototypeOf(Object.getPrototypeOf(e))
            }
        return !1
    }, d = function(e) {
        var t = u(e) ? [] : {};
        if (!p(e))
            for (var n in e)
                if (e.hasOwnProperty(n)) {
                    var r = e[n];
                    t[n] = c(r) ? d(r) : r
                }
        return t
    }, g = function(e, t) {
        e.args = d(e.args);
        var n = i(e.args);
        if (n) {
            var r = ++o;
            s[r] = {
                functions: l(e.args),
                sender: t
            },
            e.requestID = r,
            e.functions = n
        }
    }, e, n = function(e) {
        var t = s[e.responseRequestID].functions
          , n = s[e.responseRequestID].sender;
        delete s[e.responseRequestID];
        for (var r = 0, o = e.callbackPath.length; r < o; ++r)
            t = t[e.callbackPath[r]];
        var i = e.args;
        m(n, i, e.functions, e),
        t.apply(a, i)
    }, f = function(o, i, a, e) {
        var s = function() {
            for (var e = {
                responseRequestID: i.requestID,
                callbackPath: a
            }, t = [], n = 0, r = arguments.length; n < r; ++n)
                t.push(arguments[n]);
            e.args = t,
            g(e, o),
            o(e)
        };
        switch (e) {
        case 1:
            return function(e) {
                s.apply(this, arguments)
            }
            ;
        case 2:
            return function(e, t) {
                s.apply(this, arguments)
            }
            ;
        case 3:
            return function(e, t, n) {
                s.apply(this, arguments)
            }
            ;
        case 4:
            return function(e, t, n, r) {
                s.apply(this, arguments)
            }
            ;
        case 5:
            return function(e, t, n, r, o) {
                s.apply(this, arguments)
            }
            ;
        default:
            return 5 < e && Raven.captureException(new Error("Too many arguments passed.")),
            function() {
                s.apply(this, arguments)
            }
        }
    }, m = function(e, t, n, r, o) {
        for (var i in o = o || [],
        n) {
            var a = n[i];
            switch (typeof a) {
            case "object":
                m(e, t[i], a, r, o.concat(i));
                break;
            default:
                t[i] = f(e, r, o.concat(i), a)
            }
        }
    }, r, h;
    return {
        handleRequest: function(e, t, n, r) {
            var o = t.args;
            m(n, o, t.functions, t),
            LPReflection.callFunction(e, t.cmd, o, r)
        },
        makeRequest: function(e, t, n) {
            return g(t.data, n),
            e(t)
        },
        handleResponse: n,
        getNewMessageSourceID: function(e) {
            return ++t
        }
    }
}(this),
LPReflection = function(a) {
    var c = function(e, t, n) {
        n = n || a,
        "string" == typeof t && (t = t.split("."));
        for (var r = 0, o = t.length; r < o; ++r) {
            var i = t[r];
            if (e) {
                if (!e.hasOwnProperty(i))
                    throw "Cannot access " + t.join(".") + ". Not defined on the interface.";
                e = e[i]
            }
            r < o - 1 && (n = n[i])
        }
        return {
            parent: n,
            property: t[t.length - 1],
            definition: e
        }
    }, e, t, n;
    return {
        callFunction: function(e, t, n, r) {
            var o = c(e, t, r && r.context)
              , i = o.parent[o.property];
            if (r && r.additionalArguments && o.definition.options && o.definition.options.appendAdditionalArguments) {
                for (var a = [].concat(r.additionalArguments), s = i.length - n.length - a.length, l = 0; l < s; ++l)
                    n.push(void 0);
                n = n.concat(r.additionalArguments)
            }
            if (!o.definition || !o.definition.before)
                return i.apply(o.parent, n);
            o.definition.before.apply(o.definition, n.concat(function() {
                i.apply(o.parent, n)
            }))
        },
        setValue: function(e, t, n, r) {
            var o = c(e, t, r && r.context);
            if (o.definition && !o.definition.allowWrite())
                throw ("string" == typeof t ? t : t.join(".")) + " is not writeable.";
            o.parent[o.property] = n
        },
        getValue: function(e, t, n) {
            var r = c(e, t, n && n.context);
            return r.parent[r.property]
        }
    }
}(this),
Interfaces = function() {
    var u = function(e, t) {
        this.type = e,
        this.options = t,
        this.options && (this.options.include && (this.options.include = [].concat(this.options.include)),
        this.options.exclude && (this.options.exclude = [].concat(this.options.exclude)))
    }
      , n = function(e, t) {
        var t = [].concat(t);
        for (i = 0; i < t.length; ++i)
            for (j = 0; j < e.length; ++j)
                if (e[j] === t[i])
                    return !0;
        return !1
    };
    u.prototype.requiredBy = function(e) {
        var t;
        if (e && this.options) {
            if (this.options.include)
                return n(this.options.include, e);
            if (this.options.exclude)
                return !n(this.options.include, e)
        }
        return !0
    }
    ,
    u.prototype.isSyncronized = function() {
        return this.options && !0 === this.options.sync
    }
    ,
    u.prototype.isSyncronousFunction = function() {
        return this.type === Interfaces.TYPE_SYNC_FUNCTION
    }
    ,
    u.prototype.isFunction = function() {
        return this.type === Interfaces.TYPE_FUNCTION || this.type === Interfaces.TYPE_SYNC_FUNCTION
    }
    ,
    u.prototype.isConstructor = function() {
        return this.type === Interfaces.TYPE_CONSTRUCTOR
    }
    ,
    u.prototype.isPrimitive = function() {
        return !this.isFunction() && !this.isConstructor()
    }
    ,
    u.prototype.shouldSendIndirect = function() {
        return this.isPrimitive() ? !this.options || void 0 === this.options.sendIndirect || this.options.sendIndirect : this.options && !0 === this.options.sendIndirect
    }
    ,
    u.prototype.allowWrite = function() {
        return this.options && !0 === this.options.write
    }
    ,
    u.prototype.addIncludes = function(e) {
        this.options = this.options || {},
        this.options.include = this.options.include.concat(e)
    }
    ;
    var e, t = (p = function(t, n) {
        return function(e) {
            if (n.hasOwnProperty(e))
                return t[e];
            throw e + " is not defined in the interface."
        }
    }
    ,
    d = function(r, o, i, a) {
        var s = function(e, t, n) {
            if (!e.allowWrite())
                throw i.concat(t) + " is not writeable.";
            if (!e || typeof n !== e.type)
                throw t + " is not defined in the interface.";
            r[t] = n
        };
        return a.direct ? function(e, t) {
            var n = o[e];
            s(n, e, t)
        }
        : function(e, t) {
            var n = o[e];
            s(n, e, t),
            n.shouldSendIndirect() && a.requestFunction({
                cmd: "LPData.setValue",
                args: [i.concat(e), t]
            })
        }
    }
    ,
    g = function(t, n, i, a) {
        return function() {
            var e = arguments;
            if (a.cloneObjects && !t.isSyncronousFunction()) {
                var r = function(t) {
                    return "function" == typeof t ? function() {
                        var e = o(Array.from(arguments));
                        t.apply(null, e)
                    }
                    : t
                }
                  , o = function(t) {
                    return t ? (Array.isArray(t) ? (n = [],
                    t.forEach(function(e) {
                        "object" == typeof e ? n.push(o(e)) : n.push(r(e))
                    })) : (n = {},
                    Object.keys(t).forEach(function(e) {
                        t[e] && "object" == typeof t[e] ? n[e] = o(t[e]) : n[e] = r(t[e])
                    })),
                    r(n)) : null;
                    var n
                };
                e = Array.prototype.map.call(e, function(e) {
                    return "object" == typeof e ? o(e) : r(e)
                })
            }
            return i.apply(n, e)
        }
    }
    ,
    f = function(r, o, i) {
        if ("function" == typeof i.requestFunction)
            return function() {
                for (var e = [], t = 0, n = arguments.length; t < n; ++t)
                    e.push(arguments[t]);
                return i.requestFunction({
                    cmd: 0 < r.length ? r.concat(o) : o,
                    args: e
                })
            }
            ;
        throw "requestFunction must be specified for this interface since it is not direct access."
    }
    ,
    m = function(e, t, n) {
        return function() {
            "function" == typeof t && t.apply(e, arguments),
            "function" == typeof n && n.apply(e, arguments)
        }
    }
    ,
    h = function(e, t, n, r, o, i) {
        var a = !1
          , s = [];
        for (var l in r) {
            var c = r[l];
            c instanceof u ? c.isFunction() ? !c.requiredBy(i.context) || c.isSyncronousFunction() && i.asyncOnly || (i.direct || c.isSyncronousFunction() ? t && "function" == typeof t[l] ? (e[l] = g(c, t, t[l], i),
            !i.direct && c.shouldSendIndirect() && (e[l] = m(e, e[l], f(o, l, i)))) : s.push(c.type + ": " + o.concat(l).join(".")) : e[l] = f(o, l, i)) : c.isConstructor() ? c.requiredBy(i.context) && !i.asyncOnly && (t && "function" == typeof t[l] ? e[l] = t[l] : s.push(c.type + ": " + o.concat(l).join("."))) : a = !0 : (e.hasOwnProperty(l) || (e[l] = {}),
            h(e[l], t ? t[l] : t, n ? n[l] : n, r[l], o.concat(l), i))
        }
        if (a && (e.get = p(n, r),
        e.set = d(n, r, o, i)),
        0 < s.length && i.checkMissing)
            throw "Background instance does not support the following:\n" + s.join("\n");
        return e
    }
    ,
    function(e, t) {
        return h(t.instance || {}, t.source || t.sourceFunctions, t.source || t.sourceData, e, [], t)
    }
    ), p, d, g, f, m, h, s = (a = {},
    l = {},
    c = function(e, t, n, r) {
        var o = [];
        for (var i in e) {
            var a = r ? r.concat(i) : [i]
              , s = e[i];
            s instanceof u ? s.isPrimitive() && s.requiredBy(t) && (!n || s.isSyncronized()) && o.push({
                sourceFunction: s.options && s.options.sourceFunction,
                path: a
            }) : o = o.concat(c(s, t, n, a))
        }
        return o
    }
    ,
    function(e, t) {
        var n = [];
        e = [].concat(e);
        for (var r = 0; r < e.length; ++r) {
            var o = e[r], i;
            t.syncronizedOnly ? void 0 === (i = l[o]) && (i = l[o] = c(t.interface, o, !0)) : void 0 === (i = a[o]) && (i = a[o] = c(t.interface, o, !1)),
            n = n.concat(i)
        }
        return n
    }
    ), a, l, c, r, o;
    return {
        TYPE_CONSTRUCTOR: "contsructor",
        TYPE_SYNC_FUNCTION: "synchronous function",
        TYPE_FUNCTION: "function",
        TYPE_STRING: "string",
        TYPE_BOOLEAN: "boolean",
        TYPE_NUMBER: "number",
        TYPE_OBJECT: "object",
        Definition: u,
        extend: function(e, t) {
            for (var n in t) {
                var r = t[n];
                switch (typeof r) {
                case "object":
                    e.hasOwnProperty(n) ? Interfaces.extend(e[n], r) : e[n] = r;
                    break;
                default:
                    e[n] = r
                }
            }
        },
        createInstance: t,
        getPrimitives: function(e) {
            var t = {};
            if (e.context)
                for (var n = s(e.context, e), r = 0, o = n.length; r < o; ++r) {
                    var i = n[r], a;
                    a = i.sourceFunction ? "function" == typeof i.sourceFunction ? i.sourceFunction() : LPReflection.callFunction(null, i.sourceFunction, [], {
                        context: e.source
                    }) : LPReflection.getValue(e.interface, i.path, {
                        context: e.source
                    }),
                    LPReflection.setValue(null, i.path, a, {
                        context: t
                    })
                }
            return t
        },
        clearPrimitives: function(e) {
            if (e.context)
                for (var t = s(e.context, e), n = 0; n < t.length; ++n)
                    LPReflection.setValue(null, t[n].path, null, {
                        context: e.source
                    })
        },
        getName: function(e) {
            for (var t in this)
                if (e === this[t])
                    return t;
            throw new Error("Could not find interface name.")
        }
    }
}(),
Interfaces.BackgroundInterface = function(e) {
    var t = e.TYPE_FUNCTION
      , n = e.TYPE_SYNC_FUNCTION
      , r = e.TYPE_STRING
      , o = e.TYPE_BOOLEAN
      , i = e.TYPE_OBJECT
      , a = e.TYPE_NUMBER
      , s = e.Definition;
    return {
        base_url: new s(r),
        FILENAME_FRAGMENT_VALID: new s(a,{
            include: ["vault", "note"]
        }),
        g_bigicons: new s(i,{
            include: ["vault", "extensionDropdown", "vaultItemSelect"],
            sendIndirect: !1,
            write: !0
        }),
        g_icons: new s(i,{
            include: ["vault", "extensionDropdown", "vaultItemSelect"]
        }),
        g_applications: new s(i,{
            include: ["vault", "extensionDropdown", "application"]
        }),
        g_emer_sharees: new s(i,{
            include: "vault"
        }),
        g_emer_sharers: new s(i,{
            include: "vault"
        }),
        g_enterpriseuser: new s(a,{
            sync: !0
        }),
        g_enterprisemodel: new s(a,{
            sync: !0
        }),
        g_enterpriseoffering: new s(a,{
            sync: !0
        }),
        g_enterpriseuserrole: new s(r,{
            sync: !0
        }),
        g_formfills: new s(i,{
            include: ["vault", "extensionDropdown", "formFill", "chooseProfile", "preferences"]
        }),
        g_genpws: new s(i,{
            include: ["vault", "extensionDropdown"],
            write: !0
        }),
        g_identities: new s(i,{
            include: ["vault", "extensionDropdown"]
        }),
        g_identity: new s(r,{
            include: ["vault", "extensionDropdown"],
            sync: !0
        }),
        g_iscompanyadmin: new s(o,{
            sync: !0
        }),
        g_is_company_subscription_expired: new s(o,{
            sync: !0
        }),
        g_is_premium_as_a_perk: new s(o,{
            sync: !0
        }),
        g_local_accts_version: new s(r,{
            include: ["vault", "extensionDropdown"],
            sync: !0
        }),
        g_local_key: new s(r),
        g_pendings: new s(i,{
            include: "vault"
        }),
        g_prefoverrides: new s(i),
        gRecovery: new s(r),
        g_premium_exp: new s(i),
        g_is_premium_trial: new s(i),
        g_premium_trial_exp_days: new s(a),
        g_hasplugin: new s(o),
        g_2fa_inprocess: new s(o,{
            include: "vault"
        }),
        g_is_legacy_premium: new s(a,{
            sync: !0
        }),
        g_is_families_trial_started: new s(a,{
            sync: !0
        }),
        g_predates_families: new s(a,{
            sync: !0
        }),
        g_seen_vault_post_families: new s(a,{
            sync: !0
        }),
        g_prompts: new s(i),
        g_securenotes: new s(i,{
            include: ["vault", "extensionDropdown", "note", "vaultItemSelect"]
        }),
        g_shares: new s(i),
        g_showcredmon: new s(o,{
            include: "vault",
            sync: !0
        }),
        g_sites: new s(i,{
            include: ["vault", "extensionDropdown", "site", "note", "formFill", "contentScriptSite"]
        }),
        g_pending_shares: new s(i,{
            include: ["vault"]
        }),
        g_note_templates: new s(i,{
            include: ["vault", "note", "addItem", "extensionDropdown"]
        }),
        g_language: new s(r),
        g_uid: new s(a),
        g_username: new s(r),
        g_username_hash: new s(r,{
            include: "vault"
        }),
        g_first_time_login: new s(o,{
            include: "vault"
        }),
        g_new_settings_enabled: new s(o,{
            include: "vault"
        }),
        g_nofolder_feature_enabled: new s(i,{
            include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"]
        }),
        g_basicauth_feature_enabled: new s(i,{
            include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"]
        }),
        g_family_shared_folders_enabled: new s(o,{
            include: "vault"
        }),
        lp_attaches: new s(i,{
            include: ["vault", "note"]
        }),
        lploggedin: new s(o,{
            sync: !0
        }),
        lpversion: new s(r,{
            include: "vault"
        }),
        rsaprivatekeyhex: new s(r,{
            include: "vault",
            write: !0,
            sourceFunction: function() {
                return lp_rsaprivatekeyhex
            }
        }),
        siteCats: new s(i,{
            include: ["vault", "site"]
        }),
        LPContentScriptFeatures: new s(i),
        g_bigsquareicons: new s(i,{
            include: ["vault"]
        }),
        g_isie: new s(o),
        g_isedge: new s(o,{
            include: ["note", "extensionDropdown", "contentScript"]
        }),
        RecordTypeConfig: new s(i,{
            include: ["vault", "note", "site", "addItem", "extensionDropdown"]
        }),
        addeditformfill: new s(t),
        addEmptyGroup: new s(t),
        LPServer: {
            ajax: new s(t),
            xmlRequest: new s(t),
            textRequest: new s(t),
            jsonRequest: new s(t)
        },
        LPRavenTransport: new s(t),
        BackgroundServer: {
            emergencyAccess: {
                acceptOffer: new s(t),
                addRecipient: new s(t),
                declineOffer: new s(t),
                denyAccess: new s(t),
                getRecipientInfo: new s(t),
                getSharerInfo: new s(t),
                removeRecipient: new s(t),
                requestAccess: new s(t),
                unlinkAccount: new s(t),
                updateRecipient: new s(t),
                updateShareeKey: new s(t)
            },
            identities: {
                add: new s(t),
                remove: new s(t),
                update: new s(t)
            },
            vault: {
                history: {
                    revertPasswordChange: new s(t),
                    getPasswordHistory: new s(t),
                    getUsernameHistory: new s(t),
                    getNoteHistory: new s(t)
                }
            },
            sharing: {
                individual: {
                    shareItems: new s(t),
                    unshareItem: new s(t),
                    acceptShare: new s(t),
                    rejectShare: new s(t),
                    inviteFriends: new s(t),
                    getSentShareData: new s(t),
                    getReceivedShareData: new s(t)
                },
                folder: {
                    getFolders: new s(t),
                    getPublicKeys: new s(t),
                    create: new s(t),
                    rename: new s(t),
                    remove: new s(t),
                    accept: new s(t),
                    reject: new s(t),
                    addMembers: new s(t),
                    getMembers: new s(t),
                    removeMember: new s(t),
                    reinviteMember: new s(t),
                    updateMemberPermissions: new s(t),
                    getRestrictions: new s(t),
                    updateRestrictions: new s(t),
                    startDownloading: new s(t),
                    stopDownloading: new s(t),
                    restoreDeleted: new s(t),
                    purgeDeleted: new s(t),
                    convertToEnterprise: new s(t),
                    convertToLegacy: new s(t)
                }
            },
            sitesAndNotes: {
                saveCustomNoteTemplate: new s(t),
                deleteCustomNoteTemplate: new s(t)
            },
            transact: {
                sendReminder: new s(t),
                sendMobileDownload: new s(t)
            },
            families: {
                getMembers: new s(t),
                existingUserTrial: new s(t),
                getInvitations: new s(t)
            },
            licensing: {
                getCompanyLicensing: new s(t),
                isCompanyExpired: new s(t),
                setCompanyExpired: new s(t)
            },
            invitation: {
                acceptInvitation: new s(t),
                dismissInvitation: new s(t),
                getMembers: new s(t)
            }
        },
        changePassword: new s(t),
        deleteAid: new s(t),
        deleteformfill: new s(t),
        deleteGroup: new s(t),
        editAid: new s(t),
        fastEncryptAttachments: new s(t),
        generateSharingKeysFromVault: new s(t),
        generate_key: new s(t),
        get_securityChallengeScore: new s(t),
        gotourl: new s(t),
        launch: new s(t),
        launchApp: new s(t),
        loggedOut: new s(t),
        loglogin: new s(t),
        lpReportError: new s(t),
        make_lp_hash_iterations: new s(t),
        make_lp_key_hash: new s(t),
        make_lp_key_iterations: new s(t),
        moveIntoSharedFolder: new s(t),
        moveSelectedToGroup: new s(t),
        openAllSites: new s(t),
        openexport: new s(t),
        openentconsole: new s(t),
        openOnNewTab: new s(t),
        openFamilyConsole: new s(t),
        openPremiumPaymentPage: new s(t),
        openEnterprisePaymentPage: new s(t),
        openTeamsPaymentPage: new s(t),
        openFamiliesPaymentPage: new s(t),
        openPricingPage: new s(t),
        openfavorites: new s(t),
        openimport: new s(t),
        openseccheck: new s(t),
        openURL: new s(t),
        processCS: new s(t),
        storeAccountLinkToken: new s(t),
        removeAccountLinkToken: new s(t),
        refreshGroupNames: new s(t),
        refreshsites: new s(t),
        renameGroup: new s(t),
        saveFields: new s(t),
        saveSite: new s(t),
        singlefactor_reprompt: new s(t),
        switch_identity: new s(t),
        unlock_plug2web: new s(t),
        install_binary: new s(t),
        request_native_messaging: new s(t),
        increment_local_accts_version: new s(t),
        AES: {
            bin2hex: new s(n),
            Decrypt: new s(n),
            Encrypt: new s(n),
            hex2bin: new s(n),
            hex2url: new s(n),
            url2hex: new s(n)
        },
        ab2bin: new s(n),
        bin2ab: new s(n),
        reorderOnURL: new s(n),
        can_copy_to_clipboard: new s(n),
        canLaunchApplication: new s(n),
        check_filename_badchars: new s(n),
        crypto_btoa: new s(n),
        db_prepend: new s(n),
        dec: new s(n),
        enc: new s(n),
        enccbc: new s(n),
        encode_private_key: new s(n),
        encode_public_key: new s(n),
        fix_username: new s(n),
        get_last_reprompt_time: new s(n),
        get_mimetype_from_filename: new s(n),
        get_personal_linked: new s(n),
        get_personal_linked_needs_verification: new s(n),
        isAllowedFileExtension: new s(n),
        getAllowedFileExtensions: new s(n),
        getInvalidFileExtensionMessageStrings: new s(n),
        removeLinkedAccount: new s(n),
        get_random_password: new s(n),
        getbigicon: new s(n),
        geticonurlfromrecord: new s(n),
        gs: new s(n),
        have_binary: new s(n),
        have_binary_function: new s(n),
        isOffline: new s(n),
        localStorage_getItem: new s(n),
        localStorage_setItem: new s(n),
        lp_gettld_url: new s(n),
        lpCreatePass: new s(n),
        lpdec: new s(n),
        lpenc: new s(n),
        lpevent: new s(n),
        lpmdec: new s(n),
        lpmenc: new s(n),
        parse_public_key: new s(n),
        parse_private_key: new s(n),
        parsemobile: new s(n),
        punycode: {
            URLToASCII: new s(n),
            URLToUnicode: new s(n)
        },
        RSAKey: new s(e.TYPE_CONSTRUCTOR),
        set_last_reprompt_time: new s(n),
        SHA256: new s(n),
        hostof: new s(n),
        StringUtils: {
            translate: new s(n)
        },
        Preferences: {
            get: new s(n),
            set: new s(n,{
                sendIndirect: !0
            })
        },
        PreferencesAsync: {
            get: new s(t),
            set: new s(t)
        },
        rsa_encrypt_privatekey: new s(n),
        sendLpImprove: new s(t),
        sendLpImproveCallback: new s(t),
        Provisioning: {
            provisioning: {
                checkUserState: new s(t,{
                    include: "provisioning"
                }),
                sendApiCalls: new s(t,{
                    include: "provisioning"
                }),
                getLocalKey: new s(t,{
                    include: "provisioning"
                })
            }
        },
        ExtensionPreferences: {
            getConst: new s(t),
            getDefault: new s(t),
            read: new s(t),
            write: new s(t),
            getUnavailablePreferences: new s(t)
        },
        LPPlatform: {
            getUILanguage: new s(n),
            fill: new s(t),
            downloadAttachment: new s(t),
            copyToClipboard: new s(n)
        },
        get_method_async: new s(t),
        MigrationBackground: {
            getShouldStartMigration: new s(t),
            setShouldStartMigration: new s(t),
            getBlobVersion: new s(t),
            getIdentities: new s(t),
            getLinkedUsername: new s(t),
            getLinkedBlobVersion: new s(t),
            subscribeToState: new s(t),
            subscribeToStateOnce: new s(t),
            wasMigration: new s(t),
            publishState: new s(t),
            saveBlobVersion: new s(t),
            saveLinkedBlobVersion: new s(t),
            sendSegmentEvent: new s(t),
            shouldShowMigrationNotification: new s(n),
            hasFormFills: new s(t),
            postponeMigration: new s(t),
            setMigrationState: new s(t)
        },
        FormfillMigrationBackground: {
            isEnabled: new s(t),
            getFormfills: new s(t),
            getLinkedFormfills: new s(t),
            createCustomNoteType: new s(t),
            saveNote: new s(t)
        },
        Feature: {
            isEnabled: new s(t)
        },
        Policies: {
            logNameEnabled: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            logUserNameEnabled: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            logUrlEnabled: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            getSaveSiteToPersonal: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            getAccountSelectionBasedOnEmail: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            showSecureNotes: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            })
        },
        FederatedLogin: {
            isFederated: new s(t,{
                include: ["login", "acctsiframe", "update_phone", "misc_challenge", "enterprise_options", "delete_account", "otp", "misc_login", "enterprise_users"]
            }),
            getPassword: new s(t,{
                include: ["acctsiframe", "update_phone", "misc_challenge", "enterprise_options", "delete_account", "otp", "misc_login", "enterprise_users"]
            })
        },
        getVersion: new s(t),
        LPPartner: {
            getPartnerInfo: new s(t)
        },
        onSettingsIframeClose: new s(t,{
            include: ["vault"],
            appendAdditionalArguments: !0
        }),
        closeSettingsIframe: new s(t,{
            include: ["acctsiframe", "contentScript", "vault"],
            appendAdditionalArguments: !0
        }),
        GenPassHistory: {
            add: new s(t),
            clear: new s(t),
            getWithDate: new s(t),
            getWithReadableDate: new s(t),
            getWithoutDate: new s(t)
        },
        FieldOverrides: {
            getAll: new s(t),
            getSite: new s(t)
        },
        switchLanguage: new s(t),
        saveUserLanguage: new s(t),
        setLanguageNotificationDismissal: new s(t),
        Recovery: {
            getActivationHash: new s(t)
        }
    }
}(Interfaces),
function(e) {
    var t = Interfaces.TYPE_FUNCTION
      , n = Interfaces.TYPE_SYNC_FUNCTION
      , r = Interfaces.TYPE_STRING
      , o = Interfaces.TYPE_NUMBER
      , i = Interfaces.TYPE_BOOLEAN
      , a = Interfaces.TYPE_OBJECT
      , s = Interfaces.Definition
      , l = {
        g_enterpriseuser: new s(o),
        g_enterprisemodel: new s(o),
        g_enterpriseoffering: new s(o),
        countryfromip: new s(r),
        g_is_federated_user: new s(i),
        g_premium_trial_exp_days: new s(o),
        g_company_trial_exp_days: new s(o),
        g_company_license_exp_days: new s(o),
        g_is_company_subscription_expired: new s(i,{
            sync: !0
        }),
        g_company_renewalstatus: new s(r),
        g_show_original_language_changed_notification: new s(i),
        g_original_language: new s(r),
        g_loggedinoffline: new s(r,{
            include: ["vault", "site", "preferences"]
        }),
        g_loggedinonline: new s(r,{
            include: ["vault", "preferences"]
        }),
        g_badgedata: new s(a,{
            include: ["login", "extensionDropdown", "vault"]
        }),
        g_flags: new s(a,{
            include: "preferences"
        }),
        g_hideappearancebox: new s(i,{
            include: "preferences"
        }),
        g_2fa_inprocess: new s(i,{
            include: "vault"
        }),
        g_hidelogoffprefs: new s(i,{
            include: "preferences"
        }),
        g_hidenotes: new s(i,{
            include: "preferences"
        }),
        g_hiderecentlyusedlistsize: new s(i,{
            include: "preferences"
        }),
        g_hidesaedhotkey: new s(i,{
            include: "preferences"
        }),
        g_hidesearch: new s(i,{
            include: "preferences"
        }),
        g_hidevault: new s(i,{
            include: "preferences"
        }),
        g_hideshowvault: new s(i,{
            include: "preferences"
        }),
        g_is_linux: new s(i,{
            include: "preferences"
        }),
        g_is_win: new s(i,{
            include: ["vault", "preferences"]
        }),
        g_is_mac: new s(i,{
            include: "preferences"
        }),
        g_issafari: new s(i,{
            include: "preferences"
        }),
        g_issafari_appext: new s(i,{
            include: "preferences"
        }),
        g_langs: new s(a,{
            include: "preferences"
        }),
        g_nofolder_feature_enabled: new s(a,{
            include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"]
        }),
        g_basicauth_feature_enabled: new s(a,{
            include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite", "contentScriptDialog"]
        }),
        g_manual_login: new s(i,{
            include: "login",
            write: !0
        }),
        g_master_password_saved: new s(i,{
            include: "preferences"
        }),
        g_disableautofill: new s(i,{
            include: "preferences"
        }),
        g_nopoll: new s(i,{
            include: "preferences"
        }),
        g_notification_data: new s(a,{
            include: ["login", "extensionDropdown", "vault"]
        }),
        g_notification_type: new s(a,{
            include: ["login", "extensionDropdown"]
        }),
        g_offer_popupfill: new s(i,{
            include: "preferences"
        }),
        g_shownewloginoption: new s(i,{
            include: "preferences"
        }),
        lp_phpsessid: new s(r),
        lppassusernamehash: new s(i,{
            include: "preferences"
        }),
        remembersignons: new s(i,{
            include: "login"
        }),
        g_userprefs: new s(a,{
            sync: !0
        }),
        g_gblprefs: new s(a,{
            sync: !0
        }),
        clearRecentTime: new s(i,{
            include: "extensionDropdown",
            sourceFunction: "getClearRecentTime"
        }),
        g_sites_tld: new s(i,{
            include: ["extensionDropdown", "contentScript"],
            sourceFunction: function() {
                return getmatchingsites(!1, !0, !1)
            }
        }),
        g_can_clear_clipboard: new s(i,{
            sourceFunction: "can_clear_clipboard"
        }),
        g_can_copy_to_clipboard: new s(i,{
            sourceFunction: "can_copy_to_clipboard"
        }),
        g_is_chrome_portable: new s(i),
        g_user_debug_enabled: new s(i,{
            sourceFunction: "is_user_debug_enabled"
        }),
        g_have_binary: new s(i,{
            sourceFunction: "have_binary"
        }),
        extensionBaseURL: new s(r,{
            include: "contentScript",
            sourceFunction: function() {
                return getchromeurl("", !0)
            }
        }),
        create_account_safe: new s(t),
        clear_badge: new s(n,{
            sendIndirect: !0
        }),
        clear_badge_text: new s(t),
        set_badge_text: new s(t),
        clearCache: new s(t),
        clearforms: new s(t),
        clearrecent: new s(t),
        LPContextMenus: {
            createContextMenus: new s(t)
        },
        DeleteOTP: new s(t),
        disableallalerts: new s(t),
        disablepasswordmanager: new s(t),
        disablesitealert: new s(t),
        formfillexport: new s(t),
        getConsoleLogs: new s(t),
        get_saved_logins: new s(t),
        delete_saved_login: new s(t),
        generateSharingKeys: new s(t),
        get_selected_tab: new s(t),
        get_selected_tab_data_no_extension: new s(t),
        loggedOut: new s(t),
        LP_do_login: new s(t),
        lpevent: new s(t),
        setCompanyExpired: new s(t),
        switchLanguage: new s(t),
        saveUserLanguage: new s(t),
        setLanguageNotificationDismissal: new s(t),
        LPData: {
            getData: new s(t),
            setValue: new s(t)
        },
        LPPlatform: {
            getCurrentTabDetails: new s(t),
            getFavicon: new s(t),
            openTabDialog: new s(t),
            openSame: new s(t),
            navigateTab: new s(t),
            openPopoverDialog: new s(t),
            isMac: new s(n),
            isWin: new s(n),
            postLegacyMessage: new s(t,{
                appendAdditionalArguments: !0,
                include: ["contentScript", "infieldPopup"]
            }),
            connectLegacyMessaging: new s(t,{
                appendAdditionalArguments: !0,
                include: "contentScript"
            }),
            openAcctsIframe: new s(t,{
                appendAdditionalArguments: !0,
                include: "vault"
            }),
            makeNativeRequest: new s(t),
            isSafariAppExtensionEnabled: new s(t),
            isSelfDistributed: new s(t),
            doAjax: new s(t),
            purchasePremium: new s(t),
            registerProduct: new s(t),
            openFileDialog: new s(t),
            saveFile: new s(t),
            openNativeFileSelector: new s(t),
            copyToClipboard: new s(t),
            copyLastCopiedString: new s(t),
            writeAndOpenAttachmentFile: new s(t)
        },
        openabout: new s(t),
        deletesavedpw: new s(t),
        openpricing: new s(t),
        openTranslationsReadMore: new s(t),
        openpremium: new s(t),
        openenterprisepayment: new s(t),
        openteamspayment: new s(t),
        openfamiliespayment: new s(t),
        opendebugtab: new s(t),
        openentconsole: new s(t),
        openFamilyConsole: new s(t),
        openexport: new s(t),
        openfavorites: new s(t),
        openhelp: new s(t),
        openimport: new s(t),
        openlastpassexport: new s(t),
        openmyaccount: new s(t),
        openprefs: new s(t),
        openprint: new s(t),
        openseccheck: new s(t),
        opensessions: new s(t),
        openURL: new s(t),
        openvault: new s(t),
        saveall: new s(t),
        start_trial: new s(t),
        unprotect_data: new s(t),
        wlanexport: new s(t),
        lpWriteAllPrefs: new s(t),
        saveSiteFromSubmit: new s(t),
        get_selected_tab_data: new s(t),
        fillGeneratedPassword: new s(t),
        saveAllSite: new s(t),
        session_storage_get_item: new s(t),
        session_storage_set_item: new s(t),
        repromptSuccess: new s(t),
        open_login: new s(t),
        fillaid: new s(t),
        fillform: new s(t),
        fillitem: new s(t),
        setup_hotkeys: new s(t),
        getShareType: new s(t),
        IntroTutorial: {
            getState: new s(t),
            setState: new s(t),
            resetState: new s(t),
            completeTutorial: new s(t),
            isOnStateDomain: new s(t)
        },
        sendLpImprove: new s(t),
        handleNeverURL: new s(t),
        can_clear_clipboard: new s(n),
        fix_username: new s(n),
        get_lplanguage: new s(n),
        getClearRecentTime: new s(n,{
            include: "extensionDropdown"
        }),
        getmatchingsites: new s(n),
        gettaburl: new s(n),
        gs: new s(n),
        have_binary: new s(n),
        have_binary_function: new s(n),
        include_language: new s(n),
        is_chrome_portable: new s(n),
        is_opera_chromium: new s(n),
        is_firefox_webext: new s(n),
        is_user_debug_enabled: new s(n),
        setcurrenttabid: new s(n,{
            sendIndirect: !0
        }),
        setcurrenturl: new s(n,{
            sendIndirect: !0
        }),
        get_method_async: new s(t),
        updateFieldsFromSubmit: new s(t,{
            include: "contentScriptSiteDialog"
        }),
        LPIcons: {
            get: new s(t)
        },
        LPTabState: {
            getSiteNotification: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            processTextSubmit: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            processPasswordSubmit: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            clear: new s(t,{
                include: ["contentScript", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            getState: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            setLoginRequestRecentlyResolved: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            setCopiedGeneratedPassword: new s(t,{
                include: ["generatePassword", "infieldPopup"]
            }),
            getCopiedGeneratedPassword: new s(t,{
                include: "contentScript"
            }),
            clearFillSource: new s(t),
            setLastFillSource: new s(t),
            getLastFillSource: new s(t),
            getWebRequestSiteNotificationData: new s(t)
        },
        SiteLaunchObserver: {
            startFillTracking: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            isFeatureEnabled: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            formSubmitted: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            initiateFormExists: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            }),
            hasFormWithPassword: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            })
        },
        showModalOverlay: new s(t),
        removeModalOverlay: new s(t),
        userHasAccount: new s(t),
        hideYoureAlmostDoneMarketingOverlay: new s(t),
        InfieldCommands: {
            getPopupFillData: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            setActiveFormData: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            copyPassword: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            copyUserName: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            copyUrl: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            copyProp: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            getGeneratePasswordPrefs: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            setGeneratePasswordPrefs: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            searchVault: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            searchVaultAll: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            fillUserData: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            fillGeneratedPassword: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            editFormFill: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            fillForm: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            editSite: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            }),
            canCopy: new s(t,{
                include: ["infieldPopup"],
                appendAdditionalArguments: !0
            })
        },
        basicAuth: {
            isBasicAuth: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            setAuthCredential: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            removeAuth: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            cancelBasicAuth: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            hasFeature: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            closeNotification: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            }),
            isNotificationClosed: new s(t,{
                include: ["contentScript"],
                appendAdditionalArguments: !0
            })
        },
        autoChangePassword: new s(t),
        LPFeatures: {
            getSaveSiteToPersonal: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"]
            })
        },
        getLogoffWhenCloseBrowser: new s(t,{
            include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"]
        }),
        Policies: {
            logNameEnabled: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            logUserNameEnabled: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            logUrlEnabled: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            getAccountSelectionBasedOnEmail: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
                appendAdditionalArguments: !0
            }),
            getSaveSiteToPersonal: new s(t,{
                include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSiteDialog", "contentScriptSite", "contentScriptSite"],
                appendAdditionalArguments: !0
            })
        },
        FederatedLogin: {
            login: new s(t,{
                include: ["login"]
            }),
            validateK1Encryption: new s(t,{
                include: "contentScript",
                appendAdditionalArguments: !0
            })
        },
        getLinkedAccount: new s(t,{
            include: ["vault", "preferences", "extensionDropdown", "contentScript", "siteDialog", "site", "note", "formFill", "contentScriptSite"],
            appendAdditionalArguments: !0
        }),
        consent: {
            getCreateAccountDetails: new s(t,{})
        },
        LPModule: {
            callService: new s(t,{
                includes: ["contentScript", "extensionDropdown", "vault"],
                appendAdditionalArguments: !0
            }),
            callRepository: new s(t,{
                includes: ["contentScript", "extensionDropdown", "vault"],
                appendAdditionalArguments: !0
            })
        },
        MPWNoNag: new s(t),
        addDomainToMPWNever: new s(t),
        sendLpEvent: new s(t),
        get_method: new s(t)
    };
    Interfaces.extend(e, l)
}(Interfaces.BackgroundInterface),
LPBackgroundRequester = function(_) {
    return function(t, n) {
        var r = this, o = null, i = !1, a = [], s, l = (n = n || {}).interfaceDefinition, c = Date.now(), u = function(e) {
            LPMessaging.handleResponse(e)
        }, p = function(e, t) {
            LPMessaging.handleRequest(l, e, function(e) {
                d({
                    type: "contentScriptResponse",
                    data: e,
                    frameID: t
                })
            }, {
                context: n.reflectionContext,
                additionalArguments: t
            })
        }, d = function(t) {
            t.sourceFrameID = o,
            LPMessaging.makeRequest(s, t, function(e) {
                d({
                    type: "contentScriptResponse",
                    data: e,
                    frameID: t.frameID || 0
                })
            })
        }, g = function(e) {
            if (null === o && e.request.initializationID === c) {
                "undefined" != typeof Topics && Topics.get(Topics.REQUEST_FRAMEWORK_INITIALIZED).publish(e, r),
                o = e.frameID,
                i = !1,
                s({
                    type: "initialized",
                    sourceFrameID: o
                });
                for (var t = 0, n = a.length; t < n; ++t)
                    a[t]()
            }
        }, f = function(e) {
            var t = n.reflectionContext || window;
            "undefined" != typeof LPPlatform && LPPlatform.onLoad ? LPPlatform.onLoad(t, e) : "loading" === t.document.readyState ? t.addEventListener("DOMContentLoaded", e) : e()
        }, m = (e = function(e) {
            if (e.frameID === o)
                switch (e.type) {
                case "backgroundResponse":
                case "contentScriptResponse":
                    u(e.data);
                    break;
                case "contentScriptRequest":
                    p(e.data, e.sourceFrameID)
                }
            else
                "initialization" === e.type && g(e.data)
        }
        ,
        _.Raven ? _.Raven.wrap(e) : e), e, h = function(e) {
            f(function() {
                s({
                    type: "initialize",
                    data: {
                        initializationID: c,
                        interfaceName: n.interfaceName,
                        top: n.mainRequestFramework,
                        url: _.location.href,
                        childFrameCount: document.getElementsByTagName("iframe").length,
                        frameIdentity: e
                    }
                })
            })
        };
        this.initialize = function(e) {
            null !== o || i || (s = t(m, x),
            n.frameIdentityManager ? n.frameIdentityManager.getFrameIdentity(h) : h(),
            i = !0),
            e && a.push(e)
        }
        ,
        this.sendRequest = function(e) {
            null === o ? this.initialize(function() {
                d(e)
            }) : d(e)
        }
        ;
        var x = function() {
            o = null,
            a = []
        }
    }
}(this),
LPPlatform = "undefined" == typeof LPPlatform ? {} : LPPlatform,
function(o) {
    var t;
    o.requestFrameworkInitializer = (t = function(e, t) {
        var n = e("", {
            name: "requestPort"
        });
        return n.onMessage.addListener(t),
        function(e) {
            n.postMessage(e)
        }
    }
    ,
    function(e) {
        return t(chrome.runtime && chrome.runtime.connect || parent.chrome.runtime.connect, e)
    }
    ),
    o.installBinary = function(t, n) {
        var r = getBG();
        chrome.permissions.contains({
            permissions: ["nativeMessaging"]
        }, function(e) {
            t || e ? r.openURL(r.base_url + "installer/") : o.requestNativeMessaging(n)
        })
    }
    ,
    o.requestNativeMessaging = function(e) {
        var t = getBG();
        t.Preferences.set("native_messaging_asked", "1"),
        e ? window.open("/native_messaging.html?hidenever=1") : void 0 !== chrome.permissions && chrome.permissions.request({
            permissions: ["nativeMessaging", "privacy"]
        }, function(e) {
            e && alert(t.gs("Please restart your browser to finish enabling native messaging."))
        })
    }
}(LPPlatform),
LPPlatform = "undefined" == typeof LPPlatform ? {} : LPPlatform,
function() {
    LPPlatform.isMac = function() {
        return "undefined" != typeof navigator && -1 != navigator.appVersion.indexOf("Mac")
    }
    ;
    var n = function() {
        var e = {}
          , t = document.location.href.split("?");
        if (2 === t.length)
            for (var n = t[1].split("&"), r = 0; r < n.length; ++r) {
                var o = n[r].split("=");
                2 === o.length && (e[o[0]] = o[1])
            }
        return e
    };
    LPPlatform.getUILanguage = function() {
        var e, t;
        return (n().lplanguage || "en-US").replace(/_/g, "-")
    }
}(),
function(i) {
    var t, n, e, a, s;
    i.translate = function(e) {
        return gs(e)
    }
    ,
    i.isWin = function() {
        return "undefined" != typeof navigator && -1 != navigator.appVersion.indexOf("Windows")
    }
    ,
    n = [],
    e = t = null,
    a = function(e) {
        var n = e.callback;
        e.callback = function(e) {
            for (var t in e)
                window[t] = e[t];
            n && n()
        }
        ,
        t.LPData.getData(e)
    }
    ,
    s = function(e) {
        "string" == typeof e && -1 === n.indexOf(e) && n.push(e),
        setInterval(function() {
            a({
                context: n,
                triggers: {
                    g_local_accts_version: t.get("g_local_accts_version")
                }
            })
        }, 1e3)
    }
    ,
    i.getBackgroundInterface = function(e) {
        return null === t && (t = i.createBackgroundInterface(e)),
        e.getData ? t.getData({
            context: e.context,
            callback: e.callback
        }) : e.callback && e.callback(t),
        t
    }
    ,
    i.createBackgroundInterface = function(n) {
        g_bg = window;
        var t = new LPBackgroundRequester(i.requestFrameworkInitializer,{
            interfaceDefinition: n.interfaceDefinition,
            interfaceName: n.interfaceDefinition ? parent.Interfaces.getName(n.interfaceDefinition) : null,
            reflectionContext: parent,
            mainRequestFramework: void 0 === n.mainRequestFramework || n.mainRequestFramework
        });
        t.initialize();
        var r = function(e) {
            t.sendRequest({
                type: "backgroundRequest",
                data: e
            })
        }
          , o = Interfaces.createInstance(Interfaces.BackgroundInterface, {
            context: n.context,
            source: window,
            direct: !1,
            requestFunction: r
        });
        return o.getData = function(e) {
            var t = e.callback;
            e.callback = function() {
                n.pollBackground && s(e.context),
                t && t(o)
            }
            ,
            a(e)
        }
        ,
        parent.LPDialog && (parent.LPDialog.beforeLoad = function(e, t) {
            Interfaces.createInstance(Interfaces.BackgroundInterface, {
                instance: o,
                context: e,
                source: window,
                direct: !1,
                requestFunction: r
            }),
            o.getData({
                context: e,
                callback: function() {
                    parent.LPProxy.initializeModel(),
                    t()
                }
            })
        }
        ),
        n.backgroundIntitialization && n.backgroundIntitialization(o),
        o
    }
    ,
    i.adjustPreferenceDefaults = function(e) {
        e.disablepasswordmanagerasked = !1
    }
    ,
    i.getPreference = function(e) {
        return g_userprefs.hasOwnProperty(e) ? g_userprefs[e] : g_gblprefs[e]
    }
    ,
    i.setUserPreference = function(e, t) {
        g_userprefs[e] = t
    }
    ,
    i.setGlobalPreference = function(e, t) {
        g_gblprefs[e] = t
    }
    ,
    i.writePreferences = function() {}
}(LPPlatform),
StringUtils = {},
function(e) {
    e.translate = function(e) {
        if (e) {
            var t = e.trim();
            if (0 < t.length) {
                var n = LPPlatform.translate(t);
                try {
                    return 1 < arguments.length ? sprintf.apply(null, [n].concat([].splice.call(arguments, 1))) : n
                } catch (e) {
                    return console.error("StringUtils.translate: sprintf failed: " + e),
                    n
                }
            }
        }
        return e
    }
}(StringUtils),
PreferencesAsync = {
    set: function(e, t) {
        Preferences.set(e, t)
    },
    get: function(e, t, n) {
        var r;
        n(Preferences.get(e, t))
    }
},
Preferences = function() {
    var r = {}
      , o = function(e, t) {
        var n = LPPlatform.getPreference(e);
        if (t = void 0 === t ? s[e] : t,
        void 0 === n)
            return t;
        if (typeof n != typeof s[e])
            switch (typeof s[e]) {
            case "boolean":
                return "true" === n || 1 === parseInt(n);
            case "number":
                return n = -1 === n.indexOf(".") ? parseInt(n) : parseFloat(n),
                isNaN(n) ? t : n;
            case "object":
                return JSON.parse(n)
            }
        return n
    }
      , i = function(e) {
        switch (typeof e) {
        case "object":
            return JSON.stringify(e);
        case "boolean":
            return e ? 1 : 0;
        default:
            return e.toString()
        }
    }
      , a = {
        logoffWhenCloseBrowser: !0,
        logoffWhenCloseBrowserVal: !0,
        showvault: !0,
        hideContextMenus: !0,
        notificationsBottom: !0,
        usepopupfill: !0,
        openloginstart: !0,
        storeLostOTP: !0,
        enablenamedpipes: !0,
        enablenewlogin: !0,
        htmlindialog: !0,
        Icon: !0,
        generateHkKeyCode: !0,
        generateHkMods: !0,
        recheckHkKeyCode: !0,
        recheckHkMods: !0,
        searchHkKeyCode: !0,
        searchHkMods: !0,
        nextHkKeyCode: !0,
        nextHkMods: !0,
        prevHkKeyCode: !0,
        prevHkMods: !0,
        homeHkKeyCode: !0,
        homeHkMods: !0,
        openpopoverHkKeyCode: !0,
        openpopoverHkMods: !0,
        rememberpassword: !0,
        dialogSizePrefs: !0
    }
      , s = {
        logoffWhenCloseBrowser: !1,
        logoffWhenCloseBrowserVal: 0,
        idleLogoffEnabled: !1,
        idleLogoffVal: "",
        openpref: "tabs",
        htmlindialog: !1,
        automaticallyFill: !0,
        showvault: !1,
        showAcctsInGroups: !0,
        hideContextMenus: !1,
        defaultffid: "0",
        donotoverwritefilledfields: !1,
        showNotifications: !0,
        showGenerateNotifications: !1,
        showFormFillNotifications: !1,
        showSaveSiteNotifications: !1,
        notificationsBottom: !1,
        showNotificationsAfterClick: !1,
        showSaveNotificationBar: !0,
        showChangeNotificationBar: !0,
        usepopupfill: !0,
        showmatchingbadge: !0,
        autoautoVal: 25,
        warninsecureforms: !1,
        infieldPopupEnabled: !1,
        dontfillautocompleteoff: !1,
        pollServerVal: 15,
        clearClipboardSecsVal: 60,
        recentUsedCount: 10,
        searchNotes: !0,
        openloginstart: !1,
        storeLostOTP: !0,
        enablenamedpipes: !0,
        enablenewlogin: !1,
        clearfilledfieldsonlogoff: !1,
        toplevelmatchingsites: !1,
        language: "en_US",
        Icon: 1,
        generate_length: 12,
        generate_upper: !0,
        generate_lower: !0,
        generate_digits: !0,
        generate_special: !1,
        generate_mindigits: 1,
        generate_ambig: !1,
        generate_reqevery: !0,
        generate_pronounceable: !1,
        generate_allcombos: !0,
        generate_advanced: !1,
        gridView: !0,
        compactView: !1,
        "seenVault4.0": !1,
        leftMenuMaximize: !0,
        disablepasswordmanagerasked: !0,
        rememberemail: !0,
        rememberpassword: !1,
        dialogSizePrefs: {},
        tempID: 0,
        lastreprompttime: 0,
        identity: "",
        alwayschooseprofilecc: !1,
        showIntroTutorial: !0
    };
    LPPlatform.adjustPreferenceDefaults(s),
    LPPlatform.isMac() ? (s.generateHkKeyCode = 0,
    s.generateHkMods = "",
    s.recheckHkKeyCode = 0,
    s.recheckHkMods = "",
    s.searchHkKeyCode = 76,
    s.searchHkMods = "shift meta",
    s.nextHkKeyCode = 33,
    s.nextHkMods = "meta",
    s.prevHkKeyCode = 34,
    s.prevHkMods = "meta",
    s.homeHkKeyCode = 0,
    s.homeHkMods = "",
    s.openpopoverHkKeyCode = 220,
    s.openpopoverHkMods = "meta") : (s.generateHkKeyCode = 71,
    s.generateHkMods = "alt",
    s.recheckHkKeyCode = 73,
    s.recheckHkMods = "alt",
    s.searchHkKeyCode = 87,
    s.searchHkMods = "alt",
    s.nextHkKeyCode = 33,
    s.nextHkMods = "alt",
    s.prevHkKeyCode = 34,
    s.prevHkMods = "alt",
    s.homeHkKeyCode = 72,
    s.homeHkMods = "control alt",
    s.openpopoverHkKeyCode = 220,
    s.openpopoverHkMods = "alt");
    var l = function(e, t) {
        var n;
        LPPlatform.setUserPreference(e, t),
        a[e] && LPPlatform.setGlobalPreference(e, t),
        (r[e] || []).forEach(function(e) {
            e(t)
        })
    };
    return {
        getDefault: function(e) {
            switch (typeof e) {
            case "object":
                var t = {};
                for (var n in e)
                    t[n] = s[n];
                return t;
            case "string":
                return s[e];
            default:
                return null
            }
        },
        get: function(e, t) {
            switch (typeof e) {
            case "object":
                var n = {};
                for (var r in e)
                    n[r] = o(r, t ? t[r] : void 0);
                return n;
            case "string":
                return o(e, t);
            default:
                return null
            }
        },
        set: function(e, t) {
            switch (typeof e) {
            case "object":
                for (var n in e)
                    l(n, i(e[n]));
                break;
            default:
                l(e, i(t))
            }
            LPPlatform.writePreferences()
        },
        addListener: function(e, t) {
            var n = r[e] || [];
            n.push(t),
            r[e] = n
        },
        removeListener: function(e, t) {
            var n = r[e] || [];
            r[e] = n.filter(function(e) {
                return e !== t
            })
        }
    }
}();
var __extends = this && this.__extends || function() {
    var r = function(e, t) {
        return (r = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        )(e, t)
    };
    return function(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
}()
  , Migration = function() {
    function e() {}
    return e
}()
  , Migrator = function() {
    function l(e) {
        this.migrations = [],
        this.progress = 0,
        this.hasLinkedAccount = !!l.migrationBackground.getLinkedUsername(),
        this.migrations = e.sort(function(e, t) {
            if (e.version < t.version)
                return -1;
            if (e.version > t.version)
                return 1;
            throw new Error("Duplicate migrations!")
        })
    }
    return l.executeMigrations = function(n, r) {
        var o = this;
        void 0 === r && (r = !1);
        var e = [];
        if (!l.migrationsRunning)
            if ("loading" != document.readyState) {
                (r || l.formfillMigrationBackground.isEnabled()) && e.push(new FormfillAndNotesMigration);
                var i = new l(e);
                this.migrationBackground.getLinkedBlobVersion(function(e) {
                    var t = r ? 0 : o.migrationBackground.getBlobVersion();
                    (r || null !== t && (i.hasPendingMigrations(t) || null !== e && i.hasPendingMigrations(e))) && (l.setMigrationInProgress(),
                    n && i.setProgressCallback(n),
                    !r && null !== e && i.hasPendingMigrations(e) ? i.migrateLinked(e, function() {
                        i.hasPendingMigrations(t) ? i.migrate(t, function() {
                            l.setMigrationFinished()
                        }) : l.setMigrationFinished()
                    }) : i.migrate(t, function() {
                        l.setMigrationFinished()
                    }))
                })
            } else
                document.addEventListener("DOMContentLoaded", function() {
                    l.executeMigrations()
                })
    }
    ,
    Object.defineProperty(l, "migrationBackground", {
        get: function() {
            return l.getBg().MigrationBackground
        },
        enumerable: !0,
        configurable: !0
    }),
    l.getBg = function() {
        return "undefined" != typeof bg ? bg : getBG()
    }
    ,
    l.setMigrationInProgress = function() {
        l.migrationsRunning = !0,
        this.migrationBackground.publishState(!0)
    }
    ,
    l.setMigrationFinished = function() {
        l.migrationsRunning = !1,
        this.migrationBackground.publishState(!1),
        location.reload()
    }
    ,
    Object.defineProperty(l, "formfillMigrationBackground", {
        get: function() {
            return l.getBg().FormfillMigrationBackground
        },
        enumerable: !0,
        configurable: !0
    }),
    l.prototype.setProgressCallback = function(e) {
        this.progressCallback = e
    }
    ,
    l.prototype.hasPendingMigrations = function(e) {
        for (var t = 0, n = this.migrations; t < n.length; t++) {
            var r;
            if (e < n[t].version)
                return !0
        }
        return !1
    }
    ,
    l.prototype.migrateLinked = function(t, n) {
        var r = this;
        if (this.hasLinkedAccount) {
            this.updateProgress();
            for (var e = function(e) {
                if (t < e.version)
                    return e.migrateLinked(function() {
                        r.progress += 100,
                        r.migrateLinked(e.version, n)
                    }, function(e, t) {
                        r.updateProgress(Math.floor(e / Math.max(t, 1) * 100))
                    }),
                    {
                        value: void 0
                    }
            }, o = 0, i = this.migrations; o < i.length; o++) {
                var a, s = e(i[o]);
                if ("object" == typeof s)
                    return s.value
            }
            l.migrationBackground.saveLinkedBlobVersion(t, function() {
                n && n(t)
            })
        } else
            n(t)
    }
    ,
    l.prototype.migrate = function(t, n) {
        var r = this;
        this.updateProgress();
        for (var e = function(e) {
            if (t < e.version)
                return e.migrate(function() {
                    r.progress += 100,
                    r.migrate(e.version, n)
                }, function(e, t) {
                    r.updateProgress(Math.floor(e / Math.max(t, 1) * 100))
                }),
                {
                    value: void 0
                }
        }, o = 0, i = this.migrations; o < i.length; o++) {
            var a, s = e(i[o]);
            if ("object" == typeof s)
                return s.value
        }
        l.migrationBackground.saveBlobVersion(t, function() {
            n && n(t)
        })
    }
    ,
    l.prototype.updateProgress = function(e) {
        void 0 === e && (e = 0),
        this.progressCallback && this.progressCallback(this.progress + Math.min(e, 100), 100 * this.migrations.length * (this.hasLinkedAccount ? 2 : 1))
    }
    ,
    l.migrationsRunning = !1,
    l
}()
  , ObservableState = function() {
    function e() {
        this.stateSubscribers = [],
        this.temporarySubscribers = [],
        this.isRunning = !1,
        this._wasMigration = !1
    }
    return e.prototype.subscribeToState = function(e) {
        e && -1 === this.stateSubscribers.indexOf(e) && (this.stateSubscribers.push(e),
        this.isRunning && e(this.isRunning))
    }
    ,
    e.prototype.subscribeToStateOnce = function(e) {
        e && -1 === this.stateSubscribers.indexOf(e) && this.temporarySubscribers.push(e)
    }
    ,
    e.prototype.wasMigration = function(e) {
        e(this._wasMigration)
    }
    ,
    e.prototype.publishState = function(e) {
        this.isRunning && !e && (this._wasMigration = !0),
        this.isRunning = e;
        for (var t = 0, n = this.stateSubscribers; t < n.length; t++) {
            var r;
            (0,
            n[t])(e)
        }
        var o = this.temporarySubscribers;
        this.temporarySubscribers = [];
        for (var i = 0, a = o; i < a.length; i++) {
            var s;
            (0,
            a[i])(e)
        }
    }
    ,
    e.prototype.setStateWasMigration = function(e) {
        this._wasMigration = e
    }
    ,
    e
}()
  , MigrationBackgroundBase = function(t) {
    function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.targetBlobVersion = 20170404140712,
        e._shouldStartMigration = !1,
        e
    }
    return __extends(e, t),
    Object.defineProperty(e.prototype, "apiUrl", {
        get: function() {
            var e = "/lmiapi";
            return "string" == typeof base_url && (e = base_url.replace(/\/$/, "") + e),
            e
        },
        enumerable: !0,
        configurable: !0
    }),
    e.prototype.setOmarFlagsTrue = function() {
        LPContentScriptFeatures && (LPContentScriptFeatures.omaria = !0,
        LPContentScriptFeatures.ziggy = !0,
        LPContentScriptFeatures.better_generate_password_enabled = !0,
        LPContentScriptFeatures.blob_version_set = !0)
    }
    ,
    e.prototype.getShouldStartMigration = function(e) {
        e && e(this._shouldStartMigration)
    }
    ,
    e.prototype.setShouldStartMigration = function(e) {
        this._shouldStartMigration = e
    }
    ,
    e.prototype.getBlobVersion = function() {
        return LPContentScriptFeatures.blob_version_set ? this.targetBlobVersion : 0
    }
    ,
    e.prototype.hasFormFills = function() {
        return "undefined" != typeof g_formfills && 0 < g_formfills.length
    }
    ,
    e.prototype.hasBeenMigrated = function() {
        return this.getBlobVersion() >= this.targetBlobVersion
    }
    ,
    e.prototype.getLinkedUsername = function() {
        for (var e = 0, t = g_shares; e < t.length; e++) {
            var n = t[e];
            if (void 0 !== n.associative && 1 == n.associative)
                return n.decsharename
        }
        return null
    }
    ,
    e.prototype.saveBlobVersion = function(e, t) {
        this.setOmarFlagsTrue(),
        this.saveVersionRequest(this.apiUrl + "/users/me/blobversion", e, t)
    }
    ,
    e.prototype.saveLinkedBlobVersion = function(e, t) {
        this.setOmarFlagsTrue(),
        this.saveVersionRequest(this.apiUrl + "/users/me/blobversion/linked", e, t)
    }
    ,
    e.prototype.saveProperBlobVersion = function(e, t) {
        this.getLinkedUsername() && this.saveLinkedBlobVersion(e, t),
        this.saveBlobVersion(e, t)
    }
    ,
    e.prototype.shouldShowMigrationNotification = function() {
        return this.hasFormFills() && !this.hasBeenMigrated() && LPContentScriptFeatures.omar_migration_opt_in
    }
    ,
    e.prototype.alertForMigration = function() {
        !this.hasBeenMigrated() && LPContentScriptFeatures.omar_migration_opt_in && (this.hasFormFills() ? this.showMigrationAlert() : (this.setMigrationState(!0),
        this.saveProperBlobVersion(this.targetBlobVersion, function() {
            openvault(!0, !1, !1, function() {})
        })))
    }
    ,
    e.prototype.postponeMigration = function(e) {
        var t = this;
        setTimeout(function() {
            t.alertForMigration()
        }, e)
    }
    ,
    e.prototype.sendSegmentEvent = function(e, t) {
        sendLpImprove(e, t)
    }
    ,
    e.prototype.setMigrationState = function(e) {
        this.setStateWasMigration(e)
    }
    ,
    e
}(ObservableState)
  , MigrationBackgroundWeb = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.init(),
        e
    }
    return __extends(e, t),
    e.prototype.init = function() {
        var e = this;
        "undefined" != typeof Topics && Topics.get(Topics.BLOB_UPDATED).subscribeFirst(function() {
            LPContentScriptFeatures.blob_version_set || e.alertForMigration()
        })
    }
    ,
    e.prototype.getLinkedBlobVersion = function(t) {
        this.getLinkedUsername() ? $.get(this.apiUrl + "/users/me/blobversion/linked").done(function(e) {
            t(e.version)
        }).fail(function() {
            t(null)
        }) : t(null)
    }
    ,
    e.prototype.saveVersionRequest = function(t, n, r) {
        this.getToken(function(e) {
            $.ajax({
                url: t,
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({
                    version: n
                }),
                headers: {
                    "x-csrf-token": e
                },
                success: function() {
                    r && r()
                }
            })
        })
    }
    ,
    e.prototype.getToken = function(t) {
        $.post(this.apiUrl + "/csrf", function(e) {
            t(e)
        })
    }
    ,
    e.prototype.showMigrationAlert = function() {}
    ,
    e
}(MigrationBackgroundBase)
  , MigrationBackgroundExtension = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.init(),
        e
    }
    return __extends(e, t),
    e.prototype.init = function() {
        var e = this;
        "undefined" != typeof Topics && Topics.get(Topics.LOGIN_FINISHED).subscribeFirst(function() {
            LPContentScriptFeatures.blob_version_set || e.alertForMigration()
        })
    }
    ,
    e.prototype.getLinkedBlobVersion = function(n) {
        this.getLinkedUsername() ? LP.lpMakeRequestReallyReal(this.apiUrl + "/users/me/blobversion/linked", "", function(e) {
            if (4 === e.readyState && 200 === e.status) {
                var t = JSON.parse(e.responseText);
                n(t.version)
            } else
                4 === e.readyState && lpmakerequesterror("invalidresponse", {
                    url: e.responseURL
                }, !1)
        }, void 0, {
            method: "GET"
        }) : n(null)
    }
    ,
    e.prototype.getServerBlobVersion = function(n) {
        var r = this;
        this._serverReqCallback = n,
        LP.lpMakeRequestReallyReal(this.apiUrl + "/users/me/blobversion", "", function(e) {
            if (4 === e.readyState && 200 === e.status) {
                var t = JSON.parse(e.responseText);
                n(t.version)
            } else
                4 === e.readyState && setTimeout(r._serverReqCallback, 1e3)
        }, void 0, {
            method: "GET"
        })
    }
    ,
    e.prototype.saveVersionRequest = function(t, n, r) {
        this.getToken(function(e) {
            LP.lpMakeRequestReallyReal(t, JSON.stringify({
                version: n
            }), function(e) {
                4 === e.readyState && 200 === e.status ? r && r() : 4 === e.readyState && lpmakerequesterror("invalidresponse", {
                    url: e.responseURL
                }, !1)
            }, void 0, {
                "x-csrf-token": e,
                "Content-Type": "application/json"
            })
        })
    }
    ,
    e.prototype.getToken = function(t) {
        LP.lpMakeRequestReallyReal(this.apiUrl + "/csrf", "", function(e) {
            4 === e.readyState && 200 === e.status ? t(JSON.parse(e.responseText)) : 4 === e.readyState && lpmakerequesterror("invalidresponse", {
                url: e.responseURL
            }, !1)
        })
    }
    ,
    e.prototype.showMigrationAlert = function() {
        g_badgedata = {
            cmd: "migration"
        },
        "undefined" != typeof drawIconAtRotation && drawIconAtRotation()
    }
    ,
    e
}(MigrationBackgroundBase)
  , FormfillStore = function() {
    function e() {}
    return e.prototype.getLinkedFormfills = function() {
        return this.useShareKey = !0,
        this.decrypt(this.linkedEncryptedFormfills)
    }
    ,
    e.prototype.getFormfills = function() {
        return this.useShareKey = !1,
        this.decrypt(this.encryptedFormfills)
    }
    ,
    e.prototype.decrypt = function(e) {
        for (var t = [], n = 0, r = e; n < r.length; n++) {
            var o = r[n]
              , i = new FormFillType;
            for (var a in o)
                if (o.hasOwnProperty(a)) {
                    var s = void 0;
                    if (i[a] = o[a],
                    "custom_fields" === a)
                        for (var l in i[a] = [],
                        o[a]) {
                            i[a][l] = this.objectAssign({}, o[a][l]);
                            var c = i[a][l];
                            for (var u in c)
                                c[u] && (s = this.decryptString(c[u], !0)) && (c[u] = s)
                        }
                    else
                        i[a] && (s = this.decryptString(i[a], !0)) && (i[a] = s)
                }
            i.decprofilename || (i.decprofilename = i.profilename),
            t.push(i)
        }
        return t
    }
    ,
    e.prototype.objectAssign = function(e, t) {
        for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            if (null != r)
                for (var o in r)
                    Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
        }
        return e
    }
    ,
    e
}()
  , FormFillType = function() {
    function e() {
        this.monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
    return e.prototype.hasSocialSecurityNumber = function() {
        return !!this.ssn
    }
    ,
    e.prototype.hasAddressData = function() {
        return !!(this.title || this.firstname || this.middlename || this.lastname || this.username || this.gender || this.birthday || this.company || this.address1 || this.address2 || this.address3 || this.city || this.county || this.timezone || this.email || this.phone || this.mobilephone || this.evephone || this.fax || this.faxphone || this.eve3lcc || this.mobile3lcc || !this.hasSocialSecurityNumber() && !this.hasPaymentCardData() && !this.hasBankNoteData() && this.notes)
    }
    ,
    e.prototype.hasPaymentCardData = function() {
        return !!(this.ccname || this.ccnum || this.ccstart || this.ccexp || this.cccsc || this.ccissuenum)
    }
    ,
    e.prototype.hasBankNoteData = function() {
        return !!(this.bankname || this.bankroutingnum || this.bankacctnum)
    }
    ,
    e.prototype.hasCustomFields = function() {
        return !!this.custom_fields.length
    }
    ,
    e.prototype.getSerializedPhone = function() {
        return this.phone ? JSON.stringify({
            num: this.phone,
            ext: this.phoneext,
            cc3l: this.phone3lcc
        }) : ""
    }
    ,
    e.prototype.getSerializedEveningPhone = function() {
        return this.evephone ? JSON.stringify({
            num: this.evephone,
            ext: this.eveext,
            cc3l: this.evephone3lcc || this.eve3lcc
        }) : ""
    }
    ,
    e.prototype.getSerializedMobilePhone = function() {
        return this.mobilephone ? JSON.stringify({
            num: this.mobilephone,
            ext: this.mobileext,
            cc3l: this.mobilephone3lcc || this.mobile3lcc
        }) : ""
    }
    ,
    e.prototype.getSerializedFax = function() {
        return this.fax || this.faxphone ? JSON.stringify({
            num: this.fax || this.faxphone,
            ext: this.faxext,
            cc3l: this.fax3lcc
        }) : ""
    }
    ,
    e.prototype.getBirthdayLastpassFormat = function() {
        var e = /([^-]*)-([^-]*)-([^-]*)/g.exec(this.birthday);
        return e && 3 <= e.length ? this.monthNames[Number(e[2])] + "," + e[3] + "," + e[1] : ",,"
    }
    ,
    e.prototype.getCreditCardStartLastpassFormat = function() {
        var e = /([^-]*)-([^-]*)/g.exec(this.ccstart);
        return e && 2 <= e.length ? this.monthNames[Number(e[2])] + "," + e[1] : ","
    }
    ,
    e.prototype.getCreditCardExpireLastpassFormat = function() {
        var e = /([^-]*)-([^-]*)/g.exec(this.ccexp);
        return e && 2 <= e.length ? this.monthNames[Number(e[2])] + "," + e[1] : ","
    }
    ,
    e
}()
  , NoteType = function() {
    function e() {}
    return e
}()
  , FormfillAndNotesMigration = function(t) {
    function e() {
        var e = null !== t && t.apply(this, arguments) || this;
        return e.fieldMaxLength = 50,
        e.migrationQueue = [],
        e.successCallback = function() {}
        ,
        e.progress = -1,
        e.startSegmentEventSent = !1,
        e.noteAdditionHandler = function() {
            e.executeNextMigration()
        }
        ,
        e
    }
    return __extends(e, t),
    Object.defineProperty(e.prototype, "version", {
        get: function() {
            return 20170404140712
        },
        enumerable: !0,
        configurable: !0
    }),
    e.prototype.migrateLinked = function(e, t) {
        this.successCallback = e,
        this.progressCallback = t,
        this.sendStartSegmentEventOnce();
        var n = this.formfillMigrationBackground.getLinkedFormfills();
        this.migrateFormfills(n),
        this.attachMigrationQueueExecutor()
    }
    ,
    e.prototype.migrate = function(e, t) {
        this.successCallback = e,
        this.progressCallback = t,
        this.sendStartSegmentEventOnce();
        var n = this.formfillMigrationBackground.getFormfills();
        this.migrateFormfills(n),
        this.attachMigrationQueueExecutor()
    }
    ,
    e.prototype.sendStartSegmentEventOnce = function() {
        this.startSegmentEventSent || (this.migrationBackground.sendSegmentEvent("migration::formfill::started"),
        this.startSegmentEventSent = !0)
    }
    ,
    e.prototype.migrateFormfills = function(e) {
        for (var t = this, n = function(e) {
            e.hasSocialSecurityNumber() && r.migrationQueue.push(function() {
                t.saveSocialSecurityNumberNote(e)
            }),
            e.hasAddressData() && r.migrationQueue.push(function() {
                t.saveAddressNote(e)
            }),
            e.hasPaymentCardData() && r.migrationQueue.push(function() {
                t.savePaymentCardNote(e)
            }),
            e.hasBankNoteData() && r.migrationQueue.push(function() {
                t.saveBankAccountNote(e)
            }),
            e.hasCustomFields() && r.migrationQueue.push(function() {
                t.saveCustomFields(e)
            })
        }, r = this, o = 0, i = e; o < i.length; o++) {
            var a;
            n(i[o])
        }
    }
    ,
    e.prototype.saveSocialSecurityNumberNote = function(e) {
        var t = {
            group: e.group,
            name: e.decprofilename,
            notetype: this.getNoteTypes().SSN,
            pwprotect: e.pwprotect,
            fav: "0",
            language: e.profilelanguage,
            extra: {
                Name: e.firstname + " " + e.middlename + " " + e.lastname,
                Number: e.ssn,
                Notes: e.notes ? "" + e.notes : ""
            }
        };
        this.saveNote(t, e.ffid)
    }
    ,
    e.prototype.saveAddressNote = function(e) {
        var t = {
            group: e.group,
            name: e.decprofilename,
            notetype: this.getNoteTypes().ADDRESS,
            pwprotect: e.pwprotect,
            fav: "0",
            language: e.profilelanguage,
            extra: {
                Title: e.title,
                "First Name": e.firstname,
                "Middle Name": e.middlename,
                "Last Name": e.lastname,
                Username: e.username,
                Gender: e.gender,
                Birthday: e.getBirthdayLastpassFormat(),
                Company: e.company,
                "Address 1": e.address1,
                "Address 2": e.address2,
                "Address 3": e.address3,
                "City / Town": e.city,
                County: e.county,
                State: e.state,
                "Zip / Postal Code": e.zip,
                Country: e.country,
                Timezone: e.timezone,
                "Email Address": e.email,
                Phone: e.getSerializedPhone(),
                "Evening Phone": e.getSerializedEveningPhone(),
                "Mobile Phone": e.getSerializedMobilePhone(),
                Fax: e.getSerializedFax(),
                Notes: e.notes ? e.notes : ""
            }
        };
        this.saveNote(t, e.ffid)
    }
    ,
    e.prototype.savePaymentCardNote = function(e) {
        var t = {
            group: e.group,
            name: e.decprofilename,
            notetype: this.getNoteTypes().CREDIT,
            pwprotect: e.pwprotect,
            fav: "0",
            language: e.profilelanguage,
            extra: {
                "Name on Card": e.ccname,
                Type: "",
                Number: e.ccnum,
                "Security Code": e.cccsc,
                "Start Date": e.getCreditCardStartLastpassFormat(),
                "Expiration Date": e.getCreditCardExpireLastpassFormat(),
                Notes: (e.notes ? e.notes + "\n" : "") + (e.ccissuenum ? "Issue number: " + e.ccissuenum : "")
            }
        };
        this.saveNote(t, e.ffid)
    }
    ,
    e.prototype.saveBankAccountNote = function(e) {
        var t = {
            group: e.group,
            name: e.decprofilename,
            notetype: this.getNoteTypes().BANK,
            pwprotect: e.pwprotect,
            fav: "0",
            language: e.profilelanguage,
            extra: {
                "Bank Name": e.bankname,
                "Account Type": "",
                "Routing Number": e.bankroutingnum,
                "Account Number": e.bankacctnum,
                "SWIFT Code": "",
                "IBAN Number": "",
                Pin: "",
                "Branch Address": "",
                "Branch Phone": "",
                Notes: e.notes
            }
        };
        this.saveNote(t, e.ffid)
    }
    ,
    e.prototype.saveCustomFields = function(n) {
        for (var r = this, o = this.escape("Formfill " + n.decprofilename), i = [], e = [], t = "", a = {}, s = 0, l = n.custom_fields; s < l.length; s++) {
            var c = l[s]
              , u = this.escape(c.text);
            u.length > this.fieldMaxLength && (u = u.substring(0, this.fieldMaxLength)),
            u = u || "empty",
            -1 !== c.text.indexOf("\n") || -1 !== c.value.indexOf("\n") ? t += c.text + ":" + c.value + "\n" : -1 === e.indexOf(u) && (i.push({
                text: u,
                type: "text",
                options: null
            }),
            a[u] = c.value,
            e.push(u))
        }
        "" !== t && (i.push({
            text: "Notes",
            type: "textarea",
            options: null
        }),
        a.Notes = t),
        this.formfillMigrationBackground.createCustomNoteType(o, i, function(e) {
            var t = {
                group: n.group,
                name: n.decprofilename,
                notetype: "Custom_" + e,
                pwprotect: n.pwprotect,
                fav: "0",
                language: n.profilelanguage,
                extra: a,
                template: JSON.stringify({
                    id: e,
                    title: o,
                    fields: i
                })
            };
            r.saveNote(t, n.ffid)
        })
    }
    ,
    e.prototype.escape = function(e) {
        return e.replace(/&/g, "").replace(/</g, "").replace(/>/g, "").replace(/\(/g, "").replace(/\)/g, "").replace(/;/g, "").replace(/:/g, "").replace(/~/g, "").replace(/`/g, "").replace(/"/g, "").replace(/'/g, "")
    }
    ,
    e.prototype.saveNote = function(e, t) {
        "undefined" != typeof Note ? this.saveInForeground(e, t) : this.saveInBackground(e, t)
    }
    ,
    e.prototype.saveInForeground = function(e, t) {
        var n = e.group;
        n = n || Strings.Consts.NONE_GROUP;
        var r = LPProxy.getGroupByName(n);
        if (!r && n) {
            var o = LPProxy.getExistingGroupParent(n);
            r = new DummyGroup(n,o ? o.getSharedGroup() : null)
        }
        var i = new Note;
        i.add = this.getNotePatchedAddFunction(t),
        i.addFromDialog(e, r, {
            source: "vault"
        })
    }
    ,
    e.prototype.saveInBackground = function(e, t) {
        var n = this;
        void 0 === t && (t = "0"),
        this.formfillMigrationBackground.saveNote(e, function(e) {
            e && "0" !== t && n.saveIdentityInfo(e.aid, t),
            n.noteAdditionHandler()
        }, t)
    }
    ,
    e.prototype.saveIdentityInfo = function(e, t) {
        for (var n, r = 0, o = LPProxy.getIdentities(); r < o.length; r++) {
            var i = o[r], a;
            if (i && i.ffids)
                i.ffids.split(",").includes(t) && (i.aids = i.aids ? i.aids + "," + e : e,
                LPRequest.makeUpdateRequest(LPProxy.saveIdentity, {
                    params: {
                        identity: i
                    },
                    success: function() {}
                }))
        }
    }
    ,
    e.prototype.getNotePatchedAddFunction = function(c) {
        return function(a, e) {
            var s, l;
            l = (s = this)._data.attacharraychanges,
            LPRequest.makeUpdateRequest(LPProxy.addNote, {
                parameters: [s, a, e],
                success: function(e) {
                    s.update(e, a, l),
                    LPProxy.addItem(s),
                    Topics.get(Topics.NOTE_ADDED).publish(s, a);
                    var t = bg.get("g_identities");
                    if (t)
                        for (var n = 0, r = t; n < r.length; n++) {
                            var o = r[n], i;
                            o && o.ffids && o.ffids.split(",").includes(c) && (o.aids = o.aids ? o.aids + "," + e.aid : e.aid,
                            LPRequest.makeUpdateRequest(LPProxy.saveIdentity, {
                                params: {
                                    identity: o
                                },
                                success: function() {}
                            }))
                        }
                }
            })
        }
    }
    ,
    e.prototype.getNoteTypes = function() {
        return {
            ADDRESS: "Address",
            BANK: "Bank Account",
            CREDIT: "Credit Card",
            GENERIC: "Generic",
            SSN: "Social Security"
        }
    }
    ,
    e.prototype.attachMigrationQueueExecutor = function() {
        Topics.get(Topics.NOTE_ADDED).subscribe(this.noteAdditionHandler),
        this.progressMax = this.migrationQueue.length,
        this.executeNextMigration()
    }
    ,
    e.prototype.executeNextMigration = function() {
        var e;
        (this.progress += 1,
        this.progressCallback && this.progressCallback(this.progress, this.progressMax),
        this.migrationQueue.length) ? this.migrationQueue.pop()() : (Topics.get(Topics.NOTE_ADDED).unsubscribe(this.noteAdditionHandler),
        this.migrationBackground.sendSegmentEvent("migration::formfill::completed"),
        this.successCallback())
    }
    ,
    e.prototype.getBg = function() {
        return "undefined" != typeof bg ? bg : getBG()
    }
    ,
    Object.defineProperty(e.prototype, "formfillMigrationBackground", {
        get: function() {
            return this.getBg().FormfillMigrationBackground
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(e.prototype, "migrationBackground", {
        get: function() {
            return this.getBg().MigrationBackground
        },
        enumerable: !0,
        configurable: !0
    }),
    e
}(Migration)
  , FormfillMigrationBackgroundWeb = function(t) {
    function e() {
        var e = t.call(this) || this;
        return e.apiUrl = "/lmiapi",
        "string" == typeof base_url && (e.apiUrl = base_url.replace(/\/$/, "") + e.apiUrl),
        e
    }
    return __extends(e, t),
    e.prototype.isEnabled = function() {
        return LPContentScriptFeatures.migration_opt_in || LPContentScriptFeatures.omar_migration_opt_in
    }
    ,
    e.prototype.createCustomNoteType = function(t, n, r) {
        var o = this;
        this.getToken(function(e) {
            $.ajax({
                url: o.apiUrl + "/note-templates",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                headers: {
                    "X-CSRF-TOKEN": e
                },
                data: JSON.stringify({
                    title: t,
                    method: "web",
                    fields: n
                }),
                success: function(e) {
                    r(e.id)
                }
            })
        })
    }
    ,
    e.prototype.saveNote = function(e, t, n) {
        throw new Error("Migrate in the foreground!")
    }
    ,
    Object.defineProperty(e.prototype, "linkedEncryptedFormfills", {
        get: function() {
            return g_formfills.filter(function(e) {
                return !!e.sharefolderid
            })
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(e.prototype, "encryptedFormfills", {
        get: function() {
            return g_formfills.filter(function(e) {
                return !e.sharefolderid
            })
        },
        enumerable: !0,
        configurable: !0
    }),
    e.prototype.decryptString = function(e, t) {
        var n = void 0;
        return this.useShareKey && (n = this.getShareKey()),
        lpmdec(e, t, n)
    }
    ,
    e.prototype.getToken = function(t) {
        $.post(this.apiUrl + "/csrf", function(e) {
            t(e)
        })
    }
    ,
    e.prototype.getShareKey = function() {
        for (var e = 0, t = g_shares; e < t.length; e++) {
            var n = t[e];
            if (void 0 !== n.associative && 1 == n.associative)
                return n.key
        }
    }
    ,
    e
}(FormfillStore)
  , FormfillMigrationBackgroundExtension = function(e) {
    function t() {
        return null !== e && e.apply(this, arguments) || this
    }
    return __extends(t, e),
    Object.defineProperty(t.prototype, "apiUrl", {
        get: function() {
            var e = "/lmiapi";
            return "string" == typeof base_url && (e = base_url.replace(/\/$/, "") + e),
            e
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.isEnabled = function() {
        return LPContentScriptFeatures.migration_opt_in || LPContentScriptFeatures.omar_migration_opt_in
    }
    ,
    t.prototype.createCustomNoteType = function(n, r, o) {
        var i = this;
        this.getToken(function(e) {
            var t = {
                title: n,
                method: "web",
                fields: r
            };
            LP.lpMakeRequestReallyReal(i.apiUrl + "/note-templates", JSON.stringify(t), function(e) {
                4 === e.readyState && 200 === e.status ? o(JSON.parse(e.responseText).id) : 4 === e.readyState && lpmakerequesterror("invalidresponse", {
                    url: e.responseURL
                }, !1)
            }, void 0, {
                "x-csrf-token": e,
                "Content-Type": "application/json"
            })
        })
    }
    ,
    t.prototype.saveNote = function(e, t, n) {
        var r = {
            action: "",
            aid: "0",
            basic_auth: "0",
            captcha_id: "",
            custom_js: "",
            extra: "",
            fields: [],
            group: "",
            fiid: "",
            getpw: !1,
            individualshare: !1,
            last_touch: "0",
            method: "",
            newvalues: [],
            realm_data: "",
            sharedfromuid: "",
            submit_id: "",
            urid: "0",
            fav: "0",
            username: "",
            password: "",
            sn: 1,
            url: "http://sn"
        }
          , o = this.localKey;
        e.encname = lpmenc(e.name, !0, o);
        var i = "NoteType:" + e.notetype + "\nLanguage:" + (e.language ? e.language : "en-US");
        for (var a in e.extra)
            i += "\n" + a + ":" + e.extra[a];
        for (var s in e.extra = lpmenc(i, !0, o),
        r)
            void 0 === e[s] && (e[s] = r[s]);
        e.group && (e.sharedfolderid = this.getShareId()),
        this.saveSite(e, t)
    }
    ,
    Object.defineProperty(t.prototype, "linkedEncryptedFormfills", {
        get: function() {
            return g_formfills.filter(function(e) {
                return !!e.sharefolderid
            })
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "encryptedFormfills", {
        get: function() {
            return g_formfills.filter(function(e) {
                return !e.sharefolderid
            })
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.decryptString = function(e, t) {
        var n = void 0;
        return this.useShareKey && (n = this.getShareKey()),
        lpmdec(e, t, n)
    }
    ,
    t.prototype.saveSite = function(e, t) {
        var n = this
          , r = this.createPostData(e);
        saveSite(this.serializePostData(r), e, t, function() {
            setTimeout(function() {
                n.saveSite(e, t)
            }, 3e4)
        })
    }
    ,
    t.prototype.createPostData = function(e) {
        var t = {
            extjs: 1,
            localupdate: 1,
            ajax: 1,
            source: "vault"
        };
        return t.aid = e.aid,
        t.name = lpenc(e.name, this.localKey),
        t.extra = crypto_btoa(e.extra),
        e.pwprotect && (t.pwprotect = "on"),
        "1" === e.fav && (t.fav = "on"),
        e.sharedfolderid && (t.sharedfolderid = e.sharedfolderid,
        t.grouping = ""),
        t.url = AES.url2hex(e.url),
        t.username = "",
        t.password = "",
        e.template && (t.template = e.template),
        t.hexName = AES.url2hex(e.name),
        t.notetype = e.notetype,
        t
    }
    ,
    t.prototype.serializePostData = function(e) {
        var t = [];
        for (var n in e)
            t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&").replace(/%20/g, "+")
    }
    ,
    Object.defineProperty(t.prototype, "localKey", {
        get: function() {
            return this.useShareKey ? this.getShareKey() : g_local_key
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.getToken = function(t) {
        LP.lpMakeRequestReallyReal(this.apiUrl + "/csrf", "", function(e) {
            4 === e.readyState && 200 === e.status ? t(JSON.parse(e.responseText)) : 4 === e.readyState && lpmakerequesterror("invalidresponse", {
                url: e.responseURL
            }, !1)
        })
    }
    ,
    t.prototype.getShareKey = function() {
        for (var e = 0, t = g_shares; e < t.length; e++) {
            var n = t[e];
            if (void 0 !== n.associative && 1 == n.associative)
                return n.key
        }
        return ""
    }
    ,
    t.prototype.getShareId = function() {
        for (var e = 0, t = g_shares; e < t.length; e++) {
            var n = t[e];
            if (void 0 !== n.associative && 1 == n.associative)
                return n.id
        }
        return ""
    }
    ,
    t
}(FormfillStore);
MigrationBackground = new MigrationBackgroundExtension,
FormfillMigrationBackground = new FormfillMigrationBackgroundExtension,
Feature = {
    isEnabled: function(e, t, n, r) {
        var o = "lmiapi/feature-switch/is-enabled/" + e + "/" + t;
        LPServer.lmiapi.jsonRequest({
            url: o,
            type: "GET",
            data: {},
            success: function(e) {
                n(e.enabled)
            },
            error: function(e) {
                "function" == typeof r && r(e)
            }
        })
    }
};
var g_ischrome = !0
  , g_issafari = !1
  , g_isedge = !1
  , g_issafari_appext = !1
  , g_isfirefoxsdk = !1
  , g_isfirefoxwebext = !1
  , g_isie = !1
  , g_isopera = !1
  , g_ismaxthon = !1
  , g_isfirefox = !1
  , g_isdebug = !1
  , g_dopplastpass = !1
  , g_do_native_messaging = !0
  , g_disable_alternative_server = !1
  , pollserver_url = this.lp_base = original_base = loglogin_url = base_url = "https://lastpass.com/"
  , alp_url = "https://accounts.lastpass.com"
  , build_date = "Mon Aug 10 2020 14:00:36 GMT+0200 (Central European Summer Time)"
  , g_cpwbot = !0
  , g_cpwbot_batch = !0;
