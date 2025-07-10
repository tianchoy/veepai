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
open class GenUniModulesLimeOverlayComponentsLOverlayLOverlay : VueComponent, OverlayProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var ariaLabel: String by `$props`
    override var ariaRole: String by `$props`
    override var lClass: String? by `$props`
    override var bgColor: String? by `$props`
    override var lStyle: String? by `$props`
    override var duration: Number by `$props`
    override var preventScrollThrough: Boolean by `$props`
    override var visible: Boolean by `$props`
    override var zIndex: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeOverlayComponentsLOverlayLOverlay) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeOverlayComponentsLOverlayLOverlay
            val _cache = __ins.renderCache
            val props = __props
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val _useTransition = useTransition1(UseTransitionOptions1(defaultName = "fade", appear = props.visible, emits = fun(name: TransitionEmitStatus){
                emit(name)
            }
            , visible = fun(): Boolean {
                return props.visible
            }
            , duration = props.duration))
            val inited = _useTransition.inited
            val display = _useTransition.display
            val classes = _useTransition.classes
            val finished = _useTransition.finished
            val styles = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.bgColor != null) {
                    style.set("background", props.bgColor!!)
                }
                if (props.zIndex > 0) {
                    style.set("z-index", props.zIndex)
                }
                return style
            }
            )
            val noop = fun(){}
            val onClick = fun(event: UniPointerEvent){
                emit("click", !props.visible)
            }
            val overlayRef = ref<UniElement?>(null)
            watchEffect(fun(){
                overlayRef.value?.style?.setProperty("transition-duration", "" + props.duration + "ms")
                if (!display.value) {
                    overlayRef.value?.style?.setProperty("display", "none")
                } else {
                    overlayRef.value?.style?.setProperty("display", "flex")
                }
            }
            )
            return fun(): Any? {
                return if (isTrue(unref(inited))) {
                    createElementVNode("view", utsMapOf("key" to 0, "class" to normalizeClass(utsArrayOf(
                        "l-overlay",
                        utsArrayOf(
                            _ctx.lClass,
                            unref(classes)
                        )
                    )), "ref_key" to "overlayRef", "ref" to overlayRef, "style" to normalizeStyle(utsArrayOf(
                        unref(styles),
                        _ctx.lStyle
                    )), "onClick" to withModifiers(onClick, utsArrayOf(
                        "stop"
                    )), "onTouchmove" to withModifiers(noop, utsArrayOf(
                        "stop"
                    )), "onTransitionend" to unref(finished), "aria-role" to _ctx.ariaRole, "aria-label" to _ctx.ariaLabel), utsArrayOf(
                        renderSlot(_ctx.`$slots`, "default")
                    ), 46, utsArrayOf(
                        "onTransitionend",
                        "aria-role",
                        "aria-label"
                    ))
                } else {
                    createCommentVNode("v-if", true)
                }
            }
        }
        var name = "l-overlay"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-overlay" to padStyleMapOf(utsMapOf("position" to "fixed", "top" to 0, "left" to 0, "width" to "100%", "bottom" to 0, "backgroundColor" to "rgba(0,0,0,0.6)", "transitionDuration" to "300ms", "transitionProperty" to "opacity", "transitionTimingFunction" to "ease", "zIndex" to 998, "opacity" to 1)), "l-fade-enter" to padStyleMapOf(utsMapOf("opacity" to 0)), "l-fade-leave-to" to padStyleMapOf(utsMapOf("opacity" to 0)), "@TRANSITION" to utsMapOf("l-overlay" to utsMapOf("duration" to "300ms", "property" to "opacity", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("click" to null, "before-enter" to null, "enter" to null, "after-enter" to null, "before-leave" to null, "leave" to null, "after-leave" to null)
        var props = normalizePropsOptions(utsMapOf("ariaLabel" to utsMapOf("type" to "String", "required" to true, "default" to "关闭"), "ariaRole" to utsMapOf("type" to "String", "required" to true, "default" to "button"), "lClass" to utsMapOf("type" to "String", "required" to false), "bgColor" to utsMapOf("type" to "String", "required" to false), "lStyle" to utsMapOf("type" to "String", "required" to false), "duration" to utsMapOf("type" to "Number", "required" to true, "default" to 300), "preventScrollThrough" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "visible" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "zIndex" to utsMapOf("type" to "Number", "required" to true, "default" to 998)))
        var propsNeedCastKeys = utsArrayOf(
            "ariaLabel",
            "ariaRole",
            "duration",
            "preventScrollThrough",
            "visible",
            "zIndex"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
