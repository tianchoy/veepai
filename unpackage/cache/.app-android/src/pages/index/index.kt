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
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexIndex) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexIndex
            val _cache = __ins.renderCache
            val deviceTitle = ref("设备名称")
            val forward = "/static/video/forward.png"
            val errIcon = "/static/video/error.png"
            val transfer = "/static/video/transfer.png"
            val replayIcon = "/static/video/replay.png"
            val pauseIcon = "/static/video/pause.png"
            val videoSrc = "https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4"
            val videoRef = ref(null)
            val replay = fun(){
                uni_showToast(ShowToastOptions(title = "重播", icon = "none"))
                uni_createVideoContext("myVideo", null)!!!!.play()
            }
            val transferClick = fun(){
                uni_showToast(ShowToastOptions(title = "传输", icon = "none"))
            }
            val errClick = fun(){
                uni_showToast(ShowToastOptions(title = "警报", icon = "none"))
            }
            val toDeviceDetail = fun(){
                uni_showToast(ShowToastOptions(title = "设备详情", icon = "none"))
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceDetail"))
            }
            val pauseClick = fun(){
                uni_createVideoContext("myVideo", null)!!!!.pause()
                uni_showToast(ShowToastOptions(title = "暂停", icon = "none"))
            }
            val clickVdedio = fun(){
                uni_showToast(ShowToastOptions(title = "sss", icon = "none"))
            }
            return fun(): Any? {
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "video-container", "style" to _nS(_uM("border-radius" to "15rpx", "overflow" to "hidden"))), _uA(
                            _cE("video", _uM("class" to "video", "id" to "myVideo", "title" to deviceTitle.value, "src" to videoSrc, "ref_key" to "videoRef", "ref" to videoRef, "controls" to true, "show-play-btn" to true, "show-center-play-btn" to true, "enable-progress-gesture" to true, "show-fullscreen-btn" to true, "show-mute-btn" to true, "onClick" to clickVdedio), null, 8, _uA(
                                "title"
                            ))
                        ), 4),
                        _cE("view", null, _tD(deviceTitle.value), 1),
                        _cE("view", _uM("class" to "video-right-control"), _uA(
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
                        )),
                        _cE("view", _uM("class" to "video-bottom-control"), _uA(
                            _cE("view", _uM("class" to "vedio-control"), _uA(
                                _cE("image", _uM("class" to "vedio-control-icon", "onClick" to pauseClick, "src" to pauseIcon))
                            ))
                        ))
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
                return _uM("container" to _pS(_uM("width" to "100%", "height" to "100%", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column")), "content" to _uM(".container " to _uM("position" to "relative", "borderTopLeftRadius" to "15rpx", "borderTopRightRadius" to "15rpx", "borderBottomRightRadius" to "15rpx", "borderBottomLeftRadius" to "15rpx", "width" to "100%", "height" to "400rpx", "overflow" to "hidden")), "video-container" to _uM(".container .content " to _uM("width" to "100%", "height" to "100%")), "video" to _uM(".container .content " to _uM("width" to "100%", "height" to "100%", "objectFit" to "cover", "marginBottom" to 0)), "video-top-title" to _uM(".container .content " to _uM("position" to "absolute", "top" to 0, "height" to "60rpx", "width" to "80%", "paddingTop" to "15rpx", "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to "20rpx", "backgroundImage" to "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))", "backgroundColor" to "rgba(0,0,0,0)", "zIndex" to 3)), "video-right-control" to _uM(".container .content " to _uM("position" to "absolute", "top" to 0, "right" to "10rpx", "display" to "flex", "flexDirection" to "column", "justifyContent" to "space-around", "height" to "100%", "alignItems" to "center", "zIndex" to 2)), "vedio-control" to _uM(".container .content .video-right-control " to _uM("width" to "50rpx", "height" to "50rpx", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)"), ".container .content .video-bottom-control " to _uM("marginTop" to 0, "marginRight" to "auto", "marginBottom" to 0, "marginLeft" to "auto", "width" to "50rpx", "height" to "50rpx", "paddingTop" to "10rpx", "paddingRight" to "10rpx", "paddingBottom" to "10rpx", "paddingLeft" to "10rpx", "borderTopLeftRadius" to "25rpx", "borderTopRightRadius" to "25rpx", "borderBottomRightRadius" to "25rpx", "borderBottomLeftRadius" to "25rpx", "backgroundImage" to "none", "backgroundColor" to "rgba(255,255,255,0.7)")), "vedio-control-icon" to _uM(".container .content .video-right-control .vedio-control " to _uM("width" to "100%", "height" to "100%"), ".container .content .video-bottom-control .vedio-control " to _uM("width" to "100%", "height" to "100%")), "video-bottom-control" to _uM(".container .content " to _uM("position" to "absolute", "bottom" to "10rpx", "left" to 0, "width" to "100%", "height" to "50rpx", "zIndex" to 1)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
