"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeCheckbox_components_lCheckboxGroup_utils = require("./utils.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "l-checkbox-group",
  props: {
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    max: {},
    name: {},
    value: {},
    modelValue: {},
    defaultValue: {},
    size: { default: "medium" },
    direction: { default: "horizontal" },
    gap: {},
    icon: { default: "rectangle" },
    fontSize: {},
    iconSize: {},
    checkedColor: {},
    iconBgColor: {},
    iconBorderColor: {},
    iconDisabledColor: {},
    iconDisabledBgColor: {}
  },
  emits: ["update:value", "update:modelValue", "change"],
  setup(__props, _a) {
    var _b;
    var __expose = _a.expose, __emit = _a.emit;
    const emit = __emit;
    const props = __props;
    const _innerValue = common_vendor.ref((_b = props.defaultValue) !== null && _b !== void 0 ? _b : []);
    const innerValue = common_vendor.computed({
      set(value) {
        _innerValue.value = value;
        emit("change", value);
        emit("update:value", value);
        emit("update:modelValue", value);
      },
      get() {
        var _a2, _b2;
        return (_b2 = (_a2 = props.value) !== null && _a2 !== void 0 ? _a2 : props.modelValue) !== null && _b2 !== void 0 ? _b2 : _innerValue.value;
      }
    });
    const checkedSet = common_vendor.computed(() => {
      const set = /* @__PURE__ */ new Set();
      if (Array.isArray(innerValue.value)) {
        innerValue.value.forEach((item = null) => {
          set.add(item);
        });
      }
      return set;
    });
    const children = common_vendor.reactive([]);
    const checkAllStatus = uni_modules_limeCheckbox_components_lCheckboxGroup_utils.setCheckAllStatus(children, innerValue, checkedSet);
    const maxExceeded = common_vendor.computed(() => {
      return props.max != null && innerValue.value.length == props.max;
    });
    const manageChildInList = (child = null, shouldAdd) => {
      const index = children.indexOf(child);
      if (shouldAdd) {
        if (index != -1)
          return null;
        children.push(child);
      } else {
        if (index == -1)
          return null;
        children.splice(index, 1);
      }
    };
    const handleCheckboxChange = (item) => {
      const currentValue = item.value;
      if (Array.isArray(innerValue.value)) {
        if (currentValue == null)
          return null;
        const val = [...innerValue.value];
        if (item.checked) {
          val.push(currentValue);
        } else {
          const i = val.indexOf(currentValue);
          val.splice(i, 1);
        }
        innerValue.value = val;
      } else {
        common_vendor.index.__f__("warn", "at uni_modules/lime-checkbox/components/l-checkbox-group/l-checkbox-group.uvue:105", `CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof innerValue.value}`);
      }
    };
    const getAllCheckboxValue = () => {
      var _a2;
      const arr = [];
      for (let i = 0, len = children.length; i < len; i++) {
        const item = children[i];
        const value = (_a2 = item.value) !== null && _a2 !== void 0 ? _a2 : item.name;
        if (item.checkAll)
          continue;
        if (value == null)
          continue;
        if (arr.includes(value))
          continue;
        arr.push(value);
        if (maxExceeded.value)
          break;
      }
      return arr;
    };
    const toggleAllCheckboxValues = () => {
      var _a2;
      const arr = [];
      for (let i = 0, len = children.length; i < len; i++) {
        const item = children[i];
        const value = (_a2 = item.value) !== null && _a2 !== void 0 ? _a2 : item.name;
        if (item.checkAll)
          continue;
        if (value == null)
          continue;
        if (!checkedSet.value.has(value)) {
          arr.push(value);
        }
        if (maxExceeded.value)
          break;
      }
      return arr;
    };
    const onCheckAllChange = (checked) => {
      const value = checked ? getAllCheckboxValue() : [];
      innerValue.value = value;
    };
    const onCheckedChange = (item) => {
      if (item.checkAll) {
        onCheckAllChange(item.checked);
      } else {
        handleCheckboxChange(item);
      }
    };
    const toggleAll = (checked) => {
      const value = checked ? getAllCheckboxValue() : toggleAllCheckboxValues();
      innerValue.value = value;
    };
    __expose(new UTSJSONObject({
      toggleAll
    }));
    common_vendor.provide("limeCheckboxGroup", props);
    common_vendor.provide("limeCheckboxGroupValue", innerValue);
    common_vendor.provide("limeCheckboxGroupStatus", checkAllStatus);
    common_vendor.provide("limeCheckboxGroupCheckedSet", checkedSet);
    common_vendor.provide("limeCheckboxGroupManageChildInList", manageChildInList);
    common_vendor.provide("limeCheckboxGroupOnCheckedChange", onCheckedChange);
    return (_ctx = null, _cache = null) => {
      const __returned__ = {
        a: common_vendor.sei(common_vendor.gei(_ctx, ""), "view"),
        b: common_vendor.n("l-checkbox-group--" + _ctx.direction)
      };
      return __returned__;
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-checkbox/components/l-checkbox-group/l-checkbox-group.js.map
