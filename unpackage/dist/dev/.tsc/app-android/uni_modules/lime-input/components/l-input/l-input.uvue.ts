import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import { InputProps } from './type';
	import { characterLimit, type CharacterLengthResult } from '@/uni_modules/lime-shared/characterLimit';

	import { useDrawBorder, DrawBorderOptions } from '@/uni_modules/lime-style/hairline'

	
	
const __sfc__ = defineComponent({
  __name: 'l-input',

		behaviors: ['wx://form-field']
	,
  __props: InputProps,
  props: {
    adjustPosition: { type: Boolean, required: true, default: true },
    align: { type: String, required: true, default: 'left' },
    alwaysEmbed: { type: Boolean, required: true, default: false },
    autoFocus: { type: Boolean, required: true, default: false },
    bordered: { type: Boolean, required: true, default: true },
    clearTrigger: { type: String, required: true, default: 'focus' },
    clearable: { type: Boolean, required: true, default: false },
    confirmHold: { type: Boolean, required: true, default: false },
    confirmType: { type: String, required: true, default: 'done' },
    cursor: { type: Number, required: true, default: 0 },
    cursorColor: { type: String, required: true, default: '' },
    cursorSpacing: { type: Number, required: true, default: 0 },
    disabled: { type: Boolean, required: true, default: false },
    focus: { type: Boolean, required: true, default: false },
    holdKeyboard: { type: Boolean, required: true, default: false },
    label: { type: String, required: false },
    layout: { type: String, required: true, default: 'horizontal' },
    maxcharacter: { type: Number, required: false },
    maxlength: { type: Number, required: true, default: -1 },
    placeholder: { type: String, required: true, default: '' },
    placeholderStyle: { type: String, required: true, default: '' },
    placeholderClass: { type: String, required: false },
    readonly: { type: Boolean, required: true, default: false },
    safePasswordCertPath: { type: String, required: true, default: '' },
    safePasswordCustomHash: { type: String, required: true, default: '' },
    safePasswordLength: { type: Number, required: false },
    safePasswordNonce: { type: String, required: true, default: '' },
    safePasswordSalt: { type: String, required: true, default: '' },
    safePasswordTimeStamp: { type: Number, required: false },
    selectionEnd: { type: Number, required: true, default: -1 },
    selectionStart: { type: Number, required: true, default: -1 },
    status: { type: String, required: true, default: 'default' },
    prefixIcon: { type: String, required: false },
    prefixIconColor: { type: String, required: false },
    suffix: { type: String, required: false },
    suffixIcon: { type: String, required: false },
    suffixIconColor: { type: String, required: false },
    tips: { type: String, required: false },
    type: { type: String, required: true, default: 'text' },
    value: { type: [String, Number], required: false },
    modelValue: { type: [String, Number], required: false },
    lStyle: { type: String, required: false },
    lableStyle: { type: String, required: false },
    tipsStyle: { type: String, required: false },
    inputStyle: { type: String, required: false },
    borderColor: { type: String, required: false },
    classic: { type: Boolean, required: true, default: false },
    focused: { type: Boolean, required: true, default: false },
    focusedBorderColor: { type: String, required: false },
    prefixIconSize: { type: String, required: false },
    suffixIconSize: { type: String, required: false },
    clearIconSize: { type: String, required: false }
  },
  emits: ['change', 'update:modelValue' ,'focus', 'blur', 'confirm', 'clear', 'keyboardheightchange', 'nicknamereview' ,'click-icon'],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Input 输入框组件
	 * @description 增强版输入组件，支持安全加密输入、多类型验证和智能交互
	 * <br> 插件类型：LInputComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-input
	 * 
	 * @property {boolean} adjustPosition 键盘弹起时页面自动上推
	 * @property {'left'|'center'|'right'} align 文本对齐方式
	 * @value left   
	 * @value center  
	 * @value right    
	 * @property {boolean} alwaysEmbed iOS强制同层渲染（仅iOS生效）
	 * @property {boolean} autoFocus 自动聚焦（即将废弃，建议使用focus）
	 * @property {boolean} bordered 边框模式
	 * @property {'always'|'focus'} clearTrigger 清空按钮显示规则
	 * @value always
	 * @value focus     
	 * @property {boolean} clearable 显示清空按钮
	 * @property {boolean} confirmHold 点击确认按钮保持键盘
	 * @property {'send'|'search'|'next'|'go'|'done'} confirmType 确认按钮类型
	 * @value send    显示"发送"
	 * @value search  显示"搜索"
	 * @value next    显示"下一个"
	 * @value go      显示"前往"
	 * @value done    显示"完成"
	 * @property {number} cursor 初始光标位置（需配合selectionStart/End）
	 * @property {string} cursorColor 光标颜色
	 * @property {number} cursorSpacing 光标与键盘间距（单位px）
	 * @property {boolean} disabled 禁用状态
	 * @property {boolean} focus 强制聚焦
	 * @property {boolean} focused 是否显示获焦样式，用于结合自定义键盘使用时显示高亮效果
	 * @property {boolean} classic 是否使用经典边框样式
	 * @property {boolean} holdKeyboard 聚焦时保持键盘不收起
	 * @property {string} label 左侧标签文本
	 * @property {'horizontal'|'vertical'} layout 标签布局
	 * @value horizontal 
	 * @value vertical
	 * @property {number} maxcharacter 最大字符长度（中文算2字符）
	 * @property {number} maxlength 最大输入长度（中文算1字符）
	 * @property {string} placeholder 占位文本
	 * @property {string} placeholderStyle 占位符内联样式
	 * @property {string} placeholderClass 占位符CSS类名
	 * @property {boolean} readonly 只读模式
	 * @property {string} safePasswordCertPath 安全证书路径（仅App）
	 * @property {string} safePasswordCustomHash 自定义哈希算法（仅App）
	 * @property {number} safePasswordLength 安全密码长度（仅App）
	 * @property {string} safePasswordNonce 加密随机数（仅App）
	 * @property {string} safePasswordSalt 加密盐值（仅App）
	 * @property {number} safePasswordTimeStamp 加密时间戳（仅App）
	 * @property {'default'|'success'|'warning'|'error'} status 校验状态
	 * @value default
	 * @value success
	 * @value warning
	 * @value error
	 * @property {string} prefixIcon 前缀图标（支持图片路径/字体图标）
	 * @property {string} prefixIconSize 前缀图标尺寸（带单位）
	 * @property {string} prefixIconColor 前缀图标颜色
	 * @property {string} suffix 后缀文本内容
	 * @property {string} suffixIcon 后缀图标（支持图片路径/字体图标）
	 * @property {string} suffixIconSize 后缀图标尺寸（带单位）
	 * @property {string} clearIconSize 删除图标尺寸
	 * @property {string} suffixIconColor 后缀图标颜色
	 * @property {string} tips 底部提示文本（根据status变色）
	 * @property {'text'|'number'|'idcard'|'digit'|'safe-password'|'password'|'nickname'} type 输入类型
	 * @value text           普通文本
	 * @value number         数字键盘（非强制）
	 * @value idcard         身份证键盘（带X）
	 * @value digit          强制数字键盘
	 * @value safe-password  安全加密输入
	 * @value password       密码输入
	 * @value nickname       昵称输入（过滤特殊字符）
	 * @property {string} value 输入值（支持v-model）
	 * @property {string} modelValue 输入值（支持v-model）
	 * @property {string} lStyle 根节点自定义样式
	 * @property {string} lableStyle 标签样式
	 * @property {string} tipsStyle 提示文本样式
	 * @property {string} inputStyle 输入域样式
	 * @property {string} borderColor 边框颜色（bordered时生效）
	 * @property {string} focusedBorderColor 聚焦时边框颜色（bordered时生效）
	 * @event {Function} change 输入时触发
	 * @event {Function} focus 聚焦时触发
	 * @event {Function} blur 失焦时触发
	 * @event {Function} confirm 点击完成按钮触发
	 * @event {Function} clear 点击清空按钮触发
	 * @event {Function} click-icon 点击触发
	 */
	
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props
	
	const formItemBlur = inject<(() => void)|null>('formItemBlur', null);
	const formDisabled = inject<Ref<boolean|null>|null>('formDisabled', null)
	const formReadonly = inject<Ref<boolean|null>|null>('formReadonly', null)
	
	const calculateValue = (value: string|number):CharacterLengthResult => {
		// const _value =  typeof value == 'string' && props.type == 'number' ? parseFloat(value) : value
		const { maxlength, maxcharacter } = props;
		if(maxcharacter != null && maxcharacter > 0) {
			return characterLimit('maxcharacter', `${value}`, maxcharacter)
		} 
		// else if(maxlength > 0) {
		// 	return characterLimit('maxlength', value, maxlength)
		// }
		return {
			characters: `${value}`,
			length: `${value}`.length
		} as CharacterLengthResult
	}
	let _innerValue = ref<string|number>('');
	const innerFocused = ref(props.focus || props.focused);
	// const modelValue = defineModel({type: [String, Number], default: ''})
	const innerValue = computed({
		set(value: string|number) {
			// modelValue.value = value;
			_innerValue.value = value;
			emit('change', value)
			emit('update:modelValue', value)
		},
		get():string|number {
			const _value = props.value ?? props.modelValue
			if(_innerValue.value != _value && props.type != 'number') {
				const { characters } = calculateValue(`${_value ?? _innerValue.value}`);
				return characters
			}
			return _value ?? _innerValue.value
		}
	} as WritableComputedOptions<string>)
	
	const isDisabled = computed(():boolean => props.disabled || (formDisabled?.value ?? false))
	const isReadonly = computed(():boolean => props.readonly || (formReadonly?.value ?? false))
	
	const styles = computed(():Map<string, any>=>{
		const style = new Map<string, any>()








		return style
	})
	const showClearIcon = computed(():boolean => {
		const { clearTrigger, disabled, readonly } = props;
		if(disabled || readonly) {
			return false
		}
		return `${innerValue.value}`.length > 0 || clearTrigger == 'always' 
	})
	const onInput = (e: UniInputEvent) => {
		const { value, cursor, keyCode } = e.detail;
		if(props.type == 'number') {
			const _v:number = parseFloat(`${value}`)
			// @ts-ignore
			innerValue.value = isNaN(_v) ? '' : _v;
		} else {
			const { characters } = calculateValue(value);
			innerValue.value = characters;
		}
	}
	const onFocus = (event: UniInputFocusEvent) => {
		innerFocused.value = true;
		emit('focus', event)
	}
	const onBlur = (event: UniInputBlurEvent) => {
		innerFocused.value = false;
		emit('blur', event)
		formItemBlur?.()
	}
	const onConfirm = (event: UniInputConfirmEvent) => {
		emit('confirm', event)
	}
	const onKeyboardHeightChange = (event: UniInputKeyboardHeightChangeEvent) => {
		emit('keyboardheightchange', event)
	}
	const onNickNameReview = (event: any) => {
		emit('nicknamereview', event)
	}
	const clearInput = () => {
		innerValue.value = '';
		emit('clear')
	}
	const onSuffixClick = () => {
		emit('click-icon', { trigger: 'suffix' })
	}
	const onSuffixIconClick = () => {
		emit('click-icon', { trigger: 'suffix-icon' })
	}
	watchEffect(()=> {
		innerFocused.value = props.focus || props.focused;
	})

	const rootRef = ref<UniElement|null>(null);
	const { clearBorder, color, renderBorder } = useDrawBorder(rootRef, 
		{  
			direction: 'bottom',
			watchSize: true,
			startOffset: 16,
			immediate: false,
			color: props.borderColor 
		} as DrawBorderOptions)
		
	onMounted(()=>{
		watchEffect(()=>{
			
			if(!props.classic) {
				if(props.borderColor != null && !innerFocused.value) {
					rootRef.value?.style.setProperty('border-color', props.borderColor)
				}
				if(props.focusedBorderColor != null && innerFocused.value) {
					rootRef.value?.style.setProperty('border-color', props.focusedBorderColor)
				}
			}
			
			if(!props.bordered || props.classic) {
				clearBorder()
				return
			}
			if(props.borderColor != null) {
				color.value = props.borderColor!
			}
			renderBorder()
		})
	})


return (): any | null => {

const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)

  return _cE("view", _uM({
    class: _nC(["l-input", [
			'l-input--' + _ctx.layout,
			_ctx.classic ? 'l-input--classic-' + _ctx.status : '',
			_uM({'l-input--classic': _ctx.classic}),
			_uM({'l-input--classic-disabled':  _ctx.classic && _ctx.disabled}),
			_uM({'l-input--classic-focused':  _ctx.classic && !_ctx.disabled && unref(innerFocused)}),
			_uM({'l-input--border': _ctx.bordered && !_ctx.classic})]]),
    style: _nS([unref(styles), _ctx.lStyle]),
    ref_key: "rootRef",
    ref: rootRef
  }), [
    isTrue(_ctx.label != null || _ctx.$slots['label'] != null || _ctx.$slots['prefix-icon'] != null || _ctx.prefixIcon != null)
      ? _cE("view", _uM({
          key: 0,
          class: "l-input__wrap--prefix"
        }), [
          renderSlot(_ctx.$slots, "prefix-icon", {}, (): any[] => [
            _ctx.prefixIcon != null
              ? _cV(_component_l_icon, _uM({
                  key: 0,
                  class: "l-input__icon--prefix",
                  name: _ctx.prefixIcon,
                  color: _ctx.prefixIconColor,
                  size: _ctx.prefixIconSize
                }), null, 8 /* PROPS */, ["name", "color", "size"])
              : _cC("v-if", true)
          ]),
          isTrue(_ctx.label != null || _ctx.$slots['label'] != null )
            ? _cE("text", _uM({
                key: 0,
                class: _nC(["l-input__label", _uM({ 'l-input__label--gap': _ctx.prefixIcon != null || _ctx.$slots['prefix-icon'] != null})]),
                style: _nS([_ctx.lableStyle])
              }), [
                renderSlot(_ctx.$slots, "label", {}, (): any[] => [_tD(_ctx.label)])
              ], 6 /* CLASS, STYLE */)
            : _cC("v-if", true)
        ])
      : _cC("v-if", true),
    _cE("view", _uM({ class: "l-input__wrap" }), [
      _cE("view", _uM({ class: "l-input__content" }), [
        _cE("input", _uM({
          class: _nC(["l-input__control", [
						'l-input--' + _ctx.align,
						_uM({
							'l-input__control--disabled': unref(isDisabled),
							'l-input__control--read-only': unref(isReadonly),
						})
					]]),
          style: _nS([_ctx.inputStyle]),
          maxlength: _ctx.maxlength,
          disabled: unref(isDisabled) || unref(isReadonly),
          placeholder: _ctx.placeholder,
          "placeholder-style": _ctx.placeholderStyle,
          "placeholder-class": _ctx.placeholderStyle == '' ?  (unref(isDisabled) || unref(isReadonly) ? 'l-input__placeholder--disabled' : 'l-input__placeholder') : '',
          value: unref(innerValue),
          type: _ctx.type == 'password' ? 'text' : _ctx.type,
          password: _ctx.type == 'password',
          focus: _ctx.focus,
          "confirm-type": _ctx.confirmType,
          "confirm-hold": _ctx.confirmHold,
          cursor: _ctx.cursor,
          "cursor-color": _ctx.cursorColor,
          "cursor-spacing": _ctx.cursorSpacing,
          "adjust-position": _ctx.adjustPosition,
          "auto-focus": _ctx.autoFocus,
          "always-embed": _ctx.alwaysEmbed,
          "selection-start": _ctx.selectionStart,
          "selection-end": _ctx.selectionEnd,
          "hold-keyboard": _ctx.holdKeyboard,
          "safe-password-cert-path": _ctx.safePasswordCertPath,
          "safe-password-length": _ctx.safePasswordLength,
          "safe-password-time-stamp": _ctx.safePasswordTimeStamp,
          "safe-password-nonce": _ctx.safePasswordNonce,
          "safe-password-salt": _ctx.safePasswordSalt,
          "safe-password-custom-hash": _ctx.safePasswordCustomHash,
          "aria-label": _ctx.label,
          "aria-roledescription": _ctx.label,
          onInput: onInput,
          onFocus: onFocus,
          onBlur: onBlur,
          onConfirm: onConfirm,
          onKeyboardheightchange: onKeyboardHeightChange,
          onNicknamereview: onNickNameReview
        }), null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["maxlength", "disabled", "placeholder", "placeholder-style", "placeholder-class", "value", "type", "password", "focus", "confirm-type", "confirm-hold", "cursor", "cursor-color", "cursor-spacing", "adjust-position", "auto-focus", "always-embed", "selection-start", "selection-end", "hold-keyboard", "safe-password-cert-path", "safe-password-length", "safe-password-time-stamp", "safe-password-nonce", "safe-password-salt", "safe-password-custom-hash", "aria-label", "aria-roledescription"]),
        isTrue(_ctx.clearable)
          ? withDirectives(_cE("view", _uM({
              key: 0,
              onClick: clearInput
            }), [
              _cV(_component_l_icon, _uM({
                class: "l-input__wrap--clearable-icon",
                name: "close-circle-filled",
                size: _ctx.clearIconSize
              }), null, 8 /* PROPS */, ["size"])
            ], 512 /* NEED_PATCH */), [
              [vShow, unref(showClearIcon)]
            ])
          : _cC("v-if", true),
        isTrue(_ctx.suffix != null || _ctx.$slots['suffix'] != null)
          ? _cE("view", _uM({
              key: 1,
              class: "l-input__wrap--suffix",
              onClick: onSuffixClick
            }), [
              renderSlot(_ctx.$slots, "suffix", {}, (): any[] => [
                _cE("text", _uM({ class: "l-input__wrap--suffix-text" }), _tD(_ctx.suffix), 1 /* TEXT */)
              ])
            ])
          : _cC("v-if", true),
        renderSlot(_ctx.$slots, "suffix-icon", {}, (): any[] => [
          _ctx.suffixIcon != null
            ? _cV(_component_l_icon, _uM({
                key: 0,
                class: "l-input__wrap--suffix-icon",
                name: _ctx.suffixIcon,
                size: _ctx.suffixIconSize,
                color: _ctx.suffixIconColor
              }), null, 8 /* PROPS */, ["name", "size", "color"])
            : _cC("v-if", true)
        ])
      ]),
      isTrue(_ctx.tips != null && _ctx.tips!.length > 0 || _ctx.$slots['tips'] != null)
        ? _cE("text", _uM({
            key: 0,
            class: _nC(["l-input__tips", ['l-input__tips--' + _ctx.status]]),
            style: _nS([_ctx.tipsStyle])
          }), [
            renderSlot(_ctx.$slots, "tips", {}, (): any[] => [_tD(_ctx.tips)])
          ], 6 /* CLASS, STYLE */)
        : _cC("v-if", true)
    ])
  ], 6 /* CLASS, STYLE */)
}
}

})
export default __sfc__
export type LInputComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeInputComponentsLInputLInputStyles = [_uM([["l-input", _pS(_uM([["backgroundColor", "var(--l-input-bg-color, #fff)"], ["alignItems", "center"], ["width", "100%"], ["paddingTop", "var(--l-input-padding-y, 16px)"], ["paddingRight", "var(--l-input-padding-x, 16px)"], ["paddingBottom", "var(--l-input-padding-y, 16px)"], ["paddingLeft", "var(--l-input-padding-x, 16px)"]]))], ["l-input--horizontal", _pS(_uM([["flexDirection", "row"]]))], ["l-input--vertical", _pS(_uM([["alignItems", "stretch"]]))], ["l-input--border", _pS(_uM([["position", "relative"]]))], ["l-input--classic", _pS(_uM([["paddingTop", "var(--l-input-classic-padding-y, 12px)"], ["paddingRight", "var(--l-input-classic-padding-x, 16px)"], ["paddingBottom", "var(--l-input-classic-padding-y, 12px)"], ["paddingLeft", "var(--l-input-classic-padding-x, 16px)"], ["borderTopLeftRadius", "var(--l-input-border-radius, 12rpx)"], ["borderTopRightRadius", "var(--l-input-border-radius, 12rpx)"], ["borderBottomRightRadius", "var(--l-input-border-radius, 12rpx)"], ["borderBottomLeftRadius", "var(--l-input-border-radius, 12rpx)"], ["borderTopWidth", 0.5], ["borderRightWidth", 0.5], ["borderBottomWidth", 0.5], ["borderLeftWidth", 0.5], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"]]))], ["l-input--classic-default", _pS(_uM([["borderTopColor", "var(--l-input-border-color,#e7e7e7)"], ["borderRightColor", "var(--l-input-border-color,#e7e7e7)"], ["borderBottomColor", "var(--l-input-border-color,#e7e7e7)"], ["borderLeftColor", "var(--l-input-border-color,#e7e7e7)"]]))], ["l-input--classic-error", _pS(_uM([["borderTopColor", "var(--l-input-error-tips-color,#FF4D4F)"], ["borderRightColor", "var(--l-input-error-tips-color,#FF4D4F)"], ["borderBottomColor", "var(--l-input-error-tips-color,#FF4D4F)"], ["borderLeftColor", "var(--l-input-error-tips-color,#FF4D4F)"]]))], ["l-input--classic-success", _pS(_uM([["borderTopColor", "var(--l-input-success-tips-color,#34c471)"], ["borderRightColor", "var(--l-input-success-tips-color,#34c471)"], ["borderBottomColor", "var(--l-input-success-tips-color,#34c471)"], ["borderLeftColor", "var(--l-input-success-tips-color,#34c471)"]]))], ["l-input--classic-warning", _pS(_uM([["borderTopColor", "var(--l-input-warning-tips-color,#ffb400)"], ["borderRightColor", "var(--l-input-warning-tips-color,#ffb400)"], ["borderBottomColor", "var(--l-input-warning-tips-color,#ffb400)"], ["borderLeftColor", "var(--l-input-warning-tips-color,#ffb400)"]]))], ["l-input--classic-disabled", _pS(_uM([["backgroundColor", "var(--l-input-disabled-bg-color, rgba(0, 0, 0, 0.04))"]]))], ["l-input__wrap--prefix", _pS(_uM([["flexDirection", "row"], ["alignItems", "center"]]))], ["l-input__icon--prefix", _pS(_uM([["fontSize", "44rpx"], ["color", "var(--l-input-prefix-icon-color, rgba(0, 0, 0, 0.88))"]]))], ["l-input__label", _uM([["", _uM([["minWidth", "var(--l-input-label-min-width, 64rpx)"], ["fontSize", 16], ["lineHeight", "48rpx"], ["color", "var(--l-input-label-text-color, rgba(0, 0, 0, 0.88))"], ["marginRight", "32rpx"]])], [".l-input--horizontal ", _uM([["maxWidth", "var(--l-input-label-max-width, 160rpx)"]])], [".l-input--vertical ", _uM([["fontSize", 14], ["paddingBottom", "8rpx"]])]])], ["l-input__label--gap", _pS(_uM([["marginLeft", "8rpx"]]))], ["l-input__wrap", _pS(_uM([["justifyContent", "center"], ["flex", 1]]))], ["l-input__content", _uM([[".l-input__wrap ", _uM([["flexDirection", "row"], ["width", "100%"], ["alignItems", "center"]])]])], ["l-input__wrap--clearable-icon", _pS(_uM([["flex", "0 0 auto"], ["paddingLeft", "24rpx"], ["boxSizing", "content-box"], ["!fontSize", "var(--l-input-suffix-icon-size, 22px)"], ["!color", "var(--l-input-suffix-icon-color, rgba(0, 0, 0, 0.45))"]]))], ["l-input__wrap--suffix-icon", _pS(_uM([["flex", "0 0 auto"], ["paddingLeft", "24rpx"], ["boxSizing", "content-box"], ["!fontSize", "var(--l-input-suffix-icon-size, 22px)"], ["!color", "var(--l-input-suffix-icon-color, rgba(0, 0, 0, 0.45))"]]))], ["l-input__wrap--suffix", _pS(_uM([["flex", "0 0 auto"], ["paddingLeft", "24rpx"], ["boxSizing", "content-box"]]))], ["l-input__wrap--suffix-text", _pS(_uM([["fontSize", 16], ["color", "var(--l-input-suffix-text-color, rgba(0, 0, 0, 0.88))"]]))], ["l-input__control", _pS(_uM([["flex", 1], ["boxSizing", "border-box"], ["minWidth", 0], ["minHeight", "48rpx"], ["marginTop", 0], ["marginRight", 0], ["marginBottom", 0], ["marginLeft", 0], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["color", "var(--l-input-text-color, rgba(0, 0, 0, 0.88))"], ["backgroundColor", "rgba(0,0,0,0)"], ["borderTopWidth", 0], ["borderRightWidth", 0], ["borderBottomWidth", 0], ["borderLeftWidth", 0], ["borderTopStyle", "none"], ["borderRightStyle", "none"], ["borderBottomStyle", "none"], ["borderLeftStyle", "none"], ["borderTopColor", "#000000"], ["borderRightColor", "#000000"], ["borderBottomColor", "#000000"], ["borderLeftColor", "#000000"], ["fontSize", 16]]))], ["l-input__control--disabled", _pS(_uM([["color", "var(--l-input-disabled-text-color, rgba(0, 0, 0, 0.25))"], ["opacity", 1]]))], ["l-input--left", _pS(_uM([["textAlign", "left"]]))], ["l-input--right", _pS(_uM([["textAlign", "right"]]))], ["l-input--center", _pS(_uM([["textAlign", "center"]]))], ["l-input__placeholder", _pS(_uM([["color", "var(--l-input-placeholder-text-color, rgba(0, 0, 0, 0.45))"], ["fontSize", "var(--l-input-placeholder-text-font-size, 16px)"]]))], ["l-input__placeholder--disabled", _pS(_uM([["fontSize", "var(--l-input-placeholder-text-font-size, 16px)"], ["color", "var(--l-input-disabled-text-color, rgba(0, 0, 0, 0.25))"]]))], ["l-input__tips", _pS(_uM([["fontSize", 12], ["lineHeight", "40rpx"], ["paddingTop", "8rpx"]]))], ["l-input__tips--default", _pS(_uM([["color", "var(--l-input-tips-color, rgba(0, 0, 0, 0.45))"]]))], ["l-input__tips--success", _pS(_uM([["color", "var(--l-input-success-tips-color, #34c471)"]]))], ["l-input__tips--warning", _pS(_uM([["color", "var(--l-input-warning-tips-color, #ffb400)"]]))], ["l-input__tips--error", _pS(_uM([["color", "var(--l-input-error-tips-color, #FF4D4F)"]]))]])]
