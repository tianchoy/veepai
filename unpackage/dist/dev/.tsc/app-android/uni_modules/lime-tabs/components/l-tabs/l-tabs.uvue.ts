import _easycom_l_badge from '@/uni_modules/lime-badge/components/l-badge/l-badge.uvue'
import { TabsProps, TabPanel } from './type';
	import { TabPanelProps } from '../l-tab-panel/type';
	import { calcScrollOffset, ease } from './utils';
	import { clamp } from '@/uni_modules/lime-shared/clamp';
	// import { getRect } from '@/uni_modules/lime-shared/getRect';
	import { getRect, getAllRect } from '@/uni_modules/lime-shared/getRect'
	import { useTouch } from './touch'
	
const __sfc__ = defineComponent({
  __name: 'l-tabs',
  slots: Object as SlotsType<{label:  { item : TabPanel, active : boolean, disabled : boolean };default:  {};left:  {};right:  {}}>,
  __props: TabsProps,
  props: /*#__PURE__*/mergeModels({
    list: { type: Array as PropType<UTSJSONObject[]>, required: false },
    ellipsis: { type: Boolean, required: true, default: false },
    animated: { type: Boolean, required: true, default: false },
    duration: { type: Number, required: true, default: 0.3 },
    showLine: { type: Boolean, required: true, default: true },
    size: { type: String, required: true, default: 'medium' },
    spaceEvenly: { type: Boolean, required: true, default: true },
    swipeable: { type: Boolean, required: true, default: false },
    value: { type: Number, required: false },
    color: { type: String, required: false },
    activeColor: { type: String, required: false },
    lineColor: { type: String, required: false },
    lineWidth: { type: String, required: false },
    lineHeight: { type: String, required: false },
    bgColor: { type: String, required: false },
    fontSize: { type: String, required: false },
    padding: { type: String, required: false },
    split: { type: Boolean, required: true, default: true },
    visible: { type: Boolean, required: true, default: false },
    swiperProgress: { type: Number, required: true, default: 0 },
    syncSwiper: { type: Boolean, required: true, default: false },
    lStyle: { type: [String, UTSJSONObject], required: false }
  }, {
    "modelValue": { type: Number },
  }),
  emits: /*#__PURE__*/mergeModels(['change', 'click'], ["update:modelValue"]),
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Tabs 标签页组件
	 * @description 用于内容分类展示和切换，支持多种样式和交互效果
	 * <br>插件类型：LTabsComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-tabs
	 * 
	 * @property {TabPanel[]} list 选项卡配置数组
	 * @property {boolean} ellipsis 是否省略超长文本（默认：true）
	 * @property {boolean} animated 是否启用切换动画（默认：false）
	 * @property {number} duration 动画时长（ms，默认：300）
	 * @property {boolean} showLine 显示底部激活线条（默认：true）
	 * @property {'medium' | 'large'} size 组件尺寸（默认："medium"）
	 * @value medium
	 * @value large
	 * @property {boolean} spaceEvenly 均分选项卡宽度（默认：false）
	 * @property {boolean} swipeable 支持滑动切换（默认：true）
	 * @property {number} value 当前激活选项卡索引（支持v-model）
	 * @property {string} color 默认文字颜色（默认："#333"）
	 * @property {string} activeColor 激活状态颜色（默认：主题色）
	 * @property {string} lineColor 激活线条颜色（默认：跟随activeColor）
	 * @property {string} lineWidth 激活线条宽度（默认："20px"）
	 * @property {string} lineHeight 激活线条高度（默认："3px"）
	 * @property {string} bgColor 背景颜色
	 * @property {string} fontSize 文字大小（支持CSS单位）
	 * @property {string} padding 内边距（支持CSS简写）
	 * @property {boolean} split 显示分隔线（默认：false）
	 * @property {boolean} visible 是否显示组件（默认：true）
	 * @property {number} swiperProgress 与swiper联动，传入[-1, 1] 范围的滚动进度
	 * @property {boolean} syncSwiper 是否启用与swiper的同步联动
	 * @event {Function} change 选项卡切换时触发（返回激活索引）
	 * @event {Function} click 点击时触发（返回激活索引）
	 */

	function emits(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	// const slots = defineSlots<{
	// 	label : {
	// 		item : TabPanel,
	// 		active : boolean,
	// 		disabled : boolean,
	// 	}
	// }>()

	const slots = useSlots()

	const props = __props

	const children = ref<LTabPanelComponentPublicInstance[]>([])
	const scrollLeft = ref(0);
	const lastLeft = ref(0);











	const innerStyle = {__$originalPosition: new UTSSourceMapPosition("innerStyle", "uni_modules/lime-tabs/components/l-tabs/l-tabs.uvue", 159, 8),

	}


	const modelValue = useModel<Number>(__ins.props, "modelValue")
	const currentValue = computed({
		set(value : number) {
			modelValue.value = value;
			emits('change', value)
		},
		get() : number {
			return props.value ?? modelValue.value
		}
	} as WritableComputedOptions<number>);

	const styles = computed(() : Map<string, any> => {
		const style = new Map<string, any>();

		if (props.bgColor != null) {
			style.set('background', props.bgColor!)
		}















		return style
	})
	const trackStyle = computed(() : Map<string, any> => {
		const style = new Map<string, any>([




		]);

		if (props.lineColor != null) {
			style.set('background', props.lineColor!)
		}
		if (props.lineWidth != null) {
			style.set('width', props.lineWidth!)
		}
		if (props.lineHeight != null) {
			style.set('height', props.lineHeight!)
		}
		return style
	})
	const itemStyle = computed(() : Map<string, any> => {
		const style = new Map<string, any>()

		if (!['medium', 'large'].includes(props.size)) {
			style.set('height', props.size)
		}
		if (props.padding != null) {
			style.set('padding', props.padding!)
		}

		return style
	})
	const textStyles = computed(() : Map<string, any> => {
		const style = new Map<string, any>()

		if (props.fontSize != null) {
			style.set('font-size', props.fontSize!)
		}

		return style
	})

	const tabs = computed(() : TabPanel[] => {
		if (props.list != null && props.list!.length > 0) {
			return props.list!.map((item) : TabPanel => {
				return {
					badge: item.get('badge'),
					dot: item.getBoolean('dot') ?? false,
					disabled: item.getBoolean('disabled') ?? false,
					label: item.getString('label'),
					offset: item.getArray('offset') as any[] | null,
					value: item.getNumber('value'),
					node: item
				} as TabPanel
			})
		}
		return children.value.map((item) : TabPanel => {

			// 安卓端数组属性存在BUG 死循环

			const offset = item.innderOffset






			return {
				badge: item.badge,
				dot: item.dot ?? false,
				disabled: item.disabled ?? false,
				label: item.label,
				offset: offset,
				value: item.value,
				node: {
					badge: item.badge,
					dot: item.dot ?? false,
					disabled: item.disabled ?? false,
					label: item.label,
					offset: offset,
					value: item.value,
				}
			} as TabPanel
		})
	})

	const currentIndex = computed(() : number => {
		const index = tabs.value.findIndex((child, index) : boolean => (child.value ?? index) == currentValue.value)
		return index > -1 ? index : 0;
	})

	const scrollRef = ref<UniScrollViewElement | null>(null)
	const trackRef = ref<UniElement | null>(null)
	const navRef = ref<UniElement | null>(null)
	const innerRef = ref<UniElement | null>(null)

	const tabRects = ref<DOMRect[]>([])  // 存储每个tab的尺寸位置
	const containerWidth = ref(0)        // 容器宽度
	const trackLineWidth = ref(0)
	const isInteracting = ref(false)     // 是否正在交互
	let timer = 0
	

	const measureTabs = () : Promise<void> => {
		return new Promise((resolve) => {
			// nextTick(() => {
				if(tabRects.value.length > 0 && tabRects.value[0].width > 0) {
					resolve()
				}

				if (scrollRef.value == null) { // navRef.value == null ||
					resolve()
					return
				};




				const elements = scrollRef.value!.children;

				
				const tabsRects:DOMRect[] = []
				elements.forEach((el)=>{
					if(el.tagName == 'VIEW') {
						tabsRects.push(el.getBoundingClientRect())
					}
				})
				tabRects.value = tabsRects
				containerWidth.value = scrollRef.value?.offsetWidth ?? 0
				trackLineWidth.value = trackRef.value?.offsetWidth ?? 0
				resolve()















				
			})
		// })

	}

	const moveToActiveTab = () => {
		measureTabs().then(() => {
			const index = currentIndex.value
			if (tabRects.value.length <= index) return
			const tabRect = tabRects.value[index]

			let count = 0;
			let distance = 0;
			let totalSize = 0;
			
			tabRects.value.forEach((item : DOMRect) => {
				if (count < index) {
					distance += item.width;
					count += 1;
				}
				totalSize += item.width;
			});
			if (totalSize == 0) return


			// 计算track最终位置
			distance += (tabRect.width - trackLineWidth.value) / 2;

			trackRef.value?.style.setProperty('transform', `translateX(${distance}px)`)






			// 计算scroll-view需要滚动的距离
			const scrollOffset = calcScrollOffset(
				containerWidth.value,
				tabRect.left,
				tabRect.width,
				lastLeft.value
			)

			const maxOffset = totalSize - containerWidth.value;

			scrollLeft.value = clamp(scrollOffset, 0, maxOffset)
			// isInteracting.value = false
		})
	}
	const updateInnerStyle = (offset : number) => {
		nextTick(() => {

			if (innerRef.value == null) return;
			const width = innerRef.value!.parentElement?.offsetWidth ?? 0;
			innerRef.value!.style.setProperty('width', `${tabs.value.length * width}px`)
			innerRef.value!.style.setProperty('opacity', `1`)

			const left = -width * currentIndex.value + offset;
			if (offset != 0) {
				innerRef.value!.style.setProperty('transition-duration', `0s`)
				innerRef.value!.style.setProperty('transform', `translateX(${left}px)`)
			} else {
				if (props.animated) {
					innerRef.value!.style.setProperty('transition-duration', offset != 0 || !props.animated ? '0s' : `${props.duration}s`)
				}
				nextTick(() => {
					innerRef.value!.style.setProperty('transform', `translateX(${left}px)`)
				})
			}























		})
	}
	const onScroll = (e : UniScrollEvent) => {
		lastLeft.value = e.detail.scrollLeft;
	}
	const updateDuration = (duration: number) => {

		trackRef.value?.style.setProperty('transition-duration', `${duration}s`)




	}
	const onClick = (index : number, item : TabPanel) => {
		isInteracting.value = true
		const { value = index, disabled, label } = item;
		if (disabled || currentValue.value == value) return
		currentValue.value = value;
		emits('click', value)
		updateDuration(0.3)
		nextTick(()=> {
			moveToActiveTab()
		})
		
		clearTimeout(timer)
		timer = setTimeout(()=>{
			isInteracting.value = false
		},500)
		
	}

	const getAvailableTabIndex = (deltaX : number) : number => {
		const step = deltaX > 0 ? -1 : 1;
		const len = tabs.value.length;
		for (let i = step; currentIndex.value + step >= 0 && currentIndex.value + step < len; i += step) {
			const newIndex = currentIndex.value + i;

			if (newIndex >= 0 && newIndex < len && tabs.value.length > newIndex && !tabs.value[newIndex].disabled) {
				return newIndex;
			}
		}
		return -1;
	}
	const touch = useTouch();
	const onTouchStart = (event : UniTouchEvent) => {
		 isInteracting.value = true
		if (!props.swipeable) return;
		touch.start(event);
		updateDuration(0.3)
	}

	const onTouchMove = (event : UniTouchEvent) => {
		if (!props.swipeable) return;
		touch.move(event);
		const { direction, deltaX, startX } = touch
		if (direction.value != 'horizontal') return
		if (!props.animated) return
		const isAtFirstTab = currentIndex.value == 0;
		const isAtLastTab = currentIndex.value == tabs.value.length - 1;

		if ((isAtFirstTab && deltaX.value > 0) || (isAtLastTab && deltaX.value < 0)) {
			const base = isAtFirstTab ? 1 : -1;
			const adjustedDelta = ease(deltaX.value, base);
			updateInnerStyle(adjustedDelta);
		} else {
			updateInnerStyle(deltaX.value);
		}
	}

	const onTouchEnd = () => {
		isInteracting.value = false
		if (!props.swipeable) return;
		const { direction, deltaX, offsetX } = touch
		const minSwipeDistance = 50;
		if (direction.value == 'horizontal' && offsetX.value >= minSwipeDistance) {
			const index = getAvailableTabIndex(deltaX.value);
			if (index != -1) {
				onClick(index, tabs.value[index])
			}
		}
		updateInnerStyle(0)
	}

	const stopWatch = watch(tabs, (_v : TabPanel[]) => {
		// 鸿蒙增加项时渲染比较慢 需要延时一下
		setTimeout(() => {
			moveToActiveTab()
		}, 50)

	})

	const stopValueWatch = watch(currentValue, (_v : number) => {
		
		if (tabs.value.length == 0) return
		moveToActiveTab()
		updateInnerStyle(0)
		
		
	})
	const stopVisibleWatch = watch(() : boolean => props.visible, (v : boolean) => {
		if (!v) return
		setTimeout(() => {
			moveToActiveTab()
			updateInnerStyle(0)
		}, 100)
	})
	
	const updateTrackPosition = (progress: number)=>{
		if (!props.syncSwiper || !props.showLine || progress == 0 || isInteracting.value) return
		updateDuration(0)
		const currentIdx = currentIndex.value
		const next = ()=> {
			const direction = progress > 0 ? 1 : -1
						const nextIdx = currentIdx + direction
						
						// 边界检查
						if (nextIdx < 0 || nextIdx >= tabRects.value.length ) return
						
						// 获取当前和下一个tab的位置信息
						const currentTab = tabRects.value[currentIdx]
						const nextTab = tabRects.value[nextIdx]
						
						// 计算插值比例 (0~1)
						const ratio = Math.abs(progress)
						
						// 计算track的起始和结束位置
						const currentPos = currentTab.left + (currentTab.width - trackLineWidth.value) / 2
						const nextPos = nextTab.left + (nextTab.width - trackLineWidth.value) / 2
						
						// 根据滚动方向计算最终位置
						const newPosition = direction > 0 
						    ? currentPos + (nextPos - currentPos) * ratio
						    : currentPos - (currentPos - nextPos) * ratio
						
						// 更新track位置（平台兼容写法）

			nextTick(()=>{
				trackRef.value?.style.setProperty('transform', `translateX(${newPosition}px)`)
			})




		}
		measureTabs().then(next)
		
	}
	// 监听swiper进度变化
	watch(():number => props.swiperProgress, (progress: number) => {
		updateTrackPosition(progress)
	})
	
	onMounted(() => {
		// 鸿蒙时间上不确定
		nextTick(() => {
			setTimeout(() => {
				if (tabs.value.length == 0) return
				moveToActiveTab()
				updateInnerStyle(0)
			}, 100)
		})
	})

	onUnmounted(() => {
		stopWatch()
		stopValueWatch()
		stopVisibleWatch()
	})

	provide('LimeTabs', children)

return (): any | null => {

const _component_l_badge = resolveEasyComponent("l-badge",_easycom_l_badge)

  return _cE("view", _uM({ class: "l-tabs" }), [
    _cE("view", _uM({
      class: "l-tabs__wrap",
      style: _nS([unref(styles), _ctx.lStyle])
    }), [
      renderSlot(_ctx.$slots, "left"),
      _cE("scroll-view", _uM({
        class: _nC(["l-tabs__scroll", _uM({'l-tabs__scroll--split': _ctx.split})]),
        ref_key: "scrollRef",
        ref: scrollRef,
        "scroll-left": unref(scrollLeft),
        direction: "horizontal",
        "scroll-x": true,
        "scroll-with-animation": true,
        "show-scrollbar": false,
        enhanced: true,
        onScroll: onScroll
      }), [
        _cE(Fragment, null, RenderHelpers.renderList(unref(tabs), (item, index, __index, _cached): any => {
          return _cE("view", _uM({
            class: _nC(["l-tabs__item", _uM({
							'l-tabs__item--active': index == unref(currentIndex),
							'l-tabs__item--evenly': _ctx.spaceEvenly, 
							'l-tabs__item--disabled': item.disabled})]),
            key: index,
            style: _nS([unref(itemStyle)]),
            onClick: () => {onClick(index, item)}
          }), [
            renderSlot(_ctx.$slots, "label", _uM({
              item: item,
              active: index == unref(currentIndex),
              disabled: item.disabled
            }), (): any[] => [
              isTrue(item.dot == true || item.badge != null)
                ? _cV(_component_l_badge, _uM({
                    key: 0,
                    dot: item.dot,
                    offset: item.offset,
                    content: item.badge
                  }), _uM({
                    default: withSlotCtx((): any[] => [
                      _cE("text", _uM({
                        style: _nS([
										unref(textStyles),
										!item.disabled && _ctx.color != null && index != unref(currentIndex) ? ('color:' + _ctx.color) : '',
										!item.disabled && _ctx.activeColor != null && index == unref(currentIndex) ? 'color:' + _ctx.activeColor : '',
									]),
                        class: _nC(["l-tabs__item-text", [
										'l-tabs__item-text--' + _ctx.size,
										_uM({
											'l-tabs__item-text--disabled': item.disabled,
											'l-tabs__item-text--active': index == unref(currentIndex)
										})
									]])
                      }), _tD(item.label), 7 /* TEXT, CLASS, STYLE */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }), 1032 /* PROPS, DYNAMIC_SLOTS */, ["dot", "offset", "content"])
                : _cE("text", _uM({
                    key: 1,
                    style: _nS([
									unref(textStyles),
									!item.disabled && _ctx.color != null && index != unref(currentIndex) ? ('color:' + _ctx.color) : '',
									!item.disabled && _ctx.activeColor != null && index == unref(currentIndex) ? 'color:' + _ctx.activeColor : '',
								]),
                    class: _nC(["l-tabs__item-text", [
									'l-tabs__item-text--' + _ctx.size,
									_uM({
										'l-tabs__item-text--disabled': item.disabled,
										'l-tabs__item-text--active': index == unref(currentIndex)
									})
								]])
                  }), _tD(item.label), 7 /* TEXT, CLASS, STYLE */)
            ])
          ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
        }), 128 /* KEYED_FRAGMENT */),
        _cE("view", _uM({
          ref_key: "trackRef",
          ref: trackRef,
          style: _nS([unref(trackStyle)]),
          class: "l-tabs__track"
        }), null, 4 /* STYLE */)
      ], 42 /* CLASS, PROPS, NEED_HYDRATION */, ["scroll-left"]),
      renderSlot(_ctx.$slots, "right")
    ], 4 /* STYLE */),
    _ctx.$slots['default'] != null
      ? _cE("view", _uM({
          key: 0,
          class: _nC(["l-tabs__content", _uM({'l-tabs__content--animated': _ctx.animated})]),
          onTouchstart: onTouchStart,
          onTouchmove: onTouchMove,
          onTouchend: onTouchEnd,
          onTouchcancel: onTouchEnd
        }), [
          _cE("view", _uM({
            class: "l-tabs__content-inner",
            style: _nS([innerStyle]),
            ref_key: "innerRef",
            ref: innerRef
          }), [
            renderSlot(_ctx.$slots, "default")
          ], 4 /* STYLE */)
        ], 34 /* CLASS, NEED_HYDRATION */)
      : _cC("v-if", true)
  ])
}
}

})
export default __sfc__
export type LTabsComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeTabsComponentsLTabsLTabsStyles = [_uM([["l-tabs", _pS(_uM([["position", "relative"], ["backgroundImage", "none"], ["backgroundColor", "#FFFFFF"]]))], ["l-tabs__wrap", _pS(_uM([["flex", 1], ["backgroundImage", "none"], ["backgroundColor", "#FFFFFF"], ["flexDirection", "row"]]))], ["l-tabs__scroll", _pS(_uM([["position", "relative"], ["flex", 1], ["flexDirection", "row"]]))], ["l-tabs__scroll--split", _pS(_uM([["borderBottomWidth", "1rpx"], ["borderBottomStyle", "solid"], ["borderBottomColor", "#eeeeee"]]))], ["l-tabs__nav", _pS(_uM([["flexDirection", "row"], ["position", "relative"], ["flexWrap", "nowrap"], ["alignItems", "center"]]))], ["l-tabs__track", _pS(_uM([["position", "absolute"], ["zIndex", 1], ["transitionDuration", "0.3s"], ["backgroundColor", "#3283ff"], ["left", 0], ["bottom", "1rpx"], ["width", "32rpx"], ["height", "6rpx"], ["borderTopLeftRadius", "8rpx"], ["borderTopRightRadius", "8rpx"], ["borderBottomRightRadius", "8rpx"], ["borderBottomLeftRadius", "8rpx"]]))], ["l-tabs__content", _pS(_uM([["width", "100%"], ["overflow", "hidden"]]))], ["l-tabs__content-inner", _uM([["", _uM([["display", "flex"], ["flexDirection", "row"], ["flex", 1], ["overflow", "visible"], ["opacity", 0]])], [".l-tabs__content--animated ", _uM([["position", "relative"], ["width", "100%"], ["height", "100%"], ["transitionProperty", "transform"]])]])], ["l-tabs__item", _pS(_uM([["position", "relative"], ["flex", "none"], ["alignItems", "center"], ["justifyContent", "center"], ["paddingTop", 0], ["paddingRight", "32rpx"], ["paddingBottom", 0], ["paddingLeft", "32rpx"], ["boxSizing", "border-box"], ["overflow", "hidden"], ["height", "96rpx"]]))], ["l-tabs__item-text", _pS(_uM([["fontWeight", "400"], ["fontSize", 14], ["whiteSpace", "nowrap"], ["transitionProperty", "color"], ["transitionDuration", "300ms"], ["color", "rgba(0,0,0,0.88)"]]))], ["l-tabs__item-text--large", _pS(_uM([["fontSize", 16]]))], ["l-tabs__item-text--active", _pS(_uM([["fontWeight", "700"], ["color", "#3283ff"]]))], ["l-tabs__item-text--disabled", _pS(_uM([["color", "rgba(0,0,0,0.25)"]]))], ["l-tabs__item--evenly", _pS(_uM([["flex", 1]]))], ["@TRANSITION", _uM([["l-tabs__track", _uM([["duration", "0.3s"]])], ["l-tabs__content-inner", _uM([["property", "transform"]])], ["l-tabs__item-text", _uM([["property", "color"], ["duration", "300ms"]])]])]])]

import { LTabPanelComponentPublicInstance  } from "@/uni_modules/lime-tabs/components/l-tab-panel/l-tab-panel.uvue"