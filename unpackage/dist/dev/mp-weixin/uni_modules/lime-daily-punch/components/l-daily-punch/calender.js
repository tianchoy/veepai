"use strict";
const common_vendor = require("../../../../common/vendor.js");
class ArrowIcon {
  constructor(x, y, size, type, color) {
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.type = "";
    this.color = "";
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.color = color;
  }
  draw(ctx) {
    const _a = this, x = _a.x, y = _a.y, size = _a.size, color = _a.color, type = _a.type;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    if (type === "left") {
      ctx.moveTo(x + size * 0.6042, y + size * 0.25);
      ctx.lineTo(x + size * 0.3542, y + size * 0.5);
      ctx.lineTo(x + size * 0.6042, y + size * 0.75);
    } else if (type === "right") {
      ctx.moveTo(x + size * (1 - 0.6042), y + size * 0.25);
      ctx.lineTo(x + size * (1 - 0.3542), y + size * 0.5);
      ctx.lineTo(x + size * (1 - 0.6042), y + size * 0.75);
    }
    ctx.stroke();
  }
  isCoordinateInside(x, y) {
    return x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size;
  }
}
class Day {
  constructor(day, month, year, isCurrentMonth, isToday, isBeforeToday, calendar) {
    this.day = 0;
    this.month = 0;
    this.year = 0;
    this.fullDay = "00";
    this.fullMonth = "00";
    this.fullDate = "";
    this.isBeforeToday = false;
    this.isToday = false;
    this.isCurrentMonth = false;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.originalMonth = 0;
    this.type = "current";
    this.fontSize = 20;
    this.timestamp = 0;
    this.day = day;
    this.month = month;
    this.year = year;
    this.originalMonth = month - 1;
    this.fullMonth = this.formatMonth(month);
    this.fullDay = this.formatDay(day);
    this.fullDate = `${year}-${this.fullMonth}-${this.fullDay}`;
    this.isCurrentMonth = isCurrentMonth;
    this.isBeforeToday = isBeforeToday;
    this.isToday = isToday;
    this.calendar = calendar;
    this.timestamp = new Date(year, month - 1, day).getTime();
  }
  formatDay(day) {
    return `${day}`.padStart(2, "0");
  }
  formatMonth(month) {
    return `${month}`.padStart(2, "0");
  }
  isCoordinateInside(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setDimensions(width, height) {
    this.width = width;
    this.height = height;
  }
  get opt() {
    return this.calendar.opt;
  }
  get selectDate() {
    return this.calendar.selectDate;
  }
  set selectDate(_val = null) {
  }
  get canSupplement() {
    return this.opt.canSupplement && this.isBeforeToday && !this.isCheckedIn;
  }
  set canSupplement(_v) {
  }
  get isCheckedIn() {
    return this.calendar.signedDates.includes(this.timestamp);
  }
  set isCheckedIn(_v) {
  }
  drawCircle(ctx, x, y, radius, color, border = false) {
    ctx.beginPath();
    if (border) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
    }
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (border) {
      ctx.stroke();
    }
  }
  draw(ctx) {
    const size = Math.min(this.width, this.height) * 0.9;
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const color = this.opt.color;
    const unsignedColor = this.opt.unsignedColor;
    const selectedDayBgColor = this.opt.selectedDayBgColor;
    const textColor = this.opt.textColor;
    const disabledColor = this.opt.disabledColor;
    const dayFontSize = this.opt.dayFontSize;
    ctx.textAlign = "center";
    ctx.font = this.isToday ? `${dayFontSize - 2}px Arial` : `${dayFontSize}px Arial`;
    ctx.textBaseline = "middle";
    const isSelectedDate = this.selectDate == null || this.selectDate == this;
    let txtColor = this.type == "current" ? textColor : disabledColor;
    if (this.isToday && !isSelectedDate) {
      txtColor = color;
    }
    if (this.selectDate != null && this.selectDate == this) {
      ctx.beginPath();
      ctx.fillStyle = selectedDayBgColor;
      ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    if (this.isToday && isSelectedDate) {
      this.drawCircle(ctx, centerX, centerY, size / 2, color);
      txtColor = "white";
    }
    if (this.type == "current" && (this.isCheckedIn || this.canSupplement)) {
      this.drawCircle(ctx, centerX, centerY + this.fontSize * 0.9, 4, this.isCheckedIn ? this.isToday && isSelectedDate ? "white" : color : unsignedColor);
    }
    ctx.fillStyle = txtColor;
    ctx.fillText(this.isToday ? "今天" : this.fullDay, centerX, centerY);
  }
}
class Calendar {
  constructor() {
    var _a;
    this.year = 0;
    this.month = 0;
    this.el = null;
    this.ctx = null;
    this.init = false;
    this.today = 0;
    this.currentMonth = 0;
    this.currentYear = 0;
    this.week = [];
    this.selectDate = null;
    this.containerHeight = 0;
    this.containerWidth = 0;
    this.arrowIcons = [];
    this.opt = {
      canSupplement: false,
      isFullCalendar: true,
      yearMonth: "",
      signedDates: [],
      week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      weekStartsOn: 0,
      weekColor: "#BDC0C3",
      weekFontSize: 12,
      weekHeight: 40,
      selectedDayBgColor: "rgba(0,0,0,0.06)",
      dayFontSize: 12,
      textColor: "#1A1F24",
      disabledColor: "#BDC0C3",
      monthTitleHeight: 50,
      monthTitleFontSize: 20,
      color: "#3B87F6",
      unsignedColor: "#F1A33A"
    };
    const date = /* @__PURE__ */ new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.today = date.getDate();
    this.monthDateCache = /* @__PURE__ */ new Map();
    this.week = (_a = this.opt.week) !== null && _a !== void 0 ? _a : [];
  }
  get signedDates() {
    if (this.opt.signedDates == null)
      return [];
    const values = [];
    this.opt.signedDates.forEach((item) => {
      const _a = common_vendor.__read(item.split("-").map((v) => {
        return parseInt(v);
      }), 3), year = _a[0], month = _a[1], day = _a[2];
      const time = new Date(year, month - 1, day).getTime();
      if (!values.includes(time)) {
        values.push(time);
      }
    });
    return values;
  }
  get checkinDays() {
    if (this.signedDates.length == 0)
      return 0;
    const sortedDates = this.signedDates.sort((a, b) => {
      return b - a;
    });
    return this.calculateContinuousCheckinDays(sortedDates);
  }
  calculateContinuousCheckinDays(sortedDates) {
    const dayInMillis = 24 * 60 * 60 * 1e3;
    const todayTime = new Date(this.currentYear, this.currentMonth - 1, this.today).getTime();
    let streak = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      if (i == 0) {
        if (todayTime - sortedDates[i] > dayInMillis) {
          break;
        }
        if (sortedDates[i] == todayTime || todayTime - sortedDates[i] == dayInMillis) {
          streak = 1;
        }
      } else {
        if (sortedDates[i - 1] - sortedDates[i] == dayInMillis) {
          streak++;
        } else {
          break;
        }
      }
    }
    return streak;
  }
  setCanvas(el = null) {
    var _a, _b;
    if (el == null)
      return null;
    this.el = el;
    this.containerHeight = 6 * ((_a = this.opt.dayHeight) !== null && _a !== void 0 ? _a : 0) + this.opt.weekHeight + this.opt.monthTitleHeight;
    this.containerWidth = this.el.offsetWidth;
    this.el.style.setProperty("height", this.containerHeight + "px");
    this.ctx = el.getContext("2d");
    const dpr = (_b = common_vendor.index.getDeviceInfo().devicePixelRatio) !== null && _b !== void 0 ? _b : 1;
    this.el.width = this.containerWidth * dpr;
    this.el.height = this.containerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }
  setOptions(opt) {
    let datechange = false;
    let weekStartsOn = -1;
    for (let key in opt) {
      const value = opt[key];
      if (key == "yearMonth" && value != null && value != this.opt.yearMonth) {
        datechange = true;
      }
      if (key == "weekStartsOn" && value != null && value != this.opt.weekStartsOn) {
        weekStartsOn = value;
      }
      if (value != null) {
        this.opt[key] = value;
      }
    }
    if (weekStartsOn != -1) {
      const normalWeek = [...this.opt.week];
      const sIndex = weekStartsOn < 0 ? 0 : weekStartsOn >= normalWeek.length ? normalWeek.length - 1 : weekStartsOn;
      normalWeek.unshift(...normalWeek.slice(-sIndex));
      normalWeek.length = 6;
      this.week = normalWeek;
    }
    if (this.opt.yearMonth != "" && !this.init || datechange) {
      const arr = this.opt.yearMonth.split("-");
      this.year = parseInt(arr[0]);
      this.month = parseInt(arr[1]);
      this.init = true;
    }
  }
  /** 获取当月共多少天，也就是获取月的最后一天 */
  getMonthDayLength(year, month) {
    return new Date(year, month, 0).getDate();
  }
  // 获取当月第一天星期几
  getFirstDayOfWeek(year, month, day = 1) {
    return new Date(year, month - 1, day).getDay();
  }
  // 获取加/减一个月的日期
  getOperateMonthDate(nowYear, nowMonth, num) {
    let month = nowMonth + num;
    let year = nowYear;
    if (month > 12) {
      month = 1;
      year++;
    } else if (month < 1) {
      month = 12;
      year--;
    }
    return {
      month,
      year
    };
  }
  generateMonthDateCache(year = this.year, month = this.month) {
    const key = `${year}-${month}`;
    if (this.monthDateCache.has(key)) {
      return UTS.mapGet(this.monthDateCache, key);
    }
    const arr = [];
    const days = this.getMonthDayLength(year, month);
    const firstday = this.getFirstDayOfWeek(year, month);
    const beforeEmptyLength = (firstday + this.opt.weekStartsOn) % 7;
    const afterEmptyLength = 5 * 7 - beforeEmptyLength - days;
    const last = this.getOperateMonthDate(year, month, -1);
    const lastMonthEndDay = this.getMonthDayLength(last.year, last.month);
    const next = this.getOperateMonthDate(year, month, 1);
    const today = new Date(this.currentYear, this.currentMonth - 1, this.today).getTime();
    let index = 0;
    const getGridSize = (i2) => {
      var _a, _b;
      const rect = (_a = this.el) === null || _a === void 0 ? null : _a.getBoundingClientRect();
      const height = (_b = this.opt.dayHeight) !== null && _b !== void 0 ? _b : 0;
      const width = rect == null ? 0 : rect.width / 7;
      const row = Math.floor(i2 / 7);
      const col = i2 % 7;
      const x = col * width;
      const y = row * height + this.opt.monthTitleHeight + this.opt.weekHeight;
      return {
        x,
        y,
        width,
        height
        // 使用正确的变量名height
      };
    };
    for (var i = 0; i < beforeEmptyLength; i++) {
      const _a = getGridSize(index), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      const date = lastMonthEndDay - beforeEmptyLength + i + 1;
      const time = new Date(last.year, last.month - 1, date).getTime();
      const day = new Day(date, last.month, last.year, last.year == this.currentYear && last.month == this.currentMonth, time == today, time < today, this);
      day.type = "last";
      day.setPosition(x, y);
      day.setDimensions(width, height);
      arr.push(day);
      index++;
    }
    for (var i = 0; i < days; i++) {
      const _b = getGridSize(index), x = _b.x, y = _b.y, width = _b.width, height = _b.height;
      const date = i + 1;
      const time = new Date(year, month - 1, date).getTime();
      const day = new Day(date, month, year, year == this.currentYear && month == this.currentMonth, time == today, time < today, this);
      day.setPosition(x, y);
      day.setDimensions(width, height);
      arr.push(day);
      index++;
    }
    for (var i = 0; i < afterEmptyLength; i++) {
      const _c = getGridSize(index), x = _c.x, y = _c.y, width = _c.width, height = _c.height;
      const date = i + 1;
      const time = new Date(next.year, next.month - 1, date).getTime();
      const day = new Day(date, next.month, next.year, next.year == this.currentYear && next.month == this.currentMonth, time == today, time < today, this);
      day.type = "next";
      day.setPosition(x, y);
      day.setDimensions(width, height);
      arr.push(day);
      index++;
    }
    const monthData = {
      year,
      month,
      days: arr
    };
    this.monthDateCache.set(key, monthData);
    return monthData;
  }
  next() {
    const _a = this.getOperateMonthDate(this.year, this.month, 1), year = _a.year, month = _a.month;
    const canSwitchToNextMonth = this.currentYear > year || this.currentYear == year && month - this.currentMonth <= 1;
    if (canSwitchToNextMonth) {
      this.year = year;
      this.month = month;
      this.render(year, month);
    } else {
      common_vendor.index.showToast({
        icon: "error",
        title: "往后最多查看一个月"
      });
    }
  }
  last() {
    const _a = this.getOperateMonthDate(this.year, this.month, -1), year = _a.year, month = _a.month;
    this.year = year;
    this.month = month;
    this.render(year, month);
  }
  /**
  * 前往某一天
  * @param {string} date 格式 YYYY-MM-DD
  */
  goToDate(date = null) {
    if (date == null) {
      this.render(this.currentYear, this.currentMonth, this.today);
    } else {
      try {
        const _a = common_vendor.__read(date.split("-").map((item) => {
          return parseInt(item);
        }), 3), year = _a[0], month = _a[1], day = _a[2];
        this.render(year, month, day);
      } catch (e) {
        throw new Error("参数有误");
      }
    }
  }
  drawIcon(ctx, size, x, y, arrow, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    if (arrow === "left") {
      ctx.moveTo(x + size * 0.6042, y + size * 0.25);
      ctx.lineTo(x + size * 0.3542, y + size * 0.5);
      ctx.lineTo(x + size * 0.6042, y + size * 0.75);
    } else if (arrow === "right") {
      ctx.moveTo(x + size * (1 - 0.6042), y + size * 0.25);
      ctx.lineTo(x + size * (1 - 0.3542), y + size * 0.5);
      ctx.lineTo(x + size * (1 - 0.6042), y + size * 0.75);
    }
    ctx.stroke();
  }
  drawHead(monthData) {
    const width = this.containerWidth;
    if (this.ctx == null)
      return null;
    const ctx = this.ctx;
    const height = this.opt.monthTitleHeight;
    ctx.textAlign = "center";
    ctx.fillStyle = this.opt.textColor;
    ctx.font = ` ${this.opt.monthTitleFontSize}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.fillText(`${monthData.year}年` + `${monthData.month}`.padStart(2, "0") + "月", width * 0.5, height * 0.55);
    if (this.arrowIcons.length == 0) {
      const offsetTop = (height - 30) / 2;
      this.arrowIcons.push(new ArrowIcon(0, offsetTop, 30, "left", `#A0A5AA`));
      this.arrowIcons.push(new ArrowIcon(width - 30, offsetTop, 30, "right", `#A0A5AA`));
    }
    this.arrowIcons.forEach((icon) => {
      icon.draw(ctx);
    });
  }
  drawWeek() {
    if (this.ctx == null)
      return null;
    const ctx = this.ctx;
    ctx.textAlign = "center";
    ctx.font = `${this.opt.weekFontSize}px Arial`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.opt.weekColor;
    this.week.forEach((week, index) => {
      ctx.fillText(`${week}`, this.containerWidth / 7 * (index + 0.5), this.opt.monthTitleHeight + this.opt.weekHeight * 0.5);
    });
  }
  render(year = this.year, month = this.month, day = null) {
    const monthData = this.generateMonthDateCache(year, month);
    if (day != null) {
      this.selectDate = UTS.arrayFind(monthData.days, (item) => {
        return item.day == day;
      });
    }
    if (this.el != null && this.ctx != null) {
      this.ctx.clearRect(0, 0, this.containerWidth, this.containerHeight);
      this.drawHead(monthData);
      this.drawWeek();
      monthData.days.forEach((day2) => {
        day2.draw(this.ctx);
      });
    }
    return null;
  }
  touch(e) {
    var _a, _b, _c, _d;
    if (this.el == null)
      return null;
    const rect = this.el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const icon = UTS.arrayFind(this.arrowIcons, (icon2) => {
      return icon2.isCoordinateInside(x, y);
    });
    if (icon != null) {
      if (icon.type == "left") {
        this.last();
      } else {
        this.next();
      }
      (_b = (_a = this.opt).panelChange) === null || _b === void 0 ? null : _b.call(_a, {
        year: this.year,
        month: this.month
      });
      return null;
    }
    const month = UTS.mapGet(this.monthDateCache, `${this.year}-${this.month}`);
    if (month == null)
      return null;
    const day = UTS.arrayFind(month.days, (day2) => {
      return day2.isCoordinateInside(x, y);
    });
    if (day != null && day.type == "current") {
      this.selectDate = day;
      this.render();
      (_d = (_c = this.opt).select) === null || _d === void 0 ? null : _d.call(_c, day);
    }
  }
}
exports.Calendar = Calendar;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/lime-daily-punch/components/l-daily-punch/calender.js.map
