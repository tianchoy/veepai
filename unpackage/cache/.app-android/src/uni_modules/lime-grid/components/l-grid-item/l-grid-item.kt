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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.reLaunch as uni_reLaunch
import io.dcloud.uniapp.extapi.redirectTo as uni_redirectTo
import io.dcloud.uniapp.extapi.switchTab as uni_switchTab
open class GenUniModulesLimeGridComponentsLGridItemLGridItem : VueComponent, GridItemProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var text: String? by `$props`
    override var description: String? by `$props`
    override var url: String? by `$props`
    override var openType: String by `$props`
    override var icon: String? by `$props`
    override var prefix: String? by `$props`
    override var image: String? by `$props`
    override var imageWidth: String? by `$props`
    override var imageHeight: String? by `$props`
    override var bgColor: String? by `$props`
    override var padding: String? by `$props`
    override var layout: String by `$props`
    override var dot: Boolean by `$props`
    override var iconSize: String by `$props`
    override var iconColor: String by `$props`
    override var badge: Any? by `$props`
    override var borderColor: String? by `$props`
    override var lStyle: Any? by `$props`
    override var lImageStyle: Any? by `$props`
    override var lTitleStyle: Any? by `$props`
    override var lDescriptionStyle: Any? by `$props`
    override var lClass: String? by `$props`
    override var lClassIcon: String? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeGridComponentsLGridItemLGridItem) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeGridComponentsLGridItemLGridItem
            val _cache = __ins.renderCache
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val props = __props
            val name = "l-grid-item"
            val parent = inject<GridProvide?>("limeGrid", null)
            val instance = getCurrentInstance()
            val index = computed(fun(): Number {
                return parent?.children?.value?.indexOf(instance!!.uid) ?: -1
            }
            )
            val column = computed(fun(): Number {
                return parent?.props?.column ?: 0
            }
            )
            val gutter = computed(fun(): Number {
                return parent?.props?.gutter ?: 0
            }
            )
            val width = computed(fun(): Number {
                return parent?.width?.value ?: 0
            }
            )
            val hover = computed(fun(): Boolean {
                return parent?.props?.hover ?: false
            }
            )
            val classes = computed(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set("" + name + "--" + props.layout, true)
                cls.set("" + name + "--" + (parent?.props?.align ?: "center"), true)
                cls.set("" + name + "--bordered", parent?.props?.border ?: false)
                return cls
            }
            )
            val size = computed(fun(): String {
                if (column.value > 4 || column.value == 0) {
                    return "small"
                }
                return if (column.value < 4) {
                    "large"
                } else {
                    "middle"
                }
            }
            )
            val imageClasses = computed(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set("" + name + "__image--" + size.value, true)
                return cls
            }
            )
            val titleClasses = computed(fun(): Map<String, Any> {
                val cls = Map<String, Any>()
                cls.set("" + name + "__title--" + size.value, true)
                return cls
            }
            )
            val innerImageStyle = ref<Any>("")
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                val gridWidth = parent?.props?.gridWidth
                if (gridWidth != null || width.value > 0 && column.value > 0) {
                    val _width = (width.value - (column.value - 1) * gutter.value) / column.value
                    style.set("width", gridWidth ?: "" + _width + "px")
                }
                if (index.value % column.value != column.value - 1) {
                    style.set("margin-right", "" + gutter.value + "px")
                }
                if (index.value >= column.value) {
                    style.set("margin-top", "" + gutter.value + "px")
                }
                if (props.borderColor != null) {
                    style.set("border-color", props.borderColor!!)
                }
                val bgColor = props.bgColor ?: parent?.props?.bgColor
                if (bgColor != null) {
                    style.set("background", bgColor)
                }
                val padding = props.padding ?: parent?.props?.padding
                if (padding != null) {
                    style.set("padding", padding)
                }
                return style
            }
            )
            val imageStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.imageWidth != null) {
                    style.set("width", props.imageWidth!!)
                }
                if (props.imageHeight != null) {
                    style.set("height", props.imageHeight!!)
                }
                return style
            }
            )
            val onClick = fun(e: UniPointerEvent){
                emits("click", e)
                if (props.url == null) {
                    return
                }
                when (props.openType) {
                    "switchTab" -> 
                        uni_switchTab(SwitchTabOptions(url = props.url!!))
                    "reLaunch" -> 
                        uni_reLaunch(ReLaunchOptions(url = props.url!!))
                    "redirectTo" -> 
                        uni_redirectTo(RedirectToOptions(url = props.url!!))
                    else -> 
                        uni_navigateTo(NavigateToOptions(url = props.url!!))
                }
            }
            watchEffect(fun(){
                nextTick(fun(){
                    innerImageStyle.value = props.lImageStyle ?: ""
                }
                )
            }
            )
            onBeforeMount(fun(){
                if (instance != null && parent != null) {
                    parent.children.value.push(instance.uid)
                }
            }
            )
            onUnmounted(fun(){
                if (instance != null && parent != null) {
                    parent.children.value = parent.children.value.filter(fun(it): Boolean {
                        return it != instance.uid
                    }
                    )
                }
            }
            )
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_l_badge = resolveEasyComponent("l-badge", GenUniModulesLimeBadgeComponentsLBadgeLBadgeClass)
                return _cE("view", _uM("ref" to "gridRef", "class" to _nC(_uA(
                    "l-grid-item",
                    _uA(
                        unref(classes),
                        _ctx.lClass
                    )
                )), "onClick" to onClick, "hover-stay-time" to 200, "hover-class" to if (unref(hover)) {
                    "l-grid-item--hover"
                } else {
                    ""
                }
                , "style" to _nS(_uA(
                    unref(styles),
                    _ctx.lStyle
                ))), _uA(
                    renderSlot(_ctx.`$slots`, "default", UTSJSONObject(), fun(): UTSArray<Any> {
                        return _uA(
                            if (isTrue((_ctx.dot || _ctx.badge != null) && (_ctx.icon != null || _ctx.image != null || _ctx.`$slots`["icon"] != null))) {
                                _cV(_component_l_badge, _uM("key" to 0, "content" to _ctx.badge, "dot" to _ctx.dot), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        renderSlot(_ctx.`$slots`, "icon", UTSJSONObject(), fun(): UTSArray<Any> {
                                            return _uA(
                                                if (_ctx.icon != null) {
                                                    _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                                        "l-grid-item__icon",
                                                        unref(imageClasses)
                                                    ))), _uA(
                                                        _cV(_component_l_icon, _uM("l-class" to _ctx.lClassIcon, "prefix" to _ctx.prefix, "name" to _ctx.icon, "color" to _ctx.iconColor, "size" to _ctx.iconSize), null, 8, _uA(
                                                            "l-class",
                                                            "prefix",
                                                            "name",
                                                            "color",
                                                            "size"
                                                        ))
                                                    ), 2)
                                                } else {
                                                    if (_ctx.image != null) {
                                                        _cE("image", _uM("key" to 1, "class" to _nC(_uA(
                                                            "l-grid-item__image",
                                                            unref(imageClasses)
                                                        )), "style" to _nS(_uA(
                                                            unref(imageStyle),
                                                            unref(innerImageStyle)
                                                        )), "src" to _ctx.image, "mode" to "aspectFill"), null, 14, _uA(
                                                            "src"
                                                        ))
                                                    } else {
                                                        _cC("v-if", true)
                                                    }
                                                }
                                            )
                                        })
                                    )
                                }), "_" to 3), 8, _uA(
                                    "content",
                                    "dot"
                                ))
                            } else {
                                if (isTrue(_ctx.icon != null || _ctx.image != null || _ctx.`$slots`["icon"] != null)) {
                                    renderSlot(_ctx.`$slots`, "icon", _uM("key" to 1), fun(): UTSArray<Any> {
                                        return _uA(
                                            if (_ctx.icon != null) {
                                                _cE("view", _uM("key" to 0, "class" to _nC(_uA(
                                                    "l-grid-item__icon",
                                                    unref(imageClasses)
                                                ))), _uA(
                                                    _cV(_component_l_icon, _uM("l-class" to _ctx.lClassIcon, "prefix" to _ctx.prefix, "name" to _ctx.icon, "color" to _ctx.iconColor, "size" to _ctx.iconSize), null, 8, _uA(
                                                        "l-class",
                                                        "prefix",
                                                        "name",
                                                        "color",
                                                        "size"
                                                    ))
                                                ), 2)
                                            } else {
                                                if (_ctx.image != null) {
                                                    _cE("image", _uM("key" to 1, "class" to _nC(_uA(
                                                        "l-grid-item__image",
                                                        unref(imageClasses)
                                                    )), "style" to _nS(_uA(
                                                        unref(imageStyle),
                                                        unref(innerImageStyle)
                                                    )), "src" to _ctx.image, "mode" to "aspectFill"), null, 14, _uA(
                                                        "src"
                                                    ))
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                            }
                                        )
                                    })
                                } else {
                                    _cC("v-if", true)
                                }
                            }
                            ,
                            _cE("view", _uM("class" to "l-grid-item__content"), _uA(
                                renderSlot(_ctx.`$slots`, "text", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("text", _uM("class" to _nC(_uA(
                                            "l-grid-item__title",
                                            unref(titleClasses)
                                        )), "style" to _nS(_uA(
                                            _ctx.lTitleStyle
                                        ))), _tD(_ctx.text), 7)
                                    )
                                }
                                ),
                                renderSlot(_ctx.`$slots`, "description", UTSJSONObject(), fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE("text", _uM("class" to "l-grid-item__description", "style" to _nS(_uA(
                                            _ctx.lDescriptionStyle
                                        ))), _tD(_ctx.description), 5)
                                    )
                                }
                                )
                            ))
                        )
                    }
                    ),
                    renderSlot(_ctx.`$slots`, "extra")
                ), 14, _uA(
                    "hover-class"
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
                return _uM("l-grid-item" to _pS(_uM("alignItems" to "center", "paddingTop" to "32rpx", "paddingRight" to 0, "paddingBottom" to "24rpx", "paddingLeft" to 0, "flexDirection" to "column", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "width" to "25%", "overflow" to "visible")), "l-grid-item--bordered" to _pS(_uM("borderTopWidth" to "0.5rpx", "borderRightWidth" to "0.5rpx", "borderBottomWidth" to "0.5rpx", "borderLeftWidth" to "0.5rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#eeeeee", "borderRightColor" to "#eeeeee", "borderBottomColor" to "#eeeeee", "borderLeftColor" to "#eeeeee")), "l-grid-item--horizontal" to _pS(_uM("paddingTop" to "32rpx", "paddingRight" to 0, "paddingBottom" to "32rpx", "paddingLeft" to 0, "flexDirection" to "row", "justifyContent" to "center")), "l-grid-item__content" to _uM(".l-grid-item--horizontal " to _uM("marginTop" to 0, "marginLeft" to "24rpx"), "" to _uM("position" to "relative", "marginTop" to "16rpx")), "l-grid-item--hover" to _pS(_uM("backgroundColor" to "rgba(0,0,0,0.02)")), "l-grid-item__title" to _uM(".l-grid-item--center " to _uM("textAlign" to "center"), "" to _uM("color" to "rgba(0,0,0,0.88)", "fontSize" to 14, "lineHeight" to "44rpx")), "l-grid-item__description" to _uM(".l-grid-item--center " to _uM("textAlign" to "center"), "" to _uM("color" to "rgba(0,0,0,0.45)", "fontSize" to 12, "lineHeight" to "40rpx")), "l-grid-item__icon" to _pS(_uM("alignItems" to "center", "justifyContent" to "center", "backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0.02)", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "width" to "96rpx", "height" to "96rpx")), "l-grid-item__image" to _pS(_uM("backgroundImage" to "none", "backgroundColor" to "rgba(0,0,0,0.02)", "borderTopLeftRadius" to "12rpx", "borderTopRightRadius" to "12rpx", "borderBottomRightRadius" to "12rpx", "borderBottomLeftRadius" to "12rpx", "width" to "96rpx", "height" to "96rpx")), "l-grid-item__image--small" to _pS(_uM("width" to 32, "height" to 32)), "l-grid-item__icon--small" to _pS(_uM("width" to 32, "height" to 32)), "l-grid-item__image--middle" to _pS(_uM("width" to "80rpx", "height" to "80rpx")), "l-grid-item__icon--middle" to _pS(_uM("width" to "80rpx", "height" to "80rpx")), "l-grid-item__title--small" to _pS(_uM("fontSize" to 12)), "l-grid-item__title--middle" to _pS(_uM("fontSize" to 12)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM("click" to null)
        var props = _nP(_uM("text" to _uM("type" to "String", "required" to false), "description" to _uM("type" to "String", "required" to false), "url" to _uM("type" to "String", "required" to false), "openType" to _uM("type" to "String", "required" to true, "default" to "navigateTo"), "icon" to _uM("type" to "String", "required" to false), "prefix" to _uM("type" to "String", "required" to false), "image" to _uM("type" to "String", "required" to false), "imageWidth" to _uM("type" to "String", "required" to false), "imageHeight" to _uM("type" to "String", "required" to false), "bgColor" to _uM("type" to "String", "required" to false), "padding" to _uM("type" to "String", "required" to false), "layout" to _uM("type" to "String", "required" to true, "default" to "vertical"), "dot" to _uM("type" to "Boolean", "required" to true, "default" to false), "iconSize" to _uM("type" to "String", "required" to true, "default" to "48rpx"), "iconColor" to _uM("type" to "String", "required" to true, "default" to "rgba(0,0,0,0.88)"), "badge" to _uM("required" to false), "borderColor" to _uM("type" to "String", "required" to false), "lStyle" to _uM("type" to _uA(
            "String",
            "UTSJSONObject"
        ), "required" to false), "lImageStyle" to _uM("type" to _uA(
            "String",
            "UTSJSONObject"
        ), "required" to false), "lTitleStyle" to _uM("type" to _uA(
            "String",
            "UTSJSONObject"
        ), "required" to false), "lDescriptionStyle" to _uM("type" to _uA(
            "String",
            "UTSJSONObject"
        ), "required" to false), "lClass" to _uM("type" to "String", "required" to false), "lClassIcon" to _uM("type" to "String", "required" to false)))
        var propsNeedCastKeys = _uA(
            "openType",
            "layout",
            "dot",
            "iconSize",
            "iconColor"
        )
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
