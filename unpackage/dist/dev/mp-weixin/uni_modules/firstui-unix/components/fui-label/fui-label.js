"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-label",
  props: {
    //padding值：'20rpx 32rpx'
    padding: {
      type: String,
      default: ""
    },
    //margin值：'20rpx 32rpx'
    margin: {
      type: String,
      default: ""
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childrens: []
    };
  },
  methods: {
    onclick() {
      if (this.childrens.length > 0) {
        this.childrens.forEach((item) => {
          item.$callMethod("labelClick");
        });
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    b: $props.full ? 1 : "",
    c: $props.padding,
    d: $props.margin,
    e: common_vendor.o((...args) => $options.onclick && $options.onclick(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a75e5cf9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-label/fui-label.js.map
