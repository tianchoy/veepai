"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  _easycom_fui_button_1();
}
const _easycom_fui_button = () => "../../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  _easycom_fui_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "changePhoneNumber",
  setup(__props) {
    const btnText = common_vendor.ref("获取验证码");
    common_vendor.ref(null);
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          text: btnText.value
        }),
        b: common_vendor.p({
          text: "确定"
        }),
        c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2776b291"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/mine/userInfo/changePhoneNumber/changePhoneNumber.js.map
