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
open class GenUniModulesFirstuiUnixComponentsFuiBadgeFuiBadge : VueComponent {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {
        onMounted(fun() {
            this.getWidth()
        }
        , __ins)
        this.`$watch`(fun(): Any? {
            return this.value
        }
        , fun() {
            this.getWidth()
        }
        )
    }
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this
        val _cache = this.`$`.renderCache
        return if (isTrue(_ctx.showValue != "" || _ctx.dot)) {
            _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                if (_ctx.dot) {
                    "fui-badge__dot"
                } else {
                    "fui-badge__wrap"
                },
                if (_ctx.background != "") {
                    ""
                } else {
                    ("fui-badge__bg-" + _ctx.type)
                },
                if (_ctx.absolute) {
                    "fui-badge__absolute"
                } else {
                    ""
                },
                if (_ctx.scaleRatio != 1) {
                    "fui-badge__trans-origin"
                } else {
                    ""
                },
                if (_ctx.background == "" && _ctx.type == "white") {
                    "fui-badge__text-color"
                } else {
                    ""
                }
            )), "style" to _nS(_uM("top" to if (_ctx.absolute) {
                _ctx.top
            } else {
                "auto"
            }, "right" to if (_ctx.absolute) {
                _ctx.right
            } else {
                "auto"
            }, "transform" to ("scale(" + _ctx.scaleRatio + ")"), "marginTop" to ("" + _ctx.marginTop + "rpx"), "marginLeft" to ("" + _ctx.marginLeft + "rpx"), "marginRight" to ("" + _ctx.marginRight + "rpx"), "width" to _ctx.width, "color" to _ctx.color, "background" to _ctx.background)), "onClick" to _ctx.handleClick), _tD(if (_ctx.dot) {
                ""
            } else {
                _ctx.showValue
            }), 15, _uA(
                "onClick"
            ))
        } else {
            _cC("v-if", true)
        }
    }
    open var value: Any by `$props`
    open var max: Number by `$props`
    open var type: String by `$props`
    open var background: String by `$props`
    open var color: String by `$props`
    open var dot: Boolean by `$props`
    open var marginTop: Number by `$props`
    open var marginLeft: Number by `$props`
    open var marginRight: Number by `$props`
    open var absolute: Boolean by `$props`
    open var top: String by `$props`
    open var right: String by `$props`
    open var scaleRatio: Number by `$props`
    open var width: String by `$data`
    open var showValue: String by `$data`
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return _uM("width" to "0", "showValue" to "")
    }
    open var rpx2px = ::gen_rpx2px_fn
    open fun gen_rpx2px_fn(rpx: Number): Number {
        var px: Number
        px = UTSAndroid.rpx2px(rpx)
        return px
    }
    open var _getTextWidth = ::gen__getTextWidth_fn
    open fun gen__getTextWidth_fn(text: String): String {
        var sum: Number = 0
        run {
            var i: Number = 0
            var len = text.length
            while(i < len){
                val code = text.charCodeAt(i) as Number
                if (code <= 255) {
                    sum = sum + 1
                } else {
                    sum = sum + 2
                }
                i++
            }
        }
        val rpx = if (text.length > 1) {
            32
        } else {
            24
        }
         as Number
        val px = this.rpx2px(rpx)
        val strCode = text.charCodeAt(0) as Number
        var multiplier: Number = 12
        if (strCode >= 65 && strCode <= 90) {
            multiplier = 15
        }
        return "" + ((sum / 2 * multiplier) + px) + "px"
    }
    open var getWidth = ::gen_getWidth_fn
    open fun gen_getWidth_fn() {
        var max = this.max
        var value: String
        if (UTSAndroid.`typeof`(this.value) == "string") {
            value = this.value as String
        } else {
            if (UTSAndroid.`typeof`(this.value) == "number") {
                val val_num = this.value as Number
                if (max == -1) {
                    value = val_num.toString(10)
                } else {
                    value = if (val_num > max) {
                        "" + max + "+"
                    } else {
                        val_num.toString(10)
                    }
                }
            } else {
                if (max == -1) {
                    value = this.value.toString()
                } else {
                    value = if (parseFloat(this.value.toString()) > max) {
                        "" + max + "+"
                    } else {
                        "" + this.value
                    }
                }
            }
        }
        this.showValue = value
        this.width = if (this.dot) {
            "8px"
        } else {
            this._getTextWidth(value)
        }
    }
    open var handleClick = ::gen_handleClick_fn
    open fun gen_handleClick_fn() {
        this.`$emit`("onclick")
    }
    companion object {
        var name = "fui-badge"
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("fui-badge__wrap" to _pS(_uM("height" to "36rpx", "color" to "#FFFFFF", "fontSize" to "24rpx", "lineHeight" to "36rpx", "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "minWidth" to "36rpx", "boxSizing" to "border-box", "textAlign" to "center", "zIndex" to 10)), "fui-badge__dot" to _pS(_uM("!height" to 8, "!width" to 8, "borderTopLeftRadius" to 100, "borderTopRightRadius" to 100, "borderBottomRightRadius" to 100, "borderBottomLeftRadius" to 100, "zIndex" to 10)), "fui-badge__bg-primary" to _pS(_uM("!backgroundColor" to "#465CFF")), "fui-badge__bg-success" to _pS(_uM("!backgroundColor" to "#09BE4F")), "fui-badge__bg-warning" to _pS(_uM("!backgroundColor" to "#FFB703")), "fui-badge__bg-danger" to _pS(_uM("!backgroundColor" to "#FF2B2B")), "fui-badge__bg-purple" to _pS(_uM("!backgroundColor" to "#6831FF")), "fui-badge__bg-white" to _pS(_uM("!backgroundColor" to "#FFFFFF")), "fui-badge__text-color" to _pS(_uM("!color" to "#FF2B2B")), "fui-badge__trans-origin" to _pS(_uM("transformOrigin" to "center center")), "fui-badge__absolute" to _pS(_uM("position" to "absolute")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("onclick" to null)
        var props = _nP(_uM("value" to _uM("type" to _uA(
            "Object",
            "String",
            "Number"
        ), "default" to ""), "max" to _uM("type" to "Number", "default" to -1), "type" to _uM("type" to "String", "default" to "primary"), "background" to _uM("type" to "String", "default" to ""), "color" to _uM("type" to "String", "default" to "#FFFFFF"), "dot" to _uM("type" to "Boolean", "default" to false), "marginTop" to _uM("type" to "Number", "default" to 0), "marginLeft" to _uM("type" to "Number", "default" to 0), "marginRight" to _uM("type" to "Number", "default" to 0), "absolute" to _uM("type" to "Boolean", "default" to false), "top" to _uM("type" to "String", "default" to "-8rpx"), "right" to _uM("type" to "String", "default" to "-18rpx"), "scaleRatio" to _uM("type" to "Number", "default" to 1)))
        var propsNeedCastKeys = _uA(
            "value",
            "max",
            "type",
            "background",
            "color",
            "dot",
            "marginTop",
            "marginLeft",
            "marginRight",
            "absolute",
            "top",
            "right",
            "scaleRatio"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
