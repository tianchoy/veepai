"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_l_icon_1 = common_vendor.resolveComponent("l-icon");
  const _easycom_l_badge_1 = common_vendor.resolveComponent("l-badge");
  (_easycom_l_icon_1 + _easycom_l_badge_1)();
}
const _easycom_l_icon = () => "../../../lime-icon/components/l-icon/l-icon.js";
const _easycom_l_badge = () => "../../../lime-badge/components/l-badge/l-badge.js";
if (!Math) {
  (_easycom_l_icon + _easycom_l_badge)();
}
const name = "l-grid-item";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-grid-item",
  props: {
    text: {},
    description: {},
    url: {},
    openType: { default: "navigateTo" },
    icon: {},
    prefix: {},
    image: {},
    imageWidth: {},
    imageHeight: {},
    bgColor: {},
    padding: {},
    layout: { default: "vertical" },
    dot: { type: Boolean, default: false },
    iconSize: {},
    iconColor: {},
    badge: {},
    borderColor: {},
    lStyle: {},
    lImageStyle: {},
    lTitleStyle: {},
    lDescriptionStyle: {},
    lClass: {},
    lClassIcon: {}
  },
  emits: ["click"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const emits = __emit;
    const props = __props;
    const parent = common_vendor.inject("limeGrid", null);
    const instance = common_vendor.getCurrentInstance();
    const index = common_vendor.computed(() => {
      var _a2;
      return (_a2 = parent === null || parent === void 0 ? null : parent.children.value.indexOf(instance.uid)) !== null && _a2 !== void 0 ? _a2 : -1;
    });
    const column = common_vendor.computed(() => {
      var _a2;
      return (_a2 = parent === null || parent === void 0 ? null : parent.props.column) !== null && _a2 !== void 0 ? _a2 : 0;
    });
    const gutter = common_vendor.computed(() => {
      var _a2;
      return (_a2 = parent === null || parent === void 0 ? null : parent.props.gutter) !== null && _a2 !== void 0 ? _a2 : 0;
    });
    common_vendor.computed(() => {
      var _a2;
      return (_a2 = parent === null || parent === void 0 ? null : parent.width.value) !== null && _a2 !== void 0 ? _a2 : 0;
    });
    const hover = common_vendor.computed(() => {
      var _a2;
      return (_a2 = parent === null || parent === void 0 ? null : parent.props.hover) !== null && _a2 !== void 0 ? _a2 : false;
    });
    const classes = common_vendor.computed(() => {
      var _a2, _b;
      const cls = /* @__PURE__ */ new Map();
      cls.set(`${name}--${props.layout}`, true);
      cls.set(`${name}--${(_a2 = parent === null || parent === void 0 ? null : parent.props.align) !== null && _a2 !== void 0 ? _a2 : "center"}`, true);
      cls.set(`${name}--bordered`, (_b = parent === null || parent === void 0 ? null : parent.props.border) !== null && _b !== void 0 ? _b : false);
      return cls;
    });
    const size = common_vendor.computed(() => {
      if (column.value > 4 || column.value == 0)
        return "small";
      return column.value < 4 ? "large" : "middle";
    });
    const imageClasses = common_vendor.computed(() => {
      const cls = /* @__PURE__ */ new Map();
      cls.set(`${name}__image--${size.value}`, true);
      return cls;
    });
    const titleClasses = common_vendor.computed(() => {
      const cls = /* @__PURE__ */ new Map();
      cls.set(`${name}__title--${size.value}`, true);
      return cls;
    });
    const innerImageStyle = common_vendor.ref("");
    const styles = common_vendor.computed(() => {
      var _a2, _b;
      const style = /* @__PURE__ */ new Map();
      parent === null || parent === void 0 ? null : parent.props.gridWidth;
      const percent = `calc((100% - ${(column.value - 1) * gutter.value}px) / ${column.value})`;
      style.set(`flex-basis`, percent);
      if (props.imageWidth) {
        if (size.value == "large") {
          style.set(`--l-grid-item-image-width`, props.imageWidth);
        } else {
          style.set(`--l-grid-item-image-${size.value}-width`, props.imageWidth);
        }
      }
      if (props.imageHeight) {
        if (size.value == "large") {
          style.set(`--l-grid-item-image-height`, props.imageHeight);
        } else {
          style.set(`--l-grid-item-image-${size.value}-height`, props.imageHeight);
        }
      }
      style.set(`--l-grid-item-image-height`, percent);
      if (index.value % column.value != column.value - 1) {
        style.set("margin-right", `${gutter.value}px`);
      }
      if (index.value >= column.value) {
        style.set(`margin-top`, `${gutter.value}px`);
      }
      if (props.borderColor != null) {
        style.set("--l-grid-item-border-color", props.borderColor);
      }
      const bgColor = (_a2 = props.bgColor) !== null && _a2 !== void 0 ? _a2 : parent === null || parent === void 0 ? null : parent.props.bgColor;
      if (bgColor != null) {
        style.set("background", bgColor);
      }
      const padding = (_b = props.padding) !== null && _b !== void 0 ? _b : parent === null || parent === void 0 ? null : parent.props.padding;
      if (padding != null) {
        style.set("padding", padding);
      }
      return style;
    });
    const imageStyle = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      return style;
    });
    const onClick = (e) => {
      emits("click", e);
      if (props.url == null)
        return null;
      switch (props.openType) {
        case "switchTab":
          common_vendor.index.switchTab({ url: props.url });
          break;
        case "reLaunch":
          common_vendor.index.reLaunch({ url: props.url });
          break;
        case "redirectTo":
          common_vendor.index.redirectTo({ url: props.url });
          break;
        default:
          common_vendor.index.navigateTo({ url: props.url });
          break;
      }
    };
    common_vendor.watchEffect(() => {
      common_vendor.nextTick$1(() => {
        var _a2;
        innerImageStyle.value = (_a2 = props.lImageStyle) !== null && _a2 !== void 0 ? _a2 : "";
      });
    });
    common_vendor.onBeforeMount(() => {
      if (instance != null && parent != null) {
        parent.children.value.push(instance.uid);
      }
    });
    common_vendor.onUnmounted(() => {
      if (instance != null && parent != null) {
        parent.children.value = parent.children.value.filter((it) => {
          return it != instance.uid;
        });
      }
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: (_ctx.dot || _ctx.badge != null) && (_ctx.icon != null || _ctx.image != null || _ctx.$slots["icon"] != null)
      }), (_ctx.dot || _ctx.badge != null) && (_ctx.icon != null || _ctx.image != null || _ctx.$slots["icon"] != null) ? common_vendor.e(new UTSJSONObject({
        b: _ctx.icon != null
      }), _ctx.icon != null ? new UTSJSONObject({
        c: common_vendor.p(new UTSJSONObject({
          ["l-class"]: _ctx.lClassIcon,
          prefix: _ctx.prefix,
          name: _ctx.icon,
          color: _ctx.iconColor,
          size: _ctx.iconSize
        })),
        d: common_vendor.n(common_vendor.unref(imageClasses))
      }) : _ctx.image != null ? new UTSJSONObject({
        f: common_vendor.n(common_vendor.unref(imageClasses)),
        g: common_vendor.s(common_vendor.unref(imageStyle)),
        h: common_vendor.s(common_vendor.unref(innerImageStyle)),
        i: _ctx.image
      }) : new UTSJSONObject({}), new UTSJSONObject({
        e: _ctx.image != null,
        j: common_vendor.p(new UTSJSONObject({
          content: _ctx.badge,
          dot: _ctx.dot
        }))
      })) : _ctx.icon != null || _ctx.image != null || _ctx.$slots["icon"] != null ? common_vendor.e(new UTSJSONObject({
        l: _ctx.icon != null
      }), _ctx.icon != null ? new UTSJSONObject({
        m: common_vendor.p(new UTSJSONObject({
          ["l-class"]: _ctx.lClassIcon,
          prefix: _ctx.prefix,
          name: _ctx.icon,
          color: _ctx.iconColor,
          size: _ctx.iconSize
        })),
        n: common_vendor.n(common_vendor.unref(imageClasses))
      }) : _ctx.image != null ? new UTSJSONObject({
        p: common_vendor.n(common_vendor.unref(imageClasses)),
        q: common_vendor.s(common_vendor.unref(imageStyle)),
        r: common_vendor.s(common_vendor.unref(innerImageStyle)),
        s: _ctx.image
      }) : new UTSJSONObject({}), new UTSJSONObject({
        o: _ctx.image != null
      })) : new UTSJSONObject({}), new UTSJSONObject({
        k: _ctx.icon != null || _ctx.image != null || _ctx.$slots["icon"] != null,
        t: common_vendor.t(_ctx.text),
        v: common_vendor.s(_ctx.lTitleStyle),
        w: common_vendor.n(common_vendor.unref(titleClasses)),
        x: common_vendor.t(_ctx.description),
        y: common_vendor.s(_ctx.lDescriptionStyle),
        z: common_vendor.sei(common_vendor.gei(_ctx, "", "r0-1b8c19b2"), "view", "gridRef"),
        A: common_vendor.o(onClick),
        B: common_vendor.n(common_vendor.unref(classes)),
        C: common_vendor.n(_ctx.lClass),
        D: common_vendor.unref(hover) ? "l-grid-item--hover" : "",
        E: common_vendor.s(common_vendor.unref(styles)),
        F: common_vendor.s(_ctx.lStyle)
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-grid/components/l-grid-item/l-grid-item.js.map
