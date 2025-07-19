"use strict";
const common_vendor = require("../../common/vendor.js");
class TimeMark extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          time: { type: Number, optional: false },
          position: { type: Number, optional: false },
          type: { type: String, optional: false }
        };
      },
      name: "TimeMark"
    };
  }
  constructor(options, metadata = TimeMark.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.time = this.__props__.time;
    this.position = this.__props__.position;
    this.type = this.__props__.type;
    delete this.__props__;
  }
}
class TimeScrollDetail extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          scrollLeft: { type: Number, optional: false }
        };
      },
      name: "TimeScrollDetail"
    };
  }
  constructor(options, metadata = TimeScrollDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.scrollLeft = this.__props__.scrollLeft;
    delete this.__props__;
  }
}
class TimeScrollEvent extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          detail: { type: TimeScrollDetail, optional: false }
        };
      },
      name: "TimeScrollEvent"
    };
  }
  constructor(options, metadata = TimeScrollEvent.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.detail = this.__props__.detail;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceReplay",
  setup(__props) {
    const currentDate = common_vendor.ref("2024-10-21");
    const currentTime = common_vendor.ref("00:00:00");
    const activeDate = common_vendor.ref("10-21");
    const activeFilter = common_vendor.ref("all");
    const videoSrc = common_vendor.ref("https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4");
    const videoContext = common_vendor.ref(null);
    const isSeeking = common_vendor.ref(false);
    const timeScrollLeft = common_vendor.ref(0);
    const dateScrollLeft = common_vendor.ref(0);
    const playheadPosition = common_vendor.ref(0);
    const videoDuration = common_vendor.ref(0);
    const lastSyncTime = common_vendor.ref(0);
    const isDragging = common_vendor.ref(false);
    const startX = common_vendor.ref(0);
    const startScrollLeft = common_vendor.ref(0);
    const lastDragTime = common_vendor.ref(0);
    const manualScrollPosition = common_vendor.ref(0);
    const draggedTimeInSeconds = common_vendor.ref(0);
    const dateList = ["10-21", "10-22", "10-23", "10-24", "10-25", "10-26"];
    const filters = [
      new UTSJSONObject({ label: "只看报警", value: "alarm" }),
      new UTSJSONObject({ label: "移动侦测", value: "motion" }),
      new UTSJSONObject({ label: "人形侦测", value: "human" }),
      new UTSJSONObject({ label: "全部", value: "all" })
    ];
    const events = common_vendor.ref([
      { date: "10-21", time: "00:15", type: "alarm" },
      { date: "10-21", time: "00:30", type: "motion" },
      { date: "10-21", time: "01:45", type: "human" },
      { date: "10-21", time: "01:20", type: "alarm" }
    ]);
    const rulerWidth = common_vendor.computed(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      return systemInfo.windowWidth != null ? systemInfo.windowWidth : 375;
    });
    const convertTimeToSeconds = (timeStr) => {
      const parts = timeStr.split(":");
      const h = parseInt(parts[0]);
      const m = parseInt(parts[1]);
      const s = parts.length > 2 ? parseInt(parts[2]) : 0;
      return h * 3600 + m * 60 + s;
    };
    const timeMarks = common_vendor.computed(() => {
      const marks = [];
      const duration = videoDuration.value;
      if (duration === 0)
        return marks;
      let majorInterval;
      if (duration <= 60) {
        majorInterval = 10;
      } else if (duration <= 300) {
        majorInterval = 30;
      } else if (duration <= 1800) {
        majorInterval = 60;
      } else if (duration <= 3600) {
        majorInterval = 300;
      } else if (duration <= 7200) {
        majorInterval = 600;
      } else {
        majorInterval = 1800;
      }
      const minorInterval = majorInterval / 5;
      const pixelsPerSecond = rulerWidth.value / duration;
      for (let time = 0; time <= duration; time += minorInterval) {
        const isMajor = time % majorInterval === 0;
        marks.push(new TimeMark({
          time,
          position: time * pixelsPerSecond,
          type: isMajor ? "major" : "minor"
        }));
      }
      return marks;
    });
    const formatMarkTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor(seconds % 3600 / 60);
      const secs = Math.floor(seconds % 60);
      if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      }
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const hasEventAtTime = (time) => {
      return events.value.some((event) => {
        const eventTime = convertTimeToSeconds(event.time);
        return Math.abs(eventTime - time) < 5;
      });
    };
    const getEventTypeAtTime = (time) => {
      const event = UTS.arrayFind(events.value, (event2) => {
        const eventTime = convertTimeToSeconds(event2.time);
        return Math.abs(eventTime - time) < 5;
      });
      return event != null ? event.type : "";
    };
    common_vendor.computed(() => {
      if (activeFilter.value === "all")
        return events.value;
      return events.value.filter((e) => {
        return e.type === activeFilter.value;
      });
    });
    const onDurationChange = (e) => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:205", e);
    };
    const initVideoContext = () => {
      try {
        videoContext.value = common_vendor.index.createVideoContext("myVideo");
        common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:212", "视频上下文初始化成功", videoContext.value);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/deviceReplay.uvue:214", "创建视频上下文失败:", error);
      }
    };
    const loadVideoData = (date) => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:219", "加载日期数据:", date);
    };
    const selectDate = (date) => {
      activeDate.value = date;
      currentDate.value = `2024-${date}`;
      loadVideoData(date);
      const index = dateList.indexOf(date);
      dateScrollLeft.value = index * 80;
    };
    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor(seconds % 3600 / 60);
      const secs = Math.floor(seconds % 60);
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const updatePlayheadPosition = (currentTimeInSeconds) => {
      const pixelsPerSecond = rulerWidth.value / videoDuration.value;
      playheadPosition.value = currentTimeInSeconds * pixelsPerSecond;
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const scrollViewWidth = systemInfo.windowWidth != null ? systemInfo.windowWidth : 375;
      const halfWidth = scrollViewWidth / 2;
      const targetScrollLeft = playheadPosition.value - halfWidth;
      const maxScrollLeft = rulerWidth.value - scrollViewWidth;
      timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft));
    };
    const onTimeUpdate = (e) => {
      if (isSeeking.value || isDragging.value)
        return null;
      const currentTimeInSeconds = e.detail.currentTime;
      currentTime.value = formatTime(currentTimeInSeconds);
      videoDuration.value = e.detail.duration;
      const now = Date.now();
      if (now - lastSyncTime.value < 200)
        return null;
      lastSyncTime.value = now;
      updatePlayheadPosition(currentTimeInSeconds);
    };
    const seekToSeconds = (timeInSeconds) => {
      isSeeking.value = true;
      manualScrollPosition.value = timeInSeconds * 2;
      if (videoContext.value != null) {
        videoContext.value.seek(timeInSeconds);
      }
      playheadPosition.value = timeInSeconds * 2;
      currentTime.value = formatTime(timeInSeconds);
    };
    const seekToPosition = (seconds) => {
      seekToSeconds(seconds);
    };
    const onSeeked = () => {
      isSeeking.value = false;
    };
    const onTouchStart = (e) => {
      isDragging.value = true;
      startX.value = e.touches[0].pageX;
      startScrollLeft.value = startX.value;
      lastDragTime.value = Date.now();
      isSeeking.value = true;
      if (videoContext.value != null) {
        videoContext.value.pause();
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging.value)
        return null;
      const deltaX = e.touches[0].pageX - startX.value;
      const newScrollLeft = startScrollLeft.value - deltaX;
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const scrollViewWidth = systemInfo.windowWidth != null ? systemInfo.windowWidth : 375;
      const maxScrollLeft = rulerWidth.value - scrollViewWidth;
      timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, newScrollLeft));
      const touchX = e.touches[0].pageX;
      const rulerStartX = touchX - startX.value + startScrollLeft.value;
      const pixelsPerSecond = rulerWidth.value / videoDuration.value;
      const timeInSeconds = rulerStartX / pixelsPerSecond;
      currentTime.value = formatTime(timeInSeconds);
      playheadPosition.value = timeInSeconds * pixelsPerSecond;
      manualScrollPosition.value = timeInSeconds * pixelsPerSecond;
      const now = Date.now();
      if (now - lastDragTime.value > 100) {
        if (videoContext.value != null) {
          common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:338", "尝试跳转视频到:", timeInSeconds, "秒");
          draggedTimeInSeconds.value = timeInSeconds;
          videoContext.value.seek(timeInSeconds);
        }
        lastDragTime.value = now;
      }
    };
    const onTouchEnd = () => {
      if (!isDragging.value)
        return null;
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const scrollViewWidth = systemInfo.windowWidth != null ? systemInfo.windowWidth : 375;
      const pixelsPerSecond = rulerWidth.value / videoDuration.value;
      const timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / pixelsPerSecond;
      if (videoContext.value != null) {
        common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:359", "尝试跳转视频到最终时间:", draggedTimeInSeconds.value, "秒");
        videoContext.value.seek(draggedTimeInSeconds.value);
        videoContext.value.play();
      }
      playheadPosition.value = timeInSeconds * pixelsPerSecond;
      currentTime.value = formatTime(timeInSeconds);
      isDragging.value = false;
      isSeeking.value = false;
    };
    const onTimeScroll = (e) => {
      if (!isDragging.value) {
        timeScrollLeft.value = e.detail.scrollLeft;
      }
    };
    const selectFilter = (filter) => {
      activeFilter.value = filter;
    };
    const onPlay = () => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:425", "视频开始播放");
    };
    const onPause = () => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:430", "视频暂停");
    };
    common_vendor.onMounted(() => {
      initVideoContext();
      if (videoContext.value == null) {
        common_vendor.index.__f__("error", "at pages/index/deviceReplay.uvue:437", "视频上下文初始化失败，请检查");
      }
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.f(dateList, (date = null, index = null, i0 = null) => {
          return {
            a: common_vendor.t(date),
            b: index,
            c: common_vendor.n(activeDate.value === date ? "active" : ""),
            d: common_vendor.o(($event = null) => {
              return selectDate(date);
            }, index)
          };
        }),
        b: dateScrollLeft.value,
        c: common_vendor.sei("myVideo", "video"),
        d: videoSrc.value,
        e: common_vendor.o(onTimeUpdate),
        f: common_vendor.o(onPlay),
        g: common_vendor.o(onPause),
        h: common_vendor.o(onDurationChange),
        i: common_vendor.o(onSeeked),
        j: common_vendor.f(timeMarks.value, (mark = null, index = null, i0 = null) => {
          return common_vendor.e({
            a: mark.type === "major"
          }, mark.type === "major" ? {
            b: common_vendor.t(formatMarkTime(mark.time))
          } : {}, {
            c: hasEventAtTime(mark.time)
          }, hasEventAtTime(mark.time) ? {
            d: common_vendor.n(getEventTypeAtTime(mark.time))
          } : {}, {
            e: "mark-" + index,
            f: common_vendor.n(mark.type),
            g: mark.position + "px",
            h: common_vendor.o(($event = null) => {
              return seekToPosition(mark.time);
            }, "mark-" + index)
          });
        }),
        k: playheadPosition.value + "px",
        l: rulerWidth.value + "px",
        m: common_vendor.o(onTouchStart),
        n: common_vendor.o(onTouchMove),
        o: common_vendor.o(onTouchEnd),
        p: timeScrollLeft.value,
        q: common_vendor.o(onTimeScroll),
        r: common_vendor.f(filters, (filter = null, k0 = null, i0 = null) => {
          return {
            a: common_vendor.t(filter.label),
            b: filter.value,
            c: common_vendor.n(activeFilter.value === filter.value ? "active" : ""),
            d: common_vendor.o(($event = null) => {
              return selectFilter(filter.value);
            }, filter.value)
          };
        }),
        s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deviceReplay.js.map
