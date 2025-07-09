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
		}
	},
  emits: ['back', 'message', 'add', 'changeNav'],
  setup(__props): any | null {
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
	const onAdd = () => emits('add')
	

return (): any | null => {

  return createElementVNode("view", utsMapOf({ class: "custom-nav" }), [
    createElementVNode("view", utsMapOf({
      class: "nav-back",
      onClick: goBack
    }), [
      isTrue(props.showBack)
        ? createElementVNode("image", utsMapOf({
            key: 0,
            class: "nav-icon",
            onClick: goBack,
            src: "/static/tabbar/back.png"
          }))
        : createCommentVNode("v-if", true)
    ]),
    createElementVNode("view", utsMapOf({ class: "nav-item" }), [
      createElementVNode("text", utsMapOf({ class: "nav-title" }), toDisplayString(props.title), 1 /* TEXT */)
    ]),
    createElementVNode("view", utsMapOf({
      class: "nav-actions",
      onClick: onAdd
    }), toDisplayString(props.rightText), 1 /* TEXT */)
  ])
}
}

})
export default __sfc__
const GenComponentsTopNavBarStyles = [utsMapOf([["custom-nav", padStyleMapOf(utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"], ["justifyContent", "space-between"], ["paddingTop", "30rpx"], ["paddingRight", "25rpx"], ["paddingBottom", "30rpx"], ["paddingLeft", "25rpx"], ["backgroundColor", "#ffffff"], ["marginTop", "50rpx"], ["width", "100%"]]))], ["nav-back", padStyleMapOf(utsMapOf([["width", "32rpx"], ["height", "32rpx"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"]]))], ["nav-item", padStyleMapOf(utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "flex-end"], ["justifyContent", "space-around"]]))], ["nav-title", padStyleMapOf(utsMapOf([["color", "#333333"], ["marginTop", 0], ["marginRight", "20rpx"], ["marginBottom", 0], ["marginLeft", "20rpx"], ["maxWidth", "400rpx"], ["textAlign", "center"], ["overflow", "hidden"], ["textOverflow", "ellipsis"], ["whiteSpace", "nowrap"]]))], ["nav-actions", padStyleMapOf(utsMapOf([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]]))], ["nav-icon", padStyleMapOf(utsMapOf([["width", "60rpx"], ["height", "60rpx"], ["display", "flex"], ["alignItems", "center"], ["justifyContent", "center"], ["position", "relative"], ["marginLeft", "16rpx"]]))]])]
