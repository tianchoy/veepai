"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TopNavBar",
  props: {
    title: new UTSJSONObject({
      type: String,
      default: "首页"
    }),
    showBack: new UTSJSONObject({
      type: Boolean,
      default: false
    }),
    messageCount: new UTSJSONObject({
      type: Number,
      default: 0
    }),
    rightText: new UTSJSONObject({
      type: String,
      default: ""
    })
  },
  emits: ["back", "message", "add", "changeNav"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const emits = __emit;
    const goBack = () => {
      return emits("back");
    };
    const onAdd = () => {
      return emits("add");
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: props.showBack
      }), props.showBack ? new UTSJSONObject({
        b: common_vendor.o(goBack),
        c: common_assets._imports_0$6
      }) : new UTSJSONObject({}), new UTSJSONObject({
        d: common_vendor.o(goBack),
        e: common_vendor.t(props.title),
        f: common_vendor.t(props.rightText),
        g: common_vendor.o(onAdd),
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74050c6f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/TopNavBar.js.map
