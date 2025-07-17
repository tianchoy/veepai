"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  common_vendor.unref(TopNavBar)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
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
    const addNewDevice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/addNewDevice/addNewDevice"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(addNewDevice),
        b: common_vendor.p({
          title: "首页",
          rightText: "plussign"
        }),
        c: common_vendor.sei("myVideo", "video", videoRef, {
          "k": "videoRef"
        }),
        d: deviceTitle.value,
        e: videoSrc,
        f: common_vendor.o(clickVdedio),
        g: common_vendor.t(deviceTitle.value),
        h: forward,
        i: common_vendor.o(toDeviceDetail),
        j: errIcon,
        k: common_vendor.o(errClick),
        l: transfer,
        m: common_vendor.o(transferClick),
        n: replayIcon,
        o: common_vendor.o(replay),
        p: common_vendor.o(pauseClick),
        q: pauseIcon,
        r: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
