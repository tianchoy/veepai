import { ref, computed, onMounted, getCurrentInstance } from 'vue'

	type TimeMark = { __$originalPosition?: UTSSourceMapPosition<"TimeMark", "pages/index/deviceReplay.uvue", 71, 7>;
		time : number
		position : number
		type : string
	}
	// 响应式状态
	type TimeScrollDetail = { __$originalPosition?: UTSSourceMapPosition<"TimeScrollDetail", "pages/index/deviceReplay.uvue", 370, 7>;
		scrollLeft : number
	}
	// 定义滚动事件类型
	type TimeScrollEvent = { __$originalPosition?: UTSSourceMapPosition<"TimeScrollEvent", "pages/index/deviceReplay.uvue", 374, 7>;
		detail : TimeScrollDetail
	}
	// 时间轴滚动事件
	
const __sfc__ = defineComponent({
  __name: 'deviceReplay',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	class EventType {
		date : string;
		time : string;
		type : string;

		constructor(date : string, time : string, type : string) {
			this.date = date;
			this.time = time;
			this.type = type;
		}
	}

	// 计算时间刻度
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


	// 常量配置
	const dateList = ['10-21', '10-22', '10-23', '10-24', '10-25', '10-26']
	const filters = [
		{ label: '只看报警', value: 'alarm' },
		{ label: '移动侦测', value: 'motion' },
		{ label: '人形侦测', value: 'human' },
		{ label: '全部', value: 'all' }
	]

	// 模拟事件数据
	const events = ref<EventType[]>([
		{ date: '10-21', time: '00:00:10', type: 'alarm' },
		{ date: '10-21', time: '00:00:30', type: 'motion' },
		{ date: '10-21', time: '00:01:45', type: 'human' },
		{ date: '10-21', time: '00:01:20', type: 'alarm' }
	])




	// 计算属性
	const rulerWidth = computed(() => {
		const systemInfo = uni.getSystemInfoSync()
		return systemInfo.windowWidth
	})


	// 时间字符串转秒数
	const convertTimeToSeconds = (timeStr : string) => {
		const parts = timeStr.split(':')
		const h = parseInt(parts[0])
		const m = parseInt(parts[1])
		const s = parts.length > 2 ? parseInt(parts[2]) : 0
		return h * 3600 + m * 60 + s
	}

	const timeMarks = computed<TimeMark[]>(() => {
		const marks = [] as TimeMark[]
		const duration = videoDuration.value
		if (duration == 0) return marks

		let majorInterval : number
		if (duration <= 60) { // 1分钟以内
			majorInterval = 10 // 每10秒一个主刻度
		} else if (duration <= 300) { // 5分钟以内
			majorInterval = 30 // 每30秒一个主刻度
		} else if (duration <= 1800) { // 30分钟以内
			majorInterval = 60 // 每分钟一个主刻度
		} else if (duration <= 3600) { // 1小时以内
			majorInterval = 300 // 每5分钟一个主刻度
		} else if (duration <= 7200) { // 2小时以内
			majorInterval = 600 // 每10分钟一个主刻度
		} else { // 超过2小时
			majorInterval = 1800 // 每30分钟一个主刻度
		}

		// 小刻度数量 
		const minorInterval = majorInterval / 10

		// 计算每个刻度的像素位置
		const pixelsPerSecond = rulerWidth.value / duration

		// 生成刻度
		for (let time = 0; time <= duration; time += minorInterval) {
			const isMajor = (time % majorInterval) == 0
			marks.push({
				time,
				position: time * pixelsPerSecond + 3,
				type: isMajor ? 'major' : 'minor'
			})
		}

		return marks
	})


	// 格式化刻度时间
	const formatMarkTime = (seconds : number) => {
		const hrs = Math.floor(seconds / 3600)
		const mins = Math.floor((seconds % 3600) / 60)
		const secs = Math.floor(seconds % 60)

		if (hrs > 0) {
			return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
		}
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	const filteredEvents = computed<EventType[]>(() => {
		if (activeFilter.value === 'all') return events.value
		return events.value.filter((e) => e.type === activeFilter.value)
	})

	// 初始化视频上下文
	const initVideoContext = () => {
		try {
			videoContext.value = uni.createVideoContext('myVideo');
			console.log('视频上下文初始化成功', videoContext.value, " at pages/index/deviceReplay.uvue:194");
		} catch (error) {
			console.error('创建视频上下文失败:', error, " at pages/index/deviceReplay.uvue:196");
		}
	}
	// 加载视频数据
	const loadVideoData = (date : String) => {
		console.log('加载日期数据:', date, " at pages/index/deviceReplay.uvue:201")
	}


	// 选择日期
	const selectDate = (date : string) => {
		activeDate.value = date
		currentDate.value = `2024-${date}`
		loadVideoData(date)

		const index = dateList.indexOf(date)
		dateScrollLeft.value = index * 80
	}

	// 格式化时间显示
	const formatTime = (seconds : number) => {
		const hrs = Math.floor(seconds / 3600)
		const mins = Math.floor((seconds % 3600) / 60)
		const secs = Math.floor(seconds % 60)
		return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}


	// 更新播放头位置
	const updatePlayheadPosition = (currentTimeInSeconds : number) => {
		const pixelsPerSecond = rulerWidth.value / videoDuration.value
		playheadPosition.value = currentTimeInSeconds * pixelsPerSecond
		const systemInfo = uni.getSystemInfoSync()
		const scrollViewWidth = systemInfo.windowWidth
		const halfWidth = scrollViewWidth / 2
		const targetScrollLeft = playheadPosition.value - halfWidth

		const maxScrollLeft = rulerWidth.value - scrollViewWidth
		timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, targetScrollLeft))
	}

	// 视频时间更新 
	const onTimeUpdate = (e : UniVideoTimeUpdateEvent) => {
		if (isSeeking.value || isDragging.value) return

		const currentTimeInSeconds = e.detail.currentTime
		currentTime.value = formatTime(currentTimeInSeconds)
		videoDuration.value = e.detail.duration;
		// 节流处理
		const now = Date.now()
		if (now - lastSyncTime.value < 200) return
		lastSyncTime.value = now

		updatePlayheadPosition(currentTimeInSeconds - 1)
	}

	const seekToSeconds = (timeInSeconds : number) => {
		isSeeking.value = true
		manualScrollPosition.value = timeInSeconds * 2

		if (videoContext.value != null) {
			videoContext.value.seek(timeInSeconds)
		}

		playheadPosition.value = timeInSeconds * 2
		currentTime.value = formatTime(timeInSeconds)
	}

			// 新增的计算属性：获取事件位置
	const getEventPosition = (event: EventType) => {
		const seconds = convertTimeToSeconds(event.time)
		const duration = videoDuration.value != 0 ? videoDuration.value : 300 // 默认5分钟
		const pixelsPerSecond = rulerWidth.value / duration
		return seconds * pixelsPerSecond
	}

	// 新增方法：跳转到事件时间点
	const seekToEvent = (event: EventType) => {
		const seconds = convertTimeToSeconds(event.time)
		seekToSeconds(seconds)
	}


	// 跳转到指定时间
	const seekToTime = (hour : number, minute : number) => {
		const timeInSeconds = hour * 3600 + minute * 60
		seekToSeconds(timeInSeconds)
	}
	// 跳转到指定位置(秒)
	const seekToPosition = (seconds : number) => {
		seekToSeconds(seconds)
	}

	// 跳转完成
	const onSeeked = () => {
		isSeeking.value = false
	}

	// 时间轴触摸开始
	const onTouchStart = (e : TouchEvent) => {
		isDragging.value = true
		startX.value = e.touches[0].pageX
		startScrollLeft.value = startX.value
		lastDragTime.value = Date.now()

		isSeeking.value = true
		if (videoContext.value != null) {
			videoContext.value.pause()
		}
	}

	// 时间轴触摸移动
	const onTouchMove = (e : TouchEvent) => {
		if (!isDragging.value) return

		const deltaX = e.touches[0].pageX - startX.value
		const newScrollLeft = startScrollLeft.value - deltaX

		const systemInfo = uni.getSystemInfoSync()
		const scrollViewWidth = systemInfo.windowWidth

		const maxScrollLeft = rulerWidth.value - scrollViewWidth
		timeScrollLeft.value = Math.max(0, Math.min(maxScrollLeft, newScrollLeft))

		// 计算当前时间位置（基于触摸点位置）
		const touchX = e.touches[0].pageX
		const rulerStartX = touchX - startX.value + startScrollLeft.value
		const pixelsPerSecond = rulerWidth.value / videoDuration.value
		const timeInSeconds = rulerStartX / pixelsPerSecond

		// 更新显示
		currentTime.value = formatTime(timeInSeconds)
		playheadPosition.value = timeInSeconds * pixelsPerSecond
		manualScrollPosition.value = timeInSeconds * pixelsPerSecond

		// 实时跳转视频(节流处理)
		const now = Date.now()
		if (now - lastDragTime.value > 100) {
			if (videoContext.value != null) {
				console.log('尝试跳转视频到:', timeInSeconds, '秒', " at pages/index/deviceReplay.uvue:335");
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
		const scrollViewWidth = systemInfo.windowWidth
		const pixelsPerSecond = rulerWidth.value / videoDuration.value;
		const timeInSeconds = (timeScrollLeft.value + scrollViewWidth / 2) / pixelsPerSecond;


		// 精确跳转
		if (videoContext.value != null) {
			console.log('尝试跳转视频到最终时间:', draggedTimeInSeconds.value, '秒', " at pages/index/deviceReplay.uvue:356");
			videoContext.value.seek(draggedTimeInSeconds.value)
			videoContext.value.play()
		}

		playheadPosition.value = timeInSeconds * pixelsPerSecond
		currentTime.value = formatTime(timeInSeconds)
		// manualScrollPosition.value = timeInSeconds * 2

		isDragging.value = false
		isSeeking.value = false
	}

	// 定义滚动事件detail类型
	const onTimeScroll = (e : TimeScrollEvent) => {
		if (!isDragging.value) {
			timeScrollLeft.value = e.detail.scrollLeft
		}
	}

	// 选择筛选条件
	const selectFilter = (filter : string) => {
		activeFilter.value = filter
	}

	// 检查指定时间是否有事件
	const hasEvent = (hour : number, minute : number) => {
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
	const getEventType = (hour : number, minute : number) => {
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
	const formatHour = (hour : number) => {
		return `${hour.toString().padStart(2, '0')}:00`
	}

	// 播放/暂停事件
	const onPlay = () => {
		console.log('视频开始播放', " at pages/index/deviceReplay.uvue:422")

	}

	const onPause = () => {
		console.log('视频暂停', " at pages/index/deviceReplay.uvue:427")
	}

	// 组件生命周期
	onMounted(() => {
		initVideoContext();
		if (videoContext.value == null) {
			console.error('视频上下文初始化失败，请检查', " at pages/index/deviceReplay.uvue:434");
		}
	});

return (): any | null => {

  return _cE("view", _uM({ class: "container" }), [
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
          _cE(Fragment, null, RenderHelpers.renderList(timeMarks.value, (mark, index, __index, _cached): any => {
            return _cE("view", _uM({
              key: 'mark-' + index,
              class: _nC(['time-mark', mark.type]),
              style: _nS(_uM({ left: mark.position + 'px' })),
              onClick: () => {seekToPosition(mark.time)}
            }), [
              mark.type === 'major'
                ? _cE("text", _uM({
                    key: 0,
                    class: "mark-label"
                  }))
                : _cC("v-if", true)
            ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
          }), 128 /* KEYED_FRAGMENT */),
          _cE(Fragment, null, RenderHelpers.renderList(filteredEvents.value, (event, index, __index, _cached): any => {
            return _cE("view", _uM({
              key: 'event-'+index,
              class: "event-marker",
              style: _nS(_uM({ left: getEventPosition(event) + 'px' })),
              onClick: withModifiers(() => {seekToEvent(event)}, ["stop"])
            }), [
              _cE("view", _uM({
                class: _nC(['event-dot', event.type])
              }), null, 2 /* CLASS */)
            ], 12 /* STYLE, PROPS */, ["onClick"])
          }), 128 /* KEYED_FRAGMENT */),
          _cE("view", _uM({
            class: "playhead",
            style: _nS(_uM({ left: playheadPosition.value + 'px'}))
          }), null, 4 /* STYLE */)
        ], 36 /* STYLE, NEED_HYDRATION */)
      ], 40 /* PROPS, NEED_HYDRATION */, ["scroll-left"])
    ]),
    _cE("view", _uM({ class: "filter-bar" }), [
      _cE(Fragment, null, RenderHelpers.renderList(filters, (filter, __key, __index, _cached): any => {
        return _cE("view", _uM({
          key: filter.value,
          class: _nC(['filter-item', activeFilter.value === filter.value ? 'active' : '']),
          onClick: () => {selectFilter(filter.value as string)}
        }), _tD(filter.label), 11 /* TEXT, CLASS, PROPS */, ["onClick"])
      }), 64 /* STABLE_FRAGMENT */)
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexDeviceReplayStyles = [_uM([["container", _pS(_uM([["display", "flex"], ["flexDirection", "column"], ["height", "100%"], ["backgroundColor", "#f5f5f5"]]))], ["date-list", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["date-item", _uM([["", _uM([["paddingTop", 8], ["paddingRight", 16], ["paddingBottom", 8], ["paddingLeft", 16], ["marginTop", 0], ["marginRight", 5], ["marginBottom", 0], ["marginLeft", 5], ["borderTopLeftRadius", 16], ["borderTopRightRadius", 16], ["borderBottomRightRadius", 16], ["borderBottomLeftRadius", 16], ["backgroundColor", "#555555"], ["color", "#FFFFFF"], ["fontSize", 14], ["transitionProperty", "all"], ["transitionDuration", "0.2s"]])], [".active", _uM([["backgroundColor", "#007aff"], ["color", "#ffffff"]])]])], ["video-container", _pS(_uM([["width", "100%"], ["height", 250], ["backgroundColor", "#000000"], ["position", "relative"]]))], ["video-player", _pS(_uM([["width", "100%"], ["height", "100%"]]))], ["time-ruler-container", _pS(_uM([["width", "100%"], ["paddingTop", 10], ["paddingRight", 0], ["paddingBottom", 10], ["paddingLeft", 0], ["backgroundColor", "#ffffff"], ["position", "relative"], ["zIndex", 5]]))], ["time-ruler-scroll", _pS(_uM([["width", "100%"], ["height", 70], ["whiteSpace", "nowrap"]]))], ["event-dot", _uM([[".alarm", _uM([["backgroundColor", "#ff3b30"], ["boxShadow", "0 0 5px #ff3b30"]])], [".motion", _uM([["backgroundColor", "#ff9500"], ["boxShadow", "0 0 5px #ff9500"]])], [".human", _uM([["backgroundColor", "#34c759"], ["boxShadow", "0 0 5px #34c759"]])], ["", _uM([["width", 10], ["height", 10]])]])], ["playhead", _pS(_uM([["position", "absolute"], ["top", 0], ["width", 2], ["height", "100%"], ["backgroundColor", "#007aff"], ["zIndex", 10], ["pointerEvents", "none"]]))], ["filter-bar", _pS(_uM([["display", "flex"], ["justifyContent", "space-around"], ["paddingTop", 12], ["paddingRight", 5], ["paddingBottom", 12], ["paddingLeft", 5], ["backgroundColor", "#333333"], ["position", "fixed"], ["bottom", 0], ["left", 0], ["right", 0], ["zIndex", 20]]))], ["filter-item", _uM([["", _uM([["paddingTop", 8], ["paddingRight", 12], ["paddingBottom", 8], ["paddingLeft", 12], ["borderTopLeftRadius", 16], ["borderTopRightRadius", 16], ["borderBottomRightRadius", 16], ["borderBottomLeftRadius", 16], ["backgroundColor", "#555555"], ["color", "#FFFFFF"], ["fontSize", 12], ["transitionProperty", "all"], ["transitionDuration", "0.2s"], ["flex", 1], ["marginTop", 0], ["marginRight", 5], ["marginBottom", 0], ["marginLeft", 5], ["textAlign", "center"]])], [".active", _uM([["backgroundColor", "#007aff"], ["fontWeight", "bold"], ["transform", "scale(1.05)"]])]])], ["time-ruler", _pS(_uM([["display", "flex"], ["height", "100%"], ["position", "relative"], ["width", "100%"], ["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#cccccc"]]))], ["time-mark", _uM([["", _uM([["position", "absolute"], ["bottom", 0], ["transform", "translateX(-50%)"], ["pointerEvents", "auto"]])], [".major", _uM([["height", 20], ["backgroundColor", "#333333"], ["width", 2]])], [".minor", _uM([["height", 10], ["backgroundColor", "#999999"], ["width", 1]])]])], ["event-marker", _pS(_uM([["position", "absolute"], ["bottom", 25], ["transform", "translateX(-50%)"], ["zIndex", 5]]))], ["@TRANSITION", _uM([["date-item", _uM([["property", "all"], ["duration", "0.2s"]])], ["filter-item", _uM([["property", "all"], ["duration", "0.2s"]])]])]])]
