"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
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
      mp.set("transform", `scale(${this.scaleRatio})`);
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
      if (name == "fui-radio-group") {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.val && $props.styleType == 1
  }, $data.val && $props.styleType == 1 ? {
    b: $props.checkMarkColor == "" ? 1 : "",
    c: common_vendor.s($options.getMarkStyl)
  } : {}, {
    d: $data.val && $props.styleType == 2
  }, $data.val && $props.styleType == 2 ? {
    e: $props.checkMarkColor == "" ? 1 : "",
    f: common_vendor.s($options.getCheckMarkStyl)
  } : {}, {
    g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    h: common_vendor.n($props.scaleRatio != 1 ? `fui-radio__scale-${$props.scaleAlign}` : ""),
    i: common_vendor.n($props.disabled ? "fui-radio__disabled" : ""),
    j: common_vendor.n($props.color == "" && $data.styleVal && (!$props.isCheckMark || $props.styleType == 2) ? "fui-radio__color" : ""),
    k: common_vendor.n($props.color == "" && $data.styleVal && !$props.isCheckMark && $props.styleType == 1 ? "fui-radio__active-bgcolor" : ""),
    l: common_vendor.n($props.normalColor == "" && !$data.styleVal && (!$props.isCheckMark || $props.styleType == 2) ? "fui-radio__background" : ""),
    m: common_vendor.n($props.color == "" && $data.styleVal && $props.styleType == 2 ? "fui-radio__background" : ""),
    n: common_vendor.n($props.borderColor == "" && !$data.styleVal && (!$props.isCheckMark || $props.styleType == 2) ? "fui-radio__normal-border" : ""),
    o: common_vendor.s($options.getStyl),
    p: common_vendor.o((...args) => $options.radioClick && $options.radioClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5757030f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-radio/fui-radio.js.map
