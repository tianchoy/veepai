"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../fui-types/index.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-toast",
  props: {
    padding: {
      type: String,
      default: "32rpx"
    },
    background: {
      type: String,
      default: "rgba(0,0,0,.6)"
    },
    width: {
      type: Number,
      default: 64
    },
    radius: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: "#fff"
    },
    position: {
      type: String,
      default: "center"
    },
    zIndex: {
      type: Number,
      default: 1001
    }
  },
  data() {
    const refToastId = `fui_toast_${parseInt(Math.ceil(Math.random() * 1e6).toString(), 36)}`;
    return {
      timer: null,
      src: "",
      text: "",
      refId: refToastId,
      element: null
    };
  },
  beforeUnmount() {
    if (this.timer != null)
      clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    /**
    * 类型：(options : FuiToastShowParam)=>void
    * @tutorial https://unix.firstui.cn/
    * @description 显示提示信息，FuiToastShowParam 参数类型引入地址 '@/.../fui-types/index.uts '
    * @param {number} duration {number} 显示持续时间，单位ms，可选
    * @param {string} src {string} 提示图标，可选
    * @param {string} text {string} 提示信息，使用插槽自定义内容时可不传
    */
    show(options) {
      if (this.timer != null)
        clearTimeout(this.timer);
      this.text = options.text == null ? "" : options.text;
      this.src = options.src == null ? "" : options.src;
      const duration = options.duration == null ? 2e3 : options.duration;
      if (this.element == null) {
        this.element = this.$refs[this.refId];
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.element.style.setProperty("opacity", "1");
          this.element.style.setProperty("visibility", "visible");
          this.timer = setTimeout(() => {
            this.element.style.setProperty("opacity", "0");
            if (this.timer != null)
              clearTimeout(this.timer);
            this.timer = null;
            setTimeout(() => {
              this.element.style.setProperty("visibility", "hidden");
            }, 250);
          }, duration);
        }, 50);
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.src != ""
  }, $data.src != "" ? {
    b: $data.src,
    c: `${$props.width}rpx`,
    d: `${$props.width}rpx`,
    e: `${$props.radius}rpx`,
    f: `${$props.width}rpx`,
    g: `${$props.width}rpx`
  } : {}, {
    h: $data.text != ""
  }, $data.text != "" ? {
    i: common_vendor.t($data.text),
    j: `${$props.size}rpx`,
    k: $props.color
  } : {}, {
    l: $props.padding,
    m: $props.background,
    n: $props.zIndex,
    o: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-e023edfe"), "view", $data.refId),
    p: common_vendor.n($props.position == "bottom" ? "fui-toast__bottom" : "fui-toast__center"),
    q: $data.refId
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e023edfe"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-toast/fui-toast.js.map
