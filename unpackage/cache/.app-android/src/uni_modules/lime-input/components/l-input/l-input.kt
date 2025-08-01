@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI1F0985E
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
open class GenUniModulesLimeInputComponentsLInputLInput : VueComponent, InputProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var adjustPosition: Boolean by `$props`
    override var align: String by `$props`
    override var alwaysEmbed: Boolean by `$props`
    override var autoFocus: Boolean by `$props`
    override var bordered: Boolean by `$props`
    override var clearTrigger: String by `$props`
    override var clearable: Boolean by `$props`
    override var confirmHold: Boolean by `$props`
    override var confirmType: String by `$props`
    override var cursor: Number by `$props`
    override var cursorColor: String by `$props`
    override var cursorSpacing: Number by `$props`
    override var disabled: Boolean by `$props`
    override var focus: Boolean by `$props`
    override var holdKeyboard: Boolean by `$props`
    override var label: String? by `$props`
    override var layout: String by `$props`
    override var maxcharacter: Number? by `$props`
    override var maxlength: Number by `$props`
    override var placeholder: String by `$props`
    override var placeholderStyle: String by `$props`
    override var placeholderClass: String? by `$props`
    override var readonly: Boolean by `$props`
    override var safePasswordCertPath: String by `$props`
    override var safePasswordCustomHash: String by `$props`
    override var safePasswordLength: Number? by `$props`
    override var safePasswordNonce: String by `$props`
    override var safePasswordSalt: String by `$props`
    override var safePasswordTimeStamp: Number? by `$props`
    override var selectionEnd: Number by `$props`
    override var selectionStart: Number by `$props`
    override var status: String by `$props`
    override var prefixIcon: String? by `$props`
    override var prefixIconColor: String? by `$props`
    override var suffix: String? by `$props`
    override var suffixIcon: String? by `$props`
    override var suffixIconColor: String? by `$props`
    override var tips: String? by `$props`
    override var type: String by `$props`
    override var value: Any? by `$props`
    override var modelValue: Any? by `$props`
    override var lStyle: String? by `$props`
    override var lableStyle: String? by `$props`
    override var tipsStyle: String? by `$props`
    override var inputStyle: String? by `$props`
    override var borderColor: String? by `$props`
    override var classic: Boolean by `$props`
    override var focused: Boolean by `$props`
    override var focusedBorderColor: String? by `$props`
    override var prefixIconSize: String? by `$props`
    override var suffixIconSize: String? by `$props`
    override var clearIconSize: String? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeInputComponentsLInputLInput) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeInputComponentsLInputLInput
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val formItemBlur = inject<(() -> Unit)?>("formItemBlur", null)
            val formDisabled = inject<Ref<Boolean?>?>("formDisabled", null)
            val formReadonly = inject<Ref<Boolean?>?>("formReadonly", null)
            val calculateValue = fun(value: Any): CharacterLengthResult {
                val maxlength = props.maxlength
                val maxcharacter = props.maxcharacter
                if (maxcharacter != null && maxcharacter > 0) {
                    return characterLimit("maxcharacter", "" + value, maxcharacter)
                }
                return CharacterLengthResult(characters = "" + value, length = ("" + value).length)
            }
            var _innerValue = ref<Any>("")
            val innerFocused = ref(props.focus || props.focused)
            val innerValue = computed(WritableComputedOptions(set = fun(value: Any) {
                _innerValue.value = value
                emit("change", value)
                emit("update:modelValue", value)
            }
            , get = fun(): Any {
                val _value = props.value ?: props.modelValue
                if (_innerValue.value != _value && props.type != "number") {
                    val characters = calculateValue("" + (_value ?: _innerValue.value)).characters
                    return characters
                }
                return _value ?: _innerValue.value
            }
            ))
            val isDisabled = computed(fun(): Boolean {
                return props.disabled || (formDisabled?.value ?: false)
            }
            )
            val isReadonly = computed(fun(): Boolean {
                return props.readonly || (formReadonly?.value ?: false)
            }
            )
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                return style
            }
            )
            val showClearIcon = computed(fun(): Boolean {
                val clearTrigger = props.clearTrigger
                val disabled = props.disabled
                val readonly = props.readonly
                if (disabled || readonly) {
                    return false
                }
                return ("" + innerValue.value).length > 0 || clearTrigger == "always"
            }
            )
            val onInput = fun(e: UniInputEvent){
                val _e_detail = e.detail
                val value = _e_detail.value
                val cursor = _e_detail.cursor
                val keyCode = _e_detail.keyCode
                if (props.type == "number") {
                    val _v: Number = parseFloat("" + value)
                    innerValue.value = if (isNaN(_v)) {
                        ""
                    } else {
                        _v
                    }
                } else {
                    val characters = calculateValue(value).characters
                    innerValue.value = characters
                }
            }
            val onFocus = fun(event: UniInputFocusEvent){
                innerFocused.value = true
                emit("focus", event)
            }
            val onBlur = fun(event: UniInputBlurEvent){
                innerFocused.value = false
                emit("blur", event)
                formItemBlur?.invoke()
            }
            val onConfirm = fun(event: UniInputConfirmEvent){
                emit("confirm", event)
            }
            val onKeyboardHeightChange = fun(event: UniInputKeyboardHeightChangeEvent){
                emit("keyboardheightchange", event)
            }
            val onNickNameReview = fun(event: Any){
                emit("nicknamereview", event)
            }
            val clearInput = fun(){
                innerValue.value = ""
                emit("clear")
            }
            val onSuffixClick = fun(){
                emit("click-icon", object : UTSJSONObject() {
                    var trigger = "suffix"
                })
            }
            watchEffect(fun(){
                innerFocused.value = props.focus || props.focused
            }
            )
            val rootRef = ref<UniElement?>(null)
            val _useDrawBorder = useDrawBorder(rootRef, DrawBorderOptions(direction = "bottom", watchSize = true, startOffset = 16, immediate = false, color = props.borderColor))
            val clearBorder = _useDrawBorder.clearBorder
            val color = _useDrawBorder.color
            val renderBorder = _useDrawBorder.renderBorder
            onMounted(fun(){
                watchEffect(fun(){
                    if (!props.classic) {
                        if (props.borderColor != null && !innerFocused.value) {
                            rootRef.value?.style?.setProperty("border-color", props.borderColor)
                        }
                        if (props.focusedBorderColor != null && innerFocused.value) {
                            rootRef.value?.style?.setProperty("border-color", props.focusedBorderColor)
                        }
                    }
                    if (!props.bordered || props.classic) {
                        clearBorder()
                        return
                    }
                    if (props.borderColor != null) {
                        color.value = props.borderColor!!
                    }
                    renderBorder()
                }
                )
            }
            )
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "l-input",
                    _uA(
                        "l-input--" + _ctx.layout,
                        if (_ctx.classic) {
                            "l-input--classic-" + _ctx.status
                        } else {
                            ""
                        }
                        ,
                        _uM("l-input--classic" to _ctx.classic),
                        _uM("l-input--classic-disabled" to (_ctx.classic && _ctx.disabled)),
                        _uM("l-input--classic-focused" to (_ctx.classic && !_ctx.disabled && unref(innerFocused))),
                        _uM("l-input--border" to (_ctx.bordered && !_ctx.classic))
                    )
                )), "style" to _nS(_uA(
                    unref(styles),
                    _ctx.lStyle
                )), "ref_key" to "rootRef", "ref" to rootRef), _uA(
                    if (isTrue(_ctx.label != null || _ctx.`$slots`["label"] != null || _ctx.`$slots`["prefix-icon"] != null || _ctx.prefixIcon != null)) {
                        _cE("view", _uM("key" to 0, "class" to "l-input__wrap--prefix"), _uA(
                            renderSlot(_ctx.`$slots`, "prefix-icon", UTSJSONObject(), fun(): UTSArray<Any> {
                                return _uA(
                                    if (_ctx.prefixIcon != null) {
                                        _cV(_component_l_icon, _uM("key" to 0, "class" to "l-input__icon--prefix", "name" to _ctx.prefixIcon, "color" to _ctx.prefixIconColor, "size" to _ctx.prefixIconSize), null, 8, _uA(
                                            "name",
                                            "color",
                                            "size"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                )
                            }),
                            if (isTrue(_ctx.label != null || _ctx.`$slots`["label"] != null)) {
                                _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                    "l-input__label",
                                    _uM("l-input__label--gap" to (_ctx.prefixIcon != null || _ctx.`$slots`["prefix-icon"] != null))
                                )), "style" to _nS(_uA(
                                    _ctx.lableStyle
                                ))), _uA(
                                    renderSlot(_ctx.`$slots`, "label", UTSJSONObject(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(_ctx.label)
                                        )
                                    })
                                ), 6)
                            } else {
                                _cC("v-if", true)
                            }
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("view", _uM("class" to "l-input__wrap"), _uA(
                        _cE("view", _uM("class" to "l-input__content"), _uA(
                            _cE("input", _uM("class" to _nC(_uA(
                                "l-input__control",
                                _uA(
                                    "l-input--" + _ctx.align,
                                    _uM("l-input__control--disabled" to unref(isDisabled), "l-input__control--read-only" to unref(isReadonly))
                                )
                            )), "style" to _nS(_uA(
                                _ctx.inputStyle
                            )), "maxlength" to _ctx.maxlength, "disabled" to (unref(isDisabled) || unref(isReadonly)), "placeholder" to _ctx.placeholder, "placeholder-style" to _ctx.placeholderStyle, "placeholder-class" to if (_ctx.placeholderStyle == "") {
                                if (unref(isDisabled) || unref(isReadonly)) {
                                    "l-input__placeholder--disabled"
                                } else {
                                    "l-input__placeholder"
                                }
                            } else {
                                ""
                            }
                            , "value" to unref(innerValue), "type" to if (_ctx.type == "password") {
                                "text"
                            } else {
                                _ctx.type
                            }
                            , "password" to (_ctx.type == "password"), "focus" to _ctx.focus, "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "cursor" to _ctx.cursor, "cursor-color" to _ctx.cursorColor, "cursor-spacing" to _ctx.cursorSpacing, "adjust-position" to _ctx.adjustPosition, "auto-focus" to _ctx.autoFocus, "always-embed" to _ctx.alwaysEmbed, "selection-start" to _ctx.selectionStart, "selection-end" to _ctx.selectionEnd, "hold-keyboard" to _ctx.holdKeyboard, "safe-password-cert-path" to _ctx.safePasswordCertPath, "safe-password-length" to _ctx.safePasswordLength, "safe-password-time-stamp" to _ctx.safePasswordTimeStamp, "safe-password-nonce" to _ctx.safePasswordNonce, "safe-password-salt" to _ctx.safePasswordSalt, "safe-password-custom-hash" to _ctx.safePasswordCustomHash, "aria-label" to _ctx.label, "aria-roledescription" to _ctx.label, "onInput" to onInput, "onFocus" to onFocus, "onBlur" to onBlur, "onConfirm" to onConfirm, "onKeyboardheightchange" to onKeyboardHeightChange, "onNicknamereview" to onNickNameReview), null, 46, _uA(
                                "maxlength",
                                "disabled",
                                "placeholder",
                                "placeholder-style",
                                "placeholder-class",
                                "value",
                                "type",
                                "password",
                                "focus",
                                "confirm-type",
                                "confirm-hold",
                                "cursor",
                                "cursor-color",
                                "cursor-spacing",
                                "adjust-position",
                                "auto-focus",
                                "always-embed",
                                "selection-start",
                                "selection-end",
                                "hold-keyboard",
                                "safe-password-cert-path",
                                "safe-password-length",
                                "safe-password-time-stamp",
                                "safe-password-nonce",
                                "safe-password-salt",
                                "safe-password-custom-hash",
                                "aria-label",
                                "aria-roledescription"
                            )),
                            if (isTrue(_ctx.clearable)) {
                                withDirectives(_cE("view", _uM("key" to 0, "onClick" to clearInput), _uA(
                                    _cV(_component_l_icon, _uM("class" to "l-input__wrap--clearable-icon", "name" to "close-circle-filled", "size" to _ctx.clearIconSize), null, 8, _uA(
                                        "size"
                                    ))
                                ), 512), _uA(
                                    _uA(
                                        vShow,
                                        unref(showClearIcon)
                                    )
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            if (isTrue(_ctx.suffix != null || _ctx.`$slots`["suffix"] != null)) {
                                _cE("view", _uM("key" to 1, "class" to "l-input__wrap--suffix", "onClick" to onSuffixClick), _uA(
                                    renderSlot(_ctx.`$slots`, "suffix", UTSJSONObject(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE("text", _uM("class" to "l-input__wrap--suffix-text"), _tD(_ctx.suffix), 1)
                                        )
                                    })
                                ))
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            renderSlot(_ctx.`$slots`, "suffix-icon", UTSJSONObject(), fun(): UTSArray<Any> {
                                return _uA(
                                    if (_ctx.suffixIcon != null) {
                                        _cV(_component_l_icon, _uM("key" to 0, "class" to "l-input__wrap--suffix-icon", "name" to _ctx.suffixIcon, "size" to _ctx.suffixIconSize, "color" to _ctx.suffixIconColor), null, 8, _uA(
                                            "name",
                                            "size",
                                            "color"
                                        ))
                                    } else {
                                        _cC("v-if", true)
                                    }
                                )
                            }
                            )
                        )),
                        if (isTrue(_ctx.tips != null && _ctx.tips!!.length > 0 || _ctx.`$slots`["tips"] != null)) {
                            _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                "l-input__tips",
                                _uA(
                                    "l-input__tips--" + _ctx.status
                                )
                            )), "style" to _nS(_uA(
                                _ctx.tipsStyle
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "tips", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(_ctx.tips)
                                    )
                                })
                            ), 6)
                        } else {
                            _cC("v-if", true)
                        }
                    ))
                ), 6)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-input" to _pS(_uM("backgroundColor" to "var(--l-input-bg-color, #fff)", "alignItems" to "center", "width" to "100%", "paddingTop" to "var(--l-input-padding-y, 16px)", "paddingRight" to "var(--l-input-padding-x, 16px)", "paddingBottom" to "var(--l-input-padding-y, 16px)", "paddingLeft" to "var(--l-input-padding-x, 16px)")), "l-input--horizontal" to _pS(_uM("flexDirection" to "row")), "l-input--vertical" to _pS(_uM("alignItems" to "stretch")), "l-input--border" to _pS(_uM("position" to "relative")), "l-input--classic" to _pS(_uM("paddingTop" to "var(--l-input-classic-padding-y, 12px)", "paddingRight" to "var(--l-input-classic-padding-x, 16px)", "paddingBottom" to "var(--l-input-classic-padding-y, 12px)", "paddingLeft" to "var(--l-input-classic-padding-x, 16px)", "borderTopLeftRadius" to "var(--l-input-border-radius, 12rpx)", "borderTopRightRadius" to "var(--l-input-border-radius, 12rpx)", "borderBottomRightRadius" to "var(--l-input-border-radius, 12rpx)", "borderBottomLeftRadius" to "var(--l-input-border-radius, 12rpx)", "borderTopWidth" to 0.5, "borderRightWidth" to 0.5, "borderBottomWidth" to 0.5, "borderLeftWidth" to 0.5, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid")), "l-input--classic-default" to _pS(_uM("borderTopColor" to "var(--l-input-border-color,#e7e7e7)", "borderRightColor" to "var(--l-input-border-color,#e7e7e7)", "borderBottomColor" to "var(--l-input-border-color,#e7e7e7)", "borderLeftColor" to "var(--l-input-border-color,#e7e7e7)")), "l-input--classic-error" to _pS(_uM("borderTopColor" to "var(--l-input-error-tips-color,#FF4D4F)", "borderRightColor" to "var(--l-input-error-tips-color,#FF4D4F)", "borderBottomColor" to "var(--l-input-error-tips-color,#FF4D4F)", "borderLeftColor" to "var(--l-input-error-tips-color,#FF4D4F)")), "l-input--classic-success" to _pS(_uM("borderTopColor" to "var(--l-input-success-tips-color,#34c471)", "borderRightColor" to "var(--l-input-success-tips-color,#34c471)", "borderBottomColor" to "var(--l-input-success-tips-color,#34c471)", "borderLeftColor" to "var(--l-input-success-tips-color,#34c471)")), "l-input--classic-warning" to _pS(_uM("borderTopColor" to "var(--l-input-warning-tips-color,#ffb400)", "borderRightColor" to "var(--l-input-warning-tips-color,#ffb400)", "borderBottomColor" to "var(--l-input-warning-tips-color,#ffb400)", "borderLeftColor" to "var(--l-input-warning-tips-color,#ffb400)")), "l-input--classic-disabled" to _pS(_uM("backgroundColor" to "var(--l-input-disabled-bg-color, rgba(0, 0, 0, 0.04))")), "l-input__wrap--prefix" to _pS(_uM("flexDirection" to "row", "alignItems" to "center")), "l-input__icon--prefix" to _pS(_uM("fontSize" to "44rpx", "color" to "var(--l-input-prefix-icon-color, rgba(0, 0, 0, 0.88))")), "l-input__label" to _uM("" to _uM("minWidth" to "var(--l-input-label-min-width, 64rpx)", "fontSize" to 16, "lineHeight" to "48rpx", "color" to "var(--l-input-label-text-color, rgba(0, 0, 0, 0.88))", "marginRight" to "32rpx"), ".l-input--horizontal " to _uM("maxWidth" to "var(--l-input-label-max-width, 160rpx)"), ".l-input--vertical " to _uM("fontSize" to 14, "paddingBottom" to "8rpx")), "l-input__label--gap" to _pS(_uM("marginLeft" to "8rpx")), "l-input__wrap" to _pS(_uM("justifyContent" to "center", "flex" to 1)), "l-input__content" to _uM(".l-input__wrap " to _uM("flexDirection" to "row", "width" to "100%", "alignItems" to "center")), "l-input__wrap--clearable-icon" to _pS(_uM("flex" to "0 0 auto", "paddingLeft" to "24rpx", "boxSizing" to "content-box", "!fontSize" to "var(--l-input-suffix-icon-size, 22px)", "!color" to "var(--l-input-suffix-icon-color, rgba(0, 0, 0, 0.45))")), "l-input__wrap--suffix-icon" to _pS(_uM("flex" to "0 0 auto", "paddingLeft" to "24rpx", "boxSizing" to "content-box", "!fontSize" to "var(--l-input-suffix-icon-size, 22px)", "!color" to "var(--l-input-suffix-icon-color, rgba(0, 0, 0, 0.45))")), "l-input__wrap--suffix" to _pS(_uM("flex" to "0 0 auto", "paddingLeft" to "24rpx", "boxSizing" to "content-box")), "l-input__wrap--suffix-text" to _pS(_uM("fontSize" to 16, "color" to "var(--l-input-suffix-text-color, rgba(0, 0, 0, 0.88))")), "l-input__control" to _pS(_uM("flex" to 1, "boxSizing" to "border-box", "minWidth" to 0, "minHeight" to "48rpx", "marginTop" to 0, "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0, "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "color" to "var(--l-input-text-color, rgba(0, 0, 0, 0.88))", "backgroundColor" to "rgba(0,0,0,0)", "borderTopWidth" to 0, "borderRightWidth" to 0, "borderBottomWidth" to 0, "borderLeftWidth" to 0, "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "fontSize" to 16)), "l-input__control--disabled" to _pS(_uM("color" to "var(--l-input-disabled-text-color, rgba(0, 0, 0, 0.25))", "opacity" to 1)), "l-input--left" to _pS(_uM("textAlign" to "left")), "l-input--right" to _pS(_uM("textAlign" to "right")), "l-input--center" to _pS(_uM("textAlign" to "center")), "l-input__placeholder" to _pS(_uM("color" to "var(--l-input-placeholder-text-color, rgba(0, 0, 0, 0.45))", "fontSize" to "var(--l-input-placeholder-text-font-size, 16px)")), "l-input__placeholder--disabled" to _pS(_uM("fontSize" to "var(--l-input-placeholder-text-font-size, 16px)", "color" to "var(--l-input-disabled-text-color, rgba(0, 0, 0, 0.25))")), "l-input__tips" to _pS(_uM("fontSize" to 12, "lineHeight" to "40rpx", "paddingTop" to "8rpx")), "l-input__tips--default" to _pS(_uM("color" to "var(--l-input-tips-color, rgba(0, 0, 0, 0.45))")), "l-input__tips--success" to _pS(_uM("color" to "var(--l-input-success-tips-color, #34c471)")), "l-input__tips--warning" to _pS(_uM("color" to "var(--l-input-warning-tips-color, #ffb400)")), "l-input__tips--error" to _pS(_uM("color" to "var(--l-input-error-tips-color, #FF4D4F)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null, "update:modelValue" to null, "focus" to null, "blur" to null, "confirm" to null, "clear" to null, "keyboardheightchange" to null, "nicknamereview" to null, "click-icon" to null)
        var props = _nP(_uM("adjustPosition" to _uM("type" to "Boolean", "required" to true, "default" to true), "align" to _uM("type" to "String", "required" to true, "default" to "left"), "alwaysEmbed" to _uM("type" to "Boolean", "required" to true, "default" to false), "autoFocus" to _uM("type" to "Boolean", "required" to true, "default" to false), "bordered" to _uM("type" to "Boolean", "required" to true, "default" to true), "clearTrigger" to _uM("type" to "String", "required" to true, "default" to "focus"), "clearable" to _uM("type" to "Boolean", "required" to true, "default" to false), "confirmHold" to _uM("type" to "Boolean", "required" to true, "default" to false), "confirmType" to _uM("type" to "String", "required" to true, "default" to "done"), "cursor" to _uM("type" to "Number", "required" to true, "default" to 0), "cursorColor" to _uM("type" to "String", "required" to true, "default" to ""), "cursorSpacing" to _uM("type" to "Number", "required" to true, "default" to 0), "disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "focus" to _uM("type" to "Boolean", "required" to true, "default" to false), "holdKeyboard" to _uM("type" to "Boolean", "required" to true, "default" to false), "label" to _uM("type" to "String", "required" to false), "layout" to _uM("type" to "String", "required" to true, "default" to "horizontal"), "maxcharacter" to _uM("type" to "Number", "required" to false), "maxlength" to _uM("type" to "Number", "required" to true, "default" to -1), "placeholder" to _uM("type" to "String", "required" to true, "default" to ""), "placeholderStyle" to _uM("type" to "String", "required" to true, "default" to ""), "placeholderClass" to _uM("type" to "String", "required" to false), "readonly" to _uM("type" to "Boolean", "required" to true, "default" to false), "safePasswordCertPath" to _uM("type" to "String", "required" to true, "default" to ""), "safePasswordCustomHash" to _uM("type" to "String", "required" to true, "default" to ""), "safePasswordLength" to _uM("type" to "Number", "required" to false), "safePasswordNonce" to _uM("type" to "String", "required" to true, "default" to ""), "safePasswordSalt" to _uM("type" to "String", "required" to true, "default" to ""), "safePasswordTimeStamp" to _uM("type" to "Number", "required" to false), "selectionEnd" to _uM("type" to "Number", "required" to true, "default" to -1), "selectionStart" to _uM("type" to "Number", "required" to true, "default" to -1), "status" to _uM("type" to "String", "required" to true, "default" to "default"), "prefixIcon" to _uM("type" to "String", "required" to false), "prefixIconColor" to _uM("type" to "String", "required" to false), "suffix" to _uM("type" to "String", "required" to false), "suffixIcon" to _uM("type" to "String", "required" to false), "suffixIconColor" to _uM("type" to "String", "required" to false), "tips" to _uM("type" to "String", "required" to false), "type" to _uM("type" to "String", "required" to true, "default" to "text"), "value" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "modelValue" to _uM("type" to _uA(
            "String",
            "Number"
        ), "required" to false), "lStyle" to _uM("type" to "String", "required" to false), "lableStyle" to _uM("type" to "String", "required" to false), "tipsStyle" to _uM("type" to "String", "required" to false), "inputStyle" to _uM("type" to "String", "required" to false), "borderColor" to _uM("type" to "String", "required" to false), "classic" to _uM("type" to "Boolean", "required" to true, "default" to false), "focused" to _uM("type" to "Boolean", "required" to true, "default" to false), "focusedBorderColor" to _uM("type" to "String", "required" to false), "prefixIconSize" to _uM("type" to "String", "required" to false), "suffixIconSize" to _uM("type" to "String", "required" to false), "clearIconSize" to _uM("type" to "String", "required" to false)))
        var propsNeedCastKeys = _uA(
            "adjustPosition",
            "align",
            "alwaysEmbed",
            "autoFocus",
            "bordered",
            "clearTrigger",
            "clearable",
            "confirmHold",
            "confirmType",
            "cursor",
            "cursorColor",
            "cursorSpacing",
            "disabled",
            "focus",
            "holdKeyboard",
            "layout",
            "maxlength",
            "placeholder",
            "placeholderStyle",
            "readonly",
            "safePasswordCertPath",
            "safePasswordCustomHash",
            "safePasswordNonce",
            "safePasswordSalt",
            "selectionEnd",
            "selectionStart",
            "status",
            "type",
            "classic",
            "focused"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
