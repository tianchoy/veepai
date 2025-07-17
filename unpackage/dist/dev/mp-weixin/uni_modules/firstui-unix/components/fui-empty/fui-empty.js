"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-empty",
  props: {
    src: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 576
    },
    height: {
      type: Number,
      default: 318
    },
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 32
    },
    descr: {
      type: String,
      default: ""
    },
    descrColor: {
      type: String,
      default: ""
    },
    descrSize: {
      type: Number,
      default: 24
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    marginTop: {
      type: Number,
      default: 0
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.src != ""
  }, $props.src != "" ? {
    b: $props.src,
    c: `${$props.width}rpx`,
    d: `${$props.height}rpx`
  } : {}, {
    e: $props.title != ""
  }, $props.title != "" ? {
    f: common_vendor.t($props.title),
    g: $props.color == "" ? 1 : "",
    h: $props.color,
    i: `${$props.size}rpx`
  } : {}, {
    j: $props.descr != ""
  }, $props.descr != "" ? {
    k: common_vendor.t($props.descr),
    l: $props.descrColor == "" ? 1 : "",
    m: $props.descrColor,
    n: `${$props.descrSize}rpx`
  } : {}, {
    o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    p: $props.isFixed ? 1 : "",
    q: `${$props.marginTop}rpx`
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6e9110e4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-empty/fui-empty.js.map
