"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_input_1 = common_vendor.resolveComponent("fui-input");
  const _easycom_l_textarea_1 = common_vendor.resolveComponent("l-textarea");
  const _easycom_l_upload_1 = common_vendor.resolveComponent("l-upload");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  const _easycom_l_picker_1 = common_vendor.resolveComponent("l-picker");
  const _easycom_fui_bottom_popup_1 = common_vendor.resolveComponent("fui-bottom-popup");
  (_easycom_fui_icon_1 + _easycom_fui_input_1 + _easycom_l_textarea_1 + _easycom_l_upload_1 + _easycom_fui_button_1 + _easycom_l_picker_1 + _easycom_fui_bottom_popup_1)();
}
const _easycom_fui_icon = () => "../../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_input = () => "../../../uni_modules/firstui-unix/components/fui-input/fui-input.js";
const _easycom_l_textarea = () => "../../../uni_modules/lime-textarea/components/l-textarea/l-textarea.js";
const _easycom_l_upload = () => "../../../uni_modules/lime-upload/components/l-upload/l-upload.js";
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
const _easycom_l_picker = () => "../../../uni_modules/lime-picker/components/l-picker/l-picker.js";
const _easycom_fui_bottom_popup = () => "../../../uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js";
if (!Math) {
  (_easycom_fui_icon + _easycom_fui_input + _easycom_l_textarea + _easycom_l_upload + _easycom_fui_button + _easycom_l_picker + _easycom_fui_bottom_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "feeback",
  setup(__props) {
    const questionType = common_vendor.ref("请选择问题类型");
    const files = common_vendor.ref([{
      url: "https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/lime-barcode_0.png",
      name: "uploaded4.png",
      type: "image"
    }]);
    const pickerOptions = common_vendor.ref([]);
    const showPicker = common_vendor.ref(false);
    const showQuestionsPicker = () => {
      pickerOptions.value = [
        [
          {
            label: "产品",
            value: "产品"
          },
          {
            label: "服务",
            value: "服务"
          },
          {
            label: "其他",
            value: "其他"
          }
        ]
      ];
      showPicker.value = true;
    };
    const onConfirm = (context) => {
      showPicker.value = false;
      questionType.value = context.values[0].toString();
    };
    const oncancel = () => {
      showPicker.value = false;
    };
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
          placeholder: questionType.value
        }),
        c: common_vendor.o(showQuestionsPicker),
        d: common_vendor.p({
          name: "arrowright",
          size: 45
        }),
        e: common_vendor.p({
          ["text-align"]: "right",
          label: "设备型号",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: true,
          placeholder: "请选择设备型号(选填)"
        }),
        f: common_vendor.p({
          ["text-align"]: "right",
          label: "联系方式",
          labelSize: 28,
          textAlign: "left",
          placeholderStyle: "font-size: 28rpx;",
          disabled: false,
          required: true,
          placeholder: "请输入联系方式"
        }),
        g: common_vendor.p({
          placeholder: "请输入内容",
          maxlength: 200,
          indicator: true,
          autosize: true,
          autofocus: true,
          clearable: true,
          layout: "vertical"
        }),
        h: common_vendor.o(($event = null) => {
          return files.value = $event;
        }),
        i: common_vendor.p({
          max: 3,
          multiple: true,
          modelValue: files.value
        }),
        j: common_vendor.o(submit),
        k: common_vendor.p({
          color: "#fff",
          text: "去充值",
          background: "#1296db",
          height: "80rpx"
        }),
        l: common_vendor.o(oncancel),
        m: common_vendor.o(onConfirm),
        n: common_vendor.p({
          ["cancel-btn"]: "取消",
          ["confirm-btn"]: "确定",
          columns: pickerOptions.value
        }),
        o: common_vendor.p({
          visible: showPicker.value
        }),
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d38f2ce"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/feeback/feeback.js.map
