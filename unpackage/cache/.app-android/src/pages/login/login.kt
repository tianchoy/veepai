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
            val login = fun(){
                uni_showToast(ShowToastOptions(title = "登录成功", icon = "success", duration = 1000))
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("image", utsMapOf("src" to default1, "class" to "longin_banner")),
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createVNode(_component_fui_input, utsMapOf("placeholder-style" to "color:#666", "backgroundColor" to "#f9dbf5", "radius" to 40, "borderBottom" to false, "placeholder" to "请输入账号"), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createElementVNode("view", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "20rpx"))), utsArrayOf(
                                    createVNode(_component_fui_icon, utsMapOf("name" to "mobile", "color" to "#1296db", "size" to 48))
                                ), 4)
                            )
                        }
                        ), "_" to 1)),
                        createVNode(_component_fui_input, utsMapOf("placeholder-style" to "color:#666", "backgroundColor" to "#f9dbf5", "marginTop" to 40, "radius" to 40, "borderBottom" to false, "placeholder" to "请输入密码", "type" to "password"), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createElementVNode("view", utsMapOf("style" to normalizeStyle(utsMapOf("margin-right" to "20rpx"))), utsArrayOf(
                                    createVNode(_component_fui_icon, utsMapOf("name" to "captcha", "color" to "#1296db", "size" to 48))
                                ), 4)
                            )
                        }
                        ), "_" to 1)),
                        createElementVNode("view", utsMapOf("class" to "tips"), utsArrayOf(
                            createElementVNode("text", null, "短信登陆"),
                            createElementVNode("text", null, "忘记密码")
                        )),
                        createVNode(_component_fui_button, utsMapOf("margin" to "20 0 0 0", "background" to "#1296db", "color" to "#fff", "size" to 40, "height" to "50", "onOnclick" to login), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                " 登录 "
                            )
                        }
                        ), "_" to 1))
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "longin_banner" to utsMapOf(".container " to utsMapOf("width" to "250rpx", "height" to "400rpx")), "content" to utsMapOf(".container " to utsMapOf("marginTop" to "50rpx", "marginRight" to "20rpx", "marginBottom" to "50rpx", "marginLeft" to "20rpx", "paddingTop" to 0, "paddingRight" to "50rpx", "paddingBottom" to 0, "paddingLeft" to "50rpx")), "tips" to utsMapOf(".container .content " to utsMapOf("marginTop" to "20rpx", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
