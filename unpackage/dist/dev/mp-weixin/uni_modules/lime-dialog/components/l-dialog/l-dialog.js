"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeDialog_components_lDialog_utils = require("./utils.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_l_button_1 = common_vendor.resolveComponent("l-button");
  const _easycom_l_popup_1 = common_vendor.resolveComponent("l-popup");
  (_easycom_l_icon_1 + _easycom_l_button_1 + _easycom_l_popup_1)();
}
const _easycom_l_icon = () => "../../../lime-icon/components/l-icon/l-icon.js";
const _easycom_l_button = () => "../../../lime-button/components/l-button/l-button.js";
const _easycom_l_popup = () => "../../../lime-popup/components/l-popup/l-popup.js";
if (!Math) {
  (_easycom_l_icon + _easycom_l_button + _easycom_l_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-dialog",
  props: /* @__PURE__ */ common_vendor.mergeModels(new UTSJSONObject({
    actions: {},
    buttonLayout: { default: "horizontal" },
    cancelBtn: {},
    closeBtn: { type: Boolean },
    closeOnClickOverlay: { type: Boolean, default: true },
    confirmBtn: {},
    content: {},
    overlayStyle: {},
    preventScrollThrough: { type: Boolean, default: true },
    overlay: { type: Boolean, default: true },
    title: {},
    visible: { type: Boolean },
    zIndex: {},
    lStyle: {}
  }), new UTSJSONObject({
    "modelValue": { type: Boolean, default: false },
    "modelModifiers": {}
  })),
  emits: /* @__PURE__ */ common_vendor.mergeModels(["action", "confirm", "cancel", "click", "agreeprivacyauthorization", "chooseavatar", "getuserinfo", "contact", "getphonenumber", "error", "opensetting", "launchapp"], ["update:modelValue"]),
  setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const emit = __emit;
    const props = __props;
    const dialogCallbacks = common_vendor.reactive({
      beforeClose: null,
      onAction: null,
      onConfirm: null,
      onCancel: null
    });
    const innerOptions = common_vendor.reactive({
      actions: props.actions,
      buttonLayout: props.buttonLayout,
      cancelBtn: props.cancelBtn,
      closeBtn: props.closeBtn,
      closeOnClickOverlay: props.closeOnClickOverlay,
      confirmBtn: props.confirmBtn,
      content: props.content,
      overlayStyle: props.overlayStyle,
      preventScrollThrough: props.preventScrollThrough,
      overlay: props.overlay,
      title: props.title,
      visible: props.visible,
      zIndex: props.zIndex
    });
    const modelValue = common_vendor.useModel(__props, "modelValue");
    const innerValue = common_vendor.computed({
      set(value) {
        modelValue.value = value;
        if (!value) {
          dialogCallbacks.beforeClose = null;
          dialogCallbacks.onConfirm = null;
          dialogCallbacks.onCancel = null;
        }
      },
      get() {
        var _a2;
        return ((_a2 = props.visible) !== null && _a2 !== void 0 ? _a2 : false) || modelValue.value;
      }
    });
    const closeBtnProps = common_vendor.computed(() => {
      var _a2, _b;
      return (_b = (_a2 = innerOptions.closeBtn) !== null && _a2 !== void 0 ? _a2 : props.closeBtn) !== null && _b !== void 0 ? _b : false;
    });
    const cancelBtnProps = common_vendor.computed(() => {
      var _a2;
      return uni_modules_limeDialog_components_lDialog_utils.parseToObject((_a2 = props.cancelBtn) !== null && _a2 !== void 0 ? _a2 : innerOptions.cancelBtn);
    });
    const confirmBtnProps = common_vendor.computed(() => {
      var _a2;
      return uni_modules_limeDialog_components_lDialog_utils.parseToObject((_a2 = props.confirmBtn) !== null && _a2 !== void 0 ? _a2 : innerOptions.confirmBtn);
    });
    const innerTitle = common_vendor.computed(() => {
      var _a2;
      return (_a2 = props.title) !== null && _a2 !== void 0 ? _a2 : innerOptions.title;
    });
    const innerButtonLayout = common_vendor.computed(() => {
      var _a2;
      return (_a2 = innerOptions.buttonLayout) !== null && _a2 !== void 0 ? _a2 : props.buttonLayout;
    });
    const innerActions = common_vendor.computed(() => {
      var _a2;
      return (_a2 = props.actions) !== null && _a2 !== void 0 ? _a2 : innerOptions.actions;
    });
    const buttonVariant = common_vendor.computed(() => {
      var _a2;
      const res1 = [confirmBtnProps.value, cancelBtnProps.value].some((item = null) => {
        return (item === null || item === void 0 ? null : item["variant"]) == "text";
      });
      const res2 = (_a2 = innerActions.value) === null || _a2 === void 0 ? null : _a2.some((item) => {
        return item["variant"] == "text";
      });
      return res1 || (res2 !== null && res2 !== void 0 ? res2 : false);
    });
    const buttonStyle = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (innerButtonLayout.value == "horizontal") {
        style.set("flex-grow", 1);
      } else {
        style.set("flex-grow", 0);
      }
      style.set("padding", 0);
      if (buttonVariant.value) {
        style.set("border-top", `1px solid #e7e7e7`);
        style.set("border-radius", "0");
        style.set("border-left", `1px solid #e7e7e7`);
      }
      return style;
    });
    const onClose = (type) => {
      if (dialogCallbacks.beforeClose != null) {
        dialogCallbacks.beforeClose(type).then((res) => {
          innerValue.value = false;
        });
        return null;
      }
      innerValue.value = false;
    };
    const onTplButtonTap = (type, extra = null) => {
      if (type == "confirm") {
        emit("confirm");
        if (dialogCallbacks.onConfirm != null) {
          dialogCallbacks.onConfirm(null);
          onClose("confirm");
        }
      } else if (type == "cancel") {
        emit("cancel");
        if (dialogCallbacks.onCancel != null) {
          dialogCallbacks.onCancel(true);
          onClose("cancel");
        }
      } else if (type == "action" && extra != null) {
        emit("action", extra);
        if (dialogCallbacks.onAction != null) {
          dialogCallbacks.onAction(extra);
          onClose("action");
        }
      }
    };
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
    const agreeprivacyauthorization = (e) => {
      emit("agreeprivacyauthorization", e);
    };
    const overlayClick = () => {
      if (props.closeOnClickOverlay) {
        onClose("cancel");
      }
    };
    const _updateOptions = (options) => {
      var _a2, _b, _c, _d, _g, _h, _j, _k, _l, _m, _q, _r;
      innerOptions.actions = (_a2 = options.getArray("actions")) !== null && _a2 !== void 0 ? _a2 : props.actions;
      innerOptions.buttonLayout = (_b = options.getString("buttonLayout")) !== null && _b !== void 0 ? _b : props.buttonLayout;
      const maxLengthSuggestion = innerOptions.buttonLayout == "vertical" ? 7 : 3;
      if (innerOptions.actions != null && (innerOptions.actions.length == 0 || innerOptions.actions.length > maxLengthSuggestion)) {
        common_vendor.index.__f__("warn", "at uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue:390", `action 数量建议控制在1至${maxLengthSuggestion}个`);
      }
      innerOptions.cancelBtn = (_c = options["cancelBtn"]) !== null && _c !== void 0 ? _c : props.cancelBtn;
      innerOptions.closeBtn = (_d = options.getBoolean("closeBtn")) !== null && _d !== void 0 ? _d : props.closeBtn;
      innerOptions.closeOnClickOverlay = (_g = options.getBoolean("closeOnClickOverlay")) !== null && _g !== void 0 ? _g : props.closeOnClickOverlay;
      innerOptions.confirmBtn = (_h = options.get("confirmBtn")) !== null && _h !== void 0 ? _h : props.confirmBtn;
      innerOptions.content = (_j = options.getString("content")) !== null && _j !== void 0 ? _j : props.content;
      innerOptions.overlayStyle = (_k = options.getString("overlayStyle")) !== null && _k !== void 0 ? _k : props.overlayStyle;
      innerOptions.preventScrollThrough = (_l = options.getBoolean("preventScrollThrough")) !== null && _l !== void 0 ? _l : props.preventScrollThrough;
      innerOptions.overlay = (_m = options.getBoolean("overlay")) !== null && _m !== void 0 ? _m : props.overlay;
      innerOptions.title = (_q = options.getString("title")) !== null && _q !== void 0 ? _q : props.title;
      innerOptions.zIndex = (_r = options.getNumber("zIndex")) !== null && _r !== void 0 ? _r : props.zIndex;
    };
    const _show = (options) => {
      _updateOptions(options);
      innerValue.value = true;
      try {
        const beforeClose = options["beforeClose"];
        if (typeof beforeClose == "function") {
          dialogCallbacks.beforeClose = beforeClose;
        }
      } catch (err) {
        common_vendor.index.__f__("warn", "at uni_modules/lime-dialog/components/l-dialog/l-dialog.uvue:416", err);
      }
      return new Promise((resolve, reject) => {
        dialogCallbacks.onConfirm = resolve;
        dialogCallbacks.onAction = resolve;
        dialogCallbacks.onCancel = reject;
      });
    };
    const _close = () => {
      innerValue.value = false;
    };
    __expose(new UTSJSONObject({
      // dialogCallbacks,
      // alert: _alert,
      close: _close,
      // action: _action,
      // confirm: _confirm,
      show: _show
    }));
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c, _d, _g, _h, _j, _k, _l, _m, _q, _r, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77;
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.unref(closeBtnProps)
      }), common_vendor.unref(closeBtnProps) ? new UTSJSONObject({
        b: common_vendor.p(new UTSJSONObject({
          name: "close",
          size: "44rpx"
        })),
        c: common_vendor.o(($event = null) => {
          return onClose("close");
        })
      }) : new UTSJSONObject({}), new UTSJSONObject({
        d: common_vendor.unref(innerTitle) != null
      }), common_vendor.unref(innerTitle) != null ? {
        e: common_vendor.t((_a2 = _ctx.title) !== null && _a2 !== void 0 ? _a2 : common_vendor.unref(innerOptions).title)
      } : new UTSJSONObject({}), {
        f: common_vendor.t((_b = common_vendor.unref(innerOptions).content) !== null && _b !== void 0 ? _b : _ctx.content),
        g: common_vendor.unref(innerTitle) != null || _ctx.$slots["title"] != null ? 1 : "",
        h: common_vendor.unref(innerActions) != null
      }, common_vendor.unref(innerActions) != null ? {
        i: common_vendor.f(common_vendor.unref(innerActions), (action = null, index = null, i0 = null) => {
          var _a3, _b2, _c2, _d2, _g2, _h2, _j2, _k2, _l2, _m2, _q2, _r2, _u2, _v2, _w2, _x2, _y2, _z2, _02, _110;
          return {
            a: common_vendor.t(action["content"]),
            b: index,
            c: common_vendor.s(new UTSJSONObject({
              "margin-left": common_vendor.unref(innerButtonLayout) == "horizontal" && !common_vendor.unref(buttonVariant) && index > 0 ? "20rpx" : "0",
              "margin-bottom": common_vendor.unref(innerButtonLayout) == "vertical" && !common_vendor.unref(buttonVariant) && index > 0 ? "20rpx" : "0"
            })),
            d: index,
            e: common_vendor.o(($event = null) => {
              return onTplButtonTap("action", index);
            }, index),
            f: common_vendor.o(getuserinfo, index),
            g: common_vendor.o(contact, index),
            h: common_vendor.o(getphonenumber, index),
            i: common_vendor.o(error, index),
            j: common_vendor.o(opensetting, index),
            k: common_vendor.o(launchapp, index),
            l: common_vendor.o(agreeprivacyauthorization, index),
            m: "1302e388-2-" + i0 + ",1302e388-0",
            n: common_vendor.p({
              block: (_a3 = action.getBoolean("block")) !== null && _a3 !== void 0 ? _a3 : false,
              disabled: (_b2 = action.getBoolean("disabled")) !== null && _b2 !== void 0 ? _b2 : false,
              content: (_c2 = action.getString("content")) !== null && _c2 !== void 0 ? _c2 : "",
              icon: (_d2 = action.getString("icon")) !== null && _d2 !== void 0 ? _d2 : "",
              loading: (_g2 = action.getBoolean("loading")) !== null && _g2 !== void 0 ? _g2 : false,
              type: (_h2 = action.getString("type")) !== null && _h2 !== void 0 ? _h2 : "primary",
              ghost: (_j2 = action.getBoolean("loading")) !== null && _j2 !== void 0 ? _j2 : false,
              shape: (_k2 = action.getString("shape")) !== null && _k2 !== void 0 ? _k2 : "rectangle",
              size: (_l2 = action.getString("size")) !== null && _l2 !== void 0 ? _l2 : "medium",
              variant: action.getString("variant"),
              ["open-type"]: (_m2 = action.getString("openType")) !== null && _m2 !== void 0 ? _m2 : "",
              color: action.getString("color"),
              textColor: action.getString("textColor"),
              fontSize: action.getString("fontSize"),
              ["hover-stop-propagation"]: (_q2 = action.getBoolean("hoverStopPropagation")) !== null && _q2 !== void 0 ? _q2 : false,
              ["hover-start-time"]: (_r2 = action.getNumber("hoverStartTime")) !== null && _r2 !== void 0 ? _r2 : 20,
              ["hover-stay-time"]: (_u2 = action.getNumber("hoverStayTime")) !== null && _u2 !== void 0 ? _u2 : 70,
              lang: (_v2 = action.getString("lang")) !== null && _v2 !== void 0 ? _v2 : "en",
              ["session-from"]: (_w2 = action.getString("sessionFrom")) !== null && _w2 !== void 0 ? _w2 : "",
              ["send-message-title"]: (_x2 = action.getString("sendMessageTitle")) !== null && _x2 !== void 0 ? _x2 : "",
              ["send-message-path"]: (_y2 = action.getString("sendMessagePath")) !== null && _y2 !== void 0 ? _y2 : "",
              ["send-message-img"]: (_z2 = action.getString("sendMessageImg")) !== null && _z2 !== void 0 ? _z2 : "",
              ["app-parameter"]: (_02 = action.getString("appParameter")) !== null && _02 !== void 0 ? _02 : "",
              ["show-message-card"]: (_110 = action.getBoolean("showMessageCard")) !== null && _110 !== void 0 ? _110 : false
            })
          };
        }),
        j: common_vendor.n("l-dialog__button--" + common_vendor.unref(innerButtonLayout)),
        k: common_vendor.n(new UTSJSONObject({
          "l-dialog__button--text": common_vendor.unref(buttonVariant)
        })),
        l: common_vendor.s(common_vendor.unref(buttonStyle))
      } : new UTSJSONObject({}), new UTSJSONObject({
        m: common_vendor.unref(cancelBtnProps) != null
      }), common_vendor.unref(cancelBtnProps) != null ? {
        n: common_vendor.t((_c = common_vendor.unref(cancelBtnProps)) === null || _c === void 0 ? null : _c.getString("content")),
        o: common_vendor.s(common_vendor.unref(buttonStyle)),
        p: common_vendor.n("l-dialog__button--" + common_vendor.unref(innerButtonLayout)),
        q: common_vendor.n(new UTSJSONObject({
          "l-dialog__button--text": common_vendor.unref(buttonVariant)
        })),
        r: common_vendor.o(($event = null) => {
          return onTplButtonTap("cancel", null);
        }),
        s: common_vendor.o(getuserinfo),
        t: common_vendor.o(contact),
        v: common_vendor.o(getphonenumber),
        w: common_vendor.o(error),
        x: common_vendor.o(opensetting),
        y: common_vendor.o(launchapp),
        z: common_vendor.o(agreeprivacyauthorization),
        A: common_vendor.p({
          block: (_g = (_d = common_vendor.unref(cancelBtnProps)) === null || _d === void 0 ? null : _d.getBoolean("block")) !== null && _g !== void 0 ? _g : false,
          disabled: (_j = (_h = common_vendor.unref(cancelBtnProps)) === null || _h === void 0 ? null : _h.getBoolean("disabled")) !== null && _j !== void 0 ? _j : false,
          content: (_l = (_k = common_vendor.unref(cancelBtnProps)) === null || _k === void 0 ? null : _k.getString("content")) !== null && _l !== void 0 ? _l : "",
          icon: (_q = (_m = common_vendor.unref(cancelBtnProps)) === null || _m === void 0 ? null : _m.getString("icon")) !== null && _q !== void 0 ? _q : "",
          loading: (_u = (_r = common_vendor.unref(cancelBtnProps)) === null || _r === void 0 ? null : _r.getBoolean("loading")) !== null && _u !== void 0 ? _u : false,
          type: (_w = (_v = common_vendor.unref(cancelBtnProps)) === null || _v === void 0 ? null : _v.getString("type")) !== null && _w !== void 0 ? _w : "primary",
          ghost: (_y = (_x = common_vendor.unref(cancelBtnProps)) === null || _x === void 0 ? null : _x.getBoolean("loading")) !== null && _y !== void 0 ? _y : false,
          shape: (_0 = (_z = common_vendor.unref(cancelBtnProps)) === null || _z === void 0 ? null : _z.getString("shape")) !== null && _0 !== void 0 ? _0 : "rectangle",
          size: (_2 = (_1 = common_vendor.unref(cancelBtnProps)) === null || _1 === void 0 ? null : _1.getString("size")) !== null && _2 !== void 0 ? _2 : "medium",
          variant: (_4 = (_3 = common_vendor.unref(cancelBtnProps)) === null || _3 === void 0 ? null : _3.getString("variant")) !== null && _4 !== void 0 ? _4 : "light",
          ["open-type"]: (_5 = common_vendor.unref(cancelBtnProps)) === null || _5 === void 0 ? null : _5.getString("openType"),
          color: (_6 = common_vendor.unref(cancelBtnProps)) === null || _6 === void 0 ? null : _6.getString("color"),
          textColor: (_7 = common_vendor.unref(cancelBtnProps)) === null || _7 === void 0 ? null : _7.getString("textColor"),
          fontSize: (_8 = common_vendor.unref(cancelBtnProps)) === null || _8 === void 0 ? null : _8.getString("fontSize"),
          ["hover-stop-propagation"]: (_10 = (_9 = common_vendor.unref(cancelBtnProps)) === null || _9 === void 0 ? null : _9.getBoolean("hoverStopPropagation")) !== null && _10 !== void 0 ? _10 : false,
          ["hover-start-time"]: (_12 = (_11 = common_vendor.unref(cancelBtnProps)) === null || _11 === void 0 ? null : _11.getNumber("hoverStartTime")) !== null && _12 !== void 0 ? _12 : 20,
          ["hover-stay-time"]: (_14 = (_13 = common_vendor.unref(cancelBtnProps)) === null || _13 === void 0 ? null : _13.getNumber("hoverStayTime")) !== null && _14 !== void 0 ? _14 : 70,
          lang: (_16 = (_15 = common_vendor.unref(cancelBtnProps)) === null || _15 === void 0 ? null : _15.getString("lang")) !== null && _16 !== void 0 ? _16 : "en",
          ["session-from"]: (_18 = (_17 = common_vendor.unref(cancelBtnProps)) === null || _17 === void 0 ? null : _17.getString("sessionFrom")) !== null && _18 !== void 0 ? _18 : "",
          ["send-message-title"]: (_20 = (_19 = common_vendor.unref(cancelBtnProps)) === null || _19 === void 0 ? null : _19.getString("sendMessageTitle")) !== null && _20 !== void 0 ? _20 : "",
          ["send-message-path"]: (_22 = (_21 = common_vendor.unref(cancelBtnProps)) === null || _21 === void 0 ? null : _21.getString("sendMessagePath")) !== null && _22 !== void 0 ? _22 : "",
          ["send-message-img"]: (_24 = (_23 = common_vendor.unref(cancelBtnProps)) === null || _23 === void 0 ? null : _23.getString("sendMessageImg")) !== null && _24 !== void 0 ? _24 : "",
          ["app-parameter"]: (_26 = (_25 = common_vendor.unref(cancelBtnProps)) === null || _25 === void 0 ? null : _25.getString("appParameter")) !== null && _26 !== void 0 ? _26 : "",
          ["show-message-card"]: (_28 = (_27 = common_vendor.unref(cancelBtnProps)) === null || _27 === void 0 ? null : _27.getBoolean("showMessageCard")) !== null && _28 !== void 0 ? _28 : false
        })
      } : new UTSJSONObject({}), new UTSJSONObject({
        B: common_vendor.unref(confirmBtnProps) != null
      }), common_vendor.unref(confirmBtnProps) != null ? {
        C: common_vendor.t((_29 = common_vendor.unref(confirmBtnProps)) === null || _29 === void 0 ? null : _29.getString("content")),
        D: common_vendor.n("l-dialog__button--" + common_vendor.unref(innerButtonLayout)),
        E: common_vendor.n(new UTSJSONObject({
          "l-dialog__button--text": common_vendor.unref(buttonVariant)
        })),
        F: common_vendor.s(common_vendor.unref(buttonStyle)),
        G: common_vendor.s(new UTSJSONObject({
          "margin-left": common_vendor.unref(cancelBtnProps) != null && common_vendor.unref(innerButtonLayout) == "horizontal" && !common_vendor.unref(buttonVariant) ? "24rpx" : "0",
          "margin-bottom": common_vendor.unref(cancelBtnProps) != null && common_vendor.unref(innerButtonLayout) == "vertical" && !common_vendor.unref(buttonVariant) ? "24rpx" : "0"
        })),
        H: common_vendor.o(($event = null) => {
          return onTplButtonTap("confirm", null);
        }),
        I: common_vendor.o(getuserinfo),
        J: common_vendor.o(contact),
        K: common_vendor.o(getphonenumber),
        L: common_vendor.o(error),
        M: common_vendor.o(opensetting),
        N: common_vendor.o(launchapp),
        O: common_vendor.o(agreeprivacyauthorization),
        P: common_vendor.p({
          block: (_31 = (_30 = common_vendor.unref(confirmBtnProps)) === null || _30 === void 0 ? null : _30.getBoolean("block")) !== null && _31 !== void 0 ? _31 : false,
          disabled: (_33 = (_32 = common_vendor.unref(confirmBtnProps)) === null || _32 === void 0 ? null : _32.getBoolean("disabled")) !== null && _33 !== void 0 ? _33 : false,
          content: (_35 = (_34 = common_vendor.unref(confirmBtnProps)) === null || _34 === void 0 ? null : _34.getString("content")) !== null && _35 !== void 0 ? _35 : "",
          icon: (_37 = (_36 = common_vendor.unref(confirmBtnProps)) === null || _36 === void 0 ? null : _36.getString("icon")) !== null && _37 !== void 0 ? _37 : "",
          loading: (_39 = (_38 = common_vendor.unref(confirmBtnProps)) === null || _38 === void 0 ? null : _38.getBoolean("loading")) !== null && _39 !== void 0 ? _39 : false,
          type: (_41 = (_40 = common_vendor.unref(confirmBtnProps)) === null || _40 === void 0 ? null : _40.getString("type")) !== null && _41 !== void 0 ? _41 : "primary",
          ghost: (_43 = (_42 = common_vendor.unref(confirmBtnProps)) === null || _42 === void 0 ? null : _42.getBoolean("loading")) !== null && _43 !== void 0 ? _43 : false,
          shape: (_45 = (_44 = common_vendor.unref(confirmBtnProps)) === null || _44 === void 0 ? null : _44.getString("shape")) !== null && _45 !== void 0 ? _45 : "rectangle",
          size: (_47 = (_46 = common_vendor.unref(confirmBtnProps)) === null || _46 === void 0 ? null : _46.getString("size")) !== null && _47 !== void 0 ? _47 : "medium",
          variant: (_49 = (_48 = common_vendor.unref(confirmBtnProps)) === null || _48 === void 0 ? null : _48.getString("variant")) !== null && _49 !== void 0 ? _49 : "solid",
          ["open-type"]: (_50 = common_vendor.unref(confirmBtnProps)) === null || _50 === void 0 ? null : _50.getString("openType"),
          color: (_51 = common_vendor.unref(confirmBtnProps)) === null || _51 === void 0 ? null : _51.getString("color"),
          textColor: (_52 = common_vendor.unref(confirmBtnProps)) === null || _52 === void 0 ? null : _52.getString("textColor"),
          fontSize: (_53 = common_vendor.unref(confirmBtnProps)) === null || _53 === void 0 ? null : _53.getString("fontSize"),
          ["hover-stop-propagation"]: (_55 = (_54 = common_vendor.unref(confirmBtnProps)) === null || _54 === void 0 ? null : _54.getBoolean("hoverStopPropagation")) !== null && _55 !== void 0 ? _55 : false,
          ["hover-start-time"]: (_57 = (_56 = common_vendor.unref(confirmBtnProps)) === null || _56 === void 0 ? null : _56.getNumber("hoverStartTime")) !== null && _57 !== void 0 ? _57 : 20,
          ["hover-stay-time"]: (_59 = (_58 = common_vendor.unref(confirmBtnProps)) === null || _58 === void 0 ? null : _58.getNumber("hoverStayTime")) !== null && _59 !== void 0 ? _59 : 70,
          lang: (_61 = (_60 = common_vendor.unref(confirmBtnProps)) === null || _60 === void 0 ? null : _60.getString("lang")) !== null && _61 !== void 0 ? _61 : "en",
          ["session-from"]: (_63 = (_62 = common_vendor.unref(confirmBtnProps)) === null || _62 === void 0 ? null : _62.getString("sessionFrom")) !== null && _63 !== void 0 ? _63 : "",
          ["send-message-title"]: (_65 = (_64 = common_vendor.unref(confirmBtnProps)) === null || _64 === void 0 ? null : _64.getString("sendMessageTitle")) !== null && _65 !== void 0 ? _65 : "",
          ["send-message-path"]: (_67 = (_66 = common_vendor.unref(confirmBtnProps)) === null || _66 === void 0 ? null : _66.getString("sendMessagePath")) !== null && _67 !== void 0 ? _67 : "",
          ["send-message-img"]: (_69 = (_68 = common_vendor.unref(confirmBtnProps)) === null || _68 === void 0 ? null : _68.getString("sendMessageImg")) !== null && _69 !== void 0 ? _69 : "",
          ["app-parameter"]: (_71 = (_70 = common_vendor.unref(confirmBtnProps)) === null || _70 === void 0 ? null : _70.getString("appParameter")) !== null && _71 !== void 0 ? _71 : "",
          ["show-message-card"]: (_73 = (_72 = common_vendor.unref(confirmBtnProps)) === null || _72 === void 0 ? null : _72.getBoolean("showMessageCard")) !== null && _73 !== void 0 ? _73 : false
        })
      } : new UTSJSONObject({}), {
        Q: common_vendor.n("l-dialog__footer--" + common_vendor.unref(innerButtonLayout)),
        R: common_vendor.n(new UTSJSONObject({
          "l-dialog__footer--column": common_vendor.unref(innerButtonLayout) == "vertical",
          "l-dialog__footer--full": common_vendor.unref(buttonVariant)
        })),
        S: common_vendor.gei(_ctx, ""),
        T: common_vendor.o(overlayClick),
        U: common_vendor.p({
          visible: common_vendor.unref(innerValue),
          overlay: (_74 = common_vendor.unref(innerOptions).overlay) !== null && _74 !== void 0 ? _74 : _ctx.overlay,
          ["bg-color"]: "transparent",
          closeOnClickOverlay: (_75 = common_vendor.unref(innerOptions).closeOnClickOverlay) !== null && _75 !== void 0 ? _75 : _ctx.closeOnClickOverlay,
          preventScrollThrough: (_76 = common_vendor.unref(innerOptions).preventScrollThrough) !== null && _76 !== void 0 ? _76 : _ctx.preventScrollThrough,
          zIndex: (_77 = _ctx.zIndex) !== null && _77 !== void 0 ? _77 : common_vendor.unref(innerOptions).zIndex,
          position: "center",
          id: common_vendor.gei(_ctx, "")
        })
      });
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-dialog/components/l-dialog/l-dialog.js.map
