export default {
	/**
	   * 自定义右侧操作按钮文字
	   */
	action: {
		type: String,
		default: undefined
	},
	/**
	 * 键盘弹起时，是否自动上推页面
	 * @default true
	 */
	adjustPosition: {
		type: Boolean,
		default: true
	},
	/**
	 * 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
	 * @default false
	 */
	alwaysEmbed: {
		type: Boolean,
		default: false
	},
	/**
	 * 是否居中
	 * @default false
	 */
	center: {
		type: Boolean,
		default: false
	},
	/**
	 * 是否启用清除控件
	 * @default true
	 */
	clearable: {
		type: Boolean,
		default: true
	},
	/**
	 * 点击键盘右下角按钮时是否保持键盘不收起
	 * @default false
	 */
	confirmHold: {
		type: Boolean,
		default: false
	},
	/**
	 * 设置键盘右下角按钮的文字，仅在type='text'时生效。<br />具体释义：<br />`send` 右下角按钮为“发送”；<br />`search` 右下角按钮为“搜索”；<br />`next` 右下角按钮为“下一个”；<br />`go` 右下角按钮为“前往”；<br />`done` 右下角按钮为“完成”。<br />[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)
	 * @default search
	 */
	confirmType: {
		type: String,
		default: 'search' //'send' | 'search' | 'next' | 'go' | 'done';
	},
	/**
	 * 指定 focus 时的光标位置
	 */
	cursor: {
		type: Number,
		default: 0,
		// required: false
	},
	/**
	 * 搜索框聚焦时底部与键盘的距离
	 * @default 0
	 */
	cursorSpacing: {
		type: Number,
		default: 0,
	},
	/**
	 * 是否禁用
	 * @default false
	 */
	disabled: {
		type: Boolean,
		default: false
	},
	/**
	 * 是否聚焦
	 * @default false
	 */
	focus: {
		type: Boolean,
		default: false
	},
	/**
	 * focus时，点击页面的时候不收起键盘
	 * @default false
	 */
	holdKeyboard: {
		type: Boolean,
		default: false
	},
	/**
	 * 左侧图标。如果需要使用 `Slot` 进行自定义，必须将该值设置为假值
	 * @default 'search'
	 */
	leftIcon: {
		type: String,
		default: 'search'
	},
	/**
	 * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用
	 */
	maxcharacter: {
		type: Number,
		default: undefined,
	},
	/**
	 * 用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为 -1，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用
	 * @default -1
	 */
	maxlength: {
		type: Number,
		default: -1,
	},
	/**
	 * 占位符
	 * @default ''
	 */
	placeholder: {
		type: String,
		default: ''
	},
	/**
	 * 指定 placeholder 的样式类
	 * @default input-placeholder
	 */
	placeholderClass: {
		type: String,
		default: ''
	},
	/**
	 * 指定 placeholder 的样式
	 * @default ''
	 */
	placeholderStyle: {
		type: String,
		default: '',
	},
	/**
	 * 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
	 * @default -1
	 */
	selectionEnd: {
		type: Number,
		default: -1,
	},
	/**
	 * 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
	 * @default -1
	 */
	selectionStart: {
		type: Number,
		default: -1,
	},
	/**
	 * 搜索框形状
	 * @default 'square'
	 */
	shape: {
		type: String,
		default: 'square' //'square' | 'round';
	},
	/**
	 * 自定义组件样式
	 * @default ''
	 */
	lStyle: {
		type: String,
		default: ''
	},
	/**
	 * 拉起键盘的类型
	 * @default 'text'
	 */
	type: {
		type: String,
		default: 'text'//'text' | 'number' | 'idcard' | 'digit' | 'nickname';
	},
	/**
	 * 值
	 * @default ''
	 */
	value: {
		type: String,
		default: undefined,
	},
	modelValue: {
		type: String,
		default: undefined,
	},
	cursorColor: {
		type: String
	},
	padding: {
		type: String,
		default: undefined
	},
	radius: {
		type: String,
		default: undefined
	},
	height: {
		type: String,
		default: undefined
	},
	bgColor: {
		type: String,
		default: undefined
	},
	fontSize: {
		type: String,
		default: undefined
	},
	textColor: {
		type: String,
		default: undefined
	},
	iconColor: {
		type: String,
		default: undefined
	},
	clearIconColor: {
		type: String,
		default: undefined
	}
}