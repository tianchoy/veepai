"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uni_modules_limeDayuts_common_index = require("../../uni_modules/lime-dayuts/common/index.js");
require("../../uni_modules/lime-dayuts/common/use.js");
require("../../uni_modules/lime-dayuts/utssdk/interface.js");
if (!Array) {
  const _easycom_l_date_strip_1 = common_vendor.resolveComponent("l-date-strip");
  const _easycom_l_daily_punch_1 = common_vendor.resolveComponent("l-daily-punch");
  const _easycom_fui_bottom_popup_1 = common_vendor.resolveComponent("fui-bottom-popup");
  (_easycom_l_date_strip_1 + _easycom_l_daily_punch_1 + _easycom_fui_bottom_popup_1)();
}
const _easycom_l_date_strip = () => "../../uni_modules/lime-date-strip/components/l-date-strip/l-date-strip.js";
const _easycom_l_daily_punch = () => "../../uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.js";
const _easycom_fui_bottom_popup = () => "../../uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js";
if (!Math) {
  (_easycom_l_date_strip + _easycom_l_daily_punch + _easycom_fui_bottom_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "message",
  setup(__props) {
    const checkIns = common_vendor.ref(["2025-07-07", "2025-07-08", "2025-07-09"]);
    const today = common_vendor.ref(uni_modules_limeDayuts_common_index.dayuts().format("MM-DD"));
    const showCalendar = common_vendor.ref(false);
    const activeTab = common_vendor.ref(0);
    const minDate = new Date(2022, 0, 10).getTime();
    const maxDate = new Date(2025, 7, 12).getTime();
    const customFormat = (day) => {
      const date = day.date;
      date.getFullYear();
      date.getMonth() + 1;
      const curDate = date.getDate();
      day.prefix = "";
      const map = /* @__PURE__ */ new Map([
        [1, "初一"],
        [2, "初二"],
        [3, "初三"],
        [14, "情人节"],
        [15, "元宵节"]
      ]);
      if (map.has(curDate)) {
        day.suffix = "true";
      }
      return day;
    };
    class SecurityEvent {
      constructor(id, type, time, location) {
        this.id = id;
        this.type = type;
        this.time = time;
        this.location = location;
      }
    }
    const tabs = common_vendor.ref([
      { label: "全部类型", type: "all" },
      { label: "人形侦测", type: "human" },
      { label: "移动侦测", type: "motion" }
    ]);
    const events = common_vendor.ref([
      new SecurityEvent(1, "human", "15:29", "前门走廊"),
      new SecurityEvent(2, "motion", "14:45", "车库入口"),
      new SecurityEvent(3, "human", "13:20", "后花园"),
      new SecurityEvent(4, "motion", "11:05", "侧门通道")
    ]);
    const getFilteredEvents = () => {
      if (activeTab.value == 0)
        return [...events.value];
      const selectedType = tabs.value[activeTab.value].type;
      return events.value.filter((event) => {
        return event.type === selectedType;
      });
    };
    const changeTab = (index) => {
      activeTab.value = index;
    };
    const select = (day) => {
      today.value = uni_modules_limeDayuts_common_index.dayuts(day.fullDate).format("MM-DD");
      common_vendor.index.__f__("log", "at pages/message/message.uvue:139", today.value);
      if (day.isToday) {
        common_vendor.index.__f__("log", "at pages/message/message.uvue:141", "今天");
      }
      showCalendar.value = false;
    };
    const msgDetail = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/message/messageDetail/messageDetail?id=" + e.id
      });
    };
    const change = (res) => {
      common_vendor.index.__f__("log", "at pages/message/message.uvue:153", "res", res);
    };
    const ShowCalendar = () => {
      showCalendar.value = !showCalendar.value;
    };
    const hideCalendar = () => {
      showCalendar.value = false;
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          format: customFormat,
          minDate: common_vendor.unref(minDate),
          maxDate: common_vendor.unref(maxDate),
          height: "70",
          shape: "circle"
        }),
        b: common_vendor.o(ShowCalendar),
        c: common_assets._imports_0,
        d: common_vendor.t(today.value),
        e: common_assets._imports_0,
        f: common_vendor.f(tabs.value, (tab = null, index = null, i0 = null) => {
          return {
            a: common_vendor.t(tab.label),
            b: index,
            c: activeTab.value === index ? 1 : "",
            d: common_vendor.o(($event = null) => {
              return changeTab(index);
            }, index)
          };
        }),
        g: common_vendor.f(getFilteredEvents(), (event = null, index = null, i0 = null) => {
          return {
            a: event.type === "human" ? "/static/people.png" : "/static/mobile.png",
            b: common_vendor.t(event.type === "human" ? "人形侦测" : "移动侦测"),
            c: common_vendor.t(event.time),
            d: index,
            e: common_vendor.o(($event = null) => {
              return msgDetail(event);
            }, index)
          };
        }),
        h: common_assets._imports_1,
        i: common_vendor.o(select),
        j: common_vendor.o(change),
        k: common_vendor.p({
          signedDates: checkIns.value,
          dayHeight: 60
        }),
        l: common_vendor.o(hideCalendar),
        m: common_vendor.o(hideCalendar),
        n: common_vendor.p({
          visible: showCalendar.value
        }),
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e403ad2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
