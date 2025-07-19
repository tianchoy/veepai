"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_characterLimit_index = require("../../../lime-shared/characterLimit/index.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  _easycom_l_icon_1();
}
const _easycom_l_icon = () => "../../../lime-icon/components/l-icon/l-icon.js";
if (!Math) {
  _easycom_l_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-search",
  props: /* @__PURE__ */ common_vendor.mergeModels(new UTSJSONObject({
    action: {},
    adjustPosition: { type: Boolean, default: true },
    alwaysEmbed: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    confirmHold: { type: Boolean, default: false },
    confirmType: { default: "search" },
    cursor: {},
    cursorSpacing: { default: 0 },
    disabled: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    holdKeyboard: { type: Boolean, default: false },
    leftIcon: { default: "search" },
    maxcharacter: {},
    maxlength: { default: -1 },
    placeholder: {},
    placeholderClass: {},
    placeholderStyle: {},
    selectionEnd: { default: -1 },
    selectionStart: { default: -1 },
    shape: { default: "square" },
    type: { default: "text" },
    value: {},
    lStyle: {},
    cursorColor: {},
    padding: {},
    radius: {},
    height: {},
    bgColor: {},
    fontSize: {},
    textColor: {},
    iconColor: {},
    clearIconColor: {}
  }), new UTSJSONObject({
    "modelValue": { type: String, default: "" },
    "modelModifiers": {}
  })),
  emits: /* @__PURE__ */ common_vendor.mergeModels(["change", "blur", "clear", "focus", "submit", "action-click"], ["update:modelValue"]),
  setup(__props, _a) {
    var __emit = _a.emit;
    const emit = __emit;
    const props = __props;
    const focused = common_vendor.ref(props.focus);
    const modelValue = common_vendor.useModel(__props, "modelValue");
    const searchValue = common_vendor.computed({
      set(value) {
        modelValue.value = value;
        emit("change", value);
      },
      get() {
        var _a2;
        return (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : modelValue.value;
      }
    });
    const contentClass = common_vendor.computed(() => {
      const cls = /* @__PURE__ */ new Map();
      cls.set("l-search__content--focused", focused.value);
      cls.set("l-search__content--center", props.center);
      cls.set("l-search__content--" + props.shape, true);
      return cls;
    });
    const contextStyle = common_vendor.computed(() => {
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
    const inputStyle = common_vendor.computed(() => {
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
        const characters = uni_modules_limeShared_characterLimit_index.characterLimit("maxcharacter", value, maxcharacter).characters;
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
    return (_ctx = null, _cache = null) => {
      var _a2;
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: _ctx.leftIcon.length > 0
      }), _ctx.leftIcon.length > 0 ? new UTSJSONObject({
        b: common_vendor.p(new UTSJSONObject({
          size: "42rpx",
          color: _ctx.iconColor,
          name: _ctx.leftIcon
        }))
      }) : new UTSJSONObject({}), {
        c: common_vendor.s(common_vendor.unref(inputStyle)),
        d: common_vendor.s(_ctx.center ? "text-align:center" : ""),
        e: _ctx.type,
        f: _ctx.maxlength,
        g: _ctx.disabled,
        h: _ctx.focus,
        i: common_vendor.unref(searchValue),
        j: _ctx.confirmType,
        k: _ctx.confirmHold,
        l: _ctx.cursor,
        m: _ctx.cursorColor,
        n: _ctx.adjustPosition,
        o: _ctx.alwaysEmbed,
        p: _ctx.selectionStart,
        q: _ctx.selectionEnd,
        r: _ctx.holdKeyboard,
        s: _ctx.cursorSpacing,
        t: _ctx.placeholder,
        v: ((_a2 = _ctx.placeholderStyle) !== null && _a2 !== void 0 ? _a2 : " ") + (_ctx.center ? "text-align:center" : ""),
        w: common_vendor.o(handleInput),
        x: common_vendor.o(handleFocus),
        y: common_vendor.o(handleBlur),
        z: common_vendor.o(handleConfirm),
        A: _ctx.clearable
      }, _ctx.clearable ? new UTSJSONObject({
        B: common_vendor.p(new UTSJSONObject({
          name: "close-circle-filled",
          size: "48rpx",
          color: _ctx.clearIconColor
        })),
        C: _ctx.$slots["right-icon"] != null ? 1 : "",
        D: common_vendor.unref(searchValue).length > 0,
        E: common_vendor.o(handleClear)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        F: common_vendor.s(common_vendor.unref(contextStyle)),
        G: common_vendor.n(common_vendor.unref(contentClass)),
        H: _ctx.action != null
      }), _ctx.action != null ? new UTSJSONObject({
        I: common_vendor.t(_ctx.action),
        J: common_vendor.unref(focused) ? 1 : "",
        K: common_vendor.o(handleActionClick)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        L: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        M: common_vendor.s(_ctx.lStyle)
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-search/components/l-search/l-search.js.map
