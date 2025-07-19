"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  _easycom_l_icon_1();
}
const _easycom_l_icon = () => "../../../uni_modules/lime-icon/components/l-icon/l-icon.js";
if (!Math) {
  _easycom_l_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceVisitor",
  setup(__props) {
    const toDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceShare/visitorDetail"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          name: "chevron-right",
          size: "30"
        }),
        b: common_vendor.o(toDetail),
        c: common_vendor.p({
          name: "chevron-right",
          size: "30"
        }),
        d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-671389af"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/deviceShare/deviceVisitor.js.map
