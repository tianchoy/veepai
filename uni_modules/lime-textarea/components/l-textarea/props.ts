export default {
	/**
	 * 键盘弹起时，是否自动上推页面
	 */
	adjustPosition: {
		type: Boolean,
		default: true,
	},
	/**
		* 自动聚焦，拉起键盘
		*/
	autofocus: {
		type: Boolean,
		default: false,
	},
	/**
		* 是否自动增高
		*/
	autosize: {
		type: Boolean,
		default: false,
	},
	/**
		* 是否显示外边框
		*/
	bordered: {
		type: Boolean,
		default: true,
	},
	/**
		* 点击键盘右下角按钮时是否保持键盘不收起点
		*/
	confirmHold: {
		type: Boolean,
		default: false,
	},
	/**
		* 设置键盘右下角按钮的文字，仅在 type='text'时生效
		*/
	confirmType: {
		type: String,
		default: 'return' //'return' | 'send' | 'search' | 'next' | 'go' | 'done';
	},
	/**
		* 指定 focus 时的光标位置
		*/
	cursor: {
		type: Number,
		default: -1
	},
	/**
	 * 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
	 */
	cursorSpacing: {
		type: Number,
		default: 0
	},
	/**
		* 是否去掉 iOS 下的默认内边距
		*/
	disableDefaultPadding: {
		type: Boolean,
		default: false,
	},
	/**
		* 是否禁用文本框
		*/
	disabled: {
		type: Boolean,
		default: false,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	
	/**
		* 如果 textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true
		*/
	fixed: {
		type: Boolean,
		default: false,
	},
	defaultFixed: {
		type: Boolean,
		default: false,
	},
	/**
		* 自动聚焦
		*/
	focus: {
		type: Boolean,
		default: false,
	},
	/**
		* focus时，点击页面的时候不收起键盘
		*/
	holdKeyboard: {
		type: Boolean,
		default: false,
	},
	/**
		* 显示文本计数器，如 0/140。当 `maxlength < 0 && maxcharacter < 0` 成立时， indicator无效
		*/
	indicator: {
		type: Boolean,
		default: false,
	},
	/**
		* 左侧文本
		*/
	label: {
		type: String,
		default: null,
	},
	/**
		* 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度
		*/
	maxcharacter: {
		type: Number,
		default: null
	},
	/**
		* 用户最多可以输入的字符个数，值为 -1 的时候不限制最大长度
		*/
	maxlength: {
		type: Number,
		default: -1
	},
	/**
		* 占位符
		*/
	placeholder: {
		type: String,
		default: '',
	},

	/**
		* 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
		*/
	selectionEnd: {
		type: Number,
		default: -1
	},
	/**
		* 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
		*/
	selectionStart: {
		type: Number,
		default: -1
	},
	/**
		* 是否显示键盘上方带有”完成“按钮那一栏
		*/
	showConfirmBar: {
		type: Boolean,
		default: true,
	},
	/**
	* 文本框值
	*/
	value: {
		type: String,
		default: null,
	},
	modelValue: {
		type: String,
		default: null,
	},
	/**
	 * 标题输入框布局方式
	 */
	layout: {
		type: String,
		default: 'horizontal' //'vertical' | 'horizontal';
	},
	/**
		* 指定 placeholder 的样式，目前仅支持 color ,font-size和font-weight
		*/
	placeholderStyle: {
		type: String,
		default: ''
	},
	lStyle: {
		type: String,
		default: null
	},
	labelStyle: {
		type: String,
		default: null
	},
	indicatorStyle: {
		type: String,
		default: null,
	},
	innerStyle: {
		type: String,
		default: null,
	},
	classic: {
		type: Boolean,
		default: false,
	},
	focused: {
		type: Boolean,
		default: false,
	},
	borderColor: {
		type: String,
		default: null,
	},
	focusedBorderColor: {
		type: String,
		default: null,
	},
}