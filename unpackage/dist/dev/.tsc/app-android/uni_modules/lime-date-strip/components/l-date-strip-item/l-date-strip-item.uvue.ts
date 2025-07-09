import _imports_0 from '@/static/dot1.png'
import { DateStripItemProps } from './type';
	import { DateStriPDay } from '../l-date-strip/type';
	
const __sfc__ = defineComponent({
  __name: 'l-date-strip-item',
  __props: DateStripItemProps,
  props: {
    dates: { type: Array as PropType<DateStriPDay[]>, required: true, default: [] as DateStriPDay[] },
    color: { type: String, required: false },
    activeBgColor: { type: String, required: false },
    activeColor: { type: String, required: false },
    bgColor: { type: String, required: false },
    radius: { type: String, required: false },
    gridWidth: { type: String, required: false },
    switchMode: { type: String, required: true, default: 'week' },
    shape: { type: String, required: true, default: 'square' }
  },
  emits: ['click'],
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	function emit(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}
	const props = __props
	
	const styles = computed(():Map<string, any>=>{
		const style = new Map<string, any>()
		
		if(props.gridWidth != null && props.switchMode == 'none') {
			style.set('width', props.gridWidth!)
		}
		return style
	})
	const onClick = (day: DateStriPDay) => {
		console.log(day, " at uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue:88")
		emit('click', day)
	}

return (): any | null => {

  return createElementVNode("view", utsMapOf({
    class: normalizeClass(["l-date-strip__item", 'l-date-strip__item--' + _ctx.switchMode])
  }), [
    createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.dates, (item, __key, __index, _cached): any => {
      return createElementVNode("view", utsMapOf({
        class: normalizeClass(["l-date-strip__grid", [
				'l-date-strip__grid--' + _ctx.shape,
				utsMapOf({
					'l-date-strip__grid--active-bg' : _ctx.shape == 'square' && item.type == 'selected',
					// 'l-date-strip__grid--disabled': item.type == 'disabled',
					'l-date-strip__grid--selected': item.type == 'selected'
				})
			]]),
        style: normalizeStyle([
				unref(styles),
				item.type == 'selected' && _ctx.shape == 'square' && _ctx.activeBgColor != null ? utsMapOf({background: _ctx.activeBgColor}): utsMapOf<string, any | null>({}),
				_ctx.shape == 'square' && _ctx.radius != null ? utsMapOf({'border-radius': _ctx.radius}) : utsMapOf<string, any | null>({})
			]),
        onClick: () => {onClick(item)},
        key: item.key
      }), [
        item.prefix != null
          ? createElementVNode("text", utsMapOf({
              key: 0,
              class: normalizeClass(["l-date-strip__grid-prefix", utsMapOf({
					'l-date-strip__grid--active-text' : item.type == 'selected' && _ctx.shape == 'square',
					'l-date-strip__grid--active-text-none' : item.type == 'selected' && _ctx.shape == 'none',
				})]),
              style: normalizeStyle([
					item.type == 'selected' && _ctx.activeColor != null ? utsMapOf({ color: _ctx.activeColor}) : utsMapOf<string, any | null>({}),
				])
            }), toDisplayString(item.prefix), 7 /* TEXT, CLASS, STYLE */)
          : createCommentVNode("v-if", true),
        createElementVNode("view", utsMapOf({
          class: normalizeClass(["l-date-strip__grid-info", utsMapOf({
					'l-date-strip__grid--active-bg' : _ctx.shape == 'circle' &&  item.type == 'selected',
				})]),
          style: normalizeStyle([
					item.type == 'selected' && _ctx.shape == 'circle' && _ctx.activeBgColor != null ? utsMapOf({background: _ctx.activeBgColor}): utsMapOf<string, any | null>({}),
					_ctx.shape == 'square' && _ctx.radius != null ? utsMapOf({'border-radius': _ctx.radius}): utsMapOf<string, any | null>({})
				])
        }), [
          createElementVNode("text", utsMapOf({
            class: normalizeClass(["l-date-strip__grid-day", utsMapOf({
						'l-date-strip__grid--active-text' : item.type == 'selected' && _ctx.shape != 'none',
						'l-date-strip__grid--active-text-none' : item.type == 'selected' && _ctx.shape == 'none',
					})]),
            style: normalizeStyle([
						item.type == 'selected' && _ctx.activeColor != null ? utsMapOf({ color: _ctx.activeColor}) : utsMapOf<string, any | null>({}),
					])
          }), toDisplayString(item.text), 7 /* TEXT, CLASS, STYLE */),
          createElementVNode("view", null, [
            item.suffix == 'true'
              ? createElementVNode("view", utsMapOf({ key: 0 }), [
                  createElementVNode("image", utsMapOf({
                    style: normalizeStyle(utsMapOf({"width":"16rpx","height":"16rpx"})),
                    src: _imports_0
                  }), null, 4 /* STYLE */)
                ])
              : createElementVNode("view", utsMapOf({ key: 1 }), [
                  createElementVNode("text", utsMapOf({
                    style: normalizeStyle(utsMapOf({"width":"16rpx","height":"16rpx"}))
                  }), null, 4 /* STYLE */)
                ])
          ])
        ], 6 /* CLASS, STYLE */)
      ], 14 /* CLASS, STYLE, PROPS */, ["onClick"])
    }), 128 /* KEYED_FRAGMENT */)
  ], 2 /* CLASS */)
}
}

})
export default __sfc__
export type LDateStripItemComponentPublicInstance = InstanceType<typeof __sfc__>;
const GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItemStyles = [utsMapOf([["l-date-strip", padStyleMapOf(utsMapOf([["height", 86], ["backgroundColor", "#ffffff"]]))], ["l-date-strip__scroll", padStyleMapOf(utsMapOf([["flexDirection", "row"]]))], ["l-date-strip__item", padStyleMapOf(utsMapOf([["display", "flex"], ["flexDirection", "row"], ["paddingTop", 8], ["paddingRight", 0], ["paddingBottom", 8], ["paddingLeft", 0], ["boxSizing", "border-box"]]))], ["l-date-strip__item--week", padStyleMapOf(utsMapOf([["flex", 1]]))], ["l-date-strip__grid", utsMapOf([[".l-date-strip__item--week ", utsMapOf([["flex", 1]])], [".l-date-strip__item--none ", utsMapOf([["width", 50]])], ["", utsMapOf([["display", "flex"], ["flexDirection", "column"], ["marginTop", 0], ["marginRight", "4rpx"], ["marginBottom", 0], ["marginLeft", "4rpx"], ["transitionDuration", "300ms"], ["transitionProperty", "backgroundColor,color"], ["transitionTimingFunction", "linear"]])]])], ["l-date-strip__grid-prefix", utsMapOf([["", utsMapOf([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["fontSize", 14], ["color", "rgba(0,0,0,0.45)"]])], [".l-date-strip__grid--none ", utsMapOf([["paddingBottom", 4], ["paddingTop", 4]])], [".l-date-strip__grid--circle ", utsMapOf([["paddingBottom", 4]])]])], ["l-date-strip__grid-day", padStyleMapOf(utsMapOf([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["fontSize", 16], ["color", "rgba(0,0,0,0.88)"], ["fontWeight", "bold"]]))], ["l-date-strip__grid-suffix", padStyleMapOf(utsMapOf([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["position", "absolute"], ["top", "50%"], ["transform", "translateY(60%)"], ["fontSize", 12], ["color", "rgba(0,0,0,0.65)"]]))], ["l-date-strip__grid-info", utsMapOf([[".l-date-strip__grid--circle ", utsMapOf([["borderTopLeftRadius", 99], ["borderTopRightRadius", 99], ["borderBottomRightRadius", 99], ["borderBottomLeftRadius", 99]])], ["", utsMapOf([["display", "flex"], ["flex", 1], ["justifyContent", "center"], ["alignItems", "center"], ["position", "relative"]])]])], ["l-date-strip__grid--square", padStyleMapOf(utsMapOf([["borderTopLeftRadius", 5], ["borderTopRightRadius", 5], ["borderBottomRightRadius", 5], ["borderBottomLeftRadius", 5], ["paddingTop", 6], ["paddingRight", 0], ["paddingBottom", 6], ["paddingLeft", 0]]))], ["l-date-strip__grid--active-bg", padStyleMapOf(utsMapOf([["backgroundColor", "#3283ff"]]))], ["l-date-strip__grid--active-text", padStyleMapOf(utsMapOf([["color", "#FFFFFF"]]))], ["l-date-strip__grid--active-text-none", padStyleMapOf(utsMapOf([["color", "#3283ff"]]))], ["l-date-strip__grid--disabled", padStyleMapOf(utsMapOf([["opacity", 0.4]]))], ["@TRANSITION", utsMapOf([["l-date-strip__grid", utsMapOf([["duration", "300ms"], ["property", "backgroundColor,color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-prefix", utsMapOf([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-day", utsMapOf([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-suffix", utsMapOf([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])]])]])]
