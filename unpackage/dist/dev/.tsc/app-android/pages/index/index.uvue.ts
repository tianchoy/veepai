import TopNavBar from '../../components/TopNavBar.uvue'
	import { NavTitleItem } from '../../types/NavTitleItem'

	
const __sfc__ = defineComponent({
  __name: 'index',
  setup(__props): any | null {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const title: NavTitleItem[] = [{
		name: '首页',
		isCurrent: true,
		url: '/pages/index/index'
	}, {
		name: '消息',
		isCurrent: false,
		url: '/pages/message/message'
	}, {
		name: '我的',
		isCurrent: false,
		url: '/pages/mine/mine'
	}]
	
	const deviceTitle = ref('设备名称')
	const forward = '/static/video/forward.png'
	const errIcon = '/static/video/error.png'
	const transfer = '/static/video/transfer.png'
	const replayIcon = '/static/video/replay.png'
	const playIcon = '/static/video/play.png'
	const pauseIcon = '/static/video/pause.png'
	const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
	
	
	const navAdd = () =>{
		uni.showToast({
			title: '添加',
			icon: 'none'
		})
	}
	
	const replay = () =>{
		uni.showToast({
			title: '重播',
			icon: 'none'
		})
	}
	
	
	const transferClick =()=>{
		uni.showToast({
			title:'传输',
			icon: 'none'
		})
	}
	
	const errClick = () =>{
		uni.showToast({
			title:'警报',
			icon: 'none'
		})
	}
	
	const toDeviceDetail = () =>{
		uni.showToast({
			title:'设备详情',
			icon: 'none'
		})
	}
	
	const pauseClick =() =>{
		uni.showToast({
			title:'暂停',
			icon: 'none'
		})
	}

return (): any | null => {

const _component_uv_icon = resolveComponent("uv-icon")

  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "nav_bar" }), [
      createVNode(unref(TopNavBar), utsMapOf({
        showBack: false,
        title: title,
        onAdd: navAdd
      }))
    ]),
    createElementVNode("view", utsMapOf({ class: "content" }), [
      createElementVNode("video", utsMapOf({
        class: "video",
        src: videoSrc,
        controls: false
      })),
      createElementVNode("view", utsMapOf({ class: "video-top-title" }), toDisplayString(unref(deviceTitle)), 1 /* TEXT */),
      createElementVNode("view", utsMapOf({ class: "video-right-control" }), [
        createVNode(_component_uv_icon, utsMapOf({
          class: "vedio-control-icon",
          name: forward,
          onClick: toDeviceDetail
        })),
        createVNode(_component_uv_icon, utsMapOf({
          class: "vedio-control-icon",
          name: errIcon,
          onClick: errClick
        })),
        createVNode(_component_uv_icon, utsMapOf({
          class: "vedio-control-icon",
          name: transfer,
          onClick: transferClick
        })),
        createVNode(_component_uv_icon, utsMapOf({
          class: "vedio-control-icon",
          name: replayIcon,
          onClick: replay
        }))
      ]),
      createElementVNode("view", utsMapOf({ class: "video-bottom-control" }), [
        createVNode(_component_uv_icon, utsMapOf({
          class: "vedio-control-icon",
          onClick: pauseClick,
          name: pauseIcon
        }))
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexIndexStyles = [utsMapOf([["container", padStyleMapOf(utsMapOf([["width", "100%"], ["height", "100%"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["display", "flex"], ["flexDirection", "column"]]))], ["content", utsMapOf([[".container ", utsMapOf([["position", "relative"]])]])], ["video", utsMapOf([[".container .content ", utsMapOf([["width", "100%"]])]])], ["video-top-title", utsMapOf([[".container .content ", utsMapOf([["position", "absolute"], ["top", 0], ["height", "60rpx"], ["width", "80%"], ["paddingLeft", "20rpx"], ["backgroundImage", "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))"], ["backgroundColor", "rgba(0,0,0,0)"]])]])], ["video-right-control", utsMapOf([[".container .content ", utsMapOf([["position", "absolute"], ["top", 0], ["right", "10rpx"], ["display", "flex"], ["flexDirection", "column"], ["justifyContent", "space-around"], ["height", "100%"], ["alignItems", "center"], ["zIndex", 2]])]])], ["vedio-control-icon", utsMapOf([[".container .content .video-right-control ", utsMapOf([["width", "50rpx"], ["height", "50rpx"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"]])], [".container .content .video-bottom-control ", utsMapOf([["marginTop", 0], ["marginRight", "auto"], ["marginBottom", 0], ["marginLeft", "auto"], ["width", "50rpx"], ["height", "50rpx"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"]])]])], ["video-bottom-control", utsMapOf([[".container .content ", utsMapOf([["position", "absolute"], ["bottom", "10rpx"], ["left", 0], ["width", "100%"], ["height", "50rpx"], ["zIndex", 1]])]])]])]
