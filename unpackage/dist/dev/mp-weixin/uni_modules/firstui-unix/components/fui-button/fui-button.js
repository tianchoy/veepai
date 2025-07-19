"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-button",
  emits: ["onclick"],
  props: {
    type: {
      type: String,
      default: "primary"
    },
    background: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    disabledBackground: {
      type: String,
      default: ""
    },
    disabledColor: {
      type: String,
      default: ""
    },
    borderWidth: {
      type: String,
      default: "0.5px"
    },
    borderColor: {
      type: String,
      default: ""
    },
    btnSize: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 0
    },
    bold: {
      type: Boolean,
      default: false
    },
    margin: {
      type: String,
      default: ""
    },
    radius: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: "#B2B2B2"
    },
    activeColor: {
      type: String,
      default: "#FFFFFF"
    },
    //V1.2.6+
    formType: {
      type: String,
      default: ""
    }
  },
  computed: {
    getStyl() {
      const mp = /* @__PURE__ */ new Map();
      mp.set("border-left-color", this.activeColor);
      mp.set("border-right-color", this.iconColor);
      mp.set("border-top-color", this.iconColor);
      mp.set("border-bottom-color", this.iconColor);
      return mp;
    },
    getBackground() {
      let color = this.background;
      if (this.disabled && this.disabledBackground != "") {
        color = this.disabledBackground;
      }
      color = this.type == "link" || this.plain ? "rgba(0,0,0,0)" : color;
      return color;
    },
    getBorderColor() {
      let color = this.borderColor;
      if (color == "") {
        color = this.disabled && this.disabledBackground != "" ? this.disabledBackground : this.background;
      }
      color = this.type == "link" ? "rgba(0,0,0,0)" : color;
      return color;
    },
    getColor() {
      let color;
      if (this.color != "") {
        color = this.disabled && this.disabledBackground != "" ? this.disabledColor : this.color;
      } else {
        if (this.disabled && this.disabledBackground != "") {
          color = this.disabledColor == "" ? "#FFFFFF" : this.disabledColor;
        } else {
          color = this.type == "gray" ? "#465CFF" : "#FFFFFF";
        }
      }
      return color;
    },
    getSize() {
      let size = this.size;
      if (this.btnSize != "") {
        size = size == 0 ? 32 : size;
        if (this.btnSize == "small") {
          size = size > 28 ? 28 : size;
        } else if (this.btnSize == "mini") {
          size = size > 28 ? 24 : size;
        }
      }
      return `${size}rpx`;
    },
    getWidth() {
      let width = this.width;
      if (this.btnSize != "") {
        width = new UTSJSONObject({
          medium: "400rpx",
          small: "200rpx",
          mini: "120rpx"
        })[this.btnSize];
      }
      return width;
    },
    getHeight() {
      let height = this.height;
      if (this.btnSize != "") {
        height = new UTSJSONObject({
          medium: "84rpx",
          small: "72rpx",
          mini: "64rpx"
        })[this.btnSize];
      }
      return height;
    }
  },
  watch: {
    loading(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.startSpin();
          }, 50);
        });
      } else {
        this.endSpin();
      }
    }
  },
  data() {
    return {
      times: 0,
      isSpin: false,
      element: null,
      hoverEle: null,
      fuiForm: null
    };
  },
  created() {
    this.getParent("fui-form");
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.loading)
          this.startSpin();
      }, 200);
    });
  },
  beforeUnmount() {
    this.isSpin = false;
    this.element = null;
    this.hoverEle = null;
  },
  methods: {
    handleStart() {
      this.switchHover(true);
    },
    handleTap(e) {
      if (this.disabled)
        return null;
      this.$emit("onclick", e);
      if (this.formType != "" && this.fuiForm != null) {
        const form = this.fuiForm;
        form.$callMethod("buttonEvent", this.formType);
      }
    },
    handleEnd() {
      this.switchHover(false);
    },
    switchHover(show) {
      if (!this.highlight || this.disabled)
        return null;
      if (this.hoverEle == null) {
        this.hoverEle = this.$refs["fui_button_hover"];
      }
      this.hoverEle.style.setProperty("visibility", show ? "visible" : "hidden");
    },
    startSpin() {
      if (this.element != null && this.isSpin)
        return null;
      if (this.element == null) {
        this.element = this.$refs["fui_button_loading"];
      }
      this.times = this.times + 1;
      this.element.style.setProperty("transform", `rotate(${this.times * 360}deg)`);
      this.element.style.setProperty("transition-duration", "600ms");
      this.isSpin = true;
    },
    endSpin() {
      this.isSpin = false;
      this.times = 0;
      this.element.style.setProperty("transform", `rotate(${this.times * 360}deg)`);
      this.element.style.setProperty("transition-duration", "0s");
      this.element = null;
    },
    onEnd() {
      if (this.isSpin && this.loading) {
        this.times = this.times + 1;
        this.element.style.setProperty("transform", `rotate(${this.times * 360}deg)`);
      }
    },
    getParent(name) {
      if (this.$parent == null)
        return false;
      let parent = this.$parent;
      let parentName = parent.$options["name"];
      while (parentName != name) {
        if (parent.$parent == null)
          return false;
        parent = parent.$parent;
        if (parent.$options["name"] == "")
          return false;
        parentName = parent.$options["name"];
      }
      this.fuiForm = parent;
      return true;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.loading
  }, $props.loading ? {
    b: common_vendor.sei("r0-3404c29d", "view", "fui_button_loading"),
    c: common_vendor.o((...args) => $options.onEnd && $options.onEnd(...args)),
    d: common_vendor.s($options.getStyl)
  } : {}, {
    e: $props.text
  }, $props.text ? {
    f: common_vendor.t($props.text),
    g: $props.background == "" && $props.disabledBackground == "" && !$props.plain && $props.type == "gray" && $props.color == "#fff" ? 1 : "",
    h: $props.bold ? 1 : "",
    i: $props.size == 0 && $props.btnSize == "" ? 1 : "",
    j: $props.height == "" && $props.btnSize == "" ? 1 : "",
    k: $options.getSize,
    l: $options.getColor,
    m: $options.getHeight,
    n: $options.getHeight
  } : {}, {
    o: $props.highlight
  }, $props.highlight ? {
    p: common_vendor.sei("r1-3404c29d", "view", "fui_button_hover"),
    q: $props.radius,
    r: $props.radius == "" ? 1 : ""
  } : {}, {
    s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
    t: common_vendor.n($options.getWidth == "" || $options.getWidth == "100%" ? "fui-button__flex-1" : ""),
    v: common_vendor.n($props.disabled && $props.disabledBackground == "" ? "fui-button__opacity" : ""),
    w: common_vendor.n($props.background == "" && $props.disabledBackground == "" && !$props.plain ? `fui-button__${$props.type}` : ""),
    x: common_vendor.n($props.height == "" && $props.btnSize == "" ? "fui-button__height" : ""),
    y: common_vendor.n($props.radius == "" ? "fui-button__radius" : ""),
    z: common_vendor.n($props.highlight && !$props.disabled ? "fui-button__active" : ""),
    A: $options.getWidth,
    B: $options.getHeight,
    C: $props.margin,
    D: $props.radius,
    E: $options.getBackground,
    F: `${$props.borderColor == "" ? "0px" : $props.borderWidth} solid`,
    G: $options.getBorderColor,
    H: common_vendor.o((...args) => $options.handleStart && $options.handleStart(...args)),
    I: common_vendor.o((...args) => $options.handleEnd && $options.handleEnd(...args)),
    J: common_vendor.o((...args) => $options.handleEnd && $options.handleEnd(...args)),
    K: common_vendor.o((...args) => $options.handleTap && $options.handleTap(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3404c29d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-button/fui-button.js.map
