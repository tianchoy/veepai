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
open class GenPagesMineAboutAbout : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _cache = this.`$`.renderCache
        val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
        return _cE("view", _uM("class" to "container"), _uA(
            _cE("view", _uM("class" to "appinfo"), _uA(
                _cE("image", _uM("class" to "logo", "src" to default10)),
                _cE("text", _uM("class" to "title"), "夜鹰智联"),
                _cE("text", _uM("class" to "version"), "V1.0.1.250512")
            )),
            _cE("view", _uM("class" to "content"), _uA(
                _cE("view", _uM("class" to "item"), _uA(
                    _cE("text", null, "用户协议"),
                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                _cE("view", _uM("class" to "item"), _uA(
                    _cE("text", null, "隐私政策"),
                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                _cE("view", _uM("class" to "item"), _uA(
                    _cE("text", null, "个人信息收集"),
                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                _cE("view", _uM("class" to "item"), _uA(
                    _cE("text", null, "第三方共享"),
                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                _cE("view", _uM("class" to "item"), _uA(
                    _cE("text", null, "检查更新"),
                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to 55))
                )),
                _cE("view", _uM("class" to "item"), _uA(
                    _cE("text", null, "分享APP"),
                    _cV(_component_fui_icon, _uM("name" to "arrowright", "color" to "#333", "size" to 55))
                ))
            )),
            _cE("view", _uM("class" to "copyright"), _uA(
                _cE("text", _uM("class" to "txt"), "版权所有：夜鹰智联"),
                _cE("text", _uM("class" to "txt"), "粤ICP备18088888号")
            ))
        ))
    }
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "appinfo" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "logo" to _uM(".container " to _uM("width" to "150rpx", "height" to "150rpx", "marginTop" to "100rpx", "marginRight" to 0, "marginBottom" to "50rpx", "marginLeft" to 0)), "title" to _uM(".container " to _uM("fontSize" to "30rpx", "fontWeight" to "bold", "marginBottom" to "50rpx")), "version" to _uM(".container " to _uM("fontSize" to "20rpx", "color" to "#999999", "marginBottom" to "50rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "30rpx", "paddingBottom" to "20rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "item" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f9f9f9", "paddingTop" to "40rpx", "paddingRight" to 0, "paddingBottom" to "40rpx", "paddingLeft" to 0)), "copyright" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "center", "marginTop" to "200rpx")), "txt" to _uM(".container .copyright " to _uM("fontSize" to "15rpx", "color" to "#999999")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
