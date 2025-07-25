import { TabPanelProps } from './type';
	import { TabPanel } from '../l-tabs/type'
	
const __sfc__ = defineComponent({
  __name: 'l-tab-panel',
  __props: TabPanelProps,
  props: {
    badge: { type: Object, required: false },
    offset: { type: Array as PropType<any[]>, required: false },
    dot: { type: Boolean, required: false },
    destroyOnHide: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    label: { type: String, required: false },
    lazy: { type: Boolean, required: false },
    value: { type: Number, required: false }
  },
  setup(__props, { expose: __expose }: SetupContext) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * TabPanel 标签页面板组件
	 * @description 用于构建Tabs组件的单个内容面板，必须作为Tabs的子组件使用
	 * <br>插件类型：LTabPanelComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-tabs
	 * 
	 * @property {any} badge 徽标配置
	 * @property {number[]} offset 徽标位置偏移量[x,y]
	 * @property {boolean} dot 是否显示圆点徽标（默认：false）
	 * @property {boolean} destroyOnHide 内容隐藏时销毁DOM（默认：false）
	 * @property {boolean} disabled 禁用当前选项卡（默认：false）
	 * @property {string} label 选项卡标题内容
	 * @property {boolean} lazy 启用懒加载（默认：false）
	 * @property {number} value 选项卡唯一标识
	 */
	
	const props = __props
	const children = inject<LTabPanelComponentPublicInstance[]|null>('LimeTabs', null) as Ref<LTabPanelComponentPublicInstance[]>|null;
	const instance = getCurrentInstance()!.proxy!
	onMounted(()=>{
		if(children == null) return
		children.value.push(instance as LTabPanelComponentPublicInstance)
	})
	
	

	// 安卓端数组属性存在BUG 死循环
	const innderOffset = ref<any[]>([])
	watch((): any[]|null => props.offset, (n: any[]|null) => {
		if(innderOffset.value.join('') == n?.join('')) return
		innderOffset.value = n ?? []
	}, {immediate: true})
	
	__expose({
		innderOffset
	})

	
	
	onUnmounted(()=>{
		if(children == null) return
		children.value = children.value.filter((it):boolean => it != (instance))
	})

return (): any | null => {

  return _cE("view", _uM({
    class: "l-tab__panel",
    "aria-role": "tabpanel"
  }), [
    renderSlot(_ctx.$slots, "default")
  ])
}
}

})
export default __sfc__
export type LTabPanelComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeTabsComponentsLTabPanelLTabPanelStyles = [_uM([["l-tab__panel", _pS(_uM([["width", "100%"], ["flex", 1], ["flexShrink", 0], ["boxSizing", "border-box"]]))]])]
