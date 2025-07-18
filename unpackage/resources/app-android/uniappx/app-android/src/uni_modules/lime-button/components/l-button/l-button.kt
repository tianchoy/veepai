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
open class GenUniModulesLimeButtonComponentsLButtonLButton : VueComponent, ButtonProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var ariaLabel: String? by `$props`
    override var lId: String? by `$props`
    override var content: String? by `$props`
    override var block: Boolean by `$props`
    override var disabled: Boolean by `$props`
    override var ghost: Boolean by `$props`
    override var icon: String? by `$props`
    override var iconSize: String? by `$props`
    override var loading: Boolean by `$props`
    override var loadingProps: UTSJSONObject? by `$props`
    override var shape: String by `$props`
    override var size: String by `$props`
    override var suffix: String? by `$props`
    override var type: String by `$props`
    override var variant: String? by `$props`
    override var radius: String? by `$props`
    override var fontSize: String? by `$props`
    override var textColor: String? by `$props`
    override var color: String? by `$props`
    override var lStyle: String? by `$props`
    override var gap: String? by `$props`
    override var formType: String? by `$props`
    override var openType: String? by `$props`
    override var hoverClass: String? by `$props`
    override var hoverStopPropagation: Boolean by `$props`
    override var hoverStartTime: Number by `$props`
    override var hoverStayTime: Number by `$props`
    override var lang: String by `$props`
    override var sessionFrom: String by `$props`
    override var sendMessageTitle: String by `$props`
    override var sendMessagePath: String by `$props`
    override var sendMessageImg: String by `$props`
    override var appParameter: String by `$props`
    override var showMessageCard: Boolean by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeButtonComponentsLButtonLButton) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeButtonComponentsLButtonLButton
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val instance = getCurrentInstance()
            val buttonTextRef = ref<UniTextElement?>(null)
            val hasContent = computed(fun(): Boolean {
                return props.content != null || instance?.proxy?.`$slots`?.get("default") != null
            }
            )
            val variant = computed(fun(): String {
                return props.variant ?: (if (props.color != null) {
                    "solid"
                } else {
                    if (props.type == "default") {
                        "outline"
                    } else {
                        "solid"
                    }
                }
                )
            }
            )
            val classes = computed(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                val name = "l-button"
                cls.set("" + name + "--" + props.size, true)
                cls.set("" + name + "--" + props.type, true)
                cls.set("" + name + "--" + variant.value, true)
                cls.set("" + name + "--" + props.shape, true)
                cls.set("" + name + "--disabled", props.disabled)
                cls.set("" + name + "--loading", props.loading)
                cls.set("" + name + "--ghost", props.ghost)
                cls.set("" + name + "--block", props.block)
                return cls
            }
            )
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.radius != null) {
                    style.set("border-radius", props.radius!!)
                }
                if (props.color != null) {
                    if (variant.value == "solid") {
                        style.set("background", props.color!!)
                    } else if (_uA(
                        "outline",
                        "dashed"
                    ).includes(variant.value)) {
                        style.set("border-color", props.color!!)
                    }
                }
                return style
            }
            )
            val sizes = Map<String, String>(_uA(
                _uA(
                    "mini",
                    "16px"
                ),
                _uA(
                    "small",
                    "18px"
                ),
                _uA(
                    "medium",
                    "18px"
                ),
                _uA(
                    "large",
                    "24px"
                )
            ))
            val innerIconSize = computed(fun(): String? {
                return props.iconSize ?: props.fontSize ?: sizes.get(props.size)
            }
            )
            val colors = Map<String, String>(_uA())
            val loadingColor = computed(fun(): String? {
                return props.textColor ?: (if (variant.value == "solid") {
                    "white"
                } else {
                    buttonTextRef.value?.style?.getPropertyValue("color") as String?
                }
                ) ?: ""
            }
            )
            val gapClass = computed(fun(): String {
                return if (props.loading || props.icon != null) {
                    "gap"
                } else {
                    ""
                }
            }
            )
            val contentStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.gap != null && (props.loading || props.icon != null)) {
                    style.set("margin-left", props.gap!!)
                }
                if (props.textColor != null || props.color != null && variant.value != "solid") {
                    style.set("color", (props.textColor ?: props.color)!!)
                }
                if (props.fontSize != null) {
                    style.set("font-size", props.fontSize!!)
                }
                return style
            }
            )
            val agreeprivacyauthorization = fun(e: UniEvent){
                emit("agreeprivacyauthorization", e)
            }
            val handleTap = fun(e: UniPointerEvent){
                if (props.disabled || props.loading) {
                    return
                }
                emit("click", e)
            }
            return fun(): Any? {
                val _component_l_loading = resolveEasyComponent("l-loading", GenUniModulesLimeLoadingComponentsLLoadingLLoadingClass)
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                return _cE("view", _uM("class" to _nC(_uA(
                    "l-button",
                    unref(classes)
                )), "ref" to "rootRef", "hover-class" to if (_ctx.disabled || _ctx.loading || _ctx.color != null) {
                    ""
                } else {
                    _ctx.hoverClass ?: "hover"
                }
                , "style" to _nS(_uA(
                    unref(styles),
                    _ctx.lStyle
                )), "hover-start-time" to _ctx.hoverStartTime, "hover-stay-time" to _ctx.hoverStayTime, "data-disabled" to (_ctx.disabled || _ctx.loading), "onClick" to withModifiers(handleTap, _uA(
                    "stop"
                ))), _uA(
                    if (isTrue(_ctx.loading)) {
                        _cV(_component_l_loading, _uM("key" to 0, "class" to "l-button__loading", "color" to unref(loadingColor)), null, 8, _uA(
                            "color"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.icon)) {
                        _cV(_component_l_icon, _uM("key" to 1, "class" to "l-button__icon", "size" to unref(innerIconSize), "color" to unref(loadingColor), "name" to _ctx.icon), null, 8, _uA(
                            "size",
                            "color",
                            "name"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                    ,
                    _cE("text", _uM("class" to _nC(_uA(
                        "l-button__content",
                        unref(gapClass)
                    )), "ref_key" to "buttonTextRef", "ref" to buttonTextRef, "style" to _nS(_uA(
                        unref(contentStyle)
                    ))), _uA(
                        renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                            return _uA(
                                _tD(_ctx.content)
                            )
                        }
                        )
                    ), 6),
                    if (isTrue(_ctx.formType != null || _ctx.openType != null)) {
                        _cE("button", _uM("key" to 2, "class" to "l-button__button", "hover-class" to "none", "onAgreeprivacyauthorization" to agreeprivacyauthorization, "disabled" to (_ctx.disabled || _ctx.loading), "form-type" to if (_ctx.disabled || _ctx.loading) {
                            ""
                        } else {
                            _ctx.formType
                        }, "open-type" to if (_ctx.disabled || _ctx.loading) {
                            ""
                        } else {
                            _ctx.openType
                        }), null, 40, _uA(
                            "disabled",
                            "form-type",
                            "open-type"
                        ))
                    } else {
                        _cC("v-if", true)
                    }
                ), 14, _uA(
                    "hover-class",
                    "hover-start-time",
                    "hover-stay-time",
                    "data-disabled"
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
                return _uM("l-button--mini" to _uM("" to _uM("paddingTop" to 0, "paddingRight" to "16rpx", "paddingBottom" to 0, "paddingLeft" to "16rpx", "height" to "56rpx"), ".l-button--square" to _uM("width" to "56rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to _uM("width" to "56rpx", "paddingLeft" to 0, "paddingRight" to 0)), "l-button__content" to _uM(".l-button--mini " to _uM("fontSize" to 12), ".l-button--small " to _uM("fontSize" to 14), ".l-button--medium " to _uM("fontSize" to 16), ".l-button--large " to _uM("fontSize" to 16), ".l-button--default " to _uM("color" to "rgba(0,0,0,0.88)"), ".l-button--primary " to _uM("color" to "#3283ff"), ".l-button--danger " to _uM("color" to "#FF4D4F"), ".l-button--info " to _uM("color" to "#3283ff"), ".l-button--warning " to _uM("color" to "#ffb400"), ".l-button--success " to _uM("color" to "#34c471"), ".l-button--solid " to _uM("color" to "#FFFFFF")), "l-button--small" to _uM("" to _uM("paddingTop" to 0, "paddingRight" to "24rpx", "paddingBottom" to 0, "paddingLeft" to "24rpx", "height" to "64rpx"), ".l-button--square" to _uM("width" to "64rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to _uM("width" to "64rpx", "paddingLeft" to 0, "paddingRight" to 0)), "l-button--medium" to _uM("" to _uM("paddingTop" to 0, "paddingRight" to "32rpx", "paddingBottom" to 0, "paddingLeft" to "32rpx", "height" to "80rpx"), ".l-button--square" to _uM("width" to "80rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to _uM("width" to "80rpx", "paddingLeft" to 0, "paddingRight" to 0)), "l-button--large" to _uM("" to _uM("paddingTop" to 0, "paddingRight" to "48rpx", "paddingBottom" to 0, "paddingLeft" to "48rpx", "height" to "96rpx"), ".l-button--square" to _uM("width" to "96rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to _uM("width" to "96rpx", "paddingLeft" to 0, "paddingRight" to 0)), "hover" to _uM(".l-button--default" to _uM("backgroundColor" to "#eeeeee"), ".l-button--default.l-button--solid" to _uM("backgroundColor" to "#000000"), ".l-button--default.l-button--light" to _uM("backgroundColor" to "#e7e7e7"), ".l-button--primary" to _uM("backgroundColor" to "#F0F8FF"), ".l-button--primary.l-button--solid" to _uM("backgroundColor" to "#2164d9"), ".l-button--primary.l-button--light" to _uM("backgroundColor" to "#d6ecff"), ".l-button--danger" to _uM("backgroundColor" to "#fff2f0"), ".l-button--danger.l-button--solid" to _uM("backgroundColor" to "#d9363e"), ".l-button--danger.l-button--light" to _uM("backgroundColor" to "#ffccc7"), ".l-button--info" to _uM("backgroundColor" to "#d6ecff"), ".l-button--info.l-button--solid" to _uM("backgroundColor" to "#2164d9"), ".l-button--info.l-button--light" to _uM("backgroundColor" to "#add6ff"), ".l-button--warning" to _uM("backgroundColor" to "#fffce6"), ".l-button--warning.l-button--solid" to _uM("backgroundColor" to "#d99100"), ".l-button--warning.l-button--light" to _uM("backgroundColor" to "#fff0a3"), ".l-button--success" to _uM("backgroundColor" to "#f0fff4"), ".l-button--success.l-button--solid" to _uM("backgroundColor" to "#239e5a"), ".l-button--success.l-button--light" to _uM("backgroundColor" to "#e1f7e7")), "l-button--default" to _uM(".l-button--solid" to _uM("backgroundColor" to "rgba(0,0,0,0.88)"), ".l-button--outline" to _uM("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-button--dashed" to _uM("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-button--light" to _uM("backgroundColor" to "#eeeeee"), ".l-button--ghost" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5")), "l-button--primary" to _uM(".l-button--solid" to _uM("backgroundColor" to "#3283ff"), ".l-button--outline" to _uM("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--dashed" to _uM("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--light" to _uM("backgroundColor" to "#F0F8FF"), ".l-button--ghost" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff")), "l-button--danger" to _uM(".l-button--solid" to _uM("backgroundColor" to "#FF4D4F"), ".l-button--outline" to _uM("borderTopColor" to "#FF4D4F", "borderRightColor" to "#FF4D4F", "borderBottomColor" to "#FF4D4F", "borderLeftColor" to "#FF4D4F"), ".l-button--dashed" to _uM("borderTopColor" to "#FF4D4F", "borderRightColor" to "#FF4D4F", "borderBottomColor" to "#FF4D4F", "borderLeftColor" to "#FF4D4F"), ".l-button--light" to _uM("backgroundColor" to "#fff2f0"), ".l-button--ghost" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#FF4D4F", "borderRightColor" to "#FF4D4F", "borderBottomColor" to "#FF4D4F", "borderLeftColor" to "#FF4D4F")), "l-button--info" to _uM(".l-button--solid" to _uM("backgroundColor" to "#3283ff"), ".l-button--outline" to _uM("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--dashed" to _uM("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--light" to _uM("backgroundColor" to "#d6ecff"), ".l-button--ghost" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff")), "l-button--warning" to _uM(".l-button--solid" to _uM("backgroundColor" to "#ffb400"), ".l-button--outline" to _uM("borderTopColor" to "#ffb400", "borderRightColor" to "#ffb400", "borderBottomColor" to "#ffb400", "borderLeftColor" to "#ffb400"), ".l-button--dashed" to _uM("borderTopColor" to "#ffb400", "borderRightColor" to "#ffb400", "borderBottomColor" to "#ffb400", "borderLeftColor" to "#ffb400"), ".l-button--light" to _uM("backgroundColor" to "#fffce6"), ".l-button--ghost" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#ffb400", "borderRightColor" to "#ffb400", "borderBottomColor" to "#ffb400", "borderLeftColor" to "#ffb400")), "l-button--success" to _uM(".l-button--solid" to _uM("backgroundColor" to "#34c471"), ".l-button--outline" to _uM("borderTopColor" to "#34c471", "borderRightColor" to "#34c471", "borderBottomColor" to "#34c471", "borderLeftColor" to "#34c471"), ".l-button--dashed" to _uM("borderTopColor" to "#34c471", "borderRightColor" to "#34c471", "borderBottomColor" to "#34c471", "borderLeftColor" to "#34c471"), ".l-button--light" to _uM("backgroundColor" to "#f0fff4"), ".l-button--ghost" to _uM("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#34c471", "borderRightColor" to "#34c471", "borderBottomColor" to "#34c471", "borderLeftColor" to "#34c471")), "l-button" to _uM("" to _uM("opacity" to 1, "position" to "relative", "alignItems" to "center", "justifyContent" to "center", "flexDirection" to "row", "transitionDuration" to "200ms", "transitionProperty" to "backgroundColor,opacity,borderColor,width,height", "borderTopLeftRadius" to "6rpx", "borderTopRightRadius" to "6rpx", "borderBottomRightRadius" to "6rpx", "borderBottomLeftRadius" to "6rpx"), ".l-button--disabled" to _uM("opacity" to 0.6)), "l-button__button" to _pS(_uM("position" to "absolute", "left" to 0, "right" to 0, "top" to 0, "bottom" to 0, "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundColor" to "rgba(0,0,0,0)")), "l-button--block" to _pS(_uM("width" to "100%", "alignSelf" to "auto")), "l-button__icon" to _uM(".l-button--solid " to _uM("color" to "#FFFFFF"), "" to _uM("alignSelf" to "center")), "l-button--outline" to _pS(_uM("borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopWidth" to 0.71, "borderRightWidth" to 0.71, "borderBottomWidth" to 0.71, "borderLeftWidth" to 0.71)), "l-button--dashed" to _pS(_uM("borderTopStyle" to "dashed", "borderRightStyle" to "dashed", "borderBottomStyle" to "dashed", "borderLeftStyle" to "dashed", "borderTopWidth" to 0.71, "borderRightWidth" to 0.71, "borderBottomWidth" to 0.71, "borderLeftWidth" to 0.71)), "l-button__loading" to _pS(_uM("alignSelf" to "center")), "l-button--round" to _pS(_uM("borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999)), "l-button--circle" to _pS(_uM("borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999)), "gap" to _uM(".l-button " to _uM("marginLeft" to 4)), "@TRANSITION" to _uM("l-button" to _uM("duration" to "200ms", "property" to "backgroundColor,opacity,borderColor,width,height")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null, "agreeprivacyauthorization" to null, "chooseavatar" to null, "getuserinfo" to null, "contact" to null, "getphonenumber" to null, "error" to null, "opensetting" to null, "launchapp" to null)
        var props = _nP(_uM("ariaLabel" to _uM("type" to "String", "required" to false), "lId" to _uM("type" to "String", "required" to false), "content" to _uM("type" to "String", "required" to false), "block" to _uM("type" to "Boolean", "required" to true, "default" to false), "disabled" to _uM("type" to "Boolean", "required" to true, "default" to false), "ghost" to _uM("type" to "Boolean", "required" to true, "default" to false), "icon" to _uM("type" to "String", "required" to false), "iconSize" to _uM("type" to "String", "required" to false), "loading" to _uM("type" to "Boolean", "required" to true, "default" to false), "loadingProps" to _uM("type" to "UTSJSONObject", "required" to false), "shape" to _uM("type" to "String", "required" to true, "default" to "rectangle"), "size" to _uM("type" to "String", "required" to true, "default" to "medium"), "suffix" to _uM("type" to "String", "required" to false), "type" to _uM("type" to "String", "required" to true, "default" to "default"), "variant" to _uM("type" to "String", "required" to false), "radius" to _uM("type" to "String", "required" to false), "fontSize" to _uM("type" to "String", "required" to false), "textColor" to _uM("type" to "String", "required" to false), "color" to _uM("type" to "String", "required" to false), "lStyle" to _uM("type" to "String", "required" to false), "gap" to _uM("type" to "String", "required" to false), "formType" to _uM("type" to "String", "required" to false), "openType" to _uM("type" to "String", "required" to false), "hoverClass" to _uM("type" to "String", "required" to false), "hoverStopPropagation" to _uM("type" to "Boolean", "required" to true, "default" to false), "hoverStartTime" to _uM("type" to "Number", "required" to true, "default" to 20), "hoverStayTime" to _uM("type" to "Number", "required" to true, "default" to 70), "lang" to _uM("type" to "String", "required" to true, "default" to "en"), "sessionFrom" to _uM("type" to "String", "required" to true, "default" to ""), "sendMessageTitle" to _uM("type" to "String", "required" to true, "default" to ""), "sendMessagePath" to _uM("type" to "String", "required" to true, "default" to ""), "sendMessageImg" to _uM("type" to "String", "required" to true, "default" to ""), "appParameter" to _uM("type" to "String", "required" to true, "default" to ""), "showMessageCard" to _uM("type" to "Boolean", "required" to true, "default" to false)))
        var propsNeedCastKeys = _uA(
            "block",
            "disabled",
            "ghost",
            "loading",
            "shape",
            "size",
            "type",
            "hoverStopPropagation",
            "hoverStartTime",
            "hoverStayTime",
            "lang",
            "sessionFrom",
            "sendMessageTitle",
            "sendMessagePath",
            "sendMessageImg",
            "appParameter",
            "showMessageCard"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
