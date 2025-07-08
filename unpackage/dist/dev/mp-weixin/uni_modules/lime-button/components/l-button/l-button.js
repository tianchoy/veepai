"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_l_loading_1 = common_vendor.resolveComponent("l-loading");
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  (_easycom_l_loading_1 + _easycom_l_icon_1)();
}
const _easycom_l_loading = () => "../../../lime-loading/components/l-loading/l-loading.js";
const _easycom_l_icon = () => "../../../lime-icon/components/l-icon/l-icon.js";
if (!Math) {
  (_easycom_l_loading + _easycom_l_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  behaviors: ["wx://form-field-button"]
}, { __name: "l-button", props: {
  ariaLabel: new UTSJSONObject({}),
  lId: new UTSJSONObject({}),
  content: new UTSJSONObject({}),
  block: new UTSJSONObject({ type: Boolean, default: false }),
  disabled: new UTSJSONObject({ type: Boolean, default: false }),
  ghost: new UTSJSONObject({ type: Boolean, default: false }),
  icon: new UTSJSONObject({}),
  iconSize: new UTSJSONObject({}),
  loading: new UTSJSONObject({ type: Boolean, default: false }),
  loadingProps: new UTSJSONObject({}),
  shape: new UTSJSONObject({ default: "rectangle" }),
  size: new UTSJSONObject({ default: "medium" }),
  suffix: new UTSJSONObject({}),
  type: new UTSJSONObject({ default: "default" }),
  variant: new UTSJSONObject({}),
  radius: new UTSJSONObject({}),
  fontSize: new UTSJSONObject({}),
  textColor: new UTSJSONObject({}),
  color: new UTSJSONObject({}),
  lStyle: new UTSJSONObject({}),
  gap: new UTSJSONObject({}),
  formType: new UTSJSONObject({}),
  openType: new UTSJSONObject({}),
  hoverClass: new UTSJSONObject({}),
  hoverStopPropagation: new UTSJSONObject({ type: Boolean, default: false }),
  hoverStartTime: new UTSJSONObject({ default: 20 }),
  hoverStayTime: new UTSJSONObject({ default: 70 }),
  lang: new UTSJSONObject({ default: "en" }),
  sessionFrom: new UTSJSONObject({ default: "" }),
  sendMessageTitle: new UTSJSONObject({ default: "" }),
  sendMessagePath: new UTSJSONObject({ default: "" }),
  sendMessageImg: new UTSJSONObject({ default: "" }),
  appParameter: new UTSJSONObject({ default: "" }),
  showMessageCard: new UTSJSONObject({ type: Boolean, default: false })
}, emits: ["click", "agreeprivacyauthorization", "chooseavatar", "getuserinfo", "contact", "getphonenumber", "error", "opensetting", "launchapp"], setup(__props, _a) {
  var __emit = _a.emit;
  const emit = __emit;
  const props = __props;
  const instance = common_vendor.getCurrentInstance();
  common_vendor.ref(null);
  common_vendor.computed(() => {
    var _a2, _b;
    return props.content != null || ((_b = (_a2 = instance === null || instance === void 0 ? null : instance.proxy) === null || _a2 === void 0 ? null : _a2.$slots) === null || _b === void 0 ? null : _b["default"]) != null;
  });
  const variant = common_vendor.computed(() => {
    var _a2;
    return (_a2 = props.variant) !== null && _a2 !== void 0 ? _a2 : props.color != null ? "solid" : props.type == "default" ? "outline" : "solid";
  });
  common_vendor.computed(() => {
    const cls = /* @__PURE__ */ new Map();
    const name = "l-button";
    cls.set(`${name}--${props.size}`, true);
    cls.set(`${name}--${props.type}`, true);
    cls.set(`${name}--${variant.value}`, true);
    cls.set(`${name}--${props.shape}`, true);
    cls.set(`${name}--disabled`, props.disabled);
    cls.set(`${name}--loading`, props.loading);
    cls.set(`${name}--ghost`, props.ghost);
    cls.set(`${name}--block`, props.block);
    return cls;
  });
  const styles = common_vendor.computed(() => {
    const style = /* @__PURE__ */ new Map();
    if (props.gap) {
      style.set("--l-button-gap", props.gap);
    }
    if (props.radius != null) {
      style.set("border-radius", props.radius);
    }
    if (props.color != null) {
      if (variant.value == "solid") {
        style.set("background", props.color);
      } else if (["outline", "dashed"].includes(variant.value)) {
        style.set("--l-button-default-border-color", props.color);
        style.set("--l-button-border-color", props.color);
      }
    }
    return style;
  });
  const sizes = /* @__PURE__ */ new Map([]);
  common_vendor.computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.iconSize) !== null && _a2 !== void 0 ? _a2 : props.fontSize) !== null && _b !== void 0 ? _b : UTS.mapGet(sizes, props.size);
  });
  const colors = /* @__PURE__ */ new Map([]);
  common_vendor.computed(() => {
    var _a2;
    return (_a2 = props.textColor) !== null && _a2 !== void 0 ? _a2 : variant.value == "solid" ? "white" : UTS.mapGet(colors, props.type);
  });
  common_vendor.computed(() => {
    return props.loading || props.icon != null ? "gap" : "";
  });
  const contentStyle = common_vendor.computed(() => {
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
  const hoverClasses = common_vendor.computed(() => {
    return props.disabled || props.loading ? "" : props.hoverClass || `hover`;
  });
  const computedVariant = common_vendor.computed(() => {
    var _a2;
    return (_a2 = props.variant) !== null && _a2 !== void 0 ? _a2 : props.color ? "solid" : props.type == "default" ? "outline" : "solid";
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
  return (_ctx = null, _cache = null) => {
    const __returned__ = common_vendor.e(new UTSJSONObject({
      a: _ctx.loading
    }), _ctx.loading ? new UTSJSONObject({
      b: common_vendor.p(new UTSJSONObject({
        inheritColor: true
      }))
    }) : new UTSJSONObject({}), new UTSJSONObject({
      c: _ctx.icon
    }), _ctx.icon ? new UTSJSONObject({
      d: common_vendor.p(new UTSJSONObject({
        name: _ctx.icon
      }))
    }) : new UTSJSONObject({}), new UTSJSONObject({
      e: _ctx.content || _ctx.$slots.default
    }), _ctx.content || _ctx.$slots.default ? new UTSJSONObject({
      f: common_vendor.t(_ctx.content),
      g: common_vendor.s(common_vendor.unref(contentStyle))
    }) : new UTSJSONObject({}), new UTSJSONObject({
      h: common_vendor.sei(common_vendor.gei(_ctx, _ctx.lId), "button"),
      i: common_vendor.s(common_vendor.unref(styles)),
      j: common_vendor.s(_ctx.lStyle),
      k: common_vendor.n("l-button--" + _ctx.size),
      l: common_vendor.n("l-button--" + _ctx.type),
      m: common_vendor.n("l-button--" + _ctx.shape),
      n: common_vendor.n("l-button--" + common_vendor.unref(computedVariant)),
      o: common_vendor.n(new UTSJSONObject({
        "l-button--ghost": _ctx.ghost,
        "l-button--block": _ctx.block,
        "l-button--disabled": _ctx.disabled,
        "l-button--loading": _ctx.loading
      })),
      p: _ctx.disabled || _ctx.loading ? "" : _ctx.formType,
      q: _ctx.disabled || _ctx.loading ? "" : _ctx.openType,
      r: _ctx.hoverStopPropagation,
      s: _ctx.hoverStartTime,
      t: _ctx.hoverStayTime,
      v: _ctx.lang,
      w: _ctx.sessionFrom,
      x: common_vendor.unref(hoverClasses),
      y: _ctx.sendMessageTitle,
      z: _ctx.sendMessagePath,
      A: _ctx.sendMessageImg,
      B: _ctx.appParameter,
      C: _ctx.showMessageCard,
      D: common_vendor.o(handleTap),
      E: common_vendor.o(getuserinfo),
      F: common_vendor.o(contact),
      G: common_vendor.o(getphonenumber),
      H: common_vendor.o(error),
      I: common_vendor.o(opensetting),
      J: common_vendor.o(launchapp),
      K: common_vendor.o(chooseavatar),
      L: common_vendor.o(agreeprivacyauthorization),
      M: _ctx.ariaLabel,
      N: _ctx.disabled || _ctx.loading
    }));
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-button/components/l-button/l-button.js.map
