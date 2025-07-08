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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
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
                        console.log(res, " at pages/mine/userInfo/userInfo.uvue:62")
                        if (res.confirm) {
                            console.log("调用解绑API...", " at pages/mine/userInfo/userInfo.uvue:64")
                            switchVal.value = false
                            uni_showToast(ShowToastOptions(title = "已成功解绑微信", icon = "none"))
                        } else if (res.cancel) {
                            console.log("用户点击取消", isCurrentlyBound, " at pages/mine/userInfo/userInfo.uvue:73")
                            switchVal.value = isCurrentlyBound
                        }
                    }))
                } else {
                    uni_showModal(ShowModalOptions(title = "确认绑定", content = "确定要绑定微信账号吗？", cancelText = "取消", confirmText = "确定", success = fun(res){
                        if (res.confirm) {
                            console.log("调用绑定API...", " at pages/mine/userInfo/userInfo.uvue:86")
                            switchVal.value = true
                            uni_showToast(ShowToastOptions(title = "已成功绑定微信", icon = "none"))
                        } else if (res.cancel) {
                            console.log("用户点击取消", isCurrentlyBound, " at pages/mine/userInfo/userInfo.uvue:94")
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
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "title"), utsArrayOf(
                        createElementVNode("text", null, "个人信息")
                    )),
                    createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "info-item"), utsArrayOf(
                            createElementVNode("text", null, "账号"),
                            createElementVNode("text", null, "18888888888")
                        )),
                        createElementVNode("view", utsMapOf("class" to "info-item nobottom", "onClick" to changePhoneNumber), utsArrayOf(
                            createElementVNode("text", null, "手机号"),
                            createElementVNode("view", utsMapOf("class" to "phone"), utsArrayOf(
                                createElementVNode("text", null, "18888888888"),
                                createElementVNode("image", utsMapOf("class" to "icon", "src" to default3, "mode" to "aspectFit"))
                            ))
                        ))
                    )),
                    createElementVNode("view", utsMapOf("class" to "title"), utsArrayOf(
                        createElementVNode("text", null, "安全信息")
                    )),
                    createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "info-item", "onClick" to editPassword), utsArrayOf(
                            createElementVNode("text", null, "修改密码"),
                            createElementVNode("image", utsMapOf("class" to "icon", "src" to default3, "mode" to "aspectFit"))
                        )),
                        createElementVNode("view", utsMapOf("class" to "info-item nobottom", "onClick" to cancelAnAccount), utsArrayOf(
                            createElementVNode("text", null, "注销账号"),
                            createElementVNode("image", utsMapOf("class" to "icon", "src" to default3, "mode" to "aspectFit"))
                        ))
                    )),
                    createElementVNode("view", utsMapOf("class" to "title"), utsArrayOf(
                        createElementVNode("text", null, "第三方账号")
                    )),
                    createElementVNode("view", utsMapOf("class" to "info"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "info-item nobottom"), utsArrayOf(
                            createElementVNode("text", null, "微信"),
                            createElementVNode("view", utsMapOf("class" to "switch-state"), utsArrayOf(
                                createElementVNode("text", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "10rpx"))), toDisplayString(if (switchVal.value) {
                                    "已绑定"
                                } else {
                                    "未绑定"
                                }
                                ), 5),
                                createVNode(_component_fui_switch, utsMapOf("checked" to switchVal.value, "color" to "#1296db", "onChange" to change), null, 8, utsArrayOf(
                                    "checked"
                                ))
                            ))
                        ))
                    )),
                    createElementVNode("view", utsMapOf("class" to "btn-box"), utsArrayOf(
                        createVNode(_component_fui_button, utsMapOf("color" to "#fff", "text" to "退出登陆", "background" to "#1296db", "onOnclick" to logout))
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ), utsArrayOf(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#f3f3f3", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "title" to utsMapOf(".container " to utsMapOf("fontSize" to "30rpx", "color" to "#333333", "paddingTop" to "50rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to "20rpx")), "info" to utsMapOf(".container " to utsMapOf("backgroundImage" to "none", "backgroundColor" to "#ffffff", "paddingTop" to "10rpx", "paddingRight" to "30rpx", "paddingBottom" to "10rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx")), "info-item" to utsMapOf(".container .info " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to 0, "paddingBottom" to "20rpx", "paddingLeft" to 0, "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "icon" to utsMapOf(".container .info .info-item " to utsMapOf("width" to "30rpx", "height" to "30rpx")), "switch-state" to utsMapOf(".container .info .info-item " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-end", "alignItems" to "center")), "phone" to utsMapOf(".container .info .info-item " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-end", "alignItems" to "center")), "nobottom" to utsMapOf(".container .info " to utsMapOf("borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "btn-box" to utsMapOf(".container " to utsMapOf("marginTop" to "200rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
