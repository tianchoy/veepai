"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const localFiles = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/localFiles/localFiles"
      });
    };
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
    const systemSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/systemSetting/systemSetting"
      });
    };
    const aboutPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/about/about"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(localFiles),
        c: common_assets._imports_1$2,
        d: common_assets._imports_2,
        e: common_vendor.o(msgCenter),
        f: common_assets._imports_3$1,
        g: common_assets._imports_0$2,
        h: common_vendor.o(userInfo),
        i: common_assets._imports_5,
        j: common_assets._imports_0$2,
        k: common_vendor.o(rechargeDataTraffic),
        l: common_assets._imports_6,
        m: common_assets._imports_0$2,
        n: common_vendor.o(myorders),
        o: common_assets._imports_7,
        p: common_assets._imports_0$2,
        q: common_vendor.o(helpCenter),
        r: common_assets._imports_8,
        s: common_assets._imports_0$2,
        t: common_assets._imports_9,
        v: common_assets._imports_0$2,
        w: common_vendor.o(feedback),
        x: common_assets._imports_10,
        y: common_assets._imports_0$2,
        z: common_vendor.o(systemSetting),
        A: common_assets._imports_11,
        B: common_assets._imports_0$2,
        C: common_vendor.o(aboutPage),
        D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
