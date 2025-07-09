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
open class GenPagesLoginLogin : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesLoginLogin) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesLoginLogin
            val _cache = __ins.renderCache
            val loginType = ref<Boolean>(true)
            val isCheck = ref<String>("")
            val btnWord = ref<String>("获取验证码")
            val isCounting = ref<Boolean>(false)
            val user_info = ref<Boolean>(false)
            val user_text = ref(object : UTSJSONObject() {
                var title = ""
                var content = ""
            })
            val changeType = fun(bool: Boolean){
                loginType.value = bool
            }
            val closeUserPopup = fun(){
                user_info.value = false
            }
            val showUserInfo = fun(){
                user_info.value = true
                user_text.value = object : UTSJSONObject() {
                    var title = "用户协议"
                    var content = "用户协议内容"
                }
            }
            val priviteInfo = fun(){
                user_info.value = true
                user_text.value = object : UTSJSONObject() {
                    var title = "隐私政策"
                    var content = "隐私政策内容"
                }
            }
            val isChecked = fun(e: UTSArray<String>){
                isCheck.value = e.join(",")
            }
            fun gen_countDown_fn(seconds: Number) {
                if (seconds <= 0) {
                    btnWord.value = "获取验证码"
                    isCounting.value = false
                    return
                }
                btnWord.value = "" + seconds + "\u79D2\u540E\u91CD\u53D1"
                setTimeout(fun(){
                    gen_countDown_fn(seconds - 1)
                }
                , 1000)
            }
            val countDown = ::gen_countDown_fn
            val getPsw = fun(){
                if (isCounting.value) {
                    return
                }
                console.log("发送验证码请求...", " at pages/login/login.uvue:146")
                isCounting.value = true
                countDown(90)
            }
            val login = fun(){
                if (isCheck.value == "") {
                    uni_showToast(ShowToastOptions(title = "请先同意用户协议和隐私政策", icon = "none"))
                } else {
                    uni_showToast(ShowToastOptions(title = "登录成功", icon = "none"))
                }
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                val _component_fui_checkbox = resolveEasyComponent("fui-checkbox", GenUniModulesFirstuiUnixComponentsFuiCheckboxFuiCheckboxClass)
                val _component_fui_label = resolveEasyComponent("fui-label", GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelClass)
                val _component_fui_checkbox_group = resolveEasyComponent("fui-checkbox-group", GenUniModulesFirstuiUnixComponentsFuiCheckboxGroupFuiCheckboxGroupClass)
                val _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup", GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopupClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createVNode(unref(GenComponentsTopNavBarClass), utsMapOf("title" to "登陆", "rightText" to "注册")),
                    createElementVNode("image", utsMapOf("src" to default9, "class" to "longin_banner")),
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        if (isTrue(loginType.value)) {
                            createElementVNode("view", utsMapOf("key" to 0), utsArrayOf(
                                createVNode(_component_fui_input, utsMapOf("placeholder-style" to "color:#000", "backgroundColor" to "#d3a0fa", "radius" to 40, "borderBottom" to false, "placeholder" to "请输入账号"), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createElementVNode("view", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "20rpx"))), utsArrayOf(
                                            createVNode(_component_fui_icon, utsMapOf("name" to "mobile", "color" to "#1296db", "size" to 48))
                                        ), 4)
                                    )
                                }), "_" to 1)),
                                createVNode(_component_fui_input, utsMapOf("placeholder-style" to "color:#000", "backgroundColor" to "#d3a0fa", "marginTop" to 40, "radius" to 40, "borderBottom" to false, "placeholder" to "请输入密码", "type" to "password"), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createElementVNode("view", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "20rpx"))), utsArrayOf(
                                            createVNode(_component_fui_icon, utsMapOf("name" to "captcha", "color" to "#1296db", "size" to 48))
                                        ), 4)
                                    )
                                }), "_" to 1)),
                                createElementVNode("view", utsMapOf("class" to "tips"), utsArrayOf(
                                    createElementVNode("text", utsMapOf("onClick" to fun(){
                                        changeType(false)
                                    }), "短信登陆", 8, utsArrayOf(
                                        "onClick"
                                    )),
                                    createElementVNode("text", null, "忘记密码")
                                ))
                            ))
                        } else {
                            createElementVNode("view", utsMapOf("key" to 1), utsArrayOf(
                                createVNode(_component_fui_input, utsMapOf("placeholder-style" to "color:#000", "backgroundColor" to "#d3a0fa", "radius" to 40, "borderBottom" to false, "placeholder" to "请输入账号"), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createElementVNode("view", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "20rpx"))), utsArrayOf(
                                            createVNode(_component_fui_icon, utsMapOf("name" to "mobile", "color" to "#1296db", "size" to 48))
                                        ), 4)
                                    )
                                }
                                ), "_" to 1)),
                                createVNode(_component_fui_input, utsMapOf("padding" to "20rpx 32rpx", "backgroundColor" to "#d3a0fa", "placeholder" to "请输入验证码", "bottomLeft" to 0, "marginTop" to 40, "radius" to 40, "placeholderStyle" to "font-size: 26rpx;", "placeholder-style" to "color:#000", "borderBottom" to false), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createElementVNode("view", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "20rpx"))), utsArrayOf(
                                            createVNode(_component_fui_icon, utsMapOf("name" to "captcha", "color" to "#1296db", "size" to 48))
                                        ), 4)
                                    )
                                }
                                ), "default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createVNode(_component_fui_button, utsMapOf("width" to "200rpx", "height" to "64rpx", "size" to 28, "onClick" to getPsw, "text" to btnWord.value, "background" to "none", "color" to "#333", "disabled" to isCounting.value), null, 8, utsArrayOf(
                                            "text",
                                            "disabled"
                                        ))
                                    )
                                }
                                ), "_" to 1)),
                                createElementVNode("view", utsMapOf("class" to "tips"), utsArrayOf(
                                    createElementVNode("text", utsMapOf("onClick" to fun(){
                                        changeType(true)
                                    }
                                    ), "密码登陆", 8, utsArrayOf(
                                        "onClick"
                                    )),
                                    createElementVNode("text", null, "忘记密码")
                                ))
                            ))
                        }
                        ,
                        createVNode(_component_fui_checkbox_group, utsMapOf("name" to "checkbox", "class" to "check-box", "onChange" to isChecked), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createVNode(_component_fui_label, null, utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createVNode(_component_fui_checkbox, utsMapOf("value" to "1"))
                                    )
                                }
                                ), "_" to 1)),
                                createElementVNode("view", utsMapOf("class" to "fui-text-box"), utsArrayOf(
                                    createElementVNode("text", null, "已阅读并同意"),
                                    createElementVNode("text", utsMapOf("class" to "fui-text", "onClick" to showUserInfo), "《用户协议》"),
                                    createElementVNode("text", null, "和"),
                                    createElementVNode("text", utsMapOf("class" to "fui-text", "onClick" to priviteInfo), "《隐私政策》")
                                ))
                            )
                        }
                        ), "_" to 1)),
                        createVNode(_component_fui_button, utsMapOf("text" to "登录", "margin" to "20rpx 0 0 0", "background" to "#1296db", "color" to "#fff", "size" to 40, "onOnclick" to login))
                    )),
                    createElementVNode("view", null, utsArrayOf(
                        createVNode(_component_fui_bottom_popup, utsMapOf("visible" to user_info.value, "onClose" to closeUserPopup), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createElementVNode("view", utsMapOf("class" to "fui-scroll__wrap"), utsArrayOf(
                                    createElementVNode("view", utsMapOf("class" to "fui-title__pb"), utsArrayOf(
                                        createElementVNode("text", null, toDisplayString(user_text.value["title"]), 1),
                                        createElementVNode("view", utsMapOf("onClick" to closeUserPopup), utsArrayOf(
                                            createVNode(_component_fui_icon, utsMapOf("name" to "close", "size" to 48))
                                        ))
                                    )),
                                    createElementVNode("scroll-view", utsMapOf("scroll-y" to true, "show-scrollbar" to false), utsArrayOf(
                                        createElementVNode("view", null, toDisplayString(user_text.value["content"]), 1)
                                    ))
                                ))
                            )
                        }
                        ), "_" to 1), 8, utsArrayOf(
                            "visible"
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "40rpx", "paddingBottom" to "20rpx", "paddingLeft" to "40rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "longin_banner" to utsMapOf(".container " to utsMapOf("width" to "250rpx", "height" to "400rpx", "marginBottom" to "20rpx")), "content" to utsMapOf(".container " to utsMapOf("width" to "100%")), "check-box" to utsMapOf(".container .content " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-start", "marginTop" to "20rpx")), "fui-text-box" to utsMapOf(".container .content .check-box " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-start", "marginLeft" to "10rpx")), "fui-text" to utsMapOf(".container .content .check-box .fui-text-box " to utsMapOf("color" to "#1296db")), "tips" to utsMapOf(".container .content " to utsMapOf("marginTop" to "20rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "fui-scroll__wrap" to utsMapOf(".container " to utsMapOf("width" to "100%", "paddingTop" to "40rpx", "paddingRight" to "40rpx", "paddingBottom" to "40rpx", "paddingLeft" to "40rpx")), "fui-title__pb" to utsMapOf(".container .fui-scroll__wrap " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
