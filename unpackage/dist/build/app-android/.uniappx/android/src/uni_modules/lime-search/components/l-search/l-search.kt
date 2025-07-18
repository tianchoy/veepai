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
open class GenUniModulesLimeSearchComponentsLSearchLSearch : VueComponent, SearchProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var action: String? by `$props`
    override var adjustPosition: Boolean by `$props`
    override var alwaysEmbed: Boolean by `$props`
    override var center: Boolean by `$props`
    override var clearable: Boolean by `$props`
    override var confirmHold: Boolean by `$props`
    override var confirmType: String by `$props`
    override var cursor: Number? by `$props`
    override var cursorSpacing: Number by `$props`
    override var disabled: Boolean by `$props`
    override var focus: Boolean by `$props`
    override var holdKeyboard: Boolean by `$props`
    override var leftIcon: String by `$props`
    override var maxcharacter: Number? by `$props`
    override var maxlength: Number by `$props`
    override var placeholder: String by `$props`
    override var placeholderClass: String? by `$props`
    override var placeholderStyle: String? by `$props`
    override var selectionEnd: Number by `$props`
    override var selectionStart: Number by `$props`
    override var shape: String by `$props`
    override var type: String by `$props`
    override var value: String? by `$props`
    override var lStyle: String? by `$props`
    override var cursorColor: String? by `$props`
    override var padding: String? by `$props`
    override var radius: String? by `$props`
    override var height: String? by `$props`
    override var bgColor: String? by `$props`
    override var fontSize: String? by `$props`
    override var textColor: String? by `$props`
    override var iconColor: String? by `$props`
    override var clearIconColor: String? by `$props`
    open var modelValue: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeSearchComponentsLSearchLSearch) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeSearchComponentsLSearchLSearch
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val focused = ref(props.focus)
            val modelValue = useModel<String>(__ins.props, "modelValue")
            val searchValue = computed(WritableComputedOptions(set = fun(value: String) {
                modelValue.value = value
                emit("change", value)
            }
            , get = fun(): String {
                return props.value ?: modelValue.value
            }
            ))
            val contentClass = computed(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set("l-search__content--focused", focused.value)
                cls.set("l-search__content--center", props.center)
                cls.set("l-search__content--" + props.shape, true)
                return cls
            }
            )
            val contextStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.padding != null) {
                    style.set("padding", props.padding!!)
                }
                if (props.radius != null) {
                    style.set("border-radius", props.radius!!)
                }
                if (props.height != null) {
                    style.set("height", props.height!!)
                }
                if (props.bgColor != null) {
                    style.set("background", props.bgColor!!)
                }
                return style
            }
            )
            val inputStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.fontSize != null) {
                    style.set("font-size", props.fontSize!!)
                }
                if (props.textColor != null) {
                    style.set("color", props.textColor!!)
                }
                return style
            }
            )
            val handleInput = fun(e: UniInputEvent){
                var value = e.detail.value
                val maxlength = props.maxlength
                val maxcharacter = props.maxcharacter
                if (maxcharacter != null && maxcharacter > 0) {
                    val characters = characterLimit("maxcharacter", value, maxcharacter).characters
                    value = characters
                }
                searchValue.value = value
            }
            val handleClear = fun(_e: UniPointerEvent){
                searchValue.value = ""
                focused.value = true
                emit("clear")
            }
            val handleFocus = fun(e: UniInputFocusEvent){
                val value = e.detail.value
                focused.value = true
                emit("focus", value)
            }
            val handleBlur = fun(e: UniInputBlurEvent){
                val value = e.detail.value
                focused.value = false
                emit("blur", value)
            }
            val handleConfirm = fun(e: UniInputConfirmEvent){
                val value = e.detail.value
                emit("submit", value)
            }
            val handleActionClick = fun(_e: UniPointerEvent){
                emit("action-click")
            }
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                return _cE("view", _uM("class" to "l-search", "style" to _nS(_uA(
                    _ctx.lStyle
                ))), _uA(
                    renderSlot(_ctx.`$slots`, "left"),
                    _cE("view", _uM("class" to _nC(_uA(
                        "l-search__content",
                        unref(contentClass)
                    )), "style" to _nS(_uA(
                        unref(contextStyle)
                    ))), _uA(
                        renderSlot(_ctx.`$slots`, "left-icon", UTSJSONObject(), fun(): UTSArray<Any> {
                            return _uA(
                                if (_ctx.leftIcon.length > 0) {
                                    _cV(_component_l_icon, _uM("key" to 0, "class" to "l-search__icon", "size" to "42rpx", "color" to _ctx.iconColor, "name" to _ctx.leftIcon), null, 8, _uA(
                                        "color",
                                        "name"
                                    ))
                                } else {
                                    _cC("v-if", true)
                                }
                            )
                        }
                        ),
                        _cE("input", _uM("name" to "input", "class" to "l-search__keyword", "style" to _nS(_uA(
                            unref(inputStyle),
                            if (_ctx.center) {
                                "text-align:center"
                            } else {
                                ""
                            }
                        )), "type" to _ctx.type, "maxlength" to _ctx.maxlength, "disabled" to _ctx.disabled, "focus" to _ctx.focus, "value" to unref(searchValue), "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "cursor" to _ctx.cursor, "cursor-color" to _ctx.cursorColor, "adjust-position" to _ctx.adjustPosition, "always-embed" to _ctx.alwaysEmbed, "selection-start" to _ctx.selectionStart, "selection-end" to _ctx.selectionEnd, "hold-keyboard" to _ctx.holdKeyboard, "cursor-spacing" to _ctx.cursorSpacing, "placeholder" to _ctx.placeholder, "placeholder-style" to ((_ctx.placeholderStyle ?: " ") + (if (_ctx.center) {
                            "text-align:center"
                        } else {
                            ""
                        }
                        )), "placeholder-class" to "l-search__placeholder", "onInput" to handleInput, "onFocus" to handleFocus, "onBlur" to handleBlur, "onConfirm" to handleConfirm), null, 44, _uA(
                            "type",
                            "maxlength",
                            "disabled",
                            "focus",
                            "value",
                            "confirm-type",
                            "confirm-hold",
                            "cursor",
                            "cursor-color",
                            "adjust-position",
                            "always-embed",
                            "selection-start",
                            "selection-end",
                            "hold-keyboard",
                            "cursor-spacing",
                            "placeholder",
                            "placeholder-style"
                        )),
                        if (isTrue(_ctx.clearable)) {
                            withDirectives(_cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                "l-search__clear",
                                _uM("l-search__clear--right" to (_ctx.`$slots`["right-icon"] != null))
                            )), "onClick" to handleClear, "aria-role" to "button", "aria-label" to "清除"), _uA(
                                _cV(_component_l_icon, _uM("class" to "l-search__icon l-search__clear-icon", "name" to "close-circle-filled", "size" to "48rpx", "color" to _ctx.clearIconColor), null, 8, _uA(
                                    "color"
                                ))
                            ), 2), _uA(
                                _uA(
                                    vShow,
                                    unref(searchValue).length > 0
                                )
                            ))
                        } else {
                            _cC("v-if", true)
                        }
                        ,
                        renderSlot(_ctx.`$slots`, "right-icon")
                    ), 6),
                    renderSlot(_ctx.`$slots`, "action", UTSJSONObject(), fun(): UTSArray<Any> {
                        return _uA(
                            if (_ctx.action != null) {
                                _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                    "l-search__action",
                                    _uM("l-search__action--focused" to unref(focused))
                                )), "onClick" to handleActionClick), _tD(_ctx.action), 3)
                            } else {
                                _cC("v-if", true)
                            }
                        )
                    }
                    )
                ), 4)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-search" to _pS(_uM("width" to "100%", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center")), "l-search__content" to _pS(_uM("flex" to 1, "alignItems" to "center", "flexDirection" to "row", "boxSizing" to "border-box", "height" to "80rpx", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0.04)", "borderRightColor" to "rgba(0,0,0,0.04)", "borderBottomColor" to "rgba(0,0,0,0.04)", "borderLeftColor" to "rgba(0,0,0,0.04)", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0.04)", "paddingTop" to "16rpx", "paddingRight" to "24rpx", "paddingBottom" to "16rpx", "paddingLeft" to "24rpx")), "l-search__content--focused" to _pS(_uM("borderTopColor" to "rgba(0,0,0,0.04)", "borderRightColor" to "rgba(0,0,0,0.04)", "borderBottomColor" to "rgba(0,0,0,0.04)", "borderLeftColor" to "rgba(0,0,0,0.04)")), "l-search__content--round" to _pS(_uM("borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99)), "l-search__content--square" to _pS(_uM("borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx")), "l-search__keyword" to _pS(_uM("flex" to 1, "color" to "rgba(0,0,0,0.88)", "fontSize" to 16, "paddingLeft" to "10rpx")), "l-search__placeholder" to _pS(_uM("color" to "rgba(0,0,0,0.45)")), "l-search__placeholder--center" to _pS(_uM("textAlign" to "center")), "l-search__icon" to _pS(_uM("color" to "rgba(0,0,0,0.25)")), "l-search__clear" to _pS(_uM("position" to "relative", "marginLeft" to 10)), "l-search__clear-icon" to _pS(_uM("color" to "rgba(0,0,0,0.25)")), "l-search__clear--right" to _pS(_uM("marginRight" to 10)), "l-search__action" to _pS(_uM("marginLeft" to "30rpx", "fontSize" to 16, "color" to "#3283ff")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null, "blur" to null, "clear" to null, "focus" to null, "submit" to null, "action-click" to null, "update:modelValue" to null)
        var props = _nP(_uM("action" to _uM("type" to "String", "required" to false), "adjustPosition" to _uM("type" to "Boolean", "required" to true, "default" to true), "alwaysEmbed" to _uM("type" to "Boolean", "required" to true, "default" to false), "center" to _uM("type" to "Boolean", "required" to true, "default" to false), "clearable" to _uM("type" to "Boolean", "required" to true, "default" to true), "confirmHold" to _uM("type" to "Boolean", "required" to true, "default" to false), "confirmType" to _uM("type" to "String", "required" to true, "default" to "search"), "cursor" to _uM("type" to "Number", "required" to false), "cursorSpacing" to _uM("type" to "Number", "required" to true, "default" to 0), "disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "focus" to _uM("type" to "Boolean", "required" to true, "default" to false), "holdKeyboard" to _uM("type" to "Boolean", "required" to true, "default" to false), "leftIcon" to _uM("type" to "String", "required" to true, "default" to "search"), "maxcharacter" to _uM("type" to "Number", "required" to false), "maxlength" to _uM("type" to "Number", "required" to true, "default" to -1), "placeholder" to _uM("type" to "String", "required" to true), "placeholderClass" to _uM("type" to "String", "required" to false), "placeholderStyle" to _uM("type" to "String", "required" to false), "selectionEnd" to _uM("type" to "Number", "required" to true, "default" to -1), "selectionStart" to _uM("type" to "Number", "required" to true, "default" to -1), "shape" to _uM("type" to "String", "required" to true, "default" to "square"), "type" to _uM("type" to "String", "required" to true, "default" to "text"), "value" to _uM("type" to "String", "required" to false), "lStyle" to _uM("type" to "String", "required" to false), "cursorColor" to _uM("type" to "String", "required" to false), "padding" to _uM("type" to "String", "required" to false), "radius" to _uM("type" to "String", "required" to false), "height" to _uM("type" to "String", "required" to false), "bgColor" to _uM("type" to "String", "required" to false), "fontSize" to _uM("type" to "String", "required" to false), "textColor" to _uM("type" to "String", "required" to false), "iconColor" to _uM("type" to "String", "required" to false), "clearIconColor" to _uM("type" to "String", "required" to false), "modelValue" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "adjustPosition",
            "alwaysEmbed",
            "center",
            "clearable",
            "confirmHold",
            "confirmType",
            "cursorSpacing",
            "disabled",
            "focus",
            "holdKeyboard",
            "leftIcon",
            "maxlength",
            "selectionEnd",
            "selectionStart",
            "shape",
            "type",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
