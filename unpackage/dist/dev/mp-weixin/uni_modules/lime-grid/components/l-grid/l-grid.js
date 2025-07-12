"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-grid",
  props: {
    align: { default: "center" },
    border: { type: Boolean, default: false },
    column: { default: 4 },
    gutter: { default: 0 },
    hover: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    gridWidth: {},
    padding: {},
    bgColor: {},
    wrap: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const clsses = common_vendor.computed(() => {
      const cls = /* @__PURE__ */ new Map();
      cls.set(`l-grid--wrap`, props.wrap);
      cls.set(`l-grid--inset`, props.inset);
      cls.set(`l-grid--bordered`, props.border && props.gutter == 0);
      return cls;
    });
    const resizeRef = common_vendor.ref(null);
    const width = common_vendor.ref(0);
    const children = common_vendor.ref([]);
    common_vendor.provide("limeGrid", {
      children,
      props,
      width
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-282e36c6"), "view", resizeRef, {
          "k": "resizeRef"
        }),
        b: common_vendor.n(common_vendor.unref(clsses))
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-grid/components/l-grid/l-grid.js.map
