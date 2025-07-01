"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
require("../types/NavTitleItem.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "TopNavBar",
  props: {
    title: new UTSJSONObject({
      type: Array,
      default: () => {
        return [];
      }
    }),
    showBack: new UTSJSONObject({
      type: Boolean,
      default: false
    }),
    messageCount: new UTSJSONObject({
      type: Number,
      default: 0
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
    const changeNav = (item) => {
      common_vendor.index.__f__("log", "at components/TopNavBar.uvue:47", item.isCurrent);
      common_vendor.index.redirectTo({
        url: item.url
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: props.showBack
      }), props.showBack ? new UTSJSONObject({
        b: common_vendor.o(goBack),
        c: common_assets._imports_0,
        d: common_vendor.o(goBack)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        e: common_vendor.f(props.title, (item = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.t(item.name),
            b: common_vendor.s(item.isCurrent ? "font-size:40rpx; font-weight:900" : ""),
            c: index,
            d: common_vendor.o(($event = null) => {
              return changeNav(item);
            }, index)
          });
        }),
        f: common_vendor.o(onAdd),
        g: common_assets._imports_1,
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74050c6f"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/TopNavBar.js.map
