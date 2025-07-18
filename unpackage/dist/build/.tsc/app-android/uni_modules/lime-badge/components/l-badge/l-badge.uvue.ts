import { isNumeric } from '@/uni_modules/lime-shared/isNumeric'
	import { isNumber } from '@/uni_modules/lime-shared/isNumber'
	import { addUnit } from '@/uni_modules/lime-shared/addUnit'
	import { toBoolean } from '@/uni_modules/lime-shared/toBoolean'
	import { getOffsetWithMinusString } from './utils'
	import { BadgeProps } from './type'
	
const __sfc__ = defineComponent({
  __name: 'l-badge',
  __props: BadgeProps,
  props: {
    color: { type: String, required: false },
    content: { type: Object, required: false },
    dot: { type: Boolean, required: true, default: false },
    max: { type: Number, required: true, default: 99 },
    offset: { type: Array as PropType<any[]>, required: true, default: [] as any[] },
    position: { type: String, required: true, default: 'top-right' },
    shape: { type: String, required: false },
    showZero: { type: Boolean, required: true, default: false },
    size: { type: String, required: false }
  },
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	/**
	 * Badge 徽标组件
	 * @description 用于展示状态标记、消息数量等提示信息，支持多种形态和定位方式
	 * <br> 插件类型：LBadgeComponentPublicInstance 
	 * @tutorial https://ext.dcloud.net.cn/plugin?name=lime-badge
	 * 
	 * @property {string} [color] 徽标背景色（支持CSS颜色值）
	 * @property {number | string | any} content 显示内容（数字/文字）
	 * @property {boolean} dot 是否显示为小红点（优先级高于content）
	 * @property {number} max 数字最大值（超出显示为${max}+）
	 * @property {Array<string | number> | any[]} offset 位置偏移量（[x, y]）
	 * @property {'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'} position 定位位置
	 * @property {'circle' | 'square' | 'bubble' | 'ribbon'} [shape] 形状（当前版本未实现）
	 * @property {boolean} showZero 数值为0时是否显示
	 * @property {'medium' | 'large'} [size] 尺寸（当前版本未实现）
	 * @property {string | number} [content] 支持字符串模板（例：'${count}条'）
	 * @property {Array<string | number>} offset 支持单位（例：['-10rpx', '20px']）
	 */
	
	const name = 'l-badge'
	const props = __props
	
	
	
	const context = getCurrentInstance()!
	const classes = computed(():Map<string, boolean>=>{
		const cls = new Map<string, boolean>()
		cls.set(`${name}--fixed`, toBoolean(context.slots['default']));
		cls.set(`${name}--dot`, props.dot);
		cls.set(`${name}--${props.position}`, context.slots['default'] != null);
		return cls
	})
	const styles = computed(():Map<string, any|null>=>{
		const style = new Map<string, any|null>()
		if(toBoolean(props.color)) {
			style.set('background', props.color!)
		}
		const positions = props.position.split('-');
		const offset = props.offset;
		if(offset.length == 2) {
			const x = offset[0];
			const y = offset[1];
			if(context.slots['default'] != null) {
				if(positions.length == 2) {
					const offsetY = positions[0], offsetX = positions[1];
					if(isNumber(y)) {
						const _y = y as number
						style.set(offsetY, addUnit(offsetY == 'top' ? _y : -_y))
					} else {
						style.set(offsetY, offsetY == 'top' ? addUnit(y) : getOffsetWithMinusString(`${y}`))
					}
					if(isNumber(x)) {
						const _x = x as number
						style.set(offsetX, addUnit(offsetX == 'left' ? _x : -_x))
					} else {
						style.set(offsetY, offsetY == 'left' ? addUnit(x) : getOffsetWithMinusString(`${x}`))
					}
				}
			} else {
				style.set('margin-top', addUnit(y))
				style.set('margin-left', addUnit(x))
			}
		}
		return style
	});
	const hasContent = computed<boolean>(():boolean => {
		if(toBoolean(context.slots['content'])) {
			return true
		}
		const content = props.content;
		return (content != '' && content != null && (props.showZero || content !== '0'));
	});
	const renderContent = computed<string>(():string=>{
		const dot = props.dot
		const max = props.max
		const content = props.content
		if(!dot && hasContent.value) {
			if(max != 0 && isNumeric(content) && parseFloat(content.toString()) > max) {
				return `${max}+`
			}
		}
		if(dot) {
			return ''
		}
		return `${content ?? ""}`
	})
	

	// 安卓BUG 父级设置横向居中，子text定位absolute时宽度受限 https://issues.dcloud.net.cn/pages/issues/detail?id=11847
	// 暂时先绕一下
	const textRef = ref<UniTextElement|null>(null)
	const offscreenRef = ref<UniTextElement|null>(null)
	const resizeObserver = new UniResizeObserver((entries : Array<UniResizeObserverEntry>) => {
		const width = entries[0].target.getBoundingClientRect().width
		textRef.value!.style.setProperty('width', width*1.05)
	}) 
	
	const stopWatch = watch(offscreenRef, (el:UniElement|null) => {
		if(el== null) return
		resizeObserver.observe(el)
	})
	
	onUnmounted(()=>{
		stopWatch()
		resizeObserver.disconnect()
	})

	

return (): any | null => {

  return _ctx.$slots['default'] != null
    ? _cE("view", _uM({
        key: 0,
        class: "l-badge__wrapper"
      }), [
        renderSlot(_ctx.$slots, "default"),
        isTrue(unref(hasContent) || _ctx.dot)
          ? _cE("text", _uM({
              key: 0,
              class: _nC(["l-badge", unref(classes)]),
              ref_key: "textRef",
              ref: textRef,
              style: _nS([unref(styles)])
            }), [
              renderSlot(_ctx.$slots, "content", {}, (): any[] => [_tD(unref(renderContent))])
            ], 6 /* CLASS, STYLE */)
          : _cC("v-if", true),
        isTrue(unref(hasContent) || _ctx.dot)
          ? _cE("text", _uM({
              key: 1,
              class: _nC(["l-badge l-badge--offscreen", unref(classes)]),
              ref_key: "offscreenRef",
              ref: offscreenRef,
              style: _nS([unref(styles)])
            }), [
              renderSlot(_ctx.$slots, "content", {}, (): any[] => [_tD(unref(renderContent))])
            ], 6 /* CLASS, STYLE */)
          : _cC("v-if", true)
      ])
    : isTrue(unref(hasContent) || _ctx.dot)
      ? _cE("text", _uM({
          key: 1,
          class: _nC(["l-badge", unref(classes)]),
          style: _nS([unref(styles)])
        }), [
          renderSlot(_ctx.$slots, "content", {}, (): any[] => [_tD(unref(renderContent))])
        ], 6 /* CLASS, STYLE */)
      : _cC("v-if", true)
}
}

})
export default __sfc__
export type LBadgeComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeBadgeComponentsLBadgeLBadgeStyles = [_uM([["l-badge", _pS(_uM([["boxSizing", "border-box"], ["paddingTop", 0], ["paddingRight", "8rpx"], ["paddingBottom", 0], ["paddingLeft", "8rpx"], ["color", "#FFFFFF"], ["fontWeight", "bold"], ["fontSize", 12], ["fontFamily", "-apple-system-font, helvetica neue, arial, sans-serif"], ["lineHeight", 1.2], ["textAlign", "center"], ["backgroundColor", "#FF4D4F"], ["borderTopWidth", "1rpx"], ["borderRightWidth", "1rpx"], ["borderBottomWidth", "1rpx"], ["borderLeftWidth", "1rpx"], ["borderTopStyle", "solid"], ["borderRightStyle", "solid"], ["borderBottomStyle", "solid"], ["borderLeftStyle", "solid"], ["borderTopColor", "#FFFFFF"], ["borderRightColor", "#FFFFFF"], ["borderBottomColor", "#FFFFFF"], ["borderLeftColor", "#FFFFFF"], ["borderTopLeftRadius", 999], ["borderTopRightRadius", 999], ["borderBottomRightRadius", 999], ["borderBottomLeftRadius", 999], ["overflow", "visible"]]))], ["l-badge--fixed", _uM([["", _uM([["position", "absolute"], ["transformOrigin", "100%"]])], [".l-badge--offscreen", _uM([["position", "fixed"], ["opacity", 0], ["top", -10000000000]])]])], ["l-badge--top-left", _pS(_uM([["top", 0], ["left", 0], ["transform", "translate(-50%, -50%)"]]))], ["l-badge--top-right", _pS(_uM([["top", 0], ["right", 0], ["transform", "translate(50%, -50%)"]]))], ["l-badge--bottom-left", _pS(_uM([["bottom", 0], ["left", 0], ["transform", "translate(-50%, 50%)"]]))], ["l-badge--bottom-right", _pS(_uM([["bottom", 0], ["right", 0], ["transform", "translate(50%, 50%)"]]))], ["l-badge--dot", _pS(_uM([["width", "16rpx"], ["minWidth", 0], ["height", "16rpx"], ["backgroundImage", "none"], ["backgroundColor", "#FF4D4F"], ["borderTopLeftRadius", 99], ["borderTopRightRadius", 99], ["borderBottomRightRadius", 99], ["borderBottomLeftRadius", 99], ["borderTopWidth", 0], ["borderRightWidth", 0], ["borderBottomWidth", 0], ["borderLeftWidth", 0], ["paddingTop", 0], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", 0], ["overflow", "visible"]]))], ["l-badge__wrapper", _pS(_uM([["position", "relative"], ["overflow", "visible"]]))]])]
