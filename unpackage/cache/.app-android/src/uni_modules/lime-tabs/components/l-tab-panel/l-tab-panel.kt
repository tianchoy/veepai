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
            val innderOffset = ref(_uA<Any>())
            watch(fun(): UTSArray<Any>? {
                return props.offset
            }
            , fun(n: UTSArray<Any>?){
                if (innderOffset.value.join("") == n?.join("")) {
                    return
                }
                innderOffset.value = n ?: _uA()
            }
            , WatchOptions(immediate = true))
            __expose(_uM("innderOffset" to innderOffset))
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
                return _cE("view", _uM("class" to "l-tab__panel", "aria-role" to "tabpanel"), _uA(
                    renderSlot(_ctx.`$slots`, "default")
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-tab__panel" to _pS(_uM("width" to "100%", "flex" to 1, "flexShrink" to 0, "boxSizing" to "border-box")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("badge" to _uM("required" to false), "offset" to _uM("type" to "Array", "required" to false), "dot" to _uM("type" to "Boolean", "required" to false), "destroyOnHide" to _uM("type" to "Boolean", "required" to false), "disabled" to _uM("type" to "Boolean", "required" to false), "label" to _uM("type" to "String", "required" to false), "lazy" to _uM("type" to "Boolean", "required" to false), "value" to _uM("type" to "Number", "required" to false)))
        var propsNeedCastKeys = _uA(
            "dot",
            "destroyOnHide",
            "disabled",
            "lazy"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
