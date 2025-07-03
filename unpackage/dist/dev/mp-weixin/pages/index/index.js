"use strict";
const common_vendor = require("../../common/vendor.js");
const forward = "/static/video/forward.png";
const errIcon = "/static/video/error.png";
const transfer = "/static/video/transfer.png";
const replayIcon = "/static/video/replay.png";
const pauseIcon = "/static/video/pause.png";
const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "index",
  setup(__props) {
    const deviceTitle = common_vendor.ref("设备名称");
    const replay = () => {
      common_vendor.index.showToast({
        title: "重播",
        icon: "none"
      });
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
    };
    const pauseClick = () => {
      common_vendor.index.showToast({
        title: "暂停",
        icon: "none"
      });
    };
    const vedioClick = () => {
      common_vendor.index.showToast({
        title: "播放",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: videoSrc,
        b: common_vendor.o(vedioClick),
        c: common_vendor.t(deviceTitle.value),
        d: forward,
        e: common_vendor.o(toDeviceDetail),
        f: errIcon,
        g: common_vendor.o(errClick),
        h: transfer,
        i: common_vendor.o(transferClick),
        j: replayIcon,
        k: common_vendor.o(replay),
        l: common_vendor.o(pauseClick),
        m: pauseIcon,
        n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
