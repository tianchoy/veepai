"use strict";
function calcScrollOffset(containerWidth, targetLeft, targetWidth, offset) {
  return offset + targetLeft - 1 / 2 * containerWidth + targetWidth / 2;
}
function ease(moveX, base) {
  const absDistance = Math.abs(moveX);
  const max = 50;
  if (absDistance > max) {
    return (max + (absDistance - max) * 0.2) * base;
  }
  return moveX;
}
exports.calcScrollOffset = calcScrollOffset;
exports.ease = ease;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-tabs/components/l-tabs/utils.js.map
