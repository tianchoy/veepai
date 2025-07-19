"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  common_vendor.unref(TopNavBar)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "deviceDetail",
  setup(__props) {
    const videoSrc = common_vendor.ref("https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4");
    const goBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        delta: 1
      }));
    };
    const deviceSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceSetting"
      });
    };
    const replay = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceReplay"
      });
    };
    const share = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deviceShare/deviceShare"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(deviceSetting),
        b: common_vendor.o(goBack),
        c: common_vendor.p({
          title: "设备详情",
          showBack: true,
          rightText: "setup"
        }),
        d: common_vendor.sei("myVideo", "video", "videoRef"),
        e: videoSrc.value,
        f: common_assets._imports_0$7,
        g: common_assets._imports_1$2,
        h: common_assets._imports_2$1,
        i: common_assets._imports_3$2,
        j: common_assets._imports_4$1,
        k: common_assets._imports_5$1,
        l: common_assets._imports_6$1,
        m: common_assets._imports_7$1,
        n: common_assets._imports_8$1,
        o: common_assets._imports_9$1,
        p: common_assets._imports_10$1,
        q: common_assets._imports_11$1,
        r: common_assets._imports_12,
        s: common_vendor.o(replay),
        t: common_assets._imports_13,
        v: common_vendor.o(share),
        w: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-428bbe9d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deviceDetail.js.map
