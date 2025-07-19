"use strict";
const parseToObject = (obj = null) => {
  if (obj == null)
    return null;
  if (typeof obj == "string") {
    return new UTSJSONObject({
      content: obj
    });
  } else if (typeof obj == "object") {
    return UTSJSONObject.assign(new UTSJSONObject({}), obj);
  }
  return null;
};
exports.parseToObject = parseToObject;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-dialog/components/l-dialog/utils.js.map
