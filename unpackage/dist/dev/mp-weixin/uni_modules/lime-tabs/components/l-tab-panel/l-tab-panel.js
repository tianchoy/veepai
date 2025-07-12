"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-tab-panel",
  props: {
    badge: {},
    offset: {},
    dot: { type: Boolean },
    destroyOnHide: { type: Boolean },
    disabled: { type: Boolean },
    label: {},
    lazy: { type: Boolean },
    value: {}
  },
  setup(__props) {
    const children = common_vendor.inject("LimeTabs", null);
    const instance = common_vendor.getCurrentInstance().proxy;
    common_vendor.onMounted(() => {
      if (children == null)
        return null;
      children.value.push(instance);
    });
    common_vendor.onUnmounted(() => {
      if (children == null)
        return null;
      children.value = children.value.filter((it = null) => {
        return it != instance;
      });
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.js.map
