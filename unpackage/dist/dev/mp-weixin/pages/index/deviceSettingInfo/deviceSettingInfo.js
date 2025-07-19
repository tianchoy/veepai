"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_switch_1 = common_vendor.resolveComponent("fui-switch");
  const _easycom_fui_badge_1 = common_vendor.resolveComponent("fui-badge");
  (_easycom_fui_icon_1 + _easycom_fui_switch_1 + _easycom_fui_badge_1)();
}
const _easycom_fui_icon = () => "../../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_switch = () => "../../../uni_modules/firstui-unix/components/fui-switch/fui-switch.js";
const _easycom_fui_badge = () => "../../../uni_modules/firstui-unix/components/fui-badge/fui-badge.js";
if (!Math) {
  (common_vendor.unref(TopNavBar) + _easycom_fui_icon + _easycom_fui_switch + _easycom_fui_badge)();
}
const TopNavBar = () => "../../../components/TopNavBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceSettingInfo",
  setup(__props) {
    const state = common_vendor.ref(false);
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1
      }));
    };
    const goNightMode = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceSettingInfo/deviceNight"
      });
    };
    const changeSwitch = (e) => {
      common_vendor.index.__f__("log", "at pages/index/deviceSettingInfo/deviceSettingInfo.uvue:48", e);
    };
    const restart = () => {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "提示",
        content: "确认重启设备吗？",
        cancelText: "取消",
        confirmText: "重启",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/index/deviceSettingInfo/deviceSettingInfo.uvue:59", "用户点击了确定");
          }
        }
      }));
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          title: "设备设置",
          ["show-back"]: true
        }),
        c: common_vendor.p({
          name: "arrowright",
          size: "40"
        }),
        d: common_vendor.o(goNightMode),
        e: common_vendor.o(changeSwitch),
        f: common_vendor.p({
          scaleRatio: 0.8,
          checked: common_vendor.unref(state)
        }),
        g: common_vendor.p({
          value: "new",
          type: "danger",
          scaleRatio: 0.8
        }),
        h: common_vendor.p({
          name: "arrowright",
          size: "40"
        }),
        i: common_vendor.o(restart),
        j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-56cfa872"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/deviceSettingInfo/deviceSettingInfo.js.map
