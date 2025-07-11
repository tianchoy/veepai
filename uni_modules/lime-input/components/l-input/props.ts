export default {
	/** 键盘弹起时，是否自动上推页面 */
	adjustPosition :{
		type: Boolean,
		default: true
	},
	/** 文本内容位置，居左/居中/居右 */
	align : {
		type: String,
		default: 'left'
	},
	 /** 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效) */
	alwaysEmbed:{
		type: Boolean,
		default: false
	},
	/** (即将废弃，请直接使用 focus )自动聚焦，拉起键盘 */
	autoFocus:{
		type: Boolean,
		default: false
	},
	
	/** 是否开启无边框模式 */
	bordered:{
		type: Boolean,
		default: true
	},
	/** 清空图标触发方式，仅在输入框有值时有效 */
	clearTrigger: {
		type: String,
		default: 'focus'
	},
	 /** 是否可清空，默认不启动 */
	clearable:{
		type: Boolean,
		default: false
	},
	/** 点击键盘右下角按钮时是否保持键盘不收起 */
	confirmHold:{
		type: Boolean,
		default: false
	},
	 /** 设置键盘右下角按钮的文字 */
	confirmType: {
		type: String,
		default: 'done'
	},
	/** 指定 focus 时的光标位置 */
	cursor: {
		type: Number,
		default: 0
	},
	 /** 光标颜色 */
	cursorColor: {
		type: String,
		default: null
	},
	 /** 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 */
	cursorSpacing: {
		type: Number,
		default: 0
	},
	/** 是否禁用输入框 */
	disabled:{
		type: Boolean,
		default: false
	},
	/** 获取焦点 */
	focus:{
		type: Boolean,
		default: false
	},
	/** 指定输入框展示值的格式 */
	// format: Function
	/** focus时，点击页面的时候不收起键盘 */
	holdKeyboard:{
		type: Boolean,
		default: false
	},
	/** 左侧文本 */
	label: {
		type: String,
		default: null
	},
	/** 标题输入框布局方式 */
	layout: {
		type: String,
		default: 'horizontal'
	},
	/** 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用 */
	maxcharacter: {
		type: Number,
		default: null
	},
	/** 用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为 -1，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用 */
	maxlength: {
		type: Number,
		default: -1
	},
	/** 占位符 */
	placeholder: {
		type: String,
		default: ''
	},
	/** 指定 placeholder 的样式 */
	placeholderStyle: {
		type: String,
		default: ''
	},
	/** 指定 placeholder 的样式类 */
	placeholderClass: {
		type: String,
		default: ''
	},
	
	/** 只读状态 */
	readonly:{
		type: Boolean,
		default: false
	},
	/** 安全键盘加密公钥的路径，只支持包内路径 */
	safePasswordCertPath: {
		type: String,
		default: ''
	},
	/** 安全键盘计算 hash 的算法表达式，如 `md5(sha1('foo' + sha256(sm3(password + 'bar'))))` */
	safePasswordCustomHash: {
		type: String,
		default: ''
	},
	/** 安全键盘输入密码长度 */
	safePasswordLength: {
		type: Number,
		default: null
	},
	/** 安全键盘加密盐值 */
	safePasswordNonce: {
		type: String,
		default: ''
	},
	/** 安全键盘计算 hash 盐值，若指定custom-hash 则无效 */
	safePasswordSalt: {
		type: String,
		default: ''
	},
	/** 安全键盘加密时间戳 */
	safePasswordTimeStamp: {
		type: Number,
		default: null
	},
	/** 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用 */
	selectionEnd: {
		type: Number,
		default: -1
	},
	/** 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用 */
	selectionStart: {
		type: Number,
		default: -1
	},
	status: {
		type: String,
		default: 'default'
	},
	/** 组件前置图标。值为字符串表示图标名称 */
	prefixIcon: {
		type: String,
		default: null
	},
	prefixIconSize: {
		type: String,
		default: null
	},
	prefixIconColor: {
		type: String,
		default: null
	},
	/** 后置图标前的后置内容 */
	suffix: {
		type: String,
		default: null
	},
	/** 后置文本内容。值为字符串则表示图标名称 */
	suffixIcon: {
		type: String,
		default: null
	},
	
	suffixIconSize: {
		type: String,
		default: null
	},
	suffixIconColor: {
		type: String,
		default: null
	},
	/** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
	tips: {
		type: String,
		default: null
	},
	type: {
		type: String,
		default: null
	},
	value: {
		type: [String, Number],
		default: null
	},
	modelValue: {
		type: [String, Number],
		default: null
	},
	lStyle: {
		type: String,
		default: null
	},
	lableStyle: {
		type: String,
		default: null
	},
	tipsStyle: {
		type: String,
		default: null
	},
	inputStyle: {
		type: String,
		default: null
	},
	borderColor: {
		type: String,
		default: null
	},
	/**
	 * 是否使用经典边框样式
	 */
	classic: {
		type: Boolean,
		default: false
	},
	focused: {
		type: Boolean,
		default: false
	},
	focusedBorderColor: {
		type: String,
		default: null,
	},
	clearIconSize: {
		type: String,
		default: null,
	}
}