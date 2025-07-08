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
import io.dcloud.uniapp.extapi.createVideoContext as uni_createVideoContext
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
open class GenPagesMessageMessage : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessage) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessage
            val _cache = __ins.renderCache
            val checkIns = ref(utsArrayOf(
                "2025-06-09",
                "2025-07-01",
                "2025-07-02"
            ))
            val today = ref(dayuts().format("MM-DD"))
            val showCalendar = ref<Boolean>(false)
            val videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
            val activeTab = ref(0)
            val testTitle = ref("测试标题")
            val videoRef = ref(null)
            val playVideo = fun(){
                uni_createVideoContext("myVideo", null)!!!!.play()
            }
            val pasueVideo = fun(){
                uni_createVideoContext("myVideo", null)!!!!.pause()
            }
            class SecurityEvent : IUTSSourceMap {
                override fun `__$getOriginalPosition`(): UTSSourceMapPosition {
                    return UTSSourceMapPosition("SecurityEvent", "pages/message/message.uvue", 77, 8)
                }
                var id: Number
                var type: String
                var time: String
                var location: String
                constructor(id: Number, type: String, time: String, location: String){
                    this.id = id
                    this.type = type
                    this.time = time
                    this.location = location
                }
            }
            class Tab : IUTSSourceMap {
                override fun `__$getOriginalPosition`(): UTSSourceMapPosition {
                    return UTSSourceMapPosition("Tab", "pages/message/message.uvue", 92, 8)
                }
                var label: String
                var type: String
                constructor(label: String, type: String){
                    this.label = label
                    this.type = type
                }
            }
            val tabs = ref(utsArrayOf<Tab>(Tab(label = "全部类型", type = "all"), Tab(label = "人形侦测", type = "human"), Tab(label = "移动侦测", type = "motion")))
            val events = ref(utsArrayOf<SecurityEvent>(SecurityEvent(1, "human", "15:29", "前门走廊"), SecurityEvent(2, "motion", "14:45", "车库入口"), SecurityEvent(3, "human", "13:20", "后花园"), SecurityEvent(4, "motion", "11:05", "侧门通道")))
            val getFilteredEvents = fun(): UTSArray<SecurityEvent> {
                if (activeTab.value == 0) {
                    return events.value.slice()
                }
                val selectedType = tabs.value[activeTab.value].type
                return events.value.filter(fun(event): Boolean {
                    return event.type === selectedType
                }
                )
            }
            val changeTab = fun(index: Number){
                activeTab.value = index
            }
            val select = fun(day: LDay){
                today.value = dayuts(day.fullDate).format("MM-DD")
                console.log(today.value, " at pages/message/message.uvue:130")
                if (day.isToday) {
                    console.log("今天", " at pages/message/message.uvue:132")
                }
                showCalendar.value = false
            }
            val msgDetail = fun(e: SecurityEvent){
                uni_navigateTo(NavigateToOptions(url = "/pages/message/messageDetail/messageDetail?id=" + e.id))
            }
            val change = fun(res: LYearMonth){
                console.log("res", res, " at pages/message/message.uvue:144")
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
                        createElementVNode("video", utsMapOf("class" to "video", "id" to "myVideo", "src" to videoSrc, "ref_key" to "videoRef", "ref" to videoRef, "controls" to true, "show-play-btn" to true, "show-center-play-btn" to true, "enable-progress-gesture" to true, "show-fullscreen-btn" to true, "show-mute-btn" to true, "title" to testTitle.value), null, 8, utsArrayOf(
                            "title"
                        )),
                        createElementVNode("view")
                    )),
                    createElementVNode("button", utsMapOf("onClick" to playVideo), "播放视频"),
                    createElementVNode("button", utsMapOf("onClick" to pasueVideo), "暂停视频"),
                    createElementVNode("view", utsMapOf("class" to "content-box"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "sub-nav"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "today", "onClick" to ShowCalendar), utsArrayOf(
                                createElementVNode("text", null, toDisplayString(today.value), 1),
                                createElementVNode("image", utsMapOf("class" to "down", "src" to "/static/down.png")),
                                createElementVNode("text", null, " | ")
                            )),
                            createElementVNode("view", utsMapOf("class" to "select"), utsArrayOf(
                                createElementVNode(Fragment, null, RenderHelpers.renderList(tabs.value, fun(tab, index, __index, _cached): Any {
                                    return createElementVNode("text", utsMapOf("key" to index, "class" to normalizeClass(utsArrayOf(
                                        "select-item",
                                        utsMapOf("active" to (activeTab.value === index))
                                    )), "onClick" to fun(){
                                        changeTab(index)
                                    }
                                    ), toDisplayString(tab.label), 11, utsArrayOf(
                                        "onClick"
                                    ))
                                }
                                ), 128)
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "tab-content"), utsArrayOf(
                            createElementVNode(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), fun(event, index, __index, _cached): Any {
                                return createElementVNode("view", utsMapOf("key" to index, "class" to "tab-pane", "onClick" to fun(){
                                    msgDetail(event)
                                }
                                ), utsArrayOf(
                                    createElementVNode("view", utsMapOf("class" to "item-content"), utsArrayOf(
                                        createElementVNode("image", utsMapOf("class" to "item-icon", "mode" to "aspectFit", "src" to if (event.type === "human") {
                                            "/static/people.png"
                                        } else {
                                            "/static/mobile.png"
                                        }
                                        ), null, 8, utsArrayOf(
                                            "src"
                                        )),
                                        createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                                            createElementVNode("text", null, toDisplayString(if (event.type === "human") {
                                                "人形侦测"
                                            } else {
                                                "移动侦测"
                                            }
                                            ), 1),
                                            createElementVNode("text", null, toDisplayString(event.time), 1)
                                        ))
                                    )),
                                    createElementVNode("image", utsMapOf("class" to "item-img", "mode" to "aspectFit", "src" to "/static/vedio.png"))
                                ), 8, utsArrayOf(
                                    "onClick"
                                ))
                            }
                            ), 128)
                        ))
                    )),
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "position" to "relative", "backgroundColor" to "#f3f3f3")), "vedio-box" to utsMapOf(".container " to utsMapOf("width" to "100%")), "video" to utsMapOf(".container .vedio-box " to utsMapOf("width" to "100%")), "content-box" to utsMapOf(".container " to utsMapOf("paddingTop" to "30rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to "20rpx")), "sub-nav" to utsMapOf(".container .content-box " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "select" to utsMapOf(".container .content-box .sub-nav " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginLeft" to "10rpx")), "today" to utsMapOf(".container .content-box .sub-nav " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "width" to "120rpx")), "down" to utsMapOf(".container .content-box .sub-nav .today " to utsMapOf("width" to "25rpx", "height" to "25rpx")), "select-item" to utsMapOf(".container .content-box .sub-nav .select " to utsMapOf("flex" to 1, "backgroundColor" to "#ffffff", "color" to "#333333", "paddingTop" to "10rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "5rpx", "borderTopRightRadius" to "5rpx", "borderBottomRightRadius" to "5rpx", "borderBottomLeftRadius" to "5rpx", "marginTop" to 0, "marginRight" to "5rpx", "marginBottom" to 0, "marginLeft" to "5rpx")), "active" to utsMapOf(".container .content-box .sub-nav .select " to utsMapOf("color" to "#ffffff", "backgroundColor" to "#1296db")), "tab-content" to utsMapOf(".container .content-box " to utsMapOf("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "marginTop" to "20rpx")), "tab-pane" to utsMapOf(".container .content-box .tab-content " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "width" to "100%", "marginBottom" to "30rpx")), "item-content" to utsMapOf(".container .content-box .tab-content .tab-pane " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "item-icon" to utsMapOf(".container .content-box .tab-content .tab-pane .item-content " to utsMapOf("width" to "60rpx", "height" to "60rpx")), "info" to utsMapOf(".container .content-box .tab-content .tab-pane .item-content " to utsMapOf("marginLeft" to "20rpx")), "item-img" to utsMapOf(".container .content-box .tab-content .tab-pane " to utsMapOf("width" to "100rpx", "height" to "60rpx")), "calendar-box" to utsMapOf(".container " to utsMapOf("position" to "absolute", "bottom" to 0, "left" to 0, "height" to "60%", "width" to "100%", "backgroundColor" to "#ffffff")), "btn-chanel-box" to utsMapOf(".container .calendar-box " to utsMapOf("position" to "absolute", "width" to "85%", "bottom" to "45rpx", "left" to "60rpx", "borderTopLeftRadius" to "50rpx", "borderTopRightRadius" to "50rpx", "borderBottomRightRadius" to "50rpx", "borderBottomLeftRadius" to "50rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
