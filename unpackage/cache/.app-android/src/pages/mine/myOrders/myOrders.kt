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
            val tabsVal = ref(utsArrayOf<tabItem>(tabItem(id = "0", title = "全部", content = utsArrayOf()), tabItem(id = "1", title = "待付款", content = utsArrayOf()), tabItem(id = "2", title = "已完成", content = utsArrayOf()), tabItem(id = "3", title = "已取消", content = utsArrayOf()), tabItem(id = "4", title = "退款", content = utsArrayOf())))
            val content = ref(utsArrayOf<ContentType>(ContentType(id = "1111", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已完成", iccid = "89862235957372384387456", isPay = "2"), ContentType(id = "1112", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已取消", iccid = "89862235957372384387454", isPay = "3"), ContentType(id = "1113", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "待付款", iccid = "89862235957372384387467", isPay = "1"), ContentType(id = "1114", title = "五年畅想套餐", date = "2025-07-09 15:00:00", price = "¥300", state = "已退款", iccid = "89862235957372384387465", isPay = "4")))
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
                return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
                    createVNode(_component_l_tabs, utsMapOf("value" to tabVal.value, "onClick" to changeTab, "bgColor" to "transparent", "color" to "#000000", "activeColor" to "#FF5722"), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                        return utsArrayOf(
                            createElementVNode(Fragment, null, RenderHelpers.renderList(tabsVal.value, fun(item, index, __index, _cached): Any {
                                return createVNode(_component_l_tab_panel, utsMapOf("key" to index, "value" to index, "label" to item.title), utsMapOf("default" to withSlotCtx(fun(): UTSArray<Any> {
                                    return utsArrayOf(
                                        createElementVNode(Fragment, null, RenderHelpers.renderList(getFilteredEvents(), fun(item, index, __index, _cached): Any {
                                            return createElementVNode("view", utsMapOf("class" to "list-item", "key" to index), utsArrayOf(
                                                createElementVNode("view", utsMapOf("onClick" to fun(){
                                                    goDetail(item.id)
                                                }
                                                ), utsArrayOf(
                                                    createElementVNode("view", utsMapOf("class" to "title-state"), utsArrayOf(
                                                        createElementVNode("text", utsMapOf("class" to "title-style"), toDisplayString(item.title), 1),
                                                        createElementVNode("text", utsMapOf("class" to "state-style"), toDisplayString(item.state), 1)
                                                    )),
                                                    createElementVNode("view", utsMapOf("class" to "device-type"), utsArrayOf(
                                                        createElementVNode("text", null, "办公室设备"),
                                                        createElementVNode("text", null, "ICCID " + toDisplayString(item.iccid), 1)
                                                    )),
                                                    createElementVNode("view", utsMapOf("class" to "date-price"), utsArrayOf(
                                                        createElementVNode("text", null, toDisplayString(item.date), 1),
                                                        createElementVNode("text", utsMapOf("class" to "price"), toDisplayString(item.price), 1)
                                                    ))
                                                ), 8, utsArrayOf(
                                                    "onClick"
                                                )),
                                                if (item.isPay == "1") {
                                                    createElementVNode("view", utsMapOf("key" to 0, "class" to "btn"), utsArrayOf(
                                                        createVNode(_component_fui_button, utsMapOf("text" to "去付款", "type" to "primary", "width" to "120rpx", "height" to "50rpx", "size" to 24, "onClick" to goPay))
                                                    ))
                                                } else {
                                                    createCommentVNode("v-if", true)
                                                }
                                            ))
                                        }
                                        ), 128)
                                    )
                                }
                                ), "_" to 2), 1032, utsArrayOf(
                                    "value",
                                    "label"
                                ))
                            }
                            ), 128)
                        )
                    }
                    ), "_" to 1), 8, utsArrayOf(
                        "value"
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
                return utsMapOf("container" to padStyleMapOf(utsMapOf("width" to "100%", "height" to "100%", "backgroundColor" to "#F5F5F5", "paddingTop" to "20rpx", "paddingRight" to "20rpx", "paddingBottom" to "20rpx", "paddingLeft" to "20rpx")), "l-tabs" to utsMapOf(".container " to utsMapOf("!backgroundColor" to "rgba(0,0,0,0)")), "list-item" to utsMapOf(".container " to utsMapOf("backgroundColor" to "#ffffff", "paddingTop" to "20rpx", "paddingRight" to "30rpx", "paddingBottom" to "20rpx", "paddingLeft" to "30rpx", "marginTop" to "20rpx", "borderTopLeftRadius" to "20rpx", "borderTopRightRadius" to "20rpx", "borderBottomRightRadius" to "20rpx", "borderBottomLeftRadius" to "20rpx")), "title-state" to utsMapOf(".container .list-item " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "date-price" to utsMapOf(".container .list-item " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "device-type" to utsMapOf(".container .list-item " to utsMapOf("display" to "flex", "flexDirection" to "row", "alignItems" to "center", "justifyContent" to "space-between", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)), "title-style" to utsMapOf(".container .list-item .title-state " to utsMapOf("fontSize" to "30rpx", "color" to "#000000", "fontWeight" to "bold"), ".container .list-item .date-price " to utsMapOf("fontSize" to "30rpx", "color" to "#000000", "fontWeight" to "bold"), ".container .list-item .device-type " to utsMapOf("fontSize" to "30rpx", "color" to "#000000", "fontWeight" to "bold")), "state-style" to utsMapOf(".container .list-item .title-state " to utsMapOf("fontSize" to "24rpx", "color" to "#FF5722"), ".container .list-item .date-price " to utsMapOf("fontSize" to "24rpx", "color" to "#FF5722"), ".container .list-item .device-type " to utsMapOf("fontSize" to "24rpx", "color" to "#FF5722")), "price" to utsMapOf(".container .list-item .date-price " to utsMapOf("fontSize" to "38rpx")), "btn" to utsMapOf(".container .list-item " to utsMapOf("display" to "flex", "flexDirection" to "row", "justifyContent" to "flex-end", "paddingTop" to "10rpx", "paddingRight" to 0, "paddingBottom" to "10rpx", "paddingLeft" to 0)))
            }
        var inheritAttrs = true
        var inject: Map<String, Map<String, Any?>> = utsMapOf()
        var emits: Map<String, Any?> = utsMapOf()
        var props = normalizePropsOptions(utsMapOf())
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf()
        var components: Map<String, CreateVueComponent> = utsMapOf()
    }
}
