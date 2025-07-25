// @ts-nocheck
export interface TextareaProps {
	/**
	 * 键盘弹起时，是否自动上推页面
	 */
	adjustPosition : boolean;
	/**
		* 自动聚焦，拉起键盘
		*/
	autofocus : boolean;
	/**
		* 是否自动增高
		*/
	autosize : boolean;
	/**
		* 是否显示外边框
		*/
	bordered : boolean;
	/**
		* 点击键盘右下角按钮时是否保持键盘不收起点
		*/
	confirmHold : boolean;
	/**
		* 设置键盘右下角按钮的文字，仅在 type='text'时生效
		*/
	confirmType : 'return' | 'send' | 'search' | 'next' | 'go' | 'done';
	/**
		* 指定 focus 时的光标位置
		*/
	cursor : number;
	/**
	 * 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
	 */
	cursorSpacing : number;
	/**
		* 是否去掉 iOS 下的默认内边距
		*/
	disableDefaultPadding : boolean;
	/**
		* 是否禁用文本框
		*/
	disabled : boolean;
	readonly : boolean;
	/**
		* 如果 textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true
		*/
	fixed : boolean;
	defaultFixed : boolean;
	/**
		* 自动聚焦
		*/
	focus : boolean;
	/**
		* focus时，点击页面的时候不收起键盘
		*/
	holdKeyboard : boolean;
	/**
		* 显示文本计数器，如 0/140。当 `maxlength < 0 && maxcharacter < 0` 成立时， indicator无效
		*/
	indicator : boolean;
	/**
		* 左侧文本
		*/
	label ?: string;
	/**
		* 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度
		*/
	maxcharacter ?: number;
	/**
		* 用户最多可以输入的字符个数，值为 -1 的时候不限制最大长度
		*/
	maxlength : number;
	/**
		* 占位符
		*/
	placeholder : string;
	
	/**
		* 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
		*/
	selectionEnd : number;
	/**
		* 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
		*/
	selectionStart : number;
	/**
		* 是否显示键盘上方带有”完成“按钮那一栏
		*/
	showConfirmBar : boolean;
	/**
		* 文本框值
		*/
	value ?: string;
	/**
		 * 标题输入框布局方式
		 */
	layout : 'vertical' | 'horizontal';
	/**
		* 指定 placeholder 的样式，目前仅支持 color ,font-size和font-weight
		*/
	placeholderStyle : string;
	lStyle?: string;
	labelStyle?: string;
	indicatorStyle?: string;
	innerStyle?: string;
	/**
	 * 经典
	 */
	classic: boolean;
	borderColor?: string
	focusedBorderColor?: string;
	focused: boolean;
}