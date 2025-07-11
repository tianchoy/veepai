// @ts-nocheck
export interface SwitchProps {
	/**
	 * 选中时对应的值
	 */
	modelValue?: boolean;
	value?: boolean;
	defaultValue?: boolean;
	/**
	 * 是否禁用
	 */
	disabled: boolean;
	readonly: boolean;
	/**
	 * 是否加载
	 */
	loading: boolean;
	/**
	 * 是否为圆形
	 */
	round: boolean;
	rubberBand: boolean;
	name?: string;
	placeholder: string[];
	// label?:string[]
	/**
	 * 文本字体大小
	 */
	fontSize?:string;
	width?: string;
	height?: string;
	dotSize?: string;
	dotPressedSize?:string;
	checkedColor?: string;
	disabledColor?: string;
	checkedDisabledColor?: string;
	uncheckedColor?: string;
}