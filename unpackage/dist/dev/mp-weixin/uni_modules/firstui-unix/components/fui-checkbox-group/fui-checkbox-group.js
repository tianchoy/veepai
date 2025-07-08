"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-checkbox-group",
  emits: ["change", "update:modelValue"],
  props: {
    name: {
      type: String,
      default: ""
    },
    modelValue: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      vals: [],
      childrens: [],
      fuiForm: null
    };
  },
  watch: {
    modelValue(vals) {
      this.modelChange(vals);
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
    checkboxChange(e) {
      this.$emit("change", e);
      this.$emit("update:modelValue", e);
    },
    changeValue() {
      const vals = [];
      this.childrens.forEach((item) => {
        const isChk = item.$data["val"];
        if (isChk) {
          vals.push(item.$props["value"]);
        }
      });
      this.vals = vals;
      this.checkboxChange(vals);
    },
    modelChange(vals) {
      this.vals = vals;
      this.childrens.forEach((item) => {
        const value = item.$props["value"];
        if (vals.includes(value)) {
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
      this.childrens.forEach((item) => {
        item.$data["val"] = false;
      });
      this.vals = [];
      this.checkboxChange(this.vals);
    },
    getSubmitValue() {
      return this.vals;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "checkbox-group"),
    b: $props.name
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-checkbox-group/fui-checkbox-group.js.map
