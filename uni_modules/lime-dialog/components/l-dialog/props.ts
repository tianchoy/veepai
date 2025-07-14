export default {
	/**
	 * 操作栏
	 */
	actions: {
		type: Object
	},
	/**
	 * 多按钮排列方式
	 */
	buttonLayout: {
		type: String,
		default: 'horizontal'// | 'vertical';
	},
	/**
	 * 取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 Slot 自定义按钮时，需自行控制取消事件
	 */
	cancelBtn: {
		type: [String, Object],
		default: null
	},
	// cancelBtnProps?: UTSJSONObject;
	/**
	 * 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；使用 Object 时透传至图标组件
	 */
	closeBtn: {
		type: [Boolean, String, Object]
	},
	// closeColor?: string;
	// closeSize?: string;
	 /**
	   * 点击蒙层时是否触发关闭事件
	   */
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	/**
	   * 确认按钮。值为 null 则不显示确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 Slot 自定义按钮时，需自行控制确认事件
	   */
	confirmBtn: {
		type: [String, Object],
		default: null
	},
	// confirmBtnProps?: UTSJSONObject;
	/**
	   * 内容
	   */
	content: {
		type: String,
		default: null
	},
	/**
	   * 透传至 Overlay 组件
	   */
	// overlayProps?: UTSJSONObject;
	overlayStyle: {
		type: String,
		default: null
	},
	 /**
	   * 防止滚动穿透
	   */
	preventScrollThrough: {
		type: Boolean,
		default: true
	},
	/**
	   * 是否显示遮罩层
	   */
	overlay: {
		type: Boolean,
		default: true
	},
	/**
	   * 标题
	   */
	title: {
		type: String,
		default: null
	},
	 /**
	   * 控制对话框是否显示
	   */
	visible: {
		type: Boolean,
		default: null
	},
	value: {
		type: Boolean,
		default: null
	},
	modelValue: {
		type: Boolean,
		default: null
	},
	/**
	   * 对话框层级，Web 侧样式默认为 998
	   */
	zIndex: {
		type: Number,
		default: null
	},
	/**
	   * 自定义组件样式
	   */
	lStyle: {
		type: String,
		default: null
	}
}