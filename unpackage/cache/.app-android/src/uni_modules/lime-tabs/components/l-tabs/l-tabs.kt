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
open class GenUniModulesLimeTabsComponentsLTabsLTabs : VueComponent, TabsProps {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    override var list: UTSArray<UTSJSONObject>? by `$props`
    override var ellipsis: Boolean by `$props`
    override var animated: Boolean by `$props`
    override var duration: Number by `$props`
    override var showLine: Boolean by `$props`
    override var size: String by `$props`
    override var spaceEvenly: Boolean by `$props`
    override var swipeable: Boolean by `$props`
    override var value: Number? by `$props`
    override var color: String? by `$props`
    override var activeColor: String? by `$props`
    override var lineColor: String? by `$props`
    override var lineWidth: String? by `$props`
    override var lineHeight: String? by `$props`
    override var bgColor: String? by `$props`
    override var fontSize: String? by `$props`
    override var padding: String? by `$props`
    override var split: Boolean by `$props`
    override var visible: Boolean by `$props`
    override var swiperProgress: Number by `$props`
    override var syncSwiper: Boolean by `$props`
    override var lStyle: Any? by `$props`
    open var modelValue: Number? by `$props`
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenUniModulesLimeTabsComponentsLTabsLTabs) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenUniModulesLimeTabsComponentsLTabsLTabs
            val _cache = __ins.renderCache
            fun emits(event: String, vararg do_not_transform_spread: Any?) {
                __ins.emit(event, *do_not_transform_spread)
            }
            val slots = useSlots()
            val props = __props
            val children = ref(utsArrayOf<LTabPanelComponentPublicInstance>())
            val scrollLeft = ref(0)
            val lastLeft = ref(0)
            val innerStyle: UTSJSONObject = object : UTSJSONObject(UTSSourceMapPosition("innerStyle", "uni_modules/lime-tabs/components/l-tabs/l-tabs.uvue", 159, 8)) {
            }
            val modelValue = useModel<Number>(__ins.props, "modelValue")
            val currentValue = computed(WritableComputedOptions(set = fun(value: Number) {
                modelValue.value = value
                emits("change", value)
            }
            , get = fun(): Number {
                return props.value ?: modelValue.value
            }
            ))
            val styles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.bgColor != null) {
                    style.set("background", props.bgColor!!)
                }
                return style
            }
            )
            val trackStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>(utsArrayOf())
                if (props.lineColor != null) {
                    style.set("background", props.lineColor!!)
                }
                if (props.lineWidth != null) {
                    style.set("width", props.lineWidth!!)
                }
                if (props.lineHeight != null) {
                    style.set("height", props.lineHeight!!)
                }
                return style
            }
            )
            val itemStyle = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (!utsArrayOf(
                    "medium",
                    "large"
                ).includes(props.size)) {
                    style.set("height", props.size)
                }
                if (props.padding != null) {
                    style.set("padding", props.padding!!)
                }
                return style
            }
            )
            val textStyles = computed(fun(): Map<String, Any> {
                val style = Map<String, Any>()
                if (props.fontSize != null) {
                    style.set("font-size", props.fontSize!!)
                }
                return style
            }
            )
            val tabs = computed(fun(): UTSArray<TabPanel> {
                if (props.list != null && props.list!!.length > 0) {
                    return props.list!!.map(fun(item): TabPanel {
                        return TabPanel(badge = item.get("badge"), dot = item.getBoolean("dot") ?: false, disabled = item.getBoolean("disabled") ?: false, label = item.getString("label"), offset = item.getArray("offset") as UTSArray<Any>?, value = item.getNumber("value"), node = item)
                    }
                    )
                }
                return children.value.map(fun(item): TabPanel {
                    val offset = item.innderOffset
                    return TabPanel(badge = item.badge, dot = item.dot ?: false, disabled = item.disabled ?: false, label = item.label, offset = offset, value = item.value, node = UTSJSONObject(Map<String, Any?>(utsArrayOf(
                        utsArrayOf(
                            "badge",
                            item.badge
                        ),
                        utsArrayOf(
                            "dot",
                            (item.dot ?: false)
                        ),
                        utsArrayOf(
                            "disabled",
                            (item.disabled ?: false)
                        ),
                        utsArrayOf(
                            "label",
                            item.label
                        ),
                        utsArrayOf(
                            "offset",
                            offset
                        ),
                        utsArrayOf(
                            "value",
                            item.value
                        )
                    ))))
                }
                )
            }
            )
            val currentIndex = computed(fun(): Number {
                val index = tabs.value.findIndex(fun(child, index): Boolean {
                    return (child.value ?: index) == currentValue.value
                }
                )
                return if (index > -1) {
                    index
                } else {
                    0
                }
            }
            )
            val scrollRef = ref<UniScrollViewElement?>(null)
            val trackRef = ref<UniElement?>(null)
            val navRef = ref<UniElement?>(null)
            val innerRef = ref<UniElement?>(null)
            val tabRects = ref(utsArrayOf<DOMRect>())
            val containerWidth = ref(0)
            val trackLineWidth = ref(0)
            val isInteracting = ref(false)
            var timer: Number = 0
            val measureTabs = fun(): UTSPromise<Unit> {
                return UTSPromise(fun(resolve, _reject){
                    if (tabRects.value.length > 0 && tabRects.value[0].width > 0) {
                        resolve(Unit)
                    }
                    if (scrollRef.value == null) {
                        resolve(Unit)
                        return
                    }
                    val elements = scrollRef.value!!.children
                    val tabsRects: UTSArray<DOMRect> = utsArrayOf()
                    elements.forEach(fun(el){
                        if (el.tagName == "VIEW") {
                            tabsRects.push(el.getBoundingClientRect())
                        }
                    }
                    )
                    tabRects.value = tabsRects
                    containerWidth.value = scrollRef.value?.offsetWidth ?: 0
                    trackLineWidth.value = trackRef.value?.offsetWidth ?: 0
                    resolve(Unit)
                }
                )
            }
            val moveToActiveTab = fun(){
                measureTabs().then(fun(){
                    val index = currentIndex.value
                    if (tabRects.value.length <= index) {
                        return
                    }
                    val tabRect = tabRects.value[index]
                    var count: Number = 0
                    var distance: Number = 0
                    var totalSize: Number = 0
                    tabRects.value.forEach(fun(item: DOMRect){
                        if (count < index) {
                            distance += item.width
                            count += 1
                        }
                        totalSize += item.width
                    }
                    )
                    if (totalSize == 0) {
                        return
                    }
                    distance += (tabRect.width - trackLineWidth.value) / 2
                    trackRef.value?.style?.setProperty("transform", "translateX(" + distance + "px)")
                    val scrollOffset = calcScrollOffset(containerWidth.value, tabRect.left, tabRect.width, lastLeft.value)
                    val maxOffset = totalSize - containerWidth.value
                    scrollLeft.value = clamp(scrollOffset, 0, maxOffset)
                }
                )
            }
            val updateInnerStyle = fun(offset: Number){
                nextTick(fun(){
                    if (innerRef.value == null) {
                        return
                    }
                    val width = innerRef.value!!.parentElement?.offsetWidth ?: 0
                    innerRef.value!!.style.setProperty("width", "" + tabs.value.length * width + "px")
                    innerRef.value!!.style.setProperty("opacity", "1")
                    val left = -width * currentIndex.value + offset
                    if (offset != 0) {
                        innerRef.value!!.style.setProperty("transition-duration", "0s")
                        innerRef.value!!.style.setProperty("transform", "translateX(" + left + "px)")
                    } else {
                        if (props.animated) {
                            innerRef.value!!.style.setProperty("transition-duration", if (offset != 0 || !props.animated) {
                                "0s"
                            } else {
                                "" + props.duration + "s"
                            }
                            )
                        }
                        nextTick(fun(){
                            innerRef.value!!.style.setProperty("transform", "translateX(" + left + "px)")
                        }
                        )
                    }
                }
                )
            }
            val onScroll = fun(e: UniScrollEvent){
                lastLeft.value = e.detail.scrollLeft
            }
            val updateDuration = fun(duration: Number){
                trackRef.value?.style?.setProperty("transition-duration", "" + duration + "s")
            }
            val onClick = fun(index: Number, item: TabPanel){
                isInteracting.value = true
                val _item_value = item.value
                val value = if (_item_value == null) {
                    index
                } else {
                    _item_value
                }
                val disabled = item.disabled
                val label = item.label
                if (disabled || currentValue.value == value) {
                    return
                }
                currentValue.value = value
                emits("click", value)
                updateDuration(0.3)
                nextTick(fun(){
                    moveToActiveTab()
                }
                )
                clearTimeout(timer)
                timer = setTimeout(fun(){
                    isInteracting.value = false
                }
                , 500)
            }
            val getAvailableTabIndex = fun(deltaX: Number): Number {
                val step = if (deltaX > 0) {
                    -1
                } else {
                    1
                }
                val len = tabs.value.length
                run {
                    var i = step
                    while(currentIndex.value + step >= 0 && currentIndex.value + step < len){
                        val newIndex = currentIndex.value + i
                        if (newIndex >= 0 && newIndex < len && tabs.value.length > newIndex && !tabs.value[newIndex].disabled) {
                            return newIndex
                        }
                        i += step
                    }
                }
                return -1
            }
            val touch = useTouch()
            val onTouchStart = fun(event: UniTouchEvent){
                isInteracting.value = true
                if (!props.swipeable) {
                    return
                }
                touch.start(event)
                updateDuration(0.3)
            }
            val onTouchMove = fun(event: UniTouchEvent){
                if (!props.swipeable) {
                    return
                }
                touch.move(event)
                val direction = touch.direction
                val deltaX = touch.deltaX
                val startX = touch.startX
                if (direction.value != "horizontal") {
                    return
                }
                if (!props.animated) {
                    return
                }
                val isAtFirstTab = currentIndex.value == 0
                val isAtLastTab = currentIndex.value == tabs.value.length - 1
                if ((isAtFirstTab && deltaX.value > 0) || (isAtLastTab && deltaX.value < 0)) {
                    val base = if (isAtFirstTab) {
                        1
                    } else {
                        -1
                    }
                    val adjustedDelta = ease1(deltaX.value, base)
                    updateInnerStyle(adjustedDelta)
                } else {
                    updateInnerStyle(deltaX.value)
                }
            }
            val onTouchEnd = fun(){
                isInteracting.value = false
                if (!props.swipeable) {
                    return
                }
                val direction = touch.direction
                val deltaX = touch.deltaX
                val offsetX = touch.offsetX
                val minSwipeDistance: Number = 50
                if (direction.value == "horizontal" && offsetX.value >= minSwipeDistance) {
                    val index = getAvailableTabIndex(deltaX.value)
                    if (index != -1) {
                        onClick(index, tabs.value[index])
                    }
                }
                updateInnerStyle(0)
            }
            val stopWatch = watch(tabs, fun(_v: UTSArray<TabPanel>){
                setTimeout(fun(){
                    moveToActiveTab()
                }
                , 50)
            }
            )
            val stopValueWatch = watch(currentValue, fun(_v: Number){
                if (tabs.value.length == 0) {
                    return
                }
                moveToActiveTab()
                updateInnerStyle(0)
            }
            )
            val stopVisibleWatch = watch(fun(): Boolean {
                return props.visible
            }
            , fun(v: Boolean){
                if (!v) {
                    return
                }
                setTimeout(fun(){
                    moveToActiveTab()
                    updateInnerStyle(0)
                }
                , 100)
            }
            )
            val updateTrackPosition = fun(progress: Number){
                if (!props.syncSwiper || !props.showLine || progress == 0 || isInteracting.value) {
                    return
                }
                updateDuration(0)
                val currentIdx = currentIndex.value
                val next = fun(){
                    val direction = if (progress > 0) {
                        1
                    } else {
                        -1
                    }
                    val nextIdx = currentIdx + direction
                    if (nextIdx < 0 || nextIdx >= tabRects.value.length) {
                        return
                    }
                    val currentTab = tabRects.value[currentIdx]
                    val nextTab = tabRects.value[nextIdx]
                    val ratio = Math.abs(progress)
                    val currentPos = currentTab.left + (currentTab.width - trackLineWidth.value) / 2
                    val nextPos = nextTab.left + (nextTab.width - trackLineWidth.value) / 2
                    val newPosition = if (direction > 0) {
                        currentPos + (nextPos - currentPos) * ratio
                    } else {
                        currentPos - (currentPos - nextPos) * ratio
                    }
                    nextTick(fun(){
                        trackRef.value?.style?.setProperty("transform", "translateX(" + newPosition + "px)")
                    }
                    )
                }
                measureTabs().then(next)
            }
            watch(fun(): Number {
                return props.swiperProgress
            }
            , fun(progress: Number){
                updateTrackPosition(progress)
            }
            )
            onMounted(fun(){
                nextTick(fun(){
                    setTimeout(fun(){
                        if (tabs.value.length == 0) {
                            return
                        }
                        moveToActiveTab()
                        updateInnerStyle(0)
                    }
                    , 100)
                }
                )
            }
            )
            onUnmounted(fun(){
                stopWatch()
                stopValueWatch()
                stopVisibleWatch()
            }
            )
            provide("LimeTabs", children)
            return fun(): Any? {
                val _component_l_badge = resolveEasyComponent("l-badge", GenUniModulesLimeBadgeComponentsLBadgeLBadgeClass)
                return createElementVNode("view", utsMapOf("class" to "l-tabs"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "l-tabs__wrap", "style" to normalizeStyle(utsArrayOf(
                        unref(styles),
                        _ctx.lStyle
                    ))), utsArrayOf(
                        renderSlot(_ctx.`$slots`, "left"),
                        createElementVNode("scroll-view", utsMapOf("class" to normalizeClass(utsArrayOf(
                            "l-tabs__scroll",
                            utsMapOf("l-tabs__scroll--split" to _ctx.split)
                        )), "ref_key" to "scrollRef", "ref" to scrollRef, "scroll-left" to unref(scrollLeft), "direction" to "horizontal", "scroll-x" to true, "scroll-with-animation" to true, "show-scrollbar" to false, "enhanced" to true, "onScroll" to onScroll), utsArrayOf(
                            createElementVNode(Fragment, null, RenderHelpers.renderList(unref(tabs), fun(item, index, __index, _cached): Any {
                                return createElementVNode("view", utsMapOf("class" to normalizeClass(utsArrayOf(
                                    "l-tabs__item",
                                    utsMapOf("l-tabs__item--active" to (index == unref(currentIndex)), "l-tabs__item--evenly" to _ctx.spaceEvenly, "l-tabs__item--disabled" to item.disabled)
                                )), "key" to index, "style" to normalizeStyle(utsArrayOf(
                                    unref(itemStyle)
                                )), "onClick" to fun(){
                                    onClick(index, item)
                                }
                                ), utsArrayOf(
                                    renderSlot(_ctx.`$slots`, "label", GenUniModulesLimeTabsComponentsLTabsLTabsSlotDataLabel(item = item, active = (index == unref(currentIndex)), disabled = item.disabled), fun(): UTSArray<Any> {
                                        return utsArrayOf(
                                            if (isTrue(item.dot == true || item.badge != null)) {
                                                createVNode(_component_l_badge, utsMapOf("key" to 0, "dot" to item.dot, "offset" to item.offset, "content" to item.badge), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                    return utsArrayOf(
                                                        createElementVNode("text", utsMapOf("style" to normalizeStyle(utsArrayOf(
                                                            unref(textStyles),
                                                            if (!item.disabled && _ctx.color != null && index != unref(currentIndex)) {
                                                                ("color:" + _ctx.color)
                                                            } else {
                                                                ""
                                                            },
                                                            if (!item.disabled && _ctx.activeColor != null && index == unref(currentIndex)) {
                                                                "color:" + _ctx.activeColor
                                                            } else {
                                                                ""
                                                            }
                                                        )), "class" to normalizeClass(utsArrayOf(
                                                            "l-tabs__item-text",
                                                            utsArrayOf(
                                                                "l-tabs__item-text--" + _ctx.size,
                                                                utsMapOf("l-tabs__item-text--disabled" to item.disabled, "l-tabs__item-text--active" to (index == unref(currentIndex)))
                                                            )
                                                        ))), toDisplayString(item.label), 7)
                                                    )
                                                }), "_" to 2), 1032, utsArrayOf(
                                                    "dot",
                                                    "offset",
                                                    "content"
                                                ))
                                            } else {
                                                createElementVNode("text", utsMapOf("key" to 1, "style" to normalizeStyle(utsArrayOf(
                                                    unref(textStyles),
                                                    if (!item.disabled && _ctx.color != null && index != unref(currentIndex)) {
                                                        ("color:" + _ctx.color)
                                                    } else {
                                                        ""
                                                    }
                                                    ,
                                                    if (!item.disabled && _ctx.activeColor != null && index == unref(currentIndex)) {
                                                        "color:" + _ctx.activeColor
                                                    } else {
                                                        ""
                                                    }
                                                )), "class" to normalizeClass(utsArrayOf(
                                                    "l-tabs__item-text",
                                                    utsArrayOf(
                                                        "l-tabs__item-text--" + _ctx.size,
                                                        utsMapOf("l-tabs__item-text--disabled" to item.disabled, "l-tabs__item-text--active" to (index == unref(currentIndex)))
                                                    )
                                                ))), toDisplayString(item.label), 7)
                                            }
                                        )
                                    }
                                    )
                                ), 14, utsArrayOf(
                                    "onClick"
                                ))
                            }
                            ), 128),
                            createElementVNode("view", utsMapOf("ref_key" to "trackRef", "ref" to trackRef, "style" to normalizeStyle(utsArrayOf(
                                unref(trackStyle)
                            )), "class" to "l-tabs__track"), null, 4)
                        ), 42, utsArrayOf(
                            "scroll-left"
                        )),
                        renderSlot(_ctx.`$slots`, "right")
                    ), 4),
                    if (_ctx.`$slots`["default"] != null) {
                        createElementVNode("view", utsMapOf("key" to 0, "class" to normalizeClass(utsArrayOf(
                            "l-tabs__content",
                            utsMapOf("l-tabs__content--animated" to _ctx.animated)
                        )), "onTouchstart" to onTouchStart, "onTouchmove" to onTouchMove, "onTouchend" to onTouchEnd, "onTouchcancel" to onTouchEnd), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "l-tabs__content-inner", "style" to normalizeStyle(utsArrayOf(
                                innerStyle
                            )), "ref_key" to "innerRef", "ref" to innerRef), utsArrayOf(
                                renderSlot(_ctx.`$slots`, "default")
                            ), 4)
                        ), 34)
                    } else {
                        createCommentVNode("v-if", true)
                    }
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
                return utsMapOf("l-tabs" to padStyleMapOf(utsMapOf("position" to "relative", "backgroundImage" to "none", "backgroundColor" to "#FFFFFF")), "l-tabs__wrap" to padStyleMapOf(utsMapOf("flex" to 1, "backgroundImage" to "none", "backgroundColor" to "#FFFFFF", "flexDirection" to "row")), "l-tabs__scroll" to padStyleMapOf(utsMapOf("position" to "relative", "flex" to 1, "flexDirection" to "row")), "l-tabs__scroll--split" to padStyleMapOf(utsMapOf("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#eeeeee")), "l-tabs__nav" to padStyleMapOf(utsMapOf("flexDirection" to "row", "position" to "relative", "flexWrap" to "nowrap", "alignItems" to "center")), "l-tabs__track" to padStyleMapOf(utsMapOf("position" to "absolute", "zIndex" to 1, "transitionDuration" to "0.3s", "backgroundColor" to "#3283ff", "left" to 0, "bottom" to "1rpx", "width" to "32rpx", "height" to "6rpx", "borderTopLeftRadius" to "8rpx", "borderTopRightRadius" to "8rpx", "borderBottomRightRadius" to "8rpx", "borderBottomLeftRadius" to "8rpx")), "l-tabs__content" to padStyleMapOf(utsMapOf("width" to "100%", "overflow" to "hidden")), "l-tabs__content-inner" to utsMapOf("" to utsMapOf("display" to "flex", "flexDirection" to "row", "flex" to 1, "overflow" to "visible", "opacity" to 0), ".l-tabs__content--animated " to utsMapOf("position" to "relative", "width" to "100%", "height" to "100%", "transitionProperty" to "transform")), "l-tabs__item" to padStyleMapOf(utsMapOf("position" to "relative", "flex" to "none", "alignItems" to "center", "justifyContent" to "center", "paddingTop" to 0, "paddingRight" to "32rpx", "paddingBottom" to 0, "paddingLeft" to "32rpx", "boxSizing" to "border-box", "overflow" to "hidden", "height" to "96rpx")), "l-tabs__item-text" to padStyleMapOf(utsMapOf("fontWeight" to "400", "fontSize" to 14, "whiteSpace" to "nowrap", "transitionProperty" to "color", "transitionDuration" to "300ms", "color" to "rgba(0,0,0,0.88)")), "l-tabs__item-text--large" to padStyleMapOf(utsMapOf("fontSize" to 16)), "l-tabs__item-text--active" to padStyleMapOf(utsMapOf("fontWeight" to "700", "color" to "#3283ff")), "l-tabs__item-text--disabled" to padStyleMapOf(utsMapOf("color" to "rgba(0,0,0,0.25)")), "l-tabs__item--evenly" to padStyleMapOf(utsMapOf("flex" to 1)), "@TRANSITION" to utsMapOf("l-tabs__track" to utsMapOf("duration" to "0.3s"), "l-tabs__content-inner" to utsMapOf("property" to "transform"), "l-tabs__item-text" to utsMapOf("property" to "color", "duration" to "300ms")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf("change" to null, "click" to null, "update:modelValue" to null)
        var props = normalizePropsOptions(utsMapOf("list" to utsMapOf("type" to "Array", "required" to false), "ellipsis" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "animated" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "duration" to utsMapOf("type" to "Number", "required" to true, "default" to 0.3), "showLine" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "size" to utsMapOf("type" to "String", "required" to true, "default" to "medium"), "spaceEvenly" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "swipeable" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "value" to utsMapOf("type" to "Number", "required" to false), "color" to utsMapOf("type" to "String", "required" to false), "activeColor" to utsMapOf("type" to "String", "required" to false), "lineColor" to utsMapOf("type" to "String", "required" to false), "lineWidth" to utsMapOf("type" to "String", "required" to false), "lineHeight" to utsMapOf("type" to "String", "required" to false), "bgColor" to utsMapOf("type" to "String", "required" to false), "fontSize" to utsMapOf("type" to "String", "required" to false), "padding" to utsMapOf("type" to "String", "required" to false), "split" to utsMapOf("type" to "Boolean", "required" to true, "default" to true), "visible" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "swiperProgress" to utsMapOf("type" to "Number", "required" to true, "default" to 0), "syncSwiper" to utsMapOf("type" to "Boolean", "required" to true, "default" to false), "lStyle" to utsMapOf("type" to utsArrayOf(
            "String",
            "UTSJSONObject"
        ), "required" to false), "modelValue" to utsMapOf("type" to "Number")))
        var propsNeedCastKeys = utsArrayOf(
            "ellipsis",
            "animated",
            "duration",
            "showLine",
            "size",
            "spaceEvenly",
            "swipeable",
            "split",
            "visible",
            "swiperProgress",
            "syncSwiper"
        )
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
