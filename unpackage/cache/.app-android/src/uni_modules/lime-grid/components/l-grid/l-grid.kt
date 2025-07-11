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
open class GenUniModulesLimeGridComponentsLGridLGrid : VueComponent, GridProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var align: String by `$props`
    override var border: Boolean by `$props`
    override var column: Number by `$props`
    override var gutter: Number by `$props`
    override var hover: Boolean by `$props`
    override var inset: Boolean by `$props`
    override var gridWidth: String? by `$props`
    override var padding: String? by `$props`
    override var bgColor: String? by `$props`
    override var wrap: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeGridComponentsLGridLGrid) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeGridComponentsLGridLGrid
            val _cache = __ins.renderCache
            val props = __props
            val clsses = computed(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set("l-grid--wrap", props.wrap)
                cls.set("l-grid--inset", props.inset)
                cls.set("l-grid--bordered", props.border && props.gutter == 0)
                return cls
            }
            )
            val resizeRef = ref<UniElement?>(null)
            val width = ref<Number>(0)
            val children = ref(utsArrayOf<Number>())
            val resizeObserver = UniResizeObserver(fun(entries: UTSArray<UniResizeObserverEntry>){
                val rect = entries[0].target.getBoundingClientRect()
                width.value = rect.width
            }
            )
            val stopWatch = watch(fun(): UniElement? {
                return resizeRef.value
            }
            , fun(el: UniElement?){
                if (el == null) {
                    return
                }
                resizeObserver.observe(el)
            }
            )
            onUnmounted(fun(){
                stopWatch()
                resizeObserver.disconnect()
            }
            )
            provide("limeGrid", GridProvide(children = children, props = props, width = width))
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                    "l-grid",
                    unref(clsses)
                )), "ref_key" to "resizeRef", "ref" to resizeRef), utsArrayOf(
                    renderSlot(_ctx.`$slots`, "default")
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-grid" to padStyleMapOf(utsMapOf("position" to "relative", "overflow" to "visible", "flexDirection" to "row")), "l-grid--wrap" to padStyleMapOf(utsMapOf("flexWrap" to "wrap")), "l-grid--inset" to padStyleMapOf(utsMapOf("marginTop" to 0, "marginRight" to "32rpx", "marginBottom" to 0, "marginLeft" to "32rpx", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx", "overflow" to "hidden")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf("align" to utsMapOf("type" to "String", "required" to true, "default" to "center"), "border" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "column" to utsMapOf("type" to "Number", "required" to true, "default" to 4), "gutter" to utsMapOf("type" to "Number", "required" to true, "default" to 0), "hover" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "inset" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "gridWidth" to utsMapOf("type" to "String", "required" to false), "padding" to utsMapOf("type" to "String", "required" to false), "bgColor" to utsMapOf("type" to "String", "required" to false), "wrap" to utsMapOf("type" to "Boolean", "required" to true, "default" to true)))
        var propsNeedCastKeys = utsArrayOf(
            "align",
            "border",
            "column",
            "gutter",
            "hover",
            "inset",
            "wrap"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
