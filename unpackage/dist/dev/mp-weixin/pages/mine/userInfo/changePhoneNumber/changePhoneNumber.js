"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_fui_icon_1 + _easycom_fui_input_1 + _easycom_fui_button_1)();
}
const _easycom_fui_icon = () => "../../../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_input = () => "../../../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_fui_button = () => "../../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_fui_icon + _easycom_fui_input + _easycom_fui_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "changePhoneNumber",
  setup(__props) {
    const btnWord = common_vendor.ref("获取验证码");
    const isCounting = common_vendor.ref(false);
    function countDown(seconds) {
      if (seconds <= 0) {
        btnWord.value = "获取验证码";
        isCounting.value = false;
        return null;
      }
      btnWord.value = `${seconds}秒后重发`;
      setTimeout(() => {
        countDown(seconds - 1);
      }, 1e3);
    }
    const getPsw = () => {
      if (isCounting.value)
        return null;
      common_vendor.index.__f__("log", "at pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue:56", "发送验证码请求...");
      isCounting.value = true;
      countDown(60);
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          name: "mobile",
          color: "#1296db",
          size: 48
        }),
        b: common_vendor.p({
          placeholder: "请输入手机号",
          placeholderStyle: "font-size: 26rpx;"
        }),
        c: common_vendor.p({
          name: "captcha",
          color: "#1296db",
          size: 48
        }),
        d: common_vendor.o(getPsw),
        e: common_vendor.p({
          type: "gray",
          width: "200rpx",
          height: "64rpx",
          size: 28,
          text: btnWord.value,
          disabled: isCounting.value
        }),
        f: common_vendor.p({
          padding: "20rpx 32rpx",
          placeholder: "请输入验证码",
          bottomLeft: 0,
          placeholderStyle: "font-size: 26rpx;"
        }),
        g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2776b291"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/mine/userInfo/changePhoneNumber/changePhoneNumber.js.map
