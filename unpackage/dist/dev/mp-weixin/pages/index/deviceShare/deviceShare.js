"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_fui_radio_1 = common_vendor.resolveComponent("fui-radio");
  const _easycom_fui_label_1 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_radio_group_1 = common_vendor.resolveComponent("fui-radio-group");
  const _easycom_l_input_1 = common_vendor.resolveComponent("l-input");
  const _easycom_l_checkbox_1 = common_vendor.resolveComponent("l-checkbox");
  const _easycom_l_checkbox_group_1 = common_vendor.resolveComponent("l-checkbox-group");
  const _easycom_l_button_1 = common_vendor.resolveComponent("l-button");
  (_easycom_l_icon_1 + _easycom_fui_radio_1 + _easycom_fui_label_1 + _easycom_fui_radio_group_1 + _easycom_l_input_1 + _easycom_l_checkbox_1 + _easycom_l_checkbox_group_1 + _easycom_l_button_1)();
}
const _easycom_l_icon = () => "../../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_fui_radio = () => "../../../uni_modules/firstui-unix/components/fui-radio/fui-radio.js";
const _easycom_fui_label = () => "../../../uni_modules/firstui-unix/components/fui-label/fui-label.js";
const _easycom_fui_radio_group = () => "../../../uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.js";
const _easycom_l_input = () => "../../../uni_modules/lime-input/components/l-input/l-input.js";
const _easycom_l_checkbox = () => "../../../uni_modules/lime-checkbox/components/l-checkbox/l-checkbox.js";
const _easycom_l_checkbox_group = () => "../../../uni_modules/lime-checkbox/components/l-checkbox-group/l-checkbox-group.js";
const _easycom_l_button = () => "../../../uni_modules/lime-button/components/l-button/l-button.js";
if (!Math) {
  (_easycom_l_icon + _easycom_fui_radio + _easycom_fui_label + _easycom_fui_radio_group + _easycom_l_input + _easycom_l_checkbox + _easycom_l_checkbox_group + _easycom_l_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceShare",
  setup(__props) {
    const checkboxGroupRef = common_vendor.ref(null);
    const sharedCount = common_vendor.ref("2");
    const shareType = common_vendor.ref("1");
    const goVisitor = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceShare/deviceVisitor"
      });
    };
    const change = (value) => {
      shareType.value = value;
    };
    const onChange = (e) => {
      common_vendor.index.__f__("log", "at pages/index/deviceShare/deviceShare.uvue:83", "onChange", e);
    };
    const checkAll = () => {
      if (checkboxGroupRef.value == null)
        return null;
      checkboxGroupRef.value.toggleAll(true);
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.t(sharedCount.value),
        b: common_vendor.p(new UTSJSONObject({
          name: "chevron-right",
          size: "30"
        })),
        c: common_vendor.o(goVisitor),
        d: common_vendor.p(new UTSJSONObject({
          value: "1",
          scaleRatio: 0.9
        })),
        e: common_vendor.p(new UTSJSONObject({
          value: "2",
          scaleRatio: 0.9
        })),
        f: common_vendor.p(new UTSJSONObject({
          margin: "0 0 0 40rpx"
        })),
        g: common_vendor.p(new UTSJSONObject({
          value: "3",
          scaleRatio: 0.9
        })),
        h: common_vendor.p(new UTSJSONObject({
          margin: "0 0 0 40rpx"
        })),
        i: common_vendor.o(change),
        j: common_vendor.p(new UTSJSONObject({
          name: "radio",
          modelValue: shareType.value
        })),
        k: shareType.value == "1"
      }), shareType.value == "1" ? new UTSJSONObject({
        l: common_vendor.p(new UTSJSONObject({
          placeholder: "请输入文字"
        }))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        m: common_vendor.o(checkAll),
        n: common_vendor.p(new UTSJSONObject({
          value: "1",
          label: "视频预览"
        })),
        o: common_vendor.p(new UTSJSONObject({
          value: "2",
          label: "视频回放"
        })),
        p: common_vendor.p(new UTSJSONObject({
          value: "3",
          label: "云台控制"
        })),
        q: common_vendor.p(new UTSJSONObject({
          value: "4",
          label: "对讲"
        })),
        r: common_vendor.p(new UTSJSONObject({
          value: "5",
          label: "声音"
        })),
        s: common_vendor.p(new UTSJSONObject({
          value: "6",
          label: "推送"
        })),
        t: common_vendor.p(new UTSJSONObject({
          value: "7",
          label: "设备管理"
        })),
        v: common_vendor.sr(checkboxGroupRef, "91e2c69f-9", new UTSJSONObject({
          "k": "checkboxGroupRef"
        })),
        w: common_vendor.o(onChange),
        x: common_vendor.p(new UTSJSONObject({
          iconSize: "35rpx",
          fontSize: "30rpx",
          direction: "horizontal"
        })),
        y: common_vendor.p(new UTSJSONObject({
          type: "primary",
          block: true
        })),
        z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-91e2c69f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/deviceShare/deviceShare.js.map
