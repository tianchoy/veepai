"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-badge",
  emits: ["onclick"],
  props: {
    value: {
      type: [Object, String, Number],
      default: ""
    },
    max: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "primary"
    },
    background: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#FFFFFF"
    },
    dot: {
      type: Boolean,
      default: false
    },
    marginTop: {
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
    absolute: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: "-8rpx"
    },
    right: {
      type: String,
      default: "-18rpx"
    },
    scaleRatio: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      width: "0",
      showValue: ""
    };
  },
  watch: {
    value() {
      this.getWidth();
    }
  },
  mounted() {
    this.getWidth();
  },
  methods: {
    rpx2px(rpx) {
      let px;
      const sys = common_vendor.index.getSystemInfoSync();
      px = sys.windowWidth / 750 * rpx;
      return px;
    },
    _getTextWidth(text) {
      let sum = 0;
      for (let i = 0, len = text.length; i < len; i++) {
        const code = text.charCodeAt(i);
        if (code <= 255)
          sum = sum + 1;
        else
          sum = sum + 2;
      }
      const rpx = text.length > 1 ? 32 : 24;
      const px = this.rpx2px(rpx);
      const strCode = text.charCodeAt(0);
      let multiplier = 12;
      if (strCode >= 65 && strCode <= 90) {
        multiplier = 15;
      }
      return `${sum / 2 * multiplier + px}px`;
    },
    getWidth() {
      let max = this.max;
      let value;
      if (typeof this.value == "string") {
        value = this.value;
      } else {
        if (typeof this.value == "number") {
          const val_num = this.value;
          if (max == -1) {
            value = val_num.toString();
          } else {
            value = val_num > max ? `${max}+` : val_num.toString();
          }
        } else {
          if (max == -1) {
            value = this.value.toString();
          } else {
            value = parseFloat(this.value.toString()) > max ? `${max}+` : `${this.value}`;
          }
        }
      }
      this.showValue = value;
      this.width = this.dot ? "8px" : this._getTextWidth(value);
    },
    handleClick() {
      this.$emit("onclick");
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showValue != "" || $props.dot
  }, $data.showValue != "" || $props.dot ? {
    b: common_vendor.t($props.dot ? "" : $data.showValue),
    c: common_vendor.sei(common_vendor.gei(_ctx, ""), "text"),
    d: common_vendor.n($props.dot ? "fui-badge__dot" : "fui-badge__wrap"),
    e: common_vendor.n($props.background != "" ? "" : "fui-badge__bg-" + $props.type),
    f: common_vendor.n($props.absolute ? "fui-badge__absolute" : ""),
    g: common_vendor.n($props.scaleRatio != 1 ? "fui-badge__trans-origin" : ""),
    h: common_vendor.n($props.background == "" && $props.type == "white" ? "fui-badge__text-color" : ""),
    i: $props.absolute ? $props.top : "auto",
    j: $props.absolute ? $props.right : "auto",
    k: `scale(${$props.scaleRatio})`,
    l: `${$props.marginTop}rpx`,
    m: `${$props.marginLeft}rpx`,
    n: `${$props.marginRight}rpx`,
    o: $data.width,
    p: $props.color,
    q: $props.background,
    r: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-46569bf8"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-badge/fui-badge.js.map
