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
    const deviceSetting = () => {
      common_vendor.index.showToast({
        title: "设备设置",
        icon: "none"
      });
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(deviceSetting),
        b: common_vendor.p({
          title: "设备详情",
          showBack: true,
          rightText: "setup"
        }),
        c: common_vendor.sei("myVideo", "video", "videoRef"),
        d: videoSrc.value,
        e: common_assets._imports_0$6,
        f: common_assets._imports_1$3,
        g: common_assets._imports_2$1,
        h: common_assets._imports_3$2,
        i: common_assets._imports_4$1,
        j: common_assets._imports_5$1,
        k: common_assets._imports_6$1,
        l: common_assets._imports_7$1,
        m: common_assets._imports_8$1,
        n: common_assets._imports_9$1,
        o: common_assets._imports_10$1,
        p: common_assets._imports_11$1,
        q: common_assets._imports_12,
        r: common_assets._imports_13,
        s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-428bbe9d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deviceDetail.js.map
