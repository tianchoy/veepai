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
import io.dcloud.uniapp.extapi.chooseImage as uni_chooseImage
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.scanCode as uni_scanCode
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesIndexAddNewDeviceAddNewDevice : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexAddNewDeviceAddNewDevice) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexAddNewDeviceAddNewDevice
            val _cache = __ins.renderCache
            val flash = ref<String>("off")
            val devicePosition = ref<String>("back")
            val frameSize = ref<String>("medium")
            val goback = fun(){
                uni_navigateBack(null)
            }
            val handleError = fun(err: Any){
                uni_showToast(ShowToastOptions(title = "请允许使用摄像头"))
            }
            val handleInitDone = fun(){
                uni_showToast(ShowToastOptions(title = "初始化成功"))
                uni_scanCode(ScanCodeOptions(success = fun(res) {
                    console.log("扫描结果：", res.result, " at pages/index/addNewDevice/addNewDevice.uvue:60")
                }
                , fail = fun(err) {
                    console.error("扫描失败：", err, " at pages/index/addNewDevice/addNewDevice.uvue:63")
                }
                ))
            }
            val switchFlash = fun(){
                flash.value = if (flash.value == "off") {
                    "on"
                } else {
                    "off"
                }
            }
            val scanImg = fun(){
                uni_chooseImage(ChooseImageOptions(count = 1, sourceType = _uA(
                    "album"
                ), success = fun(res){
                    uni_scanCode(ScanCodeOptions(onlyFromCamera = false, scanType = _uA(
                        "qrCode"
                    ), success = fun(scanRes){
                        console.log("识别结果:", scanRes.result, " at pages/index/addNewDevice/addNewDevice.uvue:81")
                    }
                    , fail = fun(err){
                        console.error("识别失败:", err, " at pages/index/addNewDevice/addNewDevice.uvue:84")
                    }
                    ))
                }
                ))
            }
            return fun(): Any? {
                val _component_camera = resolveComponent("camera")
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("title" to "添加新设备", "showBack" to true, "onBack" to goback, "isText" to true, "rightText" to "常见问题")),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "camera-box"), _uA(
                            _cV(_component_camera, _uM("style" to _nS(_uM("width" to "100%", "height" to "300px")), "resolution" to "medium", "device-position" to devicePosition.value, "mode" to "scanCode", "flash" to flash.value, "frame-size" to frameSize.value, "onError" to handleError, "onInitdone" to handleInitDone), null, 8, _uA(
                                "style",
                                "device-position",
                                "flash",
                                "frame-size"
                            )),
                            _cE("view", _uM("class" to "tips"), "请扫描机身上的二维码"),
                            _cE("view", _uM("class" to "tools"), _uA(
                                _cE("view", _uM("class" to "icon-container"), _uA(
                                    _cE("image", _uM("class" to "icons", "src" to "/static/device/flashlight.png", "mode" to "aspectFit", "onClick" to switchFlash))
                                )),
                                _cE("view", _uM("class" to "icon-container"), _uA(
                                    _cE("image", _uM("class" to "icons", "src" to "/static/device/picture.png", "mode" to "aspectFit", "onClick" to scanImg))
                                ))
                            ))
                        ))
                    )),
                    _cE("view", _uM("class" to "other-ways"), "找不到二维码时，请选择以下方式"),
                    _cE("view", _uM("class" to "ways-box"), _uA(
                        _cE("view", _uM("class" to "ways-item"), _uA(
                            _cE("text", _uM("class" to "ways-title"), "WIFI摄像机"),
                            _cE("text", _uM("class" to "ways-desc"), "使用扫APP二维码的配网方式")
                        )),
                        _cE("view", _uM("class" to "ways-item"), _uA(
                            _cE("text", _uM("class" to "ways-title"), "4G摄像机"),
                            _cE("text", _uM("class" to "ways-desc"), "使用4G网络的摄像机")
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "50rpx", "paddingRight" to "100rpx", "paddingBottom" to "30rpx", "paddingLeft" to "100rpx")), "tips" to _uM(".container .content " to _uM("paddingTop" to "50rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "display" to "flex", "flexDirection" to "row", "justifyContent" to "center")), "tools" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "center", "alignItems" to "center")), "icon-container" to _uM(".container .content .tools " to _uM("display" to "flex", "justifyContent" to "center", "alignItems" to "center", "width" to "50%")), "icons" to _uM(".container .content .tools .icon-container " to _uM("width" to "80rpx", "height" to "80rpx")), "other-ways" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "center", "alignItems" to "center", "marginTop" to "30rpx", "marginRight" to 0, "marginBottom" to "30rpx", "marginLeft" to 0)), "ways-box" to _uM(".container " to _uM("paddingTop" to 0, "paddingRight" to "30rpx", "paddingBottom" to 0, "paddingLeft" to "30rpx")), "ways-item" to _uM(".container .ways-box " to _uM("paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx", "backgroundColor" to "#ffffff", "marginBottom" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "ways-title" to _uM(".container .ways-box .ways-item " to _uM("fontSize" to "35rpx", "marginBottom" to "15rpx")), "ways-desc" to _uM(".container .ways-box .ways-item " to _uM("fontSize" to "25rpx", "color" to "#999999")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
