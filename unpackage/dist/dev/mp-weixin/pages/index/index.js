"use strict";
const common_vendor = require("../../common/vendor.js");
const forward = "/static/video/forward.png";
const errIcon = "/static/video/error.png";
const transfer = "/static/video/transfer.png";
const replayIcon = "/static/video/replay.png";
const pauseIcon = "/static/video/pause.png";
const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const deviceTitle = common_vendor.ref("设备名称");
    const videoRef = common_vendor.ref(null);
    const replay = () => {
      common_vendor.index.showToast({
        title: "重播",
        icon: "none"
      });
      common_vendor.index.createVideoContext("myVideo").play();
    };
    const transferClick = () => {
      common_vendor.index.showToast({
        title: "传输",
        icon: "none"
      });
    };
    const errClick = () => {
      common_vendor.index.showToast({
        title: "警报",
        icon: "none"
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
    const pauseClick = () => {
      common_vendor.index.createVideoContext("myVideo").pause();
      common_vendor.index.showToast({
        title: "暂停",
        icon: "none"
      });
    };
    const clickVdedio = () => {
      common_vendor.index.showToast({
        title: "sss",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei("myVideo", "video", videoRef, {
          "k": "videoRef"
        }),
        b: deviceTitle.value,
        c: videoSrc,
        d: common_vendor.o(clickVdedio),
        e: common_vendor.t(deviceTitle.value),
        f: forward,
        g: common_vendor.o(toDeviceDetail),
        h: errIcon,
        i: common_vendor.o(errClick),
        j: transfer,
        k: common_vendor.o(transferClick),
        l: replayIcon,
        m: common_vendor.o(replay),
        n: common_vendor.o(pauseClick),
        o: pauseIcon,
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
