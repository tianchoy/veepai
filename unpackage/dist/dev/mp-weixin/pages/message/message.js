"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uni_modules_limeDayuts_common_index = require("../../uni_modules/lime-dayuts/common/index.js");
require("../../uni_modules/lime-dayuts/common/use.js");
require("../../uni_modules/lime-dayuts/utssdk/interface.js");
if (!Array) {
  const _easycom_l_date_strip_1 = common_vendor.resolveComponent("l-date-strip");
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_l_daily_punch_1 = common_vendor.resolveComponent("l-daily-punch");
  const _easycom_fui_bottom_popup_1 = common_vendor.resolveComponent("fui-bottom-popup");
  const _easycom_fui_icon_1 = common_vendor.resolveComponent("fui-icon");
  const _easycom_fui_radio_1 = common_vendor.resolveComponent("fui-radio");
  const _easycom_fui_list_cell_1 = common_vendor.resolveComponent("fui-list-cell");
  const _easycom_fui_label_1 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_radio_group_1 = common_vendor.resolveComponent("fui-radio-group");
  (_easycom_l_date_strip_1 + _easycom_l_icon_1 + _easycom_l_daily_punch_1 + _easycom_fui_bottom_popup_1 + _easycom_fui_icon_1 + _easycom_fui_radio_1 + _easycom_fui_list_cell_1 + _easycom_fui_label_1 + _easycom_fui_radio_group_1)();
}
const _easycom_l_date_strip = () => "../../uni_modules/lime-date-strip/components/l-date-strip/l-date-strip.js";
const _easycom_l_icon = () => "../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_l_daily_punch = () => "../../uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.js";
const _easycom_fui_bottom_popup = () => "../../uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js";
const _easycom_fui_icon = () => "../../uni_modules/firstui-unix/components/fui-icon/fui-icon.js";
const _easycom_fui_radio = () => "../../uni_modules/firstui-unix/components/fui-radio/fui-radio.js";
const _easycom_fui_list_cell = () => "../../uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.js";
const _easycom_fui_label = () => "../../uni_modules/firstui-unix/components/fui-label/fui-label.js";
const _easycom_fui_radio_group = () => "../../uni_modules/firstui-unix/components/fui-radio-group/fui-radio-group.js";
if (!Math) {
  (_easycom_l_date_strip + _easycom_l_icon + _easycom_l_daily_punch + _easycom_fui_bottom_popup + _easycom_fui_icon + _easycom_fui_radio + _easycom_fui_list_cell + _easycom_fui_label + _easycom_fui_radio_group)();
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "message",
  setup(__props) {
    const checkIns = common_vendor.ref(["2025-07-07", "2025-07-08", "2025-07-09"]);
    const today = common_vendor.ref(uni_modules_limeDayuts_common_index.dayuts().format("MM-DD"));
    const showCalendar = common_vendor.ref(false);
    const isShowMoreDevice = common_vendor.ref(false);
    const currentDay = common_vendor.ref((/* @__PURE__ */ new Date()).getTime());
    common_vendor.ref(0);
    const minDate = new Date(2022, 0, 10).getTime();
    new Date(2025, 7, 12).getTime();
    const customFormat = (day) => {
      const date = day.date;
      date.getFullYear();
      date.getMonth() + 1;
      const curDate = date.getDate();
      common_vendor.index.__f__("log", "at pages/message/message.uvue:130", day.key);
      day.prefix = "";
      const specialDates = /* @__PURE__ */ new Set([7, 8, 10]);
      if (specialDates.has(curDate)) {
        day.suffix = "true";
      }
      return day;
    };
    const onChange = (time) => {
      common_vendor.index.__f__("log", "at pages/message/message.uvue:144", time);
    };
    const select = (day) => {
      today.value = uni_modules_limeDayuts_common_index.dayuts(day.fullDate).format("YYYY-MM-DD");
      common_vendor.index.__f__("log", "at pages/message/message.uvue:151", today.value);
      currentDay.value = new Date(today.value).getTime();
      showCalendar.value = false;
    };
    const change = (res) => {
      common_vendor.index.__f__("log", "at pages/message/message.uvue:156", "res", res);
    };
    const ShowCalendar = () => {
      showCalendar.value = !showCalendar.value;
    };
    const hideCalendar = () => {
      showCalendar.value = false;
    };
    const showMoreDevice = () => {
      isShowMoreDevice.value = true;
    };
    const closePopup = () => {
      isShowMoreDevice.value = false;
    };
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
        common_vendor.index.__f__("log", "at pages/message/message.uvue:222", selectedItem);
        selectedItem.checked = true;
        currentDeviceInfo.value = selectedItem;
      }
    };
    const currentInfo = () => {
      radioItems.value.forEach((item) => {
        item.checked = false;
      });
      radioItems.value[0].checked = true;
      currentDeviceInfo.value = radioItems.value[0];
    };
    common_vendor.onMounted(() => {
      currentInfo();
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(onChange),
        b: common_vendor.p({
          format: customFormat,
          switchMode: "week",
          value: currentDay.value,
          minDate: common_vendor.unref(minDate),
          height: "95rpx",
          shape: "square"
        }),
        c: common_vendor.o(ShowCalendar),
        d: common_assets._imports_0,
        e: common_assets._imports_0,
        f: common_vendor.o(showMoreDevice),
        g: common_assets._imports_1,
        h: common_vendor.p({
          name: "chevron-right",
          size: "20"
        }),
        i: common_assets._imports_1$1,
        j: common_assets._imports_3,
        k: common_vendor.p({
          name: "chevron-right",
          size: "20"
        }),
        l: common_assets._imports_1$1,
        m: common_assets._imports_4,
        n: common_vendor.o(select),
        o: common_vendor.o(change),
        p: common_vendor.p({
          signedDates: checkIns.value,
          dayHeight: 60
        }),
        q: common_vendor.o(hideCalendar),
        r: common_vendor.o(hideCalendar),
        s: common_vendor.p({
          visible: showCalendar.value
        }),
        t: common_vendor.p({
          name: "close",
          size: 40
        }),
        v: common_vendor.o(closePopup),
        w: common_vendor.f(radioItems.value, (item = null, index = null, i0 = null) => {
          return {
            a: common_vendor.t(item.deviceTitle),
            b: "0e403ad2-10-" + i0 + "," + ("0e403ad2-9-" + i0),
            c: common_vendor.p({
              checked: item.checked,
              value: item.iccid
            }),
            d: "0e403ad2-9-" + i0 + "," + ("0e403ad2-8-" + i0),
            e: index,
            f: "0e403ad2-8-" + i0 + ",0e403ad2-7"
          };
        }),
        x: common_vendor.o(getValue),
        y: common_vendor.o(closePopup),
        z: common_vendor.p({
          visible: isShowMoreDevice.value
        }),
        A: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e403ad2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
