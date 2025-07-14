"use strict";
const common_vendor = require("../common/vendor.js");
class TimelineParams extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          duration: { type: Number, optional: false },
          width: { type: Number, optional: false },
          density: { type: Number, optional: false },
          events: { type: UTS.UTSType.withGenerics(Array, [EventMarker]), optional: false },
          visibleRange: { type: "Unknown", optional: false }
        };
      },
      name: "TimelineParams"
    };
  }
  constructor(options, metadata = TimelineParams.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.duration = this.__props__.duration;
    this.width = this.__props__.width;
    this.density = this.__props__.density;
    this.events = this.__props__.events;
    this.visibleRange = this.__props__.visibleRange;
    delete this.__props__;
  }
}
class EventMarker extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          timestamp: { type: Number, optional: false },
          type: { type: "Unknown", optional: false },
          level: { type: Number, optional: false }
        };
      },
      name: "EventMarker"
    };
  }
  constructor(options, metadata = EventMarker.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.timestamp = this.__props__.timestamp;
    this.type = this.__props__.type;
    this.level = this.__props__.level;
    delete this.__props__;
  }
}
class TimeMark extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          timestamp: { type: Number, optional: false },
          position: { type: Number, optional: false },
          label: { type: String, optional: false },
          hasEvent: { type: Boolean, optional: false }
        };
      },
      name: "TimeMark"
    };
  }
  constructor(options, metadata = TimeMark.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.timestamp = this.__props__.timestamp;
    this.position = this.__props__.position;
    this.label = this.__props__.label;
    this.hasEvent = this.__props__.hasEvent;
    delete this.__props__;
  }
}
function calculateTimeline(params) {
  if (!params || params.duration <= 0 || params.width <= 0) {
    common_vendor.index.__f__("error", "at uts/timelineEngine.uts:27", "Invalid timeline parameters");
    return [];
  }
  const results = [];
  const pxPerSecond = params.width / params.duration;
  const safeDensity = Math.max(1, Math.min(60, params.density));
  for (let minute = 0; minute <= params.duration / 60; minute += safeDensity) {
    const timestamp = minute * 60;
    if (timestamp < params.visibleRange.start || timestamp > params.visibleRange.end)
      continue;
    results.push(new TimeMark({
      timestamp,
      position: androidSafePositionCalc(timestamp * pxPerSecond),
      label: formatTimeLabel(minute),
      hasEvent: checkEvent(timestamp, params.events)
    }));
  }
  return results;
}
function androidSafePositionCalc(pos) {
  return pos;
}
function checkEvent(timestamp, events) {
  if (!events || events.length === 0)
    return false;
  return events.some((e) => {
    return Math.abs(e.timestamp - timestamp) < 30;
  });
}
function formatTimeLabel(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${padZero(hours)}:${padZero(mins)}`;
}
function padZero(num) {
  return num < 10 ? `0${num}` : num.toString();
}
exports.calculateTimeline = calculateTimeline;
//# sourceMappingURL=../../.sourcemap/mp-weixin/uts/timelineEngine.js.map
