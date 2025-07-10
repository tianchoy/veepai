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
import io.dcloud.uniapp.extapi.getWindowInfo as uni_getWindowInfo
open class GenUniModulesLimePopupComponentsLPopupLPopup : VueComponent, PopupProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var closeable: Boolean by `$props`
    override var closeOnClickOverlay: Boolean by `$props`
    override var destroyOnClose: Boolean by `$props`
    override var overlayStyle: Any? by `$props`
    override var position: String by `$props`
    override var preventScrollThrough: Boolean by `$props`
    override var overlay: Boolean by `$props`
    override var transitionName: String? by `$props`
    override var visible: Boolean? by `$props`
    override var zIndex: Number by `$props`
    override var duration: Number by `$props`
    override var bgColor: String? by `$props`
    override var closeIcon: String by `$props`
    override var iconColor: String? by `$props`
    override var lStyle: Any? by `$props`
    override var safeAreaInsetBottom: Boolean by `$props`
    override var safeAreaInsetTop: Boolean by `$props`
    override var radius: Any? by `$props`
    open var modelValue: Boolean? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimePopupComponentsLPopupLPopup) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimePopupComponentsLPopupLPopup
            val _cache = __ins.renderCache
            fun emit(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val modelValue = useModel<Boolean>(__ins.props, "modelValue")
            val innerValue = computed(WritableComputedOptions(set = fun(value: Boolean) {
                modelValue.value = value
                emit("change", value)
            }
            , get = fun(): Boolean {
                return (props.visible ?: false) || modelValue.value
            }
            ))
            val status = ref<TransitionEmitStatus>("before-enter")
            val _useTransition = useTransition1(UseTransitionOptions1(defaultName = props.transitionName ?: "popup-fade", appear = innerValue.value, emits = fun(name: TransitionEmitStatus){
                status.value = name
                if (name == "before-enter") {
                    emit("open")
                } else if (name == "after-enter") {
                    emit("opened")
                } else if (name == "before-leave") {
                    emit("close")
                } else if (name == "after-leave") {
                    emit("closed")
                }
                emit(name)
            }
            , visible = fun(): Boolean {
                return innerValue.value
            }
            , duration = props.duration))
            val inited = _useTransition.inited
            val display = _useTransition.display
            val classes = _useTransition.classes
            val finished = _useTransition.finished
            val overlayZIndex = computed(fun(): Number {
                return if (props.zIndex > 0) {
                    props.zIndex - 1
                } else {
                    998
                }
            }
            )
            val rootClass = computed(fun(): String {
                val safe = if (props.safeAreaInsetTop && props.position == "top") {
                    "l-popup--safe-top"
                } else {
                    if (props.safeAreaInsetBottom && props.position == "bottom") {
                        "l-popup--safe-bottom"
                    } else {
                        ""
                    }
                }
                return "l-popup--" + props.position + " " + safe + " " + classes.value
            }
            )
            val safeAreaInsets = uni_getWindowInfo().safeAreaInsets
            val styles = computed<Map<String, Any>>(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                style.set("transition-duration", (if (utsArrayOf(
                    "after-leave",
                    "before-enter"
                ).includes(status.value)) {
                    0
                } else {
                    props.duration
                }
                ) + "ms")
                if (props.bgColor != null) {
                    style.set("background", props.bgColor!!)
                }
                if (props.zIndex > 0) {
                    style.set("z-index", props.zIndex)
                }
                if (props.safeAreaInsetBottom && props.position == "bottom") {
                    style.set("padding-bottom", safeAreaInsets.bottom + "px")
                }
                if (props.safeAreaInsetTop && props.position == "top") {
                    style.set("padding-top", safeAreaInsets.top + "px")
                }
                if (props.radius != null) {
                    val values = convertRadius(props.radius!!)
                    style.set("border-top-left-radius", values[0])
                    style.set("border-top-right-radius", values[1])
                    style.set("border-bottom-right-radius", values[2])
                    style.set("border-bottom-left-radius", values[3])
                }
                return style
            }
            )
            val handleOverlayClick = fun(){
                if (props.closeOnClickOverlay) {
                    innerValue.value = false
                    emit("click-overlay")
                }
            }
            val handleClose = fun(){
                innerValue.value = false
                emit("click-close")
            }
            val popupRef = ref<UniElement?>(null)
            watchEffect(fun(){
                if (!display.value) {
                    popupRef.value?.style?.setProperty("display", "none")
                } else {
                    popupRef.value?.style?.setProperty("display", "flex")
                }
            }
            )
            return fun(): Any? {
                val _component_l_overlay = resolveEasyComponent("l-overlay", GenUniModulesLimeOverlayComponentsLOverlayLOverlayClass)
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                return createElementVNode(Fragment, null, utsArrayOf(
                    if (isTrue(if (_ctx.destroyOnClose) {
                        unref(display) && _ctx.overlay
                    } else {
                        _ctx.overlay
                    }
                    )) {
                        createVNode(_component_l_overlay, utsMapOf("key" to 0, "visible" to unref(innerValue), "zIndex" to unref(overlayZIndex), "appear" to true, "preventScrollThrough" to _ctx.preventScrollThrough, "l-style" to _ctx.overlayStyle, "onClick" to handleOverlayClick), null, 8, utsArrayOf(
                            "visible",
                            "zIndex",
                            "preventScrollThrough",
                            "l-style"
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                    ,
                    if (isTrue(if (_ctx.destroyOnClose) {
                        unref(display)
                    } else {
                        unref(inited)
                    }
                    )) {
                        createElementVNode("view", utsMapOf("key" to 1, "class" to normalizeClass(utsArrayOf(
                            "l-popup",
                            unref(rootClass)
                        )), "ref_key" to "popupRef", "ref" to popupRef, "style" to normalizeStyle(utsArrayOf(
                            unref(styles),
                            _ctx.lStyle
                        )), "onTransitionend" to unref(finished)), utsArrayOf(
                            renderSlot(_ctx.`$slots`, "default"),
                            if (isTrue(_ctx.closeable)) {
                                createElementVNode("view", utsMapOf("key" to 0, "class" to "l-popup__close", "onClick" to handleClose), utsArrayOf(
                                    renderSlot(_ctx.`$slots`, "close-btn", UTSJSONObject(), fun(): UTSArray<Any> {
                                        return utsArrayOf(
                                            createVNode(_component_l_icon, utsMapOf("class" to "l-popup__close-icon", "name" to _ctx.closeIcon, "size" to "27px", "color" to _ctx.iconColor), null, 8, utsArrayOf(
                                                "name",
                                                "color"
                                            ))
                                        )
                                    })
                                ))
                            } else {
                                createCommentVNode("v-if", true)
                            }
                        ), 46, utsArrayOf(
                            "onTransitionend"
                        ))
                    } else {
                        createCommentVNode("v-if", true)
                    }
                ), 64)
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("l-popup" to utsMapOf("" to utsMapOf("position" to "fixed", "transitionDuration" to "300ms", "transitionProperty" to "transform,opacity", "transitionTimingFunction" to "ease", "backgroundColor" to "#ffffff", "overflow" to "visible", "opacity" to 1), ".l-popup-fade-enter" to utsMapOf("opacity" to 0), ".l-popup-fade-leave-to" to utsMapOf("opacity" to 0), ".l-popup-fade-enter.l-popup--top" to utsMapOf("transform" to "scale(1) translate(0, -100%)"), ".l-popup-fade-leave-to.l-popup--top" to utsMapOf("transform" to "scale(1) translate(0, -100%)"), ".l-popup-fade-enter.l-popup--bottom" to utsMapOf("transform" to "scale(1) translate(0, 100%)"), ".l-popup-fade-leave-to.l-popup--bottom" to utsMapOf("transform" to "scale(1) translate(0, 100%)"), ".l-popup-fade-enter.l-popup--left" to utsMapOf("transform" to "scale(1) translate(-100%, 0)"), ".l-popup-fade-leave-to.l-popup--left" to utsMapOf("transform" to "scale(1) translate(-100%, 0)"), ".l-popup-fade-enter.l-popup--right" to utsMapOf("transform" to "scale(1) translate(100%, 0)"), ".l-popup-fade-leave-to.l-popup--right" to utsMapOf("transform" to "scale(1) translate(100%, 0)"), ".l-popup-fade-enter.l-popup--center" to utsMapOf("transform" to "translate(-50%, -50%) scale(0.6)", "opacity" to 0), ".l-popup-fade-leave-to.l-popup--center" to utsMapOf("transform" to "translate(-50%, -50%) scale(0.6)", "opacity" to 0), ".l-dialog-enter.l-popup--center" to utsMapOf("transform" to "scale(0.6) translate(-50%, -50%)", "opacity" to 0), ".l-dialog-leave-to.l-popup--center" to utsMapOf("transform" to "scale(0.6) translate(-50%, -50%)", "opacity" to 0)), "l-popup__close" to padStyleMapOf(utsMapOf("position" to "absolute", "top" to 0, "right" to 0, "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "l-popup__close-icon" to padStyleMapOf(utsMapOf("color" to "rgba(0,0,0,0.6)")), "l-popup--top" to padStyleMapOf(utsMapOf("top" to 0, "left" to 0, "right" to 0, "borderBottomLeftRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "transform" to "scale(1) translate(0, 0)")), "l-popup--bottom" to padStyleMapOf(utsMapOf("bottom" to 0, "left" to 0, "right" to 0, "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "transform" to "scale(1) translate(0, 0)")), "l-popup--left" to padStyleMapOf(utsMapOf("top" to 0, "left" to 0, "bottom" to 0, "transform" to "scale(1) translate(0, 0)")), "l-popup--right" to padStyleMapOf(utsMapOf("top" to 0, "right" to 0, "bottom" to 0, "transform" to "scale(1) translate(0, 0)")), "l-popup--center" to padStyleMapOf(utsMapOf("top" to "50%", "left" to "50%", "transform" to "translate(-50%, -50%) scale(1)", "transformOrigin" to "50% 50%", "borderTopLeftRadius" to "18rpx", "borderTopRightRadius" to "18rpx", "borderBottomRightRadius" to "18rpx", "borderBottomLeftRadius" to "18rpx")), "@TRANSITION" to utsMapOf("l-popup" to utsMapOf("duration" to "300ms", "property" to "transform,opacity", "timingFunction" to "ease")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("change" to null, "click-overlay" to null, "click-close" to null, "open" to null, "opened" to null, "close" to null, "closed" to null, "before-enter" to null, "enter" to null, "after-enter" to null, "before-leave" to null, "leave" to null, "after-leave" to null, "update:modelValue" to null)
        var props = normalizePropsOptions(utsMapOf("closeable" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "closeOnClickOverlay" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "destroyOnClose" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "overlayStyle" to utsMapOf("type" to utsArrayOf(
            "String",
            "UTSJSONObject"
        ), "required" to false), "position" to utsMapOf("type" to "String", "required" to true, "default" to "center"), "preventScrollThrough" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "overlay" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "transitionName" to utsMapOf("type" to "String", "required" to false), "visible" to utsMapOf("type" to "Boolean", "required" to false), "zIndex" to utsMapOf("type" to "Number", "required" to true, "default" to 999), "duration" to utsMapOf("type" to "Number", "required" to true, "default" to 300), "bgColor" to utsMapOf("type" to "String", "required" to false), "closeIcon" to utsMapOf("type" to "String", "required" to true, "default" to "close"), "iconColor" to utsMapOf("type" to "String", "required" to false), "lStyle" to utsMapOf("type" to utsArrayOf(
            "String",
            "UTSJSONObject"
        ), "required" to false), "safeAreaInsetBottom" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "safeAreaInsetTop" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "radius" to utsMapOf("type" to utsArrayOf(
            "String",
            "Number"
        ), "required" to false), "modelValue" to utsMapOf("type" to "Boolean")))
        var propsNeedCastKeys = utsArrayOf(
            "closeable",
            "closeOnClickOverlay",
            "destroyOnClose",
            "position",
            "preventScrollThrough",
            "overlay",
            "visible",
            "zIndex",
            "duration",
            "closeIcon",
            "safeAreaInsetBottom",
            "safeAreaInsetTop",
            "modelValue"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
