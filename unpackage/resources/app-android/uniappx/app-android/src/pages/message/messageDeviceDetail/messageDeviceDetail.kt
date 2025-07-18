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
import io.dcloud.uniapp.extapi.createVideoContext as uni_createVideoContext
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
open class GenPagesMessageMessageDeviceDetailMessageDeviceDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessageDeviceDetailMessageDeviceDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessageDeviceDetailMessageDeviceDetail
            val _cache = __ins.renderCache
            val checkIns = ref(_uA(
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
            open class SecurityEvent {
                open var id: Number
                open var type: String
                open var time: String
                open var location: String
                constructor(id: Number, type: String, time: String, location: String){
                    this.id = id
                    this.type = type
                    this.time = time
                    this.location = location
                }
            }
            open class Tab {
                open var label: String
                open var type: String
                constructor(label: String, type: String){
                    this.label = label
                    this.type = type
                }
            }
            val tabs = ref(_uA<Tab>(Tab(label = "全部类型", type = "all"), Tab(label = "人形侦测", type = "human"), Tab(label = "移动侦测", type = "motion")))
            val events = ref(_uA<SecurityEvent>(SecurityEvent(1, "human", "15:29", "前门走廊"), SecurityEvent(2, "motion", "14:45", "车库入口"), SecurityEvent(3, "human", "13:20", "后花园"), SecurityEvent(4, "motion", "11:05", "侧门通道")))
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
                console.log(today.value)
                if (day.isToday) {
                    console.log("今天")
                }
                showCalendar.value = false
            }
            val msgDetail = fun(e: SecurityEvent){
                uni_navigateTo(NavigateToOptions(url = "/pages/message/messageDetail/messageDetail?id=" + e.id))
            }
            val change = fun(res: LYearMonth){
                console.log("res", res)
            }
            val ShowCalendar = fun(){
                showCalendar.value = !showCalendar.value
            }
            val hideCalendar = fun(){
                showCalendar.value = false
            }
            return fun(): Any? {
                val _component_l_daily_punch = resolveEasyComponent("l-daily-punch", GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunchClass)
                val _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup", GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "vedio-box"), _uA(
                        _cE("video", _uM("class" to "video", "id" to "myVideo", "src" to videoSrc, "ref_key" to "videoRef", "ref" to videoRef, "controls" to true, "show-play-btn" to true, "show-center-play-btn" to true, "enable-progress-gesture" to true, "show-fullscreen-btn" to true, "show-mute-btn" to true, "title" to testTitle.value), null, 8, _uA(
                            "title"
                        )),
                        _cE("view")
                    )),
                    _cE("button", _uM("onClick" to playVideo), "播放视频"),
                    _cE("button", _uM("onClick" to pasueVideo), "暂停视频"),
                    _cE("view", _uM("class" to "content-box"), _uA(
                        _cE("view", _uM("class" to "sub-nav"), _uA(
                            _cE("view", _uM("class" to "today", "onClick" to ShowCalendar), _uA(
                                _cE("text", null, _tD(today.value), 1),
                                _cE("image", _uM("class" to "down", "src" to "/static/down.png")),
                                _cE("text", null, " | ")
                            )),
                            _cE("view", _uM("class" to "select"), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(tabs.value, fun(tab, index, __index, _cached): Any {
                                    return _cE("text", _uM("key" to index, "class" to _nC(_uA(
                                        "select-item",
                                        _uM("active" to (activeTab.value === index))
                                    )), "onClick" to fun(){
                                        changeTab(index)
                                    }
                                    ), _tD(tab.label), 11, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128)
                            ))
                        )),
                        _cE("view", _uM("class" to "tab-content"), _uA(
                            _cE(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), fun(event, index, __index, _cached): Any {
                                return _cE("view", _uM("key" to index, "class" to "tab-pane", "onClick" to fun(){
                                    msgDetail(event)
                                }
                                ), _uA(
                                    _cE("view", _uM("class" to "item-content"), _uA(
                                        _cE("image", _uM("class" to "item-icon", "mode" to "aspectFit", "src" to if (event.type === "human") {
                                            "/static/people.png"
                                        } else {
                                            "/static/mobile.png"
                                        }
                                        ), null, 8, _uA(
                                            "src"
                                        )),
                                        _cE("view", _uM("class" to "info"), _uA(
                                            _cE("text", null, _tD(if (event.type === "human") {
                                                "人形侦测"
                                            } else {
                                                "移动侦测"
                                            }
                                            ), 1),
                                            _cE("text", null, _tD(event.time), 1)
                                        ))
                                    )),
                                    _cE("image", _uM("class" to "item-img", "mode" to "aspectFit", "src" to "/static/vedio.png"))
                                ), 8, _uA(
                                    "onClick"
                                ))
                            }
                            ), 128)
                        ))
                    )),
                    _cV(_component_fui_bottom_popup, _uM("visible" to showCalendar.value, "onClose" to hideCalendar), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "calendar-box"), _uA(
                                _cV(_component_l_daily_punch, _uM("signedDates" to checkIns.value, "onSelect" to select, "onPanelChange" to change, "dayHeight" to 60), null, 8, _uA(
                                    "signedDates"
                                )),
                                _cE("button", _uM("class" to "btn-chanel-box", "onClick" to hideCalendar), " 取消 ")
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "visible"
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("width" to "100%", "height" to "100%", "position" to "relative", "backgroundColor" to "#f3f3f3")), "vedio-box" to _uM(".container " to _uM("width" to "100%")), "video" to _uM(".container .vedio-box " to _uM("width" to "100%")), "content-box" to _uM(".container " to _uM("paddingTop" to "30rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to "20rpx")), "sub-nav" to _uM(".container .content-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "select" to _uM(".container .content-box .sub-nav " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "marginLeft" to "10rpx")), "today" to _uM(".container .content-box .sub-nav " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "width" to "120rpx")), "down" to _uM(".container .content-box .sub-nav .today " to _uM("width" to "25rpx", "height" to "25rpx")), "select-item" to _uM(".container .content-box .sub-nav .select " to _uM("flex" to 1, "backgroundColor" to "#ffffff", "color" to "#333333", "paddingTop" to "10rpx", "paddingRight" to "20rpx", "paddingBottom" to "10rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "5rpx", "borderTopRightRadius" to "5rpx", "borderBottomRightRadius" to "5rpx", "borderBottomLeftRadius" to "5rpx", "marginTop" to 0, "marginRight" to "5rpx", "marginBottom" to 0, "marginLeft" to "5rpx")), "active" to _uM(".container .content-box .sub-nav .select " to _uM("color" to "#ffffff", "backgroundColor" to "#1296db")), "tab-content" to _uM(".container .content-box " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "marginTop" to "20rpx")), "tab-pane" to _uM(".container .content-box .tab-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "width" to "100%", "marginBottom" to "30rpx")), "item-content" to _uM(".container .content-box .tab-content .tab-pane " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "item-icon" to _uM(".container .content-box .tab-content .tab-pane .item-content " to _uM("width" to "60rpx", "height" to "60rpx")), "info" to _uM(".container .content-box .tab-content .tab-pane .item-content " to _uM("marginLeft" to "20rpx")), "item-img" to _uM(".container .content-box .tab-content .tab-pane " to _uM("width" to "100rpx", "height" to "60rpx")), "calendar-box" to _uM(".container " to _uM("width" to "100%", "backgroundColor" to "#ffffff")), "btn-chanel-box" to _uM(".container .calendar-box " to _uM("position" to "absolute", "width" to "85%", "bottom" to "45rpx", "left" to "60rpx", "borderTopLeftRadius" to "50rpx", "borderTopRightRadius" to "50rpx", "borderBottomRightRadius" to "50rpx", "borderBottomLeftRadius" to "50rpx")), "popup-title" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "paddingTop" to 0, "paddingRight" to "40rpx", "paddingBottom" to 0, "paddingLeft" to "40rpx")), "fui-scroll__wrap" to _uM(".container " to _uM("width" to "100%", "paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0, "position" to "relative")), "fui-sub__title" to _uM(".container " to _uM("textAlign" to "center", "fontSize" to "24rpx", "color" to "#7F7F7F", "transform" to "scale(0.9)")), "fui-scroll__view" to _uM(".container " to _uM("width" to "100%", "height" to "50%")), "fui-list__cell" to _uM(".container " to _uM("flex" to 1, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
