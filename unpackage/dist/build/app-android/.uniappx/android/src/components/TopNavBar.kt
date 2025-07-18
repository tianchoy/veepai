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
open class GenComponentsTopNavBar : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    open var title: String by `$props`
    open var showBack: Boolean by `$props`
    open var messageCount: Number by `$props`
    open var rightText: String by `$props`
    open var isText: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenComponentsTopNavBar) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenComponentsTopNavBar
            val _cache = __ins.renderCache
            val props = __props
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val goBack = fun(){
                return emits("back")
            }
            val rightIcon = fun(){
                return emits("rightEvent")
            }
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                return _cE("view", _uM("class" to "custom-nav"), _uA(
                    _cE("view", _uM("class" to "nav-back", "onClick" to goBack), _uA(
                        if (isTrue(props.showBack)) {
                            _cV(_component_fui_icon, _uM("key" to 0, "name" to "arrowleft", "size" to "50"))
                        } else {
                            _cC("v-if", true)
                        }
                    )),
                    _cE("view", _uM("class" to "nav-item"), _uA(
                        _cE("text", _uM("class" to "nav-title"), _tD(props.title), 1)
                    )),
                    _cE("view", _uM("class" to "nav-actions", "onClick" to rightIcon), _uA(
                        if (isTrue(_ctx.isText)) {
                            _cE("text", _uM("key" to 0), _tD(_ctx.rightText), 1)
                        } else {
                            _cV(_component_fui_icon, _uM("key" to 1, "name" to _ctx.rightText, "size" to "45"), null, 8, _uA(
                                "name"
                            ))
                        }
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("custom-nav" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "100rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to "20rpx", "width" to "100%")), "nav-back" to _pS(_uM("width" to "45rpx", "height" to "45rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center")), "nav-item" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "flex-end", "justifyContent" to "space-around")), "nav-title" to _pS(_uM("color" to "#333333", "marginTop" to 0, "marginRight" to "20rpx", "marginBottom" to 0, "marginLeft" to "20rpx", "maxWidth" to "400rpx", "textAlign" to "center", "overflow" to "hidden", "textOverflow" to "ellipsis", "whiteSpace" to "nowrap")), "nav-actions" to _pS(_uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center")), "nav-icon" to _pS(_uM("width" to "45rpx", "height" to "45rpx", "display" to "flex", "alignItems" to "center", "justifyContent" to "center", "position" to "relative", "marginLeft" to "16rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("back" to null, "message" to null, "rightEvent" to null)
        var props = _nP(_uM("title" to _uM("type" to "String", "default" to "首页"), "showBack" to _uM("type" to "Boolean", "default" to false), "messageCount" to _uM("type" to "Number", "default" to 0), "rightText" to _uM("type" to "String", "default" to ""), "isText" to _uM("type" to "Boolean", "default" to false)))
        var propsNeedCastKeys = _uA(
            "title",
            "showBack",
            "messageCount",
            "rightText",
            "isText"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
