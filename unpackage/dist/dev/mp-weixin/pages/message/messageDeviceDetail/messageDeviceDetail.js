"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const uni_modules_limeDayuts_common_index = require("../../../uni_modules/lime-dayuts/common/index.js");
require("../../../uni_modules/lime-dayuts/common/use.js");
require("../../../uni_modules/lime-dayuts/utssdk/interface.js");
if (!Array) {
  const _easycom_l_daily_punch_1 = common_vendor.resolveComponent("l-daily-punch");
  _easycom_l_daily_punch_1();
}
const _easycom_l_daily_punch = () => "../../../uni_modules/lime-daily-punch/components/l-daily-punch/l-daily-punch.js";
if (!Math) {
  _easycom_l_daily_punch();
}
const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "messageDeviceDetail",
  setup(__props) {
    const checkIns = common_vendor.ref(["2025-06-09", "2025-07-01", "2025-07-02"]);
    const today = common_vendor.ref(uni_modules_limeDayuts_common_index.dayuts().format("MM-DD"));
    const showCalendar = common_vendor.ref(false);
    const activeTab = common_vendor.ref(0);
    const testTitle = common_vendor.ref("测试标题");
    const videoRef = common_vendor.ref(null);
    const playVideo = () => {
      common_vendor.index.createVideoContext("myVideo").play();
    };
    const pasueVideo = () => {
      common_vendor.index.createVideoContext("myVideo").pause();
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
      common_vendor.index.__f__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:130", today.value);
      if (day.isToday) {
        common_vendor.index.__f__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:132", "今天");
      }
      showCalendar.value = false;
    };
    const msgDetail = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/message/messageDetail/messageDetail?id=" + e.id
      });
    };
    const change = (res) => {
      common_vendor.index.__f__("log", "at pages/message/messageDeviceDetail/messageDeviceDetail.uvue:144", "res", res);
    };
    const ShowCalendar = () => {
      showCalendar.value = !showCalendar.value;
    };
    const hideCalendar = () => {
      showCalendar.value = false;
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.sei("myVideo", "video", videoRef, new UTSJSONObject({
          "k": "videoRef"
        })),
        b: videoSrc,
        c: testTitle.value,
        d: common_vendor.o(playVideo),
        e: common_vendor.o(pasueVideo),
        f: common_vendor.t(today.value),
        g: common_assets._imports_0,
        h: common_vendor.o(ShowCalendar),
        i: common_vendor.f(tabs.value, (tab = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: common_vendor.t(tab.label),
            b: index,
            c: activeTab.value === index ? 1 : "",
            d: common_vendor.o(($event = null) => {
              return changeTab(index);
            }, index)
          });
        }),
        j: common_vendor.f(getFilteredEvents(), (event = null, index = null, i0 = null) => {
          return new UTSJSONObject({
            a: event.type === "human" ? "/static/people.png" : "/static/mobile.png",
            b: common_vendor.t(event.type === "human" ? "人形侦测" : "移动侦测"),
            c: common_vendor.t(event.time),
            d: index,
            e: common_vendor.o(($event = null) => {
              return msgDetail(event);
            }, index)
          });
        }),
        k: common_assets._imports_1,
        l: showCalendar.value
      }), showCalendar.value ? new UTSJSONObject({
        m: common_vendor.o(select),
        n: common_vendor.o(change),
        o: common_vendor.p(new UTSJSONObject({
          signedDates: checkIns.value,
          dayHeight: 60
        })),
        p: common_vendor.o(hideCalendar)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-52a55c74"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/message/messageDeviceDetail/messageDeviceDetail.js.map
