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
open class GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineUserInfoChangePhoneNumberChangePhoneNumber
            val _cache = __ins.renderCache
            val btnWord = ref("获取验证码")
            val isCounting = ref(false)
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
                console.log("发送验证码请求...", " at pages/mine/userInfo/changePhoneNumber/changePhoneNumber.uvue:55")
                isCounting.value = true
                countDown(60)
            }
            return fun(): Any? {
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "content"), utsArrayOf(
                        createVNode(_component_fui_input, utsMapOf("placeholder" to "请输入手机号"), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createElementVNode("view", null, utsArrayOf(
                                    createElementVNode("image", utsMapOf("class" to "icon", "src" to default3))
                                ))
                            )
                        }
                        ), "_" to 1)),
                        createVNode(_component_fui_input, utsMapOf("padding" to "20rpx 32rpx", "placeholder" to "请输入验证码", "bottomLeft" to 0), utsMapOf("left" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createElementVNode("view", null, utsArrayOf(
                                    createElementVNode("image", utsMapOf("class" to "icon", "src" to default4))
                                ))
                            )
                        }
                        ), "default" to withSlotCtx(fun(): UTSArray<Any> {
                            return utsArrayOf(
                                createVNode(_component_fui_button, utsMapOf("type" to "gray", "bold" to true, "width" to "200rpx", "height" to "64rpx", "size" to 28, "onClick" to getPsw, "text" to btnWord.value, "disabled" to isCounting.value), null, 8, utsArrayOf(
                                    "text",
                                    "disabled"
                                ))
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#f3f3f3", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "content" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx")), "icon" to utsMapOf(".container .content " to utsMapOf("width" to "40rpx", "height" to "40rpx", "marginRight" to "10rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
