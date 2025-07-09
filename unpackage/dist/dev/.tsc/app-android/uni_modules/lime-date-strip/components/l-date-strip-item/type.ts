// @ts-nocheck
import { DateStriPDay } from '../l-date-strip/type';

export interface DateStripItemProps {
	dates: DateStriPDay[];
	/**
	 * 主题色，对底部按钮和选中日期生效
	 */
	color ?: string;
	activeBgColor ?: string;
	activeColor ?: string;
	bgColor ?: string;
	radius ?: string;
	gridWidth ?: string;
	switchMode: 'week' | 'none';
	shape: 'square' | 'circle' | 'text';
}