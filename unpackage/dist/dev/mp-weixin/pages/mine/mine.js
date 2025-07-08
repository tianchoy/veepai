"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "mine",
  setup(__props) {
    const userInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/userInfo/userInfo"
      });
    };
    const rechargeDataTraffic = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/rechargeDataTraffic/rechargeDataTraffic"
      });
    };
    const helpCenter = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/helpCenter/helpCenter"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$1,
        c: common_assets._imports_2,
        d: common_assets._imports_3,
        e: common_assets._imports_0$3,
        f: common_vendor.o(userInfo),
        g: common_assets._imports_5,
        h: common_assets._imports_0$3,
        i: common_vendor.o(rechargeDataTraffic),
        j: common_assets._imports_6,
        k: common_assets._imports_0$3,
        l: common_assets._imports_7,
        m: common_assets._imports_0$3,
        n: common_vendor.o(helpCenter),
        o: common_assets._imports_8,
        p: common_assets._imports_0$3,
        q: common_assets._imports_9,
        r: common_assets._imports_0$3,
        s: common_assets._imports_10,
        t: common_assets._imports_0$3,
        v: common_assets._imports_11,
        w: common_assets._imports_0$3,
        x: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
