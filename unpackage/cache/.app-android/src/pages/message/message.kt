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
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
open class GenPagesMessageMessage : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessage) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessage
            val _cache = __ins.renderCache
            val checkIns = ref(utsArrayOf(
                "2025-07-07",
                "2025-07-08",
                "2025-07-09"
            ))
            val today = ref(dayuts().format("MM-DD"))
            val showCalendar = ref<Boolean>(false)
            val isShowMoreDevice = ref<Boolean>(false)
            val currentDay = ref<Number>(Date().getTime())
            val activeTab = ref(0)
            val minDate: Number = Date(2022, 0, 10).getTime()
            val maxDate: Number = Date(2025, 7, 12).getTime()
            val customFormat = fun(day: DateStriPDay): DateStriPDay {
                val date = day.date
                val year = date.getFullYear()
                val month = date.getMonth() + 1
                val curDate = date.getDate()
                console.log(day.key, " at pages/message/message.uvue:130")
                day.prefix = ""
                val specialDates = Set<Number>(utsArrayOf(
                    7,
                    8,
                    10
                ))
                if (specialDates.has(curDate)) {
                    day.suffix = "true"
                }
                return day
            }
            val onChange = fun(time: Number){
                console.log(time, " at pages/message/message.uvue:144")
            }
            val select = fun(day: LDay){
                today.value = dayuts(day.fullDate).format("YYYY-MM-DD")
                console.log(today.value, " at pages/message/message.uvue:151")
                currentDay.value = Date(today.value).getTime()
                showCalendar.value = false
            }
            val change = fun(res: LYearMonth){
                console.log("res", res, " at pages/message/message.uvue:156")
            }
            val ShowCalendar = fun(){
                showCalendar.value = !showCalendar.value
            }
            val hideCalendar = fun(){
                showCalendar.value = false
            }
            val showMoreDevice = fun(){
                isShowMoreDevice.value = true
            }
            val closePopup = fun(){
                isShowMoreDevice.value = false
            }
            val currentDeviceInfo = ref<RadioItem>(RadioItem(deviceTitle = "", iccid = "", cardid = "", cardState = "", currentPackage = "", useDate = "", percent = 0, total = "", checked = true))
            val radioItems = ref(utsArrayOf<RadioItem>(RadioItem(deviceTitle = "设备信息", iccid = "1123456667777887", cardid = "13000001111", cardState = "在用", currentPackage = "店长推荐【终身流量】", useDate = "2025-07-07", percent = 50, total = "100"), RadioItem(deviceTitle = "设备信息1", iccid = "1123456667777888", cardid = "13000001111", cardState = "停机", currentPackage = "店长推荐【100G流量】", useDate = "2025-07-08", percent = 70, total = "200"), RadioItem(deviceTitle = "设备信息2", cardid = "13000001111", iccid = "310203030443", cardState = "注销", currentPackage = "加油包", useDate = "2025-07-09", percent = 100, total = "300")))
            val getValue = fun(e: String){
                val selectedItem = radioItems.value.find(fun(item): Boolean {
                    return item.iccid == e
                }
                )
                if (selectedItem != null) {
                    console.log(selectedItem, " at pages/message/message.uvue:222")
                    selectedItem.checked = true
                    currentDeviceInfo.value = selectedItem
                }
            }
            val currentInfo = fun(){
                radioItems.value.forEach(fun(item){
                    item.checked = false
                }
                )
                radioItems.value[0].checked = true
                currentDeviceInfo.value = radioItems.value[0]
            }
            val deviceDetail = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/message/messageDeviceDetail/messageDeviceDetail"))
            }
            val msgSystem = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/message/messageSystem/messageSystem"))
            }
            onMounted(fun(){
                currentInfo()
            }
            )
            return fun(): Any? {
                val _component_l_date_strip = resolveEasyComponent("l-date-strip", GenUniModulesLimeDateStripComponentsLDateStripLDateStripClass)
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_l_daily_punch = resolveEasyComponent("l-daily-punch", GenUniModulesLimeDailyPunchComponentsLDailyPunchLDailyPunchClass)
                val _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup", GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopupClass)
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_fui_radio = resolveEasyComponent("fui-radio", GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioClass)
                val _component_fui_list_cell = resolveEasyComponent("fui-list-cell", GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCellClass)
                val _component_fui_label = resolveEasyComponent("fui-label", GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelClass)
                val _component_fui_radio_group = resolveEasyComponent("fui-radio-group", GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupClass)
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createElementVNode("view", utsMapOf("class" to "data-strip"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "rili"), utsArrayOf(
                            createVNode(_component_l_date_strip, utsMapOf("format" to customFormat, "switchMode" to "week", "value" to currentDay.value, "minDate" to unref(minDate), "height" to "95rpx", "shape" to "square", "onChange" to onChange), null, 8, utsArrayOf(
                                "value",
                                "minDate"
                            ))
                        )),
                        createElementVNode("image", utsMapOf("class" to "down", "onClick" to ShowCalendar, "src" to "/static/down.png"))
                    )),
                    createElementVNode("view", utsMapOf("class" to "content-box"), utsArrayOf(
                        createElementVNode("view", utsMapOf("class" to "sub-nav"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "today", "onClick" to showMoreDevice), utsArrayOf(
                                createElementVNode("text", null, "设备编号"),
                                createElementVNode("image", utsMapOf("class" to "down", "src" to "/static/down.png"))
                            )),
                            createElementVNode("view", utsMapOf("class" to "select"), utsArrayOf(
                                createElementVNode("image", utsMapOf("class" to "notice", "src" to default2, "onClick" to msgSystem))
                            ))
                        )),
                        createElementVNode("view", utsMapOf("class" to "tab-content"), utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "item-content"), utsArrayOf(
                                createElementVNode("view", utsMapOf("class" to "title-box"), utsArrayOf(
                                    createElementVNode("text", utsMapOf("class" to "title"), "设备名称"),
                                    createElementVNode("view", utsMapOf("class" to "more", "onClick" to deviceDetail), utsArrayOf(
                                        createElementVNode("text", null, "更多"),
                                        createVNode(_component_l_icon, utsMapOf("name" to "chevron-right", "size" to "20"))
                                    ))
                                )),
                                createElementVNode("view", utsMapOf("class" to "item-detail"), utsArrayOf(
                                    createElementVNode("view", utsMapOf("class" to "item-left"), utsArrayOf(
                                        createElementVNode("image", utsMapOf("class" to "device-img", "src" to default3)),
                                        createElementVNode("view", utsMapOf("class" to "item-info"), utsArrayOf(
                                            createElementVNode("text", null, "人形侦测"),
                                            createElementVNode("text", null, "15:29")
                                        ))
                                    )),
                                    createElementVNode("image", utsMapOf("class" to "item-icon", "mode" to "aspectFit", "src" to default4))
                                ))
                            )),
                            createElementVNode("view", utsMapOf("class" to "item-content"), utsArrayOf(
                                createElementVNode("view", utsMapOf("class" to "title-box"), utsArrayOf(
                                    createElementVNode("text", utsMapOf("class" to "title"), "设备名称1"),
                                    createElementVNode("view", utsMapOf("class" to "more"), utsArrayOf(
                                        createElementVNode("text", null, "更多"),
                                        createVNode(_component_l_icon, utsMapOf("name" to "chevron-right", "size" to "20"))
                                    ))
                                )),
                                createElementVNode("view", utsMapOf("class" to "item-detail"), utsArrayOf(
                                    createElementVNode("view", utsMapOf("class" to "item-left"), utsArrayOf(
                                        createElementVNode("image", utsMapOf("class" to "device-img", "src" to default3)),
                                        createElementVNode("view", utsMapOf("class" to "item-info"), utsArrayOf(
                                            createElementVNode("text", null, "移动侦测"),
                                            createElementVNode("text", null, "15:29")
                                        ))
                                    )),
                                    createElementVNode("image", utsMapOf("class" to "item-icon", "mode" to "aspectFit", "src" to default5))
                                ))
                            ))
                        ))
                    )),
                    createVNode(_component_fui_bottom_popup, utsMapOf("visible" to showCalendar.value, "onClose" to hideCalendar), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "calendar-box"), utsArrayOf(
                                createVNode(_component_l_daily_punch, utsMapOf("signedDates" to checkIns.value, "onSelect" to select, "onPanelChange" to change, "dayHeight" to 60), null, 8, utsArrayOf(
                                    "signedDates"
                                )),
                                createElementVNode("button", utsMapOf("class" to "btn-chanel-box", "onClick" to hideCalendar), " 取消 ")
                            ))
                        )
                    }
                    ), "_" to 1), 8, utsArrayOf(
                        "visible"
                    )),
                    createVNode(_component_fui_bottom_popup, utsMapOf("visible" to isShowMoreDevice.value, "onClose" to closePopup), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return utsArrayOf(
                            createElementVNode("view", utsMapOf("class" to "fui-scroll__wrap"), utsArrayOf(
                                createElementVNode("view", utsMapOf("class" to "popup-title"), utsArrayOf(
                                    createElementVNode("text", null, "设备列表"),
                                    createElementVNode("view", utsMapOf("onClick" to closePopup), utsArrayOf(
                                        createVNode(_component_fui_icon, utsMapOf("name" to "close", "size" to 40))
                                    ))
                                )),
                                createVNode(_component_fui_radio_group, utsMapOf("onChange" to getValue), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createElementVNode(Fragment, null, RenderHelpers.renderList(radioItems.value, fun(item, index, __index, _cached): Any {
                                            return createVNode(_component_fui_label, utsMapOf("key" to index), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return utsArrayOf(
                                                    createVNode(_component_fui_list_cell, null, utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return utsArrayOf(
                                                            createElementVNode("view", utsMapOf("class" to "fui-list__cell"), utsArrayOf(
                                                                createElementVNode("text", null, toDisplayString(item.deviceTitle), 1),
                                                                createVNode(_component_fui_radio, utsMapOf("checked" to item.checked, "value" to item.iccid), null, 8, utsArrayOf(
                                                                    "checked",
                                                                    "value"
                                                                ))
                                                            ))
                                                        )
                                                    }
                                                    ), "_" to 2), 1024)
                                                )
                                            }
                                            ), "_" to 2), 1024)
                                        }
                                        ), 128)
                                    )
                                }
                                ), "_" to 1))
                            ))
                        )
                    }
                    ), "_" to 1), 8, utsArrayOf(
                        "visible"
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            normalizeCssStyles(utsArrayOf(
                styles0
            ), utsArrayOf(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "position" to "relative", "backgroundColor" to "#f3f3f3")), "data-strip" to utsMapOf(".container " to utsMapOf("width" to "100%", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "backgroundColor" to "#ffffff", "paddingRight" to "20rpx")), "rili" to utsMapOf(".container .data-strip " to utsMapOf("flex" to 3, "height" to "95rpx")), "down" to utsMapOf(".container .data-strip " to utsMapOf("width" to "32rpx", "height" to "32rpx"), ".container .content-box .sub-nav .today " to utsMapOf("width" to "25rpx", "height" to "25rpx")), "content-box" to utsMapOf(".container " to utsMapOf("paddingTop" to "30rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to "20rpx")), "sub-nav" to utsMapOf(".container .content-box " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "today" to utsMapOf(".container .content-box .sub-nav " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "width" to "140rpx")), "notice" to utsMapOf(".container .content-box .sub-nav .select " to utsMapOf("width" to "48rpx", "height" to "48rpx")), "tab-content" to utsMapOf(".container .content-box " to utsMapOf("width" to "100%", "display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "item-content" to utsMapOf(".container .content-box .tab-content " to utsMapOf("width" to "100%", "backgroundColor" to "#ffffff", "paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginTop" to "30rpx")), "title-box" to utsMapOf(".container .content-box .tab-content .item-content " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginBottom" to "30rpx")), "title" to utsMapOf(".container .content-box .tab-content .item-content .title-box " to utsMapOf("fontSize" to "30rpx", "color" to "#333333", "fontWeight" to "bold")), "more" to utsMapOf(".container .content-box .tab-content .item-content .title-box " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-detail" to utsMapOf(".container .content-box .tab-content .item-content " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-left" to utsMapOf(".container .content-box .tab-content .item-content .item-detail " to utsMapOf("display" to "flex", "flexDirection" to "row")), "device-img" to utsMapOf(".container .content-box .tab-content .item-content .item-detail .item-left " to utsMapOf("width" to "200rpx", "height" to "100rpx", "marginRight" to "20rpx")), "item-info" to utsMapOf(".container .content-box .tab-content .item-content .item-detail .item-left " to utsMapOf("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start", "justifyContent" to "space-between")), "item-icon" to utsMapOf(".container .content-box .tab-content .item-content .item-detail " to utsMapOf("width" to "50rpx", "height" to "50rpx")), "calendar-box" to utsMapOf(".container " to utsMapOf("width" to "100%", "backgroundColor" to "#ffffff")), "btn-chanel-box" to utsMapOf(".container .calendar-box " to utsMapOf("position" to "absolute", "width" to "85%", "bottom" to "45rpx", "left" to "60rpx", "borderTopLeftRadius" to "50rpx", "borderTopRightRadius" to "50rpx", "borderBottomRightRadius" to "50rpx", "borderBottomLeftRadius" to "50rpx")), "popup-title" to utsMapOf(".container " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "paddingTop" to 0, "paddingRight" to "40rpx", "paddingBottom" to 0, "paddingLeft" to "40rpx")), "fui-scroll__wrap" to utsMapOf(".container " to utsMapOf("width" to "100%", "paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0, "position" to "relative")), "fui-sub__title" to utsMapOf(".container " to utsMapOf("textAlign" to "center", "fontSize" to "24rpx", "color" to "#7F7F7F", "transform" to "scale(0.9)")), "fui-scroll__view" to utsMapOf(".container " to utsMapOf("width" to "100%", "height" to "50%")), "fui-list__cell" to utsMapOf(".container " to utsMapOf("flex" to 1, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
