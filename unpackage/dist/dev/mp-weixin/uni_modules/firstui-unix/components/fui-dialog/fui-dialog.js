"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_firstuiUnix_components_fuiTypes_index = require("../fui-types/index.js");
const uni_modules_firstuiUnix_components_fuiLang_index = require("../fui-lang/index.js");
const _sfc_main = common_vendor.defineComponent({
  name: "fui-dialog",
  emits: ["onclick", "close", "update:visible"],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "fui_def"
    },
    color: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    contentColor: {
      type: String,
      default: ""
    },
    buttons: {
      type: Array,
      default: () => {
        return [];
      }
    },
    background: {
      type: String,
      default: ""
    },
    radius: {
      type: Number,
      default: 24
    },
    maskBackground: {
      type: String,
      default: ""
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 996
    }
  },
  data() {
    const refId = `fui_dialog_${parseInt(Math.ceil(Math.random() * 1e6).toString(), 36)}`;
    return {
      refId,
      isShow: false,
      element: null,
      current: -1,
      btns: [],
      d_title: ""
    };
  },
  computed: {
    locale() {
      return uni_modules_firstuiUnix_components_fuiLang_index.fuiLang.locale;
    },
    getTitleStyl() {
      const mp = /* @__PURE__ */ new Map();
      if (this.color != "")
        mp.set("color", this.color);
      return mp;
    },
    getContentStyl() {
      const mp = /* @__PURE__ */ new Map();
      if (this.contentColor != "")
        mp.set("color", this.contentColor);
      return mp;
    }
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
    },
    locale: {
      handler(val) {
        const lang = uni_modules_firstuiUnix_components_fuiLang_index.getFuiLocaleLang(val);
        const dialog = lang["dialog"];
        this.d_title = this.title == "fui_def" ? dialog.getString("title") : this.title;
        const btns = UTS.JSON.parse(UTS.JSON.stringify(this.buttons));
        if (btns == null || btns.length == 0) {
          const param = [new uni_modules_firstuiUnix_components_fuiTypes_index.FuiDialogButtonsParam({
            text: dialog.getString("cancel")
          }), new uni_modules_firstuiUnix_components_fuiTypes_index.FuiDialogButtonsParam({
            text: dialog.getString("confirm"),
            primary: true
          })];
          this.getButtons(param);
        } else {
          this.getButtons(btns);
        }
      },
      immediate: true
    },
    buttons(vals) {
      this.getButtons(vals);
    },
    title(val) {
      if (val != "fui_def") {
        this.d_title = this.title;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.isShow)
          this.close();
      }, 50);
    });
  },
  methods: {
    getBtnStyl(color = null) {
      const mp = /* @__PURE__ */ new Map();
      if (color != "" && color != null)
        mp.set("color", color);
      return mp;
    },
    getButtons(vals) {
      this.btns = [];
      this.$nextTick(() => {
        this.btns = vals;
      });
    },
    handleClick(index) {
      const item = this.btns[index];
      item.index = index;
      this.$emit("onclick", item);
    },
    maskClose() {
      if (!this.maskClosable)
        return null;
      this.$emit("close");
      this.$emit("update:visible", false);
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
      this.element.style.setProperty("opacity", visible ? "1" : "0");
      if (visible) {
        this.element.style.setProperty("visibility", "visible");
      } else {
        setTimeout(() => {
          this.element.style.setProperty("visibility", "hidden");
        }, 250);
      }
    },
    onTouchstart(index) {
      this.current = index;
    },
    onEnd() {
      this.current = -1;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.title != ""
  }, $props.title != "" ? {
    b: common_vendor.t($data.d_title),
    c: $props.color == "" ? 1 : "",
    d: common_vendor.s($options.getTitleStyl)
  } : {}, {
    e: $props.content != ""
  }, $props.content != "" ? {
    f: common_vendor.t($props.content),
    g: $props.contentColor == "" ? 1 : "",
    h: common_vendor.s($options.getContentStyl)
  } : {}, {
    i: $props.title == "" ? 1 : "",
    j: common_vendor.f($data.btns, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: common_vendor.s($options.getBtnStyl(item.color)),
        c: index == $data.current ? 1 : "",
        d: index == 0 ? 1 : "",
        e: (item.color == null || item.color == "") && (item.primary == null || item.primary == false) ? 1 : "",
        f: (item.color == null || item.color == "") && item.primary == true ? 1 : "",
        g: common_vendor.o(($event) => $options.handleClick(index), index),
        h: common_vendor.o(($event) => $options.onTouchstart(index), index),
        i: common_vendor.o((...args) => $options.onEnd && $options.onEnd(...args), index),
        j: common_vendor.o((...args) => $options.onEnd && $options.onEnd(...args), index),
        k: index
      };
    }),
    k: $props.background == "" ? 1 : "",
    l: $props.background,
    m: `${$props.radius}rpx`,
    n: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-11b2abcd"), "view", $data.refId),
    o: $data.refId,
    p: $props.maskBackground,
    q: $props.zIndex,
    r: $props.maskBackground == "" ? 1 : "",
    s: common_vendor.o((...args) => $options.maskClose && $options.maskClose(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-11b2abcd"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/firstui-unix/components/fui-dialog/fui-dialog.js.map
