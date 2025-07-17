"use strict";
const common_vendor = require("../../../../common/vendor.js");
function intersection(...arrays) {
  const result = [];
  for (let i = 0; i < arrays[0].length; i++) {
    const item = arrays[0][i];
    let isCommon = true;
    for (let j = 1; j < arrays.length; j++) {
      if (!arrays[j].includes(item)) {
        isCommon = false;
        break;
      }
    }
    if (isCommon && !result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}
function setCheckAllStatus(children, innerValue, checkedSet) {
  const intersectionLen = common_vendor.computed(() => {
    const values = [];
    children.forEach((item = null) => {
      var _a;
      const value = (_a = item.value) !== null && _a !== void 0 ? _a : item.name;
      if (value == null)
        return null;
      values.push(value);
    });
    if (Array.isArray(innerValue.value)) {
      return intersection(innerValue.value, values).length;
    }
    return 0;
  });
  const isAllChecked = common_vendor.computed(() => {
    if (checkedSet.value.size != children.length - 1) {
      return false;
    }
    return intersectionLen.value == children.length - 1;
  });
  const isIndeterminate = common_vendor.computed(() => {
    return !isAllChecked.value && intersectionLen.value < children.length && intersectionLen.value > 0;
  });
  return common_vendor.computed(() => {
    if (isAllChecked.value)
      return "checked";
    if (isIndeterminate.value)
      return "indeterminate";
    return "uncheck";
  });
}
exports.setCheckAllStatus = setCheckAllStatus;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-checkbox/components/l-checkbox-group/utils.js.map
