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
open class GenUniModulesLimePickerComponentsLPickerLPicker : VueComponent, PickerProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var cancelBtn: String? by `$props`
    override var cancelStyle: Any? by `$props`
    override var confirmBtn: String? by `$props`
    override var confirmStyle: Any? by `$props`
    override var title: String? by `$props`
    override var titleStyle: Any? by `$props`
    override var keys: UTSJSONObject? by `$props`
    override var columns: UTSArray<PickerColumn> by `$props`
    override var modelValue: UTSArray<PickerValue>? by `$props`
    override var defaultValue: UTSArray<PickerValue>? by `$props`
    override var value: UTSArray<PickerValue>? by `$props`
    override var loading: Boolean by `$props`
    override var loadingColor: String? by `$props`
    override var loadingMaskColor: String? by `$props`
    override var loadingSize: String by `$props`
    override var itemHeight: String? by `$props`
    override var itemColor: String? by `$props`
    override var itemFontSize: String? by `$props`
    override var itemActiveColor: String? by `$props`
    override var itemActiveFontWeight: Number? by `$props`
    override var indicatorStyle: String? by `$props`
    override var bgColor: String? by `$props`
    override var groupHeight: String? by `$props`
    override var radius: String? by `$props`
    override var resetIndex: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimePickerComponentsLPickerLPicker) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimePickerComponentsLPickerLPicker
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val pickerItemInstanceArray = reactive(utsArrayOf<LPickerItemComponentPublicInstance>())
            val ohosShow = ref(0)
            val modelValue = ref<UTSArray<PickerValue>>(props.value ?: props.modelValue ?: props.defaultValue ?: utsArrayOf())
            val pickerValue = computed(WritableComputedOptions(set = fun(value: UTSArray<PickerValue>) {
                if (value.join("") == modelValue.value.join("")) {
                    return
                }
                modelValue.value = value
                emit("update:modelValue", value)
                emit("change", value)
            }
            , get = fun(): UTSArray<PickerValue> {
                return props.value ?: props.modelValue ?: modelValue.value
            }
            ))
            val isEmpty = computed(fun(): Boolean {
                return props.columns.length == 0 && pickerItemInstanceArray.every(fun(child): Boolean {
                    return child.options.length == 0
                }
                )
            }
            )
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.bgColor != null) {
                    style.set("background", props.bgColor!!)
                }
                if (props.radius != null) {
                    style.set("border-top-left-radius", props.radius!!)
                    style.set("border-top-right-radius", props.radius!!)
                }
                return style
            }
            )
            val curIndexArray = ref(utsArrayOf<Number>())
            val curValueArray = ref(pickerValue.value.slice())
            val curItemArray: UTSArray<PickerColumnItem> = utsArrayOf()
            val realColumns = computed(fun(): UTSArray<PickerColumn> {
                val pickerColumns = pickerItemInstanceArray.map(fun(child): PickerColumn {
                    return child.options
                }
                )
                if (pickerColumns.length > 0) {
                    return pickerColumns
                }
                return props.columns
            }
            )
            val manageChildInList = fun(child: LPickerItemComponentPublicInstance, shouldAdd: Boolean){
                val index = pickerItemInstanceArray.indexOf(child)
                if (shouldAdd) {
                    if (index != -1) {
                        return
                    }
                    pickerItemInstanceArray.push(child)
                } else {
                    if (index == -1) {
                        return
                    }
                    pickerItemInstanceArray.splice(index, 1)
                }
            }
            val updateItems = fun(item: PickerColumnItem, index: Number, column: Number){
                pushAt(curIndexArray.value, column, index)
                pushAt(curValueArray.value, column, item.value)
                pushAt(curItemArray, column, item)
            }
            val updatePickerItems = fun(){
                val _indexs: UTSArray<Number> = utsArrayOf()
                val _values: UTSArray<Any> = utsArrayOf()
                pickerItemInstanceArray.forEach(fun(child, column){
                    if (child.options.length == 0) {
                        return
                    }
                    val value = if (curValueArray.value.length > column) {
                        curValueArray.value[column]
                    } else {
                        null
                    }
                    val index: Number = if (value == null) {
                        0
                    } else {
                        child.`$callMethod`("getIndexByValue", value)
                    }
                     as Number
                    child.`$callMethod`("setIndex", index)
                    val item = child.options[index]
                    _indexs.push(index)
                    _values.push(item.value)
                    pushAt(curItemArray, column, item)
                }
                )
                if (curIndexArray.value.join("") == _indexs.join("")) {
                    return
                }
                curIndexArray.value = _indexs
                curValueArray.value = _values
                pickerValue.value = curValueArray.value.slice()
            }
            val onPick = fun(item: PickerColumnItem, index: Number, column: Number){
                if (curIndexArray.value[column] == index) {
                    return
                }
                pushAt(curIndexArray.value, column, index)
                pushAt(curValueArray.value, column, item.value)
                pushAt(curItemArray, column, item)
                val obj = PickerPickEvent(values = curValueArray.value, column = column, index = index)
                pickerValue.value = curValueArray.value.slice()
                emit("pick", obj)
            }
            val onCancel = fun(e: UniPointerEvent){
                updatePickerItems()
                emit("cancel", e)
            }
            val onConfirm = fun(e: UniPointerEvent){
                val values = curValueArray.value.slice()
                val indexs = curIndexArray.value.slice()
                val items = curItemArray.map(fun(item): PickerColumnItem {
                    return toRaw(item)
                }
                )
                if (pickerValue.value.join("") != values.join("")) {
                    pickerValue.value = values
                }
                val obj = PickerConfirmEvent(values = values, indexs = indexs, items = items)
                emit("confirm", obj)
            }
            val stopPickerValue = watch(pickerValue, fun(){
                if (pickerValue.value.join("") == curValueArray.value.join("")) {
                    return
                }
                curValueArray.value = pickerValue.value.map(fun(item: PickerValue): Any {
                    return item
                }
                )
                updatePickerItems()
            }
            )
            val stopColumns = watch(realColumns, fun(){
                updatePickerItems()
            }
            )
            onMounted(fun(){
                nextTick(fun(){
                    if (pickerValue.value.join("") != curValueArray.value.join("") && pickerValue.value.length > 0) {
                        curValueArray.value = pickerValue.value.slice()
                        updatePickerItems()
                    }
                }
                )
            }
            )
            val loadingRef = ref<UniElement?>(null)
            val loadingAni = useLoading(loadingRef)
            loadingAni.type = "circular"
            loadingAni.color = props.loadingColor ?: "#3283ff"
            loadingAni.ratio = unitConvert(props.loadingSize)
            watchEffect(fun(){
                if (props.loading) {
                    loadingAni.play()
                } else {
                    loadingAni.clear()
                }
            }
            )
            onBeforeUnmount(fun(){
                stopPickerValue()
                stopColumns()
            }
            )
            provide("limePicker", props)
            provide("limePickerOnPick", onPick)
            provide("limePickerUpdateItems", updateItems)
            provide("limePickerItems", pickerItemInstanceArray)
            provide("limePickerManageChildInList", manageChildInList)
            return fun(): Any? {
                val _component_l_picker_item = resolveEasyComponent("l-picker-item", GenUniModulesLimePickerComponentsLPickerItemLPickerItemClass)
                return createElementVNode("view", utsMapOf("class" to "l-picker", "style" to normalizeStyle(utsArrayOf(
                    unref(styles)
                )), "ref" to "pickerRef"), utsArrayOf(
                    if (isTrue(_ctx.cancelBtn != null || _ctx.title != null || _ctx.confirmBtn != null)) {
                        createElementVNode("view", utsMapOf("class" to "l-picker__toolbar", "key" to unref(ohosShow)), utsArrayOf(
                            if (_ctx.cancelBtn != null) {
                                createElementVNode("text", utsMapOf("class" to "l-picker__cancel", "key" to unref(ohosShow), "style" to normalizeStyle(_ctx.cancelStyle ?: ""), "onClick" to onCancel), toDisplayString(_ctx.cancelBtn), 5)
                            } else {
                                createCommentVNode("v-if", true)
                            },
                            createElementVNode("text", utsMapOf("class" to "l-picker__title", "key" to unref(ohosShow), "style" to normalizeStyle(_ctx.titleStyle ?: "")), toDisplayString(_ctx.title), 5),
                            if (_ctx.confirmBtn != null) {
                                createElementVNode("text", utsMapOf("class" to "l-picker__confirm", "key" to unref(ohosShow), "style" to normalizeStyle(_ctx.confirmStyle ?: ""), "onClick" to onConfirm), toDisplayString(_ctx.confirmBtn), 5)
                            } else {
                                createCommentVNode("v-if", true)
                            }
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                    ,
                    renderSlot(_ctx.`$slots`, "header"),
                    createElementVNode("view", utsMapOf("class" to "l-picker__main", "style" to normalizeStyle(utsArrayOf(
                        if (_ctx.groupHeight != null) {
                            utsMapOf("height" to _ctx.groupHeight)
                        } else {
                            utsMapOf<String, Any?>()
                        }
                    ))), utsArrayOf(
                        renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createElementVNode(Fragment, null, RenderHelpers.renderList(props.columns, fun(options, i, __index, _cached): Any {
                                    return createVNode(_component_l_picker_item, utsMapOf("options" to options, "key" to i, "column" to i, "value" to if (unref(pickerValue).length > i) {
                                        unref(pickerValue)[i]
                                    } else {
                                        null
                                    }
                                    ), null, 8, utsArrayOf(
                                        "options",
                                        "column",
                                        "value"
                                    ))
                                }
                                ), 128)
                            )
                        }
                        ),
                        if (isTrue(unref(isEmpty))) {
                            createElementVNode("view", utsMapOf("key" to 0, "class" to "l-picker__empty"), utsArrayOf(
                                renderSlot(_ctx.`$slots`, "empty")
                            ))
                        } else {
                            createCommentVNode("v-if", true)
                        }
                    ), 4),
                    renderSlot(_ctx.`$slots`, "footer"),
                    if (isTrue(_ctx.loading)) {
                        createElementVNode("view", utsMapOf("key" to 1, "class" to "l-picker__loading", "ref_key" to "loadingRef", "ref" to loadingRef, "style" to normalizeStyle(utsArrayOf(
                            if (_ctx.loadingMaskColor != null) {
                                utsMapOf("background" to _ctx.loadingMaskColor)
                            } else {
                                utsMapOf<String, Any?>()
                            }
                        ))), null, 4)
                    } else {
                        createCommentVNode("v-if", true)
                    }
                ), 4)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-picker" to padStyleMapOf(utsMapOf("position" to "relative", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "24rpx", "borderTopRightRadius" to "24rpx")), "l-picker__toolbar" to padStyleMapOf(utsMapOf("display" to "flex", "alignItems" to "center", "justifyContent" to "space-between", "overflow" to "hidden", "height" to "116rpx", "flexDirection" to "row", "position" to "relative")), "l-picker__title" to padStyleMapOf(utsMapOf("position" to "absolute", "left" to "50%", "top" to "50%", "transform" to "translateX(-50%) translateY(-50%)", "textAlign" to "center", "overflow" to "hidden", "whiteSpace" to "nowrap", "textOverflow" to "ellipsis", "color" to "rgba(0,0,0,0.88)", "lineHeight" to "52rpx", "fontWeight" to "700", "fontSize" to 18)), "l-picker__cancel" to padStyleMapOf(utsMapOf("fontSize" to 16, "lineHeight" to "116rpx", "height" to "100%", "paddingTop" to 0, "paddingRight" to "32rpx", "paddingBottom" to 0, "paddingLeft" to "32rpx", "color" to "rgba(0,0,0,0.65)")), "l-picker__confirm" to padStyleMapOf(utsMapOf("fontSize" to 16, "lineHeight" to "116rpx", "height" to "100%", "paddingTop" to 0, "paddingRight" to "32rpx", "paddingBottom" to 0, "paddingLeft" to "32rpx", "color" to "#3283ff")), "l-picker__main" to padStyleMapOf(utsMapOf("display" to "flex", "height" to "400rpx", "flexDirection" to "row", "paddingTop" to 0, "paddingRight" to "16rpx", "paddingBottom" to 0, "paddingLeft" to "16rpx")), "l-picker__empty" to padStyleMapOf(utsMapOf("pointerEvents" to "none", "justifyContent" to "center", "alignItems" to "center", "display" to "flex", "position" to "absolute", "top" to 0, "bottom" to 0, "left" to 0, "right" to 0, "zIndex" to 3)), "l-picker__loading" to padStyleMapOf(utsMapOf("zIndex" to 3, "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.9)", "justifyContent" to "center", "alignItems" to "center", "display" to "flex", "position" to "absolute", "top" to 0, "bottom" to 0, "left" to 0, "right" to 0)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("change" to null, "cancel" to null, "pick" to null, "confirm" to null, "update:modelValue" to null, "update:value" to null)
        var props = normalizePropsOptions(utsMapOf("cancelBtn" to utsMapOf("type" to "String", "required" to false), "cancelStyle" to utsMapOf("type" to utsArrayOf(
            "String",
            "UTSJSONObject"
        ), "required" to false), "confirmBtn" to utsMapOf("type" to "String", "required" to false), "confirmStyle" to utsMapOf("type" to utsArrayOf(
            "String",
            "UTSJSONObject"
        ), "required" to false), "title" to utsMapOf("type" to "String", "required" to false), "titleStyle" to utsMapOf("type" to utsArrayOf(
            "String",
            "UTSJSONObject"
        ), "required" to false), "keys" to utsMapOf("type" to "UTSJSONObject", "required" to false), "columns" to utsMapOf("type" to "Array", "required" to true, "default" to utsArrayOf<PickerColumn>()), "modelValue" to utsMapOf("type" to "Array", "required" to false), "defaultValue" to utsMapOf("type" to "Array", "required" to false), "value" to utsMapOf("type" to "Array", "required" to false), "loading" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "loadingColor" to utsMapOf("type" to "String", "required" to false), "loadingMaskColor" to utsMapOf("type" to "String", "required" to false), "loadingSize" to utsMapOf("type" to "String", "required" to true, "default" to "64rpx"), "itemHeight" to utsMapOf("type" to "String", "required" to false), "itemColor" to utsMapOf("type" to "String", "required" to false), "itemFontSize" to utsMapOf("type" to "String", "required" to false), "itemActiveColor" to utsMapOf("type" to "String", "required" to false), "itemActiveFontWeight" to utsMapOf("type" to "Number", "required" to false), "indicatorStyle" to utsMapOf("type" to "String", "required" to false), "bgColor" to utsMapOf("type" to "String", "required" to false), "groupHeight" to utsMapOf("type" to "String", "required" to false), "radius" to utsMapOf("type" to "String", "required" to false), "resetIndex" to utsMapOf("type" to "Boolean", "required" to true, "default" to false)))
        var propsNeedCastKeys = utsArrayOf(
            "columns",
            "loading",
            "loadingSize",
            "resetIndex"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
