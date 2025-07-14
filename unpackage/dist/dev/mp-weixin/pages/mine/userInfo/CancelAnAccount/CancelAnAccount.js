"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
if (!Array) {
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  _easycom_fui_button_1();
}
const _easycom_fui_button = () => "../../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  _easycom_fui_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CancelAnAccount",
  setup(__props) {
    const cancelAccount = () => {
      common_vendor.index.showToast({
        title: "注销成功",
        icon: "success",
        duration: 2e3
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0$4,
        b: common_vendor.p({
          text: "取消",
          background: "#fff",
          color: "#1296db",
          borderColor: "#666",
          height: "70rpx"
        }),
        c: common_vendor.o(cancelAccount),
        d: common_vendor.p({
          text: "申请注销",
          background: "#1296db",
          color: "#fff",
          height: "70rpx"
        }),
        e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-413bf11b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/mine/userInfo/CancelAnAccount/CancelAnAccount.js.map
