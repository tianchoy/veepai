"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_l_grid_item_1 = common_vendor.resolveComponent("l-grid-item");
  const _easycom_l_grid_1 = common_vendor.resolveComponent("l-grid");
  (_easycom_l_grid_item_1 + _easycom_l_grid_1)();
}
const _easycom_l_grid_item = () => "../../../uni_modules/lime-grid/components/l-grid-item/l-grid-item.js";
const _easycom_l_grid = () => "../../../uni_modules/lime-grid/components/l-grid/l-grid.js";
if (!Math) {
  (_easycom_l_grid_item + _easycom_l_grid)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "localFiles",
  setup(__props) {
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        }),
        b: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar2.png"
        }),
        c: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar3.png"
        }),
        d: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar4.png"
        }),
        e: common_vendor.p({
          text: "最多四字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar5.png"
        }),
        f: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
        }),
        g: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar2.png"
        }),
        h: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar3.png"
        }),
        i: common_vendor.p({
          text: "标题文字",
          image: "https://tdesign.gtimg.com/mobile/demos/avatar4.png"
        }),
        j: common_vendor.p({
          column: 3,
          border: true,
          gutter: 20
        }),
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-587484ea"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/localFiles/localFiles.js.map
