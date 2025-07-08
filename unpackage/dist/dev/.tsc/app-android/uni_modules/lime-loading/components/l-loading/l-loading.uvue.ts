import { LoadingProps } from './type'

	// import {useLoading} from './useLoading'
	import {useLoading} from '@/uni_modules/lime-loading'

	
const __sfc__ = defineComponent({
  __name: 'l-loading',
  __props: LoadingProps,
  props: {
    color: { type: String, required: false },
    type: { type: String, required: true, default: 'circular' },
    size: { type: String, required: true, default: '40rpx' },
    text: { type: String, required: false },
    textColor: { type: String, required: false },
    textSize: { type: String, required: false },
    mode: { type: String, required: true, default: 'raf' },
    vertical: { type: Boolean, required: true, default: false },
    animated: { type: Boolean, required: true, default: true }
  },
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Loading 加载指示器
	 * @description 用于表示加载中的过渡状态，支持多种动画类型和布局方式
	 * <br> 插件类型：LLoadingComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-loading
	 * 
	 * @property {string} color 加载图标颜色（默认：主题色）
	 * @property {'circular' | 'spinner' | 'failed'} mode 动画实现的模式.只针对APP
	 * @value raf 延时
	 * @value animate 基于元素的annimate方法
	 * @property {'circular' | 'spinner' | 'failed'} type 加载状态类型
	 * @value circular  环形旋转动画（默认）
	 * @value spinner   菊花转动画
	 * @value failed    加载失败提示
	 * @property {string} text 提示文字内容
	 * @property {string} textColor 文字颜色（默认同color）
	 * @property {string} textSize 文字字号（默认：14px）
	 * @property {boolean} vertical 是否垂直排列图标和文字
	 * @property {boolean} animated 是否启用旋转动画（failed类型自动禁用）
	 * @property {string} size 图标尺寸（默认：'40px'）
	 */
	const name = 'l-loading'
	const props = __props
	
	
	const classes = computed<Map<string,any>>(():Map<string,any> => {
		const cls = new Map<string,any>()
		cls.set(name + '--' + props.type, true)
		if (props.vertical) {
			cls.set('is-vertical', props.vertical)
		} else {
			cls.set('is-horizontal', !props.vertical)
		}
		return cls
	})
	
	const spinnerStyle = computed<Map<string,any>>(():Map<string,any> => {
		const style = new Map<string,any>()
		style.set('width', props.size)
		style.set('height', props.size)




		return style
	})
	
	const textStyle = computed<Map<string,any>>(():Map<string,any> => {
		const style = new Map<string,any>()
		if (props.textColor != null) {
			style.set('color', props.textColor!)
		}
		if (props.textSize != null) {
			style.set('font-size', props.textSize!)
		}
		return style
	})

	const loadingRef = ref<UniElement|null>(null)
	// const {state, color} =  useLoading(loadingRef, props.type, props.color, 1)
	const loading = useLoading(loadingRef)
	loading.type = props.type;
	loading.mode = props.mode;
	if(props.animated){
		loading.play()
	}
	
	// state.value = true
	watchEffect(()=>{
		if(loadingRef.value == null) return
		const color = props.color  ?? loadingRef.value?.style.getPropertyValue('border-left-color')
		loading.color = color == null || color.length == 0 ? '#1677ff' : color
		
		if(props.animated){
			loading.play()
		} else {
			loading.pause()
		}
	})

	

return (): any | null => {

  return createElementVNode("view", utsMapOf({
    class: normalizeClass(["l-loading", unref(classes)])
  }), [
    createElementVNode("view", utsMapOf({
      class: "l-loading__view",
      ref_key: "loadingRef",
      ref: loadingRef,
      style: normalizeStyle(unref(spinnerStyle))
    }), null, 4 /* STYLE */),
    isTrue(_ctx.$slots['default'] != null || _ctx.text != null)
      ? createElementVNode("text", utsMapOf({
          key: 0,
          class: "l-loading__text",
          style: normalizeStyle(unref(textStyle))
        }), [
          renderSlot(_ctx.$slots, "default", {}, (): any[] => [toDisplayString(_ctx.text)])
        ], 4 /* STYLE */)
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
export type LLoadingComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeLoadingComponentsLLoadingLLoadingStyles = [utsMapOf([["l-loading", utsMapOf([["", utsMapOf([["display", "flex"], ["position", "relative"], ["flexDirection", "row"], ["alignItems", "center"], ["borderLeftColor", "#3283ff"], ["borderLeftWidth", 0]])], [".is-vertical", utsMapOf([["flexDirection", "column"]])]])], ["l-loading__text", utsMapOf([["", utsMapOf([["marginLeft", "16rpx"], ["color", "rgba(0,0,0,0.45)"], ["fontSize", 14]])], [".l-loading.is-vertical ", utsMapOf([["marginTop", "8rpx"], ["marginRight", 0], ["marginBottom", 0], ["marginLeft", 0]])]])], ["l-loading__ball", padStyleMapOf(utsMapOf([["width", "40rpx"], ["height", "40rpx"]]))], ["l-loading__circular", padStyleMapOf(utsMapOf([["width", "40rpx"], ["height", "40rpx"]]))], ["l-loading__spinner", padStyleMapOf(utsMapOf([["width", "40rpx"], ["height", "40rpx"]]))]])]
