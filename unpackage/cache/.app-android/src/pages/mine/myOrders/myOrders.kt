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
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesMineMyOrdersMyOrders : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesMineMyOrdersMyOrders) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesMineMyOrdersMyOrders
            val _cache = __ins.renderCache
            val tabVal = ref(0)
            val tabsVal = ref(_uA<tabItem>(tabItem(id = "0", title = "全部", content = _uA()), tabItem(id = "1", title = "待付款", content = _uA()), tabItem(id = "2", title = "已完成", content = _uA()), tabItem(id = "3", title = "已取消", content = _uA()), tabItem(id = "4", title = "退款", content = _uA())))
            val content = ref(_uA<ContentType>(ContentType(id = "1111", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已完成", iccid = "89862235957372384387456", isPay = "2"), ContentType(id = "1112", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已取消", iccid = "89862235957372384387454", isPay = "3"), ContentType(id = "1113", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "待付款", iccid = "89862235957372384387467", isPay = "1"), ContentType(id = "1114", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已退款", iccid = "89862235957372384387465", isPay = "4"), ContentType(id = "1115", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已退款", iccid = "89862235957372384387465", isPay = "4")))
            val getFilteredEvents = fun(): UTSArray<ContentType> {
                if (tabVal.value == 0) {
                    return content.value.slice()
                }
                val selectedType = tabsVal.value[tabVal.value].id
                return content.value.filter(fun(event): Boolean {
                    return event.isPay == selectedType
                }
                )
            }
            val changeTab = fun(kVal: Number){
                tabVal.value = kVal
            }
            val goDetail = fun(id: String){
                uni_navigateTo(NavigateToOptions(url = "/pages/mine/myOrders/orderDetail/orderDetail?id=" + id))
            }
            val goPay = fun(){
                uni_showToast(ShowToastOptions(title = "去付款", icon = "none"))
            }
            return fun(): Any? {
                val _component_fui_button = resolveEasyComponent("fui-button", GenUniModulesFirstuiUnixComponentsFuiButtonFuiButtonClass)
                val _component_l_tab_panel = resolveEasyComponent("l-tab-panel", GenUniModulesLimeTabsComponentsLTabPanelLTabPanelClass)
                val _component_l_tabs = resolveEasyComponent("l-tabs", GenUniModulesLimeTabsComponentsLTabsLTabsClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(_component_l_tabs, _uM("value" to tabVal.value, "onClick" to changeTab, "bgColor" to "transparent", "color" to "#000000", "activeColor" to "#FF5722"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return _uA(
                            _cE(Fragment, null, RenderHelpers.renderList(tabsVal.value, fun(item, index, __index, _cached): Any {
                                return _cV(_component_l_tab_panel, _uM("key" to index, "value" to index, "label" to item.title), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        _cE(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), fun(item, index, __index, _cached): Any {
                                            return _cE("view", _uM("class" to "list-item", "key" to index), _uA(
                                                _cE("view", _uM("onClick" to fun(){
                                                    goDetail(item.id)
                                                }
                                                ), _uA(
                                                    _cE("view", _uM("class" to "title-state"), _uA(
                                                        _cE("text", _uM("class" to "title-style"), _tD(item.title), 1),
                                                        _cE("text", _uM("class" to "state-style"), _tD(item.state), 1)
                                                    )),
                                                    _cE("view", _uM("class" to "device-type"), _uA(
                                                        _cE("text", null, "办公室设备"),
                                                        _cE("text", null, "ICCID " + _tD(item.iccid), 1)
                                                    )),
                                                    _cE("view", _uM("class" to "date-price"), _uA(
                                                        _cE("text", null, _tD(item.date), 1),
                                                        _cE("text", _uM("class" to "price"), _tD(item.price), 1)
                                                    ))
                                                ), 8, _uA(
                                                    "onClick"
                                                )),
                                                if (item.isPay == "1") {
                                                    _cE("view", _uM("key" to 0, "class" to "btn"), _uA(
                                                        _cV(_component_fui_button, _uM("text" to "去付款", "type" to "primary", "width" to "120rpx", "height" to "50rpx", "size" to 24, "onClick" to goPay))
                                                    ))
                                                } else {
                                                    _cC("v-if", true)
                                                }
                                            ))
                                        }
                                        ), 128)
                                    )
                                }
                                ), "_" to 2), 1032, _uA(
                                    "value",
                                    "label"
                                ))
                            }
                            ), 128)
                        )
                    }
                    ), "_" to 1), 8, _uA(
                        "value"
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
                return _uM("container" to _pS(_uM("width" to "100%", "height" to "100%", "backgroundColor" to "#F5F5F5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "l-tabs" to _uM(".container " to _uM("!backgroundColor" to "rgba(0,0,0,0)")), "list-item" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "30rpx", "paddingBottom" to "20rpx", "paddingLeft" to "30rpx", "marginTop" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "title-state" to _uM(".container .list-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "date-price" to _uM(".container .list-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "device-type" to _uM(".container .list-item " to _uM("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "title-style" to _uM(".container .list-item .title-state " to _uM("fontSize" to "30rpx", "color" to "#000000", "fontWeight" to "bold"), ".container .list-item .date-price " to _uM("fontSize" to "30rpx", "color" to "#000000", "fontWeight" to "bold"), ".container .list-item .device-type " to _uM("fontSize" to "30rpx", "color" to "#000000", "fontWeight" to "bold")), "state-style" to _uM(".container .list-item .title-state " to _uM("fontSize" to "24rpx", "color" to "#FF5722"), ".container .list-item .date-price " to _uM("fontSize" to "24rpx", "color" to "#FF5722"), ".container .list-item .device-type " to _uM("fontSize" to "24rpx", "color" to "#FF5722")), "price" to _uM(".container .list-item .date-price " to _uM("fontSize" to "38rpx")), "btn" to _uM(".container .list-item " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-end", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
