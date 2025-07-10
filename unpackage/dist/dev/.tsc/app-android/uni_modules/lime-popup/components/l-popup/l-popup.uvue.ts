import _easycom_l_overlay from '@/uni_modules/lime-overlay/components/l-overlay/l-overlay.uvue'
import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import { useTransition, UseTransitionOptions, TransitionEmitStatus } from '@/uni_modules/lime-transition';
	import { convertRadius } from './utils'
	import { PopupProps } from './type';
	
	
const __sfc__ = defineComponent({
  __name: 'l-popup',
  __props: PopupProps,
  props: /*#__PURE__*/mergeModels({
    closeable: { type: Boolean, required: true, default: false },
    closeOnClickOverlay: { type: Boolean, required: true, default: true },
    destroyOnClose: { type: Boolean, required: true, default: false },
    overlayStyle: { type: [String, UTSJSONObject], required: false },
    position: { type: String, required: true, default: 'center' },
    preventScrollThrough: { type: Boolean, required: true, default: true },
    overlay: { type: Boolean, required: true, default: true },
    transitionName: { type: String, required: false },
    visible: { type: Boolean, required: false },
    zIndex: { type: Number, required: true, default: 999 },
    duration: { type: Number, required: true, default: 300 },
    bgColor: { type: String, required: false },
    closeIcon: { type: String, required: true, default: 'close' },
    iconColor: { type: String, required: false },
    lStyle: { type: [String, UTSJSONObject], required: false },
    safeAreaInsetBottom: { type: Boolean, required: true, default: true },
    safeAreaInsetTop: { type: Boolean, required: true, default: false },
    radius: { type: [String, Number, Array as PropType<(string|number)[]>], required: false }
  }, {
    "modelValue": {type: Boolean},
  }),
  emits: /*#__PURE__*/mergeModels(['change', 'click-overlay', 'click-close', 'open', 'opened','close','closed', 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'], ["update:modelValue"]),
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Popup 弹出层组件
	 * @description 提供多种位置的弹窗展示能力，支持自定义内容和动画效果
	 * <br>插件类型：LPopupComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-popup
	 * 
	 * @property {boolean} closeable 显示关闭按钮（默认：false）
	 * @property {boolean} closeOnClickOverlay 点击遮罩关闭（默认：true）
	 * @property {boolean} destroyOnClose 关闭时销毁内容（默认：false）
	 * @property {string} overlayStyle 遮罩层样式（支持CSS字符串）
	 * @property {'top' | 'left' | 'right' | 'bottom' | 'center' | ''} position 弹出位置
	 * @value top    从顶部滑入
	 * @value bottom 从底部滑入
	 * @value left   从左侧滑入  
	 * @value right  从右侧滑入
	 * @value center 居中显示（默认）
	 * @property {boolean} preventScrollThrough 阻止滚动穿透（默认：true）
	 * @property {boolean} overlay 显示遮罩层（默认：true）
	 * @property {string} transitionName 自定义动画名称（配合transition使用）
	 * @property {string|number|Array} radius 圆角 可以是字符，数值，数组
	 * @property {boolean} visible 控制显示/隐藏（支持v-model）
	 * @property {number} zIndex 组件层级（默认：999）
	 * @property {number} duration 动画时长（单位ms，默认：300）
	 * @property {string} bgColor 内容区域背景色（默认：#ffffff）
	 * @property {string} closeIcon 关闭图标名称/路径（默认：'close'）
	 * @property {string} iconColor 关闭图标颜色（默认：#333）
	 * @property {string} lStyle 自定义内容区样式（支持CSS字符串）
	 * @property {boolean} safeAreaInsetBottom 适配底部安全区域（默认：true）
	 * @property {boolean} safeAreaInsetTop 适配顶部安全区域（默认：true）
	 * @event {Function} close 关闭时触发（返回触发来源：'close-btn' | 'overlay'）
	 * @event {Function} change 切换时触发
	 * @event {Function} click-overlay 点击遮罩触发
	 * @event {Function} click-close 点击关闭触发
	 * @event {Function} open 打开触发
	 * @event {Function} opened 打开完成触发
	 * @event {Function} closed 关闭完成触发
	 * @event {Function} before-enter
	 * @event {Function} enter 
	 * @event {Function} after-enter
	 * @event {Function} before-leave
	 * @event {Function} leave
	 * @event {Function} after-leave
	 */
	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props
	
	const modelValue = useModel<Boolean>(__ins.props, "modelValue");
	const innerValue = computed({
		set(value: boolean) {
			modelValue.value = value;
			emit('change', value)
		},
		get():boolean {

			return (props.visible ?? false) || modelValue.value// ?? false




		}
	} as WritableComputedOptions<boolean>)
	const status = ref<TransitionEmitStatus>('before-enter')
	const {inited, display, classes, finished} = useTransition({
		defaultName: props.transitionName ?? 'popup-fade',
		appear: innerValue.value,
		emits: (name:TransitionEmitStatus) => { 
			status.value = name
			if(name == 'before-enter') {
				emit('open')
			} else if(name == 'after-enter') {
				emit('opened')
			} else if(name == 'before-leave') {
				emit('close')
			} else if(name == 'after-leave') {
				emit('closed')
			}
			emit(name) 
		},
		visible: (): boolean => innerValue.value,
		duration: props.duration,
	} as UseTransitionOptions)
	
	const overlayZIndex = computed(():number => props.zIndex > 0 ? props.zIndex - 1: 998);
	
	const rootClass = computed(():string=>{
		const safe = props.safeAreaInsetTop && props.position == 'top' 
			?  'l-popup--safe-top' 
			:  props.safeAreaInsetBottom && props.position == 'bottom' 
				? 'l-popup--safe-bottom'
				: ''
			
		return `l-popup--${props.position} ${safe} ${classes.value}`
	})
	
	const {safeAreaInsets} = uni.getWindowInfo()
	
	const styles = computed<Map<string,any>>(():Map<string,any> => {
		const style = new Map<string,any>();

		style.set('transition-duration', (['after-leave', 'before-enter'].includes(status.value) ? 0 : props.duration) + 'ms')




		if (props.bgColor != null) {
			style.set("background", props.bgColor!)
		}
		if (props.zIndex > 0) {
			style.set("z-index", props.zIndex)
		}
		
		if(props.safeAreaInsetBottom && props.position == 'bottom') {
			style.set('padding-bottom', safeAreaInsets.bottom + 'px')
		}
		if(props.safeAreaInsetTop && props.position == 'top') {
			style.set('padding-top', safeAreaInsets.top + 'px')
		}
		
		if(props.radius != null) {
			const values = convertRadius(props.radius!)
			style.set('border-top-left-radius', values[0])
			style.set('border-top-right-radius', values[1])
			style.set('border-bottom-right-radius', values[2])
			style.set('border-bottom-left-radius', values[3])
		}
		





		
		return style
	})
	const handleOverlayClick = () => {
		if(props.closeOnClickOverlay) {
			innerValue.value = false;
			emit('click-overlay')
		}
	}
	const handleClose = () => {
		innerValue.value = false;
		emit('click-close')
	}
	

	const popupRef = ref<UniElement|null>(null)
	
	watchEffect(()=>{
		if(!display.value) {
			popupRef.value?.style.setProperty('display', 'none')
		} else {
			popupRef.value?.style.setProperty('display', 'flex')
		}
	})


return (): any | null => {

const _component_l_overlay = resolveEasyComponent("l-overlay",_easycom_l_overlay)
const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)

  return createElementVNode(Fragment, null, [
    isTrue(_ctx.destroyOnClose ? unref(display) && _ctx.overlay : _ctx.overlay)
      ? createVNode(_component_l_overlay, utsMapOf({
          key: 0,
          visible: unref(innerValue),
          zIndex: unref(overlayZIndex),
          appear: true,
          preventScrollThrough: _ctx.preventScrollThrough,
          "l-style": _ctx.overlayStyle,
          onClick: handleOverlayClick
        }), null, 8 /* PROPS */, ["visible", "zIndex", "preventScrollThrough", "l-style"])
      : createCommentVNode("v-if", true),
    isTrue(_ctx.destroyOnClose ? unref(display) : unref(inited))
      ? createElementVNode("view", utsMapOf({
          key: 1,
          class: normalizeClass(["l-popup", unref(rootClass)]),
          ref_key: "popupRef",
          ref: popupRef,
          style: normalizeStyle([unref(styles), _ctx.lStyle]),
          onTransitionend: unref(finished)
        }), [
          renderSlot(_ctx.$slots, "default"),
          isTrue(_ctx.closeable)
            ? createElementVNode("view", utsMapOf({
                key: 0,
                class: "l-popup__close",
                onClick: handleClose
              }), [
                renderSlot(_ctx.$slots, "close-btn", {}, (): any[] => [
                  createVNode(_component_l_icon, utsMapOf({
                    class: "l-popup__close-icon",
                    name: _ctx.closeIcon,
                    size: "27px",
                    color: _ctx.iconColor
                  }), null, 8 /* PROPS */, ["name", "color"])
                ])
              ])
            : createCommentVNode("v-if", true)
        ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, ["onTransitionend"])
      : createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */)
}
}

})
export default __sfc__
export type LPopupComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimePopupComponentsLPopupLPopupStyles = [utsMapOf([["l-popup", utsMapOf([["", utsMapOf([["position", "fixed"], ["transitionDuration", "300ms"], ["transitionProperty", "transform,opacity"], ["transitionTimingFunction", "ease"], ["backgroundColor", "#ffffff"], ["overflow", "visible"], ["opacity", 1]])], [".l-popup-fade-enter", utsMapOf([["opacity", 0]])], [".l-popup-fade-leave-to", utsMapOf([["opacity", 0]])], [".l-popup-fade-enter.l-popup--top", utsMapOf([["transform", "scale(1) translate(0, -100%)"]])], [".l-popup-fade-leave-to.l-popup--top", utsMapOf([["transform", "scale(1) translate(0, -100%)"]])], [".l-popup-fade-enter.l-popup--bottom", utsMapOf([["transform", "scale(1) translate(0, 100%)"]])], [".l-popup-fade-leave-to.l-popup--bottom", utsMapOf([["transform", "scale(1) translate(0, 100%)"]])], [".l-popup-fade-enter.l-popup--left", utsMapOf([["transform", "scale(1) translate(-100%, 0)"]])], [".l-popup-fade-leave-to.l-popup--left", utsMapOf([["transform", "scale(1) translate(-100%, 0)"]])], [".l-popup-fade-enter.l-popup--right", utsMapOf([["transform", "scale(1) translate(100%, 0)"]])], [".l-popup-fade-leave-to.l-popup--right", utsMapOf([["transform", "scale(1) translate(100%, 0)"]])], [".l-popup-fade-enter.l-popup--center", utsMapOf([["transform", "translate(-50%, -50%) scale(0.6)"], ["opacity", 0]])], [".l-popup-fade-leave-to.l-popup--center", utsMapOf([["transform", "translate(-50%, -50%) scale(0.6)"], ["opacity", 0]])], [".l-dialog-enter.l-popup--center", utsMapOf([["transform", "scale(0.6) translate(-50%, -50%)"], ["opacity", 0]])], [".l-dialog-leave-to.l-popup--center", utsMapOf([["transform", "scale(0.6) translate(-50%, -50%)"], ["opacity", 0]])]])], ["l-popup__close", padStyleMapOf(utsMapOf([["position", "absolute"], ["top", 0], ["right", 0], ["paddingTop", "20rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "20rpx"], ["paddingLeft", "20rpx"]]))], ["l-popup__close-icon", padStyleMapOf(utsMapOf([["color", "rgba(0,0,0,0.6)"]]))], ["l-popup--top", padStyleMapOf(utsMapOf([["top", 0], ["left", 0], ["right", 0], ["borderBottomLeftRadius", "18rpx"], ["borderBottomRightRadius", "18rpx"], ["transform", "scale(1) translate(0, 0)"]]))], ["l-popup--bottom", padStyleMapOf(utsMapOf([["bottom", 0], ["left", 0], ["right", 0], ["borderTopLeftRadius", "18rpx"], ["borderTopRightRadius", "18rpx"], ["transform", "scale(1) translate(0, 0)"]]))], ["l-popup--left", padStyleMapOf(utsMapOf([["top", 0], ["left", 0], ["bottom", 0], ["transform", "scale(1) translate(0, 0)"]]))], ["l-popup--right", padStyleMapOf(utsMapOf([["top", 0], ["right", 0], ["bottom", 0], ["transform", "scale(1) translate(0, 0)"]]))], ["l-popup--center", padStyleMapOf(utsMapOf([["top", "50%"], ["left", "50%"], ["transform", "translate(-50%, -50%) scale(1)"], ["transformOrigin", "50% 50%"], ["borderTopLeftRadius", "18rpx"], ["borderTopRightRadius", "18rpx"], ["borderBottomRightRadius", "18rpx"], ["borderBottomLeftRadius", "18rpx"]]))], ["@TRANSITION", utsMapOf([["l-popup", utsMapOf([["duration", "300ms"], ["property", "transform,opacity"], ["timingFunction", "ease"]])]])]])]
