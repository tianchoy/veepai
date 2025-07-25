import _easycom_fui_icon from '@/uni_modules/firstui-unix/components/fui-icon/fui-icon.uvue'

const __sfc__ = defineComponent({
  __name: 'TopNavBar',
  props: {
		title: {
			type: String,
			default:'首页'
		},
		showBack: {
			type: Boolean,
			default: false
		},
		messageCount: {
			type: Number,
			default: 0
		},
		rightText:{
			type:String,
			default:''
		},
		isText:{
			type:Boolean,
			default:false
		}
	},
  emits: ['back', 'message', 'rightEvent'],
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;


	const props = __props

	// 定义触发给父组件的事件 
	function emits(event: string, ...do_not_transform_spread: Array<any | null>) {
__ins.emit(event, ...do_not_transform_spread)
}

	// 导航事件处理
	const goBack = () => emits('back')
	const onMessage = () => emits('message')
	const rightIcon = () => emits('rightEvent')
	

return (): any | null => {

const _component_fui_icon = resolveEasyComponent("fui-icon",_easycom_fui_icon)

  return _cE("view", _uM({ class: "custom-nav" }), [
    _cE("view", _uM({
      class: "nav-back",
      onClick: goBack
    }), [
      isTrue(props.showBack)
        ? _cV(_component_fui_icon, _uM({
            key: 0,
            name: "arrowleft",
            size: "50"
          }))
        : _cC("v-if", true)
    ]),
    _cE("view", _uM({ class: "nav-item" }), [
      _cE("text", _uM({ class: "nav-title" }), _tD(props.title), 1 /* TEXT */)
    ]),
    _cE("view", _uM({
      class: "nav-actions",
      onClick: rightIcon
    }), [
      isTrue(_ctx.isText)
        ? _cE("text", _uM({ key: 0 }), _tD(_ctx.rightText), 1 /* TEXT */)
        : _cV(_component_fui_icon, _uM({
            key: 1,
            name: _ctx.rightText,
            size: "45"
          }), null, 8 /* PROPS */, ["name"])
    ])
  ])
}
}

})
export default __sfc__
const GenComponentsTopNavBarStyles = [_uM([["custom-nav", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "100rpx"], ["paddingRight", "20rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "20rpx"], ["width", "100%"]]))], ["nav-back", _pS(_uM([["width", "45rpx"], ["height", "45rpx"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["nav-item", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-end"], ["justifyContent", "space-around"]]))], ["nav-title", _pS(_uM([["color", "#333333"], ["marginTop", 0], ["marginRight", "20rpx"], ["marginBottom", 0], ["marginLeft", "20rpx"], ["maxWidth", "400rpx"], ["textAlign", "center"], ["overflow", "hidden"], ["textOverflow", "ellipsis"], ["whiteSpace", "nowrap"]]))], ["nav-actions", _pS(_uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]]))], ["nav-icon", _pS(_uM([["width", "45rpx"], ["height", "45rpx"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["position", "relative"], ["marginLeft", "16rpx"]]))]])]
