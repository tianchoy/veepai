"use strict";
const common_vendor = require("../../../../common/vendor.js");
const name = "l-checkbox";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(Object.assign({
  mixins: [new UTSJSONObject({
    props: new UTSJSONObject({
      checked: new UTSJSONObject({
        type: [null, Boolean],
        default: null
      }),
      modelValue: new UTSJSONObject({
        type: [null, Boolean],
        default: null
      })
    })
  })]
}, { __name: "l-checkbox", props: {
  defaultChecked: { type: Boolean, default: false },
  label: {},
  indeterminate: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  size: { default: "medium" },
  name: {},
  checkAll: { type: Boolean, default: false },
  value: {},
  icon: { default: "rectangle" },
  fontSize: {},
  iconSize: {},
  checkedColor: {},
  iconBgColor: {},
  iconBorderColor: {},
  iconDisabledColor: {},
  iconDisabledBgColor: {},
  labelStyle: {}
}, emits: ["update:modelValue", "change"], setup(__props, _a) {
  var __emit = _a.emit;
  const emit = __emit;
  const props = __props;
  const instance = common_vendor.getCurrentInstance();
  const formDisabled = common_vendor.inject("formDisabled", null);
  const formReadonly = common_vendor.inject("formReadonly", null);
  const checkboxGroup = common_vendor.inject("limeCheckboxGroup", null);
  const checkboxGroupValue = common_vendor.inject("limeCheckboxGroupValue", null);
  const checkboxGroupStatus = common_vendor.inject("limeCheckboxGroupStatus", null);
  const checkboxGroupCheckedSet = common_vendor.inject("limeCheckboxGroupCheckedSet", null);
  const manageChildInList = common_vendor.inject("limeCheckboxGroupManageChildInList", null);
  const onCheckedChange = common_vendor.inject("limeCheckboxGroupOnCheckedChange", null);
  if (manageChildInList != null) {
    manageChildInList(instance.proxy, true);
  }
  const max = common_vendor.computed(() => {
    var _a2;
    return (_a2 = checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.max) !== null && _a2 !== void 0 ? _a2 : -1;
  });
  const _innerChecked = common_vendor.ref(props.defaultChecked);
  const innerChecked = common_vendor.computed({
    set(value) {
      _innerChecked.value = value;
      emit("update:modelValue", value);
      emit("change", value);
    },
    get() {
      var _a2;
      const value = (_a2 = props.checked) !== null && _a2 !== void 0 ? _a2 : props.modelValue;
      if (value != null)
        return value;
      return _innerChecked.value;
    }
  });
  const isChecked = common_vendor.computed(() => {
    var _a2, _b;
    if (props.checkAll) {
      const checkAllStatus = (_a2 = checkboxGroupStatus === null || checkboxGroupStatus === void 0 ? null : checkboxGroupStatus.value) !== null && _a2 !== void 0 ? _a2 : "uncheck";
      return checkAllStatus == "checked" || checkAllStatus == "indeterminate";
    }
    const value = (_b = props.value) !== null && _b !== void 0 ? _b : props.name;
    if (checkboxGroupCheckedSet != null && value != null) {
      return checkboxGroupCheckedSet.value.has(value);
    }
    return innerChecked.value;
  });
  const isDisabled = common_vendor.computed(() => {
    var _a2, _b;
    if (max.value > -1 && checkboxGroupValue != null) {
      return max.value <= checkboxGroupValue.value.length && !isChecked.value;
    }
    if (props.disabled)
      return props.disabled;
    return (_b = (_a2 = formDisabled === null || formDisabled === void 0 ? null : formDisabled.value) !== null && _a2 !== void 0 ? _a2 : checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.disabled) !== null && _b !== void 0 ? _b : false;
  });
  const isReadonly = common_vendor.computed(() => {
    var _a2, _b;
    if (props.readonly)
      return props.readonly;
    return (_b = (_a2 = formReadonly === null || formReadonly === void 0 ? null : formReadonly.value) !== null && _a2 !== void 0 ? _a2 : checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.readonly) !== null && _b !== void 0 ? _b : false;
  });
  const isIndeterminate = common_vendor.computed(() => {
    if (props.checkAll && checkboxGroupStatus != null)
      return checkboxGroupStatus.value == "indeterminate";
    return props.indeterminate;
  });
  common_vendor.computed(() => {
    var _a2;
    return (_a2 = checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.icon) !== null && _a2 !== void 0 ? _a2 : props.icon;
  });
  common_vendor.computed(() => {
    var _a2;
    return (_a2 = checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.size) !== null && _a2 !== void 0 ? _a2 : props.size;
  });
  const innerIconSize = common_vendor.computed(() => {
    var _a2;
    return (_a2 = checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.iconSize) !== null && _a2 !== void 0 ? _a2 : props.iconSize;
  });
  const innerFontSize = common_vendor.computed(() => {
    var _a2;
    return (_a2 = checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.fontSize) !== null && _a2 !== void 0 ? _a2 : props.fontSize;
  });
  const innerCheckedColor = common_vendor.computed(() => {
    var _a2;
    return (_a2 = checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.checkedColor) !== null && _a2 !== void 0 ? _a2 : props.checkedColor;
  });
  common_vendor.computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.iconBgColor) !== null && _a2 !== void 0 ? _a2 : checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.iconBgColor) !== null && _b !== void 0 ? _b : "white";
  });
  const innerIconBorderColor = common_vendor.computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.iconBorderColor) !== null && _a2 !== void 0 ? _a2 : checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.iconBorderColor) !== null && _b !== void 0 ? _b : "#c5c5c5";
  });
  const innerIconDisabledColor = common_vendor.computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.iconDisabledColor) !== null && _a2 !== void 0 ? _a2 : checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.iconDisabledColor) !== null && _b !== void 0 ? _b : "#c5c5c5";
  });
  const innerIconDisabledBgColor = common_vendor.computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.iconDisabledBgColor) !== null && _a2 !== void 0 ? _a2 : checkboxGroup === null || checkboxGroup === void 0 ? null : checkboxGroup.iconDisabledBgColor) !== null && _b !== void 0 ? _b : "#f3f3f3";
  });
  const rootCasses = common_vendor.computed(() => {
    const cls = /* @__PURE__ */ new Map();
    cls.set(`${name}--${props.size}`, true);
    cls.set(`${name}--disabled`, isDisabled.value);
    return cls;
  });
  const iconClasses = common_vendor.computed(() => {
    const cls = /* @__PURE__ */ new Map();
    cls.set(`${name}__icon--disabled`, isDisabled.value);
    cls.set(`${name}__icon--${props.icon}`, true);
    cls.set(`${name}__icon--checked`, isChecked.value);
    cls.set(`${name}__icon--indeterminate`, isIndeterminate.value);
    return cls;
  });
  const labelClass = common_vendor.computed(() => {
    const cls = /* @__PURE__ */ new Map();
    cls.set(`${name}__label--disabled`, isDisabled.value);
    return cls;
  });
  const styles = common_vendor.computed(() => {
    const style = /* @__PURE__ */ new Map();
    if (checkboxGroup != null && checkboxGroup.gap != null) {
      style.set(checkboxGroup.direction == "horizontal" ? "margin-right" : "margin-bottom", checkboxGroup.gap);
    }
    if (innerCheckedColor.value != null) {
      style.set("--l-checkbox-icon-checked-color", innerCheckedColor.value);
    }
    if (innerIconBorderColor.value != null) {
      style.set("--l-checkbox-icon-border-color", innerIconBorderColor.value);
    }
    if (innerIconDisabledColor.value != null) {
      style.set("--l-checkbox-icon-disabled-color", innerIconDisabledColor.value);
    }
    if (innerIconDisabledBgColor.value != null) {
      style.set("--l-checkbox-icon-disabled-bg-color", innerIconDisabledBgColor.value);
    }
    if (innerFontSize.value != null) {
      style.set("--l-checkbox-font-size", innerFontSize.value);
    }
    return style;
  });
  const iconStyle = common_vendor.computed(() => {
    const style = /* @__PURE__ */ new Map();
    if (innerIconSize.value != null) {
      style.set("width", innerIconSize.value);
      style.set("height", innerIconSize.value);
      style.set("--l-checkbox-icon-size", innerIconSize.value);
    }
    if (innerCheckedColor.value != null) {
      style.set("--l-checkbox-icon-checked-color", innerCheckedColor.value);
    }
    return style;
  });
  const labelStyles = common_vendor.computed(() => {
    var _a2;
    if (typeof props.labelStyle == "string") {
      return `${props.labelStyle};` + (innerIconSize.value != null ? `font-size: ${innerIconSize.value}` : "");
    }
    if (typeof props.labelStyle == "object") {
      return UTSJSONObject.assign(new UTSJSONObject({}), (_a2 = props.labelStyle) !== null && _a2 !== void 0 ? _a2 : new UTSJSONObject({}), innerFontSize.value != null ? new UTSJSONObject({ "font-size": innerFontSize.value }) : new UTSJSONObject({}));
    }
    return new UTSJSONObject({});
  });
  const handleChange = (e) => {
    var _a2;
    if (isDisabled.value || isReadonly.value)
      return null;
    const value = !isChecked.value;
    innerChecked.value = value;
    if (onCheckedChange != null) {
      onCheckedChange({
        checked: value,
        checkAll: props.checkAll,
        value: (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : props.name
        //?? instance.uid
      });
    }
  };
  common_vendor.onBeforeUnmount(() => {
    if (manageChildInList != null) {
      manageChildInList(instance.proxy, false);
    }
  });
  return (_ctx = null, _cache = null) => {
    const __returned__ = common_vendor.e(new UTSJSONObject({
      a: common_vendor.sei("r0-4350ceba", "view", "iconRef"),
      b: common_vendor.n(common_vendor.unref(iconClasses)),
      c: common_vendor.s(common_vendor.unref(iconStyle)),
      d: common_vendor.r("icon", new UTSJSONObject({
        checked: common_vendor.unref(isChecked),
        disabled: common_vendor.unref(isDisabled)
      })),
      e: _ctx.label != null || _ctx.$slots["default"] != null
    }), _ctx.label != null || _ctx.$slots["default"] != null ? new UTSJSONObject({
      f: common_vendor.t(_ctx.label),
      g: common_vendor.s(common_vendor.unref(labelStyles)),
      h: common_vendor.n(common_vendor.unref(labelClass))
    }) : new UTSJSONObject({}), new UTSJSONObject({
      i: common_vendor.r("checkbox", new UTSJSONObject({
        checked: common_vendor.unref(isChecked),
        disabled: common_vendor.unref(isDisabled)
      })),
      j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
      k: common_vendor.n(common_vendor.unref(rootCasses)),
      l: common_vendor.s(common_vendor.unref(styles)),
      m: common_vendor.o(handleChange)
    }));
    return __returned__;
  };
} }));
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-checkbox/components/l-checkbox/l-checkbox.js.map
