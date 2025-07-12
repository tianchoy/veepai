"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "messageDetail",
  setup(__props) {
    common_vendor.ref("消息详情");
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/message/messageDetail/messageDetail.uvue:17", options.id);
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a23001e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/message/messageDetail/messageDetail.js.map
