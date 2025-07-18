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
  setup(__props) {
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
		console.log(day)
		emit('click', day)
	}

return (): any | null => {

  return _cE("view", _uM({
    class: _nC(["l-date-strip__item", 'l-date-strip__item--' + _ctx.switchMode])
  }), [
    _cE(Fragment, null, RenderHelpers.renderList(_ctx.dates, (item, __key, __index, _cached): any => {
      return _cE("view", _uM({
        class: _nC(["l-date-strip__grid", [
				'l-date-strip__grid--' + _ctx.shape,
				_uM({
					'l-date-strip__grid--active-bg' : _ctx.shape == 'square' && item.type == 'selected',
					// 'l-date-strip__grid--disabled': item.type == 'disabled',
					'l-date-strip__grid--selected': item.type == 'selected'
				})
			]]),
        style: _nS([
				unref(styles),
				item.type == 'selected' && _ctx.shape == 'square' && _ctx.activeBgColor != null ? _uM({background: _ctx.activeBgColor}): _uM<string, any | null>({}),
				_ctx.shape == 'square' && _ctx.radius != null ? _uM({'border-radius': _ctx.radius}) : _uM<string, any | null>({})
			]),
        onClick: () => {onClick(item)},
        key: item.key
      }), [
        item.prefix != null
          ? _cE("text", _uM({
              key: 0,
              class: _nC(["l-date-strip__grid-prefix", _uM({
					'l-date-strip__grid--active-text' : item.type == 'selected' && _ctx.shape == 'square',
					'l-date-strip__grid--active-text-none' : item.type == 'selected' && _ctx.shape == 'none',
				})]),
              style: _nS([
					item.type == 'selected' && _ctx.activeColor != null ? _uM({ color: _ctx.activeColor}) : _uM<string, any | null>({}),
				])
            }), _tD(item.prefix), 7 /* TEXT, CLASS, STYLE */)
          : _cC("v-if", true),
        _cE("view", _uM({
          class: _nC(["l-date-strip__grid-info", _uM({
					'l-date-strip__grid--active-bg' : _ctx.shape == 'circle' &&  item.type == 'selected',
				})]),
          style: _nS([
					item.type == 'selected' && _ctx.shape == 'circle' && _ctx.activeBgColor != null ? _uM({background: _ctx.activeBgColor}): _uM<string, any | null>({}),
					_ctx.shape == 'square' && _ctx.radius != null ? _uM({'border-radius': _ctx.radius}): _uM<string, any | null>({})
				])
        }), [
          _cE("text", _uM({
            class: _nC(["l-date-strip__grid-day", _uM({
						'l-date-strip__grid--active-text' : item.type == 'selected' && _ctx.shape != 'none',
						'l-date-strip__grid--active-text-none' : item.type == 'selected' && _ctx.shape == 'none',
					})]),
            style: _nS([
						item.type == 'selected' && _ctx.activeColor != null ? _uM({ color: _ctx.activeColor}) : _uM<string, any | null>({}),
					])
          }), _tD(item.text), 7 /* TEXT, CLASS, STYLE */),
          _cE("view", null, [
            item.suffix == 'true'
              ? _cE("view", _uM({ key: 0 }), [
                  _cE("image", _uM({
                    style: _nS(_uM({"width":"16rpx","height":"16rpx"})),
                    src: _imports_0
                  }), null, 4 /* STYLE */)
                ])
              : _cE("view", _uM({ key: 1 }), [
                  _cE("text", _uM({
                    style: _nS(_uM({"width":"16rpx","height":"16rpx"}))
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
const GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItemStyles = [_uM([["l-date-strip", _pS(_uM([["height", 86], ["backgroundColor", "#ffffff"]]))], ["l-date-strip__scroll", _pS(_uM([["flexDirection", "row"]]))], ["l-date-strip__item", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["paddingTop", 8], ["paddingRight", 0], ["paddingBottom", 8], ["paddingLeft", 0], ["boxSizing", "border-box"]]))], ["l-date-strip__item--week", _pS(_uM([["flex", 1]]))], ["l-date-strip__grid", _uM([[".l-date-strip__item--week ", _uM([["flex", 1]])], [".l-date-strip__item--none ", _uM([["width", 50]])], ["", _uM([["display", "flex"], ["flexDirection", "column"], ["marginTop", 0], ["marginRight", "4rpx"], ["marginBottom", 0], ["marginLeft", "4rpx"], ["transitionDuration", "300ms"], ["transitionProperty", "backgroundColor,color"], ["transitionTimingFunction", "linear"]])]])], ["l-date-strip__grid-prefix", _uM([["", _uM([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["fontSize", 14], ["color", "rgba(0,0,0,0.45)"]])], [".l-date-strip__grid--none ", _uM([["paddingBottom", 4], ["paddingTop", 4]])], [".l-date-strip__grid--circle ", _uM([["paddingBottom", 4]])]])], ["l-date-strip__grid-day", _pS(_uM([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["fontSize", 16], ["color", "rgba(0,0,0,0.88)"], ["fontWeight", "bold"]]))], ["l-date-strip__grid-suffix", _pS(_uM([["textAlign", "center"], ["transitionDuration", "200ms"], ["transitionProperty", "color"], ["transitionTimingFunction", "linear"], ["position", "absolute"], ["top", "50%"], ["transform", "translateY(60%)"], ["fontSize", 12], ["color", "rgba(0,0,0,0.65)"]]))], ["l-date-strip__grid-info", _uM([[".l-date-strip__grid--circle ", _uM([["borderTopLeftRadius", 99], ["borderTopRightRadius", 99], ["borderBottomRightRadius", 99], ["borderBottomLeftRadius", 99]])], ["", _uM([["display", "flex"], ["flex", 1], ["justifyContent", "center"], ["alignItems", "center"], ["position", "relative"]])]])], ["l-date-strip__grid--square", _pS(_uM([["borderTopLeftRadius", 5], ["borderTopRightRadius", 5], ["borderBottomRightRadius", 5], ["borderBottomLeftRadius", 5], ["paddingTop", 6], ["paddingRight", 0], ["paddingBottom", 6], ["paddingLeft", 0]]))], ["l-date-strip__grid--active-bg", _pS(_uM([["backgroundColor", "#3283ff"]]))], ["l-date-strip__grid--active-text", _pS(_uM([["color", "#FFFFFF"]]))], ["l-date-strip__grid--active-text-none", _pS(_uM([["color", "#3283ff"]]))], ["l-date-strip__grid--disabled", _pS(_uM([["opacity", 0.4]]))], ["@TRANSITION", _uM([["l-date-strip__grid", _uM([["duration", "300ms"], ["property", "backgroundColor,color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-prefix", _uM([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-day", _uM([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])], ["l-date-strip__grid-suffix", _uM([["duration", "200ms"], ["property", "color"], ["timingFunction", "linear"]])]])]])]
