import _easycom_l_date_strip_item from '@/uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue'
import { DateStripProps, WeekDateCollection, DateStriPDay, DateType } from './type';
	import { getWeekRange, addDays, addWeeks, calcType, daysBetween } from './utils';
	import { unitConvert } from '@/uni_modules/lime-shared/unitConvert'
	
const __sfc__ = defineComponent({
  __name: 'l-date-strip',
  __props: DateStripProps,
  props: {
    firstDayOfWeek: { type: Number, required: true, default: 1 },
    format: { type: Function as PropType<(day : DateStriPDay) => DateStriPDay>, required: false },
    maxDate: { type: Number, required: false },
    minDate: { type: Number, required: false },
    value: { type: Number, required: false },
    defaultValue: { type: Number, required: false },
    modelValue: { type: Number, required: false },
    height: { type: String, required: false },
    gridWidth: { type: String, required: false },
    color: { type: String, required: false },
    activeBgColor: { type: String, required: false },
    activeColor: { type: String, required: false },
    bgColor: { type: String, required: false },
    radius: { type: String, required: false },
    switchMode: { type: String, required: true, default: 'week' },
    shape: { type: String, required: true, default: 'square' },
    showNavigation: { type: Boolean, required: false },
    weekdays: { type: Array as PropType<string[]>, required: true, default: ['日', '一', '二', '三', '四', '五', '六'] }
  },
  emits: ['change', 'select', 'scroll', 'panelChange', 'update:modelValue'],
  setup(__props, { expose: __expose }: SetupContext) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props
	// 当前选中的周索引
	const currentWeekIndex = ref(0)
	const scrollLeft = ref(0)
	// 是否循环滚动
	const swiperCircular = ref(true);
	const selectedDate = ref<Date|null>(null);
	// 计算一周的星期顺序
	const firstDayOfWeek = computed(() : number => Math.min(Math.max(props.firstDayOfWeek, 0), 6));
	
	// 计算最小和最大日期
	const today = new Date();
	const minDate = computed(() : Date => (props.minDate != null ? new Date(props.minDate!) : today));
	const maxDate = computed(() : Date => (props.maxDate != null
		? new Date(props.maxDate!)
		: addDays(today, 31))
	);
	
	const days = computed(():number => {
		return daysBetween(maxDate.value, minDate.value)
	})
	
	const styles = computed(():Map<string, any>=>{
		const style = new Map<string, any>()
		
		if(props.height != null) {
			style.set('height', props.height!)
		}
		if(props.bgColor != null) {
			style.set('background', props.bgColor!)
		}
		return style
	})
	
	const cache = new Map<number,WeekDateCollection>()
	const createWeek = (currentStartDate: Date, length: number):WeekDateCollection => {
		const dates : DateStriPDay[] = [];
		const time = currentStartDate.getTime()
		if(cache.has(time)) {
			return cache.get(time)!
		}
		for (let i = 0; i < length; i++) {
			const date = new Date(time);
			date.setDate(currentStartDate.getDate() + i);
			const week = date.getDay();
			const year = date.getFullYear();
			const month = date.getMonth() + 1; 
			const day =  date.getDate()
			const dateObj:DateStriPDay = {
				key: `${year}-${month}-${day}`,
				date,
				year,
				month,
				day,
				text: `${day}`.padStart(2, '0'),
				type: calcType(date, minDate.value, maxDate.value, selectedDate.value),
				prefix: props.weekdays[week],
			}
			dates.push(props.format != null ? props.format!(dateObj) : dateObj);
		}
		const obj:WeekDateCollection = {
			start: new Date(dates[0].year, dates[0].month - 1, dates[0].day).getTime(),
			end: new Date(dates[length - 1].year, dates[length - 1].month - 1, dates[length - 1].day).getTime(),
			dates
		} as WeekDateCollection
		
		// cache.set(time, obj)
		
		return obj
	}
	
	const currentDate = ref<Date>(today)
	
	// 计算要显示的三周数据
	const displayWeeks = computed(() : WeekDateCollection[] => {
		const weeks: WeekDateCollection[] = [];
		if(props.switchMode == 'week') {
			const currentRange = getWeekRange(currentDate.value, firstDayOfWeek.value);
			const offsetMap = new Map<number, number[]>([
				[0, [0, 1, -1]],
				[1, [-1, 0, 1]],
				[2, [1, -1, 0]],
			])
			let indices = offsetMap.get(currentWeekIndex.value)!
			indices.forEach(i => {
				 const weekDate = addWeeks(currentRange.start, i);
				 weeks.push(createWeek(weekDate, 7)) 
			})
		} else {
			 weeks.push(createWeek(minDate.value, days.value)) 
		}
		
		return weeks
	})
	
	const swiperChange = (event : UniSwiperChangeEvent) => {
		const delta = event.detail.current - currentWeekIndex.value;
		const newDate = addWeeks(currentDate.value, delta == 1 || delta == -2 ? 1 : -1);
		currentDate.value = newDate;
		currentWeekIndex.value = event.detail.current;
	}
	const swiperFinish = (_event : UniSwiperAnimationFinishEvent) => {
		
	}
	
	const onClick = (day: DateStriPDay) => {
		if(day.type == 'disabled') return
		selectedDate.value = day.date
		const v = day.date.getTime()
		emit('change', v)
		emit('select', v)
		emit('update:modelValue', v)
	}
	
	
	const scrollToDate = (date: Date) => {
		currentDate.value = date
		if(props.switchMode != 'none') return
		scrollLeft.value = unitConvert(props.gridWidth ?? 50)  *  daysBetween(date, minDate.value)
	}
	
	watchEffect(()=>{
		const value = props.value ?? props.modelValue
		if(value == null) return
		selectedDate.value = new Date(value)
	})
	
	onMounted(()=>{
		nextTick(()=>{
			scrollToDate(currentDate.value)
		})
	})
	
	__expose({
		scrollToDate
	})
	

return (): any | null => {

const _component_l_date_strip_item = resolveEasyComponent("l-date-strip-item",_easycom_l_date_strip_item)

  return _ctx.switchMode == 'none'
    ? _cE("scroll-view", _uM({
        key: 0,
        class: "l-date-strip l-date-strip__scroll",
        "scroll-x": true,
        "scroll-left": unref(scrollLeft),
        "show-scrollbar": false,
        direction: "horizontal",
        style: _nS([unref(styles)])
      }), [
        _cV(_component_l_date_strip_item, _uM({
          dates: unref(displayWeeks)[0].dates,
          color: _ctx.color,
          activeBgColor: _ctx.activeBgColor,
          activeColor: _ctx.activeColor,
          bgColor: _ctx.bgColor,
          radius: _ctx.radius,
          switchMode: _ctx.switchMode,
          shape: _ctx.shape,
          onClick: onClick
        }), null, 8 /* PROPS */, ["dates", "color", "activeBgColor", "activeColor", "bgColor", "radius", "switchMode", "shape"])
      ], 12 /* STYLE, PROPS */, ["scroll-left"])
    : _cE("swiper", _uM({
        key: 1,
        class: "l-date-strip",
        style: _nS([unref(styles)]),
        current: unref(currentWeekIndex),
        circular: unref(swiperCircular),
        onAnimationfinish: swiperFinish,
        onChange: swiperChange
      }), [
        _cE(Fragment, null, RenderHelpers.renderList(unref(displayWeeks), (week, g, __index, _cached): any => {
          return _cE("swiper-item", _uM({ key: g }), [
            _cV(_component_l_date_strip_item, _uM({
              dates: week.dates,
              color: _ctx.color,
              activeBgColor: _ctx.activeBgColor,
              activeColor: _ctx.activeColor,
              bgColor: _ctx.bgColor,
              radius: _ctx.radius,
              switchMode: _ctx.switchMode,
              shape: _ctx.shape,
              onClick: onClick
            }), null, 8 /* PROPS */, ["dates", "color", "activeBgColor", "activeColor", "bgColor", "radius", "switchMode", "shape"])
          ])
        }), 128 /* KEYED_FRAGMENT */)
      ], 44 /* STYLE, PROPS, NEED_HYDRATION */, ["current", "circular"])
}
}

})
export default __sfc__
export type LDateStripComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeDateStripComponentsLDateStripLDateStripStyles = [_uM([["l-date-strip", _pS(_uM([["height", 86], ["backgroundColor", "#ffffff"]]))], ["l-date-strip__scroll", _pS(_uM([["flexDirection", "row"]]))], ["l-date-strip__item", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["paddingTop", 8], ["paddingRight", 0], ["paddingBottom", 8], ["paddingLeft", 0], ["boxSizing", "border-box"]]))], ["l-date-strip__item--week", _pS(_uM([["flex", 1]]))], ["l-date-strip__grid", _uM([[".l-date-strip__item--week ", _uM([["flex", 1]])], [".l-date-strip__item--none ", _uM([["width", 50]])], ["", _uM([["display", "flex"], ["flexDirection", "column"], ["marginTop", 0], ["marginRight", "4rpx"], ["marginBottom", 0], ["marginLeft", "4rpx"], ["transitionDuration", "300ms"], ["transitionProperty", "backgroundColor,color"], ["transitionTimingFunction", "linear"]])]])], ["l-date-strip__grid-prefix", _uM([["", _uM([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["fontSize", 14], ["color", "rgba(0,0,0,0.45)"]])], [".l-date-strip__grid--none ", _uM([["paddingBottom", 4], ["paddingTop", 4]])], [".l-date-strip__grid--circle ", _uM([["paddingBottom", 4]])]])], ["l-date-strip__grid-day", _pS(_uM([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["fontSize", 16], ["color", "rgba(0,0,0,0.88)"], ["fontWeight", "bold"]]))], ["l-date-strip__grid-suffix", _pS(_uM([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["position", "absolute"], ["top", "50%"], ["transform", "translateY(60%)"], ["fontSize", 12], ["color", "rgba(0,0,0,0.65)"]]))], ["l-date-strip__grid-info", _uM([[".l-date-strip__grid--circle ", _uM([["borderTopLeftRadius", 99], ["borderTopRightRadius", 99], ["borderBottomRightRadius", 99], ["borderBottomLeftRadius", 99]])], ["", _uM([["display", "flex"], ["flex", 1], ["justifyContent", "center"], ["alignItems", "center"], ["position", "relative"]])]])], ["l-date-strip__grid--square", _pS(_uM([["borderTopLeftRadius", 5], ["borderTopRightRadius", 5], ["borderBottomRightRadius", 5], ["borderBottomLeftRadius", 5], ["paddingTop", 6], ["paddingRight", 0], ["paddingBottom", 6], ["paddingLeft", 0]]))], ["l-date-strip__grid--active-bg", _pS(_uM([["backgroundColor", "#3283ff"]]))], ["l-date-strip__grid--active-text", _pS(_uM([["color", "#FFFFFF"]]))], ["l-date-strip__grid--active-text-none", _pS(_uM([["color", "#3283ff"]]))], ["l-date-strip__grid--disabled", _pS(_uM([["opacity", 0.4]]))], ["@TRANSITION", _uM([["l-date-strip__grid", _uM([["duration", "300ms"], ["property", "backgroundColor,color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-prefix", _uM([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-day", _uM([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-suffix", _uM([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])]])]])]
