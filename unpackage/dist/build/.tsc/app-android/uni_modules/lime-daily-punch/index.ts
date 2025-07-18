export interface LDay {
  day: number;
  month: number;
  year: number;
  fullDate: string;
  isBeforeToday: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  width: number;
  height: number;
  originalMonth: number;
  type: string;
  fontSize: number;
  timestamp: number;

  // formatDay(day: number): string;
  // formatMonth(month: number): string;
  isCoordinateInside(x: number, y: number): boolean;
  setPosition(x: number, y: number): void;
  setDimensions(width: number, height: number): void;
  selectDate: LDay | null;
  canSupplement: boolean;
  isCheckedIn: boolean;
  draw(ctx: CanvasRenderingContext2D): void;
}


export type LYearMonth = {
	year : number,
	month : number
}

export type LGridSize = {
	x : number,
	y : number,
	width : number,
	height : number
}

export type LMonthData = {
	year : number
	month : number
	days : LDay[]
}


export type LOptions = {
	canSupplement ?: boolean
	isFullCalendar ?: boolean
	yearMonth ?: string,
	signedDates ?: string[],
	week ?: string[],
	dayHeight ?: number,
	weekStartsOn ?: number,
	weekColor?: string,
	weekFontSize?: number,
	weekHeight?: number,
	selectedDayBgColor?: string,
	dayFontSize?: number,
	textColor?: string,
	disabledColor?: string,
	monthTitleHeight?: number,
	monthTitleFontSize?: number,
	color?: string,
	unsignedColor?: string,
	select ?: (day : LDay) => void,
	panelChange ?: (res : LYearMonth) => void
	// weekStartsOn : string
}