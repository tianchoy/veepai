// @ts-nocheck
export default {
	/**
	 * 选中时对应的值
	 */
	modelValue: {
		type: Boolean,
		default: null
	},
	value: {
		type: Boolean,
		default: null
	},
	disabled: {
		type: Boolean,
		default: false
	},
	readonly: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	},
	// size: {
	// 	type: String,
	// 	defalut: 'medium'
	// },
	// label: {
	// 	type: Array
	// },
	/**
	 * 是否为圆形
	 */
	round:{
		type: Boolean,
		default: true
	},
	/**
	 * 按钮是否有橡皮筋效果
	 */
	rubberBand: {
		type: Boolean,
		default: true
	},
	name:{
		type: String,
		default: null
	},
	placeholder: {
		type: Array,
		default: () => []
	},
	fontSize:{
		type: String,
		default: null
	},
	width:{
		type: String,
		default: null
	},
	height:{
		type: String,
		default: null
	},
	dotSize:{
		type: String,
		default: null
	},
	dotPressedSize:{
		type: String,
		default: null
	},
	checkedColor:{
		type: String,
		default: null
	},
	disabledColor:{
		type: String,
		default: null
	},
	checkedDisabledColor:{
		type: String,
		default: null
	},
	uncheckedColor:{
		type: String,
		default: null
	},
}