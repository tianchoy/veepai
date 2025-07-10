"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_l_textarea_1 = common_vendor.resolveComponent("l-textarea");
  const _easycom_l_upload_1 = common_vendor.resolveComponent("l-upload");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_fui_icon_1 + _easycom_fui_input_1 + _easycom_l_textarea_1 + _easycom_l_upload_1 + _easycom_fui_button_1)();
}
const _easycom_fui_icon = () => "../../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_input = () => "../../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_l_textarea = () => "../../../uni_modules/lime-textarea/components/l-textarea/l-textarea.js";
const _easycom_l_upload = () => "../../../uni_modules/lime-upload/components/l-upload/l-upload.js";
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (_easycom_fui_icon + _easycom_fui_input + _easycom_l_textarea + _easycom_l_upload + _easycom_fui_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "feeback",
  setup(__props) {
    const files = common_vendor.ref([{
      url: "https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png",
      name: "uploaded4.png",
      type: "image"
    }]);
    const submit = () => {
      common_vendor.index.showToast({
        title: "提交成功"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          name: "arrowright",
          size: 45
        }),
        b: common_vendor.p({
          ["text-align"]: "right",
          label: "问题类型",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          required: true,
          placeholder: "请选择问题类型"
        }),
        c: common_vendor.p({
          name: "arrowright",
          size: 45
        }),
        d: common_vendor.p({
          ["text-align"]: "right",
          label: "设备型号",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          placeholder: "请选择设备型号(选填)"
        }),
        e: common_vendor.p({
          ["text-align"]: "right",
          label: "联系方式",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: false,
          required: true,
          placeholder: "请输入联系方式"
        }),
        f: common_vendor.p({
          placeholder: "请输入内容",
          maxlength: 200,
          indicator: true,
          autosize: true,
          autofocus: true,
          clearable: true,
          layout: "vertical"
        }),
        g: common_vendor.o(($event = null) => {
          return files.value = $event;
        }),
        h: common_vendor.p({
          max: 3,
          multiple: true,
          modelValue: files.value
        }),
        i: common_vendor.o(submit),
        j: common_vendor.p({
          color: "#fff",
          text: "去充值",
          background: "#1296db",
          height: "80rpx"
        }),
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d38f2ce"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/feeback/feeback.js.map
