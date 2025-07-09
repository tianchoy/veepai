"use strict";
function getWeekRange(date, firstDayOfWeek) {
  const start = new Date(date.getTime());
  const dayOffset = (date.getDay() - firstDayOfWeek + 7) % 7;
  start.setDate(start.getDate() - dayOffset);
  const end = new Date(start.getTime());
  end.setDate(end.getDate() + 6);
  return { start, end };
}
function addDays(date, days) {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}
function addWeeks(date, weeks) {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + weeks * 7);
  return result;
}
function isSameDay(date1, date2) {
  return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
}
function calcType(date, minDate, maxDate, selectedDate = null) {
  if (date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()) {
    return "disabled";
  }
  if (selectedDate != null && isSameDay(date, selectedDate)) {
    return "selected";
  }
  return "";
}
function daysBetween(date1, date2) {
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffInMilliseconds / (1e3 * 3600 * 24));
}
exports.addDays = addDays;
exports.addWeeks = addWeeks;
exports.calcType = calcType;
exports.daysBetween = daysBetween;
exports.getWeekRange = getWeekRange;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-date-strip/components/l-date-strip/utils.js.map
