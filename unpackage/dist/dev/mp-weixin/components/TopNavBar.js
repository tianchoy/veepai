"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  _easycom_fui_icon_1();
}
const _easycom_fui_icon = () => "../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
if (!Math) {
  _easycom_fui_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TopNavBar",
  props: {
    title: {
      type: String,
      default: "首页"
    },
    showBack: {
      type: Boolean,
      default: false
    },
    messageCount: {
      type: Number,
      default: 0
    },
    rightText: {
      type: String,
      default: ""
    }
  },
  emits: ["back", "message", "rightEvent"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emits = __emit;
    const goBack = () => {
      return emits("back");
    };
    const rightIcon = () => {
      return emits("rightEvent");
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: props.showBack
      }), props.showBack ? new UTSJSONObject({
        b: common_vendor.p(new UTSJSONObject({
          name: "arrowleft",
          size: "50"
        }))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        c: common_vendor.o(goBack),
        d: common_vendor.t(props.title),
        e: common_vendor.p(new UTSJSONObject({
          name: __props.rightText,
          size: "45"
        })),
        f: common_vendor.o(rightIcon),
        g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74050c6f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/TopNavBar.js.map
