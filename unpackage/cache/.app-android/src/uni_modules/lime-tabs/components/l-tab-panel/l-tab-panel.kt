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
open class GenUniModulesLimeTabsComponentsLTabPanelLTabPanel : VueComponent, TabPanelProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var badge: Any? by `$props`
    override var offset: UTSArray<Any>? by `$props`
    override var dot: Boolean? by `$props`
    override var destroyOnHide: Boolean? by `$props`
    override var disabled: Boolean? by `$props`
    override var label: String? by `$props`
    override var lazy: Boolean? by `$props`
    override var value: Number? by `$props`
    open var innderOffset: UTSArray<Any>
        get() {
            return unref(this.`$exposed`["innderOffset"]) as UTSArray<Any>
        }
        set(value) {
            setRefValue(this.`$exposed`, "innderOffset", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeTabsComponentsLTabPanelLTabPanel, _arg1: SetupContext) -> Any? = fun(__props, ref1): Any? {
            var __expose = ref1.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeTabsComponentsLTabPanelLTabPanel
            val _cache = __ins.renderCache
            val props = __props
            val children = inject<UTSArray<LTabPanelComponentPublicInstance>?>("LimeTabs", null) as Ref<UTSArray<LTabPanelComponentPublicInstance>>?
            val instance = getCurrentInstance()!!.proxy!!
            onMounted(fun(){
                if (children == null) {
                    return
                }
                children.value.push(instance as LTabPanelComponentPublicInstance)
            }
            )
            val innderOffset = ref(utsArrayOf<Any>())
            watch(fun(): UTSArray<Any>? {
                return props.offset
            }
            , fun(n: UTSArray<Any>?){
                if (innderOffset.value.join("") == n?.join("")) {
                    return
                }
                innderOffset.value = n ?: utsArrayOf()
            }
            , WatchOptions(immediate = true))
            __expose(utsMapOf("innderOffset" to innderOffset))
            onUnmounted(fun(){
                if (children == null) {
                    return
                }
                children.value = children.value.filter(fun(it): Boolean {
                    return it != instance
                }
                )
            }
            )
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to "l-tab__panel", "aria-role" to "tabpanel"), utsArrayOf(
                    renderSlot(_ctx.`$slots`, "default")
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-tab__panel" to padStyleMapOf(utsMapOf("width" to "100%", "flex" to 1, "flexShrink" to 0, "boxSizing" to "border-box")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf("badge" to utsMapOf("required" to false), "offset" to utsMapOf("type" to "Array", "required" to false), "dot" to utsMapOf("type" to "Boolean", "required" to false), "destroyOnHide" to utsMapOf("type" to "Boolean", "required" to false), "disabled" to utsMapOf("type" to "Boolean", "required" to false), "label" to utsMapOf("type" to "String", "required" to false), "lazy" to utsMapOf("type" to "Boolean", "required" to false), "value" to utsMapOf("type" to "Number", "required" to false)))
        var propsNeedCastKeys = utsArrayOf(
            "dot",
            "destroyOnHide",
            "disabled",
            "lazy"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
