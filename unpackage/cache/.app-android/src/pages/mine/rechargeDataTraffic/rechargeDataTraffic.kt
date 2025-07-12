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
import uts.sdk.modules.limeClipboard.SetClipboardDataOption as SetClipboardDataOption_1
import uts.sdk.modules.limeClipboard.setClipboardData
import uts.sdk.modules.limeClipboard.getClipboardData
import uts.sdk.modules.limeClipboard.SetClipboardDataOption
import uts.sdk.modules.limeClipboard.GetClipboardDataOption
import uts.sdk.modules.limeClipboard.GetClipboardDataSuccessCallbackOption
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineRechargeDataTrafficRechargeDataTraffic : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineRechargeDataTrafficRechargeDataTraffic) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineRechargeDataTrafficRechargeDataTraffic
            val _cache = __ins.renderCache
            val totalDevice = ref<Number>(4)
            val percent = ref<Number>(50)
            val isShow = ref<Boolean>(false)
            val currentDeviceInfo = ref<RadioItem1>(RadioItem1(deviceTitle = "", iccid = "", cardid = "", cardState = "", currentPackage = "", useDate = "", percent = 0, total = "", checked = true))
            val radioItems = ref(_uA<RadioItem1>(RadioItem1(deviceTitle = "设备信息", iccid = "1123456667777887", cardid = "13000001111", cardState = "在用", currentPackage = "店长推荐【终身流量】", useDate = "2025-07-07", percent = 50, total = "100"), RadioItem1(deviceTitle = "设备信息1", iccid = "1123456667777888", cardid = "13000001111", cardState = "停机", currentPackage = "店长推荐【100G流量】", useDate = "2025-07-08", percent = 70, total = "200"), RadioItem1(deviceTitle = "设备信息2", cardid = "13000001111", iccid = "310203030443", cardState = "注销", currentPackage = "加油包", useDate = "2025-07-09", percent = 100, total = "300")))
            val getValue = fun(e: String){
                val selectedItem = radioItems.value.find(fun(item): Boolean {
                    return item.iccid == e
                }
                )
                if (selectedItem != null) {
                    selectedItem.checked = true
                    currentDeviceInfo.value = selectedItem
                }
                uni_showToast(ShowToastOptions(title = "更换成功", icon = "none"))
            }
            val currentInfo = fun(){
                radioItems.value.forEach(fun(item){
                    item.checked = false
                }
                )
                radioItems.value[0].checked = true
                currentDeviceInfo.value = radioItems.value[0]
            }
            val showPopup = fun(){
                isShow.value = true
            }
            val closePopup = fun(){
                isShow.value = false
            }
            val submit = fun(){
                uni_showToast(ShowToastOptions(title = "去充值", icon = "none"))
            }
            val copyRight = fun(){
                setClipboardData(SetClipboardDataOption_1(data = currentDeviceInfo.value.iccid, success = fun(_res) {
                    uni_showToast(ShowToastOptions(title = "复制成功", icon = "none"))
                }
                ))
            }
            onMounted(fun(){
                currentInfo()
            }
            )
            return fun(): Any? {
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_l_progress = resolveEasyComponent("l-progress", GenUniModulesLimeProgressComponentsLProgressLProgressClass)
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                val _component_fui_radio = resolveEasyComponent("fui-radio", GenUniModulesFirstuiUnixComponentsFuiRadioFuiRadioClass)
                val _component_fui_list_cell = resolveEasyComponent("fui-list-cell", GenUniModulesFirstuiUnixComponentsFuiListCellFuiListCellClass)
                val _component_fui_label = resolveEasyComponent("fui-label", GenUniModulesFirstuiUnixComponentsFuiLabelFuiLabelClass)
                val _component_fui_radio_group = resolveEasyComponent("fui-radio-group", GenUniModulesFirstuiUnixComponentsFuiRadioGroupFuiRadioGroupClass)
                val _component_fui_bottom_popup = resolveEasyComponent("fui-bottom-popup", GenUniModulesFirstuiUnixComponentsFuiBottomPopupFuiBottomPopupClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cE("view", _uM("class" to "device-total"), _uA(
                        _cE("view", _uM("class" to "device-total-title"), _uA(
                            _cE("text", null, "充值设备"),
                            _cE("text", _uM("class" to "device-total-title-color"), "（共" + _tD(totalDevice.value) + "台设备）", 1)
                        )),
                        _cE("view", _uM("class" to "device-total-title"), _uA(
                            _cE("text", _uM("onClick" to showPopup), "更换设备"),
                            _cV(_component_fui_icon, _uM("name" to "arrowright", "size" to 50))
                        ))
                    )),
                    _cE("view", _uM("class" to "device-info-box"), _uA(
                        _cE("text", _uM("class" to "device-title"), "设备信息"),
                        _cE("view", _uM("class" to "device-info-item"), _uA(
                            _cE("text", null, "ICCID"),
                            _cE("view", _uM("class" to "iccid-info"), _uA(
                                _cE("text", null, _tD(currentDeviceInfo.value.iccid), 1),
                                _cV(_component_fui_icon, _uM("name" to "info", "size" to 40, "onOnclick" to copyRight))
                            ))
                        )),
                        _cE("view", _uM("class" to "device-info-item"), _uA(
                            _cE("text", null, "卡号"),
                            _cE("text", null, _tD(currentDeviceInfo.value.cardid), 1)
                        )),
                        _cE("view", _uM("class" to "device-info-item"), _uA(
                            _cE("text", null, "卡片状态"),
                            _cE("text", null, _tD(currentDeviceInfo.value.cardState), 1)
                        )),
                        _cE("view", _uM("class" to "device-info-item"), _uA(
                            _cE("text", null, "当前套餐"),
                            _cE("text", null, _tD(currentDeviceInfo.value.currentPackage), 1)
                        )),
                        _cE("view", _uM("class" to "device-info-item add-style"), _uA(
                            _cE("text", null, "生效日期"),
                            _cE("text", null, _tD(currentDeviceInfo.value.useDate), 1)
                        )),
                        _cE("text", null, "流量"),
                        _cE("view", _uM("class" to "progess"), _uA(
                            _cV(_component_l_progress, _uM("percent" to currentDeviceInfo.value.percent, "show-info" to true), null, 8, _uA(
                                "percent"
                            ))
                        )),
                        _cE("view", _uM("class" to "device-info-item"), _uA(
                            _cE("text", null, "已用50G(50%)"),
                            _cE("text", null, "可用50G(共100G)")
                        ))
                    )),
                    _cE("view", _uM("class" to "btn-box"), _uA(
                        _cV(_component_fui_button, _uM("color" to "#fff", "text" to "去充值", "background" to "#1296db", "height" to "80rpx", "onOnclick" to submit))
                    )),
                    _cV(_component_fui_bottom_popup, _uM("visible" to isShow.value, "onClose" to closePopup), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
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
                return _uM("container" to _pS(_uM("height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "30rpx", "paddingRight" to "20rpx", "paddingBottom" to "30rpx", "paddingLeft" to "20rpx")), "device-total" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between")), "device-total-title" to _uM(".container .device-total " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "center", "alignItems" to "center")), "device-total-title-color" to _uM(".container .device-total .device-total-title " to _uM("color" to "#999999")), "device-info-box" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx", "paddingTop" to "30rpx", "paddingRight" to "40rpx", "paddingBottom" to "30rpx", "paddingLeft" to "40rpx", "marginTop" to "20rpx", "marginRight" to 0, "marginBottom" to "20rpx", "marginLeft" to 0, "display" to "flex", "flexDirection" to "column")), "device-title" to _uM(".container .device-info-box " to _uM("fontSize" to "35rpx")), "device-info-item" to _uM(".container .device-info-box " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "marginTop" to "20rpx")), "iccid-info" to _uM(".container .device-info-box .device-info-item " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center")), "add-style" to _uM(".container .device-info-box " to _uM("paddingBottom" to "60rpx", "borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#999999", "marginBottom" to "60rpx")), "progess" to _uM(".container .device-info-box " to _uM("marginTop" to "10rpx", "marginRight" to 0, "marginBottom" to "10rpx", "marginLeft" to 0)), "btn-box" to _uM(".container " to _uM("marginTop" to "60rpx")), "popup-title" to _uM(".container " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "paddingTop" to 0, "paddingRight" to "40rpx", "paddingBottom" to 0, "paddingLeft" to "40rpx")), "fui-scroll__wrap" to _uM(".container " to _uM("width" to "100%", "paddingTop" to "30rpx", "paddingRight" to 0, "paddingBottom" to "30rpx", "paddingLeft" to 0, "position" to "relative")), "fui-sub__title" to _uM(".container " to _uM("textAlign" to "center", "fontSize" to "24rpx", "color" to "#7F7F7F", "transform" to "scale(0.9)")), "fui-scroll__view" to _uM(".container " to _uM("width" to "100%", "height" to "50%")), "fui-list__cell" to _uM(".container " to _uM("flex" to 1, "display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
