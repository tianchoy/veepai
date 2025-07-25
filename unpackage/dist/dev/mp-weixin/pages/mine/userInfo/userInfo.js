"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_fui_switch_1 = common_vendor.resolveComponent("fui-switch");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_fui_switch_1 + _easycom_fui_button_1)();
}
const _easycom_fui_switch = () => "../../../uni_modules/firstui-unix/components/fui-switch/fui-switch.js";
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_fui_switch + _easycom_fui_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "userInfo",
  setup(__props) {
    const switchVal = common_vendor.ref(false);
    const change = () => {
      const isCurrentlyBound = switchVal.value;
      if (isCurrentlyBound) {
        common_vendor.index.showModal(new UTSJSONObject({
          title: "确认解绑",
          content: "确定要解除微信绑定吗？",
          cancelText: "取消",
          confirmText: "确定",
          success: (res) => {
            common_vendor.index.__f__("log", "at pages/mine/userInfo/userInfo.uvue:62", res);
            if (res.confirm) {
              common_vendor.index.__f__("log", "at pages/mine/userInfo/userInfo.uvue:64", "调用解绑API...");
              switchVal.value = false;
              common_vendor.index.showToast({
                title: "已成功解绑微信",
                icon: "none"
              });
            } else if (res.cancel) {
              common_vendor.index.__f__("log", "at pages/mine/userInfo/userInfo.uvue:73", "用户点击取消", isCurrentlyBound);
              switchVal.value = isCurrentlyBound;
            }
          }
        }));
      } else {
        common_vendor.index.showModal(new UTSJSONObject({
          title: "确认绑定",
          content: "确定要绑定微信账号吗？",
          cancelText: "取消",
          confirmText: "确定",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.__f__("log", "at pages/mine/userInfo/userInfo.uvue:86", "调用绑定API...");
              switchVal.value = true;
              common_vendor.index.showToast({
                title: "已成功绑定微信",
                icon: "none"
              });
            } else if (res.cancel) {
              common_vendor.index.__f__("log", "at pages/mine/userInfo/userInfo.uvue:94", "用户点击取消", isCurrentlyBound);
              switchVal.value = isCurrentlyBound;
            }
          }
        }));
      }
    };
    const logout = () => {
      common_vendor.index.showModal(new UTSJSONObject({
        content: "确定退出登陆吗？",
        cancelText: "取消",
        confirmText: "确定",
        success(res) {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "退出成功",
              icon: "none",
              duration: 500
            });
          }
        }
      }));
    };
    const changePhoneNumber = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/userInfo/changePhoneNumber/changePhoneNumber"
      });
    };
    const cancelAnAccount = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/userInfo/CancelAnAccount/CancelAnAccount"
      });
    };
    const editPassword = () => {
      {
        common_vendor.index.navigateTo({
          url: "/pages/mine/userInfo/changePassword/changePassword"
        });
      }
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.o(changePhoneNumber),
        c: common_assets._imports_0$3,
        d: common_vendor.o(editPassword),
        e: common_assets._imports_0$3,
        f: common_vendor.o(cancelAnAccount),
        g: common_vendor.t(switchVal.value ? "已绑定" : "未绑定"),
        h: common_vendor.o(change),
        i: common_vendor.p({
          checked: switchVal.value,
          color: "#1296db"
        }),
        j: common_vendor.o(logout),
        k: common_vendor.p({
          color: "#fff",
          text: "退出登陆",
          background: "#1296db"
        }),
        l: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/userInfo/userInfo.js.map
