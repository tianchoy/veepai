"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_firstuiUnix_components_fuiTypes_index = require("../fui-types/index.js");
const _sfc_main = common_vendor.defineComponent({
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
      mp.set("transform", `scale(${this.scaleRatio})`);
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
      this.$emit("change", new uni_modules_firstuiUnix_components_fuiTypes_index.FuiCheckboxChangeParam({
        checked: this.val,
        value: this.value
      }));
    },
    //测试支持，如果不支持则使用 provide/inject方式（可能有警告，设置default:null也无法去除，应该是底层有bug）
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
      if (name == "fui-checkbox-group") {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.val
  }, $data.val ? {
    b: $props.checkMarkColor == "" ? 1 : "",
    c: common_vendor.s($options.getMarkStyl)
  } : {}, {
    d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    e: common_vendor.n($props.scaleRatio != 1 ? `fui-checkbox__scale-${$props.scaleAlign}` : ""),
    f: common_vendor.n($props.disabled ? "fui-checkbox__disabled" : ""),
    g: common_vendor.n($props.color == "" && $data.styleVal && !$props.isCheckMark ? "fui-checkbox__color" : ""),
    h: common_vendor.n($props.normalColor == "" && !$data.styleVal && !$props.isCheckMark ? "fui-checkbox__background" : ""),
    i: common_vendor.n($props.borderColor == "" && !$data.styleVal && !$props.isCheckMark ? "fui-checkbox__normal-border" : ""),
    j: common_vendor.s($options.getStyl),
    k: common_vendor.o((...args) => $options.checkboxClick && $options.checkboxClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-643c0c5e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-checkbox/fui-checkbox.js.map
