// @ts-nocheck
import { WeekRange, DateType } from './type';


/**
 * 获取指定日期所在周的日期范围。
 * @param {Date} date - 指定日期。
 * @param {number} firstDayOfWeek - 一周的第一天，0 表示周日，1 表示周一，以此类推。
 * @returns {WeekRange} 返回一个包含周起始和结束日期的对象。
 */

export function getWeekRange(date : Date, firstDayOfWeek : number) : WeekRange {
	const start = new Date(date.getTime());
	const dayOffset = (date.getDay() - firstDayOfWeek + 7) % 7;
	start.setDate(start.getDate() - dayOffset);

	const end = new Date(start.getTime());
	end.setDate(end.getDate() + 6);
	return { start, end } as WeekRange
};

/**
 * 向指定日期添加天数。
 * @param {Date} date - 基础日期。
 * @param {number} days - 要添加的天数，可以是正数或负数。
 * @returns {Date} 返回一个新的日期对象，该对象是基础日期加上指定天数后的结果。
 */
export function addDays(date : Date, days : number) : Date {
	const result = new Date(date.getTime());
	result.setDate(result.getDate() + days);
	return result;
};


export function addWeeks(date : Date, weeks : number) : Date {
	const result = new Date(date.getTime());
	result.setDate(result.getDate() + weeks * 7);
	return result;
};

/**
 * 判断两个日期是否表示同一天（忽略时间部分）。
 *
 * @param date1 - 第一个日期。
 * @param date2 - 第二个日期。
 * @returns 如果两个日期是同一天，返回 true；否则返回 false。
 */
function isSameDay(date1 : Date, date2 : Date) : boolean {
	return (
		date1.getFullYear() == date2.getFullYear() &&
		date1.getMonth() == date2.getMonth() &&
		date1.getDate() == date2.getDate()
	);
}
export function calcType(date : Date, minDate : Date, maxDate : Date, selectedDate : Date | null) : DateType {
	// 检查日期是否早于 minDate 或晚于 maxDate
	if (date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()) {
	    return 'disabled';
	}
	// 如果 selectedDate 不为 null，检查日期是否等于 selectedDate
	if (selectedDate != null && isSameDay(date, selectedDate)) {
		return 'selected';
	}
	return ''
}


export function daysBetween(date1: Date, date2: Date): number {
  // 将两个日期转换为毫秒
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffInMilliseconds / (1000 * 3600 * 24));
}