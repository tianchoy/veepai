
	import { ComponentPublicInstance } from 'vue'
	/**
	 * Input 输入框
	 * @description Input 输入框，该组件是对原生input组件的增强，内置了常用布局样式，同时包含 input 所有功能。
	 * @tutorial https://unix.firstui.cn/
	 * @property {Boolean} required {Boolean} 是否显示必填图标
	 * @property {String} requiredColor {String} 必填图标颜色	
	 * @property {String} label {String} 左侧标题
	 * @property {Number} labelSize {Number} 标题字体大小，单位rpx
	 * @property {String} labelColor {String} 标题字体颜色
	 * @property {Number} labelWidth {Number} 标题最小宽度，单位rpx
	 * @property {Boolean} clearable {Boolean} 输入内容后是否显示清除按钮
	 * @property {String} clearColor {String} 清除按钮颜色
	 * @property {Boolean} focus {Boolean} 获取焦点
	 * @property {String} placeholder {String} 输入框为空时占位符
	 * @property {String} placeholderStyle {String}	指定 placeholder 的样式
	 * @property {String} name {String} 输入框名称
	 * @property {String} value {String} 输入框值
	 * @property {String} type {String} 输入框类型，参考官方 input 组件type属性
	 * @property {Boolean} password {Boolean} 是否是密码类型	
	 * @property {Boolean} disabled {Boolean} 是否禁用，清除按钮一并失效
	 * @property {Boolean} disabledStyle {Boolean} 是否启用禁用状态下的样式，与正常输入框样式略有区别，仅disabled为true时有效
	 * @property {Boolean} readonly {Boolean} 是否只读，保留清除按钮使用，优先级高于disabled
	 * @property {Number} maxlength {Number} 最大输入长度，设置为 -1 的时候不限制最大长度
	 * @property {Number} min {Number} 最小值，当 type=number、type=digit 时有效
	 * @property {Number} max {Number} 最小值，当ype=number、type=digit 时有效
	 * @property {Number} cursorSpacing {Number} 指定光标与键盘的距离，单位 px 
	 * @property {String} cursorColor {String} 光标颜色
	 * @property {String} confirmType {String} 设置键盘右下角按钮的文字，仅在 type="text" 时生效
	 * @property {Boolean} confirmHold {Boolean} 点击键盘右下角按钮时是否保持键盘不收起
	 * @property {Number} cursor {Number} 指定focus时的光标位置
	 * @property {Number} selectionStart {Number} 光标起始位置，自动聚集时有效，需与selection-end搭配使用
	 * @property {Number} selectionEnd {Number}	光标结束位置，自动聚集时有效，需与selection-start搭配使用
	 * @property {Boolean} adjustPosition {Boolean}	键盘弹起时，是否自动上推页面
	 * @property {Number} size {Number}	输入框字体大小，单位 rpx
	 * @property {String} color {String} 输入框字体颜色
	 * @property {Boolean} inputBorder {Boolean} 是否显示input边框，为true则属性borderTop，borderBottom失效
	 * @property {Boolean} isFillet {Boolean} input是否显示为圆角，设置为true则属性radius失效
	 * @property {Number} radius {Number} 自定义input圆角值，单位rpx
	 * @property {Boolean} borderTop {Boolean} 是否显示上边框	
	 * @property {Number} topLeft {Number} 上边框left值，单位rpx
	 * @property {Number} topRight {Number} 上边框right值，单位rpx
	 * @property {Boolean} borderBottom {Boolean} 是否显示下边框
	 * @property {Number} bottomLeft {Number} 下边框right值，单位rpx
	 * @property {Number} bottomRight {Number} 下边框right值，单位rpx
	 * @property {String} borderColor {String} 边框颜色
	 * @property {Boolean} trim	 {Boolean} 是否自动去除两端的空格
	 * @property {String} textAlign {String} 输入框内容对齐方式，可选值：left、center、right
	 * @property {String} padding {String} 输入框padding值
	 * @property {String} backgroundColor {String} 输入框背景颜色
	 * @property {Number} marginTop {Number} 输入框margin-top值,单位rpx
	 * @event {Function} onclick 点击输入框时触发，(event:string) => void
	 * @event {Function} input 当键盘输入时，触发input事件，(event: string) => void
	 * @event {Function} update:modelValue 输入框值改变时触发，用于双向绑定 (event: string) => void
	 * @event {Function} focus 输入框聚焦时触发，(event: UniInputFocusEvent) => void
	 * @event {Function} blur 输入框失去焦点时触发，(event: UniInputBlurEvent) => void
	 * @event {Function} confirm 点击完成按钮时触发，(event: UniInputConfirmEvent) => void
	 * @event {Function} keyboardheightchange 键盘高度发生变化的时候触发此事件，(event: UniInputKeyboardHeightChangeEvent) => void
	 */
	const __sfc__ = defineComponent({
		name: "fui-input",
		emits: ['input', 'update:modelValue', 'focus', 'blur', 'confirm', 'onclick', 'keyboardheightchange'],
		props: {
			required: {
				type: Boolean,
				default: false
			},
			requiredColor: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			labelSize: {
				type: Number,
				default: 0
			},
			labelColor: {
				type: String,
				default: '#333'
			},
			labelWidth: {
				type: Number,
				default: 140
			},
			clearable: {
				type: Boolean,
				default: false
			},
			clearColor: {
				type: String,
				default: '#CCCCCC'
			},
			focus: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			placeholderStyle: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			value: {
				type: [Object, String, Number],
				default: ''
			},
			//保留属性
			modelValue: {
				type: [Object, String, Number],
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			disabledStyle: {
				type: Boolean,
				default: false
			},
			readonly: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: Number,
				default: 140
			},
			min: {
				type: Number,
				default: -1
			},
			max: {
				type: Number,
				default: -1
			},
			cursorSpacing: {
				type: Number,
				default: 0,
			},
			cursorColor: {
				type: String,
				default: ''
			},
			confirmType: {
				type: String,
				default: 'done'
			},
			confirmHold: {
				type: Boolean,
				default: false,
			},
			cursor: {
				type: Number,
				default: -1
			},
			selectionStart: {
				type: Number,
				default: -1
			},
			selectionEnd: {
				type: Number,
				default: -1
			},
			adjustPosition: {
				type: Boolean,
				default: true
			},
			size: {
				type: Number,
				default: 0
			},
			color: {
				type: String,
				default: '#333'
			},
			inputBorder: {
				type: Boolean,
				default: false
			},
			isFillet: {
				type: Boolean,
				default: false
			},
			radius: {
				type: Number,
				default: 0
			},
			borderTop: {
				type: Boolean,
				default: false
			},
			topLeft: {
				type: Number,
				default: 0
			},
			topRight: {
				type: Number,
				default: 0
			},
			borderBottom: {
				type: Boolean,
				default: true
			},
			bottomLeft: {
				type: Number,
				default: 32
			},
			bottomRight: {
				type: Number,
				default: 0
			},
			borderColor: {
				type: String,
				default: ''
			},
			trim: {
				type: Boolean,
				default: true
			},
			textAlign: {
				type: String,
				default: 'left'
			},
			padding: {
				type: String,
				default: '28rpx 32rpx'
			},
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			marginTop: {
				type: Number,
				default: 0
			}
		},
		data() {
			const refInputId = `fui_input_${parseInt(Math.ceil(Math.random() * 10e5).toString(), 36)}`;
			return {
				refId: refInputId,
				val: '',
				fuiForm: null as null | ComponentPublicInstance,
				//1-string 2-number 3-boolean 4-string[] 5-number[]
				valueType: 1
			}
		},
		computed: {
			getStyle() : object {
				const mp : Map<string, string> = new Map();
				mp.set('padding', this.padding);
				mp.set('background', this.backgroundColor);
				mp.set('margin-top', `${this.marginTop}rpx`);
				mp.set('border-radius', this.isFillet ? '120px' : `${this.radius}rpx`);

				if (this.inputBorder && this.borderColor != '') mp.set('border-color', this.borderColor);

				return mp;
			},
			getBorderRadius() : string {
				let radius = `${this.radius * 2}rpx`
				if (this.isFillet) {
					radius = '240px'
				}
				return radius;
			},
			getBtnLineStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.borderColor != '') mp.set('background', this.borderColor);





				//app端left值与父元素padding-left一致【待修复】

				mp.set('left', `0`);

				mp.set('right', `${this.bottomRight}rpx`);
				return mp;
			},
			getRequiredColor() : object {
				const mp : Map<string, string> = new Map();
				if (this.requiredColor != '') mp.set('color', this.requiredColor);
				return mp;
			},
			getLabelStyl() : object {
				const mp : Map<string, string> = new Map();
				if (this.labelColor != '') mp.set('color', this.labelColor);
				if (this.labelSize != 0) {
					mp.set('fontSize', `${this.labelSize}rpx`);
					mp.set('lineHeight', `${this.labelSize}rpx`);
				}
				return mp;
			}
		},
		watch: {
			focus(val : boolean) {
				this.$nextTick(() => {
					setTimeout(() => {
						this.setFocusOrBlur(val)
					}, 50)
				})
			},
			modelValue() {
				this.val = this.getStringVal(this.modelValue)
			},
			value() {
				this.val = this.getStringVal(this.value)
			}
		},
		created() {
			setTimeout(() => {
				const value = this.getStringVal(this.value)
				const modelValue = this.getStringVal(this.modelValue)
				if (value != '') {
					this.val = value
				} else if (modelValue != '') {
					this.val = modelValue
				}
				//用于submit、reset事件
				const isForm = this.getParent('fui-form');
				if (isForm) {
					const form = this.fuiForm as ComponentPublicInstance
					(form.$data['formChildren'] as ComponentPublicInstance[]).push(this as ComponentPublicInstance);
				}
			}, 50)
		},
		mounted() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.setFocusOrBlur(this.focus)
				}, 300)
			})
		},
		methods: {
			getStringVal(val : any) : string {
				let str : string;
				if (typeof val == 'string') {
					str = val as string;
				} else if (typeof val == 'number') {
					str = (val as number).toString()
				} else {
					str = val.toString()
				}
				return str;
			},
			setFocusOrBlur(focus : boolean) {
				if (focus) {
					(this.$refs[this.refId] as UniElement).focus()
				} else {
					(this.$refs[this.refId] as UniElement).blur()
				}
			},
			isSafeInteger(num : number) : boolean {
				return num >= -9007199254740991 && num <= 9007199254740991;
			},
			onInput(event : UniInputEvent) {
				let value = event.detail.value;
				if (this.trim) value = this.trimStr(value);
				this.val = value;
				let currentVal = parseFloat(value)
				// -9007199254740992 ～ 9007199254740992
				if ((this.type == 'digit' || this.type == 'number') && !
					isNaN(currentVal) && this.isSafeInteger(currentVal)) {
					const min = this.min
					const max = this.max
					if (min != -1 && currentVal < min) {
						currentVal = min
					} else if (max != -1 && max < currentVal) {
						currentVal = max
					}
					value = currentVal.toString()
				}
				this.$nextTick(() => {
					//当输入框为空时，输入框显示不赋值为0
					if (event.detail.value != '') this.val = value;
				})
				//如果为空时返回0 ，当双向绑定会将输入框赋值0
				const inputValue = event.detail.value != '' ? value : ''
				this.$emit('input', inputValue);
				this.$emit('update:modelValue', inputValue)
			},
			onFocus(event : UniInputFocusEvent) {
				this.$emit('focus', event);
			},
			onBlur(event : UniInputBlurEvent) {
				this.$emit('blur', event);
			},
			onConfirm(event : UniInputConfirmEvent) {
				this.$emit('confirm', event);
			},
			onClear() {
				if (this.disabled && !this.readonly) return;
				this.setFocusOrBlur(false)
				this.val = '';
				this.$emit('input', '');
				this.$emit('update:modelValue', '')
			},
			fieldClick() {
				this.$emit('onclick', this.name);
			},
			onKeyboardheightchange(e : UniInputKeyboardHeightChangeEvent) {
				this.$emit('keyboardheightchange', e)
			},
			trimStr(str : string) : string {
				return str.replace(/^\s+|\s+$/g, '');
			},
			getParent(name : string) : boolean {
				if (this.$parent == null) return false;
				let parent = this.$parent as ComponentPublicInstance;
				let parentName = parent.$options['name'];
				while (parentName != name) {
					if (parent.$parent == null) return false;
					parent = parent.$parent as ComponentPublicInstance;
					if (parent.$options['name'] == '') return false;
					parentName = parent.$options['name'];
				}
				this.fuiForm = parent;
				return true;
			},
			//暂时做重置处理（还原需记录初始值）
			reset() {
				this.setFocusOrBlur(false)
				this.val = '';
				this.$emit('input', '');
				this.$emit('update:modelValue', '')
			},
			getSubmitValue() : string {
				return this.val
			}
		}
	})

export default __sfc__
function GenUniModulesFirstuiUnixComponentsFuiInputFuiInputRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return _cE("view", _uM({
    class: _nC(["fui-input__wrap", _uM({'fui-input__border-uvue':_ctx.inputBorder,'fui-input__border-color':_ctx.inputBorder && _ctx.borderColor=='','fui-input__disabled-styl':_ctx.disabled && _ctx.disabledStyle})]),
    style: _nS(_ctx.getStyle),
    onClick: _ctx.fieldClick
  }), [
    isTrue(_ctx.borderTop && !_ctx.inputBorder)
      ? _cE("view", _uM({
          key: 0,
          style: _nS(_uM({background:_ctx.borderColor,left:`${_ctx.topLeft}rpx`,right:`${_ctx.topRight}rpx`})),
          class: _nC(["fui-input__border-top", _uM({'fui-input__background':_ctx.borderColor==''})])
        }), null, 6 /* CLASS, STYLE */)
      : _cC("v-if", true),
    isTrue(_ctx.required)
      ? _cE("view", _uM({
          key: 1,
          class: "fui-input__required"
        }), [
          _cE("text", _uM({
            style: _nS(_ctx.getRequiredColor),
            class: _nC(["fui-input__asterisk-text", _uM({'fui-input__asterisk-color':_ctx.requiredColor==''})])
          }), "*", 6 /* CLASS, STYLE */)
        ])
      : _cC("v-if", true),
    _ctx.label!=''
      ? _cE("view", _uM({
          key: 2,
          class: "fui-input__label",
          style: _nS(_uM({minWidth:`${_ctx.labelWidth}rpx`}))
        }), [
          _cE("text", _uM({
            class: _nC(_uM({'fui-input__label-size':_ctx.labelSize==0})),
            style: _nS(_ctx.getLabelStyl)
          }), _tD(_ctx.label), 7 /* TEXT, CLASS, STYLE */)
        ], 4 /* STYLE */)
      : _cC("v-if", true),
    renderSlot(_ctx.$slots, "left"),
    _cE("input", _uM({
      ref: _ctx.refId,
      class: _nC(["fui-input__self", _uM({'fui-input__disabled':_ctx.disabled || _ctx.readonly,'fui-input__size':_ctx.size==0})]),
      style: _nS(_uM({fontSize:`${_ctx.size}rpx`,color:_ctx.color,textAlign:_ctx.textAlign})),
      "placeholder-class": "fui-input__placeholder",
      type: _ctx.type,
      name: _ctx.name,
      value: _ctx.val,
      placeholder: _ctx.placeholder,
      password: _ctx.password || _ctx.type == 'password',
      "placeholder-style": _ctx.placeholderStyle,
      disabled: _ctx.disabled || _ctx.readonly,
      "cursor-spacing": _ctx.cursorSpacing,
      maxlength: _ctx.maxlength,
      "confirm-type": _ctx.confirmType,
      "confirm-hold": _ctx.confirmHold,
      cursor: _ctx.cursor,
      "selection-start": _ctx.selectionStart,
      "selection-end": _ctx.selectionEnd,
      "adjust-position": _ctx.adjustPosition,
      onFocus: _ctx.onFocus,
      onBlur: _ctx.onBlur,
      onInput: _ctx.onInput,
      onConfirm: _ctx.onConfirm,
      onKeyboardheightchange: _ctx.onKeyboardheightchange
    }), null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["type", "name", "value", "placeholder", "password", "placeholder-style", "disabled", "cursor-spacing", "maxlength", "confirm-type", "confirm-hold", "cursor", "selection-start", "selection-end", "adjust-position", "onFocus", "onBlur", "onInput", "onConfirm", "onKeyboardheightchange"]),
    isTrue(_ctx.clearable && _ctx.val != '')
      ? _cE("view", _uM({
          key: 3,
          class: "fui-input__clear-wrap",
          style: _nS(_uM({background:_ctx.clearColor})),
          onClick: withModifiers(_ctx.onClear, ["stop"])
        }), [
          _cE("view", _uM({ class: "fui-input__clear" }), [
            _cE("view", _uM({ class: "fui-input__clear-a" }))
          ]),
          _cE("view", _uM({ class: "fui-input__clear" }), [
            _cE("view", _uM({ class: "fui-input__clear-b" }))
          ])
        ], 12 /* STYLE, PROPS */, ["onClick"])
      : _cC("v-if", true),
    renderSlot(_ctx.$slots, "default"),
    isTrue(_ctx.borderBottom  && !_ctx.inputBorder)
      ? _cE("view", _uM({
          key: 4,
          style: _nS(_ctx.getBtnLineStyl),
          class: _nC(["fui-input__border-bottom", _uM({'fui-input__background':_ctx.borderColor==''})])
        }), null, 6 /* CLASS, STYLE */)
      : _cC("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
}
export type FuiInputComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesFirstuiUnixComponentsFuiInputFuiInputStyles = [_uM([["fui-input__wrap", _pS(_uM([["width", "100%"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["position", "relative"], ["boxSizing", "border-box"], ["overflow", "visible"]]))], ["fui-input__border-uvue", _pS(_uM([["borderTopWidth", 0.5], ["borderRightWidth", 0.5], ["borderBottomWidth", 0.5], ["borderLeftWidth", 0.5], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"]]))], ["fui-input__border-color", _pS(_uM([["!borderTopColor", "#EEEEEE"], ["!borderRightColor", "#EEEEEE"], ["!borderBottomColor", "#EEEEEE"], ["!borderLeftColor", "#EEEEEE"]]))], ["fui-input__background", _pS(_uM([["!backgroundImage", "none"], ["!backgroundColor", "#EEEEEE"]]))], ["fui-input__border-top", _pS(_uM([["position", "absolute"], ["top", 0], ["height", 1], ["transform", "scaleY(0.5)"], ["transformOrigin", "0 0"], ["zIndex", 1], ["pointerEvents", "none"]]))], ["fui-input__border-bottom", _pS(_uM([["position", "absolute"], ["bottom", 0], ["height", 1], ["transform", "scaleY(0.5)"], ["transformOrigin", "0 100%"], ["zIndex", 1], ["pointerEvents", "none"]]))], ["fui-input__required", _pS(_uM([["position", "absolute"], ["left", "12rpx"], ["height", "100%"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["fui-input__asterisk-text", _pS(_uM([["fontSize", "32rpx"], ["height", "32rpx"], ["lineHeight", "32rpx"]]))], ["fui-input__asterisk-color", _pS(_uM([["!color", "#FF2B2B"]]))], ["fui-input__label", _pS(_uM([["paddingRight", "12rpx"], ["flexShrink", 0]]))], ["fui-input__label-size", _pS(_uM([["!fontSize", "32rpx"], ["!lineHeight", "32rpx"]]))], ["fui-input__self", _pS(_uM([["flex", 1], ["paddingRight", "12rpx"], ["overflow", "visible"], ["backgroundColor", "rgba(0,0,0,0)"], ["boxSizing", "border-box"]]))], ["fui-input__size", _pS(_uM([["!fontSize", "32rpx"]]))], ["fui-input__clear-wrap", _pS(_uM([["width", "32rpx"], ["height", "32rpx"], ["transform", "rotate(45deg) scale(1.1)"], ["position", "relative"], ["flexShrink", 0], ["borderTopLeftRadius", "32rpx"], ["borderTopRightRadius", "32rpx"], ["borderBottomRightRadius", "32rpx"], ["borderBottomLeftRadius", "32rpx"]]))], ["fui-input__clear", _pS(_uM([["width", "32rpx"], ["height", "32rpx"], ["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "center"], ["position", "absolute"], ["left", 0], ["top", 0], ["transform", "scale(0.5)"]]))], ["fui-input__clear-a", _pS(_uM([["width", "32rpx"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ffffff"], ["borderRightColor", "#ffffff"], ["borderBottomColor", "#ffffff"], ["borderLeftColor", "#ffffff"], ["backgroundColor", "#ffffff"], ["boxSizing", "border-box"]]))], ["fui-input__clear-b", _pS(_uM([["height", "32rpx"], ["borderTopWidth", "2rpx"], ["borderRightWidth", "2rpx"], ["borderBottomWidth", "2rpx"], ["borderLeftWidth", "2rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#ffffff"], ["borderRightColor", "#ffffff"], ["borderBottomColor", "#ffffff"], ["borderLeftColor", "#ffffff"], ["backgroundColor", "#ffffff"], ["boxSizing", "border-box"]]))], ["fui-input__placeholder", _pS(_uM([["color", "#CCCCCC"], ["overflow", "visible"]]))], ["fui-input__disabled", _pS(_uM([["pointerEvents", "none"]]))], ["fui-input__disabled-styl", _pS(_uM([["opacity", 0.6]]))]])]
