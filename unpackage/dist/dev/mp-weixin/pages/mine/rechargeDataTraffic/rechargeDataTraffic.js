"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_l_progress_1 = common_vendor.resolveComponent("l-progress");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  const _easycom_fui_radio_1 = common_vendor.resolveComponent("fui-radio");
  const _easycom_fui_list_cell_1 = common_vendor.resolveComponent("fui-list-cell");
  const _easycom_fui_label_1 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_radio_group_1 = common_vendor.resolveComponent("fui-radio-group");
  const _easycom_fui_bottom_popup_1 = common_vendor.resolveComponent("fui-bottom-popup");
  (_easycom_fui_icon_1 + _easycom_l_icon_1 + _easycom_l_progress_1 + _easycom_fui_button_1 + _easycom_fui_radio_1 + _easycom_fui_list_cell_1 + _easycom_fui_label_1 + _easycom_fui_radio_group_1 + _easycom_fui_bottom_popup_1)();
}
const _easycom_fui_icon = () => "../../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_l_icon = () => "../../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_l_progress = () => "../../../uni_modules/lime-progress/components/l-progress/l-progress.js";
const _easycom_fui_button = () => "../../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
const _easycom_fui_radio = () => "../../../uni_modules/firstui-unix/components/fui-radio/fui-radio.js";
const _easycom_fui_list_cell = () => "../../../uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.js";
const _easycom_fui_label = () => "../../../uni_modules/firstui-unix/components/fui-label/fui-label.js";
const _easycom_fui_radio_group = () => "../../../uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.js";
const _easycom_fui_bottom_popup = () => "../../../uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js";
if (!Math) {
  (_easycom_fui_icon + _easycom_l_icon + _easycom_l_progress + _easycom_fui_button + _easycom_fui_radio + _easycom_fui_list_cell + _easycom_fui_label + _easycom_fui_radio_group + _easycom_fui_bottom_popup)();
}
class RadioItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          deviceTitle: { type: String, optional: false },
          iccid: { type: String, optional: false },
          cardid: { type: String, optional: false },
          cardState: { type: String, optional: false },
          currentPackage: { type: String, optional: false },
          useDate: { type: String, optional: false },
          percent: { type: Number, optional: false },
          total: { type: String, optional: false },
          checked: { type: Boolean, optional: true }
        };
      },
      name: "RadioItem"
    };
  }
  constructor(options, metadata = RadioItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.deviceTitle = this.__props__.deviceTitle;
    this.iccid = this.__props__.iccid;
    this.cardid = this.__props__.cardid;
    this.cardState = this.__props__.cardState;
    this.currentPackage = this.__props__.currentPackage;
    this.useDate = this.__props__.useDate;
    this.percent = this.__props__.percent;
    this.total = this.__props__.total;
    this.checked = this.__props__.checked;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "rechargeDataTraffic",
  setup(__props) {
    const totalDevice = common_vendor.ref(4);
    common_vendor.ref(50);
    const isShow = common_vendor.ref(false);
    const currentDeviceInfo = common_vendor.ref(new RadioItem({
      deviceTitle: "",
      iccid: "",
      cardid: "",
      cardState: "",
      currentPackage: "",
      useDate: "",
      percent: 0,
      total: "",
      checked: true
    }));
    const radioItems = common_vendor.ref([new RadioItem({
      deviceTitle: "设备信息",
      iccid: "1123456667777887",
      cardid: "13000001111",
      cardState: "在用",
      currentPackage: "店长推荐【终身流量】",
      useDate: "2025-07-07",
      percent: 50,
      total: "100"
    }), new RadioItem({
      deviceTitle: "设备信息1",
      iccid: "1123456667777888",
      cardid: "13000001111",
      cardState: "停机",
      currentPackage: "店长推荐【100G流量】",
      useDate: "2025-07-08",
      percent: 70,
      total: "200"
    }), new RadioItem({
      deviceTitle: "设备信息2",
      cardid: "13000001111",
      iccid: "310203030443",
      cardState: "注销",
      currentPackage: "加油包",
      useDate: "2025-07-09",
      percent: 100,
      total: "300"
    })]);
    const getValue = (e) => {
      const selectedItem = UTS.arrayFind(radioItems.value, (item) => {
        return item.iccid == e;
      });
      if (selectedItem != null) {
        selectedItem.checked = true;
        currentDeviceInfo.value = selectedItem;
      }
      common_vendor.index.showToast({
        title: "更换成功",
        icon: "none"
      });
    };
    const currentInfo = () => {
      radioItems.value.forEach((item) => {
        item.checked = false;
      });
      radioItems.value[0].checked = true;
      currentDeviceInfo.value = radioItems.value[0];
    };
    const showPopup = () => {
      isShow.value = true;
    };
    const closePopup = () => {
      isShow.value = false;
    };
    const submit = () => {
      common_vendor.index.showToast({
        title: "去充值",
        icon: "none"
      });
    };
    const copyRight = () => {
      common_vendor.index.setClipboardData({
        data: currentDeviceInfo.value.iccid,
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      currentInfo();
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.t(totalDevice.value),
        b: common_vendor.o(showPopup),
        c: common_vendor.p({
          name: "arrowright",
          size: 50
        }),
        d: common_vendor.t(currentDeviceInfo.value.iccid),
        e: common_vendor.o(copyRight),
        f: common_vendor.p({
          name: "file-copy",
          color: "#666",
          size: "16"
        }),
        g: common_vendor.t(currentDeviceInfo.value.cardid),
        h: common_vendor.t(currentDeviceInfo.value.cardState),
        i: common_vendor.t(currentDeviceInfo.value.currentPackage),
        j: common_vendor.t(currentDeviceInfo.value.useDate),
        k: common_vendor.p({
          percent: currentDeviceInfo.value.percent,
          ["show-info"]: true
        }),
        l: common_vendor.o(submit),
        m: common_vendor.p({
          color: "#fff",
          text: "去充值",
          background: "#1296db",
          height: "80rpx"
        }),
        n: common_vendor.p({
          name: "close",
          size: 40
        }),
        o: common_vendor.o(closePopup),
        p: common_vendor.f(radioItems.value, (item = null, index = null, i0 = null) => {
          return {
            a: common_vendor.t(item.deviceTitle),
            b: "2f171216-9-" + i0 + "," + ("2f171216-8-" + i0),
            c: common_vendor.p({
              checked: item.checked,
              value: item.iccid
            }),
            d: "2f171216-8-" + i0 + "," + ("2f171216-7-" + i0),
            e: index,
            f: "2f171216-7-" + i0 + ",2f171216-6"
          };
        }),
        q: common_vendor.o(getValue),
        r: common_vendor.o(closePopup),
        s: common_vendor.p({
          visible: isShow.value
        }),
        t: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f171216"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/rechargeDataTraffic/rechargeDataTraffic.js.map
