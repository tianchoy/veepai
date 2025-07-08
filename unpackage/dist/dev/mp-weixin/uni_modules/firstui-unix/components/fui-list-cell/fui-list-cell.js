"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-list-cell",
  emits: ["onclick"],
  props: {
    padding: {
      type: String,
      default: ""
    },
    marginTop: {
      type: Number,
      default: 0
    },
    marginBottom: {
      type: Number,
      default: 0
    },
    background: {
      type: String,
      default: ""
    },
    highlight: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: false
    },
    arrowColor: {
      type: String,
      default: ""
    },
    topBorder: {
      type: Boolean,
      default: false
    },
    bottomBorder: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: ""
    },
    topLeft: {
      type: Number,
      default: 0
    },
    topRight: {
      type: Number,
      default: 0
    },
    bottomLeft: {
      type: Number,
      default: -1
    },
    bottomRight: {
      type: Number,
      default: 0
    },
    radius: {
      type: String,
      default: "0"
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getPadding() {
      const mp = /* @__PURE__ */ new Map();
      if (this.padding != "")
        mp.set("padding", this.padding);
      return mp;
    },
    getBorderColor() {
      const mp = /* @__PURE__ */ new Map();
      if (this.arrowColor != "")
        mp.set("border-color", this.arrowColor);
      return mp;
    },
    getTopLineStyl() {
      const mp = /* @__PURE__ */ new Map();
      if (this.borderColor != "")
        mp.set("background", this.borderColor);
      mp.set("left", `${this.topLeft}rpx`);
      mp.set("right", `${this.topRight}rpx`);
      return mp;
    },
    getBtmLineStyl() {
      const mp = /* @__PURE__ */ new Map();
      if (this.borderColor != "")
        mp.set("background", this.borderColor);
      mp.set("left", `${this.bottomLeft == -1 ? 0 : this.bottomLeft}rpx`);
      mp.set("right", `${this.bottomRight}rpx`);
      return mp;
    }
  },
  methods: {
    handleClick() {
      this.$emit("onclick", this.index);
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.topBorder
  }, $props.topBorder ? {
    b: common_vendor.s($options.getTopLineStyl),
    c: $props.borderColor == "" ? 1 : ""
  } : {}, {
    d: $props.arrow
  }, $props.arrow ? {
    e: common_vendor.s($options.getBorderColor),
    f: $props.arrowColor == "" ? 1 : ""
  } : {}, {
    g: $props.padding == "" ? 1 : "",
    h: common_vendor.s($options.getPadding),
    i: $props.bottomBorder
  }, $props.bottomBorder ? {
    j: common_vendor.s($options.getBtmLineStyl),
    k: $props.borderColor == "" ? 1 : "",
    l: $props.bottomLeft == -1 ? 1 : ""
  } : {}, {
    m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    n: $props.highlight ? "fui-list__cell-highlight" : "",
    o: $props.background == "" ? 1 : "",
    p: $props.background,
    q: `${$props.marginTop}rpx`,
    r: `${$props.marginBottom}rpx`,
    s: $props.radius,
    t: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e6d76a8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-list-cell/fui-list-cell.js.map
