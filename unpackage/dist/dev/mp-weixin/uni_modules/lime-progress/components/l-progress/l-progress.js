"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_addUnit_index = require("../../../lime-shared/addUnit/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-progress",
  props: /* @__PURE__ */ common_vendor.mergeModels(new UTSJSONObject({
    showInfo: { type: Boolean, default: false },
    infoType: { default: "outer" },
    infoAlign: { default: "end" },
    strokeColor: {},
    trailColor: {},
    linecap: {},
    infoColor: {},
    fontSize: {},
    strokeWidth: {}
  }), new UTSJSONObject({
    "percent": { type: Number, default: 0 },
    "percentModifiers": {}
  })),
  emits: ["update:percent"],
  setup(__props) {
    const props = __props;
    const percent = common_vendor.useModel(__props, "percent");
    const classes = common_vendor.computed(() => {
      const _class = /* @__PURE__ */ new Map();
      if (props.infoType == "outer") {
        _class.set("l-progress--outer", true);
      }
      if (props.infoType == "inner") {
        _class.set("l-progress--inner", true);
      }
      return _class;
    });
    const textRef = common_vendor.ref(null);
    const progressBgRef = common_vendor.ref(null);
    const styles = common_vendor.computed(() => {
      const _style = /* @__PURE__ */ new Map();
      _style.set("width", `${percent.value}%`);
      if (props.strokeColor != null) {
        _style.set("background", `var(--l-progress-stroke-color, ${props.strokeColor})`);
      }
      if (props.strokeWidth != null) {
        _style.set("height", `var(--l-progress-stroke-width, ${uni_modules_limeShared_addUnit_index.addUnit(props.strokeWidth)})`);
      }
      if (props.infoType == "inner") {
        if (props.infoAlign == "end") {
          _style.set("align-items", `flex-end`);
        } else {
          _style.set("align-items", `flex-start`);
        }
      }
      return _style;
    });
    const textStyle = common_vendor.computed(() => {
      const _style = /* @__PURE__ */ new Map();
      if (props.infoColor != null) {
        _style.set("color", props.infoColor);
      }
      return _style;
    });
    const innerStyle = common_vendor.computed(() => {
      const _style = /* @__PURE__ */ new Map();
      if (props.trailColor != null) {
        _style.set("background", props.trailColor);
      }
      return _style;
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: _ctx.showInfo && _ctx.infoAlign == "start" && _ctx.infoType == "outer"
      }), _ctx.showInfo && _ctx.infoAlign == "start" && _ctx.infoType == "outer" ? new UTSJSONObject({
        b: common_vendor.t(percent.value + "%"),
        c: common_vendor.s(common_vendor.unref(textStyle))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        d: _ctx.showInfo && _ctx.infoType == "inner"
      }), _ctx.showInfo && _ctx.infoType == "inner" ? new UTSJSONObject({
        e: common_vendor.t(percent.value + "%"),
        f: common_vendor.sei("r0-4e4e7dcd", "text", textRef, new UTSJSONObject({
          "k": "textRef"
        })),
        g: common_vendor.s(common_vendor.unref(textStyle))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        h: common_vendor.sei("r1-4e4e7dcd", "view", progressBgRef, new UTSJSONObject({
          "k": "progressBgRef"
        })),
        i: common_vendor.s(common_vendor.unref(styles)),
        j: common_vendor.sei("r2-4e4e7dcd", "view", "progressInnerRef"),
        k: common_vendor.s(common_vendor.unref(innerStyle)),
        l: _ctx.showInfo && _ctx.infoAlign == "end" && _ctx.infoType == "outer"
      }), _ctx.showInfo && _ctx.infoAlign == "end" && _ctx.infoType == "outer" ? new UTSJSONObject({
        m: common_vendor.t(percent.value + "%"),
        n: common_vendor.s(common_vendor.unref(textStyle))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        o: common_vendor.sei(common_vendor.gei(_ctx, "", "r3-4e4e7dcd"), "view", "progressRef"),
        p: common_vendor.n(common_vendor.unref(classes))
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-progress/components/l-progress/l-progress.js.map
