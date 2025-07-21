"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_fui_button_1 = common_vendor.resolveComponent("fui-button");
  (_easycom_l_icon_1 + _easycom_fui_button_1)();
}
const _easycom_l_icon = () => "../../uni_modules/lime-icon/components/l-icon/l-icon.js";
const _easycom_fui_button = () => "../../uni_modules/firstui-unix/components/fui-button/fui-button.js";
if (!Math) {
  (common_vendor.unref(TopNavBar) + _easycom_l_icon + _easycom_fui_button)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
const forward = "/static/video/forward.png";
const errIcon = "/static/video/error.png";
const transfer = "/static/video/transfer.png";
const replayIcon = "/static/video/replay.png";
const videoSrc = "/static/video/video.mp4";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const deviceTitle = common_vendor.ref("设备名称");
    const videoContext = common_vendor.ref(null);
    const onLine = common_vendor.ref(true);
    const initVideoContext = () => {
      try {
        videoContext.value = common_vendor.index.createVideoContext("myVideo");
        common_vendor.index.__f__("log", "at pages/index/index.uvue:76", "视频上下文初始化成功", videoContext.value);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.uvue:78", "创建视频上下文失败:", error);
      }
    };
    const replay = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceReplay"
      });
    };
    const transferClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/rechargeDataTraffic/rechargeDataTraffic"
      });
    };
    const errClick = () => {
      common_vendor.index.switchTab({
        url: "/pages/message/message"
      });
    };
    const toDeviceDetail = () => {
      common_vendor.index.showToast({
        title: "设备详情",
        icon: "none"
      });
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceDetail"
      });
    };
    const addNewDevice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/addNewDevice/addNewDevice"
      });
    };
    common_vendor.onMounted(() => {
      initVideoContext();
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: common_vendor.o(addNewDevice),
        b: common_vendor.p(new UTSJSONObject({
          title: "首页",
          rightText: "plussign"
        })),
        c: onLine.value
      }), onLine.value ? new UTSJSONObject({
        d: common_vendor.t(deviceTitle.value)
      }) : new UTSJSONObject({}), new UTSJSONObject({
        e: onLine.value
      }), onLine.value ? new UTSJSONObject({
        f: forward,
        g: common_vendor.o(toDeviceDetail),
        h: errIcon,
        i: common_vendor.o(errClick),
        j: transfer,
        k: common_vendor.o(transferClick),
        l: replayIcon,
        m: common_vendor.o(replay)
      }) : new UTSJSONObject({
        n: common_vendor.p(new UTSJSONObject({
          name: "link-unlink",
          color: "#fff"
        })),
        o: common_vendor.p(new UTSJSONObject({
          color: "#1296db",
          text: "查看帮助",
          radius: "50rpx",
          size: 22,
          background: "#fff",
          width: "120rpx",
          height: "40rpx"
        }))
      }), new UTSJSONObject({
        p: common_vendor.sei("myVideo", "video"),
        q: videoSrc,
        r: onLine.value,
        s: onLine.value,
        t: onLine.value,
        v: onLine.value,
        w: onLine.value,
        x: onLine.value,
        y: -90,
        z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      }));
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
