"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeDateStrip_components_lDateStrip_utils = require("./utils.js");
const uni_modules_limeShared_unitConvert_index = require("../../../lime-shared/unitConvert/index.js");
if (!Array) {
  const _easycom_l_date_strip_item_1 = common_vendor.resolveComponent("l-date-strip-item");
  _easycom_l_date_strip_item_1();
}
const _easycom_l_date_strip_item = () => "../l-date-strip-item/l-date-strip-item.js";
if (!Math) {
  _easycom_l_date_strip_item();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-date-strip",
  props: {
    firstDayOfWeek: new UTSJSONObject({ default: 1 }),
    format: new UTSJSONObject({}),
    maxDate: new UTSJSONObject({}),
    minDate: new UTSJSONObject({}),
    value: new UTSJSONObject({}),
    defaultValue: new UTSJSONObject({}),
    modelValue: new UTSJSONObject({}),
    height: new UTSJSONObject({}),
    gridWidth: new UTSJSONObject({}),
    color: new UTSJSONObject({}),
    activeBgColor: new UTSJSONObject({}),
    activeColor: new UTSJSONObject({}),
    bgColor: new UTSJSONObject({}),
    radius: new UTSJSONObject({}),
    switchMode: new UTSJSONObject({ default: "week" }),
    shape: new UTSJSONObject({ default: "square" }),
    showNavigation: new UTSJSONObject({ type: Boolean }),
    weekdays: new UTSJSONObject({ default: ["日", "一", "二", "三", "四", "五", "六"] })
  },
  emits: ["change", "select", "scroll", "panelChange", "update:modelValue"],
  setup(__props, _a) {
    var __expose = _a.expose, __emit = _a.emit;
    const emit = __emit;
    const props = __props;
    const currentWeekIndex = common_vendor.ref(0);
    const scrollLeft = common_vendor.ref(0);
    const swiperCircular = common_vendor.ref(true);
    const selectedDate = common_vendor.ref(null);
    const firstDayOfWeek = common_vendor.computed(() => {
      return Math.min(Math.max(props.firstDayOfWeek, 0), 6);
    });
    const today = /* @__PURE__ */ new Date();
    const minDate = common_vendor.computed(() => {
      return props.minDate != null ? new Date(props.minDate) : today;
    });
    const maxDate = common_vendor.computed(() => {
      return props.maxDate != null ? new Date(props.maxDate) : uni_modules_limeDateStrip_components_lDateStrip_utils.addDays(today, 31);
    });
    const days = common_vendor.computed(() => {
      return uni_modules_limeDateStrip_components_lDateStrip_utils.daysBetween(maxDate.value, minDate.value);
    });
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (props.height != null) {
        style.set("height", props.height);
      }
      if (props.bgColor != null) {
        style.set("background", props.bgColor);
      }
      return style;
    });
    const cache = /* @__PURE__ */ new Map();
    const createWeek = (currentStartDate, length) => {
      const dates = [];
      const time = currentStartDate.getTime();
      if (cache.has(time)) {
        return UTS.mapGet(cache, time);
      }
      for (let i = 0; i < length; i++) {
        const date = new Date(time);
        date.setDate(currentStartDate.getDate() + i);
        const week = date.getDay();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateObj = {
          key: `${year}-${month}-${day}`,
          date,
          year,
          month,
          day,
          text: `${day}`.padStart(2, "0"),
          type: uni_modules_limeDateStrip_components_lDateStrip_utils.calcType(date, minDate.value, maxDate.value, selectedDate.value),
          prefix: props.weekdays[week]
        };
        dates.push(props.format != null ? props.format(dateObj) : dateObj);
      }
      const obj = {
        start: new Date(dates[0].year, dates[0].month - 1, dates[0].day).getTime(),
        end: new Date(dates[length - 1].year, dates[length - 1].month - 1, dates[length - 1].day).getTime(),
        dates
      };
      return obj;
    };
    const currentDate = common_vendor.ref(today);
    const displayWeeks = common_vendor.computed(() => {
      const weeks = [];
      if (props.switchMode == "week") {
        const currentRange = uni_modules_limeDateStrip_components_lDateStrip_utils.getWeekRange(currentDate.value, firstDayOfWeek.value);
        const offsetMap = /* @__PURE__ */ new Map([
          [0, [0, 1, -1]],
          [1, [-1, 0, 1]],
          [2, [1, -1, 0]]
        ]);
        let indices = UTS.mapGet(offsetMap, currentWeekIndex.value);
        indices.forEach((i) => {
          const weekDate = uni_modules_limeDateStrip_components_lDateStrip_utils.addWeeks(currentRange.start, i);
          weeks.push(createWeek(weekDate, 7));
        });
      } else {
        weeks.push(createWeek(minDate.value, days.value));
      }
      return weeks;
    });
    const swiperChange = (event) => {
      const delta = event.detail.current - currentWeekIndex.value;
      const newDate = uni_modules_limeDateStrip_components_lDateStrip_utils.addWeeks(currentDate.value, delta == 1 || delta == -2 ? 1 : -1);
      currentDate.value = newDate;
      currentWeekIndex.value = event.detail.current;
    };
    const swiperFinish = (_event) => {
    };
    const onClick = (day) => {
      if (day.type == "disabled")
        return null;
      selectedDate.value = day.date;
      const v = day.date.getTime();
      emit("change", v);
      emit("select", v);
      emit("update:modelValue", v);
    };
    const scrollToDate = (date) => {
      var _a2;
      currentDate.value = date;
      if (props.switchMode != "none")
        return null;
      scrollLeft.value = uni_modules_limeShared_unitConvert_index.unitConvert((_a2 = props.gridWidth) !== null && _a2 !== void 0 ? _a2 : 50) * uni_modules_limeDateStrip_components_lDateStrip_utils.daysBetween(date, minDate.value);
    };
    common_vendor.watchEffect(() => {
      var _a2;
      const value = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : props.modelValue;
      if (value == null)
        return null;
      selectedDate.value = new Date(value);
    });
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        scrollToDate(currentDate.value);
      });
    });
    __expose(new UTSJSONObject({
      scrollToDate
    }));
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: _ctx.switchMode == "none"
      }), _ctx.switchMode == "none" ? new UTSJSONObject({
        b: common_vendor.o(onClick),
        c: common_vendor.p(new UTSJSONObject({
          dates: common_vendor.unref(displayWeeks)[0].dates,
          color: _ctx.color,
          activeBgColor: _ctx.activeBgColor,
          activeColor: _ctx.activeColor,
          bgColor: _ctx.bgColor,
          radius: _ctx.radius,
          switchMode: _ctx.switchMode,
          shape: _ctx.shape
        })),
        d: common_vendor.unref(scrollLeft),
        e: common_vendor.s(common_vendor.unref(styles))
      }) : new UTSJSONObject({
        f: common_vendor.f(common_vendor.unref(displayWeeks), (week = null, g = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.o(onClick, g),
            b: "7a3fbcce-1-" + i0,
            c: common_vendor.p(new UTSJSONObject({
              dates: week.dates,
              color: _ctx.color,
              activeBgColor: _ctx.activeBgColor,
              activeColor: _ctx.activeColor,
              bgColor: _ctx.bgColor,
              radius: _ctx.radius,
              switchMode: _ctx.switchMode,
              shape: _ctx.shape
            })),
            d: g
          });
        }),
        g: common_vendor.s(common_vendor.unref(styles)),
        h: common_vendor.unref(currentWeekIndex),
        i: common_vendor.unref(swiperCircular),
        j: common_vendor.o(swiperFinish),
        k: common_vendor.o(swiperChange)
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-date-strip/components/l-date-strip/l-date-strip.js.map
