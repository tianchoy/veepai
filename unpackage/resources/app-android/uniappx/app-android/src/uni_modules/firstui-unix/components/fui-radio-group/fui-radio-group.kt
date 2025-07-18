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
open class GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroup : VueComponent {
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
        , fun(kVal: String) {
            this.modelChange(kVal)
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        val _component_radio_group = resolveComponent("radio-group")
        return _cV(_component_radio_group, _uM("name" to _ctx.name), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
            return _uA(
                renderSlot(_ctx.`$slots`, "default")
            )
        }
        ), "_" to 3), 8, _uA(
            "name"
        ))
    }
    open var name: String by `$props`
    open var modelValue: String by `$props`
    open var `val`: String by `$data`
    open var childrens: UTSArray<ComponentPublicInstance> by `$data`
    open var fuiForm: ComponentPublicInstance? by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("val" to "", "childrens" to _uA<ComponentPublicInstance>(), "fuiForm" to null as ComponentPublicInstance?)
    }
    open var radioChange = ::gen_radioChange_fn
    open fun gen_radioChange_fn(e: String) {
        this.`$emit`("change", e)
        this.`$emit`("update:modelValue", e)
    }
    open var changeValue = ::gen_changeValue_fn
    open fun gen_changeValue_fn(value: String, target: ComponentPublicInstance) {
        if (value == this.`val`) {
            return
        }
        this.`val` = value
        this.childrens.forEach(fun(item: ComponentPublicInstance){
            if (item !== target) {
                item.`$data`["val"] = false
            }
        }
        )
        this.radioChange(value)
    }
    open var modelChange = ::gen_modelChange_fn
    open fun gen_modelChange_fn(kVal: String) {
        this.childrens.forEach(fun(item: ComponentPublicInstance){
            if (item.`$props`["value"] == kVal) {
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
        this.`val` = ""
        this.modelChange("")
        this.radioChange("")
    }
    open var getSubmitValue = ::gen_getSubmitValue_fn
    open fun gen_getSubmitValue_fn(): String {
        return if (this.`val` == "") {
            this.modelValue
        } else {
            this.`val`
        }
    }
    companion object {
        var name = "fui-radio-group"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null, "update:modelValue" to null)
        var props = _nP(_uM("name" to _uM("type" to "String", "default" to ""), "modelValue" to _uM("type" to "String", "default" to "")))
        var propsNeedCastKeys = _uA(
            "name",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
