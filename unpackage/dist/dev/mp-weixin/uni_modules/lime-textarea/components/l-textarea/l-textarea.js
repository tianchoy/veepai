"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_characterLimit_index = require("../../../lime-shared/characterLimit/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-textarea",
  props: /* @__PURE__ */ common_vendor.mergeModels(new UTSJSONObject({
    adjustPosition: { type: Boolean, default: true },
    autofocus: { type: Boolean, default: false },
    autosize: { type: Boolean, default: false },
    bordered: { type: Boolean, default: true },
    confirmHold: { type: Boolean, default: false },
    confirmType: { default: "return" },
    cursor: { default: -1 },
    cursorSpacing: { default: 0 },
    disableDefaultPadding: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    defaultFixed: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    holdKeyboard: { type: Boolean, default: false },
    indicator: { type: Boolean, default: false },
    label: {},
    maxcharacter: {},
    maxlength: { default: -1 },
    placeholder: { default: "" },
    selectionEnd: { default: -1 },
    selectionStart: { default: -1 },
    showConfirmBar: { type: Boolean, default: true },
    value: {},
    layout: { default: "horizontal" },
    placeholderStyle: { default: "" },
    lStyle: {},
    labelStyle: {},
    indicatorStyle: {},
    innerStyle: {},
    classic: { type: Boolean, default: false },
    borderColor: {},
    focusedBorderColor: {},
    focused: { type: Boolean, default: false }
  }), new UTSJSONObject({
    "modelValue": { type: String, default: "" },
    "modelModifiers": {}
  })),
  emits: /* @__PURE__ */ common_vendor.mergeModels(["change", "focus", "blur", "confirm", "linechange", "keyboardheightchange"], ["update:modelValue"]),
  setup(__props, _a) {
    var __emit = _a.emit;
    const emit = __emit;
    const props = __props;
    const formItemBlur = common_vendor.inject("formItemBlur", null);
    const formDisabled = common_vendor.inject("formDisabled", null);
    const formReadonly = common_vendor.inject("formReadonly", null);
    const count = common_vendor.ref(0);
    const innerFocused = common_vendor.ref(props.focus || props.focused);
    const calculateValue = (value) => {
      const maxlength = props.maxlength, maxcharacter = props.maxcharacter;
      if (maxcharacter != null && maxcharacter > 0) {
        return uni_modules_limeShared_characterLimit_index.characterLimit("maxcharacter", value, maxcharacter);
      } else if (maxlength > 0) {
        return uni_modules_limeShared_characterLimit_index.characterLimit("maxlength", value, maxlength);
      }
      return {
        characters: value,
        length: value.length
      };
    };
    let _innerValue = "";
    const modelValue = common_vendor.useModel(__props, "modelValue");
    const innerValue = common_vendor.computed({
      set(v) {
        _innerValue = v;
        modelValue.value = v;
        emit("change", v);
      },
      get() {
        var _a2, _b;
        const _value = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : modelValue.value;
        if (_innerValue != _value) {
          const _c = calculateValue((_b = props.value) !== null && _b !== void 0 ? _b : modelValue.value), characters = _c.characters, length_1 = _c.length;
          count.value = length_1;
          return characters;
        }
        return _value;
      }
    });
    const isReadonly = common_vendor.computed(() => {
      var _a2;
      if (props.readonly)
        return props.readonly;
      return (_a2 = formReadonly === null || formReadonly === void 0 ? null : formReadonly.value) !== null && _a2 !== void 0 ? _a2 : false;
    });
    const isDisabled = common_vendor.computed(() => {
      var _a2;
      if (props.disabled)
        return props.disabled;
      return (_a2 = formDisabled === null || formDisabled === void 0 ? null : formDisabled.value) !== null && _a2 !== void 0 ? _a2 : false;
    });
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (props.borderColor) {
        style.set("--l-textarea-border-color", props.borderColor);
      }
      if (props.focusedBorderColor) {
        style.set("--l-textarea-focused-border-color", props.focusedBorderColor);
      }
      return style;
    });
    const onInput = (event) => {
      let _a2 = event.detail, value = _a2.value;
      _a2.cursor;
      const _b = calculateValue(value), characters = _b.characters, length = _b.length;
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
    common_vendor.watchEffect(() => {
      innerFocused.value = props.focus || props.focused;
    });
    return (_ctx = null, _cache = null) => {
      var _a2, _b, _c;
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: _ctx.label != null || _ctx.$slots["label"] != null
      }), _ctx.label != null || _ctx.$slots["label"] != null ? new UTSJSONObject({
        b: common_vendor.t(_ctx.label),
        c: common_vendor.s(_ctx.labelStyle),
        d: common_vendor.n("l-textarea__label--" + _ctx.layout)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        e: common_vendor.s(_ctx.innerStyle),
        f: common_vendor.unref(isDisabled) ? 1 : "",
        g: _ctx.maxlength,
        h: common_vendor.unref(isDisabled) || common_vendor.unref(isReadonly),
        i: common_vendor.unref(innerValue),
        j: _ctx.autosize,
        k: _ctx.autofocus,
        l: _ctx.fixed,
        m: _ctx.focus,
        n: _ctx.cursor,
        o: _ctx.cursorSpacing,
        p: _ctx.adjustPosition,
        q: _ctx.confirmType,
        r: _ctx.confirmHold,
        s: _ctx.disableDefaultPadding,
        t: _ctx.showConfirmBar,
        v: _ctx.selectionStart,
        w: _ctx.selectionEnd,
        x: _ctx.holdKeyboard,
        y: common_vendor.o(onInput),
        z: common_vendor.o(onFocus),
        A: common_vendor.o(onBlur),
        B: common_vendor.o(onConfirm),
        C: common_vendor.o(onLineChange),
        D: common_vendor.o(onKeyboardHeightChange),
        E: common_vendor.unref(innerValue).length == 0
      }), common_vendor.unref(innerValue).length == 0 ? new UTSJSONObject({
        F: common_vendor.t(_ctx.placeholder),
        G: common_vendor.s(_ctx.placeholderStyle)
      }) : new UTSJSONObject({}), {
        H: _ctx.indicator && ((_a2 = _ctx.maxcharacter) !== null && _a2 !== void 0 ? _a2 : _ctx.maxlength) > 0
      }, _ctx.indicator && ((_b = _ctx.maxcharacter) !== null && _b !== void 0 ? _b : _ctx.maxlength) > 0 ? {
        I: common_vendor.t(common_vendor.unref(count)),
        J: common_vendor.t((_c = _ctx.maxcharacter) !== null && _c !== void 0 ? _c : _ctx.maxlength),
        K: common_vendor.s(_ctx.indicatorStyle)
      } : new UTSJSONObject({}), new UTSJSONObject({
        L: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-2bb0a73a"), "view", "textareaRef"),
        M: common_vendor.s(common_vendor.unref(styles)),
        N: common_vendor.s(_ctx.lStyle),
        O: common_vendor.n("l-textarea--" + _ctx.layout),
        P: common_vendor.n(new UTSJSONObject(
          // classic ? 'l-textarea--classic-' + status : '',
          {
            "l-textarea--classic": _ctx.classic,
            "l-textarea--classic-disabled": _ctx.classic && common_vendor.unref(isDisabled),
            "l-textarea--classic-focused": _ctx.classic && !common_vendor.unref(isDisabled) && common_vendor.unref(innerFocused),
            "l-textarea--border": _ctx.bordered && !_ctx.classic
          }
        ))
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-textarea/components/l-textarea/l-textarea.js.map
