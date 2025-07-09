// @ts-nocheck
export default {
	dates: {
		type: Array,
		default: () => []
	},
	// 网格宽度
	gridWidth: {
		type: String,
		default: null
	},

	// 主题色，对底部按钮和选中日期生效
	color: {
		type: String,
		default: null
	},

	// 选中日期的背景色
	activeBgColor: {
		type: String,
		default: null
	},

	// 选中日期的文字颜色
	activeColor: {
		type: String,
		default: null
	},

	// 背景色
	bgColor: {
		type: String,
		default: null
	},

	// 圆角半径
	radius: {
		type: String,
		default: null
	},

	// 切换模式，'week' 或 'none'
	switchMode: {
		type: String,
		default: 'week',
	},

	// 形状，'square'、'circle' 或 'none'
	shape: {
		type: String,
		default: 'square'
	},
}