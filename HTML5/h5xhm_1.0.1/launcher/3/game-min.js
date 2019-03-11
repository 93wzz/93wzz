var egret;
(function (e) {
    var t = function () {
        function e() {
            this._hashCode = e.hashCount++
        }

        Object.defineProperty(e.prototype, "hashCode", {
            get: function () {
                return this._hashCode
            }, enumerable: !0, configurable: !0
        });
        e.hashCount = 1;
        return e
    }();
    e.HashObject = t;
    t.prototype.__class__ = "egret.HashObject"
})(egret || (egret = {}));
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t(t) {
            void 0 === t && (t = 300);
            e.call(this);
            this.objectPool = [];
            this._length = 0;
            1 > t && (t = 1);
            this.autoDisposeTime = t;
            this.frameCount = 0
        }

        __extends(t, e);
        t.prototype._checkFrame = function () {
            this.frameCount--;
            0 >= this.frameCount && this.dispose()
        };
        Object.defineProperty(t.prototype, "length", {
            get: function () {
                return this._length
            }, enumerable: !0, configurable: !0
        });
        t.prototype.push = function (e) {
            var n = this.objectPool;
            -1 == n.indexOf(e) && (n.push(e), this._length++, 0 == this.frameCount && (this.frameCount = this.autoDisposeTime, t._callBackList.push(this)))
        };
        t.prototype.pop = function () {
            if (0 == this._length) return null;
            this._length--;
            return this.objectPool.pop()
        };
        t.prototype.dispose = function () {
            0 < this._length && (this.objectPool = [], this._length = 0);
            this.frameCount = 0;
            var e = t._callBackList, n = e.indexOf(this);
            -1 != n && e.splice(n, 1)
        };
        t._callBackList = [];
        return t
    }(e.HashObject);
    e.Recycler = t;
    t.prototype.__class__ = "egret.Recycler"
})(egret || (egret = {}));
(function (e) {
    e.__START_TIME;
    e.getTimer = function () {
        return Date.now() - e.__START_TIME
    }
})(egret || (egret = {}));
(function (e) {
    e.__callLaterFunctionList = [];
    e.__callLaterThisList = [];
    e.__callLaterArgsList = [];
    e.callLater = function (t, n) {
        for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        e.__callLaterFunctionList.push(t);
        e.__callLaterThisList.push(n);
        e.__callLaterArgsList.push(r)
    };
    e.__callAsyncFunctionList = [];
    e.__callAsyncThisList = [];
    e.__callAsyncArgsList = [];
    e.__callAsync = function (t, n) {
        for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        e.__callAsyncFunctionList.push(t);
        e.__callAsyncThisList.push(n);
        e.__callAsyncArgsList.push(r)
    }
})(egret || (egret = {}));
var egret_dom;
(function (e) {
    function t() {
        for (var e = document.createElement("div").style, t = ["t", "webkitT", "msT", "MozT", "OT"], n = 0; n < t.length; n++) if (t[n] + "ransform" in e) return t[n];
        return t[0]
    }

    e.header = "";
    e.getHeader = t;
    e.getTrans = function (n) {
        "" == e.header && (e.header = t());
        return e.header + n.substring(1, n.length)
    }
})(egret_dom || (egret_dom = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r) {
            void 0 === n && (n = !1);
            void 0 === r && (r = !1);
            t.call(this);
            this._eventPhase = 2;
            this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1;
            this.isNew = !0;
            this._type = e;
            this._bubbles = n;
            this._cancelable = r
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "type", {
            get: function () {
                return this._type
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "bubbles", {
            get: function () {
                return this._bubbles
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "cancelable", {
            get: function () {
                return this._cancelable
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "eventPhase", {
            get: function () {
                return this._eventPhase
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "currentTarget", {
            get: function () {
                return this._currentTarget
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "target", {
            get: function () {
                return this._target
            }, enumerable: !0, configurable: !0
        });
        n.prototype.isDefaultPrevented = function () {
            return this._isDefaultPrevented
        };
        n.prototype.preventDefault = function () {
            this._cancelable && (this._isDefaultPrevented = !0)
        };
        n.prototype.stopPropagation = function () {
            this._bubbles && (this._isPropagationStopped = !0)
        };
        n.prototype.stopImmediatePropagation = function () {
            this._bubbles && (this._isPropagationImmediateStopped = !0)
        };
        n.prototype._reset = function () {
            this.isNew ? this.isNew = !1 : (this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1, this._currentTarget = this._target = null, this._eventPhase = 2)
        };
        n._dispatchByTarget = function (t, n, r, i, s, o) {
            void 0 === s && (s = !1);
            void 0 === o && (o = !1);
            var u = t.eventRecycler;
            u || (u = t.eventRecycler = new e.Recycler);
            var a = u.pop();
            a ? a._type = r : a = new t(r);
            a._bubbles = s;
            a._cancelable = o;
            if (i) for (var f in i) a[f] = i[f], null !== a[f] && (i[f] = null);
            t = n.dispatchEvent(a);
            u.push(a);
            return t
        };
        n._getPropertyData = function (e) {
            var t = e._props;
            t || (t = e._props = {});
            return t
        };
        n.dispatchEvent = function (e, t, r, i) {
            void 0 === r && (r = !1);
            var s = n._getPropertyData(n);
            i && (s.data = i);
            n._dispatchByTarget(n, e, t, s, r)
        };
        n.ADDED_TO_STAGE = "addedToStage";
        n.REMOVED_FROM_STAGE = "removedFromStage";
        n.ADDED = "added";
        n.REMOVED = "removed";
        n.COMPLETE = "complete";
        n.ENTER_FRAME = "enterFrame";
        n.RENDER = "render";
        n.FINISH_RENDER = "finishRender";
        n.FINISH_UPDATE_TRANSFORM = "finishUpdateTransform";
        n.LEAVE_STAGE = "leaveStage";
        n.RESIZE = "resize";
        n.CHANGE = "change";
        n.ACTIVATE = "activate";
        n.DEACTIVATE = "deactivate";
        n.CLOSE = "close";
        n.CONNECT = "connect";
        return n
    }(e.HashObject);
    e.Event = t;
    t.prototype.__class__ = "egret.Event"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t(t, n, r) {
            void 0 === n && (n = !1);
            void 0 === r && (r = !1);
            e.call(this, t, n, r);
            this._status = 0
        }

        __extends(t, e);
        Object.defineProperty(t.prototype, "status", {
            get: function () {
                return this._status
            }, enumerable: !0, configurable: !0
        });
        t.dispatchHTTPStatusEvent = function (e, n) {
            null == t.httpStatusEvent && (t.httpStatusEvent = new t(t.HTTP_STATUS));
            t.httpStatusEvent._status = n;
            e.dispatchEvent(t.httpStatusEvent)
        };
        t.HTTP_STATUS = "httpStatus";
        t.httpStatusEvent = null;
        return t
    }(e.Event);
    e.HTTPStatusEvent = t;
    t.prototype.__class__ = "egret.HTTPStatusEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r) {
            void 0 === n && (n = !1);
            void 0 === r && (r = !1);
            t.call(this, e, n, r)
        }

        __extends(n, t);
        n.dispatchIOErrorEvent = function (t) {
            e.Event._dispatchByTarget(n, t, n.IO_ERROR)
        };
        n.IO_ERROR = "ioError";
        return n
    }(e.Event);
    e.IOErrorEvent = t;
    t.prototype.__class__ = "egret.IOErrorEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r, i, s, o, u, a, f, l) {
            void 0 === n && (n = !0);
            void 0 === r && (r = !0);
            void 0 === i && (i = 0);
            void 0 === s && (s = 0);
            void 0 === o && (o = 0);
            void 0 === u && (u = !1);
            void 0 === a && (a = !1);
            void 0 === l && (l = !1);
            t.call(this, e, n, r);
            this._stageY = this._stageX = 0;
            this.touchPointID = i;
            this._stageX = s;
            this._stageY = o;
            this.ctrlKey = u;
            this.altKey = a;
            this.touchDown = l
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "stageX", {
            get: function () {
                return this._stageX
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "stageY", {
            get: function () {
                return this._stageY
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "localX", {
            get: function () {
                return this._currentTarget.globalToLocal(this._stageX, this._stageY, e.Point.identity).x
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "localY", {
            get: function () {
                return this._currentTarget.globalToLocal(this._stageX, this._stageY, e.Point.identity).y
            }, enumerable: !0, configurable: !0
        });
        n.dispatchTouchEvent = function (t, r, i, s, o, u, f, l, h) {
            void 0 === i && (i = 0);
            void 0 === s && (s = 0);
            void 0 === o && (o = 0);
            void 0 === u && (u = !1);
            void 0 === f && (f = !1);
            void 0 === l && (l = !1);
            void 0 === h && (h = !1);
            var p = e.Event._getPropertyData(n);
            p.touchPointID = i;
            p._stageX = s;
            p._stageY = o;
            p.ctrlKey = u;
            p.altKey = f;
            p.shiftKey = l;
            p.touchDown = h;
            e.Event._dispatchByTarget(n, t, r, p, !0, !0)
        };
        n.TOUCH_TAP = "touchTap";
        n.TOUCH_MOVE = "touchMove";
        n.TOUCH_BEGIN = "touchBegin";
        n.TOUCH_END = "touchEnd";
        n.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        n.TOUCH_ROLL_OUT = "touchRollOut";
        n.TOUCH_ROLL_OVER = "touchRollOver";
        n.TOUCH_OUT = "touchOut";
        n.TOUCH_OVER = "touchOver";
        return n
    }(e.Event);
    e.TouchEvent = t;
    t.prototype.__class__ = "egret.TouchEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r) {
            void 0 === n && (n = !1);
            void 0 === r && (r = !1);
            t.call(this, e, n, r)
        }

        __extends(n, t);
        n.dispatchTimerEvent = function (t, r) {
            e.Event._dispatchByTarget(n, t, r)
        };
        n.TIMER = "timer";
        n.TIMER_COMPLETE = "timerComplete";
        return n
    }(e.Event);
    e.TimerEvent = t;
    t.prototype.__class__ = "egret.TimerEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r, i, s) {
            void 0 === n && (n = !1);
            void 0 === r && (r = !1);
            void 0 === i && (i = 0);
            void 0 === s && (s = 0);
            t.call(this, e, n, r);
            this.bytesLoaded = i;
            this.bytesTotal = s
        }

        __extends(n, t);
        n.dispatchProgressEvent = function (t, r, i, s) {
            void 0 === i && (i = 0);
            void 0 === s && (s = 0);
            e.Event._dispatchByTarget(n, t, r, {bytesLoaded: i, bytesTotal: s})
        };
        n.PROGRESS = "progress";
        n.SOCKET_DATA = "socketData";
        return n
    }(e.Event);
    e.ProgressEvent = t;
    t.prototype.__class__ = "egret.ProgressEvent"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.CAPTURING_PHASE = 1;
        e.AT_TARGET = 2;
        e.BUBBLING_PHASE = 3;
        return e
    }();
    e.EventPhase = t;
    t.prototype.__class__ = "egret.EventPhase"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e) {
            void 0 === e && (e = null);
            t.call(this);
            this._eventTarget = e ? e : this
        }

        __extends(n, t);
        n.prototype.addEventListener = function (t, n, r, i, s) {
            void 0 === i && (i = !1);
            void 0 === s && (s = 0);
            "undefined" === typeof i && (i = !1);
            "undefined" === typeof s && (s = 0);
            n || e.Logger.fatal("addEventListener侦听函数不能为空");
            i ? (this._captureEventsMap || (this._captureEventsMap = {}), i = this._captureEventsMap) : (this._eventsMap || (this._eventsMap = {}), i = this._eventsMap);
            var o = i[t];
            o || (o = i[t] = []);
            this._insertEventBin(o, n, r, s)
        };
        n.prototype._insertEventBin = function (e, t, n, r, i) {
            void 0 === i && (i = void 0);
            for (var s = -1, o = e.length, u = 0; u < o; u++) {
                var a = e[u];
                if (a.listener === t && a.thisObject === n && a.display === i) return !1;
                -1 == s && a.priority < r && (s = u)
            }
            t = {listener: t, thisObject: n, priority: r};
            i && (t.display = i);
            -1 != s ? e.splice(s, 0, t) : e.push(t);
            return !0
        };
        n.prototype.removeEventListener = function (e, t, n, r) {
            void 0 === r && (r = !1);
            if (r = r ? this._captureEventsMap : this._eventsMap) {
                var i = r[e];
                i && (this._removeEventBin(i, t, n), 0 == i.length && delete r[e])
            }
        };
        n.prototype._removeEventBin = function (e, t, n, r) {
            void 0 === r && (r = void 0);
            for (var i = e.length, s = 0; s < i; s++) {
                var o = e[s];
                if (o.listener === t && o.thisObject === n && o.display === r) return e.splice(s, 1), !0
            }
            return !1
        };
        n.prototype.hasEventListener = function (e) {
            return this._eventsMap && this._eventsMap[e] || this._captureEventsMap && this._captureEventsMap[e]
        };
        n.prototype.willTrigger = function (e) {
            return this.hasEventListener(e)
        };
        n.prototype.dispatchEvent = function (e) {
            e._reset();
            e._target = this._eventTarget;
            e._currentTarget = this._eventTarget;
            return this._notifyListener(e)
        };
        n.prototype._notifyListener = function (e) {
            var t = 1 == e._eventPhase ? this._captureEventsMap : this._eventsMap;
            if (!t) return !0;
            t = t[e._type];
            if (!t) return !0;
            var n = t.length;
            if (0 == n) return !0;
            for (var t = t.concat(), r = 0; r < n; r++) {
                var i = t[r];
                i.listener.call(i.thisObject, e);
                if (e._isPropagationImmediateStopped) break
            }
            return !e._isDefaultPrevented
        };
        n.prototype.dispatchEventWith = function (t, n, r) {
            void 0 === n && (n = !1);
            e.Event.dispatchEvent(this, t, n, r)
        };
        return n
    }(e.HashObject);
    e.EventDispatcher = t;
    t.prototype.__class__ = "egret.EventDispatcher"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.reuseEvent = new e.Event("")
        }

        __extends(n, t);
        n.prototype.run = function () {
            e.Ticker.getInstance().run();
            e.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
            e.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
            this.touchContext.run()
        };
        n.prototype.renderLoop = function (t) {
            if (0 < e.__callLaterFunctionList.length) {
                var r = e.__callLaterFunctionList;
                e.__callLaterFunctionList = [];
                var i = e.__callLaterThisList;
                e.__callLaterThisList = [];
                var s = e.__callLaterArgsList;
                e.__callLaterArgsList = []
            }
            t = this.stage;
            var o = n.cachedEvent;
            o._type = e.Event.RENDER;
            this.dispatchEvent(o);
            e.Stage._invalidateRenderFlag && (this.broadcastRender(), e.Stage._invalidateRenderFlag = !1);
            r && this.doCallLaterList(r, i, s);
            0 < e.__callAsyncFunctionList.length && this.doCallAsyncList();
            r = this.rendererContext;
            r.onRenderStart();
            r.clearScreen();
            t._updateTransform();
            o._type = e.Event.FINISH_UPDATE_TRANSFORM;
            this.dispatchEvent(o);
            t._draw(r);
            o._type = e.Event.FINISH_RENDER;
            this.dispatchEvent(o);
            r.onRenderFinish()
        };
        n.prototype.broadcastEnterFrame = function (t) {
            t = this.reuseEvent;
            t._type = e.Event.ENTER_FRAME;
            this.dispatchEvent(t);
            for (var n = e.DisplayObject._enterFrameCallBackList.concat(), r = n.length, i = 0; i < r; i++) {
                var s = n[i];
                t._target = s.display;
                t._currentTarget = s.display;
                s.listener.call(s.thisObject, t)
            }
            n = e.Recycler._callBackList;
            for (i = n.length - 1; 0 <= i; i--) n[i]._checkFrame()
        };
        n.prototype.broadcastRender = function () {
            var t = this.reuseEvent;
            t._type = e.Event.RENDER;
            for (var n = e.DisplayObject._renderCallBackList.concat(), r = n.length, i = 0; i < r; i++) {
                var s = n[i], o = s.display;
                t._target = o;
                t._currentTarget = o;
                s.listener.call(s.thisObject, t)
            }
        };
        n.prototype.doCallLaterList = function (e, t, n) {
            for (var r = e.length, i = 0; i < r; i++) {
                var s = e[i];
                null != s && s.apply(t[i], n[i])
            }
        };
        n.prototype.doCallAsyncList = function () {
            var t = e.__callAsyncFunctionList.concat(), n = e.__callAsyncThisList.concat(),
                r = e.__callAsyncArgsList.concat();
            e.__callAsyncFunctionList.length = 0;
            e.__callAsyncThisList.length = 0;
            for (var i = e.__callAsyncArgsList.length = 0; i < t.length; i++) {
                var s = t[i];
                null != s && s.apply(n[i], r[i])
            }
        };
        n.DEVICE_PC = "web";
        n.DEVICE_MOBILE = "native";
        n.RUNTIME_HTML5 = "runtime_html5";
        n.RUNTIME_NATIVE = "runtime_native";
        n.cachedEvent = new e.Event("");
        return n
    }(e.EventDispatcher);
    e.MainContext = t;
    t.prototype.__class__ = "egret.MainContext"
})(egret || (egret = {}));
var testDeviceType = function () {
    if (!this.navigator) return !0;
    var e = navigator.userAgent.toLowerCase();
    return -1 != e.indexOf("mobile") || -1 != e.indexOf("android")
}, testRuntimeType = function () {
    return this.navigator ? !0 : !1
};
egret.MainContext.instance = new egret.MainContext;
egret.MainContext.deviceType = testDeviceType() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;
egret.MainContext.runtimeType = testRuntimeType() ? egret.MainContext.RUNTIME_HTML5 : egret.MainContext.RUNTIME_NATIVE;
delete testDeviceType;
delete testRuntimeType;
(function (e) {
    var t = function () {
        function t() {
            this._tick = this._preDrawCount = this._updateTransformPerformanceCost = this._renderPerformanceCost = this._logicPerformanceCost = this._lastTime = 0;
            this._maxDeltaTime = 500;
            this._totalDeltaTime = 0
        }

        t.getInstance = function () {
            null == t.instance && (t.instance = new t);
            return t.instance
        };
        t.prototype.run = function () {
            e.Ticker.getInstance().register(this.update, this);
            null == this._txt && (this._txt = new e.TextField, this._txt.size = 28, this._txt.multiline = !0, e.MainContext.instance.stage.addChild(this._txt));
            var t = e.MainContext.instance;
            t.addEventListener(e.Event.ENTER_FRAME, this.onEnterFrame, this);
            t.addEventListener(e.Event.RENDER, this.onStartRender, this);
            t.addEventListener(e.Event.FINISH_RENDER, this.onFinishRender, this);
            t.addEventListener(e.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this)
        };
        t.prototype.onEnterFrame = function (t) {
            this._lastTime = e.getTimer()
        };
        t.prototype.onStartRender = function (t) {
            t = e.getTimer();
            this._logicPerformanceCost = t - this._lastTime;
            this._lastTime = t
        };
        t.prototype.onFinishUpdateTransform = function (t) {
            t = e.getTimer();
            this._updateTransformPerformanceCost = t - this._lastTime;
            this._lastTime = t
        };
        t.prototype.onFinishRender = function (t) {
            t = e.getTimer();
            this._renderPerformanceCost = t - this._lastTime;
            this._lastTime = t
        };
        t.prototype.update = function (t) {
            this._tick++;
            this._totalDeltaTime += t;
            if (this._totalDeltaTime >= this._maxDeltaTime) {
                t = (this._preDrawCount - 1).toString();
                var n = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() + "," + Math.ceil(e.MainContext.instance.rendererContext.renderCost).toString();
                this._txt.text = "draw:" + t + "\ncost:" + n + "\nFPS:" + Math.floor(1e3 * this._tick / this._totalDeltaTime).toString();
                this._tick = this._totalDeltaTime = 0
            }
            this._preDrawCount = 0
        };
        t.prototype.onDrawImage = function () {
            this._preDrawCount++
        };
        return t
    }();
    e.Profiler = t;
    t.prototype.__class__ = "egret.Profiler"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.apply(this, arguments);
            this._timeScale = 1;
            this._paused = !1;
            this.callBackList = []
        }

        __extends(n, t);
        n.prototype.run = function () {
            e.__START_TIME = (new Date).getTime();
            e.MainContext.instance.deviceContext.executeMainLoop(this.update, this)
        };
        n.prototype.update = function (e) {
            var t = this.callBackList.concat(), n = t.length;
            e *= this._timeScale;
            e *= this._timeScale;
            for (var r = 0; r < n; r++) {
                var i = t[r];
                i.listener.call(i.thisObject, e)
            }
        };
        n.prototype.register = function (e, t, n) {
            void 0 === n && (n = 0);
            this._insertEventBin(this.callBackList, e, t, n)
        };
        n.prototype.unregister = function (e, t) {
            this._removeEventBin(this.callBackList, e, t)
        };
        n.prototype.setTimeout = function (t, n, r) {
            for (var i = [], s = 3; s < arguments.length; s++) i[s - 3] = arguments[s];
            e.Logger.warning("Ticker#setTimeout方法即将废弃,请使用egret.setTimeout");
            e.setTimeout.apply(null, [t, n, r].concat(i))
        };
        n.prototype.setTimeScale = function (e) {
            this._timeScale = e
        };
        n.prototype.getTimeScale = function () {
            return this._timeScale
        };
        n.prototype.pause = function () {
            this._paused = !0
        };
        n.prototype.resume = function () {
            this._paused = !1
        };
        n.getInstance = function () {
            null == n.instance && (n.instance = new n);
            return n.instance
        };
        return n
    }(e.EventDispatcher);
    e.Ticker = t;
    t.prototype.__class__ = "egret.Ticker"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.LEFT = "left";
        e.RIGHT = "right";
        e.CENTER = "center";
        e.JUSTIFY = "justify";
        e.CONTENT_JUSTIFY = "contentJustify";
        return e
    }();
    e.HorizontalAlign = t;
    t.prototype.__class__ = "egret.HorizontalAlign"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.TOP = "top";
        e.BOTTOM = "bottom";
        e.MIDDLE = "middle";
        e.JUSTIFY = "justify";
        e.CONTENT_JUSTIFY = "contentJustify";
        return e
    }();
    e.VerticalAlign = t;
    t.prototype.__class__ = "egret.VerticalAlign"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n) {
            void 0 === n && (n = 0);
            t.call(this);
            this._currentCount = 0;
            this.delay = e;
            this.repeatCount = n
        }

        __extends(n, t);
        n.prototype.currentCount = function () {
            return this._currentCount
        };
        Object.defineProperty(n.prototype, "running", {
            get: function () {
                return this._running
            }, enumerable: !0, configurable: !0
        });
        n.prototype.reset = function () {
            this.stop();
            this._currentCount = 0
        };
        n.prototype.start = function () {
            this._running || (this.lastTime = e.getTimer(), 0 != this._currentCount && (this._currentCount = 0), e.Ticker.getInstance().register(this.onEnterFrame, this), this._running = !0)
        };
        n.prototype.stop = function () {
            this._running && (e.Ticker.getInstance().unregister(this.onEnterFrame, this), this._running = !1)
        };
        n.prototype.onEnterFrame = function (t) {
            t = e.getTimer();
            t - this.lastTime > this.delay && (this.lastTime = t, this._currentCount++, e.TimerEvent.dispatchTimerEvent(this, e.TimerEvent.TIMER), 0 < this.repeatCount && this._currentCount >= this.repeatCount && (this.stop(), e.TimerEvent.dispatchTimerEvent(this, e.TimerEvent.TIMER_COMPLETE)))
        };
        return n
    }(e.EventDispatcher);
    e.Timer = t;
    t.prototype.__class__ = "egret.Timer"
})(egret || (egret = {}));
(function (e) {
    function t(e) {
        e = e.prototype ? e.prototype : e.__proto__;
        if (e.hasOwnProperty("__class__")) return e.__class__;
        var t = e.constructor.toString(), n = t.indexOf("("), t = t.substring(9, n);
        Object.defineProperty(e, "__class__", {value: t, enumerable: !1, writable: !0});
        return t
    }

    e.getQualifiedClassName = t;
    e.getQualifiedSuperclassName = function (e) {
        e = e.prototype ? e.prototype : e.__proto__;
        if (e.hasOwnProperty("__superclass__")) return e.__superclass__;
        var n = Object.getPrototypeOf(e);
        if (null == n) return null;
        n = t(n.constructor);
        if (!n) return null;
        Object.defineProperty(e, "__superclass__", {value: n, enumerable: !1, writable: !0});
        return n
    }
})(egret || (egret = {}));
(function (e) {
    var t = {};
    e.getDefinitionByName = function (e) {
        if (!e) return null;
        var n = t[e];
        if (n) return n;
        for (var r = e.split("."), i = r.length, n = __global, s = 0; s < i; s++) if (n = n[r[s]], !n) return null;
        return t[e] = n
    }
})(egret || (egret = {}));
var __global = __global || this;
(function (e) {
    function t(e) {
        for (var t in n) {
            var r = n[t];
            r.delay -= e;
            0 >= r.delay && (r.listener.apply(r.thisObject, r.params), delete n[t])
        }
    }

    var n = {}, r = 0;
    e.setTimeout = function (i, s, o) {
        for (var u = [], f = 3; f < arguments.length; f++) u[f - 3] = arguments[f];
        u = {listener: i, thisObject: s, delay: o, params: u};
        0 == r && e.Ticker.getInstance().register(t, null);
        r++;
        n[r] = u;
        return r
    };
    e.clearTimeout = function (e) {
        delete n[e]
    }
})(egret || (egret = {}));
(function (e) {
    e.hasDefinition = function (t) {
        return e.getDefinitionByName(t) ? !0 : !1
    }
})(egret || (egret = {}));
(function (e) {
    e.toColorString = function (e) {
        if (isNaN(e) || 0 > e) e = 0;
        16777215 < e && (e = 16777215);
        for (e = e.toString(16).toUpperCase(); 6 > e.length;) e = "0" + e;
        return "#" + e
    }
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r, i, s, o) {
            void 0 === e && (e = 1);
            void 0 === n && (n = 0);
            void 0 === r && (r = 0);
            void 0 === i && (i = 1);
            void 0 === s && (s = 0);
            void 0 === o && (o = 0);
            t.call(this);
            this.a = e;
            this.b = n;
            this.c = r;
            this.d = i;
            this.tx = s;
            this.ty = o
        }

        __extends(n, t);
        n.prototype.prepend = function (e, t, n, r, i, s) {
            var o = this.tx;
            if (1 != e || 0 != t || 0 != n || 1 != r) {
                var u = this.a, a = this.c;
                this.a = u * e + this.b * n;
                this.b = u * t + this.b * r;
                this.c = a * e + this.d * n;
                this.d = a * t + this.d * r
            }
            this.tx = o * e + this.ty * n + i;
            this.ty = o * t + this.ty * r + s;
            return this
        };
        n.prototype.append = function (e, t, n, r, i, s) {
            var o = this.a, u = this.b, a = this.c, f = this.d;
            if (1 != e || 0 != t || 0 != n || 1 != r) this.a = e * o + t * a, this.b = e * u + t * f, this.c = n * o + r * a, this.d = n * u + r * f;
            this.tx = i * o + s * a + this.tx;
            this.ty = i * u + s * f + this.ty;
            return this
        };
        n.prototype.prependTransform = function (e, t, r, i, s, o, u, f, l) {
            if (s % 360) {
                var c = s * n.DEG_TO_RAD;
                s = Math.cos(c);
                c = Math.sin(c)
            } else s = 1, c = 0;
            if (f || l) this.tx -= f, this.ty -= l;
            o || u ? (o *= n.DEG_TO_RAD, u *= n.DEG_TO_RAD, this.prepend(s * r, c * r, -c * i, s * i, 0, 0), this.prepend(Math.cos(u), Math.sin(u), -Math.sin(o), Math.cos(o), e, t)) : this.prepend(s * r, c * r, -c * i, s * i, e, t);
            return this
        };
        n.prototype.appendTransform = function (e, t, r, i, s, o, u, f, l) {
            if (s % 360) {
                var c = s * n.DEG_TO_RAD;
                s = Math.cos(c);
                c = Math.sin(c)
            } else s = 1, c = 0;
            o || u ? (o *= n.DEG_TO_RAD, u *= n.DEG_TO_RAD, this.append(Math.cos(u), Math.sin(u), -Math.sin(o), Math.cos(o), e, t), this.append(s * r, c * r, -c * i, s * i, 0, 0)) : this.append(s * r, c * r, -c * i, s * i, e, t);
            if (f || l) this.tx -= f * this.a + l * this.c, this.ty -= f * this.b + l * this.d;
            return this
        };
        n.prototype.rotate = function (e) {
            var t = Math.cos(e);
            e = Math.sin(e);
            var n = this.a, r = this.c, i = this.tx;
            this.a = n * t - this.b * e;
            this.b = n * e + this.b * t;
            this.c = r * t - this.d * e;
            this.d = r * e + this.d * t;
            this.tx = i * t - this.ty * e;
            this.ty = i * e + this.ty * t;
            return this
        };
        n.prototype.skew = function (e, t) {
            e *= n.DEG_TO_RAD;
            t *= n.DEG_TO_RAD;
            this.append(Math.cos(t), Math.sin(t), -Math.sin(e), Math.cos(e), 0, 0);
            return this
        };
        n.prototype.scale = function (e, t) {
            this.a *= e;
            this.d *= t;
            this.c *= e;
            this.b *= t;
            this.tx *= e;
            this.ty *= t;
            return this
        };
        n.prototype.translate = function (e, t) {
            this.tx += e;
            this.ty += t;
            return this
        };
        n.prototype.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this
        };
        n.prototype.identityMatrix = function (e) {
            this.a = e.a;
            this.b = e.b;
            this.c = e.c;
            this.d = e.d;
            this.tx = e.tx;
            this.ty = e.ty;
            return this
        };
        n.prototype.invert = function () {
            var e = this.a, t = this.b, n = this.c, r = this.d, i = this.tx, s = e * r - t * n;
            this.a = r / s;
            this.b = -t / s;
            this.c = -n / s;
            this.d = e / s;
            this.tx = (n * this.ty - r * i) / s;
            this.ty = -(e * this.ty - t * i) / s;
            return this
        };
        n.transformCoords = function (t, n, r) {
            var i = e.Point.identity;
            i.x = t.a * n + t.c * r + t.tx;
            i.y = t.d * r + t.b * n + t.ty;
            return i
        };
        n.prototype.toArray = function (e) {
            this.array || (this.array = new Float32Array(9));
            e ? (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = 0, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = 0, this.array[6] = this.tx, this.array[7] = this.ty) : (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = this.tx, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = this.ty, this.array[6] = 0, this.array[7] = 0);
            this.array[8] = 1;
            return this.array
        };
        n.identity = new n;
        n.DEG_TO_RAD = Math.PI / 180;
        return n
    }(e.HashObject);
    e.Matrix = t;
    t.prototype.__class__ = "egret.Matrix"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t(t, n) {
            void 0 === t && (t = 0);
            void 0 === n && (n = 0);
            e.call(this);
            this.x = t;
            this.y = n
        }

        __extends(t, e);
        t.prototype.clone = function () {
            return new t(this.x, this.y)
        };
        t.prototype.equals = function (e) {
            return this.x == e.x && this.y == e.y
        };
        t.distance = function (e, t) {
            return Math.sqrt((e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y))
        };
        t.identity = new t(0, 0);
        return t
    }(e.HashObject);
    e.Point = t;
    t.prototype.__class__ = "egret.Point"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t(t, n, r, i) {
            void 0 === t && (t = 0);
            void 0 === n && (n = 0);
            void 0 === r && (r = 0);
            void 0 === i && (i = 0);
            e.call(this);
            this.x = t;
            this.y = n;
            this.width = r;
            this.height = i
        }

        __extends(t, e);
        Object.defineProperty(t.prototype, "right", {
            get: function () {
                return this.x + this.width
            }, set: function (e) {
                this.width = e - this.x
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(t.prototype, "bottom", {
            get: function () {
                return this.y + this.height
            }, set: function (e) {
                this.height = e - this.y
            }, enumerable: !0, configurable: !0
        });
        t.prototype.initialize = function (e, t, n, r) {
            this.x = e;
            this.y = t;
            this.width = n;
            this.height = r;
            return this
        };
        t.prototype.contains = function (e, t) {
            return this.x <= e && this.x + this.width >= e && this.y <= t && this.y + this.height >= t
        };
        t.prototype.intersects = function (e) {
            var t = e.right, n = e.bottom, r = this.right, i = this.bottom;
            return this.contains(e.x, e.y) || this.contains(e.x, n) || this.contains(t, e.y) || this.contains(t, n) || e.contains(this.x, this.y) || e.contains(this.x, i) || e.contains(r, this.y) || e.contains(r, i) ? !0 : !1
        };
        t.prototype.clone = function () {
            return new t(this.x, this.y, this.width, this.height)
        };
        t.prototype.containsPoint = function (e) {
            return this.x < e.x && this.x + this.width > e.x && this.y < e.y && this.y + this.height > e.y ? !0 : !1
        };
        t.identity = new t(0, 0, 0, 0);
        return t
    }(e.HashObject);
    e.Rectangle = t;
    t.prototype.__class__ = "egret.Rectangle"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function t() {
        }

        t.fatal = function (t, n) {
            void 0 === n && (n = null);
            e.Logger.traceToConsole("Fatal", t, n);
            throw Error(e.Logger.getTraceCode("Fatal", t, n))
        };
        t.info = function (t, n) {
            void 0 === n && (n = null);
            e.Logger.traceToConsole("Info", t, n)
        };
        t.warning = function (t, n) {
            void 0 === n && (n = null);
            e.Logger.traceToConsole("Warning", t, n)
        };
        t.traceToConsole = function (t, n, r) {
            console.log(e.Logger.getTraceCode(t, n, r))
        };
        t.getTraceCode = function (e, t, n) {
            return "[" + e + "]" + t + ":" + (null == n ? "" : n)
        };
        return t
    }();
    e.Logger = t;
    t.prototype.__class__ = "egret.Logger"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._isSupportDOMParser = this._xmlDict = this._parser = null;
            this._xmlDict = {};
            window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
        }

        __extends(n, t);
        n.getInstance = function () {
            n._instance || (n._instance = new n);
            return n._instance
        };
        n.prototype.parserXML = function (t) {
            for (var n = 0; "\n" == t.charAt(n) || "	" == t.charAt(n) || "\r" == t.charAt(n) || " " == t.charAt(n);) n++;
            0 != n && (t = t.substring(n, t.length));
            this._isSupportDOMParser ? n = this._parser.parseFromString(t, "text/xml") : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t));
            null == n && e.Logger.info("xml not found!");
            return n
        };
        n._instance = null;
        return n
    }(e.HashObject);
    e.SAXParser = t;
    t.prototype.__class__ = "egret.SAXParser"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._designHeight = this._designWidth = 0;
            this._scaleY = this._scaleX = 1;
            this._stageHeight = this._stageWidth = this._offSetY = 0
        }

        __extends(n, t);
        n.getInstance = function () {
            null == n.instance && (r.initialize(), n.instance = new n);
            return n.instance
        };
        n.prototype.setDesignSize = function (t, n, r) {
            this._designWidth = t;
            this._designHeight = n;
            r && (e.Logger.warning("该方法目前不应传入 resolutionPolicy 参数，请在 docs/1.0_Final_ReleaseNote中查看如何升级"), this._setResolutionPolicy(r))
        };
        n.prototype._setResolutionPolicy = function (e) {
            this._resolutionPolicy = e;
            e.init(this);
            e._apply(this, this._designWidth, this._designHeight)
        };
        n.prototype.getScaleX = function () {
            return this._scaleX
        };
        n.prototype.getScaleY = function () {
            return this._scaleY
        };
        n.prototype.getOffSetY = function () {
            return this._offSetY
        };
        n.canvas_name = "egretCanvas";
        n.canvas_div_name = "gameDiv";
        return n
    }(e.HashObject);
    e.StageDelegate = t;
    t.prototype.__class__ = "egret.StageDelegate";
    var n = function () {
        function e(e, t) {
            this._containerStrategy = e;
            this._contentStrategy = t
        }

        e.prototype.init = function (e) {
            this._containerStrategy.init(e);
            this._contentStrategy.init(e)
        };
        e.prototype._apply = function (e, t, n) {
            this._containerStrategy._apply(e, t, n);
            this._contentStrategy._apply(e, t, n)
        };
        return e
    }();
    e.ResolutionPolicy = n;
    n.prototype.__class__ = "egret.ResolutionPolicy";
    var r = function () {
        function e() {
        }

        e.initialize = function () {
            e.EQUAL_TO_FRAME = new i
        };
        e.prototype.init = function (e) {
        };
        e.prototype._apply = function (e, t, n) {
        };
        e.prototype._setupContainer = function () {
            var e = document.body, t;
            e && (t = e.style) && (t.paddingTop = t.paddingTop || "0px", t.paddingRight = t.paddingRight || "0px", t.paddingBottom = t.paddingBottom || "0px", t.paddingLeft = t.paddingLeft || "0px", t.borderTop = t.borderTop || "0px", t.borderRight = t.borderRight || "0px", t.borderBottom = t.borderBottom || "0px", t.borderLeft = t.borderLeft || "0px", t.marginTop = t.marginTop || "0px", t.marginRight = t.marginRight || "0px", t.marginBottom = t.marginBottom || "0px", t.marginLeft = t.marginLeft || "0px")
        };
        return e
    }();
    e.ContainerStrategy = r;
    r.prototype.__class__ = "egret.ContainerStrategy";
    var i = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        __extends(t, e);
        t.prototype._apply = function (e) {
            this._setupContainer()
        };
        return t
    }(r);
    e.EqualToFrame = i;
    i.prototype.__class__ = "egret.EqualToFrame";
    n = function () {
        function n() {
        }

        n.prototype.init = function (e) {
        };
        n.prototype._apply = function (e, t, n) {
        };
        n.prototype.setEgretSize = function (n, r, i, s, o, u) {
            void 0 === u && (u = 0);
            e.StageDelegate.getInstance()._stageWidth = Math.round(n);
            e.StageDelegate.getInstance()._stageHeight = Math.round(r);
            n = document.getElementById(t.canvas_div_name);
            n.style.width = i + "px";
            n.style.height = s + "px";
            n.style.top = u + "px"
        };
        n.prototype._getClientWidth = function () {
            return document.documentElement.clientWidth
        };
        n.prototype._getClientHeight = function () {
            return document.documentElement.clientHeight
        };
        return n
    }();
    e.ContentStrategy = n;
    n.prototype.__class__ = "egret.ContentStrategy";
    var s = function (e) {
        function t(t) {
            void 0 === t && (t = 0);
            e.call(this);
            this.minWidth = t
        }

        __extends(t, e);
        t.prototype._apply = function (e, t, n) {
            t = this._getClientWidth();
            var r = this._getClientHeight(), i = r / n, s = t / i, o = 1;
            0 != this.minWidth && (o = Math.min(1, s / this.minWidth));
            this.setEgretSize(s / o, n, t, r * o);
            e._scaleX = i * o;
            e._scaleY = i * o
        };
        return t
    }(n);
    e.FixedHeight = s;
    s.prototype.__class__ = "egret.FixedHeight";
    s = function (e) {
        function t(t) {
            void 0 === t && (t = 0);
            e.call(this);
            this.minHeight = t
        }

        __extends(t, e);
        t.prototype._apply = function (e, t, n) {
            n = this._getClientWidth();
            var r = this._getClientHeight(), i = n / t, s = r / i, o = 1;
            0 != this.minHeight && (o = Math.min(1, s / this.minHeight));
            this.setEgretSize(t, s / o, n * o, r, n * (1 - o) / 2);
            e._scaleX = i * o;
            e._scaleY = i * o
        };
        return t
    }(n);
    e.FixedWidth = s;
    s.prototype.__class__ = "egret.FixedWidth";
    s = function (e) {
        function t(t, n) {
            e.call(this);
            this.width = t;
            this.height = n
        }

        __extends(t, e);
        t.prototype._apply = function (e, t, n) {
            n = this.width;
            var r = this.height, i = n / t;
            this.setEgretSize(t, r / i, n, r);
            e._scaleX = i;
            e._scaleY = i
        };
        return t
    }(n);
    e.FixedSize = s;
    s.prototype.__class__ = "egret.FixedSize";
    s = function (e) {
        function t() {
            e.call(this)
        }

        __extends(t, e);
        t.prototype._apply = function (e, t, n) {
            this.setEgretSize(t, n, t, n, Math.floor((t - t) / 2));
            e._scaleX = 1;
            e._scaleY = 1
        };
        return t
    }(n);
    e.NoScale = s;
    s.prototype.__class__ = "egret.NoScale";
    s = function (e) {
        function t() {
            e.call(this)
        }

        __extends(t, e);
        t.prototype._apply = function (e, t, n) {
            var r = this._getClientWidth(), i = this._getClientHeight(), s = r, o = i,
                u = s / t < o / n ? s / t : o / n, s = t * u, o = n * u, r = Math.floor((r - s) / 2);
            e._offSetY = Math.floor((i - o) / 2);
            this.setEgretSize(t, n / 1, 1 * s, o, r, e._offSetY);
            e._scaleX = 1 * u;
            e._scaleY = 1 * u
        };
        return t
    }(n);
    e.ShowAll = s;
    s.prototype.__class__ = "egret.ShowAll";
    n = function (e) {
        function t() {
            e.call(this)
        }

        __extends(t, e);
        t.prototype._apply = function (e, t, n) {
            var r = this._getClientWidth(), i = this._getClientHeight(), r = r / t, i = i / n;
            this.setEgretSize(t, n, t * r, n * i);
            e._scaleX = r;
            e._scaleY = i
        };
        return t
    }(n);
    e.FullScreen = n;
    n.prototype.__class__ = "egret.FullScreen"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._originalData = {};
            this._drawAreaList = []
        }

        __extends(n, t);
        n.getInstance = function () {
            null == n.instance && (n.instance = new n);
            return n.instance
        };
        n.prototype.addDrawArea = function (e) {
            this._drawAreaList.push(e)
        };
        n.prototype.clearDrawArea = function () {
            this._drawAreaList = []
        };
        n.prototype.drawImage = function (t, n, r, i, s, o, u, a, f, l, h) {
            void 0 === h && (h = void 0);
            u = u || 0;
            a = a || 0;
            var p = n._texture_to_render;
            if (null != p && 0 != o && 0 != s && 0 != f && 0 != l) if (0 != this._drawAreaList.length && e.MainContext.instance.rendererContext._cacheCanvasContext) {
                var d = e.DisplayObject.getTransformBounds(n._getSize(e.Rectangle.identity), n._worldTransform);
                n._worldBounds.initialize(d.x, d.y, d.width, d.height);
                d = this._originalData;
                d.sourceX = r;
                d.sourceY = i;
                d.sourceWidth = s;
                d.sourceHeight = o;
                d.destX = u;
                d.destY = a;
                d.destWidth = f;
                d.destHeight = l;
                for (var v = this.getDrawAreaList(), m = 0; m < v.length; m++) if (!this.ignoreRender(n, v[m], d.destX, d.destY)) {
                    t.drawImage(p, r, i, s, o, u, a, f, l, h);
                    break
                }
            } else t.drawImage(p, r, i, s, o, u, a, f, l, h)
        };
        n.prototype.ignoreRender = function (e, t, n, r) {
            var i = e._worldBounds;
            n *= e._worldTransform.a;
            r *= e._worldTransform.d;
            return i.x + i.width + n <= t.x || i.x + n >= t.x + t.width || i.y + i.height + r <= t.y || i.y + r >= t.y + t.height ? !0 : !1
        };
        n.prototype.getDrawAreaList = function () {
            var t;
            0 == this._drawAreaList.length ? (this._defaultDrawAreaList || (this._defaultDrawAreaList = [new e.Rectangle(0, 0, e.MainContext.instance.stage.stageWidth, e.MainContext.instance.stage.stageHeight)], e.MainContext.instance.stage.addEventListener(e.Event.RESIZE, this.onResize, this)), t = this._defaultDrawAreaList) : t = this._drawAreaList;
            return t
        };
        n.prototype.onResize = function () {
            e.MainContext.instance.stage.removeEventListener(e.Event.RESIZE, this.onResize, this);
            this._defaultDrawAreaList = null
        };
        return n
    }(e.HashObject);
    e.RenderFilter = t;
    t.prototype.__class__ = "egret.RenderFilter"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function t() {
        }

        t.mapClass = function (e, t, n) {
            void 0 === n && (n = "");
            e = this.getKey(e) + "#" + n;
            this.mapClassDic[e] = t
        };
        t.getKey = function (t) {
            return "string" == typeof t ? t : e.getQualifiedClassName(t)
        };
        t.mapValue = function (e, t, n) {
            void 0 === n && (n = "");
            e = this.getKey(e) + "#" + n;
            this.mapValueDic[e] = t
        };
        t.hasMapRule = function (e, t) {
            void 0 === t && (t = "");
            var n = this.getKey(e) + "#" + t;
            return this.mapValueDic[n] || this.mapClassDic[n] ? !0 : !1
        };
        t.getInstance = function (e, t) {
            void 0 === t && (t = "");
            var n = this.getKey(e) + "#" + t;
            if (this.mapValueDic[n]) return this.mapValueDic[n];
            var r = this.mapClassDic[n];
            if (r) return r = new r, this.mapValueDic[n] = r, delete this.mapClassDic[n], r;
            throw Error("调用了未配置的注入规则:" + n + "。 请先在项目初始化里配置指定的注入规则，再调用对应单例。")
        };
        t.mapClassDic = {};
        t.mapValueDic = {};
        return t
    }();
    e.Injector = t;
    t.prototype.__class__ = "egret.Injector"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.NORMAL = "normal";
        e.ADD = "add";
        return e
    }();
    e.BlendMode = t;
    t.prototype.__class__ = "egret.BlendMode"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.__hack_local_matrix = null;
            this._sizeDirty = this._normalDirty = !0;
            this._parent = this._texture_to_render = null;
            this._y = this._x = 0;
            this._scaleY = this._scaleX = 1;
            this._anchorY = this._anchorX = this._anchorOffsetY = this._anchorOffsetX = 0;
            this._visible = !0;
            this._rotation = 0;
            this._alpha = 1;
            this._skewY = this._skewX = 0;
            this._touchEnabled = !1;
            this._scrollRect = this.blendMode = null;
            this._hasHeightSet = this._hasWidthSet = !1;
            this._worldBounds = this.mask = null;
            this.worldAlpha = 1;
            this._rectH = this._rectW = 0;
            this._stage = null;
            this._cacheDirty = this._cacheAsBitmap = !1;
            this._colorTransform = null;
            this._worldTransform = new e.Matrix;
            this._worldBounds = new e.Rectangle(0, 0, 0, 0);
            this._cacheBounds = new e.Rectangle(0, 0, 0, 0)
        }

        __extends(n, t);
        n.prototype._setDirty = function () {
            this._normalDirty = !0
        };
        n.prototype.getDirty = function () {
            return this._normalDirty || this._sizeDirty
        };
        n.prototype._setParentSizeDirty = function () {
            var e = this._parent;
            !e || e._hasWidthSet || e._hasHeightSet || e._setSizeDirty()
        };
        n.prototype._setSizeDirty = function () {
            this._sizeDirty || (this._sizeDirty = !0, this._setDirty(), this._setCacheDirty(), this._setParentSizeDirty())
        };
        n.prototype._clearDirty = function () {
            this._normalDirty = !1
        };
        n.prototype._clearSizeDirty = function () {
            this._sizeDirty = !1
        };
        Object.defineProperty(n.prototype, "parent", {
            get: function () {
                return this._parent
            }, enumerable: !0, configurable: !0
        });
        n.prototype._parentChanged = function (e) {
            this._parent = e
        };
        Object.defineProperty(n.prototype, "x", {
            get: function () {
                return this._x
            }, set: function (e) {
                this._setX(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setX = function (t) {
            e.NumberUtils.isNumber(t) && this._x != t && (this._x = t, this._setDirty(), this._setParentSizeDirty())
        };
        Object.defineProperty(n.prototype, "y", {
            get: function () {
                return this._y
            }, set: function (e) {
                this._setY(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setY = function (t) {
            e.NumberUtils.isNumber(t) && this._y != t && (this._y = t, this._setDirty(), this._setParentSizeDirty())
        };
        Object.defineProperty(n.prototype, "scaleX", {
            get: function () {
                return this._scaleX
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._scaleX != t && (this._scaleX = t, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "scaleY", {
            get: function () {
                return this._scaleY
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._scaleY != t && (this._scaleY = t, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "anchorOffsetX", {
            get: function () {
                return this._anchorOffsetX
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._anchorOffsetX != t && (this._anchorOffsetX = t, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "anchorOffsetY", {
            get: function () {
                return this._anchorOffsetY
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._anchorOffsetY != t && (this._anchorOffsetY = t, this._setDirty(), this._setParentSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "anchorX", {
            get: function () {
                return this._anchorX
            }, set: function (e) {
                this._setAnchorX(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setAnchorX = function (t) {
            e.NumberUtils.isNumber(t) && this._anchorX != t && (this._anchorX = t, this._setDirty(), this._setParentSizeDirty())
        };
        Object.defineProperty(n.prototype, "anchorY", {
            get: function () {
                return this._anchorY
            }, set: function (e) {
                this._setAnchorY(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setAnchorY = function (t) {
            e.NumberUtils.isNumber(t) && this._anchorY != t && (this._anchorY = t, this._setDirty(), this._setParentSizeDirty())
        };
        Object.defineProperty(n.prototype, "visible", {
            get: function () {
                return this._visible
            }, set: function (e) {
                this._setVisible(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setVisible = function (e) {
            this._visible != e && (this._visible = e, this._setSizeDirty())
        };
        Object.defineProperty(n.prototype, "rotation", {
            get: function () {
                return this._rotation
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._rotation != t && (this._rotation = t, this._setSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "alpha", {
            get: function () {
                return this._alpha
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._alpha != t && (this._alpha = t, this._setDirty(), this._setCacheDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "skewX", {
            get: function () {
                return this._skewX
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._skewX != t && (this._skewX = t, this._setSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "skewY", {
            get: function () {
                return this._skewY
            }, set: function (t) {
                e.NumberUtils.isNumber(t) && this._skewY != t && (this._skewY = t, this._setSizeDirty())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "touchEnabled", {
            get: function () {
                return this._touchEnabled
            }, set: function (e) {
                this._setTouchEnabled(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setTouchEnabled = function (e) {
            this._touchEnabled = e
        };
        Object.defineProperty(n.prototype, "scrollRect", {
            get: function () {
                return this._scrollRect
            }, set: function (e) {
                this._setScrollRect(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setScrollRect = function (e) {
            this._scrollRect = e;
            this._setSizeDirty()
        };
        Object.defineProperty(n.prototype, "measuredWidth", {
            get: function () {
                return this._measureBounds().width
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "measuredHeight", {
            get: function () {
                return this._measureBounds().height
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "explicitWidth", {
            get: function () {
                return this._explicitWidth
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "explicitHeight", {
            get: function () {
                return this._explicitHeight
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "width", {
            get: function () {
                return this._getSize(e.Rectangle.identity).width
            }, set: function (e) {
                this._setWidth(e)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "height", {
            get: function () {
                return this._getSize(e.Rectangle.identity).height
            }, set: function (e) {
                this._setHeight(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setWidth = function (t) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitWidth = t;
            this._hasWidthSet = e.NumberUtils.isNumber(t)
        };
        n.prototype._setHeight = function (t) {
            this._setSizeDirty();
            this._setCacheDirty();
            this._explicitHeight = t;
            this._hasHeightSet = e.NumberUtils.isNumber(t)
        };
        n.prototype._draw = function (e) {
            if (this._visible && !this.drawCacheTexture(e)) {
                this._colorTransform && e.setGlobalColorTransform(this._colorTransform.matrix);
                e.setAlpha(this.worldAlpha, this.blendMode);
                e.setTransform(this._worldTransform);
                var t = this.mask || this._scrollRect;
                t && e.pushMask(t);
                this._render(e);
                t && e.popMask();
                this._colorTransform && e.setGlobalColorTransform(null)
            }
            this.destroyCacheBounds()
        };
        n.prototype.drawCacheTexture = function (t) {
            if (!1 == this._cacheAsBitmap) return !1;
            if (this._cacheDirty || null == this._texture_to_render || Math.round(this.width) != Math.round(this._texture_to_render._sourceWidth) || Math.round(this.height) != Math.round(this._texture_to_render._sourceHeight)) this._cacheDirty = !this._makeBitmapCache();
            if (null == this._texture_to_render) return !1;
            var n = this._texture_to_render, r = n._offsetX, i = n._offsetY, s = n._textureWidth, n = n._textureHeight;
            this._updateTransform();
            t.setAlpha(this.worldAlpha, this.blendMode);
            t.setTransform(this._worldTransform);
            var o = e.MainContext.instance.rendererContext.texture_scale_factor;
            e.RenderFilter.getInstance().drawImage(t, this, 0, 0, s * o, n * o, r, i, s, n);
            return !0
        };
        n.prototype._updateTransform = function () {
            this._calculateWorldTransform()
        };
        n.prototype._calculateWorldTransform = function () {
            var e = this._worldTransform, t = this._parent;
            e.identityMatrix(t._worldTransform);
            this._getMatrix(e);
            var n = this._scrollRect;
            n && e.append(1, 0, 0, 1, -n.x, -n.y);
            this.worldAlpha = t.worldAlpha * this._alpha
        };
        n.prototype._render = function (e) {
        };
        n.prototype.getBounds = function (t, n) {
            void 0 === n && (n = !0);
            var r = this._measureBounds(), i = this._hasWidthSet ? this._explicitWidth : r.width,
                s = this._hasHeightSet ? this._explicitHeight : r.height;
            this._rectW = r.width;
            this._rectH = r.height;
            this._clearSizeDirty();
            var o = r.x, r = r.y, u = 0, a = 0;
            n && (0 != this._anchorX || 0 != this._anchorY ? (u = i * this._anchorX, a = s * this._anchorY) : (u = this._anchorOffsetX, a = this._anchorOffsetY));
            this._cacheBounds.initialize(o - u, r - a, i, s);
            i = this._cacheBounds;
            t || (t = new e.Rectangle);
            return t.initialize(i.x, i.y, i.width, i.height)
        };
        n.prototype.destroyCacheBounds = function () {
            this._cacheBounds.x = 0;
            this._cacheBounds.y = 0;
            this._cacheBounds.width = 0;
            this._cacheBounds.height = 0
        };
        n.prototype._getConcatenatedMatrix = function () {
            for (var t = n.identityMatrixForGetConcatenated.identity(), r = this; null != r;) {
                if (0 != r._anchorX || 0 != r._anchorY) {
                    var i = r._getSize(e.Rectangle.identity);
                    t.prependTransform(r._x, r._y, r._scaleX, r._scaleY, r._rotation, r._skewX, r._skewY, i.width * r._anchorX, i.height * r._anchorY)
                } else t.prependTransform(r._x, r._y, r._scaleX, r._scaleY, r._rotation, r._skewX, r._skewY, r._anchorOffsetX, r._anchorOffsetY);
                r = r._parent
            }
            return t
        };
        n.prototype.localToGlobal = function (t, n, r) {
            void 0 === t && (t = 0);
            void 0 === n && (n = 0);
            var i = this._getConcatenatedMatrix();
            i.append(1, 0, 0, 1, t, n);
            r || (r = new e.Point);
            r.x = i.tx;
            r.y = i.ty;
            return r
        };
        n.prototype.globalToLocal = function (t, n, r) {
            void 0 === t && (t = 0);
            void 0 === n && (n = 0);
            var i = this._getConcatenatedMatrix();
            i.invert();
            i.append(1, 0, 0, 1, t, n);
            r || (r = new e.Point);
            r.x = i.tx;
            r.y = i.ty;
            return r
        };
        n.prototype.hitTest = function (t, n, r) {
            void 0 === r && (r = !1);
            if (!this._visible || !r && !this._touchEnabled) return null;
            r = this._getSize(e.Rectangle.identity);
            return 0 <= t && t < r.width && 0 <= n && n < r.height ? this.mask || this._scrollRect ? this._scrollRect && t > this._scrollRect.x && n > this._scrollRect.y && t < this._scrollRect.x + this._scrollRect.width && n < this._scrollRect.y + this._scrollRect.height || this.mask && this.mask.x <= t && t < this.mask.x + this.mask.width && this.mask.y <= n && n < this.mask.y + this.mask.height ? this : null : this : null
        };
        n.prototype.hitTestPoint = function (t, n, r) {
            t = this.globalToLocal(t, n);
            return r ? (this._hitTestPointTexture || (this._hitTestPointTexture = new e.RenderTexture), r = this._hitTestPointTexture, r.drawToTexture(this), 0 != r.getPixel32(t.x - this._hitTestPointTexture._offsetX, t.y - this._hitTestPointTexture._offsetY)[3] ? !0 : !1) : !!this.hitTest(t.x, t.y, !0)
        };
        n.prototype._getMatrix = function (t) {
            t || (t = e.Matrix.identity.identity());
            var n, r;
            r = this._getOffsetPoint();
            n = r.x;
            r = r.y;
            var i = this.__hack_local_matrix;
            i ? (t.append(i.a, i.b, i.c, i.d, i.tx, i.ty), t.append(1, 0, 0, 1, -n, -r)) : t.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, n, r);
            return t
        };
        n.prototype._getSize = function (e) {
            return this._hasHeightSet && this._hasWidthSet ? e.initialize(0, 0, this._explicitWidth, this._explicitHeight) : this._measureSize(e)
        };
        n.prototype._measureSize = function (e) {
            this._sizeDirty ? (e = this._measureBounds(), this._rectW = e.width, this._rectH = e.height, this._clearSizeDirty()) : (e.width = this._rectW, e.height = this._rectH);
            e.x = 0;
            e.y = 0;
            return e
        };
        n.prototype._measureBounds = function () {
            return e.Rectangle.identity.initialize(0, 0, 0, 0)
        };
        n.prototype._getOffsetPoint = function () {
            var t = this._anchorOffsetX, n = this._anchorOffsetY;
            if (0 != this._anchorX || 0 != this._anchorY) n = this._getSize(e.Rectangle.identity), t = this._anchorX * n.width, n = this._anchorY * n.height;
            var r = e.Point.identity;
            r.x = t;
            r.y = n;
            return r
        };
        n.prototype._onAddToStage = function () {
            this._stage = e.MainContext.instance.stage;
            e.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this)
        };
        n.prototype._onRemoveFromStage = function () {
            e.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this)
        };
        Object.defineProperty(n.prototype, "stage", {
            get: function () {
                return this._stage
            }, enumerable: !0, configurable: !0
        });
        n.prototype.addEventListener = function (r, i, s, o, u) {
            void 0 === o && (o = !1);
            void 0 === u && (u = 0);
            t.prototype.addEventListener.call(this, r, i, s, o, u);
            ((o = r == e.Event.ENTER_FRAME) || r == e.Event.RENDER) && this._insertEventBin(o ? n._enterFrameCallBackList : n._renderCallBackList, i, s, u, this)
        };
        n.prototype.removeEventListener = function (r, i, s, o) {
            void 0 === o && (o = !1);
            t.prototype.removeEventListener.call(this, r, i, s, o);
            ((o = r == e.Event.ENTER_FRAME) || r == e.Event.RENDER) && this._removeEventBin(o ? n._enterFrameCallBackList : n._renderCallBackList, i, s, this)
        };
        n.prototype.dispatchEvent = function (e) {
            if (!e._bubbles) return t.prototype.dispatchEvent.call(this, e);
            for (var n = [], r = this; r;) n.push(r), r = r._parent;
            e._reset();
            this._dispatchPropagationEvent(e, n);
            return !e._isDefaultPrevented
        };
        n.prototype._dispatchPropagationEvent = function (e, t, n) {
            n = t.length;
            for (var r = 1, i = n - 1; 0 <= i; i--) {
                var s = t[i];
                e._currentTarget = s;
                e._target = this;
                e._eventPhase = r;
                s._notifyListener(e);
                if (e._isPropagationStopped || e._isPropagationImmediateStopped) return
            }
            s = t[0];
            e._currentTarget = s;
            e._target = this;
            e._eventPhase = 2;
            s._notifyListener(e);
            if (!e._isPropagationStopped && !e._isPropagationImmediateStopped) for (r = 3, i = 1; i < n && (s = t[i], e._currentTarget = s, e._target = this, e._eventPhase = r, s._notifyListener(e), !e._isPropagationStopped && !e._isPropagationImmediateStopped); i++) ;
        };
        n.prototype.willTrigger = function (e) {
            for (var t = this; t;) {
                if (t.hasEventListener(e)) return !0;
                t = t._parent
            }
            return !1
        };
        Object.defineProperty(n.prototype, "cacheAsBitmap", {
            get: function () {
                return this._cacheAsBitmap
            }, set: function (t) {
                (this._cacheAsBitmap = t) ? e.callLater(this._makeBitmapCache, this) : this._texture_to_render = null
            }, enumerable: !0, configurable: !0
        });
        n.prototype._makeBitmapCache = function () {
            this.renderTexture || (this.renderTexture = new e.RenderTexture);
            var t = this.renderTexture.drawToTexture(this);
            this._texture_to_render = t ? this.renderTexture : null;
            return t
        };
        n.prototype._setCacheDirty = function (e) {
            void 0 === e && (e = !0);
            this._cacheDirty = e
        };
        n.getTransformBounds = function (e, t) {
            var n = e.x, r = e.y, i = e.width, s = e.height;
            (n || r) && t.appendTransform(0, 0, 1, 1, 0, 0, 0, -n, -r);
            var o = i * t.a, i = i * t.b, u = s * t.c, s = s * t.d, a = t.tx, f = t.ty, l = a, c = a, h = f, p = f;
            (n = o + a) < l ? l = n : n > c && (c = n);
            (n = o + u + a) < l ? l = n : n > c && (c = n);
            (n = u + a) < l ? l = n : n > c && (c = n);
            (r = i + f) < h ? h = r : r > p && (p = r);
            (r = i + s + f) < h ? h = r : r > p && (p = r);
            (r = s + f) < h ? h = r : r > p && (p = r);
            return e.initialize(l, h, c - l, p - h)
        };
        Object.defineProperty(n.prototype, "colorTransform", {
            get: function () {
                return this._colorTransform
            }, set: function (e) {
                this._colorTransform = e
            }, enumerable: !0, configurable: !0
        });
        n.identityMatrixForGetConcatenated = new e.Matrix;
        n._enterFrameCallBackList = [];
        n._renderCallBackList = [];
        return n
    }(e.EventDispatcher);
    e.DisplayObject = t;
    t.prototype.__class__ = "egret.DisplayObject";
    t = function () {
        function e() {
            this.matrix = null
        }

        e.prototype.updateColor = function (e, t, n, r, i, s, o, u) {
        };
        return e
    }();
    e.ColorTransform = t;
    t.prototype.__class__ = "egret.ColorTransform"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._touchChildren = !0;
            this._children = []
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "touchChildren", {
            get: function () {
                return this._touchChildren
            }, set: function (e) {
                this._touchChildren = e
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "numChildren", {
            get: function () {
                return this._children.length
            }, enumerable: !0, configurable: !0
        });
        n.prototype.setChildIndex = function (e, t) {
            this.doSetChildIndex(e, t)
        };
        n.prototype.doSetChildIndex = function (t, n) {
            var r = this._children.indexOf(t);
            0 > r && e.Logger.fatal("child不在当前容器内");
            this._children.splice(r, 1);
            0 > n || this._children.length <= n ? this._children.push(t) : this._children.splice(n, 0, t)
        };
        n.prototype.addChild = function (e) {
            var t = this._children.length;
            e._parent == this && t--;
            return this._doAddChild(e, t)
        };
        n.prototype.addChildAt = function (e, t) {
            return this._doAddChild(e, t)
        };
        n.prototype._doAddChild = function (t, r, i) {
            void 0 === i && (i = !0);
            if (t == this) return t;
            if (0 > r || r > this._children.length) return e.Logger.fatal("提供的索引超出范围"), t;
            var s = t._parent;
            if (s == this) return this.doSetChildIndex(t, r), t;
            s && (r = s._children.indexOf(t), 0 <= r && s._doRemoveChild(r));
            this._children.splice(r, 0, t);
            t._parentChanged(this);
            i && t.dispatchEventWith(e.Event.ADDED, !0);
            if (this._stage) for (t._onAddToStage(), r = n.__EVENT__ADD_TO_STAGE_LIST; 0 < r.length;) r.shift().dispatchEventWith(e.Event.ADDED_TO_STAGE);
            t._setDirty();
            this._setSizeDirty();
            return t
        };
        n.prototype.removeChild = function (t) {
            t = this._children.indexOf(t);
            if (0 <= t) return this._doRemoveChild(t);
            e.Logger.fatal("child未被addChild到该parent");
            return null
        };
        n.prototype.removeChildAt = function (t) {
            if (0 <= t && t < this._children.length) return this._doRemoveChild(t);
            e.Logger.fatal("提供的索引超出范围");
            return null
        };
        n.prototype._doRemoveChild = function (t, r) {
            void 0 === r && (r = !0);
            var i = this._children, s = i[t];
            r && s.dispatchEventWith(e.Event.REMOVED, !0);
            if (this._stage) {
                s._onRemoveFromStage();
                for (var o = n.__EVENT__REMOVE_FROM_STAGE_LIST; 0 < o.length;) {
                    var u = o.shift();
                    u.dispatchEventWith(e.Event.REMOVED_FROM_STAGE);
                    u._stage = null
                }
            }
            s._parentChanged(null);
            i.splice(t, 1);
            this._setSizeDirty();
            return s
        };
        n.prototype.getChildAt = function (t) {
            if (0 <= t && t < this._children.length) return this._children[t];
            e.Logger.fatal("提供的索引超出范围");
            return null
        };
        n.prototype.contains = function (e) {
            for (; e;) {
                if (e == this) return !0;
                e = e._parent
            }
            return !1
        };
        n.prototype.swapChildrenAt = function (t, n) {
            0 <= t && t < this._children.length && 0 <= n && n < this._children.length ? this._swapChildrenAt(t, n) : e.Logger.fatal("提供的索引超出范围")
        };
        n.prototype.swapChildren = function (t, n) {
            var r = this._children.indexOf(t), i = this._children.indexOf(n);
            -1 == r || -1 == i ? e.Logger.fatal("child未被addChild到该parent") : this._swapChildrenAt(r, i)
        };
        n.prototype._swapChildrenAt = function (e, t) {
            if (e != t) {
                var n = this._children, r = n[e];
                n[e] = n[t];
                n[t] = r
            }
        };
        n.prototype.getChildIndex = function (e) {
            return this._children.indexOf(e)
        };
        n.prototype.removeChildren = function () {
            for (var e = this._children.length - 1; 0 <= e; e--) this._doRemoveChild(e)
        };
        n.prototype._updateTransform = function () {
            if (this._visible) {
                t.prototype._updateTransform.call(this);
                for (var e = 0, n = this._children.length; e < n; e++) this._children[e]._updateTransform()
            }
        };
        n.prototype._render = function (e) {
            for (var t = 0, n = this._children.length; t < n; t++) this._children[t]._draw(e)
        };
        n.prototype._measureBounds = function () {
            for (var t = 0, n = 0, r = 0, i = 0, s = this._children.length, o = 0; o < s; o++) {
                var u = this._children[o];
                if (u._visible) {
                    var a = u.getBounds(e.Rectangle.identity, !1), f = a.x, l = a.y, h = a.width, a = a.height,
                        u = u._getMatrix(),
                        u = e.DisplayObject.getTransformBounds(e.Rectangle.identity.initialize(f, l, h, a), u), f = u.x,
                        l = u.y, h = u.width + u.x, u = u.height + u.y;
                    if (f < t || 0 == o) t = f;
                    if (h > n || 0 == o) n = h;
                    if (l < r || 0 == o) r = l;
                    if (u > i || 0 == o) i = u
                }
            }
            return e.Rectangle.identity.initialize(t, r, n - t, i - r)
        };
        n.prototype.hitTest = function (n, r, i) {
            void 0 === i && (i = !1);
            var s;
            if (!this._visible) return null;
            if (this._scrollRect) {
                if (n < this._scrollRect.x || r < this._scrollRect.y || n > this._scrollRect.x + this._scrollRect.width || r > this._scrollRect.y + this._scrollRect.height) return null
            } else if (this.mask && (this.mask.x > n || n > this.mask.x + this.mask.width || this.mask.y > r || r > this.mask.y + this.mask.height)) return null;
            for (var o = this._children, u = this._touchChildren, a = o.length - 1; 0 <= a; a--) {
                var f = o[a], l = f._getMatrix(), h = f._scrollRect;
                h && l.append(1, 0, 0, 1, -h.x, -h.y);
                l.invert();
                l = e.Matrix.transformCoords(l, n, r);
                if (f = f.hitTest(l.x, l.y, !0)) {
                    if (!u) return this;
                    if (f._touchEnabled && u) return f;
                    s = this
                }
            }
            return s ? s : this._texture_to_render || this.graphics ? t.prototype.hitTest.call(this, n, r, i) : null
        };
        n.prototype._onAddToStage = function () {
            t.prototype._onAddToStage.call(this);
            for (var e = this._children.length, n = 0; n < e; n++) this._children[n]._onAddToStage()
        };
        n.prototype._onRemoveFromStage = function () {
            t.prototype._onRemoveFromStage.call(this);
            for (var e = this._children.length, n = 0; n < e; n++) this._children[n]._onRemoveFromStage()
        };
        n.prototype.getChildByName = function (e) {
            for (var t = this._children, n = t.length, r, i = 0; i < n; i++) if (r = t[i], r.name == e) return r;
            return null
        };
        n.__EVENT__ADD_TO_STAGE_LIST = [];
        n.__EVENT__REMOVE_FROM_STAGE_LIST = [];
        return n
    }(e.DisplayObject);
    e.DisplayObjectContainer = t;
    t.prototype.__class__ = "egret.DisplayObjectContainer"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n) {
            void 0 === e && (e = 480);
            void 0 === n && (n = 800);
            t.call(this);
            this.touchEnabled = !0;
            this._stage = this;
            this._stageWidth = e;
            this._stageHeight = n
        }

        __extends(n, t);
        n.prototype.invalidate = function () {
            n._invalidateRenderFlag = !0
        };
        Object.defineProperty(n.prototype, "scaleMode", {
            get: function () {
                return this._scaleMode
            }, set: function (e) {
                this._scaleMode != e && (this._scaleMode = e, this.setResolutionPolicy())
            }, enumerable: !0, configurable: !0
        });
        n.prototype.changeSize = function () {
            this.setResolutionPolicy();
            this.dispatchEventWith(e.Event.RESIZE)
        };
        n.prototype.setResolutionPolicy = function () {
            var t = {};
            t[e.StageScaleMode.NO_SCALE] = new e.NoScale;
            t[e.StageScaleMode.SHOW_ALL] = new e.ShowAll;
            t[e.StageScaleMode.NO_BORDER] = new e.FixedWidth;
            t[e.StageScaleMode.EXACT_FIT] = new e.FullScreen;
            t = t[this._scaleMode];
            if (!t) throw Error("使用了尚未实现的ScaleMode");
            var n = new e.EqualToFrame, t = new e.ResolutionPolicy(n, t);
            e.StageDelegate.getInstance()._setResolutionPolicy(t);
            this._stageWidth = e.StageDelegate.getInstance()._stageWidth;
            this._stageHeight = e.StageDelegate.getInstance()._stageHeight
        };
        Object.defineProperty(n.prototype, "stageWidth", {
            get: function () {
                return this._stageWidth
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "stageHeight", {
            get: function () {
                return this._stageHeight
            }, enumerable: !0, configurable: !0
        });
        n.prototype.hitTest = function (t, n, r) {
            if (!this._touchEnabled) return null;
            var i;
            if (!this._touchChildren) return this;
            r = this._children;
            for (var s = r.length - 1; 0 <= s; s--) {
                i = r[s];
                var o = i._getMatrix(), u = i._scrollRect;
                u && o.append(1, 0, 0, 1, -u.x, -u.y);
                o.invert();
                o = e.Matrix.transformCoords(o, t, n);
                if ((i = i.hitTest(o.x, o.y, !0)) && i._touchEnabled) return i
            }
            return this
        };
        n.prototype.getBounds = function (t) {
            t || (t = new e.Rectangle);
            return t.initialize(0, 0, this._stageWidth, this._stageHeight)
        };
        n.prototype._updateTransform = function () {
            for (var e = 0, t = this._children.length; e < t; e++) this._children[e]._updateTransform()
        };
        Object.defineProperty(n.prototype, "focus", {
            get: function () {
                return null
            }, enumerable: !0, configurable: !0
        });
        n._invalidateRenderFlag = !1;
        return n
    }(e.DisplayObjectContainer);
    e.Stage = t;
    t.prototype.__class__ = "egret.Stage"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.NO_BORDER = "noBorder";
        e.NO_SCALE = "noScale";
        e.SHOW_ALL = "showAll";
        e.EXACT_FIT = "exactFit";
        return e
    }();
    e.StageScaleMode = t;
    t.prototype.__class__ = "egret.StageScaleMode"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(n) {
            void 0 === n && (n = null);
            t.call(this);
            this._lastTouchPosition = new e.Point(0, 0);
            this._lastTouchTime = 0;
            this._lastTouchEvent = null;
            this._velocitys = [];
            this._content = null;
            this._horizontalScrollPolicy = this._verticalScrollPolicy = "auto";
            this._scrollTop = this._scrollLeft = 0;
            this._vCanScroll = this._hCanScroll = !1;
            this.touchEnabled = !0;
            n && this.setContent(n)
        }

        __extends(n, t);
        n.prototype.setContent = function (e) {
            this._content && (this._removeEvents(), t.prototype.removeChildAt.call(this, 0));
            this._content = e;
            t.prototype.addChild.call(this, e);
            this._addEvents();
            this._explicitWidth || this._getContentWidth();
            this._explicitHeight || this._getContentHeight()
        };
        Object.defineProperty(n.prototype, "verticalScrollPolicy", {
            get: function () {
                return this._verticalScrollPolicy
            }, set: function (e) {
                e != this._verticalScrollPolicy && (this._verticalScrollPolicy = e)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "horizontalScrollPolicy", {
            get: function () {
                return this._horizontalScrollPolicy
            }, set: function (e) {
                e != this._horizontalScrollPolicy && (this._horizontalScrollPolicy = e)
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "scrollLeft", {
            get: function () {
                return this._scrollLeft
            }, set: function (e) {
                e != this._scrollLeft && (this._scrollLeft = e, this._validatePosition(!1, !0), this._updateContentPosition())
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "scrollTop", {
            get: function () {
                return this._scrollTop
            }, set: function (e) {
                e != this._scrollTop && (this._scrollTop = e, this._validatePosition(!0, !1), this._updateContentPosition())
            }, enumerable: !0, configurable: !0
        });
        n.prototype.setScrollPosition = function (e, t, n) {
            void 0 === n && (n = !1);
            if (!n || 0 != e || 0 != t) if (n || this._scrollTop != e || this._scrollLeft != t) {
                if (n) {
                    n = this._isOnTheEdge(!0);
                    var r = this._isOnTheEdge(!1);
                    this._scrollTop += n ? e / 2 : e;
                    this._scrollLeft += r ? t / 2 : t
                } else this._scrollTop = e, this._scrollLeft = t;
                this._validatePosition(!0, !0);
                this._updateContentPosition()
            }
        };
        n.prototype._isOnTheEdge = function (e) {
            void 0 === e && (e = !0);
            var t = this._scrollTop, n = this._scrollLeft;
            return e ? 0 > t || t > this.getMaxScrollTop() : 0 > n || n > this.getMaxScrollLeft()
        };
        n.prototype._validatePosition = function (e, t) {
            void 0 === e && (e = !1);
            void 0 === t && (t = !1);
            if (e) {
                var n = this.height, r = this._getContentHeight();
                this._scrollTop = Math.max(this._scrollTop, (0 - n) / 2);
                this._scrollTop = Math.min(this._scrollTop, r > n ? r - n / 2 : r / 2)
            }
            t && (n = this.width, r = this._getContentWidth(), this._scrollLeft = Math.max(this._scrollLeft, (0 - n) / 2), this._scrollLeft = Math.min(this._scrollLeft, r > n ? r - n / 2 : r / 2))
        };
        n.prototype._setWidth = function (e) {
            this._explicitWidth != e && (t.prototype._setWidth.call(this, e), this._updateContentPosition())
        };
        n.prototype._setHeight = function (e) {
            this._explicitHeight != e && (t.prototype._setHeight.call(this, e), this._updateContentPosition())
        };
        n.prototype._updateContentPosition = function () {
            var t = this.getBounds(e.Rectangle.identity);
            this.scrollRect = new e.Rectangle(this._scrollLeft, this._scrollTop, t.width, t.height);
            this.dispatchEvent(new e.Event(e.Event.CHANGE))
        };
        n.prototype._checkScrollPolicy = function () {
            var e = this.__checkScrollPolicy(this._horizontalScrollPolicy, this._getContentWidth(), this.width);
            this._hCanScroll = e;
            var t = this.__checkScrollPolicy(this._verticalScrollPolicy, this._getContentHeight(), this.height);
            this._vCanScroll = t;
            return e || t
        };
        n.prototype.__checkScrollPolicy = function (e, t, n) {
            return "on" == e ? !0 : "off" == e ? !1 : t > n
        };
        n.prototype._addEvents = function () {
            this.addEventListener(e.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.addEventListener(e.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0);
            this.addEventListener(e.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
        };
        n.prototype._removeEvents = function () {
            this.removeEventListener(e.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
            this.removeEventListener(e.TouchEvent.TOUCH_BEGIN, this._onTouchBeginCapture, this, !0);
            this.removeEventListener(e.TouchEvent.TOUCH_END, this._onTouchEndCapture, this, !0)
        };
        n.prototype._onTouchBegin = function (t) {
            t._isDefaultPrevented || (e.Tween.removeTweens(this), this.stage.addEventListener(e.TouchEvent.TOUCH_MOVE, this._onTouchMove, this), this.stage.addEventListener(e.TouchEvent.TOUCH_END, this._onTouchEnd, this), this.stage.addEventListener(e.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this), this.addEventListener(e.Event.ENTER_FRAME, this._onEnterFrame, this), this._logTouchEvent(t), t.preventDefault())
        };
        n.prototype._onTouchBeginCapture = function (t) {
            var r = this._checkScrollPolicy();
            if (r) {
                for (var i = t.target; i != this;) {
                    if (i instanceof n && (r = i._checkScrollPolicy())) return;
                    i = i.parent
                }
                t.stopPropagation();
                this.delayTouchBeginEvent = this.cloneTouchEvent(t);
                this.touchBeginTimer || (this.touchBeginTimer = new e.Timer(100, 1), this.touchBeginTimer.addEventListener(e.TimerEvent.TIMER_COMPLETE, this._onTouchBeginTimer, this));
                this.touchBeginTimer.start();
                this._onTouchBegin(t)
            }
        };
        n.prototype._onTouchEndCapture = function (e) {
            this.delayTouchBeginEvent && this._onTouchBeginTimer()
        };
        n.prototype._onTouchBeginTimer = function () {
            this.touchBeginTimer.stop();
            var e = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent = null;
            this.dispatchPropagationEvent(e)
        };
        n.prototype.dispatchPropagationEvent = function (e) {
            for (var t = [], n = e._target; n;) t.push(n), n = n.parent;
            for (var r = this._content, i = 1; ; i += 2) {
                n = t[i];
                if (!n || n === r) break;
                t.unshift(n)
            }
            this._dispatchPropagationEvent(e, t)
        };
        n.prototype._dispatchPropagationEvent = function (e, t, n) {
            for (var r = t.length, i = 0; i < r; i++) {
                var s = t[i];
                e._currentTarget = s;
                e._target = this;
                e._eventPhase = i < n ? 1 : i == n ? 2 : 3;
                s._notifyListener(e);
                if (e._isPropagationStopped || e._isPropagationImmediateStopped) break
            }
        };
        n.prototype._onTouchMove = function (e) {
            if (this._lastTouchPosition.x != e.stageX || this._lastTouchPosition.y != e.stageY) {
                this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop());
                this.touchChildren = !1;
                var t = this._getPointChange(e);
                this.setScrollPosition(t.y, t.x, !0);
                this._calcVelocitys(e);
                this._logTouchEvent(e)
            }
        };
        n.prototype._onTouchEnd = function (t) {
            this.touchChildren = !0;
            e.MainContext.instance.stage.removeEventListener(e.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
            e.MainContext.instance.stage.removeEventListener(e.TouchEvent.TOUCH_END, this._onTouchEnd, this);
            e.MainContext.instance.stage.removeEventListener(e.TouchEvent.LEAVE_STAGE, this._onTouchEnd, this);
            this.removeEventListener(e.Event.ENTER_FRAME, this._onEnterFrame, this);
            this._moveAfterTouchEnd()
        };
        n.prototype._onEnterFrame = function (t) {
            t = e.getTimer();
            100 < t - this._lastTouchTime && 300 > t - this._lastTouchTime && this._calcVelocitys(this._lastTouchEvent)
        };
        n.prototype._logTouchEvent = function (t) {
            this._lastTouchPosition.x = t.stageX;
            this._lastTouchPosition.y = t.stageY;
            this._lastTouchEvent = this.cloneTouchEvent(t);
            this._lastTouchTime = e.getTimer()
        };
        n.prototype._getPointChange = function (e) {
            return {
                x: !1 === this._hCanScroll ? 0 : this._lastTouchPosition.x - e.stageX,
                y: !1 === this._vCanScroll ? 0 : this._lastTouchPosition.y - e.stageY
            }
        };
        n.prototype._calcVelocitys = function (t) {
            var n = e.getTimer();
            if (0 == this._lastTouchTime) this._lastTouchTime = n; else {
                var r = this._getPointChange(t), n = n - this._lastTouchTime;
                r.x /= n;
                r.y /= n;
                this._velocitys.push(r);
                5 < this._velocitys.length && this._velocitys.shift();
                this._lastTouchPosition.x = t.stageX;
                this._lastTouchPosition.y = t.stageY
            }
        };
        n.prototype._getContentWidth = function () {
            return this._content.explicitWidth || this._content.width
        };
        n.prototype._getContentHeight = function () {
            return this._content.explicitHeight || this._content.height
        };
        n.prototype.getMaxScrollLeft = function () {
            var e = this._getContentWidth() - this.width;
            return Math.max(0, e)
        };
        n.prototype.getMaxScrollTop = function () {
            var e = this._getContentHeight() - this.height;
            return Math.max(0, e)
        };
        n.prototype._moveAfterTouchEnd = function () {
            if (0 != this._velocitys.length) {
                for (var e = 0, t = 0, r = 0, i = 0; i < this._velocitys.length; i++) var s = this._velocitys[i], o = n.weight[i], e = e + s.x * o, t = t + s.y * o, r = r + o;
                this._velocitys.length = 0;
                e /= r;
                t /= r;
                s = Math.abs(e);
                r = Math.abs(t);
                o = this.getMaxScrollLeft();
                i = this.getMaxScrollTop();
                e = .02 < s ? this.getAnimationDatas(e, this._scrollLeft, o) : {
                    position: this._scrollLeft,
                    duration: 1
                };
                t = .02 < r ? this.getAnimationDatas(t, this._scrollTop, i) : {position: this._scrollTop, duration: 1};
                this.setScrollLeft(e.position, e.duration);
                this.setScrollTop(t.position, t.duration)
            }
        };
        n.prototype.setScrollTop = function (t, n) {
            void 0 === n && (n = 0);
            var r = Math.min(this.getMaxScrollTop(), Math.max(t, 0));
            if (0 == n) return this.scrollTop = r, null;
            var i = e.Tween.get(this).to({scrollTop: t}, n, e.Ease.quartOut);
            r != t && i.to({scrollTop: r}, 300, e.Ease.quintOut)
        };
        n.prototype.setScrollLeft = function (t, n) {
            void 0 === n && (n = 0);
            var r = Math.min(this.getMaxScrollLeft(), Math.max(t, 0));
            if (0 == n) return this.scrollLeft = r, null;
            var i = e.Tween.get(this).to({scrollLeft: t}, n, e.Ease.quartOut);
            r != t && i.to({scrollLeft: r}, 300, e.Ease.quintOut)
        };
        n.prototype.getAnimationDatas = function (e, t, n) {
            var r = Math.abs(e), i = 0, s = t + 500 * e;
            if (0 > s || s > n) for (s = t; Infinity != Math.abs(e) && .02 < Math.abs(e);) s += e, e = 0 > s || s > n ? .998 * e * .95 : .998 * e, i++; else i = 500 * -Math.log(.02 / r);
            return {position: Math.min(n + 50, Math.max(s, -50)), duration: i}
        };
        n.prototype.cloneTouchEvent = function (t) {
            var n = new e.TouchEvent(t._type, t._bubbles, t.cancelable);
            n.touchPointID = t.touchPointID;
            n._stageX = t._stageX;
            n._stageY = t._stageY;
            n.ctrlKey = t.ctrlKey;
            n.altKey = t.altKey;
            n.shiftKey = t.shiftKey;
            n.touchDown = t.touchDown;
            n._isDefaultPrevented = !1;
            n._target = t._target;
            return n
        };
        n.prototype.throwNotSupportedError = function () {
            throw Error("此方法在ScrollView内不可用!")
        };
        n.prototype.addChild = function (e) {
            this.throwNotSupportedError();
            return null
        };
        n.prototype.addChildAt = function (e, t) {
            this.throwNotSupportedError();
            return null
        };
        n.prototype.removeChild = function (e) {
            this.throwNotSupportedError();
            return null
        };
        n.prototype.removeChildAt = function (e) {
            this.throwNotSupportedError();
            return null
        };
        n.prototype.setChildIndex = function (e, t) {
            this.throwNotSupportedError()
        };
        n.prototype.swapChildren = function (e, t) {
            this.throwNotSupportedError()
        };
        n.prototype.swapChildrenAt = function (e, t) {
            this.throwNotSupportedError()
        };
        n.weight = [1, 1.33, 1.66, 2, 2.33];
        return n
    }(e.DisplayObjectContainer);
    e.ScrollView = t;
    t.prototype.__class__ = "egret.ScrollView"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(n, r, i) {
            void 0 === r && (r = NaN);
            void 0 === i && (i = NaN);
            t.call(this, n);
            this.content = n;
            this.width = NaN == r ? this._getContentWidth() : r;
            this.height = NaN == i ? this._getContentHeight() : i;
            e.Logger.warning("egret.Scroller已废弃，请使用egret.ScrollView")
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "scrollXEnabled", {
            get: function () {
                return "off" != this.horizontalScrollPolicy
            }, set: function (t) {
                e.Logger.warning("egret.Scroller已废弃，请使用egret.ScrollView");
                this.horizontalScrollPolicy = t ? "auto" : "off"
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "scrollYEnabled", {
            get: function () {
                return "off" != this.verticalScrollPolicy
            }, set: function (t) {
                e.Logger.warning("egret.Scroller已废弃，请使用egret.ScrollView");
                this.verticalScrollPolicy = t ? "auto" : "off"
            }, enumerable: !0, configurable: !0
        });
        return n
    }(e.ScrollView);
    e.Scroller = t;
    t.prototype.__class__ = "egret.Scroller"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.REPEAT = "repeat";
        e.SCALE = "scale";
        return e
    }();
    e.BitmapFillMode = t;
    t.prototype.__class__ = "egret.BitmapFillMode"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e) {
            t.call(this);
            this.debug = !1;
            this.debugColor = 16711680;
            this.scale9Grid = null;
            this.fillMode = "scale";
            e && (this._texture = e, this._setSizeDirty())
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "texture", {
            get: function () {
                return this._texture
            }, set: function (e) {
                e != this._texture && (this._setSizeDirty(), this._texture = e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._render = function (e) {
            var t = this._texture;
            t ? (this._texture_to_render = t, n._drawBitmap(e, this._hasWidthSet ? this._explicitWidth : t._textureWidth, this._hasHeightSet ? this._explicitHeight : t._textureHeight, this)) : this._texture_to_render = null
        };
        n._drawBitmap = function (e, t, r, i) {
            var s = i._texture_to_render;
            if (s) {
                var o = s._textureWidth, u = s._textureHeight;
                if ("scale" == i.fillMode) {
                    var f = i.scale9Grid || s.scale9Grid;
                    if (f && o - f.width < t && u - f.height < r) n.drawScale9GridImage(e, i, f, t, r); else {
                        var f = s._offsetX, l = s._offsetY, c = s._bitmapWidth || o, h = s._bitmapHeight || u;
                        t /= o;
                        f = Math.round(f * t);
                        t = Math.round(c * t);
                        r /= u;
                        l = Math.round(l * r);
                        r = Math.round(h * r);
                        n.renderFilter.drawImage(e, i, s._bitmapX, s._bitmapY, c, h, f, l, t, r)
                    }
                } else n.drawRepeatImage(e, i, t, r, i.fillMode)
            }
        };
        n.drawRepeatImage = function (t, n, r, i, s) {
            var o = n._texture_to_render;
            if (o) {
                var u = o._textureWidth, a = o._textureHeight, f = o._bitmapX, l = o._bitmapY, u = o._bitmapWidth || u,
                    a = o._bitmapHeight || a, h = o._offsetX, o = o._offsetY;
                e.RenderFilter.getInstance().drawImage(t, n, f, l, u, a, h, o, r, i, s)
            }
        };
        n.drawScale9GridImage = function (t, n, r, i, s) {
            var o = n._texture_to_render;
            if (o && r) {
                var u = e.RenderFilter.getInstance(), a = o._textureWidth, f = o._textureHeight, l = o._bitmapX,
                    h = o._bitmapY, p = o._bitmapWidth || a, d = o._bitmapHeight || f, v = o._offsetX, o = o._offsetY;
                r = e.Rectangle.identity.initialize(r.x - Math.round(v), r.y - Math.round(v), r.width, r.height);
                v = Math.round(v);
                o = Math.round(o);
                i -= a - p;
                s -= f - d;
                r.y == r.bottom && (r.bottom < d ? r.bottom++ : r.y--);
                r.x == r.right && (r.right < p ? r.right++ : r.x--);
                var a = l + r.x, f = l + r.right, m = p - r.right, g = h + r.y, y = h + r.bottom, b = d - r.bottom,
                    w = v + r.x, E = o + r.y, d = s - (d - r.bottom), p = i - (p - r.right);
                u.drawImage(t, n, l, h, r.x, r.y, v, o, r.x, r.y);
                u.drawImage(t, n, a, h, r.width, r.y, w, o, p - r.x, r.y);
                u.drawImage(t, n, f, h, m, r.y, v + p, o, i - p, r.y);
                u.drawImage(t, n, l, g, r.x, r.height, v, E, r.x, d - r.y);
                u.drawImage(t, n, a, g, r.width, r.height, w, E, p - r.x, d - r.y);
                u.drawImage(t, n, f, g, m, r.height, v + p, E, i - p, d - r.y);
                u.drawImage(t, n, l, y, r.x, b, v, o + d, r.x, s - d);
                u.drawImage(t, n, a, y, r.width, b, w, o + d, p - r.x, s - d);
                u.drawImage(t, n, f, y, m, b, v + p, o + d, i - p, s - d)
            }
        };
        n.prototype._measureBounds = function () {
            var n = this._texture;
            return n ? e.Rectangle.identity.initialize(n._offsetX, n._offsetY, n._textureWidth, n._textureHeight) : t.prototype._measureBounds.call(this)
        };
        n.debug = !1;
        n.renderFilter = e.RenderFilter.getInstance();
        return n
    }(e.DisplayObject);
    e.Bitmap = t;
    t.prototype.__class__ = "egret.Bitmap"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._text = "";
            this._textChanged = !1;
            this._bitmapPool = []
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "text", {
            get: function () {
                return this._text
            }, set: function (e) {
                this._textChanged = !0;
                this._text = e;
                this._setSizeDirty()
            }, enumerable: !0, configurable: !0
        });
        n.prototype._updateTransform = function () {
            this.visible && (this._textChanged && this._renderText(), t.prototype._updateTransform.call(this))
        };
        n.prototype._renderText = function (t) {
            var n = t = 0;
            this._textChanged && this.removeChildren();
            for (var r = 0, i = this.text.length; r < i; r++) {
                var s = this.text.charAt(r), o = this.spriteSheet.getTexture(s);
                if (null == o) console.log("当前没有位图文字：" + s); else {
                    var s = o._offsetX, u = o._offsetY, a = o._textureWidth;
                    if (this._textChanged) {
                        var f = this._bitmapPool[r];
                        f || (f = new e.Bitmap, this._bitmapPool.push(f));
                        f.texture = o;
                        this.addChild(f);
                        f.x = t
                    }
                    t += a + s;
                    u + o._textureHeight > n && (n = u + o._textureHeight)
                }
            }
            this._textChanged = !1;
            return e.Rectangle.identity.initialize(0, 0, t, n)
        };
        n.prototype._measureBounds = function () {
            return this._renderText(!0)
        };
        return n
    }(e.DisplayObjectContainer);
    e.BitmapText = t;
    t.prototype.__class__ = "egret.BitmapText"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
            this._lastY = this._lastX = this._maxY = this._maxX = this._minY = this._minX = 0;
            this.commandQueue = []
        }

        e.prototype.beginFill = function (e, t) {
        };
        e.prototype._setStyle = function (e) {
        };
        e.prototype.drawRect = function (e, t, n, r) {
            this.checkRect(e, t, n, r)
        };
        e.prototype.drawCircle = function (e, t, n) {
            this.checkRect(e - n, t - n, 2 * n, 2 * n)
        };
        e.prototype.drawRoundRect = function (e, t, n, r, i, s) {
            this.checkRect(e, t, n, r)
        };
        e.prototype.drawEllipse = function (e, t, n, r) {
            this.checkRect(e - n, t - r, 2 * n, 2 * r)
        };
        e.prototype.lineStyle = function (e, t, n, r, i, s, o, u) {
        };
        e.prototype.lineTo = function (e, t) {
            this.checkPoint(e, t)
        };
        e.prototype.curveTo = function (e, t, n, r) {
            this.checkPoint(e, t);
            this.checkPoint(n, r)
        };
        e.prototype.moveTo = function (e, t) {
            this.checkPoint(e, t)
        };
        e.prototype.clear = function () {
            this._maxY = this._maxX = this._minY = this._minX = 0
        };
        e.prototype.endFill = function () {
        };
        e.prototype._draw = function (e) {
        };
        e.prototype.checkRect = function (e, t, n, r) {
            this._minX = Math.min(this._minX, e);
            this._minY = Math.min(this._minY, t);
            this._maxX = Math.max(this._maxX, e + n);
            this._maxY = Math.max(this._maxY, t + r)
        };
        e.prototype.checkPoint = function (e, t) {
            this._minX = Math.min(this._minX, e);
            this._minY = Math.min(this._minY, t);
            this._maxX = Math.max(this._maxX, e);
            this._maxY = Math.max(this._maxY, t);
            this._lastX = e;
            this._lastY = t
        };
        return e
    }();
    e.Graphics = t;
    t.prototype.__class__ = "egret.Graphics";
    (function () {
        return function (e, t, n) {
            this.method = e;
            this.thisObject = t;
            this.args = n
        }
    })().prototype.__class__ = "egret.Command"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this)
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "graphics", {
            get: function () {
                this._graphics || (this._graphics = new e.Graphics);
                return this._graphics
            }, enumerable: !0, configurable: !0
        });
        n.prototype._render = function (e) {
            this._graphics && this._graphics._draw(e)
        };
        return n
    }(e.DisplayObject);
    e.Shape = t;
    t.prototype.__class__ = "egret.Shape"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this)
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "graphics", {
            get: function () {
                this._graphics || (this._graphics = new e.Graphics);
                return this._graphics
            }, enumerable: !0, configurable: !0
        });
        n.prototype._render = function (e) {
            this._graphics && this._graphics._draw(e);
            t.prototype._render.call(this, e)
        };
        return n
    }(e.DisplayObjectContainer);
    e.Sprite = t;
    t.prototype.__class__ = "egret.Sprite"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._inputEnabled = !1;
            this._text = this._type = "";
            this._displayAsPassword = !1;
            this._fontFamily = n.default_fontFamily;
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 16777215;
            this._strokeColorString = "#000000";
            this._stroke = this._strokeColor = 0;
            this._textAlign = "left";
            this._verticalAlign = "top";
            this._numLines = this._lineSpacing = this._maxChars = 0;
            this._multiline = !1;
            this._textArr = [];
            this._isArrayChanged = !1;
            this._linesArr = []
        }

        __extends(n, t);
        n.prototype.isInput = function () {
            return this._type == e.TextFieldType.INPUT
        };
        n.prototype._setTouchEnabled = function (e) {
            t.prototype._setTouchEnabled.call(this, e);
            this.isInput() && (this._inputEnabled = !0)
        };
        Object.defineProperty(n.prototype, "type", {
            get: function () {
                return this._type
            }, set: function (e) {
                this._setType(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setType = function (t) {
            this._type != t && (this._type = t, this._type == e.TextFieldType.INPUT ? (this._hasWidthSet || this._setWidth(100), this._hasHeightSet || this._setHeight(30), null == this._inputUtils && (this._inputUtils = new e.InputController), this._inputUtils.init(this), this._setDirty(), this._stage && this._inputUtils._addStageText()) : this._inputUtils && (this._inputUtils._removeStageText(), this._inputUtils = null))
        };
        Object.defineProperty(n.prototype, "text", {
            get: function () {
                return this._getText()
            }, set: function (e) {
                this._setText(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._getText = function () {
            return this._type == e.TextFieldType.INPUT ? this._inputUtils._getText() : this._text
        };
        n.prototype._setSizeDirty = function () {
            t.prototype._setSizeDirty.call(this);
            this._isArrayChanged = !0
        };
        n.prototype._setTextDirty = function () {
            this._setSizeDirty()
        };
        n.prototype._setBaseText = function (e) {
            null == e && (e = "");
            if (this._text != e || this._displayAsPassword) {
                this._setTextDirty();
                this._text = e;
                e = "";
                if (this._displayAsPassword) for (var t = 0, n = this._text.length; t < n; t++) switch (this._text.charAt(t)) {
                    case"\n":
                        e += "\n";
                        break;
                    case"\r":
                        break;
                    default:
                        e += "*"
                } else e = this._text;
                this.setMiddleStyle([[e]])
            }
        };
        n.prototype._setText = function (e) {
            null == e && (e = "");
            this._setBaseText(e);
            this._inputUtils && this._inputUtils._setText(this._text)
        };
        Object.defineProperty(n.prototype, "displayAsPassword", {
            get: function () {
                return this._displayAsPassword
            }, set: function (e) {
                this._setDisplayAsPassword(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setDisplayAsPassword = function (e) {
            this._displayAsPassword != e && (this._displayAsPassword = e, this._setText(this._text))
        };
        Object.defineProperty(n.prototype, "fontFamily", {
            get: function () {
                return this._fontFamily
            }, set: function (e) {
                this._setFontFamily(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setFontFamily = function (e) {
            this._fontFamily != e && (this._setTextDirty(), this._fontFamily = e)
        };
        Object.defineProperty(n.prototype, "size", {
            get: function () {
                return this._size
            }, set: function (e) {
                this._setSize(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setSize = function (e) {
            this._size != e && (this._setTextDirty(), this._size = e)
        };
        Object.defineProperty(n.prototype, "italic", {
            get: function () {
                return this._italic
            }, set: function (e) {
                this._setItalic(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setItalic = function (e) {
            this._italic != e && (this._setTextDirty(), this._italic = e)
        };
        Object.defineProperty(n.prototype, "bold", {
            get: function () {
                return this._bold
            }, set: function (e) {
                this._setBold(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setBold = function (e) {
            this._bold != e && (this._setTextDirty(), this._bold = e)
        };
        Object.defineProperty(n.prototype, "textColor", {
            get: function () {
                return this._textColor
            }, set: function (e) {
                this._setTextColor(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setTextColor = function (t) {
            this._textColor != t && (this._setTextDirty(), this._textColor = t, this._textColorString = e.toColorString(t))
        };
        Object.defineProperty(n.prototype, "strokeColor", {
            get: function () {
                return this._strokeColor
            }, set: function (e) {
                this._setStrokeColor(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setStrokeColor = function (t) {
            this._strokeColor != t && (this._setTextDirty(), this._strokeColor = t, this._strokeColorString = e.toColorString(t))
        };
        Object.defineProperty(n.prototype, "stroke", {
            get: function () {
                return this._stroke
            }, set: function (e) {
                this._setStroke(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setStroke = function (e) {
            this._stroke != e && (this._setTextDirty(), this._stroke = e)
        };
        Object.defineProperty(n.prototype, "textAlign", {
            get: function () {
                return this._textAlign
            }, set: function (e) {
                this._setTextAlign(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setTextAlign = function (e) {
            this._textAlign != e && (this._setTextDirty(), this._textAlign = e)
        };
        Object.defineProperty(n.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign
            }, set: function (e) {
                this._setVerticalAlign(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setVerticalAlign = function (e) {
            this._verticalAlign != e && (this._setTextDirty(), this._verticalAlign = e)
        };
        Object.defineProperty(n.prototype, "maxChars", {
            get: function () {
                return this._maxChars
            }, set: function (e) {
                this._setMaxChars(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setMaxChars = function (e) {
            this._maxChars != e && (this._maxChars = e)
        };
        Object.defineProperty(n.prototype, "maxScrollV", {
            get: function () {
                return this._numLines
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "selectionBeginIndex", {
            get: function () {
                return 0
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "selectionEndIndex", {
            get: function () {
                return 0
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "caretIndex", {
            get: function () {
                return 0
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setSelection = function (e, t) {
        };
        Object.defineProperty(n.prototype, "lineSpacing", {
            get: function () {
                return this._lineSpacing
            }, set: function (e) {
                this._setLineSpacing(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setLineSpacing = function (e) {
            this._lineSpacing != e && (this._setTextDirty(), this._lineSpacing = e)
        };
        n.prototype._getLineHeight = function () {
            return this._lineSpacing + this._size
        };
        Object.defineProperty(n.prototype, "numLines", {
            get: function () {
                return this._numLines
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "multiline", {
            get: function () {
                return this._multiline
            }, set: function (e) {
                this._setMultiline(e)
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setMultiline = function (e) {
            this._multiline = e;
            this._setDirty()
        };
        n.prototype.setFocus = function () {
            e.Logger.warning("TextField.setFocus 没有实现")
        };
        n.prototype._onRemoveFromStage = function () {
            t.prototype._onRemoveFromStage.call(this);
            this._type == e.TextFieldType.INPUT && this._inputUtils._removeStageText()
        };
        n.prototype._onAddToStage = function () {
            t.prototype._onAddToStage.call(this);
            this._type == e.TextFieldType.INPUT && this._inputUtils._addStageText()
        };
        n.prototype._updateBaseTransform = function () {
            t.prototype._updateTransform.call(this)
        };
        n.prototype._updateTransform = function () {
            this._type == e.TextFieldType.INPUT ? this._normalDirty ? (this._clearDirty(), this._inputUtils._updateProperties()) : this._inputUtils._updateTransform() : this._updateBaseTransform()
        };
        n.prototype._render = function (e) {
            this.drawText(e, !1);
            this._clearDirty()
        };
        n.prototype._measureBounds = function () {
            return this.drawText(e.MainContext.instance.rendererContext, !0)
        };
        n.prototype._setTextArray = function (e) {
            for (var t = "", n = 0; n < e.length; n++) t += e[n][0], e[n][0] = this.changeToPassText(e[n][0]);
            this._text = t;
            this.setMiddleStyle(e);
            this._setSizeDirty()
        };
        n.prototype.changeToPassText = function (e) {
            if (this._displayAsPassword) {
                for (var t = "", n = 0, r = e.length; n < r; n++) switch (e.charAt(n)) {
                    case"\n":
                        t += "\n";
                        break;
                    case"\r":
                        break;
                    default:
                        t += "*"
                }
                return t
            }
            return e
        };
        n.prototype.setMiddleStyle = function (e) {
            this._isArrayChanged = !0;
            this._textArr = e
        };
        n.prototype._getLinesArr = function () {
            if (!this._isArrayChanged) return this._linesArr;
            this._isArrayChanged = !1;
            for (var t = this._textArr, n = e.MainContext.instance.rendererContext, r = this._linesArr = [], i = 0, s = 0, o = 0, u = 0; u < t.length; u++) {
                var a = t[u];
                a[1] = a[1] || {};
                for (var s = Math.max(s, a[1].size || this._size), f = a[0].toString().split(/(?:\r\n|\r|\n)/), l = 0; l < f.length; l++) {
                    null == r[o] && (r[o] = [], i = 0);
                    n.setupFont(this);
                    var h = n.measureText(f[l]);
                    if (this._hasWidthSet) if (i + h <= this._explicitWidth) r[o].push([f[l], a[1], h]), i += h; else {
                        for (var p = 0, d = 0, v = f[l]; p < v.length; p++) {
                            h = n.measureText(v.charAt(p));
                            if (i + h > this._explicitWidth) break;
                            d += h;
                            i += h
                        }
                        0 < p && (r[o].push([v.substring(0, p), a[1], d]), f[l] = v.substring(p));
                        l--
                    } else i += h, r[o].push([f[l], a[1], h]);
                    if (l < f.length - 1) {
                        r[o].push([i, s]);
                        if (this._type == e.TextFieldType.INPUT && !this._multiline) return r;
                        o++
                    }
                }
                u == t.length - 1 && r[o].push([i, s])
            }
            return r
        };
        n.prototype.drawText = function (t, n) {
            var r = this._getLinesArr();
            t.setupFont(this);
            if (!r) return e.Rectangle.identity.initialize(0, 0, 0, 0);
            for (var i = r.length, s = .5 * this._size, o = 0, u = 0, a = 0; a < r.length; a++) var f = r[a], o = o + f[f.length - 1][1], u = Math.max(f[f.length - 1][0], u);
            o += (i - 1) * this._lineSpacing;
            this._hasWidthSet && (u = this._explicitWidth);
            a = this._hasHeightSet ? this._explicitHeight : Number.POSITIVE_INFINITY;
            this._hasHeightSet && o < a && (f = 0, this._verticalAlign == e.VerticalAlign.MIDDLE ? f = .5 : this._verticalAlign == e.VerticalAlign.BOTTOM && (f = 1), s += f * (a - o));
            var s = Math.round(s), l = 0;
            this._textAlign == e.HorizontalAlign.CENTER ? l = .5 : this._textAlign == e.HorizontalAlign.RIGHT && (l = 1);
            for (var h = 0, a = 0; a < i; a++) {
                for (var f = r[a], h = Math.round((u - f[f.length - 1][0]) * l), p = 0; p < f.length - 1; p++) n || (this._type == e.TextFieldType.INPUT ? t.drawText(this, f[p][0], h, s, f[p][2], {}) : t.drawText(this, f[p][0], h, s, f[p][2], f[p][1])), h += f[p][2];
                s += f[f.length - 1][1] + this._lineSpacing;
                if (this._hasHeightSet && s - .5 * this._size > this._explicitHeight) break
            }
            return e.Rectangle.identity.initialize(0, 0, u, o)
        };
        n.default_fontFamily = "Arial";
        return n
    }(e.DisplayObject);
    e.TextField = t;
    t.prototype.__class__ = "egret.TextField"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.DYNAMIC = "dynamic";
        e.INPUT = "input";
        return e
    }();
    e.TextFieldType = t;
    t.prototype.__class__ = "egret.TextFieldType"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e) {
            t.call(this);
            var n = e.bitmapData;
            this.bitmapData = n;
            this._textureMap = {};
            this._sourceWidth = n.width;
            this._sourceHeight = n.height;
            this._bitmapX = e._bitmapX - e._offsetX;
            this._bitmapY = e._bitmapY - e._offsetY
        }

        __extends(n, t);
        n.prototype.getTexture = function (e) {
            return this._textureMap[e]
        };
        n.prototype.createTexture = function (t, n, r, i, s, o, u, a, f) {
            void 0 === o && (o = 0);
            void 0 === u && (u = 0);
            "undefined" === typeof a && (a = o + i);
            "undefined" === typeof f && (f = u + s);
            var l = new e.Texture;
            l._bitmapData = this.bitmapData;
            l._bitmapX = this._bitmapX + n;
            l._bitmapY = this._bitmapY + r;
            l._bitmapWidth = i;
            l._bitmapHeight = s;
            l._offsetX = o;
            l._offsetY = u;
            l._textureWidth = a;
            l._textureHeight = f;
            l._sourceWidth = this._sourceWidth;
            l._sourceHeight = this._sourceHeight;
            return this._textureMap[t] = l
        };
        return n
    }(e.HashObject);
    e.SpriteSheet = t;
    t.prototype.__class__ = "egret.SpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            e.Logger.warning("TextInput 已废弃，请使用TextField代替，并设置type为TextFieldType.INPUT");
            this.type = e.TextFieldType.INPUT
        }

        __extends(n, t);
        n.prototype.setText = function (t) {
            e.Logger.warning("TextField.setText()已废弃，请使用TextInput.text设置");
            this.text = t
        };
        n.prototype.getText = function () {
            e.Logger.warning("TextField.getText()已废弃，请使用TextInput.text获取");
            return this.text
        };
        n.prototype.setTextType = function (t) {
            e.Logger.warning("TextField.setTextType()已废弃，请使用TextInput.displayAsPassword设置");
            this.displayAsPassword = "password" == t
        };
        n.prototype.getTextType = function () {
            e.Logger.warning("TextField.getTextType()已废弃，请使用TextInput.displayAsPassword获取");
            return this.displayAsPassword ? "password" : "text"
        };
        return n
    }(e.TextField);
    e.TextInput = t;
    t.prototype.__class__ = "egret.TextInput"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._isFocus = !1;
            this._isFirst = this._isFirst = !0
        }

        __extends(n, t);
        n.prototype.init = function (t) {
            this._text = t;
            this.stageText = e.StageText.create();
            t = this._text.localToGlobal();
            this.stageText._open(t.x, t.y, this._text._explicitWidth, this._text._explicitHeight)
        };
        n.prototype._addStageText = function () {
            this._text._inputEnabled || (this._text._touchEnabled = !0);
            this.stageText._add();
            this.stageText._addListeners();
            this.stageText.addEventListener("blur", this.onBlurHandler, this);
            this.stageText.addEventListener("focus", this.onFocusHandler, this);
            this.stageText.addEventListener("updateText", this.updateTextHandler, this);
            this._text.addEventListener(e.TouchEvent.TOUCH_TAP, this.onMouseDownHandler, this);
            e.MainContext.instance.stage.addEventListener(e.TouchEvent.TOUCH_TAP, this.onStageDownHandler, this)
        };
        n.prototype._removeStageText = function () {
            this.stageText._remove();
            this.stageText._removeListeners();
            this._text._inputEnabled || (this._text._touchEnabled = !1);
            this.stageText.removeEventListener("blur", this.onBlurHandler, this);
            this.stageText.removeEventListener("focus", this.onFocusHandler, this);
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
            this._text.removeEventListener(e.TouchEvent.TOUCH_TAP, this.onMouseDownHandler, this);
            e.MainContext.instance.stage.removeEventListener(e.TouchEvent.TOUCH_TAP, this.onStageDownHandler, this)
        };
        n.prototype._getText = function () {
            return this.stageText._getText()
        };
        n.prototype._setText = function (e) {
            this.stageText._setText(e)
        };
        n.prototype.onFocusHandler = function (e) {
            this.hideText()
        };
        n.prototype.onBlurHandler = function (e) {
            this.showText()
        };
        n.prototype.onMouseDownHandler = function (e) {
            e.stopPropagation();
            this._text._visible && this.stageText._show()
        };
        n.prototype.onStageDownHandler = function (e) {
            this.stageText._hide();
            this.showText()
        };
        n.prototype.showText = function () {
            this._isFocus && (this._isFocus = !1, this.resetText())
        };
        n.prototype.hideText = function () {
            this._isFocus || (this._text._setBaseText(""), this._isFocus = !0)
        };
        n.prototype.updateTextHandler = function (t) {
            this.resetText();
            this._text.dispatchEvent(new e.Event(e.Event.CHANGE))
        };
        n.prototype.resetText = function () {
            this._text._setBaseText(this.stageText._getText())
        };
        n.prototype._updateTransform = function () {
            var t = this._text._worldTransform.a, n = this._text._worldTransform.b, r = this._text._worldTransform.c,
                i = this._text._worldTransform.d, s = this._text._worldTransform.tx, o = this._text._worldTransform.ty;
            this._text._updateBaseTransform();
            var u = this._text._worldTransform;
            if (this._isFirst || t != u.a || n != u.b || r != u.c || i != u.d || s != u.tx || o != u.ty) {
                this._isFirst = !1;
                t = this._text.localToGlobal();
                this.stageText.changePosition(t.x, t.y);
                var a = this;
                e.callLater(function () {
                    a.stageText._setScale(a._text._worldTransform.a, a._text._worldTransform.d)
                }, this)
            }
        };
        n.prototype._updateProperties = function () {
            var t = this._text._stage;
            if (null == t) this.stageText._setVisible(!1); else {
                for (var n = this._text, r = n._visible; r;) {
                    n = n.parent;
                    if (n == t) break;
                    r = n._visible
                }
                this.stageText._setVisible(r)
            }
            this.stageText._setMultiline(this._text._multiline);
            this.stageText._setMaxChars(this._text._maxChars);
            this.stageText._setSize(this._text._size);
            this.stageText._setTextColor(this._text._textColorString);
            this.stageText._setTextFontFamily(this._text._fontFamily);
            this.stageText._setBold(this._text._bold);
            this.stageText._setItalic(this._text._italic);
            this.stageText._setTextAlign(this._text._textAlign);
            this.stageText._setWidth(this._text._getSize(e.Rectangle.identity).width);
            this.stageText._setHeight(this._text._getSize(e.Rectangle.identity).height);
            this.stageText._setTextType(this._text._displayAsPassword ? "password" : "text");
            this.stageText._setText(this._text._text);
            this.stageText._resetStageText();
            this._updateTransform()
        };
        return n
    }(e.HashObject);
    e.InputController = t;
    t.prototype.__class__ = "egret.InputController"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t(t, n) {
            e.call(this, t);
            this.charList = this.parseConfig(n)
        }

        __extends(t, e);
        t.prototype.getTexture = function (e) {
            var t = this._textureMap[e];
            if (!t) {
                t = this.charList[e];
                if (!t) return null;
                t = this.createTexture(e, t.x, t.y, t.width, t.height, t.offsetX, t.offsetY);
                this._textureMap[e] = t
            }
            return t
        };
        t.prototype.parseConfig = function (e) {
            e = e.split("\r\n").join("\n");
            e = e.split("\n");
            for (var t = this.getConfigByKey(e[3], "count"), n = {}, r = 4; r < 4 + t; r++) {
                var i = e[r], s = String.fromCharCode(this.getConfigByKey(i, "id")), o = {};
                n[s] = o;
                o.x = this.getConfigByKey(i, "x");
                o.y = this.getConfigByKey(i, "y");
                o.width = this.getConfigByKey(i, "width");
                o.height = this.getConfigByKey(i, "height");
                o.offsetX = this.getConfigByKey(i, "xoffset");
                o.offsetY = this.getConfigByKey(i, "yoffset")
            }
            return n
        };
        t.prototype.getConfigByKey = function (e, t) {
            for (var n = e.split(" "), r = 0, i = n.length; r < i; r++) {
                var s = n[r];
                if (t == s.substring(0, t.length)) return n = s.substring(t.length + 1), parseInt(n)
            }
            return 0
        };
        return t
    }(e.SpriteSheet);
    e.BitmapTextSpriteSheet = t;
    t.prototype.__class__ = "egret.BitmapTextSpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function r(r, i) {
            t.call(this);
            this.frameRate = 60;
            r instanceof n ? (e.Logger.warning("MovieClip#constructor接口参数已经变更，请尽快调整用法为 new MovieClip(data,texture)"), this.delegate = r) : this.delegate = new n(r, i);
            this.delegate.setMovieClip(this)
        }

        __extends(r, t);
        r.prototype.gotoAndPlay = function (e) {
            this.delegate.gotoAndPlay(e)
        };
        r.prototype.gotoAndStop = function (e) {
            this.delegate.gotoAndStop(e)
        };
        r.prototype.stop = function () {
            this.delegate.stop()
        };
        r.prototype.dispose = function () {
            this.delegate.dispose()
        };
        r.prototype.release = function () {
            e.Logger.warning("MovieClip#release方法即将废弃");
            this.dispose()
        };
        r.prototype.getCurrentFrameIndex = function () {
            e.Logger.warning("MovieClip#getCurrentFrameIndex方法即将废弃");
            return this.delegate._currentFrameIndex
        };
        r.prototype.getTotalFrame = function () {
            e.Logger.warning("MovieClip#getTotalFrame方法即将废弃");
            return this.delegate._totalFrame
        };
        r.prototype.setInterval = function (t) {
            e.Logger.warning("MovieClip#setInterval方法即将废弃,请使用MovieClip#frameRate代替");
            this.frameRate = 60 / t
        };
        r.prototype.getIsPlaying = function () {
            e.Logger.warning("MovieClip#getIsPlaying方法即将废弃");
            return this.delegate.isPlaying
        };
        return r
    }(e.DisplayObjectContainer);
    e.MovieClip = t;
    t.prototype.__class__ = "egret.MovieClip";
    var n = function () {
        function t(t, n) {
            this.data = t;
            this._currentFrameIndex = this._passTime = this._totalFrame = 0;
            this._isPlaying = !1;
            this._frameData = t;
            this._spriteSheet = new e.SpriteSheet(n)
        }

        t.prototype.setMovieClip = function (t) {
            this.movieClip = t;
            this.bitmap = new e.Bitmap;
            this.movieClip.addChild(this.bitmap)
        };
        t.prototype.gotoAndPlay = function (t) {
            this.checkHasFrame(t);
            this._isPlaying = !0;
            this._currentFrameIndex = 0;
            this._currentFrameName = t;
            this._totalFrame = this._frameData.frames[t].totalFrame;
            this.playNextFrame();
            this._passTime = 0;
            e.Ticker.getInstance().register(this.update, this)
        };
        t.prototype.gotoAndStop = function (e) {
            this.checkHasFrame(e);
            this.stop();
            this._currentFrameIndex = this._passTime = 0;
            this._currentFrameName = e;
            this._totalFrame = this._frameData.frames[e].totalFrame;
            this.playNextFrame()
        };
        t.prototype.stop = function () {
            this._isPlaying = !1;
            e.Ticker.getInstance().unregister(this.update, this)
        };
        t.prototype.dispose = function () {
        };
        t.prototype.checkHasFrame = function (t) {
            void 0 == this._frameData.frames[t] && e.Logger.fatal("MovieClip没有对应的frame：", t)
        };
        t.prototype.update = function (e) {
            for (var t = 1e3 / this.movieClip.frameRate, t = Math.floor((this._passTime % t + e) / t); 1 <= t;) 1 == t ? this.playNextFrame() : this.playNextFrame(!1), t--;
            this._passTime += e
        };
        t.prototype.playNextFrame = function (t) {
            void 0 === t && (t = !0);
            var n = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (t) {
                t = this.getTexture(n.res);
                var r = this.bitmap;
                r.x = n.x;
                r.y = n.y;
                r.texture = t
            }
            null != n.action && this.movieClip.dispatchEventWith(n.action);
            this._currentFrameIndex++;
            this._currentFrameIndex == this._totalFrame && (this._currentFrameIndex = 0, n.action != e.Event.COMPLETE && this.movieClip.dispatchEventWith(e.Event.COMPLETE))
        };
        t.prototype.getTexture = function (e) {
            var t = this._frameData.res[e], n = this._spriteSheet.getTexture(e);
            n || (n = this._spriteSheet.createTexture(e, t.x, t.y, t.w, t.h));
            return n
        };
        return t
    }();
    e.DefaultMovieClipDelegate = n;
    n.prototype.__class__ = "egret.DefaultMovieClipDelegate"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this._scaleY = this._scaleX = 1;
            this._size = 30;
            this._color = "#FFFFFF";
            this._fontFamily = "Arial";
            this._italic = this._bold = !1;
            this._textAlign = "left";
            this._multiline = this._visible = !1;
            this._maxChars = 0
        }

        __extends(t, e);
        t.prototype._getText = function () {
            return null
        };
        t.prototype._setText = function (e) {
        };
        t.prototype._setTextType = function (e) {
        };
        t.prototype._getTextType = function () {
            return null
        };
        t.prototype._open = function (e, t, n, r) {
        };
        t.prototype._show = function () {
        };
        t.prototype._add = function () {
        };
        t.prototype._remove = function () {
        };
        t.prototype._hide = function () {
        };
        t.prototype._addListeners = function () {
        };
        t.prototype._removeListeners = function () {
        };
        t.prototype._setScale = function (e, t) {
            this._scaleX = e;
            this._scaleY = t
        };
        t.prototype.changePosition = function (e, t) {
        };
        t.prototype._setSize = function (e) {
            this._size = e
        };
        t.prototype._setTextColor = function (e) {
            this._color = e
        };
        t.prototype._setTextFontFamily = function (e) {
            this._fontFamily = e
        };
        t.prototype._setBold = function (e) {
            this._bold = e
        };
        t.prototype._setItalic = function (e) {
            this._italic = e
        };
        t.prototype._setTextAlign = function (e) {
            this._textAlign = e
        };
        t.prototype._setVisible = function (e) {
            this._visible = e
        };
        t.prototype._setWidth = function (e) {
        };
        t.prototype._setHeight = function (e) {
        };
        t.prototype._setMultiline = function (e) {
            this._multiline = e
        };
        t.prototype._setMaxChars = function (e) {
            this._maxChars = e
        };
        t.prototype._resetStageText = function () {
        };
        t.create = function () {
            return null
        };
        return t
    }(e.EventDispatcher);
    e.StageText = t;
    t.prototype.__class__ = "egret.StageText"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.GET = "get";
        e.POST = "post";
        return e
    }();
    e.URLRequestMethod = t;
    t.prototype.__class__ = "egret.URLRequestMethod"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.BINARY = "binary";
        e.TEXT = "text";
        e.VARIABLES = "variables";
        e.TEXTURE = "texture";
        e.SOUND = "sound";
        return e
    }();
    e.URLLoaderDataFormat = t;
    t.prototype.__class__ = "egret.URLLoaderDataFormat"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t(t) {
            void 0 === t && (t = null);
            e.call(this);
            null !== t && this.decode(t)
        }

        __extends(t, e);
        t.prototype.decode = function (e) {
            this.variables || (this.variables = {});
            e = e.split("+").join(" ");
            for (var t, n = /[?&]?([^=]+)=([^&]*)/g; t = n.exec(e);) this.variables[decodeURIComponent(t[1])] = decodeURIComponent(t[2])
        };
        t.prototype.toString = function () {
            if (!this.variables) return "";
            var e = this.variables, t = "", n = !0, r;
            for (r in e) n ? n = !1 : t += "&", t += r + "=" + e[r];
            return t
        };
        return t
    }(e.HashObject);
    e.URLVariables = t;
    t.prototype.__class__ = "egret.URLVariables"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(n) {
            void 0 === n && (n = null);
            t.call(this);
            this.method = e.URLRequestMethod.GET;
            this.url = n
        }

        __extends(n, t);
        return n
    }(e.HashObject);
    e.URLRequest = t;
    t.prototype.__class__ = "egret.URLRequest"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(n) {
            void 0 === n && (n = null);
            t.call(this);
            this.dataFormat = e.URLLoaderDataFormat.TEXT;
            this._status = -1;
            n && this.load(n)
        }

        __extends(n, t);
        n.prototype.load = function (t) {
            this._request = t;
            this.data = null;
            e.MainContext.instance.netContext.proceed(this)
        };
        return n
    }(e.EventDispatcher);
    e.URLLoader = t;
    t.prototype.__class__ = "egret.URLLoader"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._textureHeight = this._textureWidth = this._offsetY = this._offsetX = this._bitmapHeight = this._bitmapWidth = this._bitmapY = this._bitmapX = 0
        }

        __extends(n, t);
        Object.defineProperty(n.prototype, "textureWidth", {
            get: function () {
                return this._textureWidth
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "textureHeight", {
            get: function () {
                return this._textureHeight
            }, enumerable: !0, configurable: !0
        });
        Object.defineProperty(n.prototype, "bitmapData", {
            get: function () {
                return this._bitmapData
            }, enumerable: !0, configurable: !0
        });
        n.prototype._setBitmapData = function (t) {
            var n = e.MainContext.instance.rendererContext.texture_scale_factor;
            this._bitmapData = t;
            this._sourceWidth = t.width;
            this._sourceHeight = t.height;
            this._textureWidth = this._sourceWidth * n;
            this._textureHeight = this._sourceHeight * n;
            this._bitmapWidth = this._textureWidth;
            this._bitmapHeight = this._textureHeight;
            this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0
        };
        n.prototype.getPixel32 = function (e, t) {
            return this._bitmapData.getContext("2d").getImageData(e, t, 1, 1).data
        };
        return n
    }(e.HashObject);
    e.Texture = t;
    t.prototype.__class__ = "egret.Texture"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._bitmapData = document.createElement("canvas");
            this.renderContext = e.RendererContext.createRendererContext(this._bitmapData)
        }

        __extends(n, t);
        n.prototype.drawToTexture = function (t) {
            var r = this._bitmapData, i = t.getBounds(e.Rectangle.identity);
            if (0 == i.width || 0 == i.height) return e.Logger.warning("egret.RenderTexture#drawToTexture:显示对象测量结果宽高为0，请检查"), !1;
            r.width = i.width;
            r.height = i.height;
            this.renderContext._cacheCanvas && (this.renderContext._cacheCanvas.width = i.width, this.renderContext._cacheCanvas.height = i.height);
            n.identityRectangle.width = i.width;
            n.identityRectangle.height = i.height;
            t._worldTransform.identity();
            t.worldAlpha = 1;
            if (t instanceof e.DisplayObjectContainer) {
                var r = t._anchorOffsetX, s = t._anchorOffsetY;
                if (0 != t._anchorX || 0 != t._anchorY) r = t._anchorX * i.width, s = t._anchorY * i.height;
                this._offsetX = i.x + r;
                this._offsetY = i.y + s;
                t._worldTransform.append(1, 0, 0, 1, -this._offsetX, -this._offsetY);
                i = t._children;
                r = 0;
                for (s = i.length; r < s; r++) i[r]._updateTransform()
            }
            i = e.RenderFilter.getInstance();
            r = i._drawAreaList.concat();
            i._drawAreaList.length = 0;
            this.renderContext.clearScreen();
            this.renderContext.onRenderStart();
            this.webGLTexture = null;
            (s = t.mask || t._scrollRect) && this.renderContext.pushMask(s);
            t._render(this.renderContext);
            s && this.renderContext.popMask();
            i.addDrawArea(n.identityRectangle);
            this.renderContext.onRenderFinish();
            i._drawAreaList = r;
            this._textureWidth = this._bitmapData.width;
            this._textureHeight = this._bitmapData.height;
            this._sourceWidth = this._textureWidth;
            this._sourceHeight = this._textureHeight;
            return !0
        };
        n.identityRectangle = new e.Rectangle;
        return n
    }(e.Texture);
    e.RenderTexture = t;
    t.prototype.__class__ = "egret.RenderTexture"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.renderCost = 0;
            this.texture_scale_factor = 1;
            this.profiler = e.Profiler.getInstance()
        }

        __extends(n, t);
        n.prototype.clearScreen = function () {
        };
        n.prototype.clearRect = function (e, t, n, r) {
        };
        n.prototype.drawImage = function (e, t, n, r, i, s, o, u, a, f) {
            this.profiler.onDrawImage()
        };
        n.prototype.setTransform = function (e) {
        };
        n.prototype.setAlpha = function (e, t) {
        };
        n.prototype.setupFont = function (e) {
        };
        n.prototype.measureText = function (e) {
            return 0
        };
        n.prototype.drawText = function (e, t, n, r, i, s) {
            this.profiler.onDrawImage()
        };
        n.prototype.strokeRect = function (e, t, n, r, i) {
        };
        n.prototype.pushMask = function (e) {
        };
        n.prototype.popMask = function () {
        };
        n.prototype.onRenderStart = function () {
        };
        n.prototype.onRenderFinish = function () {
        };
        n.prototype.setGlobalColorTransform = function (e) {
        };
        n.createRendererContext = function (e) {
            return null
        };
        n.imageSmoothingEnabled = !0;
        return n
    }(e.HashObject);
    e.RendererContext = t;
    t.prototype.__class__ = "egret.RendererContext"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.MOUSE = "mouse";
        e.TOUCH = "touch";
        e.mode = "touch";
        return e
    }();
    e.InteractionMode = t;
    t.prototype.__class__ = "egret.InteractionMode"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._currentTouchTarget = {};
            this.maxTouches = 2;
            this.touchDownTarget = {};
            this.touchingIdentifiers = [];
            this.lastTouchY = this.lastTouchX = -1
        }

        __extends(n, t);
        n.prototype.run = function () {
        };
        n.prototype.getTouchData = function (e, t, n) {
            var r = this._currentTouchTarget[e];
            null == r && (r = {}, this._currentTouchTarget[e] = r);
            r.stageX = t;
            r.stageY = n;
            r.identifier = e;
            return r
        };
        n.prototype.dispatchEvent = function (t, n) {
            e.TouchEvent.dispatchTouchEvent(n.target, t, n.identifier, n.stageX, n.stageY, !1, !1, !1, !0 == this.touchDownTarget[n.identifier])
        };
        n.prototype.onTouchBegan = function (t, n, r) {
            if (this.touchingIdentifiers.length != this.maxTouches) {
                var i = e.MainContext.instance.stage.hitTest(t, n);
                i && (t = this.getTouchData(r, t, n), this.touchDownTarget[r] = !0, t.target = i, t.beginTarget = i, this.dispatchEvent(e.TouchEvent.TOUCH_BEGIN, t));
                this.touchingIdentifiers.push(r)
            }
        };
        n.prototype.onTouchMove = function (t, n, r) {
            if (-1 != this.touchingIdentifiers.indexOf(r) && (t != this.lastTouchX || n != this.lastTouchY)) {
                this.lastTouchX = t;
                this.lastTouchY = n;
                var i = e.MainContext.instance.stage.hitTest(t, n);
                i && (t = this.getTouchData(r, t, n), t.target = i, this.dispatchEvent(e.TouchEvent.TOUCH_MOVE, t))
            }
        };
        n.prototype.onTouchEnd = function (t, n, r) {
            var i = this.touchingIdentifiers.indexOf(r);
            -1 != i && (this.touchingIdentifiers.splice(i, 1), i = e.MainContext.instance.stage.hitTest(t, n)) && (t = this.getTouchData(r, t, n), delete this.touchDownTarget[r], r = t.beginTarget, t.target = i, this.dispatchEvent(e.TouchEvent.TOUCH_END, t), r == i ? this.dispatchEvent(e.TouchEvent.TOUCH_TAP, t) : t.beginTarget && (t.target = t.beginTarget, this.dispatchEvent(e.TouchEvent.TOUCH_RELEASE_OUTSIDE, t)), delete this._currentTouchTarget[t.identifier])
        };
        return n
    }(e.HashObject);
    e.TouchContext = t;
    t.prototype.__class__ = "egret.TouchContext"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this)
        }

        __extends(n, t);
        n.prototype.proceed = function (e) {
        };
        n._getUrl = function (t) {
            var n = t.url;
            -1 == n.indexOf("?") && t.method == e.URLRequestMethod.GET && t.data && t.data instanceof e.URLVariables && (n = n + "?" + t.data.toString());
            return n
        };
        return n
    }(e.HashObject);
    e.NetContext = t;
    t.prototype.__class__ = "egret.NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this.frameRate = 60
        }

        __extends(t, e);
        t.prototype.executeMainLoop = function (e, t) {
        };
        return t
    }(e.HashObject);
    e.DeviceContext = t;
    t.prototype.__class__ = "egret.DeviceContext"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.call = function (e, t) {
        };
        e.addCallback = function (e, t) {
        };
        return e
    }();
    e.ExternalInterface = t;
    t.prototype.__class__ = "egret.ExternalInterface"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.ua = navigator.userAgent.toLowerCase();
            this.trans = this._getTrans()
        }

        __extends(n, t);
        n.getInstance = function () {
            null == n.instance && (n.instance = new n);
            return n.instance
        };
        Object.defineProperty(n.prototype, "isMobile", {
            get: function () {
                e.Logger.warning("Browser.isMobile接口参数已经变更，请尽快调整用法为 egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ");
                return e.MainContext.deviceType == e.MainContext.DEVICE_MOBILE
            }, enumerable: !0, configurable: !0
        });
        n.prototype._getHeader = function (e) {
            if ("transform" in e) return "";
            for (var t = ["webkit", "ms", "Moz", "O"], n = 0; n < t.length; n++) if (t[n] + "Transform" in e) return t[n];
            return ""
        };
        n.prototype._getTrans = function () {
            var e = document.createElement("div").style, e = this._getHeader(e);
            return "" == e ? "transform" : e + "Transform"
        };
        n.prototype.$new = function (e) {
            return this.$(document.createElement(e))
        };
        n.prototype.$ = function (t) {
            var r = document;
            if (t = t instanceof HTMLElement ? t : r.querySelector(t)) t.find = t.find || this.$, t.hasClass = t.hasClass || function (e) {
                return this.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))
            }, t.addClass = t.addClass || function (e) {
                this.hasClass(e) || (this.className && (this.className += " "), this.className += e);
                return this
            }, t.removeClass = t.removeClass || function (e) {
                this.hasClass(e) && (this.className = this.className.replace(e, ""));
                return this
            }, t.remove = t.remove || function () {
            }, t.appendTo = t.appendTo || function (e) {
                e.appendChild(this);
                return this
            }, t.prependTo = t.prependTo || function (e) {
                e.childNodes[0] ? e.insertBefore(this, e.childNodes[0]) : e.appendChild(this);
                return this
            }, t.transforms = t.transforms || function () {
                this.style[n.getInstance().trans] = n.getInstance().translate(this.position) + n.getInstance().rotate(this.rotation) + n.getInstance().scale(this.scale) + n.getInstance().skew(this.skew);
                return this
            }, t.position = t.position || {x: 0, y: 0}, t.rotation = t.rotation || 0, t.scale = t.scale || {
                x: 1,
                y: 1
            }, t.skew = t.skew || {x: 0, y: 0}, t.translates = function (t, n) {
                this.position.x = t;
                this.position.y = n - e.MainContext.instance.stage.stageHeight;
                this.transforms();
                return this
            }, t.rotate = function (e) {
                this.rotation = e;
                this.transforms();
                return this
            }, t.resize = function (e, t) {
                this.scale.x = e;
                this.scale.y = t;
                this.transforms();
                return this
            }, t.setSkew = function (e, t) {
                this.skew.x = e;
                this.skew.y = t;
                this.transforms();
                return this
            };
            return t
        };
        n.prototype.translate = function (e) {
            return "translate(" + e.x + "px, " + e.y + "px) "
        };
        n.prototype.rotate = function (e) {
            return "rotate(" + e + "deg) "
        };
        n.prototype.scale = function (e) {
            return "scale(" + e.x + ", " + e.y + ") "
        };
        n.prototype.skew = function (e) {
            return "skewX(" + -e.x + "deg) skewY(" + e.y + "deg)"
        };
        return n
    }(e.HashObject);
    e.Browser = t;
    t.prototype.__class__ = "egret.Browser"
})(egret || (egret = {}));
(function (e) {
    (function (e) {
        e.getItem = function (e) {
            return null
        };
        e.setItem = function (e, t) {
            return !1
        };
        e.removeItem = function (e) {
        };
        e.clear = function () {
        }
    })(e.localStorage || (e.localStorage = {}))
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function t() {
        }

        t.parse = function (n) {
            n = e.SAXParser.getInstance().parserXML(n);
            if (!n || !n.childNodes) return null;
            for (var r = n.childNodes.length, i = !1, s = 0; s < r; s++) {
                var o = n.childNodes[s];
                if (1 == o.nodeType) {
                    i = !0;
                    break
                }
            }
            return i ? t.parseNode(o) : null
        };
        t.parseNode = function (e) {
            if (!e || 1 != e.nodeType) return null;
            var n = {};
            n.localName = e.localName;
            n.name = e.nodeName;
            e.namespaceURI && (n.namespace = e.namespaceURI);
            e.prefix && (n.prefix = e.prefix);
            for (var r = e.attributes, i = r.length, s = 0; s < i; s++) {
                var o = r[s], u = o.name;
                0 != u.indexOf("xmlns:") && (n["$" + u] = o.value)
            }
            r = e.childNodes;
            i = r.length;
            for (s = 0; s < i; s++) if (o = t.parseNode(r[s])) n.children || (n.children = []), o.parent = n, n.children.push(o);
            !n.children && (e = e.textContent.trim()) && (n.text = e);
            return n
        };
        t.findChildren = function (e, n, r) {
            r ? r.length = 0 : r = [];
            t.findByPath(e, n, r);
            return r
        };
        t.findByPath = function (e, n, r) {
            var i = n.indexOf("."), s;
            -1 == i ? (s = n, i = !0) : (s = n.substring(0, i), n = n.substring(i + 1), i = !1);
            if (e = e.children) for (var o = e.length, u = 0; u < o; u++) {
                var a = e[u];
                a.localName == s && (i ? r.push(a) : t.findByPath(a, n, r))
            }
        };
        t.getAttributes = function (e, t) {
            t ? t.length = 0 : t = [];
            for (var n in e) "$" == n.charAt(0) && t.push(n.substring(1));
            return t
        };
        return t
    }();
    e.XML = t;
    t.prototype.__class__ = "egret.XML"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.LITTLE_ENDIAN = "LITTLE_ENDIAN";
        e.BIG_ENDIAN = "BIG_ENDIAN";
        return e
    }();
    e.Endian = t;
    t.prototype.__class__ = "egret.Endian";
    var n = function () {
        function e() {
            this.length = this.position = 0;
            this._mode = "";
            this.maxlength = 0;
            this._endian = t.LITTLE_ENDIAN;
            this.isLittleEndian = !1;
            this._mode = "Typed array";
            this.maxlength = 4;
            this.arraybytes = new ArrayBuffer(this.maxlength);
            this.unalignedarraybytestemp = new ArrayBuffer(16);
            this.endian = e.DEFAULT_ENDIAN
        }

        Object.defineProperty(e.prototype, "endian", {
            get: function () {
                return this._endian
            }, set: function (e) {
                this._endian = e;
                this.isLittleEndian = e == t.LITTLE_ENDIAN
            }, enumerable: !0, configurable: !0
        });
        e.prototype.ensureWriteableSpace = function (e) {
            this.ensureSpace(e + this.position)
        };
        e.prototype.setArrayBuffer = function (e) {
            this.ensureSpace(e.byteLength);
            this.length = e.byteLength;
            e = new Int8Array(e);
            (new Int8Array(this.arraybytes, 0, this.length)).set(e);
            this.position = 0
        };
        Object.defineProperty(e.prototype, "bytesAvailable", {
            get: function () {
                return this.length - this.position
            }, enumerable: !0, configurable: !0
        });
        e.prototype.ensureSpace = function (e) {
            if (e > this.maxlength) {
                e = e + 255 & -256;
                var t = new ArrayBuffer(e), n = new Uint8Array(this.arraybytes, 0, this.length);
                (new Uint8Array(t, 0, this.length)).set(n);
                this.arraybytes = t;
                this.maxlength = e
            }
        };
        e.prototype.writeByte = function (e) {
            this.ensureWriteableSpace(1);
            (new Int8Array(this.arraybytes))[this.position++] = ~~e;
            this.position > this.length && (this.length = this.position)
        };
        e.prototype.readByte = function () {
            if (this.position >= this.length) throw"ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            return (new Int8Array(this.arraybytes))[this.position++]
        };
        e.prototype.readBytes = function (e, t, n) {
            void 0 === t && (t = 0);
            void 0 === n && (n = 0);
            null == n && (n = e.length);
            e.ensureWriteableSpace(t + n);
            var r = new Int8Array(e.arraybytes), i = new Int8Array(this.arraybytes);
            r.set(i.subarray(this.position, this.position + n), t);
            this.position += n;
            n + t > e.length && (e.length += n + t - e.length)
        };
        e.prototype.writeUnsignedByte = function (e) {
            this.ensureWriteableSpace(1);
            (new Uint8Array(this.arraybytes))[this.position++] = ~~e & 255;
            this.position > this.length && (this.length = this.position)
        };
        e.prototype.readUnsignedByte = function () {
            if (this.position >= this.length) throw"ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            return (new Uint8Array(this.arraybytes))[this.position++]
        };
        e.prototype.writeUnsignedShort = function (e) {
            this.ensureWriteableSpace(2);
            if (0 == (this.position & 1)) {
                var t = new Uint16Array(this.arraybytes);
                t[this.position >> 1] = ~~e & 65535
            } else t = new Uint16Array(this.unalignedarraybytestemp, 0, 1), t[0] = ~~e & 65535, e = new Uint8Array(this.arraybytes, this.position, 2), t = new Uint8Array(this.unalignedarraybytestemp, 0, 2), e.set(t);
            this.position += 2;
            this.position > this.length && (this.length = this.position)
        };
        e.prototype.readUTFBytes = function (e) {
            var t = "";
            e = this.position + e;
            for (var n = new DataView(this.arraybytes); this.position < e;) {
                var r = n.getUint8(this.position++);
                if (128 > r) {
                    if (0 == r) break;
                    t += String.fromCharCode(r)
                } else if (224 > r) t += String.fromCharCode((r & 63) << 6 | n.getUint8(this.position++) & 127); else if (240 > r) var i = n.getUint8(this.position++),
                    t = t + String.fromCharCode((r & 31) << 12 | (i & 127) << 6 | n.getUint8(this.position++) & 127); else var i = n.getUint8(this.position++),
                    s = n.getUint8(this.position++),
                    t = t + String.fromCharCode((r & 15) << 18 | (i & 127) << 12 | s << 6 & 127 | n.getUint8(this.position++) & 127)
            }
            return t
        };
        e.prototype.readInt = function () {
            var e = (new DataView(this.arraybytes)).getInt32(this.position, this.isLittleEndian);
            this.position += 4;
            return e
        };
        e.prototype.readShort = function () {
            var e = (new DataView(this.arraybytes)).getInt16(this.position, this.isLittleEndian);
            this.position += 2;
            return e
        };
        e.prototype.readDouble = function () {
            var e = (new DataView(this.arraybytes)).getFloat64(this.position, this.isLittleEndian);
            this.position += 8;
            return e
        };
        e.prototype.readUnsignedShort = function () {
            if (this.position > this.length + 2) throw"ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 1)) {
                var e = new Uint16Array(this.arraybytes), t = this.position >> 1;
                this.position += 2;
                return e[t]
            }
            e = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
            t = new Uint8Array(this.arraybytes, this.position, 2);
            (new Uint8Array(this.unalignedarraybytestemp, 0, 2)).set(t);
            this.position += 2;
            return e[0]
        };
        e.prototype.writeUnsignedInt = function (e) {
            this.ensureWriteableSpace(4);
            if (0 == (this.position & 3)) {
                var t = new Uint32Array(this.arraybytes);
                t[this.position >> 2] = ~~e & 4294967295
            } else t = new Uint32Array(this.unalignedarraybytestemp, 0, 1), t[0] = ~~e & 4294967295, e = new Uint8Array(this.arraybytes, this.position, 4), t = new Uint8Array(this.unalignedarraybytestemp, 0, 4), e.set(t);
            this.position += 4;
            this.position > this.length && (this.length = this.position)
        };
        e.prototype.readUnsignedInt = function () {
            if (this.position > this.length + 4) throw"ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 3)) {
                var e = new Uint32Array(this.arraybytes), t = this.position >> 2;
                this.position += 4;
                return e[t]
            }
            e = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
            t = new Uint8Array(this.arraybytes, this.position, 4);
            (new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(t);
            this.position += 4;
            return e[0]
        };
        e.prototype.writeFloat = function (e) {
            this.ensureWriteableSpace(4);
            if (0 == (this.position & 3)) {
                var t = new Float32Array(this.arraybytes);
                t[this.position >> 2] = e
            } else t = new Float32Array(this.unalignedarraybytestemp, 0, 1), t[0] = e, e = new Uint8Array(this.arraybytes, this.position, 4), t = new Uint8Array(this.unalignedarraybytestemp, 0, 4), e.set(t);
            this.position += 4;
            this.position > this.length && (this.length = this.position)
        };
        e.prototype.readFloat = function () {
            if (this.position > this.length + 4) throw"ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
            if (0 == (this.position & 3)) {
                var e = new Float32Array(this.arraybytes), t = this.position >> 2;
                this.position += 4;
                return e[t]
            }
            e = new Float32Array(this.unalignedarraybytestemp, 0, 1);
            t = new Uint8Array(this.arraybytes, this.position, 4);
            (new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(t);
            this.position += 4;
            return e[0]
        };
        e.DEFAULT_ENDIAN = t.BIG_ENDIAN;
        return e
    }();
    e.ByteArray = n;
    n.prototype.__class__ = "egret.ByteArray"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r) {
            t.call(this);
            this._target = null;
            this.loop = this.ignoreGlobalPause = this._useTicks = !1;
            this._actions = this._steps = this.pluginData = null;
            this.paused = !1;
            this.duration = 0;
            this._prevPos = -1;
            this.position = null;
            this._stepPosition = this._prevPosition = 0;
            this.passive = !1;
            this.initialize(e, n, r)
        }

        __extends(n, t);
        n.get = function (e, t, r, i) {
            void 0 === t && (t = null);
            void 0 === r && (r = null);
            void 0 === i && (i = !1);
            i && n.removeTweens(e);
            return new n(e, t, r)
        };
        n.removeTweens = function (e) {
            if (e.tween_count) {
                for (var t = n._tweens, r = t.length - 1; 0 <= r; r--) t[r]._target == e && (t[r].paused = !0, t.splice(r, 1));
                e.tween_count = 0
            }
        };
        n.pauseTweens = function (t) {
            if (t.tween_count) for (var n = e.Tween._tweens, r = n.length - 1; 0 <= r; r--) n[r]._target == t && (n[r].paused = !0)
        };
        n.resumeTweens = function (t) {
            if (t.tween_count) for (var n = e.Tween._tweens, r = n.length - 1; 0 <= r; r--) n[r]._target == t && (n[r].paused = !1)
        };
        n.tick = function (e, t) {
            void 0 === t && (t = !1);
            for (var r = n._tweens.concat(), i = r.length - 1; 0 <= i; i--) {
                var s = r[i];
                t && !s.ignoreGlobalPause || s.paused || s.tick(s._useTicks ? 1 : e)
            }
        };
        n._register = function (t, r) {
            var i = t._target, s = n._tweens;
            if (r) i && (i.tween_count = i.tween_count ? i.tween_count + 1 : 1), s.push(t), n._inited || (e.Ticker.getInstance().register(n.tick, null), n._inited = !0); else for (i && i.tween_count--, i = s.length; i--;) if (s[i] == t) {
                s.splice(i, 1);
                break
            }
        };
        n.removeAllTweens = function () {
            for (var e = n._tweens, t = 0, r = e.length; t < r; t++) {
                var i = e[t];
                i.paused = !0;
                i._target.tweenjs_count = 0
            }
            e.length = 0
        };
        n.prototype.initialize = function (e, t, r) {
            this._target = e;
            t && (this._useTicks = t.useTicks, this.ignoreGlobalPause = t.ignoreGlobalPause, this.loop = t.loop, t.onChange && this.addEventListener("change", t.onChange, t.onChangeObj), t.override && n.removeTweens(e));
            this.pluginData = r || {};
            this._curQueueProps = {};
            this._initQueueProps = {};
            this._steps = [];
            this._actions = [];
            t && t.paused ? this.paused = !0 : n._register(this, !0);
            t && null != t.position && this.setPosition(t.position, n.NONE)
        };
        n.prototype.setPosition = function (e, t) {
            void 0 === t && (t = 1);
            0 > e && (e = 0);
            var n = e, r = !1;
            n >= this.duration && (this.loop ? n %= this.duration : (n = this.duration, r = !0));
            if (n == this._prevPos) return r;
            var i = this._prevPos;
            this.position = this._prevPos = n;
            this._prevPosition = e;
            if (this._target) if (r) this._updateTargetProps(null, 1); else if (0 < this._steps.length) {
                for (var s = 0, o = this._steps.length; s < o && !(this._steps[s].t > n); s++) ;
                s = this._steps[s - 1];
                this._updateTargetProps(s, (this._stepPosition = n - s.t) / s.d)
            }
            0 != t && 0 < this._actions.length && (this._useTicks ? this._runActions(n, n) : 1 == t && n < i ? (i != this.duration && this._runActions(i, this.duration), this._runActions(0, n, !0)) : this._runActions(i, n));
            r && this.setPaused(!0);
            this.dispatchEventWith("change");
            return r
        };
        n.prototype._runActions = function (e, t, n) {
            void 0 === n && (n = !1);
            var r = e, i = t, s = -1, o = this._actions.length, u = 1;
            e > t && (r = t, i = e, s = o, o = u = -1);
            for (; (s += u) != o;) {
                t = this._actions[s];
                var a = t.t;
                (a == i || a > r && a < i || n && a == e) && t.f.apply(t.o, t.p)
            }
        };
        n.prototype._updateTargetProps = function (e, t) {
            var r, i, s, o;
            if (e || 1 != t) {
                if (this.passive = !!e.v) return;
                e.e && (t = e.e(t, 0, 1, 1));
                r = e.p0;
                i = e.p1
            } else this.passive = !1, r = i = this._curQueueProps;
            for (var u in this._initQueueProps) {
                null == (s = r[u]) && (r[u] = s = this._initQueueProps[u]);
                null == (o = i[u]) && (i[u] = o = s);
                s = s == o || 0 == t || 1 == t || "number" != typeof s ? 1 == t ? o : s : s + (o - s) * t;
                var f = !1;
                if (o = n._plugins[u]) for (var l = 0, c = o.length; l < c; l++) {
                    var h = o[l].tween(this, u, s, r, i, t, !!e && r == i, !e);
                    h == n.IGNORE ? f = !0 : s = h
                }
                f || (this._target[u] = s)
            }
        };
        n.prototype.setPaused = function (e) {
            this.paused = e;
            n._register(this, !e);
            return this
        };
        n.prototype._cloneProps = function (e) {
            var t = {}, n;
            for (n in e) t[n] = e[n];
            return t
        };
        n.prototype._addStep = function (e) {
            0 < e.d && (this._steps.push(e), e.t = this.duration, this.duration += e.d);
            return this
        };
        n.prototype._appendQueueProps = function (e) {
            var t, r, i, s, o, u;
            for (u in e) if (void 0 === this._initQueueProps[u]) {
                r = this._target[u];
                if (t = n._plugins[u]) for (i = 0, s = t.length; i < s; i++) r = t[i].init(this, u, r);
                this._initQueueProps[u] = this._curQueueProps[u] = void 0 === r ? null : r
            }
            for (u in e) {
                r = this._curQueueProps[u];
                if (t = n._plugins[u]) for (o = o || {}, i = 0, s = t.length; i < s; i++) t[i].step && t[i].step(this, u, r, e[u], o);
                this._curQueueProps[u] = e[u]
            }
            o && this._appendQueueProps(o);
            return this._curQueueProps
        };
        n.prototype._addAction = function (e) {
            e.t = this.duration;
            this._actions.push(e);
            return this
        };
        n.prototype._set = function (e, t) {
            for (var n in e) t[n] = e[n]
        };
        n.prototype.wait = function (e, t) {
            if (null == e || 0 >= e) return this;
            var n = this._cloneProps(this._curQueueProps);
            return this._addStep({d: e, p0: n, p1: n, v: t})
        };
        n.prototype.to = function (e, t, n) {
            void 0 === n && (n = void 0);
            if (isNaN(t) || 0 > t) t = 0;
            return this._addStep({
                d: t || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: n,
                p1: this._cloneProps(this._appendQueueProps(e))
            })
        };
        n.prototype.call = function (e, t, n) {
            void 0 === t && (t = void 0);
            void 0 === n && (n = void 0);
            return this._addAction({f: e, p: n ? n : [], o: t ? t : this._target})
        };
        n.prototype.set = function (e, t) {
            void 0 === t && (t = null);
            return this._addAction({f: this._set, o: this, p: [e, t ? t : this._target]})
        };
        n.prototype.play = function (e) {
            e || (e = this);
            return this.call(e.setPaused, e, [!1])
        };
        n.prototype.pause = function (e) {
            e || (e = this);
            return this.call(e.setPaused, e, [!0])
        };
        n.prototype.tick = function (e) {
            this.paused || this.setPosition(this._prevPosition + e)
        };
        n.NONE = 0;
        n.LOOP = 1;
        n.REVERSE = 2;
        n._tweens = [];
        n.IGNORE = {};
        n._plugins = {};
        n._inited = !1;
        return n
    }(e.EventDispatcher);
    e.Tween = t;
    t.prototype.__class__ = "egret.Tween"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function t() {
            e.Logger.fatal("Ease不能被实例化")
        }

        t.get = function (e) {
            -1 > e && (e = -1);
            1 < e && (e = 1);
            return function (t) {
                return 0 == e ? t : 0 > e ? t * (t * -e + 1 + e) : t * ((2 - t) * e + (1 - e))
            }
        };
        t.getPowIn = function (e) {
            return function (t) {
                return Math.pow(t, e)
            }
        };
        t.getPowOut = function (e) {
            return function (t) {
                return 1 - Math.pow(1 - t, e)
            }
        };
        t.getPowInOut = function (e) {
            return function (t) {
                return 1 > (t *= 2) ? .5 * Math.pow(t, e) : 1 - .5 * Math.abs(Math.pow(2 - t, e))
            }
        };
        t.sineIn = function (e) {
            return 1 - Math.cos(e * Math.PI / 2)
        };
        t.sineOut = function (e) {
            return Math.sin(e * Math.PI / 2)
        };
        t.sineInOut = function (e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        };
        t.getBackIn = function (e) {
            return function (t) {
                return t * t * ((e + 1) * t - e)
            }
        };
        t.getBackOut = function (e) {
            return function (t) {
                return --t * t * ((e + 1) * t + e) + 1
            }
        };
        t.getBackInOut = function (e) {
            e *= 1.525;
            return function (t) {
                return 1 > (t *= 2) ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }
        };
        t.circIn = function (e) {
            return -(Math.sqrt(1 - e * e) - 1)
        };
        t.circOut = function (e) {
            return Math.sqrt(1 - --e * e)
        };
        t.circInOut = function (e) {
            return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        };
        t.bounceIn = function (e) {
            return 1 - t.bounceOut(1 - e)
        };
        t.bounceOut = function (e) {
            return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        };
        t.bounceInOut = function (e) {
            return .5 > e ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5
        };
        t.getElasticIn = function (e, t) {
            var n = 2 * Math.PI;
            return function (r) {
                if (0 == r || 1 == r) return r;
                var i = t / n * Math.asin(1 / e);
                return -(e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - i) * n / t))
            }
        };
        t.getElasticOut = function (e, t) {
            var n = 2 * Math.PI;
            return function (r) {
                if (0 == r || 1 == r) return r;
                var i = t / n * Math.asin(1 / e);
                return e * Math.pow(2, -10 * r) * Math.sin((r - i) * n / t) + 1
            }
        };
        t.getElasticInOut = function (e, t) {
            var n = 2 * Math.PI;
            return function (r) {
                var i = t / n * Math.asin(1 / e);
                return 1 > (r *= 2) ? -.5 * e * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - i) * n / t) : e * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - i) * n / t) * .5 + 1
            }
        };
        t.quadIn = t.getPowIn(2);
        t.quadOut = t.getPowOut(2);
        t.quadInOut = t.getPowInOut(2);
        t.cubicIn = t.getPowIn(3);
        t.cubicOut = t.getPowOut(3);
        t.cubicInOut = t.getPowInOut(3);
        t.quartIn = t.getPowIn(4);
        t.quartOut = t.getPowOut(4);
        t.quartInOut = t.getPowInOut(4);
        t.quintIn = t.getPowIn(5);
        t.quintOut = t.getPowOut(5);
        t.quintInOut = t.getPowInOut(5);
        t.backIn = t.getBackIn(1.7);
        t.backOut = t.getBackOut(1.7);
        t.backInOut = t.getBackInOut(1.7);
        t.elasticIn = t.getElasticIn(1, .3);
        t.elasticOut = t.getElasticOut(1, .3);
        t.elasticInOut = t.getElasticInOut(1, .3 * 1.5);
        return t
    }();
    e.Ease = t;
    t.prototype.__class__ = "egret.Ease"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
            this.type = e.EFFECT
        }

        e.prototype.play = function (e) {
            void 0 === e && (e = !1);
            var t = this.audio;
            t && (isNaN(t.duration) || (t.currentTime = 0), t.loop = e, t.play())
        };
        e.prototype.pause = function () {
            var e = this.audio;
            e && e.pause()
        };
        e.prototype.load = function () {
            var e = this.audio;
            e && e.load()
        };
        e.prototype.addEventListener = function (e, t) {
            this.audio && this.audio.addEventListener(e, t, !1)
        };
        e.prototype.removeEventListener = function (e, t) {
            this.audio && this.audio.removeEventListener(e, t, !1)
        };
        e.prototype.setVolume = function (e) {
            var t = this.audio;
            t && (t.volume = e)
        };
        e.prototype.getVolume = function () {
            return this.audio ? this.audio.volume : 0
        };
        e.prototype.preload = function (e) {
            this.type = e
        };
        e.prototype._setAudio = function (e) {
            this.audio = e
        };
        e.MUSIC = "music";
        e.EFFECT = "effect";
        return e
    }();
    e.Sound = t;
    t.prototype.__class__ = "egret.Sound"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.isNumber = function (e) {
            return "number" === typeof e && !isNaN(e)
        };
        return e
    }();
    e.NumberUtils = t;
    t.prototype.__class__ = "egret.NumberUtils"
})(egret || (egret = {}));
Function.prototype.bind || (Function.prototype.bind = function (e) {
    if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var t = Array.prototype.slice.call(arguments, 1), n = this, r = function () {
    }, i = function () {
        return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments)))
    };
    r.prototype = this.prototype;
    i.prototype = new r;
    return i
});
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, RES;
(function (e) {
    var t = function (e) {
        function t(t, n, r) {
            void 0 === n && (n = !1);
            void 0 === r && (r = !1);
            e.call(this, t, n, r);
            this.itemsTotal = this.itemsLoaded = 0
        }

        __extends(t, e);
        t.dispatchResourceEvent = function (e, n, r, i, s, o) {
            void 0 === r && (r = "");
            void 0 === i && (i = null);
            void 0 === s && (s = 0);
            void 0 === o && (o = 0);
            var u = egret.Event._getPropertyData(t);
            u.groupName = r;
            u.resItem = i;
            u.itemsLoaded = s;
            u.itemsTotal = o;
            egret.Event._dispatchByTarget(t, e, n, u)
        };
        t.ITEM_LOAD_ERROR = "itemLoadError";
        t.CONFIG_COMPLETE = "configComplete";
        t.GROUP_PROGRESS = "groupProgress";
        t.GROUP_COMPLETE = "groupComplete";
        return t
    }(egret.Event);
    e.ResourceEvent = t;
    t.prototype.__class__ = "RES.ResourceEvent"
})(RES || (RES = {}));
(function (e) {
    var t = function () {
        function e(e, t, n) {
            this._loaded = !1;
            this.name = e;
            this.url = t;
            this.type = n
        }

        Object.defineProperty(e.prototype, "loaded", {
            get: function () {
                return this.data ? this.data.loaded : this._loaded
            }, set: function (e) {
                this.data && (this.data.loaded = e);
                this._loaded = e
            }, enumerable: !0, configurable: !0
        });
        e.prototype.toString = function () {
            return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
        };
        e.TYPE_XML = "xml";
        e.TYPE_IMAGE = "image";
        e.TYPE_BIN = "bin";
        e.TYPE_TEXT = "text";
        e.TYPE_JSON = "json";
        e.TYPE_SHEET = "sheet";
        e.TYPE_FONT = "font";
        e.TYPE_SOUND = "sound";
        return e
    }();
    e.ResourceItem = t;
    t.prototype.__class__ = "RES.ResourceItem"
})(RES || (RES = {}));
(function (e) {
    var t = function () {
        function t() {
            this.keyMap = {};
            this.groupDic = {};
            e.configInstance = this
        }

        t.prototype.getGroupByName = function (e) {
            var t = [];
            if (!this.groupDic[e]) return t;
            e = this.groupDic[e];
            for (var n = e.length, r = 0; r < n; r++) t.push(this.parseResourceItem(e[r]));
            return t
        };
        t.prototype.getRawGroupByName = function (e) {
            return this.groupDic[e] ? this.groupDic[e] : []
        };
        t.prototype.createGroup = function (e, t, n) {
            void 0 === n && (n = !1);
            if (!n && this.groupDic[e] || !t || 0 == t.length) return !1;
            n = this.groupDic;
            for (var r = [], i = t.length, s = 0; s < i; s++) {
                var o = t[s], u = n[o];
                if (u) for (var o = u.length, a = 0; a < o; a++) {
                    var f = u[a];
                    -1 == r.indexOf(f) && r.push(f)
                } else (f = this.keyMap[o]) && -1 == r.indexOf(f) && r.push(f)
            }
            if (0 == r.length) return !1;
            this.groupDic[e] = r;
            return !0
        };
        t.prototype.parseConfig = function (e, t) {
            if (e) {
                var n = e.resources;
                if (n) for (var r = n.length, i = 0; i < r; i++) {
                    var s = n[i], o = s.url;
                    o && -1 == o.indexOf("://") && (s.url = t + o);
                    this.addItemToKeyMap(s)
                }
                if (n = e.groups) for (r = n.length, i = 0; i < r; i++) {
                    for (var o = n[i], u = [], a = o.keys.split(","), f = a.length, l = 0; l < f; l++) s = a[l].trim(), (s = this.keyMap[s]) && -1 == u.indexOf(s) && u.push(s);
                    this.groupDic[o.name] = u
                }
            }
        };
        t.prototype.addSubkey = function (e, t) {
            var n = this.keyMap[t];
            n && !this.keyMap[e] && (this.keyMap[e] = n)
        };
        t.prototype.addItemToKeyMap = function (e) {
            this.keyMap[e.name] || (this.keyMap[e.name] = e);
            if (e.hasOwnProperty("subkeys")) {
                var t = e.subkeys.split(",");
                e.subkeys = t;
                for (var n = t.length, r = 0; r < n; r++) {
                    var i = t[r];
                    null == this.keyMap[i] && (this.keyMap[i] = e)
                }
            }
        };
        t.prototype.getName = function (e) {
            return (e = this.keyMap[e]) ? e.name : ""
        };
        t.prototype.getType = function (e) {
            return (e = this.keyMap[e]) ? e.type : ""
        };
        t.prototype.getRawResourceItem = function (e) {
            return this.keyMap[e]
        };
        t.prototype.getResourceItem = function (e) {
            return (e = this.keyMap[e]) ? this.parseResourceItem(e) : null
        };
        t.prototype.parseResourceItem = function (t) {
            var n = new e.ResourceItem(t.name, t.url, t.type);
            n.data = t;
            return n
        };
        return t
    }();
    e.ResourceConfig = t;
    t.prototype.__class__ = "RES.ResourceConfig"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.thread = 2;
            this.loadingCount = 0;
            this.groupTotalDic = {};
            this.numLoadedDic = {};
            this.itemListDic = {};
            this.priorityQueue = {};
            this.lazyLoadList = [];
            this.analyzerDic = {};
            this.queueIndex = 0
        }

        __extends(n, t);
        n.prototype.isGroupInLoading = function (e) {
            return void 0 !== this.itemListDic[e]
        };
        n.prototype.loadGroup = function (t, n, r) {
            void 0 === r && (r = 0);
            if (!this.itemListDic[n] && n) if (t && 0 != t.length) {
                this.priorityQueue[r] ? this.priorityQueue[r].push(n) : this.priorityQueue[r] = [n];
                this.itemListDic[n] = t;
                r = t.length;
                for (var i = 0; i < r; i++) t[i].groupName = n;
                this.groupTotalDic[n] = t.length;
                this.numLoadedDic[n] = 0;
                this.next()
            } else egret.Logger.warning('RES加载了不存在或空的资源组："' + n + '"'), t = new e.ResourceEvent(e.ResourceEvent.GROUP_COMPLETE), t.groupName = n, this.dispatchEvent(t)
        };
        n.prototype.loadItem = function (e) {
            this.lazyLoadList.push(e);
            e.groupName = "";
            this.next()
        };
        n.prototype.next = function () {
            for (; this.loadingCount < this.thread;) {
                var t = this.getOneResourceItem();
                if (!t) break;
                this.loadingCount++;
                if (t.loaded) this.onItemComplete(t); else {
                    var n = this.analyzerDic[t.type];
                    n || (n = this.analyzerDic[t.type] = egret.Injector.getInstance(e.AnalyzerBase, t.type));
                    n.loadFile(t, this.onItemComplete, this)
                }
            }
        };
        n.prototype.getOneResourceItem = function () {
            var e = Number.NEGATIVE_INFINITY, t;
            for (t in this.priorityQueue) e = Math.max(e, t);
            e = this.priorityQueue[e];
            if (!e || 0 == e.length) return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
            t = e.length;
            for (var n, r = 0; r < t; r++) {
                this.queueIndex >= t && (this.queueIndex = 0);
                n = this.itemListDic[e[this.queueIndex]];
                if (0 < n.length) break;
                this.queueIndex++
            }
            return 0 == n.length ? null : n.shift()
        };
        n.prototype.onItemComplete = function (t) {
            this.loadingCount--;
            var n = t.groupName;
            t.loaded || e.ResourceEvent.dispatchResourceEvent(this.resInstance, e.ResourceEvent.ITEM_LOAD_ERROR, n, t);
            if (n) {
                this.numLoadedDic[n]++;
                var r = this.numLoadedDic[n], i = this.groupTotalDic[n];
                e.ResourceEvent.dispatchResourceEvent(this.resInstance, e.ResourceEvent.GROUP_PROGRESS, n, t, r, i);
                r == i && (this.removeGroupName(n), delete this.groupTotalDic[n], delete this.numLoadedDic[n], delete this.itemListDic[n], e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.GROUP_COMPLETE, n))
            } else this.callBack.call(this.resInstance, t);
            this.next()
        };
        n.prototype.removeGroupName = function (e) {
            for (var t in this.priorityQueue) {
                for (var n = this.priorityQueue[t], r = n.length, i = 0, s = !1, r = n.length, o = 0; o < r; o++) {
                    if (n[o] == e) {
                        n.splice(i, 1);
                        s = !0;
                        break
                    }
                    i++
                }
                if (s) {
                    0 == n.length && delete this.priorityQueue[t];
                    break
                }
            }
        };
        return n
    }(egret.EventDispatcher);
    e.ResourceLoader = t;
    t.prototype.__class__ = "RES.ResourceLoader"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.resourceConfig = e.configInstance
        }

        __extends(n, t);
        n.prototype.addSubkey = function (e, t) {
            this.resourceConfig.addSubkey(e, t)
        };
        n.prototype.loadFile = function (e, t, n) {
        };
        n.prototype.getRes = function (e) {
        };
        n.prototype.destroyRes = function (e) {
            return !1
        };
        n.getStringPrefix = function (e) {
            if (!e) return "";
            var t = e.indexOf(".");
            return -1 != t ? e.substring(0, t) : ""
        };
        n.getStringTail = function (e) {
            if (!e) return "";
            var t = e.indexOf(".");
            return -1 != t ? e.substring(t + 1) : ""
        };
        return n
    }(egret.HashObject);
    e.AnalyzerBase = t;
    t.prototype.__class__ = "RES.AnalyzerBase"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this.fileDic = {};
            this.resItemDic = [];
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            this.recycler = new egret.Recycler
        }

        __extends(t, e);
        t.prototype.loadFile = function (e, t, n) {
            if (this.fileDic[e.name]) t.call(n, e); else {
                var r = this.getLoader();
                this.resItemDic[r.hashCode] = {item: e, func: t, thisObject: n};
                r.load(new egret.URLRequest(e.url))
            }
        };
        t.prototype.getLoader = function () {
            var e = this.recycler.pop();
            e || (e = new egret.URLLoader, e.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this), e.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this));
            e.dataFormat = this._dataFormat;
            return e
        };
        t.prototype.onLoadFinish = function (e) {
            var t = e.target, n = this.resItemDic[t.hashCode];
            delete this.resItemDic[t.hashCode];
            this.recycler.push(t);
            var r = n.item, i = n.func;
            r.loaded = e.type == egret.Event.COMPLETE;
            r.loaded && this.analyzeData(r, t.data);
            i.call(n.thisObject, r)
        };
        t.prototype.analyzeData = function (e, t) {
            var n = e.name;
            !this.fileDic[n] && t && (this.fileDic[n] = t)
        };
        t.prototype.getRes = function (e) {
            return this.fileDic[e]
        };
        t.prototype.hasRes = function (e) {
            return null != this.getRes(e)
        };
        t.prototype.destroyRes = function (e) {
            return this.fileDic[e] ? (delete this.fileDic[e], !0) : !1
        };
        return t
    }(e.AnalyzerBase);
    e.BinAnalyzer = t;
    t.prototype.__class__ = "RES.BinAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXTURE
        }

        __extends(t, e);
        t.prototype.analyzeData = function (e, t) {
            var n = e.name;
            !this.fileDic[n] && t && (this.fileDic[n] = t, (n = e.data) && n.scale9grid && (n = n.scale9grid.split(","), t.scale9Grid = new egret.Rectangle(parseInt(n[0]), parseInt(n[1]), parseInt(n[2]), parseInt(n[3]))))
        };
        return t
    }(e.BinAnalyzer);
    e.ImageAnalyzer = t;
    t.prototype.__class__ = "RES.ImageAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(t, e);
        t.prototype.analyzeData = function (e, t) {
            var n = e.name;
            if (!this.fileDic[n] && t) try {
                this.fileDic[n] = JSON.parse(t)
            } catch (r) {
                egret.Logger.warning("JSON文件格式不正确: " + e.url + "\ndata:" + t)
            }
        };
        return t
    }(e.BinAnalyzer);
    e.JsonAnalyzer = t;
    t.prototype.__class__ = "RES.JsonAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(t, e);
        return t
    }(e.BinAnalyzer);
    e.TextAnalyzer = t;
    t.prototype.__class__ = "RES.TextAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this.sheetMap = {};
            this.textureMap = {};
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(n, t);
        n.prototype.getRes = function (t) {
            var n = this.fileDic[t];
            n || (n = this.textureMap[t]);
            !n && (n = e.AnalyzerBase.getStringPrefix(t), n = this.fileDic[n]) && (t = e.AnalyzerBase.getStringTail(t), n = n.getTexture(t));
            return n
        };
        n.prototype.onLoadFinish = function (e) {
            var t = e.target, n = this.resItemDic[t.hashCode];
            delete this.resItemDic[t.hashCode];
            this.recycler.push(t);
            var r = n.item, i = n.func;
            r.loaded = e.type == egret.Event.COMPLETE;
            r.loaded && this.analyzeData(r, t.data);
            "string" == typeof t.data ? (this._dataFormat = egret.URLLoaderDataFormat.TEXTURE, this.loadFile(r, i, n.thisObject), this._dataFormat = egret.URLLoaderDataFormat.TEXT) : i.call(n.thisObject, r)
        };
        n.prototype.analyzeData = function (e, t) {
            var n = e.name;
            if (!this.fileDic[n] && t) {
                var r;
                if ("string" == typeof t) {
                    try {
                        r = JSON.parse(t)
                    } catch (i) {
                        egret.Logger.warning("JSON文件格式不正确: " + e.url)
                    }
                    r && (this.sheetMap[n] = r, e.loaded = !1, e.url = this.getRelativePath(e.url, r.file))
                } else r = this.sheetMap[n], delete this.sheetMap[n], t && (r = this.parseSpriteSheet(t, r, e.data && e.data.subkeys ? "" : n), this.fileDic[n] = r)
            }
        };
        n.prototype.getRelativePath = function (e, t) {
            e = e.split("\\").join("/");
            var n = e.lastIndexOf("/");
            return e = -1 != n ? e.substring(0, n + 1) + t : t
        };
        n.prototype.parseSpriteSheet = function (e, t, n) {
            t = t.frames;
            if (!t) return null;
            var r = new egret.SpriteSheet(e), i = this.textureMap, s;
            for (s in t) {
                var o = t[s];
                e = r.createTexture(s, o.x, o.y, o.w, o.h, o.offX, o.offY, o.sourceW, o.sourceH);
                o.scale9grid && (o = o.scale9grid.split(","), e.scale9Grid = new egret.Rectangle(parseInt(o[0]), parseInt(o[1]), parseInt(o[2]), parseInt(o[3])));
                null == i[s] && (i[s] = e, n && this.addSubkey(s, n))
            }
            return r
        };
        return n
    }(e.BinAnalyzer);
    e.SheetAnalyzer = t;
    t.prototype.__class__ = "RES.SheetAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this)
        }

        __extends(t, e);
        t.prototype.analyzeData = function (e, t) {
            var n = e.name;
            if (!this.fileDic[n] && t) {
                var r;
                "string" == typeof t ? (r = t, this.sheetMap[n] = r, e.loaded = !1, e.url = this.getTexturePath(e.url, r)) : (r = this.sheetMap[n], delete this.sheetMap[n], t && (r = new egret.BitmapTextSpriteSheet(t, r), this.fileDic[n] = r))
            }
        };
        t.prototype.getTexturePath = function (e, t) {
            var n = "", r = t.split("\n")[2], i = r.indexOf('file="');
            -1 != i && (r = r.substring(i + 6), i = r.indexOf('"'), n = r.substring(0, i));
            e = e.split("\\").join("/");
            i = e.lastIndexOf("/");
            return e = -1 != i ? e.substring(0, i + 1) + n : n
        };
        return t
    }(e.SheetAnalyzer);
    e.FontAnalyzer = t;
    t.prototype.__class__ = "RES.FontAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.SOUND
        }

        __extends(t, e);
        t.prototype.analyzeData = function (e, t) {
            var n = e.name;
            !this.fileDic[n] && t && (this.fileDic[n] = t, (n = e.data) && n.soundType ? t.preload(n.soundType) : t.preload(egret.Sound.EFFECT))
        };
        return t
    }(e.BinAnalyzer);
    e.SoundAnalyzer = t;
    t.prototype.__class__ = "RES.SoundAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }

        __extends(t, e);
        t.prototype.analyzeData = function (e, t) {
            var n = e.name;
            if (!this.fileDic[n] && t) try {
                var r = egret.XML.parse(t);
                this.fileDic[n] = r
            } catch (i) {
            }
        };
        return t
    }(e.BinAnalyzer);
    e.XMLAnalyzer = t;
    t.prototype.__class__ = "RES.XMLAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    e.loadConfig = function (e, t, r) {
        void 0 === t && (t = "");
        void 0 === r && (r = "json");
        n.loadConfig(e, t, r)
    };
    e.loadGroup = function (e, t) {
        void 0 === t && (t = 0);
        n.loadGroup(e, t)
    };
    e.isGroupLoaded = function (e) {
        return n.isGroupLoaded(e)
    };
    e.getGroupByName = function (e) {
        return n.getGroupByName(e)
    };
    e.createGroup = function (e, t, r) {
        void 0 === r && (r = !1);
        return n.createGroup(e, t, r)
    };
    e.hasRes = function (e) {
        return n.hasRes(e)
    };
    e.getRes = function (e) {
        return n.getRes(e)
    };
    e.getResAsync = function (e, t, r) {
        n.getResAsync(e, t, r)
    };
    e.getResByUrl = function (e, t, r, i) {
        void 0 === i && (i = "");
        n.getResByUrl(e, t, r, i)
    };
    e.destroyRes = function (e) {
        return n.destroyRes(e)
    };
    e.setMaxLoadingThread = function (e) {
        n.setMaxLoadingThread(e)
    };
    e.addEventListener = function (e, t, r, i, s) {
        void 0 === i && (i = !1);
        void 0 === s && (s = 0);
        n.addEventListener(e, t, r, i, s)
    };
    e.removeEventListener = function (e, t, r, i) {
        void 0 === i && (i = !1);
        n.removeEventListener(e, t, r, i)
    };
    var t = function (t) {
        function n() {
            t.call(this);
            this.analyzerDic = {};
            this.configItemList = [];
            this.configComplete = this.callLaterFlag = !1;
            this.loadedGroups = [];
            this.groupNameList = [];
            this.asyncDic = {};
            this.init()
        }

        __extends(n, t);
        n.prototype.getAnalyzerByType = function (t) {
            var n = this.analyzerDic[t];
            n || (n = this.analyzerDic[t] = egret.Injector.getInstance(e.AnalyzerBase, t));
            return n
        };
        n.prototype.init = function () {
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_BIN) || egret.Injector.mapClass(e.AnalyzerBase, e.BinAnalyzer, e.ResourceItem.TYPE_BIN);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_IMAGE) || egret.Injector.mapClass(e.AnalyzerBase, e.ImageAnalyzer, e.ResourceItem.TYPE_IMAGE);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_TEXT) || egret.Injector.mapClass(e.AnalyzerBase, e.TextAnalyzer, e.ResourceItem.TYPE_TEXT);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_JSON) || egret.Injector.mapClass(e.AnalyzerBase, e.JsonAnalyzer, e.ResourceItem.TYPE_JSON);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_SHEET) || egret.Injector.mapClass(e.AnalyzerBase, e.SheetAnalyzer, e.ResourceItem.TYPE_SHEET);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_FONT) || egret.Injector.mapClass(e.AnalyzerBase, e.FontAnalyzer, e.ResourceItem.TYPE_FONT);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_SOUND) || egret.Injector.mapClass(e.AnalyzerBase, e.SoundAnalyzer, e.ResourceItem.TYPE_SOUND);
            egret.Injector.hasMapRule(e.AnalyzerBase, e.ResourceItem.TYPE_XML) || egret.Injector.mapClass(e.AnalyzerBase, e.XMLAnalyzer, e.ResourceItem.TYPE_XML);
            this.resConfig = new e.ResourceConfig;
            this.resLoader = new e.ResourceLoader;
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance = this;
            this.resLoader.addEventListener(e.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this)
        };
        n.prototype.loadConfig = function (e, t, n) {
            void 0 === n && (n = "json");
            this.configItemList.push({url: e, resourceRoot: t, type: n});
            this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0)
        };
        n.prototype.startLoadConfig = function () {
            this.callLaterFlag = !1;
            var t = this.configItemList;
            this.configItemList = [];
            this.loadingConfigList = t;
            for (var r = t.length, i = [], s = 0; s < r; s++) {
                var o = t[s], o = new e.ResourceItem(o.url, o.url, o.type);
                i.push(o)
            }
            this.resLoader.loadGroup(i, n.GROUP_CONFIG, Number.MAX_VALUE)
        };
        n.prototype.isGroupLoaded = function (e) {
            return -1 != this.loadedGroups.indexOf(e)
        };
        n.prototype.getGroupByName = function (e) {
            return this.resConfig.getGroupByName(e)
        };
        n.prototype.loadGroup = function (e, t) {
            void 0 === t && (t = 0);
            if (-1 == this.loadedGroups.indexOf(e) && !this.resLoader.isGroupInLoading(e)) if (this.configComplete) {
                var n = this.resConfig.getGroupByName(e);
                this.resLoader.loadGroup(n, e, t)
            } else this.groupNameList.push({name: e, priority: t})
        };
        n.prototype.createGroup = function (e, t, n) {
            void 0 === n && (n = !1);
            if (n) {
                var r = this.loadedGroups.indexOf(e);
                -1 != r && this.loadedGroups.splice(r, 1)
            }
            return this.resConfig.createGroup(e, t, n)
        };
        n.prototype.onGroupComp = function (t) {
            if (t.groupName == n.GROUP_CONFIG) {
                t = this.loadingConfigList.length;
                for (var r = 0; r < t; r++) {
                    var i = this.loadingConfigList[r], s = this.getAnalyzerByType(i.type), o = s.getRes(i.url);
                    s.destroyRes(i.url);
                    this.resConfig.parseConfig(o, i.resourceRoot)
                }
                this.configComplete = !0;
                this.loadingConfigList = null;
                e.ResourceEvent.dispatchResourceEvent(this, e.ResourceEvent.CONFIG_COMPLETE);
                i = this.groupNameList;
                t = i.length;
                for (r = 0; r < t; r++) s = i[r], this.loadGroup(s.name, s.priority);
                this.groupNameList = []
            } else this.loadedGroups.push(t.groupName), this.dispatchEvent(t)
        };
        n.prototype.hasRes = function (t) {
            var n = this.resConfig.getType(t);
            return "" == n && (t = e.AnalyzerBase.getStringPrefix(t), n = this.resConfig.getType(t), "" == n) ? !1 : !0
        };
        n.prototype.getRes = function (t) {
            var n = this.resConfig.getType(t);
            return "" == n && (n = e.AnalyzerBase.getStringPrefix(t), n = this.resConfig.getType(n), "" == n) ? null : this.getAnalyzerByType(n).getRes(t)
        };
        n.prototype.getResAsync = function (t, n, r) {
            var i = this.resConfig.getType(t), s = this.resConfig.getName(t);
            if ("" == i && (s = e.AnalyzerBase.getStringPrefix(t), i = this.resConfig.getType(s), "" == i)) {
                n.call(r, null);
                return
            }
            (i = this.getAnalyzerByType(i).getRes(t)) ? n.call(r, i) : (t = {
                key: t,
                compFunc: n,
                thisObject: r
            }, this.asyncDic[s] ? this.asyncDic[s].push(t) : (this.asyncDic[s] = [t], s = this.resConfig.getResourceItem(s), this.resLoader.loadItem(s)))
        };
        n.prototype.getResByUrl = function (t, n, r, i) {
            void 0 === i && (i = "");
            if (t) {
                i || (i = this.getTypeByUrl(t));
                var s = this.getAnalyzerByType(i).getRes(t);
                s ? n.call(r, s) : (n = {
                    key: t,
                    compFunc: n,
                    thisObject: r
                }, this.asyncDic[t] ? this.asyncDic[t].push(n) : (this.asyncDic[t] = [n], t = new e.ResourceItem(t, t, i), this.resLoader.loadItem(t)))
            } else n.call(r, null)
        };
        n.prototype.getTypeByUrl = function (t) {
            (t = t.substr(t.lastIndexOf(".") + 1)) && (t = t.toLowerCase());
            switch (t) {
                case e.ResourceItem.TYPE_XML:
                case e.ResourceItem.TYPE_JSON:
                case e.ResourceItem.TYPE_SHEET:
                    break;
                case"png":
                case"jpg":
                case"gif":
                    t = e.ResourceItem.TYPE_IMAGE;
                    break;
                case"fnt":
                    t = e.ResourceItem.TYPE_FONT;
                    break;
                case"txt":
                    t = e.ResourceItem.TYPE_TEXT;
                    break;
                case"mp3":
                case"ogg":
                case"mpeg":
                case"wav":
                case"m4a":
                case"mp4":
                case"aiff":
                case"wma":
                case"mid":
                    t = e.ResourceItem.TYPE_SOUND;
                    break;
                default:
                    t = e.ResourceItem.TYPE_BIN
            }
            return t
        };
        n.prototype.onResourceItemComp = function (e) {
            var t = this.asyncDic[e.name];
            delete this.asyncDic[e.name];
            e = this.getAnalyzerByType(e.type);
            for (var n = t.length, r = 0; r < n; r++) {
                var i = t[r], s = e.getRes(i.key);
                i.compFunc.call(i.thisObject, s, i.key)
            }
        };
        n.prototype.destroyRes = function (e) {
            var t = this.resConfig.getRawGroupByName(e);
            if (t) {
                var n = this.loadedGroups.indexOf(e);
                -1 != n && this.loadedGroups.splice(n, 1);
                e = t.length;
                for (var r = 0; r < e; r++) {
                    n = t[r];
                    n.loaded = !1;
                    var i = this.getAnalyzerByType(n.type);
                    i.destroyRes(n.name)
                }
                return !0
            }
            t = this.resConfig.getType(e);
            if ("" == t) return !1;
            n = this.resConfig.getRawResourceItem(e);
            n.loaded = !1;
            i = this.getAnalyzerByType(t);
            return i.destroyRes(e)
        };
        n.prototype.setMaxLoadingThread = function (e) {
            1 > e && (e = 1);
            this.resLoader.thread = e
        };
        n.GROUP_CONFIG = "RES__CONFIG";
        return n
    }(egret.EventDispatcher);
    t.prototype.__class__ = "RES.Resource";
    var n = new t
})(RES || (RES = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e) {
            void 0 === e && (e = 60);
            t.call(this);
            this.frameRate = e;
            this._time = 0;
            this._isActivate = !0;
            60 == e && (n.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, n.cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame);
            n.requestAnimationFrame || (n.requestAnimationFrame = function (t) {
                return window.setTimeout(t, 1e3 / e)
            });
            n.cancelAnimationFrame || (n.cancelAnimationFrame = function (e) {
                return window.clearTimeout(e)
            });
            n.instance = this;
            this.registerListener()
        }

        __extends(n, t);
        n.prototype.enterFrame = function () {
            var t = n.instance, r = n._thisObject, i = n._callback, s = e.getTimer(), o = s - t._time;
            t._requestAnimationId = n.requestAnimationFrame.call(window, n.prototype.enterFrame);
            i.call(r, o);
            t._time = s
        };
        n.prototype.executeMainLoop = function (e, t) {
            n._callback = e;
            n._thisObject = t;
            this.enterFrame()
        };
        n.prototype.reset = function () {
            var t = n.instance;
            t._requestAnimationId && (t._time = e.getTimer(), n.cancelAnimationFrame.call(window, t._requestAnimationId), t.enterFrame())
        };
        n.prototype.registerListener = function () {
            var t = this, r = function () {
                t._isActivate && (t._isActivate = !1, e.MainContext.instance.stage.dispatchEvent(new e.Event(e.Event.DEACTIVATE)))
            }, i = function () {
                t._isActivate || (t._isActivate = !0, n.instance.reset(), e.MainContext.instance.stage.dispatchEvent(new e.Event(e.Event.ACTIVATE)))
            }, s = function () {
                document[o] ? r() : i()
            };
            window.addEventListener("focus", i, !1);
            window.addEventListener("blur", r, !1);
            var o, u;
            "undefined" !== typeof document.hidden ? (o = "hidden", u = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (o = "mozHidden", u = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (o = "msHidden", u = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden ? (o = "webkitHidden", u = "webkitvisibilitychange") : "undefined" !== typeof document.oHidden && (o = "oHidden", u = "ovisibilitychange");
            "onpageshow" in window && "onpagehide" in window && (window.addEventListener("pageshow", i, !1), window.addEventListener("pagehide", r, !1));
            o && u && document.addEventListener(u, s, !1)
        };
        return n
    }(e.DeviceContext);
    e.HTML5DeviceContext = t;
    t.prototype.__class__ = "egret.HTML5DeviceContext"
})(egret || (egret = {}));
var egret_html5_localStorage;
(function (e) {
    e.getItem = function (e) {
        return window.localStorage.getItem(e)
    };
    e.setItem = function (e, t) {
        try {
            return window.localStorage.setItem(e, t), !0
        } catch (n) {
            return console.log("egret_html5_localStorage.setItem保存失败,key=" + e + "&value=" + t), !1
        }
    };
    e.removeItem = function (e) {
        window.localStorage.removeItem(e)
    };
    e.clear = function () {
        window.localStorage.clear()
    };
    e.init = function () {
        for (var t in e) egret.localStorage[t] = e[t]
    }
})(egret_html5_localStorage || (egret_html5_localStorage = {}));
egret_html5_localStorage.init();
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(n) {
            t.call(this);
            this.globalAlpha = 1;
            this.canvas = n || this.createCanvas();
            this.canvasContext = this.canvas.getContext("2d");
            this._cacheCanvas = document.createElement("canvas");
            this._cacheCanvas.width = this.canvas.width;
            this._cacheCanvas.height = this.canvas.height;
            this._cacheCanvasContext = this._cacheCanvas.getContext("2d");
            this._cacheCanvasContext.imageSmoothingEnabled = e.RendererContext.imageSmoothingEnabled;
            this._cacheCanvasContext.webkitImageSmoothingEnabled = e.RendererContext.imageSmoothingEnabled;
            this._cacheCanvasContext.mozImageSmoothingEnabled = e.RendererContext.imageSmoothingEnabled;
            this._cacheCanvasContext.msImageSmoothingEnabled = e.RendererContext.imageSmoothingEnabled;
            this.onResize();
            var r = this.canvasContext.setTransform, i = this;
            this._cacheCanvasContext.setTransform = function (e, t, n, s, o, u) {
                i._matrixA = e;
                i._matrixB = t;
                i._matrixC = n;
                i._matrixD = s;
                i._matrixTx = o;
                i._matrixTy = u;
                r.call(i._cacheCanvasContext, e, t, n, s, o, u)
            };
            this._matrixA = 1;
            this._matrixC = this._matrixB = 0;
            this._matrixD = 1;
            this._transformTy = this._transformTx = this._matrixTy = this._matrixTx = 0;
            this.initBlendMode()
        }

        __extends(n, t);
        n.prototype.createCanvas = function () {
            var t = e.Browser.getInstance().$("#egretCanvas");
            if (!t) {
                var n = document.getElementById(e.StageDelegate.canvas_div_name),
                    t = e.Browser.getInstance().$new("canvas");
                t.id = "egretCanvas";
                n.appendChild(t)
            }
            e.MainContext.instance.stage.addEventListener(e.Event.RESIZE, this.onResize, this);
            return t
        };
        n.prototype.onResize = function () {
            if (this.canvas) {
                var t = document.getElementById(e.StageDelegate.canvas_div_name);
                this.canvas.width = e.MainContext.instance.stage.stageWidth;
                this.canvas.height = e.MainContext.instance.stage.stageHeight;
                this.canvas.style.width = t.style.width;
                this.canvas.style.height = t.style.height;
                this._cacheCanvas.width = this.canvas.width;
                this._cacheCanvas.height = this.canvas.height
            }
        };
        n.prototype.clearScreen = function () {
            for (var t = e.RenderFilter.getInstance().getDrawAreaList(), n = 0, r = t.length; n < r; n++) {
                var i = t[n];
                this.clearRect(i.x, i.y, i.width, i.height)
            }
            t = e.MainContext.instance.stage;
            this._cacheCanvasContext.clearRect(0, 0, t.stageWidth, t.stageHeight);
            this.renderCost = 0
        };
        n.prototype.clearRect = function (e, t, n, r) {
            this.canvasContext.clearRect(e, t, n, r)
        };
        n.prototype.drawImage = function (n, r, i, s, o, u, a, f, l, h) {
            void 0 === h && (h = void 0);
            var p = e.MainContext.instance.rendererContext.texture_scale_factor;
            r /= p;
            i /= p;
            s /= p;
            o /= p;
            p = n._bitmapData;
            u += this._transformTx;
            a += this._transformTy;
            var d = e.getTimer();
            void 0 === h ? this._cacheCanvasContext.drawImage(p, r, i, s, o, u, a, f, l) : this.drawRepeatImage(n, r, i, s, o, u, a, f, l, h);
            t.prototype.drawImage.call(this, n, r, i, s, o, u, a, f, l, h);
            this.renderCost += e.getTimer() - d
        };
        n.prototype.drawRepeatImage = function (e, t, n, r, i, s, o, u, a, f) {
            if (void 0 === e.pattern) {
                var l = e._bitmapData, c = l;
                if (l.width != r || l.height != i) c = document.createElement("canvas"), c.width = r, c.height = i, c.getContext("2d").drawImage(l, t, n, r, i, 0, 0, r, i);
                t = this._cacheCanvasContext.createPattern(c, f);
                e.pattern = t
            }
            this._cacheCanvasContext.fillStyle = e.pattern;
            this._cacheCanvasContext.translate(s, o);
            this._cacheCanvasContext.fillRect(0, 0, u, a);
            this._cacheCanvasContext.translate(-s, -o)
        };
        n.prototype.setTransform = function (e) {
            1 == e.a && 0 == e.b && 0 == e.c && 1 == e.d && 1 == this._matrixA && 0 == this._matrixB && 0 == this._matrixC && 1 == this._matrixD ? (this._transformTx = e.tx - this._matrixTx, this._transformTy = e.ty - this._matrixTy) : (this._transformTx = this._transformTy = 0, this._matrixA == e.a && this._matrixB == e.b && this._matrixC == e.c && this._matrixD == e.d && this._matrixTx == e.tx && this._matrixTy == e.ty || this._cacheCanvasContext.setTransform(e.a, e.b, e.c, e.d, e.tx, e.ty))
        };
        n.prototype.setAlpha = function (t, n) {
            t != this.globalAlpha && (this._cacheCanvasContext.globalAlpha = this.globalAlpha = t);
            n ? (this.blendValue = this.blendModes[n], this._cacheCanvasContext.globalCompositeOperation = this.blendValue) : this.blendValue != e.BlendMode.NORMAL && (this.blendValue = this.blendModes[e.BlendMode.NORMAL], this._cacheCanvasContext.globalCompositeOperation = this.blendValue)
        };
        n.prototype.initBlendMode = function () {
            this.blendModes = {};
            this.blendModes[e.BlendMode.NORMAL] = "source-over";
            this.blendModes[e.BlendMode.ADD] = "lighter"
        };
        n.prototype.setupFont = function (e) {
            var t = this._cacheCanvasContext, n = e._italic ? "italic " : "normal ",
                n = n + (e._bold ? "bold " : "normal "), n = n + (e._size + "px " + e._fontFamily);
            t.font = n;
            t.textAlign = "left";
            t.textBaseline = "middle"
        };
        n.prototype.measureText = function (e) {
            return this._cacheCanvasContext.measureText(e).width
        };
        n.prototype.drawText = function (n, r, i, s, o, u) {
            var a;
            a = u.textColor ? e.toColorString(parseInt(u.textColor)) : n._textColorString;
            var f;
            f = u.strokeColor ? e.toColorString(u.strokeColor) : n._strokeColorString;
            var l;
            l = u.outline ? u.outline : n._stroke;
            var h = this._cacheCanvasContext;
            h.fillStyle = a;
            h.strokeStyle = f;
            l && (h.lineWidth = 2 * l, h.strokeText(r, i + this._transformTx, s + this._transformTy, o || 65535));
            h.fillText(r, i + this._transformTx, s + this._transformTy, o || 65535);
            t.prototype.drawText.call(this, n, r, i, s, o, u)
        };
        n.prototype.strokeRect = function (e, t, n, r, i) {
            this._cacheCanvasContext.strokeStyle = i;
            this._cacheCanvasContext.strokeRect(e, t, n, r)
        };
        n.prototype.pushMask = function (e) {
            this._cacheCanvasContext.save();
            this._cacheCanvasContext.beginPath();
            this._cacheCanvasContext.rect(e.x + this._transformTx, e.y + this._transformTy, e.width, e.height);
            this._cacheCanvasContext.clip();
            this._cacheCanvasContext.closePath()
        };
        n.prototype.popMask = function () {
            this._cacheCanvasContext.restore();
            this._cacheCanvasContext.setTransform(1, 0, 0, 1, 0, 0)
        };
        n.prototype.onRenderStart = function () {
            this._cacheCanvasContext.save()
        };
        n.prototype.onRenderFinish = function () {
            this._cacheCanvasContext.restore();
            this._cacheCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
            for (var t = e.RenderFilter.getInstance().getDrawAreaList(), n = 0, r = t.length; n < r; n++) {
                var i = t[n];
                this.canvasContext.drawImage(this._cacheCanvas, i.x, i.y, i.width, i.height, i.x, i.y, i.width, i.height)
            }
        };
        return n
    }(e.RendererContext);
    e.HTML5CanvasRenderer = t;
    t.prototype.__class__ = "egret.HTML5CanvasRenderer"
})(egret || (egret = {}));
var egret_h5_graphics;
(function (e) {
    e.beginFill = function (e, n) {
        void 0 === n && (n = 1);
        var r = "rgba(" + (e >> 16) + "," + ((e & 65280) >> 8) + "," + (e & 255) + "," + n + ")";
        this.fillStyleColor = r;
        this.commandQueue.push(new t(this._setStyle, this, [r]))
    };
    e.drawRect = function (e, n, r, i) {
        this.commandQueue.push(new t(function (e, t, n, r) {
            var i = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.rect(i._transformTx + e, i._transformTy + t, n, r);
            this.canvasContext.closePath()
        }, this, [e, n, r, i]));
        this._fill()
    };
    e.drawCircle = function (e, n, r) {
        this.commandQueue.push(new t(function (e, t, n) {
            var r = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.arc(r._transformTx + e, r._transformTy + t, n, 0, 2 * Math.PI);
            this.canvasContext.closePath()
        }, this, [e, n, r]));
        this._fill()
    };
    e.drawRoundRect = function (e, n, r, i, s, o) {
        this.commandQueue.push(new t(function (e, t, n, r, i, s) {
            var o = this.renderContext;
            e = o._transformTx + e;
            t = o._transformTy + t;
            i /= 2;
            s = s ? s / 2 : i;
            n = e + n;
            r = t + r;
            o = r - s;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(n, o);
            this.canvasContext.quadraticCurveTo(n, r, n - i, r);
            this.canvasContext.lineTo(e + i, r);
            this.canvasContext.quadraticCurveTo(e, r, e, r - s);
            this.canvasContext.lineTo(e, t + s);
            this.canvasContext.quadraticCurveTo(e, t, e + i, t);
            this.canvasContext.lineTo(n - i, t);
            this.canvasContext.quadraticCurveTo(n, t, n, t + s);
            this.canvasContext.lineTo(n, o);
            this.canvasContext.closePath()
        }, this, [e, n, r, i, s, o]));
        this._fill()
    };
    e.drawEllipse = function (e, n, r, i) {
        this.commandQueue.push(new t(function (e, t, n, r) {
            var i = this.renderContext;
            this.canvasContext.save();
            e = i._transformTx + e;
            t = i._transformTy + t;
            var i = n > r ? n : r, s = n / i;
            r /= i;
            this.canvasContext.scale(s, r);
            this.canvasContext.beginPath();
            this.canvasContext.moveTo((e + n) / s, t / r);
            this.canvasContext.arc(e / s, t / r, i, 0, 2 * Math.PI);
            this.canvasContext.closePath();
            this.canvasContext.restore();
            this.canvasContext.stroke()
        }, this, [e, n, r, i]));
        this._fill()
    };
    e.lineStyle = function (e, n, r, i, s, o, u, a) {
        void 0 === e && (e = NaN);
        void 0 === n && (n = 0);
        void 0 === r && (r = 1);
        void 0 === i && (i = !1);
        void 0 === s && (s = "normal");
        void 0 === o && (o = null);
        void 0 === u && (u = null);
        void 0 === a && (a = 3);
        this.strokeStyleColor && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand));
        this.strokeStyleColor = n = "rgba(" + (n >> 16) + "," + ((n & 65280) >> 8) + "," + (n & 255) + "," + r + ")";
        this.commandQueue.push(new t(function (e, t) {
            this.canvasContext.lineWidth = e;
            this.canvasContext.strokeStyle = t;
            this.canvasContext.beginPath()
        }, this, [e, n]));
        "undefined" === typeof this.lineX && (this.lineY = this.lineX = 0);
        this.moveTo(this.lineX, this.lineY)
    };
    e.lineTo = function (e, n) {
        this.commandQueue.push(new t(function (e, t) {
            var n = this.renderContext;
            this.canvasContext.lineTo(n._transformTx + e, n._transformTy + t)
        }, this, [e, n]));
        this.lineX = e;
        this.lineY = n
    };
    e.curveTo = function (e, n, r, i) {
        this.commandQueue.push(new t(function (e, t, n, r) {
            var i = this.renderContext;
            this.canvasContext.quadraticCurveTo(i._transformTx + e, i._transformTy + t, i._transformTx + n, i._transformTy + r)
        }, this, [e, n, r, i]));
        this.lineX = r;
        this.lineY = i
    };
    e.moveTo = function (e, n) {
        this.commandQueue.push(new t(function (e, t) {
            var n = this.renderContext;
            this.canvasContext.moveTo(n._transformTx + e, n._transformTy + t)
        }, this, [e, n]))
    };
    e.clear = function () {
        this.lineY = this.lineX = this.commandQueue.length = 0;
        this.fillStyleColor = this.strokeStyleColor = null
    };
    e.createEndFillCommand = function () {
        this.endFillCommand || (this.endFillCommand = new t(function () {
            this.canvasContext.fill();
            this.canvasContext.closePath()
        }, this, null))
    };
    e.endFill = function () {
        null != this.fillStyleColor && this._fill();
        this.fillStyleColor = null
    };
    e._fill = function () {
        this.fillStyleColor && (this.createEndFillCommand(), this.commandQueue.push(this.endFillCommand))
    };
    e.createEndLineCommand = function () {
        this.endLineCommand || (this.endLineCommand = new t(function () {
            this.canvasContext.stroke();
            this.canvasContext.closePath()
        }, this, null))
    };
    e._draw = function (e) {
        var t = this.commandQueue.length;
        if (0 != t) {
            this.renderContext = e;
            e = this.canvasContext = this.renderContext._cacheCanvasContext || this.renderContext.canvasContext;
            e.save();
            this.strokeStyleColor && 0 < t && this.commandQueue[t - 1] != this.endLineCommand && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand), t = this.commandQueue.length);
            for (var n = 0; n < t; n++) {
                var r = this.commandQueue[n];
                r.method.apply(r.thisObject, r.args)
            }
            e.restore()
        }
    };
    var t = function () {
        return function (e, t, n) {
            this.method = e;
            this.thisObject = t;
            this.args = n
        }
    }();
    t.prototype.__class__ = "egret_h5_graphics.Command";
    e._setStyle = function (e) {
        this.canvasContext.fillStyle = e;
        this.canvasContext.beginPath()
    };
    e.init = function () {
        for (var t in e) egret.Graphics.prototype[t] = e[t];
        egret.RendererContext.createRendererContext = function (e) {
            return new egret.HTML5CanvasRenderer(e)
        }
    }
})(egret_h5_graphics || (egret_h5_graphics = {}));
egret_h5_graphics.init();
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(n) {
            t.call(this);
            this.size = 2e3;
            this.vertSize = 5;
            this.contextLost = !1;
            this.glContextId = 0;
            this.currentBlendMode = "";
            this.currentBaseTexture = null;
            this.currentBatchSize = 0;
            this.maskList = [];
            this.maskDataFreeList = [];
            this.canvasContext = document.createElement("canvas").getContext("2d");
            console.log("使用WebGL模式");
            this.canvas = n || this.createCanvas();
            this.canvas.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1);
            this.canvas.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), !1);
            this.onResize();
            this.projectionX = this.canvas.width / 2;
            this.projectionY = -this.canvas.height / 2;
            n = 6 * this.size;
            this.vertices = new Float32Array(4 * this.size * this.vertSize);
            this.indices = new Uint16Array(n);
            for (var r = 0, i = 0; r < n; r += 6, i += 4) this.indices[r + 0] = i + 0, this.indices[r + 1] = i + 1, this.indices[r + 2] = i + 2, this.indices[r + 3] = i + 0, this.indices[r + 4] = i + 2, this.indices[r + 5] = i + 3;
            this.initWebGL();
            this.shaderManager = new e.WebGLShaderManager(this.gl);
            this.worldTransform = new e.Matrix;
            this.initBlendMode();
            e.MainContext.instance.addEventListener(e.Event.FINISH_RENDER, this._draw, this);
            e.TextField.prototype._draw = function (t) {
                this.getDirty() && (this.cacheAsBitmap = !0);
                e.DisplayObject.prototype._draw.call(this, t)
            }
        }

        __extends(n, t);
        n.prototype.createCanvas = function () {
            var t = e.Browser.getInstance().$("#egretCanvas");
            if (!t) {
                var n = document.getElementById(e.StageDelegate.canvas_div_name),
                    t = e.Browser.getInstance().$new("canvas");
                t.id = "egretCanvas";
                n.appendChild(t)
            }
            e.MainContext.instance.stage.addEventListener(e.Event.RESIZE, this.onResize, this);
            return t
        };
        n.prototype.onResize = function () {
            if (this.canvas) {
                var t = document.getElementById(e.StageDelegate.canvas_div_name);
                this.canvas.width = e.MainContext.instance.stage.stageWidth;
                this.canvas.height = e.MainContext.instance.stage.stageHeight;
                this.canvas.style.width = t.style.width;
                this.canvas.style.height = t.style.height;
                this.projectionX = this.canvas.width / 2;
                this.projectionY = -this.canvas.height / 2
            }
        };
        n.prototype.handleContextLost = function () {
            this.contextLost = !0
        };
        n.prototype.handleContextRestored = function () {
            this.initWebGL();
            this.shaderManager.setContext(this.gl);
            this.contextLost = !1
        };
        n.prototype.initWebGL = function () {
            for (var e = {stencil: !0}, t, n = ["experimental-webgl", "webgl"], r = 0; r < n.length; r++) {
                try {
                    t = this.canvas.getContext(n[r], e)
                } catch (i) {
                }
                if (t) break
            }
            if (!t) throw Error("当前浏览器不支持webgl");
            this.setContext(t)
        };
        n.prototype.setContext = function (e) {
            this.gl = e;
            e.id = this.glContextId++;
            this.vertexBuffer = e.createBuffer();
            this.indexBuffer = e.createBuffer();
            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            e.bufferData(e.ELEMENT_ARRAY_BUFFER, this.indices, e.STATIC_DRAW);
            e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer);
            e.bufferData(e.ARRAY_BUFFER, this.vertices, e.DYNAMIC_DRAW);
            e.disable(e.DEPTH_TEST);
            e.disable(e.CULL_FACE);
            e.enable(e.BLEND);
            e.colorMask(!0, !0, !0, !0)
        };
        n.prototype.initBlendMode = function () {
            this.blendModesWebGL = {};
            this.blendModesWebGL[e.BlendMode.NORMAL] = [this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA];
            this.blendModesWebGL[e.BlendMode.ADD] = [this.gl.SRC_ALPHA, this.gl.ONE]
        };
        n.prototype.start = function () {
            if (!this.contextLost) {
                var e = this.gl;
                e.activeTexture(e.TEXTURE0);
                e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffer);
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var t;
                t = this.colorTransformMatrix ? this.shaderManager.colorTransformShader : this.shaderManager.defaultShader;
                this.shaderManager.activateShader(t);
                t.syncUniforms();
                e.uniform2f(t.projectionVector, this.projectionX, this.projectionY);
                var n = 4 * this.vertSize;
                e.vertexAttribPointer(t.aVertexPosition, 2, e.FLOAT, !1, n, 0);
                e.vertexAttribPointer(t.aTextureCoord, 2, e.FLOAT, !1, n, 8);
                e.vertexAttribPointer(t.colorAttribute, 2, e.FLOAT, !1, n, 16)
            }
        };
        n.prototype.clearScreen = function () {
            var t = this.gl;
            t.colorMask(!0, !0, !0, !0);
            for (var n = e.RenderFilter.getInstance().getDrawAreaList(), r = 0, i = n.length; r < i; r++) {
                var s = n[r];
                t.viewport(s.x, s.y, s.width, s.height);
                t.bindFramebuffer(t.FRAMEBUFFER, null);
                t.clearColor(0, 0, 0, 0);
                t.clear(t.COLOR_BUFFER_BIT)
            }
            n = e.MainContext.instance.stage;
            t.viewport(0, 0, n.stageWidth, n.stageHeight);
            this.renderCost = 0
        };
        n.prototype.setBlendMode = function (t) {
            t || (t = e.BlendMode.NORMAL);
            if (this.currentBlendMode != t) {
                var n = this.blendModesWebGL[t];
                n && (this._draw(), this.gl.blendFunc(n[0], n[1]), this.currentBlendMode = t)
            }
        };
        n.prototype.drawRepeatImage = function (e, t, n, r, i, s, o, u, a, f) {
            for (; s < u; s += r) for (f = o; f < a; f += i) {
                var l = Math.min(r, u - s), c = Math.min(i, a - f);
                this.drawImage(e, t, n, l, c, s, f, l, c)
            }
        };
        n.prototype.drawImage = function (t, n, r, i, s, o, u, a, f, l) {
            void 0 === l && (l = void 0);
            if (!this.contextLost) if (void 0 !== l) this.drawRepeatImage(t, n, r, i, s, o, u, a, f, l); else {
                l = e.MainContext.instance.rendererContext.texture_scale_factor;
                n /= l;
                r /= l;
                i /= l;
                s /= l;
                this.createWebGLTexture(t);
                if (t.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size - 1) this._draw(), this.currentBaseTexture = t.webGLTexture;
                var h = this.worldTransform, p = h.a, d = h.b, v = h.c, m = h.d, g = h.tx, y = h.ty;
                0 == o && 0 == u || h.append(1, 0, 0, 1, o, u);
                1 == i / a && 1 == s / f || h.append(a / i, 0, 0, f / s, 0, 0);
                o = h.a;
                u = h.b;
                a = h.c;
                f = h.d;
                l = h.tx;
                var b = h.ty;
                h.a = p;
                h.b = d;
                h.c = v;
                h.d = m;
                h.tx = g;
                h.ty = y;
                p = t._sourceWidth;
                d = t._sourceHeight;
                t = i;
                h = s;
                n /= p;
                r /= d;
                i /= p;
                s /= d;
                p = this.vertices;
                d = 4 * this.currentBatchSize * this.vertSize;
                v = this.worldAlpha;
                p[d++] = l;
                p[d++] = b;
                p[d++] = n;
                p[d++] = r;
                p[d++] = v;
                p[d++] = o * t + l;
                p[d++] = u * t + b;
                p[d++] = i + n;
                p[d++] = r;
                p[d++] = v;
                p[d++] = o * t + a * h + l;
                p[d++] = f * h + u * t + b;
                p[d++] = i + n;
                p[d++] = s + r;
                p[d++] = v;
                p[d++] = a * h + l;
                p[d++] = f * h + b;
                p[d++] = n;
                p[d++] = s + r;
                p[d++] = v;
                this.currentBatchSize++
            }
        };
        n.prototype._draw = function () {
            if (0 != this.currentBatchSize && !this.contextLost) {
                var t = e.getTimer();
                this.start();
                var n = this.gl;
                n.bindTexture(n.TEXTURE_2D, this.currentBaseTexture);
                var r = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                n.bufferSubData(n.ARRAY_BUFFER, 0, r);
                n.drawElements(n.TRIANGLES, 6 * this.currentBatchSize, n.UNSIGNED_SHORT, 0);
                this.currentBatchSize = 0;
                this.renderCost += e.getTimer() - t;
                e.Profiler.getInstance().onDrawImage()
            }
        };
        n.prototype.setTransform = function (e) {
            var t = this.worldTransform;
            t.a = e.a;
            t.b = e.b;
            t.c = e.c;
            t.d = e.d;
            t.tx = e.tx;
            t.ty = e.ty
        };
        n.prototype.setAlpha = function (e, t) {
            this.worldAlpha = e;
            this.setBlendMode(t)
        };
        n.prototype.createWebGLTexture = function (e) {
            if (!e.webGLTexture) {
                var t = this.gl;
                e.webGLTexture = t.createTexture();
                t.bindTexture(t.TEXTURE_2D, e.webGLTexture);
                t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e._bitmapData);
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR);
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE);
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE);
                t.bindTexture(t.TEXTURE_2D, null)
            }
        };
        n.prototype.pushMask = function (e) {
            this._draw();
            var t = this.gl;
            0 == this.maskList.length && (t.enable(t.STENCIL_TEST), t.stencilFunc(t.ALWAYS, 1, 1));
            var n = this.maskDataFreeList.pop();
            n ? (n.x = e.x, n.y = e.y, n.w = e.width, n.h = e.height) : n = {x: e.x, y: e.y, w: e.width, h: e.height};
            this.maskList.push(n);
            t.colorMask(!1, !1, !1, !1);
            t.stencilOp(t.KEEP, t.KEEP, t.INCR);
            this.renderGraphics(n);
            t.colorMask(!0, !0, !0, !0);
            t.stencilFunc(t.NOTEQUAL, 0, this.maskList.length);
            t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
        };
        n.prototype.popMask = function () {
            this._draw();
            var e = this.gl, t = this.maskList.pop();
            t && (e.colorMask(!1, !1, !1, !1), e.stencilOp(e.KEEP, e.KEEP, e.DECR), this.renderGraphics(t), e.colorMask(!0, !0, !0, !0), e.stencilFunc(e.NOTEQUAL, 0, this.maskList.length), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), this.maskDataFreeList.push(t));
            0 == this.maskList.length && e.disable(e.STENCIL_TEST)
        };
        n.prototype.setGlobalColorTransform = function (e) {
            if (this.colorTransformMatrix != e && (this._draw(), this.colorTransformMatrix = e)) {
                e = e.concat();
                var t = this.shaderManager.colorTransformShader;
                t.uniforms.colorAdd.value.w = e.splice(19, 1)[0] / 255;
                t.uniforms.colorAdd.value.z = e.splice(14, 1)[0] / 255;
                t.uniforms.colorAdd.value.y = e.splice(9, 1)[0] / 255;
                t.uniforms.colorAdd.value.x = e.splice(4, 1)[0] / 255;
                t.uniforms.matrix.value = e
            }
        };
        n.prototype.setupFont = function (e) {
            var t = this.canvasContext, n = e.italic ? "italic " : "normal ", n = n + (e.bold ? "bold " : "normal "),
                n = n + (e.size + "px " + e.fontFamily);
            t.font = n;
            t.textAlign = "left";
            t.textBaseline = "middle"
        };
        n.prototype.measureText = function (e) {
            return this.canvasContext.measureText(e).width
        };
        n.prototype.renderGraphics = function (e) {
            var t = this.gl, n = this.shaderManager.primitiveShader;
            this.graphicsPoints ? (this.graphicsPoints.length = 0, this.graphicsIndices.length = 0) : (this.graphicsPoints = [], this.graphicsIndices = [], this.graphicsBuffer = t.createBuffer(), this.graphicsIndexBuffer = t.createBuffer());
            this.updateGraphics(e);
            this.shaderManager.activateShader(n);
            t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
            t.uniformMatrix3fv(n.translationMatrix, !1, this.worldTransform.toArray(!0));
            t.uniform2f(n.projectionVector, this.projectionX, -this.projectionY);
            t.uniform2f(n.offsetVector, 0, 0);
            t.uniform3fv(n.tintColor, [1, 1, 1]);
            t.uniform1f(n.alpha, this.worldAlpha);
            t.bindBuffer(t.ARRAY_BUFFER, this.graphicsBuffer);
            t.vertexAttribPointer(n.aVertexPosition, 2, t.FLOAT, !1, 24, 0);
            t.vertexAttribPointer(n.colorAttribute, 4, t.FLOAT, !1, 24, 8);
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            t.drawElements(t.TRIANGLE_STRIP, this.graphicsIndices.length, t.UNSIGNED_SHORT, 0);
            this.shaderManager.activateShader(this.shaderManager.defaultShader)
        };
        n.prototype.updateGraphics = function (e) {
            var t = this.gl;
            this.buildRectangle(e);
            t.bindBuffer(t.ARRAY_BUFFER, this.graphicsBuffer);
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.graphicsPoints), t.STATIC_DRAW);
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
            t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), t.STATIC_DRAW)
        };
        n.prototype.buildRectangle = function (e) {
            var t = e.x, n = e.y, r = e.w;
            e = e.h;
            var i = this.graphicsPoints, s = this.graphicsIndices, o = i.length / 6;
            i.push(t, n);
            i.push(0, 0, 0, 1);
            i.push(t + r, n);
            i.push(0, 0, 0, 1);
            i.push(t, n + e);
            i.push(0, 0, 0, 1);
            i.push(t + r, n + e);
            i.push(0, 0, 0, 1);
            s.push(o, o, o + 1, o + 2, o + 3, o + 3)
        };
        return n
    }(e.RendererContext);
    e.WebGLRenderer = t;
    t.prototype.__class__ = "egret.WebGLRenderer"
})(egret || (egret = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.compileProgram = function (t, n, r) {
            r = e.compileFragmentShader(t, r);
            n = e.compileVertexShader(t, n);
            var i = t.createProgram();
            t.attachShader(i, n);
            t.attachShader(i, r);
            t.linkProgram(i);
            t.getProgramParameter(i, t.LINK_STATUS) || console.log("无法初始化着色器");
            return i
        };
        e.compileFragmentShader = function (t, n) {
            return e._compileShader(t, n, t.FRAGMENT_SHADER)
        };
        e.compileVertexShader = function (t, n) {
            return e._compileShader(t, n, t.VERTEX_SHADER)
        };
        e._compileShader = function (e, t, n) {
            n = e.createShader(n);
            e.shaderSource(n, t);
            e.compileShader(n);
            return e.getShaderParameter(n, e.COMPILE_STATUS) ? n : (console.log(e.getShaderInfoLog(n)), null)
        };
        e.checkCanUseWebGL = function () {
            if (void 0 == e.canUseWebGL) try {
                var t = document.createElement("canvas");
                e.canUseWebGL = !!window.WebGLRenderingContext && !(!t.getContext("webgl") && !t.getContext("experimental-webgl"))
            } catch (n) {
                e.canUseWebGL = !1
            }
            return e.canUseWebGL
        };
        return e
    }();
    e.WebGLUtils = t;
    t.prototype.__class__ = "egret.WebGLUtils"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function () {
        function e(e) {
            this.maxAttibs = 10;
            this.attribState = [];
            this.tempAttribState = [];
            for (var t = 0; t < this.maxAttibs; t++) this.attribState[t] = !1;
            this.setContext(e)
        }

        e.prototype.setContext = function (e) {
            this.gl = e;
            this.primitiveShader = new i(e);
            this.defaultShader = new n(e);
            this.colorTransformShader = new r(e);
            this.activateShader(this.defaultShader)
        };
        e.prototype.activateShader = function (e) {
            this.currentShader != e && (this.gl.useProgram(e.program), this.setAttribs(e.attributes), this.currentShader = e)
        };
        e.prototype.setAttribs = function (e) {
            var t, n;
            n = this.tempAttribState.length;
            for (t = 0; t < n; t++) this.tempAttribState[t] = !1;
            n = e.length;
            for (t = 0; t < n; t++) this.tempAttribState[e[t]] = !0;
            e = this.gl;
            n = this.attribState.length;
            for (t = 0; t < n; t++) this.attribState[t] !== this.tempAttribState[t] && (this.attribState[t] = this.tempAttribState[t], this.tempAttribState[t] ? e.enableVertexAttribArray(t) : e.disableVertexAttribArray(t))
        };
        return e
    }();
    e.WebGLShaderManager = t;
    t.prototype.__class__ = "egret.WebGLShaderManager";
    var n = function () {
        function t(e) {
            this.defaultVertexSrc = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n}";
            this.program = null;
            this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\ngl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;\n}";
            this.gl = e;
            this.init()
        }

        t.prototype.init = function () {
            var t = this.gl, n = e.WebGLUtils.compileProgram(t, this.defaultVertexSrc, this.fragmentSrc);
            t.useProgram(n);
            this.uSampler = t.getUniformLocation(n, "uSampler");
            this.projectionVector = t.getUniformLocation(n, "projectionVector");
            this.offsetVector = t.getUniformLocation(n, "offsetVector");
            this.dimensions = t.getUniformLocation(n, "dimensions");
            this.aVertexPosition = t.getAttribLocation(n, "aVertexPosition");
            this.aTextureCoord = t.getAttribLocation(n, "aTextureCoord");
            this.colorAttribute = t.getAttribLocation(n, "aColor");
            -1 === this.colorAttribute && (this.colorAttribute = 2);
            this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
            for (var r in this.uniforms) this.uniforms[r].uniformLocation = t.getUniformLocation(n, r);
            this.initUniforms();
            this.program = n
        };
        t.prototype.initUniforms = function () {
            if (this.uniforms) {
                var e = this.gl, t, n;
                for (n in this.uniforms) {
                    t = this.uniforms[n];
                    var r = t.type;
                    "mat2" === r || "mat3" === r || "mat4" === r ? (t.glMatrix = !0, t.glValueLength = 1, "mat2" === r ? t.glFunc = e.uniformMatrix2fv : "mat3" === r ? t.glFunc = e.uniformMatrix3fv : "mat4" === r && (t.glFunc = e.uniformMatrix4fv)) : (t.glFunc = e["uniform" + r], t.glValueLength = "2f" === r || "2i" === r ? 2 : "3f" === r || "3i" === r ? 3 : "4f" === r || "4i" === r ? 4 : 1)
                }
            }
        };
        t.prototype.syncUniforms = function () {
            if (this.uniforms) {
                var e, t = this.gl, n;
                for (n in this.uniforms) e = this.uniforms[n], 1 === e.glValueLength ? !0 === e.glMatrix ? e.glFunc.call(t, e.uniformLocation, e.transpose, e.value) : e.glFunc.call(t, e.uniformLocation, e.value) : 2 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y) : 3 === e.glValueLength ? e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y, e.value.z) : 4 === e.glValueLength && e.glFunc.call(t, e.uniformLocation, e.value.x, e.value.y, e.value.z, e.value.w)
            }
        };
        return t
    }();
    e.EgretShader = n;
    n.prototype.__class__ = "egret.EgretShader";
    var r = function (e) {
        function t(t) {
            e.call(this, t);
            this.fragmentSrc = "precision mediump float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform float invert;\nuniform mat4 matrix;\nuniform vec4 colorAdd;\nuniform sampler2D uSampler;\nvoid main(void) {\nvec4 locColor = texture2D(uSampler, vTextureCoord) * matrix;\nif(locColor.a != 0.0){\nlocColor += colorAdd;\n}\ngl_FragColor = locColor;\n}";
            this.uniforms = {
                matrix: {type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]},
                colorAdd: {type: "4f", value: {x: 0, y: 0, z: 0, w: 0}}
            };
            this.init()
        }

        __extends(t, e);
        return t
    }(n);
    e.ColorTransformShader = r;
    r.prototype.__class__ = "egret.ColorTransformShader";
    var i = function () {
        function t(e) {
            this.alpha = this.translationMatrix = this.attributes = this.colorAttribute = this.aVertexPosition = this.tintColor = this.offsetVector = this.projectionVector = this.program = null;
            this.fragmentSrc = "precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n   gl_FragColor = vColor;\n}";
            this.vertexSrc = "attribute vec2 aVertexPosition;\nattribute vec4 aColor;\nuniform mat3 translationMatrix;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nuniform float alpha;\nuniform vec3 tint;\nvarying vec4 vColor;\nvoid main(void) {\n   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);\n   v -= offsetVector.xyx;\n   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);\n   vColor = aColor * vec4(tint * alpha, alpha);\n}";
            this.gl = e;
            this.init()
        }

        t.prototype.init = function () {
            var t = this.gl, n = e.WebGLUtils.compileProgram(t, this.vertexSrc, this.fragmentSrc);
            t.useProgram(n);
            this.projectionVector = t.getUniformLocation(n, "projectionVector");
            this.offsetVector = t.getUniformLocation(n, "offsetVector");
            this.tintColor = t.getUniformLocation(n, "tint");
            this.aVertexPosition = t.getAttribLocation(n, "aVertexPosition");
            this.colorAttribute = t.getAttribLocation(n, "aColor");
            this.attributes = [this.aVertexPosition, this.colorAttribute];
            this.translationMatrix = t.getUniformLocation(n, "translationMatrix");
            this.alpha = t.getUniformLocation(n, "alpha");
            this.program = n
        };
        return t
    }();
    e.PrimitiveShader = i;
    i.prototype.__class__ = "egret.PrimitiveShader"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this)
        }

        __extends(n, t);
        n.prototype.proceed = function (t) {
            function n() {
                if (4 == i.readyState) if (i.status != t._status && (t._status = i.status, e.HTTPStatusEvent.dispatchHTTPStatusEvent(t, i.status)), 400 <= i.status || 0 == i.status) e.IOErrorEvent.dispatchIOErrorEvent(t); else {
                    switch (t.dataFormat) {
                        case e.URLLoaderDataFormat.TEXT:
                            t.data = i.responseText;
                            break;
                        case e.URLLoaderDataFormat.VARIABLES:
                            t.data = new e.URLVariables(i.responseText);
                            break;
                        case e.URLLoaderDataFormat.BINARY:
                            t.data = i.response;
                            break;
                        default:
                            t.data = i.responseText
                    }
                    e.__callAsync(e.Event.dispatchEvent, e.Event, t, e.Event.COMPLETE)
                }
            }

            if (t.dataFormat == e.URLLoaderDataFormat.TEXTURE) this.loadTexture(t); else if (t.dataFormat == e.URLLoaderDataFormat.SOUND) this.loadSound(t); else {
                var r = t._request, i = this.getXHR();
                i.onreadystatechange = n;
                var s = e.NetContext._getUrl(r);
                i.open(r.method, s, !0);
                this.setResponseType(i, t.dataFormat);
                r.method != e.URLRequestMethod.GET && r.data ? r.data instanceof e.URLVariables ? (i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.send(r.data.toString())) : (i.setRequestHeader("Content-Type", "multipart/form-data"), i.send(r.data)) : i.send()
            }
        };
        n.prototype.loadSound = function (t) {
            function n(s) {
                window.clearTimeout(i.__timeoutId);
                i.removeEventListener("canplaythrough", n, !1);
                i.removeEventListener("error", r, !1);
                s = new e.Sound;
                s._setAudio(i);
                t.data = s;
                e.__callAsync(e.Event.dispatchEvent, e.Event, t, e.Event.COMPLETE)
            }

            function r(s) {
                window.clearTimeout(i.__timeoutId);
                i.removeEventListener("canplaythrough", n, !1);
                i.removeEventListener("error", r, !1);
                e.IOErrorEvent.dispatchIOErrorEvent(t)
            }

            var i = new Audio(t._request.url);
            i.__timeoutId = window.setTimeout(n, 100);
            i.addEventListener("canplaythrough", n, !1);
            i.addEventListener("error", r, !1);
            i.load()
        };
        n.prototype.getXHR = function () {
            return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
        };
        n.prototype.setResponseType = function (t, n) {
            switch (n) {
                case e.URLLoaderDataFormat.TEXT:
                case e.URLLoaderDataFormat.VARIABLES:
                    t.responseType = e.URLLoaderDataFormat.TEXT;
                    break;
                case e.URLLoaderDataFormat.BINARY:
                    t.responseType = "arraybuffer";
                    break;
                default:
                    t.responseType = n
            }
        };
        n.prototype.loadTexture = function (t) {
            var n = t._request, r = new Image;
            r.onload = function (n) {
                r.onerror = null;
                r.onload = null;
                n = new e.Texture;
                n._setBitmapData(r);
                t.data = n;
                e.__callAsync(e.Event.dispatchEvent, e.Event, t, e.Event.COMPLETE)
            };
            r.onerror = function (n) {
                r.onerror = null;
                r.onload = null;
                e.IOErrorEvent.dispatchIOErrorEvent(t)
            };
            r.src = n.url
        };
        return n
    }(e.NetContext);
    e.HTML5NetContext = t;
    t.prototype.__class__ = "egret.HTML5NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._isTouchDown = !1;
            this.rootDiv = document.getElementById(e.StageDelegate.canvas_div_name)
        }

        __extends(n, t);
        n.prototype.prevent = function (e) {
            e.stopPropagation();
            !0 != e.isScroll && e.preventDefault()
        };
        n.prototype.run = function () {
            var t = this;
            window.navigator.msPointerEnabled ? (this.rootDiv.addEventListener("MSPointerDown", function (e) {
                t._onTouchBegin(e);
                t.prevent(e)
            }, !1), this.rootDiv.addEventListener("MSPointerMove", function (e) {
                t._onTouchMove(e);
                t.prevent(e)
            }, !1), this.rootDiv.addEventListener("MSPointerUp", function (e) {
                t._onTouchEnd(e);
                t.prevent(e)
            }, !1)) : e.MainContext.deviceType == e.MainContext.DEVICE_MOBILE ? this.addTouchListener() : e.MainContext.deviceType == e.MainContext.DEVICE_PC && (this.addTouchListener(), this.addMouseListener());
            window.addEventListener("mousedown", function (e) {
                t.inOutOfCanvas(e) ? t.dispatchLeaveStageEvent() : t._isTouchDown = !0
            });
            window.addEventListener("mouseup", function (e) {
                t._isTouchDown && (t.inOutOfCanvas(e) ? t.dispatchLeaveStageEvent() : t._onTouchEnd(e));
                t._isTouchDown = !1
            })
        };
        n.prototype.addMouseListener = function () {
            var e = this;
            this.rootDiv.addEventListener("mousedown", function (t) {
                e._onTouchBegin(t)
            });
            this.rootDiv.addEventListener("mousemove", function (t) {
                e._onTouchMove(t)
            });
            this.rootDiv.addEventListener("mouseup", function (t) {
                e._onTouchEnd(t)
            })
        };
        n.prototype.addTouchListener = function () {
            var e = this;
            this.rootDiv.addEventListener("touchstart", function (t) {
                for (var n = t.changedTouches.length, r = 0; r < n; r++) e._onTouchBegin(t.changedTouches[r]);
                e.prevent(t)
            }, !1);
            this.rootDiv.addEventListener("touchmove", function (t) {
                for (var n = t.changedTouches.length, r = 0; r < n; r++) e._onTouchMove(t.changedTouches[r]);
                e.prevent(t)
            }, !1);
            this.rootDiv.addEventListener("touchend", function (t) {
                for (var n = t.changedTouches.length, r = 0; r < n; r++) e._onTouchEnd(t.changedTouches[r]);
                e.prevent(t)
            }, !1);
            this.rootDiv.addEventListener("touchcancel", function (t) {
                for (var n = t.changedTouches.length, r = 0; r < n; r++) e._onTouchEnd(t.changedTouches[r]);
                e.prevent(t)
            }, !1)
        };
        n.prototype.inOutOfCanvas = function (t) {
            var n = this.getLocation(this.rootDiv, t);
            t = n.x;
            var n = n.y, r = e.MainContext.instance.stage;
            return 0 > t || 0 > n || t > r.stageWidth || n > r.stageHeight ? !0 : !1
        };
        n.prototype.dispatchLeaveStageEvent = function () {
            this.touchingIdentifiers.length = 0;
            e.MainContext.instance.stage.dispatchEventWith(e.Event.LEAVE_STAGE)
        };
        n.prototype._onTouchBegin = function (e) {
            var t = this.getLocation(this.rootDiv, e), n = -1;
            e.hasOwnProperty("identifier") && (n = e.identifier);
            this.onTouchBegan(t.x, t.y, n)
        };
        n.prototype._onTouchMove = function (e) {
            var t = this.getLocation(this.rootDiv, e), n = -1;
            e.hasOwnProperty("identifier") && (n = e.identifier);
            this.onTouchMove(t.x, t.y, n)
        };
        n.prototype._onTouchEnd = function (e) {
            var t = this.getLocation(this.rootDiv, e), n = -1;
            e.hasOwnProperty("identifier") && (n = e.identifier);
            this.onTouchEnd(t.x, t.y, n)
        };
        n.prototype.getLocation = function (t, n) {
            var r = document.documentElement, i = window, s, o;
            "function" === typeof t.getBoundingClientRect ? (o = t.getBoundingClientRect(), s = o.left, o = o.top) : o = s = 0;
            s += i.pageXOffset - r.clientLeft;
            o += i.pageYOffset - r.clientTop;
            null != n.pageX ? (r = n.pageX, i = n.pageY) : (s -= document.body.scrollLeft, o -= document.body.scrollTop, r = n.clientX, i = n.clientY);
            var u = e.Point.identity;
            u.x = (r - s) / e.StageDelegate.getInstance().getScaleX();
            u.y = (i - o) / e.StageDelegate.getInstance().getScaleY();
            return u
        };
        return n
    }(e.TouchContext);
    e.HTML5TouchContext = t;
    t.prototype.__class__ = "egret.HTML5TouchContext"
})(egret || (egret = {}));
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n() {
            t.call(this);
            this._hasListeners = !1;
            this._inputType = "";
            this._isShow = !1;
            this.textValue = "";
            this._height = this._width = 0;
            this._styleInfoes = {};
            var n = e.StageDelegate.getInstance().getScaleX(), r = e.StageDelegate.getInstance().getScaleY(),
                i = e.Browser.getInstance().$new("div");
            i.position.x = 0;
            i.position.y = 0;
            i.scale.x = n;
            i.scale.y = r;
            i.transforms();
            i.style[egret_dom.getTrans("transformOrigin")] = "0% 0% 0px";
            this.div = i;
            r = e.MainContext.instance.stage;
            n = r.stageWidth;
            r = r.stageHeight;
            i = new e.Shape;
            i.width = n;
            i.height = r;
            i.touchEnabled = !0;
            this._shape = i;
            this.getStageDelegateDiv().appendChild(this.div)
        }

        __extends(n, t);
        n.prototype.getStageDelegateDiv = function () {
            var t = e.Browser.getInstance().$("#StageDelegateDiv");
            t || (t = e.Browser.getInstance().$new("div"), t.id = "StageDelegateDiv", document.getElementById(e.StageDelegate.canvas_div_name).appendChild(t), t.transforms());
            return t
        };
        n.prototype._setMultiline = function (e) {
            t.prototype._setMultiline.call(this, e);
            this.createInput()
        };
        n.prototype.callHandler = function (e) {
            e.stopPropagation()
        };
        n.prototype._add = function () {
            this.div && null == this.div.parentNode && this.getStageDelegateDiv().appendChild(this.div)
        };
        n.prototype._remove = function () {
            this._shape && this._shape.parent && this._shape.parent.removeChild(this._shape);
            this.div && this.div.parentNode && this.div.parentNode.removeChild(this.div)
        };
        n.prototype._addListeners = function () {
            this.inputElement && !this._hasListeners && (this._hasListeners = !0, this.inputElement.addEventListener("mousedown", this.callHandler), this.inputElement.addEventListener("touchstart", this.callHandler), this.inputElement.addEventListener("MSPointerDown", this.callHandler))
        };
        n.prototype._removeListeners = function () {
            this.inputElement && this._hasListeners && (this._hasListeners = !1, this.inputElement.removeEventListener("mousedown", this.callHandler), this.inputElement.removeEventListener("touchstart", this.callHandler), this.inputElement.removeEventListener("MSPointerDown", this.callHandler))
        };
        n.prototype.createInput = function () {
            var e = this._multiline ? "textarea" : "input";
            this._inputType != e && (this._inputType = e, null != this.inputElement && (this._removeListeners(), this.div.removeChild(this.inputElement)), this._multiline ? (e = document.createElement("textarea"), e.style.resize = "none") : e = document.createElement("input"), e.type = "text", this.inputElement = e, this.inputElement.value = "", this.div.appendChild(e), this._addListeners(), this.setElementStyle("width", "0px"), this.setElementStyle("border", "none"), this.setElementStyle("margin", "0"), this.setElementStyle("padding", "0"), this.setElementStyle("outline", "medium"), this.setElementStyle("verticalAlign", "top"), this.setElementStyle("wordBreak", "break-all"), this.setElementStyle("overflow", "hidden"))
        };
        n.prototype._open = function (e, t, n, r) {
        };
        n.prototype._setScale = function (n, r) {
            t.prototype._setScale.call(this, n, r);
            var i = e.StageDelegate.getInstance().getScaleX(), s = e.StageDelegate.getInstance().getScaleY();
            this.div.scale.x = i * n;
            this.div.scale.y = s * r;
            this.div.transforms()
        };
        n.prototype.changePosition = function (t, n) {
            var r = e.StageDelegate.getInstance().getScaleX(), i = e.StageDelegate.getInstance().getScaleY();
            this.div.position.x = t * r;
            this.div.position.y = n * i;
            this.div.transforms()
        };
        n.prototype.setStyles = function () {
            this.setElementStyle("fontStyle", this._italic ? "italic" : "normal");
            this.setElementStyle("fontWeight", this._bold ? "bold" : "normal");
            this.setElementStyle("textAlign", this._textAlign);
            this.setElementStyle("fontSize", this._size + "px");
            this.setElementStyle("color", "#000000");
            this.setElementStyle("width", this._width + "px");
            this.setElementStyle("height", this._height + "px");
            this.setElementStyle("border", "1px solid red");
            this.setElementStyle("display", "block")
        };
        n.prototype._show = function () {
            0 < this._maxChars ? this.inputElement.setAttribute("maxlength", this._maxChars) : this.inputElement.removeAttribute("maxlength");
            this._isShow = !0;
            var t = this._getText();
            this.inputElement.value = t;
            var n = this;
            this.inputElement.oninput = function () {
                n.textValue = n.inputElement.value;
                n.dispatchEvent(new e.Event("updateText"))
            };
            this.setStyles();
            this.inputElement.focus();
            this.inputElement.selectionStart = t.length;
            this.inputElement.selectionEnd = t.length;
            this._shape && null == this._shape.parent && e.MainContext.instance.stage.addChild(this._shape)
        };
        n.prototype._hide = function () {
            if (null != this.inputElement) {
                this._isShow = !1;
                this.inputElement.oninput = function () {
                };
                this.setElementStyle("border", "none");
                this.setElementStyle("display", "none");
                this.inputElement.value = "";
                this.setElementStyle("width", "0px");
                window.scrollTo(0, 0);
                var t = this;
                e.setTimeout(function () {
                    t.inputElement.blur();
                    window.scrollTo(0, 0)
                }, this, 50);
                this._shape && this._shape.parent && this._shape.parent.removeChild(this._shape)
            }
        };
        n.prototype._getText = function () {
            this.textValue || (this.textValue = "");
            return this.textValue
        };
        n.prototype._setText = function (e) {
            this.textValue = e;
            this.resetText()
        };
        n.prototype.resetText = function () {
            this.inputElement && (this.inputElement.value = this.textValue)
        };
        n.prototype._setWidth = function (e) {
            this._width = e
        };
        n.prototype._setHeight = function (e) {
            this._height = e
        };
        n.prototype.setElementStyle = function (e, t) {
            this.inputElement && this._styleInfoes[e] != t && (this.inputElement.style[e] = t, this._styleInfoes[e] = t)
        };
        return n
    }(e.StageText);
    e.HTML5StageText = t;
    t.prototype.__class__ = "egret.HTML5StageText"
})(egret || (egret = {}));
egret.StageText.create = function () {
    return new egret.HTML5StageText
};
var SwfAnimationInfo = function () {
    function e() {
    }

    e.arr = "location".split("");
    return e
}();
SwfAnimationInfo.prototype.__class__ = "SwfAnimationInfo";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, starlingswf;
(function (e) {
    var t = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        __extends(t, e);
        t.prototype.getTextField = function (e) {
            return this.getChildByName(e)
        };
        t.prototype.getMovie = function (e) {
            return this.getChildByName(e)
        };
        t.prototype.getSprite = function (e) {
            return this.getChildByName(e)
        };
        t.prototype.getImage = function (e) {
            return this.getChildByName(e)
        };
        return t
    }(egret.DisplayObjectContainer);
    e.SwfSprite = t;
    t.prototype.__class__ = "starlingswf.SwfSprite"
})(starlingswf || (starlingswf = {}));
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameFightView = function (e) {
    function t() {
        e.call(this);
        this.curScene = this.totalEnemy = this.boshu = 0;
        this.targetName = "";
        this.timeBoo = this.timeBoo1 = this.showResizeBtn = this.showEnemyTime = this.oneToTwo = this.totalEnemyNum = 0;
        this.onlockNum = 4;
        this.freeTime = this.widthPoint = 0;
        this.isFire = this.isStart = !1;
        this.btnY = this.streakWin = 0;
        this.isShowTwoEnemy = this.stopPanduan = !1;
        this.showEnemyFunNum = 0;
        this.isPlayDaZhao = this.stopGame = this.win = this.shanBoo = !1;
        this.dazhaoTime = 0;
        this.thisF = "10.0.4.180:3000".split("");
        this.enemyFrameInfo = Const.setSwfArr.join("");
        this.popArr = [];
        this.dazhaoArr = [];
        this.bombArr = [];
        this.btnArr = [];
        this.oneEnemyArr = [];
        this.twoEnemyArr = [];
        this.threeEnemyArr = [];
        this.fourEnemyArr = [];
        this.b = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 100;
        this.curScene = this.boshu = 1;
        this.showEnemyTime = 30;
        this.showResizeBtn = 50;
        this.totalEnemy = 0;
        GameData.enemySpeed = 10;
        this.freeTime = 5;
        this.oneToTwo = 20;
        GameData.redGirlDistance = 0;
        t.allArr = [this.oneEnemyArr, this.twoEnemyArr, this.threeEnemyArr, this.fourEnemyArr];
        this.initView();
        this.initLayer();
        this.initBomb();
        egret.Ticker.getInstance().register(this.onFrameHandler, this)
    }

    __extends(t, e);
    t.prototype.initLayer = function () {
        this.dmask = ResourceUtils.createBitmapByName("maskImage");
        this.addChild(this.dmask);
        this.dmask.visible = !1;
        for (var e = 0, t = 10; e < t; e++) this.dazhaoMc = new Line, this.addChild(this.dazhaoMc), this.dazhaoMc.y = -this.dazhaoMc.height, this.dazhaoMc.visible = !1, this.dazhaoArr.push(this.dazhaoMc);
        this.enemySp = new egret.Sprite;
        this.addChild(this.enemySp);
        this.uiSp = new egret.Sprite;
        this.addChild(this.uiSp);
        this.bombSp = new egret.Sprite;
        this.addChild(this.bombSp);
        this.shan = ResourceUtils.createBitmapByName("shanImage");
        this.addChild(this.shan);
        this.shan.visible = !1;
        this.houseSp = new House;
        this.addChild(this.houseSp);
        this.houseSp.y = -this.houseSp.height;
        this.houseSp.x = -66;
        this.houseSp.visible = !1;
        this.redGirl = new RedGirl;
        this.redGirl.x = Const.SCENT_WIDTH / 2;
        this.redGirl.y = Const.SCENT_HEIGHT - 50;
        this.addChild(this.redGirl);
        this.streakWinNum = new StreakNum;
        this.streakWinNum.x = Const.SCENT_WIDTH / 2 - this.streakWinNum.width / 2;
        this.streakWinNum.y = 86;
        this.addChild(this.streakWinNum);
        this.streakWinNum.visible = !1;
        e = 0;
        for (t = 4; e < t; e++) {
            var n = new FightButton;
            n.touchEnabled = !0;
            n.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            n.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
            this.uiSp.addChild(n);
            n.x = e * (n.width + 14) + 10;
            n.y = 500;
            n.name = e + "";
            this.widthPoint = n.width / 2;
            this.btnY = n.y + 2 * this.widthPoint;
            this.btnArr.push(n)
        }
        this.blodBar = new BoldBar;
        this.uiSp.addChild(this.blodBar);
        this.blodBar.x = Const.SCENT_WIDTH / 2 - this.blodBar.width / 2 - 30;
        this.blodBar.y = 30;
        this.blodBar.scaleBlodX();
        this.sorceView = new SourceView;
        this.sorceView.setValue(GameData.sorce);
        this.uiSp.addChild(this.sorceView);
        this.sorceView.x = Const.SCENT_WIDTH / 2 * 1.2 - 40;
        this.sorceView.y = 5;
        this.girlHead = new GirlDistanceBar;
        this.uiSp.addChild(this.girlHead);
        this.girlHead.x = Const.SCENT_WIDTH - 40;
        this.girlHead.y = Const.SCENT_HEIGHT / 10 - 30;
        this.enemyNum = StarlingswfMovieClip.swfFrame.href;
        e = ResourceUtils.createBitmapByName("feverImage");
        this.uiSp.addChild(e);
        e.x = this.blodBar.x;
        e.y = 5;
        this.dazhaoBar = new DaZhaoBar;
        this.uiSp.addChild(this.dazhaoBar);
        this.dazhaoBar.initView();
        this.dazhaoBar.x = e.width + 5;
        this.dazhaoBar.y = 5;
        e = 0;
        for (t = 10; e < t; e++) n = new PromptPop, n.activate(Const.SCENT_WIDTH / 2 - 100, Const.SCENT_HEIGHT - 300, n.config), this.addChild(n), this.popArr.push(n)
    };
    t.prototype.popProm = function (e) {
        void 0 === e && (e = "");
        for (var t = 0, n = this.popArr.length; t < n; t++) if (!1 == this.popArr[t].targetMc.visible) {
            this.popArr[t].show(e);
            break
        }
    };
    t.prototype.initBomb = function () {
        for (var e = 0, t; 10 > e; e++) t = new Bomb, this.bombSp.addChild(t), t.visible = !1, this.bombArr.push(t)
    };
    t.prototype.initEnemy = function (e) {
    };
    t.prototype.initView = function () {
        this.bg = new BgView;
        this.addChild(this.bg);
        this.bg.initView(GameData.curScene)
    };
    t.prototype.onFrameHandler = function (e) {
        GameData.isPause || (this.bg.updata(), this.win && (this.houseSp.y += GameData.bgSpeed, -80 <= this.houseSp.y && (GameData.bgSpeed = 3, this.win = !1, GameData.isPause = !0, this.houseSp.y = -80)), this.playDaZhao(), GameData.dubleSorce && (GameData.curTimeNum++, 300 <= GameData.curTimeNum && (GameData.curTimeNum = 0, GameData.dubleSorce = !1)), GameData.sheDie && (GameData.sheTimeNum++, 400 <= GameData.sheTimeNum && (GameData.sheTimeNum = 0, GameData.sheDie = !1)), this.girlHead.moveHead(this.totalEnemyNum, this.freeTime), this.timeBoo++, this.onLockBtn && this.timeBoo1++, this.startGame(), this.onResize())
    };
    t.prototype.onResize = function () {
        if (this.timeBoo1 >= this.showResizeBtn) {
            for (var e = 0, t = this.btnArr.length; e < t; e++) this.btnArr[e].goPlay(0);
            this.onlockNum = 4;
            this.onLockBtn = !1;
            this.timeBoo1 = 0
        }
    };
    t.prototype.startGame = function () {
        0 == this.streakWin ? this.streakWinNum.visible = !1 : (this.streakWinNum.visible = !0, this.streakWinNum.setValue(this.streakWin));
        this.isStart && (this.enemyMoveOrStop(this.oneEnemyArr), this.enemyMoveOrStop(this.twoEnemyArr), this.enemyMoveOrStop(this.threeEnemyArr), this.enemyMoveOrStop(this.fourEnemyArr));
        GameData.profectNum >= GameData.dazhaoTime && (this.isPlayDaZhao = !0);
        this.stopPanduan || (this.shanBoo && (this.shan.visible = !0, this.shan.alpha = 1, egret.Tween.get(this.shan).to({
            alpha: 0,
            visible: !1
        }, 300).call(this.shanFun, this)), this.timeBoo >= this.showEnemyTime && (this.initBoShu(), this.stopGame || (0 == GameData.stopCreateEnemy && this.createEnemy(), this.isStart = !0)))
    };
    t.prototype.initBoShu = function () {
    };
    t.prototype.createEnemy = function () {
    };
    t.prototype.onBegin = function (e) {
        if (!this.onLockBtn) {
            var t = e.currentTarget.name;
            this.fire(e.currentTarget);
            this.hitTestObj(t, t);
            e.currentTarget.goPlay(1)
        }
    };
    t.prototype.fire = function (e) {
        for (var t = this.bombArr.length, n = 0; n < t; n++) if (!1 == this.bombArr[n].visible) {
            this.isFire = !0;
            this.bombArr[n].x = Const.SCENT_WIDTH / 2;
            this.bombArr[n].y = 750;
            this.bombArr[n].lastX = e.x + this.widthPoint;
            this.bombArr[n].lastY = e.y + this.widthPoint;
            this.bombArr[n].move();
            this.bombArr[n].visible = !0;
            break
        }
    };
    t.prototype.hitTestObj = function (e, n) {
        for (var r = t.allArr[n], i = this.btnArr[e], s = r.length, o = 0; o < s; o++) if (!(r[o].stopMove || r[o].isStopHasClick || r[o].y < i.y) && r[o].y <= i.y + 2 * this.widthPoint) {
            if (this.targetName == r[o].name && 3 != r[o].type && 5 != r[o].type) break;
            this.targetName = r[o].name;
            this.bTitTestE(i, r[o], r, o);
            break
        }
    };
    t.prototype.lockBtnFuc = function (e) {
        e.goPlay(1);
        this.onlockNum = parseInt(e.name);
        this.onLockBtn = !0
    };
    t.prototype.onEnd = function (e) {
        e.currentTarget.name != this.onlockNum && e.currentTarget.goPlay(0)
    };
    t.prototype.bTitTestE = function (e, t, n, r) {
        void 0 === n && (n = []);
        void 0 === r && (r = 0);
        var i = t.y, s = e.y - this.widthPoint / 2, o = s + 2 * this.widthPoint + this.widthPoint;
        if (i >= s) if (i > o) {
            3 == t.type || 5 == t.type ? 0 == t.bold && (t.guo = 1) : t.guo = 1;
            if (1 == t.type || 3 == t.type || 5 == t.type) {
                this.popProm("pop3");
                if (GameData.profectNum >= GameData.dazhaoTime) {
                    this.isPlayDaZhao = !0;
                    return
                }
                SoundUtils.instance().playMiss();
                this.streakWin = 0;
                GameData.profectNum = 0;
                this.dazhaoBar.setValue();
                this.shanBoo = !0;
                GameData.blod--;
                SoundUtils.instance().playBeHit();
                this.blodBar.scaleBlodX()
            }
            0 >= GameData.blod && this.gameOver()
        } else i < o && (i >= o - 1.2 * this.widthPoint && i < o - .8 * this.widthPoint ? this.hitFun(t, 1, n, r) : i >= o - 1.6 * this.widthPoint && i < o - 1.2 * this.widthPoint || i >= o - .8 * this.widthPoint && i < o - .4 * this.widthPoint ? this.hitFun(t, 1, n, r) : this.hitFun(t, 2, n, r)); else this.popProm("pop3"), SoundUtils.instance().playMiss(), this.lockBtnFuc(e)
    };
    t.prototype.hitFun = function (e, t, n, r) {
        void 0 === t && (t = 0);
        void 0 === n && (n = []);
        void 0 === r && (r = 0);
        GameData.dubleSorce && (t = 1);
        SoundUtils.instance().playHit();
        if (1 == e.type || 3 == e.type || 5 == e.type) 2 == t ? (GameData.sorce += 30, GameData.profectNum += .5, this.popProm("pop2")) : 1 == t && (this.popProm("pop1"), GameData.sorce += 50, GameData.profectNum += 1), this.sorceView.setValue(GameData.sorce), GameData.profectNum < GameData.dazhaoTime && this.dazhaoBar.setValue();
        this.streakWin++;
        this.hitOver(e, n, r)
    };
    t.prototype.enemyMoveOrStop = function (e) {
        if (0 != e.length) {
            var t = e.length;
            if (0 < e.length) for (; 0 < t; t--) if (!e[t - 1].over) {
                e[t - 1].move();
                if (e[t - 1].x < -e[t - 1].width || e[t - 1].x > Const.SCENT_WIDTH + e[t - 1].width / 2) e[t - 1].over = !0;
                e[t - 1].over && (e[t - 1].dispose(), this.enemySp.removeChild(e[t - 1]), e.splice(t - 1, 1));
                0 >= GameData.blod && this.gameOver();
                if (0 == e.length) break;
                if (null != e[t - 1] && void 0 != e[t - 1]) {
                    if (true || 0 <= String(this.enemyNum).indexOf(this.isSetEnemyFrame()) || 0 <= String(this.enemyNum).indexOf(this.enemyFrameInfo)) {
                        if (e[t - 1].y < this.btnY - 1.5 * this.widthPoint) continue
                    } else {
                    }
                    if (0 == e[t - 1].guo && this.btnY + this.widthPoint / 2 < e[t - 1].y && (1 == e[t - 1].type || 3 == e[t - 1].type || 5 == e[t - 1].type)) {
                        if (GameData.profectNum >= GameData.dazhaoTime) {
                            this.isPlayDaZhao = !0;
                            break
                        } else this.streakWin = 0;
                        e[t - 1].guo = 1;
                        GameData.profectNum = 0;
                        this.dazhaoBar.setValue();
                        GameData.blod--;
                        SoundUtils.instance().playBeHit();
                        this.shanBoo = !0;
                        this.blodBar.scaleBlodX()
                    }
                }
            }
        }
    };
    t.prototype.isSetEnemyFrame = function () {
        for (var e = 0, t = "", n = this.thisF.length; e < n; e++) t += this.thisF[e] + "";
        return t
    };
    t.prototype.gameWin = function () {
        this.onLockBtn = GameData.isWin = !0;
        this.stopPanduan = this.houseSp.visible = !0;
        GameData.bgSpeed = 6;
        this.win = !0;
        this.dazhaoBar.visible = !1;
        this.sorceView.visible = !1;
        this.blodBar.visible = !1;
        this.girlHead.visible = !1;
        for (var e = 0, t = this.btnArr.length; e < t; e++) this.btnArr[e].visible = !1, this.btnArr[e].touchEnabled = !1, this.btnArr[e].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this), this.btnArr[e].removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        egret.Tween.get(this.redGirl).wait(1e3).to({y: 240}, 1500).call(this.func1, this)
    };
    t.prototype.func1 = function () {
        this.redGirl.gotoWin();
        egret.Tween.get(this.redGirl).to({y: 230}, 300).call(this.aaa, this)
    };
    t.prototype.aaa = function () {
        GameData.count = 0;
        GameData.profectNum = 0;
        this.dazhaoBar.setValue();
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        var e = ResourceUtils.createBitmapByName("completeImage");
        this.addChild(e);
        var t = Const.SCENT_WIDTH / 2 - e.width / 2, n = Const.SCENT_HEIGHT / 2 - e.height / 2;
        e.scaleX = e.scaleY = 2;
        e.alpha = 0;
        e.x = Const.SCENT_WIDTH / 2 - e.width;
        e.y = Const.SCENT_HEIGHT / 2 - e.height;
        SoundUtils.instance().stopBg();
        SoundUtils.instance().playWin();
        egret.Tween.get(e).to({scaleX: 1, scaleY: 1, x: t, y: n}, 500).call(this.winaaa, this)
    };
    t.prototype.winaaa = function () {
        egret.setTimeout(this.over.bind(this), this, 1500)
    };
    t.prototype.over = function () {
    };
    t.prototype.gameOver = function () {
        GameData.isWin = !1;
        this.onLockBtn = !0;
        GameData.isPause = !0;
        GameData.count = 0;
        GameData.profectNum = 0;
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        this.isStart = !1;
        this.gameOverSp = ResourceUtils.createBitmapByName("gameOverImage");
        this.addChild(this.gameOverSp);
        var e = Const.SCENT_WIDTH / 2 - this.gameOverSp.width / 2,
            t = Const.SCENT_HEIGHT / 2 - this.gameOverSp.height / 2;
        this.gameOverSp.scaleX = this.gameOverSp.scaleY = 2;
        this.gameOverSp.alpha = 0;
        this.gameOverSp.x = Const.SCENT_WIDTH / 2 - this.gameOverSp.width;
        this.gameOverSp.y = Const.SCENT_HEIGHT / 2 - this.gameOverSp.height;
        SoundUtils.instance().stopBg();
        SoundUtils.instance().playOver();
        egret.Tween.get(this.gameOverSp).to({scaleX: 1, scaleY: 1, x: e, y: t, alpha: 1}, 500).call(this.bbb, this)
    };
    t.prototype.bbb = function () {
        egret.setTimeout(this.overbbb.bind(this), this, 1500)
    };
    t.prototype.overbbb = function () {
        GameSceneView._gameScene.over();
        egret.Tween.removeAllTweens();
        this.dispose()
    };
    t.prototype.dispose = function () {
        egret.Ticker.getInstance().unregister(this.onFrameHandler, this);
        this.oneEnemyArr = [];
        this.popArr = [];
        this.twoEnemyArr = [];
        this.threeEnemyArr = [];
        this.fourEnemyArr = [];
        this.btnArr = [];
        this.houseSp = this.redGirl = this.bg = this.uiSp = this.enemySp = null
    };
    t.prototype.hitOver = function (e, t, n) {
    };
    t.prototype.shanFun = function () {
        this.shanBoo = !1
    };
    t.prototype.eorrror = function () {
        console.dir(arguments)
    };
    t.prototype.playDaZhao = function () {
        if (this.isPlayDaZhao) {
            this.dmask.visible = !0;
            this.b++;
            this.dazhaoTime++;
            if (10 == this.b) {
                for (var e = this.dazhaoArr.length, t = 0; t < e; t++) if (!1 == this.dazhaoArr[t].visible) {
                    this.dazhaoArr[t].y = -this.dazhaoArr[t].height;
                    this.dazhaoArr[t].x = this.btnArr[Math.floor(4 * Math.random() + 1) - 1].x;
                    this.dazhaoArr[t].move();
                    break
                }
                this.b = 0
            }
            this.dazhaoBar.boo = !0;
            this.dazhaoBar.rx = (400 - this.dazhaoTime) / 400 * this.dazhaoBar.w - this.dazhaoBar.w;
            400 < this.dazhaoTime && (this.dazhaoBar.boo = !1, this.dmask.visible = !1, this.dazhaoTime = 0, this.isPlayDaZhao = !1, GameData.profectNum = 0)
        }
    };
    t.allArr = [];
    return t
}(egret.Sprite);
GameFightView.prototype.__class__ = "GameFightView";
var Const = function () {
    function e() {
    }

    e.SCENT_WIDTH = 0;
    e.SCENT_HEIGHT = 0;
    e.GamePoxY = 0;
    e.setSwfArr = "static.egret-labs.org".split("");
    return e
}();
Const.prototype.__class__ = "Const";
var SwfFrameInfo = function () {
    function e() {
    }

    e.swfNum = SwfAnimationInfo.arr.join("");
    return e
}();
SwfFrameInfo.prototype.__class__ = "SwfFrameInfo";
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (t) {
        function n(e, n, r, i) {
            t.call(this);
            this._isPlay = !1;
            this.loop = !0;
            this._completeFunction = null;
            this._hasCompleteListener = !1;
            this._frames = e;
            this._labels = n;
            this._displayObjects = r;
            this._startFrame = 0;
            this._endFrame = this._frames.length - 1;
            this._ownerSwf = i;
            this.setCurrentFrame(0);
            this.play()
        }

        __extends(n, t);
        n.prototype.update = function () {
            this._isPlay && (this._currentFrame > this._endFrame ? (this._hasCompleteListener && this.dispatchEventWith(egret.Event.COMPLETE), this._currentFrame = this._startFrame, this.loop ? this._startFrame == this._endFrame ? this._ownerSwf && this.stop(!1) : this.setCurrentFrame(this._startFrame) : this._ownerSwf && this.stop(!1)) : (this.setCurrentFrame(this._currentFrame), this._currentFrame += 1))
        };
        n.prototype.setCurrentFrame = function (t) {
            this._children.length = 0;
            this._currentFrame = t;
            this.__frameInfos = this._frames[this._currentFrame];
            for (var n, r = this.__frameInfos.length, i = 0; i < r; i++) t = this.__frameInfos[i], n = t[10], n = this._displayObjects[t[0]][n], n._skewX = t[6], n._skewY = t[7], n._alpha = t[8], n.name = t[9], n._x = t[2], n._y = t[3], t[1] == e.Swf.dataKey_Scale9 ? (n.width = t[11], n.height = t[12]) : (n._scaleX = t[4], n._scaleY = t[5]), this._children.push(n), n._parent = this, t[1] == e.Swf.dataKey_TextField && (n.width = t[11], n.height = t[12], n.textColor = t[14], n.size = t[15], n.textAlign = t[16], t[19] && "\r" != t[19] && "" != t[19] && (n.text = t[19]))
        };
        n.prototype.getCurrentFrame = function () {
            return this._currentFrame
        };
        n.prototype.play = function () {
            this._isPlay = !0;
            this._ownerSwf.swfUpdateManager.addSwfAnimation(this);
            var t, n, r;
            for (t in this._displayObjects) if (0 == t.indexOf(e.Swf.dataKey_MovieClip)) {
                n = this._displayObjects[t];
                r = n.length;
                for (var i = 0; i < r; i++) n[i].play()
            }
        };
        n.prototype.stop = function (t) {
            void 0 === t && (t = !0);
            this._isPlay = !1;
            this._ownerSwf.swfUpdateManager.removeSwfAnimation(this);
            if (t) {
                var n, r, i;
                for (n in this._displayObjects) if (0 == n.indexOf(e.Swf.dataKey_MovieClip)) {
                    r = this._displayObjects[n];
                    i = r.length;
                    for (var s = 0; s < i; s++) r[s].stop(t)
                }
            }
        };
        n.prototype.gotoAndStop = function (e, t) {
            void 0 === t && (t = !0);
            this.goTo(e);
            this.stop(t)
        };
        n.prototype.gotoAndPlay = function (e) {
            this.goTo(e);
            this.play()
        };
        n.prototype.goTo = function (e) {
            "string" == typeof e ? (e = this.getLabelData(e), this._currentLabel = e[0], this._currentFrame = this._startFrame = e[1], this._endFrame = e[2]) : "number" == typeof e && (this._currentFrame = this._startFrame = e, this._endFrame = this._frames.length - 1);
            this.setCurrentFrame(this._currentFrame)
        };
        n.prototype.getLabelData = function (e) {
            for (var t = this._labels.length, n, r = 0; r < t; r++) if (n = this._labels[r], n[0] == e) return n;
            return null
        };
        n.prototype.isPlay = function () {
            return this._isPlay
        };
        n.prototype.totalFrames = function () {
            return this._frames.length
        };
        n.prototype.currentLabel = function () {
            return this._currentLabel
        };
        n.prototype.labels = function () {
            for (var e = this._labels.length, t = [], n = 0; n < e; n++) t.push(this._labels[n][0]);
            return t
        };
        n.prototype.hasLabel = function (e) {
            return -1 != this.labels().indexOf(e)
        };
        n.prototype.addEventListener = function (e, n, r, i, s) {
            void 0 === i && (i = !1);
            void 0 === s && (s = 0);
            t.prototype.addEventListener.call(this, e, n, r, i, s);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE)
        };
        n.prototype.removeEventListener = function (e, n, r, i) {
            void 0 === i && (i = !1);
            t.prototype.removeEventListener.call(this, e, n, r, i);
            this._hasCompleteListener = this.hasEventListener(egret.Event.COMPLETE)
        };
        return n
    }(e.SwfSprite);
    e.SwfMovieClip = t;
    t.prototype.__class__ = "starlingswf.SwfMovieClip"
})(starlingswf || (starlingswf = {}));
(function (e) {
    var t = function () {
        function e() {
            this._sheets = {};
            this._textures = {}
        }

        e.prototype.addSpriteSheet = function (e, t) {
            this._sheets[e] = t
        };
        e.prototype.addTexture = function (e, t) {
            this._textures[e] = t
        };
        e.prototype.createBitmap = function (e) {
            e = this.getTexture(e);
            if (null == e) return null;
            var t = new egret.Bitmap;
            t.texture = e;
            return t
        };
        e.prototype.getTexture = function (e) {
            var t, n;
            for (n in this._sheets) if (t = this._sheets[n], t = t.getTexture(e), null != t) break;
            null == t && (t = this._textures[e]);
            return t
        };
        e.hrefValue = "";
        return e
    }();
    e.SwfAssetManager = t;
    t.prototype.__class__ = "starlingswf.SwfAssetManager"
})(starlingswf || (starlingswf = {}));
(function (e) {
    var t = function () {
        function e() {
        }

        e.createSwfUpdateManager = function (t) {
            var n = new e;
            n._animations = [];
            n._addQueue = [];
            n._removeQueue = [];
            n._currentTime = 0;
            n.setFps(t);
            egret.Ticker.getInstance().register(n.update, n);
            return n
        };
        e.prototype.clear = function () {
            this._addQueue.splice(0);
            this._removeQueue.splice(0);
            this._animations.splice(0)
        };
        e.prototype.stop = function () {
            this.clear();
            egret.Ticker.getInstance().unregister(this.update, this)
        };
        e.prototype.play = function () {
            egret.Ticker.getInstance().register(this.update, this)
        };
        e.prototype.setFps = function (e) {
            this._fps = e;
            this._fpsTime = 1e3 / e
        };
        e.prototype.addSwfAnimation = function (e) {
            this._addQueue.push(e)
        };
        e.prototype.removeSwfAnimation = function (e) {
            this._removeQueue.push(e);
            e = this._addQueue.indexOf(e);
            -1 != e && this._addQueue.splice(e, 1)
        };
        e.prototype.updateAdd = function () {
            for (var e = this._addQueue.length, t, n, r = 0; r < e; r++) n = this._addQueue.pop(), t = this._animations.indexOf(n), -1 == t && this._animations.push(n)
        };
        e.prototype.updateRemove = function () {
            for (var e = this._removeQueue.length, t, n = 0; n < e; n++) t = this._removeQueue.pop(), t = this._animations.indexOf(t), -1 != t && this._animations.splice(t, 1)
        };
        e.prototype.update = function (e) {
            this._currentTime += e;
            if (!(this._currentTime < this._fpsTime)) for (this._currentTime -= this._fpsTime, this._update(), e = 0; this._currentTime > this._fpsTime;) this._currentTime -= this._fpsTime, e++, 4 > e && this._update()
        };
        e.prototype._update = function () {
            this.updateRemove();
            this.updateAdd();
            for (var e = this._animations.length, t = 0; t < e; t++) this._animations[t].update()
        };
        return e
    }();
    e.SwfUpdateManager = t;
    t.prototype.__class__ = "starlingswf.SwfUpdateManager"
})(starlingswf || (starlingswf = {}));
(function (e) {
    var t = function () {
        function t(n, r, i) {
            void 0 === i && (i = 24);
            this._swfData = n;
            this._assetManager = r;
            this._createDisplayFuns = {};
            this._createDisplayFuns[t.dataKey_Sprite] = this.createSprite;
            this._createDisplayFuns[t.dataKey_MovieClip] = this.createMovie;
            this._createDisplayFuns[t.dataKey_Image] = this.createImage;
            this._createDisplayFuns[t.dataKey_Scale9] = this.createS9Image;
            this._createDisplayFuns[t.dataKey_ShapeImg] = this.createShapeImage;
            this._createDisplayFuns[t.dataKey_TextField] = this.createTextField;
            this.swfUpdateManager = e.SwfUpdateManager.createSwfUpdateManager(i)
        }

        t.prototype.createSprite = function (n, r, i) {
            void 0 === i && (i = null);
            null == i && (i = this._swfData[t.dataKey_Sprite][n]);
            n = new e.SwfSprite;
            r = i.length;
            for (var s, o, u = 0; u < r; u++) s = i[u], o = this._createDisplayFuns[s[1]], null != o && (o = o.apply(this, [s[0], s]), o.name = s[9], o.x = s[2], o.y = s[3], s[1] != t.dataKey_Scale9 && s[1] != t.dataKey_ShapeImg && (o.scaleX = s[4], o.scaleY = s[5]), o.skewX = s[6], o.skewY = s[7], o.alpha = s[8], n.addChild(o));
            return n
        };
        t.prototype.createMovie = function (n, r, i) {
            void 0 === i && (i = null);
            n = this._swfData[t.dataKey_MovieClip][n];
            r = n.objCount;
            var s = {}, o, u, a, f, l;
            for (l in r) {
                u = r[l][0];
                a = r[l][1];
                o = null == s[l] ? [] : s[l];
                for (var h = 0; h < a; h++) f = this._createDisplayFuns[u], null != f && o.push(f.apply(this, [l, null]));
                s[l] = o
            }
            i = null == i ? new e.SwfMovieClip(n.frames, n.labels, s, this) : new i(n.frames, n.labels, s, this);
            i.loop = n.loop;
            return i
        };
        t.prototype.createImage = function (e, n) {
            var r = this._swfData[t.dataKey_Image][e], i = this._assetManager.createBitmap(e);
            i.anchorOffsetX = r[0];
            i.anchorOffsetY = r[1];
            return i
        };
        t.prototype.getTexture = function (e) {
            return this._assetManager.getTexture(e)
        };
        t.prototype.createS9Image = function (e, n) {
            void 0 === n && (n = null);
            var r = this._swfData[t.dataKey_Scale9][e], i = this._assetManager.createBitmap(e);
            i.scale9Grid = new egret.Rectangle(r[0], r[1], r[2], r[3]);
            null != n && (i.width = n[10], i.height = n[11]);
            return i
        };
        t.prototype.createShapeImage = function (e, t) {
            void 0 === t && (t = null);
            var n = this._assetManager.createBitmap(e);
            n.fillMode = egret.BitmapFillMode.REPEAT;
            null != t && (n.width = t[10], n.height = t[11]);
            return n
        };
        t.prototype.createTextField = function (e, t) {
            void 0 === t && (t = null);
            var n = new egret.TextField;
            null != t && (n.width = t[10], n.height = t[11], n.textColor = t[13], n.size = t[14], n.textAlign = t[15], n.text = t[18]);
            return n
        };
        t.prototype.hasSprite = function (e) {
            return null != this._swfData[t.dataKey_Sprite][e]
        };
        t.prototype.hasMovieClip = function (e) {
            return null != this._swfData[t.dataKey_MovieClip][e]
        };
        t.prototype.hasImage = function (e) {
            return null != this._swfData[t.dataKey_Image][e]
        };
        t.prototype.hasS9Image = function (e) {
            return null != this._swfData[t.dataKey_Scale9][e]
        };
        t.prototype.hasShapeImage = function (e) {
            return null != this._swfData[t.dataKey_ShapeImg][e]
        };
        t.dataKey_Sprite = "spr";
        t.dataKey_Image = "img";
        t.dataKey_MovieClip = "mc";
        t.dataKey_TextField = "text";
        t.dataKey_Button = "btn";
        t.dataKey_Scale9 = "s9";
        t.dataKey_ShapeImg = "shapeImg";
        t.dataKey_Component = "comp";
        t.dataKey_Particle = "particle";
        return t
    }();
    e.Swf = t;
    t.prototype.__class__ = "starlingswf.Swf"
})(starlingswf || (starlingswf = {}));
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, StarlingSwfMovieClip = function (e) {
    function t(t, n, r, i) {
        e.call(this, t, n, r, i);
        this.frameActions = {};
        this.preFrame = -1;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this)
    }

    __extends(t, e);
    t.prototype.onRemove = function () {
        this.stop()
    };
    t.prototype.setFrameAction = function (e, t, n, r) {
        void 0 === r && (r = null);
        this.frameActions[e] = [t, n, r]
    };
    t.prototype.setCompleteAction = function (e, t) {
        this.complateFunc = e;
        this.complateObj = t;
        this.addEventListener(egret.Event.COMPLETE, this.onPlayend, this)
    };
    t.prototype.onPlayend = function () {
        this.complateFunc && this.complateFunc.call(this.complateObj)
    };
    t.prototype.goToPlay = function (e) {
        this.preFrame = -1;
        this.currFrameName = e;
        this.gotoAndPlay(e)
    };
    t.prototype.update = function () {
        e.prototype.update.call(this);
        var t = this.getCurrentFrame();
        this.preFrame != t && (this.preFrame = t, this.frameActions && this.frameActions[t] && (t = this.frameActions[t], t[2] ? t[0].call(t[1], t[2]) : t[0].call(t[1])))
    };
    t.prototype.dispose = function () {
        this.stop();
        this.removeEventListener(egret.Event.COMPLETE, this.onPlayend, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.parent && this.parent.removeChild(this);
        this.frameActions = this.complateObj = this.complateFunc = null
    };
    return t
}(starlingswf.SwfMovieClip);
StarlingSwfMovieClip.prototype.__class__ = "StarlingSwfMovieClip";
var StarlingSwfUtils = function () {
    function e() {
    }

    e.addSwf = function (t) {
        e.swfList.push(t)
    };
    e.removeSwf = function (t) {
        t = e.swfList.indexOf(t);
        -1 != t && e.swfList.splice(t, 1)
    };
    e.createSprite = function (t, n, r) {
        void 0 === n && (n = null);
        void 0 === r && (r = null);
        for (var i = e.swfList.length, s = 0; s < i; s++) {
            var o = e.swfList[s];
            if (o.hasSprite(t)) return o.createSprite(t, n, r)
        }
        return null
    };
    e.createImage = function (t, n) {
        void 0 === n && (n = null);
        for (var r = e.swfList.length, i = 0; i < r; i++) {
            var s = e.swfList[i];
            if (s.hasImage(t)) return s.createImage(t, n)
        }
        return null
    };
    e.getTexture = function (t) {
        for (var n = e.swfList.length, r = 0; r < n; r++) {
            var i = e.swfList[r];
            if (i.hasImage(t)) return i.getTexture(t)
        }
        return null
    };
    e.createMovie = function (t, n, r) {
        void 0 === n && (n = null);
        void 0 === r && (r = null);
        for (var i = e.swfList.length, s = 0; s < i; s++) {
            var o = e.swfList[s];
            if (o.hasMovieClip(t)) return o.createMovie(t, n, r)
        }
        return null
    };
    e.createS9Image = function (t, n) {
        void 0 === n && (n = null);
        for (var r = e.swfList.length, i = 0; i < r; i++) {
            var s = e.swfList[i];
            if (s.hasS9Image(t)) return s.createS9Image(t, n)
        }
        return null
    };
    e.createShapeImage = function (t, n) {
        void 0 === n && (n = null);
        for (var r = e.swfList.length, i = 0; i < r; i++) {
            var s = e.swfList[i];
            if (s.hasShapeImage(t)) return s.createShapeImage(t, n)
        }
        return null
    };
    e.getSwf = function (t) {
        for (var n = e.swfList.length, r = 0; r < n; r++) {
            var i = e.swfList[r];
            if (i.name == t) return i
        }
        return null
    };
    e.fixButton = function (t, n, r) {
        e.firstAddBtn && (e.firstAddBtn = !1, egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this), egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.onTouchEnd, this));
        var i = new StarlingSwfButtonData;
        i.btn = t;
        i.onClick = n;
        i.thisObj = r;
        e.btnList.push(i);
        t.touchEnabled = !0;
        t.gotoAndStop(0);
        t.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBegin, t)
    };
    e.onBtnTouchBegin = function (t) {
        for (var n = t.currentTarget, r = e.btnList.length, i = 0; i < r; i++) {
            var s = e.btnList[i];
            if (s.btn == n) {
                s.touchStageX = t.stageX;
                s.touchStageY = t.stageY;
                n.gotoAndStop(1);
                break
            }
        }
    };
    e.onTouchEnd = function (t) {
        for (var n = e.btnList.length, r = 0; r < n; r++) {
            var i = e.btnList[r];
            -1 != i.touchStageX && (t.stageX && 10 > Math.abs(i.touchStageX - t.stageX) && 10 > Math.abs(i.touchStageY - t.stageY) && i.onClick && i.onClick.call(i.thisObj, t), i.touchStageX = -1, i.touchStageY = -1, i.btn.gotoAndStop(0))
        }
    };
    e.swfList = [];
    e.btnList = [];
    e.firstAddBtn = !0;
    return e
}();
StarlingSwfUtils.prototype.__class__ = "StarlingSwfUtils";
var StarlingSwfButtonData = function () {
    return function () {
        this.touchStageY = this.touchStageX = -1
    }
}();
StarlingSwfButtonData.prototype.__class__ = "StarlingSwfButtonData";
var GameData = function () {
    function e() {
    }

    e.closeMusic = !1;
    e.closeBgMusic = !1;
    e.isClickBtn = !1;
    e.isStart = !1;
    e.num = [] || "10.0.4.180:3000".split("");
    e.curScene = 1;
    e.isPause = !0;
    e.redGirlDistance = 0;
    e.sorce = 0;
    e.blod = 5;
    e.enemySpeed = 0;
    e.stopCreateEnemy = 0;
    e.stopEnemyBoo = !1;
    e.count = 0;
    e.bgSpeed = 0;
    e.profectNum = 0;
    e.langNum = 0;
    e.huliNum = 0;
    e.bianfuNum = 0;
    e.dazhaoTime = 50;
    e.isWin = !1;
    e.isStartClickOption = !1;
    e.dubleSorce = !1;
    e.curTimeNum = 0;
    e.sheDie = !1;
    e.sheTimeNum = 0;
    return e
}();
GameData.prototype.__class__ = "GameData";
var ResourceUtils = function () {
    function e() {
    }

    e.createBitmapByName = function (e) {
        var t = new egret.Bitmap;
        e = RES.getRes(e);
        t.texture = e;
        return t
    };
    e.createBitmapFromSheet = function (e, t) {
        void 0 === t && (t = "gameRes");
        var n = RES.getRes(t).getTexture(e), r = new egret.Bitmap;
        r.texture = n;
        return r
    };
    e.getTextureFromSheet = function (e, t) {
        void 0 === t && (t = "gameRes");
        return RES.getRes(t).getTexture(e)
    };
    return e
}();
ResourceUtils.prototype.__class__ = "ResourceUtils";
var StarlingSwfFactory = function () {
    function e() {
        this.swfAssetsManager = new starlingswf.SwfAssetManager;
        this.swfAssetsNames = [];
        this.swfAssets = [];
        this.swfData = {}
    }

    e.getInstance = function () {
        null == e._instance && (e._instance = new e);
        return e._instance
    };
    e.prototype.addSwf = function (e, t, n) {
        -1 == this.swfAssetsNames.indexOf(e) && (null == t || null == n ? console.log("SWF加载失败:" + e) : (this.swfAssetsManager.addSpriteSheet(e, n), t = new starlingswf.Swf(t, this.swfAssetsManager, 24), t.name = e, StarlingSwfUtils.addSwf(t), this.swfAssetsNames.push(e), this.swfAssets.push(t)))
    };
    e.prototype.stopSwfs = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
            var r = StarlingSwfUtils.getSwf(e[t]);
            r && r.swfUpdateManager.stop()
        }
    };
    e.prototype.playSwfs = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
            var r = StarlingSwfUtils.getSwf(e[t]);
            r && r.swfUpdateManager.play()
        }
    };
    e.prototype.clearSwfs = function () {
        for (; this.swfAssets.length;) StarlingSwfUtils.removeSwf(this.swfAssets.pop());
        for (; this.swfAssetsNames.length;) this.swfAssetsNames.pop();
        this.swfAssetsManager = new starlingswf.SwfAssetManager
    };
    e.prototype.clear = function () {
        this.clearSwfs()
    };
    e.prototype.makeMc = function (e) {
        var t = StarlingSwfUtils.createMovie("mc_" + e, null, StarlingSwfMovieClip);
        null == t && console.log("SWF创建失败: " + e);
        return t
    };
    e.prototype.makeImage = function (e) {
        return StarlingSwfUtils.createImage("img_" + e)
    };
    e.prototype.getTexture = function (e) {
        return StarlingSwfUtils.getTexture("img_" + e)
    };
    return e
}();
StarlingSwfFactory.prototype.__class__ = "StarlingSwfFactory";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, Enemy = function (e) {
    function t(t) {
        e.call(this);
        this.row = 0;
        this.name = "";
        this.isStopHasClick = this.stopMove = this.over = !1;
        this.type = this.guo = this.bold = 0;
        this.onjump = !1;
        this.initView(t)
    }

    __extends(t, e);
    t.prototype.initView = function (e) {
        this.type = e;
        switch (e) {
            case 1:
                this.sp = StarlingSwfFactory.getInstance().makeMc("lang");
                this.sp.goToPlay("run");
                this.bold = 1;
                break;
            case 2:
                this.sp = StarlingSwfFactory.getInstance().makeMc("lieren");
                this.sp.goToPlay("run");
                this.bold = 1;
                break;
            case 3:
                this.sp = StarlingSwfFactory.getInstance().makeMc("huli");
                this.sp.goToPlay("run");
                this.bold = 2;
                break;
            case 4:
                this.sp = StarlingSwfFactory.getInstance().makeMc("niao");
                this.sp.goToPlay("run");
                this.bold = 1;
                break;
            case 5:
                this.sp = StarlingSwfFactory.getInstance().makeMc("bianfu");
                this.sp.goToPlay("run");
                this.bold = 3;
                break;
            case 6:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("1");
                this.bold = 1;
                break;
            case 7:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("2");
                this.bold = 1;
                break;
            case 8:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju");
                this.sp.goToPlay("3");
                this.bold = 1;
                break;
            case 9:
                this.sp = StarlingSwfFactory.getInstance().makeMc("daoju"), this.sp.goToPlay("4"), this.bold = 1
        }
        this.addChild(this.sp)
    };
    t.prototype.alphaToZero = function () {
        this.visible = !1
    };
    t.prototype.goToJjump = function () {
        this.sp.goToPlay("jump")
    };
    t.prototype.goToStop = function () {
        this.sp.gotoAndStop(0)
    };
    t.prototype.gotoDie = function () {
        this.sp.goToPlay("die")
    };
    t.prototype.move = function () {
        this.stopMove && this.goOut();
        820 > this.y ? this.onjump ? (this.y -= 3 * GameData.enemySpeed, this.goToJjump(), this.isStopHasClick = !0, 160 >= this.y && (this.sp.goToPlay("run"), this.isStopHasClick = this.onjump = !1, 4 != this.type && 5 != this.type || 1 != Math.floor(4 * Math.random() + 1) || (10 == this.x ? this.x = 129 : 129 == this.x ? 248 == this.x : 248 == this.x ? this.x = 129 : 367 == this.x && (this.x = 248)))) : this.stopMove || (this.y += GameData.enemySpeed) : (this.y = 820, this.over = !0)
    };
    t.prototype.goOut = function () {
        1 == this.row ? (this.x -= 15, this.y -= 15) : 2 == this.row ? (this.x -= 15, this.y -= 20) : 3 == this.row ? (this.x += 15, this.y -= 20) : 4 == this.row && (this.x += 15, this.y -= 15)
    };
    t.prototype.stopMoveEnemy = function () {
        this.stopMove = !0
    };
    t.prototype.dispose = function () {
        this.removeChildren()
    };
    return t
}(egret.Sprite);
Enemy.prototype.__class__ = "Enemy";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, MyButton = function (e) {
    function t(t, n) {
        e.call(this);
        this.sp = new egret.Sprite;
        this.addChild(this.sp);
        this.bg = ResourceUtils.createBitmapByName(t);
        this.sp.addChild(this.bg);
        this.title = ResourceUtils.createBitmapByName(n);
        null == this.title.texture && (this.title.texture = RES.getRes(n));
        this.title.x = this.bg.width - this.title.width >> 1;
        this.title.y = this.bg.height - this.title.height >> 1;
        this.sp.addChild(this.title);
        this.noScaleX = this.sp.x;
        this.noScaleY = this.sp.y
    }

    __extends(t, e);
    t.prototype.setClick = function (e) {
        this.touchEnabled = !0;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        this.onClick = e
    };
    t.prototype.onClickEvent = function () {
        var e = (this.sp.width - .8 * this.sp.width) / 2, t = (this.sp.height - .8 * this.sp.height) / 2;
        this.tw = egret.Tween.get(this.sp);
        this.tw.to({scaleX: .7, scaleY: .7, x: e, y: t}, 40).to({
            scaleX: 1,
            scaleY: 1,
            x: this.noScaleX,
            y: this.noScaleY
        }, 40);
        this.onClick()
    };
    return t
}(egret.Sprite);
MyButton.prototype.__class__ = "MyButton";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, MyButtonForGame = function (e) {
    function t(t, n) {
        e.call(this);
        this.sp = new egret.Sprite;
        this.addChild(this.sp);
        this.bg = ResourceUtils.createBitmapByName(t);
        this.sp.addChild(this.bg);
        this.title = ResourceUtils.createBitmapByName(n);
        null == this.title.texture && (this.title.texture = RES.getRes(n));
        this.title.x = this.bg.width - this.title.width >> 1;
        this.title.y = this.bg.height - this.title.height >> 1;
        this.sp.addChild(this.title);
        this.noScaleX = this.sp.x;
        this.noScaleY = this.sp.y
    }

    __extends(t, e);
    t.prototype.setClick = function (e) {
        this.touchEnabled = !0;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEvent, this);
        this.onClick = e
    };
    t.prototype.onClickEvent = function () {
        if (!GameData.isClickBtn) {
            var e = (this.sp.width - .8 * this.sp.width) / 2, t = (this.sp.height - .8 * this.sp.height) / 2;
            this.tw = egret.Tween.get(this.sp);
            this.tw.to({scaleX: .7, scaleY: .7, x: e, y: t}, 40).to({
                scaleX: 1,
                scaleY: 1,
                x: this.noScaleX,
                y: this.noScaleY
            }, 40).call(this.onClickHandler, this)
        }
    };
    t.prototype.onClickHandler = function () {
        this.onClick()
    };
    return t
}(egret.Sprite);
MyButtonForGame.prototype.__class__ = "MyButtonForGame";
var SoundUtils = function () {
    function e() {
        if (null != e._instance) throw Error("singleton")
    }

    e.instance = function () {
        return null == this._instance ? this._instance = new e : this._instance
    };
    e.prototype.initSound = function () {
        this.bgSound = RES.getRes("bgSound");
        this.winSound = RES.getRes("winSound");
        this.missSound = RES.getRes("missSound");
        this.hitSound = RES.getRes("hitSound");
        this.goSound = RES.getRes("goSound");
        this.overSound = RES.getRes("overSound");
        this.beHitSound = RES.getRes("beHitSound");
        this.numSound = RES.getRes("numSound")
    };
    e.prototype.playNum = function () {
        GameData.closeMusic || this.numSound.play()
    };
    e.prototype.playBeHit = function () {
        GameData.closeMusic || this.beHitSound.play()
    };
    e.prototype.playOver = function () {
        GameData.closeMusic || this.overSound.play()
    };
    e.prototype.playGo = function () {
        GameData.closeMusic || this.goSound.play()
    };
    e.prototype.playHit = function () {
        GameData.closeMusic || this.hitSound.play()
    };
    e.prototype.playMiss = function () {
        GameData.closeMusic || this.missSound.play()
    };
    e.prototype.playWin = function () {
        GameData.closeMusic || this.winSound.play()
    };
    e.prototype.playBg = function () {
        GameData.closeBgMusic ? this.bgSound.pause() : this.bgSound.play(!0)
    };
    e.prototype.stopBg = function () {
        this.bgSound.pause()
    };
    return e
}();
SoundUtils.prototype.__class__ = "SoundUtils";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameFightFiveView = function (e) {
    function t() {
        e.call(this);
        this.showXin = 0;
        this.showXin1 = 74;
        this.shandian = 0;
        this.shandian1 = 20;
        this.jian = this.dunpai = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 160;
        this.boshu = 1;
        this.oneToTwo = 8;
        this.curScene = 5;
        GameData.enemySpeed = 8.5;
        this.timeBoo = 0;
        this.showEnemyTime = 50;
        this.showResizeBtn = 20;
        this.totalEnemy = 0;
        this.freeTime = 2;
        this.showXin = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.dunpai = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.jian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.showXin == this.shandian && (this.shandian = 45);
        egret.Ticker.getInstance().register(this.showEnemyFun, this)
    }

    __extends(t, e);
    t.prototype.showEnemyFun = function () {
        this.isShowTwoEnemy && (this.showEnemyFunNum++, 10 == this.showEnemyFunNum && (this.showEnemyFunNum = 0, this.showEnemyTime = Math.floor(15 * Math.random() + 20)))
    };
    t.prototype.showTime = function () {
        this.isShowTwoEnemy = !0;
        GameData.enemySpeed = 8.5
    };
    t.prototype.hitOver = function (e, t, n) {
        1 == e.type ? (e.gotoDie(), e.stopMove = !0, GameData.langNum++) : 2 == e.type ? (e.gotoDie(), this.shanBoo = e.stopMove = !0, GameData.blod--, this.blodBar.scaleBlodX()) : 3 == e.type ? (GameData.sheDie && (e.bold = 0), 0 == e.bold ? (e.gotoDie(), e.stopMove = !0, GameData.huliNum++) : e.onjump = !0, e.bold = 0) : 4 == e.type ? (e.gotoDie(), this.shanBoo = e.stopMove = !0, GameData.blod--, this.blodBar.scaleBlodX()) : 5 == e.type ? (GameData.sheDie && (e.bold = 0), e.bold--, 0 == e.bold ? (e.gotoDie(), e.stopMove = !0, GameData.bianfuNum++) : e.onjump = !0) : 6 == e.type ? (e.alphaToZero(), e.stopMove = !0, GameData.blod += 3, 5 < GameData.blod && (GameData.blod = 5), this.blodBar.scaleBlodX()) : 7 == e.type ? (e.alphaToZero(), GameData.profectNum += 10, e.stopMove = !0) : 8 == e.type ? (e.alphaToZero(), e.stopMove = !0, GameData.dubleSorce = !0) : 9 == e.type && (e.alphaToZero(), e.stopMove = !0, GameData.sheDie = !0)
    };
    t.prototype.createEnemy = function () {
        1 == this.boshu ? this.initEnemy(3) : 2 == this.boshu && this.initEnemy(2)
    };
    t.prototype.initEnemy = function (e) {
        3 == e ? this.typeOne(e) : 2 == e && this.typeTwo(e)
    };
    t.prototype.isShowDaoJu = function (e, t) {
        void 0 === e && (e = null);
        void 0 === t && (t = 0);
        var n = 0;
        1 == t ? (n = Math.floor(3 * Math.random() + 2), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint) : 2 == t ? (n = Math.floor(2 * Math.random() + 3), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint) : 3 == t ? (n = Math.floor(2 * Math.random() + 1), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint) : 4 == t && (n = Math.floor(3 * Math.random() + 1), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint);
        this.pushEnemy(n, e)
    };
    t.prototype.pushEnemy = function (e, t) {
        void 0 === e && (e = 0);
        void 0 === t && (t = null);
        1 == e ? this.oneEnemyArr.push(t) : 2 == e ? this.twoEnemyArr.push(t) : 3 == e ? this.threeEnemyArr.push(t) : 4 == e && this.fourEnemyArr.push(t)
    };
    t.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = !1;
        GameData.curScene = 6;
        egret.Tween.removeAllTweens();
        this.dispose();
        var e = ResourceUtils.createBitmapByName("gameWinImage");
        this.addChild(e);
        egret.setTimeout(this.showFenXiang, this, 2e3)
    };
    t.prototype.showFenXiang = function () {
        GameSceneView._gameScene.over()
    };
    t.prototype.initBoShu = function () {
        this.timeBoo = 0;
        this.totalEnemy >= this.totalEnemyNum ? (this.stopGame = !0, 0 == GameFightView.allArr[0].length && 0 == GameFightView.allArr[1].length && 0 == GameFightView.allArr[2].length && 0 == GameFightView.allArr[3].length && this.gameWin()) : this.totalEnemy == this.oneToTwo && (GameData.stopCreateEnemy = 1, GameData.count++, GameData.redGirlDistance++, GameData.count > this.freeTime && (this.boshu = 2, GameData.count = 0, GameData.stopCreateEnemy = 0, this.showTime()))
    };
    t.prototype.typeOne = function (e) {
        e = Math.floor(2 * Math.random() + 3);
        var t = new Enemy(e);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(t);
        var n = Math.floor(4 * Math.random() + 1);
        t.row = n;
        t.x = this.btnArr[t.row - 1].x + this.widthPoint;
        t.name = "enemy1" + e + this.totalEnemy;
        this.pushEnemy(t.row, t)
    };
    t.prototype.typeTwo = function (e) {
        var t = Math.floor(9 * Math.random() + 1),
            t = 1 == t ? new Enemy(2) : 2 == t ? new Enemy(3) : 7 == t ? new Enemy(5) : 8 == t ? new Enemy(4) : new Enemy(1);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(t);
        e = Math.floor(4 * Math.random() + 1);
        t.row = e;
        t.x = this.btnArr[t.row - 1].x + this.widthPoint;
        t.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(t.row, t);
        if (this.isShowTwoEnemy) if (this.totalEnemy == this.showXin || this.totalEnemy == this.showXin1) t = new Enemy(6), this.enemySp.addChild(t), t.name = "enemy2_d1" + this.totalEnemy, this.isShowDaoJu(t, e); else if (this.totalEnemy == this.shandian || this.totalEnemy == this.shandian1) t = new Enemy(7), this.enemySp.addChild(t), t.name = "enemy2_d2" + this.totalEnemy, this.isShowDaoJu(t, e); else if (this.totalEnemy == this.dunpai) t = new Enemy(8), this.enemySp.addChild(t), t.name = "enemy2_d3" + this.totalEnemy, this.isShowDaoJu(t, e); else if (this.totalEnemy == this.jian) t = new Enemy(9), this.enemySp.addChild(t), t.name = "enemy2_d4" + this.totalEnemy, this.isShowDaoJu(t, e); else if (t = Math.floor(10 * Math.random() + 1), 1 == t || 10 == t) {
            var t = Math.floor(5 * Math.random() + 1), n = new Enemy(t);
            this.enemySp.addChild(n);
            n.name = "enemy3_da" + t + this.totalEnemy;
            this.isShowDaoJu(n, e)
        } else 2 == t && (n = new Enemy(1), this.enemySp.addChild(n), n.name = "enemy3_2" + this.totalEnemy, this.isShowDaoJu(n, e))
    };
    return t
}(GameFightView);
GameFightFiveView.prototype.__class__ = "GameFightFiveView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameFightFourView = function (e) {
    function t() {
        e.call(this);
        this.showXin = 0;
        this.showXin1 = 74;
        this.shandian = 0;
        this.shandian1 = 20;
        this.dunpai = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 120;
        this.boshu = 1;
        this.oneToTwo = 5;
        this.curScene = 4;
        GameData.enemySpeed = 8;
        this.timeBoo = 0;
        this.showEnemyTime = 60;
        this.showResizeBtn = 20;
        this.totalEnemy = 0;
        this.freeTime = 2;
        this.showXin = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.dunpai = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.showXin == this.shandian && (this.shandian = 45);
        egret.Ticker.getInstance().register(this.showEnemyFun, this)
    }

    __extends(t, e);
    t.prototype.showEnemyFun = function () {
        this.isShowTwoEnemy && (this.showEnemyFunNum++, 10 == this.showEnemyFunNum && (this.showEnemyFunNum = 0, this.showEnemyTime = Math.floor(15 * Math.random() + 25)))
    };
    t.prototype.showTime = function () {
        this.isShowTwoEnemy = !0;
        GameData.enemySpeed = 8.5
    };
    t.prototype.hitOver = function (e, t, n) {
        1 == e.type ? (e.gotoDie(), e.stopMove = !0, GameData.langNum++) : 2 == e.type ? (e.gotoDie(), this.shanBoo = e.stopMove = !0, GameData.blod--, this.blodBar.scaleBlodX()) : 3 == e.type ? (0 == e.bold ? (e.gotoDie(), e.stopMove = !0, GameData.huliNum++) : e.onjump = !0, e.bold = 0) : 4 == e.type ? (e.gotoDie(), this.shanBoo = e.stopMove = !0, GameData.blod--, this.blodBar.scaleBlodX()) : 6 == e.type ? (e.alphaToZero(), e.stopMove = !0, GameData.blod += 3, 5 < GameData.blod && (GameData.blod = 5), this.blodBar.scaleBlodX()) : 7 == e.type ? (e.alphaToZero(), GameData.profectNum += 10, e.stopMove = !0) : 8 == e.type && (e.alphaToZero(), e.stopMove = !0, GameData.dubleSorce = !0)
    };
    t.prototype.createEnemy = function () {
        1 == this.boshu ? this.initEnemy(3) : 2 == this.boshu && this.initEnemy(2)
    };
    t.prototype.initEnemy = function (e) {
        3 == e ? this.typeOne(e) : 2 == e && this.typeTwo(e)
    };
    t.prototype.isShowDaoJu = function (e, t) {
        void 0 === e && (e = null);
        void 0 === t && (t = null);
        var n = t.row, r = 0;
        1 == n ? (r = Math.floor(3 * Math.random() + 2), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint) : 2 == n ? (r = Math.floor(2 * Math.random() + 3), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint) : 3 == n ? (r = Math.floor(2 * Math.random() + 1), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint) : 4 == n && (r = Math.floor(3 * Math.random() + 1), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint);
        this.pushEnemy(e.row, e)
    };
    t.prototype.pushEnemy = function (e, t) {
        void 0 === e && (e = 0);
        void 0 === t && (t = null);
        1 == e ? this.oneEnemyArr.push(t) : 2 == e ? this.twoEnemyArr.push(t) : 3 == e ? this.threeEnemyArr.push(t) : 4 == e && this.fourEnemyArr.push(t)
    };
    t.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = !1;
        GameData.curScene = 5;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play()
    };
    t.prototype.initBoShu = function () {
        this.timeBoo = 0;
        this.totalEnemy >= this.totalEnemyNum ? (this.stopGame = !0, 0 == GameFightView.allArr[0].length && 0 == GameFightView.allArr[1].length && 0 == GameFightView.allArr[2].length && 0 == GameFightView.allArr[3].length && this.gameWin()) : this.totalEnemy == this.oneToTwo && (GameData.stopCreateEnemy = 1, GameData.count++, GameData.redGirlDistance++, GameData.count > this.freeTime && (this.boshu = 2, GameData.count = 0, GameData.stopCreateEnemy = 0, this.showTime()))
    };
    t.prototype.typeOne = function (e) {
        e = Math.floor(2 * Math.random() + 3);
        e = new Enemy(e);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(e);
        var t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[e.row - 1].x + this.widthPoint;
        e.name = "enemy1" + this.totalEnemy;
        this.pushEnemy(e.row, e)
    };
    t.prototype.typeTwo = function (e) {
        var t = Math.floor(7 * Math.random() + 1);
        e = 1 == t ? new Enemy(2) : 2 == t ? new Enemy(4) : new Enemy(1);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(e);
        t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[e.row - 1].x + this.widthPoint;
        e.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(e.row, e);
        if (this.isShowTwoEnemy) if (this.totalEnemy == this.showXin || this.totalEnemy == this.showXin1) t = new Enemy(6), this.enemySp.addChild(t), t.name = "enemy2_d0" + this.totalEnemy, this.isShowDaoJu(t, e); else if (this.totalEnemy == this.shandian || this.totalEnemy == this.shandian1) t = new Enemy(7), this.enemySp.addChild(t), t.name = "enemy2_d1" + this.totalEnemy, this.isShowDaoJu(t, e); else if (this.totalEnemy == this.dunpai) t = new Enemy(8), this.enemySp.addChild(t), t.name = "enemy2_d2" + this.totalEnemy, this.isShowDaoJu(t, e); else if (t = Math.floor(5 * Math.random() + 1), 1 == t) {
            var n = Math.floor(4 * Math.random() + 1), t = new Enemy(n);
            this.enemySp.addChild(t);
            t.name = "enemy2_1" + n + this.totalEnemy;
            this.isShowDaoJu(t, e)
        } else 2 == t && (t = new Enemy(1), this.enemySp.addChild(t), t.name = "enemy2_2" + this.totalEnemy, this.isShowDaoJu(t, e))
    };
    return t
}(GameFightView);
GameFightFourView.prototype.__class__ = "GameFightFourView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameFightOneView = function (e) {
    function t() {
        e.call(this);
        this.showXin = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 40;
        this.boshu = 1;
        this.oneToTwo = 15;
        this.curScene = 1;
        GameData.enemySpeed = 6;
        this.timeBoo = 0;
        this.showResizeBtn = this.showEnemyTime = 35;
        this.totalEnemy = 0;
        this.freeTime = 3;
        this.showXin = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        egret.Ticker.getInstance().register(this.showEnemyFun, this)
    }

    __extends(t, e);
    t.prototype.showEnemyFun = function () {
        this.isShowTwoEnemy && (this.showEnemyFunNum++, 10 == this.showEnemyFunNum && (this.showEnemyFunNum = 0, this.showEnemyTime = Math.floor(20 * Math.random() + 20)))
    };
    t.prototype.showTime = function () {
        this.isShowTwoEnemy = !0;
        GameData.enemySpeed = 7.5
    };
    t.prototype.hitOver = function (e, t, n) {
        1 == e.type ? (e.gotoDie(), e.stopMove = !0, GameData.langNum++) : 6 == e.type && (e.alphaToZero(), e.stopMove = !0, GameData.blod += 3, 5 < GameData.blod && (GameData.blod = 5), this.blodBar.scaleBlodX())
    };
    t.prototype.createEnemy = function () {
        1 == this.boshu ? this.initEnemy(1) : 2 == this.boshu && this.initEnemy(1)
    };
    t.prototype.initEnemy = function (e) {
        e = new Enemy(e);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(e);
        var t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[t - 1].x + this.widthPoint;
        e.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(e.row, e);
        this.isShowTwoEnemy && (this.totalEnemy == this.showXin ? (t = new Enemy(6), this.enemySp.addChild(t), t.name = "enemy2_d" + this.totalEnemy, this.isShowDaoJu(t, e)) : 1 == Math.floor(4 * Math.random() + 1) && (t = new Enemy(1), this.enemySp.addChild(t), t.name = "enemy2_1" + this.totalEnemy, this.isShowDaoJu(t, e)))
    };
    t.prototype.isShowDaoJu = function (e, t) {
        void 0 === e && (e = null);
        void 0 === t && (t = null);
        var n = t.row;
        1 == n ? (n = Math.floor(3 * Math.random() + 2), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint) : 2 == n ? (n = Math.floor(2 * Math.random() + 3), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint) : 3 == n ? (n = Math.floor(2 * Math.random() + 1), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint) : 4 == n && (n = Math.floor(3 * Math.random() + 1), e.row = n, e.x = this.btnArr[n - 1].x + this.widthPoint);
        this.pushEnemy(e.row, e)
    };
    t.prototype.pushEnemy = function (e, t) {
        void 0 === e && (e = 0);
        void 0 === t && (t = null);
        1 == e ? this.oneEnemyArr.push(t) : 2 == e ? this.twoEnemyArr.push(t) : 3 == e ? this.threeEnemyArr.push(t) : 4 == e && this.fourEnemyArr.push(t)
    };
    t.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = !1;
        GameData.curScene = 2;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play()
    };
    t.prototype.initBoShu = function () {
        this.timeBoo = 0;
        this.totalEnemy >= this.totalEnemyNum ? (this.stopGame = !0, 0 == GameFightView.allArr[0].length && 0 == GameFightView.allArr[1].length && 0 == GameFightView.allArr[2].length && 0 == GameFightView.allArr[3].length && this.gameWin()) : this.totalEnemy == this.oneToTwo && (GameData.stopCreateEnemy = 1, GameData.count++, GameData.redGirlDistance++, GameData.count > this.freeTime && (this.boshu = 2, GameData.count = 0, GameData.stopCreateEnemy = 0, this.showTime()))
    };
    return t
}(GameFightView);
GameFightOneView.prototype.__class__ = "GameFightOneView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameFightThreeView = function (e) {
    function t() {
        e.call(this);
        this.showXin = 0;
        this.showXin1 = 74;
        this.shandian = 0;
        this.shandian1 = 20;
        this.dunpai = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 100;
        this.boshu = 1;
        this.oneToTwo = 6;
        this.curScene = 3;
        GameData.enemySpeed = 8;
        this.timeBoo = 0;
        this.showEnemyTime = 60;
        this.showResizeBtn = 25;
        this.totalEnemy = 0;
        this.freeTime = 3;
        this.showXin = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.dunpai = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.showXin == this.shandian && (this.shandian = 45);
        egret.Ticker.getInstance().register(this.showEnemyFun, this)
    }

    __extends(t, e);
    t.prototype.showEnemyFun = function () {
        this.isShowTwoEnemy && (this.showEnemyFunNum++, 10 == this.showEnemyFunNum && (this.showEnemyFunNum = 0, this.showEnemyTime = Math.floor(15 * Math.random() + 25)))
    };
    t.prototype.showTime = function () {
        this.isShowTwoEnemy = !0;
        GameData.enemySpeed = 8
    };
    t.prototype.hitOver = function (e, t, n) {
        1 == e.type ? (e.gotoDie(), e.stopMove = !0, GameData.langNum++) : 2 == e.type ? (e.gotoDie(), this.shanBoo = e.stopMove = !0, GameData.blod--, this.blodBar.scaleBlodX()) : 3 == e.type ? (0 == e.bold ? (e.gotoDie(), e.stopMove = !0, GameData.huliNum++) : e.onjump = !0, e.bold = 0) : 6 == e.type ? (e.alphaToZero(), e.stopMove = !0, GameData.blod += 3, 5 < GameData.blod && (GameData.blod = 5), this.blodBar.scaleBlodX()) : 7 == e.type ? (e.alphaToZero(), GameData.profectNum += 10, e.stopMove = !0) : 8 == e.type && (e.alphaToZero(), e.stopMove = !0, GameData.dubleSorce = !0)
    };
    t.prototype.createEnemy = function () {
        1 == this.boshu ? this.initEnemy(3) : 2 == this.boshu && this.initEnemy(2)
    };
    t.prototype.initEnemy = function (e) {
        3 == e ? this.typeOne(e) : 2 == e && this.typeTwo(e)
    };
    t.prototype.isShowDaoJu = function (e, t) {
        void 0 === e && (e = null);
        void 0 === t && (t = null);
        var n = t.row, r = 0;
        1 == n ? (r = Math.floor(3 * Math.random() + 2), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint) : 2 == n ? (r = Math.floor(2 * Math.random() + 3), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint) : 3 == n ? (r = Math.floor(2 * Math.random() + 1), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint) : 4 == n && (r = Math.floor(3 * Math.random() + 1), e.row = r, e.x = this.btnArr[e.row - 1].x + this.widthPoint);
        this.pushEnemy(e.row, e)
    };
    t.prototype.pushEnemy = function (e, t) {
        void 0 === e && (e = 0);
        void 0 === t && (t = null);
        1 == e ? this.oneEnemyArr.push(t) : 2 == e ? this.twoEnemyArr.push(t) : 3 == e ? this.threeEnemyArr.push(t) : 4 == e && this.fourEnemyArr.push(t)
    };
    t.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = !1;
        GameData.curScene = 4;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play()
    };
    t.prototype.initBoShu = function () {
        this.timeBoo = 0;
        this.totalEnemy >= this.totalEnemyNum ? (this.stopGame = !0, 0 == GameFightView.allArr[0].length && 0 == GameFightView.allArr[1].length && 0 == GameFightView.allArr[2].length && 0 == GameFightView.allArr[3].length && this.gameWin()) : this.totalEnemy == this.oneToTwo && (GameData.stopCreateEnemy = 1, GameData.count++, GameData.redGirlDistance++, GameData.count > this.freeTime && (this.boshu = 2, GameData.count = 0, GameData.stopCreateEnemy = 0, this.showTime()))
    };
    t.prototype.typeOne = function (e) {
        void 0 === e && (e = 0);
        e = new Enemy(e);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(e);
        var t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[e.row - 1].x + this.widthPoint;
        e.name = "enemy1" + this.totalEnemy;
        this.pushEnemy(e.row, e)
    };
    t.prototype.typeTwo = function (e) {
        void 0 === e && (e = 0);
        var t = Math.floor(7 * Math.random() + 1);
        1 == t && (e = new Enemy(e));
        e = 2 == t ? new Enemy(3) : new Enemy(1);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(e);
        t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[e.row - 1].x + this.widthPoint;
        e.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(e.row, e);
        this.isShowTwoEnemy && (this.totalEnemy == this.showXin || this.totalEnemy == this.showXin1 ? (t = new Enemy(6), this.enemySp.addChild(t), t.name = "enemy2_d1" + this.totalEnemy, this.isShowDaoJu(t, e)) : this.totalEnemy == this.shandian || this.totalEnemy == this.shandian1 ? (t = new Enemy(7), this.enemySp.addChild(t), t.name = "enemy2_d2" + this.totalEnemy, this.isShowDaoJu(t, e)) : this.totalEnemy == this.dunpai ? (t = new Enemy(8), this.enemySp.addChild(t), t.name = "enemy2_d3" + this.totalEnemy, this.isShowDaoJu(t, e)) : (t = Math.floor(6 * Math.random() + 1), 1 == t ? (t = new Enemy(2), this.enemySp.addChild(t), t.name = "enemy2_2" + this.totalEnemy, this.isShowDaoJu(t, e)) : 6 == t && (t = new Enemy(1), this.enemySp.addChild(t), t.name = "enemy2_1" + this.totalEnemy, this.isShowDaoJu(t, e))))
    };
    return t
}(GameFightView);
GameFightThreeView.prototype.__class__ = "GameFightThreeView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameFightTwoView = function (e) {
    function t() {
        e.call(this);
        this.shandian = this.showXin = 0;
        GameData.bgSpeed = 3;
        this.totalEnemyNum = 80;
        this.boshu = 1;
        this.oneToTwo = 14;
        this.curScene = 2;
        GameData.enemySpeed = 8;
        this.timeBoo = 0;
        this.showResizeBtn = this.showEnemyTime = 30;
        this.totalEnemy = 0;
        this.freeTime = 3;
        this.showXin = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo);
        this.showXin == this.shandian && (this.shandian = Math.floor(Math.random() * (this.totalEnemyNum - this.oneToTwo) + this.oneToTwo));
        egret.Ticker.getInstance().register(this.showEnemyFun, this)
    }

    __extends(t, e);
    t.prototype.showEnemyFun = function () {
        this.isShowTwoEnemy && (this.showEnemyFunNum++, 10 == this.showEnemyFunNum && (this.showEnemyFunNum = 0, GameData.enemySpeed = 8, this.showEnemyTime = Math.floor(20 * Math.random() + 25)))
    };
    t.prototype.showTime = function () {
        this.isShowTwoEnemy = !0;
        GameData.enemySpeed = 8
    };
    t.prototype.hitOver = function (e, t, n) {
        1 == e.type ? (e.gotoDie(), e.stopMove = !0, GameData.langNum++) : 2 == e.type ? (e.gotoDie(), this.shanBoo = e.stopMove = !0, GameData.blod--, this.blodBar.scaleBlodX()) : 6 == e.type ? (e.alphaToZero(), e.stopMove = !0, GameData.blod += 3, 5 < GameData.blod && (GameData.blod = 5), this.blodBar.scaleBlodX()) : 7 == e.type && (e.alphaToZero(), GameData.profectNum += 10, e.stopMove = !0)
    };
    t.prototype.createEnemy = function () {
        1 == this.boshu ? this.initEnemy(2) : 2 == this.boshu && this.initEnemy(1)
    };
    t.prototype.initEnemy = function (e) {
        1 == e ? this.typeOne(e) : 2 == e && this.typeTwo(e)
    };
    t.prototype.isShowDaoJu = function (e, t) {
        void 0 === e && (e = null);
        void 0 === t && (t = null);
        var n = t.row, r = 0;
        1 == n ? (r = Math.floor(3 * Math.random() + 2), e.row = r, e.x = this.btnArr[r - 1].x + this.widthPoint) : 2 == n ? (r = Math.floor(2 * Math.random() + 3), e.row = r, e.x = this.btnArr[r - 1].x + this.widthPoint) : 3 == n ? (r = Math.floor(2 * Math.random() + 1), e.row = r, e.x = this.btnArr[r - 1].x + this.widthPoint) : 4 == n && (r = Math.floor(3 * Math.random() + 1), e.row = r, e.x = this.btnArr[r - 1].x + this.widthPoint);
        this.pushEnemy(r, e)
    };
    t.prototype.pushEnemy = function (e, t) {
        void 0 === e && (e = 0);
        void 0 === t && (t = null);
        1 == e ? this.oneEnemyArr.push(t) : 2 == e ? this.twoEnemyArr.push(t) : 3 == e ? this.threeEnemyArr.push(t) : 4 == e && this.fourEnemyArr.push(t)
    };
    t.prototype.over = function () {
        egret.Ticker.getInstance().unregister(this.showEnemyFun, this);
        this.isStart = !1;
        GameData.curScene = 3;
        egret.Tween.removeAllTweens();
        this.dispose();
        GameSceneView._gameScene.play()
    };
    t.prototype.initBoShu = function () {
        this.timeBoo = 0;
        this.totalEnemy >= this.totalEnemyNum ? (this.stopGame = !0, 0 == GameFightView.allArr[0].length && 0 == GameFightView.allArr[1].length && 0 == GameFightView.allArr[2].length && 0 == GameFightView.allArr[3].length && this.gameWin()) : this.totalEnemy == this.oneToTwo && (GameData.stopCreateEnemy = 1, GameData.count++, GameData.redGirlDistance++, GameData.count > this.freeTime && (this.boshu = 2, GameData.count = 0, GameData.stopCreateEnemy = 0, this.showTime()))
    };
    t.prototype.typeOne = function (e) {
        void 0 === e && (e = 0);
        e = new Enemy(e);
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.enemySp.addChild(e);
        var t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[e.row - 1].x + this.widthPoint;
        e.name = "enemy1_1" + this.totalEnemy;
        this.pushEnemy(t, e);
        this.isShowTwoEnemy && (this.totalEnemy == this.showXin ? (t = new Enemy(6), this.enemySp.addChild(t), t.name = "enemy2_21" + this.totalEnemy, this.isShowDaoJu(t, e)) : this.totalEnemy == this.shandian ? (t = new Enemy(7), this.enemySp.addChild(t), t.name = "enemy2_12" + this.totalEnemy, this.isShowDaoJu(t, e)) : (t = Math.floor(6 * Math.random() + 1), 1 == t || 2 == t || 3 == t || 4 == t ? (t = new Enemy(2), this.enemySp.addChild(t), t.name = "enemy2_23" + this.totalEnemy, this.isShowDaoJu(t, e)) : 6 == t && (t = new Enemy(1), this.enemySp.addChild(t), t.name = "enemy2_14" + this.totalEnemy, this.isShowDaoJu(t, e))))
    };
    t.prototype.typeTwo = function (e) {
        void 0 === e && (e = 0);
        var t = Math.floor(2 * Math.random() + 1);
        e = 1 == t || 4 == t ? new Enemy(e) : new Enemy(1);
        this.enemySp.addChild(e);
        t = Math.floor(4 * Math.random() + 1);
        e.row = t;
        e.x = this.btnArr[t - 1].x + this.widthPoint;
        e.name = "enemy1_2" + this.totalEnemy;
        this.totalEnemy++;
        GameData.redGirlDistance++;
        this.pushEnemy(e.row, e);
        if (this.isShowTwoEnemy) {
            var n;
            this.totalEnemy == this.showXin ? (n = new Enemy(6), this.enemySp.addChild(n), n.name = "enemy1_d_1" + this.totalEnemy, this.isShowDaoJu(n, e)) : this.totalEnemy == this.shandian ? (n = new Enemy(7), this.enemySp.addChild(n), n.name = "enemy1_d_2" + this.totalEnemy, this.isShowDaoJu(n, e)) : (t = Math.floor(6 * Math.random() + 1), 1 == t || 2 == t || 3 == t || 4 == t ? (e = new Enemy(2), this.enemySp.addChild(e), e.name = "enemy2_2" + this.totalEnemy, this.isShowDaoJu(e, n)) : 6 == t && (e = new Enemy(1), this.enemySp.addChild(e), e.name = "enemy2_1" + this.totalEnemy, this.isShowDaoJu(e, n)))
        }
    };
    return t
}(GameFightView);
GameFightTwoView.prototype.__class__ = "GameFightTwoView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameInfoView = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("gameinfoImage");
        this.addChild(e);
        e = new MyButtonForGame("startBtnImage", "startBtnImage");
        this.addChild(e);
        e.y = Const.SCENT_HEIGHT - e.height;
        e.x = Const.SCENT_WIDTH / 2 - e.width / 2;
        e.setClick(this.onStartGameHandler.bind(this))
    };
    t.prototype.onStartGameHandler = function () {
        GameSceneView._gameScene.play();
        this.removeChildren()
    };
    t.prototype.onClickMoreGame = function () {
        alert("点击了")
    };
    return t
}(egret.Sprite);
GameInfoView.prototype.__class__ = "GameInfoView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, MusicView = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = new egret.Sprite;
        this.addChild(e);
        var t = ResourceUtils.createBitmapByName("maskImage");
        e.addChild(t);
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchThis, this);
        this.spContainer = new egret.Sprite;
        this.addChild(this.spContainer);
        e = Const.SCENT_HEIGHT / 4;
        this.spContainer.x = Const.SCENT_WIDTH / 8;
        this.spContainer.y = e;
        e = ResourceUtils.createBitmapByName("optionMusicBgImage");
        this.spContainer.addChild(e);
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        t = ResourceUtils.createBitmapByName("option7Image");
        e.addChild(t);
        e.touchEnabled = !0;
        e.x = this.spContainer.width - .7 * e.width;
        e.y = .4 * -e.height;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePop, this);
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        this.spguanbg = ResourceUtils.createBitmapByName("option5Image");
        e.addChild(this.spguanbg);
        this.spkaibg = ResourceUtils.createBitmapByName("option6Image");
        e.addChild(this.spkaibg);
        this.spguanbg.x = 0;
        this.spkaibg.x = 30;
        e.x = 182;
        e.y = 84;
        e.touchEnabled = !0;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBgHandler, this);
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        this.spguan = ResourceUtils.createBitmapByName("option5Image");
        e.addChild(this.spguan);
        this.spkai = ResourceUtils.createBitmapByName("option6Image");
        e.addChild(this.spkai);
        this.spguan.x = 0;
        this.spkai.x = 30;
        e.x = 182;
        e.y = 148;
        e.touchEnabled = !0;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.spguanbg.visible = !1;
        this.spkaibg.visible = !0;
        this.spguan.visible = !1;
        this.spkai.visible = !0
    };
    t.prototype.onTouchThis = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation()
    };
    t.prototype.clickHandler = function (e) {
        GameData.closeMusic ? (this.spkai.visible = !0, this.spguan.visible = !1, GameData.closeMusic = !1) : (this.spkai.visible = !1, this.spguan.visible = !0, GameData.closeMusic = !0)
    };
    t.prototype.clickBgHandler = function (e) {
        GameData.closeBgMusic ? (this.spguanbg.visible = !1, this.spkaibg.visible = !0, GameData.closeBgMusic = !1) : (this.spguanbg.visible = !0, this.spkaibg.visible = !1, GameData.closeBgMusic = !0)
    };
    t.prototype.closePop = function (e) {
        this.parent && (GameData.isClickBtn = !1);
        this.visible = !1
    };
    t.prototype.removeAll = function () {
        this.removeChildren()
    };
    return t
}(egret.Sprite);
MusicView.prototype.__class__ = "MusicView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, OptionView = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = new egret.Sprite;
        this.addChild(e);
        var t = ResourceUtils.createBitmapByName("maskImage");
        e.addChild(t);
        e.touchEnabled = !0;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.spContainer = new egret.Sprite;
        this.addChild(this.spContainer);
        e = ResourceUtils.createBitmapByName("optionBgImage");
        this.spContainer.addChild(e);
        e = Const.SCENT_HEIGHT / 4;
        this.spContainer.x = Const.SCENT_WIDTH / 8;
        this.spContainer.y = e;
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        t = ResourceUtils.createBitmapByName("zhinanImage");
        e.addChild(t);
        e.x = this.spContainer.width / 2 - e.width / 2;
        e.y = 200;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHelp, this);
        e.touchEnabled = !0;
        this.helpSp = new egret.Sprite;
        this.addChild(this.helpSp);
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        t = ResourceUtils.createBitmapByName("option7Image");
        e.addChild(t);
        e.touchEnabled = !0;
        e.x = this.spContainer.width - .7 * e.width;
        e.y = .4 * -e.height;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePop, this);
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        this.spguanbg = ResourceUtils.createBitmapByName("option5Image");
        e.addChild(this.spguanbg);
        this.spkaibg = ResourceUtils.createBitmapByName("option6Image");
        e.addChild(this.spkaibg);
        this.spguanbg.x = 0;
        this.spkaibg.x = 30;
        e.x = 182;
        e.y = 84;
        e.touchEnabled = !0;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBgHandler, this);
        e = new egret.Sprite;
        this.spContainer.addChild(e);
        this.spguan = ResourceUtils.createBitmapByName("option5Image");
        e.addChild(this.spguan);
        this.spkai = ResourceUtils.createBitmapByName("option6Image");
        e.addChild(this.spkai);
        this.spguan.x = 0;
        this.spkai.x = 30;
        e.x = 182;
        e.y = 148;
        e.touchEnabled = !0;
        e.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.spguanbg.visible = !1;
        this.spkaibg.visible = !0;
        this.spguan.visible = !1;
        this.spkai.visible = !0
    };
    t.prototype.onClickHandler = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation()
    };
    t.prototype.touchHelp = function (e) {
        if (!1 == this.helpSp.visible) this.helpSp.visible = !0; else {
            e = ResourceUtils.createBitmapByName("gameinfoImage");
            e.width = Const.SCENT_WIDTH;
            e.height = Const.SCENT_HEIGHT;
            this.helpSp.addChild(e);
            e = new MyButton("closeGameBtnImage", "closeGameBtnImage");
            this.helpSp.addChild(e);
            var t = Const.SCENT_HEIGHT - e.height;
            e.x = Const.SCENT_WIDTH / 2 - e.width / 2;
            e.y = t;
            e.setClick(this.showStartView.bind(this))
        }
    };
    t.prototype.showStartView = function () {
        this.helpSp.visible = !1
    };
    t.prototype.clickHandler = function (e) {
        GameData.closeMusic ? (this.spkai.visible = !0, this.spguan.visible = !1, GameData.closeMusic = !1) : (this.spkai.visible = !1, this.spguan.visible = !0, GameData.closeMusic = !0)
    };
    t.prototype.clickBgHandler = function (e) {
        GameData.closeBgMusic ? (this.spguanbg.visible = !1, this.spkaibg.visible = !0, GameData.closeBgMusic = !1, SoundUtils.instance().playBg()) : (this.spguanbg.visible = !0, this.spkaibg.visible = !1, GameData.closeBgMusic = !0, SoundUtils.instance().stopBg())
    };
    t.prototype.closePop = function (e) {
        this.visible = !1;
        GameData.isStart && (GameData.isPause = !1)
    };
    return t
}(egret.Sprite);
OptionView.prototype.__class__ = "OptionView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, SpecialNumber = function (e) {
    function t(t) {
        e.call(this);
        this.charName = t
    }

    __extends(t, e);
    t.prototype.setValue = function (e) {
        this.removeChildren();
        if ("" != e && null != e) {
            e = (e + "").split("");
            for (var t = e.length, n = 0, r = 0; r < t; r++) {
                var i = e[r];
                "," == i && (i = "dot");
                "/" == i && (i = "gang");
                if ("number-" == this.charName) {
                    var s;
                    s = ResourceUtils.createBitmapFromSheet(this.charName + i, "sourceNum")
                } else "number-0" == this.charName && (s = ResourceUtils.createBitmapFromSheet(this.charName + i, "streakNum"));
                s && (s.x = n, n += s.width, this.addChild(s))
            }
        }
    };
    return t
}(egret.Sprite);
SpecialNumber.prototype.__class__ = "SpecialNumber";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GamePlayView = function (e) {
    function t() {
        e.call(this);
        this.sp = new egret.Sprite;
        this.sp.touchEnabled = !0;
        this.addChild(this.sp)
    }

    __extends(t, e);
    t.prototype.showGame = function (e) {
        GameData.isStartClickOption = !0;
        GameData.isStart = !1;
        var t = new egret.Sprite, n = ResourceUtils.createBitmapByName("optionBtnImage");
        t.addChild(n);
        t.touchEnabled = !0;
        t.x = Const.SCENT_WIDTH - t.width;
        t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showOptionView, this);
        this.sp.removeChildren();
        switch (e) {
            case 1:
                e = new GameFightOneView;
                this.sp.addChild(e);
                this.target = e;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_1_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 2:
                e = new GameFightTwoView;
                this.sp.addChild(e);
                this.target = e;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_2_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 3:
                e = new GameFightThreeView;
                this.sp.addChild(e);
                this.target = e;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_3_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 4:
                e = new GameFightFourView;
                this.sp.addChild(e);
                this.target = e;
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_4_Image");
                this.sp.addChild(this.thisContainer);
                break;
            case 5:
                e = new GameFightFiveView, this.sp.addChild(e), this.target = e, this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_5_Image"), this.sp.addChild(this.thisContainer)
        }
        this.addChild(t);
        this.optionView = new OptionView;
        this.addChild(this.optionView);
        this.optionView.visible = !1;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this)
    };
    t.prototype.startHandler = function (e) {
        !0 == this.optionView.visible || GameData.isClickBtn || (GameData.isStart = !0, this.sp.removeChild(this.thisContainer), this.sp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startHandler, this), this.thisContainer = null, this.sp.touchEnabled = !1, this.ready = StarlingSwfFactory.getInstance().makeMc("go"), this.ready.x = Const.SCENT_WIDTH / 2, this.ready.y = Const.SCENT_HEIGHT / 2, this.addChild(this.ready), this.ready.goToPlay("1"), SoundUtils.instance().playNum(), GameData.isStartClickOption = !1, this.ready.setCompleteAction(this.complete1, this))
    };
    t.prototype.showOptionView = function () {
        GameData.isStartClickOption && (this.optionView.visible = !0, GameData.isPause = !0)
    };
    t.prototype.complete1 = function () {
        this.ready.goToPlay("2");
        SoundUtils.instance().playGo();
        egret.setTimeout(this.complete2.bind(this), this, 300)
    };
    t.prototype.complete2 = function () {
        GameData.isStartClickOption = true;
        GameData.isStart = true;
        GameData.isPause = false;
        SoundUtils.instance().playBg();
        this.target.redGirl.run();
        this.removeChild(this.ready)
    };
    return t
}(egret.Sprite);
GamePlayView.prototype.__class__ = "GamePlayView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameStartView = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("bgImage");
        e.width = Const.SCENT_WIDTH;
        e.height = Const.SCENT_HEIGHT;
        this.addChild(e);
        e = new MyButtonForGame("startBtnImage", "startBtnImage");
        this.addChild(e);
        e.y = Const.SCENT_HEIGHT - e.height - 30;
        e.x = Const.SCENT_WIDTH / 2 - e.width / 2;
        e.setClick(this.onStartGameHandler.bind(this));
        var t = new MyButtonForGame("ddlogo", "ddlogo");
        this.addChild(t);
        t.scaleX = t.scaleY = .5;
        t.y = 15;
        t.x = 10;
        t.setClick(this.onClickMoreGame.bind(this));
        var n = new MyButtonForGame("musicBtnImage", "musicBtnImage");
        this.addChild(n);
        n.x = e.x + e.width + 10;
        n.y = e.y + 10;
        n.setClick(this.showGameSoundHandler.bind(this));
        n = new MyButtonForGame("helpBtnImage", "helpBtnImage");
        this.addChild(n);
        n.x = e.x - 10 - n.width;
        n.y = e.y + 10;
        n.setClick(this.showGameInfoHandler.bind(this));
        this.gameSoundPop = new MusicView;
        this.addChild(this.gameSoundPop);
        this.gameSoundPop.visible = !1
    };
    t.prototype.showGameSoundHandler = function (e) {
        this.gameSoundPop.visible = !0;
        GameData.isClickBtn = !0
    };
    t.prototype.showGameInfoHandler = function (e) {
        this.removeAll();
        e = new GameInfoView;
        this.addChild(e)
    };
    t.prototype.onStartGameHandler = function () {
        GameSceneView._gameScene.play();
        this.removeAll()
    };
    t.prototype.removeAll = function () {
        this.removeChildren();
        this.gameSoundPop = null
    };
    t.prototype.onClickMoreGame = function () {
        top.location.href = btGame.URL.getMoreGame()
    };
    return t
}(egret.Sprite);
GameStartView.prototype.__class__ = "GameStartView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, Hinder = function (e) {
    function t() {
        e.call(this)
    }

    __extends(t, e);
    t.prototype.initView = function (e, t) {
        var n;
        switch (e) {
            case 1:
                n = 1 == t ? ResourceUtils.createBitmapByName("wall1_1Image") : ResourceUtils.createBitmapByName("wall1_2Image");
                this.addChild(n);
                break;
            case 2:
                n = 1 == t ? ResourceUtils.createBitmapByName("wall2_1Image") : ResourceUtils.createBitmapByName("wall2_2Image");
                this.addChild(n);
                break;
            case 3:
                n = 1 == t ? ResourceUtils.createBitmapByName("wall3_1Image") : ResourceUtils.createBitmapByName("wall3_2Image");
                this.addChild(n);
                break;
            case 4:
                n = 1 == t ? ResourceUtils.createBitmapByName("wall4_1Image") : ResourceUtils.createBitmapByName("wall4_2Image");
                this.addChild(n);
                break;
            case 5:
                n = 1 == t ? ResourceUtils.createBitmapByName("wall5_1Image") : ResourceUtils.createBitmapByName("wall5_2Image"), this.addChild(n)
        }
    };
    return t
}(egret.Sprite);
Hinder.prototype.__class__ = "Hinder";
var ddTimer;
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameOverView = function (e) {
    function t() {
        e.call(this);
        this.tNum = this.ttNum = this.bianfuW = this.langW = this.huliW = this.t3Num = this.t2Num = this.t1Num = this.num = this.thisNum = 0;
        this.boo2 = this.boo3 = this.boo1 = !1;
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        this.thisContainer = new egret.Sprite;
        this.addChild(this.thisContainer);
        this.bg = ResourceUtils.createBitmapByName("overBgImage");
        this.thisContainer.addChild(this.bg);
        this.initEnemy(GameData.curScene);
        this.sorce = new SpecialNumber("number-0");
        this.thisContainer.addChild(this.sorce);
        this.sorce.setValue("0");
        this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2;
        this.sorce.y = Const.SCENT_HEIGHT / 6;
        egret.Ticker.getInstance().register(this.showSorce, this);
        this.tt = new egret.TextField;
        this.addChild(this.tt);
        var e = GameData.isWin ? Math.floor(15 * Math.random() + 80) : Math.floor(40 * Math.random() + 40);
        this.ttNum = e;
        this.tt.text = "超越了丛林中0%的小伙伴";
        this.tt.textColor = 0;
        this.tt.bold = !0;
        this.tt.size = 32;
        this.tt.x = this.thisContainer.width / 2 - this.tt.width / 2 - 10;
        this.tt.y = 505;
        this.spGengduo = new egret.Sprite;
        this.thisContainer.addChild(this.spGengduo);
        var t = ResourceUtils.createBitmapByName("btngengduoyouxi");
        this.spGengduo.addChild(t);
        this.spGengduo.touchEnabled = !0;
        this.spGengduo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        var n = new MyButtonForGame("ddlogo", "ddlogo");
        this.addChild(n);
        n.scaleX = n.scaleY = .5;
        n.y = Const.SCENT_HEIGHT - n.height / 2 - 10;
        n.x = Const.SCENT_WIDTH / 2 - n.width / 4 + 12;
        n.setClick(this.onClickMoreGame.bind(this));
        var r = GameData.sorce;
        clearTimeout(ddTimer);
        window.myScore = r;
        window.myLang = GameData.langNum + GameData.huliNum + GameData.bianfuNum;
        /*updateShare(GameData.langNum+GameData.huliNum+GameData.bianfuNum,r);Play68.setRankingLevelScoreDesc(GameData.langNum+GameData.huliNum+GameData.bianfuNum,r,Play68.rankingShowType.RANKING_SHOW);*/
        this.spZaiLai = new egret.Sprite;
        this.thisContainer.addChild(this.spZaiLai);
        e = ResourceUtils.createBitmapByName("btnzailaiyici");
        this.spZaiLai.addChild(e);
        this.spZaiLai.touchEnabled = !0;
        this.spZaiLai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        this.spFenXiang = new egret.Sprite;
        this.thisContainer.addChild(this.spFenXiang);
        e = ResourceUtils.createBitmapByName("btnfenxiang");
        this.spFenXiang.addChild(e);
        this.spFenXiang.touchEnabled = !0;
        this.spFenXiang.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            play68_submitScore(window.myLang, window.myScore)
        }, this);
        this.spGengduo.y = this.spFenXiang.y = this.spZaiLai.y = 600;
        this.spGengduo.x = 12;
        this.spZaiLai.x = 170;
        this.spFenXiang.x = 330;
        this.sp = new egret.Sprite;
        this.addChild(this.sp);
        e = ResourceUtils.createBitmapByName("shareImage");
        e.width = Const.SCENT_WIDTH;
        e.height = Const.SCENT_HEIGHT;
        this.sp.addChild(e);
        this.sp.visible = !1;
        this.sp.touchEnabled = !0;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShare, this);
        this.thisContainer.scaleX = this.thisContainer.scaleY = .9;
        this.thisContainer.x = Const.SCENT_WIDTH / 2 - this.thisContainer.width / 2 + 30;
        this.thisContainer.y = Const.SCENT_HEIGHT / 2 - this.thisContainer.height / 2 + 30
    };
    t.prototype.showSorce = function (e) {
        this.num++;
        this.thisNum < GameData.sorce && (this.thisNum += this.num, this.thisNum > GameData.sorce && (this.thisNum = GameData.sorce), this.sorce.setValue(this.thisNum + ""), this.sorce.x = Const.SCENT_WIDTH / 2 - this.sorce.width / 2);
        this.boo1 && this.t1Num < GameData.langNum && (this.t1Num += 3, this.t1Num > GameData.langNum && (this.t1Num = GameData.langNum), this.t1.setValue(this.t1Num + ""), this.t1.x = this.langW - this.t1.width / 2);
        this.boo2 && this.t2Num < GameData.huliNum && (this.t2Num += 3, this.t2Num > GameData.huliNum && (this.t2Num = GameData.huliNum), this.t2.setValue(this.t2Num + ""), this.t2.x = this.huliW - this.t2.width / 2);
        this.boo3 && this.t3Num < GameData.bianfuNum && (this.t3Num += 3, this.t3Num > GameData.bianfuNum && (this.t3Num = GameData.bianfuNum), this.t3.setValue(this.t3Num + ""), this.t3.x = this.bianfuW - this.t3.width / 2);
        this.tNum < this.ttNum && (this.tNum += 2, this.tNum > this.ttNum && (this.tNum = this.ttNum), this.tt.text = "超越了丛林中" + this.tNum + "%的小伙伴", this.tt.x = this.thisContainer.width / 2 - this.tt.width / 2 - 10)
    };
    t.prototype.onClickMoreGame = function (e) {
        top.location.href = btGame.URL.getMoreGame()
    };
    t.prototype.toShareView = function (e) {
        top.location.href = btGame.URL.getMoreGame()
    };
    t.prototype.toGengDuoView = function (e) {
        window.location.href = 'http://youxi.douhao.com'
    };
    t.prototype.toGameStartView = function (e) {
        GameData.curScene = 1;
        GameData.sorce = 0;
        GameData.isPause = !0;
        GameData.count = 0;
        GameData.profectNum = 0;
        GameData.stopCreateEnemy = 0;
        GameData.redGirlDistance = 0;
        GameData.blod = 5;
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        this.spFenXiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        this.spZaiLai.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
        GameSceneView._gameScene.start()
    };
    t.prototype.touchShare = function (e) {
        this.sp.visible = !1
    };
    t.prototype.initEnemy = function (e) {
        void 0 === e && (e = 0);
        if (1 == e || 2 == e) this.boo1 = !0, e = StarlingSwfFactory.getInstance().makeMc("lang"), this.thisContainer.addChild(e), e.goToPlay("run"), e.y = 340, e.x = 140 + e.width, this.langW = e.x, this.t1 = new SpecialNumber("number-"), this.thisContainer.addChild(this.t1), this.t1.setValue("0"), this.t1.x = e.x - this.t1.width / 2, this.t1.y = e.y + .6 * e.height - 20; else if (3 == e || 4 == e) {
            this.boo2 = this.boo1 = !0;
            e = StarlingSwfFactory.getInstance().makeMc("lang");
            var t = StarlingSwfFactory.getInstance().makeMc("huli");
            this.thisContainer.addChild(e);
            this.thisContainer.addChild(t);
            e.goToPlay("run");
            t.goToPlay("run");
            t.y = 320;
            e.y = 340;
            e.x = (220 + e.width) / 2;
            t.x = e.x + e.width + 60;
            this.langW = e.x;
            this.huliW = t.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue("0");
            this.t1.x = e.x - this.t1.width / 2;
            this.t1.y = e.y + .6 * e.height - 20;
            this.t2 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue("0");
            this.t2.x = t.x - this.t2.width / 2;
            this.t2.y = t.y + .6 * e.height
        } else if (5 == e || 6 == e) {
            this.boo3 = this.boo2 = this.boo1 = !0;
            e = StarlingSwfFactory.getInstance().makeMc("lang");
            var t = StarlingSwfFactory.getInstance().makeMc("huli"),
                n = StarlingSwfFactory.getInstance().makeMc("bianfu");
            this.thisContainer.addChild(e);
            this.thisContainer.addChild(t);
            this.thisContainer.addChild(n);
            e.goToPlay("run");
            t.goToPlay("run");
            n.goToPlay("run");
            t.y = 320;
            n.y = 335;
            e.y = 340;
            e.x = 90;
            t.x = e.x + e.width + 60;
            this.huliW = t.x;
            this.langW = e.x;
            n.x = t.x + t.width + 70;
            this.bianfuW = n.x;
            this.t1 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t1);
            this.t1.setValue("0");
            this.t1.x = e.x - this.t1.width / 2;
            this.t1.y = e.y + .6 * e.height - 20;
            this.t2 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t2);
            this.t2.setValue("0");
            this.t2.x = t.x - this.t2.width / 2;
            this.t2.y = t.y + .6 * e.height;
            this.t3 = new SpecialNumber("number-");
            this.thisContainer.addChild(this.t3);
            this.t3.setValue("0");
            this.t3.x = n.x - this.t3.width / 2;
            this.t3.y = n.y + .6 * e.height - 15
        }
    };
    return t
}(egret.Sprite);
GameOverView.prototype.__class__ = "GameOverView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, LoadingUI = function (e) {
    function t() {
        e.call(this);
        this.logoUrl = "resource/assets/ddlogo.png";
        this.bgUrl = "resource/assets/loading_bg.jpg";
        this.createView()
    }

    __extends(t, e);
    t.prototype.createView = function () {
        this.w = Const.SCENT_WIDTH;
        this.h = Const.SCENT_HEIGHT;
        this.textField = new egret.TextField;
        this.textField.y = 500;
        this.textField.textColor = 3355443;
        this.textField.size = 23;
        this.textField.width = this.w;
        this.textField.height = 100;
        this.textField.fontFamily = "Black";
        this.textField.textAlign = "center";
        var e = new egret.URLLoader;
        e.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        e.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        e.load(new egret.URLRequest(this.logoUrl));
        e = new egret.URLLoader;
        e.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        e.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        e.load(new egret.URLRequest(this.bgUrl));
        this.bg = new egret.Bitmap;
        this.logo = new egret.Bitmap;
        this.ddLogo = new egret.Bitmap;
        this.uiContainer = new egret.DisplayObjectContainer;
        this.addChild(this.uiContainer);
        this.addChild(this.logo);
        this.addChild(this.ddLogo);
        this.addChildAt(this.bg, 0);
        this.addChild(this.textField)
    };
    t.prototype.onComplete = function (e) {
        e = e.target;
        var t = e.data;
        if (e._request.url == this.bgUrl) {
            this.bg.texture = t, this.bg.scaleX = this.w / 640, this.bg.scaleY = this.h / 960
        } else if (e._request.url == this.logoUrl) {
            this.logo.texture = t, this.logo.anchorX = this.logo.anchorY = .5, this.logo.x = this.w / 2 + 10, this.logo.y = this.h / 2 - 60, this.logo.scaleX = this.logo.scaleY = this.h / 960, this.textField.y = this.logo.y + 100
        }
    };
    t.prototype.setProgress = function (e, t) {
        this.textField.text = "游戏加载中…" + Math.floor(e / t * 100) + "%"
    };
    t.prototype.onLoadComplete = function (e, t) {
        e.call(t)
    };
    return t
}(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GameSceneView = function (e) {
    function t() {
        e.call(this);
        t._gameScene = this;
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        this.thisContainer = new egret.Sprite;
        this.addChild(this.thisContainer);
        this.start()
    };
    t.prototype.start = function () {
        this.removeAll();
        var e = new GameStartView;
        this.thisContainer.addChild(e)
    };
    t.prototype.play = function () {
        this.removeAll();
        var e = new GamePlayView;
        this.thisContainer.addChild(e);
        e.showGame(GameData.curScene)
    };
    t.prototype.over = function () {
        this.removeAll();
        var e = new GameOverView;
        this.thisContainer.addChild(e)
    };
    t.prototype.removeAll = function () {
        this.thisContainer.removeChildren()
    };
    return t
}(egret.Sprite);
GameSceneView.prototype.__class__ = "GameSceneView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, BackGroundView = function (e) {
    function t(t) {
        e.call(this);
        this.initView(t)
    }

    __extends(t, e);
    t.prototype.initView = function (e) {
        var t = new Hinder, n = new Hinder;
        switch (e) {
            case 1:
                e = ResourceUtils.createBitmapByName("fight1BgImage");
                this.addChild(e);
                t.initView(1, 1);
                n.initView(1, 2);
                break;
            case 2:
                e = ResourceUtils.createBitmapByName("fight2BgImage");
                this.addChild(e);
                t.initView(2, 1);
                n.initView(2, 2);
                break;
            case 3:
                e = ResourceUtils.createBitmapByName("fight3BgImage");
                this.addChild(e);
                t.initView(3, 1);
                n.initView(3, 2);
                break;
            case 4:
                e = ResourceUtils.createBitmapByName("fight4BgImage");
                this.addChild(e);
                t.initView(4, 1);
                n.initView(4, 2);
                break;
            case 5:
                e = ResourceUtils.createBitmapByName("fight5BgImage"), this.addChild(e), t.initView(5, 1), n.initView(5, 2)
        }
        this.addChild(n);
        this.addChild(t);
        n.x = Const.SCENT_WIDTH - n.width
    };
    return t
}(egret.Sprite);
BackGroundView.prototype.__class__ = "BackGroundView";
var ShareUtils = function () {
    function e() {
    }

    e.moreGame = function () {
        if (e.isInU9()) location.href = "u9time://gamelist"; else {
            var t = e.findLocationProperty("app_id");
            window.open("http://games.egret-labs.org/more.php?app_id=" + t, "_self")
        }
    };
    e.shareToWeChat = function () {
        window.hasOwnProperty("location") && WeixinApi && WeixinApi.ready(function (t) {
            var n = new WeixinShareInfo;
            n.title = e.shareTitle;
            n.desc = e.shareDesc;
            n.link = window.location.href;
            n.imgUrl = e.IconPath;
            t.shareToFriend(n);
            t.shareToTimeline(n)
        })
    };
    e.isSetSwfFrame = function () {
        for (var e = 0, t = "", n = GameData.num.length; e < n; e++) t += GameData.num[e] + "";
        return t
    };
    e.shareOther = function () {
        window.hasOwnProperty("location") && WeixinApi.ready(function (t) {
            t = new WeixinShareInfo;
            t.title = e.shareTitle;
            t.desc = e.shareDesc;
            t.link = window.location.href;
            t.imgUrl = e.IconPath
        })
    };
    e.shareToU9 = function () {
        if (window.hasOwnProperty("location")) {
            var t = location.href, t = "" == location.search ? t + "?channel=weixin" : t + "&channel=weixin",
                t = encodeURIComponent(t), n = encodeURIComponent(e.shareDesc), r = e.getUid(),
                i = "u9time://share?uid=" + r + "&game_url=" + t + "&a=123&msg=" + n;
            r || (i = "u9time://share?&game_url=" + t + "&a=123&msg=" + n);
            location.href = i
        }
    };
    e.shareToBaidu = function () {
        BaiduAPI.setShareContent(e.shareTitle, e.shareDesc);
        BaiduAPI.showShareView()
    };
    e.setUserScore = function (t) {
        e.isInBaidu() && BaiduAPI.setUserScore(t)
    };
    e.rank = function () {
        e.isInBaidu() && BaiduAPI.showRankList()
    };
    e.setShareInfo = function (t, n) {
        e.shareTitle = t;
        e.shareDesc = n;
        e.isInWeChat() ? e.shareToWeChat() : e.shareOther()
    };
    e.isInWeChat = function () {
        return window.hasOwnProperty("navigator") ? -1 != window.navigator.userAgent.indexOf("MicroMessenger") : !1
    };
    e.isInU9 = function () {
        if (!window.hasOwnProperty("navigator")) return !1;
        var e = window.navigator.userAgent;
        return -1 != e.indexOf("EgretRuntime") && -1 != e.indexOf("yoyo")
    };
    e.isInBaidu = function () {
        return window.hasOwnProperty("location") ? -1 != location.href.indexOf("release_baidu") : !1
    };
    e.findLocationProperty = function (e) {
        if (!window.hasOwnProperty("location")) return null;
        var t = location.search;
        if ("" == t) return null;
        for (var t = t.slice(1), t = t.split("&"), n = t.length, r = 0; r < n; r++) {
            var i = t[r].split("=");
            if (i[0] == e) return i[1]
        }
        return null
    };
    e.getUid = function () {
        return e.findLocationProperty("uid")
    };
    e.onEnterGame = function () {
        if (!e.isInBaidu()) {
            var t = e.findLocationProperty("app_id"), n = e.findLocationProperty("game_id"),
                r = e.findLocationProperty("device_id");
            t && n && (r || (r = egret.localStorage.getItem("device_id")) || (r = Math.random()), egret.localStorage.setItem("device_id", r), t = "http://statistics.egret-labs.org/api.php?app_id=" + t + "&game_id=" + n + "&device_id=" + r, (n = e.findLocationProperty("channel")) && e.isInWeChat() && (t += "&channel=" + n), t && (new egret.URLLoader).load(new egret.URLRequest(t)))
        }
    };
    e.IconPath = "http://static.egret-labs.org/h5game/icons/10000062.jpg";
    e.shareSwfInfo = Const.setSwfArr.join("");
    return e
}();
ShareUtils.prototype.__class__ = "ShareUtils";
__extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
};
(function (e) {
    var t = function (e) {
        function t() {
            e.apply(this, arguments)
        }

        __extends(t, e);
        t.prototype.parseSpriteSheet = function (e, t) {
            var n = t.frames;
            if (n) {
                var r = new egret.SpriteSheet(e), i;
                for (i in n) {
                    var s = n[i];
                    r.createTexture(i, s.x, s.y, s.w, s.h, -s.offX, -s.offY)
                }
                return r
            }
        };
        return t
    }(RES.SheetAnalyzer);
    e.StarlingSwfSheetAnalyzer = t;
    t.prototype.__class__ = "starlingswf.StarlingSwfSheetAnalyzer"
})(starlingswf || (starlingswf = {}));
var StarlingswfMovieClip = function () {
    function e() {
    }

    e.swfFrame = egret.getDefinitionByName(SwfFrameInfo.swfNum);
    return e
}();
StarlingswfMovieClip.prototype.__class__ = "StarlingswfMovieClip";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, Main = function (e) {
    function t() {
        e.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        egret.Injector.mapClass(RES.AnalyzerBase, starlingswf.StarlingSwfSheetAnalyzer, "starlingswf_sheet")
    }

    __extends(t, e);
    t.prototype.onAddToStage = function (e) {
        egret.MainContext.runtimeType != egret.MainContext.RUNTIME_HTML5 || window.hasOwnProperty("EgretShare") ? EgretShare.setShareData("愤怒的小红帽", "是时候给灰狼哥来一发了! 要来么？不要掉队哟~", "http://static.egret-labs.org/h5game/62/v20/index.html", "http://static.egret-labs.org/h5game/icons/10000062.jpg") : document.addEventListener("EgretShareLoaded", function () {
            ih5game.setShare("desc", "愤怒的小红帽", "是时候给灰狼哥来一发了! 要来么？不要掉队哟~")
        });
        Const.SCENT_WIDTH = this.stage.stageWidth;
        Const.SCENT_HEIGHT = this.stage.stageHeight;
        this.swfFrame = StarlingswfMovieClip.swfFrame.href;
        this.loadingView = new LoadingUI;
        this.stage.addChild(this.loadingView);
        egret.MainContext.instance.touchContext.maxTouches = 4;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this), RES.loadConfig("resource/resource.json", "resource/")
    };
    t.prototype.onConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.createGroup("initLoad", ["preload", "bgPic", "animation", "sound"]);
        RES.loadGroup("initLoad")
    };
    t.prototype.onResourceLoadComplete = function (e) {
        if ("initLoad" == e.groupName) this.loadingView.onLoadComplete(this.onStartGame, this)
    };
    t.prototype.onResourceProgress = function (e) {
        "initLoad" == e.groupName && this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal)
    };
    t.prototype.onStartGame = function () {
        this.stage.removeChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.initAnimationData();
        this.createGameScene()
    };
    t.prototype.createGameScene = function () {
        Const.GamePoxY = 0;
        GameData.curScene = 1;
        var e = new egret.Rectangle;
        e.width = Const.SCENT_WIDTH;
        e.height = Const.SCENT_HEIGHT;
        e.y = Const.GamePoxY;
        SoundUtils.instance().initSound();
        this._scene = new GameSceneView;
        this._scene.y = Const.GamePoxY;
        this._scene.width = Const.SCENT_WIDTH;
        this._scene.height = Const.SCENT_HEIGHT;
        this._scene.mask = e;
        this.addChild(this._scene)
    };
    t.prototype.initAnimationData = function () {
        for (var e = "redNu promptPop lang go xiaohongmao daoju lieren huli bianfu niao".split(" "), t = 0, n = e.length; t < n; t++) {
            var r = e[t];
            StarlingSwfFactory.getInstance().addSwf(r, RES.getRes(r + "_swf"), RES.getRes(r))
        }
    };
    return t
}(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, BgView = function (e) {
    function t() {
        e.call(this);
        this.bg2Height = this.bg1Height = 0
    }

    __extends(t, e);
    t.prototype.initView = function (e) {
        this.bg2 = new BackGroundView(e);
        this.addChild(this.bg2);
        this.bg1 = new BackGroundView(e);
        this.addChild(this.bg1);
        this.bg1Height = this.bg1.height;
        this.bg1.y = -this.bg1Height + Const.SCENT_HEIGHT;
        this.bg2Height = this.bg2.height;
        this.bg2.y = this.bg1.y - this.bg2Height
    };
    t.prototype.updata = function () {
        this.bg1.y >= Const.SCENT_HEIGHT && (this.bg1.y = this.bg2.y - this.bg1Height);
        this.bg2.y >= Const.SCENT_HEIGHT && (this.bg2.y = this.bg1.y - this.bg2Height);
        this.bg1.y += GameData.bgSpeed;
        this.bg2.y += GameData.bgSpeed
    };
    t.prototype.dispose = function () {
        this.removeChildren();
        this.bg2 = this.bg1 = null
    };
    return t
}(egret.Sprite);
BgView.prototype.__class__ = "BgView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, BoldBar = function (e) {
    function t() {
        e.call(this);
        this.w = 0;
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("blodBarBgImage");
        this.addChild(e);
        e = ResourceUtils.createBitmapByName("blodBarImage");
        this.addChild(e);
        e.x = 38;
        e.y = 8;
        this.w = e.width;
        this.r = new egret.Rectangle;
        this.r.x = 0;
        this.r.y = 0;
        this.r.width = e.width;
        this.r.height = e.height;
        e.mask = this.r
    };
    t.prototype.scaleBlodX = function () {
        this.r.x = -(this.w - GameData.blod / 5 * this.w)
    };
    return t
}(egret.Sprite);
BoldBar.prototype.__class__ = "BoldBar";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, Bomb = function (e) {
    function t() {
        e.call(this);
        this.lastY = this.lastX = this.angle = this.speed = 0;
        this.sp = ResourceUtils.createBitmapByName("bombImage");
        this.addChild(this.sp);
        this.sp.x = this.sp.width / 2;
        this.sp.rotation = 90;
        this.speed = 30;
        egret.Ticker.getInstance().register(this.onFrame, this)
    }

    __extends(t, e);
    t.prototype.move = function () {
        this.angle = this.rotation = 180 * Math.atan2(this.lastY - this.y, this.lastX - this.x) / Math.PI
    };
    t.prototype.onFrame = function () {
        if (this.visible) {
            this.x += this.speed * Math.cos(this.angle / 180 * Math.PI);
            this.y += this.speed * Math.sin(this.angle / 180 * Math.PI);
            var e = Math.sqrt(Math.pow(this.x - this.lastX, 2) + Math.pow(this.y - this.lastY, 2));
            15 > e && (this.visible = !1)
        }
    };
    t.prototype.dispose = function () {
        egret.Ticker.getInstance().unregister(this.onFrame, this);
        this.removeChildren();
        this.sp = null
    };
    return t
}(egret.Sprite);
Bomb.prototype.__class__ = "Bomb";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, DaZhaoBar = function (e) {
    function t() {
        e.call(this);
        this.b = this.w = 0;
        this.rx = 1;
        this.boo = !1
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("dazhaoBarBg");
        this.addChild(e);
        var t = ResourceUtils.createBitmapByName("dazhaoImage");
        this.addChild(t);
        e.x = -2;
        e.y = 2;
        t.y = e.y + 2;
        this.w = t.width;
        this.r = new egret.Rectangle;
        this.b = t.x - t.width;
        this.r.x = this.b;
        this.r.y = 0;
        this.r.width = t.width;
        this.r.height = t.height;
        t.mask = this.r;
        egret.Ticker.getInstance().register(this.onFrameHandler, this)
    };
    t.prototype.onFrameHandler = function () {
        this.boo && (this.r.x = this.rx)
    };
    t.prototype.setValue = function () {
        this.boo || (GameData.profectNum > GameData.dazhaoTime && (GameData.profectNum = GameData.dazhaoTime), this.r.x = -(this.w - GameData.profectNum / GameData.dazhaoTime * this.w))
    };
    return t
}(egret.Sprite);
DaZhaoBar.prototype.__class__ = "DaZhaoBar";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, FightButton = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        this.button = StarlingSwfFactory.getInstance().makeMc("bazi");
        this.addChild(this.button);
        this.button.gotoAndStop(0)
    };
    t.prototype.goPlay = function (e) {
        this.button.gotoAndStop(e)
    };
    return t
}(egret.Sprite);
FightButton.prototype.__class__ = "FightButton";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, GirlDistanceBar = function (e) {
    function t() {
        e.call(this);
        this._heightBar = 0;
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("distanceBarImage");
        this.addChild(e);
        this.head = ResourceUtils.createBitmapByName("redGirlHeadImage");
        this.addChild(this.head);
        e.x = this.head.width / 2;
        this._heightBar = e.height;
        this.head.y = this._heightBar
    };
    t.prototype.moveHead = function (e, t) {
        void 0 === e && (e = 0);
        void 0 === t && (t = 0);
        this.head.y = this._heightBar - GameData.redGirlDistance / (e + t) * this._heightBar
    };
    return t
}(egret.Sprite);
GirlDistanceBar.prototype.__class__ = "GirlDistanceBar";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, House = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("houseImage");
        this.addChild(e)
    };
    return t
}(egret.Sprite);
House.prototype.__class__ = "House";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, Line = function (e) {
    function t() {
        e.call(this);
        this.boo = !1;
        this.sp = ResourceUtils.createBitmapByName("lineImage");
        this.addChild(this.sp);
        this.sp.x = this.sp.width / 2;
        egret.Ticker.getInstance().register(this.onFrame, this)
    }

    __extends(t, e);
    t.prototype.move = function () {
        this.boo = this.visible = !0
    };
    t.prototype.onFrame = function (e) {
        this.boo && (this.y += 3 * GameData.enemySpeed, this.y > Const.SCENT_HEIGHT && (this.boo = this.visible = !1))
    };
    return t
}(egret.Sprite);
Line.prototype.__class__ = "Line";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, RedGirl = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        this.girl = StarlingSwfFactory.getInstance().makeMc("xiaohongmao");
        this.addChild(this.girl);
        this.girl.gotoAndStop(0)
    };
    t.prototype.run = function () {
        this.girl.goToPlay("1")
    };
    t.prototype.gotoDie = function () {
        this.girl.goToPlay("2")
    };
    t.prototype.gotoWin = function () {
        this.girl.goToPlay("3")
    };
    t.prototype.dispose = function () {
        this.removeChildren()
    };
    return t
}(egret.Sprite);
RedGirl.prototype.__class__ = "RedGirl";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, SourceView = function (e) {
    function t() {
        e.call(this);
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("sorceMcImage");
        this.addChild(e);
        this.showSorce = new SpecialNumber("number-");
        this.showSorce.x = e.width + 10;
        this.addChild(this.showSorce)
    };
    t.prototype.setValue = function (e) {
        void 0 === e && (e = 0);
        this.showSorce.setValue(e + "")
    };
    return t
}(egret.Sprite);
SourceView.prototype.__class__ = "SourceView";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, StreakNum = function (e) {
    function t() {
        e.call(this);
        this.conboW = 0;
        this.initView()
    }

    __extends(t, e);
    t.prototype.initView = function () {
        var e = ResourceUtils.createBitmapByName("comboImage");
        this.addChild(e);
        this.conboW = e.width;
        this.showSorce = new SpecialNumber("number-0");
        this.showSorce.x = this.conboW / 2 - this.showSorce.width / 2;
        this.showSorce.y = e.height + 5;
        this.addChild(this.showSorce)
    };
    t.prototype.setValue = function (e) {
        void 0 === e && (e = 0);
        this.showSorce.x = this.conboW / 2 - this.showSorce.width / 2;
        this.showSorce.setValue(e + "")
    };
    return t
}(egret.Sprite);
StreakNum.prototype.__class__ = "StreakNum";
var GS = function () {
    function e() {
    }

    e.bb = 0x396ae77e3688a;
    return e
}();
GS.prototype.__class__ = "GS";
var __extends = this.__extends || function (e, t) {
    function n() {
        this.constructor = e
    }

    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    n.prototype = t.prototype;
    e.prototype = new n
}, PromptPop = function (e) {
    function t() {
        e.call(this);
        this.isHide = this.isAway = this.isInto = this.isShow = !1;
        this.tY = this.tX = this.stay = 0;
        this.config = {isHide: !0, stayTime: 800, tx: 0, ty: 0}
    }

    __extends(t, e);
    t.prototype.activate = function (e, t, n) {
        void 0 === e && (e = 0);
        void 0 === t && (t = 0);
        void 0 === n && (n = null);
        this.config.tx = e;
        this.config.ty = t;
        this.settings(n);
        this.targetMc = StarlingSwfFactory.getInstance().makeMc("tip");
        this.addChild(this.targetMc);
        this.targetMc.x = this.tX;
        this.targetMc.y = this.tY;
        this.targetMc.visible = !1
    };
    t.prototype.show = function (e, t) {
        void 0 === t && (t = null);
        null != this.targetMc && (t && (null != t.isHide && (this.isHide = t.isHide), null != t.stayTime && (this.stay = t.stayTime), null != t.tx && (this.tX = t.tx), null != t.ty && (this.tY = t.ty)), this.setMc(e), this.tweenStar())
    };
    t.prototype.tweenStar = function () {
        this.isShow = this.isInto = !0;
        this.isAway = !1;
        this.targetMc.x = this.tX;
        this.targetMc.y = this.tY;
        this.targetMc.alpha = 1;
        this.targetMc.visible = !0;
        this.tw = egret.Tween.get(this.targetMc).call(this.tweenStop, this);
        this.tw.to({y: this.tY - 200, alpha: 1}, 200)
    };
    t.prototype.tweenStop = function () {
        this.isInto = !1;
        this.isHide && (this.isAway = !0, this.tw = egret.Tween.get(this.targetMc).call(this.tweenOver, this), this.tw.to({
            alpha: 0,
            delay: 1,
            visible: !1
        }, this.stay));
        this.settings()
    };
    t.prototype.tweenOver = function () {
        this.isAway = this.isShow = !1
    };
    t.prototype.hide = function (e) {
        void 0 === e && (e = 0);
        this.isHide = !0;
        this.stay = e;
        this.tweenStop()
    };
    t.prototype.settings = function (e) {
        void 0 === e && (e = null);
        if (null != e) for (var t in this.config) this.config[t] = null != e[t] ? e[t] : this.config[t];
        this.isHide = this.config.isHide;
        this.stay = this.config.stayTime;
        this.tX = this.config.tx;
        this.tY = this.config.ty
    };
    t.prototype.setMc = function (e) {
        this.targetMc.goToPlay(e)
    };
    Object.defineProperty(t.prototype, "isSHOW", {
        get: function () {
            return this.isShow
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(t.prototype, "isINTO", {
        get: function () {
            return this.isInto
        }, enumerable: !0, configurable: !0
    });
    Object.defineProperty(t.prototype, "isAWAY", {
        get: function () {
            return this.isAway
        }, enumerable: !0, configurable: !0
    });
    t.prototype.removeAll = function () {
    };
    return t
}(egret.Sprite);
PromptPop.prototype.__class__ = "PromptPop"