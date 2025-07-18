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
open class GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadio : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {
            this.`val` = this.checked
            this.getParent("fui-radio-group")
            if (this.fuiRadioGroup != null) {
                val group = this.fuiRadioGroup as ComponentPublicInstance
                (group.`$data`["childrens"] as UTSArray<ComponentPublicInstance>).push(this as ComponentPublicInstance)
                if (group.`$props`["modelValue"] != "") {
                    this.`val` = this.value == group.`$props`["modelValue"]
                }
            }
            val parent = this.getParent("fui-label")
            if (parent) {
                val label = this.fuiLabel as ComponentPublicInstance
                (label.`$data`["childrens"] as UTSArray<ComponentPublicInstance>).push(this as ComponentPublicInstance)
            }
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.checked
        }
        , fun(newVal: Boolean) {
            this.`val` = newVal
        }
        )
        this.`$watch`(fun(): Any? {
            return this.`val`
        }
        , fun(newVal: Boolean) {
            if (newVal && this.fuiRadioGroup != null) {
                val group = this.fuiRadioGroup as ComponentPublicInstance
                group.`$callMethod`("changeValue", this.value, this)
            }
            setTimeout(fun(){
                this.styleVal = newVal
            }
            , 0)
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "fui-radio__input",
            _uA(
                if (_ctx.scaleRatio != 1) {
                    "fui-radio__scale-" + _ctx.scaleAlign
                } else {
                    ""
                }
                ,
                if (_ctx.disabled) {
                    "fui-radio__disabled"
                } else {
                    ""
                }
                ,
                if (_ctx.color == "" && _ctx.styleVal && (!_ctx.isCheckMark || _ctx.styleType == 2)) {
                    "fui-radio__color"
                } else {
                    ""
                }
                ,
                if (_ctx.color == "" && _ctx.styleVal && !_ctx.isCheckMark && _ctx.styleType == 1) {
                    "fui-radio__active-bgcolor"
                } else {
                    ""
                }
                ,
                if (_ctx.normalColor == "" && !_ctx.styleVal && (!_ctx.isCheckMark || _ctx.styleType == 2)) {
                    "fui-radio__background"
                } else {
                    ""
                }
                ,
                if (_ctx.color == "" && _ctx.styleVal && _ctx.styleType == 2) {
                    "fui-radio__background"
                } else {
                    ""
                }
                ,
                if (_ctx.borderColor == "" && !_ctx.styleVal && (!_ctx.isCheckMark || _ctx.styleType == 2)) {
                    "fui-radio__normal-border"
                } else {
                    ""
                }
            )
        )), "style" to _nS(_ctx.getStyl), "onClick" to withModifiers(_ctx.radioClick, _uA(
            "stop"
        ))), _uA(
            if (isTrue(_ctx.`val` && _ctx.styleType == 1)) {
                _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                    "fui-check__mark",
                    _uM("fui-radio__mark-color" to (_ctx.checkMarkColor == ""))
                )), "style" to _nS(_ctx.getMarkStyl)), null, 6)
            } else {
                _cC("v-if", true)
            }
            ,
            if (isTrue(_ctx.`val` && _ctx.styleType == 2)) {
                _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                    "fui-check__mark-circle",
                    _uM("fui-radio__active-bgcolor" to (_ctx.checkMarkColor == ""))
                )), "style" to _nS(_ctx.getCheckMarkStyl)), null, 6)
            } else {
                _cC("v-if", true)
            }
        ), 14, _uA(
            "onClick"
        ))
    }
    open var value: String by `$props`
    open var checked: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var color: String by `$props`
    open var normalColor: String by `$props`
    open var borderColor: String by `$props`
    open var borderRadius: String by `$props`
    open var isCheckMark: Boolean by `$props`
    open var checkMarkColor: String by `$props`
    open var scaleRatio: Number by `$props`
    open var scaleAlign: String by `$props`
    open var styleType: Number by `$props`
    open var `val`: Boolean by `$data`
    open var styleVal: Boolean by `$data`
    open var fuiLabel: ComponentPublicInstance? by `$data`
    open var fuiRadioGroup: ComponentPublicInstance? by `$data`
    open var getStyl: Any by `$data`
    open var getCheckMarkStyl: Any by `$data`
    open var getMarkStyl: Any by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("val" to false, "styleVal" to false, "fuiLabel" to null as ComponentPublicInstance?, "fuiRadioGroup" to null as ComponentPublicInstance?, "getStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            mp.set("transform", "scale(" + this.scaleRatio + ")")
            mp.set("border-radius", this.borderRadius)
            val color = if (this.`val`) {
                this.color
            } else {
                if (this.borderColor == "") {
                    this.color
                } else {
                    this.borderColor
                }
            }
            val bgColor = if (this.`val`) {
                this.color
            } else {
                this.normalColor
            }
            if (this.styleType == 1) {
                if (this.isCheckMark) {
                    mp.set("border-color", "transparent")
                    mp.set("background", "transparent")
                } else {
                    if (color != "") {
                        mp.set("border-color", color)
                    }
                    if (bgColor != "") {
                        mp.set("background", bgColor)
                    }
                }
            } else {
                if (color != "") {
                    mp.set("border-color", color)
                }
                if (bgColor != "") {
                    mp.set("background", bgColor)
                }
            }
            return mp
        }
        ), "getCheckMarkStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.checkMarkColor != "") {
                mp.set("background", this.checkMarkColor)
            }
            return mp
        }
        ), "getMarkStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.checkMarkColor != "") {
                mp.set("borderBottomColor", this.checkMarkColor)
                mp.set("borderRightColor", this.checkMarkColor)
            }
            return mp
        }
        ))
    }
    open var radioClick = ::gen_radioClick_fn
    open fun gen_radioClick_fn(e: UniPointerEvent) {
        e.stopPropagation()
        this.radioChange()
    }
    open var radioChange = ::gen_radioChange_fn
    open fun gen_radioChange_fn() {
        if (this.disabled || this.`val`) {
            return
        }
        this.`val` = true
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
        if (name == "fui-radio-group") {
            this.fuiRadioGroup = parent
        } else {
            this.fuiLabel = parent
        }
        return true
    }
    open var labelClick = ::gen_labelClick_fn
    open fun gen_labelClick_fn() {
        this.radioChange()
    }
    companion object {
        var name = "fui-radio"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-radio__input" to _pS(_uM("width" to "40rpx", "height" to "40rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "display" to "flex", "boxSizing" to "border-box", "flexShrink" to 0, "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "overflow" to "hidden", "position" to "relative")), "fui-radio__scale-left" to _pS(_uM("transformOrigin" to "0 center")), "fui-radio__scale-center" to _pS(_uM("transformOrigin" to "center center")), "fui-radio__scale-right" to _pS(_uM("transformOrigin" to "100% center")), "fui-radio__active-bgcolor" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#465CFF")), "fui-radio__color" to _pS(_uM("!borderTopColor" to "#465CFF", "!borderRightColor" to "#465CFF", "!borderBottomColor" to "#465CFF", "!borderLeftColor" to "#465CFF")), "fui-radio__normal-border" to _pS(_uM("!borderTopColor" to "#CCCCCC", "!borderRightColor" to "#CCCCCC", "!borderBottomColor" to "#CCCCCC", "!borderLeftColor" to "#CCCCCC")), "fui-radio__background" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#ffffff")), "fui-radio__mark-color" to _pS(_uM("!borderBottomColor" to "#ffffff", "!borderRightColor" to "#ffffff")), "fui-check__mark" to _pS(_uM("width" to "20rpx", "height" to "40rpx", "borderBottomStyle" to "solid", "borderBottomWidth" to 3, "borderBottomColor" to "#FFFFFF", "borderRightStyle" to "solid", "borderRightWidth" to 3, "borderRightColor" to "#FFFFFF", "boxSizing" to "border-box", "transform" to "rotate(45deg) scale(0.5)", "transformOrigin" to "54% 48%")), "fui-check__mark-circle" to _pS(_uM("width" to "16rpx", "height" to "16rpx", "borderTopLeftRadius" to "16rpx", "borderTopRightRadius" to "16rpx", "borderBottomRightRadius" to "16rpx", "borderBottomLeftRadius" to "16rpx")), "fui-radio__disabled" to _pS(_uM("opacity" to 0.6)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("value" to _uM("type" to "String", "default" to ""), "checked" to _uM("type" to "Boolean", "default" to false), "disabled" to _uM("type" to "Boolean", "default" to false), "color" to _uM("type" to "String", "default" to ""), "normalColor" to _uM("type" to "String", "default" to ""), "borderColor" to _uM("type" to "String", "default" to ""), "borderRadius" to _uM("type" to "String", "default" to "100px"), "isCheckMark" to _uM("type" to "Boolean", "default" to false), "checkMarkColor" to _uM("type" to "String", "default" to ""), "scaleRatio" to _uM("type" to "Number", "default" to 1), "scaleAlign" to _uM("type" to "String", "default" to "center"), "styleType" to _uM("type" to "Number", "default" to 1)))
        var propsNeedCastKeys = _uA(
            "value",
            "checked",
            "disabled",
            "color",
            "normalColor",
            "borderColor",
            "borderRadius",
            "isCheckMark",
            "checkMarkColor",
            "scaleRatio",
            "scaleAlign",
            "styleType"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
