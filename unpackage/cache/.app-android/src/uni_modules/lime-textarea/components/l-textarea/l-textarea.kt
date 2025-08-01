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
open class GenUniModulesLimeTextareaComponentsLTextareaLTextarea : VueComponent, TextareaProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var adjustPosition: Boolean by `$props`
    override var autofocus: Boolean by `$props`
    override var autosize: Boolean by `$props`
    override var bordered: Boolean by `$props`
    override var confirmHold: Boolean by `$props`
    override var confirmType: String by `$props`
    override var cursor: Number by `$props`
    override var cursorSpacing: Number by `$props`
    override var disableDefaultPadding: Boolean by `$props`
    override var disabled: Boolean by `$props`
    override var readonly: Boolean by `$props`
    override var fixed: Boolean by `$props`
    override var defaultFixed: Boolean by `$props`
    override var focus: Boolean by `$props`
    override var holdKeyboard: Boolean by `$props`
    override var indicator: Boolean by `$props`
    override var label: String? by `$props`
    override var maxcharacter: Number? by `$props`
    override var maxlength: Number by `$props`
    override var placeholder: String by `$props`
    override var selectionEnd: Number by `$props`
    override var selectionStart: Number by `$props`
    override var showConfirmBar: Boolean by `$props`
    override var value: String? by `$props`
    override var layout: String by `$props`
    override var placeholderStyle: String by `$props`
    override var lStyle: String? by `$props`
    override var labelStyle: String? by `$props`
    override var indicatorStyle: String? by `$props`
    override var innerStyle: String? by `$props`
    override var classic: Boolean by `$props`
    override var borderColor: String? by `$props`
    override var focusedBorderColor: String? by `$props`
    override var focused: Boolean by `$props`
    open var modelValue: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeTextareaComponentsLTextareaLTextarea) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeTextareaComponentsLTextareaLTextarea
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val formItemBlur = inject<(() -> Unit)?>("formItemBlur", null)
            val formDisabled = inject<Ref<Boolean?>?>("formDisabled", null)
            val formReadonly = inject<Ref<Boolean?>?>("formReadonly", null)
            val count = ref(0)
            val innerFocused = ref(props.focus || props.focused)
            val calculateValue = fun(value: String): CharacterLengthResult {
                val maxlength = props.maxlength
                val maxcharacter = props.maxcharacter
                if (maxcharacter != null && maxcharacter > 0) {
                    return characterLimit("maxcharacter", value, maxcharacter)
                } else if (maxlength > 0) {
                    return characterLimit("maxlength", value, maxlength)
                }
                return CharacterLengthResult(characters = value, length = value.length)
            }
            var _innerValue = ""
            val modelValue = useModel<String>(__ins.props, "modelValue")
            val innerValue = computed(WritableComputedOptions(set = fun(v: String) {
                _innerValue = v
                modelValue.value = v
                emit("change", v)
            }
            , get = fun(): String {
                val _value = props.value ?: modelValue.value
                if (_innerValue != _value) {
                    val _calculateValue = calculateValue(props.value ?: modelValue.value)
                    val characters = _calculateValue.characters
                    val length = _calculateValue.length
                    count.value = length
                    return characters
                }
                return _value
            }
            ))
            val isReadonly = computed(fun(): Boolean {
                if (props.readonly) {
                    return props.readonly
                }
                return formReadonly?.value ?: false
            }
            )
            val isDisabled = computed(fun(): Boolean {
                if (props.disabled) {
                    return props.disabled
                }
                return formDisabled?.value ?: false
            }
            )
            val styles = computed(fun(): Map<String, String> {
                val style = Map<String, String>()
                return style
            }
            )
            val onInput = fun(event: UniInputEvent){
                var _event_detail = event.detail
                var value = _event_detail.value
                var cursor = _event_detail.cursor
                val _calculateValue = calculateValue(value)
                val characters = _calculateValue.characters
                val length = _calculateValue.length
                count.value = length
                innerValue.value = characters
            }
            val onFocus = fun(event: UniTextareaFocusEvent){
                innerFocused.value = true
                emit("focus", event)
            }
            val onBlur = fun(event: UniTextareaBlurEvent){
                innerFocused.value = false
                emit("blur", event)
                formItemBlur?.invoke()
            }
            val onConfirm = fun(event: UniInputConfirmEvent){
                emit("confirm", event)
            }
            val onLineChange = fun(event: UniTextareaLineChangeEvent){
                emit("linechange", event)
            }
            val onKeyboardHeightChange = fun(event: UniInputKeyboardHeightChangeEvent){
                emit("keyboardheightchange", event)
            }
            watchEffect(fun(){
                innerFocused.value = props.focus || props.focused
            }
            )
            val textareaRef = ref<UniElement?>(null)
            val _useDrawBorder = useDrawBorder(textareaRef, DrawBorderOptions(direction = "bottom", watchSize = true, startOffset = 16, immediate = false, color = props.borderColor))
            val clearBorder = _useDrawBorder.clearBorder
            val color = _useDrawBorder.color
            val renderBorder = _useDrawBorder.renderBorder
            onMounted(fun(){
                watchEffect(fun(){
                    if (!props.classic) {
                        if (props.borderColor != null && !innerFocused.value) {
                            textareaRef.value?.style?.setProperty("border-color", props.borderColor)
                        }
                        if (props.focusedBorderColor != null && innerFocused.value) {
                            textareaRef.value?.style?.setProperty("border-color", props.focusedBorderColor)
                        }
                    }
                    if (!props.bordered || props.classic) {
                        clearBorder()
                        return
                    }
                    if (props.borderColor != null && !innerFocused.value) {
                        color.value = props.borderColor!!
                    }
                    renderBorder()
                }
                )
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "l-textarea",
                    _uA(
                        "l-textarea--" + _ctx.layout,
                        _uM("l-textarea--classic" to _ctx.classic, "l-textarea--classic-disabled" to (_ctx.classic && unref(isDisabled)), "l-textarea--classic-focused" to (_ctx.classic && !unref(isDisabled) && unref(innerFocused)), "l-textarea--border" to (_ctx.bordered && !_ctx.classic))
                    )
                )), "ref_key" to "textareaRef", "ref" to textareaRef, "style" to _nS(_uA(
                    unref(styles),
                    _ctx.lStyle
                ))), _uA(
                    if (isTrue(_ctx.label != null || _ctx.`$slots`["label"] != null)) {
                        _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                            "l-textarea__label",
                            _uA(
                                "l-textarea__label--" + _ctx.layout
                            )
                        )), "style" to _nS(_uA(
                            _ctx.labelStyle
                        ))), _uA(
                            renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(_ctx.label)
                                )
                            })
                        ), 6)
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("view", _uM("class" to "l-textarea__wrapper"), _uA(
                        _cE("textarea", _uM("class" to _nC(_uA(
                            "l-textarea__wrapper-inner",
                            _uM("is-disabled" to unref(isDisabled))
                        )), "style" to _nS(_uA(
                            _ctx.innerStyle
                        )), "maxlength" to _ctx.maxlength, "disabled" to (unref(isDisabled) || unref(isReadonly)), "placeholder" to _ctx.placeholder, "placeholder-class" to "l-textarea__placeholder", "placeholder-style" to _ctx.placeholderStyle, "value" to unref(innerValue), "auto-height" to _ctx.autosize, "auto-focus" to _ctx.autofocus, "fixed" to _ctx.fixed, "focus" to _ctx.focus, "cursor" to _ctx.cursor, "cursor-spacing" to _ctx.cursorSpacing, "adjust-position" to _ctx.adjustPosition, "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "disable-default-padding" to _ctx.disableDefaultPadding, "show-confirm-bar" to _ctx.showConfirmBar, "selection-start" to _ctx.selectionStart, "selection-end" to _ctx.selectionEnd, "hold-keyboard" to _ctx.holdKeyboard, "onInput" to onInput, "onFocus" to onFocus, "onBlur" to onBlur, "onConfirm" to onConfirm, "onLinechange" to onLineChange, "onKeyboardheightchange" to onKeyboardHeightChange), null, 46, _uA(
                            "maxlength",
                            "disabled",
                            "placeholder",
                            "placeholder-style",
                            "value",
                            "auto-height",
                            "auto-focus",
                            "fixed",
                            "focus",
                            "cursor",
                            "cursor-spacing",
                            "adjust-position",
                            "confirm-type",
                            "confirm-hold",
                            "disable-default-padding",
                            "show-confirm-bar",
                            "selection-start",
                            "selection-end",
                            "hold-keyboard"
                        )),
                        if (isTrue(_ctx.indicator && ((_ctx.maxcharacter ?: _ctx.maxlength) > 0))) {
                            _cE("text", _uM("key" to 0, "class" to "l-textarea__indicator", "style" to _nS(_uA(
                                _ctx.indicatorStyle
                            ))), _tD(unref(count)) + " / " + _tD(_ctx.maxcharacter ?: _ctx.maxlength), 5)
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
                return _uM("l-textarea" to _pS(_uM("boxSizing" to "border-box", "paddingTop" to "32rpx", "paddingRight" to "32rpx", "paddingBottom" to "32rpx", "paddingLeft" to "32rpx", "backgroundColor" to "#ffffff")), "l-textarea--horizontal" to _pS(_uM("flexDirection" to "row")), "l-textarea__label" to _pS(_uM("color" to "rgba(0,0,0,0.88)", "flexShrink" to 0, "lineHeight" to "44rpx", "overflow" to "hidden", "whiteSpace" to "nowrap", "textOverflow" to "ellipsis")), "l-textarea__label--vertical" to _pS(_uM("fontSize" to 14, "paddingBottom" to "16rpx")), "l-textarea__label--horizontal" to _pS(_uM("fontSize" to 16, "marginRight" to "32rpx")), "l-textarea__wrapper" to _pS(_uM("flex" to 1, "overflow" to "hidden")), "l-textarea__wrapper-inner" to _pS(_uM("flex" to "1 1 auto", "width" to "100%", "boxSizing" to "border-box", "minWidth" to 0, "minHeight" to 20, "marginTop" to 0, "marginRight" to 0, "marginBottom" to 0, "marginLeft" to 0, "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "textAlign" to "left", "backgroundColor" to "rgba(0,0,0,0)", "borderTopWidth" to 0, "borderRightWidth" to 0, "borderBottomWidth" to 0, "borderLeftWidth" to 0, "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "fontSize" to 16, "color" to "rgba(0,0,0,0.88)", "lineHeight" to "48rpx")), "l-textarea__placeholder" to _pS(_uM("color" to "rgba(0,0,0,0.45)", "fontSize" to 16, "lineHeight" to "48rpx")), "l-textarea__indicator" to _pS(_uM("flexShrink" to 0, "color" to "rgba(0,0,0,0.45)", "fontSize" to "24rpx", "textAlign" to "right", "lineHeight" to "40rpx", "paddingTop" to "16rpx")), "l-textarea--border" to _pS(_uM("position" to "relative")), "l-textarea--border-focused" to _pS(_uM("borderBottomColor" to "#3283ff")), "is-disabled" to _uM(".l-textarea " to _uM("color" to "rgba(0,0,0,0.25)")), "l-textarea--classic" to _pS(_uM("paddingTop" to 12, "paddingRight" to 16, "paddingBottom" to 12, "paddingLeft" to 16, "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "borderTopWidth" to 0.5, "borderRightWidth" to 0.5, "borderBottomWidth" to 0.5, "borderLeftWidth" to 0.5, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#eeeeee", "borderRightColor" to "#eeeeee", "borderBottomColor" to "#eeeeee", "borderLeftColor" to "#eeeeee")), "l-textarea--classic-focused" to _pS(_uM("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null, "focus" to null, "blur" to null, "confirm" to null, "linechange" to null, "keyboardheightchange" to null, "update:modelValue" to null)
        var props = _nP(_uM("adjustPosition" to _uM("type" to "Boolean", "required" to true, "default" to true), "autofocus" to _uM("type" to "Boolean", "required" to true, "default" to false), "autosize" to _uM("type" to "Boolean", "required" to true, "default" to false), "bordered" to _uM("type" to "Boolean", "required" to true, "default" to true), "confirmHold" to _uM("type" to "Boolean", "required" to true, "default" to false), "confirmType" to _uM("type" to "String", "required" to true, "default" to "return"), "cursor" to _uM("type" to "Number", "required" to true, "default" to -1), "cursorSpacing" to _uM("type" to "Number", "required" to true, "default" to 0), "disableDefaultPadding" to _uM("type" to "Boolean", "required" to true, "default" to false), "disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "readonly" to _uM("type" to "Boolean", "required" to true, "default" to false), "fixed" to _uM("type" to "Boolean", "required" to true, "default" to false), "defaultFixed" to _uM("type" to "Boolean", "required" to true, "default" to false), "focus" to _uM("type" to "Boolean", "required" to true, "default" to false), "holdKeyboard" to _uM("type" to "Boolean", "required" to true, "default" to false), "indicator" to _uM("type" to "Boolean", "required" to true, "default" to false), "label" to _uM("type" to "String", "required" to false), "maxcharacter" to _uM("type" to "Number", "required" to false), "maxlength" to _uM("type" to "Number", "required" to true, "default" to -1), "placeholder" to _uM("type" to "String", "required" to true, "default" to ""), "selectionEnd" to _uM("type" to "Number", "required" to true, "default" to -1), "selectionStart" to _uM("type" to "Number", "required" to true, "default" to -1), "showConfirmBar" to _uM("type" to "Boolean", "required" to true, "default" to true), "value" to _uM("type" to "String", "required" to false), "layout" to _uM("type" to "String", "required" to true, "default" to "horizontal"), "placeholderStyle" to _uM("type" to "String", "required" to true, "default" to ""), "lStyle" to _uM("type" to "String", "required" to false), "labelStyle" to _uM("type" to "String", "required" to false), "indicatorStyle" to _uM("type" to "String", "required" to false), "innerStyle" to _uM("type" to "String", "required" to false), "classic" to _uM("type" to "Boolean", "required" to true, "default" to false), "borderColor" to _uM("type" to "String", "required" to false), "focusedBorderColor" to _uM("type" to "String", "required" to false), "focused" to _uM("type" to "Boolean", "required" to true, "default" to false), "modelValue" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "adjustPosition",
            "autofocus",
            "autosize",
            "bordered",
            "confirmHold",
            "confirmType",
            "cursor",
            "cursorSpacing",
            "disableDefaultPadding",
            "disabled",
            "readonly",
            "fixed",
            "defaultFixed",
            "focus",
            "holdKeyboard",
            "indicator",
            "maxlength",
            "placeholder",
            "selectionEnd",
            "selectionStart",
            "showConfirmBar",
            "layout",
            "placeholderStyle",
            "classic",
            "focused",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
