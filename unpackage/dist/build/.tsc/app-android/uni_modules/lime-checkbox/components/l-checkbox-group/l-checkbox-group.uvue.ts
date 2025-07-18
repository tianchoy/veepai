import { CheckboxGroupProps } from './type';
	import { CheckboxChangeOptions } from '../l-checkbox/type';
	import { setCheckAllStatus } from './utils';
	
	
const __sfc__ = defineComponent({
  __name: 'l-checkbox-group',
  __props: CheckboxGroupProps,
  props: {
    disabled: { type: Boolean, required: true, default: false },
    readonly: { type: Boolean, required: true, default: false },
    max: { type: Number, required: false },
    name: { type: Object, required: false },
    value: { type: Array as PropType<any[]>, required: false },
    modelValue: { type: Array as PropType<any[]>, required: false },
    defaultValue: { type: Array as PropType<any[]>, required: false },
    size: { type: String, required: true, default: 'medium' },
    direction: { type: String, required: true, default: 'horizontal' },
    gap: { type: String, required: false },
    icon: { type: String, required: true, default: 'rectangle' },
    fontSize: { type: String, required: false },
    iconSize: { type: String, required: false },
    checkedColor: { type: String, required: false },
    iconBgColor: { type: String, required: false },
    iconBorderColor: { type: String, required: false },
    iconDisabledColor: { type: String, required: false },
    iconDisabledBgColor: { type: String, required: false }
  },
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(__props, { expose: __expose }: SetupContext) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * CheckboxGroup 复选框组容器
	 * @description 用于管理多个 Checkbox 组件，支持整体禁用、最大选择和布局控制
	 * <br> 插件类型：LCheckboxGroupComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-checkbox-group
	 * 
	 * @property {Boolean} disabled 是否禁用组件
	 * @property {Boolean} readonly 是否只读组件
	 * @property {Number} max 支持最多选中的数量
	 * @property {String|Number} name 唯一标识
	 * @property {String|Number} value 选中值
	 * @property {'small' | 'medium' | 'large'} size 组件统一尺寸
	 * @value small
	 * @value medium
	 * @value large
	 * @property {String} direction 布局方向
	 * @value horizontal 水平
	 * @value vertical 垂直
	 * @property {String} icon = [square|round|circle]  形状
	 * @value circle	icon 圆形
	 * @value line	    icon 线
	 * @value rectangle	icon 方形
	 * @value dot	icon 点状
	 * @property {string} fontSize 文本统一字号
	 * @property {string} iconSize 图标统一尺寸
	 * @property {string} checkedColor 选中状态主题色
	 * @property {string} iconBgColor 图标背景色
	 * @property {string} iconBorderColor 图标边框色
	 * @property {string} iconDisabledColor 禁用图标颜色
	 * @property {string} iconDisabledBgColor 禁用背景色
	 * @event {Function} change 
	 */
	
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props
	
	const _innerValue = ref(props.defaultValue ?? [])
	const innerValue = computed({
		set(value: any[]){
			_innerValue.value = value
			emit('change', value)
			emit('update:value', value)
			emit('update:modelValue', value)
		},
		get(): any[]{
			return props.value ?? props.modelValue ?? _innerValue.value
		},
	} as WritableComputedOptions<any[]>)
	
	const checkedSet = computed(():Set<any>=>{
		const set = new Set<any>()
		if (Array.isArray(innerValue.value)) {
			innerValue.value.forEach(item => {
				set.add(item)
			})
		}
		return set
	});
	const children = reactive<LCheckboxComponentPublicInstance[]>([]);
	// @ts-ignore
	const checkAllStatus = setCheckAllStatus(children, innerValue, checkedSet);
	const maxExceeded = computed(():boolean => {
		return props.max != null && innerValue.value.length == props.max;
	});

	const manageChildInList = (child: LCheckboxComponentPublicInstance, shouldAdd: boolean) => {
		const index = children.indexOf(child);
		if(shouldAdd) {
			if(index != -1) return
			children.push(child)
		} else {
			if(index == -1) return
			children.splice(index, 1);
		}
	}
	const handleCheckboxChange = (item: CheckboxChangeOptions) => {
		const currentValue = item.value;
		if(Array.isArray(innerValue.value)) {
			if(currentValue == null) return;
			const val = [...innerValue.value];
			if (item.checked) {
				val.push(currentValue);
			} else {
				const i = val.indexOf(currentValue);
				val.splice(i, 1);
			}
			innerValue.value = val
		} else {
			console.warn(`CheckboxGroup Warn: \`value\` must be an array, instead of ${typeof innerValue.value}`);
		}
	}
	const getAllCheckboxValue = () : any[] => {
		const arr:any[] = []
		for (let i = 0, len = children.length; i < len; i++) {
			const item = children[i];
			const value = item.value ?? item.name //?? item.$.uid;
			if (item.checkAll) continue;
			if (value == null) continue;
			if(arr.includes(value)) continue;
			arr.push(value)
			if (maxExceeded.value) break;
		}
		return arr
	};
	const toggleAllCheckboxValues = () : any[] => {
		const arr:any[] = []
		
		for (let i = 0, len = children.length; i < len; i++) {
			const item = children[i];
			const value = item.value ?? item.name;
			
			if (item.checkAll) continue;
			if (value == null) continue;
			if(!checkedSet.value.has(value)) {
				arr.push(value)
			};
			if (maxExceeded.value) break;
		}
		return arr;
	};
	const onCheckAllChange = (checked: boolean) => {
		const value = checked ? getAllCheckboxValue() : [];
		innerValue.value = value;
	}
	
	const onCheckedChange = (item: CheckboxChangeOptions) => {
		if(item.checkAll) {
			onCheckAllChange(item.checked);
		} else {
			handleCheckboxChange(item);
		}
	}
	
	const toggleAll = (checked : boolean) => {
		const value = checked ? getAllCheckboxValue() : toggleAllCheckboxValues();
		innerValue.value = value
	}
	
	
	__expose({
		toggleAll
	})
	
	provide('limeCheckboxGroup', props)
	provide('limeCheckboxGroupValue', innerValue)
	provide('limeCheckboxGroupStatus', checkAllStatus)
	provide('limeCheckboxGroupCheckedSet', checkedSet)
	provide('limeCheckboxGroupManageChildInList', manageChildInList)
	provide('limeCheckboxGroupOnCheckedChange', onCheckedChange)
	// const optionList = getOptions(props, children);
	

return (): any | null => {

  return _cE("view", _uM({
    class: _nC(["l-checkbox-group", 'l-checkbox-group--'+ _ctx.direction])
  }), [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
export type LCheckboxGroupComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeCheckboxComponentsLCheckboxGroupLCheckboxGroupStyles = [_uM([["l-checkbox-group", _pS(_uM([["flexDirection", "row"]]))], ["l-checkbox-group--vertical", _pS(_uM([["flexDirection", "column"]]))]])]

import { LCheckboxComponentPublicInstance  } from "@/uni_modules/lime-checkbox/components/l-checkbox/l-checkbox.uvue"