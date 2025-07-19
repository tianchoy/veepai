"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-radio-group",
  emits: ["change", "update:modelValue"],
  props: {
    name: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      val: "",
      childrens: [],
      fuiForm: null
    };
  },
  watch: {
    modelValue(val) {
      this.modelChange(val);
    }
  },
  created() {
    const isForm = this.getParent("fui-form");
    if (isForm) {
      const form = this.fuiForm;
      form.$data["formChildren"].push(this);
    }
  },
  methods: {
    radioChange(e) {
      this.$emit("change", e);
      this.$emit("update:modelValue", e);
    },
    changeValue(value, target) {
      if (value == this.val)
        return null;
      this.val = value;
      this.childrens.forEach((item) => {
        if (item !== target) {
          item.$data["val"] = false;
        }
      });
      this.radioChange(value);
    },
    modelChange(val) {
      this.childrens.forEach((item) => {
        if (item.$props["value"] == val) {
          item.$data["val"] = true;
        } else {
          item.$data["val"] = false;
        }
      });
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
      this.val = "";
      this.modelChange("");
      this.radioChange("");
    },
    getSubmitValue() {
      return this.val == "" ? this.modelValue : this.val;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "radio-group"),
    b: $props.name
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.js.map
