"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_fui_button2 = common_vendor.resolveComponent("fui-button");
  _easycom_fui_button2();
}
const _easycom_fui_button = () => "../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  _easycom_fui_button();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      width: "45%",
      height: "80rpx",
      text: "存储管理"
    }),
    b: common_vendor.p({
      width: "45%",
      height: "80rpx",
      text: "立即续费"
    }),
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f66a73ac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/cloudStorageSetting.js.map
