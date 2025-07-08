"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_fui_icon_1 + _easycom_fui_input_1 + _easycom_fui_button_1)();
}
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_input = () => "../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_fui_button = () => "../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_fui_icon + _easycom_fui_input + _easycom_fui_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "login",
  setup(__props) {
    const login = () => {
      common_vendor.index.showToast({
        title: "登录成功",
        icon: "success",
        duration: 1e3
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0,
        b: common_vendor.p({
          name: "mobile",
          color: "#1296db",
          size: 48
        }),
        c: common_vendor.p({
          ["placeholder-style"]: "color:#666",
          backgroundColor: "#f9dbf5",
          radius: 40,
          borderBottom: false,
          placeholder: "请输入账号"
        }),
        d: common_vendor.p({
          name: "captcha",
          color: "#1296db",
          size: 48
        }),
        e: common_vendor.p({
          ["placeholder-style"]: "color:#666",
          backgroundColor: "#f9dbf5",
          marginTop: 40,
          radius: 40,
          borderBottom: false,
          placeholder: "请输入密码",
          type: "password"
        }),
        f: common_vendor.o(login),
        g: common_vendor.p({
          margin: "20 0 0 0",
          background: "#1296db",
          color: "#fff",
          size: 40,
          height: "50"
        }),
        h: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-27a30816"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
