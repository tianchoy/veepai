"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
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
    const refInputId = `fui_input_${parseInt(Math.ceil(Math.random() * 1e6).toString(), 36)}`;
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
      mp.set("margin-top", `${this.marginTop}rpx`);
      mp.set("border-radius", this.isFillet ? "120px" : `${this.radius}rpx`);
      return mp;
    },
    getBorderRadius() {
      let radius = `${this.radius * 2}rpx`;
      if (this.isFillet) {
        radius = "240px";
      }
      return radius;
    },
    getBtnLineStyl() {
      const mp = /* @__PURE__ */ new Map();
      if (this.borderColor != "")
        mp.set("background", this.borderColor);
      mp.set("left", `${this.bottomLeft}rpx`);
      mp.set("right", `${this.bottomRight}rpx`);
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
        mp.set("fontSize", `${this.labelSize}rpx`);
        mp.set("lineHeight", `${this.labelSize}rpx`);
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.borderTop && !$props.inputBorder
  }, $props.borderTop && !$props.inputBorder ? {
    b: $props.borderColor,
    c: `${$props.topLeft}rpx`,
    d: `${$props.topRight}rpx`,
    e: $props.borderColor == "" ? 1 : ""
  } : {}, {
    f: $props.inputBorder
  }, $props.inputBorder ? {
    g: $props.borderColor == "" ? 1 : "",
    h: $options.getBorderRadius,
    i: $props.borderColor
  } : {}, {
    j: $props.required
  }, $props.required ? {
    k: common_vendor.s($options.getRequiredColor),
    l: $props.requiredColor == "" ? 1 : ""
  } : {}, {
    m: $props.label != ""
  }, $props.label != "" ? {
    n: common_vendor.t($props.label),
    o: $props.labelSize == 0 ? 1 : "",
    p: common_vendor.s($options.getLabelStyl),
    q: `${$props.labelWidth}rpx`
  } : {}, {
    r: common_vendor.sei("r0-bb498cfc", "input", $data.refId),
    s: $data.refId,
    t: $props.disabled || $props.readonly ? 1 : "",
    v: $props.size == 0 ? 1 : "",
    w: `${$props.size}rpx`,
    x: $props.color,
    y: $props.textAlign,
    z: $props.type,
    A: $props.name,
    B: $data.val,
    C: $props.placeholder,
    D: $props.password || $props.type == "password",
    E: $props.placeholderStyle,
    F: $props.disabled || $props.readonly,
    G: $props.cursorSpacing,
    H: $props.maxlength,
    I: $props.confirmType,
    J: $props.confirmHold,
    K: $props.cursor,
    L: $props.selectionStart,
    M: $props.selectionEnd,
    N: $props.adjustPosition,
    O: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    P: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    Q: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    R: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    S: common_vendor.o((...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args)),
    T: $props.clearable && $data.val != ""
  }, $props.clearable && $data.val != "" ? {
    U: $props.clearColor,
    V: common_vendor.o((...args) => $options.onClear && $options.onClear(...args))
  } : {}, {
    W: $props.borderBottom && !$props.inputBorder
  }, $props.borderBottom && !$props.inputBorder ? {
    X: common_vendor.s($options.getBtnLineStyl),
    Y: $props.borderColor == "" ? 1 : ""
  } : {}, {
    Z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    aa: $props.inputBorder ? 1 : "",
    ab: $props.inputBorder && $props.borderColor == "" ? 1 : "",
    ac: $props.disabled && $props.disabledStyle ? 1 : "",
    ad: common_vendor.s($options.getStyle),
    ae: common_vendor.o((...args) => $options.fieldClick && $options.fieldClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bb498cfc"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-input/fui-input.js.map
