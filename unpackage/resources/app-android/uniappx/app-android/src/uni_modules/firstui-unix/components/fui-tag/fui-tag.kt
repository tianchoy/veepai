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
open class GenUniModulesFirstuiUnixComponentsFuiTagFuiTag : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return _cE("view", _uM("class" to _nC(_uA(
            "fui-tag__wrap",
            _uA(
                if (_ctx.originLeft) {
                    "fui-tag__origin-left"
                } else {
                    ""
                }
                ,
                if (_ctx.originRight) {
                    "fui-tag__origin-right"
                } else {
                    ""
                }
                ,
                if (_ctx.background == "") {
                    "fui-tag__" + _ctx.type + "-" + _ctx.theme
                } else {
                    ""
                }
                ,
                if ((_ctx.background != "" && _ctx.borderColor == "") || !_ctx.isBorder) {
                    "fui-tag__no-border"
                } else {
                    ""
                }
            )
        )), "style" to _nS(_uM("background" to _ctx.background, "borderColor" to _ctx.borderColor, "transform" to ("scale(" + _ctx.scaleRatio + ")"), "borderRadius" to ("" + _ctx.radius + "rpx"), "padding" to _ctx.padding, "marginTop" to ("" + _ctx.marginTop + "rpx"), "marginRight" to ("" + _ctx.marginRight + "rpx"), "marginBottom" to ("" + _ctx.marginBottom + "rpx"), "marginLeft" to ("" + _ctx.marginLeft + "rpx"))), "onClick" to _ctx.handleClick, "hover-stay-time" to 120, "hover-class" to if (_ctx.highlight) {
            "fui-tag__opacity-active"
        } else {
            ""
        }
        ), _uA(
            if (_ctx.text != "") {
                _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                    "fui-tag__text",
                    _uA(
                        if (_ctx.background == "") {
                            "fui-tag_" + _ctx.type + "-" + _ctx.theme
                        } else {
                            ""
                        }
                    )
                )), "style" to _nS(_uM("fontSize" to ("" + _ctx.size + "rpx"), "lineHeight" to ("" + _ctx.size + "rpx"), "color" to _ctx.color))), _tD(_ctx.text), 7)
            } else {
                _cC("v-if", true)
            }
            ,
            renderSlot(_ctx.`$slots`, "default")
        ), 14, _uA(
            "onClick",
            "hover-class"
        ))
    }
    open var text: String by `$props`
    open var type: String by `$props`
    open var theme: String by `$props`
    open var background: String by `$props`
    open var isBorder: Boolean by `$props`
    open var borderColor: String by `$props`
    open var color: String by `$props`
    open var size: Number by `$props`
    open var scaleRatio: Number by `$props`
    open var originLeft: Boolean by `$props`
    open var originRight: Boolean by `$props`
    open var highlight: Boolean by `$props`
    open var radius: Number by `$props`
    open var padding: String by `$props`
    open var marginTop: Number by `$props`
    open var marginBottom: Number by `$props`
    open var marginLeft: Number by `$props`
    open var marginRight: Number by `$props`
    open var index: Number by `$props`
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn() {
        this.`$emit`("onclick", this.index)
    }
    companion object {
        var name = "fui-tag"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-tag__wrap" to _pS(_uM("display" to "flex", "flexShrink" to 0, "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "center", "position" to "relative", "borderTopWidth" to 0.5, "borderRightWidth" to 0.5, "borderBottomWidth" to 0.5, "borderLeftWidth" to 0.5, "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "rgba(0,0,0,0)", "borderRightColor" to "rgba(0,0,0,0)", "borderBottomColor" to "rgba(0,0,0,0)", "borderLeftColor" to "rgba(0,0,0,0)", "overflow" to "hidden", "boxSizing" to "border-box")), "fui-tag__no-border" to _pS(_uM("borderTopWidth" to 0, "borderRightWidth" to 0, "borderBottomWidth" to 0, "borderLeftWidth" to 0)), "fui-tag__text" to _pS(_uM("lines" to 1, "overflow" to "hidden", "textOverflow" to "ellipsis")), "fui-tag__primary-dark" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#465CFF", "!borderTopColor" to "#465CFF", "!borderRightColor" to "#465CFF", "!borderBottomColor" to "#465CFF", "!borderLeftColor" to "#465CFF")), "fui-tag_primary-dark" to _pS(_uM("!color" to "#FFFFFF")), "fui-tag_success-dark" to _pS(_uM("!color" to "#FFFFFF")), "fui-tag_warning-dark" to _pS(_uM("!color" to "#FFFFFF")), "fui-tag_danger-dark" to _pS(_uM("!color" to "#FFFFFF")), "fui-tag_purple-dark" to _pS(_uM("!color" to "#FFFFFF")), "fui-tag__success-dark" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#09BE4F", "!borderTopColor" to "#09BE4F", "!borderRightColor" to "#09BE4F", "!borderBottomColor" to "#09BE4F", "!borderLeftColor" to "#09BE4F")), "fui-tag__warning-dark" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#FFB703", "!borderTopColor" to "#FFB703", "!borderRightColor" to "#FFB703", "!borderBottomColor" to "#FFB703", "!borderLeftColor" to "#FFB703")), "fui-tag__danger-dark" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#FF2B2B", "!borderTopColor" to "#FF2B2B", "!borderRightColor" to "#FF2B2B", "!borderBottomColor" to "#FF2B2B", "!borderLeftColor" to "#FF2B2B")), "fui-tag__purple-dark" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#6831FF", "!borderTopColor" to "#6831FF", "!borderRightColor" to "#6831FF", "!borderBottomColor" to "#6831FF", "!borderLeftColor" to "#6831FF")), "fui-tag__primary-light" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "#F1F4FA", "!borderTopColor" to "#F1F4FA", "!borderRightColor" to "#F1F4FA", "!borderBottomColor" to "#F1F4FA", "!borderLeftColor" to "#F1F4FA")), "fui-tag_primary-light" to _pS(_uM("!color" to "#465CFF")), "fui-tag_primary-plain" to _pS(_uM("!color" to "#465CFF")), "fui-tag__success-light" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(9,190,79,0.05)", "!borderTopColor" to "rgba(9,190,79,0.05)", "!borderRightColor" to "rgba(9,190,79,0.05)", "!borderBottomColor" to "rgba(9,190,79,0.05)", "!borderLeftColor" to "rgba(9,190,79,0.05)")), "fui-tag_success-light" to _pS(_uM("!color" to "#09BE4F")), "fui-tag_success-plain" to _pS(_uM("!color" to "#09BE4F")), "fui-tag__warning-light" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(255,183,3,0.1)", "!borderTopColor" to "rgba(255,183,3,0.1)", "!borderRightColor" to "rgba(255,183,3,0.1)", "!borderBottomColor" to "rgba(255,183,3,0.1)", "!borderLeftColor" to "rgba(255,183,3,0.1)")), "fui-tag_warning-light" to _pS(_uM("!color" to "#FFB703")), "fui-tag_warning-plain" to _pS(_uM("!color" to "#FFB703")), "fui-tag__danger-light" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(255,43,43,0.05)", "!borderTopColor" to "rgba(255,43,43,0.05)", "!borderRightColor" to "rgba(255,43,43,0.05)", "!borderBottomColor" to "rgba(255,43,43,0.05)", "!borderLeftColor" to "rgba(255,43,43,0.05)")), "fui-tag_danger-light" to _pS(_uM("!color" to "#FF2B2B")), "fui-tag_danger-plain" to _pS(_uM("!color" to "#FF2B2B")), "fui-tag__purple-light" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(104,49,255,0.05)", "!borderTopColor" to "rgba(104,49,255,0.05)", "!borderRightColor" to "rgba(104,49,255,0.05)", "!borderBottomColor" to "rgba(104,49,255,0.05)", "!borderLeftColor" to "rgba(104,49,255,0.05)")), "fui-tag_purple-light" to _pS(_uM("!color" to "#6831FF")), "fui-tag_purple-plain" to _pS(_uM("!color" to "#6831FF")), "fui-tag__primary-plain" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(0,0,0,0)", "!borderTopColor" to "#465CFF", "!borderRightColor" to "#465CFF", "!borderBottomColor" to "#465CFF", "!borderLeftColor" to "#465CFF")), "fui-tag__success-plain" to _pS(_uM("!backgroundColor" to "rgba(0,0,0,0)", "!borderTopColor" to "#09BE4F", "!borderRightColor" to "#09BE4F", "!borderBottomColor" to "#09BE4F", "!borderLeftColor" to "#09BE4F")), "fui-tag__warning-plain" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(0,0,0,0)", "!borderTopColor" to "#FFB703", "!borderRightColor" to "#FFB703", "!borderBottomColor" to "#FFB703", "!borderLeftColor" to "#FFB703")), "fui-tag__danger-plain" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(0,0,0,0)", "!borderTopColor" to "#FF2B2B", "!borderRightColor" to "#FF2B2B", "!borderBottomColor" to "#FF2B2B", "!borderLeftColor" to "#FF2B2B")), "fui-tag__purple-plain" to _pS(_uM("!backgroundImage" to "none", "!backgroundColor" to "rgba(0,0,0,0)", "!borderTopColor" to "#6831FF", "!borderRightColor" to "#6831FF", "!borderBottomColor" to "#6831FF", "!borderLeftColor" to "#6831FF")), "fui-tag__origin-left" to _pS(_uM("transformOrigin" to "0 center")), "fui-tag__origin-right" to _pS(_uM("transformOrigin" to "100% center")), "fui-tag__opacity-active" to _pS(_uM("opacity" to 0.5)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("onclick" to null)
        var props = _nP(_uM("text" to _uM("type" to "String", "default" to ""), "type" to _uM("type" to "String", "default" to "primary"), "theme" to _uM("type" to "String", "default" to "dark"), "background" to _uM("type" to "String", "default" to ""), "isBorder" to _uM("type" to "Boolean", "default" to true), "borderColor" to _uM("type" to "String", "default" to ""), "color" to _uM("type" to "String", "default" to ""), "size" to _uM("type" to "Number", "default" to 24), "scaleRatio" to _uM("type" to "Number", "default" to 1), "originLeft" to _uM("type" to "Boolean", "default" to false), "originRight" to _uM("type" to "Boolean", "default" to false), "highlight" to _uM("type" to "Boolean", "default" to false), "radius" to _uM("type" to "Number", "default" to 8), "padding" to _uM("type" to "String", "default" to "16rpx 32rpx"), "marginTop" to _uM("type" to "Number", "default" to 0), "marginBottom" to _uM("type" to "Number", "default" to 0), "marginLeft" to _uM("type" to "Number", "default" to 0), "marginRight" to _uM("type" to "Number", "default" to 0), "index" to _uM("type" to "Number", "default" to 0)))
        var propsNeedCastKeys = _uA(
            "text",
            "type",
            "theme",
            "background",
            "isBorder",
            "borderColor",
            "color",
            "size",
            "scaleRatio",
            "originLeft",
            "originRight",
            "highlight",
            "radius",
            "padding",
            "marginTop",
            "marginBottom",
            "marginLeft",
            "marginRight",
            "index"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
