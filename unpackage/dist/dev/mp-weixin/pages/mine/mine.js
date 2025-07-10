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
    const myorders = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/myOrders/myOrders"
      });
    };
    const helpCenter = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/helpCenter/helpCenter"
      });
    };
    const msgCenter = () => {
      common_vendor.index.switchTab({
        url: "/pages/message/message"
      });
    };
    const feedback = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/feeback/feeback"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_assets._imports_1$2,
        c: common_assets._imports_2,
        d: common_vendor.o(msgCenter),
        e: common_assets._imports_3$1,
        f: common_assets._imports_0$2,
        g: common_vendor.o(userInfo),
        h: common_assets._imports_5,
        i: common_assets._imports_0$2,
        j: common_vendor.o(rechargeDataTraffic),
        k: common_assets._imports_6,
        l: common_assets._imports_0$2,
        m: common_vendor.o(myorders),
        n: common_assets._imports_7,
        o: common_assets._imports_0$2,
        p: common_vendor.o(helpCenter),
        q: common_assets._imports_8,
        r: common_assets._imports_0$2,
        s: common_assets._imports_9,
        t: common_assets._imports_0$2,
        v: common_vendor.o(feedback),
        w: common_assets._imports_10,
        x: common_assets._imports_0$2,
        y: common_assets._imports_11,
        z: common_assets._imports_0$2,
        A: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
