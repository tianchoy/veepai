"use strict";
const common_vendor = require("../../common/vendor.js");
const types_NavTitleItem = require("../../types/NavTitleItem.js");
if (!Array) {
  const _component_uv_icon = common_vendor.resolveComponent("uv-icon");
  _component_uv_icon();
}
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "index",
  setup(__props) {
    const title = [new types_NavTitleItem.NavTitleItem({
      name: "首页",
      isCurrent: true,
      url: "/pages/index/index"
    }), new types_NavTitleItem.NavTitleItem({
      name: "消息",
      isCurrent: false,
      url: "/pages/message/message"
    }), new types_NavTitleItem.NavTitleItem({
      name: "我的",
      isCurrent: false,
      url: "/pages/mine/mine"
    })];
    const deviceTitle = common_vendor.ref("设备名称");
    const navAdd = () => {
      common_vendor.index.showToast({
        title: "添加",
        icon: "none"
      });
    };
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
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.o(navAdd),
        b: common_vendor.p({
          showBack: false,
          title
        }),
        c: videoSrc,
        d: common_vendor.t(common_vendor.unref(deviceTitle)),
        e: common_vendor.o(toDeviceDetail),
        f: common_vendor.p({
          name: forward
        }),
        g: common_vendor.o(errClick),
        h: common_vendor.p({
          name: errIcon
        }),
        i: common_vendor.o(transferClick),
        j: common_vendor.p({
          name: transfer
        }),
        k: common_vendor.o(replay),
        l: common_vendor.p({
          name: replayIcon
        }),
        m: common_vendor.o(pauseClick),
        n: common_vendor.p({
          name: pauseIcon
        }),
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a60067"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
