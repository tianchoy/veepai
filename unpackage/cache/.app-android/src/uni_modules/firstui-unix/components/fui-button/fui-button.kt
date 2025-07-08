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
open class GenUniModulesFirstuiUnixComponentsFuiButtonFuiButton : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {
            this.getParent("fui-form")
        }
        , __ins)
        onMounted(fun() {
            this.`$nextTick`(fun(){
                setTimeout(fun(){
                    if (this.loading) {
                        this.startSpin()
                    }
                }
                , 200)
            }
            )
        }
        , __ins)
        onBeforeUnmount(fun() {
            this.isSpin = false
            this.element = null
            this.hoverEle = null
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.loading
        }
        , fun(newValue: Boolean) {
            if (newValue) {
                this.`$nextTick`(fun(){
                    setTimeout(fun(){
                        this.startSpin()
                    }, 50)
                })
            } else {
                this.endSpin()
            }
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
            "fui-button__wrap",
            utsArrayOf(
                if (_ctx.getWidth == "" || _ctx.getWidth == "100%") {
                    "fui-button__flex-1"
                } else {
                    ""
                }
                ,
                if (_ctx.disabled && _ctx.disabledBackground == "") {
                    "fui-button__opacity"
                } else {
                    ""
                }
                ,
                if (_ctx.background == "" && _ctx.disabledBackground == "" && !_ctx.plain) {
                    "fui-button__" + _ctx.type
                } else {
                    ""
                }
                ,
                if (_ctx.height == "" && _ctx.btnSize == "") {
                    "fui-button__height"
                } else {
                    ""
                }
                ,
                if (_ctx.radius == "") {
                    "fui-button__radius"
                } else {
                    ""
                }
                ,
                if (_ctx.highlight && !_ctx.disabled) {
                    "fui-button__active"
                } else {
                    ""
                }
            )
        )), "style" to normalizeStyle(utsMapOf("width" to _ctx.getWidth, "height" to _ctx.getHeight, "margin" to _ctx.margin, "borderRadius" to _ctx.radius, "background" to _ctx.getBackground, "border" to ("" + (if (_ctx.borderColor == "") {
            "0px"
        } else {
            _ctx.borderWidth
        }
        ) + " solid"), "borderColor" to _ctx.getBorderColor)), "onTouchstart" to _ctx.handleStart, "onTouchend" to _ctx.handleEnd, "onTouchcancel" to _ctx.handleEnd, "onClick" to _ctx.handleTap), utsArrayOf(
            if (isTrue(_ctx.loading)) {
                createElementVNode("view", utsMapOf("key" to 0, "ref" to "fui_button_loading", "onTransitionend" to _ctx.onEnd, "class" to "fui-button__spin", "style" to normalizeStyle(_ctx.getStyl)), null, 44, utsArrayOf(
                    "onTransitionend"
                ))
            } else {
                createCommentVNode("v-if", true)
            }
            ,
            if (isTrue(_ctx.text)) {
                createElementVNode("text", utsMapOf("key" to 1, "class" to normalizeClass(utsArrayOf(
                    "fui-button__text",
                    utsMapOf("fui-btn__gray-color" to (_ctx.background == "" && _ctx.disabledBackground == "" && !_ctx.plain && _ctx.type == "gray" && _ctx.color == "#fff"), "fui-text__bold" to _ctx.bold, "fui-button__size" to (_ctx.size == 0 && _ctx.btnSize == ""), "fui-button__height-text" to (_ctx.height == "" && _ctx.btnSize == ""))
                )), "style" to normalizeStyle(utsMapOf("fontSize" to _ctx.getSize, "color" to _ctx.getColor, "height" to _ctx.getHeight, "lineHeight" to _ctx.getHeight))), toDisplayString(_ctx.text), 7)
            } else {
                createCommentVNode("v-if", true)
            }
            ,
            renderSlot(_ctx.`$slots`, "default"),
            if (isTrue(_ctx.highlight)) {
                createElementVNode("view", utsMapOf("key" to 2, "ref" to "fui_button_hover", "class" to normalizeClass(utsArrayOf(
                    "fui-button__hover",
                    utsMapOf("fui-button__radius" to (_ctx.radius == ""))
                )), "style" to normalizeStyle(utsMapOf("borderRadius" to _ctx.radius))), null, 6)
            } else {
                createCommentVNode("v-if", true)
            }
        ), 46, utsArrayOf(
            "onTouchstart",
            "onTouchend",
            "onTouchcancel",
            "onClick"
        ))
    }
    open var type: String by `$props`
    open var background: String by `$props`
    open var text: String by `$props`
    open var color: String by `$props`
    open var disabledBackground: String by `$props`
    open var disabledColor: String by `$props`
    open var borderWidth: String by `$props`
    open var borderColor: String by `$props`
    open var btnSize: String by `$props`
    open var width: String by `$props`
    open var height: String by `$props`
    open var size: Number by `$props`
    open var bold: Boolean by `$props`
    open var margin: String by `$props`
    open var radius: String by `$props`
    open var plain: Boolean by `$props`
    open var highlight: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var loading: Boolean by `$props`
    open var iconColor: String by `$props`
    open var activeColor: String by `$props`
    open var formType: String by `$props`
    open var times: Number by `$data`
    open var isSpin: Boolean by `$data`
    open var element: UniElement? by `$data`
    open var hoverEle: UniElement? by `$data`
    open var fuiForm: ComponentPublicInstance? by `$data`
    open var getStyl: Any by `$data`
    open var getBackground: String by `$data`
    open var getBorderColor: String by `$data`
    open var getColor: String by `$data`
    open var getSize: String by `$data`
    open var getWidth: String by `$data`
    open var getHeight: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("times" to 0, "isSpin" to false, "element" to null as UniElement?, "hoverEle" to null as UniElement?, "fuiForm" to null as ComponentPublicInstance?, "getStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            mp.set("border-left-color", this.activeColor)
            mp.set("border-right-color", this.iconColor)
            mp.set("border-top-color", this.iconColor)
            mp.set("border-bottom-color", this.iconColor)
            return mp
        }
        ), "getBackground" to computed<String>(fun(): String {
            var color = this.background
            if (this.disabled && this.disabledBackground != "") {
                color = this.disabledBackground
            }
            color = if (this.type == "link" || this.plain) {
                "rgba(0,0,0,0)"
            } else {
                color
            }
            return color
        }
        ), "getBorderColor" to computed<String>(fun(): String {
            var color = this.borderColor
            if (color == "") {
                color = if (this.disabled && this.disabledBackground != "") {
                    this.disabledBackground
                } else {
                    this.background
                }
            }
            color = if (this.type == "link") {
                "rgba(0,0,0,0)"
            } else {
                color
            }
            return color
        }
        ), "getColor" to computed<String>(fun(): String {
            var color: String
            if (this.color != "") {
                color = if (this.disabled && this.disabledBackground != "") {
                    this.disabledColor
                } else {
                    this.color
                }
            } else {
                if (this.disabled && this.disabledBackground != "") {
                    color = if (this.disabledColor == "") {
                        "#FFFFFF"
                    } else {
                        this.disabledColor
                    }
                } else {
                    color = if (this.type == "gray") {
                        "#465CFF"
                    } else {
                        "#FFFFFF"
                    }
                }
            }
            return color
        }
        ), "getSize" to computed<String>(fun(): String {
            var size = this.size
            if (this.btnSize != "") {
                size = if (size == 0) {
                    32
                } else {
                    size
                }
                if (this.btnSize == "small") {
                    size = if (size > 28) {
                        28
                    } else {
                        size
                    }
                } else if (this.btnSize == "mini") {
                    size = if (size > 28) {
                        24
                    } else {
                        size
                    }
                }
            }
            return "" + size + "rpx"
        }
        ), "getWidth" to computed<String>(fun(): String {
            var width = this.width
            if (this.btnSize != "") {
                width = (object : UTSJSONObject() {
                    var medium = "400rpx"
                    var small = "200rpx"
                    var mini = "120rpx"
                })[this.btnSize] as String
            }
            return width
        }
        ), "getHeight" to computed<String>(fun(): String {
            var height = this.height
            if (this.btnSize != "") {
                height = (object : UTSJSONObject() {
                    var medium = "84rpx"
                    var small = "72rpx"
                    var mini = "64rpx"
                })[this.btnSize] as String
            }
            return height
        }
        ))
    }
    open var handleStart = ::gen_handleStart_fn
    open fun gen_handleStart_fn() {
        this.switchHover(true)
    }
    open var handleTap = ::gen_handleTap_fn
    open fun gen_handleTap_fn(e: MouseEvent) {
        if (this.disabled) {
            return
        }
        this.`$emit`("onclick", e)
        if (this.formType != "" && this.fuiForm != null) {
            val form = this.fuiForm as ComponentPublicInstance
            form.`$callMethod`("buttonEvent", this.formType)
        }
    }
    open var handleEnd = ::gen_handleEnd_fn
    open fun gen_handleEnd_fn() {
        this.switchHover(false)
    }
    open var switchHover = ::gen_switchHover_fn
    open fun gen_switchHover_fn(show: Boolean) {
        if (!this.highlight || this.disabled) {
            return
        }
        if (this.hoverEle == null) {
            this.hoverEle = this.`$refs`["fui_button_hover"] as UniElement
        }
        this.hoverEle!!.style.setProperty("visibility", if (show) {
            "visible"
        } else {
            "hidden"
        }
        )
    }
    open var startSpin = ::gen_startSpin_fn
    open fun gen_startSpin_fn() {
        if (this.element != null && this.isSpin) {
            return
        }
        if (this.element == null) {
            this.element = this.`$refs`["fui_button_loading"] as UniElement
        }
        this.times = this.times + 1
        this.element!!.style.setProperty("transform", "rotate(" + this.times * 360 + "deg)")
        this.element!!.style.setProperty("transition-duration", "600ms")
        this.isSpin = true
    }
    open var endSpin = ::gen_endSpin_fn
    open fun gen_endSpin_fn() {
        this.isSpin = false
        this.times = 0
        this.element!!.style.setProperty("transform", "rotate(" + this.times * 360 + "deg)")
        this.element!!.style.setProperty("transition-duration", "0s")
        this.element = null
    }
    open var onEnd = ::gen_onEnd_fn
    open fun gen_onEnd_fn() {
        if (this.isSpin && this.loading) {
            this.times = this.times + 1
            this.element!!.style.setProperty("transform", "rotate(" + this.times * 360 + "deg)")
        }
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
    companion object {
        var name = "fui-button"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("fui-button__wrap" to padStyleMapOf(utsMapOf("position" to "relative", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "boxSizing" to "border-box", "overflow" to "hidden")), "fui-button__flex-1" to padStyleMapOf(utsMapOf("width" to "100%")), "fui-button__opacity" to padStyleMapOf(utsMapOf("opacity" to 0.5)), "fui-button__hover" to padStyleMapOf(utsMapOf("position" to "absolute", "left" to 0, "right" to 0, "top" to 0, "bottom" to 0, "backgroundColor" to "rgba(0,0,0,0.2)", "zIndex" to 2, "borderTopLeftRadius" to 0, "borderTopRightRadius" to 0, "borderBottomRightRadius" to 0, "borderBottomLeftRadius" to 0, "visibility" to "hidden", "pointerEvents" to "none")), "fui-button__spin" to padStyleMapOf(utsMapOf("width" to "32rpx", "height" to "32rpx", "borderTopWidth" to 2, "borderRightWidth" to 2, "borderBottomWidth" to 2, "borderLeftWidth" to 2, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "transitionDuration" to "600ms", "transitionProperty" to "transform", "transitionTimingFunction" to "linear", "transform" to "rotate(0deg)", "boxSizing" to "border-box", "marginRight" to "8rpx", "position" to "relative")), "fui-button__text" to padStyleMapOf(utsMapOf("textAlign" to "center")), "fui-text__bold" to padStyleMapOf(utsMapOf("fontWeight" to "bold")), "fui-button__link" to padStyleMapOf(utsMapOf("!borderTopColor" to "rgba(0,0,0,0)", "!borderRightColor" to "rgba(0,0,0,0)", "!borderBottomColor" to "rgba(0,0,0,0)", "!borderLeftColor" to "rgba(0,0,0,0)", "!backgroundColor" to "rgba(0,0,0,0)")), "fui-button__primary" to padStyleMapOf(utsMapOf("!borderTopColor" to "#465CFF", "!borderRightColor" to "#465CFF", "!borderBottomColor" to "#465CFF", "!borderLeftColor" to "#465CFF", "!backgroundImage" to "none", "!backgroundColor" to "#465CFF")), "fui-button__success" to padStyleMapOf(utsMapOf("!borderTopColor" to "#09BE4F", "!borderRightColor" to "#09BE4F", "!borderBottomColor" to "#09BE4F", "!borderLeftColor" to "#09BE4F", "!backgroundImage" to "none", "!backgroundColor" to "#09BE4F")), "fui-button__warning" to padStyleMapOf(utsMapOf("!borderTopColor" to "#FFB703", "!borderRightColor" to "#FFB703", "!borderBottomColor" to "#FFB703", "!borderLeftColor" to "#FFB703", "!backgroundImage" to "none", "!backgroundColor" to "#FFB703")), "fui-button__danger" to padStyleMapOf(utsMapOf("!borderTopColor" to "#FF2B2B", "!borderRightColor" to "#FF2B2B", "!borderBottomColor" to "#FF2B2B", "!borderLeftColor" to "#FF2B2B", "!backgroundImage" to "none", "!backgroundColor" to "#FF2B2B")), "fui-button__purple" to padStyleMapOf(utsMapOf("!borderTopColor" to "#6831FF", "!borderRightColor" to "#6831FF", "!borderBottomColor" to "#6831FF", "!borderLeftColor" to "#6831FF", "!backgroundImage" to "none", "!backgroundColor" to "#6831FF")), "fui-button__gray" to padStyleMapOf(utsMapOf("!borderTopColor" to "#F8F8F8", "!borderRightColor" to "#F8F8F8", "!borderBottomColor" to "#F8F8F8", "!borderLeftColor" to "#F8F8F8", "!backgroundImage" to "none", "!backgroundColor" to "#F8F8F8")), "fui-btn__gray-color" to padStyleMapOf(utsMapOf("!color" to "#465CFF")), "fui-button__height" to padStyleMapOf(utsMapOf("!height" to "96rpx")), "fui-button__height-text" to padStyleMapOf(utsMapOf("!height" to "96rpx", "!lineHeight" to "96rpx")), "fui-button__size" to padStyleMapOf(utsMapOf("!fontSize" to "32rpx")), "fui-button__radius" to padStyleMapOf(utsMapOf("!borderTopLeftRadius" to "16rpx", "!borderTopRightRadius" to "16rpx", "!borderBottomRightRadius" to "16rpx", "!borderBottomLeftRadius" to "16rpx")), "@TRANSITION" to utsMapOf("fui-button__spin" to utsMapOf("duration" to "600ms", "property" to "transform", "timingFunction" to "linear")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("onclick" to null)
        var props = normalizePropsOptions(utsMapOf("type" to utsMapOf("type" to "String", "default" to "primary"), "background" to utsMapOf("type" to "String", "default" to ""), "text" to utsMapOf("type" to "String", "default" to ""), "color" to utsMapOf("type" to "String", "default" to ""), "disabledBackground" to utsMapOf("type" to "String", "default" to ""), "disabledColor" to utsMapOf("type" to "String", "default" to ""), "borderWidth" to utsMapOf("type" to "String", "default" to "0.5px"), "borderColor" to utsMapOf("type" to "String", "default" to ""), "btnSize" to utsMapOf("type" to "String", "default" to ""), "width" to utsMapOf("type" to "String", "default" to "100%"), "height" to utsMapOf("type" to "String", "default" to ""), "size" to utsMapOf("type" to "Number", "default" to 0), "bold" to utsMapOf("type" to "Boolean", "default" to false), "margin" to utsMapOf("type" to "String", "default" to ""), "radius" to utsMapOf("type" to "String", "default" to ""), "plain" to utsMapOf("type" to "Boolean", "default" to false), "highlight" to utsMapOf("type" to "Boolean", "default" to true), "disabled" to utsMapOf("type" to "Boolean", "default" to false), "loading" to utsMapOf("type" to "Boolean", "default" to false), "iconColor" to utsMapOf("type" to "String", "default" to "#B2B2B2"), "activeColor" to utsMapOf("type" to "String", "default" to "#FFFFFF"), "formType" to utsMapOf("type" to "String", "default" to "")))
        var propsNeedCastKeys = utsArrayOf(
            "type",
            "background",
            "text",
            "color",
            "disabledBackground",
            "disabledColor",
            "borderWidth",
            "borderColor",
            "btnSize",
            "width",
            "height",
            "size",
            "bold",
            "margin",
            "radius",
            "plain",
            "highlight",
            "disabled",
            "loading",
            "iconColor",
            "activeColor",
            "formType"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
