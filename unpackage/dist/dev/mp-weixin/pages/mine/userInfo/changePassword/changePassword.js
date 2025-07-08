"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_fui_input_1 + _easycom_fui_button_1)();
}
const _easycom_fui_input = () => "../../../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_fui_button = () => "../../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_fui_input + _easycom_fui_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "changePassword",
  setup(__props) {
    const oldPassword = common_vendor.ref("");
    const newPassword = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const btnDisabled = common_vendor.ref(true);
    const errorMsg = common_vendor.ref("");
    const passwordReg = /^(?:(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d])|(?=.*\d)(?=.*[^a-zA-Z\d])).{8,16}$/;
    function verPassword(psw) {
      return passwordReg.test(psw);
    }
    const updateBtnState = () => {
      const allFieldsFilled = oldPassword.value.length > 0 && newPassword.value.length > 0 && confirmPassword.value.length > 0;
      const passwordsMatch = newPassword.value === confirmPassword.value;
      const newPwdValid = verPassword(newPassword.value);
      btnDisabled.value = !(allFieldsFilled && newPwdValid && passwordsMatch);
    };
    const updateOldPassword = (e) => {
      oldPassword.value = e;
      updateBtnState();
    };
    const updateNewPassword = (e) => {
      newPassword.value = e;
      errorMsg.value = "";
      if (e.length > 0 && !verPassword(e)) {
        errorMsg.value = "密码格式不符合要求";
      } else if (confirmPassword.value.length > 0 && e != confirmPassword.value) {
        errorMsg.value = "两次输入的密码不一致";
      }
      updateBtnState();
    };
    const updateConfirmPassword = (e) => {
      confirmPassword.value = e;
      errorMsg.value = "";
      if (e.length > 0) {
        if (!verPassword(e)) {
          errorMsg.value = "确认密码格式不符合要求";
        } else if (e != newPassword.value) {
          errorMsg.value = "两次输入的密码不一致";
        }
      }
      updateBtnState();
    };
    const submit = () => {
      if (!verPassword(newPassword.value)) {
        common_vendor.index.showToast({
          title: "密码格式错误",
          icon: "none"
        });
        return null;
      }
      if (newPassword.value != confirmPassword.value) {
        common_vendor.index.showToast({
          title: "两次密码不一致",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.showToast({
        title: "提交成功",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.o(updateOldPassword),
        b: common_vendor.p(new UTSJSONObject({
          label: "旧密码",
          placeholder: "请输入原密码",
          type: "password",
          modelValue: oldPassword.value
        })),
        c: common_vendor.o(updateNewPassword),
        d: common_vendor.p(new UTSJSONObject({
          label: "新密码",
          placeholder: "请输入新密码",
          type: "password",
          modelValue: newPassword.value
        })),
        e: common_vendor.o(updateConfirmPassword),
        f: common_vendor.p(new UTSJSONObject({
          label: "确认新密码",
          placeholder: "再次输入新密码",
          type: "password",
          modelValue: confirmPassword.value
        })),
        g: errorMsg.value
      }), errorMsg.value ? new UTSJSONObject({
        h: common_vendor.t(errorMsg.value)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        i: common_vendor.o(submit),
        j: common_vendor.p(new UTSJSONObject({
          color: "#fff",
          disabled: btnDisabled.value,
          text: "提交",
          background: "#1296db",
          height: "80rpx"
        })),
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
}));
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/mine/userInfo/changePassword/changePassword.js.map
