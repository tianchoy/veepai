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
open class GenUniModulesLimeCheckboxComponentsLCheckboxGroupLCheckboxGroup : VueComponent, CheckboxGroupProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var disabled: Boolean by `$props`
    override var readonly: Boolean by `$props`
    override var max: Number? by `$props`
    override var name: Any? by `$props`
    override var value: UTSArray<Any>? by `$props`
    override var modelValue: UTSArray<Any>? by `$props`
    override var defaultValue: UTSArray<Any>? by `$props`
    override var size: String by `$props`
    override var direction: String by `$props`
    override var gap: String? by `$props`
    override var icon: String by `$props`
    override var fontSize: String? by `$props`
    override var iconSize: String? by `$props`
    override var checkedColor: String? by `$props`
    override var iconBgColor: String? by `$props`
    override var iconBorderColor: String? by `$props`
    override var iconDisabledColor: String? by `$props`
    override var iconDisabledBgColor: String? by `$props`
    open var toggleAll: (checked: Boolean) -> Unit
        get() {
            return unref(this.`$exposed`["toggleAll"]) as (checked: Boolean) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "toggleAll", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeCheckboxComponentsLCheckboxGroupLCheckboxGroup, _arg1: SetupContext) -> Any? = fun(__props, ref1): Any? {
            var __expose = ref1.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeCheckboxComponentsLCheckboxGroupLCheckboxGroup
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val _innerValue = ref(props.defaultValue ?: _uA())
            val innerValue = computed(WritableComputedOptions(set = fun(value: UTSArray<Any>) {
                _innerValue.value = value
                emit("change", value)
                emit("update:value", value)
                emit("update:modelValue", value)
            }
            , get = fun(): UTSArray<Any> {
                return props.value ?: props.modelValue ?: _innerValue.value
            }
            ))
            val checkedSet = computed(fun(): Set<Any> {
                val set = Set<Any>()
                if (UTSArray.isArray(innerValue.value)) {
                    innerValue.value.forEach(fun(item){
                        set.add(item)
                    }
                    )
                }
                return set
            }
            )
            val children = reactive(_uA<LCheckboxComponentPublicInstance>())
            val checkAllStatus = setCheckAllStatus(children, innerValue, checkedSet)
            val maxExceeded = computed(fun(): Boolean {
                return props.max != null && innerValue.value.length == props.max
            }
            )
            val manageChildInList = fun(child: LCheckboxComponentPublicInstance, shouldAdd: Boolean){
                val index = children.indexOf(child)
                if (shouldAdd) {
                    if (index != -1) {
                        return
                    }
                    children.push(child)
                } else {
                    if (index == -1) {
                        return
                    }
                    children.splice(index, 1)
                }
            }
            val handleCheckboxChange = fun(item: CheckboxChangeOptions){
                val currentValue = item.value
                if (UTSArray.isArray(innerValue.value)) {
                    if (currentValue == null) {
                        return
                    }
                    val kVal = innerValue.value.slice()
                    if (item.checked) {
                        kVal.push(currentValue)
                    } else {
                        val i = kVal.indexOf(currentValue)
                        kVal.splice(i, 1)
                    }
                    innerValue.value = kVal
                } else {
                    console.warn("CheckboxGroup Warn: `value` must be an array, instead of " + UTSAndroid.`typeof`(innerValue.value), " at uni_modules/lime-checkbox/components/l-checkbox-group/l-checkbox-group.uvue:105")
                }
            }
            val getAllCheckboxValue = fun(): UTSArray<Any> {
                val arr: UTSArray<Any> = _uA()
                run {
                    var i: Number = 0
                    var len = children.length
                    while(i < len){
                        val item = children[i]
                        val value = item.value ?: item.name
                        if (item.checkAll) {
                            i++
                            continue
                        }
                        if (value == null) {
                            i++
                            continue
                        }
                        if (arr.includes(value)) {
                            i++
                            continue
                        }
                        arr.push(value)
                        if (maxExceeded.value) {
                            break
                        }
                        i++
                    }
                }
                return arr
            }
            val toggleAllCheckboxValues = fun(): UTSArray<Any> {
                val arr: UTSArray<Any> = _uA()
                run {
                    var i: Number = 0
                    var len = children.length
                    while(i < len){
                        val item = children[i]
                        val value = item.value ?: item.name
                        if (item.checkAll) {
                            i++
                            continue
                        }
                        if (value == null) {
                            i++
                            continue
                        }
                        if (!checkedSet.value.has(value)) {
                            arr.push(value)
                        }
                        if (maxExceeded.value) {
                            break
                        }
                        i++
                    }
                }
                return arr
            }
            val onCheckAllChange = fun(checked: Boolean){
                val value = if (checked) {
                    getAllCheckboxValue()
                } else {
                    _uA()
                }
                innerValue.value = value
            }
            val onCheckedChange = fun(item: CheckboxChangeOptions){
                if (item.checkAll) {
                    onCheckAllChange(item.checked)
                } else {
                    handleCheckboxChange(item)
                }
            }
            val toggleAll = fun(checked: Boolean){
                val value = if (checked) {
                    getAllCheckboxValue()
                } else {
                    toggleAllCheckboxValues()
                }
                innerValue.value = value
            }
            __expose(_uM("toggleAll" to toggleAll))
            provide("limeCheckboxGroup", props)
            provide("limeCheckboxGroupValue", innerValue)
            provide("limeCheckboxGroupStatus", checkAllStatus)
            provide("limeCheckboxGroupCheckedSet", checkedSet)
            provide("limeCheckboxGroupManageChildInList", manageChildInList)
            provide("limeCheckboxGroupOnCheckedChange", onCheckedChange)
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "l-checkbox-group",
                    "l-checkbox-group--" + _ctx.direction
                ))), _uA(
                    renderSlot(_ctx.`$slots`, "default")
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-checkbox-group" to _pS(_uM("flexDirection" to "row")), "l-checkbox-group--vertical" to _pS(_uM("flexDirection" to "column")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:value" to null, "update:modelValue" to null, "change" to null)
        var props = _nP(_uM("disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "readonly" to _uM("type" to "Boolean", "required" to true, "default" to false), "max" to _uM("type" to "Number", "required" to false), "name" to _uM("required" to false), "value" to _uM("type" to "Array", "required" to false), "modelValue" to _uM("type" to "Array", "required" to false), "defaultValue" to _uM("type" to "Array", "required" to false), "size" to _uM("type" to "String", "required" to true, "default" to "medium"), "direction" to _uM("type" to "String", "required" to true, "default" to "horizontal"), "gap" to _uM("type" to "String", "required" to false), "icon" to _uM("type" to "String", "required" to true, "default" to "rectangle"), "fontSize" to _uM("type" to "String", "required" to false), "iconSize" to _uM("type" to "String", "required" to false), "checkedColor" to _uM("type" to "String", "required" to false), "iconBgColor" to _uM("type" to "String", "required" to false), "iconBorderColor" to _uM("type" to "String", "required" to false), "iconDisabledColor" to _uM("type" to "String", "required" to false), "iconDisabledBgColor" to _uM("type" to "String", "required" to false)))
        var propsNeedCastKeys = _uA(
            "disabled",
            "readonly",
            "size",
            "direction",
            "icon"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
