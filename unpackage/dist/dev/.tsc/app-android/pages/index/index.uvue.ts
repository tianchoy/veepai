import { ref } from 'vue'

	
const __sfc__ = defineComponent({
  __name: 'index',
  setup(__props) {
const __ins = getCurrentInstance()!;
const _ctx = __ins.proxy as InstanceType<typeof __sfc__>;
const _cache = __ins.renderCache;

	const deviceTitle = ref('设备名称')
	const forward = '/static/video/forward.png'
	const errIcon = '/static/video/error.png'
	const transfer = '/static/video/transfer.png'
	const replayIcon = '/static/video/replay.png'
	const playIcon = '/static/video/play.png'
	const pauseIcon = '/static/video/pause.png'
	const addIcon = '/static/tabbar/add.png'
	const videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
	const videoRef = ref(null);

	const addDevices = () => {
		uni.showToast({
			title: '添加',
			icon: 'none'
		})
	}

	const replay = () => {
		uni.showToast({
			title: '重播',
			icon: 'none'
		})



		uni.createVideoContext('myVideo')!!.play();
	}

	const transferClick = () => {
		uni.showToast({
			title: '传输',
			icon: 'none'
		})
	}

	const errClick = () => {
		uni.showToast({
			title: '警报',
			icon: 'none'
		})
	}

	const toDeviceDetail = () => {
		uni.showToast({
			title: '设备详情',
			icon: 'none'
		})
		uni.navigateTo({
			url: '/pages/index/deviceDetail'
		})
	}

	const pauseClick = () => {



		uni.createVideoContext('myVideo')!!.pause();
		uni.showToast({
			title: '暂停',
			icon: 'none'
		})
	}

	const vedioClick = () => {
		uni.showToast({
			title: '播放',
			icon: 'none'
		})
	}
	
	const clickVdedio = () => {
		uni.showToast({
			title:'sss',
			icon: 'none'
		})
	}

return (): any | null => {

  return _cE("view", _uM({ class: "container" }), [
    _cE("view", _uM({ class: "content" }), [
      _cE("view", _uM({
        class: "video-container",
        style: _nS(_uM({"border-radius":"15rpx","overflow":"hidden"}))
      }), [
        _cE("video", _uM({
          class: "video",
          id: "myVideo",
          title: deviceTitle.value,
          src: videoSrc,
          ref_key: "videoRef",
          ref: videoRef,
          controls: true,
          "show-play-btn": true,
          "show-center-play-btn": true,
          "enable-progress-gesture": true,
          "show-fullscreen-btn": true,
          "show-mute-btn": true,
          onClick: clickVdedio
        }), null, 8 /* PROPS */, ["title"])
      ], 4 /* STYLE */),
      _cE("view", null, _tD(deviceTitle.value), 1 /* TEXT */),
      _cE("view", _uM({ class: "video-right-control" }), [
        _cE("view", _uM({ class: "vedio-control" }), [
          _cE("image", _uM({
            class: "vedio-control-icon",
            src: forward,
            onClick: toDeviceDetail
          }))
        ]),
        _cE("view", _uM({ class: "vedio-control" }), [
          _cE("image", _uM({
            class: "vedio-control-icon",
            src: errIcon,
            onClick: errClick
          }))
        ]),
        _cE("view", _uM({ class: "vedio-control" }), [
          _cE("image", _uM({
            class: "vedio-control-icon",
            src: transfer,
            onClick: transferClick
          }))
        ]),
        _cE("view", _uM({ class: "vedio-control" }), [
          _cE("image", _uM({
            class: "vedio-control-icon",
            src: replayIcon,
            onClick: replay
          }))
        ])
      ]),
      _cE("view", _uM({ class: "video-bottom-control" }), [
        _cE("view", _uM({ class: "vedio-control" }), [
          _cE("image", _uM({
            class: "vedio-control-icon",
            onClick: pauseClick,
            src: pauseIcon
          }))
        ])
      ])
    ])
  ])
}
}

})
export default __sfc__
const GenPagesIndexIndexStyles = [_uM([["container", _pS(_uM([["width", "100%"], ["height", "100%"], ["paddingTop", 0], ["paddingRight", "20rpx"], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["display", "flex"], ["flexDirection", "column"]]))], ["content", _uM([[".container ", _uM([["position", "relative"], ["borderTopLeftRadius", "15rpx"], ["borderTopRightRadius", "15rpx"], ["borderBottomRightRadius", "15rpx"], ["borderBottomLeftRadius", "15rpx"], ["width", "100%"], ["height", "400rpx"], ["overflow", "hidden"]])]])], ["video-container", _uM([[".container .content ", _uM([["width", "100%"], ["height", "100%"]])]])], ["video", _uM([[".container .content ", _uM([["width", "100%"], ["height", "100%"], ["objectFit", "cover"], ["marginBottom", 0]])]])], ["video-top-title", _uM([[".container .content ", _uM([["position", "absolute"], ["top", 0], ["height", "60rpx"], ["width", "80%"], ["paddingTop", "15rpx"], ["paddingRight", 0], ["paddingBottom", 0], ["paddingLeft", "20rpx"], ["backgroundImage", "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))"], ["backgroundColor", "rgba(0,0,0,0)"], ["zIndex", 3]])]])], ["video-right-control", _uM([[".container .content ", _uM([["position", "absolute"], ["top", 0], ["right", "10rpx"], ["display", "flex"], ["flexDirection", "column"], ["justifyContent", "space-around"], ["height", "100%"], ["alignItems", "center"], ["zIndex", 2]])]])], ["vedio-control", _uM([[".container .content .video-right-control ", _uM([["width", "50rpx"], ["height", "50rpx"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"]])], [".container .content .video-bottom-control ", _uM([["marginTop", 0], ["marginRight", "auto"], ["marginBottom", 0], ["marginLeft", "auto"], ["width", "50rpx"], ["height", "50rpx"], ["paddingTop", "10rpx"], ["paddingRight", "10rpx"], ["paddingBottom", "10rpx"], ["paddingLeft", "10rpx"], ["borderTopLeftRadius", "25rpx"], ["borderTopRightRadius", "25rpx"], ["borderBottomRightRadius", "25rpx"], ["borderBottomLeftRadius", "25rpx"], ["backgroundImage", "none"], ["backgroundColor", "rgba(255,255,255,0.7)"]])]])], ["vedio-control-icon", _uM([[".container .content .video-right-control .vedio-control ", _uM([["width", "100%"], ["height", "100%"]])], [".container .content .video-bottom-control .vedio-control ", _uM([["width", "100%"], ["height", "100%"]])]])], ["video-bottom-control", _uM([[".container .content ", _uM([["position", "absolute"], ["bottom", "10rpx"], ["left", 0], ["width", "100%"], ["height", "50rpx"], ["zIndex", 1]])]])]])]
