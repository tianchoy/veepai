"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "mine",
  setup(__props) {
    const getUser = () => {
      common_vendor.index.showToast({
        title: "用户中心",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2,
        d: common_assets._imports_3,
        e: common_assets._imports_4,
        f: common_vendor.o(getUser),
        g: common_assets._imports_5,
        h: common_assets._imports_4,
        i: common_assets._imports_6,
        j: common_assets._imports_4,
        k: common_assets._imports_7,
        l: common_assets._imports_4,
        m: common_assets._imports_8,
        n: common_assets._imports_4,
        o: common_assets._imports_9,
        p: common_assets._imports_4,
        q: common_assets._imports_10,
        r: common_assets._imports_4,
        s: common_assets._imports_11,
        t: common_assets._imports_4,
        v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-284ae985"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
