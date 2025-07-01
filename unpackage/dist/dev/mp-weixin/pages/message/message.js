"use strict";
const common_vendor = require("../../common/vendor.js");
const types_NavTitleItem = require("../../types/NavTitleItem.js");
if (!Math) {
  common_vendor.unref(TopNavBar)();
}
const TopNavBar = () => "../../components/TopNavBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(new UTSJSONObject({
  __name: "message",
  setup(__props) {
    const title = [new types_NavTitleItem.NavTitleItem({
      name: "首页",
      isCurrent: false,
      url: "/pages/index/index"
    }), new types_NavTitleItem.NavTitleItem({
      name: "消息",
      isCurrent: true,
      url: "/pages/message/message"
    }), new types_NavTitleItem.NavTitleItem({
      name: "我的",
      isCurrent: false,
      url: "/pages/mine/mine"
    })];
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          showBack: false,
          title
        }),
        b: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
}));
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e403ad2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
