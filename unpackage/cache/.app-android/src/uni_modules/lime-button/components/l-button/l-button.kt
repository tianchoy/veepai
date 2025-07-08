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
                    } else if (utsArrayOf(
                        "outline",
                        "dashed"
                    ).includes(variant.value)) {
                        style.set("border-color", props.color!!)
                    }
                }
                return style
            }
            )
            val sizes = Map<String, String>(utsArrayOf(
                utsArrayOf(
                    "mini",
                    "16px"
                ),
                utsArrayOf(
                    "small",
                    "18px"
                ),
                utsArrayOf(
                    "medium",
                    "18px"
                ),
                utsArrayOf(
                    "large",
                    "24px"
                )
            ))
            val innerIconSize = computed(fun(): String? {
                return props.iconSize ?: props.fontSize ?: sizes.get(props.size)
            }
            )
            val colors = Map<String, String>(utsArrayOf())
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
                return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                    "l-button",
                    unref(classes)
                )), "ref" to "rootRef", "hover-class" to if (_ctx.disabled || _ctx.loading || _ctx.color != null) {
                    ""
                } else {
                    _ctx.hoverClass ?: "hover"
                }
                , "style" to normalizeStyle(utsArrayOf(
                    unref(styles),
                    _ctx.lStyle
                )), "hover-start-time" to _ctx.hoverStartTime, "hover-stay-time" to _ctx.hoverStayTime, "data-disabled" to (_ctx.disabled || _ctx.loading), "onClick" to withModifiers(handleTap, utsArrayOf(
                    "stop"
                ))), utsArrayOf(
                    if (isTrue(_ctx.loading)) {
                        createVNode(_component_l_loading, utsMapOf("key" to 0, "class" to "l-button__loading", "color" to unref(loadingColor)), null, 8, utsArrayOf(
                            "color"
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                    ,
                    if (isTrue(_ctx.icon)) {
                        createVNode(_component_l_icon, utsMapOf("key" to 1, "class" to "l-button__icon", "size" to unref(innerIconSize), "color" to unref(loadingColor), "name" to _ctx.icon), null, 8, utsArrayOf(
                            "size",
                            "color",
                            "name"
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                    ,
                    createElementVNode("text", utsMapOf("class" to normalizeClass(utsArrayOf(
                        "l-button__content",
                        unref(gapClass)
                    )), "ref_key" to "buttonTextRef", "ref" to buttonTextRef, "style" to normalizeStyle(utsArrayOf(
                        unref(contentStyle)
                    ))), utsArrayOf(
                        renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                            return utsArrayOf(
                                toDisplayString(_ctx.content)
                            )
                        }
                        )
                    ), 6),
                    if (isTrue(_ctx.formType != null || _ctx.openType != null)) {
                        createElementVNode("button", utsMapOf("key" to 2, "class" to "l-button__button", "hover-class" to "none", "onAgreeprivacyauthorization" to agreeprivacyauthorization, "disabled" to (_ctx.disabled || _ctx.loading), "form-type" to if (_ctx.disabled || _ctx.loading) {
                            ""
                        } else {
                            _ctx.formType
                        }, "open-type" to if (_ctx.disabled || _ctx.loading) {
                            ""
                        } else {
                            _ctx.openType
                        }), null, 40, utsArrayOf(
                            "disabled",
                            "form-type",
                            "open-type"
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                ), 14, utsArrayOf(
                    "hover-class",
                    "hover-start-time",
                    "hover-stay-time",
                    "data-disabled"
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-button--mini" to utsMapOf("" to utsMapOf("paddingTop" to 0, "paddingRight" to "16rpx", "paddingBottom" to 0, "paddingLeft" to "16rpx", "height" to "56rpx"), ".l-button--square" to utsMapOf("width" to "56rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to utsMapOf("width" to "56rpx", "paddingLeft" to 0, "paddingRight" to 0)), "l-button__content" to utsMapOf(".l-button--mini " to utsMapOf("fontSize" to 12), ".l-button--small " to utsMapOf("fontSize" to 14), ".l-button--medium " to utsMapOf("fontSize" to 16), ".l-button--large " to utsMapOf("fontSize" to 16), ".l-button--default " to utsMapOf("color" to "rgba(0,0,0,0.88)"), ".l-button--primary " to utsMapOf("color" to "#3283ff"), ".l-button--danger " to utsMapOf("color" to "#FF4D4F"), ".l-button--info " to utsMapOf("color" to "#3283ff"), ".l-button--warning " to utsMapOf("color" to "#ffb400"), ".l-button--success " to utsMapOf("color" to "#34c471"), ".l-button--solid " to utsMapOf("color" to "#FFFFFF")), "l-button--small" to utsMapOf("" to utsMapOf("paddingTop" to 0, "paddingRight" to "24rpx", "paddingBottom" to 0, "paddingLeft" to "24rpx", "height" to "64rpx"), ".l-button--square" to utsMapOf("width" to "64rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to utsMapOf("width" to "64rpx", "paddingLeft" to 0, "paddingRight" to 0)), "l-button--medium" to utsMapOf("" to utsMapOf("paddingTop" to 0, "paddingRight" to "32rpx", "paddingBottom" to 0, "paddingLeft" to "32rpx", "height" to "80rpx"), ".l-button--square" to utsMapOf("width" to "80rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to utsMapOf("width" to "80rpx", "paddingLeft" to 0, "paddingRight" to 0)), "l-button--large" to utsMapOf("" to utsMapOf("paddingTop" to 0, "paddingRight" to "48rpx", "paddingBottom" to 0, "paddingLeft" to "48rpx", "height" to "96rpx"), ".l-button--square" to utsMapOf("width" to "96rpx", "paddingLeft" to 0, "paddingRight" to 0), ".l-button--circle" to utsMapOf("width" to "96rpx", "paddingLeft" to 0, "paddingRight" to 0)), "hover" to utsMapOf(".l-button--default" to utsMapOf("backgroundColor" to "#eeeeee"), ".l-button--default.l-button--solid" to utsMapOf("backgroundColor" to "#000000"), ".l-button--default.l-button--light" to utsMapOf("backgroundColor" to "#e7e7e7"), ".l-button--primary" to utsMapOf("backgroundColor" to "#F0F8FF"), ".l-button--primary.l-button--solid" to utsMapOf("backgroundColor" to "#2164d9"), ".l-button--primary.l-button--light" to utsMapOf("backgroundColor" to "#d6ecff"), ".l-button--danger" to utsMapOf("backgroundColor" to "#fff2f0"), ".l-button--danger.l-button--solid" to utsMapOf("backgroundColor" to "#d9363e"), ".l-button--danger.l-button--light" to utsMapOf("backgroundColor" to "#ffccc7"), ".l-button--info" to utsMapOf("backgroundColor" to "#d6ecff"), ".l-button--info.l-button--solid" to utsMapOf("backgroundColor" to "#2164d9"), ".l-button--info.l-button--light" to utsMapOf("backgroundColor" to "#add6ff"), ".l-button--warning" to utsMapOf("backgroundColor" to "#fffce6"), ".l-button--warning.l-button--solid" to utsMapOf("backgroundColor" to "#d99100"), ".l-button--warning.l-button--light" to utsMapOf("backgroundColor" to "#fff0a3"), ".l-button--success" to utsMapOf("backgroundColor" to "#f0fff4"), ".l-button--success.l-button--solid" to utsMapOf("backgroundColor" to "#239e5a"), ".l-button--success.l-button--light" to utsMapOf("backgroundColor" to "#e1f7e7")), "l-button--default" to utsMapOf(".l-button--solid" to utsMapOf("backgroundColor" to "rgba(0,0,0,0.88)"), ".l-button--outline" to utsMapOf("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-button--dashed" to utsMapOf("borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5"), ".l-button--light" to utsMapOf("backgroundColor" to "#eeeeee"), ".l-button--ghost" to utsMapOf("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#c5c5c5", "borderRightColor" to "#c5c5c5", "borderBottomColor" to "#c5c5c5", "borderLeftColor" to "#c5c5c5")), "l-button--primary" to utsMapOf(".l-button--solid" to utsMapOf("backgroundColor" to "#3283ff"), ".l-button--outline" to utsMapOf("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--dashed" to utsMapOf("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--light" to utsMapOf("backgroundColor" to "#F0F8FF"), ".l-button--ghost" to utsMapOf("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff")), "l-button--danger" to utsMapOf(".l-button--solid" to utsMapOf("backgroundColor" to "#FF4D4F"), ".l-button--outline" to utsMapOf("borderTopColor" to "#FF4D4F", "borderRightColor" to "#FF4D4F", "borderBottomColor" to "#FF4D4F", "borderLeftColor" to "#FF4D4F"), ".l-button--dashed" to utsMapOf("borderTopColor" to "#FF4D4F", "borderRightColor" to "#FF4D4F", "borderBottomColor" to "#FF4D4F", "borderLeftColor" to "#FF4D4F"), ".l-button--light" to utsMapOf("backgroundColor" to "#fff2f0"), ".l-button--ghost" to utsMapOf("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#FF4D4F", "borderRightColor" to "#FF4D4F", "borderBottomColor" to "#FF4D4F", "borderLeftColor" to "#FF4D4F")), "l-button--info" to utsMapOf(".l-button--solid" to utsMapOf("backgroundColor" to "#3283ff"), ".l-button--outline" to utsMapOf("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--dashed" to utsMapOf("borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff"), ".l-button--light" to utsMapOf("backgroundColor" to "#d6ecff"), ".l-button--ghost" to utsMapOf("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#3283ff", "borderRightColor" to "#3283ff", "borderBottomColor" to "#3283ff", "borderLeftColor" to "#3283ff")), "l-button--warning" to utsMapOf(".l-button--solid" to utsMapOf("backgroundColor" to "#ffb400"), ".l-button--outline" to utsMapOf("borderTopColor" to "#ffb400", "borderRightColor" to "#ffb400", "borderBottomColor" to "#ffb400", "borderLeftColor" to "#ffb400"), ".l-button--dashed" to utsMapOf("borderTopColor" to "#ffb400", "borderRightColor" to "#ffb400", "borderBottomColor" to "#ffb400", "borderLeftColor" to "#ffb400"), ".l-button--light" to utsMapOf("backgroundColor" to "#fffce6"), ".l-button--ghost" to utsMapOf("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#ffb400", "borderRightColor" to "#ffb400", "borderBottomColor" to "#ffb400", "borderLeftColor" to "#ffb400")), "l-button--success" to utsMapOf(".l-button--solid" to utsMapOf("backgroundColor" to "#34c471"), ".l-button--outline" to utsMapOf("borderTopColor" to "#34c471", "borderRightColor" to "#34c471", "borderBottomColor" to "#34c471", "borderLeftColor" to "#34c471"), ".l-button--dashed" to utsMapOf("borderTopColor" to "#34c471", "borderRightColor" to "#34c471", "borderBottomColor" to "#34c471", "borderLeftColor" to "#34c471"), ".l-button--light" to utsMapOf("backgroundColor" to "#f0fff4"), ".l-button--ghost" to utsMapOf("backgroundColor" to "rgba(0,0,0,0)", "borderTopColor" to "#34c471", "borderRightColor" to "#34c471", "borderBottomColor" to "#34c471", "borderLeftColor" to "#34c471")), "l-button" to utsMapOf("" to utsMapOf("opacity" to 1, "position" to "relative", "alignItems" to "center", "justifyContent" to "center", "flexDirection" to "row", "transitionDuration" to "200ms", "transitionProperty" to "backgroundColor,opacity,borderColor,width,height", "borderTopLeftRadius" to "6rpx", "borderTopRightRadius" to "6rpx", "borderBottomRightRadius" to "6rpx", "borderBottomLeftRadius" to "6rpx"), ".l-button--disabled" to utsMapOf("opacity" to 0.6)), "l-button__button" to padStyleMapOf(utsMapOf("position" to "absolute", "left" to 0, "right" to 0, "top" to 0, "bottom" to 0, "borderTopWidth" to "medium", "borderRightWidth" to "medium", "borderBottomWidth" to "medium", "borderLeftWidth" to "medium", "borderTopStyle" to "none", "borderRightStyle" to "none", "borderBottomStyle" to "none", "borderLeftStyle" to "none", "borderTopColor" to "#000000", "borderRightColor" to "#000000", "borderBottomColor" to "#000000", "borderLeftColor" to "#000000", "backgroundColor" to "rgba(0,0,0,0)")), "l-button--block" to padStyleMapOf(utsMapOf("width" to "100%", "alignSelf" to "auto")), "l-button__icon" to utsMapOf(".l-button--solid " to utsMapOf("color" to "#FFFFFF"), "" to utsMapOf("alignSelf" to "center")), "l-button--outline" to padStyleMapOf(utsMapOf("borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopWidth" to 0.71, "borderRightWidth" to 0.71, "borderBottomWidth" to 0.71, "borderLeftWidth" to 0.71)), "l-button--dashed" to padStyleMapOf(utsMapOf("borderTopStyle" to "dashed", "borderRightStyle" to "dashed", "borderBottomStyle" to "dashed", "borderLeftStyle" to "dashed", "borderTopWidth" to 0.71, "borderRightWidth" to 0.71, "borderBottomWidth" to 0.71, "borderLeftWidth" to 0.71)), "l-button__loading" to padStyleMapOf(utsMapOf("alignSelf" to "center")), "l-button--round" to padStyleMapOf(utsMapOf("borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999)), "l-button--circle" to padStyleMapOf(utsMapOf("borderTopLeftRadius" to 999, "borderTopRightRadius" to 999, "borderBottomRightRadius" to 999, "borderBottomLeftRadius" to 999)), "gap" to utsMapOf(".l-button " to utsMapOf("marginLeft" to 4)), "@TRANSITION" to utsMapOf("l-button" to utsMapOf("duration" to "200ms", "property" to "backgroundColor,opacity,borderColor,width,height")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("click" to null, "agreeprivacyauthorization" to null, "chooseavatar" to null, "getuserinfo" to null, "contact" to null, "getphonenumber" to null, "error" to null, "opensetting" to null, "launchapp" to null)
        var props = normalizePropsOptions(utsMapOf("ariaLabel" to utsMapOf("type" to "String", "required" to false), "lId" to utsMapOf("type" to "String", "required" to false), "content" to utsMapOf("type" to "String", "required" to false), "block" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "disabled" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "ghost" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "icon" to utsMapOf("type" to "String", "required" to false), "iconSize" to utsMapOf("type" to "String", "required" to false), "loading" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "loadingProps" to utsMapOf("type" to "UTSJSONObject", "required" to false), "shape" to utsMapOf("type" to "String", "required" to true, "default" to "rectangle"), "size" to utsMapOf("type" to "String", "required" to true, "default" to "medium"), "suffix" to utsMapOf("type" to "String", "required" to false), "type" to utsMapOf("type" to "String", "required" to true, "default" to "default"), "variant" to utsMapOf("type" to "String", "required" to false), "radius" to utsMapOf("type" to "String", "required" to false), "fontSize" to utsMapOf("type" to "String", "required" to false), "textColor" to utsMapOf("type" to "String", "required" to false), "color" to utsMapOf("type" to "String", "required" to false), "lStyle" to utsMapOf("type" to "String", "required" to false), "gap" to utsMapOf("type" to "String", "required" to false), "formType" to utsMapOf("type" to "String", "required" to false), "openType" to utsMapOf("type" to "String", "required" to false), "hoverClass" to utsMapOf("type" to "String", "required" to false), "hoverStopPropagation" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "hoverStartTime" to utsMapOf("type" to "Number", "required" to true, "default" to 20), "hoverStayTime" to utsMapOf("type" to "Number", "required" to true, "default" to 70), "lang" to utsMapOf("type" to "String", "required" to true, "default" to "en"), "sessionFrom" to utsMapOf("type" to "String", "required" to true, "default" to ""), "sendMessageTitle" to utsMapOf("type" to "String", "required" to true, "default" to ""), "sendMessagePath" to utsMapOf("type" to "String", "required" to true, "default" to ""), "sendMessageImg" to utsMapOf("type" to "String", "required" to true, "default" to ""), "appParameter" to utsMapOf("type" to "String", "required" to true, "default" to ""), "showMessageCard" to utsMapOf("type" to "Boolean", "required" to true, "default" to false)))
        var propsNeedCastKeys = utsArrayOf(
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
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
