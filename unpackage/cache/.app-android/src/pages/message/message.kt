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
open class GenPagesMessageMessage : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMessageMessage) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMessageMessage
            val _cache = __ins.renderCache
            val checkIns = ref(_uA(
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
                day.prefix = ""
                val specialDates = Set<Number>(_uA(
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
                console.log(time, " at pages/message/message.uvue:143")
            }
            val select = fun(day: LDay){
                today.value = dayuts(day.fullDate).format("YYYY-MM-DD")
                console.log(today.value, " at pages/message/message.uvue:150")
                currentDay.value = Date(today.value).getTime()
                showCalendar.value = false
            }
            val change = fun(res: LYearMonth){
                console.log("res", res, " at pages/message/message.uvue:155")
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
            val radioItems = ref(_uA<RadioItem>(RadioItem(deviceTitle = "设备信息", iccid = "1123456667777887", cardid = "13000001111", cardState = "在用", currentPackage = "店长推荐【终身流量】", useDate = "2025-07-07", percent = 50, total = "100"), RadioItem(deviceTitle = "设备信息1", iccid = "1123456667777888", cardid = "13000001111", cardState = "停机", currentPackage = "店长推荐【100G流量】", useDate = "2025-07-08", percent = 70, total = "200"), RadioItem(deviceTitle = "设备信息2", cardid = "13000001111", iccid = "310203030443", cardState = "注销", currentPackage = "加油包", useDate = "2025-07-09", percent = 100, total = "300")))
            val getValue = fun(e: String){
                val selectedItem = radioItems.value.find(fun(item): Boolean {
                    return item.iccid == e
                }
                )
                if (selectedItem != null) {
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
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "data-strip"), _uA(
                        _cE("view", _uM("class" to "rili"), _uA(
                            _cV(_component_l_date_strip, _uM("format" to customFormat, "switchMode" to "week", "value" to currentDay.value, "minDate" to unref(minDate), "height" to "95rpx", "shape" to "square", "onChange" to onChange), null, 8, _uA(
                                "value",
                                "minDate"
                            ))
                        )),
                        _cE("image", _uM("class" to "down", "onClick" to ShowCalendar, "src" to "/static/down.png"))
                    )),
                    _cE("view", _uM("class" to "content-box"), _uA(
                        _cE("view", _uM("class" to "sub-nav"), _uA(
                            _cE("view", _uM("class" to "today", "onClick" to showMoreDevice), _uA(
                                _cE("text", null, "设备编号"),
                                _cE("image", _uM("class" to "down", "src" to "/static/down.png"))
                            )),
                            _cE("view", _uM("class" to "select"), _uA(
                                _cE("image", _uM("class" to "notice", "src" to default2, "onClick" to msgSystem))
                            ))
                        )),
                        _cE("view", _uM("class" to "tab-content"), _uA(
                            _cE("view", _uM("class" to "item-content"), _uA(
                                _cE("view", _uM("class" to "title-box"), _uA(
                                    _cE("text", _uM("class" to "title"), "设备名称"),
                                    _cE("view", _uM("class" to "more", "onClick" to deviceDetail), _uA(
                                        _cE("text", null, "更多"),
                                        _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "20"))
                                    ))
                                )),
                                _cE("view", _uM("class" to "item-detail"), _uA(
                                    _cE("view", _uM("class" to "item-left"), _uA(
                                        _cE("image", _uM("class" to "device-img", "src" to default3)),
                                        _cE("view", _uM("class" to "item-info"), _uA(
                                            _cE("text", null, "人形侦测"),
                                            _cE("text", null, "15:29")
                                        ))
                                    )),
                                    _cE("image", _uM("class" to "item-icon", "mode" to "aspectFit", "src" to default4))
                                ))
                            )),
                            _cE("view", _uM("class" to "item-content"), _uA(
                                _cE("view", _uM("class" to "title-box"), _uA(
                                    _cE("text", _uM("class" to "title"), "设备名称1"),
                                    _cE("view", _uM("class" to "more"), _uA(
                                        _cE("text", null, "更多"),
                                        _cV(_component_l_icon, _uM("name" to "chevron-right", "size" to "20"))
                                    ))
                                )),
                                _cE("view", _uM("class" to "item-detail"), _uA(
                                    _cE("view", _uM("class" to "item-left"), _uA(
                                        _cE("image", _uM("class" to "device-img", "src" to default3)),
                                        _cE("view", _uM("class" to "item-info"), _uA(
                                            _cE("text", null, "移动侦测"),
                                            _cE("text", null, "15:29")
                                        ))
                                    )),
                                    _cE("image", _uM("class" to "item-icon", "mode" to "aspectFit", "src" to default5))
                                ))
                            ))
                        ))
                    )),
                    _cV(_component_fui_bottom_popup, _uM("visible" to showCalendar.value, "onClose" to hideCalendar), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "calendar-box"), _uA(
                                _cV(_component_l_daily_punch, _uM("signedDates" to checkIns.value, "onSelect" to select, "onPanelChange" to change, "dayHeight" to 60), null, 8, _uA(
                                    "signedDates"
                                )),
                                _cE("button", _uM("class" to "btn-chanel-box", "onClick" to hideCalendar), " 取消 ")
                            ))
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "visible"
                    )),
                    _cV(_component_fui_bottom_popup, _uM("visible" to isShowMoreDevice.value, "onClose" to closePopup), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE("view", _uM("class" to "fui-scroll__wrap"), _uA(
                                _cE("view", _uM("class" to "popup-title"), _uA(
                                    _cE("text", null, "设备列表"),
                                    _cE("view", _uM("onClick" to closePopup), _uA(
                                        _cV(_component_fui_icon, _uM("name" to "close", "size" to 40))
                                    ))
                                )),
                                _cV(_component_fui_radio_group, _uM("onChange" to getValue), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE(Fragment, null, RenderHelpers.renderList(radioItems.value, fun(item, index, __index, _cached): Any {
                                            return _cV(_component_fui_label, _uM("key" to index), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                return _uA(
                                                    _cV(_component_fui_list_cell, null, _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                                        return _uA(
                                                            _cE("view", _uM("class" to "fui-list__cell"), _uA(
                                                                _cE("text", null, _tD(item.deviceTitle), 1),
                                                                _cV(_component_fui_radio, _uM("checked" to item.checked, "value" to item.iccid), null, 8, _uA(
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
                    ), "_" to 1), 8, _uA(
                        "visible"
                    ))
                ))
            }
        }
        val styles: Map<String, Map<String, Map<String, Any>>> by lazy {
            _nCS(_uA(
                styles0
            ), _uA(
                GenApp.styles
            ))
        }
        val styles0: Map<String, Map<String, Map<String, Any>>>
            get() {
                return _uM("container" to _pS(_uM("width" to "100%", "height" to "100%", "position" to "relative", "backgroundColor" to "#f3f3f3")), "data-strip" to _uM(".container " to _uM("width" to "100%", "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "backgroundColor" to "#ffffff", "paddingRight" to "20rpx")), "rili" to _uM(".container .data-strip " to _uM("flex" to 3, "height" to "95rpx")), "down" to _uM(".container .data-strip " to _uM("width" to "32rpx", "height" to "32rpx"), ".container .content-box .sub-nav .today " to _uM("width" to "25rpx", "height" to "25rpx")), "content-box" to _uM(".container " to _uM("paddingTop" to "30rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to "20rpx")), "sub-nav" to _uM(".container .content-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "today" to _uM(".container .content-box .sub-nav " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "width" to "140rpx")), "notice" to _uM(".container .content-box .sub-nav .select " to _uM("width" to "48rpx", "height" to "48rpx")), "tab-content" to _uM(".container .content-box " to _uM("width" to "100%", "display" to "flex", "flexDirection" to "column", "alignItems" to "center")), "item-content" to _uM(".container .content-box .tab-content " to _uM("width" to "100%", "backgroundColor" to "#ffffff", "paddingTop" to "30rpx", "paddingRight" to "30rpx", "paddingBottom" to "30rpx", "paddingLeft" to "30rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "marginTop" to "30rpx")), "title-box" to _uM(".container .content-box .tab-content .item-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "marginBottom" to "30rpx")), "title" to _uM(".container .content-box .tab-content .item-content .title-box " to _uM("fontSize" to "30rpx", "color" to "#333333", "fontWeight" to "bold")), "more" to _uM(".container .content-box .tab-content .item-content .title-box " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-detail" to _uM(".container .content-box .tab-content .item-content " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")), "item-left" to _uM(".container .content-box .tab-content .item-content .item-detail " to _uM("display" to "flex", "flexDirection" to "row")), "device-img" to _uM(".container .content-box .tab-content .item-content .item-detail .item-left " to _uM("width" to "200rpx", "height" to "100rpx", "marginRight" to "20rpx")), "item-info" to _uM(".container .content-box .tab-content .item-content .item-detail .item-left " to _uM("display" to "flex", "flexDirection" to "column", "alignItems" to "flex-start", "justifyContent" to "space-between")), "item-icon" to _uM(".container .content-box .tab-content .item-content .item-detail " to _uM("width" to "50rpx", "height" to "50rpx")), "calendar-box" to _uM(".container " to _uM("width" to "100%", "backgroundColor" to "#ffffff")), "btn-chanel-box" to _uM(".container .calendar-box " to _uM("position" to "absolute", "width" to "85%", "bottom" to "45rpx", "left" to "60rpx", "borderTopLeftRadius" to "50rpx", "borderTopRightRadius" to "50rpx", "borderBottomRightRadius" to "50rpx", "borderBottomLeftRadius" to "50rpx")), "popup-title" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "paddingTop" to 0, "paddingRight" to "40rpx", "paddingBottom" to 0, "paddingLeft" to "40rpx")), "fui-scroll__wrap" to _uM(".container " to _uM("width" to "100%", "paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0, "position" to "relative")), "fui-sub__title" to _uM(".container " to _uM("textAlign" to "center", "fontSize" to "24rpx", "color" to "#7F7F7F", "transform" to "scale(0.9)")), "fui-scroll__view" to _uM(".container " to _uM("width" to "100%", "height" to "50%")), "fui-list__cell" to _uM(".container " to _uM("flex" to 1, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
