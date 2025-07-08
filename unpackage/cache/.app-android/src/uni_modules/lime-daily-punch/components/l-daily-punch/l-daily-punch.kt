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
import io.dcloud.uniapp.extapi.createCanvasContextAsync as uni_createCanvasContextAsync
open class GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var canSupplement: Boolean by `$props`
    open var isFullCalendar: Boolean by `$props`
    open var yearMonth: String by `$props`
    open var signedDates: UTSArray<String> by `$props`
    open var dayHeight: Any by `$props`
    open var week: UTSArray<String> by `$props`
    open var weekStartsOn: Number by `$props`
    open var weekColor: String by `$props`
    open var weekFontSize: Number by `$props`
    open var weekHeight: Number by `$props`
    open var selectedDayBgColor: String by `$props`
    open var dayFontSize: Number by `$props`
    open var textColor: String by `$props`
    open var disabledColor: String by `$props`
    open var monthTitleHeight: Number by `$props`
    open var monthTitleFontSize: Number by `$props`
    open var color: String by `$props`
    open var unsignedColor: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunch
            val _cache = __ins.renderCache
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            var drawRef = ref<UniCanvasElement?>(null)
            var calender: Calendar? = null
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                style.set("height", "" + (6 * unitConvert(props.dayHeight) + props.weekHeight + props.monthTitleHeight) + "px")
                return style
            }
            )
            val onClick = fun(e: UniPointerEvent){
                calender?.touch(e)
            }
            val setOpt = fun(){
                val opt = LOptions(canSupplement = props.canSupplement, isFullCalendar = props.isFullCalendar, yearMonth = props.yearMonth, signedDates = props.signedDates.slice(), dayHeight = unitConvert(props.dayHeight), week = props.week as UTSArray<String>, weekStartsOn = props.weekStartsOn, weekColor = props.weekColor, weekFontSize = props.weekFontSize, weekHeight = props.weekHeight, selectedDayBgColor = props.selectedDayBgColor, dayFontSize = props.dayFontSize, textColor = props.textColor, disabledColor = props.disabledColor, monthTitleHeight = props.monthTitleHeight, monthTitleFontSize = props.monthTitleFontSize, color = props.color, unsignedColor = props.unsignedColor, select = fun(e: LDay){
                    emits("select", e)
                }
                , panelChange = fun(e: LYearMonth){
                    emits("panelChange", e)
                }
                )
                if (calender == null) {
                    return
                }
                calender!!.setOptions(opt)
            }
            watchEffect(fun(){
                setOpt()
                if (calender == null) {
                    return
                }
                calender!!.render()
                emits("streak", calender!!.checkinDays)
            }
            )
            val instance = getCurrentInstance()!!.proxy!!
            uni_createCanvasContextAsync(CreateCanvasContextAsyncOptions(id = "l-daily-punch", component = instance, success = fun(context: CanvasContext){
                val canvasContext = context.getContext("2d")!!
                val canvas = canvasContext.canvas
                calender = Calendar()
                setOpt()
                calender!!.setCanvas(canvas)
                calender!!.render()
                emits("streak", calender!!.checkinDays)
            }
            ))
            return fun(): Any? {
                return createElementVNode("view", utsMapOf("class" to "calender"), utsArrayOf(
                    createElementVNode("canvas", utsMapOf("ref" to "dailyRef", "id" to "l-daily-punch", "class" to "l-daily-punch", "style" to normalizeStyle(utsArrayOf(
                        unref(styles)
                    )), "onClick" to onClick), null, 4)
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
                return utsMapOf("l-daily-punch" to padStyleMapOf(utsMapOf("width" to "100%")), "calender" to padStyleMapOf(utsMapOf("marginTop" to 0, "marginRight" to "30rpx", "marginBottom" to 0, "marginLeft" to "30rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("select" to null, "panelChange" to null, "streak" to null)
        var props = normalizePropsOptions(utsMapOf("canSupplement" to utsMapOf("type" to "Boolean", "default" to true), "isFullCalendar" to utsMapOf("type" to "Boolean", "default" to true), "yearMonth" to utsMapOf("type" to "String", "default" to fun(): String {
            val date = Date()
            val year = date.getFullYear()
            val month = (date.getMonth() + 1).toString(10).padStart(2, "0")
            return "" + year + "-" + month
        }
        ), "signedDates" to utsMapOf("type" to "Array", "default" to fun(): UTSArray<String> {
            return utsArrayOf<String>()
        }
        , "validator" to fun(value: UTSArray<String>): Boolean {
            return value.every(fun(date: String): Boolean {
                return UTSRegExp("^\\d{4}-\\d{2}-\\d{2}\$", "").test(date)
            }
            )
        }
        ), "dayHeight" to utsMapOf("default" to 76), "week" to utsMapOf("type" to "Array", "default" to fun(): UTSArray<String> {
            return utsArrayOf(
                "周日",
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六"
            )
        }
        ), "weekStartsOn" to utsMapOf("type" to "Number", "default" to 6, "validator" to fun(value: Number): Boolean {
            return value <= 6
        }
        ), "weekColor" to utsMapOf("type" to "String", "default" to "#BDC0C3"), "weekFontSize" to utsMapOf("type" to "Number", "default" to 14), "weekHeight" to utsMapOf("type" to "Number", "default" to 30), "selectedDayBgColor" to utsMapOf("type" to "String", "default" to "rgba(0,0,0,0.06)"), "dayFontSize" to utsMapOf("type" to "Number", "default" to 16), "textColor" to utsMapOf("type" to "String", "default" to "#1A1F24"), "disabledColor" to utsMapOf("type" to "String", "default" to "#BDC0C3"), "monthTitleHeight" to utsMapOf("type" to "Number", "default" to 50), "monthTitleFontSize" to utsMapOf("type" to "Number", "default" to 20), "color" to utsMapOf("type" to "String", "default" to "#3B87F6"), "unsignedColor" to utsMapOf("type" to "String", "default" to "#F1A33A")))
        var propsNeedCastKeys = utsArrayOf(
            "canSupplement",
            "isFullCalendar",
            "yearMonth",
            "signedDates",
            "dayHeight",
            "week",
            "weekStartsOn",
            "weekColor",
            "weekFontSize",
            "weekHeight",
            "selectedDayBgColor",
            "dayFontSize",
            "textColor",
            "disabledColor",
            "monthTitleHeight",
            "monthTitleFontSize",
            "color",
            "unsignedColor"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
