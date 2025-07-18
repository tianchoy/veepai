import { ref, computed, onMounted, getCurrentInstance } from 'vue'


const __sfc__ = defineComponent({
  __name: 'deviceReplay',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

class EventType {
  date: string;
  time: string;
  type: string;

  constructor(date: string, time: string, type: string) {
    this.date = date;
    this.time = time;
    this.type = type;
  }
}
// 响应式状态
const currentDate = ref('2024-10-21')
const currentTime = ref('00:00:00')
const activeDate = ref('10-21')
const activeFilter = ref('all')
const videoSrc = ref('https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4')
const videoContext = ref<VideoContext | null>(null)
const isSeeking = ref(false)
const timeScrollLeft = ref(0)
const dateScrollLeft = ref(0)
const playheadPosition = ref(0)
const videoDuration = ref(0)
const lastSyncTime = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startScrollLeft = ref(0)
const lastDragTime = ref(0)
const manualScrollPosition = ref(0)
const draggedTimeInSeconds = ref(0)

// 获取当前组件实例
const instance = getCurrentInstance()

// 常量配置
const dateList = ['10-21', '10-22', '10-23', '10-24', '10-25', '10-26']
const minuteMarks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
const filters = [
  { label: '只看报警', value: 'alarm' },
  { label: '移动侦测', value: 'motion' },
  { label: '人形侦测', value: 'human' },
  { label: '全部', value: 'all' }
]

// 模拟事件数据
const events = ref<EventType[]>([
  { date: '10-21', time: '00:15', type: 'alarm' },
  { date: '10-21', time: '00:30', type: 'motion' },
  { date: '10-21', time: '01:45', type: 'human' },
  { date: '10-21', time: '01:20', type: 'alarm' }
])

// 计算属性
const rulerWidth = computed(() => 24 * 120) // 24小时 * 每小时120px
const filteredEvents = computed<EventType[]>(() => {
  if (activeFilter.value === 'all') return events.value
  return events.value.filter((e) => e.type === activeFilter.value)
})

// 初始化视频上下文
const initVideoContext = () => {
  try {
    videoContext.value = uni.createVideoContext('myVideo');
    console.log('视频上下文初始化成功', videoContext.value, " at pages/index/deviceReplay.uvue:176");
  } catch (error) {
    console.error('创建视频上下文失败:', error, " at pages/index/deviceReplay.uvue:178");
  }
}
// 加载视频数据
const loadVideoData = (date:String) => {
  console.log('加载日期数据:', date, " at pages/index/deviceReplay.uvue:183")
}


// 选择日期
const selectDate = (date:String) => {
  activeDate.value = date
  currentDate.value = `2024-${date}`
  loadVideoData(date)
  
  const index = dateList.indexOf(date)
  dateScrollLeft.value = index * 80
}



// 视频元数据加载完成
// const onVideoLoaded = (e:UniVideoLoadedMetadataEvent) => {
//   videoDuration.value = e.detail.duration;
//   console.log('视频元数据加载完成，视频时长:', videoDuration.value, '秒');
// }

// 视频时间更新 
const onTimeUpdate = (e:UniVideoTimeUpdateEvent) => {
  if (isSeeking.value || isDragging.value) return
  
  const currentTimeInSeconds = e.detail.currentTime
  currentTime.value = formatTime(currentTimeInSeconds)
  
  // 节流处理
  const now = Date.now()
  if (now - lastSyncTime.value < 200) return
  lastSyncTime.value = now
  
  updatePlayheadPosition(currentTimeInSeconds)
}

// 更新播放头位置
const updatePlayheadPosition = (currentTimeInSeconds) => {
  const newPosition = currentTimeInSeconds * 2
  playheadPosition.value = newPosition
  
  // 只在非手动滚动时自动滚动时间轴
  if (Math.abs(manualScrollPosition.value - newPosition) > 60) {
    const systemInfo = uni.getSystemInfoSync()
    const scrollViewWidth = systemInfo.windowWidth || 375
    const halfWidth = scrollViewWidth / 2
    const targetScrollLeft = newPosition - halfWidth
    
    const maxScrollLeft = rulerWidth.value - scrollViewWidth
    timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft))
  }
}

// 跳转到指定时间
const seekToTime = (hour, minute) => {
  const timeInSeconds = hour * 3600 + minute * 60
  seekToSeconds(timeInSeconds)
}

const seekToSeconds = (timeInSeconds) => {
  isSeeking.value = true
  manualScrollPosition.value = timeInSeconds * 2
  
  if (videoContext.value) {
    videoContext.value.seek(timeInSeconds)
  }
  
  playheadPosition.value = timeInSeconds * 2
  currentTime.value = formatTime(timeInSeconds)
}

// 跳转完成
const onSeeked = () => {
  isSeeking.value = false
}

// 时间轴触摸开始
const onTouchStart = (e) => {
  isDragging.value = true
  startX.value = e.touches[0].pageX
  startScrollLeft.value = timeScrollLeft.value
  lastDragTime.value = Date.now()
  
  isSeeking.value = true
  if (videoContext.value) {
    videoContext.value.pause()
  }
}

// 时间轴触摸移动
const onTouchMove = (e) => {
  if (!isDragging.value) return
  
  const deltaX = e.touches[0].pageX - startX.value
  const newScrollLeft = startScrollLeft.value - deltaX
  
  const systemInfo = uni.getSystemInfoSync()
  const scrollViewWidth = systemInfo.windowWidth || 375
  const maxScrollLeft = rulerWidth.value - scrollViewWidth
  timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, newScrollLeft))
  
  // 计算当前时间位置（基于触摸点位置）
  const touchX = e.touches[0].pageX
  const rulerStartX = touchX - startX.value + startScrollLeft.value
  const timeInSeconds = rulerStartX / 2
  
  // 更新显示
  currentTime.value = formatTime(timeInSeconds)
  playheadPosition.value = timeInSeconds * 2
  manualScrollPosition.value = timeInSeconds * 2
  
  // 实时跳转视频(节流处理)
  const now = Date.now()
  if (now - lastDragTime.value > 100) {
    if (videoContext.value) {
      console.log('尝试跳转视频到:', timeInSeconds, '秒', " at pages/index/deviceReplay.uvue:299");
      draggedTimeInSeconds.value = timeInSeconds
      videoContext.value.seek(timeInSeconds)
    }
    lastDragTime.value = now
  }
}

// 时间轴触摸结束
const onTouchEnd = () => {
  if (!isDragging.value) return
  
  // 计算最终时间位置
  const systemInfo = uni.getSystemInfoSync()
  const scrollViewWidth = systemInfo.windowWidth || 375
  const timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / 2


  // 精确跳转
  if (videoContext.value) {
    console.log('尝试跳转视频到最终时间:', draggedTimeInSeconds.value, '秒', " at pages/index/deviceReplay.uvue:319");
    videoContext.value.seek(draggedTimeInSeconds.value)
    videoContext.value.play()
  }
  
  playheadPosition.value = timeInSeconds * 2
  currentTime.value = formatTime(timeInSeconds)
  manualScrollPosition.value = timeInSeconds * 2
  
  isDragging.value = false
  isSeeking.value = false
}

// 时间轴滚动事件
const onTimeScroll = (e) => {
  if (!isDragging.value) {
    timeScrollLeft.value = e.detail.scrollLeft
  }
}

// 选择筛选条件
const selectFilter = (filter) => {
  activeFilter.value = filter
}

// 检查指定时间是否有事件
const hasEvent = (hour, minute) => {
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  const events = filteredEvents.value
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    if (event.date === activeDate.value && event.time.startsWith(timeStr)) {
      return true
    }
  }
  return false
}

// 获取事件类型
const getEventType = (hour, minute) => {
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  const eventsList = events.value
  for (let i = 0; i < eventsList.length; i++) {
    const event = eventsList[i]
    if (event.date === activeDate.value && event.time.startsWith(timeStr)) {
      return event.type
    }
  }
  return ''
}

// 格式化小时显示
const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

// 格式化时间显示
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 播放/暂停事件
const onPlay = () => {
  console.log('视频开始播放', " at pages/index/deviceReplay.uvue:385")
}

const onPause = () => {
  console.log('视频暂停', " at pages/index/deviceReplay.uvue:389")
}

// 组件生命周期
onMounted(() => {
  initVideoContext();
  if (!videoContext.value) {
    console.error('视频上下文初始化失败，请检查', " at pages/index/deviceReplay.uvue:396");
  }
});

return (): any | null => {

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "header" }), [
      _cE("text", _uM({ class: "title" }), "监控视频回放"),
      _cE("text", _uM({ class: "current-time" }), _tD(currentDate.value) + " " + _tD(currentTime.value), 1 /* TEXT */)
    ]),
    _cE("scroll-view", _uM({
      class: "date-scroll",
      "scroll-x": "",
      "scroll-left": dateScrollLeft.value
    }), [
      _cE("view", _uM({ class: "date-list" }), [
        _cE(Fragment, null, RenderHelpers.renderList(dateList, (date, index, __index, _cached): any => {
          return _cE("view", _uM({
            key: index,
            class: _nC(['date-item', activeDate.value === date ? 'active' : '']),
            onClick: () => {selectDate(date)}
          }), _tD(date), 11 /* TEXT, CLASS, PROPS */, ["onClick"])
        }), 64 /* STABLE_FRAGMENT */)
      ])
    ], 8 /* PROPS */, ["scroll-left"]),
    _cE("view", _uM({ class: "video-container" }), [
      _cE("video", _uM({
        id: "myVideo",
        src: videoSrc.value,
        controls: true,
        class: "video-player",
        onTimeupdate: onTimeUpdate,
        onPlay: onPlay,
        onPause: onPause,
        onSeeked: onSeeked
      }), null, 40 /* PROPS, NEED_HYDRATION */, ["src"])
    ]),
    _cE("view", _uM({ class: "time-ruler-container" }), [
      _cE("scroll-view", _uM({
        class: "time-ruler-scroll",
        "scroll-x": "",
        "scroll-left": timeScrollLeft.value,
        "scroll-with-animation": "",
        onScroll: onTimeScroll
      }), [
        _cE("view", _uM({
          class: "time-ruler",
          style: _nS(_uM({ width: rulerWidth.value + 'px' })),
          onTouchstart: onTouchStart,
          onTouchmove: onTouchMove,
          onTouchend: onTouchEnd
        }), [
          _cE(Fragment, null, RenderHelpers.renderList(24, (hour, __key, __index, _cached): any => {
            return _cE("view", _uM({
              key: 'hour-' + hour,
              class: "hour-section"
            }), [
              _cE("view", _uM({ class: "hour-mark" }), _tD(formatHour(hour - 1)), 1 /* TEXT */),
              _cE("view", _uM({ class: "minute-marks" }), [
                _cE(Fragment, null, RenderHelpers.renderList(minuteMarks, (minute, __key, __index, _cached): any => {
                  return _cE("view", _uM({
                    key: 'min-' + hour + '-' + minute,
                    class: "minute-mark",
                    onClick: () => {seekToTime(hour - 1, minute)}
                  }), [
                    isTrue(hasEvent(hour - 1, minute))
                      ? _cE("view", _uM({
                          key: 0,
                          class: _nC(['event-dot', getEventType(hour - 1, minute)])
                        }), null, 2 /* CLASS */)
                      : _cC("v-if", true),
                    minute % 15 === 0
                      ? _cE("text", _uM({
                          key: 1,
                          class: "minute-label"
                        }), _tD(minute), 1 /* TEXT */)
                      : _cC("v-if", true)
                  ], 8 /* PROPS */, ["onClick"])
                }), 64 /* STABLE_FRAGMENT */)
              ])
            ])
          }), 64 /* STABLE_FRAGMENT */),
          _cE("view", _uM({
            class: "playhead",
            style: _nS(_uM({ left: playheadPosition.value + 'px' }))
          }), null, 4 /* STYLE */),
          _cE("view", _uM({
            class: "time-indicator",
            style: _nS(_uM({ left: playheadPosition.value + 'px' }))
          }), _tD(currentTime.value.split(':').slice(0, 2).join(':')), 5 /* TEXT, STYLE */)
        ], 36 /* STYLE, NEED_HYDRATION */)
      ], 40 /* PROPS, NEED_HYDRATION */, ["scroll-left"])
    ]),
    _cE("view", _uM({ class: "filter-bar" }), [
      _cE(Fragment, null, RenderHelpers.renderList(filters, (filter, __key, __index, _cached): any => {
        return _cE("view", _uM({
          key: filter.value,
          class: _nC(['filter-item', activeFilter.value === filter.value ? 'active' : '']),
          onClick: () => {selectFilter(filter.value)}
        }), _tD(filter.label), 11 /* TEXT, CLASS, PROPS */, ["onClick"])
      }), 64 /* STABLE_FRAGMENT */)
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexDeviceReplayStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["backgroundColor", "#f5f5f5"]]))], ["header", _pS(_uM([["paddingTop", 15], ["paddingRight", 15], ["paddingBottom", 15], ["paddingLeft", 15], ["backgroundColor", "#007aff"], ["color", "#FFFFFF"], ["display", "flex"], ["justifyContent", "space-between"], ["alignItems", "center"], ["position", "relative"], ["zIndex", 10]]))], ["title", _pS(_uM([["fontSize", 18], ["fontWeight", "bold"]]))], ["current-time", _pS(_uM([["fontSize", 14], ["opacity", 0.9]]))], ["date-scroll", _pS(_uM([["width", "100%"], ["whiteSpace", "nowrap"], ["backgroundColor", "#333333"], ["paddingTop", 8], ["paddingRight", 0], ["paddingBottom", 8], ["paddingLeft", 0], ["position", "relative"], ["zIndex", 10], ["boxShadow", "0 2px 5px rgba(0,0,0,0.2)"]]))], ["date-list", _pS(_uM([["paddingTop", 0], ["paddingRight", 10], ["paddingBottom", 0], ["paddingLeft", 10]]))], ["date-item", _uM([["", _uM([["paddingTop", 8], ["paddingRight", 16], ["paddingBottom", 8], ["paddingLeft", 16], ["marginTop", 0], ["marginRight", 5], ["marginBottom", 0], ["marginLeft", 5], ["borderTopLeftRadius", 16], ["borderTopRightRadius", 16], ["borderBottomRightRadius", 16], ["borderBottomLeftRadius", 16], ["backgroundColor", "#555555"], ["color", "#FFFFFF"], ["fontSize", 14], ["transitionProperty", "all"], ["transitionDuration", "0.2s"]])], [".active", _uM([["backgroundColor", "#007aff"], ["fontWeight", "bold"], ["transform", "scale(1.05)"]])]])], ["video-container", _pS(_uM([["width", "100%"], ["height", 250], ["backgroundColor", "#000000"], ["position", "relative"]]))], ["video-player", _pS(_uM([["width", "100%"], ["height", "100%"]]))], ["time-ruler-container", _pS(_uM([["width", "100%"], ["paddingTop", 10], ["paddingRight", 0], ["paddingBottom", 10], ["paddingLeft", 0], ["backgroundColor", "#333333"], ["position", "relative"], ["zIndex", 5], ["boxShadow", "0 -2px 5px rgba(0,0,0,0.2)"]]))], ["time-ruler-scroll", _pS(_uM([["width", "100%"], ["height", 70], ["whiteSpace", "nowrap"]]))], ["time-ruler", _pS(_uM([["height", "100%"], ["paddingLeft", 10], ["position", "relative"], ["touchAction", "none"], ["userSelect", "none"]]))], ["hour-section", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["width", 120], ["borderRightWidth", 1], ["borderRightStyle", "solid"], ["borderRightColor", "#444444"], ["position", "relative"]]))], ["hour-mark", _pS(_uM([["color", "#FFFFFF"], ["fontSize", 12], ["paddingTop", 4], ["paddingRight", 8], ["paddingBottom", 4], ["paddingLeft", 8], ["backgroundColor", "#444444"], ["borderTopLeftRadius", 4], ["borderTopRightRadius", 4], ["borderBottomRightRadius", 4], ["borderBottomLeftRadius", 4], ["marginTop", 2], ["marginRight", 2], ["marginBottom", 2], ["marginLeft", 2], ["textAlign", "center"]]))], ["minute-marks", _pS(_uM([["display", "flex"], ["flex", 1], ["position", "relative"]]))], ["minute-mark", _pS(_uM([["flex", 1], ["position", "relative"], ["borderRightWidth", 1], ["borderRightStyle", "solid"], ["borderRightColor", "#444444"]]))], ["minute-label", _pS(_uM([["position", "absolute"], ["bottom", 5], ["left", 2], ["color", "#aaaaaa"], ["fontSize", 10]]))], ["event-dot", _uM([["", _uM([["position", "absolute"], ["top", 8], ["left", "50%"], ["transform", "translateX(-50%)"], ["width", 8], ["height", 8], ["zIndex", 2]])], [".alarm", _uM([["backgroundColor", "#ff3b30"], ["boxShadow", "0 0 5px #ff3b30"]])], [".motion", _uM([["backgroundColor", "#ff9500"], ["boxShadow", "0 0 5px #ff9500"]])], [".human", _uM([["backgroundColor", "#34c759"], ["boxShadow", "0 0 5px #34c759"]])]])], ["playhead", _pS(_uM([["position", "absolute"], ["top", 0], ["width", 2], ["height", "100%"], ["backgroundColor", "#007aff"], ["zIndex", 10], ["pointerEvents", "none"], ["content::after", "''"], ["position::after", "absolute"], ["top::after", 0], ["left::after", -6], ["width::after", 14], ["height::after", 14], ["backgroundColor::after", "#007aff"], ["borderTopWidth::after", 2], ["borderRightWidth::after", 2], ["borderBottomWidth::after", 2], ["borderLeftWidth::after", 2], ["borderTopStyle::after", "solid"], ["borderRightStyle::after", "solid"], ["borderBottomStyle::after", "solid"], ["borderLeftStyle::after", "solid"], ["borderTopColor::after", "#FFFFFF"], ["borderRightColor::after", "#FFFFFF"], ["borderBottomColor::after", "#FFFFFF"], ["borderLeftColor::after", "#FFFFFF"], ["boxSizing::after", "border-box"]]))], ["time-indicator", _pS(_uM([["position", "absolute"], ["top", -25], ["left", 0], ["transform", "translateX(-50%)"], ["backgroundColor", "#007aff"], ["color", "#FFFFFF"], ["paddingTop", 3], ["paddingRight", 8], ["paddingBottom", 3], ["paddingLeft", 8], ["borderTopLeftRadius", 4], ["borderTopRightRadius", 4], ["borderBottomRightRadius", 4], ["borderBottomLeftRadius", 4], ["fontSize", 12], ["zIndex", 11], ["pointerEvents", "none"], ["whiteSpace", "nowrap"], ["content::after", "''"], ["position::after", "absolute"], ["bottom::after", -5], ["left::after", "50%"], ["transform::after", "translateX(-50%)"], ["width::after", 0], ["height::after", 0], ["borderLeftWidth::after", 5], ["borderLeftStyle::after", "solid"], ["borderLeftColor::after", "rgba(0,0,0,0)"], ["borderRightWidth::after", 5], ["borderRightStyle::after", "solid"], ["borderRightColor::after", "rgba(0,0,0,0)"], ["borderTopWidth::after", 5], ["borderTopStyle::after", "solid"], ["borderTopColor::after", "#007aff"]]))], ["filter-bar", _pS(_uM([["display", "flex"], ["justifyContent", "space-around"], ["paddingTop", 12], ["paddingRight", 5], ["paddingBottom", 12], ["paddingLeft", 5], ["backgroundColor", "#333333"], ["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["zIndex", 20], ["boxShadow", "0 -2px 10px rgba(0,0,0,0.3)"]]))], ["filter-item", _uM([["", _uM([["paddingTop", 8], ["paddingRight", 12], ["paddingBottom", 8], ["paddingLeft", 12], ["borderTopLeftRadius", 16], ["borderTopRightRadius", 16], ["borderBottomRightRadius", 16], ["borderBottomLeftRadius", 16], ["backgroundColor", "#555555"], ["color", "#FFFFFF"], ["fontSize", 12], ["transitionProperty", "all"], ["transitionDuration", "0.2s"], ["flex", 1], ["marginTop", 0], ["marginRight", 5], ["marginBottom", 0], ["marginLeft", 5], ["textAlign", "center"]])], [".active", _uM([["backgroundColor", "#007aff"], ["fontWeight", "bold"], ["transform", "scale(1.05)"]])]])], ["@TRANSITION", _uM([["date-item", _uM([["property", "all"], ["duration", "0.2s"]])], ["filter-item", _uM([["property", "all"], ["duration", "0.2s"]])]])]])]
