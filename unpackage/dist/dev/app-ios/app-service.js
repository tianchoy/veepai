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
    const id = "app-ios_RFrcF5";
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
  const _sfc_main$C = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _style_0$A = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column" } }, "content": { ".container ": { "position": "relative", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "width": "100%", "height": "400rpx", "overflow": "hidden" } }, "video-container": { ".container .content ": { "width": "100%", "height": "100%" } }, "video": { ".container .content ": { "width": "100%", "height": "100%", "objectFit": "cover", "marginBottom": 0 } }, "video-top-title": { ".container .content ": { "position": "absolute", "top": 0, "height": "60rpx", "width": "80%", "paddingTop": "15rpx", "paddingRight": 0, "paddingBottom": 0, "paddingLeft": "20rpx", "backgroundImage": "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor": "rgba(0,0,0,0)", "zIndex": 3 } }, "video-right-control": { ".container .content ": { "position": "absolute", "top": 0, "right": "10rpx", "display": "flex", "flexDirection": "column", "justifyContent": "space-around", "height": "100%", "alignItems": "center", "zIndex": 2 } }, "vedio-control": { ".container .content .video-right-control ": { "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" }, ".container .content .video-bottom-control ": { "marginTop": 0, "marginRight": "auto", "marginBottom": 0, "marginLeft": "auto", "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" } }, "vedio-control-icon": { ".container .content .video-right-control .vedio-control ": { "width": "100%", "height": "100%" }, ".container .content .video-bottom-control .vedio-control ": { "width": "100%", "height": "100%" } }, "video-bottom-control": { ".container .content ": { "position": "absolute", "bottom": "10rpx", "left": 0, "width": "100%", "height": "50rpx", "zIndex": 1 } } };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$B], ["styles", [_style_0$A]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/index/index.uvue"]]);
  const _sfc_main$B = /* @__PURE__ */ vue.defineComponent({
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
  const _imports_0$6 = "/static/dot1.png";
  const _style_0$z = { "l-date-strip": { "": { "height": 86, "backgroundColor": "#ffffff" } }, "l-date-strip__scroll": { "": { "flexDirection": "row" } }, "l-date-strip__item": { "": { "display": "flex", "flexDirection": "row", "paddingTop": 8, "paddingRight": 0, "paddingBottom": 8, "paddingLeft": 0, "boxSizing": "border-box" } }, "l-date-strip__item--week": { "": { "flex": 1 } }, "l-date-strip__grid": { ".l-date-strip__item--week ": { "flex": 1 }, ".l-date-strip__item--none ": { "width": 50 }, "": { "display": "flex", "flexDirection": "column", "marginTop": 0, "marginRight": "4rpx", "marginBottom": 0, "marginLeft": "4rpx", "transitionDuration": "300ms", "transitionProperty": "backgroundColor,color", "transitionTimingFunction": "linear" } }, "l-date-strip__grid-prefix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 14, "color": "rgba(0,0,0,0.45)" }, ".l-date-strip__grid--none ": { "paddingBottom": 4, "paddingTop": 4 }, ".l-date-strip__grid--circle ": { "paddingBottom": 4 } }, "l-date-strip__grid-day": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 16, "color": "rgba(0,0,0,0.88)", "fontWeight": "bold" } }, "l-date-strip__grid-suffix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "position": "absolute", "top": "50%", "transform": "translateY(60%)", "fontSize": 12, "color": "rgba(0,0,0,0.65)" } }, "l-date-strip__grid-info": { ".l-date-strip__grid--circle ": { "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99 }, "": { "display": "flex", "flex": 1, "justifyContent": "center", "alignItems": "center", "position": "relative" } }, "l-date-strip__grid--square": { "": { "borderTopLeftRadius": 5, "borderTopRightRadius": 5, "borderBottomRightRadius": 5, "borderBottomLeftRadius": 5, "paddingTop": 6, "paddingRight": 0, "paddingBottom": 6, "paddingLeft": 0 } }, "l-date-strip__grid--active-bg": { "": { "backgroundColor": "#3283ff" } }, "l-date-strip__grid--active-text": { "": { "color": "#FFFFFF" } }, "l-date-strip__grid--active-text-none": { "": { "color": "#3283ff" } }, "l-date-strip__grid--disabled": { "": { "opacity": 0.4 } }, "@TRANSITION": { "l-date-strip__grid": { "duration": "300ms", "property": "backgroundColor,color", "timingFunction": "linear" }, "l-date-strip__grid-prefix": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-day": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-suffix": { "duration": "200ms", "property": "color", "timingFunction": "linear" } } };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
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
                        src: _imports_0$6
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
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$A], ["styles", [_style_0$z]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue"]]);
  const ON_LOAD = "onLoad";
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
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
  const _sfc_main$A = /* @__PURE__ */ vue.defineComponent({
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
        for (let i = 0; i < length; i++) {
          const date = new Date(time);
          date.setDate(currentStartDate.getDate() + i);
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
          indices.forEach((i) => {
            const weekDate = addWeeks(currentRange.start, i);
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
        const v = day.date.getTime();
        emit("change", v);
        emit("select", v);
        emit("update:modelValue", v);
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
  const _style_0$y = { "l-date-strip": { "": { "height": 86, "backgroundColor": "#ffffff" } }, "l-date-strip__scroll": { "": { "flexDirection": "row" } }, "l-date-strip__item": { "": { "display": "flex", "flexDirection": "row", "paddingTop": 8, "paddingRight": 0, "paddingBottom": 8, "paddingLeft": 0, "boxSizing": "border-box" } }, "l-date-strip__item--week": { "": { "flex": 1 } }, "l-date-strip__grid": { ".l-date-strip__item--week ": { "flex": 1 }, ".l-date-strip__item--none ": { "width": 50 }, "": { "display": "flex", "flexDirection": "column", "marginTop": 0, "marginRight": "4rpx", "marginBottom": 0, "marginLeft": "4rpx", "transitionDuration": "300ms", "transitionProperty": "backgroundColor,color", "transitionTimingFunction": "linear" } }, "l-date-strip__grid-prefix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 14, "color": "rgba(0,0,0,0.45)" }, ".l-date-strip__grid--none ": { "paddingBottom": 4, "paddingTop": 4 }, ".l-date-strip__grid--circle ": { "paddingBottom": 4 } }, "l-date-strip__grid-day": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "fontSize": 16, "color": "rgba(0,0,0,0.88)", "fontWeight": "bold" } }, "l-date-strip__grid-suffix": { "": { "textAlign": "center", "transitionDuration": "200ms", "transitionProperty": "color", "transitionTimingFunction": "linear", "position": "absolute", "top": "50%", "transform": "translateY(60%)", "fontSize": 12, "color": "rgba(0,0,0,0.65)" } }, "l-date-strip__grid-info": { ".l-date-strip__grid--circle ": { "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99 }, "": { "display": "flex", "flex": 1, "justifyContent": "center", "alignItems": "center", "position": "relative" } }, "l-date-strip__grid--square": { "": { "borderTopLeftRadius": 5, "borderTopRightRadius": 5, "borderBottomRightRadius": 5, "borderBottomLeftRadius": 5, "paddingTop": 6, "paddingRight": 0, "paddingBottom": 6, "paddingLeft": 0 } }, "l-date-strip__grid--active-bg": { "": { "backgroundColor": "#3283ff" } }, "l-date-strip__grid--active-text": { "": { "color": "#FFFFFF" } }, "l-date-strip__grid--active-text-none": { "": { "color": "#3283ff" } }, "l-date-strip__grid--disabled": { "": { "opacity": 0.4 } }, "@TRANSITION": { "l-date-strip__grid": { "duration": "300ms", "property": "backgroundColor,color", "timingFunction": "linear" }, "l-date-strip__grid-prefix": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-day": { "duration": "200ms", "property": "color", "timingFunction": "linear" }, "l-date-strip__grid-suffix": { "duration": "200ms", "property": "color", "timingFunction": "linear" } } };
  function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_date_strip_item = resolveEasycom(vue.resolveDynamicComponent("l-date-strip-item"), __easycom_0$8);
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
        vue.renderList($setup.displayWeeks, (week, g) => {
          return vue.openBlock(), vue.createElementBlock("swiper-item", { key: g }, [
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
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$z], ["styles", [_style_0$y]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-date-strip/components/l-date-strip/l-date-strip.uvue"]]);
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
  const name$3 = "l-icon";
  const IconifyURL = "https://api.iconify.design/";
  const _sfc_main$z = /* @__PURE__ */ vue.defineComponent({
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
        cls2.set("".concat(name$3, "--font"), !isImage.value && !isIconify.value && !isSVG.value);
        cls2.set("".concat(name$3, "--image"), isImage.value || isIconify.value || isSVG.value);
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
      const __returned__ = { name: name$3, IconifyURL, $iconsHost, props, emits, $iconCollection, innerName, collectionIcon, webviewRef, hasHost, isIconify, isImage, isSVG, classes, styles, iconCode, isError, cacheMap, iconUrl, imageError, imageload };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$x = { "l-icon--font": { "": { "fontFamily": "l", "textAlign": "center" } }, "@FONT-FACE": [{ "fontFamily": "l", "src": 'url("/assets/t3.9658ea31.ttf")' }] };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$y], ["styles", [_style_0$x]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-icon/components/l-icon/l-icon.uvue"]]);
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
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
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
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
  const _style_0$w = { "l-daily-punch": { "": { "width": "100%" } }, "calender": { "": { "marginTop": 0, "marginRight": "30rpx", "marginBottom": 0, "marginLeft": "30rpx" } } };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$x], ["styles", [_style_0$w]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.uvue"]]);
  const _sfc_main$x = vue.defineComponent({
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
        for (let i = 11; i < 20; i++) {
          models.push("iphone".concat(i));
          models.push("iphone".concat(i, "mini"));
          models.push("iphone".concat(i, "pro"));
          models.push("iphone".concat(i, "promax"));
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
  const _style_0$v = { "fui-bottom__popup-wrap": { "": { "position": "fixed", "left": 0, "right": 0, "top": 0, "bottom": 0, "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "center", "transitionProperty": "opacity,visibility", "transitionTimingFunction": "ease-in-out", "transitionDuration": "0.3s", "visibility": "hidden", "borderBottomWidth": 0, "overflow": "hidden", "opacity": 0 } }, "fui-bottom__popup": { "": { "width": "100%", "transitionProperty": "transform,opacity,visibility", "transitionTimingFunction": "ease-in-out", "transitionDuration": "0.3s", "minHeight": "20rpx", "overflow": "hidden", "transform": "translateY(100%)", "display": "flex", "flexDirection": "row", "position": "relative" } }, "fui-bp__safe-weex": { "": { "paddingBottom": 34 } }, "@TRANSITION": { "fui-bottom__popup-wrap": { "property": "opacity,visibility", "timingFunction": "ease-in-out", "duration": "0.3s" }, "fui-bottom__popup": { "property": "transform,opacity,visibility", "timingFunction": "ease-in-out", "duration": "0.3s" } } };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_6$1 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$w], ["styles", [_style_0$v]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.uvue"]]);
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
  const _sfc_main$w = vue.defineComponent({
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
  const _style_0$u = { "fui-icon": { "": { "fontFamily": "fuiFont" } }, "fui-icon__color": { "": { "!color": "#333333" } }, "fui-icon__active-color": { "": { "!color": "#465CFF" } }, "fui-icon__fontsize": { "": { "!fontSize": "64rpx", "!lineHeight": "64rpx" } }, "@FONT-FACE": [{ "fontFamily": "fuiFont", "src": 'url("/assets/fui-icon.9165208c.ttf")' }] };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$v], ["styles", [_style_0$u]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue"]]);
  const _sfc_main$v = vue.defineComponent({
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
      radioClick(e) {
        e.stopPropagation();
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
  const _style_0$t = { "fui-radio__input": { "": { "width": "40rpx", "height": "40rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "display": "flex", "boxSizing": "border-box", "flexShrink": 0, "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "overflow": "hidden", "position": "relative" } }, "fui-radio__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-radio__scale-center": { "": { "transformOrigin": "center center" } }, "fui-radio__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-radio__active-bgcolor": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF" } }, "fui-radio__color": { "": { "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-radio__normal-border": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-radio__background": { "": { "!backgroundImage": "none", "!backgroundColor": "#ffffff" } }, "fui-radio__mark-color": { "": { "!borderBottomColor": "#ffffff", "!borderRightColor": "#ffffff" } }, "fui-check__mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "boxSizing": "border-box", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%" } }, "fui-check__mark-circle": { "": { "width": "16rpx", "height": "16rpx", "borderTopLeftRadius": "16rpx", "borderTopRightRadius": "16rpx", "borderBottomRightRadius": "16rpx", "borderBottomLeftRadius": "16rpx" } }, "fui-radio__disabled": { "": { "opacity": 0.6 } } };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_3$2 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$u], ["styles", [_style_0$t]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-radio/fui-radio.uvue"]]);
  const _sfc_main$u = vue.defineComponent({
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
  const _style_0$s = { "fui-list__cell": { "": { "position": "relative", "width": "100%", "display": "flex", "flexDirection": "row", "boxSizing": "border-box" } }, "fui-list__cell-inner": { "": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "boxSizing": "border-box" } }, "fui-cell__arrow": { "": { "height": "40rpx", "width": "40rpx", "borderTopWidth": 3, "borderRightWidth": 3, "borderBottomWidth": 0, "borderLeftWidth": 0, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "transform": "rotate(45deg) scale(0.5)", "borderTopLeftRadius": "4rpx", "borderTopRightRadius": "4rpx", "borderBottomRightRadius": "4rpx", "borderBottomLeftRadius": "4rpx", "flexShrink": 0, "marginLeft": "auto", "boxSizing": "border-box", "transformOrigin": "center center", "marginRight": "-5.8579rpx" } }, "fui-cell__border-top": { "": { "position": "absolute", "top": 0, "height": 0.5, "zIndex": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 0", "pointerEvents": "none" } }, "fui-cell__border-bottom": { "": { "position": "absolute", "bottom": 0, "height": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 100%", "zIndex": 1, "pointerEvents": "none" } }, "fui-cell__border-color": { "": { "!backgroundColor": "#EEEEEE" } }, "fui-list__cell-background": { "": { "!backgroundColor": "#FFFFFF" } }, "fui-list__cell-highlight": { "": { "!backgroundColor": "rgba(0,0,0,0.2)" } }, "fui-list__cell-padding": { "": { "!paddingTop": "32rpx", "!paddingRight": "32rpx", "!paddingBottom": "32rpx", "!paddingLeft": "32rpx" } }, "fui-list__cell-arrowcolor": { "": { "!borderTopColor": "#B2B2B2", "!borderRightColor": "#B2B2B2", "!borderBottomColor": "#B2B2B2", "!borderLeftColor": "#B2B2B2" } }, "fui-list__cell-bleft": { "": { "!left": "32rpx" } } };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_4$2 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$t], ["styles", [_style_0$s]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.uvue"]]);
  const _sfc_main$t = vue.defineComponent({
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
  const _style_0$r = { "fui-label__wrap": { "": { "boxSizing": "border-box" } }, "fui-label__full": { "": { "width": "100%" } } };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$s], ["styles", [_style_0$r]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-label/fui-label.uvue"]]);
  const _sfc_main$s = vue.defineComponent({
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
      radioChange(e) {
        this.$emit("change", e);
        this.$emit("update:modelValue", e);
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
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_radio_group = vue.resolveComponent("radio-group");
    return vue.openBlock(), vue.createBlock(_component_radio_group, { name: $props.name }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$r], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.uvue"]]);
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
  function isNumber$1(value) {
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
    set(name2, locale2) {
      localeState.locales.set(name2, locale2);
    }
    has(name2) {
      return localeState.locales.has(name2);
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
      const parsedNumber = isNumber$1(digits[index]) ? digits[index] : parseInt("".concat(digits[index]), 10);
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
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
      const getValue = (e) => {
        const selectedItem = UTS.arrayFind(radioItems.value, (item) => {
          return item.iccid == e;
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
      const msgSystem = () => {
        uni.navigateTo({
          url: "/pages/message/messageSystem/messageSystem"
        });
      };
      vue.onMounted(() => {
        currentInfo();
      });
      const __returned__ = { checkIns, today, showCalendar, isShowMoreDevice, currentDay, activeTab, minDate, maxDate, customFormat, onChange, select, change, ShowCalendar, hideCalendar, showMoreDevice, closePopup, currentDeviceInfo, radioItems, getValue, currentInfo, msgSystem };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$5 = "/static/down.png";
  const _imports_1$2 = "/static/notice.png";
  const _imports_1$1 = "/static/vedio.png";
  const _imports_3$1 = "/static/people.png";
  const _imports_4 = "/static/mobile.png";
  const _style_0$q = { "container": { "": { "width": "100%", "height": "100%", "position": "relative", "backgroundColor": "#f3f3f3" } }, "data-strip": { ".container ": { "width": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center", "backgroundColor": "#ffffff", "paddingRight": "20rpx" } }, "rili": { ".container .data-strip ": { "flex": 3, "height": "95rpx" } }, "down": { ".container .data-strip ": { "width": "32rpx", "height": "32rpx" }, ".container .content-box .sub-nav .today ": { "width": "25rpx", "height": "25rpx" } }, "content-box": { ".container ": { "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "sub-nav": { ".container .content-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "today": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "width": "140rpx" } }, "notice": { ".container .content-box .sub-nav .select ": { "width": "48rpx", "height": "48rpx" } }, "tab-content": { ".container .content-box ": { "width": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "item-content": { ".container .content-box .tab-content ": { "width": "100%", "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "marginTop": "30rpx" } }, "title-box": { ".container .content-box .tab-content .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "30rpx" } }, "title": { ".container .content-box .tab-content .item-content .title-box ": { "fontSize": "30rpx", "color": "#333333", "fontWeight": "bold" } }, "more": { ".container .content-box .tab-content .item-content .title-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "item-detail": { ".container .content-box .tab-content .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "item-left": { ".container .content-box .tab-content .item-content .item-detail ": { "display": "flex", "flexDirection": "row" } }, "device-img": { ".container .content-box .tab-content .item-content .item-detail .item-left ": { "width": "200rpx", "height": "100rpx", "marginRight": "20rpx" } }, "item-info": { ".container .content-box .tab-content .item-content .item-detail .item-left ": { "display": "flex", "flexDirection": "column", "alignItems": "flex-start", "justifyContent": "space-between" } }, "item-icon": { ".container .content-box .tab-content .item-content .item-detail ": { "width": "50rpx", "height": "50rpx" } }, "calendar-box": { ".container ": { "width": "100%", "backgroundColor": "#ffffff" } }, "btn-chanel-box": { ".container .calendar-box ": { "position": "absolute", "width": "85%", "bottom": "45rpx", "left": "60rpx", "borderTopLeftRadius": "50rpx", "borderTopRightRadius": "50rpx", "borderBottomRightRadius": "50rpx", "borderBottomLeftRadius": "50rpx" } }, "popup-title": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingTop": 0, "paddingRight": "40rpx", "paddingBottom": 0, "paddingLeft": "40rpx" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "30rpx", "paddingRight": 0, "paddingBottom": "30rpx", "paddingLeft": 0, "position": "relative" } }, "fui-sub__title": { ".container ": { "textAlign": "center", "fontSize": "24rpx", "color": "#7F7F7F", "transform": "scale(0.9)" } }, "fui-scroll__view": { ".container ": { "width": "100%", "height": "50%" } }, "fui-list__cell": { ".container ": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } } };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_date_strip = resolveEasycom(vue.resolveDynamicComponent("l-date-strip"), __easycom_0$7);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_2);
    const _component_l_daily_punch = resolveEasycom(vue.resolveDynamicComponent("l-daily-punch"), __easycom_0$6);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_6$1);
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$5);
    const _component_fui_radio = resolveEasycom(vue.resolveDynamicComponent("fui-radio"), __easycom_3$2);
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
          src: _imports_0$5
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
              src: _imports_0$5
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
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$q], ["styles", [_style_0$q]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/message.uvue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "mine",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
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
      const helpCenter = () => {
        uni.navigateTo({
          url: "/pages/mine/helpCenter/helpCenter"
        });
      };
      const __returned__ = { userInfo, rechargeDataTraffic, helpCenter };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _imports_0$4 = "/static/mine/local.png";
  const _imports_1 = "/static/mine/cloud.png";
  const _imports_2 = "/static/mine/msgList.png";
  const _imports_3 = "/static/mine/user.png";
  const _imports_0$3 = "/static/mine/right.png";
  const _imports_5 = "/static/mine/liuliang.png";
  const _imports_6 = "/static/mine/order.png";
  const _imports_7 = "/static/mine/quetion.png";
  const _imports_8 = "/static/mine/online.png";
  const _imports_9 = "/static/mine/advice.png";
  const _imports_10 = "/static/mine/setting.png";
  const _imports_11 = "/static/mine/about.png";
  const _style_0$p = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column", "backgroundColor": "#f1f1f1" } }, "files": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "width": "100%", "height": "100rpx", "backgroundColor": "#ffffff", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "paddingTop": "70rpx", "paddingRight": "80rpx", "paddingBottom": "70rpx", "paddingLeft": "80rpx", "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0 } }, "file": { ".container .files ": { "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "fileIcon": { ".container .files .file ": { "width": "48rpx", "height": "48rpx", "marginBottom": "15rpx" } }, "file-text": { ".container .files .file ": { "fontSize": "20rpx", "color": "#333333", "fontWeight": "bold" } }, "tools-list": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "15rpx", "borderTopRightRadius": "15rpx", "borderBottomRightRadius": "15rpx", "borderBottomLeftRadius": "15rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "item": { ".container .tools-list ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "height": "100rpx", "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "info": { ".container .tools-list .item ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "40rpx" } }, "item-icon": { ".container .tools-list .item .info ": { "width": "48rpx", "height": "48rpx" } }, "item-text": { ".container .tools-list .item .info ": { "fontSize": "25rpx", "color": "#333333", "marginLeft": "20rpx" } }, "right-icon": { ".container .tools-list .item ": { "width": "35rpx", "height": "35rpx" } }, "no-bottom": { ".container .tools-list ": { "borderBottomWidth": "medium", "borderBottomStyle": "none", "borderBottomColor": "#000000" } } };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "files" }, [
        vue.createElementVNode("view", { class: "file" }, [
          vue.createElementVNode("image", {
            class: "fileIcon",
            src: _imports_0$4,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
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
              src: _imports_0$3,
              mode: "aspectFit"
            })
          ])
        ])
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$p], ["styles", [_style_0$p]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/mine.uvue"]]);
  const _sfc_main$p = vue.defineComponent({
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
  const _style_0$o = { "fui-switch__input": { "": { "flexShrink": 0 } }, "fui-switch__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-switch__scale-center": { "": { "transformOrigin": "center center" } }, "fui-switch__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-switch__size-switch": { "": { "width": 52, "height": 32 } }, "fui-switch__size-checkbox": { "": { "width": "40rpx", "height": "40rpx" } }, "fui-switch__checkbox-self": { "": { "width": "40rpx", "height": "40rpx", "borderTopLeftRadius": 40, "borderTopRightRadius": 40, "borderBottomRightRadius": 40, "borderBottomLeftRadius": 40, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "relative", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopColor": "#CCCCCC", "borderRightColor": "#CCCCCC", "borderBottomColor": "#CCCCCC", "borderLeftColor": "#CCCCCC", "boxSizing": "border-box", "overflow": "hidden" } }, "fui-switch__input-def": { "": { "position": "relative", "width": 52, "height": 32, "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#CCCCCC", "borderRightColor": "#CCCCCC", "borderBottomColor": "#CCCCCC", "borderLeftColor": "#CCCCCC", "borderTopLeftRadius": 16, "borderTopRightRadius": 16, "borderBottomRightRadius": 16, "borderBottomLeftRadius": 16, "boxSizing": "border-box" } }, "fui-switch__normal-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#dfdfdf" } }, "fui-switch__checked-color": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-switch__normal-bcolor": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-switch__input-before": { "": { "position": "absolute", "top": 0, "left": 0, "width": 50, "height": 30, "borderTopLeftRadius": 15, "borderTopRightRadius": 15, "borderBottomRightRadius": 15, "borderBottomLeftRadius": 15, "transitionProperty": "transform", "transitionDuration": "0.3s" } }, "fui-switch__before-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__input-after": { "": { "position": "absolute", "top": 0, "left": 0, "width": 30, "height": 30, "borderTopLeftRadius": 15, "borderTopRightRadius": 15, "borderBottomRightRadius": 15, "borderBottomLeftRadius": 15, "boxShadow": "0 0 6rpx rgba(0, 0, 0, 0.4)", "transitionProperty": "transform", "transitionDuration": "0.3s", "display": "flex", "alignItems": "center", "justifyContent": "center", "transform": "translateX(0)" } }, "fui-switch__after-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__input--before": { "": { "transform": "scale(0)" } }, "fui-switch__input--after": { "": { "transform": "translateX(20px)" } }, "fui-switch__check-mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%", "boxSizing": "border-box" } }, "fui-switch__circle-bg": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFFFFF" } }, "fui-switch__checkbox-disabled": { "": { "opacity": 0.6 } }, "@TRANSITION": { "fui-switch__input-before": { "property": "transform", "duration": "0.3s" }, "fui-switch__input-after": { "property": "transform", "duration": "0.3s" } } };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["styles", [_style_0$o]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-switch/fui-switch.uvue"]]);
  const _sfc_main$o = vue.defineComponent({
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
  const _style_0$n = { "fui-button__wrap": { "": { "position": "relative", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "boxSizing": "border-box", "overflow": "hidden" } }, "fui-button__flex-1": { "": { "width": "100%" } }, "fui-button__opacity": { "": { "opacity": 0.5 } }, "fui-button__hover": { "": { "position": "absolute", "left": 0, "right": 0, "top": 0, "bottom": 0, "backgroundColor": "rgba(0,0,0,0.2)", "zIndex": 2, "borderTopLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0, "borderBottomLeftRadius": 0, "visibility": "hidden", "pointerEvents": "none" } }, "fui-button__spin": { "": { "width": "32rpx", "height": "32rpx", "borderTopWidth": 2, "borderRightWidth": 2, "borderBottomWidth": 2, "borderLeftWidth": 2, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "transitionDuration": "600ms", "transitionProperty": "transform", "transitionTimingFunction": "linear", "transform": "rotate(0deg)", "boxSizing": "border-box", "marginRight": "8rpx", "position": "relative" } }, "fui-button__spin-dot": { "": { "position": "absolute", "width": "12rpx", "height": "12rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx", "left": 0, "top": 0 } }, "fui-button__text": { "": { "textAlign": "center" } }, "fui-text__bold": { "": { "fontWeight": "bold" } }, "fui-button__link": { "": { "!borderTopColor": "rgba(0,0,0,0)", "!borderRightColor": "rgba(0,0,0,0)", "!borderBottomColor": "rgba(0,0,0,0)", "!borderLeftColor": "rgba(0,0,0,0)", "!backgroundColor": "rgba(0,0,0,0)" } }, "fui-button__primary": { "": { "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF", "!backgroundImage": "none", "!backgroundColor": "#465CFF" } }, "fui-button__success": { "": { "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F", "!backgroundImage": "none", "!backgroundColor": "#09BE4F" } }, "fui-button__warning": { "": { "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703", "!backgroundImage": "none", "!backgroundColor": "#FFB703" } }, "fui-button__danger": { "": { "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B", "!backgroundImage": "none", "!backgroundColor": "#FF2B2B" } }, "fui-button__purple": { "": { "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF", "!backgroundImage": "none", "!backgroundColor": "#6831FF" } }, "fui-button__gray": { "": { "!borderTopColor": "#F8F8F8", "!borderRightColor": "#F8F8F8", "!borderBottomColor": "#F8F8F8", "!borderLeftColor": "#F8F8F8", "!backgroundImage": "none", "!backgroundColor": "#F8F8F8" } }, "fui-btn__gray-color": { "": { "!color": "#465CFF" } }, "fui-button__height": { "": { "!height": "96rpx" } }, "fui-button__height-text": { "": { "!height": "96rpx", "!lineHeight": "96rpx" } }, "fui-button__size": { "": { "!fontSize": "32rpx" } }, "fui-button__radius": { "": { "!borderTopLeftRadius": "16rpx", "!borderTopRightRadius": "16rpx", "!borderBottomRightRadius": "16rpx", "!borderBottomLeftRadius": "16rpx" } }, "@TRANSITION": { "fui-button__spin": { "duration": "600ms", "property": "transform", "timingFunction": "linear" } } };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["styles", [_style_0$n]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-button/fui-button.uvue"]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _style_0$m = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#f3f3f3", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "title": { ".container ": { "fontSize": "30rpx", "color": "#333333", "paddingTop": "50rpx", "paddingRight": 0, "paddingBottom": "10rpx", "paddingLeft": "20rpx" } }, "info": { ".container ": { "backgroundImage": "none", "backgroundColor": "#ffffff", "paddingTop": "10rpx", "paddingRight": "30rpx", "paddingBottom": "10rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx" } }, "info-item": { ".container .info ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "icon": { ".container .info .info-item ": { "width": "30rpx", "height": "30rpx" } }, "switch-state": { ".container .info .info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "phone": { ".container .info .info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "nobottom": { ".container .info ": { "borderBottomWidth": "medium", "borderBottomStyle": "none", "borderBottomColor": "#000000" } }, "btn-box": { ".container ": { "marginTop": "200rpx" } } };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_switch = resolveEasycom(vue.resolveDynamicComponent("fui-switch"), __easycom_0$4);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
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
              src: _imports_0$3,
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
            src: _imports_0$3,
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
            src: _imports_0$3,
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
  const PagesMineUserInfoUserInfo = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["styles", [_style_0$m]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/userInfo.uvue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _imports_0$2 = "/static/error_big.png";
  const _style_0$l = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#F5F5F5", "display": "flex", "flexDirection": "column", "alignItems": "center", "paddingTop": "100rpx", "paddingRight": "100rpx", "paddingBottom": "100rpx", "paddingLeft": "100rpx" } }, "content": { ".container ": { "marginTop": "50rpx", "marginRight": 0, "marginBottom": "50rpx", "marginLeft": 0 } }, "content-word": { ".container .content ": { "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0 } }, "close": { ".container ": { "width": "120rpx", "height": "120rpx" } }, "btn-box": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "width": "100%" } }, "btn": { ".container .btn-box ": { "width": "45%" } } };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("image", {
        src: _imports_0$2,
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
  const PagesMineUserInfoCancelAnAccountCancelAnAccount = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["styles", [_style_0$l]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/CancelAnAccount/CancelAnAccount.uvue"]]);
  const _sfc_main$l = vue.defineComponent({
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
      onKeyboardheightchange(e) {
        this.$emit("keyboardheightchange", e);
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
  const _style_0$k = { "fui-input__wrap": { "": { "width": "100%", "display": "flex", "flexDirection": "row", "alignItems": "center", "position": "relative", "boxSizing": "border-box", "overflow": "visible" } }, "fui-input__border-uvue": { "": { "borderTopWidth": 0.5, "borderRightWidth": 0.5, "borderBottomWidth": 0.5, "borderLeftWidth": 0.5, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid" } }, "fui-input__border-color": { "": { "!borderTopColor": "#EEEEEE", "!borderRightColor": "#EEEEEE", "!borderBottomColor": "#EEEEEE", "!borderLeftColor": "#EEEEEE" } }, "fui-input__background": { "": { "!backgroundImage": "none", "!backgroundColor": "#EEEEEE" } }, "fui-input__border-top": { "": { "position": "absolute", "top": 0, "height": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 0", "zIndex": 1, "pointerEvents": "none" } }, "fui-input__border-bottom": { "": { "position": "absolute", "bottom": 0, "height": 1, "transform": "scaleY(0.5)", "transformOrigin": "0 100%", "zIndex": 1, "pointerEvents": "none" } }, "fui-input__required": { "": { "position": "absolute", "left": "12rpx", "height": "100%", "display": "flex", "alignItems": "center", "justifyContent": "center" } }, "fui-input__asterisk-text": { "": { "fontSize": "32rpx", "height": "32rpx", "lineHeight": "32rpx" } }, "fui-input__asterisk-color": { "": { "!color": "#FF2B2B" } }, "fui-input__label": { "": { "paddingRight": "12rpx", "flexShrink": 0 } }, "fui-input__label-size": { "": { "!fontSize": "32rpx", "!lineHeight": "32rpx" } }, "fui-input__self": { "": { "flex": 1, "paddingRight": "12rpx", "overflow": "visible", "backgroundColor": "rgba(0,0,0,0)", "boxSizing": "border-box" } }, "fui-input__size": { "": { "!fontSize": "32rpx" } }, "fui-input__clear-wrap": { "": { "width": "32rpx", "height": "32rpx", "transform": "rotate(45deg) scale(1.1)", "position": "relative", "flexShrink": 0, "borderTopLeftRadius": "32rpx", "borderTopRightRadius": "32rpx", "borderBottomRightRadius": "32rpx", "borderBottomLeftRadius": "32rpx" } }, "fui-input__clear": { "": { "width": "32rpx", "height": "32rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "absolute", "left": 0, "top": 0, "transform": "scale(0.5)" } }, "fui-input__clear-a": { "": { "width": "32rpx", "borderTopWidth": "2rpx", "borderRightWidth": "2rpx", "borderBottomWidth": "2rpx", "borderLeftWidth": "2rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ffffff", "borderRightColor": "#ffffff", "borderBottomColor": "#ffffff", "borderLeftColor": "#ffffff", "backgroundColor": "#ffffff", "boxSizing": "border-box" } }, "fui-input__clear-b": { "": { "height": "32rpx", "borderTopWidth": "2rpx", "borderRightWidth": "2rpx", "borderBottomWidth": "2rpx", "borderLeftWidth": "2rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#ffffff", "borderRightColor": "#ffffff", "borderBottomColor": "#ffffff", "borderLeftColor": "#ffffff", "backgroundColor": "#ffffff", "boxSizing": "border-box" } }, "fui-input__placeholder": { "": { "color": "#CCCCCC", "overflow": "visible" } }, "fui-input__disabled": { "": { "pointerEvents": "none" } }, "fui-input__disabled-styl": { "": { "opacity": 0.6 } } };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["styles", [_style_0$k]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-input/fui-input.uvue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _style_0$j = { "container": { "": { "height": "100%", "backgroundImage": "none", "backgroundColor": "#f3f3f3", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "10rpx", "borderTopRightRadius": "10rpx", "borderBottomRightRadius": "10rpx", "borderBottomLeftRadius": "10rpx" } }, "icon": { ".container .content ": { "width": "40rpx", "height": "40rpx", "marginRight": "10rpx" } } };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$5);
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_1$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
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
  const PagesMineUserInfoChangePhoneNumberChangePhoneNumber = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["styles", [_style_0$j]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
      const updateOldPassword = (e) => {
        oldPassword.value = e;
        updateBtnState();
      };
      const updateNewPassword = (e) => {
        newPassword.value = e;
        errorMsg.value = "";
        if (e.length > 0 && !verPassword(e)) {
          errorMsg.value = "密码格式不符合要求";
        } else if (confirmPassword.value.length > 0 && e != confirmPassword.value) {
          errorMsg.value = "两次输入的密码不一致";
        }
        updateBtnState();
      };
      const updateConfirmPassword = (e) => {
        confirmPassword.value = e;
        errorMsg.value = "";
        if (e.length > 0) {
          if (!verPassword(e)) {
            errorMsg.value = "确认密码格式不符合要求";
          } else if (e != newPassword.value) {
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
  const _style_0$i = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "50rpx", "paddingRight": "20rpx", "paddingBottom": "50rpx", "paddingLeft": "20rpx" } }, "fui-input__label-size": { ".container ": { "!fontSize": "26rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "tips": { ".container ": { "marginTop": "40rpx", "marginRight": 0, "marginBottom": "40rpx", "marginLeft": 0 } }, "tips-word": { ".container .tips ": { "fontSize": "30rpx", "color": "#999999" } }, "error-msg": { ".container ": { "marginTop": "10rpx", "color": "#e64340", "fontSize": "24rpx" } } };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_1$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
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
  const PagesMineUserInfoChangePasswordChangePassword = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["styles", [_style_0$i]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/userInfo/changePassword/changePassword.uvue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
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
          var _a2, _b, _c, _d, _e;
          if (percent.value >= 0) {
            if (props.infoType == "inner") {
              const rect = yield (_a2 = progressInnerRef.value) === null || _a2 === void 0 ? null : _a2.getBoundingClientRectAsync();
              const textRect = yield (_b = textRef.value) === null || _b === void 0 ? null : _b.getBoundingClientRectAsync();
              const width = props.showInfo ? Math.max(percent.value, (_c = Math.max((rect === null || rect === void 0 ? null : rect.height) / (rect === null || rect === void 0 ? null : rect.width), (textRect === null || textRect === void 0 ? null : textRect.width) / (rect === null || rect === void 0 ? null : rect.width)) * 100) !== null && _c !== void 0 ? _c : 10) : percent.value;
              (_d = progressBgRef.value) === null || _d === void 0 ? null : _d.style.setProperty("width", "".concat(width, "%"));
            } else {
              (_e = progressBgRef.value) === null || _e === void 0 ? null : _e.style.setProperty("width", "".concat(percent.value, "%"));
            }
          }
        });
      });
      const __returned__ = { props, percent, classes, textRef, progressBgRef, styles, textStyle, innerStyle, progressInnerRef };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$h = { "l-progress": { "": { "flexDirection": "row" } }, "l-progress-bg": { "": { "height": 4, "position": "relative", "backgroundColor": "#3283ff", "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99, "transitionProperty": "width", "transitionDuration": "300ms", "transitionTimingFunction": "cubic-bezier(0,0,0.15,1)", "justifyContent": "center" }, ".l-progress--inner ": { "height": 20 } }, "l-progress__inner-text": { ".l-progress-bg ": { "paddingTop": 0, "paddingRight": "8rpx", "paddingBottom": 0, "paddingLeft": "8rpx", "color": "#FFFFFF", "fontSize": 10, "whiteSpace": "nowrap" } }, "l-progress__inner": { "": { "flex": 1, "alignSelf": "center", "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99, "backgroundColor": "rgba(0,0,0,0.06)" } }, "@TRANSITION": { "l-progress-bg": { "property": "width", "duration": "300ms", "timingFunction": "cubic-bezier(0,0,0.15,1)" } } };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["styles", [_style_0$h]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-progress/components/l-progress/l-progress.uvue"]]);
  const { registerUTSInterface, initUTSProxyClass, initUTSProxyFunction, initUTSPackageName, initUTSIndexClassName, initUTSClassName } = uni;
  const name$2 = "limeClipboard";
  const moduleName = "lime-clipboard 剪贴板";
  const moduleType = "";
  const errMsg = "";
  const is_uni_modules = true;
  const pkg = /* @__PURE__ */ initUTSPackageName(name$2, is_uni_modules);
  const cls = /* @__PURE__ */ initUTSIndexClassName(name$2, is_uni_modules);
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
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
      const getValue = (e) => {
        const selectedItem = UTS.arrayFind(radioItems.value, (item) => {
          return item.iccid == e;
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
  const _style_0$g = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "device-total": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between" } }, "device-total-title": { ".container .device-total ": { "display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center" } }, "device-total-title-color": { ".container .device-total .device-total-title ": { "color": "#999999" } }, "device-info-box": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "30rpx", "paddingRight": "40rpx", "paddingBottom": "30rpx", "paddingLeft": "40rpx", "marginTop": "20rpx", "marginRight": 0, "marginBottom": "20rpx", "marginLeft": 0, "display": "flex", "flexDirection": "column" } }, "device-title": { ".container .device-info-box ": { "fontSize": "35rpx" } }, "device-info-item": { ".container .device-info-box ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "marginTop": "20rpx" } }, "iccid-info": { ".container .device-info-box .device-info-item ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "add-style": { ".container .device-info-box ": { "paddingBottom": "60rpx", "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#999999", "marginBottom": "60rpx" } }, "progess": { ".container .device-info-box ": { "marginTop": "10rpx", "marginRight": 0, "marginBottom": "10rpx", "marginLeft": 0 } }, "btn-box": { ".container ": { "marginTop": "60rpx" } }, "popup-title": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "paddingTop": 0, "paddingRight": "40rpx", "paddingBottom": 0, "paddingLeft": "40rpx" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "30rpx", "paddingRight": 0, "paddingBottom": "30rpx", "paddingLeft": 0, "position": "relative" } }, "fui-sub__title": { ".container ": { "textAlign": "center", "fontSize": "24rpx", "color": "#7F7F7F", "transform": "scale(0.9)" } }, "fui-scroll__view": { ".container ": { "width": "100%", "height": "50%" } }, "fui-list__cell": { ".container ": { "flex": 1, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } } };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$5);
    const _component_l_progress = resolveEasycom(vue.resolveDynamicComponent("l-progress"), __easycom_1$1);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
    const _component_fui_radio = resolveEasycom(vue.resolveDynamicComponent("fui-radio"), __easycom_3$2);
    const _component_fui_list_cell = resolveEasycom(vue.resolveDynamicComponent("fui-list-cell"), __easycom_4$2);
    const _component_fui_label = resolveEasycom(vue.resolveDynamicComponent("fui-label"), __easycom_4$1);
    const _component_fui_radio_group = resolveEasycom(vue.resolveDynamicComponent("fui-radio-group"), __easycom_6);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_6$1);
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
  const PagesMineRechargeDataTrafficRechargeDataTraffic = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["styles", [_style_0$g]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/rechargeDataTraffic/rechargeDataTraffic.uvue"]]);
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
  function isPercentage(n = null) {
    return isString(n) && n.indexOf("%") != -1;
  }
  function isOnePointZero(n = null) {
    return isString(n) && n.indexOf(".") != -1 && parseFloat(n) == 1;
  }
  function bound01(n = null, max) {
    if (!(isNumber(n) || isString(n))) {
      return 1;
    }
    if (isOnePointZero(n)) {
      n = "100%";
    }
    const isPercent = isPercentage(n);
    n = isNumber(n) ? n : parseFloat(n);
    n = max == 360 ? n : Math.min(max, Math.max(0, n));
    if (isPercent) {
      n = parseInt("".concat(Math.min(n, 100) * max), 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
      return 1;
    }
    if (max == 360) {
      n = (n < 0 ? n % max + max : n % max) / max;
    } else {
      n = n % max / max;
    }
    return n;
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function boundAlpha(a = null) {
    let n = a == null ? 1 : isString(a) ? parseFloat(a) : a;
    if (isNaN(n) || n < 0 || n > 1) {
      n = 1;
    }
    return n;
  }
  function convertToPercentage(n = null) {
    n = isNumeric(n) ? parseFloat("".concat(n)) : n;
    if (isNumber(n) && n <= 1) {
      return "".concat(n * 100, "%").replace(".0%", "%");
    }
    return n;
  }
  function pad2(c) {
    return c.length == 1 ? "0" + c : "".concat(c);
  }
  function rgbToRgb(r = null, g = null, b = null) {
    return new RGB({
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    });
  }
  function rgbToHsl(r = null, g = null, b = null) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s;
    const l = (max + min) / 2;
    if (max == min) {
      s = 0;
      h = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          uni.__log__("log", "at uni_modules/lime-color/common/conversion.uts:64", "h");
          break;
      }
      h /= 6;
    }
    return new HSL({ h, s, l });
  }
  function hue2rgb(p, q, t) {
    let _t = t;
    if (_t < 0) {
      _t += 1;
    }
    if (_t > 1) {
      _t -= 1;
    }
    if (_t < 1 / 6) {
      return p + (q - p) * (6 * _t);
    }
    if (_t < 1 / 2) {
      return q;
    }
    if (_t < 2 / 3) {
      return p + (q - p) * (2 / 3 - _t) * 6;
    }
    return p;
  }
  function hslToRgb(h = null, s = null, l = null) {
    let r;
    let g;
    let b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s == 0) {
      g = l;
      b = l;
      r = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return new RGB({ r: r * 255, g: g * 255, b: b * 255 });
  }
  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    const v = max;
    const d = max - min;
    const s = max == 0 ? 0 : d / max;
    if (max == min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          uni.__log__("log", "at uni_modules/lime-color/common/conversion.uts:171", "1");
          break;
      }
      h /= 6;
    }
    return new HSV({ h, s, v });
  }
  function hsvToRgb(h = null, s = null, v = null) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;
    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];
    return new RGB({ r: r * 255, g: g * 255, b: b * 255 });
  }
  function rgbToHex(r, g, b, allow3Char = false) {
    const hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r, g, b, a, allow4Char = false) {
    const hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16)),
      pad2(convertDecimalToHex(a))
    ];
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function convertDecimalToHex(d = null) {
    return Math.round(parseFloat("".concat(d)) * 255).toString(16);
  }
  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
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
    let a = 1;
    let s = null;
    let v = null;
    let l = null;
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
        s = convertToPercentage(_color["s"]);
        v = isHSV ? convertToPercentage(_color["v"]) : convertToPercentage(_color["b"]);
        rgb = hsvToRgb(_color["h"], s, v);
        ok = true;
        format = isHSV ? "hsv" : "hsb";
      } else if (isValidCSSUnit(_color["h"]) && isValidCSSUnit(_color["s"]) && isValidCSSUnit(_color["l"])) {
        s = convertToPercentage(_color["s"]);
        l = convertToPercentage(_color["l"]);
        rgb = hslToRgb(_color["h"], s, l);
        ok = true;
        format = "hsl";
      }
      if (_color["a"] != null) {
        a = _color["a"];
      }
    }
    a = boundAlpha(a);
    return new LColorInfo({
      ok,
      format: (_a = _color === null || _color === void 0 ? null : _color["format"]) !== null && _a !== void 0 ? _a : format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a
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
      const r = match[1];
      const g = match[2];
      const b = match[3];
      return new UTSJSONObject({ r, g, b });
    }
    match = matchers.rgba.exec(_color);
    if (match != null) {
      const r = match[1];
      const g = match[2];
      const b = match[3];
      const a = match[4];
      return new UTSJSONObject({ r, g, b, a });
    }
    match = matchers.hsl.exec(_color);
    if (match != null) {
      match[1];
      const s = match[2];
      const l = match[3];
      return new UTSJSONObject({ h: vue.h, s, l });
    }
    match = matchers.hsla.exec(_color);
    if (match != null) {
      match[1];
      const s = match[2];
      const l = match[3];
      const a = match[4];
      return new UTSJSONObject({ h: vue.h, s, l, a });
    }
    match = matchers.hsv.exec(_color);
    if (match != null) {
      match[1];
      const s = match[2];
      const v = match[3];
      return new UTSJSONObject({ h: vue.h, s, v });
    }
    match = matchers.hsva.exec(_color);
    if (match != null) {
      match[1];
      const s = match[2];
      const v = match[3];
      const a = match[4];
      return new UTSJSONObject({ h: vue.h, s, v, a });
    }
    match = matchers.hex8.exec(_color);
    if (match != null) {
      const r = parseIntFromHex(match[1]);
      const g = parseIntFromHex(match[2]);
      const b = parseIntFromHex(match[3]);
      const a = convertHexToDecimal(match[4]);
      return new UTSJSONObject({
        r,
        g,
        b,
        a,
        format: named ? "name" : "hex8"
      });
    }
    match = matchers.hex6.exec(_color);
    if (match != null) {
      const r = parseIntFromHex(match[1]);
      const g = parseIntFromHex(match[2]);
      const b = parseIntFromHex(match[3]);
      return new UTSJSONObject({
        r,
        g,
        b,
        format: named ? "name" : "hex"
      });
    }
    match = matchers.hex4.exec(_color);
    if (match != null) {
      const r = parseIntFromHex(match[1] + match[1]);
      const g = parseIntFromHex(match[2] + match[2]);
      const b = parseIntFromHex(match[3] + match[3]);
      const a = convertHexToDecimal(match[4] + match[4]);
      return new UTSJSONObject({
        r,
        g,
        b,
        a,
        format: named ? "name" : "hex8"
      });
    }
    match = matchers.hex3.exec(_color);
    if (match != null) {
      const r = parseIntFromHex(match[1] + match[1]);
      const g = parseIntFromHex(match[2] + match[2]);
      const b = parseIntFromHex(match[3] + match[3]);
      return new UTSJSONObject({
        r,
        g,
        b,
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
      let R;
      let G;
      let B;
      const RsRGB = rgb.r / 255;
      const GsRGB = rgb.g / 255;
      const BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R = RsRGB / 12.92;
      } else {
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B = BsRGB / 12.92;
      } else {
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
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
      const s = this.toHsl().s;
      return s == 0;
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
      const h = Math.round(hsv.h * 360);
      const s = Math.round(hsv.s * 100);
      const v = Math.round(hsv.v * 100);
      return this.a == 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
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
      const h = Math.round(hsb.h);
      const s = Math.round(hsb.s * 100);
      const b = Math.round(hsb.b * 100);
      return this.a == 1 ? "hsb(".concat(h, ", ").concat(s, "%, ").concat(b, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(b, "%, ").concat(this.roundA, ")");
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
      const h = Math.round(hsl.h * 360);
      const s = Math.round(hsl.s * 100);
      const l = Math.round(hsl.l * 100);
      return this.a == 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
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
      const r = Math.round(this.r);
      const g = Math.round(this.g);
      const b = Math.round(this.b);
      return this.a == 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
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
      const p = amount / 100;
      const rgba = new UTSJSONObject({
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
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
      const h = hsv.h;
      const s = hsv.s;
      let v = hsv.v;
      const res = [];
      const modification = 1 / results;
      let _results = results;
      while (_results > 0) {
        res.push(new TinyColor(new UTSJSONObject({ h, s, v })));
        v = (v + modification) % 1;
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
      const h = hsl.h;
      return [
        this,
        new TinyColor(new UTSJSONObject({ h: (h + 72) % 360, s: hsl.s, l: hsl.l })),
        new TinyColor(new UTSJSONObject({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }))
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
    polyad(n) {
      const hsl = this.toHsl();
      const h = hsl.h;
      const result = [this];
      const increment = 360 / n;
      for (let i = 1; i < n; i++) {
        result.push(new TinyColor(new UTSJSONObject({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l })));
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
    const y = centerY + radius * Math.sin(angleRadians);
    return [x, y];
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
      const y = canvasHeight.value / 2;
      const radius = size.value / 2 - lineWidth;
      drawFrame = () => {
        if (context.value == null || !isPlaying)
          return null;
        let ctx = context.value;
        ctx.reset();
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle * PI + rotate, endAngle * PI + rotate);
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
      const y = canvasHeight.value / 2;
      let step = 0;
      const length = size.value / 3.6 - lineWidth;
      const offset = size.value / 4;
      function generateColorGradient(hex, steps2) {
        const colors2 = [];
        const _color = tinyColor(hex);
        for (let i = 1; i <= steps2; i++) {
          _color.setAlpha(i / steps2);
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
          for (let i = 0; i < steps; i++) {
            const stepAngle = 360 / steps;
            const angle = stepAngle * i;
            const index = (steps + i - step) % steps;
            const radian = angle * Math.PI / 180;
            const cos = Math.cos(radian);
            const sin = Math.sin(radian);
            ctx.beginPath();
            ctx.moveTo(x + offset * cos, y + offset * sin);
            ctx.lineTo(x + (offset + length) * cos, y + (offset + length) * sin);
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
  const name$1 = "l-loading";
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
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
        cls2.set(name$1 + "--" + props.type, true);
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
      const __returned__ = { name: name$1, props, classes, spinnerStyle, textStyle, loadingRef, loading };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$f = { "l-loading": { "": { "display": "flex", "position": "relative", "flexDirection": "row", "alignItems": "center", "borderLeftColor": "#3283ff", "borderLeftWidth": 0 }, ".is-vertical": { "flexDirection": "column" } }, "l-loading__text": { "": { "marginLeft": "16rpx", "color": "rgba(0,0,0,0.45)", "fontSize": 14 }, ".l-loading.is-vertical ": { "marginTop": "8rpx", "marginRight": 0, "marginBottom": 0, "marginLeft": 0 } }, "l-loading__ball": { "": { "width": "40rpx", "height": "40rpx" } }, "l-loading__circular": { "": { "width": "40rpx", "height": "40rpx" } }, "l-loading__spinner": { "": { "width": "40rpx", "height": "40rpx" } } };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["styles", [_style_0$f]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-loading/components/l-loading/l-loading.uvue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent(Object.assign({
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
    const getuserinfo = (e) => {
      emit("getuserinfo", e);
    };
    const contact = (e) => {
      emit("contact", e);
    };
    const getphonenumber = (e) => {
      emit("getphonenumber", e);
    };
    const error = (e) => {
      emit("error", e);
    };
    const opensetting = (e) => {
      emit("opensetting", e);
    };
    const launchapp = (e) => {
      emit("launchapp", e);
    };
    const chooseavatar = (e) => {
      emit("chooseavatar", e);
    };
    const agreeprivacyauthorization = (e) => {
      emit("agreeprivacyauthorization", e);
    };
    const handleTap = (e) => {
      if (props.disabled || props.loading)
        return null;
      emit("click", e);
    };
    const __returned__ = { emit, props, instance, buttonTextRef, hasContent, variant, classes, styles, sizes, innerIconSize, colors, loadingColor, gapClass, contentStyle, getuserinfo, contact, getphonenumber, error, opensetting, launchapp, chooseavatar, agreeprivacyauthorization, handleTap };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  } }));
  const _style_0$e = { "l-button--mini": { "": { "paddingTop": 0, "paddingRight": "16rpx", "paddingBottom": 0, "paddingLeft": "16rpx", "height": "56rpx" }, ".l-button--square": { "width": "56rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "56rpx", "paddingLeft": 0, "paddingRight": 0 } }, "l-button__content": { ".l-button--mini ": { "fontSize": 12 }, ".l-button--small ": { "fontSize": 14 }, ".l-button--medium ": { "fontSize": 16 }, ".l-button--large ": { "fontSize": 16 }, ".l-button--default ": { "color": "rgba(0,0,0,0.88)" }, ".l-button--primary ": { "color": "#3283ff" }, ".l-button--danger ": { "color": "#FF4D4F" }, ".l-button--info ": { "color": "#3283ff" }, ".l-button--warning ": { "color": "#ffb400" }, ".l-button--success ": { "color": "#34c471" }, ".l-button--solid ": { "color": "#FFFFFF" } }, "l-button--small": { "": { "paddingTop": 0, "paddingRight": "24rpx", "paddingBottom": 0, "paddingLeft": "24rpx", "height": "64rpx" }, ".l-button--square": { "width": "64rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "64rpx", "paddingLeft": 0, "paddingRight": 0 } }, "l-button--medium": { "": { "paddingTop": 0, "paddingRight": "32rpx", "paddingBottom": 0, "paddingLeft": "32rpx", "height": "80rpx" }, ".l-button--square": { "width": "80rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "80rpx", "paddingLeft": 0, "paddingRight": 0 } }, "l-button--large": { "": { "paddingTop": 0, "paddingRight": "48rpx", "paddingBottom": 0, "paddingLeft": "48rpx", "height": "96rpx" }, ".l-button--square": { "width": "96rpx", "paddingLeft": 0, "paddingRight": 0 }, ".l-button--circle": { "width": "96rpx", "paddingLeft": 0, "paddingRight": 0 } }, "hover": { ".l-button--default": { "backgroundColor": "#eeeeee" }, ".l-button--default.l-button--solid": { "backgroundColor": "#000000" }, ".l-button--default.l-button--light": { "backgroundColor": "#e7e7e7" }, ".l-button--primary": { "backgroundColor": "#F0F8FF" }, ".l-button--primary.l-button--solid": { "backgroundColor": "#2164d9" }, ".l-button--primary.l-button--light": { "backgroundColor": "#d6ecff" }, ".l-button--danger": { "backgroundColor": "#fff2f0" }, ".l-button--danger.l-button--solid": { "backgroundColor": "#d9363e" }, ".l-button--danger.l-button--light": { "backgroundColor": "#ffccc7" }, ".l-button--info": { "backgroundColor": "#d6ecff" }, ".l-button--info.l-button--solid": { "backgroundColor": "#2164d9" }, ".l-button--info.l-button--light": { "backgroundColor": "#add6ff" }, ".l-button--warning": { "backgroundColor": "#fffce6" }, ".l-button--warning.l-button--solid": { "backgroundColor": "#d99100" }, ".l-button--warning.l-button--light": { "backgroundColor": "#fff0a3" }, ".l-button--success": { "backgroundColor": "#f0fff4" }, ".l-button--success.l-button--solid": { "backgroundColor": "#239e5a" }, ".l-button--success.l-button--light": { "backgroundColor": "#e1f7e7" } }, "l-button--default": { ".l-button--solid": { "backgroundColor": "rgba(0,0,0,0.88)" }, ".l-button--outline": { "borderTopColor": "#c5c5c5", "borderRightColor": "#c5c5c5", "borderBottomColor": "#c5c5c5", "borderLeftColor": "#c5c5c5" }, ".l-button--dashed": { "borderTopColor": "#c5c5c5", "borderRightColor": "#c5c5c5", "borderBottomColor": "#c5c5c5", "borderLeftColor": "#c5c5c5" }, ".l-button--light": { "backgroundColor": "#eeeeee" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#c5c5c5", "borderRightColor": "#c5c5c5", "borderBottomColor": "#c5c5c5", "borderLeftColor": "#c5c5c5" } }, "l-button--primary": { ".l-button--solid": { "backgroundColor": "#3283ff" }, ".l-button--outline": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--dashed": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--light": { "backgroundColor": "#F0F8FF" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" } }, "l-button--danger": { ".l-button--solid": { "backgroundColor": "#FF4D4F" }, ".l-button--outline": { "borderTopColor": "#FF4D4F", "borderRightColor": "#FF4D4F", "borderBottomColor": "#FF4D4F", "borderLeftColor": "#FF4D4F" }, ".l-button--dashed": { "borderTopColor": "#FF4D4F", "borderRightColor": "#FF4D4F", "borderBottomColor": "#FF4D4F", "borderLeftColor": "#FF4D4F" }, ".l-button--light": { "backgroundColor": "#fff2f0" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#FF4D4F", "borderRightColor": "#FF4D4F", "borderBottomColor": "#FF4D4F", "borderLeftColor": "#FF4D4F" } }, "l-button--info": { ".l-button--solid": { "backgroundColor": "#3283ff" }, ".l-button--outline": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--dashed": { "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" }, ".l-button--light": { "backgroundColor": "#d6ecff" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#3283ff", "borderRightColor": "#3283ff", "borderBottomColor": "#3283ff", "borderLeftColor": "#3283ff" } }, "l-button--warning": { ".l-button--solid": { "backgroundColor": "#ffb400" }, ".l-button--outline": { "borderTopColor": "#ffb400", "borderRightColor": "#ffb400", "borderBottomColor": "#ffb400", "borderLeftColor": "#ffb400" }, ".l-button--dashed": { "borderTopColor": "#ffb400", "borderRightColor": "#ffb400", "borderBottomColor": "#ffb400", "borderLeftColor": "#ffb400" }, ".l-button--light": { "backgroundColor": "#fffce6" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#ffb400", "borderRightColor": "#ffb400", "borderBottomColor": "#ffb400", "borderLeftColor": "#ffb400" } }, "l-button--success": { ".l-button--solid": { "backgroundColor": "#34c471" }, ".l-button--outline": { "borderTopColor": "#34c471", "borderRightColor": "#34c471", "borderBottomColor": "#34c471", "borderLeftColor": "#34c471" }, ".l-button--dashed": { "borderTopColor": "#34c471", "borderRightColor": "#34c471", "borderBottomColor": "#34c471", "borderLeftColor": "#34c471" }, ".l-button--light": { "backgroundColor": "#f0fff4" }, ".l-button--ghost": { "backgroundColor": "rgba(0,0,0,0)", "borderTopColor": "#34c471", "borderRightColor": "#34c471", "borderBottomColor": "#34c471", "borderLeftColor": "#34c471" } }, "l-button": { "": { "opacity": 1, "position": "relative", "alignItems": "center", "justifyContent": "center", "flexDirection": "row", "transitionDuration": "200ms", "transitionProperty": "backgroundColor,opacity,borderColor,width,height", "borderTopLeftRadius": "6rpx", "borderTopRightRadius": "6rpx", "borderBottomRightRadius": "6rpx", "borderBottomLeftRadius": "6rpx" }, ".l-button--disabled": { "opacity": 0.6 } }, "l-button__button": { "": { "position": "absolute", "left": 0, "right": 0, "top": 0, "bottom": 0, "borderTopWidth": "medium", "borderRightWidth": "medium", "borderBottomWidth": "medium", "borderLeftWidth": "medium", "borderTopStyle": "none", "borderRightStyle": "none", "borderBottomStyle": "none", "borderLeftStyle": "none", "borderTopColor": "#000000", "borderRightColor": "#000000", "borderBottomColor": "#000000", "borderLeftColor": "#000000", "backgroundColor": "rgba(0,0,0,0)" } }, "l-button--block": { "": { "width": "100%", "alignSelf": "auto" } }, "l-button__icon": { ".l-button--solid ": { "color": "#FFFFFF" }, "": { "alignSelf": "center" } }, "l-button--outline": { "": { "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopWidth": 0.71, "borderRightWidth": 0.71, "borderBottomWidth": 0.71, "borderLeftWidth": 0.71 } }, "l-button--dashed": { "": { "borderTopStyle": "dashed", "borderRightStyle": "dashed", "borderBottomStyle": "dashed", "borderLeftStyle": "dashed", "borderTopWidth": 0.71, "borderRightWidth": 0.71, "borderBottomWidth": 0.71, "borderLeftWidth": 0.71 } }, "l-button__loading": { "": { "alignSelf": "center" } }, "l-button--round": { "": { "borderTopLeftRadius": 999, "borderTopRightRadius": 999, "borderBottomRightRadius": 999, "borderBottomLeftRadius": 999 } }, "l-button--circle": { "": { "borderTopLeftRadius": 999, "borderTopRightRadius": 999, "borderBottomRightRadius": 999, "borderBottomLeftRadius": 999 } }, "gap": { ".l-button ": { "marginLeft": 4 } }, "@TRANSITION": { "l-button": { "duration": "200ms", "property": "backgroundColor,opacity,borderColor,width,height" } } };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_l_loading = resolveEasycom(vue.resolveDynamicComponent("l-loading"), __easycom_0$3);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_2);
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
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["styles", [_style_0$e]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-button/components/l-button/l-button.uvue"]]);
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
      for (let i = 0; i < str.length; i += 1) {
        let currentStringLength;
        const code = str.charCodeAt(i);
        if (code > 127 || code == 94) {
          currentStringLength = 2;
        } else {
          currentStringLength = 1;
        }
        if (len + currentStringLength > max) {
          return {
            length: len,
            characters: str.slice(0, i)
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
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
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
      const handleInput = (e) => {
        let value = e.detail.value;
        props.maxlength;
        const maxcharacter = props.maxcharacter;
        if (maxcharacter != null && maxcharacter > 0) {
          const characters = characterLimit("maxcharacter", value, maxcharacter).characters;
          value = characters;
        }
        searchValue.value = value;
      };
      const handleClear = (_e) => {
        searchValue.value = "";
        focused.value = true;
        emit("clear");
      };
      const handleFocus = (e) => {
        const value = e.detail.value;
        focused.value = true;
        emit("focus", value);
      };
      const handleBlur = (e) => {
        const value = e.detail.value;
        focused.value = false;
        emit("blur", value);
      };
      const handleConfirm = (e) => {
        const value = e.detail.value;
        emit("submit", value);
      };
      const handleActionClick = (_e) => {
        emit("action-click");
      };
      const __returned__ = { emit, props, focused, modelValue, searchValue, contentClass, contextStyle, inputStyle, handleInput, handleClear, handleFocus, handleBlur, handleConfirm, handleActionClick };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$d = { "l-search": { "": { "width": "100%", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "l-search__content": { "": { "flex": 1, "alignItems": "center", "flexDirection": "row", "boxSizing": "border-box", "height": "80rpx", "borderTopWidth": "2rpx", "borderRightWidth": "2rpx", "borderBottomWidth": "2rpx", "borderLeftWidth": "2rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(0,0,0,0.04)", "borderRightColor": "rgba(0,0,0,0.04)", "borderBottomColor": "rgba(0,0,0,0.04)", "borderLeftColor": "rgba(0,0,0,0.04)", "backgroundImage": "none", "backgroundColor": "rgba(0,0,0,0.04)", "paddingTop": "16rpx", "paddingRight": "24rpx", "paddingBottom": "16rpx", "paddingLeft": "24rpx" } }, "l-search__content--focused": { "": { "borderTopColor": "rgba(0,0,0,0.04)", "borderRightColor": "rgba(0,0,0,0.04)", "borderBottomColor": "rgba(0,0,0,0.04)", "borderLeftColor": "rgba(0,0,0,0.04)" } }, "l-search__content--round": { "": { "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99 } }, "l-search__content--square": { "": { "borderTopLeftRadius": "12rpx", "borderTopRightRadius": "12rpx", "borderBottomRightRadius": "12rpx", "borderBottomLeftRadius": "12rpx" } }, "l-search__keyword": { "": { "flex": 1, "color": "rgba(0,0,0,0.88)", "fontSize": 16, "paddingLeft": "10rpx" } }, "l-search__placeholder": { "": { "color": "rgba(0,0,0,0.45)" } }, "l-search__placeholder--center": { "": { "textAlign": "center" } }, "l-search__icon": { "": { "color": "rgba(0,0,0,0.25)" } }, "l-search__clear": { "": { "position": "relative", "marginLeft": 10 } }, "l-search__clear-icon": { "": { "color": "rgba(0,0,0,0.25)" } }, "l-search__clear--right": { "": { "marginRight": 10 } }, "l-search__action": { "": { "marginLeft": "30rpx", "fontSize": 16, "color": "#3283ff" } } };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_2);
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
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["styles", [_style_0$d]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-search/components/l-search/l-search.uvue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
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
        children.value = children.value.filter((it) => {
          return it != instance;
        });
      });
      const __returned__ = { props, children, instance };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$c = { "l-tab__panel": { "": { "width": "100%", "flex": 1, "flexShrink": 0, "boxSizing": "border-box" } } };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "l-tab__panel",
      "aria-role": "tabpanel"
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["styles", [_style_0$c]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.uvue"]]);
  function toBoolean(value) {
    return value != null && value != void 0;
  }
  function getOffsetWithMinusString(val) {
    return val.startsWith("-") ? val.replace("-", "") : "-".concat(val);
  }
  const name = "l-badge";
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
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
        cls2.set("".concat(name, "--fixed"), toBoolean(context.slots["default"]));
        cls2.set("".concat(name, "--dot"), props.dot);
        cls2.set("".concat(name, "--").concat(props.position), context.slots["default"] != null);
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
          const y = offset[1];
          if (context.slots["default"] != null) {
            if (positions.length == 2) {
              const offsetY = positions[0], offsetX = positions[1];
              if (isNumber$2(y)) {
                const _y = y;
                style.set(offsetY, addUnit(offsetY == "top" ? _y : -_y));
              } else {
                style.set(offsetY, offsetY == "top" ? addUnit(y) : getOffsetWithMinusString("".concat(y)));
              }
              if (isNumber$2(x)) {
                const _x = x;
                style.set(offsetX, addUnit(offsetX == "left" ? _x : -_x));
              } else {
                style.set(offsetY, offsetY == "left" ? addUnit(x) : getOffsetWithMinusString("".concat(x)));
              }
            }
          } else {
            style.set("margin-top", addUnit(y));
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
      const __returned__ = { name, props, context, classes, styles, hasContent, renderContent };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$b = { "l-badge": { "": { "boxSizing": "border-box", "paddingTop": 0, "paddingRight": "8rpx", "paddingBottom": 0, "paddingLeft": "8rpx", "color": "#FFFFFF", "fontWeight": "bold", "fontSize": 12, "fontFamily": "-apple-system-font, helvetica neue, arial, sans-serif", "lineHeight": 1.2, "textAlign": "center", "backgroundColor": "#FF4D4F", "borderTopWidth": "1rpx", "borderRightWidth": "1rpx", "borderBottomWidth": "1rpx", "borderLeftWidth": "1rpx", "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "#FFFFFF", "borderRightColor": "#FFFFFF", "borderBottomColor": "#FFFFFF", "borderLeftColor": "#FFFFFF", "borderTopLeftRadius": 999, "borderTopRightRadius": 999, "borderBottomRightRadius": 999, "borderBottomLeftRadius": 999, "overflow": "visible" } }, "l-badge--fixed": { "": { "position": "absolute", "transformOrigin": "100%" }, ".l-badge--offscreen": { "position": "fixed", "opacity": 0.13, "top": -1e10 } }, "l-badge--top-left": { "": { "top": 0, "left": 0, "transform": "translate(-50%, -50%)" } }, "l-badge--top-right": { "": { "top": 0, "right": 0, "transform": "translate(50%, -50%)" } }, "l-badge--bottom-left": { "": { "bottom": 0, "left": 0, "transform": "translate(-50%, 50%)" } }, "l-badge--bottom-right": { "": { "bottom": 0, "right": 0, "transform": "translate(50%, 50%)" } }, "l-badge--dot": { "": { "width": "16rpx", "minWidth": 0, "height": "16rpx", "backgroundImage": "none", "backgroundColor": "#FF4D4F", "borderTopLeftRadius": 99, "borderTopRightRadius": 99, "borderBottomRightRadius": 99, "borderBottomLeftRadius": 99, "borderTopWidth": 0, "borderRightWidth": 0, "borderBottomWidth": 0, "borderLeftWidth": 0, "paddingTop": 0, "paddingRight": 0, "paddingBottom": 0, "paddingLeft": 0, "overflow": "visible" } }, "l-badge__wrapper": { "": { "position": "relative", "overflow": "visible" } } };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["styles", [_style_0$b]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-badge/components/l-badge/l-badge.uvue"]]);
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
  function getDirection(x, y) {
    if (x > y) {
      return "horizontal";
    }
    if (y > x) {
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
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
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
          var _a2, _b, _c, _d, _e;
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
              disabled: (_e = item.disabled) !== null && _e !== void 0 ? _e : false,
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
      const onScroll = (e) => {
        lastLeft.value = e.detail.scrollLeft;
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
        for (let i = step; currentIndex.value + step >= 0 && currentIndex.value + step < len; i += step) {
          const newIndex = currentIndex.value + i;
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
      }, (v) => {
        if (!v)
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
      }, set timer(v) {
        timer = v;
      }, measureTabs, moveToActiveTab, updateInnerStyle, onScroll, updateDuration, onClick, getAvailableTabIndex, touch, onTouchStart, onTouchMove, onTouchEnd, stopWatch, stopValueWatch, stopVisibleWatch, updateTrackPosition };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _style_0$a = { "l-tabs": { "": { "position": "relative", "backgroundImage": "none", "backgroundColor": "#FFFFFF" } }, "l-tabs__wrap": { "": { "flex": 1, "backgroundImage": "none", "backgroundColor": "#FFFFFF", "flexDirection": "row" } }, "l-tabs__scroll": { "": { "position": "relative", "flex": 1, "flexDirection": "row" } }, "l-tabs__scroll--split": { "": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#eeeeee" } }, "l-tabs__nav": { "": { "flexDirection": "row", "position": "relative", "flexWrap": "nowrap", "alignItems": "center" } }, "l-tabs__track": { "": { "position": "absolute", "zIndex": 1, "transitionDuration": "0.3s", "backgroundColor": "#3283ff", "left": 0, "bottom": "1rpx", "width": "32rpx", "height": "6rpx", "borderTopLeftRadius": "8rpx", "borderTopRightRadius": "8rpx", "borderBottomRightRadius": "8rpx", "borderBottomLeftRadius": "8rpx" } }, "l-tabs__content": { "": { "width": "100%", "overflow": "hidden" } }, "l-tabs__content-inner": { "": { "display": "flex", "flexDirection": "row", "flex": 1, "overflow": "visible", "opacity": 0 }, ".l-tabs__content--animated ": { "position": "relative", "width": "100%", "height": "100%", "transitionProperty": "transform" } }, "l-tabs__item": { "": { "position": "relative", "flex": "none", "alignItems": "center", "justifyContent": "center", "paddingTop": 0, "paddingRight": "32rpx", "paddingBottom": 0, "paddingLeft": "32rpx", "boxSizing": "border-box", "overflow": "hidden", "height": "96rpx" } }, "l-tabs__item-text": { "": { "fontWeight": "400", "fontSize": 14, "whiteSpace": "nowrap", "transitionProperty": "color", "transitionDuration": "300ms", "color": "rgba(0,0,0,0.88)" } }, "l-tabs__item-text--large": { "": { "fontSize": 16 } }, "l-tabs__item-text--active": { "": { "fontWeight": "700", "color": "#3283ff" } }, "l-tabs__item-text--disabled": { "": { "color": "rgba(0,0,0,0.25)" } }, "l-tabs__item--evenly": { "": { "flex": 1 } }, "@TRANSITION": { "l-tabs__track": { "duration": "0.3s" }, "l-tabs__content-inner": { "property": "transform" }, "l-tabs__item-text": { "property": "color", "duration": "300ms" } } };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_badge = resolveEasycom(vue.resolveDynamicComponent("l-badge"), __easycom_0$1);
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
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["styles", [_style_0$a]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/lime-tabs/components/l-tabs/l-tabs.uvue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _style_0$9 = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "search-bar": { ".container ": { "marginTop": "30rpx", "marginRight": 0, "marginBottom": "30rpx", "marginLeft": 0 } }, "l-tabs": { ".container ": { "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "question-item": { ".container ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } } };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_button = resolveEasycom(vue.resolveDynamicComponent("l-button"), __easycom_0$2);
    const _component_l_search = resolveEasycom(vue.resolveDynamicComponent("l-search"), __easycom_1);
    const _component_l_icon = resolveEasycom(vue.resolveDynamicComponent("l-icon"), __easycom_2);
    const _component_l_tab_panel = resolveEasycom(vue.resolveDynamicComponent("l-tab-panel"), __easycom_3$1);
    const _component_l_tabs = resolveEasycom(vue.resolveDynamicComponent("l-tabs"), __easycom_4);
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
  const PagesMineHelpCenterHelpCenter = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["styles", [_style_0$9]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/helpCenter/helpCenter.uvue"]]);
  const _style_0$8 = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "40rpx", "paddingBottom": "20rpx", "paddingLeft": "40rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "title": { ".container .content ": { "fontSize": "36rpx", "fontWeight": "bold", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "desc": { ".container .content ": { "fontSize": "28rpx", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0 } } };
  const _sfc_main$9 = {};
  function _sfc_render$8(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "title" }, " 如何添加设备？ "),
        vue.createElementVNode("view", { class: "desc" }, " 1.打开 VeepAI 小程序，点击首页的“添加设备”按钮。 2.输入设备名称，选择设备类型，点击“下一步”。 3.输入设备的 IP 地址，点击“下一步”。 4.输入设备的用户名和密码，点击“下一步”。 5.点击“添加设备”按钮，完成添加。 ")
      ])
    ]);
  }
  const PagesMineHelpCenterQuestionDetailQuestionDetail = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["styles", [_style_0$8]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/helpCenter/questionDetail/questionDetail.uvue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "messageDetail",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const title = vue.ref("消息详情");
      onLoad((options) => {
        uni.__log__("log", "at pages/message/messageDetail/messageDetail.uvue:18", options.id);
      });
      const __returned__ = { title };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$7 = { "container": { "": { "height": "100%", "backgroundColor": "#f5f5f5", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "title": { ".container .content ": { "fontSize": "36rpx", "fontWeight": "bold", "paddingTop": "20rpx", "paddingRight": 0, "paddingBottom": "20rpx", "paddingLeft": 0, "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1" } }, "desc": { ".container .content ": { "marginTop": "40rpx", "marginRight": 0, "marginBottom": "40rpx", "marginLeft": 0 } } };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("view", { class: "title" }, "标题"),
        vue.createElementVNode("view", { class: "desc" }, [
          vue.createElementVNode("text", null, "描述")
        ])
      ])
    ]);
  }
  const PagesMessageMessageDetailMessageDetail = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["styles", [_style_0$7]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/messageDetail/messageDetail.uvue"]]);
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
  const _sfc_main$7 = vue.defineComponent({
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
      checkboxClick(e) {
        e.stopPropagation();
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
  const _style_0$6 = { "fui-checkbox__input": { "": { "width": "40rpx", "height": "40rpx", "borderTopWidth": 1, "borderRightWidth": 1, "borderBottomWidth": 1, "borderLeftWidth": 1, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "boxSizing": "border-box", "borderTopLeftRadius": 100, "borderTopRightRadius": 100, "borderBottomRightRadius": 100, "borderBottomLeftRadius": 100, "flexShrink": 0, "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "overflow": "hidden", "position": "relative" } }, "fui-checkbox__scale-left": { "": { "transformOrigin": "0 center" } }, "fui-checkbox__scale-center": { "": { "transformOrigin": "center center" } }, "fui-checkbox__scale-right": { "": { "transformOrigin": "100% center" } }, "fui-checkbox__color": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-checkbox__normal-border": { "": { "!borderTopColor": "#CCCCCC", "!borderRightColor": "#CCCCCC", "!borderBottomColor": "#CCCCCC", "!borderLeftColor": "#CCCCCC" } }, "fui-checkbox__background": { "": { "!backgroundImage": "none", "!backgroundColor": "#ffffff" } }, "fui-checkbox__mark-color": { "": { "!borderBottomColor": "#ffffff", "!borderRightColor": "#ffffff" } }, "fui-check__mark": { "": { "width": "20rpx", "height": "40rpx", "borderBottomStyle": "solid", "borderBottomWidth": 3, "borderBottomColor": "#FFFFFF", "borderRightStyle": "solid", "borderRightWidth": 3, "borderRightColor": "#FFFFFF", "boxSizing": "border-box", "transform": "rotate(45deg) scale(0.5)", "transformOrigin": "54% 48%" } }, "fui-checkbox__disabled": { "": { "opacity": 0.6 } } };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["styles", [_style_0$6]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-checkbox/fui-checkbox.uvue"]]);
  const _sfc_main$6 = vue.defineComponent({
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
      checkboxChange(e) {
        this.$emit("change", e);
        this.$emit("update:modelValue", e);
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_checkbox_group = vue.resolveComponent("checkbox-group");
    return vue.openBlock(), vue.createBlock(_component_checkbox_group, { name: $props.name }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["name"]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-checkbox-group/fui-checkbox-group.uvue"]]);
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
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
  const _imports_0$1 = "/static/tabbar/back.png";
  const _style_0$5 = { "custom-nav": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "30rpx", "paddingRight": "25rpx", "paddingBottom": "30rpx", "paddingLeft": "25rpx", "backgroundColor": "#ffffff", "marginTop": "50rpx", "width": "100%" } }, "nav-back": { "": { "width": "32rpx", "height": "32rpx", "display": "flex", "alignItems": "center", "justifyContent": "center" } }, "nav-item": { "": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-around" } }, "nav-title": { "": { "color": "#333333", "marginTop": 0, "marginRight": "20rpx", "marginBottom": 0, "marginLeft": "20rpx", "maxWidth": "400rpx", "textAlign": "center", "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap" } }, "nav-actions": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "nav-icon": { "": { "width": "60rpx", "height": "60rpx", "display": "flex", "alignItems": "center", "justifyContent": "center", "position": "relative", "marginLeft": "16rpx" } } };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "custom-nav" }, [
      vue.createElementVNode("view", {
        class: "nav-back",
        onClick: $setup.goBack
      }, [
        $setup.props.showBack ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "nav-icon",
          onClick: $setup.goBack,
          src: _imports_0$1
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
  const TopNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["styles", [_style_0$5]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/components/TopNavBar.uvue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
      const isChecked = (e) => {
        isCheck.value = e.join(",");
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
  const _imports_0 = "/static/login_banner.png";
  const _style_0$4 = { "container": { "": { "height": "100%", "backgroundColor": "#ffffff", "paddingTop": "20rpx", "paddingRight": "40rpx", "paddingBottom": "20rpx", "paddingLeft": "40rpx", "display": "flex", "flexDirection": "column", "alignItems": "center" } }, "longin_banner": { ".container ": { "width": "250rpx", "height": "400rpx", "marginBottom": "20rpx" } }, "content": { ".container ": { "width": "100%" } }, "check-box": { ".container .content ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-start", "marginTop": "20rpx" } }, "fui-text-box": { ".container .content .check-box ": { "display": "flex", "flexDirection": "row", "justifyContent": "flex-start", "marginLeft": "10rpx" } }, "fui-text": { ".container .content .check-box .fui-text-box ": { "color": "#1296db" } }, "tips": { ".container .content ": { "marginTop": "20rpx", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between" } }, "fui-scroll__wrap": { ".container ": { "width": "100%", "paddingTop": "40rpx", "paddingRight": "40rpx", "paddingBottom": "40rpx", "paddingLeft": "40rpx" } }, "fui-title__pb": { ".container .fui-scroll__wrap ": { "display": "flex", "flexDirection": "row", "justifyContent": "space-between" } } };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_icon = resolveEasycom(vue.resolveDynamicComponent("fui-icon"), __easycom_0$5);
    const _component_fui_input = resolveEasycom(vue.resolveDynamicComponent("fui-input"), __easycom_1$2);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
    const _component_fui_checkbox = resolveEasycom(vue.resolveDynamicComponent("fui-checkbox"), __easycom_3);
    const _component_fui_label = resolveEasycom(vue.resolveDynamicComponent("fui-label"), __easycom_4$1);
    const _component_fui_checkbox_group = resolveEasycom(vue.resolveDynamicComponent("fui-checkbox-group"), __easycom_5);
    const _component_fui_bottom_popup = resolveEasycom(vue.resolveDynamicComponent("fui-bottom-popup"), __easycom_6$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createVNode($setup["TopNavBar"], {
        title: "登陆",
        rightText: "注册"
      }),
      vue.createElementVNode("image", {
        src: _imports_0,
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
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["styles", [_style_0$4]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/login/login.uvue"]]);
  const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
        uni.__log__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:130", today.value);
        if (day.isToday) {
          uni.__log__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:132", "今天");
        }
        showCalendar.value = false;
      };
      const msgDetail = (e) => {
        uni.navigateTo({
          url: "/pages/message/messageDetail/messageDetail?id=" + e.id
        });
      };
      const change = (res) => {
        uni.__log__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:144", "res", res);
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
  const _style_0$3 = { "container": { "": { "width": "100%", "height": "100%", "position": "relative", "backgroundColor": "#f3f3f3" } }, "vedio-box": { ".container ": { "width": "100%" } }, "video": { ".container .vedio-box ": { "width": "100%" } }, "content-box": { ".container ": { "paddingTop": "30rpx", "paddingRight": "20rpx", "paddingBottom": "30rpx", "paddingLeft": "20rpx" } }, "sub-nav": { ".container .content-box ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "select": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "marginLeft": "10rpx" } }, "today": { ".container .content-box .sub-nav ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "width": "120rpx" } }, "down": { ".container .content-box .sub-nav .today ": { "width": "25rpx", "height": "25rpx" } }, "select-item": { ".container .content-box .sub-nav .select ": { "flex": 1, "backgroundColor": "#ffffff", "color": "#333333", "paddingTop": "10rpx", "paddingRight": "20rpx", "paddingBottom": "10rpx", "paddingLeft": "20rpx", "borderTopLeftRadius": "5rpx", "borderTopRightRadius": "5rpx", "borderBottomRightRadius": "5rpx", "borderBottomLeftRadius": "5rpx", "marginTop": 0, "marginRight": "5rpx", "marginBottom": 0, "marginLeft": "5rpx" } }, "active": { ".container .content-box .sub-nav .select ": { "color": "#ffffff", "backgroundColor": "#1296db" } }, "tab-content": { ".container .content-box ": { "display": "flex", "flexDirection": "column", "alignItems": "center", "marginTop": "20rpx" } }, "tab-pane": { ".container .content-box .tab-content ": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "backgroundColor": "#ffffff", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "width": "100%", "marginBottom": "30rpx" } }, "item-content": { ".container .content-box .tab-content .tab-pane ": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "item-icon": { ".container .content-box .tab-content .tab-pane .item-content ": { "width": "60rpx", "height": "60rpx" } }, "info": { ".container .content-box .tab-content .tab-pane .item-content ": { "marginLeft": "20rpx" } }, "item-img": { ".container .content-box .tab-content .tab-pane ": { "width": "100rpx", "height": "60rpx" } }, "calendar-box": { ".container ": { "position": "absolute", "bottom": 0, "left": 0, "height": "60%", "width": "100%", "backgroundColor": "#ffffff" } }, "btn-chanel-box": { ".container .calendar-box ": { "position": "absolute", "width": "85%", "bottom": "45rpx", "left": "60rpx", "borderTopLeftRadius": "50rpx", "borderTopRightRadius": "50rpx", "borderBottomRightRadius": "50rpx", "borderBottomLeftRadius": "50rpx" } } };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_l_daily_punch = resolveEasycom(vue.resolveDynamicComponent("l-daily-punch"), __easycom_0$6);
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
              src: _imports_0$5
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
  const PagesMessageMessageDeviceDetailMessageDeviceDetail = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["styles", [_style_0$3]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/messageDeviceDetail/messageDeviceDetail.uvue"]]);
  const _sfc_main$2 = vue.defineComponent({
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
  const _style_0$2 = { "fui-tag__wrap": { "": { "display": "flex", "flexShrink": 0, "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "position": "relative", "borderTopWidth": 0.5, "borderRightWidth": 0.5, "borderBottomWidth": 0.5, "borderLeftWidth": 0.5, "borderTopStyle": "solid", "borderRightStyle": "solid", "borderBottomStyle": "solid", "borderLeftStyle": "solid", "borderTopColor": "rgba(0,0,0,0)", "borderRightColor": "rgba(0,0,0,0)", "borderBottomColor": "rgba(0,0,0,0)", "borderLeftColor": "rgba(0,0,0,0)", "overflow": "hidden", "boxSizing": "border-box" } }, "fui-tag__no-border": { "": { "borderTopWidth": 0, "borderRightWidth": 0, "borderBottomWidth": 0, "borderLeftWidth": 0 } }, "fui-tag__text": { "": { "lines": 1, "overflow": "hidden", "textOverflow": "ellipsis" } }, "fui-tag__primary-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#465CFF", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-tag_primary-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_success-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_warning-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_danger-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag_purple-dark": { "": { "!color": "#FFFFFF" } }, "fui-tag__success-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#09BE4F", "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F" } }, "fui-tag__warning-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#FFB703", "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703" } }, "fui-tag__danger-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#FF2B2B", "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B" } }, "fui-tag__purple-dark": { "": { "!backgroundImage": "none", "!backgroundColor": "#6831FF", "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF" } }, "fui-tag__primary-light": { "": { "!backgroundImage": "none", "!backgroundColor": "#F1F4FA", "!borderTopColor": "#F1F4FA", "!borderRightColor": "#F1F4FA", "!borderBottomColor": "#F1F4FA", "!borderLeftColor": "#F1F4FA" } }, "fui-tag_primary-light": { "": { "!color": "#465CFF" } }, "fui-tag_primary-plain": { "": { "!color": "#465CFF" } }, "fui-tag__success-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(9,190,79,0.05)", "!borderTopColor": "rgba(9,190,79,0.05)", "!borderRightColor": "rgba(9,190,79,0.05)", "!borderBottomColor": "rgba(9,190,79,0.05)", "!borderLeftColor": "rgba(9,190,79,0.05)" } }, "fui-tag_success-light": { "": { "!color": "#09BE4F" } }, "fui-tag_success-plain": { "": { "!color": "#09BE4F" } }, "fui-tag__warning-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(255,183,3,0.1)", "!borderTopColor": "rgba(255,183,3,0.1)", "!borderRightColor": "rgba(255,183,3,0.1)", "!borderBottomColor": "rgba(255,183,3,0.1)", "!borderLeftColor": "rgba(255,183,3,0.1)" } }, "fui-tag_warning-light": { "": { "!color": "#FFB703" } }, "fui-tag_warning-plain": { "": { "!color": "#FFB703" } }, "fui-tag__danger-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(255,43,43,0.05)", "!borderTopColor": "rgba(255,43,43,0.05)", "!borderRightColor": "rgba(255,43,43,0.05)", "!borderBottomColor": "rgba(255,43,43,0.05)", "!borderLeftColor": "rgba(255,43,43,0.05)" } }, "fui-tag_danger-light": { "": { "!color": "#FF2B2B" } }, "fui-tag_danger-plain": { "": { "!color": "#FF2B2B" } }, "fui-tag__purple-light": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(104,49,255,0.05)", "!borderTopColor": "rgba(104,49,255,0.05)", "!borderRightColor": "rgba(104,49,255,0.05)", "!borderBottomColor": "rgba(104,49,255,0.05)", "!borderLeftColor": "rgba(104,49,255,0.05)" } }, "fui-tag_purple-light": { "": { "!color": "#6831FF" } }, "fui-tag_purple-plain": { "": { "!color": "#6831FF" } }, "fui-tag__primary-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#465CFF", "!borderRightColor": "#465CFF", "!borderBottomColor": "#465CFF", "!borderLeftColor": "#465CFF" } }, "fui-tag__success-plain": { "": { "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#09BE4F", "!borderRightColor": "#09BE4F", "!borderBottomColor": "#09BE4F", "!borderLeftColor": "#09BE4F" } }, "fui-tag__warning-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#FFB703", "!borderRightColor": "#FFB703", "!borderBottomColor": "#FFB703", "!borderLeftColor": "#FFB703" } }, "fui-tag__danger-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#FF2B2B", "!borderRightColor": "#FF2B2B", "!borderBottomColor": "#FF2B2B", "!borderLeftColor": "#FF2B2B" } }, "fui-tag__purple-plain": { "": { "!backgroundImage": "none", "!backgroundColor": "rgba(0,0,0,0)", "!borderTopColor": "#6831FF", "!borderRightColor": "#6831FF", "!borderBottomColor": "#6831FF", "!borderLeftColor": "#6831FF" } }, "fui-tag__origin-left": { "": { "transformOrigin": "0 center" } }, "fui-tag__origin-right": { "": { "transformOrigin": "100% center" } }, "fui-tag__opacity-active": { "": { "opacity": 0.5 } } };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["styles", [_style_0$2]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/uni_modules/firstui-unix/components/fui-tag/fui-tag.uvue"]]);
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
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
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
  const _style_0$1 = { "container": { "": { "height": "100%", "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx", "backgroundColor": "#f5f5f5" } }, "content": { ".container ": { "backgroundColor": "#ffffff", "paddingTop": "30rpx", "paddingRight": "30rpx", "paddingBottom": "30rpx", "paddingLeft": "30rpx", "borderTopLeftRadius": "20rpx", "borderTopRightRadius": "20rpx", "borderBottomRightRadius": "20rpx", "borderBottomLeftRadius": "20rpx" } }, "item": { ".container .content ": { "display": "flex", "flexDirection": "row" } }, "unread": { ".container .content .item ": { "width": "20rpx", "height": "20rpx", "marginRight": "10rpx" } }, "item-content": { ".container .content .item ": { "borderBottomWidth": "1rpx", "borderBottomStyle": "solid", "borderBottomColor": "#f1f1f1", "paddingBottom": "20rpx", "marginBottom": "20rpx", "flex": 1 } }, "item-content-bottom": { ".container .content .item .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-between", "marginTop": "10rpx" } }, "tag-time": { ".container .content .item .item-content ": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-between", "marginTop": "10rpx" } }, "fui-tag__wrap": { ".container .content .item .item-content .tag-time ": { "!width": "70rpx", "!height": "40rpx", "!paddingTop": "5rpx", "!paddingRight": "10rpx", "!paddingBottom": "5rpx", "!paddingLeft": "10rpx", "!marginBottom": 0 } }, "fui-tag__text": { ".container .content .item .item-content .tag-time .fui-tag__wrap ": { "!fontSize": "22rpx" } } };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_fui_tag = resolveEasycom(vue.resolveDynamicComponent("fui-tag"), __easycom_0);
    const _component_fui_button = resolveEasycom(vue.resolveDynamicComponent("fui-button"), __easycom_1$3);
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
  const PagesMessageMessageSystemMessageSystem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["styles", [_style_0$1]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/messageSystem/messageSystem.uvue"]]);
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
