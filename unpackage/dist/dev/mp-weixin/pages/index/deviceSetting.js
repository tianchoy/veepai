"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  const _easycom_l_input_1 = common_vendor.resolveComponent("l-input");
  const _component_l_dialog = common_vendor.resolveComponent("l-dialog");
  (_easycom_l_icon_1 + _easycom_fui_icon_1 + _easycom_fui_button_1 + _easycom_l_input_1 + _component_l_dialog)();
}
const _easycom_l_icon = () => "../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_button = () => "../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
const _easycom_l_input = () => "../../uni_modules/lime-input/components/l-input/l-input.js";
if (!Math) {
  (common_vendor.unref(TopNavBar) + _easycom_l_icon + _easycom_fui_icon + _easycom_fui_button + _easycom_l_input)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceSetting",
  setup(__props) {
    const showEditName = common_vendor.ref(false);
    const newName = common_vendor.ref("");
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1
      }));
    };
    const editName = () => {
      showEditName.value = true;
    };
    const changeName = () => {
      common_vendor.index.showToast({
        title: newName.value
      });
      showEditName.value = false;
    };
    const copyUid = () => {
      common_vendor.index.setClipboardData({
        data: "123456",
        success: function() {
          common_vendor.index.showToast({
            "title": "复制成功"
          });
        }
      });
    };
    const goDeviceSettingInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceSettingInfo/deviceSettingInfo"
      });
    };
    const deleteDevice = () => {
      common_vendor.index.showModal(new UTSJSONObject({
        title: "提示",
        content: "确认删除设备吗？",
        cancelText: "取消",
        confirmText: "删除",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/index/deviceSetting.uvue:127", "用户点击了确定");
          }
        }
      }));
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          showBack: true,
          title: "设备设置"
        }),
        c: common_assets._imports_0$1,
        d: common_vendor.p({
          name: "round-filled",
          color: "#e8782eff",
          size: "18"
        }),
        e: common_vendor.o(editName),
        f: common_vendor.p({
          name: "edit",
          color: "#333",
          size: "18"
        }),
        g: common_vendor.o(copyUid),
        h: common_vendor.p({
          name: "file-copy",
          color: "#999",
          size: "16"
        }),
        i: common_vendor.p({
          name: "arrowright",
          color: "#111",
          size: "40"
        }),
        j: common_vendor.o(goDeviceSettingInfo),
        k: common_vendor.p({
          name: "arrowright",
          color: "#111",
          size: "40"
        }),
        l: common_vendor.p({
          name: "arrowright",
          color: "#111",
          size: "40"
        }),
        m: common_vendor.p({
          name: "arrowright",
          color: "#111",
          size: "40"
        }),
        n: common_vendor.p({
          name: "arrowright",
          color: "#111",
          size: "40"
        }),
        o: common_vendor.p({
          name: "arrowright",
          color: "#111",
          size: "40"
        }),
        p: common_vendor.o(deleteDevice),
        q: common_vendor.p({
          text: "删除设备",
          height: "80rpx",
          background: "#fff",
          color: "red"
        }),
        r: common_vendor.o(($event = null) => {
          return newName.value = $event;
        }),
        s: common_vendor.p({
          placeholder: "请输入设备新名称",
          ["l-style"]: "background: #f3f3f3; margin-top:16px; padding-top:12px;padding:12px",
          modelValue: newName.value
        }),
        t: common_vendor.o(changeName),
        v: common_vendor.o(($event = null) => {
          return showEditName.value = false;
        }),
        w: common_vendor.o(($event = null) => {
          return showEditName.value = $event;
        }),
        x: common_vendor.p({
          title: "修改设备名称",
          ["cancel-btn"]: {
            content: "取消",
            variant: "text",
            size: "large",
            type: "default"
          },
          ["confirm-btn"]: {
            content: "确认",
            variant: "text",
            size: "large"
          },
          modelValue: showEditName.value
        }),
        y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fbc8d17f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deviceSetting.js.map
