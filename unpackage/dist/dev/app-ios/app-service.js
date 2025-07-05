(function(vue) {
  "use strict";
  function initRuntimeSocket(hosts, port, id) {
    if (hosts == "" || port == "" || id == "")
      return Promise.resolve(null);
    return hosts.split(",").reduce((promise, host) => {
      return promise.then((socket) => {
        if (socket != null)
          return Promise.resolve(socket);
        return tryConnectSocket(host, port, id);
      });
    }, Promise.resolve(null));
  }
  const SOCKET_TIMEOUT = 500;
  function tryConnectSocket(host, port, id) {
    return new Promise((resolve, reject) => {
      const socket = uni.connectSocket({
        url: "ws://".concat(host, ":").concat(port, "/").concat(id),
        fail() {
          resolve(null);
        }
      });
      const timer = setTimeout(() => {
        socket.close({
          code: 1006,
          reason: "connect timeout"
        });
        resolve(null);
      }, SOCKET_TIMEOUT);
      socket.onOpen((e) => {
        clearTimeout(timer);
        resolve(socket);
      });
      socket.onClose((e) => {
        clearTimeout(timer);
        resolve(null);
      });
      socket.onError((e) => {
        clearTimeout(timer);
        resolve(null);
      });
    });
  }
  function initRuntimeSocketService() {
    const hosts = "127.0.0.1,192.168.3.34";
    const port = "8090";
    const id = "app-ios_GeQhkk";
    let socketTask = null;
    __registerWebViewUniConsole(() => {
      return '!function(){"use strict";"function"==typeof SuppressedError&&SuppressedError;var e=["log","warn","error","info","debug"],n=e.reduce((function(e,n){return e[n]=console[n].bind(console),e}),{}),t=null,r=new Set,o={};function i(e){if(null!=t){var n=e.map((function(e){if("string"==typeof e)return e;var n=e&&"promise"in e&&"reason"in e,t=n?"UnhandledPromiseRejection: ":"";if(n&&(e=e.reason),e instanceof Error&&e.stack)return e.message&&!e.stack.includes(e.message)?"".concat(t).concat(e.message,"\\n").concat(e.stack):"".concat(t).concat(e.stack);if("object"==typeof e&&null!==e)try{return t+JSON.stringify(e)}catch(e){return t+String(e)}return t+String(e)})).filter(Boolean);n.length>0&&t(JSON.stringify(Object.assign({type:"error",data:n},o)))}else e.forEach((function(e){r.add(e)}))}function a(e,n){try{return{type:e,args:u(n)}}catch(e){}return{type:e,args:[]}}function u(e){return e.map((function(e){return c(e)}))}function c(e,n){if(void 0===n&&(n=0),n>=7)return{type:"object",value:"[Maximum depth reached]"};switch(typeof e){case"string":return{type:"string",value:e};case"number":return function(e){return{type:"number",value:String(e)}}(e);case"boolean":return function(e){return{type:"boolean",value:String(e)}}(e);case"object":try{return function(e,n){if(null===e)return{type:"null"};if(function(e){return e.$&&s(e.$)}(e))return function(e,n){return{type:"object",className:"ComponentPublicInstance",value:{properties:Object.entries(e.$.type).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(s(e))return function(e,n){return{type:"object",className:"ComponentInternalInstance",value:{properties:Object.entries(e.type).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return e.style&&null!=e.tagName&&null!=e.nodeName}(e))return function(e,n){return{type:"object",value:{properties:Object.entries(e).filter((function(e){var n=e[0];return["id","tagName","nodeName","dataset","offsetTop","offsetLeft","style"].includes(n)})).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(function(e){return"function"==typeof e.getPropertyValue&&"function"==typeof e.setProperty&&e.$styles}(e))return function(e,n){return{type:"object",value:{properties:Object.entries(e.$styles).map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n);if(Array.isArray(e))return{type:"object",subType:"array",value:{properties:e.map((function(e,t){return function(e,n,t){var r=c(e,t);return r.name="".concat(n),r}(e,t,n+1)}))}};if(e instanceof Set)return{type:"object",subType:"set",className:"Set",description:"Set(".concat(e.size,")"),value:{entries:Array.from(e).map((function(e){return function(e,n){return{value:c(e,n)}}(e,n+1)}))}};if(e instanceof Map)return{type:"object",subType:"map",className:"Map",description:"Map(".concat(e.size,")"),value:{entries:Array.from(e.entries()).map((function(e){return function(e,n){return{key:c(e[0],n),value:c(e[1],n)}}(e,n+1)}))}};if(e instanceof Promise)return{type:"object",subType:"promise",value:{properties:[]}};if(e instanceof RegExp)return{type:"object",subType:"regexp",value:String(e),className:"Regexp"};if(e instanceof Date)return{type:"object",subType:"date",value:String(e),className:"Date"};if(e instanceof Error)return{type:"object",subType:"error",value:e.message||String(e),className:e.name||"Error"};var t=void 0,r=e.constructor;r&&r.get$UTSMetadata$&&(t=r.get$UTSMetadata$().name);var o=Object.entries(e);(function(e){return e.modifier&&e.modifier._attribute&&e.nodeContent})(e)&&(o=o.filter((function(e){var n=e[0];return"modifier"!==n&&"nodeContent"!==n})));return{type:"object",className:t,value:{properties:o.map((function(e){return f(e[0],e[1],n+1)}))}}}(e,n)}catch(e){return{type:"object",value:{properties:[]}}}case"undefined":return{type:"undefined"};case"function":return function(e){return{type:"function",value:"function ".concat(e.name,"() {}")}}(e);case"symbol":return function(e){return{type:"symbol",value:e.description}}(e);case"bigint":return function(e){return{type:"bigint",value:String(e)}}(e)}}function s(e){return e.type&&null!=e.uid&&e.appContext}function f(e,n,t){var r=c(n,t);return r.name=e,r}var l=null,p=[],y={},g="---BEGIN:EXCEPTION---",d="---END:EXCEPTION---";function v(e){null!=l?l(JSON.stringify(Object.assign({type:"console",data:e},y))):p.push.apply(p,e)}var m=/^\\s*at\\s+[\\w/./-]+:\\d+$/;function b(){function t(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=function(e,n,t){if(t||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))}([],t,!0);if(o.length){var u=o[o.length-1];"string"==typeof u&&m.test(u)&&o.pop()}if(n[e].apply(n,o),"error"===e&&1===t.length){var c=t[0];if("string"==typeof c&&c.startsWith(g)){var s=g.length,f=c.length-d.length;return void i([c.slice(s,f)])}if(c instanceof Error)return void i([c])}v([a(e,t)])}}return function(){var e=console.log,n=Symbol();try{console.log=n}catch(e){return!1}var t=console.log===n;return console.log=e,t}()?(e.forEach((function(e){console[e]=t(e)})),function(){e.forEach((function(e){console[e]=n[e]}))}):function(){}}function _(e){var n={type:"WEB_INVOKE_APPSERVICE",args:{data:{name:"console",arg:e}}};return window.__uniapp_x_postMessageToService?window.__uniapp_x_postMessageToService(n):window.__uniapp_x_.postMessageToService(JSON.stringify(n))}!function(){if(!window.__UNI_CONSOLE_WEBVIEW__){window.__UNI_CONSOLE_WEBVIEW__=!0;var e="[web-view]".concat(window.__UNI_PAGE_ROUTE__?"[".concat(window.__UNI_PAGE_ROUTE__,"]"):"");b(),function(e,n){if(void 0===n&&(n={}),l=e,Object.assign(y,n),null!=e&&p.length>0){var t=p.slice();p.length=0,v(t)}}((function(e){_(e)}),{channel:e}),function(e,n){if(void 0===n&&(n={}),t=e,Object.assign(o,n),null!=e&&r.size>0){var a=Array.from(r);r.clear(),i(a)}}((function(e){_(e)}),{channel:e}),window.addEventListener("error",(function(e){i([e.error])})),window.addEventListener("unhandledrejection",(function(e){i([e])}))}}()}();';
    }, (data) => {
      socketTask === null || socketTask === void 0 ? void 0 : socketTask.send({
        data
      });
    });
    return Promise.resolve().then(() => {
      return initRuntimeSocket(hosts, port, id).then((socket) => {
        if (socket == null) {
          return false;
        }
        socketTask = socket;
        return true;
      });
    }).catch(() => {
      return false;
    });
  }
  initRuntimeSocketService();
  const forward = "/static/video/forward.png";
  const errIcon = "/static/video/error.png";
  const transfer = "/static/video/transfer.png";
  const replayIcon = "/static/video/replay.png";
  const playIcon = "/static/video/play.png";
  const pauseIcon = "/static/video/pause.png";
  const addIcon = "/static/tabbar/add.png";
  const videoSrc$1 = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "index",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const deviceTitle = vue.ref("设备名称");
      const videoRef = vue.ref(null);
      const addDevices = () => {
        uni.showToast({
          title: "添加",
          icon: "none"
        });
      };
      const replay = () => {
        uni.showToast({
          title: "重播",
          icon: "none"
        });
        videoRef.value.play();
        uni.createVideoContext("myVideo").play();
      };
      const transferClick = () => {
        uni.showToast({
          title: "传输",
          icon: "none"
        });
      };
      const errClick = () => {
        uni.showToast({
          title: "警报",
          icon: "none"
        });
      };
      const toDeviceDetail = () => {
        uni.showToast({
          title: "设备详情",
          icon: "none"
        });
      };
      const pauseClick = () => {
        videoRef.value.pause();
        uni.createVideoContext("myVideo").pause();
        uni.showToast({
          title: "暂停",
          icon: "none"
        });
      };
      const vedioClick = () => {
        uni.showToast({
          title: "播放",
          icon: "none"
        });
      };
      const clickVdedio = () => {
        uni.showToast({
          title: "sss",
          icon: "none"
        });
      };
      const __returned__ = { deviceTitle, forward, errIcon, transfer, replayIcon, playIcon, pauseIcon, addIcon, videoSrc: videoSrc$1, videoRef, addDevices, replay, transferClick, errClick, toDeviceDetail, pauseClick, vedioClick, clickVdedio };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$9 = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column" } }, "content": { ".container ": { "position": "relative", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "width": "100%", "height": "400rpx", "overflow": "hidden" } }, "video-container": { ".container .content ": { "width": "100%", "height": "100%" } }, "video": { ".container .content ": { "width": "100%", "height": "100%", "objectFit": "cover", "marginBottom": 0 } }, "video-top-title": { ".container .content ": { "position": "absolute", "top": 0, "height": "60rpx", "width": "80%", "paddingTop": "15rpx", "paddingRight": 0, "paddingBottom": 0, "paddingLeft": "20rpx", "backgroundImage": "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor": "rgba(0,0,0,0)", "zIndex": 3 } }, "video-right-control": { ".container .content ": { "position": "absolute", "top": 0, "right": "10rpx", "display": "flex", "flexDirection": "column", "justifyContent": "space-around", "height": "100%", "alignItems": "center", "zIndex": 2 } }, "vedio-control": { ".container .content .video-right-control ": { "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" }, ".container .content .video-bottom-control ": { "marginTop": 0, "marginRight": "auto", "marginBottom": 0, "marginLeft": "auto", "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" } }, "vedio-control-icon": { ".container .content .video-right-control .vedio-control ": { "width": "100%", "height": "100%" }, ".container .content .video-bottom-control .vedio-control ": { "width": "100%", "height": "100%" } }, "video-bottom-control": { ".container .content ": { "position": "absolute", "bottom": "10rpx", "left": 0, "width": "100%", "height": "50rpx", "zIndex": 1 } } };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", {
          class: "video-container",
          style: { "border-radius": "15rpx", "overflow": "hidden" }
        }, [
          vue.createElementVNode("video", {
            class: "video",
            id: "myVideo",
            title: $setup.deviceTitle,
            src: $setup.videoSrc,
            ref: "videoRef",
            controls: true,
            "show-play-btn": true,
            "show-center-play-btn": true,
            "enable-progress-gesture": true,
            "show-fullscreen-btn": true,
            "show-mute-btn": true,
            onClick: $setup.clickVdedio
          }, null, 8, ["title"])
        ]),
        vue.createElementVNode(
          "view",
          null,
          vue.toDisplayString($setup.deviceTitle),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "video-right-control" }, [
          vue.createElementVNode("view", { class: "vedio-control" }, [
            vue.createElementVNode("image", {
              class: "vedio-control-icon",
              src: $setup.forward,
              onClick: $setup.toDeviceDetail
            })
          ]),
          vue.createElementVNode("view", { class: "vedio-control" }, [
            vue.createElementVNode("image", {
              class: "vedio-control-icon",
              src: $setup.errIcon,
              onClick: $setup.errClick
            })
          ]),
          vue.createElementVNode("view", { class: "vedio-control" }, [
            vue.createElementVNode("image", {
              class: "vedio-control-icon",
              src: $setup.transfer,
              onClick: $setup.transferClick
            })
          ]),
          vue.createElementVNode("view", { class: "vedio-control" }, [
            vue.createElementVNode("image", {
              class: "vedio-control-icon",
              src: $setup.replayIcon,
              onClick: $setup.replay
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "video-bottom-control" }, [
          vue.createElementVNode("view", { class: "vedio-control" }, [
            vue.createElementVNode("image", {
              class: "vedio-control-icon",
              onClick: $setup.pauseClick,
              src: $setup.pauseIcon
            })
          ])
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["styles", [_style_0$9]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/index/index.uvue"]]);
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  class ArrowIcon {
    constructor(x, y, size, type, color) {
      this.x = 0;
      this.y = 0;
      this.size = 0;
      this.type = "";
      this.color = "";
      this.x = x;
      this.y = y;
      this.size = size;
      this.type = type;
      this.color = color;
    }
    draw(ctx) {
      const _a = this, x = _a.x, y = _a.y, size = _a.size, color = _a.color, type = _a.type;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      if (type === "left") {
        ctx.moveTo(x + size * 0.6042, y + size * 0.25);
        ctx.lineTo(x + size * 0.3542, y + size * 0.5);
        ctx.lineTo(x + size * 0.6042, y + size * 0.75);
      } else if (type === "right") {
        ctx.moveTo(x + size * (1 - 0.6042), y + size * 0.25);
        ctx.lineTo(x + size * (1 - 0.3542), y + size * 0.5);
        ctx.lineTo(x + size * (1 - 0.6042), y + size * 0.75);
      }
      ctx.stroke();
    }
    isCoordinateInside(x, y) {
      return x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size;
    }
  }
  class Day {
    constructor(day, month, year, isCurrentMonth, isToday, isBeforeToday, calendar) {
      this.day = 0;
      this.month = 0;
      this.year = 0;
      this.fullDay = "00";
      this.fullMonth = "00";
      this.fullDate = "";
      this.isBeforeToday = false;
      this.isToday = false;
      this.isCurrentMonth = false;
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      this.originalMonth = 0;
      this.type = "current";
      this.fontSize = 20;
      this.timestamp = 0;
      this.day = day;
      this.month = month;
      this.year = year;
      this.originalMonth = month - 1;
      this.fullMonth = this.formatMonth(month);
      this.fullDay = this.formatDay(day);
      this.fullDate = "".concat(year, "-").concat(this.fullMonth, "-").concat(this.fullDay);
      this.isCurrentMonth = isCurrentMonth;
      this.isBeforeToday = isBeforeToday;
      this.isToday = isToday;
      this.calendar = calendar;
      this.timestamp = new Date(year, month - 1, day).getTime();
    }
    formatDay(day) {
      return "".concat(day).padStart(2, "0");
    }
    formatMonth(month) {
      return "".concat(month).padStart(2, "0");
    }
    isCoordinateInside(x, y) {
      return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
    setDimensions(width, height) {
      this.width = width;
      this.height = height;
    }
    get opt() {
      return this.calendar.opt;
    }
    get selectDate() {
      return this.calendar.selectDate;
    }
    set selectDate(_val = null) {
    }
    get canSupplement() {
      return this.opt.canSupplement && this.isBeforeToday && !this.isCheckedIn;
    }
    set canSupplement(_v) {
    }
    get isCheckedIn() {
      return this.calendar.signedDates.includes(this.timestamp);
    }
    set isCheckedIn(_v) {
    }
    drawCircle(ctx, x, y, radius, color, border = false) {
      ctx.beginPath();
      if (border) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
      }
      ctx.fillStyle = color;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      if (border) {
        ctx.stroke();
      }
    }
    draw(ctx) {
      const size = Math.min(this.width, this.height) * 0.9;
      const centerX = this.x + this.width / 2;
      const centerY = this.y + this.height / 2;
      const color = this.opt.color;
      const unsignedColor = this.opt.unsignedColor;
      const selectedDayBgColor = this.opt.selectedDayBgColor;
      const textColor = this.opt.textColor;
      const disabledColor = this.opt.disabledColor;
      const dayFontSize = this.opt.dayFontSize;
      ctx.textAlign = "center";
      ctx.font = this.isToday ? "".concat(dayFontSize - 2, "px Arial") : "".concat(dayFontSize, "px Arial");
      ctx.textBaseline = "middle";
      const isSelectedDate = this.selectDate == null || this.selectDate == this;
      let txtColor = this.type == "current" ? textColor : disabledColor;
      if (this.isToday && !isSelectedDate) {
        txtColor = color;
      }
      if (this.selectDate != null && this.selectDate == this) {
        ctx.beginPath();
        ctx.fillStyle = selectedDayBgColor;
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (this.isToday && isSelectedDate) {
        this.drawCircle(ctx, centerX, centerY, size / 2, color);
        txtColor = "white";
      }
      if (this.type == "current" && (this.isCheckedIn || this.canSupplement)) {
        this.drawCircle(ctx, centerX, centerY + this.fontSize * 0.9, 4, this.isCheckedIn ? this.isToday && isSelectedDate ? "white" : color : unsignedColor);
      }
      ctx.fillStyle = txtColor;
      ctx.fillText(this.isToday ? "今天" : this.fullDay, centerX, centerY);
    }
  }
  class Calendar {
    constructor() {
      var _a;
      this.year = 0;
      this.month = 0;
      this.el = null;
      this.ctx = null;
      this.init = false;
      this.today = 0;
      this.currentMonth = 0;
      this.currentYear = 0;
      this.week = [];
      this.selectDate = null;
      this.containerHeight = 0;
      this.containerWidth = 0;
      this.arrowIcons = [];
      this.opt = {
        canSupplement: false,
        isFullCalendar: true,
        yearMonth: "",
        signedDates: [],
        week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        weekStartsOn: 0,
        weekColor: "#BDC0C3",
        weekFontSize: 12,
        weekHeight: 40,
        selectedDayBgColor: "rgba(0,0,0,0.06)",
        dayFontSize: 12,
        textColor: "#1A1F24",
        disabledColor: "#BDC0C3",
        monthTitleHeight: 50,
        monthTitleFontSize: 20,
        color: "#3B87F6",
        unsignedColor: "#F1A33A"
      };
      const date = /* @__PURE__ */ new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.today = date.getDate();
      this.monthDateCache = /* @__PURE__ */ new Map();
      this.week = (_a = this.opt.week) !== null && _a !== void 0 ? _a : [];
    }
    get signedDates() {
      if (this.opt.signedDates == null)
        return [];
      const values = [];
      this.opt.signedDates.forEach((item) => {
        const _a = __read(item.split("-").map((v) => {
          return parseInt(v);
        }), 3), year = _a[0], month = _a[1], day = _a[2];
        const time = new Date(year, month - 1, day).getTime();
        if (!values.includes(time)) {
          values.push(time);
        }
      });
      return values;
    }
    get checkinDays() {
      if (this.signedDates.length == 0)
        return 0;
      const sortedDates = this.signedDates.sort((a, b) => {
        return b - a;
      });
      return this.calculateContinuousCheckinDays(sortedDates);
    }
    calculateContinuousCheckinDays(sortedDates) {
      const dayInMillis = 24 * 60 * 60 * 1e3;
      const todayTime = new Date(this.currentYear, this.currentMonth - 1, this.today).getTime();
      let streak = 0;
      for (let i = 0; i < sortedDates.length; i++) {
        if (i == 0) {
          if (todayTime - sortedDates[i] > dayInMillis) {
            break;
          }
          if (sortedDates[i] == todayTime || todayTime - sortedDates[i] == dayInMillis) {
            streak = 1;
          }
        } else {
          if (sortedDates[i - 1] - sortedDates[i] == dayInMillis) {
            streak++;
          } else {
            break;
          }
        }
      }
      return streak;
    }
    setCanvas(el = null) {
      var _a, _b;
      if (el == null)
        return null;
      this.el = el;
      this.containerHeight = 6 * ((_a = this.opt.dayHeight) !== null && _a !== void 0 ? _a : 0) + this.opt.weekHeight + this.opt.monthTitleHeight;
      this.containerWidth = this.el.offsetWidth;
      this.el.style.setProperty("height", this.containerHeight + "px");
      this.ctx = el.getContext("2d");
      const dpr = (_b = uni.getDeviceInfo().devicePixelRatio) !== null && _b !== void 0 ? _b : 1;
      this.el.width = this.containerWidth * dpr;
      this.el.height = this.containerHeight * dpr;
      this.ctx.scale(dpr, dpr);
    }
    setOptions(opt) {
      let datechange = false;
      let weekStartsOn = -1;
      for (let key in opt) {
        const value = opt[key];
        if (key == "yearMonth" && value != null && value != this.opt.yearMonth) {
          datechange = true;
        }
        if (key == "weekStartsOn" && value != null && value != this.opt.weekStartsOn) {
          weekStartsOn = value;
        }
        if (value != null) {
          this.opt[key] = value;
        }
      }
      if (weekStartsOn != -1) {
        const normalWeek = [...this.opt.week];
        const sIndex = weekStartsOn < 0 ? 0 : weekStartsOn >= normalWeek.length ? normalWeek.length - 1 : weekStartsOn;
        normalWeek.unshift(...normalWeek.slice(-sIndex));
        normalWeek.length = 6;
        this.week = normalWeek;
      }
      if (this.opt.yearMonth != "" && !this.init || datechange) {
        const arr = this.opt.yearMonth.split("-");
        this.year = parseInt(arr[0]);
        this.month = parseInt(arr[1]);
        this.init = true;
      }
    }
    /** 获取当月共多少天，也就是获取月的最后一天 */
    getMonthDayLength(year, month) {
      return new Date(year, month, 0).getDate();
    }
    // 获取当月第一天星期几
    getFirstDayOfWeek(year, month, day = 1) {
      return new Date(year, month - 1, day).getDay();
    }
    // 获取加/减一个月的日期
    getOperateMonthDate(nowYear, nowMonth, num) {
      let month = nowMonth + num;
      let year = nowYear;
      if (month > 12) {
        month = 1;
        year++;
      } else if (month < 1) {
        month = 12;
        year--;
      }
      return {
        month,
        year
      };
    }
    generateMonthDateCache(year = this.year, month = this.month) {
      const key = "".concat(year, "-").concat(month);
      if (this.monthDateCache.has(key)) {
        return UTS.mapGet(this.monthDateCache, key);
      }
      const arr = [];
      const days = this.getMonthDayLength(year, month);
      const firstday = this.getFirstDayOfWeek(year, month);
      const beforeEmptyLength = (firstday + this.opt.weekStartsOn) % 7;
      const afterEmptyLength = 5 * 7 - beforeEmptyLength - days;
      const last = this.getOperateMonthDate(year, month, -1);
      const lastMonthEndDay = this.getMonthDayLength(last.year, last.month);
      const next = this.getOperateMonthDate(year, month, 1);
      const today = new Date(this.currentYear, this.currentMonth - 1, this.today).getTime();
      let index = 0;
      const getGridSize = (i2) => {
        var _a, _b;
        const rect = (_a = this.el) === null || _a === void 0 ? null : _a.getBoundingClientRect();
        const height = (_b = this.opt.dayHeight) !== null && _b !== void 0 ? _b : 0;
        const width = rect == null ? 0 : rect.width / 7;
        const row = Math.floor(i2 / 7);
        const col = i2 % 7;
        const x = col * width;
        const y = row * height + this.opt.monthTitleHeight + this.opt.weekHeight;
        return {
          x,
          y,
          width,
          height
          // 使用正确的变量名height
        };
      };
      for (var i = 0; i < beforeEmptyLength; i++) {
        const _a = getGridSize(index), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        const date = lastMonthEndDay - beforeEmptyLength + i + 1;
        const time = new Date(last.year, last.month - 1, date).getTime();
        const day = new Day(date, last.month, last.year, last.year == this.currentYear && last.month == this.currentMonth, time == today, time < today, this);
        day.type = "last";
        day.setPosition(x, y);
        day.setDimensions(width, height);
        arr.push(day);
        index++;
      }
      for (var i = 0; i < days; i++) {
        const _b = getGridSize(index), x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        const date = i + 1;
        const time = new Date(year, month - 1, date).getTime();
        const day = new Day(date, month, year, year == this.currentYear && month == this.currentMonth, time == today, time < today, this);
        day.setPosition(x, y);
        day.setDimensions(width, height);
        arr.push(day);
        index++;
      }
      for (var i = 0; i < afterEmptyLength; i++) {
        const _c = getGridSize(index), x = _c.x, y = _c.y, width = _c.width, height = _c.height;
        const date = i + 1;
        const time = new Date(next.year, next.month - 1, date).getTime();
        const day = new Day(date, next.month, next.year, next.year == this.currentYear && next.month == this.currentMonth, time == today, time < today, this);
        day.type = "next";
        day.setPosition(x, y);
        day.setDimensions(width, height);
        arr.push(day);
        index++;
      }
      const monthData = {
        year,
        month,
        days: arr
      };
      this.monthDateCache.set(key, monthData);
      return monthData;
    }
    next() {
      const _a = this.getOperateMonthDate(this.year, this.month, 1), year = _a.year, month = _a.month;
      const canSwitchToNextMonth = this.currentYear > year || this.currentYear == year && month - this.currentMonth <= 1;
      if (canSwitchToNextMonth) {
        this.year = year;
        this.month = month;
        this.render(year, month);
      } else {
        uni.showToast({
          icon: "error",
          title: "往后最多查看一个月"
        });
      }
    }
    last() {
      const _a = this.getOperateMonthDate(this.year, this.month, -1), year = _a.year, month = _a.month;
      this.year = year;
      this.month = month;
      this.render(year, month);
    }
    /**
    * 前往某一天
    * @param {string} date 格式 YYYY-MM-DD
    */
    goToDate(date = null) {
      if (date == null) {
        this.render(this.currentYear, this.currentMonth, this.today);
      } else {
        try {
          const _a = __read(date.split("-").map((item) => {
            return parseInt(item);
          }), 3), year = _a[0], month = _a[1], day = _a[2];
          this.render(year, month, day);
        } catch (e) {
          throw new Error("参数有误");
        }
      }
    }
    drawIcon(ctx, size, x, y, arrow, color) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      if (arrow === "left") {
        ctx.moveTo(x + size * 0.6042, y + size * 0.25);
        ctx.lineTo(x + size * 0.3542, y + size * 0.5);
        ctx.lineTo(x + size * 0.6042, y + size * 0.75);
      } else if (arrow === "right") {
        ctx.moveTo(x + size * (1 - 0.6042), y + size * 0.25);
        ctx.lineTo(x + size * (1 - 0.3542), y + size * 0.5);
        ctx.lineTo(x + size * (1 - 0.6042), y + size * 0.75);
      }
      ctx.stroke();
    }
    drawHead(monthData) {
      const width = this.containerWidth;
      if (this.ctx == null)
        return null;
      const ctx = this.ctx;
      const height = this.opt.monthTitleHeight;
      ctx.textAlign = "center";
      ctx.fillStyle = this.opt.textColor;
      ctx.font = " ".concat(this.opt.monthTitleFontSize, "px sans-serif");
      ctx.textBaseline = "middle";
      ctx.fillText("".concat(monthData.year, "年") + "".concat(monthData.month).padStart(2, "0") + "月", width * 0.5, height * 0.55);
      if (this.arrowIcons.length == 0) {
        const offsetTop = (height - 30) / 2;
        this.arrowIcons.push(new ArrowIcon(0, offsetTop, 30, "left", "#A0A5AA"));
        this.arrowIcons.push(new ArrowIcon(width - 30, offsetTop, 30, "right", "#A0A5AA"));
      }
      this.arrowIcons.forEach((icon) => {
        icon.draw(ctx);
      });
    }
    drawWeek() {
      if (this.ctx == null)
        return null;
      const ctx = this.ctx;
      ctx.textAlign = "center";
      ctx.font = "".concat(this.opt.weekFontSize, "px Arial");
      ctx.textBaseline = "middle";
      ctx.fillStyle = this.opt.weekColor;
      this.week.forEach((week, index) => {
        ctx.fillText("".concat(week), this.containerWidth / 7 * (index + 0.5), this.opt.monthTitleHeight + this.opt.weekHeight * 0.5);
      });
    }
    render(year = this.year, month = this.month, day = null) {
      const monthData = this.generateMonthDateCache(year, month);
      if (day != null) {
        this.selectDate = UTS.arrayFind(monthData.days, (item) => {
          return item.day == day;
        });
      }
      if (this.el != null && this.ctx != null) {
        this.ctx.clearRect(0, 0, this.containerWidth, this.containerHeight);
        this.drawHead(monthData);
        this.drawWeek();
        monthData.days.forEach((day2) => {
          day2.draw(this.ctx);
        });
      }
      return null;
    }
    touch(e) {
      var _a, _b, _c, _d;
      if (this.el == null)
        return null;
      const rect = this.el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const icon = UTS.arrayFind(this.arrowIcons, (icon2) => {
        return icon2.isCoordinateInside(x, y);
      });
      if (icon != null) {
        if (icon.type == "left") {
          this.last();
        } else {
          this.next();
        }
        (_b = (_a = this.opt).panelChange) === null || _b === void 0 ? null : _b.call(_a, {
          year: this.year,
          month: this.month
        });
        return null;
      }
      const month = UTS.mapGet(this.monthDateCache, "".concat(this.year, "-").concat(this.month));
      if (month == null)
        return null;
      const day = UTS.arrayFind(month.days, (day2) => {
        return day2.isCoordinateInside(x, y);
      });
      if (day != null && day.type == "current") {
        this.selectDate = day;
        this.render();
        (_d = (_c = this.opt).select) === null || _d === void 0 ? null : _d.call(_c, day);
      }
    }
  }
  function isString(str) {
    return typeof str == "string";
  }
  function isNumber$1(value) {
    return ["Int8", "UInt8", "Int16", "UInt16", "Int32", "UInt32", "Int64", "UInt64", "Int", "UInt", "Float", "Float16", "Float32", "Float64", "Double", "number"].includes(typeof value);
  }
  function isNumeric(value) {
    if (value == null) {
      return false;
    }
    if (isNumber$1(value)) {
      return true;
    } else if (isString(value)) {
      const regex = new RegExp("^(-)?\\d+(\\.\\d+)?$");
      return regex.test(value);
    }
    return false;
  }
  function unitConvert(value, base = 0) {
    if (isNumber$1(value)) {
      return value;
    }
    if (isNumeric(value)) {
      return parseFloat(value);
    }
    if (isString(value)) {
      const reg = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g;
      const results = reg.exec(value);
      if (results == null) {
        return 0;
      }
      const unit = results[3];
      const _value = parseFloat(value);
      if (unit == "rpx") {
        return uni.rpx2px(_value);
      }
      if (unit == "px") {
        return _value;
      }
      if (unit == "%") {
        return _value / 100 * base;
      }
    }
    return 0;
  }
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "l-daily-punch",
    props: {
      canSupplement: new UTSJSONObject({
        type: Boolean,
        default: true
      }),
      isFullCalendar: new UTSJSONObject({
        type: Boolean,
        default: true
      }),
      yearMonth: new UTSJSONObject({
        type: String,
        default: () => {
          const date = /* @__PURE__ */ new Date();
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          return "".concat(year, "-").concat(month);
        }
      }),
      signedDates: new UTSJSONObject({
        type: Array,
        default: () => {
          return [];
        },
        validator: (value) => {
          return value.every((date) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(date);
          });
        }
      }),
      dayHeight: new UTSJSONObject({
        type: [String, Number],
        default: 76
      }),
      week: new UTSJSONObject({
        type: Array,
        default: () => {
          return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        }
      }),
      weekStartsOn: new UTSJSONObject({
        type: Number,
        default: 6,
        validator: (value) => {
          return value <= 6;
        }
      }),
      weekColor: new UTSJSONObject({
        type: String,
        default: "#BDC0C3"
      }),
      weekFontSize: new UTSJSONObject({
        type: Number,
        default: 14
      }),
      weekHeight: new UTSJSONObject({
        type: Number,
        default: 30
      }),
      selectedDayBgColor: new UTSJSONObject({
        type: String,
        default: "rgba(0,0,0,0.06)"
      }),
      dayFontSize: new UTSJSONObject({
        type: Number,
        default: 16
      }),
      textColor: new UTSJSONObject({
        type: String,
        default: "#1A1F24"
      }),
      disabledColor: new UTSJSONObject({
        type: String,
        default: "#BDC0C3"
      }),
      monthTitleHeight: new UTSJSONObject({
        type: Number,
        default: 50
      }),
      monthTitleFontSize: new UTSJSONObject({
        type: Number,
        default: 20
      }),
      color: new UTSJSONObject({
        type: String,
        default: "#3B87F6"
      }),
      unsignedColor: new UTSJSONObject({
        type: String,
        default: "#F1A33A"
      })
    },
    emits: ["select", "panelChange", "streak"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emits = __emit;
      const props = __props;
      let drawRef = vue.ref(null);
      let calender = null;
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        style.set("height", "".concat(6 * unitConvert(props.dayHeight) + props.weekHeight + props.monthTitleHeight, "px"));
        return style;
      });
      const onClick = (e) => {
        calender === null || calender === void 0 ? null : calender.touch(e);
      };
      const setOpt = () => {
        const opt = {
          canSupplement: props.canSupplement,
          isFullCalendar: props.isFullCalendar,
          yearMonth: props.yearMonth,
          signedDates: [...props.signedDates],
          dayHeight: unitConvert(props.dayHeight),
          week: props.week,
          weekStartsOn: props.weekStartsOn,
          weekColor: props.weekColor,
          weekFontSize: props.weekFontSize,
          weekHeight: props.weekHeight,
          selectedDayBgColor: props.selectedDayBgColor,
          dayFontSize: props.dayFontSize,
          textColor: props.textColor,
          disabledColor: props.disabledColor,
          monthTitleHeight: props.monthTitleHeight,
          monthTitleFontSize: props.monthTitleFontSize,
          color: props.color,
          unsignedColor: props.unsignedColor,
          select: (e) => {
            emits("select", e);
          },
          panelChange: (e) => {
            emits("panelChange", e);
          }
        };
        if (calender == null)
          return null;
        calender.setOptions(opt);
      };
      vue.watchEffect(() => {
        setOpt();
        if (calender == null)
          return null;
        calender.render();
        emits("streak", calender.checkinDays);
      });
      const instance = vue.getCurrentInstance().proxy;
      const dailyRef = vue.ref(null);
      vue.onMounted(() => {
        vue.nextTick(() => {
          calender = new Calendar();
          setOpt();
          calender.setCanvas(dailyRef.value);
          calender.render();
          emits("streak", calender.checkinDays);
        });
      });
      const __returned__ = { emits, props, get drawRef() {
        return drawRef;
      }, set drawRef(v) {
        drawRef = v;
      }, get calender() {
        return calender;
      }, set calender(v = null) {
        calender = v;
      }, styles, onClick, setOpt, instance, dailyRef };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$8 = { "l-daily-punch": { "": { "width": "100%" } }, "calender": { "": { "marginTop": 0, "marginRight": "30rpx", "marginBottom": 0, "marginLeft": "30rpx" } } };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "calender" }, [
      vue.createElementVNode(
        "canvas",
        {
          ref: "dailyRef",
          id: "l-daily-punch",
          class: "l-daily-punch",
          style: vue.normalizeStyle([$setup.styles]),
          onClick: $setup.onClick
        },
        null,
        4
        /* STYLE */
      )
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["styles", [_style_0$8]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.uvue"]]);
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  class DayutsConfig extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            date: { type: "Any", optional: true },
            format: { type: String, optional: true },
            locale: { type: String, optional: true }
          };
        },
        name: "DayutsConfig"
      };
    }
    constructor(options, metadata = DayutsConfig.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.date = this.__props__.date;
      this.format = this.__props__.format;
      this.locale = this.__props__.locale;
      delete this.__props__;
    }
  }
  class DayutsFormats extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            LT: { type: String, optional: false },
            LTS: { type: String, optional: false },
            L: { type: String, optional: false },
            LL: { type: String, optional: false },
            LLL: { type: String, optional: false },
            LLLL: { type: String, optional: false },
            l: { type: String, optional: false },
            ll: { type: String, optional: false },
            lll: { type: String, optional: false },
            llll: { type: String, optional: false }
          };
        },
        name: "DayutsFormats"
      };
    }
    constructor(options, metadata = DayutsFormats.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.LT = this.__props__.LT;
      this.LTS = this.__props__.LTS;
      this.L = this.__props__.L;
      this.LL = this.__props__.LL;
      this.LLL = this.__props__.LLL;
      this.LLLL = this.__props__.LLLL;
      this.l = this.__props__.l;
      this.ll = this.__props__.ll;
      this.lll = this.__props__.lll;
      this.llll = this.__props__.llll;
      delete this.__props__;
    }
  }
  class DayutsRelativeTime extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            future: { type: String, optional: false },
            past: { type: String, optional: false },
            s: { type: String, optional: false },
            m: { type: String, optional: false },
            mm: { type: String, optional: false },
            h: { type: String, optional: false },
            hh: { type: String, optional: false },
            d: { type: String, optional: false },
            dd: { type: String, optional: false },
            M: { type: String, optional: false },
            MM: { type: String, optional: false },
            y: { type: String, optional: false },
            yy: { type: String, optional: false }
          };
        },
        name: "DayutsRelativeTime"
      };
    }
    constructor(options, metadata = DayutsRelativeTime.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.future = this.__props__.future;
      this.past = this.__props__.past;
      this.s = this.__props__.s;
      this.m = this.__props__.m;
      this.mm = this.__props__.mm;
      this.h = this.__props__.h;
      this.hh = this.__props__.hh;
      this.d = this.__props__.d;
      this.dd = this.__props__.dd;
      this.M = this.__props__.M;
      this.MM = this.__props__.MM;
      this.y = this.__props__.y;
      this.yy = this.__props__.yy;
      delete this.__props__;
    }
  }
  let DayutsLocale$1 = class DayutsLocale2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            weekdays: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
            weekdaysShort: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
            weekdaysMin: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
            months: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
            monthsShort: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
            ordinal: { type: "Unknown", optional: false },
            weekStart: { type: Number, optional: true },
            yearStart: { type: Number, optional: true },
            formats: { type: DayutsFormats, optional: true },
            relativeTime: { type: DayutsRelativeTime, optional: true },
            meridiem: { type: "Unknown", optional: true }
          };
        },
        name: "DayutsLocale"
      };
    }
    constructor(options, metadata = DayutsLocale2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.weekdays = this.__props__.weekdays;
      this.weekdaysShort = this.__props__.weekdaysShort;
      this.weekdaysMin = this.__props__.weekdaysMin;
      this.months = this.__props__.months;
      this.monthsShort = this.__props__.monthsShort;
      this.ordinal = this.__props__.ordinal;
      this.weekStart = this.__props__.weekStart;
      this.yearStart = this.__props__.yearStart;
      this.formats = this.__props__.formats;
      this.relativeTime = this.__props__.relativeTime;
      this.meridiem = this.__props__.meridiem;
      delete this.__props__;
    }
  };
  class DayutsObject extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            years: { type: Number, optional: false },
            months: { type: Number, optional: false },
            date: { type: Number, optional: false },
            hours: { type: Number, optional: false },
            minutes: { type: Number, optional: false },
            seconds: { type: Number, optional: false },
            milliseconds: { type: Number, optional: false }
          };
        },
        name: "DayutsObject"
      };
    }
    constructor(options, metadata = DayutsObject.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.years = this.__props__.years;
      this.months = this.__props__.months;
      this.date = this.__props__.date;
      this.hours = this.__props__.hours;
      this.minutes = this.__props__.minutes;
      this.seconds = this.__props__.seconds;
      this.milliseconds = this.__props__.milliseconds;
      delete this.__props__;
    }
  }
  const SECONDS_A_MINUTE = 60;
  const SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
  const SECONDS_A_DAY = SECONDS_A_HOUR * 24;
  const SECONDS_A_WEEK = SECONDS_A_DAY * 7;
  const MILLISECONDS_A_SECOND = 1e3;
  const MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
  const MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
  const MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
  const MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
  const MS = "millisecond";
  const S = "second";
  const MIN = "minute";
  const H = "hour";
  const D = "day";
  const W = "week";
  const M = "month";
  const Q = "quarter";
  const Y = "year";
  const DATE = "date";
  const FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
  const INVALID_DATE_STRING = "Invalid Date";
  const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
  const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
  function padStart(string, length, pad) {
    const str = string;
    if (str.length >= length)
      return str;
    return str.padStart(length, pad);
  }
  function padZoneStr(instance) {
    const negMinutes = -instance.utcOffset();
    const minutes = Math.abs(negMinutes);
    const hourOffset = Math.floor(minutes / 60);
    const minuteOffset = minutes % 60;
    return "".concat(negMinutes <= 0 ? "+" : "-").concat(padStart(hourOffset.toString(), 2, "0"), ":").concat(padStart(minuteOffset.toString(), 2, "0"));
  }
  function isNumber(value) {
    return ["Int8", "UInt8", "Int16", "UInt16", "Int32", "UInt32", "Int64", "UInt64", "Int", "UInt", "Float", "Float16", "Float32", "Float64", "Double", "number"].includes(typeof value);
  }
  function prettyUnit(u) {
    var _a;
    const special = /* @__PURE__ */ new Map([
      ["M", M],
      ["y", Y],
      ["w", W],
      ["d", D],
      ["D", DATE],
      ["h", H],
      ["m", MIN],
      ["s", S],
      ["ms", MS],
      ["Q", Q]
    ]);
    return (_a = special.get(u)) !== null && _a !== void 0 ? _a : "".concat(u).toLowerCase().replace(/s$/, "");
  }
  function monthDiff(a, b) {
    if (a.date() < b.date())
      return -monthDiff(b, a);
    const wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
    const anchor = a.clone().add(wholeMonthDiff, M).valueOf();
    const c = b.valueOf() - anchor < 0;
    const anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M).valueOf();
    const decimalMonthDiff = (b.valueOf() - anchor) / (c ? anchor - anchor2 : anchor2 - anchor);
    const result = wholeMonthDiff + decimalMonthDiff;
    const negatedResult = -result;
    const absResult = +negatedResult;
    const finalResult = !isNaN(absResult) ? absResult : 0;
    return finalResult;
  }
  function absFloor(n) {
    return n < 0 ? Math.max(Math.ceil(n), 0) : Math.floor(n);
  }
  const en = {
    name: "en",
    /**
     * 星期名称数组。
     */
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    /**
     * 月份名称数组。
     */
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    },
    /**
     * 序数函数，用于将数字转换为带有序数后缀的字符串。
     *
     * @param {number} n - 要转换的数字。
     * @returns {string} 带有序数后缀的字符串。
     */
    ordinal: (n, _) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      const i = (v - 20) % 10;
      const k = i < s.length ? i : v < s.length ? v : 0;
      return "[".concat(n).concat(s[k], "]");
    }
  };
  const locale = {
    name: "zh-cn",
    weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    weekdaysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    weekdaysMin: ["日", "一", "二", "三", "四", "五", "六"],
    months: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    monthsShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    ordinal: (number, period) => {
      if (period == "W") {
        return "".concat(number, "周");
      }
      return "".concat(number, "日");
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY/MM/DD",
      LL: "YYYY年M月D日",
      LLL: "YYYY年M月D日Ah点mm分",
      LLLL: "YYYY年M月D日ddddAh点mm分",
      l: "YYYY/M/D",
      ll: "YYYY年M月D日",
      lll: "YYYY年M月D日 HH:mm",
      llll: "YYYY年M月D日dddd HH:mm"
    },
    relativeTime: {
      future: "%s内",
      past: "%s前",
      s: "几秒",
      m: "1 分钟",
      mm: "%d 分钟",
      h: "1 小时",
      hh: "%d 小时",
      d: "1 天",
      dd: "%d 天",
      M: "1 个月",
      MM: "%d 个月",
      y: "1 年",
      yy: "%d 年"
    },
    meridiem: (hour, minute, _) => {
      const hm = hour * 100 + minute;
      if (hm < 600) {
        return "凌晨";
      } else if (hm < 900) {
        return "早上";
      } else if (hm < 1100) {
        return "上午";
      } else if (hm < 1300) {
        return "中午";
      } else if (hm < 1800) {
        return "下午";
      }
      return "晚上";
    }
  };
  const localesMap = /* @__PURE__ */ new Map();
  let localeState = vue.reactive({
    lang: "en",
    locales: localesMap
  });
  localeState.locales.set("en", en);
  localeState.locales.set("zh-cn", locale);
  class DayutsIntl {
    constructor() {
    }
    use(locale2) {
      localeState.locales.set(locale2.name, locale2);
      return this;
    }
    set locale(locale2) {
      if (localeState.locales.has(locale2)) {
        localeState.lang = locale2;
      } else {
        let list = [];
        localeState.locales.forEach(function(_, key) {
          list.push(key);
        });
        uni.__log__("warn", "at uni_modules/lime-dayuts/common/use.ts:46", '未知语言: "'.concat(locale2, '". 请使用以下已知语言之一:').concat(list.join(", ")));
      }
    }
    get locale() {
      return localeState.lang;
    }
    set(name, locale2) {
      localeState.locales.set(name, locale2);
    }
    has(name) {
      return localeState.locales.has(name);
    }
  }
  const dayutsIntl = new DayutsIntl();
  function parseLocale(preset, object = null, isLocal = false) {
    let l = null;
    if (preset == null)
      return dayutsIntl.locale;
    if (typeof preset == "string") {
      const presetLower = preset.toLowerCase();
      if (dayutsIntl.has(presetLower)) {
        l = presetLower;
      }
      if (object != null) {
        dayutsIntl.set(presetLower, object);
        l = presetLower;
      }
      const presetSplit = preset.split("-");
      if (l == null && presetSplit.length > 1) {
        return parseLocale(presetSplit[0]);
      }
    } else if (preset instanceof DayutsLocale) {
      dayutsIntl.set(preset.name, preset);
      l = preset.name;
    }
    if (!isLocal && l != null) {
      dayutsIntl.locale = l;
    }
    return l !== null && l !== void 0 ? l : dayutsIntl.locale;
  }
  function tryParseNumberAtIndex(digits, index) {
    if (index >= 0 && index < digits.length) {
      if (digits[index] == null)
        return null;
      const parsedNumber = isNumber(digits[index]) ? digits[index] : parseInt("".concat(digits[index]), 10);
      if (!isNaN(parsedNumber)) {
        return parsedNumber;
      }
    }
    return null;
  }
  function createDateFromArray(d, offset = 0) {
    var _a, _b, _c, _e, _f, _g, _h;
    const year = (_a = tryParseNumberAtIndex(d, 1 - offset)) !== null && _a !== void 0 ? _a : (/* @__PURE__ */ new Date()).getFullYear();
    const month = ((_b = tryParseNumberAtIndex(d, 2 - offset)) !== null && _b !== void 0 ? _b : 1) - 1;
    const day = (_c = tryParseNumberAtIndex(d, 3 - offset)) !== null && _c !== void 0 ? _c : 1;
    const hour = (_e = tryParseNumberAtIndex(d, 4 - offset)) !== null && _e !== void 0 ? _e : 0;
    const minute = (_f = tryParseNumberAtIndex(d, 5 - offset)) !== null && _f !== void 0 ? _f : 0;
    const second = (_g = tryParseNumberAtIndex(d, 6 - offset)) !== null && _g !== void 0 ? _g : 0;
    const millisecond = ((_h = tryParseNumberAtIndex(d, 7 - offset)) !== null && _h !== void 0 ? _h : 0).toString().substring(0, 3);
    return new Date(year, month, day, hour, minute, second, parseInt(millisecond));
  }
  function parseDate(cfg) {
    const date = cfg.date;
    if (date == null)
      return /* @__PURE__ */ new Date();
    if (date instanceof Date)
      return date;
    try {
      if (typeof date == "string" && /^\d+$/.test(date)) {
        return new Date(parseInt("".concat(date).padEnd(13, "0")));
      }
      if (typeof date == "string" && !/Z$/i.test(date)) {
        const d = date.match(REGEX_PARSE);
        const isNull = d == null || Array.isArray(d) && d.length == 0;
        if (!isNull) {
          return createDateFromArray(d);
        }
      }
      if (typeof date == "string")
        return new Date(date);
      if (Array.isArray(date)) {
        return createDateFromArray(date, 1);
      }
      if (isNumber(date))
        return new Date(date);
      return null;
    } catch (err) {
      return null;
    }
  }
  function wrapper(date, instance) {
    return dayuts(date, instance.$L);
  }
  class Dayuts {
    constructor(cfg) {
      var _a;
      this.valid = true;
      this.$d = /* @__PURE__ */ new Date();
      this.$y = 0;
      this.$M = 0;
      this.$D = 0;
      this.$W = 0;
      this.$H = 0;
      this.$m = 0;
      this.$s = 0;
      this.$ms = 0;
      this.$u = false;
      this.$L = (_a = parseLocale(cfg.locale)) !== null && _a !== void 0 ? _a : dayutsIntl.locale;
      this.parse(cfg);
    }
    parse(cfg) {
      const _d = parseDate(cfg);
      if (_d != null) {
        this.$d = parseDate(cfg);
        this.init();
      } else {
        this.valid = false;
      }
    }
    init() {
      const $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
    }
    /**
     * 检查日期对象是否有效。
     *
     * @returns {boolean} 如果日期对象有效，则返回true；否则返回false。
     */
    isValid() {
      return this.valid;
    }
    isSame(input, units = "millisecond") {
      const other = input instanceof Dayuts ? input : dayuts(input);
      const date1 = this.startOf(units).valueOf();
      const date2 = other.valueOf();
      const date3 = this.endOf(units).valueOf();
      return date1 <= date2 && date2 <= date3;
    }
    isAfter(input, units = "millisecond") {
      const other = input instanceof Dayuts ? input : dayuts(input);
      const date1 = other.valueOf();
      const date2 = this.startOf(units).valueOf();
      return date1 < date2;
    }
    isBefore(input, units = "millisecond") {
      const other = input instanceof Dayuts ? input : dayuts(input);
      const date1 = other.valueOf();
      const date2 = this.endOf(units).valueOf();
      return date2 < date1;
    }
    isSameOrBefore(input, units = "millisecond") {
      return this.isSame(input, units) || this.isBefore(input, units);
    }
    isSameOrAfter(input, units = "millisecond") {
      return this.isSame(input, units) || this.isAfter(input, units);
    }
    /**
     * 判断当前Dayuts对象是否在给定的两个时间之间
     * @param {any} input - 第一个时间输入
     * @param {any} input2 - 第二个时间输入
     * @param {DayutsUnit} units - 指定的时间单位
     * @param {string} interval - 区间符号，表示区间的开闭性，默认为'()'，表示开区间
     * @returns {boolean} - 如果当前Dayuts对象在给定的两个时间之间，则返回true，否则返回false
     */
    isBetween(input, input2, units = "millisecond", interval = "()") {
      const dA = dayuts(input);
      const dB = dayuts(input2);
      const dAi = interval.startsWith("(");
      const dBi = interval.endsWith(")");
      return (dAi ? this.isAfter(dA, units) : !this.isBefore(dA, units)) && (dBi ? this.isBefore(dB, units) : !this.isAfter(dB, units)) || (dAi ? this.isBefore(dA, units) : !this.isAfter(dA, units)) && (dBi ? this.isAfter(dB, units) : !this.isBefore(dB, units));
    }
    /**
     * 判断当前Dayuts对象所在的年份是否为闰年
     * @returns {boolean} - 如果当前Dayuts对象所在的年份是闰年，则返回true，否则返回false
     */
    isLeapYear() {
      return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
    }
    isToday() {
      const comparisonTemplate = "YYYY-MM-DD";
      const now = dayuts();
      return this.format(comparisonTemplate) == now.format(comparisonTemplate);
    }
    /**
     * 获取当前 `dayuts` 对象的 Unix 时间戳（以秒为单位）。
     *
     * @returns {number} 返回当前 `dayuts` 对象的 Unix 时间戳（以秒为单位）。
     */
    unix() {
      return Math.floor(this.valueOf() / 1e3);
    }
    /**
     * 将当前日期设置为指定时间单位的开始或结束。
     *
     * @param {string} units - 时间单位，例如'year'、'month'、'day'等。
     * @param {boolean} startOf - 如果为true，则设置为开始；如果为false，则设置为结束。
     * @returns {Dayuts} 返回一个新的Dayuts对象，表示调整后的日期。
     */
    startOf(units, startOf = true) {
      var _a;
      const isStartOf = startOf;
      const unit = prettyUnit(units);
      const instanceFactory = (d, m) => {
        const ins = dayuts(new Date(this.$y, m, d));
        return isStartOf ? ins : ins.endOf(D);
      };
      const instanceFactorySet = (method, slice) => {
        const argumentStart = [0, 0, 0, 0];
        const argumentEnd = [23, 59, 59, 999];
        const args = (isStartOf ? argumentStart : argumentEnd).slice(slice);
        const date = this.toDate();
        if (method == "setHours") {
          date.setHours(args[0]);
          date.setMinutes(args[1]);
          date.setSeconds(args[2]);
          date.setMilliseconds(args[3]);
        } else if (method == "setMinutes") {
          date.setMinutes(args[0]);
          date.setSeconds(args[1]);
          date.setMilliseconds(args[2]);
        } else if (method == "setSeconds") {
          date.setSeconds(args[0]);
          date.setMilliseconds(args[1]);
        } else if (method == "setMilliseconds") {
          date.setMilliseconds(args[0]);
        }
        return dayuts(date);
      };
      const _b = this, $W = _b.$W, $M = _b.$M, $D = _b.$D;
      const utcPad = "set".concat(this.$u ? "UTC" : "");
      if (unit == Y) {
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      } else if (unit == M) {
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      } else if (unit == W) {
        const weekStart = (_a = this.$locale().weekStart) !== null && _a !== void 0 ? _a : 0;
        const gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      } else if (unit == D || unit == DATE) {
        return instanceFactorySet("".concat(utcPad, "Hours"), 0);
      } else if (unit == H) {
        return instanceFactorySet("".concat(utcPad, "Minutes"), 1);
      } else if (unit == MIN) {
        return instanceFactorySet("".concat(utcPad, "Seconds"), 2);
      } else if (unit == S) {
        return instanceFactorySet("".concat(utcPad, "Milliseconds"), 3);
      } else {
        return this.clone();
      }
    }
    /**
     * 将当前日期设置为指定时间单位的结束。
     *
     * @param {string} arg - 时间单位，例如'year'、'month'、'day'等。
     * @returns {Dayuts} 返回一个新的Dayuts对象，表示调整后的日期。
     */
    endOf(units) {
      return this.startOf(units, false);
    }
    /**
     * 设置指定的时间单位的值。
     *
     * @param {string} units - 要设置的时间单位（如 "year"、"month"、"day" 等）。
     * @param {number} int - 要设置的值。
     * @returns {Dayuts} 返回当前对象。
     */
    $set(units, int) {
      const unit = prettyUnit(units);
      const arg = unit == D ? this.$D + (int - this.$W) : int;
      const setDateUnit = (date, unit2, arg2) => {
        if (unit2 == D || unit2 == DATE) {
          date.$d.setDate(arg2);
        } else if (unit2 == M) {
          date.$d.setMonth(arg2);
        } else if (unit2 == Y) {
          date.$d.setFullYear(arg2);
        } else if (unit2 == H) {
          date.$d.setHours(arg2);
        } else if (unit2 == MIN) {
          date.$d.setMinutes(arg2);
        } else if (unit2 == S) {
          date.$d.setSeconds(arg2);
        } else if (unit2 == MS) {
          date.$d.setMilliseconds(arg2);
        }
      };
      if (unit == M || unit == Y) {
        const date = this.clone().set(DATE, 1);
        setDateUnit(date, unit, arg);
        date.init();
        this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
      } else {
        setDateUnit(this, unit, arg);
      }
      this.init();
      return this;
    }
    /**
     * 创建一个当前对象的副本，并设置指定的时间单位的值。
     *
     * @param {string} string - 要设置的时间单位（如 "year"、"month"、"day" 等）。
     * @param {number} int - 要设置的值。
     * @returns {Dayuts} 返回一个新的 `dayuts` 对象，其值为当前对象的副本，并设置了指定的时间单位的值。
     */
    set(string, int) {
      return this.clone().$set(string, int);
    }
    /**
     * 获取当前 `dayuts` 对象的指定时间单位的值。
     *
     * @param {string} units - 要获取的时间单位（如 "year"、"month"、"day" 等）。
     * @returns {number} 返回当前 `dayuts` 对象的指定时间单位的值。
     */
    get(units) {
      const unit = prettyUnit(units);
      if (unit == D) {
        return this.day();
      } else if (unit == DATE) {
        return this.date();
      } else if (unit == M) {
        return this.month();
      } else if (unit == Y) {
        return this.year();
      } else if (unit == H) {
        return this.hour();
      } else if (unit == MIN) {
        return this.minute();
      } else if (unit == S) {
        return this.second();
      } else if (unit == MS) {
        return this.millisecond();
      }
      return 0;
    }
    year(input = null) {
      if (input == null)
        return this.$y;
      return this.set(Y, input);
    }
    month(input = null) {
      if (input == null)
        return this.$M;
      return this.set(M, input);
    }
    day(input = null) {
      if (input == null)
        return this.$W;
      return this.set(D, input);
    }
    date(input = null) {
      if (input == null)
        return this.$D;
      return this.set(DATE, input);
    }
    hour(input = null) {
      if (input == null)
        return this.$H;
      return this.set(H, input);
    }
    minute(input = null) {
      if (input == null)
        return this.$m;
      return this.set(MIN, input);
    }
    second(input = null) {
      if (input == null)
        return this.$s;
      return this.set(S, input);
    }
    millisecond(input = null) {
      if (input == null)
        return this.$ms;
      return this.set(MS, input);
    }
    /**
     * 在当前 Dayuts 实例上添加指定的时间长度。
     * @param {number} number - 要添加的时间长度。
     * @param {string} units - 要添加的时间单位（例如，“years”，“months”，“days”等）。
     * @returns {Dayuts} 更新的 Dayuts 实例。
     */
    add(number, units) {
      var _a;
      const unit = prettyUnit(units);
      const instanceFactorySet = (n) => {
        const d = dayuts(this);
        return d.date(d.date() + Math.round(n * number));
      };
      if (unit == M) {
        return this.set(M, this.$M + number);
      }
      if (unit == Y) {
        return this.set(Y, this.$y + number);
      }
      if (unit == D) {
        return instanceFactorySet(1);
      }
      if (unit == W) {
        return instanceFactorySet(7);
      }
      const steps = /* @__PURE__ */ new Map([
        [MIN, MILLISECONDS_A_MINUTE],
        [H, MILLISECONDS_A_HOUR],
        [S, MILLISECONDS_A_SECOND]
      ]);
      const step = (_a = steps.get(unit)) !== null && _a !== void 0 ? _a : 1;
      const nextTimeStamp = this.$d.getTime() + number * step;
      return wrapper(nextTimeStamp, this);
    }
    /**
     * 从当前 Dayuts 实例中减去指定的时间。
     * @param {number} number - 要减去的时间。
     * @param {string} units - 要减去的时间单位（例如，“years”，“months”，“days”等）。
     * @returns {Dayuts} 更新的 Dayuts 实例。
     */
    subtract(number, units) {
      return this.add(number * -1, units);
    }
    /**
     * 日期格式化
     * @param {string} formatStr - 格式化字符串，包含各种格式化占位符（例如，“YYYY-MM-DD”，“HH:mm:ss”等）。
     * @returns {string} 格式化后的日期字符串。
     */
    format(formatStr = null) {
      const locale2 = this.$locale();
      if (!this.isValid())
        return INVALID_DATE_STRING;
      const str = formatStr !== null && formatStr !== void 0 ? formatStr : FORMAT_DEFAULT;
      const zoneStr = padZoneStr(this);
      const _a = this, $H = _a.$H, $m = _a.$m, $M = _a.$M;
      const weekdays = locale2.weekdays, months = locale2.months, meridiem = locale2.meridiem;
      function getShort(arr, index, full = [], length = 0) {
        if (arr != null && arr.length >= index) {
          return arr[index];
        } else if (full.length >= index) {
          return full[index].slice(0, length);
        }
        return "";
      }
      const get$H = (num) => {
        return padStart(($H % 12 == 0 ? 12 : $H % 12).toString(), num, "0");
      };
      const meridiemFunc = meridiem !== null && meridiem !== void 0 ? meridiem : (hour, _, isLowercase) => {
        const m = hour < 12 ? "AM" : "PM";
        return isLowercase ? m.toLowerCase() : m;
      };
      const matches = (match) => {
        if (match == "YY") {
          return this.$y.toString().slice(-2);
        } else if (match == "YYYY") {
          return padStart(this.$y.toString(), 4, "0");
        } else if (match == "M") {
          return ($M + 1).toString();
        } else if (match == "MM") {
          return padStart(($M + 1).toString(), 2, "0");
        } else if (match == "MMM") {
          return getShort(locale2.monthsShort, $M, months, 3);
        } else if (match == "MMMM") {
          return getShort(months, $M);
        } else if (match == "D") {
          return this.$D.toString();
        } else if (match == "DD") {
          return padStart(this.$D.toString(), 2, "0");
        } else if (match == "d") {
          return this.$W.toString();
        } else if (match == "dd") {
          return getShort(locale2.weekdaysMin, this.$W, weekdays, 2);
        } else if (match == "ddd") {
          return getShort(locale2.weekdaysShort, this.$W, weekdays, 3);
        } else if (match == "dddd") {
          return weekdays[this.$W];
        } else if (match == "H") {
          return $H.toString();
        } else if (match == "HH") {
          return padStart($H.toString(), 2, "0");
        } else if (match == "h") {
          return get$H(1);
        } else if (match == "hh") {
          return get$H(2);
        } else if (match == "a") {
          return meridiemFunc($H, $m, true);
        } else if (match == "A") {
          return meridiemFunc($H, $m, false);
        } else if (match == "m") {
          return $m.toString();
        } else if (match == "mm") {
          return padStart($m.toString(), 2, "0");
        } else if (match == "s") {
          return this.$s.toString();
        } else if (match == "ss") {
          return padStart(this.$s.toString(), 2, "0");
        } else if (match == "SSS") {
          return padStart(this.$ms.toString(), 3, "0");
        } else if (match == "Z") {
          return zoneStr;
        }
        return null;
      };
      return str.replace(REGEX_FORMAT, (match, $1, offset, string) => {
        var _a2;
        return (_a2 = $1 !== null && $1 !== void 0 ? $1 : matches(match)) !== null && _a2 !== void 0 ? _a2 : zoneStr.replace(":", "");
      });
    }
    /**
     * 获取 Dayuts 实例的 UTC 偏移量（以分钟为单位）。
     * @returns {number} UTC 偏移量（以分钟为单位）。
     */
    utcOffset() {
      return 0;
    }
    diff(input, units = "millisecond", float = false) {
      const unit = prettyUnit(units);
      const that = dayuts(input);
      const zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
      const diff = this.valueOf() - that.valueOf();
      const getMonth = () => {
        return monthDiff(this, that);
      };
      let result;
      switch (unit) {
        case Y:
          result = getMonth() / 12;
          break;
        case M:
          result = getMonth();
          break;
        case Q:
          result = getMonth() / 3;
          break;
        case W:
          result = (diff - zoneDelta) / MILLISECONDS_A_WEEK;
          break;
        case D:
          result = (diff - zoneDelta) / MILLISECONDS_A_DAY;
          break;
        case H:
          result = diff / MILLISECONDS_A_HOUR;
          break;
        case MIN:
          result = diff / MILLISECONDS_A_MINUTE;
          break;
        case S:
          result = diff / MILLISECONDS_A_SECOND;
          break;
        default:
          result = diff;
          break;
      }
      return float ? result : absFloor(result);
    }
    /**
     * 将当前 Dayuts 对象转换为原生 Date 对象。
     *
     * @returns {Date} 返回一个表示当前日期的原生 Date 对象。
     */
    toDate() {
      return new Date(this.valueOf());
    }
    /**
     * 将 Moment 对象转换为 JSON 字符串
     * @returns {string | null} 如果 Moment 对象有效，则返回 ISO 8601 格式的字符串，否则返回 null
     */
    toJSON() {
      return this.isValid() ? this.toISOString() : null;
    }
    /**
     * 将 Moment 对象转换为 ISO 8601 格式的字符串
     * @returns {string} 返回 ISO 8601 格式的字符串
     */
    toISOString() {
      return this.$d.toString();
    }
    toObject() {
      return {
        years: this.$y,
        months: this.$M,
        date: this.$D,
        hours: this.$H,
        minutes: this.$m,
        seconds: this.$s,
        milliseconds: this.$ms
      };
    }
    toArray() {
      return [
        this.$y,
        this.$M,
        this.$D,
        this.$H,
        this.$m,
        this.$s,
        this.$ms
      ];
    }
    /**
     * 获取当前日期的毫秒数。
     *
     * @returns {number} 返回一个表示当前日期的毫秒数。
     */
    valueOf() {
      return this.$d.getTime();
    }
    /**
     * 获取当前 `dayuts` 对象所在月份的天数。
     *
     * @returns {number} 返回当前 `dayuts` 对象所在月份的天数。
     */
    daysInMonth() {
      return this.endOf(M).$D;
    }
    /**
     * 获取当前日期的区域设置对象。
     *
     * @returns {Object} 区域设置对象。
     */
    $locale() {
      return localeState.locales.get(this.$L);
    }
    locale(preset, object = null) {
      const that = this.clone();
      const nextLocaleName = parseLocale(preset, object, true);
      if (nextLocaleName != null)
        that.$L = nextLocaleName;
      return that;
    }
    clone() {
      return wrapper(this.$d.getTime(), this);
    }
    /**
     * 返回当前 dayuts 对象的 UTC 字符串表示。
     *
     * @returns {string} 当前 dayuts 对象的 UTC 字符串表示。
     */
    toString() {
      return this.$d.toString();
    }
    dayOfYear(input = null) {
      const dayOfYear = Math.round((this.startOf("day").valueOf() - this.startOf("year").valueOf()) / 864e5) + 1;
      return input == null ? dayOfYear : this.add(input - dayOfYear, "day");
    }
    fromToBase(input, withoutSuffix, instance, isFrom) {
      var _a, _b;
      const relObj = (_a = localeState.locales.get("en")) === null || _a === void 0 ? void 0 : _a.relativeTime;
      const loc = (_b = instance.$locale().relativeTime) !== null && _b !== void 0 ? _b : relObj;
      if (loc == null)
        return "";
      const T = [
        { l: "s", r: 44, d: S },
        { l: "m", r: 89 },
        { l: "mm", r: 44, d: MIN },
        { l: "h", r: 89 },
        { l: "hh", r: 21, d: H },
        { l: "d", r: 35 },
        { l: "dd", r: 25, d: D },
        { l: "M", r: 45 },
        { l: "MM", r: 10, d: M },
        { l: "y", r: 17 },
        { l: "yy", d: Y }
      ];
      const Tl = T.length;
      let result = 0;
      let out = "";
      let isFuture = false;
      for (let i = 0; i < Tl; i += 1) {
        let t = T[i];
        if (t.d != null) {
          result = isFrom ? dayuts(input).diff(instance, t.d, true) : instance.diff(input, t.d, true);
        }
        let abs = Math.round(Math.abs(result));
        isFuture = result > 0;
        if (t.r == null || t.r != null && abs <= t.r) {
          if (abs <= 1 && i > 0)
            t = T[i - 1];
          const format = loc[t.l];
          if (typeof format == "string") {
            out = format.replace("%d", abs.toString());
          }
          break;
        }
      }
      if (withoutSuffix)
        return out;
      const pastOrFuture = isFuture ? loc.future : loc.past;
      return pastOrFuture.replace("%s", out);
    }
    to(input, withoutSuffix = false) {
      return this.fromToBase(input, withoutSuffix, this, true);
    }
    from(input, withoutSuffix = false) {
      return this.fromToBase(input, withoutSuffix, this, false);
    }
    toNow(withoutSuffix = false) {
      return this.to(dayuts(), withoutSuffix);
    }
    fromNow(withoutSuffix = false) {
      return this.from(dayuts(), withoutSuffix);
    }
  }
  function dayuts(date = null, format = null, locale2 = null) {
    if (date != null && date instanceof Dayuts)
      return date.clone();
    return new Dayuts({
      date,
      format,
      locale: locale2
    });
  }
  const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "message",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const checkIns = vue.ref(["2025-06-09", "2025-07-01", "2025-07-02"]);
      const today = vue.ref(dayuts().format("MM-DD"));
      const showCalendar = vue.ref(false);
      const activeTab = vue.ref(0);
      const testTitle = vue.ref("测试标题");
      const videoRef = vue.ref(null);
      const playVideo = () => {
        videoRef.value.play();
        uni.createVideoContext("myVideo").play();
      };
      const pasueVideo = () => {
        videoRef.value.pause();
        uni.createVideoContext("myVideo").pause();
      };
      class SecurityEvent {
        constructor(id, type, time, location) {
          this.id = id;
          this.type = type;
          this.time = time;
          this.location = location;
        }
      }
      class Tab {
        constructor(label, type) {
          this.label = label;
          this.type = type;
        }
      }
      const tabs = vue.ref([
        { label: "全部类型", type: "all" },
        { label: "人形侦测", type: "human" },
        { label: "移动侦测", type: "motion" }
      ]);
      const events = vue.ref([
        new SecurityEvent(1, "human", "15:29", "前门走廊"),
        new SecurityEvent(2, "motion", "14:45", "车库入口"),
        new SecurityEvent(3, "human", "13:20", "后花园"),
        new SecurityEvent(4, "motion", "11:05", "侧门通道")
      ]);
      const getFilteredEvents = () => {
        if (activeTab.value == 0)
          return [...events.value];
        const selectedType = tabs.value[activeTab.value].type;
        return events.value.filter((event) => {
          return event.type === selectedType;
        });
      };
      const changeTab = (index) => {
        activeTab.value = index;
      };
      const select = (day) => {
        today.value = dayuts(day.fullDate).format("MM-DD");
        uni.__log__("log", "at pages/message/message.uvue:130", today.value);
        if (day.isToday) {
          uni.__log__("log", "at pages/message/message.uvue:132", "今天");
        }
        showCalendar.value = false;
      };
      const change = (res) => {
        uni.__log__("log", "at pages/message/message.uvue:138", "res", res);
      };
      const ShowCalendar = () => {
        showCalendar.value = !showCalendar.value;
      };
      const hideCalendar = () => {
        showCalendar.value = false;
      };
      const __returned__ = { checkIns, today, showCalendar, videoSrc, activeTab, testTitle, videoRef, playVideo, pasueVideo, SecurityEvent, Tab, tabs, events, getFilteredEvents, changeTab, select, change, ShowCalendar, hideCalendar };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$3 = "/static/down.png";
  const _imports_1$1 = "/static/vedio.png";
  const _style_0$7 = { "container": { "": { "width": "100%", "height": "100%", "position": "relative", "backgroundColor": "#f3f3f3" } }, "vedio-box": { ".container ": { "width": "100%" } }, "video": { ".container .vedio-box ": { "width": "100%" } }, "content-box": { ".container ": { "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "sub-nav": { ".container .content-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "select": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "10rpx" } }, "today": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "width": "120rpx" } }, "down": { ".container .content-box .sub-nav .today ": { "width": "25rpx", "height": "25rpx" } }, "select-item": { ".container .content-box .sub-nav .select ": { "flex": 1, "backgroundColor": "#ffffff", "color": "#333333", "paddingTop": "10rpx", "paddingRight": "20rpx", "paddingBottom": "10rpx", "paddingLeft": "20rpx", "borderTopLeftRadius": "5rpx", "borderTopRightRadius": "5rpx", "borderBottomRightRadius": "5rpx", "borderBottomLeftRadius": "5rpx", "marginTop": 0, "marginRight": "5rpx", "marginBottom": 0, "marginLeft": "5rpx" } }, "active": { ".container .content-box .sub-nav .select ": { "color": "#ffffff", "backgroundColor": "#1296db" } }, "tab-content": { ".container .content-box ": { "display": "flex", "flexDirection": "column", "alignItems": "center", "marginTop": "20rpx" } }, "tab-pane": { ".container .content-box .tab-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "width": "100%", "marginBottom": "30rpx" } }, "item-content": { ".container .content-box .tab-content .tab-pane ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "item-icon": { ".container .content-box .tab-content .tab-pane .item-content ": { "width": "60rpx", "height": "60rpx" } }, "info": { ".container .content-box .tab-content .tab-pane .item-content ": { "marginLeft": "20rpx" } }, "item-img": { ".container .content-box .tab-content .tab-pane ": { "width": "100rpx", "height": "60rpx" } }, "calendar-box": { ".container ": { "position": "absolute", "bottom": 0, "left": 0, "height": "60%", "width": "100%", "backgroundColor": "#ffffff" } }, "btn-chanel-box": { ".container .calendar-box ": { "position": "absolute", "width": "85%", "bottom": "45rpx", "left": "60rpx", "borderTopLeftRadius": "50rpx", "borderTopRightRadius": "50rpx", "borderBottomRightRadius": "50rpx", "borderBottomLeftRadius": "50rpx" } } };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_daily_punch = resolveEasycom(vue.resolveDynamicComponent("l-daily-punch"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "vedio-box" }, [
        vue.createElementVNode("video", {
          class: "video",
          id: "myVideo",
          src: $setup.videoSrc,
          ref: "videoRef",
          controls: true,
          "show-play-btn": true,
          "show-center-play-btn": true,
          "enable-progress-gesture": true,
          "show-fullscreen-btn": true,
          "show-mute-btn": true,
          title: $setup.testTitle
        }, null, 8, ["title"]),
        vue.createElementVNode("view")
      ]),
      vue.createElementVNode("button", { onClick: $setup.playVideo }, "播放视频"),
      vue.createElementVNode("button", { onClick: $setup.pasueVideo }, "暂停视频"),
      vue.createElementVNode("view", { class: "content-box" }, [
        vue.createElementVNode("view", { class: "sub-nav" }, [
          vue.createElementVNode("view", {
            class: "today",
            onClick: $setup.ShowCalendar
          }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.today),
              1
              /* TEXT */
            ),
            vue.createElementVNode("image", {
              class: "down",
              src: _imports_0$3
            }),
            vue.createElementVNode("text", null, " | ")
          ]),
          vue.createElementVNode("view", { class: "select" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tabs, (tab, index) => {
                return vue.openBlock(), vue.createElementBlock("text", {
                  key: index,
                  class: vue.normalizeClass(["select-item", { active: $setup.activeTab === index }]),
                  onClick: ($event) => $setup.changeTab(index)
                }, vue.toDisplayString(tab.label), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "tab-content" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.getFilteredEvents(), (event, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "tab-pane"
              }, [
                vue.createElementVNode("view", { class: "item-content" }, [
                  vue.createElementVNode("image", {
                    class: "item-icon",
                    mode: "aspectFit",
                    src: event.type === "human" ? "/static/people.png" : "/static/mobile.png"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(event.type === "human" ? "人形侦测" : "移动侦测"),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(event.time),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("image", {
                  class: "item-img",
                  mode: "aspectFit",
                  src: _imports_1$1
                })
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      $setup.showCalendar ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "calendar-box"
      }, [
        vue.createVNode(_component_l_daily_punch, {
          signedDates: $setup.checkIns,
          onSelect: $setup.select,
          onPanelChange: $setup.change,
          dayHeight: 60
        }, null, 8, ["signedDates"]),
        vue.createElementVNode("button", {
          class: "btn-chanel-box",
          onClick: $setup.hideCalendar
        }, " 取消 ")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["styles", [_style_0$7]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/message.uvue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "mine",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const userInfo = () => {
        uni.navigateTo({
          url: "/pages/mine/userInfo/userInfo"
        });
      };
      const __returned__ = { userInfo };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$2 = "/static/mine/local.png";
  const _imports_1 = "/static/mine/cloud.png";
  const _imports_2 = "/static/mine/msgList.png";
  const _imports_3 = "/static/mine/user.png";
  const _imports_0$1 = "/static/mine/right.png";
  const _imports_5 = "/static/mine/liuliang.png";
  const _imports_6 = "/static/mine/order.png";
  const _imports_7 = "/static/mine/quetion.png";
  const _imports_8 = "/static/mine/online.png";
  const _imports_9 = "/static/mine/advice.png";
  const _imports_10 = "/static/mine/setting.png";
  const _imports_11 = "/static/mine/about.png";
  const _style_0$6 = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column", "backgroundColor": "#f1f1f1" } }, "files": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "width": "100%", "height": "100rpx", "backgroundColor": "#ffffff", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "paddingTop": "70rpx", "paddingRight": "80rpx", "paddingBottom": "70rpx", "paddingLeft": "80rpx", "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0 } }, "file": { ".container .files ": { "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "fileIcon": { ".container .files .file ": { "width": "48rpx", "height": "48rpx", "marginBottom": "15rpx" } }, "file-text": { ".container .files .file ": { "fontSize": "20rpx", "color": "#333333", "fontWeight": "bold" } }, "tools-list": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "item": { ".container .tools-list ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "height": "100rpx", "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "info": { ".container .tools-list .item ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "40rpx" } }, "item-icon": { ".container .tools-list .item .info ": { "width": "48rpx", "height": "48rpx" } }, "item-text": { ".container .tools-list .item .info ": { "fontSize": "25rpx", "color": "#333333", "marginLeft": "20rpx" } }, "right-icon": { ".container .tools-list .item ": { "width": "35rpx", "height": "35rpx" } }, "no-bottom": { ".container .tools-list ": { "borderBottomWidth": "medium", "borderBottomStyle": "none", "borderBottomColor": "#000000" } } };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "files" }, [
        vue.createElementVNode("view", { class: "file" }, [
          vue.createElementVNode("image", {
            class: "fileIcon",
            src: _imports_0$2,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "file-text" }, "本地文件")
        ]),
        vue.createElementVNode("view", { class: "file" }, [
          vue.createElementVNode("image", {
            class: "fileIcon",
            src: _imports_1,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "file-text" }, "永久备份")
        ]),
        vue.createElementVNode("view", { class: "file" }, [
          vue.createElementVNode("image", {
            class: "fileIcon",
            src: _imports_2,
            mode: "aspectFit"
          }),
          vue.createElementVNode("text", { class: "file-text" }, "消息列表")
        ])
      ]),
      vue.createElementVNode("view", { class: "tools-list" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.userInfo
        }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_3,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "个人信息")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_5,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "流量充值")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_6,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "我的订单")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_7,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "常见问题")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_8,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "在线客服")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_9,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "意见反馈")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_10,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "设置")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "item no-bottom" }, [
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("image", {
              class: "item-icon",
              src: _imports_11,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", { class: "item-text" }, "关于")
          ]),
          vue.createElementVNode("view", null, [
            vue.createElementVNode("image", {
              class: "right-icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ])
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["styles", [_style_0$6]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/mine.uvue"]]);
  const _sfc_main$5 = vue.defineComponent({
    name: "fui-switch",
    emits: ["change", "update:checked"],
    props: {
      name: {
        type: String,
        default: ""
      },
      checked: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabledStyle: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "switch"
      },
      color: {
        type: String,
        default: ""
      },
      normalColor: {
        type: String,
        default: ""
      },
      transitionColor: {
        type: String,
        default: ""
      },
      btnColor: {
        type: String,
        default: ""
      },
      btnNormalColor: {
        type: String,
        default: ""
      },
      borderColor: {
        type: String,
        default: ""
      },
      checkMarkColor: {
        type: String,
        default: ""
      },
      scaleRatio: {
        type: Number,
        default: 1
      },
      scaleAlign: {
        type: String,
        default: "center"
      }
    },
    data() {
      return {
        val: false,
        styleVal: false,
        isLabel: false,
        fuiLabel: null,
        fuiForm: null
      };
    },
    computed: {
      getStyle() {
        const mp = /* @__PURE__ */ new Map();
        if (this.val) {
          if (this.btnColor != "")
            mp.set("background", this.btnColor);
        } else {
          if (this.btnNormalColor != "")
            mp.set("background", this.btnNormalColor);
        }
        return mp;
      },
      getSwitchStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.val) {
          if (this.color != "") {
            mp.set("borderColor", this.color);
            mp.set("background", this.color);
          }
        } else {
          if (this.transitionColor != "")
            mp.set("background", this.transitionColor);
          if (this.borderColor != "")
            mp.set("borderColor", this.borderColor);
        }
        return mp;
      },
      getBeforeBgColor() {
        const mp = /* @__PURE__ */ new Map();
        if (this.normalColor != "")
          mp.set("background", this.normalColor);
        return mp;
      },
      getMarkStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.checkMarkColor != "") {
          mp.set("borderBottomColor", this.checkMarkColor);
          mp.set("borderRightColor", this.checkMarkColor);
        }
        return mp;
      }
    },
    watch: {
      checked(val) {
        this.val = val;
      },
      val() {
        setTimeout(() => {
          this.styleVal = this.val;
        }, 0);
      }
    },
    created() {
      this.val = this.checked;
      const parent = this.getParent("fui-label");
      if (parent) {
        this.isLabel = true;
        const label = this.fuiLabel;
        label.$data["childrens"].push(this);
      }
      const isForm = this.getParent("fui-form");
      if (isForm) {
        const form = this.fuiForm;
        form.$data["formChildren"].push(this);
      }
    },
    methods: {
      onChange(e) {
        e.stopPropagation();
        if (this.disabled)
          return null;
        this.emitChange(!this.val);
      },
      emitChange(e) {
        this.val = e;
        this.$emit("change", e);
        this.$emit("update:checked", e);
      },
      labelClick() {
        if (this.disabled)
          return null;
        this.emitChange(!this.val);
      },
      //provide/inject方式（可能有警告，设置default:null也无法去除，应该是底层有bug）
      getParent(name) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        if (name == "fui-label") {
          this.fuiLabel = parent;
        } else if (name == "fui-form") {
          this.fuiForm = parent;
        }
        return true;
      },
      reset() {
        this.val = false;
        this.$emit("change", false);
        this.$emit("update:checked", false);
      },
      getSubmitValue() {
        return this.val;
      }
    }
  });
  const _style_0$5 = { "fui-switch__input": { "": { "flexShrink": 0 } }, "fui-switch__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-switch__scale-center": { "": { "transformOrigin": "center center" } }, "fui-switch__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-switch__size-switch": { "": { "width": 52, "height": 32 } }, "fui-switch__size-checkbox": { "": { "width": "40rpx", "height": "40rpx" } }, "fui-switch__checkbox-self": { "": { "width": "40rpx", "height": "40rpx", "borderTopLeftRadius": 40, "borderTopRightRadius": 40, "borderBottomRightRadius": 40, "borderBottomLeftRadius": 40, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "relative", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopColor": "#CCCCCC", "borderRightColor": "#CCCCCC", "borderBottomColor": "#CCCCCC", "borderLeftColor": "#CCCCCC", "boxSizing": "border-box", "overflow": "hidden" } }, "fui-switch__input-def": { "": { "position": "relative", "width": 52, "height": 32, "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#CCCCCC", "borderRightColor": "#CCCCCC", "borderBottomColor": "#CCCCCC", "borderLeftColor": "#CCCCCC", "borderTopLeftRadius": 16, "borderTopRightRadius": 16, "borderBottomRightRadius": 16, "borderBottomLeftRadius": 16, "boxSizing": "border-box" } }, "fui-switch__normal-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#dfdfdf" } }, "fui-switch__checked-color": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-switch__normal-bcolor": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-switch__input-before": { "": { "position": "absolute", "top": 0, "left": 0, "width": 50, "height": 30, "borderTopLeftRadius": 15, "borderTopRightRadius": 15, "borderBottomRightRadius": 15, "borderBottomLeftRadius": 15, "transitionProperty": "transform", "transitionDuration": "0.3s" } }, "fui-switch__before-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__input-after": { "": { "position": "absolute", "top": 0, "left": 0, "width": 30, "height": 30, "borderTopLeftRadius": 15, "borderTopRightRadius": 15, "borderBottomRightRadius": 15, "borderBottomLeftRadius": 15, "boxShadow": "0 0 6rpx rgba(0, 0, 0, 0.4)", "transitionProperty": "transform", "transitionDuration": "0.3s", "display": "flex", "alignItems": "center", "justifyContent": "center", "transform": "translateX(0)" } }, "fui-switch__after-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__input--before": { "": { "transform": "scale(0)" } }, "fui-switch__input--after": { "": { "transform": "translateX(20px)" } }, "fui-switch__check-mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%", "boxSizing": "border-box" } }, "fui-switch__circle-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__checkbox-disabled": { "": { "opacity": 0.6 } }, "@TRANSITION": { "fui-switch__input-before": { "property": "transform", "duration": "0.3s" }, "fui-switch__input-after": { "property": "transform", "duration": "0.3s" } } };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["fui-switch__input", ["fui-switch__size-".concat($props.type), $props.scaleRatio != 1 ? "fui-switch__scale-".concat($props.scaleAlign) : "", $props.disabled && $props.disabledStyle ? "fui-switch__checkbox-disabled" : ""]]),
        style: vue.normalizeStyle({ transform: "scale(".concat($props.scaleRatio, ")") })
      },
      [
        $props.type == "switch" ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["fui-switch__input-def", { "fui-checkbox__disabled": $props.disabled, "fui-switch__checked-color": $data.styleVal && $props.color == "", "fui-switch__normal-bcolor": !$data.styleVal && $props.borderColor == "", "fui-switch__normal-bg": !$data.styleVal && $props.transitionColor == "" }]),
            style: vue.normalizeStyle($options.getSwitchStyl),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.onChange && $options.onChange(...args))
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["fui-switch__input-before", { "fui-switch__input--before": $data.val, "fui-switch__before-bg": !$data.styleVal && $props.normalColor == "" }]),
                style: vue.normalizeStyle($options.getBeforeBgColor)
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["fui-switch__input-after", { "fui-switch__input--after": $data.val, "fui-switch__after-bg": $props.btnColor == "" && $data.styleVal || !$data.styleVal && $props.btnNormalColor == "" }]),
                style: vue.normalizeStyle($options.getStyle)
              },
              [
                vue.renderSlot(_ctx.$slots, "default")
              ],
              6
              /* CLASS, STYLE */
            )
          ],
          6
          /* CLASS, STYLE */
        )) : (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["fui-switch__checkbox-self", { "fui-switch__checked-color": $data.styleVal && $props.color == "", "fui-switch__normal-bcolor": !$data.styleVal && $props.borderColor == "", "fui-switch__circle-bg": !$data.styleVal && $props.normalColor == "" }]),
            style: vue.normalizeStyle($options.getSwitchStyl),
            onClick: _cache[1] || (_cache[1] = (...args) => $options.onChange && $options.onChange(...args))
          },
          [
            $data.val ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["fui-switch__check-mark", { "fui-switch__mark-color": $props.checkMarkColor == "" }]),
                style: vue.normalizeStyle($options.getMarkStyl)
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["styles", [_style_0$5]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue"]]);
  const _sfc_main$4 = vue.defineComponent({
    name: "fui-button",
    emits: ["onclick"],
    props: {
      type: {
        type: String,
        default: "primary"
      },
      background: {
        type: String,
        default: ""
      },
      text: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: ""
      },
      disabledBackground: {
        type: String,
        default: ""
      },
      disabledColor: {
        type: String,
        default: ""
      },
      borderWidth: {
        type: String,
        default: "0.5px"
      },
      borderColor: {
        type: String,
        default: ""
      },
      btnSize: {
        type: String,
        default: ""
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: ""
      },
      size: {
        type: Number,
        default: 0
      },
      bold: {
        type: Boolean,
        default: false
      },
      margin: {
        type: String,
        default: ""
      },
      radius: {
        type: String,
        default: ""
      },
      plain: {
        type: Boolean,
        default: false
      },
      highlight: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      iconColor: {
        type: String,
        default: "#B2B2B2"
      },
      activeColor: {
        type: String,
        default: "#FFFFFF"
      },
      //V1.2.6+
      formType: {
        type: String,
        default: ""
      }
    },
    computed: {
      getStyl() {
        const mp = /* @__PURE__ */ new Map();
        mp.set("border-color", this.iconColor);
        return mp;
      },
      getBackground() {
        let color = this.background;
        if (this.disabled && this.disabledBackground != "") {
          color = this.disabledBackground;
        }
        color = this.type == "link" || this.plain ? "rgba(0,0,0,0)" : color;
        return color;
      },
      getBorderColor() {
        let color = this.borderColor;
        if (color == "") {
          color = this.disabled && this.disabledBackground != "" ? this.disabledBackground : this.background;
        }
        color = this.type == "link" ? "rgba(0,0,0,0)" : color;
        return color;
      },
      getColor() {
        let color;
        if (this.color != "") {
          color = this.disabled && this.disabledBackground != "" ? this.disabledColor : this.color;
        } else {
          if (this.disabled && this.disabledBackground != "") {
            color = this.disabledColor == "" ? "#FFFFFF" : this.disabledColor;
          } else {
            color = this.type == "gray" ? "#465CFF" : "#FFFFFF";
          }
        }
        return color;
      },
      getSize() {
        let size = this.size;
        if (this.btnSize != "") {
          size = size == 0 ? 32 : size;
          if (this.btnSize == "small") {
            size = size > 28 ? 28 : size;
          } else if (this.btnSize == "mini") {
            size = size > 28 ? 24 : size;
          }
        }
        return "".concat(size, "rpx");
      },
      getWidth() {
        let width = this.width;
        if (this.btnSize != "") {
          width = new UTSJSONObject({
            medium: "400rpx",
            small: "200rpx",
            mini: "120rpx"
          })[this.btnSize];
        }
        return width;
      },
      getHeight() {
        let height = this.height;
        if (this.btnSize != "") {
          height = new UTSJSONObject({
            medium: "84rpx",
            small: "72rpx",
            mini: "64rpx"
          })[this.btnSize];
        }
        return height;
      }
    },
    watch: {
      loading(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.startSpin();
            }, 50);
          });
        } else {
          this.endSpin();
        }
      }
    },
    data() {
      return {
        times: 0,
        isSpin: false,
        element: null,
        hoverEle: null,
        fuiForm: null
      };
    },
    created() {
      this.getParent("fui-form");
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.loading)
            this.startSpin();
        }, 200);
      });
    },
    beforeUnmount() {
      this.isSpin = false;
      this.element = null;
      this.hoverEle = null;
    },
    methods: {
      handleStart() {
        this.switchHover(true);
      },
      handleTap(e) {
        if (this.disabled)
          return null;
        this.$emit("onclick", e);
        if (this.formType != "" && this.fuiForm != null) {
          const form = this.fuiForm;
          form.$callMethod("buttonEvent", this.formType);
        }
      },
      handleEnd() {
        this.switchHover(false);
      },
      switchHover(show) {
        if (!this.highlight || this.disabled)
          return null;
        if (this.hoverEle == null) {
          this.hoverEle = this.$refs["fui_button_hover"];
        }
        this.hoverEle.style.setProperty("visibility", show ? "visible" : "hidden");
      },
      startSpin() {
        if (this.element != null && this.isSpin)
          return null;
        if (this.element == null) {
          this.element = this.$refs["fui_button_loading"];
        }
        this.times = this.times + 1;
        this.element.style.setProperty("transform", "rotate(".concat(this.times * 360, "deg)"));
        this.element.style.setProperty("transition-duration", "600ms");
        this.isSpin = true;
      },
      endSpin() {
        this.isSpin = false;
        this.times = 0;
        this.element.style.setProperty("transform", "rotate(".concat(this.times * 360, "deg)"));
        this.element.style.setProperty("transition-duration", "0s");
        this.element = null;
      },
      onEnd() {
        if (this.isSpin && this.loading) {
          this.times = this.times + 1;
          this.element.style.setProperty("transform", "rotate(".concat(this.times * 360, "deg)"));
        }
      },
      getParent(name) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        this.fuiForm = parent;
        return true;
      }
    }
  });
  const _style_0$4 = { "fui-button__wrap": { "": { "position": "relative", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "boxSizing": "border-box", "overflow": "hidden" } }, "fui-button__flex-1": { "": { "width": "100%" } }, "fui-button__opacity": { "": { "opacity": 0.5 } }, "fui-button__hover": { "": { "position": "absolute", "left": 0, "right": 0, "top": 0, "bottom": 0, "backgroundColor": "rgba(0,0,0,0.2)", "zIndex": 2, "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "visibility": "hidden", "pointerEvents": "none" } }, "fui-button__spin": { "": { "width": "32rpx", "height": "32rpx", "borderTopWidth": 2, "borderRightWidth": 2, "borderBottomWidth": 2, "borderLeftWidth": 2, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "transitionDuration": "600ms", "transitionProperty": "transform", "transitionTimingFunction": "linear", "transform": "rotate(0deg)", "boxSizing": "border-box", "marginRight": "8rpx", "position": "relative" } }, "fui-button__spin-dot": { "": { "position": "absolute", "width": "12rpx", "height": "12rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx", "left": 0, "top": 0 } }, "fui-button__text": { "": { "textAlign": "center" } }, "fui-text__bold": { "": { "fontWeight": "bold" } }, "fui-button__link": { "": { "!borderTopColor": "rgba(0,0,0,0)", "!borderRightColor": "rgba(0,0,0,0)", "!borderBottomColor": "rgba(0,0,0,0)", "!borderLeftColor": "rgba(0,0,0,0)", "!backgroundColor": "rgba(0,0,0,0)" } }, "fui-button__primary": { "": { "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF", "!backgroundImage": "none", "!backgroundColor": "#465CFF" } }, "fui-button__success": { "": { "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F", "!backgroundImage": "none", "!backgroundColor": "#09BE4F" } }, "fui-button__warning": { "": { "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703", "!backgroundImage": "none", "!backgroundColor": "#FFB703" } }, "fui-button__danger": { "": { "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B", "!backgroundImage": "none", "!backgroundColor": "#FF2B2B" } }, "fui-button__purple": { "": { "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF", "!backgroundImage": "none", "!backgroundColor": "#6831FF" } }, "fui-button__gray": { "": { "!borderTopColor": "#F8F8F8", "!borderRightColor": "#F8F8F8", "!borderBottomColor": "#F8F8F8", "!borderLeftColor": "#F8F8F8", "!backgroundImage": "none", "!backgroundColor": "#F8F8F8" } }, "fui-btn__gray-color": { "": { "!color": "#465CFF" } }, "fui-button__height": { "": { "!height": "96rpx" } }, "fui-button__height-text": { "": { "!height": "96rpx", "!lineHeight": "96rpx" } }, "fui-button__size": { "": { "!fontSize": "32rpx" } }, "fui-button__radius": { "": { "!borderTopLeftRadius": "16rpx", "!borderTopRightRadius": "16rpx", "!borderBottomRightRadius": "16rpx", "!borderBottomLeftRadius": "16rpx" } }, "@TRANSITION": { "fui-button__spin": { "duration": "600ms", "property": "transform", "timingFunction": "linear" } } };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["fui-button__wrap", [$options.getWidth == "" || $options.getWidth == "100%" ? "fui-button__flex-1" : "", $props.disabled && $props.disabledBackground == "" ? "fui-button__opacity" : "", $props.background == "" && $props.disabledBackground == "" && !$props.plain ? "fui-button__".concat($props.type) : "", $props.height == "" && $props.btnSize == "" ? "fui-button__height" : "", $props.radius == "" ? "fui-button__radius" : "", $props.highlight && !$props.disabled ? "fui-button__active" : ""]]),
        style: vue.normalizeStyle({ width: $options.getWidth, height: $options.getHeight, margin: $props.margin, borderRadius: $props.radius, background: $options.getBackground, border: "".concat($props.borderColor == "" ? "0px" : $props.borderWidth, " solid"), borderColor: $options.getBorderColor }),
        onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.handleStart && $options.handleStart(...args)),
        onTouchend: _cache[2] || (_cache[2] = (...args) => $options.handleEnd && $options.handleEnd(...args)),
        onTouchcancel: _cache[3] || (_cache[3] = (...args) => $options.handleEnd && $options.handleEnd(...args)),
        onClick: _cache[4] || (_cache[4] = (...args) => $options.handleTap && $options.handleTap(...args))
      },
      [
        $props.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            ref: "fui_button_loading",
            onTransitionend: _cache[0] || (_cache[0] = (...args) => $options.onEnd && $options.onEnd(...args)),
            class: "fui-button__spin",
            style: vue.normalizeStyle($options.getStyl)
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: "fui-button__spin-dot",
                style: vue.normalizeStyle({ background: $props.activeColor })
              },
              null,
              4
              /* STYLE */
            )
          ],
          36
          /* STYLE, NEED_HYDRATION */
        )) : vue.createCommentVNode("v-if", true),
        $props.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: vue.normalizeClass(["fui-button__text", { "fui-btn__gray-color": $props.background == "" && $props.disabledBackground == "" && !$props.plain && $props.type == "gray" && $props.color == "#fff", "fui-text__bold": $props.bold, "fui-button__size": $props.size == 0 && $props.btnSize == "", "fui-button__height-text": $props.height == "" && $props.btnSize == "" }]),
            style: vue.normalizeStyle({ fontSize: $options.getSize, color: $options.getColor, height: $options.getHeight, lineHeight: $options.getHeight })
          },
          vue.toDisplayString($props.text),
          7
          /* TEXT, CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default"),
        $props.highlight ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            ref: "fui_button_hover",
            class: vue.normalizeClass(["fui-button__hover", { "fui-button__radius": $props.radius == "" }]),
            style: vue.normalizeStyle({ borderRadius: $props.radius })
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      38
      /* CLASS, STYLE, NEED_HYDRATION */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["styles", [_style_0$4]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-button/fui-button.uvue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "userInfo",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const switchVal = vue.ref(false);
      const change = () => {
        const isCurrentlyBound = switchVal.value;
        if (isCurrentlyBound) {
          uni.showModal(new UTSJSONObject({
            title: "确认解绑",
            content: "确定要解除微信绑定吗？",
            cancelText: "取消",
            confirmText: "确定",
            success: (res) => {
              if (res.confirm) {
                uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:64", "调用解绑API...");
                switchVal.value = false;
                uni.showToast({
                  title: "已成功解绑微信",
                  icon: "none"
                });
              } else {
                switchVal.value = isCurrentlyBound;
              }
            }
          }));
        } else {
          uni.showModal(new UTSJSONObject({
            title: "确认绑定",
            content: "确定要绑定微信账号吗？",
            cancelText: "取消",
            confirmText: "确定",
            success: (res) => {
              if (res.confirm) {
                uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:84", "调用绑定API...");
                switchVal.value = true;
                uni.showToast({
                  title: "已成功绑定微信",
                  icon: "none"
                });
              } else {
                switchVal.value = isCurrentlyBound;
              }
            }
          }));
        }
      };
      const logout = () => {
        uni.showModal(new UTSJSONObject({
          content: "确定退出登陆吗？",
          cancelText: "取消",
          confirmText: "确定",
          success(res) {
            if (res.confirm) {
              uni.showToast({
                title: "退出成功",
                icon: "none",
                duration: 500
              });
            }
          }
        }));
      };
      const changePhoneNumber = () => {
        uni.navigateTo({
          url: "/pages/mine/userInfo/changePhoneNumber/changePhoneNumber"
        });
      };
      const cancelAnAccount = () => {
        uni.navigateTo({
          url: "/pages/mine/userInfo/CancelAnAccount/CancelAnAccount"
        });
      };
      const __returned__ = { switchVal, change, logout, changePhoneNumber, cancelAnAccount };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$3 = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#f3f3f3", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "title": { ".container ": { "fontSize": "30rpx", "color": "#333333", "paddingTop": "50rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": "20rpx" } }, "info": { ".container ": { "backgroundImage": "none", "backgroundColor": "#ffffff", "paddingTop": "10rpx", "paddingRight": "30rpx", "paddingBottom": "10rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx" } }, "info-item": { ".container .info ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "icon": { ".container .info .info-item ": { "width": "30rpx", "height": "30rpx" } }, "switch-state": { ".container .info .info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "phone": { ".container .info .info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "nobottom": { ".container .info ": { "borderBottomWidth": "medium", "borderBottomStyle": "none", "borderBottomColor": "#000000" } }, "btn-box": { ".container ": { "marginTop": "200rpx" } } };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_switch = resolveEasycom(vue.resolveDynamicComponent("fui-switch"), __easycom_0$1);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "title" }, [
        vue.createElementVNode("text", null, "个人信息")
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", null, "账号"),
          vue.createElementVNode("text", null, "18888888888")
        ]),
        vue.createElementVNode("view", {
          class: "info-item nobottom",
          onClick: $setup.changePhoneNumber
        }, [
          vue.createElementVNode("text", null, "手机号"),
          vue.createElementVNode("view", { class: "phone" }, [
            vue.createElementVNode("text", null, "18888888888"),
            vue.createElementVNode("image", {
              class: "icon",
              src: _imports_0$1,
              mode: "aspectFit"
            })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "title" }, [
        vue.createElementVNode("text", null, "安全信息")
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "info-item" }, [
          vue.createElementVNode("text", null, "修改密码"),
          vue.createElementVNode("image", {
            class: "icon",
            src: _imports_0$1,
            mode: "aspectFit"
          })
        ]),
        vue.createElementVNode("view", {
          class: "info-item nobottom",
          onClick: $setup.cancelAnAccount
        }, [
          vue.createElementVNode("text", null, "注销账号"),
          vue.createElementVNode("image", {
            class: "icon",
            src: _imports_0$1,
            mode: "aspectFit"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "title" }, [
        vue.createElementVNode("text", null, "第三方账号")
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", { class: "info-item nobottom" }, [
          vue.createElementVNode("text", null, "微信"),
          vue.createElementVNode("view", { class: "switch-state" }, [
            vue.createElementVNode(
              "text",
              { style: { "margin-right": "10rpx" } },
              vue.toDisplayString($setup.switchVal ? "已绑定" : "未绑定"),
              1
              /* TEXT */
            ),
            vue.createVNode(_component_fui_switch, {
              color: "#1296db",
              onChange: $setup.change
            })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "btn-box" }, [
        vue.createVNode(_component_fui_button, {
          color: "#fff",
          text: "退出登陆",
          background: "#1296db",
          onOnclick: $setup.logout
        })
      ])
    ]);
  }
  const PagesMineUserInfoUserInfo = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["styles", [_style_0$3]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/userInfo.uvue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "CancelAnAccount",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const cancelAccount = () => {
        uni.showToast({
          title: "注销成功",
          icon: "success",
          duration: 2e3
        });
      };
      const __returned__ = { cancelAccount };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0 = "/static/error_big.png";
  const _style_0$2 = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#F5F5F5", "display": "flex", "flexDirection": "column", "alignItems": "center", "paddingTop": "100rpx", "paddingRight": "100rpx", "paddingBottom": "100rpx", "paddingLeft": "100rpx" } }, "content": { ".container ": { "marginTop": "50rpx", "marginRight": 0, "marginBottom": "50rpx", "marginLeft": 0 } }, "content-word": { ".container .content ": { "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0 } }, "close": { ".container ": { "width": "120rpx", "height": "120rpx" } }, "btn-box": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "width": "100%" } }, "btn": { ".container .btn-box ": { "width": "45%" } } };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("image", {
        src: _imports_0,
        class: "close"
      }),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("text", { class: "content-word" }, "账号注销后将会删除个人数据且无法恢复，请谨慎操作。"),
        vue.createElementVNode("text", { class: "content-word" }, "注销前，请您自行备份重要数据及信息。")
      ]),
      vue.createElementVNode("view", { class: "btn-box" }, [
        vue.createElementVNode("view", { class: "btn" }, [
          vue.createVNode(_component_fui_button, {
            text: "取消",
            background: "#fff",
            color: "#1296db",
            borderColor: "#666",
            height: "70rpx"
          })
        ]),
        vue.createElementVNode("view", { class: "btn" }, [
          vue.createVNode(_component_fui_button, {
            text: "申请注销",
            background: "#1296db",
            color: "#fff",
            height: "70rpx",
            onOnclick: $setup.cancelAccount
          })
        ])
      ])
    ]);
  }
  const PagesMineUserInfoCancelAnAccountCancelAnAccount = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["styles", [_style_0$2]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/CancelAnAccount/CancelAnAccount.uvue"]]);
  const _style_0$1 = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#f3f3f3", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx" } } };
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" })
    ]);
  }
  const PagesMineUserInfoChangePhoneNumberChangePhoneNumber = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["styles", [_style_0$1]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/mine/userInfo/userInfo", PagesMineUserInfoUserInfo);
  __definePage("pages/mine/userInfo/CancelAnAccount/CancelAnAccount", PagesMineUserInfoCancelAnAccountCancelAnAccount);
  __definePage("pages/mine/userInfo/changePhoneNumber/changePhoneNumber", PagesMineUserInfoChangePhoneNumberChangePhoneNumber);
  const _sfc_main = vue.defineComponent(new UTSJSONObject({
    onLaunch: function() {
      uni.__log__("log", "at App.uvue:5", "App Launch");
    },
    onShow: function() {
      uni.__log__("log", "at App.uvue:8", "App Show");
    },
    onHide: function() {
      uni.__log__("log", "at App.uvue:11", "App Hide");
    },
    onExit: function() {
      uni.__log__("log", "at App.uvue:32", "App Exit");
    }
  }));
  const _style_0 = { "uni-row": { "": { "flexDirection": "row" } }, "uni-column": { "": { "flexDirection": "column" } } };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/App.uvue"]]);
  const __global__ = typeof globalThis === "undefined" ? Function("return this")() : globalThis;
  __global__.__uniX = true;
  function createApp() {
    const app = vue.createSSRApp(App);
    return {
      app
    };
  }
  createApp().app.mount("#app");
})(Vue);
//# sourceMappingURL=../../../cache/.app-ios/sourcemap/app-service.js.map
