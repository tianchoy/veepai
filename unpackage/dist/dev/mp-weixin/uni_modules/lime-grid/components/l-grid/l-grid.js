"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-grid",
  props: {
    align: new UTSJSONObject({ default: "center" }),
    border: new UTSJSONObject({ type: Boolean, default: false }),
    column: new UTSJSONObject({ default: 4 }),
    gutter: new UTSJSONObject({ default: 0 }),
    hover: new UTSJSONObject({ type: Boolean, default: false }),
    inset: new UTSJSONObject({ type: Boolean, default: false }),
    gridWidth: new UTSJSONObject({}),
    padding: new UTSJSONObject({}),
    bgColor: new UTSJSONObject({}),
    wrap: new UTSJSONObject({ type: Boolean, default: true })
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
