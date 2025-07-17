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
open class GenUniModulesLimeDateTimePickerComponentsLDateTimePickerLDateTimePicker : VueComponent, DateTimePickerProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var cancelBtn: String? by `$props`
    override var cancelStyle: String? by `$props`
    override var confirmBtn: String? by `$props`
    override var confirmStyle: String? by `$props`
    override var customLocale: String? by `$props`
    override var end: Any? by `$props`
    override var start: Any? by `$props`
    override var steps: UTSJSONObject? by `$props`
    override var title: String? by `$props`
    override var titleStyle: String? by `$props`
    override var value: Any? by `$props`
    override var defaultValue: Any? by `$props`
    override var modelValue: Any? by `$props`
    override var format: String by `$props`
    override var mode: Any by `$props`
    override var customFilter: ((type: TimeModeValues, columns: DateTimePickerColumn) -> DateTimePickerColumn)? by `$props`
    override var renderLabel: ((type: String, value: String) -> String)? by `$props`
    override var showUnit: Boolean by `$props`
    override var itemHeight: String? by `$props`
    override var itemColor: String? by `$props`
    override var itemFontSize: String? by `$props`
    override var itemActiveColor: String? by `$props`
    override var indicatorStyle: String? by `$props`
    override var bgColor: String? by `$props`
    override var groupHeight: String? by `$props`
    override var radius: String? by `$props`
    override var resetIndex: Boolean by `$props`
    override var minHour: Number by `$props`
    override var maxHour: Number by `$props`
    override var minMinute: Number by `$props`
    override var maxMinute: Number by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeDateTimePickerComponentsLDateTimePickerLDateTimePicker) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeDateTimePickerComponentsLDateTimePickerLDateTimePicker
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            var defaultValue: DateValue = props.value ?: props.defaultValue ?: props.defaultValue ?: Date.now()
            val innerValue = computed(WritableComputedOptions(set = fun(value: DateValue) {
                if (defaultValue == value) {
                    return
                }
                defaultValue = value
                emit("change", value)
                emit("update:modelValue", value)
                emit("update:value", value)
            }
            , get = fun(): DateValue {
                val value = props.value ?: props.modelValue ?: defaultValue
                return if (UTSAndroid.`typeof`(value) == "string" && (value as String).length == 0) {
                    Date.now()
                } else {
                    value
                }
            }
            ))
            val meaningColumn = getMeaningColumn(props.mode)
            val isTimeMode = _uA(
                "hour",
                "minute",
                "second"
            ).includes(meaningColumn[0])
            val normalize = fun(kVal: DateValue?, defaultDay: Dayuts): Dayuts {
                return if (kVal != null && dayuts(kVal).isValid()) {
                    dayuts(kVal)
                } else {
                    defaultDay
                }
            }
            val start = computed(fun(): Dayuts {
                return normalize(props.start as DateValue?, dayuts().subtract(10, "year"))
            }
            )
            val end = computed(fun(): Dayuts {
                return normalize(props.end as DateValue?, dayuts().add(10, "year"))
            }
            )
            val rationalize = fun(kVal: Dayuts): Dayuts {
                if (isTimeMode) {
                    return kVal
                }
                if (kVal.isBefore(start.value)) {
                    return start.value
                }
                if (kVal.isAfter(end.value)) {
                    return end.value
                }
                return kVal
            }
            val calcDate = fun(reassignedCurrentValue: DateValue?): Dayuts {
                var currentValue = reassignedCurrentValue
                if (isTimeMode) {
                    val dateStr = dayuts(start.value).format("YYYY-MM-DD")
                    currentValue = "" + dateStr + " " + currentValue
                }
                return if (currentValue != null && dayuts(currentValue).isValid()) {
                    rationalize(dayuts(currentValue))
                } else {
                    start.value
                }
            }
            val curDate = ref(calcDate(innerValue.value))
            val valueOfPicker = computed(fun(): UTSArray<String> {
                return meaningColumn.map(fun(item): String {
                    return curDate.value.get(item).toString(10)
                }
                )
            }
            )
            val columnCache = Map<String, UTSArray<DateTimePickerColumnItem>>()
            val columns = computed(fun(): UTSArray<DateTimePickerColumn> {
                val ret: UTSArray<DateTimePickerColumn> = _uA()
                val getDate = fun(date: Dayuts): UTSArray<Number> {
                    return _uA(
                        date.year(),
                        date.month() + 1,
                        date.date(),
                        date.hour(),
                        date.minute(),
                        date.second()
                    )
                }
                val _getDate = getDate(curDate.value)
                val curYear = _getDate[0]
                val curMonth = _getDate[1]
                val curDay = _getDate[2]
                val curHour = _getDate[3]
                val curMinute = _getDate[4]
                val _getDate1 = getDate(start.value)
                val minYear = _getDate1[0]
                val minMonth = _getDate1[1]
                val minDay = _getDate1[2]
                val minHour = _getDate1[3]
                val minMinute = _getDate1[4]
                val minSecond = _getDate1[5]
                val _getDate2 = getDate(end.value)
                val maxYear = _getDate2[0]
                val maxMonth = _getDate2[1]
                val maxDay = _getDate2[2]
                val maxHour = _getDate2[3]
                val maxMinute = _getDate2[4]
                val maxSecond = _getDate2[5]
                val isInMinYear = curYear == minYear
                val isInMaxYear = curYear == maxYear
                val isInMinMonth = isInMinYear && curMonth == minMonth
                val isInMaxMonth = isInMaxYear && curMonth === maxMonth
                val isInMinDay = isInMinMonth && curDay == minDay
                val isInMaxDay = isInMaxMonth && curDay == maxDay
                val isInMinHour = isInMinDay && curHour == minHour
                val isInMaxHour = isInMaxDay && curHour == maxHour
                val isInMinMinute = isInMinHour && curMinute == minMinute
                val isInMaxMinute = isInMaxHour && curMinute == maxMinute
                val generateColumn = fun(type: String, lowerBound: Number, upperBound: Number){
                    val cacheKey = "" + type + "-" + lowerBound + "-" + upperBound
                    if (columnCache.has(cacheKey)) {
                        ret.push(columnCache.get(cacheKey)!!)
                        return
                    }
                    val arr: UTSArray<DateTimePickerColumnItem> = _uA()
                    run {
                        var i = lowerBound
                        while(i <= upperBound){
                            val value = i
                            arr.push(DateTimePickerColumnItem(label = if (props.renderLabel != null) {
                                props.renderLabel!!(type, i.toString(10))
                            } else {
                                "" + value + (if (props.showUnit) {
                                    UNIT_MAP.get(type)
                                } else {
                                    ""
                                }
                                )
                            }
                            , value = if (type == "month") {
                                "" + (value - 1)
                            } else {
                                value.toString(10)
                            }
                            ))
                            i++
                        }
                    }
                    if (props.customFilter != null) {
                        val _arr = props.customFilter!!(type, arr)
                        ret.push(_arr)
                        columnCache.set(cacheKey, _arr)
                    } else {
                        ret.push(arr)
                        columnCache.set(cacheKey, arr)
                    }
                }
                if (meaningColumn.includes("year")) {
                    generateColumn("year", minYear, maxYear)
                }
                if (meaningColumn.includes("month")) {
                    val lower = if (isInMinYear) {
                        minMonth
                    } else {
                        1
                    }
                    val upper = if (isInMaxYear) {
                        maxMonth
                    } else {
                        12
                    }
                    generateColumn("month", lower, upper)
                }
                if (meaningColumn.includes("date")) {
                    val lower = if (isInMinMonth) {
                        minDay
                    } else {
                        1
                    }
                    val upper = if (isInMaxMonth) {
                        maxDay
                    } else {
                        dayuts("" + curYear + "-" + curMonth).daysInMonth()
                    }
                    generateColumn("date", lower, upper)
                }
                if (meaningColumn.includes("hour")) {
                    val lower = if (isInMinDay && !isTimeMode) {
                        minHour
                    } else {
                        clamp(props.minHour, 0, 23)
                    }
                    val upper = if (isInMaxDay && !isTimeMode) {
                        maxHour
                    } else {
                        clamp(props.maxHour, lower, 23)
                    }
                    generateColumn("hour", lower, upper)
                }
                if (meaningColumn.includes("minute")) {
                    val lower = if (isInMinHour && !isTimeMode) {
                        minMinute
                    } else {
                        clamp(props.minMinute, 0, 59)
                    }
                    val upper = if (isInMaxHour && !isTimeMode) {
                        maxMinute
                    } else {
                        clamp(props.maxMinute, lower, 59)
                    }
                    generateColumn("minute", lower, upper)
                }
                if (meaningColumn.includes("second")) {
                    val lower = if (isInMinMinute && !isTimeMode) {
                        minSecond
                    } else {
                        0
                    }
                    val upper = if (isInMaxMinute && !isTimeMode) {
                        maxSecond
                    } else {
                        59
                    }
                    generateColumn("second", lower, upper)
                }
                return ret
            }
            )
            val innterFormat = computed(fun(): String {
                val first = if (meaningColumn.length > 0) {
                    meaningColumn[0]
                } else {
                    "year"
                }
                val last = if (meaningColumn.length > 0) {
                    meaningColumn[meaningColumn.length - 1]
                } else {
                    "date"
                }
                val format = DEFAULT_FORMAT.substring(DEFAULT_FORMAT.indexOf(FORMAT_MAP.get(first)!!), DEFAULT_FORMAT.lastIndexOf(FORMAT_MAP.get(last)!!) + FORMAT_MAP.get(last)!!.length)
                return format
            }
            )
            val onConfirm = fun(ref1: PickerConfirmEvent){
                var values = ref1.values
                var cur = curDate.value
                values.forEach(fun(item, index){
                    val type = meaningColumn[index]
                    cur = cur.set(type, parseInt("" + item, 10))
                }
                )
                val curValue = cur.format(props.format)
                innerValue.value = cur.format(innterFormat.value)
                emit("confirm", curValue)
            }
            val onCancel = fun(){
                emit("cancel")
            }
            val onPick = fun(ref1: PickerPickEvent){
                var values = ref1.values
                var column = ref1.column
                var index = ref1.index
                val type = meaningColumn[column]
                val kVal = curDate.value.set(type as DayutsUnit, parseInt(columns.value[column][index].value, 10))
                curDate.value = rationalize(kVal)
                emit("pick", rationalize(kVal).format(props.format))
            }
            val onChange = fun(values: UTSArray<PickerValue1>){
                var cur = curDate.value
                values.forEach(fun(item, index){
                    val type = meaningColumn[index]
                    cur = cur.set(type, parseInt("" + item, 10))
                }
                )
                curDate.value = rationalize(cur as Dayuts)
                val curValue = curDate.value.format(innterFormat.value)
                innerValue.value = curValue
            }
            val stop = watch(innerValue, fun(kVal: DateValue){
                curDate.value = calcDate(kVal)
            }
            )
            onBeforeUnmount(fun(){
                stop()
            }
            )
            return fun(): Any? {
                val _component_l_picker = resolveEasyComponent("l-picker", GenUniModulesLimePickerComponentsLPickerLPickerClass)
                return _cV(_component_l_picker, _uM("title" to _ctx.title, "titleStyle" to _ctx.titleStyle, "confirm-btn" to _ctx.confirmBtn, "confirm-style" to _ctx.confirmStyle, "cancel-btn" to _ctx.cancelBtn, "cancel-style" to _ctx.cancelStyle, "itemHeight" to _ctx.itemHeight, "itemColor" to _ctx.itemColor, "itemFontSize" to _ctx.itemFontSize, "itemActiveColor" to _ctx.itemActiveColor, "indicatorStyle" to _ctx.indicatorStyle, "bgColor" to _ctx.bgColor, "groupHeight" to _ctx.groupHeight, "radius" to _ctx.radius, "value" to unref(valueOfPicker), "columns" to unref(columns), "onConfirm" to onConfirm, "onCancel" to onCancel, "onChange" to onChange, "onPick" to onPick), null, 8, _uA(
                    "title",
                    "titleStyle",
                    "confirm-btn",
                    "confirm-style",
                    "cancel-btn",
                    "cancel-style",
                    "itemHeight",
                    "itemColor",
                    "itemFontSize",
                    "itemActiveColor",
                    "indicatorStyle",
                    "bgColor",
                    "groupHeight",
                    "radius",
                    "value",
                    "columns"
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA())
        }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("change" to null, "cancel" to null, "confirm" to null, "pick" to null, "update:modelValue" to null, "update:value" to null)
        var props = _nP(_uM("cancelBtn" to _uM("type" to "String", "required" to false), "cancelStyle" to _uM("type" to "String", "required" to false), "confirmBtn" to _uM("type" to "String", "required" to false), "confirmStyle" to _uM("type" to "String", "required" to false), "customLocale" to _uM("type" to "String", "required" to false), "end" to _uM("required" to false), "start" to _uM("required" to false), "steps" to _uM("type" to "UTSJSONObject", "required" to false), "title" to _uM("type" to "String", "required" to false), "titleStyle" to _uM("type" to "String", "required" to false), "value" to _uM("required" to false), "defaultValue" to _uM("required" to false), "modelValue" to _uM("required" to false), "format" to _uM("type" to "String", "required" to true, "default" to DEFAULT_FORMAT), "mode" to _uM("required" to true, "default" to 7), "customFilter" to _uM("type" to "Function", "required" to false), "renderLabel" to _uM("type" to "Function", "required" to false), "showUnit" to _uM("type" to "Boolean", "required" to true, "default" to true), "itemHeight" to _uM("type" to "String", "required" to false), "itemColor" to _uM("type" to "String", "required" to false), "itemFontSize" to _uM("type" to "String", "required" to false), "itemActiveColor" to _uM("type" to "String", "required" to false), "indicatorStyle" to _uM("type" to "String", "required" to false), "bgColor" to _uM("type" to "String", "required" to false), "groupHeight" to _uM("type" to "String", "required" to false), "radius" to _uM("type" to "String", "required" to false), "resetIndex" to _uM("type" to "Boolean", "required" to true, "default" to false), "minHour" to _uM("type" to "Number", "required" to true, "default" to 0), "maxHour" to _uM("type" to "Number", "required" to true, "default" to 23), "minMinute" to _uM("type" to "Number", "required" to true, "default" to 0), "maxMinute" to _uM("type" to "Number", "required" to true, "default" to 59)))
        var propsNeedCastKeys = _uA(
            "format",
            "mode",
            "showUnit",
            "resetIndex",
            "minHour",
            "maxHour",
            "minMinute",
            "maxMinute"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
