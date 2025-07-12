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
open class GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabel : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "fui-label__wrap",
            _uM("fui-label__full" to _ctx.full)
        )), "style" to _nS(_uM("padding" to _ctx.padding, "margin" to _ctx.margin)), "onClick" to withModifiers(_ctx.onclick, _uA(
            "stop"
        ))), _uA(
            renderSlot(_ctx.`$slots`, "default")
        ), 14, _uA(
            "onClick"
        ))
    }
    open var padding: String by `$props`
    open var margin: String by `$props`
    open var full: Boolean by `$props`
    open var childrens: UTSArray<ComponentPublicInstance> by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("childrens" to _uA<ComponentPublicInstance>())
    }
    open var onclick = ::gen_onclick_fn
    open fun gen_onclick_fn() {
        if (this.childrens.length > 0) {
            this.childrens.forEach(fun(item: ComponentPublicInstance){
                item.`$callMethod`("labelClick")
            }
            )
        }
    }
    companion object {
        var name = "fui-label"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-label__wrap" to _pS(_uM("boxSizing" to "border-box")), "fui-label__full" to _pS(_uM("width" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("padding" to _uM("type" to "String", "default" to ""), "margin" to _uM("type" to "String", "default" to ""), "full" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "padding",
            "margin",
            "full"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
