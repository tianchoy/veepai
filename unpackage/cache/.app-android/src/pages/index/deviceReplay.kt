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
            val dateList = _uA(
                "10-21",
                "10-22",
                "10-23",
                "10-24",
                "10-25",
                "10-26"
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
                val systemInfo = uni_getSystemInfoSync()
                return if (systemInfo.windowWidth != null) {
                    systemInfo.windowWidth
                } else {
                    375
                }
            }
            )
            val convertTimeToSeconds = fun(timeStr: String): Number {
                val parts = timeStr.split(":")
                val h = parseInt(parts[0])
                val m = parseInt(parts[1])
                val s = if (parts.length > 2) {
                    parseInt(parts[2])
                } else {
                    0
                }
                return h * 3600 + m * 60 + s
            }
            val timeMarks = computed(fun(): UTSArray<TimeMark> {
                val marks = _uA<TimeMark>()
                val duration = videoDuration.value
                if (duration === 0) {
                    return marks
                }
                var majorInterval: Number
                if (duration <= 60) {
                    majorInterval = 10
                } else if (duration <= 300) {
                    majorInterval = 30
                } else if (duration <= 1800) {
                    majorInterval = 60
                } else if (duration <= 3600) {
                    majorInterval = 300
                } else if (duration <= 7200) {
                    majorInterval = 600
                } else {
                    majorInterval = 1800
                }
                val minorInterval = majorInterval / 5
                val pixelsPerSecond = rulerWidth.value / duration
                run {
                    var time: Number = 0
                    while(time <= duration){
                        val isMajor = (time % majorInterval) === 0
                        marks.push(TimeMark(time = time, position = time * pixelsPerSecond, type = if (isMajor) {
                            "major"
                        } else {
                            "minor"
                        }
                        ))
                        time += minorInterval
                    }
                }
                return marks
            }
            )
            val formatMarkTime = fun(seconds: Number): String {
                val hrs = Math.floor(seconds / 3600)
                val mins = Math.floor((seconds % 3600) / 60)
                val secs = Math.floor(seconds % 60)
                if (hrs > 0) {
                    return "" + hrs + ":" + mins.toString(10).padStart(2, "0") + ":" + secs.toString(10).padStart(2, "0")
                }
                return "" + mins + ":" + secs.toString(10).padStart(2, "0")
            }
            val hasEventAtTime = fun(time: Number): Boolean {
                return events.value.some(fun(event): Boolean {
                    val eventTime = convertTimeToSeconds(event.time)
                    return Math.abs(eventTime - time) < 5
                }
                )
            }
            val getEventTypeAtTime = fun(time: Number): String {
                val event = events.value.find(fun(event): Boolean {
                    val eventTime = convertTimeToSeconds(event.time)
                    return Math.abs(eventTime - time) < 5
                }
                )
                return if (event != null) {
                    event.type
                } else {
                    ""
                }
            }
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
            val onDurationChange = fun(e: UTSJSONObject){
                console.log(e, " at pages/index/deviceReplay.uvue:205")
            }
            val initVideoContext = fun(){
                try {
                    videoContext.value = uni_createVideoContext("myVideo", null)
                    console.log("视频上下文初始化成功", videoContext.value, " at pages/index/deviceReplay.uvue:212")
                }
                 catch (error: Throwable) {
                    console.error("创建视频上下文失败:", error, " at pages/index/deviceReplay.uvue:214")
                }
            }
            val loadVideoData = fun(date: String){
                console.log("加载日期数据:", date, " at pages/index/deviceReplay.uvue:219")
            }
            val selectDate = fun(date: String){
                activeDate.value = date
                currentDate.value = "2024-" + date
                loadVideoData(date)
                val index = dateList.indexOf(date)
                dateScrollLeft.value = index * 80
            }
            val formatTime = fun(seconds: Number): String {
                val hrs = Math.floor(seconds / 3600)
                val mins = Math.floor((seconds % 3600) / 60)
                val secs = Math.floor(seconds % 60)
                return "" + hrs.toString(10).padStart(2, "0") + ":" + mins.toString(10).padStart(2, "0") + ":" + secs.toString(10).padStart(2, "0")
            }
            val updatePlayheadPosition = fun(currentTimeInSeconds: Number){
                val pixelsPerSecond = rulerWidth.value / videoDuration.value
                playheadPosition.value = currentTimeInSeconds * pixelsPerSecond
                val systemInfo = uni_getSystemInfoSync()
                val scrollViewWidth = if (systemInfo.windowWidth != null) {
                    systemInfo.windowWidth
                } else {
                    375
                }
                val halfWidth = scrollViewWidth / 2
                val targetScrollLeft = playheadPosition.value - halfWidth
                val maxScrollLeft = rulerWidth.value - scrollViewWidth
                timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft))
            }
            val onTimeUpdate = fun(e: UniVideoTimeUpdateEvent){
                if (isSeeking.value || isDragging.value) {
                    return
                }
                val currentTimeInSeconds = e.detail.currentTime
                currentTime.value = formatTime(currentTimeInSeconds)
                videoDuration.value = e.detail.duration
                val now = Date.now()
                if (now - lastSyncTime.value < 200) {
                    return
                }
                lastSyncTime.value = now
                updatePlayheadPosition(currentTimeInSeconds)
            }
            val seekToSeconds = fun(timeInSeconds: Number){
                isSeeking.value = true
                manualScrollPosition.value = timeInSeconds * 2
                if (videoContext.value != null) {
                    videoContext.value!!.seek(timeInSeconds)
                }
                playheadPosition.value = timeInSeconds * 2
                currentTime.value = formatTime(timeInSeconds)
            }
            val seekToPosition = fun(seconds: Number){
                seekToSeconds(seconds)
            }
            val onSeeked = fun(){
                isSeeking.value = false
            }
            val onTouchStart = fun(e: TouchEvent){
                isDragging.value = true
                startX.value = e.touches[0].pageX
                startScrollLeft.value = startX.value
                lastDragTime.value = Date.now()
                isSeeking.value = true
                if (videoContext.value != null) {
                    videoContext.value!!.pause()
                }
            }
            val onTouchMove = fun(e: TouchEvent){
                if (!isDragging.value) {
                    return
                }
                val deltaX = e.touches[0].pageX - startX.value
                val newScrollLeft = startScrollLeft.value - deltaX
                val systemInfo = uni_getSystemInfoSync()
                val scrollViewWidth = if (systemInfo.windowWidth != null) {
                    systemInfo.windowWidth
                } else {
                    375
                }
                val maxScrollLeft = rulerWidth.value - scrollViewWidth
                timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, newScrollLeft))
                val touchX = e.touches[0].pageX
                val rulerStartX = touchX - startX.value + startScrollLeft.value
                val pixelsPerSecond = rulerWidth.value / videoDuration.value
                val timeInSeconds = rulerStartX / pixelsPerSecond
                currentTime.value = formatTime(timeInSeconds)
                playheadPosition.value = timeInSeconds * pixelsPerSecond
                manualScrollPosition.value = timeInSeconds * pixelsPerSecond
                val now = Date.now()
                if (now - lastDragTime.value > 100) {
                    if (videoContext.value != null) {
                        console.log("尝试跳转视频到:", timeInSeconds, "秒", " at pages/index/deviceReplay.uvue:338")
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
                val scrollViewWidth = if (systemInfo.windowWidth != null) {
                    systemInfo.windowWidth
                } else {
                    375
                }
                val pixelsPerSecond = rulerWidth.value / videoDuration.value
                val timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / pixelsPerSecond
                if (videoContext.value != null) {
                    console.log("尝试跳转视频到最终时间:", draggedTimeInSeconds.value, "秒", " at pages/index/deviceReplay.uvue:359")
                    videoContext.value!!.seek(draggedTimeInSeconds.value)
                    videoContext.value!!.play()
                }
                playheadPosition.value = timeInSeconds * pixelsPerSecond
                currentTime.value = formatTime(timeInSeconds)
                isDragging.value = false
                isSeeking.value = false
            }
            val onTimeScroll = fun(e: TimeScrollEvent){
                if (!isDragging.value) {
                    timeScrollLeft.value = e.detail.scrollLeft
                }
            }
            val selectFilter = fun(filter: String){
                activeFilter.value = filter
            }
            val onPlay = fun(){
                console.log("视频开始播放", " at pages/index/deviceReplay.uvue:425")
            }
            val onPause = fun(){
                console.log("视频暂停", " at pages/index/deviceReplay.uvue:430")
            }
            onMounted(fun(){
                initVideoContext()
                if (videoContext.value == null) {
                    console.error("视频上下文初始化失败，请检查", " at pages/index/deviceReplay.uvue:437")
                }
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to "container"), _uA(
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
                        _cE("video", _uM("id" to "myVideo", "src" to videoSrc.value, "controls" to true, "class" to "video-player", "onTimeupdate" to onTimeUpdate, "onPlay" to onPlay, "onPause" to onPause, "onDurationchange" to onDurationChange, "onSeeked" to onSeeked), null, 40, _uA(
                            "src"
                        ))
                    )),
                    _cE("view", _uM("class" to "time-ruler-container"), _uA(
                        _cE("scroll-view", _uM("class" to "time-ruler-scroll", "scroll-x" to "", "scroll-left" to timeScrollLeft.value, "scroll-with-animation" to "", "onScroll" to onTimeScroll), _uA(
                            _cE("view", _uM("class" to "time-ruler", "style" to _nS(_uM("width" to (rulerWidth.value + "px"))), "onTouchstart" to onTouchStart, "onTouchmove" to onTouchMove, "onTouchend" to onTouchEnd), _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(timeMarks.value, fun(mark, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to ("mark-" + index), "class" to _nC(_uA(
                                        "time-mark",
                                        mark.type
                                    )), "style" to _nS(_uM("left" to (mark.position + "px"))), "onClick" to fun(){
                                        seekToPosition(mark.time)
                                    }
                                    ), _uA(
                                        if (mark.type === "major") {
                                            _cE("text", _uM("key" to 0, "class" to "mark-label"), _tD(formatMarkTime(mark.time)), 1)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                        ,
                                        if (isTrue(hasEventAtTime(mark.time))) {
                                            _cE("view", _uM("key" to 1, "class" to _nC(_uA(
                                                "event-dot",
                                                getEventTypeAtTime(mark.time)
                                            ))), null, 2)
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ), 14, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128),
                                _cE("view", _uM("class" to "playhead", "style" to _nS(_uM("left" to (playheadPosition.value + "px")))), null, 4)
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
                                selectFilter(filter["value"] as String)
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "backgroundColor" to "#f5f5f5")), "header" to _pS(_uM("paddingTop" to 15, "paddingRight" to 15, "paddingBottom" to 15, "paddingLeft" to 15, "backgroundColor" to "#007aff", "color" to "#FFFFFF", "display" to "flex", "justifyContent" to "space-between", "alignItems" to "center", "position" to "relative", "zIndex" to 10)), "title" to _pS(_uM("fontSize" to 18, "fontWeight" to "bold")), "current-time" to _pS(_uM("fontSize" to 14, "opacity" to 0.9)), "date-list" to _pS(_uM("paddingTop" to 0, "paddingRight" to 10, "paddingBottom" to 0, "paddingLeft" to 10)), "date-item" to _uM("" to _uM("paddingTop" to 8, "paddingRight" to 16, "paddingBottom" to 8, "paddingLeft" to 16, "marginTop" to 0, "marginRight" to 5, "marginBottom" to 0, "marginLeft" to 5, "borderTopLeftRadius" to 16, "borderTopRightRadius" to 16, "borderBottomRightRadius" to 16, "borderBottomLeftRadius" to 16, "backgroundColor" to "#555555", "color" to "#FFFFFF", "fontSize" to 14, "transitionProperty" to "all", "transitionDuration" to "0.2s"), ".active" to _uM("backgroundColor" to "#007aff", "fontWeight" to "bold", "transform" to "scale(1.05)")), "video-container" to _pS(_uM("width" to "100%", "height" to 250, "backgroundColor" to "#000000", "position" to "relative")), "video-player" to _pS(_uM("width" to "100%", "height" to "100%")), "time-ruler-container" to _pS(_uM("width" to "100%", "paddingTop" to 10, "paddingRight" to 0, "paddingBottom" to 10, "paddingLeft" to 0, "backgroundColor" to "#333333", "position" to "relative", "zIndex" to 5, "boxShadow" to "0 -2px 5px rgba(0, 0, 0, 0.2)")), "time-ruler-scroll" to _pS(_uM("width" to "100%", "height" to 70, "whiteSpace" to "nowrap")), "event-dot" to _uM("" to _uM("position" to "absolute", "top" to -15, "left" to "50%", "transform" to "translateX(-50%)", "width" to 8, "height" to 8, "zIndex" to 2), ".alarm" to _uM("backgroundColor" to "#ff3b30", "boxShadow" to "0 0 5px #ff3b30"), ".motion" to _uM("backgroundColor" to "#ff9500", "boxShadow" to "0 0 5px #ff9500"), ".human" to _uM("backgroundColor" to "#34c759", "boxShadow" to "0 0 5px #34c759")), "playhead" to _pS(_uM("position" to "absolute", "top" to 0, "width" to 2, "height" to "100%", "backgroundColor" to "#007aff", "zIndex" to 10, "pointerEvents" to "none", "content::after" to "''", "position::after" to "absolute", "top::after" to 0, "left::after" to -6, "width::after" to 14, "height::after" to 14, "backgroundColor::after" to "#007aff", "borderTopWidth::after" to 2, "borderRightWidth::after" to 2, "borderBottomWidth::after" to 2, "borderLeftWidth::after" to 2, "borderTopStyle::after" to "solid", "borderRightStyle::after" to "solid", "borderBottomStyle::after" to "solid", "borderLeftStyle::after" to "solid", "borderTopColor::after" to "#FFFFFF", "borderRightColor::after" to "#FFFFFF", "borderBottomColor::after" to "#FFFFFF", "borderLeftColor::after" to "#FFFFFF", "boxSizing::after" to "border-box")), "filter-bar" to _pS(_uM("display" to "flex", "justifyContent" to "space-around", "paddingTop" to 12, "paddingRight" to 5, "paddingBottom" to 12, "paddingLeft" to 5, "backgroundColor" to "#333333", "position" to "fixed", "bottom" to 0, "left" to 0, "right" to 0, "zIndex" to 20, "boxShadow" to "0 -2px 10px rgba(0, 0, 0, 0.3)")), "filter-item" to _uM("" to _uM("paddingTop" to 8, "paddingRight" to 12, "paddingBottom" to 8, "paddingLeft" to 12, "borderTopLeftRadius" to 16, "borderTopRightRadius" to 16, "borderBottomRightRadius" to 16, "borderBottomLeftRadius" to 16, "backgroundColor" to "#555555", "color" to "#FFFFFF", "fontSize" to 12, "transitionProperty" to "all", "transitionDuration" to "0.2s", "flex" to 1, "marginTop" to 0, "marginRight" to 5, "marginBottom" to 0, "marginLeft" to 5, "textAlign" to "center"), ".active" to _uM("backgroundColor" to "#007aff", "fontWeight" to "bold", "transform" to "scale(1.05)")), "time-ruler" to _pS(_uM("display" to "flex", "height" to "100%", "position" to "relative", "width" to "100%", "touchAction" to "none", "userSelect" to "none")), "time-mark" to _uM("" to _uM("position" to "absolute", "bottom" to 0, "transform" to "translateX(-50%)", "pointerEvents" to "auto"), ".major" to _uM("height" to 20, "backgroundColor" to "#ffffff", "width" to 2), ".minor" to _uM("height" to 10, "backgroundColor" to "rgba(255,255,255,0.6)", "width" to 1)), "@TRANSITION" to _uM("date-item" to _uM("property" to "all", "duration" to "0.2s"), "filter-item" to _uM("property" to "all", "duration" to "0.2s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
