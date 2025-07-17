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
open class GenUniModulesLimeCheckboxComponentsLCheckboxLCheckbox : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var checked: Boolean? by `$props`
    open var modelValue: Boolean? by `$props`
    open var defaultChecked: Boolean by `$props`
    open var label: String? by `$props`
    open var indeterminate: Boolean by `$props`
    open var disabled: Boolean by `$props`
    open var readonly: Boolean by `$props`
    open var size: String by `$props`
    open var name: Any? by `$props`
    open var checkAll: Boolean by `$props`
    open var value: Any? by `$props`
    open var icon: String by `$props`
    open var fontSize: String? by `$props`
    open var iconSize: String? by `$props`
    open var checkedColor: String? by `$props`
    open var iconBgColor: String? by `$props`
    open var iconBorderColor: String? by `$props`
    open var iconDisabledColor: String? by `$props`
    open var iconDisabledBgColor: String? by `$props`
    open var labelStyle: Any? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeCheckboxComponentsLCheckboxLCheckbox) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeCheckboxComponentsLCheckboxLCheckbox
            val _cache = __ins.renderCache
            val name = "l-checkbox"
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val instance = getCurrentInstance()!!
            val formDisabled = inject<Ref<Boolean?>?>("formDisabled", null)
            val formReadonly = inject<Ref<Boolean?>?>("formReadonly", null)
            val checkboxGroup = inject<LCheckboxGroupComponentPublicInstance?>("limeCheckboxGroup", null)
            val checkboxGroupValue = inject<ComputedRef1<UTSArray<Any>>?>("limeCheckboxGroupValue", null)
            val checkboxGroupStatus = inject<ComputedRef1<CheckboxStatus>?>("limeCheckboxGroupStatus", null)
            val checkboxGroupCheckedSet = inject<ComputedRef1<Set<Any>>?>("limeCheckboxGroupCheckedSet", null)
            val manageChildInList = inject<ManageChildInList1?>("limeCheckboxGroupManageChildInList", null)
            val onCheckedChange = inject<OnCheckedChange?>("limeCheckboxGroupOnCheckedChange", null)
            if (manageChildInList != null) {
                manageChildInList(instance.proxy as LCheckboxComponentPublicInstance, true)
            }
            val max = computed(fun(): Number {
                return checkboxGroup?.max ?: -1
            }
            )
            val _innerChecked = ref(props.defaultChecked)
            val innerChecked = computed(WritableComputedOptions(set = fun(value: Boolean) {
                _innerChecked.value = value
                emit("update:modelValue", value)
                emit("change", value)
            }
            , get = fun(): Boolean {
                val value = (props.checked ?: props.modelValue)
                if (value != null) {
                    return value
                }
                return _innerChecked.value
            }
            ))
            val isChecked = computed(fun(): Boolean {
                if (props.checkAll) {
                    val checkAllStatus = checkboxGroupStatus?.value ?: "uncheck"
                    return checkAllStatus == "checked" || checkAllStatus == "indeterminate"
                }
                val value = props.value ?: props.name
                if (checkboxGroupCheckedSet != null && value != null) {
                    return checkboxGroupCheckedSet.value.has(value)
                }
                return innerChecked.value
            }
            )
            val isDisabled = computed(fun(): Boolean {
                if (max.value > -1 && checkboxGroupValue != null) {
                    return max.value <= checkboxGroupValue.value.length && !isChecked.value
                }
                if (props.disabled) {
                    return props.disabled
                }
                return formDisabled?.value ?: checkboxGroup?.disabled ?: false
            }
            )
            val isReadonly = computed(fun(): Boolean {
                if (props.readonly) {
                    return props.readonly
                }
                return formReadonly?.value ?: checkboxGroup?.readonly ?: false
            }
            )
            val isIndeterminate = computed(fun(): Boolean {
                if (props.checkAll && checkboxGroupStatus != null) {
                    return checkboxGroupStatus.value == "indeterminate"
                }
                return props.indeterminate
            }
            )
            val innerIcon = computed(fun(): String {
                return checkboxGroup?.icon ?: props.icon
            }
            )
            val innerSize = computed(fun(): String {
                return checkboxGroup?.size ?: props.size
            }
            )
            val innerIconSize = computed(fun(): String? {
                return checkboxGroup?.iconSize ?: props.iconSize
            }
            )
            val innerFontSize = computed(fun(): String? {
                return checkboxGroup?.fontSize ?: props.fontSize
            }
            )
            val innerCheckedColor = computed(fun(): String? {
                return checkboxGroup?.checkedColor ?: props.checkedColor
            }
            )
            val innerIconBgColor = computed(fun(): String {
                return props.iconBgColor ?: checkboxGroup?.iconBgColor ?: "white"
            }
            )
            val innerIconBorderColor = computed(fun(): String {
                return props.iconBorderColor ?: checkboxGroup?.iconBorderColor ?: "#c5c5c5"
            }
            )
            val innerIconDisabledColor = computed(fun(): String {
                return props.iconDisabledColor ?: checkboxGroup?.iconDisabledColor ?: "#c5c5c5"
            }
            )
            val innerIconDisabledBgColor = computed(fun(): String {
                return props.iconDisabledBgColor ?: checkboxGroup?.iconDisabledBgColor ?: "#f3f3f3"
            }
            )
            val rootCasses = computed(fun(): Map<String, Boolean> {
                val cls = Map<String, Boolean>()
                cls.set("" + name + "--" + props.size, true)
                cls.set("" + name + "--disabled", isDisabled.value)
                return cls
            }
            )
            val iconClasses = computed(fun(): Map<String, Boolean> {
                val cls = Map<String, Boolean>()
                cls.set("" + name + "__icon--disabled", isDisabled.value)
                cls.set("" + name + "__icon--" + props.icon, true)
                cls.set("" + name + "__icon--checked", isChecked.value && innerCheckedColor.value == null)
                cls.set("" + name + "__icon--indeterminate", isIndeterminate.value && innerCheckedColor.value == null)
                return cls
            }
            )
            val labelClass = computed(fun(): Map<String, Boolean> {
                val cls = Map<String, Boolean>()
                cls.set("" + name + "__label--disabled", isDisabled.value)
                return cls
            }
            )
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (checkboxGroup != null && checkboxGroup.gap != null) {
                    style.set(if (checkboxGroup.direction == "horizontal") {
                        "margin-right"
                    } else {
                        "margin-bottom"
                    }
                    , checkboxGroup.gap!!)
                }
                return style
            }
            )
            val iconStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (innerIconSize.value != null) {
                    style.set("width", innerIconSize.value!!)
                    style.set("height", innerIconSize.value!!)
                }
                if (innerCheckedColor.value != null) {
                    if (!isDisabled.value && !isChecked.value && _uA(
                        "dot",
                        "circle",
                        "rectangle"
                    ).includes(innerIcon.value)) {
                        style.set("background", innerIconBgColor.value)
                        style.set("border-color", innerIconBorderColor.value)
                    }
                    if (isDisabled.value && _uA(
                        "dot",
                        "circle",
                        "rectangle"
                    ).includes(innerIcon.value)) {
                        style.set("background", innerIconDisabledBgColor.value)
                        style.set("border-color", innerIconDisabledColor.value)
                    }
                    if (isChecked.value && _uA(
                        "dot",
                        "circle",
                        "rectangle"
                    ).includes(innerIcon.value)) {
                        style.set("background", innerCheckedColor.value!!)
                        style.set("border-color", innerCheckedColor.value!!)
                    }
                }
                return style
            }
            )
            val labelStyles = computed(fun(): Any {
                if (UTSAndroid.`typeof`(props.labelStyle) == "string") {
                    return "" + props.labelStyle + ";" + (if (innerIconSize.value != null) {
                        "font-size: " + innerIconSize.value!!
                    } else {
                        ""
                    }
                    )
                }
                if (UTSAndroid.`typeof`(props.labelStyle) == "object") {
                    return UTSJSONObject.assign(UTSJSONObject(), (props.labelStyle ?: UTSJSONObject()) as UTSJSONObject, if (innerFontSize.value != null) {
                        object : UTSJSONObject() {
                            var `font-size` = innerFontSize.value
                        }
                    } else {
                        UTSJSONObject()
                    }
                    )
                }
                return UTSJSONObject()
            }
            )
            val handleChange = fun(e: UniPointerEvent){
                if (isDisabled.value || isReadonly.value) {
                    return
                }
                val value = !isChecked.value
                innerChecked.value = value
                if (onCheckedChange != null) {
                    onCheckedChange(CheckboxChangeOptions(checked = value, checkAll = props.checkAll, value = props.value ?: props.name))
                }
            }
            val iconRef = ref<UniElement?>(null)
            val update = fun(){
                if (iconRef.value == null) {
                    return
                }
                val ctx = iconRef.value!!.getDrawableContext()!!
                val rect = iconRef.value!!.getBoundingClientRect()
                val x = rect.width / 2
                val y = rect.height / 2
                ctx.reset()
                val drawIndeterminate = fun(){
                    ctx.strokeStyle = if (isDisabled.value) {
                        innerIconDisabledColor.value
                    } else {
                        if (innerIcon.value == "line") {
                            props.checkedColor ?: "#3283ff"
                        } else {
                            "white"
                        }
                    }
                    ctx.lineWidth = if (innerIcon.value == "line") {
                        rect.width * 0.16
                    } else {
                        rect.width * 0.12
                    }
                    val width = if (innerIcon.value == "line") {
                        rect.width * 0.8
                    } else {
                        rect.width * 0.5
                    }
                    ctx.beginPath()
                    ctx.moveTo((rect.width - width) / 2, rect.height * 0.5)
                    ctx.lineTo((rect.width - width) / 2 + width, rect.height * 0.5)
                    ctx.stroke()
                }
                val drawCheckedIcon = fun(){
                    if (isDisabled.value) {
                        ctx.strokeStyle = innerIconDisabledColor.value
                        ctx.fillStyle = innerIconDisabledColor.value
                    } else if (innerIcon.value == "line") {
                        ctx.strokeStyle = props.checkedColor ?: "#3283ff"
                    } else {
                        ctx.strokeStyle = "white"
                        ctx.fillStyle = "white"
                    }
                    ctx.lineWidth = if (innerIcon.value == "line") {
                        rect.width * 0.16
                    } else {
                        rect.width * 0.12
                    }
                    ctx.lineCap = "round"
                    if (innerIcon.value == "circle" || innerIcon.value == "rectangle") {
                        ctx.beginPath()
                        ctx.moveTo(rect.width * 0.2967, rect.height * 0.53)
                        ctx.lineTo(rect.width * 0.4342, rect.height * 0.6675)
                        ctx.lineTo(rect.width * 0.7092, rect.height * 0.3925)
                        ctx.stroke()
                    } else if (innerIcon.value == "line") {
                        ctx.beginPath()
                        ctx.moveTo(rect.width * 0.10, rect.height * 0.5466)
                        ctx.lineTo(rect.width * 0.3666, rect.height * 0.8134)
                        ctx.lineTo(rect.width * 0.90, rect.height * 0.28)
                        ctx.stroke()
                    } else if (innerIcon.value == "dot") {
                        ctx.beginPath()
                        ctx.arc(x, y, rect.width * 0.22, 0, Math.PI * 2)
                        ctx.fill()
                    }
                }
                if (isIndeterminate.value) {
                    drawIndeterminate()
                } else if (isChecked.value) {
                    drawCheckedIcon()
                }
                ctx.update()
            }
            val resizeObserver = UniResizeObserver(fun(entries: UTSArray<UniResizeObserverEntry>){
                update()
            }
            )
            val stopWatch = watch(fun(): UniElement? {
                return iconRef.value
            }
            , fun(el: UniElement?){
                if (el == null) {
                    return
                }
                resizeObserver.observe(el)
            }
            )
            watchEffect(update)
            onUnmounted(fun(){
                stopWatch()
                resizeObserver.disconnect()
            }
            )
            onBeforeUnmount(fun(){
                if (manageChildInList != null) {
                    manageChildInList(instance.proxy as LCheckboxComponentPublicInstance, false)
                }
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "l-checkbox",
                    _uA(
                        unref(rootCasses)
                    )
                )), "style" to _nS(_uA(
                    unref(styles)
                )), "onClick" to handleChange), _uA(
                    renderSlot(_ctx.`$slots`, "checkbox", GenUniModulesLimeCheckboxComponentsLCheckboxLCheckboxSlotDataCheckbox(checked = unref(isChecked), disabled = unref(isDisabled)), fun(): UTSArray<Any> {
                        return _uA(
                            renderSlot(_ctx.`$slots`, "icon", GenUniModulesLimeCheckboxComponentsLCheckboxLCheckboxSlotDataIcon(checked = unref(isChecked), disabled = unref(isDisabled)), fun(): UTSArray<Any> {
                                return _uA(
                                    _cE("view", _uM("class" to _nC(_uA(
                                        "l-checkbox__icon",
                                        unref(iconClasses)
                                    )), "ref_key" to "iconRef", "ref" to iconRef, "style" to _nS(_uA(
                                        unref(iconStyle)
                                    ))), null, 6)
                                )
                            }
                            ),
                            if (isTrue(_ctx.label != null || _ctx.`$slots`["default"] != null)) {
                                _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                    "l-checkbox__label",
                                    unref(labelClass)
                                )), "style" to _nS(_uA(
                                    unref(labelStyles)
                                ))), _uA(
                                    renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                                        return _uA(
                                            _tD(_ctx.label)
                                        )
                                    })
                                ), 6)
                            } else {
                                _cC("v-if", true)
                            }
                        )
                    }
                    )
                ), 6)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-checkbox" to _pS(_uM("flexDirection" to "row", "alignItems" to "center")), "l-checkbox__icon" to _pS(_uM("position" to "relative", "boxSizing" to "border-box", "width" to "40rpx", "height" to "40rpx", "alignSelf" to "center", "transitionProperty" to "all", "transitionDuration" to "200ms", "transitionTimingFunction" to "cubic-bezier(0.78,0.14,0.15,0.86)")), "l-checkbox__icon--rectangle" to _uM("" to _uM("borderTopLeftRadius" to "6rpx", "borderTopRightRadius" to "6rpx", "borderBottomRightRadius" to "6rpx", "borderBottomLeftRadius" to "6rpx", "backgroundColor" to "#FFFFFF", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-checkbox__icon--checked" to _uM("backgroundColor" to "#3283ff", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-checkbox__icon--indeterminate" to _uM("backgroundColor" to "#3283ff", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-checkbox__icon--disabled" to _uM("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5", "backgroundColor" to "#f3f3f3")), "l-checkbox__icon--dot" to _uM("" to _uM("borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99, "backgroundColor" to "#FFFFFF", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-checkbox__icon--checked" to _uM("backgroundColor" to "#3283ff"), ".l-checkbox__icon--indeterminate" to _uM("backgroundColor" to "#3283ff"), ".l-checkbox__icon--disabled" to _uM("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5", "backgroundColor" to "#f3f3f3")), "l-checkbox__icon--circle" to _uM("" to _uM("borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99, "backgroundColor" to "#FFFFFF", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-checkbox__icon--checked" to _uM("backgroundColor" to "#3283ff", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-checkbox__icon--indeterminate" to _uM("backgroundColor" to "#3283ff", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-checkbox__icon--disabled" to _uM("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5", "backgroundColor" to "#f3f3f3")), "l-checkbox__label" to _pS(_uM("paddingLeft" to "16rpx", "fontSize" to "32rpx", "color" to "rgba(0,0,0,0.88)")), "l-checkbox__label--disabled" to _pS(_uM("color" to "#c5c5c5")), "@TRANSITION" to _uM("l-checkbox__icon" to _uM("property" to "all", "duration" to "200ms", "timingFunction" to "cubic-bezier(0.78,0.14,0.15,0.86)")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("update:modelValue" to null, "change" to null)
        var props = _nP(_uM("checked" to _uM("type" to _uA(
            "Boolean"
        ), "default" to null), "modelValue" to _uM("type" to _uA(
            "Boolean"
        ), "default" to null), "defaultChecked" to _uM("type" to "Boolean", "required" to true, "default" to false), "label" to _uM("type" to "String", "required" to false), "indeterminate" to _uM("type" to "Boolean", "required" to true, "default" to false), "disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "readonly" to _uM("type" to "Boolean", "required" to true, "default" to false), "size" to _uM("type" to "String", "required" to true, "default" to "medium"), "name" to _uM("required" to false), "checkAll" to _uM("type" to "Boolean", "required" to true, "default" to false), "value" to _uM("required" to false), "icon" to _uM("type" to "String", "required" to true, "default" to "rectangle"), "fontSize" to _uM("type" to "String", "required" to false), "iconSize" to _uM("type" to "String", "required" to false), "checkedColor" to _uM("type" to "String", "required" to false), "iconBgColor" to _uM("type" to "String", "required" to false), "iconBorderColor" to _uM("type" to "String", "required" to false), "iconDisabledColor" to _uM("type" to "String", "required" to false), "iconDisabledBgColor" to _uM("type" to "String", "required" to false), "labelStyle" to _uM("type" to _uA(
            "String",
            "UTSJSONObject"
        ), "required" to false)))
        var propsNeedCastKeys = _uA(
            "checked",
            "modelValue",
            "defaultChecked",
            "indeterminate",
            "disabled",
            "readonly",
            "size",
            "checkAll",
            "icon"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
