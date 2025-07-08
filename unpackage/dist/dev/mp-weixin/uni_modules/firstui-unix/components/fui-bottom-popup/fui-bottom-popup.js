"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-bottom-popup",
  emits: ["close", "update:visible"],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: "#fff"
    },
    radius: {
      type: Number,
      default: 24
    },
    zIndex: {
      type: Number,
      default: 996
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    maskBackground: {
      type: String,
      default: "rgba(0,0,0,.6)"
    },
    safeArea: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const refId = `fui_bp_${parseInt(Math.ceil(Math.random() * 1e6).toString(), 36)}`;
    const refMkId = `fui_bpmk_${parseInt(Math.ceil(Math.random() * 1e6).toString(), 36)}`;
    return {
      refId,
      refMkId,
      iphoneX: false,
      isShow: false,
      element: null,
      mkElement: null
    };
  },
  watch: {
    visible: {
      handler(newVal) {
        if (newVal) {
          this.open();
        } else {
          if (this.isShow)
            this.close();
        }
      },
      immediate: true
    }
  },
  created() {
    this.iphoneX = this.isPhoneX();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.visible)
          this.close();
      }, 50);
    });
  },
  methods: {
    handleClose() {
      if (!this.maskClosable)
        return null;
      this.$emit("close");
      this.$emit("update:visible", false);
    },
    isPhoneX() {
      if (!this.safeArea)
        return false;
      const res = common_vendor.index.getSystemInfoSync();
      let iphonex = false;
      let models = ["iphonex", "iphonexr", "iphonexsmax"];
      for (let i = 11; i < 20; i++) {
        models.push(`iphone${i}`);
        models.push(`iphone${i}mini`);
        models.push(`iphone${i}pro`);
        models.push(`iphone${i}promax`);
      }
      const model = res.model.replace(/\s/g, "").toLowerCase();
      const newModel = model.split("<")[0];
      if (models.includes(model) || models.includes(newModel) || res.safeAreaInsets.bottom > 0) {
        iphonex = true;
      }
      return iphonex;
    },
    open() {
      this.isShow = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this._animation(true);
        }, 50);
      });
    },
    close() {
      this.isShow = false;
      this._animation(false);
    },
    _animation(visible) {
      if (this.element == null) {
        this.element = this.$refs[this.refId];
      }
      if (this.mkElement == null) {
        this.mkElement = this.$refs[this.refMkId];
      }
      this.element.style.setProperty("transform", `translateY(${visible ? "0" : "100%"})`);
      this.element.style.setProperty("opacity", visible ? "1" : "0");
      this.mkElement.style.setProperty("opacity", visible ? "1" : "0");
      if (visible) {
        this.mkElement.style.setProperty("visibility", "visible");
        this.element.style.setProperty("visibility", "visible");
      } else {
        setTimeout(() => {
          this.mkElement.style.setProperty("visibility", "hidden");
          this.element.style.setProperty("visibility", "hidden");
        }, 300);
      }
    },
    stop() {
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sei("r0-fd1d1b29", "view", $data.refId),
    b: common_vendor.o((...args) => $options.stop && $options.stop(...args)),
    c: $data.refId,
    d: $data.iphoneX && $props.safeArea ? 1 : "",
    e: `${$props.radius}rpx`,
    f: `${$props.radius}rpx`,
    g: $props.background,
    h: common_vendor.sei(common_vendor.gei(_ctx, "", "r1-fd1d1b29"), "view", $data.refMkId),
    i: $props.zIndex,
    j: $props.maskBackground,
    k: common_vendor.o((...args) => $options.handleClose && $options.handleClose(...args)),
    l: $data.refMkId
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fd1d1b29"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-bottom-popup/fui-bottom-popup.js.map
