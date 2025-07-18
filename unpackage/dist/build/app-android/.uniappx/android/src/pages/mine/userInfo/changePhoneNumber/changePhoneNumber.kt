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
                console.log("发送验证码请求...")
                isCounting.value = true
                countDown(60)
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_input = resolveEasyComponent("fui-input", GenUniModulesFirstuiUnixComponentsFuiInputFuiInputClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cV(_component_fui_input, _uM("placeholder" to "请输入手机号", "placeholderStyle" to "font-size: 26rpx;"), _uM("left" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE("view", null, _uA(
                                    _cV(_component_fui_icon, _uM("name" to "mobile", "color" to "#1296db", "size" to 48))
                                ))
                            )
                        }
                        ), "_" to 1)),
                        _cV(_component_fui_input, _uM("padding" to "20rpx 32rpx", "placeholder" to "请输入验证码", "bottomLeft" to 0, "placeholderStyle" to "font-size: 26rpx;"), _uM("left" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE("view", null, _uA(
                                    _cV(_component_fui_icon, _uM("name" to "captcha", "color" to "#1296db", "size" to 48))
                                ))
                            )
                        }
                        ), "default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cV(_component_fui_button, _uM("type" to "gray", "width" to "200rpx", "height" to "64rpx", "size" to 28, "onClick" to getPsw, "text" to btnWord.value, "disabled" to isCounting.value), null, 8, _uA(
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
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#f3f3f3", "paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx")), "icon" to _uM(".container .content " to _uM("width" to "40rpx", "height" to "40rpx", "marginRight" to "10rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
