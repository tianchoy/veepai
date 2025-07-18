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
open class GenUniModulesFirstuiUnixComponentsFuiEmptyFuiEmpty : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "fui-empty__wrap",
            _uM("fui-empty__fixed" to _ctx.isFixed)
        )), "style" to _nS(_uM("marginTop" to ("" + _ctx.marginTop + "rpx")))), _uA(
            if (_ctx.src != "") {
                _cE("image", _uM("key" to 0, "src" to _ctx.src, "style" to _nS(_uM("width" to ("" + _ctx.width + "rpx"), "height" to ("" + _ctx.height + "rpx"))), "mode" to "widthFix"), null, 12, _uA(
                    "src"
                ))
            } else {
                _cC("v-if", true)
            }
            ,
            if (_ctx.title != "") {
                _cE("text", _uM("key" to 1, "class" to _nC(_uA(
                    "fui-empty__title",
                    _uM("fui-empty__title-color" to (_ctx.color == ""))
                )), "style" to _nS(_uM("color" to _ctx.color, "fontSize" to ("" + _ctx.size + "rpx")))), _tD(_ctx.title), 7)
            } else {
                _cC("v-if", true)
            }
            ,
            if (_ctx.descr != "") {
                _cE("text", _uM("key" to 2, "class" to _nC(_uA(
                    "fui-empty__desc",
                    _uM("fui-empty__descr-color" to (_ctx.descrColor == ""))
                )), "style" to _nS(_uM("color" to _ctx.descrColor, "fontSize" to ("" + _ctx.descrSize + "rpx")))), _tD(_ctx.descr), 7)
            } else {
                _cC("v-if", true)
            }
            ,
            renderSlot(_ctx.`$slots`, "default")
        ), 6)
    }
    open var src: String by `$props`
    open var width: Number by `$props`
    open var height: Number by `$props`
    open var title: String by `$props`
    open var color: String by `$props`
    open var size: Number by `$props`
    open var descr: String by `$props`
    open var descrColor: String by `$props`
    open var descrSize: Number by `$props`
    open var isFixed: Boolean by `$props`
    open var marginTop: Number by `$props`
    companion object {
        var name = "fui-empty"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-empty__wrap" to _pS(_uM("width" to "100%", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "justifyContent" to "center")), "fui-empty__fixed" to _pS(_uM("position" to "fixed", "left" to 0, "top" to "50%", "transform" to "translateY(-50%)", "zIndex" to 99)), "fui-empty__title" to _pS(_uM("textAlign" to "center", "fontWeight" to "bold", "paddingTop" to "48rpx")), "fui-empty__desc" to _pS(_uM("textAlign" to "center", "fontWeight" to "normal", "paddingTop" to "8rpx")), "fui-empty__title-color" to _pS(_uM("!color" to "#333333")), "fui-empty__descr-color" to _pS(_uM("!color" to "#B2B2B2")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("src" to _uM("type" to "String", "default" to ""), "width" to _uM("type" to "Number", "default" to 576), "height" to _uM("type" to "Number", "default" to 318), "title" to _uM("type" to "String", "default" to ""), "color" to _uM("type" to "String", "default" to ""), "size" to _uM("type" to "Number", "default" to 32), "descr" to _uM("type" to "String", "default" to ""), "descrColor" to _uM("type" to "String", "default" to ""), "descrSize" to _uM("type" to "Number", "default" to 24), "isFixed" to _uM("type" to "Boolean", "default" to false), "marginTop" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "src",
            "width",
            "height",
            "title",
            "color",
            "size",
            "descr",
            "descrColor",
            "descrSize",
            "isFixed",
            "marginTop"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
