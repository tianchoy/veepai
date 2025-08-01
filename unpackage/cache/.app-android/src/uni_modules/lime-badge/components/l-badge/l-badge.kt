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
open class GenUniModulesLimeBadgeComponentsLBadgeLBadge : VueComponent, BadgeProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var color: String? by `$props`
    override var content: Any? by `$props`
    override var dot: Boolean by `$props`
    override var max: Number by `$props`
    override var offset: UTSArray<Any> by `$props`
    override var position: String by `$props`
    override var shape: String? by `$props`
    override var showZero: Boolean by `$props`
    override var size: String? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeBadgeComponentsLBadgeLBadge) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeBadgeComponentsLBadgeLBadge
            val _cache = __ins.renderCache
            val name = "l-badge"
            val props = __props
            val context = getCurrentInstance()!!
            val classes = computed(fun(): Map<String, Boolean> {
                val cls = Map<String, Boolean>()
                cls.set("" + name + "--fixed", toBoolean1(context.slots["default"]))
                cls.set("" + name + "--dot", props.dot)
                cls.set("" + name + "--" + props.position, context.slots["default"] != null)
                return cls
            }
            )
            val styles = computed(fun(): Map<String, Any?> {
                val style = Map<String, Any?>()
                if (toBoolean1(props.color)) {
                    style.set("background", props.color!!)
                }
                val positions = props.position.split("-")
                val offset = props.offset
                if (offset.length == 2) {
                    val x = offset[0]
                    val y = offset[1]
                    if (context.slots["default"] != null) {
                        if (positions.length == 2) {
                            val offsetY = positions[0]
                            val offsetX = positions[1]
                            if (isNumber(y)) {
                                val _y = y as Number
                                style.set(offsetY, addUnit(if (offsetY == "top") {
                                    _y
                                } else {
                                    -_y
                                }))
                            } else {
                                style.set(offsetY, if (offsetY == "top") {
                                    addUnit(y)
                                } else {
                                    getOffsetWithMinusString("" + y)
                                }
                                )
                            }
                            if (isNumber(x)) {
                                val _x = x as Number
                                style.set(offsetX, addUnit(if (offsetX == "left") {
                                    _x
                                } else {
                                    -_x
                                }))
                            } else {
                                style.set(offsetY, if (offsetY == "left") {
                                    addUnit(x)
                                } else {
                                    getOffsetWithMinusString("" + x)
                                }
                                )
                            }
                        }
                    } else {
                        style.set("margin-top", addUnit(y))
                        style.set("margin-left", addUnit(x))
                    }
                }
                return style
            }
            )
            val hasContent = computed<Boolean>(fun(): Boolean {
                if (toBoolean1(context.slots["content"])) {
                    return true
                }
                val content = props.content
                return (content != "" && content != null && (props.showZero || content !== "0"))
            }
            )
            val renderContent = computed<String>(fun(): String {
                val dot = props.dot
                val max = props.max
                val content = props.content
                if (!dot && hasContent.value) {
                    if (max != 0 && isNumeric(content) && parseFloat(content.toString()) > max) {
                        return "" + max + "+"
                    }
                }
                if (dot) {
                    return ""
                }
                return "" + (content ?: "")
            }
            )
            val textRef = ref<UniTextElement?>(null)
            val offscreenRef = ref<UniTextElement?>(null)
            val resizeObserver = UniResizeObserver(fun(entries: UTSArray<UniResizeObserverEntry>){
                val width = entries[0].target.getBoundingClientRect().width
                textRef.value!!.style.setProperty("width", width * 1.05)
            }
            )
            val stopWatch = watch(offscreenRef, fun(el: UniElement?){
                if (el == null) {
                    return
                }
                resizeObserver.observe(el)
            }
            )
            onUnmounted(fun(){
                stopWatch()
                resizeObserver.disconnect()
            }
            )
            return fun(): Any? {
                return if (_ctx.`$slots`["default"] != null) {
                    _cE("view", _uM("key" to 0, "class" to "l-badge__wrapper"), _uA(
                        renderSlot(_ctx.`$slots`, "default"),
                        if (isTrue(unref(hasContent) || _ctx.dot)) {
                            _cE("text", _uM("key" to 0, "class" to _nC(_uA(
                                "l-badge",
                                unref(classes)
                            )), "ref_key" to "textRef", "ref" to textRef, "style" to _nS(_uA(
                                unref(styles)
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "content", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(unref(renderContent))
                                    )
                                })
                            ), 6)
                        } else {
                            _cC("v-if", true)
                        },
                        if (isTrue(unref(hasContent) || _ctx.dot)) {
                            _cE("text", _uM("key" to 1, "class" to _nC(_uA(
                                "l-badge l-badge--offscreen",
                                unref(classes)
                            )), "ref_key" to "offscreenRef", "ref" to offscreenRef, "style" to _nS(_uA(
                                unref(styles)
                            ))), _uA(
                                renderSlot(_ctx.`$slots`, "content", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _tD(unref(renderContent))
                                    )
                                })
                            ), 6)
                        } else {
                            _cC("v-if", true)
                        }
                    ))
                } else {
                    if (isTrue(unref(hasContent) || _ctx.dot)) {
                        _cE("text", _uM("key" to 1, "class" to _nC(_uA(
                            "l-badge",
                            unref(classes)
                        )), "style" to _nS(_uA(
                            unref(styles)
                        ))), _uA(
                            renderSlot(_ctx.`$slots`, "content", UTSJSONObject(), fun(): UTSArray<Any> {
                                return _uA(
                                    _tD(unref(renderContent))
                                )
                            })
                        ), 6)
                    } else {
                        _cC("v-if", true)
                    }
                }
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("l-badge" to _pS(_uM("boxSizing" to "border-box", "paddingTop" to 0, "paddingRight" to "8rpx", "paddingBottom" to 0, "paddingLeft" to "8rpx", "color" to "#FFFFFF", "fontWeight" to "bold", "fontSize" to 12, "fontFamily" to "-apple-system-font, helvetica neue, arial, sans-serif", "lineHeight" to 1.2, "textAlign" to "center", "backgroundColor" to "#FF4D4F", "borderTopWidth" to "1rpx", "borderRightWidth" to "1rpx", "borderBottomWidth" to "1rpx", "borderLeftWidth" to "1rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#FFFFFF", "borderRightColor" to "#FFFFFF", "borderBottomColor" to "#FFFFFF", "borderLeftColor" to "#FFFFFF", "borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999, "overflow" to "visible")), "l-badge--fixed" to _uM("" to _uM("position" to "absolute", "transformOrigin" to "100%"), ".l-badge--offscreen" to _uM("position" to "fixed", "opacity" to 0, "top" to -10000000000)), "l-badge--top-left" to _pS(_uM("top" to 0, "left" to 0, "transform" to "translate(-50%, -50%)")), "l-badge--top-right" to _pS(_uM("top" to 0, "right" to 0, "transform" to "translate(50%, -50%)")), "l-badge--bottom-left" to _pS(_uM("bottom" to 0, "left" to 0, "transform" to "translate(-50%, 50%)")), "l-badge--bottom-right" to _pS(_uM("bottom" to 0, "right" to 0, "transform" to "translate(50%, 50%)")), "l-badge--dot" to _pS(_uM("width" to "16rpx", "minWidth" to 0, "height" to "16rpx", "backgroundImage" to "none", "backgroundColor" to "#FF4D4F", "borderTopLeftRadius" to 99, "borderTopRightRadius" to 99, "borderBottomRightRadius" to 99, "borderBottomLeftRadius" to 99, "borderTopWidth" to 0, "borderRightWidth" to 0, "borderBottomWidth" to 0, "borderLeftWidth" to 0, "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "overflow" to "visible")), "l-badge__wrapper" to _pS(_uM("position" to "relative", "overflow" to "visible")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM("color" to _uM("type" to "String", "required" to false), "content" to _uM("required" to false), "dot" to _uM("type" to "Boolean", "required" to true, "default" to false), "max" to _uM("type" to "Number", "required" to true, "default" to 99), "offset" to _uM("type" to "Array", "required" to true, "default" to _uA<Any>()), "position" to _uM("type" to "String", "required" to true, "default" to "top-right"), "shape" to _uM("type" to "String", "required" to false), "showZero" to _uM("type" to "Boolean", "required" to true, "default" to false), "size" to _uM("type" to "String", "required" to false)))
        var propsNeedCastKeys = _uA(
            "dot",
            "max",
            "offset",
            "position",
            "showZero"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
