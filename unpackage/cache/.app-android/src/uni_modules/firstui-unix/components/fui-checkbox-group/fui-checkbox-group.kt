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
open class GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroup : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onCreated(fun() {
            val isForm = this.getParent("fui-form")
            if (isForm) {
                val form = this.fuiForm as ComponentPublicInstance
                (form.`$data`["formChildren"] as UTSArray<ComponentPublicInstance>).push(this as ComponentPublicInstance)
            }
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.modelValue
        }
        , fun(vals: UTSArray<String>) {
            this.modelChange(vals)
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_checkbox_group = resolveComponent("checkbox-group")
        return createVNode(_component_checkbox_group, utsMapOf("name" to _ctx.name), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
            return utsArrayOf(
                renderSlot(_ctx.`$slots`, "default")
            )
        }
        ), "_" to 3), 8, utsArrayOf(
            "name"
        ))
    }
    open var name: String by `$props`
    open var modelValue: UTSArray<String> by `$props`
    open var vals: UTSArray<String> by `$data`
    open var childrens: UTSArray<ComponentPublicInstance> by `$data`
    open var fuiForm: ComponentPublicInstance? by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("vals" to utsArrayOf<String>(), "childrens" to utsArrayOf<ComponentPublicInstance>(), "fuiForm" to null as ComponentPublicInstance?)
    }
    open var checkboxChange = ::gen_checkboxChange_fn
    open fun gen_checkboxChange_fn(e: UTSArray<String>) {
        this.`$emit`("change", e)
        this.`$emit`("update:modelValue", e)
    }
    open var changeValue = ::gen_changeValue_fn
    open fun gen_changeValue_fn() {
        val vals = utsArrayOf<String>()
        this.childrens.forEach(fun(item: ComponentPublicInstance){
            val isChk = item.`$data`["val"] as Boolean
            if (isChk) {
                vals.push(item.`$props`["value"] as String)
            }
        }
        )
        this.vals = vals
        this.checkboxChange(vals)
    }
    open var modelChange = ::gen_modelChange_fn
    open fun gen_modelChange_fn(vals: UTSArray<String>) {
        this.vals = vals
        this.childrens.forEach(fun(item: ComponentPublicInstance){
            val value = item.`$props`["value"] as String
            if (vals.includes(value)) {
                item.`$data`["val"] = true
            } else {
                item.`$data`["val"] = false
            }
        }
        )
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
    open var reset = ::gen_reset_fn
    open fun gen_reset_fn() {
        this.childrens.forEach(fun(item: ComponentPublicInstance){
            item.`$data`["val"] = false
        }
        )
        this.vals = utsArrayOf<String>()
        this.checkboxChange(this.vals)
    }
    open var getSubmitValue = ::gen_getSubmitValue_fn
    open fun gen_getSubmitValue_fn(): UTSArray<String> {
        return this.vals
    }
    companion object {
        var name = "fui-checkbox-group"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("change" to null, "update:modelValue" to null)
        var props = normalizePropsOptions(utsMapOf("name" to utsMapOf("type" to "String", "default" to ""), "modelValue" to utsMapOf("type" to "Array", "default" to fun(): UTSArray<String> {
            return utsArrayOf<String>()
        }
        )))
        var propsNeedCastKeys = utsArrayOf(
            "name",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
