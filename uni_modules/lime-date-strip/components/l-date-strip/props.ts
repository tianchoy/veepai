export default {
	// 第一天从星期几开始，默认 1 = 周一
	firstDayOfWeek: {
		type: Number,
		default: 0,
	},
	// 日期格式，可选
	format: {
		type: Function,
		default: null
	},

	// 最大可选日期，不传则默认半年后
	maxDate: {
		type: Number,
		default: null
	},

	// 最小可选日期，不传则默认今天
	minDate: {
		type: Number,
		default: null
	},

	// 当前选择的日期
	value: {
		type: Number,
		default: null
	},

	// 默认值（如果使用非 v-model 绑定）
	defaultValue: {
		type: Number,
		default: null
	},

	// 模型值（如果使用 v-model 绑定）
	modelValue: {
		type: Number,
		default: null
	},

	// 日期行高
	height: {
		type: String,
		default: null
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

	// 控制是否显示切换上一屏和下一屏的按钮，仅在按周切换时有效
	showNavigation: {
		type: Boolean,
		default: false
	},

	// 星期几的名称数组
	weekdays: {
		type: Array,
		default: () => ['日', '一', '二', '三', '四', '五', '六']
	}
}