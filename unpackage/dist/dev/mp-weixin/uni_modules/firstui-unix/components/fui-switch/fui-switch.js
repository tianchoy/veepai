"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.type == "switch"
  }, $props.type == "switch" ? {
    b: common_vendor.s($options.getBeforeBgColor),
    c: $data.val ? 1 : "",
    d: !$data.styleVal && $props.normalColor == "" ? 1 : "",
    e: common_vendor.s($options.getStyle),
    f: $data.val ? 1 : "",
    g: $props.btnColor == "" && $data.styleVal || !$data.styleVal && $props.btnNormalColor == "" ? 1 : "",
    h: common_vendor.s($options.getSwitchStyl),
    i: $props.disabled ? 1 : "",
    j: $data.styleVal && $props.color == "" ? 1 : "",
    k: !$data.styleVal && $props.borderColor == "" ? 1 : "",
    l: !$data.styleVal && $props.transitionColor == "" ? 1 : "",
    m: common_vendor.o((...args) => $options.onChange && $options.onChange(...args))
  } : common_vendor.e({
    n: $data.val
  }, $data.val ? {
    o: $props.checkMarkColor == "" ? 1 : "",
    p: common_vendor.s($options.getMarkStyl)
  } : {}, {
    q: $data.styleVal && $props.color == "" ? 1 : "",
    r: !$data.styleVal && $props.borderColor == "" ? 1 : "",
    s: !$data.styleVal && $props.normalColor == "" ? 1 : "",
    t: common_vendor.s($options.getSwitchStyl),
    v: common_vendor.o((...args) => $options.onChange && $options.onChange(...args))
  }), {
    w: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    x: common_vendor.n(`fui-switch__size-${$props.type}`),
    y: common_vendor.n($props.scaleRatio != 1 ? `fui-switch__scale-${$props.scaleAlign}` : ""),
    z: common_vendor.n($props.disabled && $props.disabledStyle ? "fui-switch__checkbox-disabled" : ""),
    A: `scale(${$props.scaleRatio})`
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3ac4bf15"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-switch/fui-switch.js.map
