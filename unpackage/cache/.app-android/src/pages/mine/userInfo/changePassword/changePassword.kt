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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineUserInfoChangePasswordChangePassword : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineUserInfoChangePasswordChangePassword) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineUserInfoChangePasswordChangePassword
            val _cache = __ins.renderCache
            val oldPassword = ref<String>("")
            val newPassword = ref<String>("")
            val confirmPassword = ref<String>("")
            val btnDisabled = ref<Boolean>(true)
            val updateOldPassword = fun(e: String){
                console.log(e, " at pages/mine/userInfo/changePassword/changePassword.uvue:28")
                oldPassword.value = e
            }
            val updateNewPassword = fun(e: String){
                if (verPassword(e)) {
                    newPassword.value = e
                }
            }
            val updateConfirmPassword = fun(e: String){
                console.log(e, " at pages/mine/userInfo/changePassword/changePassword.uvue:42")
                confirmPassword.value = e
            }
            val verPassword = fun(psw: String): Boolean {
                if (psw.length < 8 || psw.length > 16) {
                    return false
                }
                if (!passwordReg(psw)) {
                    return false
                }
                return true
            }
            val passwordReg = UTSRegExp("^(?=.*[a-zA-Z])(?=.*\\d)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z\\d])|(?=.*\\d)(?=.*[^a-zA-Z\\d]).{8,16}\$", "")
            val submit = fun(){
                if (!passwordReg.test(newPassword.value)) {
                    uni_showToast(ShowToastOptions(title = "密码格式错误", icon = "none"))
                    return
                }
                if (newPassword.value != confirmPassword.value) {
                    uni_showToast(ShowToastOptions(title = "两次密码不一致", icon = "none"))
                    return
                }
                uni_showToast(ShowToastOptions(title = "提交成功", icon = "none"))
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createVNode(_component_fui_icon, utsMapOf("name" to "addfriends")),
                        createVNode(_component_fui_input, utsMapOf("label" to "旧密码", "placeholder" to "请输入原密码", "modelValue" to oldPassword.value, "onInput" to updateOldPassword), null, 8, utsArrayOf(
                            "modelValue"
                        )),
                        createVNode(_component_fui_input, utsMapOf("label" to "新密码", "placeholder" to "请输入新密码", "modelValue" to newPassword.value, "onInput" to updateNewPassword), null, 8, utsArrayOf(
                            "modelValue"
                        )),
                        createVNode(_component_fui_input, utsMapOf("label" to "确认新密码", "placeholder" to "再次输入新密码", "modelValue" to confirmPassword.value, "onInput" to updateConfirmPassword), null, 8, utsArrayOf(
                            "modelValue"
                        ))
                    )),
                    createElementVNode("view", utsMapOf("class" to "tips"), utsArrayOf(
                        createElementVNode("text", utsMapOf("class" to "tips-word"), "密码8-16位,需包含英文字母、数字、特殊字符中两类及以上")
                    )),
                    createElementVNode("view", null, utsArrayOf(
                        createVNode(_component_fui_button, utsMapOf("color" to "#fff", "disabled" to btnDisabled.value, "text" to "提交", "background" to "#1296db", "height" to "80rpx", "onOnclick" to submit), null, 8, utsArrayOf(
                            "disabled"
                        ))
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "50rpx", "paddingRight" to "20rpx", "paddingBottom" to "50rpx", "paddingLeft" to "20rpx")), "fui-input__label-size" to utsMapOf(".container " to utsMapOf("!fontSize" to "26rpx")), "content" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "tips" to utsMapOf(".container " to utsMapOf("marginTop" to "40rpx", "marginRight" to 0, "marginBottom" to "40rpx", "marginLeft" to 0)), "tips-word" to utsMapOf(".container .tips " to utsMapOf("fontSize" to "30rpx", "color" to "#999999")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
