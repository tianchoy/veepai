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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.showModal as uni_showModal
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineUserInfoUserInfo : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineUserInfoUserInfo) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineUserInfoUserInfo
            val _cache = __ins.renderCache
            val switchVal = ref(false)
            val change = fun(){
                val isCurrentlyBound = switchVal.value
                if (isCurrentlyBound) {
                    uni_showModal(ShowModalOptions(title = "确认解绑", content = "确定要解除微信绑定吗？", cancelText = "取消", confirmText = "确定", success = fun(res){
                        console.log(res)
                        if (res.confirm) {
                            console.log("调用解绑API...")
                            switchVal.value = false
                            uni_showToast(ShowToastOptions(title = "已成功解绑微信", icon = "none"))
                        } else if (res.cancel) {
                            console.log("用户点击取消", isCurrentlyBound)
                            switchVal.value = isCurrentlyBound
                        }
                    }))
                } else {
                    uni_showModal(ShowModalOptions(title = "确认绑定", content = "确定要绑定微信账号吗？", cancelText = "取消", confirmText = "确定", success = fun(res){
                        if (res.confirm) {
                            console.log("调用绑定API...")
                            switchVal.value = true
                            uni_showToast(ShowToastOptions(title = "已成功绑定微信", icon = "none"))
                        } else if (res.cancel) {
                            console.log("用户点击取消", isCurrentlyBound)
                            switchVal.value = isCurrentlyBound
                        }
                    }
                    ))
                }
            }
            val logout = fun(){
                uni_showModal(ShowModalOptions(content = "确定退出登陆吗？", cancelText = "取消", confirmText = "确定", success = fun(res) {
                    if (res.confirm) {
                        uni_showToast(ShowToastOptions(title = "退出成功", icon = "none", duration = 500))
                    }
                }
                ))
            }
            val changePhoneNumber = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/userInfo/changePhoneNumber/changePhoneNumber"))
            }
            val cancelAnAccount = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/userInfo/CancelAnAccount/CancelAnAccount"))
            }
            val editPassword = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/userInfo/changePassword/changePassword"))
            }
            return fun(): Any? {
                val _component_fui_switch = resolveEasyComponent("fui-switch", GenUniModulesFirstuiUnixComponentsFuiSwitchFuiSwitchClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "title"), _uA(
                        _cE("text", _uM("class" to "title-text"), "个人信息")
                    )),
                    _cE("view", _uM("class" to "info"), _uA(
                        _cE("view", _uM("class" to "info-item"), _uA(
                            _cE("text", null, "账号"),
                            _cE("text", null, "18888888888")
                        )),
                        _cE("view", _uM("class" to "info-item nobottom", "onClick" to changePhoneNumber), _uA(
                            _cE("text", null, "手机号"),
                            _cE("view", _uM("class" to "phone"), _uA(
                                _cE("text", null, "18888888888"),
                                _cE("image", _uM("class" to "icon", "src" to default7, "mode" to "aspectFit"))
                            ))
                        ))
                    )),
                    _cE("view", _uM("class" to "title"), _uA(
                        _cE("text", null, "安全信息")
                    )),
                    _cE("view", _uM("class" to "info"), _uA(
                        _cE("view", _uM("class" to "info-item", "onClick" to editPassword), _uA(
                            _cE("text", null, "修改密码"),
                            _cE("image", _uM("class" to "icon", "src" to default7, "mode" to "aspectFit"))
                        )),
                        _cE("view", _uM("class" to "info-item nobottom", "onClick" to cancelAnAccount), _uA(
                            _cE("text", null, "注销账号"),
                            _cE("image", _uM("class" to "icon", "src" to default7, "mode" to "aspectFit"))
                        ))
                    )),
                    _cE("view", _uM("class" to "title"), _uA(
                        _cE("text", null, "第三方账号")
                    )),
                    _cE("view", _uM("class" to "info"), _uA(
                        _cE("view", _uM("class" to "info-item nobottom"), _uA(
                            _cE("text", null, "微信"),
                            _cE("view", _uM("class" to "switch-state"), _uA(
                                _cE("text", _uM("style" to _nS(_uM("margin-right" to "10rpx"))), _tD(if (switchVal.value) {
                                    "已绑定"
                                } else {
                                    "未绑定"
                                }
                                ), 5),
                                _cV(_component_fui_switch, _uM("checked" to switchVal.value, "color" to "#1296db", "onChange" to change), null, 8, _uA(
                                    "checked"
                                ))
                            ))
                        ))
                    )),
                    _cE("view", _uM("class" to "btn-box"), _uA(
                        _cV(_component_fui_button, _uM("color" to "#fff", "text" to "退出登陆", "background" to "#1296db", "onOnclick" to logout))
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#f3f3f3", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "title" to _uM(".container " to _uM("paddingTop" to "50rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to "20rpx")), "title-text" to _uM(".container .title " to _uM("fontSize" to "30rpx", "color" to "#333333")), "info" to _uM(".container " to _uM("backgroundImage" to "none", "backgroundColor" to "#ffffff", "paddingTop" to "10rpx", "paddingRight" to "30rpx", "paddingBottom" to "10rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx")), "info-item" to _uM(".container .info " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "icon" to _uM(".container .info .info-item " to _uM("width" to "30rpx", "height" to "30rpx")), "switch-state" to _uM(".container .info .info-item " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-end", "alignItems" to "center")), "phone" to _uM(".container .info .info-item " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-end", "alignItems" to "center")), "nobottom" to _uM(".container .info " to _uM("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "btn-box" to _uM(".container " to _uM("marginTop" to "200rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
