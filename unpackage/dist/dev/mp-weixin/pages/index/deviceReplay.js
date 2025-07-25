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
    const videoSrc = common_vendor.ref("/static/video/video.mp4");
    const videoContext = common_vendor.ref(null);
    const isSeeking = common_vendor.ref(false);
    const timeScrollLeft = common_vendor.ref(0);
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
      { date: "10-21", time: "00:00:10", type: "alarm" },
      { date: "10-21", time: "00:00:30", type: "motion" },
      { date: "10-21", time: "00:01:45", type: "human" },
      { date: "10-21", time: "00:01:20", type: "alarm" }
    ]);
    const rulerWidth = common_vendor.computed(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      return systemInfo.windowWidth;
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
      if (duration == 0)
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
      const minorInterval = majorInterval / 10;
      const pixelsPerSecond = rulerWidth.value / duration;
      for (let time = 0; time <= duration; time += minorInterval) {
        const isMajor = time % majorInterval == 0;
        marks.push(new TimeMark({
          time,
          position: time * pixelsPerSecond + 3,
          type: isMajor ? "major" : "minor"
        }));
      }
      return marks;
    });
    const onVideoLoaded = (e) => {
      videoDuration.value = e["duration"];
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:155", "视频加载完成，时长:", videoDuration.value);
    };
    const filteredEvents = common_vendor.computed(() => {
      if (activeFilter.value === "all")
        return events.value;
      return events.value.filter((e) => {
        return e.type === activeFilter.value;
      });
    });
    const initVideoContext = () => {
      try {
        videoContext.value = common_vendor.index.createVideoContext("myVideo");
        common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:180", "视频上下文初始化成功", videoContext.value);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/deviceReplay.uvue:182", "创建视频上下文失败:", error);
      }
    };
    const loadVideoData = (date) => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:187", "加载日期数据:", date);
    };
    const selectDate = (date) => {
      activeDate.value = date;
      currentDate.value = `2024-${date}`;
      loadVideoData(date);
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
      const scrollViewWidth = systemInfo.windowWidth;
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
      updatePlayheadPosition(currentTimeInSeconds - 1);
    };
    const seekToSeconds = (timeInSeconds) => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:236", "尝试跳转到:", timeInSeconds, "秒");
      if (videoContext.value != null) {
        videoContext.value.pause();
        videoContext.value.seek(timeInSeconds);
        setTimeout(() => {
          var _a;
          (_a = videoContext.value) === null || _a === void 0 ? null : _a.play();
          common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:242", "跳转完成，应开始播放");
        }, 100);
      }
    };
    const getEventPosition = (event) => {
      const seconds = convertTimeToSeconds(event.time);
      const duration = videoDuration.value != 0 ? videoDuration.value : 300;
      const pixelsPerSecond = rulerWidth.value / duration;
      return seconds * pixelsPerSecond;
    };
    const seekToEvent = (event) => {
      const seconds = convertTimeToSeconds(event.time);
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:258", "点击事件时间点：", seconds, "秒", "当前视频时长:", videoDuration.value);
      if (videoContext.value == null) {
        common_vendor.index.__f__("error", "at pages/index/deviceReplay.uvue:261", "视频上下文未初始化");
        return null;
      }
      isSeeking.value = true;
      currentTime.value = formatTime(seconds);
      playheadPosition.value = getEventPosition(event);
      videoContext.value.pause();
      videoContext.value.seek(seconds);
      setTimeout(() => {
        var _a;
        (_a = videoContext.value) === null || _a === void 0 ? null : _a.play();
        isSeeking.value = false;
        common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:277", "应已跳转到指定位置并开始播放");
      }, 150);
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
      const scrollViewWidth = systemInfo.windowWidth;
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
      const scrollViewWidth = systemInfo.windowWidth;
      const pixelsPerSecond = rulerWidth.value / videoDuration.value;
      const timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / pixelsPerSecond;
      if (videoContext.value != null) {
        common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:357", "尝试跳转视频到最终时间:", draggedTimeInSeconds.value, "秒");
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
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:423", "视频开始播放");
    };
    const onPause = () => {
      common_vendor.index.__f__("log", "at pages/index/deviceReplay.uvue:428", "视频暂停");
    };
    common_vendor.onMounted(() => {
      initVideoContext();
      if (videoContext.value == null) {
        common_vendor.index.__f__("error", "at pages/index/deviceReplay.uvue:435", "视频上下文初始化失败，请检查");
      }
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei("myVideo", "video"),
        b: videoSrc.value,
        c: common_vendor.o(onTimeUpdate),
        d: common_vendor.o(onPlay),
        e: common_vendor.o(onPause),
        f: common_vendor.o(onSeeked),
        g: common_vendor.o(onVideoLoaded),
        h: common_vendor.f(timeMarks.value, (mark = null, index = null, i0 = null) => {
          return common_vendor.e({
            a: mark.type === "major"
          }, mark.type === "major" ? {} : {}, {
            b: "mark-" + index,
            c: common_vendor.n(mark.type),
            d: mark.position + "px",
            e: common_vendor.o(($event = null) => {
              return seekToPosition(mark.time);
            }, "mark-" + index)
          });
        }),
        i: common_vendor.f(filteredEvents.value, (event = null, index = null, i0 = null) => {
          return {
            a: common_vendor.n(event.type),
            b: "event-" + index,
            c: getEventPosition(event) + "px",
            d: common_vendor.o(($event = null) => {
              return seekToEvent(event);
            }, "event-" + index)
          };
        }),
        j: playheadPosition.value + "px",
        k: rulerWidth.value + "px",
        l: common_vendor.o(onTouchStart),
        m: common_vendor.o(onTouchMove),
        n: common_vendor.o(onTouchEnd),
        o: timeScrollLeft.value,
        p: common_vendor.o(onTimeScroll),
        q: common_vendor.f(dateList, (date = null, index = null, i0 = null) => {
          return {
            a: common_vendor.t(date),
            b: index,
            c: common_vendor.n(activeDate.value === date ? "active" : ""),
            d: common_vendor.o(($event = null) => {
              return selectDate(date);
            }, index)
          };
        }),
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
