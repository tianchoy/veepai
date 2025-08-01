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
open class GenPagesIndexDeviceShareDeviceVisitor : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceShareDeviceVisitor) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceShareDeviceVisitor
            val _cache = __ins.renderCache
            val toDetail = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceShare/visitorDetail"))
            }
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list", "onClick" to toDetail), _uA(
                            _cE("text", null, "张三"),
                            _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "30"))
                        )),
                        _cE("view", _uM("class" to "list nounderline"), _uA(
                            _cE("text", null, "李四"),
                            _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "30"))
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
                return _uM("container" to _pS(_uM("height" to "100%", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "backgroundColor" to "#f5f5f5")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "list" to _uM(".container .content " to _uM("paddingTop" to "40rpx", "paddingRight" to 0, "paddingBottom" to "40rpx", "paddingLeft" to 0, "display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f9f9f9")), "nounderline" to _uM(".container .content " to _uM("borderBottomWidth" to 0, "borderBottomStyle" to "none", "borderBottomColor" to "#000000")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
