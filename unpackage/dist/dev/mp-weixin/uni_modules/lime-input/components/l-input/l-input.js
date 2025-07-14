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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  behaviors: ["wx://form-field"]
}, { __name: "l-input", props: {
  adjustPosition: { type: Boolean, default: true },
  align: { default: "left" },
  alwaysEmbed: { type: Boolean, default: false },
  autoFocus: { type: Boolean, default: false },
  bordered: { type: Boolean, default: true },
  clearTrigger: { default: "focus" },
  clearable: { type: Boolean, default: false },
  confirmHold: { type: Boolean, default: false },
  confirmType: { default: "done" },
  cursor: { default: 0 },
  cursorColor: { default: "" },
  cursorSpacing: { default: 0 },
  disabled: { type: Boolean, default: false },
  focus: { type: Boolean, default: false },
  holdKeyboard: { type: Boolean, default: false },
  label: {},
  layout: { default: "horizontal" },
  maxcharacter: {},
  maxlength: { default: -1 },
  placeholder: { default: "" },
  placeholderStyle: { default: "" },
  placeholderClass: {},
  readonly: { type: Boolean, default: false },
  safePasswordCertPath: { default: "" },
  safePasswordCustomHash: { default: "" },
  safePasswordLength: {},
  safePasswordNonce: { default: "" },
  safePasswordSalt: { default: "" },
  safePasswordTimeStamp: {},
  selectionEnd: { default: -1 },
  selectionStart: { default: -1 },
  status: { default: "default" },
  prefixIcon: {},
  prefixIconColor: {},
  suffix: {},
  suffixIcon: {},
  suffixIconColor: {},
  tips: {},
  type: { default: "text" },
  value: {},
  modelValue: {},
  lStyle: {},
  lableStyle: {},
  tipsStyle: {},
  inputStyle: {},
  borderColor: {},
  classic: { type: Boolean, default: false },
  focused: { type: Boolean, default: false },
  focusedBorderColor: {},
  prefixIconSize: {},
  suffixIconSize: {},
  clearIconSize: {}
}, emits: ["change", "update:modelValue", "focus", "blur", "confirm", "clear", "keyboardheightchange", "nicknamereview", "click-icon"], setup(__props, _a) {
  var __emit = _a.emit;
  const emit = __emit;
  const props = __props;
  const formItemBlur = common_vendor.inject("formItemBlur", null);
  const formDisabled = common_vendor.inject("formDisabled", null);
  const formReadonly = common_vendor.inject("formReadonly", null);
  const calculateValue = (value) => {
    props.maxlength;
    const maxcharacter = props.maxcharacter;
    if (maxcharacter != null && maxcharacter > 0) {
      return uni_modules_limeShared_characterLimit_index.characterLimit("maxcharacter", `${value}`, maxcharacter);
    }
    return {
      characters: `${value}`,
      length: `${value}`.length
    };
  };
  let _innerValue = common_vendor.ref("");
  const innerFocused = common_vendor.ref(props.focus || props.focused);
  const innerValue = common_vendor.computed({
    set(value) {
      _innerValue.value = value;
      emit("change", value);
      emit("update:modelValue", value);
    },
    get() {
      var _a2;
      const _value = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : props.modelValue;
      if (_innerValue.value != _value && props.type != "number") {
        const characters = calculateValue(`${_value !== null && _value !== void 0 ? _value : _innerValue.value}`).characters;
        return characters;
      }
      return _value !== null && _value !== void 0 ? _value : _innerValue.value;
    }
  });
  const isDisabled = common_vendor.computed(() => {
    var _a2;
    return props.disabled || ((_a2 = formDisabled === null || formDisabled === void 0 ? null : formDisabled.value) !== null && _a2 !== void 0 ? _a2 : false);
  });
  const isReadonly = common_vendor.computed(() => {
    var _a2;
    return props.readonly || ((_a2 = formReadonly === null || formReadonly === void 0 ? null : formReadonly.value) !== null && _a2 !== void 0 ? _a2 : false);
  });
  const styles = common_vendor.computed(() => {
    const style = /* @__PURE__ */ new Map();
    if (props.borderColor != null) {
      style.set("--l-input-border-color", props.borderColor);
    }
    if (props.focusedBorderColor != null) {
      style.set("--l-input-focused-border-color", props.focusedBorderColor);
    }
    return style;
  });
  const showClearIcon = common_vendor.computed(() => {
    const clearTrigger = props.clearTrigger, disabled = props.disabled, readonly = props.readonly;
    if (disabled || readonly) {
      return false;
    }
    return `${innerValue.value}`.length > 0 || clearTrigger == "always";
  });
  const onInput = (e) => {
    const _a2 = e.detail, value = _a2.value;
    _a2.cursor;
    _a2.keyCode;
    if (props.type == "number") {
      const _v = parseFloat(`${value}`);
      innerValue.value = isNaN(_v) ? "" : _v;
    } else {
      const characters = calculateValue(value).characters;
      innerValue.value = characters;
    }
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
  const onKeyboardHeightChange = (event) => {
    emit("keyboardheightchange", event);
  };
  const onNickNameReview = (event = null) => {
    emit("nicknamereview", event);
  };
  const clearInput = () => {
    innerValue.value = "";
    emit("clear");
  };
  const onSuffixClick = () => {
    emit("click-icon", new UTSJSONObject({ trigger: "suffix" }));
  };
  const onSuffixIconClick = () => {
    emit("click-icon", new UTSJSONObject({ trigger: "suffix-icon" }));
  };
  common_vendor.watchEffect(() => {
    innerFocused.value = props.focus || props.focused;
  });
  return (_ctx = null, _cache = null) => {
    const __returned__ = common_vendor.e(new UTSJSONObject({
      a: _ctx.label != null || _ctx.$slots["label"] != null || _ctx.$slots["prefix-icon"] != null || _ctx.prefixIcon != null
    }), _ctx.label != null || _ctx.$slots["label"] != null || _ctx.$slots["prefix-icon"] != null || _ctx.prefixIcon != null ? common_vendor.e(new UTSJSONObject({
      b: _ctx.$slots["prefix-icon"] != null || _ctx.prefixIcon != null
    }), _ctx.$slots["prefix-icon"] != null || _ctx.prefixIcon != null ? common_vendor.e(new UTSJSONObject({
      c: _ctx.prefixIcon != null
    }), _ctx.prefixIcon != null ? new UTSJSONObject({
      d: common_vendor.p(new UTSJSONObject({
        name: _ctx.prefixIcon,
        color: _ctx.prefixIconColor,
        size: _ctx.prefixIconSize
      }))
    }) : new UTSJSONObject({})) : new UTSJSONObject({}), new UTSJSONObject({
      e: _ctx.label != null || _ctx.$slots["label"] != null
    }), _ctx.label != null || _ctx.$slots["label"] != null ? new UTSJSONObject({
      f: common_vendor.t(_ctx.label),
      g: common_vendor.s(_ctx.lableStyle),
      h: _ctx.prefixIcon != null || _ctx.$slots["prefix-icon"] != null ? 1 : ""
    }) : new UTSJSONObject({})) : new UTSJSONObject({}), new UTSJSONObject({
      i: common_vendor.s(_ctx.inputStyle),
      j: common_vendor.n("l-input--" + _ctx.align),
      k: common_vendor.n(new UTSJSONObject({
        "l-input__control--disabled": common_vendor.unref(isDisabled),
        "l-input__control--read-only": common_vendor.unref(isReadonly)
      })),
      l: _ctx.maxlength,
      m: common_vendor.unref(isDisabled) || common_vendor.unref(isReadonly),
      n: _ctx.placeholder,
      o: _ctx.placeholderStyle,
      p: _ctx.placeholderStyle == "" ? common_vendor.unref(isDisabled) || common_vendor.unref(isReadonly) ? "l-input__placeholder--disabled" : "l-input__placeholder" : "",
      q: common_vendor.unref(innerValue),
      r: _ctx.type == "password" ? "text" : _ctx.type,
      s: _ctx.type == "password",
      t: _ctx.focus,
      v: _ctx.confirmType,
      w: _ctx.confirmHold,
      x: _ctx.cursor,
      y: _ctx.cursorColor,
      z: _ctx.cursorSpacing,
      A: _ctx.adjustPosition,
      B: _ctx.autoFocus,
      C: _ctx.alwaysEmbed,
      D: _ctx.selectionStart,
      E: _ctx.selectionEnd,
      F: _ctx.holdKeyboard,
      G: _ctx.safePasswordCertPath,
      H: _ctx.safePasswordLength,
      I: _ctx.safePasswordTimeStamp,
      J: _ctx.safePasswordNonce,
      K: _ctx.safePasswordSalt,
      L: _ctx.safePasswordCustomHash,
      M: _ctx.label,
      N: _ctx.label,
      O: common_vendor.o(onInput),
      P: common_vendor.o(onFocus),
      Q: common_vendor.o(onBlur),
      R: common_vendor.o(onConfirm),
      S: common_vendor.o(onKeyboardHeightChange),
      T: common_vendor.o(onNickNameReview),
      U: _ctx.clearable
    }), _ctx.clearable ? new UTSJSONObject({
      V: common_vendor.p(new UTSJSONObject({
        name: "close-circle-filled",
        size: _ctx.clearIconSize
      })),
      W: common_vendor.o(clearInput),
      X: common_vendor.unref(showClearIcon)
    }) : new UTSJSONObject({}), new UTSJSONObject({
      Y: _ctx.suffix != null || _ctx.$slots["suffix"] != null
    }), _ctx.suffix != null || _ctx.$slots["suffix"] != null ? new UTSJSONObject({
      Z: common_vendor.t(_ctx.suffix),
      aa: common_vendor.o(onSuffixClick)
    }) : new UTSJSONObject({}), new UTSJSONObject({
      ab: _ctx.suffixIcon != null || _ctx.$slots["suffix-icon"] != null
    }), _ctx.suffixIcon != null || _ctx.$slots["suffix-icon"] != null ? common_vendor.e(new UTSJSONObject({
      ac: _ctx.suffixIcon != null
    }), _ctx.suffixIcon != null ? new UTSJSONObject({
      ad: common_vendor.o(onSuffixIconClick),
      ae: common_vendor.p(new UTSJSONObject({
        name: _ctx.suffixIcon,
        size: _ctx.suffixIconSize,
        color: _ctx.suffixIconColor
      }))
    }) : new UTSJSONObject({})) : new UTSJSONObject({}), new UTSJSONObject({
      af: _ctx.tips != null && _ctx.tips.length > 0 || _ctx.$slots["tips"] != null
    }), _ctx.tips != null && _ctx.tips.length > 0 || _ctx.$slots["tips"] != null ? new UTSJSONObject({
      ag: common_vendor.t(_ctx.tips),
      ah: common_vendor.s(_ctx.tipsStyle),
      ai: common_vendor.n("l-input__tips--" + _ctx.status)
    }) : new UTSJSONObject({}), new UTSJSONObject({
      aj: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-40f44b4a"), "view", "rootRef"),
      ak: common_vendor.s(common_vendor.unref(styles)),
      al: common_vendor.s(_ctx.lStyle),
      am: common_vendor.n("l-input--" + _ctx.layout),
      an: common_vendor.n(_ctx.classic ? "l-input--classic-" + _ctx.status : ""),
      ao: common_vendor.n(new UTSJSONObject({
        "l-input--classic": _ctx.classic
      })),
      ap: common_vendor.n(new UTSJSONObject({
        "l-input--classic-disabled": _ctx.classic && _ctx.disabled
      })),
      aq: common_vendor.n(new UTSJSONObject({
        "l-input--classic-focused": _ctx.classic && !_ctx.disabled && common_vendor.unref(innerFocused)
      })),
      ar: common_vendor.n(new UTSJSONObject({
        "l-input--border": _ctx.bordered && !_ctx.classic
      }))
    }));
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-input/components/l-input/l-input.js.map
