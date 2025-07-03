"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_limeDayuts_common_index = require("../../uni_modules/lime-dayuts/common/index.js");
require("../../uni_modules/lime-dayuts/common/use.js");
require("../../uni_modules/lime-dayuts/utssdk/interface.js");
if (!Array) {
  const _easycom_l_daily_punch_1 = common_vendor.resolveComponent("l-daily-punch");
  _easycom_l_daily_punch_1();
}
const _easycom_l_daily_punch = () => "../../uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.js";
if (!Math) {
  _easycom_l_daily_punch();
}
const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "message",
  setup(__props) {
    const today = common_vendor.ref(uni_modules_limeDayuts_common_index.dayuts().format("MM-DD"));
    const checkIns = common_vendor.ref(["2025-06-09", "2025-07-01", "2025-07-02"]);
    const showCalendar = common_vendor.ref(false);
    const select = (day) => {
      today.value = uni_modules_limeDayuts_common_index.dayuts(day.fullDate).format("MM-DD");
      if (day.isToday) {
        common_vendor.index.__f__("log", "at pages/message/message.uvue:30", "今天");
      }
      showCalendar.value = false;
    };
    const change = (res) => {
      common_vendor.index.__f__("log", "at pages/message/message.uvue:36", "res", res);
    };
    const ShowCalendar = () => {
      showCalendar.value = !showCalendar.value;
    };
    const hideCalendar = () => {
      showCalendar.value = false;
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: videoSrc,
        b: common_vendor.t(today.value),
        c: common_vendor.o(ShowCalendar),
        d: showCalendar.value
      }), showCalendar.value ? new UTSJSONObject({
        e: common_vendor.o(select),
        f: common_vendor.o(change),
        g: common_vendor.p(new UTSJSONObject({
          signedDates: checkIns.value,
          dayHeight: 60
        })),
        h: common_vendor.o(hideCalendar)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e403ad2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
