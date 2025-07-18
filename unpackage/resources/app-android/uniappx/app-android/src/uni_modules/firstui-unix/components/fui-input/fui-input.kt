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
open class GenUniModulesFirstuiUnixComponentsFuiInputFuiInput : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {
            setTimeout(fun(){
                val value = this.getStringVal(this.value)
                val modelValue = this.getStringVal(this.modelValue)
                if (value != "") {
                    this.`val` = value
                } else if (modelValue != "") {
                    this.`val` = modelValue
                }
                val isForm = this.getParent("fui-form")
                if (isForm) {
                    val form = this.fuiForm as ComponentPublicInstance
                    (form.`$data`["formChildren"] as UTSArray<ComponentPublicInstance>).push(this as ComponentPublicInstance)
                }
            }
            , 50)
        }
        , __ins)
        onMounted(fun() {
            this.`$nextTick`(fun(){
                setTimeout(fun(){
                    this.setFocusOrBlur(this.focus)
                }
                , 300)
            }
            )
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.focus
        }
        , fun(kVal: Boolean) {
            this.`$nextTick`(fun(){
                setTimeout(fun(){
                    this.setFocusOrBlur(kVal)
                }
                , 50)
            }
            )
        }
        )
        this.`$watch`(fun(): Any? {
            return this.modelValue
        }
        , fun() {
            this.`val` = this.getStringVal(this.modelValue)
        }
        )
        this.`$watch`(fun(): Any? {
            return this.value
        }
        , fun() {
            this.`val` = this.getStringVal(this.value)
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "fui-input__wrap",
            _uM("fui-input__border-uvue" to _ctx.inputBorder, "fui-input__border-color" to (_ctx.inputBorder && _ctx.borderColor == ""), "fui-input__disabled-styl" to (_ctx.disabled && _ctx.disabledStyle))
        )), "style" to _nS(_ctx.getStyle), "onClick" to _ctx.fieldClick), _uA(
            if (isTrue(_ctx.borderTop && !_ctx.inputBorder)) {
                _cE("view", _uM("key" to 0, "style" to _nS(_uM("background" to _ctx.borderColor, "left" to ("" + _ctx.topLeft + "rpx"), "right" to ("" + _ctx.topRight + "rpx"))), "class" to _nC(_uA(
                    "fui-input__border-top",
                    _uM("fui-input__background" to (_ctx.borderColor == ""))
                ))), null, 6)
            } else {
                _cC("v-if", true)
            }
            ,
            if (isTrue(_ctx.required)) {
                _cE("view", _uM("key" to 1, "class" to "fui-input__required"), _uA(
                    _cE("text", _uM("style" to _nS(_ctx.getRequiredColor), "class" to _nC(_uA(
                        "fui-input__asterisk-text",
                        _uM("fui-input__asterisk-color" to (_ctx.requiredColor == ""))
                    ))), "*", 6)
                ))
            } else {
                _cC("v-if", true)
            }
            ,
            if (_ctx.label != "") {
                _cE("view", _uM("key" to 2, "class" to "fui-input__label", "style" to _nS(_uM("minWidth" to ("" + _ctx.labelWidth + "rpx")))), _uA(
                    _cE("text", _uM("class" to _nC(_uM("fui-input__label-size" to (_ctx.labelSize == 0))), "style" to _nS(_ctx.getLabelStyl)), _tD(_ctx.label), 7)
                ), 4)
            } else {
                _cC("v-if", true)
            }
            ,
            renderSlot(_ctx.`$slots`, "left"),
            _cE("input", _uM("ref" to _ctx.refId, "class" to _nC(_uA(
                "fui-input__self",
                _uM("fui-input__disabled" to (_ctx.disabled || _ctx.readonly), "fui-input__size" to (_ctx.size == 0))
            )), "style" to _nS(_uM("fontSize" to ("" + _ctx.size + "rpx"), "color" to _ctx.color, "textAlign" to _ctx.textAlign)), "placeholder-class" to "fui-input__placeholder", "type" to _ctx.type, "name" to _ctx.name, "value" to _ctx.`val`, "placeholder" to _ctx.placeholder, "password" to (_ctx.password || _ctx.type == "password"), "placeholder-style" to _ctx.placeholderStyle, "disabled" to (_ctx.disabled || _ctx.readonly), "cursor-spacing" to _ctx.cursorSpacing, "maxlength" to _ctx.maxlength, "confirm-type" to _ctx.confirmType, "confirm-hold" to _ctx.confirmHold, "cursor" to _ctx.cursor, "selection-start" to _ctx.selectionStart, "selection-end" to _ctx.selectionEnd, "adjust-position" to _ctx.adjustPosition, "onFocus" to _ctx.onFocus, "onBlur" to _ctx.onBlur, "onInput" to _ctx.onInput, "onConfirm" to _ctx.onConfirm, "onKeyboardheightchange" to _ctx.onKeyboardheightchange), null, 46, _uA(
                "type",
                "name",
                "value",
                "placeholder",
                "password",
                "placeholder-style",
                "disabled",
                "cursor-spacing",
                "maxlength",
                "confirm-type",
                "confirm-hold",
                "cursor",
                "selection-start",
                "selection-end",
                "adjust-position",
                "onFocus",
                "onBlur",
                "onInput",
                "onConfirm",
                "onKeyboardheightchange"
            )),
            if (isTrue(_ctx.clearable && _ctx.`val` != "")) {
                _cE("view", _uM("key" to 3, "class" to "fui-input__clear-wrap", "style" to _nS(_uM("background" to _ctx.clearColor)), "onClick" to withModifiers(_ctx.onClear, _uA(
                    "stop"
                ))), _uA(
                    _cE("view", _uM("class" to "fui-input__clear"), _uA(
                        _cE("view", _uM("class" to "fui-input__clear-a"))
                    )),
                    _cE("view", _uM("class" to "fui-input__clear"), _uA(
                        _cE("view", _uM("class" to "fui-input__clear-b"))
                    ))
                ), 12, _uA(
                    "onClick"
                ))
            } else {
                _cC("v-if", true)
            }
            ,
            renderSlot(_ctx.`$slots`, "default"),
            if (isTrue(_ctx.borderBottom && !_ctx.inputBorder)) {
                _cE("view", _uM("key" to 4, "style" to _nS(_ctx.getBtnLineStyl), "class" to _nC(_uA(
                    "fui-input__border-bottom",
                    _uM("fui-input__background" to (_ctx.borderColor == ""))
                ))), null, 6)
            } else {
                _cC("v-if", true)
            }
        ), 14, _uA(
            "onClick"
        ))
    }
    open var required: Boolean by `$props`
    open var requiredColor: String by `$props`
    open var label: String by `$props`
    open var labelSize: Number by `$props`
    open var labelColor: String by `$props`
    open var labelWidth: Number by `$props`
    open var clearable: Boolean by `$props`
    open var clearColor: String by `$props`
    open var focus: Boolean by `$props`
    open var placeholder: String by `$props`
    open var placeholderStyle: String by `$props`
    open var name: String by `$props`
    open var value: Any by `$props`
    open var modelValue: Any by `$props`
    open var type: String by `$props`
    open var password: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var disabledStyle: Boolean by `$props`
    open var readonly: Boolean by `$props`
    open var maxlength: Number by `$props`
    open var min: Number by `$props`
    open var max: Number by `$props`
    open var cursorSpacing: Number by `$props`
    open var cursorColor: String by `$props`
    open var confirmType: String by `$props`
    open var confirmHold: Boolean by `$props`
    open var cursor: Number by `$props`
    open var selectionStart: Number by `$props`
    open var selectionEnd: Number by `$props`
    open var adjustPosition: Boolean by `$props`
    open var size: Number by `$props`
    open var color: String by `$props`
    open var inputBorder: Boolean by `$props`
    open var isFillet: Boolean by `$props`
    open var radius: Number by `$props`
    open var borderTop: Boolean by `$props`
    open var topLeft: Number by `$props`
    open var topRight: Number by `$props`
    open var borderBottom: Boolean by `$props`
    open var bottomLeft: Number by `$props`
    open var bottomRight: Number by `$props`
    open var borderColor: String by `$props`
    open var trim: Boolean by `$props`
    open var textAlign: String by `$props`
    open var padding: String by `$props`
    open var backgroundColor: String by `$props`
    open var marginTop: Number by `$props`
    open var refId: Any? by `$data`
    open var `val`: String by `$data`
    open var fuiForm: ComponentPublicInstance? by `$data`
    open var valueType: Number by `$data`
    open var getStyle: Any by `$data`
    open var getBorderRadius: String by `$data`
    open var getBtnLineStyl: Any by `$data`
    open var getRequiredColor: Any by `$data`
    open var getLabelStyl: Any by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        val refInputId = "fui_input_" + parseInt(Math.ceil(Math.random() * 10e5).toString(10), 36)
        return _uM("refId" to refInputId, "val" to "", "fuiForm" to null as ComponentPublicInstance?, "valueType" to 1, "getStyle" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            mp.set("padding", this.padding)
            mp.set("background", this.backgroundColor)
            mp.set("margin-top", "" + this.marginTop + "rpx")
            mp.set("border-radius", if (this.isFillet) {
                "120px"
            } else {
                "" + this.radius + "rpx"
            }
            )
            if (this.inputBorder && this.borderColor != "") {
                mp.set("border-color", this.borderColor)
            }
            return mp
        }
        ), "getBorderRadius" to computed<String>(fun(): String {
            var radius = "" + this.radius * 2 + "rpx"
            if (this.isFillet) {
                radius = "240px"
            }
            return radius
        }
        ), "getBtnLineStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.borderColor != "") {
                mp.set("background", this.borderColor)
            }
            mp.set("left", "0")
            mp.set("right", "" + this.bottomRight + "rpx")
            return mp
        }
        ), "getRequiredColor" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.requiredColor != "") {
                mp.set("color", this.requiredColor)
            }
            return mp
        }
        ), "getLabelStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.labelColor != "") {
                mp.set("color", this.labelColor)
            }
            if (this.labelSize != 0) {
                mp.set("fontSize", "" + this.labelSize + "rpx")
                mp.set("lineHeight", "" + this.labelSize + "rpx")
            }
            return mp
        }
        ))
    }
    open var getStringVal = ::gen_getStringVal_fn
    open fun gen_getStringVal_fn(kVal: Any): String {
        var str: String
        if (UTSAndroid.`typeof`(kVal) == "string") {
            str = kVal as String
        } else if (UTSAndroid.`typeof`(kVal) == "number") {
            str = (kVal as Number).toString(10)
        } else {
            str = kVal.toString()
        }
        return str
    }
    open var setFocusOrBlur = ::gen_setFocusOrBlur_fn
    open fun gen_setFocusOrBlur_fn(focus: Boolean) {
        if (focus) {
            (this.`$refs`[this.refId] as UniElement).focus()
        } else {
            (this.`$refs`[this.refId] as UniElement).blur()
        }
    }
    open var isSafeInteger = ::gen_isSafeInteger_fn
    open fun gen_isSafeInteger_fn(num: Number): Boolean {
        return num >= -9007199254740991 && num <= 9007199254740991
    }
    open var onInput = ::gen_onInput_fn
    open fun gen_onInput_fn(event: UniInputEvent) {
        var value = event.detail.value
        if (this.trim) {
            value = this.trimStr(value)
        }
        this.`val` = value
        var currentVal = parseFloat(value)
        if ((this.type == "digit" || this.type == "number") && !isNaN(currentVal) && this.isSafeInteger(currentVal)) {
            val min = this.min
            val max = this.max
            if (min != -1 && currentVal < min) {
                currentVal = min
            } else if (max != -1 && max < currentVal) {
                currentVal = max
            }
            value = currentVal.toString(10)
        }
        this.`$nextTick`(fun(){
            if (event.detail.value != "") {
                this.`val` = value
            }
        }
        )
        val inputValue = if (event.detail.value != "") {
            value
        } else {
            ""
        }
        this.`$emit`("input", inputValue)
        this.`$emit`("update:modelValue", inputValue)
    }
    open var onFocus = ::gen_onFocus_fn
    open fun gen_onFocus_fn(event: UniInputFocusEvent) {
        this.`$emit`("focus", event)
    }
    open var onBlur = ::gen_onBlur_fn
    open fun gen_onBlur_fn(event: UniInputBlurEvent) {
        this.`$emit`("blur", event)
    }
    open var onConfirm = ::gen_onConfirm_fn
    open fun gen_onConfirm_fn(event: UniInputConfirmEvent) {
        this.`$emit`("confirm", event)
    }
    open var onClear = ::gen_onClear_fn
    open fun gen_onClear_fn() {
        if (this.disabled && !this.readonly) {
            return
        }
        this.setFocusOrBlur(false)
        this.`val` = ""
        this.`$emit`("input", "")
        this.`$emit`("update:modelValue", "")
    }
    open var fieldClick = ::gen_fieldClick_fn
    open fun gen_fieldClick_fn() {
        this.`$emit`("onclick", this.name)
    }
    open var onKeyboardheightchange = ::gen_onKeyboardheightchange_fn
    open fun gen_onKeyboardheightchange_fn(e: UniInputKeyboardHeightChangeEvent) {
        this.`$emit`("keyboardheightchange", e)
    }
    open var trimStr = ::gen_trimStr_fn
    open fun gen_trimStr_fn(str: String): String {
        return str.replace(UTSRegExp("^\\s+|\\s+\$", "g"), "")
    }
    open var getParent = ::gen_getParent_fn
    open fun gen_getParent_fn(name: String): Boolean {
        if (this.`$parent` == null) {
            return false
        }
        var parent = this.`$parent` as ComponentPublicInstance
        var parentName = parent.`$options`["name"]
        while(parentName != name){
            if (parent.`$parent` == null) {
                return false
            }
            parent = parent.`$parent` as ComponentPublicInstance
            if (parent.`$options`["name"] == "") {
                return false
            }
            parentName = parent.`$options`["name"]
        }
        this.fuiForm = parent
        return true
    }
    open var reset = ::gen_reset_fn
    open fun gen_reset_fn() {
        this.setFocusOrBlur(false)
        this.`val` = ""
        this.`$emit`("input", "")
        this.`$emit`("update:modelValue", "")
    }
    open var getSubmitValue = ::gen_getSubmitValue_fn
    open fun gen_getSubmitValue_fn(): String {
        return this.`val`
    }
    companion object {
        var name = "fui-input"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-input__wrap" to _pS(_uM("width" to "100%", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "position" to "relative", "boxSizing" to "border-box", "overflow" to "visible")), "fui-input__border-uvue" to _pS(_uM("borderTopWidth" to 0.5, "borderRightWidth" to 0.5, "borderBottomWidth" to 0.5, "borderLeftWidth" to 0.5, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid")), "fui-input__border-color" to _pS(_uM("!borderTopColor" to "#EEEEEE", "!borderRightColor" to "#EEEEEE", "!borderBottomColor" to "#EEEEEE", "!borderLeftColor" to "#EEEEEE")), "fui-input__background" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#EEEEEE")), "fui-input__border-top" to _pS(_uM("position" to "absolute", "top" to 0, "height" to 1, "transform" to "scaleY(0.5)", "transformOrigin" to "0 0", "zIndex" to 1, "pointerEvents" to "none")), "fui-input__border-bottom" to _pS(_uM("position" to "absolute", "bottom" to 0, "height" to 1, "transform" to "scaleY(0.5)", "transformOrigin" to "0 100%", "zIndex" to 1, "pointerEvents" to "none")), "fui-input__required" to _pS(_uM("position" to "absolute", "left" to "12rpx", "height" to "100%", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "fui-input__asterisk-text" to _pS(_uM("fontSize" to "32rpx", "height" to "32rpx", "lineHeight" to "32rpx")), "fui-input__asterisk-color" to _pS(_uM("!color" to "#FF2B2B")), "fui-input__label" to _pS(_uM("paddingRight" to "12rpx", "flexShrink" to 0)), "fui-input__label-size" to _pS(_uM("!fontSize" to "32rpx", "!lineHeight" to "32rpx")), "fui-input__self" to _pS(_uM("flex" to 1, "paddingRight" to "12rpx", "overflow" to "visible", "backgroundColor" to "rgba(0,0,0,0)", "boxSizing" to "border-box")), "fui-input__size" to _pS(_uM("!fontSize" to "32rpx")), "fui-input__clear-wrap" to _pS(_uM("width" to "32rpx", "height" to "32rpx", "transform" to "rotate(45deg) scale(1.1)", "position" to "relative", "flexShrink" to 0, "borderTopLeftRadius" to "32rpx", "borderTopRightRadius" to "32rpx", "borderBottomRightRadius" to "32rpx", "borderBottomLeftRadius" to "32rpx")), "fui-input__clear" to _pS(_uM("width" to "32rpx", "height" to "32rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "position" to "absolute", "left" to 0, "top" to 0, "transform" to "scale(0.5)")), "fui-input__clear-a" to _pS(_uM("width" to "32rpx", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ffffff", "borderRightColor" to "#ffffff", "borderBottomColor" to "#ffffff", "borderLeftColor" to "#ffffff", "backgroundColor" to "#ffffff", "boxSizing" to "border-box")), "fui-input__clear-b" to _pS(_uM("height" to "32rpx", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ffffff", "borderRightColor" to "#ffffff", "borderBottomColor" to "#ffffff", "borderLeftColor" to "#ffffff", "backgroundColor" to "#ffffff", "boxSizing" to "border-box")), "fui-input__placeholder" to _pS(_uM("color" to "#CCCCCC", "overflow" to "visible")), "fui-input__disabled" to _pS(_uM("pointerEvents" to "none")), "fui-input__disabled-styl" to _pS(_uM("opacity" to 0.6)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("input" to null, "update:modelValue" to null, "focus" to null, "blur" to null, "confirm" to null, "onclick" to null, "keyboardheightchange" to null)
        var props = _nP(_uM("required" to _uM("type" to "Boolean", "default" to false), "requiredColor" to _uM("type" to "String", "default" to ""), "label" to _uM("type" to "String", "default" to ""), "labelSize" to _uM("type" to "Number", "default" to 0), "labelColor" to _uM("type" to "String", "default" to "#333"), "labelWidth" to _uM("type" to "Number", "default" to 140), "clearable" to _uM("type" to "Boolean", "default" to false), "clearColor" to _uM("type" to "String", "default" to "#CCCCCC"), "focus" to _uM("type" to "Boolean", "default" to false), "placeholder" to _uM("type" to "String", "default" to ""), "placeholderStyle" to _uM("type" to "String", "default" to ""), "name" to _uM("type" to "String", "default" to ""), "value" to _uM("type" to _uA(
            "Object",
            "String",
            "Number"
        ), "default" to ""), "modelValue" to _uM("type" to _uA(
            "Object",
            "String",
            "Number"
        ), "default" to ""), "type" to _uM("type" to "String", "default" to "text"), "password" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "disabledStyle" to _uM("type" to "Boolean", "default" to false), "readonly" to _uM("type" to "Boolean", "default" to false), "maxlength" to _uM("type" to "Number", "default" to 140), "min" to _uM("type" to "Number", "default" to -1), "max" to _uM("type" to "Number", "default" to -1), "cursorSpacing" to _uM("type" to "Number", "default" to 0), "cursorColor" to _uM("type" to "String", "default" to ""), "confirmType" to _uM("type" to "String", "default" to "done"), "confirmHold" to _uM("type" to "Boolean", "default" to false), "cursor" to _uM("type" to "Number", "default" to -1), "selectionStart" to _uM("type" to "Number", "default" to -1), "selectionEnd" to _uM("type" to "Number", "default" to -1), "adjustPosition" to _uM("type" to "Boolean", "default" to true), "size" to _uM("type" to "Number", "default" to 0), "color" to _uM("type" to "String", "default" to "#333"), "inputBorder" to _uM("type" to "Boolean", "default" to false), "isFillet" to _uM("type" to "Boolean", "default" to false), "radius" to _uM("type" to "Number", "default" to 0), "borderTop" to _uM("type" to "Boolean", "default" to false), "topLeft" to _uM("type" to "Number", "default" to 0), "topRight" to _uM("type" to "Number", "default" to 0), "borderBottom" to _uM("type" to "Boolean", "default" to true), "bottomLeft" to _uM("type" to "Number", "default" to 32), "bottomRight" to _uM("type" to "Number", "default" to 0), "borderColor" to _uM("type" to "String", "default" to ""), "trim" to _uM("type" to "Boolean", "default" to true), "textAlign" to _uM("type" to "String", "default" to "left"), "padding" to _uM("type" to "String", "default" to "28rpx 32rpx"), "backgroundColor" to _uM("type" to "String", "default" to "#FFFFFF"), "marginTop" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "required",
            "requiredColor",
            "label",
            "labelSize",
            "labelColor",
            "labelWidth",
            "clearable",
            "clearColor",
            "focus",
            "placeholder",
            "placeholderStyle",
            "name",
            "value",
            "modelValue",
            "type",
            "password",
            "disabled",
            "disabledStyle",
            "readonly",
            "maxlength",
            "min",
            "max",
            "cursorSpacing",
            "cursorColor",
            "confirmType",
            "confirmHold",
            "cursor",
            "selectionStart",
            "selectionEnd",
            "adjustPosition",
            "size",
            "color",
            "inputBorder",
            "isFillet",
            "radius",
            "borderTop",
            "topLeft",
            "topRight",
            "borderBottom",
            "bottomLeft",
            "bottomRight",
            "borderColor",
            "trim",
            "textAlign",
            "padding",
            "backgroundColor",
            "marginTop"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
