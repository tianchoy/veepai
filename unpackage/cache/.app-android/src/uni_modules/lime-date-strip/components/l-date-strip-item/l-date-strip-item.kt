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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
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
                return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                    "l-date-strip__item",
                    "l-date-strip__item--" + _ctx.switchMode
                ))), utsArrayOf(
                    createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.dates, fun(item, __key, __index, _cached): Any {
                        return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                            "l-date-strip__grid",
                            utsArrayOf(
                                "l-date-strip__grid--" + _ctx.shape,
                                utsMapOf("l-date-strip__grid--active-bg" to (_ctx.shape == "square" && item.type == "selected"), "l-date-strip__grid--selected" to (item.type == "selected"))
                            )
                        )), "style" to normalizeStyle(utsArrayOf(
                            unref(styles),
                            if (item.type == "selected" && _ctx.shape == "square" && _ctx.activeBgColor != null) {
                                utsMapOf("background" to _ctx.activeBgColor)
                            } else {
                                utsMapOf<String, Any?>()
                            }
                            ,
                            if (_ctx.shape == "square" && _ctx.radius != null) {
                                utsMapOf("border-radius" to _ctx.radius)
                            } else {
                                utsMapOf<String, Any?>()
                            }
                        )), "onClick" to fun(){
                            onClick(item)
                        }
                        , "key" to item.key), utsArrayOf(
                            if (item.prefix != null) {
                                createElementVNode("text", utsMapOf("key" to 0, "class" to normalizeClass(utsArrayOf(
                                    "l-date-strip__grid-prefix",
                                    utsMapOf("l-date-strip__grid--active-text" to (item.type == "selected" && _ctx.shape == "square"), "l-date-strip__grid--active-text-none" to (item.type == "selected" && _ctx.shape == "none"))
                                )), "style" to normalizeStyle(utsArrayOf(
                                    if (item.type == "selected" && _ctx.activeColor != null) {
                                        utsMapOf("color" to _ctx.activeColor)
                                    } else {
                                        utsMapOf<String, Any?>()
                                    }
                                ))), toDisplayString(item.prefix), 7)
                            } else {
                                createCommentVNode("v-if", true)
                            }
                            ,
                            createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                                "l-date-strip__grid-info",
                                utsMapOf("l-date-strip__grid--active-bg" to (_ctx.shape == "circle" && item.type == "selected"))
                            )), "style" to normalizeStyle(utsArrayOf(
                                if (item.type == "selected" && _ctx.shape == "circle" && _ctx.activeBgColor != null) {
                                    utsMapOf("background" to _ctx.activeBgColor)
                                } else {
                                    utsMapOf<String, Any?>()
                                }
                                ,
                                if (_ctx.shape == "square" && _ctx.radius != null) {
                                    utsMapOf("border-radius" to _ctx.radius)
                                } else {
                                    utsMapOf<String, Any?>()
                                }
                            ))), utsArrayOf(
                                createElementVNode("text", utsMapOf("class" to normalizeClass(utsArrayOf(
                                    "l-date-strip__grid-day",
                                    utsMapOf("l-date-strip__grid--active-text" to (item.type == "selected" && _ctx.shape != "none"), "l-date-strip__grid--active-text-none" to (item.type == "selected" && _ctx.shape == "none"))
                                )), "style" to normalizeStyle(utsArrayOf(
                                    if (item.type == "selected" && _ctx.activeColor != null) {
                                        utsMapOf("color" to _ctx.activeColor)
                                    } else {
                                        utsMapOf<String, Any?>()
                                    }
                                ))), toDisplayString(item.text), 7),
                                createElementVNode("view", null, utsArrayOf(
                                    if (item.suffix == "true") {
                                        createElementVNode("view", utsMapOf("key" to 0), utsArrayOf(
                                            createElementVNode("image", utsMapOf("style" to normalizeStyle(utsMapOf("width" to "16rpx", "height" to "16rpx")), "src" to `default`), null, 4)
                                        ))
                                    } else {
                                        createElementVNode("view", utsMapOf("key" to 1), utsArrayOf(
                                            createElementVNode("text", utsMapOf("style" to normalizeStyle(utsMapOf("width" to "16rpx", "height" to "16rpx"))), null, 4)
                                        ))
                                    }
                                ))
                            ), 6)
                        ), 14, utsArrayOf(
                            "onClick"
                        ))
                    }
                    ), 128)
                ), 2)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-date-strip" to padStyleMapOf(utsMapOf("height" to 86, "backgroundColor" to "#ffffff")), "l-date-strip__scroll" to padStyleMapOf(utsMapOf("flexDirection" to "row")), "l-date-strip__item" to padStyleMapOf(utsMapOf("display" to "flex", "flexDirection" to "row", "paddingTop" to 8, "paddingRight" to 0, "paddingBottom" to 8, "paddingLeft" to 0, "boxSizing" to "border-box")), "l-date-strip__item--week" to padStyleMapOf(utsMapOf("flex" to 1)), "l-date-strip__grid" to utsMapOf(".l-date-strip__item--week " to utsMapOf("flex" to 1), ".l-date-strip__item--none " to utsMapOf("width" to 50), "" to utsMapOf("display" to "flex", "flexDirection" to "column", "marginTop" to 0, "marginRight" to "4rpx", "marginBottom" to 0, "marginLeft" to "4rpx", "transitionDuration" to "300ms", "transitionProperty" to "backgroundColor,color", "transitionTimingFunction" to "linear")), "l-date-strip__grid-prefix" to utsMapOf("" to utsMapOf("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "fontSize" to 14, "color" to "rgba(0,0,0,0.45)"), ".l-date-strip__grid--none " to utsMapOf("paddingBottom" to 4, "paddingTop" to 4), ".l-date-strip__grid--circle " to utsMapOf("paddingBottom" to 4)), "l-date-strip__grid-day" to padStyleMapOf(utsMapOf("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "fontSize" to 16, "color" to "rgba(0,0,0,0.88)", "fontWeight" to "bold")), "l-date-strip__grid-suffix" to padStyleMapOf(utsMapOf("textAlign" to "center", "transitionDuration" to "200ms", "transitionProperty" to "color", "transitionTimingFunction" to "linear", "position" to "absolute", "top" to "50%", "transform" to "translateY(60%)", "fontSize" to 12, "color" to "rgba(0,0,0,0.65)")), "l-date-strip__grid-info" to utsMapOf(".l-date-strip__grid--circle " to utsMapOf("borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99), "" to utsMapOf("display" to "flex", "flex" to 1, "justifyContent" to "center", "alignItems" to "center", "position" to "relative")), "l-date-strip__grid--square" to padStyleMapOf(utsMapOf("borderTopLeftRadius" to 5, "borderTopRightRadius" to 5, "borderBottomRightRadius" to 5, "borderBottomLeftRadius" to 5, "paddingTop" to 6, "paddingRight" to 0, "paddingBottom" to 6, "paddingLeft" to 0)), "l-date-strip__grid--active-bg" to padStyleMapOf(utsMapOf("backgroundColor" to "#3283ff")), "l-date-strip__grid--active-text" to padStyleMapOf(utsMapOf("color" to "#FFFFFF")), "l-date-strip__grid--active-text-none" to padStyleMapOf(utsMapOf("color" to "#3283ff")), "l-date-strip__grid--disabled" to padStyleMapOf(utsMapOf("opacity" to 0.4)), "@TRANSITION" to utsMapOf("l-date-strip__grid" to utsMapOf("duration" to "300ms", "property" to "backgroundColor,color", "timingFunction" to "linear"), "l-date-strip__grid-prefix" to utsMapOf("duration" to "200ms", "property" to "color", "timingFunction" to "linear"), "l-date-strip__grid-day" to utsMapOf("duration" to "200ms", "property" to "color", "timingFunction" to "linear"), "l-date-strip__grid-suffix" to utsMapOf("duration" to "200ms", "property" to "color", "timingFunction" to "linear")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("click" to null)
        var props = normalizePropsOptions(utsMapOf("dates" to utsMapOf("type" to "Array", "required" to true, "default" to utsArrayOf<DateStriPDay>()), "color" to utsMapOf("type" to "String", "required" to false), "activeBgColor" to utsMapOf("type" to "String", "required" to false), "activeColor" to utsMapOf("type" to "String", "required" to false), "bgColor" to utsMapOf("type" to "String", "required" to false), "radius" to utsMapOf("type" to "String", "required" to false), "gridWidth" to utsMapOf("type" to "String", "required" to false), "switchMode" to utsMapOf("type" to "String", "required" to true, "default" to "week"), "shape" to utsMapOf("type" to "String", "required" to true, "default" to "square")))
        var propsNeedCastKeys = utsArrayOf(
            "dates",
            "switchMode",
            "shape"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
