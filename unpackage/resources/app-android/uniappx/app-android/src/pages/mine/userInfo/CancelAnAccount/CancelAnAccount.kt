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
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("image", _uM("src" to default8, "class" to "close")),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("text", _uM("class" to "content-word"), "账号注销后将会删除个人数据且无法恢复，请谨慎操作。"),
                        _cE("text", _uM("class" to "content-word"), "注销前，请您自行备份重要数据及信息。")
                    )),
                    _cE("view", _uM("class" to "btn-box"), _uA(
                        _cE("view", _uM("class" to "btn"), _uA(
                            _cV(_component_fui_button, _uM("text" to "取消", "background" to "#fff", "color" to "#1296db", "borderColor" to "#666", "height" to "70rpx"))
                        )),
                        _cE("view", _uM("class" to "btn"), _uA(
                            _cV(_component_fui_button, _uM("text" to "申请注销", "background" to "#1296db", "color" to "#fff", "height" to "70rpx", "onOnclick" to cancelAccount))
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundImage" to "none", "backgroundColor" to "#F5F5F5", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "paddingTop" to "100rpx", "paddingRight" to "100rpx", "paddingBottom" to "100rpx", "paddingLeft" to "100rpx")), "content" to _uM(".container " to _uM("marginTop" to "50rpx", "marginRight" to 0, "marginBottom" to "50rpx", "marginLeft" to 0)), "content-word" to _uM(".container .content " to _uM("marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0)), "close" to _uM(".container " to _uM("width" to "120rpx", "height" to "120rpx")), "btn-box" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "width" to "100%")), "btn" to _uM(".container .btn-box " to _uM("width" to "45%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
