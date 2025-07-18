// @ts-nocheck
export type DateType = 'selected' |  'disabled' | '';

/**
 * 定义一个表示周范围的类
 */
export type WeekRange = {
  start: Date
  end: Date
}

export type DateStriPDay = {
	date : Date;
	key: string,
	day : number;
	year : number;
	month : number;
	text: string;
	type : DateType;
	prefix : string;
	prefixStyle ?: UTSJSONObject;
	textStyle?: UTSJSONObject;
	suffix ?: string;
	suffixStyle ?: UTSJSONObject;
}


export type WeekDateCollection = {
	start: number,
	end: number,
	dates : DateStriPDay[];
}

export type DateFormatType = (day : DateStriPDay) => DateStriPDay;
export interface DateStripProps {
	/**
	 * 第一天从星期几开始，默认 0 = 周日
	 * @default 1
	 */
	firstDayOfWeek : number;
	format ?: DateFormatType;
	/**
	 * 最大可选的日期，不传则默认半年后
	 */
	maxDate ?: number;
	/**
	 * 最小可选的日期，不传则默认今天
	 */
	minDate ?: number;
	/**
	 * 当前选择的日期
	 */
	value ?: number;
	defaultValue ?: number;
	modelValue ?: number;
	/**
	 * 日期行高
	 */
	height ?: string;
	gridWidth ?: string;
	/**
	 * 主题色，对底部按钮和选中日期生效
	 */
	color ?: string;
	activeBgColor ?: string;
	activeColor ?: string;
	bgColor ?: string;
	radius ?: string;
	switchMode: 'week' | 'none';
	shape: 'square' | 'circle' | 'none';
	/**
	 * 控制是否显示切换上一屏和下一屏的按钮。
	 * 该属性仅在按周切换时有效。
	 */
	showNavigation ?: boolean;
	weekdays : string[];
}