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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesIndexDeviceDetail : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceDetail) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceDetail
            val _cache = __ins.renderCache
            val videoSrc = ref("https://qiniu-web-assets.dcloud.net.cn/video/sample/2minute-demo.mp4")
            val deviceSetting = fun(){
                uni_showToast(ShowToastOptions(title = "设备设置", icon = "none"))
            }
            return fun(): Any? {
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("title" to "设备详情", "showBack" to true, "rightText" to "setup", "onRightEvent" to deviceSetting)),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("video", _uM("class" to "video", "id" to "myVideo", "title" to "deviceTitle", "src" to videoSrc.value, "ref" to "videoRef", "controls" to true, "show-play-btn" to true, "show-center-play-btn" to true, "enable-progress-gesture" to true, "show-fullscreen-btn" to true, "show-mute-btn" to true), null, 8, _uA(
                            "src"
                        ))
                    )),
                    _cE("view", _uM("class" to "control-big"), _uA(
                        _cE("view", _uM("class" to "big-item"), _uA(
                            _cE("image", _uM("class" to "big-item-icon", "src" to "/static/device/camera.png"))
                        )),
                        _cE("view", _uM("class" to "big-item"), _uA(
                            _cE("image", _uM("class" to "big-item-icon", "src" to "/static/device/vedio.png"))
                        )),
                        _cE("view", _uM("class" to "big-item"), _uA(
                            _cE("image", _uM("class" to "big-item-icon", "src" to "/static/device/volume_1.png"))
                        )),
                        _cE("view", _uM("class" to "big-item"), _uA(
                            _cE("image", _uM("class" to "big-item-icon", "src" to "/static/device/voice_1.png"))
                        ))
                    )),
                    _cE("view", _uM("class" to "control-more"), _uA(
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/hd.png")),
                            _cE("text", _uM("class" to "small-item-text"), "画质")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/zhence.png")),
                            _cE("text", _uM("class" to "small-item-text"), "智能侦测")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/night.png")),
                            _cE("text", _uM("class" to "small-item-text"), "夜视模式")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/jtfz.png")),
                            _cE("text", _uM("class" to "small-item-text"), "镜头翻转")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/cloud.png")),
                            _cE("text", _uM("class" to "small-item-text"), "云台")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/winfo.png")),
                            _cE("text", _uM("class" to "small-item-text"), "巡航")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/jd.png")),
                            _cE("text", _uM("class" to "small-item-text"), "警笛")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/redblue_1.png")),
                            _cE("text", _uM("class" to "small-item-text"), "红蓝灯")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/replay.png")),
                            _cE("text", _uM("class" to "small-item-text"), "回放")
                        )),
                        _cE("view", _uM("class" to "small-item"), _uA(
                            _cE("image", _uM("class" to "small-item-icon", "src" to "/static/device/share.png")),
                            _cE("text", _uM("class" to "small-item-text"), "分享")
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5")), "video" to _uM(".container " to _uM("width" to "100%")), "control-big" to _uM(".container " to _uM("paddingTop" to "50rpx", "paddingRight" to "20rpx", "paddingBottom" to "50rpx", "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center")), "big-item" to _uM(".container .control-big " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "40rpx", "paddingRight" to "40rpx", "paddingBottom" to "40rpx", "paddingLeft" to "40rpx")), "big-item-icon" to _uM(".container .control-big .big-item " to _uM("width" to "70rpx", "height" to "70rpx")), "control-more" to _uM(".container " to _uM("marginTop" to "20rpx", "marginRight" to "20rpx", "marginBottom" to "20rpx", "marginLeft" to "20rpx", "display" to "flex", "flexDirection" to "row", "flexWrap" to "wrap", "justifyContent" to "flex-start", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0)), "small-item" to _uM(".container .control-more " to _uM("width" to "20%", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "small-item-icon" to _uM(".container .control-more .small-item " to _uM("width" to "45rpx", "height" to "45rpx", "marginBottom" to "10rpx")), "small-item-text" to _uM(".container .control-more .small-item " to _uM("fontSize" to "24rpx", "color" to "#333333")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
