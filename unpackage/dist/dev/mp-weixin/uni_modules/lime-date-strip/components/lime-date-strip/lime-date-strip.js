"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_l_date_strip_1 = common_vendor.resolveComponent("l-date-strip");
  _easycom_l_date_strip_1();
}
const _easycom_l_date_strip = () => "../l-date-strip/l-date-strip.js";
if (!Math) {
  _easycom_l_date_strip();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "lime-date-strip",
  setup(__props) {
    const minDate = new Date(2022, 0, 10).getTime();
    const maxDate = new Date(2027, 10, 27).getTime();
    const customFormat = (day) => {
      const date = day.date;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const curDate = date.getDate();
      day.suffix = "¥60";
      if (year == 2025) {
        if (month == 2) {
          const map = /* @__PURE__ */ new Map([
            [1, "初一"],
            [2, "初二"],
            [3, "初三"],
            [14, "情人节"],
            [15, "元宵节"]
          ]);
          if (map.has(curDate)) {
            day.prefix = UTS.mapGet(map, curDate);
            day.suffix = "¥100";
          }
        }
      }
      return day;
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          shape: "none"
        }),
        b: common_vendor.p({
          bgColor: "yellow",
          activeBgColor: "#000"
        }),
        c: common_vendor.p({
          minDate: common_vendor.unref(minDate),
          maxDate: common_vendor.unref(maxDate)
        }),
        d: common_vendor.p({
          format: customFormat
        }),
        e: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-date-strip/components/lime-date-strip/lime-date-strip.js.map
