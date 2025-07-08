"use strict";
const common_vendor = require("../../../common/vendor.js");
function getRect(selector, context, node = false) {
  if (context == null) {
    return Promise.reject("context is null");
  }
  if (context.context) {
    context = context.context;
  }
  if (context.proxy)
    context = context.proxy;
  return new Promise((resolve, reject) => {
    const dom = common_vendor.index.createSelectorQuery().in(context).select(selector);
    const result = (rect) => {
      if (rect) {
        resolve(rect);
      } else {
        reject("no rect");
      }
    };
    if (!node) {
      dom.boundingClientRect(result).exec();
    } else {
      dom.fields({
        node: true,
        size: true,
        rect: true
      }, result).exec();
    }
  });
}
function getAllRect(selector, context, node = false) {
  if (context == null) {
    return Promise.reject("context is null");
  }
  if (context.proxy)
    context = context.proxy;
  return new Promise((resolve, reject) => {
    const dom = common_vendor.index.createSelectorQuery().in(context).selectAll(selector);
    const result = (rect) => {
      if (rect) {
        resolve(rect);
      } else {
        reject("no rect");
      }
    };
    if (!node) {
      dom.boundingClientRect(result).exec();
    } else {
      dom.fields({
        node: true,
        size: true,
        rect: true
      }, result).exec();
    }
  });
}
exports.getAllRect = getAllRect;
exports.getRect = getRect;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/lime-shared/getRect/vue.js.map
