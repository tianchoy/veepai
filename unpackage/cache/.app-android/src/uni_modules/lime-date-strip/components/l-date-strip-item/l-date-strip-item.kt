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
open class GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem : VueComponent, DateStripItemProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var dates: UTSArray<DateStriPDay> by `$props`
    override var color: String? by `$props`
    override var activeBgColor: String? by `$props`
    override var activeColor: String? by `$props`
    override var bgColor: String? by `$props`
    override var radius: String? by `$props`
    override var gridWidth: String? by `$props`
    override var switchMode: String by `$props`
    override var shape: String by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeDateStripComponentsLDateStripItemLDateStripItem
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.gridWidth != null && props.switchMode == "none") {
                    style.set("width", props.gridWidth!!)
                }
                return style
            }
            )
            val onClick = fun(day: DateStriPDay){
                console.log(day, " at uni_modules/lime-date-strip/components/l-date-strip-item/l-date-strip-item.uvue:88")
                emit("click", day)
            }
            return fun(): Any? {
                return _cE("view", _uM("class" to _nC(_uA(
                    "l-date-strip__item",
                    "l-date-strip__item--" + _ctx.switchMode
                ))), _uA(
                    _cE(Fragment, null, RenderHelpers.renderList(_ctx.dates, fun(item, __key, __index, _cached): Any {
                        return _cE("view", _uM("class" to _nC(_uA(
                            "l-date-strip__grid",
                            _uA(
                                "l-date-strip__grid--" + _ctx.shape,
                                _uM("l-date-strip__grid--active-bg" to (_ctx.shape == "square" && item.type == "selected"), "l-date-strip__grid--selected" to (item.type == "selected"))
                            )
                        )), "style" to _nS(_uA(
                            unref(styles),
                            if (item.type == "selected" && _ctx.shape == "square" && _ctx.activeBgColor != null) {
                                _uM("background" to _ctx.activeBgColor)
                            } else {
                                _uM<String, Any?>()
                            }
                            ,
                            if (_ctx.shape == "square" && _ctx.radius != null) {
                                _uM("border-radius" to _ctx.radius)
                            } else {
                                _uM<String, Any?>()
                            }
                        )), "onClick" to fun(){
                            onClick(item)
                        }
                        , "key" to item.key), _uA(
                            if (item.prefix != null) {
                                _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                    "l-date-strip__grid-prefix",
                                    _uM("l-date-strip__grid--active-text" to (item.type == "selected" && _ctx.shape == "square"), "l-date-strip__grid--active-text-none" to (item.type == "selected" && _ctx.shape == "none"))
                                )), "style" to _nS(_uA(
                                    if (item.type == "selected" && _ctx.activeColor != null) {
                                        _uM("color" to _ctx.activeColor)
                                    } else {
                                        _uM<String, Any?>()
                                    }
                                ))), _tD(item.prefix), 7)
                            } else {
                                _cC("v-if", true)
                            }
                            ,
                            _cE("view", _uM("class" to _nC(_uA(
                                "l-date-strip__grid-info",
                                _uM("l-date-strip__grid--active-bg" to (_ctx.shape == "circle" && item.type == "selected"))
                            )), "style" to _nS(_uA(
                                if (item.type == "selected" && _ctx.shape == "circle" && _ctx.activeBgColor != null) {
                                    _uM("background" to _ctx.activeBgColor)
                                } else {
                                    _uM<String, Any?>()
                                }
                                ,
                                if (_ctx.shape == "square" && _ctx.radius != null) {
                                    _uM("border-radius" to _ctx.radius)
                                } else {
                                    _uM<String, Any?>()
                                }
                            ))), _uA(
                                _cE("text", _uM("class" to _nC(_uA(
                                    "l-date-strip__grid-day",
                                    _uM("l-date-strip__grid--active-text" to (item.type == "selected" && _ctx.shape != "none"), "l-date-strip__grid--active-text-none" to (item.type == "selected" && _ctx.shape == "none"))
                                )), "style" to _nS(_uA(
                                    if (item.type == "selected" && _ctx.activeColor != null) {
                                        _uM("color" to _ctx.activeColor)
                                    } else {
                                        _uM<String, Any?>()
                                    }
                                ))), _tD(item.text), 7),
                                _cE("view", null, _uA(
                                    if (item.suffix == "true") {
                                        _cE("view", _uM("key" to 0), _uA(
                                            _cE("image", _uM("style" to _nS(_uM("width" to "16rpx", "height" to "16rpx")), "src" to default1), null, 4)
                                        ))
                                    } else {
                                        _cE("view", _uM("key" to 1), _uA(
                                            _cE("text", _uM("style" to _nS(_uM("width" to "16rpx", "height" to "16rpx"))), null, 4)
                                        ))
                                    }
                                ))
                            ), 6)
                        ), 14, _uA(
                            "onClick"
                        ))
                    }
                    ), 128)
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-date-strip" to _pS(_uM("height" to 86, "backgroundColor" to "#ffffff")), "l-date-strip__scroll" to _pS(_uM("flexDirection" to "row")), "l-date-strip__item" to _pS(_uM("display" to "flex", "flexDirection" to "row", "paddingTop" to 8, "paddingRight" to 0, "paddingBottom" to 8, "paddingLeft" to 0, "boxSizing" to "border-box")), "l-date-strip__item--week" to _pS(_uM("flex" to 1)), "l-date-strip__grid" to _uM(".l-date-strip__item--week " to _uM("flex" to 1), ".l-date-strip__item--none " to _uM("width" to 50), "" to _uM("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "4rpx", "marginBottom" to 0, "marginLeft" to "4rpx", "transitionDuration" to "300ms", "transitionProperty" to "backgroundColor,color", "transitionTimingFunction" to "linear")), "l-date-strip__grid-prefix" to _uM("" to _uM("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "fontSize" to 14, "color" to "rgba(0,0,0,0.45)"), ".l-date-strip__grid--none " to _uM("paddingBottom" to 4, "paddingTop" to 4), ".l-date-strip__grid--circle " to _uM("paddingBottom" to 4)), "l-date-strip__grid-day" to _pS(_uM("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "fontSize" to 16, "color" to "rgba(0,0,0,0.88)", "fontWeight" to "bold")), "l-date-strip__grid-suffix" to _pS(_uM("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "position" to "absolute", "top" to "50%", "transform" to "translateY(60%)", "fontSize" to 12, "color" to "rgba(0,0,0,0.65)")), "l-date-strip__grid-info" to _uM(".l-date-strip__grid--circle " to _uM("borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99), "" to _uM("display" to "flex", "flex" to 1, "justifyContent" to "center", "alignItems" to "center", "position" to "relative")), "l-date-strip__grid--square" to _pS(_uM("borderTopLeftRadius" to 5, "borderTopRightRadius" to 5, "borderBottomRightRadius" to 5, "borderBottomLeftRadius" to 5, "paddingTop" to 6, "paddingRight" to 0, "paddingBottom" to 6, "paddingLeft" to 0)), "l-date-strip__grid--active-bg" to _pS(_uM("backgroundColor" to "#3283ff")), "l-date-strip__grid--active-text" to _pS(_uM("color" to "#FFFFFF")), "l-date-strip__grid--active-text-none" to _pS(_uM("color" to "#3283ff")), "l-date-strip__grid--disabled" to _pS(_uM("opacity" to 0.4)), "@TRANSITION" to _uM("l-date-strip__grid" to _uM("duration" to "300ms", "property" to "backgroundColor,color", "timingFunction" to "linear"), "l-date-strip__grid-prefix" to _uM("duration" to "200ms", "property" to "color", "timingFunction" to "linear"), "l-date-strip__grid-day" to _uM("duration" to "200ms", "property" to "color", "timingFunction" to "linear"), "l-date-strip__grid-suffix" to _uM("duration" to "200ms", "property" to "color", "timingFunction" to "linear")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null)
        var props = _nP(_uM("dates" to _uM("type" to "Array", "required" to true, "default" to _uA<DateStriPDay>()), "color" to _uM("type" to "String", "required" to false), "activeBgColor" to _uM("type" to "String", "required" to false), "activeColor" to _uM("type" to "String", "required" to false), "bgColor" to _uM("type" to "String", "required" to false), "radius" to _uM("type" to "String", "required" to false), "gridWidth" to _uM("type" to "String", "required" to false), "switchMode" to _uM("type" to "String", "required" to true, "default" to "week"), "shape" to _uM("type" to "String", "required" to true, "default" to "square")))
        var propsNeedCastKeys = _uA(
            "dates",
            "switchMode",
            "shape"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
