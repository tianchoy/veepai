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
open class GenPagesMessageMessage : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessage) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessage
            val _cache = __ins.renderCache
            val today = ref(dayuts().format("MM-DD"))
            val checkIns = ref(utsArrayOf(
                "2025-06-09",
                "2025-07-01",
                "2025-07-02"
            ))
            val showCalendar = ref(false)
            val videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
            val select = fun(day: LDay){
                today.value = dayuts(day.fullDate).format("MM-DD")
                if (day.isToday) {
                    console.log("今天", " at pages/message/message.uvue:30")
                }
                showCalendar.value = false
            }
            val change = fun(res: LYearMonth){
                console.log("res", res, " at pages/message/message.uvue:36")
            }
            val ShowCalendar = fun(){
                showCalendar.value = !showCalendar.value
            }
            val hideCalendar = fun(){
                showCalendar.value = false
            }
            return fun(): Any? {
                val _component_l_daily_punch = resolveEasyComponent("l-daily-punch", GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunchClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "vedio-box"), utsArrayOf(
                        createElementVNode("video", utsMapOf("class" to "video", "src" to videoSrc, "controls" to false))
                    )),
                    createElementVNode("view", utsMapOf("class" to "today", "onClick" to ShowCalendar), toDisplayString(today.value), 1),
                    if (isTrue(showCalendar.value)) {
                        createElementVNode("view", utsMapOf("key" to 0, "class" to "calendar-box"), utsArrayOf(
                            createVNode(_component_l_daily_punch, utsMapOf("signedDates" to checkIns.value, "onSelect" to select, "onPanelChange" to change, "dayHeight" to 60), null, 8, utsArrayOf(
                                "signedDates"
                            )),
                            createElementVNode("button", utsMapOf("class" to "btn-chanel-box", "onClick" to hideCalendar), " 取消 ")
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ), utsArrayOf(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "position" to "relative")), "vedio-box" to utsMapOf(".container " to utsMapOf("width" to "100%")), "video" to utsMapOf(".container .vedio-box " to utsMapOf("width" to "100%")), "calendar-box" to utsMapOf(".container " to utsMapOf("position" to "absolute", "bottom" to 0, "left" to 0, "height" to "60%", "width" to "100%", "backgroundColor" to "#ffffff")), "btn-chanel-box" to utsMapOf(".container .calendar-box " to utsMapOf("position" to "absolute", "width" to "85%", "bottom" to "45rpx", "left" to "60rpx", "borderTopLeftRadius" to "50rpx", "borderTopRightRadius" to "50rpx", "borderBottomRightRadius" to "50rpx", "borderBottomLeftRadius" to "50rpx")), "today" to padStyleMapOf(utsMapOf("textAlign" to "center")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
