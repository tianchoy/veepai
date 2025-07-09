"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-tag",
  emits: ["onclick"],
  props: {
    text: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "primary"
    },
    theme: {
      type: String,
      default: "dark"
    },
    background: {
      type: String,
      default: ""
    },
    isBorder: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 24
    },
    scaleRatio: {
      type: Number,
      default: 1
    },
    originLeft: {
      type: Boolean,
      default: false
    },
    originRight: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Number,
      default: 8
    },
    padding: {
      type: String,
      default: "16rpx 32rpx"
    },
    marginTop: {
      type: Number,
      default: 0
    },
    marginBottom: {
      type: Number,
      default: 0
    },
    marginLeft: {
      type: Number,
      default: 0
    },
    marginRight: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("onclick", this.index);
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.text != ""
  }, $props.text != "" ? {
    b: common_vendor.t($props.text),
    c: common_vendor.n($props.background == "" ? `fui-tag_${$props.type}-${$props.theme}` : ""),
    d: `${$props.size}rpx`,
    e: `${$props.size}rpx`,
    f: $props.color
  } : {}, {
    g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    h: common_vendor.n($props.originLeft ? "fui-tag__origin-left" : ""),
    i: common_vendor.n($props.originRight ? "fui-tag__origin-right" : ""),
    j: common_vendor.n($props.background == "" ? `fui-tag__${$props.type}-${$props.theme}` : ""),
    k: common_vendor.n($props.background != "" && $props.borderColor == "" || !$props.isBorder ? "fui-tag__no-border" : ""),
    l: $props.background,
    m: $props.borderColor,
    n: `scale(${$props.scaleRatio})`,
    o: `${$props.radius}rpx`,
    p: $props.padding,
    q: `${$props.marginTop}rpx`,
    r: `${$props.marginRight}rpx`,
    s: `${$props.marginBottom}rpx`,
    t: `${$props.marginLeft}rpx`,
    v: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args)),
    w: $props.highlight ? "fui-tag__opacity-active" : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-100d2773"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-tag/fui-tag.js.map
