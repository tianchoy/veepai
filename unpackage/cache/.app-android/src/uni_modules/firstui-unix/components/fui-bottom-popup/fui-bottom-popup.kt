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
open class GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopup : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {}, __ins)
        onMounted(fun() {
            this.`$nextTick`(fun(){
                setTimeout(fun(){
                    if (!this.visible) {
                        this.close()
                    }
                }
                , 50)
            }
            )
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.visible
        }
        , fun(newVal: Boolean) {
            if (newVal) {
                this.open()
            } else {
                if (this.isShow) {
                    this.close()
                }
            }
        }
        , WatchOptions(immediate = true))
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return createElementVNode("view", utsMapOf("class" to "fui-bottom__popup-wrap", "style" to normalizeStyle(utsMapOf("zIndex" to _ctx.zIndex, "background" to _ctx.maskBackground)), "onClick" to withModifiers(_ctx.handleClose, utsArrayOf(
            "stop"
        )), "ref" to _ctx.refMkId), utsArrayOf(
            createElementVNode("view", utsMapOf("onClick" to withModifiers(_ctx.stop, utsArrayOf(
                "stop"
            )), "ref" to _ctx.refId, "class" to normalizeClass(utsArrayOf(
                "fui-bottom__popup",
                utsMapOf("fui-bp__safe-weex" to (_ctx.iphoneX && _ctx.safeArea))
            )), "style" to normalizeStyle(utsMapOf("borderTopLeftRadius" to ("" + _ctx.radius + "rpx"), "borderTopRightRadius" to ("" + _ctx.radius + "rpx"), "background" to _ctx.background))), utsArrayOf(
                renderSlot(_ctx.`$slots`, "default")
            ), 14, utsArrayOf(
                "onClick"
            ))
        ), 12, utsArrayOf(
            "onClick"
        ))
    }
    open var visible: Boolean by `$props`
    open var background: String by `$props`
    open var radius: Number by `$props`
    open var zIndex: Number by `$props`
    open var maskClosable: Boolean by `$props`
    open var maskBackground: String by `$props`
    open var safeArea: Boolean by `$props`
    open var refId: Any? by `$data`
    open var refMkId: Any? by `$data`
    open var iphoneX: Boolean by `$data`
    open var isShow: Boolean by `$data`
    open var element: UniElement? by `$data`
    open var mkElement: UniElement? by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        val refId = "fui_bp_" + parseInt(Math.ceil(Math.random() * 10e5).toString(10), 36)
        val refMkId = "fui_bpmk_" + parseInt(Math.ceil(Math.random() * 10e5).toString(10), 36)
        return utsMapOf("refId" to refId, "refMkId" to refMkId, "iphoneX" to false, "isShow" to false, "element" to null as UniElement?, "mkElement" to null as UniElement?)
    }
    open var handleClose = ::gen_handleClose_fn
    open fun gen_handleClose_fn() {
        if (!this.maskClosable) {
            return
        }
        this.`$emit`("close")
        this.`$emit`("update:visible", false)
    }
    open var open = ::gen_open_fn
    open fun gen_open_fn() {
        this.isShow = true
        this.`$nextTick`(fun(){
            setTimeout(fun(){
                this._animation(true)
            }
            , 50)
        }
        )
    }
    open var close = ::gen_close_fn
    open fun gen_close_fn() {
        this.isShow = false
        this._animation(false)
    }
    open var _animation = ::gen__animation_fn
    open fun gen__animation_fn(visible: Boolean) {
        if (this.element == null) {
            this.element = this.`$refs`[this.refId] as UniElement
        }
        if (this.mkElement == null) {
            this.mkElement = this.`$refs`[this.refMkId] as UniElement
        }
        this.element!!.style.setProperty("transform", "translateY(" + (if (visible) {
            "0"
        } else {
            "100%"
        }
        ) + ")")
        this.element!!.style.setProperty("opacity", if (visible) {
            "1"
        } else {
            "0"
        }
        )
        this.mkElement!!.style.setProperty("opacity", if (visible) {
            "1"
        } else {
            "0"
        }
        )
        if (visible) {
            this.mkElement!!.style.setProperty("visibility", "visible")
            this.element!!.style.setProperty("visibility", "visible")
        } else {
            setTimeout(fun(){
                this.mkElement!!.style.setProperty("visibility", "hidden")
                this.element!!.style.setProperty("visibility", "hidden")
            }
            , 300)
        }
    }
    open var stop = ::gen_stop_fn
    open fun gen_stop_fn() {}
    companion object {
        var name = "fui-bottom-popup"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("fui-bottom__popup-wrap" to padStyleMapOf(utsMapOf("position" to "fixed", "left" to 0, "right" to 0, "top" to 0, "bottom" to 0, "display" to "flex", "flexDirection" to "row", "alignItems" to "flex-end", "justifyContent" to "center", "transitionProperty" to "opacity,visibility", "transitionTimingFunction" to "ease-in-out", "transitionDuration" to "0.3s", "visibility" to "hidden", "borderBottomWidth" to 0, "overflow" to "hidden", "opacity" to 0)), "fui-bottom__popup" to padStyleMapOf(utsMapOf("width" to "100%", "transitionProperty" to "transform,opacity,visibility", "transitionTimingFunction" to "ease-in-out", "transitionDuration" to "0.3s", "minHeight" to "20rpx", "overflow" to "hidden", "transform" to "translateY(100%)", "display" to "flex", "flexDirection" to "row", "position" to "relative")), "fui-bp__safe-weex" to padStyleMapOf(utsMapOf("paddingBottom" to 34)), "@TRANSITION" to utsMapOf("fui-bottom__popup-wrap" to utsMapOf("property" to "opacity,visibility", "timingFunction" to "ease-in-out", "duration" to "0.3s"), "fui-bottom__popup" to utsMapOf("property" to "transform,opacity,visibility", "timingFunction" to "ease-in-out", "duration" to "0.3s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("close" to null, "update:visible" to null)
        var props = normalizePropsOptions(utsMapOf("visible" to utsMapOf("type" to "Boolean", "default" to false), "background" to utsMapOf("type" to "String", "default" to "#fff"), "radius" to utsMapOf("type" to "Number", "default" to 24), "zIndex" to utsMapOf("type" to "Number", "default" to 996), "maskClosable" to utsMapOf("type" to "Boolean", "default" to true), "maskBackground" to utsMapOf("type" to "String", "default" to "rgba(0,0,0,.6)"), "safeArea" to utsMapOf("type" to "Boolean", "default" to true)))
        var propsNeedCastKeys = utsArrayOf(
            "visible",
            "background",
            "radius",
            "zIndex",
            "maskClosable",
            "maskBackground",
            "safeArea"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
