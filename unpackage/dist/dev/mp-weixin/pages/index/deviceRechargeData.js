"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(TopNavBar)();
}
const TopNavBar = () => "../../components/topNavBar2.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceRechargeData",
  setup(__props) {
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1
      }));
    };
    const rightIcon = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceRechargeOrder"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: common_vendor.o(rightIcon),
        c: common_vendor.p({
          title: "流量充值",
          showBack: true,
          rightText: "order"
        }),
        d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b49fde6e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deviceRechargeData.js.map
