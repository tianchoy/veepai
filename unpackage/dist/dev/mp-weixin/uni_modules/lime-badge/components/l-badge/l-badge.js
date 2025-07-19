"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeShared_isNumeric_index = require("../../../lime-shared/isNumeric/index.js");
const uni_modules_limeShared_isNumber_index = require("../../../lime-shared/isNumber/index.js");
const uni_modules_limeShared_addUnit_index = require("../../../lime-shared/addUnit/index.js");
const uni_modules_limeShared_toBoolean_index = require("../../../lime-shared/toBoolean/index.js");
const uni_modules_limeBadge_components_lBadge_utils = require("./utils.js");
const name = "l-badge";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-badge",
  props: {
    color: {},
    content: {},
    dot: { type: Boolean, default: false },
    max: { default: 99 },
    offset: { default: [] },
    position: { default: "top-right" },
    shape: {},
    showZero: { type: Boolean, default: false },
    size: {}
  },
  setup(__props) {
    const props = __props;
    const context = common_vendor.getCurrentInstance();
    const classes = common_vendor.computed(() => {
      const cls = /* @__PURE__ */ new Map();
      cls.set(`${name}--fixed`, uni_modules_limeShared_toBoolean_index.toBoolean(context.slots["default"]));
      cls.set(`${name}--dot`, props.dot);
      cls.set(`${name}--${props.position}`, context.slots["default"] != null);
      return cls;
    });
    const styles = common_vendor.computed(() => {
      const style = /* @__PURE__ */ new Map();
      if (uni_modules_limeShared_toBoolean_index.toBoolean(props.color)) {
        style.set("background", props.color);
      }
      const positions = props.position.split("-");
      const offset = props.offset;
      if (offset.length == 2) {
        const x = offset[0];
        const y = offset[1];
        if (context.slots["default"] != null) {
          if (positions.length == 2) {
            const offsetY = positions[0], offsetX = positions[1];
            if (uni_modules_limeShared_isNumber_index.isNumber(y)) {
              const _y = y;
              style.set(offsetY, uni_modules_limeShared_addUnit_index.addUnit(offsetY == "top" ? _y : -_y));
            } else {
              style.set(offsetY, offsetY == "top" ? uni_modules_limeShared_addUnit_index.addUnit(y) : uni_modules_limeBadge_components_lBadge_utils.getOffsetWithMinusString(`${y}`));
            }
            if (uni_modules_limeShared_isNumber_index.isNumber(x)) {
              const _x = x;
              style.set(offsetX, uni_modules_limeShared_addUnit_index.addUnit(offsetX == "left" ? _x : -_x));
            } else {
              style.set(offsetY, offsetY == "left" ? uni_modules_limeShared_addUnit_index.addUnit(x) : uni_modules_limeBadge_components_lBadge_utils.getOffsetWithMinusString(`${x}`));
            }
          }
        } else {
          style.set("margin-top", uni_modules_limeShared_addUnit_index.addUnit(y));
          style.set("margin-left", uni_modules_limeShared_addUnit_index.addUnit(x));
        }
      }
      return style;
    });
    const hasContent = common_vendor.computed(() => {
      if (uni_modules_limeShared_toBoolean_index.toBoolean(context.slots["content"])) {
        return true;
      }
      const content = props.content;
      return content != "" && content != null && (props.showZero || content !== "0");
    });
    const renderContent = common_vendor.computed(() => {
      const dot = props.dot;
      const max = props.max;
      const content = props.content;
      if (!dot && hasContent.value) {
        if (max != 0 && uni_modules_limeShared_isNumeric_index.isNumeric(content) && parseFloat(content.toString()) > max) {
          return `${max}+`;
        }
      }
      if (dot) {
        return "";
      }
      return `${content !== null && content !== void 0 ? content : ""}`;
    });
    return (_ctx = null, _cache = null) => {
      const __returned__ = common_vendor.e(new UTSJSONObject({
        a: _ctx.$slots["default"] != null
      }), _ctx.$slots["default"] != null ? common_vendor.e(new UTSJSONObject({
        b: common_vendor.unref(hasContent) || _ctx.dot
      }), common_vendor.unref(hasContent) || _ctx.dot ? new UTSJSONObject({
        c: common_vendor.t(common_vendor.unref(renderContent)),
        d: common_vendor.sei("r0-02f1abb1", "text", "textRef"),
        e: common_vendor.n(common_vendor.unref(classes)),
        f: common_vendor.s(common_vendor.unref(styles))
      }) : new UTSJSONObject({})) : common_vendor.unref(hasContent) || _ctx.dot ? new UTSJSONObject({
        h: common_vendor.t(common_vendor.unref(renderContent)),
        i: common_vendor.n(common_vendor.unref(classes)),
        j: common_vendor.s(common_vendor.unref(styles))
      }) : new UTSJSONObject({}), new UTSJSONObject({
        g: common_vendor.unref(hasContent) || _ctx.dot
      }));
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-badge/components/l-badge/l-badge.js.map
