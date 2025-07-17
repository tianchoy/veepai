"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_l_checkbox_1 = common_vendor.resolveComponent("l-checkbox");
  const _easycom_l_checkbox_group_1 = common_vendor.resolveComponent("l-checkbox-group");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_l_icon_1 + _easycom_l_checkbox_1 + _easycom_l_checkbox_group_1 + _easycom_fui_button_1)();
}
const _easycom_l_icon = () => "../../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_l_checkbox = () => "../../../uni_modules/lime-checkbox/components/l-checkbox/l-checkbox.js";
const _easycom_l_checkbox_group = () => "../../../uni_modules/lime-checkbox/components/l-checkbox-group/l-checkbox-group.js";
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_l_icon + _easycom_l_checkbox + _easycom_l_checkbox_group + _easycom_fui_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "visitorDetail",
  setup(__props) {
    const checkboxGroupRef = common_vendor.ref(null);
    const checked = common_vendor.ref(["1", "3", "7"]);
    const onChange = (e) => {
      common_vendor.index.__f__("log", "at pages/index/deviceShare/visitorDetail.uvue:43", "onChange", e);
      checked.value = e;
    };
    const checkAll = () => {
      if (checkboxGroupRef.value == null)
        return null;
      checkboxGroupRef.value.toggleAll(true);
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(checkAll),
        b: common_vendor.p({
          name: "task-checked",
          size: "20"
        }),
        c: common_vendor.p({
          value: "1",
          label: "视频预览"
        }),
        d: common_vendor.p({
          value: "2",
          label: "视频回放"
        }),
        e: common_vendor.p({
          value: "3",
          label: "云台控制"
        }),
        f: common_vendor.p({
          value: "4",
          label: "对讲"
        }),
        g: common_vendor.p({
          value: "5",
          label: "声音"
        }),
        h: common_vendor.p({
          value: "6",
          label: "推送"
        }),
        i: common_vendor.p({
          value: "7",
          label: "设备管理"
        }),
        j: common_vendor.sr(checkboxGroupRef, "80336bf4-1", {
          "k": "checkboxGroupRef"
        }),
        k: common_vendor.o(onChange),
        l: common_vendor.o(($event = null) => {
          return checked.value = $event;
        }),
        m: common_vendor.p({
          fontSize: "28rpx",
          iconSize: "20",
          direction: "vertical",
          modelValue: checked.value
        }),
        n: common_vendor.p({
          type: "default",
          borderColor: "#6831ff",
          color: "#6831ff",
          width: "40%",
          text: "删除访客"
        }),
        o: common_vendor.p({
          type: "primary",
          width: "40%",
          text: "保存"
        }),
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80336bf4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/deviceShare/visitorDetail.js.map
