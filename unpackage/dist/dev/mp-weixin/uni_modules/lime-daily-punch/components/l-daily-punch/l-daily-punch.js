"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeDailyPunch_components_lDailyPunch_calender = require("./calender.js");
const uni_modules_limeShared_unitConvert_index = require("../../../lime-shared/unitConvert/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-daily-punch",
  props: {
    canSupplement: new UTSJSONObject({
      type: Boolean,
      default: true
    }),
    isFullCalendar: new UTSJSONObject({
      type: Boolean,
      default: true
    }),
    yearMonth: new UTSJSONObject({
      type: String,
      default: () => {
        const date = /* @__PURE__ */ new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${year}-${month}`;
      }
    }),
    signedDates: new UTSJSONObject({
      type: Array,
      default: () => {
        return [];
      },
      validator: (value) => {
        return value.every((date) => {
          return /^\d{4}-\d{2}-\d{2}$/.test(date);
        });
      }
    }),
    dayHeight: new UTSJSONObject({
      type: [String, Number],
      default: 76
    }),
    week: new UTSJSONObject({
      type: Array,
      default: () => {
        return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      }
    }),
    weekStartsOn: new UTSJSONObject({
      type: Number,
      default: 6,
      validator: (value) => {
        return value <= 6;
      }
    }),
    weekColor: new UTSJSONObject({
      type: String,
      default: "#BDC0C3"
    }),
    weekFontSize: new UTSJSONObject({
      type: Number,
      default: 14
    }),
    weekHeight: new UTSJSONObject({
      type: Number,
      default: 30
    }),
    selectedDayBgColor: new UTSJSONObject({
      type: String,
      default: "rgba(0,0,0,0.06)"
    }),
    dayFontSize: new UTSJSONObject({
      type: Number,
      default: 16
    }),
    textColor: new UTSJSONObject({
      type: String,
      default: "#1A1F24"
    }),
    disabledColor: new UTSJSONObject({
      type: String,
      default: "#BDC0C3"
    }),
    monthTitleHeight: new UTSJSONObject({
      type: Number,
      default: 50
    }),
    monthTitleFontSize: new UTSJSONObject({
      type: Number,
      default: 20
    }),
    color: new UTSJSONObject({
      type: String,
      default: "#3B87F6"
    }),
    unsignedColor: new UTSJSONObject({
      type: String,
      default: "#F1A33A"
    })
  },
  emits: ["select", "panelChange", "streak"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const emits = __emit;
    const props = __props;
    common_vendor.ref(null);
    let calender = null;
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      style.set("height", `${6 * uni_modules_limeShared_unitConvert_index.unitConvert(props.dayHeight) + props.weekHeight + props.monthTitleHeight}px`);
      return style;
    });
    const onClick = (e) => {
      calender === null || calender === void 0 ? null : calender.touch(e);
    };
    const setOpt = () => {
      const opt = {
        canSupplement: props.canSupplement,
        isFullCalendar: props.isFullCalendar,
        yearMonth: props.yearMonth,
        signedDates: [...props.signedDates],
        dayHeight: uni_modules_limeShared_unitConvert_index.unitConvert(props.dayHeight),
        week: props.week,
        weekStartsOn: props.weekStartsOn,
        weekColor: props.weekColor,
        weekFontSize: props.weekFontSize,
        weekHeight: props.weekHeight,
        selectedDayBgColor: props.selectedDayBgColor,
        dayFontSize: props.dayFontSize,
        textColor: props.textColor,
        disabledColor: props.disabledColor,
        monthTitleHeight: props.monthTitleHeight,
        monthTitleFontSize: props.monthTitleFontSize,
        color: props.color,
        unsignedColor: props.unsignedColor,
        select: (e) => {
          emits("select", e);
        },
        panelChange: (e) => {
          emits("panelChange", e);
        }
      };
      if (calender == null)
        return null;
      calender.setOptions(opt);
    };
    common_vendor.watchEffect(() => {
      setOpt();
      if (calender == null)
        return null;
      calender.render();
      emits("streak", calender.checkinDays);
    });
    const instance = common_vendor.getCurrentInstance().proxy;
    common_vendor.index.createCanvasContextAsync({
      id: "l-daily-punch",
      component: instance,
      success: (context) => {
        const canvasContext = context.getContext("2d");
        const canvas = canvasContext.canvas;
        calender = new uni_modules_limeDailyPunch_components_lDailyPunch_calender.Calendar();
        setOpt();
        calender.setCanvas(canvas);
        calender.render();
        emits("streak", calender.checkinDays);
      }
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei("l-daily-punch", "canvas", "dailyRef"),
        b: common_vendor.s(common_vendor.unref(styles)),
        c: common_vendor.o(onClick),
        d: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.js.map
