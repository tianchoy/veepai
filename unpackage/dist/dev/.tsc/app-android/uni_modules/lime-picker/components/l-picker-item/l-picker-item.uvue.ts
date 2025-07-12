import { unitConvert } from '@/uni_modules/lime-shared/unitConvert'
	import { clamp } from '@/uni_modules/lime-shared/clamp'
	import { PickerItemProps, ManageChildInList, OnPick, UpdateItems } from './type';
	import { PickerColumnItem, PickerValue } from '../l-picker/type';
	
const __sfc__ = defineComponent({
  __name: 'l-picker-item',
  __props: PickerItemProps,
  props: {
    options: { type: Array as PropType<PickerColumnItem[]>, required: true, default: [] as PickerColumnItem[] },
    value: { type: Object, required: false },
    column: { type: Number, required: true, default: -1 },
    name: { type: [String, Number], required: false }
  },
  setup(__props, { expose: __expose }: SetupContext) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * PickerItem 选择器子项组件
	 * @description 用于构建多列选择器的单个列项，通常作为 Picker 组件的子组件使用
	 * <br>插件类型：LPickerItemComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-picker
	 * 
	 * @property {PickerColumnItem[]} options 当前列的选项列表（必填）
	 * @property {PickerValue} value 当前选中值
	 * @property {number} column 列索引标识（从0开始计数）
	 * @property {string | number} name 列名称标识符
	 */
	const instance = getCurrentInstance()!;
	const props = __props
	const picker = inject<LPickerComponentPublicInstance | null>('limePicker', null);
	const pickerItemInstanceArray = inject<LPickerItemComponentPublicInstance[] | null>('limePickerItems', null);
	const manageChildInList = inject<ManageChildInList | null>('limePickerManageChildInList', null);
	manageChildInList?.(instance.proxy! as LPickerItemComponentPublicInstance, true)
	const onPick = inject<OnPick | null>('limePickerOnPick', null);
	const updateItems = inject<UpdateItems | null>('limePickerUpdateItems', null);
	// web 如果初始是0 当数据加载后 无法指向0




	const curIndex = ref(0)

	const curValue = ref<PickerValue | null>(props.value);
	const column = computed(() : number => props.column != -1 ? props.column : pickerItemInstanceArray?.indexOf(instance.proxy! as LPickerItemComponentPublicInstance) ?? props.column);

	const elementPosition = computed(() : boolean[] => {
		const totalElements = pickerItemInstanceArray?.length ?? 0;
		return [column.value == 0, column.value == totalElements - 1]
	});
	const innerIndex = computed(() : number[] => [curIndex.value])
	const indicatorStyles = computed(() : string => {
		const [isFirst, isLast] = elementPosition.value
		let style = ``
		
		if(isFirst) {
			style+= 'border-top-left-radius:12rpx; border-bottom-left-radius:12rpx;'
		}
		if(isLast) {
			style+= 'border-top-right-radius:12rpx; border-bottom-right-radius:12rpx;'
		}
		return `
			${style}
			height: ${picker?.itemHeight ?? '50px'};
			background-color: rgba(0, 0, 0, 0.04); ${picker?.indicatorStyle}`
	})
	const itemStyles = computed(() : Map<string, any> => {
		const style = new Map<string, any>();
		if (picker?.itemColor != null) {
			style.set('color', picker.itemColor!)
		}
		if (picker?.itemFontSize != null) {
			style.set('font-size', picker.itemFontSize!)
		}
		if(picker?.itemHeight != null) {
			style.set('line-height', picker.itemHeight!)
			style.set('height', picker.itemHeight!)
		}
		return style
	})
	const itemActiveStyles = computed(() : Map<string, any> => {
		const style = new Map<string, any>();
		if (picker?.itemActiveColor != null) {
			style.set('color', picker.itemActiveColor!)
		}
		if (picker?.itemActiveFontWeight != null) {
			style.set('font-weight', picker.itemActiveFontWeight!)
		}
		return style
	})


	const getIndexByValue = (val : PickerValue | null) => {
		let defaultIndex = 0;
		if (val != null) {
			defaultIndex = props.options.findIndex((item) => item.value == val);
		}
		return defaultIndex < 0 ? 0 : defaultIndex;
	};

	const setIndex = (index : number) => {
		let lastIndex = curIndex.value
		let _index = clamp(index, 0,  props.options.length - 1)
		if(props.options.length > _index) {
			curIndex.value = _index;
			curValue.value = props.options[_index].value
		}












		
	}
	const setValue = (value : PickerValue | null) => {
		if (value == curValue.value) return
		curValue.value = value
		const index = getIndexByValue(value)
		setIndex(index)
	}
	const setOptions = () => { }
	const setUpdateItems = () => {
		const index = clamp(curIndex.value, 0,  props.options.length - 1)
		const curItem = props.options.length > index ? props.options[index] : null;
		if (curItem == null) return
		updateItems?.(curItem, index, column.value);
	}
	
	const handlePick = (e : UniPickerViewChangeEvent) => {
		if(props.options.length == 0) return
		const index = clamp(e.detail.value[0], 0,  props.options.length - 1);
		const curItem = props.options[index];
		if(index == curIndex.value) return
		setIndex(index)
		onPick?.(curItem, index, column.value);
	}

	const stopValue = watch(() : PickerValue | null => props.value, (v : PickerValue | null) => {
		setValue(v);
		setUpdateItems();
	}, { immediate: true })


	const itemRef = ref<UniElement | null>(null)
	const updateItemStyle = () => {
		if (itemRef.value != null) {
			const ctx = itemRef.value!.getDrawableContext()!
			const height = unitConvert(picker?.itemHeight ?? 50);
			const fontSize = unitConvert(picker?.itemFontSize ?? '32rpx');
			const rect = itemRef.value!.getBoundingClientRect()
			const x = itemRef.value!.offsetWidth / 2;
			const itemActiveFontWeight = picker?.itemActiveFontWeight ?? 700
			itemRef.value!.style.setProperty('height', height * props.options.length);
			ctx.reset()
			ctx.fillStyle = picker?.itemActiveColor ?? 'rgba(0,0,0,0.88)';
			ctx.font = `${fontSize}px`;
			ctx.textAlign = 'center'
			ctx.lineWidth = 0.5
			
			props.options.forEach((item, index) => {
				const y = height * index + fontSize + (height - fontSize) * 0.4;  //(height - fontSize * 1.1)
				ctx.fillText(item.label, x, y)
				if (index == curIndex.value && itemActiveFontWeight > 600) {
					ctx.strokeText(item.label, x, y)
				}
			})
			ctx.update()
		}
	}
	// 防止更新后尺寸不对
	watchEffect(()=> {
		if(curIndex.value > 0){}
		nextTick(updateItemStyle)
	})
	const stop = watch(() : PickerColumnItem[] => props.options, (v : PickerColumnItem[], o : PickerColumnItem[]) => {
		nextTick(updateItemStyle)
	})
	
	const resizeObserver = new UniResizeObserver((entries : Array<UniResizeObserverEntry>) => {
		updateItemStyle()
	}) 
	const stopWatch = watch(():UniElement|null => itemRef.value, (el:UniElement|null) => {
		if(el== null) return
		resizeObserver.observe(el)
	})
	// onMounted(() => {
	// 	nextTick(updateItemStyle)
	// })
	

	onBeforeUnmount(() => {
		manageChildInList?.(instance.proxy! as LPickerItemComponentPublicInstance, false)
		

		stop()
		stopWatch()
		resizeObserver.disconnect()

	})
	// onMounted(()=>{
	// 	if(props.options.length > 0 && curIndex.value == -1) {
	// 		curIndex.value = 0
	// 	}
	// })
	__expose({
		setIndex,
		setValue,
		// setOptions,
		// setUpdateItems,
		getIndexByValue
	})

return (): any | null => {

const _component_picker_view_column = resolveComponent("picker-view-column")
const _component_picker_view = resolveComponent("picker-view")

  return _cV(_component_picker_view, _uM({
    class: "l-picker-item__group",
    style: _nS(_uM({opacity: _ctx.options.length > 0 ? 1 : 0})),
    "indicator-style": unref(indicatorStyles),
    value: unref(innerIndex),
    onChange: handlePick,
    "indicator-class": "l-picker-item__indicator"
  }), _uM({
    default: withSlotCtx((): any[] => [
      _cV(_component_picker_view_column, _uM({ class: "l-picker-item__wrapper" }), _uM({
        default: withSlotCtx((): any[] => [
          _cE("view", _uM({
            ref_key: "itemRef",
            ref: itemRef
          }), null, 512 /* NEED_PATCH */)
        ]),
        _: 1 /* STABLE */
      }))
    ]),
    _: 1 /* STABLE */
  }), 8 /* PROPS */, ["style", "indicator-style", "value"])
}
}

})
export default __sfc__
export type LPickerItemComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimePickerComponentsLPickerItemLPickerItemStyles = [_uM([["l-picker-item__group", _pS(_uM([["flex", 1]]))], ["l-picker-item__group-item", _pS(_uM([["height", 50], ["lineHeight", "50px"], ["textAlign", "center"], ["transitionDuration", "100ms"], ["transitionProperty", "fontWeight,color"], ["transitionTimingFunction", "linear"], ["fontWeight", "400"], ["color", "rgba(0,0,0,0.88)"], ["fontSize", 16], ["whiteSpace", "nowrap"]]))], ["l-picker-item__group-item--active", _pS(_uM([["color", "rgba(0,0,0,0.88)"], ["fontWeight", "700"]]))], ["l-picker-item__indicator", _pS(_uM([["left", "0rpx"], ["right", "0rpx"], ["width", "auto"], ["height", 50], ["pointerEvents", "none"], ["backgroundColor", "rgba(0,0,0,0.02)"]]))], ["@TRANSITION", _uM([["l-picker-item__group-item", _uM([["duration", "100ms"], ["property", "fontWeight,color"], ["timingFunction", "linear"]])]])]])]

import { LPickerComponentPublicInstance  } from "@/uni_modules/lime-picker/components/l-picker/l-picker.uvue"