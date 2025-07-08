"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-tab-panel",
  props: {
    badge: new UTSJSONObject({}),
    offset: new UTSJSONObject({}),
    dot: new UTSJSONObject({ type: Boolean }),
    destroyOnHide: new UTSJSONObject({ type: Boolean }),
    disabled: new UTSJSONObject({ type: Boolean }),
    label: new UTSJSONObject({}),
    lazy: new UTSJSONObject({ type: Boolean }),
    value: new UTSJSONObject({})
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
      children.value = children.value.filter((it) => {
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
