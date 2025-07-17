"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-date-strip-item",
  props: {
    dates: { default: [] },
    color: {},
    activeBgColor: {},
    activeColor: {},
    bgColor: {},
    radius: {},
    gridWidth: {},
    switchMode: { default: "week" },
    shape: { default: "square" }
  },
  emits: ["click"],
  setup(__props, _a) {
    var __emit = _a.emit;
    const emit = __emit;
    const props = __props;
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (props.gridWidth != null && props.switchMode == "none") {
        style.set("width", props.gridWidth);
      }
      return style;
    });
    const onClick = (day) => {
      common_vendor.index.__f__("log", "at uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue:88", day);
      emit("click", day);
    };
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.f(_ctx.dates, (item = null, k0 = null, i0 = null) => {
          return common_vendor.e({
            a: item.prefix != null
          }, item.prefix != null ? {
            b: common_vendor.t(item.prefix),
            c: item.type == "selected" && _ctx.shape == "square" ? 1 : "",
            d: item.type == "selected" && _ctx.shape == "none" ? 1 : "",
            e: common_vendor.s(item.type == "selected" && _ctx.activeColor != null ? {
              color: _ctx.activeColor
            } : {})
          } : {}, {
            f: common_vendor.t(item.text),
            g: item.type == "selected" && _ctx.shape != "none" ? 1 : "",
            h: item.type == "selected" && _ctx.shape == "none" ? 1 : "",
            i: common_vendor.s(item.type == "selected" && _ctx.activeColor != null ? {
              color: _ctx.activeColor
            } : {}),
            j: item.suffix == "true"
          }, item.suffix == "true" ? {
            k: common_assets._imports_0$9
          } : {}, {
            l: _ctx.shape == "circle" && item.type == "selected" ? 1 : "",
            m: common_vendor.s(item.type == "selected" && _ctx.shape == "circle" && _ctx.activeBgColor != null ? {
              background: _ctx.activeBgColor
            } : {}),
            n: common_vendor.s(item.type == "selected" && _ctx.shape == "square" && _ctx.activeBgColor != null ? {
              background: _ctx.activeBgColor
            } : {}),
            o: common_vendor.n({
              "l-date-strip__grid--active-bg": _ctx.shape == "square" && item.type == "selected",
              // 'l-date-strip__grid--disabled': item.type == 'disabled',
              "l-date-strip__grid--selected": item.type == "selected"
            }),
            p: common_vendor.o(($event = null) => {
              return onClick(item);
            }, item.key),
            q: item.key
          });
        }),
        b: common_vendor.s(_ctx.shape == "square" && _ctx.radius != null ? {
          "border-radius": _ctx.radius
        } : {}),
        c: common_vendor.s(common_vendor.unref(styles)),
        d: common_vendor.s(_ctx.shape == "square" && _ctx.radius != null ? {
          "border-radius": _ctx.radius
        } : {}),
        e: common_vendor.n("l-date-strip__grid--" + _ctx.shape),
        f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        g: common_vendor.n("l-date-strip__item--" + _ctx.switchMode)
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.js.map
