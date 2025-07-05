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
open class GenPagesMineUserInfoCancelAnAccountCancelAnAccount : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineUserInfoCancelAnAccountCancelAnAccount) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineUserInfoCancelAnAccountCancelAnAccount
            val _cache = __ins.renderCache
            val cancelAccount = fun(){
                uni_showToast(ShowToastOptions(title = "注销成功", icon = "success", duration = 2000))
            }
            return fun(): Any? {
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("image", utsMapOf("src" to default2, "class" to "close")),
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createElementVNode("text", utsMapOf("class" to "content-word"), "账号注销后将会删除个人数据且无法恢复，请谨慎操作。"),
                        createElementVNode("text", utsMapOf("class" to "content-word"), "注销前，请您自行备份重要数据及信息。")
                    )),
                    createElementVNode("view", utsMapOf("class" to "btn-box"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "btn"), utsArrayOf(
                            createVNode(_component_fui_button, utsMapOf("text" to "取消", "background" to "#fff", "color" to "#1296db", "borderColor" to "#666", "height" to "70rpx"))
                        )),
                        createElementVNode("view", utsMapOf("class" to "btn"), utsArrayOf(
                            createVNode(_component_fui_button, utsMapOf("text" to "申请注销", "background" to "#1296db", "color" to "#fff", "height" to "70rpx", "onOnclick" to cancelAccount))
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#F5F5F5", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "paddingTop" to "100rpx", "paddingRight" to "100rpx", "paddingBottom" to "100rpx", "paddingLeft" to "100rpx")), "content" to utsMapOf(".container " to utsMapOf("marginTop" to "50rpx", "marginRight" to 0, "marginBottom" to "50rpx", "marginLeft" to 0)), "content-word" to utsMapOf(".container .content " to utsMapOf("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "close" to utsMapOf(".container " to utsMapOf("width" to "120rpx", "height" to "120rpx")), "btn-box" to utsMapOf(".container " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "width" to "100%")), "btn" to utsMapOf(".container .btn-box " to utsMapOf("width" to "45%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
