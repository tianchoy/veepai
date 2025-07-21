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
            val events = ref(_uA<EventType>(EventType(date = "10-21", time = "00:00:10", type = "alarm"), EventType(date = "10-21", time = "00:00:30", type = "motion"), EventType(date = "10-21", time = "00:01:45", type = "human"), EventType(date = "10-21", time = "00:01:20", type = "alarm")))
            val rulerWidth = computed(fun(): Number {
                val systemInfo = uni_getSystemInfoSync()
                return systemInfo.windowWidth
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
            val timeMarks = computed<UTSArray<TimeMark>>(fun(): UTSArray<TimeMark> {
                val marks = _uA<TimeMark>()
                val duration = videoDuration.value
                if (duration == 0) {
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
                val minorInterval = majorInterval / 10
                val pixelsPerSecond = rulerWidth.value / duration
                run {
                    var time: Number = 0
                    while(time <= duration){
                        val isMajor = (time % majorInterval) == 0
                        marks.push(TimeMark(time = time, position = time * pixelsPerSecond + 3, type = if (isMajor) {
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
            val onVideoLoaded = fun(e: UTSJSONObject){
                videoDuration.value = e["duration"] as Number
                console.log("视频加载完成，时长:", videoDuration.value, " at pages/index/deviceReplay.uvue:155")
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
            val initVideoContext = fun(){
                try {
                    videoContext.value = uni_createVideoContext("myVideo", null)
                    console.log("视频上下文初始化成功", videoContext.value, " at pages/index/deviceReplay.uvue:180")
                }
                 catch (error: Throwable) {
                    console.error("创建视频上下文失败:", error, " at pages/index/deviceReplay.uvue:182")
                }
            }
            val loadVideoData = fun(date: String){
                console.log("加载日期数据:", date, " at pages/index/deviceReplay.uvue:187")
            }
            val selectDate = fun(date: String){
                activeDate.value = date
                currentDate.value = "2024-" + date
                loadVideoData(date)
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
                val scrollViewWidth = systemInfo.windowWidth
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
                updatePlayheadPosition(currentTimeInSeconds - 1)
            }
            val seekToSeconds = fun(timeInSeconds: Number){
                console.log("尝试跳转到:", timeInSeconds, "秒", " at pages/index/deviceReplay.uvue:236")
                if (videoContext.value != null) {
                    videoContext.value!!.pause()
                    videoContext.value!!.seek(timeInSeconds)
                    setTimeout(fun(){
                        videoContext.value?.play()
                        console.log("跳转完成，应开始播放", " at pages/index/deviceReplay.uvue:242")
                    }
                    , 100)
                }
            }
            val getEventPosition = fun(event: EventType): Number {
                val seconds = convertTimeToSeconds(event.time)
                val duration = if (videoDuration.value != 0) {
                    videoDuration.value
                } else {
                    300
                }
                val pixelsPerSecond = rulerWidth.value / duration
                return seconds * pixelsPerSecond
            }
            val seekToEvent = fun(event: EventType){
                val seconds = convertTimeToSeconds(event.time)
                console.log("点击事件时间点：", seconds, "秒", "当前视频时长:", videoDuration.value, " at pages/index/deviceReplay.uvue:258")
                if (videoContext.value == null) {
                    console.error("视频上下文未初始化", " at pages/index/deviceReplay.uvue:261")
                    return
                }
                isSeeking.value = true
                currentTime.value = formatTime(seconds)
                playheadPosition.value = getEventPosition(event)
                videoContext.value!!.pause()
                videoContext.value!!.seek(seconds)
                setTimeout(fun(){
                    videoContext.value?.play()
                    isSeeking.value = false
                    console.log("应已跳转到指定位置并开始播放", " at pages/index/deviceReplay.uvue:277")
                }
                , 150)
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
                val scrollViewWidth = systemInfo.windowWidth
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
                val scrollViewWidth = systemInfo.windowWidth
                val pixelsPerSecond = rulerWidth.value / videoDuration.value
                val timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / pixelsPerSecond
                if (videoContext.value != null) {
                    console.log("尝试跳转视频到最终时间:", draggedTimeInSeconds.value, "秒", " at pages/index/deviceReplay.uvue:357")
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
                console.log("视频开始播放", " at pages/index/deviceReplay.uvue:423")
            }
            val onPause = fun(){
                console.log("视频暂停", " at pages/index/deviceReplay.uvue:428")
            }
            onMounted(fun(){
                initVideoContext()
                if (videoContext.value == null) {
                    console.error("视频上下文初始化失败，请检查", " at pages/index/deviceReplay.uvue:435")
                }
            }
            )
            return fun(): Any? {
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "video-container"), _uA(
                        _cE("video", _uM("id" to "myVideo", "src" to videoSrc.value, "controls" to true, "class" to "video-player", "onTimeupdate" to onTimeUpdate, "onPlay" to onPlay, "onPause" to onPause, "onSeeked" to onSeeked, "autoplay" to true, "onLoadedmetadata" to onVideoLoaded), null, 40, _uA(
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
                                            _cE("text", _uM("key" to 0, "class" to "mark-label"))
                                        } else {
                                            _cC("v-if", true)
                                        }
                                    ), 14, _uA(
                                        "onClick"
                                    ))
                                }
                                ), 128),
                                _cE(Fragment, null, RenderHelpers.renderList(filteredEvents.value, fun(event, index, __index, _cached): Any {
                                    return _cE("view", _uM("key" to ("event-" + index), "class" to "event-marker", "style" to _nS(_uM("left" to (getEventPosition(event) + "px"))), "onClick" to withModifiers(fun(){
                                        seekToEvent(event)
                                    }
                                    , _uA(
                                        "stop"
                                    ))), _uA(
                                        _cE("view", _uM("class" to _nC(_uA(
                                            "event-dot",
                                            event.type
                                        ))), null, 2)
                                    ), 12, _uA(
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
                return _uM("container" to _pS(_uM("display" to "flex", "flexDirection" to "column", "height" to "100%", "backgroundColor" to "#f5f5f5")), "date-list" to _pS(_uM("display" to "flex", "flexDirection" to "row", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "date-item" to _uM("" to _uM("paddingTop" to 8, "paddingRight" to 16, "paddingBottom" to 8, "paddingLeft" to 16, "marginTop" to 0, "marginRight" to 5, "marginBottom" to 0, "marginLeft" to 5, "borderTopLeftRadius" to 16, "borderTopRightRadius" to 16, "borderBottomRightRadius" to 16, "borderBottomLeftRadius" to 16, "backgroundColor" to "#555555", "color" to "#FFFFFF", "fontSize" to 14, "transitionProperty" to "all", "transitionDuration" to "0.2s"), ".active" to _uM("backgroundColor" to "#007aff", "color" to "#ffffff")), "video-container" to _pS(_uM("width" to "100%", "height" to 250, "backgroundColor" to "#000000", "position" to "relative")), "video-player" to _pS(_uM("width" to "100%", "height" to "100%")), "time-ruler-container" to _pS(_uM("width" to "100%", "paddingTop" to 10, "paddingRight" to 0, "paddingBottom" to 10, "paddingLeft" to 0, "backgroundColor" to "#ffffff", "position" to "relative", "zIndex" to 5)), "time-ruler-scroll" to _pS(_uM("width" to "100%", "height" to 70, "whiteSpace" to "nowrap")), "playhead" to _pS(_uM("position" to "absolute", "top" to 0, "width" to 2, "height" to "100%", "backgroundColor" to "#007aff", "zIndex" to 10, "pointerEvents" to "none")), "filter-bar" to _pS(_uM("display" to "flex", "justifyContent" to "space-around", "flexDirection" to "row", "paddingTop" to 12, "paddingRight" to 5, "paddingBottom" to 12, "paddingLeft" to 5, "backgroundColor" to "#ffffff", "zIndex" to 20)), "filter-item" to _uM("" to _uM("paddingTop" to 8, "paddingRight" to 12, "paddingBottom" to 8, "paddingLeft" to 12, "borderTopLeftRadius" to 16, "borderTopRightRadius" to 16, "borderBottomRightRadius" to 16, "borderBottomLeftRadius" to 16, "backgroundColor" to "#555555", "color" to "#FFFFFF", "fontSize" to 12, "transitionProperty" to "all", "transitionDuration" to "0.2s", "flex" to 1, "marginTop" to 0, "marginRight" to 5, "marginBottom" to 0, "marginLeft" to 5, "textAlign" to "center"), ".active" to _uM("backgroundColor" to "#007aff", "fontWeight" to "bold", "transform" to "scale(1.05)")), "time-ruler" to _pS(_uM("display" to "flex", "height" to "100%", "position" to "relative", "width" to "100%", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#cccccc")), "time-mark" to _uM("" to _uM("position" to "absolute", "bottom" to 0, "transform" to "translateX(-50%)", "pointerEvents" to "auto"), ".major" to _uM("height" to 20, "backgroundColor" to "#333333", "width" to 2), ".minor" to _uM("height" to 10, "backgroundColor" to "#999999", "width" to 1)), "event-marker" to _pS(_uM("position" to "absolute", "bottom" to 25, "transform" to "translateX(-50%)", "zIndex" to 5)), "event-dot" to _uM("" to _uM("width" to 10, "height" to 10), ".alarm" to _uM("backgroundColor" to "#ff3b30"), ".motion" to _uM("backgroundColor" to "#ff9500"), ".human" to _uM("backgroundColor" to "#34c759")), "@TRANSITION" to _uM("date-item" to _uM("property" to "all", "duration" to "0.2s"), "filter-item" to _uM("property" to "all", "duration" to "0.2s")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
