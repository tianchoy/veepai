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
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showModal as uni_showModal
open class GenPagesIndexDeviceSettingInfoDeviceSettingInfo : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceSettingInfoDeviceSettingInfo) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceSettingInfoDeviceSettingInfo
            val _cache = __ins.renderCache
            val state = ref<Boolean>(false)
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val goNightMode = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceSettingInfo/deviceNight"))
            }
            val changeSwitch = fun(e: Boolean){
                console.log(e, " at pages/index/deviceSettingInfo/deviceSettingInfo.uvue:48")
            }
            val restart = fun(){
                uni_showModal(ShowModalOptions(title = "提示", content = "确认重启设备吗？", cancelText = "取消", confirmText = "重启", success = fun(res){
                    if (res.confirm) {
                        console.log("用户点击了确定", " at pages/index/deviceSettingInfo/deviceSettingInfo.uvue:59")
                    }
                }
                ))
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_switch = resolveEasyComponent("fui-switch", GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchClass)
                val _component_fui_badge = resolveEasyComponent("fui-badge", GenUniModulesFirstuiUnixComponentsFuiBadgeFuiBadgeClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("title" to "设备设置", "show-back" to true, "onBack" to goBack)),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list-item", "onClick" to goNightMode), _uA(
                            _cE("text", null, "夜视模式"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to "40"))
                        )),
                        _cE("view", _uM("class" to "list-item"), _uA(
                            _cE("text", null, "翻转设置"),
                            _cV(_component_fui_switch, _uM("scaleRatio" to 0.8, "checked" to unref(state), "onChange" to changeSwitch), null, 8, _uA(
                                "checked"
                            ))
                        )),
                        _cE("view", _uM("class" to "list-item"), _uA(
                            _cE("text", null, "固件"),
                            _cE("view", _uM("class" to "firmware-box"), _uA(
                                _cV(_component_fui_badge, _uM("value" to "new", "type" to "danger", "scaleRatio" to 0.8)),
                                _cE("text", _uM("class" to "firmware-version"), "1.1.1")
                            ))
                        )),
                        _cE("view", _uM("class" to "list-item"), _uA(
                            _cE("text", null, "Mac地址"),
                            _cE("text", _uM("class" to "firmware-version"), "1.1.1")
                        )),
                        _cE("view", _uM("class" to "list-item", "onClick" to restart), _uA(
                            _cE("text", null, "重启"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to "40"))
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "list-item" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "firmware-box" to _uM(".container .content .list-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "firmware-version" to _uM(".container .content .list-item .firmware-box " to _uM("marginLeft" to "10rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
