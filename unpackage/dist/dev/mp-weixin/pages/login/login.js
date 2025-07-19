"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  const _easycom_fui_checkbox_1 = common_vendor.resolveComponent("fui-checkbox");
  const _easycom_fui_label_1 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_checkbox_group_1 = common_vendor.resolveComponent("fui-checkbox-group");
  const _easycom_fui_bottom_popup_1 = common_vendor.resolveComponent("fui-bottom-popup");
  (_easycom_fui_icon_1 + _easycom_fui_input_1 + _easycom_fui_button_1 + _easycom_fui_checkbox_1 + _easycom_fui_label_1 + _easycom_fui_checkbox_group_1 + _easycom_fui_bottom_popup_1)();
}
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_input = () => "../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_fui_button = () => "../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
const _easycom_fui_checkbox = () => "../../uni_modules/firstui-unix/components/fui-checkbox/fui-checkbox.js";
const _easycom_fui_label = () => "../../uni_modules/firstui-unix/components/fui-label/fui-label.js";
const _easycom_fui_checkbox_group = () => "../../uni_modules/firstui-unix/components/fui-checkbox-group/fui-checkbox-group.js";
const _easycom_fui_bottom_popup = () => "../../uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js";
if (!Math) {
  (common_vendor.unref(TopNavBar) + _easycom_fui_icon + _easycom_fui_input + _easycom_fui_button + _easycom_fui_checkbox + _easycom_fui_label + _easycom_fui_checkbox_group + _easycom_fui_bottom_popup)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const loginType = common_vendor.ref(true);
    const isCheck = common_vendor.ref("");
    const btnWord = common_vendor.ref("获取验证码");
    const isCounting = common_vendor.ref(false);
    const user_info = common_vendor.ref(false);
    const user_text = common_vendor.ref(new UTSJSONObject({
      title: "",
      content: ""
    }));
    const changeType = (bool) => {
      loginType.value = bool;
    };
    const closeUserPopup = () => {
      user_info.value = false;
    };
    const showUserInfo = () => {
      user_info.value = true;
      user_text.value = new UTSJSONObject({
        title: "用户协议",
        content: "用户协议内容"
      });
    };
    const priviteInfo = () => {
      user_info.value = true;
      user_text.value = new UTSJSONObject({
        title: "隐私政策",
        content: "隐私政策内容"
      });
    };
    const isChecked = (e) => {
      isCheck.value = e.join(",");
    };
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
      common_vendor.index.__f__("log", "at pages/login/login.uvue:146", "发送验证码请求...");
      isCounting.value = true;
      countDown(90);
    };
    const login = () => {
      if (isCheck.value == "") {
        common_vendor.index.showToast({
          title: "请先同意用户协议和隐私政策",
          icon: "none"
        });
      } else {
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none"
        });
      }
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.p(new UTSJSONObject({
          title: "登陆",
          isText: true,
          rightText: "注册"
        })),
        b: common_assets._imports_0$5,
        c: loginType.value
      }), loginType.value ? new UTSJSONObject({
        d: common_vendor.p(new UTSJSONObject({
          name: "mobile",
          color: "#1296db",
          size: 48
        })),
        e: common_vendor.p(new UTSJSONObject({
          ["placeholder-style"]: "color:#000",
          backgroundColor: "#d3a0fa",
          radius: 40,
          borderBottom: false,
          placeholder: "请输入账号"
        })),
        f: common_vendor.p(new UTSJSONObject({
          name: "captcha",
          color: "#1296db",
          size: 48
        })),
        g: common_vendor.p(new UTSJSONObject({
          ["placeholder-style"]: "color:#000",
          backgroundColor: "#d3a0fa",
          marginTop: 40,
          radius: 40,
          borderBottom: false,
          placeholder: "请输入密码",
          type: "password"
        })),
        h: common_vendor.o(($event = null) => {
          return changeType(false);
        })
      }) : new UTSJSONObject({
        i: common_vendor.p(new UTSJSONObject({
          name: "mobile",
          color: "#1296db",
          size: 48
        })),
        j: common_vendor.p(new UTSJSONObject({
          ["placeholder-style"]: "color:#000",
          backgroundColor: "#d3a0fa",
          radius: 40,
          borderBottom: false,
          placeholder: "请输入账号"
        })),
        k: common_vendor.p(new UTSJSONObject({
          name: "captcha",
          color: "#1296db",
          size: 48
        })),
        l: common_vendor.o(getPsw),
        m: common_vendor.p(new UTSJSONObject({
          width: "200rpx",
          height: "64rpx",
          size: 28,
          text: btnWord.value,
          background: "none",
          color: "#333",
          disabled: isCounting.value
        })),
        n: common_vendor.p(new UTSJSONObject({
          padding: "20rpx 32rpx",
          backgroundColor: "#d3a0fa",
          placeholder: "请输入验证码",
          bottomLeft: 0,
          marginTop: 40,
          radius: 40,
          placeholderStyle: "font-size: 26rpx;",
          ["placeholder-style"]: "color:#000",
          borderBottom: false
        })),
        o: common_vendor.o(($event = null) => {
          return changeType(true);
        })
      }), new UTSJSONObject({
        p: common_vendor.p(new UTSJSONObject({
          value: "1"
        })),
        q: common_vendor.o(showUserInfo),
        r: common_vendor.o(priviteInfo),
        s: common_vendor.o(isChecked),
        t: common_vendor.p(new UTSJSONObject({
          name: "checkbox"
        })),
        v: common_vendor.o(login),
        w: common_vendor.p(new UTSJSONObject({
          text: "登录",
          margin: "20rpx 0 0 0",
          background: "#1296db",
          color: "#fff",
          size: 40
        })),
        x: common_vendor.t(user_text.value.title),
        y: common_vendor.p(new UTSJSONObject({
          name: "close",
          size: 48
        })),
        z: common_vendor.o(closeUserPopup),
        A: common_vendor.t(user_text.value.content),
        B: common_vendor.o(closeUserPopup),
        C: common_vendor.p(new UTSJSONObject({
          visible: user_info.value
        })),
        D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-27a30816"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
