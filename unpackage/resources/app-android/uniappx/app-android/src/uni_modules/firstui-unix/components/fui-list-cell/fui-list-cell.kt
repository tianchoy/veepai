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
open class GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCell : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "fui-list__cell",
            _uM("fui-list__cell-background" to (_ctx.background == ""))
        )), "hover-class" to if (_ctx.highlight) {
            "fui-list__cell-highlight"
        } else {
            ""
        }
        , "hover-stay-time" to 150, "style" to _nS(_uM("background" to _ctx.background, "marginTop" to ("" + _ctx.marginTop + "rpx"), "marginBottom" to ("" + _ctx.marginBottom + "rpx"), "borderRadius" to _ctx.radius)), "onClick" to _ctx.handleClick), _uA(
            if (isTrue(_ctx.topBorder)) {
                _cE("view", _uM("key" to 0, "style" to _nS(_ctx.getTopLineStyl), "class" to _nC(_uA(
                    "fui-cell__border-top",
                    _uM("fui-cell__border-color" to (_ctx.borderColor == ""))
                ))), null, 6)
            } else {
                _cC("v-if", true)
            }
            ,
            _cE("view", _uM("class" to _nC(_uA(
                "fui-list__cell-inner",
                _uM("fui-list__cell-padding" to (_ctx.padding == ""))
            )), "style" to _nS(_ctx.getPadding)), _uA(
                renderSlot(_ctx.`$slots`, "default"),
                if (isTrue(_ctx.arrow)) {
                    _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                        "fui-cell__arrow",
                        _uM("fui-list__cell-arrowcolor" to (_ctx.arrowColor == ""))
                    )), "style" to _nS(_ctx.getBorderColor)), null, 6)
                } else {
                    _cC("v-if", true)
                }
            ), 6),
            if (isTrue(_ctx.bottomBorder)) {
                _cE("view", _uM("key" to 1, "style" to _nS(_ctx.getBtmLineStyl), "class" to _nC(_uA(
                    "fui-cell__border-bottom",
                    _uM("fui-cell__border-color" to (_ctx.borderColor == ""), "fui-list__cell-bleft" to (_ctx.bottomLeft == -1))
                ))), null, 6)
            } else {
                _cC("v-if", true)
            }
        ), 14, _uA(
            "hover-class",
            "onClick"
        ))
    }
    open var padding: String by `$props`
    open var marginTop: Number by `$props`
    open var marginBottom: Number by `$props`
    open var background: String by `$props`
    open var highlight: Boolean by `$props`
    open var arrow: Boolean by `$props`
    open var arrowColor: String by `$props`
    open var topBorder: Boolean by `$props`
    open var bottomBorder: Boolean by `$props`
    open var borderColor: String by `$props`
    open var topLeft: Number by `$props`
    open var topRight: Number by `$props`
    open var bottomLeft: Number by `$props`
    open var bottomRight: Number by `$props`
    open var radius: String by `$props`
    open var index: Number by `$props`
    open var getPadding: Any by `$data`
    open var getBorderColor: Any by `$data`
    open var getTopLineStyl: Any by `$data`
    open var getBtmLineStyl: Any by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("getPadding" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.padding != "") {
                mp.set("padding", this.padding)
            }
            return mp
        }
        ), "getBorderColor" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.arrowColor != "") {
                mp.set("border-color", this.arrowColor)
            }
            return mp
        }
        ), "getTopLineStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.borderColor != "") {
                mp.set("background", this.borderColor)
            }
            mp.set("left", "" + this.topLeft + "rpx")
            mp.set("right", "" + this.topRight + "rpx")
            return mp
        }
        ), "getBtmLineStyl" to computed<Any>(fun(): Any {
            val mp: Map<String, String> = Map()
            if (this.borderColor != "") {
                mp.set("background", this.borderColor)
            }
            mp.set("left", "" + (if (this.bottomLeft == -1) {
                0
            } else {
                this.bottomLeft
            }
            ) + "rpx")
            mp.set("right", "" + this.bottomRight + "rpx")
            return mp
        }
        ))
    }
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn() {
        this.`$emit`("onclick", this.index)
    }
    companion object {
        var name = "fui-list-cell"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-list__cell" to _pS(_uM("position" to "relative", "width" to "100%", "display" to "flex", "flexDirection" to "row", "boxSizing" to "border-box")), "fui-list__cell-inner" to _pS(_uM("flex" to 1, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "boxSizing" to "border-box")), "fui-cell__arrow" to _pS(_uM("height" to "40rpx", "width" to "40rpx", "borderTopWidth" to 3, "borderRightWidth" to 3, "borderBottomWidth" to 0, "borderLeftWidth" to 0, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "transform" to "rotate(45deg) scale(0.5)", "borderTopLeftRadius" to "4rpx", "borderTopRightRadius" to "4rpx", "borderBottomRightRadius" to "4rpx", "borderBottomLeftRadius" to "4rpx", "flexShrink" to 0, "marginLeft" to "auto", "boxSizing" to "border-box", "transformOrigin" to "center center", "marginRight" to "-5.8579rpx")), "fui-cell__border-top" to _pS(_uM("position" to "absolute", "top" to 0, "height" to 0.5, "zIndex" to 1, "transform" to "scaleY(0.5)", "transformOrigin" to "0 0", "pointerEvents" to "none")), "fui-cell__border-bottom" to _pS(_uM("position" to "absolute", "bottom" to 0, "height" to 1, "transform" to "scaleY(0.5)", "transformOrigin" to "0 100%", "zIndex" to 1, "pointerEvents" to "none")), "fui-cell__border-color" to _pS(_uM("!backgroundColor" to "#EEEEEE")), "fui-list__cell-background" to _pS(_uM("!backgroundColor" to "#FFFFFF")), "fui-list__cell-highlight" to _pS(_uM("!backgroundColor" to "rgba(0,0,0,0.2)")), "fui-list__cell-padding" to _pS(_uM("!paddingTop" to "32rpx", "!paddingRight" to "32rpx", "!paddingBottom" to "32rpx", "!paddingLeft" to "32rpx")), "fui-list__cell-arrowcolor" to _pS(_uM("!borderTopColor" to "#B2B2B2", "!borderRightColor" to "#B2B2B2", "!borderBottomColor" to "#B2B2B2", "!borderLeftColor" to "#B2B2B2")), "fui-list__cell-bleft" to _pS(_uM("!left" to "32rpx")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("onclick" to null)
        var props = _nP(_uM("padding" to _uM("type" to "String", "default" to ""), "marginTop" to _uM("type" to "Number", "default" to 0), "marginBottom" to _uM("type" to "Number", "default" to 0), "background" to _uM("type" to "String", "default" to ""), "highlight" to _uM("type" to "Boolean", "default" to true), "arrow" to _uM("type" to "Boolean", "default" to false), "arrowColor" to _uM("type" to "String", "default" to ""), "topBorder" to _uM("type" to "Boolean", "default" to false), "bottomBorder" to _uM("type" to "Boolean", "default" to true), "borderColor" to _uM("type" to "String", "default" to ""), "topLeft" to _uM("type" to "Number", "default" to 0), "topRight" to _uM("type" to "Number", "default" to 0), "bottomLeft" to _uM("type" to "Number", "default" to -1), "bottomRight" to _uM("type" to "Number", "default" to 0), "radius" to _uM("type" to "String", "default" to "0"), "index" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "padding",
            "marginTop",
            "marginBottom",
            "background",
            "highlight",
            "arrow",
            "arrowColor",
            "topBorder",
            "bottomBorder",
            "borderColor",
            "topLeft",
            "topRight",
            "bottomLeft",
            "bottomRight",
            "radius",
            "index"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
