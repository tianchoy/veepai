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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
open class GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckbox : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {
            this.`val` = this.checked
            this.getParent("fui-checkbox-group")
            if (this.fuiCkGroup != null) {
                val group = this.fuiCkGroup as ComponentPublicInstance
                (group.`$data`["childrens"] as UTSArray<ComponentPublicInstance>).push(this as ComponentPublicInstance)
                val modelValue = group.`$props`["modelValue"] as UTSArray<String>
                if (modelValue.length > 0) {
                    this.`val` = modelValue.includes(this.value)
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
        , fun() {
            if (this.fuiCkGroup != null) {
                val group = this.fuiCkGroup as ComponentPublicInstance
                group.`$callMethod`("changeValue")
            }
            setTimeout(fun(){
                this.styleVal = this.`val`
            }
            , 0)
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
            "fui-checkbox__input",
            utsArrayOf(
                if (_ctx.scaleRatio != 1) {
                    "fui-checkbox__scale-" + _ctx.scaleAlign
                } else {
                    ""
                }
                ,
                if (_ctx.disabled) {
                    "fui-checkbox__disabled"
                } else {
                    ""
                }
                ,
                if (_ctx.color == "" && _ctx.styleVal && !_ctx.isCheckMark) {
                    "fui-checkbox__color"
                } else {
                    ""
                }
                ,
                if (_ctx.normalColor == "" && !_ctx.styleVal && !_ctx.isCheckMark) {
                    "fui-checkbox__background"
                } else {
                    ""
                }
                ,
                if (_ctx.borderColor == "" && !_ctx.styleVal && !_ctx.isCheckMark) {
                    "fui-checkbox__normal-border"
                } else {
                    ""
                }
            )
        )), "style" to normalizeStyle(_ctx.getStyl), "onClick" to withModifiers(_ctx.checkboxClick, utsArrayOf(
            "stop"
        ))), utsArrayOf(
            if (isTrue(_ctx.`val`)) {
                createElementVNode("view", utsMapOf("key" to 0, "class" to normalizeClass(utsArrayOf(
                    "fui-check__mark",
                    utsMapOf("fui-checkbox__mark-color" to (_ctx.checkMarkColor == ""))
                )), "style" to normalizeStyle(_ctx.getMarkStyl)), null, 6)
            } else {
                createCommentVNode("v-if", true)
            }
        ), 14, utsArrayOf(
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
    open var `val`: Boolean by `$data`
    open var styleVal: Boolean by `$data`
    open var fuiLabel: ComponentPublicInstance? by `$data`
    open var fuiCkGroup: ComponentPublicInstance? by `$data`
    open var getStyl: Any by `$data`
    open var getMarkStyl: Any by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("val" to false, "styleVal" to false, "fuiLabel" to null as ComponentPublicInstance?, "fuiCkGroup" to null as ComponentPublicInstance?, "getStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            mp.set("transform", "scale(" + this.scaleRatio + ")")
            mp.set("border-radius", this.borderRadius)
            var color = if (this.`val`) {
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
    open var checkboxClick = ::gen_checkboxClick_fn
    open fun gen_checkboxClick_fn(e: UniPointerEvent) {
        e.stopPropagation()
        this.checkboxChange()
    }
    open var checkboxChange = ::gen_checkboxChange_fn
    open fun gen_checkboxChange_fn() {
        if (this.disabled) {
            return
        }
        this.`val` = !this.`val`
        this.`$emit`("change", FuiCheckboxChangeParam(checked = this.`val`, value = this.value))
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
        if (name == "fui-checkbox-group") {
            this.fuiCkGroup = parent
        } else {
            this.fuiLabel = parent
        }
        return true
    }
    open var labelClick = ::gen_labelClick_fn
    open fun gen_labelClick_fn() {
        this.checkboxChange()
    }
    companion object {
        var name = "fui-checkbox"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("fui-checkbox__input" to padStyleMapOf(utsMapOf("width" to "40rpx", "height" to "40rpx", "borderTopWidth" to 1, "borderRightWidth" to 1, "borderBottomWidth" to 1, "borderLeftWidth" to 1, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "boxSizing" to "border-box", "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "flexShrink" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "overflow" to "hidden", "position" to "relative")), "fui-checkbox__scale-left" to padStyleMapOf(utsMapOf("transformOrigin" to "0 center")), "fui-checkbox__scale-center" to padStyleMapOf(utsMapOf("transformOrigin" to "center center")), "fui-checkbox__scale-right" to padStyleMapOf(utsMapOf("transformOrigin" to "100% center")), "fui-checkbox__color" to padStyleMapOf(utsMapOf("!backgroundImage" to "none", "!backgroundColor" to "#465CFF", "!borderTopColor" to "#465CFF", "!borderRightColor" to "#465CFF", "!borderBottomColor" to "#465CFF", "!borderLeftColor" to "#465CFF")), "fui-checkbox__normal-border" to padStyleMapOf(utsMapOf("!borderTopColor" to "#CCCCCC", "!borderRightColor" to "#CCCCCC", "!borderBottomColor" to "#CCCCCC", "!borderLeftColor" to "#CCCCCC")), "fui-checkbox__background" to padStyleMapOf(utsMapOf("!backgroundImage" to "none", "!backgroundColor" to "#ffffff")), "fui-checkbox__mark-color" to padStyleMapOf(utsMapOf("!borderBottomColor" to "#ffffff", "!borderRightColor" to "#ffffff")), "fui-check__mark" to padStyleMapOf(utsMapOf("width" to "20rpx", "height" to "40rpx", "borderBottomStyle" to "solid", "borderBottomWidth" to 3, "borderBottomColor" to "#FFFFFF", "borderRightStyle" to "solid", "borderRightWidth" to 3, "borderRightColor" to "#FFFFFF", "boxSizing" to "border-box", "transform" to "rotate(45deg) scale(0.5)", "transformOrigin" to "54% 48%")), "fui-checkbox__disabled" to padStyleMapOf(utsMapOf("opacity" to 0.6)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("change" to null)
        var props = normalizePropsOptions(utsMapOf("value" to utsMapOf("type" to "String", "default" to ""), "checked" to utsMapOf("type" to "Boolean", "default" to false), "disabled" to utsMapOf("type" to "Boolean", "default" to false), "color" to utsMapOf("type" to "String", "default" to ""), "normalColor" to utsMapOf("type" to "String", "default" to ""), "borderColor" to utsMapOf("type" to "String", "default" to ""), "borderRadius" to utsMapOf("type" to "String", "default" to "100px"), "isCheckMark" to utsMapOf("type" to "Boolean", "default" to false), "checkMarkColor" to utsMapOf("type" to "String", "default" to ""), "scaleRatio" to utsMapOf("type" to "Number", "default" to 1), "scaleAlign" to utsMapOf("type" to "String", "default" to "center")))
        var propsNeedCastKeys = utsArrayOf(
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
            "scaleAlign"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
