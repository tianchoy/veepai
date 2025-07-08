import { unitConvert } from '@/uni_modules/lime-shared/unitConvert'
	import { ProgressProps } from './types';




	import { useTransition, UseTransitionOptions } from '@/uni_modules/lime-shared/animation/useTransition'
	import { LProgressOptions } from './types';
	import { Progress } from './progress'

	
	
const __sfc__ = defineComponent({
  __name: 'l-progress',
  __props: ProgressProps,
  props: /*#__PURE__*/mergeModels({
    showInfo: { type: Boolean, required: true, default: false },
    infoType: { type: String, required: true, default: 'outer' },
    infoAlign: { type: String, required: true, default: 'end' },
    strokeColor: { type: String, required: true, default: '#1677ff' },
    trailColor: { type: String, required: true, default: 'rgba(0, 0, 0, 0.06)' },
    linecap: { type: String, required: true, default: 'round' },
    infoColor: { type: String, required: true, default: 'black' },
    fontSize: { type: Object, required: true, default: 12 },
    strokeWidth: { type: Object, required: true, default: 4 }
  }, {
    "percent": {type: Number, default: 0},
  }),
  emits: ["update:percent"],
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Progress 进度条组件
	 * @description 用于展示操作或任务的进度，支持线性进度显示和多种样式配置
	 * <br>插件类型：LProgressComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-progress
	 * 
	 * @property {boolean} showInfo 是否显示进度文本（默认：false）
	 * @property {string} infoType 进度信息显示方式
	 * @value outer 在进度条外部显示
	 * @property {string} infoAlign 文本对齐方式（默认：end）
	 * @value start
	 * @value end
	 * @property {string | string[]} strokeColor 进度条颜色（支持渐变色数组）
	 * @property {string} trailColor 轨道背景色（默认：rgba(0, 0, 0, 0.06)）
	 * @property {string} linecap 进度条端点形状（'round' | 'square'）
	 * @value round 
	 * @value square 
	 * @property {string} infoColor 进度文本颜色
	 * @property {string | number} fontSize 文本字号（支持CSS单位）
	 * @property {string | number} strokeWidth 进度条粗细（支持CSS单位，默认：4px）
	 */
	const props = __props
	const percent = useModel<Number>(__ins.props, "percent")
	
	const classes = computed(():Map<string, boolean> => {
		const _class = new Map<string, boolean>()









		return _class
	})
	


































































	
	

















	const progressRef = ref<UniElement|null>(null);
	let progress:Progress|null = null
	const current = useTransition(():number=>percent.value, {
		duration: 300,
		immediate: true
	} as UseTransitionOptions)
	const stopWatch = watch(current, (v:number) => {
		if(progress != null) {
			progress!.render(v)
		}
	})
	
	onMounted(() => {
		nextTick(()=>{
			if(progressRef.value == null) return;
			progress =  new Progress(progressRef.value!);
			console.log('props.strokeColor', props.strokeColor, " at uni_modules/lime-progress/components/l-progress/l-progress.uvue:178")
			const opt: LProgressOptions = {
				showInfo: props.showInfo,
				strokeColor: props.strokeColor,
				strokeWidth: unitConvert(props.strokeWidth),
				trailColor: props.trailColor,
				linecap: props.linecap,
				fontSize: unitConvert(props.fontSize),
				infoAlign: props.infoAlign,
				infoType: props.infoType,
				infoColor: props.infoColor,
			}
			progress!.setOption(opt)
			progress!.render(current.value)
		})
	})
	
	onUnmounted(() => {
		stopWatch()
		progress?.disconnect()
	})


return (): any | null => {

  return createElementVNode("view", utsMapOf({
    class: normalizeClass(["l-progress", unref(classes)]),
    ref_key: "progressRef",
    ref: progressRef
  }), null, 2 /* CLASS */)
}
}

})
export default __sfc__
export type LProgressComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeProgressComponentsLProgressLProgressStyles = []
