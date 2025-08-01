import _easycom_l_icon from '@/uni_modules/lime-icon/components/l-icon/l-icon.uvue'
import _easycom_fui_button from '@/uni_modules/firstui-unix/components/fui-button/fui-button.uvue'
import { ref } from 'vue'
	import TopNavBar from '@/components/TopNavBar.uvue'

	
const __sfc__ = defineComponent({
  __name: 'index',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const deviceTitle = ref('设备名称')
	const videoContext = ref<VideoContext | null>(null)
	const forward = '/static/video/forward.png'
	const errIcon = '/static/video/error.png'
	const transfer = '/static/video/transfer.png'
	const replayIcon = '/static/video/replay.png'
	const playIcon = '/static/video/play.png'
	const pauseIcon = '/static/video/pause.png'
	const addIcon = '/static/tabbar/add.png'
	const videoSrc = "/static/video/video.mp4"
	const onLine = ref<boolean>(true)

	const initVideoContext = () => {
		try {
			videoContext.value = uni.createVideoContext('myVideo');
			console.log('视频上下文初始化成功', videoContext.value, " at pages/index/index.uvue:76");
		} catch (error) {
			console.error('创建视频上下文失败:', error, " at pages/index/index.uvue:78");
		}
	}
	//回放功能
	const replay = () => {
		uni.navigateTo({
			url:'/pages/index/deviceReplay'
		})
	}
	
	//上传下载
	const transferClick = () => {
		uni.navigateTo({
			url:'/pages/mine/rechargeDataTraffic/rechargeDataTraffic'
		})
	}
	
	//警报事件
	const errClick = () => {
		uni.switchTab({
			url:'/pages/message/message'
		})
	}
	
	//查看详情
	const toDeviceDetail = () => {
		uni.showToast({
			title: '设备详情',
			icon: 'none'
		})
		uni.navigateTo({
			url: '/pages/index/deviceDetail'
		})
	}
	
	//暂停
	const pauseClick = () => {



		videoContext.value!!.pause();
		uni.showToast({
			title: '暂停',
			icon: 'none'
		})
	}
	
	//添加新的设备
	const addNewDevice = () => {
		uni.navigateTo({
			url:'/pages/index/addNewDevice/addNewDevice'
		})
	}

	// 组件生命周期
	onMounted(() => {
		initVideoContext();
	});

return (): any | null => {

const _component_l_icon = resolveEasyComponent("l-icon",_easycom_l_icon)
const _component_fui_button = resolveEasyComponent("fui-button",_easycom_fui_button)

  return _cE("view", _uM({ class: "container" }), [
    _cV(unref(TopNavBar), _uM({
      title: "首页",
      rightText: "plussign",
      onRightEvent: addNewDevice
    })),
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({
        class: "video-container",
        style: _nS(_uM({"border-radius":"15rpx","overflow":"hidden"}))
      }), [
        _cE("video", _uM({
          class: "video",
          id: "myVideo",
          src: videoSrc,
          controls: onLine.value,
          "show-play-btn": onLine.value,
          "show-center-play-btn": onLine.value,
          "enable-progress-gesture": onLine.value,
          "show-fullscreen-btn": onLine.value,
          "show-mute-btn": onLine.value,
          direction: -90,
          "object-fit": "fill"
        }), [
          isTrue(onLine.value)
            ? _cE("view", _uM({
                key: 0,
                class: "device-title"
              }), _tD(deviceTitle.value), 1 /* TEXT */)
            : _cC("v-if", true),
          isTrue(onLine.value)
            ? _cE("view", _uM({
                key: 1,
                class: "video-right-control"
              }), [
                _cV(_component_l_icon, _uM({
                  name: forward,
                  size: "30",
                  style: _nS(_uM({"padding":"10rpx","background":"rgba(255, 255, 255, .7)","border-radius":"30rpx"})),
                  onClick: toDeviceDetail
                }), null, 8 /* PROPS */, ["style"]),
                _cV(_component_l_icon, _uM({
                  name: errIcon,
                  size: "30",
                  style: _nS(_uM({"padding":"10rpx","background":"rgba(255, 255, 255, .7)","border-radius":"30rpx"})),
                  onClick: errClick
                }), null, 8 /* PROPS */, ["style"]),
                _cV(_component_l_icon, _uM({
                  name: transfer,
                  size: "30",
                  style: _nS(_uM({"padding":"10rpx","background":"rgba(255, 255, 255, .7)","border-radius":"30rpx"})),
                  onClick: transferClick
                }), null, 8 /* PROPS */, ["style"]),
                _cV(_component_l_icon, _uM({
                  name: replayIcon,
                  size: "30",
                  style: _nS(_uM({"padding":"10rpx","background":"rgba(255, 255, 255, .7)","border-radius":"30rpx"})),
                  onClick: replay
                }), null, 8 /* PROPS */, ["style"])
              ])
            : _cE("view", _uM({
                key: 2,
                class: "offline"
              }), [
                _cE("view", _uM({ class: "offline-content" }), [
                  _cV(_component_l_icon, _uM({
                    name: "link-unlink",
                    color: "#fff"
                  })),
                  _cE("text", _uM({ class: "offline-title" }), "设备断线了")
                ]),
                _cE("text", _uM({ class: "time" }), "2025-07-21 14:33"),
                _cV(_component_fui_button, _uM({
                  color: "#1296db",
                  text: "查看帮助",
                  radius: "50rpx",
                  size: 22,
                  background: "#fff",
                  width: "120rpx",
                  height: "40rpx"
                }))
              ])
        ], 8 /* PROPS */, ["controls", "show-play-btn", "show-center-play-btn", "enable-progress-gesture", "show-fullscreen-btn", "show-mute-btn"])
      ], 4 /* STYLE */)
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexIndexStyles = [_uM([["container", _pS(_uM([["width", "100%"], ["height", "100%"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["display", "flex"], ["flexDirection", "column"]]))], ["content", _uM([[".container ", _uM([["position", "relative"], ["borderTopLeftRadius", "15rpx"], ["borderTopRightRadius", "15rpx"], ["borderBottomRightRadius", "15rpx"], ["borderBottomLeftRadius", "15rpx"], ["width", "100%"], ["height", "400rpx"], ["overflow", "hidden"]])]])], ["video-container", _uM([[".container .content ", _uM([["width", "100%"], ["height", "100%"]])]])], ["video", _uM([[".container .content ", _uM([["width", "100%"], ["height", "100%"], ["marginBottom", 0]])]])], ["device-title", _uM([[".container .content .video ", _uM([["backgroundImage", "none"], ["backgroundColor", "rgba(0,0,0,0.3)"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"]])]])], ["video-right-control", _uM([[".container .content .video ", _uM([["position", "absolute"], ["top", 0], ["right", "10rpx"], ["display", "flex"], ["flexDirection", "column"], ["justifyContent", "space-around"], ["height", "90%"], ["alignItems", "center"], ["zIndex", 2]])]])], ["vedio-control", _uM([[".container .content .video .video-right-control ", _uM([["width", "50rpx"], ["height", "50rpx"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"]])], [".container .content .video-bottom-control ", _uM([["marginTop", 0], ["marginRight", "auto"], ["marginBottom", 0], ["marginLeft", "auto"], ["width", "50rpx"], ["height", "50rpx"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"]])]])], ["vedio-control-icon", _uM([[".container .content .video .video-right-control .vedio-control ", _uM([["width", "100%"], ["height", "100%"]])], [".container .content .video-bottom-control .vedio-control ", _uM([["width", "100%"], ["height", "100%"]])]])], ["offline", _uM([[".container .content .video ", _uM([["width", "100%"], ["height", "100%"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"], ["display", "flex"], ["flexDirection", "column"], ["alignItems", "center"], ["justifyContent", "center"]])]])], ["offline-title", _uM([[".container .content .video .offline ", _uM([["color", "#ffffff"], ["marginLeft", "10rpx"]])]])], ["time", _uM([[".container .content .video .offline ", _uM([["marginTop", "20rpx"], ["marginRight", 0], ["marginBottom", "20rpx"], ["marginLeft", 0], ["color", "#ffffff"]])]])], ["offline-content", _uM([[".container .content .video .offline ", _uM([["display", "flex"], ["flexDirection", "row"], ["alignItems", "center"]])]])], ["video-top-title", _uM([[".container .content ", _uM([["position", "absolute"], ["top", 0], ["height", "60rpx"], ["width", "80%"], ["paddingTop", "15rpx"], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["backgroundImage", "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))"], ["backgroundColor", "rgba(0,0,0,0)"], ["zIndex", 3]])]])], ["video-bottom-control", _uM([[".container .content ", _uM([["position", "absolute"], ["bottom", "10rpx"], ["left", 0], ["width", "100%"], ["height", "50rpx"], ["zIndex", 1]])]])]])]
