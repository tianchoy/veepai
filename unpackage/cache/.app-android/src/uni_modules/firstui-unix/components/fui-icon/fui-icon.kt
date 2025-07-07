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
open class GenUniModulesFirstuiUnixComponentsFuiIconFuiIcon : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return createElementVNode("text", utsMapOf("style" to normalizeStyle(_ctx.getIconStyl), "class" to normalizeClass(utsArrayOf(
            "fui-icon",
            utsMapOf("fui-icon__fontsize" to _ctx.isBind, "fui-icon__active-color" to (_ctx.primary && _ctx.color == ""), "fui-icon__color" to (_ctx.color == "" && !_ctx.primary))
        )), "onClick" to _ctx.handleClick), toDisplayString(_ctx.getIcon), 15, utsArrayOf(
            "onClick"
        ))
    }
    open var name: String by `$props`
    open var size: Any by `$props`
    open var unit: String by `$props`
    open var color: String by `$props`
    open var fontWeight: String by `$props`
    open var disabled: Boolean by `$props`
    open var param: String by `$props`
    open var primary: Boolean by `$props`
    open var icons: UTSJSONObject by `$data`
    open var getSize: String by `$data`
    open var isBind: Boolean by `$data`
    open var getIcon: String by `$data`
    open var getIconStyl: Any by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("icons" to default3 as UTSJSONObject, "getSize" to computed<String>(fun(): String {
            var size: String
            if (UTSAndroid.`typeof`(this.size) == "number") {
                size = (this.size as Number).toString(10) + this.unit
            } else if (UTSAndroid.`typeof`(this.size) == "string") {
                size = (this.size as String) + this.unit
            } else {
                size = this.size.toString() + this.unit
            }
            return size
        }
        ), "isBind" to computed<Boolean>(fun(): Boolean {
            val size = this.getSize
            var bind = false
            if (size == "" || size == "px" || size == "rpx" || size == "0rpx" || size == "0px") {
                bind = true
            }
            return bind
        }
        ), "getIcon" to computed<String>(fun(): String {
            val icon = this.icons.getString(this.name)
            return if (icon == null) {
                ""
            } else {
                icon
            }
        }
        ), "getIconStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            mp.set("fontWeight", this.fontWeight)
            mp.set("fontSize", this.getSize)
            mp.set("lineHeight", this.getSize)
            if (this.color != "") {
                mp.set("color", this.color)
            }
            return mp
        }
        ))
    }
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn() {
        if (this.disabled) {
            return
        }
        this.`$emit`("onclick", this.param)
    }
    companion object {
        var name = "fui-icon"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("fui-icon" to padStyleMapOf(utsMapOf("fontFamily" to "fuiFont")), "fui-icon__color" to padStyleMapOf(utsMapOf("!color" to "#333333")), "fui-icon__active-color" to padStyleMapOf(utsMapOf("!color" to "#465CFF")), "fui-icon__fontsize" to padStyleMapOf(utsMapOf("!fontSize" to "64rpx", "!lineHeight" to "64rpx")), "@FONT-FACE" to utsMapOf("0" to utsMapOf("fontFamily" to "fuiFont", "src" to "url(\"/assets/fui-icon.9165208c.ttf\")")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("onclick" to null)
        var props = normalizePropsOptions(utsMapOf("name" to utsMapOf("type" to "String", "default" to ""), "size" to utsMapOf("type" to utsArrayOf(
            "Object",
            "String",
            "Number"
        ), "default" to 0), "unit" to utsMapOf("type" to "String", "default" to "rpx"), "color" to utsMapOf("type" to "String", "default" to ""), "fontWeight" to utsMapOf("type" to "String", "default" to "normal"), "disabled" to utsMapOf("type" to "Boolean", "default" to false), "param" to utsMapOf("type" to "String", "default" to "0"), "primary" to utsMapOf("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = utsArrayOf(
            "name",
            "size",
            "unit",
            "color",
            "fontWeight",
            "disabled",
            "param",
            "primary"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
