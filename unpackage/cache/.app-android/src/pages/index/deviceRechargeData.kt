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
import io.dcloud.uniapp.extapi.navigateBack as uni_navigateBack
import io.dcloud.uniapp.extapi.navigateTo as uni_navigateTo
import io.dcloud.uniapp.extapi.setClipboardData as uni_setClipboardData
import io.dcloud.uniapp.extapi.showToast as uni_showToast
open class GenPagesIndexDeviceRechargeData : BasePage {
    constructor(__ins: ComponentInternalInstance, __renderer: String?) : super(__ins, __renderer) {}
    companion object {
        @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
        var setup: (__props: GenPagesIndexDeviceRechargeData) -> Any? = fun(__props): Any? {
            val __ins = getCurrentInstance()!!
            val _ctx = __ins.proxy as GenPagesIndexDeviceRechargeData
            val _cache = __ins.renderCache
            val tabVal = ref<Number>(0)
            val percent = ref<Any>(60)
            val selectedPackage = ref<ContentType1?>(null)
            val tabsVal = ref(_uA<tabItem1>(tabItem1(id = "0", title = "订购套餐", content = _uA<ContentType1>()), tabItem1(id = "1", title = "订购加油包", content = _uA<ContentType1>())))
            val content = ref(_uA<ContentType1>(ContentType1(id = "1111", title = "五年畅想套餐", date = "", price = "100", category = "0"), ContentType1(id = "1113", title = "五年畅想套餐", date = "", price = "102", category = "0"), ContentType1(id = "1112", title = "五年畅想套餐111", date = "2025-07-09", price = "230", category = "1"), ContentType1(id = "1114", title = "五年畅想套餐111", date = "2025-07-09", price = "205", category = "1"), ContentType1(id = "1115", title = "五年畅想套餐111", date = "2025-07-09", price = "150", category = "0")))
            val goBack = fun(){
                uni_navigateBack(NavigateBackOptions(delta = 1))
            }
            val rightIcon = fun(){
                uni_navigateTo(NavigateToOptions(url = "/pages/index/deviceRechargeOrder"))
            }
            val copyiccid = fun(){
                uni_setClipboardData(SetClipboardDataOptions(data = "8986112223504991234", success = fun(_){
                    uni_showToast(ShowToastOptions(title = "复制成功"))
                }
                ))
            }
            val getFilteredEvents = fun(): UTSArray<ContentType1> {
                val selectedType = tabsVal.value[tabVal.value].id
                return content.value.filter(fun(event): Boolean {
                    return event.category == selectedType
                }
                )
            }
            val changeTab = fun(kVal: Number){
                tabVal.value = kVal
            }
            val selectPackge = fun(item: ContentType1){
                selectedPackage.value = item
            }
            return fun(): Any? {
                val _component_l_icon = resolveEasyComponent("l-icon", GenUniModulesLimeIconComponentsLIconLIconClass)
                val _component_fui_icon = resolveEasyComponent("fui-icon", GenUniModulesFirstuiUnixComponentsFuiIconFuiIconClass)
                val _component_l_progress = resolveEasyComponent("l-progress", GenUniModulesLimeProgressComponentsLProgressLProgressClass)
                val _component_fui_empty = resolveEasyComponent("fui-empty", GenUniModulesFirstuiUnixComponentsFuiEmptyFuiEmptyClass)
                val _component_l_tab_panel = resolveEasyComponent("l-tab-panel", GenUniModulesLimeTabsComponentsLTabPanelLTabPanelClass)
                val _component_l_tabs = resolveEasyComponent("l-tabs", GenUniModulesLimeTabsComponentsLTabsLTabsClass)
                val _component_l_button = resolveEasyComponent("l-button", GenUniModulesLimeButtonComponentsLButtonLButtonClass)
                return _cE("view", _uM("class" to "container"), _uA(
                    _cV(unref(GenComponentsTopNavBarClass), _uM("title" to "流量充值", "onBack" to goBack, "onRightEvent" to rightIcon, "showBack" to true, "rightText" to "order")),
                    _cE("view", _uM("class" to "content"), _uA(
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "ICCID"),
                            _cE("view", _uM("class" to "right-item"), _uA(
                                _cE("text", null, "8986112223504991234"),
                                _cV(_component_l_icon, _uM("style" to _nS(_uM("margin-left" to "10rpx")), "name" to "file-copy", "size" to "20", "onClick" to copyiccid), null, 8, _uA(
                                    "style"
                                ))
                            ))
                        )),
                        _cE("view", _uM("class" to "list underline"), _uA(
                            _cE("text", null, "卡号"),
                            _cE("view", _uM("class" to "right-item"), _uA(
                                _cE("text", null, "8986112223504991234"),
                                _cE("text", _uM("style" to _nS(_uM("color" to "#FF4D4F"))), "[停用]", 4)
                            ))
                        )),
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "当前套餐"),
                            _cE("view", _uM("class" to "right-item"), _uA(
                                _cE("text", null, "店长推荐"),
                                _cE("text", null, "[终身流量]")
                            ))
                        )),
                        _cE("view", _uM("class" to "list underline"), _uA(
                            _cE("text", null, "生效日期"),
                            _cE("text", null, "套餐将于 2025-5-13 到期")
                        )),
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "流量 - 异常"),
                            _cV(_component_fui_icon, _uM("name" to "right", "size" to "50"))
                        )),
                        _cE("view", _uM("class" to "progress"), _uA(
                            _cV(_component_l_progress, _uM("percent" to percent.value, "info-align" to "end", "show-info" to true), null, 8, _uA(
                                "percent"
                            ))
                        )),
                        _cE("view", _uM("class" to "list"), _uA(
                            _cE("text", null, "已用 60G (60%)"),
                            _cE("text", null, "可用 20G/共100G")
                        ))
                    )),
                    _cE("view", _uM("class" to "package-box"), _uA(
                        _cV(_component_l_tabs, _uM("value" to tabVal.value, "onClick" to changeTab, "spaceEvenly" to false, "bgColor" to "transparent", "color" to "#000", "activeColor" to "#FF5722"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                            return _uA(
                                _cE(Fragment, null, RenderHelpers.renderList(tabsVal.value, fun(item, index, __index, _cached): Any {
                                    return _cV(_component_l_tab_panel, _uM("key" to index, "value" to index, "label" to item.title), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                        return _uA(
                                            _cE("view", _uM("class" to "product-container"), _uA(
                                                _cE(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), fun(it, index, __index, _cached): Any {
                                                    return _cE("view", _uM("class" to _nC(_uA(
                                                        "list-item",
                                                        _uM("selected-item" to (selectedPackage.value?.id === it.id))
                                                    )), "key" to index, "onClick" to fun(){
                                                        selectPackge(it)
                                                    }
                                                    ), _uA(
                                                        _cE("text", _uM("class" to "product-name"), _tD(it.title), 1),
                                                        _cE("text", _uM("class" to "product-date"), _tD(it.date), 1),
                                                        _cE("text", _uM("class" to "product-price"), "¥" + _tD(it.price), 1)
                                                    ), 10, _uA(
                                                        "onClick"
                                                    ))
                                                }
                                                ), 128)
                                            )),
                                            if (getFilteredEvents().length == 0) {
                                                _cE("view", _uM("key" to 0), _uA(
                                                    _cV(_component_fui_empty, _uM("color" to "#999", "size" to 25, "title" to "暂无套餐"))
                                                ))
                                            } else {
                                                _cC("v-if", true)
                                            }
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
                    )),
                    if (isTrue(selectedPackage.value)) {
                        _cE("view", _uM("key" to 0, "class" to "btn-box"), _uA(
                            _cE("view", _uM("class" to "price"), _uA(
                                _cE("text", _uM("class" to "price-title"), "金额"),
                                _cE("text", _uM("class" to "price-text"), "¥" + _tD(selectedPackage.value?.price), 1)
                            )),
                            _cE("view", _uM("class" to "btn"), _uA(
                                _cV(_component_l_button, _uM("type" to "primary"), _uM("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return _uA(
                                        "流量充值"
                                    )
                                }), "_" to 1))
                            ))
                        ))
                    } else {
                        _cC("v-if", true)
                    }
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
                return _uM("container" to _pS(_uM("position" to "relative", "height" to "100%", "backgroundColor" to "#f5f5f5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "content" to _uM(".container " to _uM("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "list" to _uM(".container .content " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "right-item" to _uM(".container .content .list " to _uM("display" to "flex", "flexDirection" to "row", "justifyContent" to "space-between", "alignItems" to "center", "paddingTop" to 0, "paddingRight" to 0, "paddingBottom" to 0, "paddingLeft" to 0, "borderBottomWidth" to "medium", "borderBottomStyle" to "none", "borderBottomColor" to "#000000")), "progress" to _uM(".container .content " to _uM("paddingTop" to 0, "paddingRight" to "20rpx", "paddingBottom" to 0, "paddingLeft" to "20rpx")), "underline" to _uM(".container .content " to _uM("borderBottomWidth" to "1rpx", "borderBottomStyle" to "solid", "borderBottomColor" to "#f1f1f1")), "package-box" to _uM(".container " to _uM("marginTop" to "50rpx")), "product-container" to _uM(".container .package-box " to _uM("display" to "flex", "flexWrap" to "wrap", "flexDirection" to "row", "justifyContent" to "space-between", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "list-item" to _uM(".container .package-box .product-container " to _uM("width" to "48%", "marginBottom" to "30rpx", "paddingTop" to "40rpx", "paddingRight" to "40rpx", "paddingBottom" to "40rpx", "paddingLeft" to "40rpx", "boxSizing" to "border-box", "backgroundImage" to "none", "backgroundColor" to "#ffffff", "borderTopLeftRadius" to "10rpx", "borderTopRightRadius" to "10rpx", "borderBottomRightRadius" to "10rpx", "borderBottomLeftRadius" to "10rpx", "display" to "flex", "flexDirection" to "column", "alignItems" to "center", "borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#ffffff", "borderRightColor" to "#ffffff", "borderBottomColor" to "#ffffff", "borderLeftColor" to "#ffffff"), ".container .package-box .product-container .selected-item" to _uM("borderTopWidth" to "2rpx", "borderRightWidth" to "2rpx", "borderBottomWidth" to "2rpx", "borderLeftWidth" to "2rpx", "borderTopStyle" to "solid", "borderRightStyle" to "solid", "borderBottomStyle" to "solid", "borderLeftStyle" to "solid", "borderTopColor" to "#FF5722", "borderRightColor" to "#FF5722", "borderBottomColor" to "#FF5722", "borderLeftColor" to "#FF5722")), "product-name" to _uM(".container .package-box .product-container .list-item " to _uM("fontSize" to "30rpx")), "product-date" to _uM(".container .package-box .product-container .list-item " to _uM("fontSize" to "20rpx", "color" to "#999999", "height" to "50rpx", "lineHeight" to "50rpx")), "product-price" to _uM(".container .package-box .product-container .list-item " to _uM("fontSize" to "30rpx", "color" to "#FF5722", "fontWeight" to "bold")), "l-tabs" to _uM(".container " to _uM("!backgroundColor" to "rgba(0,0,0,0)")), "btn-box" to _uM(".container " to _uM("position" to "fixed", "width" to "100%", "left" to 0, "bottom" to 0, "height" to "100rpx", "display" to "flex", "flexDirection" to "row")), "price" to _uM(".container .btn-box " to _uM("flex" to 1, "height" to "100%", "display" to "flex", "flexDirection" to "row", "justifyContent" to "center", "alignItems" to "center", "backgroundColor" to "#ffffff", "gap" to "10rpx")), "price-title" to _uM(".container .btn-box .price " to _uM("fontSize" to "20rpx")), "price-text" to _uM(".container .btn-box .price " to _uM("fontSize" to "40rpx", "color" to "#FF5722", "fontWeight" to "bold", "marginLeft" to "15rpx")), "btn" to _uM(".container .btn-box " to _uM("flex" to 1, "height" to "100%")), "l-button" to _uM(".container .btn-box .btn " to _uM("height" to "100%")))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = _uM()
        var emits: Map<String, Any?> = _uM()
        var props = _nP(_uM())
        var propsNeedCastKeys: UTSArray<String> = _uA()
        var components: Map<String, CreateVueComponent> = _uM()
    }
}
