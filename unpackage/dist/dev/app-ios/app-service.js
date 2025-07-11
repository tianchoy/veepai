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
      socket.onOpen((e2) => {
        clearTimeout(timer);
        resolve(socket);
      });
      socket.onClose((e2) => {
        clearTimeout(timer);
        resolve(null);
      });
      socket.onError((e2) => {
        clearTimeout(timer);
        resolve(null);
      });
    });
  }
  function initRuntimeSocketService() {
    const hosts = "127.0.0.1,192.168.3.34";
    const port = "8090";
    const id = "app-ios_9PNVBl";
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
  const _sfc_main$O = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _style_0$M = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column" } }, "content": { ".container ": { "position": "relative", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "width": "100%", "height": "400rpx", "overflow": "hidden" } }, "video-container": { ".container .content ": { "width": "100%", "height": "100%" } }, "video": { ".container .content ": { "width": "100%", "height": "100%", "objectFit": "cover", "marginBottom": 0 } }, "video-top-title": { ".container .content ": { "position": "absolute", "top": 0, "height": "60rpx", "width": "80%", "paddingTop": "15rpx", "paddingRight": 0, "paddingBottom": 0, "paddingLeft": "20rpx", "backgroundImage": "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor": "rgba(0,0,0,0)", "zIndex": 3 } }, "video-right-control": { ".container .content ": { "position": "absolute", "top": 0, "right": "10rpx", "display": "flex", "flexDirection": "column", "justifyContent": "space-around", "height": "100%", "alignItems": "center", "zIndex": 2 } }, "vedio-control": { ".container .content .video-right-control ": { "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" }, ".container .content .video-bottom-control ": { "marginTop": 0, "marginRight": "auto", "marginBottom": 0, "marginLeft": "auto", "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" } }, "vedio-control-icon": { ".container .content .video-right-control .vedio-control ": { "width": "100%", "height": "100%" }, ".container .content .video-bottom-control .vedio-control ": { "width": "100%", "height": "100%" } }, "video-bottom-control": { ".container .content ": { "position": "absolute", "bottom": "10rpx", "left": 0, "width": "100%", "height": "50rpx", "zIndex": 1 } } };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$N], ["styles", [_style_0$M]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/index/index.uvue"]]);
  const _sfc_main$N = /* @__PURE__ */ vue.defineComponent({
    __name: "l-date-strip-item",
    props: {
      dates: new UTSJSONObject({ type: Array, required: true, default: [] }),
      color: new UTSJSONObject({ type: String, required: false }),
      activeBgColor: new UTSJSONObject({ type: String, required: false }),
      activeColor: new UTSJSONObject({ type: String, required: false }),
      bgColor: new UTSJSONObject({ type: String, required: false }),
      radius: new UTSJSONObject({ type: String, required: false }),
      gridWidth: new UTSJSONObject({ type: String, required: false }),
      switchMode: new UTSJSONObject({ type: String, required: true, default: "week" }),
      shape: new UTSJSONObject({ type: String, required: true, default: "square" })
    },
    emits: ["click"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emit = __emit;
      const props = __props;
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.gridWidth != null && props.switchMode == "none") {
          style.set("width", props.gridWidth);
        }
        return style;
      });
      const onClick = (day) => {
        uni.__log__("log", "at uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue:88", day);
        emit("click", day);
      };
      const __returned__ = { emit, props, styles, onClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _imports_0$8 = "/static/dot1.png";
  const _style_0$L = { "l-date-strip": { "": { "height": 86, "backgroundColor": "#ffffff" } }, "l-date-strip__scroll": { "": { "flexDirection": "row" } }, "l-date-strip__item": { "": { "display": "flex", "flexDirection": "row", "paddingTop": 8, "paddingRight": 0, "paddingBottom": 8, "paddingLeft": 0, "boxSizing": "border-box" } }, "l-date-strip__item--week": { "": { "flex": 1 } }, "l-date-strip__grid": { ".l-date-strip__item--week ": { "flex": 1 }, ".l-date-strip__item--none ": { "width": 50 }, "": { "display": "flex", "flexDirection": "column", "marginTop": 0, "marginRight": "4rpx", "marginBottom": 0, "marginLeft": "4rpx", "transitionDuration": "300ms", "transitionProperty": "backgroundColor,color", "transitionTimingFunction": "linear" } }, "l-date-strip__grid-prefix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 14, "color": "rgba(0,0,0,0.45)" }, ".l-date-strip__grid--none ": { "paddingBottom": 4, "paddingTop": 4 }, ".l-date-strip__grid--circle ": { "paddingBottom": 4 } }, "l-date-strip__grid-day": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 16, "color": "rgba(0,0,0,0.88)", "fontWeight": "bold" } }, "l-date-strip__grid-suffix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "position": "absolute", "top": "50%", "transform": "translateY(60%)", "fontSize": 12, "color": "rgba(0,0,0,0.65)" } }, "l-date-strip__grid-info": { ".l-date-strip__grid--circle ": { "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99 }, "": { "display": "flex", "flex": 1, "justifyContent": "center", "alignItems": "center", "position": "relative" } }, "l-date-strip__grid--square": { "": { "borderTopLeftRadius": 5, "borderTopRightRadius": 5, "borderBottomRightRadius": 5, "borderBottomLeftRadius": 5, "paddingTop": 6, "paddingRight": 0, "paddingBottom": 6, "paddingLeft": 0 } }, "l-date-strip__grid--active-bg": { "": { "backgroundColor": "#3283ff" } }, "l-date-strip__grid--active-text": { "": { "color": "#FFFFFF" } }, "l-date-strip__grid--active-text-none": { "": { "color": "#3283ff" } }, "l-date-strip__grid--disabled": { "": { "opacity": 0.4 } }, "@TRANSITION": { "l-date-strip__grid": { "duration": "300ms", "property": "backgroundColor,color", "timingFunction": "linear" }, "l-date-strip__grid-prefix": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-day": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-suffix": { "duration": "200ms", "property": "color", "timingFunction": "linear" } } };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["l-date-strip__item", "l-date-strip__item--" + $props.switchMode])
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.dates, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["l-date-strip__grid", [
                "l-date-strip__grid--" + $props.shape,
                {
                  "l-date-strip__grid--active-bg": $props.shape == "square" && item.type == "selected",
                  // 'l-date-strip__grid--disabled': item.type == 'disabled',
                  "l-date-strip__grid--selected": item.type == "selected"
                }
              ]]),
              style: vue.normalizeStyle([
                $setup.styles,
                item.type == "selected" && $props.shape == "square" && $props.activeBgColor != null ? { background: $props.activeBgColor } : {},
                $props.shape == "square" && $props.radius != null ? { "border-radius": $props.radius } : {}
              ]),
              onClick: ($event) => $setup.onClick(item),
              key: item.key
            }, [
              item.prefix != null ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: vue.normalizeClass(["l-date-strip__grid-prefix", {
                    "l-date-strip__grid--active-text": item.type == "selected" && $props.shape == "square",
                    "l-date-strip__grid--active-text-none": item.type == "selected" && $props.shape == "none"
                  }]),
                  style: vue.normalizeStyle([
                    item.type == "selected" && $props.activeColor != null ? { color: $props.activeColor } : {}
                  ])
                },
                vue.toDisplayString(item.prefix),
                7
                /* TEXT, CLASS, STYLE */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["l-date-strip__grid-info", {
                    "l-date-strip__grid--active-bg": $props.shape == "circle" && item.type == "selected"
                  }]),
                  style: vue.normalizeStyle([
                    item.type == "selected" && $props.shape == "circle" && $props.activeBgColor != null ? { background: $props.activeBgColor } : {},
                    $props.shape == "square" && $props.radius != null ? { "border-radius": $props.radius } : {}
                  ])
                },
                [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["l-date-strip__grid-day", {
                        "l-date-strip__grid--active-text": item.type == "selected" && $props.shape != "none",
                        "l-date-strip__grid--active-text-none": item.type == "selected" && $props.shape == "none"
                      }]),
                      style: vue.normalizeStyle([
                        item.type == "selected" && $props.activeColor != null ? { color: $props.activeColor } : {}
                      ])
                    },
                    vue.toDisplayString(item.text),
                    7
                    /* TEXT, CLASS, STYLE */
                  ),
                  vue.createCommentVNode(" <text \r\n					class=\"l-date-strip__grid-suffix\" \r\n					:class=\"{\r\n						'l-date-strip__grid--active-text' : item.type == 'selected' && shape != 'none',\r\n						'l-date-strip__grid--active-text-none' : item.type == 'selected' && shape == 'none',\r\n					}\"\r\n					:style=\"[\r\n						item.type == 'selected' && activeColor != null  ? { color: activeColor} : {},\r\n					]\" v-if=\"item.suffix != null\">{{item.suffix}}</text> "),
                  vue.createElementVNode("view", null, [
                    item.suffix == "true" ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                      vue.createElementVNode("image", {
                        style: { "width": "16rpx", "height": "16rpx" },
                        src: _imports_0$8
                      })
                    ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                      vue.createElementVNode("text", { style: { "width": "16rpx", "height": "16rpx" } })
                    ]))
                  ])
                ],
                6
                /* CLASS, STYLE */
              )
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$a = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$M], ["styles", [_style_0$L]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue"]]);
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function resolveEasycom(component, easycom2) {
    return typeof component === "string" ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onPageShow = onShow;
  function getWeekRange(date, firstDayOfWeek) {
    const start = new Date(date.getTime());
    const dayOffset = (date.getDay() - firstDayOfWeek + 7) % 7;
    start.setDate(start.getDate() - dayOffset);
    const end = new Date(start.getTime());
    end.setDate(end.getDate() + 6);
    return { start, end };
  }
  function addDays(date, days) {
    const result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  }
  function addWeeks(date, weeks) {
    const result = new Date(date.getTime());
    result.setDate(result.getDate() + weeks * 7);
    return result;
  }
  function isSameDay(date1, date2) {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
  }
  function calcType(date, minDate, maxDate, selectedDate = null) {
    if (date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()) {
      return "disabled";
    }
    if (selectedDate != null && isSameDay(date, selectedDate)) {
      return "selected";
    }
    return "";
  }
  function daysBetween(date1, date2) {
    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMilliseconds / (1e3 * 3600 * 24));
  }
  function isString$1(str) {
    return typeof str == "string";
  }
  function isNumber$2(value) {
    return ["Int8", "UInt8", "Int16", "UInt16", "Int32", "UInt32", "Int64", "UInt64", "Int", "UInt", "Float", "Float16", "Float32", "Float64", "Double", "number"].includes(typeof value);
  }
  function isNumeric$1(value) {
    if (value == null) {
      return false;
    }
    if (isNumber$2(value)) {
      return true;
    } else if (isString$1(value)) {
      const regex = new RegExp("^(-)?\\d+(\\.\\d+)?$");
      return regex.test(value);
    }
    return false;
  }
  function unitConvert(value, base = 0) {
    if (isNumber$2(value)) {
      return value;
    }
    if (isNumeric$1(value)) {
      return parseFloat(value);
    }
    if (isString$1(value)) {
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
  const _sfc_main$M = /* @__PURE__ */ vue.defineComponent({
    __name: "l-date-strip",
    props: {
      firstDayOfWeek: new UTSJSONObject({ type: Number, required: true, default: 1 }),
      format: new UTSJSONObject({ type: Function, required: false }),
      maxDate: new UTSJSONObject({ type: Number, required: false }),
      minDate: new UTSJSONObject({ type: Number, required: false }),
      value: new UTSJSONObject({ type: Number, required: false }),
      defaultValue: new UTSJSONObject({ type: Number, required: false }),
      modelValue: new UTSJSONObject({ type: Number, required: false }),
      height: new UTSJSONObject({ type: String, required: false }),
      gridWidth: new UTSJSONObject({ type: String, required: false }),
      color: new UTSJSONObject({ type: String, required: false }),
      activeBgColor: new UTSJSONObject({ type: String, required: false }),
      activeColor: new UTSJSONObject({ type: String, required: false }),
      bgColor: new UTSJSONObject({ type: String, required: false }),
      radius: new UTSJSONObject({ type: String, required: false }),
      switchMode: new UTSJSONObject({ type: String, required: true, default: "week" }),
      shape: new UTSJSONObject({ type: String, required: true, default: "square" }),
      showNavigation: new UTSJSONObject({ type: Boolean, required: false }),
      weekdays: new UTSJSONObject({ type: Array, required: true, default: ["日", "一", "二", "三", "四", "五", "六"] })
    },
    emits: ["change", "select", "scroll", "panelChange", "update:modelValue"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      const emit = __emit;
      const props = __props;
      const currentWeekIndex = vue.ref(0);
      const scrollLeft = vue.ref(0);
      const swiperCircular = vue.ref(true);
      const selectedDate = vue.ref(null);
      const firstDayOfWeek = vue.computed(() => {
        return Math.min(Math.max(props.firstDayOfWeek, 0), 6);
      });
      const today = /* @__PURE__ */ new Date();
      const minDate = vue.computed(() => {
        return props.minDate != null ? new Date(props.minDate) : today;
      });
      const maxDate = vue.computed(() => {
        return props.maxDate != null ? new Date(props.maxDate) : addDays(today, 31);
      });
      const days = vue.computed(() => {
        return daysBetween(maxDate.value, minDate.value);
      });
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.height != null) {
          style.set("height", props.height);
        }
        if (props.bgColor != null) {
          style.set("background", props.bgColor);
        }
        return style;
      });
      const cache = /* @__PURE__ */ new Map();
      const createWeek = (currentStartDate, length) => {
        const dates = [];
        const time = currentStartDate.getTime();
        if (cache.has(time)) {
          return UTS.mapGet(cache, time);
        }
        for (let i2 = 0; i2 < length; i2++) {
          const date = new Date(time);
          date.setDate(currentStartDate.getDate() + i2);
          const week = date.getDay();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const dateObj = {
            key: "".concat(year, "-").concat(month, "-").concat(day),
            date,
            year,
            month,
            day,
            text: "".concat(day).padStart(2, "0"),
            type: calcType(date, minDate.value, maxDate.value, selectedDate.value),
            prefix: props.weekdays[week]
          };
          dates.push(props.format != null ? props.format(dateObj) : dateObj);
        }
        const obj = {
          start: new Date(dates[0].year, dates[0].month - 1, dates[0].day).getTime(),
          end: new Date(dates[length - 1].year, dates[length - 1].month - 1, dates[length - 1].day).getTime(),
          dates
        };
        return obj;
      };
      const currentDate = vue.ref(today);
      const displayWeeks = vue.computed(() => {
        const weeks = [];
        if (props.switchMode == "week") {
          const currentRange = getWeekRange(currentDate.value, firstDayOfWeek.value);
          const offsetMap = /* @__PURE__ */ new Map([
            [0, [0, 1, -1]],
            [1, [-1, 0, 1]],
            [2, [1, -1, 0]]
          ]);
          let indices = UTS.mapGet(offsetMap, currentWeekIndex.value);
          indices.forEach((i2) => {
            const weekDate = addWeeks(currentRange.start, i2);
            weeks.push(createWeek(weekDate, 7));
          });
        } else {
          weeks.push(createWeek(minDate.value, days.value));
        }
        return weeks;
      });
      const swiperChange = (event) => {
        const delta = event.detail.current - currentWeekIndex.value;
        const newDate = addWeeks(currentDate.value, delta == 1 || delta == -2 ? 1 : -1);
        currentDate.value = newDate;
        currentWeekIndex.value = event.detail.current;
      };
      const swiperFinish = (_event) => {
      };
      const onClick = (day) => {
        if (day.type == "disabled")
          return null;
        selectedDate.value = day.date;
        const v2 = day.date.getTime();
        emit("change", v2);
        emit("select", v2);
        emit("update:modelValue", v2);
      };
      const scrollToDate = (date) => {
        var _a2;
        currentDate.value = date;
        if (props.switchMode != "none")
          return null;
        scrollLeft.value = unitConvert((_a2 = props.gridWidth) !== null && _a2 !== void 0 ? _a2 : 50) * daysBetween(date, minDate.value);
      };
      vue.watchEffect(() => {
        var _a2;
        const value = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : props.modelValue;
        if (value == null)
          return null;
        selectedDate.value = new Date(value);
      });
      vue.onMounted(() => {
        vue.nextTick(() => {
          scrollToDate(currentDate.value);
        });
      });
      __expose(new UTSJSONObject({
        scrollToDate
      }));
      const __returned__ = { emit, props, currentWeekIndex, scrollLeft, swiperCircular, selectedDate, firstDayOfWeek, today, minDate, maxDate, days, styles, cache, createWeek, currentDate, displayWeeks, swiperChange, swiperFinish, onClick, scrollToDate };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$K = { "l-date-strip": { "": { "height": 86, "backgroundColor": "#ffffff" } }, "l-date-strip__scroll": { "": { "flexDirection": "row" } }, "l-date-strip__item": { "": { "display": "flex", "flexDirection": "row", "paddingTop": 8, "paddingRight": 0, "paddingBottom": 8, "paddingLeft": 0, "boxSizing": "border-box" } }, "l-date-strip__item--week": { "": { "flex": 1 } }, "l-date-strip__grid": { ".l-date-strip__item--week ": { "flex": 1 }, ".l-date-strip__item--none ": { "width": 50 }, "": { "display": "flex", "flexDirection": "column", "marginTop": 0, "marginRight": "4rpx", "marginBottom": 0, "marginLeft": "4rpx", "transitionDuration": "300ms", "transitionProperty": "backgroundColor,color", "transitionTimingFunction": "linear" } }, "l-date-strip__grid-prefix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 14, "color": "rgba(0,0,0,0.45)" }, ".l-date-strip__grid--none ": { "paddingBottom": 4, "paddingTop": 4 }, ".l-date-strip__grid--circle ": { "paddingBottom": 4 } }, "l-date-strip__grid-day": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 16, "color": "rgba(0,0,0,0.88)", "fontWeight": "bold" } }, "l-date-strip__grid-suffix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "position": "absolute", "top": "50%", "transform": "translateY(60%)", "fontSize": 12, "color": "rgba(0,0,0,0.65)" } }, "l-date-strip__grid-info": { ".l-date-strip__grid--circle ": { "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99 }, "": { "display": "flex", "flex": 1, "justifyContent": "center", "alignItems": "center", "position": "relative" } }, "l-date-strip__grid--square": { "": { "borderTopLeftRadius": 5, "borderTopRightRadius": 5, "borderBottomRightRadius": 5, "borderBottomLeftRadius": 5, "paddingTop": 6, "paddingRight": 0, "paddingBottom": 6, "paddingLeft": 0 } }, "l-date-strip__grid--active-bg": { "": { "backgroundColor": "#3283ff" } }, "l-date-strip__grid--active-text": { "": { "color": "#FFFFFF" } }, "l-date-strip__grid--active-text-none": { "": { "color": "#3283ff" } }, "l-date-strip__grid--disabled": { "": { "opacity": 0.4 } }, "@TRANSITION": { "l-date-strip__grid": { "duration": "300ms", "property": "backgroundColor,color", "timingFunction": "linear" }, "l-date-strip__grid-prefix": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-day": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-suffix": { "duration": "200ms", "property": "color", "timingFunction": "linear" } } };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_date_strip_item = resolveEasycom(vue.resolveDynamicComponent("l-date-strip-item"), __easycom_0$a);
    return $props.switchMode == "none" ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
      key: 0,
      class: "l-date-strip l-date-strip__scroll",
      "scroll-x": true,
      "scroll-left": $setup.scrollLeft,
      "show-scrollbar": false,
      direction: "horizontal",
      style: vue.normalizeStyle([$setup.styles])
    }, [
      vue.createVNode(_component_l_date_strip_item, {
        dates: $setup.displayWeeks[0].dates,
        color: $props.color,
        activeBgColor: $props.activeBgColor,
        activeColor: $props.activeColor,
        bgColor: $props.bgColor,
        radius: $props.radius,
        switchMode: $props.switchMode,
        shape: $props.shape,
        onClick: $setup.onClick
      }, null, 8, ["dates", "color", "activeBgColor", "activeColor", "bgColor", "radius", "switchMode", "shape"])
    ], 12, ["scroll-left"])) : (vue.openBlock(), vue.createElementBlock("swiper", {
      key: 1,
      class: "l-date-strip",
      style: vue.normalizeStyle([$setup.styles]),
      current: $setup.currentWeekIndex,
      circular: $setup.swiperCircular,
      onAnimationfinish: $setup.swiperFinish,
      onChange: $setup.swiperChange
    }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.displayWeeks, (week, g2) => {
          return vue.openBlock(), vue.createElementBlock("swiper-item", { key: g2 }, [
            vue.createVNode(_component_l_date_strip_item, {
              dates: week.dates,
              color: $props.color,
              activeBgColor: $props.activeBgColor,
              activeColor: $props.activeColor,
              bgColor: $props.bgColor,
              radius: $props.radius,
              switchMode: $props.switchMode,
              shape: $props.shape,
              onClick: $setup.onClick
            }, null, 8, ["dates", "color", "activeBgColor", "activeColor", "bgColor", "radius", "switchMode", "shape"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ], 44, ["current", "circular"]));
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$L], ["styles", [_style_0$K]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-date-strip/components/l-date-strip/l-date-strip.uvue"]]);
  function isDef(value) {
    return value != null;
  }
  function addUnit(value) {
    if (!isDef(value)) {
      return null;
    }
    value = "".concat(value);
    return isNumeric$1(value) ? "".concat(value, "px") : value;
  }
  const icons$1 = vue.ref(/* @__PURE__ */ new Map());
  if (icons$1.value.size == 0) {
    uni.getFileSystemManager().readFile({
      filePath: "/uni_modules/lime-icon/static/icons.json",
      encoding: "utf-8",
      success: (res) => {
        const obj = UTS.JSON.parseObject(res.data);
        if (obj == null)
          return null;
        icons$1.value = obj.toMap();
      },
      fail(err) {
        uni.showToast({
          title: "lime-icon:".concat(err.errMsg)
        });
      }
    });
  }
  const name$4 = "l-icon";
  const IconifyURL = "https://api.iconify.design/";
  const _sfc_main$L = /* @__PURE__ */ vue.defineComponent({
    __name: "l-icon",
    props: {
      name: new UTSJSONObject({
        type: String,
        default: "",
        required: true
        // validator: (value: string) : boolean => {
        // 	// 确保是字符串类型且不为空
        // 	return typeof value == 'string' && value.trim().length > 0
        // }
      }),
      color: new UTSJSONObject({
        type: String
        // default: ''
      }),
      size: new UTSJSONObject({
        type: [String, Number]
        // default: 32,
      }),
      prefix: new UTSJSONObject({
        type: String,
        default: ""
      }),
      lClass: new UTSJSONObject({
        type: String,
        default: ""
      }),
      // 对安卓IOS无效
      inherit: new UTSJSONObject({
        type: Boolean,
        default: true
      }),
      web: new UTSJSONObject({
        type: Boolean,
        default: false
      }),
      lStyle: new UTSJSONObject({
        type: [String, Object, Array],
        default: ""
      })
    },
    emits: ["click"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const $iconsHost = uni.getStorageSync("$limeIconsHost");
      const props = __props;
      const emits = __emit;
      const $iconCollection = vue.inject("$iconCollection", { has: false, icons: /* @__PURE__ */ new Map() });
      const innerName = vue.computed(() => {
        var _a2;
        return (_a2 = props.name) !== null && _a2 !== void 0 ? _a2 : "";
      });
      const collectionIcon = vue.computed(() => {
        return UTS.mapGet($iconCollection.icons, innerName.value);
      });
      const webviewRef = vue.ref(null);
      const hasHost = vue.computed(() => {
        return innerName.value.indexOf("/") != -1;
      });
      const isIconify = vue.computed(() => {
        return !hasHost.value && innerName.value.includes(":");
      });
      const isImage = vue.computed(() => {
        return /\.(jpe?g|png|gif|bmp|webp|tiff?)$/i.test(innerName.value) || /^data:image\/(jpeg|png|gif|bmp|webp|tiff);base64,/.test(innerName.value);
      });
      const isSVG = vue.computed(() => {
        return /\.svg$/i.test(innerName.value) || innerName.value.startsWith("data:image/svg+xml") || innerName.value.startsWith("<svg");
      });
      const classes = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("".concat(name$4, "--font"), !isImage.value && !isIconify.value && !isSVG.value);
        cls2.set("".concat(name$4, "--image"), isImage.value || isIconify.value || isSVG.value);
        cls2.set(props.prefix, props.prefix.length > 0);
        cls2.set(props.lClass, props.lClass.length > 0);
        return cls2;
      });
      const styles = vue.computed(() => {
        var _a2;
        const style = /* @__PURE__ */ new Map();
        if (props.color != "" && props.color != null && !isImage.value && !isIconify.value) {
          style.set("color", props.color);
        }
        const size = (_a2 = addUnit(props.size)) !== null && _a2 !== void 0 ? _a2 : isImage.value || isIconify.value ? "32px" : null;
        if (size != null) {
          if (isImage.value || isIconify.value || isSVG.value) {
            style.set("height", size);
            style.set("width", size);
          } else {
            style.set("font-size", size);
          }
        }
        return style;
      });
      const iconCode = vue.computed(() => {
        var _a2;
        return (_a2 = icons$1.value.get(innerName.value)) !== null && _a2 !== void 0 ? _a2 : /[^\x00-\x7F]/.test(innerName.value) ? innerName.value : "";
      });
      const isError = vue.ref(false);
      const cacheMap = /* @__PURE__ */ new Map();
      const iconUrl = vue.computed(() => {
        var _a2;
        const hasIconsHost = $iconsHost != null && $iconsHost != "";
        if (isImage.value) {
          return hasHost.value ? innerName.value : ($iconsHost !== null && $iconsHost !== void 0 ? $iconsHost : "") + innerName.value;
        } else if (isIconify.value) {
          if (cacheMap.has(innerName.value) && !isError.value) {
            return UTS.mapGet(cacheMap, innerName.value);
          }
          const _host = "".concat(hasIconsHost ? $iconsHost : IconifyURL);
          const _icon = (_a2 = collectionIcon.value) !== null && _a2 !== void 0 ? _a2 : _host + "".concat(innerName.value, ".svg").replace(/:/g, "/");
          cacheMap.set(innerName.value, _icon);
          return _icon;
        } else if (isSVG.value) {
          return (/\.svg$/i.test(innerName.value) && $iconsHost != null && !hasHost.value ? $iconsHost : "") + innerName.value.replace(/'/g, '"');
        } else {
          return "";
        }
      });
      const imageError = () => {
        isError.value = true;
      };
      const imageload = () => {
        isError.value = false;
      };
      const __returned__ = { name: name$4, IconifyURL, $iconsHost, props, emits, $iconCollection, innerName, collectionIcon, webviewRef, hasHost, isIconify, isImage, isSVG, classes, styles, iconCode, isError, cacheMap, iconUrl, imageError, imageload };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$J = { "l-icon--font": { "": { "fontFamily": "l", "textAlign": "center" } }, "@FONT-FACE": [{ "fontFamily": "l", "src": 'url("/assets/t3.9658ea31.ttf")' }] };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        !$setup.isImage && !$setup.isIconify && !$setup.isSVG ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["l-icon", [$setup.classes, $props.lClass]]),
            style: vue.normalizeStyle([$setup.styles, $props.lStyle]),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
          },
          vue.toDisplayString($setup.iconCode),
          7
          /* TEXT, CLASS, STYLE */
        )) : !$setup.isSVG && !$setup.isIconify && $setup.isImage ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          class: vue.normalizeClass(["l-icon", [$setup.classes, $props.lClass]]),
          style: vue.normalizeStyle([$setup.styles, $props.lStyle]),
          src: $setup.iconUrl,
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("click"))
        }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(' <l-svg class="l-icon" :class="[classes, lClass]" :style="[styles, lStyle]" :color="color" :src="iconUrl" v-else :web="web" @error="imageError" @load="imageload" @click="$emit(\'click\')"></l-svg> ')
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$K], ["styles", [_style_0$J]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-icon/components/l-icon/l-icon.uvue"]]);
  function __awaiter(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __read(o2, n2) {
    var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m2)
      return o2;
    var i2 = m2.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done)
        ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m2 = i2["return"]))
          m2.call(i2);
      } finally {
        if (e2)
          throw e2.error;
      }
    }
    return ar;
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e2 = new Error(message);
    return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
  };
  class ArrowIcon {
    constructor(x, y2, size, type, color) {
      this.x = 0;
      this.y = 0;
      this.size = 0;
      this.type = "";
      this.color = "";
      this.x = x;
      this.y = y2;
      this.size = size;
      this.type = type;
      this.color = color;
    }
    draw(ctx) {
      const _a = this, x = _a.x, y2 = _a.y, size = _a.size, color = _a.color, type = _a.type;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      if (type === "left") {
        ctx.moveTo(x + size * 0.6042, y2 + size * 0.25);
        ctx.lineTo(x + size * 0.3542, y2 + size * 0.5);
        ctx.lineTo(x + size * 0.6042, y2 + size * 0.75);
      } else if (type === "right") {
        ctx.moveTo(x + size * (1 - 0.6042), y2 + size * 0.25);
        ctx.lineTo(x + size * (1 - 0.3542), y2 + size * 0.5);
        ctx.lineTo(x + size * (1 - 0.6042), y2 + size * 0.75);
      }
      ctx.stroke();
    }
    isCoordinateInside(x, y2) {
      return x >= this.x && x <= this.x + this.size && y2 >= this.y && y2 <= this.y + this.size;
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
    isCoordinateInside(x, y2) {
      return x >= this.x && x <= this.x + this.width && y2 >= this.y && y2 <= this.y + this.height;
    }
    setPosition(x, y2) {
      this.x = x;
      this.y = y2;
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
    drawCircle(ctx, x, y2, radius, color, border = false) {
      ctx.beginPath();
      if (border) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
      }
      ctx.fillStyle = color;
      ctx.arc(x, y2, radius, 0, Math.PI * 2);
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
        const _a = __read(item.split("-").map((v2) => {
          return parseInt(v2);
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
      const sortedDates = this.signedDates.sort((a2, b2) => {
        return b2 - a2;
      });
      return this.calculateContinuousCheckinDays(sortedDates);
    }
    calculateContinuousCheckinDays(sortedDates) {
      const dayInMillis = 24 * 60 * 60 * 1e3;
      const todayTime = new Date(this.currentYear, this.currentMonth - 1, this.today).getTime();
      let streak = 0;
      for (let i2 = 0; i2 < sortedDates.length; i2++) {
        if (i2 == 0) {
          if (todayTime - sortedDates[i2] > dayInMillis) {
            break;
          }
          if (sortedDates[i2] == todayTime || todayTime - sortedDates[i2] == dayInMillis) {
            streak = 1;
          }
        } else {
          if (sortedDates[i2 - 1] - sortedDates[i2] == dayInMillis) {
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
      const getGridSize = (i3) => {
        var _a, _b;
        const rect = (_a = this.el) === null || _a === void 0 ? null : _a.getBoundingClientRect();
        const height = (_b = this.opt.dayHeight) !== null && _b !== void 0 ? _b : 0;
        const width = rect == null ? 0 : rect.width / 7;
        const row = Math.floor(i3 / 7);
        const col = i3 % 7;
        const x = col * width;
        const y2 = row * height + this.opt.monthTitleHeight + this.opt.weekHeight;
        return {
          x,
          y: y2,
          width,
          height
          // 使用正确的变量名height
        };
      };
      for (var i2 = 0; i2 < beforeEmptyLength; i2++) {
        const _a = getGridSize(index), x = _a.x, y2 = _a.y, width = _a.width, height = _a.height;
        const date = lastMonthEndDay - beforeEmptyLength + i2 + 1;
        const time = new Date(last.year, last.month - 1, date).getTime();
        const day = new Day(date, last.month, last.year, last.year == this.currentYear && last.month == this.currentMonth, time == today, time < today, this);
        day.type = "last";
        day.setPosition(x, y2);
        day.setDimensions(width, height);
        arr.push(day);
        index++;
      }
      for (var i2 = 0; i2 < days; i2++) {
        const _b = getGridSize(index), x = _b.x, y2 = _b.y, width = _b.width, height = _b.height;
        const date = i2 + 1;
        const time = new Date(year, month - 1, date).getTime();
        const day = new Day(date, month, year, year == this.currentYear && month == this.currentMonth, time == today, time < today, this);
        day.setPosition(x, y2);
        day.setDimensions(width, height);
        arr.push(day);
        index++;
      }
      for (var i2 = 0; i2 < afterEmptyLength; i2++) {
        const _c = getGridSize(index), x = _c.x, y2 = _c.y, width = _c.width, height = _c.height;
        const date = i2 + 1;
        const time = new Date(next.year, next.month - 1, date).getTime();
        const day = new Day(date, next.month, next.year, next.year == this.currentYear && next.month == this.currentMonth, time == today, time < today, this);
        day.type = "next";
        day.setPosition(x, y2);
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
        } catch (e2) {
          throw new Error("参数有误");
        }
      }
    }
    drawIcon(ctx, size, x, y2, arrow, color) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      if (arrow === "left") {
        ctx.moveTo(x + size * 0.6042, y2 + size * 0.25);
        ctx.lineTo(x + size * 0.3542, y2 + size * 0.5);
        ctx.lineTo(x + size * 0.6042, y2 + size * 0.75);
      } else if (arrow === "right") {
        ctx.moveTo(x + size * (1 - 0.6042), y2 + size * 0.25);
        ctx.lineTo(x + size * (1 - 0.3542), y2 + size * 0.5);
        ctx.lineTo(x + size * (1 - 0.6042), y2 + size * 0.75);
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
    touch(e2) {
      var _a, _b, _c, _d;
      if (this.el == null)
        return null;
      const rect = this.el.getBoundingClientRect();
      const x = e2.clientX - rect.left;
      const y2 = e2.clientY - rect.top;
      const icon = UTS.arrayFind(this.arrowIcons, (icon2) => {
        return icon2.isCoordinateInside(x, y2);
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
        return day2.isCoordinateInside(x, y2);
      });
      if (day != null && day.type == "current") {
        this.selectDate = day;
        this.render();
        (_d = (_c = this.opt).select) === null || _d === void 0 ? null : _d.call(_c, day);
      }
    }
  }
  const _sfc_main$K = /* @__PURE__ */ vue.defineComponent({
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
      const onClick = (e2) => {
        calender === null || calender === void 0 ? null : calender.touch(e2);
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
          select: (e2) => {
            emits("select", e2);
          },
          panelChange: (e2) => {
            emits("panelChange", e2);
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
      }, set drawRef(v2) {
        drawRef = v2;
      }, get calender() {
        return calender;
      }, set calender(v2 = null) {
        calender = v2;
      }, styles, onClick, setOpt, instance, dailyRef };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$I = { "l-daily-punch": { "": { "width": "100%" } }, "calender": { "": { "marginTop": 0, "marginRight": "30rpx", "marginBottom": 0, "marginLeft": "30rpx" } } };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$J], ["styles", [_style_0$I]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.uvue"]]);
  const _sfc_main$J = vue.defineComponent({
    name: "fui-bottom-popup",
    emits: ["close", "update:visible"],
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: "#fff"
      },
      radius: {
        type: Number,
        default: 24
      },
      zIndex: {
        type: Number,
        default: 996
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      maskBackground: {
        type: String,
        default: "rgba(0,0,0,.6)"
      },
      safeArea: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const refId = "fui_bp_".concat(parseInt(Math.ceil(Math.random() * 1e6).toString(), 36));
      const refMkId = "fui_bpmk_".concat(parseInt(Math.ceil(Math.random() * 1e6).toString(), 36));
      return {
        refId,
        refMkId,
        iphoneX: false,
        isShow: false,
        element: null,
        mkElement: null
      };
    },
    watch: {
      visible: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow)
              this.close();
          }
        },
        immediate: true
      }
    },
    created() {
      this.iphoneX = this.isPhoneX();
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (!this.visible)
            this.close();
        }, 50);
      });
    },
    methods: {
      handleClose() {
        if (!this.maskClosable)
          return null;
        this.$emit("close");
        this.$emit("update:visible", false);
      },
      isPhoneX() {
        if (!this.safeArea)
          return false;
        const res = uni.getSystemInfoSync();
        let iphonex = false;
        let models = ["iphonex", "iphonexr", "iphonexsmax"];
        for (let i2 = 11; i2 < 20; i2++) {
          models.push("iphone".concat(i2));
          models.push("iphone".concat(i2, "mini"));
          models.push("iphone".concat(i2, "pro"));
          models.push("iphone".concat(i2, "promax"));
        }
        const model = res.model.replace(/\s/g, "").toLowerCase();
        const newModel = model.split("<")[0];
        if (models.includes(model) || models.includes(newModel) || res.safeAreaInsets.bottom > 0) {
          iphonex = true;
        }
        return iphonex;
      },
      open() {
        this.isShow = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this._animation(true);
          }, 50);
        });
      },
      close() {
        this.isShow = false;
        this._animation(false);
      },
      _animation(visible) {
        if (this.element == null) {
          this.element = this.$refs[this.refId];
        }
        if (this.mkElement == null) {
          this.mkElement = this.$refs[this.refMkId];
        }
        this.element.style.setProperty("transform", "translateY(".concat(visible ? "0" : "100%", ")"));
        this.element.style.setProperty("opacity", visible ? "1" : "0");
        this.mkElement.style.setProperty("opacity", visible ? "1" : "0");
        if (visible) {
          this.mkElement.style.setProperty("visibility", "visible");
          this.element.style.setProperty("visibility", "visible");
        } else {
          setTimeout(() => {
            this.mkElement.style.setProperty("visibility", "hidden");
            this.element.style.setProperty("visibility", "hidden");
          }, 300);
        }
      },
      stop() {
      }
    }
  });
  const _style_0$H = { "fui-bottom__popup-wrap": { "": { "position": "fixed", "left": 0, "right": 0, "top": 0, "bottom": 0, "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "center", "transitionProperty": "opacity,visibility", "transitionTimingFunction": "ease-in-out", "transitionDuration": "0.3s", "visibility": "hidden", "borderBottomWidth": 0, "overflow": "hidden", "opacity": 0 } }, "fui-bottom__popup": { "": { "width": "100%", "transitionProperty": "transform,opacity,visibility", "transitionTimingFunction": "ease-in-out", "transitionDuration": "0.3s", "minHeight": "20rpx", "overflow": "hidden", "transform": "translateY(100%)", "display": "flex", "flexDirection": "row", "position": "relative" } }, "fui-bp__safe-weex": { "": { "paddingBottom": 34 } }, "@TRANSITION": { "fui-bottom__popup-wrap": { "property": "opacity,visibility", "timingFunction": "ease-in-out", "duration": "0.3s" }, "fui-bottom__popup": { "property": "transform,opacity,visibility", "timingFunction": "ease-in-out", "duration": "0.3s" } } };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "fui-bottom__popup-wrap",
        style: vue.normalizeStyle({ zIndex: $props.zIndex, background: $props.maskBackground }),
        onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.handleClose && $options.handleClose(...args), ["stop"])),
        ref: $data.refMkId
      },
      [
        vue.createElementVNode(
          "view",
          {
            onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"])),
            ref: $data.refId,
            class: vue.normalizeClass(["fui-bottom__popup", { "fui-bp__safe-weex": $data.iphoneX && $props.safeArea }]),
            style: vue.normalizeStyle({ borderTopLeftRadius: "".concat($props.radius, "rpx"), borderTopRightRadius: "".concat($props.radius, "rpx"), background: $props.background })
          },
          [
            vue.renderSlot(_ctx.$slots, "default")
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_4$3 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$I], ["styles", [_style_0$H]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue"]]);
  const icons = new UTSJSONObject({
    "addressbook": "",
    "addfriends-fill": "",
    "addfriends": "",
    "backspace-fill": "",
    "backspace": "",
    "bankcard-fill": "",
    "bankcard": "",
    "camera-fill": "",
    "camera": "",
    "captcha-fill": "",
    "captcha": "",
    "cart-fill": "",
    "cart": "",
    "classify": "",
    "classify-fill": "",
    "comment-fill": "",
    "comment": "",
    "community-fill": "",
    "community": "",
    "coupon-fill": "",
    "coupon": "",
    "delete": "",
    "delete-fill": "",
    "edit": "",
    "edit-fill": "",
    "fabulous-fill": "",
    "fabulous": "",
    "find": "",
    "find-fill": "",
    "help-fill": "",
    "help": "",
    "home-fill": "",
    "home": "",
    "idcard-fill": "",
    "idcard": "",
    "info": "",
    "info-fill": "",
    "invite-fill": "",
    "invite": "",
    "kefu-fill": "",
    "kefu": "",
    "like-fill": "",
    "like": "",
    "location": "",
    "location-fill": "",
    "lock": "",
    "lock-fill": "",
    "mail-fill": "",
    "mail": "",
    "message": "",
    "message-fill": "",
    "mobile-fill": "",
    "mobile": "",
    "more": "",
    "more-fill": "",
    "my-fill": "",
    "my": "",
    "principal": "",
    "notice-fill": "",
    "notice": "",
    "order": "",
    "order-fill": "",
    "picture": "",
    "picture-fill": "",
    "setup-fill": "",
    "setup": "",
    "share": "",
    "share-fill": "",
    "shop": "",
    "shop-fill": "",
    "star-fill": "",
    "star": "",
    "starhalf": "",
    "stepon-fill": "",
    "stepon": "",
    "wait-fill": "",
    "wait": "",
    "warning": "",
    "warning-fill": "",
    "plus": "",
    "plussign-fill": "",
    "plussign": "",
    "minus": "",
    "minussign": "",
    "minussign-fill": "",
    "close": "",
    "clear": "",
    "clear-fill": "",
    "checkbox-fill": "",
    "checkround": "",
    "checkbox": "",
    "check": "",
    "pulldown-fill": "",
    "pullup": "",
    "pullup-fill": "",
    "pulldown": "",
    "roundright-fill": "",
    "roundright": "",
    "arrowright": "",
    "arrowleft": "",
    "arrowdown": "",
    "left": "",
    "up": "",
    "right": "",
    "back": "",
    "top": "",
    "dropdown": "",
    "turningleft": "",
    "turningup": "",
    "turningright": "",
    "turningdown": "",
    "refresh": "",
    "loading": "",
    "search": "",
    "rotate": "",
    "screen": "",
    "signin": "",
    "calendar": "",
    "scan": "",
    "qrcode": "",
    "wallet": "",
    "telephone": "",
    "visible": "",
    "invisible": "",
    "menu": "",
    "operate": "",
    "slide": "",
    "list": "",
    "nonetwork": "",
    "partake": "",
    "qa": "",
    "barchart": "",
    "piechart": "",
    "linechart": "",
    "at": "",
    "face": "",
    "redpacket": "",
    "suspend": "",
    "link": "",
    "keyboard": "",
    "play": "",
    "video": "",
    "voice": "",
    "sina": "",
    "browser": "",
    "moments": "",
    "qq": "",
    "wechat": "",
    "balance": "",
    "bankcardpay": "",
    "wxpay": "",
    "alipay": "",
    "payment": "",
    "receive": "",
    "sendout": "",
    "evaluate": "",
    "aftersale": "",
    "warehouse": "",
    "transport": "",
    "delivery": "",
    "switch": "",
    "goods": "",
    "goods-fill": ""
  });
  const _sfc_main$I = vue.defineComponent({
    name: "fui-icon",
    emits: ["onclick"],
    props: {
      name: {
        type: String,
        default: ""
      },
      size: {
        type: [Object, String, Number],
        default: 0
      },
      unit: {
        type: String,
        default: "rpx"
      },
      color: {
        type: String,
        default: ""
      },
      fontWeight: {
        type: String,
        default: "normal"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      param: {
        type: String,
        default: "0"
      },
      //是否显示为主色调，color为空时有效。【内部保留属性】
      primary: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getSize() {
        let size;
        if (typeof this.size == "number") {
          size = this.size.toString() + this.unit;
        } else if (typeof this.size == "string") {
          size = this.size + this.unit;
        } else {
          size = this.size.toString() + this.unit;
        }
        return size;
      },
      isBind() {
        const size = this.getSize;
        let bind = false;
        if (size == "" || size == "px" || size == "rpx" || size == "0rpx" || size == "0px") {
          bind = true;
        }
        return bind;
      },
      getIcon() {
        const icon = this.icons.getString(this.name);
        return icon == null ? "" : icon;
      },
      getIconStyl() {
        const mp = /* @__PURE__ */ new Map();
        mp.set("fontWeight", this.fontWeight);
        mp.set("fontSize", this.getSize);
        mp.set("lineHeight", this.getSize);
        if (this.color != "")
          mp.set("color", this.color);
        return mp;
      }
    },
    data() {
      return {
        icons
      };
    },
    methods: {
      handleClick() {
        if (this.disabled)
          return null;
        this.$emit("onclick", this.param);
      }
    }
  });
  const _style_0$G = { "fui-icon": { "": { "fontFamily": "fuiFont" } }, "fui-icon__color": { "": { "!color": "#333333" } }, "fui-icon__active-color": { "": { "!color": "#465CFF" } }, "fui-icon__fontsize": { "": { "!fontSize": "64rpx", "!lineHeight": "64rpx" } }, "@FONT-FACE": [{ "fontFamily": "fuiFont", "src": 'url("/assets/fui-icon.9165208c.ttf")' }] };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.getIconStyl),
        class: vue.normalizeClass(["fui-icon", { "fui-icon__fontsize": $options.isBind, "fui-icon__active-color": $props.primary && $props.color == "", "fui-icon__color": $props.color == "" && !$props.primary }]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
      },
      vue.toDisplayString($options.getIcon),
      7
      /* TEXT, CLASS, STYLE */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$H], ["styles", [_style_0$G]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue"]]);
  const _sfc_main$H = vue.defineComponent({
    name: "fui-radio",
    props: {
      value: {
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
      color: {
        type: String,
        default: ""
      },
      normalColor: {
        type: String,
        default: ""
      },
      borderColor: {
        type: String,
        default: ""
      },
      borderRadius: {
        type: String,
        default: "100px"
      },
      isCheckMark: {
        type: Boolean,
        default: false
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
      },
      styleType: {
        type: Number,
        default: 1
      }
    },
    created() {
      this.val = this.checked;
      this.getParent("fui-radio-group");
      if (this.fuiRadioGroup != null) {
        const group = this.fuiRadioGroup;
        group.$data["childrens"].push(this);
        if (group.$props["modelValue"] != "") {
          this.val = this.value == group.$props["modelValue"];
        }
      }
      const parent = this.getParent("fui-label");
      if (parent) {
        const label = this.fuiLabel;
        label.$data["childrens"].push(this);
      }
    },
    watch: {
      checked(newVal) {
        this.val = newVal;
      },
      val(newVal) {
        if (newVal && this.fuiRadioGroup != null) {
          const group = this.fuiRadioGroup;
          group.$callMethod("changeValue", this.value, this);
        }
        setTimeout(() => {
          this.styleVal = newVal;
        }, 0);
      }
    },
    computed: {
      getStyl() {
        const mp = /* @__PURE__ */ new Map();
        mp.set("transform", "scale(".concat(this.scaleRatio, ")"));
        mp.set("border-radius", this.borderRadius);
        const color = this.val ? this.color : this.borderColor == "" ? this.color : this.borderColor;
        const bgColor = this.val ? this.color : this.normalColor;
        if (this.styleType == 1) {
          if (this.isCheckMark) {
            mp.set("border-color", "transparent");
            mp.set("background", "transparent");
          } else {
            if (color != "")
              mp.set("border-color", color);
            if (bgColor != "")
              mp.set("background", bgColor);
          }
        } else {
          if (color != "")
            mp.set("border-color", color);
          if (bgColor != "")
            mp.set("background", bgColor);
        }
        return mp;
      },
      getCheckMarkStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.checkMarkColor != "")
          mp.set("background", this.checkMarkColor);
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
    data() {
      return {
        val: false,
        styleVal: false,
        fuiLabel: null,
        fuiRadioGroup: null
      };
    },
    methods: {
      radioClick(e2) {
        e2.stopPropagation();
        this.radioChange();
      },
      radioChange() {
        if (this.disabled || this.val)
          return null;
        this.val = true;
      },
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        if (name2 == "fui-radio-group") {
          this.fuiRadioGroup = parent;
        } else {
          this.fuiLabel = parent;
        }
        return true;
      },
      labelClick() {
        this.radioChange();
      }
    }
  });
  const _style_0$F = { "fui-radio__input": { "": { "width": "40rpx", "height": "40rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "display": "flex", "boxSizing": "border-box", "flexShrink": 0, "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "overflow": "hidden", "position": "relative" } }, "fui-radio__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-radio__scale-center": { "": { "transformOrigin": "center center" } }, "fui-radio__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-radio__active-bgcolor": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF" } }, "fui-radio__color": { "": { "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-radio__normal-border": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-radio__background": { "": { "!backgroundImage": "none", "!backgroundColor": "#ffffff" } }, "fui-radio__mark-color": { "": { "!borderBottomColor": "#ffffff", "!borderRightColor": "#ffffff" } }, "fui-check__mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "boxSizing": "border-box", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%" } }, "fui-check__mark-circle": { "": { "width": "16rpx", "height": "16rpx", "borderTopLeftRadius": "16rpx", "borderTopRightRadius": "16rpx", "borderBottomRightRadius": "16rpx", "borderBottomLeftRadius": "16rpx" } }, "fui-radio__disabled": { "": { "opacity": 0.6 } } };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["fui-radio__input", [$props.scaleRatio != 1 ? "fui-radio__scale-".concat($props.scaleAlign) : "", $props.disabled ? "fui-radio__disabled" : "", $props.color == "" && $data.styleVal && (!$props.isCheckMark || $props.styleType == 2) ? "fui-radio__color" : "", $props.color == "" && $data.styleVal && !$props.isCheckMark && $props.styleType == 1 ? "fui-radio__active-bgcolor" : "", $props.normalColor == "" && !$data.styleVal && (!$props.isCheckMark || $props.styleType == 2) ? "fui-radio__background" : "", $props.color == "" && $data.styleVal && $props.styleType == 2 ? "fui-radio__background" : "", $props.borderColor == "" && !$data.styleVal && (!$props.isCheckMark || $props.styleType == 2) ? "fui-radio__normal-border" : ""]]),
        style: vue.normalizeStyle($options.getStyl),
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.radioClick && $options.radioClick(...args), ["stop"]))
      },
      [
        $data.val && $props.styleType == 1 ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["fui-check__mark", { "fui-radio__mark-color": $props.checkMarkColor == "" }]),
            style: vue.normalizeStyle($options.getMarkStyl)
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        $data.val && $props.styleType == 2 ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["fui-check__mark-circle", { "fui-radio__active-bgcolor": $props.checkMarkColor == "" }]),
            style: vue.normalizeStyle($options.getCheckMarkStyl)
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3$3 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$G], ["styles", [_style_0$F]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-radio/fui-radio.uvue"]]);
  const _sfc_main$G = vue.defineComponent({
    name: "fui-list-cell",
    emits: ["onclick"],
    props: {
      padding: {
        type: String,
        default: ""
      },
      marginTop: {
        type: Number,
        default: 0
      },
      marginBottom: {
        type: Number,
        default: 0
      },
      background: {
        type: String,
        default: ""
      },
      highlight: {
        type: Boolean,
        default: true
      },
      arrow: {
        type: Boolean,
        default: false
      },
      arrowColor: {
        type: String,
        default: ""
      },
      topBorder: {
        type: Boolean,
        default: false
      },
      bottomBorder: {
        type: Boolean,
        default: true
      },
      borderColor: {
        type: String,
        default: ""
      },
      topLeft: {
        type: Number,
        default: 0
      },
      topRight: {
        type: Number,
        default: 0
      },
      bottomLeft: {
        type: Number,
        default: -1
      },
      bottomRight: {
        type: Number,
        default: 0
      },
      radius: {
        type: String,
        default: "0"
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      getPadding() {
        const mp = /* @__PURE__ */ new Map();
        if (this.padding != "")
          mp.set("padding", this.padding);
        return mp;
      },
      getBorderColor() {
        const mp = /* @__PURE__ */ new Map();
        if (this.arrowColor != "")
          mp.set("border-color", this.arrowColor);
        return mp;
      },
      getTopLineStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.borderColor != "")
          mp.set("background", this.borderColor);
        mp.set("left", "".concat(this.topLeft, "rpx"));
        mp.set("right", "".concat(this.topRight, "rpx"));
        return mp;
      },
      getBtmLineStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.borderColor != "")
          mp.set("background", this.borderColor);
        mp.set("left", "".concat(this.bottomLeft == -1 ? 0 : this.bottomLeft, "rpx"));
        mp.set("right", "".concat(this.bottomRight, "rpx"));
        return mp;
      }
    },
    methods: {
      handleClick() {
        this.$emit("onclick", this.index);
      }
    }
  });
  const _style_0$E = { "fui-list__cell": { "": { "position": "relative", "width": "100%", "display": "flex", "flexDirection": "row", "boxSizing": "border-box" } }, "fui-list__cell-inner": { "": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "boxSizing": "border-box" } }, "fui-cell__arrow": { "": { "height": "40rpx", "width": "40rpx", "borderTopWidth": 3, "borderRightWidth": 3, "borderBottomWidth": 0, "borderLeftWidth": 0, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "transform": "rotate(45deg) scale(0.5)", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "flexShrink": 0, "marginLeft": "auto", "boxSizing": "border-box", "transformOrigin": "center center", "marginRight": "-5.8579rpx" } }, "fui-cell__border-top": { "": { "position": "absolute", "top": 0, "height": 0.5, "zIndex": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 0", "pointerEvents": "none" } }, "fui-cell__border-bottom": { "": { "position": "absolute", "bottom": 0, "height": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 100%", "zIndex": 1, "pointerEvents": "none" } }, "fui-cell__border-color": { "": { "!backgroundColor": "#EEEEEE" } }, "fui-list__cell-background": { "": { "!backgroundColor": "#FFFFFF" } }, "fui-list__cell-highlight": { "": { "!backgroundColor": "rgba(0,0,0,0.2)" } }, "fui-list__cell-padding": { "": { "!paddingTop": "32rpx", "!paddingRight": "32rpx", "!paddingBottom": "32rpx", "!paddingLeft": "32rpx" } }, "fui-list__cell-arrowcolor": { "": { "!borderTopColor": "#B2B2B2", "!borderRightColor": "#B2B2B2", "!borderBottomColor": "#B2B2B2", "!borderLeftColor": "#B2B2B2" } }, "fui-list__cell-bleft": { "": { "!left": "32rpx" } } };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["fui-list__cell", { "fui-list__cell-background": $props.background == "" }]),
      "hover-class": $props.highlight ? "fui-list__cell-highlight" : "",
      "hover-stay-time": 150,
      style: vue.normalizeStyle({ background: $props.background, marginTop: "".concat($props.marginTop, "rpx"), marginBottom: "".concat($props.marginBottom, "rpx"), borderRadius: $props.radius }),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args))
    }, [
      $props.topBorder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          style: vue.normalizeStyle($options.getTopLineStyl),
          class: vue.normalizeClass(["fui-cell__border-top", { "fui-cell__border-color": $props.borderColor == "" }])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" 外层设置 padding 会影响 absolute 定位的left和right值 ... "),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["fui-list__cell-inner", { "fui-list__cell-padding": $props.padding == "" }]),
          style: vue.normalizeStyle($options.getPadding)
        },
        [
          vue.renderSlot(_ctx.$slots, "default"),
          $props.arrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass(["fui-cell__arrow", { "fui-list__cell-arrowcolor": $props.arrowColor == "" }]),
              style: vue.normalizeStyle($options.getBorderColor)
            },
            null,
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.bottomBorder ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          style: vue.normalizeStyle($options.getBtmLineStyl),
          class: vue.normalizeClass(["fui-cell__border-bottom", { "fui-cell__border-color": $props.borderColor == "", "fui-list__cell-bleft": $props.bottomLeft == -1 }])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$F], ["styles", [_style_0$E]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.uvue"]]);
  const _sfc_main$F = vue.defineComponent({
    name: "fui-label",
    props: {
      //padding值：'20rpx 32rpx'
      padding: {
        type: String,
        default: ""
      },
      //margin值：'20rpx 32rpx'
      margin: {
        type: String,
        default: ""
      },
      full: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        childrens: []
      };
    },
    methods: {
      onclick() {
        if (this.childrens.length > 0) {
          this.childrens.forEach((item) => {
            item.$callMethod("labelClick");
          });
        }
      }
    }
  });
  const _style_0$D = { "fui-label__wrap": { "": { "boxSizing": "border-box" } }, "fui-label__full": { "": { "width": "100%" } } };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["fui-label__wrap", { "fui-label__full": $props.full }]),
        style: vue.normalizeStyle({ padding: $props.padding, margin: $props.margin }),
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.onclick && $options.onclick(...args), ["stop"]))
      },
      [
        vue.renderSlot(_ctx.$slots, "default")
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$E], ["styles", [_style_0$D]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-label/fui-label.uvue"]]);
  const _sfc_main$E = vue.defineComponent({
    name: "fui-radio-group",
    emits: ["change", "update:modelValue"],
    props: {
      name: {
        type: String,
        default: ""
      },
      modelValue: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        val: "",
        childrens: [],
        fuiForm: null
      };
    },
    watch: {
      modelValue(val) {
        this.modelChange(val);
      }
    },
    created() {
      const isForm = this.getParent("fui-form");
      if (isForm) {
        const form = this.fuiForm;
        form.$data["formChildren"].push(this);
      }
    },
    methods: {
      radioChange(e2) {
        this.$emit("change", e2);
        this.$emit("update:modelValue", e2);
      },
      changeValue(value, target) {
        if (value == this.val)
          return null;
        this.val = value;
        this.childrens.forEach((item) => {
          if (item !== target) {
            item.$data["val"] = false;
          }
        });
        this.radioChange(value);
      },
      modelChange(val) {
        this.childrens.forEach((item) => {
          if (item.$props["value"] == val) {
            item.$data["val"] = true;
          } else {
            item.$data["val"] = false;
          }
        });
      },
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        this.fuiForm = parent;
        return true;
      },
      //暂时做重置处理（还原需记录初始值）
      reset() {
        this.val = "";
        this.modelChange("");
        this.radioChange("");
      },
      getSubmitValue() {
        return this.val == "" ? this.modelValue : this.val;
      }
    }
  });
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_radio_group = vue.resolveComponent("radio-group");
    return vue.openBlock(), vue.createBlock(_component_radio_group, { name: $props.name }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$D], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.uvue"]]);
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
  const S$1 = "second";
  const MIN = "minute";
  const H$1 = "hour";
  const D$1 = "day";
  const W$1 = "week";
  const M$1 = "month";
  const Q$1 = "quarter";
  const Y$1 = "year";
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
  function isNumber$1(value) {
    return ["Int8", "UInt8", "Int16", "UInt16", "Int32", "UInt32", "Int64", "UInt64", "Int", "UInt", "Float", "Float16", "Float32", "Float64", "Double", "number"].includes(typeof value);
  }
  function prettyUnit(u2) {
    var _a;
    const special = /* @__PURE__ */ new Map([
      ["M", M$1],
      ["y", Y$1],
      ["w", W$1],
      ["d", D$1],
      ["D", DATE],
      ["h", H$1],
      ["m", MIN],
      ["s", S$1],
      ["ms", MS],
      ["Q", Q$1]
    ]);
    return (_a = special.get(u2)) !== null && _a !== void 0 ? _a : "".concat(u2).toLowerCase().replace(/s$/, "");
  }
  function monthDiff(a2, b2) {
    if (a2.date() < b2.date())
      return -monthDiff(b2, a2);
    const wholeMonthDiff = (b2.year() - a2.year()) * 12 + (b2.month() - a2.month());
    const anchor = a2.clone().add(wholeMonthDiff, M$1).valueOf();
    const c2 = b2.valueOf() - anchor < 0;
    const anchor2 = a2.clone().add(wholeMonthDiff + (c2 ? -1 : 1), M$1).valueOf();
    const decimalMonthDiff = (b2.valueOf() - anchor) / (c2 ? anchor - anchor2 : anchor2 - anchor);
    const result = wholeMonthDiff + decimalMonthDiff;
    const negatedResult = -result;
    const absResult = +negatedResult;
    const finalResult = !isNaN(absResult) ? absResult : 0;
    return finalResult;
  }
  function absFloor(n2) {
    return n2 < 0 ? Math.max(Math.ceil(n2), 0) : Math.floor(n2);
  }
  const en$1 = {
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
    ordinal: (n2, _2) => {
      const s2 = ["th", "st", "nd", "rd"];
      const v2 = n2 % 100;
      const i2 = (v2 - 20) % 10;
      const k = i2 < s2.length ? i2 : v2 < s2.length ? v2 : 0;
      return "[".concat(n2).concat(s2[k], "]");
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
    meridiem: (hour, minute, _2) => {
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
  localeState.locales.set("en", en$1);
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
        localeState.locales.forEach(function(_2, key) {
          list.push(key);
        });
        uni.__log__("warn", "at uni_modules/lime-dayuts/common/use.ts:46", '未知语言: "'.concat(locale2, '". 请使用以下已知语言之一:').concat(list.join(", ")));
      }
    }
    get locale() {
      return localeState.lang;
    }
    set(name2, locale2) {
      localeState.locales.set(name2, locale2);
    }
    has(name2) {
      return localeState.locales.has(name2);
    }
  }
  const dayutsIntl = new DayutsIntl();
  function parseLocale(preset, object = null, isLocal = false) {
    let l2 = null;
    if (preset == null)
      return dayutsIntl.locale;
    if (typeof preset == "string") {
      const presetLower = preset.toLowerCase();
      if (dayutsIntl.has(presetLower)) {
        l2 = presetLower;
      }
      if (object != null) {
        dayutsIntl.set(presetLower, object);
        l2 = presetLower;
      }
      const presetSplit = preset.split("-");
      if (l2 == null && presetSplit.length > 1) {
        return parseLocale(presetSplit[0]);
      }
    } else if (preset instanceof DayutsLocale) {
      dayutsIntl.set(preset.name, preset);
      l2 = preset.name;
    }
    if (!isLocal && l2 != null) {
      dayutsIntl.locale = l2;
    }
    return l2 !== null && l2 !== void 0 ? l2 : dayutsIntl.locale;
  }
  function tryParseNumberAtIndex(digits, index) {
    if (index >= 0 && index < digits.length) {
      if (digits[index] == null)
        return null;
      const parsedNumber = isNumber$1(digits[index]) ? digits[index] : parseInt("".concat(digits[index]), 10);
      if (!isNaN(parsedNumber)) {
        return parsedNumber;
      }
    }
    return null;
  }
  function createDateFromArray(d2, offset = 0) {
    var _a, _b, _c, _e2, _f, _g, _h;
    const year = (_a = tryParseNumberAtIndex(d2, 1 - offset)) !== null && _a !== void 0 ? _a : (/* @__PURE__ */ new Date()).getFullYear();
    const month = ((_b = tryParseNumberAtIndex(d2, 2 - offset)) !== null && _b !== void 0 ? _b : 1) - 1;
    const day = (_c = tryParseNumberAtIndex(d2, 3 - offset)) !== null && _c !== void 0 ? _c : 1;
    const hour = (_e2 = tryParseNumberAtIndex(d2, 4 - offset)) !== null && _e2 !== void 0 ? _e2 : 0;
    const minute = (_f = tryParseNumberAtIndex(d2, 5 - offset)) !== null && _f !== void 0 ? _f : 0;
    const second = (_g = tryParseNumberAtIndex(d2, 6 - offset)) !== null && _g !== void 0 ? _g : 0;
    const millisecond = ((_h = tryParseNumberAtIndex(d2, 7 - offset)) !== null && _h !== void 0 ? _h : 0).toString().substring(0, 3);
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
        const d2 = date.match(REGEX_PARSE);
        const isNull = d2 == null || Array.isArray(d2) && d2.length == 0;
        if (!isNull) {
          return createDateFromArray(d2);
        }
      }
      if (typeof date == "string")
        return new Date(date);
      if (Array.isArray(date)) {
        return createDateFromArray(date, 1);
      }
      if (isNumber$1(date))
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
      const instanceFactory = (d2, m2) => {
        const ins = dayuts(new Date(this.$y, m2, d2));
        return isStartOf ? ins : ins.endOf(D$1);
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
      if (unit == Y$1) {
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      } else if (unit == M$1) {
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      } else if (unit == W$1) {
        const weekStart = (_a = this.$locale().weekStart) !== null && _a !== void 0 ? _a : 0;
        const gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      } else if (unit == D$1 || unit == DATE) {
        return instanceFactorySet("".concat(utcPad, "Hours"), 0);
      } else if (unit == H$1) {
        return instanceFactorySet("".concat(utcPad, "Minutes"), 1);
      } else if (unit == MIN) {
        return instanceFactorySet("".concat(utcPad, "Seconds"), 2);
      } else if (unit == S$1) {
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
      const arg = unit == D$1 ? this.$D + (int - this.$W) : int;
      const setDateUnit = (date, unit2, arg2) => {
        if (unit2 == D$1 || unit2 == DATE) {
          date.$d.setDate(arg2);
        } else if (unit2 == M$1) {
          date.$d.setMonth(arg2);
        } else if (unit2 == Y$1) {
          date.$d.setFullYear(arg2);
        } else if (unit2 == H$1) {
          date.$d.setHours(arg2);
        } else if (unit2 == MIN) {
          date.$d.setMinutes(arg2);
        } else if (unit2 == S$1) {
          date.$d.setSeconds(arg2);
        } else if (unit2 == MS) {
          date.$d.setMilliseconds(arg2);
        }
      };
      if (unit == M$1 || unit == Y$1) {
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
      if (unit == D$1) {
        return this.day();
      } else if (unit == DATE) {
        return this.date();
      } else if (unit == M$1) {
        return this.month();
      } else if (unit == Y$1) {
        return this.year();
      } else if (unit == H$1) {
        return this.hour();
      } else if (unit == MIN) {
        return this.minute();
      } else if (unit == S$1) {
        return this.second();
      } else if (unit == MS) {
        return this.millisecond();
      }
      return 0;
    }
    year(input = null) {
      if (input == null)
        return this.$y;
      return this.set(Y$1, input);
    }
    month(input = null) {
      if (input == null)
        return this.$M;
      return this.set(M$1, input);
    }
    day(input = null) {
      if (input == null)
        return this.$W;
      return this.set(D$1, input);
    }
    date(input = null) {
      if (input == null)
        return this.$D;
      return this.set(DATE, input);
    }
    hour(input = null) {
      if (input == null)
        return this.$H;
      return this.set(H$1, input);
    }
    minute(input = null) {
      if (input == null)
        return this.$m;
      return this.set(MIN, input);
    }
    second(input = null) {
      if (input == null)
        return this.$s;
      return this.set(S$1, input);
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
      const instanceFactorySet = (n2) => {
        const d2 = dayuts(this);
        return d2.date(d2.date() + Math.round(n2 * number));
      };
      if (unit == M$1) {
        return this.set(M$1, this.$M + number);
      }
      if (unit == Y$1) {
        return this.set(Y$1, this.$y + number);
      }
      if (unit == D$1) {
        return instanceFactorySet(1);
      }
      if (unit == W$1) {
        return instanceFactorySet(7);
      }
      const steps = /* @__PURE__ */ new Map([
        [MIN, MILLISECONDS_A_MINUTE],
        [H$1, MILLISECONDS_A_HOUR],
        [S$1, MILLISECONDS_A_SECOND]
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
      const meridiemFunc = meridiem !== null && meridiem !== void 0 ? meridiem : (hour, _2, isLowercase) => {
        const m2 = hour < 12 ? "AM" : "PM";
        return isLowercase ? m2.toLowerCase() : m2;
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
        case Y$1:
          result = getMonth() / 12;
          break;
        case M$1:
          result = getMonth();
          break;
        case Q$1:
          result = getMonth() / 3;
          break;
        case W$1:
          result = (diff - zoneDelta) / MILLISECONDS_A_WEEK;
          break;
        case D$1:
          result = (diff - zoneDelta) / MILLISECONDS_A_DAY;
          break;
        case H$1:
          result = diff / MILLISECONDS_A_HOUR;
          break;
        case MIN:
          result = diff / MILLISECONDS_A_MINUTE;
          break;
        case S$1:
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
      return this.endOf(M$1).$D;
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
      const T2 = [
        { l: "s", r: 44, d: S$1 },
        { l: "m", r: 89 },
        { l: "mm", r: 44, d: MIN },
        { l: "h", r: 89 },
        { l: "hh", r: 21, d: H$1 },
        { l: "d", r: 35 },
        { l: "dd", r: 25, d: D$1 },
        { l: "M", r: 45 },
        { l: "MM", r: 10, d: M$1 },
        { l: "y", r: 17 },
        { l: "yy", d: Y$1 }
      ];
      const Tl = T2.length;
      let result = 0;
      let out = "";
      let isFuture = false;
      for (let i2 = 0; i2 < Tl; i2 += 1) {
        let t2 = T2[i2];
        if (t2.d != null) {
          result = isFrom ? dayuts(input).diff(instance, t2.d, true) : instance.diff(input, t2.d, true);
        }
        let abs = Math.round(Math.abs(result));
        isFuture = result > 0;
        if (t2.r == null || t2.r != null && abs <= t2.r) {
          if (abs <= 1 && i2 > 0)
            t2 = T2[i2 - 1];
          const format = loc[t2.l];
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
  let RadioItem$1 = class RadioItem2 extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            deviceTitle: { type: String, optional: false },
            iccid: { type: String, optional: false },
            cardid: { type: String, optional: false },
            cardState: { type: String, optional: false },
            currentPackage: { type: String, optional: false },
            useDate: { type: String, optional: false },
            percent: { type: Number, optional: false },
            total: { type: String, optional: false },
            checked: { type: Boolean, optional: true }
          };
        },
        name: "RadioItem"
      };
    }
    constructor(options, metadata = RadioItem2.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.deviceTitle = this.__props__.deviceTitle;
      this.iccid = this.__props__.iccid;
      this.cardid = this.__props__.cardid;
      this.cardState = this.__props__.cardState;
      this.currentPackage = this.__props__.currentPackage;
      this.useDate = this.__props__.useDate;
      this.percent = this.__props__.percent;
      this.total = this.__props__.total;
      this.checked = this.__props__.checked;
      delete this.__props__;
    }
  };
  const _sfc_main$D = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "message",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const checkIns = vue.ref(["2025-07-07", "2025-07-08", "2025-07-09"]);
      const today = vue.ref(dayuts().format("MM-DD"));
      const showCalendar = vue.ref(false);
      const isShowMoreDevice = vue.ref(false);
      const currentDay = vue.ref((/* @__PURE__ */ new Date()).getTime());
      const activeTab = vue.ref(0);
      const minDate = new Date(2022, 0, 10).getTime();
      const maxDate = new Date(2025, 7, 12).getTime();
      const customFormat = (day) => {
        const date = day.date;
        date.getFullYear();
        date.getMonth() + 1;
        const curDate = date.getDate();
        uni.__log__("log", "at pages/message/message.uvue:130", day.key);
        day.prefix = "";
        const specialDates = /* @__PURE__ */ new Set([7, 8, 10]);
        if (specialDates.has(curDate)) {
          day.suffix = "true";
        }
        return day;
      };
      const onChange = (time) => {
        uni.__log__("log", "at pages/message/message.uvue:144", time);
      };
      const select = (day) => {
        today.value = dayuts(day.fullDate).format("YYYY-MM-DD");
        uni.__log__("log", "at pages/message/message.uvue:151", today.value);
        currentDay.value = new Date(today.value).getTime();
        showCalendar.value = false;
      };
      const change = (res) => {
        uni.__log__("log", "at pages/message/message.uvue:156", "res", res);
      };
      const ShowCalendar = () => {
        showCalendar.value = !showCalendar.value;
      };
      const hideCalendar = () => {
        showCalendar.value = false;
      };
      const showMoreDevice = () => {
        isShowMoreDevice.value = true;
      };
      const closePopup = () => {
        isShowMoreDevice.value = false;
      };
      const currentDeviceInfo = vue.ref(new RadioItem$1({
        deviceTitle: "",
        iccid: "",
        cardid: "",
        cardState: "",
        currentPackage: "",
        useDate: "",
        percent: 0,
        total: "",
        checked: true
      }));
      const radioItems = vue.ref([new RadioItem$1({
        deviceTitle: "设备信息",
        iccid: "1123456667777887",
        cardid: "13000001111",
        cardState: "在用",
        currentPackage: "店长推荐【终身流量】",
        useDate: "2025-07-07",
        percent: 50,
        total: "100"
      }), new RadioItem$1({
        deviceTitle: "设备信息1",
        iccid: "1123456667777888",
        cardid: "13000001111",
        cardState: "停机",
        currentPackage: "店长推荐【100G流量】",
        useDate: "2025-07-08",
        percent: 70,
        total: "200"
      }), new RadioItem$1({
        deviceTitle: "设备信息2",
        cardid: "13000001111",
        iccid: "310203030443",
        cardState: "注销",
        currentPackage: "加油包",
        useDate: "2025-07-09",
        percent: 100,
        total: "300"
      })]);
      const getValue = (e2) => {
        const selectedItem = UTS.arrayFind(radioItems.value, (item) => {
          return item.iccid == e2;
        });
        if (selectedItem != null) {
          uni.__log__("log", "at pages/message/message.uvue:222", selectedItem);
          selectedItem.checked = true;
          currentDeviceInfo.value = selectedItem;
        }
      };
      const currentInfo = () => {
        radioItems.value.forEach((item) => {
          item.checked = false;
        });
        radioItems.value[0].checked = true;
        currentDeviceInfo.value = radioItems.value[0];
      };
      const deviceDetail = () => {
        uni.navigateTo({
          url: "/pages/message/messageDeviceDetail/messageDeviceDetail"
        });
      };
      const msgSystem = () => {
        uni.navigateTo({
          url: "/pages/message/messageSystem/messageSystem"
        });
      };
      vue.onMounted(() => {
        currentInfo();
      });
      const __returned__ = { checkIns, today, showCalendar, isShowMoreDevice, currentDay, activeTab, minDate, maxDate, customFormat, onChange, select, change, ShowCalendar, hideCalendar, showMoreDevice, closePopup, currentDeviceInfo, radioItems, getValue, currentInfo, deviceDetail, msgSystem };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$7 = "/static/down.png";
  const _imports_1$2 = "/static/notice.png";
  const _imports_1$1 = "/static/vedio.png";
  const _imports_3$1 = "/static/people.png";
  const _imports_4 = "/static/mobile.png";
  const _style_0$C = { "container": { "": { "width": "100%", "height": "100%", "position": "relative", "backgroundColor": "#f3f3f3" } }, "data-strip": { ".container ": { "width": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center", "backgroundColor": "#ffffff", "paddingRight": "20rpx" } }, "rili": { ".container .data-strip ": { "flex": 3, "height": "95rpx" } }, "down": { ".container .data-strip ": { "width": "32rpx", "height": "32rpx" }, ".container .content-box .sub-nav .today ": { "width": "25rpx", "height": "25rpx" } }, "content-box": { ".container ": { "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "sub-nav": { ".container .content-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "today": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "width": "140rpx" } }, "notice": { ".container .content-box .sub-nav .select ": { "width": "48rpx", "height": "48rpx" } }, "tab-content": { ".container .content-box ": { "width": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "item-content": { ".container .content-box .tab-content ": { "width": "100%", "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "marginTop": "30rpx" } }, "title-box": { ".container .content-box .tab-content .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "30rpx" } }, "title": { ".container .content-box .tab-content .item-content .title-box ": { "fontSize": "30rpx", "color": "#333333", "fontWeight": "bold" } }, "more": { ".container .content-box .tab-content .item-content .title-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "item-detail": { ".container .content-box .tab-content .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "item-left": { ".container .content-box .tab-content .item-content .item-detail ": { "display": "flex", "flexDirection": "row" } }, "device-img": { ".container .content-box .tab-content .item-content .item-detail .item-left ": { "width": "200rpx", "height": "100rpx", "marginRight": "20rpx" } }, "item-info": { ".container .content-box .tab-content .item-content .item-detail .item-left ": { "display": "flex", "flexDirection": "column", "alignItems": "flex-start", "justifyContent": "space-between" } }, "item-icon": { ".container .content-box .tab-content .item-content .item-detail ": { "width": "50rpx", "height": "50rpx" } }, "calendar-box": { ".container ": { "width": "100%", "backgroundColor": "#ffffff" } }, "btn-chanel-box": { ".container .calendar-box ": { "position": "absolute", "width": "85%", "bottom": "45rpx", "left": "60rpx", "borderTopLeftRadius": "50rpx", "borderTopRightRadius": "50rpx", "borderBottomRightRadius": "50rpx", "borderBottomLeftRadius": "50rpx" } }, "popup-title": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingTop": 0, "paddingRight": "40rpx", "paddingBottom": 0, "paddingLeft": "40rpx" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "30rpx", "paddingRight": 0, "paddingBottom": "30rpx", "paddingLeft": 0, "position": "relative" } }, "fui-sub__title": { ".container ": { "textAlign": "center", "fontSize": "24rpx", "color": "#7F7F7F", "transform": "scale(0.9)" } }, "fui-scroll__view": { ".container ": { "width": "100%", "height": "50%" } }, "fui-list__cell": { ".container ": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } } };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_date_strip = resolveEasycom(vue.resolveDynamicComponent("l-date-strip"), __easycom_0$9);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_0$8);
    const _component_l_daily_punch = resolveEasycom(vue.resolveDynamicComponent("l-daily-punch"), __easycom_0$7);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_4$3);
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    const _component_fui_radio = resolveEasycom(vue.resolveDynamicComponent("fui-radio"), __easycom_3$3);
    const _component_fui_list_cell = resolveEasycom(vue.resolveDynamicComponent("fui-list-cell"), __easycom_4$2);
    const _component_fui_label = resolveEasycom(vue.resolveDynamicComponent("fui-label"), __easycom_4$1);
    const _component_fui_radio_group = resolveEasycom(vue.resolveDynamicComponent("fui-radio-group"), __easycom_6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "data-strip" }, [
        vue.createElementVNode("view", { class: "rili" }, [
          vue.createVNode(_component_l_date_strip, {
            format: $setup.customFormat,
            switchMode: "week",
            value: $setup.currentDay,
            minDate: $setup.minDate,
            height: "95rpx",
            shape: "square",
            onChange: $setup.onChange
          }, null, 8, ["value", "minDate"])
        ]),
        vue.createElementVNode("image", {
          class: "down",
          onClick: $setup.ShowCalendar,
          src: _imports_0$7
        })
      ]),
      vue.createElementVNode("view", { class: "content-box" }, [
        vue.createElementVNode("view", { class: "sub-nav" }, [
          vue.createElementVNode("view", {
            class: "today",
            onClick: $setup.showMoreDevice
          }, [
            vue.createElementVNode("text", null, "设备编号"),
            vue.createElementVNode("image", {
              class: "down",
              src: _imports_0$7
            })
          ]),
          vue.createElementVNode("view", { class: "select" }, [
            vue.createElementVNode("image", {
              class: "notice",
              src: _imports_1$2,
              onClick: $setup.msgSystem
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "tab-content" }, [
          vue.createElementVNode("view", { class: "item-content" }, [
            vue.createElementVNode("view", { class: "title-box" }, [
              vue.createElementVNode("text", { class: "title" }, "设备名称"),
              vue.createElementVNode("view", {
                class: "more",
                onClick: $setup.deviceDetail
              }, [
                vue.createElementVNode("text", null, "更多"),
                vue.createVNode(_component_l_icon, {
                  name: "chevron-right",
                  size: "20"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "item-detail" }, [
              vue.createElementVNode("view", { class: "item-left" }, [
                vue.createElementVNode("image", {
                  class: "device-img",
                  src: _imports_1$1
                }),
                vue.createElementVNode("view", { class: "item-info" }, [
                  vue.createElementVNode("text", null, "人形侦测"),
                  vue.createElementVNode("text", null, "15:29")
                ])
              ]),
              vue.createElementVNode("image", {
                class: "item-icon",
                mode: "aspectFit",
                src: _imports_3$1
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "item-content" }, [
            vue.createElementVNode("view", { class: "title-box" }, [
              vue.createElementVNode("text", { class: "title" }, "设备名称1"),
              vue.createElementVNode("view", { class: "more" }, [
                vue.createElementVNode("text", null, "更多"),
                vue.createVNode(_component_l_icon, {
                  name: "chevron-right",
                  size: "20"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "item-detail" }, [
              vue.createElementVNode("view", { class: "item-left" }, [
                vue.createElementVNode("image", {
                  class: "device-img",
                  src: _imports_1$1
                }),
                vue.createElementVNode("view", { class: "item-info" }, [
                  vue.createElementVNode("text", null, "移动侦测"),
                  vue.createElementVNode("text", null, "15:29")
                ])
              ]),
              vue.createElementVNode("image", {
                class: "item-icon",
                mode: "aspectFit",
                src: _imports_4
              })
            ])
          ])
        ])
      ]),
      vue.createVNode(_component_fui_bottom_popup, {
        visible: $setup.showCalendar,
        onClose: $setup.hideCalendar
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "calendar-box" }, [
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
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible"]),
      vue.createVNode(_component_fui_bottom_popup, {
        visible: $setup.isShowMoreDevice,
        onClose: $setup.closePopup
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "fui-scroll__wrap" }, [
            vue.createElementVNode("view", { class: "popup-title" }, [
              vue.createElementVNode("text", null, "设备列表"),
              vue.createElementVNode("view", { onClick: $setup.closePopup }, [
                vue.createVNode(_component_fui_icon, {
                  name: "close",
                  size: 40
                })
              ])
            ]),
            vue.createVNode(_component_fui_radio_group, { onChange: $setup.getValue }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.radioItems, (item, index) => {
                    return vue.openBlock(), vue.createBlock(
                      _component_fui_label,
                      { key: index },
                      {
                        default: vue.withCtx(() => [
                          vue.createVNode(
                            _component_fui_list_cell,
                            null,
                            {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", { class: "fui-list__cell" }, [
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(item.deviceTitle),
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createVNode(_component_fui_radio, {
                                    checked: item.checked,
                                    value: item.iccid
                                  }, null, 8, ["checked", "value"])
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible"])
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$C], ["styles", [_style_0$C]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/message.uvue"]]);
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "mine",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const localFiles = () => {
        uni.navigateTo({
          url: "/pages/mine/localFiles/localFiles"
        });
      };
      const userInfo = () => {
        uni.navigateTo({
          url: "/pages/mine/userInfo/userInfo"
        });
      };
      const rechargeDataTraffic = () => {
        uni.navigateTo({
          url: "/pages/mine/rechargeDataTraffic/rechargeDataTraffic"
        });
      };
      const myorders = () => {
        uni.navigateTo({
          url: "/pages/mine/myOrders/myOrders"
        });
      };
      const helpCenter = () => {
        uni.navigateTo({
          url: "/pages/mine/helpCenter/helpCenter"
        });
      };
      const msgCenter = () => {
        uni.switchTab({
          url: "/pages/message/message"
        });
      };
      const feedback = () => {
        uni.navigateTo({
          url: "/pages/mine/feeback/feeback"
        });
      };
      const systemSetting = () => {
        uni.navigateTo({
          url: "/pages/mine/systemSetting/systemSetting"
        });
      };
      const aboutPage = () => {
        uni.navigateTo({
          url: "/pages/mine/about/about"
        });
      };
      const __returned__ = { localFiles, userInfo, rechargeDataTraffic, myorders, helpCenter, msgCenter, feedback, systemSetting, aboutPage };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$6 = "/static/mine/local.png";
  const _imports_1 = "/static/mine/cloud.png";
  const _imports_2 = "/static/mine/msgList.png";
  const _imports_3 = "/static/mine/user.png";
  const _imports_0$5 = "/static/mine/right.png";
  const _imports_5 = "/static/mine/liuliang.png";
  const _imports_6 = "/static/mine/order.png";
  const _imports_7 = "/static/mine/quetion.png";
  const _imports_8 = "/static/mine/online.png";
  const _imports_9 = "/static/mine/advice.png";
  const _imports_10 = "/static/mine/setting.png";
  const _imports_11 = "/static/mine/about.png";
  const _style_0$B = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column", "backgroundColor": "#f1f1f1" } }, "files": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "width": "100%", "height": "100rpx", "backgroundColor": "#ffffff", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "paddingTop": "70rpx", "paddingRight": "80rpx", "paddingBottom": "70rpx", "paddingLeft": "80rpx", "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0 } }, "file": { ".container .files ": { "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "fileIcon": { ".container .files .file ": { "width": "48rpx", "height": "48rpx", "marginBottom": "15rpx" } }, "file-text": { ".container .files .file ": { "fontSize": "20rpx", "color": "#333333", "fontWeight": "bold" } }, "tools-list": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "item": { ".container .tools-list ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "height": "100rpx", "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "info": { ".container .tools-list .item ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "40rpx" } }, "item-icon": { ".container .tools-list .item .info ": { "width": "48rpx", "height": "48rpx" } }, "item-text": { ".container .tools-list .item .info ": { "fontSize": "25rpx", "color": "#333333", "marginLeft": "20rpx" } }, "right-icon": { ".container .tools-list .item ": { "width": "35rpx", "height": "35rpx" } }, "no-bottom": { ".container .tools-list ": { "borderBottomWidth": "medium", "borderBottomStyle": "none", "borderBottomColor": "#000000" } } };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "files" }, [
        vue.createElementVNode("view", {
          class: "file",
          onClick: $setup.localFiles
        }, [
          vue.createElementVNode("image", {
            class: "fileIcon",
            src: _imports_0$6,
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
        vue.createElementVNode("view", {
          class: "file",
          onClick: $setup.msgCenter
        }, [
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.rechargeDataTraffic
        }, [
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.myorders
        }, [
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.helpCenter
        }, [
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
              src: _imports_0$5,
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.feedback
        }, [
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.systemSetting
        }, [
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ]),
        vue.createElementVNode("view", {
          class: "item no-bottom",
          onClick: $setup.aboutPage
        }, [
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ])
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["styles", [_style_0$B]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/mine.uvue"]]);
  const _sfc_main$B = vue.defineComponent({
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
      onChange(e2) {
        e2.stopPropagation();
        if (this.disabled)
          return null;
        this.emitChange(!this.val);
      },
      emitChange(e2) {
        this.val = e2;
        this.$emit("change", e2);
        this.$emit("update:checked", e2);
      },
      labelClick() {
        if (this.disabled)
          return null;
        this.emitChange(!this.val);
      },
      //provide/inject方式（可能有警告，设置default:null也无法去除，应该是底层有bug）
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        if (name2 == "fui-label") {
          this.fuiLabel = parent;
        } else if (name2 == "fui-form") {
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
  const _style_0$A = { "fui-switch__input": { "": { "flexShrink": 0 } }, "fui-switch__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-switch__scale-center": { "": { "transformOrigin": "center center" } }, "fui-switch__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-switch__size-switch": { "": { "width": 52, "height": 32 } }, "fui-switch__size-checkbox": { "": { "width": "40rpx", "height": "40rpx" } }, "fui-switch__checkbox-self": { "": { "width": "40rpx", "height": "40rpx", "borderTopLeftRadius": 40, "borderTopRightRadius": 40, "borderBottomRightRadius": 40, "borderBottomLeftRadius": 40, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "relative", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopColor": "#CCCCCC", "borderRightColor": "#CCCCCC", "borderBottomColor": "#CCCCCC", "borderLeftColor": "#CCCCCC", "boxSizing": "border-box", "overflow": "hidden" } }, "fui-switch__input-def": { "": { "position": "relative", "width": 52, "height": 32, "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#CCCCCC", "borderRightColor": "#CCCCCC", "borderBottomColor": "#CCCCCC", "borderLeftColor": "#CCCCCC", "borderTopLeftRadius": 16, "borderTopRightRadius": 16, "borderBottomRightRadius": 16, "borderBottomLeftRadius": 16, "boxSizing": "border-box" } }, "fui-switch__normal-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#dfdfdf" } }, "fui-switch__checked-color": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-switch__normal-bcolor": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-switch__input-before": { "": { "position": "absolute", "top": 0, "left": 0, "width": 50, "height": 30, "borderTopLeftRadius": 15, "borderTopRightRadius": 15, "borderBottomRightRadius": 15, "borderBottomLeftRadius": 15, "transitionProperty": "transform", "transitionDuration": "0.3s" } }, "fui-switch__before-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__input-after": { "": { "position": "absolute", "top": 0, "left": 0, "width": 30, "height": 30, "borderTopLeftRadius": 15, "borderTopRightRadius": 15, "borderBottomRightRadius": 15, "borderBottomLeftRadius": 15, "boxShadow": "0 0 6rpx rgba(0, 0, 0, 0.4)", "transitionProperty": "transform", "transitionDuration": "0.3s", "display": "flex", "alignItems": "center", "justifyContent": "center", "transform": "translateX(0)" } }, "fui-switch__after-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__input--before": { "": { "transform": "scale(0)" } }, "fui-switch__input--after": { "": { "transform": "translateX(20px)" } }, "fui-switch__check-mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%", "boxSizing": "border-box" } }, "fui-switch__circle-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__checkbox-disabled": { "": { "opacity": 0.6 } }, "@TRANSITION": { "fui-switch__input-before": { "property": "transform", "duration": "0.3s" }, "fui-switch__input-after": { "property": "transform", "duration": "0.3s" } } };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["styles", [_style_0$A]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue"]]);
  const _sfc_main$A = vue.defineComponent({
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
      handleTap(e2) {
        if (this.disabled)
          return null;
        this.$emit("onclick", e2);
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
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
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
  const _style_0$z = { "fui-button__wrap": { "": { "position": "relative", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "boxSizing": "border-box", "overflow": "hidden" } }, "fui-button__flex-1": { "": { "width": "100%" } }, "fui-button__opacity": { "": { "opacity": 0.5 } }, "fui-button__hover": { "": { "position": "absolute", "left": 0, "right": 0, "top": 0, "bottom": 0, "backgroundColor": "rgba(0,0,0,0.2)", "zIndex": 2, "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "visibility": "hidden", "pointerEvents": "none" } }, "fui-button__spin": { "": { "width": "32rpx", "height": "32rpx", "borderTopWidth": 2, "borderRightWidth": 2, "borderBottomWidth": 2, "borderLeftWidth": 2, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "transitionDuration": "600ms", "transitionProperty": "transform", "transitionTimingFunction": "linear", "transform": "rotate(0deg)", "boxSizing": "border-box", "marginRight": "8rpx", "position": "relative" } }, "fui-button__spin-dot": { "": { "position": "absolute", "width": "12rpx", "height": "12rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx", "left": 0, "top": 0 } }, "fui-button__text": { "": { "textAlign": "center" } }, "fui-text__bold": { "": { "fontWeight": "bold" } }, "fui-button__link": { "": { "!borderTopColor": "rgba(0,0,0,0)", "!borderRightColor": "rgba(0,0,0,0)", "!borderBottomColor": "rgba(0,0,0,0)", "!borderLeftColor": "rgba(0,0,0,0)", "!backgroundColor": "rgba(0,0,0,0)" } }, "fui-button__primary": { "": { "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF", "!backgroundImage": "none", "!backgroundColor": "#465CFF" } }, "fui-button__success": { "": { "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F", "!backgroundImage": "none", "!backgroundColor": "#09BE4F" } }, "fui-button__warning": { "": { "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703", "!backgroundImage": "none", "!backgroundColor": "#FFB703" } }, "fui-button__danger": { "": { "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B", "!backgroundImage": "none", "!backgroundColor": "#FF2B2B" } }, "fui-button__purple": { "": { "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF", "!backgroundImage": "none", "!backgroundColor": "#6831FF" } }, "fui-button__gray": { "": { "!borderTopColor": "#F8F8F8", "!borderRightColor": "#F8F8F8", "!borderBottomColor": "#F8F8F8", "!borderLeftColor": "#F8F8F8", "!backgroundImage": "none", "!backgroundColor": "#F8F8F8" } }, "fui-btn__gray-color": { "": { "!color": "#465CFF" } }, "fui-button__height": { "": { "!height": "96rpx" } }, "fui-button__height-text": { "": { "!height": "96rpx", "!lineHeight": "96rpx" } }, "fui-button__size": { "": { "!fontSize": "32rpx" } }, "fui-button__radius": { "": { "!borderTopLeftRadius": "16rpx", "!borderTopRightRadius": "16rpx", "!borderBottomRightRadius": "16rpx", "!borderBottomLeftRadius": "16rpx" } }, "@TRANSITION": { "fui-button__spin": { "duration": "600ms", "property": "transform", "timingFunction": "linear" } } };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["styles", [_style_0$z]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-button/fui-button.uvue"]]);
  const _sfc_main$z = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
              uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:62", res);
              if (res.confirm) {
                uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:64", "调用解绑API...");
                switchVal.value = false;
                uni.showToast({
                  title: "已成功解绑微信",
                  icon: "none"
                });
              } else if (res.cancel) {
                uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:73", "用户点击取消", isCurrentlyBound);
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
                uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:86", "调用绑定API...");
                switchVal.value = true;
                uni.showToast({
                  title: "已成功绑定微信",
                  icon: "none"
                });
              } else if (res.cancel) {
                uni.__log__("log", "at pages/mine/userInfo/userInfo.uvue:94", "用户点击取消", isCurrentlyBound);
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
      const editPassword = () => {
        {
          uni.navigateTo({
            url: "/pages/mine/userInfo/changePassword/changePassword"
          });
        }
      };
      const __returned__ = { switchVal, change, logout, changePhoneNumber, cancelAnAccount, editPassword };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$y = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#f3f3f3", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "title": { ".container ": { "fontSize": "30rpx", "color": "#333333", "paddingTop": "50rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": "20rpx" } }, "info": { ".container ": { "backgroundImage": "none", "backgroundColor": "#ffffff", "paddingTop": "10rpx", "paddingRight": "30rpx", "paddingBottom": "10rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx" } }, "info-item": { ".container .info ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "icon": { ".container .info .info-item ": { "width": "30rpx", "height": "30rpx" } }, "switch-state": { ".container .info .info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "phone": { ".container .info .info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "nobottom": { ".container .info ": { "borderBottomWidth": "medium", "borderBottomStyle": "none", "borderBottomColor": "#000000" } }, "btn-box": { ".container ": { "marginTop": "200rpx" } } };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_switch = resolveEasycom(vue.resolveDynamicComponent("fui-switch"), __easycom_0$5);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
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
              src: _imports_0$5,
              mode: "aspectFit"
            })
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "title" }, [
        vue.createElementVNode("text", null, "安全信息")
      ]),
      vue.createElementVNode("view", { class: "info" }, [
        vue.createElementVNode("view", {
          class: "info-item",
          onClick: $setup.editPassword
        }, [
          vue.createElementVNode("text", null, "修改密码"),
          vue.createElementVNode("image", {
            class: "icon",
            src: _imports_0$5,
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
            src: _imports_0$5,
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
              checked: $setup.switchVal,
              color: "#1296db",
              onChange: $setup.change
            }, null, 8, ["checked"])
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
  const PagesMineUserInfoUserInfo = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["styles", [_style_0$y]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/userInfo.uvue"]]);
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _imports_0$4 = "/static/error_big.png";
  const _style_0$x = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#F5F5F5", "display": "flex", "flexDirection": "column", "alignItems": "center", "paddingTop": "100rpx", "paddingRight": "100rpx", "paddingBottom": "100rpx", "paddingLeft": "100rpx" } }, "content": { ".container ": { "marginTop": "50rpx", "marginRight": 0, "marginBottom": "50rpx", "marginLeft": 0 } }, "content-word": { ".container .content ": { "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0 } }, "close": { ".container ": { "width": "120rpx", "height": "120rpx" } }, "btn-box": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "width": "100%" } }, "btn": { ".container .btn-box ": { "width": "45%" } } };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("image", {
        src: _imports_0$4,
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
  const PagesMineUserInfoCancelAnAccountCancelAnAccount = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["styles", [_style_0$x]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/CancelAnAccount/CancelAnAccount.uvue"]]);
  const _sfc_main$x = vue.defineComponent({
    name: "fui-input",
    emits: ["input", "update:modelValue", "focus", "blur", "confirm", "onclick", "keyboardheightchange"],
    props: {
      required: {
        type: Boolean,
        default: false
      },
      requiredColor: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      labelSize: {
        type: Number,
        default: 0
      },
      labelColor: {
        type: String,
        default: "#333"
      },
      labelWidth: {
        type: Number,
        default: 140
      },
      clearable: {
        type: Boolean,
        default: false
      },
      clearColor: {
        type: String,
        default: "#CCCCCC"
      },
      focus: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ""
      },
      placeholderStyle: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      value: {
        type: [Object, String, Number],
        default: ""
      },
      //保留属性
      modelValue: {
        type: [Object, String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "text"
      },
      password: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabledStyle: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 140
      },
      min: {
        type: Number,
        default: -1
      },
      max: {
        type: Number,
        default: -1
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      cursorColor: {
        type: String,
        default: ""
      },
      confirmType: {
        type: String,
        default: "done"
      },
      confirmHold: {
        type: Boolean,
        default: false
      },
      cursor: {
        type: Number,
        default: -1
      },
      selectionStart: {
        type: Number,
        default: -1
      },
      selectionEnd: {
        type: Number,
        default: -1
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      size: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: "#333"
      },
      inputBorder: {
        type: Boolean,
        default: false
      },
      isFillet: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Number,
        default: 0
      },
      borderTop: {
        type: Boolean,
        default: false
      },
      topLeft: {
        type: Number,
        default: 0
      },
      topRight: {
        type: Number,
        default: 0
      },
      borderBottom: {
        type: Boolean,
        default: true
      },
      bottomLeft: {
        type: Number,
        default: 32
      },
      bottomRight: {
        type: Number,
        default: 0
      },
      borderColor: {
        type: String,
        default: ""
      },
      trim: {
        type: Boolean,
        default: true
      },
      textAlign: {
        type: String,
        default: "left"
      },
      padding: {
        type: String,
        default: "28rpx 32rpx"
      },
      backgroundColor: {
        type: String,
        default: "#FFFFFF"
      },
      marginTop: {
        type: Number,
        default: 0
      }
    },
    data() {
      const refInputId = "fui_input_".concat(parseInt(Math.ceil(Math.random() * 1e6).toString(), 36));
      return {
        refId: refInputId,
        val: "",
        fuiForm: null,
        //1-string 2-number 3-boolean 4-string[] 5-number[]
        valueType: 1
      };
    },
    computed: {
      getStyle() {
        const mp = /* @__PURE__ */ new Map();
        mp.set("padding", this.padding);
        mp.set("background", this.backgroundColor);
        mp.set("margin-top", "".concat(this.marginTop, "rpx"));
        mp.set("border-radius", this.isFillet ? "120px" : "".concat(this.radius, "rpx"));
        if (this.inputBorder && this.borderColor != "")
          mp.set("border-color", this.borderColor);
        return mp;
      },
      getBorderRadius() {
        let radius = "".concat(this.radius * 2, "rpx");
        if (this.isFillet) {
          radius = "240px";
        }
        return radius;
      },
      getBtnLineStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.borderColor != "")
          mp.set("background", this.borderColor);
        mp.set("left", "0");
        mp.set("right", "".concat(this.bottomRight, "rpx"));
        return mp;
      },
      getRequiredColor() {
        const mp = /* @__PURE__ */ new Map();
        if (this.requiredColor != "")
          mp.set("color", this.requiredColor);
        return mp;
      },
      getLabelStyl() {
        const mp = /* @__PURE__ */ new Map();
        if (this.labelColor != "")
          mp.set("color", this.labelColor);
        if (this.labelSize != 0) {
          mp.set("fontSize", "".concat(this.labelSize, "rpx"));
          mp.set("lineHeight", "".concat(this.labelSize, "rpx"));
        }
        return mp;
      }
    },
    watch: {
      focus(val) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.setFocusOrBlur(val);
          }, 50);
        });
      },
      modelValue() {
        this.val = this.getStringVal(this.modelValue);
      },
      value() {
        this.val = this.getStringVal(this.value);
      }
    },
    created() {
      setTimeout(() => {
        const value = this.getStringVal(this.value);
        const modelValue = this.getStringVal(this.modelValue);
        if (value != "") {
          this.val = value;
        } else if (modelValue != "") {
          this.val = modelValue;
        }
        const isForm = this.getParent("fui-form");
        if (isForm) {
          const form = this.fuiForm;
          form.$data["formChildren"].push(this);
        }
      }, 50);
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.setFocusOrBlur(this.focus);
        }, 300);
      });
    },
    methods: {
      getStringVal(val = null) {
        let str;
        if (typeof val == "string") {
          str = val;
        } else if (typeof val == "number") {
          str = val.toString();
        } else {
          str = val.toString();
        }
        return str;
      },
      setFocusOrBlur(focus) {
        if (focus) {
          this.$refs[this.refId].focus();
        } else {
          this.$refs[this.refId].blur();
        }
      },
      isSafeInteger(num) {
        return num >= -9007199254740991 && num <= 9007199254740991;
      },
      onInput(event) {
        let value = event.detail.value;
        if (this.trim)
          value = this.trimStr(value);
        this.val = value;
        let currentVal = parseFloat(value);
        if ((this.type == "digit" || this.type == "number") && !isNaN(currentVal) && this.isSafeInteger(currentVal)) {
          const min = this.min;
          const max = this.max;
          if (min != -1 && currentVal < min) {
            currentVal = min;
          } else if (max != -1 && max < currentVal) {
            currentVal = max;
          }
          value = currentVal.toString();
        }
        this.$nextTick(() => {
          if (event.detail.value != "")
            this.val = value;
        });
        const inputValue = event.detail.value != "" ? value : "";
        this.$emit("input", inputValue);
        this.$emit("update:modelValue", inputValue);
      },
      onFocus(event) {
        this.$emit("focus", event);
      },
      onBlur(event) {
        this.$emit("blur", event);
      },
      onConfirm(event) {
        this.$emit("confirm", event);
      },
      onClear() {
        if (this.disabled && !this.readonly)
          return null;
        this.setFocusOrBlur(false);
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
      },
      fieldClick() {
        this.$emit("onclick", this.name);
      },
      onKeyboardheightchange(e2) {
        this.$emit("keyboardheightchange", e2);
      },
      trimStr(str) {
        return str.replace(/^\s+|\s+$/g, "");
      },
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        this.fuiForm = parent;
        return true;
      },
      //暂时做重置处理（还原需记录初始值）
      reset() {
        this.setFocusOrBlur(false);
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
      },
      getSubmitValue() {
        return this.val;
      }
    }
  });
  const _style_0$w = { "fui-input__wrap": { "": { "width": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center", "position": "relative", "boxSizing": "border-box", "overflow": "visible" } }, "fui-input__border-uvue": { "": { "borderTopWidth": 0.5, "borderRightWidth": 0.5, "borderBottomWidth": 0.5, "borderLeftWidth": 0.5, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid" } }, "fui-input__border-color": { "": { "!borderTopColor": "#EEEEEE", "!borderRightColor": "#EEEEEE", "!borderBottomColor": "#EEEEEE", "!borderLeftColor": "#EEEEEE" } }, "fui-input__background": { "": { "!backgroundImage": "none", "!backgroundColor": "#EEEEEE" } }, "fui-input__border-top": { "": { "position": "absolute", "top": 0, "height": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 0", "zIndex": 1, "pointerEvents": "none" } }, "fui-input__border-bottom": { "": { "position": "absolute", "bottom": 0, "height": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 100%", "zIndex": 1, "pointerEvents": "none" } }, "fui-input__required": { "": { "position": "absolute", "left": "12rpx", "height": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" } }, "fui-input__asterisk-text": { "": { "fontSize": "32rpx", "height": "32rpx", "lineHeight": "32rpx" } }, "fui-input__asterisk-color": { "": { "!color": "#FF2B2B" } }, "fui-input__label": { "": { "paddingRight": "12rpx", "flexShrink": 0 } }, "fui-input__label-size": { "": { "!fontSize": "32rpx", "!lineHeight": "32rpx" } }, "fui-input__self": { "": { "flex": 1, "paddingRight": "12rpx", "overflow": "visible", "backgroundColor": "rgba(0,0,0,0)", "boxSizing": "border-box" } }, "fui-input__size": { "": { "!fontSize": "32rpx" } }, "fui-input__clear-wrap": { "": { "width": "32rpx", "height": "32rpx", "transform": "rotate(45deg) scale(1.1)", "position": "relative", "flexShrink": 0, "borderTopLeftRadius": "32rpx", "borderTopRightRadius": "32rpx", "borderBottomRightRadius": "32rpx", "borderBottomLeftRadius": "32rpx" } }, "fui-input__clear": { "": { "width": "32rpx", "height": "32rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "absolute", "left": 0, "top": 0, "transform": "scale(0.5)" } }, "fui-input__clear-a": { "": { "width": "32rpx", "borderTopWidth": "2rpx", "borderRightWidth": "2rpx", "borderBottomWidth": "2rpx", "borderLeftWidth": "2rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ffffff", "borderRightColor": "#ffffff", "borderBottomColor": "#ffffff", "borderLeftColor": "#ffffff", "backgroundColor": "#ffffff", "boxSizing": "border-box" } }, "fui-input__clear-b": { "": { "height": "32rpx", "borderTopWidth": "2rpx", "borderRightWidth": "2rpx", "borderBottomWidth": "2rpx", "borderLeftWidth": "2rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ffffff", "borderRightColor": "#ffffff", "borderBottomColor": "#ffffff", "borderLeftColor": "#ffffff", "backgroundColor": "#ffffff", "boxSizing": "border-box" } }, "fui-input__placeholder": { "": { "color": "#CCCCCC", "overflow": "visible" } }, "fui-input__disabled": { "": { "pointerEvents": "none" } }, "fui-input__disabled-styl": { "": { "opacity": 0.6 } } };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["fui-input__wrap", { "fui-input__border-uvue": $props.inputBorder, "fui-input__border-color": $props.inputBorder && $props.borderColor == "", "fui-input__disabled-styl": $props.disabled && $props.disabledStyle }]),
        style: vue.normalizeStyle($options.getStyle),
        onClick: _cache[6] || (_cache[6] = (...args) => $options.fieldClick && $options.fieldClick(...args))
      },
      [
        $props.borderTop && !$props.inputBorder ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            style: vue.normalizeStyle({ background: $props.borderColor, left: "".concat($props.topLeft, "rpx"), right: "".concat($props.topRight, "rpx") }),
            class: vue.normalizeClass(["fui-input__border-top", { "fui-input__background": $props.borderColor == "" }])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        $props.required ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "fui-input__required"
        }, [
          vue.createElementVNode(
            "text",
            {
              style: vue.normalizeStyle($options.getRequiredColor),
              class: vue.normalizeClass(["fui-input__asterisk-text", { "fui-input__asterisk-color": $props.requiredColor == "" }])
            },
            "*",
            6
            /* CLASS, STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true),
        $props.label != "" ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            class: "fui-input__label",
            style: vue.normalizeStyle({ minWidth: "".concat($props.labelWidth, "rpx") })
          },
          [
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass({ "fui-input__label-size": $props.labelSize == 0 }),
                style: vue.normalizeStyle($options.getLabelStyl)
              },
              vue.toDisplayString($props.label),
              7
              /* TEXT, CLASS, STYLE */
            )
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "left"),
        vue.createElementVNode("input", {
          ref: $data.refId,
          class: vue.normalizeClass(["fui-input__self", { "fui-input__disabled": $props.disabled || $props.readonly, "fui-input__size": $props.size == 0 }]),
          style: vue.normalizeStyle({ fontSize: "".concat($props.size, "rpx"), color: $props.color, textAlign: $props.textAlign }),
          "placeholder-class": "fui-input__placeholder",
          type: $props.type,
          name: $props.name,
          value: $data.val,
          placeholder: $props.placeholder,
          password: $props.password || $props.type == "password",
          "placeholder-style": $props.placeholderStyle,
          disabled: $props.disabled || $props.readonly,
          "cursor-spacing": $props.cursorSpacing,
          maxlength: $props.maxlength,
          "confirm-type": $props.confirmType,
          "confirm-hold": $props.confirmHold,
          cursor: $props.cursor,
          "selection-start": $props.selectionStart,
          "selection-end": $props.selectionEnd,
          "adjust-position": $props.adjustPosition,
          onFocus: _cache[0] || (_cache[0] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onInput: _cache[2] || (_cache[2] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
          onKeyboardheightchange: _cache[4] || (_cache[4] = (...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args))
        }, null, 46, ["type", "name", "value", "placeholder", "password", "placeholder-style", "disabled", "cursor-spacing", "maxlength", "confirm-type", "confirm-hold", "cursor", "selection-start", "selection-end", "adjust-position"]),
        $props.clearable && $data.val != "" ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 3,
            class: "fui-input__clear-wrap",
            style: vue.normalizeStyle({ background: $props.clearColor }),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.onClear && $options.onClear(...args), ["stop"]))
          },
          [
            vue.createElementVNode("view", { class: "fui-input__clear" }, [
              vue.createElementVNode("view", { class: "fui-input__clear-a" })
            ]),
            vue.createElementVNode("view", { class: "fui-input__clear" }, [
              vue.createElementVNode("view", { class: "fui-input__clear-b" })
            ])
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default"),
        $props.borderBottom && !$props.inputBorder ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 4,
            style: vue.normalizeStyle($options.getBtnLineStyl),
            class: vue.normalizeClass(["fui-input__border-bottom", { "fui-input__background": $props.borderColor == "" }])
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["styles", [_style_0$w]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-input/fui-input.uvue"]]);
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "changePhoneNumber",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const btnWord = vue.ref("获取验证码");
      const isCounting = vue.ref(false);
      function countDown(seconds) {
        if (seconds <= 0) {
          btnWord.value = "获取验证码";
          isCounting.value = false;
          return null;
        }
        btnWord.value = "".concat(seconds, "秒后重发");
        setTimeout(() => {
          countDown(seconds - 1);
        }, 1e3);
      }
      const getPsw = () => {
        if (isCounting.value)
          return null;
        uni.__log__("log", "at pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue:56", "发送验证码请求...");
        isCounting.value = true;
        countDown(60);
      };
      const __returned__ = { btnWord, isCounting, countDown, getPsw };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$v = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#f3f3f3", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx" } }, "icon": { ".container .content ": { "width": "40rpx", "height": "40rpx", "marginRight": "10rpx" } } };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_2$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_fui_input, {
          placeholder: "请输入手机号",
          placeholderStyle: "font-size: 26rpx;"
        }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", null, [
              vue.createCommentVNode(' <image class="icon" src="@/static/phone.png"></image> '),
              vue.createVNode(_component_fui_icon, {
                name: "mobile",
                color: "#1296db",
                size: 48
              })
            ])
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_fui_input, {
          padding: "20rpx 32rpx",
          placeholder: "请输入验证码",
          bottomLeft: 0,
          placeholderStyle: "font-size: 26rpx;"
        }, {
          left: vue.withCtx(() => [
            vue.createElementVNode("view", null, [
              vue.createVNode(_component_fui_icon, {
                name: "captcha",
                color: "#1296db",
                size: 48
              }),
              vue.createCommentVNode(' <image class="icon" src="@/static/captcha.png"></image> ')
            ])
          ]),
          default: vue.withCtx(() => [
            vue.createVNode(_component_fui_button, {
              type: "gray",
              width: "200rpx",
              height: "64rpx",
              size: 28,
              onClick: $setup.getPsw,
              text: $setup.btnWord,
              disabled: $setup.isCounting
            }, null, 8, ["text", "disabled"])
          ]),
          _: 1
          /* STABLE */
        })
      ])
    ]);
  }
  const PagesMineUserInfoChangePhoneNumberChangePhoneNumber = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["styles", [_style_0$v]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue"]]);
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "changePassword",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const oldPassword = vue.ref("");
      const newPassword = vue.ref("");
      const confirmPassword = vue.ref("");
      const btnDisabled = vue.ref(true);
      const errorMsg = vue.ref("");
      const passwordReg = /^(?:(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])|(?=.*\d)(?=.*[^a-zA-Z\d])).{8,16}$/;
      function verPassword(psw) {
        return passwordReg.test(psw);
      }
      const updateBtnState = () => {
        const allFieldsFilled = oldPassword.value.length > 0 && newPassword.value.length > 0 && confirmPassword.value.length > 0;
        const passwordsMatch = newPassword.value === confirmPassword.value;
        const newPwdValid = verPassword(newPassword.value);
        btnDisabled.value = !(allFieldsFilled && newPwdValid && passwordsMatch);
      };
      const updateOldPassword = (e2) => {
        oldPassword.value = e2;
        updateBtnState();
      };
      const updateNewPassword = (e2) => {
        newPassword.value = e2;
        errorMsg.value = "";
        if (e2.length > 0 && !verPassword(e2)) {
          errorMsg.value = "密码格式不符合要求";
        } else if (confirmPassword.value.length > 0 && e2 != confirmPassword.value) {
          errorMsg.value = "两次输入的密码不一致";
        }
        updateBtnState();
      };
      const updateConfirmPassword = (e2) => {
        confirmPassword.value = e2;
        errorMsg.value = "";
        if (e2.length > 0) {
          if (!verPassword(e2)) {
            errorMsg.value = "确认密码格式不符合要求";
          } else if (e2 != newPassword.value) {
            errorMsg.value = "两次输入的密码不一致";
          }
        }
        updateBtnState();
      };
      const submit = () => {
        if (!verPassword(newPassword.value)) {
          uni.showToast({
            title: "密码格式错误",
            icon: "none"
          });
          return null;
        }
        if (newPassword.value != confirmPassword.value) {
          uni.showToast({
            title: "两次密码不一致",
            icon: "none"
          });
          return null;
        }
        uni.showToast({
          title: "提交成功",
          icon: "none"
        });
      };
      const __returned__ = { oldPassword, newPassword, confirmPassword, btnDisabled, errorMsg, passwordReg, verPassword, updateBtnState, updateOldPassword, updateNewPassword, updateConfirmPassword, submit };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$u = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "50rpx", "paddingRight": "20rpx", "paddingBottom": "50rpx", "paddingLeft": "20rpx" } }, "fui-input__label-size": { ".container ": { "!fontSize": "26rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "tips": { ".container ": { "marginTop": "40rpx", "marginRight": 0, "marginBottom": "40rpx", "marginLeft": 0 } }, "tips-word": { ".container .tips ": { "fontSize": "30rpx", "color": "#999999" } }, "error-msg": { ".container ": { "marginTop": "10rpx", "color": "#e64340", "fontSize": "24rpx" } } };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_2$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createVNode(_component_fui_input, {
          label: "旧密码",
          placeholder: "请输入原密码",
          type: "password",
          modelValue: $setup.oldPassword,
          onInput: $setup.updateOldPassword
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_fui_input, {
          label: "新密码",
          placeholder: "请输入新密码",
          type: "password",
          modelValue: $setup.newPassword,
          onInput: $setup.updateNewPassword
        }, null, 8, ["modelValue"]),
        vue.createVNode(_component_fui_input, {
          label: "确认新密码",
          placeholder: "再次输入新密码",
          type: "password",
          modelValue: $setup.confirmPassword,
          onInput: $setup.updateConfirmPassword
        }, null, 8, ["modelValue"])
      ]),
      $setup.errorMsg ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
        vue.createElementVNode(
          "text",
          { class: "error-msg" },
          vue.toDisplayString($setup.errorMsg),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "tips" }, [
        vue.createElementVNode("text", { class: "tips-word" }, "密码8-16位,需包含英文字母、数字、特殊字符中两类及以上")
      ]),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_fui_button, {
          color: "#fff",
          disabled: $setup.btnDisabled,
          text: "提交",
          background: "#1296db",
          height: "80rpx",
          onOnclick: $setup.submit
        }, null, 8, ["disabled"])
      ])
    ]);
  }
  const PagesMineUserInfoChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["styles", [_style_0$u]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/changePassword/changePassword.uvue"]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "l-progress",
    props: /* @__PURE__ */ vue.mergeModels(new UTSJSONObject({
      showInfo: { type: Boolean, required: true, default: false },
      infoType: { type: String, required: true, default: "outer" },
      infoAlign: { type: String, required: true, default: "end" },
      strokeColor: { type: String, required: false },
      trailColor: { type: String, required: false },
      linecap: { type: String, required: false },
      infoColor: { type: String, required: false },
      fontSize: { type: [String, Number], required: false },
      strokeWidth: { type: [String, Number], required: false }
    }), new UTSJSONObject({
      "percent": { type: Number, default: 0 },
      "percentModifiers": {}
    })),
    emits: ["update:percent"],
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const props = __props;
      const percent = vue.useModel(__props, "percent");
      const classes = vue.computed(() => {
        const _class = /* @__PURE__ */ new Map();
        if (props.infoType == "outer") {
          _class.set("l-progress--outer", true);
        }
        if (props.infoType == "inner") {
          _class.set("l-progress--inner", true);
        }
        return _class;
      });
      const textRef = vue.ref(null);
      const progressBgRef = vue.ref(null);
      const styles = vue.computed(() => {
        var _a2;
        const _style = /* @__PURE__ */ new Map();
        if (props.strokeColor != null) {
          _style.set("background", props.strokeColor);
        }
        if (props.strokeWidth != null) {
          _style.set("height", addUnit(props.strokeWidth));
        }
        if (props.infoType == "inner") {
          if (props.infoAlign == "end") {
            _style.set("align-items", "flex-end");
          } else {
            _style.set("align-items", "flex-start");
          }
          if (props.strokeWidth != null) {
            _style.set("height", addUnit((_a2 = props.strokeWidth) !== null && _a2 !== void 0 ? _a2 : 20));
          }
        }
        return _style;
      });
      const textStyle = vue.computed(() => {
        const _style = /* @__PURE__ */ new Map();
        if (props.infoColor != null) {
          _style.set("color", props.infoColor);
        }
        if (props.showInfo && props.infoType == "outer") {
          _style.set(props.infoAlign == "end" ? "margin-left" : "margin-right", "5px");
        }
        return _style;
      });
      const innerStyle = vue.computed(() => {
        const _style = /* @__PURE__ */ new Map();
        if (props.trailColor != null) {
          _style.set("background", props.trailColor);
        }
        return _style;
      });
      const progressInnerRef = vue.ref(null);
      vue.watchEffect(() => {
        return __awaiter(this, void 0, void 0, function* () {
          var _a2, _b, _c, _d, _e2;
          if (percent.value >= 0) {
            if (props.infoType == "inner") {
              const rect = yield (_a2 = progressInnerRef.value) === null || _a2 === void 0 ? null : _a2.getBoundingClientRectAsync();
              const textRect = yield (_b = textRef.value) === null || _b === void 0 ? null : _b.getBoundingClientRectAsync();
              const width = props.showInfo ? Math.max(percent.value, (_c = Math.max((rect === null || rect === void 0 ? null : rect.height) / (rect === null || rect === void 0 ? null : rect.width), (textRect === null || textRect === void 0 ? null : textRect.width) / (rect === null || rect === void 0 ? null : rect.width)) * 100) !== null && _c !== void 0 ? _c : 10) : percent.value;
              (_d = progressBgRef.value) === null || _d === void 0 ? null : _d.style.setProperty("width", "".concat(width, "%"));
            } else {
              (_e2 = progressBgRef.value) === null || _e2 === void 0 ? null : _e2.style.setProperty("width", "".concat(percent.value, "%"));
            }
          }
        });
      });
      const __returned__ = { props, percent, classes, textRef, progressBgRef, styles, textStyle, innerStyle, progressInnerRef };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$t = { "l-progress": { "": { "flexDirection": "row" } }, "l-progress-bg": { "": { "height": 4, "position": "relative", "backgroundColor": "#3283ff", "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99, "transitionProperty": "width", "transitionDuration": "300ms", "transitionTimingFunction": "cubic-bezier(0,0,0.15,1)", "justifyContent": "center" }, ".l-progress--inner ": { "height": 20 } }, "l-progress__inner-text": { ".l-progress-bg ": { "paddingTop": 0, "paddingRight": "8rpx", "paddingBottom": 0, "paddingLeft": "8rpx", "color": "#FFFFFF", "fontSize": 10, "whiteSpace": "nowrap" } }, "l-progress__inner": { "": { "flex": 1, "alignSelf": "center", "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99, "backgroundColor": "rgba(0,0,0,0.06)" } }, "@TRANSITION": { "l-progress-bg": { "property": "width", "duration": "300ms", "timingFunction": "cubic-bezier(0,0,0.15,1)" } } };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["l-progress", $setup.classes]),
        ref: "progressRef"
      },
      [
        $props.showInfo && $props.infoAlign == "start" && $props.infoType == "outer" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            style: vue.normalizeStyle([$setup.textStyle])
          },
          vue.toDisplayString($setup.percent + "%"),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: "l-progress__inner",
            ref: "progressInnerRef",
            style: vue.normalizeStyle([$setup.innerStyle])
          },
          [
            vue.createElementVNode(
              "view",
              {
                ref: "progressBgRef",
                class: "l-progress-bg",
                style: vue.normalizeStyle([$setup.styles])
              },
              [
                $props.showInfo && $props.infoType == "inner" ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "l-progress__inner-text",
                    ref: "textRef",
                    style: vue.normalizeStyle([$setup.textStyle])
                  },
                  vue.toDisplayString($setup.percent + "%"),
                  5
                  /* TEXT, STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        ),
        $props.showInfo && $props.infoAlign == "end" && $props.infoType == "outer" ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            style: vue.normalizeStyle([$setup.textStyle])
          },
          vue.toDisplayString($setup.percent + "%"),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["styles", [_style_0$t]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-progress/components/l-progress/l-progress.uvue"]]);
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name$3 = "limeClipboard";
  const moduleName = "lime-clipboard 剪贴板";
  const moduleType = "";
  const errMsg = "";
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name$3, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name$3, is_uni_modules);
  const setClipboardData = /* @__PURE__ */ initUTSProxyFunction(false, { moduleName, moduleType, errMsg, main: true, package: pkg, class: cls, name: "setClipboardDataByJs", keepAlive: false, params: [{ "name": "options", "type": "UTSSDKModulesLimeClipboardSetClipboardDataOptionJSONObject" }], return: "" });
  class RadioItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            deviceTitle: { type: String, optional: false },
            iccid: { type: String, optional: false },
            cardid: { type: String, optional: false },
            cardState: { type: String, optional: false },
            currentPackage: { type: String, optional: false },
            useDate: { type: String, optional: false },
            percent: { type: Number, optional: false },
            total: { type: String, optional: false },
            checked: { type: Boolean, optional: true }
          };
        },
        name: "RadioItem"
      };
    }
    constructor(options, metadata = RadioItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.deviceTitle = this.__props__.deviceTitle;
      this.iccid = this.__props__.iccid;
      this.cardid = this.__props__.cardid;
      this.cardState = this.__props__.cardState;
      this.currentPackage = this.__props__.currentPackage;
      this.useDate = this.__props__.useDate;
      this.percent = this.__props__.percent;
      this.total = this.__props__.total;
      this.checked = this.__props__.checked;
      delete this.__props__;
    }
  }
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "rechargeDataTraffic",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const totalDevice = vue.ref(4);
      const percent = vue.ref(50);
      const isShow = vue.ref(false);
      const currentDeviceInfo = vue.ref(new RadioItem({
        deviceTitle: "",
        iccid: "",
        cardid: "",
        cardState: "",
        currentPackage: "",
        useDate: "",
        percent: 0,
        total: "",
        checked: true
      }));
      const radioItems = vue.ref([new RadioItem({
        deviceTitle: "设备信息",
        iccid: "1123456667777887",
        cardid: "13000001111",
        cardState: "在用",
        currentPackage: "店长推荐【终身流量】",
        useDate: "2025-07-07",
        percent: 50,
        total: "100"
      }), new RadioItem({
        deviceTitle: "设备信息1",
        iccid: "1123456667777888",
        cardid: "13000001111",
        cardState: "停机",
        currentPackage: "店长推荐【100G流量】",
        useDate: "2025-07-08",
        percent: 70,
        total: "200"
      }), new RadioItem({
        deviceTitle: "设备信息2",
        cardid: "13000001111",
        iccid: "310203030443",
        cardState: "注销",
        currentPackage: "加油包",
        useDate: "2025-07-09",
        percent: 100,
        total: "300"
      })]);
      const getValue = (e2) => {
        const selectedItem = UTS.arrayFind(radioItems.value, (item) => {
          return item.iccid == e2;
        });
        if (selectedItem != null) {
          uni.__log__("log", "at pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue:143", selectedItem);
          selectedItem.checked = true;
          currentDeviceInfo.value = selectedItem;
        }
        uni.showToast({
          title: "更换成功",
          icon: "none"
        });
      };
      const currentInfo = () => {
        radioItems.value.forEach((item) => {
          item.checked = false;
        });
        radioItems.value[0].checked = true;
        currentDeviceInfo.value = radioItems.value[0];
      };
      const showPopup = () => {
        isShow.value = true;
      };
      const closePopup = () => {
        isShow.value = false;
      };
      const submit = () => {
        uni.showToast({
          title: "去充值",
          icon: "none"
        });
      };
      const copyRight = () => {
        setClipboardData(new UTSJSONObject({
          data: currentDeviceInfo.value.iccid,
          success: function() {
            uni.showToast({
              title: "复制成功",
              icon: "none"
            });
          }
        }));
      };
      vue.onMounted(() => {
        currentInfo();
      });
      const __returned__ = { totalDevice, percent, isShow, currentDeviceInfo, radioItems, getValue, currentInfo, showPopup, closePopup, submit, copyRight };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$s = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "device-total": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between" } }, "device-total-title": { ".container .device-total ": { "display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center" } }, "device-total-title-color": { ".container .device-total .device-total-title ": { "color": "#999999" } }, "device-info-box": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "30rpx", "paddingRight": "40rpx", "paddingBottom": "30rpx", "paddingLeft": "40rpx", "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0, "display": "flex", "flexDirection": "column" } }, "device-title": { ".container .device-info-box ": { "fontSize": "35rpx" } }, "device-info-item": { ".container .device-info-box ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "marginTop": "20rpx" } }, "iccid-info": { ".container .device-info-box .device-info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "add-style": { ".container .device-info-box ": { "paddingBottom": "60rpx", "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#999999", "marginBottom": "60rpx" } }, "progess": { ".container .device-info-box ": { "marginTop": "10rpx", "marginRight": 0, "marginBottom": "10rpx", "marginLeft": 0 } }, "btn-box": { ".container ": { "marginTop": "60rpx" } }, "popup-title": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingTop": 0, "paddingRight": "40rpx", "paddingBottom": 0, "paddingLeft": "40rpx" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "30rpx", "paddingRight": 0, "paddingBottom": "30rpx", "paddingLeft": 0, "position": "relative" } }, "fui-sub__title": { ".container ": { "textAlign": "center", "fontSize": "24rpx", "color": "#7F7F7F", "transform": "scale(0.9)" } }, "fui-scroll__view": { ".container ": { "width": "100%", "height": "50%" } }, "fui-list__cell": { ".container ": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } } };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    const _component_l_progress = resolveEasycom(vue.resolveDynamicComponent("l-progress"), __easycom_1$4);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    const _component_fui_radio = resolveEasycom(vue.resolveDynamicComponent("fui-radio"), __easycom_3$3);
    const _component_fui_list_cell = resolveEasycom(vue.resolveDynamicComponent("fui-list-cell"), __easycom_4$2);
    const _component_fui_label = resolveEasycom(vue.resolveDynamicComponent("fui-label"), __easycom_4$1);
    const _component_fui_radio_group = resolveEasycom(vue.resolveDynamicComponent("fui-radio-group"), __easycom_6);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_4$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "device-total" }, [
        vue.createElementVNode("view", { class: "device-total-title" }, [
          vue.createElementVNode("text", null, "充值设备"),
          vue.createElementVNode(
            "text",
            { class: "device-total-title-color" },
            "（共" + vue.toDisplayString($setup.totalDevice) + "台设备）",
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "device-total-title" }, [
          vue.createElementVNode("text", { onClick: $setup.showPopup }, "更换设备"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            size: 50
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "device-info-box" }, [
        vue.createElementVNode("text", { class: "device-title" }, "设备信息"),
        vue.createElementVNode("view", { class: "device-info-item" }, [
          vue.createElementVNode("text", null, "ICCID"),
          vue.createElementVNode("view", { class: "iccid-info" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.currentDeviceInfo.iccid),
              1
              /* TEXT */
            ),
            vue.createVNode(_component_fui_icon, {
              name: "info",
              size: 40,
              onOnclick: $setup.copyRight
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "device-info-item" }, [
          vue.createElementVNode("text", null, "卡号"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.currentDeviceInfo.cardid),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "device-info-item" }, [
          vue.createElementVNode("text", null, "卡片状态"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.currentDeviceInfo.cardState),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "device-info-item" }, [
          vue.createElementVNode("text", null, "当前套餐"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.currentDeviceInfo.currentPackage),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "device-info-item add-style" }, [
          vue.createElementVNode("text", null, "生效日期"),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.currentDeviceInfo.useDate),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("text", null, "流量"),
        vue.createElementVNode("view", { class: "progess" }, [
          vue.createVNode(_component_l_progress, {
            percent: $setup.currentDeviceInfo.percent,
            "show-info": true
          }, null, 8, ["percent"])
        ]),
        vue.createElementVNode("view", { class: "device-info-item" }, [
          vue.createElementVNode("text", null, "已用50G(50%)"),
          vue.createElementVNode("text", null, "可用50G(共100G)")
        ])
      ]),
      vue.createElementVNode("view", { class: "btn-box" }, [
        vue.createVNode(_component_fui_button, {
          color: "#fff",
          text: "去充值",
          background: "#1296db",
          height: "80rpx",
          onOnclick: $setup.submit
        })
      ]),
      vue.createVNode(_component_fui_bottom_popup, {
        visible: $setup.isShow,
        onClose: $setup.closePopup
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "fui-scroll__wrap" }, [
            vue.createElementVNode("view", { class: "popup-title" }, [
              vue.createElementVNode("text", null, "设备列表"),
              vue.createElementVNode("view", { onClick: $setup.closePopup }, [
                vue.createVNode(_component_fui_icon, {
                  name: "close",
                  size: 40
                })
              ])
            ]),
            vue.createVNode(_component_fui_radio_group, { onChange: $setup.getValue }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($setup.radioItems, (item, index) => {
                    return vue.openBlock(), vue.createBlock(
                      _component_fui_label,
                      { key: index },
                      {
                        default: vue.withCtx(() => [
                          vue.createVNode(
                            _component_fui_list_cell,
                            null,
                            {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("view", { class: "fui-list__cell" }, [
                                  vue.createElementVNode(
                                    "text",
                                    null,
                                    vue.toDisplayString(item.deviceTitle),
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createVNode(_component_fui_radio, {
                                    checked: item.checked,
                                    value: item.iccid
                                  }, null, 8, ["checked", "value"])
                                ])
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible"])
    ]);
  }
  const PagesMineRechargeDataTrafficRechargeDataTraffic = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["styles", [_style_0$s]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue"]]);
  class RGB extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            r: { type: Number, optional: false },
            g: { type: Number, optional: false },
            b: { type: Number, optional: false }
          };
        },
        name: "RGB"
      };
    }
    constructor(options, metadata = RGB.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.r = this.__props__.r;
      this.g = this.__props__.g;
      this.b = this.__props__.b;
      delete this.__props__;
    }
  }
  class RGBA extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            r: { type: Number, optional: false },
            g: { type: Number, optional: false },
            b: { type: Number, optional: false },
            a: { type: Number, optional: false }
          };
        },
        name: "RGBA"
      };
    }
    constructor(options, metadata = RGBA.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.r = this.__props__.r;
      this.g = this.__props__.g;
      this.b = this.__props__.b;
      this.a = this.__props__.a;
      delete this.__props__;
    }
  }
  class RGBAString extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            r: { type: String, optional: false },
            g: { type: String, optional: false },
            b: { type: String, optional: false },
            a: { type: Number, optional: false }
          };
        },
        name: "RGBAString"
      };
    }
    constructor(options, metadata = RGBAString.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.r = this.__props__.r;
      this.g = this.__props__.g;
      this.b = this.__props__.b;
      this.a = this.__props__.a;
      delete this.__props__;
    }
  }
  class HSL extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            h: { type: Number, optional: false },
            s: { type: Number, optional: false },
            l: { type: Number, optional: false }
          };
        },
        name: "HSL"
      };
    }
    constructor(options, metadata = HSL.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.h = this.__props__.h;
      this.s = this.__props__.s;
      this.l = this.__props__.l;
      delete this.__props__;
    }
  }
  class HSLA extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            h: { type: Number, optional: false },
            s: { type: Number, optional: false },
            l: { type: Number, optional: false },
            a: { type: Number, optional: false }
          };
        },
        name: "HSLA"
      };
    }
    constructor(options, metadata = HSLA.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.h = this.__props__.h;
      this.s = this.__props__.s;
      this.l = this.__props__.l;
      this.a = this.__props__.a;
      delete this.__props__;
    }
  }
  class HSV extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            h: { type: Number, optional: false },
            s: { type: Number, optional: false },
            v: { type: Number, optional: false }
          };
        },
        name: "HSV"
      };
    }
    constructor(options, metadata = HSV.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.h = this.__props__.h;
      this.s = this.__props__.s;
      this.v = this.__props__.v;
      delete this.__props__;
    }
  }
  class HSVA extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            h: { type: Number, optional: false },
            s: { type: Number, optional: false },
            v: { type: Number, optional: false },
            a: { type: Number, optional: false }
          };
        },
        name: "HSVA"
      };
    }
    constructor(options, metadata = HSVA.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.h = this.__props__.h;
      this.s = this.__props__.s;
      this.v = this.__props__.v;
      this.a = this.__props__.a;
      delete this.__props__;
    }
  }
  class HSB extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            h: { type: Number, optional: false },
            s: { type: Number, optional: false },
            b: { type: Number, optional: false }
          };
        },
        name: "HSB"
      };
    }
    constructor(options, metadata = HSB.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.h = this.__props__.h;
      this.s = this.__props__.s;
      this.b = this.__props__.b;
      delete this.__props__;
    }
  }
  class HSBA extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            h: { type: Number, optional: false },
            s: { type: Number, optional: false },
            b: { type: Number, optional: false },
            a: { type: Number, optional: false }
          };
        },
        name: "HSBA"
      };
    }
    constructor(options, metadata = HSBA.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.h = this.__props__.h;
      this.s = this.__props__.s;
      this.b = this.__props__.b;
      this.a = this.__props__.a;
      delete this.__props__;
    }
  }
  class LColorInfo extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            ok: { type: Boolean, optional: true },
            format: { type: "Unknown", optional: true },
            r: { type: Number, optional: false },
            g: { type: Number, optional: false },
            b: { type: Number, optional: false },
            a: { type: Number, optional: false }
          };
        },
        name: "LColorInfo"
      };
    }
    constructor(options, metadata = LColorInfo.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.ok = this.__props__.ok;
      this.format = this.__props__.format;
      this.r = this.__props__.r;
      this.g = this.__props__.g;
      this.b = this.__props__.b;
      this.a = this.__props__.a;
      delete this.__props__;
    }
  }
  class LColorOptions extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            format: { type: "Unknown", optional: true },
            gradientType: { type: String, optional: true }
          };
        },
        name: "LColorOptions"
      };
    }
    constructor(options, metadata = LColorOptions.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.format = this.__props__.format;
      this.gradientType = this.__props__.gradientType;
      delete this.__props__;
    }
  }
  class LGenerateOptions extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            theme: { type: "Unknown", optional: true },
            backgroundColor: { type: String, optional: true }
          };
        },
        name: "LGenerateOptions"
      };
    }
    constructor(options, metadata = LGenerateOptions.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.theme = this.__props__.theme;
      this.backgroundColor = this.__props__.backgroundColor;
      delete this.__props__;
    }
  }
  function isNumber(value = null) {
    return ["Int8", "UInt8", "Int16", "UInt16", "Int32", "UInt32", "Int64", "UInt64", "Int", "UInt", "Float", "Float16", "Float32", "Float64", "Double", "number"].includes(typeof value);
  }
  function isString(value = null) {
    return typeof value == "string";
  }
  function isNumeric(value = null) {
    if (isNumber(value)) {
      return true;
    } else if (isString(value)) {
      const regex = new RegExp("^(-)?\\d+(\\.\\d+)?$");
      return regex.test(value);
    }
    return false;
  }
  function toBoolean$1(value = null) {
    if (isNumber(value)) {
      return value != 0;
    }
    if (isString(value)) {
      return "".concat(value).length > 0;
    }
    if (typeof value == "boolean") {
      return value;
    }
    return value != null;
  }
  function isPercentage(n2 = null) {
    return isString(n2) && n2.indexOf("%") != -1;
  }
  function isOnePointZero(n2 = null) {
    return isString(n2) && n2.indexOf(".") != -1 && parseFloat(n2) == 1;
  }
  function bound01(n2 = null, max) {
    if (!(isNumber(n2) || isString(n2))) {
      return 1;
    }
    if (isOnePointZero(n2)) {
      n2 = "100%";
    }
    const isPercent = isPercentage(n2);
    n2 = isNumber(n2) ? n2 : parseFloat(n2);
    n2 = max == 360 ? n2 : Math.min(max, Math.max(0, n2));
    if (isPercent) {
      n2 = parseInt("".concat(Math.min(n2, 100) * max), 10) / 100;
    }
    if (Math.abs(n2 - max) < 1e-6) {
      return 1;
    }
    if (max == 360) {
      n2 = (n2 < 0 ? n2 % max + max : n2 % max) / max;
    } else {
      n2 = n2 % max / max;
    }
    return n2;
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function boundAlpha(a2 = null) {
    let n2 = a2 == null ? 1 : isString(a2) ? parseFloat(a2) : a2;
    if (isNaN(n2) || n2 < 0 || n2 > 1) {
      n2 = 1;
    }
    return n2;
  }
  function convertToPercentage(n2 = null) {
    n2 = isNumeric(n2) ? parseFloat("".concat(n2)) : n2;
    if (isNumber(n2) && n2 <= 1) {
      return "".concat(n2 * 100, "%").replace(".0%", "%");
    }
    return n2;
  }
  function pad2(c2) {
    return c2.length == 1 ? "0" + c2 : "".concat(c2);
  }
  function rgbToRgb(r2 = null, g2 = null, b2 = null) {
    return new RGB({
      r: bound01(r2, 255) * 255,
      g: bound01(g2, 255) * 255,
      b: bound01(b2, 255) * 255
    });
  }
  function rgbToHsl(r2 = null, g2 = null, b2 = null) {
    r2 = bound01(r2, 255);
    g2 = bound01(g2, 255);
    b2 = bound01(b2, 255);
    const max = Math.max(r2, g2, b2);
    const min = Math.min(r2, g2, b2);
    let h2 = 0;
    let s2;
    const l2 = (max + min) / 2;
    if (max == min) {
      s2 = 0;
      h2 = 0;
    } else {
      const d2 = max - min;
      s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
      switch (max) {
        case r2:
          h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h2 = (b2 - r2) / d2 + 2;
          break;
        case b2:
          h2 = (r2 - g2) / d2 + 4;
          break;
        default:
          uni.__log__("log", "at uni_modules/lime-color/common/conversion.uts:64", "h");
          break;
      }
      h2 /= 6;
    }
    return new HSL({ h: h2, s: s2, l: l2 });
  }
  function hue2rgb(p2, q2, t2) {
    let _t2 = t2;
    if (_t2 < 0) {
      _t2 += 1;
    }
    if (_t2 > 1) {
      _t2 -= 1;
    }
    if (_t2 < 1 / 6) {
      return p2 + (q2 - p2) * (6 * _t2);
    }
    if (_t2 < 1 / 2) {
      return q2;
    }
    if (_t2 < 2 / 3) {
      return p2 + (q2 - p2) * (2 / 3 - _t2) * 6;
    }
    return p2;
  }
  function hslToRgb(h2 = null, s2 = null, l2 = null) {
    let r2;
    let g2;
    let b2;
    h2 = bound01(h2, 360);
    s2 = bound01(s2, 100);
    l2 = bound01(l2, 100);
    if (s2 == 0) {
      g2 = l2;
      b2 = l2;
      r2 = l2;
    } else {
      const q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
      const p2 = 2 * l2 - q2;
      r2 = hue2rgb(p2, q2, h2 + 1 / 3);
      g2 = hue2rgb(p2, q2, h2);
      b2 = hue2rgb(p2, q2, h2 - 1 / 3);
    }
    return new RGB({ r: r2 * 255, g: g2 * 255, b: b2 * 255 });
  }
  function rgbToHsv(r2, g2, b2) {
    r2 = bound01(r2, 255);
    g2 = bound01(g2, 255);
    b2 = bound01(b2, 255);
    const max = Math.max(r2, g2, b2);
    const min = Math.min(r2, g2, b2);
    let h2 = 0;
    const v2 = max;
    const d2 = max - min;
    const s2 = max == 0 ? 0 : d2 / max;
    if (max == min) {
      h2 = 0;
    } else {
      switch (max) {
        case r2:
          h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
          break;
        case g2:
          h2 = (b2 - r2) / d2 + 2;
          break;
        case b2:
          h2 = (r2 - g2) / d2 + 4;
          break;
        default:
          uni.__log__("log", "at uni_modules/lime-color/common/conversion.uts:171", "1");
          break;
      }
      h2 /= 6;
    }
    return new HSV({ h: h2, s: s2, v: v2 });
  }
  function hsvToRgb(h2 = null, s2 = null, v2 = null) {
    h2 = bound01(h2, 360) * 6;
    s2 = bound01(s2, 100);
    v2 = bound01(v2, 100);
    const i2 = Math.floor(h2);
    const f2 = h2 - i2;
    const p2 = v2 * (1 - s2);
    const q2 = v2 * (1 - f2 * s2);
    const t2 = v2 * (1 - (1 - f2) * s2);
    const mod = i2 % 6;
    const r2 = [v2, q2, p2, p2, t2, v2][mod];
    const g2 = [t2, v2, v2, q2, p2, p2][mod];
    const b2 = [p2, p2, t2, v2, v2, q2][mod];
    return new RGB({ r: r2 * 255, g: g2 * 255, b: b2 * 255 });
  }
  function rgbToHex(r2, g2, b2, allow3Char = false) {
    const hex = [
      pad2(Math.round(r2).toString(16)),
      pad2(Math.round(g2).toString(16)),
      pad2(Math.round(b2).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r2, g2, b2, a2, allow4Char = false) {
    const hex = [
      pad2(Math.round(r2).toString(16)),
      pad2(Math.round(g2).toString(16)),
      pad2(Math.round(b2).toString(16)),
      pad2(convertDecimalToHex(a2))
    ];
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function convertDecimalToHex(d2 = null) {
    return Math.round(parseFloat("".concat(d2)) * 255).toString(16);
  }
  function convertHexToDecimal(h2) {
    return parseIntFromHex(h2) / 255;
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  function numberInputToObject(color) {
    return new RGB({
      r: color >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    });
  }
  const names = /* @__PURE__ */ new Map([
    ["aliceblue", "#f0f8ff"],
    ["antiquewhite", "#faebd7"],
    ["aqua", "#00ffff"],
    ["aquamarine", "#7fffd4"],
    ["azure", "#f0ffff"],
    ["beige", "#f5f5dc"],
    ["bisque", "#ffe4c4"],
    ["black", "#000000"],
    ["blanchedalmond", "#ffebcd"],
    ["blue", "#0000ff"],
    ["blueviolet", "#8a2be2"],
    ["brown", "#a52a2a"],
    ["burlywood", "#deb887"],
    ["cadetblue", "#5f9ea0"],
    ["chartreuse", "#7fff00"],
    ["chocolate", "#d2691e"],
    ["coral", "#ff7f50"],
    ["cornflowerblue", "#6495ed"],
    ["cornsilk", "#fff8dc"],
    ["crimson", "#dc143c"],
    ["cyan", "#00ffff"],
    ["darkblue", "#00008b"],
    ["darkcyan", "#008b8b"],
    ["darkgoldenrod", "#b8860b"],
    ["darkgray", "#a9a9a9"],
    ["darkgreen", "#006400"],
    ["darkgrey", "#a9a9a9"],
    ["darkkhaki", "#bdb76b"],
    ["darkmagenta", "#8b008b"],
    ["darkolivegreen", "#556b2f"],
    ["darkorange", "#ff8c00"],
    ["darkorchid", "#9932cc"],
    ["darkred", "#8b0000"],
    ["darksalmon", "#e9967a"],
    ["darkseagreen", "#8fbc8f"],
    ["darkslateblue", "#483d8b"],
    ["darkslategray", "#2f4f4f"],
    ["darkslategrey", "#2f4f4f"],
    ["darkturquoise", "#00ced1"],
    ["darkviolet", "#9400d3"],
    ["deeppink", "#ff1493"],
    ["deepskyblue", "#00bfff"],
    ["dimgray", "#696969"],
    ["dimgrey", "#696969"],
    ["dodgerblue", "#1e90ff"],
    ["firebrick", "#b22222"],
    ["floralwhite", "#fffaf0"],
    ["forestgreen", "#228b22"],
    ["fuchsia", "#ff00ff"],
    ["gainsboro", "#dcdcdc"],
    ["ghostwhite", "#f8f8ff"],
    ["goldenrod", "#daa520"],
    ["gold", "#ffd700"],
    ["gray", "#808080"],
    ["green", "#008000"],
    ["greenyellow", "#adff2f"],
    ["grey", "#808080"],
    ["honeydew", "#f0fff0"],
    ["hotpink", "#ff69b4"],
    ["indianred", "#cd5c5c"],
    ["indigo", "#4b0082"],
    ["ivory", "#fffff0"],
    ["khaki", "#f0e68c"],
    ["lavenderblush", "#fff0f5"],
    ["lavender", "#e6e6fa"],
    ["lawngreen", "#7cfc00"],
    ["lemonchiffon", "#fffacd"],
    ["lightblue", "#add8e6"],
    ["lightcoral", "#f08080"],
    ["lightcyan", "#e0ffff"],
    ["lightgoldenrodyellow", "#fafad2"],
    ["lightgray", "#d3d3d3"],
    ["lightgreen", "#90ee90"],
    ["lightgrey", "#d3d3d3"],
    ["lightpink", "#ffb6c1"],
    ["lightsalmon", "#ffa07a"],
    ["lightseagreen", "#20b2aa"],
    ["lightskyblue", "#87cefa"],
    ["lightslategray", "#778899"],
    ["lightslategrey", "#778899"],
    ["lightsteelblue", "#b0c4de"],
    ["lightyellow", "#ffffe0"],
    ["lime", "#00ff00"],
    ["limegreen", "#32cd32"],
    ["linen", "#faf0e6"],
    ["magenta", "#ff00ff"],
    ["maroon", "#800000"],
    ["mediumaquamarine", "#66cdaa"],
    ["mediumblue", "#0000cd"],
    ["mediumorchid", "#ba55d3"],
    ["mediumpurple", "#9370db"],
    ["mediumseagreen", "#3cb371"],
    ["mediumslateblue", "#7b68ee"],
    ["mediumspringgreen", "#00fa9a"],
    ["mediumturquoise", "#48d1cc"],
    ["mediumvioletred", "#c71585"],
    ["midnightblue", "#191970"],
    ["mintcream", "#f5fffa"],
    ["mistyrose", "#ffe4e1"],
    ["moccasin", "#ffe4b5"],
    ["navajowhite", "#ffdead"],
    ["navy", "#000080"],
    ["oldlace", "#fdf5e6"],
    ["olive", "#808000"],
    ["olivedrab", "#6b8e23"],
    ["orange", "#ffa500"],
    ["orangered", "#ff4500"],
    ["orchid", "#da70d6"],
    ["palegoldenrod", "#eee8aa"],
    ["palegreen", "#98fb98"],
    ["paleturquoise", "#afeeee"],
    ["palevioletred", "#db7093"],
    ["papayawhip", "#ffefd5"],
    ["peachpuff", "#ffdab9"],
    ["peru", "#cd853f"],
    ["pink", "#ffc0cb"],
    ["plum", "#dda0dd"],
    ["powderblue", "#b0e0e6"],
    ["purple", "#800080"],
    ["rebeccapurple", "#663399"],
    ["red", "#ff0000"],
    ["rosybrown", "#bc8f8f"],
    ["royalblue", "#4169e1"],
    ["saddlebrown", "#8b4513"],
    ["salmon", "#fa8072"],
    ["sandybrown", "#f4a460"],
    ["seagreen", "#2e8b57"],
    ["seashell", "#fff5ee"],
    ["sienna", "#a0522d"],
    ["silver", "#c0c0c0"],
    ["skyblue", "#87ceeb"],
    ["slateblue", "#6a5acd"],
    ["slategray", "#708090"],
    ["slategrey", "#708090"],
    ["snow", "#fffafa"],
    ["springgreen", "#00ff7f"],
    ["steelblue", "#4682b4"],
    ["tan", "#d2b48c"],
    ["teal", "#008080"],
    ["thistle", "#d8bfd8"],
    ["tomato", "#ff6347"],
    ["turquoise", "#40e0d0"],
    ["violet", "#ee82ee"],
    ["wheat", "#f5deb3"],
    ["white", "#ffffff"],
    ["whitesmoke", "#f5f5f5"],
    ["yellow", "#ffff00"],
    ["yellowgreen", "#9acd32"]
  ]);
  class ColorMatchers extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            CSS_UNIT: { type: "Unknown", optional: false },
            rgb: { type: "Unknown", optional: false },
            rgba: { type: "Unknown", optional: false },
            hsl: { type: "Unknown", optional: false },
            hsla: { type: "Unknown", optional: false },
            hsv: { type: "Unknown", optional: false },
            hsva: { type: "Unknown", optional: false },
            hsb: { type: "Unknown", optional: false },
            hsba: { type: "Unknown", optional: false },
            hex3: { type: "Unknown", optional: false },
            hex6: { type: "Unknown", optional: false },
            hex4: { type: "Unknown", optional: false },
            hex8: { type: "Unknown", optional: false }
          };
        },
        name: "ColorMatchers"
      };
    }
    constructor(options, metadata = ColorMatchers.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.CSS_UNIT = this.__props__.CSS_UNIT;
      this.rgb = this.__props__.rgb;
      this.rgba = this.__props__.rgba;
      this.hsl = this.__props__.hsl;
      this.hsla = this.__props__.hsla;
      this.hsv = this.__props__.hsv;
      this.hsva = this.__props__.hsva;
      this.hsb = this.__props__.hsb;
      this.hsba = this.__props__.hsba;
      this.hex3 = this.__props__.hex3;
      this.hex6 = this.__props__.hex6;
      this.hex4 = this.__props__.hex4;
      this.hex8 = this.__props__.hex8;
      delete this.__props__;
    }
  }
  const CSS_INTEGER = "[-\\+]?\\d+%?";
  const CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  const CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  const PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  const PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  const matchers = new ColorMatchers({
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hsb: new RegExp("hsb" + PERMISSIVE_MATCH3),
    hsba: new RegExp("hsba" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  });
  function isValidCSSUnit(color = null) {
    return toBoolean$1(matchers.CSS_UNIT.exec("".concat(color)));
  }
  function inputToRGB(color = null) {
    var _a;
    let _color = null;
    let rgb = new RGB({ r: 0, g: 0, b: 0 });
    let a2 = 1;
    let s2 = null;
    let v2 = null;
    let l2 = null;
    let ok = false;
    let format = null;
    if (typeof color == "string") {
      _color = stringInputToObject(color);
    } else if (typeof color == "object") {
      _color = UTS.JSON.parse(UTS.JSON.stringify(color));
    } else
      ;
    if (_color != null) {
      if (isValidCSSUnit(_color["r"]) && isValidCSSUnit(_color["g"]) && isValidCSSUnit(_color["b"])) {
        rgb = rgbToRgb(_color["r"], _color["g"], _color["b"]);
        ok = true;
        format = "".concat(_color["r"]).endsWith("%") ? "prgb" : "rgb";
      } else if (isValidCSSUnit(_color["h"]) && isValidCSSUnit(_color["s"]) && (isValidCSSUnit(_color["v"]) || isValidCSSUnit(_color["b"]))) {
        const isHSV = _color["v"] != null;
        s2 = convertToPercentage(_color["s"]);
        v2 = isHSV ? convertToPercentage(_color["v"]) : convertToPercentage(_color["b"]);
        rgb = hsvToRgb(_color["h"], s2, v2);
        ok = true;
        format = isHSV ? "hsv" : "hsb";
      } else if (isValidCSSUnit(_color["h"]) && isValidCSSUnit(_color["s"]) && isValidCSSUnit(_color["l"])) {
        s2 = convertToPercentage(_color["s"]);
        l2 = convertToPercentage(_color["l"]);
        rgb = hslToRgb(_color["h"], s2, l2);
        ok = true;
        format = "hsl";
      }
      if (_color["a"] != null) {
        a2 = _color["a"];
      }
    }
    a2 = boundAlpha(a2);
    return new LColorInfo({
      ok,
      format: (_a = _color === null || _color === void 0 ? null : _color["format"]) !== null && _a !== void 0 ? _a : format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a: a2
    });
  }
  function stringInputToObject(color) {
    let _color = color.trim().toLowerCase();
    if (_color.length == 0) {
      return null;
    }
    let named = false;
    if (UTS.mapGet(names, _color) != null) {
      _color = UTS.mapGet(names, _color);
      named = true;
    } else if (_color == "transparent") {
      return new UTSJSONObject({ r: 0, g: 0, b: 0, a: 0, format: "name" });
    }
    let match = matchers.rgb.exec(_color);
    if (match != null) {
      const r2 = match[1];
      const g2 = match[2];
      const b2 = match[3];
      return new UTSJSONObject({ r: r2, g: g2, b: b2 });
    }
    match = matchers.rgba.exec(_color);
    if (match != null) {
      const r2 = match[1];
      const g2 = match[2];
      const b2 = match[3];
      const a2 = match[4];
      return new UTSJSONObject({ r: r2, g: g2, b: b2, a: a2 });
    }
    match = matchers.hsl.exec(_color);
    if (match != null) {
      match[1];
      const s2 = match[2];
      const l2 = match[3];
      return new UTSJSONObject({ h: vue.h, s: s2, l: l2 });
    }
    match = matchers.hsla.exec(_color);
    if (match != null) {
      match[1];
      const s2 = match[2];
      const l2 = match[3];
      const a2 = match[4];
      return new UTSJSONObject({ h: vue.h, s: s2, l: l2, a: a2 });
    }
    match = matchers.hsv.exec(_color);
    if (match != null) {
      match[1];
      const s2 = match[2];
      const v2 = match[3];
      return new UTSJSONObject({ h: vue.h, s: s2, v: v2 });
    }
    match = matchers.hsva.exec(_color);
    if (match != null) {
      match[1];
      const s2 = match[2];
      const v2 = match[3];
      const a2 = match[4];
      return new UTSJSONObject({ h: vue.h, s: s2, v: v2, a: a2 });
    }
    match = matchers.hex8.exec(_color);
    if (match != null) {
      const r2 = parseIntFromHex(match[1]);
      const g2 = parseIntFromHex(match[2]);
      const b2 = parseIntFromHex(match[3]);
      const a2 = convertHexToDecimal(match[4]);
      return new UTSJSONObject({
        r: r2,
        g: g2,
        b: b2,
        a: a2,
        format: named ? "name" : "hex8"
      });
    }
    match = matchers.hex6.exec(_color);
    if (match != null) {
      const r2 = parseIntFromHex(match[1]);
      const g2 = parseIntFromHex(match[2]);
      const b2 = parseIntFromHex(match[3]);
      return new UTSJSONObject({
        r: r2,
        g: g2,
        b: b2,
        format: named ? "name" : "hex"
      });
    }
    match = matchers.hex4.exec(_color);
    if (match != null) {
      const r2 = parseIntFromHex(match[1] + match[1]);
      const g2 = parseIntFromHex(match[2] + match[2]);
      const b2 = parseIntFromHex(match[3] + match[3]);
      const a2 = convertHexToDecimal(match[4] + match[4]);
      return new UTSJSONObject({
        r: r2,
        g: g2,
        b: b2,
        a: a2,
        format: named ? "name" : "hex8"
      });
    }
    match = matchers.hex3.exec(_color);
    if (match != null) {
      const r2 = parseIntFromHex(match[1] + match[1]);
      const g2 = parseIntFromHex(match[2] + match[2]);
      const b2 = parseIntFromHex(match[3] + match[3]);
      return new UTSJSONObject({
        r: r2,
        g: g2,
        b: b2,
        format: named ? "name" : "hex"
      });
    }
    return null;
  }
  class TinyColor {
    constructor(color = "", opts = new LColorOptions({})) {
      var _a, _b;
      let _color = color;
      if (isNumber(color)) {
        _color = numberInputToObject(color);
      }
      this.originalInput = _color;
      const rgb = inputToRGB(_color);
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = (_b = rgb.ok) !== null && _b !== void 0 ? _b : false;
      this.reversedNames = /* @__PURE__ */ new Map();
      names.forEach((value, key) => {
        this.reversedNames.set(value, key);
      });
    }
    /**
     * 判断当前颜色是否为暗色。
     * @returns 一个布尔值，表示当前颜色是否为暗色。
     */
    isDark() {
      return this.getBrightness() < 128;
    }
    /**
     * 判断当前颜色是否为亮色。
     * @returns 一个布尔值，表示当前颜色是否为亮色。
     */
    isLight() {
      return !this.isDark();
    }
    /**
     * 计算当前颜色的亮度值。
     * 亮度值是根据 RGB 颜色空间中的红、绿、蓝三个通道的值计算得出的，计算公式为：(r * 299 + g * 587 + b * 114) / 1000。
     * @returns 返回颜色的感知亮度，范围从0-255。
     */
    getBrightness() {
      const rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    }
    /**
     * 计算当前颜色的相对亮度值。
     * 相对亮度值是根据 RGB 颜色空间中的红、绿、蓝三个通道的值计算得出的，计算公式为：0.2126 * R + 0.7152 * G + 0.0722 * B。
     * @returns 返回颜色的感知亮度，范围从0-1。
     */
    getLuminance() {
      const rgb = this.toRgb();
      let R2;
      let G2;
      let B2;
      const RsRGB = rgb.r / 255;
      const GsRGB = rgb.g / 255;
      const BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R2 = RsRGB / 12.92;
      } else {
        R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G2 = GsRGB / 12.92;
      } else {
        G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B2 = BsRGB / 12.92;
      } else {
        B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
    }
    /**
     * 获取当前颜色的透明度值。
     * 透明度值的范围是 0 到 1，其中 0 表示完全透明，1 表示完全不透明。
     * @returns 一个数字，表示当前颜色的透明度值。
     */
    getAlpha() {
      return this.a;
    }
    setAlpha(alpha = null) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    }
    /**
     * 判断当前颜色是否为单色。
     * 单色是指颜色的饱和度（S）为 0 的颜色，这些颜色只有明度（L）变化，没有颜色变化。
     * @returns 一个布尔值，表示当前颜色是否为单色。
     */
    isMonochrome() {
      const s2 = this.toHsl().s;
      return s2 == 0;
    }
    /**
     * 将当前颜色转换为 HSV（色相、饱和度、亮度）颜色空间。
     * @returns 一个对象，包含四个属性：`h`（色相）、`s`（饱和度）、`v`（亮度）和 `a`（透明度）。
     */
    toHsv() {
      const hsv = rgbToHsv(this.r, this.g, this.b);
      return new HSVA({ h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a });
    }
    /**
     * 将当前颜色转换为 HSV（色相、饱和度、亮度）颜色空间的字符串表示。
     * @returns 一个字符串，表示当前颜色的 HSV 或 HSVA 格式 hsva(xxx, xxx, xxx, xx)。
     */
    toHsvString() {
      const hsv = rgbToHsv(this.r, this.g, this.b);
      const h2 = Math.round(hsv.h * 360);
      const s2 = Math.round(hsv.s * 100);
      const v2 = Math.round(hsv.v * 100);
      return this.a == 1 ? "hsv(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(v2, "%, ").concat(this.roundA, ")");
    }
    /**
     * 将当前颜色对象转换为HSBA颜色空间,即Hue（色相）、Saturation（饱和度）、Brightness（亮度）和Alpha（透明度
     * @returns {HSBA} 返回一个HSBA对象，表示当前颜色对象在HSBA颜色空间中的值
     */
    toHsb() {
      const hsv = rgbToHsv(this.r, this.g, this.b);
      return new HSBA({ h: hsv.h * 360, s: hsv.s, b: hsv.v, a: this.a });
    }
    /**
     * 将当前颜色对象转换为CSS风格的HSB或HSVA字符串
     * @returns {string} 返回一个CSS风格的HSB或HSVA字符串，表示当前颜色对象的颜色值
     */
    toHsbString() {
      const hsb = this.toHsb();
      const h2 = Math.round(hsb.h);
      const s2 = Math.round(hsb.s * 100);
      const b2 = Math.round(hsb.b * 100);
      return this.a == 1 ? "hsb(".concat(h2, ", ").concat(s2, "%, ").concat(b2, "%)") : "hsva(".concat(h2, ", ").concat(s2, "%, ").concat(b2, "%, ").concat(this.roundA, ")");
    }
    /**
     * 将当前颜色转换为 HSL（色相、饱和度、明度）颜色空间。
     * @returns 一个对象，包含四个属性：`h`（色相）、`s`（饱和度）、`l`（明度）和 `a`（透明度）。
     */
    toHsl() {
      const hsl = rgbToHsl(this.r, this.g, this.b);
      return new HSLA({ h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a });
    }
    /**
     * 将当前颜色转换为 HSL（色相、饱和度、明度）颜色空间的字符串表示。
     * @returns 一个字符串，表示当前颜色的 HSL 或 HSLA 格式 hsla(xxx, xxx, xxx, xx)。
     */
    toHslString() {
      const hsl = rgbToHsl(this.r, this.g, this.b);
      const h2 = Math.round(hsl.h * 360);
      const s2 = Math.round(hsl.s * 100);
      const l2 = Math.round(hsl.l * 100);
      return this.a == 1 ? "hsl(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%)") : "hsla(".concat(h2, ", ").concat(s2, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
    }
    /**
     * 将当前颜色转换为十六进制颜色表示。
     * @param allow3Char 是否允许返回简写的十六进制颜色表示（如果可能）。默认值为 `false`。
     * @returns 一个字符串，表示当前颜色的十六进制格式。
     */
    toHex(allow3Char = false) {
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    }
    /**
     * 将当前颜色转换为带有井号（`#`）前缀的十六进制颜色表示。
     * @param allow3Char 是否允许返回简写的十六进制颜色表示（如果可能）。默认值为 `false`。
     * @returns 一个字符串，表示当前颜色的带有井号前缀的十六进制格式。
     */
    toHexString(allow3Char = false) {
      return "#" + this.toHex(allow3Char);
    }
    /**
     * 返回颜色的八位十六进制值.
     * @param allow4Char 如果可能的话，将十六进制值缩短为4个字符
     */
    toHex8(allow4Char = false) {
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    }
    /**
     * 返回颜色的八位十六进制值，并且值前面带有#符号.
     * @param allow4Char 如果可能的话，将十六进制值缩短为4个字符
     */
    toHex8String(allow4Char = false) {
      return "#" + this.toHex8(allow4Char);
    }
    /**
     * 根据颜色的透明度（Alpha值）返回较短的十六进制值，并且值前面带有#符号。
     * @param allowShortChar 如果可能的话，将十六进制值缩短至3个或4个字符
     */
    toHexShortString(allowShortChar = false) {
      return this.a == 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    }
    /**
     * 将当前颜色转换为 RGB（红、绿、蓝）颜色空间的对象表示。
     * @returns 一个包含 `r`、`g`、`b` 和 `a` 属性的对象，表示当前颜色的 RGB 格式。
     */
    toRgb() {
      return new RGBA({
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      });
    }
    /**
     * 将当前颜色对象转换为CSS风格的RGB或RGBA字符串
     * @returns {string} 返回一个CSS风格的RGB或RGBA字符串，表示当前颜色对象的颜色值
     */
    toRgbString() {
      const r2 = Math.round(this.r);
      const g2 = Math.round(this.g);
      const b2 = Math.round(this.b);
      return this.a == 1 ? "rgb(".concat(r2, ", ").concat(g2, ", ").concat(b2, ")") : "rgba(".concat(r2, ", ").concat(g2, ", ").concat(b2, ", ").concat(this.roundA, ")");
    }
    /**
     * 将当前颜色转换为百分比表示的 RGB（红、绿、蓝）颜色空间的对象表示。
     * @returns 一个包含 `r`、`g`、`b` 和 `a` 属性的对象，表示当前颜色的百分比表示的 RGB 格式。
     */
    toPercentageRgb() {
      const fmt = (x) => {
        return "".concat(Math.round(bound01(x, 255) * 100), "%");
      };
      return new RGBAString({
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      });
    }
    /**
     * 将RGBA相对值插值为一个字符串，颜色值以百分比表示。
     */
    toPercentageRgbString() {
      const rnd = (x) => {
        return Math.round(bound01(x, 255) * 100);
      };
      return this.a == 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    }
    /**
     * 返回这个颜色的'真实'名称,不存在返回null
     */
    toName() {
      if (this.a == 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return null;
      }
      const hex = this.toHexString();
      return UTS.mapGet(this.reversedNames, hex);
    }
    /**
     * 将颜色转换为字符串表示。
     *
     * @param format - 用于显示字符串表示的格式。
     */
    // toString<T extends 'name'>(format : T) : string;
    // toString<T extends LColorFormats>(format ?: T) : string;
    toString(format = null) {
      var _a;
      const formatSet = toBoolean$1(format);
      let _format = format !== null && format !== void 0 ? format : this.format;
      let formattedString = null;
      const hasAlpha = this.a < 1 && this.a >= 0;
      const needsAlphaFormat = !formatSet && hasAlpha && (_format != null && _format.startsWith("hex") || _format == "name");
      if (needsAlphaFormat) {
        if (_format == "name" && this.a == 0) {
          return (_a = this.toName()) !== null && _a !== void 0 ? _a : "transparent";
        }
        return this.toRgbString();
      }
      if (_format == "rgb") {
        formattedString = this.toRgbString();
      }
      if (_format == "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (_format == "hex" || _format == "hex6") {
        formattedString = this.toHexString();
      }
      if (_format == "hex3") {
        formattedString = this.toHexString(true);
      }
      if (_format == "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (_format == "hex8") {
        formattedString = this.toHex8String();
      }
      if (_format == "name") {
        formattedString = this.toName();
      }
      if (_format == "hsl") {
        formattedString = this.toHslString();
      }
      if (_format == "hsv") {
        formattedString = this.toHsvString();
      }
      if (_format == "hsb") {
        formattedString = this.toHsbString();
      }
      return formattedString !== null && formattedString !== void 0 ? formattedString : this.toHexString();
    }
    toNumber() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }
    clone() {
      return new TinyColor(this.toString());
    }
    /**
     * 将颜色变浅指定的量。提供100将始终返回白色。
     * @param amount - 有效值介于1-100之间
     */
    lighten(amount = 10) {
      const hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor(hsl, new LColorOptions({ format: this.format }));
    }
    /**
     * 将颜色变亮一定的量，范围从0到100。
     * @param amount - 有效值在1-100之间
     */
    brighten(amount = 10) {
      const rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor(rgb, new LColorOptions({ format: this.format }));
    }
    /**
     * 将颜色变暗一定的量，范围从0到100。
     * 提供100将始终返回黑色。
     * @param amount - 有效值在1-100之间
     */
    darken(amount = 10) {
      const hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor(hsl, new LColorOptions({ format: this.format }));
    }
    /**
     * 将颜色与纯白色混合，范围从0到100。
     * 提供0将什么都不做，提供100将始终返回白色。
     * @param amount - 有效值在1-100之间
     */
    tint(amount = 10) {
      return this.mix("white", amount);
    }
    /**
     * 将颜色与纯黑色混合，范围从0到100。
     * 提供0将什么都不做，提供100将始终返回黑色。
     * @param amount - 有效值在1-100之间
     */
    shade(amount = 10) {
      return this.mix("black", amount);
    }
    /**
     * 将颜色的饱和度降低一定的量，范围从0到100。
     * 提供100与调用greyscale相同
     * @param amount - 有效值在1-100之间
     */
    desaturate(amount = 10) {
      const hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor(hsl, new LColorOptions({ format: this.format }));
    }
    /**
     * 将颜色饱和度提高一定数量，范围从 0 到 100。
     * @param amount - 有效值介于 1 到 100 之间。
     */
    saturate(amount = 10) {
      const hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor(hsl, new LColorOptions({ format: this.format }));
    }
    /**
     * 将颜色完全去饱和为灰度。
     * 等同于调用 `desaturate(100)`。
     */
    greyscale() {
      return this.desaturate(100);
    }
    /**
     * spin 方法接收一个正数或负数作为参数，表示色相的变化量，变化范围在 [-360, 360] 之间。
     * 如果提供的值超出此范围，它将被限制在此范围内。
     */
    spin(amount) {
      const hsl = this.toHsl();
      const hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor(hsl, new LColorOptions({ format: this.format }));
    }
    /**
     * 将当前颜色与另一种颜色按给定的比例混合，范围从0到100。
     * 0表示不混合（返回当前颜色）
     */
    mix(color = null, amount = 50) {
      const rgb1 = this.toRgb();
      const rgb2 = new TinyColor(color).toRgb();
      const p2 = amount / 100;
      const rgba = new UTSJSONObject({
        r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
        g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
        b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
        a: (rgb2.a - rgb1.a) * p2 + rgb1.a
      });
      return new TinyColor(rgba, new LColorOptions({ format: this.format }));
    }
    /**
     * 生成一组与当前颜色相似的颜色。
     * 这些颜色在色相环上是相邻的，形成一个类似于彩虹的颜色序列。
     * @param results - 要生成的相似颜色的数量，默认值为 6。
     * @param slices - 将色相环划分为多少个部分，默认值为 30。
     * @returns 一个包含当前颜色及其相似颜色的 TinyColor 对象数组。
     */
    analogous(results = 6, slices = 30) {
      const hsl = this.toHsl();
      const part = 360 / slices;
      const ret = [this];
      let _results = results;
      hsl.h = (hsl.h - (part * _results >> 1) + 720) % 360;
      while (_results > 0) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor(hsl));
        _results--;
      }
      return ret;
    }
    /**
     * 计算当前颜色的补色。
     * 补色是指在色相环上相对位置的颜色，它们的色相差为 180°。
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     * @returns 一个 TinyColor 对象，表示当前颜色的补色。
     */
    complement() {
      const hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor(hsl, new LColorOptions({ format: this.format }));
    }
    /**
     * 生成一组与当前颜色具有相同色相和饱和度的颜色。
     * 这些颜色的亮度值不同，形成一个单色调的颜色序列。
     * @param results - 要生成的单色调颜色的数量，默认值为 6。
     * @returns 一个包含当前颜色及其单色调颜色的 TinyColor 对象数组。
     */
    monochromatic(results = 6) {
      const hsv = this.toHsv();
      const h2 = hsv.h;
      const s2 = hsv.s;
      let v2 = hsv.v;
      const res = [];
      const modification = 1 / results;
      let _results = results;
      while (_results > 0) {
        res.push(new TinyColor(new UTSJSONObject({ h: h2, s: s2, v: v2 })));
        v2 = (v2 + modification) % 1;
        _results--;
      }
      return res;
    }
    /**
     * 生成当前颜色的分裂补色。
     * 分裂补色是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 180°。
     * @returns 一个包含当前颜色及其分裂补色的 TinyColor 对象数组。
     */
    splitcomplement() {
      const hsl = this.toHsl();
      const h2 = hsl.h;
      return [
        this,
        new TinyColor(new UTSJSONObject({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l })),
        new TinyColor(new UTSJSONObject({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l }))
      ];
    }
    /**
     * 计算当前颜色在给定背景颜色上的显示效果。
     * @param background - 背景颜色，可以是任何 LColorInput 类型的值。
     * @returns 一个 TinyColor 对象，表示当前颜色在给定背景颜色上的显示效果。
     */
    onBackground(background = null) {
      const fg = this.toRgb();
      const bg = new TinyColor(background).toRgb();
      const alpha = fg.a + bg.a * (1 - fg.a);
      return new TinyColor(new UTSJSONObject({
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha
      }));
    }
    /**
     * 生成当前颜色的三色调。
     * 三色调是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 120°。
     * 这是 `polyad(3)` 方法的别名。
     * @returns 一个包含当前颜色及其三色调颜色的 TinyColor 对象数组。
     */
    triad() {
      return this.polyad(3);
    }
    /**
     * 生成当前颜色的四色调。
     * 四色调是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 90°。
     * 这是 `polyad(4)` 方法的别名。
     * @returns 一个包含当前颜色及其四色调颜色的 TinyColor 对象数组。
     */
    tetrad() {
      return this.polyad(4);
    }
    /**
     * 生成当前颜色的 n 色调。
     * n 色调是指在色相环上位于当前颜色的两侧的颜色，它们的色相差为 360° / n。
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     * @param n - 一个整数，表示要生成的色调数量。
     * @returns 一个包含当前颜色及其 n 色调颜色的 TinyColor 对象数组。
     */
    polyad(n2) {
      const hsl = this.toHsl();
      const h2 = hsl.h;
      const result = [this];
      const increment = 360 / n2;
      for (let i2 = 1; i2 < n2; i2++) {
        result.push(new TinyColor(new UTSJSONObject({ h: (h2 + i2 * increment) % 360, s: hsl.s, l: hsl.l })));
      }
      return result;
    }
    /**
     * 比较当前颜色与给定颜色是否相等。
     * @param color - 一个 LColorInput 类型的值，表示要比较的颜色。
     * @returns 一个布尔值，表示当前颜色与给定颜色是否相等。
     */
    equals(other = null) {
      if (other == null) {
        return false;
      } else if (UTS.isInstanceOf(other, TinyColor)) {
        return this.toRgbString() == other.toRgbString();
      }
      return this.toRgbString() == new TinyColor(other).toRgbString();
    }
  }
  function tinyColor(color = "", opts = new LColorOptions({})) {
    return new TinyColor(color, opts);
  }
  class DarkColorMapItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            index: { type: Number, optional: false },
            opacity: { type: Number, optional: false }
          };
        },
        name: "DarkColorMapItem"
      };
    }
    constructor(options, metadata = DarkColorMapItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.index = this.__props__.index;
      this.opacity = this.__props__.opacity;
      delete this.__props__;
    }
  }
  [
    new DarkColorMapItem({ index: 7, opacity: 0.15 }),
    new DarkColorMapItem({ index: 6, opacity: 0.25 }),
    new DarkColorMapItem({ index: 5, opacity: 0.3 }),
    new DarkColorMapItem({ index: 5, opacity: 0.45 }),
    new DarkColorMapItem({ index: 5, opacity: 0.65 }),
    new DarkColorMapItem({ index: 5, opacity: 0.85 }),
    new DarkColorMapItem({ index: 4, opacity: 0.9 }),
    new DarkColorMapItem({ index: 3, opacity: 0.95 }),
    new DarkColorMapItem({ index: 2, opacity: 0.97 }),
    new DarkColorMapItem({ index: 1, opacity: 0.98 })
  ];
  class UseLoadingReturn extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            ratio: { type: "Unknown", optional: false },
            type: { type: "Unknown", optional: false },
            mode: { type: "Unknown", optional: false },
            color: { type: String, optional: false },
            play: { type: "Unknown", optional: false },
            failed: { type: "Unknown", optional: false },
            clear: { type: "Unknown", optional: false },
            destroy: { type: "Unknown", optional: false },
            pause: { type: "Unknown", optional: false }
          };
        },
        name: "UseLoadingReturn"
      };
    }
    constructor(options, metadata = UseLoadingReturn.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.ratio = this.__props__.ratio;
      this.type = this.__props__.type;
      this.mode = this.__props__.mode;
      this.color = this.__props__.color;
      this.play = this.__props__.play;
      this.failed = this.__props__.failed;
      this.clear = this.__props__.clear;
      this.destroy = this.__props__.destroy;
      this.pause = this.__props__.pause;
      delete this.__props__;
    }
  }
  function getPointOnCircle(centerX, centerY, radius, angleDegrees) {
    const angleRadians = angleDegrees * Math.PI / 180;
    const x = centerX + radius * Math.cos(angleRadians);
    const y2 = centerY + radius * Math.sin(angleRadians);
    return [x, y2];
  }
  function useLoading(element) {
    const tick = vue.ref("pause");
    const state = vue.reactive(new UseLoadingReturn({
      color: "#000",
      type: "circular",
      ratio: 1,
      mode: "raf",
      play: () => {
        tick.value = "play";
      },
      failed: () => {
        tick.value = "failed";
      },
      clear: () => {
        tick.value = "clear";
      },
      destroy: () => {
        tick.value = "destroy";
      },
      pause: () => {
        tick.value = "pause";
      }
    }));
    const context = vue.shallowRef(null);
    let isPlaying = false;
    let canvasWidth = vue.ref(0);
    let canvasHeight = vue.ref(0);
    let canvasSize = vue.ref(0);
    let animationFrameId = -1;
    let animation = null;
    let drawFrame = null;
    const size = vue.computed(() => {
      return state.ratio > 1 ? state.ratio : canvasSize.value * state.ratio;
    });
    const drawCircular = () => {
      let startAngle = 0;
      let endAngle = 0;
      let rotate = 0;
      const MIN_ANGLE = 5;
      const ARC_LENGTH = 359.5;
      const PI = Math.PI / 180;
      const SPEED = 0.018 / 4;
      const ROTATE_INTERVAL = 0.09 / 4;
      const lineWidth = size.value / 10;
      const x = canvasWidth.value / 2;
      const y2 = canvasHeight.value / 2;
      const radius = size.value / 2 - lineWidth;
      drawFrame = () => {
        if (context.value == null || !isPlaying)
          return null;
        let ctx = context.value;
        ctx.reset();
        ctx.beginPath();
        ctx.arc(x, y2, radius, startAngle * PI + rotate, endAngle * PI + rotate);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = state.color;
        ctx.stroke();
        if (endAngle < ARC_LENGTH) {
          endAngle = Math.min(ARC_LENGTH, endAngle + (ARC_LENGTH - MIN_ANGLE) * SPEED);
        } else if (startAngle < ARC_LENGTH) {
          startAngle = Math.min(ARC_LENGTH, startAngle + (ARC_LENGTH - MIN_ANGLE) * SPEED);
        } else {
          startAngle = 0;
          endAngle = MIN_ANGLE;
        }
        ctx.update();
        if (state.mode == "raf") {
          rotate = (rotate + ROTATE_INTERVAL) % 360;
          if (isPlaying && drawFrame != null) {
            animationFrameId = requestAnimationFrame(drawFrame);
          }
        }
      };
    };
    let lastTime = Date.now();
    const drawSpinner = () => {
      const steps = 12;
      const lineWidth = size.value / 10;
      const x = canvasWidth.value / 2;
      const y2 = canvasHeight.value / 2;
      let step = 0;
      const length = size.value / 3.6 - lineWidth;
      const offset = size.value / 4;
      function generateColorGradient(hex, steps2) {
        const colors2 = [];
        const _color = tinyColor(hex);
        for (let i2 = 1; i2 <= steps2; i2++) {
          _color.setAlpha(i2 / steps2);
          colors2.push(_color.toRgbString());
        }
        return colors2;
      }
      let colors = vue.computed(() => {
        return generateColorGradient(state.color, steps);
      });
      drawFrame = () => {
        if (context.value == null || !isPlaying)
          return null;
        const delta = Date.now() - lastTime;
        if (delta >= 1e3 / 10) {
          lastTime = Date.now();
          let ctx = context.value;
          ctx.reset();
          for (let i2 = 0; i2 < steps; i2++) {
            const stepAngle = 360 / steps;
            const angle = stepAngle * i2;
            const index = (steps + i2 - step) % steps;
            const radian = angle * Math.PI / 180;
            const cos = Math.cos(radian);
            const sin = Math.sin(radian);
            ctx.beginPath();
            ctx.moveTo(x + offset * cos, y2 + offset * sin);
            ctx.lineTo(x + (offset + length) * cos, y2 + (offset + length) * sin);
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.strokeStyle = colors.value[index];
            ctx.stroke();
          }
          ctx.update();
          if (state.mode == "raf") {
            step = (step + 1) % steps;
          }
        }
        if (state.mode == "raf") {
          if (isPlaying && drawFrame != null) {
            animationFrameId = requestAnimationFrame(drawFrame);
          }
        }
      };
    };
    const drwaFailed = () => {
      if (context.value == null)
        return null;
      let ctx = context.value;
      const innerSize = size.value * 0.8;
      const lineWidth = innerSize / 10;
      const lineLength = (size.value - lineWidth) / 2;
      const centerX = canvasWidth.value / 2;
      const centerY = canvasHeight.value / 2;
      const radius = (size.value - lineWidth) / 2;
      const angleRadians1 = 45 * Math.PI / 180;
      const angleRadians2 = (45 - 90) * Math.PI / 180;
      ctx.reset();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = state.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = state.color;
      ctx.stroke();
      const _a = __read(getPointOnCircle(centerX, centerY, lineLength / 2, 180 + 45), 2), startX1 = _a[0], startY = _a[1];
      const _b = __read(getPointOnCircle(centerX, centerY, lineLength / 2, 180 + 90 + 45), 1), startX2 = _b[0];
      const x2 = Math.sin(angleRadians1) * lineLength + startX1;
      const y2 = Math.cos(angleRadians1) * lineLength + startY;
      ctx.beginPath();
      ctx.moveTo(startX1, startY);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      const x3 = Math.sin(angleRadians2) * lineLength + startX2;
      const y3 = Math.cos(angleRadians2) * lineLength + startY;
      ctx.beginPath();
      ctx.moveTo(startX2, startY);
      ctx.lineTo(x3, y3);
      ctx.stroke();
      ctx.update();
    };
    let currentType = null;
    const useMode = () => {
      if (state.mode != "raf") {
        const keyframes = [new UTSJSONObject({ transform: "rotate(0)" }), new UTSJSONObject({ transform: "rotate(360)" })];
        animation = element.value.animate(keyframes, new UTSJSONObject({
          duration: 8e4,
          easing: "linear",
          // fill: 'forwards',
          iterations: Infinity
        }));
      }
    };
    const startAnimation = (type) => {
      if (context.value == null || element.value == null)
        return null;
      animation === null || animation === void 0 ? null : animation.pause();
      if (currentType == type) {
        isPlaying = true;
        animation === null || animation === void 0 ? null : animation.play();
        drawFrame === null || drawFrame === void 0 ? null : drawFrame();
        return null;
      }
      if (type == "circular") {
        currentType = "circular";
        drawCircular();
        useMode();
      }
      if (type == "spinner") {
        currentType = "spinner";
        drawSpinner();
        useMode();
      }
      isPlaying = true;
      drawFrame === null || drawFrame === void 0 ? null : drawFrame();
    };
    const resizeObserver = new UniResizeObserver((_entries) => {
      requestAnimationFrame(() => {
        var _a, _b;
        (_b = (_a = element.value) === null || _a === void 0 ? null : _a.getBoundingClientRectAsync()) === null || _b === void 0 ? null : _b.then((rect) => {
          if (rect.width == 0 || rect.height == 0)
            return null;
          context.value = element.value.getDrawableContext();
          canvasWidth.value = rect.width;
          canvasHeight.value = rect.height;
          canvasSize.value = Math.min(rect.width, rect.height);
        });
      });
    });
    vue.watchEffect(() => {
      if (element.value == null)
        return null;
      resizeObserver.observe(element.value);
    });
    vue.watchEffect(() => {
      var _a, _b, _c, _d;
      if (context.value == null)
        return null;
      if (tick.value == "play") {
        startAnimation(state.type);
      }
      if (tick.value == "failed") {
        clearTimeout(animationFrameId);
        animation === null || animation === void 0 ? null : animation.pause();
        animation === null || animation === void 0 ? null : animation.cancel();
        drwaFailed();
        return null;
      }
      if (tick.value == "clear") {
        clearTimeout(animationFrameId);
        animation === null || animation === void 0 ? null : animation.pause();
        animation === null || animation === void 0 ? null : animation.cancel();
        (_a = context.value) === null || _a === void 0 ? null : _a.reset();
        (_b = context.value) === null || _b === void 0 ? null : _b.update();
        isPlaying = false;
        return null;
      }
      if (tick.value == "destroy") {
        clearTimeout(animationFrameId);
        animation === null || animation === void 0 ? null : animation.pause();
        animation === null || animation === void 0 ? null : animation.cancel();
        (_c = context.value) === null || _c === void 0 ? null : _c.reset();
        (_d = context.value) === null || _d === void 0 ? null : _d.update();
        context.value = null;
        animation = null;
        isPlaying = false;
        return null;
      }
      if (tick.value == "pause") {
        clearTimeout(animationFrameId);
        isPlaying = false;
        animation === null || animation === void 0 ? null : animation.pause();
        return null;
      }
    });
    return state;
  }
  const name$2 = "l-loading";
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "l-loading",
    props: {
      color: new UTSJSONObject({ type: String, required: false }),
      type: new UTSJSONObject({ type: String, required: true, default: "circular" }),
      size: new UTSJSONObject({ type: String, required: true, default: "40rpx" }),
      text: new UTSJSONObject({ type: String, required: false }),
      textColor: new UTSJSONObject({ type: String, required: false }),
      textSize: new UTSJSONObject({ type: String, required: false }),
      mode: new UTSJSONObject({ type: String, required: true, default: "raf" }),
      vertical: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      animated: new UTSJSONObject({ type: Boolean, required: true, default: true })
    },
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const props = __props;
      const classes = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set(name$2 + "--" + props.type, true);
        if (props.vertical) {
          cls2.set("is-vertical", props.vertical);
        } else {
          cls2.set("is-horizontal", !props.vertical);
        }
        return cls2;
      });
      const spinnerStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        style.set("width", props.size);
        style.set("height", props.size);
        return style;
      });
      const textStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.textColor != null) {
          style.set("color", props.textColor);
        }
        if (props.textSize != null) {
          style.set("font-size", props.textSize);
        }
        return style;
      });
      const loadingRef = vue.ref(null);
      const loading = useLoading(loadingRef);
      loading.type = props.type;
      loading.mode = props.mode;
      if (props.animated) {
        loading.play();
      }
      vue.watchEffect(() => {
        var _a2, _b;
        if (loadingRef.value == null)
          return null;
        const color = (_a2 = props.color) !== null && _a2 !== void 0 ? _a2 : (_b = loadingRef.value) === null || _b === void 0 ? null : _b.style.getPropertyValue("border-left-color");
        loading.color = color == null || color.length == 0 ? "#1677ff" : color;
        if (props.animated) {
          loading.play();
        } else {
          loading.pause();
        }
      });
      const __returned__ = { name: name$2, props, classes, spinnerStyle, textStyle, loadingRef, loading };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$r = { "l-loading": { "": { "display": "flex", "position": "relative", "flexDirection": "row", "alignItems": "center", "borderLeftColor": "#3283ff", "borderLeftWidth": 0 }, ".is-vertical": { "flexDirection": "column" } }, "l-loading__text": { "": { "marginLeft": "16rpx", "color": "rgba(0,0,0,0.45)", "fontSize": 14 }, ".l-loading.is-vertical ": { "marginTop": "8rpx", "marginRight": 0, "marginBottom": 0, "marginLeft": 0 } }, "l-loading__ball": { "": { "width": "40rpx", "height": "40rpx" } }, "l-loading__circular": { "": { "width": "40rpx", "height": "40rpx" } }, "l-loading__spinner": { "": { "width": "40rpx", "height": "40rpx" } } };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["l-loading", $setup.classes])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "l-loading__view",
            ref: "loadingRef",
            style: vue.normalizeStyle($setup.spinnerStyle)
          },
          null,
          4
          /* STYLE */
        ),
        _ctx.$slots["default"] != null || $props.text != null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: "l-loading__text",
            style: vue.normalizeStyle($setup.textStyle)
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(
                vue.toDisplayString($props.text),
                1
                /* TEXT */
              )
            ])
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["styles", [_style_0$r]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-loading/components/l-loading/l-loading.uvue"]]);
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent(Object.assign({
    behaviors: ["wx://form-field-button"]
  }, { __name: "l-button", props: {
    ariaLabel: new UTSJSONObject({ type: String, required: false }),
    lId: new UTSJSONObject({ type: String, required: false }),
    content: new UTSJSONObject({ type: String, required: false }),
    block: new UTSJSONObject({ type: Boolean, required: true, default: false }),
    disabled: new UTSJSONObject({ type: Boolean, required: true, default: false }),
    ghost: new UTSJSONObject({ type: Boolean, required: true, default: false }),
    icon: new UTSJSONObject({ type: String, required: false }),
    iconSize: new UTSJSONObject({ type: String, required: false }),
    loading: new UTSJSONObject({ type: Boolean, required: true, default: false }),
    loadingProps: new UTSJSONObject({ type: null, required: false }),
    shape: new UTSJSONObject({ type: String, required: true, default: "rectangle" }),
    size: new UTSJSONObject({ type: String, required: true, default: "medium" }),
    suffix: new UTSJSONObject({ type: String, required: false }),
    type: new UTSJSONObject({ type: String, required: true, default: "default" }),
    variant: new UTSJSONObject({ type: String, required: false }),
    radius: new UTSJSONObject({ type: String, required: false }),
    fontSize: new UTSJSONObject({ type: String, required: false }),
    textColor: new UTSJSONObject({ type: String, required: false }),
    color: new UTSJSONObject({ type: String, required: false }),
    lStyle: new UTSJSONObject({ type: String, required: false }),
    gap: new UTSJSONObject({ type: String, required: false }),
    formType: new UTSJSONObject({ type: String, required: false }),
    openType: new UTSJSONObject({ type: String, required: false }),
    hoverClass: new UTSJSONObject({ type: String, required: false }),
    hoverStopPropagation: new UTSJSONObject({ type: Boolean, required: true, default: false }),
    hoverStartTime: new UTSJSONObject({ type: Number, required: true, default: 20 }),
    hoverStayTime: new UTSJSONObject({ type: Number, required: true, default: 70 }),
    lang: new UTSJSONObject({ type: String, required: true, default: "en" }),
    sessionFrom: new UTSJSONObject({ type: String, required: true, default: "" }),
    sendMessageTitle: new UTSJSONObject({ type: String, required: true, default: "" }),
    sendMessagePath: new UTSJSONObject({ type: String, required: true, default: "" }),
    sendMessageImg: new UTSJSONObject({ type: String, required: true, default: "" }),
    appParameter: new UTSJSONObject({ type: String, required: true, default: "" }),
    showMessageCard: new UTSJSONObject({ type: Boolean, required: true, default: false })
  }, emits: ["click", "agreeprivacyauthorization", "chooseavatar", "getuserinfo", "contact", "getphonenumber", "error", "opensetting", "launchapp"], setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    __expose();
    const emit = __emit;
    const props = __props;
    const instance = vue.getCurrentInstance();
    const buttonTextRef = vue.ref(null);
    const hasContent = vue.computed(() => {
      var _a2, _b;
      return props.content != null || ((_b = (_a2 = instance === null || instance === void 0 ? null : instance.proxy) === null || _a2 === void 0 ? null : _a2.$slots) === null || _b === void 0 ? null : _b["default"]) != null;
    });
    const variant = vue.computed(() => {
      var _a2;
      return (_a2 = props.variant) !== null && _a2 !== void 0 ? _a2 : props.color != null ? "solid" : props.type == "default" ? "outline" : "solid";
    });
    const classes = vue.computed(() => {
      const cls2 = /* @__PURE__ */ new Map();
      const name2 = "l-button";
      cls2.set("".concat(name2, "--").concat(props.size), true);
      cls2.set("".concat(name2, "--").concat(props.type), true);
      cls2.set("".concat(name2, "--").concat(variant.value), true);
      cls2.set("".concat(name2, "--").concat(props.shape), true);
      cls2.set("".concat(name2, "--disabled"), props.disabled);
      cls2.set("".concat(name2, "--loading"), props.loading);
      cls2.set("".concat(name2, "--ghost"), props.ghost);
      cls2.set("".concat(name2, "--block"), props.block);
      return cls2;
    });
    const styles = vue.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (props.radius != null) {
        style.set("border-radius", props.radius);
      }
      if (props.color != null) {
        if (variant.value == "solid") {
          style.set("background", props.color);
        } else if (["outline", "dashed"].includes(variant.value)) {
          style.set("border-color", props.color);
        }
      }
      return style;
    });
    const sizes = /* @__PURE__ */ new Map([
      ["mini", "16px"],
      ["small", "18px"],
      ["medium", "18px"],
      ["large", "24px"]
    ]);
    const innerIconSize = vue.computed(() => {
      var _a2, _b;
      return (_b = (_a2 = props.iconSize) !== null && _a2 !== void 0 ? _a2 : props.fontSize) !== null && _b !== void 0 ? _b : UTS.mapGet(sizes, props.size);
    });
    const colors = /* @__PURE__ */ new Map([
      // ['default', 'rgba(0,0,0,0.88)'],
      // ['primary', '#3283ff'],
      // ['danger', '#FF4D4F'],
      // ['warning', '#ffb400'],
      // ['success', '#34c471'],
      // ['info', '#3283ff'],
    ]);
    const loadingColor = vue.computed(() => {
      var _a2, _b, _c;
      return (_c = (_a2 = props.textColor) !== null && _a2 !== void 0 ? _a2 : variant.value == "solid" ? "white" : (_b = buttonTextRef.value) === null || _b === void 0 ? null : _b.style.getPropertyValue("color")) !== null && _c !== void 0 ? _c : "";
    });
    const gapClass = vue.computed(() => {
      return props.loading || props.icon != null ? "gap" : "";
    });
    const contentStyle = vue.computed(() => {
      var _a2;
      const style = /* @__PURE__ */ new Map();
      if (props.gap != null && (props.loading || props.icon != null)) {
        style.set("margin-left", props.gap);
      }
      if (props.textColor != null || props.color != null && variant.value != "solid") {
        style.set("color", (_a2 = props.textColor) !== null && _a2 !== void 0 ? _a2 : props.color);
      }
      if (props.fontSize != null) {
        style.set("font-size", props.fontSize);
      }
      return style;
    });
    const getuserinfo = (e2) => {
      emit("getuserinfo", e2);
    };
    const contact = (e2) => {
      emit("contact", e2);
    };
    const getphonenumber = (e2) => {
      emit("getphonenumber", e2);
    };
    const error = (e2) => {
      emit("error", e2);
    };
    const opensetting = (e2) => {
      emit("opensetting", e2);
    };
    const launchapp = (e2) => {
      emit("launchapp", e2);
    };
    const chooseavatar = (e2) => {
      emit("chooseavatar", e2);
    };
    const agreeprivacyauthorization = (e2) => {
      emit("agreeprivacyauthorization", e2);
    };
    const handleTap = (e2) => {
      if (props.disabled || props.loading)
        return null;
      emit("click", e2);
    };
    const __returned__ = { emit, props, instance, buttonTextRef, hasContent, variant, classes, styles, sizes, innerIconSize, colors, loadingColor, gapClass, contentStyle, getuserinfo, contact, getphonenumber, error, opensetting, launchapp, chooseavatar, agreeprivacyauthorization, handleTap };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  } }));
  const _style_0$q = { "l-button--mini": { "": { "paddingTop": 0, "paddingRight": "16rpx", "paddingBottom": 0, "paddingLeft": "16rpx", "height": "56rpx" }, ".l-button--square": { "width": "56rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "56rpx", "paddingLeft": 0, "paddingRight": 0 } }, "l-button__content": { ".l-button--mini ": { "fontSize": 12 }, ".l-button--small ": { "fontSize": 14 }, ".l-button--medium ": { "fontSize": 16 }, ".l-button--large ": { "fontSize": 16 }, ".l-button--default ": { "color": "rgba(0,0,0,0.88)" }, ".l-button--primary ": { "color": "#3283ff" }, ".l-button--danger ": { "color": "#FF4D4F" }, ".l-button--info ": { "color": "#3283ff" }, ".l-button--warning ": { "color": "#ffb400" }, ".l-button--success ": { "color": "#34c471" }, ".l-button--solid ": { "color": "#FFFFFF" } }, "l-button--small": { "": { "paddingTop": 0, "paddingRight": "24rpx", "paddingBottom": 0, "paddingLeft": "24rpx", "height": "64rpx" }, ".l-button--square": { "width": "64rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "64rpx", "paddingLeft": 0, "paddingRight": 0 } }, "l-button--medium": { "": { "paddingTop": 0, "paddingRight": "32rpx", "paddingBottom": 0, "paddingLeft": "32rpx", "height": "80rpx" }, ".l-button--square": { "width": "80rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "80rpx", "paddingLeft": 0, "paddingRight": 0 } }, "l-button--large": { "": { "paddingTop": 0, "paddingRight": "48rpx", "paddingBottom": 0, "paddingLeft": "48rpx", "height": "96rpx" }, ".l-button--square": { "width": "96rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "96rpx", "paddingLeft": 0, "paddingRight": 0 } }, "hover": { ".l-button--default": { "backgroundColor": "#eeeeee" }, ".l-button--default.l-button--solid": { "backgroundColor": "#000000" }, ".l-button--default.l-button--light": { "backgroundColor": "#e7e7e7" }, ".l-button--primary": { "backgroundColor": "#F0F8FF" }, ".l-button--primary.l-button--solid": { "backgroundColor": "#2164d9" }, ".l-button--primary.l-button--light": { "backgroundColor": "#d6ecff" }, ".l-button--danger": { "backgroundColor": "#fff2f0" }, ".l-button--danger.l-button--solid": { "backgroundColor": "#d9363e" }, ".l-button--danger.l-button--light": { "backgroundColor": "#ffccc7" }, ".l-button--info": { "backgroundColor": "#d6ecff" }, ".l-button--info.l-button--solid": { "backgroundColor": "#2164d9" }, ".l-button--info.l-button--light": { "backgroundColor": "#add6ff" }, ".l-button--warning": { "backgroundColor": "#fffce6" }, ".l-button--warning.l-button--solid": { "backgroundColor": "#d99100" }, ".l-button--warning.l-button--light": { "backgroundColor": "#fff0a3" }, ".l-button--success": { "backgroundColor": "#f0fff4" }, ".l-button--success.l-button--solid": { "backgroundColor": "#239e5a" }, ".l-button--success.l-button--light": { "backgroundColor": "#e1f7e7" } }, "l-button--default": { ".l-button--solid": { "backgroundColor": "rgba(0,0,0,0.88)" }, ".l-button--outline": { "borderTopColor": "#c5c5c5", "borderRightColor": "#c5c5c5", "borderBottomColor": "#c5c5c5", "borderLeftColor": "#c5c5c5" }, ".l-button--dashed": { "borderTopColor": "#c5c5c5", "borderRightColor": "#c5c5c5", "borderBottomColor": "#c5c5c5", "borderLeftColor": "#c5c5c5" }, ".l-button--light": { "backgroundColor": "#eeeeee" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#c5c5c5", "borderRightColor": "#c5c5c5", "borderBottomColor": "#c5c5c5", "borderLeftColor": "#c5c5c5" } }, "l-button--primary": { ".l-button--solid": { "backgroundColor": "#3283ff" }, ".l-button--outline": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--dashed": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--light": { "backgroundColor": "#F0F8FF" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" } }, "l-button--danger": { ".l-button--solid": { "backgroundColor": "#FF4D4F" }, ".l-button--outline": { "borderTopColor": "#FF4D4F", "borderRightColor": "#FF4D4F", "borderBottomColor": "#FF4D4F", "borderLeftColor": "#FF4D4F" }, ".l-button--dashed": { "borderTopColor": "#FF4D4F", "borderRightColor": "#FF4D4F", "borderBottomColor": "#FF4D4F", "borderLeftColor": "#FF4D4F" }, ".l-button--light": { "backgroundColor": "#fff2f0" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#FF4D4F", "borderRightColor": "#FF4D4F", "borderBottomColor": "#FF4D4F", "borderLeftColor": "#FF4D4F" } }, "l-button--info": { ".l-button--solid": { "backgroundColor": "#3283ff" }, ".l-button--outline": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--dashed": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--light": { "backgroundColor": "#d6ecff" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" } }, "l-button--warning": { ".l-button--solid": { "backgroundColor": "#ffb400" }, ".l-button--outline": { "borderTopColor": "#ffb400", "borderRightColor": "#ffb400", "borderBottomColor": "#ffb400", "borderLeftColor": "#ffb400" }, ".l-button--dashed": { "borderTopColor": "#ffb400", "borderRightColor": "#ffb400", "borderBottomColor": "#ffb400", "borderLeftColor": "#ffb400" }, ".l-button--light": { "backgroundColor": "#fffce6" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#ffb400", "borderRightColor": "#ffb400", "borderBottomColor": "#ffb400", "borderLeftColor": "#ffb400" } }, "l-button--success": { ".l-button--solid": { "backgroundColor": "#34c471" }, ".l-button--outline": { "borderTopColor": "#34c471", "borderRightColor": "#34c471", "borderBottomColor": "#34c471", "borderLeftColor": "#34c471" }, ".l-button--dashed": { "borderTopColor": "#34c471", "borderRightColor": "#34c471", "borderBottomColor": "#34c471", "borderLeftColor": "#34c471" }, ".l-button--light": { "backgroundColor": "#f0fff4" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#34c471", "borderRightColor": "#34c471", "borderBottomColor": "#34c471", "borderLeftColor": "#34c471" } }, "l-button": { "": { "opacity": 1, "position": "relative", "alignItems": "center", "justifyContent": "center", "flexDirection": "row", "transitionDuration": "200ms", "transitionProperty": "backgroundColor,opacity,borderColor,width,height", "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx" }, ".l-button--disabled": { "opacity": 0.6 } }, "l-button__button": { "": { "position": "absolute", "left": 0, "right": 0, "top": 0, "bottom": 0, "borderTopWidth": "medium", "borderRightWidth": "medium", "borderBottomWidth": "medium", "borderLeftWidth": "medium", "borderTopStyle": "none", "borderRightStyle": "none", "borderBottomStyle": "none", "borderLeftStyle": "none", "borderTopColor": "#000000", "borderRightColor": "#000000", "borderBottomColor": "#000000", "borderLeftColor": "#000000", "backgroundColor": "rgba(0,0,0,0)" } }, "l-button--block": { "": { "width": "100%", "alignSelf": "auto" } }, "l-button__icon": { ".l-button--solid ": { "color": "#FFFFFF" }, "": { "alignSelf": "center" } }, "l-button--outline": { "": { "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopWidth": 0.71, "borderRightWidth": 0.71, "borderBottomWidth": 0.71, "borderLeftWidth": 0.71 } }, "l-button--dashed": { "": { "borderTopStyle": "dashed", "borderRightStyle": "dashed", "borderBottomStyle": "dashed", "borderLeftStyle": "dashed", "borderTopWidth": 0.71, "borderRightWidth": 0.71, "borderBottomWidth": 0.71, "borderLeftWidth": 0.71 } }, "l-button__loading": { "": { "alignSelf": "center" } }, "l-button--round": { "": { "borderTopLeftRadius": 999, "borderTopRightRadius": 999, "borderBottomRightRadius": 999, "borderBottomLeftRadius": 999 } }, "l-button--circle": { "": { "borderTopLeftRadius": 999, "borderTopRightRadius": 999, "borderBottomRightRadius": 999, "borderBottomLeftRadius": 999 } }, "gap": { ".l-button ": { "marginLeft": 4 } }, "@TRANSITION": { "l-button": { "duration": "200ms", "property": "backgroundColor,opacity,borderColor,width,height" } } };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_l_loading = resolveEasycom(vue.resolveDynamicComponent("l-loading"), __easycom_0$4);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["l-button", $setup.classes]),
      ref: "rootRef",
      "hover-class": $props.disabled || $props.loading || $props.color != null ? "" : (_a = $props.hoverClass) != null ? _a : "hover",
      style: vue.normalizeStyle([$setup.styles, $props.lStyle]),
      "hover-start-time": $props.hoverStartTime,
      "hover-stay-time": $props.hoverStayTime,
      "data-disabled": $props.disabled || $props.loading,
      onClick: vue.withModifiers($setup.handleTap, ["stop"])
    }, [
      $props.loading ? (vue.openBlock(), vue.createBlock(_component_l_loading, {
        key: 0,
        class: "l-button__loading",
        color: $setup.loadingColor
      }, null, 8, ["color"])) : vue.createCommentVNode("v-if", true),
      $props.icon ? (vue.openBlock(), vue.createBlock(_component_l_icon, {
        key: 1,
        class: "l-button__icon",
        size: $setup.innerIconSize,
        color: $setup.loadingColor,
        name: $props.icon
      }, null, 8, ["size", "color", "name"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "text",
        {
          class: vue.normalizeClass(["l-button__content", $setup.gapClass]),
          ref: "buttonTextRef",
          style: vue.normalizeStyle([$setup.contentStyle])
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(
              vue.toDisplayString($props.content),
              1
              /* TEXT */
            )
          ])
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.formType != null || $props.openType != null ? (vue.openBlock(), vue.createElementBlock("button", {
        key: 2,
        class: "l-button__button",
        "hover-class": "none",
        onAgreeprivacyauthorization: $setup.agreeprivacyauthorization,
        disabled: $props.disabled || $props.loading,
        "form-type": $props.disabled || $props.loading ? "" : $props.formType,
        "open-type": $props.disabled || $props.loading ? "" : $props.openType
      }, null, 40, ["disabled", "form-type", "open-type"])) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class", "hover-start-time", "hover-stay-time", "data-disabled"]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["styles", [_style_0$q]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-button/components/l-button/l-button.uvue"]]);
  function characterLimit(type, char, max) {
    const str = "".concat(char);
    if (str.length == 0) {
      return {
        length: 0,
        characters: ""
      };
    }
    if (type == "maxcharacter") {
      let len = 0;
      for (let i2 = 0; i2 < str.length; i2 += 1) {
        let currentStringLength;
        const code = str.charCodeAt(i2);
        if (code > 127 || code == 94) {
          currentStringLength = 2;
        } else {
          currentStringLength = 1;
        }
        if (len + currentStringLength > max) {
          return {
            length: len,
            characters: str.slice(0, i2)
          };
        }
        len += currentStringLength;
      }
      return {
        length: len,
        characters: str
      };
    } else if (type == "maxlength") {
      const length_1 = str.length > max ? max : str.length;
      return {
        length: length_1,
        characters: str.slice(0, length_1)
      };
    }
    return {
      length: str.length,
      characters: str
    };
  }
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "l-search",
    props: /* @__PURE__ */ vue.mergeModels(new UTSJSONObject({
      action: { type: String, required: false },
      adjustPosition: { type: Boolean, required: true, default: true },
      alwaysEmbed: { type: Boolean, required: true, default: false },
      center: { type: Boolean, required: true, default: false },
      clearable: { type: Boolean, required: true, default: true },
      confirmHold: { type: Boolean, required: true, default: false },
      confirmType: { type: String, required: true, default: "search" },
      cursor: { type: Number, required: false },
      cursorSpacing: { type: Number, required: true, default: 0 },
      disabled: { type: Boolean, required: true, default: false },
      focus: { type: Boolean, required: true, default: false },
      holdKeyboard: { type: Boolean, required: true, default: false },
      leftIcon: { type: String, required: true, default: "search" },
      maxcharacter: { type: Number, required: false },
      maxlength: { type: Number, required: true, default: -1 },
      placeholder: { type: String, required: true },
      placeholderClass: { type: String, required: false },
      placeholderStyle: { type: String, required: false },
      selectionEnd: { type: Number, required: true, default: -1 },
      selectionStart: { type: Number, required: true, default: -1 },
      shape: { type: String, required: true, default: "square" },
      type: { type: String, required: true, default: "text" },
      value: { type: String, required: false },
      lStyle: { type: String, required: false },
      cursorColor: { type: String, required: false },
      padding: { type: String, required: false },
      radius: { type: String, required: false },
      height: { type: String, required: false },
      bgColor: { type: String, required: false },
      fontSize: { type: String, required: false },
      textColor: { type: String, required: false },
      iconColor: { type: String, required: false },
      clearIconColor: { type: String, required: false }
    }), new UTSJSONObject({
      "modelValue": { type: String, default: "" },
      "modelModifiers": {}
    })),
    emits: /* @__PURE__ */ vue.mergeModels(["change", "blur", "clear", "focus", "submit", "action-click"], ["update:modelValue"]),
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emit = __emit;
      const props = __props;
      const focused = vue.ref(props.focus);
      const modelValue = vue.useModel(__props, "modelValue");
      const searchValue = vue.computed({
        set(value) {
          modelValue.value = value;
          emit("change", value);
        },
        get() {
          var _a2;
          return (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : modelValue.value;
        }
      });
      const contentClass = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("l-search__content--focused", focused.value);
        cls2.set("l-search__content--center", props.center);
        cls2.set("l-search__content--" + props.shape, true);
        return cls2;
      });
      const contextStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.padding != null) {
          style.set("padding", props.padding);
        }
        if (props.radius != null) {
          style.set("border-radius", props.radius);
        }
        if (props.height != null) {
          style.set("height", props.height);
        }
        if (props.bgColor != null) {
          style.set("background", props.bgColor);
        }
        return style;
      });
      const inputStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.fontSize != null) {
          style.set("font-size", props.fontSize);
        }
        if (props.textColor != null) {
          style.set("color", props.textColor);
        }
        return style;
      });
      const handleInput = (e2) => {
        let value = e2.detail.value;
        props.maxlength;
        const maxcharacter = props.maxcharacter;
        if (maxcharacter != null && maxcharacter > 0) {
          const characters = characterLimit("maxcharacter", value, maxcharacter).characters;
          value = characters;
        }
        searchValue.value = value;
      };
      const handleClear = (_e2) => {
        searchValue.value = "";
        focused.value = true;
        emit("clear");
      };
      const handleFocus = (e2) => {
        const value = e2.detail.value;
        focused.value = true;
        emit("focus", value);
      };
      const handleBlur = (e2) => {
        const value = e2.detail.value;
        focused.value = false;
        emit("blur", value);
      };
      const handleConfirm = (e2) => {
        const value = e2.detail.value;
        emit("submit", value);
      };
      const handleActionClick = (_e2) => {
        emit("action-click");
      };
      const __returned__ = { emit, props, focused, modelValue, searchValue, contentClass, contextStyle, inputStyle, handleInput, handleClear, handleFocus, handleBlur, handleConfirm, handleActionClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$p = { "l-search": { "": { "width": "100%", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "l-search__content": { "": { "flex": 1, "alignItems": "center", "flexDirection": "row", "boxSizing": "border-box", "height": "80rpx", "borderTopWidth": "2rpx", "borderRightWidth": "2rpx", "borderBottomWidth": "2rpx", "borderLeftWidth": "2rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(0,0,0,0.04)", "borderRightColor": "rgba(0,0,0,0.04)", "borderBottomColor": "rgba(0,0,0,0.04)", "borderLeftColor": "rgba(0,0,0,0.04)", "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.04)", "paddingTop": "16rpx", "paddingRight": "24rpx", "paddingBottom": "16rpx", "paddingLeft": "24rpx" } }, "l-search__content--focused": { "": { "borderTopColor": "rgba(0,0,0,0.04)", "borderRightColor": "rgba(0,0,0,0.04)", "borderBottomColor": "rgba(0,0,0,0.04)", "borderLeftColor": "rgba(0,0,0,0.04)" } }, "l-search__content--round": { "": { "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99 } }, "l-search__content--square": { "": { "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx" } }, "l-search__keyword": { "": { "flex": 1, "color": "rgba(0,0,0,0.88)", "fontSize": 16, "paddingLeft": "10rpx" } }, "l-search__placeholder": { "": { "color": "rgba(0,0,0,0.45)" } }, "l-search__placeholder--center": { "": { "textAlign": "center" } }, "l-search__icon": { "": { "color": "rgba(0,0,0,0.25)" } }, "l-search__clear": { "": { "position": "relative", "marginLeft": 10 } }, "l-search__clear-icon": { "": { "color": "rgba(0,0,0,0.25)" } }, "l-search__clear--right": { "": { "marginRight": 10 } }, "l-search__action": { "": { "marginLeft": "30rpx", "fontSize": 16, "color": "#3283ff" } } };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "l-search",
        style: vue.normalizeStyle([$props.lStyle])
      },
      [
        vue.renderSlot(_ctx.$slots, "left"),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["l-search__content", $setup.contentClass]),
            style: vue.normalizeStyle([$setup.contextStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "left-icon", {}, () => [
              $props.leftIcon.length > 0 ? (vue.openBlock(), vue.createBlock(_component_l_icon, {
                key: 0,
                class: "l-search__icon",
                size: "42rpx",
                color: $props.iconColor,
                name: $props.leftIcon
              }, null, 8, ["color", "name"])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("input", {
              name: "input",
              class: "l-search__keyword",
              style: vue.normalizeStyle([$setup.inputStyle, $props.center ? "text-align:center" : ""]),
              type: $props.type,
              maxlength: $props.maxlength,
              disabled: $props.disabled,
              focus: $props.focus,
              value: $setup.searchValue,
              "confirm-type": $props.confirmType,
              "confirm-hold": $props.confirmHold,
              cursor: $props.cursor,
              "cursor-color": $props.cursorColor,
              "adjust-position": $props.adjustPosition,
              "always-embed": $props.alwaysEmbed,
              "selection-start": $props.selectionStart,
              "selection-end": $props.selectionEnd,
              "hold-keyboard": $props.holdKeyboard,
              "cursor-spacing": $props.cursorSpacing,
              placeholder: $props.placeholder,
              "placeholder-style": ((_a = $props.placeholderStyle) != null ? _a : " ") + ($props.center ? "text-align:center" : ""),
              "placeholder-class": "l-search__placeholder",
              onInput: $setup.handleInput,
              onFocus: $setup.handleFocus,
              onBlur: $setup.handleBlur,
              onConfirm: $setup.handleConfirm
            }, null, 44, ["type", "maxlength", "disabled", "focus", "value", "confirm-type", "confirm-hold", "cursor", "cursor-color", "adjust-position", "always-embed", "selection-start", "selection-end", "hold-keyboard", "cursor-spacing", "placeholder", "placeholder-style"]),
            $props.clearable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["l-search__clear", {
                  "l-search__clear--right": _ctx.$slots["right-icon"] != null
                }]),
                onClick: $setup.handleClear,
                "aria-role": "button",
                "aria-label": "清除"
              },
              [
                vue.createVNode(_component_l_icon, {
                  class: "l-search__icon l-search__clear-icon",
                  name: "close-circle-filled",
                  size: "48rpx",
                  color: $props.clearIconColor
                }, null, 8, ["color"])
              ],
              2
              /* CLASS */
            )), [
              [vue.vShow, $setup.searchValue.length > 0]
            ]) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "right-icon")
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.renderSlot(_ctx.$slots, "action", {}, () => [
          $props.action != null ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: vue.normalizeClass(["l-search__action", { "l-search__action--focused": $setup.focused }]),
              onClick: $setup.handleActionClick
            },
            vue.toDisplayString($props.action),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["styles", [_style_0$p]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-search/components/l-search/l-search.uvue"]]);
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "l-tab-panel",
    props: {
      badge: new UTSJSONObject({ type: null, required: false }),
      offset: new UTSJSONObject({ type: Array, required: false }),
      dot: new UTSJSONObject({ type: Boolean, required: false }),
      destroyOnHide: new UTSJSONObject({ type: Boolean, required: false }),
      disabled: new UTSJSONObject({ type: Boolean, required: false }),
      label: new UTSJSONObject({ type: String, required: false }),
      lazy: new UTSJSONObject({ type: Boolean, required: false }),
      value: new UTSJSONObject({ type: Number, required: false })
    },
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const props = __props;
      const children = vue.inject("LimeTabs", null);
      const instance = vue.getCurrentInstance().proxy;
      vue.onMounted(() => {
        if (children == null)
          return null;
        children.value.push(instance);
      });
      vue.onUnmounted(() => {
        if (children == null)
          return null;
        children.value = children.value.filter((it2) => {
          return it2 != instance;
        });
      });
      const __returned__ = { props, children, instance };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$o = { "l-tab__panel": { "": { "width": "100%", "flex": 1, "flexShrink": 0, "boxSizing": "border-box" } } };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "l-tab__panel",
      "aria-role": "tabpanel"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["styles", [_style_0$o]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.uvue"]]);
  function toBoolean(value) {
    return value != null && value != void 0;
  }
  function getOffsetWithMinusString(val) {
    return val.startsWith("-") ? val.replace("-", "") : "-".concat(val);
  }
  const name$1 = "l-badge";
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "l-badge",
    props: {
      color: new UTSJSONObject({ type: String, required: false }),
      content: new UTSJSONObject({ type: [String, Number], required: false }),
      dot: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      max: new UTSJSONObject({ type: Number, required: true, default: 99 }),
      offset: new UTSJSONObject({ type: Array, required: true, default: [] }),
      position: new UTSJSONObject({ type: String, required: true, default: "top-right" }),
      shape: new UTSJSONObject({ type: String, required: false }),
      showZero: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      size: new UTSJSONObject({ type: String, required: false })
    },
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const props = __props;
      const context = vue.getCurrentInstance();
      const classes = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("".concat(name$1, "--fixed"), toBoolean(context.slots["default"]));
        cls2.set("".concat(name$1, "--dot"), props.dot);
        cls2.set("".concat(name$1, "--").concat(props.position), context.slots["default"] != null);
        return cls2;
      });
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (toBoolean(props.color)) {
          style.set("background", props.color);
        }
        const positions = props.position.split("-");
        const offset = props.offset;
        if (offset.length == 2) {
          const x = offset[0];
          const y2 = offset[1];
          if (context.slots["default"] != null) {
            if (positions.length == 2) {
              const offsetY = positions[0], offsetX = positions[1];
              if (isNumber$2(y2)) {
                const _y = y2;
                style.set(offsetY, addUnit(offsetY == "top" ? _y : -_y));
              } else {
                style.set(offsetY, offsetY == "top" ? addUnit(y2) : getOffsetWithMinusString("".concat(y2)));
              }
              if (isNumber$2(x)) {
                const _x = x;
                style.set(offsetX, addUnit(offsetX == "left" ? _x : -_x));
              } else {
                style.set(offsetY, offsetY == "left" ? addUnit(x) : getOffsetWithMinusString("".concat(x)));
              }
            }
          } else {
            style.set("margin-top", addUnit(y2));
            style.set("margin-left", addUnit(x));
          }
        }
        return style;
      });
      const hasContent = vue.computed(() => {
        if (toBoolean(context.slots["content"])) {
          return true;
        }
        const content = props.content;
        return content != "" && content != null && (props.showZero || content !== "0");
      });
      const renderContent = vue.computed(() => {
        const dot = props.dot;
        const max = props.max;
        const content = props.content;
        if (!dot && hasContent.value) {
          if (max != 0 && isNumeric$1(content) && parseFloat(content.toString()) > max) {
            return "".concat(max, "+");
          }
        }
        if (dot) {
          return "";
        }
        return "".concat(content !== null && content !== void 0 ? content : "");
      });
      const __returned__ = { name: name$1, props, context, classes, styles, hasContent, renderContent };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$n = { "l-badge": { "": { "boxSizing": "border-box", "paddingTop": 0, "paddingRight": "8rpx", "paddingBottom": 0, "paddingLeft": "8rpx", "color": "#FFFFFF", "fontWeight": "bold", "fontSize": 12, "fontFamily": "-apple-system-font, helvetica neue, arial, sans-serif", "lineHeight": 1.2, "textAlign": "center", "backgroundColor": "#FF4D4F", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#FFFFFF", "borderRightColor": "#FFFFFF", "borderBottomColor": "#FFFFFF", "borderLeftColor": "#FFFFFF", "borderTopLeftRadius": 999, "borderTopRightRadius": 999, "borderBottomRightRadius": 999, "borderBottomLeftRadius": 999, "overflow": "visible" } }, "l-badge--fixed": { "": { "position": "absolute", "transformOrigin": "100%" }, ".l-badge--offscreen": { "position": "fixed", "opacity": 0.13, "top": -1e10 } }, "l-badge--top-left": { "": { "top": 0, "left": 0, "transform": "translate(-50%, -50%)" } }, "l-badge--top-right": { "": { "top": 0, "right": 0, "transform": "translate(50%, -50%)" } }, "l-badge--bottom-left": { "": { "bottom": 0, "left": 0, "transform": "translate(-50%, 50%)" } }, "l-badge--bottom-right": { "": { "bottom": 0, "right": 0, "transform": "translate(50%, 50%)" } }, "l-badge--dot": { "": { "width": "16rpx", "minWidth": 0, "height": "16rpx", "backgroundImage": "none", "backgroundColor": "#FF4D4F", "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99, "borderTopWidth": 0, "borderRightWidth": 0, "borderBottomWidth": 0, "borderLeftWidth": 0, "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "overflow": "visible" } }, "l-badge__wrapper": { "": { "position": "relative", "overflow": "visible" } } };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.$slots["default"] != null ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "l-badge__wrapper"
    }, [
      vue.renderSlot(_ctx.$slots, "default"),
      $setup.hasContent || $props.dot ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass(["l-badge", $setup.classes]),
          ref: "textRef",
          style: vue.normalizeStyle([$setup.styles])
        },
        [
          vue.renderSlot(_ctx.$slots, "content", {}, () => [
            vue.createTextVNode(
              vue.toDisplayString($setup.renderContent),
              1
              /* TEXT */
            )
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $setup.hasContent || $props.dot ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 1,
          class: vue.normalizeClass(["l-badge l-badge--offscreen", $setup.classes]),
          ref: "offscreenRef",
          style: vue.normalizeStyle([$setup.styles])
        },
        [
          vue.renderSlot(_ctx.$slots, "content", {}, () => [
            vue.createTextVNode(
              vue.toDisplayString($setup.renderContent),
              1
              /* TEXT */
            )
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ])) : $setup.hasContent || $props.dot ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 1,
        class: vue.normalizeClass(["l-badge", $setup.classes]),
        style: vue.normalizeStyle([$setup.styles])
      },
      [
        vue.renderSlot(_ctx.$slots, "content", {}, () => [
          vue.createTextVNode(
            vue.toDisplayString($setup.renderContent),
            1
            /* TEXT */
          )
        ])
      ],
      6
      /* CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["styles", [_style_0$n]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-badge/components/l-badge/l-badge.uvue"]]);
  function calcScrollOffset(containerWidth, targetLeft, targetWidth, offset) {
    return offset + targetLeft - 1 / 2 * containerWidth + targetWidth / 2;
  }
  function ease(moveX, base) {
    const absDistance = Math.abs(moveX);
    const max = 50;
    if (absDistance > max) {
      return (max + (absDistance - max) * 0.2) * base;
    }
    return moveX;
  }
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }
  function getDirection(x, y2) {
    if (x > y2) {
      return "horizontal";
    }
    if (y2 > x) {
      return "vertical";
    }
    return "";
  }
  function useTouch() {
    const startX = vue.ref(0);
    const startY = vue.ref(0);
    const deltaX = vue.ref(0);
    const deltaY = vue.ref(0);
    const offsetX = vue.ref(0);
    const offsetY = vue.ref(0);
    const direction = vue.ref("");
    const isTap = vue.ref(true);
    const isVertical = () => {
      return direction.value === "vertical";
    };
    const isHorizontal = () => {
      return direction.value === "horizontal";
    };
    const reset = () => {
      deltaX.value = 0;
      deltaY.value = 0;
      offsetX.value = 0;
      offsetY.value = 0;
      direction.value = "";
      isTap.value = true;
    };
    const start = (event) => {
      reset();
      startX.value = event.touches[0].clientX;
      startY.value = event.touches[0].clientY;
    };
    const move = (event) => {
      const touch = event.touches[0];
      deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
      deltaY.value = touch.clientY - startY.value;
      offsetX.value = Math.abs(deltaX.value);
      offsetY.value = Math.abs(deltaY.value);
      const LOCK_DIRECTION_DISTANCE = 10;
      const TAP_OFFSET = 5;
      if (direction.value == "" || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
        direction.value = getDirection(offsetX.value, offsetY.value);
      }
      if (isTap.value && (offsetX.value > TAP_OFFSET || offsetY.value > TAP_OFFSET)) {
        isTap.value = false;
      }
    };
    return {
      start,
      move,
      startX,
      startY,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      direction,
      isVertical,
      isHorizontal,
      isTap
    };
  }
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "l-tabs",
    props: /* @__PURE__ */ vue.mergeModels(new UTSJSONObject({
      list: { type: Array, required: false },
      ellipsis: { type: Boolean, required: true, default: false },
      animated: { type: Boolean, required: true, default: false },
      duration: { type: Number, required: true, default: 0.3 },
      showLine: { type: Boolean, required: true, default: true },
      size: { type: String, required: true, default: "medium" },
      spaceEvenly: { type: Boolean, required: true, default: true },
      swipeable: { type: Boolean, required: true, default: false },
      value: { type: Number, required: false },
      color: { type: String, required: false },
      activeColor: { type: String, required: false },
      lineColor: { type: String, required: false },
      lineWidth: { type: String, required: false },
      lineHeight: { type: String, required: false },
      bgColor: { type: String, required: false },
      fontSize: { type: String, required: false },
      padding: { type: String, required: false },
      split: { type: Boolean, required: true, default: true },
      visible: { type: Boolean, required: true, default: false },
      swiperProgress: { type: Number, required: true, default: 0 },
      syncSwiper: { type: Boolean, required: true, default: false },
      lStyle: { type: null, required: false }
    }), new UTSJSONObject({
      "modelValue": { type: Number },
      "modelModifiers": {}
    })),
    emits: /* @__PURE__ */ vue.mergeModels(["change", "click"], ["update:modelValue"]),
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emits = __emit;
      const slots = vue.useSlots();
      const props = __props;
      const children = vue.ref([]);
      const scrollLeft = vue.ref(0);
      const lastLeft = vue.ref(0);
      const innerStyle = new UTSJSONObject({});
      const modelValue = vue.useModel(__props, "modelValue");
      const currentValue = vue.computed({
        set(value) {
          modelValue.value = value;
          emits("change", value);
        },
        get() {
          var _a2;
          return (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : modelValue.value;
        }
      });
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.bgColor != null) {
          style.set("background", props.bgColor);
        }
        return style;
      });
      const trackStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map([]);
        if (props.lineColor != null) {
          style.set("background", props.lineColor);
        }
        if (props.lineWidth != null) {
          style.set("width", props.lineWidth);
        }
        if (props.lineHeight != null) {
          style.set("height", props.lineHeight);
        }
        return style;
      });
      const itemStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (!["medium", "large"].includes(props.size)) {
          style.set("height", props.size);
        }
        if (props.padding != null) {
          style.set("padding", props.padding);
        }
        return style;
      });
      const textStyles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.fontSize != null) {
          style.set("font-size", props.fontSize);
        }
        return style;
      });
      const tabs = vue.computed(() => {
        if (props.list != null && props.list.length > 0) {
          return props.list.map((item = null) => {
            var _a2, _b;
            return {
              badge: item.get("badge"),
              dot: (_a2 = item.getBoolean("dot")) !== null && _a2 !== void 0 ? _a2 : false,
              disabled: (_b = item.getBoolean("disabled")) !== null && _b !== void 0 ? _b : false,
              label: item.getString("label"),
              offset: item.getArray("offset"),
              value: item.getNumber("value"),
              node: item
            };
          });
        }
        return children.value.map((item) => {
          var _a2, _b, _c, _d, _e2;
          const offset = (_a2 = item.offset) !== null && _a2 !== void 0 ? _a2 : [];
          return {
            badge: item.badge,
            dot: (_b = item.dot) !== null && _b !== void 0 ? _b : false,
            disabled: (_c = item.disabled) !== null && _c !== void 0 ? _c : false,
            label: item.label,
            offset,
            value: item.value,
            node: {
              badge: item.badge,
              dot: (_d = item.dot) !== null && _d !== void 0 ? _d : false,
              disabled: (_e2 = item.disabled) !== null && _e2 !== void 0 ? _e2 : false,
              label: item.label,
              offset,
              value: item.value
            }
          };
        });
      });
      const currentIndex = vue.computed(() => {
        const index = tabs.value.findIndex((child, index2) => {
          var _a2;
          return ((_a2 = child.value) !== null && _a2 !== void 0 ? _a2 : index2) == currentValue.value;
        });
        return index > -1 ? index : 0;
      });
      const scrollRef = vue.ref(null);
      const trackRef = vue.ref(null);
      const navRef = vue.ref(null);
      const innerRef = vue.ref(null);
      const tabRects = vue.ref([]);
      const containerWidth = vue.ref(0);
      const trackLineWidth = vue.ref(0);
      const isInteracting = vue.ref(false);
      let timer = 0;
      const measureTabs = () => {
        return new Promise((resolve) => {
          var _a2, _b, _c, _d;
          if (tabRects.value.length > 0 && tabRects.value[0].width > 0) {
            resolve();
          }
          if (scrollRef.value == null) {
            resolve();
            return null;
          }
          const elements = scrollRef.value.children;
          const tabsRects = [];
          elements.forEach((el) => {
            if (el.tagName == "VIEW") {
              tabsRects.push(el.getBoundingClientRect());
            }
          });
          tabRects.value = tabsRects;
          containerWidth.value = (_b = (_a2 = scrollRef.value) === null || _a2 === void 0 ? null : _a2.offsetWidth) !== null && _b !== void 0 ? _b : 0;
          trackLineWidth.value = (_d = (_c = trackRef.value) === null || _c === void 0 ? null : _c.offsetWidth) !== null && _d !== void 0 ? _d : 0;
          resolve();
        });
      };
      const moveToActiveTab = () => {
        measureTabs().then(() => {
          var _a2;
          const index = currentIndex.value;
          if (tabRects.value.length <= index)
            return null;
          const tabRect = tabRects.value[index];
          let count = 0;
          let distance = 0;
          let totalSize = 0;
          tabRects.value.forEach((item) => {
            if (count < index) {
              distance += item.width;
              count += 1;
            }
            totalSize += item.width;
          });
          if (totalSize == 0)
            return null;
          distance += (tabRect.width - trackLineWidth.value) / 2;
          (_a2 = trackRef.value) === null || _a2 === void 0 ? null : _a2.style.setProperty("transform", "translateX(".concat(distance, "px)"));
          const scrollOffset = calcScrollOffset(containerWidth.value, tabRect.left, tabRect.width, lastLeft.value);
          const maxOffset = totalSize - containerWidth.value;
          scrollLeft.value = clamp(scrollOffset, 0, maxOffset);
        });
      };
      const updateInnerStyle = (offset) => {
        vue.nextTick(() => {
          var _a2, _b;
          if (innerRef.value == null)
            return null;
          const width = (_b = (_a2 = innerRef.value.parentElement) === null || _a2 === void 0 ? null : _a2.offsetWidth) !== null && _b !== void 0 ? _b : 0;
          innerRef.value.style.setProperty("width", "".concat(tabs.value.length * width, "px"));
          innerRef.value.style.setProperty("opacity", "1");
          const left = -width * currentIndex.value + offset;
          if (offset != 0) {
            innerRef.value.style.setProperty("transition-duration", "0s");
            innerRef.value.style.setProperty("transform", "translateX(".concat(left, "px)"));
          } else {
            if (props.animated) {
              innerRef.value.style.setProperty("transition-duration", offset != 0 || !props.animated ? "0s" : "".concat(props.duration, "s"));
            }
            vue.nextTick(() => {
              innerRef.value.style.setProperty("transform", "translateX(".concat(left, "px)"));
            });
          }
        });
      };
      const onScroll = (e2) => {
        lastLeft.value = e2.detail.scrollLeft;
      };
      const updateDuration = (duration) => {
        var _a2;
        (_a2 = trackRef.value) === null || _a2 === void 0 ? null : _a2.style.setProperty("transition-duration", "".concat(duration, "s"));
      };
      const onClick = (index, item) => {
        isInteracting.value = true;
        const _a2 = item.value, value = _a2 == void 0 ? index : _a2, disabled = item.disabled;
        item.label;
        if (disabled || currentValue.value == value)
          return null;
        currentValue.value = value;
        emits("click", value);
        updateDuration(0.3);
        vue.nextTick(() => {
          moveToActiveTab();
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
          isInteracting.value = false;
        }, 500);
      };
      const getAvailableTabIndex = (deltaX) => {
        const step = deltaX > 0 ? -1 : 1;
        const len = tabs.value.length;
        for (let i2 = step; currentIndex.value + step >= 0 && currentIndex.value + step < len; i2 += step) {
          const newIndex = currentIndex.value + i2;
          if (newIndex >= 0 && newIndex < len && tabs.value.length > newIndex && !tabs.value[newIndex].disabled) {
            return newIndex;
          }
        }
        return -1;
      };
      const touch = useTouch();
      const onTouchStart = (event) => {
        isInteracting.value = true;
        if (!props.swipeable)
          return null;
        touch.start(event);
        updateDuration(0.3);
      };
      const onTouchMove = (event) => {
        if (!props.swipeable)
          return null;
        touch.move(event);
        const direction = touch.direction, deltaX = touch.deltaX;
        touch.startX;
        if (direction.value != "horizontal")
          return null;
        if (!props.animated)
          return null;
        const isAtFirstTab = currentIndex.value == 0;
        const isAtLastTab = currentIndex.value == tabs.value.length - 1;
        if (isAtFirstTab && deltaX.value > 0 || isAtLastTab && deltaX.value < 0) {
          const base = isAtFirstTab ? 1 : -1;
          const adjustedDelta = ease(deltaX.value, base);
          updateInnerStyle(adjustedDelta);
        } else {
          updateInnerStyle(deltaX.value);
        }
      };
      const onTouchEnd = () => {
        isInteracting.value = false;
        if (!props.swipeable)
          return null;
        const direction = touch.direction, deltaX = touch.deltaX, offsetX = touch.offsetX;
        const minSwipeDistance = 50;
        if (direction.value == "horizontal" && offsetX.value >= minSwipeDistance) {
          const index = getAvailableTabIndex(deltaX.value);
          if (index != -1) {
            onClick(index, tabs.value[index]);
          }
        }
        updateInnerStyle(0);
      };
      const stopWatch = vue.watch(tabs, (_v) => {
        setTimeout(() => {
          moveToActiveTab();
        }, 50);
      });
      const stopValueWatch = vue.watch(currentValue, (_v) => {
        if (tabs.value.length == 0)
          return null;
        moveToActiveTab();
        updateInnerStyle(0);
      });
      const stopVisibleWatch = vue.watch(() => {
        return props.visible;
      }, (v2) => {
        if (!v2)
          return null;
        setTimeout(() => {
          moveToActiveTab();
          updateInnerStyle(0);
        }, 100);
      });
      const updateTrackPosition = (progress) => {
        if (!props.syncSwiper || !props.showLine || progress == 0 || isInteracting.value)
          return null;
        updateDuration(0);
        const currentIdx = currentIndex.value;
        const next = () => {
          const direction = progress > 0 ? 1 : -1;
          const nextIdx = currentIdx + direction;
          if (nextIdx < 0 || nextIdx >= tabRects.value.length)
            return null;
          const currentTab = tabRects.value[currentIdx];
          const nextTab = tabRects.value[nextIdx];
          const ratio = Math.abs(progress);
          const currentPos = currentTab.left + (currentTab.width - trackLineWidth.value) / 2;
          const nextPos = nextTab.left + (nextTab.width - trackLineWidth.value) / 2;
          const newPosition = direction > 0 ? currentPos + (nextPos - currentPos) * ratio : currentPos - (currentPos - nextPos) * ratio;
          vue.nextTick(() => {
            var _a2;
            (_a2 = trackRef.value) === null || _a2 === void 0 ? null : _a2.style.setProperty("transform", "translateX(".concat(newPosition, "px)"));
          });
        };
        measureTabs().then(next);
      };
      vue.watch(() => {
        return props.swiperProgress;
      }, (progress) => {
        updateTrackPosition(progress);
      });
      vue.onMounted(() => {
        vue.nextTick(() => {
          setTimeout(() => {
            if (tabs.value.length == 0)
              return null;
            moveToActiveTab();
            updateInnerStyle(0);
          }, 100);
        });
      });
      vue.onUnmounted(() => {
        stopWatch();
        stopValueWatch();
        stopVisibleWatch();
      });
      vue.provide("LimeTabs", children);
      const __returned__ = { emits, slots, props, children, scrollLeft, lastLeft, innerStyle, modelValue, currentValue, styles, trackStyle, itemStyle, textStyles, tabs, currentIndex, scrollRef, trackRef, navRef, innerRef, tabRects, containerWidth, trackLineWidth, isInteracting, get timer() {
        return timer;
      }, set timer(v2) {
        timer = v2;
      }, measureTabs, moveToActiveTab, updateInnerStyle, onScroll, updateDuration, onClick, getAvailableTabIndex, touch, onTouchStart, onTouchMove, onTouchEnd, stopWatch, stopValueWatch, stopVisibleWatch, updateTrackPosition };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$m = { "l-tabs": { "": { "position": "relative", "backgroundImage": "none", "backgroundColor": "#FFFFFF" } }, "l-tabs__wrap": { "": { "flex": 1, "backgroundImage": "none", "backgroundColor": "#FFFFFF", "flexDirection": "row" } }, "l-tabs__scroll": { "": { "position": "relative", "flex": 1, "flexDirection": "row" } }, "l-tabs__scroll--split": { "": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#eeeeee" } }, "l-tabs__nav": { "": { "flexDirection": "row", "position": "relative", "flexWrap": "nowrap", "alignItems": "center" } }, "l-tabs__track": { "": { "position": "absolute", "zIndex": 1, "transitionDuration": "0.3s", "backgroundColor": "#3283ff", "left": 0, "bottom": "1rpx", "width": "32rpx", "height": "6rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx" } }, "l-tabs__content": { "": { "width": "100%", "overflow": "hidden" } }, "l-tabs__content-inner": { "": { "display": "flex", "flexDirection": "row", "flex": 1, "overflow": "visible", "opacity": 0 }, ".l-tabs__content--animated ": { "position": "relative", "width": "100%", "height": "100%", "transitionProperty": "transform" } }, "l-tabs__item": { "": { "position": "relative", "flex": "none", "alignItems": "center", "justifyContent": "center", "paddingTop": 0, "paddingRight": "32rpx", "paddingBottom": 0, "paddingLeft": "32rpx", "boxSizing": "border-box", "overflow": "hidden", "height": "96rpx" } }, "l-tabs__item-text": { "": { "fontWeight": "400", "fontSize": 14, "whiteSpace": "nowrap", "transitionProperty": "color", "transitionDuration": "300ms", "color": "rgba(0,0,0,0.88)" } }, "l-tabs__item-text--large": { "": { "fontSize": 16 } }, "l-tabs__item-text--active": { "": { "fontWeight": "700", "color": "#3283ff" } }, "l-tabs__item-text--disabled": { "": { "color": "rgba(0,0,0,0.25)" } }, "l-tabs__item--evenly": { "": { "flex": 1 } }, "@TRANSITION": { "l-tabs__track": { "duration": "0.3s" }, "l-tabs__content-inner": { "property": "transform" }, "l-tabs__item-text": { "property": "color", "duration": "300ms" } } };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_badge = resolveEasycom(vue.resolveDynamicComponent("l-badge"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "l-tabs" }, [
      vue.createElementVNode(
        "view",
        {
          class: "l-tabs__wrap",
          style: vue.normalizeStyle([$setup.styles, $props.lStyle])
        },
        [
          vue.renderSlot(_ctx.$slots, "left"),
          vue.createElementVNode("scroll-view", {
            class: vue.normalizeClass(["l-tabs__scroll", { "l-tabs__scroll--split": $props.split }]),
            ref: "scrollRef",
            "scroll-left": $setup.scrollLeft,
            direction: "horizontal",
            "scroll-x": true,
            "scroll-with-animation": true,
            "show-scrollbar": false,
            enhanced: true,
            onScroll: $setup.onScroll
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.tabs, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["l-tabs__item", {
                    "l-tabs__item--active": index == $setup.currentIndex,
                    "l-tabs__item--evenly": $props.spaceEvenly,
                    "l-tabs__item--disabled": item.disabled
                  }]),
                  key: index,
                  style: vue.normalizeStyle([$setup.itemStyle]),
                  onClick: ($event) => $setup.onClick(index, item)
                }, [
                  vue.renderSlot(_ctx.$slots, "label", {
                    item,
                    active: index == $setup.currentIndex,
                    disabled: item.disabled
                  }, () => [
                    item.dot == true || item.badge != null ? (vue.openBlock(), vue.createBlock(_component_l_badge, {
                      key: 0,
                      dot: item.dot,
                      offset: item.offset,
                      content: item.badge
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          {
                            style: vue.normalizeStyle([
                              $setup.textStyles,
                              !item.disabled && $props.color != null && index != $setup.currentIndex ? "color:" + $props.color : "",
                              !item.disabled && $props.activeColor != null && index == $setup.currentIndex ? "color:" + $props.activeColor : ""
                            ]),
                            class: vue.normalizeClass(["l-tabs__item-text", [
                              "l-tabs__item-text--" + $props.size,
                              {
                                "l-tabs__item-text--disabled": item.disabled,
                                "l-tabs__item-text--active": index == $setup.currentIndex
                              }
                            ]])
                          },
                          vue.toDisplayString(item.label),
                          7
                          /* TEXT, CLASS, STYLE */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["dot", "offset", "content"])) : (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 1,
                        style: vue.normalizeStyle([
                          $setup.textStyles,
                          !item.disabled && $props.color != null && index != $setup.currentIndex ? "color:" + $props.color : "",
                          !item.disabled && $props.activeColor != null && index == $setup.currentIndex ? "color:" + $props.activeColor : ""
                        ]),
                        class: vue.normalizeClass(["l-tabs__item-text", [
                          "l-tabs__item-text--" + $props.size,
                          {
                            "l-tabs__item-text--disabled": item.disabled,
                            "l-tabs__item-text--active": index == $setup.currentIndex
                          }
                        ]])
                      },
                      vue.toDisplayString(item.label),
                      7
                      /* TEXT, CLASS, STYLE */
                    ))
                  ])
                ], 14, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createElementVNode(
              "view",
              {
                ref: "trackRef",
                style: vue.normalizeStyle([$setup.trackStyle]),
                class: "l-tabs__track"
              },
              null,
              4
              /* STYLE */
            )
          ], 42, ["scroll-left"]),
          vue.renderSlot(_ctx.$slots, "right")
        ],
        4
        /* STYLE */
      ),
      _ctx.$slots["default"] != null ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["l-tabs__content", { "l-tabs__content--animated": $props.animated }]),
          onTouchstart: $setup.onTouchStart,
          onTouchmove: $setup.onTouchMove,
          onTouchend: $setup.onTouchEnd,
          onTouchcancel: $setup.onTouchEnd
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "l-tabs__content-inner",
              style: vue.normalizeStyle([$setup.innerStyle]),
              ref: "innerRef"
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            4
            /* STYLE */
          )
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["styles", [_style_0$m]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-tabs/components/l-tabs/l-tabs.uvue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "helpCenter",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const value = vue.ref("");
      const tabIndex = vue.ref(0);
      const search = () => {
        uni.showToast({
          title: value.value
        });
      };
      const questionDetail = () => {
        uni.navigateTo({
          url: "/pages/mine/helpCenter/questionDetail/questionDetail"
        });
      };
      const __returned__ = { value, tabIndex, search, questionDetail };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$l = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "search-bar": { ".container ": { "marginTop": "30rpx", "marginRight": 0, "marginBottom": "30rpx", "marginLeft": 0 } }, "l-tabs": { ".container ": { "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "question-item": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } } };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_button = resolveEasycom(vue.resolveDynamicComponent("l-button"), __easycom_0$3);
    const _component_l_search = resolveEasycom(vue.resolveDynamicComponent("l-search"), __easycom_1$3);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_0$8);
    const _component_l_tab_panel = resolveEasycom(vue.resolveDynamicComponent("l-tab-panel"), __easycom_1$2);
    const _component_l_tabs = resolveEasycom(vue.resolveDynamicComponent("l-tabs"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "search-bar" }, [
        vue.createVNode(_component_l_search, {
          class: "search",
          padding: "10rpx 5rpx 10rpx 24rpx",
          modelValue: $setup.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event),
          shape: "round",
          placeholder: "请输入关键字"
        }, {
          "right-icon": vue.withCtx(() => [
            vue.createVNode(_component_l_button, {
              type: "primary",
              size: "small",
              shape: "round",
              onClick: $setup.search
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("搜索")
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ]),
      vue.createElementVNode("view", { class: "question-box" }, [
        vue.createVNode(_component_l_tabs, {
          modelValue: $setup.tabIndex,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.tabIndex = $event),
          "space-evenly": false,
          animated: true
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_l_tab_panel, {
              value: 0,
              label: "添加设备",
              onClick: $setup.questionDetail
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "question-item" }, [
                  vue.createElementVNode("text", null, "如何添加设备？"),
                  vue.createVNode(_component_l_icon, {
                    name: "chevron-right",
                    size: "28"
                  })
                ])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_l_tab_panel, {
              value: 1,
              label: "网络问题"
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "question-item" }, [
                  vue.createElementVNode("text", null, "网络连不上？"),
                  vue.createVNode(_component_l_icon, {
                    name: "chevron-right",
                    size: "28"
                  })
                ])
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_l_tab_panel, {
              value: 2,
              label: "报警问题"
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "question-item" }, [
                  vue.createElementVNode("text", null, "报警文件在哪查看？"),
                  vue.createVNode(_component_l_icon, {
                    name: "chevron-right",
                    size: "28"
                  })
                ])
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue"])
      ])
    ]);
  }
  const PagesMineHelpCenterHelpCenter = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["styles", [_style_0$l]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/helpCenter/helpCenter.uvue"]]);
  const _style_0$k = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "40rpx", "paddingBottom": "20rpx", "paddingLeft": "40rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "title": { ".container .content ": { "fontSize": "36rpx", "fontWeight": "bold", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "desc": { ".container .content ": { "fontSize": "28rpx", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } } };
  const _sfc_main$l = {};
  function _sfc_render$k(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "title" }, " 如何添加设备？ "),
        vue.createElementVNode("view", { class: "desc" }, " 1.打开 VeepAI 小程序，点击首页的“添加设备”按钮。 2.输入设备名称，选择设备类型，点击“下一步”。 3.输入设备的 IP 地址，点击“下一步”。 4.输入设备的用户名和密码，点击“下一步”。 5.点击“添加设备”按钮，完成添加。 ")
      ])
    ]);
  }
  const PagesMineHelpCenterQuestionDetailQuestionDetail = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["styles", [_style_0$k]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/helpCenter/questionDetail/questionDetail.uvue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "messageDetail",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const title = vue.ref("消息详情");
      onLoad((options) => {
        uni.__log__("log", "at pages/message/messageDetail/messageDetail.uvue:17", options.id);
      });
      const __returned__ = { title };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$j = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "title": { ".container .content ": { "fontSize": "36rpx", "fontWeight": "bold", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "desc": { ".container .content ": { "marginTop": "40rpx", "marginRight": 0, "marginBottom": "40rpx", "marginLeft": 0 } } };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "title" }, "标题"),
        vue.createElementVNode("view", { class: "desc" }, [
          vue.createElementVNode("text", null, "描述")
        ])
      ])
    ]);
  }
  const PagesMessageMessageDetailMessageDetail = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["styles", [_style_0$j]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/messageDetail/messageDetail.uvue"]]);
  /*!
  * type：组件内props属性参数、事件回调参数、方法参数类型
  * fui-types - v1.0.0 (2023/11/11, 11:07:14 AM)
  *
  * 注意：当页面使用时，Object、Array等类型使用any接收，暂时需要转化为UTSJSONObject使用，不可直接使用“.”访问属性
  * @example：const param  = JSON.parse(JSON.stringify(e)) as UTSJSONObject
  * 在 uts 中，只适合转 type，不适合使用 interface。[interface 中使用? 编译报错，需要使用 type]
  *
  * 官网地址：https://firstui.cn/
  * 文档地址：https://unix.firstui.cn/
  */
  class FuiTextClickParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            param: { type: String, optional: false }
          };
        },
        name: "FuiTextClickParam"
      };
    }
    constructor(options, metadata = FuiTextClickParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.param = this.__props__.param;
      delete this.__props__;
    }
  }
  class FuiNumberClickParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            param: { type: String, optional: false }
          };
        },
        name: "FuiNumberClickParam"
      };
    }
    constructor(options, metadata = FuiNumberClickParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.param = this.__props__.param;
      delete this.__props__;
    }
  }
  class FuiFooterNavigateParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            url: { type: String, optional: true },
            openType: { type: String, optional: true },
            delta: { type: Number, optional: true },
            color: { type: String, optional: true },
            size: { type: Number, optional: true }
          };
        },
        name: "FuiFooterNavigateParam"
      };
    }
    constructor(options, metadata = FuiFooterNavigateParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.url = this.__props__.url;
      this.openType = this.__props__.openType;
      this.delta = this.__props__.delta;
      this.color = this.__props__.color;
      this.size = this.__props__.size;
      delete this.__props__;
    }
  }
  class FuiInputNumberChangeParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            value: { type: Number, optional: false },
            index: { type: Number, optional: false },
            param: { type: String, optional: false }
          };
        },
        name: "FuiInputNumberChangeParam"
      };
    }
    constructor(options, metadata = FuiInputNumberChangeParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.value = this.__props__.value;
      this.index = this.__props__.index;
      this.param = this.__props__.param;
      delete this.__props__;
    }
  }
  class FuiCheckboxChangeParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            checked: { type: Boolean, optional: false },
            value: { type: String, optional: false }
          };
        },
        name: "FuiCheckboxChangeParam"
      };
    }
    constructor(options, metadata = FuiCheckboxChangeParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.checked = this.__props__.checked;
      this.value = this.__props__.value;
      delete this.__props__;
    }
  }
  class FuiActionSheetItemParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            color: { type: String, optional: true },
            darkColor: { type: String, optional: true },
            param: { type: String, optional: true },
            index: { type: Number, optional: true }
          };
        },
        name: "FuiActionSheetItemParam"
      };
    }
    constructor(options, metadata = FuiActionSheetItemParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.color = this.__props__.color;
      this.darkColor = this.__props__.darkColor;
      this.param = this.__props__.param;
      this.index = this.__props__.index;
      delete this.__props__;
    }
  }
  class FuiToastShowParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            duration: { type: Number, optional: true },
            src: { type: String, optional: true },
            text: { type: String, optional: true }
          };
        },
        name: "FuiToastShowParam"
      };
    }
    constructor(options, metadata = FuiToastShowParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.duration = this.__props__.duration;
      this.src = this.__props__.src;
      this.text = this.__props__.text;
      delete this.__props__;
    }
  }
  class FuiDialogButtonsParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            color: { type: String, optional: true },
            primary: { type: Boolean, optional: true },
            param: { type: String, optional: true },
            index: { type: Number, optional: true }
          };
        },
        name: "FuiDialogButtonsParam"
      };
    }
    constructor(options, metadata = FuiDialogButtonsParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.color = this.__props__.color;
      this.primary = this.__props__.primary;
      this.param = this.__props__.param;
      this.index = this.__props__.index;
      delete this.__props__;
    }
  }
  class FuiDropdownMenuOptionParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            value: { type: String, optional: true },
            src: { type: String, optional: true },
            checked: { type: Boolean, optional: true },
            disabled: { type: Boolean, optional: true },
            param: { type: String, optional: true },
            index: { type: Number, optional: true }
          };
        },
        name: "FuiDropdownMenuOptionParam"
      };
    }
    constructor(options, metadata = FuiDropdownMenuOptionParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.value = this.__props__.value;
      this.src = this.__props__.src;
      this.checked = this.__props__.checked;
      this.disabled = this.__props__.disabled;
      this.param = this.__props__.param;
      this.index = this.__props__.index;
      delete this.__props__;
    }
  }
  class FuiSwipeActionButtonParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            text: { type: String, optional: false },
            background: { type: String, optional: true },
            size: { type: Number, optional: true },
            color: { type: String, optional: true },
            param: { type: Number, optional: true },
            index: { type: Number, optional: true }
          };
        },
        name: "FuiSwipeActionButtonParam"
      };
    }
    constructor(options, metadata = FuiSwipeActionButtonParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.text = this.__props__.text;
      this.background = this.__props__.background;
      this.size = this.__props__.size;
      this.color = this.__props__.color;
      this.param = this.__props__.param;
      this.index = this.__props__.index;
      delete this.__props__;
    }
  }
  class FuiPaginationChangeParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            type: { type: String, optional: false },
            current: { type: Number, optional: false }
          };
        },
        name: "FuiPaginationChangeParam"
      };
    }
    constructor(options, metadata = FuiPaginationChangeParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.type = this.__props__.type;
      this.current = this.__props__.current;
      delete this.__props__;
    }
  }
  class FuiSegmentedControlValueParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            disabled: { type: Boolean, optional: true },
            value: { type: Number, optional: true },
            param: { type: String, optional: true },
            index: { type: Number, optional: true }
          };
        },
        name: "FuiSegmentedControlValueParam"
      };
    }
    constructor(options, metadata = FuiSegmentedControlValueParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.disabled = this.__props__.disabled;
      this.value = this.__props__.value;
      this.param = this.__props__.param;
      this.index = this.__props__.index;
      delete this.__props__;
    }
  }
  class FuiTabsItemParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            icon: { type: String, optional: true },
            selectedIcon: { type: String, optional: true },
            badge: { type: Number, optional: true },
            isDot: { type: Boolean, optional: true },
            disabled: { type: Boolean, optional: true },
            index: { type: Number, optional: true }
          };
        },
        name: "FuiTabsItemParam"
      };
    }
    constructor(options, metadata = FuiTabsItemParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.icon = this.__props__.icon;
      this.selectedIcon = this.__props__.selectedIcon;
      this.badge = this.__props__.badge;
      this.isDot = this.__props__.isDot;
      this.disabled = this.__props__.disabled;
      this.index = this.__props__.index;
      delete this.__props__;
    }
  }
  class FuiCollapseChangeParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            index: { type: Number, optional: false },
            isOpen: { type: Boolean, optional: false }
          };
        },
        name: "FuiCollapseChangeParam"
      };
    }
    constructor(options, metadata = FuiCollapseChangeParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.index = this.__props__.index;
      this.isOpen = this.__props__.isOpen;
      delete this.__props__;
    }
  }
  class FuiFormRulesValidatorParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            msg: { type: String, optional: false },
            method: { type: "Unknown", optional: false }
          };
        },
        name: "FuiFormRulesValidatorParam"
      };
    }
    constructor(options, metadata = FuiFormRulesValidatorParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.msg = this.__props__.msg;
      this.method = this.__props__.method;
      delete this.__props__;
    }
  }
  class FuiFormRulesParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            rule: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
            msg: { type: UTS.UTSType.withGenerics(Array, [String]), optional: true },
            validator: { type: UTS.UTSType.withGenerics(Array, [FuiFormRulesValidatorParam]), optional: true }
          };
        },
        name: "FuiFormRulesParam"
      };
    }
    constructor(options, metadata = FuiFormRulesParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.rule = this.__props__.rule;
      this.msg = this.__props__.msg;
      this.validator = this.__props__.validator;
      delete this.__props__;
    }
  }
  class FuiFormErrorMsgParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            msg: { type: String, optional: false }
          };
        },
        name: "FuiFormErrorMsgParam"
      };
    }
    constructor(options, metadata = FuiFormErrorMsgParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.msg = this.__props__.msg;
      delete this.__props__;
    }
  }
  class FuiFormValidatorResParam extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            isPassed: { type: Boolean, optional: false },
            errorMsg: { type: UTS.UTSType.withGenerics(Array, [FuiFormErrorMsgParam]), optional: false }
          };
        },
        name: "FuiFormValidatorResParam"
      };
    }
    constructor(options, metadata = FuiFormValidatorResParam.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.isPassed = this.__props__.isPassed;
      this.errorMsg = this.__props__.errorMsg;
      delete this.__props__;
    }
  }
  const _sfc_main$j = vue.defineComponent({
    name: "fui-checkbox",
    emits: ["change"],
    props: {
      value: {
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
      color: {
        type: String,
        default: ""
      },
      normalColor: {
        type: String,
        default: ""
      },
      borderColor: {
        type: String,
        default: ""
      },
      borderRadius: {
        type: String,
        default: "100px"
      },
      isCheckMark: {
        type: Boolean,
        default: false
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
    created() {
      this.val = this.checked;
      this.getParent("fui-checkbox-group");
      if (this.fuiCkGroup != null) {
        const group = this.fuiCkGroup;
        group.$data["childrens"].push(this);
        const modelValue = group.$props["modelValue"];
        if (modelValue.length > 0) {
          this.val = modelValue.includes(this.value);
        }
      }
      const parent = this.getParent("fui-label");
      if (parent) {
        const label = this.fuiLabel;
        label.$data["childrens"].push(this);
      }
    },
    computed: {
      getStyl() {
        const mp = /* @__PURE__ */ new Map();
        mp.set("transform", "scale(".concat(this.scaleRatio, ")"));
        mp.set("border-radius", this.borderRadius);
        let color = this.val ? this.color : this.borderColor == "" ? this.color : this.borderColor;
        const bgColor = this.val ? this.color : this.normalColor;
        if (this.isCheckMark) {
          mp.set("border-color", "transparent");
          mp.set("background", "transparent");
        } else {
          if (color != "")
            mp.set("border-color", color);
          if (bgColor != "")
            mp.set("background", bgColor);
        }
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
      checked(newVal = null) {
        this.val = newVal;
      },
      val() {
        if (this.fuiCkGroup != null) {
          const group = this.fuiCkGroup;
          group.$callMethod("changeValue");
        }
        setTimeout(() => {
          this.styleVal = this.val;
        }, 0);
      }
    },
    data() {
      return {
        val: false,
        styleVal: false,
        fuiLabel: null,
        fuiCkGroup: null
      };
    },
    methods: {
      checkboxClick(e2) {
        e2.stopPropagation();
        this.checkboxChange();
      },
      checkboxChange() {
        if (this.disabled)
          return null;
        this.val = !this.val;
        this.$emit("change", new FuiCheckboxChangeParam({
          checked: this.val,
          value: this.value
        }));
      },
      //测试支持，如果不支持则使用 provide/inject方式（可能有警告，设置default:null也无法去除，应该是底层有bug）
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        if (name2 == "fui-checkbox-group") {
          this.fuiCkGroup = parent;
        } else {
          this.fuiLabel = parent;
        }
        return true;
      },
      labelClick() {
        this.checkboxChange();
      }
    }
  });
  const _style_0$i = { "fui-checkbox__input": { "": { "width": "40rpx", "height": "40rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "boxSizing": "border-box", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "flexShrink": 0, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "overflow": "hidden", "position": "relative" } }, "fui-checkbox__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-checkbox__scale-center": { "": { "transformOrigin": "center center" } }, "fui-checkbox__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-checkbox__color": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-checkbox__normal-border": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-checkbox__background": { "": { "!backgroundImage": "none", "!backgroundColor": "#ffffff" } }, "fui-checkbox__mark-color": { "": { "!borderBottomColor": "#ffffff", "!borderRightColor": "#ffffff" } }, "fui-check__mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "boxSizing": "border-box", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%" } }, "fui-checkbox__disabled": { "": { "opacity": 0.6 } } };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["fui-checkbox__input", [$props.scaleRatio != 1 ? "fui-checkbox__scale-".concat($props.scaleAlign) : "", $props.disabled ? "fui-checkbox__disabled" : "", $props.color == "" && $data.styleVal && !$props.isCheckMark ? "fui-checkbox__color" : "", $props.normalColor == "" && !$data.styleVal && !$props.isCheckMark ? "fui-checkbox__background" : "", $props.borderColor == "" && !$data.styleVal && !$props.isCheckMark ? "fui-checkbox__normal-border" : ""]]),
        style: vue.normalizeStyle($options.getStyl),
        onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.checkboxClick && $options.checkboxClick(...args), ["stop"]))
      },
      [
        $data.val ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["fui-check__mark", { "fui-checkbox__mark-color": $props.checkMarkColor == "" }]),
            style: vue.normalizeStyle($options.getMarkStyl)
          },
          null,
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["styles", [_style_0$i]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-checkbox/fui-checkbox.uvue"]]);
  const _sfc_main$i = vue.defineComponent({
    name: "fui-checkbox-group",
    emits: ["change", "update:modelValue"],
    props: {
      name: {
        type: String,
        default: ""
      },
      modelValue: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        vals: [],
        childrens: [],
        fuiForm: null
      };
    },
    watch: {
      modelValue(vals) {
        this.modelChange(vals);
      }
    },
    created() {
      const isForm = this.getParent("fui-form");
      if (isForm) {
        const form = this.fuiForm;
        form.$data["formChildren"].push(this);
      }
    },
    methods: {
      checkboxChange(e2) {
        this.$emit("change", e2);
        this.$emit("update:modelValue", e2);
      },
      changeValue() {
        const vals = [];
        this.childrens.forEach((item) => {
          const isChk = item.$data["val"];
          if (isChk) {
            vals.push(item.$props["value"]);
          }
        });
        this.vals = vals;
        this.checkboxChange(vals);
      },
      modelChange(vals) {
        this.vals = vals;
        this.childrens.forEach((item) => {
          const value = item.$props["value"];
          if (vals.includes(value)) {
            item.$data["val"] = true;
          } else {
            item.$data["val"] = false;
          }
        });
      },
      getParent(name2) {
        if (this.$parent == null)
          return false;
        let parent = this.$parent;
        let parentName = parent.$options["name"];
        while (parentName != name2) {
          if (parent.$parent == null)
            return false;
          parent = parent.$parent;
          if (parent.$options["name"] == "")
            return false;
          parentName = parent.$options["name"];
        }
        this.fuiForm = parent;
        return true;
      },
      //暂时做重置处理（还原需记录初始值）
      reset() {
        this.childrens.forEach((item) => {
          item.$data["val"] = false;
        });
        this.vals = [];
        this.checkboxChange(this.vals);
      },
      getSubmitValue() {
        return this.vals;
      }
    }
  });
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_checkbox_group = vue.resolveComponent("checkbox-group");
    return vue.openBlock(), vue.createBlock(_component_checkbox_group, { name: $props.name }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-checkbox-group/fui-checkbox-group.uvue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "TopNavBar",
    props: {
      title: new UTSJSONObject({
        type: String,
        default: "首页"
      }),
      showBack: new UTSJSONObject({
        type: Boolean,
        default: false
      }),
      messageCount: new UTSJSONObject({
        type: Number,
        default: 0
      }),
      rightText: new UTSJSONObject({
        type: String,
        default: ""
      })
    },
    emits: ["back", "message", "add", "changeNav"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const props = __props;
      const emits = __emit;
      const goBack = () => {
        return emits("back");
      };
      const onMessage = () => {
        return emits("message");
      };
      const onAdd = () => {
        return emits("add");
      };
      const __returned__ = { props, emits, goBack, onMessage, onAdd };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _imports_0$3 = "/static/tabbar/back.png";
  const _style_0$h = { "custom-nav": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "30rpx", "paddingRight": "25rpx", "paddingBottom": "30rpx", "paddingLeft": "25rpx", "backgroundColor": "#ffffff", "marginTop": "50rpx", "width": "100%" } }, "nav-back": { "": { "width": "32rpx", "height": "32rpx", "display": "flex", "alignItems": "center", "justifyContent": "center" } }, "nav-item": { "": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-around" } }, "nav-title": { "": { "color": "#333333", "marginTop": 0, "marginRight": "20rpx", "marginBottom": 0, "marginLeft": "20rpx", "maxWidth": "400rpx", "textAlign": "center", "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap" } }, "nav-actions": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "nav-icon": { "": { "width": "60rpx", "height": "60rpx", "display": "flex", "alignItems": "center", "justifyContent": "center", "position": "relative", "marginLeft": "16rpx" } } };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "custom-nav" }, [
      vue.createElementVNode("view", {
        class: "nav-back",
        onClick: $setup.goBack
      }, [
        $setup.props.showBack ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "nav-icon",
          onClick: $setup.goBack,
          src: _imports_0$3
        })) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("view", { class: "nav-item" }, [
        vue.createElementVNode(
          "text",
          { class: "nav-title" },
          vue.toDisplayString($setup.props.title),
          1
          /* TEXT */
        )
      ]),
      vue.createElementVNode("view", {
        class: "nav-actions",
        onClick: $setup.onAdd
      }, [
        vue.createTextVNode(
          vue.toDisplayString($setup.props.rightText) + " ",
          1
          /* TEXT */
        ),
        vue.createCommentVNode(' <image class="nav-icon" @click="onAdd" src="/static/tabbar/add.png"/> ')
      ])
    ]);
  }
  const TopNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["styles", [_style_0$h]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/components/TopNavBar.uvue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "login",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const loginType = vue.ref(true);
      const isCheck = vue.ref("");
      const btnWord = vue.ref("获取验证码");
      const isCounting = vue.ref(false);
      const user_info = vue.ref(false);
      const user_text = vue.ref(new UTSJSONObject({
        title: "",
        content: ""
      }));
      const changeType = (bool) => {
        loginType.value = bool;
      };
      const closeUserPopup = () => {
        user_info.value = false;
      };
      const showUserInfo = () => {
        user_info.value = true;
        user_text.value = new UTSJSONObject({
          title: "用户协议",
          content: "用户协议内容"
        });
      };
      const priviteInfo = () => {
        user_info.value = true;
        user_text.value = new UTSJSONObject({
          title: "隐私政策",
          content: "隐私政策内容"
        });
      };
      const isChecked = (e2) => {
        isCheck.value = e2.join(",");
      };
      function countDown(seconds) {
        if (seconds <= 0) {
          btnWord.value = "获取验证码";
          isCounting.value = false;
          return null;
        }
        btnWord.value = "".concat(seconds, "秒后重发");
        setTimeout(() => {
          countDown(seconds - 1);
        }, 1e3);
      }
      const getPsw = () => {
        if (isCounting.value)
          return null;
        uni.__log__("log", "at pages/login/login.uvue:146", "发送验证码请求...");
        isCounting.value = true;
        countDown(90);
      };
      const login = () => {
        if (isCheck.value == "") {
          uni.showToast({
            title: "请先同意用户协议和隐私政策",
            icon: "none"
          });
        } else {
          uni.showToast({
            title: "登录成功",
            icon: "none"
          });
        }
      };
      const __returned__ = { loginType, isCheck, btnWord, isCounting, user_info, user_text, changeType, closeUserPopup, showUserInfo, priviteInfo, isChecked, countDown, getPsw, login, get TopNavBar() {
        return TopNavBar;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$2 = "/static/login_banner.png";
  const _style_0$g = { "container": { "": { "height": "100%", "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "40rpx", "paddingBottom": "20rpx", "paddingLeft": "40rpx", "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "longin_banner": { ".container ": { "width": "250rpx", "height": "400rpx", "marginBottom": "20rpx" } }, "content": { ".container ": { "width": "100%" } }, "check-box": { ".container .content ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-start", "marginTop": "20rpx" } }, "fui-text-box": { ".container .content .check-box ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-start", "marginLeft": "10rpx" } }, "fui-text": { ".container .content .check-box .fui-text-box ": { "color": "#1296db" } }, "tips": { ".container .content ": { "marginTop": "20rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "40rpx", "paddingRight": "40rpx", "paddingBottom": "40rpx", "paddingLeft": "40rpx" } }, "fui-title__pb": { ".container .fui-scroll__wrap ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between" } } };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_2$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    const _component_fui_checkbox = resolveEasycom(vue.resolveDynamicComponent("fui-checkbox"), __easycom_3$2);
    const _component_fui_label = resolveEasycom(vue.resolveDynamicComponent("fui-label"), __easycom_4$1);
    const _component_fui_checkbox_group = resolveEasycom(vue.resolveDynamicComponent("fui-checkbox-group"), __easycom_5);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_4$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode($setup["TopNavBar"], {
        title: "登陆",
        rightText: "注册"
      }),
      vue.createElementVNode("image", {
        src: _imports_0$2,
        class: "longin_banner"
      }),
      vue.createElementVNode("view", { class: "content" }, [
        $setup.loginType ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createVNode(_component_fui_input, {
            "placeholder-style": "color:#000",
            backgroundColor: "#d3a0fa",
            radius: 40,
            borderBottom: false,
            placeholder: "请输入账号"
          }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "margin-right": "20rpx" } }, [
                vue.createVNode(_component_fui_icon, {
                  name: "mobile",
                  color: "#1296db",
                  size: 48
                })
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_fui_input, {
            "placeholder-style": "color:#000",
            backgroundColor: "#d3a0fa",
            marginTop: 40,
            radius: 40,
            borderBottom: false,
            placeholder: "请输入密码",
            type: "password"
          }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "margin-right": "20rpx" } }, [
                vue.createVNode(_component_fui_icon, {
                  name: "captcha",
                  color: "#1296db",
                  size: 48
                })
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "tips" }, [
            vue.createElementVNode("text", {
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.changeType(false))
            }, "短信登陆"),
            vue.createElementVNode("text", null, "忘记密码")
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createVNode(_component_fui_input, {
            "placeholder-style": "color:#000",
            backgroundColor: "#d3a0fa",
            radius: 40,
            borderBottom: false,
            placeholder: "请输入账号"
          }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "margin-right": "20rpx" } }, [
                vue.createVNode(_component_fui_icon, {
                  name: "mobile",
                  color: "#1296db",
                  size: 48
                })
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_fui_input, {
            padding: "20rpx 32rpx",
            backgroundColor: "#d3a0fa",
            placeholder: "请输入验证码",
            bottomLeft: 0,
            marginTop: 40,
            radius: 40,
            placeholderStyle: "font-size: 26rpx;",
            "placeholder-style": "color:#000",
            borderBottom: false
          }, {
            left: vue.withCtx(() => [
              vue.createElementVNode("view", { style: { "margin-right": "20rpx" } }, [
                vue.createVNode(_component_fui_icon, {
                  name: "captcha",
                  color: "#1296db",
                  size: 48
                })
              ])
            ]),
            default: vue.withCtx(() => [
              vue.createVNode(_component_fui_button, {
                width: "200rpx",
                height: "64rpx",
                size: 28,
                onClick: $setup.getPsw,
                text: $setup.btnWord,
                background: "none",
                color: "#333",
                disabled: $setup.isCounting
              }, null, 8, ["text", "disabled"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "tips" }, [
            vue.createElementVNode("text", {
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.changeType(true))
            }, "密码登陆"),
            vue.createElementVNode("text", null, "忘记密码")
          ])
        ])),
        vue.createVNode(_component_fui_checkbox_group, {
          name: "checkbox",
          class: "check-box",
          onChange: $setup.isChecked
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_fui_label, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_fui_checkbox, { value: "1" })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("view", { class: "fui-text-box" }, [
              vue.createElementVNode("text", null, "已阅读并同意"),
              vue.createElementVNode("text", {
                class: "fui-text",
                onClick: $setup.showUserInfo
              }, "《用户协议》"),
              vue.createElementVNode("text", null, "和"),
              vue.createElementVNode("text", {
                class: "fui-text",
                onClick: $setup.priviteInfo
              }, "《隐私政策》")
            ])
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(_component_fui_button, {
          text: "登录",
          margin: "20rpx 0 0 0",
          background: "#1296db",
          color: "#fff",
          size: 40,
          onOnclick: $setup.login
        })
      ]),
      vue.createElementVNode("view", null, [
        vue.createVNode(_component_fui_bottom_popup, {
          visible: $setup.user_info,
          onClose: $setup.closeUserPopup
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "fui-scroll__wrap" }, [
              vue.createElementVNode("view", { class: "fui-title__pb" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($setup.user_text.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { onClick: $setup.closeUserPopup }, [
                  vue.createVNode(_component_fui_icon, {
                    name: "close",
                    size: 48
                  })
                ])
              ]),
              vue.createElementVNode("scroll-view", {
                "scroll-y": true,
                "show-scrollbar": false
              }, [
                vue.createElementVNode(
                  "view",
                  null,
                  vue.toDisplayString($setup.user_text.content),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["visible"])
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["styles", [_style_0$g]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/login/login.uvue"]]);
  const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "messageDeviceDetail",
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
        constructor(id, type, time, location2) {
          this.id = id;
          this.type = type;
          this.time = time;
          this.location = location2;
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
        uni.__log__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:132", today.value);
        if (day.isToday) {
          uni.__log__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:134", "今天");
        }
        showCalendar.value = false;
      };
      const msgDetail = (e2) => {
        uni.navigateTo({
          url: "/pages/message/messageDetail/messageDetail?id=" + e2.id
        });
      };
      const change = (res) => {
        uni.__log__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:146", "res", res);
      };
      const ShowCalendar = () => {
        showCalendar.value = !showCalendar.value;
      };
      const hideCalendar = () => {
        showCalendar.value = false;
      };
      const __returned__ = { checkIns, today, showCalendar, videoSrc, activeTab, testTitle, videoRef, playVideo, pasueVideo, SecurityEvent, Tab, tabs, events, getFilteredEvents, changeTab, select, msgDetail, change, ShowCalendar, hideCalendar };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$f = { "container": { "": { "width": "100%", "height": "100%", "position": "relative", "backgroundColor": "#f3f3f3" } }, "vedio-box": { ".container ": { "width": "100%" } }, "video": { ".container .vedio-box ": { "width": "100%" } }, "content-box": { ".container ": { "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "sub-nav": { ".container .content-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "select": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "10rpx" } }, "today": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "width": "120rpx" } }, "down": { ".container .content-box .sub-nav .today ": { "width": "25rpx", "height": "25rpx" } }, "select-item": { ".container .content-box .sub-nav .select ": { "flex": 1, "backgroundColor": "#ffffff", "color": "#333333", "paddingTop": "10rpx", "paddingRight": "20rpx", "paddingBottom": "10rpx", "paddingLeft": "20rpx", "borderTopLeftRadius": "5rpx", "borderTopRightRadius": "5rpx", "borderBottomRightRadius": "5rpx", "borderBottomLeftRadius": "5rpx", "marginTop": 0, "marginRight": "5rpx", "marginBottom": 0, "marginLeft": "5rpx" } }, "active": { ".container .content-box .sub-nav .select ": { "color": "#ffffff", "backgroundColor": "#1296db" } }, "tab-content": { ".container .content-box ": { "display": "flex", "flexDirection": "column", "alignItems": "center", "marginTop": "20rpx" } }, "tab-pane": { ".container .content-box .tab-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "width": "100%", "marginBottom": "30rpx" } }, "item-content": { ".container .content-box .tab-content .tab-pane ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "item-icon": { ".container .content-box .tab-content .tab-pane .item-content ": { "width": "60rpx", "height": "60rpx" } }, "info": { ".container .content-box .tab-content .tab-pane .item-content ": { "marginLeft": "20rpx" } }, "item-img": { ".container .content-box .tab-content .tab-pane ": { "width": "100rpx", "height": "60rpx" } }, "calendar-box": { ".container ": { "width": "100%", "backgroundColor": "#ffffff" } }, "btn-chanel-box": { ".container .calendar-box ": { "position": "absolute", "width": "85%", "bottom": "45rpx", "left": "60rpx", "borderTopLeftRadius": "50rpx", "borderTopRightRadius": "50rpx", "borderBottomRightRadius": "50rpx", "borderBottomLeftRadius": "50rpx" } }, "popup-title": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingTop": 0, "paddingRight": "40rpx", "paddingBottom": 0, "paddingLeft": "40rpx" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "30rpx", "paddingRight": 0, "paddingBottom": "30rpx", "paddingLeft": 0, "position": "relative" } }, "fui-sub__title": { ".container ": { "textAlign": "center", "fontSize": "24rpx", "color": "#7F7F7F", "transform": "scale(0.9)" } }, "fui-scroll__view": { ".container ": { "width": "100%", "height": "50%" } }, "fui-list__cell": { ".container ": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } } };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_daily_punch = resolveEasycom(vue.resolveDynamicComponent("l-daily-punch"), __easycom_0$7);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_4$3);
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
              src: _imports_0$7
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
                class: "tab-pane",
                onClick: ($event) => $setup.msgDetail(event)
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
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createVNode(_component_fui_bottom_popup, {
        visible: $setup.showCalendar,
        onClose: $setup.hideCalendar
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "calendar-box" }, [
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
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible"])
    ]);
  }
  const PagesMessageMessageDeviceDetailMessageDeviceDetail = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["styles", [_style_0$f]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/messageDeviceDetail/messageDeviceDetail.uvue"]]);
  const _sfc_main$e = vue.defineComponent({
    name: "fui-tag",
    emits: ["onclick"],
    props: {
      text: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: "primary"
      },
      theme: {
        type: String,
        default: "dark"
      },
      background: {
        type: String,
        default: ""
      },
      isBorder: {
        type: Boolean,
        default: true
      },
      borderColor: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: ""
      },
      size: {
        type: Number,
        default: 24
      },
      scaleRatio: {
        type: Number,
        default: 1
      },
      originLeft: {
        type: Boolean,
        default: false
      },
      originRight: {
        type: Boolean,
        default: false
      },
      highlight: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Number,
        default: 8
      },
      padding: {
        type: String,
        default: "16rpx 32rpx"
      },
      marginTop: {
        type: Number,
        default: 0
      },
      marginBottom: {
        type: Number,
        default: 0
      },
      marginLeft: {
        type: Number,
        default: 0
      },
      marginRight: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {};
    },
    methods: {
      handleClick() {
        this.$emit("onclick", this.index);
      }
    }
  });
  const _style_0$e = { "fui-tag__wrap": { "": { "display": "flex", "flexShrink": 0, "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "relative", "borderTopWidth": 0.5, "borderRightWidth": 0.5, "borderBottomWidth": 0.5, "borderLeftWidth": 0.5, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(0,0,0,0)", "borderRightColor": "rgba(0,0,0,0)", "borderBottomColor": "rgba(0,0,0,0)", "borderLeftColor": "rgba(0,0,0,0)", "overflow": "hidden", "boxSizing": "border-box" } }, "fui-tag__no-border": { "": { "borderTopWidth": 0, "borderRightWidth": 0, "borderBottomWidth": 0, "borderLeftWidth": 0 } }, "fui-tag__text": { "": { "lines": 1, "overflow": "hidden", "textOverflow": "ellipsis" } }, "fui-tag__primary-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-tag_primary-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_success-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_warning-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_danger-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_purple-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag__success-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#09BE4F", "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F" } }, "fui-tag__warning-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFB703", "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703" } }, "fui-tag__danger-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#FF2B2B", "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B" } }, "fui-tag__purple-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#6831FF", "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF" } }, "fui-tag__primary-light": { "": { "!backgroundImage": "none", "!backgroundColor": "#F1F4FA", "!borderTopColor": "#F1F4FA", "!borderRightColor": "#F1F4FA", "!borderBottomColor": "#F1F4FA", "!borderLeftColor": "#F1F4FA" } }, "fui-tag_primary-light": { "": { "!color": "#465CFF" } }, "fui-tag_primary-plain": { "": { "!color": "#465CFF" } }, "fui-tag__success-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(9,190,79,0.05)", "!borderTopColor": "rgba(9,190,79,0.05)", "!borderRightColor": "rgba(9,190,79,0.05)", "!borderBottomColor": "rgba(9,190,79,0.05)", "!borderLeftColor": "rgba(9,190,79,0.05)" } }, "fui-tag_success-light": { "": { "!color": "#09BE4F" } }, "fui-tag_success-plain": { "": { "!color": "#09BE4F" } }, "fui-tag__warning-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(255,183,3,0.1)", "!borderTopColor": "rgba(255,183,3,0.1)", "!borderRightColor": "rgba(255,183,3,0.1)", "!borderBottomColor": "rgba(255,183,3,0.1)", "!borderLeftColor": "rgba(255,183,3,0.1)" } }, "fui-tag_warning-light": { "": { "!color": "#FFB703" } }, "fui-tag_warning-plain": { "": { "!color": "#FFB703" } }, "fui-tag__danger-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(255,43,43,0.05)", "!borderTopColor": "rgba(255,43,43,0.05)", "!borderRightColor": "rgba(255,43,43,0.05)", "!borderBottomColor": "rgba(255,43,43,0.05)", "!borderLeftColor": "rgba(255,43,43,0.05)" } }, "fui-tag_danger-light": { "": { "!color": "#FF2B2B" } }, "fui-tag_danger-plain": { "": { "!color": "#FF2B2B" } }, "fui-tag__purple-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(104,49,255,0.05)", "!borderTopColor": "rgba(104,49,255,0.05)", "!borderRightColor": "rgba(104,49,255,0.05)", "!borderBottomColor": "rgba(104,49,255,0.05)", "!borderLeftColor": "rgba(104,49,255,0.05)" } }, "fui-tag_purple-light": { "": { "!color": "#6831FF" } }, "fui-tag_purple-plain": { "": { "!color": "#6831FF" } }, "fui-tag__primary-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-tag__success-plain": { "": { "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F" } }, "fui-tag__warning-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703" } }, "fui-tag__danger-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B" } }, "fui-tag__purple-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF" } }, "fui-tag__origin-left": { "": { "transformOrigin": "0 center" } }, "fui-tag__origin-right": { "": { "transformOrigin": "100% center" } }, "fui-tag__opacity-active": { "": { "opacity": 0.5 } } };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["fui-tag__wrap", [$props.originLeft ? "fui-tag__origin-left" : "", $props.originRight ? "fui-tag__origin-right" : "", $props.background == "" ? "fui-tag__".concat($props.type, "-").concat($props.theme) : "", $props.background != "" && $props.borderColor == "" || !$props.isBorder ? "fui-tag__no-border" : ""]]),
      style: vue.normalizeStyle({ background: $props.background, borderColor: $props.borderColor, transform: "scale(".concat($props.scaleRatio, ")"), borderRadius: "".concat($props.radius, "rpx"), padding: $props.padding, marginTop: "".concat($props.marginTop, "rpx"), marginRight: "".concat($props.marginRight, "rpx"), marginBottom: "".concat($props.marginBottom, "rpx"), marginLeft: "".concat($props.marginLeft, "rpx") }),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.handleClick && $options.handleClick(...args)),
      "hover-stay-time": 120,
      "hover-class": $props.highlight ? "fui-tag__opacity-active" : ""
    }, [
      $props.text != "" ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass(["fui-tag__text", [$props.background == "" ? "fui-tag_".concat($props.type, "-").concat($props.theme) : ""]]),
          style: vue.normalizeStyle({ fontSize: "".concat($props.size, "rpx"), lineHeight: "".concat($props.size, "rpx"), color: $props.color })
        },
        vue.toDisplayString($props.text),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["hover-class"]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["styles", [_style_0$e]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-tag/fui-tag.uvue"]]);
  class msgType extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            id: { type: Number, optional: false },
            desc: { type: String, optional: false },
            time: { type: String, optional: false },
            type: { type: String, optional: false },
            flag: { type: String, optional: false }
          };
        },
        name: "msgType"
      };
    }
    constructor(options, metadata = msgType.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.id = this.__props__.id;
      this.desc = this.__props__.desc;
      this.time = this.__props__.time;
      this.type = this.__props__.type;
      this.flag = this.__props__.flag;
      delete this.__props__;
    }
  }
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "messageSystem",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const content = vue.ref([
        new msgType({
          id: 1,
          desc: "您的XXX设备(ICCID:123456789)流量即将到期，请及时续费",
          time: "2024-10-24 15:58:32",
          type: "notice",
          flag: "unread"
        }),
        new msgType({
          id: 2,
          desc: "您的XXX设备(ICCID:123456789)流量已到期",
          time: "2024-10-24 15:58:32",
          type: "announcement",
          flag: "read"
        }),
        new msgType({
          id: 3,
          desc: "您的XXX设备(ICCID:123456789)流量已到期",
          time: "2024-10-24 15:58:32",
          type: "share",
          flag: "read"
        })
      ]);
      const read = (id) => {
        uni.showToast({
          title: "已标记为已读" + id.toString()
        });
      };
      const submit = () => {
        uni.showToast({
          title: "确认分享",
          icon: "none"
        });
      };
      const __returned__ = { content, read, submit };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$d = { "container": { "": { "height": "100%", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "backgroundColor": "#f5f5f5" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "item": { ".container .content ": { "display": "flex", "flexDirection": "row" } }, "unread": { ".container .content .item ": { "width": "20rpx", "height": "20rpx", "marginRight": "10rpx" } }, "item-content": { ".container .content .item ": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1", "paddingBottom": "20rpx", "marginBottom": "20rpx", "flex": 1 } }, "item-content-bottom": { ".container .content .item .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-between", "marginTop": "10rpx" } }, "tag-time": { ".container .content .item .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-between", "marginTop": "10rpx" } }, "fui-tag__wrap": { ".container .content .item .item-content .tag-time ": { "!width": "70rpx", "!height": "40rpx", "!paddingTop": "5rpx", "!paddingRight": "10rpx", "!paddingBottom": "5rpx", "!paddingLeft": "10rpx", "!marginBottom": 0 } }, "fui-tag__text": { ".container .content .item .item-content .tag-time .fui-tag__wrap ": { "!fontSize": "22rpx" } } };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_tag = resolveEasycom(vue.resolveDynamicComponent("fui-tag"), __easycom_0$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.content, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "item",
              key: index
            }, [
              vue.createElementVNode("image", {
                class: "unread",
                src: item.flag == "unread" ? "/static/dot.png" : ""
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { class: "item-content" }, [
                vue.createElementVNode("text", {
                  onClick: ($event) => $setup.read(item.id)
                }, vue.toDisplayString(item.desc), 9, ["onClick"]),
                vue.createElementVNode("view", { class: "item-content-bottom" }, [
                  vue.createElementVNode("view", { class: "tag-time" }, [
                    item.type == "notice" ? (vue.openBlock(), vue.createBlock(_component_fui_tag, {
                      key: 0,
                      text: "通知",
                      "margin-bottom": 24,
                      "margin-right": 24
                    })) : item.type == "announcement" ? (vue.openBlock(), vue.createBlock(_component_fui_tag, {
                      key: 1,
                      text: "公告",
                      type: "success",
                      "margin-bottom": 24,
                      "margin-right": 24
                    })) : item.type == "share" ? (vue.openBlock(), vue.createBlock(_component_fui_tag, {
                      key: 2,
                      text: "分享",
                      type: "warning",
                      "margin-bottom": 24,
                      "margin-right": 24
                    })) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.time),
                      1
                      /* TEXT */
                    )
                  ]),
                  item.type == "share" ? (vue.openBlock(), vue.createBlock(_component_fui_button, {
                    key: 0,
                    width: "100rpx",
                    height: "40rpx",
                    size: 25,
                    text: "确认",
                    onOnclick: $setup.submit
                  })) : vue.createCommentVNode("v-if", true)
                ])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesMessageMessageSystemMessageSystem = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["styles", [_style_0$d]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/messageSystem/messageSystem.uvue"]]);
  class tabItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            id: { type: String, optional: false },
            title: { type: String, optional: false },
            content: { type: "Unknown", optional: false }
          };
        },
        name: "tabItem"
      };
    }
    constructor(options, metadata = tabItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.id = this.__props__.id;
      this.title = this.__props__.title;
      this.content = this.__props__.content;
      delete this.__props__;
    }
  }
  class ContentType extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            id: { type: String, optional: false },
            title: { type: String, optional: false },
            date: { type: String, optional: false },
            price: { type: String, optional: false },
            state: { type: String, optional: false },
            iccid: { type: String, optional: false },
            isPay: { type: String, optional: false }
          };
        },
        name: "ContentType"
      };
    }
    constructor(options, metadata = ContentType.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.id = this.__props__.id;
      this.title = this.__props__.title;
      this.date = this.__props__.date;
      this.price = this.__props__.price;
      this.state = this.__props__.state;
      this.iccid = this.__props__.iccid;
      this.isPay = this.__props__.isPay;
      delete this.__props__;
    }
  }
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "myOrders",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const tabVal = vue.ref(0);
      const tabsVal = vue.ref([
        new tabItem({
          id: "0",
          title: "全部",
          content: []
        }),
        new tabItem({
          id: "1",
          title: "待付款",
          content: []
        }),
        new tabItem({
          id: "2",
          title: "已完成",
          content: []
        }),
        new tabItem({
          id: "3",
          title: "已取消",
          content: []
        }),
        new tabItem({
          id: "4",
          title: "退款",
          content: []
        })
      ]);
      const content = vue.ref([
        new ContentType({
          id: "1111",
          title: "五年畅想套餐",
          date: "2025-07-09 15:00:00",
          price: "¥300",
          state: "已完成",
          iccid: "89862235957372384387456",
          isPay: "2"
        }),
        new ContentType({
          id: "1112",
          title: "五年畅想套餐",
          date: "2025-07-09 15:00:00",
          price: "¥300",
          state: "已取消",
          iccid: "89862235957372384387454",
          isPay: "3"
        }),
        new ContentType({
          id: "1113",
          title: "五年畅想套餐",
          date: "2025-07-09 15:00:00",
          price: "¥300",
          state: "待付款",
          iccid: "89862235957372384387467",
          isPay: "1"
        }),
        new ContentType({
          id: "1114",
          title: "五年畅想套餐",
          date: "2025-07-09 15:00:00",
          price: "¥300",
          state: "已退款",
          iccid: "89862235957372384387465",
          isPay: "4"
        })
      ]);
      const getFilteredEvents = () => {
        if (tabVal.value == 0)
          return [...content.value];
        const selectedType = tabsVal.value[tabVal.value].id;
        return content.value.filter((event) => {
          return event.isPay == selectedType;
        });
      };
      const changeTab = (val) => {
        tabVal.value = val;
      };
      const goDetail = (id) => {
        uni.navigateTo({
          url: "/pages/mine/myOrders/orderDetail/orderDetail?id=" + id
        });
      };
      const goPay = () => {
        uni.showToast({
          title: "去付款",
          icon: "none"
        });
      };
      const __returned__ = { tabVal, tabsVal, content, getFilteredEvents, changeTab, goDetail, goPay };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$c = { "container": { "": { "width": "100%", "height": "100%", "backgroundColor": "#F5F5F5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "l-tabs": { ".container ": { "!backgroundColor": "rgba(0,0,0,0)" } }, "list-item": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "30rpx", "paddingBottom": "20rpx", "paddingLeft": "30rpx", "marginTop": "20rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "title-state": { ".container .list-item ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "10rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": 0 } }, "date-price": { ".container .list-item ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "10rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": 0 } }, "device-type": { ".container .list-item ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "10rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": 0 } }, "title-style": { ".container .list-item .title-state ": { "fontSize": "30rpx", "color": "#000000", "fontWeight": "bold" }, ".container .list-item .date-price ": { "fontSize": "30rpx", "color": "#000000", "fontWeight": "bold" }, ".container .list-item .device-type ": { "fontSize": "30rpx", "color": "#000000", "fontWeight": "bold" } }, "state-style": { ".container .list-item .title-state ": { "fontSize": "24rpx", "color": "#FF5722" }, ".container .list-item .date-price ": { "fontSize": "24rpx", "color": "#FF5722" }, ".container .list-item .device-type ": { "fontSize": "24rpx", "color": "#FF5722" } }, "price": { ".container .list-item .date-price ": { "fontSize": "38rpx" } }, "btn": { ".container .list-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "paddingTop": "10rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": 0 } } };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    const _component_l_tab_panel = resolveEasycom(vue.resolveDynamicComponent("l-tab-panel"), __easycom_1$2);
    const _component_l_tabs = resolveEasycom(vue.resolveDynamicComponent("l-tabs"), __easycom_2$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_l_tabs, {
        value: $setup.tabVal,
        onClick: $setup.changeTab,
        bgColor: "transparent",
        color: "#000000",
        activeColor: "#FF5722"
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tabsVal, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_l_tab_panel, {
                key: index,
                value: index,
                label: item.title
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($setup.getFilteredEvents(), (item2, index2) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "list-item",
                        key: index2
                      }, [
                        vue.createElementVNode("view", {
                          onClick: ($event) => $setup.goDetail(item2.id)
                        }, [
                          vue.createElementVNode("view", { class: "title-state" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "title-style" },
                              vue.toDisplayString(item2.title),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              { class: "state-style" },
                              vue.toDisplayString(item2.state),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "device-type" }, [
                            vue.createElementVNode("text", null, "办公室设备"),
                            vue.createElementVNode(
                              "text",
                              null,
                              "ICCID " + vue.toDisplayString(item2.iccid),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "date-price" }, [
                            vue.createElementVNode(
                              "text",
                              null,
                              vue.toDisplayString(item2.date),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode(
                              "text",
                              { class: "price" },
                              vue.toDisplayString(item2.price),
                              1
                              /* TEXT */
                            )
                          ])
                        ], 8, ["onClick"]),
                        item2.isPay == "1" ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "btn"
                        }, [
                          vue.createVNode(_component_fui_button, {
                            text: "去付款",
                            type: "primary",
                            width: "120rpx",
                            height: "50rpx",
                            size: 24,
                            onClick: $setup.goPay
                          })
                        ])) : vue.createCommentVNode("v-if", true)
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["value", "label"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["value"])
    ]);
  }
  const PagesMineMyOrdersMyOrders = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["styles", [_style_0$c]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/myOrders/myOrders.uvue"]]);
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "orderDetail",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const id = vue.ref("");
      onLoad((options) => {
        id.value = options.id.toString();
      });
      const __returned__ = { id };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$b = { "container": { "": { "height": "100%", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "backgroundColor": "#F5F5F5" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "40rpx", "paddingBottom": "20rpx", "paddingLeft": "40rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "item": { ".container .content ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } }, "price": { ".container .content .item ": { "fontSize": "38rpx", "color": "#555555", "fontWeight": "bold" } }, "underline": { ".container .content ": { "borderBottomWidth": "2rpx", "borderBottomStyle": "solid", "borderBottomColor": "#F1f1f1" } } };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "包年120G套餐"),
          vue.createElementVNode("text", { class: "price" }, "¥128")
        ]),
        vue.createElementVNode("view", { class: "item underline" }, [
          vue.createElementVNode("text", null, "有效期"),
          vue.createElementVNode("text", null, "60个月")
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "设备名称"),
          vue.createElementVNode("text", null, "办公室设备")
        ]),
        vue.createElementVNode("view", { class: "item underline" }, [
          vue.createElementVNode("text", null, "ICCID "),
          vue.createElementVNode("text", null, "8986042400000000000")
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "实付款"),
          vue.createElementVNode("text", null, "¥128")
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "订单编号"),
          vue.createElementVNode("text", null, "ASW22333332222")
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "下单时间"),
          vue.createElementVNode("text", null, "2024-10-23 17:21:11")
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "支付时间"),
          vue.createElementVNode("text", null, "2024-10-23 17:21:22")
        ])
      ])
    ]);
  }
  const PagesMineMyOrdersOrderDetailOrderDetail = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["styles", [_style_0$b]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/myOrders/orderDetail/orderDetail.uvue"]]);
  class DrawBorderOptions extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            direction: { type: "Unknown", optional: false },
            color: { type: String, optional: true },
            colorKey: { type: String, optional: true },
            startOffsetKey: { type: String, optional: true },
            startOffset: { type: "Unknown", optional: true },
            endOffset: { type: "Unknown", optional: true },
            lineWidth: { type: Number, optional: true },
            watchSize: { type: Boolean, optional: true },
            immediate: { type: Boolean, optional: true },
            bordered: { type: Boolean, optional: true }
          };
        },
        name: "DrawBorderOptions"
      };
    }
    constructor(options, metadata = DrawBorderOptions.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.direction = this.__props__.direction;
      this.color = this.__props__.color;
      this.colorKey = this.__props__.colorKey;
      this.startOffsetKey = this.__props__.startOffsetKey;
      this.startOffset = this.__props__.startOffset;
      this.endOffset = this.__props__.endOffset;
      this.lineWidth = this.__props__.lineWidth;
      this.watchSize = this.__props__.watchSize;
      this.immediate = this.__props__.immediate;
      this.bordered = this.__props__.bordered;
      delete this.__props__;
    }
  }
  class UseDrawBorderReturn extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            color: { type: "Unknown", optional: false },
            renderBorder: { type: "Unknown", optional: false },
            clearBorder: { type: "Unknown", optional: false },
            dispose: { type: "Unknown", optional: false }
          };
        },
        name: "UseDrawBorderReturn"
      };
    }
    constructor(options, metadata = UseDrawBorderReturn.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.color = this.__props__.color;
      this.renderBorder = this.__props__.renderBorder;
      this.clearBorder = this.__props__.clearBorder;
      this.dispose = this.__props__.dispose;
      delete this.__props__;
    }
  }
  function useDrawBorder(elementRef, options) {
    var _a, _b;
    let resizeObserver = null;
    const _c = options.watchSize, watchSize = _c == void 0 ? true : _c, _d = options.immediate, immediate = _d == void 0 ? true : _d;
    const defalutColor = "#e7e7e7";
    const color = vue.ref((_a = options.color) !== null && _a !== void 0 ? _a : defalutColor);
    const bordered = vue.ref((_b = options.bordered) !== null && _b !== void 0 ? _b : true);
    let computedStartOffset = 0;
    let computedEndOffset = 0;
    const renderBorder = () => {
      var _a2, _b2, _c2, _d2;
      if (elementRef.value == null)
        return null;
      const ctx = elementRef.value.getDrawableContext();
      if (ctx == null)
        return null;
      const rect = elementRef.value.getBoundingClientRect();
      ctx.reset();
      const direction = options.direction, _e2 = options.startOffset, startOffset = _e2 == void 0 ? 0 : _e2, _f = options.endOffset, endOffset = _f == void 0 ? 0 : _f, _g = options.lineWidth, lineWidth = _g == void 0 ? 0.5 : _g, colorKey = options.colorKey, startOffsetKey = options.startOffsetKey;
      if (computedStartOffset == 0) {
        computedStartOffset = unitConvert(startOffsetKey != null ? (_b2 = (_a2 = elementRef.value) === null || _a2 === void 0 ? null : _a2.style.getPropertyValue(startOffsetKey)) !== null && _b2 !== void 0 ? _b2 : startOffset : startOffset);
      }
      if (computedEndOffset == 0) {
        computedEndOffset = unitConvert(endOffset);
      }
      if (color.value == defalutColor && colorKey != null) {
        color.value = (_d2 = (_c2 = elementRef.value) === null || _c2 === void 0 ? null : _c2.style.getPropertyValue(colorKey)) !== null && _d2 !== void 0 ? _d2 : defalutColor;
      }
      ctx.strokeStyle = color.value;
      ctx.lineWidth = lineWidth;
      switch (direction) {
        case "top":
          ctx.moveTo(computedStartOffset, 0);
          ctx.lineTo(rect.width - computedEndOffset, 0);
          break;
        case "bottom":
          ctx.moveTo(computedStartOffset, rect.height - 0.25);
          ctx.lineTo(rect.width - computedEndOffset, rect.height - 0.25);
          break;
        case "left":
          ctx.moveTo(0, computedStartOffset);
          ctx.lineTo(0, rect.height - computedEndOffset);
          break;
        case "right":
          ctx.moveTo(rect.width, computedStartOffset);
          ctx.lineTo(rect.width, rect.height - computedEndOffset);
          break;
      }
      ctx.stroke();
      ctx.update();
    };
    const setupResizeObserver = () => {
      if (watchSize) {
        if (resizeObserver == null) {
          resizeObserver = new UniResizeObserver((entries) => {
            if (!bordered.value)
              return null;
            renderBorder();
          });
        }
        vue.watchEffect(() => {
          if (elementRef.value != null) {
            resizeObserver.observe(elementRef.value);
          }
        });
      }
    };
    const dispose = () => {
      if (resizeObserver != null && elementRef.value != null) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };
    const clearBorder = () => {
      if (elementRef.value == null)
        return null;
      const ctx = elementRef.value.getDrawableContext();
      if (ctx == null)
        return null;
      bordered.value = false;
      ctx.reset();
      ctx.update();
    };
    setupResizeObserver();
    if (immediate) {
      renderBorder();
    }
    return new UseDrawBorderReturn({
      renderBorder,
      dispose,
      clearBorder,
      color
    });
  }
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "l-textarea",
    props: /* @__PURE__ */ vue.mergeModels(new UTSJSONObject({
      adjustPosition: { type: Boolean, required: true, default: true },
      autofocus: { type: Boolean, required: true, default: false },
      autosize: { type: Boolean, required: true, default: false },
      bordered: { type: Boolean, required: true, default: true },
      confirmHold: { type: Boolean, required: true, default: false },
      confirmType: { type: String, required: true, default: "return" },
      cursor: { type: Number, required: true, default: -1 },
      cursorSpacing: { type: Number, required: true, default: 0 },
      disableDefaultPadding: { type: Boolean, required: true, default: false },
      disabled: { type: Boolean, required: true, default: false },
      readonly: { type: Boolean, required: true, default: false },
      fixed: { type: Boolean, required: true, default: false },
      defaultFixed: { type: Boolean, required: true, default: false },
      focus: { type: Boolean, required: true, default: false },
      holdKeyboard: { type: Boolean, required: true, default: false },
      indicator: { type: Boolean, required: true, default: false },
      label: { type: String, required: false },
      maxcharacter: { type: Number, required: false },
      maxlength: { type: Number, required: true, default: -1 },
      placeholder: { type: String, required: true, default: "" },
      selectionEnd: { type: Number, required: true, default: -1 },
      selectionStart: { type: Number, required: true, default: -1 },
      showConfirmBar: { type: Boolean, required: true, default: true },
      value: { type: String, required: false },
      layout: { type: String, required: true, default: "horizontal" },
      placeholderStyle: { type: String, required: true, default: "" },
      lStyle: { type: String, required: false },
      labelStyle: { type: String, required: false },
      indicatorStyle: { type: String, required: false },
      innerStyle: { type: String, required: false },
      classic: { type: Boolean, required: true, default: false },
      borderColor: { type: String, required: false },
      focusedBorderColor: { type: String, required: false },
      focused: { type: Boolean, required: true, default: false }
    }), new UTSJSONObject({
      "modelValue": { type: String, default: "" },
      "modelModifiers": {}
    })),
    emits: /* @__PURE__ */ vue.mergeModels(["change", "focus", "blur", "confirm", "linechange", "keyboardheightchange"], ["update:modelValue"]),
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emit = __emit;
      const props = __props;
      const formItemBlur = vue.inject("formItemBlur", null);
      const formDisabled = vue.inject("formDisabled", null);
      const formReadonly = vue.inject("formReadonly", null);
      const count = vue.ref(0);
      const innerFocused = vue.ref(props.focus || props.focused);
      const calculateValue = (value) => {
        const maxlength = props.maxlength, maxcharacter = props.maxcharacter;
        if (maxcharacter != null && maxcharacter > 0) {
          return characterLimit("maxcharacter", value, maxcharacter);
        } else if (maxlength > 0) {
          return characterLimit("maxlength", value, maxlength);
        }
        return {
          characters: value,
          length: value.length
        };
      };
      let _innerValue = "";
      const modelValue = vue.useModel(__props, "modelValue");
      const innerValue = vue.computed({
        set(v2) {
          _innerValue = v2;
          modelValue.value = v2;
          emit("change", v2);
        },
        get() {
          var _a2, _b2;
          const _value = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : modelValue.value;
          if (_innerValue != _value) {
            const _c = calculateValue((_b2 = props.value) !== null && _b2 !== void 0 ? _b2 : modelValue.value), characters = _c.characters, length_1 = _c.length;
            count.value = length_1;
            return characters;
          }
          return _value;
        }
      });
      const isReadonly = vue.computed(() => {
        var _a2;
        if (props.readonly)
          return props.readonly;
        return (_a2 = formReadonly === null || formReadonly === void 0 ? null : formReadonly.value) !== null && _a2 !== void 0 ? _a2 : false;
      });
      const isDisabled = vue.computed(() => {
        var _a2;
        if (props.disabled)
          return props.disabled;
        return (_a2 = formDisabled === null || formDisabled === void 0 ? null : formDisabled.value) !== null && _a2 !== void 0 ? _a2 : false;
      });
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        return style;
      });
      const onInput = (event) => {
        let _a2 = event.detail, value = _a2.value;
        _a2.cursor;
        const _b2 = calculateValue(value), characters = _b2.characters, length = _b2.length;
        count.value = length;
        innerValue.value = characters;
      };
      const onFocus = (event) => {
        innerFocused.value = true;
        emit("focus", event);
      };
      const onBlur = (event) => {
        innerFocused.value = false;
        emit("blur", event);
        formItemBlur === null || formItemBlur === void 0 ? null : formItemBlur();
      };
      const onConfirm = (event) => {
        emit("confirm", event);
      };
      const onLineChange = (event) => {
        emit("linechange", event);
      };
      const onKeyboardHeightChange = (event) => {
        emit("keyboardheightchange", event);
      };
      vue.watchEffect(() => {
        innerFocused.value = props.focus || props.focused;
      });
      const textareaRef = vue.ref(null);
      const _b = useDrawBorder(textareaRef, new DrawBorderOptions({
        direction: "bottom",
        watchSize: true,
        startOffset: 16,
        immediate: false,
        color: props.borderColor
      })), clearBorder = _b.clearBorder, color = _b.color, renderBorder = _b.renderBorder;
      vue.onMounted(() => {
        vue.watchEffect(() => {
          var _a2, _b2;
          if (!props.classic) {
            if (props.borderColor != null && !innerFocused.value) {
              (_a2 = textareaRef.value) === null || _a2 === void 0 ? null : _a2.style.setProperty("border-color", props.borderColor);
            }
            if (props.focusedBorderColor != null && innerFocused.value) {
              (_b2 = textareaRef.value) === null || _b2 === void 0 ? null : _b2.style.setProperty("border-color", props.focusedBorderColor);
            }
          }
          if (!props.bordered || props.classic) {
            clearBorder();
            return null;
          }
          if (props.borderColor != null && !innerFocused.value) {
            color.value = props.borderColor;
          }
          renderBorder();
        });
      });
      const __returned__ = { emit, props, formItemBlur, formDisabled, formReadonly, count, innerFocused, calculateValue, get _innerValue() {
        return _innerValue;
      }, set _innerValue(v2) {
        _innerValue = v2;
      }, modelValue, innerValue, isReadonly, isDisabled, styles, onInput, onFocus, onBlur, onConfirm, onLineChange, onKeyboardHeightChange, textareaRef, clearBorder, color, renderBorder };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$a = { "l-textarea": { "": { "boxSizing": "border-box", "paddingTop": "32rpx", "paddingRight": "32rpx", "paddingBottom": "32rpx", "paddingLeft": "32rpx", "backgroundColor": "#ffffff" } }, "l-textarea--horizontal": { "": { "flexDirection": "row" } }, "l-textarea__label": { "": { "color": "rgba(0,0,0,0.88)", "flexShrink": 0, "lineHeight": "36px", "overflow": "hidden", "whiteSpace": "nowrap", "textOverflow": "ellipsis" } }, "l-textarea__label--vertical": { "": { "fontSize": 14, "paddingBottom": "16rpx" } }, "l-textarea__label--horizontal": { "": { "fontSize": 16, "marginRight": "32rpx" } }, "l-textarea__wrapper": { "": { "flex": 1, "overflow": "hidden" } }, "l-textarea__wrapper-inner": { "": { "flex": "1 1 auto", "width": "100%", "boxSizing": "border-box", "minWidth": 0, "minHeight": 20, "marginTop": 0, "marginRight": 0, "marginBottom": 0, "marginLeft": 0, "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "textAlign": "left", "backgroundColor": "rgba(0,0,0,0)", "borderTopWidth": 0, "borderRightWidth": 0, "borderBottomWidth": 0, "borderLeftWidth": 0, "borderTopStyle": "none", "borderRightStyle": "none", "borderBottomStyle": "none", "borderLeftStyle": "none", "borderTopColor": "#000000", "borderRightColor": "#000000", "borderBottomColor": "#000000", "borderLeftColor": "#000000", "fontSize": 16, "color": "rgba(0,0,0,0.88)", "lineHeight": "48rpx" } }, "l-textarea__placeholder": { "": { "color": "rgba(0,0,0,0.45)", "fontSize": 16, "lineHeight": "48rpx" } }, "l-textarea__indicator": { "": { "flexShrink": 0, "color": "rgba(0,0,0,0.45)", "fontSize": "24rpx", "textAlign": "right", "lineHeight": "40rpx", "paddingTop": "16rpx" } }, "l-textarea--border": { "": { "position": "relative" } }, "l-textarea--border-focused": { "": { "borderBottomColor": "#3283ff" } }, "is-disabled": { ".l-textarea ": { "color": "rgba(0,0,0,0.25)" } }, "l-textarea--classic": { "": { "paddingTop": 12, "paddingRight": 16, "paddingBottom": 12, "paddingLeft": 16, "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx", "borderTopWidth": 0.5, "borderRightWidth": 0.5, "borderBottomWidth": 0.5, "borderLeftWidth": 0.5, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#eeeeee", "borderRightColor": "#eeeeee", "borderBottomColor": "#eeeeee", "borderLeftColor": "#eeeeee" } }, "l-textarea--classic-focused": { "": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" } } };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b;
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["l-textarea", [
          "l-textarea--" + $props.layout,
          // classic ? 'l-textarea--classic-' + status : '',
          {
            "l-textarea--classic": $props.classic,
            "l-textarea--classic-disabled": $props.classic && $setup.isDisabled,
            "l-textarea--classic-focused": $props.classic && !$setup.isDisabled && $setup.innerFocused,
            "l-textarea--border": $props.bordered && !$props.classic
          }
        ]]),
        ref: "textareaRef",
        style: vue.normalizeStyle([$setup.styles, $props.lStyle])
      },
      [
        $props.label != null || _ctx.$slots["label"] != null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["l-textarea__label", [
              "l-textarea__label--" + $props.layout
            ]]),
            style: vue.normalizeStyle([$props.labelStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ])
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "l-textarea__wrapper" }, [
          vue.createElementVNode("textarea", {
            class: vue.normalizeClass(["l-textarea__wrapper-inner", { "is-disabled": $setup.isDisabled }]),
            style: vue.normalizeStyle([$props.innerStyle]),
            maxlength: $props.maxlength,
            disabled: $setup.isDisabled || $setup.isReadonly,
            placeholder: $props.placeholder,
            "placeholder-class": "l-textarea__placeholder",
            "placeholder-style": $props.placeholderStyle,
            value: $setup.innerValue,
            "auto-height": $props.autosize,
            "auto-focus": $props.autofocus,
            fixed: $props.fixed,
            focus: $props.focus,
            cursor: $props.cursor,
            "cursor-spacing": $props.cursorSpacing,
            "adjust-position": $props.adjustPosition,
            "confirm-type": $props.confirmType,
            "confirm-hold": $props.confirmHold,
            "disable-default-padding": $props.disableDefaultPadding,
            "show-confirm-bar": $props.showConfirmBar,
            "selection-start": $props.selectionStart,
            "selection-end": $props.selectionEnd,
            "hold-keyboard": $props.holdKeyboard,
            onInput: $setup.onInput,
            onFocus: $setup.onFocus,
            onBlur: $setup.onBlur,
            onConfirm: $setup.onConfirm,
            onLinechange: $setup.onLineChange,
            onKeyboardheightchange: $setup.onKeyboardHeightChange
          }, "\n			", 46, ["maxlength", "disabled", "placeholder", "placeholder-style", "value", "auto-height", "auto-focus", "fixed", "focus", "cursor", "cursor-spacing", "adjust-position", "confirm-type", "confirm-hold", "disable-default-padding", "show-confirm-bar", "selection-start", "selection-end", "hold-keyboard"]),
          $props.indicator && ((_a = $props.maxcharacter) != null ? _a : $props.maxlength) > 0 ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: "l-textarea__indicator",
              style: vue.normalizeStyle([$props.indicatorStyle])
            },
            vue.toDisplayString($setup.count) + " / " + vue.toDisplayString((_b = $props.maxcharacter) != null ? _b : $props.maxlength),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["styles", [_style_0$a]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-textarea/components/l-textarea/l-textarea.uvue"]]);
  function getFileType(tempFilePath, fileType) {
    if (fileType != null)
      return fileType.replace(/\/.+/, "");
    const videoType = ["avi", "wmv", "mkv", "mp4", "mov", "rm", "3gp", "flv", "mpg", "rmvb"];
    const temp = tempFilePath.split(".");
    const postfix = temp[temp.length - 1];
    if (videoType.includes(postfix.toLocaleLowerCase())) {
      return "video";
    }
    return "image";
  }
  function getFileName(filePath) {
    return filePath.substring(filePath.lastIndexOf("/") + 1);
  }
  const isOverSize = (size, sizeLimit) => {
    if (sizeLimit == null)
      return false;
    const base = 1e3;
    const computedSize = sizeLimit * base;
    return size > computedSize;
  };
  function chooseImage(opts) {
    uni.chooseImage({
      count: opts.count,
      sizeType: opts.sizeType,
      sourceType: opts.sourceType,
      extension: opts.extension,
      success(res) {
        var _a;
        (_a = opts.success) === null || _a === void 0 ? void 0 : _a.call(opts, res);
      },
      fail(err) {
        var _a;
        (_a = opts.fail) === null || _a === void 0 ? void 0 : _a.call(opts, err);
      }
    });
  }
  function chooseVideo(opts) {
    uni.chooseVideo({
      sourceType: opts.sourceType,
      success(res) {
        var _a;
        (_a = opts.success) === null || _a === void 0 ? void 0 : _a.call(opts, res);
      },
      fail(err) {
        var _a;
        (_a = opts.fail) === null || _a === void 0 ? void 0 : _a.call(opts, err);
      }
    });
  }
  function chooseMedia(opts) {
    var _a, _b;
    uni.chooseMedia({
      count: opts.count,
      mediaType: ["image", "video"],
      sourceType: opts.sourceType,
      maxDuration: (_a = opts.maxDuration) !== null && _a !== void 0 ? _a : 10,
      camera: (_b = opts.camera) !== null && _b !== void 0 ? _b : "back",
      success(res) {
        var _a2;
        (_a2 = opts.success) === null || _a2 === void 0 ? void 0 : _a2.call(opts, res);
      },
      fail(err) {
        var _a2;
        (_a2 = opts.fail) === null || _a2 === void 0 ? void 0 : _a2.call(opts, err);
      }
    });
  }
  function chooseAll(opts) {
    uni.__log__("warn", "at uni_modules/lime-upload/components/l-upload/utils.ts:172", "【lime-upload】chooseAll 当前环境不支持");
  }
  function normalizeChooseFiles(type, tempFiles, tempFilePaths, sizeLimit, oversize) {
    const files = [];
    tempFiles.forEach((temp, index) => {
      var _a, _b, _c, _d;
      const tempFilePath = (_a = temp["tempFilePath"]) !== null && _a !== void 0 ? _a : tempFilePaths[index];
      const name2 = (_b = temp["name"]) !== null && _b !== void 0 ? _b : getFileName(tempFilePath);
      const size = (_c = temp["size"]) !== null && _c !== void 0 ? _c : 0;
      const width = temp["width"];
      const height = temp["height"];
      const duration = temp["duration"];
      const path = (_d = temp["path"]) !== null && _d !== void 0 ? _d : tempFilePath;
      const thumb = temp["thumbTempFilePath"];
      const _type = type == "all" ? getFileType(tempFilePath, temp["type"]) : type;
      if (isOverSize(size, sizeLimit)) {
        oversize === null || oversize === void 0 ? void 0 : oversize(temp);
        return;
      }
      files.push({
        name: name2,
        type: _type,
        url: path,
        path,
        size,
        width,
        height,
        duration,
        thumb,
        percent: 0
        // status: 'done'
      });
    });
    return files;
  }
  function chooseFiles(opts) {
    return new Promise((resolve, reject) => {
      var _a, _b;
      if (opts.mediaType == "image") {
        chooseImage({
          count: opts.count,
          mediaType: opts.mediaType,
          sizeType: opts.sizeType,
          sourceType: opts.sourceType,
          success(result) {
            const res = result;
            const tempFilePaths = res.tempFilePaths;
            const tempFiles = res.tempFiles.map((item) => {
              return {
                name: item.name,
                path: item.path,
                size: item.size,
                type: item.type
              };
            });
            const files = normalizeChooseFiles("image", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
            resolve(files);
          }
        });
      } else if (opts.mediaType == "video") {
        chooseVideo({
          count: opts.count,
          mediaType: opts.mediaType,
          sourceType: opts.sourceType,
          sizeType: opts.sizeType,
          maxDuration: opts.maxDuration,
          success(result) {
            const res = result;
            const tempFilePaths = [res.tempFilePath];
            const tempFilePath = res.tempFilePath, duration = res.duration, size = res.size, height = res.height, width = res.width;
            const tempFiles = [{ path: tempFilePath, duration, duration, size, height, width }];
            const files = normalizeChooseFiles("video", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
            resolve(files);
          }
        });
      } else if (opts.mediaType == "media") {
        chooseMedia({
          count: opts.count,
          mediaType: "media",
          sourceType: opts.sourceType,
          maxDuration: (_a = opts.maxDuration) !== null && _a !== void 0 ? _a : 10,
          camera: (_b = opts.camera) !== null && _b !== void 0 ? _b : "back",
          sizeType: opts.sizeType,
          success(result) {
            const res = result;
            const tempFilePaths = res.tempFiles.map((it2) => {
              return it2.tempFilePath;
            });
            const tempFiles = res.tempFiles.map((it2) => {
              return { path: it2.tempFilePath, size: it2.size, type: it2.fileType };
            });
            const files = normalizeChooseFiles("all", tempFiles, tempFilePaths, opts.sizeLimit, opts.oversize);
            resolve(files);
          }
        });
      } else {
        chooseAll({
          count: opts.count,
          mediaType: opts.mediaType,
          sourceType: opts.sourceType,
          sizeType: opts.sizeType,
          success(result) {
            reject("【lime-upload】chooseAll 当前环境不支持");
          }
        });
      }
    });
  }
  const easycom = new UTSJSONObject({
    autoscan: true,
    custom: new UTSJSONObject({
      "fui-(.*)": "firstui-uni/firstui/fui-$1/fui-$1.vue"
    })
  });
  const pages = [
    new UTSJSONObject({
      path: "pages/index/index",
      style: new UTSJSONObject({
        navigationBarTitleText: "首页"
      })
    }),
    new UTSJSONObject({
      path: "pages/message/message",
      style: new UTSJSONObject({
        navigationBarTitleText: "消息"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/mine",
      style: new UTSJSONObject({
        navigationBarTitleText: "我的"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/userInfo/userInfo",
      style: new UTSJSONObject({
        navigationBarTitleText: "个人信息"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/userInfo/CancelAnAccount/CancelAnAccount",
      style: new UTSJSONObject({
        navigationBarTitleText: "注销账号"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/userInfo/changePhoneNumber/changePhoneNumber",
      style: new UTSJSONObject({
        navigationBarTitleText: "修改手机号"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/userInfo/changePassword/changePassword",
      style: new UTSJSONObject({
        navigationBarTitleText: "修改密码"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/rechargeDataTraffic/rechargeDataTraffic",
      style: new UTSJSONObject({
        navigationBarTitleText: "流量充值"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/helpCenter/helpCenter",
      style: new UTSJSONObject({
        navigationBarTitleText: "帮助中心"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/helpCenter/questionDetail/questionDetail",
      style: new UTSJSONObject({
        navigationBarTitleText: "问题详情"
      })
    }),
    new UTSJSONObject({
      path: "pages/message/messageDetail/messageDetail",
      style: new UTSJSONObject({
        navigationBarTitleText: "消息详情"
      })
    }),
    new UTSJSONObject({
      path: "pages/login/login",
      style: new UTSJSONObject({
        navigationStyle: "custom",
        navigationBarTitleText: "登陆"
      })
    }),
    new UTSJSONObject({
      path: "pages/message/messageDeviceDetail/messageDeviceDetail",
      style: new UTSJSONObject({
        navigationBarTitleText: "设备信息"
      })
    }),
    new UTSJSONObject({
      path: "pages/message/messageSystem/messageSystem",
      style: new UTSJSONObject({
        navigationBarTitleText: "系统消息"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/myOrders/myOrders",
      style: new UTSJSONObject({
        navigationBarTitleText: "订单列表"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/myOrders/orderDetail/orderDetail",
      style: new UTSJSONObject({
        navigationBarTitleText: "订单详情"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/feeback/feeback",
      style: new UTSJSONObject({
        navigationBarTitleText: "意见反馈"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/systemSetting/systemSetting",
      style: new UTSJSONObject({
        navigationBarTitleText: "设置"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/about/about",
      style: new UTSJSONObject({
        navigationBarTitleText: "关于"
      })
    }),
    new UTSJSONObject({
      path: "pages/mine/localFiles/localFiles",
      style: new UTSJSONObject({
        navigationBarTitleText: "本地文件"
      })
    })
  ];
  const tabBar = new UTSJSONObject({
    list: [
      new UTSJSONObject({
        pagePath: "pages/index/index",
        iconPath: "./static/tabbar/home.png",
        selectedIconPath: "./static/tabbar/home1.png",
        text: "首页"
      }),
      new UTSJSONObject({
        pagePath: "pages/message/message",
        iconPath: "./static/tabbar/message.png",
        selectedIconPath: "./static/tabbar/message1.png",
        text: "消息"
      }),
      new UTSJSONObject({
        pagePath: "pages/mine/mine",
        iconPath: "./static/tabbar/userCenter.png",
        selectedIconPath: "./static/tabbar/userCenter1.png",
        text: "我的"
      })
    ]
  });
  const globalStyle = new UTSJSONObject({
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uniappX",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8"
  });
  const uniIdRouter = new UTSJSONObject({});
  const e = new UTSJSONObject({
    easycom,
    pages,
    tabBar,
    globalStyle,
    uniIdRouter
  });
  var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
  function t(e2) {
    return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
  }
  function n(e2, t2, n2) {
    return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var s = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = n2 || function(e3, t3) {
      var n3 = Object.create || /* @__PURE__ */ function() {
        function e4() {
        }
        return function(t4) {
          var n4;
          return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
        var t4 = n3(this);
        return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e4 = this.extend();
        return e4.init.apply(e4, arguments), e4;
      }, init: function() {
      }, mixIn: function(e4) {
        for (var t4 in e4)
          e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
        e4.hasOwnProperty("toString") && (this.toString = e4.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
        e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
      }, toString: function(e4) {
        return (e4 || c2).stringify(this);
      }, concat: function(e4) {
        var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4.words = this.words.slice(0), e4;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e3.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e4) {
        for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e4) {
        for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, h2 = a2.Utf8 = { stringify: function(e4) {
        try {
          return decodeURIComponent(escape(u2.stringify(e4)));
        } catch (e5) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e4) {
        return u2.parse(unescape(encodeURIComponent(e4)));
      } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e4) {
        "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
        if (c3) {
          for (var h3 = 0; h3 < c3; h3 += i3)
            this._doProcessBlock(s3, h3);
          var l3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(l3, u3);
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._data = this._data.clone(), e4;
      }, _minBufferSize: 0 });
      r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
        this.cfg = this.cfg.extend(e4), this.reset();
      }, reset: function() {
        l2.reset.call(this), this._doReset();
      }, update: function(e4) {
        return this._append(e4), this._process(), this;
      }, finalize: function(e4) {
        return e4 && this._append(e4), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e4) {
        return function(t4, n4) {
          return new e4.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e4) {
        return function(t4, n4) {
          return new d2.HMAC.init(e4, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), r = s, i = (n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e4[s3];
          e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], b2 = e4[t4 + 12], k2 = e4[t4 + 13], T2 = e4[t4 + 14], A2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], x2 = i3[2], O2 = i3[3];
        P2 = u2(P2, C2, x2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, C2, x2, c3, 12, a2[1]), x2 = u2(x2, O2, P2, C2, p2, 17, a2[2]), C2 = u2(C2, x2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, C2, x2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, C2, x2, m2, 12, a2[5]), x2 = u2(x2, O2, P2, C2, y2, 17, a2[6]), C2 = u2(C2, x2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, C2, x2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, C2, x2, v2, 12, a2[9]), x2 = u2(x2, O2, P2, C2, I2, 17, a2[10]), C2 = u2(C2, x2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, C2, x2, O2, b2, 7, a2[12]), O2 = u2(O2, P2, C2, x2, k2, 12, a2[13]), x2 = u2(x2, O2, P2, C2, T2, 17, a2[14]), P2 = h2(P2, C2 = u2(C2, x2, O2, P2, A2, 22, a2[15]), x2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, C2, x2, y2, 9, a2[17]), x2 = h2(x2, O2, P2, C2, S2, 14, a2[18]), C2 = h2(C2, x2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, C2, x2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, C2, x2, I2, 9, a2[21]), x2 = h2(x2, O2, P2, C2, A2, 14, a2[22]), C2 = h2(C2, x2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, C2, x2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, C2, x2, T2, 9, a2[25]), x2 = h2(x2, O2, P2, C2, f2, 14, a2[26]), C2 = h2(C2, x2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, C2, x2, O2, k2, 5, a2[28]), O2 = h2(O2, P2, C2, x2, p2, 9, a2[29]), x2 = h2(x2, O2, P2, C2, _2, 14, a2[30]), P2 = l2(P2, C2 = h2(C2, x2, O2, P2, b2, 20, a2[31]), x2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, C2, x2, w2, 11, a2[33]), x2 = l2(x2, O2, P2, C2, S2, 16, a2[34]), C2 = l2(C2, x2, O2, P2, T2, 23, a2[35]), P2 = l2(P2, C2, x2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, C2, x2, g2, 11, a2[37]), x2 = l2(x2, O2, P2, C2, _2, 16, a2[38]), C2 = l2(C2, x2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, C2, x2, O2, k2, 4, a2[40]), O2 = l2(O2, P2, C2, x2, o3, 11, a2[41]), x2 = l2(x2, O2, P2, C2, f2, 16, a2[42]), C2 = l2(C2, x2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, C2, x2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, C2, x2, b2, 11, a2[45]), x2 = l2(x2, O2, P2, C2, A2, 16, a2[46]), P2 = d2(P2, C2 = l2(C2, x2, O2, P2, p2, 23, a2[47]), x2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, C2, x2, _2, 10, a2[49]), x2 = d2(x2, O2, P2, C2, T2, 15, a2[50]), C2 = d2(C2, x2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, C2, x2, O2, b2, 6, a2[52]), O2 = d2(O2, P2, C2, x2, f2, 10, a2[53]), x2 = d2(x2, O2, P2, C2, I2, 15, a2[54]), C2 = d2(C2, x2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, C2, x2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, C2, x2, A2, 10, a2[57]), x2 = d2(x2, O2, P2, C2, y2, 15, a2[58]), C2 = d2(C2, x2, O2, P2, k2, 21, a2[59]), P2 = d2(P2, C2, x2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, C2, x2, S2, 10, a2[61]), x2 = d2(x2, O2, P2, C2, p2, 15, a2[62]), C2 = d2(C2, x2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + x2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e3.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var h3 = c3[u3];
          c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      function u2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e4, t4, n3, s3, r3, i3, o3) {
        var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, void function() {
      var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
      e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
        e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e4.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e4 = this._hasher;
        e4.reset(), e4.update(this._iKey);
      }, update: function(e4) {
        return this._hasher.update(e4), this;
      }, finalize: function(e4) {
        var t4 = this._hasher, n3 = t4.finalize(e4);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), n(function(e2, t2) {
    e2.exports = r.HmacMD5;
  })), o = n(function(e2, t2) {
    e2.exports = r.enc.Utf8;
  }), a = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function() {
      var e3 = n2, t3 = e3.lib.WordArray;
      function s2(e4, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e3.enc.Base64 = { stringify: function(e4) {
        var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
        e4.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e4) {
        var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e4.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e4, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const c = "FUNCTION", u = "OBJECT", h = "CLIENT_DB", l = "pending", d = "fulfilled", p = "rejected";
  function f(e2) {
    return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
  }
  function g(e2) {
    return "object" === f(e2);
  }
  function m(e2) {
    return "function" == typeof e2;
  }
  function y(e2) {
    return function() {
      try {
        return e2.apply(e2, arguments);
      } catch (e3) {
        console.error(e3);
      }
    };
  }
  const _ = "REJECTED", w = "NOT_PENDING";
  class v {
    constructor({ createPromise: e2, retryRule: t2 = _ } = {}) {
      this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
    }
    get needRetry() {
      if (!this.status)
        return true;
      switch (this.retryRule) {
        case _:
          return this.status === p;
        case w:
          return this.status !== l;
      }
    }
    exec() {
      return this.needRetry ? (this.status = l, this.promise = this.createPromise().then((e2) => (this.status = d, Promise.resolve(e2)), (e2) => (this.status = p, Promise.reject(e2))), this.promise) : this.promise;
    }
  }
  function I(e2) {
    return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
  }
  const S = true, b = "app", T = I(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), A = b, P = I(""), C = I("[]") || [];
  let O = "";
  try {
    O = "__UNI__1F0985E";
  } catch (e2) {
  }
  let E, L = {};
  function R(e2, t2 = {}) {
    var n2, s2;
    return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
  }
  function U() {
    return E || (E = function() {
      if ("undefined" != typeof globalThis)
        return globalThis;
      if ("undefined" != typeof self)
        return self;
      if ("undefined" != typeof window)
        return window;
      function e2() {
        return this;
      }
      return void 0 !== e2() ? e2() : new Function("return this")();
    }(), E);
  }
  L = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const N = ["invoke", "success", "fail", "complete"], D = R("_globalUniCloudInterceptor");
  function M(e2, t2) {
    D[e2] || (D[e2] = {}), g(t2) && Object.keys(t2).forEach((n2) => {
      N.indexOf(n2) > -1 && function(e3, t3, n3) {
        let s2 = D[e3][t3];
        s2 || (s2 = D[e3][t3] = []), -1 === s2.indexOf(n3) && m(n3) && s2.push(n3);
      }(e2, n2, t2[n2]);
    });
  }
  function q(e2, t2) {
    D[e2] || (D[e2] = {}), g(t2) ? Object.keys(t2).forEach((n2) => {
      N.indexOf(n2) > -1 && function(e3, t3, n3) {
        const s2 = D[e3][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e2, n2, t2[n2]);
    }) : delete D[e2];
  }
  function K(e2, t2) {
    return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function F(e2, t2) {
    return D[e2] && D[e2][t2] || [];
  }
  function j(e2) {
    M("callObject", e2);
  }
  const $ = R("_globalUniCloudListener"), B = "response", W = "needLogin", H = "refreshToken", J = "clientdb", z = "cloudfunction", V = "cloudobject";
  function G(e2) {
    return $[e2] || ($[e2] = []), $[e2];
  }
  function Y(e2, t2) {
    const n2 = G(e2);
    n2.includes(t2) || n2.push(t2);
  }
  function Q(e2, t2) {
    const n2 = G(e2), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function X(e2, t2) {
    const n2 = G(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      (0, n2[e3])(t2);
    }
  }
  let Z, ee = false;
  function te() {
    return Z || (Z = new Promise((e2) => {
      ee && e2(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (ee = true, e2());
        }
        ee || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), Z);
  }
  function ne(e2) {
    const t2 = {};
    for (const n2 in e2) {
      const s2 = e2[n2];
      m(s2) && (t2[n2] = y(s2));
    }
    return t2;
  }
  class se extends Error {
    constructor(e2) {
      super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
    }
    toJson(e2 = 0) {
      if (!(e2 >= 10))
        return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
    }
  }
  var re = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
  function ie(e2) {
    return e2 && ie(e2.__v_raw) || e2;
  }
  function oe() {
    return { token: re.getStorageSync("uni_id_token") || re.getStorageSync("uniIdToken"), tokenExpired: re.getStorageSync("uni_id_token_expired") };
  }
  function ae({ token: e2, tokenExpired: t2 } = {}) {
    e2 && re.setStorageSync("uni_id_token", e2), t2 && re.setStorageSync("uni_id_token_expired", t2);
  }
  let ce, ue;
  function he() {
    return ce || (ce = uni.getSystemInfoSync()), ce;
  }
  function le() {
    let e2, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e2 = s2, t2 = n2;
      }
    } catch (e3) {
    }
    return { channel: e2, scene: t2 };
  }
  let de = {};
  function pe() {
    const e2 = uni.getLocale && uni.getLocale() || "en";
    if (ue)
      return { ...de, ...ue, locale: e2, LOCALE: e2 };
    const t2 = he(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
    for (const e3 in t2)
      Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
    return ue = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...le(), ...t2 }, { ...de, ...ue, locale: e2, LOCALE: e2 };
  }
  var fe = { sign: function(e2, t2) {
    let n2 = "";
    return Object.keys(e2).sort().forEach(function(t3) {
      e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
    }), n2 = n2.slice(1), i(n2, t2).toString();
  }, wrappedRequest: function(e2, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e2, { complete(e3) {
        e3 || (e3 = {});
        const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
        if (!e3.statusCode || e3.statusCode >= 400) {
          const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
          return s2(new se({ code: n3, message: r3, requestId: t3 }));
        }
        const r2 = e3.data;
        if (r2.error)
          return s2(new se({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e2) {
    return a.stringify(o.parse(e2));
  } };
  var ge = class {
    constructor(e2) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error("".concat(t2, " required"));
      }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = re, this._getAccessTokenPromiseHub = new v({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
        if (!e3.result || !e3.result.accessToken)
          throw new se({ code: "AUTH_FAILED", message: "获取accessToken失败" });
        this.setAccessToken(e3.result.accessToken);
      }), retryRule: w });
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e2) {
      this.accessToken = e2;
    }
    requestWrapped(e2) {
      return fe.wrappedRequest(e2, this.adapter.request);
    }
    requestAuth(e2) {
      return this.requestWrapped(e2);
    }
    request(e2, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e2);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e2);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e2) {
      const t2 = Object.assign({}, e2);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = fe.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e2, t2) {
      const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = fe.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      return this._getAccessTokenPromiseHub.exec();
    }
    async authorize() {
      await this.getAccessToken();
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
    }
    getOSSUploadOptionsFromPath(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
          e3 && e3.statusCode < 400 ? o2(e3) : a2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          a2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
      if ("string" !== f(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const o2 = i2 && i2.envType || this.config.envType;
      if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
        throw new se({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
      const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: g2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: g2, key: p2, policy: m2, success_action_status: 200 };
      if (u2 && (_2["x-oss-security-token"] = u2), y2) {
        const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: g2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        _2.callback = fe.toBase64(e3);
      }
      const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
        return { success: true, filePath: e2, fileID: c2 };
      if ((await this.reportOSSUpload({ id: g2 })).success)
        return { success: true, filePath: e2, fileID: c2 };
      throw new se({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e2 } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e2) && 0 !== e2.length || n2(new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
      });
    }
    async getFileInfo({ fileList: e2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var me = { init(e2) {
    const t2 = new ge(e2), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var _e;
  !function(e2) {
    e2.local = "local", e2.none = "none", e2.session = "session";
  }(_e || (_e = {}));
  var we = function() {
  }, ve = n(function(e2, t2) {
    var n2;
    e2.exports = (n2 = r, function(e3) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
      !function() {
        function t4(t5) {
          for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
            if (!(t5 % s4))
              return false;
          return true;
        }
        function n3(e4) {
          return 4294967296 * (e4 - (0 | e4)) | 0;
        }
        for (var s3 = 2, r3 = 0; r3 < 64; )
          t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
      }();
      var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
        this._hash = new r2.init(a2.slice(0));
      }, _doProcessBlock: function(e4, t4) {
        for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
          if (p2 < 16)
            u2[p2] = 0 | e4[t4 + p2];
          else {
            var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
            u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
          }
          var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
          d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
        }
        n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
      }, clone: function() {
        var e4 = i2.clone.call(this);
        return e4._hash = this._hash.clone(), e4;
      } });
      t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
    }(Math), n2.SHA256);
  }), Ie = ve, Se = n(function(e2, t2) {
    e2.exports = r.HmacSHA256;
  });
  const be = () => {
    let e2;
    if (!Promise) {
      e2 = () => {
      }, e2.promise = {};
      const t3 = () => {
        throw new se({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
    }
    const t2 = new Promise((t3, n2) => {
      e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
    });
    return e2.promise = t2, e2;
  };
  function ke(e2) {
    return void 0 === e2;
  }
  function Te(e2) {
    return "[object Null]" === Object.prototype.toString.call(e2);
  }
  function Ae(e2 = "") {
    return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
  }
  function Pe(e2 = 32) {
    const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n2 = t2.length;
    let s2 = "";
    for (let r2 = 0; r2 < e2; r2++)
      s2 += t2.charAt(Math.floor(Math.random() * n2));
    return s2;
  }
  var Ce;
  function xe(e2) {
    const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
    var n2;
    for (const e3 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e2) {
    e2.WEB = "web", e2.WX_MP = "wx_mp";
  }(Ce || (Ce = {}));
  const Oe = { adapter: null, runtime: void 0 }, Ee = ["anonymousUuidKey"];
  class Le extends we {
    constructor() {
      super(), Oe.adapter.root.tcbObject || (Oe.adapter.root.tcbObject = {});
    }
    setItem(e2, t2) {
      Oe.adapter.root.tcbObject[e2] = t2;
    }
    getItem(e2) {
      return Oe.adapter.root.tcbObject[e2];
    }
    removeItem(e2) {
      delete Oe.adapter.root.tcbObject[e2];
    }
    clear() {
      delete Oe.adapter.root.tcbObject;
    }
  }
  function Re(e2, t2) {
    switch (e2) {
      case "local":
        return t2.localStorage || new Le();
      case "none":
        return new Le();
      default:
        return t2.sessionStorage || new Le();
    }
  }
  class Ue {
    constructor(e2) {
      if (!this._storage) {
        this._persistence = Oe.adapter.primaryStorage || e2.persistence, this._storage = Re(this._persistence, Oe.adapter);
        const t2 = "access_token_".concat(e2.env), n2 = "access_token_expire_".concat(e2.env), s2 = "refresh_token_".concat(e2.env), r2 = "anonymous_uuid_".concat(e2.env), i2 = "login_type_".concat(e2.env), o2 = "device_id", a2 = "token_type_".concat(e2.env), c2 = "user_info_".concat(e2.env);
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
      }
    }
    updatePersistence(e2) {
      if (e2 === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e2;
      const n2 = Re(e2, Oe.adapter);
      for (const e3 in this.keys) {
        const s2 = this.keys[e3];
        if (t2 && Ee.includes(e3))
          continue;
        const r2 = this._storage.getItem(s2);
        ke(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e2, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e2, r2);
      } catch (e3) {
        throw e3;
      }
    }
    getStore(e2, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e3) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e2);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e2) {
      this._storage.removeItem(e2);
    }
  }
  const Ne = {}, De = {};
  function Me(e2) {
    return Ne[e2];
  }
  class qe {
    constructor(e2, t2) {
      this.data = t2 || null, this.name = e2;
    }
  }
  class Ke extends qe {
    constructor(e2, t2) {
      super("error", { error: e2, data: t2 }), this.error = e2;
    }
  }
  const Fe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e2, t2) {
      return function(e3, t3, n2) {
        n2[e3] = n2[e3] || [], n2[e3].push(t3);
      }(e2, t2, this._listeners), this;
    }
    off(e2, t2) {
      return function(e3, t3, n2) {
        if (n2 && n2[e3]) {
          const s2 = n2[e3].indexOf(t3);
          -1 !== s2 && n2[e3].splice(s2, 1);
        }
      }(e2, t2, this._listeners), this;
    }
    fire(e2, t2) {
      if (e2 instanceof Ke)
        return console.error(e2.error), this;
      const n2 = "string" == typeof e2 ? new qe(e2, t2 || {}) : e2;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e3)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e2) {
      return this._listeners[e2] && this._listeners[e2].length > 0;
    }
  }();
  function je(e2, t2) {
    Fe.on(e2, t2);
  }
  function $e(e2, t2 = {}) {
    Fe.fire(e2, t2);
  }
  function Be(e2, t2) {
    Fe.off(e2, t2);
  }
  const We = "loginStateChanged", He = "loginStateExpire", Je = "loginTypeChanged", ze = "anonymousConverted", Ve = "refreshAccessToken";
  var Ge;
  !function(e2) {
    e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
  }(Ge || (Ge = {}));
  class Ye {
    constructor() {
      this._fnPromiseMap = /* @__PURE__ */ new Map();
    }
    async run(e2, t2) {
      let n2 = this._fnPromiseMap.get(e2);
      return n2 || (n2 = new Promise(async (n3, s2) => {
        try {
          await this._runIdlePromise();
          const s3 = t2();
          n3(await s3);
        } catch (e3) {
          s2(e3);
        } finally {
          this._fnPromiseMap.delete(e2);
        }
      }), this._fnPromiseMap.set(e2, n2)), n2;
    }
    _runIdlePromise() {
      return Promise.resolve();
    }
  }
  class Qe {
    constructor(e2) {
      this._singlePromise = new Ye(), this._cache = Me(e2.env), this._baseURL = "https://".concat(e2.env, ".ap-shanghai.tcb-api.tencentcloudapi.com"), this._reqClass = new Oe.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: "请求在".concat(e2.timeout / 1e3, "s内未完成，已中断"), restrictedMethods: ["post"] });
    }
    _getDeviceId() {
      if (this._deviceID)
        return this._deviceID;
      const { deviceIdKey: e2 } = this._cache.keys;
      let t2 = this._cache.getStore(e2);
      return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Pe(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
    }
    async _request(e2, t2, n2 = {}) {
      const s2 = { "x-request-id": Pe(), "x-device-id": this._getDeviceId() };
      if (n2.withAccessToken) {
        const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
        s2.authorization = "".concat(n3, " ").concat(t3);
      }
      return this._reqClass["get" === n2.method ? "get" : "post"]({ url: "".concat(this._baseURL).concat(e2), data: t2, headers: s2 });
    }
    async _fetchAccessToken() {
      const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
      if (r2 && r2 !== Ge.ANONYMOUS)
        throw new se({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
      const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
      return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
    }
    isAccessTokenExpired(e2, t2) {
      let n2 = true;
      return e2 && t2 && (n2 = t2 < Date.now()), n2;
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
    }
    async refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, Ge.ANONYMOUS), this.getAccessToken();
    }
    async getUserInfo() {
      return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
    }
  }
  const Xe = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ze = { "X-SDK-Version": "1.3.5" };
  function et(e2, t2, n2) {
    const s2 = e2[t2];
    e2[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e2, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e3;
        if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
          t3.data = { ...o2, ...r2 };
        else
          for (const e4 in r2)
            o2.append(e4, r2[e4]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
    };
  }
  function tt() {
    const e2 = Math.random().toString(16).slice(2);
    return { data: { seqId: e2 }, headers: { ...Ze, "x-seqid": e2 } };
  }
  class nt {
    constructor(e2 = {}) {
      var t2;
      this.config = e2, this._reqClass = new Oe.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "请求在".concat(this.config.timeout / 1e3, "s内未完成，已中断"), restrictedMethods: ["post"] }), this._cache = Me(this.config.env), this._localCache = (t2 = this.config.env, De[t2]), this.oauth = new Qe(this.config), et(this._reqClass, "post", [tt]), et(this._reqClass, "upload", [tt]), et(this._reqClass, "download", [tt]);
    }
    async post(e2) {
      return await this._reqClass.post(e2);
    }
    async upload(e2) {
      return await this._reqClass.upload(e2);
    }
    async download(e2) {
      return await this._reqClass.download(e2);
    }
    async refreshAccessToken() {
      let e2, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e2 = await this._refreshAccessTokenPromise;
      } catch (e3) {
        t2 = e3;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e2;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e2), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new se({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e3 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
          if (this._cache.getStore(s2) === Ge.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
            const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          $e(He), this._cache.removeStore(n2);
        }
        throw new se({ code: a2.data.code, message: "刷新access token失败：".concat(a2.data.code) });
      }
      if (a2.data.access_token)
        return $e(Ve), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new se({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e2, t2, n2) {
      const s2 = "x-tcb-trace_".concat(this.config.env);
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      let o2;
      if (-1 === Xe.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
        o2 = new FormData();
        for (let e3 in o2)
          o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e3 in i2)
          void 0 !== i2[e3] && (o2[e3] = i2[e3]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: h2, search: l2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
      let p2 = function(e3, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e4 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += "".concat(e4, "=").concat(encodeURIComponent(n3[e4]));
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : "".concat(e3).concat(t3);
      }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
      l2 && (p2 += l2);
      const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
        throw new se({ code: "NETWORK_ERROR", message: "network request error" });
      return f2;
    }
    async send(e2, t2 = {}, n2 = {}) {
      const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Xe.indexOf(e2)) {
        await this.oauth.refreshAccessToken();
        const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
        if (s3.data.code)
          throw new se({ code: s3.data.code, message: Ae(s3.data.message) });
        return s3.data;
      }
      if (s2.data.code)
        throw new se({ code: s2.data.code, message: Ae(s2.data.message) });
      return s2.data;
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
  }
  const st = {};
  function rt(e2) {
    return st[e2];
  }
  class it {
    constructor(e2) {
      this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env);
    }
    setRefreshToken(e2) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
    }
    setAccessToken(e2, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e2 } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e2), e2;
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2);
    }
  }
  class ot {
    constructor(e2) {
      if (!e2)
        throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e2, this._cache = Me(this._envId), this._request = rt(this._envId), this.setUserInfo();
    }
    linkWithTicket(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e2 });
    }
    linkWithRedirect(e2) {
      e2.signInWithRedirect();
    }
    updatePassword(e2, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
    }
    updateEmail(e2) {
      return this._request.send("auth.updateEmail", { newEmail: e2 });
    }
    updateUsername(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e2 });
    }
    async getLinkedUidList() {
      const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e2;
      return n2.forEach((e3) => {
        e3.wxOpenId && e3.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e2) {
      return this._request.send("auth.setPrimaryUid", { uid: e2 });
    }
    unlink(e2) {
      return this._request.send("auth.unlink", { platform: e2 });
    }
    async update(e2) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const e2 = await this._request.oauth.getUserInfo();
      return this.setLocalUserInfo(e2), e2;
    }
    setUserInfo() {
      const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
        this[e3] = t2[e3];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e2) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e2), this.setUserInfo();
    }
  }
  class at {
    constructor(e2) {
      if (!e2)
        throw new se({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Me(e2);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new ot(e2);
    }
    get isAnonymousAuth() {
      return this.loginType === Ge.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === Ge.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === Ge.WECHAT || this.loginType === Ge.WECHAT_OPEN || this.loginType === Ge.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class ct extends it {
    async signIn() {
      this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.ANONYMOUS, persistence: "local" });
      const e2 = new at(this.config.env);
      return await e2.user.refresh(), e2;
    }
    async linkAndRetrieveDataWithTicket(e2) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), $e(ze, { env: this.config.env }), $e(Je, { loginType: Ge.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new se({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e2) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Ge.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class ut extends it {
    async signIn(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new at(this.config.env);
      throw new se({ message: "自定义登录失败" });
    }
  }
  class ht extends it {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.EMAIL, persistence: this.config.persistence }), new at(this.config.env);
      throw s2.code ? new se({ code: s2.code, message: "邮箱登录失败: ".concat(s2.message) }) : new se({ message: "邮箱登录失败" });
    }
    async activate(e2) {
      return this._request.send("auth.activateEndUserMail", { token: e2 });
    }
    async resetPasswordWithToken(e2, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
    }
  }
  class lt extends it {
    async signIn(e2, t2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Ge.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), $e(We), $e(Je, { env: this.config.env, loginType: Ge.USERNAME, persistence: this.config.persistence }), new at(this.config.env);
      throw s2.code ? new se({ code: s2.code, message: "用户名密码登录失败: ".concat(s2.message) }) : new se({ message: "用户名密码登录失败" });
    }
  }
  class dt {
    constructor(e2) {
      this.config = e2, this._cache = Me(e2.env), this._request = rt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), je(Je, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e2 = this.hasLoginState();
      return e2 && e2.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new ct(this.config);
    }
    customAuthProvider() {
      return new ut(this.config);
    }
    emailAuthProvider() {
      return new ht(this.config);
    }
    usernameAuthProvider() {
      return new lt(this.config);
    }
    async signInAnonymously() {
      return new ct(this.config).signIn();
    }
    async signInWithEmailAndPassword(e2, t2) {
      return new ht(this.config).signIn(e2, t2);
    }
    signInWithUsernameAndPassword(e2, t2) {
      return new lt(this.config).signIn(e2, t2);
    }
    async linkAndRetrieveDataWithTicket(e2) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new ct(this.config)), je(ze, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
    }
    async signOut() {
      if (this.loginType === Ge.ANONYMOUS)
        throw new se({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), $e(We), $e(Je, { env: this.config.env, loginType: Ge.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e2, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
    }
    async sendPasswordResetEmail(e2) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
    }
    onLoginStateChanged(e2) {
      je(We, () => {
        const t3 = this.hasLoginState();
        e2.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    }
    onLoginStateExpired(e2) {
      je(He, e2.bind(this));
    }
    onAccessTokenRefreshed(e2) {
      je(Ve, e2.bind(this));
    }
    onAnonymousConverted(e2) {
      je(ze, e2.bind(this));
    }
    onLoginTypeChanged(e2) {
      je(Je, () => {
        const t2 = this.hasLoginState();
        e2.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
      return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new at(this.config.env);
    }
    async isUsernameRegistered(e2) {
      if ("string" != typeof e2)
        throw new se({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e2) {
      return new ut(this.config).signIn(e2);
    }
    shouldRefreshAccessToken(e2) {
      this._request._shouldRefreshAccessTokenHook = e2.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e2) {
      const { env: t2 } = e2.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e2) {
      const { loginType: t2, persistence: n2, env: s2 } = e2.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const pt = function(e2, t2) {
    t2 = t2 || be();
    const n2 = rt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
        201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new se({ code: "STORAGE_REQUEST_FAIL", message: "STORAGE_REQUEST_FAIL: ".concat(e4.data) }));
      }).catch((e4) => {
        t2(e4);
      });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, ft = function(e2, t2) {
    t2 = t2 || be();
    const n2 = rt(this.config.env), { cloudPath: s2 } = e2;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
      t2(null, e3);
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, gt = function({ fileList: e2 }, t2) {
    if (t2 = t2 || be(), !e2 || !Array.isArray(e2))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e2)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e2 };
    return rt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, mt = function({ fileList: e2 }, t2) {
    t2 = t2 || be(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e2)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return rt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
      e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
    }).catch((e3) => {
      t2(e3);
    }), t2.promise;
  }, yt = async function({ fileID: e2 }, t2) {
    const n2 = (await mt.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e3) => {
        e3(n2);
      });
    const s2 = rt(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, _t = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
    const a2 = o2 || be();
    let c2;
    try {
      c2 = t2 ? JSON.stringify(t2) : "";
    } catch (e3) {
      return Promise.reject(e3);
    }
    if (!e2)
      return Promise.reject(new se({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
    return rt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
      if (e3.code)
        a2(null, e3);
      else {
        let t3 = e3.data.response_data;
        if (s2)
          a2(null, { result: t3, requestId: e3.requestId });
        else
          try {
            t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
          } catch (e4) {
            a2(new se({ message: "response data must be json" }));
          }
      }
      return a2.promise;
    }).catch((e3) => {
      a2(e3);
    }), a2.promise;
  }, wt = { timeout: 15e3, persistence: "session" }, vt = {};
  class It {
    constructor(e2) {
      this.config = e2 || this.config, this.authObj = void 0;
    }
    init(e2) {
      switch (Oe.adapter || (this.requestClient = new Oe.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: "请求在".concat((e2.timeout || 5e3) / 1e3, "s内未完成，已中断") })), this.config = { ...wt, ...e2 }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new It(this.config);
    }
    auth({ persistence: e2 } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e2 || Oe.adapter.primaryStorage || wt.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
        const { env: t3 } = e3;
        Ne[t3] = new Ue(e3), De[t3] = new Ue({ ...e3, persistence: "local" });
      }(this.config), n2 = this.config, st[n2.env] = new nt(n2), this.authObj = new dt(this.config), this.authObj;
    }
    on(e2, t2) {
      return je.apply(this, [e2, t2]);
    }
    off(e2, t2) {
      return Be.apply(this, [e2, t2]);
    }
    callFunction(e2, t2) {
      return _t.apply(this, [e2, t2]);
    }
    deleteFile(e2, t2) {
      return gt.apply(this, [e2, t2]);
    }
    getTempFileURL(e2, t2) {
      return mt.apply(this, [e2, t2]);
    }
    downloadFile(e2, t2) {
      return yt.apply(this, [e2, t2]);
    }
    uploadFile(e2, t2) {
      return pt.apply(this, [e2, t2]);
    }
    getUploadMetadata(e2, t2) {
      return ft.apply(this, [e2, t2]);
    }
    registerExtension(e2) {
      vt[e2.name] = e2;
    }
    async invokeExtension(e2, t2) {
      const n2 = vt[e2];
      if (!n2)
        throw new se({ message: "扩展".concat(e2, " 必须先注册") });
      return await n2.invoke(t2, this);
    }
    useAdapters(e2) {
      const { adapter: t2, runtime: n2 } = xe(e2) || {};
      t2 && (Oe.adapter = t2), n2 && (Oe.runtime = n2);
    }
  }
  var St = new It();
  function bt(e2, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
  }
  class kt {
    get(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        re.request({ url: bt("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    post(e2) {
      const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
      return new Promise((e3, i2) => {
        re.request({ url: bt("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
          e3(t3);
        }, fail(e4) {
          i2(e4);
        } });
      });
    }
    upload(e2) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = re.uploadFile({ url: bt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
          const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
          200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e3) {
          n2(new Error(e3.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const Tt = { setItem(e2, t2) {
    re.setStorageSync(e2, t2);
  }, getItem: (e2) => re.getStorageSync(e2), removeItem(e2) {
    re.removeStorageSync(e2);
  }, clear() {
    re.clearStorageSync();
  } };
  var At = { genAdapter: function() {
    return { root: {}, reqClass: kt, localStorage: Tt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  St.useAdapters(At);
  const Pt = St, Ct = Pt.init;
  Pt.init = function(e2) {
    e2.env = e2.spaceId;
    const t2 = Ct.call(this, e2);
    t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e3) {
      const t3 = n2.call(this, e3);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
        var n3;
        t3[e4] = (n3 = t3[e4], function(e5) {
          e5 = e5 || {};
          const { success: t4, fail: s2, complete: r2 } = ne(e5);
          if (!(t4 || s2 || r2))
            return n3.call(this, e5);
          n3.call(this, e5).then((e6) => {
            t4 && t4(e6), r2 && r2(e6);
          }, (e6) => {
            s2 && s2(e6), r2 && r2(e6);
          });
        }).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var xt = Pt;
  async function Ot(e2, t2) {
    const n2 = "http://".concat(e2, ":").concat(t2, "/system/ping");
    try {
      const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
        re.request({ ...s2, success(t4) {
          e4(t4);
        }, fail(e5) {
          t3(e5);
        } });
      }));
      return !(!e3.data || 0 !== e3.data.code);
    } catch (e3) {
      return false;
    }
    var s2;
  }
  async function Et(e2, t2) {
    let n2;
    for (let s2 = 0; s2 < e2.length; s2++) {
      const r2 = e2[s2];
      if (await Ot(r2, t2)) {
        n2 = r2;
        break;
      }
    }
    return { address: n2, port: t2 };
  }
  const Lt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
  var Rt = class {
    constructor(e2) {
      if (["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error("".concat(t2, " required"));
      }), !e2.endpoint)
        throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
      this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = re;
    }
    async request(e2, t2 = true) {
      const n2 = t2;
      return e2 = n2 ? await this.setupLocalRequest(e2) : this.setupRequest(e2), Promise.resolve().then(() => n2 ? this.requestLocal(e2) : fe.wrappedRequest(e2, this.adapter.request));
    }
    requestLocal(e2) {
      return new Promise((t2, n2) => {
        this.adapter.request(Object.assign(e2, { complete(e3) {
          if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
            const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
            return n2(new se({ code: t3, message: s2 }));
          }
          t2({ success: true, result: e3.data });
        } }));
      });
    }
    setupRequest(e2) {
      const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
      n2["x-serverless-sign"] = fe.sign(t2, this.config.clientSecret);
      const s2 = pe();
      n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
      const { token: r2 } = oe();
      return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
    }
    async setupLocalRequest(e2) {
      const t2 = pe(), { token: n2 } = oe(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Et(r2, i2);
      return { url: "http://".concat(o2, ":").concat(i2, "/").concat(Lt[e2.method]), method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
    }
    callFunction(e2) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
      return this.request(t2, false);
    }
    getUploadFileOptions(e2) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    reportUploadFile(e2) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
      return this.request(t2);
    }
    uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new se({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
          const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
            e3 && e3.statusCode < 400 ? t4(e3) : r3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
          }, fail(e3) {
            r3(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
          } });
          "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
            s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
          });
        });
      }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e2 }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
      return this.request(t2).then((e3) => {
        if (e3.success)
          return e3.result;
        throw new se({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
      if (!Array.isArray(e2) || 0 === e2.length)
        throw new se({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
      return this.request(n2).then((e3) => {
        if (e3.success)
          return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
        throw new se({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var Ut = { init(e2) {
    const t2 = new Rt(e2), n2 = { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } }, Nt = n(function(e2, t2) {
    e2.exports = r.enc.Hex;
  });
  function Dt() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
      var t2 = 16 * Math.random() | 0;
      return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
    });
  }
  function Mt(e2 = "", t2 = {}) {
    const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Dt(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
      const t3 = e3.signedHeaders.join(";"), n3 = e3.signedHeaders.map((t4) => "".concat(t4.toLowerCase(), ":").concat(e3.headers[t4], "\n")).join(""), s3 = Ie(e3.body).toString(Nt), r3 = "".concat(e3.method.toUpperCase(), "\n").concat(e3.path, "\n").concat(e3.query, "\n").concat(n3, "\n").concat(t3, "\n").concat(s3, "\n"), i3 = Ie(r3).toString(Nt), o3 = "HMAC-SHA256\n".concat(e3.timestamp, "\n").concat(i3, "\n"), a3 = Se(o3, e3.secretKey).toString(Nt);
      return "HMAC-SHA256 Credential=".concat(e3.secretId, ", SignedHeaders=").concat(t3, ", Signature=").concat(a3);
    }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
    return { url: "".concat(a2.endpoint).concat(e2), headers: Object.assign({}, h2, { Authorization: f2 }) };
  }
  function qt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
    return new Promise((i2, o2) => {
      re.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
        const t3 = s2["x-trace-id"] || "";
        if (!e3.statusCode || e3.statusCode >= 400) {
          const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
          return o2(new se({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
        }
        i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
      } });
    });
  }
  function Kt(e2, t2) {
    const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Mt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
    return qt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
      const t3 = e3.data || {};
      if (!t3.success)
        throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
      return t3.data || {};
    }).catch((e3) => {
      throw new se({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    });
  }
  function Ft(e2 = "") {
    const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
    if (n2 <= 0)
      throw new se({ code: "INVALID_PARAM", message: "fileID不合法" });
    const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
    return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
  }
  function jt(e2 = "") {
    return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
  }
  class $t {
    constructor(e2) {
      this.config = e2;
    }
    signedURL(e2, t2 = {}) {
      const n2 = "/ws/function/".concat(e2), s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Dt(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
        return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
      }).filter(Boolean).join("&"), "host:".concat(s2)].join("\n"), o2 = ["HMAC-SHA256", Ie(i2).toString(Nt)].join("\n"), a2 = Se(o2, this.config.secretKey).toString(Nt), c2 = Object.keys(r2).map((e3) => "".concat(e3, "=").concat(encodeURIComponent(r2[e3]))).join("&");
      return "".concat(this.config.wsEndpoint).concat(n2, "?").concat(c2, "&signature=").concat(a2);
    }
  }
  var Bt = class {
    constructor(e2) {
      if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e2, t2))
          throw new Error("".concat(t2, " required"));
      }), e2.endpoint) {
        if ("string" != typeof e2.endpoint)
          throw new Error("endpoint must be string");
        if (!/^https:\/\//.test(e2.endpoint))
          throw new Error("endpoint must start with https://");
        e2.endpoint = e2.endpoint.replace(/\/$/, "");
      }
      this.config = Object.assign({}, e2, { endpoint: e2.endpoint || "https://".concat(e2.spaceId, ".api-hz.cloudbasefunction.cn"), wsEndpoint: e2.wsEndpoint || "wss://".concat(e2.spaceId, ".api-hz.cloudbasefunction.cn") }), this._websocket = new $t(this.config);
    }
    callFunction(e2) {
      return function(e3, t2) {
        const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
        r2 && (a2["x-function-invoke-type"] = "async");
        const { url: c2, headers: u2 } = Mt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
        return qt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
          let t3 = 0;
          if (r2) {
            const n3 = e4.data || {};
            t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
          }
          if (0 !== t3)
            throw new se({ code: t3, message: e4.errMsg, requestId: e4.requestId });
          return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
        }).catch((e4) => {
          throw new se({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
        });
      }(e2, this.config);
    }
    uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
      return new Promise((i2, o2) => {
        const a2 = re.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
          e3 && e3.statusCode < 400 ? i2(e3) : o2(new se({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          o2(new se({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
          r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }
    async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
      if ("string" !== f(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new se({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const r2 = await Kt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
      return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
    }
    async getTempFileURL({ fileList: e2 }) {
      return new Promise((t2, n2) => {
        (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
        const s2 = [];
        for (const n3 of e2) {
          let e3;
          "string" !== f(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
          try {
            e3 = Ft.call(this, n3);
          } catch (t3) {
            console.warn(t3.errCode, t3.errMsg), e3 = n3;
          }
          s2.push({ file_id: e3, expire: 600 });
        }
        Kt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
          const { file_list: n3 = [] } = e3;
          t2({ fileList: n3.map((e4) => ({ fileID: jt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
        }).catch((e3) => n2(e3));
      });
    }
    async connectWebSocket(e2) {
      const { name: t2, query: n2 } = e2;
      return re.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
      } });
    }
  };
  var Wt = { init: (e2) => {
    e2.provider = "alipay";
    const t2 = new Bt(e2);
    return t2.auth = function() {
      return { signInAnonymously: function() {
        return Promise.resolve();
      }, getLoginState: function() {
        return Promise.resolve(true);
      } };
    }, t2;
  } };
  function Ht({ data: e2 }) {
    let t2;
    t2 = pe();
    const n2 = JSON.parse(JSON.stringify(e2 || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e3 } = oe();
      e3 && (n2.uniIdToken = e3);
    }
    return n2;
  }
  async function Jt(e2 = {}) {
    await this.__dev__.initLocalNetwork();
    const { localAddress: t2, localPort: n2 } = this.__dev__, s2 = { aliyun: "aliyun", tencent: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], r2 = this.config.spaceId, i2 = "http://".concat(t2, ":").concat(n2, "/system/check-function"), o2 = "http://".concat(t2, ":").concat(n2, "/cloudfunctions/").concat(e2.name);
    return new Promise((t3, n3) => {
      re.request({ method: "POST", url: i2, data: { name: e2.name, platform: A, provider: s2, spaceId: r2 }, timeout: 3e3, success(e3) {
        t3(e3);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e3 } = {}) => {
      const { code: t3, message: n3 } = e3 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: t3, message: n3 }) => {
      if (0 !== t3) {
        switch (t3) {
          case "MODULE_ENCRYPTED":
            console.error("此云函数（".concat(e2.name, "）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数"));
            break;
          case "FUNCTION_ENCRYPTED":
            console.error("此云函数（".concat(e2.name, "）已加密不可本地调试，自动切换为云端已部署的云函数"));
            break;
          case "ACTION_ENCRYPTED":
            console.error(n3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR":
            console.error(n3 || "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");
            break;
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e3 = "检测本地调试服务出现错误：".concat(n3, "，请检查网络环境或重启客户端再试");
            throw console.error(e3), new Error(e3);
          }
        }
        return this._callCloudFunction(e2);
      }
      return new Promise((t4, n4) => {
        const r3 = Ht.call(this, { data: e2.data });
        re.request({ method: "POST", url: o2, data: { provider: s2, platform: A, param: r3 }, timeout: e2.timeout, success: ({ statusCode: e3, data: s3 } = {}) => !e3 || e3 >= 400 ? n4(new se({ code: s3.code || "SYS_ERR", message: s3.message || "request:fail" })) : t4({ result: s3 }), fail(e3) {
          n4(new se({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const zt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var Vt = /[\\^$.*+?()[\]{}|]/g, Gt = RegExp(Vt.source);
  function Yt(e2, t2, n2) {
    return e2.replace(new RegExp((s2 = t2) && Gt.test(s2) ? s2.replace(Vt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Xt = "request", Zt = "response", en = "both";
  const Mn = { code: 2e4, message: "System error" }, qn = { code: 20101, message: "Invalid client" };
  function jn(e2) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
    return new se({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || Mn.code, message: r2 || o2, cause: a2 });
  }
  let Bn;
  function Vn({ secretType: e2 } = {}) {
    return e2 === Xt || e2 === Zt || e2 === en;
  }
  function Gn({ name: e2, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function Yn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = he();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e3, spaceId: t3 } = {}) {
      const n3 = T;
      if (!n3)
        return {};
      e3 = /* @__PURE__ */ function(e4) {
        return "tencent" === e4 ? "tcb" : e4;
      }(e3);
      const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e2, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const h2 = function(e3, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e3.length; i3++) {
        const o3 = e3[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!h2)
      return false;
    if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error("此应用[appId: ".concat(s2, ", platform: ").concat(o2, "]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client")), jn(qn);
  }
  function Qn({ functionName: e2, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
      console.log("[".concat(n2, "-request]").concat(s2, "[/").concat(n2, "-request]"));
    }
  }
  function Xn(e2) {
    const t2 = e2.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = Ht.call(e2, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Vn(n3), o2 = Gn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Qn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e5 = 1; e5 < a3.length; e5++)
            c2 = Yt(c2, "{$".concat(e5, "}"), a3[e5]);
          for (const e5 in t3)
            c2 = Yt(c2, "{".concat(e5, "}"), t3[e5]);
          return "replace" === o3 ? c2 : e4 + c2;
        }
        return e4;
      }({ message: "[".concat(n3.name, "]: ").concat(e3.message), formatter: zt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
    };
    e2.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && C ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Jt), o2 = Jt) : o2 = n2, o2 = o2.bind(e2), Gn(t3))
        a2 = n2.call(e2, t3);
      else if (Vn(t3)) {
        a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
      } else if (Yn({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new Bn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && "undefined" != typeof UTS && (e3.result = UTS.JSON.parse(JSON.stringify(e3.result))), e3));
    };
  }
  Bn = class {
    constructor() {
      throw jn({ message: "Platform ".concat(A, " is not enabled, please check whether secure network module is enabled in your manifest.json") });
    }
  };
  const Zn = Symbol("CLIENT_DB_INTERNAL");
  function es(e2, t2) {
    return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Zn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e3[n2];
      if (n2 in e3 || "string" != typeof n2) {
        const t3 = e3[n2];
        return "function" == typeof t3 ? t3.bind(e3) : t3;
      }
      return t2.get(e3, n2, s2);
    } });
  }
  function ts(e2) {
    return { on: (t2, n2) => {
      e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
    }, off: (t2, n2) => {
      e2[t2] = e2[t2] || [];
      const s2 = e2[t2].indexOf(n2);
      -1 !== s2 && e2[t2].splice(s2, 1);
    } };
  }
  const ns = ["db.Geo", "db.command", "command.aggregate"];
  function ss(e2, t2) {
    return ns.indexOf("".concat(e2, ".").concat(t2)) > -1;
  }
  function rs(e2) {
    switch (f(e2 = ie(e2))) {
      case "array":
        return e2.map((e3) => rs(e3));
      case "object":
        return e2._internalType === Zn || Object.keys(e2).forEach((t2) => {
          e2[t2] = rs(e2[t2]);
        }), e2;
      case "regexp":
        return { $regexp: { source: e2.source, flags: e2.flags } };
      case "date":
        return { $date: e2.toISOString() };
      default:
        return e2;
    }
  }
  function is(e2) {
    return e2 && e2.content && e2.content.$method;
  }
  class os {
    constructor(e2, t2, n2) {
      this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e2 = this;
      const t2 = [e2.content];
      for (; e2.prevStage; )
        e2 = e2.prevStage, t2.push(e2.content);
      return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: rs(e3.$param) })) };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
    getAction() {
      const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
      return e2 && e2.$param && e2.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
    }
    get isAggregate() {
      let e2 = this;
      for (; e2; ) {
        const t2 = is(e2), n2 = is(e2.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e2 = this;
      for (; e2; ) {
        if ("command" === is(e2))
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e2 = this;
      for (; e2; ) {
        const t2 = is(e2), n2 = is(e2.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e2 = e2.prevStage;
      }
      return false;
    }
    getNextStageFn(e2) {
      const t2 = this;
      return function() {
        return as({ $method: e2, $param: rs(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e2, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e2, $param: rs(t2) }), S) {
        const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
        t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function as(e2, t2, n2) {
    return es(new os(e2, t2, n2), { get(e3, t3) {
      let s2 = "db";
      return e3 && e3.content && (s2 = e3.content.$method), ss(s2, t3) ? as({ $method: t3 }, e3, n2) : function() {
        return as({ $method: t3, $param: rs(Array.from(arguments)) }, e3, n2);
      };
    } });
  }
  function cs({ path: e2, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
    };
  }
  function us(e2, t2 = {}) {
    return es(new e2(t2), { get: (e3, t3) => ss("db", t3) ? as({ $method: t3 }, null, e3) : function() {
      return as({ $method: t3, $param: rs(Array.from(arguments)) }, null, e3);
    } });
  }
  class hs extends class {
    constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = R("_globalUniCloudDatabaseCallback")), t2 || (this.auth = ts(this._authCallBacks)), this._isJQL = t2, Object.assign(this, ts(this._dbCallBacks)), this.env = es({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = es({}, { get: (e3, t3) => cs({ path: ["Geo"], method: t3 }) }), this.serverDate = cs({ path: [], method: "serverDate" }), this.RegExp = cs({ path: [], method: "RegExp" });
    }
    getCloudEnv(e2) {
      if ("string" != typeof e2 || !e2.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e2.replace("$cloudEnv_", "") };
    }
    _callback(e2, t2) {
      const n2 = this._dbCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    _callbackAuth(e2, t2) {
      const n2 = this._authCallBacks;
      n2[e2] && n2[e2].forEach((e3) => {
        e3(...t2);
      });
    }
    multiSend() {
      const e2 = Array.from(arguments), t2 = e2.map((e3) => {
        const t3 = e3.getAction(), n2 = e3.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
    }
  } {
    _parseResult(e2) {
      return this._isJQL ? e2.result : e2;
    }
    _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e3, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e3) {
        return i2._callback("error", [e3]), K(F(o2, "fail"), e3).then(() => K(F(o2, "complete"), e3)).then(() => (r2(null, e3), X(B, { type: J, content: e3 }), Promise.reject(e3)));
      }
      const c2 = K(F(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
        if (u3)
          for (let e4 = 0; e4 < u3.length; e4++) {
            const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = "".concat(i3, "\n详细信息：").concat(s4)), r3(i3);
          }
        if (t3) {
          return a2(new se({ code: t3, message: n3, requestId: e3.requestId }));
        }
        e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ae({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), X(H, { token: s3, tokenExpired: c3 }));
        const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < h2.length; t4++) {
          const { prop: n4, tips: s4 } = h2[t4];
          if (n4 in e3.result) {
            const t5 = e3.result[n4];
            Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e4) {
          return K(F(o2, "success"), e4).then(() => K(F(o2, "complete"), e4)).then(() => {
            r2(e4, null);
            const t4 = i2._parseResult(e4);
            return X(B, { type: J, content: t4 }), Promise.resolve(t4);
          });
        }(e3);
      }, (e3) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new se({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
      });
    }
  }
  const ls = "token无效，跳转登录页面", ds = "token过期，跳转登录页面", ps = { TOKEN_INVALID_TOKEN_EXPIRED: ds, TOKEN_INVALID_INVALID_CLIENTID: ls, TOKEN_INVALID: ls, TOKEN_INVALID_WRONG_TOKEN: ls, TOKEN_INVALID_ANONYMOUS_USER: ls }, fs = { "uni-id-token-expired": ds, "uni-id-check-token-failed": ls, "uni-id-token-not-exist": ls, "uni-id-check-device-feature-failed": ls };
  function gs(e2, t2) {
    let n2 = "";
    return n2 = e2 ? "".concat(e2, "/").concat(t2) : t2, n2.replace(/^\//, "");
  }
  function ms(e2 = [], t2 = "") {
    const n2 = [], s2 = [];
    return e2.forEach((e3) => {
      true === e3.needLogin ? n2.push(gs(t2, e3.path)) : false === e3.needLogin && s2.push(gs(t2, e3.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function ys(e2) {
    return e2.split("?")[0].replace(/^\//, "");
  }
  function _s() {
    return function(e2) {
      let t2 = e2 && e2.$page && e2.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e2 = getCurrentPages();
      return e2[e2.length - 1];
    }());
  }
  function ws() {
    return ys(_s());
  }
  function vs(e2 = "", t2 = {}) {
    if (!e2)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = ys(e2);
    return n2.some((e3) => e3.pagePath === s2);
  }
  const Is = !!e.uniIdRouter;
  const { loginPage: Ss, routerNeedLogin: bs, resToLogin: ks, needLoginPage: Ts, notNeedLoginPage: As, loginPageInTabBar: Ps } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = ms(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
      const t3 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = ms(r3, s3);
        t3.push(...i3), n3.push(...o3);
      }), { needLoginPage: t3, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: vs(i2, r2) };
  }();
  if (Ts.indexOf(Ss) > -1)
    throw new Error("Login page [".concat(Ss, '] should not be "needLogin", please check your pages.json'));
  function Cs(e2) {
    const t2 = ws();
    if ("/" === e2.charAt(0))
      return e2;
    const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e3 = 0; e3 < r2.length; e3++) {
      const t3 = r2[e3];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function xs(e2) {
    const t2 = ys(Cs(e2));
    return !(As.indexOf(t2) > -1) && (Ts.indexOf(t2) > -1 || bs.some((t3) => function(e3, t4) {
      return new RegExp(t4).test(e3);
    }(e2, t3)));
  }
  function Os({ redirect: e2 }) {
    const t2 = ys(e2), n2 = ys(Ss);
    return ws() !== n2 && t2 !== n2;
  }
  function Es({ api: e2, redirect: t2 } = {}) {
    if (!t2 || !Os({ redirect: t2 }))
      return;
    const n2 = function(e3, t3) {
      return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + "&uniIdRedirectUrl=".concat(encodeURIComponent(t3)) : e3 + "?uniIdRedirectUrl=".concat(encodeURIComponent(t3)) : e3;
    }(Ss, t2);
    Ps ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e2]({ url: n2 });
    }, 0);
  }
  function Ls({ url: e2 } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e3, tokenExpired: t3 } = oe();
      let n3;
      if (e3) {
        if (t3 < Date.now()) {
          const e4 = "uni-id-token-expired";
          n3 = { errCode: e4, errMsg: fs[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        n3 = { errCode: e4, errMsg: fs[e4] };
      }
      return n3;
    }();
    if (xs(e2) && n2) {
      n2.uniIdRedirectUrl = e2;
      if (G(W).length > 0)
        return setTimeout(() => {
          X(W, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function Rs() {
    !function() {
      const e3 = _s(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Ls({ url: e3 });
      t2 || n2 && Es({ api: "redirectTo", redirect: e3 });
    }();
    const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e2.length; t2++) {
      const n2 = e2[t2];
      uni.addInterceptor(n2, { invoke(e3) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Ls({ url: e3.url });
        return t3 ? e3 : s2 ? (Es({ api: n2, redirect: Cs(e3.url) }), false) : e3;
      } });
    }
  }
  function Us() {
    this.onResponse((e2) => {
      const { type: t2, content: n2 } = e2;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in fs;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e3) {
            if ("object" != typeof e3)
              return false;
            const { errCode: t3 } = e3 || {};
            return t3 in ps;
          }(n2);
      }
      s2 && function(e3 = {}) {
        const t3 = G(W);
        te().then(() => {
          const n3 = _s();
          if (n3 && Os({ redirect: n3 }))
            return t3.length > 0 ? X(W, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (Ss && Es({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function Ns(e2) {
    !function(e3) {
      e3.onResponse = function(e4) {
        Y(B, e4);
      }, e3.offResponse = function(e4) {
        Q(B, e4);
      };
    }(e2), function(e3) {
      e3.onNeedLogin = function(e4) {
        Y(W, e4);
      }, e3.offNeedLogin = function(e4) {
        Q(W, e4);
      }, Is && (R("_globalUniCloudStatus").needLoginInit || (R("_globalUniCloudStatus").needLoginInit = true, te().then(() => {
        Rs.call(e3);
      }), ks && Us.call(e3)));
    }(e2), function(e3) {
      e3.onRefreshToken = function(e4) {
        Y(H, e4);
      }, e3.offRefreshToken = function(e4) {
        Q(H, e4);
      };
    }(e2);
  }
  let Ds;
  const Ms = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", qs = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function Ks() {
    const e2 = oe().token || "", t2 = e2.split(".");
    if (!e2 || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ds(s2).split("").map(function(e3) {
        return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e3) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  Ds = "function" != typeof atob ? function(e2) {
    if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !qs.test(e2))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e2 += "==".slice(2 - (3 & e2.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
      t2 = Ms.indexOf(e2.charAt(i2++)) << 18 | Ms.indexOf(e2.charAt(i2++)) << 12 | (n2 = Ms.indexOf(e2.charAt(i2++))) << 6 | (s2 = Ms.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var Fs = n(function(e2, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e3, t3) {
      return e3.tempFiles.forEach((e4, n3) => {
        e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
      }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
    }
    function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e4) => {
        if (s3) {
          const t4 = s3(e4);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
        }
        return e4;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
            const u2 = i3[s5];
            e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
              e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
            } }).then((e5) => {
              u2.url = e5.fileID, s5 < o2 && c2();
            }).catch((e5) => {
              u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
            });
          }
        });
      }(e3, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e3) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e3, function(e4) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
          return new Promise((e5, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e5(r2(t5, "image"));
            }, fail(e6) {
              a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
          return new Promise((e5, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e6) {
              c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e3, function(e4) {
          const { count: t4, extension: n3 } = e4;
          return new Promise((e5, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e5(r2(t5));
            }, fail(e6) {
              i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), js = t(Fs);
  const $s = "manual";
  function Bs(e2) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e3 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e3.push(this[t2]);
        }), e3;
      }, (e3, t2) => {
        if (this.loadtime === $s)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e3.length; r2++)
          e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
        e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e3, t2) {
    }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e4) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2;
      t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const h2 = t2.orderby || this.orderby;
      h2 && (n2 = n2.orderBy(h2));
      const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function Ws(e2) {
    return function(t2, n2 = {}) {
      n2 = function(e3, t3 = {}) {
        return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get(s3, c2) {
        switch (c2) {
          case "toString":
            return "[object UniCloudObject]";
          case "toJSON":
            return {};
        }
        return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
          return async function(...s4) {
            const r3 = n3 ? n3({ params: s4 }) : {};
            let i3, o3;
            try {
              return await K(F(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await K(F(t3, "success"), { ...r3, result: i3 }), i3;
            } catch (e4) {
              throw o3 = e4, await K(F(t3, "fail"), { ...r3, error: o3 }), o3;
            } finally {
              await K(F(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
            }
          };
        }({ fn: async function s4(...h2) {
          let l2;
          a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
          const d2 = { name: t2, type: u, data: { method: c2, params: h2 } };
          "object" == typeof n2.secretMethods && function(e3, t3) {
            const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
            r3 && (t3.secretType = r3);
          }(n2, d2);
          let p2 = false;
          try {
            l2 = await e2.callFunction(d2);
          } catch (e3) {
            p2 = true, l2 = { result: new se(e3) };
          }
          const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = l2.result || {};
          if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ae(y2), X(H, { ...y2 })), g2) {
            let e3 = m2;
            if (p2 && o2) {
              e3 = (await o2({ objectName: t2, methodName: c2, params: h2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
            }
            if (a2)
              if ("toast" === i2.type)
                uni.showToast({ title: e3, icon: "none" });
              else {
                if ("modal" !== i2.type)
                  throw new Error("Invalid errorOptions.type: ".concat(i2.type));
                {
                  const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                    return new Promise((i3, o3) => {
                      uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                        i3(e5);
                      }, fail() {
                        i3({ confirm: false, cancel: true });
                      } });
                    });
                  }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                  if (i2.retry && t3)
                    return s4(...h2);
                }
              }
            const n3 = new se({ subject: f2, code: g2, message: m2, requestId: l2.requestId });
            throw n3.detail = l2.result, X(B, { type: V, content: n3 }), n3;
          }
          return X(B, { type: V, content: l2.result }), l2.result;
        }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
          return { objectName: t2, methodName: c2, params: e3 };
        } });
      } });
    };
  }
  function Hs(e2) {
    return R("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
  }
  async function Js({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
    Hs(this);
    throw new Error("[SecureNetwork] API `initSecureNetworkByWeixin` is not supported on platform `".concat(A, "`"));
  }
  async function zs(e2) {
    const t2 = Hs(this);
    return t2.initPromise || (t2.initPromise = Js.call(this, e2).then((e3) => e3).catch((e3) => {
      throw delete t2.initPromise, e3;
    })), t2.initPromise;
  }
  function Vs(e2) {
    return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
      return zs.call(e2, { openid: t2, callLoginByWeixin: n2 });
    };
  }
  function Gs(e2) {
    !function(e3) {
      de = e3;
    }(e2);
  }
  function Ys(e2) {
    const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
    return function(n2) {
      return new Promise((s2, r2) => {
        t2[e2]({ ...n2, success(e3) {
          s2(e3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    };
  }
  class Qs extends class {
    constructor() {
      this._callback = {};
    }
    addListener(e2, t2) {
      this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
    }
    on(e2, t2) {
      return this.addListener(e2, t2);
    }
    removeListener(e2, t2) {
      if (!t2)
        throw new Error('The "listener" argument must be of type function. Received undefined');
      const n2 = this._callback[e2];
      if (!n2)
        return;
      const s2 = function(e3, t3) {
        for (let n3 = e3.length - 1; n3 >= 0; n3--)
          if (e3[n3] === t3)
            return n3;
        return -1;
      }(n2, t2);
      n2.splice(s2, 1);
    }
    off(e2, t2) {
      return this.removeListener(e2, t2);
    }
    removeAllListener(e2) {
      delete this._callback[e2];
    }
    emit(e2, ...t2) {
      const n2 = this._callback[e2];
      if (n2)
        for (let e3 = 0; e3 < n2.length; e3++)
          n2[e3](...t2);
    }
  } {
    constructor() {
      super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
    }
    init() {
      return Promise.all([Ys("getSystemInfo")(), Ys("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
        if (!e2)
          throw new Error("Invalid appId, please check the manifest.json file");
        if (!t2)
          throw new Error("Invalid push client id");
        this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
      }, (e2) => {
        throw this.emit("error", e2), this.close(), e2;
      });
    }
    async open() {
      return this.init();
    }
    _isUniCloudSSE(e2) {
      if ("receive" !== e2.type)
        return false;
      const t2 = e2 && e2.data && e2.data.payload;
      return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
    }
    _receivePushMessage(e2) {
      if (!this._isUniCloudSSE(e2))
        return;
      const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
      this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
    }
    _consumMessage() {
      for (; ; ) {
        const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
        if (!e2)
          break;
        this._currentMessageId++, this._parseMessagePayload(e2);
      }
    }
    _parseMessagePayload(e2) {
      const { action: t2, messageId: n2, message: s2 } = e2;
      "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
    }
    _appendMessage({ messageId: e2, message: t2 } = {}) {
      this.emit("message", t2);
    }
    _end({ messageId: e2, message: t2 } = {}) {
      this.emit("end", t2), this.close();
    }
    _initMessageListener() {
      uni.onPushMessage(this._uniPushMessageCallback);
    }
    _destroy() {
      uni.offPushMessage(this._uniPushMessageCallback);
    }
    toJSON() {
      return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
    }
    close() {
      this._destroy(), this.emit("close");
    }
  }
  async function Xs(e2) {
    {
      const { osName: e3, osVersion: t3 } = he();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）");
    }
    const t2 = e2.__dev__;
    if (!t2.debugInfo)
      return;
    const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await Et(n2, s2);
    if (r2)
      return t2.localAddress = r2, void (t2.localPort = s2);
    const i2 = console["error"];
    let o2 = "";
    if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === A.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
      throw new Error(o2);
    i2(o2);
  }
  function Zs(e2) {
    e2._initPromiseHub || (e2._initPromiseHub = new v({ createPromise: function() {
      let t2 = Promise.resolve();
      var n2;
      n2 = 1, t2 = new Promise((e3) => {
        setTimeout(() => {
          e3();
        }, n2);
      });
      const s2 = e2.auth();
      return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
    } }));
  }
  const er = { tcb: xt, tencent: xt, aliyun: me, private: Ut, dcloud: Ut, alipay: Wt };
  let tr = new class {
    init(e2) {
      let t2 = {};
      const n2 = er[e2.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e2), function(e3) {
        const t3 = {};
        e3.__dev__ = t3, t3.debugLog = "app" === A;
        const n3 = P;
        n3 && !n3.code && (t3.debugInfo = n3);
        const s2 = new v({ createPromise: function() {
          return Xs(e3);
        } });
        t3.initLocalNetwork = function() {
          return s2.exec();
        };
      }(t2), Zs(t2), Xn(t2), function(e3) {
        const t3 = e3.uploadFile;
        e3.uploadFile = function(e4) {
          return t3.call(this, e4);
        };
      }(t2), function(e3) {
        e3.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = us(hs, { uniClient: e3 });
          return this._database = n3, n3;
        }, e3.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e3.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = us(hs, { uniClient: e3, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e3) {
        e3.getCurrentUserInfo = Ks, e3.chooseAndUploadFile = js.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
          return Bs(e3);
        } }), e3.SSEChannel = Qs, e3.initSecureNetworkByWeixin = Vs(e3), e3.setCustomClientInfo = Gs, e3.importObject = Ws(e3);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
        if (!t2[e3])
          return;
        const n3 = t2[e3];
        t2[e3] = function() {
          return n3.apply(t2, Array.from(arguments));
        }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
          return function(n4) {
            let s2 = false;
            if ("callFunction" === t3) {
              const e5 = n4 && n4.type || c;
              s2 = e5 !== c;
            }
            const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
            n4 = n4 || {};
            const { success: o2, fail: a2, complete: u2 } = ne(n4), h2 = i2.then(() => s2 ? Promise.resolve() : K(F(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : K(F(t3, "success"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (r2 && X(B, { type: z, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : K(F(t3, "fail"), e5).then(() => K(F(t3, "complete"), e5)).then(() => (X(B, { type: z, content: e5 }), Promise.reject(e5))));
            if (!(o2 || a2 || u2))
              return h2;
            h2.then((e5) => {
              o2 && o2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
            }, (e5) => {
              a2 && a2(e5), u2 && u2(e5), r2 && X(B, { type: z, content: e5 });
            });
          };
        }(t2[e3], e3)).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e2 = C;
    let t2 = {};
    if (e2 && 1 === e2.length)
      t2 = e2[0], tr = tr.init(t2), tr._isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
        tr[e3] = function() {
          return console.error(n2), Promise.reject(new se({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    if (Object.assign(tr, { get mixinDatacom() {
      return Bs(tr);
    } }), Ns(tr), tr.addInterceptor = M, tr.removeInterceptor = q, tr.interceptObject = j, uni.__uniCloud = tr, "app" === A) {
      const e3 = U();
      e3.uniCloud = tr, e3.UniCloudError = se;
    }
  })();
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "l-upload",
    props: {
      name: new UTSJSONObject({ type: String, required: false }),
      modelValue: new UTSJSONObject({ type: Array, required: false }),
      disabled: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      readonly: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      multiple: new UTSJSONObject({ type: Boolean, required: true, default: true }),
      imageFit: new UTSJSONObject({ type: String, required: true, default: "aspectFill" }),
      gutter: new UTSJSONObject({ type: String, required: false }),
      column: new UTSJSONObject({ type: Number, required: false }),
      max: new UTSJSONObject({ type: Number, required: true, default: 0 }),
      sizeLimit: new UTSJSONObject({ type: Number, required: false }),
      uploadIcon: new UTSJSONObject({ type: String, required: true, default: "camera" }),
      uploadIconSize: new UTSJSONObject({ type: String, required: false }),
      gridWidth: new UTSJSONObject({ type: String, required: false }),
      gridHeight: new UTSJSONObject({ type: String, required: false }),
      gridBgColor: new UTSJSONObject({ type: String, required: false }),
      addBgColor: new UTSJSONObject({ type: String, required: false }),
      gridBorderRadius: new UTSJSONObject({ type: String, required: false }),
      defaultFiles: new UTSJSONObject({ type: Array, required: false }),
      loadingText: new UTSJSONObject({ type: String, required: true, default: "上传中..." }),
      reloadText: new UTSJSONObject({ type: String, required: true, default: "重新上传" }),
      failedText: new UTSJSONObject({ type: String, required: true, default: "上传失败" }),
      disablePreview: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      autoUpload: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      mediaType: new UTSJSONObject({ type: String, required: true, default: "image" }),
      maxDuration: new UTSJSONObject({ type: Number, required: false }),
      sizeType: new UTSJSONObject({ type: Array, required: true, default: ["original", "compressed"] }),
      sourceType: new UTSJSONObject({ type: Array, required: true, default: ["album", "camera"] }),
      action: new UTSJSONObject({ type: String, required: false }),
      headers: new UTSJSONObject({ type: null, required: false }),
      formData: new UTSJSONObject({ type: null, required: false }),
      mode: new UTSJSONObject({ type: String, required: true, default: "grid" })
    },
    emits: ["fail", "remove", "success", "click", "add", "update:modelValue"],
    setup(__props, _a) {
      var _b, _c, _d;
      var __expose = _a.expose, __emit = _a.emit;
      const formDisabled = vue.inject("formDisabled", null);
      const formReadonly = vue.inject("formReadonly", null);
      const emits = __emit;
      const props = __props;
      const isReadonly = vue.computed(() => {
        var _a2;
        uni.__log__("log", "at uni_modules/lime-upload/components/l-upload/l-upload.uvue:150", "isReadonly", props.readonly);
        if (props.readonly)
          return props.readonly;
        return (_a2 = formReadonly === null || formReadonly === void 0 ? null : formReadonly.value) !== null && _a2 !== void 0 ? _a2 : false;
      });
      const isDisabled = vue.computed(() => {
        var _a2;
        if (props.disabled)
          return props.disabled;
        return (_a2 = formDisabled === null || formDisabled === void 0 ? null : formDisabled.value) !== null && _a2 !== void 0 ? _a2 : false;
      });
      const transformFiles = (it2 = null) => {
        var _a2, _b2;
        const file = UTSJSONObject.assign(new UTSJSONObject({}), it2);
        return {
          url: (_a2 = file.getString("url")) !== null && _a2 !== void 0 ? _a2 : "",
          path: file.getString("path"),
          name: file.getString("name"),
          thumb: file.getString("thumb"),
          size: file.getNumber("size"),
          type: file.getString("type"),
          percent: file.getNumber("percent"),
          status: (_b2 = file.getString("status")) !== null && _b2 !== void 0 ? _b2 : "done"
        };
      };
      const customFiles = vue.ref((_d = (_c = (_b = props.modelValue) !== null && _b !== void 0 ? _b : props.defaultFiles) === null || _c === void 0 ? null : _c.map(transformFiles)) !== null && _d !== void 0 ? _d : []);
      const listWidth = vue.ref(0);
      const uploadRef = vue.ref(null);
      const styles = vue.computed(() => {
        var _a2;
        const style = /* @__PURE__ */ new Map();
        const gutter = unitConvert((_a2 = props.gutter) !== null && _a2 !== void 0 ? _a2 : 8) / 2 * -1;
        style.set("margin-left", "".concat(gutter, "px"));
        style.set("margin-right", "".concat(gutter, "px"));
        style.set("margin-top", "".concat(gutter, "px"));
        return style;
      });
      const itemStyle = vue.computed(() => {
        var _a2, _b2, _c2;
        const style = /* @__PURE__ */ new Map();
        const gutter = unitConvert((_a2 = props.gutter) !== null && _a2 !== void 0 ? _a2 : 8) / 2;
        let column = (_b2 = props.column) !== null && _b2 !== void 0 ? _b2 : 4;
        if (props.gridWidth != null || props.column != null) {
          const width = listWidth.value / column - gutter * 2.0275;
          style.set("width", (_c2 = props.gridWidth) !== null && _c2 !== void 0 ? _c2 : "".concat(width, "px"));
        }
        if (props.gridHeight != null) {
          style.set("height", props.gridHeight);
        }
        style.set("margin", "".concat(gutter, "px"));
        if (props.gridBgColor != null) {
          style.set("background", props.gridBgColor);
        }
        return style;
      });
      const onFileClick = (index) => {
        const file = customFiles.value[index];
        emits("click", new UTSJSONObject({ file }));
      };
      const onProofTap = (index) => {
        onFileClick(index);
        if (props.disablePreview)
          return null;
        uni.previewImage({
          urls: customFiles.value.filter((file) => {
            return file.percent != -1;
          }).map((file) => {
            return file.url;
          }),
          current: index
        });
      };
      const onDelete = (index) => {
        if (isDisabled.value || isReadonly.value)
          return null;
        const delFile = customFiles.value[index];
        customFiles.value = customFiles.value.filter((file, i2) => {
          return index != i2;
        });
        emits("remove", new UTSJSONObject({ index, file: delFile }));
      };
      let last;
      const upload = (files) => {
        if (!props.autoUpload || props.action == null || props.action.length < 5)
          return null;
        if (props.action == "uniCloud") {
          let uploadImgs = [];
          files.forEach((file, index) => {
            const promise = new Promise((resolve, reject) => {
              const dotIndex = file.name.lastIndexOf(".");
              const baseName = file.name.substring(0, dotIndex);
              const extension = file.name.substring(dotIndex);
              const timestamp = Date.now();
              tr.uploadFile({
                filePath: file.url,
                cloudPath: "".concat(baseName, "_").concat(timestamp).concat(extension),
                // cloudPath: file.name!.substring(file.name!.lastIndexOf('.')),
                onUploadProgress: (res) => {
                  file.status = "loading";
                  file.percent = Math.floor(res.loaded / res.total * 100);
                }
              }).then((res) => {
                file.path = res.fileID;
                file.status = "done";
                tr.getTempFileURL({
                  fileList: [res.fileID]
                }).then((result) => {
                  if (result.fileList.length > 0) {
                    file.url = result.fileList[0].tempFileURL;
                  }
                  resolve(res);
                }).catch((error = null) => {
                  uni.__log__("error", "at uni_modules/lime-upload/components/l-upload/l-upload.uvue:296", "获取临时URL失败", error);
                  resolve(res);
                });
              }).catch((err = null) => {
                file.status = "failed";
                reject(err);
              });
            });
            uploadImgs.push(promise);
          });
          Promise.all(uploadImgs).then((res) => {
            emits("success", res);
          }).catch((err = null) => {
            emits("fail", err);
          });
        } else {
          let uploadImgs = [];
          files.forEach((file, index) => {
            const promise = new Promise((resolve, reject) => {
              const task = uni.uploadFile({
                url: props.action,
                filePath: file.url,
                name: file.name,
                formData: props.formData,
                header: props.headers,
                success: (res) => {
                  file.status = "done";
                  if (res.statusCode == 200) {
                    if (typeof res.data == "string") {
                      try {
                        const data = UTS.JSON.parse(res.data, UTSJSONObject);
                        const url = data === null || data === void 0 ? null : data.getString("url");
                        if (url != null) {
                          file.path = url;
                        }
                      } catch (e2) {
                      }
                    }
                  }
                  resolve(res);
                },
                fail(err) {
                  file.status = "failed";
                  reject(err);
                }
              });
              task.onProgressUpdate((res) => {
                file.status = "loading";
                file.percent = res.progress;
              });
            });
            uploadImgs.push(promise);
          });
          Promise.all(uploadImgs).then((res) => {
            emits("success", res);
          }).catch((err = null) => {
            emits("fail", err);
          });
        }
      };
      const customLimit = vue.computed(() => {
        return props.max == 0 ? 20 : props.max - customFiles.value.length;
      });
      const onAddTap = () => {
        if (isDisabled.value || isReadonly.value)
          return null;
        chooseFiles({
          mediaType: props.mediaType,
          count: customLimit.value,
          sourceType: props.sourceType,
          sizeType: props.sizeType,
          sizeLimit: props.sizeLimit
        }).then((files) => {
          last = customFiles.value.length;
          customFiles.value = customFiles.value.concat(files);
          const _files = customFiles.value.filter((it2, i2) => {
            return i2 > last - 1;
          });
          upload(_files);
          emits("add", _files);
        });
      };
      const stop = vue.watch(customFiles, (v2) => {
        emits("update:modelValue", v2);
      });
      const stopValue = vue.watch(() => {
        return props.modelValue;
      }, (v2 = null) => {
        if (v2 != null && v2.length != customFiles.value.length) {
          customFiles.value = v2.map(transformFiles);
        }
      });
      __expose(new UTSJSONObject({
        remove: onDelete
      }));
      const resizeObserver = new UniResizeObserver((entries) => {
        listWidth.value = entries[0].target.getBoundingClientRect().width;
      });
      vue.onMounted(() => {
        vue.nextTick(() => {
          var _a2, _b2;
          listWidth.value = (_b2 = (_a2 = uploadRef.value) === null || _a2 === void 0 ? null : _a2.getBoundingClientRect().width) !== null && _b2 !== void 0 ? _b2 : 0;
          resizeObserver.observe(uploadRef.value);
        });
      });
      vue.onUnmounted(() => {
        stop();
        resizeObserver.disconnect();
      });
      const __returned__ = { formDisabled, formReadonly, emits, props, isReadonly, isDisabled, transformFiles, customFiles, listWidth, uploadRef, styles, itemStyle, onFileClick, onProofTap, onDelete, get last() {
        return last;
      }, set last(v2) {
        last = v2;
      }, upload, customLimit, onAddTap, stop, stopValue, resizeObserver };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$9 = { "l-upload": { "": { "flex": 1, "position": "relative", "flexDirection": "row", "flexWrap": "wrap" } }, "l-upload__item": { "": { "position": "relative", "display": "flex", "width": 80, "height": 80, "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx", "overflow": "hidden", "alignItems": "center", "justifyContent": "center" } }, "l-upload__item--add": { "": { "backgroundImage": "none", "backgroundColor": "#f3f3f3" } }, "l-upload__item--disabled": { "": { "opacity": 0.5 } }, "l-upload__image": { "": { "width": "100%", "height": "100%" } }, "l-upload__add-icon": { "": { "fontSize": 28, "color": "rgba(0,0,0,0.25)" } }, "l-upload__delete-btn": { "": { "position": "absolute", "top": 0, "right": 0, "display": "flex", "alignItems": "center", "justifyContent": "center", "width": 20, "height": 20, "borderTopRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx", "backgroundColor": "rgba(0,0,0,0.65)" } }, "l-upload__progress-mask": { "": { "position": "absolute", "left": 0, "top": 0, "bottom": 0, "width": "100%", "backgroundColor": "rgba(0,0,0,0.45)", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx", "paddingTop": 16, "paddingRight": 0, "paddingBottom": 16, "paddingLeft": 0 } }, "l-upload__progress-text": { "": { "fontSize": 12, "lineHeight": "20px", "marginTop": 4, "color": "#FFFFFF" } }, "l-upload__progress-loading": { "": { "alignSelf": "center" } }, "l-upload__progress-icon": { "": { "color": "#FFFFFF", "!fontSize": 24, "!width": 24 } } };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_loading = resolveEasycom(vue.resolveDynamicComponent("l-loading"), __easycom_0$4);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "l-upload",
        ref: "uploadRef",
        style: vue.normalizeStyle($setup.styles)
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.customFiles, (file, index) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                class: "l-upload__item",
                style: vue.normalizeStyle([$setup.itemStyle]),
                key: file.url
              },
              [
                vue.renderSlot(_ctx.$slots, "file", {
                  file,
                  index
                }, () => [
                  file.type == "image" ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "l-upload__image",
                    src: file.url,
                    "data-file": file,
                    mode: $props.imageFit,
                    onClick: ($event) => $setup.onProofTap(index)
                  }, null, 8, ["src", "data-file", "mode", "onClick"])) : vue.createCommentVNode("v-if", true),
                  file.type == "video" ? (vue.openBlock(), vue.createElementBlock("video", {
                    key: 1,
                    class: "l-upload__image",
                    src: file.url,
                    "data-file": file,
                    autoplay: false,
                    objectFit: "contain",
                    onClick: ($event) => $setup.onFileClick(index)
                  }, null, 8, ["src", "data-file", "onClick"])) : vue.createCommentVNode("v-if", true),
                  file.status != null && file.status != "done" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "l-upload__progress-mask",
                    "data-file": file,
                    onClick: ($event) => $setup.onFileClick(index)
                  }, [
                    file.status == "loading" ? (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 0 },
                      [
                        vue.createVNode(_component_l_loading, {
                          class: "l-upload__progress-loading",
                          size: "24px",
                          color: "white"
                        }),
                        file.percent != null ? (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 0,
                            class: "l-upload__progress-text"
                          },
                          vue.toDisplayString(file.percent) + "%",
                          1
                          /* TEXT */
                        )) : (vue.openBlock(), vue.createElementBlock(
                          "text",
                          {
                            key: 1,
                            class: "l-upload__progress-text"
                          },
                          vue.toDisplayString($props.loadingText),
                          1
                          /* TEXT */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    )) : (vue.openBlock(), vue.createBlock(_component_l_icon, {
                      key: 1,
                      class: "l-upload__progress-icon",
                      name: file.status == "reload" ? "refresh" : "close-circle",
                      size: "48rpx",
                      "aria-hidden": ""
                    }, null, 8, ["name"])),
                    file.status == "reload" || file.status == "failed" ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      {
                        key: 2,
                        class: "l-upload__progress-text"
                      },
                      vue.toDisplayString(file.status == "reload" ? $props.reloadText : $props.failedText),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true)
                  ], 8, ["data-file", "onClick"])) : vue.createCommentVNode("v-if", true),
                  !$setup.isReadonly ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 3,
                    class: "l-upload__delete-btn",
                    "aria-role": "button",
                    "aria-label": "删除",
                    "data-index": index,
                    onClick: ($event) => $setup.onDelete(index)
                  }, [
                    vue.createVNode(_component_l_icon, {
                      name: "close",
                      size: "16px",
                      color: "#fff"
                    })
                  ], 8, ["data-index", "onClick"])) : vue.createCommentVNode("v-if", true)
                ])
              ],
              4
              /* STYLE */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        !$setup.isReadonly ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["l-upload__item l-upload__item--add", { "l-upload__item--disabled": $setup.isDisabled }]),
            style: vue.normalizeStyle([$setup.itemStyle, $props.addBgColor != null ? { background: $props.addBgColor } : ""]),
            "aria-label": "上传",
            onClick: $setup.onAddTap
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createVNode(_component_l_icon, {
                class: "l-upload__add-icon",
                size: $props.uploadIconSize,
                name: $props.uploadIcon
              }, null, 8, ["size", "name"])
            ])
          ],
          6
          /* CLASS, STYLE */
        )), [
          [vue.vShow, !$props.multiple ? $setup.customFiles.length == 0 : $props.max == 0 || $setup.customFiles.length != $props.max]
        ]) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["styles", [_style_0$9]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-upload/components/l-upload/l-upload.uvue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "l-picker-item",
    props: {
      options: new UTSJSONObject({ type: Array, required: true, default: [] }),
      value: new UTSJSONObject({ type: null, required: false }),
      column: new UTSJSONObject({ type: Number, required: true, default: -1 }),
      name: new UTSJSONObject({ type: [String, Number], required: false })
    },
    setup(__props, _a) {
      var __expose = _a.expose;
      const instance = vue.getCurrentInstance();
      const props = __props;
      const picker = vue.inject("limePicker", null);
      const pickerItemInstanceArray = vue.inject("limePickerItems", null);
      const manageChildInList = vue.inject("limePickerManageChildInList", null);
      manageChildInList === null || manageChildInList === void 0 ? null : manageChildInList(instance.proxy, true);
      const onPick = vue.inject("limePickerOnPick", null);
      const updateItems = vue.inject("limePickerUpdateItems", null);
      const curIndex = vue.ref(0);
      const curValue = vue.ref(props.value);
      const column = vue.computed(() => {
        var _a2;
        return props.column != -1 ? props.column : (_a2 = pickerItemInstanceArray === null || pickerItemInstanceArray === void 0 ? null : pickerItemInstanceArray.indexOf(instance.proxy)) !== null && _a2 !== void 0 ? _a2 : props.column;
      });
      const elementPosition = vue.computed(() => {
        var _a2;
        const totalElements = (_a2 = pickerItemInstanceArray === null || pickerItemInstanceArray === void 0 ? null : pickerItemInstanceArray.length) !== null && _a2 !== void 0 ? _a2 : 0;
        return [column.value == 0, column.value == totalElements - 1];
      });
      const innerIndex = vue.computed(() => {
        return [curIndex.value];
      });
      const indicatorStyles = vue.computed(() => {
        var _a2;
        const _b = __read(elementPosition.value, 2), isFirst = _b[0], isLast = _b[1];
        let style = "";
        if (isFirst) {
          style += "border-top-left-radius:12rpx; border-bottom-left-radius:12rpx;";
        }
        if (isLast) {
          style += "border-top-right-radius:12rpx; border-bottom-right-radius:12rpx;";
        }
        return "\n			".concat(style, "\n			height: ").concat((_a2 = picker === null || picker === void 0 ? null : picker.itemHeight) !== null && _a2 !== void 0 ? _a2 : "50px", ";\n			background-color: rgba(0, 0, 0, 0.04); ").concat(picker === null || picker === void 0 ? null : picker.indicatorStyle);
      });
      const itemStyles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if ((picker === null || picker === void 0 ? null : picker.itemColor) != null) {
          style.set("color", picker.itemColor);
        }
        if ((picker === null || picker === void 0 ? null : picker.itemFontSize) != null) {
          style.set("font-size", picker.itemFontSize);
        }
        if ((picker === null || picker === void 0 ? null : picker.itemHeight) != null) {
          style.set("line-height", picker.itemHeight);
          style.set("height", picker.itemHeight);
        }
        return style;
      });
      const itemActiveStyles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if ((picker === null || picker === void 0 ? null : picker.itemActiveColor) != null) {
          style.set("color", picker.itemActiveColor);
        }
        if ((picker === null || picker === void 0 ? null : picker.itemActiveFontWeight) != null) {
          style.set("font-weight", picker.itemActiveFontWeight);
        }
        return style;
      });
      const getIndexByValue = (val = null) => {
        let defaultIndex = 0;
        if (val != null) {
          defaultIndex = props.options.findIndex((item = null) => {
            return item.value == val;
          });
        }
        return defaultIndex < 0 ? 0 : defaultIndex;
      };
      const setIndex = (index) => {
        curIndex.value;
        let _index = clamp(index, 0, props.options.length - 1);
        if (props.options.length > _index) {
          curIndex.value = _index;
          curValue.value = props.options[_index].value;
        }
      };
      const setValue = (value = null) => {
        if (value == curValue.value)
          return null;
        curValue.value = value;
        const index = getIndexByValue(value);
        setIndex(index);
      };
      const setOptions = () => {
      };
      const setUpdateItems = () => {
        const index = clamp(curIndex.value, 0, props.options.length - 1);
        const curItem = props.options.length > index ? props.options[index] : null;
        if (curItem == null)
          return null;
        updateItems === null || updateItems === void 0 ? null : updateItems(curItem, index, column.value);
      };
      const handlePick = (e2) => {
        if (props.options.length == 0)
          return null;
        const index = clamp(e2.detail.value[0], 0, props.options.length - 1);
        const curItem = props.options[index];
        if (index == curIndex.value)
          return null;
        setIndex(index);
        onPick === null || onPick === void 0 ? null : onPick(curItem, index, column.value);
      };
      const stopValue = vue.watch(() => {
        return props.value;
      }, (v2 = null) => {
        setValue(v2);
        setUpdateItems();
      }, { immediate: true });
      vue.onBeforeUnmount(() => {
        manageChildInList === null || manageChildInList === void 0 ? null : manageChildInList(instance.proxy, false);
      });
      __expose(new UTSJSONObject({
        setIndex,
        setValue,
        // setOptions,
        // setUpdateItems,
        getIndexByValue
      }));
      const __returned__ = { instance, props, picker, pickerItemInstanceArray, manageChildInList, onPick, updateItems, curIndex, curValue, column, elementPosition, innerIndex, indicatorStyles, itemStyles, itemActiveStyles, getIndexByValue, setIndex, setValue, setOptions, setUpdateItems, handlePick, stopValue };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$8 = { "l-picker-item__group": { "": { "flex": 1 } }, "l-picker-item__group-item": { "": { "height": 50, "lineHeight": "50px", "textAlign": "center", "transitionDuration": "100ms", "transitionProperty": "fontWeight,color", "transitionTimingFunction": "linear", "fontWeight": "400", "color": "rgba(0,0,0,0.88)", "fontSize": 16, "whiteSpace": "nowrap" } }, "l-picker-item__group-item--active": { "": { "color": "rgba(0,0,0,0.88)", "fontWeight": "700" } }, "l-picker-item__indicator": { "": { "left": "0rpx", "right": "0rpx", "width": "auto", "height": 50, "pointerEvents": "none", "backgroundColor": "rgba(0,0,0,0.02)" } }, "@TRANSITION": { "l-picker-item__group-item": { "duration": "100ms", "property": "fontWeight,color", "timingFunction": "linear" } } };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_picker_view_column = vue.resolveComponent("picker-view-column");
    const _component_picker_view = vue.resolveComponent("picker-view");
    return vue.openBlock(), vue.createBlock(_component_picker_view, {
      class: "l-picker-item__group",
      style: vue.normalizeStyle({ opacity: $props.options.length > 0 ? 1 : 0 }),
      "indicator-style": $setup.indicatorStyles,
      value: $setup.innerIndex,
      onChange: $setup.handlePick,
      "indicator-class": "l-picker-item__indicator"
    }, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_picker_view_column, { class: "l-picker-item__wrapper" }, {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.options, (item, i2) => {
                return vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    class: vue.normalizeClass(["l-picker-item__group-item", { "l-picker-item__group-item--active": $setup.curIndex == i2 }]),
                    style: vue.normalizeStyle([$setup.itemStyles, $setup.curIndex == i2 ? $setup.itemActiveStyles : {}]),
                    key: item.value
                  },
                  vue.toDisplayString(item.label),
                  7
                  /* TEXT, CLASS, STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    }, 8, ["style", "indicator-style", "value"]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["styles", [_style_0$8]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-picker/components/l-picker-item/l-picker-item.uvue"]]);
  function pushAt(arr, index, value) {
    arr[index] = value;
  }
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "l-picker",
    props: {
      cancelBtn: new UTSJSONObject({ type: String, required: false }),
      cancelStyle: new UTSJSONObject({ type: null, required: false }),
      confirmBtn: new UTSJSONObject({ type: String, required: false }),
      confirmStyle: new UTSJSONObject({ type: null, required: false }),
      title: new UTSJSONObject({ type: String, required: false }),
      titleStyle: new UTSJSONObject({ type: null, required: false }),
      keys: new UTSJSONObject({ type: null, required: false }),
      columns: new UTSJSONObject({ type: Array, required: true, default: [] }),
      modelValue: new UTSJSONObject({ type: Array, required: false }),
      defaultValue: new UTSJSONObject({ type: Array, required: false }),
      value: new UTSJSONObject({ type: Array, required: false }),
      loading: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      loadingColor: new UTSJSONObject({ type: String, required: false }),
      loadingMaskColor: new UTSJSONObject({ type: String, required: false }),
      loadingSize: new UTSJSONObject({ type: String, required: true, default: "64rpx" }),
      itemHeight: new UTSJSONObject({ type: String, required: false }),
      itemColor: new UTSJSONObject({ type: String, required: false }),
      itemFontSize: new UTSJSONObject({ type: String, required: false }),
      itemActiveColor: new UTSJSONObject({ type: String, required: false }),
      itemActiveFontWeight: new UTSJSONObject({ type: Number, required: false }),
      indicatorStyle: new UTSJSONObject({ type: String, required: false }),
      bgColor: new UTSJSONObject({ type: String, required: false }),
      groupHeight: new UTSJSONObject({ type: String, required: false }),
      radius: new UTSJSONObject({ type: String, required: false }),
      resetIndex: new UTSJSONObject({ type: Boolean, required: true, default: false })
    },
    emits: ["change", "cancel", "pick", "confirm", "update:modelValue", "update:value"],
    setup(__props, _a) {
      var _b, _c, _d, _e2;
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emit = __emit;
      const props = __props;
      const pickerItemInstanceArray = vue.reactive([]);
      const ohosShow = vue.ref(0);
      const modelValue = vue.ref((_d = (_c = (_b = props.value) !== null && _b !== void 0 ? _b : props.modelValue) !== null && _c !== void 0 ? _c : props.defaultValue) !== null && _d !== void 0 ? _d : []);
      const pickerValue = vue.computed({
        set(value) {
          if (value.join("") == modelValue.value.join(""))
            return null;
          modelValue.value = value;
          emit("update:modelValue", value);
          emit("change", value);
        },
        get() {
          var _a2, _b2;
          return (_b2 = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : props.modelValue) !== null && _b2 !== void 0 ? _b2 : modelValue.value;
        }
      });
      const isEmpty = vue.computed(() => {
        return props.columns.length == 0 && pickerItemInstanceArray.every((child) => {
          return child.options.length == 0;
        });
      });
      const styles = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.bgColor != null) {
          style.set("background", props.bgColor);
        }
        if (props.radius != null) {
          style.set("border-top-left-radius", props.radius);
          style.set("border-top-right-radius", props.radius);
        }
        return style;
      });
      const curIndexArray = vue.ref([]);
      const curValueArray = vue.ref([...pickerValue.value]);
      const curItemArray = [];
      const realColumns = vue.computed(() => {
        const pickerColumns = pickerItemInstanceArray.map((child) => {
          return child.options;
        });
        if (pickerColumns.length > 0) {
          return pickerColumns;
        }
        return props.columns;
      });
      const manageChildInList = (child, shouldAdd) => {
        const index = pickerItemInstanceArray.indexOf(child);
        if (shouldAdd) {
          if (index != -1)
            return null;
          pickerItemInstanceArray.push(child);
        } else {
          if (index == -1)
            return null;
          pickerItemInstanceArray.splice(index, 1);
        }
      };
      const updateItems = (item, index, column) => {
        pushAt(curIndexArray.value, column, index);
        pushAt(curValueArray.value, column, item.value);
        pushAt(curItemArray, column, item);
      };
      const updatePickerItems = () => {
        const _indexs = [];
        const _values = [];
        pickerItemInstanceArray.forEach((child, column) => {
          if (child.options.length == 0)
            return null;
          const value = curValueArray.value.length > column ? curValueArray.value[column] : null;
          const index = value == null ? 0 : child.$callMethod("getIndexByValue", value);
          child.$callMethod("setIndex", index);
          const item = child.options[index];
          _indexs.push(index);
          _values.push(item.value);
          pushAt(curItemArray, column, item);
        });
        if (curIndexArray.value.join("") == _indexs.join(""))
          return null;
        curIndexArray.value = _indexs;
        curValueArray.value = _values;
        pickerValue.value = [...curValueArray.value];
      };
      const onPick = (item, index, column) => {
        if (curIndexArray.value[column] == index)
          return null;
        pushAt(curIndexArray.value, column, index);
        pushAt(curValueArray.value, column, item.value);
        pushAt(curItemArray, column, item);
        const obj = {
          values: curValueArray.value,
          column,
          index
        };
        pickerValue.value = [...curValueArray.value];
        emit("pick", obj);
      };
      const onCancel = (e2) => {
        updatePickerItems();
        emit("cancel", e2);
      };
      const onConfirm = (e2) => {
        const values = [...curValueArray.value];
        const indexs = [...curIndexArray.value];
        const items = curItemArray.map((item) => {
          return vue.toRaw(item);
        });
        if (pickerValue.value.join("") != values.join("")) {
          pickerValue.value = values;
        }
        const obj = {
          values,
          indexs,
          items
        };
        emit("confirm", obj);
      };
      const stopPickerValue = vue.watch(pickerValue, () => {
        if (pickerValue.value.join("") == curValueArray.value.join(""))
          return null;
        curValueArray.value = pickerValue.value.map((item = null) => {
          return item;
        });
        updatePickerItems();
      });
      const stopColumns = vue.watch(realColumns, () => {
        updatePickerItems();
      });
      vue.onMounted(() => {
        vue.nextTick(() => {
          if (pickerValue.value.join("") != curValueArray.value.join("") && pickerValue.value.length > 0) {
            curValueArray.value = [...pickerValue.value];
            updatePickerItems();
          }
        });
      });
      const loadingRef = vue.ref(null);
      const loadingAni = useLoading(loadingRef);
      loadingAni.type = "circular";
      loadingAni.color = (_e2 = props.loadingColor) !== null && _e2 !== void 0 ? _e2 : "#3283ff";
      loadingAni.ratio = unitConvert(props.loadingSize);
      vue.watchEffect(() => {
        if (props.loading) {
          loadingAni.play();
        } else {
          loadingAni.clear();
        }
      });
      vue.onBeforeUnmount(() => {
        stopPickerValue();
        stopColumns();
      });
      vue.provide("limePicker", props);
      vue.provide("limePickerOnPick", onPick);
      vue.provide("limePickerUpdateItems", updateItems);
      vue.provide("limePickerItems", pickerItemInstanceArray);
      vue.provide("limePickerManageChildInList", manageChildInList);
      const __returned__ = { emit, props, pickerItemInstanceArray, ohosShow, modelValue, pickerValue, isEmpty, styles, curIndexArray, curValueArray, curItemArray, realColumns, manageChildInList, updateItems, updatePickerItems, onPick, onCancel, onConfirm, stopPickerValue, stopColumns, loadingRef, loadingAni };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$7 = { "l-picker": { "": { "position": "relative", "backgroundColor": "#ffffff", "borderTopLeftRadius": "24rpx", "borderTopRightRadius": "24rpx" } }, "l-picker__toolbar": { "": { "display": "flex", "alignItems": "center", "justifyContent": "space-between", "overflow": "hidden", "height": "116rpx", "flexDirection": "row", "position": "relative" } }, "l-picker__title": { "": { "position": "absolute", "left": "50%", "top": "50%", "transform": "translateX(-50%) translateY(-50%)", "textAlign": "center", "overflow": "hidden", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "color": "rgba(0,0,0,0.88)", "lineHeight": "52rpx", "fontWeight": "700", "fontSize": 18 } }, "l-picker__cancel": { "": { "fontSize": 16, "lineHeight": "116rpx", "height": "100%", "paddingTop": 0, "paddingRight": "32rpx", "paddingBottom": 0, "paddingLeft": "32rpx", "color": "rgba(0,0,0,0.65)" } }, "l-picker__confirm": { "": { "fontSize": 16, "lineHeight": "116rpx", "height": "100%", "paddingTop": 0, "paddingRight": "32rpx", "paddingBottom": 0, "paddingLeft": "32rpx", "color": "#3283ff" } }, "l-picker__main": { "": { "display": "flex", "height": "400rpx", "flexDirection": "row", "paddingTop": 0, "paddingRight": "16rpx", "paddingBottom": 0, "paddingLeft": "16rpx" } }, "l-picker__empty": { "": { "pointerEvents": "none", "justifyContent": "center", "alignItems": "center", "display": "flex", "position": "absolute", "top": 0, "bottom": 0, "left": 0, "right": 0, "zIndex": 3 } }, "l-picker__loading": { "": { "zIndex": 3, "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.9)", "justifyContent": "center", "alignItems": "center", "display": "flex", "position": "absolute", "top": 0, "bottom": 0, "left": 0, "right": 0 } } };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c;
    const _component_l_picker_item = resolveEasycom(vue.resolveDynamicComponent("l-picker-item"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "l-picker",
        style: vue.normalizeStyle([$setup.styles]),
        ref: "pickerRef"
      },
      [
        $props.cancelBtn != null || $props.title != null || $props.confirmBtn != null ? (vue.openBlock(), vue.createElementBlock("view", {
          class: "l-picker__toolbar",
          key: $setup.ohosShow
        }, [
          $props.cancelBtn != null ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              class: "l-picker__cancel",
              key: $setup.ohosShow,
              style: vue.normalizeStyle((_a = $props.cancelStyle) != null ? _a : ""),
              onClick: $setup.onCancel
            },
            vue.toDisplayString($props.cancelBtn),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              class: "l-picker__title",
              key: $setup.ohosShow,
              style: vue.normalizeStyle((_b = $props.titleStyle) != null ? _b : "")
            },
            vue.toDisplayString($props.title),
            5
            /* TEXT, STYLE */
          )),
          $props.confirmBtn != null ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              class: "l-picker__confirm",
              key: $setup.ohosShow,
              style: vue.normalizeStyle((_c = $props.confirmStyle) != null ? _c : ""),
              onClick: $setup.onConfirm
            },
            vue.toDisplayString($props.confirmBtn),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "header"),
        vue.createElementVNode(
          "view",
          {
            class: "l-picker__main",
            style: vue.normalizeStyle([$props.groupHeight != null ? { height: $props.groupHeight } : {}])
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.props.columns, (options, i2) => {
                  return vue.openBlock(), vue.createBlock(_component_l_picker_item, {
                    options,
                    key: i2,
                    column: i2,
                    value: $setup.pickerValue.length > i2 ? $setup.pickerValue[i2] : null
                  }, null, 8, ["options", "column", "value"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            $setup.isEmpty ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "l-picker__empty"
            }, [
              vue.renderSlot(_ctx.$slots, "empty")
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.renderSlot(_ctx.$slots, "footer"),
        $props.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "l-picker__loading",
            ref: "loadingRef",
            style: vue.normalizeStyle([$props.loadingMaskColor != null ? { background: $props.loadingMaskColor } : {}])
          },
          null,
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["styles", [_style_0$7]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-picker/components/l-picker/l-picker.uvue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "feeback",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const questionType = vue.ref("请选择问题类型");
      const files = vue.ref([{
        url: "https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png",
        name: "uploaded4.png",
        type: "image"
      }]);
      const pickerOptions = vue.ref([]);
      const showPicker = vue.ref(false);
      const showQuestionsPicker = () => {
        pickerOptions.value = [
          [
            {
              label: "产品",
              value: "产品"
            },
            {
              label: "服务",
              value: "服务"
            },
            {
              label: "其他",
              value: "其他"
            }
          ]
        ];
        showPicker.value = true;
      };
      const onConfirm = (context) => {
        showPicker.value = false;
        questionType.value = context.values[0].toString();
      };
      const oncancel = () => {
        showPicker.value = false;
      };
      const submit = () => {
        uni.showToast({
          title: "提交成功"
        });
      };
      const __returned__ = { questionType, files, pickerOptions, showPicker, showQuestionsPicker, onConfirm, oncancel, submit };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$1 = "/static/required_ios.png";
  const _style_0$6 = { "container": { "": { "height": "100%", "backgroundColor": "#F5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "underline": { ".container .content ": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "item-label": { ".container .content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginTop": "30rpx" } }, "little-title": { ".container .content .item-label ": { "color": "#999999", "fontSize": "20rpx", "marginLeft": "10rpx" } }, "btn-box": { ".container ": { "marginTop": "50rpx" } }, "l-picker": { ".container ": { "width": "100%" } } };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_2$2);
    const _component_l_textarea = resolveEasycom(vue.resolveDynamicComponent("l-textarea"), __easycom_2);
    const _component_l_upload = resolveEasycom(vue.resolveDynamicComponent("l-upload"), __easycom_3$1);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_4);
    const _component_l_picker = resolveEasycom(vue.resolveDynamicComponent("l-picker"), __easycom_3);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_4$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", {
          class: "item",
          onClick: $setup.showQuestionsPicker
        }, [
          vue.createVNode(_component_fui_input, {
            "text-align": "right",
            label: "问题类型",
            labelSize: 28,
            textAlign: "left",
            placeholderStyle: "font-size: 28rpx;",
            disabled: true,
            required: true,
            placeholder: $setup.questionType
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", null, [
                vue.createVNode(_component_fui_icon, {
                  name: "arrowright",
                  size: 45
                })
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["placeholder"])
        ]),
        vue.createElementVNode("view", { class: "item underline" }, [
          vue.createVNode(_component_fui_input, {
            "text-align": "right",
            label: "设备型号",
            labelSize: 28,
            textAlign: "left",
            placeholderStyle: "font-size: 28rpx;",
            disabled: true,
            placeholder: "请选择设备型号(选填)"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", null, [
                vue.createVNode(_component_fui_icon, {
                  name: "arrowright",
                  size: 45
                })
              ])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createVNode(_component_fui_input, {
            "text-align": "right",
            label: "联系方式",
            labelSize: 28,
            textAlign: "left",
            placeholderStyle: "font-size: 28rpx;",
            disabled: false,
            required: true,
            placeholder: "请输入联系方式"
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "item-label" }, [
            vue.createElementVNode("image", {
              style: { "width": "20rpx", "height": "20rpx", "margin-right": "10rpx" },
              src: _imports_0$1
            }),
            vue.createElementVNode("text", null, "问题描述")
          ]),
          vue.createVNode(_component_l_textarea, {
            placeholder: "请输入内容",
            maxlength: 200,
            indicator: true,
            autosize: true,
            autofocus: true,
            clearable: true,
            layout: "vertical"
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("view", { class: "item-label" }, [
            vue.createElementVNode("text", null, "图片"),
            vue.createElementVNode("text", { class: "little-title" }, "(问题截图,最多三张)")
          ]),
          vue.createVNode(_component_l_upload, {
            max: 3,
            multiple: true,
            modelValue: $setup.files,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.files = $event)
          }, null, 8, ["modelValue"])
        ])
      ]),
      vue.createElementVNode("view", { class: "btn-box" }, [
        vue.createVNode(_component_fui_button, {
          color: "#fff",
          text: "去充值",
          background: "#1296db",
          height: "80rpx",
          onOnclick: $setup.submit
        })
      ]),
      vue.createVNode(_component_fui_bottom_popup, { visible: $setup.showPicker }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_l_picker, {
            "cancel-btn": "取消",
            "confirm-btn": "确定",
            columns: $setup.pickerOptions,
            onCancel: $setup.oncancel,
            onConfirm: $setup.onConfirm
          }, null, 8, ["columns"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible"])
    ]);
  }
  const PagesMineFeebackFeeback = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["styles", [_style_0$6]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/feeback/feeback.uvue"]]);
  class AuthType extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            code: { type: String, optional: false },
            state: { type: String, optional: false }
          };
        },
        name: "AuthType"
      };
    }
    constructor(options, metadata = AuthType.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.code = this.__props__.code;
      this.state = this.__props__.state;
      delete this.__props__;
    }
  }
  class PermissionItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            code: { type: String, optional: false },
            status: { type: String, optional: false }
          };
        },
        name: "PermissionItem"
      };
    }
    constructor(options, metadata = PermissionItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.code = this.__props__.code;
      this.status = this.__props__.status;
      delete this.__props__;
    }
  }
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "systemSetting",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const checked = vue.ref(true);
      const showPicker = vue.ref(false);
      const pickerOptions = vue.ref([]);
      const playTypeItem = vue.ref("WIFI下自动播放");
      const systemNotifyState = vue.ref("");
      const AuthState = vue.ref([
        new AuthType({
          code: "authorized",
          state: "已授权"
        }),
        new AuthType({
          code: "not determined",
          state: "未授权"
        }),
        new AuthType({
          code: "denied",
          state: "未授权"
        })
      ]);
      const permissionList = vue.ref([
        new PermissionItem({ name: "位置信息", code: "locationAuthorized", status: "notDetermined" }),
        new PermissionItem({ name: "相册", code: "albumAuthorized", status: "notDetermined" }),
        new PermissionItem({ name: "麦克风", code: "microphoneAuthorized", status: "notDetermined" }),
        new PermissionItem({ name: "蓝牙", code: "bluetoothAuthorized", status: "notDetermined" }),
        new PermissionItem({ name: "系统通知", code: "notificationAuthorized", status: "notDetermined" }),
        new PermissionItem({ name: "相机", code: "cameraAuthorized", status: "notDetermined" })
      ]);
      const getSystemAuth = (item) => {
        const res = uni.getAppAuthorizeSetting();
        const code = item.code;
        if (code == "bluetoothAuthorized") {
          const resu = uni.getSystemSetting();
          uni.__log__("log", "at pages/mine/systemSetting/systemSetting.uvue:91", resu);
          if (resu.bluetoothEnabled == false) {
            uni.showToast({
              title: "请先手动打开蓝牙"
            });
          } else {
            permissionList.value.map((item2) => {
              if (item2.code == "bluetoothAuthorized") {
                item2.status = "已授权";
              }
            });
          }
        } else {
          const status = res[code];
          if (status == "denied" || status == "not determined") {
            uni.openAppAuthorizeSetting(new UTSJSONObject({
              success: (res2) => {
                uni.__log__("log", "at pages/mine/systemSetting/systemSetting.uvue:108", res2);
              }
            }));
          }
        }
      };
      const changeChecked = () => {
        uni.__log__("log", "at pages/mine/systemSetting/systemSetting.uvue:119", checked.value);
      };
      const isChecked = () => {
        checked.value = !checked.value;
      };
      const getSystemNotify = () => {
        const res = uni.getAppAuthorizeSetting();
        uni.__log__("log", "at pages/mine/systemSetting/systemSetting.uvue:128", res.notificationAuthorized);
        if (res.notificationAuthorized == "denied" || res.notificationAuthorized == "not determined") {
          uni.showToast({
            title: "请先授权通知权限"
          });
          uni.openAppAuthorizeSetting(new UTSJSONObject({
            success: (res2) => {
              uni.__log__("log", "at pages/mine/systemSetting/systemSetting.uvue:135", res2);
              systemNotifyState.value = "已授权";
            }
          }));
        }
      };
      const playType = () => {
        pickerOptions.value = [
          [
            {
              label: "WIFI下自动播放",
              value: "WIFI下自动播放"
            },
            {
              label: "总是播放",
              value: "总是播放"
            },
            {
              label: "不播放",
              value: "不播放"
            }
          ]
        ];
        showPicker.value = true;
      };
      const onConfirm = (context) => {
        showPicker.value = false;
        playTypeItem.value = context.values[0].toString();
      };
      const oncancel = () => {
        showPicker.value = false;
      };
      onPageShow(() => {
        const res = uni.getAppAuthorizeSetting();
        const resu = uni.getSystemSetting();
        permissionList.value = permissionList.value.map((item) => {
          const newItem = new PermissionItem(Object.assign({}, item));
          if (item.code == "bluetoothAuthorized" && resu.bluetoothEnabled == true) {
            newItem.status = "已授权";
          } else {
            AuthState.value.forEach((auth) => {
              if (auth.code === res[item.code]) {
                newItem.status = auth.state;
              }
            });
          }
          return newItem;
        });
      });
      const __returned__ = { checked, showPicker, pickerOptions, playTypeItem, systemNotifyState, AuthState, permissionList, getSystemAuth, changeChecked, isChecked, getSystemNotify, playType, onConfirm, oncancel };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$5 = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "marginBottom": "20rpx" } }, "items": { ".container .content ": { "display": "flex", "flexDirection": "column", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "fui-input__wrap": { ".container .content .items ": { "!paddingTop": "20rpx", "!paddingRight": 0, "!paddingBottom": "20rpx", "!paddingLeft": 0 } }, "offline": { ".container .content .items ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingBottom": "10rpx" } }, "tips": { ".container .content .items ": { "color": "#999999", "fontSize": "24rpx" } }, "underline": { ".container .content ": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f5f5f5" } }, "l-picker": { ".container ": { "width": "100%" } } };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_switch = resolveEasycom(vue.resolveDynamicComponent("fui-switch"), __easycom_0$5);
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_2$2);
    const _component_l_picker = resolveEasycom(vue.resolveDynamicComponent("l-picker"), __easycom_3);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_4$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "items underline" }, [
          vue.createElementVNode("view", { class: "offline" }, [
            vue.createElementVNode("text", null, "离线提醒"),
            vue.createVNode(_component_fui_switch, {
              checked: $setup.checked,
              onChange: $setup.changeChecked,
              "onUpdate:checked": $setup.isChecked
            }, null, 8, ["checked"])
          ]),
          vue.createElementVNode("text", { class: "tips" }, "设备离线8小时后,推送消息到APP")
        ]),
        vue.createElementVNode("view", { class: "items" }, [
          vue.createVNode(_component_fui_input, {
            label: "自动播放",
            labelSize: 28,
            textAlign: "right",
            borderBottom: false,
            placeholderStyle: "font-size: 28rpx;",
            disabled: true,
            placeholder: $setup.playTypeItem,
            onClick: $setup.playType
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("text", null, [
                vue.createVNode(_component_fui_icon, {
                  name: "arrowright",
                  size: 48
                })
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["placeholder"]),
          vue.createElementVNode("text", { class: "tips" }, "摄像机视频是否自动播放")
        ])
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.permissionList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
              vue.createVNode(_component_fui_input, {
                label: item.name,
                labelSize: 28,
                textAlign: "right",
                borderBottom: true,
                placeholderStyle: item.status == "未授权" ? "font-size: 28rpx;color:red;" : "font-size: 28rpx;color:green;",
                disabled: true,
                placeholder: item.status,
                onClick: ($event) => $setup.getSystemAuth(item)
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("text", null, [
                    vue.createVNode(_component_fui_icon, {
                      name: "arrowright",
                      size: 48
                    })
                  ])
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["label", "placeholderStyle", "placeholder", "onClick"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createVNode(_component_fui_bottom_popup, { visible: $setup.showPicker }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_l_picker, {
            "cancel-btn": "取消",
            "confirm-btn": "确定",
            columns: $setup.pickerOptions,
            onCancel: $setup.oncancel,
            onConfirm: $setup.onConfirm
          }, null, 8, ["columns"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["visible"])
    ]);
  }
  const PagesMineSystemSettingSystemSetting = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["styles", [_style_0$5]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/systemSetting/systemSetting.uvue"]]);
  const _imports_0 = "/static/logo.png";
  const _style_0$4 = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "appinfo": { ".container ": { "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "logo": { ".container ": { "width": "150rpx", "height": "150rpx", "marginTop": "100rpx", "marginRight": 0, "marginBottom": "50rpx", "marginLeft": 0 } }, "title": { ".container ": { "fontSize": "30rpx", "fontWeight": "bold", "marginBottom": "50rpx" } }, "version": { ".container ": { "fontSize": "20rpx", "color": "#999999", "marginBottom": "50rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "30rpx", "paddingBottom": "20rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "item": { ".container .content ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f5f5f5", "paddingTop": "10rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": 0 } }, "copyright": { ".container ": { "display": "flex", "flexDirection": "column", "alignItems": "center", "marginTop": "200rpx" } }, "txt": { ".container .copyright ": { "fontSize": "15rpx", "color": "#999999" } } };
  const _sfc_main$4 = {};
  function _sfc_render$3(_ctx, _cache) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "appinfo" }, [
        vue.createElementVNode("image", {
          class: "logo",
          src: _imports_0
        }),
        vue.createElementVNode("text", { class: "title" }, "夜鹰智联"),
        vue.createElementVNode("text", { class: "version" }, "V1.0.1.250512")
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "用户协议"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            color: "#333",
            size: 55
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "隐私政策"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            color: "#333",
            size: 55
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "个人信息收集"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            color: "#333",
            size: 55
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "第三方共享"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            color: "#333",
            size: 55
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "检查更新"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            color: "#333",
            size: 55
          })
        ]),
        vue.createElementVNode("view", { class: "item" }, [
          vue.createElementVNode("text", null, "分享APP"),
          vue.createVNode(_component_fui_icon, {
            name: "arrowright",
            color: "#333",
            size: 55
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "copyright" }, [
        vue.createElementVNode("text", { class: "txt" }, "版权所有：夜鹰智联"),
        vue.createElementVNode("text", { class: "txt" }, "粤ICP备18088888号")
      ])
    ]);
  }
  const PagesMineAboutAbout = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["styles", [_style_0$4]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/about/about.uvue"]]);
  const name = "l-grid-item";
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "l-grid-item",
    props: {
      text: new UTSJSONObject({ type: String, required: false }),
      description: new UTSJSONObject({ type: String, required: false }),
      url: new UTSJSONObject({ type: String, required: false }),
      openType: new UTSJSONObject({ type: String, required: true, default: "navigateTo" }),
      icon: new UTSJSONObject({ type: String, required: false }),
      prefix: new UTSJSONObject({ type: String, required: false }),
      image: new UTSJSONObject({ type: String, required: false }),
      imageWidth: new UTSJSONObject({ type: String, required: false }),
      imageHeight: new UTSJSONObject({ type: String, required: false }),
      bgColor: new UTSJSONObject({ type: String, required: false }),
      padding: new UTSJSONObject({ type: String, required: false }),
      layout: new UTSJSONObject({ type: String, required: true, default: "vertical" }),
      dot: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      iconSize: new UTSJSONObject({ type: String, required: true, default: "48rpx" }),
      iconColor: new UTSJSONObject({ type: String, required: true, default: "rgba(0,0,0,0.88)" }),
      badge: new UTSJSONObject({ type: null, required: false }),
      borderColor: new UTSJSONObject({ type: String, required: false }),
      lStyle: new UTSJSONObject({ type: null, required: false }),
      lImageStyle: new UTSJSONObject({ type: null, required: false }),
      lTitleStyle: new UTSJSONObject({ type: null, required: false }),
      lDescriptionStyle: new UTSJSONObject({ type: null, required: false }),
      lClass: new UTSJSONObject({ type: String, required: false }),
      lClassIcon: new UTSJSONObject({ type: String, required: false })
    },
    emits: ["click"],
    setup(__props, _a) {
      var __expose = _a.expose, __emit = _a.emit;
      __expose();
      const emits = __emit;
      const props = __props;
      const parent = vue.inject("limeGrid", null);
      const instance = vue.getCurrentInstance();
      const index = vue.computed(() => {
        var _a2;
        return (_a2 = parent === null || parent === void 0 ? null : parent.children.value.indexOf(instance.uid)) !== null && _a2 !== void 0 ? _a2 : -1;
      });
      const column = vue.computed(() => {
        var _a2;
        return (_a2 = parent === null || parent === void 0 ? null : parent.props.column) !== null && _a2 !== void 0 ? _a2 : 0;
      });
      const gutter = vue.computed(() => {
        var _a2;
        return (_a2 = parent === null || parent === void 0 ? null : parent.props.gutter) !== null && _a2 !== void 0 ? _a2 : 0;
      });
      const width = vue.computed(() => {
        var _a2;
        return (_a2 = parent === null || parent === void 0 ? null : parent.width.value) !== null && _a2 !== void 0 ? _a2 : 0;
      });
      const hover = vue.computed(() => {
        var _a2;
        return (_a2 = parent === null || parent === void 0 ? null : parent.props.hover) !== null && _a2 !== void 0 ? _a2 : false;
      });
      const classes = vue.computed(() => {
        var _a2, _b;
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("".concat(name, "--").concat(props.layout), true);
        cls2.set("".concat(name, "--").concat((_a2 = parent === null || parent === void 0 ? null : parent.props.align) !== null && _a2 !== void 0 ? _a2 : "center"), true);
        cls2.set("".concat(name, "--bordered"), (_b = parent === null || parent === void 0 ? null : parent.props.border) !== null && _b !== void 0 ? _b : false);
        return cls2;
      });
      const size = vue.computed(() => {
        if (column.value > 4 || column.value == 0)
          return "small";
        return column.value < 4 ? "large" : "middle";
      });
      const imageClasses = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("".concat(name, "__image--").concat(size.value), true);
        return cls2;
      });
      const titleClasses = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("".concat(name, "__title--").concat(size.value), true);
        return cls2;
      });
      const innerImageStyle = vue.ref("");
      const styles = vue.computed(() => {
        var _a2, _b;
        const style = /* @__PURE__ */ new Map();
        const gridWidth = parent === null || parent === void 0 ? null : parent.props.gridWidth;
        if (gridWidth != null || width.value > 0 && column.value > 0) {
          const _width = (width.value - (column.value - 1) * gutter.value) / column.value;
          style.set("width", gridWidth !== null && gridWidth !== void 0 ? gridWidth : "".concat(_width, "px"));
        }
        if (index.value % column.value != column.value - 1) {
          style.set("margin-right", "".concat(gutter.value, "px"));
        }
        if (index.value >= column.value) {
          style.set("margin-top", "".concat(gutter.value, "px"));
        }
        if (props.borderColor != null) {
          style.set("border-color", props.borderColor);
        }
        const bgColor = (_a2 = props.bgColor) !== null && _a2 !== void 0 ? _a2 : parent === null || parent === void 0 ? null : parent.props.bgColor;
        if (bgColor != null) {
          style.set("background", bgColor);
        }
        const padding = (_b = props.padding) !== null && _b !== void 0 ? _b : parent === null || parent === void 0 ? null : parent.props.padding;
        if (padding != null) {
          style.set("padding", padding);
        }
        return style;
      });
      const imageStyle = vue.computed(() => {
        const style = /* @__PURE__ */ new Map();
        if (props.imageWidth != null) {
          style.set("width", props.imageWidth);
        }
        if (props.imageHeight != null) {
          style.set("height", props.imageHeight);
        }
        return style;
      });
      const onClick = (e2) => {
        emits("click", e2);
        if (props.url == null)
          return null;
        switch (props.openType) {
          case "switchTab":
            uni.switchTab({ url: props.url });
            break;
          case "reLaunch":
            uni.reLaunch({ url: props.url });
            break;
          case "redirectTo":
            uni.redirectTo({ url: props.url });
            break;
          default:
            uni.navigateTo({ url: props.url });
            break;
        }
      };
      vue.watchEffect(() => {
        vue.nextTick(() => {
          var _a2;
          innerImageStyle.value = (_a2 = props.lImageStyle) !== null && _a2 !== void 0 ? _a2 : "";
        });
      });
      vue.onBeforeMount(() => {
        if (instance != null && parent != null) {
          parent.children.value.push(instance.uid);
        }
      });
      vue.onUnmounted(() => {
        if (instance != null && parent != null) {
          parent.children.value = parent.children.value.filter((it2) => {
            return it2 != instance.uid;
          });
        }
      });
      const __returned__ = { emits, props, name, parent, instance, index, column, gutter, width, hover, classes, size, imageClasses, titleClasses, innerImageStyle, styles, imageStyle, onClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$3 = { "l-grid-item": { "": { "alignItems": "center", "paddingTop": "32rpx", "paddingRight": 0, "paddingBottom": "24rpx", "paddingLeft": 0, "flexDirection": "column", "backgroundImage": "none", "backgroundColor": "#ffffff", "width": "25%", "overflow": "visible" } }, "l-grid-item--bordered": { "": { "borderTopWidth": "0.5rpx", "borderRightWidth": "0.5rpx", "borderBottomWidth": "0.5rpx", "borderLeftWidth": "0.5rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#eeeeee", "borderRightColor": "#eeeeee", "borderBottomColor": "#eeeeee", "borderLeftColor": "#eeeeee" } }, "l-grid-item--horizontal": { "": { "paddingTop": "32rpx", "paddingRight": 0, "paddingBottom": "32rpx", "paddingLeft": 0, "flexDirection": "row", "justifyContent": "center" } }, "l-grid-item__content": { ".l-grid-item--horizontal ": { "marginTop": 0, "marginLeft": "24rpx" }, "": { "position": "relative", "marginTop": "16rpx" } }, "l-grid-item--hover": { "": { "backgroundColor": "rgba(0,0,0,0.02)" } }, "l-grid-item__title": { ".l-grid-item--center ": { "textAlign": "center" }, "": { "color": "rgba(0,0,0,0.88)", "fontSize": 14, "lineHeight": "44rpx" } }, "l-grid-item__description": { ".l-grid-item--center ": { "textAlign": "center" }, "": { "color": "rgba(0,0,0,0.45)", "fontSize": 12, "lineHeight": "40rpx" } }, "l-grid-item__icon": { "": { "alignItems": "center", "justifyContent": "center", "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.02)", "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx", "width": "96rpx", "height": "96rpx" } }, "l-grid-item__image": { "": { "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.02)", "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx", "width": "96rpx", "height": "96rpx" } }, "l-grid-item__image--small": { "": { "width": 32, "height": 32 } }, "l-grid-item__icon--small": { "": { "width": 32, "height": 32 } }, "l-grid-item__image--middle": { "": { "width": "80rpx", "height": "80rpx" } }, "l-grid-item__icon--middle": { "": { "width": "80rpx", "height": "80rpx" } }, "l-grid-item__title--small": { "": { "fontSize": 12 } }, "l-grid-item__title--middle": { "": { "fontSize": 12 } } };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_0$8);
    const _component_l_badge = resolveEasycom(vue.resolveDynamicComponent("l-badge"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", {
      ref: "gridRef",
      class: vue.normalizeClass(["l-grid-item", [$setup.classes, $props.lClass]]),
      onClick: $setup.onClick,
      "hover-stay-time": 200,
      "hover-class": $setup.hover ? "l-grid-item--hover" : "",
      style: vue.normalizeStyle([$setup.styles, $props.lStyle])
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        ($props.dot || $props.badge != null) && ($props.icon != null || $props.image != null || _ctx.$slots["icon"] != null) ? (vue.openBlock(), vue.createBlock(_component_l_badge, {
          key: 0,
          content: $props.badge,
          dot: $props.dot
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "icon", {}, () => [
              $props.icon != null ? (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 0,
                  class: vue.normalizeClass(["l-grid-item__icon", $setup.imageClasses])
                },
                [
                  vue.createVNode(_component_l_icon, {
                    "l-class": $props.lClassIcon,
                    prefix: $props.prefix,
                    name: $props.icon,
                    color: $props.iconColor,
                    size: $props.iconSize
                  }, null, 8, ["l-class", "prefix", "name", "color", "size"])
                ],
                2
                /* CLASS */
              )) : $props.image != null ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                class: vue.normalizeClass(["l-grid-item__image", $setup.imageClasses]),
                style: vue.normalizeStyle([$setup.imageStyle, $setup.innerImageStyle]),
                src: $props.image,
                mode: "aspectFill"
              }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true)
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["content", "dot"])) : $props.icon != null || $props.image != null || _ctx.$slots["icon"] != null ? vue.renderSlot(_ctx.$slots, "icon", { key: 1 }, () => [
          $props.icon != null ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass(["l-grid-item__icon", $setup.imageClasses])
            },
            [
              vue.createVNode(_component_l_icon, {
                "l-class": $props.lClassIcon,
                prefix: $props.prefix,
                name: $props.icon,
                color: $props.iconColor,
                size: $props.iconSize
              }, null, 8, ["l-class", "prefix", "name", "color", "size"])
            ],
            2
            /* CLASS */
          )) : $props.image != null ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 1,
            class: vue.normalizeClass(["l-grid-item__image", $setup.imageClasses]),
            style: vue.normalizeStyle([$setup.imageStyle, $setup.innerImageStyle]),
            src: $props.image,
            mode: "aspectFill"
          }, null, 14, ["src"])) : vue.createCommentVNode("v-if", true)
        ]) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", { class: "l-grid-item__content" }, [
          vue.renderSlot(_ctx.$slots, "text", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["l-grid-item__title", $setup.titleClasses]),
                style: vue.normalizeStyle([$props.lTitleStyle])
              },
              vue.toDisplayString($props.text),
              7
              /* TEXT, CLASS, STYLE */
            )
          ]),
          vue.renderSlot(_ctx.$slots, "description", {}, () => [
            vue.createElementVNode(
              "text",
              {
                class: "l-grid-item__description",
                style: vue.normalizeStyle([$props.lDescriptionStyle])
              },
              vue.toDisplayString($props.description),
              5
              /* TEXT, STYLE */
            )
          ])
        ])
      ]),
      vue.renderSlot(_ctx.$slots, "extra")
    ], 14, ["hover-class"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["styles", [_style_0$3]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-grid/components/l-grid-item/l-grid-item.uvue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "l-grid",
    props: {
      align: new UTSJSONObject({ type: String, required: true, default: "center" }),
      border: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      column: new UTSJSONObject({ type: Number, required: true, default: 4 }),
      gutter: new UTSJSONObject({ type: Number, required: true, default: 0 }),
      hover: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      inset: new UTSJSONObject({ type: Boolean, required: true, default: false }),
      gridWidth: new UTSJSONObject({ type: String, required: false }),
      padding: new UTSJSONObject({ type: String, required: false }),
      bgColor: new UTSJSONObject({ type: String, required: false }),
      wrap: new UTSJSONObject({ type: Boolean, required: true, default: true })
    },
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const props = __props;
      const clsses = vue.computed(() => {
        const cls2 = /* @__PURE__ */ new Map();
        cls2.set("l-grid--wrap", props.wrap);
        cls2.set("l-grid--inset", props.inset);
        cls2.set("l-grid--bordered", props.border && props.gutter == 0);
        return cls2;
      });
      const resizeRef = vue.ref(null);
      const width = vue.ref(0);
      const children = vue.ref([]);
      const resizeObserver = new UniResizeObserver((entries) => {
        const rect = entries[0].target.getBoundingClientRect();
        width.value = rect.width;
      });
      const stopWatch = vue.watch(() => {
        return resizeRef.value;
      }, (el = null) => {
        if (el == null)
          return null;
        resizeObserver.observe(el);
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          width.value = rect.width;
        }, 50);
      });
      vue.onUnmounted(() => {
        stopWatch();
        resizeObserver.disconnect();
      });
      vue.provide("limeGrid", {
        children,
        props,
        width
      });
      const __returned__ = { props, clsses, resizeRef, width, children, resizeObserver, stopWatch };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$2 = { "l-grid": { "": { "position": "relative", "overflow": "visible", "flexDirection": "row" } }, "l-grid--wrap": { "": { "flexWrap": "wrap" } }, "l-grid--inset": { "": { "marginTop": 0, "marginRight": "32rpx", "marginBottom": 0, "marginLeft": "32rpx", "borderTopLeftRadius": "18rpx", "borderTopRightRadius": "18rpx", "borderBottomRightRadius": "18rpx", "borderBottomLeftRadius": "18rpx", "overflow": "hidden" } } };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["l-grid", $setup.clsses]),
        ref: "resizeRef"
      },
      [
        vue.renderSlot(_ctx.$slots, "default")
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["styles", [_style_0$2]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-grid/components/l-grid/l-grid.uvue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "localFiles",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const __returned__ = {};
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$1 = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5" } } };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_grid_item = resolveEasycom(vue.resolveDynamicComponent("l-grid-item"), __easycom_0);
    const _component_l_grid = resolveEasycom(vue.resolveDynamicComponent("l-grid"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode(_component_l_grid, {
        column: 3,
        border: true,
        gutter: 20
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar2.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar3.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar4.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "最多四字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar5.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar2.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar3.png"
          }),
          vue.createVNode(_component_l_grid_item, {
            text: "标题文字",
            image: "https://tdesign.gtimg.com/mobile/demos/avatar4.png"
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesMineLocalFilesLocalFiles = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["styles", [_style_0$1]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/localFiles/localFiles.uvue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/mine/userInfo/userInfo", PagesMineUserInfoUserInfo);
  __definePage("pages/mine/userInfo/CancelAnAccount/CancelAnAccount", PagesMineUserInfoCancelAnAccountCancelAnAccount);
  __definePage("pages/mine/userInfo/changePhoneNumber/changePhoneNumber", PagesMineUserInfoChangePhoneNumberChangePhoneNumber);
  __definePage("pages/mine/userInfo/changePassword/changePassword", PagesMineUserInfoChangePasswordChangePassword);
  __definePage("pages/mine/rechargeDataTraffic/rechargeDataTraffic", PagesMineRechargeDataTrafficRechargeDataTraffic);
  __definePage("pages/mine/helpCenter/helpCenter", PagesMineHelpCenterHelpCenter);
  __definePage("pages/mine/helpCenter/questionDetail/questionDetail", PagesMineHelpCenterQuestionDetailQuestionDetail);
  __definePage("pages/message/messageDetail/messageDetail", PagesMessageMessageDetailMessageDetail);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/message/messageDeviceDetail/messageDeviceDetail", PagesMessageMessageDeviceDetailMessageDeviceDetail);
  __definePage("pages/message/messageSystem/messageSystem", PagesMessageMessageSystemMessageSystem);
  __definePage("pages/mine/myOrders/myOrders", PagesMineMyOrdersMyOrders);
  __definePage("pages/mine/myOrders/orderDetail/orderDetail", PagesMineMyOrdersOrderDetailOrderDetail);
  __definePage("pages/mine/feeback/feeback", PagesMineFeebackFeeback);
  __definePage("pages/mine/systemSetting/systemSetting", PagesMineSystemSettingSystemSetting);
  __definePage("pages/mine/about/about", PagesMineAboutAbout);
  __definePage("pages/mine/localFiles/localFiles", PagesMineLocalFilesLocalFiles);
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
