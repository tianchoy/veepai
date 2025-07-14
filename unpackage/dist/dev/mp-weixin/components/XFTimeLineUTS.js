"use strict";
const common_vendor = require("../common/vendor.js");
const DAY_MS = 24 * 60 * 60 * 1e3;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "XFTimeLineUTS",
  props: {
    events: {},
    startDate: {},
    endDate: {},
    zoomLevel: {},
    showCurrentTime: { type: Boolean },
    defaultColor: {}
  },
  emits: ["event-click"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const props = __props;
    const _b = props.startDate, startDate = _b == void 0 ? new Date(Date.now() - 30 * DAY_MS) : _b, _c = props.endDate, endDate = _c == void 0 ? new Date(Date.now() + 30 * DAY_MS) : _c, _d = props.zoomLevel, zoomLevel = _d == void 0 ? 2 : _d, _g = props.showCurrentTime, showCurrentTime = _g == void 0 ? true : _g, _h = props.defaultColor, defaultColor = _h == void 0 ? "#4285f4" : _h;
    const emit = __emit;
    const currentZoom = common_vendor.ref(zoomLevel);
    const scrollLeft = common_vendor.ref(0);
    const viewportWidth = common_vendor.ref(375);
    const pxPerDay = common_vendor.ref(30);
    const now = common_vendor.ref(Date.now());
    const contentHeight = common_vendor.ref(800);
    const scaleContainer = common_vendor.ref(null);
    const contentContainer = common_vendor.ref(null);
    const totalWidth = common_vendor.computed(() => {
      const days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / DAY_MS;
      return Math.ceil(days * pxPerDay.value);
    });
    const visibleStart = common_vendor.computed(() => {
      const daysFromStart = scrollLeft.value / pxPerDay.value;
      const date = new Date(new Date(startDate).getTime() + daysFromStart * DAY_MS);
      return formatDate(date, "M月D日");
    });
    const visibleEnd = common_vendor.computed(() => {
      const daysFromStart = (scrollLeft.value + viewportWidth.value) / pxPerDay.value;
      const date = new Date(new Date(startDate).getTime() + daysFromStart * DAY_MS);
      return formatDate(date, "M月D日");
    });
    const visibleScales = common_vendor.computed(() => {
      const scales = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      let current = new Date(start);
      const format = getScaleFormat();
      const interval = getScaleInterval();
      while (current.getTime() <= end.getTime()) {
        const days = (current.getTime() - start.getTime()) / DAY_MS;
        scales.push({
          position: days * pxPerDay.value,
          label: formatDate(current, format),
          time: new Date(current)
        });
        switch (currentZoom.value) {
          case 1:
            current.setDate(current.getDate() + interval);
            break;
          case 2:
            current.setDate(current.getDate() + 7 * interval);
            break;
          case 3:
            current.setMonth(current.getMonth() + interval);
            break;
          case 4:
            current.setFullYear(current.getFullYear() + interval);
            break;
        }
      }
      return scales;
    });
    const visibleEvents = common_vendor.computed(() => {
      return props.events.map((event) => {
        const eventDate = new Date(event.time);
        const days = (eventDate.getTime() - new Date(startDate).getTime()) / DAY_MS;
        return new UTSJSONObject(Object.assign(Object.assign({}, event), { position: days * pxPerDay.value }));
      });
    });
    const currentTimePos = common_vendor.computed(() => {
      const days = (now.value - new Date(startDate).getTime()) / DAY_MS;
      return days * pxPerDay.value;
    });
    const updateViewportWidth = () => {
      common_vendor.index.getSystemInfo(new UTSJSONObject({
        success: (res) => {
          viewportWidth.value = res.windowWidth;
        }
      }));
    };
    const updateCurrentTime = () => {
      now.value = Date.now();
    };
    const getScaleFormat = () => {
      switch (currentZoom.value) {
        case 1:
          return "D日";
        case 2:
          return "M月D日";
        case 3:
          return "M月";
        case 4:
          return "YYYY年";
        default:
          return "M月D日";
      }
    };
    const getScaleInterval = () => {
      switch (currentZoom.value) {
        case 1:
          return 1;
        case 2:
          return 1;
        case 3:
          return 1;
        case 4:
          return 1;
        default:
          return 1;
      }
    };
    const formatDate = (date, format) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return format.replace("YYYY", year.toString()).replace("MM", month.toString().padStart(2, "0")).replace("M", month.toString()).replace("DD", day.toString().padStart(2, "0")).replace("D", day.toString());
    };
    const formatTime = (time) => {
      return formatDate(new Date(time), "YYYY年MM月DD日");
    };
    const getEventStyle = (event) => {
      return {
        left: `${event.position}px`,
        top: `${event.top || 0}px`
      };
    };
    const zoomIn = () => {
      if (currentZoom.value > 1) {
        currentZoom.value--;
        adjustZoom();
      }
    };
    const zoomOut = () => {
      if (currentZoom.value < 4) {
        currentZoom.value++;
        adjustZoom();
      }
    };
    const adjustZoom = () => {
      switch (currentZoom.value) {
        case 1:
          pxPerDay.value = 60;
          break;
        case 2:
          pxPerDay.value = 30;
          break;
        case 3:
          pxPerDay.value = 10;
          break;
        case 4:
          pxPerDay.value = 2;
          break;
      }
      const centerDate = new Date(new Date(startDate).getTime() + (scrollLeft.value + viewportWidth.value / 2) / pxPerDay.value * DAY_MS);
      common_vendor.nextTick$1(() => {
        const newDays = (centerDate.getTime() - new Date(startDate).getTime()) / DAY_MS;
        scrollLeft.value = newDays * pxPerDay.value - viewportWidth.value / 2;
      });
    };
    const goToToday = () => {
      const days = (Date.now() - new Date(startDate).getTime()) / DAY_MS;
      scrollLeft.value = days * pxPerDay.value - viewportWidth.value / 2;
    };
    const handleScaleScroll = (e = null) => {
      scrollLeft.value = e.detail.scrollLeft;
      if (contentContainer.value) {
        contentContainer.value.scrollLeft = e.detail.scrollLeft;
      }
    };
    const handleContentScroll = (e = null) => {
      scrollLeft.value = e.detail.scrollLeft;
      if (scaleContainer.value) {
        scaleContainer.value.scrollLeft = e.detail.scrollLeft;
      }
    };
    const handleEventClick = (event) => {
      emit("event-click", event);
    };
    common_vendor.onMounted(() => {
      updateViewportWidth();
      updateCurrentTime();
      const timer = setInterval(() => {
        now.value = Date.now();
      }, 6e4);
      common_vendor.onUnmounted(() => {
        clearInterval(timer);
      });
    });
    common_vendor.watch(() => {
      return props.zoomLevel;
    }, (newVal = null) => {
      currentZoom.value = newVal;
      adjustZoom();
    });
    common_vendor.watch(() => {
      return props.events;
    }, () => {
      contentHeight.value = Math.max(800, props.events.length * 100);
    }, { deep: true });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.o(zoomIn),
        b: common_vendor.o(zoomOut),
        c: common_vendor.o(goToToday),
        d: common_vendor.t(visibleStart.value),
        e: common_vendor.t(visibleEnd.value),
        f: common_vendor.f(visibleScales.value, (scale = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.t(scale.label),
            b: index,
            c: scale.position + "px"
          });
        }),
        g: totalWidth.value + "px",
        h: scrollLeft.value,
        i: common_vendor.o(handleScaleScroll),
        j: common_vendor.f(visibleEvents.value, (event = null, index = null, i0 = null) => {
          return common_vendor.e(new UTSJSONObject({
            a: event.color || common_vendor.unref(defaultColor),
            b: common_vendor.t(event.title),
            c: common_vendor.t(formatTime(event.time)),
            d: event.desc
          }), event.desc ? new UTSJSONObject({
            e: common_vendor.t(event.desc)
          }) : new UTSJSONObject({}), new UTSJSONObject({
            f: event.id || index,
            g: common_vendor.s(getEventStyle(event)),
            h: common_vendor.o(($event = null) => {
              return handleEventClick(event);
            }, event.id || index)
          }));
        }),
        k: common_vendor.unref(showCurrentTime)
      }), common_vendor.unref(showCurrentTime) ? new UTSJSONObject({
        l: currentTimePos.value + "px"
      }) : new UTSJSONObject({}), new UTSJSONObject({
        m: totalWidth.value + "px",
        n: contentHeight.value + "px",
        o: scrollLeft.value,
        p: common_vendor.o(handleContentScroll),
        q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0c4aca5c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/XFTimeLineUTS.js.map
