"use strict";
const common_vendor = require("../../../../common/vendor.js");
function getDirection(x, y) {
  if (x > y) {
    return "horizontal";
  }
  if (y > x) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  const startX = common_vendor.ref(0);
  const startY = common_vendor.ref(0);
  const deltaX = common_vendor.ref(0);
  const deltaY = common_vendor.ref(0);
  const offsetX = common_vendor.ref(0);
  const offsetY = common_vendor.ref(0);
  const direction = common_vendor.ref("");
  const isTap = common_vendor.ref(true);
  const isVertical = () => {
    return direction.value === "vertical";
  };
  const isHorizontal = () => {
    return direction.value === "horizontal";
  };
  const reset = () => {
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    direction.value = "";
    isTap.value = true;
  };
  const start = (event) => {
    reset();
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
  };
  const move = (event) => {
    const touch = event.touches[0];
    deltaX.value = (touch.clientX < 0 ? 0 : touch.clientX) - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
    const LOCK_DIRECTION_DISTANCE = 10;
    const TAP_OFFSET = 5;
    if (direction.value == "" || offsetX.value < LOCK_DIRECTION_DISTANCE && offsetY.value < LOCK_DIRECTION_DISTANCE) {
      direction.value = getDirection(offsetX.value, offsetY.value);
    }
    if (isTap.value && (offsetX.value > TAP_OFFSET || offsetY.value > TAP_OFFSET)) {
      isTap.value = false;
    }
  };
  return {
    start,
    move,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
    isTap
  };
}
exports.useTouch = useTouch;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-tabs/components/l-tabs/touch.js.map
