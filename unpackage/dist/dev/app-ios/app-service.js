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
    const id = "app-ios_0ktG6t";
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
  class NavTitleItem extends UTS.UTSType {
    static get$UTSMetadata$() {
      return {
        kind: 2,
        get fields() {
          return {
            name: { type: String, optional: false },
            isCurrent: { type: Boolean, optional: false },
            url: { type: String, optional: false }
          };
        },
        name: "NavTitleItem"
      };
    }
    constructor(options, metadata = NavTitleItem.get$UTSMetadata$(), isJSONParse = false) {
      super();
      this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
      this.name = this.__props__.name;
      this.isCurrent = this.__props__.isCurrent;
      this.url = this.__props__.url;
      delete this.__props__;
    }
  }
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "TopNavBar",
    props: {
      title: new UTSJSONObject({
        type: Array,
        default: () => {
          return [];
        }
      }),
      showBack: new UTSJSONObject({
        type: Boolean,
        default: false
      }),
      messageCount: new UTSJSONObject({
        type: Number,
        default: 0
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
      const changeNav = (item) => {
        uni.__log__("log", "at components/TopNavBar.uvue:47", item.isCurrent);
        uni.redirectTo({
          url: item.url
        });
      };
      const __returned__ = { props, emits, goBack, onMessage, onAdd, changeNav };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  const _imports_0 = "/static/tabbar/back.png";
  const _imports_1 = "/static/tabbar/add.png";
  const _style_0$4 = { "custom-nav": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "paddingTop": "30rpx", "paddingRight": "25rpx", "paddingBottom": "30rpx", "paddingLeft": "25rpx", "backgroundColor": "#ffffff", "marginTop": "60rpx" } }, "nav-back": { "": { "width": "32rpx", "height": "32rpx", "display": "flex", "alignItems": "center", "justifyContent": "center" } }, "nav-item": { "": { "display": "flex", "flexDirection": "row", "alignItems": "flex-end", "justifyContent": "space-around" } }, "nav-title": { "": { "color": "#333333", "marginTop": 0, "marginRight": "20rpx", "marginBottom": 0, "marginLeft": "20rpx", "maxWidth": "400rpx", "textAlign": "center", "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap" } }, "nav-actions": { "": { "display": "flex", "flexDirection": "row", "alignItems": "center" } }, "nav-icon": { "": { "width": "60rpx", "height": "60rpx", "display": "flex", "alignItems": "center", "justifyContent": "center", "position": "relative", "marginLeft": "16rpx" } } };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "custom-nav" }, [
      $setup.props.showBack ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "nav-back",
        onClick: $setup.goBack
      }, [
        vue.createCommentVNode(' <uv-icon name="arrow-left" color="#333" size="28"></uv-icon> '),
        vue.createElementVNode("image", {
          class: "nav-icon",
          onClick: $setup.goBack,
          src: _imports_0
        })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", { class: "nav-item" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.props.title, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("text", {
              class: "nav-title",
              style: vue.normalizeStyle(item.isCurrent ? "font-size:40rpx; font-weight:900" : ""),
              key: index,
              onClick: ($event) => $setup.changeNav(item)
            }, vue.toDisplayString(item.name), 13, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "nav-actions" }, [
        vue.createElementVNode("image", {
          class: "nav-icon",
          onClick: $setup.onAdd,
          src: _imports_1
        })
      ])
    ]);
  }
  const TopNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["styles", [_style_0$4]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/components/TopNavBar.uvue"]]);
  const forward = "/static/video/forward.png";
  const errIcon = "/static/video/error.png";
  const transfer = "/static/video/transfer.png";
  const replayIcon = "/static/video/replay.png";
  const playIcon = "/static/video/play.png";
  const pauseIcon = "/static/video/pause.png";
  const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "index",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const title = [new NavTitleItem({
        name: "首页",
        isCurrent: true,
        url: "/pages/index/index"
      }), new NavTitleItem({
        name: "消息",
        isCurrent: false,
        url: "/pages/message/message"
      }), new NavTitleItem({
        name: "我的",
        isCurrent: false,
        url: "/pages/mine/mine"
      })];
      const deviceTitle = vue.ref("设备名称");
      const navAdd = () => {
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
        uni.showToast({
          title: "暂停",
          icon: "none"
        });
      };
      const __returned__ = { title, deviceTitle, forward, errIcon, transfer, replayIcon, playIcon, pauseIcon, videoSrc, navAdd, replay, transferClick, errClick, toDeviceDetail, pauseClick, get TopNavBar() {
        return TopNavBar;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$3 = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column" } }, "content": { ".container ": { "position": "relative" } }, "video": { ".container .content ": { "width": "100%" } }, "video-top-title": { ".container .content ": { "position": "absolute", "top": 0, "height": "60rpx", "width": "80%", "paddingLeft": "20rpx", "backgroundImage": "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor": "rgba(0,0,0,0)" } }, "video-right-control": { ".container .content ": { "position": "absolute", "top": 0, "right": "10rpx", "display": "flex", "flexDirection": "column", "justifyContent": "space-around", "height": "100%", "alignItems": "center", "zIndex": 2 } }, "vedio-control-icon": { ".container .content .video-right-control ": { "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" }, ".container .content .video-bottom-control ": { "marginTop": 0, "marginRight": "auto", "marginBottom": 0, "marginLeft": "auto", "width": "50rpx", "height": "50rpx", "paddingTop": "10rpx", "paddingRight": "10rpx", "paddingBottom": "10rpx", "paddingLeft": "10rpx", "borderTopLeftRadius": "25rpx", "borderTopRightRadius": "25rpx", "borderBottomRightRadius": "25rpx", "borderBottomLeftRadius": "25rpx", "backgroundImage": "none", "backgroundColor": "rgba(255,255,255,0.7)" } }, "video-bottom-control": { ".container .content ": { "position": "absolute", "bottom": "10rpx", "left": 0, "width": "100%", "height": "50rpx", "zIndex": 1 } } };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_icon = vue.resolveComponent("uv-icon");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "nav_bar" }, [
        vue.createVNode($setup["TopNavBar"], {
          showBack: false,
          title: $setup.title,
          onAdd: $setup.navAdd
        })
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("video", {
          class: "video",
          src: $setup.videoSrc,
          controls: false
        }),
        vue.createElementVNode(
          "view",
          { class: "video-top-title" },
          vue.toDisplayString($setup.deviceTitle),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "video-right-control" }, [
          vue.createVNode(_component_uv_icon, {
            class: "vedio-control-icon",
            name: $setup.forward,
            onClick: $setup.toDeviceDetail
          }),
          vue.createVNode(_component_uv_icon, {
            class: "vedio-control-icon",
            name: $setup.errIcon,
            onClick: $setup.errClick
          }),
          vue.createVNode(_component_uv_icon, {
            class: "vedio-control-icon",
            name: $setup.transfer,
            onClick: $setup.transferClick
          }),
          vue.createVNode(_component_uv_icon, {
            class: "vedio-control-icon",
            name: $setup.replayIcon,
            onClick: $setup.replay
          })
        ]),
        vue.createElementVNode("view", { class: "video-bottom-control" }, [
          vue.createVNode(_component_uv_icon, {
            class: "vedio-control-icon",
            onClick: $setup.pauseClick,
            name: $setup.pauseIcon
          })
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["styles", [_style_0$3]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/index/index.uvue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "message",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const title = [new NavTitleItem({
        name: "首页",
        isCurrent: false,
        url: "/pages/index/index"
      }), new NavTitleItem({
        name: "消息",
        isCurrent: true,
        url: "/pages/message/message"
      }), new NavTitleItem({
        name: "我的",
        isCurrent: false,
        url: "/pages/mine/mine"
      })];
      const __returned__ = { title, get TopNavBar() {
        return TopNavBar;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$2 = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column" } } };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "nav_bar" }, [
        vue.createVNode($setup["TopNavBar"], {
          showBack: false,
          title: $setup.title
        })
      ]),
      vue.createElementVNode("view", { class: "content" }, " Messages ")
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["styles", [_style_0$2]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/message/message.uvue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent(new UTSJSONObject({
    __name: "mine",
    setup(__props, _a) {
      var __expose = _a.expose;
      __expose();
      const title = [new NavTitleItem({
        name: "首页",
        isCurrent: false,
        url: "/pages/index/index"
      }), new NavTitleItem({
        name: "消息",
        isCurrent: false,
        url: "/pages/message/message"
      }), new NavTitleItem({
        name: "我的",
        isCurrent: true,
        url: "/pages/mine/mine"
      })];
      const __returned__ = { title, get TopNavBar() {
        return TopNavBar;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  }));
  const _style_0$1 = { "container": { "": { "width": "100%", "height": "100%", "paddingTop": 0, "paddingRight": "20rpx", "paddingBottom": 0, "paddingLeft": "20rpx", "display": "flex", "flexDirection": "column" } } };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "nav_bar" }, [
        vue.createVNode($setup["TopNavBar"], {
          showBack: false,
          title: $setup.title
        })
      ]),
      vue.createElementVNode("view", { class: "content" }, " Mine ")
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["styles", [_style_0$1]], ["__file", "/Users/xyhc/Documents/veepai_uniappx/pages/mine/mine.uvue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/mine/mine", PagesMineMine);
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
