"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_l_button_1 = common_vendor.resolveComponent("l-button");
  const _easycom_l_search_1 = common_vendor.resolveComponent("l-search");
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_l_tab_panel_1 = common_vendor.resolveComponent("l-tab-panel");
  const _easycom_l_tabs_1 = common_vendor.resolveComponent("l-tabs");
  (_easycom_l_button_1 + _easycom_l_search_1 + _easycom_l_icon_1 + _easycom_l_tab_panel_1 + _easycom_l_tabs_1)();
}
const _easycom_l_button = () => "../../../uni_modules/lime-button/components/l-button/l-button.js";
const _easycom_l_search = () => "../../../uni_modules/lime-search/components/l-search/l-search.js";
const _easycom_l_icon = () => "../../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_l_tab_panel = () => "../../../uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.js";
const _easycom_l_tabs = () => "../../../uni_modules/lime-tabs/components/l-tabs/l-tabs.js";
if (!Math) {
  (_easycom_l_button + _easycom_l_search + _easycom_l_icon + _easycom_l_tab_panel + _easycom_l_tabs)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "helpCenter",
  setup(__props) {
    const value = common_vendor.ref("");
    const tabIndex = common_vendor.ref(0);
    const search = () => {
      common_vendor.index.showToast({
        title: value.value
      });
    };
    const questionDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/helpCenter/questionDetail/questionDetail"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(search),
        b: common_vendor.p({
          type: "primary",
          size: "small",
          shape: "round"
        }),
        c: common_vendor.o(($event = null) => {
          return common_vendor.isRef(value) ? value.value = $event : null;
        }),
        d: common_vendor.p({
          padding: "10rpx 5rpx 10rpx 24rpx",
          shape: "round",
          placeholder: "请输入关键字",
          modelValue: common_vendor.unref(value)
        }),
        e: common_vendor.p({
          name: "chevron-right",
          size: "28"
        }),
        f: common_vendor.o(questionDetail),
        g: common_vendor.p({
          value: 0,
          label: "添加设备"
        }),
        h: common_vendor.p({
          name: "chevron-right",
          size: "28"
        }),
        i: common_vendor.p({
          value: 1,
          label: "网络问题"
        }),
        j: common_vendor.p({
          name: "chevron-right",
          size: "28"
        }),
        k: common_vendor.p({
          value: 2,
          label: "报警问题"
        }),
        l: common_vendor.o(($event = null) => {
          return common_vendor.isRef(tabIndex) ? tabIndex.value = $event : null;
        }),
        m: common_vendor.p({
          ["space-evenly"]: false,
          animated: true,
          modelValue: common_vendor.unref(tabIndex)
        }),
        n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d953926c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/helpCenter/helpCenter.js.map
