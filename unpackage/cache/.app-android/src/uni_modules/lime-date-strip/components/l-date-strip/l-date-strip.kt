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
open class GenUniModulesLimeDateStripComponentsLDateStripLDateStrip : VueComponent, DateStripProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var firstDayOfWeek: Number by `$props`
    override var format: ((day: DateStriPDay) -> DateStriPDay)? by `$props`
    override var maxDate: Number? by `$props`
    override var minDate: Number? by `$props`
    override var value: Number? by `$props`
    override var defaultValue: Number? by `$props`
    override var modelValue: Number? by `$props`
    override var height: String? by `$props`
    override var gridWidth: String? by `$props`
    override var color: String? by `$props`
    override var activeBgColor: String? by `$props`
    override var activeColor: String? by `$props`
    override var bgColor: String? by `$props`
    override var radius: String? by `$props`
    override var switchMode: String by `$props`
    override var shape: String by `$props`
    override var showNavigation: Boolean? by `$props`
    override var weekdays: UTSArray<String> by `$props`
    open var scrollToDate: (date: Date) -> Unit
        get() {
            return unref(this.`$exposed`["scrollToDate"]) as (date: Date) -> Unit
        }
        set(value) {
            setRefValue(this.`$exposed`, "scrollToDate", value)
        }
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeDateStripComponentsLDateStripLDateStrip, _arg1: SetupContext) -> Any? = fun(__props, ref1): Any? {
            var __expose = ref1.expose
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeDateStripComponentsLDateStripLDateStrip
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val currentWeekIndex = ref(0)
            val scrollLeft = ref(0)
            val swiperCircular = ref(true)
            val selectedDate = ref<Date?>(null)
            val firstDayOfWeek = computed(fun(): Number {
                return Math.min(Math.max(props.firstDayOfWeek, 0), 6)
            }
            )
            val today = Date()
            val minDate = computed(fun(): Date {
                return if (props.minDate != null) {
                    Date(props.minDate!!)
                } else {
                    today
                }
            }
            )
            val maxDate = computed(fun(): Date {
                return if (props.maxDate != null) {
                    Date(props.maxDate!!)
                } else {
                    addDays(today, 31)
                }
            }
            )
            val days = computed(fun(): Number {
                return daysBetween(maxDate.value, minDate.value)
            }
            )
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.height != null) {
                    style.set("height", props.height!!)
                }
                if (props.bgColor != null) {
                    style.set("background", props.bgColor!!)
                }
                return style
            }
            )
            val cache = Map<Number, WeekDateCollection>()
            val createWeek = fun(currentStartDate: Date, length: Number): WeekDateCollection {
                val dates: UTSArray<DateStriPDay> = utsArrayOf()
                val time = currentStartDate.getTime()
                if (cache.has(time)) {
                    return cache.get(time)!!
                }
                run {
                    var i: Number = 0
                    while(i < length){
                        val date = Date(time)
                        date.setDate(currentStartDate.getDate() + i)
                        val week = date.getDay()
                        val year = date.getFullYear()
                        val month = date.getMonth() + 1
                        val day = date.getDate()
                        val dateObj = DateStriPDay(key = "" + year + "-" + month + "-" + day, date = date, year = year, month = month, day = day, text = ("" + day).padStart(2, "0"), type = calcType(date, minDate.value, maxDate.value, selectedDate.value), prefix = props.weekdays[week])
                        dates.push(if (props.format != null) {
                            props.format!!(dateObj)
                        } else {
                            dateObj
                        }
                        )
                        i++
                    }
                }
                val obj: WeekDateCollection = WeekDateCollection(start = Date(dates[0].year, dates[0].month - 1, dates[0].day).getTime(), end = Date(dates[length - 1].year, dates[length - 1].month - 1, dates[length - 1].day).getTime(), dates = dates)
                return obj
            }
            val currentDate = ref<Date>(today)
            val displayWeeks = computed(fun(): UTSArray<WeekDateCollection> {
                val weeks: UTSArray<WeekDateCollection> = utsArrayOf()
                if (props.switchMode == "week") {
                    val currentRange = getWeekRange(currentDate.value, firstDayOfWeek.value)
                    val offsetMap = Map<Number, UTSArray<Number>>(utsArrayOf(
                        utsArrayOf(
                            0,
                            utsArrayOf(
                                0,
                                1,
                                -1
                            )
                        ),
                        utsArrayOf(
                            1,
                            utsArrayOf(
                                -1,
                                0,
                                1
                            )
                        ),
                        utsArrayOf(
                            2,
                            utsArrayOf(
                                1,
                                -1,
                                0
                            )
                        )
                    ))
                    var indices = offsetMap.get(currentWeekIndex.value)!!
                    indices.forEach(fun(i){
                        val weekDate = addWeeks(currentRange.start, i)
                        weeks.push(createWeek(weekDate, 7))
                    })
                } else {
                    weeks.push(createWeek(minDate.value, days.value))
                }
                return weeks
            }
            )
            val swiperChange = fun(event: UniSwiperChangeEvent){
                val delta = event.detail.current - currentWeekIndex.value
                val newDate = addWeeks(currentDate.value, if (delta == 1 || delta == -2) {
                    1
                } else {
                    -1
                }
                )
                currentDate.value = newDate
                currentWeekIndex.value = event.detail.current
            }
            val swiperFinish = fun(_event: UniSwiperAnimationFinishEvent){}
            val onClick = fun(day: DateStriPDay){
                if (day.type == "disabled") {
                    return
                }
                selectedDate.value = day.date
                val v = day.date.getTime()
                emit("change", v)
                emit("select", v)
                emit("update:modelValue", v)
            }
            val scrollToDate = fun(date: Date){
                currentDate.value = date
                if (props.switchMode != "none") {
                    return
                }
                scrollLeft.value = unitConvert(props.gridWidth ?: 50) * daysBetween(date, minDate.value)
            }
            watchEffect(fun(){
                val value = props.value ?: props.modelValue
                if (value == null) {
                    return
                }
                selectedDate.value = Date(value)
            }
            )
            onMounted(fun(){
                nextTick(fun(){
                    scrollToDate(currentDate.value)
                }
                )
            }
            )
            __expose(utsMapOf("scrollToDate" to scrollToDate))
            return fun(): Any? {
                val _component_l_date_strip_item = resolveEasyComponent("l-date-strip-item", GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItemClass)
                return if (_ctx.switchMode == "none") {
                    createElementVNode("scroll-view", utsMapOf("key" to 0, "class" to "l-date-strip l-date-strip__scroll", "scroll-x" to true, "scroll-left" to unref(scrollLeft), "show-scrollbar" to false, "direction" to "horizontal", "style" to normalizeStyle(utsArrayOf(
                        unref(styles)
                    ))), utsArrayOf(
                        createVNode(_component_l_date_strip_item, utsMapOf("dates" to unref(displayWeeks)[0].dates, "color" to _ctx.color, "activeBgColor" to _ctx.activeBgColor, "activeColor" to _ctx.activeColor, "bgColor" to _ctx.bgColor, "radius" to _ctx.radius, "switchMode" to _ctx.switchMode, "shape" to _ctx.shape, "onClick" to onClick), null, 8, utsArrayOf(
                            "dates",
                            "color",
                            "activeBgColor",
                            "activeColor",
                            "bgColor",
                            "radius",
                            "switchMode",
                            "shape"
                        ))
                    ), 12, utsArrayOf(
                        "scroll-left"
                    ))
                } else {
                    createElementVNode("swiper", utsMapOf("key" to 1, "class" to "l-date-strip", "style" to normalizeStyle(utsArrayOf(
                        unref(styles)
                    )), "current" to unref(currentWeekIndex), "circular" to unref(swiperCircular), "onAnimationfinish" to swiperFinish, "onChange" to swiperChange), utsArrayOf(
                        createElementVNode(Fragment, null, RenderHelpers.renderList(unref(displayWeeks), fun(week, g, __index, _cached): Any {
                            return createElementVNode("swiper-item", utsMapOf("key" to g), utsArrayOf(
                                createVNode(_component_l_date_strip_item, utsMapOf("dates" to week.dates, "color" to _ctx.color, "activeBgColor" to _ctx.activeBgColor, "activeColor" to _ctx.activeColor, "bgColor" to _ctx.bgColor, "radius" to _ctx.radius, "switchMode" to _ctx.switchMode, "shape" to _ctx.shape, "onClick" to onClick), null, 8, utsArrayOf(
                                    "dates",
                                    "color",
                                    "activeBgColor",
                                    "activeColor",
                                    "bgColor",
                                    "radius",
                                    "switchMode",
                                    "shape"
                                ))
                            ))
                        }
                        ), 128)
                    ), 44, utsArrayOf(
                        "current",
                        "circular"
                    ))
                }
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-date-strip" to padStyleMapOf(utsMapOf("height" to 86, "backgroundColor" to "#ffffff")), "l-date-strip__scroll" to padStyleMapOf(utsMapOf("flexDirection" to "row")), "l-date-strip__item" to padStyleMapOf(utsMapOf("display" to "flex", "flexDirection" to "row", "paddingTop" to 8, "paddingRight" to 0, "paddingBottom" to 8, "paddingLeft" to 0, "boxSizing" to "border-box")), "l-date-strip__item--week" to padStyleMapOf(utsMapOf("flex" to 1)), "l-date-strip__grid" to utsMapOf(".l-date-strip__item--week " to utsMapOf("flex" to 1), ".l-date-strip__item--none " to utsMapOf("width" to 50), "" to utsMapOf("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "4rpx", "marginBottom" to 0, "marginLeft" to "4rpx", "transitionDuration" to "300ms", "transitionProperty" to "backgroundColor,color", "transitionTimingFunction" to "linear")), "l-date-strip__grid-prefix" to utsMapOf("" to utsMapOf("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "fontSize" to 14, "color" to "rgba(0,0,0,0.45)"), ".l-date-strip__grid--none " to utsMapOf("paddingBottom" to 4, "paddingTop" to 4), ".l-date-strip__grid--circle " to utsMapOf("paddingBottom" to 4)), "l-date-strip__grid-day" to padStyleMapOf(utsMapOf("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "fontSize" to 16, "color" to "rgba(0,0,0,0.88)", "fontWeight" to "bold")), "l-date-strip__grid-suffix" to padStyleMapOf(utsMapOf("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "position" to "absolute", "top" to "50%", "transform" to "translateY(60%)", "fontSize" to 12, "color" to "rgba(0,0,0,0.65)")), "l-date-strip__grid-info" to utsMapOf(".l-date-strip__grid--circle " to utsMapOf("borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99), "" to utsMapOf("display" to "flex", "flex" to 1, "justifyContent" to "center", "alignItems" to "center", "position" to "relative")), "l-date-strip__grid--square" to padStyleMapOf(utsMapOf("borderTopLeftRadius" to 5, "borderTopRightRadius" to 5, "borderBottomRightRadius" to 5, "borderBottomLeftRadius" to 5, "paddingTop" to 6, "paddingRight" to 0, "paddingBottom" to 6, "paddingLeft" to 0)), "l-date-strip__grid--active-bg" to padStyleMapOf(utsMapOf("backgroundColor" to "#3283ff")), "l-date-strip__grid--active-text" to padStyleMapOf(utsMapOf("color" to "#FFFFFF")), "l-date-strip__grid--active-text-none" to padStyleMapOf(utsMapOf("color" to "#3283ff")), "l-date-strip__grid--disabled" to padStyleMapOf(utsMapOf("opacity" to 0.4)), "@TRANSITION" to utsMapOf("l-date-strip__grid" to utsMapOf("duration" to "300ms", "property" to "backgroundColor,color", "timingFunction" to "linear"), "l-date-strip__grid-prefix" to utsMapOf("duration" to "200ms", "property" to "color", "timingFunction" to "linear"), "l-date-strip__grid-day" to utsMapOf("duration" to "200ms", "property" to "color", "timingFunction" to "linear"), "l-date-strip__grid-suffix" to utsMapOf("duration" to "200ms", "property" to "color", "timingFunction" to "linear")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("change" to null, "select" to null, "scroll" to null, "panelChange" to null, "update:modelValue" to null)
        var props = normalizePropsOptions(utsMapOf("firstDayOfWeek" to utsMapOf("type" to "Number", "required" to true, "default" to 1), "format" to utsMapOf("type" to "Function", "required" to false), "maxDate" to utsMapOf("type" to "Number", "required" to false), "minDate" to utsMapOf("type" to "Number", "required" to false), "value" to utsMapOf("type" to "Number", "required" to false), "defaultValue" to utsMapOf("type" to "Number", "required" to false), "modelValue" to utsMapOf("type" to "Number", "required" to false), "height" to utsMapOf("type" to "String", "required" to false), "gridWidth" to utsMapOf("type" to "String", "required" to false), "color" to utsMapOf("type" to "String", "required" to false), "activeBgColor" to utsMapOf("type" to "String", "required" to false), "activeColor" to utsMapOf("type" to "String", "required" to false), "bgColor" to utsMapOf("type" to "String", "required" to false), "radius" to utsMapOf("type" to "String", "required" to false), "switchMode" to utsMapOf("type" to "String", "required" to true, "default" to "week"), "shape" to utsMapOf("type" to "String", "required" to true, "default" to "square"), "showNavigation" to utsMapOf("type" to "Boolean", "required" to false), "weekdays" to utsMapOf("type" to "Array", "required" to true, "default" to utsArrayOf(
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六"
        ))))
        var propsNeedCastKeys = utsArrayOf(
            "firstDayOfWeek",
            "switchMode",
            "shape",
            "showNavigation",
            "weekdays"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
