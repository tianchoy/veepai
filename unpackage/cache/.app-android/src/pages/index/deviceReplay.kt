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
import io.dcloud.uniapp.extapi.getSystemInfoSync as uni_getSystemInfoSync
open class GenPagesIndexDeviceReplay : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceReplay) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceReplay
            val _cache = __ins.renderCache
            open class EventType {
                open var date: String
                open var time: String
                open var type: String
                constructor(date: String, time: String, type: String){
                    this.date = date
                    this.time = time
                    this.type = type
                }
            }
            val currentDate = ref("2024-10-21")
            val currentTime = ref("00:00:00")
            val activeDate = ref("10-21")
            val activeFilter = ref("all")
            val videoSrc = ref("https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4")
            val videoContext = ref<VideoContext?>(null)
            val isSeeking = ref(false)
            val timeScrollLeft = ref(0)
            val dateScrollLeft = ref(0)
            val playheadPosition = ref(0)
            val videoDuration = ref(0)
            val lastSyncTime = ref(0)
            val isDragging = ref(false)
            val startX = ref(0)
            val startScrollLeft = ref(0)
            val lastDragTime = ref(0)
            val manualScrollPosition = ref(0)
            val draggedTimeInSeconds = ref(0)
            val instance = getCurrentInstance()
            val dateList = _uA(
                "10-21",
                "10-22",
                "10-23",
                "10-24",
                "10-25",
                "10-26"
            )
            val minuteMarks: UTSArray<Number> = _uA(
                0,
                5,
                10,
                15,
                20,
                25,
                30,
                35,
                40,
                45,
                50,
                55
            )
            val filters = _uA<UTSJSONObject>(object : UTSJSONObject() {
                var label = "只看报警"
                var value = "alarm"
            }, object : UTSJSONObject() {
                var label = "移动侦测"
                var value = "motion"
            }, object : UTSJSONObject() {
                var label = "人形侦测"
                var value = "human"
            }, object : UTSJSONObject() {
                var label = "全部"
                var value = "all"
            })
            val events = ref(_uA<EventType>(EventType(date = "10-21", time = "00:15", type = "alarm"), EventType(date = "10-21", time = "00:30", type = "motion"), EventType(date = "10-21", time = "01:45", type = "human"), EventType(date = "10-21", time = "01:20", type = "alarm")))
            val rulerWidth = computed(fun(): Number {
                return 2880
            }
            )
            val filteredEvents = computed<UTSArray<EventType>>(fun(): UTSArray<EventType> {
                if (activeFilter.value === "all") {
                    return events.value
                }
                return events.value.filter(fun(e): Boolean {
                    return e.type === activeFilter.value
                }
                )
            }
            )
            val initVideoContext = fun(){
                try {
                    videoContext.value = uni_createVideoContext("myVideo", null)
                    console.log("视频上下文初始化成功", videoContext.value, " at pages/index/deviceReplay.uvue:176")
                }
                 catch (error: Throwable) {
                    console.error("创建视频上下文失败:", error, " at pages/index/deviceReplay.uvue:178")
                }
            }
            val loadVideoData = fun(date: String){
                console.log("加载日期数据:", date, " at pages/index/deviceReplay.uvue:183")
            }
            val selectDate = fun(date: String){
                activeDate.value = date
                currentDate.value = "2024-" + date
                loadVideoData(date)
                val index = dateList.indexOf(date)
                dateScrollLeft.value = index * 80
            }
            val onTimeUpdate = fun(e: UniVideoTimeUpdateEvent){
                if (isSeeking.value || isDragging.value) {
                    return
                }
                val currentTimeInSeconds = e.detail.currentTime
                currentTime.value = formatTime(currentTimeInSeconds)
                val now = Date.now()
                if (now - lastSyncTime.value < 200) {
                    return
                }
                lastSyncTime.value = now
                updatePlayheadPosition(currentTimeInSeconds)
            }
            val updatePlayheadPosition = fun(currentTimeInSeconds){
                val newPosition = currentTimeInSeconds * 2
                playheadPosition.value = newPosition
                if (Math.abs(manualScrollPosition.value - newPosition) > 60) {
                    val systemInfo = uni_getSystemInfoSync()
                    val scrollViewWidth = systemInfo.windowWidth || 375
                    val halfWidth = scrollViewWidth / 2
                    val targetScrollLeft = newPosition - halfWidth
                    val maxScrollLeft = rulerWidth.value - scrollViewWidth
                    timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft))
                }
            }
            val seekToTime = fun(hour, minute){
                val timeInSeconds = hour * 3600 + minute * 60
                seekToSeconds(timeInSeconds)
            }
            val seekToSeconds = fun(timeInSeconds){
                isSeeking.value = true
                manualScrollPosition.value = timeInSeconds * 2
                if (videoContext.value) {
                    videoContext.value!!.seek(timeInSeconds)
                }
                playheadPosition.value = timeInSeconds * 2
                currentTime.value = formatTime(timeInSeconds)
            }
            val onSeeked = fun(){
                isSeeking.value = false
            }
            val onTouchStart = fun(e){
                isDragging.value = true
                startX.value = e.touches[0].pageX
                startScrollLeft.value = timeScrollLeft.value
                lastDragTime.value = Date.now()
                isSeeking.value = true
                if (videoContext.value) {
                    videoContext.value!!.pause()
                }
            }
            val onTouchMove = fun(e){
                if (!isDragging.value) {
                    return
                }
                val deltaX = e.touches[0].pageX - startX.value
                val newScrollLeft = startScrollLeft.value - deltaX
                val systemInfo = uni_getSystemInfoSync()
                val scrollViewWidth = systemInfo.windowWidth || 375
                val maxScrollLeft = rulerWidth.value - scrollViewWidth
                timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, newScrollLeft))
                val touchX = e.touches[0].pageX
                val rulerStartX = touchX - startX.value + startScrollLeft.value
                val timeInSeconds = rulerStartX / 2
                currentTime.value = formatTime(timeInSeconds)
                playheadPosition.value = timeInSeconds * 2
                manualScrollPosition.value = timeInSeconds * 2
                val now = Date.now()
                if (now - lastDragTime.value > 100) {
                    if (videoContext.value) {
                        console.log("尝试跳转视频到:", timeInSeconds, "秒", " at pages/index/deviceReplay.uvue:299")
                        draggedTimeInSeconds.value = timeInSeconds
                        videoContext.value!!.seek(timeInSeconds)
                    }
                    lastDragTime.value = now
                }
            }
            val onTouchEnd = fun(){
                if (!isDragging.value) {
                    return
                }
                val systemInfo = uni_getSystemInfoSync()
                val scrollViewWidth = systemInfo.windowWidth || 375
                val timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / 2
                if (videoContext.value) {
                    console.log("尝试跳转视频到最终时间:", draggedTimeInSeconds.value, "秒", " at pages/index/deviceReplay.uvue:319")
                    videoContext.value!!.seek(draggedTimeInSeconds.value)
                    videoContext.value!!.play()
                }
                playheadPosition.value = timeInSeconds * 2
                currentTime.value = formatTime(timeInSeconds)
                manualScrollPosition.value = timeInSeconds * 2
                isDragging.value = false
                isSeeking.value = false
            }
            val onTimeScroll = fun(e){
                if (!isDragging.value) {
                    timeScrollLeft.value = e.detail.scrollLeft
                }
            }
            val selectFilter = fun(filter){
                activeFilter.value = filter
            }
            val hasEvent = fun(hour, minute): Boolean {
                val timeStr = "" + hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0")
                val events = filteredEvents.value
                run {
                    var i: Number = 0
                    while(i < events.length){
                        val event = events[i]
                        if (event.date === activeDate.value && event.time.startsWith(timeStr)) {
                            return true
                        }
                        i++
                    }
                }
                return false
            }
            val getEventType = fun(hour, minute): String {
                val timeStr = "" + hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0")
                val eventsList = events.value
                run {
                    var i: Number = 0
                    while(i < eventsList.length){
                        val event = eventsList[i]
                        if (event.date === activeDate.value && event.time.startsWith(timeStr)) {
                            return event.type
                        }
                        i++
                    }
                }
                return ""
            }
            val formatHour = fun(hour): String {
                return "" + hour.toString().padStart(2, "0") + ":00"
            }
            val formatTime = fun(seconds): String {
                val hrs = Math.floor(seconds / 3600)
                val mins = Math.floor((seconds % 3600) / 60)
                val secs = Math.floor(seconds % 60)
                return "" + hrs.toString(10).padStart(2, "0") + ":" + mins.toString(10).padStart(2, "0") + ":" + secs.toString(10).padStart(2, "0")
            }
            val onPlay = fun(){
                console.log("视频开始播放", " at pages/index/deviceReplay.uvue:385")
            }
            val onPause = fun(){
                console.log("视频暂停", " at pages/index/deviceReplay.uvue:389")
            }
            onMounted(fun(){
                initVideoContext()
                if (!videoContext.value) {
                    console.error("视频上下文初始化失败，请检查", " at pages/index/deviceReplay.uvue:396")
                }
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "header"), _uA(
                        _cE("text", _uM("class" to "title"), "监控视频回放"),
                        _cE("text", _uM("class" to "current-time"), _tD(currentDate.value) + " " + _tD(currentTime.value), 1)
                    )),
                    _cE("scroll-view", _uM("class" to "date-scroll", "scroll-x" to "", "scroll-left" to dateScrollLeft.value), _uA(
                        _cE("view", _uM("class" to "date-list"), _uA(
                            _cE(Fragment, null, RenderHelpers.renderList(dateList, fun(date, index, __index, _cached): Any {
                                return _cE("view", _uM("key" to index, "class" to _nC(_uA(
                                    "date-item",
                                    if (activeDate.value === date) {
                                        "active"
                                    } else {
                                        ""
                                    }
                                )), "onClick" to fun(){
                                    selectDate(date)
                                }
                                ), _tD(date), 11, _uA(
                                    "onClick"
                                ))
                            }
                            ), 64)
                        ))
                    ), 8, _uA(
                        "scroll-left"
                    )),
                    _cE("view", _uM("class" to "video-container"), _uA(
                        _cE("video", _uM("id" to "myVideo", "src" to videoSrc.value, "controls" to true, "class" to "video-player", "onTimeupdate" to onTimeUpdate, "onPlay" to onPlay, "onPause" to onPause, "onSeeked" to onSeeked), null, 40, _uA(
                            "src"
                        ))
                    )),
                    _cE("view", _uM("class" to "time-ruler-container"), _uA(
                        _cE("scroll-view", _uM("class" to "time-ruler-scroll", "scroll-x" to "", "scroll-left" to timeScrollLeft.value, "scroll-with-animation" to "", "onScroll" to onTimeScroll), _uA(
                            _cE("view", _uM("class" to "time-ruler", "style" to _nS(_uM("width" to (rulerWidth.value + "px"))), "onTouchstart" to onTouchStart, "onTouchmove" to onTouchMove, "onTouchend" to onTouchEnd), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(24, fun(hour, __key, __index, _cached): Any {
                                    return _cE("view", _uM("key" to ("hour-" + hour), "class" to "hour-section"), _uA(
                                        _cE("view", _uM("class" to "hour-mark"), _tD(formatHour(hour - 1)), 1),
                                        _cE("view", _uM("class" to "minute-marks"), _uA(
                                            _cE(Fragment, null, RenderHelpers.renderList(minuteMarks, fun(minute, __key, __index, _cached): Any {
                                                return _cE("view", _uM("key" to ("min-" + hour + "-" + minute), "class" to "minute-mark", "onClick" to fun(){
                                                    seekToTime(hour - 1, minute)
                                                }
                                                ), _uA(
                                                    if (isTrue(hasEvent(hour - 1, minute))) {
                                                        _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                                            "event-dot",
                                                            getEventType(hour - 1, minute)
                                                        ))), null, 2)
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                    ,
                                                    if (minute % 15 === 0) {
                                                        _cE("text", _uM("key" to 1, "class" to "minute-label"), _tD(minute), 1)
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                ), 8, _uA(
                                                    "onClick"
                                                ))
                                            }
                                            ), 64)
                                        ))
                                    ))
                                }
                                ), 64),
                                _cE("view", _uM("class" to "playhead", "style" to _nS(_uM("left" to (playheadPosition.value + "px")))), null, 4),
                                _cE("view", _uM("class" to "time-indicator", "style" to _nS(_uM("left" to (playheadPosition.value + "px")))), _tD(currentTime.value.split(":").slice(0, 2).join(":")), 5)
                            ), 36)
                        ), 40, _uA(
                            "scroll-left"
                        ))
                    )),
                    _cE("view", _uM("class" to "filter-bar"), _uA(
                        _cE(Fragment, null, RenderHelpers.renderList(filters, fun(filter, __key, __index, _cached): Any {
                            return _cE("view", _uM("key" to filter["value"], "class" to _nC(_uA(
                                "filter-item",
                                if (activeFilter.value === filter["value"]) {
                                    "active"
                                } else {
                                    ""
                                }
                            )), "onClick" to fun(){
                                selectFilter(filter["value"])
                            }
                            ), _tD(filter["label"]), 11, _uA(
                                "onClick"
                            ))
                        }
                        ), 64)
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f5f5f5")), "header" to _pS(_uM("paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "backgroundColor" to "#007aff", "color" to "#FFFFFF", "display" to "flex", "justifyContent" to "space-between", "alignItems" to "center", "position" to "relative", "zIndex" to 10)), "title" to _pS(_uM("fontSize" to 18, "fontWeight" to "bold")), "current-time" to _pS(_uM("fontSize" to 14, "opacity" to 0.9)), "date-scroll" to _pS(_uM("width" to "100%", "whiteSpace" to "nowrap", "backgroundColor" to "#333333", "paddingTop" to 8, "paddingRight" to 0, "paddingBottom" to 8, "paddingLeft" to 0, "position" to "relative", "zIndex" to 10, "boxShadow" to "0 2px 5px rgba(0,0,0,0.2)")), "date-list" to _pS(_uM("paddingTop" to 0, "paddingRight" to 10, "paddingBottom" to 0, "paddingLeft" to 10)), "date-item" to _uM("" to _uM("paddingTop" to 8, "paddingRight" to 16, "paddingBottom" to 8, "paddingLeft" to 16, "marginTop" to 0, "marginRight" to 5, "marginBottom" to 0, "marginLeft" to 5, "borderTopLeftRadius" to 16, "borderTopRightRadius" to 16, "borderBottomRightRadius" to 16, "borderBottomLeftRadius" to 16, "backgroundColor" to "#555555", "color" to "#FFFFFF", "fontSize" to 14, "transitionProperty" to "all", "transitionDuration" to "0.2s"), ".active" to _uM("backgroundColor" to "#007aff", "fontWeight" to "bold", "transform" to "scale(1.05)")), "video-container" to _pS(_uM("width" to "100%", "height" to 250, "backgroundColor" to "#000000", "position" to "relative")), "video-player" to _pS(_uM("width" to "100%", "height" to "100%")), "time-ruler-container" to _pS(_uM("width" to "100%", "paddingTop" to 10, "paddingRight" to 0, "paddingBottom" to 10, "paddingLeft" to 0, "backgroundColor" to "#333333", "position" to "relative", "zIndex" to 5, "boxShadow" to "0 -2px 5px rgba(0,0,0,0.2)")), "time-ruler-scroll" to _pS(_uM("width" to "100%", "height" to 70, "whiteSpace" to "nowrap")), "time-ruler" to _pS(_uM("height" to "100%", "paddingLeft" to 10, "position" to "relative", "touchAction" to "none", "userSelect" to "none")), "hour-section" to _pS(_uM("display" to "flex", "flexDirection" to "column", "width" to 120, "borderRightWidth" to 1, "borderRightStyle" to "solid", "borderRightColor" to "#444444", "position" to "relative")), "hour-mark" to _pS(_uM("color" to "#FFFFFF", "fontSize" to 12, "paddingTop" to 4, "paddingRight" to 8, "paddingBottom" to 4, "paddingLeft" to 8, "backgroundColor" to "#444444", "borderTopLeftRadius" to 4, "borderTopRightRadius" to 4, "borderBottomRightRadius" to 4, "borderBottomLeftRadius" to 4, "marginTop" to 2, "marginRight" to 2, "marginBottom" to 2, "marginLeft" to 2, "textAlign" to "center")), "minute-marks" to _pS(_uM("display" to "flex", "flex" to 1, "position" to "relative")), "minute-mark" to _pS(_uM("flex" to 1, "position" to "relative", "borderRightWidth" to 1, "borderRightStyle" to "solid", "borderRightColor" to "#444444")), "minute-label" to _pS(_uM("position" to "absolute", "bottom" to 5, "left" to 2, "color" to "#aaaaaa", "fontSize" to 10)), "event-dot" to _uM("" to _uM("position" to "absolute", "top" to 8, "left" to "50%", "transform" to "translateX(-50%)", "width" to 8, "height" to 8, "zIndex" to 2), ".alarm" to _uM("backgroundColor" to "#ff3b30", "boxShadow" to "0 0 5px #ff3b30"), ".motion" to _uM("backgroundColor" to "#ff9500", "boxShadow" to "0 0 5px #ff9500"), ".human" to _uM("backgroundColor" to "#34c759", "boxShadow" to "0 0 5px #34c759")), "playhead" to _pS(_uM("position" to "absolute", "top" to 0, "width" to 2, "height" to "100%", "backgroundColor" to "#007aff", "zIndex" to 10, "pointerEvents" to "none", "content::after" to "''", "position::after" to "absolute", "top::after" to 0, "left::after" to -6, "width::after" to 14, "height::after" to 14, "backgroundColor::after" to "#007aff", "borderTopWidth::after" to 2, "borderRightWidth::after" to 2, "borderBottomWidth::after" to 2, "borderLeftWidth::after" to 2, "borderTopStyle::after" to "solid", "borderRightStyle::after" to "solid", "borderBottomStyle::after" to "solid", "borderLeftStyle::after" to "solid", "borderTopColor::after" to "#FFFFFF", "borderRightColor::after" to "#FFFFFF", "borderBottomColor::after" to "#FFFFFF", "borderLeftColor::after" to "#FFFFFF", "boxSizing::after" to "border-box")), "time-indicator" to _pS(_uM("position" to "absolute", "top" to -25, "left" to 0, "transform" to "translateX(-50%)", "backgroundColor" to "#007aff", "color" to "#FFFFFF", "paddingTop" to 3, "paddingRight" to 8, "paddingBottom" to 3, "paddingLeft" to 8, "borderTopLeftRadius" to 4, "borderTopRightRadius" to 4, "borderBottomRightRadius" to 4, "borderBottomLeftRadius" to 4, "fontSize" to 12, "zIndex" to 11, "pointerEvents" to "none", "whiteSpace" to "nowrap", "content::after" to "''", "position::after" to "absolute", "bottom::after" to -5, "left::after" to "50%", "transform::after" to "translateX(-50%)", "width::after" to 0, "height::after" to 0, "borderLeftWidth::after" to 5, "borderLeftStyle::after" to "solid", "borderLeftColor::after" to "rgba(0,0,0,0)", "borderRightWidth::after" to 5, "borderRightStyle::after" to "solid", "borderRightColor::after" to "rgba(0,0,0,0)", "borderTopWidth::after" to 5, "borderTopStyle::after" to "solid", "borderTopColor::after" to "#007aff")), "filter-bar" to _pS(_uM("display" to "flex", "justifyContent" to "space-around", "paddingTop" to 12, "paddingRight" to 5, "paddingBottom" to 12, "paddingLeft" to 5, "backgroundColor" to "#333333", "position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "zIndex" to 20, "boxShadow" to "0 -2px 10px rgba(0,0,0,0.3)")), "filter-item" to _uM("" to _uM("paddingTop" to 8, "paddingRight" to 12, "paddingBottom" to 8, "paddingLeft" to 12, "borderTopLeftRadius" to 16, "borderTopRightRadius" to 16, "borderBottomRightRadius" to 16, "borderBottomLeftRadius" to 16, "backgroundColor" to "#555555", "color" to "#FFFFFF", "fontSize" to 12, "transitionProperty" to "all", "transitionDuration" to "0.2s", "flex" to 1, "marginTop" to 0, "marginRight" to 5, "marginBottom" to 0, "marginLeft" to 5, "textAlign" to "center"), ".active" to _uM("backgroundColor" to "#007aff", "fontWeight" to "bold", "transform" to "scale(1.05)")), "@TRANSITION" to _uM("date-item" to _uM("property" to "all", "duration" to "0.2s"), "filter-item" to _uM("property" to "all", "duration" to "0.2s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
