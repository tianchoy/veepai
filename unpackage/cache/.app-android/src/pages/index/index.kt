@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uni.UNI1F0985E
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uniapp.framework.*
import io.dcloud.uniapp.runtime.*
import io.dcloud.uniapp.vue.*
import io.dcloud.uniapp.vue.shared.*
import io.dcloud.unicloud.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import io.dcloud.uniapp.extapi.createVideoContext as uni_createVideoContext
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showToast as uni_showToast
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexIndex) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexIndex
            val _cache = __ins.renderCache
            val deviceTitle = ref("设备名称")
            val videoContext = ref<VideoContext?>(null)
            val forward = "/static/video/forward.png"
            val errIcon = "/static/video/error.png"
            val transfer = "/static/video/transfer.png"
            val replayIcon = "/static/video/replay.png"
            val videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
            val onLine = ref<Boolean>(true)
            val initVideoContext = fun(){
                try {
                    videoContext.value = uni_createVideoContext("myVideo", null)
                    console.log("视频上下文初始化成功", videoContext.value, " at pages/index/index.uvue:66")
                }
                 catch (error: Throwable) {
                    console.error("创建视频上下文失败:", error, " at pages/index/index.uvue:68")
                }
            }
            val replay = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceReplay"))
            }
            val transferClick = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/rechargeDataTraffic/rechargeDataTraffic"))
            }
            val errClick = fun(){
                uni_switchTab(SwitchTabOptions(url = "/pages/message/message"))
            }
            val toDeviceDetail = fun(){
                uni_showToast(ShowToastOptions(title = "设备详情", icon = "none"))
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceDetail"))
            }
            val addNewDevice = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/addNewDevice/addNewDevice"))
            }
            onMounted(fun(){
                initVideoContext()
            }
            )
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("title" to "首页", "rightText" to "plussign", "onRightEvent" to addNewDevice)),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "video-container", "style" to _nS(_uM("border-radius" to "15rpx", "overflow" to "hidden"))), _uA(
                            _cE("video", _uM("class" to "video", "id" to "myVideo", "src" to videoSrc, "controls" to onLine.value, "show-play-btn" to onLine.value, "show-center-play-btn" to onLine.value, "enable-progress-gesture" to onLine.value, "show-fullscreen-btn" to onLine.value, "show-mute-btn" to onLine.value), _uA(
                                if (isTrue(onLine.value)) {
                                    _cE("view", _uM("key" to 0, "class" to "device-title"), _tD(deviceTitle.value), 1)
                                } else {
                                    _cC("v-if", true)
                                }
                                ,
                                if (isTrue(onLine.value)) {
                                    _cE("view", _uM("key" to 1, "class" to "video-right-control"), _uA(
                                        _cE("view", _uM("class" to "vedio-control"), _uA(
                                            _cE("image", _uM("class" to "vedio-control-icon", "src" to forward, "onClick" to toDeviceDetail))
                                        )),
                                        _cE("view", _uM("class" to "vedio-control"), _uA(
                                            _cE("image", _uM("class" to "vedio-control-icon", "src" to errIcon, "onClick" to errClick))
                                        )),
                                        _cE("view", _uM("class" to "vedio-control"), _uA(
                                            _cE("image", _uM("class" to "vedio-control-icon", "src" to transfer, "onClick" to transferClick))
                                        )),
                                        _cE("view", _uM("class" to "vedio-control"), _uA(
                                            _cE("image", _uM("class" to "vedio-control-icon", "src" to replayIcon, "onClick" to replay))
                                        ))
                                    ))
                                } else {
                                    _cE("view", _uM("key" to 2, "class" to "offline"), _uA(
                                        _cE("view", _uM("class" to "offline-content"), _uA(
                                            _cV(_component_l_icon, _uM("name" to "link-unlink", "color" to "#fff")),
                                            _cE("text", _uM("class" to "offline-title"), "设备断线了")
                                        )),
                                        _cE("text", _uM("class" to "time"), "2025-07-21 14:33"),
                                        _cV(_component_fui_button, _uM("color" to "#1296db", "text" to "查看帮助", "radius" to "50rpx", "size" to 22, "background" to "#fff", "width" to "120rpx", "height" to "40rpx"))
                                    ))
                                }
                            ), 8, _uA(
                                "controls",
                                "show-play-btn",
                                "show-center-play-btn",
                                "enable-progress-gesture",
                                "show-fullscreen-btn",
                                "show-mute-btn"
                            ))
                        ), 4)
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("width" to "100%", "height" to "100%", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column")), "content" to _uM(".container " to _uM("position" to "relative", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "width" to "100%", "height" to "400rpx", "overflow" to "hidden")), "video-container" to _uM(".container .content " to _uM("width" to "100%", "height" to "100%")), "video" to _uM(".container .content " to _uM("width" to "100%", "height" to "100%", "objectFit" to "cover", "marginBottom" to 0)), "device-title" to _uM(".container .content .video " to _uM("backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0.3)", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx")), "video-right-control" to _uM(".container .content .video " to _uM("position" to "absolute", "top" to 0, "right" to "10rpx", "display" to "flex", "flexDirection" to "column", "justifyContent" to "space-around", "height" to "90%", "alignItems" to "center", "zIndex" to 2)), "vedio-control" to _uM(".container .content .video .video-right-control " to _uM("width" to "50rpx", "height" to "50rpx", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)"), ".container .content .video-bottom-control " to _uM("marginTop" to 0, "marginRight" to "auto", "marginBottom" to 0, "marginLeft" to "auto", "width" to "50rpx", "height" to "50rpx", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)")), "vedio-control-icon" to _uM(".container .content .video .video-right-control .vedio-control " to _uM("width" to "100%", "height" to "100%"), ".container .content .video-bottom-control .vedio-control " to _uM("width" to "100%", "height" to "100%")), "offline" to _uM(".container .content .video " to _uM("width" to "100%", "height" to "100%", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center")), "offline-title" to _uM(".container .content .video .offline " to _uM("color" to "#ffffff", "marginLeft" to "10rpx")), "time" to _uM(".container .content .video .offline " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "color" to "#ffffff")), "offline-content" to _uM(".container .content .video .offline " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "video-top-title" to _uM(".container .content " to _uM("position" to "absolute", "top" to 0, "height" to "60rpx", "width" to "80%", "paddingTop" to "15rpx", "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to "20rpx", "backgroundImage" to "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor" to "rgba(0,0,0,0)", "zIndex" to 3)), "video-bottom-control" to _uM(".container .content " to _uM("position" to "absolute", "bottom" to "10rpx", "left" to 0, "width" to "100%", "height" to "50rpx", "zIndex" to 1)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
